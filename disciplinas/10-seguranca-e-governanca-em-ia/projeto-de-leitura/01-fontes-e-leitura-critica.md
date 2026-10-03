# 01 · Fontes de materiais: framework, repositório de riscos, Scholar e arXiv

> **Unidade 1 · Aula 2** · Leitura: ~6 min · Bloco: Fundamentos e explicabilidade

## 🎯 Em uma frase
A disciplina ensina a **reconhecer o tipo de fonte** (livro, framework institucional, repositório de riscos, indexador acadêmico, repositório de preprints) e a avaliar origem, atualidade e limitações, porque em IA os materiais mudam rápido.

---

## 👵 Explicando para a vovó

Quando a senhora quer saber se um remédio é seguro, não pergunta ao vizinho: lê a bula, consulta o médico, procura a pesquisa publicada. Cada fonte serve para uma coisa, e a bula de dois anos atrás pode não falar do remédio novo.

Com IA é igual: o documento oficial é ótimo, mas precisa olhar o ano da versão; o artigo recém-saído é interessante, mas ainda pode não ter sido revisado.

---

## 🔧 Tecnicamente

### O que é
- **Livro técnico:** aprofundamento estruturado. O livro de apoio é *Machine Learning for High-Risk Applications* (O'Reilly); não é obrigatório, e os pontos usados nas aulas são referenciados.
- **Framework institucional:** organiza práticas, riscos e referências. O NIST (agência dos EUA) é a fonte principal; o **AI Risk Management Framework** tem documento principal e playbooks, e há material do NIST dedicado a viés.
- **OWASP:** a referência de segurança aplicada, principalmente o Top 10 para aplicações com LLMs (versão 2025 na aula). Sempre observar ano e versão; o original em inglês sai primeiro e a tradução depois.
- **MIT AI Risk Repository:** base ampla que classifica riscos de IA (a aula cita discriminação, privacidade, desinformação, interação e comportamento malicioso). A indicação de leitura 5 detalha: mais de 1700 riscos extraídos de 74 frameworks, taxonomia causal e taxonomia de domínios (7 domínios, 24 subdomínios).
- **Google Scholar:** *indexador* de literatura acadêmica (aponta para revistas, eventos, repositórios; nem tudo é gratuito). **arXiv:** *repositório* de preprints, mantido pela Cornell University, gratuito; ótimo para acompanhar a fronteira da pesquisa, mas preprint pode não ter passado por revisão por pares.

### Como funciona
- Escolha da fonte conforme a necessidade: livro para narrativa aprofundada, framework para organizar práticas e riscos, OWASP para segurança aplicada, MIT para mapear categorias de risco, Scholar para localizar literatura, arXiv para pesquisa recente.
- Tensão atualidade versus confiabilidade: artigo revisado dá segurança metodológica mas pode ser antigo; preprint cobre o que surgiu há semanas sem revisão; framework institucional é crível mas a versão anterior pode não cobrir agentes.
- Pesquisas específicas rendem mais: em vez de "inteligência artificial", busque "viés em modelos de linguagem" ou "segurança de agentes".
- Cultura de referência: citar a origem de framework, classificação ou metodologia permite conferir, estudar além da aula e separar opinião pessoal de recomendação baseada em documento.
- Ter fonte reconhecida não dispensa pensamento crítico: o documento pode estar desatualizado e a recomendação institucional pode não se aplicar ao seu contexto.

### Onde aplicar
- Justificar uma decisão de política ou arquitetura apontando framework e versão.
- Acompanhar novas versões do OWASP Top 10 (inclusive o de agentes) antes de projetar controles.
- Pesquisar artigo sobre um problema específico (ex.: viés em LLMs) e decidir quanto confiar com base em revisão por pares.

### Vantagens e limites
**Vantagens**
- Dá repertório para argumentar tecnicamente com fonte e versão.
- Muitos materiais institucionais são gratuitos e abertos.
- Hábito de checar a origem reduz decisões baseadas em resumo de rede social.

**Limites**
- Materiais envelhecem rápido; é preciso reconferir versão com frequência.
- Parte do material mais recente só existe em inglês por um tempo.
- Preprints exigem esforço extra de análise de método e resultados.

### 🚫 Armadilhas
- Confundir indexador (Scholar) com repositório (arXiv).
- Usar uma versão antiga do OWASP ou do NIST sem checar se há versão nova.
- Tratar preprint como verdade confirmada.
- Copiar recomendação institucional sem adaptar ao contexto da organização.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| NIST AI RMF | Framework de gestão de risco de IA do NIST, com playbooks |
| OWASP Top 10 LLM | Lista dos dez riscos recorrentes em aplicações com LLMs (versão 2025 na aula) |
| MIT AI Risk Repository | Banco com 1700+ riscos de 74 frameworks e duas taxonomias (causal e de domínios) |
| Google Scholar | Indexador de literatura acadêmica; aponta para onde o artigo está hospedado |
| arXiv | Repositório de preprints da Cornell; sem revisão por pares garantida |
| Preprint | Trabalho divulgado antes da revisão formal por revista ou conferência |
| Revisão por pares | Avaliação de especialistas antes da publicação; camada extra de confiança, não garantia |

---

## 💻 No curso

Aula conceitual, sem projeto no repositório. A aula apresenta o ecossistema de fontes que vai sustentar o resto da disciplina e que reaparece no PDF de indicações de leitura (13 indicações, resumidas no README desta pasta).

---

## 🔗 Para ir além
- [Indicação 7: NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [Indicação 9: NIST SP 1270, identificar e gerenciar viés em IA](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1270.pdf)
- [Indicação 1: OWASP Top 10 para LLM e IA Generativa (2025, em português)](https://genai.owasp.org/resource/owasp-top-10-para-aplicacoes-de-llm-e-ia-generativa-2025/)
- [Indicação 5: MIT AI Risk Repository](https://airisk.mit.edu/)
- [Indicação 4: Machine Learning for High-Risk Applications (repositório do livro)](https://github.com/ml-for-high-risk-apps-book/Machine-Learning-for-High-Risk-Applications-Book)
- [Google Scholar](https://scholar.google.com/)
- [arXiv](https://arxiv.org/)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia)

---

⬅️ [00 · Governança de IA: pilares, riscos e por onde começar](./00-governanca-de-ia.md)  ·  [02 · Trustworthy AI, interpretabilidade e explicabilidade](./02-trustworthy-ai-interpretabilidade-explicabilidade.md) ➡️
