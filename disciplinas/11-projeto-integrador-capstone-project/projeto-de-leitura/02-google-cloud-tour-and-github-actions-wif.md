# 02 · Tour pelo Google Cloud e GitHub Actions com Workload Identity Federation

> **Unidade 1 · Aulas 3 e 4** · Leitura: ~11 min · Bloco: Unidade 1 · Ideação, setup e deploy inicial

## 🎯 Em uma frase
A arquitetura usa **Cloud Run** (API serverless), **Firebase Hosting** (Angular + rewrite de `/api`), **Artifact Registry**, **Cloud SQL com pgvector**, **Vertex AI** e **Secret Manager**, tudo disparado por **GitHub Actions**. A esteira autentica por **Workload Identity Federation**: token OIDC curto, service account impersonada, nada guardado.

---

## 👵 Explicando para a vovó

Imagine um prédio com portaria. O jeito antigo de dar acesso ao entregador é copiar uma chave mestra e deixá-la numa gaveta (o JSON no secret): se alguém arromba a gaveta, a chave serve para sempre.

O jeito novo é a portaria conhecer o entregador: ele mostra um crachá de curtíssima duração, emitido na hora pela transportadora e só aceito se vier da transportadora certa. Na portaria, ele recebe um uniforme temporário de "entregador do prédio" e, ao terminar, tudo é descartado. Não sobra chave para roubar.

---

## 🔧 Tecnicamente

### O que é
- **GitHub Actions**: a esteira de DevOps; toda ação na infra é disparada por ela. Passa pelos quality gates e, no fim, faz deploy no Google Cloud.
- **Cloud Run**: onde roda a regra de negócio, a API Fastify em Node. Serverless: o GCP sobe containers sob demanda e não há servidor ligado sem requisição. Equivalente: Lambda (AWS) e serviço serverless da Azure. Cobrado por requisição (valor por GB de memória por segundo com muitos zeros).
- **Firebase Hosting**: serve o Angular e estáticos, com DNS. Equivalentes: bucket S3 exposto (AWS), Blob Storage (Azure). A regra de **rewrite** manda tudo que começa com `/api` para o Cloud Run e o resto para o Angular, dispensando CORS no backend e no frontend.
- **Artifact Registry**: guarda e versiona a imagem Docker do backend; quem executa é o Cloud Run. A mesma imagem roda local em desenvolvimento.
- **Cloud SQL (Postgres) + pgvector**: menor instância possível, 10 GB. A extensão transforma o Postgres em banco vetorial com busca semântica via SQL. Quem já roda Postgres e precisa de RAG pode reaproveitar o banco e o conhecimento do time.
- **Vertex AI**: serviço de modelos (Model Garden: Gemini Flash, Flash-Lite, Pro, Gemma, parceiros como Anthropic, abertos como Kimi, Llama e Hugging Face). No projeto faz o embedding do RAG e é a LLM do agente. Equivalente: Bedrock (AWS).
- **Secret Manager**: cofre das chaves do banco e dos serviços externos (Langfuse, exportador OpenTelemetry para o Grafana, Serper). Em ambiente local, variáveis de ambiente.
- Custos citados: ~R$ 30 em mais de um mês (aula 3) e ~R$ 50/mês com tudo online (aula 6); o **Cloud SQL cobra mesmo sem uso** (10 GB reservados), por isso a infra deve ser desmontada ao fim. Conta nova ganha ~US$ 300 de crédito.
- **Duas formas de dar acesso da esteira à nuvem**: (a) chave de service account em JSON guardada em secret do GitHub, com permissões mínimas, mas estática e usável por quem comprometer o repo; (b) **Workload Identity Federation (WIF)** com workload identity pool, adotada no projeto.
- Anatomia de um workflow YAML: nome, `on` (gatilho: push, PR, issue, fork), `jobs` (no projeto: teste e deploy), máquina por job (`ubuntu-latest`, container descartado a cada run; Windows e Mac normalmente pagos) e `steps` (comandos ou actions prontas, como `checkout`).

