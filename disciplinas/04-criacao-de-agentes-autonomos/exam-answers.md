# 📝 Disciplina 04 · Prova comentada

> Criação de agentes autônomos (OpsPilot). Cada questão traz o enunciado, as alternativas, a resposta certa, uma resolução passo a passo, uma mini-aula dos conceitos, o erro de cada alternativa errada e onde se aprofundar no guia de leitura.

**Resumo das respostas**

| Questão | Tema | Resposta |
|---------|------|----------|
| 01 | Aprovação humana pendente e MemorySaver | **A** |
| 02 | Modo do Copilot para analisar sem risco | **D** |
| 03 | ContextBuilder: o que nunca cortar e ordem de corte | **B** |
| 04 | Guardrail como hook do git e não do Copilot | **A** |
| 05 | Recuperar memória sem palavra em comum | **D** |
| 06 | Problema que o MCP resolve | **E** |
| 07 | Matriz de autonomia: silenciar todos os alertas | **E** |
| 08 | Quem executa a função no function calling | **A** |
| 09 | O que é o harness de um agente | **D** |
| 10 | Regra obrigatória do padrão Reflection | **D** |

---

## Questão 01 · Aprovação humana pendente e MemorySaver

**Pergunta:** O OpsPilot responde 202 aguardando aprovação humana para uma ação destrutiva. Antes de o humano decidir, o servidor reinicia. Com `MemorySaver` como checkpointer, o que acontece e qual a implicação para produção?

**Alternativas:** (o texto das alternativas B a E foi reconstruído a partir das justificativas da prova)
- A) ✅ A pendência é perdida: o `MemorySaver` guarda o estado em memória, então a aprovação posterior não encontra o que retomar. Em produção, o checkpointer precisa ser persistente.
- B) O `interrupt` mantém o processo vivo até a decisão, então o restart não afeta a pendência.
- C) A ação é negada automaticamente e um e-mail é enviado ao plantonista.
- D) A ação destrutiva é executada sem aprovação.
- E) O estado é recuperado do SQLite, que guarda o estado do grafo.

**Resposta: A.** A pendência é perdida, porque o `MemorySaver` vive só na memória do processo. Em produção, o checkpointer precisa ser persistente.

### Resolução comentada

Comece pela pergunta central: onde está guardado o "ponto em que o agente parou"? Com `MemorySaver`, esse ponto fica na RAM do processo do servidor. A RAM não sobrevive a um restart.

Quando o humano finalmente clica em aprovar, o sistema procura a pendência para retomar. Como o servidor reiniciou, o estado sumiu e não há o que retomar. Hipótese (o guia não diz o que `POST /approvals/:id` devolve quando a pendência não existe): nada "dá errado" de forma visível e a pendência simplesmente desaparece.

A implicação de produção sai direto disso: o que precisa sobreviver ao restart tem de ser gravado em armazenamento persistente. Por simplicidade, o curso usa memória. Registrar que produção exige um checkpointer persistente é dedução da resolução da prova (complemento), não consta no guia.

### Entenda os conceitos

- **Aprovação humana (human-in-the-loop, HIL):** antes de executar uma ação de alto impacto, o agente para e espera um humano. No código do curso, com `awaitHumanApproval: true` o chat não executa, guarda a requisição e responde **202** (aceito, ainda pendente). A decisão do plantonista executa ou descarta a ação.
- **HTTP 202:** código que significa "recebi o pedido, ainda não executei". Aqui sinaliza que existe uma pendência esperando decisão.
- **Checkpointer:** componente que guarda uma "foto" do estado do grafo a cada passo, para poder retomar depois. Analogia: o save de um jogo. Se o save fica só na memória do console, desligar o console apaga o save. (complemento, fora do material: o guia não usa o termo `MemorySaver` nem `interrupt`.)
- **`interrupt` do LangGraph:** pausa a execução do grafo num ponto e permite retomar dali após uma decisão externa. Pausa o grafo, não o processo. (complemento, fora do material.)
- **Persistência x memória do processo:** o guia mostra o contraste no próprio código: as aprovações ficam num `Map` em memória e somem no restart, sem expiração, enquanto trace, conversas e memórias ficam no SQLite.

### Por que as outras erram

- **B:** o `interrupt` pausa o grafo, não o processo. Ele não impede o servidor de reiniciar.
- **C:** nada nega a ação sozinho nem manda e-mail. Pela hipótese acima, a pendência simplesmente some.
- **D:** seria o pior cenário (executar ação destrutiva sem aprovação), e não é o que acontece: sem estado salvo, nada é retomado.
- **E:** o SQLite guarda trace e dados do OpsStore, não o estado do grafo num `MemorySaver`. Memória não sobrevive a restart.

### Aprofundar no guia

- [13 · Observabilidade e limites de autonomia](./projeto-de-leitura/13-observabilidade-e-limites-de-autonomia.md), seção "Como funciona" (human-in-the-loop, 202) e "No código do repo" (itens sobre `MemoryApprovalStore` e "Armadilhas e achados": aprovação num `Map` que some no restart).
- [12 · LangGraph no OpsPilot](./projeto-de-leitura/12-langgraph-roteador-e-fallback.md), seção "O que é": estado compartilhado do grafo, nós e transições.
- [06 · SQLite, OpsStore e prepared statements](./projeto-de-leitura/06-sqlite-opsstore-e-prepared-statements.md), seção "O que é": o que o curso persiste de fato em disco.

*Código da questão: 176707*

---

## Questão 02 · Modo do Copilot para analisar sem risco

**Pergunta:** O Copilot deve analisar uma decisão de arquitetura e explicar as alternativas, sem risco de alterar arquivo. Qual modo usar?

