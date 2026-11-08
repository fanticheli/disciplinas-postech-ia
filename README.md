# 🧠 Central de Estudos — Pós em Engenharia de IA Aplicada

Guia de estudo em HTML, de leitura rápida, para revisar cada disciplina da pós.
Cada assunto é explicado em camadas: **o que é · como funciona · como se aplica · prós e contras · más práticas · analogia da vovó · cola rápida**.

> 🌐 **Site:** https://fanticheli.github.io/disciplinas-postech-ia/

---

## 📚 Disciplinas

| # | Disciplina | Autoria | Status |
|---|------------|---------|--------|
| 01 | Fundamentos de IA e LLMs para Programadores | Erick Wendel | ✅ Completa |
| 02 | APIs de IA Generativa e Prompt Engineering | Erick Wendel | ✅ Completa |
| 03 | Model Context Protocol (MCP) | Erick Wendel | ✅ Completa |
| 04 | Criação de Agentes Autônomos | Thiago Bussola | ✅ Completa |
| 05 | Ferramentas de IA para UX e UI | Álvaro Camillo Neto | ✅ Completa |
| 06 | Ferramentas de IA para DevOps | Camilla Martins | ✅ Completa |
| 07 | Ferramentas de IA para Gestão de Projetos | José Ahirton Batista Lopes Filho | ✅ Completa |
| 08 | Arquitetura de Sistemas com IA | José Ahirton Batista Lopes Filho | ✅ Completa |
| 09 | Processamento de Dados e Fine-Tuning de Modelos | José Ahirton Batista Lopes Filho | ✅ Completa |
| 10 | Segurança e Governança em IA | Jéssica da Silva Costa | ✅ Completa |
| 11 | Projeto Integrador (Capstone Project) | Álvaro Camillo Neto | ✅ Completa |

---

## 💻 Repositórios de código

O código das aulas **não está neste repositório**: os guias apontam direto para o GitHub, e **não é preciso clonar nada** para estudar. Abra o link da disciplina (ou os links "No código do repo" dentro de cada tópico).

| Disciplina | Código no GitHub |
|------------|------------------|
| 01 · Fundamentos de IA e LLMs | [modulo01-fundamentos-de-ia-e-llms-para-programadores](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores) |
| 02 · APIs de IA generativa e prompt engineering | [modulo02-integracao-apis-llms](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms) |
| 03 · MCP | [modulo03-mcp-na-pratica](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica) |
| 04 · Agentes autônomos | [modulo04-criacao-de-agentes-autonomos-novo](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo) |
| 05 · IA para UX e UI | [modulo05-ferramentas-de-IA-para-UI-UX](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX) |
| 06 · IA para DevOps | [modulo06-aiops-engenharia-agentica](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica) |
| 07 · IA para gestão de projetos | [modulo07-ferramentas-de-ia-para-gestao-de-projetos](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos) |
| 08 · Arquitetura de sistemas com IA | [modulo08-arquitetura-de-sistemas-com-ia](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia) |
| 09 · Processamento de dados e fine-tuning | [modulo09-processamento-de-dados-e-fine-tuning-de-modelos](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos) |
| 10 · Segurança e governança em IA | [modulo10-seguranca-governanca-ia](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia) |
| 11 · Projeto integrador (Capstone) | [capstone-project-ai-researcher](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher) (projeto completo) e [ai-researcher-seed](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed) (ponto de partida do aluno) |

Repositório oficial das disciplinas 01 a 10: [engenharia-de-software-com-ia-aplicada](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada), que também traz as [lives](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives) e as [skills](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/skills).

---

## 🗂️ Estrutura do repositório

```
.
├── index.html                        # Site de estudo (servido pelo GitHub Pages)
├── app.js                            # Lógica do site (rotas, busca, leitura)
├── data/dNN.js · pNN.js              # Teoria e práticas, um arquivo por disciplina (carregados sob demanda)
├── data/eNN.js · roadmap.js          # Provas, análises e trilha (gerados dos .md)
├── data/manifest.js                  # Índice leve da home, navegação e progresso (gerado)
├── scripts/                          # Geradores: build-docs.py e build-manifest.py
└── disciplinas/
    └── 01-fundamentos-de-ia-e-llm/
        ├── material/                 # PDFs oficiais da disciplina
        │   ├── apostila-oficial.pdf              (105 págs)
        │   ├── referencias-e-links-por-modulo.pdf
        │   ├── indicacoes-de-leitura.pdf
        │   └── contracapa.pdf
        └── projeto-de-leitura/       # Material central: teoria da apostila + código do repo
            ├── README.md             # Trilha de leitura, cobertura por aula e mapa código → tópico
            └── 00 … 11 *.md          # Um arquivo por assunto
```

Cada tópico junta a **teoria da apostila** com o **estudo do código** do [repositório oficial](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada)
(seção 💻 *No código do repo*: fluxo, como rodar, template vs z e armadilhas). Todas as disciplinas (01 a 11) seguem a mesma estrutura.

## 🧭 Por onde começar

- [Trilha: o que vale estudar](disciplinas/study-roadmap.md): resumo das 11 disciplinas, o que implementar agora, o que aprofundar e o que pode ficar no superficial.
- Em cada disciplina: `projeto-de-leitura/study-priorities.md` (o que vale o seu tempo) e `exam-answers.md` (prova comentada, com onde estudar cada assunto).

## 🎯 Como estudar

- **Rápido, no navegador:** abra o [site](https://fanticheli.github.io/disciplinas-postech-ia/). Tem busca, tema claro/escuro, "marcar como lido" e navegação por blocos.
- **Aprofundando:** leia os Markdowns em `projeto-de-leitura/` (cada um traz a versão 👵 *para a vovó* e a 🔧 *técnica*).
- **Na fonte:** os PDFs oficiais estão em `material/`.

## 🛠️ Rodando localmente

O site é estático, sem dependências nem build para abrir:

```bash
# basta abrir o arquivo
xdg-open index.html      # Linux
open index.html          # macOS
```

---

## ➕ Adicionando novas disciplinas

O site é *data-driven*. Para incluir uma disciplina nova:

1. Crie `data/dNN.js` (`STUDY.push({disc, materiais, blocos, topics})`) e `data/pNN.js` (`PRACTICE.push({disc, intro, items})`).
2. Crie, em `disciplinas/NN-*/`, o guia (`projeto-de-leitura/`), a análise `projeto-de-leitura/study-priorities.md` e a prova `exam-answers.md`.
3. Regenere os dados derivados, na raiz do repositório:

```bash
python3 -I scripts/build-docs.py
python3 -I scripts/build-manifest.py
```

Os dois scripts descobrem as disciplinas pelos arquivos `data/dNN.js`, então não há lista para editar. Todo o layout é reaproveitado.

---

Conteúdo original da **Disciplina 01** de autoria de **Erick Wendel Gomes da Silva**.
Este repositório é material de estudo pessoal.
