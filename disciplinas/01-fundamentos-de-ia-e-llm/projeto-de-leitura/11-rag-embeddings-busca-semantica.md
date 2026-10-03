# 11 · RAG, embeddings e busca semântica

> **Módulo 10 da disciplina (Caps. 1 a 3)** · Leitura: ~12 min · Pré-requisito: docs [05](./05-como-funcionam-llms.md) e [09](./09-mcp-e-automacao.md) · 🏁 **Doc de fechamento**

## 🎯 Em uma frase
**RAG (Retrieval-Augmented Generation)** dá à LLM um passo de **busca de informação relevante antes de responder** — em vez de confiar só na memória do treino, ela consulta uma base externa (via **embeddings** e **busca semântica**) e responde fundamentada em dados reais, atualizados e privados.

---

## 👵 Explicando para a vovó

Imagine um aluno muito inteligente fazendo uma prova. Se ele responder **só de cabeça**, pode misturar as coisas ou inventar quando não lembra (é a tal da "alucinação" que a gente viu). Agora imagine que, **antes de escrever cada resposta**, ele pode dar uma consultadinha na **cola certa** ou no livro na página exata. As respostas ficam muito mais confiáveis, né? **RAG é isso:** a IA busca o trecho certo da informação antes de responder.

E como ela acha o trecho certo tão rápido? Com os **embeddings**. Pense numa **biblioteca organizada por assunto** (e não por ordem alfabética): livros que falam de coisas parecidas ficam na **mesma prateleira**, mesmo que os títulos usem palavras diferentes. Quando a senhora faz uma pergunta, o sistema vai direto na prateleira certa e pega os livros mais próximos do que a senhora quis dizer — não pela palavra exata, mas pelo **significado**.

É diferente do **Ctrl+F** (aquele "localizar" que procura a palavra idêntica). A busca semântica entende que "como a rede ajusta os pesos" e "backpropagation" falam da mesma coisa, mesmo sem repetir as palavras.

---

## 🔧 Tecnicamente

### A essência do RAG
RAG é uma arquitetura que adiciona um **passo de recuperação de informação externa** antes da geração de resposta. Assim, a LLM não depende só do que aprendeu no treino — ela recebe **informações injetadas dinamicamente no contexto**. Isso permite respostas baseadas em dados **atualizados, privados ou de um domínio específico**, algo inalcançável só com os pesos do modelo. O conceito foi **formalizado em um paper de 2020**.

**Dois tipos de memória:**
- **Paramétrica** — o conhecimento aprendido no treino e codificado nos **pesos** do modelo.
- **Não-paramétrica** — uma **base de dados externa pesquisável**, geralmente com um **índice vetorial** que identifica trechos relevantes para cada pergunta.

> **O problema que o RAG resolve:** o transformer prevê o próximo token a partir do contexto (doc [05](./05-como-funcionam-llms.md)). Se o contexto **não contém** a informação certa, o modelo completa com padrões aprendidos — e alucina. RAG garante que o contexto tenha **os trechos certos, na hora certa.**

### RAG em 2 fases
**1. Indexação** (feita uma vez, antes):
- Coletar fontes: documentos, tickets, código, tabelas, PDFs.
- Dividir em **chunks** (pedaços coerentes, cada um com sentido completo).
- Gerar um **embedding** (vetor numérico) de cada chunk.
- Armazenar em um **banco vetorial**.

**2. Consulta** (a cada pergunta):
- A pergunta também é convertida em embedding.
- O sistema busca os embeddings **mais similares** no banco vetorial.
- Os trechos mais relevantes são **injetados no prompt** da LLM.
- A resposta gerada fica **fundamentada em informação real**.

> Exemplo clássico: o usuário pergunta *"Por que o endpoint /checkout está dando erro 500?"*. O sistema busca trechos de **runbooks, incidentes e código**, injeta no prompt e responde com base em evidências.

### RAG vs. MCP vs. Fine-tuning
| Abordagem | O que faz | Muda os pesos? |
|-----------|-----------|----------------|
| **RAG** | Busca informação relevante **antes** de responder | ❌ Não |
| **MCP** | Protocolo que dá acesso a ferramentas externas; pode ser **canal** para o RAG, mas não é método de recuperação | ❌ Não |
| **Fine-tuning** | Ajusta os pesos do modelo com novos exemplos (memória permanente, mas caro e demorado) | ✅ Sim |

