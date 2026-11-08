# 📝 Disciplina 07 · Prova comentada

> Ferramentas de IA para Gestão de Projetos (caso RouteWise). Cada questão traz o enunciado, a resposta certa, o raciocínio, uma mini-aula dos conceitos citados, o erro de cada alternativa errada e onde se aprofundar no guia de leitura.

**Resumo das respostas**

| Questão | Tema | Resposta |
|---------|------|----------|
| 01 | Risk Monitor: do sinal à decisão (blocker, cenários, OKR) | **C** |
| 02 | OKR bom: baseline, meta, prazo e índice | **D** |
| 03 | O que é o percentil P85 | **C** |
| 04 | P50, P85 e P95: como responder ao board | **E** |
| 05 | Status report adaptativo para o executivo | **B** |
| 06 | Output x Outcome nos OKRs | **D** |
| 07 | NL to Workflow e mensagem ambígua (actionRequired) | **E** |
| 08 | Ata com pendência sem dono | **C** |
| 09 | Danger.js na governança automatizada | **B** |
| 10 | Meeting Digest Prompt: o erro a evitar | **B** |

**Mapa módulo → tópico** (a prova cita "Módulo N", que é a Unidade N da apostila): Módulo 2 → [03](./projeto-de-leitura/03-priorizacao-hippo-moscow-rice-wsjf.md) e [04](./projeto-de-leitura/04-backlog-scorer-contexto-flags-e-calibracao.md); Módulo 3 → [05](./projeto-de-leitura/05-cronograma-adaptativo-dependencias-capacidade-what-if.md); Módulo 4 → [06](./projeto-de-leitura/06-estimativas-tres-pontos-e-pert.md) e [07](./projeto-de-leitura/07-monte-carlo-p50-p85-p95.md); Módulo 5 → [08](./projeto-de-leitura/08-aiops-de-projeto-metricas-de-fluxo-e-risk-monitor.md); Módulo 6 → [09](./projeto-de-leitura/09-meeting-digest-ata-acoes-e-cards-jira.md); Módulo 7 → [10](./projeto-de-leitura/10-status-reports-tres-audiencias.md); Módulo 8 → [11](./projeto-de-leitura/11-governanca-como-codigo-e-compliance-checklist.md) e [12](./projeto-de-leitura/12-danger-regras-de-conformidade-no-pipeline.md); Módulo 9 → [13](./projeto-de-leitura/13-nl-to-workflow-slack-jira.md); Módulo 10 → [14](./projeto-de-leitura/14-okrs-alinhamento-de-backlog-e-portfolio.md) e [15](./projeto-de-leitura/15-fechamento-curadoria-final-e-cadeia-completa.md).

---

## Questão 01 · Risk Monitor: do sinal à decisão

**Pergunta:** O Risk Monitor da RouteWise aponta a US-03 bloqueada pelo hardware do acelerômetro (cotação sem prazo do fornecedor), previsibilidade em queda e Lead Time 66% acima do baseline. Qual ação mantém continuidade com os módulos 2, 3 e 4?

**Alternativas:**
- A) Remover a US-03 do backlog para preservar as métricas.
- B) Transferir automaticamente a responsabilidade ao fornecedor e encerrar o risco.
- C) ✅ Registrar o blocker, recalcular cenários de prazo e capacidade e comunicar opções de mitigação ligadas ao impacto no OKR.
- D) Recalcular o plano ignorando a US-03 sem comunicar o impacto no OKR.
- E) Aumentar a prioridade da US-03 e manter o prazo original.

**Resposta: C.** Registrar o blocker, recalcular cenários de prazo e capacidade e comunicar opções de mitigação ligadas ao impacto no OKR.

### Resolução comentada

A pergunta pede "continuidade com os módulos 2, 3 e 4". Pense na cadeia: o Módulo 2 priorizou (e a US-03 já tinha flag de bloqueio parcial na priorização), o Módulo 3 montou o cronograma com capacidade e dependências, o Módulo 4 transformou prazo em probabilidade. Quando o Risk Monitor (Módulo 5) acende o alerta, a resposta certa é alimentar de volta essa cadeia, e não apagar o problema.

Na prática, o bloqueio muda a capacidade disponível no planejamento, desloca os percentis da previsão e exige mitigação no risco. Como a US-03 serve a um resultado de negócio, o impacto precisa ser comunicado em termos de OKR. Em resumo: transformar o sinal em decisão.

O truque para eliminar as demais é perceber que todas "resolvem" o alerta sem tratá-lo: escondem a história (A), terceirizam a culpa (B), ocultam o impacto (D) ou fingem que o prazo não mudou (E).

### Entenda os conceitos

- **Risk Monitor:** prompt de AIOps de projeto que lê métricas que o Jira já guarda (lead time, cycle time, bugs, mudanças de escopo, itens parados) e devolve um cockpit verde/amarelo/vermelho por componente, diagnóstico, plano de mitigação e projeção de risco. Analogia do guia: o painel do carro que acende a luz do óleo antes de o motor fundir; quem decide continua sendo o motorista.
- **Blocker (impedimento):** item que não anda por causa de algo fora do controle do time (aqui, o hardware sem prazo do fornecedor). O guia pede que cada impedimento tenha responsável, prazo e ação, e mede o tempo que ele fica aberto.
- **Lead Time e baseline:** Lead Time é o tempo da entrada no backlog até a conclusão, incluindo filas. Baseline (linha de base) é o valor de referência da métrica; no material, o baseline é 6,5 dias. "66% acima do baseline" significa um lead time de cerca de 10,8 dias (o número do material, sem o 66% explícito; ver Pontos de atenção). Se o cycle time (tempo de desenvolvimento ativo) fica estável e o lead time sobe, o gargalo é fila e dependência, não a implementação.
- **Previsibilidade:** capacidade de o time entregar o que planejou. No caso do guia, aparece como histórias planejadas contra entregues por sprint (4/4, 4/3, 5/3 e 5/2): a queda desse índice é o sinal de perda de previsibilidade. O termo "previsibilidade" como métrica nomeada não aparece no guia (complemento, fora do material).
- **Cenários de prazo e capacidade (what-if):** recalcular o cronograma com a nova restrição e mostrar o trade-off de cada alternativa. O guia lembra que dependência externa "se resolver dentro da sprint" é expectativa, não planejamento.
- **Mitigação ligada ao OKR:** a ação proposta precisa dizer o que ela protege no resultado de negócio. O guia mostra mitigações com critério de sucesso (por exemplo, "Stop Starting, Start Finishing" e Definition of Ready mais rígida para histórias que dependem de hardware).
- **Fadiga de alertas:** alerta sem dono é ignorado. Cada anomalia precisa de responsável e procedimento.

