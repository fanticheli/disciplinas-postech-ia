# 📝 Disciplina 08 · Prova comentada

> Arquitetura de Sistemas com IA (caso TrialForge). Cada questão traz o enunciado, a resposta certa, o raciocínio, uma mini-aula dos conceitos citados, o erro de cada alternativa errada e onde se aprofundar no guia de leitura.

**Resumo das respostas**

| Questão | Tema | Resposta |
|---------|------|----------|
| 01 | Confidence Threshold + Approval Gate no Gateway | **A** |
| 02 | Intent-Based Routing + Model Router | **B** |
| 03 | Padrões de RAG da árvore de decisão | **B** |
| 04 | Os quatro sinais do SRE + qualidade semântica | **C** |
| 05 | Framework das três perguntas (regra x agente) | **B** |
| 06 | Anatomia do agente único | **C** |
| 07 | Classificação: Sim, Não, Não | **B** |
| 08 | Componentes do Stack Enterprise | **E** |
| 09 | Orquestração + Saga após falha parcial | **B** |
| 10 | Template de rastreamento do loop ReAct | **B** |

---

## Questão 01 · Confidence Threshold + Approval Gate no Gateway

**Pergunta:** No protótipo Gateway do Módulo 4.5, o limiar de confiança do RAG para decidir se a resposta segue direto ou precisa de Approval Gate é 0,7. Uma pergunta fora do banco de cláusulas retorna confiança 0,633 e a intenção classificada não é síntese de CSR. O que o Gateway faz, segundo a lógica Confidence Threshold + Approval Gate (Módulo 4.4)?

**Alternativas:**
- A) ✅ Escala para o Approval Gate, pois 0,633 < 0,7, mesmo a intenção não sendo síntese de CSR: o gate é acionado tanto por tarefa cara/irreversível quanto por confiança baixa.
- B) Segue direto, pois 0,633 está próximo de 0,7.
- C) Bloqueia por orçamento, tratando confiança baixa como problema financeiro.
- D) Troca para um modelo mais caro sem passar pelo Approval Gate.
- E) Ignora a cláusula recuperada e gera resposta livre sem citar fonte regulatória.

**Resposta: A.** Escala para o Approval Gate, pois 0,633 < 0,7, mesmo a intenção não sendo síntese de CSR.

### Resolução comentada

O Approval Gate tem dois gatilhos independentes, ligados por um "OU": (1) a tarefa é de uma categoria que sempre exige humano (no TrialForge, a síntese de CSR, regra fixa) ou (2) a confiança do RAG ficou abaixo do limiar de 0,7. Basta um deles. Aqui o primeiro não dispara (a intenção não é CSR), mas o segundo sim: 0,633 é menor que 0,7.

Pense no gate como um caixa de banco: saque pequeno ele libera, mas se o valor passa da linha **ou** o cliente é de uma categoria sensível, chama o gerente. Perto do limite não conta: "0,633 está próximo de 0,7" não é critério, é a régua que decide.

O número 0,633 vem de uma execução real do protótipo: uma pergunta de tema diferente do banco esgota as três tentativas do Agentic RAG, a confiança fica em 0,633 e o gate é acionado por confiança baixa.

### Entenda os conceitos

- **Approval Gate:** pausa deliberada antes de uma ação cara, sensível ou irreversível. O estado da execução é preservado e o fluxo espera uma decisão externa (humana). Analogia do guia: o gerente do banco que só é chamado quando o valor passa de uma linha.
- **Confidence Threshold (limiar de confiança):** a régua que converte um sinal probabilístico em regra operacional. Acima do valor, segue; abaixo, interrompe e vai para validação humana. No protótipo, `precisaAprovacao = intencao === 'sintese_csr' || confianca < 0.7`.
- **Confiança do RAG:** no gateway, é a similaridade da melhor cláusula recuperada contra a pergunta. Ela nasce durante a execução e alimenta o limiar, em vez de ser só um indicador estatístico.
- **Dois gatilhos independentes:** o tipo da tarefa (síntese de CSR, sempre exige aprovação, mesmo com confiança alta) e o número (confiança abaixo do limiar). O guia insiste: o limiar não decide sozinho, o tipo da tarefa é um critério tão importante quanto o número.
- **Agentic RAG com limite:** quando a recuperação fica abaixo do esperado, o RAG tenta de novo com estratégia mais ampla, até três tentativas no protótipo. Se esgota e a confiança segue baixa, o gate assume.
- **Três faixas (Stripe Radar, exemplo do guia):** mais de duas saídas possíveis (seguir, escalar para humano, bloquear). O limiar nunca é definitivo: recalibre quando o modelo ou o perfil das perguntas mudar.
- **Audit Trail:** toda decisão (cache, modelo, tentativas, gate) é registrada, qualquer que seja o caminho.

### Por que as outras erram

- **B:** "próximo" não existe na regra. 0,633 é menor que 0,7 e a comparação é objetiva.
- **C:** confiança baixa não é problema financeiro. Bloquear por orçamento é outro mecanismo (orçamento por tenant, tópico 14), verificado antes de gastar.
- **D:** trocar de modelo é papel do Model Router, que decide pela complexidade da tarefa antes da inferência. Confiança baixa do RAG escala para humano, não sobe de modelo escondido.
- **E:** gerar resposta livre sem fonte ignora o propósito do RAG (fundamentar na base oficial) e é justamente o risco que o gate existe para conter.

### Aprofundar no guia

- [10 · Approval Gate formalizado](./projeto-de-leitura/10-approval-gate-confidence-threshold-e-audit-trail.md), seção "Como funciona": o item "O limiar não decide sozinho" e o canvas HITL, que mostram os dois gatilhos.
- [10 · Approval Gate formalizado](./projeto-de-leitura/10-approval-gate-confidence-threshold-e-audit-trail.md), seção "No código do repo": a linha `precisaAprovacao` com `LIMIAR_CONFIANCA = 0.7`.
- [11 · O gateway integrado](./projeto-de-leitura/11-gateway-integrado.md), seção "Como funciona": a calibração medida (0,633 para tema fora do banco, 3 tentativas esgotadas); e, em "O que é", as decisões 6 e 7 (limiar e gate).
- [Disciplina 02 · Live NetFibra (LangGraph, GraphRAG e HITL)](../02-apis-de-ia-generativa-e-prompt-engineering/projeto-de-leitura/12-live-netfibra-langgraph-graphrag-hitl.md): pausa e retomada com `interrupt`, a mesma ideia de gate vista em código.

*Código da questão: 175779*

---

## Questão 02 · Intent-Based Routing + Model Router

