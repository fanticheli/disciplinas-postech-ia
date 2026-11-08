# 12 · Erros padronizados e o servidor MCP

> **Unidade 3 · Aulas 16 e 17** · Leitura: ~12 min · Bloco: Unidade 3 · Qualidade, resiliência e MCP

## 🎯 Em uma frase
A API trata todo erro num **único error handler** que responde **application/problem+json** (RFC 7807) sem vazar stack trace. O agente é exposto por **MCP** com uma só tool, `perguntar`, cuja descrição é lida pelo cliente MCP, em **stdio** (local) e **Streamable HTTP** (servidor), com **uma única instância do grafo** para /chat e /mcp.

---

## 👵 Explicando para a vovó

Uma loja com vários guichês: se cada atendente dá a má notícia do seu jeito, o cliente se perde. Com um formulário único de ocorrência, qualquer cliente (ou outro robô) entende o que houve, e o relatório interno com os detalhes técnicos fica só com a gerência.

Já o MCP é a vitrine da loja para outros robôs: em vez de abrir o depósito inteiro, você coloca um único balcão, com uma placa dizendo exatamente o que ele atende e o que nunca faz. O robô lê a placa para decidir se vale perguntar ali.

---

## 🔧 Tecnicamente

### O que é
- **Aula 16, problema:** se cada rota trata erro do seu jeito, a experiência piora. O tratamento único fica em função unificada no `app.ts`, registrada uma vez com `app.setErrorHandler()`; nenhuma rota trata erro por conta própria. É nesse ponto que depois entram telemetria e demais controles.
- **Mapeamento pedido:** `ZodError` para 400 (identificado por `instanceof`), circuito aberto do SearchProvider para 503 (por duck typing: é um `Error` com o nome do erro de circuito aberto) e qualquer outro erro para 500 genérico, sem stack trace.
- **Não vazar detalhe interno:** stack trace é questão de segurança; a telemetria fica nos serviços internos e o cliente externo recebe só o necessário. Alguém mal-intencionado pode usar o stack para explorar o servidor.
- **Contrato RFC 7807:** `application/problem+json` com `type`, `title`, `status`, `detail`, schema em `packages/contracts`. Atende o frontend (acordo de formato) e outros agentes (erro padronizado gasta bem menos tokens).
- **Dependência nova ou duck typing:** a API não depende do pacote do agente (só contratos, Fastify e pg), por desenho: a rota de chat recebe o grafo por tipo estrutural para testar sem LLM e sem Postgres. O erro de circuito aberto só é exportado pelo módulo de busca, não pelo índice público do agente. `instanceof` exigiria nova dependência e reexportar o erro, e instalar dependência é o que o CLAUDE.md manda perguntar antes. O Claude Code perguntou e a decisão foi duck typing. Custo: se o nome da exceção mudar, a checagem quebra.
- **Aula 17, uma única tool:** pensa-se na experiência de quem consome, aqui o agente. Expor o grafo inteiro arrisca outro agente pular o guardrail. O servidor MCP abstrai: o agente pergunta e o sistema responde. Não se abre todo o sistema por MCP, como não se vira todas as funções do backend em API.
- **Tool:** nome, título, descrição, schema e função. Em MCP não há endpoints, há tools. Em `perguntar.ts`: nome `perguntar`, schema só com a pergunta, resultado com texto e indicador de erro; a função obtém o mesmo grafo do chat, processa e responde; em erro devolve a mensagem com `isError: true`.
- **A descrição é prompt:** o cliente MCP a coloca no contexto e decide se chama a tool. Deve declarar: indicadores financeiros (receita líquida, lucro líquido) de 20 empresas da B3 com dados da CVM; busca na web quando o corpus não basta; toda resposta cita fonte e período; nunca recomenda comprar, vender ou manter; não é consultoria, e pedido de opinião é recusado pela própria resposta, não pela ausência da tool.
- **Transportes:** stdio é a interface local de texto (console), basicamente um script executado quando o agente pergunta, adicionado com `claude mcp add`. Streamable HTTP expõe a mesma tool num servidor: standalone com porta própria (`MCP_HTTP_PORT`, default 3100) e dentro do apps/api como gateway em `/api/mcp`, sem CORS novo. Stateless: GET e DELETE respondem 405.
- **Uma instância do grafo:** /chat e /mcp compartilham o mesmo grafo, senão haveria dois SearchProviders e dois circuit breakers independentes para a mesma API. Com instância única, o circuito abre e toda a resiliência vale em qualquer porta de entrada.
- **Separação biblioteca x execução:** a superfície pública importada pela API (plugin e tipos) fica separada dos arquivos com efeito colateral (bootstrap do stdio, `app.listen()` do HTTP standalone); importar como biblioteca nunca dispara nenhum dos dois.

