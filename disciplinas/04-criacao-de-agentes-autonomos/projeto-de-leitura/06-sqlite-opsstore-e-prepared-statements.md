# 06 · Persistência real com SQLite: OpsStore, checks e prepared statements

> **Unidade 3 · Aulas 1 e 2** · Leitura: ~7 min · Bloco: Tools, persistência e MCP

## 🎯 Em uma frase
A store em memória dá lugar a **SQLite** (`node:sqlite`) implementando o mesmo contrato **OpsStore**, de modo que estratégias e tools não mudam. A integridade vem em camadas: **TypeScript** (contrato), **Zod** (fronteira), **CHECKs do banco** e **prepared statements** (SQL injection).

---

## 👵 Explicando para a vovó

É trocar o quadro-negro da cozinha por um caderno de receitas encadernado: o garçom continua pedindo do mesmo jeito (o contrato), mas o que foi anotado não some quando apaga a luz. E o caderno tem regras na capa: só aceita tamanho P, M ou G, não qualquer coisa que o garçom escrever.

---

## 🔧 Tecnicamente

### O que é
- **Por que SQLite:** compatibilidade e praticidade do curso. Um banco externo exigiria Docker e configuração, e consumiria aula que deveria ir para agentes. Com `node:sqlite` nativo, a estrutura fica menor. Migrar para MySQL ou Postgres vira exercício: troca-se a implementação da store, não o raciocínio.
- **Constitution antes da spec:** como a decisão muda a arquitetura, a Constitution é atualizada primeiro, senão as fases seguintes leriam a regra antiga.
- **OpsStore como contrato:** a `SQLiteOpsStore` implementa a interface existente. O arquivo fica numa pasta de dados fora do Git; os testes e o benchmark usam `:memory:` (ou a store em memória) para ficar isolados e repetíveis. A composição normal usa SQLite; testes e bench injetam a store descartável.
- **Modelo:** quatro tabelas (services, alerts, incidents, runbooks); incidente guarda data de resolução e um `summary` nulo até resolver. Checks no banco para tier, severidade e status. DDL e seed idempotentes.
- **Prepared statements:** o valor entra como parâmetro, não como texto do SQL. É o que protege contra SQL injection quando o título de um incidente nasce de uma mensagem do usuário. Zod valida estrutura, o prepared statement protege a interpretação do SQL.
- **Tools:** entram `list_incidents` (default open) e a consulta de runbook por serviço, e as descrições são revisadas (a descrição é parte do prompt da tool).
- **Revisar o que o agente gerou:** o agente completou as demais tabelas a partir de uma referência de uma só, mas usou severidades diferentes das pedidas; a aula escolhe normalizar de forma explícita e manter um único significado por severidade. A prova de persistência é abrir incidentes, reiniciar o servidor e listar de novo.

### Como funciona
- O plano e as tarefas cobrem ajustes de dependências (sair do setup de banco anterior), tipos, `RunbookNotFoundError` como erro de domínio, seed, consultas, integração das tools e testes. As tarefas continuam do tamanho de um commit.
- Antes do implement, o autor escreve uma referência com a classe `SQLiteOpsStore` (caminho configurável, DDL no construtor), a tabela de incidentes completa e a query de listagem com filtro e ordenação por data de criação, deixando o agente completar o resto.
- Ele prefere ficar próximo do SQLite e dos prepared statements para entender as garantias; um ORM pode vir depois, sem perder de vista o que cada camada protege.

### Onde aplicar
- Qualquer agente com estado que precisa sobreviver ao processo: incidentes, tarefas, histórico.
- Testes de store com banco em memória, rápidos e isolados.

### Vantagens e limites
**Vantagens**
- Sem infraestrutura externa, o foco continua em agentes.
- Contrato de store permite trocar o banco depois sem tocar nas estratégias.
- Defesa em profundidade: tipos, Zod, CHECK e prepared statements.

**Limites**
- SQLite embutido não escala para múltiplos processos escrevendo muito.
- `node:sqlite` é experimental e exige Node recente.