**Pergunta:** O Módulo 4.2 combina dois padrões de roteamento em uma árvore de decisão. Quais?

**Alternativas:**
- A) Saga e Handoff.
- B) ✅ Intent-Based Routing e Model Router.
- C) Confidence Threshold e Approval Gate.
- D) Semantic Cache e Response Streaming.
- E) Hybrid Search e Multi-Index.

**Resposta: B.** Intent-Based Routing (Passo 1, classifica a intenção) com Model Router (Passo 2, escolhe o modelo mais adequado).

### Resolução comentada

A palavra-chave é "roteamento". Entre as alternativas, só uma tem dois padrões que roteiam algo. Os outros pares são de assuntos vizinhos: A é orquestração e falha, C é o gate, D é cache e latência, E é RAG.

A árvore do Módulo 4.2 tem dois passos em ordem. Passo 1: para onde a requisição vai (qual fluxo, agente ou índice)? Isso é o Intent-Based Routing. Passo 2: com a intenção conhecida, qual modelo vai processar? Isso é o Model Router. Os dois atuam em momentos diferentes e podem evoluir separadamente.

Na porta de um prédio: primeiro o porteiro pergunta "para qual andar?" (intenção) e só depois decide se manda você com o elevador comum ou com a recepcionista sênior (modelo).

### Entenda os conceitos

- **Intent-Based Routing:** responde "para onde esta requisição deve seguir?" (gerar documento, consulta regulatória, busca na base etc.). No TrialForge acontece logo após a entrada. No protótipo é um classificador determinístico simples: "nem toda decisão precisa ser delegada à IA".
- **Model Router:** decide qual modelo processa a tarefa antes da inferência, classificando a complexidade: simples vai para modelo menor, rápido e barato; raciocínio elaborado ou documento regulatório vai para o mais sofisticado. Ele não responde ao usuário, só escolhe.
- **Por que rotear modelo:** sem roteador, o impulso é usar sempre o mais poderoso, e o custo cresce com o volume e não com a complexidade. O guia cita o RouteLLM: 95% da performance do GPT-4 usando o modelo caro em só 26% das chamadas (números dos slides).
- **Como construir um roteador:** regras determinísticas (tamanho, tipo de operação, palavras-chave), um modelo pequeno comparando com exemplos, ou um roteador treinado. Se o classificador custa mais que a tarefa que evita, o roteamento parou de economizar.
- **Ordem na requisição:** intenção primeiro, depois (após verificar o cache) o roteador de modelo. Escolher o modelo antes do cache é uma armadilha do guia.

### Por que as outras erram

- **A:** Saga é compensação de falha distribuída e Handoff é transferência de controle entre agentes (Módulo 3). Não são roteamento de requisição.
- **C:** Confidence Threshold e Approval Gate formam o controle de risco do Módulo 4.4, não o roteamento do 4.2.
- **D:** Semantic Cache e Response Streaming são do Módulo 4.3 (evitar chamadas e reduzir latência percebida).
- **E:** Hybrid Search e Multi-Index são variantes de RAG (Módulo 4.1). O Multi-Index até usa roteamento por intenção para escolher o índice, mas é um padrão de recuperação.

### Aprofundar no guia

- [09 · Roteamento, cache semântico, prompt cache e streaming](./projeto-de-leitura/09-roteamento-cache-e-streaming.md), seção "O que é": definições de Model Router e Intent-Based Routing e as evidências (RouteLLM, GPT-5).
- [09 · Roteamento, cache semântico, prompt cache e streaming](./projeto-de-leitura/09-roteamento-cache-e-streaming.md), seção "Como funciona": o "Canvas de roteamento" com o Passo 1 (intenção) e o Passo 2 (modelo).
- [11 · O gateway integrado](./projeto-de-leitura/11-gateway-integrado.md), seção "O que é": onde intenção, cache e roteador entram na ordem do gateway.

*Código da questão: 175777*

---

## Questão 03 · Padrões de RAG da árvore de decisão

**Pergunta:** Qual conjunto de padrões de RAG aparece na árvore de decisão do Módulo 4.1?

**Alternativas:**
- A) Semantic Cache, Response Streaming, Model Router e Intent-Based Routing.
- B) ✅ Hybrid Search, Multi-Index, Agentic RAG e Basic RAG (padrão-base/fallback).
- C) Só Basic RAG.
- D) Approval Gate RAG, Confidence RAG e Basic RAG.
- E) Sequential RAG, Parallel RAG e Supervisor RAG.

**Resposta: B.** Hybrid Search, Multi-Index e Agentic RAG como variantes especializadas, com Basic RAG como padrão-base e fallback quando nenhuma condição mais específica se aplica.

### Resolução comentada

O enunciado pede "padrões de RAG". Elimine primeiro o que não é RAG: A são padrões de roteamento e cache, D e E são nomes inventados. Sobra C (só Basic) e B (os quatro). Como a pergunta fala em árvore de decisão com um conjunto, a resposta é B.

A árvore funciona assim: faça três perguntas, todas, sem parar no primeiro "sim". A busca falha em termo exato? Adicione Hybrid. Há vários domínios com vocabulários diferentes? Use Multi-Index. Uma busca só raramente basta? Torne Agentic, com limite de iterações. Se nenhum sintoma aparece, o Basic RAG basta: ele é a base e o fallback.

A lição prática é escolher por sintoma, não "por precaução": cada padrão extra soma componentes, latência e custo de manutenção.

### Entenda os conceitos

- **Basic RAG:** divide os documentos em chunks, transforma cada um em vetor (embedding), guarda numa base vetorial, compara a pergunta com os vetores e envia os trechos mais próximos junto com a pergunta ao modelo. O modelo não consulta toda a base, só um subconjunto. Analogia do guia: o bibliotecário que corta os livros em fichas e traz as mais parecidas com a pergunta.
- **Limite do Basic RAG:** só por similaridade semântica, falha quando termos exatos importam (códigos regulatórios, números de resolução, identificadores).
- **Hybrid Search:** combina busca vetorial (entende sinônimo e paráfrase) com BM25 (casa o termo exato) e funde os dois rankings por Reciprocal Rank Fusion (RRF), que usa a posição e não o score. Somar scores brutos é armadilha, porque as escalas são incompatíveis.
- **Multi-Index:** um índice por domínio (no TrialForge: consentimento, protocolo/critérios regulatórios, estudos anteriores/CSR) e um roteador que escolhe em qual buscar.
- **Agentic RAG:** a busca vira decisão iterativa: recupera, avalia se é suficiente e, se não, busca de novo com estratégia mais ampla, com limite de tentativas (três no protótipo). É a lógica do loop ReAct dentro da busca.
- **Fallback:** o Basic RAG é o padrão quando nenhuma condição mais específica se aplica.
- **Fonte (complemento do guia):** a apostila detalha o Basic RAG e só menciona os outros três. A explicação deles vem dos slides do Módulo 4.1 e do canvas.

