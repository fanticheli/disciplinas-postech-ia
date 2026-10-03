# 03 · ReAct e Reflection: raciocinar e agir em loop, depois criticar o que foi produzido

> **Módulo 2 · Aulas 2 e 3** · Leitura: ~12 min · Bloco: Arquiteturas Single-Agent

## 🎯 Em uma frase
O **ReAct** é o ciclo Pensamento, Ação, Observação, Decisão que faz do agente algo diferente de uma chamada ao modelo: o número de voltas não é conhecido antes e por isso exige **critério de parada explícito**. O **Reflection** é outra coisa: sem ferramentas novas, uma chamada separada que critica o resultado, reduz erro de síntese, mas tem pontos cegos e **não substitui a revisão humana**.

---

## 👵 Explicando para a vovó

ReAct é o detetive que, antes de concluir, vai atrás de pistas: anota o que sabe, interroga alguém, registra o que ouviu e decide se já pode fechar o caso. Se a pista não ajudou, volta e investiga outra coisa. O perigo é o detetive que nunca fecha o caso e a conta de táxi só cresce.

Reflection é o revisor que lê o relatório depois de pronto, com uma lista na mão do que procurar (números que não batem, seção faltando). Ele não sai investigando de novo: só caça defeito no que já está escrito. Mas se quem revisa é o mesmo autor, tende a não ver o próprio ponto cego.

---

## 🔧 Tecnicamente

### O que é
- **Agente versus chamada ao modelo:** numa chamada normal o fluxo termina assim que o modelo responde, completo ou não. No ReAct, antes de concluir o agente pode perceber que falta contexto, executar uma ação intermediária, analisar o novo contexto e decidir se responde ou investiga mais.
- **Origem:** ReAct: Synergizing Reasoning and Acting in Language Models (Shunyu Yao e colegas, 2022, ICLR 2023). Quase todo framework de agentes implementa alguma variação. A aula insiste: frameworks mudam, o ciclo permanece.
- **Quatro etapas:** **pensamento** (o que já sei, o que falta; liga ao planejamento), **ação** (chama ferramenta: busca, API, RAG, cálculo; delega ao determinístico), **observação** (o resultado volta como novo contexto, não como resposta final) e **decisão** ('já tenho contexto suficiente?'): se sim, o ciclo termina; se não, nova volta com contexto mais rico.
- **Loops variáveis:** uma pergunta simples resolve em uma volta, uma complexa em várias. Isso muda o projeto: não é mais uma sequência fixa de instruções, é um mecanismo que decide dinamicamente o próximo passo. E amarra ao framework do tópico anterior: se o caminho para resolver já é conhecido, não precisa de agente.
- **Riscos do ReAct:** custo crescente (cada volta traz chamadas, consultas e contexto acumulado) e ciclos sem convergência (ferramentas ambíguas, observação mal interpretada ou informação inexistente). **Contenção:** limite máximo de iterações, orçamento de custo ou tempo, e critério de confiança que, sem melhora após várias voltas, encaminha a um humano (ligação com o Approval Gate). Às vezes a melhor ação é admitir que não há informação suficiente.
- **Reflection:** formalizado no trabalho Reflexion: Language Agents with Verbal Reinforcement Learning (2023). Pedir ao modelo que revise a própria resposta melhora o resultado não por conhecimento novo, mas porque o objetivo muda de construir uma resposta para achar erro, inconsistência ou omissão. Responder e revisar são atividades distintas, e a revisão deve ser componente arquitetural, não truque de prompt.
- **Quatro etapas do Reflection:** execução (produz o resultado inicial), transformar o resultado em objeto de análise, reflexão (instruções específicas para procurar erros factuais, contradições, informação ausente) e resposta refletida (confirma que segue, ou gera versão corrigida/recomendações; se preciso, volta à execução).
- **Reflection versus ReAct:** ReAct busca informação nova; Reflection não usa ferramenta nenhuma e trabalha só sobre o que foi produzido. Não competem: primeiro o ReAct reúne informação, depois o Reflection verifica a qualidade.

