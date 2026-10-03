# 13 · NL to Workflow: do Slack ao Jira com parser de linguagem natural

> **Unidade 9 · Aulas 1 e 2** · Leitura: ~8 min · Bloco: Governança e automação (Unidades 8 e 9)

## 🎯 Em uma frase
**NL to Workflow** usa um LLM como **parser** que converte mensagens de Slack (ou e-mail, nota de voz) em cards estruturados do Jira. Ferramentas **integradas** interpretam o contexto (tipo, severidade, componente, responsável); as apenas **conectadas** copiam o texto. A etapa de confirmação e o log de auditoria mantêm o humano no controle.

---

## 👵 Explicando para a vovó

Um balcão de atendimento que apenas cola o bilhete do cliente num formulário é rápido e burro: não sabe separar «o sistema caiu» de «alguém sabe onde fica o café?». Um atendente de verdade lê, classifica, vê quem cuida daquele assunto e, se for grave, avisa o gerente.

O parser de NL to Workflow é esse atendente. Mas quando o bilhete diz «alguém pode pegar isso?», ele não escolhe uma pessoa: escreve «falta responsável, confirmar antes de criar».

---

## 🔧 Tecnicamente

### O que é
- **O custo do copy-paste:** um bug no Slack exige criar a issue no Jira, definir prioridade, achar o responsável pelo módulo e avisar o gestor se for crítico: 4 ações em 3 sistemas, repetidas várias vezes por semana. As indicações citam o Anatomy of Work (Asana 2023): 58% do tempo de trabalho vai para coordenação, restando 42% para o trabalho qualificado.
- **Conectadas versus integradas:** a integração tradicional (webhook) transporta dados sem entender o conteúdo. A integrada interpreta: distingue defeito de dúvida, estima a severidade, reconhece o componente, identifica a equipe e decide se basta um card ou se abre um incidente e notifica o gestor.
- **Natural Language to Workflow:** o usuário escreve em linguagem comum; o modelo extrai entidades e intenção e devolve um objeto estruturado; uma API executa a ação (criar card, mensagem no Slack, página no Notion, incidente). É o mesmo padrão entrada, extração, ação já visto em aplicações com IA, e se aproxima do conceito de agente: o Ecosystem Bot decide *quais artefatos criar*, não responde perguntas.
- **Ambiguidade é tratada, não resolvida às cegas:** «preciso investigar» deixa o responsável vazio com sugestão de atribuir ao autor; «alguém pode pegar isso?» exige confirmação; mensagem com decisão binária (adiar o deploy ou remover o score) deve preencher `Action Required` para que o bot não crie um card operacional para algo que ainda precisa de decisão de gestão.
- **Dois sentidos de sincronização:** Slack para Jira (rascunho de card com contexto e confirmação) e Jira para Slack (notificação de mudança de status). Quando o Jira é a fonte oficial, o recomendado é sincronização unidirecional, do Jira para o Slack, para evitar conflitos.

### Como funciona
- **Casos do estudo:** (1) bug simples em primeira pessoa sobre alertas em Uberlândia, com tipo bug, prioridade alta, componente e pontos de investigação (rastreadores, MQTT, AWS Lambda, Firebase) e responsável vazio; (2) pedido de antecipação do módulo de manutenção preditiva por Carlos, que pode ser *feature* ou *task* (ambas defensáveis) com responsável a confirmar; (3) deploy bloqueado com duas opções de decisão, em que o campo de ação necessária veio vazio.
- **Fluxo robusto:** etapa de confirmação com responsável, prioridade e sprint sugeridos antes de criar o card (para evitar «Marcus revisará o trabalho do João» virar tarefa do Marcus), contexto preservado (mensagem original e link da thread no card), log estruturado (data, canal, ID da mensagem, versão do prompt, resultado completo) e lembrete 24 h antes do prazo, com aprovação de componentes críticos por botões no Slack.
- **Casos de borda:** respostas curtas em thread (buscar as últimas mensagens antes do parsing, no espírito de RAG); mensagem com várias ações (um array de cards, um por responsável); pergunta que parece ação (tipo *question*, sem criar card); jargões internos (glossário no contexto); mensagens bilíngues (aceitar a mistura, padronizar a saída em português).
- **Riscos:** ruído de notificações (use canais dedicados), responsável errado, ponto único de falha (token expirado, webhook alterado: mantenha o processo manual como fallback) e bot que lê canais demais (restrinja aos canais do projeto).
- **Evolução por testes:** o módulo termina propondo avaliar o parser com mensagens reais, documentando quais classificações precisaram de intervenção humana e que ajustes de prompt as corrigiriam.

