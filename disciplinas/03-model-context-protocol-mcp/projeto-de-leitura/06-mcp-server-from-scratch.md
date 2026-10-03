# 06 · Servidor MCP do zero: tools, resources, prompts, testes via MCP Client e Inspector

> **Unidade 4 · Aulas 1 e 2** · Leitura: ~12 min · Bloco: Servidores MCP do zero e sobre APIs legadas

## 🎯 Em uma frase
Construir um **servidor MCP** é registrar capacidades com nome, descrição e schema numa instância de `McpServer`, expô-las por **stdio** e testar por um **cliente MCP** que sobe o servidor como processo. Tools executam, resources dão contexto e prompts guiam o uso, e o mesmo servidor serve testes, Inspector e VS Code.

---

## 👵 Explicando para a vovó

Imagine abrir uma lojinha: primeiro você escreve o teste «se eu pedir o produto X, recebo X» (e ele falha, porque a loja está vazia), depois põe o produto na prateleira com etiqueta de preço e instruções de uso.

Além do produto (tool), você pendura na parede um cartaz explicando como a loja funciona (resource) e deixa pedidos pré-preenchidos no balcão (prompts). O Inspector é você abrindo a loja para um cliente de teste visitar.

---

## 🔧 Tecnicamente

### O que é
- **Projeto focado no protocolo:** uma app que criptografa e descriptografa mensagens com uma chave. A lógica do algoritmo já vem pronta numa camada de serviço; o foco é expô-la por MCP: registro do servidor, definição de tools, validação de entrada e saída, comunicação cliente-servidor, testes e inspeção.
- **Criar o servidor:** uma instância com nome e versão marca a transição de uma aplicação comum para um serviço que fala MCP e pode ser descoberto por frameworks, editores e outras aplicações.
- **Transporte STDIO:** simula um MCP rodando localmente, como pacote ou processo na máquina do cliente. Reforça que MCP não é sinônimo de API web pública.
- **Tool:** nome, descrição, schema de entrada, schema de saída e implementação. Isso é mais rico que um function calling informal: o consumidor recebe uma descrição formal de como usar. O schema tem papel técnico (barrar chamadas inválidas) e semântico (ajudar a IA a usar corretamente).
- **Sucesso e erro:** em erro, retorna-se uma resposta marcada como erro com texto explicando; em sucesso, dois formatos: texto e uma estrutura JSON. Clientes diferentes consomem como preferirem.
- **Resource:** nome, URI, descrição e uma função que devolve conteúdo. Não é tool: não executa ação, devolve contexto. Aqui, uma «nota técnica» do servidor (algoritmo, requisitos da chave, formato de saída). **Resource template** serve para URIs parametrizadas (dinâmicas); a aula não usa.
- **Prompt:** nome, descrição, schema de argumentos e uma função que monta a mensagem (papel de usuário e texto explícito orientando o modelo a chamar a tool). É um atalho operacional que reduz erros de uso.

### Como funciona
- **TDD:** o teste vem antes de cada capacidade e falha de propósito; depois se implementa e vê-se passar. Cada teste é autossuficiente: o de descriptografia produz o próprio cenário, sem depender do anterior.
- **Cliente de teste:** um helper sobe um cliente MCP que inicia o servidor em outro processo por stdio e chama as tools. Você testa a integração real entre cliente e servidor, não funções internas.
- **Inspector:** ferramenta que conecta ao servidor e mostra abas de tools, resources e prompts (as duas últimas só aparecem depois de registradas). Permite chamar tools preenchendo parâmetros, testar chave errada e conteúdo inválido.
- **VS Code:** um arquivo de configuração em `.vscode` (nome, comando e argumentos) faz o editor iniciar o processo, descobrir as tools, carregar os prompts e permitir uso interativo. Escolher o prompt pede os argumentos do schema e o editor monta o texto que leva o modelo a chamar a tool.
- **Um servidor MCP continua sendo software:** organização de arquivos, separação de responsabilidades, testes, validação e tratamento de falhas continuam valendo. O que muda é o protocolo e a forma de expor as capacidades.

### Onde aplicar
- Qualquer capacidade interna (cripto, relatório, consulta) que você queira expor a agentes sem criar uma API pública.
- Prototipar um servidor local e distribuí-lo depois como pacote (ver [tópico 13](./13-publishing-npm-and-verdaccio.md)).

### Vantagens e limites
**Vantagens**
- Contrato explícito (schemas) e testável por um cliente real.
- Mesmo servidor atende testes automatizados, Inspector e editor.
- stdio dispensa infraestrutura e portas de rede.

**Limites**
- No exemplo a lógica de cripto usa salt fixo no código (didático): não é para dados reais.
- Mensagens de erro detalhadas ajudam a depurar, mas a aula nota que em produção se exporia menos ao cliente final.

### 🚫 Armadilhas
- Escrever `console.log` no servidor stdio: a saída padrão é o canal do protocolo (por isso o código usa `console.error`).
- Registrar só tools e esquecer resources e prompts, que dão contexto ao modelo.
- Testes encadeados, em que um depende do resultado do outro.

