# 🎯 Disciplina 08 · O que vale estudar

> Análise de prioridade (opinião fundamentada no guia e na prática atual), não conteúdo da apostila. Premissas: engenheiro de software backend (TypeScript/Node e Python, APIs e serviços na AWS, Postgres, filas e jobs) com produto que usa LLMs em produção, automação de fluxos (Jira/Slack) e uso intenso de agentes de código; objetivo de virar engenheiro de IA aplicada especialista (construir, avaliar, operar e governar sistemas com LLMs), não pesquisador de modelos.

## Veredito
Esta é a disciplina mais próxima do trabalho real de quem põe LLM em produção: o valor está em tratar o modelo como um componente e projetar a arquitetura em volta (decisão por subtarefa, orçamento, ordem dos padrões, gate humano, trilha, observabilidade, custo por tenant). O caso Trial Forge é só o veículo; o que fica são os critérios de decisão. Os protótipos (Ollama local, corpus minúsculo, cache em memória) são didáticos e não vão para produção.

Nota: ⭐⭐⭐⭐ (4 de 5). Alto retorno em critérios e padrões, com desconto porque boa parte do código é demo e porque há temas (Kubernetes/Edge, KServe) fora do dia a dia de quem consome modelos via API.

Mais útil para quem já constrói backends e precisa decidir onde o LLM entra, o que ele pode fazer sozinho e como provar que o sistema não degradou.

## Mapa de prioridade por tópico

| Tópico | Dia a dia | Especialista | Veredito |
|--------|-----------|--------------|----------|
| [00 · AI-First, 5 pilares e diagrama de referência](./00-ai-first-pilares-e-diagrama-de-referencia.md) | 🟢 | 🟡 | Conhecer |
| [01 · Agente ou regra? Três perguntas e orçamento de trade-offs](./01-framework-de-decisao-e-trade-offs.md) | 🟢 | 🟢 | Implementar |
| [02 · Anatomia do agente único](./02-anatomia-do-agente-unico.md) | 🟡 | 🟡 | Conhecer |
| [03 · ReAct e Reflection](./03-react-e-reflection.md) | 🟡 | 🟢 | Aprofundar |
| [04 · Ferramentas tipadas, MCP e calibragem do agente](./04-ferramentas-mcp-e-calibragem-do-agente.md) | 🟢 | 🟢 | Implementar |
| [05 · Por que múltiplos agentes](./05-por-que-multiplos-agentes.md) | 🟡 | 🟢 | Aprofundar |
| [06 · Seis padrões de orquestração](./06-seis-padroes-de-orquestracao.md) | 🟡 | 🟡 | Conhecer |
| [07 · Falhas distribuídas: CAP, Saga e fila](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md) | 🟢 | 🟡 | Implementar |
| [08 · RAG: Basic, Hybrid, Multi-Index e Agentic](./08-rag-basic-hybrid-multi-index-agentic.md) | 🟢 | 🟢 | Aprofundar |
| [09 · Roteamento, cache semântico, prompt cache e streaming](./09-roteamento-cache-e-streaming.md) | 🟢 | 🟡 | Implementar |
| [10 · Approval Gate, limiar de confiança e trilha de auditoria](./10-approval-gate-confidence-threshold-e-audit-trail.md) | 🟢 | 🟢 | Implementar |
| [11 · Gateway integrado e a ordem dos padrões](./11-gateway-integrado.md) | 🟢 | 🟡 | Implementar |
| [12 · Stack enterprise, três princípios e Eval Gate](./12-stack-enterprise-principios-e-eval-gate.md) | 🟡 | 🟢 | Aprofundar |
| [13 · Observabilidade de IA e implantação híbrida](./13-observabilidade-e-implantacao-hibrida.md) | 🟡 | 🟢 | Aprofundar |
| [14 · Model Cascading e orçamento por tenant](./14-model-cascading-e-orcamento-por-tenant.md) | 🟢 | 🟡 | Implementar |
| [15 · Live Temporal: Process Manager e workflows duráveis](./15-live-temporal-process-manager.md) | 🟡 | 🟡 | Conhecer |

## ✅ Implemente no dia a dia

