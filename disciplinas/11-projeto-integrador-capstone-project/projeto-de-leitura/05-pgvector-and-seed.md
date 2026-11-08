# 05 · pgvector, embeddings e o script de seed

> **Unidade 2 · Aula 8** · Leitura: ~9 min · Bloco: Unidade 2 · Orquestração cognitiva e APIs

## 🎯 Em uma frase
O RAG do projeto é uma busca de **proximidade por cosseno** entre o embedding da pergunta e o de cada documento, no **Postgres com pgvector**. A tabela `documentos` nasce por migration Drizzle (vector(768) + índice **HNSW**) e o `pnpm seed` gera os embeddings no Vertex AI em lotes de 10 e grava com upsert por (ticker, period).

---

## 👵 Explicando para a vovó

Pense numa biblioteca onde, em vez de organizar os livros por título, alguém coloca cada livro numa posição de um mapa gigante, e livros que falam de coisas parecidas ficam perto. Quando você faz uma pergunta, ela também vira um ponto no mapa e o bibliotecário devolve os livros mais próximos desse ponto.

O índice HNSW é um atalho de bibliotecário: em vez de medir a distância até todos os livros, ele anda por andares do mapa e chega rápido na região certa. Quase sempre acerta, mas de vez em quando deixa passar um livro que estava logo ali.

---

## 🔧 Tecnicamente

### O que é
- **RAG** (apostila): dada a pergunta, achar entre centenas de documentos os poucos que a respondem e entregá-los como contexto. Os dados da CVM (já normalizados em JSON na Unidade 1) vão para um banco em vez de o agente buscar tudo sozinho, para reduzir alucinação e pegar informação incorreta.
- Busca textual (`LIKE`) falha porque depende das mesmas palavras: 'rentável' não casa com 'rentabilidade'. O banco vetorial resolve por significado, não por string.
- **Embedding**: matriz numérica de N dimensões que representa um texto. A pergunta também vira embedding na etapa de retrieve, e o banco calcula a proximidade entre os pontos.
- **Top-k**: os k pontos mais próximos da pergunta (3, 10, conforme config). O banco traduz os pontos de volta em texto e eles entram no prompt. Menos alucinação não é alucinação zero: a arquitetura precisa de uma conferência.
- **pgvector** habilita o Postgres como banco vetorial sem infra nova (alternativas citadas: Pinecone, Weaviate, bancos vetoriais das nuvens). O SQL continua o mesmo, mudam o tipo `vector` e os operadores de distância (simples, cosseno, produto interno). O projeto usa **cosseno**.
- **HNSW** organiza os registros em camadas. Sem índice, a busca é full scan (aceitável com os 80 registros do projeto); com índice é rápida porém **aproximada**: o registro mais adequado pode ficar fora do top-k. Se nenhuma perda é aceitável, a apostila aponta outro caminho: tabelas relacionais comuns e um agente instruído a dizer que não achou.
- **Drizzle** é usado mais pelas migrations (rastreabilidade e rollback) do que pelas consultas, que são mais SQL. Gerar a migration não é aplicá-la: `pnpm db:migrate` aplica.
- **Embeddings: custo e consistência**. Barato porque a carga é rara (uma vez ou a cada trimestre) e a busca é consultada o tempo todo. O modelo da carga e o da busca **têm de ser o mesmo**, senão a busca não encontra direito.
- **768 dimensões**: o Vertex AI devolve 3.072 por padrão e a extensão aceita no máximo 2.000 (para indexar); o README de infra fixa 768. Sem esse parâmetro o vetor estoura o tamanho da coluna.

