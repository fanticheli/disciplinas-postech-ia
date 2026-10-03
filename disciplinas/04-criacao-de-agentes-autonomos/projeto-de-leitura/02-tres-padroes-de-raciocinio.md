# 02 · Os três padrões de raciocínio: ReAct, Plan-and-Execute e Reflection

> **Unidade 2 · Aula 1** · Leitura: ~6 min · Bloco: Padrões de raciocínio e o núcleo do OpsPilot

## 🎯 Em uma frase
**ReAct** alterna pensar, agir e observar (adaptativo); **Plan-and-Execute** planeja, executa e replaneja (visão global, mas o plano envelhece); **Reflection** põe um crítico sobre outra estratégia (mais qualidade, mais custo). Nenhum vence sempre, e todos precisam de teto de iterações.

---

## 👵 Explicando para a vovó

ReAct é o detetive que segue uma pista de cada vez: abre a gaveta, vê o que tem, decide a próxima. Plan-and-Execute é o chef que escreve o cardápio antes de cozinhar e refaz a lista se faltar ingrediente. Reflection é o revisor que lê o texto pronto contra uma lista de critérios antes de deixar sair.

O limite de iterações é o despertador do detetive: sem ele, ele sempre encontra mais uma gaveta para abrir.

---

## 🔧 Tecnicamente

### O que é
- **ReAct (Reason + Act, não React):** antes dele, o modelo ou raciocinava sozinho (e preenchia lacunas com fatos inventados) ou agia direto, sem fundamento. O ReAct intercala as duas coisas: pensamento, ação, observação, e volta a pensar com a nova informação. Serve quando o caminho completo não é conhecido de antemão, como investigar um incidente em que cada observação muda o próximo passo.
- **Limitações do ReAct:** trabalha um passo por vez e pode andar em círculos; cada passo é uma chamada ao modelo carregando o histórico, então o custo cresce com a tarefa; sem teto pode entrar em loop infinito.
- **Plan-and-Execute:** o agente pensa a tarefa globalmente, define uma sequência de passos, executa e, quando necessário, replaneja. Permite um modelo mais forte no planejamento e executores mais baratos, e passos independentes podem rodar em paralelo. O risco é o **plano envelhecido**: se o contexto muda ou uma hipótese cai, seguir o plano original leva à direção errada, por isso o replanner faz parte do padrão.
- **Reflection:** gera um resultado, um crítico avalia contra critérios definidos, e se reprovar produz feedback para uma nova versão. O crítico precisa de critérios objetivos (não “poderia melhorar”) e o ciclo precisa de um número máximo de reflexões, porque um crítico sempre acha algo a melhorar.
- **Os padrões já apareciam no curso:** o Agent Mode e seu reasoning trace eram ReAct; especificar, planejar, quebrar em tarefas e implementar era Plan-and-Execute; code review e pre-commit eram Reflection (um resultado avaliado contra critérios antes de ser aceito).
- **O projeto OpsPilot** começa aqui: um copiloto de plantão que consulta alertas, abre incidentes e recupera runbooks. As três estratégias ficam atrás de uma interface comum, o raciocínio gera um trace tipado para auditoria, uma **arena** compara estratégias sobre a mesma pergunta (lado a lado, com custo) e um **bench** mede acerto, número de chamadas e latência numa bateria fixa.

### Como funciona
- Comparativo da aula: ReAct é adaptativo, mas acumula histórico e pode entrar em loop. Plan-and-Execute dá visão global, custo potencialmente mais previsível e paralelismo, mas exige replanejamento. Reflection acrescenta uma camada explícita de qualidade, ao custo de chamadas extras e da necessidade de critérios e limite de parada.
- A apostila indica a linhagem teórica: ReAct (Yao et al.), Plan-and-Solve (Wang et al.), Reflexion (Shinn et al.) e Self-Refine (Madaan et al.). O ensaio “Building Effective Agents” (Anthropic, dez./2024) é citado como contraprova ao entusiasmo com multiagente: começar pelo mais simples.
- Em todos os casos, quem decide a estratégia é uma escolha de engenharia baseada no tipo de problema e em métricas, não numa preferência.
- A implementação das três estratégias, da arena e do bench está nos tópicos [03](./03-spec-kit-e-estrutura-do-opspilot.md) e [04](./04-estrategias-arena-e-bench.md).

### Onde aplicar
- Consultas pontuais e investigação exploratória: ReAct.
- Pedidos de várias etapas com ordem explícita e dependências: Plan-and-Execute.
- Respostas de alta criticidade ou que precisam de verificação contra evidências: Reflection sobre uma das duas.

### Vantagens e limites
**Vantagens**
- ReAct adapta cada decisão à observação mais recente.
- Plan-and-Execute dá uma visão global antes de agir e abre espaço para executores mais baratos.
- Reflection verifica a resposta antes de aceitá-la.

**Limites**
- ReAct pode andar em círculos e seu custo cresce com o histórico.
- Plan-and-Execute depende de replanejamento, que custa chamadas e latência.
- Reflection soma chamadas mesmo quando a primeira resposta já estava boa.

### 🚫 Armadilhas
- Rodar qualquer estratégia sem teto de iterações.
- Crítico sem critérios objetivos, que aprova ou reprova por gosto.
- Tratar o plano como definitivo.
- Comparar estratégias só pela resposta textual, ignorando chamadas, latência e o estado real do sistema.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| ReAct | Reason + Act: ciclos de pensamento, ação e observação |
| Plan-and-Execute | Planner, executor e replanner sobre um plano explícito |
| Replanner | Revisa o plano depois de cada passo (ajustar, continuar ou finalizar) |
| Reflection | Crítico que avalia a resposta e pede nova geração, com teto de rodadas |
| Trace | Registro estruturado e tipado do passo a passo do raciocínio |
| Arena | Comando que roda a mesma pergunta em várias estratégias e imprime traces e métricas |
| Bench | Bateria fixa de cenários que mede acerto, chamadas e latência |

---

## 💻 No curso

- A aula não tem código próprio: é a teoria e o mapa do que vem. A implementação das três estratégias está em [03 · Spec Kit e a estrutura inicial do OpsPilot](./03-spec-kit-e-estrutura-do-opspilot.md) e [04 · ReAct, Plan-and-Execute e Reflection no código](./04-estrategias-arena-e-bench.md).
- Termos que aparecem de novo: trace tipado (tópico 03), arena e bench (tópico 04) e teto de execução em toda estratégia.

---

## 🔗 Para ir além
- [ReAct (arXiv:2210.03629)](https://arxiv.org/abs/2210.03629)
- [Plan-and-Solve Prompting (arXiv:2305.04091)](https://arxiv.org/abs/2305.04091)
- [Reflexion (arXiv:2303.11366)](https://arxiv.org/abs/2303.11366)
- [Self-Refine (arXiv:2303.17651)](https://arxiv.org/abs/2303.17651)
- [Snapshot da Unidade 2 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/02-padroes-de-raciocinio-e-execucao)

---

⬅️ [01 · Spec-Driven Development do zero: Constitution, spec, plan, tasks, implement e guardrails](./01-spec-driven-development-do-zero.md)  ·  [03 · Spec Kit e a estrutura inicial do OpsPilot: contrato de estratégia, trace e fábrica de modelo](./03-spec-kit-e-estrutura-do-opspilot.md) ➡️
