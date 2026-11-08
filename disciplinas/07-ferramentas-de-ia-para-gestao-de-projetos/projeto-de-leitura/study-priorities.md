# 🎯 Disciplina 07 · O que vale estudar

> Análise de prioridade (opinião fundamentada no guia e na prática atual), não conteúdo da apostila. Premissas: leitor é engenheiro de software backend (TypeScript/Node e Python, APIs em nuvem, Postgres, filas e jobs), com LLMs em produção, automação de fluxos Jira/Slack e uso intenso de agentes de código; quer virar engenheiro de IA aplicada especialista (construir, avaliar, operar e governar), não pesquisador de modelos.

## Veredito
A disciplina é de gestão de projetos, e a maior parte dela é prompt sobre dados de projeto com revisão humana. O que se transfere de verdade para engenharia de IA é pouco, mas bom: NL to workflow com etapa de confirmação, saída estruturada com campo de confiança, digest de reunião com regras anti-invenção, previsão probabilística calculada por código (não pelo LLM) e governança de PR como regra executável. Nota: ⭐⭐⭐ (3 de 5), porque cerca de um terço do conteúdo (priorização, OKR, status report, cronograma) é gestão com IA como acessório, e os exemplos de código têm bugs que o próprio guia aponta. Mais útil para quem automatiza fluxos de time e precisa desenhar ferramentas de IA com humano no loop.

## Mapa de prioridade por tópico

| Tópico | Dia a dia | Especialista | Veredito |
|---|---|---|---|
| [00 · IA como copiloto e o caso RouteWise](./00-ia-copiloto-e-caso-routewise.md) | ⚪ | ⚪ | Pular |
| [01 · Requirements Copilot: system prompt como contrato](./01-requirements-copilot-system-prompt-como-contrato.md) | 🟡 | 🟡 | Conhecer |
| [02 · Curadoria de requisitos e backlog no Jira](./02-curadoria-de-requisitos-e-backlog-no-jira.md) | 🟡 | 🟡 | Conhecer |
| [03 · Priorização: HiPPO, MoSCoW, RICE, WSJF](./03-priorizacao-hippo-moscow-rice-wsjf.md) | ⚪ | ⚪ | Pular |
| [04 · Backlog Scorer: contexto, flags e calibração](./04-backlog-scorer-contexto-flags-e-calibracao.md) | ⚪ | 🟡 | Conhecer |
| [05 · Cronograma adaptativo e what-if](./05-cronograma-adaptativo-dependencias-capacidade-what-if.md) | ⚪ | ⚪ | Pular |
| [06 · Estimativas de três pontos e PERT](./06-estimativas-tres-pontos-e-pert.md) | 🟡 | ⚪ | Conhecer |
| [07 · Monte Carlo: P50, P85, P95](./07-monte-carlo-p50-p85-p95.md) | 🟡 | 🟡 | Aprofundar |
| [08 · AIOps de projeto e Risk Monitor](./08-aiops-de-projeto-metricas-de-fluxo-e-risk-monitor.md) | 🟢 | 🟡 | Implementar |
| [09 · Meeting Digest: ata, ações e cards](./09-meeting-digest-ata-acoes-e-cards-jira.md) | 🟢 | 🟡 | Implementar |
| [10 · Status Reports para três audiências](./10-status-reports-tres-audiencias.md) | 🟡 | ⚪ | Conhecer |
| [11 · Governança como código e Compliance Checklist](./11-governanca-como-codigo-e-compliance-checklist.md) | 🟡 | 🟡 | Conhecer |
| [12 · Danger: regras de conformidade no pipeline](./12-danger-regras-de-conformidade-no-pipeline.md) | 🟢 | 🟡 | Implementar |
| [13 · NL to Workflow: Slack para Jira](./13-nl-to-workflow-slack-jira.md) | 🟢 | 🟢 | Aprofundar |
| [14 · OKRs, alinhamento de backlog e portfólio](./14-okrs-alinhamento-de-backlog-e-portfolio.md) | ⚪ | ⚪ | Pular |
| [15 · Fechamento e cadeia completa](./15-fechamento-curadoria-final-e-cadeia-completa.md) | ⚪ | 🟡 | Conhecer |

## ✅ Implemente no dia a dia

