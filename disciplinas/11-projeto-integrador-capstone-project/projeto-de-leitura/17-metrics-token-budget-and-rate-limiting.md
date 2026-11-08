# 17 · Métricas, budget de tokens e rate limiting

> **Unidade 5 · Aula 23** · Leitura: ~11 min · Bloco: Unidade 5 · Observabilidade e produção

## 🎯 Em uma frase
**Telemetria** é o dado item a item; **métrica** é o agregado, e é sobre a métrica que se controla custo. A aula cria contadores **Prometheus** alimentados pelo `usage_metadata` real do Vertex AI, expõe em `GET /api/metrics` e sobre isso monta dois controles: **rate limit** (volume de chamadas) e **budget diário de tokens**, ambos respondendo **429**.

---

## 👵 Explicando para a vovó

Telemetria é o extrato com cada compra do cartão; métrica é o total da fatura do mês. Para saber se você estourou o limite, precisa do total, não de cada compra.

O rate limit é o porteiro que barra uma multidão entrando de uma vez. O budget diário é o limite do cartão: acabou o saldo do dia, nenhuma compra nova passa até amanhã.

---

## 🔧 Tecnicamente

### O que é
- **Telemetria x métrica**: telemetria é o dado analítico item a item (o trace de cada chamada); métrica é o agregado (quanto neste mês, nesta semana). O Langfuse oferece os dois, mas o projeto cria métrica própria e local porque é sobre ela que os controles de custo rodam no agente.
- **FinOps**: saber controlar o custo da aplicação. Com a métrica dentro da app, abuso ou custo acima do desejado pode virar erro ou fallback para modelo mais barato.
- **Contadores Prometheus** (`prom-client`) em `Registry` próprio: `llm_tokens_total` (labels `node`, `model`, `kind`) e `llm_cost_usd_total` (labels `node`, `model`).
- **Callback LangChain genérico** correlaciona `handleChatModelStart`/`handleLLMEnd` por `runId`, lê `metadata.langgraph_node` e `metadata.ls_model_name` e incrementa a partir do `usage_metadata` real, nunca de estimativa.
- **Tabela de preço** em USD por milhão de tokens. Modelo fora da tabela: aviso no log e custo zero, nunca quebra a resposta.
- **Interceptors encadeados**: `callbacks: [...criarLangfuseCallbacks(), criarMetricsCallback()]` no mesmo call site (`apps/api/src/app.ts`), nunca dentro de `llm.ts`: o LangGraph propaga o callback manager por AsyncLocalStorage e um `callbacks` explícito num nó o substituiria em vez de somar.
- **Endpoint de métricas**: `GET /api/metrics` em formato Prometheus, com interface mínima de registry para `apps/api` não ganhar a dependência do `prom-client`.
- **Rate limit**: limite de rajadas; ao atingir, 429. Conceito de backend, não só de app agêntica. Protege contra invasão, abuso, bot (no caso do MCP) e loop infinito de um chamador. A volumetria depende do negócio: app interna de 100 usuários não precisa de arquitetura para 1 milhão.
- **Budget diário**: contador de tokens em memória que zera na virada do dia, alimentado pela mesma fonte das métricas (sem segunda contagem) e verificado no início da rota `/chat`, antes de qualquer byte SSE. Estourou: 429 para o frontend ou para o agente que usa o MCP.
- Limites declarados pela aula: o custo não é tão preciso quanto o do Langfuse (opção de simplificar, em vez de serviço de preço em tempo real) e o `prom-client` foi avisado como depreciado, mantido por fins didáticos (use a versão mais nova).

### Como funciona
- Prompt 1 (contadores): dois `Counter` em `Registry` próprio, callback genérico por `runId`, custo vindo da tabela de preços, callback somado ao do Langfuse no call site.
- Prompt 2 (endpoint): `GET /api/metrics` usando o Registry já criado, via interface mínima.
- Prompt 3 (controles): `@fastify/rate-limit` global configurável por `RATE_LIMIT_MAX`/`RATE_LIMIT_WINDOW`, desligado em `/health` e `/metrics`, opções calculadas em função chamada em `build()` (não em objeto lido no import).
- Mesmo prompt: budget diário em memória, zera na virada do dia UTC, alimentado pela fonte de tokens do callback de métricas, verificado no início de `/chat`.
- Para o orçamento criou-se uma nova exceção (orçamento excedido); a verificação consulta o total do dia (já acumulado) e compara com o limite diário.
- Como os erros foram unificados na Aula 16, a nova exceção exigiu mexer em um lugar só (error handler).
- Os testes unitários pegaram um bug: o rate limit lançava 429 mas o error handler sobrescrevia o status com 500. Ajuste no error handler e os testes passaram.
- O rate limit soma-se à resiliência da Aula 15 (degradação graciosa): várias camadas, se uma faltar ou for mal calculada, outra protege.
- Comparativo: rate limit controla volume de chamadas, dado vem da contagem de requisições do plugin, atua em todas as rotas menos health e metrics, devolve 429. Budget controla gasto acumulado do dia, dado vem do callback de métricas, atua no início de `/chat`, devolve 429 (ou fallback para modelo mais barato).

