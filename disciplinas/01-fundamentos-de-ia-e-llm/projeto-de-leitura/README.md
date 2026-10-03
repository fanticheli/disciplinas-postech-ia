# 📚 Fundamentos de IA e LLMs para Programadores — Guia de Leitura

> Resumo organizado da **Disciplina 01** da pós de Engenharia de IA Aplicada (autoria: **Erick Wendel**).
> Cada assunto é explicado em **duas camadas**: 👵 *para a vovó* (analogias do mundo real) e 🔧 *tecnicamente* (nível sênior).

---

## 🗺️ Como usar este guia

Cada arquivo é auto-contido e segue sempre a mesma estrutura:

| Seção | Para quê serve |
|-------|----------------|
| 🎯 **Em uma frase** | O conceito destilado |
| 👵 **Explicando para a vovó** | Analogia do mundo real, sem jargão |
| 🔧 **Tecnicamente** | O detalhe de engenharia que importa |
| 🧩 **Cola rápida** | Glossário dos termos-chave |
| 💻 **No código do repo** / **No curso** | O que foi feito na prática: estudo do código dos exemplos (fluxo, como rodar, template vs z, armadilhas) e demos do curso (tópicos sem exemplo no repo usam "No curso") |
| 🔗 **Para ir além** | Links de referência |

---

## 🧭 Trilha de leitura sugerida

A ordem abaixo respeita a progressão do curso — do concreto (redes neurais) ao aplicado (RAG). Dá pra pular direto no que te interessa, mas se for aprender do zero, siga a numeração.

### Bloco 0 — Antes de começar
0. [Introdução ao curso — a proposta e como estudar](./00-introducao-ao-curso.md)

### Bloco 1 — A base (o que é IA de verdade)
1. [Machine Learning, Deep Learning e IA — a base de tudo](./01-ml-dl-ia-redes-neurais.md)
2. [Sistemas de Recomendação na prática](./02-sistemas-de-recomendacao.md)

### Bloco 2 — Visão computacional e IA que aprende sozinha
3. [Visão computacional na Web — vencendo jogos com YOLO](./03-visao-computacional-yolo.md)
4. [Algoritmos Genéticos e Aprendizado por Reforço](./04-algoritmos-geneticos-e-reforco.md)

### Bloco 3 — O coração dos LLMs
5. [Como funcionam LLMs — transformers, embeddings, attention](./05-como-funcionam-llms.md)
6. [IA no navegador — Web AI e multimodalidade](./06-web-ai-e-multimodal.md)

### Bloco 4 — Trabalhando com LLMs no dia a dia
7. [Prompt Engineering — e os padrões JSON e TOON](./07-prompt-engineering.md)
8. [Ferramentas de IA para Dev — Cursor, Windsurf e Agentes](./08-ferramentas-dev-e-agentes.md)
9. [MCPs e automação para devs](./09-mcp-e-automacao.md)

### Bloco 5 — Rodando e alimentando modelos
10. [Modelos open-source vs. proprietários — Ollama e OpenRouter](./10-modelos-open-vs-fechados.md)
11. [RAG, embeddings e busca semântica](./11-rag-embeddings-busca-semantica.md)

---

## ✅ Cobertura módulo a módulo (Disciplina 01)

| Módulo da apostila | Documento |
|--------------------|-----------|
| **01** · Introdução ao curso | [00 · Introdução ao curso](./00-introducao-ao-curso.md) |
| **02** · Machine Learning, Deep Learning e IA | [01 · ML, DL e IA — a base de tudo](./01-ml-dl-ia-redes-neurais.md) |
| **03** · Deep Learning — Sistemas de Recomendação | [02 · Sistemas de Recomendação](./02-sistemas-de-recomendacao.md) |
| **04** · Web Machine Learning — Vencer Qualquer Jogo | [03 · Visão computacional / YOLO](./03-visao-computacional-yolo.md) |
| **05** · Inteligência artificial na Web | [04 · Algoritmos Genéticos e Reforço](./04-algoritmos-geneticos-e-reforco.md) · [05 · Como funcionam LLMs](./05-como-funcionam-llms.md) · [06 · Web AI e Multimodal](./06-web-ai-e-multimodal.md) |
| **06** · Prompt Engineering | [07 · Prompt Engineering (JSON/TOON)](./07-prompt-engineering.md) |
| **07** · Ferramentas de IA para Dev | [08 · Ferramentas Dev e Agentes](./08-ferramentas-dev-e-agentes.md) |
| **08** · MCPs e automação para devs | [09 · MCP e automação](./09-mcp-e-automacao.md) |
| **09** · Modelos open-source vs. proprietários | [10 · Modelos open vs. fechados](./10-modelos-open-vs-fechados.md) |
| **10** · RAG, embeddings e busca semântica | [11 · RAG, embeddings e busca semântica](./11-rag-embeddings-busca-semantica.md) |

