# 🚀 Projeto Integrador (Capstone Project): Guia de Leitura

> Resumo organizado da **Disciplina 11** da pós de Engenharia de IA Aplicada (autoria: **Álvaro Camillo Neto**).
> Cada assunto tem duas camadas: 👵 *para a vovó* (analogia do mundo real) e 🔧 *tecnicamente* (nível sênior), e fecha com o que está **no código do repositório** do projeto.

---

## 🗺️ Como usar este guia

Cada arquivo é auto-contido e segue sempre a mesma estrutura:

| Seção | Para quê serve |
|-------|----------------|
| 🎯 **Em uma frase** | O conceito destilado |
| 👵 **Explicando para a vovó** | Analogia do mundo real, sem jargão |
| 🔧 **Tecnicamente** | O que é, como funciona, onde aplicar, vantagens e limites, armadilhas |
| 🧩 **Cola rápida** | Glossário dos termos-chave |
| 💻 **No código do repo** | Fluxo por arquivo, como rodar e achados (divergências entre a aula e o código) |
| 🔗 **Para ir além** | Links de referência |

A disciplina tem **um projeto só**: o **AI Researcher**, um chatbot de investimentos de bolsa construído do primeiro commit à produção no Google Cloud. Ele busca em uma base vetorial com indicadores públicos da CVM (20 empresas da B3), um nó julga se o contexto basta, recorre à web quando não basta e responde com citação, sem nunca recomendar compra ou venda.

Há dois repositórios: o [projeto completo](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher) (branches `main`, `starter` e `ensaio-video`) e o [AI Researcher Seed](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed), o ponto de partida do aluno. O seed já está no estado pós-Unidade 1 (tem `apps/api`, `apps/web` e o workflow de deploy).

**O que foi e não foi verificado:** a apostila foi lida inteira e o código do repositório foi lido (nomes de arquivo, funções, constantes). As seis regex do guardrail foram testadas num script avulso fora do repo e as afirmações sobre o `CLAUDE.md` e o ponto de chamada do budget foram conferidas por `grep`. **Nenhum teste, build, deploy, migration ou comando `gcloud` foi executado**; o que depende disso está marcado como hipótese em cada tópico.

---

## 🧭 Trilha de leitura sugerida

### Unidade 1 · Ideação, setup e deploy inicial
- [00 · Bem-vindo ao Capstone: o AI Researcher e a regra "informa, nunca recomenda"](./00-welcome-to-the-capstone.md) (~7 min)
- [01 · CLAUDE.md e AI Dev Skills: contexto sempre ligado versus instruções sob demanda](./01-claude-md-and-ai-dev-skills.md) (~9 min)
- [02 · Tour pelo Google Cloud e GitHub Actions com Workload Identity Federation](./02-google-cloud-tour-and-github-actions-wif.md) (~11 min)
- [03 · Corpus CVM: coleta, normalização e parágrafos determinísticos sem LLM](./03-cvm-corpus.md) (~10 min)
- [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md) (~14 min)

### Unidade 2 · Orquestração cognitiva e APIs
- [05 · pgvector, embeddings e o script de seed](./05-pgvector-and-seed.md) (~9 min)
- [06 · Os nós retrieve e grade](./06-retrieve-and-grade-nodes.md) (~9 min)
- [07 · Serper, adapter de busca e fallback web com TTL](./07-serper-and-web-fallback.md) (~12 min)
- [08 · O grafo real: aresta condicional e guard do loop](./08-real-graph-conditional-edge-and-loop-guard.md) (~8 min)
- [09 · Nó answer, citação obrigatória, guardrail por código e SSE](./09-answer-node-citation-guardrail-and-sse.md) (~12 min)

### Unidade 3 · Qualidade, resiliência e MCP
- [10 · Testando o grafo sem rede](./10-testing-the-graph-without-network.md) (~9 min)
- [11 · Circuit breaker, retry e degradação graciosa](./11-circuit-breaker-retry-and-graceful-degradation.md) (~10 min)
- [12 · Erros padronizados e o servidor MCP](./12-standard-errors-and-mcp-server.md) (~12 min)

### Unidade 4 · Frontend
- [13 · Do protótipo no Claude Design à skill frontend-design](./13-claude-design-to-frontend-design-skill.md) (~8 min)
- [14 · Chat com streaming e citações clicáveis + painel de estado do grafo](./14-streaming-chat-and-graph-state-panel.md) (~12 min)
- [15 · Disclaimer, guardrail visual e o E2E no CI](./15-disclaimer-visual-guardrail-and-e2e-in-ci.md) (~9 min)

### Unidade 5 · Observabilidade e produção
- [16 · Langfuse: tour e instrumentação por nó](./16-langfuse-per-node-instrumentation.md) (~9 min)
- [17 · Métricas, budget de tokens e rate limiting](./17-metrics-token-budget-and-rate-limiting.md) (~11 min)
- [18 · README com Mermaid e desligando o ambiente pelo Console do GCP](./18-readme-and-shutting-down-gcp.md) (~9 min)
- [19 · Revisão integrada: o AI Researcher de ponta a ponta, os slides de diagrama e as leituras indicadas](./19-integrated-review.md) (~10 min)

---

## ✅ Cobertura aula a aula (Disciplina 11)

