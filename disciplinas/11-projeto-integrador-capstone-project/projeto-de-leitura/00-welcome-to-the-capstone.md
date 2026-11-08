# 00 · Bem-vindo ao Capstone: o AI Researcher e a regra "informa, nunca recomenda"

> **Unidade 1 · Aula 1** · Leitura: ~7 min · Bloco: Unidade 1 · Ideação, setup e deploy inicial

## 🎯 Em uma frase
O **AI Researcher** responde perguntas sobre empresas da B3 com **RAG primeiro**, **web como fallback** quando ele mesmo julga o contexto insuficiente. Recomendar compra ou venda é atividade regulada pela CVM, então a restrição vive em um **guardrail no código**, não só no system prompt.

---

## 👵 Explicando para a vovó

Pense num atendente de biblioteca que primeiro procura a resposta na estante da casa. Se o livro não resolve, ele sai para consultar a internet. E tem uma regra de ofício: pode explicar o que os livros dizem sobre uma empresa, mas jamais pode dizer "compre" ou "venda", porque isso exige registro profissional.

Essa regra não fica só num bilhete colado na mesa (o prompt). Ela é uma trava na porta de saída (o código): mesmo que o atendente se distraia e escreva "compre", o texto é trocado antes de chegar ao cliente.

---

## 🔧 Tecnicamente

### O que é
- A disciplina aplica o que foi visto nas outras matérias em **um único projeto**, do primeiro commit à entrega na nuvem: código da aplicação, observabilidade, FinOps (inclusive para sistemas que consomem LLMs) e deploy automatizado por GitHub Actions.
- O **AI Researcher** é um chatbot especializado em investimentos de bolsa. Foi escolhido porque exercita as duas frentes ao mesmo tempo: agentes que *desenvolvem* o código e um sistema que, ele próprio, *consome* LLMs.
- Regra de negócio em três movimentos: (1) busca na base vetorial (RAG); (2) se o contexto basta, responde citando a base; (3) se não basta, e é o próprio sistema que faz esse julgamento, busca na internet.
- A interface tem um **pipeline de raciocínio**: mostra cada etapa percorrida para responder, inclusive os erros, o que ajuda a entender o que acontece por dentro.
- Três comportamentos de exemplo: "Qual é a receita líquida da Vale no último semestre?" é respondida só pela base; "Qual foi o último fato relevante da Vale?" avisa "Contexto local insuficiente neste turno" e a etapa Search busca na web; "Eu devo comprar a Vale no preço atual?" faz a busca, mas o guardrail bloqueia a recomendação.
- O chat exibe aviso permanente: "Este assistente apresenta informações públicas, não recomendação de investimento". Reflete regra do domínio: no Brasil, recomendar exige certificações e registro na CVM (e junto à Bolsa).
- O **guardrail está no código**, além do system prompt (detalhado na Aula 13). Prompt é instrução, não garantia.
- A ferramenta de desenvolvimento é o Claude (Anthropic), mas a aula frisa que o trabalho serve com Antigravity, Codex ou Kimi: o que permanece é o fundamento, não a ferramenta.
- Observabilidade aparece o tempo todo: Grafana para requisições e latência, e uma segunda ferramenta de observabilidade de LLM apresentada quando o projeto chega à produção.

### Como funciona
- Fluxo do agente (visão da aula): pergunta, busca na base vetorial, julgamento de suficiência, resposta com citação ou complemento pela web, e só então a resposta final.
- No código o fluxo é um grafo LangGraph com os nós `retrieve`, `grade`, `webSearch` e `answer`; `MAX_ITERATIONS = 2` impede o loop infinito (README do repo). Isso é matéria das unidades seguintes.
- Caminho do guardrail no código: o LLM gera o texto, `montarResposta` chama `contemLinguagemRecomendatoria` e, se casar com algum dos padrões, troca o texto inteiro por `RESPOSTA_GUARDRAIL`.
- Quando o contexto não foi suficiente, `montarResposta` acrescenta o aviso "O contexto disponível pode estar incompleto para responder com certeza", igual ao que a aula mostra no terceiro exemplo.
- Toda resposta termina com um bloco `Fontes:` com ticker, período e data-base (corpus) ou título (web), deduplicado por `sourceUrl`.
- A UI mantém o aviso regulatório fixo e o painel do grafo mostra "Contexto local insuficiente neste turno" quando a web entrou (strings conferidas em `chat.html` e `graph-panel.html`).
- Como estudar: tente reproduzir o passo a passo antes de abrir a implementação completa; a prática da aula é explicar os pontos centrais com suas palavras e conferir o que ficou de fora.

### Onde aplicar
- Qualquer assistente em domínio regulado (saúde, jurídico, financeiro): a regra de conformidade precisa de camada determinística, não só de instrução ao modelo.
- Produtos RAG com fallback: separar "a base resolve" de "preciso de fonte externa" e deixar essa decisão visível para o usuário.
- Projetos de portfólio e capstones: escolher um domínio que exercite desenvolvimento assistido por agente e consumo de LLM ao mesmo tempo.
- Interfaces de IA que expõem o raciocínio (etapas, erros) para ganhar confiança e facilitar depuração.

### Vantagens e limites
**Vantagens**
- Base primeiro é mais rápido e mais barato em tokens do que ir sempre à internet.
- Guardrail no código é testável e determinístico; o prompt sozinho pode ser ignorado pelo modelo.
- Pipeline de raciocínio visível torna erros e fallbacks auditáveis pelo usuário e pelo time.
- Projeto único de ponta a ponta mostra o ciclo completo (código, observabilidade, FinOps, deploy).

