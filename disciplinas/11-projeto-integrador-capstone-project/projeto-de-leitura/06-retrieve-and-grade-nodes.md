# 06 · Os nós retrieve e grade

> **Unidade 2 · Aula 9** · Leitura: ~9 min · Bloco: Unidade 2 · Orquestração cognitiva e APIs

## 🎯 Em uma frase
**retrieve** transforma a pergunta em embedding e busca os 5 documentos mais similares; **grade** classifica, com saída estruturada (`sufficient`, `missingAspects`), se esse contexto responde a pergunta. Os dois são factories que recebem as dependências por parâmetro (**inversão de dependência**), o que os torna testáveis sem rede nem banco.

---

## 👵 Explicando para a vovó

O retrieve é o auxiliar que vai ao arquivo e traz as cinco pastas mais parecidas com o assunto. O grade é o chefe que olha as pastas e diz: 'isso responde ou não?'. Se a pergunta é sobre o motivo de uma queda e as pastas só têm números, a resposta é não, mesmo que as pastas sejam da empresa certa.

E a regra do chefe é só um bilhete escrito: não há mágica, é um prompt interno.

---

## 🔧 Tecnicamente

### O que é
- Agente = partes chamadas **nós**. **retrieve**: pega a pergunta do estado, gera o embedding e consulta o Postgres. Devolve o top-k, **default 5**.
- O nó **não importa nenhum cliente global**: é uma factory que recebe um cliente de embeddings e uma função de busca. A função de busca fica em `db/retrieve-similar.ts`, usando o operador de cosseno do Drizzle; a aula adota a convenção similaridade = 1 menos a distância, mas o repo só usa a distância (`RetrievedDoc` tem apenas `distance`).
- **Inversão de dependência** resolve dois problemas: trocar de fornecedor (Gemini por OpenAI) e testar sem Vertex AI nem banco, com um fake que já devolve valores.
- Padrões de projeto importam mais com agentes: (1) custo, porque quanto menos o agente muda, mais barato; (2) revisão de PR, o gargalo atual. Refatoração tem de ser cirúrgica.
- Skills: ao criar o retrieve, o Claude Code chamou a skill `langgraph-node` (criada antes pelo professor). Sem skill de Drizzle, o agente lê o código da biblioteca. Ler o código continua sendo responsabilidade de quem desenvolve.
- **grade**: recebe `question` e `documents`, usa saída estruturada com schema zod `{ sufficient: boolean, missingAspects: string[] }`. O prompt fica em `prompts/grade.ts`.
- Regra de suficiência: contexto só numérico (indicadores por empresa e trimestre). Pergunta numérica coberta é suficiente; qualitativa (motivo, notícia, fato relevante, guidance, previsão de preço) é insuficiente mesmo com a empresa certa; sem documentos é insuficiente; indicador, empresa ou período ausente também, sem inventar número.
- Calibragem: regra fechada demais manda tudo para a web (mais custo e mais alucinação); aberta demais nunca busca e deixa a resposta incompleta. Varia por projeto.
- Cadeia de pensamentos aqui é um prompt interno que o usuário não vê. Na UI do projeto ela aparece por didática. 'Sem magia, são prompts e mais prompts' (o Claude Code é um harness).

### Como funciona
- 1) Prompt do retrieve: factory em `packages/agent/src/nodes/retrieve.ts` recebendo `embeddings` e `buscar`; função de busca em `db/retrieve-similar.ts`; top-k default 5.
- 2) O nó faz só duas coisas: `embedQuery(question)` e `buscar(embedding, k)`; devolve `{ documents }`.
- 3) O teste unitário injeta um embedding falso e uma busca falsa e roda sem Postgres e sem Vertex. Com `!` no Claude Code, filtre só o teste do retrieve (sem gastar tokens).
- 4) Prompt do grade: nó em `nodes/grade.ts` + prompt em `prompts/grade.ts`, factory recebendo o cliente de LLM por parâmetro.
- 5) O prompt monta primeiro o contexto: sem documentos aparece '(nenhum documento encontrado)'. Depois o system prompt aplica a regra de suficiência.
- 6) Dois testes do grade, segundo a aula: do prompt (sem LLM, verifica se monta o conteúdo certo) e do nó (fake chat model injetado).
- 7) Quando `sufficient` é falso, o fluxo segue para o nó de busca na web usando `missingAspects` (Aulas 10 a 12).

### Onde aplicar
- Qualquer RAG em que a base cobre só parte das perguntas: o grade decide quando recorrer a outra fonte.
- Nós de agente testáveis: factory com dependências por parâmetro, sem import de cliente global.
- Classificação estruturada com zod em vez de texto livre ('sim, parece suficiente') que precisa de parsing.
- Times que usam agente de código e precisam reduzir custo e esforço de revisão com padrões explícitos em skills.

### Vantagens e limites
**Vantagens**
- Nós pequenos e de responsabilidade única são fáceis de ler, testar e trocar.
- Saída estruturada evita texto livre ambíguo na decisão de rota.
- Fakes tornam os testes rápidos, determinísticos e sem custo.
- A regra de suficiência fica num único arquivo de prompt, fácil de calibrar.

