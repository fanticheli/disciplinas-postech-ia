# 06 · Seis padrões de orquestração: Sequential, Parallel, Supervisor, Hierarchical, Group Chat e Handoff

> **Módulo 3 · Aulas 2 e 3** · Leitura: ~12 min · Bloco: Arquiteturas Multi-Agent

## 🎯 Em uma frase
Os padrões de orquestração não competem: cada um resolve um **tipo diferente de dependência**. **Sequential** (dependência de dado), **Parallel** (independência), **Supervisor** (coordenação central), **Hierarchical** (supervisores de supervisores), **Group Chat** (debate entre pares) e **Handoff** (transferência total de controle). A arquitetura deixa de ser uma escolha única e vira uma **composição**.

---

## 👵 Explicando para a vovó

Pense numa cozinha de restaurante. Receita que tem de esperar o molho ficar pronto é uma fila: *Sequential*. Salada, grelhado e sobremesa podem andar ao mesmo tempo: *Parallel*. O chefe de cozinha que distribui pratos e confere o que sai é o *Supervisor*. Num hotel grande, cada cozinha tem seu chefe e há um chefe geral: *Hierarchical*.

Quando os especialistas precisam discutir o prato ('mais sal ou menos?') até concordar, é uma *mesa de debate* (Group Chat). E quando o cozinheiro percebe que o pedido é de confeitaria, ele entrega o pedido inteiro, com as anotações, para o confeiteiro assumir: *Handoff*.

---

## 🔧 Tecnicamente

### O que é
- **Orquestração não é escolher o 'melhor' padrão:** é perfeitamente normal ter parte do fluxo sequencial, outra paralela e certas decisões com um supervisor. Uma arquitetura madura dificilmente usa um único modelo de coordenação do início ao fim.
- **Sequential:** cada agente depende do resultado do anterior; nenhuma etapa começa antes de a anterior terminar. Vantagem: previsível, fácil de depurar e auditar. Limite: a latência total é aproximadamente a soma dos tempos. No Trial Forge, TCLE depende do protocolo e o relatório final depende dos documentos anteriores.
- **Parallel:** agentes independentes rodam ao mesmo tempo; o tempo total se aproxima da tarefa mais lenta. Exige sincronização e um componente que agregue os resultados, e pode gerar conclusões incompatíveis sobre o mesmo assunto. Exemplo: pesquisa regulatória com um agente na Anvisa, outro na FDA e um terceiro em referências científicas.
- **Supervisor:** um agente coordena especialistas: decompõe, encaminha cada subtarefa ao adequado, acompanha e consolida (e resolve conflito entre respostas divergentes). Facilita adicionar especialistas. Não deve virar superagente: se compete com os especialistas, volta o problema do acúmulo. Segundo o slide, os especialistas nunca falam entre si diretamente.
- **Hierarchical:** evolução do Supervisor: uma árvore de coordenação. Um orquestrador raiz só encaminha para o supervisor do domínio; cada supervisor administra os especialistas do seu contexto. Isolamento de estado, menos acoplamento, mais fácil de auditar por ramo e a mudança num domínio é transparente para o topo. Slides: o orquestrador raiz nunca fala direto com um especialista de folha.
- **Group Chat:** todos compartilham a mesma conversa, cada um pode analisar, complementar e discordar; a decisão emerge da discussão. Há um moderador que só organiza a ordem e distribui mensagens, sem decidir o conteúdo. Útil quando nenhum especialista reúne sozinho todas as informações. Custo: cada rodada é nova chamada, mais recursos e latência, então reserve para quando a colaboração supera claramente esse custo. Origem de referência: AutoGen (Microsoft Research, 2023) com `GroupChatManager`.
- **Group Chat versus Supervisor:** no Supervisor os especialistas trabalham isolados e o coordenador consolida; no Group Chat todos compartilham o contexto e cada contribuição pode mudar a direção. Se basta agregar resultados independentes, Supervisor; se é preciso reconciliar interpretações por debate, Group Chat.
- **Handoff:** o agente percebe que a tarefa ultrapassa seu domínio e transfere o *controle inteiro* a outro especialista, junto com o contexto acumulado. É substituição, não consulta: o agente original deixa o processo, o novo continua do ponto exato. Exemplo: o agente de TCLE detecta, ao descrever riscos, terapia gênica experimental de edição de linha germinativa e transfere para um agente de bioética. Referência: OpenAI Swarm (outubro de 2024), evoluído para o Agents SDK (março de 2025), com o primitivo `handoff`.

