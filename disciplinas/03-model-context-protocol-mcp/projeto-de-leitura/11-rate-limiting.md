# 11 · Rate limiting: confiança zero, limite por token e resposta 429

> **Unidade 6 · Aula 4** · Leitura: ~8 min · Bloco: Segurança e governança

## 🎯 Em uma frase
Parta do princípio de **confiança zero**: um cliente legítimo pode entrar em loop, errar na implementação ou ser abusado. O **rate limiting** é a terceira camada, depois de autenticação e autorização: define máximo de requisições por janela, identifica o cliente (pelo token, com IP de reserva) e responde **429** quando o teto estoura.

---

## 👵 Explicando para a vovó

Um restaurante com garçons treinados (autenticação) e cardápio por mesa (autorização) ainda põe um limite: cada mesa pode pedir no máximo certo número de pratos por minuto. Quem normalmente pede 10 e de repente pede 1000 está com problema, ou é golpe.

O limite protege a cozinha e o caixa, principalmente quando cada prato consome um ingrediente caro (como chamar um modelo de linguagem pago).

---

## 🔧 Tecnicamente

### O que é
- **Confiança zero:** não assuma que o cliente se comporta bem; loops acidentais, erros de implementação, uso indevido e ataques automatizados acontecem.
- **Por que é essencial:** um salto de 10 para 1000 requisições por minuto pode indicar bug, abuso ou ataque; e, se a API consome serviços pagos por requisição ou token (modelos de linguagem), sem controle há custo inesperado e até indisponibilidade.
- **Camada adicional:** mesmo autenticado e autorizado, o cliente respeita limites. É prática padrão em API pública madura.
- **Configuração central:** quantidade máxima de requisições e janela de tempo (exemplo da aula: 90 por minuto). Janela por minuto tolera picos melhor que por segundo.
- **Quem é o cliente:** a própria credencial de autenticação (JWT ou service token); sem token, o IP serve de fallback. Isso reaproveita o padrão do header de autorização e mantém consistência entre autenticação e limite.
- **Plugin do framework:** resolve contagem, janela, bloqueio automático e resposta padronizada, em vez de reinventar.

### Como funciona
- **Teste com limite baixo:** a aula usa 1 requisição por minuto para reproduzir fácil (a primeira passa, a segunda falha) e depois restaura o valor real.
- **Resposta de erro:** código **429 Too Many Requests**, com mensagem de limite excedido e quando tentar de novo, o que permite ao cliente implementar retry sem agressividade.
- **Limite por token:** dois clientes não competem entre si; cada integração tem seu controle de uso. Usuários de JWT também são limitados individualmente.
- **Rotas públicas:** o fallback por IP mitiga ataques simples em endpoints abertos.
- **Impacto no MCP:** MCPs automatizam chamadas, encadeiam operações e executam tarefas em sequência; sem limite podem gerar carga muito alta. O limite evita sobrecarga, controla custo e mantém estabilidade.
- **Evolução para produção:** limites por tipo de cliente, planos (free, premium), monitoramento e métricas, bloqueio automático por comportamento suspeito.

### Onde aplicar
- Proteger APIs consumidas por agentes, que podem chamar em sequência e em loop.
- Separar tetos por papel ou plano em vez de um valor único.

### Vantagens e limites
**Vantagens**
- Protege disponibilidade e custo com pouco código (plugin).
- O 429 dá ao cliente um sinal claro para recuar.

**Limites**
- Limite por token pode ser contornado criando vários tokens (a própria aula cita combinar token e IP).
- O valor certo depende do perfil da aplicação: ou barra uso legítimo, ou deixa abuso passar.

### 🚫 Armadilhas
- Limitar por segundo de forma rígida e prejudicar picos legítimos.
- Achar que autenticação e autorização dispensam controle de volume.
- Esquecer de restaurar o limite alto depois de testar com valor baixo.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Rate limiting | Teto de requisições por cliente numa janela de tempo |
| 429 | Too Many Requests: resposta quando o limite é excedido |
| keyGenerator | Função que decide quem é o cliente do limite (aqui, token ou IP) |
| timeWindow | Janela de contagem (1 minuto no projeto) |
| Confiança zero | Não presumir bom comportamento do cliente, mesmo autenticado |

---

## 💻 No código do repo

**Projeto:** [07-api-security-auth-rate-limiting-z (rate limit na API)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z/nodejs-fastify-mongodb-crud-z)

O limite é configurado em `src/config.js` e `src/auth.js` e registrado em `src/index.js` com `@fastify/rate-limit`.

**Fluxo**
1. `src/config.js`: `export const REQUESTS_PER_MINUTE = 90`.
2. `src/auth.js`: `rateLimitOptions = { max: REQUESTS_PER_MINUTE, timeWindow: '1 minute', keyGenerator: (request) => request.headers?.authorization?.replace(/bearer /i, '') ?? request.ip }`.
3. `src/index.js`: `await fastify.register(fastifyRateLimit, rateLimitOptions)`, depois do JWT e antes de `initAuthRoute`.
4. `test/api.test.js` (bloco «Service token - API access & rate limiting»): emite um service token, faz `REQUESTS_PER_MINUTE` chamadas a `GET /v1/customers` esperando 200 e a próxima esperando 429. Importa a constante em vez de usar o 1 req/min da aula.

**Como rodar**
- Com a API de pé, em loop: `for i in $(seq 1 100); do curl -s -o /dev/null -w '%{http_code}\n' localhost:9999/v1/customers -H "Authorization: Bearer $SERVICE_TOKEN"; done | sort | uniq -c` deve mostrar 200 e depois 429.
- Para ver o efeito rápido, baixe `REQUESTS_PER_MINUTE` em `config.js` (o teste acompanha a constante).

**Armadilhas e achados no código**
- **Verificado:** 95 requisições seguidas com o mesmo token **inválido** responderam sempre 401, nenhuma 429. O hook global de autenticação responde 401 antes do limitador (que atua por rota), então tentativas com token inválido não são limitadas: dá para tentar adivinhar tokens sem teto. A causa que apontei (ordem dos hooks) é hipótese; o resultado observado é certo.
- **Verificado:** em rotas públicas o limite por IP funciona: repetir `POST /v1/auth/login` com senha errada passou a retornar 429.
- A chave do limitador é o header bruto, sem validar: como service tokens são ilimitados para quem tem o super secret, o contorno por múltiplos tokens citado pela aula é fácil.
- Só há um teste de limite, com service token; não há teste para JWT nem para o fallback por IP (que a aula descreve).
- No contêiner, o IP visto pela API pode ser o do proxy ou do Docker, o que afetaria o fallback por IP (hipótese, não testei).

**Template versus -z**
O **template** não tem `rateLimitOptions` nem o registro do plugin e o teste de limite está em `describe.skip`.

---

## 🔗 Para ir além
- [Indicação 3: Security Best Practices (MCP)](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices)
- [Código: 07-api-security-auth-rate-limiting-z](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica)

---

⬅️ [10 · Service tokens: credencial persistente para MCPs e integrações](./10-service-tokens.md)  ·  [12 · O MCP como cliente real da API: service token obrigatório e erros estruturados](./12-mcp-with-service-token-and-errors.md) ➡️
