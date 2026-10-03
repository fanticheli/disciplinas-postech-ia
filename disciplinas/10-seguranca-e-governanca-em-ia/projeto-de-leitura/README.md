# 🛡️ Segurança e Governança em IA — Guia de Leitura

> Resumo organizado da **Disciplina 10** da pós de Engenharia de IA Aplicada (autoria: **Jéssica da Silva Costa**).
> Cada assunto é explicado em **duas camadas**: 👵 *para a vovó* (analogias do mundo real) e 🔧 *tecnicamente* (nível sênior). Esta é uma disciplina majoritariamente teórica: o repositório do curso tem só dois PDFs e um notebook, absorvidos nos tópicos 05, 09 e 10; nos demais, a seção final é **💻 No curso**.

---

## 🗺️ Como usar este guia

Cada arquivo é auto-contido e segue sempre a mesma estrutura:

| Seção | Para quê serve |
|-------|----------------|
| 🎯 **Em uma frase** | O conceito destilado |
| 👵 **Explicando para a vovó** | Analogia do mundo real, sem jargão |
| 🔧 **Tecnicamente** | O que é, como funciona, onde aplicar, vantagens e limites, armadilhas |
| 🧩 **Cola rápida** | Glossário dos termos-chave |
| 💻 **No código do repo** ou **No curso** | Fluxo, como rodar e achados do material do repo (quando há); senão, o que a aula fez na prática |
| 🔗 **Para ir além** | Links de referência vindos da apostila, das indicações e do README do repo |

---

## 🧭 Trilha de leitura sugerida

A ordem respeita a apostila: governança e explicabilidade, vieses e ética, segurança, regulação, custos (financeiros e ambientais) e revisão.

### Bloco 1 — Fundamentos e explicabilidade
- [00 · Governança de IA: pilares, riscos e por onde começar](./00-governanca-de-ia.md)
- [01 · Fontes de materiais: framework, repositório de riscos, Scholar e arXiv](./01-fontes-e-leitura-critica.md)
- [02 · Trustworthy AI, interpretabilidade e explicabilidade](./02-trustworthy-ai-interpretabilidade-explicabilidade.md)
- [03 · SHAP, LIME e Integrated Gradients](./03-shap-lime-integrated-gradients.md)

### Bloco 2 — Vieses, responsabilidade e ética
- [04 · Vieses em IA: tipos, origens e mitigação](./04-vieses-em-ia.md)
- [05 · IA responsável e o caso da triagem hospitalar](./05-ia-responsavel-e-caso-triagem.md)
- [06 · Aspectos humanos e desafios éticos: do caso da inadimplência ao NIST](./06-aspectos-humanos-e-desafios-eticos.md)

### Bloco 3 — Segurança em IA
- [07 · Segurança em IA: o novo cenário e o OWASP Top 10 para LLMs](./07-owasp-top-10-llm-novo-cenario.md)
- [08 · Cinco casos de segurança em IA e a correlação com o OWASP](./08-cinco-casos-de-seguranca-owasp.md)
- [09 · Prompt injection, jailbreaking, guardrails e segredos](./09-prompt-injection-jailbreaking-guardrails.md)
- [10 · Pentest, Red Team, Blue Team e Purple Team em IA](./10-pentest-red-blue-purple-team.md)

### Bloco 4 — Regulação e geopolítica
- [11 · Por que regular IA: interesses, dilema de Collingridge e lobby](./11-por-que-regular-collingridge-e-lobby.md)
- [12 · Tipos de regulação e o EU AI Act: princípios, regras e classificação por risco](./12-tipos-de-regulacao-e-eu-ai-act.md)
- [13 · Geopolítica da IA, Efeito Bruxelas e o cenário brasileiro](./13-geopolitica-efeito-bruxelas-e-brasil.md)

### Bloco 5 — Custos financeiros e ambientais
- [14 · Custos financeiros de IA: CAPEX/OPEX, API versus infraestrutura própria e como reduzir](./14-custos-financeiros-capex-opex-e-reducao.md)
- [15 · Custo ambiental: onde ficam os data centers, cabos, água e matriz energética](./15-custo-ambiental-data-centers-e-energia.md)
- [16 · Treinamento, inferência, refrigeração, PUE e o dilema água versus energia](./16-treinamento-inferencia-refrigeracao-pue-agua-ou-energia.md)