Dar contexto com RAG é **diferente de treinar**: o modelo usa a informação **enquanto ela está no prompt**; ao fim da interação, esse conhecimento é descartado (ao contrário do fine-tuning).

---

### Embeddings e Vector Databases (Cap. 2)

**Busca por similaridade** trabalha com o **sentido**, não com a forma literal das palavras. Ao transformar textos em vetores (embeddings), textos com significados parecidos ficam **próximos no espaço vetorial**, mesmo escritos com palavras diferentes. Embeddings funcionam como um **mapa onde ideias semelhantes estão geograficamente próximas**; a consulta é só um **cálculo matemático** de qual vetor está mais perto do vetor da pergunta.

**Neo4j como banco vetorial:** apesar de ser conhecido como banco de **grafos**, o Neo4j funciona bem como *vector database*. Os chunks de texto viram **nós** do grafo, e os embeddings viram **propriedades** desses nós. Cria-se um **índice vetorial** para consultas por similaridade. Vantagem extra: cada chunk pode carregar **metadados** (título da aula, seção, minuto do vídeo), permitindo consultas mais estáveis e contextualizadas.

**Geração local de embeddings:** com a biblioteca **Transformer.js**, dá para gerar embeddings **localmente** — sem chaves de API e sem sobrecarregar a máquina, tudo em **Node.js puro**. A apostila diz também "sem Docker", mas o exemplo-12 do repo sobe o Neo4j com Docker Compose: só os embeddings dispensam Docker.

### O primeiro RAG com JavaScript + Neo4j (Cap. 3)
O projeto de fechamento transforma uma **transcrição de aula em PDF** numa base consultável:
1. Ler o PDF e dividir em **chunks** coerentes.
2. Gerar **embeddings** de cada chunk com Transformer.js (local).
3. Indexar no **Neo4j** com metadados (a apostila cita minuto da aula, nome do arquivo e posição no texto; o código do repo guarda só o `source`).
4. **Consultar por similaridade**: a pergunta vira embedding e retorna os trechos mais próximos.

Mesmo sem as frases exatas na transcrição, o sistema retorna parágrafos altamente relevantes — é a **memória não-paramétrica** funcionando. (Ainda sem a parte de *generation*; o passo seguinte é conectar a um LLM para fechar o ciclo completo do RAG.)

No capítulo 3 (e no exemplo-13) o ciclo se completa: a pergunta vira embedding, o Neo4j devolve os trechos mais próximos e um LLM gera a resposta com base neles.

> 🔑 **A grande lição:** *"o modelo só é bom quando alimentado com dados relevantes e bem estruturados."* Dominar embeddings, metadados e indexação é o que dá autonomia para construir uma arquitetura de IA **realmente útil**, sem depender de soluções prontas ou fechadas.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| **RAG** | Buscar contexto relevante antes de gerar a resposta |
| **Memória paramétrica** | Conhecimento nos pesos (do treino) |
| **Memória não-paramétrica** | Base externa pesquisável (índice vetorial) |
| **Chunk** | Pedaço coerente de texto |
| **Embedding** | Vetor numérico que representa o significado |
| **Banco vetorial** | Armazena embeddings p/ busca por similaridade |
| **Busca semântica** | Buscar por significado, não por palavra exata |
| **Neo4j** | Banco de grafos que atua como vector database |
| **Transformer.js** | Gera embeddings localmente em Node.js |
| **Fine-tuning** | Ajustar os pesos do modelo (permanente, caro) |

---

## 💻 No código do repo

Base conceitual na aula: o paper original de RAG (2020). Dois exemplos encadeados: o 12 é o *retrieval*, o 13 acrescenta a *geração* e fecha o RAG. A ingestão é idêntica (`diff` entre os dois `index.ts`: muda só o LLM e a classe `AI`).

