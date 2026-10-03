# 📚 Ferramentas de IA para Gestão de Projetos: Guia de Leitura

> Resumo organizado da **Disciplina 07** da pós de Engenharia de IA Aplicada (autoria: **José Ahirton Batista Lopes Filho**).
> Cada assunto é explicado em **duas camadas**: 👵 *para a vovó* (analogias do mundo real) e 🔧 *tecnicamente* (nível sênior), e fecha com o que existe **no código do repositório** do curso (prompts, dados, scripts e o submódulo de demo).

---

## 🗺️ Como usar este guia

Cada arquivo é auto-contido e segue sempre a mesma estrutura:

| Seção | Para quê serve |
|-------|----------------|
| 🎯 **Em uma frase** | O conceito destilado |
| 👵 **Explicando para a vovó** | Analogia do mundo real, sem jargão |
| 🔧 **Tecnicamente** | O que é, como funciona, onde aplicar, vantagens e limites, armadilhas |
| 🧩 **Cola rápida** | Glossário dos termos-chave |
| 💻 **No código do repo** | Fluxo por arquivo, como rodar e achados (bugs e inconsistências) de cada módulo. Quando não há projeto, a seção vira **No curso** |
| 🔗 **Para ir além** | Links de referência |

Esta disciplina não tem pares template e -z. Os projetos são pastas de prompts, dados e outputs de referência (uma por módulo), com poucos scripts executáveis; onde rodei algo, o tópico diz o que aconteceu.

---

## 🧭 Trilha de leitura sugerida

A ordem segue a apostila: do caso e do escopo à priorização e ao planejamento, depois execução, governança e automação, até a estratégia.

### Bloco 1: Visão geral e o caso RouteWise
- [00 · IA como copiloto de gestão de projetos e o caso RouteWise](./00-ia-copiloto-e-caso-routewise.md) (~7 min)

### Bloco 2: Descoberta e escopo (Unidade 1)
- [01 · Requirements Copilot: o system prompt como contrato de comportamento](./01-requirements-copilot-system-prompt-como-contrato.md) (~8 min)
- [02 · Curadoria de requisitos: as quatro alucinações e o backlog no Jira](./02-curadoria-de-requisitos-e-backlog-no-jira.md) (~6 min)

### Bloco 3: Priorizar, planejar e estimar (Unidades 2 a 4)
- [03 · Priorização com dados: HiPPO, MoSCoW, RICE e WSJF](./03-priorizacao-hippo-moscow-rice-wsjf.md) (~7 min)
- [04 · Backlog Scorer: contexto rico, flags e calibração com dados reais](./04-backlog-scorer-contexto-flags-e-calibracao.md) (~8 min)
- [05 · Cronograma adaptativo: dependências, capacidade real e what-if](./05-cronograma-adaptativo-dependencias-capacidade-what-if.md) (~7 min)
- [06 · Estimativas com três pontos e PERT: sair da data única](./06-estimativas-tres-pontos-e-pert.md) (~6 min)
- [07 · Monte Carlo: prazo como probabilidade (P50, P85, P95)](./07-monte-carlo-p50-p85-p95.md) (~7 min)

### Bloco 4: Monitorar e documentar a execução (Unidades 5 a 7)
- [08 · AIOps de projeto: métricas de fluxo e o Risk Monitor](./08-aiops-de-projeto-metricas-de-fluxo-e-risk-monitor.md) (~7 min)
- [09 · Meeting Digest: ata, ações e cards Jira a partir da transcrição](./09-meeting-digest-ata-acoes-e-cards-jira.md) (~7 min)
- [10 · Status Reports: os mesmos dados em três audiências](./10-status-reports-tres-audiencias.md) (~7 min)

### Bloco 5: Governança e automação (Unidades 8 e 9)
- [11 · Governança como código e Compliance Checklist dinâmico](./11-governanca-como-codigo-e-compliance-checklist.md) (~7 min)
- [12 · Danger: regras de conformidade no pipeline (JS, Python e repositório demo)](./12-danger-regras-de-conformidade-no-pipeline.md) (~8 min)
- [13 · NL to Workflow: do Slack ao Jira com parser de linguagem natural](./13-nl-to-workflow-slack-jira.md) (~8 min)

