# 10 · Testando o grafo sem rede

> **Unidade 3 · Aula 14** · Leitura: ~9 min · Bloco: Unidade 3 · Qualidade, resiliência e MCP

## 🎯 Em uma frase
Uma LLM não é idempotente, então nos testes ela entra como **dependência injetada** e é trocada por **fakes**. Cada tipo de código ganha sua estratégia: fake para nós e grafo, teste padrão para regex e formatação, **fixture em arquivo** para o parser da CVM e **DEMO=true** para não gastar o Serper em demos e QA.

---

## 👵 Explicando para a vovó

Imagine treinar um jogador de xadrez com um adversário que muda de humor a cada partida. Para saber se o seu treino funciona, você não joga contra ele: usa um boneco que responde sempre igual. É isso que um fake faz no lugar da LLM.

Já para checar se uma máquina lê bem as notas fiscais antigas, você guarda uma nota fiscal de verdade, com os borrões de sempre, numa gaveta e passa a mesma nota toda vez. Essa é a fixture em arquivo.

---

## 🔧 Tecnicamente

### O que é
- **Problema:** teste automatizado deve dar o mesmo resultado sempre; a LLM é não determinística. O harness (skills e guardrails) reduz o risco, mas ele sempre existe.
- **Tese da aula:** nos testes a LLM é uma API de terceiro, porque literalmente é uma, e não há garantia de resposta idêntica.
- **O que viabiliza o teste é a estrutura do código:** com inversão de dependência, as dependências dos nós entram por parâmetro e são trocadas no teste: `fakeChatModel` simula a LLM, um mock do cliente de embeddings devolve o retorno esperado e um mock do search provider substitui o Serper.
- **Código determinístico tem teste padrão:** o guardrail principal é uma expressão regular e a formatação é um conjunto de funções puras. Entrada (inclusive um documento da CVM simulado) e `expect` contra a saída.
- **Fixture em arquivo:** os CSVs da CVM vêm em ISO-8859-1, não UTF-8. O teste lê um CSV com bytes latin1 reais a cada execução, não uma string reescrita em UTF-8. Garante decodificação de acento e leitura correta do cabeçalho (usado como chave de cada campo).
- **select-quarters.ts** é o arquivo mais frágil do coletor: posição de conta por setor, fallback consolidado/individual, versão retificada, subtração YTD do 4º trimestre e matemática de data com ano bissexto. O prompt pede exportar só o necessário para testar funções puras, sem mudar comportamento.
- **Casos citados:** versão retificada escolhida pela maior numericamente (não lexicograficamente), `undefined` quando o dado não aparece, consolidado vazio ou ausente, escala da unidade e subtração.
- **Modo demo:** teste unitário do provider é uma coisa; QA, teste funcional e manual rodam o sistema de ponta a ponta e precisam de busca. Serper é integração cara. Solução: `DEMO=true` liga fixtures para SearchProvider e fetch de página, cobrindo Vale, Petrobras e Klabin (grupo B do `evals/dataset.json`).
- **Regras do demo no prompt:** casa por substring do ticker ou nome da empresa na query; pergunta sem fixture cai numa fixture genérica e nunca lança erro; flag lida em um único lugar por dependência; o provider real e o fetch real não sabem que o demo existe; escopo só busca web (a aula diz que grade, answer e embeddings seguem na Vertex AI).
- **Refatoração exigida pela flag:** antes a busca de página usava a implementação padrão e os testes usavam spies/stubs (troca em memória). Para flag em runtime, a busca de página virou dependência por parâmetro. Inversão de dependência não é regra universal: refatore quando a necessidade aparecer.

