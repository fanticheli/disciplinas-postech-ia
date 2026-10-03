# 03 · Pipeline condicional, node de fallback e testes automatizados

> **Unidade 2 · Aulas 4 e 5** · Leitura: ~9 min · Bloco: LangGraph e Saída Estruturada

## 🎯 Em uma frase
Um fluxo condicional só é aceitável quando **todo caminho tem destino**: o node de **fallback** dá comportamento definido ao inesperado, e testes automatizados com `inject` garantem os três caminhos sem LLM, sem rede e sem flakiness.

---

## 👵 Explicando para a vovó

Se a recepcionista só soubesse mandar para a mesa A ou B, o primeiro visitante com um pedido estranho ficaria parado no corredor. A mesa C, com uma resposta educada, garante que ninguém trave.

O mesmo vale para o grafo: o caminho feliz é a demonstração, o comportamento para o inesperado é o produto.

---

## 🔧 Tecnicamente

### O que é
- **addConditionalEdges:** logo depois do `identifyIntent`, uma função recebe o estado e devolve o nome do próximo node (um switch sobre `command`): uppercase, lowercase ou o caminho de fallback.
- **Node de fallback:** preenche o output com uma mensagem de orientação estável (ela vira o contrato do caso unknown) e segue para `chatResponse`. Em aplicação real é onde entraria pedir mais contexto ou usar um classificador.
- **Três caminhos, mesmo final:** todos passam por `chatResponse` e então `END`, o que padroniza a materialização da resposta.
- **Testes:** um por caminho, validando status 200 e o corpo exato. Determinísticos, rápidos e sem custo, porque nenhum LLM é chamado ainda.

### Como funciona
- Cada node de transformação segue o mesmo padrão: ler estado, processar dado, atualizar estado. Por isso são fáceis de copiar e variar.
- Nomes de nodes são estáveis porque viram o contrato visual do fluxo no Studio.
- O fluxo agora é: START, identifica intenção, decide caminho, executa a transformação e responde. Sem fallback, o grafo poderia ficar sem rota, explodir em runtime ou terminar sem output.
- A mensagem de fallback também vai para o histórico para o Studio mostrar no chat. Há dois padrões possíveis: manter em `messages` só o que será reenviado ao LLM (Human e System) e deixar a AIMessage como resultado de interface, ou persistir a AIMessage com content string. A aula mantém o `output` como string validada pelos testes.
- TDD: o teste nasce falhando contra uma resposta fixa e a implementação avança até passar. Os testes continuam usando `inject`, e a API também pode ser chamada por curl com o header `content-type` JSON.
- No Studio, observe `command`, `messages` e `output` a cada etapa; o mínimo de previsibilidade é o output sempre ter valor no fim.

### Onde aplicar
- Qualquer roteamento por intenção em que o caso desconhecido precisa de resposta definida.
- Trocar depois o `identifyIntent` por um classificador com LLM mantendo o mesmo desenho: estado definido, caminho explícito, fallback e teste.
- Reexecutar a partir de um node no Studio para iterar rápido ao integrar IA e ferramentas externas.

### Vantagens e limites
**Vantagens**
- Comportamento definido para o inesperado separa demonstração de produto.
- Evolução previsível: novos nodes e ramificações sem virar bagunça.
- Testes baratos e confiáveis, porque ainda não há LLM no caminho.

**Limites**
- Roteamento por palavra-chave é frágil: qualquer texto com o gatilho dispara o caminho.
- Persistir ou não a AIMessage no histórico exige escolher um padrão e mantê-lo.
- Mais código de teste para cobrir cada ramo.

### 🚫 Armadilhas
- Criar um conditional edge sem estratégia para o caso desconhecido.
- Esquecer a extensão `.ts` nos imports e quebrar o runtime em modo ES module.
- Adicionar AIMessage de formas diferentes e ver resposta duplicada no Studio.
- Tratar o fluxo condicional como um «if» perdido num controller em vez de parte do desenho do sistema.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| addConditionalEdges | Declara que o próximo node depende do estado |
| Fallback | Node para o caso não reconhecido, garante estado coerente no fim |
| Pipeline explícito | Fluxo desenhado como software, com caminhos visíveis |
| Fastify inject | Teste da API em memória, sem porta nem rede |
| Studio como depurador | Mostra caminho executado e evolução do estado |
| unknown | Valor padrão de command, aciona o fallback |

---

## 💻 No código do repo

**Projeto:** [02-langchain-intro](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms/02-langchain-intro)

Aprende LangGraph do jeito mais barato: um grafo com nós, arestas condicionais e fallback que roteia os comandos uppercase e lowercase sem chamar nenhum LLM, exposto como API Fastify e testado de ponta a ponta. Cobre as aulas 1 a 5 da unidade 2.

**Fluxo**
1. `server.ts` valida `POST /chat` (`question`, `minLength: 5`) e chama `graph.invoke` com uma `HumanMessage`.
2. `nodes/identifyIntentNode.ts` procura `upper` ou `lower` na última mensagem, define `command` e copia o texto para `output`.
3. `graph.ts` usa `addConditionalEdges` a partir de `identifyIntent` com mapa de destinos; o estado é um schema Zod e `messages` usa o reducer `MessagesZodMeta`.
4. `upperCaseNode`, `lowerCaseNode` e `fallbackNode` transformam o `output`; os três convergem em `chatResponseNode`, que empacota num `AIMessage`, e depois `END`.
5. `factory.ts` exporta o grafo apontado pelo `langgraph.json` para o Studio.
6. `tests/router.e2e.test.ts`: 3 testes (upper, lower, unknown) com `app.inject` comparando o corpo exato.

**Como rodar**
- `npm i` e `cp .env.example .env` (só variáveis do LangSmith, opcionais: `LANGSMITH_API_KEY`, `LANGCHAIN_TRACING_V2`, `LANGCHAIN_PROJECT`).
- `npm run dev` e `curl localhost:3000/chat --data '{"question": "uppercase this"}' -H "Content-type: application/json"`.
- `npm test` e `npm run langgraph:serve` para abrir o Studio.

**Armadilhas e achados no código**
- A ordem do `includes` importa: `upper` é testado antes de `lower`, então «upper and lower» cai em uppercase.
- O roteamento por palavra-chave é frágil; é exatamente o que o projeto 03 resolve com LLM e schema.
- Os dois últimos testes se chamam «command upper transforms message into ...» (copy e paste); só os nomes estão trocados, a lógica está certa.
- O módulo importa `z` de `zod/v3`; siga o mesmo import para não misturar versões no schema de estado.
- `minLength: 5` rejeita mensagens curtas com 400 do próprio Fastify.
- O `fallbackNode` só preenche `output` (a linha que adicionaria uma `SystemMessage` está comentada); quem coloca a `AIMessage` em `messages` é o `chatResponseNode`. O repo é mais simples do que a aula descreve.
- O handler de erro de `server.ts` faz `return reply.code(500)` sem `.send(...)`, o mesmo problema do projeto 01.
- `langgraph.json` declara `node_version: "20"` (o resto do curso pede Node 24) e o script `langgraph:serve` usa `@langchain/langgraph-cli@latest`, sem fixar versão, ao contrário do que a aula recomenda.

---

## 🔗 Para ir além
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms)

---

⬅️ [02 · LangChain.js e LangGraph: pipes, estado, nodes e edges](./02-langchain-langgraph-estado-nodes-edges.md)  ·  [04 · Structured JSON e JSON Prompts: da linguagem natural à ação](./04-structured-json-e-json-prompts.md) ➡️
