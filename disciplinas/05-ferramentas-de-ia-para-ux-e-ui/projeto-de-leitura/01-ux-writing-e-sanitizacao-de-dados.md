# 01 · UX Writing e sanitização de dados como ativos técnicos

> **Unidade 1 · Aulas 3 e 4** · Leitura: ~10 min · Bloco: Discovery e Prompt as Code

## 🎯 Em uma frase
O mesmo modelo muda de papel conforme o System Prompt: como **UX Writer** gera mensagens em JSON sem culpa e com próximo passo; como **engenheiro de dados com viés de LGPD** remove PII e ruído de feedbacks sem destruir o contexto técnico.

---

## 👵 Explicando para a vovó

Imagine dois funcionários de um banco. O primeiro escreve os avisos do caixa eletrônico: em vez de «você errou a senha», escreve «não foi possível confirmar, tente de novo». O segundo recebe uma pilha de cartas de clientes, risca CPFs e telefones com caneta preta, joga fora as cartas de propaganda e entrega só o que ajuda a consertar o banco.

É o mesmo funcionário em dias diferentes: o que muda é a instrução que ele recebeu de manhã. E o resultado de cada um sai em fichas padronizadas (JSON), que o resto da empresa consegue arquivar e usar.

---

## 🔧 Tecnicamente

### O que é
- **UX Writing (microcopy):** projetar a comunicação dentro da experiência. Uma mensagem mal construída gera insegurança, frustração e abandono; em sistemas financeiros o cuidado é maior, porque mensagens agressivas ou excessivamente técnicas geram desconfiança.
- **Princípios da aula:** não culpar o usuário («Não foi possível concluir a operação», não «você digitou errado»); ser objetivo e evitar becos sem saída (dizer o que aconteceu, por que e o que fazer agora); padronizar a semântica (se o sistema usa «transferência», não alterna com «envio», «remessa» ou «operação»); manter tom de voz e terminologia do design system da empresa; reduzir carga cognitiva, o que também é acessibilidade.
- **Mensagens como ativo técnico:** não se espalha texto hardcoded nos componentes. O padrão é manter as mensagens em arquivos estruturados (normalmente JSON) carregados por biblioteca de internacionalização: manutenção fácil, suporte multilíngue, padronização, desacoplamento da interface e reaproveitamento. Pedir à IA o JSON já no formato do projeto (código identificador, título, mensagem principal, ação sugerida) faz o texto virar parte do código.
- **Janela de contexto como ativo:** a conversa já contém requisito refinado, edge cases e diagramas; a IA usa isso para gerar mensagens específicas de cada cenário (sucesso de agendamento, saldo insuficiente, limite excedido, data inválida, erro de autenticação, timeout, falha de comunicação, cancelamento, chave inválida).
- **Sanitização de datasets:** reviews de loja, tickets de suporte e redes sociais mostram o que não apareceu em homologação, mas chegam com spam, testes internos, respostas automáticas e dados pessoais (CPF, telefone, e-mail, endereço, conta bancária, dados de terceiros). Do ponto de vista de compliance isso é risco real.
- **O que a LLM adiciona:** regex acha CPF, telefone e e-mail; o modelo também interpreta contexto e separa reclamação relevante de ruído, bot, spam, assunto fora do domínio e teste interno. O papel do modelo aqui é engenheiro de dados sênior e especialista em compliance e LGPD.
- **Equilíbrio:** PII (qualquer dado que identifique direta ou indiretamente alguém) é trocada por marcador neutro, não apagada junto com o feedback. Se remover demais, perde-se contexto analítico; de menos, risco de privacidade. Detalhes como «agendar no dia 31 usando iPhone» (ação, edge case de calendário, dispositivo) precisam sobreviver. A saída em JSON alimenta analytics, BI, tickets e novas automações, e identificadores de usuário podem ser anonimizados mantendo rastreabilidade estatística.
- **A IA não substitui engenharia de dados:** para volumes grandes continuam necessários governança, validação, observabilidade e segurança. O LLM é uma camada semântica de preparação inicial.

### Como funciona
- UX Writing: o System Prompt troca o papel do modelo para UX Writer técnico e especialista em i18n; define tom de voz, termos proibidos e permitidos e o schema JSON. Depois, no mesmo chat, uma tarefa de extração pede os cenários de erro, validação, exceção e sucesso do histórico e gera o JSON aplicando o System Prompt.
- Sanitização: o System Prompt define regras numeradas (anonimizar PII com marcador, descartar ruído, preservar contexto técnico) e exige como saída apenas um array JSON, com o autor trocado por um ID anonimizado.
- Ciclo que a aula descreve: usuários usam, feedbacks são coletados, dados são sanitizados, a IA ajuda na análise, melhorias são identificadas, novos requisitos surgem e o produto evolui. A sanitização é a primeira etapa de uma cadeia: sem dado limpo, as análises seguintes perdem qualidade.
- Revisão humana permanece: o UX Writer, o designer, o dev e o PO continuam responsáveis pela qualidade final do texto; o engenheiro de dados e o analista continuam responsáveis pelo pipeline.

### Onde aplicar
- Criar um catálogo de mensagens de erro e sucesso de uma feature nova já em JSON, pronto para o i18n do front.
- Padronizar a terminologia de produto (transferência, agendamento, chave Pix) em um style guide que o próprio prompt aplica.
- Preparar exportações de tickets e reviews antes de analisar ou enviar a qualquer serviço externo.
- Servir de etapa zero para classificação, agrupamento e geração automática de tickets (próximo tópico).