### Por que as outras erram

- **A:** são padrões do Módulo 4.2 e 4.3 (roteamento, cache e streaming), não de RAG.
- **C:** só Basic RAG ignora as variantes que a árvore justamente seleciona por sintoma.
- **D:** "Approval Gate RAG" e "Confidence RAG" não existem. Gate e limiar são do Módulo 4.4 e usam a confiança do RAG como sinal, mas não são padrões de RAG.
- **E:** Sequential, Parallel e Supervisor são padrões de orquestração (Módulo 3), sem relação com recuperação.

### Aprofundar no guia

- [08 · RAG como padrão de arquitetura](./projeto-de-leitura/08-rag-basic-hybrid-multi-index-agentic.md), seção "O que é": cada um dos quatro padrões e o limite do Basic RAG.
- [08 · RAG como padrão de arquitetura](./projeto-de-leitura/08-rag-basic-hybrid-multi-index-agentic.md), seção "Como funciona": o "Seletor de padrão de RAG (canvas)" com as três perguntas.
- [08 · RAG como padrão de arquitetura](./projeto-de-leitura/08-rag-basic-hybrid-multi-index-agentic.md), seção "🚫 Armadilhas": somar scores de BM25 e cosseno e adicionar os quatro padrões de uma vez.
- [Disciplina 02 · Live NetFibra (LangGraph, GraphRAG e HITL)](../02-apis-de-ia-generativa-e-prompt-engineering/projeto-de-leitura/12-live-netfibra-langgraph-graphrag-hitl.md): outra aplicação de RAG com grafo, para comparar.

*Código da questão: 175776*

---

## Questão 04 · Os quatro sinais do SRE + qualidade semântica

**Pergunta:** Módulo 5.2: quais são os quatro sinais clássicos de observabilidade (Google SRE) mais um quinto, específico de IA?

**Alternativas:**
- A) Custo, Latência, Confiança, Cache Hit Rate e Aprovação.
- B) Precisão, Recall, F1-Score, Acurácia e Qualidade Semântica.
- C) ✅ Latência, Tráfego, Erros, Saturação e Qualidade Semântica.
- D) Latência, Custo, Tráfego, Erros e Auditoria.
- E) CPU, Memória, Disco, Rede e Throughput.

**Resposta: C.** Os quatro clássicos são Latência, Tráfego, Erros e Saturação; o 5.2 acrescenta Qualidade Semântica, que os quatro sozinhos não capturam.

### Resolução comentada

Isto é memorização com raciocínio por trás. Os "quatro sinais de ouro" do livro de SRE do Google são Latência, Tráfego, Erros e Saturação. Só a C e a D listam Latência, Tráfego e Erros, e só a C tem Saturação. A D troca Saturação por Custo e acrescenta Auditoria, que não são sinais.

O quinto sinal existe porque o painel clássico pode ficar todo verde enquanto a resposta piora. Na analogia da padaria: o forno está ligado, a fila anda, mas o pão está sem sal desde segunda e nenhum painel avisa. É preciso alguém provando o pão.

### Entenda os conceitos

- **Os quatro sinais clássicos (SRE, Google):** latência (tempo de resposta), tráfego (volume de requisições), erros (falhas) e saturação (quanto dos recursos está em uso). Em IA, saturação inclui filas de inferência, GPU e disponibilidade dos modelos. São sinais operacionais.
- **Qualidade semântica:** o quinto sinal. Mede se a resposta está boa em conteúdo, o que latência, erro e CPU não mostram. É mais difícil de medir que latência e erro, então exige proxies e revisão humana. O Trial Forge escolheu como proxy a taxa de rejeição no Approval Gate por estudo.
- **Deriva de qualidade:** a piora silenciosa sem alarme de infraestrutura. Exemplo do guia (Chen, Zaharia e Zou, 2023): a acurácia do GPT-4 em números primos caiu de 84% para 51% entre março e junho, com a mesma API e a mesma latência. Outro caso é o chatbot da DPD, em que um usuário induziu xingamentos com os quatro sinais verdes.
- **Duas camadas de observabilidade:** infraestrutura (disponibilidade, desempenho, recursos) e IA (prompts, versões, documentos recuperados, modelos, qualidade, aderência a políticas). Só juntas permitem investigar incidentes.
- **Prompt como código:** versionar prompts com Diff (o que mudou antes de publicar) e Replay (reexecutar requisição antiga com outra versão). Registre a versão em cada execução.
- **Metadado mínimo por chamada:** tokens de entrada e saída, modelo efetivo, tempo até o primeiro token, tempo total e documentos recuperados no RAG.

### Por que as outras erram

- **A:** custo, confiança, cache hit rate e aprovação são métricas úteis, mas não são os quatro sinais clássicos do SRE.
- **B:** precisão, recall, F1 e acurácia são métricas de avaliação de modelo, não de observabilidade de produção. Só a Qualidade Semântica coincide.
- **D:** mistura clássicos (Latência, Tráfego, Erros) com Custo e Auditoria. Faltou Saturação, e Auditoria é trilha de registro, não sinal.
- **E:** CPU, memória, disco, rede e throughput são métricas de infraestrutura. Servem de base, mas não são os sinais SRE nem trazem o sinal de IA.

### Aprofundar no guia

- [13 · Observabilidade de IA em escala e implantação híbrida](./projeto-de-leitura/13-observabilidade-e-implantacao-hibrida.md), seção "O que é": os quatro sinais, a deriva de qualidade e o caso DPD.
- [13 · Observabilidade de IA em escala e implantação híbrida](./projeto-de-leitura/13-observabilidade-e-implantacao-hibrida.md), seção "No código do repo": o canvas de sinais com o quinto sinal (qualidade semântica) e seus proxies.
- [13 · Observabilidade de IA em escala e implantação híbrida](./projeto-de-leitura/13-observabilidade-e-implantacao-hibrida.md), seção "Vantagens e limites": por que qualidade semântica é mais difícil de medir.
- [Disciplina 04 · Observabilidade e limites de autonomia](../04-criacao-de-agentes-autonomos/projeto-de-leitura/13-observabilidade-e-limites-de-autonomia.md): o tema visto na disciplina de agentes.

*Código da questão: 175781*

---

## Questão 05 · Framework das três perguntas (regra x agente)

**Pergunta:** O framework de três perguntas do Módulo 1.3 (regra determinística vs agente de IA) avalia quais critérios?