### Como funciona
- Classifique o código: depende de LLM/embeddings/busca (fake injetado), é função pura (teste padrão), lê arquivo externo sujo (fixture em arquivo), integra serviço caro (flag de demo).
- Nos nós, receba as dependências por parâmetro (`makeWebSearchNode(searchProvider, embeddings, buscarPagina, inserirDocumentoWeb)`) e no teste passe `vi.fn()` ou objetos mínimos.
- Para o parser CSV, crie o arquivo de teste em bytes latin1 reais (abrir no VS Code mostra caracteres estranhos, de propósito) e leia-o a cada execução; asserte acento e chave de cabeçalho.
- Para `select-quarters.ts`, peça ao Claude Code testes das funções puras e exporte só o necessário, sem mudar comportamento.
- Para o demo, crie fixtures de SearchProvider e de fetch de página, com casamento por substring e fallback genérico, ligadas por `DEMO=true`.
- Leia a flag num ponto por dependência: uma função verifica a variável de ambiente e a função que cria o search provider devolve o fake quando ligada; o resto segue igual com Serper ou Google Custom Search.
- Documente a flag no `.env.example` (versionável, só exemplos) junto das demais variáveis.
- Ajuste os testes antigos para a nova dependência injetada (buscar página por parâmetro).

### Onde aplicar
- Qualquer app com LLM: trate o modelo como API externa e injete-o para testar o fluxo sem depender da resposta.
- Pipelines de ingestão com arquivos legados (encoding, cabeçalho variável): fixture em binário real em vez de string reescrita.
- Integração paga ou com cota (busca, OCR, e-mail): flag de demo com fixtures para QA, demos gravadas e E2E no CI.
- Regras de limpeza de dados com muitas exceções (retificações, escalas, fallbacks): testes unitários de funções puras documentando cada caso.

### Vantagens e limites
**Vantagens**
- Testes rápidos, determinísticos e sem custo de token ou de serviço de terceiro.
- Cada estratégia casa com o tipo de código, evitando mock onde basta teste padrão.
- Fixture binária pega bug de encoding que string em UTF-8 esconderia.
- Demo reproduzível: grava demonstração sem depender do Serper estar no ar.

**Limites**
- Fake não prova qualidade da resposta real da LLM; isso exige eval, não teste unitário.
- Fixtures de demo ficam desatualizadas e o dado não é 100% correto (a própria aula admite).
- Injetar tudo por parâmetro aumenta a superfície de wiring; a aula alerta que não é obrigatório em tudo.
- Flag de demo é caminho paralelo de código: precisa ficar isolada para não vazar para produção.

### 🚫 Armadilhas
- Testar o parser com string escrita em UTF-8: o bug de latin1 nunca aparece.
- Spy/stub em memória para algo que precisa trocar em runtime (flag): exige refatorar para injeção.
- Fixture de demo que lança erro para pergunta desconhecida: a aula exige fallback genérico.
- Espalhar a leitura de `DEMO` pelo código em vez de um ponto por dependência.
- Código: o repo final usa DEMO=true também para embeddings, grade e answer, indo além do escopo descrito na aula.

> 💡 Antes de escrever um mock, pergunte se a função é pura. Se for, teste padrão; mock é para a fronteira com o mundo externo.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Idempotência da LLM | Mesmo prompt pode gerar saídas diferentes; não dá para garantir resposta igual. |
| Inversão de dependência | Dependências entram por parâmetro, o que permite trocá-las no teste. |
| fakeChatModel | Função de teste que simula a resposta da LLM. |
| Fixture em arquivo | Arquivo fake lido a cada execução, aqui um CSV com bytes latin1 reais. |
| ISO-8859-1 (latin1) | Encoding dos CSVs da CVM, diferente de UTF-8. |
| select-quarters.ts | Arquivo mais frágil do coletor: regras de limpeza de dado por trimestre. |
| Versão retificada | A CVM republica dados com número de versão; vale a maior numericamente. |
| DEMO=true | Feature flag que troca a busca web por um mini Serper fake. |
| Fixture genérica | Resposta padrão do demo para pergunta sem fixture cadastrada, nunca lança erro. |
| Spy/stub | Troca de comportamento em memória durante o teste, insuficiente para flag em runtime. |

---

## 💻 No código do repo

**Projeto:** [packages/agent (graph, nodes, search, web-search) e packages/corpus/src/collect](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src)