**Alternativas:** (texto reconstruído a partir das justificativas da prova)
- A) Agent, com a deny list vazia.
- B) Autocomplete.
- C) Agent, negando todas as aprovações de comando.
- D) ✅ Ask.
- E) Edit, apontando só arquivos de leitura.

**Resposta: D.** Ask.

### Resolução comentada

Leia o requisito: "analisar e explicar", "sem risco de alterar arquivo". A pergunta pede o modo cuja natureza já é somente leitura, não um modo perigoso domado com configuração.

Os três modos do Copilot formam uma escada de autonomia e risco. Ask só lê e responde. Edit faz edições dirigidas nos arquivos que você aponta. Agent planeja, edita vários arquivos e roda comandos pedindo aprovação. Para analisar sem risco, o degrau mais baixo (Ask) resolve sem remendo.

Escolher o modo certo é, segundo a aula, "metade da habilidade": o mesmo pedido num modo com mais poder do que o necessário abre risco à toa.

### Entenda os conceitos

- **Ask / Edit / Agent:** perguntar sem alterar nada, editar arquivos de forma dirigida, ou planejar e executar com iteração (Agent). O guia define os três na cola rápida do tópico 00.
- **Agente:** recebe um objetivo, planeja e executa a tarefa completa em ciclos de perceber, raciocinar, agir e ajustar pelo resultado. Num agente de código, o ambiente é o repositório. Autocomplete não é agente.
- **Deny list / allow list:** lista de comandos de terminal que sempre exigem um humano (deny: remoção recursiva, `sudo`, `git push --force`, ler `.env`) e lista dos que rodam sem pop-up (allow: testes, typecheck, `git status`). Analogia da vovó: "não mexa no armário" é instrução; trancar o armário é permissão.
- **Instrução x permissão:** instrução influencia o modelo, permissão é aplicada pelo ambiente. Só a permissão garante.
- **Escada de autonomia e risco:** expressão da resolução da prova. O guia confirma os três modos, mas não usa essa expressão. (complemento, fora do material)

### Por que as outras erram

- **A:** Agent com deny list vazia é o modo de maior risco, sem nenhum veto.
- **B:** autocomplete não é agente nem serve para analisar e explicar alternativas.
- **C:** Agent negando todas as aprovações ainda é um modo feito para agir, e é uma solução remendada para um problema que o Ask já resolve.
- **E:** Edit existe para editar. Apontar só arquivos de leitura é contornar o modo, em vez de escolher o que só lê.

### Aprofundar no guia

- [00 · O agente de código por dentro](./projeto-de-leitura/00-agente-de-codigo-harness-e-context-engineering.md), seção "Cola rápida": a linha Ask / Edit / Agent e as definições de harness, allow list e deny list.
- Mesmo tópico, seção "O que é": diferença entre agente e skill, e "Instrução não é permissão".
- Mesmo tópico, seção "Como funciona": modo interativo x modo de planejamento, e o teste da allow/deny list nos dois sentidos.

*Código da questão: 176692*

---

## Questão 03 · ContextBuilder: o que nunca cortar e ordem de corte

**Pergunta:** O ContextBuilder, com orçamento de tokens por seção, estourou o teto. O que nunca deve ser cortado e qual a ordem de corte?

**Alternativas:** (texto reconstruído a partir das justificativas da prova)
- A) O corte é decidido pelo próprio modelo, por saída estruturada.
- B) ✅ System prompt e mensagem do usuário são intocáveis. Corta-se o histórico (mensagens mais antigas primeiro) e as memórias (menor score primeiro).
- C) Nada é intocável e todas as seções são cortadas proporcionalmente.
- D) A mensagem do usuário é a primeira a ser cortada ou resumida.
- E) As memórias são intocáveis e o system prompt é cortado primeiro.

**Resposta: B.** System prompt e mensagem do usuário são intocáveis. Corta-se o histórico (mensagens mais antigas primeiro) e as memórias (menor score primeiro).

### Resolução comentada

Pense no que o agente precisa para funcionar. Sem o system prompt, ele não sabe como se comportar. Sem a mensagem do usuário, não sabe o que fazer. Esses dois são o núcleo e não podem ser sacrificados.

O resto é contexto de apoio e tem ordem natural de descarte. No histórico, as mensagens mais antigas valem menos que as recentes, então saem primeiro. Nas memórias, cada uma já vem com um score de relevância, então perde-se a de menor score antes.

O ponto de engenharia é que essa política é uma regra de negócio explícita, configurada por variáveis de ambiente e testável: um teste com tetos artificialmente baixos prova a ordem de corte. Deixar o modelo decidir, ou cortar tudo igual, tornaria o comportamento imprevisível.

### Entenda os conceitos

- **Context stitching:** montar o prompt a partir de seções (system, resumo, histórico, memórias, mensagem), cada uma com teto, prioridade e regra de corte próprios.
- **ContextBuilder:** ponto único de montagem para todas as estratégias, que também devolve um breakdown por seção (permitido x efetivo), tornando o orçamento auditável. Analogia da vovó: a marmita com compartimentos de tamanho fixo; se o feijão passa, tira-se do feijão, não da sobremesa.
- **Regras de corte:** `never` (intocável), `truncate`, `oldest-first` (mais antigas primeiro) e `lowest-score-first` (menor relevância primeiro).
- **Orçamento é teto, não meta:** se sobra espaço, não se enche com informação irrelevante. Valores de exemplo da aula: resumo ~200 e memórias ~300 tokens, configuráveis por ambiente (`CONTEXT_BUDGET_*`).
- **Contexto ativo e context rot:** contexto ativo é tudo que o modelo enxerga numa chamada. Mais tokens não é mais inteligência: o ruído acumulado degrada a qualidade (context rot), e o meio de um contexto longo recebe menos atenção que o início e o fim ("lost in the middle").
- **Memória com score:** as memórias recuperadas vêm com pontuação de similaridade, o que permite descartar a menos relevante primeiro (veja a questão 05).

