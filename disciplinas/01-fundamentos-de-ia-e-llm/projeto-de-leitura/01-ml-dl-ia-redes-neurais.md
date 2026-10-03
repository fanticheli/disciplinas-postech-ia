# 01 · Machine Learning, Deep Learning e IA — a base de tudo

> **Módulo 2 da disciplina (Caps. 1 a 5)** · Leitura: ~11 min · Pré-requisito: nenhum

## 🎯 Em uma frase
**Inteligência Artificial** é o guarda-chuva de qualquer sistema que resolve tarefas "inteligentes"; **Machine Learning** é o pedaço que aprende com exemplos em vez de regras escritas à mão; e **Deep Learning** é o ML turbinado com **redes neurais** de muitas camadas.

---

## 👵 Explicando para a vovó

Imagine que a senhora quer ensinar alguém a reconhecer se uma fruta é uma laranja.

- **Jeito antigo (programação tradicional):** a senhora escreve uma lista de regras — "se for redonda E laranja E do tamanho de um punho, é laranja". O problema? Uma tangerina quebra a regra, uma laranja verde quebra a regra, uma foto com sombra quebra a regra. A senhora nunca termina de escrever exceções.
- **Machine Learning:** em vez de regras, a senhora mostra **mil fotos** de laranjas e mil de outras frutas, dizendo "isto é laranja, isto não é". A criança sozinha descobre o padrão. Da próxima vez que vê uma fruta nova, ela chuta certo — mesmo sem a senhora nunca ter dito a regra.
- **Deep Learning:** é a mesma ideia, mas com um "cérebro" de várias camadas. A primeira camada só enxerga bordas e cores; a próxima junta isso em formas; a próxima reconhece "textura de casca"; e a última decide "laranja". Cada camada enxerga algo um pouquinho mais abstrato — como uma linha de montagem onde cada funcionário faz uma parte do julgamento.

E o "neurônio artificial"? É só uma **mini calculadora**: recebe números, faz uma continha e passa o resultado adiante. Junte milhares delas e você tem uma rede que aprende. Apesar do nome, **não é um cérebro** — é matemática e estatística com nomes bonitos.

> 🧠 A grande sacada: a máquina **não decora** os exemplos, ela **generaliza**. Depois de ver laranjas suficientes, acerta em laranjas que nunca viu.

---

## 🔧 Tecnicamente

### A hierarquia dos termos
- **IA (Inteligência Artificial):** qualquer algoritmo que executa tarefas que "exigiriam inteligência". Nomenclatura inspirada no cérebro ("neurônios", "redes"), mas os mecanismos são matemáticos/estatísticos.
- **ML (Machine Learning):** subárea da IA. Substitui **regras manuais** por **modelos que aprendem padrões a partir de dados**. Ganha em flexibilidade, escalabilidade e adaptabilidade.
- **DL (Deep Learning):** especialização do ML que usa **redes neurais profundas** (muitas camadas ocultas). Cada camada empilhada aprende representações progressivamente mais abstratas — daí resolver bem visão, voz e movimento.

> 💡 Exemplo real da apostila: detectar gestos de braço num smartwatch. A abordagem *baseada em regras* (calibrar sensores, ajustar limiares) sofria com falsos positivos. Com DL, basta **coletar exemplos rotulados** de movimentos e treinar — o modelo aprende os padrões temporais sozinho.

### Transfer learning e o Pac-Man
O Pac-Man controlado com a cabeça usa **transfer learning**: parte-se de um modelo já treinado para reconhecer rostos e refina-se com poucos exemplos dos movimentos que você define (cima, baixo, esquerda, direita). O treino acontece no navegador, em tempo real, via TensorFlow.js. A mesma biblioteca permite portar para o navegador ou o Node.js modelos treinados em Python.

### Teachable Machine: treinar sem código
Ferramenta gratuita do Google que treina classificadores de **imagem, áudio ou webcam** direto no navegador e exporta para TensorFlow.js, Node.js, P5.js, Arduino ou um HTML pronto (com webcam) para uso em projetos. Na primeira demo: três classes (garrafa, controle remoto, relógio), com amostras em ângulos e iluminações diferentes; o modelo acertou mesmo com os objetos rotacionados ou fora do centro. Na segunda: ~8 mil fotos de raças de cachorro do Kaggle, já separadas em treino, validação e teste, enviadas em pastas (uma por raça). Testar com o conjunto de teste, nunca visto, demonstra **generalização**; para imagens fora do treino, o modelo indica a classe mais próxima por similaridade. Em projetos reais, scripts de upload massivo automatizam o processo. Desafio da aula: escolher uma base no Kaggle e treinar um modelo próprio.

### Como uma rede neural funciona por dentro
Uma rede é composta por três tipos de camada:

