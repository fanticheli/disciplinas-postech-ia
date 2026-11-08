# 15 · Disclaimer, guardrail visual e o E2E no CI

> **Unidade 4 · Aula 21** · Leitura: ~9 min · Bloco: Unidade 4 · Frontend

## 🎯 Em uma frase
O **disclaimer** é uma faixa sempre visível (sem @if, sem fechar, sem modal) que complementa o guardrail do backend. Para testar de ponta a ponta sem gastar Serper e Vertex AI, **DEMO=true** vira mock do grafo inteiro, e um **script Playwright** (criado pelo agente, executado na esteira) valida disclaimer, streaming, citação e painel do grafo.

---

## 👵 Explicando para a vovó

O disclaimer é a placa "informativo, não é recomendação" na porta de uma consultoria: fica fixa, sem botão de fechar, por diretriz da CVM, para que o cliente a veja sempre. O guardrail do backend é o segurança lá dentro; a placa só deixa a regra clara para quem chega.

O E2E com mocks é um ensaio geral com figurantes: o palco, a luz e o roteiro são reais, mas os atores caros (Vertex AI e Serper) são substituídos por dublês que sempre dizem a mesma fala. Barato e repetível, mas não prova que os atores reais estão em forma.

---

## 🔧 Tecnicamente

### O que é
- **Disclaimer fixo:** faixa entre header e lista de mensagens, renderizada incondicionalmente, sem `@if`, sem botão de fechar, sem modal. Texto: 'Este assistente apresenta informações públicas, não recomendação de investimento.' Respeita a diretriz da CVM.
- **Não substitui o backend:** a validação continua no guardrail do backend; o aviso torna a regra clara ao usuário. Nem toda obrigação precisa de muita engenharia.
- **Agente vs framework E2E:** agente operando o navegador é bem mais caro (tokens a cada execução) e mais lento; Playwright só consome máquina, é determinístico e roda quantas vezes quiser. Agente serve no desenvolvimento local; script serve na esteira.
- **Caminho adotado:** o Claude Code escreve o script e o Playwright o executa na esteira. Saber Cypress ou Playwright continua necessário.
- **Modo demo estendido (flag criada na Aula 14 só para o Serper):** embeddings devolvem vetor de zeros, busca devolve sempre o mesmo documento real da Vale 3T25 congelado do corpus, grade sempre considera suficiente, answer devolve resposta fixa.
- **Seed fora do demo:** o `embedDocuments()` em lote, usado só pelo seed real, é isolado em `criarEmbeddingsReal()`; o seed nunca roda em modo demo. Tudo só vale com `DEMO` igual a `true`. Depois da refatoração, a aula cita 82 testes unitários.
- **Trade-offs de mocks:** podem maquiar problemas do backend; escolha por custo e rapidez. Alternativas: flags mais finas (uma só para o Serper, outra só para a Vertex AI) ou sem mocks (o teste quebra por razão alheia, como o Serper fora do ar).
- **Teste E2E:** `apps/web/e2e/chat-happy-path.spec.ts`; sobe API com DEMO=true e `ng serve` via `webServer`; verifica disclaimer, pergunta sobre a receita líquida da Vale no 3T25, resposta com 'R$ 56,7 bilhões', clique na citação (data-base 2025-09-30, origem 'Base local (CVM)', link do ZIP da CVM) e painel com 3 etapas sem Search.
- **Playwright roda em background:** ao contrário do Claude no Chrome, não abre o navegador na tela. BDD (Cucumber) pode gerar o teste Playwright.
- **Inconsistência achada pelo agente:** o teste exigia a origem após clicar na citação, mas o template só renderizava link e período; a skill de frontend já documentava um painel de detalhes (tabela chave e valor). Opções: painel completo (mais trabalho, fecha com o design) ou fix mínimo (origem inline). O autor escolheu o fix mínimo.

