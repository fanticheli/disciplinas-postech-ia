# 05 · Por que múltiplos agentes: especialização, custo de coordenação e agente não é ferramenta

> **Módulo 3 · Aula 1** · Leitura: ~9 min · Bloco: Arquiteturas Multi-Agent

## 🎯 Em uma frase
Um agente generalista que acumula vocabulários, ferramentas e riscos diferentes fica difícil de auditar. Dividir em **agentes especialistas** melhora a especialização e isola erros, mas cobra **comunicação, sincronização, estado compartilhado e novos pontos de falha**. Regra de bolso: se pelo menos duas entre vocabulário, ferramentas e nível de risco divergem muito, compensa dividir. E um **agente não é uma ferramenta**: do outro lado da chamada existe alguém que raciocina.

---

## 👵 Explicando para a vovó

Uma clínica pequena tem um médico que faz tudo. Quando passa a atender criança, idoso e cirurgia, o consultório vira bagunça e, se um laudo sai errado, ninguém sabe onde o raciocínio falhou. Contratar especialistas resolve, mas agora é preciso uma recepção que combine agendas e um prontuário único: se o pediatra anota 12 anos e o cirurgião 13, cada um acertou no seu papel e o paciente mesmo assim sai com informação inconsistente.

Chamar o especialista também não é o mesmo que usar um aparelho de pressão. O aparelho sempre faz a mesma coisa; o especialista pode discordar, pedir mais exames ou dizer que o caso não é dele.

---

## 🔧 Tecnicamente

### O que é
- **O limite do agente único:** mesmo calibrado, ele tem limite natural de escopo. O problema não é só desempenho nem modelo maior: é o *acúmulo de responsabilidades* no mesmo ciclo de raciocínio.
- **Os três documentos do Trial Forge:** o **ICF** (linguagem acessível ao participante, seções condicionais como HIV, menores e assentimento), o **protocolo** (linguagem técnica: metodologia, critérios de inclusão e exclusão, cronograma, desenho experimental; público de pesquisadores e comitês de ética) e o **CSR** (síntese de resultados, análises estatísticas, estrutura do padrão ICH E3, pode precisar de vários idiomas para Anvisa e FDA).
- **Problema de auditoria:** num agente generalista, se há informação errada no relatório, o erro pode estar na interpretação da metodologia, na adaptação de linguagem, na síntese estatística ou nas regras regulatórias, tudo no mesmo ciclo. 'Um agente que faz tudo também é um agente no qual tudo pode dar errado ao mesmo tempo.'
- **Custo de dividir:** comunicação, sincronização, compartilhamento de estado, resolução de conflitos e falhas distribuídas. Três agentes excelentes podem formar um sistema ruim com coordenação inadequada. Compara-se o custo de coordenar com o custo de auditar um generalista: único é mais simples de coordenar e muito mais difícil de investigar; vários exigem mais comunicação mas reduzem o espaço de busca (se o CSR tem problema, sabe-se qual agente olhar primeiro).
- **Quando vale a pena (três dimensões):** vocabulário do domínio, ferramentas necessárias e nível de risco regulatório ou operacional. Se pelo menos duas divergem significativamente, a divisão normalmente compensa. Não é fórmula rígida: divergência de risco sozinha pode justificar (uma tarefa tolera correção posterior, outra exige aprovação humana antes de qualquer efeito).
- **Agente não é ferramenta:** ferramenta executa função determinística, com esquema fixo, sem objetivo próprio, sem decidir mudar a sequência nem chamar outra ferramenta por iniciativa. Agente interpreta contexto, decide, escolhe ferramentas, persegue objetivo, pode achar a solicitação incompleta, pedir esclarecimento ou recusar o que foge do domínio. Mesmo que tecnicamente um agente chame outro com estrutura parecida com tool calling, tratar um agente como função pura é erro de arquitetura.
- **Protocolo agente a agente:** o A2A (Agent2Agent, Google, abril de 2025, hoje sob a Linux Foundation) define mensagens entre agentes com remetente, destinatário, manutenção de estado na conversa e permissões explícitas. É o equivalente ao MCP, só que entre agentes em vez de entre agente e ferramenta.

### Como funciona
- **Três especialistas do Trial Forge:** agente ICF (linguagem acessível, seções condicionais), agente de protocolo (metodologia, critérios, estrutura formal) e agente CSR (síntese estatística, resultados, conformidade com ICH E3). Cada um isoladamente é relativamente simples e segue os princípios do módulo anterior: memória calibrada, ciclo limitado, ferramentas específicas e reflexão compatível com o risco.
- **O desafio é consistência, não inteligência:** o agente de protocolo registra idade mínima doze; meses depois o agente CSR usa uma versão desatualizada e sintetiza com treze. Cada agente fez a tarefa certa com o contexto que recebeu, e o sistema produziu inconsistência regulatória. A falha nasce na comunicação e na sincronização entre agentes. Vale em atendimento ao cliente (triagem, suporte, financeiro precisam concordar sobre o mesmo histórico) e em pipelines de dados (extração, transformação, relatório sobre a mesma versão).
- **Padrão orquestrador e trabalhadores** (pesquisa aprofundada): um agente principal recebe a pergunta, decompõe em subtarefas e distribui a subagentes que pesquisam fontes diferentes e devolvem, e o principal consolida. O número de agentes varia: busca factual simples usa um; comparação direta dois a quatro; pesquisa ampla pode acionar mais de dez em paralelo. Há paralelismo em dois níveis: entre subagentes e dentro de cada um, nas ferramentas.
- **Custo real:** multiagentes consomem muito mais tokens que um agente ou uma interação simples, pois cada agente recebe contexto, roda seu ciclo, usa ferramentas e devolve resultado, e o orquestrador consolida. A evidência citada nas indicações de leitura é o relato da Anthropic sobre seu sistema multiagente de pesquisa (líder Opus 4 com subagentes Sonnet 4 em paralelo): superou um agente único forte em 90,2% numa avaliação interna, com ganho explicado sobretudo pelo uso de tokens em paralelo, e custou cerca de 15 vezes mais tokens que um chat comum; o consumo de tokens sozinho explicaria 80% da variância de desempenho.
- **Mensagem da aula:** o objetivo não é multiplicar agentes, é comparar o benefício da especialização com o custo de coordenação. Múltiplos agentes custam mais para coordenar, normalmente custam menos para auditar. No Trial Forge a divisão ICF, protocolo e CSR se justifica por público, vocabulário, estrutura e risco regulatório.

