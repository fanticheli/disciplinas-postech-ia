# 08 · AIOps de projeto: métricas de fluxo e o Risk Monitor

> **Unidade 5 · Aulas 1 e 2** · Leitura: ~7 min · Bloco: Monitorar e documentar a execução (Unidades 5 a 7)

## 🎯 Em uma frase
**AIOps de projeto** leva a lógica do monitoramento de infraestrutura para o projeto: o Jira passa a emitir métricas (lead time, cycle time, bugs, mudanças de escopo) e o **Risk Monitor** as lê, classifica riscos por componente num **cockpit** e propõe mitigações com critério de sucesso.

---

## 👵 Explicando para a vovó

O painel do carro acende a luz do óleo antes de o motor fundir. Se você só olha o carro quando ele para na estrada, descobre tarde e paga caro. Projeto também raramente quebra de um dia para o outro: o tempo de entrega vai subindo, os bugs acumulando, os bloqueios envelhecendo.

O Risk Monitor é o painel: lê os números que o Jira já guarda e avisa que a luz acendeu. Quem decide se para o carro, chama o mecânico ou segue viagem continua sendo o motorista.

---

## 🔧 Tecnicamente

### O que é
- **Do planejamento estático à observabilidade:** o foco passa a ser monitorar a execução e achar sinais de degradação nas primeiras semanas, não descobrir o atraso na Sprint Review.
- **Por que dados e não percepção:** na reunião de status, a pessoa minimiza um bloqueio ou omite uma dificuldade. O Jira registra o comportamento sem filtro emocional. AIOps não elimina a reunião, mas reduz a dependência da memória.
- **Lead time:** da entrada no backlog à conclusão, incluindo filas. **Cycle time:** do momento em que alguém assume a story até concluir. Se o cycle time está estável e o lead time sobe, o gargalo é a fila (excesso de WIP, espera por dependência), não a implementação. Se os dois sobem juntos, o problema está no desenvolvimento.
- **Taxa de bugs por sprint:** bugs abertos contra resolvidos. Dez abertos e sete resolvidos por sprint acumulam 15 pendentes em cinco sprints, uma dívida silenciosa que consome capacidade.
- **Frequência de alterações nas stories:** mudanças de descrição, critério ou estimativa após entrar na sprint indicam requisito mal refinado e scope creep.
- **Dashboard de saúde da sprint:** mostrar a tendência da velocity nas últimas sprints (não a média acumulada), o lead time por tipo de trabalho (bug, feature, dívida), a taxa de retrabalho e o *tempo* de cada impedimento aberto, com responsável.
- **Anomalia:** não é «número alto», é desvio relevante do padrão histórico. Os slides distinguem tendência (2 ou mais sprints), spike (salto numa sprint) e padrão (o mesmo problema repetido no mesmo contexto).

### Como funciona
- **O caso:** quatro sprints do RouteWise, com a sprint 5 em andamento, hardware previsto para chegar na semana 9, um defeito crítico atingindo 43 veículos e uma apresentação para a diretoria em duas semanas. O lead time vai de cerca de 6 para cerca de 11 dias; o cycle time quase não se move; o saldo de bugs cresce; as histórias concluídas por sprint caem.
- **Cockpit de riscos:** um status (verde, amarelo ou vermelho) por componente: fluxo e eficiência, qualidade, dependências externas, escopo e entregas, e prontidão para o marco. O diagnóstico separa sintoma de causa: aqui, a causa do lead time é espera por hardware, não lentidão dos desenvolvedores.
- **Marco e cascata:** o modelo relaciona desvios a eventos futuros. Com o hardware chegando na mesma sprint da demonstração, não sobra margem de integração e validação.
- **Plano de mitigação proporcional:** «Stop Starting, Start Finishing» (parar de iniciar histórias enquanto outras estão bloqueadas), reduzir limites de WIP em desenvolvimento e testes, e fortalecer a Definition of Ready: histórias que dependem de hardware ou aprovação externa só entram na sprint com a dependência resolvida. Cada ação vem com critério de sucesso (por exemplo, lead time abaixo do limite).
- **Automação sem fadiga:** o próximo passo é rodar o monitor sozinho (por exemplo, toda segunda de manhã, com o cockpit chegando ao Slack), mas cada tipo de anomalia precisa de dono e procedimento. Alertas indiscriminados em canais gerais geram fadiga e são ignorados.
- **Calibração:** limiares vêm do histórico da própria equipe, não de benchmarks. Falsos positivos recalibram os limites. Contexto importa: lead time maior pode ser sinal de stories maiores.
- **Cadência:** semanal costuma bastar em times estáveis; diária em situação crítica; só ao fim de cada sprint é o mínimo aceitável. O slide associa o MTTD: gestão tradicional detecta em cerca de 2 semanas, métricas de fluxo em cerca de 2 dias e monitoramento automatizado em horas.

### Onde aplicar
- Exportar lead time, cycle time, bugs e itens parados das últimas 3 ou 4 sprints e rodar o Risk Monitor com limites definidos pelas primeiras sprints.
- Definir a frequência de monitoramento pelo MTTD que você quer: se o lead time pode dobrar em duas semanas, monitorar por mês é tarde.
- Dar a cada item vermelho um responsável, um prazo e uma ação, e investigar a causa raiz antes de agir.

### Vantagens e limites
**Vantagens**
- Troca percepção por dados que já existem no Jira, sem ferramenta nova.
- Separa sintoma de causa e liga os desvios aos marcos.
- Mitigações com critério de sucesso permitem verificar se funcionaram.

