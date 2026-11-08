# 08 · O grafo real: aresta condicional e guard do loop

> **Unidade 2 · Aula 12** · Leitura: ~8 min · Bloco: Unidade 2 · Orquestração cognitiva e APIs

## 🎯 Em uma frase
O grafo é `START → retrieve → grade`, com uma **aresta condicional** a partir do grade: termina se `sufficient`, termina se `iterations >= MAX_ITERATIONS` (2), senão vai ao `webSearch`, que sempre volta ao `retrieve`. O contador `iterations` vive **dentro do estado** (reducer que soma 1 por passada no grade), sem contador externo.

---

## 👵 Explicando para a vovó

É uma linha de montagem com um fiscal no meio. O fiscal olha a peça: se está boa, vai para a saída; se não está, volta para a bancada de ajuste e passa de novo. Mas o fiscal tem uma ficha com um contador: depois de duas inspeções, a peça sai de qualquer jeito, para a fábrica não ficar presa para sempre.

O contador vai grudado na peça (o estado), não num caderno separado.

---

## 🔧 Tecnicamente

### O que é
- Os nós retrieve, grade e web search existem soltos; a aula os liga com o **StateGraph** do LangGraph e fecha o loop com uma trava. Sem ela o agente gasta tokens para sempre.
- Regra de negócio = caminho entre nós (arestas). START → retrieve (sempre), retrieve → grade (sempre), grade → END se suficiente ou se `iterations` já atingiu `MAX_ITERATIONS = 2`, caso contrário grade → webSearch, e webSearch → retrieve (sempre).
- O webSearch não termina o grafo nem avalia: volta ao retrieve para buscar de novo e o grade reavalia.
- **Guard do loop**: o campo `iterations` soma 1 a cada passada pelo grade via **reducer**. A aula diz que a 2ª passada pela busca ocorre e que 'na terceira, o guard impede'.
- O prompt exige `GraphDeps` com dependências **por função** (`buscar`, `inserirDocumentoWeb`...), não o cliente de banco, para o grafo inteiro ser testável com fakes (inversão de dependência de novo).
- Testes com `app.stream()` coletando a sequência de nós: caminho direto (suficiente na 1ª rodada), loop completo (insuficiente) e guard cortando exatamente em MAX_ITERATIONS rodadas de grade mesmo com LLM fake sempre insuficiente.
- `graph.ts` tem ~60 linhas: constante, estado (pergunta, documentos, sufficient, missingAspects, iterations), interface de deps, função condicional, função que constrói (`addNode` x3, arestas) e `compile()`.
- Por que ficou simples: **responsabilidade única**. retrieve só busca no RAG, grade só avalia, webSearch só busca na web e adiciona ao RAG.
- O fundamento não muda com a ferramenta: dá para trocar modelo, nuvem, frontend e até LangGraph por ADK; o conceito é nós interligados. Quem domina o código é você.

### Como funciona
- 1) Declare `MAX_ITERATIONS = 2` e o estado com `Annotation.Root`: `iterations` com reducer `(prev, next) => prev + next` e default 0.
- 2) Cada nó devolve só o delta; o grade devolve `iterations: 1` e o reducer acumula.
- 3) Escreva a função condicional pura que lê `sufficient` e `iterations` e devolve o próximo nó.
- 4) `buildGraph(deps)` instancia cada nó com suas dependências, registra com `addNode` e liga com `addEdge`/`addConditionalEdges`; `compile()`.
- 5) Teste com `app.stream()` e compare a lista de nós com a trilha esperada.
- 6) Rode a suíte com `!` no Claude Code (sem gastar token) e passe o lint.
- 7) Na Aula 13 o destino 'fim' vira o nó `answer` (ver armadilhas).

### Onde aplicar
- Qualquer loop de agente (buscar, avaliar, tentar de novo) que precisa de um limite explícito de iterações.
- Orquestração em que cada nó é testável isoladamente e o grafo só decide rotas.
- Migração de framework: nós como funções puras reduzem o custo de trocar o orquestrador.
- Revisão de agentes de terceiros: perguntar onde está o guard do loop.

### Vantagens e limites
**Vantagens**
- Contador no estado viaja com a execução e é testável sem estado global.
- Roteamento fica em uma função pura de poucas linhas.
- Nós de responsabilidade única mantêm o grafo legível mesmo sem conhecer LangGraph.
- Deps por função permitem testar o grafo todo sem rede.

**Limites**
- O limite (2, 3, 4, 5) é ajuste fino: baixo demais responde com contexto incompleto.
- Cada volta custa uma LLM (grade) e uma busca web.
- Reducer somando exige que só um nó incremente, senão o contador conta errado.
- Acoplamento ao LangGraph nos nomes de canais e nós (ex.: nó e estado não podem ter o mesmo nome).

