# 12 · O MCP como cliente real da API: service token obrigatório e erros estruturados

> **Unidade 6 · Aula 5** · Leitura: ~11 min · Bloco: Segurança e governança

## 🎯 Em uma frase
O MCP passa a ser um **cliente real** da API: exige um **service token** por variável de ambiente (sem ele o servidor nem inicia), envia o token em toda chamada e converte erros de autenticação, autorização e limite em **respostas estruturadas** que o modelo consegue interpretar.

---

## 👵 Explicando para a vovó

O recepcionista agora só começa o expediente se tiver o crachá no bolso; sem crachá, nem abre a porta (falhar no início é melhor que trabalhar em estado inválido).

E quando o prédio responde «você não tem permissão» ou «você ligou demais», ele não fica mudo: escreve um bilhete claro para o visitante entender o que aconteceu.

---

## 🔧 Tecnicamente

### O que é
- **Antes e depois:** antes, chamadas diretas, sem controle e sem segurança; depois, autenticação obrigatória, autorização consistente, limites definidos e comportamento previsível. É o que diferencia protótipo de solução real.
- **Uso obrigatório do service token:** vem da variável de ambiente; se não estiver configurada, o servidor MCP não inicia. A verificação acontece na inicialização: é melhor falhar na partida do que rodar em estado inválido.
- **Variável de ambiente:** evita expor o token no código-fonte, hardcode e vazamento acidental; é o mesmo modelo de outros MCPs.
- **Camada de infraestrutura:** toda requisição do MCP leva o header de autorização com o service token, o que permite à API autenticar, aplicar RBAC e aplicar rate limiting.
- **Tratamento de erros na origem:** token inválido, acesso negado e limite excedido são capturados e viram respostas estruturadas, com um indicador de erro. A IA entende claramente que algo deu errado e a falha não é silenciosa.
- **RBAC dentro do MCP:** com token de `member`, o MCP funciona mas operações de escrita são bloqueadas; com `admin`, todas funcionam.

### Como funciona
- **Testes específicos de falha:** token inválido, ausência de token e limite excedido, além dos cenários felizes. Para testar o ambiente completo: subir banco, build da aplicação e execução em contêiner.
- **VS Code:** o MCP é configurado com o service token no `mcp.json`; o editor usa automaticamente. Em linguagem natural (criar e remover cliente) a IA escolhe a tool e tudo respeita autenticação, autorização e limite.
- **Possível bypass:** se o limite é por token e o usuário usa vários service tokens, ele contorna parcialmente o limite. Em ambiente real combina-se identificação por token e por IP.
- **Próximo passo da aula:** tornar o MCP acessível a outras pessoas: publicação, distribuição e uso externo ([tópico 13](./13-publishing-npm-and-verdaccio.md)).

### Onde aplicar
- Qualquer MCP que fale com uma API protegida: credencial por variável de ambiente e erro estruturado.
- Dar a agentes de leitura um token `member`, e só dar `admin` a quem precisa escrever.

### Vantagens e limites
**Vantagens**
- Falha rápida e explícita na inicialização.
- A IA recebe mensagens de erro úteis em vez de um silêncio.
- Permissões da API continuam valendo dentro do MCP.

**Limites**
- A credencial fica na configuração do cliente do MCP (arquivo do editor), exposta a quem lê a configuração.
- Token sem expiração: o dano de um vazamento depende de revogação e rotação que o projeto não implementa.

### 🚫 Armadilhas
- Subir o MCP sem credencial e deixar cada chamada falhar de forma obscura.
- Commitar o `.vscode/mcp.json` com o token real.
- Devolver a exceção bruta em vez de uma resposta estruturada que o modelo entenda.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| SERVICE_TOKEN | Variável de ambiente exigida pelo servidor MCP para falar com a API |
| Falha na partida | Encerrar o processo na inicialização se faltar configuração essencial |
| UnauthorizedError, ForbiddenError, RateLimitError | Erros de domínio mapeados de 401, 403 e 429 |
| Erro estruturado | Resposta com campo de erro e mensagem, não exceção solta |
| Bypass por vários tokens | Contornar limite por token criando outros tokens |

---

## 💻 No código do repo

**Projeto:** [07-api-security-auth-rate-limiting-template e -z (customers-mcp-z com service token)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z/customers-mcp-z)

O servidor MCP de clientes evoluído do [tópico 08](./08-customer-crud-tools-and-prompt.md): exige `SERVICE_TOKEN`, manda `Authorization: Bearer` à API, mapeia status HTTP em erros de domínio e devolve erros estruturados.