### Onde aplicar
- Montar o fluxo no Make.com (sem código) ou em Node.js, restrito a um canal de projeto, com palavra-chave de gatilho.
- Medir a taxa de acerto do parser (tipo, responsável, prazo) em 5 mensagens de tipos diferentes e usá-la como linha de base.
- Colocar a regra «decisão de gestão preenche actionRequired» no prompt para travar a criação automática.

### Vantagens e limites
**Vantagens**
- Elimina trabalho de coordenação e preserva o contexto na origem.
- O JSON estruturado é consumível por qualquer API.
- O campo de confiança permite lógica de fallback (alta cria, média confirma, baixa pede reformulação).

**Limites**
- Depende de confirmação humana em casos ambíguos e de impacto alto.
- O parser pode errar o responsável em frases com mais de um nome.
- Integrações quebram em silêncio se token ou webhook mudam.

### 🚫 Armadilhas
- Criar o card direto da mensagem, sem etapa de confirmação.
- Notificar toda mudança de status no canal geral.
- Ficar sem procedimento manual quando o bot cair.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| NL to Workflow | Linguagem natural convertida em objetos estruturados de ferramentas de gestão |
| Conectadas x integradas | Compartilhar eventos versus compartilhar e interpretar contexto |
| actionRequired | Campo que trava a criação do card até um humano agir |
| Confidence | Confiança do parser; guia criar, confirmar ou pedir reformulação |
| Sincronização unidirecional | Jira como fonte oficial, notificando o Slack |
| Audit trail | Log com data, canal, ID da mensagem, versão do prompt e output bruto |

---

## 💻 No código do repo

**Projeto:** [modulo-09-automacao-de-ecossistema](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-09-automacao-de-ecossistema)

System prompt do parser NL to Workflow com 3 mensagens de teste, guia de setup (Make.com e Node.js, mais a segunda direção Jira para Slack), blueprint importável do Make, template de bot em Node.js e o output de referência.

**Fluxo**
1. `nl-to-workflow-prompt.md`: o parser devolve só JSON com `type` (bug, task, feature, question ou decision), `title` (80 caracteres), `priority` (Highest, High, Medium ou Low), `assignee` (nome, null ou «[A DEFINIR]»), `dueDate`, `component`, `requestedBy`, `reason`, `description`, `tags`, `actionRequired`, `confidence` e `rawMessage`. Casos especiais: várias ações (array com `linkedMessage`), pergunta (não cria card) e mensagem insuficiente (tipo `unknown`). O contexto do projeto traz módulos, equipe e stack (Teltonika FMB920, MQTT, AWS IoT Core, Node.js em Lambda, React com Leaflet, Firebase FCM, Jira e Slack).
2. As 3 mensagens de teste (bug simples, pedido complexo com voluntário implícito e blocker com decisão binária) trazem o output real de 2026-07-10 com Gemini 3.1 Pro Preview, temperatura 0,3. A nota de curadoria da mensagem 3 é o gancho da aula: `actionRequired` veio null, e a solução é um ajuste de prompt.
3. `setup-guide-m9.md`: Opção A (Make.com): Slack App com escopos `channels:history`, `channels:read` e `chat:write`, cenário Slack, HTTP (Gemini), Parse JSON, Jira. Opção B (Node.js, com ngrok e Event Subscriptions). Também a segunda direção, Jira para Slack, com Incoming Webhook e uma regra de Automation do Jira, e a tabela de problemas comuns.
4. `make-blueprint-m9.json`: 4 módulos (Slack Watch Messages, HTTP para a API do Gemini, Parse JSON e Jira Create Issue), com notas para recriar as conexões e trocar `SUA_API_KEY`.
5. `ecosystem-bot-template.js`: bot com `@slack/bolt` (Socket Mode), parser via SDK da Anthropic, cliente Jira por `axios`, gatilho `card:`, mapeamento de assignee e componentes, função `handleJiraWebhook` e exportações para teste.
6. `output-exemplo-nlworkflow-m92.md`: os três outputs completos com notas de curadoria (a mensagem 2 pode sair como *task*, e na 3 o `actionRequired` vazio é o ponto central).
7. `Atividade - Módulo 9.pdf` (opcional): automação mínima com palavra-chave e tabela de avaliação de 5 mensagens. `Exemplo - Módulo 9.pdf`: Make.com com gatilho «BUG:» (cerca de 22 minutos de setup mais uns 8 do Slack App), tabela em que o parser atribuiu uma feature ao último que falou (Marcus) e transformou uma atualização de status em Task, e o ajuste de prompt para um tipo `STATUS_UPDATE` e para nunca inferir o responsável pelo remetente. Esse tipo não existe no enum do prompt do repositório.