**`exemplo-12` · Embeddings e busca semântica com Neo4j**
- **Objetivo:** PDF → chunks → embeddings gerados localmente no Node → Neo4j como vector store → `similaritySearch`.
- **Stack:** Node 22.13 em TypeScript (`--experimental-strip-types`, `"type": "module"`); `@langchain/community`, `@langchain/core`, `@langchain/openai`, `@huggingface/transformers`, `neo4j-driver`, `pdf-parse`. `docker-compose.yml` com `neo4j:5.14.0-community` (Browser 7474, Bolt 7687, usuário `neo4j`, senha `password`, APOC). Dado: `tensores.pdf` (~1,7 MB, sobre tensores em TF.js).
- **Fluxo:**
  1. `config.ts` centraliza `CONFIG` (congelado): Neo4j (`indexName: "tensors_index"`, `nodeLabel: "Chunk"`, `textNodeProperties: ["text"]`), `textSplitter` (`chunkSize: 1000`, `chunkOverlap: 200`), modelo de embedding (`EMBEDDING_MODEL`, dtype `fp32`) e `similarity.topK: 3`.
  2. `DocumentProcessor.loadAndSplit()`: `PDFLoader` + `RecursiveCharacterTextSplitter`; mantém só `metadata.source`.
  3. `HuggingFaceTransformersEmbeddings` roda local (`Xenova/all-MiniLM-L6-v2`, baixado no primeiro uso, sem API).
  4. `Neo4jVectorStore.fromExistingGraph(embeddings, CONFIG.neo4j)` prepara o índice vetorial; o script limpa os `Chunk` (`MATCH (n:Chunk) DETACH DELETE n`) e insere com `addDocuments`.
  5. Para 6 perguntas fixas, `similaritySearch(question, topK)` devolve 3 trechos; `util.ts` (`displayResults`) imprime resumido a 200 caracteres; `vectorStore.close()` no `finally`.
- **Template vs final:** `exemplo-12-embeddings-neo4j-template` traz o esqueleto (`config.ts`, `util.ts`, `index.ts` **vazio**, `.env.example`, docker-compose, PDF) para escrever `documentProcessor.ts` e `index.ts` na aula (`script.txt` lista o roteiro). A pasta final acrescenta `documentProcessor.ts` e o `index.ts` completo; `package.json` e `config.ts` são idênticos.
- **Rodar:** Node 22.13+, Docker. `cp ../exemplo-12-embeddings-neo4j-template/.env.example .env` (`NEO4J_URI=bolt://localhost:7687`, `NEO4J_USER=neo4j`, `NEO4J_PASSWORD=password`, `EMBEDDING_MODEL=Xenova/all-MiniLM-L6-v2`), `npm ci`, `npm run infra:up` (`docker-compose up -d --wait`), `npm start`. Inspecione os nós em `http://localhost:7474`; `infra:down` remove containers e volumes. As variáveis `OPENROUTER_*` não são usadas aqui.
- **Armadilhas e achados:**
  - `clearAll(...)` é chamado **sem `await`** em `index.ts`: a deleção roda concorrente com as inserções e pode apagar nós novos ou deixar dados antigos (duplica chunks ao reexecutar).
  - A pasta final não traz `.env.example` (só o template) e o `start` falha sem `.env` (`--env-file .env`).
  - `documentProcessor.ts` importa `langchain/text_splitter`, mas `langchain` não está em `dependencies` (resolve por dependência transitiva).
  - `infra:up` usa o binário `docker-compose` (v1); só com o plugin `docker compose` falha. O compose cria `./neo4j/data`, `logs`, `plugins` e `./import` (adicionar ao `.gitignore`; no Linux pode dar problema de permissão).
  - `@xenova/transformers` e `@huggingface/transformers` convivem no `package.json` (o primeiro parece sobra). `console.log` no lugar de logger estruturado.
  - O `documentProcessor.ts` descarta o metadata e mantém só `source`; por isso o `displayResults`, que tenta imprimir `metadata.pageNumber`, nunca mostra a página. Para citar fonte e página é preciso preservar o metadata.
  - A apostila diz que os embeddings locais dispensam Docker, mas o Neo4j deste exemplo sobe por `docker-compose`.
  - MiniLM é pequeno e focado em inglês (PDF em português recupera pior); inserção um chunk por vez em CPU é lenta; a busca devolve trechos, não respostas.
- **Exercícios:** variar `chunkSize`/`chunkOverlap`; trocar `EMBEDDING_MODEL`; `similaritySearchWithScore` para definir um limiar; indexar PDF próprio.

