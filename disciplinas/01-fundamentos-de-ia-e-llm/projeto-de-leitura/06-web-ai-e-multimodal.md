# 06 · IA no navegador — Web AI e multimodalidade

> **Módulo 5 (Cap. 3 e 4) da disciplina** · Leitura: ~9 min · Pré-requisito: doc [05](./05-como-funcionam-llms.md)

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
4. Executar a API `languageModel.create()` passando os parâmetros.
5. Processar a resposta em **streaming, token por token**.

> Recapitulando o doc [05](./05-como-funcionam-llms.md): `temperature` próximo de 0 = resposta previsível; valores altos = mais criatividade; `topK` define quantos candidatos ao próximo token são considerados.

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
| **`languageModel.create()`** | API do navegador para invocar a LLM local |
| **Streaming** | Resposta chegando token por token |
| **Multimodalidade** | Entender e relacionar texto, imagem e áudio |
| **Blob** | Formato binário em que o arquivo é processado |

---

## 💻 No curso
- **Demo Web AI (exemplo-03 e 04):** rodar uma LLM no navegador com HTML + JS, brincando com `temperature` e `topK`; teste de raciocínio semântico ("Rei − homem + mulher = ?" → "Rainha") mostrando os embeddings funcionando **localmente**.
- **Demo multimodal (exemplo-05):** processar imagens de pessoas/animais/cenários, transcrever documentos, tudo offline no Chrome.

---

## 🔗 Para ir além
- Chrome Built-in AI (docs) — https://developer.chrome.com/docs/ai/built-in
- Web AI Demos — https://chrome.dev/web-ai-demos/
- Comunidade WebML (Hugging Face) — https://huggingface.co/webml-community
- DeepSeek R1 rodando via WebGPU — https://huggingface.co/spaces/webml-community/deepseek-r1-webgpu
- WebMCP — https://github.com/webmachinelearning/webmcp
