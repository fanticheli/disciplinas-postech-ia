# 10 · Status Reports: os mesmos dados em três audiências

> **Unidade 7 · Aulas 1 e 2** · Leitura: ~7 min · Bloco: Monitorar e documentar a execução (Unidades 5 a 7)

## 🎯 Em uma frase
O **Status Report adaptativo** gera, a partir dos mesmos dados da sprint, três relatórios com linguagem, profundidade e decisão diferentes para **time técnico, gestor e executivo**. O ganho maior não é tempo: é a comunicação certa para quem decide, desde que o gerente faça a **curadoria** antes de enviar.

---

## 👵 Explicando para a vovó

O mesmo jogo de futebol é contado de três jeitos: o técnico quer saber por que a zaga falhou, o dono do clube quer saber se o time se classifica e o torcedor quer saber se valeu o ingresso. O placar é o mesmo; o relato muda porque a pergunta de cada um é outra.

O erro mais comum é mandar para o dono do clube a análise tática da zaga. O Status Report adaptativo escreve os três relatos a partir do mesmo placar.

---

## 🔧 Tecnicamente

### O que é
- **O problema:** toda sexta o gerente exporta métricas do Jira, relê atas, escreve e formata; cerca de 40 a 50 minutos para reunir informação que já existia. As indicações de leitura citam que 42% dos gestores gastam um dia inteiro por mês só compilando status.
- **Time técnico:** Velocity, lead time, cycle time, story points entregues, débito técnico e bloqueios. Linguagem técnica e listas estruturadas, para orientar a próxima sprint.
- **Gestor de projeto ou produto:** percentual de conclusão, aderência ao cronograma, capacidade, riscos por probabilidade e impacto e decisões pendentes. Resumo executivo mais tabelas de riscos e decisões.
- **Executivo ou cliente:** o projeto entrega o prometido? Está no orçamento? Que risco exige a alta gestão? Linguagem de negócio, até uma página. Em vez de «lead time cresceu 15% por excesso de WIP», dizer que o ritmo está levemente abaixo do planejado, qual ação corretiva foi adotada e que o cronograma geral está preservado.
- **Relatório inadequado afeta a governança:** executivos que recebem relatórios incompreensíveis param de ler e passam a decidir por conversa informal, e a organização perde o canal entre execução e estratégia.
- **Rastreabilidade estratégica:** relatórios gerados sempre com o mesmo template viram arquivo auditável para responder «por que atrasou?», «sabíamos desse risco?» e «quando decidimos tirar X do MVP?».

### Como funciona
- **Dados da Sprint 4:** 5 histórias planejadas, 2 entregues, 2 em andamento (passam para a sprint 5), 1 removida por bloqueio de hardware, velocidade de 22 SP, lead time médio de cerca de 10 dias (10,8 no output), 11 bugs abertos e 6 resolvidos, bloqueio de hardware ativo e a primeira apresentação formal à diretoria em duas semanas.
- **Mesmos dados, três narrativas:** a versão técnica destaca lead time acima da linha de base, saldo de bugs crescente e a ação de limitar o WIP. A gerencial classifica o status e apresenta as decisões necessárias (aprovar o orçamento do hardware ou retirar o score do MVP; estabilizar a sprint 5). A executiva diz o que está pronto, o risco e a aprovação necessária, sem story points.
- **Vermelho ou amarelo?** O modelo classificou o projeto como vermelho (lead time acima da linha de base, terceiro ciclo de aumento de defeitos, bloqueio de hardware). Um gerente experiente poderia dizer amarelo: o time entregou toda a capacidade planejada e o risco vem de uma dependência externa. As duas leituras são defensáveis; a escolha comunica urgência diferente e é um julgamento gerencial que não se delega ao modelo.
- **Aparente contradição entre relatórios:** o técnico diz que a equipe entregou o planejado e o gerencial aponta risco ao cronograma. Não é erro: são perspectivas diferentes do mesmo projeto.
- **Curadoria:** validar todos os números (22 pode virar 23 por arredondamento do modelo), ler o executivo como um diretor sem formação técnica, limitar as decisões a duas ou três, manter o tom técnico descritivo (sem reproduzir o clima negativo das atas) e dar a cada risco do relatório gerencial uma ação e um responsável.
- **Do projeto ao portfólio:** aplicar o mesmo prompt a cada projeto e usar os relatórios executivos como entrada de uma nova interação que gera um Executive Summary de portfólio, com status, riscos, marcos e decisões pendentes.
- **Configuração:** temperatura em torno de 0,3 nos três relatórios, porque é análise de dados; o que muda é só a instrução de audiência.

### Onde aplicar
- Gerar toda semana as três versões do mesmo template e arquivá-las como histórico de decisões.
- Preencher o campo opcional «relatório da sprint anterior» do template para o modelo comparar e dar continuidade.
- Consolidar vários projetos num Executive Summary único para a diretoria.

### Vantagens e limites
**Vantagens**
- Reduz o esforço de consolidação e padroniza a comunicação.
- Cada audiência recebe só o que precisa para decidir.
- O arquivo de relatórios dá rastreabilidade de decisões.