### 🚫 Armadilhas
- Loop sem limite: o agente queima tokens e pode nunca responder.
- Contador fora do estado (variável global ou closure): quebra em execuções concorrentes.
- Esquecer que o webSearch tem de voltar ao retrieve: sem isso o que foi gravado nunca é lido.
- Passar o cliente de banco direto para o grafo em vez de funções: teste exige Postgres.
- Confundir 'guard cortou' com 'contexto suficiente': a resposta final precisa saber a diferença.

> 💡 Teste o guard com um LLM fake que sempre devolve insuficiente e assegure o número exato de passadas no grade; é o teste que impede alguém de remover a trava.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| StateGraph | Grafo do LangGraph cujo estado passa de nó em nó. |
| Aresta condicional | Aresta cujo destino é decidido por uma função sobre o estado. |
| MAX_ITERATIONS | Limite de rodadas de grade; vale 2 no projeto. |
| Reducer | Função que combina o valor antigo com o novo de um campo do estado. |
| iterations | Contador no estado; soma 1 por passada no grade. |
| GraphDeps | Interface com as dependências dos nós, por função. |
| START / END | Marcadores de entrada e saída do grafo. |
| Responsabilidade única | Cada nó faz uma coisa só. |
| compile() | Fecha a definição e devolve o grafo executável. |

---

## 💻 No código do repo

**Projeto:** [packages/agent (src/graph.ts, src/graph-deps.ts, src/graph.test.ts)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src)

Li graph.ts (84 linhas no total), graph-deps.ts e os casos de graph.test.ts. Não executei os testes.

**Fluxo**
1. `graph.ts`: `export const MAX_ITERATIONS = 2` e `ResearchState = Annotation.Root({ question, documents, sufficient, missingAspects, iterations, answerText })`.
2. `iterations` usa `reducer: (prev, next) => prev + next` com default 0; `documents`, `sufficient`, `missingAspects` e `answerText` usam `(_prev, next) => next`; `question` não tem reducer.
3. `proximoNo(state)`: devolve `'answer'` se `sufficient`, `'answer'` se `iterations >= MAX_ITERATIONS`, senão `'webSearch'`.
4. `buildGraph(deps)`: `addNode` para `retrieve`, `grade`, `webSearch`, `answer`; arestas START→retrieve, retrieve→grade, grade→(condicional), webSearch→retrieve, answer→END; `compile()`.
5. `GraphDeps`: `embeddings, buscar, gradeLlm, searchProvider, buscarPagina, inserirDocumentoWeb, answerLlm` (sete dependências, todas por função ou interface mínima).
6. `graph-deps.ts`: `criarGraphDepsPadrao()` liga os clientes reais (ou fixtures com `DEMO=true`) e é usado pela API e pelo servidor MCP.
7. `graph.test.ts`: casos do caminho direto, do loop, do guard por `MAX_ITERATIONS`, do estado final e da degradação graciosa com o provider fora do ar.

**Como rodar**
- `pnpm --filter @hero/agent exec vitest run src/graph.test.ts` (não executei)
- `pnpm lint`

**Armadilhas e achados no código**
- Achado: no repo final a aresta condicional termina em `answer`, não em END, nos dois casos (suficiente ou guard). A aula da Aula 12 descreve END; o nó answer só entra na Aula 13.
- Achado: a aula diz que na terceira passada o guard impede a busca; no código o trace com LLM sempre insuficiente é `retrieve, grade, webSearch, retrieve, grade, answer`: duas rodadas de grade e **uma única** busca web. O teste `não entra em laço infinito` confirma que as rodadas de grade são exatamente `MAX_ITERATIONS`.
- Achado: o campo da resposta se chama `answerText` porque LangGraph não deixa nó e canal de estado compartilharem o nome `answer` (comentário no código).
- Achado: `graph.ts` tem 84 linhas contra as '~60' da aula (já inclui o nó answer).
- Achado: o `webSearch` engole falha do provider e o grafo chega ao answer com aviso de contexto incompleto (teste de degradação graciosa).

---

## 🔗 Para ir além
- [packages/agent/src/graph.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src)
- [LangGraph JS](https://langchain-ai.github.io/langgraphjs)
- [Capstone Project AI Researcher](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)

---

⬅️ [07 · Serper, adapter de busca e fallback web com TTL](./07-serper-and-web-fallback.md)  ·  [09 · Nó answer, citação obrigatória, guardrail por código e SSE](./09-answer-node-citation-guardrail-and-sse.md) ➡️
