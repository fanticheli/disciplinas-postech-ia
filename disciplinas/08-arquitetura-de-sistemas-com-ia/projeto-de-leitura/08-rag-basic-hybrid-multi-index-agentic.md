# 08 · RAG como padrão de arquitetura: Basic RAG, Hybrid Search, Multi-Index e Agentic RAG

> **Módulo 4 · Aula 1** · Leitura: ~11 min · Bloco: Padrões de Design AI-Específicos

## 🎯 Em uma frase
O RAG deixa de ser uma caixa-preta e vira **componente arquitetural**: um excelente modelo sobre contexto inadequado continua errando. O **Basic RAG** (chunking, embedding, indexação, recuperação, aumento do prompt) é a base; **Hybrid Search** acrescenta busca exata (BM25) e funde os rankings; **Multi-Index** separa uma base por domínio; **Agentic RAG** transforma a busca em decisão iterativa com limite.

---

## 👵 Explicando para a vovó

Uma biblioteca. O Basic RAG é o bibliotecário que corta os livros em fichas pequenas, escreve na ficha o assunto (um código numérico do significado) e, quando você pergunta, traz as fichas mais parecidas com a pergunta. Só então um redator monta a resposta usando aquelas fichas.

Mas fichas por significado falham quando você precisa de um número de resolução exato: aí entra um segundo índice, o de palavras literais (Hybrid). Se a biblioteca tem seções diferentes (consentimento, protocolo, relatórios), o recepcionista primeiro decide qual andar visitar (Multi-Index). E se a primeira busca não resolve, o bibliotecário tenta de novo com outro jeito, até um limite de tentativas (Agentic).

---

## 🔧 Tecnicamente

### O que é
- **A busca como componente:** a precisão, o custo, a latência e a confiabilidade do sistema dependem do que é recuperado antes da geração. A aula abandona a visão de RAG como técnica única e apresenta quatro padrões, cada um evolução do anterior, que uma plataforma madura combina conforme o tipo de documento, a natureza da consulta e a precisão exigida.
- **Basic RAG:** a base de documentos passa por preparação: divisão em **chunks** (necessária porque modelos têm limite de contexto e documentos inteiros reduzem a eficiência da busca); cada trecho vira um **vetor** (embedding) que captura significado e é armazenado em base vetorial; a pergunta passa pelo mesmo processo, é comparada aos vetores e os trechos mais próximos viajam junto com a pergunta para o modelo, que só então gera. O modelo não consulta toda a base, só um subconjunto selecionado. Referência: Lewis et al., NeurIPS 2020.
- **Pipeline modular:** preparação, armazenamento vetorial, recuperação e geração evoluem independentemente (mudar a fragmentação sem tocar no modelo, trocar a base vetorial sem mexer nos documentos, alterar a recuperação mantendo a geração).
- **Chunking:** blocos de tamanho fixo cortam informações relacionadas (definição aqui, exceção na seção seguinte, comum em documentos regulatórios). Boa fragmentação preserva unidades naturais de significado, com contexto para o trecho fazer sentido isolado.
- **Embeddings:** permitem busca por significado: quem busca 'consentimento para menores de idade' pode achar o trecho que só usa 'assentimento'. Recuperar antes de gerar reduz respostas apoiadas apenas na memória paramétrica do modelo e melhora a rastreabilidade.
- **Limite do Basic RAG:** busca só por similaridade semântica falha quando termos exatos importam (códigos regulatórios, números de resolução, identificadores, nomes próprios). Em ambiente regulatório uma única referência normativa pode mudar a interpretação.
- **Hybrid Search** (slides e aula 5): combina busca vetorial (entende sinônimo e paráfrase) com busca esparsa **BM25** (casa o termo exato) e funde os dois rankings por **Reciprocal Rank Fusion** (Cormack, Clarke e Büttcher, SIGIR 2009). Um estudo de caso Lucidworks/Forrester citado: 391% de ROI em três anos combinando busca exata e semântica.
- **Multi-Index:** um roteador decide em qual índice buscar; no Trial Forge: um índice com cláusulas de consentimento, outro com critérios regulatórios/protocolo, outro com dados de estudos anteriores (CSR). Cada agente busca no seu. A decisão de qual índice usar é roteamento por intenção, assunto do próximo tópico.
- **Agentic RAG:** a busca vira decisão: recupera, avalia se a informação é suficiente e, se não, busca de novo (estratégia mais ampla) antes de gerar. Formalizações: FLARE (Jiang et al., 2023) e Self-RAG (Asai et al., ICLR 2024); o termo foi consolidado no survey de Singh et al. (2025). No Trial Forge, decidir se a seção de assentimento entra pode exigir mais de uma busca, a mesma lógica do loop ReAct dentro da busca. Caso citado: Fisher & Paykel com Salesforce Agentforce (atendimento 50% mais rápido, projeção de mais que dobrar o autoatendimento, acima de 65%).