**Como rodar**
- Make: importe o blueprint (menu `...`, Import Blueprint), recrie as conexões Slack e Jira e troque a chave do Gemini. Se a importação falhar, siga o passo a passo do guia.
- Node: `npm install @slack/bolt @anthropic-ai/sdk axios dotenv` (os comentários do template listam isso; não há `package.json`), preencha o `.env` do template e rode `node ecosystem-bot-template.js`. Checei só a sintaxe com `node --check`; não executei o bot por falta de credenciais.
- Atividade 9: automação mínima com palavra-chave no Slack criando rascunho de card, e uma tabela de avaliação de 5 mensagens (bug, feature, decisão de arquitetura, blocker e atualização de status).

**Armadilhas e achados no código**
- O guia de setup e o template de código não combinam: o guia fala em Gemini e `GEMINI_API_KEY`, `SLACK_SIGNING_SECRET` e Event Subscriptions com ngrok; o template usa o SDK da Anthropic (`claude-sonnet-4-6`), Socket Mode e `SLACK_APP_TOKEN`/`ANTHROPIC_API_KEY`. Os comentários do template chamam o AI Studio de «claude.ai».
- O guia manda rodar `npm install`, mas a pasta não tem `package.json`.
- O prompt do `.md`, o do template JS e o da blueprint têm esquemas diferentes (o do template usa `story` e `spike` e prioridades em minúsculas; o da blueprint usa tipos e prioridades como Critical). O prompt do `.md` define `actionRequired` como string ou null, mas no caso de pergunta devolve `false`, e `unknown` não está no enum de tipos.
- No template, a confirmação é só uma mensagem: o card é criado em seguida sem esperar resposta (o próprio código admite que é para a demo). `handleJiraWebhook` não está ligado a nenhum endpoint, `dueDate` e `component` não vão para o Jira, e a descrição usa Markdown em um nó ADF de texto puro.
- Verifiquei um bug: o parser extrai o JSON com `/\{[\s\S]*\}/`; para a resposta em array (caso de várias ações) esse padrão captura de `{` a `}` e o `JSON.parse` falha. O prompt do `.md` pede array nesse caso, o template não.
- A blueprint e o guia chamam `gemini-1.5-flash`, modelo antigo perto do Gemini 3.1 das demos (não verifiquei se ainda existe). A blueprint não preenche prioridade nem tipo reais no Jira (tudo vai como Task, com a prioridade no texto), e o Gemini pode cercar o JSON com crases, o que quebraria o Parse JSON (hipótese).
- As notas de design dizem que Marcus é «dev backend responsável pelo módulo de GPS»; no restante do curso ele é consultor e tech lead.

---

## 🔗 Para ir além
- [Pasta do módulo 9 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-09-automacao-de-ecossistema)
- [Repositório oficial do módulo 07 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos)
- [Relatório 4: Asana, Anatomy of Work Index 2023](https://asana.com/resources/anatomy-of-work)
- [Make.com](https://www.make.com/)
- [Slack API](https://api.slack.com/)
- [Jira Cloud](https://www.atlassian.com/software/jira)
- [Google AI Studio](https://aistudio.google.com/)

---

⬅️ [12 · Danger: regras de conformidade no pipeline (JS, Python e repositório demo)](./12-danger-regras-de-conformidade-no-pipeline.md)  ·  [Guia de leitura](./README.md)  ·  [14 · OKRs, alinhamento de backlog e scorecard de portfólio](./14-okrs-alinhamento-de-backlog-e-portfolio.md) ➡️