1. **Decisão por subtarefa: agente ou regra, com orçamento por componente.**
   - Por que vale: minha análise: o erro mais comum é pôr LLM onde uma função resolve. O guia insiste em decompor a tarefa e perguntar se o erro é reversível (não se é "grave").
   - Primeiro passo mínimo: uma tabela no README do serviço com cada subtarefa, a resposta às três perguntas, e metas de latência, custo e precisão. Revise quando houver incidente. Use o "teste de realidade" do tópico 02 (se a memória longa fosse removida a tarefa ainda funcionaria? a ferramenta existe por necessidade ou "por precaução"?) e a falsa dependência do tópico 06 (o passo B só roda depois por ordem cronológica, sem usar dado de A? então é Parallel; roteamento simples pede Supervisor fixo, um roteador determinístico).
   - Quando não adotar: protótipo descartável. Aí o orçamento é só ruído.
   - Tópico: [01](./01-framework-de-decisao-e-trade-offs.md).

2. **Ferramentas tipadas com enum fechado, retorno estruturado e limite de iterações no código.**
   - Por que vale: é onde o agente toca seu backend. Parâmetro plausível porém errado é o sinal mais perigoso, segundo o próprio guia; contrato tipado reduz o espaço de erro, não o elimina.
   - Primeiro passo mínimo: valide os argumentos da tool com Zod (TypeScript) ou Pydantic (Python), devolva `{ ok, code, data }` inclusive em falha, e imponha `maxIterations` fora do modelo.
   - Quando não adotar: se uma chamada determinística sem LLM resolve, não exponha como tool.
   - Tópico: [04](./04-ferramentas-mcp-e-calibragem-do-agente.md).

3. **Timeout por agente, retry limitado e idempotência, com Saga para falha de conteúdo descoberta tarde.**
   - Por que vale: é engenharia de backend que você já domina, aplicada a chamadas de LLM. Retry sem idempotência gera documento duplicado; descartar o lote inteiro porque um agente falhou joga trabalho bom fora.
   - Primeiro passo mínimo: chave de idempotência por requisição lógica, timeout diferente por tipo de chamada, no máximo N tentativas, falha parcial preservada. Regra de retry (tópico 15): erro transitório (503) é retentado; erro definitivo (402, 422) não, senão vira retry de 402 para sempre.
   - Saga (tópico 07): é para falha de conteúdo descoberta tarde (o CSR acusa inconsistência vinda de mudança no protocolo); regenera só a parte afetada em vez de reiniciar tudo, com artefatos versionados em vez de apagados. Timeout, retry e idempotência são outro problema (falha técnica).
   - Quando não adotar: minha análise: se nenhuma etapa posterior pode invalidar uma anterior, mantenha só timeout, retry e idempotência e adie a Saga.
   - Tópico: [07](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md).

4. **Approval gate com trilha de auditoria append-only.**
   - Por que vale: quando o agente age sobre dado ou sistema de alguém, a pergunta é "quem aprovou, com qual versão de prompt e modelo, e com qual limiar". O guia aponta que o protótipo grava menos campos que o próprio checklist.
   - Primeiro passo mínimo: tabela Postgres só de inserção (`request_id`, versão do prompt, modelo, limiar, decisão, aprovador, timestamp). Correção entra como novo evento, nunca como update.
   - Quando não adotar: ação reversível e de baixo impacto. Mandar tudo para aprovação vira fila inútil.
   - Tópico: [10](./10-approval-gate-confidence-threshold-e-audit-trail.md).

5. **Ordem barata primeiro no caminho da requisição: validar, cache, roteamento, só então o modelo caro.** (Tópico 11 vira Implementar por causa disso.)
   - Por que vale: cache e checagens baratas encerram antes da chamada cara. Prompt cache nativo do provedor costuma dar o ganho com menos risco que cache semântico (minha análise: não exige limiar de similaridade nem invalidação própria).
   - Primeiro passo mínimo: comece pelo prompt cache do provedor (confira a versão atual da documentação) e por métricas de custo por requisição; só depois avalie cache semântico.
   - Quando não adotar: cache semântico em conteúdo de alto impacto, ou sem separar por tenant e sem invalidação (o próprio guia aponta o cache do protótipo como global e sem isso).
   - Gate: categorias sempre críticas exigem aprovação humana independentemente da confiança; deixar o gate depender só do número é armadilha do tópico 11.
   - Tópico: [09](./09-roteamento-cache-e-streaming.md) e [11](./11-gateway-integrado.md).