Li os arquivos citados no repo full (main). Não executei os testes. Os nomes em português (criarSearchProvider, comResiliencia, buscarPagina) são os do repo.

**Fluxo**
1. `packages/agent/src/graph.test.ts`: `fakeGradeLlm` e `fakeDeps` montam todas as dependências com `vi.fn()`; `searchProviderFalha` troca o search por `mockRejectedValue`.
2. `packages/agent/src/graph.ts`: `buildGraph(deps: GraphDeps)` recebe embeddings, buscar, gradeLlm, searchProvider, buscarPagina, inserirDocumentoWeb e answerLlm por parâmetro.
3. `packages/agent/src/answer/format-resposta.ts` e `format-resposta.test.ts`: guardrail por lista de regex (`PADROES_RECOMENDACAO`) testado com entrada e saída esperada.
4. `packages/corpus/src/collect/__fixtures__/exemplo-dre.csv`: `file` reporta "ISO-8859 text, with CRLF"; `parse-csv.test.ts` asserta `'Lucro/Prejuízo Consolidado do Período'` e `'ÚLTIMO'`.
5. `packages/corpus/src/collect/parse-csv.ts`: `readFileSync(caminho, 'latin1')`, split por `;`, cabeçalho como chave.
6. `packages/corpus/src/collect/select-quarters.test.ts`: describes para periodEndIso (fevereiro bissexto), valorConta/subtrairValorConta (escala divergente lança erro), escolherMaiorVersao, buscarContaPorDescricao, demonstrativosDaEmpresa (fallback individual, caso Sendas/Assaí).
7. `packages/agent/src/web-search/fixtures.ts`: `FIXTURES` com palavras-chave vale, petrobras, klabin; `encontrarFixture` casa por `toLowerCase().includes()` e cai em `FIXTURE_GENERICA`.
8. `packages/agent/src/search/index.ts` (`criarSearchProvider` devolve a fixture se `DEMO === 'true'`) e `fixtures.ts` (`criarBuscarPagina`): os dois pontos onde o demo aparece para a busca.

**Como rodar**
- `pnpm test` (turbo run test, vitest por pacote), conforme package.json da raiz.
- `pnpm --filter @hero/agent test` e `pnpm --filter @hero/corpus test` para um pacote só (hipótese: filtro padrão do pnpm, não executei).
- `DEMO=true pnpm dev` para o grafo com fixtures; o README do repo diz que DEMO=true roda sem Postgres nem credencial GCP.

**Armadilhas e achados no código**
- Achado: a aula diz que no demo grade, answer e embeddings continuam na Vertex AI; no repo final `llm.ts` devolve `criarGradeLlmDemo()` e `criarAnswerLlmDemo()` com DEMO=true, `embeddings.ts` tem `criarEmbeddingsDemo()` e `graph-deps.ts` usa `criarBuscarDemo()` no lugar do Postgres. Isso foi acrescentado depois (E2E no CI sem banco nem Vertex AI) e o demo hoje é bem maior que só a busca.
- Achado: a aula diz que a versão retificada vale a maior numericamente, e o código usa `Number(VERSAO)`, mas o teste só compara versões '1' e '2', que não provam numérico contra lexicográfico (faltaria '9' contra '10').
- Achado: `process.env.DEMO === 'true'` aparece em `search/index.ts`, `web-search/fixtures.ts` (`criarBuscarPagina`), `llm.ts`, `embeddings.ts` e `graph-deps.ts`: um ponto por dependência, como a aula pede, mas espalhado por cinco arquivos.

---

## 🔗 Para ir além
- [Capstone Project AI Researcher (código completo)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)
- [AI Researcher Seed (ponto de partida)](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed)
- [packages/agent](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent)
- [packages/corpus (coletor CVM)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/corpus)

---

⬅️ [09 · Nó answer, citação obrigatória, guardrail por código e SSE](./09-answer-node-citation-guardrail-and-sse.md)  ·  [11 · Circuit breaker, retry e degradação graciosa](./11-circuit-breaker-retry-and-graceful-degradation.md) ➡️