### Por que as outras erram

- **A:** remover a US-03 "para preservar métricas" maquia o dado em vez de tratar a causa. O guia insiste em separar sintoma de causa e em dar dono a cada item vermelho.
- **B:** não existe "transferir automaticamente" a responsabilidade e dar o risco por encerrado. Um fornecedor sem prazo continua sendo risco do projeto, que precisa de mitigação e acompanhamento.
- **D:** recalcular sem a US-03 e sem comunicar o impacto no OKR esconde do board e do negócio o que mudou. O objetivo do monitor é decisão informada.
- **E:** subir a prioridade não destrava hardware. Capacidade extra não acelera a entrega do fornecedor, e manter o prazo original ignora o que o Monte Carlo e o cronograma mostram.

### Aprofundar no guia

- [08 · AIOps de projeto](./projeto-de-leitura/08-aiops-de-projeto-metricas-de-fluxo-e-risk-monitor.md), seção "Como funciona": o caso RouteWise, o cockpit de riscos, a separação entre sintoma e causa e o plano de mitigação proporcional.
- [08 · AIOps de projeto](./projeto-de-leitura/08-aiops-de-projeto-metricas-de-fluxo-e-risk-monitor.md), seção "O que é": diferença entre lead time e cycle time e as quatro métricas de fluxo.
- [05 · Cronograma adaptativo](./projeto-de-leitura/05-cronograma-adaptativo-dependencias-capacidade-what-if.md), seção "O que é": dependências externas e análise what-if; a capacidade nominal versus real (35 SP com fator de 65% vira cerca de 22 SP) está em "Como funciona".
- [07 · Monte Carlo](./projeto-de-leitura/07-monte-carlo-p50-p85-p95.md), seções "Como funciona" (por que a espera pelo hardware é restrição de calendário) e "Onde aplicar" (rodar de novo quando o prazo do fornecedor muda).

*Código da questão: 173197*

---

## Questão 02 · OKR bom: baseline, meta, prazo e índice

**Pergunta:** OKR A: "Implementar módulo de alertas de velocidade até setembro". OKR B: "Reduzir o índice de acidentes por excesso de velocidade em 20% até setembro (baseline: 7 sinistros/ano), com alertas operacionais e acompanhamento semanal". Qual é melhor e por quê?

**Alternativas:**
- A) OKR A, porque evita depender de comportamento dos motoristas.
- B) OKR A, porque a implementação é mais controlável pelo time de tecnologia.
- C) OKR B é inferior porque sinistros são raros e nunca devem entrar em OKRs.
- D) ✅ OKR B, porque conecta objetivo de negócio, baseline, meta mensurável, prazo e mecanismo de acompanhamento.
- E) São equivalentes porque ambos têm prazo.

**Resposta: D.** OKR B, porque conecta objetivo de negócio, baseline, meta mensurável, prazo e mecanismo de acompanhamento.

### Resolução comentada

Compare o que cada OKR mede. O A diz o que o time vai construir: se o módulo for entregue, o OKR está "cumprido", mesmo que ninguém tenha sofrido menos acidentes. É uma tarefa de implementação disfarçada de resultado. O B diz o que vai mudar no negócio, de quanto, a partir de qual ponto e até quando.

Um bom checklist de OKR tem: estado desejado (objetivo), resultado mensurável, baseline, prazo e como acompanhar. O B cumpre todos. O A só cumpre o prazo, e é por isso que a E é fraca: ter prazo não basta.

A resolução da prova acrescenta um detalhe: usar índice em vez de contagem absoluta reduz o ruído estatístico em eventos raros. Com 7 sinistros por ano, um acidente a mais ou a menos muda muito a contagem, mas um índice (por exemplo, por quilômetro rodado) é mais estável. Esse ponto vem da resolução e não está detalhado no guia (ver Pontos de atenção).

### Entenda os conceitos

- **OKR (Objectives and Key Results):** o Objective é qualitativo e descreve o estado desejado; os Key Results são quantitativos e verificáveis. O erro mais comum, segundo o guia, é usar tarefa como KR: "implementar o módulo de alertas" é tarefa, "reduzir acidentes por excesso de velocidade" é resultado.
- **Baseline:** o valor do indicador antes do ciclo (aqui, 7 sinistros por ano). Sem ele, "reduzir 20%" não tem ponto de partida. O Aligner do curso avalia seis critérios por KR: mensurável, baseline, prazo, responsável implícito, independente de output e verificável por terceiro.
- **Meta e prazo:** "20% até setembro" é a meta mensurável com data. Um KR sem prazo não permite check-in.
- **Índice x contagem:** um índice normaliza o evento pelo volume de exposição, enquanto a contagem absoluta oscila muito quando o evento é raro (complemento da resolução, fora do material).
- **Mecanismo de acompanhamento:** "acompanhamento semanal" liga o KR à rotina. O guia diz que a maioria dos OKRs falha pela falta de conexão entre objetivo e trabalho diário, e que check-ins frequentes permitem corrigir a tempo.
- **Output x Outcome:** o A é Output (o que se entrega), o B é Outcome (o efeito no negócio). Ver a Questão 06.

### Por que as outras erram

- **A:** evitar depender do comportamento dos motoristas é justamente fugir do resultado. O OKR existe para medir se o negócio mudou.
- **B:** ser controlável pelo time de tecnologia é uma qualidade de tarefa, não de OKR. Facilidade de cumprir não é critério de qualidade.
- **C:** sinistros raros não impedem OKR. A solução é usar índice em vez de contagem absoluta e acompanhar com frequência; a palavra "nunca" é o sinal de exagero.
- **E:** ambos terem prazo não os torna equivalentes. Só o B tem baseline, meta, resultado de negócio e acompanhamento.

### Aprofundar no guia