1. **Parser de linguagem natural para ação estruturada, com confirmação antes de executar.** Por que vale: é o padrão entrada, extração, ação que sustenta boa parte das automações com LLM; o guia mostra o desenho certo (JSON com campo de confiança, etapa de confirmação, log estruturado com versão do prompt). Primeiro passo mínimo: um comando de Slack que devolve um rascunho de card (tipo, título, prioridade, responsável ou `null`) e só cria no Jira após um "sim" explícito; valide a saída com Zod ou Pydantic. Quando não adotar: se o volume é de poucas mensagens por semana, um template de card preenchido à mão custa menos que manter um parser. Tópico: [13](./13-nl-to-workflow-slack-jira.md).
2. **Digest de reunião com regras anti-invenção.** Por que vale: o guia traz regras que transferem para qualquer extração sobre texto (nunca inventar responsável ou prazo, usar `[A DEFINIR]`, marcar decisão implícita, sinalizar possível erro de transcrição). Primeiro passo mínimo: um prompt que recebe a transcrição e devolve ações em JSON com `assignee` nulo quando ninguém se comprometeu; revise por uma semana antes de ligar a criação de cards. Quando não adotar: se você não tem transcrição de qualidade, o erro de entrada domina tudo. Tópico: [09](./09-meeting-digest-ata-acoes-e-cards-jira.md).
3. **Regras de governança de PR como código (começando em warn).** Por que vale: regra determinística e barata (card no título, tamanho do PR, aprovadores por caminho crítico, queda de cobertura) aplicada igual a todos; é governança que não depende de LLM. Primeiro passo mínimo: uma regra só (referência ao card no título do PR) como aviso, por duas semanas, antes de virar bloqueio. Risco do guia (tópico 12): PR de fork roda com `GITHUB_TOKEN` somente leitura, por isso o desenho usa 2 workflows (`pull_request` avalia, `workflow_run` comenta); metadados do artefato interpolados em `${{ }}` dentro do `github-script` reabrem o ataque "pwn request", então não copie o workflow `workflow_run` sem revisar a interpolação. Regra por substring de caminho também é frágil a renomeação. Quando não adotar: se o time já tem essas verificações no CI ou no próprio Jira, não duplique. Tópico: [12](./12-danger-regras-de-conformidade-no-pipeline.md) e [11](./11-governanca-como-codigo-e-compliance-checklist.md).
4. **Cockpit semanal de fluxo: o código mede, o LLM só narra o desvio.** Por que vale: é o mesmo princípio do tópico 07 (número vem de código) aplicado ao board; o guia separa lead time de cycle time e pede alerta com dono, limiar do histórico da equipe e tendência de 2 sprints, não anomalia por um único ponto. Primeiro passo mínimo: um job semanal calcula lead time, cycle time e WIP a partir do Jira, compara com o histórico da própria equipe e só então entrega os números ao LLM para redigir o desvio; cada alerta nasce com um dono. Quando não adotar: se o board não tem datas de transição confiáveis, as métricas saem erradas e o cockpit só dá aparência de precisão. Tópico: [08](./08-aiops-de-projeto-metricas-de-fluxo-e-risk-monitor.md).

## 🔬 Aprofunde (rumo a especialista)

1. **Ação com efeito colateral: confirmação, idempotência e falha silenciosa.** Por que diferencia: o guia lista os modos de falha reais (responsável errado em frase com dois nomes, token expirado quebrando em silêncio, ação criada sem esperar confirmação) e é exatamente o que separa demo de sistema operado. Estude além da aula: padrões de human-in-the-loop e de tool use com validação de schema na documentação oficial do seu provedor de LLM; idempotência de webhooks e de jobs em fila. Exercício: faça o parser reprocessar a mesma mensagem duas vezes e prove (teste automatizado) que só um card nasce. Tópico: [13](./13-nl-to-workflow-slack-jira.md).
2. **Avaliação do parser com conjunto rotulado.** Por que diferencia: o guia propõe medir acerto em 5 mensagens, o que é um começo; especialista mede em dezenas ou centenas, por campo, e versiona o prompt junto com o resultado. Estude: material sobre avaliação de LLM em tarefas de extração (precisão e recall por campo, matriz de confusão do tipo). Exercício: monte 30 mensagens reais anonimizadas, rotule e reporte acerto por campo (tipo, responsável, prazo) a cada mudança de prompt. Tópico: [13](./13-nl-to-workflow-slack-jira.md) e [02](./02-curadoria-de-requisitos-e-backlog-no-jira.md).
3. **Previsão probabilística de entrega, calculada por código e nunca pedida ao LLM.** Por que diferencia: sair da data única para distribuição é transferível a qualquer estimativa de capacidade, SLO e planejamento de custo; "simular 1000 cenários" no modelo gera número plausível sem distribuição real. Quando não adotar: sem histórico para calibrar, os percentis são hipóteses vestidas de precisão. Estude: simulação com histórico de throughput (em vez de três pontos subjetivos), distribuições de cauda pesada como a log-normal, que o próprio guia cita. Exercício: pegue 20 itens concluídos do seu board, simule o próximo lote por reamostragem e compare o P85 com o resultado real do mês seguinte. Cuidado ao usar o script do curso: ele tem 2 trilhas (software e hardware), paralelismo embutido no código, sorteia triangular (não PERT) e trata o hardware como data fixa, que domina o resultado; rode com mais de um valor para essa constante. Tópico: [07](./07-monte-carlo-p50-p85-p95.md) e [06](./06-estimativas-tres-pontos-e-pert.md).
4. **Curadoria como ciclo de melhoria do prompt.** Por que diferencia: o log de curadoria (erro, correção, motivo) é a versão manual de um loop de avaliação; padrões recorrentes dizem o que mudar no prompt. Estude: práticas de avaliação offline e de regressão de prompts. Exercício: registre 10 erros do seu parser ou digest, agrupe por causa e mostre que uma mudança de prompt reduz a categoria dominante. Tópico: [02](./02-curadoria-de-requisitos-e-backlog-no-jira.md).

