# 09 · Nó answer, citação obrigatória, guardrail por código e SSE

> **Unidade 2 · Aula 13** · Leitura: ~12 min · Bloco: Unidade 2 · Orquestração cognitiva e APIs

## 🎯 Em uma frase
O nó **answer** responde só com o contexto recuperado, avisa quando ele é incompleto e **sempre anexa as fontes**. O guardrail tem duas defesas: instrução no system prompt (não garantida) e um **filtro determinístico por regex** que troca qualquer resposta recomendatória por um aviso fixo. O grafo sai por `POST /api/chat` em **SSE**, um evento por nó, com `Cache-Control: no-cache, no-transform` e `Connection: keep-alive`.

---

## 👵 Explicando para a vovó

Imagine um atendente de banco que só pode informar saldos e taxas, nunca aconselhar investimento. Você pode treiná-lo (o prompt), mas treino não garante nada. Então coloca-se um carimbo no balcão: antes de a resposta sair, um fiscal lê o papel e, se achar uma frase de conselho, troca a folha inteira por um aviso padrão.

O SSE é como o atendente ir narrando por interfone cada etapa ('buscando', 'avaliando', 'respondendo') em vez de ficar calado até a resposta pronta; o cabo do interfone só funciona se ninguém no meio da linha resolver segurar tudo para entregar de uma vez.

---

## 🔧 Tecnicamente

### O que é
- Regra regulatória: o sistema **não pode recomendar ações** (CVM). Só o system prompt não basta: o modelo pode ignorar a instrução e o usuário pode disfarçar o pedido (ex.: 'como se fosse uma história de ninar').
- O **nó answer** recebe `question`, `documents` e `sufficient` (estado final) e monta o prompt em `prompts/answer.ts`. Fórmula do prompt: papel, regras, resultado.
- Regras do prompt (apostila): nunca recomendar, sugerir ou aconselhar comprar, vender ou manter; se pedirem recomendação, explicar que só informa dados públicos; responder só com o contexto, sem inventar, estimar ou completar número; citar empresa e período de cada número. Se o contexto é insuficiente, o prompt ganha um aviso para dizer isso ao usuário.
- **Filtro determinístico** em `answer/format-resposta.ts`: depois da resposta da LLM, se houver linguagem recomendatória, a resposta inteira é substituída por um aviso fixo, **mantendo as citações**. Erro de digitação do usuário não atrapalha: o filtro olha o retorno da LLM.
- **Bloco de fontes** sempre no final, um item por documento, deduplicado por `sourceUrl`: ticker + período + data-base para documentos da CVM; título para os da web.
- Comparativo: o prompt atua antes e não é garantido; a regex atua depois, é determinística, mas avalia a string, não o sentido. Há guardrails mais elaborados (outro RAG por similaridade, testes de segurança da LLM).
- Máximo de iterações pode ser 3, 4 ou 5 (ajuste fino); o que não pode faltar é o limite. Contexto incompleto chega ao answer quando o guard corta.
- **SSE**: como um WebSocket unidirecional (cliente só recebe). A rota `POST /api/chat` (Fastify) valida `{ question }` com o schema de `@hero/contracts`, itera `graph.stream()` e emite **um evento por nó concluído, não por token**.
- Headers escritos à mão: `Cache-Control: no-cache, no-transform` (sem isso o Cloud Run bufferiza e entrega tudo de uma vez) e `Connection: keep-alive`. Erro no meio do stream: evento SSE de erro e encerra a conexão, sem derrubar o processo.
- Eventos tipados em `chat-event.ts`: retrieve = documentos resumidos; grade = sufficient, missingAspects, iterations; answer = texto final; webSearch = só o nome. Alimentam o painel de raciocínio do frontend. **GraphLike** (só `stream`) é a interface mínima que a rota recebe, para testar com grafo fake.