- [14 · OKRs, alinhamento de backlog e portfólio](./projeto-de-leitura/14-okrs-alinhamento-de-backlog-e-portfolio.md), seção "O que é": estrutura do OKR e o erro de usar tarefa como Key Result (o próprio exemplo do módulo de alertas).
- [14 · OKRs, alinhamento de backlog e portfólio](./projeto-de-leitura/14-okrs-alinhamento-de-backlog-e-portfolio.md), seção "Como funciona" (Parte A): os seis critérios de validação de um KR.
- [14 · OKRs, alinhamento de backlog e portfólio](./projeto-de-leitura/14-okrs-alinhamento-de-backlog-e-portfolio.md), seção "No código do repo", itens "Armadilhas e achados": a inconsistência de baseline e meta (7 para 5 não é 20%).
- [15 · Fechamento](./projeto-de-leitura/15-fechamento-curadoria-final-e-cadeia-completa.md), seção "O que é": validação estrutural não é validação de valor.

*Código da questão: 173207*

---

## Questão 03 · O que é o percentil P85

**Pergunta:** O que representa o percentil P85 em estimativa probabilística de prazo?

**Alternativas:**
- A) 85% dos riscos mitigados.
- B) Time operando com 85% da capacidade máxima.
- C) ✅ 85% de probabilidade de o projeto ser entregue até aquela data, dadas as premissas e os dados históricos usados.
- D) 85% das histórias concluídas.
- E) Velocidade 85% superior ao baseline.

**Resposta: C.** 85% de probabilidade de o projeto ser entregue até aquela data, dadas as premissas e os dados históricos usados.

### Resolução comentada

Percentil é um conceito de distribuição: o P85 é o valor abaixo do qual caem 85% dos resultados. Numa simulação de prazo, em 85% das rodadas a entrega acontece até aquela data. Por isso o P85 é uma data de alta confiança.

Repare na ressalva da resposta certa: "dadas as premissas e os dados históricos usados". O P85 não é garantia absoluta. Os 15% restantes podem atrasar, e o modelo só captura a incerteza que foi modelada. Mesmo assim, comunicar uma faixa de probabilidade é mais honesto do que prometer uma data única.

Todas as outras alternativas misturam o "85" com outras grandezas (riscos, capacidade, histórias, velocidade). Quando o número é um percentil, a pergunta é sempre "qual a chance de terminar até aqui".

### Entenda os conceitos

- **Monte Carlo:** em vez de um cenário, milhares de simulações com valores sorteados dentro das distribuições estimadas de cada história, resultando numa distribuição de datas de conclusão. Analogia do guia: refazer a viagem mil vezes na cabeça e anotar quantas vezes você chega até as 9h; se em 85 de 100 chega, "até as 9h" tem 85% de confiança.
- **P50, P85 e P95:** o P50 é a mediana (comprometer o prazo aí é aceitar cerca de 50% de chance de atraso; serve para análise interna). O P85 é o nível usado para comunicar com clientes e patrocinadores. O P95 é mais conservador, para projetos críticos com penalidade contratual ou impacto regulatório.
- **Previsão probabilística:** o prazo vira uma escolha de tolerância ao risco, a pergunta passa a ser "qual probabilidade de atraso você aceita?". O guia compara com SLO de projeto, como os percentis de latência na engenharia de confiabilidade.
- **O cálculo roda em script:** modelo de linguagem não gera aleatoriedade de verdade; pedir ao LLM para "simular 1000 cenários" produz números plausíveis, mas sem distribuição real. Os scripts do curso (JS e Python) sorteiam uma distribuição triangular.
- **Três pontos e PERT:** cada história tem estimativa otimista, mais provável e pessimista. É a entrada do Monte Carlo (tópico 06).

### Por que as outras erram

- **A:** percentil de prazo não mede riscos mitigados. Mitigação é tema do Risk Monitor.
- **B:** não tem relação com capacidade. Capacidade real é outro conceito (capacidade nominal vezes fator de foco, no cronograma).
- **D:** não é progresso. "85% das histórias concluídas" é percentual de conclusão, não probabilidade de data.
- **E:** velocidade e baseline são métricas de fluxo. Percentil descreve a distribuição de datas.

### Aprofundar no guia

- [07 · Monte Carlo](./projeto-de-leitura/07-monte-carlo-p50-p85-p95.md), seção "O que é": definição de P50, P85 e P95 e a analogia das mil viagens.
- [07 · Monte Carlo](./projeto-de-leitura/07-monte-carlo-p50-p85-p95.md), seção "🚫 Armadilhas": pedir ao LLM para simular, prometer o P50 ao cliente e achar que P50 perto de P95 significa previsibilidade.
- [06 · Estimativas com três pontos e PERT](./projeto-de-leitura/06-estimativas-tres-pontos-e-pert.md), seção "O que é": otimista, mais provável e pessimista, a entrada do Monte Carlo.

*Código da questão: 173194*

---

## Questão 04 · P50, P85 e P95: como responder ao board

**Pergunta:** A RouteWise tem P50 = 12,5 semanas, P85 = 13,1 e P95 = 13,4 para o MVP. O board quer anunciar 12 semanas (o cronograma original). Qual é a resposta mais responsável do PM?

**Alternativas:**
- A) Confirmar 12 semanas por estar próximo do P50.
- B) Recusar qualquer data abaixo do P95 e cancelar o projeto.
- C) Ignorar percentis porque executivos não usam esse dado.
- D) Prometer 12 semanas e compensar com horas extras.
- E) ✅ Explicar que 12 semanas fica abaixo do P50 (menos de 50% de chance), propor comprometer o P85 com o cliente, reduzir escopo ou comunicar o risco explicitamente.

**Resposta: E.** Explicar que 12 semanas fica abaixo do P50 (menos de 50% de chance), propor comprometer o P85 com o cliente, reduzir escopo ou comunicar o risco explicitamente.

### Resolução comentada

Leia os números: o P50 é 12,5 semanas, ou seja, só metade das simulações termina em 12,5 semanas ou menos. A data de 12 semanas está antes disso, então tem menos de 50% de chance. É um compromisso frágil. O Módulo 4 conecta previsão probabilística e comunicação executiva: o PM não diz "não" nem "sim", ele apresenta o trade-off.