### Por que as outras erram

- **A:** deixar o modelo decidir o corte por saída estruturada torna a regra imprevisível e impossível de testar de forma determinística.
- **C:** sem nada intocável e com corte proporcional, o pedido e o comportamento podem ser mutilados.
- **D:** cortar ou resumir a mensagem do usuário destrói justamente o pedido.
- **E:** inverte a prioridade: memórias são ruído descartável e o system prompt é o que define o comportamento.

### Aprofundar no guia

- [11 · Context stitching: ContextBuilder](./projeto-de-leitura/11-context-stitching-contextbuilder.md), seção "O que é": a política de corte de cada seção. A "Cola rápida" lista as quatro regras.
- Mesmo tópico, seção "Como funciona": a sequência system, resumo, histórico, memórias e o teste com tetos baixos.
- [10 · Contexto como orçamento](./projeto-de-leitura/10-contexto-como-orcamento.md), seção "O que é": medir tokens, context rot, "lost in the middle" e sumarização em rolo.

*Código da questão: 176704*

---

## Questão 04 · Guardrail como hook do git e não do Copilot

**Pergunta:** Por que o guardrail de typecheck e testes a cada commit foi implementado como hook do git (pre-commit) e não como recurso do Copilot?

**Alternativas:** (texto reconstruído a partir das justificativas da prova)
- A) ✅ O Copilot não tem hooks, e o hook do git vale para qualquer forma de commitar, inclusive commits do agente ou em CI.
- B) O git obriga revisão humana antes de aceitar o commit.
- C) Os hooks do Copilot só funcionam em repositórios privados.
- D) O hook do git é mais rápido que o do Copilot.
- E) Só o plano Enterprise do Copilot libera hooks.

**Resposta: A.** O Copilot não tem hooks, e o hook do git vale para qualquer forma de commitar, inclusive commits do agente ou em CI.

### Resolução comentada

A pergunta é "por que git e não Copilot". A resposta tem duas pernas. A primeira: o Copilot não tem hooks (diferente do Claude Code), então não existia essa opção ali. A segunda, a mais importante de aprender: mesmo que existisse, o hook do git é melhor porque a garantia fica independente da ferramenta de IA.

Se o commit acontece pelo Copilot, por outro agente, pelo terminal comum ou em CI, o pre-commit do git roda do mesmo jeito. Uma instrução dada ao modelo pode ser esquecida; um hook não depende da vontade do modelo.

Por isso os guardrails foram desenhados em três camadas: deny list (veto antes de rodar), pre-commit (portão no commit) e CI citada como possível terceira camada (o guia diz "uma terceira camada poderia ser CI" e o notas-api não tem workflow).

### Entenda os conceitos

- **Guardrail determinístico:** verificação executada independentemente da decisão do modelo. Permissão responde "esta ação pode rodar?"; guardrail determinístico responde "o resultado continua válido?".
- **Pre-commit (hook do git):** roda typecheck e testes antes de aceitar o commit e funciona no terminal comum, fora do chat. Analogia da vovó: o porteiro que não deixa sair da obra com a prumada torta, mesmo que o pedreiro tenha esquecido a regra. Atenção: só vale com `git config core.hooksPath .githooks`, e nada no repositório automatiza isso.
- **Deny list:** veto de comandos perigosos antes de rodarem (veja a questão 02).
- **CI:** citada no guia como possível terceira camada, o juiz no servidor; o notas-api não tem workflow de CI. O hook local não deve ser a única barreira.
- **Instrução x permissão:** instrução influencia, permissão do ambiente garante.
- **Hooks no Copilot:** a afirmação "o Copilot não tem hooks, diferente do Claude Code" vem da resolução da prova, não do guia. (complemento, fora do material)

### Por que as outras erram

- **B:** o git não obriga revisão humana. O pre-commit só roda typecheck e testes.
- **C:** não existe restrição de hooks do Copilot a repositórios privados, porque ele simplesmente não tem hooks.
- **D:** velocidade não é o motivo da escolha.
- **E:** não há plano Enterprise que libere hooks no Copilot. O ponto é a independência da ferramenta.

### Aprofundar no guia

- [01 · Spec-Driven Development do zero](./projeto-de-leitura/01-spec-driven-development-do-zero.md), seção "O que é" (item "Guardrails em camadas") e "Armadilhas" (esquecer de ativar o hook, tratá-lo como única barreira).
- [00 · O agente de código por dentro](./projeto-de-leitura/00-agente-de-codigo-harness-e-context-engineering.md), seção "O que é": allow list e deny list, e a diferença entre instrução e permissão.
- [16 · Live: SDD enterprise e catálogo do Spec Kit](./projeto-de-leitura/16-live-sdd-enterprise-and-spec-kit-catalog.md), seção "O que é": o mesmo harness com Claude Code e o arquivo único de instruções espelhado por symlink.

*Código da questão: 176694*

---

## Questão 05 · Recuperar memória sem palavra em comum

**Pergunta:** Um fato guardado como "prefere os alertas críticos primeiro" é recuperado quando o usuário escreve "organiza meu plantão", sem nenhuma palavra em comum. Que mecanismo permite isso?

