# 02 · Curadoria de requisitos: as quatro alucinações e o backlog no Jira

> **Unidade 1 · Aula 3** · Leitura: ~6 min · Bloco: Descoberta e escopo (Unidade 1)

## 🎯 Em uma frase
A capacidade de gerar épicos e histórias em minutos só vale se houver **curadoria** antes de o backlog entrar no Jira. Quatro padrões de erro são previsíveis (**especificação inventada, dependência não mapeada, viabilidade técnica silenciosa e gold plating**), e cada correção vira insumo para o prompt.

---

## 👵 Explicando para a vovó

Um tradutor automático traduz tudo com a mesma confiança, acerte ou erre. Você não confia cegamente: relê o que é crítico, confere nomes e números e anota os erros que sempre se repetem para avisar o tradutor da próxima vez.

A curadoria faz isso com os requisitos. O caderno de anotações dos erros é o *log de curadoria*, e é ele que transforma uma ferramenta usada às vezes em um sistema que melhora a cada sprint.

---

## 🔧 Tecnicamente

### O que é
- **Especificações inventadas:** o modelo transforma uma frase genérica em requisito específico sem evidência. Cliente disse «rápido», saiu «latência máxima de 200 ms». Se entrar no backlog, vira compromisso formal.
- **Dependências não mapeadas:** o modelo propõe integrações que parecem naturais («exportar para o sistema de RH») sem saber se o RH tem API, qual formato, qual SLA e quais restrições de segurança.
- **Viabilidade técnica silenciosa:** propõe soluções sofisticadas (machine learning para anomalias) sem saber se há dados históricos, infraestrutura, orçamento e gente para manter. A decisão é do arquiteto.
- **Gold plating:** o alerta simples vira dashboards, múltiplos níveis de configuração e integrações que o cliente não pediu. O teste: cada linha do critério de aceite precisa ter correspondência direta com algo que o stakeholder disse.
- **Log de curadoria:** registro simples (Confluence, Notion ou qualquer repositório) do que o modelo produziu, da correção e do motivo. Padrões recorrentes dizem o que mudar: muita especificação inventada indica protocolo de ambiguidade frouxo; erros concentrados num domínio pedem mais contexto arquitetural.
- **O que o modelo não sabe:** restrições contratuais, SLAs com fornecedores, limites de hardware, regras internas, problemas do legado e decisões tomadas fora da reunião. O slide dá exemplos: payload limitado do servidor legado, SLA de 6 semanas do RH, auditoria LGPD recente, API de rastreamento com 100 chamadas por minuto (inviável para 140 motoristas em tempo real) e contrato com a montadora que proíbe mexer no firmware.

### Como funciona
- **Checklist antes de aprovar:** o requisito é viável na arquitetura e no orçamento reais? Há exposição de LGPD ou compliance (dados pessoais, localização, comportamento)? Há dependências externas, que precisam ser identificadas *antes* do planejamento da sprint?
- **Quem corrige o quê:** especificação inventada o analista resolve relendo a transcrição; viabilidade técnica exige arquiteto ou Tech Lead; dependências externas pedem infra ou parceiros; escopo é decisão entre gerência, liderança técnica e negócio.
- **Regra prática:** se a correção altera o que foi prometido ao stakeholder, valide com as partes interessadas antes de ir ao backlog. Se muda só a forma de documentar, registre no log e siga.
- **Rastreabilidade:** a User Story deve apontar para o trecho da transcrição de origem; sem origem, vai para validação.
- **Ferramenta ou sistema:** a apostila contrasta equipes que usam IA pontualmente (ferramenta) com as que acumulam aprendizado das próprias correções (sistema).
- **Do backlog ao Jira:** as histórias aprovadas seguem para o Jira com épicos, critérios, estimativas e IDs. A etapa prática do curso importa um CSV completo do caso RouteWise para um board Scrum, que é o ponto de partida dos módulos seguintes.

### Onde aplicar
- Manter um log de curadoria por projeto e revisar os padrões a cada duas ou três sprints.
- Exigir, em refinamento, a pergunta «de qual fala vem este critério?» para cada linha de aceite.
- Usar o checklist de três pontos (viabilidade, compliance, dependências) como gate antes de a história entrar em sprint.

### Vantagens e limites
**Vantagens**
- Transforma erros do modelo em melhoria contínua do prompt.
- Separa claramente o que é correção de forma (pode seguir) do que muda promessa (exige validação).
- Dá um critério objetivo contra gold plating.

**Limites**
- Curadoria custa tempo humano e exige gente com contexto de arquitetura e negócio.
- O log só ajuda se for realmente consultado e usado para ajustar o prompt.
- Limitações como SLA contratual e decisões fora da reunião continuam fora do alcance do modelo.

### 🚫 Armadilhas
- Pular a curadoria porque o documento «parece completo».
- Aceitar integrações que «fazem sentido» sem confirmar que existem e são viáveis.
- Deixar uma correção de escopo ser feita só pela equipe, sem validar com o stakeholder.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Especificação inventada | Número ou regra criado pelo modelo sem origem na fala do cliente |
| Dependência não mapeada | Integração suposta cuja existência, formato e SLA ninguém confirmou |
| Viabilidade técnica silenciosa | Solução que pressupõe dados, infraestrutura ou expertise não confirmados |
| Gold plating | Escopo a mais que ninguém pediu |
| Log de curadoria | Registro de cada intervenção humana sobre o output da IA e o motivo |
| Definition of Ready | Critério para uma história poder entrar em sprint |