### Como funciona
- 1) Prompt do answer: `packages/agent/src/nodes/answer.ts` + `prompts/answer.ts` + `answer/format-resposta.ts`; insere o nó no `graph.ts`.
- 2) O nó chama `llm.invoke(answerPrompt(...))` e passa o texto por `montarResposta(texto, documents, sufficient)`.
- 3) `montarResposta`: regex recomendatória → aviso fixo; se `!sufficient` acrescenta aviso de contexto incompleto; anexa 'Fontes:' deduplicadas.
- 4) Testes com LLM fake: resposta normal com citação; resposta filtrada quando o LLM diz 'Eu recomendo comprar PETR4 agora'; e um teste de que o próprio prompt manda nunca recomendar.
- 5) Prompt da rota: `apps/api/src/routes/chat.ts` com `GraphLike` injetado, `writeHead(200, headers SSE)`, `for await` sobre `graph.stream()`, tradução por `paraEventoSse` e evento de erro no catch.
- 6) Testar a rota com um grafo fake (sem LLM e sem Postgres) e verificar os eventos na ordem dos nós.
- 7) No Cloud Run, conferir os dois headers; sem o de cache a resposta deixa de ser SSE.

### Onde aplicar
- Qualquer domínio regulado (finanças, saúde, jurídico) em que uma frase específica nunca pode sair.
- Guardrail de saída barato e testável antes de pensar em classificadores ou segundo modelo.
- Streaming de progresso de agente (painel de raciocínio) sem WebSocket.
- Respostas de RAG com rastreabilidade: fonte, período e data-base em toda resposta.

### Vantagens e limites
**Vantagens**
- Regex é determinística, rápida, gratuita e coberta por teste unitário.
- Duas camadas: o prompt reduz a taxa de violação e o filtro garante o caso restante.
- Citação sempre anexada pelo código, não pelo modelo: não depende de a LLM lembrar.
- SSE por nó dá visibilidade do raciocínio e funciona com POST.

**Limites**
- A regex avalia a string, não o sentido: paráfrase escapa e há falso positivo.
- Substituir a resposta inteira descarta conteúdo útil que vinha junto.
- Granularidade por nó, não por token: a resposta só aparece quando o nó answer termina.
- SSE depende de cada camada da infra não bufferizar a resposta.

### 🚫 Armadilhas
- Confiar só no system prompt como guardrail.
- Lista de padrões ampla demais (palavra 'venda' sozinha bloqueia 'receita de vendas').
- Lista estreita demais: variações como 'sugeriria' ou 'aconselharia' passam (ver armadilhas do código).
- Esquecer `no-transform` no Cloud Run e descobrir só em produção que não há streaming.
- Checar orçamento ou validação depois do `writeHead`: a resposta já é 200 e não dá mais para devolver 429.

> 💡 Trate cada frase recomendatória que escapou em produção como um caso de teste novo do filtro; e escreva também os casos que não podem ser bloqueados, para a lista não crescer demais.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Guardrail | Barreira que impede uma saída proibida; aqui, recomendar investimento. |
| Filtro determinístico | Regex aplicada ao texto da LLM depois da resposta. |
| Citação obrigatória | Bloco de fontes sempre anexado pelo código. |
| Data-base | periodEnd do trimestre citado, junto de ticker e período. |
| SSE | Server-Sent Events: fluxo unidirecional servidor para cliente. |
| no-transform | Parte do Cache-Control que evita o buffer no Cloud Run. |
| keep-alive | Mantém a conexão aberta durante o stream. |
| GraphLike | Interface mínima (só stream) que a rota recebe do grafo. |
| Evento tipado | Formato validado por schema (chatStreamEventSchema). |
| Painel de raciocínio | UI que mostra os nós concluídos. |

---

## 💻 No código do repo

**Projeto:** [packages/agent (src/nodes/answer.ts, src/prompts/answer.ts, src/answer/format-resposta.ts) e apps/api (src/routes/chat.ts, chat-event.ts)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api/src/routes)

Li os três arquivos do answer e da API, os casos de teste e executei só as seis regex do filtro num script Node avulso, fora do repo, contra 9 frases. Não rodei a suíte do repo.