**Limites**
- O grade é uma LLM: a decisão de suficiência continua não determinística.
- Uma chamada de LLM a mais por rodada (custo e latência).
- Regra mal calibrada degrada para web demais ou web nunca.
- Fake testa o contrato, não a qualidade real da classificação.

### 🚫 Armadilhas
- Importar o cliente concreto dentro do nó: perde troca de fornecedor e teste sem rede.
- Pedir à LLM resposta em texto livre para decidir suficiência.
- Deixar a pergunta numérica autorizar a LLM a inventar número que não está no contexto.
- Achar que, com agente escrevendo o código, padrão de projeto deixou de importar (a aula diz o contrário).
- Não ler o código gerado pelo agente.

> 💡 Escreva a regra de suficiência como tabela de casos (numérica coberta, qualitativa, vazio, período ausente) e transforme cada linha num caso de teste do prompt antes de mexer na redação.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Nó | Função do grafo que lê o estado e devolve uma atualização. |
| Factory | Função que recebe dependências e devolve o nó. |
| Inversão de dependência | O nó recebe o cliente por parâmetro em vez de importá-lo. |
| Top-k (5) | Quantidade de documentos que o retrieve devolve por padrão. |
| Saída estruturada | Resposta da LLM validada por schema (zod). |
| sufficient | Booleano: o contexto basta para responder. |
| missingAspects | Lista do que falta; vira query da busca web. |
| Skill | Instrução reutilizável que fixa o padrão de código do agente. |
| Harness | As 'rédeas' em volta do modelo: skills e system prompts. |

---

## 💻 No código do repo

**Projeto:** [packages/agent (src/nodes/retrieve.ts, grade.ts, db/retrieve-similar.ts, prompts/grade.ts, prompts/contexto.ts)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src)

Li os dois nós, a função de busca, os dois prompts e o formatador de contexto. Não executei os testes (nodes/retrieve.test.ts, grade.test.ts).

**Fluxo**
1. `nodes/retrieve.ts`: `TOP_K_PADRAO = 5`; `makeRetrieveNode(embeddings, buscar)`; estado `{ question, topK? }`; devolve `{ documents }`. Interface `EmbeddingsClient` só com `embedQuery`.
2. `db/retrieve-similar.ts`: `cosineDistance()` do Drizzle, `orderBy(distance).limit(k)`. `buscarDocumentosSimilares` já consulta corpus e web (evolução da Aula 11) e `combinarResultados` ordena por distância e corta em k.
3. `nodes/grade.ts`: schema zod `gradeResultSchema`; `makeGradeNode(llm)` chama `llm.withStructuredOutput(schema).invoke(gradePrompt(...))` e devolve `{ sufficient, missingAspects, iterations: 1 }`.
4. `prompts/grade.ts`: contexto formatado ou '(nenhum documento encontrado)', pergunta, e a regra: contexto só numérico, qualitativo é sempre insuficiente.
5. `prompts/contexto.ts`: `formatarContexto` rotula docs do corpus como `[TICKER período]` e docs web como `[web: título]`; usado por grade e answer.
6. `apps/api/src/routes/debug-retrieve.ts`: rota `GET /debug/retrieve` que usa `makeRetrieveNode` direto (uso da factory fora do grafo).

**Como rodar**
- `pnpm --filter @hero/agent test` (Vitest; não executei)
- Só o retrieve: `pnpm --filter @hero/agent exec vitest run src/nodes/retrieve.test.ts`
- `pnpm lint`

**Armadilhas e achados no código**
- Achado: o nó grade retorna `iterations: 1` e o grafo soma com um reducer; a aula só explica isso na Aula 12.
- Achado: o prompt do repo não diz 'não invente número' com essas palavras; ele diz que qualitativas são insuficientes mesmo com a empresa certa. A tabela da aula (indicador ausente é insuficiente) é comportamento esperado do modelo, não verificado por teste que eu tenha lido.
- Hipótese (não testada): como o prompt descreve o contexto como 'indicadores financeiros trimestrais, CVM' e manda tratar qualitativas como insuficientes, uma pergunta qualitativa respondida só por documentos web recuperados poderia continuar sendo classificada como insuficiente. A aula (Aula 11) descreve o oposto na segunda pergunta.
- Achado: o `retrieve.ts` aceita `topK` opcional no estado (usado pelo `/debug/retrieve`); a aula fala só em constante 5.
- Achado: o código mistura português e inglês (`buscar`, `makeRetrieveNode`).
- Achado: o repo só tem teste do nó grade (`grade.test.ts`, 3 casos); não há teste do prompt do grade.

---

## 🔗 Para ir além
- [packages/agent (nodes e prompts)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/nodes)
- [Capstone Project AI Researcher](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)
- [AI Researcher Seed](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed)

---

⬅️ [05 · pgvector, embeddings e o script de seed](./05-pgvector-and-seed.md)  ·  [07 · Serper, adapter de busca e fallback web com TTL](./07-serper-and-web-fallback.md) ➡️