### 🚫 Armadilhas
- Aceitar o schema que o agente gerou sem comparar com os valores de domínio definidos (a divergência de severidade da aula).
- Concatenar valores em SQL por conveniência.
- Deixar o arquivo do banco de desenvolvimento entrar no Git.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| OpsStore | Interface de persistência do OpsPilot (alertas, incidentes, runbooks) |
| node:sqlite / DatabaseSync | Driver SQLite nativo e síncrono do Node |
| :memory: | Banco SQLite descartável usado nos testes |
| CHECK | Restrição do banco que limita valores aceitos |
| Prepared statement | Comando SQL com parâmetros separados dos valores |
| DDL/seed idempotentes | Podem ser aplicados várias vezes sem duplicar ou destruir |
| normalizeSeverity | Mapeia sev1..sev4 e variações de caixa para critical, high, medium, low |

---

## 💻 No código do repo

**Projeto:** [03-function-calling-e-tool-use (store SQLite)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use)

Spec 004: a SqliteOpsStore com node:sqlite, tabelas com CHECK, seed idempotente e prepared statements, mais a normalização de severidade e as tools de incidentes e runbook.

**Fluxo**
1. `src/store/sqlite-ops-store.ts`: `DatabaseSync` com `CREATE TABLE IF NOT EXISTS` para `services` (tier), `alerts`, `incidents` (com `resolved_at` e `summary`) e `runbooks`, todos com `CHECK` nos campos fechados; statements preparados no construtor; `seed()` com `INSERT OR IGNORE`; `createIncident` gera `inc-<timestamp>-<4 hex>`; `getRunbook` lança `RunbookNotFoundError`. Caminho de `OPSPILOT_DB` (default `./data/opspilot.db`) ou `:memory:`.
2. `src/domain/severity.ts`: `normalizeSeverity` aceita sev1..sev4 e a caixa do texto e devolve critical, high, medium ou low; é aplicado por `z.preprocess` no schema de `open_incident`.
3. `src/domain/types.ts`: `OpsStore` (seed, getAlerts, getIncidents, createIncident, resolveIncident, getRunbook), implementada por `InMemoryStore` (testes e bench) e por `SqliteOpsStore`.
4. `src/store/seed.ts` e `seed-data.json`: o seed do “Mercadinho” com 5 serviços e tier (checkout e payments critical, auth high, catalog e inventory standard), 6 alertas (3 firing) e 3 runbooks (checkout, payments, auth).
5. `src/tools/list-incidents.ts` e `consultar-runbook.ts` (re-exportam as factories de `src/agents/tools.ts`); `src/index.ts` abre `SqliteOpsStore` e roda o seed.

**Como rodar**
- `npm run dev` e um `POST /chat` pedindo para abrir um incidente de checkout; encerre o servidor, suba de novo e peça os incidentes abertos.
- `OPSPILOT_DB=:memory:` para uma execução efêmera; `npm test` usa `:memory:` (precisa de Node 22 com `node:sqlite`).

**Armadilhas e achados no código**
- A descrição do alerta `alert-005` (serviço `catalog`) continua “Email delivery queue stalled”, resquício do serviço `notification-worker` da U2.
- O seed só tem runbook para checkout, payments e auth. O serviço “notifications”, usado em demos da apostila e no script de conversa longa, não existe, e `createIncident` não valida o serviço (sem chave estrangeira): o agente abre incidente para serviço inexistente.
- `resolveIncident` não exige status open: resolver duas vezes reescreve `resolved_at` e `summary` (o UPDATE não filtra por status).
- Cada store abre sua própria conexão no mesmo arquivo e não há `journal_mode` nem `busy_timeout` no código; hipótese: sob escrita concorrente pode haver SQLITE_BUSY (não testei).
- `node:sqlite` não existe no Node 20 (testei: ERR_UNKNOWN_BUILTIN_MODULE); no Node 22.16 os testes passaram com um aviso de recurso experimental. O `.gitignore` ignora `data/`.

---

## 🔗 Para ir além
- [Snapshot da Unidade 3 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use)
- [UNIDADE.md da Unidade 3](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use/UNIDADE.md)

---

⬅️ [05 · Uma API que também é um agente: POST /chat, registry e testes sem rede](./05-api-que-tambem-e-um-agente.md)  ·  [07 · Tools externas resilientes: erro como observação, timeout, retry e Zod](./07-tool-externa-resiliente.md) ➡️