**Limites**
- O monitor não determina sozinho a causa raiz; o cockpit é ponto de partida para a investigação.
- Limites genéricos geram ruído; só o histórico do time calibra.
- Métricas sem contexto enganam (10 dias numa story de 8 SP não é 10 dias numa de 2 SP).

### 🚫 Armadilhas
- Confundir lead time com cycle time e atacar o lugar errado do processo.
- Esperar que dependência externa se resolva dentro da sprint: é expectativa, não planejamento.
- Automatizar alertas sem dono, criando fadiga.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| AIOps | IA aplicada a operações; aqui, aplicada ao fluxo do projeto |
| Lead time | Tempo total do backlog até concluído, incluindo filas |
| Cycle time | Tempo em desenvolvimento ativo |
| WIP | Work in progress: trabalho iniciado e não concluído |
| Scope creep | Expansão gradual de escopo com a execução em andamento |
| MTTD | Mean Time to Detect: tempo médio para detectar um problema |
| Cockpit de riscos | Tabela verde, amarelo ou vermelho por componente |
| Definition of Ready | Critérios para uma história entrar na sprint |

---

## 💻 No código do repo

**Projeto:** [modulo-05-riscos-e-aiops](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-05-riscos-e-aiops)

Template do Risk Monitor, os dados das 4 sprints do RouteWise (em texto e em CSV), o snapshot do board e um output de referência com cockpit, diagnóstico, mitigação e projeção.

**Fluxo**
1. `risk-monitor-prompt.md`: define o formato por sprint (lead time, cycle time, planejadas e entregues, bugs, mudanças de escopo, itens parados há mais de 5 dias), contexto, limites de alerta e quatro análises: cockpit, diagnóstico, plano de mitigação (ação imediata, ação de processo e critério de sucesso) e projeção de risco (baixo menor que 20%, médio de 20 a 50%, alto maior que 50%). As restrições: sem anomalia por um único ponto (exige tendência de 2 sprints), separar sintoma de causa e mitigação específica, não genérica.
2. `risk-monitor-data-exemplo.csv` e a seção «Dados de Exemplo»: lead time 6,2, 7,1, 9,4 e 10,8 dias; cycle time 4,8, 5,0, 5,1 e 5,3; bugs abertos 3, 5, 8, 11 e resolvidos 3, 4, 5, 6 (saldo acumulado 0, 1, 4 e 9); planejadas e entregues 4/4, 4/3, 5/3 e 5/2; velocidade 28, 22, 21 e 22 SP; itens parados 0, 1, 2 e 3.
3. `output-exemplo-riskmonitor-m52.md`: quatro componentes vermelhos (fluxo, qualidade, dependências externas, prontidão para o marco) e um amarelo (escopo e entregas), três anomalias com diagnóstico, plano com Definition of Ready estrito e limite de WIP para bugs, projeção de risco alto (maior que 80%) e uma recomendação executiva: pivotar a pauta da demonstração para o dashboard e os alertas, resolver o BUG-S4-10 em 48 horas e mostrar o hardware como próximo passo.
4. `Atividade - Módulo 5.pdf` (opcional): coletar métricas, rodar o Risk Monitor, identificar 2 anomalias com plano de mitigação e definir a frequência de monitoramento pelo MTTD desejado. `Exemplo - Módulo 5.pdf`: baseline de 6,65 dias nas sprints 1 e 2 com limite operacional de 6,5, duas mitigações (Stop Starting, Start Finishing; reserva de capacidade para bugs, com parada de novas histórias quando os bugs abertos passam de 5) e monitoramento semanal durante a crise.

**Como rodar**
- Cole o prompt preenchido com o texto «Dados de Exemplo» no AI Studio (temperatura 0,3, segundo o cabeçalho do output) e compare com o output de referência.
- Atividade 5: com dados reais, ou o CSV mais uma quinta sprint plausível, produzir o cockpit, dois planos de mitigação com análise crítica e a decisão de frequência.
- Conferi a aritmética do saldo de bugs (3−3=0; 1; 1+3=4; 4+5=9) e a tendência de 3 sprints consecutivas de saldo positivo: batem.

**Armadilhas e achados no código**
- O texto diz que as métricas vêm do CSV importado no Jira em M1.2, mas o CSV de importação não tem datas nem lead time. Os números do monitor são do cenário do curso e não se reproduzem a partir do import.
- O prompt sugere limite de lead time como a média das duas primeiras sprints mais 25% (cerca de 8,3 dias), mas o exemplo usa 6,5 dias (baseline).
- No cockpit, a velocidade de 22 SP é lida como «estabilizada», mas é 21% abaixo dos 28 da sprint 1; estável só a partir da sprint 2.
- Na sprint 4, 2 de 5 histórias foram entregues, mas a velocidade foi 22/22 SP porque a US-05 sozinha vale 14 SP: pontos entregues e histórias concluídas contam histórias diferentes.

---

## 🔗 Para ir além
- [Pasta do módulo 5 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-05-riscos-e-aiops)
- [Repositório oficial do módulo 07 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos)
- [Relatório 1: DORA, Accelerate State of DevOps 2024](https://dora.dev)
- [Indicação 12: The Scrum Guide (Schwaber e Sutherland)](https://scrumguides.org)

---

⬅️ [07 · Monte Carlo: prazo como probabilidade (P50, P85, P95)](./07-monte-carlo-p50-p85-p95.md)  ·  [Guia de leitura](./README.md)  ·  [09 · Meeting Digest: ata, ações e cards Jira a partir da transcrição](./09-meeting-digest-ata-acoes-e-cards-jira.md) ➡️