**Alternativas:** (texto reconstruído a partir das justificativas da prova)
- A) Uma regra condicional escrita na spec.
- B) O histórico da conversa.
- C) Busca por palavra-chave, com stemming e sinônimos.
- D) ✅ Embeddings: cada texto vira um vetor e a proximidade entre vetores mede a semelhança de significado.
- E) Cache do modelo.

**Resposta: D.** Embeddings: cada texto vira um vetor e a proximidade entre vetores mede a semelhança de significado.

### Resolução comentada

O dado-chave do enunciado é "nenhuma palavra em comum". Qualquer mecanismo que dependa de texto igual ou parecido (palavra-chave, regra, histórico) fica de fora. Sobra o que compara significado.

É o que a memória semântica faz: ao gravar o fato, guarda também seu embedding. Na hora do recall, transforma a mensagem atual em vetor e mede a proximidade com os vetores guardados. "Organiza meu plantão" fica perto de "alertas críticos primeiro" no espaço de significado, mesmo sem nenhuma palavra repetida.

O limiar de relevância mínima evita o excesso: numa pergunta sem relação, nada passa do corte e nada é injetado, porque ruído no prompt é pior que não injetar nada.

### Entenda os conceitos

- **Embedding:** representação numérica (vetor) de um texto. Textos de sentido parecido ficam próximos. O modelo do curso é o `all-MiniLM-L6-v2`, com 384 dimensões, rodando localmente: sem custo de API e sem enviar preferências do usuário para fora.
- **Similaridade por produto escalar:** sobre vetores normalizados equivale ao cosseno. Quanto maior, mais parecido o significado.
- **Memória episódica x semântica:** episódica é o diário do que aconteceu, em ordem (conversa por `conversationId`, janela recente). Semântica são fatos e preferências destilados, por `userId`. Analogia da vovó: o diário do plantão x o caderninho de preferências, que é pesquisado por significado e não pela palavra exata.
- **`remember` e `recall`:** `remember` deduplica (similaridade acima de 0,92 não grava de novo e devolve `stored: false`). `recall` devolve no máximo 3 memórias e só as acima do limiar 0,3, porque sempre existem três "melhores", mesmo ruins.
- **Refletor de aprendizado:** chamada depois da resposta, com saída estruturada, que decide se há um fato durável para guardar. Pedido pontual e segredo não viram memória.
- **Busca semântica x busca por palavra:** a primeira compara significado, a segunda compara texto. O assunto reaparece em RAG na Disciplina 01.

### Por que as outras erram

- **A:** regra condicional na spec dependeria de alguém prever essa frase exata.
- **B:** o histórico da conversa guarda o que foi dito naquela conversa, não preferências duráveis por usuário.
- **C:** busca por palavra-chave, mesmo com stemming e sinônimos, não liga "plantão" a "alertas críticos" sem uma lista pronta.
- **E:** cache do modelo reaproveita respostas ou prefixos, não recupera fatos por significado.

### Aprofundar no guia

- [09 · Memória do agente](./projeto-de-leitura/09-memoria-episodica-e-semantica.md), seção "O que é": camadas de memória, embeddings, dedup 0,92 e limiar 0,3. A "Cola rápida" resume os termos.
- Mesmo tópico, seção "No código do repo": `memory-store.ts` e `embeddings.ts`, e o comando `curl` para testar "organize o meu plantão". Em "Armadilhas e achados" há os remendos "war room" que influenciam esse exemplo.
- [01 · Disciplina 01, RAG, embeddings e busca semântica](../01-fundamentos-de-ia-e-llm/projeto-de-leitura/11-rag-embeddings-busca-semantica.md), seção "Embeddings e Vector Databases (Cap. 2)": a ideia de busca por sentido, com o mesmo modelo `all-MiniLM-L6-v2` local.

*Código da questão: 176700*

---

## Questão 06 · Problema que o MCP resolve

**Pergunta:** Qual problema o MCP resolve?

**Alternativas:** (texto reconstruído a partir das justificativas da prova)
- A) A falta de hooks no Copilot.
- B) O limite da janela de contexto.
- C) A falta de memória persistente entre sessões.
- D) O custo de tokens em conversas longas.
- E) ✅ O problema N×M: N agentes e M fontes de ferramentas exigiriam uma integração artesanal por par; com um protocolo comum isso cai para N+M.

**Resposta: E.** O problema N×M.

### Resolução comentada

Descreva o problema com números. Se você tem 3 agentes e 4 fontes de ferramentas e cada par precisa de uma integração própria, são 3 x 4 = 12 integrações. Com um protocolo comum, cada agente aprende o protocolo uma vez e cada fonte o implementa uma vez: 3 + 4 = 7. Esse é o ganho do MCP.

Repare como as outras alternativas descrevem problemas reais, mas de outras partes do sistema (hooks, janela de contexto, memória, custo). O MCP é sobre interoperabilidade entre agente e ferramenta.

Na unidade, o aluno inverte o papel: deixa de ser cliente e vira provedor, construindo o MCP server do OpsPilot reutilizando a mesma `OpsStore` e os mesmos schemas Zod. Regra da aula: o MCP não é um novo backend, é outra porta para a mesma aplicação.

### Entenda os conceitos

