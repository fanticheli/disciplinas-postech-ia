# 10 · Modelos multimodais: documentos, áudio e real-time

> **Unidade 7 · Aula 1** · Leitura: ~9 min · Bloco: RAG, Multimodal e Observabilidade

## 🎯 Em uma frase
Modelos **multimodais** recebem texto, imagem, documentos, áudio e vídeo (e respondem em texto, áudio ou imagem) sem exigir conversão manual para texto. A lição: **multimodal amplia possibilidades, mas não elimina fundamentos**; a escolha é um trade-off de custo, controle e infraestrutura.

---

## 👵 Explicando para a vovó

Antes, para o assistente entender um livro, alguém tinha que copiar o texto para ele. Agora o assistente enxerga as páginas, ouve a voz e entende o conteúdo bruto.

Só que leitor mais completo cobra mais caro. Perguntar se vale a pena entregar o livro inteiro ou só o capítulo certo continua sendo trabalho de engenheiro.

---

## 🔧 Tecnicamente

### O que é
- **Multimodalidade:** um único pipeline cognitivo para vários formatos. Enviar um PDF para resumir, ou uma imagem para extrair dados estruturados, já é usar multimodalidade.
- **Análise de documentos:** upload do arquivo, envio ao modelo, pergunta contextual e resposta fundamentada no conteúdo. Tecnicamente é parecido com texto, mas o arquivo vai codificado em **base64** junto do prompt (a documentação muitas vezes usa o campo `imageURL` até para PDF).
- **Áudio tradicional:** usuário fala, transcrição para texto, LLM, texto de volta, conversão em áudio (STT + LLM + TTS), com muitas etapas e serviços.
- **Áudio multimodal direto:** o áudio vai direto ao modelo, que transcreve, interpreta e responde; simplifica o pipeline, mas custa mais e nem sempre há streaming via intermediários como o OpenRouter.
- **Real-time:** conexão aberta por WebSocket, WebRTC ou protocolos de voz, enviando áudio continuamente e recebendo resposta progressiva: não é request e response, é sessão contínua.

### Como funciona
- Fluxo para documentos: receber o arquivo, ler o buffer em memória, converter para base64 e enviar com o prompt. A complexidade está no tamanho: muitos endpoints exigem o arquivo completo numa única requisição, o que pode consumir muitos tokens e custar caro, ou exigir quebrar o documento.
- Em produção, a aula costuma preferir parsear o PDF no servidor, extrair só o texto relevante e enviar apenas o necessário: reduz custo e melhora o controle.
- No OpenRouter, ao filtrar modelos que aceitam arquivos, não havia opção gratuita na demonstração: multimodal exige considerar orçamento.
- Quadro de comparação: texto puro (mais barato, previsível e fácil de depurar); documento completo (mais contexto, mais custo e tokens); áudio tradicional (mais controle, mais etapas e infra); áudio direto (pipeline simples, maior custo, menos granularidade); real-time (experiência superior, complexidade alta, infra sofisticada).
- Perguntas antes de escolher: o arquivo é grande demais? Posso extrair só o texto relevante? Preciso mesmo de resposta multimídia? O custo compensa? O usuário precisa de real-time?
- Fundamentos que continuam: prompt estruturado, saída com schema, validação, tratamento de erro, controle de retentativa e gestão de estado.

### Onde aplicar
- Atendimento telefônico, URAs inteligentes sem «tecle 1, tecle 2», suporte técnico automatizado, atendimento policial ou emergencial e agentes comerciais humanizados.
- Análise de documentos jurídicos e interpretação de exames médicos.
- Transcrição em tempo real: capturar áudio do microfone, receber transcrição incremental e reagir imediatamente.

### Vantagens e limites
**Vantagens**
- Pipeline simplificado quando o áudio vai direto ao modelo.
- Aplicações mais próximas do mundo real, com voz e documentos.
- Reaproveita o que já foi aprendido: intenção, memória, estado, segurança e orquestração multi-step.