### Como funciona
- Fluxo WIF em 4 passos (aula): (1) o runner pede ao GitHub um **token OIDC** de curtíssima duração, novo a cada execução; (2) com ele faz login no GCP, que confirma que o chamador é conhecido e que a chamada vem de um repositório conhecido; (3) é criado um **token impersonado** de uma service account de deploy, no ato; (4) terminado o deploy, tudo é apagado.
- No GCP o pool fica em IAM, federação de identidade. A tela mostra quando foi usado (auditoria; o Google avisa abuso), as asserções e a **condição**: acesso só para um repositório específico. No fork do aluno, a condição precisa apontar para o seu repositório.
- No workflow, o job de deploy declara `permissions: id-token: write` e usa `google-github-actions/auth@v3` com `workload_identity_provider` e `service_account` vindos de variáveis (identificadores, não segredos).
- `GITHUB_TOKEN` é outra coisa: token do próprio GitHub, não da nuvem, que identifica quem executa a run conforme a permissão no repo.
- Jobs de build e teste não precisam de acesso ao GCP; só o deploy precisa. Por isso o `deploy` tem `needs: test` e roda só em push na `main`.
- Roteamento em produção: o navegador chama `/api/health` no domínio do Firebase; o `rewrite` encaminha ao serviço `ai-researcher-api` em `us-central1`; qualquer outro caminho cai no `index.html` (SPA).
- Segredos no runtime: o Cloud Run injeta `DATABASE_URL=database-url:latest` a partir do Secret Manager e conecta ao Cloud SQL por `--add-cloudsql-instances` (socket Unix).
- Desmontagem: `make destroy` chama `pnpm destroy` (scripts/destroy.ts), que apaga primeiro o Cloud SQL (único custo fixo), depois Cloud Run, Artifact Registry, secrets, pool WIF e service account, pedindo para digitar o project id.

### Onde aplicar
- Qualquer pipeline que faz deploy em nuvem: troque chaves estáticas por federação OIDC (GCP, AWS e Azure têm equivalentes).
- APIs com tráfego esporádico: serverless por requisição sai muito mais barato que servidor sempre ligado.
- Apps que já têm Postgres e precisam de RAG: pgvector evita um banco vetorial separado.
- SPAs com API própria: rewrite no hosting para manter mesma origem e eliminar CORS.
- Estimativa de custo de projeto de estudo: identificar o único recurso com custo fixo e planejar o teardown.

### Vantagens e limites
**Vantagens**
- WIF não deixa credencial duradoura: se o repo vazar, não há chave para roubar, e o acesso fica preso a um repositório.
- Cada uso do pool é auditado pelo próprio Google Cloud.
- Cloud Run e Firebase Hosting têm custo praticamente zero em uso baixo.
- Mesma imagem Docker roda local e em produção.

**Limites**
- Configurar pool, provider, condição e bindings à mão é trabalhoso e cheio de detalhes de permissão.
- Lock-in parcial: o Vertex AI é específico do Google (embora Bedrock e outros cubram o papel).
- Cloud SQL tem custo fixo por instância mesmo parada.
- Serverless pode não compensar com tráfego alto e constante, caso em que servidor dedicado pode sair melhor.

### 🚫 Armadilhas
- Nunca versionar secret; o GitHub tem área própria para secrets, e o ideal aqui é nem ter secret.
- Esquecer de trocar o repositório na condição do pool ao usar fork: a autenticação falha e o deploy quebra.
- Esquecer de desmontar a infra: o Cloud SQL segue cobrando os 10 GB reservados.
- Confundir `GITHUB_TOKEN` (do GitHub) com credencial do GCP.
- Achado: a aula diz região us-central1 "mais barata"; o infra/README do repo completo justifica por cobertura de serviços e nota que os modelos Gemini usados no chat só respondem em `location: "global"`.

