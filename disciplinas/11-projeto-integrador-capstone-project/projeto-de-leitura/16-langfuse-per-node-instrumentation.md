# 16 · Langfuse: tour e instrumentação por nó

> **Unidade 5 · Aula 22** · Leitura: ~9 min · Bloco: Unidade 5 · Observabilidade e produção

## 🎯 Em uma frase
Em produção só dá para responder "o usuário está com problema?" e "quanto isso custa?" se a aplicação enviar **telemetria**. A aula instrumenta o grafo com **Langfuse** em dois pontos: um **provider OpenTelemetry** registrado uma vez no boot e um **CallbackHandler** (padrão **interceptor**) criado a cada chamada do grafo. Sem as chaves, nada registra e o processo sobe normalmente.

---

## 👵 Explicando para a vovó

Pense na caixa-preta de um avião e no painel do piloto: em terra você abre o capô, mas com o avião voando só os sensores dizem o que está acontecendo. Telemetria são esses sensores: cada operação avisa quando começou, quando terminou e se deu erro.

O interceptor é como um fiscal de pedágio que anota a placa de todo carro que passa, sem mexer na viagem de ninguém. O carro (a chamada do grafo) segue o mesmo caminho; o fiscal (callback) só registra.

---

## 🔧 Tecnicamente

### O que é
- **Observabilidade**: capacidade de saber, com a aplicação em produção, se há usuário com problema e quanto ela custa. Na aula, foco no consumo de modelos.
- **Telemetria**: dados puros de log (início, fim, erro, duração) que o sistema envia ao servidor, na prática um JSON. Monitoramento e alarmes são construídos sobre ela; sem ingestão não há o que monitorar.
- **Instrumentar**: usar o SDK da ferramenta de observabilidade nos pontos de chamada do projeto para que ele envie a telemetria. Dependendo do framework, nem é muito invasivo.
- **Langfuse**: framework open source de observabilidade de agentes, com serviço de nuvem. Plano gratuito: até 2 usuários, retenção de 30 dias, sem cartão de crédito. Não é a única opção, serve para explicar os conceitos.
- **OpenTelemetry (OTel)**: padrão aberto de telemetria aceito pela indústria. Permite trocar de ferramenta (ELK customizado, Dynatrace) sem grandes traumas, porque o formato é aceito.
- **Interceptor**: função no meio do caminho entre a chamada e o que ela executa. Aqui, o 2º parâmetro do `stream()` recebe o callback que envia a telemetria sem interferir na execução. Junta-se a adapter e strategy, padrões dos anos 90 ainda essenciais para guiar o agente de código.
- Três decisões do prompt de instrumentação: provider no boot de cada processo que pode invocar o grafo (API e os dois transportes do MCP), callback novo a cada chamada, e sem chaves nada registra nem impede o boot.
- No dashboard: **trace** por chamada (aba Tracing), **modelo** identificado e **custo** calculado (centavos por chamada) e **alertas** por e-mail ao atingir threshold.
- Região importa: Langfuse tem EUA, Europa, Japão e HIPAA. Se o ambiente aponta para uma região e o monitor aberto é de outra, os dados não aparecem.

### Como funciona
- Cadastro e login no Langfuse, chegando ao dashboard.
- Criar um projeto e, em Settings, criar a API key (com secret key).
- Colocar no ambiente de desenvolvimento as três variáveis que a tela indica (no arquivo de ambiente ou nas variáveis do SO). No repo: `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY` e `LANGFUSE_BASE_URL`.
- Enviar ao Claude Code o prompt: registrar um `NodeTracerProvider` do OTel com `LangfuseSpanProcessor` (`@langfuse/otel`) uma vez no boot de `apps/api` e dos dois transportes de `packages/mcp-server`; criar um `CallbackHandler` (`@langfuse/langchain`) a cada `graph.stream()`/`graph.invoke()`; sem chaves, nada registra nem impede o boot.
- No código, a telemetria é inicializada antes de o backend Node subir; a função de callback fica pronta para ser passada nas chamadas do grafo.
- Opcional: instalar a skill oficial do Langfuse no agente (mais rápido e assertivo); a instrumentação também pode partir de uma spec fim a fim.
- Testar com `DEMO=false` (com `DEMO=true` o sistema responde com mocks e não chama o Vertex AI). Na demo, o Claude Code subiu a app, perguntou o lucro líquido da Vale no último trimestre e consultou a API do Langfuse para confirmar a chegada do trace.
- Contratempos da demo: chaves estavam nas variáveis do SO e não no `.env`; porta 3000 ocupada por teste anterior (o agente liberou e reexecutou).
- Em produção funciona igual: os secrets vêm do vault da nuvem (GCP ou outra) e a app envia ao mesmo lugar.

### Onde aplicar
- Qualquer agente em produção onde é preciso investigar uma resposta ruim sem reproduzir em homologação.
- Controle de custo por chamada e por modelo, desde o começo, pesado contra o valor entregue ao usuário.
- Alertas por threshold (custo, erro, latência) enviados por e-mail.
- Troca de ferramenta de observabilidade mantendo o OTel como padrão de emissão.

### Vantagens e limites
**Vantagens**
- Trace por chamada permite investigar problema sem simular em homologação.
- Callback interceptor é pouco invasivo: a chamada do grafo continua a mesma.
- OTel é padrão aberto, reduz lock-in.
- Plano gratuito basta para desenvolvimento e estudo.

**Limites**
- Mais uma dependência externa e mais secrets para gerenciar (chaves e região).
- Plano gratuito tem retenção de apenas 30 dias.
- Dados saem do ambiente para a nuvem do fornecedor: região e governança precisam ser decididas.
- Teste real exige chamadas reais ao Vertex AI (custo, mesmo que centavos).