| Unidade · Aula da apostila | Documento |
|----------------------------|-----------|
| **Introdução da disciplina** e mapa | Este README, mais o [19 · Revisão integrada](./19-integrated-review.md) |
| **U1 · Aula 1** · Bem-vindo ao Capstone | [00 · Bem-vindo ao Capstone: o AI Researcher e a regra "informa, nunca recomenda"](./00-welcome-to-the-capstone.md) |
| **U1 · Aula 2** · CLAUDE.md e AI Dev Skills | [01 · CLAUDE.md e AI Dev Skills: contexto sempre ligado versus instruções sob demanda](./01-claude-md-and-ai-dev-skills.md) |
| **U1 · Aula 3** · Tour pelo Google Cloud | [02 · Tour pelo Google Cloud e GitHub Actions com Workload Identity Federation](./02-google-cloud-tour-and-github-actions-wif.md) |
| **U1 · Aula 4** · GitHub e GitHub Actions | [02 · Tour pelo Google Cloud e GitHub Actions com Workload Identity Federation](./02-google-cloud-tour-and-github-actions-wif.md) |
| **U1 · Aula 5** · Corpus CVM | [03 · Corpus CVM: coleta, normalização e parágrafos determinísticos sem LLM](./03-cvm-corpus.md) |
| **U1 · Aula 6** · Fundação GCP | [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md) |
| **U1 · Aula 7** · Walking Skeleton e Deploy Zero | [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md) |
| **U2 · Aula 8** · pgvector, seed | [05 · pgvector, embeddings e o script de seed](./05-pgvector-and-seed.md) |
| **U2 · Aula 9** · Os nós retrieve e grade | [06 · Os nós retrieve e grade](./06-retrieve-and-grade-nodes.md) |
| **U2 · Aula 10** · Serper | [07 · Serper, adapter de busca e fallback web com TTL](./07-serper-and-web-fallback.md) |
| **U2 · Aula 11** · Fallback pra busca web, upsert retroativo | [07 · Serper, adapter de busca e fallback web com TTL](./07-serper-and-web-fallback.md) |
| **U2 · Aula 12** · O grafo real: aresta condicional e o guard do loop | [08 · O grafo real: aresta condicional e guard do loop](./08-real-graph-conditional-edge-and-loop-guard.md) |
| **U2 · Aula 13** · O nó answer, citação obrigatória, guardrail por código e streaming SSE | [09 · Nó answer, citação obrigatória, guardrail por código e SSE](./09-answer-node-citation-guardrail-and-sse.md) |
| **U3 · Aula 14** · Testando o grafo sem rede | [10 · Testando o grafo sem rede](./10-testing-the-graph-without-network.md) |
| **U3 · Aula 15** · Circuit breaker, retry e degradação graciosa | [11 · Circuit breaker, retry e degradação graciosa](./11-circuit-breaker-retry-and-graceful-degradation.md) |
| **U3 · Aula 16** · Erros padronizados | [12 · Erros padronizados e o servidor MCP](./12-standard-errors-and-mcp-server.md) |
| **U3 · Aula 17** · O servidor MCP | [12 · Erros padronizados e o servidor MCP](./12-standard-errors-and-mcp-server.md) |
| **U4 · Aula 18** · Do protótipo no Claude Design à skill frontend-design | [13 · Do protótipo no Claude Design à skill frontend-design](./13-claude-design-to-frontend-design-skill.md) |
| **U4 · Aula 19** · Chat com streaming e citações clicáveis | [14 · Chat com streaming e citações clicáveis + painel de estado do grafo](./14-streaming-chat-and-graph-state-panel.md) |
| **U4 · Aula 20** · Painel de estado do grafo em tempo real | [14 · Chat com streaming e citações clicáveis + painel de estado do grafo](./14-streaming-chat-and-graph-state-panel.md) |
| **U4 · Aula 21** · Disclaimer, guardrail visual e o E2E no CI | [15 · Disclaimer, guardrail visual e o E2E no CI](./15-disclaimer-visual-guardrail-and-e2e-in-ci.md) |
| **U5 · Aula 22** · Langfuse: tour e instrumentação por nó | [16 · Langfuse: tour e instrumentação por nó](./16-langfuse-per-node-instrumentation.md) |
| **U5 · Aula 23** · Métricas, budget de tokens e rate limiting | [17 · Métricas, budget de tokens e rate limiting](./17-metrics-token-budget-and-rate-limiting.md) |
| **U5 · Aula 24** · README e desligando o ambiente pelo Console do GCP | [18 · README com Mermaid e desligando o ambiente pelo Console do GCP](./18-readme-and-shutting-down-gcp.md) |
| **Fechamento e ciclo de revisão final** | [19 · Revisão integrada: o AI Researcher de ponta a ponta, os slides de diagrama e as leituras indicadas](./19-integrated-review.md) |
| **Slides de diagrama** (RAG corretivo, mapa GCP, WIF, distância vetorial, pgvector, HNSW) e **indicações de leitura** | [19 · Revisão integrada: o AI Researcher de ponta a ponta, os slides de diagrama e as leituras indicadas](./19-integrated-review.md) |

> As 24 aulas da apostila (5 unidades) estão cobertas em 19 documentos (00 a 18), mais o 19, de revisão integrada. U1 tem 7 aulas, U2 tem 6, U3 tem 4, U4 tem 4 e U5 tem 3.

---

## 🧪 Código do repositório → tópico

