# 02 · Do feedback ao backlog e Prompt as Code

> **Unidade 1 · Aulas 5 e 6** · Leitura: ~9 min · Bloco: Discovery e Prompt as Code

## 🎯 Em uma frase
Um **structured prompt** faz o modelo atuar como Tech Lead e PM e devolver tickets em JSON com categoria, severidade e ação; **Prompt as Code** é tratar esses prompts como código: arquivos separados, versionados, documentados e reutilizáveis.

---

## 👵 Explicando para a vovó

Imagine a caixa de sugestões de um prédio com centenas de bilhetes: «o elevador travou», «ficou preso entre andares», «a porta não abre». O síndico experiente percebe que são o mesmo problema, cria uma única tarefa, marca como urgente e escreve o que o zelador deve olhar primeiro.

Agora imagine que o síndico guardou o jeito de fazer isso numa pasta com o nome certo na gaveta, em vez de na cabeça. Quando ele sair de férias, qualquer pessoa abre a pasta e faz igual. É isso o Prompt as Code: o conhecimento deixa de morar num chat e passa a morar no repositório.

---

## 🔧 Tecnicamente

### O que é
- **Problema:** produto em produção gera sinais o tempo todo (reviews, tickets, pesquisas, métricas) e o time pergunta «por onde começamos?». O desafio é converter reclamação difusa em backlog acionável.
- **System Prompt estruturado:** papel (Tech Lead e Product Manager de um app financeiro), objetivo, regras de classificação e formato de saída. O modelo passa a pensar em impacto técnico, criticidade, experiência e priorização ao mesmo tempo.
- **Classificação:** categorias explícitas (bug crítico, melhoria de interface, nova funcionalidade) e severidade. Crash e tela branca são alta severidade: erros podem acontecer, mas a interface nunca deveria quebrar sem fallback, feedback visual, mensagem clara e possibilidade de recuperação.
- **Ações propostas:** o modelo transforma sintoma em hipótese de melhoria (para tela branca em transação: investigar logs, tratar exceções, adicionar error boundaries, melhorar o fallback visual, revisar timeout; para dia 31 em mês curto: validar o DatePicker, restringir datas e tratar exceção no back-end).
- **Agrupamento semântico:** «travou», «ficou carregando infinitamente», «tela branca» e «fechou sozinho» podem ser o mesmo bug com palavras diferentes; o modelo consolida em um ticket em vez de dezenas de duplicados, o que ajuda priorização, planejamento e gestão da sprint.
- **Saída estruturada** (ID do ticket, categoria, severidade, resumo, ação proposta) integra com Jira, plataformas de backlog, automações e dashboards. O valor não está em «conversar com o modelo», e sim em transformar respostas em ativos reutilizáveis.
- **Prompt as Code:** prompts carregam decisões técnicas, de produto e de compliance. Tratados como código: um arquivo por propósito com nome claro, em pasta própria, versionados, documentados e compartilhados. Estrutura mínima: dados brutos, prompts, resultados processados e documentação (README) separados. O repositório vira vitrine técnica e biblioteca interna de «inteligência operacional».
- **Meta prompt:** um prompt que gera outro artefato a partir do projeto, aqui o README. Exige pedir só Markdown válido (sem «aqui está o seu README»), vale para qualquer formato que será colado em arquivo (JSON, YAML, Mermaid).
- **Contexto é parte da arquitetura:** na demonstração, o modelo respondeu no formato errado porque o System Prompt anterior (backlog em JSON) ainda estava ativo. Antes de mudar de tarefa, validar o contexto ativo, limpar ou abrir nova conversa.

### Como funciona
- Alimentar o modelo com o dataset sanitizado, com o System Prompt de backlog ativo e saída exigida como array JSON cru, sem blocos de Markdown.
- Revisar o backlog: o humano valida, prioriza e alinha com a organização; a IA acelera a triagem inicial.
- Tirar os prompts da ferramenta: copiar cada System Prompt para um arquivo em `prompts/`; dados em `data/`, resultados em `report/`, documentação no README.
- Gerar o README por meta prompt apontando o repositório (no AI Studio há opção de contexto de URL; em outras ferramentas pode ser preciso browsing, integração, upload dos arquivos ou colar a árvore do projeto).
- Revisar o README gerado: nomes de arquivos, descrição do fluxo e informações inventadas.
- Com o tempo, a equipe monta uma biblioteca com prompts de refinamento, edge cases, UX Writing, casos de teste, sanitização, classificação de feedback, documentação, análise de PR, diagramas e backlog.

### Onde aplicar
- Triar uma exportação de reviews ou tickets do trimestre em um backlog priorizado importável.
- Padronizar o mesmo prompt de classificação para todo o time, versionado e revisável em PR.
- Criar um repositório de portfólio em que o README explica pipeline, arquivos e como reproduzir.
- Detectar regressões e tendências sazonais ao analisar grandes volumes de feedback na mesma janela de contexto.

### Vantagens e limites
**Vantagens**
- Backlog consistente: categoria e severidade explícitas evitam uma lista caótica.
- Prompts versionados são revisáveis, reutilizáveis e rastreáveis, ao contrário de histórico de chat.
- Saída JSON conecta a IA ao fluxo operacional sem retrabalho manual.