### Como funciona
- **No Trial Forge:** Basic RAG já existia no agente ICF (busca simples de cláusula, um índice, uma volta); Hybrid Search na busca de cláusula, para o 'tema' que o modelo formula em linguagem natural casar com a cláusula certa mesmo sem repetir a frase exata do banco; Multi-Index nos três agentes; Agentic RAG na seção condicional. As resoluções da Anvisa e documentos de referência são preparados, fragmentados e indexados previamente; o resultado deixa de depender só do conhecimento interno do modelo.
- **Seletor de padrão de RAG (canvas):** três perguntas respondidas todas, sem parar no primeiro 'sim'. A busca falha em termo exato, código ou identificador raro? Adicione Hybrid. Busca em mais de um domínio de documento com vocabulários diferentes? Separe em Multi-Index com roteamento. Uma única busca raramente traz informação suficiente? Torne Agentic, com limite explícito de iterações. Se nenhum sintoma, Basic RAG basta.
- **Integração no gateway (aula 5):** o Multi-Index identifica qual índice consultar; o Hybrid Search combina vetorial com lexical BM25; se a qualidade da recuperação ficar abaixo do esperado, o Agentic RAG amplia a estratégia, até três tentativas no protótipo. A confiança obtida na recuperação não fica só como indicador: alimenta o limiar de confiança do Approval Gate.
- **Referências de nuvem e vídeo:** as indicações incluem a arquitetura de referência de RAG do Google Cloud (subsistemas de ingestão e de serving) e o vídeo introdutório da IBM Technology sobre RAG.

### Onde aplicar
- Diagnosticar por sintoma qual padrão falta, sem 'por precaução': termo exato falhando, vários domínios contaminando resultados, ou uma volta que não dá confiança.
- Projetar chunking em torno de unidades de significado em documentos normativos.
- Separar índices por domínio quando o vocabulário e a fonte regulatória mudam.
- Limitar o RAG agêntico com número máximo de iterações e passar a decisão adiante em vez de insistir indefinidamente.

### Vantagens e limites
**Vantagens**
- Fundamenta a resposta em conteúdo oficial da organização, com rastreabilidade.
- Cada estágio pode evoluir de forma independente.
- A combinação dos quatro cobre sinônimo, termo exato, domínios distintos e suficiência de contexto.

**Limites**
- Cada padrão extra adiciona componentes, latência e custo de manutenção.
- Fragmentação mal feita derruba a qualidade mesmo com bom modelo.
- O loop agêntico precisa de limite para não virar custo sem fim.

### 🚫 Armadilhas
- Tratar RAG como caixa-preta única.
- Fixar tamanho de chunk sem olhar a estrutura do documento.
- Confiar só em embedding quando identificadores exatos importam.
- Somar scores brutos de BM25 e cosseno: escalas incompatíveis (por isso a fusão por posição, RRF).
- Adicionar os quatro padrões de uma vez em vez de por sintoma.

> 💡 **Fonte do conteúdo deste tópico:** a apostila detalha o Basic RAG (Aula 1) e só menciona Hybrid Search, Multi-Index e Agentic RAG como evolução (e na Aula 5, dentro do gateway). A explicação desses três vem dos slides do Módulo 4.1, do canvas de seleção de RAG e do código do protótipo.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Chunk | Fragmento do documento indexado separadamente |
| Embedding | Vetor numérico que representa o significado do texto |
| Basic RAG | Chunking, embedding, indexação, recuperação, aumento do prompt |
| BM25 | Busca lexical que casa termos exatos, ponderando raridade |
| RRF | Reciprocal Rank Fusion: funde rankings pela posição, não pelo score |
| Hybrid Search | Vetorial + BM25 fundidos por RRF |
| Multi-Index | Um índice por domínio com roteamento de qual consultar |
| Agentic RAG | Busca iterativa e autoavaliada com limite de tentativas |

---

## 💻 No código do repo

**Projeto:** [modulo-04-padroes-ai-especificos (canvas seletor de RAG e a camada de RAG do gateway)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-04-padroes-ai-especificos)

O canvas de seleção de RAG e, dentro de `trialforge-gateway-prototype.js`, a implementação real dos três padrões avançados sobre embeddings reais do `nomic-embed-text`. O gateway completo é descrito em [D8-11](./11-gateway-integrado.md).

