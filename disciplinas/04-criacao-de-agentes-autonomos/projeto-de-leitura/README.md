# 🤖 Criação de Agentes Autônomos: Guia de Leitura

> Resumo organizado da **Disciplina 04** da pós de Engenharia de IA Aplicada (autoria: **Thiago Bussola**).
> Cada assunto tem duas camadas: 👵 *para a vovó* (analogia do mundo real) e 🔧 *tecnicamente* (nível sênior), e fecha com o que está **no código do repositório** do curso.

---

## 🗺️ Como usar este guia

Cada arquivo é auto-contido e segue sempre a mesma estrutura:

| Seção | Para quê serve |
|-------|----------------|
| 🎯 **Em uma frase** | O conceito destilado |
| 👵 **Explicando para a vovó** | Analogia do mundo real, sem jargão |
| 🔧 **Tecnicamente** | O que é, como funciona, onde aplicar, vantagens e limites, armadilhas |
| 🧩 **Cola rápida** | Glossário dos termos-chave |
| 💻 **No código do repo** | Fluxo por arquivo, como rodar e armadilhas encontradas no código (ou “No curso”, quando não há código) |
| 🔗 **Para ir além** | Links de referência |

A disciplina tem **dois projetos**: a `notas-api` (Unidade 1, para aprender a operar um agente de código) e o **OpsPilot** (Unidades 2 a 9), um único projeto que evolui unidade a unidade. As pastas do repositório são **snapshots cumulativos**: a pasta N contém tudo o que foi feito até a unidade N. Por isso, os tópicos descrevem o código no ponto em que o assunto nasce e indicam quando o arquivo mudou até o snapshot final.

Onde este guia afirma algo sobre o código, foi lido nos arquivos do repositório. Também rodei, numa cópia fora do repositório, `npm ci`, `typecheck` e os testes do `notas-api` (42 passaram) e do snapshot 09 (216 passaram na raiz e 13 no `web/`, com Node 22.16). O que não verifiquei está escrito como hipótese.

---

## 🧭 Trilha de leitura sugerida

A ordem segue a apostila: operar o agente de código, construir o núcleo do OpsPilot, dar mãos e memória ao agente, orquestrar e observar, e fechar com interface e multiagente.

### Bloco 1 · Agentes de código e Spec-Driven Development
- [00 · O agente de código por dentro: harness, modos e context engineering](./00-agente-de-codigo-harness-e-context-engineering.md) (~10 min)
- [01 · Spec-Driven Development do zero: Constitution, spec, plan, tasks, implement e guardrails](./01-spec-driven-development-do-zero.md) (~11 min)

### Bloco 2 · Padrões de raciocínio e o núcleo do OpsPilot
- [02 · Os três padrões de raciocínio: ReAct, Plan-and-Execute e Reflection](./02-tres-padroes-de-raciocinio.md) (~6 min)
- [03 · Spec Kit e a estrutura inicial do OpsPilot: contrato de estratégia, trace e fábrica de modelo](./03-spec-kit-e-estrutura-do-opspilot.md) (~8 min)
- [04 · ReAct, Plan-and-Execute e Reflection no código: arena e benchmark](./04-estrategias-arena-e-bench.md) (~9 min)
- [05 · Uma API que também é um agente: POST /chat, registry e testes sem rede](./05-api-que-tambem-e-um-agente.md) (~7 min)

### Bloco 3 · Tools, persistência e MCP
- [06 · Persistência real com SQLite: OpsStore, checks e prepared statements](./06-sqlite-opsstore-e-prepared-statements.md) (~7 min)
- [07 · Tools externas resilientes: erro como observação, timeout, retry e Zod](./07-tool-externa-resiliente.md) (~7 min)
- [08 · MCP: o OpsPilot como servidor de ferramentas, outra porta para a mesma aplicação](./08-mcp-servidor-do-opspilot.md) (~6 min)

### Bloco 4 · Memória e contexto
- [09 · Memória do agente: conversa persistente, memória semântica com embeddings e refletor de aprendizado](./09-memoria-episodica-e-semantica.md) (~10 min)
- [10 · Contexto como orçamento: medir tokens, podar e sumarizar em rolo](./10-contexto-como-orcamento.md) (~7 min)
- [11 · Context stitching: ContextBuilder com teto, prioridade e regra de corte por seção](./11-context-stitching-contextbuilder.md) (~6 min)

### Bloco 5 · Grafo de produção, observabilidade e governança
- [12 · LangGraph no OpsPilot: grafo de produção, roteador estruturado e fallback de modelo](./12-langgraph-roteador-e-fallback.md) (~8 min)
- [13 · Observabilidade e limites de autonomia: trace persistido, logs, métricas e aprovação humana](./13-observabilidade-e-limites-de-autonomia.md) (~8 min)

