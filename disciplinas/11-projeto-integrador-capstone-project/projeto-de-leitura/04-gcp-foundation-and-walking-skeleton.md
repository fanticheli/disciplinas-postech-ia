# 04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero

> **Unidade 1 · Aulas 6 e 7** · Leitura: ~14 min · Bloco: Unidade 1 · Ideação, setup e deploy inicial

## 🎯 Em uma frase
A fundação (projeto, APIs, Artifact Registry, Cloud SQL, Secret Manager, WIF, Firebase) é criada por **prompts ao Claude Code** que leem o `infra/README.md` e rodam o `gcloud` com aprovação. Em seguida o **walking skeleton** sobe em produção; o primeiro deploy costuma falhar porque o **Cloud Run nasce privado**, e o `capstone:check` valida de fora.

---

## 👵 Explicando para a vovó

Montar a fundação é como preparar um restaurante antes de abrir: alvará (projeto e conta de faturamento), ligar a água e a luz só do que vai usar (APIs), comprar a geladeira que demora a chegar (o banco, 20 a 30 minutos), guardar as chaves num cofre (Secret Manager) e cadastrar quem pode entregar mercadoria (Workload Identity).

O walking skeleton é abrir a porta com o cardápio de uma linha só: o prato é um "estou vivo" (health check), mas já atende cliente de verdade. E a primeira vez a porta da rua está trancada por segurança (Cloud Run privado): o cardápio existe, mas ninguém de fora entra até você destrancar de propósito.

---

## 🔧 Tecnicamente

### O que é
- **Aula 6**: provisiona a fundação com prompts ao Claude Code. O agente propõe e executa um comando por vez e você aprova cada um. O mesmo caminho serve a AWS ou Azure (CLI diferente). O SDK/CLI é parte do que se chama **IaC**.
- Conceitos: uma **conta de faturamento** pode ter N **projetos**, cada um com infraestrutura isolada; projeto novo nasce sem nenhuma API habilitada (**mínima permissão**), então o primeiro prompt habilita só as que serão usadas.
- Pré-requisito: instalar o `gcloud` e fazer **dois logins** (CLI e SDK/ADC); o Cloud SQL leva de 20 a 30 minutos, o resto é rápido.
- Os 7 prompts: (1) projeto `ai-researcher-capstone`, billing e APIs (Cloud Run, Cloud SQL Admin, Artifact Registry, Secret Manager, IAM Credentials); (2) repositório Docker no Artifact Registry em `us-central1`; (3) Cloud SQL Postgres 16 com pgvector, instância `ai-researcher-db`, tier `db-f1-micro`, banco `ai_researcher`, extensão `vector`, usuário `app_user` com senha gerada; (4) `database-url` no Secret Manager em formato de socket Unix, sem arquivo local; (5) Workload Identity Federation; (6) variáveis; (7) Firebase Hosting.
- Prompt 5 cria pool, provider restrito por `attribute.repository`, service account `github-actions-deployer` com as roles do README e o binding de impersonação. **Troque o repositório pelo seu** (fork ou repo próprio), ou o deploy falha.
- Prompt 6 tira identificadores do código: `GOOGLE_CLOUD_PROJECT_ID` no `~/.zshrc` e variáveis de repo `GCP_PROJECT_ID`, `GCP_WIF_PROVIDER`, `GCP_DEPLOY_SERVICE_ACCOUNT`. Não são sensíveis; existem porque cada aluno tem o seu projeto.
- Custo: ~R$ 50/mês com tudo online; só **Cloud SQL** e **Vertex AI** cobram de fato. O Cloud Run fica de fora da lista de propósito: nasce no primeiro deploy. A imagem Docker é escolhida (em vez de subir código) para simular o backend localmente.
- Segurança de secrets: nunca senha fixa (use aleatória, que ninguém precisa conhecer), nunca versionar. Se vazar no GitHub, **invalide e crie outro**; apagar não adianta (fica no `git log`) e rebase não é o caminho seguro. Cuidado com o que o agente imprime ao mexer em variáveis.
- **Aula 7**: dois repos. O Capstone tem o projeto completo, todas as tags e a branch starter (refazer ali causa conflito de merge porque a esteira já existe). O **Seed** tem só o estado da starter como `main`. Licença MIT; dá para trocar GCP por AWS ou Angular por React.
- Walking skeleton: API Fastify com `GET /api/health`, contrato Zod compartilhado em `packages/contracts` (`status: ok|degraded`, `database: ok|error`), app Angular 22 (standalone, signals, `resource()`) criado pela skill oficial `angular-new-app`, e Docker Compose com Postgres/pgvector.
- O health faz `SELECT 1` com timeout curto e nunca derruba o processo: banco fora do ar vira `degraded`. O prompt pede `.env` na raiz (gitignorado) com `DATABASE_URL` para localhost (não o nome do serviço do Compose), `.env.example` versionado e o script dev carregando o .env sem afetar produção.
- `ng analytics off` evita que o Angular CLI espere uma resposta interativa dentro do `pnpm dev`/turbo e trave a tela. `!pnpm dev` roda comando no shell sem sair da sessão do agente.
- `turbo prune --docker` separa o que pertence a cada projeto do monorepo para imagens eficientes. O Postgres do Compose é efêmero e **nunca é o Cloud SQL**.
- Workflow `deploy.yml`: job `test` (build, teste, lint) em todo PR; job `deploy` só em push na main e só após o teste, com WIF, imagem para o Artifact Registry, Cloud Run com acesso ao Cloud SQL e ao secret, build do Angular e Firebase Hosting. Instala pelo lockfile congelado.
- Primeiro deploy: o Cloud Run nasce **privado** e o Firebase não alcança a API (403), por isso a página pode mostrar `degraded` e `error`. Correção: `allUsers` com `roles/run.invoker`, após confirmar o risco; aceitável porque o `/api/health` não tem custo de LLM. Proteção contra abuso fica para a Aula 23.
- `capstone:check`: confere de fora requisitos não funcionais contra uma URL. Terá 11 checks; os três primeiros: endpoint público válido, deploy automatizado ok, segredos protegidos. Ao fim da unidade, crie a tag `v1`.