**Fluxo**
1. `rag-pattern-selector-canvas.md`: árvore de três perguntas não exclusivas, tabela 'Aplicado ao TrialForge' ligando sintoma a padrão e fonte (Lewis et al.; Cormack et al.; FLARE e Self-RAG) e instruções para listar quais dos quatro padrões você já tem.
2. **Multi-Index:** `INDICES` tem três índices (`icf`, `protocolo`, `csr`) com duas cláusulas cada, e `INDICE_POR_INTENCAO` mapeia a intenção da requisição para o índice, reaproveitando a classificação que também decide o modelo.
3. **Indexação uma vez só:** `prepararIndices()` calcula, na inicialização, as estatísticas BM25 do corpus (`construirEstatisticasBM25`) e os embeddings do *tema* e do *texto* de cada cláusula; buscar não faz rede para o lado do corpus, só para o embedding da pergunta.
4. **Hybrid Search:** `tokenizar` remove acento e pontuação, `scoreBM25` usa k1=1,5 e b=0,75 com idf `log((N - df + 0.5)/(df + 0.5) + 1)`; `buscarClausulaHibrida` ranqueia por cosseno e por BM25 e funde com `fusaoReciprocalRank` (k=60), devolvendo cláusula, cosseno, BM25 e score RRF.
5. **Agentic RAG:** `buscarClausulaAgentica` tenta até `MAX_ITERACOES_AGENTIC = 3` vezes: 1) índice roteado comparando com o tema; 2) mesmo índice comparando com o texto completo; 3) todos os índices (`buscarEmTodosIndices`). Para ao atingir `LIMIAR_CONFIANCA = 0.7` de cosseno; se esgotar, devolve o melhor achado e deixa o Confidence Threshold decidir.
6. Medido nos slides e no `audit-trail.jsonl`: pergunta sobre idade mínima roteia para o índice `protocolo` e converge na 1ª iteração (cosseno 0,848); pergunta sobre armazenamento de amostras biológicas esgota as 3 (melhor 0,633).

**Como rodar**
- Veja [D8-11](./11-gateway-integrado.md) para o passo a passo completo de execução (Ollama + `nomic-embed-text`, `gemma4:e2b` e `gemma4`).
- Para estudar só a busca: leia `buscarClausulaHibrida` e rode os testes puros de `rodarTestesPuros()` (BM25, RRF), que não usam rede.

**Armadilhas e achados no código**
- O corpus é minúsculo e fixo no código: 6 cláusulas, 2 por índice. Não há chunking de documento real nem leitura de arquivos: o 'Basic RAG' do protótipo demonstra recuperação e fusão, não a fase de fragmentação de documentos.
- A 'confiança' que alimenta o gateway é o cosseno da melhor cláusula, não o score RRF nem uma probabilidade do modelo; o RRF só escolhe qual cláusula é a melhor.
- O `tokenizar` usa uma regex com a faixa de marcas combinantes Unicode após `normalize('NFD')` para tirar acentos; funciona, mas é fácil de quebrar ao editar o arquivo em editores que normalizam caracteres.

---

## 🔗 Para ir além
- [Repositório oficial do módulo 08 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia)
- [Pasta do módulo 4 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-04-padroes-ai-especificos)
- [Lewis et al.: Retrieval-Augmented Generation (arXiv 2005.11401)](https://arxiv.org/abs/2005.11401)
- [Cormack et al.: Reciprocal Rank Fusion (SIGIR 2009)](https://research.google/pubs/reciprocal-rank-fusion-outperforms-condorcet-and-individual-rank-learning-methods/)
- [FLARE: Active Retrieval Augmented Generation (arXiv 2305.06983)](https://arxiv.org/abs/2305.06983)
- [Self-RAG (arXiv 2310.11511)](https://arxiv.org/abs/2310.11511)
- [Agentic RAG: A Survey (arXiv 2501.09136)](https://arxiv.org/abs/2501.09136)
- [Google Cloud: Reference architectures for RAG](https://docs.cloud.google.com/architecture/rag-reference-architectures)
- [Vídeo: What is Retrieval-Augmented Generation (IBM Technology)](https://www.youtube.com/watch?v=T-D1OfcDW1M)
- [Lucidworks/Forrester: estudo de busca híbrida B2B](https://lucidworks.com/ebooks/forrester-tei-report)
- [Salesforce: Fisher & Paykel com Agentforce](https://www.salesforce.com/customer-stories/fisher-and-paykel/)

---

⬅️ [07 · Falhas distribuídas: CAP, timeout, retry, idempotência, Saga e a fila de mensagens](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md)  ·  [09 · Roteamento, cache semântico, prompt cache e response streaming](./09-roteamento-cache-e-streaming.md) ➡️