### Bloco 6: Estratégia e fechamento (Unidade 10)
- [14 · OKRs, alinhamento de backlog e scorecard de portfólio](./14-okrs-alinhamento-de-backlog-e-portfolio.md) (~8 min)
- [15 · Fechamento: curadoria final, armadilhas de OKR e a cadeia completa](./15-fechamento-curadoria-final-e-cadeia-completa.md) (~6 min)

---

## ✅ Cobertura aula a aula (Disciplina 07)

| Unidade · Aula da apostila | Documento |
|----------------------------|-----------|
| Introdução da disciplina | [00 · IA como copiloto de gestão de projetos e o caso RouteWise](./00-ia-copiloto-e-caso-routewise.md) |
| Mapa da disciplina e Mapa do GitHub | [00 · IA como copiloto de gestão de projetos e o caso RouteWise](./00-ia-copiloto-e-caso-routewise.md) |
| U1 · Aula 1 · Planejamento e Escopo com IA (PT-1): crise do escopo, Requirements Copilot | [01 · Requirements Copilot: o system prompt como contrato de comportamento](./01-requirements-copilot-system-prompt-como-contrato.md) |
| U1 · Aula 2 · (PT-2): system prompt como contrato, INVEST, Gherkin, protocolo de ambiguidade, mapa de domínios | [01 · Requirements Copilot: o system prompt como contrato de comportamento](./01-requirements-copilot-system-prompt-como-contrato.md) |
| U1 · Aula 3 · (PT-3): curadoria, quatro tipos de alucinação, log de curadoria | [02 · Curadoria de requisitos: as quatro alucinações e o backlog no Jira](./02-curadoria-de-requisitos-e-backlog-no-jira.md) |
| U2 · Aula 1 · Priorização Inteligente de Backlog (PT-1): HiPPO, RICE, WSJF, MoSCoW | [03 · Priorização com dados: HiPPO, MoSCoW, RICE e WSJF](./03-priorizacao-hippo-moscow-rice-wsjf.md) |
| U2 · Aula 2 · (PT-2): Backlog Scorer, flags e curadoria do ranking | [04 · Backlog Scorer: contexto rico, flags e calibração com dados reais](./04-backlog-scorer-contexto-flags-e-calibracao.md) |
| U2 · Aula 3 · (PT-3): calibração (analytics, pesquisa, financeiro), cold start, analogia | [04 · Backlog Scorer: contexto rico, flags e calibração com dados reais](./04-backlog-scorer-contexto-flags-e-calibracao.md) |
| U3 · Aula 1 · Cronograma, Capacidade e Alocação Assistidos (PT-1): dependências, caminho crítico, what-if | [05 · Cronograma adaptativo: dependências, capacidade real e what-if](./05-cronograma-adaptativo-dependencias-capacidade-what-if.md) |
| U3 · Aula 2 · (PT-2): Scheduling Prompt, capacidade real, cronograma RouteWise | [05 · Cronograma adaptativo: dependências, capacidade real e what-if](./05-cronograma-adaptativo-dependencias-capacidade-what-if.md) |
| U4 · Aula 1 · Estimativas e Previsões (PT-1): planning fallacy, três pontos, PERT | [06 · Estimativas com três pontos e PERT: sair da data única](./06-estimativas-tres-pontos-e-pert.md) |
| U4 · Aula 2 · (PT-2): Monte Carlo, P50/P85/P95, comunicação por público | [07 · Monte Carlo: prazo como probabilidade (P50, P85, P95)](./07-monte-carlo-p50-p85-p95.md) |
| U5 · Aula 1 · Riscos e Mitigações com AIOps de Projeto (PT-1): AIOps, quatro métricas, dashboard de saúde | [08 · AIOps de projeto: métricas de fluxo e o Risk Monitor](./08-aiops-de-projeto-metricas-de-fluxo-e-risk-monitor.md) |
| U5 · Aula 2 · (PT-2): Risk Monitor, cockpit, mitigação, fadiga de alertas | [08 · AIOps de projeto: métricas de fluxo e o Risk Monitor](./08-aiops-de-projeto-metricas-de-fluxo-e-risk-monitor.md) |
| U6 · Aula 1 · Reuniões Turbinadas (PT-1): síntese semântica, quatro classificações | [09 · Meeting Digest: ata, ações e cards Jira a partir da transcrição](./09-meeting-digest-ata-acoes-e-cards-jira.md) |
| U6 · Aula 2 · (PT-2): curadoria da ata, auditoria em cinco passos | [09 · Meeting Digest: ata, ações e cards Jira a partir da transcrição](./09-meeting-digest-ata-acoes-e-cards-jira.md) |
| U7 · Aula 1 · Status Reports e Executive Summaries (PT-1): relatório adaptativo, três audiências | [10 · Status Reports: os mesmos dados em três audiências](./10-status-reports-tres-audiencias.md) |
| U7 · Aula 2 · (PT-2): curadoria, status vermelho ou amarelo, portfólio | [10 · Status Reports: os mesmos dados em três audiências](./10-status-reports-tres-audiencias.md) |
| U8 · Aula 1 · Governança, Compliance e Qualidade (PT-1): governança como código, trilha de auditoria | [11 · Governança como código e Compliance Checklist dinâmico](./11-governanca-como-codigo-e-compliance-checklist.md) |
| U8 · Aula 2 · (PT-2): checklist de compliance (parte 1) e Danger JS e Python (parte 2) | [11 · Governança como código e Compliance Checklist dinâmico](./11-governanca-como-codigo-e-compliance-checklist.md) e [12 · Danger: regras de conformidade no pipeline (JS, Python e repositório demo)](./12-danger-regras-de-conformidade-no-pipeline.md) |
| U9 · Aula 1 · Automação de Boards e Comunicação (PT-1): conectadas versus integradas, NL to Workflow | [13 · NL to Workflow: do Slack ao Jira com parser de linguagem natural](./13-nl-to-workflow-slack-jira.md) |
| U9 · Aula 2 · (PT-2): parser no AI Studio, sincronização Jira e Slack, casos de borda | [13 · NL to Workflow: do Slack ao Jira com parser de linguagem natural](./13-nl-to-workflow-slack-jira.md) |
| U10 · Aula 1 · Portfólio e OKRs com IA (PT-1): output versus outcome, estrutura do OKR, backlog como hipótese | [14 · OKRs, alinhamento de backlog e scorecard de portfólio](./14-okrs-alinhamento-de-backlog-e-portfolio.md) |
| U10 · Aula 2 · (PT-2): operacionalização, OKR Aligner, sinais de cultura | [14 · OKRs, alinhamento de backlog e scorecard de portfólio](./14-okrs-alinhamento-de-backlog-e-portfolio.md) |
| U10 · Aula 3 · (PT-3): curadoria final, armadilhas, impacto em três dimensões, cadeia dos 10 artefatos | [15 · Fechamento: curadoria final, armadilhas de OKR e a cadeia completa](./15-fechamento-curadoria-final-e-cadeia-completa.md) |
| Revisões de cada unidade, revisão final e Anexo A (GitHub da disciplina) | [00 · IA como copiloto de gestão de projetos e o caso RouteWise](./00-ia-copiloto-e-caso-routewise.md) e [15 · Fechamento: curadoria final, armadilhas de OKR e a cadeia completa](./15-fechamento-curadoria-final-e-cadeia-completa.md) |

