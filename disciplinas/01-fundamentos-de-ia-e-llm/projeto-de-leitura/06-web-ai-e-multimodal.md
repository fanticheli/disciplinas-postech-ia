# 06 · IA no navegador — Web AI e multimodalidade

> **Módulo 5 (Caps. 3 e 4) da disciplina** · Leitura: ~11 min · Pré-requisito: doc [05](./05-como-funcionam-llms.md)

## 🎯 Em uma frase
**Web AI** é a ideia de rodar modelos de IA **direto no navegador**, na máquina do usuário, sem enviar nada para servidores — e, com a **multimodalidade**, esses modelos passam a entender não só texto, mas também **imagem e áudio**, tudo offline.

---

## 👵 Explicando para a vovó

Hoje, quando a senhora usa uma IA, é como **mandar uma carta para um escritório central** (a "nuvem"), esperar processarem lá longe e devolverem a resposta. Web AI é diferente: é como ter **um funcionário esperto morando dentro da sua casa**. Ele resolve tudo ali mesmo, sem precisar mandar seus assuntos particulares pra fora — mais **privacidade** e sem depender da internet.

Tem um preço: esse funcionário é "grande" (o modelo pesa alguns gigabytes) e demora um pouco pra "se mudar" pra sua casa (o download). Mas depois que se instala, trabalha de graça e rápido.

E a **multimodalidade**? É quando esse funcionário não só **lê** bilhetes, mas também **enxerga** fotos e **escuta** áudios. A senhora mostra a foto de um documento e ele lê os dados; toca um áudio e ele escreve o que foi falado; mostra uma paisagem e ele descreve a cena. É um ajudante que lê, vê e ouve — tudo dentro de casa.

---

## 🔧 Tecnicamente

### Web AI e a "Web 4.0"
A proposta é uma nova geração da internet em que a **IA é nativa ao navegador**. Em vez de depender de servidores remotos, as aplicações rodam o modelo **localmente**. Modelos como o **Gemma** (Google) e o **DeepSeek** já são usados assim.

**Benefícios:**
- Não é preciso enviar dados do usuário para servidores externos → **privacidade**.
- Performance aceitável, mesmo em aplicações mais complexas.
- Execução local (sem custo de servidor, funciona offline).

**Desvantagens / desafios:**
- Modelos são **pesados**: Gemma ~2.5 GB, DeepSeek ~1.3 GB.
- Tempo de download compromete a experiência, especialmente em mobile.
- Nem todo navegador está preparado nativamente (por enquanto, foco no **Chrome**).

### APIs experimentais do Google
O Google investe em APIs que embarcam modelos como o **Gemini Nano** diretamente no navegador — ao instalar o Chrome, o modelo já viria junto, eliminando downloads futuros. Já disponíveis em versões do Chrome/Canary:
- Tradução de texto
- Identificação de idioma
- Resumo de conteúdo
- Prompt para interação com LLMs

**Rodando uma LLM no navegador** (apenas HTML + JS):
1. Habilitar as funcionalidades experimentais.
2. Criar um prompt inicial com contexto.
3. Configurar `temperature` e `topK`.
4. Executar a API `LanguageModel.create()` passando os parâmetros (a apostila grafa `languageModel.create()`; o código do repo usa a global `LanguageModel`).
5. Processar a resposta em **streaming, token por token**.

> Recapitulando o doc [05](./05-como-funcionam-llms.md): `temperature` próximo de 0 = resposta previsível; valores altos = mais criatividade; `topK` define quantos candidatos ao próximo token são considerados. Exemplo da aula: com `temperature=0`, "O céu é…" quase sempre dá "azul"; com `temperature=2` e `topK=10`, surgem "vasto", "ilimitado", "cheio de estrelas".

### Multimodalidade (Cap. 4)
Capacidade de um sistema de IA lidar com **diferentes tipos de dado** — texto, imagem, áudio — e **relacionar conteúdos entre eles**. Exemplos:
- Enviar uma imagem e perguntar o que há nela.
- Enviar um áudio e pedir a transcrição.
- Combinar texto + imagem no mesmo prompt para uma resposta contextualizada.

