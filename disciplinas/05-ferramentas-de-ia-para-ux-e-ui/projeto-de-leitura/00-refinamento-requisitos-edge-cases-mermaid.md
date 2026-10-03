# 00 · Refinamento de requisitos, edge cases e fluxos em Mermaid

> **Unidade 1 · Aulas 1 e 2** · Leitura: ~10 min · Bloco: Discovery e Prompt as Code

## 🎯 Em uma frase
Antes de implementar, a IA expande o requisito bruto em **edge cases, estados de interface e riscos** a partir de um prompt com **papel, objetivo, regras e formato de saída**; o resultado vira um fluxo **Mermaid**, texto versionado no Git.

---

## 👵 Explicando para a vovó

Pense em quem vai construir uma casa a partir de uma planta simples. Antes de levantar a primeira parede, um engenheiro experiente percorre a planta fazendo perguntas chatas: e se o cano vazar? E se faltar luz? E se a porta não couber a cadeira de rodas? Ele não constrói nada, só acha buracos que ninguém tinha visto.

A IA, neste início do curso, faz esse papel de engenheiro perguntador. E o Mermaid é a planta redesenhada em texto: quando surge uma regra nova, a gente edita uma linha em vez de redesenhar tudo na mão.

---

## 🔧 Tecnicamente

### O que é
- **Requisito bruto quase nunca basta.** O exemplo da aula é um PIX agendado: escolher contato, informar valor, escolher data, confirmar e receber comprovante, com limite diário, proibição de agendar para o mesmo dia e possibilidade de cancelar. Parece completo, mas deixa perguntas sem resposta: o saldo é validado no agendamento ou na execução? O valor agendado já consome o limite diário? O que acontece se a chave for removida depois? E em feriados? Até que horas dá para cancelar? Como a interface reage a uma falha de comunicação?
- **IA como expansão analítica, não como oráculo.** A apostila a chama de «segunda camada de pensamento crítico» e de ferramenta de brainstorming técnico: nem tudo que ela sugere é certo, e tudo bem, porque o valor está em provocar perguntas para a reunião de refinamento. Ela não substitui analista, PO ou arquiteto, porque não conhece estratégia de negócio, limitações políticas, cultura da empresa nem nuances emocionais do usuário.
- **Prompt estruturado em quatro blocos:** papel (arquiteto, analista, especialista em UX), objetivo (analisar requisitos, achar edge cases, mapear estados), regras (caminhos felizes e infelizes, estados de carregamento, conflitos de negócio, cenários de falha) e formato de saída. A qualidade da resposta depende da qualidade do contexto fornecido.
- **Edge cases** são situações extremas ou pouco óbvias. Os da aula: a virada de data (usuário começa às 23h59 e confirma depois da meia-noite: ainda é o mesmo dia?), saldo insuficiente na data programada (o usuário é avisado? o agendamento é cancelado?) e chave PIX removida entre o agendamento e a execução.
- **Estados de interface:** carregamento (sem feedback o usuário acha que travou), vazio (sem contatos, sem agendamentos, busca sem resultado) e erro (saldo insuficiente, limite excedido, falha de comunicação, chave inválida, timeout, indisponibilidade do serviço bancário). A forma de comunicar o erro afeta a confiança no produto.
- **Mermaid** é uma ferramenta open source que desenha diagramas a partir de texto. O diagrama passa a ser código: vai para o Git, é revisado em pull request e evolui junto com a aplicação. GitHub, VS Code e Jira têm suporte nativo ou plugin para renderizar. Isso ataca o problema histórico da documentação desatualizada.
- **Fluxo funcional não é arquitetura.** Estes diagramas mapeiam jornada, decisões de negócio e estados da aplicação. Depois eles podem servir de base para identificar serviços e componentes, mas o foco inicial é entender o comportamento.

### Como funciona
- Passo 1: configurar o System Prompt do modelo como arquiteto sênior e especialista em UX e enviar o requisito bruto. Saída esperada: riscos, estados de UI, cenários ocultos e regras conflitantes.
- Passo 2: pedir ao mesmo chat (que já tem o contexto do refinamento) um flowchart top-down que cubra caminho feliz e infelizes, com estados de loading, vazio e erro. Convenção descrita na aula: retângulos para ações do usuário e processos do sistema, losangos para decisões de negócio e cor para estados críticos.
- Passo 3: o time revisa. QA deriva casos de teste, o arquiteto pensa nos componentes, o dev enxerga os estados antes de implementar e o PO valida se a jornada faz sentido.
- Passo 4: iterar. Surgiu um cenário novo (por exemplo, autenticação negada)? Adiciona-se uma condição no texto e o diagrama renderiza de novo. A IA gera, o time discute, novas regras aparecem, o refinamento amadurece.
- Quanto mais estruturado o prompt (tipo de diagrama, orientação, tipos de nó, regras de estilo), mais próximo da realidade fica o resultado. A sintaxe objetiva do Mermaid facilita a geração pelos modelos.

### Onde aplicar
- Refinar uma story antes de a sprint começar, levando a lista expandida de perguntas para a reunião em vez de começar do zero.
- Gerar a base dos casos de teste de QA a partir dos caminhos infelizes mapeados.
- Documentar jornadas no README do repositório com um bloco Mermaid renderizado pelo próprio GitHub.
- Melhorar o contexto de qualquer geração posterior: código, testes, contratos de API e automações de QA dependem da clareza do requisito.