### Como funciona
- Instale `gcloud`, rode os dois logins e abra o Claude Code no repo; cada prompt manda ler `infra/README.md` e rodar **um comando por vez com aprovação**.
- Prompt 1 (resumo): "Seguindo o infra/README.md, crie o projeto GCP ai-researcher-capstone, vincule à billing account e habilite as APIs necessárias... Rode um comando por vez e espere minha aprovação".
- Prompt 4: monte a connection string do `app_user` em socket Unix (`?host=/cloudsql/...`) e grave como `database-url` sem escrever em arquivo. Se o secret já existir, o agente avisa que a senha antiga vale até o código reler o novo e pergunta se reseta.
- Prompt 7: o Firebase tem CLI próprio; o agente roda com `npx` (cerca de 5 minutos). Depois confira no console: Cloud SQL, projeto com billing, secret `database-url`, registry e Firebase.
- Local: `docker compose up -d` para o Postgres, `pnpm install`, `pnpm dev` (API na 3000, Angular com proxy de `/api` para `localhost:3000`, sem CORS).
- Reproduza do Seed: configure as 3 variáveis do GitHub, troque o project id no `.firebaserc`, faça commit e push na main e acompanhe a esteira no GitHub Actions.
- Se aparecer `degraded`: leia o log do Cloud Run e a resposta HTTP; 403 indica serviço privado, e o README também registra que a service account de execução precisa de `secretmanager.secretAccessor` em `database-url`.
- Libere o health publicamente (comando do README): `gcloud run services add-iam-policy-binding ai-researcher-api --region=us-central1 --member=allUsers --role=roles/run.invoker`.
- Valide: `pnpm capstone:check --url <url>` e depois `git tag v1 && git push --tags`.