### Como funciona
- **ReAct no Trial Forge:** gerar a seção condicional de um TCLE (por exemplo teste de HIV ou assentimento de menores). O agente não sabe antes se a seção entra. Analisa o protocolo, vê o que falta, consulta a base regulatória por RAG, observa o resultado e decide: as evidências bastam para dizer se a seção se aplica? Se não, consulta outra fonte. Nada de número fixo de etapas.
- **Por que assistentes de código parecem mais 'inteligentes':** hoje analisam o projeto, consultam arquivos relacionados, rodam testes, observam falhas e corrigem antes de apresentar. A sensação vem das várias voltas do ciclo, não só do modelo.
- **Observabilidade do loop:** o React Loop Canvas registra, por volta, o pensamento, a ferramenta, a observação e a decisão. Quando o agente se comporta de forma inesperada, raramente o problema está só no prompt inicial: normalmente uma observação intermediária foi mal interpretada. Cada iteração vira eventos a auditar.
- **Papel do arquiteto:** definir também quando o ciclo termina, que limite financeiro e de tempo é aceitável e quais situações exigem humano. Sem isso o agente vira um sistema caro, imprevisível e difícil de controlar.
- **Separar execução e crítica em chamadas independentes:** um único prompt pedindo 'responda e revise' tende a priorizar a geração e dar pouca atenção à crítica. Cada chamada com um objetivo cognitivo claro torna a revisão mais rigorosa e previsível.
- **Prompt de reflexão específico:** 'revise este texto' costuma produzir crítica superficial ou confirmar que está tudo bem. Peça categorias nomeadas (divergências numéricas, inconsistências regulatórias, informação obrigatória ausente, contradição entre seções): quanto mais clara a categoria de erro, melhor a revisão.
- **Exemplo do Trial Forge:** relatório clínico gerado em português e em inglês para submissão internacional. A reflexão compara as duas versões; a PT diz idade mínima de treze anos e a EN diz doze. Não é diferença de tradução, é inconsistência regulatória. O agente **não decide qual está certa**: aponta a divergência e o Approval Gate leva ao especialista. O valor está em detectar antes de chegar ao órgão regulador.
- **Limite estrutural:** quando o mesmo modelo gera e revisa, vieses e pontos cegos tendem a se repetir (como revisar o próprio código: acha omissão e sintaxe, dificilmente a falha estrutural do mesmo raciocínio). Mitigação: usar um segundo modelo, de preferência de outra família ou fornecedor, na crítica; custa mais, mas em componentes críticos é bom investimento.
- **Dois níveis:** reflexão de **superfície** (estrutura, completude, consistência entre seções, elementos obrigatórios; barata, vale em quase tudo) e de **conteúdo** (compara com fonte externa confiável, por exemplo o protocolo clínico original; mais cara e mais poderosa). Comparar só duas versões geradas detecta divergência entre elas, mas não o mesmo erro presente nas duas: para isso é preciso confrontar a fonte original. Documento de baixo risco usa só superfície; regulatório pede as duas.

### Onde aplicar
- Qualquer agente que descobre o que precisa em tempo de execução (seções condicionais, investigação, depuração).
- Documentos em mais de um idioma ou versão, onde divergência numérica custa caro.
- Reduzir o volume de erros que chega ao revisor humano, sem eliminá-lo.
- Depuração: ler a trilha de voltas antes de mexer no prompt (o canvas lista sinais de alerta como observação repetida sem mudança e ação sem pensamento correspondente).

### Vantagens e limites
**Vantagens**
- ReAct dá flexibilidade: o número de passos acompanha a dificuldade real.
- Reflection pega inconsistências simples antes de consumirem tempo do revisor.
- Separar execução de crítica torna cada chamada mais focada e auditável.

**Limites**
- Cada volta do ReAct custa tokens e latência; sem limite, tarefa simples vira processo caro e lento.
- Reflection normalmente dobra chamadas ao modelo.
- A autorreflexão reduz erro mas não elimina pontos cegos do mesmo modelo.

### 🚫 Armadilhas
- Deixar o próprio modelo decidir sozinho quando parar.
- Pedir 'responda e revise' num prompt só.
- Usar prompt de reflexão genérico e depois confiar no 'está tudo certo'.
- Tratar Reflection como etapa final de aprovação em tarefa crítica.
- Comparar apenas versões geradas entre si sem confrontar a fonte original.

