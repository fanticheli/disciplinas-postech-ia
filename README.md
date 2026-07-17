# 🧠 Central de Estudos — Pós em Engenharia de IA Aplicada

Guia de estudo em HTML, de leitura rápida, para revisar cada disciplina da pós.
Cada assunto é explicado em camadas: **o que é · como funciona · como se aplica · prós e contras · más práticas · analogia da vovó · cola rápida**.

> 🌐 **Site:** https://fanticheli.github.io/disciplinas-postech-ia/

---

## 📚 Disciplinas

| # | Disciplina | Autoria | Status |
|---|------------|---------|--------|
| 01 | Fundamentos de IA e LLMs para Programadores | Erick Wendel | ✅ Completa |

---

## 🗂️ Estrutura do repositório

```
.
├── index.html                        # Site de estudo (servido pelo GitHub Pages)
└── disciplinas/
    └── 01-fundamentos-de-ia-e-llm/
        ├── material/                 # PDFs oficiais da disciplina
        │   ├── apostila-oficial.pdf              (105 págs)
        │   ├── referencias-e-links-por-modulo.pdf
        │   ├── indicacoes-de-leitura.pdf
        │   └── contracapa.pdf
        └── projeto-de-leitura/       # Resumos em Markdown (fonte do site)
            ├── README.md             # Trilha de leitura e cobertura por módulo
            └── 00 … 11 *.md          # Um arquivo por assunto
```

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

O site é *data-driven*: no `index.html`, adicione um objeto ao array `TOPICS`
(e um bloco em `BLOCOS`, se for outra disciplina). Todo o layout é reaproveitado.

---

Conteúdo original da **Disciplina 01** de autoria de **Erick Wendel Gomes da Silva**.
Este repositório é material de estudo pessoal.