**Limites**
- O modelo pode arredondar números e deixar termos técnicos escaparem para a versão executiva.
- Classificação de status (cor) é julgamento, e o modelo pode divergir do gerente.
- O tom das atas pode contaminar o relatório técnico.

### 🚫 Armadilhas
- Mandar o relatório técnico para a diretoria sem adaptação.
- Pedir cinco ou seis decisões ao gestor: nenhuma é tomada.
- Listar um risco sem ação ou responsável.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Status Report adaptativo | Mesmos dados, linguagem e foco diferentes por audiência |
| Executive Summary | Versão de uma página, em linguagem de negócio, para a diretoria |
| Checklist de curadoria | Conferir números, tom, decisões e risco versus ação antes de enviar |
| Spillover (roll-over) | História que não termina e passa para a sprint seguinte |
| Linha de base | Valor de referência da métrica (aqui lead time de 6,5 dias) |

---

## 💻 No código do repo

**Projeto:** [modulo-07-status-reports](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-07-status-reports)

System prompt do Status Report com a query de exemplo (Sprint 4 do RouteWise), o output de referência com os três relatórios mais o checklist de curadoria, e o snapshot do board.

**Fluxo**
1. `status-report-prompt.md`: o System Prompt define três relatórios com tamanho e formato (técnico de 150 a 250 palavras; gestor de 150 a 200 com badge de status, contexto, *Decisão necessária* e próximo marco; executivo de 80 a 120 palavras, sem story points, velocity, lead time ou bugs). Restrições: no máximo 2 decisões no gestor, mesmos dados nos três, status vermelho quando há sinal sério e um *Checklist de Curadoria* de quatro itens ao final.
2. A query de exemplo traz os dados da Sprint 4 (12/05 a 25/05/2026): histórias planejadas, entregues, em progresso e removidas, velocidade 22/22, bugs 11 e 6 (saldo 5 e 9 acumulado), lead time 10,8 (linha de base 6,5), BUG-S4-10 crítico (43 veículos com rastreador v1) e a decisão pendente de orçamento.
3. `output-exemplo-status-report-m72.md`: relatório técnico, gerencial (status vermelho, duas decisões) e executivo, mais o checklist de curadoria preenchido.
4. `jira-estado-board.md`: tabela de status das issues no fechamento da Sprint 4 (US-01 e US-05 Feitos, US-02 e US-06 em andamento, US-03 bloqueada, 6 bugs feitos e 5 a fazer). Orienta a não voltar o board se ele já estiver na Sprint 5.
5. `Exemplo - Módulo 7.pdf`: as três versões da Sprint 4 (a gerencial com status vermelho), com fornecedor «sem resposta há 8 dias» e uma ação de reservar 20% da capacidade para bugs.

**Como rodar**
- System Instructions com o bloco do System Prompt, mensagem do usuário com a query de exemplo, temperatura 0,3.
- Contei as palavras do output de referência: técnico com 210 (faixa de 150 a 250), gestor com 158 (150 a 200) e executivo com 116 (80 a 120). Todos dentro das faixas do prompt.
- Atividade 7: gerar as três versões para uma sprint real, aplicar o checklist, distribuir (ou simular o envio, com e-mails e objeções antecipadas) e documentar o que perguntaram.

**Armadilhas e achados no código**
- A apostila (aula 7.1) descreve a versão do gestor com status amarelo e risco moderado e a da diretoria com risco moderado; o output do repositório, e a própria aula 7.2, usam vermelho. É exemplo ilustrativo diferente, não o mesmo artefato.
- O prompt limita o gestor a 2 decisões e o slide fala em «2 a 3»; o output usa 2, mas a segunda («autorizar a mudança de escopo da Sprint 5») é uma decisão que o próprio gerente poderia tomar.
- As datas fecham com a Sprint 2 de 28/04 (sprints de 2 semanas): a Sprint 4 vai de 12/05 a 25/05. O cenário alternativo do M6 (Sprint 2 encerrada em 22/05) não bate com essa linha do tempo.
- O exemplo resolvido (PDF) menciona fornecedor «sem resposta há 8 dias» e uma ação de alocar 20% da capacidade para bugs, que não estão na query do repositório.

---

## 🔗 Para ir além
- [Pasta do módulo 7 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-07-status-reports)
- [Repositório oficial do módulo 07 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos)
- [Relatório 7: Wellingtone, State of Project Management 2024](https://wellingtone.co.uk)
- [Indicação 12: The Scrum Guide (Schwaber e Sutherland)](https://scrumguides.org)
- [Google AI Studio](https://aistudio.google.com/)

---

⬅️ [09 · Meeting Digest: ata, ações e cards Jira a partir da transcrição](./09-meeting-digest-ata-acoes-e-cards-jira.md)  ·  [Guia de leitura](./README.md)  ·  [11 · Governança como código e Compliance Checklist dinâmico](./11-governanca-como-codigo-e-compliance-checklist.md) ➡️
