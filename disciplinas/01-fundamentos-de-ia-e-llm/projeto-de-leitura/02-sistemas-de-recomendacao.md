# 02 · Sistemas de Recomendação na prática

> **Módulo 3 da disciplina (Caps. 1 a 7)** · Leitura: ~12 min · Pré-requisito: [doc 01](./01-ml-dl-ia-redes-neurais.md)

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

> A normalização segue sempre `(valor - min) / (max - min)`; sem dados, usa-se um padrão (ex.: `0.5`) para evitar inconsistências. A apostila diz que, se o resultado for indefinido, retorna 1; o código usa o divisor `(max - min) || 1`.

### Bugs que a aula corrigiu ao vivo
Vale como lista de armadilhas clássicas: `Object.entries` no lugar de `Object.fromEntries` nos índices de categoria e cor; `context` sobrescrito (a declaração virou `let`); `minPrice` onde era `maxPrice`; `numCategories` usado para cores (devia ser `numColors`); pesos errados no `oneHotWeighted`; `unit` em vez de `units` na camada; usuários sem compras entrando no treino (o código filtra com `.filter(u => u.purchases.length)`); e `setTimeout` trocado por `await` para só enviar mensagens ao fim do treino. Para inspecionar tensores, a aula usa `dataSync()`.

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
Para recomendar, concatena-se o vetor do usuário com o de **cada** produto, roda-se a predição e **ordena-se** do mais ao menos recomendado. Usuários sem histórico usam **apenas a idade** (demais atributos como tensores de zeros), comparando-se a usuários de idade similar. Na demonstração, um usuário de 30 anos sem compras recebeu produtos comprados por outros de idade parecida, e adicionar um item ao carrinho reordenava a lista. A aula fecha com o desafio de adaptar a arquitetura a filmes, livros ou cursos, com bases prontas do Kaggle.

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

## 💻 No código do repo

**`exemplo-01` · Recomendação de e-commerce no navegador**

- **Objetivo:** recomendação completa no browser: a UI (MVC) dispara o treino de uma rede em um Web Worker e depois ranqueia os 10 produtos para o usuário escolhido. Na aula, dados fictícios (Ana Lima, Bruno...) servem para prever compras de um cliente novo (Zezinho da Silva); o fluxo foi mostrado em passos (PT01 a PT07), incluindo adaptar para outros domínios (filmes, artigos, cursos).
- **Stack:** app estático (HTML + ES modules, sem bundler) servido por `browser-sync`; TF.js 4.22 e tfjs-vis 1.5.1 via CDN. Dados em `data/products.json` (10 produtos) e `data/users.json` (5 usuários com histórico). Estrutura `controller/`, `view/`, `service/`, `events/` e `workers/modelTrainingWorker.js`.
- **Fluxo:**
  1. `src/index.js` cria services e views e o worker (`new Worker("/src/workers/modelTrainingWorker.js", { type: "module" })`), ligados por `WorkerController.init`. `UserService` guarda os usuários no `sessionStorage` (`ew-academy-users`).
  2. O treino já dispara sozinho ao abrir a página: `index.js` carrega os usuários padrão e chama `w.triggerTrain(users)`. O botão "Train Model" retreina com as compras atuais e percorre `ModelTrainingController` → `Events.dispatchTrainModel` → `WorkerController.triggerTrain` → `postMessage({ action: "train:model", users })`. "Run Recommendation" só habilita depois do treino e com um usuário selecionado. O `index.js` também renderiza o "Josézin da Silva" (id 99, sem compras), caso de demonstração do cold start.
  3. No worker, `makeContext` calcula min/max de idade e preço, índices de cor e categoria e a idade média de quem comprou cada produto.
  4. `encodeProduct` gera `[preço, idade_média, one-hot categoria, one-hot cor]` com pesos (`category: 0.4, color: 0.3, price: 0.2, age: 0.1`); `encodeUser` é a média dos vetores dos produtos comprados.
  5. `createTrainingData` concatena `[userVector, productVector]` por par e rotula 1 (comprou) ou 0.
  6. `configureNeuralNetAndTrain`: dense 128 → 64 → 32 (ReLU) → 1 (sigmoid), `adam(0.01)`, `binaryCrossentropy`, 100 épocas, `batchSize: 32`; `onEpochEnd` posta loss e accuracy e o tfjs-vis desenha os gráficos.
  7. "Run Recommendation" monta os pares com os 10 produtos, chama `_model.predict`, ordena por score e devolve `{ type: "recommend", recommendations }`.
- **Template vs z:** o template traz UI, controllers, eventos e um worker simulado (progresso 50% → 100% com `setTimeout`), sem TF real. O z tem 5 snapshots que diferem quase só em `workers/modelTrainingWorker.js` (102 → 370 linhas): `parte01` makeContext e esqueleto; `parte02` + `oneHotWeighted`/`encodeProduct`; `parte03` + `encodeUser`/`createTrainingData` (ainda com `debugger`); `parte04` + fallback do cold start no `encodeUser` + rede e treino; `parte05` + `recommend` completo. Na apostila isso corresponde a PT02, PT03, PT04, PT05 e PT06. O z também muda `ModelTrainingView.js` (rótulo do botão) e `TFVisorView.js` (abre o visor só no primeiro log). Use `diff` entre as partes.
- **Como rodar:** `cd exemplo-01-ecommerce-recomendations-z/parte05-ecommerce-recomendations-with-tensorflow && npm install && npm start` e abra `http://localhost:3000` (precisa de internet para as CDNs). Fluxo: escolher usuário, Train Model, Run Recommendation, comprar produtos e retreinar.
- **Armadilhas e achados:**
  - O worker usa caminho absoluto `/src/workers/...` (e o `fetch('/data/products.json')` também): só funciona com a pasta do projeto como raiz do servidor.
  - Porta 3000 com `npm start`, mas o README e o `.vscode/tasks.json` falam em 8080 (`http-server`).
  - O rótulo é `user.purchases.some(purchase => purchase.name === product.name ? 1 : 0)`: o ternário dentro do `some` é redundante, o resultado é booleano.
  - Usuário sem compras gera vetor quase zerado (`encodeUser` usa só a idade) e a recomendação fica pobre.
  - `sessionStorage` some ao fechar a aba; há várias cópias quase idênticas do app (template + 5 partes), edite a pasta certa.
  - 5 usuários e 10 produtos: o modelo memoriza, não generaliza; o par todos-com-todos não escala.
- **Produção:** o código sugere pré-filtrar os ~200 produtos mais próximos num banco vetorial antes do `predict` (ponte para o exemplo 12, tópico 11).
- **Exercícios:** mudar os `WEIGHTS`; adicionar feature (marca, avaliação) em `encodeProduct`; persistir com `model.save("indexeddb://...")`.
- **Código:** [template](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-01-ecommerce-recomendations-template) · [z, 5 partes](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-01-ecommerce-recomendations-z)

---

## 🔗 Para ir além
- Recommenders (Microsoft) — https://github.com/recommenders-team/recommenders
- Guia de sistemas de recomendação online (Databricks) — https://www.databricks.com/blog/guide-to-building-online-recommendation-system
- Spotify + Reinforcement Learning (TF-Agents) — https://blog.tensorflow.org/2023/10/simulated-spotify-listening-experiences-reinforcement-learning-tensorflow-tf-agents.html
- TensorBoard — https://www.tensorflow.org/tensorboard