As saídas honestas são três: comprometer o P85 (13,1 semanas, cerca de uma semana a mais), reduzir escopo para caber em 12 semanas, ou aceitar o risco de forma explícita e documentada. O guia chama isso de transformar a data única em discussão sobre o risco que o stakeholder aceita.

As alternativas extremas (recusar tudo, ignorar tudo, prometer e queimar o time) falham em comunicação responsável.

### Entenda os conceitos

- **P50 como mediana:** prometer o P50 é aceitar cerca de 50% de chance de atraso. Antes dele, a chance é menor ainda. O guia diz que 12 semanas seria algo próximo de P35 (leitura do guia; a prova só afirma "menos de 50%").
- **Restrição dominante:** P50 e P95 ficam muito próximos (12,5 e 13,4) porque o lead time do hardware entrou como data fixa na semana 9, e a variabilidade do software perde influência. Isso não significa projeto previsível, e sim uma restrição fixa que domina.
- **Espera não é esforço:** o prazo do fornecedor é restrição de calendário, e não variabilidade de desenvolvimento. Misturar os dois é um erro comum.
- **Comunicação por público:** o executivo precisa da decisão de negócio (por exemplo, acelerar a compra do hardware); o cliente externo precisa saber que o risco foi identificado e mitigado, sem estatística.
- **Trade-off de escopo:** reduzir escopo ou renegociar a data são as duas saídas honestas do guia. Ver o what-if do cronograma (tópico 05).
- **P85 não é garantia:** os 15% restantes podem atrasar semanas. Por isso o compromisso com o cliente deve vir com o risco explicitado.

### Por que as outras erram

- **A:** 12 semanas não está "próximo do P50", está abaixo dele. Confirmar a data seria assumir um nível de confiança baixo.
- **B:** recusar tudo abaixo do P95 e cancelar o projeto é exagero. O P95 é para projetos críticos; o P85 é o nível usual de comunicação.
- **C:** ignorar percentis joga fora a informação principal. O guia mostra como traduzir percentis em decisão de negócio, sem estatística, para quem não é técnico.
- **D:** prometer 12 semanas e compensar com horas extras leva ao overcommitment, que o guia aponta como causa de atalhos, revisões frouxas e débito técnico.

### Aprofundar no guia

- [07 · Monte Carlo](./projeto-de-leitura/07-monte-carlo-p50-p85-p95.md), seção "O que é": os resultados do caso (12,5, 13,1 e 13,4), a restrição dominante e a comparação com as 12 semanas do plano.
- [07 · Monte Carlo](./projeto-de-leitura/07-monte-carlo-p50-p85-p95.md), seção "Como funciona": a comunicação por público e os cinco cuidados, incluindo o que fazer quando o stakeholder insiste numa data única.
- [05 · Cronograma adaptativo](./projeto-de-leitura/05-cronograma-adaptativo-dependencias-capacidade-what-if.md), seção "O que é": overcommitment e o what-if como forma de negociar escopo.

*Código da questão: 173195*

---

## Questão 05 · Status report adaptativo para o executivo

**Pergunta:** No Status Report Adaptativo (Módulo 7), o relatório ao executivo deve priorizar:

**Alternativas:**
- A) Retrospectiva completa da sprint e ações internas.
- B) ✅ Marcos, impacto em prazo e orçamento, riscos e decisões pendentes, em linguagem de negócio.
- C) Todos os dados brutos do Jira.
- D) Log de commits, cobertura de testes e tempo de build.
- E) Velocidade de sprint, Work in Progress e detalhes de cada história técnica.

**Resposta: B.** Marcos, impacto em prazo e orçamento, riscos e decisões pendentes, em linguagem de negócio.

### Resolução comentada

A ideia central do status report adaptativo é: mesmos dados, três narrativas. O que muda é a pergunta de cada leitor. O executivo quer saber se o projeto entrega o prometido, se está no orçamento e que risco exige a alta gestão. Ele não quer o caminho técnico, quer a decisão.

Por isso, a resposta é a que traz marcos, impacto, riscos e decisões pendentes em linguagem de negócio. Métricas como velocidade e WIP não somem: elas servem ao time e ao gestor operacional, mas precisam ser traduzidas em atraso, custo, escopo, risco e decisão requerida.

Uma boa heurística: nas alternativas erradas aparecem "completa", "todos os dados brutos", "log de commits", "detalhes de cada história". Quanto mais detalhe técnico, mais longe do executivo.

### Entenda os conceitos

- **Status Report adaptativo:** gera, a partir dos mesmos dados da sprint, três relatórios com linguagem, profundidade e decisão diferentes. Analogia do guia: o mesmo jogo de futebol contado de três jeitos (o técnico quer saber por que a zaga falhou, o dono do clube quer saber se o time se classifica, o torcedor quer saber se valeu o ingresso).
- **Time técnico:** velocity, lead time, cycle time, story points, débito técnico e bloqueios, em listas estruturadas, para orientar a próxima sprint.
- **Gestor de projeto ou produto:** percentual de conclusão, aderência ao cronograma, capacidade, riscos por probabilidade e impacto e decisões pendentes.
- **Executivo ou cliente:** até uma página, em linguagem de negócio. Em vez de "lead time cresceu 15% por excesso de WIP", dizer que o ritmo está levemente abaixo do planejado, qual ação corretiva foi adotada e que o cronograma geral está preservado.
- **WIP (Work in Progress):** trabalho iniciado e não concluído. É métrica de fluxo, útil ao time.
- **Curadoria:** conferir números, ler o relatório executivo como um diretor sem formação técnica, limitar as decisões a duas ou três e dar a cada risco uma ação e um responsável. A cor do status (vermelho ou amarelo) é julgamento gerencial.

### Por que as outras erram

- **A:** retrospectiva completa e ações internas interessam ao time, não ao executivo.
- **C:** dados brutos do Jira sem tradução fazem o executivo parar de ler. O guia alerta que, nesse caso, ele passa a decidir por conversa informal.
- **D:** commits, cobertura e tempo de build são métricas de engenharia, não de decisão de negócio.
- **E:** velocidade, WIP e detalhes técnicos são do relatório do time e do gestor operacional.

### Aprofundar no guia

