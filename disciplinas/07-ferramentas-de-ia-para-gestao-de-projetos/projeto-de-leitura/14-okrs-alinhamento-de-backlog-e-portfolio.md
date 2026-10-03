# 14 · OKRs, alinhamento de backlog e scorecard de portfólio

> **Unidade 10 · Aulas 1 e 2** · Leitura: ~8 min · Bloco: Estratégia e fechamento (Unidade 10)

## 🎯 Em uma frase
O **OKR Aligner** valida a estrutura dos OKRs (objetivo, Key Results mensuráveis com prazo, baseline e dono), classifica cada história como **alinhada diretamente, indiretamente ou não alinhada** e consolida a saúde de vários projetos em um **scorecard** com rubrica fixa. A pergunta deixa de ser «o que entregamos?» e vira «o que moveu o objetivo?».

---

## 👵 Explicando para a vovó

Uma equipe pode correr muito e chegar longe do lugar errado. Entregar 47 funcionalidades é correr bastante (output). Descobrir se o cliente ficou mais satisfeito, se a receita subiu ou se o custo caiu é saber se chegou aonde importava (outcome).

O OKR é a bússola: o Objetivo diz o norte, os Key Results são os marcos que provam que você se aproximou. O Aligner confere se a bússola está bem escrita e se cada tarefa do backlog aponta para o norte ou só mantém a equipe ocupada.

---

## 🔧 Tecnicamente

### O que é
- **Output versus outcome:** output é o que a equipe produz; outcome é o impacto no negócio. A equipe que concluiu 47 histórias com o churn inalterado produziu muito output e pouco outcome.
- **Estrutura do OKR:** o Objective é qualitativo, inspirador e descreve o estado desejado, não uma tarefa. Os Key Results são quantitativos e verificáveis. Erro mais frequente: usar tarefa como KR. «Implementar o módulo de alertas» é tarefa; «reduzir acidentes por excesso de velocidade» é resultado.
- **Por que OKR falha:** segundo as fontes citadas nas indicações, a maioria das implementações falha pela falta de conexão entre objetivo e trabalho diário, e 70% das organizações abandonam OKRs no primeiro ano (Gartner, citado no curso). Check-ins quinzenais permitem corrigir a tempo.
- **Backlog como hipótese:** cada User Story vira uma hipótese sobre como mover um indicador. Histórias sem relação com nenhum objetivo são candidatas à reavaliação.
- **Dois momentos da IA:** na elaboração, o gestor descreve o contexto em linguagem natural e o modelo sugere ou valida OKRs com mensurabilidade, prazo, baseline e responsável; nos check-ins, o modelo projeta a trajetória e aponta Key Results em risco.
- **Exemplo de julho:** redução acumulada de 8% contra 20% de meta, com o módulo de alertas já operando. O ritmo não basta; a análise relaciona os dados e aponta que só cerca de 60% dos motoristas receberam treinamento: o limitador deixou de ser tecnológico e virou adoção. A recomendação é priorizar o treinamento, não mais desenvolvimento.
- **Dois templates:** a validação verifica se o objetivo é um estado desejado, se os KRs são mensuráveis, se têm prazo, baseline e responsável, e devolve lacunas com sugestões. O alinhamento classifica as histórias e recomenda: remover, mover para um backlog de inovação ou, se a importância é evidente, revisar os próprios OKRs.
- **Sinais de cultura de OKR:** o time pergunta a qual objetivo uma demanda se liga, as cerimônias falam de indicadores e não só de tarefas, e o alinhamento filtra o planejamento de sprints. Se todos os KRs fecham acima de 90%, provavelmente as metas são conservadoras demais; o Aligner tem uma verificação de ambição.
- **Cultura não se automatiza:** o modelo não cria segurança psicológica. Onde se teme punição, as metas encolhem e os indicadores são maquiados. A prática sugerida é um check-in de cerca de 5 minutos por semana, com dados gerados das ferramentas, para tornar o estado dos KRs visível sem caça a culpados.

