# 07 · Serper, adapter de busca e fallback web com TTL

> **Unidade 2 · Aulas 10 e 11** · Leitura: ~12 min · Bloco: Unidade 2 · Orquestração cognitiva e APIs

## 🎯 Em uma frase
Quando o **grade** marca o contexto como insuficiente, o agente busca na web por um **SearchProvider** (padrão adapter, Serper por padrão). O nó **webSearch** pesquisa só os `missingAspects`, lê as 3 primeiras páginas, divide em chunks de ~1000 caracteres (overlap 100), embeda e grava em `documentos_web` com **TTL de 7 dias**; o retrieve passa a consultar as duas tabelas.

---

## 👵 Explicando para a vovó

Você pergunta ao arquivista algo que não está nas pastas. Ele vai à biblioteca da cidade, só procura o pedaço que faltava, tira cópias das páginas úteis e guarda no próprio arquivo com um carimbo de validade. Na próxima vez que alguém perguntar algo parecido, a resposta já está na casa.

Mas notícia estraga: depois de uns dias o carimbo vence, a cópia deixa de ser consultada e ele vai buscar de novo.

---

## 🔧 Tecnicamente

### O que é
- **Aula 10**: corpus CVM só tem números. Pergunta qualitativa ou trimestre ausente deixa o grade marcar insuficiente e o agente precisa de um provedor de busca na web.
- O **Google Custom Search** foi depreciado: não aceita novas chaves e quem tem chave precisa migrar até 1º de janeiro de 2027. O projeto usa o **Serper**: até 2.500 queries grátis, sem cartão, sem free tier permanente depois disso.
- A chave fica em `SERPER_API_KEY` (env ou Secret Manager), nunca no código. Se vazar, mesmo em repo privado, **invalide a credencial** (reset/apagar e criar outra); apagar do histórico não resolve.
- **Padrão adapter**: interface mínima `SearchProvider { search(query): Promise<SearchResult[]> }` com `SearchResult { title, snippet, url }`. Duas implementações com `fetch` nativo, sem SDK. `SEARCH_PROVIDER` escolhe (default serper). Testes com `vi.stubGlobal` no fetch, sem gastar cota.
- **Aula 11, nó web_search**: recebe `question` e `missingAspects`. Uma query por aspecto (`${question} ${aspecto}`) ou só a pergunta se a lista é vazia. Mandar a pergunta inteira anularia o grade.
- Por query: 3 primeiros resultados, `fetch` do HTML com timeout de 10 s, extração de texto sem tags, chunks de ~1000 caracteres com overlap 100, embedding por chunk (mesmo cliente do retrieve), um registro por chunk em `documentos_web` (query, title, content, sourceUrl, fetchedAt, expiresAt).
- Página fora do ar ou timeout: ignora o resultado e segue, sem derrubar o nó.
- **TTL** (dias, default 7): notícia pode deixar de ser válida e é menos confiável que a CVM; o corpus CVM é estático e perene, não expira. O TTL é aplicado **na consulta** (WHERE), não por cron (um cron de limpeza é opcional).
- **Retroalimentação**: 1ª pergunta qualitativa (ex.: fato relevante e preço das ações da Totvs) gera busca web e grava; uma pergunta parecida depois acha CVM + web no retrieve e o grade considera suficiente, sem nova busca. Depois de 7 dias o ciclo recomeça.
- Harness: padrões repetidos viram skills ('testar sempre com fakes', 'adapter para terceiros'). O `!` roda comandos sem gastar tokens.

### Como funciona
- 1) Prompt da Aula 10: `packages/agent/src/search` com `SearchProvider`, `makeSerperProvider(apiKey)` (POST `https://google.serper.dev/search`, header `X-API-KEY`, corpo `{ q }`, mapeia `organic[]`) e `makeGoogleCustomSearchProvider(apiKey, cx)` (GET customsearch/v1, mapeia `items[]`).
- 2) `criarSearchProvider()` em `index.ts` lê `SEARCH_PROVIDER`, valida as variáveis da chave e lança erro claro se faltar ou se o provider for desconhecido.
- 3) Criar a chave no dashboard do Serper e exportar `SERPER_API_KEY`; rodar os testes do provedor (fetch fake).
- 4) Prompt da Aula 11: nó `packages/agent/src/nodes/web-search.ts` (`makeWebSearchNode`) com tabela nova `documentos_web`, TTL em dias (default 7) e testes com fakes.
- 5) Estender `buscarDocumentosSimilares` (o do retrieve): select em `documentos` e outro em `documentos_web` com `expires_at > now`, combinados e ordenados só pela distância.
- 6) O Claude Code também criou a tabela no ORM com migration e índice HNSW, ajustou o grade à nova regra e criou os testes.
- 7) Fluxo no grafo: grade (insuficiente) → webSearch (grava) → retrieve (agora acha) → grade.

### Onde aplicar
- Agentes que precisam de fallback para fonte aberta quando a base interna não cobre a pergunta.
- Qualquer integração com API de terceiro que possa ser trocada: contrato mínimo + adapter + fábrica por env.
- Cache semântico com validade: gravar o resultado caro numa tabela vetorial com `expires_at`.
- Testes de integrações pagas sem consumir cota (fetch fake).

### Vantagens e limites
**Vantagens**
- Troca de fornecedor por variável de ambiente, sem mexer no agente.
- Buscar só o que falta reduz custo e ruído.
- Retroalimentar o RAG poupa custo e latência nas perguntas seguintes.
- TTL na leitura é simples: sem job de limpeza para garantir validade.

**Limites**
- Conteúdo da web é menos confiável que a CVM e entra no mesmo contexto.
- Cada página vira vários embeddings e várias gravações (custo e latência do nó).
- Sem limpeza, a tabela de web acumula linhas expiradas.
- Serper some do free tier depois de 2.500 queries.

