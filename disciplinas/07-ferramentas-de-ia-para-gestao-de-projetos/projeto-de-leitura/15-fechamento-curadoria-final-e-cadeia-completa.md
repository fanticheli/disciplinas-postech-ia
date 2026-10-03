# 15 · Fechamento: curadoria final, armadilhas de OKR e a cadeia completa

> **Unidade 10 · Aula 3 · Revisão final** · Leitura: ~6 min · Bloco: Estratégia e fechamento (Unidade 10)

## 🎯 Em uma frase
No encerramento, a disciplina insiste que **velocidade não elimina julgamento**: o modelo valida a estrutura, a relevância é da liderança, a classificação é **hipótese e não decisão** e dashboards só valem se geram ação. A **cadeia dos dez artefatos** mostra a IA como parte de um sistema de gestão, não como soluções isoladas.

---

## 👵 Explicando para a vovó

Quem aprende a dirigir com o piloto automático ligado não aprendeu a dirigir. O curso termina lembrando que a ferramenta muda, mas a habilidade de decidir para onde ir e quando intervir permanece.

E o sous-chef da primeira aula serve para ver como o jantar saiu de ponta a ponta: cada prato preparado passou pela mesma cozinha, e o chef provou todos.

---

## 🔧 Tecnicamente

### O que é
- **Validação estrutural não é validação de valor:** a IA confere mensurabilidade, prazo, baseline e dono do KR, mas um indicador pode estar bem escrito e medir algo irrelevante, e um KR simples pode representar uma transformação importante.
- **Análise de alinhamento decorativa:** classificar sem usar o resultado para revisar prioridades e discutir o backlog com os stakeholders é exercício burocrático. A classificação é ponto de partida: manter com justificativa, mover para iniciativas futuras ou revisar os OKRs.
- **Dashboards sem decisão:** um painel que só evidencia problemas vira registro visual da inércia. Todo item crítico precisa de responsável, prazo e mitigação.
- **OKR como avaliação individual:** se bônus e promoção dependem de KRs, as metas ficam conservadoras. OKRs funcionam melhor como instrumento de aprendizagem organizacional.
- **Excesso de objetivos:** a IA gera dezenas de OKRs em segundos, mas ninguém acompanha 20 ou 30 métricas. Foco e clareza ganham.
- **Impacto em três dimensões:** no encerramento, além de prazo, orçamento e escopo, registrar *entregas* (o que foi construído), *resultados* (o que mudou nos indicadores) e *aprendizado* (o que o time descobriu).
- **Relevance scoring como analogia:** quando o OKR Aligner compara cada User Story com os objetivos do projeto, ele faz algo parecido com a recuperação semântica: cada funcionalidade é uma consulta cuja relevância é medida contra o conjunto de objetivos. A IA não só automatiza tarefas, também relaciona artefatos com mais contexto do que a análise manual alcançaria.
- **Encerrar por hipóteses:** em vez de só conferir se tudo previsto foi construído, o fechamento registra quais hipóteses se confirmaram, quais decisões deram melhor resultado e que práticas entram nos próximos projetos.
- **A cadeia completa:** a reunião de 35 minutos virou, em ordem, User Stories e critérios verificáveis ([M1](./01-requirements-copilot-system-prompt-como-contrato.md)), prioridades justificadas ([M2](./04-backlog-scorer-contexto-flags-e-calibracao.md)), cronograma adaptativo ([M3](./05-cronograma-adaptativo-dependencias-capacidade-what-if.md)), intervalos de confiança ([M4](./07-monte-carlo-p50-p85-p95.md)), monitoramento de fluxo ([M5](./08-aiops-de-projeto-metricas-de-fluxo-e-risk-monitor.md)), atas e ações estruturadas ([M6](./09-meeting-digest-ata-acoes-e-cards-jira.md)), relatórios por audiência ([M7](./10-status-reports-tres-audiencias.md)), conformidade no pipeline ([M8](./12-danger-regras-de-conformidade-no-pipeline.md)), integração entre ferramentas ([M9](./13-nl-to-workflow-slack-jira.md)) e alinhamento com OKRs ([M10](./14-okrs-alinhamento-de-backlog-e-portfolio.md)).

### Como funciona
- **Revisão de domínio:** a apostila propõe oito perguntas-guia. Explique como uma transcrição vira backlog e por que a curadoria é necessária; compare MoSCoW, RICE e WSJF; descreva como dependências, capacidade e what-if alteram o cronograma; explique por que PERT e Monte Carlo tratam prazo como probabilidade; relacione métricas de fluxo, anomalias e mitigação; mostre como reuniões, relatórios e automação preservam contexto; explique governança como código; e descreva como backlog, KRs e portfólio se conectam.
- **Exercício final:** aplicar o OKR Aligner a um projeto próprio, interpretando as histórias não alinhadas como hipóteses; fazer o inventário das dez ferramentas (para cada uma, o contexto de uso mais provável) e registrar qual provoca mais resistência na organização. A apostila observa que as maiores resistências costumam apontar as maiores oportunidades.
- **Os problemas que o slide final diz resolvidos:** requisitos ambíguos ([M1](./01-requirements-copilot-system-prompt-como-contrato.md)), backlog sem priorização baseada em valor ([M2](./04-backlog-scorer-contexto-flags-e-calibracao.md)), cronogramas que viram ficção ([M3](./05-cronograma-adaptativo-dependencias-capacidade-what-if.md)), estimativas pontuais que todo mundo sabe que vão errar ([M4](./06-estimativas-tres-pontos-e-pert.md)), reuniões sem artefatos ([M6](./09-meeting-digest-ata-acoes-e-cards-jira.md)), relatórios para a audiência errada ([M7](./10-status-reports-tres-audiencias.md)), governança que ninguém segue ([M8](./11-governanca-como-codigo-e-compliance-checklist.md)), ferramentas que não se falam ([M9](./13-nl-to-workflow-slack-jira.md)) e estratégia desconectada da execução ([M10](./14-okrs-alinhamento-de-backlog-e-portfolio.md)). O título do slide diz 10 problemas, mas a lista mostra nove; o monitoramento de riscos (M5) não aparece nela.
- **O que dura:** modelos, interfaces e plataformas mudam; o que permanece é estruturar contexto, construir prompts consistentes, validar resultados, conhecer limitações dos modelos e saber quando o julgamento humano é indispensável.
- **O limite:** a IA não transforma um projeto desorganizado em um bem gerenciado; aplicada a processos inadequados, acelera documentos e decisões igualmente inadequados.
- **Próximo passo:** a disciplina seguinte, Arquitetura de Sistemas com IA, passa de usar IA para gerir projetos a projetar sistemas concebidos desde a origem com modelos inteligentes na arquitetura.