1. **Camada de entrada** — recebe os dados já convertidos em números.
2. **Camadas ocultas** — cada neurônio combina os valores recebidos, aplica **pesos** e uma **função de ativação** (ex.: ReLU), e emite um novo valor. Cada camada funciona como um filtro que extrai padrões mais abstratos.
3. **Camada de saída** — cada neurônio representa uma categoria possível; a rede devolve uma **probabilidade** por categoria (ex.: via *Softmax*).

**Treinar** = mostrar muitos exemplos rotulados e ajustar os **pesos** das conexões para reduzir o erro. O ciclo compara a saída gerada com o rótulo correto (a **loss**) e corrige os pesos, repetindo por várias **epochs** até atingir precisão aceitável.

### Do objeto ao tensor (o pré-processamento que ninguém vê, mas decide tudo)
Frameworks como o **TensorFlow.js** não entendem objetos — só **tensores** (vetores/matrizes de números). Então todo dado vira número:

- **Normalização** — valores contínuos (ex.: idade de 15 a 45) são escalados para o intervalo `0–1`, para nenhuma feature dominar por causa da escala. Fórmula padrão: `(valor - min) / (max - min)`.
- **One-hot encoding** — categorias (cor, cidade) viram vetores binários: só a posição correspondente recebe `1`, o resto `0`. Evita que o modelo interprete categorias como se tivessem ordem numérica.

### A primeira rede neural (Caps. 4 e 5)
Node.js 22 com TensorFlow.js, três pessoas (Eric, Ana e Carlos) com idade, cor e cidade, classificadas em Premium, Medium e Basic. São 7 atributos (1 idade normalizada + 3 cores + 3 cidades) e rótulos one-hot. Arquitetura: camada oculta de **80 neurônios com ReLU** (número escolhido empiricamente, por haver pouca base de treino), saída de **3 neurônios com Softmax** (probabilidades normalizadas). Compilação: otimizador **Adam** (ajusta os pesos pelo histórico de erros e acertos) e loss **Categorical Cross Entropy** (padrão para classificação). Treino: **100 epochs**, `shuffle: true` e um callback que loga a loss por epoch, que começa alta e cai rápido.

No teste, um aluno novo ("Zé": verde, Curitiba, 28 anos) é normalizado com o mesmo min/max do treino, `(28 - 25) / (40 - 25) = 0.2`, e convertido com `tf.tensor2d`. Primeira execução: Premium 8%, Medium 13%, **Basic 77%** (parecido com o Carlos). Testes de sensibilidade: trocar a cidade para São Paulo levou Premium a **42%** (o Eric, Premium, também é de São Paulo); trocar a cor para azul subiu Premium a **90%**. Combinações nunca vistas ainda recebem uma categoria, mas com confiança menor e distribuição mais equilibrada: por isso a base precisa ser rica e variada. Para exibir, o código ordena e mapeia as categorias por probabilidade decrescente.

### Por que quantidade e diversidade de dados importam
Um modelo robusto precisa de exemplos **variados e representativos**. A apostila cita um sensor do Google (grafado "LEM"; a referência da aula é o **SensorLM**, do Google Research) treinado com **+60 milhões de horas** de dados para detectar variações de batimento e temperatura. Regra prática: *mais dados + mais diversidade = melhor generalização.*

### E o ChatGPT, onde entra?
A apostila resume que o ChatGPT **combina vários modelos de ML especializados**: ao interpretar sua pergunta, o sistema entende a intenção e direciona o processamento para o modelo mais adequado, de forma transparente. Trate como simplificação didática: o núcleo é um LLM baseado em Transformer, explicado no doc [05](./05-como-funcionam-llms.md).

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| **IA** | Guarda-chuva de qualquer sistema "inteligente" |
| **Machine Learning** | Aprende padrões com dados em vez de regras manuais |
| **Deep Learning** | ML com redes neurais de muitas camadas |
| **Neurônio artificial** | Mini calculadora: combina entradas, aplica peso + ativação |
| **Peso** | Quanto cada conexão influencia o resultado (o que é "aprendido") |
| **Tensor** | Estrutura numérica (vetor/matriz) que o modelo processa |
| **Normalização** | Escalar números para `0–1` |
| **One-hot encoding** | Transformar categorias em vetores binários |
| **ReLU / Softmax** | Ativação que só passa valores positivos / saída em probabilidades que somam 1 |
| **Adam** | Otimizador que ajusta os pesos pelo histórico de erros e acertos |
| **Categorical cross entropy** | Loss para classificação com uma classe certa entre várias |
| **Epoch** | Uma passada completa por todos os dados de treino |
| **Loss** | O quão longe a previsão está da resposta certa |
| **Generalização** | Acertar em dados nunca vistos |
| **Transfer learning** | Reaproveitar um modelo já treinado e refiná-lo com poucos dados |