**Alternativas:**
- A) Custo de infraestrutura, latência aceitável e volume de requisições.
- B) ✅ Se existe regra finita cobrindo mais de 90% dos casos reais; se o erro é caro E irreversível; se o comportamento muda com o contexto de entrada.
- C) Se pode ser paralelizada, tem dependência externa e precisa de streaming.
- D) Se o modelo é caro ou barato e se há cache.
- E) Experiência do time com IA, orçamento e prazo.

**Resposta: B.** Testam se uma regra determinística cobre a maioria dos casos, se o custo de errar é alto e irreversível e se o comportamento varia com o contexto; a combinação indica regra, agente, ou agente com Approval Gate.

### Resolução comentada

O framework é uma sequência de três perguntas objetivas sobre a **tarefa**, não sobre infraestrutura, time ou modelo. Isso já elimina A, C, D e E, que falam de custo, paralelismo, cache e prazo. Esses temas existem (o "orçamento de trade-offs" do Módulo 1.4), mas são outro instrumento.

As três perguntas, em ordem: P1, existe regra finita que cobre mais de 90% dos casos reais? Se sim, regra e fim. P2, o erro é caro e irreversível? Isso não decide se usa agente, decide o grau de autonomia: o agente propõe e a pessoa aprova (Approval Gate). P3, o comportamento muda com o contexto? Se sim, agente autônomo com observabilidade; se não, mesmo que a regra pareça enorme, continua sendo regra.

O valor está no processo: o time responde às mesmas perguntas com as mesmas evidências, e a decisão fica auditável e repetível, no lugar do "acho complexo demais".

### Entenda os conceitos

- **Regra determinística:** mesma entrada, mesmo caminho, mesmo resultado. Exemplo do Trial Forge: validar campos obrigatórios de um formulário regulatório.
- **P1, "casos reais já observados":** a cobertura de 90% vale para casos reais, não hipotéticos. Um projeto novo ainda pode não ter esses dados.
- **P2, caro E irreversível:** a pergunta certa é "dá para desfazer depois de acontecer?", não "o erro é grave?". Irreversível exige aprovação antes (gate síncrono); caro mas reversível admite revisão depois (gate assíncrono). Exemplo: a versão final de um TCLE.
- **P3, variação com o contexto:** se sim, agente autônomo com observabilidade completa. Uma regra extensa (árvore com dezenas de condições) continua sendo regra: auditável e mais barata.
- **Quatro desfechos:** regra determinística, agente supervisionado (com gate), agente autônomo observável, ou combinação.
- **Tarefa híbrida:** a maioria dos processos parece uma tarefa e são várias. Decomponha em subtarefas e aplique o framework em cada uma (exemplo da emenda de protocolo: extrair mudanças é agente; classificar a emenda é regra).
- **Orçamento de trade-offs (Módulo 1.4, complemento do tópico):** latência, custo, precisão e performance por componente. É o que as alternativas A e D descrevem, mas não é o framework das três perguntas.

### Por que as outras erram

- **A:** custo, latência e volume são eixos do orçamento por componente (Módulo 1.4), não perguntas do framework de decisão.
- **C:** paralelismo, dependência e streaming pertencem aos padrões de orquestração e de resposta, de outros módulos.
- **D:** modelo caro ou barato é decisão do Model Router, e cache é padrão do Módulo 4. O framework nem chega a escolher modelo.
- **E:** experiência do time, orçamento e prazo são fatores de gestão. O framework avalia a natureza da tarefa.

### Aprofundar no guia

- [01 · Agente ou regra? O framework das três perguntas](./projeto-de-leitura/01-framework-de-decisao-e-trade-offs.md), seção "O que é": P1, P2, P3, os quatro desfechos e os três casos-limite.
- [01 · Agente ou regra? O framework das três perguntas](./projeto-de-leitura/01-framework-de-decisao-e-trade-offs.md), seção "Como funciona": exemplos de decomposição (emenda de protocolo, evento adverso) e o orçamento por componente.
- [01 · Agente ou regra? O framework das três perguntas](./projeto-de-leitura/01-framework-de-decisao-e-trade-offs.md), seção "Cola rápida": P1, P2 e P3 em uma tabela de uma linha cada.

*Código da questão: 175766*

---

## Questão 06 · Anatomia do agente único

**Pergunta:** Quais são os quatro componentes da anatomia de um agente único (Módulo 2.1)?

**Alternativas:**
- A) Gateway, Orquestrador, Modelo e Approval Gate.
- B) Percepção, Raciocínio, Execução e Aprendizado.
- C) ✅ Memória, Planejamento, Ferramentas e Ação.
- D) Contexto, Prompt, Resposta e Validação.
- E) Entrada, Processamento, Saída e Auditoria.

**Resposta: C.** Formato hub-and-spoke com Memória, Planejamento, Ferramentas e Ação como componentes centrais.

### Resolução comentada

A pergunta é "dentro de **um** agente". A é o diagrama de referência da arquitetura inteira (Módulo 1.2), não a anatomia de um agente. B, D e E parecem genéricos e plausíveis, mas não são o vocabulário da disciplina. O guia usa quatro componentes: memória, planejamento, ferramentas e ação.

A imagem hub-and-spoke significa um centro (o agente, o modelo que raciocina) com quatro "raios" ligados a ele, um para cada componente. A ideia é ter um vocabulário comum para não chamar de "agente" qualquer coisa: muita coisa vendida como agente é uma única chamada a um modelo com um prompt bem escrito, sem memória, plano nem ferramentas.

O conceito de dimensionar: um agente é calibrado, não maximizado. O agente de TCLE do Trial Forge usa memória mínima, planejamento de duas etapas, uma ferramenta (busca de cláusulas) e ação restrita a gerar rascunho.

### Entenda os conceitos

- **Memória:** curto prazo (contexto da requisição atual, como a RAM, some ao fim) e longo prazo (persiste entre sessões, como um disco, recuperada seletivamente por busca vetorial). A longa se divide em episódica (eventos, histórico) e semântica (perfil, preferências). Memória persistente traz risco de retenção de dados pessoais e obrigação de exclusão efetiva.
- **Planejamento:** decompor a tarefa antes de agir (raciocínio estruturado, subobjetivos, autocrítica). Planejar mais melhora a decisão, mas custa latência e recursos.
- **Ferramentas:** funções ou serviços externos ao modelo (busca em documentos, banco, API, calculadora). É delegar a um componente determinístico, e cada ferramenta nova cria uma nova decisão para o agente.
- **Ação:** o passo executado no mundo (responder, consultar, atualizar sistema). Ter capacidade de ação não é agir sempre sozinho: pedir aprovação humana pode ser a ação mais importante em alto risco.
- **Hub-and-spoke:** o formato de raio de roda. Na prova, a resolução usa este termo; o guia descreve os quatro componentes ligados ao agente, mas não usa a expressão (ver Pontos de atenção).
- **Reactive e Memory-Enhanced:** padrões dos slides. Reactive é o caso de zero componentes (responde direto, sem estado); Memory-Enhanced tem memória de longo prazo.
- **Teste de realidade:** cinco perguntas para achar excesso ou falta (por exemplo, "se a memória longa fosse removida a tarefa ainda funcionaria? Se sim, ela provavelmente não deveria existir").

