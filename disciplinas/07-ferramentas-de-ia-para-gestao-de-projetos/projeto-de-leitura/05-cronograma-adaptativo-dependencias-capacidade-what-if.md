# 05 · Cronograma adaptativo: dependências, capacidade real e what-if

> **Unidade 3 · Aulas 1 e 2** · Leitura: ~7 min · Bloco: Priorizar, planejar e estimar (Unidades 2 a 4)

## 🎯 Em uma frase
O **Scheduling Prompt** transforma o backlog priorizado em um **cronograma adaptativo**: considera capacidade real (não nominal), dependências técnicas, de recurso e externas, infere as não declaradas e simula cenários **what-if** mostrando o custo de cada mudança.

---

## 👵 Explicando para a vovó

Um cronograma de papel é como o mapa de uma viagem de carro que não sabe do trânsito. Está certo ao sair de casa e fica errado na primeira obra. O que você quer é um GPS: quando aparece um bloqueio, ele recalcula a rota e diz o que isso muda na hora da chegada.

O Scheduling Prompt é o GPS do projeto. Você diz «a ponte fechou» (o fornecedor atrasou) e ele mostra quais paradas mudam, quem fica sobrecarregado e quais rotas alternativas existem, com o preço de cada uma.

---

## 🔧 Tecnicamente

### O que é
- **O erro comum:** não é construir um cronograma errado, é tratar um ambiente dinâmico como estático. A apostila cita estudos do PMI: só uma parcela pequena dos projetos atinge prazo, custo e escopo juntos, e pouco mais da metade mantém o cronograma original.
- **Overcommitment:** planejar com 100% da capacidade deixa zero margem para defeitos herdados, incidentes, reuniões, férias e suporte. A pressão para recuperar leva a atalhos, revisões frouxas e débito técnico.
- **Dependências em três grupos:** técnicas (a story que consome a API espera a API), de recursos (duas histórias independentes que precisam do mesmo especialista não rodam em paralelo) e externas (hardware, fornecedor, aprovação regulatória, ambiente), que nem aparecem no backlog mas bloqueiam entregas.
- **Mapeamento preditivo de dependências:** a IA analisa o conteúdo das histórias, acha entidades, integrações e componentes compartilhados e propõe dependências candidatas, como uma análise de grafo construída do próprio backlog. É lista para a equipe validar, não verdade.
- **Caminho crítico:** a sequência cujo atraso atrasa o projeto. Num backlog com dezenas de histórias, recalcular à mão a cada mudança é lento e propenso a erro; o modelo propõe uma ordem que reduz bloqueios e justifica cada decisão.
- **Análise what-if:** passa-se o cronograma e a nova restrição (dev sênior de férias na sprint 3, fornecedor atrasado, cliente pede antecipação). O modelo recalcula datas, aponta efeitos em cascata e propõe alternativas. O benefício maior é explicitar o trade-off: antecipar um item custa adiar outro, sobrecarregar alguém ou aumentar risco.

### Como funciona
- **Entradas do prompt:** backlog priorizado, composição do time (papéis, especialização), duração da sprint, capacidade nominal e real, dependências conhecidas e restrições (marcos, feriados, datas fixas). Temperatura em torno de 0,3 para cronogramas reproduzíveis e auditáveis.
- **Capacidade nominal versus real:** 35 SP por sprint com fator de 65% vira cerca de 22 SP. Dois feriados na segunda sprint a reduzem para cerca de 18. O modelo aplica a regra sozinho.
- **Restrições estratégicas:** MVP em 12 semanas (6 sprints) e demonstração obrigatória para a diretoria ao fim da terceira. Isso antecipa o que é indispensável para a demo e empurra o resto.
- **O que o modelo fez no caso:** sprint 1 com infraestrutura, alertas de velocidade e um item habilitador (Enabler) para iniciar a compra do hardware IoT, que não estava no backlog; sprint 2 com versão simplificada do score de comportamento usando só dados disponíveis (nem toda dependência bloqueia por inteiro); sprint 3 com a demo e a construção de contratos de API e simuladores dos sensores; sprint 4 com refatorações e infra para a carga refrigerada; sprint 5 com a integração real dos sensores; sprint 6 com baú e score completo.
- **Fora do MVP, com contorno:** a manutenção preditiva tem dois bloqueadores: o prazo dos sensores e cerca de 30 dias de dados históricos para treinar o modelo, que não se aceleram só porque há capacidade. A proposta de contorno é tratar os alertas de velocidade como indicador indireto de desgaste e planejar a manutenção preditiva numa segunda fase.
- **Limite do método:** dependências que não estão nas histórias (CI, homologação, janelas de deploy, políticas internas) vivem na cabeça do time e precisam ser adicionadas ao contexto. Informação que fica só com especialistas vira surpresa.
- **Cinco armadilhas (slides):** capacidade uniforme superestimada (use 25 a 28 h de dev efetivo por pessoa por sprint, não 40 h), dependências de ambiente invisíveis, estimativas sem validação técnica, senioridade igualada na distribuição, cronograma sem marco de validação de integração.

### Onde aplicar
- Replanejar em uma conversa de uns 15 minutos quando uma restrição muda (o slide compara com 4 a 8 horas de replanejamento manual) e versionar V1, V2, V3 do cronograma com a causa de cada ajuste.
- Antes de comprometer datas: descontar cerimônias (65%), listar dependências de ambiente como tasks, levar as estimativas a um Planning Poker de uns 30 minutos e dar buffer explícito para itens com baixa confiança de esforço.
- Usar o what-if para negociar com o stakeholder: mostrar o que cai quando ele pede antecipação.

### Vantagens e limites
**Vantagens**
- Capacidade real e dependências ficam explícitas no plano.
- Mudanças viram simulações com trade-offs, não discussão de «dá ou não dá».
- O modelo propõe enablers e contornos que o backlog não continha.