**Limites**
- O backlog gerado é uma primeira triagem; priorização final e alinhamento organizacional são humanos.
- Qualidade depende da entrada: dataset sujo contamina tudo (a saída depende da qualidade da entrada).
- O modelo pode inventar informações no README se não tiver contexto suficiente do repositório.

### 🚫 Armadilhas
- Reaproveitar o chat com o System Prompt de outra tarefa e receber o formato errado.
- Pedir README e receber introdução do tipo «segue abaixo a documentação» colada no arquivo.
- Deixar prompts só no histórico da ferramenta: ninguém encontra, ninguém revisa, não há governança.
- Aceitar o texto gerado sem conferir nomes de arquivos e fluxo descritos.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Structured prompt | Prompt com papel, regras e schema de saída que força resposta estruturada |
| Severidade | Gravidade do problema (ALTA, MEDIA, BAIXA); crash e tela branca são sempre ALTA |
| Agrupamento semântico | Consolidar relatos diferentes que descrevem o mesmo problema |
| Error boundary | Mecanismo que impede uma exceção de derrubar a tela inteira |
| Prompt as Code | Prompts tratados como código: versionados, organizados, documentados e compartilhados |
| Meta prompt | Prompt que produz outro artefato (aqui, o README) a partir do projeto |
| Prompt Garden | Coleção organizada de prompts reutilizáveis do time (termo da aula 3 da unidade 2) |

---

## 💻 No código do repo

**Projeto:** [modulo-01 · backlog e Prompt as Code](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01)

O pipeline completo da unidade 1 em arquivos: dataset bruto, dataset sanitizado, prompt do PM, backlog gerado e o meta prompt do README. A estrutura de pastas do módulo é a própria lição de Prompt as Code.

**Fluxo**
1. `prompts/insights-distiller.md`: papel de Tech Lead e PM de um app financeiro; categorias `BUG_CRITICO`, `UX_UI_IMPROVEMENT` e `NEW_FEATURE`; severidades `ALTA`, `MEDIA` e `BAIXA` (crash e tela branca sempre ALTA); saída estritamente um array JSON, sem Markdown, com `ticket_id`, `original_ref`, `category`, `severity`, `user_pain` e `proposed_action`.
2. `data/backlog.json`: três tickets gerados a partir do dataset sanitizado: `TKT-101` (tela branca no Pix, BUG_CRITICO, ALTA, sugere Error Boundary), `TKT-102` (crash com datas inexistentes, BUG_CRITICO, ALTA, sugere validar máximo de dias por mês) e `TKT-103` (comprovante difícil de achar, UX_UI_IMPROVEMENT, MEDIA, sugere atalho na home).
3. `prompts/readme-generator.md`: meta prompt de Tech Lead que lê o repositório, infere o propósito de cada arquivo e gera o README completo (título, arquitetura do pipeline, como usar, stack), exigindo só Markdown.
4. Estrutura do módulo: `data/` (bruto, sanitizado, backlog), `prompts/` (cinco prompts), `docs/refinement/` (briefing) e `report/` (saídas da IA). É a separação de dado, prompt, resultado e documentação que a aula pede.

**Como rodar**
- Sem código. No AI Studio, ative o `insights-distiller.md` como System Instructions, envie `sanitized-feedbacks.json` e compare com `backlog.json`.
- Para o README, troque o System Prompt para `readme-generator.md` (ou abra nova conversa) e habilite contexto de URL.

**Armadilhas e achados no código**
- O dataset tem só três tickets; ele não exercita o agrupamento semântico que a aula destaca (não há relatos duplicados para consolidar).
- O README do `modulo-01` cita Structured Prompt com `sentiment_score` e `technical_priority` e saída em `reports/backlog-priorizado.json`; o prompt real usa `severity` e `proposed_action`, e o backlog está em `data/backlog.json`.
- O `readme-generator.md` aponta para `github.com/unipds-engenharia-de-ia-aplicada/ferramentas-de-IA-para-UX-UI/tree/main/modulo-01-discovery-refinement`, um repositório e caminho diferentes da árvore atual (`engenharia-de-software-com-ia-aplicada/modulo05.../modulo-01`): o meta prompt está desatualizado em relação a onde o material vive hoje.
- O README raiz do `modulo05` descreve outro curso: módulo 2 como Firebase Studio e Figma to Code, módulo 3 como Gemini CLI, módulo 4 como MCP com testes E2E e módulo 5 como Firebase AI Logic. O conteúdo real usa Stitch, Antigravity, Nx, OpenSpec, Jules, Cypress, Playwright MCP e Genkit.
- Os cinco prompts (`data-sanitizer`, `insights-distiller`, `readme-generator`, `system-instructions-refinement`, `ux-writing-system`) usam formatos diferentes: quatro em Markdown com seções (`insights-distiller` e `ux-writing-system` com schema JSON embutido) e `system-instructions-refinement` em pseudo-YAML. Não há convenção única.

---

## 🔗 Para ir além
- [Repositório oficial: módulo 01 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01)
- [Google AI Studio](https://aistudio.google.com/)

---

⬅️ [01 · UX Writing e sanitização de dados como ativos técnicos](./01-ux-writing-e-sanitizacao-de-dados.md)  ·  [03 · Ambiente AI-first: Angular, Antigravity e MCP](./03-ambiente-ai-native-angular-antigravity-mcp.md) ➡️