### Como funciona
- 1) Prompt ao Claude Code: schema Drizzle em `packages/agent/src/db/schema.ts` com todos os campos do corpus, os seis indicadores como bigint, `paragraph`, coluna `embedding vector(768)`, índice único em (ticker, period) e índice HNSW com operador de cosseno. Gerar a migration com drizzle-kit.
- 2) No repo seed o Drizzle ainda não está nas dependências: o agente pergunta antes de instalar (regra do CLAUDE.md). Gerar: `pnpm --filter @hero/agent run db:generate`.
- 3) Subir o Postgres local por Docker (imagem `pgvector/pgvector:pg16`) e aplicar: `pnpm db:migrate`. Conferir no banco a extensão e a tabela `documentos` no schema `public`.
- 4) Prompt do seed: `packages/agent/src/seed/run.ts` lê todos os JSONs de `packages/corpus/data/documentos/`, valida com zod, chama o Vertex AI em **lotes de 10** (não um por vez), insere via Drizzle com **upsert por (ticker, period)**.
- 5) A criação do cliente de embeddings reais fica numa função própria porque o modo DEMO (Aula 14) troca por um fake sem rede.
- 6) Executar: `pnpm seed`. Rodar de novo atualiza em vez de duplicar. Cada linha fica com id, parágrafo e embedding (um campo numérico multidimensional, parecido com um blob).
- 7) Quando um comando falha dentro do Claude Code, o agente investiga sozinho (na demo, adicionou o script que faltava no mesmo padrão do `collect`). O prefixo `!` roda o comando no shell sem gastar tokens.

### Onde aplicar
- RAG sobre base pequena ou média que já vive em Postgres: evita um segundo banco para operar.
- Busca semântica em FAQ, base de conhecimento, catálogo ou documentos internos com pergunta em linguagem natural.
- Pipelines de carga raros (trimestral) com consulta frequente, onde o custo de embedding é irrelevante frente à busca.
- Casos em que a idempotência da carga importa: seed reexecutável com upsert por chave natural.

### Vantagens e limites
**Vantagens**
- Sem infra nova: mesmo Postgres, mesmo SQL, migrations versionadas e rollback.
- Cosseno + HNSW dá busca rápida em bases grandes sem mudar a consulta.
- Upsert por chave natural deixa o seed idempotente.
- Carga em lote reduz chamadas ao Vertex AI e tempo de seed.

**Limites**
- HNSW é aproximado: mais um elemento não determinístico no RAG, e o melhor documento pode sair do top-k.
- Trocar o modelo de embedding invalida tudo que já está indexado (reindexar).
- Limite de 2.000 dimensões do índice força truncar o vetor (768), com perda de informação que a apostila não quantifica.
- Menos alucinação não é zero: o RAG não substitui conferência.

### 🚫 Armadilhas
- Gerar a migration e achar que o banco está pronto: gerar não é aplicar (apostila).
- Usar um modelo de embedding na carga e outro na busca: a busca 'não encontra direito'.
- Esquecer o parâmetro de dimensão: o Vertex devolve 3.072 e estoura o vector(768).
- Criar índice HNSW sem informar o operador: ele tem de casar com o operador da consulta (aqui `vector_cosine_ops` e `<=>`).
- Tratar o índice aproximado como determinístico em domínio que não tolera perda.

> 💡 Antes de confiar no HNSW, meça: rode a mesma consulta com e sem índice (`SET enable_indexscan = off`) e compare os ids do top-5. Com 80 linhas o full scan é suficiente e elimina a perda.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| RAG | Buscar contexto relevante numa base e entregá-lo ao prompt da LLM. |
| Embedding | Vetor numérico de N dimensões que representa um texto. |
| Top-k | Os k vizinhos mais próximos da pergunta. |
| pgvector | Extensão do Postgres com tipo vector, operadores de distância e índices. |
| Distância do cosseno | Operador `<=>`; o projeto obtém similaridade como 1 menos a distância. |
| HNSW | Índice em camadas para busca de vizinhos: rápido, aproximado. |
| vector(768) | Coluna do embedding, limitada porque o índice não passa de 2.000 dimensões. |
| Upsert | Insert que atualiza em conflito; aqui por (ticker, period). |
| Drizzle | ORM/gerador de migrations usado no agente. |
| Full scan | Sem índice: calcula a distância contra todas as linhas. |

---

## 💻 No código do repo