**Limites**
- Guardrail por padrões (regex) cobre formas conhecidas de recomendação e pode deixar passar paráfrases ou bloquear frases legítimas.
- O julgamento de suficiência é feito por um LLM: erra para os dois lados (web desnecessária ou resposta com contexto fraco).
- Fallback para a web traz fontes de qualidade variável e custo extra de busca.
- O aviso permanente reduz o risco, mas não substitui revisão jurídica do produto.

### 🚫 Armadilhas
- Confiar só no system prompt para uma restrição regulatória: instrução não é garantia.
- Achar que o projeto depende do Claude: a aula é explícita de que o fundamento vale para qualquer ferramenta.
- Tratar "informar" e "recomendar" como sutileza de estilo: é regra do domínio (CVM), não escolha de tom.
- Remover o teste de guardrail para "destravar" o CI: o CLAUDE.md do repo diz que, se ele quebrar, o problema é o comportamento, não o teste.
- Achado: o guardrail do repo age sobre a saída do LLM por padrões de linguagem; a busca (retrieve) acontece normalmente, como a aula descreve, e só o texto final é substituído.

> 💡 Para cada regra de negócio crítica, escreva duas linhas: onde ela é garantida (código, teste) e onde é apenas orientada (prompt). Se a coluna "código" estiver vazia, a regra ainda não existe.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| AI Researcher | Chatbot de investimentos de bolsa que serve de projeto integrador da disciplina. |
| RAG | Recuperação em base vetorial antes de gerar a resposta; primeira fonte do agente. |
| Contexto suficiente | Julgamento (feito pelo sistema) de que o que veio da base basta para responder. |
| Fallback web | Busca na internet quando o contexto local é insuficiente. |
| Pipeline de raciocínio | Painel da interface que mostra cada etapa percorrida, inclusive erros. |
| Guardrail | Trava que impede o sistema de responder pedidos de compra ou venda; vive no código. |
| CVM | Comissão de Valores Mobiliários, reguladora do mercado de capitais e fonte dos dados. |
| Informar, nunca recomendar | Regra de domínio: apresentar informação pública, sem sugerir compra, venda ou manutenção. |
| Walking skeleton | Esqueleto mínimo ponta a ponta que sobe cedo e é incrementado (Aula 7). |

---

## 💻 No código do repo

**Projeto:** [README.md, .claude/CLAUDE.md (seção Domínio), packages/agent/src/answer/format-resposta.ts, apps/web (disclaimer)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)

Aula conceitual: o que há no repo de relevante é o README (arquitetura e demo), a seção de domínio do CLAUDE.md e o guardrail que a Aula 13 detalha. Li os arquivos citados, mas não executei testes nem a aplicação.

**Fluxo**
1. `README.md`: descreve o produto, a arquitetura 100% Google Cloud e o grafo `retrieve, grade, webSearch, answer` com `MAX_ITERATIONS = 2`.
2. `.claude/CLAUDE.md` (seção "Domínio: restrição regulatória"): "O sistema informa, nunca recomenda"; exige citar fonte e período, teste automatizado de "devo comprar X?" e disclaimer permanente.
3. `packages/agent/src/answer/format-resposta.ts`: `PADROES_RECOMENDACAO` (6 regex), `contemLinguagemRecomendatoria`, `RESPOSTA_GUARDRAIL` e `montarResposta`.
4. `packages/agent/src/answer/format-resposta.test.ts`: teste com 5 frases recomendatórias que devem disparar e 3 frases financeiras legítimas que não devem.
5. `packages/agent/src/prompts/answer.ts`: o prompt do nó `answer` também proíbe recomendação (primeira linha de defesa).
6. `apps/web/src/app/chat/chat.html`: faixa fixa com "Este assistente apresenta informações públicas, não recomendação de investimento."
7. `apps/web/src/app/graph/graph-panel/graph-panel.html`: aviso "Contexto local insuficiente neste turno" do pipeline de raciocínio.

**Como rodar**
- `pnpm install` e `pnpm test` (script da raiz, roda os testes via Turborepo); não executei.
- `pnpm --filter @hero/agent run test` para isolar o pacote do guardrail (não executei; o filtro segue o nome do pacote em `packages/agent/package.json`).

**Armadilhas e achados no código**
- Achado: a aula diz que o guardrail "impede responder pedidos de compra ou venda"; no código ele não barra a pergunta, filtra a *resposta* do LLM por regex e a substitui. A busca roda antes, como a aula mostra.
- Achado: a lista de padrões é pequena (6 regex) e mira formas conhecidas ("recomendo", "vale a pena comprar", "compre esta ação"); paráfrases fora dela não são detectadas.
- O CLAUDE.md do repo exige que o teste do guardrail seja mantido e que a UI exiba o disclaimer sempre, sem modal e sem condicional.

---

## 🔗 Para ir além
- [Capstone Project AI Researcher (projeto completo)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)
- [AI Researcher Seed (ponto de partida)](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed)
- [Guardrail no código (format-resposta.ts)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/packages/agent/src/answer/format-resposta.ts)

---

[01 · CLAUDE.md e AI Dev Skills: contexto sempre ligado versus instruções sob demanda](./01-claude-md-and-ai-dev-skills.md) ➡️