### Como funciona
- Error handler: registre `app.setErrorHandler(errorHandler)` uma vez, remova os `reply.code(400)` das rotas e deixe o `ZodError` do `parse` subir.
- Defina o schema `ProblemDetails` (type, title, status, detail) em `packages/contracts` e exporte.
- Teste com a aplicação no ar: suba só a API local, faça `curl` a uma rota inexistente (a aula mostra resposta unificada com 404 e mensagem de rota POST não encontrada) e envie body vazio à rota de chat para ver o 400 no formato do contrato.
- MCP: crie `packages/mcp-server` com uma tool `perguntar` que roda o grafo inteiro (retrieve, grade, webSearch, answer). O grafo entra por parâmetro (`GetGraph`/`GraphLike`) para testar com fake e `InMemoryTransport` do SDK.
- Se o grafo falhar, a tool não deixa a exceção crua vazar: devolve `isError: true`. A construção do grafo real (Postgres e Vertex AI, com clientes de embeddings, grade e answer) mora em `packages/agent` e é construída só na primeira chamada, nunca na inicialização.
- Ambiente local em seis passos: Docker Compose para o Postgres, `.env` na raiz (`DATABASE_URL` para o Postgres local, `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION=global`, `MODEL_GRADE=gemini-3.5-flash-lite`, `MODEL_ANSWER=gemini-3.6-flash`, `MODEL_EMBEDDING=gemini-embedding-001`), migration, `pnpm seed`, build do servidor e `claude mcp add`, e então a pergunta numa outra aba do Claude Code.
- Pergunta de teste que força a tool: "Usando a tool perguntar do servidor ai-researcher, qual foi a receita líquida da Vale no último trimestre?". Sem citar a tool, o agente decide pela descrição. Na demonstração a resposta veio da fonte web complementar (R$ 53 bilhões) com fontes citadas.
- HTTP: plugin Fastify reutilizável `mcpHttpPlugin` (no repo, `mcpHttpRoute`), registrado no standalone e dentro do apps/api; só POST aceito, GET e DELETE retornam 405. Faça commit antes da mudança para ver o diff.

### Onde aplicar
- Qualquer API que precisa de contrato de erro único para frontend e para agentes consumidores.
- Expor um agente ou backend a outros agentes com uma superfície mínima (uma tool) e guardrail do lado de dentro.
- Serviço que roda local para um agente de CLI (stdio) e também em servidor (HTTP) com a mesma lógica.
- Decidir entre acoplar pacotes (instanceof) e manter desacoplamento (duck typing) conversando com o agente antes de executar.

### Vantagens e limites
**Vantagens**
- Erro unificado simplifica rotas, UX do frontend e o consumo por outros agentes, com menos tokens.
- Stack trace fica na telemetria interna; o cliente externo não recebe pista para ataque.
- Uma tool só reduz a superfície e mantém o guardrail dentro do sistema.
- Mesma lógica em dois transportes; grafo compartilhado mantém um único circuit breaker.

**Limites**
- Duck typing por nome quebra silenciosamente se a exceção for renomeada.
- Uma tool única limita o que o agente externo pode fazer.
- Descrição de tool mal escrita faz o cliente MCP chamar (ou deixar de chamar) a tool errada.
- Stateless no HTTP recria servidor e transport por POST.

### 🚫 Armadilhas
- Rota tratando erro por conta própria: quebra o contrato e espalha a regra.
- Devolver `error.stack` ou a mensagem crua da exceção ao cliente externo.
- Duas instâncias do grafo (uma por rota) criam dois circuit breakers para o mesmo serviço.
- Efeito colateral no módulo de biblioteca (listen ou bootstrap no import).
- Código: no repo final o handler usa `instanceof CircuitoAbertoError`, não duck typing, e a tool devolve o texto do erro; ver armadilhas abaixo.