### Por que as outras erram

- **A:** são os componentes do diagrama de referência do sistema (Gateway, Orquestrador, Modelo + Tools/RAG, Approval Gate), um nível acima do agente.
- **B:** Percepção, Raciocínio, Execução e Aprendizado é um vocabulário clássico de agentes inteligentes, mas não é o da disciplina. A disciplina não inclui "Aprendizado" como componente.
- **D:** Contexto, Prompt, Resposta e Validação descrevem uma chamada ao modelo, não a anatomia de um agente.
- **E:** Entrada, Processamento, Saída e Auditoria é um modelo genérico de sistema, e Auditoria é a banda de observabilidade que atravessa a arquitetura.

### Aprofundar no guia

- [02 · Anatomia do agente único](./projeto-de-leitura/02-anatomia-do-agente-unico.md), seção "O que é": os quatro componentes, a definição por componentes e os padrões Reactive e Memory-Enhanced.
- [02 · Anatomia do agente único](./projeto-de-leitura/02-anatomia-do-agente-unico.md), seção "Como funciona": o dimensionamento do agente de TCLE e o teste de realidade de cinco perguntas.
- [00 · AI-First e o diagrama de referência](./projeto-de-leitura/00-ai-first-pilares-e-diagrama-de-referencia.md), seção "Como funciona": o diagrama de sistema (Gateway, Orquestrador, Modelo + Tools/RAG, Approval Gate e a banda de observabilidade) para não confundir com a anatomia do agente.
- [Disciplina 04 · Memória episódica e semântica](../04-criacao-de-agentes-autonomos/projeto-de-leitura/09-memoria-episodica-e-semantica.md): a memória de longo prazo aprofundada em código.

*Código da questão: 175768*

---

## Questão 07 · Classificação: Sim, Não, Não

**Pergunta:** Um componente responde SIM à Pergunta 1 (regra finita cobre mais de 90% dos casos) e NÃO às Perguntas 2 e 3 (Módulo 1.3). Pela tabela da Missão Prática #01 (Módulo 1.4), qual é a classificação?

**Alternativas:**
- A) Indeterminado, pois precisa de ao menos duas respostas SIM.
- B) ✅ Regra determinística simples: uma regra finita cobre a grande maioria dos casos, o erro não é caro nem irreversível e o comportamento não varia com o contexto.
- C) Agente, porque qualquer SIM já indica necessidade de modelo.
- D) Agente + Approval Gate, porque a ausência de variação de contexto é sinal de risco alto.
- E) Agente + Approval Gate obrigatório, porque toda tarefa de IA deve ter revisão humana.

**Resposta: B.** Sim a P1, Não a P2 e P3 resulta em regra determinística simples; usar agente seria desperdício de complexidade.

### Resolução comentada

Aplique as perguntas em ordem. P1 é "sim": existe regra finita que cobre mais de 90% dos casos reais. No framework, isso já resolve: regra determinística e fim. P2 e P3 "não" só confirmam: o erro não é caro e irreversível (nada de gate) e o comportamento não muda com o contexto (nada de agente autônomo).

No código do curso, a função de classificação retorna regra assim que `p1` é verdadeiro; as outras respostas só importam quando a P1 é "não". Por isso não se "contam SIMs": um único SIM na P1 já decide, e um SIM na P2 ou P3 não muda o resultado quando a P1 é "sim".

Colocar um agente aí traria custo, latência e risco sem ganho. É o exemplo do guia: pedir ao engenheiro-estrela para conferir se a caixa de luz tem todas as tomadas, uma lista fixa que um ajudante resolve.

### Entenda os conceitos

- **Precedência da P1:** se há regra finita que cobre mais de 90% dos casos reais, ela manda. Não há "contagem" de SIMs.
- **P2 define autonomia, não uso de IA:** só entra quando não há regra. "Sim" na P2 significa agente que propõe e humano que aprova.
- **P3 define o tipo de agente:** se o comportamento muda com o contexto, agente autônomo com observabilidade; se não, mesmo uma regra extensa continua sendo regra.
- **Missão Prática #01:** o exercício que fecha o Módulo 1: desenhar o diagrama de referência de um caso real, classificar cada tarefa com P1, P2 e P3 (decompondo as híbridas) e dar a cada componente um orçamento. O guia não traz essa tabela literal: traz a função de classificação (P1 manda, depois P2, depois P3) e o exemplo da Missão Prática 1, e a classificação da prova segue dessa precedência.
- **Desperdício de complexidade:** o guia diz que agentes onde bastaria uma função só trazem custo, complexidade e risco.
- **Classificações envelhecem:** padrões estáveis podem migrar de agente para regra, e o contrário também. Reavalie com evidências do sistema.

### Por que as outras erram

- **A:** não se exigem duas respostas SIM. O framework é uma sequência com precedência, e a P1 "sim" já define o resultado.
- **C:** um SIM na P1 aponta para regra, não para modelo. A IA só entra quando P1 é "não".
- **D:** a ausência de variação de contexto não é risco alto. Risco alto seria um "sim" na P2 (e mesmo assim com P1 "não").
- **E:** nem toda tarefa de IA tem revisão humana. O gate é para erro caro e irreversível. Aqui nem há IA.

### Aprofundar no guia

- [01 · Agente ou regra?](./projeto-de-leitura/01-framework-de-decisao-e-trade-offs.md), seção "No código do repo": a ordem de precedência da função de classificação (`p1` primeiro) e o caso "p1 manda, p2 e p3 são ignorados".
- [01 · Agente ou regra?](./projeto-de-leitura/01-framework-de-decisao-e-trade-offs.md), seção "O que é": P1 a P3 e os quatro desfechos.
- [01 · Agente ou regra?](./projeto-de-leitura/01-framework-de-decisao-e-trade-offs.md), seção "🚫 Armadilhas": achar que complexidade aparente significa necessidade de IA.

*Código da questão: 175767*

---

