PRACTICE.push({
 "disc": "01",
 "intro": "Nesta disciplina a prática é montar blocos pequenos e verificáveis: dados e modelos no navegador (TensorFlow.js, Web AI), prompts estruturados, agentes e MCP no editor, modelos locais ou via gateway, e RAG com embeddings e Neo4j. Cada cartão traz um cenário, o passo a passo e um trecho de código que você pode adaptar.",
 "items": [
  {
   "id": "P1-01",
   "title": "Classificador tabular com normalização e one-hot",
   "topics": [
    "D1-01"
   ],
   "cenario": "Um time de CRM classifica clientes em premium, medium e basic com <code>if/else</code> e pesos calibrados na mão. Cada nova regra quebra outra e ninguém sabe o peso certo da idade contra a cidade.",
   "passos": [
    "Liste as features e o rótulo: idade (contínua), cor ou cidade (categórica) e a faixa do cliente.",
    "Normalize o contínuo para 0-1 com <code>(valor-min)/(max-min)</code>; guarde min e max para usar igual na inferência.",
    "Aplique one-hot nas categorias, para o modelo não enxergar ordem onde não existe.",
    "Monte <code>tensor2d</code> de entradas e de rótulos (um one-hot por faixa).",
    "Rede mínima: <code>dense relu</code> + <code>dense softmax</code> com saída por classe; <code>adam</code> e <code>categoricalCrossentropy</code>.",
    "Treine com <code>shuffle</code>, e avalie num conjunto separado que o modelo nunca viu. O dataset do snippet tem 3 linhas só para mostrar o formato: em produção, são centenas ou milhares."
   ],
   "code": {
    "lang": "js",
    "src": "import tf from '@tensorflow/tfjs-node'\n\nconst ageRange = { min: 25, max: 40 }\nconst colors = ['blue', 'red', 'green']\nconst tiers = ['premium', 'medium', 'basic']\n\nconst normalizeAge = age => (age - ageRange.min) / (ageRange.max - ageRange.min)\nconst encodeCustomer = ({ age, color }) => [\n  normalizeAge(age),\n  ...colors.map(item => (item === color ? 1 : 0)),\n]\nconst encodeTier = tier => tiers.map(item => (item === tier ? 1 : 0))\n\nconst training = [\n  { age: 30, color: 'blue', tier: 'premium' },\n  { age: 25, color: 'red', tier: 'basic' },\n  { age: 40, color: 'green', tier: 'medium' },\n]\n\nconst inputs = tf.tensor2d(training.map(encodeCustomer))\nconst outputs = tf.tensor2d(training.map(row => encodeTier(row.tier)))\n\nconst model = tf.sequential()\nmodel.add(tf.layers.dense({ inputShape: [1 + colors.length], units: 16, activation: 'relu' }))\nmodel.add(tf.layers.dense({ units: tiers.length, activation: 'softmax' }))\nmodel.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] })\nawait model.fit(inputs, outputs, { epochs: 100, shuffle: true, verbose: 0 })\n\nconst [probabilities] = await model\n  .predict(tf.tensor2d([encodeCustomer({ age: 28, color: 'blue' })]))\n  .array()\nconsole.log(tiers.map((tier, index) => ({ tier, probability: probabilities[index] })))"
   },
   "resultado": "Regras manuais viram um modelo retreinável com dados novos, e a saída é uma probabilidade por faixa em vez de um corte seco.",
   "quandoNao": [
    "A regra é determinística e estável (ex.: desconto por faixa de valor): <code>if</code> resolve.",
    "Você tem poucas dezenas de exemplos: o modelo decora.",
    "Precisa explicar cada decisão a auditoria: regra explícita é mais defensável."
   ],
   "armadilha": "Esquecer a normalização e deixar uma feature de escala grande dominar o treino (ou tratar categoria como número, criando ordem falsa).",
   "repo": {
    "label": "exemplo-00-z",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-00-z"
   }
  },
  {
   "id": "P1-02",
   "title": "Transfer learning com Teachable Machine",
   "topics": [
    "D1-01"
   ],
   "cenario": "Uma linha de montagem precisa distinguir 3 peças pela câmera, mas não há time de ML nem milhares de fotos. Sem a técnica, o projeto morre na fase de coleta e treino do zero.",
   "passos": [
    "No Teachable Machine crie uma classe por peça mais uma classe \"nada\" (fundo).",
    "Grave várias amostras por classe, variando ângulo, distância e luz.",
    "Treine no navegador (o modelo base é reaproveitado, por isso poucos dados bastam) e teste ao vivo.",
    "Exporte para TensorFlow.js e carregue na página com <code>tmImage.load</code>.",
    "Classifique frames da webcam e só aja acima de um limiar de confiança.",
    "Anote os erros e volte a coletar amostras das classes que confundem. <code>tmImage</code> vem de um <code>&lt;script&gt;</code> global (snippet de página: carregue <code>@tensorflow/tfjs</code> e <code>@teachablemachine/image</code> por <code>&lt;script&gt;</code> e use <code>type=\"module\"</code> para o <code>await</code> de topo)."
   ],
   "code": {
    "lang": "js",
    "src": "const modelUrl = 'https://teachablemachine.withgoogle.com/models/MODEL_ID/model.json'\nconst metadataUrl = 'https://teachablemachine.withgoogle.com/models/MODEL_ID/metadata.json'\nconst minimumConfidence = 0.9\n\nconst model = await tmImage.load(modelUrl, metadataUrl)\nconst webcam = new tmImage.Webcam(224, 224, true)\nawait webcam.setup()\nawait webcam.play()\ndocument.getElementById('camera').appendChild(webcam.canvas)\n\nasync function classifyFrame() {\n  webcam.update()\n  const predictions = await model.predict(webcam.canvas)\n  const best = predictions.reduce((top, current) =>\n    current.probability > top.probability ? current : top\n  )\n  if (best.probability >= minimumConfidence) {\n    onPartDetected(best.className)\n  }\n  requestAnimationFrame(classifyFrame)\n}\n\nfunction onPartDetected(className) {\n  document.getElementById('result').textContent = className\n}\n\nrequestAnimationFrame(classifyFrame)"
   },
   "resultado": "Protótipo de visão funcional em horas, sem escrever treino, para validar a ideia antes de investir em dataset e modelo próprios.",
   "quandoNao": [
    "Precisão crítica (segurança, saúde): um protótipo de poucas amostras não basta.",
    "Objetos fora do que o modelo base reconhece bem, ou cenas com muita variação.",
    "Dados sensíveis que não podem ir para ferramenta de terceiros."
   ],
   "armadilha": "Treinar com poucos dados ou enviesados (mesma luz, mesmo fundo) e concluir que o modelo generaliza.",
   "repo": {
    "label": "exemplo-00-z",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-00-z"
   }
  },
  {
   "id": "P1-03",
   "title": "Recomendação por vetores no navegador (treino em Web Worker)",
   "topics": [
    "D1-02"
   ],
   "cenario": "Uma loja online quer recomendar produtos por perfil de compra sem mandar histórico para um servidor. Treinar na thread principal congela a página, e comparar todo usuário com todo produto não escala.",
   "passos": [
    "Codifique cada produto em um vetor: preço normalizado, categoria e cor em one-hot, idade média dos compradores.",
    "Multiplique cada bloco por um peso (categoria 0.4, cor 0.3, preço 0.2, idade 0.1) para controlar a influência no ranking.",
    "Codifique o usuário como a média dos vetores dos produtos que comprou; sem compras, use um vetor neutro (fallback).",
    "Rode treino e inferência num Web Worker e comunique por <code>postMessage</code>: a UI continua responsiva.",
    "Ranqueie os produtos pela saída do modelo e exiba o top 10.",
    "Em escala real, troque a comparação total por busca em banco vetorial. O snippet mostra só a codificação e o contrato do worker; o treino completo está no repo."
   ],
   "code": {
    "lang": "js",
    "src": "importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0')\n\nconst WEIGHTS = { category: 0.4, color: 0.3, price: 0.2, age: 0.1 }\n\nconst normalize = (value, min, max) => (value - min) / ((max - min) || 1)\n\nconst oneHotWeighted = (index, length, weight) =>\n  tf.oneHot(index, length).cast('float32').mul(weight)\n\nfunction encodeProduct(product, context) {\n  const price = tf.tensor1d([\n    normalize(product.price, context.minPrice, context.maxPrice) * WEIGHTS.price,\n  ])\n  const age = tf.tensor1d([\n    (context.productAvgAgeNorm[product.name] ?? 0.5) * WEIGHTS.age,\n  ])\n  const category = oneHotWeighted(\n    context.categoriesIndex[product.category],\n    context.numCategories,\n    WEIGHTS.category\n  )\n  const color = oneHotWeighted(\n    context.colorsIndex[product.color],\n    context.numColors,\n    WEIGHTS.color\n  )\n  return tf.concat1d([price, age, category, color])\n}\n\nfunction encodeUser(user, context) {\n  if (!user.purchases.length) {\n    return tf.zeros([1, context.dimensions])\n  }\n  return tf\n    .stack(user.purchases.map(product => encodeProduct(product, context)))\n    .mean(0)\n    .reshape([1, context.dimensions])\n}\n\nself.onmessage = ({ data }) => {\n  if (data.type === 'train') {\n    postMessage({ type: 'training-done', users: data.users.length })\n  }\n}"
   },
   "resultado": "Recomendação personalizada rodando 100% no cliente, com UI fluida e pesos ajustáveis que você pode calibrar contra métricas de clique ou conversão.",
   "quandoNao": [
    "Catálogo e base de usuários grandes: use banco vetorial no servidor.",
    "Pouco histórico de compra (cold start): comece por mais vendidos ou regras.",
    "Quando o histórico é dado que não pode ficar no dispositivo."
   ],
   "armadilha": "Pesos de atributo mal calibrados distorcem o ranking, e rodar o treino na thread principal trava a interface.",
   "repo": {
    "label": "exemplo-01-ecommerce-recomendations-z",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-01-ecommerce-recomendations-z"
   }
  },
  {
   "id": "P1-04",
   "title": "Detecção de objetos em tempo real (YOLO + TensorFlow.js)",
   "topics": [
    "D1-03"
   ],
   "cenario": "Um app de QA precisa reconhecer elementos visuais em um canvas (jogo, vídeo, câmera) para automatizar ações. Rodar inferência na thread principal derruba o FPS, e tensores não liberados vazam memória até a aba travar.",
   "passos": [
    "Carregue o modelo (YOLOv5n em formato web) com <code>tf.loadGraphModel</code> dentro de um Web Worker, com a versão do tfjs fixada.",
    "Faça um warm-up com um tensor de uns e descarte-o: a primeira inferência é sempre lenta.",
    "Capture o canvas a cada 200 ms como <code>ImageBitmap</code> e envie ao worker.",
    "Pré-processe dentro de <code>tf.tidy</code>: redimensione para 640x640, divida por 255 e adicione a dimensão de batch.",
    "Leia caixas, scores e classes, descarte tudo que ficou abaixo do limiar (0.4) e libere cada tensor.",
    "Devolva as detecções (rótulo, score e caixa normalizada 0-1) ao main thread para agir. O parsing assume saída boxes/scores/classes nas 3 primeiras posições, como no repo: confirme o formato do seu modelo."
   ],
   "code": {
    "lang": "js",
    "src": "importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0')\nconst INPUT_SIZE = 640\nconst CLASS_THRESHOLD = 0.4\nlet model\nlet labels\nasync function loadModel() {\n  await tf.ready()\n  labels = await (await fetch('yolov5n_web_model/labels.json')).json()\n  model = await tf.loadGraphModel('yolov5n_web_model/model.json')\n  const warmup = tf.ones(model.inputs[0].shape)\n  await model.executeAsync(warmup)\n  tf.dispose(warmup)\n  postMessage({ type: 'model-loaded' })\n}\nconst preprocess = frame =>\n  tf.tidy(() =>\n    tf.image\n      .resizeBilinear(tf.browser.fromPixels(frame), [INPUT_SIZE, INPUT_SIZE])\n      .div(255)\n      .expandDims(0)\n  )\nasync function detect(frame) {\n  const input = preprocess(frame)\n  const output = await model.executeAsync(input)\n  tf.dispose(input)\n  const [boxes, scores, classes] = await Promise.all(output.slice(0, 3).map(t => t.data()))\n  output.forEach(tensor => tensor.dispose())\n  return Array.from(scores, (score, index) => ({ score, index }))\n    .filter(({ score }) => score >= CLASS_THRESHOLD)\n    .map(({ score, index }) => ({\n      label: labels[classes[index]],\n      score,\n      box: Array.from(boxes.slice(index * 4, index * 4 + 4)),\n    }))\n}\nloadModel()\nself.onmessage = async ({ data }) => {\n  if (data.type === 'predict' && model) {\n    postMessage({ type: 'detections', items: await detect(data.image) })\n  }\n}"
   },
   "resultado": "Detecção contínua sem travar a UI e com memória estável, base para automações visuais, contagem de objetos ou assistência por câmera.",
   "quandoNao": [
    "Basta classificar a imagem inteira: um classificador é mais simples.",
    "Precisa de precisão alta em hardware fraco: modelo grande no navegador não roda bem.",
    "A decisão é crítica e não admite falso positivo."
   ],
   "armadilha": "Esquecer <code>tf.tidy</code>/<code>dispose</code> e vazar memória de tensores, ou pular o warm-up.",
   "repo": {
    "label": "exemplo-02-vencendo-qualquer-jogo",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-02-vencendo-qualquer-jogo"
   }
  },
  {
   "id": "P1-05",
   "title": "Algoritmo genético com função de fitness",
   "topics": [
    "D1-04"
   ],
   "cenario": "Um time precisa calibrar 6 parâmetros de um simulador (pesos de ranking, limites de fila) e a busca manual é lenta e viciada no que já funcionou. Não há gradiente nem dados rotulados, só uma forma de pontuar uma configuração.",
   "passos": [
    "Represente cada solução como um genoma (vetor de genes entre 0 e 1).",
    "Escreva a fitness: nota maior para a configuração melhor. Aqui ela mede a distância até uma meta fictícia; no mundo real, rode o simulador.",
    "Gere a população inicial aleatória e a cada geração ordene por fitness.",
    "Selecione pais por torneio e combine genes com crossover uniforme.",
    "Aplique mutação pequena e rara (5%) e preserve a elite (2 melhores) sem alterar.",
    "Pare por número de gerações ou quando a fitness estabilizar. Ajuste a taxa de mutação olhando a curva."
   ],
   "code": {
    "lang": "js",
    "src": "const POPULATION_SIZE = 40\nconst GENERATIONS = 60\nconst MUTATION_RATE = 0.05\nconst GENE_COUNT = 6\n\nconst randomGenome = () => Array.from({ length: GENE_COUNT }, () => Math.random())\n\nfunction fitness(genome) {\n  const target = [0.2, 0.8, 0.5, 0.1, 0.9, 0.4]\n  const error = genome.reduce((sum, gene, i) => sum + Math.abs(gene - target[i]), 0)\n  return 1 / (1 + error)\n}\n\nfunction tournament(scored) {\n  const a = scored[Math.floor(Math.random() * scored.length)]\n  const b = scored[Math.floor(Math.random() * scored.length)]\n  return a.score > b.score ? a.genome : b.genome\n}\n\nconst crossover = (left, right) =>\n  left.map((gene, i) => (Math.random() < 0.5 ? gene : right[i]))\n\nconst mutate = genome =>\n  genome.map(gene =>\n    Math.random() < MUTATION_RATE\n      ? Math.min(1, Math.max(0, gene + (Math.random() - 0.5) * 0.2))\n      : gene\n  )\n\nlet population = Array.from({ length: POPULATION_SIZE }, randomGenome)\nfor (let generation = 0; generation < GENERATIONS; generation++) {\n  const scored = population\n    .map(genome => ({ genome, score: fitness(genome) }))\n    .sort((a, b) => b.score - a.score)\n  const elite = scored.slice(0, 2).map(item => item.genome)\n  const children = Array.from({ length: POPULATION_SIZE - elite.length }, () =>\n    mutate(crossover(tournament(scored), tournament(scored)))\n  )\n  population = [...elite, ...children]\n}\nconst [best] = population\n  .map(genome => ({ genome, score: fitness(genome) }))\n  .sort((a, b) => b.score - a.score)\nconsole.log(best)"
   },
   "resultado": "Convergência para uma configuração boa sem derivadas nem dataset, com custo previsível (população x gerações x custo da fitness).",
   "quandoNao": [
    "Existe gradiente ou solução analítica: otimização clássica é mais barata.",
    "A fitness é cara e você tem poucos orçamentos de avaliação.",
    "O espaço de busca é pequeno: force bruta basta."
   ],
   "armadilha": "Fitness mal desenhada: o algoritmo otimiza o que você mediu, não o que você queria (e mutação mal calibrada gera caos ou estagnação)."
  },
  {
   "id": "P1-06",
   "title": "Ajustar temperature e topK por tipo de tarefa",
   "topics": [
    "D1-05",
    "D1-06"
   ],
   "cenario": "A mesma feature usa a LLM para extrair dados de faturas e para sugerir nomes de produto. Com uma configuração só, a extração varia entre execuções e a criatividade sai repetitiva.",
   "passos": [
    "Classifique a tarefa: extração e classificação pedem determinismo; brainstorm pede variedade.",
    "Leia os limites do modelo com <code>LanguageModel.params()</code> em vez de chumbar números.",
    "Para extração, use temperature 0 e topK 1; para criatividade, suba acima do default.",
    "Crie uma sessão por perfil, já com o system prompt, e reuse a sessão certa em cada chamada.",
    "Valide a saída de extração em código (regex ou schema) e compare execuções repetidas.",
    "Exemplo com a Prompt API do Chrome (Gemini Nano); com API de nuvem os mesmos parâmetros existem com outros nomes."
   ],
   "code": {
    "lang": "js",
    "src": "const { defaultTemperature, defaultTopK, maxTemperature, maxTopK } = await LanguageModel.params()\n\nconst clamp = (value, max) => Math.min(Math.max(value, 0), max)\n\nasync function createSession({ temperature, topK }) {\n  return LanguageModel.create({\n    expectedInputLanguages: ['pt'],\n    temperature: clamp(temperature, maxTemperature),\n    topK: Math.min(topK, maxTopK),\n    initialPrompts: [\n      { role: 'system', content: 'Responda em texto simples, sem markdown.' },\n    ],\n  })\n}\n\nconst extractor = await createSession({ temperature: 0, topK: 1 })\nconst brainstorm = await createSession({\n  temperature: defaultTemperature * 1.5,\n  topK: defaultTopK * 2,\n})\n\nconst invoiceFields = await extractor.prompt(\n  'Extraia o valor total e o vencimento: \"Fatura de R$ 1.250,00 vence em 10/11\"'\n)\nconst names = await brainstorm.prompt('Sugira 5 nomes para um app de finanças pessoais')\nconsole.log(invoiceFields, names)"
   },
   "resultado": "Extração repetível e criatividade útil, cada uma com sua configuração, e menos retrabalho por saída instável.",
   "quandoNao": [
    "Já usa saída estruturada com validação rígida e a variação não importa.",
    "O provedor ou modelo fixa esses parâmetros (alguns de raciocínio ignoram temperature).",
    "Está debugando o prompt: mude uma variável por vez, não os parâmetros junto."
   ],
   "armadilha": "Ignorar a temperature numa tarefa que pede determinismo.",
   "repo": {
    "label": "exemplo-04-webai02-temperature-and-topK",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-04-webai02-temperature-and-topK"
   }
  },
  {
   "id": "P1-07",
   "title": "Orçamento de tokens e janela de contexto",
   "topics": [
    "D1-05"
   ],
   "cenario": "Um chat de suporte cola o histórico inteiro mais os documentos no prompt. Conversas longas estouram o contexto, o custo sobe e o modelo perde o que estava no meio.",
   "passos": [
    "Defina a janela do modelo e reserve uma fatia para a resposta.",
    "Estime os tokens do prompt fixo (system + pergunta). A razão de ~4 caracteres por token é só uma heurística: use o tokenizer do modelo para valor exato.",
    "Preencha o que sobra com os trechos mais relevantes, em ordem de relevância, até acabar o orçamento.",
    "Quando o histórico crescer, resuma as mensagens antigas em vez de cortar.",
    "Registre tokens usados por requisição (o campo <code>usage</code> da resposta) e alerte quando passar de 80%."
   ],
   "code": {
    "lang": "js",
    "src": "const CONTEXT_WINDOW = 8000\nconst RESERVED_FOR_ANSWER = 1000\nconst CHARS_PER_TOKEN = 4\n\nconst estimateTokens = text => Math.ceil(text.length / CHARS_PER_TOKEN)\n\nfunction fitToBudget({ systemPrompt, question, chunks }) {\n  const fixedCost = estimateTokens(systemPrompt) + estimateTokens(question)\n  let remaining = CONTEXT_WINDOW - RESERVED_FOR_ANSWER - fixedCost\n  const included = []\n  for (const chunk of chunks) {\n    const cost = estimateTokens(chunk)\n    if (cost > remaining) break\n    included.push(chunk)\n    remaining -= cost\n  }\n  return { included, dropped: chunks.length - included.length, remaining }\n}\n\nconst result = fitToBudget({\n  systemPrompt: 'Responda apenas com base no contexto.',\n  question: 'Qual o prazo de reembolso?',\n  chunks: ['Reembolsos em até 7 dias.', 'Frete não é reembolsável.'],\n})\nconsole.log(result)"
   },
   "resultado": "Prompts que cabem na janela, custo previsível por requisição e respostas que não perdem o contexto importante.",
   "quandoNao": [
    "Prompts curtos e fixos: o orçamento é overhead.",
    "Contexto longo é o ponto (análise de um documento inteiro): use modelo de janela maior.",
    "Dá para resolver trocando por RAG, que já seleciona o trecho."
   ],
   "armadilha": "Achar que 4.000 tokens são 4.000 palavras."
  },
  {
   "id": "P1-08",
   "title": "Web AI com checagem de disponibilidade e fallback",
   "topics": [
    "D1-06"
   ],
   "cenario": "Um editor quer resumir texto no navegador sem custo de API e sem enviar o conteúdo ao servidor. Nem todo usuário tem Chrome recente, hardware compatível ou o modelo baixado, e a página simplesmente quebra neles.",
   "passos": [
    "Detecte a API com <code>'LanguageModel' in self</code>; se não existir, vá direto ao fallback.",
    "Chame <code>LanguageModel.availability()</code>: <code>unavailable</code> vai para o servidor; <code>downloadable</code> exige download.",
    "No <code>create</code>, use o <code>monitor</code> e o evento <code>downloadprogress</code> para mostrar o progresso, pois o download é pesado, sobretudo no celular.",
    "Esconda a diferença atrás de uma função <code>ask</code>, que chama a sessão local ou o endpoint do servidor.",
    "Teste nos dois caminhos e em Chrome sem a flag ativa. Endpoint <code>/api/assistant</code> do snippet é fictício."
   ],
   "code": {
    "lang": "js",
    "src": "async function getAssistant(onProgress) {\n  if (!('LanguageModel' in self)) return { kind: 'server' }\n\n  const availability = await LanguageModel.availability({ languages: ['en'] })\n  if (availability === 'unavailable') return { kind: 'server' }\n\n  const session = await LanguageModel.create({\n    expectedInputLanguages: ['en'],\n    monitor(monitor) {\n      monitor.addEventListener('downloadprogress', event => {\n        onProgress(Math.round((event.loaded / event.total) * 100))\n      })\n    },\n  })\n  return { kind: 'local', session }\n}\n\nasync function ask(assistant, question) {\n  if (assistant.kind === 'local') return assistant.session.prompt(question)\n  const response = await fetch('/api/assistant', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ question }),\n  })\n  return (await response.json()).answer\n}\n\nconst assistant = await getAssistant(percent => {\n  document.getElementById('progress').textContent = `Baixando modelo: ${percent}%`\n})\nconsole.log(await ask(assistant, 'Resuma este texto em uma frase.'))"
   },
   "resultado": "Usuários compatíveis têm IA local, privada e sem custo por token; os demais continuam funcionando pelo servidor.",
   "quandoNao": [
    "Precisa de resultado idêntico em todos os navegadores: use só o servidor.",
    "A tarefa exige modelo grande: o local é pequeno.",
    "Público majoritariamente em rede móvel limitada: o download não compensa."
   ],
   "armadilha": "Assumir suporte universal de navegador e ignorar o custo de download em conexões móveis.",
   "repo": {
    "label": "exemplo-05-webai03-multimodal",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-05-webai03-multimodal"
   }
  },
  {
   "id": "P1-09",
   "title": "Streaming com cancelamento e sessão descartável",
   "topics": [
    "D1-06",
    "D1-05"
   ],
   "cenario": "Uma tela de chat espera a resposta inteira antes de mostrar qualquer coisa, e o usuário que se arrependeu da pergunta não tem como parar. Sessões antigas ficam abertas consumindo memória.",
   "passos": [
    "Use <code>promptStreaming</code> e consuma com <code>for await</code>, anexando cada pedaço à tela.",
    "Crie um <code>AbortController</code> por pergunta e passe o <code>signal</code> na chamada e trate o <code>AbortError</code> que o stream lança ao cancelar.",
    "Troque o botão Enviar por Parar enquanto gera; Parar chama <code>abort()</code>.",
    "Antes de uma nova pergunta, aborte a anterior e chame <code>session.destroy()</code>.",
    "Recrie a sessão quando o usuário mudar temperature ou topK, pois eles são fixados na criação."
   ],
   "code": {
    "lang": "js",
    "src": "const state = { session: null, controller: null }\n\nasync function* streamAnswer(question, temperature, topK) {\n  state.controller?.abort()\n  state.controller = new AbortController()\n  state.session?.destroy()\n\n  state.session = await LanguageModel.create({\n    expectedInputLanguages: ['pt'],\n    temperature,\n    topK,\n  })\n\n  const stream = state.session.promptStreaming(\n    [{ role: 'user', content: question }],\n    { signal: state.controller.signal }\n  )\n\n  try {\n    for await (const chunk of stream) yield chunk\n  } catch (error) {\n    if (error.name !== 'AbortError') throw error\n  }\n}\n\nconst output = document.getElementById('output')\ndocument.getElementById('stop').addEventListener('click', () => state.controller?.abort())\n\nfor await (const chunk of streamAnswer('Explique o que é um tensor', 0.7, 3)) {\n  output.textContent += chunk\n}"
   },
   "resultado": "Primeiro texto na tela em instantes, controle do usuário sobre a geração e sem vazamento de sessões.",
   "quandoNao": [
    "Saída curta e não interativa (um rótulo): <code>prompt</code> simples basta.",
    "O resultado precisa ser validado inteiro antes de aparecer (JSON): não mostre pela metade.",
    "Processo em lote sem UI."
   ],
   "armadilha": "Não criar uma nova sessão ao mudar os parâmetros (a sessão antiga mantém a configuração antiga).",
   "repo": {
    "label": "exemplo-04-webai02-temperature-and-topK",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-04-webai02-temperature-and-topK"
   }
  },
  {
   "id": "P1-10",
   "title": "Prompt estruturado: papel, regras, formato, exemplo e \"não sei\"",
   "topics": [
    "D1-07"
   ],
   "cenario": "Um time de suporte pede à LLM \"classifica esse ticket\" e recebe respostas em formatos diferentes, com números inventados quando faltam dados. Cada pessoa reescreve o prompt do seu jeito.",
   "passos": [
    "Defina o papel e a tarefa em uma frase cada.",
    "Injete só o contexto necessário (plano, histórico), com marcadores claros.",
    "Liste regras explícitas, incluindo a permissão de dizer \"não sei\" e pedir os dados que faltam.",
    "Fixe o formato de saída (JSON com chaves conhecidas).",
    "Inclua um exemplo curto (few-shot) do formato esperado.",
    "Versione o template no repositório e teste com um conjunto fixo de tickets antes de alterar."
   ],
   "code": {
    "lang": "text",
    "src": "PAPEL: Você é analista de suporte nível 2 de um SaaS B2B.\nTAREFA: Classificar o ticket abaixo e propor a próxima ação.\nCONTEXTO: Plano do cliente: {plan}. Histórico: {history}.\nREGRAS:\n- Use apenas as informações fornecidas.\n- Se faltar dado para decidir, responda \"não sei\" e liste o que falta.\n- Não invente números de pedido nem prazos.\nFORMATO: JSON {\"category\": \"...\", \"next_action\": \"...\", \"missing_data\": []}\nEXEMPLO:\nTicket: \"Fui cobrado duas vezes\"\nSaída: {\"category\":\"billing\",\"next_action\":\"abrir estorno\",\"missing_data\":[\"id da fatura\"]}\nTICKET: {ticket}"
   },
   "resultado": "Saídas padronizadas e parseáveis, menos alucinação em dado ausente e um prompt que o time inteiro reaproveita.",
   "quandoNao": [
    "Tarefa trivial de uma linha: o template é excesso.",
    "Exploração criativa em que você quer a variação.",
    "O modelo já está fixado por fine-tuning para o formato."
   ],
   "armadilha": "Pedido vago, sem papel, sem exemplo e sem permitir \"não sei\".",
   "repo": {
    "label": "exemplo-13-embeddings-neo4j-rag",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-13-embeddings-neo4j-rag"
   }
  },
  {
   "id": "P1-11",
   "title": "Saída JSON validada em código (e quando considerar TOON)",
   "topics": [
    "D1-07"
   ],
   "cenario": "Uma pipeline lê a resposta da LLM direto com <code>JSON.parse</code>. Quando o modelo devolve texto antes do JSON, ou um campo com tipo errado, o job quebra no meio da madrugada.",
   "passos": [
    "Peça no prompt um JSON com chaves e tipos definidos.",
    "Extraia o trecho entre a primeira <code>{</code> e a última <code>}</code> antes do parse.",
    "Valide cada campo obrigatório e o seu tipo; erro explícito, nunca engolido. Em produção, use Zod ou outro schema validator.",
    "Se falhar, tente de novo uma vez e então registre o erro e a resposta bruta.",
    "Só avalie TOON se tokens de lista grande de objetos forem custo relevante: o formato economiza tokens em arrays uniformes, mas exige parser próprio."
   ],
   "code": {
    "lang": "js",
    "src": "const REQUIRED_FIELDS = { sentiment: 'string', urgency: 'number', summary: 'string' }\n\nfunction parseTicket(raw) {\n  const jsonStart = raw.indexOf('{')\n  const jsonEnd = raw.lastIndexOf('}')\n  if (jsonStart === -1 || jsonEnd === -1) throw new Error('no JSON object in response')\n  const data = JSON.parse(raw.slice(jsonStart, jsonEnd + 1))\n  for (const [field, type] of Object.entries(REQUIRED_FIELDS)) {\n    if (typeof data[field] !== type) throw new Error(`invalid field: ${field}`)\n  }\n  return data\n}\n\nasync function classifyTicket(callModel, text) {\n  const prompt = [\n    'Classifique o ticket. Responda somente com JSON no formato:',\n    '{\"sentiment\":\"positive|neutral|negative\",\"urgency\":1-5,\"summary\":\"...\"}',\n    `Ticket: ${text}`,\n  ].join('\\n')\n  let lastError\n  for (let attempt = 0; attempt < 2; attempt++) {\n    const raw = await callModel(prompt)\n    try {\n      return parseTicket(raw)\n    } catch (error) {\n      lastError = error\n    }\n  }\n  throw lastError\n}\n\nconst fakeModel = async () => '{\"sentiment\":\"negative\",\"urgency\":4,\"summary\":\"Cobrança duplicada\"}'\nconsole.log(await classifyTicket(fakeModel, 'Fui cobrado duas vezes!'))"
   },
   "resultado": "Falha de formato vira erro tratado e retentável, em vez de exceção no meio do pipeline.",
   "quandoNao": [
    "O provedor oferece saída estruturada com schema garantido: use o recurso nativo.",
    "Texto livre para humano ler.",
    "TOON sem dominar um bom JSON antes."
   ],
   "armadilha": "Forçar TOON antes de dominar um bom JSON estruturado."
  },
  {
   "id": "P1-12",
   "title": "Spec Driven Development com agente (PLAN antes de AGENT)",
   "topics": [
    "D1-08"
   ],
   "cenario": "Um dev pede \"faz o export de relatório\" ao agente do editor e recebe um endpoint que carrega tudo em memória, sem testes e fora do padrão do projeto. Os buracos do prompt viraram chutes.",
   "passos": [
    "Escreva a spec antes: contexto técnico, requisitos, não-requisitos, critérios de aceite, contrato e plano de testes.",
    "Abra o chat em modo PLAN e peça o plano a partir da spec; revise e aprove ou corrija.",
    "Só então passe para o modo AGENT para executar, passo a passo.",
    "Exija evidência a cada etapa: teste rodando, diff pequeno, saída do linter.",
    "Restrinja as ferramentas e permissões do agente ao escopo da tarefa.",
    "Revise o diff como qualquer PR, e atualize a spec se o entendimento mudou."
   ],
   "code": {
    "lang": "text",
    "src": "SPEC: exportar relatório de pedidos em CSV\nCONTEXTO: Node 22, Fastify, Postgres 16, testes com Vitest\nREQUISITOS\n- GET /reports/orders.csv?from=&to= (datas ISO)\n- Streaming, sem carregar tudo em memória\nNÃO-REQUISITOS\n- Sem novo endpoint de autenticação\n- Sem alterar o schema do banco\nCRITÉRIOS DE ACEITE\n- Intervalo > 90 dias retorna 422\n- 100 mil linhas em < 5 s e < 150 MB de RAM\nCONTRATO\n- Header: id,customer,total_cents,created_at\nPLANO DE TESTES\n- unitário do formatter, integração do endpoint com 3 casos\nFLUXO: PLAN (aprovar) -> AGENT (implementar) -> rodar testes -> evidências"
   },
   "resultado": "Menos retrabalho e menos código inventado, porque o agente tem critério de pronto e o plano passa por revisão humana antes de qualquer edição.",
   "quandoNao": [
    "Correção de uma linha ou renomeação: spec é cerimônia demais.",
    "Exploração de ideia em que o requisito ainda não existe.",
    "Ambiente de produção sem sandbox: agente com permissão ampla é risco."
   ],
   "armadilha": "Dar acesso amplo a ferramentas sem escopo e confiar em app gerado \"mágico\" sem revisão (a apostila cita o caso de um agente que apagou um banco)."
  },
  {
   "id": "P1-13",
   "title": "Geração de testes E2E com Playwright MCP",
   "topics": [
    "D1-09",
    "D1-08"
   ],
   "cenario": "O time pede à LLM testes E2E e recebe seletores inventados que falham no primeiro run, porque o modelo nunca viu a página real.",
   "passos": [
    "Instale o Playwright MCP no cliente (VS Code) para o agente ter ferramentas de navegador.",
    "Peça primeiro o scaffolding mínimo (<code>@playwright/test</code>, baseURL do app).",
    "Use um prompt que obriga o agente a executar os passos no navegador antes de escrever o teste.",
    "Prefira <code>getByRole</code> com nome acessível; é o que o agente observou na árvore de acessibilidade.",
    "Exija executar o teste e iterar até passar, e que seja idempotente (sem depender de estado prévio).",
    "Revise o teste gerado: confira se a asserção valida o comportamento e não apenas que a página abriu."
   ],
   "code": {
    "lang": "text",
    "src": "- Você é um gerador de testes Playwright.\n- NÃO gere código só a partir do cenário.\n- EXECUTE os passos um a um com as tools do Playwright MCP.\n- Só depois de concluir todos os passos, emita um teste TypeScript com @playwright/test baseado no histórico.\n- Salve em tests/ e execute; itere até passar.\n- Testes idempotentes, sem depender de estado prévio.\n- Prefira getByRole + nome a seletores frágeis.\n\nCENÁRIO: cadastrar um item na lista e verificar que aparece na tabela."
   },
   "resultado": "Testes baseados no que a página realmente expõe, com menos seletor quebrado e execução verificada pelo próprio agente.",
   "quandoNao": [
    "App sem ambiente de teste estável ou com dados voláteis.",
    "Fluxo trivial que um teste unitário cobre.",
    "Você não vai revisar o teste gerado."
   ],
   "armadilha": "Expor ações destrutivas sem proteção e aceitar o teste sem conferir o que ele realmente afirma.",
   "repo": {
    "label": "exemplo-06-playwright-testes",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-06-playwright-testes"
   }
  },
  {
   "id": "P1-14",
   "title": "Docs atualizadas via MCP (Context7)",
   "topics": [
    "D1-09"
   ],
   "cenario": "O modelo gera código com a API antiga de uma biblioteca (auth, ORM, framework) porque o treino é anterior à versão atual. O dev perde horas debugando função que não existe mais.",
   "passos": [
    "Registre o servidor MCP de documentação no cliente (config abaixo no formato do <code>.vscode/mcp.json</code>).",
    "No prompt, torne o uso do MCP obrigatório e mande parar se ele não estiver disponível.",
    "Liste os assuntos que devem ser consultados (integração, provider, banco, migração).",
    "Peça para listar as páginas consultadas e os trechos usados antes do código.",
    "Rode o projeto e confira versão e imports contra a doc oficial. Confirme o nome do pacote e o formato da config na doc atual do servidor, pois mudam."
   ],
   "code": {
    "lang": "json",
    "src": "{\n  \"servers\": {\n    \"context7\": {\n      \"command\": \"npx\",\n      \"args\": [\n        \"-y\",\n        \"@upstash/context7-mcp\"\n      ]\n    }\n  }\n}"
   },
   "resultado": "Código gerado contra a documentação da versão atual, com fontes citadas para conferência.",
   "quandoNao": [
    "Biblioteca interna sem documentação indexada.",
    "Trabalho offline ou em rede restrita.",
    "API estável e bem conhecida pelo modelo."
   ],
   "armadilha": "Confiar na doc desatualizada do modelo em vez de um MCP de documentação (e deixar nomes e descrições de tool vagos).",
   "repo": {
    "label": "exemplo-08-context7",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-08-context7"
   }
  },
  {
   "id": "P1-15",
   "title": "LLM local com Ollama (API compatível com OpenAI)",
   "topics": [
    "D1-10"
   ],
   "cenario": "Uma área jurídica quer classificar documentos com LLM, mas não pode enviar texto confidencial a um provedor externo. Sem rodar localmente, a opção é não usar IA.",
   "passos": [
    "Instale o Ollama e baixe um modelo com <code>ollama pull</code>, escolhendo pelo tamanho que a máquina aguenta.",
    "Use o endpoint compatível <code>/v1/chat/completions</code>: o mesmo cliente que fala com a OpenAI funciona trocando a base URL.",
    "Fixe <code>temperature</code> 0 para classificação e dê instrução curta de formato.",
    "Leia <code>usage</code> na resposta para medir tokens e tempo.",
    "Compare com um modelo em nuvem num conjunto de exemplos antes de decidir.",
    "O snippet usa <code>llama3.2:3b</code> como exemplo; o repo usa <code>gpt-oss:20b</code> e <code>llama2-uncensored:7b</code>. Para produção com concorrência, o material indica vLLM, não Ollama."
   ],
   "code": {
    "lang": "bash",
    "src": "ollama pull llama3.2:3b\n\ncurl --silent -X POST http://localhost:11434/v1/chat/completions \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"model\": \"llama3.2:3b\",\n    \"temperature\": 0,\n    \"messages\": [\n      {\"role\": \"system\", \"content\": \"Classifique como PUBLICO ou CONFIDENCIAL. Só a palavra.\"},\n      {\"role\": \"user\", \"content\": \"Contrato 4471 com cliente X, valor R$ 80 mil, assinado ontem.\"}\n    ]\n  }' | jq -r '.choices[0].message.content, .usage'"
   },
   "resultado": "Dado sensível não sai da máquina, custo por token é zero, e a troca para nuvem fica trivial por usar a mesma API.",
   "quandoNao": [
    "Produção com muitos usuários simultâneos: Ollama atende um prompt por vez, use vLLM.",
    "Precisa da qualidade de um modelo de fronteira.",
    "A licença do modelo aberto restringe seu uso comercial."
   ],
   "armadilha": "Usar Ollama em produção e ignorar a licença do modelo aberto.",
   "repo": {
    "label": "exemplo-10-ollama",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-10-ollama"
   }
  },
  {
   "id": "P1-16",
   "title": "Gateway multi-modelo com OpenRouter e fallback",
   "topics": [
    "D1-10"
   ],
   "cenario": "Um produto depende de um único provedor de LLM. Quando ele limita a taxa ou cai, a feature inteira cai, e testar outro modelo exige reescrever a integração.",
   "passos": [
    "Crie a conta no OpenRouter e guarde a chave em variável de ambiente, nunca no Git.",
    "Aponte o cliente OpenAI-compatível (<code>ChatOpenAI</code>) para a base URL do OpenRouter com os headers de identificação.",
    "Defina o modelo principal e um modelo de reserva por variáveis de ambiente.",
    "Encadeie com <code>withFallbacks</code> para trocar de modelo em caso de erro.",
    "Registre qual modelo respondeu e quanto custou para comparar com dados reais.",
    "Revise a política de dados do provedor antes de enviar informação de cliente."
   ],
   "code": {
    "lang": "ts",
    "src": "import { ChatOpenAI } from \"@langchain/openai\";\n\nconst buildModel = (modelName: string) =>\n  new ChatOpenAI({\n    modelName,\n    temperature: 0.3,\n    maxRetries: 2,\n    openAIApiKey: process.env.OPENROUTER_API_KEY,\n    configuration: {\n      baseURL: \"https://openrouter.ai/api/v1\",\n      defaultHeaders: {\n        \"HTTP-Referer\": process.env.OPENROUTER_SITE_URL,\n        \"X-Title\": process.env.OPENROUTER_SITE_NAME,\n      },\n    },\n  });\n\nconst primary = buildModel(process.env.NLP_MODEL!);\nconst fallback = buildModel(process.env.NLP_FALLBACK_MODEL!);\n\nconst resilientModel = primary.withFallbacks({ fallbacks: [fallback] });\n\nconst answer = await resilientModel.invoke(\"Resuma em uma frase: o que é RAG?\");\nconsole.log(answer.content);"
   },
   "resultado": "Trocar de modelo vira mudança de configuração, e uma falha do provedor principal deixa de derrubar a feature.",
   "quandoNao": [
    "Já usa um único provedor com SLA e contrato adequados.",
    "Dados regulados que não podem passar por intermediário.",
    "Latência mínima é crítica: o gateway adiciona um salto."
   ],
   "armadilha": "Subir API key para o Git, ou escolher o modelo pela moda e não pelo contexto técnico, financeiro e legal.",
   "repo": {
    "label": "exemplo-11-openrouter",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-11-openrouter"
   }
  },
  {
   "id": "P1-17",
   "title": "Ingestão RAG: chunking, embeddings locais e Neo4j",
   "topics": [
    "D1-11",
    "D1-05"
   ],
   "cenario": "Uma empresa tem manuais e políticas em PDF e o suporte responde de cabeça, com informação desatualizada. Colocar o PDF inteiro no prompt estoura o contexto e custa caro.",
   "passos": [
    "Carregue o PDF com <code>PDFLoader</code>, página a página.",
    "Quebre em chunks de ~1000 caracteres com overlap de 200 (<code>RecursiveCharacterTextSplitter</code>), para preservar sentido entre cortes.",
    "Mantenha só os metadados úteis (origem) em cada chunk.",
    "Gere embeddings localmente com <code>HuggingFaceTransformersEmbeddings</code> (modelo definido por env).",
    "Grave no Neo4j com <code>Neo4jVectorStore.fromExistingGraph</code> e <code>addDocuments</code>.",
    "Limpe antes de reingerir para não duplicar. O snippet apaga tudo: em produção, versione por documento."
   ],
   "code": {
    "lang": "ts",
    "src": "import { PDFLoader } from \"@langchain/community/document_loaders/fs/pdf\";\nimport { RecursiveCharacterTextSplitter } from \"langchain/text_splitter\";\nimport {\n  HuggingFaceTransformersEmbeddings,\n} from \"@langchain/community/embeddings/huggingface_transformers\";\nimport { Neo4jVectorStore } from \"@langchain/community/vectorstores/neo4j_vector\";\n\nconst neo4jConfig = {\n  url: process.env.NEO4J_URI!,\n  username: process.env.NEO4J_USER!,\n  password: process.env.NEO4J_PASSWORD!,\n  indexName: \"policies_index\",\n  searchType: \"vector\" as const,\n  textNodeProperties: [\"text\"],\n  nodeLabel: \"Chunk\",\n};\n\nconst pages = await new PDFLoader(\"./policies.pdf\").load();\nconst splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });\nconst chunks = (await splitter.splitDocuments(pages)).map(chunk => ({\n  ...chunk,\n  metadata: { source: chunk.metadata.source },\n}));\n\nconst embeddings = new HuggingFaceTransformersEmbeddings({ model: process.env.EMBEDDING_MODEL! });\nconst store = await Neo4jVectorStore.fromExistingGraph(embeddings, neo4jConfig);\n\nawait store.query(\"MATCH (n:`Chunk`) DETACH DELETE n\");\nfor (const chunk of chunks) {\n  await store.addDocuments([chunk]);\n}\nawait store.close();"
   },
   "resultado": "A base de conhecimento fica pesquisável por significado, e atualizar um documento é reingerir, sem retreinar nenhum modelo.",
   "quandoNao": [
    "O corpus cabe inteiro no contexto: coloque no prompt.",
    "O problema é estilo ou comportamento do modelo, não conhecimento (fine-tuning).",
    "Base mal estruturada ou cheia de lixo: indexar piora o resultado."
   ],
   "armadilha": "Chunks mal cortados, sem sentido completo, e base mal estruturada.",
   "repo": {
    "label": "exemplo-12-embeddings-neo4j",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-12-embeddings-neo4j"
   }
  },
  {
   "id": "P1-18",
   "title": "RAG: recuperação com score mínimo e resposta ancorada",
   "topics": [
    "D1-11",
    "D1-07"
   ],
   "cenario": "O assistente de suporte responde com segurança sobre um assunto que não está na base, inventando política que não existe. O cliente age em cima da resposta errada.",
   "passos": [
    "Busque os <code>topK</code> chunks mais próximos com <code>similaritySearchWithScore</code>.",
    "Descarte os abaixo de um score mínimo (0.5 no repo; calibre com perguntas reais).",
    "Se nada sobrar, devolva uma resposta padrão de \"não encontrei\" sem chamar o LLM.",
    "Monte o contexto separando os chunks e injete no prompt com a regra \"use apenas o contexto\".",
    "Encadeie prompt, modelo e parser e devolva o texto.",
    "Meça com um conjunto de perguntas com e sem resposta na base e ajuste topK e limiar."
   ],
   "code": {
    "lang": "ts",
    "src": "import { type Neo4jVectorStore } from \"@langchain/community/vectorstores/neo4j_vector\";\nimport { StringOutputParser } from \"@langchain/core/output_parsers\";\nimport { ChatPromptTemplate } from \"@langchain/core/prompts\";\nimport { type ChatOpenAI } from \"@langchain/openai\";\n\nconst TOP_K = 3;\nconst MIN_SCORE = 0.5;\n\nconst promptTemplate = ChatPromptTemplate.fromTemplate(\n  [\n    \"Você é um assistente de suporte.\",\n    \"Use APENAS o contexto abaixo. Se não houver informação suficiente, diga que não encontrou.\",\n    \"Pergunta: {question}\",\n    \"Contexto:\\n{context}\",\n  ].join(\"\\n\")\n);\n\nexport async function answerQuestion(\n  question: string,\n  store: Neo4jVectorStore,\n  model: ChatOpenAI\n): Promise<string> {\n  const results = await store.similaritySearchWithScore(question, TOP_K);\n  const relevant = results.filter(([, score]) => score > MIN_SCORE);\n\n  if (!relevant.length) {\n    return \"Não encontrei informações relevantes na base de conhecimento.\";\n  }\n\n  const context = relevant.map(([doc]) => doc.pageContent).join(\"\\n\\n---\\n\\n\");\n  const chain = promptTemplate.pipe(model).pipe(new StringOutputParser());\n  return chain.invoke({ question, context });\n}"
   },
   "resultado": "Respostas fundamentadas nos documentos e recusa explícita quando a base não cobre a pergunta.",
   "quandoNao": [
    "Perguntas que exigem cálculo ou raciocínio sobre toda a base (agregações): RAG puro não resolve.",
    "Base pequena e estável: prompt direto basta.",
    "Achar que MCP faz a recuperação: ele é canal, não método de recuperação."
   ],
   "armadilha": "Confundir RAG com fine-tuning e não permitir resposta \"não sei\".",
   "repo": {
    "label": "exemplo-13-embeddings-neo4j-rag",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-13-embeddings-neo4j-rag"
   }
  }
 ]
});