> O Módulo 05 é o mais denso da apostila e foi dividido em **3 documentos** para não virar um texto único gigante.

### Aula a aula

| Módulo · Capítulo da apostila | Documento |
|---|---|
| 01 · Cap. 1 Introdução ao curso · Cap. 2 O que você verá, como praticar e a comunidade | [00](./00-introducao-ao-curso.md) |
| 02 · Cap. 1 ML, DL e IA · Cap. 2 Teachable Machine · Cap. 3 Conceito de redes neurais · Caps. 4 e 5 Primeira rede neural (PT01 e PT02) | [01](./01-ml-dl-ia-redes-neurais.md) |
| 03 · Caps. 1 a 7 Sistemas de recomendação (PT01 a PT07) | [02](./02-sistemas-de-recomendacao.md) |
| 04 · Caps. 1 a 5 Como vencer qualquer jogo (PT01 a PT05) | [03](./03-visao-computacional-yolo.md) |
| 05 · Cap. 1 Algoritmos genéticos | [04](./04-algoritmos-geneticos-e-reforco.md) |
| 05 · Cap. 2 Como funcionam LLMs | [05](./05-como-funcionam-llms.md) |
| 05 · Cap. 3 Web AI · Cap. 4 Demo 02, Web AI multimodal | [06](./06-web-ai-e-multimodal.md) |
| 06 · Cap. 1 Como escrever prompts · Cap. 2 Padrão TOON e JSON | [07](./07-prompt-engineering.md) |
| 07 · Cap. 1 Cursor, VS Code e Windsurf · Cap. 2 Agentes de IA | [08](./08-ferramentas-dev-e-agentes.md) |
| 08 · Cap. 1 O que são MCPs · Cap. 2 Gerar testes · Cap. 3 Navegar e extrair · Cap. 4 Documentação atualizada · Cap. 5 Telemetria | [09](./09-mcp-e-automacao.md) |
| 09 · Cap. 1 Modelos abertos e fechados · Cap. 2 Ollama · Cap. 3 OpenRouter | [10](./10-modelos-open-vs-fechados.md) |
| 10 · Cap. 1 O que é RAG · Cap. 2 Embeddings e vector databases · Cap. 3 Primeiro RAG com JavaScript e Neo4j (e o texto de introdução da apostila) | [11](./11-rag-embeddings-busca-semantica.md) |
| Indicações de leitura, referências por módulo e aviso sobre Windows | Este README (seções abaixo) |

### Nota sobre a apostila

A apostila é um texto derivado das aulas e traz grafias trocadas. Neste material usamos os nomes corretos: "Oriama", "Yama" e "Olyama" são o **Ollama**; "Reg" (e "Retrieval Mentor Generation") é **RAG**; "BetterOff" é o **Better Auth**; "ASCII" é o modo **ASK**; "QuenCoder" provavelmente é o Qwen Coder; "LEM" provavelmente é o SensorLM. Divergências entre a apostila e o código do repo (variável `OPENROUTER_KEY` vs `OPENROUTER_API_KEY`, métrica `loss` vs `accuracy`, embeddings "sem Docker" vs Neo4j via Docker Compose) estão sinalizadas nos tópicos 01, 10 e 11.

### Problemas no Windows

A lista de referências da disciplina avisa que a instalação do `@tensorflow/tfjs-node` falha no Windows (afeta o exemplo-00); a solução não é detalhada na fonte. Sugestões nossas, não da apostila: rodar via WSL2 ou trocar por `@tensorflow/tfjs` (CPU/WebGL).

---

## 💻 Código do repo → tópico

O código do módulo está em [`modulo01-fundamentos-de-ia-e-llms-para-programadores`](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores). Cada exemplo é estudado na seção **💻 No código do repo** do tópico correspondente.