> 💡 Ao revisar qualquer workflow, procure três linhas: `permissions: id-token: write`, o step `auth` com provider e service account e a ausência de `credentials_json`. Se houver JSON de chave, a esteira não é keyless.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Cloud Run | Backend serverless do GCP, cobrado por requisição, escala sob demanda. |
| Firebase Hosting | Hospedagem de estáticos com DNS e regras de rewrite para o Cloud Run. |
| Rewrite | Regra que envia /api/** ao Cloud Run e o resto ao Angular; dispensa CORS. |
| Artifact Registry | Repositório versionado de imagens Docker. |
| pgvector | Extensão do Postgres para guardar embeddings e buscar por similaridade em SQL. |
| Vertex AI | Plataforma de modelos do Google (embedding e LLM); equivalente ao Bedrock. |
| Secret Manager | Cofre de segredos do GCP; lido pelo Cloud Run em runtime. |
| WIF | Workload Identity Federation: confia no OIDC do GitHub e emite credencial efêmera. |
| Token OIDC | Token de curtíssima duração emitido pelo GitHub a cada run. |
| Service account impersonada | Identidade de deploy assumida no ato via token, descartada ao fim. |
| GITHUB_TOKEN | Token do próprio GitHub para a run, não é credencial de nuvem. |

---

## 💻 No código do repo

**Projeto:** [.github/workflows/deploy.yml](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/.github/workflows/deploy.yml)

Li o workflow do repo completo (160 linhas) e do seed (79 linhas). O seed é o workflow "da aula"; o completo evoluiu com E2E, canary e mais secrets. Não executei a esteira.

**Fluxo**
1. `on:` `push` em `main` e `pull_request`; o `env` lê `PROJECT_ID` de `vars.GCP_PROJECT_ID` (variável, não secret), fixa `REGION: us-central1`, `ARTIFACT_REPO: ai-researcher` e `CLOUD_RUN_SERVICE: ai-researcher-api`.
2. Job `test` (`ubuntu-latest`): `actions/checkout@v7`, `pnpm/action-setup@v6`, `actions/setup-node@v7` com Node 24 e cache pnpm, `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm test`, `pnpm lint` (o completo acrescenta Playwright chromium e `pnpm test:e2e`).
3. Job `deploy`: `needs: test`, `if: github.event_name == 'push' && github.ref == 'refs/heads/main'` e `permissions: id-token: write, contents: read`.
4. Step `auth`: `google-github-actions/auth@v3` com `workload_identity_provider: ${{ vars.GCP_WIF_PROVIDER }}` e `service_account: ${{ vars.GCP_DEPLOY_SERVICE_ACCOUNT }}`, sem `credentials_json`.
5. Build da imagem: `gcloud auth configure-docker us-central1-docker.pkg.dev`, `docker build -f infra/docker/api.Dockerfile`, `docker push` com tag `${{ github.sha }}`.
6. Deploy no Cloud Run com `google-github-actions/deploy-cloudrun@v3`: `secrets: DATABASE_URL=database-url:latest` e `flags: --add-cloudsql-instances=${PROJECT_ID}:us-central1:ai-researcher-db`.
7. Fim: `pnpm turbo run build --filter=@hero/web` e `npx firebase-tools deploy --only hosting --project ... --non-interactive`.

**Como rodar**
- `gh variable set GCP_PROJECT_ID --body "<seu-project-id>"` (e `GCP_WIF_PROVIDER`, `GCP_DEPLOY_SERVICE_ACCOUNT`) conforme infra/README.md
- `gh run list --workflow=deploy.yml` e `gh run watch` para acompanhar a esteira (não executei)

**Armadilhas e achados no código**
- Achado: o gatilho real é `push` em main **e** `pull_request`; o `deploy` é que fica restrito a push na main. A aula fala só do push na main.
- Achado: no repo completo existe um passo `check-service` que escolhe entre deploy canary (`no_traffic`, `tag: canary`) e primeiro deploy sem canary, porque o gcloud rejeita `--no-traffic` ao criar um serviço; é evolução de unidades futuras, ausente no seed.
- O ID do provider e da service account aparecem como `vars`, o que é coerente com a aula (identificação, não secret).

**Projeto:** [infra/ (README.md, docker/, grafana/), firebase.json, .firebaserc, Makefile, scripts/destroy.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/infra)

Li o infra/README.md (completo e seed), firebase.json, os Dockerfiles, nginx.conf, o Makefile e o destroy.ts. Não executei comandos de nuvem. O repo não tem IaC (Terraform/Pulumi): a fundação é documentada para reprodução manual.

**Fluxo**
1. `infra/README.md`: tabela de recursos: projeto `ai-researcher-capstone`, região `us-central1`, Artifact Registry `ai-researcher`, Cloud SQL `ai-researcher-db` (Postgres 16, `db-f1-micro`, zonal, sem backup, IP público), banco `ai_researcher` com pgvector 0.8.1, usuário `app_user`.
2. WIF no README: pool `github-actions-pool`, provider `github-actions-provider` restrito ao repo do curso via `attribute.repository`; service account `github-actions-deployer` com roles `run.admin`, `artifactregistry.writer`, `iam.serviceAccountUser`, `cloudsql.client`, `secretmanager.secretAccessor`, `cloudbuild.builds.editor` e `firebasehosting.admin`.
3. `firebase.json`: `public: apps/web/dist/web/browser`; rewrite `/api/**` para `run.serviceId: ai-researcher-api` em `us-central1`; `**` para `/index.html`. Idêntico no seed.
4. `infra/docker/api.Dockerfile`: 4 estágios (`base`, `pruner` com `turbo prune @hero/api --docker`, `installer`, `runner` em `node:24-alpine` com usuário não-root `fastify`, porta 3000).
5. `infra/docker/web.Dockerfile` + `nginx.conf`: só para paridade local; o nginx faz o mesmo papel do rewrite (`/api/` para `http://api:3000/api/`). O deploy de produção do web não usa Docker.
6. `Makefile` e `scripts/destroy.ts`: `make destroy` remove Cloud SQL primeiro e exige digitar o project id; lê `GOOGLE_CLOUD_PROJECT_ID`.
7. `docs/hero-project-plano.md`: seção 3 desenha a arquitetura 100% Google Cloud com GitHub Actions ligado por WIF; ementa da Unidade 1 de 1h.

**Como rodar**
- `make destroy` (ou `pnpm destroy`): apaga a infra do projeto em ordem; não executei
- `gcloud projects describe <id> --format="value(projectNumber)"` para montar o caminho do provider (do infra/README)

**Armadilhas e achados no código**
- Achado: a aula pede "mínima permissão", mas a service account de deploy tem `run.admin`, `iam.serviceAccountUser` e `firebasehosting.admin`; amplo para o escopo. Hipótese: `cloudbuild.builds.editor` é sobra, pois o commit "Troca Cloud Build por docker build+push direto no runner" removeu o uso do Cloud Build (não verifiquei no GCP).
- Achado: `.firebaserc` ainda traz `"default": "ai-researcher-capstone"` fixo; o README manda trocar pelo seu project id (o deploy.yml passa `--project` explícito e não depende dele).
- Achado: nenhuma configuração de CORS existe em `apps` ou `packages` (busca por "cors" sem resultado); coerente com o rewrite/proxy de mesma origem.
- Achado: a SA de execução do Cloud Run (padrão do Compute) precisou de `secretmanager.secretAccessor` em `database-url`, distinta da SA de deploy; é um dos três bugs do deploy zero no README.
- Achado: `destroy.ts` estima o Cloud SQL em cerca de US$ 10-15/mês (comentário do script), na mesma linha do alerta da aula.

---

## 🔗 Para ir além
- [Capstone Project AI Researcher](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)
- [AI Researcher Seed](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed)
- [Workflow de deploy](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/.github/workflows/deploy.yml)
- [infra/README.md (recursos e WIF)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/infra/README.md)
- [Documentação: Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation)

---

⬅️ [01 · CLAUDE.md e AI Dev Skills: contexto sempre ligado versus instruções sob demanda](./01-claude-md-and-ai-dev-skills.md)  ·  [03 · Corpus CVM: coleta, normalização e parágrafos determinísticos sem LLM](./03-cvm-corpus.md) ➡️