## Questão 08 · Componentes do Stack Enterprise

**Pergunta:** Quais são os quatro componentes do Stack Enterprise (Módulo 5.1)?

**Alternativas:**
- A) Sequential, Parallel, Supervisor e Hierarchical.
- B) Memória, Planejamento, Ferramentas e Ação.
- C) Kubernetes, Serverless, Edge e Model Router.
- D) RAG, Roteamento, Cache e Approval Gate.
- E) ✅ API Gateway, Orquestração, Serviços Compartilhados e Observabilidade.

**Resposta: E.** No mesmo formato do Gateway compartilhado usado internamente pela Uber.

### Resolução comentada

Cada alternativa errada é uma lista de quatro de outro módulo, e isso é a armadilha: A é do Módulo 3, B do 2.1, C do 5.3 e D do Módulo 4. A pergunta pede o stack da **plataforma**, quando o foco sai de uma requisição e vai para vários estudos compartilhando infraestrutura.

O stack tem quatro componentes: API Gateway (entrada única), Orquestração (Kubernetes decide quantas instâncias de cada serviço), Serviços Compartilhados (embeddings, modelos, cache, recuperação, uma vez só) e Observabilidade unificada. Na analogia do guia: uma empresa de ônibus com trinta linhas tem garagem central, oficina única, despacho único e um painel que enxerga todas as linhas.

O modelo é o GenAI Gateway da Uber, citado no guia: mais de 60 casos de uso, cerca de 30 times, 16 milhões de consultas por mês e redação automática de PII.

### Entenda os conceitos

- **API Gateway:** entrada única para todos os estudos: autenticação, controle de acesso, limite de taxa, observabilidade e gestão de modelos. Exemplos: LiteLLM, AI Gateway da Cloudflare e da Kong, com cache, limites e failover entre modelos.
- **Orquestração (Kubernetes):** a fundação da plataforma de IA. Escalar é administrar instâncias, não recriar serviços. O KServe serve modelos com canary por percentual de tráfego; o Kubeflow cuida do treino (servir x treinar).
- **Serviços compartilhados:** embeddings, modelos de linguagem, cache e recuperação existem uma vez para todos. O antipadrão é cada equipe reimplementar o seu (trinta versões do mesmo componente).
- **Observabilidade unificada:** logs, métricas, trilhas e eventos numa visão única, sem perder a identificação de cada estudo.
- **Três princípios do compartilhamento:** Loose Coupling (acoplamento fraco), Clear Interfaces (contratos explícitos) e Policy-Driven Control (política central avaliada em runtime, ex.: OPA).
- **Eval Gate:** antes de promover um novo modelo, roda um golden set e só autoriza dentro de uma tolerância. O canary responde "como trocar", o Eval Gate "se deve trocar".
- **Compartilhado x específico:** gateway, embeddings e observabilidade tendem a ser comuns; documentos e protocolos de cada estudo permanecem específicos (o Semantic Cache do Trial Forge é por estudo, nunca compartilhado).

### Por que as outras erram

- **A:** Sequential, Parallel, Supervisor e Hierarchical são padrões de orquestração entre agentes (Módulo 3).
- **B:** Memória, Planejamento, Ferramentas e Ação é a anatomia de um agente único (Questão 06).
- **C:** Kubernetes, Serverless e Edge são as opções de implantação híbrida (Módulo 5.3), e Model Router é padrão do Módulo 4. Não formam o stack.
- **D:** RAG, Roteamento, Cache e Approval Gate são padrões de design do Módulo 4, dentro de um fluxo, não componentes da plataforma.

### Aprofundar no guia

- [12 · Do fluxo à plataforma: stack enterprise, três princípios e Eval Gate](./projeto-de-leitura/12-stack-enterprise-principios-e-eval-gate.md), seção "O que é": os quatro componentes, o exemplo da Uber, KServe x Kubeflow e o Eval Gate.
- [12 · Do fluxo à plataforma: stack enterprise, três princípios e Eval Gate](./projeto-de-leitura/12-stack-enterprise-principios-e-eval-gate.md), seção "Como funciona": Loose Coupling, Clear Interfaces, Policy-Driven Control e o portão de entrada para novos consumidores.
- [12 · Do fluxo à plataforma: stack enterprise, três princípios e Eval Gate](./projeto-de-leitura/12-stack-enterprise-principios-e-eval-gate.md), seção "Cola rápida": tabela de todos os termos do módulo.
- [14 · Model Cascading e orçamento por tenant](./projeto-de-leitura/14-model-cascading-e-orcamento-por-tenant.md), seção "O que é": o fechamento da arquitetura completa sobre o stack.

*Código da questão: 175780*

---

## Questão 09 · Orquestração + Saga após falha parcial

**Pergunta:** No TrialForge, o Agente Protocolo inicia uma tarefa que depende do Agente ICF (já concluiu) e do Agente CSR (que falha no meio, deixando o estudo parcialmente atualizado). Considerando os Módulos 3.2 a 3.4, qual combinação evita estado inconsistente?

**Alternativas:**
- A) Ignorar a falha do CSR e prosseguir sem registro.
- B) ✅ Orquestrar com Sequential ou Supervisor e aplicar o padrão Saga para reverter (compensar) as ações já concluídas pelo Agente ICF quando o CSR falhar no meio.
- C) Handoff simples sem checkpoint de estado, esperando que o próximo refaça tudo.
- D) Delegar o rollback ao Agente ICF, sem visibilidade do estado do CSR.
- E) Parallel para os três agentes sem rollback, pois execução simultânea evita falhas em cascata.

**Resposta: B.** O controle central (Sequential ou Supervisor, Módulo 3.2) coordena a sequência, e a Saga (Módulo 3.4) compensa o que o ICF já concluíra.

### Resolução comentada

Dois problemas, duas peças. O primeiro é coordenação: quem sabe a ordem e o que já terminou? Sequential (cada etapa depende da anterior) ou Supervisor (um agente que coordena, acompanha e consolida) mantêm esse controle central. O segundo é consistência: o ICF já mudou o estudo e o CSR quebrou no meio. A Saga resolve com ações compensatórias.

O ponto de atenção é "quem dispara a compensação": no guia, normalmente o Supervisor, que enxerga o estado de todos. Por isso D (delegar ao ICF, sem visibilidade do CSR) não funciona.

Lembre também que compensação não é rollback automático de banco: cada etapa precisa da sua própria estratégia de desfazer, que depende do significado da operação (por exemplo, no protocolo, criar uma nova versão preservando o histórico). Na analogia da viagem: se o carro falha, você cancela o que depende dele, na ordem inversa, cada cancelamento do seu jeito.