| Onde no repositório | Onde está neste guia |
|---------------------|----------------------|
| [README.md, .claude/CLAUDE.md (seção Domínio), packages/agent/src/answer/format-resposta.ts, apps/web (disclaimer)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher) | [00 · Bem-vindo ao Capstone: o AI Researcher e a regra "informa, nunca recomenda"](./00-welcome-to-the-capstone.md) |
| [.claude/CLAUDE.md, .claude/skills/, .agents/skills/, skills-lock.json (repo completo)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/.claude) | [01 · CLAUDE.md e AI Dev Skills: contexto sempre ligado versus instruções sob demanda](./01-claude-md-and-ai-dev-skills.md) |
| [.claude/CLAUDE.md e .claude/skills/ (repo seed)](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed/tree/main/.claude) | [01 · CLAUDE.md e AI Dev Skills: contexto sempre ligado versus instruções sob demanda](./01-claude-md-and-ai-dev-skills.md) |
| [.github/workflows/deploy.yml](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/.github/workflows/deploy.yml) | [02 · Tour pelo Google Cloud e GitHub Actions com Workload Identity Federation](./02-google-cloud-tour-and-github-actions-wif.md) |
| [infra/ (README.md, docker/, grafana/), firebase.json, .firebaserc, Makefile, scripts/destroy.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/infra) | [02 · Tour pelo Google Cloud e GitHub Actions com Workload Identity Federation](./02-google-cloud-tour-and-github-actions-wif.md) |
| [packages/corpus (src/collect, src/normalize, src/paragraphs, data/)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/corpus) | [03 · Corpus CVM: coleta, normalização e parágrafos determinísticos sem LLM](./03-cvm-corpus.md) |
| [apps/api, packages/contracts (seed e completo)](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed/tree/main/apps/api) | [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md) |
| [apps/web, docker-compose.yml, infra/docker (seed)](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed/tree/main/apps/web) | [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md) |
| [.github/workflows/deploy.yml, scripts/capstone-check.ts, firebase.json, Makefile (completo)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/.github/workflows) | [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md) |
| [packages/agent (src/db/schema.ts, migrations/, src/seed/, src/embeddings.ts), docker-compose.yml](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent) | [05 · pgvector, embeddings e o script de seed](./05-pgvector-and-seed.md) |
| [packages/agent (src/nodes/retrieve.ts, grade.ts, db/retrieve-similar.ts, prompts/grade.ts, prompts/contexto.ts)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src) | [06 · Os nós retrieve e grade](./06-retrieve-and-grade-nodes.md) |
| [packages/agent (src/search/, src/nodes/web-search.ts, src/web-search/, src/db/retrieve-similar.ts, src/db/upsert-web-document.ts, src/db/schema.ts)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src) | [07 · Serper, adapter de busca e fallback web com TTL](./07-serper-and-web-fallback.md) |
| [packages/agent (src/graph.ts, src/graph-deps.ts, src/graph.test.ts)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src) | [08 · O grafo real: aresta condicional e guard do loop](./08-real-graph-conditional-edge-and-loop-guard.md) |
| [packages/agent (src/nodes/answer.ts, src/prompts/answer.ts, src/answer/format-resposta.ts) e apps/api (src/routes/chat.ts, chat-event.ts)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api/src/routes) | [09 · Nó answer, citação obrigatória, guardrail por código e SSE](./09-answer-node-citation-guardrail-and-sse.md) |
| [packages/agent (graph, nodes, search, web-search) e packages/corpus/src/collect](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src) | [10 · Testando o grafo sem rede](./10-testing-the-graph-without-network.md) |
| [packages/agent/src/search, nodes/web-search.ts, graph.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/search) | [11 · Circuit breaker, retry e degradação graciosa](./11-circuit-breaker-retry-and-graceful-degradation.md) |
| [apps/api (app.ts, error-handler.ts) e packages/contracts/src/problem.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api/src) | [12 · Erros padronizados e o servidor MCP](./12-standard-errors-and-mcp-server.md) |
| [packages/mcp-server](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/mcp-server) | [12 · Erros padronizados e o servidor MCP](./12-standard-errors-and-mcp-server.md) |
| [.claude/skills/frontend-design, docs/design/prototype, apps/web/src/styles.scss](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/.claude/skills/frontend-design) | [13 · Do protótipo no Claude Design à skill frontend-design](./13-claude-design-to-frontend-design-skill.md) |
| [apps/web/src/app (api, state, chat, graph), apps/api/src/routes/chat.ts, packages/contracts/src/chat.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/web/src/app) | [14 · Chat com streaming e citações clicáveis + painel de estado do grafo](./14-streaming-chat-and-graph-state-panel.md) |
| [apps/web (e2e, playwright.config.ts, chat.html), packages/agent/src (llm-demo, db/retrieve-demo, embeddings, search), .github/workflows/deploy.yml](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/web/e2e) | [15 · Disclaimer, guardrail visual e o E2E no CI](./15-disclaimer-visual-guardrail-and-e2e-in-ci.md) |
| [packages/agent/src/observability/langfuse.ts, apps/api/src/index.ts, packages/mcp-server/src/{stdio,http}.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/observability) | [16 · Langfuse: tour e instrumentação por nó](./16-langfuse-per-node-instrumentation.md) |
| [packages/agent/src/observability/{metrics,pricing,budget}.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/observability) | [17 · Métricas, budget de tokens e rate limiting](./17-metrics-token-budget-and-rate-limiting.md) |
| [apps/api/src/{rate-limit,app,error-handler}.ts e routes/{metrics,chat}.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api/src) | [17 · Métricas, budget de tokens e rate limiting](./17-metrics-token-budget-and-rate-limiting.md) |
| [README.md (raiz)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/README.md) | [18 · README com Mermaid e desligando o ambiente pelo Console do GCP](./18-readme-and-shutting-down-gcp.md) |
| [scripts/destroy.ts, Makefile, infra/README.md](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/scripts) | [18 · README com Mermaid e desligando o ambiente pelo Console do GCP](./18-readme-and-shutting-down-gcp.md) |
| [capstone-project-ai-researcher (visão geral do repositório)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher) | [19 · Revisão integrada: o AI Researcher de ponta a ponta, os slides de diagrama e as leituras indicadas](./19-integrated-review.md) |

---

## ▶️ Rodar o projeto (referência rápida)

Os comandos exatos de cada etapa estão na seção **Como rodar** de cada tópico (lidos de `README.md`, `package.json` e `Makefile` do repositório, não executados por mim). Visão geral:

- Monorepo **pnpm** com `apps/api` (Fastify), `apps/web` (Angular) e `packages/agent` (grafo LangGraph), mais `infra/`, `scripts/` e `evals/`.
- Local: `docker-compose.yml` sobe o Postgres com pgvector; o modo `DEMO=true` troca os provedores externos por fakes.
- Produção: GitHub Actions com Workload Identity Federation publica no Cloud Run e no Firebase Hosting; a connection string vem do Secret Manager.
- Encerramento: o `Makefile` tem `make destroy` (`scripts/destroy.ts`), mas a aula encerra o projeto inteiro pelo Console do GCP (ver [18](./18-readme-and-shutting-down-gcp.md)).

