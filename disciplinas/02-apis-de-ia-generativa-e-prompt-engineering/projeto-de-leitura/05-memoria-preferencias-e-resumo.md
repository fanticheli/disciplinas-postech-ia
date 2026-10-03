# 05 · Memória: preferências, SQLite, Postgres e resumo incremental

> **Unidade 4 · Aulas 1 a 4** · Leitura: ~13 min · Bloco: Memória e Segurança

## 🎯 Em uma frase
Memória é requisito em qualquer aplicação séria com LLM, e **contexto ilimitado é insustentável**: o desenho separa o histórico completo (checkpointer no Postgres) das **preferências** e do **resumo incremental** (camada enxuta no SQLite), e poda o histórico ativo depois de resumir.

---

## 👵 Explicando para a vovó

A senhora tem um garçom de confiança. Durante o jantar ele lembra de tudo da mesa (memória de curto prazo). Quando a conversa fica longa, anota num caderninho o essencial: «Dona Maria gosta de MPB». Depois pode esquecer a conversa e guardar só o caderninho.

Na semana seguinte ele abre o caderninho e pergunta: «A senhora ainda curte Gilberto Gil?». É isso que dá a sensação de que o sistema te conhece.

---

## 🔧 Tecnicamente

### O que é
- **Curto prazo:** histórico da conversa naquela thread, para manter coerência. **Longo prazo:** preferências estáveis (nome, idade, gêneros, bandas, artistas) injetadas no prompt como contexto pequeno e relevante.
- **Wrapper versus produto:** sem guardar contexto, aprender preferências e melhorar relevância, o sistema vira só um wrapper. A diferença está na personalização e na memória.
- **Extração de preferências:** o chat responde e também devolve, em JSON, se há algo para persistir (flag) e as preferências extraídas, incluindo um campo de informações adicionais (por exemplo «sou surfista»). Preferências podem ser atualizadas («agora me chama de Super Sayajin»).
- **Resumo incremental:** pega o resumo anterior, as mensagens recentes e as novas informações e gera um resumo atualizado, consolidando duplicatas e preservando o essencial. Ler o histórico inteiro pode revelar preferências que uma mensagem isolada não mostrava.

### Como funciona
- Divisão de armazenamento: **Postgres** (via Docker) guarda histórico completo, threads, checkpoints e metadados do LangGraph; **SQLite** (com query builder) guarda preferências e o resumo. Poderia ser um banco só; a escolha mostra que a estratégia depende do tipo de dado, do acesso e do custo operacional.
- Um `MemoryService` encapsula a configuração do Postgres com **store** e **checkpointer**; o checkpointer permite retomar uma conversa do ponto em que parou, até dias depois. O `setup` cria as tabelas (checkpoints, writes, migrations e store). Ambos são injetados via factory e passados ao `compile` do grafo.
- Fluxo: o chat extrai e sinaliza; se há algo a salvar, vai para `savePreferences`. O `userId` vem do runtime do LangGraph, depois de `state.userId`, depois «unknown» (o Studio pode variar). O `mergePreferences` une informações novas às antigas e substitui o velho pelo novo em conflito; depois o `extractedPreferences` é limpo do estado.
- Recuperação: o chat monta o `userContext` com o estado ou, se vazio, com `getBasicInfo` do `PreferencesService` (assíncrono). Ao reiniciar o CLI a conversa já começa personalizada.
- Quando resumir: regra objetiva pelo total de mensagens. Acima do limite (`maxMessagesToSummary` no config, valor baixo na demo) marca `needSummarization`, e o grafo vai para o `summarizeNode`.
- No resumo, o histórico vira lista role/content; se existir `conversationSummary`, ele vai junto como `previousSummary`. A chamada é structured output (`summarySchema`); em erro, `needSummarization` volta a false para não travar.
- Depois de resumir, mantém só as **duas mensagens mais recentes** e marca o resto com `RemoveMessage` pelo id. O node atualiza `messages`, `conversationSummary` e `needSummarization`.
- A demo é CLI, e não Web API, para o efeito da memória ficar claro no terminal.

### Onde aplicar
- Recomendadores e assistentes que precisam lembrar do usuário entre sessões.
- Chatbots de longa duração em que o custo de tokens precisa de teto.
- Qualquer produto em que personalização influencia adoção.

### Vantagens e limites
**Vantagens**
- Controla crescimento de tokens e custo mantendo a conversa coerente.
- Persistência permite continuar a thread dias depois.
- Camada enxuta de preferências é rápida de recuperar e pequena para o prompt.

**Limites**
- Mais infraestrutura (dois bancos, Docker) e mais chamadas de LLM para resumir.
- Qualidade semântica do resumo depende do modelo e não é validável com assert rígido.
- Resumir muito cedo custa uma chamada extra por turno.