### Entenda os conceitos

- **Sequential:** cada agente depende do resultado do anterior, nenhuma etapa começa antes de a anterior terminar. Previsível, fácil de depurar e auditar; a latência é a soma dos tempos.
- **Supervisor:** um agente decompõe a tarefa, encaminha aos especialistas, acompanha e consolida (inclusive resolve conflitos). Os especialistas não falam entre si. Não deve virar superagente.
- **Parallel:** agentes independentes ao mesmo tempo; o tempo total se aproxima da tarefa mais lenta. Exige agregação e pode gerar conclusões incompatíveis.
- **Handoff:** o agente transfere o controle inteiro a outro especialista, com o contexto acumulado. É substituição, não coordenação de falha.
- **Saga (Garcia-Molina e Salem, 1987):** cada etapa é uma transação independente; se uma posterior falha, executam-se ações compensatórias na ordem inversa, só nas etapas afetadas. Preserva o trabalho válido, ao contrário de recomeçar do zero.
- **Falhas parciais:** se um agente conclui e outro lança exceção, o supervisor precisa saber qual falhou para não descartar o trabalho bom. O timeout é acompanhado de fora pelo supervisor.
- **Timeout, retry com limite e idempotência:** tratam a falha técnica. A Saga trata o problema de conteúdo descoberto depois. O guia pede para não confundir os dois.
- **Teorema CAP:** diante de uma partição, escolher entre consistência (esperar) e disponibilidade (seguir com informação parcial). A decisão é da arquitetura, por componente.

### Por que as outras erram

- **A:** ignorar a falha e não registrar deixa o estudo parcialmente atualizado, exatamente o estado inconsistente que a questão quer evitar. O guia pede que a falha tenha comportamento definido.
- **C:** Handoff transfere controle, não cuida de falha. Sem checkpoint de estado e esperando que o próximo "refaça tudo", descarta o trabalho válido e não há garantia de consistência.
- **D:** compensar exige visão do estado global, que o ICF não tem. Quem dispara a compensação é o Supervisor (ou o controle central).
- **E:** execução simultânea não evita falhas, só as torna mais difíceis de coordenar, e sem rollback o CSR quebrado continua deixando estado parcial. Quanto a Parallel, é ambíguo no guia: o tópico 07 coloca TCLE e CSR como Parallel após o protocolo, e o tópico 06 diz que o relatório final depende dos anteriores; descartar Parallel por isso é defensável, não definitivo.

### Aprofundar no guia

- [07 · Falhas distribuídas: CAP, timeout, retry, idempotência, Saga e fila](./projeto-de-leitura/07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md), seção "O que é": Saga, ações compensatórias, CAP e idempotência.
- [07 · Falhas distribuídas: CAP, timeout, retry, idempotência, Saga e fila](./projeto-de-leitura/07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md), seção "Como funciona": o Distributed Failure Canvas e as "Falhas parciais".
- [06 · Seis padrões de orquestração](./projeto-de-leitura/06-seis-padroes-de-orquestracao.md), seção "O que é": Sequential, Parallel, Supervisor, Hierarchical, Group Chat e Handoff, com a árvore de escolha em "Como funciona".
- [Disciplina 04 · Multi-agent systems: supervisor, papéis e handoffs](../04-criacao-de-agentes-autonomos/projeto-de-leitura/15-multi-agent-systems.md), seção "Tecnicamente": o supervisor e o handoff vistos em outro projeto.

*Código da questão: 175775*

---

## Questão 10 · Template de rastreamento do loop ReAct

**Pergunta:** No Template de Rastreamento do loop ReAct (Módulo 2.2), quais campos são preenchidos a cada volta?

**Alternativas:**
- A) Tarefa, Agente Responsável, Prazo e Status.
- B) ✅ Pensamento, Ação, Observação, Continua? e Resposta Final (só preenchida na volta em que Continua? for "Não").
- C) Pergunta, Resposta, Confiança e Fonte.
- D) Prompt, Contexto, Ferramenta e Resultado Final.
- E) Entrada, Modelo, Saída e Custo.

**Resposta: B.** A cada volta registra Pensamento, Ação, Observação e se o agente decidiu continuar; a Resposta Final só na volta em que decide parar.

### Resolução comentada

O nome diz o que é: rastreamento do **loop ReAct**. Então os campos têm de espelhar as etapas do ciclo: pensar, agir, observar e decidir se continua. Só a B tem essas quatro etapas, mais a Resposta Final como saída do ciclo. A é um quadro de gestão de tarefas, C é um registro de Q&A, D e E são campos de uma chamada qualquer ao modelo.

Cuidado com o detalhe: a Resposta Final só é preenchida na última volta, quando Continua? for "Não". Nas voltas intermediárias fica vazia. Um agente que resolve em uma volta tem uma linha só; um complexo tem várias.

Para que serve: quando o agente se comporta de forma inesperada, raramente o problema está só no prompt inicial. Normalmente uma observação intermediária foi mal interpretada, e a tabela por volta permite achar qual.

### Entenda os conceitos

- **ReAct (Reasoning + Acting, Yao et al., ICLR 2023):** um ciclo em que o agente raciocina, age numa ferramenta, observa o resultado e decide se já tem contexto suficiente. Analogia do guia: o detetive que vai atrás de pistas antes de fechar o caso.
- **Pensamento:** o que já sei e o que falta (liga ao planejamento).
- **Ação:** chamada a uma ferramenta (busca, API, RAG, cálculo), delegando ao determinístico.
- **Observação:** o resultado volta como novo contexto, não como resposta final.
- **Continua?:** a decisão "já tenho o suficiente?". Se sim, o ciclo termina e a Resposta Final é preenchida; se não, nova volta.
- **Loops variáveis:** uma pergunta simples resolve em uma volta, uma complexa em várias. É um mecanismo que decide dinamicamente o próximo passo, não uma sequência fixa.
- **Riscos e contenção:** custo crescente e ciclos sem convergência. Contenha com limite de iterações, orçamento de custo ou tempo e um critério de confiança que, sem melhora, encaminha a humano. O canvas pede distinguir "parou por convergência" de "parou porque o limite de voltas foi atingido".
- **Reflection (complemento do mesmo tópico):** não usa ferramenta, só critica o que já foi produzido. ReAct reúne informação, Reflection verifica qualidade.
- **React Loop Canvas:** o template do repositório, com colunas Volta, Pensamento, Ação, Observação, Continua? e Resposta Final.

### Por que as outras erram