### 🚫 Armadilhas
- Região diferente entre ambiente e monitor: nada aparece no dashboard e parece que a telemetria não chegou.
- Testar com `DEMO=true`: mocks não chamam o modelo e portanto não geram trace de LLM real.
- Chaves procuradas no `.env` quando estão nas variáveis do SO (ou o contrário).
- Instrumentar só a API e esquecer os transportes do MCP: chamadas feitas pelo MCP ficam invisíveis.
- Achado: no repo, passar `{ callbacks }` explícito dentro de um nó (em `llm.ts`) substitui o callback manager ambiente e faz a generation sumir do trace Langfuse; o callback vai sempre no call site do `stream()`/`invoke()`.

> 💡 Antes de confiar no dashboard, consulte a API do Langfuse (`GET /api/public/traces` com Basic auth das duas chaves) e confirme que há trace nas últimas 24h: é o que o `capstone:check` do repo faz.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Telemetria | Dado item a item (início, fim, erro, duração) enviado ao servidor, em geral JSON. |
| Observabilidade | Saber o que acontece na app em produção e quanto ela custa. |
| Instrumentar | Usar o SDK da ferramenta nos pontos de chamada para emitir telemetria. |
| Langfuse | Framework open source de observabilidade de agentes, com nuvem (free: 2 usuários, 30 dias). |
| OpenTelemetry | Padrão aberto de telemetria aceito pela maioria das ferramentas. |
| LangfuseSpanProcessor | Span processor de `@langfuse/otel` que exporta os spans ao Langfuse. |
| CallbackHandler | Callback de `@langfuse/langchain` criado por chamada do grafo. |
| Interceptor | Função entre a chamada e a execução que registra sem alterar o fluxo. |
| Região Langfuse | EUA, Europa, Japão ou HIPAA: ambiente e monitor precisam coincidir. |
| DEMO | Variável: `true` usa mocks, `false` chama o Vertex AI de verdade. |

---

## 💻 No código do repo

**Projeto:** [packages/agent/src/observability/langfuse.ts, apps/api/src/index.ts, packages/mcp-server/src/{stdio,http}.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/observability)

Li o código-fonte (langfuse.ts, index.ts da API, stdio.ts, http.ts, app.ts, server.ts e o trecho de deploy.yml). Não executei testes nem a aplicação.

**Fluxo**
1. `packages/agent/src/observability/langfuse.ts`: `registrarLangfuseTracing()` cria `new NodeTracerProvider({ spanProcessors: [new LangfuseSpanProcessor()] }).register()`; idempotente (flag `tracerRegistrado`).
2. Mesmo arquivo: `configurado()` exige `LANGFUSE_PUBLIC_KEY` e `LANGFUSE_SECRET_KEY`; sem elas, retorna sem registrar e o processo sobe.
3. `criarLangfuseCallbacks()` devolve `[new CallbackHandler()]` ou array vazio, então o call site nunca precisa de branch. O CLAUDE.md justifica o pacote com escopo (`@langfuse/langchain` + `@langfuse/otel`) em vez do legado `langfuse-langchain`, que exigiria a dependência `langchain` inteira.
4. `apps/api/src/index.ts`: chama `registrarLangfuseTracing()` antes de `build()` e do `listen`.
5. `packages/mcp-server/src/stdio.ts` e `http.ts`: cada um chama `registrarLangfuseTracing()` no topo (os 3 processos da aula).
6. `apps/api/src/app.ts`: `obterGrafo().stream(input, { callbacks: [...criarLangfuseCallbacks(), criarMetricsCallback()] })` para `/chat`, e `invoke` com os mesmos callbacks para `/api/mcp`.
7. `packages/mcp-server/src/server.ts`: `invoke` do grafo com os mesmos callbacks (tool `perguntar`).
8. `.github/workflows/deploy.yml`: injeta `LANGFUSE_PUBLIC_KEY`/`LANGFUSE_SECRET_KEY` via Secret Manager e `LANGFUSE_BASE_URL=https://us.cloud.langfuse.com` como env var.

**Como rodar**
- `pnpm install`
- `export LANGFUSE_PUBLIC_KEY=... LANGFUSE_SECRET_KEY=... LANGFUSE_BASE_URL=https://us.cloud.langfuse.com`
- `pnpm dev` com `DEMO` não definida como `true` (precisa de Postgres e GCP, ver README)
- `pnpm test` (inclui `langfuse.test.ts`; não executei)

**Armadilhas e achados no código**
- Achado: o dashboard da aula mostra "Gemini 3.5 Flash"; a tabela de preços do repo tem `gemini-3.5-flash-lite`, `gemini-3.6-flash` e `gemini-embedding-001`. Divergência de nome de modelo entre vídeo e código atual.
- Achado: `LANGFUSE_BASE_URL` fixo em `us.cloud.langfuse.com` no deploy.yml; é o caso de região casando com o projeto, mas quem criar projeto em outra região precisa trocar.
- Exportação OTLP é assíncrona e best-effort (CLAUDE.md afirma ter confirmado com credenciais falsas; não reproduzi).

---

## 🔗 Para ir além
- [Capstone Project AI Researcher (completo)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)
- [AI Researcher Seed (ponto de partida)](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed)
- [packages/agent/src/observability/langfuse.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/observability)

---

⬅️ [15 · Disclaimer, guardrail visual e o E2E no CI](./15-disclaimer-visual-guardrail-and-e2e-in-ci.md)  ·  [17 · Métricas, budget de tokens e rate limiting](./17-metrics-token-budget-and-rate-limiting.md) ➡️