### Onde aplicar
- Provisionamento assistido por agente em qualquer nuvem, com aprovação comando a comando e um README de infra como fonte de verdade.
- Primeiro deploy de qualquer serviço: um health check que testa o banco de verdade e degrada sem derrubar o processo.
- Monorepos com Docker: `turbo prune --docker` para imagens menores e cache melhor.
- Auditoria externa de requisitos não funcionais: um script que bate na URL de produção e confere endpoint, deploy e vazamento de credencial.

### Vantagens e limites
**Vantagens**
- Walking skeleton em produção cedo prova a esteira, a rede e os secrets antes de existir lógica de negócio.
- Aprovar comando a comando mantém o humano no controle e vira aprendizado.
- Contrato Zod compartilhado dá a API e ao frontend o mesmo schema em runtime e em tipos.
- Instalar pelo lockfile garante que nada foi atualizado sem teste.

**Limites**
- Provisionar à mão por prompts não é reproduzível como IaC: o repo documenta, mas não versiona Terraform.
- O Cloud SQL leva 20 a 30 minutos e cobra mesmo sem uso.
- Tornar o Cloud Run público exige avaliar risco; só é seguro porque o endpoint ainda não custa LLM.
- Agente operando o terminal pode exibir variáveis sensíveis na tela.

### 🚫 Armadilhas
- Deixar o repositório do curso no prompt do WIF: você não é dono, a federação não autentica e o deploy falha.
- Esperar o primeiro deploy verde: Cloud Run privado (403) e permissões de runtime são o caminho comum.
- Colocar secret em arquivo, mesmo "temporário"; vazou, invalide, não apague.
- Liberar `allUsers` em serviço que depois ganha custo de LLM sem rate limit.
- Achado: o prompt da aula manda criar `.env.example` e carregar o `.env` no script dev, mas o repo (seed e completo) não tem `.env.example` versionado e o `dev` da API é só `tsx watch src/index.ts`; `DATABASE_URL` precisa vir do ambiente.

> 💡 Depois de cada prompt de provisionamento, peça ao agente o comando de leitura que prova o resultado (`gcloud ... describe`) e cole a saída no README; sem prova, trate como não verificado.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Billing account | Conta de faturamento; pode ter vários projetos isolados. |
| Mínima permissão | Projeto novo nasce sem APIs habilitadas; habilite só o necessário. |
| ADC / dois logins | Login do CLI e login das bibliotecas (SDK) no gcloud. |
| Socket Unix do Cloud SQL | Formato da connection string no Cloud Run: ?host=/cloudsql/... |
| Walking skeleton | Esqueleto mínimo ponta a ponta já implantado. |
| Health check | GET /api/health com SELECT 1 no Postgres; reporta degraded sem derrubar. |
| turbo prune --docker | Isola o subgrafo de um app do monorepo para o build da imagem. |
| Lockfile congelado | pnpm install --frozen-lockfile: instala exatamente o que foi testado. |
| roles/run.invoker | Papel que, dado a allUsers, torna o Cloud Run público. |
| capstone:check | Script que audita de fora os requisitos não funcionais; 11 checks no repo completo. |
| Tag v1 | Marco do fim da Unidade 1, ao concluir o deploy zero. |

---

## 💻 No código do repo

**Projeto:** [apps/api, packages/contracts (seed e completo)](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed/tree/main/apps/api)

Li o API e o contrato do seed (estado da aula) e comparei com o completo por diff. Não rodei testes nem servidor.

