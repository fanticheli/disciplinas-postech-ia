# 11 · RAG, embeddings e busca semântica

> **Módulo 10 da disciplina** · Leitura: ~11 min · Pré-requisito: docs [05](./05-como-funcionam-llms.md) e [09](./09-mcp-e-automacao.md) · 🏁 **Doc de fechamento**

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

**Geração local de embeddings:** com a biblioteca **Transformer.js**, dá para gerar embeddings **localmente** — sem chaves de API, sem Docker, tudo em **Node.js puro**.

### O primeiro RAG com JavaScript + Neo4j (Cap. 3)
O projeto de fechamento transforma uma **transcrição de aula em PDF** numa base consultável:
1. Ler o PDF e dividir em **chunks** coerentes.
2. Gerar **embeddings** de cada chunk com Transformer.js (local).
3. Indexar no **Neo4j** com metadados (arquivo, posição, minuto).
4. **Consultar por similaridade**: a pergunta vira embedding e retorna os trechos mais próximos.

Mesmo sem as frases exatas na transcrição, o sistema retorna parágrafos altamente relevantes — é a **memória não-paramétrica** funcionando. (Ainda sem a parte de *generation*; o passo seguinte é conectar a um LLM para fechar o ciclo completo do RAG.)

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

## 💻 No curso
- **exemplo-12-embeddings-neo4j:** gerar e armazenar embeddings no Neo4j, fazer busca por similaridade.
- **exemplo-13-embeddings-neo4j-rag:** o primeiro RAG completo — PDF → chunks → embeddings (Transformer.js) → Neo4j → consulta semântica, integrando com LangChain.
- Base conceitual: o paper original de RAG (2020).

---

## 🔗 Para ir além
- Paper original de RAG (2020) — https://arxiv.org/pdf/2005.11401
- Neo4j — https://neo4j.com/
- LangChain (JS) — https://docs.langchain.com/oss/javascript/langchain/overview
- Embeddings com Transformers.js — https://docs.langchain.com/oss/javascript/integrations/text_embedding/transformers

---

## 🎓 Você chegou ao fim!
Do concreto (redes neurais no doc [01](./01-ml-dl-ia-redes-neurais.md)) ao aplicado (RAG aqui), você percorreu toda a disciplina. A espinha dorsal de tudo: **representar dados como números, deixar o modelo aprender padrões e dar a ele o contexto certo na hora certa.** Agora é adaptar para seus próprios projetos. 🚀