**Como funciona a demo do curso (100% offline, no navegador):**
1. **Verificação do ambiente** — navegador compatível (Chrome).
2. **Inicialização do modelo** — baixado localmente ao carregar a página.
3. **Recebimento do input** — imagem, áudio ou texto.
4. **Processamento** — o arquivo é convertido em formato binário (**blob**).
5. **Geração da resposta** — a IA interpreta os dados e responde conforme o prompt.

Resultados demonstrados: identificar pessoas em fotos e descrever roupas/objetos/cena; extrair campos de um documento (ex.: **cartão CNPJ** → nome da empresa, endereço, telefone, status); descrever uma cena ("um homem, um laptop e um cachorro" → "ambiente relaxante ao entardecer").

> 🌐 **Truque de idioma:** a API funcionava melhor em inglês para recursos multimodais. Solução: uma API de tradução embutida faz o caminho **PT → EN → processa → EN → PT**, de forma transparente ao usuário.

**Casos de uso:** acessibilidade (leitura de imagens, transcrição de áudio), processamento de documentos offline, sites com assistentes visuais e auditivos — especialmente úteis em dispositivos móveis.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| **Web AI / Web 4.0** | IA rodando nativamente no navegador |
| **Gemini Nano** | Modelo leve do Google embarcável no Chrome |
| **`LanguageModel.create()`** | API do navegador para abrir uma sessão com a LLM local (a apostila escreve `languageModel`) |
| **Translator / LanguageDetector** | APIs embutidas de tradução e detecção de idioma |
| **Streaming** | Resposta chegando token por token |
| **Multimodalidade** | Entender e relacionar texto, imagem e áudio |
| **Blob** | Formato binário em que o arquivo é processado |

---

## 💻 No código do repo

Três exemplos em progressão, todos com o LLM embutido no Chrome (Gemini Nano), sem API key e sem custo por token. Demo de aula: teste de raciocínio semântico ("Rei − homem + mulher = ?" → "Rainha") mostrando embeddings funcionando **localmente**.

**`exemplo-03` · Prompt API mínima**
- **Objetivo:** chamar o LLM do Chrome direto do JS da página. Apenas `index.html` (sem `package.json`), IIFE assíncrona com a global `LanguageModel` e `markdown@0.5.0` (jsDelivr) para renderizar o stream. Pergunta fixa: "Quem inventou o JavaScript?".
- **Fluxo:** `LanguageModel.params()` dá `defaultTemperature`/`defaultTopK` → `LanguageModel.create({ expectedInputLanguages: ["pt"], temperature, topK, initialPrompts })` (mensagem `system`) → `session.promptStreaming([{ role: "user", content }])` → `for await` acumula em `fullText` e re-renderiza `markdown.toHTML(fullText)`.
- **Rodar:** Chrome recente com `chrome://flags/#prompt-api-for-gemini-nano`; servir por HTTP (`cd exemplo-03-webai01 && npx http-server .`). O primeiro uso baixa o modelo (centenas de MB a alguns GB).
- **Armadilhas:** não verifica disponibilidade (sem `LanguageModel` a página só quebra no console); `file://` dá problema, sirva por `localhost`; a API mudou de nome (`window.ai` → `LanguageModel`) e tutoriais antigos usam a forma velha; sem GPU/RAM suficientes `availability()` retorna `unavailable`.

**`exemplo-04` · temperature e topK ao vivo**
- **Objetivo:** mini-interface com sliders de temperature e topK, streaming, botão Parar e checagem de requisitos. Stack: `index.html`, `index.js` (ES module), `style.css`, `http-server` como única devDependency; saída com `textContent` (prompt de sistema pede texto, não markdown).
- **Fluxo:**
  1. `checkRequirements()` exige `window.chrome` e `LanguageModel` (senão aponta a flag) e consulta `LanguageModel.availability({ languages: ["pt"] })`, tratando `unavailable`, `downloading` e `downloadable` (cria sessão com `monitor` e loga `downloadprogress`).
  2. `LanguageModel.params()` define os limites dos controles (defaults: temperature 1, topK 3; máximos: 2 e 128).
  3. `askAI()` (async generator) aborta o controller anterior, destrói a sessão anterior e **cria uma nova sessão** com os valores atuais, porque temperature e topK só valem na criação. Usa `promptStreaming(messages, { signal })`; "Parar" chama `abort()` e o laço checa `signal.aborted`.