- [10 · Status Reports: os mesmos dados em três audiências](./projeto-de-leitura/10-status-reports-tres-audiencias.md), seção "O que é": o conteúdo de cada audiência e o exemplo do lead time traduzido para o executivo.
- [10 · Status Reports](./projeto-de-leitura/10-status-reports-tres-audiencias.md), seção "Como funciona": as três narrativas dos dados da Sprint 4 e o checklist de curadoria.
- [10 · Status Reports](./projeto-de-leitura/10-status-reports-tres-audiencias.md), seção "🚫 Armadilhas": mandar o relatório técnico para a diretoria sem adaptação.

*Código da questão: 173200*

---

## Questão 06 · Output x Outcome nos OKRs

**Pergunta:** No Módulo 10, qual é a diferença central entre Output e Outcome na análise de OKRs da RouteWise?

**Alternativas:**
- A) Output é sempre financeiro; Outcome é sempre técnico.
- B) Output é o número de reuniões; Outcome é o número de slides.
- C) São sinônimos quando o backlog está 100% concluído.
- D) ✅ Output é a funcionalidade entregue; Outcome é a mudança mensurável no negócio, como a redução de sinistros.
- E) Output é definido pelo board; Outcome pelo Jira automaticamente.

**Resposta: D.** Output é a funcionalidade entregue; Outcome é a mudança mensurável no negócio, como a redução de sinistros.

### Resolução comentada

Output é o que a equipe produz. Outcome é o efeito que isso causa. A equipe pode concluir todas as histórias e mesmo assim o indicador de negócio não se mexer. Entregar funcionalidades não garante resultado.

No caso da RouteWise: os alertas de velocidade são Output; reduzir o índice de acidentes por excesso de velocidade em 20% até setembro é Outcome. A IA ajuda a mapear a conexão entre os dois, mas a gestão precisa acompanhar adoção e impacto real.

Isso se liga direto à Questão 02: o OKR A era Output, o B era Outcome.

### Entenda os conceitos

- **Output:** o que a equipe produz (funcionalidades, histórias concluídas). Analogia do guia: entregar 47 funcionalidades é correr bastante.
- **Outcome:** o impacto no negócio (satisfação, receita, custo, acidentes). Analogia: saber se chegou aonde importava.
- **Muito output, pouco outcome:** o guia cita a equipe que concluiu 47 histórias com o churn inalterado.
- **Adoção como limitador:** no exemplo de julho, a redução acumulada era de 8% contra 20% de meta, com o módulo de alertas já operando. A análise aponta que só cerca de 60% dos motoristas receberam treinamento: o limitador deixou de ser tecnológico e virou adoção. A recomendação é priorizar o treinamento, não mais desenvolvimento.
- **Backlog como hipótese:** cada história é uma hipótese sobre como mover um indicador. Histórias sem relação com nenhum objetivo são candidatas à reavaliação (o OKR Aligner as classifica como alinhadas diretamente, indiretamente ou não alinhadas).
- **Impacto em três dimensões:** no encerramento, registrar entregas (o que foi construído), resultados (o que mudou nos indicadores) e aprendizado (tópico 15).

### Por que as outras erram

- **A:** não há divisão por natureza financeira ou técnica. Um outcome pode ser de custo, de segurança ou de satisfação.
- **B:** reuniões e slides são atividades, nem output no sentido de funcionalidade nem outcome.
- **C:** concluir 100% do backlog dá 100% de output, e nada garante outcome. Não são sinônimos.
- **E:** quem define o outcome é o objetivo de negócio; o Jira não "gera" outcomes. A gestão mede.

### Aprofundar no guia

- [14 · OKRs, alinhamento de backlog e portfólio](./projeto-de-leitura/14-okrs-alinhamento-de-backlog-e-portfolio.md), seção "O que é": output versus outcome, backlog como hipótese e o exemplo de julho (8% contra 20%, adoção em 60%).
- [14 · OKRs, alinhamento de backlog e portfólio](./projeto-de-leitura/14-okrs-alinhamento-de-backlog-e-portfolio.md), seção "🧩 Cola rápida": termos de OKR, baseline e alinhamento.
- [15 · Fechamento](./projeto-de-leitura/15-fechamento-curadoria-final-e-cadeia-completa.md), seção "O que é": impacto em três dimensões (entregas, resultados e aprendizado) e encerrar por hipóteses.

*Código da questão: 173206*

---

## Questão 07 · NL to Workflow e mensagem ambígua

**Pergunta:** No Módulo 9, por que uma mensagem ambígua do Slack não deve virar card automaticamente no Jira?

**Alternativas:**
- A) LLMs não classificam mensagens de trabalho.
- B) Perguntas devem ser apagadas para reduzir ruído.
- C) APIs do Jira não aceitam integração com o Slack.
- D) Toda automação deve ser manual pelo PM.
- E) ✅ Mensagens ambíguas devem retornar actionRequired ou um pedido de confirmação, para evitar falsos positivos no backlog.

**Resposta: E.** Mensagens ambíguas devem retornar actionRequired ou um pedido de confirmação, para evitar falsos positivos no backlog.

### Resolução comentada

O NL to Workflow usa o modelo como parser: lê a mensagem, extrai tipo, severidade, componente e responsável, e uma API executa a ação. Para isso o modelo precisa distinguir tarefa, pergunta, decisão e mensagem desconhecida. Se qualquer frase virasse card, o backlog ficaria poluído e perderia a confiança do time.

A solução não é desistir da automação (D) nem negar que o LLM funciona (A): é tratar a ambiguidade. Quando a mensagem é ambígua, o parser devolve `actionRequired` ou pede confirmação ou reformulação antes de acionar a API. O humano continua no controle onde há dúvida.

### Entenda os conceitos