### 🚫 Armadilhas
- Colocar a API key no código ou no repo: invalide a chave, não basta apagar.
- Mandar a pergunta inteira à busca e jogar fora o trabalho do grade.
- Sem timeout no fetch da página: o nó pode travar o grafo inteiro.
- Esquecer o filtro de expiração: o agente serve notícia velha para sempre.
- Misturar fornecedor no código do agente: o adapter existe para isso não acontecer.

> 💡 Se o dado muda com o tempo, grave a data de expiração no registro e filtre na leitura; limpar com cron é otimização, não garantia.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| SearchProvider | Interface mínima de busca: search(query) devolve title, snippet, url. |
| Adapter | Padrão que esconde o fornecedor atrás de um contrato. |
| Serper | API de busca Google, 2.500 queries grátis sem cartão. |
| Google Custom Search | Serviço depreciado; migrar até 1º/01/2027. |
| SEARCH_PROVIDER | Variável que escolhe serper (default) ou google. |
| missingAspects | O que falta, vindo do grade; vira a query. |
| Chunk | Pedaço de texto (~1000 caracteres, overlap 100) com embedding próprio. |
| TTL | Time to live: validade do dado, 7 dias por padrão. |
| Retroalimentação | Gravar no RAG o que veio da web para a próxima pergunta. |
| documentos_web | Tabela dos chunks web com expires_at. |

---

## 💻 No código do repo

**Projeto:** [packages/agent (src/search/, src/nodes/web-search.ts, src/web-search/, src/db/retrieve-similar.ts, src/db/upsert-web-document.ts, src/db/schema.ts)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src)

Li todo o módulo de busca, o nó, os helpers de chunk, extração e conversão para linha, e a consulta combinada. Não executei os testes (search/*.test.ts, web-search.test.ts).

**Fluxo**
1. `search/types.ts`: `SearchResult { title, snippet, url }` e `SearchProvider`.
2. `search/serper.ts`: `makeSerperProvider`, POST com `X-API-KEY`, `AbortSignal.timeout(10_000)`, erro se `!response.ok`, mapeia `organic` (link vira url).
3. `search/google-custom-search.ts`: GET com `key`, `cx`, `q`; mapeia `items`.
4. `search/index.ts`: `criarSearchProvider()`; `DEMO=true` devolve fixture; senão `SEARCH_PROVIDER ?? 'serper'`, exige `SERPER_API_KEY` (ou `GOOGLE_CUSTOM_SEARCH_API_KEY` + `GOOGLE_CUSTOM_SEARCH_CX`) e embrulha em `comResiliencia`.
5. `search/resilient-search-provider.ts`: retry com backoff (3 tentativas, base 200 ms, dobra) e circuit breaker (3 falhas consecutivas abrem por 30 s; cada falha contada é uma chamada de `search()` que já esgotou as 3 tentativas do retry, ou seja, 9 chamadas reais ao provedor); `CircuitoAbertoError`.
6. `nodes/web-search.ts`: `RESULTADOS_POR_QUERY = 3`, `TTL_PADRAO_DIAS = 7`; queries por aspecto; try/catch por busca e por página; um embedding por chunk via `embedQuery`; devolve `{}` (o efeito é a escrita no banco).
7. `web-search/chunk.ts`: `RecursiveCharacterTextSplitter` com `chunkSize 1000`, `chunkOverlap 100`; `extract.ts`: `html-to-text` e `buscarPagina` com timeout de 10 s; `to-row.ts`: `expiresAt = fetchedAt + ttlDias * 24h`.
8. `db/retrieve-similar.ts`: `buscarNaWeb` filtra `gt(expiresAt, new Date())`; `combinarResultados` junta corpus e web e ordena por distância.

**Como rodar**
- `export SERPER_API_KEY=...` (nunca no repo)
- `pnpm --filter @hero/agent test` (não executei)
- `SEARCH_PROVIDER=google` exige `GOOGLE_CUSTOM_SEARCH_API_KEY` e `GOOGLE_CUSTOM_SEARCH_CX`
- `DEMO=true` usa fixtures de busca e de página, sem rede

**Armadilhas e achados no código**
- Achado: a aula diz que o Claude Code 'alterou a tabela de documentos para registrar a origem'; no código `documentos_web` é uma tabela separada e a origem é inferida por `ticker` ausente (`RetrievedDoc.ticker?`, `title?`). A tabela `documentos` não tem coluna de origem.
- Achado: o título da aula fala em 'upsert retroativo', mas `db/upsert-web-document.ts` faz só `insert()`. Rodar a mesma pergunta depois do TTL grava chunks duplicados da mesma URL (os expirados ficam na tabela). Não há cron de limpeza no repo que eu tenha encontrado.
- Achado: `search/index.ts` envolve os providers em retry e circuit breaker, que a aula não menciona; e o nó engole erro do provider (`catch { continue }`) para degradar sem derrubar o grafo.
- Achado: o nó faz um `embedQuery` por chunk, em série, e não em lote como o seed (`embedDocuments`).
- Achado: o SearchResult traz `snippet`, mas o nó não o usa: grava o texto extraído da página inteira.

---

## 🔗 Para ir além
- [packages/agent/src/search](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/search)
- [packages/agent/src/nodes/web-search.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/nodes)
- [Serper](https://serper.dev/)
- [Capstone Project AI Researcher](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)

---

⬅️ [06 · Os nós retrieve e grade](./06-retrieve-and-grade-nodes.md)  ·  [08 · O grafo real: aresta condicional e guard do loop](./08-real-graph-conditional-edge-and-loop-guard.md) ➡️