**Limites**
- O cronograma só é tão bom quanto as estimativas de entrada.
- O modelo não conhece dívida técnica, férias, velocity histórica nem dependências de outros times.
- Pode igualar senioridade ao distribuir histórias, alocando integração crítica a quem não deve.

### 🚫 Armadilhas
- Planejar sprint com 100% da capacidade.
- Esquecer dependências de ambiente (staging, CI/CD, acessos), que consomem o sênior no começo.
- Tratar «alocação sugerida» como compromisso em vez de ponto de partida para Planning Poker.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Scheduling Prompt | Prompt que gera cronograma de sprints com dependências, capacidade e riscos |
| Caminho crítico | Sequência de tarefas cujo atraso atrasa o projeto inteiro |
| What-if | Simulação do impacto de uma mudança de restrição sobre o cronograma |
| Overcommitment | Comprometer 100% da capacidade sem margem para imprevistos |
| Enabler | Tarefa habilitadora que desbloqueia entregas futuras (ex.: comprar hardware) |
| Capacidade real | Capacidade nominal vezes fator de foco (aqui 65%) |

---

## 💻 No código do repo

**Projeto:** [modulo-03-cronograma-e-capacidade](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-03-cronograma-e-capacidade)

Template do Scheduling Prompt com prompts de what-if, o input preenchido do RouteWise (system instructions mais query), o output gerado no AI Studio com três cenários what-if, a atividade (Missão #03) e o exemplo resolvido.

**Fluxo**
1. `scheduling-prompt.md`: template em cinco seções (contexto do time, backlog com esforço, dependências, restrições, output esperado) e saída em cinco blocos (cronograma por sprint, dependências mapeadas, caminho crítico, flags de risco e soluções de contorno). Inclui o prompt what-if genérico e a seção «por que funciona e o que não resolve».
2. `scheduling-routewise-input.md`: separa o conteúdo em System Instructions e query do usuário, com temperatura 0,3. O time tem 6 pessoas (cada uma com 26 h por sprint para dev), sprints de 2 semanas, 6 sprints e cerca de 35 SP por sprint. O backlog traz US-01 (13 SP), US-03 (8), US-09 (21), US-02 (34) e US-04 (13). O hardware sai da semana 1 e chega na semana 9. Define os três what-ifs: hardware de 60 para 88 dias, dev sênior afastado 2 semanas no sprint 3 e antecipação do prazo em 2 semanas.
3. `output-exemplo-scheduling-m32.md`: capacidade de 22 SP por sprint e 18 no sprint 2. Cronograma: sprint 1 com 18/22 SP, sprint 2 com 13/18, sprint 3 com 8/22, sprint 4 com 10/22, sprint 5 com 21/22 e sprint 6 com 21/22; US-02 fica fora do MVP (34 SP não cabem, precisa do hardware e de 30 dias de dados). Dois caminhos críticos (software e hardware). Os três what-ifs trazem opções e recomendação (C no hardware atrasado, A no dev afastado e A no encurtamento, com B como contingência).
4. `Atividade - Módulo 3.pdf` e `Exemplo - Módulo 3.pdf`: missão de montar contexto de 2 ou 3 pessoas, calcular 65% da capacidade, gerar o cronograma, rodar duas simulações what-if e listar até cinco dependências para validar com o time. O exemplo usa um time de 3 pessoas.

**Como rodar**
- No AI Studio, cole o bloco de System Instructions e depois a query do `scheduling-routewise-input.md` com temperatura 0,3. Rode os três prompts what-if em sequência, na mesma sessão.
- Para o seu projeto, preencha os campos do `scheduling-prompt.md` com o seu time, backlog e restrições.

**Armadilhas e achados no código**
- O what-if 1 recomenda a opção C (usar os sprints 5 e 6 para o pipeline de dados e o modelo base da US-02). O cronograma-base havia tirado a US-02 do MVP porque 34 SP não cabem numa sprint, ela depende do hardware e de 30 dias de dados, e dizia que iniciar o modelo preditivo na sprint 6 estouraria a capacidade. A recomendação contradiz o raciocínio do próprio output (observação minha); a própria opção C lista como risco não fechar um incremento funcional da US-02 até a sprint 6.
- O output deixa capacidade ociosa grande (sprint 3 com 8/22 e sprint 4 com 10/22). O what-if 3 aproveita isso na opção B, mas o cronograma-base não discute o desperdício.
- As unidades se misturam: o template do prompt usa horas por sprint e dias de esforço, o input preenchido usa story points e o output mostra «utilizado/22 SP».
- Os pontos das histórias (13, 8, 21, 34, 13 SP) divergem dos do CSV do Jira e dos boards (por exemplo US-01 com 8 SP e US-02 com 5 ou 8 SP).
- Os números do PMI divergem entre fontes: o slide 3.1 fala em 31% (prazo, custo e escopo) e 59% (aderência ao cronograma), as indicações de leitura citam 63% e 73% para as equipes de melhor desempenho (Pulse of the Profession 2025), e o slide 4.1 usa 52%.

---

## 🔗 Para ir além
- [Pasta do módulo 3 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-03-cronograma-e-capacidade)
- [Repositório oficial do módulo 07 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos)
- [Indicação 12: The Scrum Guide (Schwaber e Sutherland)](https://scrumguides.org)

---

⬅️ [04 · Backlog Scorer: contexto rico, flags e calibração com dados reais](./04-backlog-scorer-contexto-flags-e-calibracao.md)  ·  [Guia de leitura](./README.md)  ·  [06 · Estimativas com três pontos e PERT: sair da data única](./06-estimativas-tres-pontos-e-pert.md) ➡️