### Como funciona
- **Parte A, validação:** o system prompt avalia o Objetivo e, para cada KR, seis critérios (mensurável, baseline, prazo, responsável implícito, independente de output, verificável por terceiro) com ✅ ou ❌, reformulação para cada falha e atenção a dependências entre KRs.
- **Parte B, alinhamento:** quatro categorias (diretamente, indiretamente, não alinhado, épico futuro sem OKR), a tabela de alinhamento, a distribuição e o percentual de capacidade em itens não alinhados, recomendações de remoção e alertas de dependência. Se dois frameworks independentes (por exemplo RICE e OKR Aligner) concordam sobre um item, o argumento é mais forte.
- **Parte C, portfólio:** rubrica fixa para todos: verde (todos os KRs com pelo menos 60% do progresso proporcional ao tempo decorrido e nenhum blocker sem dono), amarelo (algum KR entre 40% e 60% do proporcional, ou blocker com dono e plano) e vermelho (algum KR abaixo de 40% ou blocker sem dono). Saídas: scorecard, riscos transversais (recurso compartilhado) e foco da reunião, com no máximo 3 itens. Se ninguém está vermelho, a reunião pode ser trocada pelo envio assíncrono.
- **Resultado do caso:** RouteWise amarelo (verde em segurança, amarelo em cronograma por causa do hardware), Fintech vermelho (blocker jurídico sem dono) e E-commerce verde, com o mesmo desenvolvedor de integrações atendendo os três como ponto único de falha.

### Onde aplicar
- Validar os OKRs do seu projeto com o prompt antes de comprometê-los, e só depois alinhar o backlog.
- Rodar o alinhamento incluindo histórias descartadas e postergadas, e tomar uma decisão explícita para cada não alinhada: remover, mover para épico futuro ou justificar.
- Usar o scorecard em portfólio com mais de um projeto, tratando cada item vermelho com responsável, prazo e ação.

### Vantagens e limites
**Vantagens**
- Torna visível o desperdício de capacidade em itens sem conexão com a estratégia.
- Rubrica fixa dá comparabilidade entre projetos.
- Liga a rotina do time aos indicadores de negócio.

**Limites**
- O modelo valida a estrutura, não a relevância do indicador para o negócio.
- A classificação de alinhamento é hipótese; categorias podem variar (o próprio repositório mostra uma reclassificação de US-07).
- Dashboard sem decisão vira registro da inércia.

### 🚫 Armadilhas
- Escrever tarefa como Key Result.
- Fazer a análise de alinhamento e não remover nada por pressão política.
- Usar OKR como avaliação individual: induz metas conservadoras.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| OKR | Objective (estado desejado) e Key Results (resultados mensuráveis) |
| Output / outcome | O que se entrega versus o efeito no negócio |
| Baseline | Valor inicial do indicador antes do ciclo |
| Alinhado direto / indireto | Move um KR por si só / viabiliza quem move |
| Épico futuro sem OKR | Valor potencial sem objetivo no ciclo atual |
| Scorecard | Painel verde, amarelo ou vermelho por projeto com rubrica fixa |
| Relevance scoring | Analogia: cada história é uma consulta avaliada contra o conjunto de objetivos |

---

## 💻 No código do repo

**Projeto:** [modulo-10-portfolio-e-okrs](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-10-portfolio-e-okrs)

Um único arquivo de prompt com três templates (validação de OKRs, alinhamento backlog-OKR e scorecard de portfólio), dois outputs de referência (partes A e B), o snapshot do board e a atividade final com exemplo resolvido.

