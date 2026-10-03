# 01 · App com múltiplos MCPs: arquitetura em agentes e parsing estruturado da intenção

> **Unidade 2 · Aulas 1 e 2** · Leitura: ~10 min · Bloco: Múltiplos MCPs e tools com LangChain.js

## 🎯 Em uma frase
O projeto da unidade troca fluxo imperativo por **autonomia do modelo**: o usuário manda dados (CSV ou JSON) e uma pergunta num único prompt; o nó **intentParser** transforma isso num objeto estruturado e só então o nó **agent** decide quais tools usar e em que ordem.

---

## 👵 Explicando para a vovó

Imagine um gerente que recebe um pedido bagunçado por mensagem de voz: «quero o ranking dos mais vendidos, segue a planilha». Antes de acionar a equipe, uma recepcionista passa o pedido a limpo numa ficha: o que a pessoa quer, tipo do arquivo, conteúdo e um nome para ele.

Se a ficha não faz sentido, o pedido nem entra. Se faz, o gerente (o agent) escolhe sozinho quais ferramentas pegar. Quem organiza a entrada é uma etapa; quem executa é outra.

---

## 🔧 Tecnicamente

### O que é
- **Objetivo da aplicação:** analisar um relatório de vendas. O usuário envia o conjunto de dados (CSV ou JSON) e faz uma pergunta (ex.: ranking dos produtos mais vendidos) num único prompt; o modelo orquestra o resto.
- **Autonomia do modelo:** o código não define a ordem das ações. Você entrega ferramentas e instruções, e o modelo decide qual ferramenta usar, quando e como encadear.
- **Primeira etapa, a intenção:** extrai o objetivo, o tipo de dado, o conteúdo do arquivo, um nome adequado e o formato. Permite pular etapas por contexto (se já é JSON, não converte).
- **Pipeline descrito na aula:** converter CSV em JSON (se for o caso), salvar em arquivo (opcional), inserir no MongoDB com nome de coleção escolhido pelo modelo, consultar e agregar, e gravar o relatório final em .txt na pasta de relatórios. Isso é descrito em alto nível, não programado passo a passo.
- **Arquitetura em agentes:** um agente entende a intenção, outro executa; entre eles há uma condicional que interrompe o fluxo se a interpretação falhar. Uma camada de serviços agrega os servidores MCP e o serviço principal suporta dois tipos de retorno: JSON estruturado e execução de tools via MCP.
- **Parsing inteligente (aula 2):** um serviço de geração estruturada recebe system prompt, prompt do usuário e um **schema**; o retorno é validado (sem intenção ou tipo de arquivo, o fluxo para) e há **fallback** para o nome do arquivo, derivado do tipo.

### Como funciona
- **Por que o parsing vem primeiro:** qualquer erro na interpretação inicial contamina todo o pipeline. O schema reduz ambiguidade, a validação funciona como barreira e a estrutura final (intenção, conteúdo, nome) simplifica os nós seguintes.
- **Ambiente (aula 2):** valida a versão do Node, restaura dependências, lista os scripts e sobe MongoDB e uma interface visual via Docker. Abordagem incremental: confirmar que os dados chegam ao grafo antes de implementar a lógica.
- **Retentativa:** se o modelo executar algo errado (por exemplo, uma query inválida), ele pode reconsultar o servidor MCP, buscar exemplos de uso, ajustar e tentar de novo.
- **Limite de contexto:** os dados enviados não podem exceder a capacidade do modelo; no desenvolvimento usam-se conjuntos reduzidos e, em produção, é preciso uma estratégia para volumes maiores.
- **Observabilidade:** logs de início e fim das execuções, chamadas de tools, entradas, saídas e tentativas, essenciais para depurar um modelo probabilístico.

### Onde aplicar
- Qualquer fluxo em que a entrada do usuário é texto livre misturado com dados e precisa virar contrato antes de ir para ferramentas.
- Pipelines em que a ordem das ações depende do contexto (pular a conversão quando o dado já é JSON).

### Vantagens e limites
**Vantagens**
- Menos código imperativo: o fluxo é descrito em alto nível.
- Entrada validada por schema antes de qualquer ação com efeito colateral.
- Separação clara entre entender e executar facilita evoluir cada parte.

**Limites**
- O comportamento do modelo é probabilístico: depende de logs e depuração para entender decisões.
- Janela de contexto limita o volume de dados enviados no prompt.

### 🚫 Armadilhas
- Deixar o modelo executar sem validar a intenção extraída: erros se propagam por todo o pipeline.
- Usar o mesmo nó para interpretar e executar: perde a barreira de validação.
- Subir a aplicação sem confirmar antes que MongoDB e demais serviços estão de pé.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| intentParser | Nó que transforma a pergunta bruta em objeto estruturado (intent, fileType, fileContent, fileName) |
| Geração estruturada | Pedir ao modelo uma saída que obedece a um schema (aqui, Zod) |
| Aresta condicional | Decide o próximo nó a partir do estado (erro encerra, sucesso segue para o agent) |
| Orquestração autônoma | O modelo escolhe a ordem e as ferramentas, em vez do código |
| Fallback de nome | Se o modelo não nomeia o arquivo, usa `data.<tipo>` |