### Onde aplicar
- Antes de dividir, preencher o canvas de fronteira: as três dimensões, se divergem em duas ou mais, e o custo de coordenação aceito.
- Usar o checklist 'agente versus ferramenta': mesma lógica sempre para o mesmo input é ferramenta; pode interpretar, pedir contexto ou recusar é agente; precisa de estado compartilhado é agente (pense em A2A, não MCP).
- Aceitar 'uma conclusão válida' do exercício: se dois agentes do seu desenho poderiam virar um sem perda de qualidade, é melhor um só.
- Em sistemas de pesquisa ampla e independente, considerar o padrão orquestrador-trabalhadores com plena consciência do custo de tokens.

### Vantagens e limites
**Vantagens**
- Especialização por vocabulário, ferramenta e nível de risco.
- Erro isolado por agente reduz o custo de depuração e auditoria.
- Atualizar um domínio mexe só no seu agente.

**Limites**
- Comunicação, sincronização e estado compartilhado viram problemas de arquitetura.
- Consumo de tokens muito maior que o de um agente.
- Surgem novos pontos de falha e o risco de inconsistência entre agentes que fizeram cada um o seu trabalho certo.

### 🚫 Armadilhas
- Dividir porque 'o sistema tem tarefas diferentes': praticamente todo sistema corporativo tem. O teste é vocabulário, ferramentas e risco.
- Tratar a chamada a outro agente como chamada a uma função previsível.
- Focar em tornar cada agente mais inteligente e esquecer de garantir que todos trabalhem sobre os mesmos fatos.
- Ignorar o custo de tokens ao projetar paralelismo.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Agente especialista | Agente com vocabulário, ferramentas e risco próprios |
| Três dimensões | Vocabulário, ferramentas, nível de risco; duas divergindo = dividir |
| Agente x ferramenta | Ferramenta é determinística e sem objetivo; agente decide e pode recusar |
| A2A | Protocolo aberto de comunicação entre agentes (como MCP, mas agente a agente) |
| Orquestrador e trabalhadores | Agente principal decompõe e consolida subagentes |
| Consistência compartilhada | Todos os agentes enxergam o mesmo estado atual do trabalho |
| ICF / Protocolo / CSR | Os três agentes do Trial Forge |

---

## 💻 No código do repo

**Projeto:** [modulo-03-multi-agent (canvas de fronteira multiagente)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-03-multi-agent)

Um canvas em Markdown para decidir se uma tarefa fica com um agente único ou é dividida, aplicado ao case. Sem código executável nesta etapa.

**Fluxo**
1. `multi-agent-boundary-canvas.md` parte de um pré-requisito: a resposta do framework de três perguntas (tópico [D8-01](./01-framework-de-decisao-e-trade-offs.md)) já deve ter sido 'agente'; este canvas decide se é um ou vários.
2. Pergunta central em tabela com as três dimensões (vocabulário/domínio, ferramentas, risco regulatório/nível de reflexão) e a regra 'não em 2 ou mais dimensões, considere dividir', com a ressalva de que é guia e não fórmula (risco sozinho pode bastar).
3. Custo de dividir (único: barato de coordenar, caro de auditar; vários: o inverso) e a referência do Trial Forge: ICF (linguagem leiga, busca de cláusula de consentimento, reflexão de superfície e conteúdo), protocolo (técnico, busca de critérios, superfície) e CSR (estatístico, síntese e formatação ICH E3, superfície e conteúdo).
4. Checklist rápido 'agente versus ferramenta' e a tabela 'Seu caso' para um processo que hoje passa por mais de uma pessoa antes de ficar pronto; a resposta é reaproveitada na Missão Prática 3.

**Como rodar**
- Escolha um processo seu em que várias pessoas ou sistemas precisam concordar sobre o mesmo estado e preencha as três dimensões.
- Guarde o resultado: o Módulo 3.5 pede um mapa de padrões e um contrato de eventos sobre o mesmo processo.

**Armadilhas e achados no código**
- O canvas é um guia, não uma fórmula: ele mesmo avisa que divergência de risco pode justificar dividir mesmo com o resto igual.
- A pasta do módulo 3 não tem `package.json`: o protótipo ([D8-07](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md)) não usa dependências externas.

---

## 🔗 Para ir além
- [Repositório oficial do módulo 08 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia)
- [Pasta do módulo 3 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-03-multi-agent)
- [Google: Agent2Agent Protocol (A2A)](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
- [Anthropic: How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Gartner: Multiagent Systems](https://www.gartner.com/en/articles/multiagent-systems)
- [Gartner: 40% dos apps corporativos terão agentes por tarefa até 2026](https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025)

---

⬅️ [04 · Ferramentas tipadas, MCP e a calibragem do agente completo](./04-ferramentas-mcp-e-calibragem-do-agente.md)  ·  [06 · Seis padrões de orquestração: Sequential, Parallel, Supervisor, Hierarchical, Group Chat e Handoff](./06-seis-padroes-de-orquestracao.md) ➡️