- **A:** Tarefa, Agente Responsável, Prazo e Status é um quadro de gestão de tarefas, sem nada do ciclo pensar, agir, observar.
- **C:** Pergunta, Resposta, Confiança e Fonte descrevem o resultado de uma consulta (parecido com um registro de RAG), não o passo a passo do loop.
- **D:** Prompt, Contexto, Ferramenta e Resultado Final são ingredientes de uma chamada, mas não registram as voltas nem a decisão de continuar.
- **E:** Entrada, Modelo, Saída e Custo são metadados de uma chamada ao modelo, úteis em observabilidade, mas não são o rastreamento do raciocínio.

### Aprofundar no guia

- [03 · ReAct e Reflection](./projeto-de-leitura/03-react-e-reflection.md), seção "O que é": as quatro etapas do ciclo, os loops variáveis e os riscos com a contenção.
- [03 · ReAct e Reflection](./projeto-de-leitura/03-react-e-reflection.md), seção "No código do repo": o `react-loop-canvas.md` com as colunas Volta, Pensamento, Ação, Observação, Continua? e Resposta Final.
- [03 · ReAct e Reflection](./projeto-de-leitura/03-react-e-reflection.md), seção "Como funciona": a observabilidade do loop; e, em "No código do repo" (Fluxo, item 2), os sinais de alerta (observação repetida sem mudança, ação sem pensamento).
- [Disciplina 04 · Os três padrões de raciocínio](../04-criacao-de-agentes-autonomos/projeto-de-leitura/02-tres-padroes-de-raciocinio.md): ReAct, Plan-and-Execute e Reflection lado a lado.

*Código da questão: 175769*

---

## Pontos de atenção na prova

- **Texto das alternativas:** todas vieram completas no enunciado e foram mantidas como recebidas.
- **Numeração "Módulo N.M":** o README mapeia Módulo N · Aula M. As referências da prova (4.1, 4.2, 4.4, 4.5, 1.3, 1.4, 2.1, 2.2, 3.2 a 3.4, 5.1, 5.2) batem com as aulas do README. O guia chama o Módulo 4.5 de "gateway integrado" (tópico 11).
- **Questão 01:** o guia confirma o limiar 0,7 e a regra `sintese_csr OU confianca < limiar` (tópico 10) e o valor 0,633 para tema fora do banco (tópico 11). Atenção: a Atividade 4 do repositório traz 0,643 onde os demais materiais trazem 0,633 (provável erro de digitação), e o guia registra isso. O ponto "dois gatilhos independentes" segue a resolução da prova e o tópico 10.
- **Questão 03:** a apostila só detalha o Basic RAG; Hybrid Search, Multi-Index e Agentic RAG vêm dos slides e do canvas (tópico 08). O termo "árvore de decisão" corresponde ao "Seletor de padrão de RAG (canvas)", que é uma sequência de três perguntas e não uma árvore ramificada formal. O "Basic RAG como fallback" é o que o seletor diz ("se nenhum sintoma, Basic RAG basta").
- **Questão 04:** o guia usa "quinto sinal, qualidade semântica" (canvas de sinais, tópico 13). O material não detalha como medir qualidade semântica, só indica proxies (taxa de rejeição no gate).
- **Questão 06:** o termo "hub-and-spoke" **não aparece** no guia da disciplina; o material descreve os quatro componentes (memória, planejamento, ferramentas e ação) sem essa expressão. A resposta C segue a resolução da prova e é confirmada pelo tópico 02.
- **Questão 07:** o guia não traz a "tabela da Missão Prática #01" como tabela literal de combinações Sim/Não. O que existe é a função de classificação (P1 manda, depois P2, depois P3) e o exemplo da Missão Prática 1. A classificação "regra determinística simples" para Sim, Não, Não vem dessa precedência e da resolução da prova. O código retorna "regra" sempre que P1 é verdadeiro.
- **Questão 08:** o guia confirma os quatro componentes (tópico 12) e cita o GenAI Gateway da Uber, mas descreve o espelhamento como API no formato OpenAI com redação de PII. "No mesmo formato do Gateway compartilhado da Uber" é a explicação da resolução. A apostila grafa "LightLLM" onde o resto do material usa LiteLLM.
- **Questão 09:** o guia cobre Sequential, Supervisor e Saga (tópicos 06 e 07) e diz que o Supervisor normalmente aciona a compensação, mas não traz esse cenário específico (ICF concluiu, CSR falhou) como exercício. A resposta B segue a resolução da prova.
- **Questão 10:** o guia confirma as colunas do canvas (Volta, Pensamento, Ação, Observação, Continua?, Resposta Final). O detalhe "Resposta Final só na volta em que Continua? é Não" vem da resolução da prova e é coerente com o critério de parada do tópico 03. O nome "Template de Rastreamento" é o `react-loop-canvas.md`.

## Mapa de estudo desta disciplina

| Tema da prova | Tópico do guia que mais cobre |
|---------------|-------------------------------|
| Confidence Threshold e Approval Gate (Q01) | [10 · Approval Gate formalizado](./projeto-de-leitura/10-approval-gate-confidence-threshold-e-audit-trail.md) e [11 · O gateway integrado](./projeto-de-leitura/11-gateway-integrado.md) |
| Intent-Based Routing e Model Router (Q02) | [09 · Roteamento, cache semântico, prompt cache e streaming](./projeto-de-leitura/09-roteamento-cache-e-streaming.md) |
| Padrões de RAG (Q03) | [08 · RAG como padrão de arquitetura](./projeto-de-leitura/08-rag-basic-hybrid-multi-index-agentic.md) |
| Quatro sinais SRE e qualidade semântica (Q04) | [13 · Observabilidade de IA em escala e implantação híbrida](./projeto-de-leitura/13-observabilidade-e-implantacao-hibrida.md) |
| Framework das três perguntas (Q05, Q07) | [01 · Agente ou regra? O framework das três perguntas](./projeto-de-leitura/01-framework-de-decisao-e-trade-offs.md) |
| Anatomia do agente único (Q06) | [02 · Anatomia do agente único](./projeto-de-leitura/02-anatomia-do-agente-unico.md) |
| Stack Enterprise (Q08) | [12 · Do fluxo à plataforma: stack enterprise, três princípios e Eval Gate](./projeto-de-leitura/12-stack-enterprise-principios-e-eval-gate.md) |
| Padrões de orquestração e Saga (Q09) | [06 · Seis padrões de orquestração](./projeto-de-leitura/06-seis-padroes-de-orquestracao.md) e [07 · Falhas distribuídas, Saga e fila de mensagens](./projeto-de-leitura/07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md) |
| Loop ReAct e template de rastreamento (Q10) | [03 · ReAct e Reflection](./projeto-de-leitura/03-react-e-reflection.md) |