### Como funciona
- Prompt do disclaimer: faixa fixa em Chat entre header e lista, renderizada incondicionalmente, com o texto exato.
- Prompt do demo: estender `DEMO=true` ao grafo: `criarEmbeddings()` com zeros em demo, `criarBuscarDemo()`, `criarGradeLlmDemo()`, `criarAnswerLlmDemo()`, e `criarEmbeddingsReal()` separado para o seed.
- Prompt do E2E: criar `apps/web/e2e/chat-happy-path.spec.ts` com `webServer` no `playwright.config.ts` subindo `apps/api` com DEMO=true e `apps/web` com ng serve; descrever os 5 passos do teste; executar no final.
- O Claude Code instala o Chromium e configura o Playwright; o teste roda em background.
- Na esteira (GitHub Actions): `pnpm build`, `pnpm test`, `pnpm lint`, instalar Chromium com `playwright install --with-deps chromium` e `pnpm test:e2e`; o deploy só roda depois (`needs: test`).
- Ao criar o teste o agente parou e perguntou sobre a origem da citação; decisão humana sobre escopo (fix mínimo) antes de seguir.
- Decida a flag: uma única DEMO barata e simples, ou flags por dependência quando o risco for crítico.

### Onde aplicar
- Aplicações reguladas: aviso persistente de escopo (informa, não recomenda) além da validação no backend.
- CI de front com backend real e dependências pagas mockadas por flag.
- Decidir entre agente no navegador (dev local) e script Playwright (CI).
- Gerar testes E2E a partir de regras de negócio escritas em BDD.

### Vantagens e limites
**Vantagens**
- E2E barato e rápido: zero token, só máquina.
- Determinístico: mesma resposta, mesma citação, mesmo painel a cada execução.
- Roda sem credenciais GCP nem Postgres no runner.
- O teste pegou uma inconsistência entre interface e design documentado.

**Limites**
- Mocks podem esconder problemas do backend real (embeddings, similaridade, LLM).
- Resposta e documento fixos: não testam o fallback de busca web (coberto em teste unitário do grafo).
- Flag DEMO é global: não isola só o Serper ou só a Vertex AI.
- Manter o seed fora do modo demo exige disciplina (função separada).

### 🚫 Armadilhas
- Colocar o disclaimer atrás de @if, botão de fechar ou modal: deixa de ser sempre visível.
- Rodar agente operando navegador a cada PR: gasta muitos tokens e demora.
- Deixar o seed rodar em modo demo: semearia o banco com vetores zerados.
- Achar que o E2E com mocks prova o backend: ele prova a integração front, SSE e grafo.
- Teste exigir algo que a interface não renderiza (origem da citação) sem alinhar com o design.

> 💡 Mantenha pelo menos um teste (mesmo manual, em ambiente real) sem DEMO para o caminho real; o E2E com mocks cobre regressão de interface, não a qualidade do RAG.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Disclaimer | Faixa fixa com aviso de que o sistema informa e não recomenda. |
| Guardrail | Validação no backend que impede recomendação de investimento; o disclaimer só o complementa. |
| DEMO=true | Variável que troca embeddings, busca, grade, answer e Serper por fixtures. |
| Fixture | Dado congelado do corpus (aqui, Vale 3T25) devolvido sempre igual. |
| Playwright | Framework E2E que executa script determinístico em navegador headless. |
| webServer | Bloco do playwright.config.ts que sobe os processos reais antes dos testes. |
| Caminho feliz | Teste da jornada principal sem falhas nem fallback. |
| E2E | Teste de ponta a ponta: front, API e grafo juntos. |
| BDD | Behavior-Driven Development, regras em Gherkin/Cucumber. |
| Flags finas | Uma flag por dependência (só Serper, só Vertex AI). |

---

## 💻 No código do repo

**Projeto:** [apps/web (e2e, playwright.config.ts, chat.html), packages/agent/src (llm-demo, db/retrieve-demo, embeddings, search), .github/workflows/deploy.yml](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/web/e2e)

Li o spec E2E, o playwright.config.ts, o chat.html, os arquivos de demo do agente e o job test do deploy.yml. Não executei o Playwright nem a contagem de 82 testes. A pasta evals/ do repo (dataset.json) não faz parte desta aula.

