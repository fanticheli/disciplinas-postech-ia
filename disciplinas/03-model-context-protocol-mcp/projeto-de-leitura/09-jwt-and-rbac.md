# 09 · Segurança da API: autenticação com JWT e autorização com RBAC

> **Unidade 6 · Aulas 1 e 2** · Leitura: ~11 min · Bloco: Segurança e governança

## 🎯 Em uma frase
Antes de publicar um MCP, a API por trás dele precisa de três pilares: **autenticação**, **autorização** e **limitação de uso**. Esta aula cobre os dois primeiros no Fastify: **JWT** responde «quem é você?» e **RBAC** responde «o que você pode fazer?», num modelo **privado por padrão**.

---

## 👵 Explicando para a vovó

Um prédio comercial dá crachá a quem passa pela portaria (autenticação). Mas o crachá de visitante abre só a recepção, e o de gerente abre a sala do cofre: o que cada crachá abre é a autorização.

A regra de ouro da portaria é: toda porta é trancada, exceto as poucas que a gente destranca de propósito (saguão e a própria portaria). Assim ninguém esquece uma porta aberta.

---

## 🔧 Tecnicamente

### O que é
- **Mudança de foco:** até aqui o módulo mostrou como construir MCPs; agora trata de publicação real e dos pilares autenticação, autorização e limite de uso.
- **JWT:** o usuário informa credenciais, recebe um token assinado e o usa nas próximas chamadas. A apostila diz que o token pode expirar, o que protege em caso de vazamento. Faz sentido para usuários humanos e login clássico.
- **Por que MCP costuma usar outro modelo:** não é prático exigir usuário e senha, pedir token com frequência e lidar com expiração. O padrão comum são API keys permanentes em variáveis de ambiente; o risco é que elas não expiram sozinhas (por isso os service tokens, [tópico 10](./10-service-tokens.md)).
- **RBAC (role-based access control):** decisões a partir do papel do usuário, não de regras soltas. No exemplo: `member` só lê; `admin` lê, cria, atualiza e remove.
- **Chave secreta do JWT:** garante a integridade do token. Em produção deve ser forte, protegida e fora do código (variável de ambiente ou gestão de segredos).
- **Camada própria de autenticação:** rotas públicas, login, verificação de token, autorização por papel e integração com os hooks do framework num módulo à parte, em vez de misturar no arquivo principal.

### Como funciona
- **Hook `onRequest` global:** executa no começo do ciclo da requisição, antes da lógica de negócio. Se a rota é pública, segue; senão exige autenticação. Segurança deve acontecer o mais cedo possível.
- **Rotas públicas:** health check, login e emissão de service token.
- **Login:** recebe `username` e `password` (body validado por schema), procura o usuário em memória com nome **case insensitive** e senha exata, e gera o JWT contendo também o **papel**; 401 em caso de falha.
- **Token como identidade transportada:** vai no header `Authorization: Bearer`; depois de validado, o contexto (username e role) fica na requisição e qualquer camada pode consultá-lo.
- **Hook `preHandler` por rota:** aplica o RBAC. Uma função reutilizável recebe o papel exigido e compara com o do usuário autenticado; sem permissão, responde erro 403. As rotas de escrita exigem `admin`.
- **Testes:** login válido e inválido, leitura autorizada, bloqueio de escrita para `member`, liberação para `admin`. A aula começa com muitos testes desabilitados no template, que servem de contrato.
- **Organização como segurança:** separar autenticação, autorização, regras de negócio, MCP e testes torna o sistema mais legível, auditável e fácil de evoluir; «projetos inseguros quase sempre também são mal organizados».

### Onde aplicar
- Qualquer API que será consumida por agentes ou editores: aplicar privado por padrão antes de publicar o MCP.
- Separar usuários humanos (JWT com expiração) de integrações (service tokens).

### Vantagens e limites
**Vantagens**
- JWT é stateless e conhecido; RBAC é simples e eficaz.
- O modelo «tudo privado, exceto o que eu libero» reduz o risco de esquecer uma rota exposta.

**Limites**
- RBAC simples não cobre permissões por recurso ou por cliente.
- Credenciais em memória e segredos no código servem à demonstração, não à produção.

### 🚫 Armadilhas
- Marcar rota por rota como protegida em vez de proteger por padrão.
- Confundir autenticação com autorização.
- Deixar o segredo do JWT no código-fonte.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| JWT | Token assinado que carrega a identidade (aqui username e role) entre chamadas |
| RBAC | Autorização baseada em papéis: member lê, admin escreve |
| onRequest | Hook do Fastify executado no início da requisição: usado para autenticar |
| preHandler | Hook executado antes do handler da rota: usado para autorizar por papel |
| Rota pública | Rota liberada de autenticação (health, login, service-token) |
| Bearer | Formato do header Authorization: `Bearer <token>` |

