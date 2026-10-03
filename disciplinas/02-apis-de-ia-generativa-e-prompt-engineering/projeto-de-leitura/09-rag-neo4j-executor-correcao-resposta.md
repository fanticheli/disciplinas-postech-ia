# 09 · RAG com Neo4j: executor, autocorreção e resposta analítica

> **Unidade 6 · Aulas 4 e 5** · Leitura: ~13 min · Bloco: RAG, Multimodal e Observabilidade

## 🎯 Em uma frase
O LLM vai errar, então o sistema precisa ser mais inteligente que o modelo: **valida antes de executar** (`EXPLAIN`), **autocorrige** a query usando erro e schema, **limita as tentativas** e termina com uma **resposta analítica** em vez de JSON cru.

---

## 👵 Explicando para a vovó

O assistente do fichário escreve o pedido, mas antes de mandar ele testa se o pedido faz sentido. Se o fichário diz «não entendi», ele relê o erro, reescreve e tenta de novo, mas só algumas vezes, para não ficar a noite inteira nisso.

No fim, em vez de entregar uma pilha de papéis, escreve um resumo em português com os números, uma interpretação e sugestões de próximas perguntas.

---

## 🔧 Tecnicamente

### O que é
- **Executor:** valida a query (`validateQuery` com `EXPLAIN`, que checa se compila sem executar), executa, guarda resultados, trata falhas e controla o loop multi-step. Diferencia três situações: query inválida, query válida sem resultado (ausência de dados) e query válida com resultado.
- **Correction:** recebe a query inválida, o erro do Neo4j, a pergunta original e o schema, e devolve só a query corrigida (structured output, sem explicação longa).
- **Analytical Response:** trata erro primeiro, depois sintetiza (multi-step ou simples) e devolve `answer` e `followUpQuestions`. Não é «curso A + curso B = 7 compras», é a interpretação (correlação entre formação e especialização).
- **Controle determinístico:** limite de tentativas impede loop infinito e gasto indefinido de tokens.

### Como funciona
- Executor: um `executeQuery` com try/catch. Falha de validação ou execução devolve `results` nulo e o erro; resultado vazio devolve array vazio com «no results found» (ausência de dado, não erro de sintaxe).
- Com erro e tentativas restantes (`maxConnectionAttempts` na aula; no repo a chave se chama `maxCorrectionAttempts`, valor 1), marca `needsCorrection: true`, guarda o `validationError` e a `originalQuery` (se ainda não existir). Excedido o limite, para com erro final e `needsCorrection: false`.
- Sucesso multi-step: `handleMultistepProgression` agrega em `subResults`, incrementa `currentStep` e devolve `dbResults` e `needsCorrection: false`; se ainda há passos (`isMultistep` e `currentStep < subQuestions.length`), o grafo volta ao Generator. Sem passos, segue com `subResults` completo para o node analítico. Pergunta simples vai direto ao analítico.
- Correction: em sucesso, `state.query` recebe a nova query, `validationError` some, `needsCorrection` vira false e `correctionAttempts` incrementa; no limite, o fluxo encerra e a resposta analítica recebe o erro (`cypherCorrectionSchema`).
- Resposta analítica: se há `state.error`, `handleErrorResponse` gera mensagem amigável (sem stacktrace nem erro técnico cru). Multi-step: agrega cada subresultado ao seu step, com a subquery executada, num objeto (pergunta original, steps, query e resultado) enviado ao prompt de síntese. Simples: pergunta, query e resultado.
- Banco vazio: se esquecer de rodar o seed, tudo volta «no results found»; valide no Neo4j Browser que existem nodes Course e Student. Copiar a query gerada para o Browser ajuda a diferenciar os três casos.
- Nos testes automatizados, alguns cenários quebram: o Executor marca `needsCorrection`, o Correction gera nova query e o Executor tenta de novo, o que mostra o pipeline resiliente.

### Onde aplicar
- BI conversacional e relatórios dinâmicos.
- Geração de código com validação automática e execução de comandos com retentativa.
- Qualquer loop de LLM com validação: estado controlado, fluxo determinístico, LLM só onde necessário e resposta final estruturada.