## 🧂 Pode ficar no superficial

- **Priorização (RICE, WSJF, MoSCoW) e Backlog Scorer.** É método de produto aplicado por LLM; o guia avisa que o Reach inventado contamina o RICE e que o número dá aparência de precisão. O valor real é a lista de flags, não o ranking. Leia uma vez.
- **Cronograma adaptativo, status report em três audiências, OKRs e portfólio.** São gestão de projetos com IA como redator. A lição transferível (mesmos dados, formatos diferentes por público; o modelo valida estrutura, não relevância) cabe em um parágrafo.
- **Caso RouteWise e mapa do repositório (ambiente do curso).** Contexto didático e logística de ambiente: pular. As armadilhas reais da API e do import do Jira ficam nos Cuidados, não aqui.
- **Detalhes de Make.com, AI Studio e modelos específicos.** Ferramenta e versão mudam rápido (confira a versão atual); o desenho (extração, confirmação, ação) é o que dura.

## ⚠️ Cuidados e lacunas

- **Os exemplos de código têm defeitos que o guia documenta:** o template do bot extrai JSON com uma expressão regular que quebra no caso de array (várias ações), a confirmação é só uma mensagem e o card é criado em seguida, e os prompts do guia, do template e da blueprint têm esquemas diferentes. Use como esboço, não como base de produção.
- **Números da apostila nem sempre saem do código:** o guia mostra que "12 semanas é cerca de P35" não bate com o script (deu cerca de 13% nas simulações do autor do guia) e que o RICE de um item do output de referência está com conta errada. Reconfira qualquer número antes de citar.
- **O Monte Carlo do curso só enxerga a incerteza modelada:** a restrição do hardware entrou como data fixa e domina o resultado, então P50 e P95 ficam próximos sem que o projeto seja previsível. O script também sorteia uma triangular e não a PERT, e os fatores de paralelismo estão embutidos no código.
- **Os outputs de referência foram gerados com um modelo específico e os cenários são simulados.** Seu modelo vai divergir, e não há avaliação sistemática de qualidade na disciplina: "parece correto" é o critério da maioria das atividades. O próprio guia diz que texto organizado não prova conteúdo correto.
- **Armadilhas reais da API e do import do Jira (tópico 02):** o importador tem 7 erros documentados (por exemplo bugs rejeitados quando mapeados como Subtask e sprints ignoradas por exigirem ID numérico) e os IDs de transição variam por instância, então descubra-os por chamada antes de mover cards. Toda story gerada deve ser rastreável a um trecho da transcrição; sem origem, vai para validação.
- **Número e status vêm de código, o modelo só redige (tópico 10):** "22 pode virar 23 por arredondamento do modelo". A cor do status é julgamento que não se delega: use rubrica fixa verde/amarelo/vermelho por limiar, calculada fora do LLM.
- **Danger e forks (tópico 12):** PR de fork roda com `GITHUB_TOKEN` somente leitura, por isso 2 workflows (`pull_request` e `workflow_run`); há risco de "pwn request" se metadados do artefato forem interpolados em `${{ }}` dentro do `github-script`. Não copie o workflow `workflow_run` sem revisar a interpolação; regra por substring de caminho é frágil.
- **Riscos do bot Slack e Jira (tópico 13):** sincronização unidirecional Jira para Slack quando o Jira é a fonte oficial, canais dedicados contra ruído e bot restrito aos canais do projeto.
- **Lacuna de operação:** faltam custo por chamada, limites de taxa, observabilidade e teste automatizado do parser. Minha análise: é o que você precisa acrescentar para tratar como serviço em produção.

## ✔️ Como saber que aprendeu

- Consigo desenhar, sem consultar, o fluxo mensagem para JSON validado para confirmação humana para chamada à API, e dizer onde cada falha (confiança baixa, responsável ambíguo, token expirado) é tratada.
- Meu parser ou digest tem um conjunto de teste rotulado e um número verificável de acerto por campo, rodado a cada mudança de prompt.
- Consigo explicar por que o LLM não deve fazer a simulação e entrego uma previsão com P85 calculada por script sobre o histórico do meu board.

Veja também a [trilha consolidada](../../study-roadmap.md).
