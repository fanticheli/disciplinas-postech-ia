PRACTICE.push({
 "disc": "03",
 "intro": "Em MCP, a prática é desenhar tools por intenção, montar servidor e cliente, proteger a API (JWT, RBAC, service token, rate limit) e distribuir o pacote. Skills e arquivos de instrução completam o ambiente do agente.",
 "items": [
  {
   "id": "P3-01",
   "title": "Ações no lugar de endpoints (desenho de tools)",
   "topics": [
    "D3-00",
    "D3-07"
   ],
   "cenario": "Uma plataforma de e-commerce com 40 endpoints REST quer um assistente de suporte. Se cada endpoint virar tool, o modelo recebe o catálogo inteiro a cada chamada, gasta tokens e erra a escolha.",
   "passos": [
    "Liste as intenções reais do usuário de suporte (consultar pedido, reembolsar, cancelar).",
    "Agrupe os endpoints por intenção; uma tool chama vários endpoints por dentro.",
    "Dê nome de verbo de negócio (<code>find_order</code>, <code>refund_order</code>), não o path REST.",
    "Descreva cada parâmetro com <code>.describe()</code>: a descrição é o que o modelo lê.",
    "Mova dados de referência (tabela de status, política de reembolso) para um resource.",
    "Meça tokens do catálogo antes e depois."
   ],
   "code": {
    "lang": "text",
    "src": "REST (40 endpoints)             MCP (3 actions)\nGET  /orders?customer=          find_order(customerId | email)\nGET  /orders/:id/items          -> returns order + items in one call\nGET  /orders/:id/shipments\nPOST /orders/:id/refund         refund_order(orderId, reason)\nPOST /orders/:id/cancel         -> admin only, returns confirmation\n\nRules:\n- 1 action = 1 user intent, not 1 endpoint\n- inputs described with .describe()\n- reference data goes in a resource, not in the prompt"
   },
   "resultado": "Catálogo enviado ao modelo cai de dezenas de tools para poucas, com menos tokens por interação e menos escolha errada de ferramenta.",
   "quandoNao": [
    "API já pequena (3 a 5 endpoints) e coesa: o mapeamento 1:1 é aceitável.",
    "Quando o cliente precisa de controle fino endpoint a endpoint (automação determinística, não agente).",
    "Antes de saber quais intenções os usuários realmente têm."
   ],
   "armadilha": "Espelhar a API endpoint por endpoint e perder o valor da abstração.",
   "repo": {
    "label": "modulo03-mcp-na-pratica/06-your-legacy-api-as-mcp",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/06-your-legacy-api-as-mcp"
   }
  },
  {
   "id": "P3-02",
   "title": "Servidor MCP do zero: tool, resource e prompt",
   "topics": [
    "D3-00",
    "D3-06"
   ],
   "cenario": "O time de atendimento quer que o editor consulte tickets internos. Sem um servidor MCP, cada dev cola dados na conversa ou escreve integração própria por ferramenta.",
   "passos": [
    "Crie o <code>McpServer</code> com <code>name</code> e <code>version</code>.",
    "Registre a tool com <code>registerTool</code>, <code>inputSchema</code> em Zod e <code>outputSchema</code>.",
    "Devolva <code>content</code> (texto) e <code>structuredContent</code> (dado tipado).",
    "Registre um resource para contexto estático e um prompt para a tarefa recorrente.",
    "Conecte via <code>StdioServerTransport</code>.",
    "O corpo da tool é simplificado (dado fixo): troque pela chamada real."
   ],
   "code": {
    "lang": "ts",
    "src": "import { McpServer } from \"@modelcontextprotocol/sdk/server/mcp.js\";\nimport { StdioServerTransport } from \"@modelcontextprotocol/sdk/server/stdio.js\";\nimport { z } from \"zod\";\n\nconst server = new McpServer({ name: \"@acme/ticket-mcp\", version: \"0.0.1\" });\n\nserver.registerTool(\n  \"find_ticket\",\n  {\n    description: \"Find a support ticket by id\",\n    inputSchema: { ticketId: z.string().describe(\"Ticket id, e.g. TCK-1042\") },\n    outputSchema: { status: z.string(), title: z.string() },\n  },\n  async ({ ticketId }) => {\n    const ticket = { status: \"open\", title: `Ticket ${ticketId}` };\n    return {\n      content: [{ type: \"text\", text: JSON.stringify(ticket) }],\n      structuredContent: ticket,\n    };\n  },\n);\n\nserver.registerResource(\n  \"ticket-api-info\",\n  \"tickets://api-info\",\n  { description: \"Describes the ticket API wrapped by this server\" },\n  async () => ({\n    contents: [{ uri: \"tickets://api-info\", mimeType: \"text/plain\", text: \"GET /tickets/:id\" }],\n  }),\n);\n\nserver.registerPrompt(\n  \"triage_ticket\",\n  { description: \"Triage a ticket\", argsSchema: { ticketId: z.string() } },\n  ({ ticketId }) => ({\n    messages: [\n      {\n        role: \"user\",\n        content: { type: \"text\", text: `Triage ticket ${ticketId} with find_ticket` },\n      },\n    ],\n  }),\n);\n\nawait server.connect(new StdioServerTransport());"
   },
   "resultado": "Qualquer cliente MCP (editor, agente) descobre e usa as 3 primitivas sem integração específica.",
   "quandoNao": [
    "Quando um script ou uma função simples dentro do próprio app resolve e só um agente o usará.",
    "Para expor dados que mudam a cada segundo sem cache: avalie o custo por chamada.",
    "Se o único consumidor é um modelo que já tem tool nativa equivalente."
   ],
   "armadilha": "Tratar o MCP como sinônimo de tool: ele agrupa tools, resources e prompts.",
   "repo": {
    "label": "modulo03-mcp-na-pratica/05-mcps-do-zero-z",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/05-mcps-do-zero-z"
   }
  },
  {
   "id": "P3-03",
   "title": "Testar o MCP como cliente (MCP Client + Inspector)",
   "topics": [
    "D3-06",
    "D3-08"
   ],
   "cenario": "Um servidor MCP muda de schema e quebra o agente em produção sem ninguém perceber. Testar só chamando funções internas não pega erro de contrato.",
   "passos": [
    "Suba o servidor como processo filho com <code>StdioClientTransport</code>.",
    "Crie um <code>Client</code> e conecte no <code>before</code>; feche no <code>after</code>.",
    "Teste o contrato com <code>listTools</code>.",
    "Teste cada tool com <code>callTool</code> e asserte em <code>structuredContent</code>.",
    "Para exploração manual, use <code>npx @modelcontextprotocol/inspector node src/index.ts</code>.",
    "O runner é o <code>node:test</code>, como no repo."
   ],
   "code": {
    "lang": "ts",
    "src": "import { describe, it, before, after } from \"node:test\";\nimport assert from \"node:assert\";\nimport { Client } from \"@modelcontextprotocol/sdk/client/index.js\";\nimport { StdioClientTransport } from \"@modelcontextprotocol/sdk/client/stdio.js\";\n\ndescribe(\"ticket mcp\", () => {\n  let client: Client;\n\n  before(async () => {\n    const transport = new StdioClientTransport({\n      command: \"node\",\n      args: [\"--experimental-strip-types\", \"src/index.ts\"],\n      env: { ...process.env, SERVICE_TOKEN: \"test-token\" },\n    });\n    client = new Client({ name: \"test-client\", version: \"1.0.0\" }, { capabilities: {} });\n    await client.connect(transport);\n  });\n\n  after(async () => {\n    await client.close();\n  });\n\n  it(\"lists the contract\", async () => {\n    const { tools } = await client.listTools();\n    assert.deepStrictEqual(tools.map((tool) => tool.name).sort(), [\"find_ticket\"]);\n  });\n\n  it(\"returns structured content\", async () => {\n    const result = (await client.callTool({\n      name: \"find_ticket\",\n      arguments: { ticketId: \"TCK-1042\" },\n    })) as unknown as { structuredContent: { status: string } };\n    assert.strictEqual(result.structuredContent.status, \"open\");\n  });\n});"
   },
   "resultado": "Regressão de contrato (tool renomeada, campo removido) falha no CI em vez de aparecer no agente.",
   "quandoNao": [
    "Lógica pura de serviço já coberta por teste unitário rápido.",
    "Protótipo descartável.",
    "Quando e2e depende de API externa instável sem sandbox: use mock no cliente HTTP."
   ],
   "armadilha": "Testar só o serviço interno e nunca o servidor via protocolo.",
   "repo": {
    "label": "modulo03-mcp-na-pratica/05-mcps-do-zero-z/tests",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/05-mcps-do-zero-z/tests"
   }
  },
  {
   "id": "P3-04",
   "title": "Agente LangChain com vários MCPs",
   "topics": [
    "D3-01",
    "D3-02",
    "D3-15"
   ],
   "cenario": "Um analista pede ao agente para listar clientes e salvar em arquivo. Sem MCPs, o time escreve uma integração por ferramenta e mantém tudo à mão.",
   "passos": [
    "Declare cada servidor em <code>mcpServers</code> do <code>MultiServerMCPClient</code> (stdio via <code>npx</code>).",
    "Passe segredos por <code>env</code>, nunca no código.",
    "Trate <code>onConnectionError</code>: falhar cedo é melhor que agente sem tool.",
    "Chame <code>client.getTools()</code> e entregue as tools ao agente (<code>createAgent</code>).",
    "Feche o client ao terminar.",
    "No repo o agente roda dentro de um nó do LangGraph; aqui está reduzido ao núcleo."
   ],
   "code": {
    "lang": "ts",
    "src": "import { MultiServerMCPClient } from \"@langchain/mcp-adapters\";\nimport { ChatOpenAI } from \"@langchain/openai\";\nimport { createAgent } from \"langchain\";\nimport { HumanMessage } from \"@langchain/core/messages\";\n\nconst client = new MultiServerMCPClient({\n  mcpServers: {\n    \"customers-mcp\": {\n      transport: \"stdio\",\n      command: \"npx\",\n      args: [\"-y\", \"@erickwendel/ew-customers-mcp@latest\"],\n      env: { SERVICE_TOKEN: process.env.SERVICE_TOKEN as string },\n    },\n    filesystem: {\n      transport: \"stdio\",\n      command: \"npx\",\n      args: [\"-y\", \"@modelcontextprotocol/server-filesystem\", process.cwd()],\n    },\n  },\n  onConnectionError: (source, error) => {\n    console.error(`MCP server failed to connect: ${source.serverName}`, error);\n    process.exit(1);\n  },\n});\n\nconst tools = await client.getTools();\n\nconst agent = createAgent({\n  model: new ChatOpenAI({ model: \"gpt-4o-mini\", temperature: 0 }),\n  tools,\n});\n\nconst result = await agent.invoke({\n  messages: [new HumanMessage(\"List the customers and save them in customers.json\")],\n});\n\nconsole.log(result.messages.at(-1)?.content);\nawait client.close();"
   },
   "resultado": "Adicionar uma capacidade nova vira uma entrada de configuração, sem código de integração.",
   "quandoNao": [
    "Uma única API simples, onde uma tool LangChain direta basta.",
    "Quando as tools do MCP trazem muito esquema e estouram contexto: filtre as tools.",
    "Ambiente sem Node/npx para subir os processos."
   ],
   "armadilha": "Dar ao agente todas as ferramentas disponíveis em vez do mínimo necessário.",
   "repo": {
    "label": "modulo03-mcp-na-pratica/09-using-mcp-with-langchain/01-multiple-mcp-tools-z",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/09-using-mcp-with-langchain/01-multiple-mcp-tools-z"
   }
  },
  {
   "id": "P3-05",
   "title": "Parsing estruturado da intenção antes do agente",
   "topics": [
    "D3-01"
   ],
   "cenario": "O usuário cola uma instrução misturada com um CSV. Se tudo vai direto ao agente, o dado polui o raciocínio e a tool recebe parâmetro errado.",
   "passos": [
    "Defina o <code>IntentSchema</code> em Zod: intenção limpa, conteúdo bruto, tipo de arquivo.",
    "Use <code>withStructuredOutput</code> do modelo (o repo usa <code>providerStrategy</code> no <code>createAgent</code>).",
    "Um nó <code>intentParser</code> valida e grava no estado.",
    "Aresta condicional: se houver <code>error</code>, termina; senão segue ao agente.",
    "O nó do agente trabalha só com intenção limpa e o dado separado.",
    "O nó do agente aqui é um stub."
   ],
   "code": {
    "lang": "ts",
    "src": "import { StateGraph, START, END } from \"@langchain/langgraph\";\nimport { MessagesZodMeta } from \"@langchain/langgraph\";\nimport { withLangGraph } from \"@langchain/langgraph/zod\";\nimport type { BaseMessage } from \"@langchain/core/messages\";\nimport { ChatOpenAI } from \"@langchain/openai\";\nimport { z } from \"zod/v3\";\n\nexport const IntentSchema = z.object({\n  intent: z.string().describe(\"Goal of the user without any raw data\"),\n  fileContent: z.string().nullable().describe(\"Raw CSV or JSON block, or null\"),\n  fileType: z.enum([\"csv\", \"json\", \"unknown\"]),\n});\n\nconst GraphAnnotation = z.object({\n  messages: withLangGraph(z.custom<BaseMessage[]>(), MessagesZodMeta),\n  intent: z.string().optional(),\n  fileContent: z.string().optional(),\n  error: z.string().optional(),\n});\n\ntype GraphState = z.infer<typeof GraphAnnotation>;\n\nconst parser = new ChatOpenAI({ model: \"gpt-4o-mini\", temperature: 0 })\n  .withStructuredOutput(IntentSchema);\n\nconst intentNode = async (state: GraphState): Promise<Partial<GraphState>> => {\n  try {\n    const raw = String(state.messages.at(-1)?.content ?? \"\");\n    const parsed = await parser.invoke(raw);\n    return { intent: parsed.intent, fileContent: parsed.fileContent ?? \"\" };\n  } catch (error) {\n    return { error: error instanceof Error ? error.message : \"Unknown error\" };\n  }\n};\n\nconst agentNode = async (state: GraphState): Promise<Partial<GraphState>> => {\n  return { intent: state.intent };\n};\n\nexport const graph = new StateGraph(GraphAnnotation)\n  .addNode(\"intentParser\", intentNode)\n  .addNode(\"agent\", agentNode)\n  .addEdge(START, \"intentParser\")\n  .addConditionalEdges(\"intentParser\", (state: GraphState) => (state.error ? END : \"agent\"))\n  .addEdge(\"agent\", END)\n  .compile();"
   },
   "resultado": "O agente recebe entrada limpa e tipada; falha de parsing vira erro explícito em vez de tool call malformada.",
   "quandoNao": [
    "Entrada já estruturada (formulário, JSON do front).",
    "Conversa curta e simples sem dado embutido.",
    "Quando o custo de uma chamada extra ao modelo não compensa."
   ],
   "armadilha": "Passar a mensagem crua ao agente e confiar que ele separe sozinho o dado da intenção.",
   "repo": {
    "label": "modulo03-mcp-na-pratica/01-multiple-mcp-tools-z/src/graph",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/01-multiple-mcp-tools-z/src/graph"
   }
  },
  {
   "id": "P3-06",
   "title": "Camadas de capacidade: MCP pronto, custom e filesystem",
   "topics": [
    "D3-02"
   ],
   "cenario": "Um time de dados precisa que o agente consulte o Mongo e grave exportações. Dar acesso irrestrito ao disco e ao banco é risco; escrever tudo à mão é desperdício.",
   "passos": [
    "Use o <code>mongodb-mcp-server</code> pronto para consulta; a connection string vem de env.",
    "Use o <code>@modelcontextprotocol/server-filesystem</code> com um diretório permitido restrito.",
    "Para regra de negócio própria (ex.: CSV para JSON), crie tool custom.",
    "Componha os três em um único objeto <code>mcpServers</code>.",
    "Use uma conexão somente leitura para o banco, se possível (hipótese de boa prática, não está no repo)."
   ],
   "code": {
    "lang": "ts",
    "src": "export const getMongoDBTool = () => ({\n  MongoDB: {\n    transport: \"stdio\" as const,\n    command: \"npx\",\n    args: [\"-y\", \"mongodb-mcp-server@latest\"],\n    env: { MDB_MCP_CONNECTION_STRING: process.env.MDB_MCP_CONNECTION_STRING as string },\n  },\n});\n\nexport const getFSTool = (allowedDir: string) => ({\n  filesystem: {\n    transport: \"stdio\" as const,\n    command: \"npx\",\n    args: [\"-y\", \"@modelcontextprotocol/server-filesystem\", allowedDir],\n  },\n});\n\nexport const getMcpServers = () => ({\n  ...getMongoDBTool(),\n  ...getFSTool(`${process.cwd()}/exports`),\n});"
   },
   "resultado": "O agente ganha banco e arquivos em minutos, com escopo de diretório limitado.",
   "quandoNao": [
    "Dado sensível em produção sem conta restrita ao agente.",
    "Quando um export agendado já resolve sem agente.",
    "Se o servidor pronto expõe mais operações do que o caso precisa."
   ],
   "armadilha": "Liberar o diretório do projeto inteiro (ou escrita no banco) quando o caso só precisa de leitura e uma pasta.",
   "repo": {
    "label": "modulo03-mcp-na-pratica/01-multiple-mcp-tools-z/src/tools",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/01-multiple-mcp-tools-z/src/tools"
   }
  },
  {
   "id": "P3-07",
   "title": "Service como tool LangChain",
   "topics": [
    "D3-03"
   ],
   "cenario": "Um criador de conteúdo quer saber se o título de um vídeo está em alta. A lógica de tendências existe como serviço, mas o agente não sabe quando chamá-la.",
   "passos": [
    "Isole a chamada externa em uma classe de serviço (no repo, SerpAPI).",
    "Envolva-a com <code>tool()</code> de <code>@langchain/core/tools</code>.",
    "Escreva <code>description</code> dizendo quando chamar (\"sempre que o usuário compartilhar uma ideia de título\").",
    "Declare o <code>schema</code> em Zod com <code>.describe()</code>.",
    "Retorne string (JSON) para o modelo.",
    "Mocke o serviço nos testes; aqui o serviço é fake."
   ],
   "code": {
    "lang": "ts",
    "src": "import { tool } from \"@langchain/core/tools\";\nimport { z } from \"zod\";\n\ntype TrendPoint = { keyword: string; interestOverTime: number };\n\nexport class TrendsService {\n  async getTrends(keywords: string[]): Promise<TrendPoint[]> {\n    return keywords.map((keyword) => ({ keyword, interestOverTime: keyword.length * 7 }));\n  }\n}\n\nexport function createTrendsTool(service: TrendsService) {\n  return tool(\n    async ({ keywords }) => JSON.stringify(await service.getTrends(keywords)),\n    {\n      name: \"google_trends\",\n      description:\n        \"Get trend data for keywords. Call it whenever the user shares a video title \" +\n        \"idea, to check if the topic is rising or declining.\",\n      schema: z.object({\n        keywords: z.array(z.string()).describe(\"Keywords extracted from the title\"),\n      }),\n    },\n  );\n}"
   },
   "resultado": "O agente passa a chamar o serviço no momento certo, e a lógica de negócio continua testável isolada.",
   "quandoNao": [
    "Quando o resultado é sempre necessário: chame o serviço num nó fixo do grafo, sem decisão do LLM.",
    "API cara por chamada sem cache ou limite.",
    "Se o outro lado já é um MCP: use o MCP."
   ],
   "armadilha": "Descrição vaga da tool: o modelo não sabe quando usá-la.",
   "repo": {
    "label": "modulo03-mcp-na-pratica/02-google-trends-agent/src/tools",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/02-google-trends-agent/src/tools"
   }
  },
  {
   "id": "P3-08",
   "title": "Agent especializado com critério de pronto",
   "topics": [
    "D3-04"
   ],
   "cenario": "Um time usa um único prompt gigante para o agente de código. Ele para cedo, mexe em arquivos demais e ninguém sabe quando a tarefa está concluída.",
   "passos": [
    "Crie <code>.github/agents/developer.agent.md</code> com front matter (<code>description</code>, <code>tools</code>).",
    "Escreva Mission curta e Success Criteria testáveis (tipos sem erro, testes passando).",
    "Declare Scope: o que faz e o que não faz.",
    "Dê só as tools necessárias.",
    "Crie agents separados para gerar testes, revisar etc.",
    "Valide com uma tarefa real e ajuste o critério."
   ],
   "code": {
    "lang": "text",
    "src": "---\ndescription: Node.js + TypeScript coding agent. Implements features and fixes bugs with test-driven discipline.\ntools: ['read', 'edit', 'search', 'execute', 'context7/*']\n---\n\n## Mission\nMake minimal, safe edits that are proven by tests.\n\n## Success Criteria\n0. TypeScript shows no errors or warnings\n1. Relevant test files pass\n2. Full test suite passes\n3. User acceptance criteria met\n\n## Scope\nWill do: implement features with tests, fix bugs with regression tests.\nWon't do: unsafe patterns, ambiguous requirements without asking, new dependencies without justification."
   },
   "resultado": "O agente tem fim definido e escopo mínimo; prompts menores reduzem tokens e variação.",
   "quandoNao": [
    "Projeto minúsculo onde um arquivo de instrução geral basta.",
    "Tarefa exploratória sem critério de pronto possível.",
    "Quando o time ainda não tem testes: o critério fica vazio."
   ],
   "armadilha": "Um único prompt gigante que tenta fazer tudo, com todas as ferramentas liberadas.",
   "repo": {
    "label": "modulo03-mcp-na-pratica/03-dev-instructions-agents/.github/agents",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/03-dev-instructions-agents/.github/agents"
   }
  },
  {
   "id": "P3-09",
   "title": "llms.txt para documentação consumível por agentes",
   "topics": [
    "D3-04"
   ],
   "cenario": "Uma API de pagamentos recebe integradores que usam agentes de código. O agente lê HTML pesado da doc, inventa endpoints e erra a integração.",
   "passos": [
    "Publique <code>/llms.txt</code> na raiz do domínio.",
    "Abra com título e resumo em uma linha.",
    "Liste links de doc em markdown, cada um com descrição curta.",
    "Aponte para versões <code>.md</code> das páginas.",
    "Marque conteúdo secundário em seção Optional.",
    "Não confunda com o arquivo de instrução interno do projeto."
   ],
   "code": {
    "lang": "text",
    "src": "# Acme Payments\n\n> Payments API for marketplaces. Charges, refunds and webhooks over REST.\n\n## Docs\n- [Quickstart](https://docs.acme.example/quickstart.md): create the first charge in 5 minutes\n- [Webhooks](https://docs.acme.example/webhooks.md): events, signatures and retries\n- [Errors](https://docs.acme.example/errors.md): error codes and idempotency\n\n## Optional\n- [Changelog](https://docs.acme.example/changelog.md)"
   },
   "resultado": "Agentes de integradores carregam só a doc relevante, com menos alucinação de endpoints.",
   "quandoNao": [
    "API interna sem consumo externo.",
    "Doc pequena que cabe numa página.",
    "Doc desatualizada: o llms.txt amplifica o erro."
   ],
   "armadilha": "Confundir arquivo de instrução do projeto (interno) com <code>llms.txt</code> (exposto a agentes externos).",
   "repo": {
    "label": "modulo03-mcp-na-pratica/03-dev-instructions-agents",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/03-dev-instructions-agents"
   }
  },
  {
   "id": "P3-10",
   "title": "Skill com divulgação progressiva",
   "topics": [
    "D3-05",
    "D3-16"
   ],
   "cenario": "O time migra testes para uma biblioteca nova. Colar a documentação inteira no prompt estoura contexto; sem ela o agente usa API desatualizada.",
   "passos": [
    "Crie a pasta da skill com <code>SKILL.md</code>.",
    "Escreva <code>name</code> e <code>description</code> como gatilho (quando usar).",
    "Mantenha o corpo curto, com o processo.",
    "Mova o material extenso para <code>references/</code> e cite quando ler.",
    "Se precisar verificar, coloque em <code>scripts/</code>, e inspecione o script.",
    "Teste pedindo uma tarefa que deveria ativar a skill."
   ],
   "code": {
    "lang": "text",
    "src": "mysql2-types/\n  SKILL.md\n  references/\n    pool-and-connection.md\n    query-result-types.md\n  scripts/\n    check-types.sh\n\nSKILL.md\n---\nname: mysql2-types\ndescription: Use when writing or migrating TypeScript code that uses mysql2 (pool, query, execute, RowDataPacket types).\n---\n1. Prefer pool.execute with typed rows.\n2. For result types, read references/query-result-types.md only if needed.\n3. After editing, run scripts/check-types.sh and fix every error."
   },
   "resultado": "Só nome e descrição ficam no contexto até a skill ser ativada; o conteúdo pesado só entra sob demanda.",
   "quandoNao": [
    "Instrução curta e universal: vai no arquivo de instrução do projeto.",
    "Quando precisa acessar sistema externo (isso é MCP).",
    "Para um procedimento usado uma única vez."
   ],
   "armadilha": "Escrever skill enorme num único arquivo, recriando o problema do prompt gigante.",
   "repo": {
    "label": "modulo03-mcp-na-pratica/04-skills",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/04-skills"
   }
  },
  {
   "id": "P3-11",
   "title": "Skill ou MCP: decisão e auditoria de skill de terceiros",
   "topics": [
    "D3-05",
    "D3-16"
   ],
   "cenario": "Um dev quer instalar uma skill da comunidade com scripts para acelerar uma tarefa. A skill roda com as permissões do terminal dele.",
   "passos": [
    "Decida: precisa ensinar processo? skill. Precisa acessar sistema? MCP. Muitas vezes os dois.",
    "Instale com <code>npx skills add usuario/repo</code>.",
    "Leia o <code>SKILL.md</code> antes de usar.",
    "Liste e leia tudo em <code>scripts/</code>.",
    "Faça grep por comandos de rede, eval, base64, acesso a <code>.ssh</code>/<code>.env</code>.",
    "Aplique privilégio mínimo; na dúvida, rode em ambiente isolado."
   ],
   "code": {
    "lang": "bash",
    "src": "npx skills add vercel-labs/skills\n\ncat .claude/skills/<skill-name>/SKILL.md\nls .claude/skills/<skill-name>/scripts/\ngrep -rnE \"curl|wget|eval|base64|rm -rf|\\.ssh|\\.env\" .claude/skills/<skill-name>/"
   },
   "resultado": "Skill de terceiros entra no ambiente com revisão prévia em vez de confiança cega.",
   "quandoNao": [
    "Skill própria ou de fonte já auditada pelo time.",
    "Quando o grep substitui leitura: ele é só triagem.",
    "Se a skill só tem markdown, sem scripts, o risco é menor (mas leia)."
   ],
   "armadilha": "Instalar skill comunitária sem ler o SKILL.md e os scripts.",
   "repo": {
    "label": "modulo03-mcp-na-pratica/04-skills",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/04-skills"
   }
  },
  {
   "id": "P3-12",
   "title": "Ingestão de contexto para skills (Gitingest e Jina Reader)",
   "topics": [
    "D3-16",
    "D3-05"
   ],
   "cenario": "O time precisa migrar testes para o Poku e usar o MySQL2 tipado. O agente não conhece bem as APIs e a documentação está espalhada em repositório e site.",
   "passos": [
    "Converta o repositório em texto com o Gitingest.",
    "Converta a documentação web em markdown com o Jina Reader.",
    "Salve em <code>references/</code> de cada skill, não na conversa.",
    "Escreva o <code>SKILL.md</code> dizendo quando abrir cada referência.",
    "Migre os testes aos poucos, usando a suíte existente como rede de segurança.",
    "Roteiro plausível a partir do README da live, não o executado."
   ],
   "code": {
    "lang": "bash",
    "src": "uvx gitingest https://github.com/sidorares/node-mysql2 -o mysql2.txt\n\ncurl -s https://r.jina.ai/https://poku.io/docs > poku.md\n\nmkdir -p .claude/skills/mysql2-types/references\nmv mysql2.txt .claude/skills/mysql2-types/references/full-source.md\nmkdir -p .claude/skills/poku-tests/references\nmv poku.md .claude/skills/poku-tests/references/docs.md"
   },
   "resultado": "O agente consulta a referência certa só quando a tarefa pede, sem colar o repositório inteiro.",
   "quandoNao": [
    "Biblioteca pequena e bem conhecida pelo modelo.",
    "Doc proprietária ou com licença que proíbe cópia.",
    "Quando o repositório converte em milhões de tokens sem curadoria."
   ],
   "armadilha": "Converter um repositório inteiro em texto e colar na conversa.",
   "repo": {
    "label": "modulo03-mcp-na-pratica/04-skills",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/04-skills"
   }
  },
  {
   "id": "P3-13",
   "title": "API legada como MCP em camadas",
   "topics": [
    "D3-07",
    "D3-08"
   ],
   "cenario": "Uma empresa tem uma API de clientes consolidada e quer um agente operando nela. Ligar tools direto ao HTTP espalha auth, parsing e regra em cada tool.",
   "passos": [
    "Camada de infraestrutura: um cliente HTTP único, que injeta o token.",
    "Camada de aplicação: <code>CustomerService</code> com as operações de negócio (busca composta).",
    "Camada MCP: uma função <code>register...Tool</code> por tool, só traduzindo entrada e saída.",
    "Registre resources (descrição da API) e prompts (busca de cliente).",
    "Cada camada é testável isolada.",
    "Aqui o filtro por nome é feito em memória (simplificação)."
   ],
   "code": {
    "lang": "ts",
    "src": "import type { McpServer } from \"@modelcontextprotocol/sdk/server/mcp.js\";\nimport { z } from \"zod\";\n\ntype Customer = { _id: string; name: string; phone: string };\n\nexport class CustomerHttpClient {\n  constructor(private readonly baseUrl: string, private readonly serviceToken: string) {}\n\n  async listCustomers(): Promise<Customer[]> {\n    const res = await fetch(`${this.baseUrl}/customers`, {\n      headers: { Authorization: `Bearer ${this.serviceToken}` },\n    });\n    if (!res.ok) throw new Error(`HTTP ${res.status}`);\n    return (await res.json()) as Customer[];\n  }\n}\n\nexport class CustomerService {\n  constructor(private readonly http: CustomerHttpClient) {}\n\n  async findByName(name: string): Promise<Customer[]> {\n    const all = await this.http.listCustomers();\n    return all.filter((customer) => customer.name.toLowerCase().includes(name.toLowerCase()));\n  }\n}\n\nexport function registerFindCustomerTool(server: McpServer, service: CustomerService): void {\n  server.registerTool(\n    \"find_customer\",\n    {\n      description: \"Find customers by part of the name\",\n      inputSchema: { name: z.string().describe(\"Part of the customer name\") },\n    },\n    async ({ name }) => {\n      const customers = await service.findByName(name);\n      return { content: [{ type: \"text\", text: JSON.stringify(customers) }] };\n    },\n  );\n}"
   },
   "resultado": "Trocar a API, o auth ou a tool afeta uma camada só; o servidor MCP fica fino.",
   "quandoNao": [
    "Wrapper descartável de uma única rota.",
    "Quando a API já tem filtros e a tool pode repassar sem lógica.",
    "Equipe pequena onde três camadas são burocracia para 2 tools."
   ],
   "armadilha": "Espelhar endpoints e misturar HTTP, regra e MCP no mesmo arquivo.",
   "repo": {
    "label": "modulo03-mcp-na-pratica/06-your-legacy-api-as-mcp",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/06-your-legacy-api-as-mcp"
   }
  },
  {
   "id": "P3-14",
   "title": "Erros estruturados e service token obrigatório no MCP",
   "topics": [
    "D3-12"
   ],
   "cenario": "O agente chama a API sem token ou estoura limite e recebe stack trace ou silêncio. Ele não consegue decidir entre tentar de novo, pedir permissão ou desistir.",
   "passos": [
    "Exija <code>SERVICE_TOKEN</code> na partida e saia com erro claro se faltar.",
    "Mapeie 401, 403 e 429 para erros de domínio no cliente HTTP.",
    "Em cada tool, capture e devolva <code>isError</code> com mensagem legível.",
    "Escreva a mensagem para o modelo agir (token inválido, sem permissão, tente mais tarde).",
    "Logue em stderr: stdout é o protocolo no stdio.",
    "Teste os três cenários de erro via MCP Client."
   ],
   "code": {
    "lang": "ts",
    "src": "export class UnauthorizedError extends Error {\n  constructor(message = \"Unauthorized: service token is missing or invalid\") {\n    super(message);\n    this.name = \"UnauthorizedError\";\n  }\n}\n\nexport class ForbiddenError extends Error {\n  constructor(message = \"Forbidden: token does not have sufficient permissions\") {\n    super(message);\n    this.name = \"ForbiddenError\";\n  }\n}\n\nexport class RateLimitError extends Error {\n  constructor(message = \"Rate limit exceeded. Please try again later.\") {\n    super(message);\n    this.name = \"RateLimitError\";\n  }\n}\n\nexport async function assertOk(res: Response): Promise<void> {\n  if (res.status === 401) throw new UnauthorizedError();\n  if (res.status === 403) throw new ForbiddenError();\n  if (res.status === 429) throw new RateLimitError();\n  if (!res.ok) throw new Error(`HTTP ${res.status} - ${await res.text()}`);\n}\n\nexport function toToolError(action: string, err: unknown) {\n  const message = `Failed to ${action}. Error: ${err instanceof Error ? err.message : String(err)}`;\n  return {\n    isError: true,\n    content: [{ type: \"text\" as const, text: message }],\n  };\n}\n\nexport const requireServiceToken = (): string => {\n  const token = process.env.SERVICE_TOKEN ?? \"\";\n  if (!token) {\n    console.error(\"[error]: SERVICE_TOKEN env var is required\");\n    process.exit(1);\n  }\n  return token;\n};"
   },
   "resultado": "O agente distingue autenticação, autorização e limite de taxa e responde de forma útil ao usuário.",
   "quandoNao": [
    "Servidor local sem auth, de uso pessoal.",
    "Quando o cliente já faz retry padronizado e o erro só precisa propagar.",
    "Não vazar detalhes internos na mensagem em contexto público."
   ],
   "armadilha": "Engolir o erro: devolver sucesso vazio ou stack trace cru ao modelo.",
   "repo": {
    "label": "modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z/customers-mcp-z",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z/customers-mcp-z"
   }
  },
  {
   "id": "P3-15",
   "title": "Autenticação JWT por padrão e RBAC por rota",
   "topics": [
    "D3-09"
   ],
   "cenario": "Uma API de clientes é exposta a um agente. Se cada rota decide por conta própria se exige login, uma rota nova esquecida vira porta aberta e qualquer perfil escreve.",
   "passos": [
    "Hook <code>onRequest</code> global que exige JWT em tudo.",
    "Liste explicitamente as rotas públicas (health, login, service-token).",
    "No login, valide o body por schema e inclua o <code>role</code> no token.",
    "Crie <code>requireRole(role)</code> reutilizável (retorna 403).",
    "Aplique em <code>preHandler</code> nas rotas de escrita.",
    "Segredo do JWT em env (no repo está hardcoded, só didático)."
   ],
   "code": {
    "lang": "js",
    "src": "const publicRoutes = ['/v1/health', '/v1/auth/login', '/v1/auth/service-token']\n\nexport function initAuth(fastify) {\n  fastify.addHook('onRequest', async (request, reply) => {\n    if (publicRoutes.includes(request.originalUrl)) return\n    try {\n      await request.jwtVerify()\n    } catch {\n      return reply.code(401).send({ message: 'Unauthorized' })\n    }\n  })\n}\n\nexport function requireRole(role) {\n  return async function (request, reply) {\n    if (request.user.role === role) return\n    return reply.code(403).send({ message: 'Forbidden: insufficient permissions' })\n  }\n}\n\nexport function registerRoutes(fastify, customers) {\n  fastify.get('/v1/customers', async () => customers.list())\n  fastify.post(\n    '/v1/customers',\n    { preHandler: [requireRole('admin')] },\n    async (request) => customers.create(request.body)\n  )\n}"
   },
   "resultado": "Rota nova nasce protegida; perfil sem permissão recebe 403 em vez de executar a escrita.",
   "quandoNao": [
    "Serviço interno isolado sem usuários distintos.",
    "Quando um gateway/IdP já faz auth e autorização.",
    "Autorização com regras ricas por recurso: RBAC simples não basta."
   ],
   "armadilha": "Marcar rota por rota como protegida em vez de proteger por padrão.",
   "repo": {
    "label": "modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z/nodejs-fastify-mongodb-crud-z",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z/nodejs-fastify-mongodb-crud-z"
   }
  },
  {
   "id": "P3-16",
   "title": "Service token para o MCP",
   "topics": [
    "D3-10"
   ],
   "cenario": "O MCP roda sem humano para fazer login. JWT de curta duração expira no meio da tarefa, e usar a senha de um usuário no MCP é inaceitável.",
   "passos": [
    "Endpoint <code>/auth/service-token</code> exige usuário, senha e um super secret.",
    "Gere o token e guarde com o contexto (usuário e papel).",
    "No hook, procure primeiro o token nos service tokens; senão siga para o JWT.",
    "O resto da aplicação, incluindo RBAC, não sabe qual caminho foi usado.",
    "Entregue o token ao MCP por variável de ambiente.",
    "Antes de produção: persistência, revogação, rotação e auditoria."
   ],
   "code": {
    "lang": "js",
    "src": "import { randomUUID } from 'node:crypto'\n\nconst issuedServiceTokens = new Map()\n\nexport function initAuth(fastify, { adminSuperSecret, findUser }) {\n  fastify.addHook('onRequest', async (request, reply) => {\n    if (request.originalUrl === '/v1/auth/service-token') return\n    const token = request.headers?.authorization?.replace(/bearer /i, '')\n    const serviceUser = issuedServiceTokens.get(token)\n    if (serviceUser) {\n      request.user = serviceUser\n      return\n    }\n    try {\n      await request.jwtVerify()\n    } catch {\n      return reply.code(401).send({ message: 'Unauthorized' })\n    }\n  })\n\n  fastify.post('/v1/auth/service-token', async (request, reply) => {\n    const { username, password, adminSuperSecret: secret } = request.body\n    const user = findUser(username, password)\n    if (!user || secret !== adminSuperSecret) {\n      return reply.code(401).send({ message: 'Invalid credentials' })\n    }\n    const serviceToken = randomUUID()\n    issuedServiceTokens.set(serviceToken, { username: user.username, role: user.role })\n    return { role: user.role, serviceToken }\n  })\n}"
   },
   "resultado": "O MCP autentica sem login interativo, com o papel correto (admin escreve, member só lê).",
   "quandoNao": [
    "Quando o fluxo OAuth com usuário final é viável e desejável.",
    "Em produção com tokens só em memória: um restart invalida tudo.",
    "Quando o super secret não está protegido."
   ],
   "armadilha": "Tratar service token como JWT e esperar expiração.",
   "repo": {
    "label": "modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z"
   }
  },
  {
   "id": "P3-17",
   "title": "Rate limit por token com resposta 429",
   "topics": [
    "D3-11"
   ],
   "cenario": "Um agente em loop chama a API centenas de vezes por minuto. Sem limite, derruba o serviço, gera custo e prejudica os outros clientes.",
   "passos": [
    "Registre <code>@fastify/rate-limit</code> com <code>max</code> e <code>timeWindow</code>.",
    "Use <code>keyGenerator</code>: o token do header, com fallback para IP.",
    "Leia o limite de env para testar com valor baixo.",
    "Teste com 1 requisição por minuto: a segunda deve dar 429.",
    "Faça o MCP mapear 429 para erro que o agente entende.",
    "Restaure o limite real depois do teste."
   ],
   "code": {
    "lang": "js",
    "src": "import Fastify from 'fastify'\nimport fastifyRateLimit from '@fastify/rate-limit'\n\nconst REQUESTS_PER_MINUTE = Number(process.env.REQUESTS_PER_MINUTE ?? 60)\n\nexport const rateLimitOptions = {\n  max: REQUESTS_PER_MINUTE,\n  timeWindow: '1 minute',\n  keyGenerator: (request) =>\n    request.headers?.authorization?.replace(/bearer /i, '') ?? request.ip,\n}\n\nconst fastify = Fastify()\nawait fastify.register(fastifyRateLimit, rateLimitOptions)\n\nfastify.get('/v1/health', async () => ({ status: 'ok' }))"
   },
   "resultado": "Cada integração tem seu orçamento de requisições; um agente descontrolado não afeta os demais.",
   "quandoNao": [
    "Protótipo local de um usuário.",
    "Já existe rate limit no gateway/WAF (evite duplicar sem motivo).",
    "Limite rígido por segundo que barra picos legítimos: prefira janela maior."
   ],
   "armadilha": "Esquecer de restaurar o limite alto depois de testar com valor baixo.",
   "repo": {
    "label": "modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z/nodejs-fastify-mongodb-crud-z/src",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z/nodejs-fastify-mongodb-crud-z/src"
   }
  },
  {
   "id": "P3-18",
   "title": "Publicar o MCP: registry privado antes do npm público",
   "topics": [
    "D3-13"
   ],
   "cenario": "O servidor MCP funciona só na máquina de quem o escreveu. O time precisa de um comando único de instalação, e uma versão quebrada no npm público é cara de corrigir.",
   "passos": [
    "Configure <code>bin</code>, <code>files</code> e <code>type: module</code> no <code>package.json</code>.",
    "Torne o arquivo de entrada executável (<code>chmod 755</code>).",
    "Suba o Verdaccio e publique em <code>localhost:4873</code>.",
    "Rode <code>npx</code> com <code>--registry</code> no editor e valide as tools.",
    "Só então publique no npm público com <code>--access public</code>.",
    "Incremente a versão a cada release."
   ],
   "code": {
    "lang": "bash",
    "src": "npm run registry:start\nnpm run registry:login:private\nnpm run release:private\nnpx -y --registry http://localhost:4873 @acme/customers-mcp@latest\nnpm run registry:login:public\nnpm run release:public"
   },
   "resultado": "Instalação por <code>npx -y pacote</code>, versionada e validada antes de chegar ao público.",
   "quandoNao": [
    "Uso estritamente interno em um repositório: um caminho local resolve.",
    "Quando o servidor roda como serviço HTTP/container.",
    "Código com segredo ou lógica proprietária no pacote público."
   ],
   "armadilha": "Publicar no npm público sem validar antes no registry privado.",
   "repo": {
    "label": "modulo03-mcp-na-pratica/08-publishing-mcps-private-npm/customers-mcp-z",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/08-publishing-mcps-private-npm/customers-mcp-z"
   }
  },
  {
   "id": "P3-19",
   "title": "Escolher o transport do MCP",
   "topics": [
    "D3-14"
   ],
   "cenario": "Um time vai distribuir um MCP e está dividido entre HTTP por moda e pacote npm. Escolher errado significa infra desnecessária ou um servidor local exposto sem proteção.",
   "passos": [
    "Pergunte onde roda e quem consome.",
    "Uso local ou editor: STDIO distribuído por npm.",
    "Serviço central com vários clientes: HTTP.",
    "Eventos contínuos (dashboard): SSE ou streaming.",
    "Dependências complexas: container.",
    "Se for pela rede, autenticação e rate limit são obrigatórios."
   ],
   "code": {
    "lang": "text",
    "src": "Question                                   Transport\nRuns on the dev machine / editor / CI?     STDIO + npm package\nMany clients, one central service?         HTTP\nLive dashboard, continuous events?         SSE / streaming\nComplex deps or part of a larger system?   container\nExposed over the network?                  auth + rate limit mandatory"
   },
   "resultado": "Escolha de transport justificada, sem infraestrutura que o caso não exige.",
   "quandoNao": [
    "Quando o cliente impõe o transport (ex.: só HTTP remoto).",
    "Prova de conceito: use STDIO e decida depois.",
    "Docker para ferramenta simples demais."
   ],
   "armadilha": "Expor um MCP por rede com a mesma configuração do uso local (sem autenticação nem limites).",
   "repo": {
    "label": "modulo03-mcp-na-pratica/08-publishing-mcps-private-npm",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/08-publishing-mcps-private-npm"
   }
  }
 ]
});