**Projeto:** [packages/agent (src/db/schema.ts, migrations/, src/seed/, src/embeddings.ts), docker-compose.yml](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent)

Li schema, as duas migrations, drizzle.config.ts, o seed completo, o cliente de embeddings, package.json e o docker-compose. Contei o corpus: 20 arquivos JSON com 80 documentos no total (confere com os '80 registros' da aula). Não executei nada (sem Docker nem credencial Vertex).

**Fluxo**
1. `packages/agent/src/db/schema.ts`: tabela `documentos` com `embedding: vector('embedding', { dimensions: EMBEDDING_DIMENSIONS })`, `EMBEDDING_DIMENSIONS = 768`, `uniqueIndex('documentos_ticker_period_idx')` e `index('documentos_embedding_idx').using('hnsw', table.embedding.op('vector_cosine_ops'))`.
2. `packages/agent/migrations/0000_*.sql`: começa com `CREATE EXTENSION IF NOT EXISTS vector;` e cria a tabela e os dois índices. `0001_*.sql` cria `documentos_web` (Aula 11).
3. `packages/agent/src/db/migrate.ts`: usa `migrate()` do drizzle com `pg.Pool` e `DATABASE_URL`; é o que o script `db:migrate` roda via `tsx`.
4. `packages/agent/src/seed/run.ts`: `semear()` lê JSONs, `TAMANHO_LOTE = 10`, `embeddings.embedDocuments` por lote, `insert().onConflictDoUpdate({ target: [ticker, period] })` com `excluded.*`, loga progresso.
5. `packages/agent/src/seed/lotes.ts` (`emLotes`), `read-documentos.ts` (zod `documentosArraySchema`) e `to-row.ts` (`paraLinha`): peças pequenas e testáveis do seed.
6. `packages/agent/src/embeddings.ts`: `criarEmbeddingsReal()` usa `VertexAIEmbeddings` com modelo `MODEL_EMBEDDING` (default `gemini-embedding-001`), `location` default `us-central1`, `dimensions: 768`, `apiKey: ''` para forçar ADC. Exige `GOOGLE_CLOUD_PROJECT_ID`.
7. `docker-compose.yml`: serviço `postgres` com imagem `pgvector/pgvector:pg16`, banco `ai_researcher`, sem volume (dados somem no `docker compose down`).

**Como rodar**
- `docker compose up -d postgres`
- `export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_researcher`
- `pnpm install && pnpm db:migrate`
- `gcloud auth application-default login` e `export GOOGLE_CLOUD_PROJECT_ID=...` (ver infra/README.md), depois `pnpm seed`
- Testes do seed: `pnpm --filter @hero/agent test` (não executei)

**Armadilhas e achados no código**
- Achado: os nomes do código são em português (`semear`, `emLotes`, `criarEmbeddingsReal`, tabela `documentos`); o prompt da aula também fala em português. Ao refazer, o padrão do repo é esse.
- Achado: o código tem comentários explicando o limite de 2.000 dimensões e o motivo de `apiKey: ''` (a lib usaria GOOGLE_API_KEY e a Predict API devolveria 401). É um detalhe de autenticação que a aula não menciona.
- Achado: a aula diz que o Vertex devolve 3.072 por padrão e que o README fixa 768; no código o limite é a constante `EMBEDDING_DIMENSIONS` usada tanto no schema quanto no cliente, então os dois não divergem.
- Achado: o docker-compose é efêmero de propósito (sem volume): depois de reiniciar é preciso migrar e semear de novo.
- Achado: `criarEmbeddings()` (grafo) respeita `DEMO=true`, mas `criarEmbeddingsReal()` do seed nunca, por design.

---

## 🔗 Para ir além
- [Capstone Project AI Researcher](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)
- [AI Researcher Seed](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed)
- [packages/agent (schema, seed, embeddings)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent)
- [pgvector](https://github.com/pgvector/pgvector)

---

⬅️ [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md)  ·  [06 · Os nós retrieve e grade](./06-retrieve-and-grade-nodes.md) ➡️