- **NL to Workflow:** linguagem natural convertida em objetos estruturados de ferramentas de gestão (entrada, extração, ação). O Ecosystem Bot decide quais artefatos criar, não responde perguntas.
- **Conectadas x integradas:** ferramentas conectadas apenas transportam o texto (webhook); as integradas interpretam o contexto. Analogia do guia: o balcão que cola o bilhete do cliente no formulário contra o atendente que lê e classifica.
- **actionRequired:** campo que trava a criação do card até um humano agir. O guia o usa para mensagens com decisão de gestão (por exemplo, "adiar o deploy ou remover o score"), para que o bot não crie um card operacional para algo que ainda precisa de decisão.
- **Confidence:** a confiança do parser guia a lógica de fallback (alta cria, média confirma, baixa pede reformulação).
- **Falso positivo no backlog:** card criado para algo que não é tarefa. Polui o backlog e reduz a confiança na automação.
- **Etapa de confirmação e log de auditoria:** o fluxo robusto mostra responsável, prioridade e sprint sugeridos antes de criar o card, e registra data, canal, ID da mensagem, versão do prompt e output bruto.
- **Casos de borda:** pergunta que parece ação vira tipo `question`, sem criar card; mensagem com várias ações gera um array de cards.

### Por que as outras erram

- **A:** LLMs classificam mensagens de trabalho muito bem; é exatamente o que o parser faz. O ponto é a ambiguidade, não a incapacidade.
- **B:** perguntas não devem ser apagadas, e sim classificadas como `question` sem criar card.
- **C:** as integrações Slack para Jira existem (Make.com ou Node.js). O guia mostra os dois sentidos de sincronização.
- **D:** toda automação manual anula o ganho. O guia prega confirmação humana só nos casos ambíguos ou de impacto alto.

### Aprofundar no guia

- [13 · NL to Workflow](./projeto-de-leitura/13-nl-to-workflow-slack-jira.md), seção "O que é": ambiguidade tratada e não resolvida às cegas, e a regra do `actionRequired` para decisão de gestão.
- [13 · NL to Workflow](./projeto-de-leitura/13-nl-to-workflow-slack-jira.md), seção "Como funciona": o fluxo robusto com confirmação, o log de auditoria e os casos de borda.
- [13 · NL to Workflow](./projeto-de-leitura/13-nl-to-workflow-slack-jira.md), seção "🚫 Armadilhas": criar o card direto da mensagem, sem confirmação.

*Código da questão: 173204*

---

## Questão 08 · Ata com pendência sem dono

**Pergunta:** A ata do Módulo 6 registra "definir critérios de aceite do módulo GPS", mas ninguém assumiu. Qual é a saída mais adequada para alimentar os módulos seguintes sem poluir o backlog?

**Alternativas:**
- A) Criar card automaticamente para Carlos, o stakeholder principal.
- B) Descartar por falta de responsável.
- C) ✅ Classificar como pergunta ou pendência aberta e solicitar confirmação antes de criar card.
- D) Criar card sem responsável direto no sprint atual.
- E) Transformar a pendência em OKR para o Módulo 10.

**Resposta: C.** Classificar como pergunta ou pendência aberta e solicitar confirmação antes de criar card.

### Resolução comentada

Esta é a mesma lógica da Questão 07 aplicada à ata. A reunião gerou uma ação sem dono. Se alguém só "estava por perto" e recebe o card, o assignee fica errado e o backlog perde confiabilidade. Se a ação é descartada, a informação se perde.

O caminho do meio é registrar como pendência aberta e pedir confirmação humana antes de criar o card. Isso preserva a informação, evita card com assignee errado e mantém o backlog limpo. Automação boa preserva a decisão humana na ambiguidade.

### Entenda os conceitos

- **Meeting Digest:** prompt que transforma a transcrição em resumo, ações, decisões, perguntas em aberto e JSON para o Jira. Faz síntese semântica, não transcrição.
- **Quatro classificações:** compromissos de ação, decisões, riscos e impedimentos, e perguntas em aberto (com quem deve responder).
- **Ação x decisão:** ação vira card; decisão fica na documentação do projeto. "Carlos inicia a cotação" é ação; "adiar a manutenção preditiva por falta de hardware" é decisão.
- **Pergunta ou pendência aberta:** item cujo responsável, prazo ou conteúdo ainda não foi confirmado. No caso do guia, o modelo deixou o prazo do fornecedor como pergunta em aberto, sem inventar responsável.
- **Ata e curadoria:** o protocolo de cinco passos manda revisar responsáveis indefinidos, prazos vazios e dar um dono a cada pergunta em aberto.
- **[A DEFINIR]:** marca para responsável ou prazo não mencionado; nunca inventar.
- **Pendência x OKR:** OKR é objetivo estratégico mensurável, não uma forma de guardar tarefa solta.

### Por que as outras erram

- **A:** atribuir a Carlos só porque ele é o stakeholder principal é atribuição por proximidade, o erro clássico do Meeting Digest (ver Questão 10). Cria card com assignee errado.
- **B:** descartar perde a informação. Pendência sem dono ainda é trabalho que precisa de dono.
- **D:** card sem responsável no sprint atual polui o sprint com item que ninguém vai puxar.
- **E:** transformar em OKR confunde nível estratégico com pendência operacional.

### Aprofundar no guia

- [09 · Meeting Digest](./projeto-de-leitura/09-meeting-digest-ata-acoes-e-cards-jira.md), seção "O que é": as quatro classificações e os destinos diferentes de ação e decisão.
- [09 · Meeting Digest](./projeto-de-leitura/09-meeting-digest-ata-acoes-e-cards-jira.md), seção "Como funciona": o protocolo de auditoria em cinco passos e o caso da pergunta em aberto sobre o prazo do fornecedor.
- [13 · NL to Workflow](./projeto-de-leitura/13-nl-to-workflow-slack-jira.md), seção "O que é": o mesmo princípio de pedir confirmação quando falta responsável.

*Código da questão: 173199*

---

## Questão 09 · Danger.js na governança automatizada

**Pergunta:** No Módulo 8, uma regra de Danger.js para governança automatizada roda normalmente quando?

**Alternativas:**
- A) Na retrospectiva da sprint.
- B) ✅ Em cada Pull Request, como etapa automática do pipeline de CI/CD.
- C) Em auditoria manual ao fim do projeto.
- D) Só depois do deploy em produção.
- E) Na abertura de um OKR trimestral.

**Resposta: B.** Em cada Pull Request, como etapa automática do pipeline de CI/CD.

### Resolução comentada

Governança como código significa que a regra é escrita em código e executada automaticamente no fluxo de desenvolvimento. O Danger.js roda durante a análise do Pull Request e checa rastreabilidade (card do Jira citado), padrões (tamanho do PR, descrição) e riscos (arquivos sensíveis, aprovações) antes do merge.