### Vantagens e limites
**Vantagens**
- Pipeline resiliente que não quebra no primeiro erro.
- Validar antes de executar evita rodar query quebrada.
- `followUpQuestions` torna o sistema proativo e é design de produto.

**Limites**
- Cada correção é uma chamada extra de LLM e custa tokens.
- O que o `EXPLAIN` valida é a sintaxe, não a segurança nem a intenção da query.
- Mais estados e caminhos para testar e depurar.

### 🚫 Armadilhas
- Retentar sem limite: gasta tokens indefinidamente e pode virar recursão.
- Tratar resultado vazio como erro técnico em vez de ausência de dado.
- Devolver stacktrace ou JSON cru ao usuário final.
- Não tratar o erro antes do sucesso no node analítico.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| validateQuery e EXPLAIN | Checa se a query compila sem executá-la |
| needsCorrection | Flag que direciona o fluxo ao node de correção |
| correctionAttempts | Contador que limita as retentativas |
| subResults | Resultados acumulados de cada step multi-step |
| Cypher Correction | Reescreve a query a partir de query, erro, pergunta e schema |
| Analytical Response | Síntese final humanizada com answer e followUpQuestions |
| Retentativa controlada | Loop com limite que impede gasto infinito |

---

## 💻 No código do repo

**Projeto:** [06-rag-neo4j-students-z (e 06-rag-neo4j-students-template)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms/06-rag-neo4j-students-z)

Analista de vendas em linguagem natural: o LLM planeja a pergunta (decompõe se for complexa), gera Cypher a partir do schema real do grafo, valida e executa no Neo4j, autocorrige erros e redige uma resposta analítica com perguntas de acompanhamento. É RAG sobre grafo, sem embeddings.

**Fluxo**
1. `server.ts`: `POST /sales` (`question`, `minLength: 3`) chama `graph.invoke` e devolve `{ answer, followUpQuestions, query, error }`.
2. `extractQuestionNode` copia a última mensagem para `state.question` (erro se vazia); `queryPlannerNode` usa `prompts/v1/queryAnalyzer.ts` e `QueryAnalysisSchema { complexity, requiresDecomposition, subQuestions, reasoning }` (o limite de 3 subperguntas está só no texto do prompt), iniciando `isMultiStep`, `currentStep: 0`, `subQueries: []`, `subResults: []`.
3. `cypherGeneratorNode`: schema vivo (`neo4jService.getSchema()`), `SALES_CONTEXT` (só `status=paid` conta receita, progresso 0-100) e a pergunta do passo atual geram `CypherQuerySchema { query }`; o prompt tem regras (use `elementId()`, aliases com AS, máx. 3 hops) e 5 exemplos few-shot.
4. `cypherExecutorNode`: `validateQuery` (`EXPLAIN`) e depois `query`; falha com tentativas restantes marca `needsCorrection: true`.
5. `cypherCorrectionNode` + `prompts/v1/cypherCorrection.ts`: recebe query, erro, pergunta e o schema do Neo4j e devolve `{ correctedQuery, explanation }`, incrementa `correctionAttempts` e volta ao executor.
6. Aresta condicional em `graph.ts` após o executor: corrigir, próximo sub-step (cypherGenerator) ou `analyticalResponse`, que escolhe o prompt (erro, sem resultados, síntese multi-step via `getMultiStepSynthesisPrompt` ou simples) e devolve `AnalyticalResponseSchema { answer, followUpQuestions }` no idioma da pergunta.
7. Dados em `data/seedHelpers.ts`: limpa o banco (`MATCH (n) DETACH DELETE n`) e cria `Course`, 20 `Student` via faker, relações `PURCHASED` e `PROGRESS` (só para compras paid).

**Como rodar**
- `npm i` e `cp .env.example .env` (`OPENROUTER_API_KEY`).
- `npm run docker:infra:up` (Neo4j: Browser 7474, Bolt 7687, neo4j/password) e `npm run seed` (usa `--watch`, encerre com Ctrl+C); espere o Neo4j aceitar conexões e o plugin APOC.
- `npm run dev` (porta 4000, dispara uma pergunta de exemplo), `curl -X POST localhost:4000/sales -H 'Content-type: application/json' --data '{"question":"Which courses are commonly bought together?"}'` e `npm run test:e2e`.
- `npm run docker:infra:cleanup` derruba e apaga o storage. As credenciais do Neo4j estão fixas em `config.ts`. Node >=24.10.

