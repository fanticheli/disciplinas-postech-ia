# 01 · Agente ou regra? O framework das três perguntas e o orçamento de trade-offs

> **Módulo 1 · Aulas 3 e 4** · Leitura: ~12 min · Bloco: Fundamentos de Arquitetura AI-First

## 🎯 Em uma frase
Para decidir **agente versus regra determinística** use três perguntas em ordem: existe uma regra finita que cobre mais de 90% dos casos *reais*? o erro é caro e irreversível? o comportamento muda com o contexto? Aplique por **subtarefa**, não pela tarefa inteira. Depois, dê a cada componente um **orçamento** entre latência, custo, precisão e throughput: não existe arquitetura que maximize os quatro.

---

## 👵 Explicando para a vovó

Pense em decidir quem faz cada coisa numa obra. Pedir para o engenheiro-estrela conferir se a caixa de luz tem todas as tomadas é desperdício: é uma lista fixa, um ajudante resolve. Interpretar um projeto ambíguo é trabalho do engenheiro. E carimbar a obra para a prefeitura, que não tem volta, exige a assinatura de alguém responsável depois dele.

O framework é a lista de perguntas que vocês fazem juntos, na mesma ordem, para ninguém decidir por achismo. O orçamento é lembrar que o engenheiro-estrela é caro e demorado: cada setor da obra tem o seu limite de tempo e de dinheiro.

---

## 🔧 Tecnicamente

### O que é
- **Pergunta 1 - regra finita:** existe uma regra finita capaz de resolver mais de 90% dos casos *reais já observados* (não hipotéticos)? Se sim, regra determinística e fim. Exemplo do Trial Forge: validar campos obrigatórios de um formulário regulatório.
- **Pergunta 2 - erro caro e irreversível:** se não for regra, o erro tem alto impacto e consequências irreversíveis? Essa pergunta não decide se usa agente, decide o **grau de autonomia**: o agente propõe, a pessoa aprova (Approval Gate). Exemplo: a versão final de um TCLE.
- **Pergunta 3 - o comportamento muda com o contexto?** Se sim, é domínio de agente autônomo com observabilidade completa. Se não, mesmo que a regra pareça enorme, **uma regra extensa continua sendo regra**: árvore com dezenas de condições ainda é determinística, auditável e mais barata.
- **Quatro desfechos:** regra determinística, agente supervisionado (com gate), agente autônomo com observabilidade, ou combinação. O valor está no processo: a equipe responde às mesmas perguntas com as mesmas evidências, e a decisão fica auditável e repetível.
- **Caso-limite 1, tarefa híbrida:** a maioria dos processos parece uma tarefa e são várias. Em vez de 'é complexo demais para regra?', pergunte se toda a tarefa é complexa ou só a parte de entender a informação. Decomponha em subtarefas e aplique o framework em cada uma.
- **Caso-limite 2, reversibilidade:** erro caro mas reversível admite revisão *assíncrona* (o agente executa, alguém valida depois). Erro irreversível exige aprovação *antes* da execução. A pergunta vira: é possível desfazer depois de acontecer? Corrigir formatação interna é reversível; protocolar documento numa autoridade não é.
- **Caso-limite 3, classificações evoluem:** a camada de observabilidade pode revelar padrões estáveis e uma parte da tarefa migra de agente para regra; o inverso também acontece, quando uma regra acumula tantas exceções que um agente fica mais simples de manter. Reavalie com base nas evidências do próprio sistema.
- **Os quatro eixos do orçamento:** latência (soma de rede + inferência + RAG + ferramentas + planejamento, e o contexto acumulado faz o agente crescer mais que proporcionalmente), custo (tokens de entrada e saída; contexto grande e documentos irrelevantes custam), precisão (não é perfeição: classificação simples cabe em modelo menor, documento regulatório justifica modelo melhor) e performance/throughput (quantas requisições simultâneas; rate limit do provedor forma fila e piora a latência de todos).

