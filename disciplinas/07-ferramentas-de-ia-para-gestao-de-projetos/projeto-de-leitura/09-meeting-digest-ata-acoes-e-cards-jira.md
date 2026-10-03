# 09 · Meeting Digest: ata, ações e cards Jira a partir da transcrição

> **Unidade 6 · Aulas 1 e 2** · Leitura: ~7 min · Bloco: Monitorar e documentar a execução (Unidades 5 a 7)

## 🎯 Em uma frase
O **Meeting Digest** transforma uma transcrição em artefatos de gestão: resumo, tabela de ações, decisões, perguntas em aberto e JSON para o Jira. Ele faz **síntese semântica**, não transcrição, e a ata só vale depois da **curadoria** (responsáveis, prazos e decisões implícitas).

---

## 👵 Explicando para a vovó

Quem já foi o secretário de uma reunião sabe: a reunião dura uma hora e o «depois» (escrever a ata, cobrar quem ficou de fazer o quê, abrir os cards) leva outra meia hora. O Meeting Digest é um secretário que já sai da reunião com a ata pronta e a lista de tarefas separadas por pessoa.

Mas secretário rápido erra de um jeito típico: atribui a tarefa a quem estava falando e não a quem se comprometeu. Por isso o protocolo manda ler a lista de ações em voz alta antes de distribuir.

---

## 🔧 Tecnicamente

### O que é
- **Reunião como fonte estruturada:** a Sprint Planning de uma hora e meia deixa anotações fragmentadas, comentários no Notion e decisões na memória. Registrar, produzir resumo e organizar follow-ups são tarefas de baixo valor intelectual que consomem dezenas de minutos por reunião.
- **Pipeline em três etapas:** transcrição (Meet, Teams ou Zoom nativos; Google AI Studio com áudio; Whisper, melhor em termos técnicos e sotaques, principalmente local), síntese semântica e extração em artefatos. A qualidade do áudio determina a da transcrição, que determina a da síntese.
- **Quatro classificações:** compromissos de ação («eu vejo isso hoje»), decisões (acordos que não viram tarefa e ficam no histórico do projeto), riscos e impedimentos, e perguntas em aberto (com quem deve responder).
- **Ações e decisões têm destinos diferentes:** a ação vira card no Jira; a decisão fica na documentação. «Carlos inicia a cotação» é ação; «adiar a manutenção preditiva por falta de hardware» é decisão.
- **Tema que evolui:** a síntese consolida em uma linha narrativa o assunto que aparece três vezes na reunião (problema técnico, necessidade de cotação, decisão de comprar), em vez de três registros soltos.
- **Structured prompts:** o resultado inclui JSON (título, responsável, prioridade, prazo, descrição) consumível por API, webhook, Zapier ou Make.

### Como funciona
- **Caso:** Sprint Review da Sprint 2 do RouteWise. Duas mudanças formalizadas: o US-05 (Dashboard Base), retirado antes por RICE baixo, volta com prioridade alta por causa de uma apresentação para a diretoria (frameworks apoiam, não substituem decisão estratégica); e nasce o US-06 (Painel de Motoristas), pedido pelo RH, condicionado ao hardware.
- **O que o modelo acertou:** resumo executivo, tabela de ações com responsáveis (Marcus estima o US-05, Ana Lima detalha o US-06, Marcus envia o template da planilha, Carlos valida com o time de campo), monitorar o lead time como atividade permanente (`[ACOMPANHAMENTO]`, sem card), a pergunta em aberto sobre o prazo do fornecedor e a decisão de não inventar responsável por ela.
- **Onde ficou lacuna:** o prazo «antes do Sprint Planning 3» de Ana Lima aparece na descrição, mas o campo `dueDate` ficou nulo; o ajuste do timeout dos alertas (para reduzir falsos positivos em área sem cobertura) não entrou nas decisões; e a dúvida «o RH tem API?» não virou pergunta em aberto.
- **Protocolo de auditoria em cinco passos:** ler a tabela de ações em voz alta; revisar responsáveis indefinidos e prazos vazios; validar decisões críticas com pelo menos um participante; dar um dono a cada pergunta em aberto; e distribuir a ata logo após a reunião, mesmo com 80% de qualidade.
- **Armadilhas recorrentes:** responsável atribuído por proximidade de fala, decisões implícitas (consenso silencioso) não capturadas, erros de transcrição que se propagam («sensor de baú» virando «censor de Bao») e usar o mesmo prompt para todas as cerimônias (daily, retrospectiva, refinamento e kickoff pedem prompts diferentes).
- **Números de apoio:** o slide cita 23 horas por semana em reuniões (Microsoft WorkLab 2023) e compara 18 minutos de ata manual com 90 segundos com IA para as mesmas 4 ações. As indicações de leitura citam o mesmo relatório com o dado de 57% do tempo de trabalho em comunicação e reuniões.

### Onde aplicar
- Revisar rapidamente a transcrição (nomes, sistemas, termos técnicos) antes de passar ao modelo.
- Criar variantes do prompt por tipo de reunião e guardá-las como ativos do time.
- Importar o JSON no Jira via webhook, Zapier ou Make e preencher o `epicLink` manualmente.

### Vantagens e limites
**Vantagens**
- Reduz o trabalho pós-reunião e preserva o contexto das decisões.
- Separa ação, decisão, risco e pergunta, cada uma com seu destino.
- O JSON estruturado conecta a reunião ao board e à rastreabilidade.