**Armadilhas e achados no código**
- Bug no multi-step: o `cypherGeneratorNode` só acumula em `subQueries` quando `state.subQueries?.length` é truthy, mas o planner inicia `subQueries: []` (length 0). Resultado: `subQueries` nunca cresce, o ramo de síntese multi-step do `analyticalResponseNode` (exige `subQueries.length`) nunca roda e a resposta final usa o prompt simples com `state.query` e `dbResults` só do último passo, descartando os anteriores. Além disso `subResults` usa `[...subResults, ...results]` (linhas achatadas), embora o schema declare array de arrays. Conclusão pela leitura do código; não rodei com Neo4j.
- Argumentos invertidos em `handleNoResultsResponse` do -z: `generateStructured(userPrompt, systemPrompt, ...)`, cuja assinatura é (system, user).
- Sem resultados vira «erro»: no caminho simples o executor seta `error: 'No results found'` e o `analyticalResponse` checa `state.error` primeiro, então o ramo «no results» só é alcançado em multi-step cujo último passo volta vazio (aí não há `error`).
- Limite de correção duplicado: a aresta usa `< 1` literal; `config.maxCorrectionAttempts` só vale no executor, e `maxSubQuestions` do config não é usado.
- Segurança do Text-to-Cypher: o LLM gera query executada direto; `EXPLAIN` só valida sintaxe e não impede `DELETE` ou `SET`. Em produção, use usuário Neo4j read-only e allow-list de cláusulas.
- `npm run test` limpa o banco: o `before` chama `seedDatabase()`. Nunca aponte para um Neo4j com dados reais. Os asserts checam forma (`answer` existe, `followUpQuestions` é array) e o primeiro confere nomes de curso; não validam números.
- `prompts/v1/nlpResponse.ts` não é usado por nenhum node; `docker:infra:up` usa `--wait` sem healthcheck no compose; `factory.ts` exporta um objeto `{ graph, llmClient, neo4jService }` e não o grafo compilado (o `langgraph:serve` não foi testado).
- Se o planner falha, o `queryPlannerNode` grava `error` (além de `isMultiStep: false`) e esse `error` nunca é limpo: o grafo ainda gera e executa a query, e o `analyticalResponse` responde com a mensagem de erro. Isso contradiz o fallback «assume simples e tenta uma query» descrito na aula.
- `correctionAttempts` é global e a aresta usa `< 1`: depois de uma correção nenhum passo seguinte pode ser corrigido. Se um passo multi-step falhar nessa situação, o executor devolve `error` sem avançar `currentStep` e a aresta (que só compara `currentStep` com `subQuestions.length`) volta ao `cypherGenerator`, em loop até o limite de recursão do LangGraph. Pela leitura do código; não reproduzi.

**Template versus -z**
O template entrega `graph.ts`, `config.ts`, `server.ts`, `neo4jService.ts`, seed e todos os prompts e schemas (`prompts/v1/*`) prontos; os 6 nodes são esqueletos e o `generateStructured` recebe `(userPrompt, systemPrompt)`, ordem invertida em relação ao -z. O -z implementa os 6 nodes. O `plan.md` (só no template) descreve outro desenho (Vercel AI SDK, cache vetorial com Ollama, 22 passos) que não está implementado; trate como ideia de evolução. O README do template também é de outro projeto.

---

## 🔗 Para ir além
- [Mastering Advanced RAG Techniques (indicação de leitura 1)](https://medium.com/@sahin.samia/mastering-advanced-rag-techniques-a-comprehensive-guide-f0491717998a)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms)

---

⬅️ [08 · RAG com Neo4j: arquitetura, Query Planner e Cypher Generator](./08-rag-neo4j-planner-e-cypher-generator.md)  ·  [10 · Modelos multimodais: documentos, áudio e real-time](./10-modelos-multimodais.md) ➡️