> 💡 Escreva a descrição da tool como um prompt: domínio, o que faz, o que nunca faz e o formato da resposta, e teste forçando e não forçando o uso da tool.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| RFC 7807 | Formato padrão de erro HTTP, application/problem+json, com type, title, status, detail. |
| setErrorHandler | Registro único do tratamento de erro do Fastify; nenhuma rota trata erro sozinha. |
| Duck typing | Reconhecer o erro pelas características (Error com certo name), não pelo tipo importado. |
| MCP | Model Context Protocol: expõe tools de um backend para agentes. |
| Tool | Nome, título, descrição, schema e função executada a partir da entrada do agente. |
| isError | Indicador no resultado da tool para sinalizar falha sem lançar exceção. |
| stdio | Transporte local por entrada e saída de texto; executa um script. |
| Streamable HTTP | Transporte MCP por POST em servidor; no projeto, stateless. |
| InMemoryTransport | Transporte em memória do SDK para testar o servidor MCP inteiro. |
| Stateless | Sem sessão em memória entre chamadas; GET e DELETE respondem 405. |

---

## 💻 No código do repo

**Projeto:** [apps/api (app.ts, error-handler.ts) e packages/contracts/src/problem.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api/src)

Li o handler, o schema, o app e os testes. Não executei. O handler do repo final já inclui mapeamentos acrescentados depois da aula (429).

**Fluxo**
1. `packages/contracts/src/problem.ts`: `problemDetailsSchema` (zod) com `type`, `title`, `status`, `detail` e o tipo `ProblemDetails`.
2. `apps/api/src/error-handler.ts`: `paraProblema(error)` mapeia `ZodError` para 400, `CircuitoAbertoError` para 503, `OrcamentoDiarioExcedidoError` e `LimiteDeRequisicoesExcedidoError` para 429, e o resto para 500 com detalhe fixo "Ocorreu um erro inesperado. Tente novamente.".
3. `errorHandler`: `request.log.error(error)` e `reply.code(status).type('application/problem+json').send(problema)`; o stack vai para o log interno, não para a resposta.
4. `apps/api/src/app.ts`: `app.setErrorHandler(errorHandler)` logo após criar o Fastify; `BASE_URL` dos tipos é `https://ai-researcher.dev/problems`.
5. `apps/api/src/error-handler.test.ts`: um teste por mapeamento, incluindo 500 que não contém o texto do erro interno; `app.test.ts` verifica 400 com `application/problem+json; charset=utf-8` para question ausente.

**Como rodar**
- `pnpm --filter @hero/api test` (hipótese de filtro; não executei).
- `pnpm dev` e `curl` na API para ver o problem+json (a porta padrão é `PORT` ou 3000, conforme `index.ts`).

**Armadilhas e achados no código**
- Achado: a aula conta que o Claude Code optou por duck typing por não existir dependência da API no pacote do agente; no repo final `apps/api/package.json` já depende de `@hero/agent` e `error-handler.ts` usa `error instanceof CircuitoAbertoError` importado de `@hero/agent`. O histórico (commit 20f1620, E.7) já mostra `instanceof`; não encontrei duck typing em nenhuma versão (`git log -S`). A decisão da aula não está no código.
- Achado: `CircuitoAbertoError` é reexportado em `packages/agent/src/index.ts`, o que a aula dizia que não acontecia.
- Achado: o handler do repo vai além da aula, com 429 para orçamento diário e limite de requisições.
- Não verifiquei se o 404 de rota inexistente passa pelo handler: não há `setNotFoundHandler` no repo, então o formato dessa resposta depende do comportamento padrão do Fastify (hipótese, não testei).

**Projeto:** [packages/mcp-server](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/mcp-server)

Li o servidor, a tool, os dois transportes e os testes; li também a integração em apps/api/src/app.ts. Não executei build nem testes, e não li o .env.example (acesso negado no ambiente).