---

## 💻 No código do repo

**Projeto:** [07-api-security-auth-rate-limiting-template e 07-api-security-auth-rate-limiting-z (API com JWT e RBAC)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z/nodejs-fastify-mongodb-crud-z)

Cada pasta tem dois projetos: `nodejs-fastify-mongodb-crud-z` (a API, agora em Fastify 5 com `@fastify/jwt` e `@fastify/rate-limit`) e `customers-mcp-z` (o servidor MCP, tópico [12](./12-mcp-with-service-token-and-errors.md)). Esta aula e as duas seguintes usam `src/auth.js`.

**Fluxo**
1. `src/auth.js` define `authUsers` (`erickwendel`/`123123` como `admin`; `ananeri`/`1234` como `member`) e `JWT_SECRET = 'supersecret'`.
2. `src/index.js`: `await fastify.register(fastifyJwt, { secret: JWT_SECRET })`, registra o rate limit e chama `initAuthRoute(fastify)`.
3. `initAuthRoute` adiciona o hook `onRequest`: compara `request.originalUrl` com a lista `/v1/health`, `/v1/auth/login`, `/v1/auth/service-token`; senão extrai o token (`authorization.replace(/bearer /i, '')`), tenta o mapa de service tokens e, se não achar, faz `request.jwtVerify()`, respondendo `401 { message: 'Unauthorized' }` em falha.
4. `POST /v1/auth/login`: body com `username` e `password` obrigatórios, resposta tipada; compara usuário com `toLocaleLowerCase()`, senha por igualdade; `fastify.jwt.sign({ username, role: user.role })`; `401 Invalid credentials` se não casar.
5. `requireRole(role)` devolve um `preHandler` que, se `request.user.role !== role`, responde `403 Forbidden: insufficient permissions`; `index.js` aplica `preHandler: [requireRole('admin')]` em `POST`, `PUT` e `DELETE` de `/v1/customers`.
6. `test/api.test.js`: cobre login, 401 sem token, RBAC de `member` (lê, mas não cria, atualiza ou remove) e os cenários CRUD, usando `server.inject` e seed por teste.

**Como rodar**
- `cd nodejs-fastify-mongodb-crud-z`, `npm ci`, `docker-compose up -d mongodb` e `npm start` (ou `npm run infra:up` para subir também a API em container).
- `curl -X POST localhost:9999/v1/auth/login -H 'Content-Type: application/json' -d '{"username":"erickwendel","password":"123123"}'` devolve `{ token }`; use em `Authorization: Bearer ...`.
- **Verificado rodando** (Node 22.16, MongoDB 8): `NODE_ENV=test node --test test/api.test.js` no -z passa os 24 testes.

**Armadilhas e achados no código**
- **Verificado:** o payload do JWT contém só `username`, `role` e `iat`; não há `exp` (`sign` é chamado sem `expiresIn`). Ao contrário do que a apostila afirma («pode expirar»), o token do código nunca expira.
- O `username` vai para o token como foi digitado, não normalizado para o nome cadastrado (a comparação é case insensitive, mas o token guarda o valor original).
- `requireRole` compara por igualdade exata, não por hierarquia: um papel «superior» futuro precisaria ser tratado à mão.
- `JWT_SECRET`, senhas e o super secret estão no código e no README: ok para a aula, mas viola a própria recomendação de segredos fora do código.
- Usuário e senha são comparados com `===` em texto puro; sem hash e sem comparação em tempo constante.
- O README descreve os endpoints de autenticação inclusive na versão do template, que ainda não os implementa.
- Os scripts `start` e `dev` usam `DB_NAME=customers node ...` inline, sintaxe que falha no Windows nativo (o repositório tem guia em `troubleshooting/windows`).

**Template versus -z**
No **template**, `auth.js` só exporta `authUsers`, `index.js` não registra JWT nem rate limit e as rotas de escrita não têm `preHandler`; em `test/api.test.js`, quatro blocos estão com `describe.skip` (service-token, rate limit, login e RBAC de member), que você habilita conforme implementa. O **-z** traz `auth.js` completo, os registros e todos os testes ligados.

---

## 🔗 Para ir além
- [Indicação 3: Security Best Practices (MCP)](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices)
- [Código: 07-api-security-auth-rate-limiting-z](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica)

---

⬅️ [08 · Tools de CRUD de clientes, busca composta, prompt e uso no VS Code](./08-customer-crud-tools-and-prompt.md)  ·  [10 · Service tokens: credencial persistente para MCPs e integrações](./10-service-tokens.md) ➡️