---

## 💻 No código do repo

**Demos do curso (sem código no repo):**
- **Teachable Machine (Google):** classificador de imagens sem escrever código, usando a webcam (garrafa, controle, relógio) e depois uma base do Kaggle com ~8 mil fotos de raças de cachorro. Demonstra **generalização** e **transfer learning**.
- **Pac-Man controlado com o rosto:** modelo treinado com poucos exemplos que interpreta gestos faciais em tempo real, 100% no navegador via TensorFlow.js (transfer learning sobre um modelo de reconhecimento facial).

**`exemplo-00` · Primeira rede neural (Node.js + TensorFlow.js)**

- **Objetivo:** classificar pessoas em `premium / medium / basic` a partir de idade, cor preferida e cidade. É o "hello world" de tensores, normalização, one-hot e treino.
- **Stack:** um único `index.js` e uma dependência, `@tensorflow/tfjs-node` 4.22. Dataset de brinquedo com 3 pessoas (Erick, Ana, Carlos), já codificadas em vetores de 7 posições: `[idade_normalizada, azul, vermelho, verde, São Paulo, Rio, Curitiba]`; rótulos one-hot `[premium, medium, basic]`.
- **Fluxo (`index.js`):**
  1. Os arrays viram tensores com `tf.tensor2d` (`inputXs`, `outputYs`).
  2. `trainModel` monta um `tf.sequential()`: `dense` de 80 unidades ReLU (`inputShape: [7]`) e `dense` de 3 unidades softmax.
  3. `model.compile` com `adam`, `categoricalCrossentropy` e `accuracy`; `model.fit` com `epochs: 100`, `shuffle: true`, `verbose: 0`.
  4. `predict(model, pessoa)` devolve as 3 probabilidades, ordenadas e impressas (ex.: `premium (xx.xx%)`). A pessoa de teste, "zé", tem idade 28 normalizada com o mesmo min/max do treino: `(28 - 25) / (40 - 25) = 0.2`.
- **Template vs z:** o `-template` só monta e imprime os tensores (`inputXs.print()`), a "aula 1": a rede só enxerga números. O `-z` acrescenta `trainModel` e `predict`. O `package.json` é idêntico.
- **Como rodar:** `cd exemplo-00-z && npm install && npm start` (`node --no-warnings --watch index.js`; cada save retreina do zero). Sem variáveis de ambiente; exige toolchain para compilar o módulo nativo.
- **Armadilhas e achados:**
  - O `package.json` declara `"types": "module"` (o correto seria `"type"`); o ESM em `.js` só funciona pela detecção automática de módulo ES em Node recente.
  - No z, o "zé" está descrito como verde/Curitiba no objeto, mas o vetor usado (`[0.2, 1, 0, 0, 0, 1, 0]`) é azul/Rio: a predição reflete o vetor.
  - `tfjs-node` pode falhar na instalação em Node muito novo ou Windows sem build tools (erro mais comum da aula).
  - Com `--watch`, as probabilidades mudam a cada execução: os pesos iniciais são aleatórios.
  - 3 amostras não generalizam: o resultado é ilustrativo.
  - A apostila diz que a métrica de desempenho é a própria loss; o código usa `metrics: ["accuracy"]` (com `verbose: 0`, nada é impresso por epoch).
  - A narrativa da aula (Zé verde/Curitiba = 77% Basic; São Paulo = 42% Premium; azul = 90%) é descrita na apostila; o vetor do repo está fixo em azul/Rio, então a saída do script não reproduz esses números.
- **Exercícios:** aumentar o dataset e ver overfitting; reativar `onEpochEnd` e plotar a loss; testar `units` 8/80/400; trocar ReLU por sigmoid; usar `validationSplit`.
- **Código:** [template](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-00-template) · [z, resolvido](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-00-z)

---

## 🔗 Para ir além
- Anatomia de uma rede neural — https://www.notablecap.com/blog/the-anatomy-of-a-neural-network
- CNN Explainer (visualização interativa) — https://poloclub.github.io/cnn-explainer/
- Teachable Machine — https://teachablemachine.withgoogle.com/
- Dataset de raças de cachorro (Kaggle) — https://www.kaggle.com/datasets/gpiosenka/70-dog-breedsimage-data-set
- Kaggle (datasets e competições) — https://kaggle.com/
- Pac-Man com transfer learning (demo) — https://storage.googleapis.com/tfjs-examples/webcam-transfer-learning/dist/index.html
- SensorLM / dados de wearables (Google Research) — https://research.google/blog/sensorlm-learning-the-language-of-wearable-sensors/