| Exemplo | O que é | Tópico |
|---|---|---|
| `exemplo-00` | Primeira rede neural com TensorFlow.js (Node) | [01 · ML, DL e IA](./01-ml-dl-ia-redes-neurais.md) |
| `exemplo-01` | Recomendação de e-commerce no navegador (Web Worker + TF.js) | [02 · Sistemas de Recomendação](./02-sistemas-de-recomendacao.md) |
| `exemplo-02` | DuckHunt-JS + YOLOv5n: a IA enxerga o canvas e clica | [03 · Visão computacional / YOLO](./03-visao-computacional-yolo.md) |
| `exemplo-03` | Prompt API do Chrome (Gemini Nano) | [06 · Web AI e Multimodal](./06-web-ai-e-multimodal.md) |
| `exemplo-04` | Chat local com sliders de temperature e topK | [06 · Web AI e Multimodal](./06-web-ai-e-multimodal.md) |
| `exemplo-05` | Multimodal (imagem/áudio) + Translator + LanguageDetector | [06 · Web AI e Multimodal](./06-web-ai-e-multimodal.md) |
| `exemplo-06` | Playwright MCP para gerar testes | [09 · MCP e automação](./09-mcp-e-automacao.md) |
| `exemplo-07` | Playwright MCP para navegar e preencher formulário | [09 · MCP e automação](./09-mcp-e-automacao.md) |
| `exemplo-08` | Context7 MCP: documentação sempre atual | [09 · MCP e automação](./09-mcp-e-automacao.md) |
| `exemplo-09` | Grafana MCP: IA investigando telemetria | [09 · MCP e automação](./09-mcp-e-automacao.md) |
| `exemplo-10` | Ollama: modelos abertos locais | [10 · Open vs. fechados](./10-modelos-open-vs-fechados.md) |
| `exemplo-11` | OpenRouter: gateway único para vários modelos | [10 · Open vs. fechados](./10-modelos-open-vs-fechados.md) |
| `exemplo-12` | Embeddings e busca semântica com Neo4j | [11 · RAG e busca semântica](./11-rag-embeddings-busca-semantica.md) |
| `exemplo-13` | Primeiro RAG com JavaScript e Neo4j | [11 · RAG e busca semântica](./11-rag-embeddings-busca-semantica.md) |

### Stack e setup geral

O fio condutor vai de uma rede neural de 3 amostras (00) a um RAG com Neo4j (13): ML clássico no JS (TensorFlow.js em `tfjs-node` e no navegador, Web Workers, tfjs-vis, YOLOv5n, PixiJS, webpack), IA embutida no Chrome (`LanguageModel`, `Translator`, `LanguageDetector`), agentes com MCP (Playwright, Context7, Grafana, OpenTelemetry, Prometheus, Loki, Tempo, Fastify, Next.js + Better Auth), modelos locais e gateway (Ollama, OpenRouter) e RAG (LangChain JS, Hugging Face Transformers para embeddings locais, Neo4j 5, OpenRouter).

| Necessidade | Exemplos | Observação |
|---|---|---|
| Node.js | 00, 01, 02, 04, 05, 08, 09, 12, 13 | 09, 12 e 13 declaram `"node": "v22.13.1"` e usam `--experimental-strip-types`; o 02 pede Node > 20 |
| Módulos nativos | 00 (`tfjs-node`), 08 (`better-sqlite3`) | Falham mais em Node muito novo ou Windows sem build tools |
| Docker | 09 (observabilidade), 12 e 13 (Neo4j) | 12 e 13 usam o binário `docker-compose` nos scripts npm |
| Chrome com flags | 03, 04, 05 | `chrome://flags/#prompt-api-for-gemini-nano`; o 05 também exige as flags de Translator e Language Detector |
| Cliente com MCP (VS Code, Cursor, Windsurf...) | 06, 07, 08, 09 | Config de servidor MCP; sem `package.json` nos 06 e 07 |
| Ollama + curl + jq | 10 | Modelos grandes ocupam disco e memória |
| Chave OpenRouter | 11, 13 | `OPENROUTER_API_KEY` em `.env`; modelos `:free` não cobram |
| Credenciais GitHub OAuth | 08 | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` |

Em cada pasta, rode `npm install` (ou `npm ci` onde há lockfile) e o script `start`/`dev` descrito no tópico. Sem `.env` os exemplos 12 e 13 não sobem (`--env-file .env`); o único `.env.example` está em `exemplo-12-embeddings-neo4j-template`.

**Template e z:** os exemplos 00, 01 e 12 vêm em pares: `-template` é o ponto de partida da aula e `-z` (ou a pasta sem sufixo, no 12) é a versão final. O 01 tem 5 snapshots (`parte01` a `parte05`) e o 02 tem `_template`, `parte01` e `parte02`. Use `diff -r` entre as pastas para ver o que cada etapa acrescenta.

---

## 🧰 Materiais oficiais da disciplina

- **Repositório de código:** https://github.com/unipds-engenharia-de-ia-aplicada
- **Biblioteca central usada no curso:** TensorFlow.js (roda ML direto no navegador e no Node.js)
- **Linguagem principal:** JavaScript/Node.js — a proposta do curso é aplicar IA sem "trocar de stack"

### Indicações de leitura complementar
- **Practical Machine Learning in JavaScript** (C. Gerard, Apress, 2020) — ML em produção com TensorFlow.js
- **OpenAI — Prompt Engineering** (guia oficial) — prompts robustos e reproduzíveis
- **Hugging Face — LLM Course** — tokenização, embeddings, Transformers e fine-tuning na prática

---

*Guia gerado a partir da apostila oficial (105 págs) e dos materiais de apoio da disciplina.*
