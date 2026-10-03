# 07 · Tools externas resilientes: erro como observação, timeout, retry e Zod

> **Unidade 3 · Aula 3** · Leitura: ~7 min · Bloco: Tools, persistência e MCP

## 🎯 Em uma frase
Toda tool que depende de rede nasce com três defesas: **timeout**, **retry limitado** e **validação da resposta com Zod**. A falha final **não é exceção**: vira uma string legível que entra no raciocínio como observação, e o agente continua com o que tem (**degradação controlada**).

---

## 👵 Explicando para a vovó

Se o motoboy não consegue falar com a loja parceira, ele não para a entrega inteira: avisa “não consegui confirmar a loja X, sigo com o que tenho” e o pedido principal continua. A falha vira informação, não pane.

---

## 🔧 Tecnicamente

### O que é
- **Erro como observação:** uma exceção interrompe o fluxo; uma observação pode ser lida pelo modelo, que decide tentar outro caminho ou avisar o plantonista da limitação. A resiliência passa a fazer parte do raciocínio.
- **Defesas de fábrica:** limitar o tempo de espera, repetir falhas transitórias poucas vezes e nunca confiar no JSON recebido, mesmo em resposta 200.
- **A tool de status:** consulta páginas públicas de status (GitHub e Cloudflare, sem chave) para ajudar a distinguir problema interno de indisponibilidade externa. O parâmetro é um enum fechado (GitHub como padrão) e a descrição diz quando usar (suspeita de problema externo, dependência fora do ar).
- **Spec da resiliência:** timeout de 5 s por tentativa via cancelamento nativo, no máximo duas tentativas (rede ou 5xx), validação Zod com indicador e descrição, retorno compacto numa linha (o resultado entra no contexto, então tamanho importa), falha final como string legível, `fetch` injetável para teste.
- **Testes sem internet:** três cenários mínimos com fetch fake: resposta válida, timeout e formato inválido.
- **Demonstração:** uma URL é invalidada de propósito; mesmo assim o ReAct combina a limitação com dados internos e abre o incidente pedido. Um copiloto de plantão que cai porque uma página de status caiu não serve no pior momento.

### Como funciona
- A referência de código mostra o schema da resposta externa (`indicator`, `description`), as URLs centralizadas por provedor, a função de consulta com `fetch` injetável e o tratamento da última tentativa: se há retry, volta ao laço; se acabou, devolve a mensagem de falha com a causa conhecida.
- A mensagem de falha também orienta o raciocínio seguinte: continue com os alertas internos e avise o plantonista de que a dependência não pôde ser verificada. Isso mostra, de forma concreta, “erro como observação”.
- As specs falam em “6 regras” de descrição de tool, e a lista muda de um documento para outro: a `spec.md` da 005 cita quando usar, o que retorna, o que não fazer, defaults, enums com `.describe()` e erros como observação; o contrato cita nome, o quê, quando usar, quando não usar, `.describe()` em todo campo e enums fechados. A U3 reescreve as descrições das tools existentes por essas regras.

### Onde aplicar
- Integrações com APIs de terceiros dentro de agentes: status, CRM, tickets.
- Qualquer tool em que a indisponibilidade não deve derrubar a resposta inteira.

### Vantagens e limites
**Vantagens**
- O agente continua útil com informação parcial e comunica a limitação.
- Teste determinístico, sem depender de GitHub ou Cloudflare.
- O trace registra a observação de falha, explicando decisões tomadas sem aquele dado.

**Limites**
- Engolir erro como texto pode esconder falhas se ninguém observar o trace.
- Retry sem backoff e sem jitter não é uma política completa de resiliência.

### 🚫 Armadilhas
- Retry infinito: toda repetição tem custo e latência; o teto precisa existir.
- Confiar no JSON de uma resposta 200 sem validar.
- Devolver estruturas enormes à tool e inflar o contexto do agente.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Erro como observação | Falha de ferramenta devolvida como texto que o modelo lê |
| AbortSignal.timeout | Cancelamento nativo de requisição por tempo |
| Retry limitado | Poucas tentativas para falhas transitórias (rede, 5xx) |
| Fetch injetável | A função de rede é parâmetro, para trocar por fake nos testes |
| Degradação controlada | Perder uma informação, preservar o resto da capacidade |
| statuspage.io | Formato das páginas públicas de status consultadas |

---

## 💻 No código do repo

**Projeto:** [03-function-calling-e-tool-use (tool de status de provedores)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use)

Spec 005: a tool check_provider_status com timeout, retry, Zod e fetch injetável, e a reescrita das descrições de todas as tools por regras de design de schema.

**Fluxo**
1. `src/tools/check-provider-status.ts`: `PROVIDER_URLS` (`githubstatus.com` e `cloudflarestatus.com`, `/api/v2/status.json`); `statusPageStatusSchema` (Zod, `status.indicator` e `status.description`, com `passthrough`); `fetchProviderStatus(provider, { fetch })` faz até 2 tentativas, `AbortSignal.timeout(5000)` em cada uma, retenta rede, timeout e 5xx, e devolve texto sem retry para 4xx e para JSON ou schema inválido. Nunca rejeita.
2. Sucesso: `<provider> está <indicator> - <description>`. Falha: “não consegui consultar o status de <provider> (<detalhe>). Responda com base nos alertas internos e avise o plantonista da limitação”.
3. `src/agents/tools.ts`: `createCheckProviderStatusTool` com `provider` como enum (github default, cloudflare) e descrição com “Quando usar / Quando não usar”; as demais tools seguem o mesmo formato.
4. `src/tools/check-provider-status.test.ts` (fetch fake): sucesso do GitHub, URL e formatação do Cloudflare, timeout com retry e erro legível, 5xx e depois sucesso, 4xx sem retry, corpo inválido e campos extras tolerados.

**Como rodar**
- `npm test` (esta suíte não usa rede).
- Pelo chat: “o GitHub está com problema?” com a estratégia react; para ver a degradação, altere uma URL em `PROVIDER_URLS` localmente (o código não tem flag para isso, a demo editou a URL).

**Armadilhas e achados no código**
- Não há espera entre tentativas: no pior caso são 2 timeouts de 5 s, cerca de 10 s para o agente.
- 429 (rate limit) é tratado como 4xx: a tool responde “respondeu HTTP 429” sem retry.
- A observação de erro embute uma instrução ao modelo (“Responda com base nos alertas internos…”). É texto do próprio código, não do provedor, mas é prompt dentro de dado de tool.
- As tools locais não seguem o padrão por completo: `resolve_incident` converte só `IncidentNotFoundError` em “Error: ...”; as demais exceções sobem.

---

## 🔗 Para ir além
- [Snapshot da Unidade 3 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use)
- [UNIDADE.md da Unidade 3](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use/UNIDADE.md)

---

⬅️ [06 · Persistência real com SQLite: OpsStore, checks e prepared statements](./06-sqlite-opsstore-e-prepared-statements.md)  ·  [08 · MCP: o OpsPilot como servidor de ferramentas, outra porta para a mesma aplicação](./08-mcp-servidor-do-opspilot.md) ➡️