### Vantagens e limites
**Vantagens**
- Antecipa em horas o que normalmente só apareceria em homologação ou produção.
- Diagrama como código: versionável, revisável em PR e barato de atualizar.
- Alinha dev, QA, PO e arquiteto sobre o mesmo fluxo e os mesmos estados.

**Limites**
- A IA sugere cenários improváveis ou interpretações discutíveis; sem triagem humana vira ruído.
- Não conhece o contexto organizacional: regras reais do negócio (como limites regulatórios) precisam ser confirmadas por quem as conhece.
- O diagrama gerado pode estar sintaticamente correto e logicamente simplificado.

### 🚫 Armadilhas
- Jogar o requisito no chat sem papel, regras e formato e esperar uma análise sofisticada.
- Tratar o diagrama como verdade só porque ele renderizou: a validação continua sendo do time.
- Confundir fluxo funcional com arquitetura de sistema.
- Parar na primeira versão: o valor do Mermaid está na iteração.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Edge case | Situação extrema ou pouco óbvia que muda o comportamento do sistema (ex.: virada de data às 23h59) |
| Unhappy path | Caminho em que algo dá errado: erro de API, validação, timeout, saldo insuficiente |
| Empty state | Tela sem dados (sem contatos, sem agendamentos) que precisa de tratamento próprio |
| System Prompt | Instrução fixa que define o papel e as regras do modelo durante a conversa |
| Papel, objetivo, regras, formato | Estrutura de prompt usada em todas as aulas do módulo |
| Mermaid | Linguagem de diagramas em texto, renderizada por GitHub, VS Code, Jira e outros |
| graph TD | Flowchart orientado de cima para baixo no Mermaid |
| classDef | Declaração de estilo reutilizável por classe, usada para colorir erros e sucessos |

---

## 💻 No código do repo

**Projeto:** [modulo-01 · refinamento e Mermaid](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01)

Artefatos de discovery das aulas 1 e 2: o ticket bruto de Pix Agendado, o System Prompt de arquiteto, a análise devolvida pela IA e dois diagramas Mermaid. Tudo em Markdown versionado; não há código executável, o laboratório roda no Google AI Studio.

**Fluxo**
1. `docs/refinement/briefing-bruto.md`: o ticket de entrada, com três regras (limite diário de R$ 5.000,00, proibição de agendar para o mesmo dia e botão para cancelar o agendamento depois).
2. `prompts/system-instructions-refinement.md`: papel de Arquiteto de Software Sênior e Especialista em UX, regras (caminhos infelizes que o PO esqueceu, estados de loading, vazio e erro, falhas de segurança ou regras conflitantes) e quatro chaves de saída: `analise_de_risco`, `mapeamento_de_estados`, `cenarios_ocultos` e `regras_de_negocio_conflitantes`.
3. `report/refinamento-pix-aula-1.md`: a resposta da IA, que se apresenta como segunda rodada de análise. Riscos: limite noturno, janela de cancelamento, chave excluída ou portada, MFA no agendamento, concorrência de saldo futuro. Traz o checklist de estados de UI, um `graph TD` e três dicas ao dev (redirecionar de «hoje» para Pix comum herdando os dados, date picker acessível por teclado e `x-idempotency-key` no header).
4. `report/mermaid-detalhado-aula-2.md`: o prompt «COMANDO DE ENGENHARIA DE FLUXO» (graph TD, cobrir todos os caminhos infelizes, retângulos para ações, losangos para decisões, `classDef` error e success) seguido do diagrama gerado, com loading, empty states, MFA, `POST /pix/schedule`, tratamento de 201, 403, 429 ou 500 e timeout, e o cancelamento por `DELETE`.

**Como rodar**
- Abra o Google AI Studio, cole o conteúdo de `system-instructions-refinement.md` em System Instructions e envie o `briefing-bruto.md`.
- Peça a análise de caminhos infelizes e, em seguida, o código Mermaid; renderize no Mermaid Live Editor ou em um plugin do VS Code.

**Armadilhas e achados no código**
- O README do `modulo05` e o do `modulo-01` descrevem uma estrutura que não existe: pastas `modulo-01-discovery-refinement/` e `reports/`, prompts em `.json`, `edge-cases.md` e `fluxo-logico.mmd`. No repo real os prompts são `.md`, a pasta é `report/` e os fluxos estão dentro dos relatórios.
- `system-instructions-refinement.md` está em pseudo-YAML: há uma aspa solta no fim da lista de regras e vírgulas dentro dos valores. À vista, não é YAML válido; funciona como texto livre para o modelo.
- No Mermaid detalhado sobrou um comentário de depuração (`%% Aqui o Gemini comenteu um erro ...`) dentro do bloco do diagrama.
- O diagrama trata o limite como regra por valor (`Valor > R$ 5.000,00?`), mas o requisito fala em limite diário, que é uma soma do dia. É uma simplificação da modelagem (leitura minha).
- Os dois diagramas divergem entre si (o da aula 1 é bem menor); o do arquivo da aula 2 é o mais completo.

---

## 🔗 Para ir além
- [Repositório oficial: módulo 01 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01)
- [Google AI Studio](https://aistudio.google.com/)
- [Mermaid Live Editor](https://mermaid.live)

---

[01 · UX Writing e sanitização de dados como ativos técnicos](./01-ux-writing-e-sanitizacao-de-dados.md) ➡️