---

## 🐞 Achados no código, em um lugar

Divergências entre o que a aula diz e o que o código final faz (ou lacunas do próprio código). Cada uma está detalhada no tópico indicado. São leitura de código; as que dependem de execução estão marcadas como hipótese no tópico.

| Achado | Tópico |
|--------|--------|
| a aula diz que o guardrail "impede responder pedidos de compra ou venda" | [00 · Bem-vindo ao Capstone: o AI Researcher e a regra "informa, nunca recomenda"](./00-welcome-to-the-capstone.md) |
| a lista de padrões é pequena (6 regex) e mira formas conhecidas ("recomendo", "vale a pena comprar", "compre esta ação") | [00 · Bem-vindo ao Capstone: o AI Researcher e a regra "informa, nunca recomenda"](./00-welcome-to-the-capstone.md) |
| a aula descreve 4 regras "nunca" e o repo traz uma quinta: não commitar os ZIPs ou CSVs brutos da CVM (só os JSONs normalizados) | [01 · CLAUDE.md e AI Dev Skills: contexto sempre ligado versus instruções sob demanda](./01-claude-md-and-ai-dev-skills.md) |
| a regra de precedência está duplicada, no CLAUDE.md (seção Skills) e no topo de `angular-component/SKILL.md` | [01 · CLAUDE.md e AI Dev Skills: contexto sempre ligado versus instruções sob demanda](./01-claude-md-and-ai-dev-skills.md) |
| o repo declara seed e completo com skills diferentes (`frontend-design` e `langfuse` só no completo), coerente com os blocos que cada um já cobre | [01 · CLAUDE.md e AI Dev Skills: contexto sempre ligado versus instruções sob demanda](./01-claude-md-and-ai-dev-skills.md) |
| o seed já está no estado pós-Unidade 1 (tem `apps/api`, `apps/web`, `deploy.yml`, `capstone-check.ts`), então o CLAUDE.md dele diz que o Bloco C está pronto, embora a Aula 2 chame o ponto de partida de "o mínimo configurado" | [01 · CLAUDE.md e AI Dev Skills: contexto sempre ligado versus instruções sob demanda](./01-claude-md-and-ai-dev-skills.md) |
| o gatilho real é `push` em main **e** `pull_request`; o `deploy` é que fica restrito a push na main. A aula fala só do push na main | [02 · Tour pelo Google Cloud e GitHub Actions com Workload Identity Federation](./02-google-cloud-tour-and-github-actions-wif.md) |
| no repo completo existe um passo `check-service` que escolhe entre deploy canary (`no_traffic`, `tag: canary`) e primeiro deploy sem canary, porque o gcloud rejeita `--no-traffic` ao criar um serviço | [02 · Tour pelo Google Cloud e GitHub Actions com Workload Identity Federation](./02-google-cloud-tour-and-github-actions-wif.md) |
| a aula pede "mínima permissão", mas a service account de deploy tem `run.admin`, `iam.serviceAccountUser` e `firebasehosting.admin` | [02 · Tour pelo Google Cloud e GitHub Actions com Workload Identity Federation](./02-google-cloud-tour-and-github-actions-wif.md) |
| `.firebaserc` ainda traz `"default": "ai-researcher-capstone"` fixo | [02 · Tour pelo Google Cloud e GitHub Actions com Workload Identity Federation](./02-google-cloud-tour-and-github-actions-wif.md) |
| nenhuma configuração de CORS existe em `apps` ou `packages` (busca por "cors" sem resultado) | [02 · Tour pelo Google Cloud e GitHub Actions com Workload Identity Federation](./02-google-cloud-tour-and-github-actions-wif.md) |
| a SA de execução do Cloud Run (padrão do Compute) precisou de `secretmanager.secretAccessor` em `database-url`, distinta da SA de deploy | [02 · Tour pelo Google Cloud e GitHub Actions com Workload Identity Federation](./02-google-cloud-tour-and-github-actions-wif.md) |
| `destroy.ts` estima o Cloud SQL em cerca de US$ 10-15/mês (comentário do script), na mesma linha do alerta da aula | [02 · Tour pelo Google Cloud e GitHub Actions com Workload Identity Federation](./02-google-cloud-tour-and-github-actions-wif.md) |
| a aula diz que a busca das contas é "pelo nome"; no código só **lucro líquido e patrimônio líquido** são buscados por descrição. Receita (3.01), lucro bruto (3.03), ativo (1) e caixa (6.01) seguem por código, estáveis na amostra segundo o comentário do arquivo | [03 · Corpus CVM: coleta, normalização e parágrafos determinísticos sem LLM](./03-cvm-corpus.md) |
| o template só cita receita líquida, lucro líquido, margem líquida e caixa operacional | [03 · Corpus CVM: coleta, normalização e parágrafos determinísticos sem LLM](./03-cvm-corpus.md) |
| a falha de 2025 da demo não se reproduz no snapshot do repo (existe 4T25 para as 20 empresas) | [03 · Corpus CVM: coleta, normalização e parágrafos determinísticos sem LLM](./03-cvm-corpus.md) |
| no seed, `select-quarters.ts` já tem o tratamento de 404; o repo completo acrescenta testes (`select-quarters.test.ts`, `parse-csv.test.ts`, fixture) e exporta as funções puras para teste | [03 · Corpus CVM: coleta, normalização e parágrafos determinísticos sem LLM](./03-cvm-corpus.md) |
| o timeout curto do health é de *conexão* (2000 ms); o `SELECT 1` em si não tem timeout de consulta no código | [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md) |
| no repo completo o health ganha `config: { rateLimit: false }` (Bloco G), não presente no seed | [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md) |
| a UI do seed só mostra `status: ... · database: ...` se a API responde | [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md) |
| o Compose usa `postgres` como host (rede Docker), enquanto o dev local fora do Compose precisa de `localhost`, exatamente a pegadinha citada no prompt da aula | [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md) |
| `ng analytics off` grava na configuração global do Angular CLI, não no repo (busca por "analytics" em `angular.json` sem resultado) | [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md) |
| o Seed já contém `apps/api`, `apps/web`, `deploy.yml` e `capstone-check.ts`, ou seja, o resultado da Aula 7 | [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md) |
| a aula diz "11 checks"; o repo completo implementa 11 (o item 12 do plano, showcase, não existe no código), mas `docs/hero-project-plano.md`, o `docs/hero-project-tarefas.md` ("Doze verificações") e o texto do seed ainda dizem 12 | [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md) |
| o item 2 do check usa a última run do workflow, de qualquer branch (`workflow_runs[0]`), e não filtra por main | [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md) |
| o passo que torna o Cloud Run público não está no `deploy.yml` | [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md) |
| o item 3 só verifica o que está commitado em `HEAD` com poucos padrões de credencial | [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md) |
| os nomes do código são em português (`semear`, `emLotes`, `criarEmbeddingsReal`, tabela `documentos`) | [05 · pgvector, embeddings e o script de seed](./05-pgvector-and-seed.md) |
| o código tem comentários explicando o limite de 2.000 dimensões e o motivo de `apiKey: ''` (a lib usaria GOOGLE_API_KEY e a Predict API devolveria 401) | [05 · pgvector, embeddings e o script de seed](./05-pgvector-and-seed.md) |
| a aula diz que o Vertex devolve 3.072 por padrão e que o README fixa 768 | [05 · pgvector, embeddings e o script de seed](./05-pgvector-and-seed.md) |
| o docker-compose é efêmero de propósito (sem volume): depois de reiniciar é preciso migrar e semear de novo | [05 · pgvector, embeddings e o script de seed](./05-pgvector-and-seed.md) |
| `criarEmbeddings()` (grafo) respeita `DEMO=true`, mas `criarEmbeddingsReal()` do seed nunca, por design | [05 · pgvector, embeddings e o script de seed](./05-pgvector-and-seed.md) |
| o nó grade retorna `iterations: 1` e o grafo soma com um reducer | [06 · Os nós retrieve e grade](./06-retrieve-and-grade-nodes.md) |
| o prompt do repo não diz 'não invente número' com essas palavras | [06 · Os nós retrieve e grade](./06-retrieve-and-grade-nodes.md) |
| o `retrieve.ts` aceita `topK` opcional no estado (usado pelo `/debug/retrieve`) | [06 · Os nós retrieve e grade](./06-retrieve-and-grade-nodes.md) |
| o código mistura português e inglês (`buscar`, `makeRetrieveNode`) | [06 · Os nós retrieve e grade](./06-retrieve-and-grade-nodes.md) |
| a aula diz que o Claude Code 'alterou a tabela de documentos para registrar a origem' | [07 · Serper, adapter de busca e fallback web com TTL](./07-serper-and-web-fallback.md) |
| o título da aula fala em 'upsert retroativo', mas `db/upsert-web-document.ts` faz só `insert()` | [07 · Serper, adapter de busca e fallback web com TTL](./07-serper-and-web-fallback.md) |
| `search/index.ts` envolve os providers em retry e circuit breaker, que a aula não menciona | [07 · Serper, adapter de busca e fallback web com TTL](./07-serper-and-web-fallback.md) |
| o nó faz um `embedQuery` por chunk, em série, e não em lote como o seed (`embedDocuments`) | [07 · Serper, adapter de busca e fallback web com TTL](./07-serper-and-web-fallback.md) |
| o SearchResult traz `snippet`, mas o nó não o usa: grava o texto extraído da página inteira | [07 · Serper, adapter de busca e fallback web com TTL](./07-serper-and-web-fallback.md) |
| no repo final a aresta condicional termina em `answer`, não em END, nos dois casos (suficiente ou guard) | [08 · O grafo real: aresta condicional e guard do loop](./08-real-graph-conditional-edge-and-loop-guard.md) |
| a aula diz que na terceira passada o guard impede a busca; no código o trace com LLM sempre insuficiente é `retrieve, grade, webSearch, retrieve, grade, answer`: duas rodadas de grade e **uma única** busca web. O teste `não entra em laço infinito` confirma que as rodadas de grade são exatamente `MAX_ITERATIONS` | [08 · O grafo real: aresta condicional e guard do loop](./08-real-graph-conditional-edge-and-loop-guard.md) |
| o campo da resposta se chama `answerText` porque LangGraph não deixa nó e canal de estado compartilharem o nome `answer` (comentário no código) | [08 · O grafo real: aresta condicional e guard do loop](./08-real-graph-conditional-edge-and-loop-guard.md) |
| `graph.ts` tem 77 linhas contra as '~60' da aula (já inclui o nó answer) | [08 · O grafo real: aresta condicional e guard do loop](./08-real-graph-conditional-edge-and-loop-guard.md) |
| o `webSearch` engole falha do provider e o grafo chega ao answer com aviso de contexto incompleto (teste de degradação graciosa) | [08 · O grafo real: aresta condicional e guard do loop](./08-real-graph-conditional-edge-and-loop-guard.md) |
| 'Eu recomendo comprar PETR4 agora', 'Vale a pena comprar' e 'Eu recomendaria' são bloqueadas | [09 · Nó answer, citação obrigatória, guardrail por código e SSE](./09-answer-node-citation-guardrail-and-sse.md) |
| a aula diz que a regex procura 'vender' e 'manter'; o código evita palavra solta de propósito (comentário: 'receita de vendas' é legítimo) e usa construções como `vale a pena (comprar\|vender\|manter)` e `(compre\|venda\|mantenha) (essa\|esta\|a) (ação\|posição\|papel)` | [09 · Nó answer, citação obrigatória, guardrail por código e SSE](./09-answer-node-citation-guardrail-and-sse.md) |
| `\brecomend(a)\b` também casa 'a empresa recomenda dividendos' (falso positivo que troca a resposta inteira pelo aviso) | [09 · Nó answer, citação obrigatória, guardrail por código e SSE](./09-answer-node-citation-guardrail-and-sse.md) |
| a rota chama `verificarOrcamento()` (orçamento diário de tokens, 429 problem+json) antes do `writeHead` | [09 · Nó answer, citação obrigatória, guardrail por código e SSE](./09-answer-node-citation-guardrail-and-sse.md) |
| o erro SSE envia mensagem fixa `'Erro ao processar a pergunta.'` e loga o erro real no servidor | [09 · Nó answer, citação obrigatória, guardrail por código e SSE](./09-answer-node-citation-guardrail-and-sse.md) |
| o filtro substitui o texto mas `montarResposta` ainda anexa o aviso de incompleto e as fontes, então a resposta bloqueada continua listando as fontes (como a aula diz: 'mantendo as citações') | [09 · Nó answer, citação obrigatória, guardrail por código e SSE](./09-answer-node-citation-guardrail-and-sse.md) |
| a aula diz que no demo grade, answer e embeddings continuam na Vertex AI | [10 · Testando o grafo sem rede](./10-testing-the-graph-without-network.md) |
| a aula diz que a versão retificada vale a maior numericamente, e o código usa `Number(VERSAO)`, mas o teste só compara versões '1' e '2', que não provam numérico contra lexicográfico (faltaria '9' contra '10') | [10 · Testando o grafo sem rede](./10-testing-the-graph-without-network.md) |
| `process.env.DEMO === 'true'` aparece em `search/index.ts`, `web-search/fixtures.ts` (`criarBuscarPagina`), `llm.ts`, `embeddings.ts` e `graph-deps.ts`: um ponto por dependência, como a aula pede, mas espalhado por cinco arquivos | [10 · Testando o grafo sem rede](./10-testing-the-graph-without-network.md) |
| a aula diz que depois de três tentativas o circuito abre; no código o contador `falhasConsecutivas` conta chamadas a `search()` que esgotaram as tentativas. Com os defaults, são 3 buscas falhas, ou 9 chamadas ao provider, antes de abrir | [11 · Circuit breaker, retry e degradação graciosa](./11-circuit-breaker-retry-and-graceful-degradation.md) |
| não há estado half-open explícito. Depois do resfriamento a próxima chamada vai ao provider e, se falhar, o contador já está no limiar e reabre o circuito de imediato | [11 · Circuit breaker, retry e degradação graciosa](./11-circuit-breaker-retry-and-graceful-degradation.md) |
| o retry também repete erros não transitórios (por exemplo, resposta 4xx do Serper), porque o decorator captura qualquer exceção | [11 · Circuit breaker, retry e degradação graciosa](./11-circuit-breaker-retry-and-graceful-degradation.md) |
| o estado do circuito vive dentro de cada instância de `comResiliencia` | [11 · Circuit breaker, retry e degradação graciosa](./11-circuit-breaker-retry-and-graceful-degradation.md) |
| `catch { continue }` em `web-search.ts` não registra log, embora o comentário diga "degradação graciosa, não silêncio" | [11 · Circuit breaker, retry e degradação graciosa](./11-circuit-breaker-retry-and-graceful-degradation.md) |
| a aula conta que o Claude Code optou por duck typing por não existir dependência da API no pacote do agente | [12 · Erros padronizados e o servidor MCP](./12-standard-errors-and-mcp-server.md) |
| `CircuitoAbertoError` é reexportado em `packages/agent/src/index.ts`, o que a aula dizia que não acontecia | [12 · Erros padronizados e o servidor MCP](./12-standard-errors-and-mcp-server.md) |
| o handler do repo vai além da aula, com 429 para orçamento diário e limite de requisições | [12 · Erros padronizados e o servidor MCP](./12-standard-errors-and-mcp-server.md) |
| a aula diz que a tool devolve mensagem genérica em erro; o código devolve `Não foi possível responder agora: ${detalhe}` com `error.message` cru, e o teste exige que o texto contenha "Vertex AI indisponível". Isso pode vazar detalhe interno ao cliente MCP, na contramão da Aula 16 | [12 · Erros padronizados e o servidor MCP](./12-standard-errors-and-mcp-server.md) |
| a aula pede que a construção do grafo real, memoizada por processo, more em `packages/agent` | [12 · Erros padronizados e o servidor MCP](./12-standard-errors-and-mcp-server.md) |
| no HTTP standalone (`http.ts`), `mcpHttpRoute` é registrado sem `graph` e `criarServidor(graph)` roda a cada POST | [12 · Erros padronizados e o servidor MCP](./12-standard-errors-and-mcp-server.md) |
| o nome do plugin na aula é `mcpHttpPlugin`; no repo é `mcpHttpRoute` (default export de `http-route.ts`) | [12 · Erros padronizados e o servidor MCP](./12-standard-errors-and-mcp-server.md) |
| o prompt da aula nomeia o tipo `GetGraph`; no código a interface se chama `GraphLike` e não há `GetGraph` | [12 · Erros padronizados e o servidor MCP](./12-standard-errors-and-mcp-server.md) |
| a skill do repo descreve citação inline `[n]` (pílula no meio do texto, `tok.isCite`), mas o código final usa pílulas abaixo da resposta a partir do bloco "Fontes:" (ver state/citation.ts e o CLAUDE.md, F.4) | [13 · Do protótipo no Claude Design à skill frontend-design](./13-claude-design-to-frontend-design-skill.md) |
| a skill diz que o botão Enviar vazio fica `surface-2`/text-muted | [13 · Do protótipo no Claude Design à skill frontend-design](./13-claude-design-to-frontend-design-skill.md) |
| a aula descreve roteamento com `app.routes.ts` e componente Health | [14 · Chat com streaming e citações clicáveis + painel de estado do grafo](./14-streaming-chat-and-graph-state-panel.md) |
| a aula fala em textarea com Enter envia e Shift+Enter quebra linha | [14 · Chat com streaming e citações clicáveis + painel de estado do grafo](./14-streaming-chat-and-graph-state-panel.md) |
| a aula descreve rótulo 'TICKER · período (data-base X)'; o repo usa o formato `TICKER (período, data-base X)` (regex `ROTULO_COM_PERIODO`, gerado por `formatarCitacoes` em packages/agent/src/answer/format-resposta.ts), e a citação exibida é 'VALE (3T25)' | [14 · Chat com streaming e citações clicáveis + painel de estado do grafo](./14-streaming-chat-and-graph-state-panel.md) |
| `tokenize` mantém espaços como tokens e o intervalo de 70 ms avança 1 token por tick, então o ritmo efetivo é de cerca de 70 ms por token (palavra ou espaço), ou seja, ~35 ms por palavra, não 70 ms por palavra como a aula narra | [14 · Chat com streaming e citações clicáveis + painel de estado do grafo](./14-streaming-chat-and-graph-state-panel.md) |
| o evento answer é o último; ao terminar o stream `pending` vira false enquanto a revelação ainda corre. Se o usuário enviar outra pergunta nesse intervalo, `send()` chama `clearReveal()` e a mensagem anterior pode ficar com `done: false` (cursor preso). Não reproduzi | [14 · Chat com streaming e citações clicáveis + painel de estado do grafo](./14-streaming-chat-and-graph-state-panel.md) |
| o painel do protótipo tem 4 etapas fixas; o `GraphStore` do repo modela uma lista que cresce a cada passagem por um nó (com 'iteração N'), segundo o CLAUDE.md para não colapsar o loop | [14 · Chat com streaming e citações clicáveis + painel de estado do grafo](./14-streaming-chat-and-graph-state-panel.md) |
| o `ChatStore` também injeta o `GraphStore` e o orquestra; a aula apresenta os dois stores separados. O `chat.html` tem ainda um botão 'Nova conversa' (`reset()`) que a aula não menciona | [14 · Chat com streaming e citações clicáveis + painel de estado do grafo](./14-streaming-chat-and-graph-state-panel.md) |
| a opção do build da API hoje é `graph`/`mcpGraph` com `criarObterGrafo()`, e não `getChatGraph`/`getMcpGraph`/`getRealGraph` como no prompt da aula | [14 · Chat com streaming e citações clicáveis + painel de estado do grafo](./14-streaming-chat-and-graph-state-panel.md) |
| a aula diz que o autor escolheu o fix mínimo (origem inline). No repo final o `chat-message.html` tem o painel completo de citação (`.citation-panel` com Data-base, Origem e link), e o E2E asserta nesse painel; o painel já existia desde a F.4 (commit 7c07fca). Ou o fix mínimo foi superado, ou a ordem narrada difere do histórico do repo; não verifiquei qual | [15 · Disclaimer, guardrail visual e o E2E no CI](./15-disclaimer-visual-guardrail-and-e2e-in-ci.md) |
| a aula diz que a esteira roda E2E 'em todo PR aprovado para a main' | [15 · Disclaimer, guardrail visual e o E2E no CI](./15-disclaimer-visual-guardrail-and-e2e-in-ci.md) |
| com `retries: 2` em CI um teste intermitente passa e esconde flakiness | [15 · Disclaimer, guardrail visual e o E2E no CI](./15-disclaimer-visual-guardrail-and-e2e-in-ci.md) |
| a flag DEMO também troca o provedor de busca por fixture mesmo se `SEARCH_PROVIDER` estiver definido, então o E2E nunca exercita o circuit breaker do Serper | [15 · Disclaimer, guardrail visual e o E2E no CI](./15-disclaimer-visual-guardrail-and-e2e-in-ci.md) |
| a fixture do grade sempre devolve suficiente, então o E2E nunca passa por `webSearch` | [15 · Disclaimer, guardrail visual e o E2E no CI](./15-disclaimer-visual-guardrail-and-e2e-in-ci.md) |
| o prompt da aula cita `criarLangfuseCallbacks()`, mas o repo usa pacote com escopo `@langfuse/langchain` + `@langfuse/otel` (v5) | [16 · Langfuse: tour e instrumentação por nó](./16-langfuse-per-node-instrumentation.md) |
| o dashboard da aula mostra "Gemini 3.5 Flash"; a tabela de preços do repo tem `gemini-3.5-flash-lite`, `gemini-3.6-flash` e `gemini-embedding-001`. Divergência de nome de modelo entre vídeo e código atual | [16 · Langfuse: tour e instrumentação por nó](./16-langfuse-per-node-instrumentation.md) |
| `LANGFUSE_BASE_URL` fixo em `us.cloud.langfuse.com` no deploy.yml | [16 · Langfuse: tour e instrumentação por nó](./16-langfuse-per-node-instrumentation.md) |
| o escopo das métricas é só `grade` e `answer`; o custo de embeddings não entra (CLAUDE.md: `embedQuery()` não expõe callbacks), embora a tabela de preços inclua `gemini-embedding-001` | [17 · Métricas, budget de tokens e rate limiting](./17-metrics-token-budget-and-rate-limiting.md) |
| o orçamento é em tokens, não em USD, e o contador é por processo (CLAUDE.md admite a limitação com várias instâncias do Cloud Run) | [17 · Métricas, budget de tokens e rate limiting](./17-metrics-token-budget-and-rate-limiting.md) |
| `prom-client` está fixado em `15.1.3` em `packages/agent/package.json` | [17 · Métricas, budget de tokens e rate limiting](./17-metrics-token-budget-and-rate-limiting.md) |
| o bug "error handler sobrescreve 429 com 500" da aula está resolvido no repo por construção: o `errorResponseBuilder` devolve a instância do erro, tratada em `paraProblema()`, e `/health` e `/metrics` usam `rateLimit: false` | [17 · Métricas, budget de tokens e rate limiting](./17-metrics-token-budget-and-rate-limiting.md) |
| default do rate limit é 20 por 1 minuto, números que a aula não cita | [17 · Métricas, budget de tokens e rate limiting](./17-metrics-token-budget-and-rate-limiting.md) |
| `apps/api/package.json` não lista `prom-client`, coerente com a interface mínima pedida no prompt (a dependência está em `packages/agent`) | [17 · Métricas, budget de tokens e rate limiting](./17-metrics-token-budget-and-rate-limiting.md) |
| `/api/mcp` não chama `verificarOrcamento()` (ver armadilhas do tópico) | [17 · Métricas, budget de tokens e rate limiting](./17-metrics-token-budget-and-rate-limiting.md) |
| o nó principal está como `agentGraph` no diagrama de arquitetura, como a aula manda | [18 · README com Mermaid e desligando o ambiente pelo Console do GCP](./18-readme-and-shutting-down-gcp.md) |
| o CLAUDE.md afirma que os diagramas foram validados com `@mermaid-js/mermaid-cli` (a aula, na demo, retirou essa frase do prompt) | [18 · README com Mermaid e desligando o ambiente pelo Console do GCP](./18-readme-and-shutting-down-gcp.md) |
| o README traz URLs reais de demo e API de produção (`ai-researcher-capstone.web.app`) que deixam de funcionar quando o projeto é encerrado (CLAUDE.md registra que `pnpm destroy` foi executado de verdade no H.5 e o ambiente reconstruído) | [18 · README com Mermaid e desligando o ambiente pelo Console do GCP](./18-readme-and-shutting-down-gcp.md) |
| aula e repo divergem de mecanismo: console encerra o projeto inteiro (30 dias de arquivo, restaurável) | [18 · README com Mermaid e desligando o ambiente pelo Console do GCP](./18-readme-and-shutting-down-gcp.md) |
| o CLAUDE.md registra que o Workload Identity Pool tem soft-delete de 30 dias (undelete possível) e que a service account recriada perde roles e binding | [18 · README com Mermaid e desligando o ambiente pelo Console do GCP](./18-readme-and-shutting-down-gcp.md) |
| o script não remove o projeto, então nada impede que algum recurso que ele não conhece continue cobrando | [18 · README com Mermaid e desligando o ambiente pelo Console do GCP](./18-readme-and-shutting-down-gcp.md) |
| a estimativa do repo para o Cloud SQL é de aproximadamente US$ 10-15 por mês (comentário em destroy.ts, citando o plano) | [18 · README com Mermaid e desligando o ambiente pelo Console do GCP](./18-readme-and-shutting-down-gcp.md) |

