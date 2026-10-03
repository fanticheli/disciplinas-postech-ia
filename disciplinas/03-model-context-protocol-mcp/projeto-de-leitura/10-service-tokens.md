# 10 · Service tokens: credencial persistente para MCPs e integrações

> **Unidade 6 · Aula 3** · Leitura: ~9 min · Bloco: Segurança e governança

## 🎯 Em uma frase
Editor, integração ou agente não fazem login manual nem renovam token toda hora. O **service token** funciona como uma API key: representa uma **integração**, não uma sessão de usuário, não expira sozinho e precisa ser guardado pelo servidor. É mais simples de usar e mais perigoso se vazar.

---

## 👵 Explicando para a vovó

O JWT é o ingresso de um dia do parque: expira e você compra de novo. O service token é o passe anual de um fornecedor: entra todo dia sem fila, e por isso, se for roubado, vale até alguém cancelar.

Para emitir passe anual não basta ter o seu crachá: o gerente exige também uma senha especial, que só a administração conhece.

---

## 🔧 Tecnicamente

### O que é
- **JWT:** expira, representa uma sessão de usuário, exige fluxo de login, ideal para humanos. **Service token:** não expira automaticamente, representa uma integração, é reutilizável, ideal para sistemas e MCPs.
- **Custo da simplicidade:** se um token vaza, continua válido e pode ser usado indefinidamente. Sistemas reais precisam de revogação manual, rotação de tokens e monitoramento de uso.
- **Super secret (super admin):** credencial extra, usada apenas para autorizar a criação de tokens, ligada a administradores e painéis internos. Evita que qualquer usuário gere tokens à vontade.
- **Emissão:** rota que recebe `username`, `password` e o super secret. Valida primeiro o super secret (rejeita se errado), reaproveita a validação de usuário já existente, gera um identificador aleatório e devolve o token com o papel do usuário.
- **Armazenamento:** diferente do JWT (stateless), o service token precisa ser guardado: token, usuário associado e papel. A aula usa memória; em sistema real, banco ou outro armazenamento persistente.

### Como funciona
- **Dois caminhos no mesmo hook:** o token do header é procurado na estrutura de service tokens; se existe, o usuário é considerado autenticado e o contexto vai direto para a requisição; senão segue o fluxo de JWT.
- **Resultado unificado:** independentemente do método, a requisição fica com usuário e papel. O restante da aplicação, incluindo o RBAC, não sabe qual método foi usado. Um token de `admin` escreve; um de `member` só lê.
- **Header:** reutiliza `Authorization: Bearer` por simplicidade (uma prática comum seria um header dedicado) e o backend diferencia os tipos. Sem header, o fluxo não quebra: segue e responde 401.
- **Para o MCP:** gerar o token, guardar em variável de ambiente e reaproveitar automaticamente, no mesmo padrão de outros serviços externos.
- **Antes de produção:** persistência dos tokens, revogação, auditoria de uso, rotação periódica e proteção do super secret.

### Onde aplicar
- Dar a cada MCP ou integração um token próprio, com papel mínimo (um `member` para um agente só de leitura).
- Convivência de dois modelos: JWT para usuários, service token para sistemas.

### Vantagens e limites
**Vantagens**
- Sem login nem renovação para o consumidor.
- Identifica o cliente e permite aplicar papel e limite por token.

**Limites**
- Não expira: vazamento tem impacto longo.
- Precisa de armazenamento e de ciclo de vida (revogar, rotacionar).

### 🚫 Armadilhas
- Tratar service token como JWT e esperar expiração.
- Guardar tokens só em memória e esquecer que um restart os invalida.
- Deixar o super secret acessível a qualquer usuário.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Service token | Credencial opaca (UUID) de integração: reutilizável, sem expiração automática |
| adminSuperSecret | Segredo extra exigido para emitir service tokens |
| issuedServiceTokens | Mapa em memória: token, usuário e papel |
| Rotação | Trocar tokens periodicamente para limitar o dano de vazamentos |
| Revogação | Invalidar um token específico antes de qualquer expiração |

---

## 💻 No código do repo

**Projeto:** [07-api-security-auth-rate-limiting-z (service token na API)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z/nodejs-fastify-mongodb-crud-z)

Mesmo `src/auth.js` do tópico anterior: a rota `POST /v1/auth/service-token` e o mapa em memória que o hook `onRequest` consulta.

**Fluxo**
1. `ADMIN_SUPER_SECRET = 'AM I THE BOSS?'` e `const issuedServiceTokens = new Map()` em `src/auth.js`.
2. `POST /v1/auth/service-token`: body obrigatório `username`, `password`, `adminSuperSecret`; `401 Invalid adminSuperSecret` se o segredo não bate; depois a mesma busca de usuário do login (`401 Invalid credentials`).
3. Sucesso: `randomUUID()` como token, `issuedServiceTokens.set(serviceToken, { username, role })` e resposta `{ serviceToken, role }`.
4. No `onRequest`, `issuedServiceTokens.get(token)` acerta antes de qualquer verificação de JWT e define `request.user`.
5. `customers-mcp-z/getServiceToken.sh` emite um token de admin e um de member via `curl` e `jq` e testa a listagem com o de member.
6. `test/api.test.js`: bloco «POST /v1/auth/service-token» (token de admin, de member, super secret errado, credencial errada) e «Service token - API access & rate limiting».

**Como rodar**
- `curl -X POST localhost:9999/v1/auth/service-token -H 'Content-Type: application/json' -d '{"username":"erickwendel","password":"123123","adminSuperSecret":"AM I THE BOSS?"}'`.
- Use o `serviceToken` retornado como `Authorization: Bearer ...` nas rotas protegidas.

**Armadilhas e achados no código**
- **Verificado:** o `README.md` diz que o endpoint de service token é limitado a «3 requisições por minuto»; no código só existe o limite global de 90 por minuto (`REQUESTS_PER_MINUTE`). Seis emissões seguidas retornaram 200.
- Tokens vivem só na memória do processo: reiniciar a API invalida todos os service tokens e o MCP passa a receber 401 até você emitir outro.
- Quem tiver o super secret emite quantos tokens quiser, sem expiração nem revogação no código; e o segredo é comparado com `!==` (sem comparação em tempo constante) e está publicado no README e nos scripts.
- `.vscode/mcp.json` do MCP traz um UUID de service token commitado: só funciona enquanto aquele processo da API estiver vivo, mas acostuma o time a versionar credencial.
- Os comentários de `index.js` mostram o header alternativo `X-Service-Token`, não adotado.

**Template versus -z**
No **template** não existe a rota de emissão nem o mapa; os dois blocos de teste relacionados estão em `describe.skip`. O -z tem tudo implementado.

---

## 🔗 Para ir além
- [Indicação 3: Security Best Practices (MCP)](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices)
- [Código: 07-api-security-auth-rate-limiting-z](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica)

---

⬅️ [09 · Segurança da API: autenticação com JWT e autorização com RBAC](./09-jwt-and-rbac.md)  ·  [11 · Rate limiting: confiança zero, limite por token e resposta 429](./11-rate-limiting.md) ➡️