### Como funciona
- **Exemplo de decomposição, emenda de protocolo:** (1) identificar o que mudou entre duas versões é interpretação de linguagem natural, vai para o agente; (2) classificar a emenda como administrativa ou substancial segue uma tabela regulatória objetiva, regra; (3) decidir se precisa de aprovação combina regra com Approval Gate (administrativa segue, substancial para até um especialista aprovar); (4) após a aprovação, o agente volta a regenerar os documentos afetados. As interpretações ficam no modelo, as regras no Orquestrador, o controle de risco no gate.
- **Segundo exemplo, evento adverso:** entender o relato 'tontura algumas horas depois do medicamento' exige linguagem natural (agente); depois de classificado numa categoria padronizada, saber se há notificação obrigatória segue critérios de farmacovigilância (regra); notificar autoridade regulatória é irreversível, então passa por Approval Gate.
- **Orçamento não é global:** Gateway precisa de latência baixa (custo baixo, sem precisão de modelo); Orquestrador também latência baixa e precisão alta no roteamento; Modelo + Tools/RAG tolera latência maior e concentra o custo, com precisão como objetivo principal (vira documento oficial); Approval Gate mede-se em minutos ou horas e custo/precisão deixam de ser do modelo.
- **O mesmo componente muda de perfil conforme o uso:** especialista esperando um documento em reunião quer latência (modelo mais rápido, cache); processamento noturno de dezenas de relatórios para uma auditoria anual abre mão da latência, aceita mais verificações, mais documentos e modelos mais sofisticados, e muitos provedores oferecem custo reduzido para processamento em lote.
- **Trade-offs típicos:** modelo menor reduz custo e sacrifica precisão; mais etapas de validação sobem confiabilidade e latência; vários modelos em paralelo aceleram e custam mais. Arquitetura é decidir quais características são prioritárias e quais podem ser flexibilizadas.
- **Exercício que fecha o módulo (Missão Prática 1):** desenhar o diagrama de referência de um caso real, classificar cada tarefa com as três perguntas (decompondo as híbridas) e dar a cada componente um orçamento com o eixo inegociável. Resultado: o primeiro documento de arquitetura utilizável.

### Onde aplicar
- Reunião de arquitetura: troque 'acho complexo demais' pela sequência P1, P2, P3 preenchida em tabela.
- Antes de colocar um agente num fluxo existente, decomponha o fluxo e deixe validações estruturais, regras legais bem definidas e fluxos repetitivos no código tradicional.
- Decida o tipo de gate pela reversibilidade: síncrono se irreversível, assíncrono se caro porém reversível.
- Defina o eixo inegociável de cada componente antes de escrever o primeiro prompt, e revise o orçamento quando o contexto de uso mudar (interativo versus lote).

### Vantagens e limites
**Vantagens**
- Decisão auditável e reproduzível por qualquer pessoa do time.
- Evita agentes onde bastaria uma função, que só trazem custo, complexidade e risco.
- A decomposição produz arquiteturas mais equilibradas e mais baratas.

**Limites**
- A árvore de três perguntas é simplificação: nem toda tarefa mapeia limpo numa tripla P1/P2/P3 (o próprio material admite isso para duas das quatro linhas do exemplo da emenda).
- Exige honestidade sobre 'casos reais observados', o que pede dados que um projeto novo ainda não tem.
- As classificações envelhecem e precisam de revisão periódica.

### 🚫 Armadilhas
- Aplicar o framework à tarefa inteira em vez de decompor.
- Achar que complexidade aparente significa necessidade de IA: regra extensa continua sendo regra.
- Usar 'erro grave' como critério: a pergunta certa é se dá para desfazer.
- Deixar custo e latência para depois: o que não é decidido no projeto é decidido pelos valores padrão e aparece caro em produção.
- Tratar a classificação como definitiva.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| P1 | Existe regra finita cobrindo mais de 90% dos casos reais? Sim: regra |
| P2 | Erro caro e irreversível? Sim: agente só propõe, Approval Gate |
| P3 | Comportamento muda com o contexto? Sim: agente autônomo observável; não: regra |
| Tarefa híbrida | Tarefa que parece única mas tem subtarefas de naturezas diferentes |
| Gate síncrono x assíncrono | Antes da ação (irreversível) x revisão posterior (reversível) |
| Latência x throughput | Tempo de uma requisição x quantas simultâneas o sistema aguenta |
| Orçamento arquitetural | Prioridades de latência, custo, precisão e performance por componente |