**Fluxo**
1. `apps/api/src/index.ts`: `build()` e `listen({ port: Number(process.env.PORT ?? 3000), host: '0.0.0.0' })`; erro no listen vira log e `process.exit(1)`.
2. `apps/api/src/app.ts`: `Fastify({ logger: true })`, registra o plugin de health sob o prefixo `/api` e aceita `checkDatabase` injetável (facilita teste).
3. `apps/api/src/db.ts`: `Pool` do `pg` com `connectionTimeoutMillis: 2000`, listener `pool.on('error')` (sem ele o Node derruba o processo) e `checkDatabase()` com `SELECT 1` que devolve `false` em exceção.
4. `apps/api/src/routes/health.ts`: `GET /health` responde `healthResponseSchema.parse({ status, database })`; **HTTP 200 mesmo em degraded**.
5. `packages/contracts/src/health.ts`: `z.object({ status: z.enum(['ok','degraded']), database: z.enum(['ok','error']) })` (zod 4.4.3) e tipo `HealthResponse`; teste rejeita `status: 'up'`.
6. `apps/api/src/app.test.ts`: 2 testes com `app.inject()` (banco ok e banco falhando).
7. `apps/api/package.json`: scripts `dev` (`tsx watch src/index.ts`), `build`, `start`, `test`; dependências `fastify 5.11.2` e `pg 8.22.0`.

**Como rodar**
- `docker compose up -d postgres` e `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_researcher pnpm --filter @hero/api dev` (URL do docker-compose.yml; não executei)
- `curl localhost:3000/api/health` deve devolver `{"status":"ok","database":"ok"}`
- `pnpm test` (Turborepo; `test` depende de `build`)

**Armadilhas e achados no código**
- Achado: o timeout curto do health é de *conexão* (2000 ms); o `SELECT 1` em si não tem timeout de consulta no código.
- Achado: no repo completo o health ganha `config: { rateLimit: false }` (Bloco G), não presente no seed.
- Achado: a UI do seed só mostra `status: ... · database: ...` se a API responde; em erro HTTP (como o 403 do Cloud Run privado) o texto é "Não foi possível consultar /api/health.", não `degraded`/`error` como a aula descreve. `degraded` aparece quando a API responde 200 mas o banco falha (ex.: falta de permissão no secret).

**Projeto:** [apps/web, docker-compose.yml, infra/docker (seed)](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed/tree/main/apps/web)

Li o app Angular mínimo, o proxy, o Compose e os Dockerfiles do seed. Não subi o Compose nem o ng serve.

**Fluxo**
1. `apps/web/src/app/api/health.service.ts`: `HttpClient.get<HealthResponse>('/api/health')` com `firstValueFrom`; tipa com o contrato de `@hero/contracts`.
2. `apps/web/src/app/app.ts`: `resource({ loader: () => healthService.fetchHealth() })`; `app.html` usa `@if (health.isLoading())`, `health.error()` e `health.value()`.
3. `apps/web/proxy.conf.json`: `/api` para `http://localhost:3000`; `dev` é `ng serve --proxy-config proxy.conf.json`. Dependências `@angular/*` `^22.0.0`.
4. `docker-compose.yml`: `pgvector/pgvector:pg16` (sem volume, efêmero, healthcheck `pg_isready`), `api` na 3000 com `DATABASE_URL=postgresql://postgres:postgres@postgres:5432/ai_researcher` e `web` na 8080.
5. `infra/docker/api.Dockerfile`: multi-stage com `turbo prune @hero/api --docker`, `pnpm install --frozen-lockfile`, usuário não-root e `CMD ["node","apps/api/dist/index.js"]`.
6. `infra/docker/web.Dockerfile` + `nginx.conf`: serve o build e repassa `/api/` para `http://api:3000/api/`.