- **MCP (Model Context Protocol):** protocolo aberto entre agentes e provedores de ferramentas. Escreve-se o servidor uma vez e qualquer cliente compatível o usa. A imagem "USB-C dos agentes" vem da resolução da prova e também aparece como "USB-C das aplicações de IA" no tópico da Disciplina 03. Analogia da vovó: a tomada padrão na parede da cozinha.
- **N x M:** cada agente x cada fonte exige integração própria; o protocolo comum transforma o produto em soma. O guia da Disciplina 04 cita o problema N agentes x M fontes; a fórmula N+M vem da resolução da prova.
- **Tools, resources e prompts:** as três categorias que um servidor MCP pode expor. Tools são funções que o agente chama, resources são dados, prompts são templates. A aula foca nas tools.
- **stdio:** transporte por entrada e saída padrão do processo. No servidor stdio, o stdout é do protocolo: nada de `console.log`, o diagnóstico vai para stderr. Um log inocente pode ser lido pelo cliente como mensagem do protocolo.
- **Segunda porta:** a API HTTP e o MCP chegam à mesma lógica e ao mesmo estado (`SQLiteOpsStore`). Duplicar a regra de negócio no servidor MCP seria criar dois produtos.

### Por que as outras erram

- **A:** a falta de hooks no Copilot é outro assunto, tratado com hook do git.
- **B:** o MCP não é o mecanismo principal para a janela de contexto, embora reduza contexto ao expor ferramentas sob demanda (tópico 00 da disciplina 03); o foco da disciplina 04 é orçamento e poda.
- **C:** memória persistente entre sessões é função da memória episódica e semântica.
- **D:** o MCP não é o mecanismo principal para o custo de tokens em conversa longa, embora ajude ("menos tokens"); aqui o tratamento é sumarização e orçamento de contexto.

### Aprofundar no guia

- [08 · MCP: o OpsPilot como servidor de ferramentas](./projeto-de-leitura/08-mcp-servidor-do-opspilot.md), seção "O que é": protocolo aberto, segunda porta e regra do stdio. A "Cola rápida" tem o termo N x M.
- Mesmo tópico, seções "Como funciona" e "No código do repo": o servidor `McpServer` registrando `open_incident` e demais tools.
- [00 · Do plugin e function calling ao MCP (Disciplina 03)](../03-model-context-protocol-mcp/projeto-de-leitura/00-mcp-protocol-overview.md), seção "Como funciona": o problema N x M, o "USB-C das aplicações de IA" e a arquitetura host, client e server.

*Código da questão: 176699*

---

## Questão 07 · Matriz de autonomia: silenciar todos os alertas

**Pergunta:** Na matriz de autonomia, em qual faixa está "silenciar todos os alertas de produção por 60 minutos" e com qual mecanismo?

**Alternativas:** (texto reconstruído a partir das justificativas da prova)
- A) Faixa 2 (decide e registra), registrando a ação no trace.
- B) Faixa indiferente, com um teto de custo como critério de risco.
- C) Faixa liberada, porque a ação expira após 60 minutos.
- D) Faixa 4 (nunca faz).
- E) ✅ Faixa 3 (pede aprovação), com o grafo pausado por `interrupt` e retomado após a decisão humana.

**Resposta: E.** Faixa 3 (pede aprovação), com o grafo pausado por `interrupt` e retomado após a decisão humana.

### Resolução comentada

Para classificar uma ação, pergunte duas coisas: ela é reversível? Qual o impacto se der errado? Silenciar todos os alertas de produção deixa o plantão cego por uma hora. Mesmo que expire sozinho, durante esses 60 minutos nenhum alerta chega. Isso é alto impacto, então pede aprovação humana: faixa 3.

Por que não faixa 4? Porque faixa 4 é para capacidades que nem deveriam existir, como apagar a trilha de auditoria. Silenciar é legítimo, só precisa de um humano dizendo "sim".

O mecanismo: o grafo pausa com `interrupt`, o sistema responde 202 com um preview ("7 alertas serão silenciados por 60 min") e retoma do ponto exato quando o humano aprova. Esse é o cenário da prova (complemento): no guia (tópico 13, "No código do repo") aprovar executa a requisição guardada com um novo `requestId`, ou seja, um replay da requisição, não a retomada de um grafo pausado. É o espelho da aprovação de comando do Copilot da Unidade 1: o agente propõe, o humano decide.

### Entenda os conceitos

- **Matriz de autonomia:** quatro faixas. (1) decide sozinho: risco zero e reversível, como consultar alertas. (2) decide e registra de forma auditável: muda estado, mas é reversível, como abrir ou resolver incidente. (3) pede aprovação: ação destrutiva ou de alto impacto, como silenciar recursos, apagar histórico ou gasto acima de um teto. (4) nunca faz: capacidade que não deve existir, como apagar a própria trilha de auditoria ou vazar dados de usuário. Analogia da vovó: o manual de bordo diz o que o piloto automático faz sozinho e o que sempre pede o capitão.
- **`interrupt` + checkpointer:** pausa o grafo e guarda o ponto para retomar. Veja a questão 01. (complemento, fora do material: o guia não usa `interrupt`.)
- **Preview e 202:** resposta que mostra o que vai acontecer e avisa que a execução aguarda decisão.
- **Observabilidade:** a decisão fica auditável porque o agente tem trace persistido, logs JSON e métricas ligados por um `requestId`. Métrica mostra tendência, log mostra evento, trace mostra a trajetória.
- **Atenção ao que o código implementa:** o guia registra que o contrato de quatro faixas (AUTONOMIA.md) e a tool `silence_all_alerts` com `interrupt()` não foram implementados no repositório. O que existe é a aprovação humana por flag (`awaitHumanApproval`).

### Por que as outras erram

- **A:** faixa 2 só registra no trace, e aqui o plantão fica cego sem ninguém decidir.
- **B:** a faixa não é indiferente. O teto de gasto é gatilho de faixa 3 no guia, mas não é o critério que resolve "silenciar todos os alertas": o risco aqui é deixar o plantão cego, e o teto de custo com 429 nem foi implementado.
- **C:** expirar o tempo não torna a ação inofensiva: durante os 60 minutos nenhum alerta chega.
- **D:** faixa 4 é para o que nunca deve existir. Silenciar é uma capacidade legítima, só que com aprovação.