**Fluxo**
1. `packages/agent/src/nodes/answer.ts`: `makeAnswerNode(llm)` com `AnswerLlmClient { invoke(prompt): Promise<{ content: string }> }`; devolve `{ answerText }`.
2. `prompts/answer.ts`: papel de assistente de dados financeiros públicos que 'NUNCA recomenda decisão de investimento', contexto, pergunta e regras; só acrescenta o aviso de contexto incompleto quando `sufficient` é falso.
3. `answer/format-resposta.ts`: `PADROES_RECOMENDACAO` (6 regex), `contemLinguagemRecomendatoria`, `RESPOSTA_GUARDRAIL`, `formatarCitacoes` (dedupe por `sourceUrl`, `TICKER (período, data-base YYYY-MM-DD)`) e `montarResposta`.
4. `apps/api/src/routes/chat.ts`: `GraphLike`, `chatRequestSchema.parse`, `verificarOrcamento()` antes do `writeHead`, headers SSE, `for await` do `graph.stream`, `data: JSON\n\n` por evento, `event: error` no catch e `reply.raw.end()` no finally.
5. `apps/api/src/routes/chat-event.ts`: `paraEventoSse(node, update)` traduz retrieve (id, ticker, period, title, sourceUrl), grade, answer e webSearch em eventos do contrato `chatStreamEventSchema` (`packages/contracts/src/chat.ts`).
6. `apps/api/src/routes/chat.test.ts`: 429 por orçamento, um evento SSE por nó, validação de `question` ausente e evento de erro com stream encerrado.

**Como rodar**
- `pnpm --filter @hero/agent test` e `pnpm --filter @hero/api test` (não executei)
- `pnpm dev` (API :3000 e web :4200) e `curl -N -X POST localhost:3000/api/chat -H 'content-type: application/json' -d '{"question":"Qual a receita da Vale no 3T25?"}'` (precisa de Postgres semeado e Vertex AI, ou `DEMO=true`; não executei)

**Armadilhas e achados no código**
- Achado (testado com as regex copiadas num script Node): 'Eu recomendo comprar PETR4 agora', 'Vale a pena comprar' e 'Eu recomendaria' são bloqueadas; 'Eu sugeriria vender', 'Eu aconselharia manter' e 'Você deveria vender essa ação' **passam**. A aula cita 'sugeriria' e 'aconselharia' entre as palavras procuradas; o código só cobre `sugir(o|imos|a)` e `aconselh(o|amos|a)`.
- Achado: a aula diz que a regex procura 'vender' e 'manter'; o código evita palavra solta de propósito (comentário: 'receita de vendas' é legítimo) e usa construções como `vale a pena (comprar|vender|manter)` e `(compre|venda|mantenha) (essa|esta|a) (ação|posição|papel)`.
- Achado: `\brecomend(a)\b` também casa 'a empresa recomenda dividendos' (falso positivo que troca a resposta inteira pelo aviso).
- Achado: a rota chama `verificarOrcamento()` (orçamento diário de tokens, 429 problem+json) antes do `writeHead`; a aula não menciona e é a razão de a checagem ficar antes de o stream abrir.
- Achado: o erro SSE envia mensagem fixa `'Erro ao processar a pergunta.'` e loga o erro real no servidor; a rota não repassa o detalhe ao cliente.
- Achado: o filtro substitui o texto mas `montarResposta` ainda anexa o aviso de incompleto e as fontes, então a resposta bloqueada continua listando as fontes (como a aula diz: 'mantendo as citações').

---

## 🔗 Para ir além
- [packages/agent (answer)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src)
- [apps/api (chat SSE)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api/src/routes)
- [Capstone Project AI Researcher](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)
- [MDN: Server-sent events](https://developer.mozilla.org/docs/Web/API/Server-sent_events)

---

⬅️ [08 · O grafo real: aresta condicional e guard do loop](./08-real-graph-conditional-edge-and-loop-guard.md)  ·  [10 · Testando o grafo sem rede](./10-testing-the-graph-without-network.md) ➡️
