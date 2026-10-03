# 09 · MCPs e automação para devs

> **Módulo 8 da disciplina (Caps. 1 a 5)** · Leitura: ~12 min · Pré-requisito: doc [08](./08-ferramentas-dev-e-agentes.md)

## 🎯 Em uma frase
**MCP (Model Context Protocol)** é um padrão aberto — o "**USB das ferramentas** para a era das LLMs" — que conecta a IA a APIs, arquivos, bancos e serviços de forma plug-and-play, deixando o agente **agir no mundo real** em vez de só responder.

---

## 👵 Explicando para a vovó

Sabe como qualquer pendrive, mouse ou impressora encaixa na **mesma entrada USB** do computador, sem precisar de adaptação especial? O MCP é isso, mas para a IA: uma **tomada padrão** onde você "pluga" ferramentas — o GitHub, o navegador, o painel de monitoramento, o e-mail — e a IA passa a usá-las na hora.

Sem MCP, a IA é como uma pessoa muito inteligente **presa numa sala só falando**: ela dá ótimos conselhos, mas não consegue apertar nenhum botão. Com MCP, ela sai da sala e ganha **mãos**: abre o navegador, preenche o formulário, olha o relatório de erros, manda o e-mail — de verdade.

E como ela sabe qual ferramenta usar? Cada ferramenta tem uma **plaquinha com o nome e a descrição** ("isto lê arquivos", "isto envia e-mail"). A IA lê as plaquinhas e escolhe a que melhor combina com o pedido — igualzinho a a senhora escolher a chave de fenda certa olhando o formato.

---

## 🔧 Tecnicamente

### O que é MCP
Anunciado pela **Anthropic em novembro de 2024**, é um **protocolo aberto** para integrar assistentes de IA a fontes de dados externas. Você "pluga" servidores MCP prontos em um cliente compatível (como o VS Code) e a IA passa a usar essas integrações **automaticamente, sem código adicional**.

### Os 3 componentes de um servidor MCP
| Componente | O que é | Exemplos |
|------------|---------|----------|
| **Tools** | Ações que a IA pode executar | "listar palestras", "criar arquivo", "executar consulta SQL" |
| **Resources** | Dados usados como contexto | conteúdo de arquivos, logs, schemas de banco |
| **Prompts** | Templates que ajudam a formular comandos | estruturas prontas para usar as tools |

### Como a LLM escolhe a ferramenta
**Não há lógica if-else.** A LLM seleciona a melhor opção pela **similaridade** entre o prompt e a **descrição da tool**. Por isso, tools com **nomes claros** (ex.: `readFile`) e **descrições objetivas** são priorizadas. A IA também tende a preferir:
- **Ações não-destrutivas** (ler, listar) antes de escrever ou deletar.
- Tools com **schemas de parâmetro bem definidos**.

Cada tool define um **JSON Schema** para seus parâmetros. A LLM precisa gerar um JSON válido; se o schema não for atendido, a execução falha e o modelo pode tentar de novo — trazendo **controle e previsibilidade** para uso em produção. Modelos mais avançados encadeiam chamadas: usar uma tool, analisar o resultado e chamar outra com base nele.

**Servidor MCP próprio (exemplo do professor):** uma API com informações sobre palestras, posts e vídeos dele, com SDK gerado via GraphQL, testes com o Node.js Test Runner e publicação no npm; qualquer pessoa instala e consulta pelo editor (repo `erickwendel-contributions-mcp`). Exemplo de uso combinado: perguntar quais foram as palestras de 2024, resumir a mais recente e enviar por e-mail.

Os MCPs são plugados via arquivo de configuração (`mcp.json`) no VS Code ou outro editor compatível: basta apontar para o servidor e fornecer as credenciais. Exemplos reais: **GitHub** (listar/revisar PRs), **Playwright** (testes e navegação), **Grafana** (monitoramento), **e-mail Resend**.

---

### Casos práticos do curso

#### 🧪 Cap. 2 — Gerar testes automatizados (Playwright MCP)
Num repositório vazio, apenas com prompts estruturados, a IA: cria o projeto com Playwright, gera arquivo de teste base, executa, **ajusta falhas automaticamente** e integra com **GitHub Actions** — tudo com **zero linha de código escrita manualmente**. A IA decide inclusive rodar o Chrome em modo visível ou *headless*, ajustando seletores conforme os logs.

> 💬 *"Ferramentas como o Playwright MCP tornam obsoleta a desculpa de que 'não deu tempo de escrever teste'."*