### Aprofundar no guia

- [13 · Observabilidade e limites de autonomia](./projeto-de-leitura/13-observabilidade-e-limites-de-autonomia.md), seção "O que é": as quatro faixas da matriz e o requestId. A "Cola rápida" resume os termos.
- Mesmo tópico, seção "No código do repo", item 6 (aprovação humana com 202 e `POST /approvals/:approvalId`) e "Armadilhas e achados" (o que não foi implementado).
- [00 · O agente de código por dentro](./projeto-de-leitura/00-agente-de-codigo-harness-e-context-engineering.md), seção "O que é": deny list e instrução x permissão, o mesmo princípio na Unidade 1.

*Código da questão: 176705*

---

## Questão 08 · Quem executa a função no function calling

**Pergunta:** No function calling, quem executa a função quando o modelo decide usar uma ferramenta?

**Alternativas:** (texto reconstruído a partir das justificativas da prova)
- A) ✅ O nosso runtime: o modelo só propõe um JSON com nome e argumentos, e o código local executa e devolve o resultado como nova mensagem.
- B) O provedor da API.
- C) O navegador do usuário.
- D) O próprio modelo, num ambiente de execução do provedor.
- E) O MCP, que é obrigatório para executar function calling.

**Resposta: A.** O nosso runtime.

### Resolução comentada

Lembre-se do que um modelo de linguagem é: algo que gera texto. Ele não roda código. Quando decide usar uma ferramenta, o que sai é uma proposta estruturada: o nome da função e os argumentos em JSON.

Quem pega essa proposta é o código do nosso lado (o runtime). Ele valida os argumentos (com Zod, no curso), executa a função de verdade e devolve o resultado ao modelo como uma nova mensagem de papel `tool`. Aí o modelo continua o raciocínio com esse resultado.

Resumo para decorar: o modelo propõe, o runtime executa. Isso explica por que validar a entrada da tool é responsabilidade nossa: o modelo pode propor argumentos errados.

### Entenda os conceitos

- **Function calling:** o modelo recebe funções com nome, descrição e estrutura de entrada, escolhe qual chamar e gera os argumentos. Surgiu em junho de 2023, segundo o tópico da Disciplina 03.
- **`tool_calls`:** no contrato cru, a resposta do modelo traz `tool_calls`, que é uma proposta de chamada, não uma execução. No guia, aparece só no LangChain (`AIMessage` com `tool_calls`, `ToolMessage` virando eventos do trace). O contrato cru em `curl` e a mensagem de papel `tool` vêm da resolução da prova. (complemento, fora do material)
- **Runtime:** o código nosso que fica em volta do modelo: recebe a proposta, valida, executa, devolve o resultado.
- **Validação com Zod:** nunca confiar no que vem de fora, nem em 200 de API externa. Descrição e schema Zod da tool formam uma interface controlada, e descrição ruim faz o agente escolher a ação errada.
- **Erro como observação:** quando a tool falha, o runtime devolve um texto legível em vez de lançar exceção, e o modelo decide o próximo passo. Analogia da vovó: o motoboy que avisa "não consegui confirmar a loja X, sigo com o que tenho".
- **MCP:** forma padronizada de expor tools, mas não é requisito para executar function calling.

### Por que as outras erram

- **B:** o provedor da API só devolve a proposta de chamada, não executa a função.
- **C:** o navegador do usuário não participa do contrato.
- **D:** o modelo só gera texto. Não há ambiente de execução dele no provedor para a sua função.
- **E:** o MCP é uma forma de expor tools, não é obrigatório para executar function calling.

### Aprofundar no guia

- [07 · Tools externas resilientes](./projeto-de-leitura/07-tool-externa-resiliente.md), seção "O que é": erro como observação, timeout, retry limitado e validação Zod.
- [05 · Uma API que também é um agente](./projeto-de-leitura/05-api-que-tambem-e-um-agente.md), seção "O que é": validação Zod na fronteira e o contrato `answer` + `trace` + `metrics`.
- [00 · Do plugin e function calling ao MCP (Disciplina 03)](../03-model-context-protocol-mcp/projeto-de-leitura/00-mcp-protocol-overview.md), seção "O que é": a linha do tempo do function calling e o que o MCP acrescenta.

*Código da questão: 176698*

---

## Questão 09 · O que é o harness de um agente

**Pergunta:** O que é o harness de um agente?

**Alternativas:** (texto reconstruído a partir das justificativas da prova)
- A) O repositório onde o agente trabalha.
- B) O modelo de linguagem.
- C) Um conjunto de prompts.
- D) ✅ O programa que executa o loop, oferece as ferramentas ao modelo e aplica as regras de execução.
- E) A janela de contexto.

**Resposta: D.** O programa que executa o loop, oferece as ferramentas ao modelo e aplica as regras de execução.

### Resolução comentada

Comece pelo problema: um LLM sozinho só prevê texto. Para virar agente, alguém precisa chamar o modelo em loop, entregar ferramentas, executar o que ele pedir e impor limites. Esse "alguém" é o harness.

Por isso o `while` que chamava o LLM, escrito nos módulos anteriores do curso, já era um harness. E o Copilot é um harness pronto e maduro. A partir da Unidade 1 o trabalho muda: deixa de ser construir o loop e passa a ser operar e configurar o harness.

Cada alternativa errada nomeia uma peça que existe no sistema, mas que não é o harness: o ambiente (repositório), o motor (modelo), a instrução (prompts) e o espaço de trabalho (janela de contexto).