6. **Orçamento por tenant com reserva atômica antes da chamada.**
   - Por que vale: "bloquear antes de gastar". O protótipo do tópico 14 faz `reservarOrcamento`, que checa e debita no mesmo passo síncrono e reserva o pior caso, evitando o race check-then-act (provado com 17 requisições via `Promise.all`).
   - Primeiro passo mínimo: um contador atômico por tenant (por exemplo `UPDATE ... WHERE saldo >= custo` no Postgres) consultado antes da primeira chamada ao modelo, com devolução da sobra.
   - Quando não adotar: um único tenant, onde um limite global de gasto no provedor basta.
   - Tópico: [14](./14-model-cascading-e-orcamento-por-tenant.md).

## 🔬 Aprofunde (rumo a especialista)

1. **Avaliação como portão de mudança (Eval Gate e golden set).**
   - Diferencia porque separa quem acha que melhorou de quem prova. O canary avisa depois, com tráfego real; só o gate avisa antes e depende da qualidade do golden set (ressalva do guia).
   - Estudar: documentação de ferramentas de observabilidade e eval citadas no guia (Langfuse, Arize Phoenix, PromptLayer) pelo nome; literatura sobre LLM-as-judge e suas limitações.
   - Praticar: monte um golden set de 30 casos reais do seu produto, rode antes e depois de trocar prompt ou modelo, e falhe o CI quando uma métrica cair abaixo do piso. Verificável: o job fica vermelho de fato quando você degrada o prompt de propósito.
   - Tópico: [12](./12-stack-enterprise-principios-e-eval-gate.md).

2. **Observabilidade de qualidade, não só de infraestrutura.**
   - Diferencia porque o guia mostra incidente com todos os sinais verdes e a resposta errada (caso do chatbot manipulado, deriva de qualidade sem sinal de infra).
   - Estudar: convenções semânticas GenAI do OpenTelemetry (confira a versão atual, o tema evolui rápido), os quatro sinais de ouro do livro de SRE do Google.
   - Lição de segurança (tópico 13): lista de ataques (denylist) foi derrotada por ataque disfarçado de "auditoria de compliance"; a correção foi testar se a pergunta é respondível com um fato do estudo.
   - Praticar: instrumente uma chamada de LLM com spans (modelo, versão do prompt, tokens, custo) e crie um painel com amostra de respostas para revisão humana semanal.
   - Tópico: [13](./13-observabilidade-e-implantacao-hibrida.md).

3. **RAG por sintoma, com busca híbrida e avaliação de recuperação.**
   - Diferencia porque RAG ruim é problema de chunking e recuperação, não do modelo. O guia alerta contra adicionar os quatro padrões de uma vez.
   - Comece no Basic RAG e adote Hybrid só se o termo exato falhar (seletor e armadilhas do tópico 08). Estudar: documentação oficial do pgvector e da busca textual do Postgres; o artigo de Reciprocal Rank Fusion citado no guia (fusão por posição, porque somar score bruto de BM25 e cosseno é inválido).
   - Praticar: em Postgres, combine busca textual e vetorial com RRF e meça recall@k contra 20 perguntas com resposta conhecida, antes e depois.
   - Tópico: [08](./08-rag-basic-hybrid-multi-index-agentic.md).

4. **Quando multiagente compensa (e quando um agente bem calibrado basta).**
   - Diferencia porque a decisão certa costuma ser "não dividir". O guia traz o custo: tokens muito maiores e novos pontos de falha; o estudo da Anthropic citado mostra ganho com custo de cerca de 15 vezes mais tokens.
   - Estudar: o post de engenharia da Anthropic sobre o sistema multiagente de pesquisa e o vídeo "How We Build Effective Agents" (ambos no guia).
   - Praticar: pegue um fluxo seu com dois agentes e meça a versão de agente único com as mesmas tools: custo, latência e acerto no mesmo golden set.
   - Tópico: [05](./05-por-que-multiplos-agentes.md) e [06](./06-seis-padroes-de-orquestracao.md).

5. **Limiar de confiança e Reflection com sinais verificáveis.**
   - Diferencia porque confiança de LLM é mal calibrada e a autocrítica tem ponto cego do mesmo modelo. O guia diz que Reflection não substitui o gate em tarefa crítica e que pode inventar problema.
   - Estudar: Reflexion (Shinn et al.) e "Learning to Defer" (Madras et al.), ambos no guia; práticas de calibração de limiares.
   - Praticar: escolha um limiar medindo precisão e taxa de revisão num conjunto rotulado; refaça ao trocar de modelo e registre a diferença.
   - Tópico: [03](./03-react-e-reflection.md) e [10](./10-approval-gate-confidence-threshold-e-audit-trail.md).

