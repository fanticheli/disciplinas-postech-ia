# 13 · Observabilidade e limites de autonomia: trace persistido, logs, métricas e aprovação humana

> **Unidade 7 · Aula 1** · Leitura: ~8 min · Bloco: Grafo de produção, observabilidade e governança

## 🎯 Em uma frase
Observabilidade em agente é reconstruir **rota, modelo, tools, observações e justificativas** de cada requisição, com três sinais (**trace persistido, logs JSON, métricas**) ligados por um **requestId**, mais uma **matriz de autonomia**: o que o agente faz sozinho, o que registra, o que exige aprovação e o que é proibido.

---

## 👵 Explicando para a vovó

É a caixa-preta do avião mais o painel de voo: a caixa-preta (trace) conta a viagem inteira depois do fato; o diário de bordo (logs) registra eventos soltos; os instrumentos (métricas) mostram tendência. E o manual de bordo diz o que o piloto automático pode fazer sozinho e o que sempre pede o capitão.

---

## 🔧 Tecnicamente

### O que é
- **Por que é diferente em agentes:** duas execuções parecidas podem seguir trajetórias diferentes. Importam rota, modelo, tools, observações e justificativas que influenciaram o grafo, não o raciocínio interno irrestrito do modelo.
- **Três sinais:** trace persistido (sequência de eventos por requisição), logs estruturados em JSON (só metadados, sem vazar prompt, segredo ou conteúdo) e métricas agregadas (requisições, erros, tokens, latência por rota e modelo). Métrica mostra tendência, log mostra evento, trace mostra a trajetória.
- **Matriz de autonomia:** quatro faixas. (1) decide sozinho (baixo risco, reversível: consultar alertas). (2) decide e executa, mas registra de forma auditável (abrir ou resolver incidente). (3) pede aprovação (ações destrutivas, silenciar recursos, apagar histórico, gasto acima de um teto). (4) proibido, mesmo com aprovação (apagar a própria trilha de auditoria, vazar dados de usuário).
- **requestId como eixo:** identificador da requisição devolvido ao cliente e usado para ligar resposta, registro persistido, eventos de trace, logs e métricas.
- **Auditoria e métricas na aula:** o registro da requisição guarda usuário, rota, modelo, tokens, latência e status; os eventos guardam sequência, nó, tipo e payload. Uma rota consulta a execução pelo requestId, com eventos ordenados. Uma rota de estatísticas das últimas 24 horas dá total, erros, tokens, custo estimado e p50 e p95 por rota e modelo.
- **Resultado visto na aula:** “resolva o incidente mais antigo” foi para Plan-and-Execute, e o trace mostrou a justificativa do roteador, o plano (listar, identificar o mais antigo, resolver), o modelo, o orçamento de contexto e cerca de um minuto e meio de latência.
- **Da auditoria à operação:** a aula cita Grafana e afins como extensão e relaciona p95 alto ou rota cara frequente a decisões de ajuste do roteador, do fallback ou da configuração principal.

### Como funciona
- A spec pede `requests` e `trace_events` no SQLite, um logger dedicado com uma linha JSON por evento e uma rota de consulta; a referência mostra o nó de resposta como ponto de persistência: salvar o requestId, usuário, rota, modelo, tokens, latência e status; percorrer os eventos e salvá-los na ordem; emitir um log estruturado.
- O ‘human-in-the-loop’ é um extra do repositório: com `awaitHumanApproval: true` o chat não executa, guarda a requisição e responde 202; a decisão do plantonista executa ou descarta.

### Onde aplicar
- Auditar por que um agente tomou uma decisão horas depois, sem reproduzir.
- Medir custo e latência por rota e modelo, e ajustar roteador e fallback com dados.
- Pôr aprovação humana antes de ações de maior impacto.

### Vantagens e limites
**Vantagens**
- Investigação por requestId sem abrir código nem usar debugger.
- Logs que nunca vazam conteúdo (a regra virou teste).
- p50 e p95 por rota e modelo apontam onde otimizar.

**Limites**
- Persistir trace aumenta armazenamento e exige política de retenção (não implementada).
- O custo é estimado, não faturado.

### 🚫 Armadilhas
- Logar prompt, resposta ou segredo “para depurar”.
- Ter eventos corretos sem um identificador que os una.
- Tratar aprovação como se fosse a matriz de autonomia inteira.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| requestId | Chave de correlação de resposta, registro, trace e logs |
| Trace persistido | Eventos da execução gravados em ordem (tabelas requests e trace_events) |
| Log estruturado | Uma linha JSON por evento, só com metadados escalares |
| p50 / p95 | Latência típica e latência da cauda lenta |
| Matriz de autonomia | Quatro faixas: sozinho, com registro, com aprovação, proibido |
| HIL | Human-in-the-loop: aprovação humana antes de executar |