### Onde aplicar
- Qualquer API que expõe LLM a usuário final ou a agentes externos via MCP.
- Dashboards e alertas de custo por nó e por modelo (Grafana/Prometheus).
- Serviços internos que precisam de teto de volumetria compatível com a arquitetura provisionada.
- Fallback para modelo menor quando o custo passa do desejado (alternativa citada pela aula ao 429).

### Vantagens e limites
**Vantagens**
- Custo real por nó e modelo, vindo do uso devolvido pelo provedor.
- Uma única fonte de tokens alimenta métrica e budget: sem divergência.
- Controles dentro da app protegem contra abuso e loop mesmo sem gateway.
- Um error handler central torna novos tipos de erro uma mudança em um lugar.

**Limites**
- Estado em memória: com mais de uma instância, rate limit e budget são por instância, não globais.
- Cálculo de custo menos preciso que o do Langfuse; tabela de preços precisa de manutenção manual.
- Budget só existe se há métricas: dependência de ordem de implementação.
- Escolher o limite errado derruba usuário legítimo (volumetria é decisão de negócio).

### 🚫 Armadilhas
- Passar `callbacks` explícito dentro de `llm.ts`: substitui o callback manager ambiente e a generation some do trace.
- Calcular opções do rate limit em objeto de módulo: lê a env var cedo demais e testes que ajustam a variável não têm efeito.
- Error handler genérico sobrescrevendo 429 com 500: só o teste unitário revela.
- Verificar o budget depois do `writeHead(200)` do SSE: a resposta já é 200 e não dá mais para devolver 429.
- Achado: modelo não cadastrado em `pricing.ts` vira custo 0 com aviso uma vez; trocar `MODEL_ANSWER` sem atualizar a tabela deixa o custo e o orçamento em dólar silenciosamente subestimados (o budget é em tokens, não em USD, então segue valendo).
- Achado: `verificarOrcamento()` só é chamado em `chat.ts`; não encontrei chamada no gateway `/api/mcp` nem na tool `perguntar`, apesar de a aula dizer que o agente que consome o MCP também recebe 429 no budget (o rate limit global cobre o `/api/mcp`).

> 💡 Defina TOKEN_BUDGET_DIARIO e RATE_LIMIT_MAX a partir do tráfego medido (a métrica existe para isso), não de chute, e teste os dois com valores minúsculos (limite 2 ou 1) para ver o 429 de verdade.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Métrica | Valor agregado ao longo do tempo (ex.: tokens no dia). |
| Telemetria | Registro item a item de cada chamada (trace). |
| FinOps | Controle do custo da aplicação. |
| Counter (prom-client) | Métrica que só cresce; aqui `llm_tokens_total` e `llm_cost_usd_total`. |
| usage_metadata | Uso real de tokens devolvido pelo Vertex AI, base de custo e budget. |
| Tabela de preço | USD por milhão de tokens, por modelo; modelo ausente conta custo zero com aviso. |
| Rate limit | Teto de chamadas por janela; estouro devolve 429. |
| Budget diário | Teto de tokens/dia em memória, zera na virada do dia UTC. |
| Interceptors encadeados | Vários callbacks independentes na mesma chamada. |
| 429 | Too Many Requests: usado por rate limit e por budget excedido. |

---

## 💻 No código do repo

**Projeto:** [packages/agent/src/observability/{metrics,pricing,budget}.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/observability)

Li os três arquivos e os testes existem ao lado (metrics/pricing/budget .test.ts). Não executei a suíte.

**Fluxo**
1. `metrics.ts`: `export const registry = new Registry()` e dois `Counter`: `llm_tokens_total` (`node`, `model`, `kind`) e `llm_cost_usd_total` (`node`, `model`).
2. `criarMetricsCallback()`: uma instância por chamada, `Map` local por `runId`; `handleChatModelStart` guarda `langgraph_node` e `ls_model_name` (fallback `'desconhecido'`).
3. `handleLLMEnd`: incrementa tokens `input` e `output`, custo via `custoUsd()` e chama `registrarConsumoDeTokens(input + output)` (mesma fonte do budget).
4. `handleLLMError`: apaga a entrada do `Map` para não vazar memória quando a chamada falha.
5. `pricing.ts`: `PRECOS` USD/milhão: `gemini-3.5-flash-lite` 0.3 in / 2.5 out; `gemini-3.6-flash` 1.5 / 7.5; `gemini-embedding-001` 0.15 / 0. Modelo ausente: `console.warn` uma vez e retorna 0.
6. `budget.ts`: `diaDeHoje()` em ISO (UTC); `garantirDiaAtual()` zera na leitura/escrita ao virar o dia (sem cron); `verificarOrcamento()` lança `OrcamentoDiarioExcedidoError` se `tokensConsumidosHoje() >= TOKEN_BUDGET_DIARIO`; sem a env var, nunca lança.

