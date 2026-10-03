# 15 · Agente LangChain.js consumindo o Customers MCP publicado

> **Unidade 8 · Aula 1** · Leitura: ~11 min · Bloco: Produção: publicação, transports e consumo

## 🎯 Em uma frase
Fechamento do módulo: o **Customers MCP Server** publicado entra num agente **LangChain.js** como mais um conjunto de tools, ao lado do File System. O prompt é genérico, o grafo tem um único nó e o agente decide, em linguagem natural, criar, listar e remover clientes e salvar dados em arquivo, reaproveitando o **service token**.

---

## 👵 Explicando para a vovó

Depois de construir, proteger e embalar a recepção do prédio, agora ela trabalha para valer: você diz «cadastre três clientes de teste, anote-os numa folha e me mostre a lista», e ela encadeia sozinha as ações.

O detalhe é que ela não lembra do que foi dito antes (sem memória): se você perguntar «qual o id daquele cliente?» sem repetir o contexto, ela pode se perder.

---

## 🔧 Tecnicamente

### O que é
- **Objetivo:** usar o MCP publicado como peça real de uma aplicação com LangChain.js, como qualquer servidor MCP disponível via NPM: entender a solicitação, decidir quando usar o MCP de clientes, executar operações, combinar com outras tools e devolver resposta coerente.
- **Reaproveitamento:** o Customers MCP já publicado, a autenticação por service token, a integração com LangChain.js, a estratégia de tools via MCP e a organização dos projetos anteriores.
- **Estrutura:** um grafo enxuto: a mensagem do usuário vai a um nó que resolve a solicitação com as tools; o prompt orienta o comportamento geral e entrega um conjunto de capacidades, em vez de um fluxo imperativo.
- **Prompt intencionalmente genérico:** se a intenção é sobre clientes, use as tools de clientes; senão, pode recorrer às demais ferramentas.
- **Múltiplos MCPs:** File System e Customers MCP ao mesmo tempo; o agente não fica preso a uma integração.
- **Consumo via NPM:** o MCP de clientes deixa de ser código-fonte local e passa a ser pacote publicado; a configuração aponta o pacote e fornece as variáveis de ambiente, em especial o **service token**, obrigatório para autenticar as chamadas na API protegida.

### Como funciona
- **Demonstração:** «criar três clientes de teste, salvá-los em um arquivo e listar os clientes» força o encadeamento: MCP de clientes para criar, File System para salvar, MCP de novo para listar. Também remover todos os clientes, percorrendo a lista.
- **Ergonomia:** um script gera o service token e atualiza o arquivo de ambiente automaticamente, para não copiar token a cada reinício.
- **Limitação mostrada:** sem memória de conversa consolidada, perguntas que dependem do contexto anterior (pedir o id de um cliente recém-criado) podem não funcionar. MCP resolve a integração; a experiência completa ainda depende de histórico, memória, desenho do grafo e persistência de contexto.
- **Ganho arquitetural:** a inteligência do sistema não precisa conhecer a API original, só as ações que o MCP decidiu expor: desacoplamento, camada reutilizável, versionada e protegida. É a ideia do MCP como ponte de modernização, não substituição do legado.
- **Revisão final da disciplina:** reúne evolução de function calling para MCP, pipeline com MCPs e tools, instructions, agents e skills, servidor do zero, legado como MCP, JWT, RBAC, service tokens, rate limiting, publicação, transports e consumo por agente.

### Onde aplicar
- Qualquer agente que precise operar um sistema da empresa por meio de um MCP interno publicado.
- Combinar capacidades de origens diferentes (cadastro, arquivos, banco) num único prompt genérico.

### Vantagens e limites
**Vantagens**
- Reaproveitamento: o mesmo MCP serve editor e aplicação.
- Pouco código imperativo: o prompt e as tools definem o comportamento.

**Limites**
- Sem memória, interações encadeadas por contexto falham.
- Autonomia com tools de escrita (remover clientes) exige permissões e limites bem definidos.

### 🚫 Armadilhas
- Dar ao agente um token `admin` quando só leitura bastaria.
- Esperar continuidade de conversa sem implementar memória.
- Apontar para o nome de pacote errado: o código deste projeto usa `@erickwendel/ew-customers-mcp`, e o projeto do [tópico 13](./13-publishing-npm-and-verdaccio.md) publica `@erickwendel/customers-mcp`.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| onInitialized | Callback do MultiServerMCPClient quando um servidor conecta |
| onConnectionError | Callback de falha de conexão com um servidor MCP |
| Prompt genérico | Prompt amplo que deixa o agente escolher entre capacidades |
| Service token no env | Credencial passada ao MCP por variável de ambiente |
| Memória de conversa | Histórico persistido entre interações: ausente neste projeto |

---

## 💻 No código do repo

**Projeto:** [09-using-mcp-with-langchain](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/09-using-mcp-with-langchain)