> 💡 **Cuidado no sentido oposto (do canvas do repo):** uma reflexão instruída a caçar problema também pode inventar um problema que não existe. Só deveria travar o fluxo automaticamente o que for verificável de forma objetiva (como a idade 12 versus 13); interpretação discutível merece uma segunda leitura humana antes de virar bloqueio.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| ReAct | Reasoning + Acting: Pensamento, Ação, Observação, Decisão em loop |
| Critério de parada | Limite de voltas, tempo ou orçamento, fixado no orquestrador |
| Ciclo sem convergência | Agente repete ações sem ganhar informação e nunca fecha |
| Reflection | Chamada separada que critica o resultado já produzido |
| Reflexão de superfície | Estrutura, completude, consistência interna |
| Reflexão de conteúdo | Comparação factual contra fonte externa confiável |
| Segundo modelo | Outra família/fornecedor na crítica para reduzir pontos cegos |
| React Loop Canvas | Tabela por volta: pensamento, ação, observação, continua? |

---

## 💻 No código do repo

**Projeto:** [modulo-02-single-agent (canvas do loop ReAct e canvas de prompts de reflexão)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-02-single-agent)

Dois canvases em Markdown para você preencher: o rastreamento por volta do loop ReAct e os dois prompts de uma reflexão separada em execução e crítica. O código executável do loop ReAct está no tópico [D8-04](./04-ferramentas-mcp-e-calibragem-do-agente.md).

**Fluxo**
1. `react-loop-canvas.md`: tabela em branco com as colunas Volta, Pensamento, Ação, Observação, Continua? e Resposta Final, instruções de preenchimento (inclusive distinguir 'parou por convergência' de 'parou porque o limite de voltas foi atingido') e um exemplo preenchido do Trial Forge com a seção condicional de assentimento de menores (2 voltas).
2. O mesmo canvas lista quatro sinais de alerta na trilha: observação repetida sem mudança, ação sem pensamento correspondente, limite de voltas atingido (tratar como informação, não como erro a esconder) e parâmetro de ação plausível porém errado, descrito como o mais perigoso por não aparecer como erro óbvio.
3. `reflection-prompt-canvas.md`: Prompt 1 de execução e Prompt 2 de reflexão (chamada separada) com três categorias de erro nomeadas e a instrução de declarar 'nenhuma divergência encontrada nas categorias verificadas' em vez de elogio genérico; exemplo preenchido com CSR em português e inglês e o achado 12 anos versus 13 anos; tabela dos dois níveis (superfície e conteúdo) e o reforço de usar um modelo de família diferente na reflexão.

**Como rodar**
- Não há nada para executar aqui: preencha os canvases com uma tarefa sua. O canvas do loop é a primeira ferramenta de depuração antes de mexer no prompt.
- Para ver o custo da reflexão em número, rode a seção de planejamento do `agent-components-demo.js` (tópico [D8-02](./02-anatomia-do-agente-unico.md)).

**Armadilhas e achados no código**
- O par 'português 13 anos, inglês 12 anos' é o mesmo na apostila, no slide e neste canvas, e reaparece como a emenda ética de 13 para 12 no protótipo do módulo 3 e como o critério de inclusão 'doze anos' no índice de protocolo do gateway do módulo 4: é um fio condutor do case, não coincidência.
- O protótipo de referência (tópico [D8-04](./04-ferramentas-mcp-e-calibragem-do-agente.md)) **não tem reflexão** de propósito: a calibragem decide que o Approval Gate cobre a tarefa de assentimento. Os canvases de reflexão são material de projeto, sem implementação executável no repositório.

---

## 🔗 Para ir além
- [Repositório oficial do módulo 08 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia)
- [Pasta do módulo 2 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-02-single-agent)
- [ReAct: Synergizing Reasoning and Acting in Language Models (arXiv 2210.03629)](https://arxiv.org/abs/2210.03629)
- [Reflexion: Language Agents with Verbal Reinforcement Learning (arXiv 2303.11366)](https://arxiv.org/abs/2303.11366)
- [InformGen: copiloto de IA para TCLE (arXiv 2504.00934)](https://arxiv.org/abs/2504.00934)

---

⬅️ [02 · Anatomia do agente único: memória, planejamento, ferramentas e ação](./02-anatomia-do-agente-unico.md)  ·  [04 · Ferramentas tipadas, MCP e a calibragem do agente completo](./04-ferramentas-mcp-e-calibragem-do-agente.md) ➡️