**Limites**
- Depende da qualidade da transcrição e dos nomes corretos.
- Decisões implícitas e prazos implícitos nem sempre viram campo estruturado.
- Sugerir um responsável é inferência aceitável; atribuir sem compromisso explícito passa do limite.

### 🚫 Armadilhas
- Distribuir a ata sem validar responsáveis e prazos.
- Criar card para toda ação, inclusive responsabilidades contínuas de acompanhamento.
- Distribuir a ata tarde: o valor é maior quando o contexto ainda está fresco.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Meeting Digest | Prompt que gera ata, ações, decisões, perguntas e JSON a partir da transcrição |
| Síntese semântica | Identificar compromissos, decisões, riscos e dúvidas além das palavras ditas |
| [A DEFINIR] | Marca para responsável ou prazo não mencionado; nunca inventar |
| [ACOMPANHAMENTO] | Ação contínua sem entregável, que não vira card |
| Decisão implícita | Acordo por omissão, quando ninguém objeta |
| Whisper | Modelo open source de transcrição, forte em português |

---

## 💻 No código do repo

**Projeto:** [modulo-06-reunioes-turbinadas](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-06-reunioes-turbinadas)

System prompt do Meeting Digest, a query pré-preenchida da demo, duas transcrições de Sprint Review (a canônica e uma variação) e o output de referência com notas de curadoria.

**Fluxo**
1. `meeting-digest-prompt.md`: o system prompt pede resumo executivo de 4 a 6 bullets, tabela de ações (ID, ação, responsável, prazo, prioridade, observação), decisões com contexto e impacto, perguntas em aberto e JSON para o Jira. Regras: nunca inventar responsável ou prazo (usar `[A DEFINIR]`), sinalizar `[POSSÍVEL ERRO DE TRANSCRIÇÃO]`, marcar **(implícita)** nas decisões por omissão, `[ACOMPANHAMENTO]` para ação sem entregável e uma linha por responsável. O JSON usa `title`, `assignee`, `priority` (Highest, High, Medium ou Low), `dueDate`, `epicLink`, `labels` e `description`.
2. `meeting-digest-query-m62.md`: query da demo (Sprint Review da Sprint 2, 28/04/2026, 20 minutos, Carlos, Marcus e Ana Lima). O espaço da transcrição é um marcador a preencher com o conteúdo do bloco de `transcricao-sprint-review-s2.md`.
3. `transcricao-sprint-review-s2.md`: a transcrição canônica, com o contorno manual do US-02, o timeout dos alertas, o hardware sem prazo, o retorno do US-05 e o pedido do RH.
4. `output-digest-backup-sprint-review-m62.md`: 5 ações (uma delas `[ACOMPANHAMENTO]`), 4 decisões (uma implícita), 1 pergunta em aberto e JSON com 4 cards. O arquivo termina com notas de curadoria e dois pontos que o modelo deixou de capturar (o timeout e a API do RH), exatamente os da aula.
5. `sprint-review-s2-routewise.md`: variação opcional, de 23/05/2026, com 4 participantes (inclui Priya), US-01 em piloto e hardware com 6 semanas de prazo. O cabeçalho avisa que alguns números são alternativos ao snapshot canônico.
6. `Atividade - Módulo 6.pdf` (opcional): transcrever e corrigir uma reunião, rodar o digest, criar 2 cards à mão cronometrando e calcular a economia. `Exemplo - Módulo 6.pdf`: processa a transcrição de *discovery* (não a Sprint Review), a curadoria corrige a ação de validar LGPD que o modelo atribuiu a Carlos para `[A DEFINIR]` e a comparação dá 33 minutos manuais contra 8 com IA (cerca de 20 horas por ano em reuniões semanais).

**Como rodar**
- System prompt no AI Studio; na mensagem do usuário, a query com os metadados e a transcrição colada no lugar do marcador; temperatura 0,3.
- Atividade 6: processar uma reunião real (ou a de discovery), revisar a tabela de ações, criar 2 cards à mão cronometrando e extrapolar a economia por reunião e por mês.

**Armadilhas e achados no código**
- O prompt diz, no `epicLink`, «não deixar vazio em produção», mas o formato e o output de referência trazem `null`; a vinculação é manual.
- O output de referência é de 2026-07-10, para uma reunião de 28/04/2026. Na reunião, o diretor quer o painel para o «board no próximo trimestre»; no cenário alternativo, o deadline é o board de julho.
- A apostila escreve «Marcos» onde o repositório usa «Marcus».
- O prompt traz como exemplo de referência o output da reunião de discovery (4 ações, 3 decisões), mas a demo usa a Sprint Review S2.

---

## 🔗 Para ir além
- [Pasta do módulo 6 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-06-reunioes-turbinadas)
- [Repositório oficial do módulo 07 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos)
- [Relatório 3: Microsoft WorkLab, Work Trend Index 2023](https://microsoft.com/en-us/worklab/work-trend-index)
- [Relatório 4: Asana, Anatomy of Work Index 2023](https://asana.com/resources/anatomy-of-work)
- [Indicação 12: The Scrum Guide (Schwaber e Sutherland)](https://scrumguides.org)
- [Google AI Studio](https://aistudio.google.com/)
- [Jira Cloud](https://www.atlassian.com/software/jira)

---

⬅️ [08 · AIOps de projeto: métricas de fluxo e o Risk Monitor](./08-aiops-de-projeto-metricas-de-fluxo-e-risk-monitor.md)  ·  [Guia de leitura](./README.md)  ·  [10 · Status Reports: os mesmos dados em três audiências](./10-status-reports-tres-audiencias.md) ➡️