**Fluxo**
1. `apps/web/src/app/chat/chat.html`: `div.chat__disclaimer` entre o header e o `.chat__body`, sem condicional, com o texto da aula.
2. `packages/agent/src/embeddings.ts`: `criarEmbeddings()` devolve `criarEmbeddingsDemo()` (768 zeros, `EMBEDDING_DIMENSIONS`) quando `DEMO === 'true'`; `criarEmbeddingsReal()` usa Vertex AI e é o que o seed usa.
3. `packages/agent/src/db/retrieve-demo.ts`: `criarBuscarDemo()` devolve sempre um documento VALE 3T25 (`periodEnd 2025-09-30`, URL do ZIP ITR 2025 da CVM), ignorando o embedding.
4. `packages/agent/src/llm-demo.ts`: `criarGradeLlmDemo()` (sufficient true) e `criarAnswerLlmDemo()` (resposta fixa com R$ 56,7 bilhões).
5. `packages/agent/src/graph-deps.ts` e `llm.ts`: escolhem demo ou real via `process.env.DEMO`; `search/index.ts` dá prioridade a DEMO sobre `SEARCH_PROVIDER` e usa `criarSearchProviderFixture()`.
6. `apps/web/playwright.config.ts`: só projeto chromium, `retries: 2` e `workers: 1` em CI, `webServer` com API (`DEMO=true PORT=3000`, healthcheck em `/api/health`, timeout 30 s) e web (porta 4200, timeout 60 s), `reuseExistingServer` fora do CI.
7. `apps/web/e2e/chat-happy-path.spec.ts`: um teste; confere título, disclaimer, bolha do usuário, resposta com 'R$ 56,7 bilhões' (timeout 15 s), cursor sumindo, pílula 'VALE (3T25)', painel com 2025-09-30, 'Base local (CVM)' e href do ZIP, 3 `.step` e nenhum 'Em execução'.
8. `.github/workflows/deploy.yml`, job `test`: checkout, pnpm, Node 24, `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm test`, `pnpm lint`, instalar Chromium, `pnpm test:e2e`; job `deploy` tem `needs: test` e só roda em push na main.

**Como rodar**
- `pnpm install` e `pnpm build` (a API é iniciada com `node dist/index.js`, precisa do build)
- `pnpm --filter @hero/web exec playwright install --with-deps chromium`
- `pnpm test:e2e` (equivale a `pnpm --filter @hero/web run e2e`); não executei

**Armadilhas e achados no código**
- Achado: a aula diz que o autor escolheu o fix mínimo (origem inline). No repo final o `chat-message.html` tem o painel completo de citação (`.citation-panel` com Data-base, Origem e link), e o E2E asserta nesse painel; o painel já existia desde a F.4 (commit 7c07fca). Ou o fix mínimo foi superado, ou a ordem narrada difere do histórico do repo; não verifiquei qual.
- Achado: a aula diz que a esteira roda E2E 'em todo PR aprovado para a main'; o workflow dispara em `push` na main e em qualquer `pull_request`, e o job test (com E2E) roda nos dois casos; o deploy é o que fica restrito a push na main.
- Achado: com `retries: 2` em CI um teste intermitente passa e esconde flakiness; `trace: 'on-first-retry'` ajuda a investigar.
- Achado: a flag DEMO também troca o provedor de busca por fixture mesmo se `SEARCH_PROVIDER` estiver definido, então o E2E nunca exercita o circuit breaker do Serper.
- Achado: a fixture do grade sempre devolve suficiente, então o E2E nunca passa por `webSearch`; o fallback fica coberto só por teste unitário (`graph.test.ts`) e pelo fake lá usado.
- Contagem de 82 testes unitários da aula: não verifiquei (só contei 38 blocos `it(` em apps/web).

---

## 🔗 Para ir além
- [Projeto completo (capstone)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main)
- [Teste E2E](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/web/e2e)
- [Workflow de CI](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/.github/workflows)
- [Modo demo (packages/agent/src)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src)
- [Ponto de partida (seed)](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed)

---

⬅️ [14 · Chat com streaming e citações clicáveis + painel de estado do grafo](./14-streaming-chat-and-graph-state-panel.md)  ·  [16 · Langfuse: tour e instrumentação por nó](./16-langfuse-per-node-instrumentation.md) ➡️