### Como funciona
- **Três perguntas para os três primeiros:** uma tarefa depende obrigatoriamente da saída de outra? (Sequential). Duas tarefas podem rodar juntas sem interferência? (Parallel). Quem distribui, acompanha e consolida? (Supervisor). As perguntas não escolhem um padrão único, identificam onde cada estratégia aparece.
- **Os três coexistindo no Trial Forge:** o supervisor recebe a demanda de documentar um estudo; o protocolo precisa existir antes dos derivados (Sequential); com o protocolo consolidado, TCLE, parte do relatório e verificações regulatórias independentes andam juntos (Parallel); no fim o supervisor reúne tudo, verifica inconsistências e encaminha (Supervisor).
- **Hierarchical no Trial Forge:** o orquestrador principal classifica a natureza da tarefa e a envia ao supervisor de protocolos, ao de consentimento ou ao de CSR, cada um com seus especialistas. A arquitetura cresce sem crescer proporcionalmente a complexidade do componente central.
- **Escolhendo entre os seis:** só dependência entre etapas, Sequential; atividades simultâneas, Parallel; coordenação centralizada, Supervisor; vários domínios independentes crescendo, Hierarchical; debate entre especialistas, Group Chat; mudança de domínio no meio da execução, Handoff.
- **Seletor de padrões (árvore de decisão):** a tarefa B depende do resultado de A? Sim: Sequential. Não: existe decisão central de qual especialista chamar? Se sim, o domínio tem vários níveis de especialização? (Hierarchical se sim, Supervisor se não). Se não há decisão central, as tarefas são independentes? (Parallel). Se nem isso: os agentes têm autoridade igual para discordar (Group Chat) ou a tarefa muda de dono sem discussão (Handoff)?
- **Implementações de mercado citadas nas indicações:** Amazon Bedrock multi-agent collaboration com os modos 'Supervisor' e 'Supervisor com Roteamento' (este quando o orquestrador só direciona sem sintetizar; a Syngenta o usa no Cropwise AI), AutoGen para Group Chat, Swarm/Agents SDK para Handoff; na Azure, os padrões de orquestração incluem Sequential, Concurrent, Group Chat, Handoff e Magentic (conforme o cheat sheet do módulo 1).
- **Contexto de mercado:** o Gartner registrou alta de 1.445% nas consultas sobre sistemas multiagente entre o 1º trimestre de 2024 e o 2º de 2025 e prevê 40% dos apps corporativos com agentes por tarefa até o fim de 2026 (de menos de 5% em 2025).

### Onde aplicar
- Mapear *dependência por dependência* do seu processo, não escolher um padrão para o sistema inteiro.
- Desconfiar do Sequential 'por hábito': se o agente B só roda depois porque 'faz sentido cronológico' e não usa dado de A, considere Parallel.
- Usar Supervisor fixo (roteador determinístico) quando o roteamento é simples; um Supervisor com raciocínio próprio custa mais latência e ganha flexibilidade nas fronteiras nebulosas.
- Reservar Group Chat para divergência real de interpretações (por exemplo, dois agentes discordando se um evento adverso entra no CSR ou só no ICF, exemplo do canvas).

### Vantagens e limites
**Vantagens**
- Cada padrão responde a uma dependência concreta, o que torna a escolha explicável.
- Combinar padrões equilibra previsibilidade, desempenho e especialização.
- Hierarchical e Handoff mantêm o isolamento de responsabilidades à medida que o sistema cresce.

**Limites**
- Sequential soma latências; Parallel exige agregação e pode produzir conflito.
- Group Chat multiplica chamadas e latência a cada rodada.
- Mais padrões significam mais coordenação, estado e pontos de falha (próximo tópico).

