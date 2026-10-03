# 15 · Multi-agent systems: supervisor, papéis, handoffs e blackboard

> **Unidade 9 · Aula 1** · Leitura: ~8 min · Bloco: War Room e multiagente

## 🎯 Em uma frase
Para um pedido que mistura **análise, planejamento e execução**, o OpsPilot ganha um **time**: **supervisor** (coordena, não executa), **analista** (só lê), **planejador** (sem tools) e **executor** (age em incidentes). O **handoff** fica no trace e o **blackboard** (estado do grafo) é a memória compartilhada.

---

## 👵 Explicando para a vovó

É a equipe do plantão: um coordenador distribui as tarefas, um investigador só olha e relata, um planejador só escreve o plano e um operador só executa. Ninguém faz o trabalho do outro, e o quadro branco na parede registra o que cada um descobriu e decidiu.

---

## 🔧 Tecnicamente

### O que é
- **Por que dividir:** cada agente fica com função específica, capacidades compatíveis e responsabilidade clara. O analista não pensa em executar, o planejador não precisa consultar todas as ferramentas e o executor recebe um plano pronto.
- **Supervisor:** não executa ações operacionais; lê o estado, decide quem age e quando acabou. Sua saída é estruturada: próximo papel e um *brief* (a instrução de trabalho ou, no fim, o resumo final).
- **Analista:** levanta fatos (alertas disparando, incidentes, runbooks, status de provedores) em tópicos telegráficos; não propõe soluções, não abre nem resolve incidentes; deve ser cético e não afirmar o que não está nas observações.
- **Planejador** transforma os fatos do blackboard em plano de mitigação (sequência, dependências, próximos passos); **executor** aplica o plano com as tools de incidente, passando pelos mesmos contratos e guardrails.
- **Handoff** é a transição explícita de responsabilidade e fica no trace (de onde veio, para quem vai, qual brief). Isso permite reconstruir como o time se organizou.
- **Blackboard:** quadro compartilhado, representado pelo estado do grafo; cada agente escreve e os seguintes leem. **Consenso:** dois pareceres independentes e um juiz que arbitra com critérios (a aula descreve; não foi implementado). **Agent-to-Agent** (Google) aparece como protocolo para comunicação entre agentes, deixado como exercício.
- **Multiagente não é reescrever o projeto:** o supervisor é mais um nó do grafo, o blackboard reusa o estado, os trabalhadores usam as tools existentes e a memória, o trace e a observabilidade seguem valendo. O roteador ganha a rota `team`. Teto de 8 transições.
- **Custo e qualidade:** na demo (latência alta no checkout e erro 500 no payments, com pedido de plano e abertura de incidentes) o time fez cerca de dez chamadas ao LLM. Consulta pontual continua melhor no ReAct; o time se justifica quando a qualidade e a organização compram o custo extra. Ler também “Building Effective Agents” (Anthropic) como contraprova e Russell e Norvig, cap. 2, como base conceitual de agente.

### Como funciona
- Spec do modo equipe: área própria (supervisor, blackboard e três papéis), saída do supervisor com `next` e `brief`, analista somente leitura, planejador sem tools de execução, executor sobre incidentes, evento de handoff no trace, rota `team` e teto de oito transições.
- Referências antes do implement: o schema do supervisor (próximo: analista, planejador, executor ou done) e o prompt do analista (função única, o que pode listar, o que é proibido, formato telegráfico). O supervisor se parece com o roteador, mas decide várias vezes na mesma execução.
- Na demo, o blackboard mostra a investigação do analista com alertas por severidade (críticos primeiro, como o OpsPilot já aprendeu) e a ausência de fatos explícita em vez de inventada; o trace mostra o roteamento, os handoffs, as actions e as observations.

### Onde aplicar
- Pedidos complexos que combinam investigação, plano e ação.
- Contextos em que separar permissões por papel aumenta a segurança (leitura, planejamento, escrita).

### Vantagens e limites
**Vantagens**
- Especialização reduz objetivos concorrentes num prompt.
- Cada papel só recebe as ferramentas do seu papel.
- Handoffs registrados deixam a colaboração auditável.

**Limites**
- Mais chamadas, mais latência e mais custo (cerca de dez chamadas na demo).
- Mais complexidade: sem trace e auditoria, a depuração piora.