- **Rodar:** `cd exemplo-04-webai02-temperature-and-topK && npm install && npm start` (`npx http-server .`, porta 8080).
- **Armadilhas:** nova sessão a cada pergunta, sem memória de conversa; sem a flag o app lista os erros e desabilita o botão (não é bug); no fluxo `downloadable` o botão fica desabilitado até a nova checagem dar `available`; o percentual do download só vai para o console. Teste: temperature 0 duas vezes na mesma pergunta dá saída quase idêntica; valores altos divergem.

**`exemplo-05` · Multimodal + tradução local**
- **Objetivo:** enviar imagem ou áudio junto com a pergunta e traduzir a resposta de volta ao português, tudo local (processar fotos, transcrever áudio, offline). MVC enxuto: `index.js`, `services/aiService.js`, `services/translationService.js`, `controllers/formController.js`, `views/view.js`. Usa três APIs: `LanguageModel` multimodal, `Translator` (en → pt) e `LanguageDetector`.
- **Fluxo:**
  1. `checkRequirements` valida Chrome, `LanguageModel`, `Translator.availability({ sourceLanguage: "en", targetLanguage: "pt" })` e `LanguageDetector`, apontando a flag que falta.
  2. `createSession` declara `expectedInputs` (texto en, áudio, imagem) e `expectedOutputs` (texto en), com system prompt em inglês e conteúdo no formato `[{ type: "text", value }]`.
  3. O arquivo vira `Blob` e entra no conteúdo: `[{ type: "text", value: question }, { type: "image" | "audio", value: blob }]`.
  4. `promptStreaming` entrega inglês; no fim, `LanguageDetector.detect` decide: se já é pt devolve igual, senão `translator.translateStreaming` e fica com o último chunk (traz a tradução acumulada, por isso `translated = chunk`, não `+=`). Qualquer falha devolve o texto original.
- **Rodar:** flags `prompt-api-for-gemini-nano`, `translation-api` e `language-detector-api`; `cd exemplo-05-webai03-multimodal && npm install && npm start`; anexar imagem ou áudio (em inglês) e perguntar. Baixa o LLM e o par de tradução en-pt na primeira vez.
- **Armadilhas:** se qualquer uma das 3 APIs faltar o app desabilita o botão; `checkRequirements` retorna cedo, então o cheque do modelo só ocorre com as duas flags ativas; o código compara `translatorAvailability === "no"` mas a API responde `unavailable`/`downloadable`/`available`, então o teste pode nunca disparar; sessão e prompt em inglês, perguntar em português funciona pior; só `image/*` e `audio/*` são anexados, o resto é ignorado em silêncio; o usuário vê inglês e só depois o português.
- **Exercícios:** acrescentar outra API embutida (Summarizer) ao pipeline; explorar o WebMCP (expor ferramentas da página ao modelo); mostrar inglês e tradução lado a lado.
- **Código:** [exemplo-03](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-03-webai01) · [exemplo-04](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-04-webai02-temperature-and-topK) · [exemplo-05](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-05-webai03-multimodal)

---

## 🔗 Para ir além
- Chrome Built-in AI (docs) — https://developer.chrome.com/docs/ai/built-in
- Web AI Demos — https://chrome.dev/web-ai-demos/
- Comunidade WebML (Hugging Face) — https://huggingface.co/webml-community
- DeepSeek R1 rodando via WebGPU — https://huggingface.co/spaces/webml-community/deepseek-r1-webgpu
- WebMCP — https://github.com/webmachinelearning/webmcp
- Chrome Built-in AI: APIs — https://developer.chrome.com/docs/ai/built-in-apis
- Trimly (Erick Wendel) — https://github.com/ErickWendel/Trimly