A lógica do "quanto mais cedo, mais barato" derruba as outras opções: retrospectiva, auditoria final, pós-deploy e OKR são momentos tardios ou de outro assunto. Descobrir um requisito faltando só depois do deploy desperdiça desenvolvimento, revisão e testes.

### Entenda os conceitos

- **Governança como código:** a mesma lógica de infraestrutura como código aplicada às regras de conformidade. A regra é executada a cada PR, mudança de status ou deploy, e o fluxo trava se ela não for satisfeita. Troca controle reativo por preventivo e remove a subjetividade entre revisores.
- **Danger.js:** executa regras de PR escritas em JavaScript e comenta no PR. Analogia do guia: o fiscal do condomínio que confere o formulário antes de a obra começar.
- **fail x warn:** `fail` bloqueia ("não passa"); `warn` avisa ("passa, mas olhe isto"). No estudo de caso, as regras de Jira e de duas aprovações em caminhos críticos bloqueiam; tamanho do PR e queda de cobertura só avisam. A regra de ouro dos slides: comece com `warn` e migre para `fail` quando o time internalizou a regra.
- **Pipeline de CI/CD:** no repositório demo, um workflow roda os testes e `npx danger ci --text-only`, e outro workflow publica o comentário no PR (por causa do token somente leitura em PRs de fork).
- **Branch protection:** falhas bloqueiam o merge; avisos não.
- **Trilha de auditoria:** Jira, PR, commit e deploy formam uma cadeia contínua que responde "por que esta funcionalidade existe e quem autorizou".

### Por que as outras erram

- **A:** a retrospectiva é cerimônia do time e chega depois do fato, quando corrigir custa mais.
- **C:** auditoria manual ao fim do projeto é exatamente o controle reativo que a governança como código quer substituir.
- **D:** depois do deploy a checagem já não impede o problema.
- **E:** a abertura de um OKR trimestral é planejamento estratégico, sem relação com o fluxo de PR.

### Aprofundar no guia

- [12 · Danger: regras de conformidade no pipeline](./projeto-de-leitura/12-danger-regras-de-conformidade-no-pipeline.md), seção "O que é": as quatro regras do estudo de caso e a diferença entre `fail` e `warn`.
- [12 · Danger](./projeto-de-leitura/12-danger-regras-de-conformidade-no-pipeline.md), seção "Como funciona": os dois workflows e o cuidado com PR de fork.
- [11 · Governança como código](./projeto-de-leitura/11-governanca-como-codigo-e-compliance-checklist.md), seção "O que é": trilha de auditoria e por que verificar na abertura do PR.

*Código da questão: 173202*

---

## Questão 10 · Meeting Digest Prompt: o erro a evitar

**Pergunta:** No Módulo 6, o Meeting Digest Prompt deve evitar qual erro ao transformar uma reunião em ações? (Atenção: a pergunta pede o erro a evitar, e não uma boa prática.)

**Alternativas:**
- A) Separar decisões tomadas de assuntos pendentes.
- B) ✅ Atribuir uma ação a quem apenas mencionou o tema, sem compromisso explícito.
- C) Criar resumo executivo com decisões e pendências.
- D) Sinalizar campos que exigem validação humana.
- E) Registrar perguntas em aberto quando não há responsável confirmado.

**Resposta: B.** Atribuir uma ação a quem apenas mencionou o tema, sem compromisso explícito.

### Resolução comentada

Esta questão é uma pegadinha de leitura. Quatro alternativas descrevem comportamentos corretos do prompt (A, C, D, E), e só uma descreve uma prática errada (B). Como a pergunta é "qual erro evitar", a resposta é a prática errada.

O erro clássico é a atribuição por proximidade: alguém falou do tema, mas não assumiu a ação. O prompt precisa preservar a rastreabilidade e marcar `[A DEFINIR]` quando responsável, prazo ou decisão não foram explicitamente confirmados.

O guia mostra o caso real: no exemplo do Módulo 6, a curadoria corrigiu a ação de validar LGPD que o modelo atribuiu a Carlos para `[A DEFINIR]`.

### Entenda os conceitos

- **Meeting Digest Prompt:** prompt que gera ata, ações, decisões, perguntas em aberto e JSON para o Jira. O system prompt do curso manda nunca inventar responsável ou prazo.
- **Atribuição por proximidade:** atribuir a tarefa a quem estava falando e não a quem se comprometeu. Analogia do guia: o secretário rápido erra de um jeito típico, e por isso o protocolo manda ler a lista de ações em voz alta antes de distribuir.
- **[A DEFINIR]:** marca para responsável ou prazo não mencionado. Nunca inventar. O guia também usa `[POSSÍVEL ERRO DE TRANSCRIÇÃO]`, `(implícita)` para decisões por omissão e `[ACOMPANHAMENTO]` para ação contínua sem entregável.
- **Compromisso explícito:** frases como "eu vejo isso hoje" são compromissos de ação. Sugerir um responsável é inferência aceitável; atribuir sem compromisso explícito passa do limite.
- **Decisão implícita:** acordo por omissão, quando ninguém objeta. Precisa ser marcada, e não registrada como se fosse consenso formal.
- **Validação humana:** é parte do desenho. A ata só vale depois da curadoria (responsáveis, prazos e decisões implícitas).

### Por que as outras erram

As alternativas A, C, D e E são práticas corretas, por isso não são "erros a evitar".

- **A:** separar decisões de assuntos pendentes é uma das funções do prompt (decisão fica no histórico, pendência vira pergunta em aberto).
- **C:** o resumo executivo com decisões e pendências é uma das saídas pedidas pelo prompt (4 a 6 bullets).
- **D:** sinalizar o que precisa de validação humana (`[A DEFINIR]`, `[POSSÍVEL ERRO DE TRANSCRIÇÃO]`) é o que mantém a rastreabilidade.
- **E:** registrar pergunta em aberto quando não há responsável confirmado é justamente o tratamento correto (ver Questão 08).

### Aprofundar no guia