### 🚫 Armadilhas
- Reenviar todo o histórico para sempre: o custo cresce e bate no limite de contexto.
- Testar a qualidade do resumo com assert rígido; a aula valida o caminho de execução (nó acionado, estado atualizado), não o texto.
- Número mágico para o limite de mensagens; ele vai no config.
- Template copiado incompleto (sem package.json, node_modules ou pasta de dados): apague e copie de novo.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Checkpointer | Persiste o estado do grafo por thread para retomar a conversa |
| Store | Armazenamento do LangGraph no Postgres |
| PreferencesService | Serviço de preferências e resumo no SQLite |
| mergePreferences | União incremental das preferências, o novo vence o velho |
| conversationSummary | Resumo acumulado da conversa |
| needSummarization | Flag que aciona o node de resumo |
| RemoveMessage | Remove mensagens do histórico ativo pelo id |
| maxMessagesToSummary | Limite do config que dispara o resumo |

---

## 💻 No código do repo

**Projeto:** [04-song-highlights-z (e 04-song-highlights-template)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms/04-song-highlights-z)

Chatbot recomendador de músicas no terminal com dois tipos de memória: a conversa por thread_id (checkpointer no Postgres) e o perfil de longo prazo do usuário (SQLite via Knex), alimentado por extração estruturada de preferências e por sumarização do histórico.

**Fluxo**
1. `src/index.ts` (CLI, `--user`) gera `threadId = userId-Date.now()`, passa `configurable.thread_id` e `context.userId` e carrega `preferencesService.getBasicInfo(userId)`.
2. `nodes/chatNode.ts` monta o system prompt com `userContext`, concatena o histórico como texto e chama `generateStructured(..., ChatResponseSchema)` (`{ message, preferences?, shouldSavePreferences }`). O prompt proíbe extrair o que a própria IA recomendou.
3. `savePreferencesNode` chama `PreferencesService.mergePreferences` (união de gêneros e bandas com Set, upsert por `user_id`).
4. `chatNode` calcula `needsSummarization = messages.length >= config.maxMessagesToSummary` (valor 2 no -z).
5. `summarizationNode`: LLM gera `SummarySchema` (inclui `keyPreferences`), `storeSummary` grava no SQLite e devolve `RemoveMessage` para todas menos as 2 últimas.
6. Roteamento em `nodes/edgeConditions.ts` (`routeAfterChat`, `routeAfterSavePreferences`); `services/memoryService.ts` chama `store.setup()` e `checkpointer.setup()`.

**Como rodar**
- `npm i` e `cp .env.example .env` (`OPENROUTER_API_KEY`).
- `npm run docker:up` (Postgres 5432, senha mysecretpassword, db song_recommender) e `npm run chat:erickwendel` (ou `chat:ana`); digite `exit` para sair.
- `npm test` (precisa de Postgres e API key) e `npm run docker:down`. Node >=24.10.

**Armadilhas e achados no código**
- `maxMessagesToSummary: 2` sumariza quase todo turno; o comentário no chatNode fala em 6, mas o valor é 2. Ótimo para demo, caro em produção.
- `userContext` fica congelado no estado: `state.userContext ?? getBasicInfo(...)` vem do checkpoint e não reflete preferências salvas depois na mesma sessão.
- Dois bancos: Postgres fora do ar derruba o `buildGraph` na subida; o `preferences.db` do SQLite é versionado no repo do -z. O `PostgresStore` é passado ao compile, mas nenhum node o usa.
- O README fala em `MemorySaver`, `OPENAI_API_KEY` e `npm run chat`; nada disso existe no código final.
- Suíte quase toda comentada: só «Deve manter histórico da conversa» roda, sem `assert`; passar não prova nada.
- O `package.json` lista sobras de experimentos (`@libsql/client`, `@xenova/transformers`, `@huggingface/*`) e não declara `@langchain/openai` nem `zod`, que vêm transitivamente.
- `getBasicInfo` só injeta nome, idade, gêneros, bandas e `keyPreferences`. O `important_context` (humor, contexto de escuta, informações adicionais como «sou surfista») é gravado mas não volta ao prompt do chat, e o `conversationSummary` do estado também não é lido pelo `chatNode`.
- `storeSummary` faz upsert que sobrescreve a linha do usuário com o que o LLM devolveu no resumo (campos ausentes viram `null`), enquanto `mergePreferences` faz união; o resumo pode apagar um dado que o merge tinha guardado.
- O `.env.example` traz `OPENROUTER_HTTP_REFERER` e `OPENROUTER_X_TITLE`, mas o `config.ts` não lê nenhuma das duas (usa `''` e um título fixo).

**Template versus -z**
O template tem grafo e roteamento prontos, mas `chatNode`, `savePreferencesNode` e `summarizationNode` são esqueletos, `graph.compile()` não tem persistência e o `index.ts` usa um `memoryService` fake (`store.search` devolvendo vazio). O -z implementa os nodes, o `memoryService.ts` (Postgres), o `PreferencesService` (SQLite), `config.maxMessagesToSummary` e `buildGraph(dbPath)` parametrizável (testes usam `./test-preferences.db`). Também mudam a ordem dos argumentos de `generateStructured` (system antes de user), o modelo e o userId (no template o threadId servia de userId; no -z é separado).

---

## 🔗 Para ir além
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms)

---

⬅️ [04 · Structured JSON e JSON Prompts: da linguagem natural à ação](./04-structured-json-e-json-prompts.md)  ·  [06 · Prompt injection: por que o System Prompt não é controle de acesso](./06-prompt-injection-limites-do-system-prompt.md) ➡️