## 🧂 Pode ficar no superficial

- **Implantação Kubernetes, Serverless e Edge, KServe e Kubeflow** ([13](./13-observabilidade-e-implantacao-hibrida.md), [12](./12-stack-enterprise-principios-e-eval-gate.md)): se você consome modelos por API gerenciada, a decisão de hospedagem de modelo não é sua. Entenda os critérios (custo, latência, privacidade) e pare.
- **Os seis padrões de orquestração** ([06](./06-seis-padroes-de-orquestracao.md)): saiba o vocabulário e o seletor. Minha análise: na prática, Sequential e Parallel com um coordenador simples cobrem a maioria dos casos. Do guia: Group Chat multiplica chamadas e latência. O próprio protótipo do guia não implementa Hierarchical, Group Chat nem Handoff.
- **Anatomia do agente e cola de termos** ([02](./02-anatomia-do-agente-unico.md)): o vocabulário lê-se uma vez, mas o "teste de realidade" (5 perguntas) e o risco de LGPD da memória persistente (exclusão efetiva) valem mais que uma leitura; ver Implemente #1.
- **Protocolos A2A e detalhes de MCP** ([04](./04-ferramentas-mcp-e-calibragem-do-agente.md), [05](./05-por-que-multiplos-agentes.md)): protocolos mudam rápido (confira a versão atual). Saiba para que servem; implemente quando surgir necessidade concreta de interoperar.
- **Ollama local e modelos citados nos protótipos**: serve para aprender sem custo, mas o guia mesmo diz que é decisão de prototipagem, não de produção. Não gaste tempo calibrando em modelo local.

## ⚠️ Cuidados e lacunas

- **Limiares são específicos de modelo e idioma.** O guia avisa em vários tópicos: não copie o limiar do Trial Forge; refaça a calibração ao trocar modelo ([09](./09-roteamento-cache-e-streaming.md), [11](./11-gateway-integrado.md), [14](./14-model-cascading-e-orcamento-por-tenant.md)).
- **Os números de mercado e de benchmark do guia** (adoção, economia de cache, retorno de busca híbrida) vêm de relatórios de terceiros e de casos isolados. Use como contexto, não como meta para o seu sistema.
- **Os protótipos não são exemplos de produção.** O Eval Gate só imprime a decisão e sai com código 0 mesmo quando bloqueia; o guardrail é fail-open; a trilha grava menos campos que o checklist; o cache é global e em memória ([10](./10-approval-gate-confidence-threshold-e-audit-trail.md), [12](./12-stack-enterprise-principios-e-eval-gate.md), [13](./13-observabilidade-e-implantacao-hibrida.md)).
- **Lacuna: a métrica de confiança por embedding tem limite conhecido** (resposta fiel a uma cláusula errada). O guia recomenda dois sinais; trate qualquer sinal único como insuficiente em tarefa crítica ([14](./14-model-cascading-e-orcamento-por-tenant.md)).
- **Lacuna: segurança além do guardrail de entrada, avaliação contínua em produção e custos reais de operação.** O tópico 13 cobre o caso DPD e um guardrail (a denylist foi derrotada por ataque disfarçado de "auditoria de compliance"; a lição foi testar se a pergunta é respondível com fato do estudo), mas o guardrail é fail-open e cobre só a entrada. Minha análise: complemente com a documentação de segurança do seu provedor (saída, tools, dados) e com material de avaliação.
- **O Temporal da live** ([15](./15-live-temporal-process-manager.md)) é um esqueleto incompleto (sem Compensation, mocks em memória, imagem sem versão fixada). Serve para entender workflow durável, não como base pronta.

## ✔️ Como saber que aprendeu

1. Consigo, sem consultar, decompor um fluxo do meu produto em subtarefas, classificar cada uma como regra, LLM ou híbrida pelas três perguntas e justificar com um orçamento de latência, custo e precisão.
2. Meu serviço tem, verificável: timeout por chamada, retry limitado com chave de idempotência, tools com argumentos validados por schema e trilha de decisão append-only com versão de prompt, modelo, limiar e aprovador.
3. Tenho um golden set e um job que bloqueia a mudança de prompt ou modelo quando a qualidade cai, e consigo mostrar um caso em que ele barrou uma regressão de propósito.

Veja também a [trilha consolidada](../../study-roadmap.md).