### 🚫 Armadilhas
- Usar o time para perguntas simples.
- Dar ao analista ou ao planejador ferramentas de escrita.
- Deixar o supervisor delegar sem teto.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Supervisor | Coordena o time e decide o próximo papel; não executa |
| Blackboard | Quadro compartilhado de contribuições, no estado do grafo |
| Handoff | Passagem de trabalho entre papéis, registrada no trace |
| Brief | Instrução ao próximo papel, ou resumo final quando done |
| Teto de 8 | Limite de delegações por turno (MAX_HANDOFFS) |
| Consenso / juiz | Pareceres independentes arbitrados por um terceiro papel |

---

## 💻 No código do repo

**Projeto:** [09-multi-agent-systems](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/09-multi-agent-systems)

Spec 018: o modo equipe em src/team, plugado como rota do roteador. O snapshot é o estado de trabalho mais recente do autor (o modo equipe não estava commitado no repositório original). Typecheck e os 216 testes do snapshot passaram na minha execução (Node 22.16).

**Fluxo**
1. `src/team/supervisor.ts` e `supervisor-prompt.ts`: `supervisorDecisionSchema { next: analista | planejador | executor | done, brief }` e prompt com a tabela de papéis, a sequência típica e o teto de 8 delegações.
2. `src/team/blackboard.ts`: `BlackboardEntry { role, kind: facts | plan | execution | error, brief, content }` e `renderBlackboard`.
3. `src/team/roles.ts`: `createAnalistaRunner` (agente ReAct com tools de leitura), `createPlanejadorRunner` (sem tools, uma chamada ao modelo sobre o blackboard) e `createExecutorRunner` (tools de incidente), cada um com prompt de função única; `DEFAULT_MAX_ITERATIONS = 6`.
4. `src/team/team-graph.ts`: `TeamState` (blackboard com reducer concat, `handoffCount`, `brief`, `next`, `answer`, trace, `llmCalls`); nós supervisor, analista, planejador, executor e done; `MAX_HANDOFFS = 8` (ao atingir, encerra com “teto de handoffs atingido”); um evento `handoff` por decisão com `to` e o brief; decisão inválida vira `done` (“decisão inválida do supervisor”); erro de papel entra no blackboard como `error` e o controle volta ao supervisor; `recursionLimit` = 34.
5. `src/team/team-strategy.ts`: `TeamStrategy` implementa `ReasoningStrategy`, compõe o histórico em texto e soma `llmCalls` (1 por decisão do supervisor mais os papéis).
6. `src/index.ts`: partição estrutural de ferramentas: analista (`list_alerts`, `list_incidents`, `consultar_runbook`, `check_provider_status`), executor (`open_incident`, `resolve_incident`, `list_incidents`), planejador nenhuma; `src/graph/router.ts` ganha a rota `team` e `/chat` aceita `strategy: "team"`.
7. Testes: `team-graph.test.ts` (ordem do ciclo, decisão malformada, falha de papel, teto de exatamente 8 delegações), `roles.test.ts` (ferramentas de cada papel) e `supervisor.test.ts`.

**Como rodar**
- `npm run dev` e um `POST /chat` como “latência alta no checkout e erro 500 no payments: levante o que está disparando, monte o plano e abra os incidentes” (o roteador deve escolher `team`; ou force com `"strategy":"team"`).
- Na War Room, clique em “Ver raciocínio” para ver os handoffs.
- `npm test` e `npm run typecheck` (216 testes na raiz; `npm --prefix web test` para o front).

**Armadilhas e achados no código**
- O consenso (dois pareceres e um juiz) não foi implementado (UNIDADE.md).
- O evento `handoff` perde o campo `to` ao ser persistido ([tópico 13](./13-observabilidade-e-limites-de-autonomia.md)): na auditoria só sobra o brief.
- O executor abre e resolve incidentes sem aprovação por ação; a única aprovação humana é a flag `awaitHumanApproval` na requisição inteira.
- Se um papel lança exceção, as chamadas que ele já fez não entram em `llmCalls` (o `catch` não soma).
- “Não repita um papel sem motivo” está só no prompt do supervisor; o freio determinístico é o teto de 8 delegações.
- O snapshot é o estado não commitado do autor e o comparativo de custo (`team` contra `react` no `/stats`) depende de um cálculo de custo simplificado ([tópico 13](./13-observabilidade-e-limites-de-autonomia.md)).

---

## 🔗 Para ir além
- [Snapshot da Unidade 9 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/09-multi-agent-systems)
- [UNIDADE.md da Unidade 9](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/09-multi-agent-systems/UNIDADE.md)
- [Generative Agents (arXiv:2304.03442)](https://arxiv.org/abs/2304.03442)

---

⬅️ [14 · War Room: interface web sobre a mesma API e publicação no GitHub Pages](./14-war-room-e-github-pages.md)