#### 🌐 Cap. 3 — Navegar em sites e preencher formulários
Automatizar o preenchimento repetitivo de formulários (ex.: dados de palestrante em várias plataformas). Com a extensão **Playwright MCP Bridge** no Chrome, a IA interage com as abas abertas (útil para cenários com sessão logada), **mantém o contexto** entre interações e pede dados faltantes. Também roda **localmente** com o modelo **QuenCoder 30B** via plataforma **Tome** (open source + MCP), economizando tokens.

#### 📚 Cap. 4 — Consultar documentações atualizadas (Context7)
Resolve o problema de LLMs com **conhecimento desatualizado** (sugerem código antigo/quebrado). O **Context7** é um servidor MCP que **indexa documentações reais** (Next.js, BetterAuth, Node.js, Prisma) e injeta automaticamente os trechos relevantes no contexto. Tools: `queryDocs` e `resolveLibrary`. Resultado: código sempre alinhado à versão atual, prompts menores, menos alucinação.

#### 🔍 Cap. 5 — Telemetria: IA como detetive digital (Grafana MCP)
Aplicação instrumentada com **OpenTelemetry**, enviando dados para **Prometheus** (métricas), **Grafana Loki** (logs) e **Grafana Tempo** (traces). Com um único prompt — *"Estou recebendo erro 500 neste endpoint, descubra o motivo e gere um relatório"* — a IA:
1. Coleta métricas no Prometheus (todos os requests com erro 500).
2. Explora logs no Loki.
3. Reconstrói a cadeia de chamadas no Tempo (tracing).
4. **Correlaciona os três sinais** e descobre a causa raiz: **vazamento de conexões com o banco** (conexões criadas a cada requisição, sem reutilização).

> O mais impressionante: a IA faz tudo **sem acessar o código-fonte**, apenas com os dados de telemetria. Uma investigação que levaria horas é feita em minutos.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| **MCP** | Protocolo aberto que conecta LLMs a ferramentas/dados |
| **Tool** | Ação executável exposta pelo servidor MCP |
| **Resource** | Dado de contexto (arquivo, log, schema) |
| **JSON Schema** | Contrato dos parâmetros de uma tool |
| **`mcp.json`** | Arquivo que pluga servidores MCP no editor |
| **Playwright MCP** | Automação de navegador/testes via MCP |
| **Context7** | MCP que injeta documentação atualizada |
| **Grafana MCP** | MCP para investigar telemetria (Prometheus/Loki/Tempo) |

---

## 💻 No código do repo

**Demos do curso (sem código no repo):** servidor MCP **pessoal** do professor, expondo uma API de palestras/posts (SDK via GraphQL, testes com Node.js Test Runner, publicado no npm); Resend MCP para gerar e enviar e-mails direto do editor.

Quatro exemplos, em ordem de complexidade. Os 06 e 07 são só configuração e prompts (sem `package.json`): o "programa" é o prompt mais as ferramentas do MCP.

**`exemplo-06` · Playwright MCP para gerar testes**
- **Objetivo:** o agente explora a página de verdade e escreve testes E2E em TypeScript a partir do que viu, em vez de adivinhar seletores. Alvo: `erickwendel.github.io/vanilla-js-web-app-example` (formulário + lista).
- **Arquivos:** `example.mcp.json` registra o servidor `playwright` (`npx @playwright/mcp@latest --extension`, token em `PLAYWRIGHT_MCP_EXTENSION_TOKEN`, placeholder `YOUR_TOKEN_HERE`) e `prompts/` com:
  - `project-scaffolding.md`: setup só com `@playwright/test` (app alvo `https://erickwendel.github.io/vanilla-js-web-app-example/`, baseURL, timeout máx. 5 s, pasta `tests/`, primeiro spec e workflow do GitHub Actions só com Chromium, relatório HTML como artefato em caso de falha).
  - `generate_test.prompt.md`: o "system prompt" do gerador. Não gerar código só pelo cenário; executar cada passo com as ferramentas do MCP, só então emitir o teste, salvar em `tests/`, rodar e iterar até passar. Regras: Chrome (não headless), testes idempotentes, `getByRole` com nome em vez de seletores frágeis.
  - `generate-tests.md`: o pedido concreto (enviar o formulário e checar a lista; validação do formulário).
