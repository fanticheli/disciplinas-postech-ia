# 12 · LangGraph no OpsPilot: grafo de produção, roteador estruturado e fallback de modelo

> **Unidade 6 · Aula 1** · Leitura: ~8 min · Bloco: Grafo de produção, observabilidade e governança

## 🎯 Em uma frase
As estratégias viram nós de um **StateGraph** (**contexto → roteador → estratégia → resposta**); o **roteador** escolhe a rota com saída estruturada `{route, reason}` e `strategy` vira **override**. **Roteamento e disponibilidade são problemas diferentes**: o fallback de modelo (retry, reserva, 503) mora na fábrica de modelo.

---

## 👵 Explicando para a vovó

É a recepção de um hospital: o paciente não precisa saber se é caso de clínico, cirurgia ou observação; a triagem decide pela queixa e anota o motivo. E se o médico de plantão não atende, o sistema chama o reserva, e se ninguém atende, avisa com honestidade que está indisponível, em vez de fingir.

---

## 🔧 Tecnicamente

### O que é
- **Por que grafo:** estados percorrem nós ligados por transições; o fluxo se desenha no próprio código, o roteamento ganha entradas e saídas explícitas, o tracing sabe por quais nós a execução passou e retry ou fallback podem ficar em um ponto específico. Condicionais continuam existindo, mas num lugar explícito. Paralelismo em ondas e o “raio X” do grafo ficam como exercício.
- **Roteador:** classificador que lê o pedido e escolhe entre ReAct (consulta pontual), Plan-and-Execute (várias etapas) e Reflection (verificação). O plantonista às três da manhã não deveria precisar saber qual padrão usar.
- **Grafo unificado:** nó de contexto, roteador, três estratégias que convergem para um nó de resposta. Cada evento de trace identifica o nó. O estado compartilhado carrega entrada, rota, trace e resultado intermediário.
- **Saída estruturada com Zod:** a rota é restrita às estratégias conhecidas e a justificativa é uma frase, que melhora a observabilidade (“por que ReAct?”).
- **Override:** o `strategy` do corpo passa a ser opcional; se vier, vale como override para teste, bench e depuração, e precisa aparecer no trace para não parecer decisão do roteador.
- **Resiliência de modelo:** o grafo escolher bem não evita o modelo cair. Modelo principal e de fallback na fábrica, retry de cerca de duas tentativas em cada, evento de trace quando o fallback acontece, métrica do modelo efetivamente usado e, se tudo falhar, **503** em vez de resposta inventada. Retry sempre dentro de um teto conhecido.
- **O que a aula implementa e valida:** o roteamento (ReAct para “quantos alertas críticos”, Plan-and-Execute para “monte um plano de resposta ao incidente de checkout, em ordem”). O fallback fica “especificado e exemplificado” na aula; no repositório ele está implementado (spec 014).

### Como funciona
- Specify, plan e tasks para o **ProductionGraph**, depois uma referência: `StateGraph` do estado, nós de contexto, roteador, ReAct, Plan-and-Execute, Reflection e resposta; arestas do início ao contexto, ao roteador e, por aresta condicional que lê a rota do estado, à estratégia; todas apontam para a resposta e fim. Compila-se o grafo.
- Referência do roteador: schema de decisão, `withStructuredOutput` com o system prompt do roteador e o pedido, evento `route` no trace com a justificativa e atualização do estado.

### Onde aplicar
- Qualquer produto com várias estratégias que precisa esconder a escolha do cliente.
- Colocar retry e fallback num único ponto (a fábrica de modelo) em vez de espalhar tratamento de erro.

### Vantagens e limites
**Vantagens**
- Fluxo visível e testável, com nó de origem em cada evento.
- Roteador explicável (campo `reason`) e sobrescrevível.
- Resiliência de modelo central e observável.

**Limites**
- Um roteador por LLM é mais uma chamada e pode errar a rota.
- Mais conceitos (estado, nós, arestas) do que um `if/else`.

### 🚫 Armadilhas
- Misturar roteamento (qual estratégia) com disponibilidade (qual modelo).
- Esquecer de registrar o override no trace.
- Retry sem teto antes do fallback.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| StateGraph | Grafo de nós que leem e atualizam um estado compartilhado |
| Aresta condicional | Transição escolhida pelo valor do estado (a rota) |
| Roteador | Nó classificador que escolhe a estratégia |
| Override | Estratégia forçada pelo corpo do request, registrada no trace |
| withRetry / withFallbacks | Composição do LangChain para tentar de novo e cair no reserva |
| 503 | Indisponibilidade quando primário e reserva falham |

---

## 💻 No código do repo