### Entenda os conceitos

- **Harness:** programa que executa o loop do agente, disponibiliza ferramentas e aplica regras. Analogia da vovó: o escritório em volta do estagiário (a mesa, o terminal, o chefe que aprova gastos). Sem ele, o estagiário só conversa; com ele, age.
- **Agente x skill:** o agente recebe um objetivo, planeja e executa; a skill é uma capacidade atômica (terminal, editor, Git) usada durante a execução.
- **Loop do agente:** perceber, raciocinar, agir e ajustar pelo resultado, repetido até concluir.
- **Context engineering:** gerenciar tudo que ocupa a janela do modelo, não só o prompt do momento. Inclui o arquivo `.github/copilot-instructions.md` (memória permanente, curta e factual) e instruções com escopo (`applyTo`).
- **Context rot:** perda de foco do modelo quando o contexto acumula informação irrelevante.
- **Janela de contexto:** espaço de trabalho do modelo, aquilo que ele enxerga numa chamada.
- **Harness em outras ferramentas:** a ideia vale para Claude Code e Cursor, com adaptações de interface, segundo a apostila.

### Por que as outras erram

- **A:** o repositório é o ambiente onde o agente trabalha, não o harness.
- **B:** o modelo de linguagem é o que o harness usa, não o harness em si.
- **C:** um conjunto de prompts é instrução, e instrução influencia, mas não executa o loop nem aplica regras.
- **E:** a janela de contexto é o espaço de trabalho do modelo, não o programa que o cerca.

### Aprofundar no guia

- [00 · O agente de código por dentro](./projeto-de-leitura/00-agente-de-codigo-harness-e-context-engineering.md), seção "Explicando para a vovó" e "O que é": a analogia do escritório e a definição de harness. A "Cola rápida" tem as definições curtas.
- [02 · Os três padrões de raciocínio](./projeto-de-leitura/02-tres-padroes-de-raciocinio.md), seção "O que é": o Agent Mode e seu reasoning trace como exemplo de ReAct dentro de um harness.
- [16 · Live: SDD enterprise e catálogo do Spec Kit](./projeto-de-leitura/16-live-sdd-enterprise-and-spec-kit-catalog.md), seção "O que é": o item "SDD no harness" com os arquivos de instruções de cada ferramenta.

*Código da questão: 176691*

---

## Questão 10 · Regra obrigatória do padrão Reflection

**Pergunta:** Qual é a regra obrigatória ao usar o padrão Reflection?

**Alternativas:** (texto reconstruído a partir das justificativas da prova)
- A) O crítico deve usar um modelo mais forte que o gerador.
- B) A crítica deve ficar fora do trace.
- C) Reflection só se aplica a estratégias ReAct, não ao Plan-and-Execute.
- D) ✅ Ter critério de parada: um teto máximo de reflexões e a aprovação explícita do crítico.
- E) O crítico deve rodar em paralelo com o gerador.

**Resposta: D.** Ter critério de parada: um teto máximo de reflexões e a aprovação explícita do crítico.

### Resolução comentada

Pergunte o que pode dar errado num ciclo "gera, critica, regenera". Um crítico sempre acha algo a melhorar, então, sem regra de parada, o ciclo nunca termina. E cada rodada custa chamadas extras ao modelo. A regra obrigatória, portanto, é de parada.

A parada tem duas partes: o teto de rodadas (`maxReflections`, padrão 2 na implementação) e a aprovação explícita do crítico (um veredito com `approved` e `feedback`). Sem as duas, o custo e a latência fogem do controle.

As alternativas erradas inventam regras que parecem técnicas, mas contradizem o desenho: o crítico avalia o resultado depois de gerado (não em paralelo), vale para qualquer estratégia (não só ReAct) e sua crítica deve ser auditável no trace.

### Entenda os conceitos

- **Reflection:** gera um resultado, um crítico avalia contra critérios definidos e, se reprovar, produz feedback para uma nova versão. Analogia da vovó: o revisor que lê o texto pronto contra uma lista de critérios antes de deixar sair, e o fiscal que pode mandar refazer no máximo duas vezes.
- **Critério de parada:** teto de reflexões mais aprovação explícita. O despertador do detetive: sem ele, sempre se encontra mais uma gaveta para abrir.
- **Decorator (`withReflection`):** Reflection não é uma terceira estratégia independente, é uma camada que embrulha qualquer estratégia. Permite ReAct puro, Plan-and-Execute puro, ou qualquer um com Reflection, sem mexer em quem consome.
- **Crítico com critérios objetivos:** o veredito é validado com Zod e avalia a resposta contra as observações do trace. Crítico sem critério aprova ou reprova por gosto.
- **ReAct e Plan-and-Execute:** ReAct alterna pensar, agir e observar (adaptativo). Plan-and-Execute planeja, executa e replaneja (visão global; o plano pode envelhecer; teto de 8 passos no código).
- **Trace:** registro estruturado do passo a passo do raciocínio. O evento `critique` (com `round` e `approved`) e o custo de uma chamada a mais para o crítico estão confirmados nos tópicos 03 e 04; só "duas ou mais chamadas por rodada" é complemento, fora do material.
- **Custo:** Reflection soma chamadas mesmo quando a primeira resposta já estava boa. Na aula, ReAct puro levou ~35 s e com Reflection ~45 s.

### Por que as outras erram

- **A:** o crítico não precisa de modelo mais forte. Isso é escolha de custo, não regra obrigatória.
- **B:** a crítica deve ir para o trace como evento, nunca ficar fora dele.
- **C:** Reflection se aplica a qualquer estratégia, inclusive Plan-and-Execute.
- **E:** o crítico avalia o resultado depois de gerado, então não roda em paralelo com o gerador.

