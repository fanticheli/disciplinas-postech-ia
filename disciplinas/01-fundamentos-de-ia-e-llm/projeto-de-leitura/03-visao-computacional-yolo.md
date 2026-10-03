# 03 · Visão computacional na Web — vencendo jogos com YOLO

> **Módulo 4 da disciplina (Caps. 1 a 5)** · Leitura: ~11 min · Pré-requisito: [doc 01](./01-ml-dl-ia-redes-neurais.md)

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

### A origem da ideia
A primeira tentativa do professor foi treinar uma rede própria para achar os patos e atirar, mas esbarrou em acurácia e complexidade. O Hugo Zanini (especialista em ML) sugeriu usar um modelo pronto, o YOLO. O jogo é um fork do DuckHunt-JS de Matt Surabian (Pixi.js para renderização 2D), que só rodava em Node antigo (versão 8): o professor atualizou as dependências, abriu um pull request e acrescentou uma **mira visual** para enxergar onde a IA atira. O template já traz o jogo ajustado e o modelo YOLO baixado, para focar só na detecção.

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

### Melhorias sugeridas pela aula
- Ajustar dinamicamente o `classThreshold` para aumentar a precisão.
- Controlar melhor o intervalo entre capturas (além do simples `setTimeout`).
- Filtrar detecções de baixa confiança ou fora da área jogável.
- Estender para outros jogos mudando só a interpretação dos labels e o alvo dos disparos.

> ⚙️ **Aceleração gráfica:** a apostila manda manter "Use Graphics Acceleration When Available" ativa no navegador; sem isso o canvas pode falhar e a IA não funciona direito.

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

## 💻 No código do repo

**`exemplo-02` · Vencendo qualquer jogo com YOLO**

- **Objetivo:** fork do DuckHunt-JS (base do Matt, Pixi.js 8) atualizado para Node moderno, com mira visual e marcador de pontuação. Um YOLOv5n em Web Worker enxerga o canvas e clica sozinho nos patos. A demonstração foi em 4 partes: montar o projeto, estruturar threads e captura, converter imagem em tensor e inferir, e filtrar detecções para coordenadas de disparo.
- **Stack:** DuckHunt-JS (PixiJS 8, GSAP, Howler, webpack 5) mais a pasta `machine-learning/` (`main.js`, `worker.js`, `layout.js` e `yolov5n_web_model/`, ~7,5 MB, com `labels.json` das classes do COCO). O resto (`src/`, `gulpfile.js`, `infrastructure.tf`, `terraform.tfstate`) é do jogo original.
- **Fluxo:**
  1. `main.js` (raiz) cria `new Game({ spritesheet: "sprites.json" })`, chama `game.load()` e entrega o jogo a `machine-learning/main.js`.
  2. Este monta o HUD (`buildLayout`), cria o worker (`new Worker(new URL("./worker.js", import.meta.url), { type: "module" })`) e esconde a mira real.
  3. A cada 200 ms (`setInterval`), extrai o canvas do Pixi, vira `ImageBitmap` e vai ao worker como *transferable*.
  4. `worker.js` carrega o TF.js via `importScripts`, `tf.loadGraphModel("yolov5n_web_model/model.json")`, faz warmup com `tf.ones` e publica `model-loaded`.
  5. `preprocessImage`: `tf.browser.fromPixels` → `resizeBilinear` 640x640 → `.div(255)` → `.expandDims(0)`, dentro de `tf.tidy()` para não vazar memória.
  6. `runInference` usa `_model.executeAsync` e lê as 3 primeiras saídas (boxes, scores, classes).
  7. `processPrediction` (generator) filtra `score >= 0.4` e classe `"kite"`, converte coordenadas normalizadas em pixels e emite o centro da caixa (`x1 + w/2`, `y1 + h/2`).
  8. De volta ao `main.js`, cada `prediction` atualiza o HUD, posiciona a mira e chama `game.handleClick({ global })`, simulando o clique.
- **Template vs z:** `_template` tem worker stub (responde sempre x=400, y=400); `parte01` carrega o YOLO e infere sem usar o resultado (ainda com `debugger` e 400,400); `parte02` adiciona `processPrediction`. Compare os três `machine-learning/worker.js` com `diff`.
- **Como rodar:** em `_template`, `DuckHunt-JS-parte01` ou `parte02`: `npm install && npm start` (webpack-dev-server em 8080). `npm run build` gera `dist/`; o `CopyWebpackPlugin` copia o modelo para `dist/yolov5n_web_model`. `npm run audio`/`images` exigem ffmpeg e TexturePacker e não são necessários. Node > 20, internet para o TF.js via jsDelivr.
- **Armadilhas e achados:**
  - COCO não tem "pato": o detector acha "kite" por semelhança, é um truque, não um detector dedicado.
  - O worker usa `importScripts` (só em workers clássicos) mas é criado com `{ type: "module" }`; só funciona pelo webpack. Não foi executado; fora do webpack tende a quebrar.
  - TF.js vem de `tfjs@latest` via CDN: uma versão nova pode quebrar a aula, fixe a versão.
  - `MODEL_PATH` é relativo ao worker; sem a cópia do modelo, o `fetch` dá 404.
  - Latência de 200 ms: a mira pode chegar atrasada em alvos rápidos; extrair o canvas custa CPU/GPU. O `setInterval` não espera a inferência anterior: se o modelo for mais lento que 200 ms, as mensagens provavelmente se acumulam no worker.
  - `terraform.tfstate`, `infrastructure.tf` e `s3policy.json` vêm do jogo original: não aplicar. Dependências antigas (babel 6, eslint 4, gulp 4) geram avisos de deprecated.
- **Exercícios e desafio:** aplicar o pipeline em outro jogo e estender o YOLO com novas classes (ref. Hugo Zanini, prateleiras vazias); trocar a classe filtrada; ajustar `CLASS_THRESHOLD` e o intervalo; `tf.image.nonMaxSuppression` para caixas duplicadas; exportar um YOLO próprio (Ultralytics tem export para TF.js).
- **Código:** [exemplo-02](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-02-vencendo-qualquer-jogo) · [DuckHunt-JS ml-self-play-template](https://github.com/ErickWendel/DuckHunt-JS/tree/ml-self-play-template) · [ml-self-play](https://github.com/ErickWendel/DuckHunt-JS/tree/ml-self-play)

---

## 🔗 Para ir além
- YOLOv5 (Ultralytics) — https://github.com/ultralytics/yolov5
- Treinar YOLOv7 e rodar no navegador com TF.js — https://medium.com/data-science/training-a-custom-yolov7-in-pytorch-and-running-it-directly-in-the-browser-with-tensorflow-js-96a5ecd7a530
- Detecção de SKUs em tempo real no browser (Hugo Zanini) — https://blog.tensorflow.org/2022/05/real-time-sku-detection-in-browser.html
- Pixi.js — https://pixijs.com/
- Modelos pré-treinados no COCO (Ultralytics) — https://docs.ultralytics.com/datasets/detect/coco/#coco-pretrained-models
- Exportar YOLO para TF.js (Ultralytics) — https://docs.ultralytics.com/integrations/tfjs/
- DuckHunt-JS original (Matt Surabian) — https://github.com/MattSurabian/DuckHunt-JS
