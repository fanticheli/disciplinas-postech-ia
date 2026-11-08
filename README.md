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

| Disciplinas | Repositório |
|-------------|-------------|
| 01 a 10 | [engenharia-de-software-com-ia-aplicada](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada): uma pasta por módulo (`modulo01-...` a `modulo10-...`), mais `lives/` |
| 11 (Capstone) | [capstone-project-ai-researcher](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher): o projeto completo |
| 11 (Capstone) | [ai-researcher-seed](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed): o ponto de partida do aluno |

Cada tópico dos guias traz, na seção 💻 *No código do repo*, os arquivos e comandos do repositório correspondente.

---

## 🗂️ Estrutura do repositório

```
.
├── index.html                        # Site de estudo (servido pelo GitHub Pages)
├── data/dNN.js                       # Conteúdo do site, um arquivo por disciplina
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

O site é um único HTML autocontido, sem dependências ou build:

```bash
# basta abrir o arquivo
xdg-open index.html      # Linux
open index.html          # macOS
```

---

## ➕ Adicionando novas disciplinas

O site é *data-driven*: cada disciplina é um arquivo `data/dNN.js` com `STUDY.push({disc, materiais, blocos, topics})`,
carregado por uma tag `<script>` no `index.html`. Todo o layout é reaproveitado.

---

Conteúdo original da **Disciplina 01** de autoria de **Erick Wendel Gomes da Silva**.
Este repositório é material de estudo pessoal.
