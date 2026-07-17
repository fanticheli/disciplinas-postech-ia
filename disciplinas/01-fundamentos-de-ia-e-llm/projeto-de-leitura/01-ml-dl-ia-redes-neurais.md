# 01 · Machine Learning, Deep Learning e IA — a base de tudo

> **Módulo 2 da disciplina** · Leitura: ~9 min · Pré-requisito: nenhum

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

### Por que quantidade e diversidade de dados importam
Um modelo robusto precisa de exemplos **variados e representativos**. A apostila cita o sensor **LEM do Google**, treinado com **+60 milhões de horas** de dados para detectar variações de batimento e temperatura. Regra prática: *mais dados + mais diversidade = melhor generalização.*

### E o ChatGPT, onde entra?
Modelos como o ChatGPT **combinam vários modelos de ML especializados**. Ao interpretar sua pergunta, o sistema entende a intenção e direciona o processamento para o modelo mais adequado — de forma transparente. (O detalhe de *como* isso funciona por dentro está no doc [05](./05-como-funcionam-llms.md).)

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
| **Epoch** | Uma passada completa por todos os dados de treino |
| **Loss** | O quão longe a previsão está da resposta certa |
| **Generalização** | Acertar em dados nunca vistos |
| **Transfer learning** | Reaproveitar um modelo já treinado e refiná-lo com poucos dados |

---

## 💻 No curso

- **Teachable Machine (Google):** treinar um classificador de imagens **sem escrever código**, usando a webcam (garrafa, controle, relógio) e depois uma base do Kaggle com ~8 mil fotos de raças de cachorro. Demonstra **generalização** e **transfer learning** na prática.
- **Pac-Man controlado com o rosto:** modelo treinado com poucos exemplos que interpreta gestos faciais em tempo real, 100% no navegador via TensorFlow.js (usa transfer learning sobre um modelo de reconhecimento facial).
- **Primeira rede neural (Node.js + TensorFlow.js):** classificar alunos em `Premium / Medium / Basic` a partir de idade, cor preferida e localização. Arquitetura: camada oculta com 80 neurônios (ReLU) + saída de 3 neurônios (Softmax); otimizador **Adam**, loss **Categorical Cross Entropy**, 100 epochs. Mostra o ciclo completo: dados → tensores → treino → predição.

---

## 🔗 Para ir além
- Anatomia de uma rede neural — https://www.notablecap.com/blog/the-anatomy-of-a-neural-network
- CNN Explainer (visualização interativa) — https://poloclub.github.io/cnn-explainer/
- Teachable Machine — https://teachablemachine.withgoogle.com/
- Kaggle (datasets e competições) — https://kaggle.com/
- SensorLM / dados de wearables (Google Research) — https://research.google/blog/sensorlm-learning-the-language-of-wearable-sensors/
