# 11 · Context stitching: ContextBuilder com teto, prioridade e regra de corte por seção

> **Unidade 5 · Aula 2** · Leitura: ~6 min · Bloco: Memória e contexto

## 🎯 Em uma frase
**Context stitching** é montar o prompt a partir de seções (system, resumo, histórico, memórias, mensagem), cada uma com **teto**, **prioridade** e **regra de corte** próprios. Um **ContextBuilder** único centraliza isso para todas as estratégias.

---

## 👵 Explicando para a vovó

É montar a marmita com compartimentos de tamanho fixo: arroz, feijão, salada e sobremesa. Se o feijão passa do compartimento, tira o excesso do feijão, não da sobremesa. E o compartimento é um teto: não precisa encher tudo só porque cabe.

---

## 🔧 Tecnicamente

### O que é
- **Por seção, uma política própria:** o system prompt define o comportamento e é intocável; o resumo existe porque já comprimimos o passado, então cortá-lo às cegas elimina o que a sumarização preservou; o histórico encurta removendo as mais antigas, que é a ordem natural; as memórias já vêm com score e perdem as de menor relevância primeiro.
- **Orçamentos configuráveis** por ambiente (valores de exemplo da aula: resumo ~200, memórias ~300 tokens), porque modelos e custos diferem. Budget é teto, não meta: se sobra espaço, não se enche com informação irrelevante.
- **Um builder único:** se cada estratégia costurasse o contexto do seu jeito, o mesmo pedido teria orçamentos diferentes sem ninguém notar. O builder devolve também um **breakdown por seção**, o que torna o budget auditável (permitido versus efetivo).
- **Paralelo com as ferramentas:** Copilot e outros agentes também selecionam, resumem e priorizam o que continua na janela; no OpsPilot essas decisões ficam explícitas. Isso explica por que uma nova janela se comporta diferente e por que instruções precisam estar persistidas.
- **Prioridade protege a qualidade:** o budget não é só economia; evita que histórico e memórias empurrem a informação atual para um contexto ruidoso.

### Como funciona
- Spec 012 com testes de tetos propositalmente baixos para provar a ordem de corte. A referência mostra a sequência: system (não cortar), resumo (do `conversationId`, protegido), histórico (limitado, mais antigas primeiro), memórias (recall por `userId` e mensagem, menor score primeiro) e, ao final, *fit to budget* por seção e o breakdown.
- Na validação, o autor reaproveita um `conversationId` do script de conversa longa e lê o breakdown: o system fica acima de valores pequenos porque é protegido; histórico e resumo ficam no teto; as memórias usam pouco porque o recall trouxe pouco.
- Um aprendizado de revisão: os nomes das variáveis geradas pelo agente não coincidiam com os imaginados e o teste usaria os defaults sem perceber.

### Onde aplicar
- Qualquer agente com várias fontes de contexto que competem por espaço.
- Ajustar orçamento por modelo, custo ou domínio sem mudar código.

### Vantagens e limites
**Vantagens**
- Política explícita, mensurável e testável.
- Mudança num único ponto vale para todas as estratégias.

**Limites**
- Heurísticas de corte (caracteres por token) são aproximadas.
- Orçamentos mal calibrados podem cortar o que importa.

### 🚫 Armadilhas
- Variáveis de ambiente com nome diferente do que o código lê.
- Tratar o budget como meta a preencher.
- Cortar o system prompt ou o resumo com a mesma regra do histórico.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Context stitching | Costura das fontes do prompt num contexto final |
| ContextBuilder | Ponto único de montagem com orçamento por seção |
| Regra de corte | never, truncate, oldest-first, lowest-score-first |
| Fit to budget | Aplicar teto e regra a cada seção |
| CONTEXT_BUDGET_* | Variáveis de ambiente com o teto de cada seção |

---

## 💻 No código do repo

**Projeto:** [05-gerenciamento-de-contextos (ContextBuilder)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/05-gerenciamento-de-contextos)

Spec 012: buildContext, uma função pura que recebe system, resumo, histórico, memórias e mensagem, aplica tetos e devolve o contexto montado.

**Fluxo**
1. `src/context/context-builder.ts`: `buildContext(input, { budgets, env })` é puro (sem I/O); `resolveSectionBudgets` lê `CONTEXT_BUDGET_SUMMARY` (200), `CONTEXT_BUDGET_HISTORY` (1200; alias legado `CONTEXT_BUDGET_WINDOW`), `CONTEXT_BUDGET_MEMORIES` (300) e `CONTEXT_BUDGET_SYSTEM` (lido, mas ignorado).
2. Regras: system `never`; resumo `truncate` (corta por caracteres); histórico `oldest-first` (remove da mais antiga; se sobrar só uma, trunca o conteúdo); memórias `lowest-score-first` (empate remove a de maior índice) e os sobreviventes voltam à ordem original.
3. Saída: `enrichedMessage` (`Conversation summary:`, `Relevant memories:` e `Current message:`), `history`, `historyMessages`, `recalledMemories` e os textos usados no breakdown.
4. Uso: o nó `contexto` do grafo (U6) chama `buildContext` e as estratégias recebem `built.enrichedMessage` e `built.history`; o system prompt entra pelo `prompt` do `createReactAgent`.
5. `src/context/context-builder.test.ts`: tetos baixos e ordem de corte por seção.

**Como rodar**
- `CONTEXT_BUDGET_HISTORY=400 CONTEXT_BUDGET_MEMORIES=100 npm run dev` e envie um `/chat` com o `conversationId` de uma conversa longa; leia `metrics.contextBreakdown`.
- `npm test` roda os testes do builder junto com a suíte inteira.

**Armadilhas e achados no código**
- As variáveis `CONTEXT_BUDGET_*` não estão no `.env.example`: sem defini-las, valem os defaults (200, 1200, 300).
- O resumo é cortado com `slice(0, orçamento * 4)`: mantém o começo e descarta o fim, que é onde ficam as decisões mais recentes (hipótese de impacto; o código só mostra o corte).
- A mensagem atual é intocável: uma mensagem gigante estoura o orçamento sem corte. As definições de tools e as observações do ReAct ficam fora do orçamento.
- Dos tetos, só o resumo, o histórico e as memórias são aplicados; `CONTEXT_BUDGET_SYSTEM` existe no código mas o system nunca é cortado.

---

## 🔗 Para ir além
- [Snapshot da Unidade 5 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/05-gerenciamento-de-contextos)

---

⬅️ [10 · Contexto como orçamento: medir tokens, podar e sumarizar em rolo](./10-contexto-como-orcamento.md)  ·  [12 · LangGraph no OpsPilot: grafo de produção, roteador estruturado e fallback de modelo](./12-langgraph-roteador-e-fallback.md) ➡️