### 🚫 Armadilhas
- Procurar 'o melhor padrão' em vez de compor.
- Transformar o Supervisor num agente superinteligente que compete com os especialistas.
- Confundir Group Chat com Supervisor (debate versus consolidação) ou Handoff com consulta (substituição versus colaboração).
- Usar Group Chat quando bastava agregar resultados independentes.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Sequential | Pipeline: cada etapa espera a anterior |
| Parallel | Independentes ao mesmo tempo, com agregador |
| Supervisor | Coordenador distribui, acompanha e consolida; especialistas isolados |
| Hierarchical | Supervisor de supervisores; estado isolado por ramo |
| Group Chat | Conversa compartilhada, moderador e debate; decisão emerge |
| Handoff | Transferência total de controle com contexto acumulado |
| Seletor de padrões | Árvore de perguntas que leva ao padrão adequado |

---

## 💻 No código do repo

**Projeto:** [modulo-03-multi-agent (seletores de padrão de orquestração v1 e v2)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-03-multi-agent)

Duas árvores de decisão em Markdown: a primeira cobre Sequential, Parallel e Supervisor; a segunda (v2) cobre os seis. O protótipo executável do módulo ([D8-07](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md)) implementa só Sequential, Parallel e Supervisor.

**Fluxo**
1. `orchestration-pattern-selector.md` (Módulo 3.2): árvore em três perguntas (depende do resultado? decisão central? genuinamente independentes?), checklist 'antes de escolher Sequential por padrão', tabela do Trial Forge (Protocolo para ICF e CSR = Sequential; ICF em paralelo com CSR; verificação dos três = Supervisor) e uma nota sobre Supervisor roteador fixo versus Supervisor com raciocínio próprio.
2. `orchestration-pattern-selector-v2.md` (Módulo 3.3): a árvore completa de seis padrões, tabela de origem de cada padrão (AutoGen para Group Chat, Swarm/Agents SDK para Handoff; Hierarchical como 'supervisor de supervisores' documentado por times de engenharia enterprise, com Databricks como exemplo) e tabela do Trial Forge com os seis (inclui o desacordo ICF x CSR sobre evento adverso como Group Chat e o Agente Bioética como Handoff).
3. A seção 'Seu caso' pede identificar candidatos a Hierarchical, Group Chat ou Handoff no processo já mapeado nos módulos 3.1 e 3.2.

**Como rodar**
- Aplique a árvore a cada transição do seu processo, em tabela transição / padrão / por quê.
- Responda: onde há dependência Sequential genuína e onde há falsa dependência que poderia ser Parallel?

**Armadilhas e achados no código**
- A ordem das perguntas difere entre a apostila e o seletor: a apostila pergunta primeiro dependência, depois possibilidade de paralelismo, depois quem coordena; a árvore do canvas pergunta dependência, depois 'decisão central de qual especialista' e só então independência. O resultado cobre o mesmo espaço, mas siga a árvore do canvas como está ao usar o artefato.
- Group Chat e Handoff aparecem como padrões do catálogo, mas **não existem implementados** no protótipo do módulo: não há Agente Bioética nem moderador de conversa no código (ver [D8-07](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md)).

---

## 🔗 Para ir além
- [Repositório oficial do módulo 08 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia)
- [Pasta do módulo 3 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-03-multi-agent)
- [Microsoft Research: AutoGen (Group Chat)](https://www.microsoft.com/en-us/research/publication/autogen-enabling-next-gen-llm-applications-via-multi-agent-conversation-framework/)
- [OpenAI: Swarm / Agents SDK (Handoff)](https://openai.com/index/new-tools-for-building-agents/)
- [AWS: Amazon Bedrock multi-agent collaboration](https://aws.amazon.com/blogs/machine-learning/amazon-bedrock-announces-general-availability-of-multi-agent-collaboration/)
- [Vídeo: Armchair Architects, Multi-agent Orchestration and Patterns (Microsoft)](https://learn.microsoft.com/en-us/shows/azure-essentials-show/armchair-architects-multi-agent-orchestration-and-patterns)

---

⬅️ [05 · Por que múltiplos agentes: especialização, custo de coordenação e agente não é ferramenta](./05-por-que-multiplos-agentes.md)  ·  [07 · Falhas distribuídas: CAP, timeout, retry, idempotência, Saga e a fila de mensagens](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md) ➡️