**`exemplo-13` · Primeiro RAG com JavaScript e Neo4j**
- **Objetivo:** recuperar trechos no Neo4j e entregá-los como contexto a um LLM via OpenRouter para respostas fundamentadas no PDF. É o 12 mais `src/ai.ts`, `prompts/` e `respostas/` (saídas reais em `.md`).
- **Fluxo:**
  1. `index.ts` repete a ingestão do 12 e instancia `ChatOpenAI` (`baseURL` `https://openrouter.ai/api/v1`, temperatura 0.3, `maxRetries: 2`, cabeçalhos `HTTP-Referer`/`X-Title`); o modelo vem de `NLP_MODEL` (sugestão: `google/gemma-3-27b-it:free`).
  2. `config.ts` lê `prompts/answerPrompt.json` (papel, tarefa, instruções, restrições) e `prompts/template.txt`, e define a saída `./respostas`.
  3. `class AI` monta uma `RunnableSequence` com `retrieveVectorSearchResults` e `generateNLPResponse`.
  4. Retrieval: `similaritySearchWithScore(question, topK)`; vazio gera `error` ("não encontrei informações relevantes"); senão filtra `score > 0.5` e junta os `pageContent` com `\n\n---\n\n` como `context`.
  5. Generation: `ChatPromptTemplate.fromTemplate(templateText).pipe(nlpModel).pipe(new StringOutputParser())`. O prompt manda usar APENAS o contexto e admitir quando faltar informação (ancora a resposta).
  6. Cada resposta é impressa e gravada em `respostas/resposta-<índice>-<timestamp>.md`.
- **Rodar:** pré-requisitos do 12 mais chave OpenRouter. `.env` com `NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD`, `EMBEDDING_MODEL`, `OPENROUTER_API_KEY`, `NLP_MODEL`, `OPENROUTER_SITE_URL`, `OPENROUTER_SITE_NAME` (modelo: `.env.example` do template do 12). `npm ci`, `npm run infra:up`, `npm start`. Custo zero com modelo `:free` (sujeito a limite de taxa); embeddings locais.
- **Armadilhas e achados:**
  - Mesmo `clearAll(...)` sem `await` do 12.
  - O filtro `score > 0.5` pode zerar o `context` sem gerar `error` (que só dispara com busca vazia): o LLM recebe contexto vazio e responde mesmo assim.
  - "Use APENAS o contexto" é só instrução, nada valida; sem `.env` (sem `.env.example` nesta pasta) o `OPENROUTER_API_KEY` fica indefinida (401).
  - `respostas/` já vem com saídas commitadas e as suas suja o git; há dois arquivos de índice 0 e a pergunta "O que são tensores..." está comentada em `questions`: o índice é a posição na lista, não um id estável. `for...in` em `questions` faz `index` ser string.
  - PDF reingerido e índice limpo a cada execução; sem avaliação automática; modelo gratuito pode truncar ou variar mesmo com 0.3.
- **Exercícios:** perguntar algo fora do PDF e ver se admite que não sabe; variar o limiar e o `topK`; citar fonte (página) via metadados (antes, ajustar o `documentProcessor.ts` para não descartar o metadata); reescrever a pergunta antes do retrieval. Para entender o RAG, leia `ai.ts` (~50 linhas) e depois `prompts/template.txt`.
- **Código:** [12 final](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-12-embeddings-neo4j) · [12 template](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-12-embeddings-neo4j-template) · [13](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-13-embeddings-neo4j-rag)

---

## 🔗 Para ir além
- Paper original de RAG (2020) — https://arxiv.org/pdf/2005.11401
- Neo4j — https://neo4j.com/
- LangChain (JS) — https://docs.langchain.com/oss/javascript/langchain/overview
- Embeddings com Transformers.js — https://docs.langchain.com/oss/javascript/integrations/text_embedding/transformers

---

## 🎓 Você chegou ao fim!
Do concreto (redes neurais no doc [01](./01-ml-dl-ia-redes-neurais.md)) ao aplicado (RAG aqui), você percorreu toda a disciplina. A espinha dorsal de tudo: **representar dados como números, deixar o modelo aprender padrões e dar a ele o contexto certo na hora certa.** Agora é adaptar para seus próprios projetos. 🚀