Dois projetos: `01-multiple-mcp-tools-z` (a aplicação LangGraph com um nó agente) e `nodejs-fastify-mongodb-crud-z` (a mesma API protegida do 07, idêntica byte a byte, verificado com `diff`).

**Fluxo**
1. `src/tools/customersTool.ts`: lança erro se `SERVICE_TOKEN` não existir; devolve o servidor `customers-mcp` via `stdio`, `command: npx`, `args: ['-y', '@erickwendel/ew-customers-mcp@latest']`, com `env.SERVICE_TOKEN`. Há uma linha comentada para um registry local.
2. `src/tools/fsTool.ts`: servidor `filesystem` com diretório permitido `${process.cwd()}/data` (diferente do projeto 01, que abre a raiz inteira).
3. `src/services/mcpService.ts`: `MultiServerMCPClient` com os dois servidores e callbacks `onMessage`, `onInitialized` e `onConnectionError` (este faz `process.exit(1)`).
4. `src/graph/graph.ts`: um único nó `agent`; `START → agent` e aresta condicional `state.error ? 'agent' : END`.
5. `src/graph/nodes/agentNode.ts`: lê a última mensagem (`state.messages.at(-1)!.text`), chama `generateStructured(systemPrompt, pergunta)` sem schema (modo agente com tools) e devolve `answer` e `messages`.
6. `src/prompts/v1/agentNode.ts`: system prompt para «responder perguntas gerais e gerenciar clientes por tools», com regras: responder no idioma do usuário, salvar arquivos em JSON válido (array de objetos), não pedir confirmação para criar clientes, e em falha de tool reportar o erro e tentar uma vez mais.
7. `src/index.ts`: pergunta fixa «Crie 3 clientes de teste usando as tools de customer, depois guarde estes clientes em ./data/users.json, em seguida, liste os clientes cadastrados também pela tool de customers.»; `data/users.json` traz um exemplo de saída.
8. `getServiceToken.sh`: emite um service token de admin via `curl` e `jq` e grava `SERVICE_TOKEN` no `.env` com `sed`.

**Como rodar**
- API: `cd nodejs-fastify-mongodb-crud-z`, `npm ci`, `docker-compose up -d mongodb`, `npm start`.
- Agente: `cd 01-multiple-mcp-tools-z`, `npm i`, `cp .env.example .env` (`OPENROUTER_API_KEY`), `bash getServiceToken.sh`, `npm start`. O resultado vai para `data/users.json`.
- Não executei o agente (sem chave do OpenRouter): a análise é de leitura do código, e a API foi verificada separadamente no [tópico 09](./09-jwt-and-rbac.md).

**Armadilhas e achados no código**
- **Verificado:** o `getServiceToken.sh` usa `sed -i ''` (sintaxe do macOS/BSD); no Linux com GNU sed isso falha com «sed: can't read s|^SERVICE_TOKEN=...: No such file or directory» e o `.env` não é atualizado quando já tem a variável. Exige também `jq`.
- A aresta condicional `state.error ? 'agent' : END` reexecuta o nó enquanto houver erro e não há contador de tentativas próprio (o limite «tente uma vez» está só no prompt). O freio é o `recursionLimit` do LangGraph, que no pacote `@langchain/langgraph` 1.2.0 vale 25 por padrão (verificado no código do pacote) e termina com erro de recursão. Pior: na repetição, `state.messages.at(-1)` já é a mensagem de desculpas do nó anterior, então o modelo recebe o pedido de desculpas como se fosse a pergunta do usuário (leitura do código, não executei).
- O system prompt fala em intents `customer_operations` e `general_question`, mas o grafo não tem nó de intenção: o campo `intent` nunca é preenchido, instrução morta herdada do projeto 01.
- `package.json` define scripts `docker:infra:*` sem haver `docker-compose.yaml` nesta pasta (o compose da API está no projeto vizinho), e mantém nome e descrição do projeto do Google Trends; `.env.example` tem `LANGCHAIN_PROJECT=transforming-services-into-tools`.
- O pacote consumido é `@erickwendel/ew-customers-mcp@latest`, não o `@erickwendel/customers-mcp` publicado na aula anterior: confira qual versão o `npx` está de fato baixando (`latest` muda sem aviso).
- O estado carrega `fileType`, `fileContent` e `fileName` sem uso, resto do projeto 01.
- Sem memória de conversa, como a própria aula mostra: cada `invoke` parte de um histórico novo.

**Template versus -z**
Aqui só existe a versão resolvida (`-z`); o projeto 01 serviu de base (mesmo `openRouterService`, com callbacks de log e `import type` nos tipos).

---

## 🔗 Para ir além
- [Indicação 2: MCP na documentação do LangChain.js](https://docs.langchain.com/oss/javascript/langchain/mcp)
- [Código: 09-using-mcp-with-langchain](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/09-using-mcp-with-langchain)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica)

---

⬅️ [14 · Transports: STDIO, HTTP, streaming e SSE, e ideias para o próximo servidor](./14-transports-and-next-steps.md)