> As 23 aulas da apostila (10 unidades), mais introdução, revisões e anexo, estão cobertas em 16 documentos. U1 tem 3 aulas, U2 tem 3, U3 tem 2, U4 tem 2, U5 tem 2, U6 tem 2, U7 tem 2, U8 tem 2, U9 tem 2 e U10 tem 3.

### Slides usados para complementar a apostila

| Slides do módulo | Documento |
|------------------|-----------|
| 1.1, 1.2, 1.3 | [01](./01-requirements-copilot-system-prompt-como-contrato.md) e [02](./02-curadoria-de-requisitos-e-backlog-no-jira.md) |
| 2.1 | [03](./03-priorizacao-hippo-moscow-rice-wsjf.md) |
| 2.2, 2.3 | [04](./04-backlog-scorer-contexto-flags-e-calibracao.md) |
| 3.1, 3.2 | [05](./05-cronograma-adaptativo-dependencias-capacidade-what-if.md) |
| 4.1 | [06](./06-estimativas-tres-pontos-e-pert.md) |
| 4.2 | [07](./07-monte-carlo-p50-p85-p95.md) |
| 5.1, 5.2 | [08](./08-aiops-de-projeto-metricas-de-fluxo-e-risk-monitor.md) |
| 6.1, 6.2 | [09](./09-meeting-digest-ata-acoes-e-cards-jira.md) |
| 7.1, 7.2 | [10](./10-status-reports-tres-audiencias.md) |
| 8.1 | [11](./11-governanca-como-codigo-e-compliance-checklist.md) |
| 8.2 | [11](./11-governanca-como-codigo-e-compliance-checklist.md) e [12](./12-danger-regras-de-conformidade-no-pipeline.md) |
| 9.1, 9.2 | [13](./13-nl-to-workflow-slack-jira.md) |
| 10.1, 10.2 | [14](./14-okrs-alinhamento-de-backlog-e-portfolio.md) |
| 10.3 | [15](./15-fechamento-curadoria-final-e-cadeia-completa.md) |