### Bloco 6 · War Room e multiagente
- [14 · War Room: interface web sobre a mesma API e publicação no GitHub Pages](./14-war-room-e-github-pages.md) (~8 min)
- [15 · Multi-agent systems: supervisor, papéis, handoffs e blackboard](./15-multi-agent-systems.md) (~8 min)

---

## ✅ Cobertura aula a aula (Disciplina 04)

| Unidade · Aula da apostila | Documento |
|----------------------------|-----------|
| **Introdução da disciplina** e mapa | Seção [Mentalidade da disciplina](#-mentalidade-da-disciplina) deste README |
| **U1 · Aula 1** · O Agente de Código Por Dentro (GitHub Copilot) | [00 · O agente de código por dentro: harness, modos e context engineering](./00-agente-de-codigo-harness-e-context-engineering.md) |
| **U1 · Aula 2** · Context Engineering e o Contrato de Permissões | [00 · O agente de código por dentro: harness, modos e context engineering](./00-agente-de-codigo-harness-e-context-engineering.md) |
| **U1 · Aula 3** · Spec-Driven Development do Zero Parte 1 | [01 · Spec-Driven Development do zero: Constitution, spec, plan, tasks, implement e guardrails](./01-spec-driven-development-do-zero.md) |
| **U1 · Aula 4** · Spec-Driven Development do Zero Parte 2 | [01 · Spec-Driven Development do zero: Constitution, spec, plan, tasks, implement e guardrails](./01-spec-driven-development-do-zero.md) |
| **U1 · Aula 5** · Guardrails, Revisor e Delegação | [01 · Spec-Driven Development do zero: Constitution, spec, plan, tasks, implement e guardrails](./01-spec-driven-development-do-zero.md) |
| **U2 · Aula 1** · Raciocínio e Tomada de Decisão em Agentes: os Três Padrões de Raciocínio | [02 · Os três padrões de raciocínio: ReAct, Plan-and-Execute e Reflection](./02-tres-padroes-de-raciocinio.md) |
| **U2 · Aula 2** · Configurando o Spec Kit | [03 · Spec Kit e a estrutura inicial do OpsPilot: contrato de estratégia, trace e fábrica de modelo](./03-spec-kit-e-estrutura-do-opspilot.md) |
| **U2 · Aula 3** · Criando a Estrutura Inicial do Projeto com Spec Kit | [03 · Spec Kit e a estrutura inicial do OpsPilot: contrato de estratégia, trace e fábrica de modelo](./03-spec-kit-e-estrutura-do-opspilot.md) |
| **U2 · Aula 4** · Definindo o Padrão ReAct Para o Agente | [04 · ReAct, Plan-and-Execute e Reflection no código: arena e benchmark](./04-estrategias-arena-e-bench.md) |
| **U2 · Aula 5** · Definindo o Padrão Plan-and-Execute Para o Agente | [04 · ReAct, Plan-and-Execute e Reflection no código: arena e benchmark](./04-estrategias-arena-e-bench.md) |
| **U2 · Aula 6** · Críticas e Benchmark com Padrão Reflection | [04 · ReAct, Plan-and-Execute e Reflection no código: arena e benchmark](./04-estrategias-arena-e-bench.md) |
| **U2 · Aula 7** · Uma API que Também é um Agente | [05 · Uma API que também é um agente: POST /chat, registry e testes sem rede](./05-api-que-tambem-e-um-agente.md) |
| **U3 · Aula 1** · Especificando a Integração com Banco de Dados | [06 · Persistência real com SQLite: OpsStore, checks e prepared statements](./06-sqlite-opsstore-e-prepared-statements.md) |
| **U3 · Aula 2** · Criando e Consultando Incidentes no Banco com Nosso Agente | [06 · Persistência real com SQLite: OpsStore, checks e prepared statements](./06-sqlite-opsstore-e-prepared-statements.md) |
| **U3 · Aula 3** · Validando Disponibilidade de Provedores Externos | [07 · Tools externas resilientes: erro como observação, timeout, retry e Zod](./07-tool-externa-resiliente.md) |
| **U3 · Aula 4** · Disponibilizando Nosso Agente Via MCP | [08 · MCP: o OpsPilot como servidor de ferramentas, outra porta para a mesma aplicação](./08-mcp-servidor-do-opspilot.md) |
| **U4 · Aula 1** · Memória Episódica Para Nosso Agente | [09 · Memória do agente: conversa persistente, memória semântica com embeddings e refletor de aprendizado](./09-memoria-episodica-e-semantica.md) |
| **U4 · Aula 2** · O Vector Store: Spec, Implementação e a Memória Funcionando | [09 · Memória do agente: conversa persistente, memória semântica com embeddings e refletor de aprendizado](./09-memoria-episodica-e-semantica.md) |
| **U5 · Aula 1** · O Contexto como Orçamento: Anatomia, Medição e Sumarização | [10 · Contexto como orçamento: medir tokens, podar e sumarizar em rolo](./10-contexto-como-orcamento.md) |
| **U5 · Aula 2** · Context Stitching e os Paralelos com a Ferramenta | [11 · Context stitching: ContextBuilder com teto, prioridade e regra de corte por seção](./11-context-stitching-contextbuilder.md) |
| **U6 · Aula 1** · LangGraph e Fallback de modelo | [12 · LangGraph no OpsPilot: grafo de produção, roteador estruturado e fallback de modelo](./12-langgraph-roteador-e-fallback.md) |
| **U7 · Aula 1** · Criando Estratégias de Observabilidade | [13 · Observabilidade e limites de autonomia: trace persistido, logs, métricas e aprovação humana](./13-observabilidade-e-limites-de-autonomia.md) |
| **U8 · Aula 1** · Implementando a War Room e Modificando a Memória do Agente | [14 · War Room: interface web sobre a mesma API e publicação no GitHub Pages](./14-war-room-e-github-pages.md) |
| **U8 · Aula 2** · Publicando a War Room no GitHub Pages | [14 · War Room: interface web sobre a mesma API e publicação no GitHub Pages](./14-war-room-e-github-pages.md) |
| **U9 · Aula 1** · Implementando Multiagentes | [15 · Multi-agent systems: supervisor, papéis, handoffs e blackboard](./15-multi-agent-systems.md) |
| **Revisão final da disciplina** | Seção [Mentalidade da disciplina](#-mentalidade-da-disciplina) deste README |

> As 25 aulas da apostila (9 unidades) estão cobertas em 16 documentos. U1 tem 5 aulas, U2 tem 7, U3 tem 4, U4 tem 2, U5 tem 2, U6, U7 e U9 têm 1 cada e U8 tem 2.

---

## 🧪 Código do repositório → tópico

Pasta de código do módulo: `modulo04-criacao-de-agentes-autonomos-novo/`. Todas as nove pastas estão absorvidas na seção **💻 No código do repo** de algum tópico.

| Pasta no GitHub | O que traz | Onde está neste guia |
|-----------------|-----------|----------------------|
| [01-arquitetura-de-agentes-de-codigo](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/01-arquitetura-de-agentes-de-codigo) | notas-api (instructions, settings, prompts, hook, specs, src) | [00 · O agente de código por dentro: harness, modos e context engineering](./00-agente-de-codigo-harness-e-context-engineering.md); [01 · Spec-Driven Development do zero: Constitution, spec, plan, tasks, implement e guardrails](./01-spec-driven-development-do-zero.md) |
| [02-padroes-de-raciocinio-e-execucao](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/02-padroes-de-raciocinio-e-execucao) | esqueleto do OpsPilot, estratégias, arena, bench | [03 · Spec Kit e a estrutura inicial do OpsPilot: contrato de estratégia, trace e fábrica de modelo](./03-spec-kit-e-estrutura-do-opspilot.md); [04 · ReAct, Plan-and-Execute e Reflection no código: arena e benchmark](./04-estrategias-arena-e-bench.md) |
| [03-function-calling-e-tool-use](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use) | POST /chat, SQLite, tool de status, servidor MCP | [05 · Uma API que também é um agente: POST /chat, registry e testes sem rede](./05-api-que-tambem-e-um-agente.md); [06 · Persistência real com SQLite: OpsStore, checks e prepared statements](./06-sqlite-opsstore-e-prepared-statements.md); [07 · Tools externas resilientes: erro como observação, timeout, retry e Zod](./07-tool-externa-resiliente.md); [08 · MCP: o OpsPilot como servidor de ferramentas, outra porta para a mesma aplicação](./08-mcp-servidor-do-opspilot.md) |
| [04-memoria-e-reflexao-em-agentes-autonomos](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/04-memoria-e-reflexao-em-agentes-autonomos) | conversa persistente, memória semântica, refletor | [09 · Memória do agente: conversa persistente, memória semântica com embeddings e refletor de aprendizado](./09-memoria-episodica-e-semantica.md) |
| [05-gerenciamento-de-contextos](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/05-gerenciamento-de-contextos) | tokens, sumarização, ContextBuilder | [10 · Contexto como orçamento: medir tokens, podar e sumarizar em rolo](./10-contexto-como-orcamento.md); [11 · Context stitching: ContextBuilder com teto, prioridade e regra de corte por seção](./11-context-stitching-contextbuilder.md) |
| [06-langgraph-e-workflows-complexos](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/06-langgraph-e-workflows-complexos) | grafo de produção, roteador, fallback de modelo | [12 · LangGraph no OpsPilot: grafo de produção, roteador estruturado e fallback de modelo](./12-langgraph-roteador-e-fallback.md) |
| [07-observabilidade-e-limites-de-autonomia](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/07-observabilidade-e-limites-de-autonomia) | trace persistido, logs, stats, aprovação humana | [13 · Observabilidade e limites de autonomia: trace persistido, logs, métricas e aprovação humana](./13-observabilidade-e-limites-de-autonomia.md) |
| [08-projeto-pratico-opspilot-publicado](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/08-projeto-pratico-opspilot-publicado) | War Room (web/), CORS, workflow de deploy | [14 · War Room: interface web sobre a mesma API e publicação no GitHub Pages](./14-war-room-e-github-pages.md) |
| [09-multi-agent-systems](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/09-multi-agent-systems) | modo equipe (src/team) e estado final do projeto | [15 · Multi-agent systems: supervisor, papéis, handoffs e blackboard](./15-multi-agent-systems.md) |

Os arquivos que merecem atenção, por tópico:

| Arquivos | Tópico |
|----------|--------|
| `notas-api/.github/*`, `.vscode/settings.json` | [00 · O agente de código por dentro: harness, modos e context engineering](./00-agente-de-codigo-harness-e-context-engineering.md) |
| `notas-api/specs/*`, `.github/prompts/*`, `.githooks/pre-commit`, `src/*` | [01 · Spec-Driven Development do zero: Constitution, spec, plan, tasks, implement e guardrails](./01-spec-driven-development-do-zero.md) |
| `.specify/*`, `.github/copilot-instructions.md`, `src/domain/types.ts`, `src/agents/model.ts`, `src/trace/builder.ts` | [03 · Spec Kit e a estrutura inicial do OpsPilot: contrato de estratégia, trace e fábrica de modelo](./03-spec-kit-e-estrutura-do-opspilot.md) |
| `src/agents/react.ts`, `src/strategies/*`, `src/arena.ts`, `src/bench.ts` | [04 · ReAct, Plan-and-Execute e Reflection no código: arena e benchmark](./04-estrategias-arena-e-bench.md) |
| `src/http/server.ts`, `src/http/chat-schema.ts`, `src/agents/index.ts` | [05 · Uma API que também é um agente: POST /chat, registry e testes sem rede](./05-api-que-tambem-e-um-agente.md) |
| `src/store/sqlite-ops-store.ts`, `src/domain/severity.ts`, `src/store/seed*` | [06 · Persistência real com SQLite: OpsStore, checks e prepared statements](./06-sqlite-opsstore-e-prepared-statements.md) |
| `src/tools/check-provider-status.ts`, `src/agents/tools.ts` | [07 · Tools externas resilientes: erro como observação, timeout, retry e Zod](./07-tool-externa-resiliente.md) |
| `src/mcp/*`, `.vscode/mcp.json`, `.cursor/mcp.json` | [08 · MCP: o OpsPilot como servidor de ferramentas, outra porta para a mesma aplicação](./08-mcp-servidor-do-opspilot.md) |
| `src/memory/*`, `src/store/sqlite-conversation-store.ts`, `src/chat/run-chat.ts` | [09 · Memória do agente: conversa persistente, memória semântica com embeddings e refletor de aprendizado](./09-memoria-episodica-e-semantica.md) |
| `src/context/tokens.ts`, `src/chat/history-summarizer.ts`, `scripts/conversa-longa.sh` | [10 · Contexto como orçamento: medir tokens, podar e sumarizar em rolo](./10-contexto-como-orcamento.md) |
| `src/context/context-builder.ts` | [11 · Context stitching: ContextBuilder com teto, prioridade e regra de corte por seção](./11-context-stitching-contextbuilder.md) |
| `src/graph/*`, `src/llm/model-telemetry.ts` | [12 · LangGraph no OpsPilot: grafo de produção, roteador estruturado e fallback de modelo](./12-langgraph-roteador-e-fallback.md) |
| `src/obs/*`, `src/store/sqlite-request-store.ts`, `src/store/memory-approval-store.ts` | [13 · Observabilidade e limites de autonomia: trace persistido, logs, métricas e aprovação humana](./13-observabilidade-e-limites-de-autonomia.md) |
| `web/*`, `src/http/cors.ts`, `.github/workflows/deploy.yml`, `.github/instructions/design.instructions.md` | [14 · War Room: interface web sobre a mesma API e publicação no GitHub Pages](./14-war-room-e-github-pages.md) |
| `src/team/*` | [15 · Multi-agent systems: supervisor, papéis, handoffs e blackboard](./15-multi-agent-systems.md) |

Vendored e gerados ignorados: `node_modules`, `package-lock.json` e o conteúdo de `.specify/`, `.github/agents` e `.github/prompts` gerados pelo Spec Kit (citados só como estrutura). Os `specs/NNN-*` (cada um com `spec`, `plan`, `tasks`, contratos e checklists) foram consultados por amostragem, sem um tópico por spec.

---

## ▶️ Rodar o OpsPilot (referência rápida)

- Requer **Node 22+** (usa `node:sqlite`, que não existe no Node 20) e uma chave do OpenRouter.
- A partir da pasta 06 existe `.env.example` com `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`, `OPENROUTER_MODEL_FALLBACK`, `PORT`, `OPSPILOT_CORS_ORIGINS` e `OPSPILOT_DB`. Defina `OPENROUTER_MODEL` com um modelo `:free` para custo zero; vazio, o código usa `openai/gpt-4o-mini` (pago).
- Comandos: `npm ci`, `npm run dev` (API na porta 3000), `npm run arena`, `npm run bench`, `npm run mcp`, `npm test`, `npm run typecheck`; `npm --prefix web run dev` para a War Room (pasta 08 em diante).
- O primeiro uso da memória semântica (e o primeiro `npm test` que a toca) baixa o modelo de embeddings.

---

## 🐞 Achados no código, em um lugar

Inconsistências e bugs encontrados lendo (e rodando) o repositório. Cada um está detalhado no tópico indicado.

| Achado | Tópico |
|--------|--------|
| `UNIDADE.md` U2: `--strategies react,plan-execute` (o nome válido é `plan-and-execute`; nomes inválidos são descartados em silêncio) | [04 · ReAct, Plan-and-Execute e Reflection no código: arena e benchmark](./04-estrategias-arena-e-bench.md) |
| `.env.example` só existe a partir da pasta 06; as pastas 02 a 05 mandam copiá-lo e o `.gitignore` tem `.env.*` | [03 · Spec Kit e a estrutura inicial do OpsPilot: contrato de estratégia, trace e fábrica de modelo](./03-spec-kit-e-estrutura-do-opspilot.md) |
| `mysql2` e `sequelize` no `package.json` da U2 sem uso | [03 · Spec Kit e a estrutura inicial do OpsPilot: contrato de estratégia, trace e fábrica de modelo](./03-spec-kit-e-estrutura-do-opspilot.md) |
| Default de modelo `openai/gpt-4o-mini` (pago) quando `OPENROUTER_MODEL` está vazio | [12 · LangGraph no OpsPilot: grafo de produção, roteador estruturado e fallback de modelo](./12-langgraph-roteador-e-fallback.md) |
| Seed: `alert-005` em `catalog` com descrição de e-mail; serviço “notifications” citado mas inexistente | [06 · Persistência real com SQLite: OpsStore, checks e prepared statements](./06-sqlite-opsstore-e-prepared-statements.md) |
| `resolveIncident` não exige status open; sem `journal_mode` nem `busy_timeout` | [06 · Persistência real com SQLite: OpsStore, checks e prepared statements](./06-sqlite-opsstore-e-prepared-statements.md) |
| `npm test` baixa o modelo de embeddings (README diz que os testes não usam rede) | [09 · Memória do agente: conversa persistente, memória semântica com embeddings e refletor de aprendizado](./09-memoria-episodica-e-semantica.md) |
| Remendos em português para “organizar plantão” no refletor e no recall (`PLANTAO_ORG_MEMORY_FACT`, `buildMemoryRecallQuery`, regexes), `UNIDADE.md` U4 cita evento `learning` inexistente e `userId` do corpo sem autenticação | [09 · Memória do agente: conversa persistente, memória semântica com embeddings e refletor de aprendizado](./09-memoria-episodica-e-semantica.md) |
| `UNIDADE.md` U5: breakdown com `tools` e evento `context` no trace; o código tem `summary`, não mede tools e só emite `summarize` | [10 · Contexto como orçamento: medir tokens, podar e sumarizar em rolo](./10-contexto-como-orcamento.md) |
| `CONTEXT_BUDGET_*` fora do `.env.example`; o resumo é truncado no fim (hipótese: onde ficam as decisões mais recentes) | [11 · Context stitching: ContextBuilder com teto, prioridade e regra de corte por seção](./11-context-stitching-contextbuilder.md) |
| Planner, replanner, roteador e crítico engolem erros do modelo | [12 · LangGraph no OpsPilot: grafo de produção, roteador estruturado e fallback de modelo](./12-langgraph-roteador-e-fallback.md) |
| `UNIDADE.md` U7: `-d '{"approve":true}'` (o body real é `{decision, userId}`) | [13 · Observabilidade e limites de autonomia: trace persistido, logs, métricas e aprovação humana](./13-observabilidade-e-limites-de-autonomia.md) |
| `TRACE_PAYLOAD_KEYS` sem `to`: handoff perde o destino na auditoria (verificado rodando) | [13 · Observabilidade e limites de autonomia: trace persistido, logs, métricas e aprovação humana](./13-observabilidade-e-limites-de-autonomia.md) |
| `status: error` nunca é persistido; `requestId` do cliente ignorado | [13 · Observabilidade e limites de autonomia: trace persistido, logs, métricas e aprovação humana](./13-observabilidade-e-limites-de-autonomia.md) |
| `UNIDADE.md` U7 diz que não há custo em dólares; `estimatePromptCostUsd` existe desde o snapshot 06 | [13 · Observabilidade e limites de autonomia: trace persistido, logs, métricas e aprovação humana](./13-observabilidade-e-limites-de-autonomia.md) |
| `CORS_ORIGIN` (UNIDADE.md U8) versus `OPSPILOT_CORS_ORIGINS` (código) | [14 · War Room: interface web sobre a mesma API e publicação no GitHub Pages](./14-war-room-e-github-pages.md) |
| Workflow do Pages em subpasta (não roda neste repositório); bases `/opspilot/` e `/ops-pilot/` | [14 · War Room: interface web sobre a mesma API e publicação no GitHub Pages](./14-war-room-e-github-pages.md) |
| README das pastas 06 e 07 citam `pages.yml` (inexistente) e `web:dev` (script que aponta para uma `web/` ausente) | [14 · War Room: interface web sobre a mesma API e publicação no GitHub Pages](./14-war-room-e-github-pages.md) |
| Consenso do modo equipe não implementado; executor sem aprovação por ação | [15 · Multi-agent systems: supervisor, papéis, handoffs e blackboard](./15-multi-agent-systems.md) |
| Prompts do SDD artesanal sem lista de ferramentas: o menor privilégio por fase não está aplicado | [01 · Spec-Driven Development do zero: Constitution, spec, plan, tasks, implement e guardrails](./01-spec-driven-development-do-zero.md) |
| Depois da U6, `/chat` não usa mais o registry e `reflect: true` é ignorado quando `strategy` é informado | [05 · Uma API que também é um agente: POST /chat, registry e testes sem rede](./05-api-que-tambem-e-um-agente.md) |

---

## 🎓 Mentalidade da disciplina

A introdução e a revisão final da apostila resumem o fio condutor:

- O foco não é chamar um modelo nem escrever prompts melhores, e sim a **engenharia** que transforma um modelo em um agente que raciocina, usa ferramentas, mantém estado, controla custo, opera com resiliência e deixa **trilha auditável**.
- O curso é uma **sequência de decisões de engenharia**: cada capítulo acrescenta uma peça e reaproveita as anteriores. Multiagente não é outra arquitetura, é reorganizar responsabilidades sobre uma base que já tem controle e auditabilidade ([15 · Multi-agent systems: supervisor, papéis, handoffs e blackboard](./15-multi-agent-systems.md)).
- **Instrução não é permissão** e guardrails determinísticos continuam necessários ([00 · O agente de código por dentro: harness, modos e context engineering](./00-agente-de-codigo-harness-e-context-engineering.md), [01 · Spec-Driven Development do zero: Constitution, spec, plan, tasks, implement e guardrails](./01-spec-driven-development-do-zero.md)).
- Compare padrões com **qualidade, chamadas, latência e estado real da aplicação**, não com a resposta textual ([04 · ReAct, Plan-and-Execute e Reflection no código: arena e benchmark](./04-estrategias-arena-e-bench.md)).
- Toda **fronteira é não confiável**: entrada HTTP, saída do modelo, API externa e dados persistidos precisam de contrato e validação ([06 · Persistência real com SQLite: OpsStore, checks e prepared statements](./06-sqlite-opsstore-e-prepared-statements.md), [07 · Tools externas resilientes: erro como observação, timeout, retry e Zod](./07-tool-externa-resiliente.md)).
- HTTP e MCP são **portas diferentes para a mesma aplicação**, não backends separados ([08 · MCP: o OpsPilot como servidor de ferramentas, outra porta para a mesma aplicação](./08-mcp-servidor-do-opspilot.md)).
- Contexto é **orçamento**: memória episódica, semântica, sumarização e ContextBuilder disputam o mesmo espaço ([09 · Memória do agente: conversa persistente, memória semântica com embeddings e refletor de aprendizado](./09-memoria-episodica-e-semantica.md), [10 · Contexto como orçamento: medir tokens, podar e sumarizar em rolo](./10-contexto-como-orcamento.md), [11 · Context stitching: ContextBuilder com teto, prioridade e regra de corte por seção](./11-context-stitching-contextbuilder.md)).
- Grafo, fallback, observabilidade e matriz de autonomia aumentam o controle sobre um sistema probabilístico ([12 · LangGraph no OpsPilot: grafo de produção, roteador estruturado e fallback de modelo](./12-langgraph-roteador-e-fallback.md), [13 · Observabilidade e limites de autonomia: trace persistido, logs, métricas e aprovação humana](./13-observabilidade-e-limites-de-autonomia.md)).

Checklist de domínio da revisão final: explicar a diferença entre instrução e permissão; comparar ReAct, Plan-and-Execute e Reflection; mostrar como HTTP e MCP reutilizam store, schemas e regras; explicar como memória, sumarização e ContextBuilder disputam o orçamento; descrever como LangGraph, fallback, observabilidade e a matriz de autonomia dão controle; e explicar como supervisor, analista, planejador e executor se coordenam por handoffs e blackboard.

---

## 🧰 Materiais oficiais da disciplina

- **Repositório de código:** https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo
- **Snapshots:** `01-arquitetura-de-agentes-de-codigo`, `02-padroes-de-raciocinio-e-execucao`, `03-function-calling-e-tool-use`, `04-memoria-e-reflexao-em-agentes-autonomos`, `05-gerenciamento-de-contextos`, `06-langgraph-e-workflows-complexos`, `07-observabilidade-e-limites-de-autonomia`, `08-projeto-pratico-opspilot-publicado`, `09-multi-agent-systems`. Cada um tem um `UNIDADE.md` com o que é novo e os desvios em relação ao roteiro.
- **Linguagem principal:** TypeScript (ESM) no Node 22, com LangChain.js, LangGraph, Express e SQLite nativo; War Room em React 19 e Vite.
- **Gateway de modelos:** https://openrouter.ai/ (modelos gratuitos: https://openrouter.ai/models?max_price=0).

### Indicações de leitura complementar

1. **HUYEN, Chip. *AI Engineering: Building Applications with Foundation Models*. O'Reilly, 2025.** Livro. Engenharia de aplicações sobre modelos prontos: avaliação de sistemas com LLM, engenharia de contexto, tool use, otimização de custo e latência, arquitetura. A apostila indica ler com a Unidade 2 (comparar padrões com métricas), a 5 (contexto como recurso escasso) e a 7 (custo, latência e observabilidade). Relaciona-se com [04 · ReAct, Plan-and-Execute e Reflection no código: arena e benchmark](./04-estrategias-arena-e-bench.md), [10 · Contexto como orçamento: medir tokens, podar e sumarizar em rolo](./10-contexto-como-orcamento.md), [13 · Observabilidade e limites de autonomia: trace persistido, logs, métricas e aprovação humana](./13-observabilidade-e-limites-de-autonomia.md).
2. **ALAMMAR, Jay; GROOTENDORST, Maarten. *Hands-On Large Language Models*. O'Reilly, 2024.** Livro. Visual e sem matemática pesada: embeddings e busca semântica, o mecanismo da memória do OpsPilot. Indicado com a Unidade 4 (embeddings, similaridade, vector store) e a 5 (tokenização e por que contexto custa). Relaciona-se com [09 · Memória do agente: conversa persistente, memória semântica com embeddings e refletor de aprendizado](./09-memoria-episodica-e-semantica.md), [10 · Contexto como orçamento: medir tokens, podar e sumarizar em rolo](./10-contexto-como-orcamento.md).
3. **NYGARD, Michael T. *Release It!* 2. ed. Pragmatic Bookshelf, 2018.** Livro. A origem dos padrões de resiliência (circuit breaker, timeouts, bulkheads): os freios da Unidade 7 são engenharia de sistemas distribuídos aplicada a um cliente novo. Indicado com a Unidade 3 (timeout e retry), 6 (retry e fallback) e 7 (circuit breaker, degradação controlada). Relaciona-se com [07 · Tools externas resilientes: erro como observação, timeout, retry e Zod](./07-tool-externa-resiliente.md), [12 · LangGraph no OpsPilot: grafo de produção, roteador estruturado e fallback de modelo](./12-langgraph-roteador-e-fallback.md), [13 · Observabilidade e limites de autonomia: trace persistido, logs, métricas e aprovação humana](./13-observabilidade-e-limites-de-autonomia.md).
4. **RUSSELL, Stuart; NORVIG, Peter. *Artificial Intelligence: A Modern Approach*. 4. ed. Pearson, 2021 (complementar).** Livro. O capítulo 2, “Intelligent Agents”, é a fundação conceitual (agente, ambiente, percepção, ação, utilidade, tipos de agente): o que mudou com os LLMs foi o motor de decisão. Indicado com a Unidade 1 e a 9. Relaciona-se com [00 · O agente de código por dentro: harness, modos e context engineering](./00-agente-de-codigo-harness-e-context-engineering.md), [15 · Multi-agent systems: supervisor, papéis, handoffs e blackboard](./15-multi-agent-systems.md).
5. **YAO, Shunyu et al. *ReAct: Synergizing Reasoning and Acting in Language Models*. ICLR 2023, arXiv:2210.03629.** Artigo. Por que intercalar raciocínio e ação supera o raciocínio puro (que alucina fatos) e a ação cega; o *reasoning trace* que o módulo transforma em estrutura tipada e depois em trilha de auditoria. Relaciona-se com [02 · Os três padrões de raciocínio: ReAct, Plan-and-Execute e Reflection](./02-tres-padroes-de-raciocinio.md), [04 · ReAct, Plan-and-Execute e Reflection no código: arena e benchmark](./04-estrategias-arena-e-bench.md), [13 · Observabilidade e limites de autonomia: trace persistido, logs, métricas e aprovação humana](./13-observabilidade-e-limites-de-autonomia.md). https://arxiv.org/abs/2210.03629
6. **WANG, Lei et al. *Plan-and-Solve Prompting*. ACL 2023, arXiv:2305.04091.** Artigo. A linhagem do Plan-and-Execute: planejar melhora a coerência global, mas o plano envelhece, problema que o replanner resolve (a Unidade 2 chega a demonstrar desligando o replanner). Relaciona-se com [02 · Os três padrões de raciocínio: ReAct, Plan-and-Execute e Reflection](./02-tres-padroes-de-raciocinio.md), [04 · ReAct, Plan-and-Execute e Reflection no código: arena e benchmark](./04-estrategias-arena-e-bench.md), [12 · LangGraph no OpsPilot: grafo de produção, roteador estruturado e fallback de modelo](./12-langgraph-roteador-e-fallback.md). https://arxiv.org/abs/2305.04091
7. **SHINN, Noah et al. *Reflexion: Language Agents with Verbal Reinforcement Learning*. NeurIPS 2023, arXiv:2303.11366; e MADAAN, Aman et al. *Self-Refine*. NeurIPS 2023, arXiv:2303.17651.** Artigos. A base do terceiro padrão: o agente critica a própria saída em linguagem natural e usa a crítica na nova tentativa (`withReflection`, na Unidade 2, e o refletor de aprendizado, na 4). Relaciona-se com [04 · ReAct, Plan-and-Execute e Reflection no código: arena e benchmark](./04-estrategias-arena-e-bench.md), [09 · Memória do agente: conversa persistente, memória semântica com embeddings e refletor de aprendizado](./09-memoria-episodica-e-semantica.md). https://arxiv.org/abs/2303.11366
8. **LIU, Nelson F. et al. *Lost in the Middle: How Language Models Use Long Contexts*. TACL v. 12, 2024, arXiv:2307.03172.** Artigo. Evidência empírica de que o modelo recupera bem o começo e o fim do contexto e degrada no meio, justificando cortar, resumir e priorizar em vez de aumentar a janela (Unidade 5). Relaciona-se com [10 · Contexto como orçamento: medir tokens, podar e sumarizar em rolo](./10-contexto-como-orcamento.md), [11 · Context stitching: ContextBuilder com teto, prioridade e regra de corte por seção](./11-context-stitching-contextbuilder.md). https://arxiv.org/abs/2307.03172
9. **PARK, Joon Sung et al. *Generative Agents: Interactive Simulacra of Human Behavior*. UIST 2023, arXiv:2304.03442 (complementar).** Artigo. Arquitetura de memória com observação, reflexão e planejamento: o desenho que a Unidade 4 implementa em escala reduzida no refletor; também ligado à Unidade 9 (coordenação por estado compartilhado). Relaciona-se com [09 · Memória do agente: conversa persistente, memória semântica com embeddings e refletor de aprendizado](./09-memoria-episodica-e-semantica.md), [15 · Multi-agent systems: supervisor, papéis, handoffs e blackboard](./15-multi-agent-systems.md). https://arxiv.org/abs/2304.03442

Documentação técnica de referência (a apostila avisa que muda rápido; vale conferir a versão vigente antes de cada unidade):

- Model Context Protocol: especificação e diretório de servidores (modelcontextprotocol.io) (Unidade 3). Relaciona-se com [08 · MCP: o OpsPilot como servidor de ferramentas, outra porta para a mesma aplicação](./08-mcp-servidor-do-opspilot.md). https://modelcontextprotocol.io
- LangGraph JS: grafos, interrupt, checkpointers (langchain-ai.github.io/langgraphjs) (Unidades 2, 6, 7 e 9). Relaciona-se com [04 · ReAct, Plan-and-Execute e Reflection no código: arena e benchmark](./04-estrategias-arena-e-bench.md), [12 · LangGraph no OpsPilot: grafo de produção, roteador estruturado e fallback de modelo](./12-langgraph-roteador-e-fallback.md), [15 · Multi-agent systems: supervisor, papéis, handoffs e blackboard](./15-multi-agent-systems.md). https://langchain-ai.github.io/langgraphjs
- GitHub Spec Kit (github.com/github/spec-kit) (a partir da Unidade 2). Relaciona-se com [03 · Spec Kit e a estrutura inicial do OpsPilot: contrato de estratégia, trace e fábrica de modelo](./03-spec-kit-e-estrutura-do-opspilot.md). https://github.com/github/spec-kit
- GitHub Copilot: customização (instructions, prompt files, chat modes) e auto-aprovação de terminal, na documentação do VS Code e do Copilot (Unidade 1). Relaciona-se com [00 · O agente de código por dentro: harness, modos e context engineering](./00-agente-de-codigo-harness-e-context-engineering.md).
- Anthropic, *Building Effective Agents* (dez./2024): começar pelo mais simples e só então compor padrões; contraprova ao entusiasmo com multiagente (Unidade 9). Relaciona-se com [15 · Multi-agent systems: supervisor, papéis, handoffs e blackboard](./15-multi-agent-systems.md).

> As URLs de arXiv foram montadas a partir dos identificadores citados no PDF de indicações; o PDF não traz links.

---

*Guia gerado a partir da apostila oficial (162 págs), das indicações de leitura e do código do repositório do módulo 04.*
