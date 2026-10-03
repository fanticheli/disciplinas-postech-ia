# 04 · Algoritmos Genéticos e Aprendizado por Reforço

> **Módulo 5 (Cap. 1) da disciplina** · Leitura: ~9 min · Pré-requisito: doc [01](./01-ml-dl-ia-redes-neurais.md)

## 🎯 Em uma frase
São dois jeitos de a IA **descobrir soluções sozinha** quando ninguém sabe a resposta certa: **algoritmos genéticos** imitam a evolução natural (evoluem uma população inteira de tentativas), e **aprendizado por reforço** imita o adestramento (um agente aprende por tentativa, erro e recompensa).

---

## 👵 Explicando para a vovó

Lembra de quando a senhora cruzava suas roseiras pra tentar uma flor mais bonita? Pegava as duas plantas mais fortes, cruzava, e da nova geração escolhia de novo as melhores. Depois de várias gerações, saía uma rosa que a senhora nunca conseguiria "desenhar" na mão. **Isso é um algoritmo genético.** A IA cria centenas de "tentativas", deixa competir, guarda as melhores, mistura elas (crossover) e joga uma pitadinha de novidade aleatória (mutação). Repete isso muitas vezes e vai surgindo uma solução cada vez melhor — sem ninguém nunca ter ensinado a receita.

E o **aprendizado por reforço** é como adestrar o cachorro com petisco: ele senta certo, ganha petisco; faz bagunça, não ganha nada. Com o tempo, ele aprende sozinho o que dá recompensa. No jogo da cobrinha, a IA ganha ponto quando come a fruta e perde quando bate na parede — e vai ficando boa no jogo só por essas recompensas e castigos.

> 🌱 A diferença: o genético é como **criar várias plantas ao mesmo tempo e ficar com as melhores**. O reforço é como **treinar um único bichinho, passo a passo**.

---

## 🔧 Tecnicamente

### Algoritmos genéticos
Inspirados na evolução biológica. Em vez de aprender sequencialmente, trabalham com uma **população de soluções candidatas**. O ciclo:

1. **Avaliação** — cada indivíduo recebe uma nota (fitness) segundo um critério (ex.: qual carro andou mais longe e mais rápido).
2. **Seleção** — os melhores indivíduos são escolhidos para reproduzir.
3. **Crossover (cruzamento)** — combinam-se características dos melhores para gerar filhos.
4. **Mutação** — pequenas alterações aleatórias são introduzidas em cada nova geração.

Repete-se por várias gerações. O resultado costuma ser **criativo e inesperado** — carros com formas estranhas que nenhum humano projetaria, mas que funcionam muito bem, porque a evolução prioriza **desempenho, não estética**.

**O exemplo da apostila:** você é um inventor tentando criar a melhor roda para um carro. Gera vários carros com formas e tamanhos diferentes e os coloca numa pista; os que andam mais longe, mais rápido e com mais estabilidade são os melhores. Mistura as características deles, gera a nova geração e repete, com pequenas mutações a cada rodada. Em simuladores no navegador dá para acompanhar os resultados melhorando geração a geração, sem nenhuma instrução direta de como fazer. Parâmetros como taxa de mutação, gravidade e formato do terreno podem ser ajustados.

**A taxa de mutação é o parâmetro crítico:**

| Taxa de mutação | Efeito |
|-----------------|--------|
| Muito alta | Resultados imprevisíveis e ineficazes (exploração demais) |
| Muito baixa | Estagnação, sem inovação |
| Equilibrada | Explora novas possibilidades sem perder o que já funciona |

### Aprendizado por Reforço (RL)
Um **agente** toma **decisões sequenciais** para **maximizar uma recompensa acumulada** ao longo do tempo. Aprende por tentativa e erro: recompensado por acertos, penalizado por erros. Cada movimento gera uma pontuação, e ele ajusta o comportamento a partir dela.

> 🧭 **Complemento (fora da apostila):** em RL o dilema clássico é *explorar* ações novas versus *aproveitar* o que já dá recompensa. Nos genéticos, a mutação cumpre papel parecido: sem ela a população estagna.

> 💡 Contraste importante com o módulo anterior: na IA que jogava Duck Hunt (doc [03](./03-visao-computacional-yolo.md)), **não havia aprendizado de verdade** — só reconhecimento de objetos. No RL, o agente **realmente aprende** a estratégia de vencer.

### A diferença central entre os dois
| | Algoritmos Genéticos | Aprendizado por Reforço |
|---|---|---|
| Unidade de trabalho | População inteira de candidatos | Um agente |
| Como aprende | Evolução: avaliar, cruzar, mutar | Decisões passo a passo |
| Foco | Evoluir candidatos simultaneamente | Maximizar recompensa acumulada |

### Aplicações no mundo real
Vão muito além de jogos: engenharia, logística, design de circuitos, otimização de processos. A apostila cita IAs que aprenderam a **estacionar sozinhas** (inclusive fazendo baliza com *drift*) e a jogar o **dino do Chrome**, pulando obstáculos sem nenhuma instrução direta (caso apresentado numa conferência no Brasil, com algoritmo genético).

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| **População** | Conjunto de soluções candidatas avaliadas em paralelo |
| **Fitness** | Nota que mede quão boa é uma solução |
| **Crossover** | Cruzar características dos melhores indivíduos |
| **Mutação** | Alteração aleatória para introduzir novidade |
| **Geração** | Uma rodada completa de avaliação + reprodução |
| **Agente (RL)** | Entidade que toma decisões buscando recompensa |
| **Recompensa** | Sinal numérico de acerto/erro que guia o aprendizado |
| **Decisão sequencial** | Escolhas encadeadas ao longo do tempo |

---

## 💻 No curso
- **Simuladores no navegador:** carros genéticos evoluindo geração a geração (`genetic_cars_2`), aprendizado por reforço com cart-pole, mountain car e jogo da velha, tudo em TensorFlow.js.
- **Jogo da cobrinha (SnakeAI)** como exemplo clássico de RL — pontuação por comer fruta, penalização por colidir.
- Exploração livre de **parâmetros** (taxa de mutação, gravidade, formato do terreno) para observar o impacto na evolução.

---

## 🔗 Para ir além
- Genetic Cars (simulador) — https://rednuht.org/genetic_cars_2/
- Neuroevolution com TensorFlow.js (ensinar carros a dirigir) — https://medium.com/codesphere-cloud/teaching-cars-to-drive-with-neuroevolution-tensorflow-and-500-lines-of-javascript-57888956322e
- Cart-pole (RL no navegador) — https://storage.googleapis.com/tfjs-examples/cart-pole/dist/index.html
- SnakeAI — https://github.com/jonatan5524/SnakeAI
- RL no navegador (introdução) — https://medium.com/@pierrerouhard/reinforcement-learning-in-the-browser-an-introduction-to-tensorflow-js-9a02b143c099
- Cart-pole (código, tfjs-examples) — https://github.com/tensorflow/tfjs-examples/tree/master/cart-pole
- Mountain car com TF.js — https://github.com/prouhard/tfjs-mountaincar
- Jogo da velha adaptativo com RL (freeCodeCamp) — https://www.freecodecamp.org/news/how-to-build-an-adaptive-tic-tac-toe-ai-with-reinforcement-learning-in-javascript/