---

## 🧪 Código do repositório absorvido

Todas as pastas do módulo 07 do repositório estão nas seções **💻 No código do repo** dos documentos, com fluxo por arquivo, como rodar e os achados (README desatualizado, números que não batem, bugs).

| Pasta ou arquivo no GitHub | Onde está neste guia |
|----------------------------|----------------------|
| Raiz do módulo (README, `.gitignore`, convenção de arquivos) | [00 · IA como copiloto de gestão de projetos e o caso RouteWise](./00-ia-copiloto-e-caso-routewise.md) |
| modulo-01 · `requirements-copilot-system-prompt.md`, `nota-adaptacao-modelos.md`, transcrição, output, Mermaid, PDFs | [01 · Requirements Copilot: o system prompt como contrato de comportamento](./01-requirements-copilot-system-prompt-como-contrato.md) |
| modulo-01 · `routewise-jira-import.csv`, guias de importação e de board, `jira-estado-board.md` | [02 · Curadoria de requisitos: as quatro alucinações e o backlog no Jira](./02-curadoria-de-requisitos-e-backlog-no-jira.md) |
| modulo-01 · `cena-logistica-carlos.wav` (não citado em nenhum documento) | [00 · IA como copiloto de gestão de projetos e o caso RouteWise](./00-ia-copiloto-e-caso-routewise.md) (seção de achados) |
| modulo-02-priorizacao-de-backlog | [04 · Backlog Scorer: contexto rico, flags e calibração com dados reais](./04-backlog-scorer-contexto-flags-e-calibracao.md) |
| modulo-03-cronograma-e-capacidade | [05 · Cronograma adaptativo: dependências, capacidade real e what-if](./05-cronograma-adaptativo-dependencias-capacidade-what-if.md) |
| modulo-04 · prompt de PERT e output | [06 · Estimativas com três pontos e PERT: sair da data única](./06-estimativas-tres-pontos-e-pert.md) |
| modulo-04 · `monte-carlo-routewise.js` e `.py` | [07 · Monte Carlo: prazo como probabilidade (P50, P85, P95)](./07-monte-carlo-p50-p85-p95.md) |
| modulo-05-riscos-e-aiops | [08 · AIOps de projeto: métricas de fluxo e o Risk Monitor](./08-aiops-de-projeto-metricas-de-fluxo-e-risk-monitor.md) |
| modulo-06-reunioes-turbinadas | [09 · Meeting Digest: ata, ações e cards Jira a partir da transcrição](./09-meeting-digest-ata-acoes-e-cards-jira.md) |
| modulo-07-status-reports | [10 · Status Reports: os mesmos dados em três audiências](./10-status-reports-tres-audiencias.md) |
| modulo-08 · compliance prompt e output | [11 · Governança como código e Compliance Checklist dinâmico](./11-governanca-como-codigo-e-compliance-checklist.md) |
| modulo-08 · Danger JS e Python, mocks, guia, output do dangerfile | [12 · Danger: regras de conformidade no pipeline (JS, Python e repositório demo)](./12-danger-regras-de-conformidade-no-pipeline.md) |
| modulo-08/routewise-danger-demo (submódulo) | [12 · Danger: regras de conformidade no pipeline (JS, Python e repositório demo)](./12-danger-regras-de-conformidade-no-pipeline.md) |
| modulo-09-automacao-de-ecossistema | [13 · NL to Workflow: do Slack ao Jira com parser de linguagem natural](./13-nl-to-workflow-slack-jira.md) |
| modulo-10-portfolio-e-okrs (prompt, outputs, board) | [14 · OKRs, alinhamento de backlog e scorecard de portfólio](./14-okrs-alinhamento-de-backlog-e-portfolio.md) |
| modulo-10 · Atividade e Exemplo finais | [14 · OKRs, alinhamento de backlog e scorecard de portfólio](./14-okrs-alinhamento-de-backlog-e-portfolio.md) e [15 · Fechamento: curadoria final, armadilhas de OKR e a cadeia completa](./15-fechamento-curadoria-final-e-cadeia-completa.md) |
| `Atividade` e `Exemplo - Módulo N.pdf` dos módulos 1 a 10 | [01](./01-requirements-copilot-system-prompt-como-contrato.md) e [04](./04-backlog-scorer-contexto-flags-e-calibracao.md) e [05](./05-cronograma-adaptativo-dependencias-capacidade-what-if.md) e [07](./07-monte-carlo-p50-p85-p95.md) e [08](./08-aiops-de-projeto-metricas-de-fluxo-e-risk-monitor.md) e [09](./09-meeting-digest-ata-acoes-e-cards-jira.md) e [10](./10-status-reports-tres-audiencias.md) e [11](./11-governanca-como-codigo-e-compliance-checklist.md) e [13](./13-nl-to-workflow-slack-jira.md) e [15](./15-fechamento-curadoria-final-e-cadeia-completa.md) (cada um no tópico do seu módulo) |