- **Rodar:** copiar `example.mcp.json` para a config MCP do editor (formato `servers` do VS Code, `.vscode/mcp.json`); colar o scaffolding, depois o cenário com o prompt gerador no contexto; `npm i -D @playwright/test`, `npx playwright install --with-deps chromium`, `npx playwright test`.
- **Armadilhas:** `@playwright/mcp@latest` muda rápido, fixe a versão; nunca commitar o token real; o formato `servers` é do VS Code, outros clientes usam `mcpServers`; "Chrome, não headless" conflita com CI (o scaffolding usa Chromium); timeout de 5 s pode ser curto; resultado depende do modelo e pede revisão humana.

**`exemplo-07` · Playwright MCP para navegação e preenchimento**
- **Objetivo:** navegação autônoma. Arquivos: `prompt.md` e o mesmo `example.mcp.json` do 06.
- **Fluxo do prompt:** abrir o Google Form (`forms.gle/5mGHXVKDLMFtjwBz7`) e listar os campos obrigatórios; ir a `sessionize.com/erickwendel` e coletar do perfil o que o form pede; escolher uma palestra em **português** com "javascript" no título; preencher **sem apertar submit** (o humano valida) e garantir tudo em português. Por baixo o agente alterna navegar, snapshot de acessibilidade, clicar e digitar.
- **Diferença para o 06:** lá o MCP *produz um artefato* (teste versionado); aqui *executa uma tarefa* e devolve o controle ao humano antes da ação irreversível.
- **Armadilhas:** o form e o Sessionize podem mudar ou sair do ar; sem a instrução explícita o agente pode submeter dados reais; não determinístico, mais lento que script e gasta tokens a cada snapshot; só funciona dentro de um cliente com MCP.

**`exemplo-08` · Context7 MCP (documentação sempre atual)**
- **Objetivo:** dar ao agente a documentação *atual* da biblioteca para evitar código desatualizado ou alucinado, provado com um app Next.js + Better Auth + SQLite. O foco é o **prompt**, não o Next.
- **`prompt.md`:** seções (contexto, tom, documentação, regras, passo a passo, formato de saída). Exige usar o Context7; **cláusula de parada**: se indisponível, responder só "Context7 MCP não disponível. Não posso continuar."; lista o que consultar (route handler do Next, provider GitHub, SQLite com `better-sqlite3`, auth client, migração) e exige mostrar "Docs consultados" (8 a 10 linhas de snippets) antes do código; pede `npx @better-auth/cli migrate` e validação com o Playwright MCP (liga ao 06/07).
- **Projeto gerado (`nextjs-better-auth-demo/`):** Next.js 16.1.1, React 19.2.3, Tailwind 4, `better-auth` ^1.4.10, `better-sqlite3`. `lib/auth.ts` usa `betterAuth({ database: new Database("./better-auth.sqlite"), socialProviders.github })`; `app/api/auth/[...all]/route.ts` expõe `toNextJsHandler(auth)`; `lib/auth-client.ts` cria `createAuthClient()`; `app/login/page.tsx` chama `authClient.signIn.social` e `app/page.tsx` usa `useSession()` e `signOut`.
- **Rodar:** configurar o Context7 no editor e colar o prompt, ou usar o projeto pronto: OAuth App no GitHub (callback `http://localhost:3000/api/auth/callback/github`), `.env.local` com `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `BETTER_AUTH_URL=http://localhost:3000`; `npm install`, `npx @better-auth/cli migrate`, `npm run dev`.
- **Armadilhas:** o `better-auth.sqlite` está versionado no repo do curso (não fazer em projeto real) e o `.env.local` não vem (o `.gitignore` ignora `.env*`); sem as credenciais `process.env.X as string` vira `undefined` e o login falha só em runtime; a URL de callback precisa bater exatamente; sem `migrate` o banco fica sem tabelas; `better-sqlite3` é nativo (build tools no Windows, binário pode faltar em Node muito novo); depende da cobertura do Context7 para a lib.
- **Exercício:** rodar o prompt com e sem Context7 e comparar com a doc oficial.