**Como rodar**
- `docker compose up --build` (web em http://localhost:8080; não executei)
- `pnpm dev` (turbo roda api e web em watch)

**Armadilhas e achados no código**
- Achado: o Compose usa `postgres` como host (rede Docker), enquanto o dev local fora do Compose precisa de `localhost`, exatamente a pegadinha citada no prompt da aula.
- Achado: `ng analytics off` grava na configuração global do Angular CLI, não no repo (busca por "analytics" em `angular.json` sem resultado); cada máquina precisa rodar.
- Achado: o Seed já contém `apps/api`, `apps/web`, `deploy.yml` e `capstone-check.ts`, ou seja, o resultado da Aula 7; reproduzir os prompts ali significa refazer ou conferir arquivos existentes.

**Projeto:** [.github/workflows/deploy.yml, scripts/capstone-check.ts, firebase.json, Makefile (completo)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/.github/workflows)

Li o workflow e o capstone-check do seed (3 checks) e do completo (11), o firebase.json e o Makefile. Não executei a esteira nem o check.

**Fluxo**
1. `.github/workflows/deploy.yml` (seed): gatilhos `push` em main e `pull_request`; job `test` e job `deploy` com WIF, build/push da imagem por `${{ github.sha }}`, `deploy-cloudrun@v3` com `secrets: DATABASE_URL=database-url:latest`, build Angular via `pnpm turbo run build --filter=@hero/web` e `firebase-tools deploy --only hosting`.
2. `scripts/capstone-check.ts` (seed): item 1 faz `fetch` de `/api/health` e exige `resposta.ok` e HTTPS; item 2 consulta o último run de `deploy.yml` por `gh api`; item 3 varre `git ls-files` em busca de `.env` e padrões de chave privada, `AKIA...` e `AIza...`.
3. Saída: relatório com `SCORE: n/3 e a mensagem de que os itens 4 a 12 chegam nos próximos blocos`; `process.exitCode` 0 só se todos passam.
4. `scripts/capstone-check.ts` (completo): 11 itens numerados 1 a 11 (inclui testes no CI, degradação graciosa, traces, rate limit, rollback, custo, guardrail e README); `main` ordena por número no relatório.
5. `firebase.json`: rewrite `/api/**` para o Cloud Run e `**` para `/index.html`.
6. `Makefile` (só no completo): um alvo `destroy` que chama `pnpm destroy`.
7. Tag `v1` no repo completo aponta para o commit "Libera acesso público ao Cloud Run e confirma capstone:check 3/3" (18 commits no histórico até ali); o seed não tem tags.

**Como rodar**
- `pnpm capstone:check --url https://<sua-url>` (precisa do `gh` autenticado para o item 2; não executei)
- `gh variable set GCP_PROJECT_ID --body <id>`, `GCP_WIF_PROVIDER`, `GCP_DEPLOY_SERVICE_ACCOUNT`
- `gh run list --workflow=deploy.yml`

**Armadilhas e achados no código**
- Achado: a aula diz "11 checks"; o repo completo implementa 11 (o item 12 do plano, showcase, não existe no código), mas `docs/hero-project-plano.md`, o `docs/hero-project-tarefas.md` ("Doze verificações") e o texto do seed ainda dizem 12.
- Achado: o item 2 do check usa a última run do workflow, de qualquer branch (`workflow_runs[0]`), e não filtra por main.
- Achado: o passo que torna o Cloud Run público não está no `deploy.yml`; foi manual (gcloud), registrado no README com data de 2026-08-08.
- Achado: o item 3 só verifica o que está commitado em `HEAD` com poucos padrões de credencial; não varre o histórico do git, então um vazamento antigo não é detectado (por isso a aula insiste em invalidar).

---

## 🔗 Para ir além
- [Capstone Project AI Researcher](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)
- [AI Researcher Seed](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed)
- [apps/api](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api)
- [apps/web](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/web)
- [scripts/capstone-check.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/scripts/capstone-check.ts)
- [infra/README.md](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/infra/README.md)

---

⬅️ [03 · Corpus CVM: coleta, normalização e parágrafos determinísticos sem LLM](./03-cvm-corpus.md)  ·  [05 · pgvector, embeddings e o script de seed](./05-pgvector-and-seed.md) ➡️