---

## 💻 No código do repo

**Projeto:** [modulo-01-planejamento-e-escopo (CSV do Jira e guias de board)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-01-planejamento-e-escopo)

Material para subir o backlog completo do RouteWise num Jira gratuito: o CSV de importação, o guia de importação atualizado com erros reais da turma, o guia do board por módulo e o snapshot do board deste módulo.

**Fluxo**
1. `routewise-jira-import.csv`: 68 itens (2 épicos, 16 histórias, 19 tasks e 31 bugs) nas colunas Summary, Issue Type, Priority, Description, Story Points, Epic Name, Epic Link, Sprint, Labels e Component/s. Os épicos são «[EPIC] Segurança e Redução de Sinistros» (OKR 1, KR 1.1) e «[EPIC] Manutenção Inteligente» (OKR 2, KR 2.1). Os bugs por sprint (3, 5, 8, 11 e 4) batem com os números do Risk Monitor.
2. `Como Importar o Backlog no Jira - Módulo 1.md`: exige perfil de administrador, projeto Scrum, preferência por company-managed, tipo Bug existente no projeto e importador clássico (`/secure/admin/ExternalImport1.jspa`). Lista sete erros reais, como o sintoma de ~35 itens (bugs rejeitados quando mapeados como Subtask), campo Epic Link substituído por Parent, sprints ignoradas por exigirem ID numérico e acentos quebrados sem UTF-8.
3. `guia-board-routewise.md`: descreve o estado ideal do board em cada módulo (1.2, 2.3, 3.2, 4.2, 5.2, 6.2, 7.2, 10.2) e traz scripts Node (`fetch` nativo) e Python (`requests`) que descobrem IDs de transição e movem issues para Feito ou Fazendo via API REST do Jira.
4. `jira-estado-board.md` (uma cópia em cada pasta de módulo): checklist do estado do board naquele ponto da narrativa.

**Como rodar**
- Crie um projeto Scrum no Jira Cloud (como administrador), garanta o tipo de item Bug, abra o importador clássico, escolha o CSV com delimitador vírgula e encoding UTF-8, mapeie os campos e confira se o total importado é 68.
- Para os scripts do guia: crie um API token em `id.atlassian.com`, ajuste `JIRA_URL`, `EMAIL`, `API_TOKEN` e `PROJECT`, rode primeiro o script que lista as transições e só depois o de configuração. O guia avisa que os IDs de transição variam por instância.

**Armadilhas e achados no código**
- O CSV repete a mesma história em várias linhas (uma por sprint): as «16 histórias» são 16 linhas de 12 IDs distintos (US-01 aparece duas vezes, US-02 três, US-03 duas).
- O guia de board descreve o snapshot da Sprint 4 com as chaves `ROUTEWISE-201` a `ROUTEWISE-216`, e os scripts dele (com `PROJECT = "RW"`) movem `RW-201`, `RW-202` e `RW-206` a `RW-211` para Feito e `RW-203` e `RW-205` para Fazendo; os bugs `RW-212` a `RW-216` já ficam em A fazer pelo import. Só que a importação cria 68 itens, então num projeto novo as chaves 201 a 216 não existem. O guia também alterna o prefixo: `ROUTEWISE` na tabela e `RW` nos scripts.
- O guia lista US-02 com 13 SP, enquanto o CSV usa 5 e 8; o snapshot de Story Points do M4 repete os 13 SP. O guia também fala de «~400 linhas» enquanto o arquivo de importação atualizado tem 443 por causa de quebras de linha.
- O snapshot do board diz que as histórias estão ligadas aos épicos via Epic Link, campo que o guia de importação atualizado dá como descontinuado em favor de Parent.
- O BUG-S4-10 do CSV traz a causa raiz: o guard `hardware_version >= 2` (criado para preparar o score) bloqueou também os alertas de velocidade dos 43 veículos com rastreador v1. Esse mesmo bug reaparece nos módulos 5, 7 e 8.

---

## 🔗 Para ir além
- [Pasta do módulo 1 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-01-planejamento-e-escopo)
- [Repositório oficial do módulo 07 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos)
- [Indicação 3: A Prompt Pattern Catalog (White et al., 2023)](https://arxiv.org/abs/2302.11382)
- [Indicação 12: The Scrum Guide (Schwaber e Sutherland)](https://scrumguides.org)
- [Relatório 10: MIT NANDA, The GenAI Divide (2025)](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- [Relatório 11: BCG, The Widening AI Value Gap (2025)](https://bcg.com/publications/2025/are-you-generating-value-from-ai-the-widening-gap)
- [Relatório 12: Gartner, AI Projects in I&O Stall (2026)](https://gartner.com/en/newsroom/press-releases/2026-04-07-gartner-says-artificial-intelligence-projects-in-infrastructure-and-operations-stall-ahead-of-meaningful-roi-returns)
- [Jira Cloud](https://www.atlassian.com/software/jira)

---

⬅️ [01 · Requirements Copilot: o system prompt como contrato de comportamento](./01-requirements-copilot-system-prompt-como-contrato.md)  ·  [Guia de leitura](./README.md)  ·  [03 · Priorização com dados: HiPPO, MoSCoW, RICE e WSJF](./03-priorizacao-hippo-moscow-rice-wsjf.md) ➡️