### Bloco 6 — Revisão integrada
- [17 · Revisão integrada: o que fica para a prática profissional](./17-revisao-integrada.md)

---

## ✅ Cobertura aula a aula (Disciplina 10)

| Unidade · Aula da apostila | Documento |
|----------------------------|-----------|
| Introdução da disciplina e mapa | Seção [Mentalidade da disciplina](#-mentalidade-da-disciplina) deste README e [00 · Governança de IA: pilares, riscos e por onde começar](./00-governanca-de-ia.md) |
| U1 · Aula 1 · Governança de IA | [00 · Governança de IA: pilares, riscos e por onde começar](./00-governanca-de-ia.md) |
| U1 · Aula 2 · Fontes de Materiais | [01 · Fontes de materiais: framework, repositório de riscos, Scholar e arXiv](./01-fontes-e-leitura-critica.md) |
| U2 · Aula 3 · Interpretabilidade e Explicabilidade, Parte 1 | [02 · Trustworthy AI, interpretabilidade e explicabilidade](./02-trustworthy-ai-interpretabilidade-explicabilidade.md) |
| U2 · Aula 4 · Interpretabilidade e Explicabilidade, Parte 2 | [03 · SHAP, LIME e Integrated Gradients](./03-shap-lime-integrated-gradients.md) |
| U3 · Aula 5 · Vieses em IA | [04 · Vieses em IA: tipos, origens e mitigação](./04-vieses-em-ia.md) |
| U3 · Aula 6 · Responsabilidade em IA | [05 · IA responsável e o caso da triagem hospitalar](./05-ia-responsavel-e-caso-triagem.md) |
| U3 · Aula 7 · Aspectos Humanos e Éticos | [06 · Aspectos humanos e desafios éticos: do caso da inadimplência ao NIST](./06-aspectos-humanos-e-desafios-eticos.md) |
| U3 · Aula 8 · Desafios Éticos | [06 · Aspectos humanos e desafios éticos: do caso da inadimplência ao NIST](./06-aspectos-humanos-e-desafios-eticos.md) |
| U4 · Aula 9 · Introdução a Segurança e Dados | [07 · Segurança em IA: o novo cenário e o OWASP Top 10 para LLMs](./07-owasp-top-10-llm-novo-cenario.md) |
| U4 · Aula 10 · Casos de Segurança em IA | [08 · Cinco casos de segurança em IA e a correlação com o OWASP](./08-cinco-casos-de-seguranca-owasp.md) (slides com casos), [09 · Prompt injection, jailbreaking, guardrails e segredos](./09-prompt-injection-jailbreaking-guardrails.md) e [10 · Pentest, Red Team, Blue Team e Purple Team em IA](./10-pentest-red-blue-purple-team.md) |
| U4 · Aula 11 · Segurança em IA | [08 · Cinco casos de segurança em IA e a correlação com o OWASP](./08-cinco-casos-de-seguranca-owasp.md) (slides com casos), [09 · Prompt injection, jailbreaking, guardrails e segredos](./09-prompt-injection-jailbreaking-guardrails.md) e [10 · Pentest, Red Team, Blue Team e Purple Team em IA](./10-pentest-red-blue-purple-team.md) |
| U5 · Aula 12 · Aspectos Regulatórios, Parte 1 | [11 · Por que regular IA: interesses, dilema de Collingridge e lobby](./11-por-que-regular-collingridge-e-lobby.md) |
| U5 · Aula 13 · Aspectos Regulatórios, Parte 2 | [12 · Tipos de regulação e o EU AI Act: princípios, regras e classificação por risco](./12-tipos-de-regulacao-e-eu-ai-act.md) |
| U5 · Aula 14 · Aspectos Geopolíticos | [13 · Geopolítica da IA, Efeito Bruxelas e o cenário brasileiro](./13-geopolitica-efeito-bruxelas-e-brasil.md) |
| U6 · Aula 15 · Custos Financeiros com IA | [14 · Custos financeiros de IA: CAPEX/OPEX, API versus infraestrutura própria e como reduzir](./14-custos-financeiros-capex-opex-e-reducao.md) |
| U6 · Aula 16 · Custos Financeiros com IA, Parte 2 | [14 · Custos financeiros de IA: CAPEX/OPEX, API versus infraestrutura própria e como reduzir](./14-custos-financeiros-capex-opex-e-reducao.md) |
| U7 · Aula 17 · Custo Ambiental: Analisando Dados | [15 · Custo ambiental: onde ficam os data centers, cabos, água e matriz energética](./15-custo-ambiental-data-centers-e-energia.md) |
| U7 · Aula 18 · Custos de um data center | [16 · Treinamento, inferência, refrigeração, PUE e o dilema água versus energia](./16-treinamento-inferencia-refrigeracao-pue-agua-ou-energia.md) |
| U7 · Aula 19 · Gastar Água ou Energia? | [16 · Treinamento, inferência, refrigeração, PUE e o dilema água versus energia](./16-treinamento-inferencia-refrigeracao-pue-agua-ou-energia.md) |
| U8 · Aula 20 · Revisão | [17 · Revisão integrada: o que fica para a prática profissional](./17-revisao-integrada.md) |

> As 20 aulas da apostila (8 unidades) estão cobertas em 18 documentos. Os slides do curso seguem outra numeração (Aulas 1 a 7, Custos Ambientais e Revisão); a correspondência está na tabela a seguir.

### Slides oficiais

| Slides | Aulas da apostila | Documento | Leitura dos slides |
|--------|-------------------|-----------|--------------------|
| Aula 1 · Governança de IA | 1 e 2 | [00 · Governança de IA: pilares, riscos e por onde começar](./00-governanca-de-ia.md) | Arquivo criptografado, não lido |
| Aula 2 · Interpretabilidade e Explicabilidade | 3 e 4 | [02 · Trustworthy AI, interpretabilidade e explicabilidade](./02-trustworthy-ai-interpretabilidade-explicabilidade.md) e [03 · SHAP, LIME e Integrated Gradients](./03-shap-lime-integrated-gradients.md) | Arquivo criptografado, não lido |
| Aula 3 · Vieses e Responsabilidade | 5 e 6 | [04 · Vieses em IA: tipos, origens e mitigação](./04-vieses-em-ia.md) e [05 · IA responsável e o caso da triagem hospitalar](./05-ia-responsavel-e-caso-triagem.md) | Arquivo criptografado, não lido |
| Aula 4 · Riscos: Aspectos Humanos e Éticos | 7 e 8 | [06 · Aspectos humanos e desafios éticos: do caso da inadimplência ao NIST](./06-aspectos-humanos-e-desafios-eticos.md) | Arquivo criptografado, não lido |
| Aula 5 · Riscos: Segurança e Dados | 9 a 11 | [07 · Segurança em IA: o novo cenário e o OWASP Top 10 para LLMs](./07-owasp-top-10-llm-novo-cenario.md) a [10 · Pentest, Red Team, Blue Team e Purple Team em IA](./10-pentest-red-blue-purple-team.md) | Lido (cinco casos OWASP) |
| Aula 6 · Riscos: Aspectos Regulatórios | 12 a 14 | [11 · Por que regular IA: interesses, dilema de Collingridge e lobby](./11-por-que-regular-collingridge-e-lobby.md) a [13 · Geopolítica da IA, Efeito Bruxelas e o cenário brasileiro](./13-geopolitica-efeito-bruxelas-e-brasil.md) | Lido |
| Aula 7 · Custos em IA | 15 e 16 | [14 · Custos financeiros de IA: CAPEX/OPEX, API versus infraestrutura própria e como reduzir](./14-custos-financeiros-capex-opex-e-reducao.md) | Arquivo criptografado, não lido |
| Custos Ambientais da IA | 17 a 19 | [15 · Custo ambiental: onde ficam os data centers, cabos, água e matriz energética](./15-custo-ambiental-data-centers-e-energia.md) e [16 · Treinamento, inferência, refrigeração, PUE e o dilema água versus energia](./16-treinamento-inferencia-refrigeracao-pue-agua-ou-energia.md) | Lido |
| Revisão | 20 | [17 · Revisão integrada: o que fica para a prática profissional](./17-revisao-integrada.md) | Lido |

Os slides marcados como criptografados estão protegidos no pacote de material (formato de documento protegido, não abrem com python-pptx). O conteúdo desses temas vem da apostila, que cobre as mesmas aulas de ponta a ponta.

---

## 🧪 Código do repositório absorvido

A pasta `modulo10-seguranca-governanca-ia` tem um `README.md`, duas subpastas e três arquivos de conteúdo. Nada foi deixado de fora.

| Arquivo no GitHub | Onde está neste guia |
|-------------------|----------------------|
| `README.md` (professora, lista de arquivos e ferramentas sugeridas: Fairlearn e mapas de data centers) | [04 · Vieses em IA: tipos, origens e mitigação](./04-vieses-em-ia.md) e [15 · Custo ambiental: onde ficam os data centers, cabos, água e matriz energética](./15-custo-ambiental-data-centers-e-energia.md) |
| `modulo4-aspectos-humanos-eticos/Estudo_de_Caso_Responsabilidade_IA_Atualizado.pdf` | [05 · IA responsável e o caso da triagem hospitalar](./05-ia-responsavel-e-caso-triagem.md) |
| `modulo5-seguranca-dados/Demonstração.ipynb` (prompt injection indireto e jailbreaking) | [09 · Prompt injection, jailbreaking, guardrails e segredos](./09-prompt-injection-jailbreaking-guardrails.md) |
| `modulo5-seguranca-dados/manual_seguranca_aula.pdf` (Pentest, Red Team, Blue Team, Purple Team) | [10 · Pentest, Red Team, Blue Team e Purple Team em IA](./10-pentest-red-blue-purple-team.md) |

Também há links por módulo na seção "Modulo 10" do README raiz do repositório; eles estão distribuídos em "Para ir além" dos tópicos correspondentes.

---

## 🎓 Mentalidade da disciplina

A introdução e a revisão final da apostila resumem o fio condutor:

- **Tecnologia não é só técnica:** é construída por pessoas, aplicada em organizações e produz impacto sobre outras pessoas ([00](./00-governanca-de-ia.md)).
- **Governança é prática e começa na concepção**, acompanha todo o ciclo de vida e continua depois do deploy ([00](./00-governanca-de-ia.md), [17](./17-revisao-integrada.md)).
- **Interpretabilidade e explicabilidade não são a mesma coisa**, e explicar uma decisão é parte da responsabilidade ([02](./02-trustworthy-ai-interpretabilidade-explicabilidade.md), [03](./03-shap-lime-integrated-gradients.md)).
- **Viés é distorção sistemática** que nasce antes do modelo; acurácia alta pode ser uma solução ruim ([04](./04-vieses-em-ia.md), [05](./05-ia-responsavel-e-caso-triagem.md), [06](./06-aspectos-humanos-e-desafios-eticos.md)).
- **Em IA os riscos de segurança mudam de lugar**: dados de treino, prompts e autonomia dos agentes; guardrail é camada, não arquitetura ([07](./07-owasp-top-10-llm-novo-cenario.md) a [10](./10-pentest-red-blue-purple-team.md)).
- **Regulação é negociação sob incerteza**; o AI Act regula o caso de uso por risco e o Efeito Bruxelas espalha o padrão ([11](./11-por-que-regular-collingridge-e-lobby.md) a [13](./13-geopolitica-efeito-bruxelas-e-brasil.md)).
- **Custo e ambiente também são arquitetura**: tokens, API versus infra própria, PUE, água versus energia ([14](./14-custos-financeiros-capex-opex-e-reducao.md) a [16](./16-treinamento-inferencia-refrigeracao-pue-agua-ou-energia.md)).
- **O ser humano permanece no centro**; raciocínio crítico, fontes originais e proatividade são a competência central ([17](./17-revisao-integrada.md)).

---

## 🧰 Materiais oficiais da disciplina

- **Repositório de código:** https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia
- **Conteúdo do módulo:** README, `modulo4-aspectos-humanos-eticos` (PDF de estudo de caso), `modulo5-seguranca-dados` (manual em PDF e notebook de demonstração)
- **Slides:** 9 apresentações (Aulas 1 a 7, Custos Ambientais, Revisão); 4 legíveis e 5 criptografadas

### Indicações de leitura complementar (PDF oficial)

1. **OWASP Top 10 para Aplicações de LLM e IA Generativa (2025).** Principais riscos em LLMs segundo a OWASP; o original em inglês sai antes e a tradução depois. Relaciona-se com [07](./07-owasp-top-10-llm-novo-cenario.md) e [08](./08-cinco-casos-de-seguranca-owasp.md). https://genai.owasp.org/resource/owasp-top-10-para-aplicacoes-de-llm-e-ia-generativa-2025/
2. **OWASP Top 10 for Agentic Applications for 2026.** Material de 2026 da OWASP focado em aplicações de agentes. Relaciona-se com [07](./07-owasp-top-10-llm-novo-cenario.md). https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
3. **GenAI Red Teaming Guide (OWASP, 2025).** Orientações de Red Teaming nas organizações. Relaciona-se com [10](./10-pentest-red-blue-purple-team.md). https://genai.owasp.org/resource/genai-red-teaming-guide/
4. **Machine Learning for High-Risk Applications** (Patrick Hall, James Curtis, Parul Pandey, O'Reilly, 2023). Um dos principais livros do módulo: vieses, explicabilidade e riscos, com visão importante sobre adoção de IA. Relaciona-se com [01](./01-fontes-e-leitura-critica.md), [04](./04-vieses-em-ia.md) e [05](./05-ia-responsavel-e-caso-triagem.md). https://www.oreilly.com/library/view/machine-learning-for/9781098102425/colophon01.html (repositório: https://github.com/ml-for-high-risk-apps-book/Machine-Learning-for-High-Risk-Applications-Book)
5. **MIT AI Risk Repository.** Banco com mais de 1700 riscos extraídos de 74 frameworks, taxonomia causal (como, quando e por que ocorrem) e taxonomia de domínios (7 domínios e 24 subdomínios). Relaciona-se com [01](./01-fontes-e-leitura-critica.md). https://airisk.mit.edu/
6. **A Practical Guide for Secure MCP Server Development (OWASP, 2026).** Desenvolvimento seguro de servidores MCP. Relaciona-se com [07](./07-owasp-top-10-llm-novo-cenario.md). https://genai.owasp.org/resource/a-practical-guide-for-secure-mcp-server-development/
7. **NIST AI Risk Management Framework.** Framework de gestão de riscos de IA do NIST. Relaciona-se com [00](./00-governanca-de-ia.md), [01](./01-fontes-e-leitura-critica.md) e [06](./06-aspectos-humanos-e-desafios-eticos.md). https://www.nist.gov/itl/ai-risk-management-framework
8. **Lei da UE sobre IA: primeira regulamentação de inteligência artificial** (Parlamento Europeu). Relaciona-se com [12](./12-tipos-de-regulacao-e-eu-ai-act.md). https://www.europarl.europa.eu/topics/pt/article/20230601STO93804/lei-da-ue-sobre-ia-primeira-regulamentacao-de-inteligencia-artificial
9. **Towards a Standard for Identifying and Managing Bias in Artificial Intelligence** (NIST SP 1270). Identificação e gerenciamento de vieses. Relaciona-se com [04](./04-vieses-em-ia.md). https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1270.pdf
10. **The silicon gaze: A typology of biases and inequality in LLMs through the lens of place.** Estudo de Oxford sobre vieses regionais no ChatGPT. Relaciona-se com [06](./06-aspectos-humanos-e-desafios-eticos.md). https://journals.sagepub.com/doi/full/10.1177/29768624251408919
11. **Artificial intelligence policy worldwide: a comparative analysis.** Comparação de políticas de regulação de IA em várias regiões. Relaciona-se com [11](./11-por-que-regular-collingridge-e-lobby.md) e [12](./12-tipos-de-regulacao-e-eu-ai-act.md). https://royalsocietypublishing.org/rsos/article/13/2/242234/480264/Artificial-intelligence-policy-worldwide-a
12. **The EU Artificial Intelligence Act** (site). Legislação de IA da União Europeia. Relaciona-se com [12](./12-tipos-de-regulacao-e-eu-ai-act.md). https://artificialintelligenceact.eu/
13. **CAPEX (Capital Expenditure): o que é, significado e definição** (B3). Explica Capex e Opex. Relaciona-se com [14](./14-custos-financeiros-capex-opex-e-reducao.md). https://borainvestir.b3.com.br/glossario/capex-capital-expenditure/
13 (repetida no PDF). **Data centre water consumption** (Nature). Consumo de água em data centers. Relaciona-se com [16](./16-treinamento-inferencia-refrigeracao-pue-agua-ou-energia.md). https://www.nature.com/articles/s41545-021-00101-w

---

*Guia gerado a partir da apostila oficial (166 págs, 20 aulas), das indicações de leitura, dos slides legíveis e do repositório da disciplina.*