---

## 💻 No código do repo

**Projeto:** [modulo-01-fundamentos-ai-first (framework em código e atividade 1)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-01-fundamentos-ai-first)

O framework de três perguntas virou código puro, sem IA, sem rede, sem modelo: é o contraste didático de que decisão finita e auditável cabe em uma função. O mesmo módulo traz o checklist em Markdown e a Missão Prática 1 com um exemplo resolvido.

**Fluxo**
1. `decision-framework-checklist.md`: as três perguntas, os três casos-limite, um template de decomposição de tarefa híbrida e a tabela de referência 'Emenda de Protocolo' do Trial Forge (extrair mudanças, classificar emenda, rotear por criticidade, regenerar documentos).
2. `decision-framework-tool.js`: o objeto `CLASSIFICACAO` centraliza as quatro strings de resultado; `classificarTarefa(p1, p2, p3)` retorna regra se `p1`; senão Approval Gate se `p2`; senão agente autônomo se `p3`; senão 'regra determinística (enumerável)'. `decomporTarefaHibrida(subtarefas)` aplica a função a cada subtarefa e devolve a lista com o campo `classificacao`.
3. O mesmo arquivo traz 11 testes com o `assert` nativo do Node (as 4 combinações em que `p1` manda, as de `p2`, os casos de `p3` e a decomposição de duas subtarefas de referência) e uma demo narrada; `decision_framework_tool.py` é o espelho em Python com `unittest`.
4. `Atividade 1 - Módulo 1.pdf` (Missão Prática 1: diagrama + tabela P1/P2/P3 com tarefa híbrida + orçamento por componente + frase sobre um sinal de mudança) e `Exemplo - Módulo 1.pdf` (solução do Trial Forge: o Gateway é regra; extrair mudanças é agente; classificar emenda é regra; gerar rascunho do TCLE é agente + Approval Gate; eixo inegociável: latência no Gateway, precisão do roteamento no Orquestrador, precisão no Modelo).

**Como rodar**
- `cd modulo-01-fundamentos-ai-first` e `node decision-framework-tool.js` (roda os testes e depois a demo; não precisa instalar nada).
- `python3 decision_framework_tool.py` para a versão espelho.
- Verifiquei nesta pesquisa: o JS passa 11 de 11 testes e o Python passa 5 de 5 (os 5 testes do Python agrupam as mesmas combinações).
- Faça a Missão Prática 1 antes de abrir o PDF de exemplo: a dica do próprio exemplo é praticar a decisão, não copiar a resposta.

**Armadilhas e achados no código**
- A árvore tem limite assumido no código e no checklist: só duas das quatro subtarefas de referência da emenda mapeiam numa tripla única; 'rotear pela criticidade' e 'regenerar documentos afetados' misturam regra e gate condicional e ficam de fora dos testes de propósito.
- Como `p1` tem precedência, `p2` e `p3` são ignorados quando a regra existe: os testes cobrem as quatro combinações para provar isso.
- Este é o par JS/Python que a disciplina descreve: a versão em JavaScript é a oficial da ementa e a em Python é material de referência espelhado (os comentários do código dizem isso).

**JS versus Python**
em todo o módulo 08 o código vem em dois sabores com funcionalidade espelhada. A Missão Prática pede a entrega em JavaScript; o Python é referência. Aqui os testes diferem em quantidade (11 contra 5) mas cobrem as mesmas decisões.

---

## 🔗 Para ir além
- [Repositório oficial do módulo 08 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia)
- [Pasta do módulo 1 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-01-fundamentos-ai-first)

---

⬅️ [00 · AI-First: o modelo é só um componente, os 5 pilares e o diagrama de referência](./00-ai-first-pilares-e-diagrama-de-referencia.md)  ·  [02 · Anatomia do agente único: memória, planejamento, ferramentas e ação](./02-anatomia-do-agente-unico.md) ➡️
