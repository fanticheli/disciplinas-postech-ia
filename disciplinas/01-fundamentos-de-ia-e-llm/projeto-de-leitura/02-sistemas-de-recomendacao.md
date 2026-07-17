# 02 · Sistemas de Recomendação na prática

> **Módulo 3 da disciplina** · Leitura: ~10 min · Pré-requisito: [doc 01](./01-ml-dl-ia-redes-neurais.md)

## 🎯 Em uma frase
Um sistema de recomendação é uma rede neural que aprende, a partir do histórico de compras, a **estimar a probabilidade** de cada cliente comprar cada produto — e ordena o catálogo do "mais provável" ao "menos provável", inclusive para clientes **novos**, sem histórico.

---

## 👵 Explicando para a vovó

Pensa no feirante que a senhora frequenta há anos. Ele já sabe que a senhora sempre leva tomate, manjericão e uma fruta da estação. Quando a senhora chega, ele já vai separando — isso é recomendação baseada no **seu histórico**.

Agora imagine que chega um cliente **novo**, que ele nunca viu. Como recomendar? Ele repara: "esse moço tem a idade e o jeito dos que costumam levar café e pão na chapa" — e sugere isso. Ou seja, na falta do seu histórico, ele usa o comportamento de **gente parecida** com você.

É exatamente isso que o sistema faz, só que com matemática: para cada par *(cliente, produto)*, ele dá uma nota de 0 a 1 dizendo "a chance desse cliente comprar esse produto". Depois é só ordenar do maior para o menor. E o melhor: no curso, tudo isso roda **dentro do navegador**, sem servidor.

> 🧠 A mágica não é adivinhar — é medir semelhança. Perfis parecidos compram coisas parecidas.

---

## 🔧 Tecnicamente

### O problema e os dados
O objetivo é **ordenar produtos pela probabilidade de compra**. A estrutura de dados de cada usuário inclui: nome, idade, lista de compras, categoria do produto, preço e cor. Para clientes sem histórico, o sistema recorre ao comportamento de compradores com perfil semelhante — por isso quanto mais dados variados, melhor a previsão.

### Arquitetura de execução (roda no navegador)
- **TensorFlow.js** faz o treino da rede.
- **Web Workers** dão *multithreading*: o treino roda em uma thread secundária, em segundo plano, sem travar a interface. A thread principal só coleta eventos e envia mensagens ao worker.
- **tfvis** desenha gráficos de **loss** e **acurácia** em tempo real, tornando o aprendizado observável.
- Interação **baseada em eventos**: adicionar/remover uma compra dispara re-treino automático.

### Montando o contexto
Antes de treinar, coleta-se: idades dos usuários, preços dos produtos, cores e categorias do catálogo. Usa-se `Math.min`/`Math.max` para achar os intervalos de idade e preço (base da normalização) e `Set` para montar índices únicos de cores e categorias. Calcula-se também a **média de idade por produto** (objetos auxiliares `ageSums` e `ageCounts`), com fallback para a média geral quando faltam dados — isso captura que certos itens são mais populares em certas faixas etárias.

### Codificação em vetores (a parte que decide a qualidade)
- **`encodeProduct`** transforma cada produto em um vetor normalizado. Cada atributo recebe um **peso** conforme sua relevância na decisão: **categoria** (peso mais alto) > cor > preço > **idade** (menor peso). Categorias e cores viram **one-hot com multiplicadores**; `tf.concat` une preço + idade + categoria + cor em um único vetor.
- **`encodeUser`** empilha (`tf.stack`) os vetores dos produtos que o usuário comprou e tira a **média** — um "perfil de compra" resumido em números.

> A normalização segue sempre `(valor - min) / (max - min)`; sem dados, usa-se um padrão (ex.: `0.5`) para evitar inconsistências.

### Dados de treino e rede
Para cada par *(usuário, produto)*: combina-se o vetor do usuário com o do produto e atribui-se o **rótulo `1` se comprou, `0` se não**. Os vetores viram tensores `xs` e `ys` com `tf.tensor2d`; o tamanho da entrada é `context.dimensions * 2` (usuário + produto).

**Arquitetura:**
| Camada | Neurônios | Ativação |
|--------|-----------|----------|
| Densa 1 | 128 | ReLU |
| Densa 2 | 64 | ReLU |
| Densa 3 | 32 | ReLU |
| Saída | 1 | **Sigmoid** (probabilidade 0–1 de compra) |

Compilação: otimizador **Adam** (lr `0.01`), loss **binaryCrossentropy** (problema binário: compra ou não), métrica **accuracy**. Treino: 100 épocas, `batchSize` 32, `shuffle` ligado. Logs de loss/accuracy enviados por `postMessage` alimentam o tfvis.

### Predição e escalabilidade
Para recomendar, concatena-se o vetor do usuário com o de **cada** produto, roda-se a predição e **ordena-se** do mais ao menos recomendado. Usuários sem histórico usam **apenas a idade** (demais atributos como tensores de zeros), comparando-se a usuários de idade similar.

O problema: comparar **todos os usuários com todos os produtos** é inviável com milhões de registros. A solução de produção é um **banco de dados vetorial** (Pinecone, ChromaDB ou a extensão vetorial do PostgreSQL) que indexa vetores e retorna só os **"top N" mais próximos** do perfil, economizando memória e tempo. (Esse mesmo mecanismo aparece no [doc 11](./11-rag-embeddings-busca-semantica.md).)

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| **Web Worker** | Thread secundária: processa/treina sem travar a interface |
| **tfvis** | Biblioteca que plota loss/acurácia em tempo real |
| **Peso do atributo** | Multiplicador que dá mais importância a categoria/cor/preço/idade |
| **one-hot com multiplicador** | One-hot encoding × peso do atributo |
| **Sigmoid** | Ativação que devolve probabilidade entre 0 e 1 |
| **binaryCrossentropy** | Loss para problemas de sim/não (comprou ou não) |
| **Cold start** | Recomendar para usuário novo, sem histórico (usa só idade / perfis similares) |
| **Banco vetorial** | Indexa vetores e retorna os "top N" mais próximos (escala) |

---

## 💻 No curso

- **`exemplo-01-ecommerce-recomendations`**: sistema de recomendação de e-commerce 100% no navegador, com template pronto de interface + tfvis, treino em Web Worker e dados fictícios (Ana Lima, Bruno...) para prever compras de um cliente novo (Zezinho da Silva).
- Fluxo completo demonstrado passo a passo (PT01→PT07): montar contexto → codificar produtos → codificar usuários → gerar dados de treino → treinar a rede → prever e exibir recomendações → adaptar para outros domínios (filmes, artigos, cursos).
- Discussão de produção: substituir a comparação "todos-com-todos" por busca em banco vetorial.

---

## 🔗 Para ir além
- Recommenders (Microsoft) — https://github.com/recommenders-team/recommenders
- Guia de sistemas de recomendação online (Databricks) — https://www.databricks.com/blog/guide-to-building-online-recommendation-system
- Spotify + Reinforcement Learning (TF-Agents) — https://blog.tensorflow.org/2023/10/simulated-spotify-listening-experiences-reinforcement-learning-tensorflow-tf-agents.html
- TensorBoard — https://www.tensorflow.org/tensorboard