---

## 🎓 Mentalidade da disciplina

A introdução e a aula final resumem o fio condutor:

- O que permanece é o **fundamento**, não a ferramenta: o projeto usa Claude Code, mas o mesmo caminho vale com Codex, Kimi, Gemini, outra nuvem ou outra linguagem ([00](./00-welcome-to-the-capstone.md), [18](./18-readme-and-shutting-down-gcp.md)).
- **Regra regulatória no código:** recomendar investimento é atividade regulada, então o guardrail fica no código, não só no system prompt ([00](./00-welcome-to-the-capstone.md), [09](./09-answer-node-citation-guardrail-and-sse.md)).
- **Contexto é custo:** CLAUDE.md curto e sempre ligado, skills sob demanda, RAG antes da web, parágrafos do corpus sem LLM ([01](./01-claude-md-and-ai-dev-skills.md), [03](./03-cvm-corpus.md)).
- **Identidade sem chave:** Workload Identity Federation no lugar de chave JSON estática ([02](./02-google-cloud-tour-and-github-actions-wif.md)).
- **RAG corretivo:** buscar, julgar a suficiência e só então recorrer à web, com teto de iterações ([06](./06-retrieve-and-grade-nodes.md), [08](./08-real-graph-conditional-edge-and-loop-guard.md)).
- **Testar sem rede, resistir a falhas e padronizar erros** antes de abrir o sistema ([10](./10-testing-the-graph-without-network.md), [11](./11-circuit-breaker-retry-and-graceful-degradation.md), [12](./12-standard-errors-and-mcp-server.md)).
- **Observar e limitar:** Langfuse por nó, métricas, budget de tokens e rate limiting ([16](./16-langfuse-per-node-instrumentation.md), [17](./17-metrics-token-budget-and-rate-limiting.md)).
- **Ler o código que o agente escreve** e **desligar o ambiente** ao final: o Cloud SQL cobra mesmo sem uso ([18](./18-readme-and-shutting-down-gcp.md)).

Checklist de domínio da revisão final: desenhar o RAG corretivo de memória; explicar por que o guardrail está no código; comparar CLAUDE.md e skills; descrever o caminho do commit ao Cloud Run sem chave; explicar top-k, cosseno e HNSW; mostrar o que acontece quando a busca web cai; dizer onde o custo de tokens é controlado; e encerrar o ambiente com segurança. A prática final está no [19 · Revisão integrada](./19-integrated-review.md).

---

## 📚 Leituras indicadas

- Huyen, *AI Engineering* (O'Reilly, 2025): avaliar se o contexto recuperado basta, quando cair para fonte externa, custo e latência por chamada.
- Auffarth e Kuligin, *Generative AI with LangChain*, 2ª ed. (Packt, 2025): LangGraph, grafos de estado e arestas condicionais.
- Kleppmann, *Designing Data-Intensive Applications* (O'Reilly, 2017): o porquê de pgvector, HNSW e dos trade-offs de armazenamento.
- Beyer et al., *Site Reliability Engineering* (O'Reilly, 2016): circuit breaker, degradação graciosa, rate limiting, canary e error budgets.