**Projeto:** [06-langgraph-e-workflows-complexos](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/06-langgraph-e-workflows-complexos)

Specs 013 (grafo de produção) e 014 (resiliência de modelo). O snapshot 06 usa a árvore do commit das unidades 6 a 8 sem a parte web; por isso já contém código de observabilidade. A rota team só chega na U9, e eu a cito porque está no arquivo final.

**Fluxo**
1. `src/graph/production-graph.ts`: estado com `Annotation.Root` (message, userId, conversationId, requestId, overrideRoute, built, route, answer, trace, strategyMetrics, routerLlmCalls); nós `contexto`, `roteador`, `react`, `planExecute`, `reflect` (e `team` na U9) e `resposta`; `addConditionalEdges("roteador", s => s.route ?? "react", ...)`. `runProductionTurn` compila o grafo e roda dentro de `runWithModelTelemetry` e `runWithChatUser`.
2. Nó `contexto`: cria ou carrega a conversa, `maybeSummarize`, `lastMessages`, `prepareMemoriesForTurn`, `buildContext` e grava a mensagem do usuário. Nó `resposta`: grava a resposta, monta métricas (`route`, `routeReason`, `modelUsed`, breakdown), emite o evento `fallback` quando aplicável e persiste a auditoria.
3. `src/graph/router.ts` e `router-prompt.ts`: `routeSchema` (`route` e `reason`) e tabela de decisão no system prompt (pontual para react, multi-passo para planExecute, verificação ou alta criticidade para reflect, investigação mais plano e execução para team); erro, schema inválido ou rota fora da lista caem em `react` com `reason` de fallback; o override gera evento `route` com `override: true`; `parseOverrideStrategy` aceita o alias `plan-and-execute`.
4. `src/graph/stamp-node.ts`: `stampNode` sobrescreve `node` em todos os eventos de uma estratégia.
5. `src/agents/model.ts`: `createModel()` devolve `OpsResilientChatModel`; `ChatOpenAI` com `maxRetries: 0`; `withRetry({ stopAfterAttempt: 2 })` no primário e no reserva (`OPENROUTER_MODEL_FALLBACK`) e `withFallbacks`; `bindTools` e `withStructuredOutput` também são blindados; a falha total vira `ModelUnavailableError` (503).
6. `src/llm/model-telemetry.ts`: `AsyncLocalStorage` mais um callback `handleLLMEnd` registram o modelo que respondeu; se foi o reserva, `fallbackUsed` vira true e o trace ganha o evento `fallback` (“primário → reserva”).

**Como rodar**
- No `.env`, defina `OPENROUTER_API_KEY`, `OPENROUTER_MODEL` e `OPENROUTER_MODEL_FALLBACK`.
- `npm run dev` e um `POST /chat` sem `strategy`: leia `metrics.route` e `metrics.routeReason`; com `"strategy":"planExecute"` o roteador é pulado.
- `npm test` cobre roteador fake, override, falha do classificador, nó em todo evento e o 503 de `ModelUnavailableError`.

**Armadilhas e achados no código**
- Com `OPENROUTER_MODEL` vazio (como no `.env.example`) o código cai em `openai/gpt-4o-mini`, que é pago, contrariando o “custo zero” do README.
- `stampNode` sobrescreve o `node` dos eventos internos: o raio-X por nó vale para as rotas (react, planExecute...), não para planner, executor e replanner dentro do Plan-and-Execute.
- Roteador, planner, replanner e crítico engolem erros do modelo (`catch` amplo): o 503 só nasce em caminhos sem esse `catch`, como o ReAct e o executor (hipótese pela leitura do código).
- O grafo é recompilado a cada requisição (`createProductionGraph` dentro de `runProductionTurn`). A rota `reflect` é sempre `withReflection(react)`.
- O `preview.md` (o mesmo arquivo nas pastas 05 a 09) desenha a rota como `plan-exec` e só três rotas; o código usa `planExecute` e quatro. O executor em ondas e o `graph:draw` ficaram como exercício, não implementados.

---

## 🔗 Para ir além
- [LangGraph JS](https://langchain-ai.github.io/langgraphjs)
- [Snapshot da Unidade 6 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/06-langgraph-e-workflows-complexos)
- [UNIDADE.md da Unidade 6](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/06-langgraph-e-workflows-complexos/UNIDADE.md)

---

⬅️ [11 · Context stitching: ContextBuilder com teto, prioridade e regra de corte por seção](./11-context-stitching-contextbuilder.md)  ·  [13 · Observabilidade e limites de autonomia: trace persistido, logs, métricas e aprovação humana](./13-observabilidade-e-limites-de-autonomia.md) ➡️