### Onde aplicar
- Fechar cada ciclo com a análise de entregas, resultados e aprendizado, e registrar onde o dado estava ausente e como capturá-lo no próximo ciclo.
- Escolher poucos OKRs, acompanhá-los com cadência e usá-los como filtro de priorização.
- Usar a reflexão «qual ferramenta mais me incomoda adotar?» para guiar o plano de mudança.

### Vantagens e limites
**Vantagens**
- Fecha o ciclo ligando execução, métricas e estratégia.
- Reforça a postura crítica diante do output da IA.
- O inventário converte o conteúdo do curso em plano de uso prático.

**Limites**
- Muito do fechamento depende de maturidade organizacional que a IA não cria.
- Análise de impacto exige dados de resultado que nem sempre existem.
- Os exemplos do caso são simulados.

### 🚫 Armadilhas
- Aplicar a cadeia a processos sem estrutura e esperar que a IA organize.
- Tratar a classificação de alinhamento como decisão definitiva.
- Medir OKR para punir, não para aprender.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Entrega, resultado, aprendizado | As três dimensões da análise de impacto de ciclo |
| Inventário das 10 ferramentas | Mapa de onde cada prompt seria usado no seu contexto |
| Segurança psicológica | Ambiente em que admitir um KR em risco é seguro; responsabilidade da liderança |
| Backlog de inovação | Destino de itens não alinhados que ainda têm valor |

---

## 💻 No curso

Este tópico não tem projeto próprio no repositório; o conteúdo vem da apostila, dos slides e da atividade do módulo.

- O slide 10.3 se intitula «5 Armadilhas dos OKRs com IA», mas lista três: OKRs escritos para parecer bons (validação estrutural sem relevância), análise de alinhamento usada como desempenho (itens não alinhados que não saem do backlog) e portfólio monitorado mas não gerenciado. As outras duas que a apostila acrescenta são OKR como avaliação individual e excesso de objetivos (acima).
- O mesmo slide mostra o RouteWise do MVP ao Enterprise: do MVP (6 User Stories, 2 OKRs, hardware bloqueado por 60 dias) a um produto com 27 features e 9 épicos, torre de controle 24x7 e conformidade ANTT e LGPD. A apostila descreve o próximo passo da trilha como arquitetura de sistemas com IA.
- `Atividade - Módulo 10.pdf` (atividade final): validar dois OKRs com a Parte A, alinhar o backlog completo (incluindo itens descartados) com a Parte B e decidir o destino de cada item não alinhado, escrever a análise de impacto em entrega, resultado e aprendizado, e entregar o inventário das dez ferramentas com uma frase de contexto para cada.
- `Exemplo - Módulo 10.pdf`: usa um ciclo simulado como encerrado (Q2/2025) com OKRs do RouteWise: KR1.1 de reduzir ocorrências de excesso de velocidade em 40% (baseline de 23 ocorrências por mês), KR1.2 de zerar multas não detectadas em tempo real, KR2.1 de gerar relatório semanal em menos de 5 minutos e KR2.2 de exportar 100% das ocorrências ao RH. O OKR Aligner apontou KR2.2 sem baseline e KR sem prazo.

---

## 🔗 Para ir além
- [Pasta do módulo 10 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-10-portfolio-e-okrs)
- [Repositório oficial do módulo 07 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos)
- [Relatório 9: BCG, Unleashing the Power of OKRs (2024)](https://bcg.com/publications/2024/unleashing-the-power-of-okrs)
- [Relatório 10: MIT NANDA, The GenAI Divide (2025)](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- [Relatório 11: BCG, The Widening AI Value Gap (2025)](https://bcg.com/publications/2025/are-you-generating-value-from-ai-the-widening-gap)
- [Relatório 12: Gartner, AI Projects in I&O Stall (2026)](https://gartner.com/en/newsroom/press-releases/2026-04-07-gartner-says-artificial-intelligence-projects-in-infrastructure-and-operations-stall-ahead-of-meaningful-roi-returns)
- [Indicação 3: A Prompt Pattern Catalog (White et al., 2023)](https://arxiv.org/abs/2302.11382)

---

⬅️ [14 · OKRs, alinhamento de backlog e scorecard de portfólio](./14-okrs-alinhamento-de-backlog-e-portfolio.md)  ·  [Guia de leitura](./README.md)