**`exemplo-09` · Grafana MCP (IA investigando telemetria)**
- **Objetivo:** subir observabilidade completa, plugar o **Grafana MCP** e pedir ao agente a causa raiz de um bug plantado (vazamento de conexões Postgres) cruzando métricas, logs e traces.
- **Stack:** `_alumnus` (Fastify 5 + Knex + `pg`, OpenTelemetry, pino-loki, TypeScript com `node --experimental-strip-types`, Node 22.13.1); `infra/` com `docker-compose-infra.yaml` (Postgres 16, OTel Collector, Prometheus, Loki, Tempo, Grafana 12.1, Blackbox, `mcp-grafana`); `docs/prompt.md` (roteiro de 10 passos + prompt único) e `docs/grafana-mcp-prompts.md`; `test/` com E2E (`node:test`) que valida logs no Loki, métricas no Prometheus e traces no Tempo.
- **Fluxo:**
  1. `src/index.ts` sobe em `0.0.0.0:9000`; em `NODE_ENV=production` (default) um `setInterval` de 2 s chama `/students/db-leaky-connections`.
  2. `app.ts` chama `initOtel` (OTLP gRPC de traces, métricas e logs), conecta no Postgres e registra `/health` e os cenários.
  3. O cenário usa `pg.Pool` com `max: 2` e `connectionTimeoutMillis: 1000` e **nunca chama `client.release()`**: as 2 primeiras chamadas funcionam, a 3ª estoura (`timeout exceeded when trying to connect`, HTTP 500, com `recordException` no span).
  4. App → OTel Collector (4317) → traces no Tempo, logs no Loki, métricas no Prometheus. O Grafana provisiona os 3 datasources com correlação trace ↔ log ↔ métrica; o `mcp-grafana` (porta 8000, `-t streamable-http`) os expõe como ferramentas MCP.
  5. Investigação esperada (`docs/prompt.md`): Loki (500) → padrão 2 sucessos e depois falhas → tempos ~15 ms vs ~1000 ms → stack trace em `main.ts` → traces sem span de release → falta `client.release()` em um `finally`.
- **Rodar:** Docker + Compose e Node 22+. Em `alumnus/`: `npm run docker:infra:up`, `cd _alumnus && npm install`, depois `npm run serve`. Portas: Grafana 3000 (anônimo como Admin), Prometheus 9090, Loki 3100, Tempo 3200, app 9000, Postgres 5433, MCP 8000. Disparar o bug: `curl http://localhost:9000/students/db-leaky-connections` três vezes. Cliente MCP em `http://localhost:8000/mcp`. Limpar: `npm run docker:infra:down` / `docker:infra:cleanup`.
- **Armadilhas e achados:**
  - O `docker-compose-test.yaml` faz `include: ./docker-compos.yaml` (typo, arquivo inexistente) e o README cita um `docker-compose.yaml` principal que não existe: use o `docker-compose-infra.yaml` pelos scripts npm.
  - O script `test:docker` faz `cd apps/alumnus`, caminho inexistente (veio de um monorepo).
  - O README manda subir a infra com `pnpm alumnus:infra:up` (script do monorepo original); neste recorte o comando é `npm run docker:infra:up`, dentro de `alumnus/`.
  - O JSON de exemplo do README para o MCP tem chaves desbalanceadas e `"type": "sse"`, mas o container sobe com `streamable-http`.
  - O `package.json` wrapper não instala as deps do `_alumnus` (o Dockerfile usa pnpm via corepack); o `infra/README.md` cita `otel.js`/`db.js`, mas o código é TS (`monitoring/otel.ts`, `database/db.ts`).
  - `empty/telemetry-diagnosis-report.md` tem caminhos do computador do autor (é saída de exemplo). Portas 3000, 3100, 3200, 4317, 5433, 8000, 8889, 9000, 9090 e 9115 precisam estar livres; ICMP do Blackbox exige `cap_add: NET_RAW` (comportamento diferente em Docker Desktop/WSL).
  - Stack pesada para máquina de aula; Grafana anônimo e senhas default servem só para laboratório.
- **Exercícios:** corrigir com `try/finally` e provar nos 3 sinais; novo cenário estendendo `BaseScenario`; regra em `prometheus/alerts.yaml`. O formato do prompt (métrica → log → trace → causa raiz → tabela de correlação) serve de template para qualquer incidente.
- **Código:** [06](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-06-playwright-testes) · [07](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-07-playwright-navegacao) · [08](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-08-context7) · [09](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-09-grafana-mcp)

---

## 🔗 Para ir além
- Model Context Protocol (site oficial) — https://modelcontextprotocol.io/
- Anúncio do MCP (Anthropic) — https://www.anthropic.com/news/model-context-protocol
- erickwendel-contributions-mcp (repo do professor) — https://github.com/ErickWendel/erickwendel-contributions-mcp
- Playwright MCP — https://github.com/microsoft/playwright-mcp
- Context7 — https://github.com/upstash/context7
- Resend MCP (e-mail) — https://github.com/resend/mcp-send-email
- Playwright: test agents — https://playwright.dev/docs/test-agents#agent-definitions
- Chrome DevTools MCP — https://github.com/ChromeDevTools/chrome-devtools-mcp
- Better Auth — https://www.better-auth.com/