**Fluxo**
1. `src/tools/perguntar.ts`: `GraphLike { invoke({question}) => Promise<{answerText}> }`; `DESCRICAO` com domínio (20 empresas da B3, CVM), busca web, citação de fonte e período, e &quot;NUNCA recomenda&quot;; `perguntarInputSchema` com `question` (`z.string().min(1)`); `perguntarConfig` com título &quot;Perguntar ao AI Researcher&quot;.
2. `makePerguntarTool(graph)`: sucesso devolve `content: [{type:'text', text: answerText}]`; falha devolve `isError: true` com `Não foi possível responder agora: ${detalhe}`.
3. `src/server.ts`: `criarServidor(graph = criarGraphPadrao())` cria `McpServer({name:'ai-researcher'})` e `registerTool('perguntar', ...)`; `criarGraphPadrao` memoiza `buildGraph(criarGraphDepsPadrao())` na primeira chamada de `invoke`.
4. `src/stdio.ts`: `registrarLangfuseTracing()`, `criarServidor()`, `StdioServerTransport` e `server.connect` (efeito colateral ao importar); `package.json`: `start:stdio` = `node dist/stdio.js`.
5. `src/http-route.ts`: plugin Fastify `mcpHttpRoute`; `POST /mcp` cria server e `StreamableHTTPServerTransport({ sessionIdGenerator: undefined })` por requisição (stateless); GET e DELETE respondem 405 com JSON-RPC `-32000`.
6. `src/http.ts`: standalone, `MCP_HTTP_PORT` default 3100, `listen` em `0.0.0.0`; `src/index.ts`: superfície pública (`criarServidor`, `mcpHttpRoute`, `makePerguntarTool`, tipos) sem efeito colateral.
7. `apps/api/src/app.ts`: `criarObterGrafo()` memoiza um único grafo; `/chat` usa `obterGrafo().stream` e `mcpHttpRoute` usa `obterGrafo().invoke`; registrado dentro do prefixo `/api`, vira `/api/mcp`.
8. Testes: `server.test.ts` (InMemoryTransport, lista 1 tool `perguntar` e chama ponta a ponta), `tools/perguntar.test.ts` (isError), `http-route.test.ts` (POST e 405), `apps/api/src/app.test.ts` (`/api/mcp` com `StreamableHTTPClientTransport`).

**Como rodar**
- `pnpm --filter @hero/mcp-server build` e depois `claude mcp add ai-researcher -- node <caminho>/packages/mcp-server/dist/stdio.js` (nome vem do prompt da aula; forma exata do comando é hipótese, não executei).
- `pnpm --filter @hero/mcp-server dev:http` para o servidor HTTP standalone (porta 3100).
- `pnpm --filter @hero/mcp-server test` e `pnpm --filter @hero/api test` (não executei).
- Ambiente da aula: Docker Compose do repo, `pnpm db:migrate`, `pnpm seed` (scripts da raiz do package.json).

**Armadilhas e achados no código**
- Achado: a aula diz que a tool devolve mensagem genérica em erro; o código devolve `Não foi possível responder agora: ${detalhe}` com `error.message` cru, e o teste exige que o texto contenha "Vertex AI indisponível". Isso pode vazar detalhe interno ao cliente MCP, na contramão da Aula 16.
- Achado: a aula pede que a construção do grafo real, memoizada por processo, more em `packages/agent`. No repo, `criarGraphDepsPadrao()` está em `packages/agent/src/graph-deps.ts`, mas a memoização está duplicada em `mcp-server/src/server.ts` e em `apps/api/src/app.ts`.
- Achado: no HTTP standalone (`http.ts`), `mcpHttpRoute` é registrado sem `graph` e `criarServidor(graph)` roda a cada POST; como o default `criarGraphPadrao()` é avaliado a cada chamada, cada requisição cria um grafo novo, com um novo SearchProvider e circuit breaker. Isso contraria o ponto da aula de instância única (que só vale dentro da API, onde o grafo é injetado). Conclusão de leitura de código, não testei.
- Achado: o nome do plugin na aula é `mcpHttpPlugin`; no repo é `mcpHttpRoute` (default export de `http-route.ts`).
- Achado: o prompt da aula nomeia o tipo `GetGraph`; no código a interface se chama `GraphLike` e não há `GetGraph`.

---

## 🔗 Para ir além
- [Capstone Project AI Researcher](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)
- [AI Researcher Seed](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed)
- [packages/mcp-server](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/mcp-server)
- [apps/api](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api)
- [RFC 7807](https://datatracker.ietf.org/doc/html/rfc7807)
- [Model Context Protocol](https://modelcontextprotocol.io)

---

⬅️ [11 · Circuit breaker, retry e degradação graciosa](./11-circuit-breaker-retry-and-graceful-degradation.md)  ·  [13 · Do protótipo no Claude Design à skill frontend-design](./13-claude-design-to-frontend-design-skill.md) ➡️
