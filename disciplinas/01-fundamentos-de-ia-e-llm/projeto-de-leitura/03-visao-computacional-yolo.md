# 03 · Visão computacional na Web — vencendo jogos com YOLO

> **Módulo 4 da disciplina** · Leitura: ~9 min · Pré-requisito: [doc 01](./01-ml-dl-ia-redes-neurais.md)

## 🎯 Em uma frase
Nem sempre é preciso treinar um modelo do zero: aqui a IA **integra um modelo pronto de detecção de objetos (YOLO)** para enxergar a tela de um jogo (Duck Hunt), identificar os alvos e disparar sozinha — tudo no navegador.

---

## 👵 Explicando para a vovó

No doc 01 a gente **criou e treinou** um "cérebro" do zero. Aqui a ideia é outra: em vez de criar um cão de caça filhote e passar meses adestrando, a senhora **contrata um cão já treinado** e só ensina onde mirar. Muito mais rápido.

Esse "cão treinado" é o **YOLO**: um modelo que olha uma foto e aponta, num piscar de olhos, *onde* está cada coisa — "tem um pato aqui, um cachorro ali, uma bicicleta lá". A IA tira uma "foto" da tela do jogo várias vezes por segundo, pergunta ao YOLO "onde está o pato?", pega as coordenadas e clica ali — acertando o tiro automaticamente.

Tem um detalhe engraçado: o YOLO nunca aprendeu "pato de videogame", então ele chama o pato de **"pipa" (kite)**. Não é perfeito, mas resolve — o que importa é que ele acha o alvo no lugar certo.

> 🧠 Reaproveitar inteligência pronta é, muitas vezes, mais esperto do que reinventá-la.

---

## 🔧 Tecnicamente

### Mudança de foco: integração, não treinamento
Nos módulos anteriores treinamos modelos. Aqui o foco é **usar modelos já treinados, Web APIs e bibliotecas do JavaScript** — mostrando que com o conhecimento certo dá para integrar soluções existentes de forma criativa e eficaz.

### O modelo YOLO (You Only Look Once)
- Modelo de **detecção de objetos**: analisa a imagem e retorna **todos** os objetos identificados com suas coordenadas.
- Treinado originalmente em **Python/PyTorch**, mas **convertido para TensorFlow.js** e executado no navegador.
- Reconhece **80+ categorias**. No Duck Hunt, interpretou os patos como **"kite"** (pipa) — classificação imperfeita, porém suficiente.

### O pipeline completo (por frame)
1. **Captura da tela** — o jogo é renderizado com **Pixi.js** sobre um `<canvas>`; usa-se `createImageBitmap` para tirar um "print" do canvas.
2. **Envio ao Web Worker** — a imagem vai para uma **thread secundária** que roda o modelo. A thread principal nunca processa o modelo direto: ela só coleta a imagem, envia e aguarda o retorno para atualizar a interface (mantém tudo fluido).
3. **Pré-processamento** (`preprocessImage`, dentro de `tf.tidy` para liberar memória):
   - `tf.browser.fromPixels` → bitmap vira tensor;
   - `tf.image.resizeBilinear` → redimensiona para **640×640** (exigência do YOLO);
   - normaliza dividindo por **255** (faixa 0–1);
   - `expandDims` → adiciona a dimensão de **batch**.
4. **Inferência** (`runInference`) — `model.executeAsync(input)` retorna três arrays:
   - **`boxes`** (caixas delimitadoras), **`scores`** (confiança), **`classes`** (categoria).
5. **Pós-processamento** (`processPrediction`) — filtra por **`classThreshold` de 40%** e mantém só a classe **"kite"**; converte coordenadas normalizadas para pixels reais e calcula o **centro da caixa**:
   - `centerX = x1 + (x2 - x1) / 2`
   - `centerY = y1 + (y2 - y1) / 2`
6. **Ação** — via `postMessage`, a thread principal move a mira até o centro e **simula o clique** (imitando um jogador humano). A cada nova predição, um novo disparo.

> ⚡ **Aquecimento do modelo:** faz-se uma predição inicial com valores fixos (`tf.ready()` + `tf.loadGraphModel`) para cachear os componentes internos e acelerar as inferências seguintes.

### Resultado e generalização
A IA **zerou o jogo**, passando por todos os níveis mesmo com mais patos por fase. A mesma abordagem — capturar tela → detectar → agir — vale para **monitoramento, robótica, navegação autônoma** e casos como detectar **prateleiras vazias** em supermercado (basta trocar a interpretação dos labels e o alvo).

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| **YOLO** | Modelo de detecção de objetos (You Only Look Once) |
| **Detecção de objetos** | Achar *o que* e *onde* está cada item na imagem |
| **Bounding box** | Caixa (x1,y1,x2,y2) que delimita o objeto |
| **score / confiança** | Quão certo o modelo está da detecção |
| **classThreshold** | Corte mínimo de confiança (aqui, 40%) |
| **createImageBitmap** | API que captura um frame do canvas |
| **tf.tidy** | Libera automaticamente a memória dos tensores temporários |
| **Warm-up** | Predição inicial "boba" para pré-carregar o modelo |
| **executeAsync** | Roda a inferência do grafo do modelo |

---

## 💻 No curso

- **`exemplo-02-vencendo-qualquer-jogo`**: fork do Duck Hunt em JavaScript (base do Matt, com Pixi.js), atualizado para Node.js moderno, com **mira visual** e marcador de pontuação. Template já traz o jogo + o modelo YOLO baixado + estrutura pronta, para focar só na detecção.
- Demonstração dividida em 4 partes: montar o projeto → estruturar threads e captura → converter imagem em tensor e rodar a inferência → filtrar detecções e converter caixas em coordenadas de disparo.
- **Desafio proposto:** aplicar o mesmo pipeline em outro jogo simples do navegador (pulo, corrida, quebra-cabeça) e estender o YOLO com novas classes (referência ao trabalho de Hugo Zanini detectando prateleiras vazias).

---

## 🔗 Para ir além
- YOLOv5 (Ultralytics) — https://github.com/ultralytics/yolov5
- Treinar YOLOv7 e rodar no navegador com TF.js — https://medium.com/data-science/training-a-custom-yolov7-in-pytorch-and-running-it-directly-in-the-browser-with-tensorflow-js-96a5ecd7a530
- Detecção de SKUs em tempo real no browser (Hugo Zanini) — https://blog.tensorflow.org/2022/05/real-time-sku-detection-in-browser.html
- BertViz / visualização de attention — https://github.com/jessevig/bertviz
- Pixi.js — https://pixijs.com/