---

## 💻 No código do repo

**Projeto:** [07-observabilidade-e-limites-de-autonomia](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/07-observabilidade-e-limites-de-autonomia)

Spec 015 (trace persistido, logs e stats) e a aprovação humana por flag. O snapshot 07 é a mesma árvore do 06; citei também arquivos do snapshot final.

**Fluxo**
1. `src/store/sqlite-request-store.ts`: tabelas `requests` (`status` success ou error, `metrics_json`, rota, modelo) e `trace_events` (`seq`, `type`, `node`, `content`, `payload_json`, único por requisição e sequência); `save` em transação (BEGIN/COMMIT/ROLLBACK), `getById` e `stats(sinceMs)`.
2. O nó `resposta` do grafo chama `persistTurnAudit` (falha de persistência vira log `request_persist_failed`, sem derrubar o turno) e emite o log `chat_request_end`.
3. `src/http/server.ts`: cabeçalho `X-Request-Id`; `GET /requests/:id` (UUID; 404 `request_not_found`) devolve o registro e o trace ordenado; `GET /stats?since=24h` aceita `ms|s|m|h|d` e devolve total, erros, tokens, `costUsd`, latência p50 e p95, `byRoute` e `byModel`.
4. `src/obs/logger.ts`: JSON por linha com `ts`, `level` e `event`; remove as chaves proibidas (`message`, `answer`, `trace`, `content`, `payload`, `toolArgs`, `body`, `prompt`) e aceita só valores escalares.
5. `src/obs/request-stats.ts`: `percentile` (nearest-rank), `parseSinceDuration` e `estimatePromptCostUsd` (US$ 0,15 por milhão de tokens de prompt; modelos com `:free` custam 0).
6. Aprovação humana: `MemoryApprovalStore` (`save`, `get`, `take`); com `awaitHumanApproval: true` o `/chat` responde 202 com `pending.approvalId`; `POST /approvals/:approvalId` recebe `{decision: "approve" | "deny", userId}`; aprovar executa a requisição guardada com um novo `requestId`; negar devolve “Ação cancelada pelo plantonista.” sem chamar o modelo.

**Como rodar**
- `npm run dev`; faça um `POST /chat`, copie o `requestId` e rode `curl localhost:3000/requests/<requestId>` e `curl "localhost:3000/stats?since=24h"`.
- `curl -X POST localhost:3000/chat -d '{"message":"resolva o incidente mais antigo","userId":"u1","awaitHumanApproval":true}'` e depois `curl -X POST localhost:3000/approvals/<approvalId> -d '{"decision":"approve","userId":"u1"}'`.
- `npm test`.

**Armadilhas e achados no código**
- O UNIDADE.md da U7 sugere `-d '{"approve":true}'` para aprovar; o schema real exige `{decision, userId}` e a chamada retornaria 400.
- Bug verificado: `TRACE_PAYLOAD_KEYS` não inclui `to`. Rodei `SqliteRequestStore` em memória com um evento `handoff` e `to: "analista"`: o `getById` devolveu `{"type":"handoff","node":"supervisor","content":"brief"}`, sem o destino. O handoff do modo equipe perde o `to` na auditoria (só aparece na resposta ao vivo).
- O status `error` existe no schema, mas nada o grava: só o nó `resposta` salva (sempre `success` e 200) e o handler de erros não persiste. Logo `/stats.errors` tende a zero e 504, 503 e 400 não deixam registro em `requests`.
- A apostila diz que o `requestId` pode vir no corpo ou em header; o código sempre gera `randomUUID()` e o schema do chat não tem `requestId`.
- As aprovações ficam num `Map` em memória (somem no restart, sem expiração). Divergência entre o `userId` da aprovação e o da requisição só gera o log `approval_user_mismatch`; não bloqueia. A aprovação cobre a requisição inteira, não uma tool específica.
- Divergências com o UNIDADE.md: ele diz que o `/stats` não calcula dólares, mas `estimatePromptCostUsd` existe desde o snapshot 06 (só tokens de prompt, taxa única); o contrato de autonomia em quatro faixas (AUTONOMIA.md), o teto de custo com 429 e a tool `silence_all_alerts` com `interrupt()` do LangGraph não foram implementados.

---

## 🔗 Para ir além
- [Snapshot da Unidade 7 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/07-observabilidade-e-limites-de-autonomia)
- [UNIDADE.md da Unidade 7](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/07-observabilidade-e-limites-de-autonomia/UNIDADE.md)

---

⬅️ [12 · LangGraph no OpsPilot: grafo de produção, roteador estruturado e fallback de modelo](./12-langgraph-roteador-e-fallback.md)  ·  [14 · War Room: interface web sobre a mesma API e publicação no GitHub Pages](./14-war-room-e-github-pages.md) ➡️
