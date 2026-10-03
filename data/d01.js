STUDY.push({
 "disc": {
  "num": "01",
  "nome": "Disciplina 01",
  "titulo": "Fundamentos de IA e LLMs para Programadores",
  "autor": "Erick Wendel",
  "emoji": "🧠",
  "resumo": "Da base (ML, redes neurais, tensores, recomendação, visão computacional) aos LLMs por dentro (tokens, embeddings, transformers), Web AI, prompt engineering, agentes e MCP, modelos abertos vs fechados e o primeiro RAG com JavaScript e Neo4j, tudo com mais de 12 projetos práticos em JS."
 },
 "materiais": [
  [
   "Repositório oficial — módulo 01",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores"
  ],
  [
   "Repositório oficial da pós (GitHub)",
   "https://github.com/unipds-engenharia-de-ia-aplicada"
  ],
  [
   "Biblioteca central da disciplina: TensorFlow.js (roda ML no navegador e no Node.js)",
   ""
  ],
  [
   "Indicação: Practical Machine Learning in JavaScript (C. Gerard, Apress, 2020)",
   ""
  ],
  [
   "Indicação: OpenAI, Prompt Engineering (guia oficial)",
   "https://platform.openai.com/docs/guides/prompt-engineering"
  ],
  [
   "Indicação: Hugging Face LLM Course (Hugging Face Learn)",
   ""
  ]
 ],
 "aviso": {
  "titulo": "🪟 Gotcha do Windows (avisado nas referências da disciplina)",
  "texto": "A lista de referências avisa que a instalação do <code>@tensorflow/tfjs-node</code> falha no Windows (a fonte não detalha a solução). Sugestões nossas, não da apostila: rode via <b>WSL2</b> ou use <code>@tensorflow/tfjs</code> (CPU/WebGL) no lugar da variante <code>-node</code>."
 },
 "blocos": [
  {
   "id": "d01-b0",
   "label": "Antes de começar"
  },
  {
   "id": "d01-b1",
   "label": "A base — o que é IA de verdade"
  },
  {
   "id": "d01-b2",
   "label": "Visão computacional e IA que aprende sozinha"
  },
  {
   "id": "d01-b3",
   "label": "O coração dos LLMs"
  },
  {
   "id": "d01-b4",
   "label": "Trabalhando com LLMs no dia a dia"
  },
  {
   "id": "d01-b5",
   "label": "Rodando e alimentando modelos"
  }
 ],
 "topics": [
  {
   "id": "D1-00",
   "bloco": "d01-b0",
   "mod": "Módulo 1 · Caps. 1 e 2",
   "emoji": "🚀",
   "read": "6 min",
   "title": "Introdução ao curso — a proposta e como estudar",
   "short": "Uma pós que forma devs que aplicam IA, não cientistas de dados.",
   "oneliner": "Esta pós <b>não forma cientistas de dados</b> — forma <b>desenvolvedores</b> que usam IA no dia a dia, com foco total em prática, usando <b>JavaScript</b> para rodar IA direto no navegador e em projetos locais.",
   "vovo": [
    "Imagine uma escola de culinária. Um curso ensina a <b>química dos alimentos</b> (a fórmula da fermentação); o outro ensina a <b>cozinhar de verdade</b> — pôr a mão na massa e servir o prato. Este curso é o segundo tipo: não afunda você em matemática pesada, ensina a <b>usar as ferramentas</b> pra resolver problemas reais.",
    "E tem a regra de ouro que a vovó conhece: <b>não adianta só assistir</b>. Aprender a cozinhar vendo vídeo não enche barriga de ninguém — tem que ir pro fogão, errar o ponto, repetir."
   ],
   "oque": [
    "Curso focado na <b>aplicação</b> de IA por desenvolvedores: entender conceitos e boas práticas, explorar ferramentas (gratuitas ou pagas) e aplicar IA no navegador ou em projetos locais. <b>Não</b> forma cientista de dados: nada de mergulho em matemática, estatística e infraestrutura complexa.",
    "Entregável: <b>mais de 12 projetos práticos</b> no módulo, com potencial de uso real em empresas, produtos e portfólio.",
    "Base técnica: <b>JavaScript/Node</b> e <b>TensorFlow.js</b>, aplicando IA sem trocar de stack.",
    "Temas prometidos: JavaScript, Web AI, LLMs, RAG, embeddings, vector databases e agentes; ferramentas como Teachable Machine, Ollama, OpenRouter e o VS Code adaptado para produtividade com IA."
   ],
   "como": [
    "<b>Por que JS e não Python?</b> É a linguagem nativa do navegador: todo dev cedo ou tarde encosta nela.",
    "Roda IA <b>no cliente</b>: modelos, áudio e vídeo por APIs nativas do navegador, sem custo adicional de servidor e com boa performance.",
    "Dá <b>autonomia</b>: você deixa de só integrar APIs de terceiros e passa a rodar IA com controle e economia de recursos.",
    "<b>Ponte com Python</b>: o TensorFlow.js também porta modelos treinados em Python para o navegador ou o Node.",
    "<b>Web 4.0</b>, no uso da apostila: sites sendo adaptados para que IAs busquem respostas direto na fonte, e navegadores capazes de executar modelos localmente.",
    "<b>O mapa, na ordem:</b> ML/DL/IA (<a href=\"#D1-01\">01</a>) → recomendação no navegador (<a href=\"#D1-02\">02</a>) → visão computacional com YOLO (<a href=\"#D1-03\">03</a>) → genéticos e reforço (<a href=\"#D1-04\">04</a>) → LLMs por dentro (<a href=\"#D1-05\">05</a>) → Web AI (<a href=\"#D1-06\">06</a>) → prompts JSON/TOON (<a href=\"#D1-07\">07</a>) → editores e agentes (<a href=\"#D1-08\">08</a>) → MCP (<a href=\"#D1-09\">09</a>) → modelos abertos e OpenRouter (<a href=\"#D1-10\">10</a>) → RAG (<a href=\"#D1-11\">11</a>).",
    "<b>Método do professor:</b> pegue cada exemplo e adapte (processou imagem? faça áudio ou vídeo; lidou com PDF? tente CSV ou planilha), crie projetos no GitHub, leia o material complementar e leve dúvidas ao Discord."
   ],
   "aplica": [
    "Pegue cada exemplo e adapte a outro contexto (processou imagem? tente áudio ou vídeo).",
    "Desenvolva um <b>projeto pessoal</b> como fio condutor — vira portfólio e networking.",
    "Leia o material complementar e participe da comunidade (o aprendizado real vem do problema real)."
   ],
   "pros": [
    "Aprende fazendo, com projetos reais",
    "Roda local/offline, sem custo de servidor",
    "Gera portfólio aplicável ao mercado"
   ],
   "contras": [
    "Exige disciplina de praticar, não só assistir",
    "Não aprofunda a matemática por trás dos modelos"
   ],
   "traps": [
    "Consumir o curso de forma passiva (só assistir e não codar): o professor pede explicitamente que isso não aconteça.",
    "Pular a prática e o material complementar.",
    "Achar que vídeo assistido = conhecimento fixado.",
    "Ler a apostila sem filtro: ela é derivada das aulas e traz grafias trocadas (Oriama, Yama e Olyama são o Ollama; “Reg” é RAG; “BetterOff” é o Better Auth; “ASCII” é o modo ASK). Este material usa os nomes corretos e avisa quando o código do repo diverge da apostila."
   ],
   "cola": [
    [
     "Foco do curso",
     "Aplicar IA como dev, não fazer ciência de dados"
    ],
    [
     "TensorFlow.js",
     "Roda ML no navegador e no Node; porta modelos do Python"
    ],
    [
     "Web 4.0",
     "Geração da web com IA nativa ao navegador (roda local)"
    ],
    [
     "Aprendizado ativo",
     "Praticar, adaptar e compartilhar, não apenas assistir"
    ],
    [
     "Projeto pessoal",
     "Fio condutor recomendado: vira portfólio e networking"
    ]
   ],
   "links": [
    [
     "Repositório oficial da disciplina",
     "https://github.com/unipds-engenharia-de-ia-aplicada"
    ],
    [
     "Pac-Man com transfer learning (demo)",
     "https://storage.googleapis.com/tfjs-examples/webcam-transfer-learning/dist/index.html"
    ],
    [
     "ML vs Deep Learning (visão geral)",
     "https://www.datacamp.com/tutorial/machine-deep-learning"
    ]
   ],
   "curso": "Ferramentas apresentadas já na largada: <b>Teachable Machine</b>, <b>OpenRouter</b>, <b>Ollama</b> e o VS Code adaptado. Ambiente: VS Code + Node.js, com muitos exemplos rodando 100% no navegador. Compromisso mútuo: o professor entrega conteúdo de experiência real; o aluno pratica, comenta e avalia cada aula (o feedback ajusta a abordagem)."
  },
  {
   "id": "D1-01",
   "bloco": "d01-b1",
   "mod": "Módulo 2 · Caps. 1 a 5",
   "emoji": "🧩",
   "read": "11 min",
   "title": "Machine Learning, Deep Learning e IA",
   "short": "IA ⊃ ML ⊃ DL: a base que costuma se confundir.",
   "oneliner": "<b>IA</b> é o guarda-chuva de qualquer sistema que resolve tarefas “inteligentes”; <b>Machine Learning</b> é o pedaço que aprende com exemplos em vez de regras escritas à mão; e <b>Deep Learning</b> é o ML turbinado com <b>redes neurais</b> de muitas camadas.",
   "vovo": [
    "Quer ensinar alguém a reconhecer uma laranja. <b>Jeito antigo (regras):</b> “se for redonda E laranja E do tamanho de um punho…” — mas uma tangerina quebra a regra, uma laranja verde quebra a regra. Você nunca termina de escrever exceções.",
    "<b>Machine Learning:</b> em vez de regras, mostra <b>mil fotos</b> de laranjas e mil de outras frutas. A criança descobre o padrão sozinha e acerta em frutas que nunca viu. <b>Deep Learning</b> é a mesma ideia com um “cérebro” de várias camadas: uma vê bordas, outra formas, outra textura, a última decide.",
    "O “neurônio artificial” é só uma <b>mini calculadora</b>: recebe números, faz uma continha e passa adiante. Junte milhares e vira uma rede que aprende. Apesar do nome, <b>não é um cérebro</b> — é matemática com nome bonito."
   ],
   "oque": [
    "<b>IA:</b> qualquer algoritmo que executa tarefas que “exigiriam inteligência”. Os nomes (“neurônios”, “redes neurais”) vêm do cérebro, mas o mecanismo é matemática e estatística; na definição prática da apostila, IA é “qualquer sistema que aprenda com dados para executar uma tarefa”.",
    "<b>ML:</b> subárea que troca regras manuais por <b>padrões aprendidos de dados</b>: ganha em flexibilidade, escala e adaptabilidade.",
    "<b>DL:</b> ML com <b>redes neurais profundas</b>; cada camada empilhada aprende representações mais abstratas (resolve bem imagem, voz e movimento).",
    "<b>Exemplo do professor:</b> trocar slides com gestos de um smartwatch. Em Java puro, com regras fixas e calibração manual dos sensores (acelerômetro, giroscópio), havia falsos positivos constantes; com DL bastaria coletar exemplos rotulados e treinar.",
    "<b>Transfer learning:</b> reaproveitar um modelo já treinado e refiná-lo com poucos dados. O Pac-Man controlado pela cabeça parte de um modelo que reconhece rostos e o refina com os movimentos que você define."
   ],
   "como": [
    "<b>Teachable Machine</b> (Google, gratuito): treina um classificador de imagem, áudio ou webcam sem código, no navegador. Uma classe por objeto (garrafa, controle remoto, relógio), várias amostras em ângulos e luzes diferentes. Exporta para TensorFlow.js, Node.js, P5.js, Arduino ou um HTML pronto com webcam.",
    "<b>Dataset real:</b> base do Kaggle com quase 8 mil fotos de raças de cachorro, já separadas em treino, validação e teste, enviadas em pastas (uma por raça). Testar com o conjunto de teste (nunca visto) demonstra <b>generalização</b>; fora do treino, o modelo devolve a classe mais próxima por similaridade.",
    "<b>Todo dado vira tensor</b> (vetor ou lista de números). <b>Normalização</b> escala o contínuo para 0–1, <code>(valor-min)/(max-min)</code> (idades de 15 a 45: 15 vira 0, 45 vira 1). <b>One-hot</b> marca uma só posição com 1 (cor, cidade). Resultado: tensor 2D, uma linha por pessoa.",
    "<b>Rede:</b> entrada → camadas ocultas (cada neurônio é uma “mini calculadora” que combina entradas por <b>pesos</b> e aplica uma <b>função de ativação</b>) → saída (um neurônio por categoria, com probabilidades).",
    "<b>Treinar</b> = mostrar exemplos rotulados, comparar a saída com o rótulo, ajustar os pesos para reduzir o erro (<b>loss</b>) e repetir por várias iterações (<b>epochs</b>). Mais exemplos e mais variados, melhor.",
    "<b>Primeira rede (Node 22, TF.js):</b> 7 entradas (idade + 3 cores + 3 cidades), camada oculta de 80 neurônios ReLU (escolha empírica para compensar poucos dados), saída de 3 neurônios Softmax (Premium, Medium, Basic). Compila com Adam e Categorical Cross Entropy; treina 100 epochs com shuffle e um callback que loga a loss por epoch.",
    "<b>Predição e sensibilidade:</b> um aluno novo é normalizado com o mesmo min/max do treino (idade 28 entre 25 e 40 dá 0.2) e vira <code>tf.tensor2d</code>. Na aula, o “Zé” (verde, Curitiba) saiu 77% Basic; trocando a cidade para São Paulo, Premium foi a 42%; trocando a cor para azul, a 90%. Padrões nunca vistos ainda recebem uma categoria, mas com confiança menor e distribuição mais equilibrada.",
    "<b>Mais dados e diversidade = melhor generalização.</b> A apostila cita um sensor do Google treinado com +60 milhões de horas de dados (grafa “LEM”; a referência da aula é o SensorLM, do Google Research)."
   ],
   "aplica": [
    "Classificar imagens, gestos e voz por exemplos em vez de regras (ex.: gesto no smartwatch).",
    "<b>Teachable Machine</b> para prototipar: detectar um objeto ou animal na webcam e disparar uma ação (abrir porta, acionar alarme, liberar um alimentador de pet).",
    "<b>Transfer learning</b> quando há poucos dados: refinar um modelo pronto em vez de treinar do zero.",
    "Desafio do professor: escolher uma base do Kaggle e treinar um modelo próprio no Teachable Machine."
   ],
   "pros": [
    "Generaliza para dados nunca vistos",
    "Resolve o que regras manuais não dão conta",
    "Flexível, escalável e adaptável"
   ],
   "contras": [
    "Precisa de muitos dados variados e representativos",
    "Comporta-se como “caixa-preta”",
    "Treino tem custo computacional real"
   ],
   "traps": [
    "Treinar com poucos dados ou dados enviesados.",
    "Esquecer a normalização: uma feature domina pela escala.",
    "Tratar categoria como número (sem one-hot), criando ordem que não existe.",
    "Achar que o modelo “decorou”: o valor está em <b>generalizar</b>.",
    "Tomar a explicação “o ChatGPT combina vários modelos especializados e roteia sua pergunta” como definitiva: a apostila simplifica. O núcleo é um LLM baseado em Transformer (doc <a href=\"#D1-05\">05</a>).",
    "Concluir algo de um dataset de 3 pessoas: o exemplo-00 é didático, não prova generalização."
   ],
   "cola": [
    [
     "Neurônio artificial",
     "Mini calculadora: combina entradas, aplica peso + ativação"
    ],
    [
     "Peso",
     "Quanto cada conexão influencia: é o que é “aprendido”"
    ],
    [
     "Tensor",
     "Estrutura numérica (vetor/matriz) que o modelo processa"
    ],
    [
     "Normalização",
     "Escalar números para 0–1"
    ],
    [
     "One-hot encoding",
     "Transformar categorias em vetores binários"
    ],
    [
     "ReLU",
     "Ativação que só deixa passar valores positivos"
    ],
    [
     "Softmax",
     "Transforma as saídas em probabilidades que somam 1"
    ],
    [
     "Adam",
     "Otimizador que ajusta os pesos pelo histórico de erros e acertos"
    ],
    [
     "Categorical cross entropy",
     "Loss para classificação com uma classe certa entre várias"
    ],
    [
     "Epoch",
     "Uma passada completa por todos os dados de treino"
    ],
    [
     "Loss",
     "O quão longe a previsão está da resposta certa"
    ],
    [
     "Generalização",
     "Acertar em dados nunca vistos"
    ],
    [
     "Transfer learning",
     "Reaproveitar um modelo treinado e refiná-lo"
    ]
   ],
   "links": [
    [
     "Anatomia de uma rede neural",
     "https://www.notablecap.com/blog/the-anatomy-of-a-neural-network"
    ],
    [
     "CNN Explainer (interativo)",
     "https://poloclub.github.io/cnn-explainer/"
    ],
    [
     "Teachable Machine",
     "https://teachablemachine.withgoogle.com/"
    ],
    [
     "Dataset de raças de cachorro (Kaggle)",
     "https://www.kaggle.com/datasets/gpiosenka/70-dog-breedsimage-data-set"
    ],
    [
     "Kaggle",
     "https://kaggle.com/"
    ],
    [
     "SensorLM (Google Research)",
     "https://research.google/blog/sensorlm-learning-the-language-of-wearable-sensors/"
    ],
    [
     "Pac-Man com transfer learning (demo)",
     "https://storage.googleapis.com/tfjs-examples/webcam-transfer-learning/dist/index.html"
    ]
   ],
   "curso": "<b>Teachable Machine</b> (webcam, depois o dataset de cachorros) e o <b>Pac-Man controlado pelo rosto</b> não têm código no repo; o <b>exemplo-00</b> (rede de alunos em Node) está detalhado abaixo.",
   "codigo": [
    {
     "proj": "exemplo-00",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-00-z",
     "resumo": "Treinar, em Node.js puro, uma rede neural minúscula que classifica pessoas em <b>premium</b>, <b>medium</b> ou <b>basic</b> — o \"hello world\" de tensores, normalização, one-hot encoding e treino.",
     "fluxo": [
      "<code>index.js</code> declara <code>tensorPessoasNormalizado</code> (entradas) e <code>tensorLabels</code> (saídas) como arrays JS e os converte com <code>tf.tensor2d(...)</code> em <code>inputXs</code> e <code>outputYs</code>.",
      "No template, o arquivo termina em <code>inputXs.print()</code> e <code>outputYs.print()</code>: serve para enxergar a forma dos dados antes de qualquer modelo.",
      "No z, <code>trainModel(inputXs, outputYs)</code> monta um <code>tf.sequential()</code> com <code>dense</code> de 80 unidades ReLU (<code>inputShape: [7]</code>) e <code>dense</code> de 3 unidades softmax.",
      "<code>model.compile</code> usa <code>optimizer: \"adam\"</code>, <code>loss: \"categoricalCrossentropy\"</code> e <code>metrics: [\"accuracy\"]</code>; <code>model.fit</code> roda <code>epochs: 100</code>, <code>shuffle: true</code>, <code>verbose: 0</code> (o log por época está comentado).",
      "<code>predict(model, pessoa)</code> cria <code>tf.tensor2d</code> da pessoa nova, chama <code>model.predict</code> e devolve as 3 probabilidades; o script ordena e imprime algo como <code>premium (xx.xx%)</code>.",
      "A pessoa de teste é \"zé\", com idade 28 normalizada como <code>(28 - 25) / (40 - 25) = 0.2</code>, usando o mesmo min/max do treino."
     ],
     "rodar": [
      "<b>Rodar:</b> Pré-requisito: Node com toolchain para compilar módulos nativos (o <code>tfjs-node</code> baixa/compila o binário do TensorFlow C).",
      "<b>Rodar:</b> Template ou z: <code>npm install</code> e depois <code>npm start</code> (executa <code>node --no-warnings --watch index.js</code>; qualquer salvamento reexecuta e retreina).",
      "<b>Rodar:</b> Nenhuma variável de ambiente é exigida.",
      "<b>Ideia:</b> Aumente o dataset (dezenas de pessoas) e compare a acurácia com 3 amostras: veja o overfitting na prática.",
      "<b>Ideia:</b> Reative o <code>onEpochEnd</code> e plote loss por época; teste <code>units</code> 8, 80 e 400.",
      "<b>Ideia:</b> Troque ReLU por sigmoid na camada oculta e observe a convergência.",
      "<b>Ideia:</b> Separe treino e validação (<code>validationSplit</code>) para medir generalização."
     ],
     "armadilhas": [
      "O <code>package.json</code> declara <code>\"types\": \"module\"</code> (o campo correto seria <code>\"type\"</code>); o import ESM em <code>.js</code> só funciona por causa da detecção automática de módulo ES em versões recentes do Node. Em Node antigo, dá erro de <code>import</code>.",
      "No z, o \"zé\" está descrito como cor verde e cidade Curitiba no objeto, mas o vetor usado tem azul e Rio (<code>[0.2, 1, 0, 0, 0, 1, 0]</code>): a predição reflete o vetor, não o objeto.",
      "<code>@tensorflow/tfjs-node</code> 4.22 pode falhar na instalação em Node muito novo ou no Windows sem build tools; é o erro mais comum desta aula.",
      "Com <code>--watch</code>, cada save retreina do zero e as probabilidades mudam: a inicialização dos pesos é aleatória.",
      "A apostila diz que a métrica de desempenho é a própria loss; o código usa <code>metrics: [\"accuracy\"]</code> (com <code>verbose: 0</code> nada é impresso, só o resultado final)."
     ],
     "templateVsZ": "<b>Template vs z:</b> o template tem apenas os tensores (<code>tf.tensor2d</code> + <code>print</code>), é a \"aula 1\": entender que a rede só enxerga números. O z acrescenta <code>trainModel</code> e <code>predict</code> com a rede dense 80 + softmax 3. O <code>package.json</code> é idêntico nos dois."
    }
   ]
  },
  {
   "id": "D1-02",
   "bloco": "d01-b1",
   "mod": "Módulo 3 · Caps. 1 a 7",
   "emoji": "🛒",
   "read": "12 min",
   "title": "Sistemas de Recomendação na prática",
   "short": "Estimar a probabilidade de cada cliente comprar cada produto.",
   "oneliner": "Um sistema de recomendação é uma rede neural que aprende, a partir do histórico, a <b>estimar a probabilidade</b> de cada cliente comprar cada produto — e ordena o catálogo do “mais provável” ao “menos provável”, inclusive para clientes <b>novos</b>, sem histórico.",
   "vovo": [
    "Pensa no feirante que você frequenta há anos: ele já sabe que você leva tomate, manjericão e uma fruta da estação — recomendação pelo <b>seu histórico</b>. Chega um cliente <b>novo</b> que ele nunca viu: ele repara “esse tem o jeito dos que levam café e pão na chapa” e sugere isso. Na falta do histórico, usa o comportamento de <b>gente parecida</b>.",
    "É isso que o sistema faz, com matemática: para cada par <i>(cliente, produto)</i> dá uma nota de 0 a 1 — a chance de comprar — e ordena do maior pro menor. E tudo roda <b>dentro do navegador</b>."
   ],
   "oque": [
    "Objetivo: <b>ranquear produtos pela probabilidade de compra</b> de cada usuário, ordenando o catálogo do mais ao menos provável.",
    "Cliente sem histórico (<b>cold start</b>): o modelo usa só a idade (demais atributos zerados) e acaba parecido com compradores de idade semelhante.",
    "Roda 100% no navegador: treino e predição no cliente, com <b>Web Worker</b> e <b>tfvis</b>.",
    "Mesma arquitetura serve para filmes, livros, cursos ou artigos: troca-se o domínio e as features (desafio final da aula; bases prontas no Kaggle)."
   ],
   "como": [
    "<b>Montar o contexto:</b> menor e maior idade e preço (<code>Math.min</code>/<code>Math.max</code>), índices únicos de cor e categoria (<code>Set</code> e <code>Object.fromEntries</code>) e a <b>idade média de quem comprou cada produto</b> (<code>ageSums</code> e <code>ageCounts</code>), com fallback para a média geral quando o produto nunca foi comprado. Captura que certos itens vendem mais em certas faixas etárias.",
    "<b>Codificar produto</b> (<code>encodeProduct</code>) num vetor normalizado, com <b>peso por atributo</b>: categoria (maior) &gt; cor &gt; preço &gt; idade. Categoria e cor viram one-hot multiplicado pelo peso; <code>tf.concat</code> junta preço, idade, categoria e cor.",
    "<b>Codificar usuário</b> (<code>encodeUser</code>): <code>tf.stack</code> dos vetores dos produtos comprados e <b>média</b>, um “perfil de compra” resumido. Sem compras: só a idade normalizada × peso, o resto zero.",
    "<b>Dados de treino:</b> para cada par (usuário, produto) a entrada é o vetor do usuário + o do produto (tamanho = dimensão × 2) e o rótulo é 1 (comprou) ou 0. Só usuários com compras entram no treino.",
    "<b>Rede:</b> densa <b>128 → 64 → 32 → 1</b> (ReLU; saída Sigmoid), Adam com taxa 0.01, binaryCrossentropy, 100 epochs, batch 32, shuffle.",
    "<b>Worker e tfvis:</b> o treino roda numa thread secundária e posta loss e accuracy a cada epoch; o painel plota em tempo real. A UI é baseada em eventos: adicionar ou remover compra dispara novo treino.",
    "<b>Predição:</b> concatena o vetor do usuário com o de cada produto num tensor 2D, prevê, junta aos metadados e <b>ordena</b>. Saída perto de 0.9 = forte recomendação; perto de 0.1 = fraca. Ao pôr um item no carrinho, a lista se reordena.",
    "<b>Escala:</b> comparar todos os usuários com todos os produtos não aguenta milhões de registros. A saída da aula: guardar os vetores num banco vetorial (Pinecone, ChromaDB, extensão vetorial do PostgreSQL), buscar os <b>top N</b> (ex.: 200) mais próximos e rodar o <code>predict</code> só neles."
   ],
   "aplica": [
    "E-commerce, filmes, artigos, cursos: mesmo motor, troca-se o domínio e as features.",
    "Produção: o par “todos com todos” dá lugar à busca dos top-N num <b>banco vetorial</b> (mesmo mecanismo do RAG, doc <a href=\"#D1-11\">11</a>).",
    "Projeto pessoal sugerido pelo professor: adaptar o código a outro domínio e compartilhar na comunidade."
   ],
   "pros": [
    "Personaliza sem escrever regras",
    "Funciona para clientes novos (perfis similares)",
    "Aprendizado observável em tempo real (tfvis)"
   ],
   "contras": [
    "Comparar todos-com-todos é inviável em escala",
    "Qualidade depende muito da codificação e dos pesos",
    "Cold start é uma aproximação (só idade)",
    "Com poucos usuários e produtos o modelo memoriza em vez de generalizar"
   ],
   "traps": [
    "Rodar o treino na thread principal trava a interface (use Web Worker).",
    "Comparar todos os usuários com todos os produtos em escala (use banco vetorial).",
    "Pesos de atributo mal calibrados distorcem o ranking.",
    "Ignorar normalização e fallback quando faltam dados. A apostila diz “se indefinido, retorna 1”; o código usa o divisor <code>(max - min) || 1</code>.",
    "Bugs que a aula corrigiu ao vivo e que seguem clássicos: <code>Object.entries</code> no lugar de <code>fromEntries</code> nos índices, <code>context</code> sobrescrito (virou <code>let</code>), <code>minPrice</code> onde era <code>maxPrice</code>, <code>unit</code> em vez de <code>units</code>."
   ],
   "cola": [
    [
     "Web Worker",
     "Thread secundária: treina sem travar a interface"
    ],
    [
     "tfvis",
     "Plota loss/acurácia em tempo real"
    ],
    [
     "Peso do atributo",
     "Multiplicador de importância (categoria/cor/preço/idade)"
    ],
    [
     "Sigmoid",
     "Ativação que devolve probabilidade 0–1"
    ],
    [
     "binaryCrossentropy",
     "Loss para problemas de sim/não"
    ],
    [
     "Cold start",
     "Recomendar para usuário novo, sem histórico"
    ],
    [
     "Banco vetorial",
     "Indexa vetores e retorna os top-N mais próximos"
    ]
   ],
   "links": [
    [
     "Recommenders (Microsoft)",
     "https://github.com/recommenders-team/recommenders"
    ],
    [
     "Guia de recomendação (Databricks)",
     "https://www.databricks.com/blog/guide-to-building-online-recommendation-system"
    ],
    [
     "Spotify + Reinforcement Learning (TF-Agents)",
     "https://blog.tensorflow.org/2023/10/simulated-spotify-listening-experiences-reinforcement-learning-tensorflow-tf-agents.html"
    ],
    [
     "TensorBoard",
     "https://www.tensorflow.org/tensorboard"
    ]
   ],
   "curso": "Dados fictícios (Ana Lima, Bruno...) servem para prever as compras de um cliente novo (Zezinho da Silva); fluxo da aula PT01→PT07: contexto → produtos → usuários → treino → recomendação → desafio e produção. O código está detalhado abaixo.",
   "codigo": [
    {
     "proj": "exemplo-01",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-01-ecommerce-recomendations-z",
     "resumo": "Um sistema de recomendação inteiro rodando no navegador: a UI em MVC dispara o treino de uma rede neural em um Web Worker e depois ranqueia os 10 produtos para o usuário escolhido.",
     "fluxo": [
      "<code>src/index.js</code> instancia services e views, cria o worker com <code>new Worker(\"/src/workers/modelTrainingWorker.js\", { type: \"module\" })</code> e liga tudo via <code>WorkerController.init</code>.",
      "<code>UserService.getDefaultUsers()</code> carrega <code>users.json</code> e grava no <code>sessionStorage</code> (chave <code>ew-academy-users</code>); compras novas na UI atualizam esse storage e disparam eventos.",
      "O clique em \"Train Model\" passa por <code>ModelTrainingController</code> → <code>Events.dispatchTrainModel</code> → <code>WorkerController.triggerTrain</code> → <code>postMessage({ action: \"train:model\", users })</code>.",
      "No worker, <code>makeContext(products, users)</code> calcula min/max de idade e preço, índices de cor e categoria e a idade média de quem comprou cada produto.",
      "<code>encodeProduct</code> gera um vetor <code>[preço, idade_média, one-hot categoria, one-hot cor]</code> com pesos (<code>category: 0.4, color: 0.3, price: 0.2, age: 0.1</code>); <code>encodeUser</code> é a média dos vetores dos produtos comprados.",
      "<code>createTrainingData</code> concatena <code>[userVector, productVector]</code> para cada par e rotula 1 se o usuário comprou o produto, 0 se não.",
      "<code>configureNeuralNetAndTrain</code>: dense 128 → 64 → 32 (ReLU) → 1 (sigmoid), <code>adam(0.01)</code>, <code>binaryCrossentropy</code>, 100 épocas, <code>batchSize: 32</code>; o <code>onEpochEnd</code> posta loss e accuracy para a UI.",
      "<code>TFVisorController</code>/<code>TFVisorView</code> recebem os logs e desenham gráficos de loss e accuracy com <code>tfvis.render.linechart</code>.",
      "Ao clicar \"Run Recommendation\", o worker monta pares <code>[userVector, productVector]</code> para os 10 produtos, chama <code>_model.predict</code>, ordena por score e devolve via <code>postMessage({ type: \"recommend\", recommendations })</code>.",
      "O treino já dispara sozinho ao abrir a página: <code>index.js</code> carrega os usuários padrão e chama <code>w.triggerTrain(users)</code>. O botão \"Train Model\" retreina com as compras atuais; \"Run Recommendation\" só habilita depois que o treino termina e há usuário selecionado (<code>ModelTrainingController</code>).",
      "<code>index.js</code> também renderiza o \"Josézin da Silva\" (id 99, sem compras): o caso de demonstração do cold start. Como <code>createTrainingData</code> filtra usuários sem compras, ele nunca entra no treino."
     ],
     "rodar": [
      "<b>Rodar:</b> Em cada pasta: <code>npm install</code> e <code>npm start</code> (script: <code>browser-sync -w . --server ... --port 3000</code>), depois abra <code>http://localhost:3000</code>.",
      "<b>Rodar:</b> O README do template fala em <code>http://localhost:8080</code> e o <code>.vscode/tasks.json</code> usa <code>npx http-server -c-1 -p 8080</code>: é um caminho alternativo; o script npm usa a porta 3000.",
      "<b>Rodar:</b> Precisa de internet (CDNs do TF.js, tfjs-vis, Bootstrap). Nenhuma variável de ambiente.",
      "<b>Rodar:</b> Fluxo na tela: o treino inicial já roda ao abrir; escolha um usuário, aguarde o fim do treino, clique Run Recommendation; compre produtos e retreine com Train Model.",
      "<b>Ideia:</b> Mude os <code>WEIGHTS</code> (categoria vs cor vs preço) e veja o ranking mudar.",
      "<b>Ideia:</b> Adicione uma feature nova (marca, avaliação) em <code>encodeProduct</code> e ajuste <code>dimentions</code>.",
      "<b>Ideia:</b> Persista o modelo com <code>model.save(\"indexeddb://...\")</code> para não retreinar a cada carga.",
      "<b>Ideia:</b> Implemente o que o comentário sugere: pré-filtrar os 200 produtos mais próximos num vector DB antes do <code>predict</code> (ponte para o exemplo 12)."
     ],
     "armadilhas": [
      "O worker é criado com caminho absoluto <code>/src/workers/modelTrainingWorker.js</code>: só funciona se a pasta do projeto for a raiz do servidor.",
      "A porta muda conforme o jeito de subir (3000 com <code>npm start</code>, 8080 com a task do VS Code/README).",
      "O rótulo é gerado com <code>user.purchases.some(purchase => purchase.name === product.name ? 1 : 0)</code>: o ternário está dentro do callback do <code>some</code>, então o resultado final é booleano; funciona, mas não é o que a leitura sugere.",
      "Usuário sem compras gera vetor quase zerado (<code>encodeUser</code> usa só a idade) e a recomendação fica pobre.",
      "<code>sessionStorage</code> some ao fechar a aba: o estado das compras volta ao <code>users.json</code> original.",
      "Há várias cópias quase idênticas do app (template + 5 partes): edite a pasta certa.",
      "O <code>fetch('/data/products.json')</code> do worker também usa caminho absoluto, mesma restrição da raiz do servidor."
     ],
     "templateVsZ": "<b>Template vs z:</b> o template já traz UI, controllers, eventos e um worker simulado (progresso 50% → 100% com <code>setTimeout</code>), sem TensorFlow de verdade. O z é uma linha do tempo de 5 snapshots que diferem quase só em <code>workers/modelTrainingWorker.js</code> (102 → 370 linhas). Correspondência com a apostila: <code>parte01</code> = <code>makeContext</code> (PT02); <code>parte02</code> = <code>oneHotWeighted</code>/<code>encodeProduct</code> (PT03); <code>parte03</code> = <code>encodeUser</code>/<code>createTrainingData</code> (PT04, ainda com um <code>debugger</code> e sem tratamento de usuário sem compras); <code>parte04</code> = fallback do cold start no <code>encodeUser</code> + <code>configureNeuralNetAndTrain</code> (PT05); <code>parte05</code> = <code>recommend</code> completo (PT06). O z também mexe em <code>ModelTrainingView.js</code> (rótulo do botão) e <code>TFVisorView.js</code> (abre o visor só no primeiro log). Use <code>diff</code> entre as partes."
    }
   ]
  },
  {
   "id": "D1-03",
   "bloco": "d01-b2",
   "mod": "Módulo 4 · Caps. 1 a 5",
   "emoji": "🎯",
   "read": "11 min",
   "title": "Visão computacional na Web — vencendo jogos com YOLO",
   "short": "Integrar um modelo pronto de detecção em vez de treinar do zero.",
   "oneliner": "Nem sempre é preciso treinar um modelo: aqui a IA <b>integra um modelo pronto de detecção de objetos (YOLO)</b> para enxergar a tela de um jogo, identificar os alvos e disparar sozinha — tudo no navegador.",
   "vovo": [
    "Em vez de criar um cão de caça filhote e passar meses adestrando, você <b>contrata um cão já treinado</b> e só ensina onde mirar. Esse “cão treinado” é o <b>YOLO</b>: olha uma foto e aponta num piscar de olhos <i>onde</i> está cada coisa.",
    "A IA tira uma “foto” da tela várias vezes por segundo, pergunta “onde está o pato?”, pega as coordenadas e clica ali. Detalhe engraçado: o YOLO nunca aprendeu “pato de videogame”, então chama o pato de <b>“pipa” (kite)</b>. Não é perfeito, mas acha o alvo no lugar certo."
   ],
   "oque": [
    "Muda o foco: em vez de <b>treinar</b>, <b>integrar</b> modelos prontos, Web APIs e bibliotecas JS. A primeira tentativa do professor (rede própria para achar os patos) esbarrou em acurácia e complexidade; o Hugo Zanini, especialista em ML, sugeriu um modelo pronto.",
    "<b>YOLO (You Only Look Once):</b> detecção de objetos. Recebe uma imagem e devolve <b>cada objeto com suas coordenadas</b>; reconhece 80+ categorias (carros, bicicletas, animais, malas, equipamentos esportivos). Treinado em Python/PyTorch e <b>convertido para TensorFlow.js</b>.",
    "Classificação imperfeita, mas suficiente: o modelo chama os patos de “kite” (pipa).",
    "<b>O jogo:</b> fork do DuckHunt-JS de Matt Surabian, em Pixi.js. Só rodava em Node 8; o professor atualizou dependências, abriu um pull request e acrescentou uma <b>mira visual</b> para ver onde a IA atira."
   ],
   "como": [
    "<b>Capturar</b> o canvas (Pixi.js) com <code>createImageBitmap</code> e enviar a um <b>Web Worker</b>: a thread principal só coleta, envia e atualiza a interface.",
    "<b>Carregar e aquecer:</b> <code>tf.ready()</code>, <code>labels.json</code> (as categorias do modelo) e <code>tf.loadGraphModel</code>; depois uma predição com tensor de valores fixos (<b>warm-up</b>) para o modelo cachear seus componentes internos.",
    "<b>Pré-processar</b> dentro de <code>tf.tidy</code>: <code>tf.browser.fromPixels</code> → <code>resizeBilinear</code> para 640×640 → dividir por 255 → <code>expandDims</code> (batch).",
    "<b>Inferir</b> com <code>executeAsync</code>: as 3 primeiras saídas são <b>boxes</b>, <b>scores</b> e <b>classes</b>; vira array com <code>data()</code> + <code>Promise.all</code> e os tensores são liberados com <code>dispose</code>.",
    "<b>Pós-processar</b> (<code>processPrediction</code>, função geradora): percorre os três arrays pelo mesmo índice, descarta score abaixo de 40% (<code>classThreshold</code>) e classes diferentes de “kite”, converte coordenadas normalizadas em pixels e calcula o centro da caixa: <code>centerX = x1 + (x2 - x1) / 2</code>.",
    "<b>Agir:</b> manda x, y e score à thread principal, que move a mira e simula o clique, imitando um jogador. No capítulo, a IA <b>zerou o jogo</b>, passando por todos os níveis.",
    "<b>Melhorias sugeridas:</b> ajustar o <code>classThreshold</code> dinamicamente, controlar melhor o intervalo entre capturas (além do simples <code>setTimeout</code>), filtrar detecções fora da área jogável e trocar labels e alvo para outros jogos."
   ],
   "aplica": [
    "Automação de jogos, monitoramento, robótica, navegação autônoma.",
    "Trocando o alvo e os labels: contar objetos, vigiar cenas, detectar <b>prateleiras vazias</b> em supermercado (artigo do Hugo, que estendeu o YOLO com classes novas).",
    "Desafio do professor: hackear outro jogo de navegador (pulo, corrida, quebra-cabeça) com o mesmo pipeline, ou estender o modelo para peças de Lego, lixo reciclável ou placas de trânsito."
   ],
   "pros": [
    "Entrega rápida — sem meses de treino",
    "Reaproveita inteligência pronta e robusta",
    "Roda no navegador, sem servidor"
   ],
   "contras": [
    "Os labels podem não bater com seu domínio (o “kite”)",
    "Depende da qualidade do modelo pronto",
    "Cada frame tem custo de inferência"
   ],
   "traps": [
    "Rodar o modelo na thread principal trava a UI.",
    "Esquecer o <code>tf.tidy</code>/<code>dispose</code>: vazamento de memória de tensores.",
    "Pular o warm-up e sofrer com a primeira inferência lenta.",
    "Threshold mal ajustado: falsos positivos ou negativos.",
    "Aceleração gráfica desligada: a apostila manda manter “Use Graphics Acceleration When Available” ativa, senão o jogo e a IA podem travar ou falhar na renderização do canvas.",
    "Confundir isto com aprendizado: o YOLO só reconhece. Para aprender estratégia, veja o doc <a href=\"#D1-04\">04</a>."
   ],
   "cola": [
    [
     "YOLO",
     "Modelo de detecção de objetos (You Only Look Once)"
    ],
    [
     "Detecção de objetos",
     "Achar o que e onde está cada item na imagem"
    ],
    [
     "Bounding box",
     "Caixa (x1,y1,x2,y2) que delimita o objeto"
    ],
    [
     "classThreshold",
     "Corte mínimo de confiança (aqui, 40%)"
    ],
    [
     "tf.tidy",
     "Libera automaticamente a memória dos tensores temporários"
    ],
    [
     "Warm-up",
     "Predição inicial para pré-carregar o modelo"
    ],
    [
     "executeAsync",
     "Roda a inferência do grafo do modelo"
    ]
   ],
   "links": [
    [
     "YOLOv5 (Ultralytics)",
     "https://github.com/ultralytics/yolov5"
    ],
    [
     "Modelos pré-treinados no COCO (Ultralytics)",
     "https://docs.ultralytics.com/datasets/detect/coco/#coco-pretrained-models"
    ],
    [
     "Exportar YOLO para TF.js (Ultralytics)",
     "https://docs.ultralytics.com/integrations/tfjs/"
    ],
    [
     "YOLOv7 no navegador com TF.js",
     "https://medium.com/data-science/training-a-custom-yolov7-in-pytorch-and-running-it-directly-in-the-browser-with-tensorflow-js-96a5ecd7a530"
    ],
    [
     "Detecção de SKUs no browser (Hugo Zanini)",
     "https://blog.tensorflow.org/2022/05/real-time-sku-detection-in-browser.html"
    ],
    [
     "DuckHunt-JS do Erick (branch ml-self-play)",
     "https://github.com/ErickWendel/DuckHunt-JS/tree/ml-self-play"
    ],
    [
     "DuckHunt-JS original (Matt Surabian)",
     "https://github.com/MattSurabian/DuckHunt-JS"
    ],
    [
     "Pixi.js",
     "https://pixijs.com/"
    ]
   ],
   "curso": "<b>Fora do código:</b> a história do projeto (por que desistir de treinar a própria rede) e o desafio final. O pipeline está detalhado abaixo, no exemplo-02.",
   "codigo": [
    {
     "proj": "exemplo-02",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-02-vencendo-qualquer-jogo",
     "resumo": "Pegar um jogo web pronto (DuckHunt-JS) e plugar um modelo de detecção de objetos (YOLOv5n em TensorFlow.js) que tira \"prints\" do canvas, acha os alvos e dispara os cliques.",
     "fluxo": [
      "<code>main.js</code> (raiz) espera <code>DOMContentLoaded</code>, cria <code>new Game({ spritesheet: \"sprites.json\" })</code>, chama <code>game.load()</code> e entrega o jogo para <code>machine-learning/main.js</code>.",
      "<code>machine-learning/main.js</code> monta o HUD (<code>buildLayout</code>), cria o worker com <code>new Worker(new URL(\"./worker.js\", import.meta.url), { type: \"module\" })</code> e esconde a mira real (<code>game.stage.aim.visible = false</code>).",
      "A cada 200 ms (<code>setInterval</code>), extrai o canvas do Pixi (<code>game.app.renderer.extract.canvas(game.stage)</code>), vira <code>ImageBitmap</code> e é enviado ao worker como <i>transferable</i>.",
      "<code>worker.js</code> carrega TF.js via <code>importScripts</code>, faz <code>tf.loadGraphModel(\"yolov5n_web_model/model.json\")</code>, um warmup com <code>tf.ones</code> e publica <code>model-loaded</code>.",
      "<code>preprocessImage</code>: <code>tf.browser.fromPixels</code> → <code>resizeBilinear</code> 640x640 → <code>.div(255)</code> → <code>.expandDims(0)</code>, tudo dentro de <code>tf.tidy()</code> para não vazar memória.",
      "<code>runInference</code> executa <code>_model.executeAsync</code>, lê as 3 primeiras saídas (boxes, scores, classes) com <code>.data()</code> e descarta os tensores.",
      "<code>processPrediction</code> (generator) filtra <code>score &gt;= 0.4</code> e classe <code>\"kite\"</code>, converte as coordenadas normalizadas para pixels e emite o centro da caixa com o score.",
      "De volta ao <code>main.js</code>, cada mensagem <code>prediction</code> atualiza o HUD, posiciona a mira (<code>aim.setPosition</code>) e chama <code>game.handleClick({ global })</code>, simulando o clique do jogador."
     ],
     "rodar": [
      "<b>Rodar:</b> Dentro de <code>_template</code>, <code>DuckHunt-JS-parte01</code> ou <code>DuckHunt-JS-parte02</code>: <code>npm install</code> e <code>npm start</code> (<code>webpack-dev-server</code> na porta 8080, abre o navegador sozinho).",
      "<b>Rodar:</b> <code>npm run build</code> gera o <code>dist/</code> com webpack. O <code>CopyWebpackPlugin</code> copia <code>machine-learning/yolov5n_web_model</code> para <code>dist/yolov5n_web_model</code>, que é o caminho que o worker usa.",
      "<b>Rodar:</b> <code>npm run audio</code> e <code>npm run images</code> exigem ffmpeg e TexturePacker: não são necessários para a aula (os assets já estão commitados).",
      "<b>Rodar:</b> Engines: Node &gt; 20. Nenhuma variável de ambiente; precisa de internet para o TF.js via jsDelivr.",
      "<b>Ideia:</b> Troque o filtro <code>\"kite\"</code> por outra classe do COCO e adapte o jogo-alvo.",
      "<b>Ideia:</b> Suba/abaixe <code>CLASS_THRESHOLD</code> e o intervalo de 200 ms e meça acertos por rodada.",
      "<b>Ideia:</b> Aplique non-max suppression (<code>tf.image.nonMaxSuppression</code>) caso o modelo emita caixas duplicadas.",
      "<b>Ideia:</b> Treine/exporte seu próprio YOLO para o jogo (Ultralytics tem export para TF.js) em vez do COCO genérico.",
      "<b>Rodar:</b> A versão final da aula é <code>DuckHunt-JS-parte02</code>; as outras pastas são snapshots intermediários."
     ],
     "armadilhas": [
      "O worker usa <code>importScripts</code> (só existe em workers clássicos), mas é criado com <code>{ type: \"module\" }</code>; o projeto passa o worker pelo webpack (<code>new Worker(new URL(...))</code>; o <code>_template/dist</code> traz o chunk <code>machine-learning_worker_js.js</code>), que é quem viabiliza essa combinação. Não executei o jogo; fora do webpack, essa mistura tende a quebrar.",
      "O TF.js vem de <code>tfjs@latest</code> via CDN: uma versão nova pode quebrar a aula sem aviso; fixe a versão.",
      "<code>MODEL_PATH</code> é relativo à URL do worker; se o <code>CopyWebpackPlugin</code> não copiar o modelo, o <code>fetch</code> falha com 404.",
      "A <code>parte01</code> deixa um <code>debugger</code> no <code>onmessage</code> e responde sempre <code>x: 400, y: 400</code>: é um estágio intermediário, não o resultado final.",
      "<code>terraform.tfstate</code>, <code>infrastructure.tf</code> e o <code>s3policy.json</code> vieram do repositório original do jogo: não aplique nada disso.",
      "Os pacotes do <code>package.json</code> do jogo são antigos e muitos (babel 6, eslint 4, gulp 4): <code>npm install</code> pode emitir avisos de deprecated.",
      "O laço usa <code>setInterval</code> de 200 ms sem esperar a inferência anterior: se o modelo demorar mais que isso, as mensagens provavelmente se acumulam no worker (a apostila já lista como melhoria controlar o intervalo entre capturas).",
      "A aula pede aceleração gráfica ativa no navegador; sem ela o canvas do Pixi pode falhar e a IA \"atira no escuro\"."
     ],
     "templateVsZ": "<b>Template vs z:</b> <code>_template</code> tem worker stub (devolve sempre 400,400, sem modelo carregado); <code>parte01</code> carrega o YOLO, pré-processa e executa a inferência mas ainda não usa o resultado; <code>parte02</code> adiciona <code>processPrediction</code> (generator com threshold 0.4 e filtro por \"kite\"). Compare os três <code>machine-learning/worker.js</code> com <code>diff</code>."
    }
   ]
  },
  {
   "id": "D1-04",
   "bloco": "d01-b2",
   "mod": "Módulo 5 · Cap. 1",
   "emoji": "🧬",
   "read": "9 min",
   "title": "Algoritmos Genéticos e Aprendizado por Reforço",
   "short": "Dois jeitos de a IA achar solução sozinha, sem resposta pronta.",
   "oneliner": "São dois jeitos de a IA <b>descobrir soluções sozinha</b> quando ninguém sabe a resposta: <b>algoritmos genéticos</b> imitam a evolução (evoluem uma população de tentativas) e <b>aprendizado por reforço</b> imita o adestramento (um agente aprende por tentativa, erro e recompensa).",
   "vovo": [
    "Lembra de cruzar roseiras pra tentar uma flor mais bonita? Pega as duas plantas mais fortes, cruza, e da nova geração escolhe de novo as melhores. Depois de gerações, sai uma rosa que você nunca conseguiria desenhar na mão. <b>Isso é um algoritmo genético</b> — a IA cria centenas de tentativas, deixa competir, mistura as melhores (crossover) e joga uma pitada de novidade (mutação).",
    "E o <b>aprendizado por reforço</b> é adestrar o cachorro com petisco: senta certo, ganha petisco; faz bagunça, não ganha nada. No jogo da cobrinha, a IA ganha ponto comendo a fruta e perde batendo na parede — e fica boa só por recompensa e castigo."
   ],
   "oque": [
    "<b>Genéticos:</b> trabalham com uma <b>população de soluções candidatas</b> que evolui; não aprendem em sequência.",
    "<b>Reforço (RL):</b> um <b>agente</b> toma decisões sequenciais para <b>maximizar uma recompensa acumulada</b>, por tentativa e erro.",
    "Diferença central: genético = evoluir vários candidatos ao mesmo tempo; reforço = treinar um agente, passo a passo.",
    "No Duck Hunt (doc <a href=\"#D1-03\">03</a>) <b>não houve aprendizado de verdade</b>: só reconhecimento. Aprender a vencer um jogo exige outra abordagem, como o reforço."
   ],
   "como": [
    "<b>Ciclo genético:</b> população → avaliar (fitness) → selecionar os melhores → cruzar (crossover) → mutar → nova geração; repetir.",
    "<b>Exemplo da apostila (carros):</b> gere carros com formas e tamanhos diferentes e solte numa pista; os que andam mais longe, mais rápido e com mais estabilidade são os melhores. Misture suas características e introduza pequenas mutações a cada geração. As formas resultantes costumam ser estranhas, pois a evolução prioriza desempenho, não estética.",
    "<b>Parâmetros no simulador:</b> taxa de mutação, gravidade, formato do terreno. Mutação alta demais = resultados imprevisíveis e ineficazes; baixa demais = estagnação sem inovação. O segredo é o equilíbrio: explorar sem perder o que funciona.",
    "<b>RL:</b> na cobrinha, o agente ganha pontos ao comer a fruta e perde ao bater na parede ou no próprio corpo; a cada movimento recebe uma pontuação e ajusta o comportamento.",
    "<b>Genético × RL:</b> o RL foca na tomada de decisão passo a passo; o genético foca na evolução simultânea de candidatos (avaliar, cruzar, mutar).",
    "<b>Casos citados:</b> IAs que aprenderam a estacionar (até baliza com drift) e uma IA que aprendeu o jogo do dinossauro do Chrome sozinha com algoritmo genético (apresentado numa conferência no Brasil), sem instrução específica."
   ],
   "aplica": [
    "Muito além de jogos: engenharia, logística, design de circuitos, otimização de processos.",
    "Útil quando não se tem uma resposta clara de como resolver: define-se só o critério (fitness ou recompensa) e a busca acha o caminho.",
    "Demos para brincar: carros que evoluem geração a geração, cart-pole, mountain car, jogo da velha, SnakeAI."
   ],
   "pros": [
    "Acham soluções criativas que humano não projetaria",
    "Não precisam de dados rotulados",
    "O agente aprende a estratégia sozinho"
   ],
   "contras": [
    "Custam muitas iterações e tempo",
    "Muito sensíveis ao ajuste de parâmetros",
    "Recompensa/fitness mal definida leva a comportamento errado"
   ],
   "traps": [
    "Taxa de mutação mal calibrada (caos ou estagnação).",
    "Função de recompensa ou fitness mal desenhada: o algoritmo otimiza o que você mediu, não o que você queria.",
    "Confundir “reconhecer” (YOLO, doc <a href=\"#D1-03\">03</a>) com “aprender estratégia”.",
    "Esperar resultados rápidos: ambos custam muitas iterações."
   ],
   "cola": [
    [
     "População",
     "Conjunto de soluções candidatas avaliadas em paralelo"
    ],
    [
     "Fitness",
     "Nota que mede quão boa é uma solução"
    ],
    [
     "Crossover",
     "Cruzar características dos melhores indivíduos"
    ],
    [
     "Mutação",
     "Alteração aleatória para introduzir novidade"
    ],
    [
     "Geração",
     "Uma rodada completa de avaliação + reprodução"
    ],
    [
     "Agente (RL)",
     "Entidade que toma decisões buscando recompensa"
    ],
    [
     "Recompensa",
     "Sinal de acerto/erro que guia o aprendizado"
    ]
   ],
   "links": [
    [
     "Genetic Cars (simulador)",
     "https://rednuht.org/genetic_cars_2/"
    ],
    [
     "Neuroevolution com TensorFlow.js",
     "https://medium.com/codesphere-cloud/teaching-cars-to-drive-with-neuroevolution-tensorflow-and-500-lines-of-javascript-57888956322e"
    ],
    [
     "Cart-pole (RL no navegador)",
     "https://storage.googleapis.com/tfjs-examples/cart-pole/dist/index.html"
    ],
    [
     "Cart-pole (código, tfjs-examples)",
     "https://github.com/tensorflow/tfjs-examples/tree/master/cart-pole"
    ],
    [
     "Mountain car com TF.js",
     "https://github.com/prouhard/tfjs-mountaincar"
    ],
    [
     "RL no navegador: introdução ao TF.js",
     "https://medium.com/@pierrerouhard/reinforcement-learning-in-the-browser-an-introduction-to-tensorflow-js-9a02b143c099"
    ],
    [
     "Jogo da velha adaptativo com RL (freeCodeCamp)",
     "https://www.freecodecamp.org/news/how-to-build-an-adaptive-tic-tac-toe-ai-with-reinforcement-learning-in-javascript/"
    ],
    [
     "SnakeAI",
     "https://github.com/jonatan5524/SnakeAI"
    ]
   ],
   "curso": "Simuladores no navegador em TF.js: <b>genetic_cars_2</b> (carros evoluindo), <b>cart-pole</b> e <b>mountain car</b> (RL), jogo da velha e <b>SnakeAI</b> (RL clássico). Exploração livre de parâmetros (taxa de mutação, gravidade, terreno).",
   "tip": "<b>Complemento (fora da apostila):</b> em RL o dilema clássico é <i>explorar</i> ações novas versus <i>aproveitar</i> o que já dá recompensa. Nos genéticos, a mutação cumpre papel parecido: sem ela a população estagna."
  },
  {
   "id": "D1-05",
   "bloco": "d01-b3",
   "mod": "Módulo 5 · Cap. 2",
   "emoji": "⭐",
   "read": "13 min",
   "title": "Como funcionam LLMs — transformers, embeddings, attention",
   "short": "O doc central: o que faz o ChatGPT funcionar por dentro.",
   "oneliner": "Um <b>LLM</b> é um autocompletar gigante: quebra o texto em <b>tokens</b>, transforma cada um em um <b>vetor de significado</b> (embedding), usa <b>attention</b> para entender o contexto inteiro, e gera a resposta <b>um token por vez</b>, sempre escolhendo o próximo mais provável.",
   "vovo": [
    "Sabe o <b>autocompletar do celular</b> que sugere a próxima palavra? Um LLM é isso no extremo: em vez de uma palavrinha, escreve textos inteiros, sempre adivinhando “qual a próxima palavra mais provável”.",
    "Como ele “entende” as palavras? Transforma cada pedaço de texto num <b>ponto num mapa gigante</b> onde ideias parecidas ficam pertinho — dá até pra fazer conta: <i>Rei − Homem + Mulher = Rainha</i>. E pra não se perder numa frase longa, toda vez ele <b>relê a frase inteira</b> (isso é o <b>attention</b>).",
    "Aviso da vovó: <b>o LLM não sabe o que é verdade.</b> Ele escolhe a palavra mais provável. Se faltar informação, chuta com confiança — e às vezes inventa (a <b>alucinação</b>). Quanto melhor a pergunta e mais contexto, melhor a resposta."
   ],
   "oque": [
    "<b>GPT</b> = Generative (gera texto) + Pre-trained (treinado antes com muito texto) + Transformer (a arquitetura que torna tudo possível). <b>LLM</b> = Large Language Model, treinado com quantidades massivas de texto para aprender padrões da linguagem e gerar respostas coerentes.",
    "O funcionamento tem <b>5 componentes</b>: tokenização, embeddings, transformer com attention, probabilidades e decoding, e geração passo a passo (sampling).",
    "O modelo <b>não sabe o que é verdade</b>: gera o token mais provável dado o contexto. Daí a alucinação quando falta informação ou o prompt é ambíguo."
   ],
   "como": [
    "<b>1. Tokenização:</b> o texto é quebrado em <b>tokens</b>, que podem ser palavras, pedaços de palavra, espaços ou pontuação. Um limite de “4.000 tokens” não são 4.000 palavras, e isso afeta custo e planejamento do prompt.",
    "<b>2. Embeddings:</b> cada token vira um <b>vetor de números</b> que representa seu significado no contexto. Palavras em contextos parecidos ficam com vetores próximos (“carro” e “veículo”; “médico” e “hospital”, que não são sinônimos mas aparecem juntos). Relações viram direções no espaço: Rei − Homem + Mulher = Rainha; Paris − França + Itália = Roma.",
    "<b>3. Transformer e Self-Attention:</b> ao interpretar ou gerar cada token, o modelo considera <b>todas as palavras do contexto</b>. Em “A Maria contou para a Ana que <i>ela</i> foi promovida”, o attention pondera se “ela” é a Maria ou a Ana. Processa os tokens <b>em paralelo</b> e capta relações de longa distância, o que corrige limitações de modelos antigos (frases longas, processamento sequencial).",
    "<b>Positional encoding:</b> os vetores sozinhos não carregam ordem; somar uma codificação de posição é o que distingue “o cachorro mordeu o homem” de “o homem mordeu o cachorro”.",
    "<b>4. Probabilidades e decoding:</b> o Transformer devolve uma lista de próximos tokens prováveis (para “O céu é…”: azul 55%, nublado 18%, claro 10%, bonito 7%). <b>Temperature</b> controla a aleatoriedade (baixa = determinístico, alta = variado); <b>Top-K</b> limita a escolha aos K mais prováveis; <b>Top-P</b> (nucleus) soma probabilidades até um limiar (ex.: 90%) e escolhe dentro desse conjunto.",
    "<b>5. Sampling:</b> o texto sai <b>token por token</b>: analisa o texto até agora → calcula probabilidades → escolhe um token → adiciona ao contexto → repete até o fim. Quanto maior o texto, maior o custo computacional.",
    "<b>Reduzir alucinação:</b> forneça contexto completo, permita respostas do tipo “não sei” e evite prompts que pressionem por certeza absoluta.",
    "<b>Por que importa:</b> entender esses mecanismos ajuda a reduzir custo otimizando prompts, ajustar parâmetros para resultados mais precisos ou mais criativos e montar experiências mais robustas com APIs de IA."
   ],
   "aplica": [
    "Qualquer geração de texto: ajuste temperature e top-K conforme precise de determinismo (extração, classificação) ou criatividade (ideias, copy).",
    "Estime <b>custo</b> contando tokens (o tokenizer da OpenAI mostra quantos uma frase consome).",
    "Dê <b>contexto completo</b> e permita “não sei” para reduzir alucinação; isso leva direto a Prompt Engineering (<a href=\"#D1-07\">07</a>) e RAG (<a href=\"#D1-11\">11</a>)."
   ],
   "pros": [
    "Entende contexto e relações de longa distância",
    "Extremamente versátil",
    "Processa tokens em paralelo (rápido)"
   ],
   "contras": [
    "Não sabe o que é verdade — pode alucinar",
    "Custo cresce com o tamanho do texto",
    "Tem limite de tokens e é não-determinístico"
   ],
   "traps": [
    "Assumir que 4.000 tokens = 4.000 palavras.",
    "Pressionar o modelo por certeza absoluta.",
    "Não dar contexto e culpar o modelo pelo erro.",
    "Não permitir resposta “não sei”.",
    "Ignorar a temperature numa tarefa que pede determinismo.",
    "Tratar “Rei − Homem + Mulher = Rainha” como propriedade garantida de qualquer modelo: é a ilustração didática clássica de embeddings."
   ],
   "cola": [
    [
     "Token",
     "Menor unidade de texto processada (≠ palavra)"
    ],
    [
     "Embedding",
     "Vetor numérico que representa o significado"
    ],
    [
     "Transformer",
     "Arquitetura que processa embeddings em paralelo"
    ],
    [
     "Self-Attention",
     "Considerar todo o contexto ao interpretar cada token"
    ],
    [
     "Positional encoding",
     "Informação de ordem das palavras"
    ],
    [
     "Temperature",
     "Controla aleatoriedade e criatividade"
    ],
    [
     "Top-K / Top-P",
     "Estratégias de escolha do próximo token"
    ],
    [
     "Sampling",
     "Geração token por token, recalculando o contexto"
    ],
    [
     "Alucinação",
     "Afirmação falsa e convincente por falta de contexto"
    ],
    [
     "GPT",
     "Generative Pre-trained Transformer"
    ]
   ],
   "links": [
    [
     "Tokenizer da OpenAI",
     "https://platform.openai.com/tokenizer"
    ],
    [
     "BertViz (visualizar attention)",
     "https://github.com/jessevig/bertviz"
    ],
    [
     "Guia de prompting (Gemini)",
     "https://ai.google.dev/gemini-api/docs/prompting-strategies"
    ]
   ],
   "curso": "<b>Tokenizer da OpenAI</b> para ver na prática quantos tokens uma frase consome; demos de <b>temperature</b> e <b>top-K</b> mudando as respostas. As referências da aula incluem matérias sobre o custo de operar o ChatGPT em escala (uma de 2023 fala em cerca de US$ 700 mil por dia: estimativa de terceiros, que não verifiquei).",
   "tip": "<b>Complemento (fora da apostila):</b> a temperature atua antes da escolha, reescalando as pontuações do modelo; com valor 0 o modelo tende a pegar sempre o token mais provável. Top-K e Top-P costumam poder ser combinados nas APIs. E o <b>limite de contexto</b> conta prompt e resposta juntos: o que passar disso fica de fora."
  },
  {
   "id": "D1-06",
   "bloco": "d01-b3",
   "mod": "Módulo 5 · Caps. 3 e 4",
   "emoji": "🌐",
   "read": "11 min",
   "title": "IA no navegador — Web AI e multimodalidade",
   "short": "Rodar modelos localmente, offline, entendendo texto, imagem e áudio.",
   "oneliner": "<b>Web AI</b> é rodar modelos de IA <b>direto no navegador</b>, na máquina do usuário, sem enviar nada para servidores — e, com a <b>multimodalidade</b>, esses modelos entendem não só texto, mas também <b>imagem e áudio</b>, tudo offline.",
   "vovo": [
    "Hoje usar IA é como <b>mandar uma carta pro escritório central</b> (a nuvem) e esperar a resposta voltar. Web AI é ter um <b>funcionário esperto morando dentro da sua casa</b>: resolve tudo ali, sem mandar seus assuntos pra fora — mais <b>privacidade</b> e sem depender da internet.",
    "Tem um preço: esse funcionário é “grande” (o modelo pesa alguns GB) e demora pra “se mudar” (o download). Mas depois trabalha de graça e rápido. E <b>multimodal</b> é quando ele não só <b>lê</b> bilhetes, mas também <b>enxerga</b> fotos e <b>escuta</b> áudios."
   ],
   "oque": [
    "<b>Web AI / “Web 4.0”:</b> IA nativa ao navegador, execução <b>local</b> (ex. Gemma, DeepSeek).",
    "<b>Multimodalidade:</b> lidar com e <b>relacionar</b> tipos diferentes de dado — texto, imagem e áudio."
   ],
   "como": [
    "<b>Web 4.0</b> (termo da apostila): IA nativa ao navegador, rodando na máquina do usuário. Modelos como Gemma (~2,5 GB) e DeepSeek (~1,3 GB) já rodam assim; o Google embarca o <b>Gemini Nano</b> no Chrome por APIs experimentais (Chrome e Canary), para o modelo já vir com o navegador e eliminar downloads futuros.",
    "<b>APIs já disponíveis:</b> tradução de texto, identificação de idioma, resumo e prompt para LLM, todas locais, gratuitas e com bom desempenho.",
    "<b>Benefícios:</b> nenhum dado vai a servidores externos, desempenho aceitável, mais privacidade. <b>Entraves:</b> modelos pesados, download ruim em mobile e nem todo navegador suporta (por ora, só Chrome).",
    "<b>Receita de LLM no browser (exemplos 03 e 04):</b> habilitar a flag → prompt de sistema com contexto → temperature e topK → <code>LanguageModel.create()</code> (a apostila grafa <code>languageModel</code>) → <code>promptStreaming</code> consumido com <code>for await</code>, token por token.",
    "<b>Temperature e topK:</b> com temperature 0, “O céu é…” quase sempre dá “azul”; com temperature 2 e topK 10, surgem “vasto”, “ilimitado”, “cheio de estrelas”. O topK define quantos candidatos ao próximo token entram na escolha.",
    "<b>Embeddings no navegador:</b> a demo “Rei − homem + mulher = ?” respondeu “Rainha”, mostrando a aritmética de embeddings do doc <a href=\"#D1-05\">05</a>.",
    "<b>Multimodal (exemplo 05):</b> verifica o ambiente (só Chrome), baixa o modelo ao carregar a página, recebe texto, imagem ou áudio, converte o arquivo em <b>blob</b> e gera a resposta conforme o prompt. Demos: descrever fotos (um homem, um laptop e um cachorro “ao entardecer”) e transcrever um cartão CNPJ, extraindo CNPJ, nome, endereço, telefone e situação.",
    "<b>Truque de idioma:</b> texto funciona em PT, mas imagem e áudio rendem melhor em inglês; a solução foi PT → EN (tradução embutida) → modelo → EN → PT, transparente ao usuário."
   ],
   "aplica": [
    "Acessibilidade: descrever imagens, transcrever áudio.",
    "Processar documento offline (ex. extrair nome/endereço/telefone de um cartão CNPJ).",
    "Assistentes visuais e auditivos, úteis em mobile. <b>Truque:</b> PT → EN → processa → PT via tradução embutida (recursos multimodais rendem mais em inglês)."
   ],
   "pros": [
    "Privacidade: dados não saem da máquina",
    "Sem custo de servidor e funciona offline",
    "Performance aceitável mesmo em apps complexos"
   ],
   "contras": [
    "Modelos pesados (vários GB)",
    "Download compromete a UX, sobretudo em mobile",
    "Suporte ainda limitado (foco no Chrome) e recursos experimentais"
   ],
   "traps": [
    "Ignorar o custo do download em conexões móveis",
    "Assumir suporte universal de navegador",
    "Usar recursos multimodais só em PT quando funcionam melhor em EN"
   ],
   "cola": [
    [
     "Web AI / Web 4.0",
     "IA rodando nativamente no navegador"
    ],
    [
     "Gemini Nano",
     "Modelo leve do Google embarcável no Chrome"
    ],
    [
     "LanguageModel.create()",
     "API do navegador para abrir sessão com a LLM local (a apostila escreve languageModel)"
    ],
    [
     "promptStreaming",
     "Resposta chegando token por token (async iterável)"
    ],
    [
     "Multimodalidade",
     "Entender e relacionar texto, imagem e áudio"
    ],
    [
     "Blob",
     "Formato binário em que o arquivo é processado"
    ],
    [
     "Translator / LanguageDetector",
     "APIs embutidas de tradução e detecção de idioma"
    ]
   ],
   "links": [
    [
     "Chrome Built-in AI (docs)",
     "https://developer.chrome.com/docs/ai/built-in"
    ],
    [
     "Chrome Built-in AI: APIs",
     "https://developer.chrome.com/docs/ai/built-in-apis"
    ],
    [
     "Web AI Demos",
     "https://chrome.dev/web-ai-demos/"
    ],
    [
     "Comunidade WebML (Hugging Face)",
     "https://huggingface.co/webml-community"
    ],
    [
     "DeepSeek R1 via WebGPU",
     "https://huggingface.co/spaces/webml-community/deepseek-r1-webgpu"
    ],
    [
     "WebMCP (README)",
     "https://github.com/webmachinelearning/webmcp/blob/main/README.md"
    ],
    [
     "Trimly (Erick Wendel)",
     "https://github.com/ErickWendel/Trimly"
    ]
   ],
   "curso": "Na aula: a demo “Rei − homem + mulher” no navegador e a multimodalidade com fotos e cartão CNPJ. Os três exemplos do repo (03, 04, 05) estão detalhados abaixo; o exemplo-03 pergunta “Quem inventou o JavaScript?”, e a demo do “Rei − homem + mulher” citada na aula não está nesse arquivo.",
   "codigo": [
    {
     "proj": "exemplo-03",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-03-webai01",
     "resumo": "Chamar o modelo de linguagem que já vive dentro do Chrome (Gemini Nano) direto do JavaScript da página, sem API key, sem servidor e sem custo por token.",
     "fluxo": [
      "<code>LanguageModel.params()</code> devolve os limites do modelo; o código usa <code>defaultTemperature</code> e <code>defaultTopK</code> como valores iniciais.",
      "<code>LanguageModel.create({ expectedInputLanguages: [\"pt\"], temperature, topK, initialPrompts })</code> abre uma sessão com a mensagem <code>system</code>.",
      "<code>session.promptStreaming([{ role: \"user\", content: question }])</code> retorna um stream assíncrono.",
      "O <code>for await</code> acumula os pedaços em <code>fullText</code> e re-renderiza <code>markdown.toHTML(fullText)</code> no <code>&lt;output&gt;</code>, dando o efeito de digitação.",
      "A pergunta fixa no código é <code>'Quem inventou o JavaScript?'</code> e o system prompt pede resposta clara e objetiva (a demo \"Rei − homem + mulher\" citada na aula não está neste arquivo)."
     ],
     "rodar": [
      "<b>Rodar:</b> Use o Google Chrome (ou Canary) recente. Ative a flag <code>chrome://flags/#prompt-api-for-gemini-nano</code> e reinicie o navegador.",
      "<b>Rodar:</b> Sirva a pasta por HTTP local (por exemplo <code>npx http-server .</code> dentro de <code>exemplo-03-webai01</code>) e abra a URL; a pasta não tem script npm próprio.",
      "<b>Rodar:</b> Na primeira execução o Chrome precisa baixar o modelo (centenas de MB a alguns GB); o exemplo 04 mostra como acompanhar o download.",
      "<b>Rodar:</b> Nenhuma variável de ambiente nem chave de API.",
      "<b>Ideia:</b> Troque o prompt de sistema por uma persona (professor, revisor de código) e compare as respostas.",
      "<b>Ideia:</b> Troque a pergunta por uma entrada de formulário.",
      "<b>Ideia:</b> Use <code>session.prompt()</code> (sem stream) e meça a diferença de percepção de latência.",
      "<b>Ideia:</b> Tente forçar saída estruturada (JSON) no prompt e valide no cliente."
     ],
     "armadilhas": [
      "Este exemplo <b>não</b> verifica disponibilidade: se <code>LanguageModel</code> não existir (flag desligada, outro navegador), a página só quebra no console. O exemplo 04 corrige isso com <code>checkRequirements()</code>.",
      "Se o modelo ainda não foi baixado, <code>create</code> pode demorar ou falhar; use <code>LanguageModel.availability()</code> antes.",
      "Abrir o HTML por <code>file://</code> tende a dar problema (a API e o CDN dependem de contexto seguro/HTTP); sirva por <code>localhost</code>.",
      "Os nomes da API mudaram ao longo do tempo (<code>window.ai</code> → <code>LanguageModel</code>); tutoriais antigos usam a forma velha.",
      "Em Windows/Linux sem GPU/RAM suficientes, <code>availability()</code> retorna <code>unavailable</code>."
     ],
     "templateVsZ": "<b>Dica:</b> este exemplo é o \"mínimo possível\". Leia-o junto com o 04, que reaproveita a mesma chamada e adiciona controles de temperature/topK, botão de parar e verificação de requisitos."
    },
    {
     "proj": "exemplo-04",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-04-webai02-temperature-and-topK",
     "resumo": "Evoluir o exemplo 03 para uma mini-interface em que você mexe em <b>temperature</b> e <b>topK</b>, vê a resposta chegar em streaming e entende como esses dois botões mudam a \"criatividade\" do LLM.",
     "fluxo": [
      "<code>main()</code> (IIFE) preenche o ano, roda <code>checkRequirements()</code> e, se houver erro, mostra as mensagens e desabilita o botão.",
      "<code>checkRequirements</code>: exige <code>window.chrome</code>, a presença de <code>LanguageModel</code> (senão orienta ativar <code>chrome://flags/#prompt-api-for-gemini-nano</code>) e consulta <code>LanguageModel.availability({ languages: [\"pt\"] })</code> tratando <code>unavailable</code>, <code>downloading</code> e <code>downloadable</code> (este último cria uma sessão com <code>monitor</code> e loga <code>downloadprogress</code>).",
      "<code>LanguageModel.params()</code> define os limites dos controles: <code>maxTopK</code> no input de topK e <code>maxTemperature</code> no range (os defaults vêm do próprio modelo; o código documenta <code>defaultTemperature: 1</code>, <code>defaultTopK: 3</code>, <code>maxTemperature: 2</code>, <code>maxTopK: 128</code>).",
      "Ao enviar, <code>onSubmitQuestion</code> lê temperature/topK do form, troca o botão para \"Parar\" e consome <code>askAI()</code> (async generator).",
      "<code>askAI</code> aborta o controller anterior, destrói a sessão anterior, cria uma <b>nova sessão</b> com os valores atuais (temperature/topK só se definem na criação) e usa <code>promptStreaming(..., { signal })</code>.",
      "O botão \"Parar\" chama <code>abort()</code>; o laço <code>for await</code> verifica <code>signal.aborted</code> e interrompe."
     ],
     "rodar": [
      "<b>Rodar:</b> Chrome recente com a flag <code>chrome://flags/#prompt-api-for-gemini-nano</code> ativa.",
      "<b>Rodar:</b> <code>npm install</code> e <code>npm start</code> (executa <code>npx http-server .</code>; a porta padrão do http-server é 8080) e abra a URL no Chrome.",
      "<b>Rodar:</b> Na primeira vez o modelo é baixado; acompanhe o percentual no console (o código só loga, não mostra na UI).",
      "<b>Rodar:</b> Nenhuma chave de API.",
      "<b>Ideia:</b> Faça um grid: mesma pergunta com temperature 0, 1 e 2 e topK 1, 3 e 40; compare.",
      "<b>Ideia:</b> Mostre o percentual do download do modelo na própria tela.",
      "<b>Ideia:</b> Mantenha o histórico em vez de destruir a sessão a cada pergunta.",
      "<b>Ideia:</b> Adicione um botão \"regenerar\" e um contador de tokens."
     ],
     "armadilhas": [
      "Temperature e topK só podem ser definidos em <code>LanguageModel.create</code>; mudar o slider sem recriar a sessão não teria efeito (por isso o código destrói e recria).",
      "Sem a flag ativa, o app mostra a lista de erros e desativa o botão: não é bug.",
      "No fluxo <code>downloadable</code>, o código adiciona o aviso, tenta baixar e só retorna <code>null</code> se a nova checagem der <code>available</code>; caso contrário o botão fica desabilitado até recarregar.",
      "<code>output.textContent</code> mostra texto puro; se você trocar o prompt para pedir markdown, ele não será renderizado (o exemplo 03 usa a lib <code>markdown</code>).",
      "<code>package-lock.json</code> existe, mas <code>http-server</code> é a única dependência; não há bundler nem TypeScript."
     ],
     "templateVsZ": "<b>Dica:</b> troque <code>temperature</code> para 0 e rode a mesma pergunta duas vezes: a saída tende a ser quase idêntica. Com valores altos, ela diverge. Esse é o jeito mais barato de internalizar o conceito antes de usar APIs pagas."
    },
    {
     "proj": "exemplo-05",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-05-webai03-multimodal",
     "resumo": "Mandar <b>imagem ou áudio</b> junto com a pergunta ao LLM embutido no Chrome e traduzir a resposta de volta ao português com as APIs de Translator e LanguageDetector, tudo local.",
     "fluxo": [
      "<code>index.js</code> cria os serviços e a view, chama <code>aiService.checkRequirements()</code> e <code>translationService.initialize()</code>; só então inicializa os parâmetros e o <code>FormController</code>.",
      "<code>checkRequirements</code> valida Chrome, <code>LanguageModel</code>, <code>Translator.availability({ sourceLanguage: \"en\", targetLanguage: \"pt\" })</code> e a presença de <code>LanguageDetector</code>, apontando a flag certa para cada ausência, e depois a disponibilidade do modelo em inglês.",
      "<code>createSession</code> abre a sessão com <code>expectedInputs</code> de texto (en), áudio e imagem, <code>expectedOutputs</code> de texto (en) e prompt de sistema em inglês, em formato de conteúdo <code>[{ type: \"text\", value }]</code>.",
      "O arquivo anexado vira <code>Blob</code> e entra no conteúdo do usuário: <code>[{ type: \"text\", value: question }, { type: \"image\" | \"audio\", value: blob }]</code>.",
      "<code>promptStreaming</code> entrega a resposta em inglês; <code>FormController.handleSubmit</code> acumula em <code>fullResponse</code> e mostra ao vivo.",
      "Concluído o stream, <code>translationService.translateToPortuguese</code> detecta o idioma (<code>LanguageDetector.detect</code>); se já for pt devolve igual; senão usa <code>translator.translateStreaming</code> e fica com o último chunk (que já contém a tradução completa).",
      "Se qualquer etapa falhar, o texto original é devolvido (fallback) e erros aparecem como <code>Erro: ...</code> na tela."
     ],
     "rodar": [
      "<b>Rodar:</b> Chrome recente com as flags: <code>chrome://flags/#prompt-api-for-gemini-nano</code>, <code>chrome://flags/#translation-api</code> e <code>chrome://flags/#language-detector-api</code> (as mesmas que o app imprime quando faltam).",
      "<b>Rodar:</b> <code>npm install</code> e <code>npm start</code> (<code>npx http-server .</code>), abra a URL, anexe uma imagem ou áudio (em inglês, conforme o rótulo da tela) e pergunte.",
      "<b>Rodar:</b> Downloads de modelo (LLM e par de tradução en-pt) acontecem na primeira vez.",
      "<b>Rodar:</b> Sem chaves ou variáveis de ambiente.",
      "<b>Ideia:</b> Pergunte \"descreva a imagem\" e \"transcreva o áudio\" e compare a qualidade.",
      "<b>Ideia:</b> Mostre a resposta em inglês e a tradução lado a lado.",
      "<b>Ideia:</b> Acrescente outra API embutida do Chrome (por exemplo Summarizer) como etapa extra do pipeline.",
      "<b>Ideia:</b> Explore o WebMCP (link do README): exponha ferramentas da página para o modelo chamar."
     ],
     "armadilhas": [
      "O app para na inicialização e desabilita o botão se qualquer uma das três APIs estiver ausente; leia a mensagem de erro, ela indica a flag.",
      "<code>checkRequirements</code> retorna cedo quando falta Translator/LanguageDetector, então o cheque do modelo só acontece depois que as duas flags estão ativas.",
      "O código compara <code>translatorAvailability === \"no\"</code>, mas a API costuma responder <code>unavailable</code>/<code>downloadable</code>/<code>available</code>; esse teste pode nunca disparar.",
      "O prompt e a sessão estão em inglês (<code>languages: [\"en\"]</code>): perguntar em português funciona pior; o label da UI pede conteúdo em inglês.",
      "Só <code>image/*</code> e <code>audio/*</code> são anexados; outros tipos são ignorados em silêncio.",
      "<code>translateStreaming</code> devolve a tradução acumulada a cada chunk (por isso <code>translated = chunk</code>, não <code>+=</code>)."
     ],
     "templateVsZ": "<b>Dica:</b> compare <code>services/aiService.js</code> com o <code>askAI</code> do exemplo 04: a diferença está em <code>expectedInputs</code>/<code>expectedOutputs</code>, no formato de conteúdo com <code>type</code>/<code>value</code> e no passo de tradução."
    }
   ]
  },
  {
   "id": "D1-07",
   "bloco": "d01-b4",
   "mod": "Módulo 6 · Caps. 1 e 2",
   "emoji": "✍️",
   "read": "11 min",
   "title": "Prompt Engineering — e os padrões JSON e TOON",
   "short": "Instruir a IA com clareza pra ela parar de adivinhar.",
   "oneliner": "<b>Prompt Engineering</b> é escrever instruções tão claras e estruturadas que a IA para de “adivinhar” o que você quer — reduzindo alucinações e retrabalho. E como LLMs gostam de dados estruturados, os formatos <b>JSON</b> e <b>TOON</b> deixam esses prompts ainda mais precisos e baratos.",
   "vovo": [
    "Você contratou um funcionário novo, esforçado, mas que <b>leva tudo ao pé da letra</b> e, na dúvida, <b>inventa</b>. Se você manda “faz um bolo”, ele faz de qualquer sabor e tamanho. O resultado sai errado e você repete tudo.",
    "Prompt Engineering é <b>dar a instrução completa de uma vez</b>: “bolo de fubá, pra 8 pessoas, sem açúcar, e se faltar ingrediente, me avise em vez de improvisar”. E <b>JSON/TOON</b> são como um <b>formulário com campos separados</b> em vez de um bilhete corrido — fica impossível confundir o que é o quê."
   ],
   "oque": [
    "A arte de instruir a LLM com <b>clareza e estrutura</b>, para reduzir alucinação e retrabalho.",
    "Um framework de <b>10 blocos</b> (inspirado em um estudo da Anthropic) guia o modelo.",
    "Dois formatos estruturados: <b>JSON Prompt</b> (campos separados, validável) e <b>TOON</b> (compacto, para economizar tokens).",
    "Premissa: LLMs são algoritmos que preveem tokens; quanto mais estruturada a entrada, melhor o modelo processa e responde."
   ],
   "como": [
    "<b>Por que alucina:</b> o modelo não é determinístico; prevê o próximo token pelo contexto. Com prompt mal formulado, adivinha: inventa dados, mistura contextos ou responde com segurança sem base. Exemplo da aula: perguntar “Quem é Eric Wendel?” pode misturar fatos com falsidades (como atribuir livros de Java).",
    "<b>Os 10 blocos:</b> <b>1</b> contexto da tarefa (papel: “Você é Joe, coach de carreira…”) · <b>2</b> tom de voz · <b>3</b> fonte da verdade (documentos, regras, tabelas; evita dados genéricos da internet) · <b>4</b> contrato operacional (“se não tiver certeza, diga que não sabe; se faltar dado, peça”) · <b>5</b> exemplos de entrada e saída · <b>6</b> histórico do usuário · <b>7</b> pedido claro (não misturar contexto com demanda) · <b>8</b> incentivo ao raciocínio (validar ou revisar antes de responder) · <b>9</b> formato da resposta · <b>10</b> restrições e validação (limite de caracteres, idioma, campos obrigatórios, o que fazer sem dado).",
    "<b>Checklist anti-alucinação:</b> sempre dê o papel; forneça documentos ou dados reais, mesmo em texto simples; peça para não inventar e dizer quando não tem informação; mande perguntar quando o pedido for incompleto; em ambiguidade, listar opções e pedir escolha.",
    "<b>Antes e depois:</b> “Crie um plano de carreira pra mim” não diz área, nível nem objetivo. Melhor: “Você é um consultor de carreira. Meu objetivo é migrar para backend em Java. Tenho experiência com banco de dados e sou formado em engenharia. Crie um plano de três anos com foco em empresas de tecnologia.”",
    "<b>JSON Prompt:</b> campos <code>meta</code> (nome, versão, idioma, papel), <code>context</code>, <code>task</code>, <code>constraints</code>, <code>output</code>. Reduz ambiguidade, facilita validar a saída e gerar re-prompts automáticos (Zod, Ajv, Yup) e padroniza prompts versionáveis para times e pipelines. O JSON cru gasta mais tokens pela sintaxe, mas a padronização economiza em correções.",
    "<b>Exemplo ilustrativo (não é da apostila):</b> <code>{\"meta\":{\"role\":\"consultor de carreira\",\"lang\":\"pt-BR\"},\"context\":{\"profile\":\"backend, 5 anos de banco de dados\"},\"task\":\"plano de 3 anos\",\"constraints\":[\"se faltar dado, pergunte\"],\"output\":{\"format\":\"json\",\"fields\":[\"fase\",\"meta\",\"risco\"]}}</code>.",
    "<b>TOON</b> (Token Oriented Object Notation) tira aspas, chaves e símbolos para economizar tokens: lista de 6 itens, 367 tokens em JSON contra 339 em TOON; a apostila diz que o ganho cresce com listas maiores (mais de 140 tokens por prompt). Mas um JSON tabular (colunas e linhas) pode ser mais eficiente: 26 tokens contra 35 no TOON do exemplo.",
    "<b>Quando usar:</b> JSON para integrar com APIs, validar com schema e manter compatibilidade com as ferramentas; TOON quando a economia de tokens é prioridade, a estrutura é simples e o parsing customizado é aceitável. Custos do TOON: formato novo, sem suporte em ferramentas comuns e integração mais complexa."
   ],
   "aplica": [
    "Transformar prompts vagos em instruções precisas (sempre inclua o <b>papel</b> da IA).",
    "Validar saídas de LLM com <b>schemas</b> (Zod) para reprocessar automaticamente.",
    "Comparar consumo de tokens JSON vs TOON no playground antes de escolher.",
    "Veja a estrutura em uso real no repo: <code>exemplo-08/prompt.md</code> (seções de contexto, tom, dados, tarefa, passo a passo e formato de saída, doc <a href=\"#D1-09\">09</a>), <code>exemplo-13/prompts/template.txt</code> (role, task, tone, language, format e instruções, doc <a href=\"#D1-11\">11</a>) e <code>exemplo-06/prompts/generate_test.prompt.md</code>."
   ],
   "pros": [
    "Menos alucinação e menos retrabalho",
    "Saídas previsíveis e integráveis (validação por schema)",
    "Padroniza prompts para times e pipelines"
   ],
   "contras": [
    "Prompt estruturado dá mais trabalho de montar",
    "JSON puro gasta mais tokens pela sintaxe",
    "TOON exige parsing customizado"
   ],
   "traps": [
    "Pedido vago sem papel nem contexto (“crie um plano de carreira pra mim”)",
    "Não permitir “não sei” nem orientar a pedir dados faltantes",
    "Não dar exemplos nem definir o formato de saída",
    "Forçar TOON antes de dominar um bom JSON estruturado"
   ],
   "cola": [
    [
     "Papel (role)",
     "Persona atribuída à IA no prompt"
    ],
    [
     "Fonte da verdade",
     "Dados de referência que ancoram a resposta"
    ],
    [
     "Contrato operacional",
     "Regras de comportamento (“não sei” é permitido)"
    ],
    [
     "JSON Prompt",
     "Prompt estruturado em campos (meta, context, task, constraints, output)"
    ],
    [
     "TOON",
     "Notação compacta que economiza tokens"
    ],
    [
     "Zod / Ajv / Yup",
     "Bibliotecas de validação de schema"
    ],
    [
     "Re-prompt",
     "Pedir de novo ao modelo quando a saída não passa no schema"
    ]
   ],
   "tip": "<b>Recomendação do curso:</b> comece com <b>JSON bem estruturado + validação</b> — resolve a maior parte dos problemas de integração. Deixe o TOON para cenários onde economia de tokens é essencial.",
   "links": [
    [
     "Prompt Engineering (OpenAI)",
     "https://platform.openai.com/docs/guides/prompt-engineering"
    ],
    [
     "Tokenizer da OpenAI",
     "https://platform.openai.com/tokenizer"
    ],
    [
     "Effective context engineering (Anthropic)",
     "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
    ],
    [
     "Claude 4 best practices (prompting)",
     "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices"
    ],
    [
     "Prompting e debugging (Lovable)",
     "https://docs.lovable.dev/prompting/prompting-debugging"
    ],
    [
     "TOON (formato)",
     "https://github.com/toon-format/toon"
    ],
    [
     "Playground do TOON",
     "https://toontools.vercel.app/playground"
    ]
   ],
   "curso": "Estrutura de <b>10 blocos</b> aplicada para transformar prompts vagos em instruções precisas; comparação real de tokens <b>JSON vs TOON</b> no playground; uso de <b>Zod</b> para tornar saídas de LLM previsíveis e reprocessáveis. No fim da aula 2, o professor antecipa a construção de assistentes em produção."
  },
  {
   "id": "D1-08",
   "bloco": "d01-b4",
   "mod": "Módulo 7 · Caps. 1 e 2",
   "emoji": "🤖",
   "read": "11 min",
   "title": "Ferramentas de IA para Dev — Cursor, Windsurf e Agentes",
   "short": "Editores viraram cockpits de IA e ganharam agentes que executam.",
   "oneliner": "Os editores viraram <b>cockpits de IA</b> (VS Code, Cursor, Windsurf), e dentro deles surgiram os <b>agentes</b> — sistemas que usam uma LLM como <b>motor de decisão</b> acoplado a ferramentas e ciclos de execução, para não só <i>conversar</i>, mas <i>fazer</i> e <i>validar</i> tarefas.",
   "vovo": [
    "O editor de código era uma <b>máquina de escrever</b>; hoje é um ambiente com <b>assistente embutido</b>. A diferença entre uma IA que só conversa e um <b>agente</b>? Um <b>consultor</b> te dá conselho (“troque a torneira assim”), mas quem faz é você. Um <b>faz-tudo (agente)</b> pega as ferramentas, troca a torneira, abre a água pra testar, vê que ainda pinga, aperta mais e só então te chama.",
    "O agente <b>age, observa o resultado e corrige</b> antes de entregar — daí a sensação de “acertou de primeira”. E numa obra grande você contrata <b>especialistas</b>: um planeja, um executa, um fiscaliza, um testa."
   ],
   "oque": [
    "Os editores viraram ambientes de execução de agentes de IA. <b>Cursor</b> e <b>Windsurf</b> são <b>forks do VS Code</b> (o “Chrome dos editores”: extensões, temas, debugger integrado, terminal e Git) com camadas de IA.",
    "<b>Cursor</b> (a apostila diz que veio da empresa “Hemisphere”, em 2022, AI-first desde o início): US$ 2,3 bi levantados numa rodada, valuation de US$ 29,3 bi. <b>Windsurf</b> (equipe do Codium, do plugin alternativo ao autocomplete do GitHub Copilot): US$ 150 mi captados, valuation de US$ 1,2 bi; a OpenAI chegou a considerar comprá-lo por US$ 3 bi, sem fechar. Números segundo a apostila.",
    "Por que tanto dinheiro: atacam o <b>maior custo da indústria de software, o tempo de desenvolvimento</b>.",
    "Modos do chat no VS Code: <b>ASK</b> (a apostila grafa “ASCII”), <b>EDIT</b>, <b>PLAN</b> e <b>AGENT</b>.",
    "<b>Agente de IA</b> = LLM como motor de decisão + ferramentas + ciclo de execução e observação. Uma LLM sozinha não roda comandos, não abre arquivos, não roda testes e não valida o próprio resultado."
   ],
   "como": [
    "No dia a dia VS Code e Windsurf quase não diferem (atalhos, extensões, aparência); muda a <b>profundidade da integração com IA</b>.",
    "<b>PLAN → AGENT:</b> o plano é aprovado antes; só então o AGENT executa com autonomia, iterando conforme o contexto e as ferramentas. É o modo mais usado no dia a dia.",
    "<b>Agentes customizados:</b> personas para tarefas repetitivas do ciclo de dev (validar testes, checar boas práticas), com modelos diferentes e acesso restrito a ferramentas; na prática, sub-prompts pré-definidos com escopo limitado.",
    "<b>Ciclo do agente:</b> entender o objetivo → planejar → selecionar ferramentas → agir → observar o resultado → corrigir erros → entregar com evidências. Cada passo é validado antes do próximo, o que evita loops infinitos e desperdício de tokens.",
    "<b>Ferramenta certa por tarefa:</b> ler código (leitor de arquivos), validar comportamento (teste), estilo (linter ou formatador), buscar API (Swagger ou documentação), ver banco (cliente SQL). O diferencial é a autonomia para executar.",
    "<b>Pensar como dev experiente:</b> etapas pequenas, critérios de aceite, plano de execução e saber quando terminou.",
    "<b>Papéis especializados:</b> Planner, Implementer, Reviewer (diffs e riscos), QA (fluxo fim a fim), Docs Agent (README e changelog) e Ops Agent (monitora e sugere mitigação); permite controle fino de permissões.",
    "<b>Spec Driven Development:</b> buracos no prompt viram chutes. Uma spec tem contexto (stack, ambiente, dependências), requisitos, <b>não-requisitos</b>, critérios de aceite, contrato (formato da API, shape da resposta) e plano de testes.",
    "<b>Fluxo profissional:</b> definir a spec → criar agentes com papéis → executar cada etapa com validação → integrar os resultados a testes automatizados.",
    "<b>Agentes não vivem só em editores:</b> podem estar em back-ends, pipelines de CI, bots de suporte e observabilidade."
   ],
   "aplica": [
    "Escrever, revisar e testar código dentro do editor com autonomia controlada.",
    "Criar agentes customizados com <b>escopo restrito</b> de ferramentas para tarefas repetitivas.",
    "Dividir um trabalho grande entre papéis (planner/implementer/reviewer/QA)."
   ],
   "pros": [
    "Executa e valida — não só imagina",
    "O ciclo evita loops infinitos e desperdício de tokens",
    "Dá controle, revisão, testes e auditoria"
   ],
   "contras": [
    "Falha quando a tarefa está mal definida (preenche buracos com chute)",
    "Precisa de uma boa spec e de engenharia de prompt",
    "Autonomia sem controle vira risco"
   ],
   "traps": [
    "Confiar em plataforma “prompt-to-app mágica” sem revisão: o app que o professor criou numa delas (tipo Lovable) teve falhas graves de segurança, validação e estrutura, e precisou ser reescrito no VS Code.",
    "Tarefa mal especificada, sem critérios de aceite nem contrato.",
    "Dar acesso amplo a ferramentas sem escopo. A lista de referências inclui a reportagem da Fortune sobre uma ferramenta de código com IA (Replit) que apagou um banco de dados.",
    "Achar que agente é só “LLM com plugins”: é sistema com controle de execução, planejamento e validação."
   ],
   "cola": [
    [
     "Fork do VS Code",
     "Editor derivado do VS Code (Cursor, Windsurf)"
    ],
    [
     "ASK/EDIT/PLAN/AGENT",
     "Modos de interação com IA no editor"
    ],
    [
     "Agente de IA",
     "LLM como motor de decisão + ferramentas + ciclo"
    ],
    [
     "Ciclo do agente",
     "Entender → planejar → agir → observar → corrigir → entregar"
    ],
    [
     "Papéis",
     "Planner, Implementer, Reviewer, QA, Docs, Ops"
    ],
    [
     "Spec Driven Development",
     "Definir a tarefa com precisão antes de executar"
    ]
   ],
   "links": [
    [
     "Latent Space sobre o Cursor",
     "https://www.latent.space/p/cursor"
    ],
    [
     "Financiamento do Cursor (Crunchbase)",
     "https://news.crunchbase.com/venture/cursor-financing-ai-coding-automation/"
    ],
    [
     "OpenAI e Windsurf (Reuters)",
     "https://www.reuters.com/business/openai-agrees-buy-windsurf-about-3-billion-bloomberg-news-reports-2025-05-06/"
    ],
    [
     "Custom agents no VS Code",
     "https://code.visualstudio.com/docs/copilot/customization/custom-agents"
    ],
    [
     "Spec-driven development (Spec Kit)",
     "https://developer.microsoft.com/blog/spec-driven-development-spec-kit"
    ],
    [
     "Git worktrees (agentes em paralelo)",
     "https://www.marcohaber.dev/blog/git-worktrees"
    ],
    [
     "Replit apagou um banco de produção (Fortune)",
     "https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/"
    ]
   ],
   "curso": "Comparação prática entre <b>VS Code, Cursor e Windsurf</b>; uso dos modos ASK/EDIT/PLAN/AGENT e de agentes customizados com escopo restrito; caso real de um app <i>prompt-to-app</i> reescrito no VS Code com boas práticas de segurança e teste.",
   "tip": "<b>Exemplo de spec (ilustrativo, não é da apostila):</b> Contexto: API Node 22 com Postgres. Requisito: <code>POST /orders</code> idempotente. Não-requisito: não mexer no módulo de auth. Critério de aceite: repetir a mesma chave devolve 201 com o mesmo id. Contrato: corpo e resposta em JSON, com schema. Testes: unitário da regra e e2e do endpoint."
  },
  {
   "id": "D1-09",
   "bloco": "d01-b4",
   "mod": "Módulo 8 · Caps. 1 a 5",
   "emoji": "🔌",
   "read": "12 min",
   "title": "MCPs e automação para devs",
   "short": "O “USB das ferramentas” que dá mãos ao agente.",
   "oneliner": "<b>MCP (Model Context Protocol)</b> é um padrão aberto — o “<b>USB das ferramentas</b>” da era das LLMs — que conecta a IA a APIs, arquivos, bancos e serviços de forma plug-and-play, deixando o agente <b>agir no mundo real</b> em vez de só responder.",
   "vovo": [
    "Sabe como qualquer pendrive ou impressora encaixa na <b>mesma entrada USB</b>? O MCP é isso pra IA: uma <b>tomada padrão</b> onde você “pluga” ferramentas — GitHub, navegador, monitoramento, e-mail — e a IA passa a usá-las na hora.",
    "Sem MCP, a IA é uma pessoa inteligente <b>presa numa sala só falando</b>: dá ótimos conselhos, mas não aperta botão. Com MCP, ela ganha <b>mãos</b>. E como sabe qual usar? Cada ferramenta tem uma <b>plaquinha</b> (nome + descrição), e a IA escolhe a que melhor combina com o pedido."
   ],
   "oque": [
    "Protocolo <b>aberto</b>, anunciado pela Anthropic em nov/2024, para integrar assistentes de IA a APIs, arquivos, bancos e qualquer fonte ou serviço.",
    "<b>3 componentes</b> de um servidor MCP: Tools (ações executáveis), Resources (dados de contexto: arquivos, logs, schemas) e Prompts (templates que ajudam a formular o uso das tools). Tudo descrito por schemas padronizados.",
    "Você pluga servidores MCP num cliente compatível (VS Code) e a IA os usa <b>automaticamente</b>, sem código adicional. Exemplos da aula: resumir as alterações de um pull request, aplicar correções, escrever testes e commitar; ou enviar um e-mail pela API do Gmail."
   ],
   "como": [
    "<b>Não há if-else:</b> a LLM escolhe a tool pela <b>similaridade</b> entre o pedido e o nome, a descrição e os parâmetros da tool. Nomes claros (ex.: <code>readFile</code>) e descrições objetivas são priorizados.",
    "Ela prefere <b>ações não destrutivas</b> (ler, listar) antes de escrever ou apagar, e tools com <b>schemas bem definidos</b>.",
    "Cada tool tem um <b>JSON Schema</b>; se o modelo não gerar JSON válido, a execução falha e ele tenta de novo. Modelos avançados <b>encadeiam chamadas</b>: usam uma tool, analisam o resultado e chamam outra.",
    "Plugado via <code>mcp.json</code> no VS Code ou outro editor: aponta para o servidor e fornece as credenciais. Benefícios: menos alucinação (dados reais), extensibilidade (instalar novos servidores) e modularidade (combinar fontes).",
    "<b>Servidor próprio do professor:</b> estruturou uma API de palestras, posts e vídeos, gerou SDK via GraphQL, criou testes com o Node.js Test Runner e publicou no npm; qualquer pessoa instala e consulta pelo editor (repo <code>erickwendel-contributions-mcp</code>).",
    "<b>Cap. 2, testes (Playwright MCP):</b> repositório vazio + prompts estruturados: cria o projeto Playwright, instala só o Chromium, gera o workflow do GitHub Actions, mapeia a página (campos, listas, botões), gera testes a partir de objetivos genéricos, roda e ajusta até passar. A IA decide entre navegador visível e headless; os relatórios HTML do Playwright mostram o que foi feito; os prompts são reutilizáveis com outros modelos (a aula cita GPT-5).",
    "<b>Cap. 3, navegação e formulários:</b> agente no VS Code + extensão <b>Playwright MCP Bridge</b> no Chrome (acesso às abas abertas e a sessões logadas). Prompt “navegue em ericwendel.com e resuma”; depois preenche um formulário da comunidade Node.br com dados do perfil no Sessionize, pede o que falta (telefone, e-mail), mantém o contexto e troca de palestra para repetir. Também roda com modelo local (Qwen Coder de 30B, “QuenCoder” na apostila, via o app Tome, que liga modelos open source a servidores MCP).",
    "<b>Cap. 4, Context7:</b> LLMs são treinadas até uma data e sugerem API antiga. O Context7 é um servidor MCP que indexa a documentação de projetos reais (Next.js, Better Auth, Node.js, Prisma) e injeta só os trechos relevantes; sem ele, cola-se documentação enorme no prompt (caro e sujeito a erro). Integração: chave de API no painel, <code>mcp.json</code> e habilitar as tools <code>queryDocs</code> e <code>resolveLibrary</code>. Demo: app Next.js + Better Auth (login GitHub) + SQLite criado com um prompt, rodando na porta 3000, sem correção manual.",
    "<b>Cap. 5, telemetria:</b> app instrumentada com OpenTelemetry enviando para Prometheus (métricas), Grafana Tempo (traces) e Grafana Loki (logs), com Grafana para visualizar, tudo em Docker Compose. Um prompt (“erro 500 neste endpoint, descubra o motivo e gere relatório”) faz a IA ler métricas, logs e traces, correlacioná-los e achar um vazamento de conexões com o banco, sem acesso ao código-fonte. O relatório traz endpoint, tempos, stack trace, causa raiz e linhas suspeitas. O professor usou a prática num problema real da própria infraestrutura."
   ],
   "aplica": [
    "<b>GitHub</b> (listar/revisar PRs); <b>Playwright</b> (gerar testes e preencher formulários); <b>Resend</b> (e-mail).",
    "<b>Context7</b>: injeta documentação <b>atualizada</b> no contexto → menos código quebrado e menos alucinação.",
    "<b>Grafana</b>: investigar telemetria (Prometheus/Loki/Tempo) e achar a <b>causa raiz</b> de um erro 500 — sem acessar o código-fonte."
   ],
   "pros": [
    "Dá “mãos” ao agente — ele age de verdade",
    "Plug-and-play, sem escrever integração",
    "Previsível via JSON Schema; investigações de horas viram minutos"
   ],
   "contras": [
    "Tools com nomes ou descrições ruins são ignoradas",
    "Ações destrutivas exigem cuidado extra",
    "Depende de servidores MCP disponíveis e confiáveis",
    "Credenciais (tokens no <code>mcp.json</code>) precisam ficar fora do Git"
   ],
   "traps": [
    "Nomes e descrições de tool vagas — a LLM não seleciona bem",
    "Expor ações destrutivas (deletar/escrever) sem proteção",
    "Confiar na doc desatualizada do modelo em vez de um MCP tipo Context7"
   ],
   "cola": [
    [
     "MCP",
     "Protocolo aberto que conecta LLMs a ferramentas/dados"
    ],
    [
     "Tool",
     "Ação executável exposta pelo servidor MCP"
    ],
    [
     "Resource",
     "Dado de contexto (arquivo, log, schema)"
    ],
    [
     "JSON Schema",
     "Contrato dos parâmetros de uma tool"
    ],
    [
     "mcp.json",
     "Arquivo que pluga servidores MCP no editor"
    ],
    [
     "Context7",
     "MCP que injeta documentação atualizada"
    ],
    [
     "Grafana MCP",
     "MCP para investigar telemetria (Prometheus/Loki/Tempo)"
    ]
   ],
   "links": [
    [
     "Model Context Protocol (site)",
     "https://modelcontextprotocol.io/"
    ],
    [
     "Anúncio do MCP (Anthropic)",
     "https://www.anthropic.com/news/model-context-protocol"
    ],
    [
     "erickwendel-contributions-mcp (repo do professor)",
     "https://github.com/ErickWendel/erickwendel-contributions-mcp"
    ],
    [
     "Resend MCP (e-mail)",
     "https://github.com/resend/mcp-send-email/tree/main"
    ],
    [
     "Playwright MCP",
     "https://github.com/microsoft/playwright-mcp"
    ],
    [
     "Playwright: test agents",
     "https://playwright.dev/docs/test-agents#agent-definitions"
    ],
    [
     "Context7",
     "https://github.com/upstash/context7"
    ],
    [
     "Chrome DevTools MCP",
     "https://github.com/ChromeDevTools/chrome-devtools-mcp"
    ],
    [
     "Better Auth",
     "https://www.better-auth.com/"
    ]
   ],
   "curso": "<b>Fora do repo:</b> o <b>erickwendel-contributions-mcp</b> (servidor MCP pessoal do professor, publicado no npm) e o <b>Resend MCP</b> para e-mail. Os exemplos 06 a 09 estão detalhados abaixo.",
   "codigo": [
    {
     "proj": "exemplo-06",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-06-playwright-testes",
     "resumo": "Usar o <b>Playwright MCP</b> para o agente de código explorar uma página de verdade e escrever testes E2E em TypeScript a partir do que viu, em vez de adivinhar seletores.",
     "fluxo": [
      "<code>prompts/project-scaffolding.md</code> pede a criação do setup só com <code>@playwright/test</code>: baseURL (app alvo: <code>https://erickwendel.github.io/vanilla-js-web-app-example/</code>), timeout de no máximo 5 s, pasta <code>tests/</code>, primeiro spec e workflow do GitHub Actions rodando só Chromium (<code>npx playwright install --with-deps chromium</code>, <code>npm ci</code>, <code>npm test</code>, relatório HTML como artefato em caso de falha).",
      "<code>prompts/generate_test.prompt.md</code> é o \"system prompt\" do gerador: não gerar código só pelo cenário, executar cada passo com as ferramentas do Playwright MCP, só depois emitir o teste TypeScript com base no histórico, salvar em <code>tests/</code>, executar e iterar até passar.",
      "Regras de qualidade no mesmo prompt: usar Chrome (não headless), testes idempotentes sem depender de estado prévio, preferir <code>getByRole</code> com nome a seletores frágeis.",
      "<code>prompts/generate-tests.md</code> é o pedido concreto: navegar até a página e gerar testes para (1) enviar o formulário e checar que a lista atualizou e (2) validação do formulário.",
      "Ciclo: configurar MCP no cliente (VS Code/Cursor/etc.) → colar scaffolding → usar o prompt do gerador + cenário → revisar e commitar o teste gerado."
     ],
     "rodar": [
      "<b>Rodar:</b> Não há <code>package.json</code> nesta pasta. Copie o conteúdo de <code>example.mcp.json</code> para a config de MCP do seu editor (o formato <code>servers</code> é o do VS Code, <code>.vscode/mcp.json</code>).",
      "<b>Rodar:</b> O modo <code>--extension</code> conecta o MCP ao seu Chrome já aberto por meio da extensão do Playwright MCP; o token da extensão vai em <code>PLAYWRIGHT_MCP_EXTENSION_TOKEN</code> (substitua o placeholder, sem commitar).",
      "<b>Rodar:</b> Peça ao agente: scaffolding (<code>project-scaffolding.md</code>), depois o cenário (<code>generate-tests.md</code>) com o prompt gerador no contexto. Os testes gerados rodam com <code>npx playwright test</code>.",
      "<b>Rodar:</b> Requer Node/npx e um cliente de IA com suporte a MCP.",
      "<b>Ideia:</b> Aplique o mesmo prompt a um app seu (login, CRUD) e compare com testes escritos à mão.",
      "<b>Ideia:</b> Acrescente ao prompt exigência de page objects ou de dados de teste isolados.",
      "<b>Ideia:</b> Rode os testes no GitHub Actions do scaffolding e force uma falha para ver o relatório.",
      "<b>Ideia:</b> Peça ao agente para cobrir caminhos de erro (campos vazios, e-mail inválido)."
     ],
     "armadilhas": [
      "<code>@playwright/mcp@latest</code> muda rápido; fixe a versão se a aula parar de reproduzir.",
      "Não commite o token real: o arquivo é um <code>example</code> por esse motivo.",
      "O formato do JSON (<code>servers</code>) é de clientes como o VS Code; outros clientes usam <code>mcpServers</code>.",
      "O prompt manda usar Chrome \"em vez de headless\", o que conflita com CI; o scaffolding configura Chromium para o pipeline.",
      "O timeout máximo de 5 s do scaffolding pode ser curto para páginas lentas."
     ],
     "templateVsZ": "<b>Dica:</b> o valor aqui está nos prompts. Reaproveite <code>generate_test.prompt.md</code> como instrução fixa (arquivo de prompt do Copilot, regra do Cursor ou system prompt de um agente) e varie só o cenário."
    },
    {
     "proj": "exemplo-07",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-07-playwright-navegacao",
     "resumo": "Usar o mesmo Playwright MCP, agora para <b>navegação autônoma</b>: o agente descobre campos de um formulário, extrai os dados de um perfil em outro site e preenche tudo, parando antes do submit.",
     "fluxo": [
      "O prompt manda navegar até o Google Form (<code>forms.gle/5mGHXVKDLMFtjwBz7</code>) e listar quais campos exigem preenchimento.",
      "Depois, ir à página do palestrante em <code>sessionize.com/erickwendel</code> e coletar do perfil todos os dados que o formulário pede.",
      "Escolher uma palestra em <b>português</b> que tenha \"javascript\" no título e preencher o formulário com ela.",
      "Restrições explícitas: <b>não apertar submit</b> (o humano valida) e garantir que as informações estejam em português, como estão no Sessionize.",
      "Por baixo, o agente alterna entre ferramentas do MCP (navegar, capturar snapshot de acessibilidade, clicar, digitar) e raciocina sobre o que viu em cada etapa."
     ],
     "rodar": [
      "<b>Rodar:</b> Mesma configuração do exemplo 06: adicionar o servidor <code>playwright</code> (<code>npx @playwright/mcp@latest --extension</code>) ao seu cliente MCP e informar o token em <code>PLAYWRIGHT_MCP_EXTENSION_TOKEN</code>.",
      "<b>Rodar:</b> Cole o conteúdo de <code>prompt.md</code> no chat do agente.",
      "<b>Rodar:</b> Sem <code>package.json</code>, sem docker, sem custos além do modelo usado pelo seu cliente.",
      "<b>Ideia:</b> Automatize outro fluxo repetitivo seu (cadastro em evento, relatório) mantendo a regra \"não enviar\".",
      "<b>Ideia:</b> Peça ao agente que registre em tabela o que preencheu em cada campo para auditoria.",
      "<b>Ideia:</b> Compare a abordagem MCP (conversacional) com um script Playwright escrito à mão para a mesma tarefa."
     ],
     "armadilhas": [
      "O link do Google Form e a página do Sessionize podem mudar ou sair do ar; o prompt depende deles.",
      "Sem a instrução explícita de não enviar, um agente pode submeter dados reais.",
      "Dados pessoais de um perfil real são manipulados: use contas/dados de teste em fluxos próprios.",
      "Mesmo placeholder de token do exemplo 06: nunca versione o token real.",
      "Não há como \"rodar\" esta pasta sozinha: ela só funciona dentro de um cliente com MCP."
     ],
     "templateVsZ": "<b>Dica:</b> a diferença para o exemplo 06 é de intenção: lá o MCP serve para <i>produzir um artefato</i> (teste versionado); aqui serve para <i>executar uma tarefa</i> e devolver o controle ao humano antes da ação irreversível."
    },
    {
     "proj": "exemplo-08",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-08-context7",
     "resumo": "Usar o <b>Context7 MCP</b> para dar ao agente a documentação <i>atual</i> da biblioteca, evitando código desatualizado ou alucinado, e provar o resultado com um app Next.js + Better Auth + SQLite.",
     "fluxo": [
      "<code>prompt.md</code> exige: \"Você TEM acesso a MCPs no VS Code, e DEVE usar o Context7 MCP\". Regra crítica: se o Context7 não estiver disponível, responder apenas \"Context7 MCP não disponível. Não posso continuar.\"",
      "O prompt lista o que consultar: integração com Next.js (route handler), provider GitHub, SQLite com <code>better-sqlite3</code>, auth client e sign-in social, migração de schema; e exige mostrar \"Docs consultados\" com no máximo 8 a 10 linhas de snippets antes do código.",
      "<code>lib/auth.ts</code> configura <code>betterAuth</code> com <code>database: new Database(\"./better-auth.sqlite\")</code> (instrução explícita do prompt: nada de provider/url) e <code>socialProviders.github</code> com <code>GITHUB_CLIENT_ID</code> e <code>GITHUB_CLIENT_SECRET</code> do ambiente.",
      "<code>app/api/auth/[...all]/route.ts</code> expõe o handler com <code>toNextJsHandler(auth)</code> (GET e POST).",
      "<code>lib/auth-client.ts</code> cria <code>createAuthClient()</code> (<code>better-auth/react</code>); <code>app/login/page.tsx</code> chama <code>authClient.signIn.social</code> e <code>app/page.tsx</code> usa <code>authClient.useSession()</code> e <code>signOut</code>.",
      "O prompt também pede <code>npx @better-auth/cli migrate</code> para criar as tabelas e validar o serviço com o Playwright MCP (liga este exemplo ao 06/07)."
     ],
     "rodar": [
      "<b>Rodar:</b> Configurar o MCP do Context7 no seu editor (ver link do README) e colar <code>prompt.md</code> para o agente gerar o projeto, ou usar o projeto pronto.",
      "<b>Rodar:</b> Projeto pronto em <code>nextjs-better-auth-demo/</code>: criar um OAuth App no GitHub (callback <code>http://localhost:3000/api/auth/callback/github</code>) e criar <code>.env.local</code> com <code>GITHUB_CLIENT_ID</code>, <code>GITHUB_CLIENT_SECRET</code> e <code>BETTER_AUTH_URL=http://localhost:3000</code>.",
      "<b>Rodar:</b> <code>npm install</code>, <code>npx @better-auth/cli migrate</code> e <code>npm run dev</code> (scripts: <code>dev</code>, <code>build</code>, <code>start</code>); abra <code>http://localhost:3000</code>.",
      "<b>Rodar:</b> Precisa de compilar <code>better-sqlite3</code> (módulo nativo) e de uma conta GitHub.",
      "<b>Ideia:</b> Rode o mesmo prompt <b>com</b> e <b>sem</b> o Context7 e compare o código gerado com a documentação oficial.",
      "<b>Ideia:</b> Peça outro provider (Google) ou e-mail e senha e veja o agente consultar a doc.",
      "<b>Ideia:</b> Faça o mesmo para uma biblioteca que mudou recentemente (major version) e liste divergências.",
      "<b>Ideia:</b> Escreva prompts com cláusula de parada, como a do exemplo, para qualquer ferramenta obrigatória."
     ],
     "armadilhas": [
      "O arquivo <code>better-auth.sqlite</code> está versionado no repositório do curso (<code>git ls-files</code> o lista); não é para ser assim em projeto real. O <code>.gitignore</code> ignora <code>.env*</code>, então o <code>.env.local</code> não vem junto: você precisa criar.",
      "Sem <code>GITHUB_CLIENT_ID</code> e <code>GITHUB_CLIENT_SECRET</code> o <code>process.env.X as string</code> vira <code>undefined</code> e o login falha só em runtime.",
      "A URL de callback do OAuth precisa bater exatamente com <code>http://localhost:3000/api/auth/callback/github</code>.",
      "Esquecer o <code>migrate</code> deixa o banco sem tabelas e a sessão falha.",
      "O prompt manda usar <code>new Database(\"./better-auth.sqlite\")</code> direto; versões futuras do Better Auth podem exigir outra configuração, daí a importância de consultar a doc.",
      "<code>better-sqlite3</code> é nativo: em Windows pode exigir build tools; versões recentes do Node podem não ter binário pré-compilado."
     ],
     "templateVsZ": "<b>Dica:</b> o objetivo da pasta não é Next.js nem Better Auth: é o <b>prompt</b>. Observe o padrão: ferramenta obrigatória, o que consultar, o que mostrar antes do código, regra de parada e formato de saída numerado."
    },
    {
     "proj": "exemplo-09",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-09-grafana-mcp",
     "resumo": "Subir uma stack completa de observabilidade (OpenTelemetry, Prometheus, Loki, Tempo, Grafana), plugar o <b>Grafana MCP</b> e pedir ao agente que ache a causa raiz de um bug plantado (vazamento de conexões Postgres) cruzando métricas, logs e traces.",
     "fluxo": [
      "<code>src/index.ts</code> carrega <code>util/config.ts</code> (env-var), chama <code>initServer</code> e escuta em <code>0.0.0.0:9000</code>; em <code>NODE_ENV=production</code> (default) um <code>setInterval</code> de 2 s chama <code>/students/db-leaky-connections</code> para gerar tráfego.",
      "<code>app.ts</code> chama <code>initOtel</code> (exportadores OTLP gRPC de traces, métricas e logs), conecta no Postgres (<code>connect</code> + <code>seedDb</code>), registra <code>/health</code> e os cenários.",
      "O handler do cenário pega conexão do pool e responde; nas duas primeiras chamadas funciona, a terceira estoura o pool e dá <code>timeout exceeded when trying to connect</code> (HTTP 500), registrado no span com <code>recordException</code>.",
      "A app envia tudo ao <b>OTel Collector</b> (4317). O collector distribui: traces → Tempo, logs → Loki (OTLP), métricas → exporter Prometheus (8889) raspado pelo Prometheus.",
      "O Grafana provisiona Prometheus, Loki e Tempo como datasources (<code>grafana/provisioning/datasources/datasources.yaml</code>), com correlação trace ↔ log ↔ métrica (exemplars, <code>tracesToLogsV2</code>).",
      "O <code>mcp-grafana</code> (porta 8000, <code>-t streamable-http</code>) expõe esses datasources como ferramentas MCP ao agente.",
      "<code>docs/prompt.md</code> descreve a investigação esperada: Loki (500) → padrão 2 sucessos e depois falhas → tempos ~15 ms vs ~1000 ms → stack trace em <code>main.ts</code> → traces sem span de release → conclusão: faltou <code>client.release()</code> em um <code>finally</code>."
     ],
     "rodar": [
      "<b>Rodar:</b> Requisitos: Docker + Docker Compose, Node 22+ (<code>engines</code> do <code>_alumnus</code> pede 22.13.1).",
      "<b>Rodar:</b> Na pasta <code>alumnus/</code>: <code>npm run docker:infra:up</code> (compose da infra com <code>--wait</code>). Depois instale e rode o app: <code>cd _alumnus &amp;&amp; npm install</code>, e na raiz <code>npm run serve</code> (watch) ou <code>npm start</code>.",
      "<b>Rodar:</b> Acessos: Grafana <code>:3000</code> (login anônimo como Admin), Prometheus <code>:9090</code>, Loki <code>:3100</code>, Tempo <code>:3200</code>, app <code>:9000</code>, Postgres do app <code>:5433</code>, MCP <code>:8000</code>.",
      "<b>Rodar:</b> Disparar o bug: <code>curl http://localhost:9000/students/db-leaky-connections</code> três vezes; reset com <code>POST .../reset</code>.",
      "<b>Rodar:</b> Conectar o MCP: apontar o cliente (Windsurf no README, ou outro) para <code>http://localhost:8000/mcp</code> e usar os prompts de <code>docs/</code>.",
      "<b>Rodar:</b> Variáveis (todas com default): <code>PORT</code>, <code>DATABASE_URL</code>, <code>APPNAME</code>, <code>OTEL_EXPORTER_OTLP_ENDPOINT</code>, <code>NODE_ENV</code>, <code>LOG_LEVEL</code>, e as <code>GF_*</code>/<code>POSTGRES_*</code> do compose.",
      "<b>Rodar:</b> Parar e limpar: <code>npm run docker:infra:down</code> / <code>npm run docker:infra:cleanup</code>.",
      "<b>Ideia:</b> Corrija o bug com <code>try/finally</code> e use o agente para comprovar nos três sinais que as falhas sumiram.",
      "<b>Ideia:</b> Crie um novo cenário em <code>scenarios/</code> (query lenta, memory leak) estendendo <code>BaseScenario</code> e escreva o prompt de investigação.",
      "<b>Ideia:</b> Adicione uma regra de alerta em <code>prometheus/alerts.yaml</code> para o novo sintoma e peça ao agente para listá-la.",
      "<b>Ideia:</b> Compare o diagnóstico do agente com e sem o roteiro de passos de <code>docs/prompt.md</code>."
     ],
     "armadilhas": [
      "O <code>docker-compose-test.yaml</code> faz <code>include: ./docker-compos.yaml</code> (typo, e esse arquivo não existe na pasta); o README também cita um <code>docker-compose.yaml</code> principal que não está lá. Use o <code>docker-compose-infra.yaml</code> via scripts npm.",
      "O script <code>test:docker</code> faz <code>cd apps/alumnus</code>, caminho que não existe nesta pasta (vem de um monorepo original).",
      "O JSON de exemplo do README para o MCP está com chaves desbalanceadas e usa <code>\"type\": \"sse\"</code>, mas o container sobe com <code>-t streamable-http</code>; ajuste o tipo do cliente para streamable HTTP.",
      "O wrapper <code>package.json</code> não instala as dependências do <code>_alumnus</code>: rode <code>npm install</code> dentro dele antes de <code>npm run serve</code>. O Dockerfile do app usa pnpm via corepack.",
      "O <code>infra/README.md</code> cita <code>_alumnus/src/otel.js</code> e <code>db.js</code>, mas o código real é TypeScript (<code>monitoring/otel.ts</code>, <code>database/db.ts</code>).",
      "O <code>empty/telemetry-diagnosis-report.md</code> contém caminhos do computador do autor (<code>/Users/erickwendel/...</code>): é saída de exemplo, não algo para reproduzir idêntico.",
      "Portas 3000, 3100, 3200, 4317, 5433, 8000, 8889, 9000, 9090 e 9115 precisam estar livres; a 3000 conflita com Next/CRA.",
      "O ICMP do Blackbox exige <code>cap_add: NET_RAW</code>, e no Docker Desktop/WSL pode se comportar diferente.",
      "O README manda subir a infra com <code>pnpm alumnus:infra:up</code> (script do monorepo original); neste recorte o comando é <code>npm run docker:infra:up</code>, dentro de <code>alumnus/</code>."
     ],
     "templateVsZ": "<b>Dica:</b> comece lendo <code>docs/prompt.md</code>: ele traz o \"gabarito\" da investigação (10 passos) e o prompt único em 5 itens. Use esse formato (metrica → log → trace → causa raiz → tabela de correlação) como template para qualquer incidente."
    }
   ]
  },
  {
   "id": "D1-10",
   "bloco": "d01-b5",
   "mod": "Módulo 9 · Caps. 1 a 3",
   "emoji": "⚖️",
   "read": "12 min",
   "title": "Modelos open-source vs. proprietários — Ollama e OpenRouter",
   "short": "Baixar e rodar na sua máquina vs. acessar via API.",
   "oneliner": "Modelos <b>abertos</b> você baixa e roda na sua máquina (controle e privacidade, por sua conta e risco); modelos <b>fechados</b> você acessa via API (qualidade de ponta e zero manutenção, mas dependência). O <b>Ollama</b> roda os abertos localmente e o <b>OpenRouter</b> orquestra todos por trás de uma única API.",
   "vovo": [
    "É a diferença entre <b>cozinhar em casa</b> e <b>comer no restaurante</b>. Cozinhar em casa (aberto): controle total, ninguém vê sua receita — mas você compra o fogão, paga o gás, lava a louça e conserta quando quebra. Restaurante (fechado): só pede e come o melhor prato — mas paga a conta, come o que está no cardápio e depende de o restaurante abrir.",
    "E o <b>OpenRouter</b>? É um <b>garçom universal</b> que fala com qualquer cozinha do mundo. Em vez de dez contas em dez restaurantes, você fala com um garçom só — ele leva o pedido à cozinha certa e traz uma conta só."
   ],
   "oque": [
    "“Aberto” quase sempre = <b>open weights</b>: dá para baixar e rodar, mas sem o pipeline de treino nem a base de dados (diferente do open source tradicional). Exemplos: LLaMA 3 (Meta), Gemma (Google), GPT-OSS (OpenAI); alguns vêm marcados como “sem censura”.",
    "<b>Fechados</b> (OpenAI, Google, Anthropic): qualidade superior em benchmarks, só uma API key, escala garantida, suporte e SLA.",
    "<b>Ollama:</b> app para macOS, Windows e Linux com API HTTP; ganhou destaque a partir de julho de 2023; catálogo de modelos gerais, de código e multimodais (texto + imagem).",
    "<b>OpenRouter:</b> API unificada, compatível com o padrão OpenAI, que orquestra vários provedores e permite trocar de modelo por configuração."
   ],
   "como": [
    "<b>Abertos, vantagens:</b> custo reduzido se você já tem GPU; privacidade e controle; customização (fine-tuning, variantes); independência de fornecedor. <b>Desvantagens:</b> infraestrutura cara (GPU, refrigeração, energia, monitoramento); manutenção complexa; limitação legal (a licença do LLaMA restringe uso comercial em certos contextos); falta de filtros nos modelos “sem censura”.",
    "<b>Fechados, por que ainda fazem sentido:</b> qualidade, facilidade, escalabilidade e suporte. Hoje muitos devs usam hubs de IA que trocam o modelo conforme a tarefa, pagando só pelo que usam.",
    "<b>Ollama:</b> <code>ollama pull</code> (baixar) e <code>ollama serve</code> (rodar); local e offline, gratuito (sem tokens), integra com curl, scripts, editores e MCP; endpoints compatíveis com a OpenAI facilitam portar apps. <b>Limitação:</b> executa <b>um prompt por vez</b>, consome muito da máquina, sem alta concorrência; para produção, vLLM.",
    "<b>Parâmetros</b> (os pesos, ex.: 20B e 120B), <b>contexto</b> (tokens por vez: 32k, 128k, até 1M) e <b>quantização</b> (pesos com menos precisão: menos memória e mais velocidade, com leve perda de qualidade). A apostila usa o sufixo <code>q4f32_1</code> (pesos em 4 bits, ativações em 32) como exemplo, que permitiria rodar um 20B com 16 GB de RAM; essa grafia é a do MLC (link da aula), provavelmente não as tags do Ollama.",
    "<b>Jan AI:</b> app desktop open source, estilo ChatGPT: assistentes, histórico, banco vetorial, file system e MCP local; aceita modelos de OpenRouter, Hugging Face e Ollama e integra ao editor adicionando o Ollama como provedor.",
    "<b>OpenRouter, por quê:</b> várias APIs = várias keys, SDKs, billings e risco de vendor lock-in. <b>Recursos:</b> fallback automático, roteamento por custo ou desempenho, billing consolidado, modelos gratuitos (filtro “100% Free”), compatibilidade com a OpenAI e BYOK.",
    "<b>Começar:</b> criar conta gratuita → filtrar modelos → gerar a API key → variável de ambiente (a apostila cita <code>OPENROUTER_KEY</code>; os arquivos do repo usam <code>OPENROUTER_API_KEY</code>). Demo com Gemma 27B gratuito; também há LLaMA 2, Mistral e modelos de 4B ou 2B que rodam até no navegador. Modelos multimodais e de embeddings quase não têm opção gratuita.",
    "<b>Segurança:</b> mantenha a chave fora do Git. O OpenRouter invalida chaves vazadas automaticamente, mas não conte com isso."
   ],
   "aplica": [
    "Uso pessoal, testes, protótipo ou dados sensíveis → <b>aberto</b>, local.",
    "Empresa que exige escala, conformidade e SLA → <b>fechado</b>, via API.",
    "Vários modelos sem vendor lock-in → <b>OpenRouter</b> orquestrando."
   ],
   "pros": [
    "Aberto: custo baixo com GPU própria, privacidade, customização, sem lock-in",
    "Fechado: melhor qualidade, fácil (uma API key), escala, SLA e conformidade"
   ],
   "contras": [
    "Aberto: infra custosa, manutenção, licença (LLaMA) e “sem censura” pode ser perigoso",
    "Fechado: dependência do fornecedor, custo por token, menos controle dos dados"
   ],
   "traps": [
    "Usar Ollama em produção (um prompt por vez) — use vLLM",
    "Subir API key para o Git — mantenha as chaves fora do versionamento",
    "Ignorar restrições de licença dos modelos abertos",
    "Escolher pela “moda” e não pelo contexto técnico, financeiro e legal"
   ],
   "cola": [
    [
     "Open weights",
     "Baixar/rodar o modelo, mas sem acesso ao treino/dados"
    ],
    [
     "Ollama",
     "Roda modelos abertos localmente (pull/serve)"
    ],
    [
     "Parâmetros",
     "Pesos do modelo (ex. 20B = 20 bilhões)"
    ],
    [
     "Contexto",
     "Tokens processados por vez (32k, 128k, 1M)"
    ],
    [
     "Quantização",
     "Reduzir precisão dos pesos p/ caber em menos RAM"
    ],
    [
     "vLLM",
     "Alternativa ao Ollama para produção/alta concorrência"
    ],
    [
     "OpenRouter",
     "API unificada que orquestra múltiplos modelos"
    ],
    [
     "BYOK",
     "Usar sua própria API key no orquestrador"
    ]
   ],
   "links": [
    [
     "Ollama (catálogo)",
     "https://ollama.com/search"
    ],
    [
     "Ollama: modelos sem censura",
     "https://ollama.com/search?q=uncensored"
    ],
    [
     "Ollama: modelos de visão",
     "https://ollama.com/blog/vision-models"
    ],
    [
     "Ollama no VS Code",
     "https://docs.ollama.com/integrations/vscode"
    ],
    [
     "GPT-OSS (OpenAI)",
     "https://openai.com/index/introducing-gpt-oss/"
    ],
    [
     "vLLM (produção)",
     "https://docs.vllm.ai/en/latest/"
    ],
    [
     "Jan AI e llama.cpp server",
     "https://www.jan.ai/docs/desktop/llama-cpp-server"
    ],
    [
     "Lista de LLMs abertos",
     "https://github.com/eugeneyan/open-llms"
    ],
    [
     "OpenRouter",
     "https://openrouter.ai/"
    ],
    [
     "OpenRouter: modelos gratuitos",
     "https://openrouter.ai/models?max_price=0"
    ]
   ],
   "curso": "<b>Na aula:</b> a motivação (uma dúvida sobre um emulador de videogame que levou aos limites dos modelos populares), o Jan AI no editor e o Gemma 27B gratuito no OpenRouter. Os exemplos 10 e 11 do repo estão detalhados abaixo.",
   "codigo": [
    {
     "proj": "exemplo-10",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-10-ollama",
     "resumo": "Baixar e rodar LLMs de pesos abertos na sua máquina com o <b>Ollama</b> e consumi-los por HTTP (inclusive pela API compatível com OpenAI), comparando como um modelo \"sem censura\" e um modelo com alinhamento respondem ao mesmo pedido.",
     "fluxo": [
      "<code>ollama list</code> mostra os modelos locais; <code>ollama pull llama2-uncensored:7b</code> e <code>ollama pull gpt-oss:20b</code> baixam os pesos.",
      "O primeiro <code>curl</code> chama <code>/v1/chat/completions</code> com <code>{ model, messages: [{ role: \"user\", content }] }</code>: o mesmo formato do SDK da OpenAI, então qualquer cliente OpenAI pode apontar o <code>baseURL</code> para o Ollama.",
      "O resultado comentado no script mostra a resposta do modelo sem censura e o bloco <code>usage</code> (prompt_tokens, completion_tokens, total_tokens).",
      "O segundo <code>curl</code> chama <code>/api/generate</code> com <code>gpt-oss:20b</code> e <code>\"stream\": false</code>, extraindo com <code>jq</code> os campos <code>response</code> e <code>thinking</code>. O modelo recusa e o campo <code>thinking</code> expõe o raciocínio interno da recusa.",
      "O terceiro usa <code>\"stream\": true</code>: a resposta chega como linhas JSON (NDJSON), uma por pedaço de token."
     ],
     "rodar": [
      "<b>Rodar:</b> Instale o Ollama (ollama.com), garanta que o serviço está ativo na porta 11434 e tenha <code>curl</code> e <code>jq</code> instalados.",
      "<b>Rodar:</b> Baixe os modelos: <code>ollama pull llama2-uncensored:7b</code> e <code>ollama pull gpt-oss:20b</code>. O gpt-oss:20b é grande (dezenas de GB de disco e RAM/VRAM compatível); troque por um modelo menor se faltar recurso.",
      "<b>Rodar:</b> Rode os comandos do <code>request.sh</code> um a um (o arquivo mistura comandos e saídas comentadas; não é pensado para executar de ponta a ponta sem edição).",
      "<b>Rodar:</b> Sem chaves, sem variáveis de ambiente, custo zero por requisição.",
      "<b>Ideia:</b> Troque o <code>baseURL</code> de um cliente OpenAI (JS ou Python) para <code>http://localhost:11434/v1</code> e rode seu código existente.",
      "<b>Ideia:</b> Compare a latência e a qualidade de um modelo de 3B, 7B e 20B para a mesma pergunta.",
      "<b>Ideia:</b> Teste um modelo de visão (<code>ollama.com/blog/vision-models</code>) enviando imagem.",
      "<b>Ideia:</b> Integre o Ollama a um editor (link de integração com VS Code no README)."
     ],
     "armadilhas": [
      "O prompt de teste do script é sobre criar um \"aim bot\" (cheat) em um jogo: serve só para ilustrar a diferença de alinhamento entre modelos; não é algo para replicar.",
      "O <code>request.sh</code> tem saídas comentadas no meio e <code>curl</code> sem <code>ollama serve</code> ativo falha com \"connection refused\".",
      "<code>gpt-oss:20b</code> é pesado; sem memória suficiente o Ollama pode falhar ou ficar extremamente lento.",
      "<code>/api/generate</code> usa <code>prompt</code>; <code>/v1/chat/completions</code> usa <code>messages</code>: não misture os formatos.",
      "Os nomes de modelo e tags mudam; confira com <code>ollama list</code> e na biblioteca antes de copiar o comando."
     ],
     "templateVsZ": "<b>Dica:</b> o mais valioso deste exemplo é a compatibilidade com a API da OpenAI. Seu código que fala com um provedor na nuvem pode ser testado localmente trocando apenas a URL e o nome do modelo."
    },
    {
     "proj": "exemplo-11",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-11-openrouter",
     "resumo": "Usar o <b>OpenRouter</b> como gateway único: uma chave, uma API no formato OpenAI e centenas de modelos, inclusive gratuitos, trocando só o campo <code>model</code>.",
     "fluxo": [
      "<code>source .env</code> carrega a chave; o script define <code>OPENROUTER_SITE_URL</code> e <code>OPENROUTER_SITE_NAME</code>.",
      "O <code>curl</code> envia <code>Authorization: Bearer $OPENROUTER_API_KEY</code>, mais <code>HTTP-Referer</code> e <code>X-Title</code> (cabeçalhos opcionais do OpenRouter para identificar o app em rankings).",
      "O corpo é o JSON padrão de chat (<code>model</code>, <code>messages</code>, <code>temperature</code>, <code>max_tokens</code>), montado com aspas do shell concatenadas para injetar <code>$NLP_MODEL</code>.",
      "O JSON de resposta comentado no fim traz <code>provider</code> (\"Google AI Studio\"), <code>choices[0].message.content</code> e <code>usage</code> com <code>cost: 0</code>, <code>cost_details</code> e contadores de tokens.",
      "O mesmo padrão (baseURL do OpenRouter + cabeçalhos) reaparece em <code>config.ts</code> dos exemplos 12/13 via <code>ChatOpenAI</code> da LangChain."
     ],
     "rodar": [
      "<b>Rodar:</b> Crie uma conta em openrouter.ai e gere uma chave em <code>https://openrouter.ai/keys</code>.",
      "<b>Rodar:</b> Na pasta, crie <code>.env</code> com <code>OPENROUTER_API_KEY=sua_chave</code> (a pasta não traz <code>.env.example</code>; o <code>.gitignore</code> da raiz do repositório já ignora <code>.env</code>).",
      "<b>Rodar:</b> Tenha <code>curl</code> e <code>jq</code> e rode <code>bash request.sh</code>.",
      "<b>Rodar:</b> Modelos gratuitos: <code>https://openrouter.ai/models?max_price=0</code>. Custo: zero com <code>:free</code>, mas há limites de taxa.",
      "<b>Ideia:</b> Troque <code>NLP_MODEL</code> por outro modelo (gratuito e pago) e compare custo, latência e qualidade.",
      "<b>Ideia:</b> Peça JSON estruturado e valide a saída.",
      "<b>Ideia:</b> Faça o mesmo pedido pelo SDK OpenAI apontando <code>baseURL</code> para o OpenRouter.",
      "<b>Ideia:</b> Implemente fallback entre dois modelos quando um responder 429."
     ],
     "armadilhas": [
      "O script envia <code>Content-Type: applicaton/json</code> (typo em \"application\"); a saída de exemplo no próprio script mostra que funcionou assim, mas é um erro latente: corrija se a API reclamar do corpo.",
      "<code>.env</code> não vem no repositório: sem ele, o <code>Authorization</code> vai vazio e retorna 401.",
      "O <code>usage</code> de exemplo mostra <code>completion_tokens: 0</code> mesmo com resposta longa: contadores de modelos gratuitos podem não ser confiáveis.",
      "O corpo do <code>-d</code> é montado concatenando aspas simples do shell para injetar <code>$NLP_MODEL</code>: fácil de quebrar ao editar; prefira <code>jq -n</code> ou heredoc.",
      "Nomes de modelos gratuitos mudam com frequência; confira a lista atual.",
      "A apostila cita a variável <code>OPENROUTER_KEY</code>; o script e os exemplos 12/13 usam <code>OPENROUTER_API_KEY</code>."
     ],
     "templateVsZ": "<b>Dica:</b> o OpenRouter fala o dialeto da OpenAI, o mesmo do Ollama (exemplo 10). Com <code>baseURL</code> e <code>apiKey</code> configuráveis você alterna entre local e nuvem sem mudar o resto do código; é exatamente o que o exemplo 13 faz."
    }
   ]
  },
  {
   "id": "D1-11",
   "bloco": "d01-b5",
   "mod": "Módulo 10 · Caps. 1 a 3",
   "emoji": "🏁",
   "read": "12 min",
   "title": "RAG, embeddings e busca semântica",
   "short": "Doc de fechamento: dar à LLM o contexto certo na hora certa.",
   "oneliner": "<b>RAG (Retrieval-Augmented Generation)</b> dá à LLM um passo de <b>busca de informação relevante antes de responder</b> — em vez de confiar só na memória do treino, ela consulta uma base externa (via <b>embeddings</b> e <b>busca semântica</b>) e responde fundamentada em dados reais, atualizados e privados.",
   "vovo": [
    "Imagine um aluno inteligente numa prova. Só <b>de cabeça</b>, ele mistura as coisas ou inventa quando não lembra (a alucinação). Agora imagine que, <b>antes de escrever cada resposta</b>, ele pode consultar a <b>cola certa</b> na página exata. As respostas ficam muito mais confiáveis. <b>RAG é isso.</b>",
    "E como ele acha o trecho certo tão rápido? Com os <b>embeddings</b>: pense numa <b>biblioteca organizada por assunto</b> (não por ordem alfabética) — livros parecidos ficam na mesma prateleira. É diferente do <b>Ctrl+F</b>, que procura a palavra idêntica; a busca semântica entende que “ajustar os pesos da rede” e “backpropagation” falam da mesma coisa."
   ],
   "oque": [
    "RAG adiciona um <b>passo de recuperação externa</b> antes da geração — o contexto é injetado dinamicamente.",
    "<b>Duas memórias:</b> paramétrica (conhecimento nos <b>pesos</b>, do treino) e não-paramétrica (base externa pesquisável, com <b>índice vetorial</b>).",
    "Formalizado num paper de 2020. Resolve o problema de o transformer alucinar quando falta a informação certa no contexto."
   ],
   "como": [
    "<b>Fase 1, indexação</b> (uma vez): coletar fontes (documentos, tickets, código, tabelas, PDFs) → dividir em <b>chunks</b> coerentes → gerar um <b>embedding</b> de cada → guardar num <b>banco vetorial</b>.",
    "<b>Fase 2, consulta</b> (cada pergunta): a pergunta vira embedding → busca os mais <b>similares</b> → injeta os trechos no prompt → resposta fundamentada. Exemplo: “por que o /checkout dá erro 500?” busca runbooks, incidentes e código.",
    "<b>RAG × MCP × Fine-tuning:</b> RAG busca contexto antes de responder e não muda pesos; MCP é um <b>canal</b> de acesso a ferramentas, pode servir ao RAG mas não é método de recuperação; fine-tuning <b>ajusta os pesos</b> (memória permanente, caro e demorado). Com RAG o conhecimento vale só enquanto está no prompt.",
    "<b>Busca semântica × Ctrl+F:</b> vetores próximos = significados parecidos, mesmo sem palavras idênticas. Perguntar “como a rede ajusta os pesos?” acha trechos sobre backpropagation e gradiente descendente mesmo que esses termos não apareçam na transcrição.",
    "<b>Neo4j como vector database:</b> chunks viram <b>nós</b>, embeddings viram <b>propriedades</b>, com um índice vetorial para consulta por similaridade; metadados (título da aula, seção, minuto do vídeo) tornam as consultas mais estáveis e contextualizadas.",
    "<b>Embeddings locais:</b> com Transformer.js, em Node puro, sem chave de API e sem sobrecarregar a máquina. A apostila diz também “sem Docker”, mas o exemplo-12 do repo usa Docker Compose para subir o Neo4j.",
    "<b>Cap. 2, só “retrieval”:</b> PDF de transcrição de aula → chunks → embeddings → Neo4j → perguntas como “o que é one hot encoding?” devolvem parágrafos relevantes sem a frase exata. É o RAG sem o “G”.",
    "<b>Cap. 3, ciclo completo:</b> o projeto transforma a transcrição numa base consultável; a pergunta vira embedding, o Neo4j devolve os trechos mais próximos e o LLM gera a resposta (exemplo-13). A apostila cita metadados de minuto da aula, nome do arquivo e posição; o código do repo guarda só o <code>source</code>.",
    "<b>Lição de engenharia:</b> o modelo só é bom alimentado com dados relevantes e bem estruturados; controlar embeddings, metadados e indexação dá autonomia e controle total sobre os dados usados."
   ],
   "aplica": [
    "Responder com base em runbooks, incidentes, código e docs privados/atualizados (ex. “por que /checkout dá erro 500?”).",
    "Bases de conhecimento internas e suporte técnico fundamentado em evidência.",
    "Metadados (aula, seção, minuto do vídeo) dão consultas mais estáveis e rastreáveis."
   ],
   "pros": [
    "Respostas atualizadas, privadas e de domínio sem retreinar",
    "Reduz alucinação (contexto certo na hora certa)",
    "Metadados dão rastreabilidade; conhecimento é flexível (descartado ao fim)"
   ],
   "contras": [
    "Qualidade depende de bons chunks e boa indexação",
    "Adiciona etapa de recuperação e infra (banco vetorial)",
    "Não altera os pesos — não é memória permanente como o fine-tuning"
   ],
   "traps": [
    "Chunks mal cortados, sem sentido completo",
    "Base mal estruturada — “o modelo só é bom quando alimentado com dados relevantes e bem estruturados”",
    "Confundir RAG com fine-tuning",
    "Achar que MCP é o método de recuperação (é canal, não recuperação)"
   ],
   "cola": [
    [
     "RAG",
     "Buscar contexto relevante antes de gerar a resposta"
    ],
    [
     "Memória paramétrica",
     "Conhecimento nos pesos (do treino)"
    ],
    [
     "Memória não paramétrica",
     "Base externa pesquisável (índice vetorial)"
    ],
    [
     "Chunk",
     "Pedaço coerente de texto"
    ],
    [
     "Embedding",
     "Vetor numérico que representa o significado"
    ],
    [
     "Banco vetorial",
     "Armazena embeddings para busca por similaridade"
    ],
    [
     "Busca semântica",
     "Buscar por significado, não por palavra exata"
    ],
    [
     "Fine-tuning",
     "Ajustar os pesos do modelo (permanente, caro)"
    ],
    [
     "Top-K (retrieval)",
     "Quantos trechos mais próximos voltam da busca"
    ],
    [
     "Transformer.js",
     "Biblioteca que gera embeddings localmente em JS"
    ]
   ],
   "tip": "<b>A grande lição da disciplina:</b> a espinha dorsal de tudo é <b>representar dados como números, deixar o modelo aprender padrões e dar a ele o contexto certo na hora certa.</b>",
   "links": [
    [
     "Paper original de RAG (2020)",
     "https://arxiv.org/pdf/2005.11401"
    ],
    [
     "Neo4j",
     "https://neo4j.com/"
    ],
    [
     "Embeddings com Transformers.js (LangChain)",
     "https://docs.langchain.com/oss/javascript/integrations/text_embedding/transformers"
    ],
    [
     "LangChain (JS)",
     "https://docs.langchain.com/oss/javascript/langchain/overview"
    ]
   ],
   "curso": "<b>exemplo-12-embeddings-neo4j</b>: gerar/armazenar embeddings no Neo4j e buscar por similaridade · <b>exemplo-13-embeddings-neo4j-rag</b>: o primeiro RAG completo — PDF → chunks → embeddings (Transformer.js) → Neo4j → consulta semântica, integrando com LangChain.",
   "codigo": [
    {
     "proj": "exemplo-12",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-12-embeddings-neo4j",
     "resumo": "Transformar um PDF em vetores (embeddings gerados localmente no Node), guardá-los no <b>Neo4j</b> e fazer <b>busca semântica</b> por similaridade, a metade \"retrieval\" de um RAG.",
     "fluxo": [
      "<code>config.ts</code> centraliza tudo em <code>CONFIG</code> (congelado): conexão Neo4j (<code>indexName: \"tensors_index\"</code>, <code>nodeLabel: \"Chunk\"</code>, <code>textNodeProperties: [\"text\"]</code>), PDF, <code>textSplitter</code> (<code>chunkSize: 1000</code>, <code>chunkOverlap: 200</code>), modelo de embedding (<code>EMBEDDING_MODEL</code>, dtype <code>fp32</code>) e <code>similarity.topK: 3</code>.",
      "<code>DocumentProcessor.loadAndSplit()</code> usa <code>PDFLoader</code> para ler as páginas e <code>RecursiveCharacterTextSplitter</code> para quebrar em chunks; mantém só <code>metadata.source</code>.",
      "<code>HuggingFaceTransformersEmbeddings</code> carrega o modelo localmente (o <code>.env.example</code> sugere <code>Xenova/all-MiniLM-L6-v2</code>, baixado no primeiro uso): não há chamada de API para embeddings.",
      "<code>Neo4jVectorStore.fromExistingGraph(embeddings, CONFIG.neo4j)</code> conecta e prepara o índice vetorial.",
      "O script limpa os nós <code>Chunk</code> (<code>MATCH (n:Chunk) DETACH DELETE n</code>) e adiciona os documentos um a um com <code>addDocuments</code>, gerando o embedding de cada chunk.",
      "Para cada uma das 6 perguntas fixas, <code>similaritySearch(question, topK)</code> devolve os 3 trechos mais próximos; <code>util.ts</code> (<code>displayResults</code>) imprime o texto resumido a 200 caracteres.",
      "No <code>finally</code>, <code>vectorStore.close()</code> encerra a conexão com o Neo4j."
     ],
     "rodar": [
      "<b>Rodar:</b> Requer Node 22.13+ (type stripping), Docker e Docker Compose.",
      "<b>Rodar:</b> <code>npm ci</code>, depois <code>npm run infra:up</code> (<code>docker-compose up -d --wait</code>) para subir o Neo4j; <code>npm run infra:down</code> remove containers e volumes.",
      "<b>Rodar:</b> Crie <code>.env</code> a partir do <code>.env.example</code> do template: <code>NEO4J_URI=bolt://localhost:7687</code>, <code>NEO4J_USER=neo4j</code>, <code>NEO4J_PASSWORD=password</code> e <code>EMBEDDING_MODEL=Xenova/all-MiniLM-L6-v2</code>. A pasta final não traz <code>.env.example</code> mas o script exige <code>.env</code> (<code>--env-file .env</code>).",
      "<b>Rodar:</b> <code>npm start</code> (ou <code>npm run dev</code> com watch). O modelo de embedding é baixado do Hugging Face na primeira execução.",
      "<b>Rodar:</b> As variáveis <code>OPENROUTER_*</code> e <code>NLP_MODEL</code> do <code>.env.example</code> não são usadas neste exemplo (só no 13).",
      "<b>Rodar:</b> Neo4j Browser em <code>http://localhost:7474</code> para inspecionar os nós <code>Chunk</code>.",
      "<b>Ideia:</b> Mude <code>chunkSize</code>/<code>chunkOverlap</code> e observe como os resultados mudam.",
      "<b>Ideia:</b> Troque <code>EMBEDDING_MODEL</code> por outro modelo e compare a qualidade da recuperação.",
      "<b>Ideia:</b> Use <code>similaritySearchWithScore</code> para ver as distâncias e definir um limiar.",
      "<b>Ideia:</b> Indexe seu próprio PDF e faça perguntas do seu domínio.",
      "<b>Ideia:</b> Visualize no Neo4j Browser as propriedades <code>text</code> e <code>embedding</code> dos nós."
     ],
     "armadilhas": [
      "<code>clearAll(...)</code> é chamado <b>sem <code>await</code></b> em <code>index.ts</code>: a deleção roda concorrente com as inserções e pode apagar nós recém-criados ou deixar dados antigos. O correto seria <code>await clearAll(...)</code>.",
      "O template tem <code>index.ts</code> vazio e o script <code>start</code> falha sem <code>.env</code> (<code>node --env-file .env</code>).",
      "A pasta final não tem <code>.env.example</code>; ele só existe no template.",
      "<code>documentProcessor.ts</code> importa <code>langchain/text_splitter</code>, mas <code>langchain</code> não está no <code>dependencies</code> do <code>package.json</code>: resolve via dependência transitiva do lockfile; se faltar, instale <code>langchain</code>.",
      "<code>npm run infra:up</code> usa o binário <code>docker-compose</code> (v1); em instalações só com o plugin <code>docker compose</code> falha.",
      "O compose cria <code>./neo4j/data</code>, <code>logs</code>, <code>plugins</code> e <code>./import</code> na pasta (adicione ao <code>.gitignore</code>). No Linux, pode haver problema de permissão nesses volumes.",
      "Reexecutar sem a limpeza correta pode duplicar chunks e repetir resultados.",
      "<code>@xenova/transformers</code> e <code>@huggingface/transformers</code> convivem no <code>package.json</code>; o código do projeto só importa tipos do segundo; o <code>@xenova/transformers</code> parece sobra de versão anterior.",
      "O script tem <code>console.log</code> no lugar de logger estruturado: ok para aula, não para produção.",
      "O <code>documentProcessor.ts</code> descarta o metadata e mantém só <code>source</code>; por isso o <code>displayResults</code>, que tenta imprimir <code>metadata.pageNumber</code>, nunca mostra a página. Para citar fonte e página é preciso preservar o metadata.",
      "A apostila diz que os embeddings locais dispensam Docker, mas o Neo4j deste exemplo sobe por <code>docker-compose</code>."
     ],
     "templateVsZ": "<b>Template vs final:</b> o template entrega a infraestrutura pronta (config, util, docker, PDF) para você escrever <code>documentProcessor.ts</code> e <code>index.ts</code> durante a aula; o <code>script.txt</code> lista o roteiro (config.js, util.js, package.json, docker-compose, PDF; depois documentProcessor, embeddings, VectorStoreManager e index). O <code>package.json</code> e o <code>config.ts</code> são idênticos nos dois."
    },
    {
     "proj": "exemplo-13",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-13-embeddings-neo4j-rag",
     "resumo": "Fechar o ciclo do <b>RAG</b>: recuperar trechos relevantes no Neo4j (exemplo 12) e entregá-los como contexto a um LLM (OpenRouter) para gerar respostas fundamentadas no documento.",
     "fluxo": [
      "<code>index.ts</code> repete a ingestão do exemplo 12 (PDF → chunks → embeddings → Neo4j) e instancia <code>ChatOpenAI</code> com temperatura 0.3, <code>maxRetries: 2</code> e cabeçalhos <code>HTTP-Referer</code>/<code>X-Title</code> vindos da config.",
      "<code>config.ts</code> acrescenta ao do exemplo 12 a leitura síncrona de <code>prompts/answerPrompt.json</code> e <code>prompts/template.txt</code> e a pasta de saída <code>./respostas</code>.",
      "<code>class AI</code> (<code>ai.ts</code>) monta uma <code>RunnableSequence</code> com dois passos: <code>retrieveVectorSearchResults</code> e <code>generateNLPResponse</code>.",
      "Retrieval: <code>similaritySearchWithScore(question, topK)</code>. Se não vier nada, devolve <code>error</code> (\"não encontrei informações relevantes\"). Senão, filtra <code>score &gt; 0.5</code> e junta os <code>pageContent</code> com <code>\\n\\n---\\n\\n</code> como <code>context</code>.",
      "Generation: <code>ChatPromptTemplate.fromTemplate(templateText)</code> → <code>.pipe(nlpModel)</code> → <code>.pipe(new StringOutputParser())</code>, preenchendo role, task, tone, language, format, as instruções numeradas, a pergunta e o contexto.",
      "O prompt manda usar APENAS o contexto fornecido e dizer quando não houver informação suficiente, o que ancora a resposta e reduz alucinação.",
      "Para cada pergunta, <code>index.ts</code> imprime a resposta e grava em <code>respostas/resposta-&lt;índice&gt;-&lt;timestamp&gt;.md</code>."
     ],
     "rodar": [
      "<b>Rodar:</b> Pré-requisitos do exemplo 12 (Node 22.13+, Docker) mais uma chave do OpenRouter (<code>https://openrouter.ai/keys</code>).",
      "<b>Rodar:</b> Crie <code>.env</code> com <code>NEO4J_URI</code>, <code>NEO4J_USER</code>, <code>NEO4J_PASSWORD</code>, <code>EMBEDDING_MODEL</code>, <code>OPENROUTER_API_KEY</code>, <code>NLP_MODEL</code>, <code>OPENROUTER_SITE_URL</code> e <code>OPENROUTER_SITE_NAME</code> (modelo de referência: o <code>.env.example</code> do <code>exemplo-12-embeddings-neo4j-template</code>).",
      "<b>Rodar:</b> <code>npm ci</code>, <code>npm run infra:up</code> e <code>npm start</code>. As respostas aparecem no terminal e em <code>respostas/</code>.",
      "<b>Rodar:</b> Custo: zero com modelo <code>:free</code> do OpenRouter (sujeito a limites de taxa); embeddings rodam localmente.",
      "<b>Ideia:</b> Pergunte algo que não está no PDF e confirme se o modelo admite que não sabe.",
      "<b>Ideia:</b> Varie o limiar <code>score &gt; 0.5</code> e o <code>topK</code> e meça qualidade.",
      "<b>Ideia:</b> Adicione citação de fonte (página) nas respostas usando os metadados.",
      "<b>Ideia:</b> Troque o modelo (gratuito vs pago) e compare as saídas salvas em <code>respostas/</code>.",
      "<b>Ideia:</b> Substitua o <code>RunnableSequence</code> por um fluxo com reescrita da pergunta antes do retrieval."
     ],
     "armadilhas": [
      "Mesma armadilha do exemplo 12: <code>clearAll(...)</code> sem <code>await</code> antes de inserir os documentos.",
      "O filtro <code>score &gt; 0.5</code> pode zerar o <code>context</code> sem gerar <code>error</code> (o erro só dispara quando a busca volta vazia); o LLM recebe contexto vazio e responde mesmo assim.",
      "O prompt de sistema pede \"use APENAS o contexto\", mas nada valida isso: modelos podem ignorar.",
      "Sem <code>.env</code> (o repositório não traz <code>.env.example</code> nesta pasta), o <code>--env-file .env</code> falha e <code>OPENROUTER_API_KEY</code> fica indefinida (401).",
      "O <code>respostas/</code> já vem com saídas commitadas; as suas gravam arquivos novos com timestamp e vão sujar o git.",
      "A pasta <code>respostas/</code> traz dois arquivos de índice 0 (timestamps diferentes, execuções diferentes) e a pergunta \"O que são tensores...\" está comentada em <code>questions</code>: o índice no nome do arquivo é a posição na lista, não um id estável.",
      "Um <code>for...in</code> sobre <code>questions</code> faz <code>index</code> ser string; funciona no nome do arquivo, mas é um deslize de tipagem.",
      "Resposta de modelo gratuito pode vir truncada ou variar muito entre execuções, mesmo com temperatura 0.3.",
      "Como o metadata é reduzido a <code>source</code> (mesmo <code>documentProcessor.ts</code> do exemplo 12), a ideia de citar página nas respostas exige antes mudar o processador."
     ],
     "templateVsZ": "<b>Dica:</b> compare <code>index.ts</code> do 12 e do 13 com <code>diff</code>. A diferença é só o LLM e o <code>AI</code>: a ingestão é idêntica. Para entender o RAG, leia <code>ai.ts</code> (50 linhas) e depois <code>prompts/template.txt</code>."
    }
   ]
  }
 ]
});