---

## 💻 No código do repo

**Projeto:** [01-multiple-mcp-tools-template e 01-multiple-mcp-tools-z (grafo e nó de intenção)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/01-multiple-mcp-tools-z)

Servidor Fastify com `POST /chat` que invoca um grafo LangGraph de dois nós (`intentParser` e `agent`) sobre o OpenRouter, usando `ChatOpenAI` do LangChain. No -z a intenção sai de um schema Zod; as tools do agente estão no [tópico 02](./02-mcp-tools-mongodb-csv-filesystem.md).

**Fluxo**
1. `src/index.ts` sobe o Fastify na porta 3000, lê `data/sales-complete.csv` (a leitura de `sales.csv` fica comentada), monta a pergunta «What's the total revenue from this sales data?» e dispara `app.inject` em `POST /chat`, imprime a resposta e encerra com `process.exit`.
2. `src/server.ts` valida o body (`question` string com `minLength: 10`), chama `graph.invoke({ messages: [new HumanMessage(question)] })` e responde `response.answer ?? última mensagem`.
3. `src/graph/graph.ts` monta o `StateGraph`: `START → intentParser`; aresta condicional (se `state.error` termina em `END`, senão vai para `agent`); `agent → END`.
4. `src/graph/state.ts` define o estado com Zod (`zod/v3`): `messages` (com `MessagesZodMeta`), `answer`, `intent`, `fileContent`, `fileName` e `error`.
5. `src/prompts/v1/identifyIntent.ts` traz o `IntentSchema` (`intent`, `fileContent` e `fileName` anuláveis, `fileType` como enum `csv | json | unknown`) e o system prompt de extração.
6. `src/graph/nodes/intentNode.ts` (no -z) chama `generateStructured` com o schema; sem `intent` ou `fileType` lança erro; aplica `` parsed.fileName ??= `data.${parsed.fileType}` `` e devolve `intent`, `fileContent` e `fileName`. No `catch` devolve `error` e uma mensagem de desculpas.
7. `src/services/openRouterService.ts` cria o `ChatOpenAI` apontando para `https://openrouter.ai/api/v1` (com `models` e `provider` em `modelKwargs`). Com schema, `createAgent` usa `responseFormat: providerStrategy(schema)` e `tools: []`; sem schema, usa as tools MCP.

**Como rodar**
- Node >= 24.10. `npm i` e `cp .env.example .env` (preencha `OPENROUTER_API_KEY`; as variáveis LangSmith são opcionais).
- `npm run docker:infra:up` sobe MongoDB e mongo-express (porta 8081); `npm start` executa a pergunta fixa de `index.ts`; `npm run langgraph:serve` abre o LangGraph Studio.
- Não executei este projeto: ele depende de chave do OpenRouter, que eu não tinha. A leitura abaixo é só do código.

**Armadilhas e achados no código**
- `.env.example` traz `LANGCHAIN_PROJECT=01-multiple-mcp-tools-template` também no -z.
- O código importa `zod/v3`, mas o `package.json` não declara `zod`: ele chega como dependência transitiva (3.25.76 no lock).
- O servidor responde `response.answer ?? ...`, porém o `agentNode` nunca preenche `answer` nesta versão; a resposta sai sempre da última mensagem.
- O `intentNode` valida `fileType` mas não o grava no estado (só em `09-using-mcp-with-langchain` o estado ganha `fileType`).
- O compose do MongoDB expõe o mongo-express com usuário e senha fixos no arquivo: ok para laboratório local, não para qualquer ambiente exposto.
- A apostila admite que modelos gratuitos falham com volumes maiores de dados; o projeto usa `arcee-ai/trinity-large-preview:free` e `maxTokens: 2048`.

**Template versus -z**
O **template** tem a estrutura pronta, mas `intentNode` devolve valores fixos (`intent: ''`, `fileContent: '{}'`, `fileName: 'report.json'`), `agentNode` devolve «Nothing yet!», `getMCPTools` retorna `[]`, a pasta `src/tools` só tem `.gitkeep`; os prompts em `src/prompts/v1` já vêm prontos. O `index.ts` do template usa a pergunta de ranking (top 5) com `sales.csv`. O **-z** acrescenta schema e validação da intenção, o prompt do agent, as três tools e as saídas de exemplo em `reports/`.

---

## 🔗 Para ir além
- [Indicação 2: MCP na documentação do LangChain.js](https://docs.langchain.com/oss/javascript/langchain/mcp)
- [Código: 01-multiple-mcp-tools-z](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/01-multiple-mcp-tools-z)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica)

---

⬅️ [00 · Do plugin e function calling ao MCP: tools, resources, prompts e descoberta](./00-mcp-protocol-overview.md)  ·  [02 · MongoDB MCP, tool customizada e File System MCP: camadas de capacidade do agente](./02-mcp-tools-mongodb-csv-filesystem.md) ➡️