---

## 🎓 Mentalidade da disciplina

A introdução e a revisão final da apostila resumem o fio condutor:

- **A IA é copiloto, não substituta.** Organiza informação, acelera análises e automatiza o repetitivo; estratégia, prioridade, risco e interpretação de contexto continuam humanos ([00](./00-ia-copiloto-e-caso-routewise.md)).
- **O prompt é um contrato de comportamento.** Papel específico, INVEST, Gherkin verificável e protocolo de ambiguidade impedem o modelo de inventar o que ninguém disse ([01](./01-requirements-copilot-system-prompt-como-contrato.md), [02](./02-curadoria-de-requisitos-e-backlog-no-jira.md)).
- **Priorização, cronograma e prazo viram argumentos, não opiniões:** RICE, WSJF, capacidade real, what-if e percentis P50, P85, P95 ([03](./03-priorizacao-hippo-moscow-rice-wsjf.md) a [07](./07-monte-carlo-p50-p85-p95.md)).
- **Execução observável:** métricas de fluxo, atas estruturadas e relatórios por audiência preservam contexto e rastreabilidade ([08](./08-aiops-de-projeto-metricas-de-fluxo-e-risk-monitor.md), [09](./09-meeting-digest-ata-acoes-e-cards-jira.md), [10](./10-status-reports-tres-audiencias.md)).
- **Governança e integração no pipeline:** regras como código e automação que interpreta contexto, sempre com confirmação humana para o que é ambíguo ([11](./11-governanca-como-codigo-e-compliance-checklist.md), [12](./12-danger-regras-de-conformidade-no-pipeline.md), [13](./13-nl-to-workflow-slack-jira.md)).
- **Do output ao outcome:** backlog, Key Results e portfólio conectados, e curadoria como prática permanente ([14](./14-okrs-alinhamento-de-backlog-e-portfolio.md), [15](./15-fechamento-curadoria-final-e-cadeia-completa.md)).

Checklist de domínio (revisão final da apostila): explicar como uma transcrição vira backlog e por que a curadoria é necessária; comparar MoSCoW, RICE e WSJF; descrever como dependências, capacidade e what-if alteram o cronograma; explicar por que PERT e Monte Carlo tratam prazo como probabilidade; relacionar métricas de fluxo, anomalias e mitigação; mostrar como reuniões, relatórios e automação preservam contexto; explicar governança como código; e descrever como backlog, Key Results e portfólio se conectam.

---

## 🧰 Materiais oficiais da disciplina

