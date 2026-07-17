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
| 💻 **No curso** | O que foi feito na prática (projetos/demos) |
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