> 💡 **Dica:** Antes de ligar ao editor, rode `npm run mcp:inspect`: é o jeito mais rápido de ver exatamente o que o seu servidor expõe.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| McpServer | Classe do SDK que representa o servidor e onde se registram tools, resources e prompts |
| registerTool | Registra tool com descrição, inputSchema e outputSchema; retorna content e structuredContent |
| registerResource | Registra contexto de leitura identificado por URI |
| registerPrompt | Registra template de prompt com schema de argumentos |
| StdioServerTransport | Transporte que fala pela entrada e saída padrão do processo |
| isError | Flag no resultado da tool para sinalizar falha |
| MCP Inspector | UI para explorar e chamar tools, resources e prompts de um servidor |

---

## 💻 No código do repo

**Projeto:** [05-mcps-do-zero-template e 05-mcps-do-zero-z](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/05-mcps-do-zero-z)

Servidor `@erickwendel/ciphersuite-mcp` com duas tools (`encrypt_message` e `decrypt_message`), um resource (`encryption://info`) e um prompt (`encrypt_message_prompt`), usando `@modelcontextprotocol/sdk` e Zod. Roda TypeScript direto no Node, sem build.

**Fluxo**
1. `src/service.ts` (igual no template e no -z): `encrypt` deriva a chave com `scryptSync(passphrase, 'mcp-encrypter-salt', 32)`, gera IV de 16 bytes aleatórios, cifra em AES-256-CBC e devolve `<iv hex>:<cifra hex>`; `decrypt` separa pelo `:` e reverte.
2. `src/index.ts` (-z): cria `StdioServerTransport`, faz `server.connect(transport)` e loga em `console.error` (`stdout` é do protocolo); erro fatal sai com código 1.
3. `src/mcp.ts`: `new McpServer({ name: '@erickwendel/ciphersuite-mcp', version: '0.0.1' })`; as tools usam `inputSchema`/`outputSchema` com `zod/v3` e devolvem `content: [{ type: 'text', text }]` mais `structuredContent`; no `catch` devolvem `isError: true` com texto.
4. `registerResource('encryption://info', 'encryption://info', { description }, handler)` devolve `contents` com `uri`, `mimeType: 'text/plain'` e o texto sobre algoritmo, derivação de chave e formato.
5. `registerPrompt('encrypt_message_prompt', { description, argsSchema }, handler)` devolve `messages` com `role: 'user'` pedindo para usar a tool `encrypt_message` com a mensagem e a chave.
6. `tests/helpers.ts`: `createTestClient` monta `StdioClientTransport` executando `node --experimental-strip-types src/index.ts` e conecta um `Client`. `tests/mcp.test.ts` (`node:test`): criptografa (tamanho > 60), faz round-trip de descriptografia, lista o resource e compara o texto exato do prompt.
7. `.vscode/mcp.json` (só no -z): servidor `ciphersuite-mcp` com `command: node` e `args: [--experimental-strip-types, src/index.ts]`. `refs.txt` aponta para a doc do Inspector.

**Como rodar**
- Node 24 (o `engines` pede exatamente `v24.14.0`); `npm install`.
- `npm test`; `npm run mcp:inspect` abre o Inspector (`npx @modelcontextprotocol/inspector node src/index.ts`); `npm start` para o editor usar.
- **Verificado rodando** (Node 22.16 com `--experimental-strip-types`, SDK 1.27.1): os 4 testes passam; `listPrompts` devolve só `encrypt_message_prompt`; descriptografar com chave errada devolve `isError` com «bad decrypt» e um texto malformado devolve «Invalid initialization vector».

**Armadilhas e achados no código**
- O `README.md` lista um prompt `decrypt_message_prompt` e testes de chave errada e de ciphertext malformado que **não existem**: o código tem um único prompt e 4 testes. O README também sugere `npx @erickwendel/ciphersuite-mcp`, pacote que retornou 404 no npm quando consultei.
- No -z, o `package.json` mantém o nome `05-mcps-do-zero-template` e o `test` usa glob sem aspas (`tests/**/*.test.ts`), que depende de como o shell expande.
- Os testes passam o flag `--experimental-strip-types`, mas o `start` e o `mcp:inspect` usam `node src/index.ts` puro; no Node 24 isso funciona porque o strip de tipos já é padrão (hipótese, não rodei em 24).
- A chave derivada usa salt fixo: a mesma passphrase sempre gera a mesma chave; ok para demo, ruim como cripto real.
- Em erro, o servidor devolve o texto do erro do Node ao cliente: bom para depurar, vaza detalhes internos em produção.

**Template versus -z**
O **template** só tem `src/index.ts` chamando `encrypt` e `decrypt` do `service.ts` direto e imprimindo no console: não há MCP, nem `mcp.ts`, nem `tests/`, nem `.vscode`. O **-z** adiciona o servidor, o transporte stdio, os testes e a configuração do VS Code.

---

## 🔗 Para ir além
- [MCP Inspector (refs.txt do projeto)](https://modelcontextprotocol.io/docs/tools/inspector)
- [Indicação 1: What is MCP?](https://modelcontextprotocol.io/docs/getting-started/intro)
- [Código: 05-mcps-do-zero-z](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/05-mcps-do-zero-z)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica)

---

⬅️ [05 · Skills: conhecimento modular carregado sob demanda](./05-agent-skills.md)  ·  [07 · API legada como MCP: não espelhe endpoints, separe camadas](./07-legacy-api-to-mcp-architecture.md) ➡️