**Fluxo**
1. `src/index.ts`: lê `process.env.SERVICE_TOKEN ?? ''` e, se vazio, loga «[error]: SERVICE_TOKEN env var is required» e faz `process.exit(1)` antes de conectar o transporte.
2. `src/mcp/server.ts`: `new CustomerService(BASE_URL, process.env.SERVICE_TOKEN!)` e registra as cinco tools, o resource e o prompt.
3. `src/infrastructure/customer-http-client.ts`: monta `` authHeaders = { Authorization: `Bearer ${serviceToken}` } ``; `#assertOk` lança `UnauthorizedError` (401), `ForbiddenError` (403), `RateLimitError` (429) ou `Error('HTTP status - texto - corpo')`; `getCustomerById` trata 404 e 400 como `null`.
4. `src/domain/errors.ts`: as três classes com mensagens padrão («Unauthorized: service token is missing or invalid», «Forbidden: token does not have sufficient permissions», «Rate limit exceeded. Please try again later.»).
5. `src/mcp/tools/*.ts` (nomes em kebab-case, como `create-customer.ts`): no `catch` devolvem `content` com a mensagem e `structuredContent: { isError: true, message }`. Todas usam `CustomerMutationSchema.shape` como `outputSchema`.
6. `tests/helpers.ts`: `getServiceToken()` pede um token de admin à API e `createTestClient(token)` sobe o servidor passando `SERVICE_TOKEN` no `env` do transporte. `tests/tools/customers.test.ts` tem 11 testes (CRUD, id inválido, token inválido, rate limit); `tests/resources/api-info.test.ts` tem 2.
7. `.vscode/mcp.json`: `env.SERVICE_TOKEN` com um UUID fixo; `getServiceToken.sh` emite tokens; `.github/agents/developer.agent.md` é o agent do [tópico 04](./04-instructions-llms-txt-and-agents.md).

**Como rodar**
- Suba a API ([tópico 09](./09-jwt-and-rbac.md)), rode `bash getServiceToken.sh`, copie o token para o `.vscode/mcp.json` e `npm test` (o teste emite o próprio token).
- `SERVICE_TOKEN=... npm run mcp:inspect` para ver as tools no Inspector.
- **Verificado rodando** (Node 22.16, MongoDB 8): os 13 testes passam; sem `SERVICE_TOKEN` o processo sai com a mensagem de erro; token de `member` bloqueia `create_customer` com «Forbidden: token does not have sufficient permissions» e lista normalmente.

**Armadilhas e achados no código**
- **Verificado:** `get_customer` por `_id` lança `McpError -32602 ... must NOT have additional properties` para clientes que chamam `listTools` (mesma causa do [tópico 08](./08-customer-crud-tools-and-prompt.md): a API devolve `id`). O teste «should get a customer by _id» passa porque o cliente de teste nunca chama `listTools`.
- **Verificado:** `get_customer` sem resultado devolve `customer: null`, mas o `outputSchema` compartilhado só aceita `customer` opcional (não nulo): o servidor devolve um texto «Output validation error ... Expected object, received null». O teste «should return null when getting a deleted customer by name» passa por acidente (`!structuredContent?.customer` é verdadeiro quando não há `structuredContent`).
- O `isError` está dentro do `structuredContent`, não no campo `isError` do resultado MCP: clientes que olham o flag do protocolo tratam a falha como sucesso.
- Todas as tools compartilham `CustomerMutationSchema.shape` como `outputSchema`: é um remendo (comentário FIX no domínio) que enfraquece o contrato de cada tool.
- `tests/prompts/findCustomer.ts` não termina em `.test.ts`: o glob `tests/**/*.test.ts` do `npm test` não o executa. O mesmo vale em `08-publishing-mcps-private-npm`.
- `.vscode/mcp.json` está commitado com um service token e com vírgula sobrando (JSON com comentários e vírgulas é aceito pelo VS Code, mas não por parsers estritos).
- Dependências: `@types/node` em `dependencies`, e o `engines` fixa `v24.14.0` exatamente.

**Template versus -z**
A pasta `customers-mcp-z` do **template** já vem completa: só difere do -z pelo UUID do `.vscode/mcp.json` e pelo nome e versão dentro do `package-lock.json` (que no template ainda diz `@erickwendel/ciphersuite-mcp`). O que está incompleto no template de 07 é a API (`nodejs-fastify-mongodb-crud-z`, ver [tópico 09](./09-jwt-and-rbac.md)).

---

## 🔗 Para ir além
- [Indicação 3: Security Best Practices (MCP)](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices)
- [Código: 07-api-security-auth-rate-limiting-z/customers-mcp-z](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z/customers-mcp-z)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica)

---

⬅️ [11 · Rate limiting: confiança zero, limite por token e resposta 429](./11-rate-limiting.md)  ·  [13 · Publicando o MCP como pacote: Verdaccio (privado) e NPM (público)](./13-publishing-npm-and-verdaccio.md) ➡️