**Fluxo**
1. `okr-aligner-prompt.md`, Parte A: System Instructions de validação com seis critérios e a query do RouteWise (Objetivo 1 com KR 1.1 de acidentes em 20% até setembro de 2026; Objetivo 2 com KR 2.1 de custo de manutenção corretiva em 15%; ciclo Q2 a Q3 de 2026).
2. Parte B: classificação em quatro categorias, tabela com colunas Item, Status, Alinhamento, OKR e Justificativa, e a query com 11 histórias (US-01 a US-10, com US-04 e US-04b). O prompt traz o resultado esperado em tabela.
3. Parte C: rubrica de portfólio (verde, amarelo, vermelho), saídas e uma query com RouteWise, Fintech e E-commerce, com ciclo em ~55% decorrido. O prompt descreve o output esperado em texto; não há arquivo de output salvo para esta parte.
4. `output-exemplo-okr-partea-m102.md`: os dois KRs falham em baseline e verificável por terceiro; o modelo ainda comenta a correlação entre os KRs e sugere melhorias nos objetivos. `output-exemplo-okr-parteb-m102.md`: 3 diretas, 3 indiretas, 3 não alinhadas (US-04b, US-07 e US-08) e 2 épicos futuros; recomenda postergar US-04b e US-07 e congelar o US-06 enquanto o US-03 estiver bloqueado.
5. `jira-estado-board.md`: snapshot da Sprint 4 (igual ao do M7), épicos com seus KRs e US-08, US-09 e US-10 sem sprint. `Atividade - Módulo 10.pdf` e `Exemplo - Módulo 10.pdf`: ver o [tópico de fechamento](./15-fechamento-curadoria-final-e-cadeia-completa.md).

**Como rodar**
- Parte A em uma conversa nova com System Instructions de validação; Parte B em outra conversa, depois da A, com os OKRs já corrigidos; Parte C em outra, com os OKRs de cada projeto validados. Temperatura 0,3 e Gemini 3.1 Pro Preview, segundo o cabeçalho.
- Para a atividade, escolha OKRs do seu projeto (ou o RouteWise), valide, alinhe o backlog completo e produza a análise de impacto do ciclo em entrega, resultado e aprendizado.

**Armadilhas e achados no código**
- O prompt tem 6 critérios na validação, 4 categorias no alinhamento e 3 partes; a apostila e os slides falam em 5 critérios, 3 categorias e «2 templates» (o slide lista 3 itens).
- A Parte A reclama de baseline ausente no KR 1.1, embora os módulos 2 e 3 e o slide do 10.1 usem «de 7 para 5». Com 7 para 5 a redução é de cerca de 28%, não 20%.
- O texto de «output esperado» da Parte A do prompt (dependência de 3 a 4 meses de dados) não é o mesmo conteúdo do output de referência salvo (correlação entre KRs).
- Rubrica da Parte C: o prompt mede o progresso em relação ao tempo decorrido (neste caso 8% de 20% é 40% do alvo, mas o proporcional a 55% do ciclo seria 11%, o que deixa o KR 1.1 em cerca de 73% do proporcional), o que passa dos 60% exigidos para verde. O slide parece tratar «40 a 60%» como faixa do próprio alvo (leitura minha), o que daria amarelo ao KR 1.1. Pelo prompt, o amarelo do RouteWise vem do blocker com dono e plano.
- O US-04 é «Histórico de Telemetria e Replay» aqui e «Sensor de Abertura de Baú» nos módulos 2 a 5. A US-07 foi classificada como «Dupla Convergência» num backup anterior e como Não Alinhada no atual, como o próprio arquivo registra.
- O exemplo de julho da apostila (8% de redução e 60% dos motoristas treinados) não aparece em nenhum arquivo do repositório que li; provavelmente foi mostrado só em vídeo.

---

## 🔗 Para ir além
- [Pasta do módulo 10 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-10-portfolio-e-okrs)
- [Repositório oficial do módulo 07 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos)
- [Relatório 9: BCG, Unleashing the Power of OKRs (2024)](https://bcg.com/publications/2024/unleashing-the-power-of-okrs)
- [Indicação 12: The Scrum Guide (Schwaber e Sutherland)](https://scrumguides.org)
- [Google AI Studio](https://aistudio.google.com/)
- Indicação 8: Measure What Matters (Doerr), sem URL na fonte
- Relatório 5: Gartner, adoção e abandono de OKRs (2024), sem URL na fonte

---

⬅️ [13 · NL to Workflow: do Slack ao Jira com parser de linguagem natural](./13-nl-to-workflow-slack-jira.md)  ·  [Guia de leitura](./README.md)  ·  [15 · Fechamento: curadoria final, armadilhas de OKR e a cadeia completa](./15-fechamento-curadoria-final-e-cadeia-completa.md) ➡️