**Limites**
- Modelos multimodais geralmente não são gratuitos.
- Arquivos grandes consomem muitos tokens; menos granularidade no áudio direto.
- Real-time exige infraestrutura sofisticada e não há streaming garantido por intermediários.

### 🚫 Armadilhas
- Mandar o documento completo sem avaliar custo e extração prévia de texto.
- Assumir que multimodal dispensa schema, validação e controle de custo.
- Escolher real-time quando o caso não precisa de sessão contínua.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Multimodal | Modelo que recebe e/ou produz vários formatos de mídia |
| base64 | Codificação do arquivo para enviar junto do prompt |
| STT + LLM + TTS | Pipeline tradicional de voz com três etapas |
| Áudio multimodal direto | Modelo processa o áudio sem etapas intermediárias |
| Real-time | Sessão contínua por WebSocket ou WebRTC |
| Trade-off | Custo, controle e infraestrutura mudam com a modalidade |

---

## 💻 No código do repo

**Projeto:** [07-doc-analysis](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms/07-doc-analysis)

API que recebe um PDF e uma pergunta via multipart/form-data, converte o arquivo em base64 e o envia direto a um modelo multimodal (Gemini via OpenRouter), sem extrair texto, sem chunking e sem vector store. Grafo LangGraph com um único node. O repo só cobre o caminho de documento; áudio, STT e TTS, real-time e vídeo ficam apenas na teoria da aula.

**Fluxo**
1. `server.ts` registra `@fastify/multipart` com limite de 10 MB e define `POST /chat`.
2. Validações manuais: arquivo presente, `mimetype === 'application/pdf'`, `question` com 3+ caracteres; senão 400.
3. O buffer vira `documentBase64` e entra no estado com `messages: [HumanMessage(question)]`.
4. `nodes/answerGenerationNode.ts` (único node): sem `documentBase64` responde «No document found in state»; senão chama `llmClient.generateWithDocument(system, pergunta, base64)`.
5. `services/openrouterService.ts` monta uma `HumanMessage` com content em blocos: `{ type: 'text', text }` e `{ type: 'image_url', image_url: { url: 'data:application/pdf;base64,...' } }`.
6. O servidor responde `{ filename, question, answer, error }`. O modelo (`google/gemini-2.5-flash-lite-preview-09-2025`) foi escolhido por ser visão-capaz; alternativas comentadas no `config.ts`.

**Como rodar**
- `npm i` e `cp .env.example .env` (`OPENROUTER_API_KEY`). Node >=24.10.
- `npm run dev` (porta 4000; já faz uma pergunta ao PDF de demo).
- `curl -X POST -F "file=@docs/a-comprehensive-overview-of-large-language-models.pdf" -F "question=Summarize the main sections" http://localhost:4000/chat`.

**Armadilhas e achados no código**
- `index.ts` dispara uma chamada real ao modelo toda vez que o servidor sobe (com `--watch`, a cada save): custa tokens e atrasa a subida; comente para trabalhar.
- `npm test` não tem teste: não há pasta `tests/`, o script falha.
- Sem memória nem RAG: cada requisição reenvia o PDF inteiro e as perguntas seguintes não têm contexto.
- Limite de 10 MB e janela de contexto finita: PDFs grandes falham ou são truncados.
- Modelo `preview` pode ser descontinuado; troque pela alternativa no `config.ts` se o OpenRouter devolver 404.
- Erros do LLM viram resposta 200: o node captura a exceção e devolve «Failed to generate answer: ...» como mensagem normal.
- PDF com dados sensíveis vai para terceiros (OpenRouter e o provedor): avalie a LGPD.
- Langfuse e evaluation tests (tópico 11) não estão neste repo; só o exemplo multimodal.

---

## 🔗 Para ir além
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms)

---

⬅️ [09 · RAG com Neo4j: executor, autocorreção e resposta analítica](./09-rag-neo4j-executor-correcao-resposta.md)  ·  [11 · Monitoramento com Langfuse e evaluation tests](./11-langfuse-e-evaluation.md) ➡️