### Aprofundar no guia

- [02 · Os três padrões de raciocínio](./projeto-de-leitura/02-tres-padroes-de-raciocinio.md), seção "O que é" (item Reflection) e "Armadilhas" (rodar sem teto, crítico sem critérios).
- [04 · ReAct, Plan-and-Execute e Reflection no código](./projeto-de-leitura/04-estrategias-arena-e-bench.md), seção "O que é" (item "Reflection como Decorator") e "Como funciona" (números da aula com e sem Reflection).
- [05 · Uma API que também é um agente](./projeto-de-leitura/05-api-que-tambem-e-um-agente.md), seção "O que é": Strategy + Decorator e a escolha de aplicar Reflection por request.

*Código da questão: 176697*

---

## Pontos de atenção na prova

- **Alternativas reconstruídas:** o arquivo original só trazia o texto da alternativa correta e uma justificativa para cada errada. O texto das alternativas erradas (e o enunciado, onde indicado) foi reconstruído a partir dessas justificativas, não copiado da prova. Confira com o enunciado original se precisar do texto literal.
- **Questões 01 e 07:** o material divergiu da prova. No código do curso a aprovação humana usa `MemoryApprovalStore` (guarda a requisição e responde 202), e o guia registra que o contrato de quatro faixas (AUTONOMIA.md) e a tool `silence_all_alerts` com `interrupt()` do LangGraph não foram implementados. `MemorySaver` e `interrupt` não aparecem no guia. As respostas A e E seguem a resolução da prova. O guia confirma as quatro faixas, 202 e que silenciar recursos pede aprovação (tópico 13), e que aprovação em memória some no restart.
- **Questão 02:** o tópico 00 confirma Ask, Edit e Agent, mas não usa a expressão "escada de autonomia e risco". A resposta D segue a resolução da prova.
- **Questão 03:** confirmada no tópico 11 (system `never`, histórico das mais antigas, memórias de menor score). Ponto fino: no código a mensagem atual é intocável e a regra do resumo é `truncate`, seção que a questão não cita.
- **Questão 04:** o tópico 01 confirma pre-commit e deny list como guardrails determinísticos e CI como possível terceira camada (não implementada no repositório), funcionando no terminal comum. A afirmação "o Copilot não tem hooks" vem da resolução da prova, não do material.
- **Questão 05:** confirmada no tópico 09 (`all-MiniLM-L6-v2`, produto escalar de vetores normalizados, limiar de 0,3). O exemplo "organiza meu plantão" está na seção de execução do tópico, e o próprio guia avisa que a demo tem remendos "war room" que ajudam o recall.
- **Questão 06:** o tópico 08 confirma o problema N agentes x M fontes, a ideia de escrever o servidor uma vez e a reutilização de `OpsStore` e schemas Zod. A fórmula N+M e a imagem "USB-C" vêm da resolução da prova (a imagem também aparece no tópico 00 da Disciplina 03).
- **Questão 08:** o material não traz o contrato cru de `tool_calls` em `curl` nem a mensagem de papel `tool`. Só aparece o uso de `tool_calls` pelo LangChain no tópico 03 e a validação com Zod no tópico 07. A resposta A segue a resolução da prova.
- **Questão 09:** o tópico 00 confirma o harness como o programa que executa o loop, oferece ferramentas e aplica regras, e que o curso implementou esse loop antes.
- **Questão 10:** confirmada nos tópicos 02 e 04 (crítico sempre acha algo, teto de reflexões, decorator `withReflection`, até 2 reflexões). O evento `critique` no trace e o custo de uma chamada a mais para o crítico estão confirmados nos tópicos 03 e 04; só "duas ou mais chamadas por rodada" vem da resolução da prova (complemento).

---

## Mapa de estudo desta disciplina

| Tema da prova | Tópico do guia que mais cobre |
|---------------|-------------------------------|
| Aprovação humana pendente e MemorySaver (Q01) | [13 · Observabilidade e limites de autonomia](./projeto-de-leitura/13-observabilidade-e-limites-de-autonomia.md) |
| Modos Ask, Edit e Agent (Q02) | [00 · O agente de código por dentro](./projeto-de-leitura/00-agente-de-codigo-harness-e-context-engineering.md) |
| ContextBuilder e ordem de corte (Q03) | [11 · Context stitching: ContextBuilder](./projeto-de-leitura/11-context-stitching-contextbuilder.md) |
| Guardrail como hook do git (Q04) | [01 · Spec-Driven Development do zero](./projeto-de-leitura/01-spec-driven-development-do-zero.md) |
| Memória semântica e embeddings (Q05) | [09 · Memória do agente](./projeto-de-leitura/09-memoria-episodica-e-semantica.md) |
| Problema N x M do MCP (Q06) | [08 · MCP: o OpsPilot como servidor de ferramentas](./projeto-de-leitura/08-mcp-servidor-do-opspilot.md) |
| Matriz de autonomia (Q07) | [13 · Observabilidade e limites de autonomia](./projeto-de-leitura/13-observabilidade-e-limites-de-autonomia.md) |
| Function calling: quem executa (Q08) | [07 · Tools externas resilientes](./projeto-de-leitura/07-tool-externa-resiliente.md) |
| Harness de um agente (Q09) | [00 · O agente de código por dentro](./projeto-de-leitura/00-agente-de-codigo-harness-e-context-engineering.md) |
| Reflection e critério de parada (Q10) | [02 · Os três padrões de raciocínio](./projeto-de-leitura/02-tres-padroes-de-raciocinio.md) |