- **Repositório de código:** https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos
- **Submódulo de demo do módulo 8:** https://github.com/unipds-engenharia-de-ia-aplicada/routewise-danger-demo
- **Pastas:** modulo-01-planejamento-e-escopo, modulo-02-priorizacao-de-backlog, modulo-03-cronograma-e-capacidade, modulo-04-estimativas-e-previsoes, modulo-05-riscos-e-aiops, modulo-06-reunioes-turbinadas, modulo-07-status-reports, modulo-08-governanca-e-compliance, modulo-09-automacao-de-ecossistema, modulo-10-portfolio-e-okrs
- **Stack do curso:** Google Gemini (AI Studio), Jira, Slack, Make.com, Node.js e Python, GitHub Actions e Danger.js
- **Professor:** Dr. José Ahirton Batista Lopes Filho

### Indicações de leitura complementar

O PDF de indicações tem três grupos. Os resumos abaixo seguem o próprio PDF; os links de arXiv foram montados a partir dos identificadores citados nele.

**1. Referências científicas e acadêmicas**

1. PMBOK Guide, 7ª ed. (PMI, 2021). A 7ª edição troca a abordagem por processos por princípios de entrega de valor e domínios de desempenho. Cobre planejamento, estimativas, riscos, stakeholders e mensuração, que os módulos operacionalizam com IA. Relevância: módulos 3, 4, 5 e 7.
2. Accelerate (Forsgren, Humble, Kim, 2018). Pesquisa quantitativa que identifica as métricas DORA (frequência de deploy, lead time, MTTR e taxa de falha de mudanças). Conecta-se aos indicadores de fluxo e à governança automatizada. Relevância: módulos 3, 5 e 8.
3. [A Prompt Pattern Catalog to Enhance Prompt Engineering with ChatGPT (White et al., 2023)](https://arxiv.org/abs/2302.11382). Cataloga padrões de prompt (persona, flipping interaction, chain-of-thought, template). Dá vocabulário para analisar os prompts do curso. Relevância: todos os módulos com demo de prompt.
4. [Language Models are Few-Shot Learners (Brown et al., 2020)](https://arxiv.org/abs/2005.14165). O artigo do GPT-3 sobre aprendizado com poucos exemplos; base técnica de por que os prompts funcionam.
5. [Chain-of-Thought Prompting Elicits Reasoning in LLMs (Wei et al., 2022)](https://arxiv.org/abs/2201.11903). Raciocinar passo a passo antes de responder melhora a precisão. Relevância: módulos 4, 5 e 10.
6. [A Systematic Survey of Prompt Engineering in LLMs (Sahoo et al., 2024)](https://arxiv.org/abs/2402.07927). Catálogo de técnicas (zero-shot, few-shot, CoT, self-consistency, tree-of-thought) com avaliação comparativa.
7. [Attention Is All You Need (Vaswani et al., 2017)](https://arxiv.org/abs/1706.03762). A arquitetura Transformer; explica por que o tamanho do prompt e a janela de contexto importam.
8. Measure What Matters (Doerr, 2018). Referência sobre OKRs: check-ins, output versus outcome e alinhamento estratégico. Base conceitual do módulo 10.
9. Thinking, Fast and Slow (Kahneman, 2011). Vieses cognitivos em estimativas (ancoragem, excesso de confiança, falácia do planejamento); base do módulo 4.
10. Scrum: The Art of Doing Twice the Work in Half the Time (Sutherland, 2014). Origem e princípios do Scrum; contexto para priorização, velocity e backlog (módulos 2 e 3).
11. The DevOps Handbook (Kim, Humble, Debois, Willis, 2016). Fluxo, feedback e aprendizado contínuo; contexto de DevOps para a governança como código (módulo 8).
12. [The Scrum Guide (Schwaber e Sutherland, 2020)](https://scrumguides.org). Guia normativo de papéis, eventos e artefatos do Scrum. Vocabulário ágil dos módulos 1, 2 e 3.
13. Agile Estimating and Planning (Cohn, 2005). Story points, velocity, planning poker e cone da incerteza; sustenta as estimativas probabilísticas do módulo 4.
14. Artificial Intelligence: A Modern Approach, 4ª ed. (Russell e Norvig, 2020). Texto-padrão de IA; contexto formal sobre capacidades e limites de LLMs e agentes.
15. Software Engineering, 10ª ed. (Sommerville, 2016). Engenharia de requisitos (critérios de aceite, histórias, rastreabilidade); base do módulo 1.

**2. Relatórios de mercado e da indústria (citados nos teleprompters do curso)**

1. [DORA, Accelerate State of DevOps 2024](https://dora.dev). Quatro métricas que separam times de alta performance. Citado no módulo 5.
2. PMI, Pulse of the Profession 2025. 2.841 profissionais; mesmo nas melhores equipes só 63% respeitam o cronograma e 73% o orçamento. Módulos 4 e 7.
3. [Microsoft WorkLab, Work Trend Index 2023](https://microsoft.com/en-us/worklab/work-trend-index). 57% do tempo de trabalho vai para comunicação e reuniões. Módulo 6.
4. [Asana, Anatomy of Work Index 2023](https://asana.com/resources/anatomy-of-work). 58% do tempo é overhead de coordenação e 42% é trabalho qualificado. Módulo 9.
5. Gartner, adoção e abandono de OKRs (2024). 70% das organizações abandonam OKRs no primeiro ano; a diferença está na cadência de acompanhamento. Módulo 10.
6. [IBM, Cost of a Data Breach 2025](https://ibm.com/reports/data-breach). Custo médio de US$ 4,44 milhões; US$ 3,89 milhões com DevSecOps maduro contra US$ 5,02 milhões com baixa automação. Módulo 8.
7. [Wellingtone, State of Project Management 2024](https://wellingtone.co.uk). 42% dos gestores gastam um dia por mês compilando status à mão. Módulo 7.
8. [ProductPlan, State of Product Management 2024](https://productplan.com/ebooks/2024-state-of-product-management-annual-report). 67% dos times veem prioridades desalinhadas como principal fonte de desperdício. Módulo 2.
9. [BCG, Unleashing the Power of OKRs (2024)](https://bcg.com/publications/2024/unleashing-the-power-of-okrs). OKRs falham pela falta de conexão entre objetivo e trabalho diário; cadência regular de check-in e alinhamento com o backlog se associam a melhor desempenho. Módulo 10.
10. [MIT NANDA, The GenAI Divide (2025)](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf). 95% das organizações sem retorno mensurável de IA; a lacuna de aprendizado é a barreira central. Módulo 1.
11. [BCG, The Widening AI Value Gap (2025)](https://bcg.com/publications/2025/are-you-generating-value-from-ai-the-widening-gap). 60% das empresas sem valor material com IA e só 5% operando em escala. Módulo 1.
12. [Gartner, AI Projects in I&O Stall Ahead of Meaningful ROI (2026)](https://gartner.com/en/newsroom/press-releases/2026-04-07-gartner-says-artificial-intelligence-projects-in-infrastructure-and-operations-stall-ahead-of-meaningful-roi-returns). Só 28% dos projetos de IA em I&O atingem o ROI esperado; 57% disseram ter esperado demais, rápido demais. Módulo 1.

**3. Vídeos no YouTube (buscar o título exato no canal indicado)**

1. Intro to Large Language Models (Andrej Karpathy, ~1 h). Como LLMs são treinados e geram texto token a token; ponto de partida para os módulos 1 a 5.
2. But what is a GPT? Visual intro to transformers (3Blue1Brown). Intuição visual da arquitetura Transformer; complementa Vaswani et al.
3. ChatGPT Prompt Engineering for Developers (DeepLearning.AI, ~1h30). Princípios de clareza, contexto, formato de saída, iteração e CoT. Disponível em deeplearning.ai/short-courses/.
4. What is Generative AI? (Google Cloud Tech, ~22 min). Nivelamento sobre IA generativa, fine-tuning, grounding e prompt design para quem tem pouca base técnica.
5. Agile Product Ownership in a Nutshell (Henrik Kniberg, ~15 min). Papel do PO, backlog, priorização e negociação de escopo; liga com os módulos 1 e 2.

---

*Guia gerado a partir da apostila oficial (101 págs), das indicações de leitura (9 págs), dos slides dos 10 módulos e do código do repositório do curso.*