- [09 · Meeting Digest](./projeto-de-leitura/09-meeting-digest-ata-acoes-e-cards-jira.md), seção "Como funciona": as armadilhas recorrentes, incluindo a atribuição por proximidade, e o protocolo de auditoria.
- [09 · Meeting Digest](./projeto-de-leitura/09-meeting-digest-ata-acoes-e-cards-jira.md), seção "🧩 Cola rápida": os marcadores `[A DEFINIR]` e `[ACOMPANHAMENTO]`.
- [09 · Meeting Digest](./projeto-de-leitura/09-meeting-digest-ata-acoes-e-cards-jira.md), seção "No código do repo", item 6 do Fluxo: o exemplo em que o modelo atribuiu a Carlos a validação de LGPD e a curadoria corrigiu para `[A DEFINIR]`.

*Código da questão: não informado*

---

## Pontos de atenção na prova

- **Texto das alternativas:** as alternativas foram reproduzidas a partir do que foi informado para a prova; a Q10 veio com o código da questão não informado.
- **Questão 01:** a prova fala em "Lead Time 66% acima do baseline" e em "previsibilidade em queda". O material traz lead time de 10,8 dias contra baseline de 6,5 dias (cerca de 66% acima, conta feita a partir dos números do material), mas não nomeia "previsibilidade" como métrica; o mais próximo são as histórias planejadas contra entregues por sprint. O guia também não descreve a US-03 como dependente do "acelerômetro" (só diz que ela está bloqueada no board da Sprint 4 e que o hardware sem prazo é a causa do bloqueio). A resposta C segue a resolução da prova.
- **Questão 02:** o material valida baseline, meta, prazo e Outcome (tópico 14), mas não discute "índice em vez de contagem" por ruído estatístico em eventos raros. Esse ponto vem da resolução. O guia ainda registra uma inconsistência: o KR 1.1 aparece como "reduzir acidentes em 20%" e como "sinistros de 7 para 5, cerca de 28%".
- **Questão 03:** o material confirma P85 como nível usado para comunicar com clientes (tópico 07). A frase "85% de probabilidade, dadas as premissas e os dados históricos" é da prova; o guia diz que "em 85% das simulações a entrega ocorre até aquele prazo" de forma equivalente.
- **Questão 04:** o guia diz que comprometer 12 semanas seria algo próximo de P35, o que é coerente com "menos de 50%" da prova. A prova cita o P85 de 13,1 semanas; o guia mostra também a recomendação de comprometer 13 semanas (Exemplo do Módulo 4). Ressalva do guia 07-monte-carlo: a simulação do próprio script dá cerca de 13% de chance de terminar em 12 semanas, e o "P35" da apostila não sai do script (o ponto qualitativo, 12 semanas bem abaixo do P50, continua valendo).
- **Questão 05:** o guia confirma o conteúdo por audiência (tópico 10). A lista exata "marcos, impacto em prazo e orçamento, riscos e decisões pendentes" é da prova; o guia fala em "o projeto entrega o prometido? Está no orçamento? Que risco exige a alta gestão?" e em decisões limitadas a duas ou três.
- **Questão 06:** o material cobre Output x Outcome no tópico 14. O Módulo 10 do guia é a Unidade 10 (tópicos 14 e 15).
- **Questão 07:** o guia cita `Action Required`/`actionRequired` para decisão de gestão (tópico 13); o uso do campo para "mensagem ambígua" em geral vem da resolução da prova (para "alguém pode pegar isso?" o guia fala em exigir confirmação).
- **Questão 08:** o material trata pergunta em aberto e `[A DEFINIR]` (tópico 09) e confirmação antes de criar card (tópico 13). O exemplo "critérios de aceite do módulo GPS" não aparece no guia; a resposta C segue a resolução da prova.
- **Questão 09:** o material confirma Danger.js rodando em cada Pull Request (tópico 12). A resolução fala em "rastreabilidade, padrões e riscos"; o guia lista Jira, aprovações, arquivos sensíveis, tamanho do PR, cobertura e descrição.
- **Questão 10:** o enunciado é "qual erro evitar", e por isso B é a única prática errada. O material confirma a atribuição por proximidade e o `[A DEFINIR]` (tópico 09). O código da questão não foi informado.

## Mapa de estudo desta disciplina

| Tema da prova | Tópico do guia que mais cobre |
|---------------|-------------------------------|
| Risk Monitor, blocker, Lead Time e baseline (Q01) | [08 · AIOps de projeto e Risk Monitor](./projeto-de-leitura/08-aiops-de-projeto-metricas-de-fluxo-e-risk-monitor.md) |
| Cenários de prazo e capacidade (Q01) | [05 · Cronograma adaptativo](./projeto-de-leitura/05-cronograma-adaptativo-dependencias-capacidade-what-if.md) |
| OKR bom, baseline, meta e prazo (Q02) | [14 · OKRs, alinhamento de backlog e portfólio](./projeto-de-leitura/14-okrs-alinhamento-de-backlog-e-portfolio.md) |
| Percentis P50, P85 e P95 e Monte Carlo (Q03, Q04) | [07 · Monte Carlo](./projeto-de-leitura/07-monte-carlo-p50-p85-p95.md) |
| Três pontos e PERT (base do Monte Carlo) | [06 · Estimativas com três pontos e PERT](./projeto-de-leitura/06-estimativas-tres-pontos-e-pert.md) |
| Status report adaptativo por público (Q05) | [10 · Status Reports](./projeto-de-leitura/10-status-reports-tres-audiencias.md) |
| Output x Outcome (Q06) | [14 · OKRs, alinhamento de backlog e portfólio](./projeto-de-leitura/14-okrs-alinhamento-de-backlog-e-portfolio.md) e [15 · Fechamento](./projeto-de-leitura/15-fechamento-curadoria-final-e-cadeia-completa.md) |
| NL to Workflow e actionRequired (Q07) | [13 · NL to Workflow](./projeto-de-leitura/13-nl-to-workflow-slack-jira.md) |
| Ata, pendências, Meeting Digest e `[A DEFINIR]` (Q08, Q10) | [09 · Meeting Digest](./projeto-de-leitura/09-meeting-digest-ata-acoes-e-cards-jira.md) |
| Danger.js em Pull Request (Q09) | [12 · Danger](./projeto-de-leitura/12-danger-regras-de-conformidade-no-pipeline.md) e [11 · Governança como código](./projeto-de-leitura/11-governanca-como-codigo-e-compliance-checklist.md) |