### Vantagens e limites
**Vantagens**
- Texto consistente com o tom de voz da empresa desde a primeira versão.
- Mensagens como dado: trocáveis, traduzíveis e testáveis sem mexer no componente.
- Interpretação semântica do ruído, o que filtros puramente sintáticos não fazem.
- Dataset limpo e estruturado alimenta várias automações seguintes.

**Limites**
- O modelo pode errar a classificação de ruído versus sinal e deixar passar PII em formatos inesperados; a revisão humana continua necessária.
- Enviar dados brutos com PII a um serviço de IA externo para sanitizar pode ser, por si só, o problema de compliance (ponto de atenção meu; a aula trata da sanitização em si).
- Não substitui pipelines de engenharia de dados para grandes volumes.

### 🚫 Armadilhas
- Mensagem que culpa o usuário («dado inválido», «erro do usuário»).
- Erro sem próximo passo: becos sem saída.
- Remover PII apagando também o contexto técnico que torna o feedback útil.
- Esquecer de trocar o System Prompt ao mudar de tarefa, herdando regras da tarefa anterior.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| UX Writing / microcopy | Texto de interface projetado como parte da experiência |
| i18n | Internacionalização: textos em arquivos por idioma carregados por biblioteca |
| PII | Dado que identifica direta ou indiretamente uma pessoa (CPF, telefone, e-mail, nome completo) |
| LGPD | Lei Geral de Proteção de Dados: motivo de anonimizar antes de processar |
| Marcador neutro | Substituto da PII que preserva a estrutura da frase (no repo, [REDACTED]) |
| Ruído | Teste interno, bot, spam, resposta automática, assunto fora do software |
| Janela de contexto | Quantidade de informação que o modelo mantém na mesma conversa |
| Blameless | Mensagem que não atribui culpa ao usuário |

---

## 💻 No código do repo

**Projeto:** [modulo-01 · UX Writing e sanitização](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01)

Dois laboratórios de prompt versionados em Markdown, com entradas e saídas em JSON: o gerador de mensagens de UX Writing do Pix agendado e o sanitizador do dataset de feedbacks.

**Fluxo**
1. `prompts/ux-writing-system.md`: papel de Lead UX Writer Técnico e especialista em i18n para sistemas bancários; diretrizes de tom (proibido «Erro do usuário», «Dado inválido» e «Você esqueceu»; permitido «Não foi possível processar» e «Formato não reconhecido»), regra de resolutividade (todo erro sugere o próximo passo) e consistência técnica (Transferência e não Envio, Agendamento e não Reserva, Chave Pix e não ID). Saída: objeto JSON `ERROR_KEY_OR_CODE` com `title` (máx. 40 caracteres), `message` (máx. 140) e `action_label` (verbo no imperativo).
2. `report/ux-writer-aula-3.md`: o prompt de extração usado depois do System Prompt (identificar cenários de erro, validação e exceção, os de sucesso e gerar o JSON).
3. `report/pt-BR.json`: o resultado, com 14 chaves `SCHEDULE_PIX_*` (por exemplo `SCHEDULE_PIX_INVALID_DATE`, `SCHEDULE_PIX_VALUE_TOO_HIGH`, `SCHEDULE_PIX_CANT_CANCEL_TODAY` e `SCHEDULE_PIX_SUCCESS`). Verifiquei que o JSON é válido e que todos os títulos e mensagens respeitam os limites de 40 e 140 caracteres.
4. `prompts/data-sanitizer.md`: papel de Engenheiro de Dados Sênior e Analista de LGPD; regras de anonimização com `[REDACTED]`, descarte de ruído (bots, tickets de teste, reclamação de atendimento físico) e preservação de contexto técnico; saída estritamente um array JSON com `author` trocado por `user_1` e assim por diante.
5. `data/raw-feedbacks.json` (6 tickets) e `data/sanitized-feedbacks.json` (3 tickets): sobrevivem `tkt_01` (CPF virou `[REDACTED]`), `tkt_05` (crash no dia 31 com iPhone 13) e `tkt_06` (telefone redigido); saem `tkt_02` (teste de produção), `tkt_03` (reclamação do gerente da agência) e `tkt_04` (resposta automática de bot).

**Como rodar**
- Sem código a executar. No AI Studio, cole o `ux-writing-system.md` como System Instructions, reaproveite a conversa do tópico anterior e cole o prompt de `ux-writer-aula-3.md`.
- Para a sanitização, troque o System Prompt por `data-sanitizer.md` e envie o conteúdo de `raw-feedbacks.json`; compare com `sanitized-feedbacks.json`.

**Armadilhas e achados no código**
- Nenhum app do repositório consome `pt-BR.json`: o `pix-app` do módulo 2 escreve os textos direto nos templates (inclusive a mensagem do modal de erro, que não vem de nenhuma chave do JSON). Ou seja, o ativo foi gerado mas não foi ligado ao front.
- O `pt-BR.json` mantém na última chave uma indentação fora do padrão, sinal de edição manual; não afeta a validade.
- O README do `modulo-01` fala em Structured Prompt com `sentiment_score` e `technical_priority`, campos que não existem nos prompts do repositório (próximo tópico).
- `sanitized-feedbacks.json` mantém os `id` originais (`tkt_01`); isso preserva rastreabilidade, mas o vínculo com o dado bruto precisa ser guardado com cuidado (observação minha).

---

## 🔗 Para ir além
- [Repositório oficial: módulo 01 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01)
- [Google AI Studio](https://aistudio.google.com/)

---

⬅️ [00 · Refinamento de requisitos, edge cases e fluxos em Mermaid](./00-refinamento-requisitos-edge-cases-mermaid.md)  ·  [02 · Do feedback ao backlog e Prompt as Code](./02-feedback-em-backlog-e-prompt-as-code.md) ➡️