**Como rodar**
- `pnpm test` (Vitest via turbo; não executei)
- `TOKEN_BUDGET_DIARIO=1 pnpm dev`, uma pergunta passa e a segunda recebe 429 (comportamento descrito no CLAUDE.md; não reproduzi)
- `curl http://localhost:3000/api/metrics` para ver `llm_tokens_total` e `llm_cost_usd_total`

**Armadilhas e achados no código**
- Achado: o escopo das métricas é só `grade` e `answer`; o custo de embeddings não entra (CLAUDE.md: `embedQuery()` não expõe callbacks), embora a tabela de preços inclua `gemini-embedding-001`.
- Achado: o orçamento é em tokens, não em USD, e o contador é por processo (CLAUDE.md admite a limitação com várias instâncias do Cloud Run).
- Achado: `prom-client` está fixado em `15.1.3` em `packages/agent/package.json`; a aula diz que o agente avisou depreciação. Não verifiquei o status atual da biblioteca.

**Projeto:** [apps/api/src/{rate-limit,app,error-handler}.ts e routes/{metrics,chat}.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api/src)

Li rate-limit.ts, app.ts, error-handler.ts, routes/metrics.ts e routes/chat.ts; os testes de 429 estão em app.test.ts, error-handler.test.ts e routes/chat.test.ts (não executei).

**Fluxo**
1. `rate-limit.ts`: `criarRateLimitOptions()` devolve `max: Number(process.env.RATE_LIMIT_MAX ?? 20)`, `timeWindow: process.env.RATE_LIMIT_WINDOW ?? '1 minute'` e `errorResponseBuilder` que devolve `LimiteDeRequisicoesExcedidoError`.
2. `app.ts`: `app.register(rateLimit, criarRateLimitOptions())` dentro de `build()`, na raiz, depois de `otelHttpMetricsPlugin`.
3. `routes/health.ts` e `routes/metrics.ts`: `{ config: { rateLimit: false } }` nas próprias rotas.
4. `routes/metrics.ts`: interface `MetricsRegistry { contentType; metrics(): Promise<string> }`; `app.ts` injeta `metrics ?? metricsRegistry`.
5. `app.ts`: `callbacks: [...criarLangfuseCallbacks(), criarMetricsCallback()]` em `stream()` (chat) e `invoke()` (mcp).
6. `routes/chat.ts`: `verificarOrcamento()` logo após validar o body e antes de `reply.raw.writeHead(200, ...)`.
7. `error-handler.ts`: `paraProblema()` mapeia `OrcamentoDiarioExcedidoError` (tipo `orcamento-excedido`) e `LimiteDeRequisicoesExcedidoError` (`limite-de-requisicoes`) para status 429 em `application/problem+json`.

**Como rodar**
- `RATE_LIMIT_MAX=2 pnpm dev` e três `POST /api/chat` seguidos: 200, 200, 429 (descrito no CLAUDE.md)
- `pnpm load:test --url http://127.0.0.1:3000 --n 40` para estourar o rate limit de propósito
- `pnpm --filter @hero/api test` (não executei; confira o nome do filtro no package.json)

**Armadilhas e achados no código**
- Achado: o bug "error handler sobrescreve 429 com 500" da aula está resolvido no repo por construção: o `errorResponseBuilder` devolve a instância do erro, tratada em `paraProblema()`, e `/health` e `/metrics` usam `rateLimit: false`.
- Achado: default do rate limit é 20 por 1 minuto, números que a aula não cita.
- Achado: `apps/api/package.json` não lista `prom-client`, coerente com a interface mínima pedida no prompt (a dependência está em `packages/agent`).
- Achado: `/api/mcp` não chama `verificarOrcamento()` (ver armadilhas do tópico).

---

## 🔗 Para ir além
- [Capstone Project AI Researcher (completo)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)
- [AI Researcher Seed (ponto de partida)](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed)
- [packages/agent/src/observability](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/observability)
- [apps/api/src/rate-limit.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api/src)

---

⬅️ [16 · Langfuse: tour e instrumentação por nó](./16-langfuse-per-node-instrumentation.md)  ·  [18 · README com Mermaid e desligando o ambiente pelo Console do GCP](./18-readme-and-shutting-down-gcp.md) ➡️
