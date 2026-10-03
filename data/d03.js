STUDY.push({
 "disc": {
  "num": "03",
  "nome": "Disciplina 03",
  "titulo": "Model Context Protocol (MCP)",
  "autor": "Erick Wendel Gomes da Silva",
  "emoji": "🔌",
  "resumo": "Do function calling ao MCP: agentes com múltiplos MCPs e LangChain.js, agents e skills, servidores MCP do zero, uma API legada transformada em MCP com JWT, RBAC, service tokens e rate limiting, publicação em NPM e Verdaccio, e consumo por um agente."
 },
 "materiais": [
  [
   "Repositório oficial — módulo 03",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica"
  ],
  [
   "Indicação 1: What is the Model Context Protocol (MCP)? (documentação oficial)",
   "https://modelcontextprotocol.io/docs/getting-started/intro"
  ],
  [
   "Indicação 2: MCP na documentação do LangChain.js",
   "https://docs.langchain.com/oss/javascript/langchain/mcp"
  ],
  [
   "Indicação 3: MCP Security Best Practices (documentação oficial)",
   "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices"
  ],
  [
   "MCP Inspector (refs.txt do módulo)",
   "https://modelcontextprotocol.io/docs/tools/inspector"
  ],
  [
   "Live de 24/02/2026: base teórica de MCP e Agent Skills (repositório do curso)",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-02-24"
  ]
 ],
 "blocos": [
  {
   "id": "d03-b0",
   "label": "Visão geral do MCP"
  },
  {
   "id": "d03-b1",
   "label": "Múltiplos MCPs e tools com LangChain.js"
  },
  {
   "id": "d03-b2",
   "label": "Agents, instructions e skills"
  },
  {
   "id": "d03-b3",
   "label": "Servidores MCP do zero e sobre APIs legadas"
  },
  {
   "id": "d03-b4",
   "label": "Segurança e governança"
  },
  {
   "id": "d03-b5",
   "label": "Produção: publicação, transports e consumo"
  }
 ],
 "topics": [
  {
   "id": "D3-00",
   "bloco": "d03-b0",
   "mod": "Unidade 1 · Aula 1",
   "emoji": "🔌",
   "read": "10 min",
   "title": "Do plugin e function calling ao MCP: tools, resources, prompts e descoberta",
   "short": "MCP não substitui tools: embute tools num protocolo cliente-servidor com descoberta, resources e prompts.",
   "oneliner": "O <b>MCP</b> é um protocolo cliente-servidor que incorpora as <b>tools</b> do function calling e acrescenta <b>resources</b>, <b>prompts</b> e <b>descoberta de capacidades</b>. Ele eleva a integração de «lista de funções» para «ecossistema», mas não dispensa engenharia de software.",
   "vovo": [
    "Function calling é entregar ao garçom um cardápio impresso: ele só conhece os pratos que estão ali e, se a cozinha mudar, alguém precisa reimprimir. No MCP o garçom pode perguntar à cozinha «o que vocês fazem hoje? como se pede isso?» e receber a resposta na hora.",
    "E, em vez de pedir «prato 12, 14 e 15», o cliente pede «um jantar para duas pessoas» e a cozinha combina os pratos por trás do balcão. É isso que a apostila chama de abstração orientada ao domínio."
   ],
   "oque": [
    "<b>Linha do tempo (apostila):</b> plugins do ChatGPT em março de 2023; Function Calling em junho de 2023 (funções com nome, descrição e estrutura de entrada entregues ao modelo, que escolhe qual chamar e gera os argumentos); depois o MCP. A apostila insiste que não foi uma ruptura, e sim a resposta a um problema antigo: a complexidade de integrações.",
    "<b>Limite do function calling:</b> o entendimento da integração é superficial. O modelo conhece as funções e os parâmetros, mas não explora de forma estruturada o que o sistema oferece; você descreve tudo à mão no código, qualquer mudança exige atualizar as definições e não existe descoberta padronizada.",
    "<b>O que o MCP acrescenta:</b> um protocolo de comunicação entre cliente e servidor que expõe não só tools, mas também <b>resources</b> (contexto: o que o serviço faz, objetivos, exemplos de uso) e <b>prompts</b> prontos. O cliente conectado descobre as capacidades em vez de você declarar função por função.",
    "<b>Abstração:</b> em vez de uma tool por endpoint (buscar cliente por ID, listar, obter detalhe), uma ação ligada a uma intenção de negócio, como «buscar cliente por nome». O servidor orquestra por trás (listar, filtrar, detalhar, consolidar) e esconde autenticação, autorização e múltiplos endpoints.",
    "<b>Transporte sob demanda:</b> em vez de request-resposta completa, os dados podem ir de forma incremental (o exemplo da apostila é processamento de vídeo em partes, quase em tempo real).",
    "<b>MCP não substitui tools:</b> as tools continuam como capacidades expostas ao modelo, agora dentro de um protocolo mais amplo. Por isso frameworks ainda usam o termo «tools» quando operam com MCP."
   ],
   "como": [
    "<b>Comparação com REST:</b> um Swagger com dezenas ou centenas de endpoints teria de ser enviado inteiro ao modelo a cada interação, e LLM é cobrado por volume processado. Com ações no lugar de endpoints, o modelo consome só o necessário e pede mais contexto sob demanda, gastando menos tokens.",
    "<b>Complemento da live de 24/02/2026 (base teórica no repositório):</b> o problema «N × M» (cada modelo × cada fonte de dados exigia integração própria); o MCP foi lançado pela Anthropic no fim de 2024, apresentado como o «USB-C das aplicações de IA», e depois doado à Linux Foundation (Agentic AI Foundation) para manter governança neutra.",
    "<b>Arquitetura (live):</b> mensagens JSON-RPC 2.0, com transporte local via stdio ou de rede via HTTP/SSE. <b>Host</b> é onde o modelo roda e o usuário interage (Claude Desktop, Cursor, VS Code); <b>Client</b> vive dentro do host e gerencia a conexão; <b>Server</b> é um processo independente que expõe dados e ferramentas.",
    "<b>Ciclo de invocação (live):</b> descoberta (o cliente lista as tools do servidor, com <code>tools/list</code>), planejamento (o LLM decide quais tools usar e com quais parâmetros) e execução (a tool é chamada com <code>tools/call</code> e o servidor devolve o resultado). Exemplo da live: «baixe a transcrição do Google Drive e anexe no prospecto do Salesforce»: o LLM identifica as duas tools, planeja a sequência e executa cada chamada via MCP.",
    "<b>Por que o function calling já ajudava (apostila):</b> ele reduziu alucinações, porque o modelo passou a operar com capacidades bem definidas em vez de improvisar. O MCP mantém esse ganho e tira o custo de declarar tudo à mão.",
    "<b>Otimização de custo (live, números não verificados):</b> em vez de deixar o modelo chamar tools «cegamente», o agente gera pequenos scripts (TypeScript ou Python) em sandbox que falam com os servidores MCP por baixo e devolvem só o resultado já filtrado (ex.: uma planilha de 10 mil linhas vira 5). A live cita redução de 98% a 99% em tokens e latência; trate como ordem de grandeza anunciada, não medida.",
    "<b>As três primitivas:</b> Tools executam ações; Resources entregam dados de leitura como contexto; Prompts são templates e fluxos pré-definidos que guiam o uso. A live resume: MCP são os «braços e pernas» da IA, Agent Skills (ver <a href=\"#D3-05\">tópico 05</a>) são o «cérebro».",
    "<b>No curso:</b> Não há projeto de código nesta aula: ela é conceitual. A parte prática começa no <a href=\"#D3-01\">tópico 01</a>.",
    "<b>No curso:</b> O repositório não traz implementação de HTTP, SSE ou streaming: todos os servidores e clientes do módulo usam stdio (ver <a href=\"#D3-14\">tópico 14</a>).",
    "<b>No curso:</b> Material complementar usado aqui: <code>lives/2026-02-24/base-teorica/mcp-model-context-protocol.md</code> do repositório do curso."
   ],
   "aplica": [
    "Decidir se vale expor uma API como MCP: quando o consumidor é um modelo ou agente e a API tem granularidade técnica demais.",
    "Argumento de custo: ações de domínio reduzem o contexto gasto descrevendo endpoints.",
    "Reaproveitar um único servidor MCP (por exemplo, de Jira) em vários agentes: chat, terminal de programação, sistema de suporte (live)."
   ],
   "pros": [
    "Descoberta automática de capacidades, sem redeclarar função por função.",
    "Menos tokens: o modelo pede o que precisa, quando precisa.",
    "Desacoplamento: quem consome conhece as ações expostas, não os endpoints por trás.",
    "Padrão neutro, reaproveitável por qualquer cliente compatível (live)."
   ],
   "contras": [
    "Servidor MCP mal projetado é lento, inseguro e difícil de manter, como qualquer sistema (apostila).",
    "Live (número não verificado): carregar o catálogo de ferramentas de dezenas de servidores pode consumir de 50.000 a 150.000 tokens por sessão em ambientes corporativos.",
    "Live (número não verificado, pesquisa não identificada na fonte): uma pesquisa citada aponta divergência séria entre descrição e código em cerca de 13% dos servidores (ex.: ferramenta descrita como «somente leitura» que apaga dados). Mitigações: privilégio mínimo, gateways e human-in-the-loop para ações irreversíveis."
   ],
   "traps": [
    "Tratar o MCP como ruptura total ou como sinônimo de tool: ele envolve tools, não as elimina.",
    "Espelhar a API endpoint por endpoint e perder o valor da abstração.",
    "Achar que o protocolo substitui arquitetura: a modelagem das ações e a eficiência das integrações continuam críticas.",
    "Confundir MCP com «API web pública»: ele pode ser só um processo local falando por stdio (ver <a href=\"#D3-06\">tópico 06</a>)."
   ],
   "tip": "Pergunta-teste para cada tool que você expõe: ela representa uma intenção de negócio ou apenas um endpoint? Se for só um endpoint, provavelmente você está espelhando a API.",
   "cola": [
    [
     "MCP",
     "Model Context Protocol: padrão aberto que conecta aplicações de IA a sistemas externos"
    ],
    [
     "Tool",
     "Ação executável exposta ao modelo, com nome, descrição e schema de entrada"
    ],
    [
     "Resource",
     "Contexto de leitura exposto pelo servidor (documentação, dados), sem executar ação"
    ],
    [
     "Prompt (MCP)",
     "Template de instrução pronto, com argumentos, para guiar o uso do servidor"
    ],
    [
     "Descoberta",
     "Cliente listar capacidades do servidor em vez de tê-las codificadas"
    ],
    [
     "Function calling",
     "Funções descritas ao modelo, que escolhe qual chamar e gera os argumentos"
    ],
    [
     "Host, client, server",
     "Onde o modelo roda, quem gerencia a conexão e quem expõe as capacidades"
    ],
    [
     "JSON-RPC 2.0",
     "Formato das mensagens trocadas entre cliente e servidor MCP (live)"
    ],
    [
     "tools/list e tools/call",
     "Os dois métodos do ciclo: listar as tools do servidor e executar uma delas (live)"
    ],
    [
     "Code-first (live)",
     "O agente gera scripts em sandbox que usam os servidores MCP e devolvem só o resultado enxuto ao modelo"
    ],
    [
     "N × M",
     "Explosão de integrações sem padrão: cada modelo com cada fonte (live)"
    ]
   ],
   "links": [
    [
     "Indicação 1: What is the Model Context Protocol (MCP)? (documentação oficial)",
     "https://modelcontextprotocol.io/docs/getting-started/intro"
    ],
    [
     "Indicação 3: Security Best Practices (documentação oficial)",
     "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica"
    ]
   ]
  },
  {
   "id": "D3-01",
   "bloco": "d03-b1",
   "mod": "Unidade 2 · Aulas 1 e 2",
   "emoji": "🧠",
   "read": "10 min",
   "title": "App com múltiplos MCPs: arquitetura em agentes e parsing estruturado da intenção",
   "short": "Dois nós: intentParser extrai a intenção em JSON validado e o agent orquestra as tools sozinho.",
   "oneliner": "O projeto da unidade troca fluxo imperativo por <b>autonomia do modelo</b>: o usuário manda dados (CSV ou JSON) e uma pergunta num único prompt; o nó <b>intentParser</b> transforma isso num objeto estruturado e só então o nó <b>agent</b> decide quais tools usar e em que ordem.",
   "vovo": [
    "Imagine um gerente que recebe um pedido bagunçado por mensagem de voz: «quero o ranking dos mais vendidos, segue a planilha». Antes de acionar a equipe, uma recepcionista passa o pedido a limpo numa ficha: o que a pessoa quer, tipo do arquivo, conteúdo e um nome para ele.",
    "Se a ficha não faz sentido, o pedido nem entra. Se faz, o gerente (o agent) escolhe sozinho quais ferramentas pegar. Quem organiza a entrada é uma etapa; quem executa é outra."
   ],
   "oque": [
    "<b>Objetivo da aplicação:</b> analisar um relatório de vendas. O usuário envia o conjunto de dados (CSV ou JSON) e faz uma pergunta (ex.: ranking dos produtos mais vendidos) num único prompt; o modelo orquestra o resto.",
    "<b>Autonomia do modelo:</b> o código não define a ordem das ações. Você entrega ferramentas e instruções, e o modelo decide qual ferramenta usar, quando e como encadear.",
    "<b>Primeira etapa, a intenção:</b> extrai o objetivo, o tipo de dado, o conteúdo do arquivo, um nome adequado e o formato. Permite pular etapas por contexto (se já é JSON, não converte).",
    "<b>Pipeline descrito na aula:</b> converter CSV em JSON (se for o caso), salvar em arquivo (opcional), inserir no MongoDB com nome de coleção escolhido pelo modelo, consultar e agregar, e gravar o relatório final em .txt na pasta de relatórios. Isso é descrito em alto nível, não programado passo a passo.",
    "<b>Arquitetura em agentes:</b> um agente entende a intenção, outro executa; entre eles há uma condicional que interrompe o fluxo se a interpretação falhar. Uma camada de serviços agrega os servidores MCP e o serviço principal suporta dois tipos de retorno: JSON estruturado e execução de tools via MCP.",
    "<b>Parsing inteligente (aula 2):</b> um serviço de geração estruturada recebe system prompt, prompt do usuário e um <b>schema</b>; o retorno é validado (sem intenção ou tipo de arquivo, o fluxo para) e há <b>fallback</b> para o nome do arquivo, derivado do tipo."
   ],
   "como": [
    "<b>Por que o parsing vem primeiro:</b> qualquer erro na interpretação inicial contamina todo o pipeline. O schema reduz ambiguidade, a validação funciona como barreira e a estrutura final (intenção, conteúdo, nome) simplifica os nós seguintes.",
    "<b>Ambiente (aula 2):</b> valida a versão do Node, restaura dependências, lista os scripts e sobe MongoDB e uma interface visual via Docker. Abordagem incremental: confirmar que os dados chegam ao grafo antes de implementar a lógica.",
    "<b>Retentativa:</b> se o modelo executar algo errado (por exemplo, uma query inválida), ele pode reconsultar o servidor MCP, buscar exemplos de uso, ajustar e tentar de novo.",
    "<b>Limite de contexto:</b> os dados enviados não podem exceder a capacidade do modelo; no desenvolvimento usam-se conjuntos reduzidos e, em produção, é preciso uma estratégia para volumes maiores.",
    "<b>Observabilidade:</b> logs de início e fim das execuções, chamadas de tools, entradas, saídas e tentativas, essenciais para depurar um modelo probabilístico."
   ],
   "aplica": [
    "Qualquer fluxo em que a entrada do usuário é texto livre misturado com dados e precisa virar contrato antes de ir para ferramentas.",
    "Pipelines em que a ordem das ações depende do contexto (pular a conversão quando o dado já é JSON)."
   ],
   "pros": [
    "Menos código imperativo: o fluxo é descrito em alto nível.",
    "Entrada validada por schema antes de qualquer ação com efeito colateral.",
    "Separação clara entre entender e executar facilita evoluir cada parte."
   ],
   "contras": [
    "O comportamento do modelo é probabilístico: depende de logs e depuração para entender decisões.",
    "Janela de contexto limita o volume de dados enviados no prompt."
   ],
   "traps": [
    "Deixar o modelo executar sem validar a intenção extraída: erros se propagam por todo o pipeline.",
    "Usar o mesmo nó para interpretar e executar: perde a barreira de validação.",
    "Subir a aplicação sem confirmar antes que MongoDB e demais serviços estão de pé."
   ],
   "cola": [
    [
     "intentParser",
     "Nó que transforma a pergunta bruta em objeto estruturado (intent, fileType, fileContent, fileName)"
    ],
    [
     "Geração estruturada",
     "Pedir ao modelo uma saída que obedece a um schema (aqui, Zod)"
    ],
    [
     "Aresta condicional",
     "Decide o próximo nó a partir do estado (erro encerra, sucesso segue para o agent)"
    ],
    [
     "Orquestração autônoma",
     "O modelo escolhe a ordem e as ferramentas, em vez do código"
    ],
    [
     "Fallback de nome",
     "Se o modelo não nomeia o arquivo, usa <code>data.&lt;tipo&gt;</code>"
    ]
   ],
   "links": [
    [
     "Indicação 2: MCP na documentação do LangChain.js",
     "https://docs.langchain.com/oss/javascript/langchain/mcp"
    ],
    [
     "Código: 01-multiple-mcp-tools-z",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/01-multiple-mcp-tools-z"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica"
    ]
   ],
   "codigo": [
    {
     "proj": "01-multiple-mcp-tools-template e 01-multiple-mcp-tools-z (grafo e nó de intenção)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/01-multiple-mcp-tools-z",
     "resumo": "Servidor Fastify com <code>POST /chat</code> que invoca um grafo LangGraph de dois nós (<code>intentParser</code> e <code>agent</code>) sobre o OpenRouter, usando <code>ChatOpenAI</code> do LangChain. No -z a intenção sai de um schema Zod; as tools do agente estão no <a href=\"#D3-02\">tópico 02</a>.",
     "fluxo": [
      "<code>src/index.ts</code> sobe o Fastify na porta 3000, lê <code>data/sales-complete.csv</code> (a leitura de <code>sales.csv</code> fica comentada), monta a pergunta «What's the total revenue from this sales data?» e dispara <code>app.inject</code> em <code>POST /chat</code>, imprime a resposta e encerra com <code>process.exit</code>.",
      "<code>src/server.ts</code> valida o body (<code>question</code> string com <code>minLength: 10</code>), chama <code>graph.invoke({ messages: [new HumanMessage(question)] })</code> e responde <code>response.answer ?? última mensagem</code>.",
      "<code>src/graph/graph.ts</code> monta o <code>StateGraph</code>: <code>START → intentParser</code>; aresta condicional (se <code>state.error</code> termina em <code>END</code>, senão vai para <code>agent</code>); <code>agent → END</code>.",
      "<code>src/graph/state.ts</code> define o estado com Zod (<code>zod/v3</code>): <code>messages</code> (com <code>MessagesZodMeta</code>), <code>answer</code>, <code>intent</code>, <code>fileContent</code>, <code>fileName</code> e <code>error</code>.",
      "<code>src/prompts/v1/identifyIntent.ts</code> traz o <code>IntentSchema</code> (<code>intent</code>, <code>fileContent</code> e <code>fileName</code> anuláveis, <code>fileType</code> como enum <code>csv | json | unknown</code>) e o system prompt de extração.",
      "<code>src/graph/nodes/intentNode.ts</code> (no -z) chama <code>generateStructured</code> com o schema; sem <code>intent</code> ou <code>fileType</code> lança erro; aplica <code>parsed.fileName ??= `data.${parsed.fileType}`</code> e devolve <code>intent</code>, <code>fileContent</code> e <code>fileName</code>. No <code>catch</code> devolve <code>error</code> e uma mensagem de desculpas.",
      "<code>src/services/openRouterService.ts</code> cria o <code>ChatOpenAI</code> apontando para <code>https://openrouter.ai/api/v1</code> (com <code>models</code> e <code>provider</code> em <code>modelKwargs</code>). Com schema, <code>createAgent</code> usa <code>responseFormat: providerStrategy(schema)</code> e <code>tools: []</code>; sem schema, usa as tools MCP."
     ],
     "rodar": [
      "Node &gt;= 24.10. <code>npm i</code> e <code>cp .env.example .env</code> (preencha <code>OPENROUTER_API_KEY</code>; as variáveis LangSmith são opcionais).",
      "<code>npm run docker:infra:up</code> sobe MongoDB e mongo-express (porta 8081); <code>npm start</code> executa a pergunta fixa de <code>index.ts</code>; <code>npm run langgraph:serve</code> abre o LangGraph Studio.",
      "Não executei este projeto: ele depende de chave do OpenRouter, que eu não tinha. A leitura abaixo é só do código."
     ],
     "armadilhas": [
      "<code>.env.example</code> traz <code>LANGCHAIN_PROJECT=01-multiple-mcp-tools-template</code> também no -z.",
      "O código importa <code>zod/v3</code>, mas o <code>package.json</code> não declara <code>zod</code>: ele chega como dependência transitiva (3.25.76 no lock).",
      "O servidor responde <code>response.answer ?? ...</code>, porém o <code>agentNode</code> nunca preenche <code>answer</code> nesta versão; a resposta sai sempre da última mensagem.",
      "O <code>intentNode</code> valida <code>fileType</code> mas não o grava no estado (só em <code>09-using-mcp-with-langchain</code> o estado ganha <code>fileType</code>).",
      "O compose do MongoDB expõe o mongo-express com usuário e senha fixos no arquivo: ok para laboratório local, não para qualquer ambiente exposto.",
      "A apostila admite que modelos gratuitos falham com volumes maiores de dados; o projeto usa <code>arcee-ai/trinity-large-preview:free</code> e <code>maxTokens: 2048</code>."
     ],
     "templateVsZ": "O <b>template</b> tem a estrutura pronta, mas <code>intentNode</code> devolve valores fixos (<code>intent: ''</code>, <code>fileContent: '{}'</code>, <code>fileName: 'report.json'</code>), <code>agentNode</code> devolve «Nothing yet!», <code>getMCPTools</code> retorna <code>[]</code>, a pasta <code>src/tools</code> só tem <code>.gitkeep</code>; os prompts em <code>src/prompts/v1</code> já vêm prontos. O <code>index.ts</code> do template usa a pergunta de ranking (top 5) com <code>sales.csv</code>. O <b>-z</b> acrescenta schema e validação da intenção, o prompt do agent, as três tools e as saídas de exemplo em <code>reports/</code>."
    }
   ]
  },
  {
   "id": "D3-02",
   "bloco": "d03-b1",
   "mod": "Unidade 2 · Aulas 3 a 5",
   "emoji": "🧰",
   "read": "12 min",
   "title": "MongoDB MCP, tool customizada e File System MCP: camadas de capacidade do agente",
   "short": "O que é determinístico vira tool (csv_to_json) ou MCP (MongoDB, filesystem), e o escopo de cada uma é limitado.",
   "oneliner": "Depois da intenção, o agente ganha três tipos de capacidade na mesma lista: o <b>MCP do MongoDB</b> (consultas e agregações), uma <b>tool customizada</b> que converte CSV em JSON e o <b>MCP de File System</b> restrito a uma pasta. O modelo decide quando usar cada uma; o código só descreve e limita.",
   "vovo": [
    "O modelo sozinho até soma uma planilha de cabeça, como um chef que faz conta no guardanapo: funciona, mas erra e demora. Melhor entregar uma calculadora (a tool de CSV), um armário bem organizado (o banco) e uma gaveta onde ele só pode guardar o relatório (o file system limitado).",
    "Quanto menos gavetas ele puder abrir, menos tempo perde olhando coisa que não importa."
   ],
   "oque": [
    "<b>Execução sem tools (aula 3):</b> sem ferramentas, o modelo até converte CSV em JSON e agrega por conta própria, mas isso não é adequado a produção: ele não foi feito para cálculo complexo com precisão garantida e gasta tokens. A estratégia é delegar a ferramentas.",
    "<b>Nó de execução sem schema:</b> diferente do parsing, o nó do agente não usa schema estruturado, porque agora o modelo precisa poder usar tools. Essa decisão habilita o comportamento autônomo.",
    "<b>MCP do MongoDB:</b> permite criar e remover coleções, inserir, consultar e agregar. A configuração é uma função que devolve nome, tipo de transporte, forma de execução, permissões de leitura e escrita e o banco (criado automaticamente se não existir).",
    "<b>Camada de agregação de MCPs:</b> centraliza a configuração, inicializa os servidores e converte as capacidades em tools que o framework entende, por meio de <b>adapters</b>.",
    "<b>Tool customizada (aula 4):</b> converter CSV em JSON na LLM traz inconsistência, precisão variável, gasto de tokens e trata uma tarefa determinística como inferência. A tool tem dois blocos, a função que executa e o objeto de configuração (nome, descrição, schema de entrada, mensagens). O resultado volta como string.",
    "<b>Tool não é servidor MCP:</b> é uma função exposta ao modelo dentro da aplicação; o MCP é a camada mais ampla de protocolo, descoberta, transporte e integração. Aqui os dois são usados de forma complementar.",
    "<b>File System MCP (aula 5):</b> leitura, escrita, listagem, movimentação e metadados de arquivos já prontos. A configuração inclui o <b>diretório acessível</b>, que delimita o escopo."
   ],
   "como": [
    "<b>Segurança (aula 3):</b> nem todo repositório de MCP é confiável; como roda no ambiente local, há risco de expor dados sensíveis. Priorize repositórios oficiais, ferramentas mantidas pelos próprios fornecedores e fontes confiáveis.",
    "<b>Escopo e contexto (aula 5):</b> se o modelo pode acessar toda a estrutura do projeto, ele pode explorar arquivos desnecessários, gastando tokens e perdendo o foco. A aula restringe o acesso à pasta de relatórios.",
    "<b>Schema como contrato (aula 4):</b> o modelo só consegue chamar a tool se enviar os parâmetros no formato esperado; a validação é a barreira entre a liberdade do modelo e a segurança da aplicação.",
    "<b>Resiliência:</b> mesmo com uma tool ainda não integrada (como o file system antes da aula 5), o modelo registrou o erro e seguiu com o que tinha, tentando alternativas.",
    "<b>Dados grandes (aula 5):</b> arquivos maiores, em modelos gratuitos, causaram falhas de parsing, de conversão, de inserção e perda de contexto. Recomendação: upload de arquivos, tools de leitura sob demanda, processar em partes e persistir incrementalmente."
   ],
   "aplica": [
    "Capacidades determinísticas (conversão, cálculo, formatação) viram tool em vez de inferência do modelo.",
    "Integrações prontas com banco, arquivos ou SaaS entram como servidores MCP, sem reimplementar.",
    "Adicionar uma nova capacidade sem tocar no fluxo nem no agente: basta incluir na camada de agregação."
   ],
   "pros": [
    "Confiabilidade e economia de tokens ao tirar tarefas técnicas do modelo.",
    "Modularidade: cada capacidade é independente e reutilizável.",
    "Não é preciso um servidor MCP completo para uma função pontual."
   ],
   "contras": [
    "Servidores MCP de terceiros rodam na sua máquina, com os seus privilégios.",
    "Modelos gratuitos degradam com volumes maiores de dados no prompt."
   ],
   "traps": [
    "Dar ao modelo acesso a mais do que ele precisa (a aula recomenda só a pasta de relatórios).",
    "Confiar em qualquer servidor MCP encontrado em repositório aleatório.",
    "Deixar a LLM fazer conversão ou conta que um código resolve de forma exata.",
    "Mandar o arquivo inteiro no prompt em vez de usar tools de leitura sob demanda."
   ],
   "tip": "Descrição e nome da tool são o que o modelo lê. Uma descrição que diga «converte CSV em JSON» evita que ele tente converter por conta própria.",
   "cola": [
    [
     "MultiServerMCPClient",
     "Cliente do LangChain que conecta a vários servidores MCP e os converte em tools"
    ],
    [
     "Adapter",
     "Camada que traduz capacidades MCP para o formato de tool do framework"
    ],
    [
     "csv_to_json",
     "Tool customizada com schema Zod: recebe <code>csvText</code> e devolve JSON em string"
    ],
    [
     "Diretório acessível",
     "Pasta que o MCP de filesystem pode ler e escrever: define o escopo"
    ],
    [
     "stdio",
     "Transporte local: o servidor roda como processo filho do cliente"
    ],
    [
     "Agregação de MCPs",
     "Camada única que monta todas as tools que o agente enxerga"
    ]
   ],
   "links": [
    [
     "Indicação 2: MCP na documentação do LangChain.js",
     "https://docs.langchain.com/oss/javascript/langchain/mcp"
    ],
    [
     "Servidor MCP do MongoDB (citado no código)",
     "https://github.com/mongodb-js/mongodb-mcp-server"
    ],
    [
     "Código: 01-multiple-mcp-tools-z",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/01-multiple-mcp-tools-z"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica"
    ]
   ],
   "codigo": [
    {
     "proj": "01-multiple-mcp-tools-z (tools e camada MCP)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/01-multiple-mcp-tools-z",
     "resumo": "Continuação do projeto do <a href=\"#D3-01\">tópico 01</a>: <code>mcpService.ts</code> agrega o MCP do MongoDB, o MCP de filesystem e a tool <code>csv_to_json</code>, e o prompt do agente descreve o pipeline em cinco passos.",
     "fluxo": [
      "<code>src/services/mcpService.ts</code> cria um <code>MultiServerMCPClient</code> com <code>mcpServers: { ...getMongoDBTool(), ...getFSTool() }</code> e <code>onMessage</code> logando por servidor; <code>getMCPTools</code> devolve <code>[...mcpTools, getCSVTOJSONTool()]</code>.",
      "<code>src/tools/mongodbTool.ts</code> declara o servidor <code>MongoDB</code> em <code>stdio</code> via <code>npx -y mongodb-mcp-server@latest</code>, com <code>MDB_MCP_CONNECTION_STRING=mongodb://localhost:27017/dataprocessing</code>.",
      "<code>src/tools/fsTool.ts</code> declara o servidor <code>filesystem</code> via <code>npx -y @modelcontextprotocol/server-filesystem</code> com <code>process.cwd()</code> como diretório permitido.",
      "<code>src/tools/csvToJSONTool.ts</code> usa <code>tool()</code> do LangChain: nome <code>csv_to_json</code>, schema <code>z.object({ csvText: z.string() })</code>, converte com <code>csvtojson().fromString</code>, loga a quantidade de registros e devolve <code>JSON.stringify(result)</code>.",
      "<code>src/prompts/v1/agentNode.ts</code>: o system prompt manda seguir passos fixos (Step 0 apagar as coleções do usuário no MongoDB; Step 1 converter CSV com <code>csv_to_json</code>; Step 2 salvar JSON se pedido; Step 3 inserir no MongoDB; Step 4 consultar para responder; Step 5 gravar o relatório .txt em <code>./reports/</code>); o user prompt leva intent, fileName e fileContent.",
      "<code>src/services/openRouterService.ts</code>: <code>#getTools</code> carrega as tools só na primeira chamada (cache em <code>this.tools</code>); sem schema, <code>createAgent</code> roda com essas tools e callbacks logam decisão do modelo, início e fim de cada tool.",
      "Artefatos já commitados no -z: <code>reports/*.txt</code> (por exemplo, receita total de $71.33 sobre as 8 linhas de <code>sales.csv</code>), <code>data.json</code> e <code>products.json</code> na raiz: são saídas de execuções do agente, não código."
     ],
     "rodar": [
      "Suba a infraestrutura com <code>npm run docker:infra:up</code> (MongoDB 8 e mongo-express em <a href=\"http://localhost:8081\">localhost:8081</a>) e depois <code>npm start</code>.",
      "Confira o resultado em <code>reports/</code> e a coleção criada no mongo-express. <code>npm run docker:infra:cleanup</code> remove volumes.",
      "Não executei o agente (sem chave do OpenRouter); a análise é de leitura do código."
     ],
     "armadilhas": [
      "O MCP de filesystem aponta para <code>process.cwd()</code>, a raiz do projeto inteira (incluindo o <code>.env</code> com a chave do OpenRouter), ao contrário do que a aula recomenda (restringir à pasta de relatórios). No projeto do <a href=\"#D3-15\">tópico 15</a> a raiz foi limitada a <code>./data</code>.",
      "O passo 0 do prompt apaga todas as coleções do usuário a cada execução: aceitável em laboratório, perigoso fora dele.",
      "<code>mongodb-mcp-server@latest</code> sem versão fixa: o comportamento pode mudar entre execuções.",
      "A conexão do MongoDB não tem autenticação e o compose usa credenciais fixas no mongo-express.",
      "<code>console.log('LLM Response', JSON.stringify(data))</code> despeja todas as mensagens do agente no log; útil para aprender, ruim para dados sensíveis.",
      "A tool <code>csv_to_json</code> está nos <code>mcpTools</code> do agente mas é função local, não um servidor MCP."
     ],
     "templateVsZ": "No template, <code>mcpService.ts</code> retorna lista vazia e <code>src/tools</code> está vazia: é o que você implementa seguindo as aulas 3 a 5. O -z traz os três arquivos de tools e o <code>mcpService</code> completo."
    }
   ]
  },
  {
   "id": "D3-03",
   "bloco": "d03-b1",
   "mod": "Unidade 2 · Aula 6",
   "emoji": "📈",
   "read": "9 min",
   "title": "Services como tools: Google Trends com LangChain.js",
   "short": "Uma service com regra de negócio vira tool, e o prompt impõe o limite de uso da API externa.",
   "oneliner": "Nem sempre existe um MCP pronto: uma <b>service</b> que já encapsula regra de negócio e API externa pode ser exposta ao modelo como <b>tool</b>. O modelo ganha autonomia para decidir quando usá-la; a lógica técnica continua numa camada de serviço convencional.",
   "vovo": [
    "Você pergunta a um amigo publicitário «esse título de vídeo é bom?». Em vez de ele chutar, ele liga para um instituto de pesquisa (a service), pergunta o que as pessoas andam procurando e só então responde.",
    "O detalhe é que o instituto cobra por ligação. Por isso a instrução ao amigo é: «ligue uma vez só, com as duas palavras-chave juntas»."
   ],
   "oque": [
    "<b>Caso de uso:</b> o criador de conteúdo informa um tema, a LLM interpreta, extrai palavras-chave, chama uma tool que consulta a API do Google Trends, recebe os dados processados e responde com sugestões de título embasadas em dados reais.",
    "<b>Por que service como tool:</b> combina autonomia da LLM, controle da aplicação sobre a regra de negócio, reaproveitamento de serviços existentes e menor acoplamento entre fluxo e implementação.",
    "<b>Estrutura:</b> dois papéis, um que pesquisa e outro que responde. Na primeira etapa a LLM atua como pesquisadora (interpreta o tema e extrai keywords); na segunda usa os resultados para montar a resposta final, de preferência no idioma do usuário.",
    "<b>A service é a camada de negócio:</b> recebe as keywords, consulta a API e agrega, interpreta e organiza termos relacionados, tópicos em ascensão, consultas associadas e sinais de relevância, em vez de repassar dado bruto.",
    "<b>Expor como tool:</b> define-se nome, descrição, schema de entrada e a função que chama a service. A service nunca é chamada manualmente dentro dos nós do grafo: o modelo decide."
   ],
   "como": [
    "<b>Prompt como limitador operacional:</b> a API tem plano gratuito com limite de consultas. A instrução de executar <b>apenas uma chamada</b> impede que o modelo entre em ciclos de refinamento e consuma a cota.",
    "<b>Diferença do fluxo tradicional:</b> antes você interpretaria a pergunta, extrairia as keywords no código, chamaria a API, processaria e só então devolveria à LLM. Agora a decisão de usar a service sai do código imperativo e vai para o modelo.",
    "<b>Reaproveitamento:</b> o mesmo padrão serve para enriquecer cadastro de clientes, buscar em serviços internos, análise de mercado, dados públicos e sistemas da empresa.",
    "A origem da capacidade muda (tool local, service interna, API externa ou servidor MCP), mas o mecanismo de exposição ao modelo é praticamente o mesmo."
   ],
   "aplica": [
    "Qualquer service existente que o agente deva acionar sob demanda.",
    "APIs pagas ou com cota, onde o prompt (e idealmente o código) precisa limitar o número de chamadas."
   ],
   "pros": [
    "A regra de negócio fica testável numa service comum.",
    "A resposta nasce de dados reais, não só da criatividade do modelo."
   ],
   "contras": [
    "Sem limite técnico no código, a única barreira contra chamadas repetidas é o prompt.",
    "Dependência de API externa com cota e chave."
   ],
   "traps": [
    "Confiar só no prompt para controlar custo de uma API paga.",
    "Passar dado bruto da API para o modelo em vez de uma estrutura enxuta e já interpretada.",
    "Esquecer de fornecer fixture ou modo desativado para desenvolver sem gastar a cota."
   ],
   "cola": [
    [
     "Service como tool",
     "Função de negócio exposta ao modelo com nome, descrição e schema"
    ],
    [
     "Researcher e responder",
     "Os dois nós: um busca dados (com a tool), outro redige a resposta"
    ],
    [
     "SerpAPI",
     "API usada para acessar o Google Trends (exige chave e tem cota gratuita)"
    ],
    [
     "Fixture",
     "Dado de exemplo devolvido quando a service está desativada"
    ],
    [
     "Autonomia controlada",
     "O modelo decide quando chamar, mas o prompt e a service impõem limites"
    ]
   ],
   "links": [
    [
     "Indicação 2: MCP na documentação do LangChain.js",
     "https://docs.langchain.com/oss/javascript/langchain/mcp"
    ],
    [
     "Código: 02-google-trends-agent",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/02-google-trends-agent"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica"
    ]
   ],
   "codigo": [
    {
     "proj": "02-google-trends-agent",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/02-google-trends-agent",
     "resumo": "Servidor Fastify com <code>POST /chat</code> e um grafo de dois nós (<code>researcher → responder</code>) no qual a tool <code>google_trends</code> envolve uma <code>SerpAPIService</code>. Existe uma versão única (não há par template/-z).",
     "fluxo": [
      "<code>src/graph/graph.ts</code>: <code>START → researcher → responder → END</code>; <code>src/graph/state.ts</code> guarda <code>messages</code>, <code>trendsData</code>, <code>question</code> e <code>keywords</code>.",
      "<code>src/graph/nodes/researcherNode.ts</code> chama <code>generateStructured</code> sem schema com o prompt de <code>prompts/v1/keywords.ts</code> («extraia exatamente 2 keywords e chame <code>google_trends</code> UMA vez, com as duas num único array; não responda sem chamar a tool»). Guarda <code>trendsData = JSON.stringify(result.data)</code>.",
      "<code>src/graph/nodes/responderNode.ts</code> monta o prompt com a pergunta e <code>trendsData</code> (<code>prompts/v1/videoTrends.ts</code>) e devolve um <code>AIMessage</code>; o system prompt pede recomendação concreta no idioma do usuário, de preferência pt-BR.",
      "<code>src/services/mcpService.ts</code> junta o MCP de filesystem (<code>process.cwd()</code>) com <code>createGoogleTrendsTool(serpAPIService)</code>.",
      "<code>src/tools/googleTrendsTool.ts</code>: <code>tool()</code> de nome <code>google_trends</code>, schema <code>z.object({ keywords: z.array(z.string()) })</code>, devolve <code>JSON.stringify(await service.getGoogleTrends(keywords))</code>.",
      "<code>src/services/serpApiService.ts</code>: se <code>config.disabled</code>, devolve a fixture <code>risingTrendFixture</code> (<code>data/trendingData.ts</code>); senão, para cada keyword chama <code>getJson</code> com <code>engine: 'google_trends'</code>, <code>date: 'now 7-d'</code> e <code>data_type: 'TIMESERIES'</code>.",
      "O parsing calcula média de interesse e tendência: <code>rising</code> se a média dos 3 últimos pontos passar de 1,2× a dos 3 primeiros, <code>declining</code> se ficar abaixo de 0,8×; consultas relacionadas (top 10) e tópicos em alta (top 5) são ordenados e cortados."
     ],
     "rodar": [
      "Node &gt;= 24.10; <code>npm i</code>; <code>cp .env.example .env</code> com <code>OPENROUTER_API_KEY</code> e <code>SERPAPI_API_KEY</code>.",
      "<code>npm start</code> sobe o servidor na porta 3000 e já dispara a pergunta fixa de <code>index.ts</code> (títulos para um vídeo sobre Web AI). Para economizar cota, troque <code>disabled</code> para <code>true</code> em <code>config.ts</code>.",
      "Não executei (sem chaves); análise por leitura de código."
     ],
     "armadilhas": [
      "O <code>README.md</code> da pasta descreve outro projeto («Prompt Chaining Article Generator», com <code>npm run generate</code>, MockLLMClient e pasta <code>tests/</code>); nada disso existe aqui. Os scripts <code>test*</code> do <code>package.json</code> apontam para <code>tests/</code>, que não existe.",
      "<code>trendsData</code> não é a resposta crua da tool: <code>generateStructured</code> devolve o texto da última mensagem do agente pesquisador, que é o que vai para o responder.",
      "<code>researcherNode</code> loga «Trends data fetched via tool call» mesmo que o modelo não tenha chamado a tool.",
      "<code>KeywordsSchema</code> e <code>VideoTrendsSchema</code> são exportados, mas nunca usados.",
      "<code>serpAPIConfig.cacheTTL</code> está definido em <code>config.ts</code> e a <code>SerpAPIService</code> declara um <code>cache: Map</code>, mas nenhum dos dois é usado: não há cache real.",
      "Não há limite técnico de chamadas da tool (nenhuma configuração de limite de iterações no agente): só o prompt manda chamar uma vez."
     ]
    }
   ]
  },
  {
   "id": "D3-04",
   "bloco": "d03-b2",
   "mod": "Unidade 3 · Aula 1",
   "emoji": "🧭",
   "read": "9 min",
   "title": "Vibe coding: arquivos de instrução, llms.txt e agents especializados",
   "short": "Delegar código à IA exige contexto persistente (instructions) e prompts divididos por papel (agents).",
   "oneliner": "Quando você delega código à IA, a qualidade do resultado depende mais de <b>como você instrui o modelo</b> do que da sua digitação. Dois instrumentos entram em cena: <b>arquivos de instrução</b> que descrevem o projeto e <b>agents</b>, prompts especializados com uma responsabilidade bem definida.",
   "vovo": [
    "É como receber um estagiário novo: se você entrega um manual do jeito da casa (como nomear coisas, onde ficam as pastas, o que é «pronto»), ele trabalha alinhado. Sem o manual, cada pedido sai de um jeito.",
    "E, em vez de um estagiário que faz tudo, você monta uma equipe: um que escreve código, outro que testa, outro que revisa. Cada um com um bilhete curto do que faz e do que não faz."
   ],
   "oque": [
    "<b>O que muda com vibe coding:</b> você passa a delegar tarefas à IA, e sem instruções bem definidas e agents especializados ela tende a gerar código inconsistente, fora do padrão ou desalinhado da arquitetura.",
    "<b>Arquivos de instrução:</b> documento que descreve o projeto para a IA (arquitetura, responsabilidade de cada camada, nomenclatura, convenções, decisões técnicas), um guia permanente consultado a cada geração de código.",
    "<b>Onde ficam:</b> normalmente em diretórios como <code>.github</code>, em arquivos markdown dedicados ou em arquivos de configuração do editor. Não servem à execução da aplicação, e sim a orientar as ferramentas de IA.",
    "<b>Problema do tamanho:</b> em projetos reais podem chegar a milhares de palavras, o que significa mais tokens, mais tempo e maior risco de perda de foco. A solução vem com as skills (<a href=\"#D3-05\">tópico 05</a>).",
    "<b>Geração automatizada:</b> ninguém escreve tudo à mão; ferramentas analisam o código, fazem perguntas sobre o projeto e geram o conjunto de regras.",
    "<b>llms.txt:</b> parecido com o <code>robots.txt</code>, mas para LLMs: em vez de a IA navegar por HTML, o site expõe um arquivo estruturado com descrição do sistema, links relevantes, perguntas frequentes e dados importantes. É diferente do arquivo de instrução, que é interno ao ambiente de desenvolvimento.",
    "<b>Agent:</b> essencialmente um prompt especializado com responsabilidade definida (código, testes, revisão, requisitos, integração). No editor se define nome, descrição, papel, instruções específicas e acesso a ferramentas."
   ],
   "como": [
    "<b>Exemplo do professor (agent de desenvolvimento):</b> TypeScript e Node.js, boas práticas de arquitetura, responsabilidade única, imutabilidade, testes automatizados, e regras claras de «pronto»: sem erro de compilação, testes passando, mudanças validadas antes de finalizar.",
    "<b>Tools e MCPs no agent:</b> leitura e escrita de arquivos, execução de comandos, acesso a documentação atualizada e integração com MCPs, para que ele não só gere código como execute ações no ambiente.",
    "<b>Divisão de responsabilidades:</b> um agent gera código, outro gera testes, outro valida qualidade, outro revisa. Prompts menores significam menos tokens, respostas mais rápidas, mais previsibilidade e menos erro.",
    "<b>Uso real:</b> consultar tarefas em sistemas de gestão, analisar comentários de code review, aplicar correções e validar antes de entregar. O papel do dev vira o de orquestrador de ferramentas e agentes.",
    "<b>Complemento da live de 24/02/2026:</b> os exemplos usaram <code>llms.txt</code> reais (Awesome You e AbacatePay); no front matter YAML dos agents e skills, a propriedade <code>user-invokable</code> permite invocar uma skill diretamente, sem passar pelo agent."
   ],
   "aplica": [
    "Padronizar o jeito do projeto para qualquer ferramenta de IA do time, em um arquivo versionado.",
    "Criar agents por papel (implementar, testar, planejar, curar) e restringir as ferramentas de cada um.",
    "Publicar um <code>llms.txt</code> para que agentes consumam a sua documentação sem raspar HTML."
   ],
   "pros": [
    "Consistência de código gerado e menos retrabalho.",
    "Prompts menores por agent: menos tokens e menos ambiguidade.",
    "Critérios de «pronto» explícitos aumentam a qualidade da entrega."
   ],
   "contras": [
    "Arquivos de instrução crescem e passam a consumir contexto.",
    "Agents com acesso amplo a ferramentas ampliam a superfície de risco."
   ],
   "traps": [
    "Um único prompt gigante que tenta fazer tudo.",
    "Dar a um agent todas as ferramentas disponíveis em vez do mínimo necessário.",
    "Confundir arquivo de instrução do projeto (interno) com <code>llms.txt</code> (exposto a agentes externos).",
    "Não definir quando a tarefa está concluída: o agent para cedo ou nunca."
   ],
   "cola": [
    [
     "Vibe coding",
     "Delegar a escrita do código à IA, guiando por instruções"
    ],
    [
     "Arquivo de instrução",
     "Documento persistente com arquitetura, convenções e decisões do projeto"
    ],
    [
     "llms.txt",
     "Arquivo estruturado para agentes consumirem informação de um site, como um robots.txt para LLMs"
    ],
    [
     "Agent",
     "Prompt especializado com papel, regras e ferramentas próprios"
    ],
    [
     "Front matter",
     "Bloco YAML no topo do markdown com as propriedades do agent"
    ],
    [
     "Critério de pronto",
     "Condições para dar a tarefa por concluída (compila, testes passam)"
    ]
   ],
   "links": [
    [
     "Código: 03-dev-instructions-agents/.github/agents",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/03-dev-instructions-agents/.github/agents"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica"
    ]
   ],
   "codigo": [
    {
     "proj": "03-dev-instructions-agents/.github/agents",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/03-dev-instructions-agents/.github/agents",
     "resumo": "Quatro definições de agents em markdown com front matter YAML: <code>developer.agent.md</code> (desenvolvimento TypeScript com disciplina de testes) e três agents de teste com Playwright (<code>planner</code>, <code>generator</code> e <code>healer</code>). Não há código executável: é prompt versionado.",
     "fluxo": [
      "<code>developer.agent.md</code>: front matter com <code>description</code> e <code>tools</code> (<code>vscode</code>, <code>execute</code>, <code>read</code>, <code>edit</code>, <code>search</code>, <code>web</code>, <code>agent</code>, <code>context7/*</code>, <code>todo</code>). Seções Mission («edições mínimas e seguras provadas por testes»), Success Criteria (sem erros de tipo, testes do arquivo e suíte completa passando, critérios de aceite atendidos), Scope (will do e won't do), Required User Inputs, Core Principles e Workflow (Plan, Edit, Test, Verify, Summary).",
      "No «Won't do» do developer: não introduzir padrões inseguros (<code>eval</code>, shell injection, segredos em log), não prosseguir com requisito ambíguo, não adicionar dependência sem justificativa, não criar <code>types.ts</code> nem <code>index.ts</code> de reexport.",
      "Core Principles: imutabilidade, responsabilidade única, injeção de dependência, tipos explícitos sem <code>any</code>; configuração em arquivos de config; prompts de LLM em <code>prompts/*.txt</code> e chamadas por interface injetada (<code>LLMClient</code>); testes com <code>node:test</code> e <code>node:assert/strict</code>, mock só nas fronteiras externas.",
      "<code>playwright-test-planner.agent.md</code>: declara <code>model: Claude Sonnet 4</code> e um MCP server <code>playwright-test</code> por stdio (<code>npx playwright run-test-mcp-server</code>); explora a interface com ferramentas <code>browser_*</code> e salva um plano de testes em markdown via <code>planner_save_plan</code>.",
      "<code>playwright-test-generator.agent.md</code>: usa ferramentas <code>playwright/*</code> para executar cada passo do plano em tempo real e então <code>generator_write_test</code> grava o teste (um por arquivo, dentro de um <code>describe</code> com o nome do item do plano).",
      "<code>playwright-test-healer.agent.md</code>: roda os testes (<code>test_run</code>), depura (<code>test_debug</code>), corrige seletores e asserts e repete; se tiver alta confiança de que o teste está certo, marca como <code>test.fixme()</code>. Proíbe esperar <code>networkidle</code>."
     ],
     "rodar": [
      "Não há nada para executar: copie a pasta <code>.github/agents</code> para um projeto e abra o chat do VS Code em modo agent para selecionar o agent.",
      "Os três agents Playwright dependem do MCP do Playwright estar disponível no editor."
     ],
     "armadilhas": [
      "O mesmo <code>developer.agent.md</code> (2647 bytes) é copiado dentro de <code>07-.../customers-mcp-z/.github/agents</code> (nas pastas template e -z) e de <code>08-.../customers-mcp-z/.github/agents</code>; se você ajustar um, os outros ficam defasados.",
      "O exemplo do generator contém <code>async { page } =&gt;</code>, que não é JavaScript válido (faltam os parênteses de desestruturação); é só exemplo dentro do prompt, mas pode ser copiado como está.",
      "O <code>description</code> do generator carrega placeholders em comentário HTML dentro de uma string de front matter: legível por humanos, ruidoso para quem automatiza.",
      "Os agents usam nomes de servidor diferentes (<code>playwright/*</code> no generator, <code>playwright-test/*</code> no planner e no healer); confira como o seu editor resolve cada um.",
      "O <code>developer</code> lista <code>context7/*</code> como ferramenta: o agent assume que esse MCP está configurado."
     ]
    }
   ]
  },
  {
   "id": "D3-05",
   "bloco": "d03-b2",
   "mod": "Unidade 3 · Aula 2",
   "emoji": "🧩",
   "read": "11 min",
   "title": "Skills: conhecimento modular carregado sob demanda",
   "short": "Em vez de um prompt gigante, pacotes pequenos de conhecimento que o modelo abre só quando precisa.",
   "oneliner": "Quanto maior o prompt, maior a chance de a IA se perder. <b>Skills</b> dividem o conhecimento em unidades pequenas e reutilizáveis (arquivos markdown com instruções, exemplos e referências) que o sistema escolhe e carrega <b>sob demanda</b>. Agents são papéis; skills são habilidades; MCP é execução e integração.",
   "vovo": [
    "Em vez de ler a enciclopédia inteira antes de cada tarefa, você deixa na estante vários manuais finos, cada um com a etiqueta do que ensina. Quando a tarefa é editar vídeo, você puxa só o manual de vídeo.",
    "Quem decide qual manual abrir é o próprio sistema, olhando as etiquetas. O MCP, nessa imagem, são as ferramentas da oficina; as skills são os manuais de como usá-las."
   ],
   "oque": [
    "<b>Problema dos prompts grandes:</b> há limite de tokens, o modelo não prioriza bem tudo, partes importantes podem ser ignoradas e a resposta perde consistência.",
    "<b>Skill:</b> conjunto de instruções focadas numa tarefa específica, com exemplos, boas práticas e contexto técnico, organizado em arquivos estruturados (em geral markdown). Pode apontar para outros documentos, criando uma estrutura navegável: a IA acessa o que precisa sob demanda.",
    "<b>Exemplos da aula:</b> escrever queries eficientes, usar uma biblioteca, interagir com uma API específica, executar tarefas no sistema operacional, usar uma ferramenta técnica como edição de vídeo. Com skills atualizadas, o modelo deixa de depender só do conhecimento pré-treinado.",
    "<b>Comparação com MCP:</b> ambos evitam sobrecarga de contexto, trabalham sob demanda e permitem descoberta incremental. MCP lida com execução e integração; skills lidam com instrução e conhecimento.",
    "<b>Skills e agents se complementam:</b> agents representam papéis (dev, QA, produto) e skills representam habilidades (banco de dados, testes, APIs). Diferente dos agents, você não escolhe a skill manualmente: o sistema identifica as relevantes.",
    "<b>Ecossistema:</b> repositórios de skills funcionam como gerenciadores de pacotes: buscar, instalar no projeto e reutilizar. Empresas podem criar skills próprias (padrões de API, regras de negócio, convenções de arquitetura) e compartilhar entre times."
   ],
   "como": [
    "<b>Anatomia (live):</b> <code>SKILL.md</code> é obrigatório (metadados YAML com ao menos <code>name</code> e <code>description</code>, mais instruções em markdown); <code>scripts/</code>, <code>references/</code> e <code>assets/</code> são opcionais.",
    "<b>Divulgação progressiva (live):</b> nível 1 carrega só nome e descrição (algo como 30 a 100 tokens) e a descrição funciona como gatilho; nível 2 carrega o corpo do <code>SKILL.md</code> quando o pedido bate com a descrição; nível 3 só lê <code>references/</code> ou roda <code>scripts/</code> se o corpo mandar.",
    "<b>CLI (live):</b> <code>npx skills add &lt;usuario/repositorio&gt;</code> baixa as skills do GitHub e instala nos diretórios dos agentes detectados na máquina (<code>.claude/skills/</code>, <code>.cursor/skills/</code>, <code>.windsurf/skills/</code>).",
    "<b>Integração com LangChain (aula):</b> skills também podem ser tratadas como fontes de contexto adicionais, documentos acessíveis via ferramentas ou referências que o modelo consulta dinamicamente.",
    "<b>Riscos (live):</b> skills rodam no mesmo ambiente do agente e herdam as permissões do terminal. O estudo SkillScan, citado na live (números não verificados: não localizei o estudo, só o que a live afirma), analisou mais de 42.000 skills comunitárias: 26,1% com vulnerabilidades, 13,3% com exfiltração de dados e 11,8% com escalonamento de privilégios; skills com pasta <code>scripts/</code> teriam 2,12× mais chance de ser maliciosas. Recomendação: tratar a instalação com o rigor de software em produção e bloquear scripts de terceiros até inspecionar."
   ],
   "aplica": [
    "Skill de banco de dados para o modelo escrever queries melhores sem inventar sintaxe.",
    "Skill de uma ferramenta de linha de comando (como o ffmpeg) com comandos e padrões prontos.",
    "Skills internas da empresa: padrões de API, convenções e fluxos operacionais."
   ],
   "pros": [
    "Menos tokens, respostas mais rápidas e mais precisas.",
    "Conhecimento atualizado, versionável e compartilhável.",
    "Carga sob demanda permite ter muitas skills instaladas sem custo fixo alto."
   ],
   "contras": [
    "A qualidade depende da descrição (gatilho) estar bem escrita.",
    "Skills de terceiros são código e texto confiados ao agente: risco de segurança (live)."
   ],
   "traps": [
    "Instalar skill comunitária sem ler o <code>SKILL.md</code> e os scripts.",
    "Escrever skill enorme num único arquivo, recriando o problema do prompt gigante.",
    "Esperar que skills substituam servidores MCP: uma ensina o processo, o outro dá acesso."
   ],
   "cola": [
    [
     "SKILL.md",
     "Arquivo principal da skill: front matter com name e description, mais instruções"
    ],
    [
     "references/",
     "Documentação extensa que a skill manda carregar só se necessário"
    ],
    [
     "Divulgação progressiva",
     "Carregar nome, depois corpo, depois referências, conforme a necessidade"
    ],
    [
     "npx skills",
     "CLI para buscar (find), instalar (add), checar (check) e atualizar (update) skills"
    ],
    [
     "skills-lock.json",
     "Registro de origem e hash de cada skill instalada"
    ],
    [
     "Trust tiers",
     "Níveis de confiança: skill não auditada só fornece texto, sem executar script (live)"
    ]
   ],
   "links": [
    [
     "Catálogo de skills (skills.sh, citado no refs.txt do módulo)",
     "http://skills.sh/"
    ],
    [
     "Skill ffmpeg usada no exemplo (skills.sh)",
     "https://skills.sh/digitalsamba/claude-code-video-toolkit/ffmpeg"
    ],
    [
     "Boas práticas de Postgres para agentes (Supabase, citado no refs.txt)",
     "https://supabase.com/blog/postgres-best-practices-for-ai-agents"
    ],
    [
     "Código: 04-skills",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/04-skills"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica"
    ]
   ],
   "codigo": [
    {
     "proj": "04-skills",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/04-skills",
     "resumo": "Três skills instaladas via <code>npx skills</code> em <code>.agents/skills/</code> (<code>ffmpeg</code>, <code>find-skills</code> e <code>neo4j-cypher-guide</code>), um <code>skills-lock.json</code>, o <code>refs.txt</code> da aula e dois vídeos de demonstração. Não há código de aplicação.",
     "fluxo": [
      "<code>.agents/skills/ffmpeg/SKILL.md</code> (13 KB): front matter com <code>name</code> e <code>description</code> (gatilhos como converter GIF para MP4, redimensionar, extrair áudio); depois «Quick Reference» com comandos <code>ffmpeg</code> (GIF para MP4, resize, compressão, áudio, corte, velocidade, concatenar, fades), seção específica para projetos Remotion, problemas comuns, tabela de qualidade (CRF) e otimização por plataforma (YouTube, Twitter/X, LinkedIn, web). <code>reference.md</code> traz as tabelas de filtros.",
      "<code>.agents/skills/find-skills/SKILL.md</code>: ensina o agente a achar skills para quem pergunta «como faço X»: <code>npx skills find [query]</code>, <code>npx skills add &lt;owner/repo@skill&gt;</code> (com <code>-g -y</code> para instalar global sem confirmação), <code>check</code> e <code>update</code>; mostra como apresentar a opção ao usuário e o que fazer se nada for encontrado.",
      "<code>.agents/skills/neo4j-cypher-guide/SKILL.md</code>: guia de Cypher moderno (evitar sintaxe removida como <code>id()</code>, filtrar nulos ao ordenar, <code>COUNT{}</code> e <code>EXISTS{}</code>, subqueries, QPP) com um trecho «When to Load Reference Documentation» que diz quando abrir cada arquivo de <code>references/</code> (<code>deprecated-syntax.md</code>, <code>subqueries.md</code>, <code>qpp.md</code>). É a divulgação progressiva dentro da própria skill.",
      "<code>skills-lock.json</code>: para cada skill, <code>source</code> (<code>digitalsamba/claude-code-video-toolkit</code>, <code>vercel-labs/skills</code>, <code>tomasonjo/blogs</code>), <code>sourceType: github</code> e <code>computedHash</code>.",
      "<code>refs.txt</code>: links de skills.sh, da skill de ffmpeg, do post da Supabase sobre Postgres para agentes e de um post no X. <code>video.mp4</code> (10 s, 1920x1080, 60 fps, ~1 MB) e <code>video_bw.mp4</code> (mesma duração e resolução, ~4 MB) servem à demonstração do ffmpeg; presumo que o segundo seja o resultado em preto e branco (não verifiquei o conteúdo)."
     ],
     "rodar": [
      "Para reproduzir: <code>npx skills add digitalsamba/claude-code-video-toolkit</code> e peça ao agente algo como converter ou comprimir o <code>video.mp4</code>; ele deve ativar a skill do ffmpeg pela descrição.",
      "A skill <code>neo4j-cypher-guide</code> faz mais sentido junto de um agente que gere Cypher (como o RAG com Neo4j da disciplina 02).",
      "Não executei <code>npx skills</code> nesta pesquisa; o conteúdo acima vem da leitura dos arquivos."
     ],
     "armadilhas": [
      "A skill <code>ffmpeg</code> tem 13 KB e foi escrita em torno de projetos Remotion: ela mesma contraria a ideia de skill pequena e pode carregar contexto que você não precisa.",
      "O repositório versiona dois vídeos (5 MB) dentro da pasta de skills; ao clonar só para estudar, eles pesam muito mais que o texto de toda a pasta.",
      "O mapa da apostila aponta para <code>04-skills</code> como um todo, mas as skills estão em <code>.agents/skills/</code> (pasta oculta): fácil de não achar na interface do GitHub ou do editor.",
      "<code>computedHash</code> no lock serve para detectar mudança, não prova que a skill é segura (lembre dos números do SkillScan, ainda que não verificados)."
     ]
    }
   ]
  },
  {
   "id": "D3-06",
   "bloco": "d03-b3",
   "mod": "Unidade 4 · Aulas 1 e 2",
   "emoji": "🔐",
   "read": "12 min",
   "title": "Servidor MCP do zero: tools, resources, prompts, testes via MCP Client e Inspector",
   "short": "CipherSuite MCP: criptografar e descriptografar via stdio, testado por um cliente MCP real e inspecionado no Inspector.",
   "oneliner": "Construir um <b>servidor MCP</b> é registrar capacidades com nome, descrição e schema numa instância de <code>McpServer</code>, expô-las por <b>stdio</b> e testar por um <b>cliente MCP</b> que sobe o servidor como processo. Tools executam, resources dão contexto e prompts guiam o uso, e o mesmo servidor serve testes, Inspector e VS Code.",
   "vovo": [
    "Imagine abrir uma lojinha: primeiro você escreve o teste «se eu pedir o produto X, recebo X» (e ele falha, porque a loja está vazia), depois põe o produto na prateleira com etiqueta de preço e instruções de uso.",
    "Além do produto (tool), você pendura na parede um cartaz explicando como a loja funciona (resource) e deixa pedidos pré-preenchidos no balcão (prompts). O Inspector é você abrindo a loja para um cliente de teste visitar."
   ],
   "oque": [
    "<b>Projeto focado no protocolo:</b> uma app que criptografa e descriptografa mensagens com uma chave. A lógica do algoritmo já vem pronta numa camada de serviço; o foco é expô-la por MCP: registro do servidor, definição de tools, validação de entrada e saída, comunicação cliente-servidor, testes e inspeção.",
    "<b>Criar o servidor:</b> uma instância com nome e versão marca a transição de uma aplicação comum para um serviço que fala MCP e pode ser descoberto por frameworks, editores e outras aplicações.",
    "<b>Transporte STDIO:</b> simula um MCP rodando localmente, como pacote ou processo na máquina do cliente. Reforça que MCP não é sinônimo de API web pública.",
    "<b>Tool:</b> nome, descrição, schema de entrada, schema de saída e implementação. Isso é mais rico que um function calling informal: o consumidor recebe uma descrição formal de como usar. O schema tem papel técnico (barrar chamadas inválidas) e semântico (ajudar a IA a usar corretamente).",
    "<b>Sucesso e erro:</b> em erro, retorna-se uma resposta marcada como erro com texto explicando; em sucesso, dois formatos: texto e uma estrutura JSON. Clientes diferentes consomem como preferirem.",
    "<b>Resource:</b> nome, URI, descrição e uma função que devolve conteúdo. Não é tool: não executa ação, devolve contexto. Aqui, uma «nota técnica» do servidor (algoritmo, requisitos da chave, formato de saída). <b>Resource template</b> serve para URIs parametrizadas (dinâmicas); a aula não usa.",
    "<b>Prompt:</b> nome, descrição, schema de argumentos e uma função que monta a mensagem (papel de usuário e texto explícito orientando o modelo a chamar a tool). É um atalho operacional que reduz erros de uso."
   ],
   "como": [
    "<b>TDD:</b> o teste vem antes de cada capacidade e falha de propósito; depois se implementa e vê-se passar. Cada teste é autossuficiente: o de descriptografia produz o próprio cenário, sem depender do anterior.",
    "<b>Cliente de teste:</b> um helper sobe um cliente MCP que inicia o servidor em outro processo por stdio e chama as tools. Você testa a integração real entre cliente e servidor, não funções internas.",
    "<b>Inspector:</b> ferramenta que conecta ao servidor e mostra abas de tools, resources e prompts (as duas últimas só aparecem depois de registradas). Permite chamar tools preenchendo parâmetros, testar chave errada e conteúdo inválido.",
    "<b>VS Code:</b> um arquivo de configuração em <code>.vscode</code> (nome, comando e argumentos) faz o editor iniciar o processo, descobrir as tools, carregar os prompts e permitir uso interativo. Escolher o prompt pede os argumentos do schema e o editor monta o texto que leva o modelo a chamar a tool.",
    "<b>Um servidor MCP continua sendo software:</b> organização de arquivos, separação de responsabilidades, testes, validação e tratamento de falhas continuam valendo. O que muda é o protocolo e a forma de expor as capacidades."
   ],
   "aplica": [
    "Qualquer capacidade interna (cripto, relatório, consulta) que você queira expor a agentes sem criar uma API pública.",
    "Prototipar um servidor local e distribuí-lo depois como pacote (ver <a href=\"#D3-13\">tópico 13</a>)."
   ],
   "pros": [
    "Contrato explícito (schemas) e testável por um cliente real.",
    "Mesmo servidor atende testes automatizados, Inspector e editor.",
    "stdio dispensa infraestrutura e portas de rede."
   ],
   "contras": [
    "No exemplo a lógica de cripto usa salt fixo no código (didático): não é para dados reais.",
    "Mensagens de erro detalhadas ajudam a depurar, mas a aula nota que em produção se exporia menos ao cliente final."
   ],
   "traps": [
    "Escrever <code>console.log</code> no servidor stdio: a saída padrão é o canal do protocolo (por isso o código usa <code>console.error</code>).",
    "Registrar só tools e esquecer resources e prompts, que dão contexto ao modelo.",
    "Testes encadeados, em que um depende do resultado do outro."
   ],
   "tip": "Antes de ligar ao editor, rode <code>npm run mcp:inspect</code>: é o jeito mais rápido de ver exatamente o que o seu servidor expõe.",
   "cola": [
    [
     "McpServer",
     "Classe do SDK que representa o servidor e onde se registram tools, resources e prompts"
    ],
    [
     "registerTool",
     "Registra tool com descrição, inputSchema e outputSchema; retorna content e structuredContent"
    ],
    [
     "registerResource",
     "Registra contexto de leitura identificado por URI"
    ],
    [
     "registerPrompt",
     "Registra template de prompt com schema de argumentos"
    ],
    [
     "StdioServerTransport",
     "Transporte que fala pela entrada e saída padrão do processo"
    ],
    [
     "isError",
     "Flag no resultado da tool para sinalizar falha"
    ],
    [
     "MCP Inspector",
     "UI para explorar e chamar tools, resources e prompts de um servidor"
    ]
   ],
   "links": [
    [
     "MCP Inspector (refs.txt do projeto)",
     "https://modelcontextprotocol.io/docs/tools/inspector"
    ],
    [
     "Indicação 1: What is MCP?",
     "https://modelcontextprotocol.io/docs/getting-started/intro"
    ],
    [
     "Código: 05-mcps-do-zero-z",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/05-mcps-do-zero-z"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica"
    ]
   ],
   "codigo": [
    {
     "proj": "05-mcps-do-zero-template e 05-mcps-do-zero-z",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/05-mcps-do-zero-z",
     "resumo": "Servidor <code>@erickwendel/ciphersuite-mcp</code> com duas tools (<code>encrypt_message</code> e <code>decrypt_message</code>), um resource (<code>encryption://info</code>) e um prompt (<code>encrypt_message_prompt</code>), usando <code>@modelcontextprotocol/sdk</code> e Zod. Roda TypeScript direto no Node, sem build.",
     "fluxo": [
      "<code>src/service.ts</code> (igual no template e no -z): <code>encrypt</code> deriva a chave com <code>scryptSync(passphrase, 'mcp-encrypter-salt', 32)</code>, gera IV de 16 bytes aleatórios, cifra em AES-256-CBC e devolve <code>&lt;iv hex&gt;:&lt;cifra hex&gt;</code>; <code>decrypt</code> separa pelo <code>:</code> e reverte.",
      "<code>src/index.ts</code> (-z): cria <code>StdioServerTransport</code>, faz <code>server.connect(transport)</code> e loga em <code>console.error</code> (<code>stdout</code> é do protocolo); erro fatal sai com código 1.",
      "<code>src/mcp.ts</code>: <code>new McpServer({ name: '@erickwendel/ciphersuite-mcp', version: '0.0.1' })</code>; as tools usam <code>inputSchema</code>/<code>outputSchema</code> com <code>zod/v3</code> e devolvem <code>content: [{ type: 'text', text }]</code> mais <code>structuredContent</code>; no <code>catch</code> devolvem <code>isError: true</code> com texto.",
      "<code>registerResource('encryption://info', 'encryption://info', { description }, handler)</code> devolve <code>contents</code> com <code>uri</code>, <code>mimeType: 'text/plain'</code> e o texto sobre algoritmo, derivação de chave e formato.",
      "<code>registerPrompt('encrypt_message_prompt', { description, argsSchema }, handler)</code> devolve <code>messages</code> com <code>role: 'user'</code> pedindo para usar a tool <code>encrypt_message</code> com a mensagem e a chave.",
      "<code>tests/helpers.ts</code>: <code>createTestClient</code> monta <code>StdioClientTransport</code> executando <code>node --experimental-strip-types src/index.ts</code> e conecta um <code>Client</code>. <code>tests/mcp.test.ts</code> (<code>node:test</code>): criptografa (tamanho &gt; 60), faz round-trip de descriptografia, lista o resource e compara o texto exato do prompt.",
      "<code>.vscode/mcp.json</code> (só no -z): servidor <code>ciphersuite-mcp</code> com <code>command: node</code> e <code>args: [--experimental-strip-types, src/index.ts]</code>. <code>refs.txt</code> aponta para a doc do Inspector."
     ],
     "rodar": [
      "Node 24 (o <code>engines</code> pede exatamente <code>v24.14.0</code>); <code>npm install</code>.",
      "<code>npm test</code>; <code>npm run mcp:inspect</code> abre o Inspector (<code>npx @modelcontextprotocol/inspector node src/index.ts</code>); <code>npm start</code> para o editor usar.",
      "<b>Verificado rodando</b> (Node 22.16 com <code>--experimental-strip-types</code>, SDK 1.27.1): os 4 testes passam; <code>listPrompts</code> devolve só <code>encrypt_message_prompt</code>; descriptografar com chave errada devolve <code>isError</code> com «bad decrypt» e um texto malformado devolve «Invalid initialization vector»."
     ],
     "armadilhas": [
      "O <code>README.md</code> lista um prompt <code>decrypt_message_prompt</code> e testes de chave errada e de ciphertext malformado que <b>não existem</b>: o código tem um único prompt e 4 testes. O README também sugere <code>npx @erickwendel/ciphersuite-mcp</code>, pacote que retornou 404 no npm quando consultei.",
      "No -z, o <code>package.json</code> mantém o nome <code>05-mcps-do-zero-template</code> e o <code>test</code> usa glob sem aspas (<code>tests/**/*.test.ts</code>), que depende de como o shell expande.",
      "Os testes passam o flag <code>--experimental-strip-types</code>, mas o <code>start</code> e o <code>mcp:inspect</code> usam <code>node src/index.ts</code> puro; no Node 24 isso funciona porque o strip de tipos já é padrão (hipótese, não rodei em 24).",
      "A chave derivada usa salt fixo: a mesma passphrase sempre gera a mesma chave; ok para demo, ruim como cripto real.",
      "Em erro, o servidor devolve o texto do erro do Node ao cliente: bom para depurar, vaza detalhes internos em produção."
     ],
     "templateVsZ": "O <b>template</b> só tem <code>src/index.ts</code> chamando <code>encrypt</code> e <code>decrypt</code> do <code>service.ts</code> direto e imprimindo no console: não há MCP, nem <code>mcp.ts</code>, nem <code>tests/</code>, nem <code>.vscode</code>. O <b>-z</b> adiciona o servidor, o transporte stdio, os testes e a configuração do VS Code."
    }
   ]
  },
  {
   "id": "D3-07",
   "bloco": "d03-b3",
   "mod": "Unidade 5 · Aulas 1 e 2",
   "emoji": "🏛️",
   "read": "11 min",
   "title": "API legada como MCP: não espelhe endpoints, separe camadas",
   "short": "O MCP vira uma camada de adaptação sobre a API existente: HTTP client, service e tools de domínio.",
   "oneliner": "Para conectar IA a um sistema legado você <b>não reescreve nada</b>: cria uma camada MCP separada que abstrai o domínio. A regra central é <b>não espelhar endpoints</b>; a arquitetura é <b>HTTP Client</b> (infraestrutura, sem regra de negócio), <b>service</b> (lógica) e <b>tools</b> (capacidades expostas).",
   "vovo": [
    "Um prédio antigo tem várias portinhas, cada uma para uma coisa. Em vez de ensinar o visitante a usar todas, você põe uma recepção na entrada: ele pede «quero falar com a Maria» e a recepcionista sabe por quais portas passar. O prédio continua o mesmo.",
    "A recepção é o MCP. Ela não mexe na estrutura do prédio, só traduz o pedido do visitante para o jeito antigo de funcionar."
   ],
   "oque": [
    "<b>Cenário (aula 1):</b> uma API legada de CRUD (criação, leitura, atualização, remoção), algo que quase toda empresa tem para clientes, alunos ou produtos. O objetivo é transformá-la em algo adequado à IA aplicada.",
    "<b>MCP não é espelhamento de endpoint:</b> uma tool por rota até funciona, mas desperdiça o valor do protocolo. Uma única ação do MCP pode chamar vários endpoints, combinar respostas, aplicar regras e esconder complexidade técnica.",
    "<b>Mapeamento direto REST para MCP</b> (existem ferramentas que fazem isso automaticamente) gera excesso de granularidade: o consumidor, LLM ou sistema, teria de conhecer muitos endpoints, combiná-los, fazer chamadas sequenciais e lidar com detalhes que não deveriam ser expostos.",
    "<b>Proxy inteligente:</b> a camada MCP fica entre a API legada e o cliente, organiza, transforma e prepara os dados. Permite evoluir o MCP sem alterar o sistema original; a API é o sistema de origem e o MCP é a camada de tradução.",
    "<b>Segurança desde a concepção:</b> a API da aula está aberta (sem autenticação nem autorização), aceitável como demo mas não em aplicação real. Ao publicar um MCP você cria uma camada de acesso que outras pessoas, sistemas e modelos podem consumir; isso exige governança (ver <a href=\"#D3-09\">tópico 09</a>).",
    "<b>Camadas (aula 2):</b> domínio (tipos, como o cliente com id, nome e telefone), infraestrutura (HTTP Client que só faz chamadas e converte respostas), serviço (agregações, validações, transformações, composição de chamadas) e MCP (expõe capacidades)."
   ],
   "como": [
    "<b>Ordem de trabalho da aula:</b> subir e testar a API legada primeiro (listar e criar) para não confundir problema de infraestrutura com erro da camada MCP; preparar o template; validar o HTTP Client com uma listagem; criar a camada de serviço (que ainda só repassa); escrever o teste da tool <code>listCustomers</code> (que falha), implementar a tool e registrá-la no servidor.",
    "<b>Fluxo completo de uma chamada:</b> cliente chama o MCP, o MCP chama a tool, a tool chama a service, a service chama o HTTP Client, o HTTP Client chama a API; a resposta volta pelo caminho inverso.",
    "<b>Schema de saída mesmo sem entrada:</b> uma tool sem parâmetros ainda define o output, o que ajuda validação, documentação implícita e entendimento do modelo.",
    "<b>Resource como documentação viva:</b> um resource descreve a API (URL base, endpoints, comportamento) e reduz a inferência do modelo. Ele é testado como as tools: listado, com a URI e a descrição esperadas. Depois se valida tudo no Inspector.",
    "<b>O template é ponto de partida, não prisão:</b> importa a coerência arquitetural, não decorar a estrutura. Erros a evitar: mapear endpoints direto, misturar regra de negócio com infraestrutura, não validar com testes, não documentar o comportamento."
   ],
   "aplica": [
    "Modernizar sistemas existentes sem reescrevê-los: o MCP como ponte para agentes (reduz custo, risco e tempo de adoção).",
    "Expor «buscar cliente por nome» mesmo que a API legada não tenha esse endpoint, compondo a busca na camada de serviço."
   ],
   "pros": [
    "A API original permanece intacta; evolução independente das duas partes.",
    "Responsabilidades separadas facilitam teste, manutenção e auditoria.",
    "Quem consome vê ações de negócio, não detalhes técnicos."
   ],
   "contras": [
    "Mais uma camada para manter e para proteger.",
    "Se o MCP herda as limitações da API (como exigir todos os campos no update), elas aparecem no contrato das tools."
   ],
   "traps": [
    "Validar o MCP antes de confirmar que a API legada está estável.",
    "Colocar regra de negócio no HTTP Client.",
    "Registrar a função da tool mas esquecer de ligá-la ao servidor: ela simplesmente não existe para o cliente.",
    "Deixar a API aberta e publicar o MCP por cima."
   ],
   "cola": [
    [
     "Camada de adaptação",
     "O MCP como interface sobre o sistema legado, sem alterá-lo"
    ],
    [
     "HTTP Client",
     "Adaptador técnico que fala com a API e converte respostas, sem regra de negócio"
    ],
    [
     "Service",
     "Camada de aplicação: lógica, agregações e composição de chamadas"
    ],
    [
     "Domain",
     "Tipos que representam os dados (cliente: _id, name, phone)"
    ],
    [
     "Resource api-info",
     "Documentação embutida da API no próprio servidor MCP"
    ],
    [
     "Espelhamento",
     "Uma tool por endpoint: o anti-padrão que a aula combate"
    ]
   ],
   "links": [
    [
     "Indicação 1: What is MCP?",
     "https://modelcontextprotocol.io/docs/getting-started/intro"
    ],
    [
     "MCP Inspector",
     "https://modelcontextprotocol.io/docs/tools/inspector"
    ],
    [
     "Código: 06-your-legacy-api-as-mcp",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/06-your-legacy-api-as-mcp"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica"
    ]
   ],
   "codigo": [
    {
     "proj": "06-your-legacy-api-as-mcp (API legada, template e estrutura em camadas)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/06-your-legacy-api-as-mcp",
     "resumo": "A pasta tem três projetos: <code>nodejs-fastify-mongodb-crud</code> (a API legada em Fastify 4 com MongoDB), <code>customers-mcp-template</code> (esqueleto do servidor MCP) e <code>customers-mcp-z</code> (resolvido). As tools de CRUD e o prompt estão no <a href=\"#D3-08\">tópico 08</a>.",
     "fluxo": [
      "<code>nodejs-fastify-mongodb-crud/src/index.js</code>: rotas <code>GET /v1/health</code>, <code>GET /v1/customers</code> (ordenado por nome), <code>GET /v1/customers/:id</code>, <code>POST</code>, <code>PUT</code> e <code>DELETE</code>; valida o <code>ObjectId</code> (400 para id inválido), usa schemas de resposta do Fastify, tem hook de CORS e exige <code>DB_NAME</code> fora de teste. Sobe na porta 9999.",
      "<code>nodejs-fastify-mongodb-crud/src/config.js</code> e <code>docker-compose.yml</code>: conexão <code>mongodb://root:example@localhost:27017</code> por padrão; <code>config/seed.js</code> recria 3 clientes de exemplo; <code>test/api.test.js</code> usa <code>server.inject</code> com seed antes de cada teste.",
      "<code>customers-mcp-template/src/mcp/server.ts</code>: só a constante <code>BASE_URL = 'http://localhost:9999/v1'</code> e <code>new McpServer({ name: '@erickwendel/ew-customers-mcp', version: '0.0.1' })</code>. As pastas <code>domain</code>, <code>application</code>, <code>infrastructure</code> e <code>mcp/{tools,prompts,resources}</code> existem vazias (só <code>.gitkeep</code>).",
      "<code>customers-mcp-z/src/infrastructure/customerHttpClient.ts</code>: classe com <code>fetch</code> para listar, criar, buscar por id, atualizar e remover; só faz HTTP e devolve o JSON.",
      "<code>customers-mcp-z/src/application/customerService.ts</code>: <code>CustomerService</code> instancia o client e delega; é aqui que mora a busca composta do <a href=\"#D3-08\">tópico 08</a>.",
      "<code>customers-mcp-z/src/mcp/server.ts</code>: cria <code>new CustomerService(BASE_URL)</code> e chama os <code>register*</code> de cada tool, do prompt e do resource.",
      "<code>customers-mcp-z/src/mcp/tools/listCustomers.ts</code>: <code>list_customers</code> sem entrada e com <code>outputSchema</code> de <code>customers: z.array(CustomerSchema)</code>; <code>resources/apiInfo.ts</code>: resource <code>customers://api-info</code> descrevendo base URL, endpoints e o formato do cliente."
     ],
     "rodar": [
      "API: <code>cd nodejs-fastify-mongodb-crud</code>, <code>npm ci</code>, <code>docker-compose up -d mongodb</code>, depois <code>npm start</code> (que executa <code>DB_NAME=customers node src/index.js</code>, sintaxe que não funciona no PowerShell). Para popular: <code>DB_NAME=customers node config/seed.js</code>.",
      "MCP: <code>cd customers-mcp-z</code>, <code>npm i</code>, <code>npm test</code> (precisa da API de pé) e <code>npm run mcp:inspect</code>.",
      "<b>Verificado rodando</b> (Node 22.16, MongoDB 8 em Docker): os 9 testes da API passam com <code>node --test test/api.test.js</code>; o <code>npm test</code> original usa <code>--test test/</code> (diretório), que funciona no Node 20 do <code>engines</code> mas falha no Node 22; os 6 testes do <code>customers-mcp-z</code> passam."
     ],
     "armadilhas": [
      "O <code>README.md</code> do <code>customers-mcp-z</code> (e do template) é uma cópia idêntica, byte a byte, do README do CipherSuite (<code>@erickwendel/ciphersuite-mcp</code>), e não descreve este projeto. A mesma cópia está nos <code>customers-mcp-z</code> de 07 e 08 (verificado com <code>cmp</code>).",
      "<b>Verificado:</b> <code>GET /v1/customers/:id</code> devolve <code>id</code> (não <code>_id</code>) e, quando não acha, o corpo é <code>{}</code>, porque o schema de resposta 404 só declara <code>message</code> e <code>id</code> e o código envia <code>{ error: ... }</code>. O <code>DELETE</code> de um id inexistente faz <code>return reply.code(404)</code> sem <code>send</code>: a requisição ficou pendurada até o timeout do curl.",
      "O <code>docker-compose.yml</code> da API traz credenciais fixas do MongoDB (<code>root</code>/<code>example</code>) e usa a chave <code>version</code>, que o Compose atual considera obsoleta.",
      "O workflow <code>run_tests.yaml</code> chama o passo de «Start Postgres and Adminer», mas sobe o MongoDB: nome herdado de outro projeto.",
      "A apostila diz que o template traz uma URL base apontando para a API original e que a aula evita complicar com variáveis de ambiente: confirmado, a URL está fixa no código (<code>localhost:9999</code>)."
     ],
     "templateVsZ": "O <b>template</b> tem <code>index.ts</code> idêntico, <code>server.ts</code> mínimo e as pastas de camadas vazias, mais <code>.vscode/mcp.json</code>. O <b>-z</b> preenche domínio, client, service, as cinco tools, o prompt <code>find_customer_prompt</code>, o resource e a suíte de testes. A única diferença no <code>package.json</code> é o nome do script: <code>dev</code> no template e <code>start:dev</code> no -z."
    }
   ]
  },
  {
   "id": "D3-08",
   "bloco": "d03-b3",
   "mod": "Unidade 5 · Aulas 3 e 4",
   "emoji": "🛠️",
   "read": "12 min",
   "title": "Tools de CRUD de clientes, busca composta, prompt e uso no VS Code",
   "short": "Cinco tools sobre a API legada, uma busca que a API não tinha e um prompt que guia o uso.",
   "oneliner": "Com as camadas prontas, a unidade completa o CRUD (listar, criar, atualizar, remover) e adiciona uma <b>busca composta</b> por id, nome ou telefone que a API original não oferece. Cada tool segue o mesmo padrão (descrição, schema de entrada e saída, callback), é guiada por teste e acaba usada em linguagem natural no VS Code.",
   "vovo": [
    "Na recepção do prédio, cada serviço ganha um formulário curto: «cadastrar», «atualizar», «remover». E a recepcionista ainda aprende a procurar por nome, coisa que o arquivo antigo não sabia fazer: ela folheia a lista e filtra.",
    "Quando o visitante diz «remova o cliente João», ela sozinha acha o João, pega o número dele e executa a remoção. Ele nunca disse qual formulário usar."
   ],
   "oque": [
    "<b>Criação (aula 3):</b> teste primeiro (nome e telefone entram, volta um id e uma mensagem). Antes de implementar, olha-se o retorno real da API: a criação não devolve o objeto, só confirmação e id. O contrato da tool respeita isso, com um tipo específico (<code>id</code>, <code>message</code>).",
    "<b>Busca como ação composta:</b> a API não tem busca flexível, então o MCP a constrói. Critérios opcionais (id, nome, telefone). Se há id, busca direta; senão lista todos e filtra em memória. Sem resultado, devolve nulo. Um prompt é criado para facilitar o uso.",
    "<b>Update e delete (aula 4):</b> o teste de update cria o próprio cliente (isolamento). Criação e atualização retornam estruturas parecidas, então nasce um tipo de <b>mutação</b> (id, mensagem, indicador de erro) que padroniza todas as operações de escrita.",
    "<b>Schema de update:</b> exige o id; os demais campos seguem o padrão do cliente, reaproveitando schemas já criados. No client, o id vai na URL e o resto no corpo (enviar o id nos dois lugares gerou erro na API).",
    "<b>Restrição da API:</b> o update exige todos os campos, não é um patch parcial; isso impacta o design da tool.",
    "<b>Delete:</b> só o id de entrada; saída com o padrão de mutação."
   ],
   "como": [
    "<b>Descrições e schemas guiam a IA:</b> ao definir bem nomes, descrições e schemas, a IA entende o que fazer, escolhe a tool certa e encadeia operações sem instruções explícitas.",
    "<b>Natural language no VS Code:</b> «remover cliente com determinado nome» faz o editor buscar o cliente, recuperar o id e só então executar o delete. A API original não tinha busca por nome; essa capacidade veio da camada de serviço.",
    "<b>Padrão de cada tool:</b> registrar no servidor, descrever, schema de entrada e de saída, callback; a service delega ao HTTP client.",
    "<b>Próximos passos citados pela aula:</b> prompts para todas as tools, melhores mensagens de retorno, autenticação e tratamento de erros mais robusto."
   ],
   "aplica": [
    "Qualquer CRUD legado que um agente deva manipular em linguagem natural.",
    "Criar ações compostas (buscar por nome) quando a API só oferece operações atômicas."
   ],
   "pros": [
    "Contrato único para operações de escrita (mutation) simplifica o consumo.",
    "Testes guiam a implementação e documentam o comportamento esperado."
   ],
   "contras": [
    "Busca em memória sobre a lista completa não escala: serve para a demo.",
    "As limitações da API (update total, ids) vazam para o schema se não forem tratadas."
   ],
   "traps": [
    "Inventar um formato de retorno diferente do da API real em vez de respeitá-lo.",
    "Um schema de update com campos opcionais sobre uma API que os exige: o modelo manda parcial e a chamada falha.",
    "Testes que dependem uns dos outros (o update precisa de um cliente existente: crie-o dentro do próprio teste)."
   ],
   "cola": [
    [
     "Mutation",
     "Tipo padrão de resposta de escrita: id, message e indicador de erro"
    ],
    [
     "Busca composta",
     "Tool que combina listagem e filtro para oferecer algo que a API não tem"
    ],
    [
     "structuredContent",
     "Retorno estruturado da tool, validado contra o outputSchema"
    ],
    [
     "find_customer_prompt",
     "Prompt que monta a instrução de busca a partir de _id, name ou phone"
    ],
    [
     "<code>Omit&lt;Customer, '_id'&gt;</code>",
     "Utilitário do TypeScript para impedir que o chamador envie o id na criação"
    ]
   ],
   "links": [
    [
     "MCP Inspector",
     "https://modelcontextprotocol.io/docs/tools/inspector"
    ],
    [
     "Código: 06-your-legacy-api-as-mcp/customers-mcp-z",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/06-your-legacy-api-as-mcp/customers-mcp-z"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica"
    ]
   ],
   "codigo": [
    {
     "proj": "06-your-legacy-api-as-mcp/customers-mcp-z (tools, prompt e testes)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/06-your-legacy-api-as-mcp/customers-mcp-z",
     "resumo": "Cinco tools (<code>list_customers</code>, <code>get_customer</code>, <code>create_customer</code>, <code>update_customer</code>, <code>delete_customer</code>), um prompt, um resource e testes de integração sobre a API real.",
     "fluxo": [
      "<code>src/domain/customer.ts</code>: <code>CustomerSchema</code> (<code>_id?</code>, <code>name</code>, <code>phone</code>), <code>CustomerQuerySchema</code> (tudo opcional), <code>CustomerUpdateSchema</code> (query com <code>_id</code> obrigatório) e <code>CustomerMutationSchema</code> (<code>id</code>, <code>message</code>, <code>isError</code>, mais <code>customer</code> e <code>customers</code> adicionados por causa de um erro de «additional properties», conforme o comentário FIX).",
      "<code>src/application/customerService.ts</code>: <code>findCustomer(query)</code> usa <code>getCustomerById</code> se houver <code>_id</code>; senão lista e usa <code>customers.find</code>, exigindo que cada campo informado esteja contido (<code>includes</code>) no cliente; sem match devolve <code>null</code>.",
      "<code>src/infrastructure/customerHttpClient.ts</code>: <code>createCustomer</code> faz <code>POST</code> com JSON; <code>updateCustomer</code> separa <code>{ _id, ...remaining }</code> e faz <code>PUT /customers/${_id}</code>; <code>deleteCustomer</code> faz <code>DELETE</code>; <code>getCustomerById</code> devolve <code>null</code> em 404.",
      "<code>src/mcp/tools/*.ts</code>: cada arquivo exporta um <code>register*Tool(server, service)</code>; <code>create_customer</code> tem saída <code>{ id, message }</code>; <code>update_customer</code> e <code>delete_customer</code> usam <code>CustomerMutationSchema.shape</code>; <code>get_customer</code> tem saída <code>customer: CustomerSchema.nullable()</code>. Todos têm <code>try/catch</code> que devolve <code>isError: true</code>.",
      "<code>src/mcp/prompts/findCustomer.ts</code>: <code>find_customer_prompt</code> com <code>argsSchema = CustomerQuerySchema.shape</code>; a mensagem pede para achar o cliente «using the get_customer or list_customers tool» com a query em JSON.",
      "<code>tests/tools/customers.test.ts</code> (4 testes: listar, criar, atualizar, remover), <code>tests/prompts/findCustomer.test.ts</code> e <code>tests/resources/apiInfo.test.ts</code>; <code>tests/helpers.ts</code> sobe o servidor por stdio. <code>.vscode/mcp.json</code> inicia <code>./src/index.ts</code> com <code>--experimental-strip-types</code>."
     ],
     "rodar": [
      "Suba a API (ver <a href=\"#D3-07\">tópico 07</a>), depois no <code>customers-mcp-z</code>: <code>npm i</code>, <code>npm test</code>, <code>npm run mcp:inspect</code>.",
      "No VS Code, abra o projeto, deixe o <code>.vscode/mcp.json</code> iniciar o servidor e peça em linguagem natural: criar, buscar e remover cliente.",
      "<b>Verificado rodando</b> (Node 22.16, MongoDB 8): os 6 testes passam. Cada execução cria clientes e não limpa, como a aula observa."
     ],
     "armadilhas": [
      "<b>Bug verificado:</b> <code>get_customer</code> por <code>_id</code> falha para qualquer cliente que chamou <code>listTools</code> antes (o fluxo normal de VS Code e LangChain): <code>McpError -32602: Structured content does not match the tool's output schema: data/customer must NOT have additional properties</code>. Causa: a API devolve <code>id</code>, o schema espera <code>_id</code>. Os testes não cobrem <code>get_customer</code>.",
      "<b>Verificado:</b> a busca por nome é <code>includes</code> sensível a maiúsculas (<code>name: 'jane'</code> não acha «Jane Doe»), devolve só o primeiro cliente que casar e, sem nenhum critério, devolve o primeiro cliente da lista (<code>[].every</code> é <code>true</code>).",
      "<b>Verificado:</b> <code>update_customer</code> só com <code>name</code> chega à API, que responde 400 «body must have required property 'phone'»; como o client não checa <code>res.ok</code>, isso volta como resultado normal, sem <code>isError</code>. Mesmo com <code>delete_customer</code> de um id inválido («the id is invalid!»).",
      "Os <code>catch</code> de <code>create</code>, <code>get</code>, <code>update</code> e <code>delete</code> dizem «Failed to list customers» (copiado da tool de listagem); <code>deleteCustomer.ts</code> importa <code>CustomerUpdateSchema</code> sem usar.",
      "Há prompt só para busca; a própria aula lista «prompts para todas as tools» como próximo passo."
     ],
     "templateVsZ": "Ver <a href=\"#D3-07\">tópico 07</a>: o template vem vazio nas camadas; o -z contém tudo acima."
    }
   ]
  },
  {
   "id": "D3-09",
   "bloco": "d03-b4",
   "mod": "Unidade 6 · Aulas 1 e 2",
   "emoji": "🛡️",
   "read": "11 min",
   "title": "Segurança da API: autenticação com JWT e autorização com RBAC",
   "short": "Tudo é privado exceto o que se libera; o JWT diz quem é, o papel (RBAC) diz o que pode.",
   "oneliner": "Antes de publicar um MCP, a API por trás dele precisa de três pilares: <b>autenticação</b>, <b>autorização</b> e <b>limitação de uso</b>. Esta aula cobre os dois primeiros no Fastify: <b>JWT</b> responde «quem é você?» e <b>RBAC</b> responde «o que você pode fazer?», num modelo <b>privado por padrão</b>.",
   "vovo": [
    "Um prédio comercial dá crachá a quem passa pela portaria (autenticação). Mas o crachá de visitante abre só a recepção, e o de gerente abre a sala do cofre: o que cada crachá abre é a autorização.",
    "A regra de ouro da portaria é: toda porta é trancada, exceto as poucas que a gente destranca de propósito (saguão e a própria portaria). Assim ninguém esquece uma porta aberta."
   ],
   "oque": [
    "<b>Mudança de foco:</b> até aqui o módulo mostrou como construir MCPs; agora trata de publicação real e dos pilares autenticação, autorização e limite de uso.",
    "<b>JWT:</b> o usuário informa credenciais, recebe um token assinado e o usa nas próximas chamadas. A apostila diz que o token pode expirar, o que protege em caso de vazamento. Faz sentido para usuários humanos e login clássico.",
    "<b>Por que MCP costuma usar outro modelo:</b> não é prático exigir usuário e senha, pedir token com frequência e lidar com expiração. O padrão comum são API keys permanentes em variáveis de ambiente; o risco é que elas não expiram sozinhas (por isso os service tokens, <a href=\"#D3-10\">tópico 10</a>).",
    "<b>RBAC (role-based access control):</b> decisões a partir do papel do usuário, não de regras soltas. No exemplo: <code>member</code> só lê; <code>admin</code> lê, cria, atualiza e remove.",
    "<b>Chave secreta do JWT:</b> garante a integridade do token. Em produção deve ser forte, protegida e fora do código (variável de ambiente ou gestão de segredos).",
    "<b>Camada própria de autenticação:</b> rotas públicas, login, verificação de token, autorização por papel e integração com os hooks do framework num módulo à parte, em vez de misturar no arquivo principal."
   ],
   "como": [
    "<b>Hook <code>onRequest</code> global:</b> executa no começo do ciclo da requisição, antes da lógica de negócio. Se a rota é pública, segue; senão exige autenticação. Segurança deve acontecer o mais cedo possível.",
    "<b>Rotas públicas:</b> health check, login e emissão de service token.",
    "<b>Login:</b> recebe <code>username</code> e <code>password</code> (body validado por schema), procura o usuário em memória com nome <b>case insensitive</b> e senha exata, e gera o JWT contendo também o <b>papel</b>; 401 em caso de falha.",
    "<b>Token como identidade transportada:</b> vai no header <code>Authorization: Bearer</code>; depois de validado, o contexto (username e role) fica na requisição e qualquer camada pode consultá-lo.",
    "<b>Hook <code>preHandler</code> por rota:</b> aplica o RBAC. Uma função reutilizável recebe o papel exigido e compara com o do usuário autenticado; sem permissão, responde erro 403. As rotas de escrita exigem <code>admin</code>.",
    "<b>Testes:</b> login válido e inválido, leitura autorizada, bloqueio de escrita para <code>member</code>, liberação para <code>admin</code>. A aula começa com muitos testes desabilitados no template, que servem de contrato.",
    "<b>Organização como segurança:</b> separar autenticação, autorização, regras de negócio, MCP e testes torna o sistema mais legível, auditável e fácil de evoluir; «projetos inseguros quase sempre também são mal organizados»."
   ],
   "aplica": [
    "Qualquer API que será consumida por agentes ou editores: aplicar privado por padrão antes de publicar o MCP.",
    "Separar usuários humanos (JWT com expiração) de integrações (service tokens)."
   ],
   "pros": [
    "JWT é stateless e conhecido; RBAC é simples e eficaz.",
    "O modelo «tudo privado, exceto o que eu libero» reduz o risco de esquecer uma rota exposta."
   ],
   "contras": [
    "RBAC simples não cobre permissões por recurso ou por cliente.",
    "Credenciais em memória e segredos no código servem à demonstração, não à produção."
   ],
   "traps": [
    "Marcar rota por rota como protegida em vez de proteger por padrão.",
    "Confundir autenticação com autorização.",
    "Deixar o segredo do JWT no código-fonte."
   ],
   "cola": [
    [
     "JWT",
     "Token assinado que carrega a identidade (aqui username e role) entre chamadas"
    ],
    [
     "RBAC",
     "Autorização baseada em papéis: member lê, admin escreve"
    ],
    [
     "onRequest",
     "Hook do Fastify executado no início da requisição: usado para autenticar"
    ],
    [
     "preHandler",
     "Hook executado antes do handler da rota: usado para autorizar por papel"
    ],
    [
     "Rota pública",
     "Rota liberada de autenticação (health, login, service-token)"
    ],
    [
     "Bearer",
     "Formato do header Authorization: <code>Bearer &lt;token&gt;</code>"
    ]
   ],
   "links": [
    [
     "Indicação 3: Security Best Practices (MCP)",
     "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices"
    ],
    [
     "Código: 07-api-security-auth-rate-limiting-z",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica"
    ]
   ],
   "codigo": [
    {
     "proj": "07-api-security-auth-rate-limiting-template e 07-api-security-auth-rate-limiting-z (API com JWT e RBAC)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z/nodejs-fastify-mongodb-crud-z",
     "resumo": "Cada pasta tem dois projetos: <code>nodejs-fastify-mongodb-crud-z</code> (a API, agora em Fastify 5 com <code>@fastify/jwt</code> e <code>@fastify/rate-limit</code>) e <code>customers-mcp-z</code> (o servidor MCP, tópico <a href=\"#D3-12\">12</a>). Esta aula e as duas seguintes usam <code>src/auth.js</code>.",
     "fluxo": [
      "<code>src/auth.js</code> define <code>authUsers</code> (<code>erickwendel</code>/<code>123123</code> como <code>admin</code>; <code>ananeri</code>/<code>1234</code> como <code>member</code>) e <code>JWT_SECRET = 'supersecret'</code>.",
      "<code>src/index.js</code>: <code>await fastify.register(fastifyJwt, { secret: JWT_SECRET })</code>, registra o rate limit e chama <code>initAuthRoute(fastify)</code>.",
      "<code>initAuthRoute</code> adiciona o hook <code>onRequest</code>: compara <code>request.originalUrl</code> com a lista <code>/v1/health</code>, <code>/v1/auth/login</code>, <code>/v1/auth/service-token</code>; senão extrai o token (<code>authorization.replace(/bearer /i, '')</code>), tenta o mapa de service tokens e, se não achar, faz <code>request.jwtVerify()</code>, respondendo <code>401 { message: 'Unauthorized' }</code> em falha.",
      "<code>POST /v1/auth/login</code>: body com <code>username</code> e <code>password</code> obrigatórios, resposta tipada; compara usuário com <code>toLocaleLowerCase()</code>, senha por igualdade; <code>fastify.jwt.sign({ username, role: user.role })</code>; <code>401 Invalid credentials</code> se não casar.",
      "<code>requireRole(role)</code> devolve um <code>preHandler</code> que, se <code>request.user.role !== role</code>, responde <code>403 Forbidden: insufficient permissions</code>; <code>index.js</code> aplica <code>preHandler: [requireRole('admin')]</code> em <code>POST</code>, <code>PUT</code> e <code>DELETE</code> de <code>/v1/customers</code>.",
      "<code>test/api.test.js</code>: cobre login, 401 sem token, RBAC de <code>member</code> (lê, mas não cria, atualiza ou remove) e os cenários CRUD, usando <code>server.inject</code> e seed por teste."
     ],
     "rodar": [
      "<code>cd nodejs-fastify-mongodb-crud-z</code>, <code>npm ci</code>, <code>docker-compose up -d mongodb</code> e <code>npm start</code> (ou <code>npm run infra:up</code> para subir também a API em container).",
      "<code>curl -X POST localhost:9999/v1/auth/login -H 'Content-Type: application/json' -d '{\"username\":\"erickwendel\",\"password\":\"123123\"}'</code> devolve <code>{ token }</code>; use em <code>Authorization: Bearer ...</code>.",
      "<b>Verificado rodando</b> (Node 22.16, MongoDB 8): <code>NODE_ENV=test node --test test/api.test.js</code> no -z passa os 24 testes."
     ],
     "armadilhas": [
      "<b>Verificado:</b> o payload do JWT contém só <code>username</code>, <code>role</code> e <code>iat</code>; não há <code>exp</code> (<code>sign</code> é chamado sem <code>expiresIn</code>). Ao contrário do que a apostila afirma («pode expirar»), o token do código nunca expira.",
      "O <code>username</code> vai para o token como foi digitado, não normalizado para o nome cadastrado (a comparação é case insensitive, mas o token guarda o valor original).",
      "<code>requireRole</code> compara por igualdade exata, não por hierarquia: um papel «superior» futuro precisaria ser tratado à mão.",
      "<code>JWT_SECRET</code>, senhas e o super secret estão no código e no README: ok para a aula, mas viola a própria recomendação de segredos fora do código.",
      "Usuário e senha são comparados com <code>===</code> em texto puro; sem hash e sem comparação em tempo constante.",
      "O README descreve os endpoints de autenticação inclusive na versão do template, que ainda não os implementa.",
      "Os scripts <code>start</code> e <code>dev</code> usam <code>DB_NAME=customers node ...</code> inline, sintaxe que falha no Windows nativo (o repositório tem guia em <code>troubleshooting/windows</code>)."
     ],
     "templateVsZ": "No <b>template</b>, <code>auth.js</code> só exporta <code>authUsers</code>, <code>index.js</code> não registra JWT nem rate limit e as rotas de escrita não têm <code>preHandler</code>; em <code>test/api.test.js</code>, quatro blocos estão com <code>describe.skip</code> (service-token, rate limit, login e RBAC de member), que você habilita conforme implementa. O <b>-z</b> traz <code>auth.js</code> completo, os registros e todos os testes ligados."
    }
   ]
  },
  {
   "id": "D3-10",
   "bloco": "d03-b4",
   "mod": "Unidade 6 · Aula 3",
   "emoji": "🔑",
   "read": "9 min",
   "title": "Service tokens: credencial persistente para MCPs e integrações",
   "short": "Um token opaco por integração, emitido com um super secret, que convive com o JWT.",
   "oneliner": "Editor, integração ou agente não fazem login manual nem renovam token toda hora. O <b>service token</b> funciona como uma API key: representa uma <b>integração</b>, não uma sessão de usuário, não expira sozinho e precisa ser guardado pelo servidor. É mais simples de usar e mais perigoso se vazar.",
   "vovo": [
    "O JWT é o ingresso de um dia do parque: expira e você compra de novo. O service token é o passe anual de um fornecedor: entra todo dia sem fila, e por isso, se for roubado, vale até alguém cancelar.",
    "Para emitir passe anual não basta ter o seu crachá: o gerente exige também uma senha especial, que só a administração conhece."
   ],
   "oque": [
    "<b>JWT:</b> expira, representa uma sessão de usuário, exige fluxo de login, ideal para humanos. <b>Service token:</b> não expira automaticamente, representa uma integração, é reutilizável, ideal para sistemas e MCPs.",
    "<b>Custo da simplicidade:</b> se um token vaza, continua válido e pode ser usado indefinidamente. Sistemas reais precisam de revogação manual, rotação de tokens e monitoramento de uso.",
    "<b>Super secret (super admin):</b> credencial extra, usada apenas para autorizar a criação de tokens, ligada a administradores e painéis internos. Evita que qualquer usuário gere tokens à vontade.",
    "<b>Emissão:</b> rota que recebe <code>username</code>, <code>password</code> e o super secret. Valida primeiro o super secret (rejeita se errado), reaproveita a validação de usuário já existente, gera um identificador aleatório e devolve o token com o papel do usuário.",
    "<b>Armazenamento:</b> diferente do JWT (stateless), o service token precisa ser guardado: token, usuário associado e papel. A aula usa memória; em sistema real, banco ou outro armazenamento persistente."
   ],
   "como": [
    "<b>Dois caminhos no mesmo hook:</b> o token do header é procurado na estrutura de service tokens; se existe, o usuário é considerado autenticado e o contexto vai direto para a requisição; senão segue o fluxo de JWT.",
    "<b>Resultado unificado:</b> independentemente do método, a requisição fica com usuário e papel. O restante da aplicação, incluindo o RBAC, não sabe qual método foi usado. Um token de <code>admin</code> escreve; um de <code>member</code> só lê.",
    "<b>Header:</b> reutiliza <code>Authorization: Bearer</code> por simplicidade (uma prática comum seria um header dedicado) e o backend diferencia os tipos. Sem header, o fluxo não quebra: segue e responde 401.",
    "<b>Para o MCP:</b> gerar o token, guardar em variável de ambiente e reaproveitar automaticamente, no mesmo padrão de outros serviços externos.",
    "<b>Antes de produção:</b> persistência dos tokens, revogação, auditoria de uso, rotação periódica e proteção do super secret."
   ],
   "aplica": [
    "Dar a cada MCP ou integração um token próprio, com papel mínimo (um <code>member</code> para um agente só de leitura).",
    "Convivência de dois modelos: JWT para usuários, service token para sistemas."
   ],
   "pros": [
    "Sem login nem renovação para o consumidor.",
    "Identifica o cliente e permite aplicar papel e limite por token."
   ],
   "contras": [
    "Não expira: vazamento tem impacto longo.",
    "Precisa de armazenamento e de ciclo de vida (revogar, rotacionar)."
   ],
   "traps": [
    "Tratar service token como JWT e esperar expiração.",
    "Guardar tokens só em memória e esquecer que um restart os invalida.",
    "Deixar o super secret acessível a qualquer usuário."
   ],
   "cola": [
    [
     "Service token",
     "Credencial opaca (UUID) de integração: reutilizável, sem expiração automática"
    ],
    [
     "adminSuperSecret",
     "Segredo extra exigido para emitir service tokens"
    ],
    [
     "issuedServiceTokens",
     "Mapa em memória: token, usuário e papel"
    ],
    [
     "Rotação",
     "Trocar tokens periodicamente para limitar o dano de vazamentos"
    ],
    [
     "Revogação",
     "Invalidar um token específico antes de qualquer expiração"
    ]
   ],
   "links": [
    [
     "Indicação 3: Security Best Practices (MCP)",
     "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices"
    ],
    [
     "Código: 07-api-security-auth-rate-limiting-z",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica"
    ]
   ],
   "codigo": [
    {
     "proj": "07-api-security-auth-rate-limiting-z (service token na API)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z/nodejs-fastify-mongodb-crud-z",
     "resumo": "Mesmo <code>src/auth.js</code> do tópico anterior: a rota <code>POST /v1/auth/service-token</code> e o mapa em memória que o hook <code>onRequest</code> consulta.",
     "fluxo": [
      "<code>ADMIN_SUPER_SECRET = 'AM I THE BOSS?'</code> e <code>const issuedServiceTokens = new Map()</code> em <code>src/auth.js</code>.",
      "<code>POST /v1/auth/service-token</code>: body obrigatório <code>username</code>, <code>password</code>, <code>adminSuperSecret</code>; <code>401 Invalid adminSuperSecret</code> se o segredo não bate; depois a mesma busca de usuário do login (<code>401 Invalid credentials</code>).",
      "Sucesso: <code>randomUUID()</code> como token, <code>issuedServiceTokens.set(serviceToken, { username, role })</code> e resposta <code>{ serviceToken, role }</code>.",
      "No <code>onRequest</code>, <code>issuedServiceTokens.get(token)</code> acerta antes de qualquer verificação de JWT e define <code>request.user</code>.",
      "<code>customers-mcp-z/getServiceToken.sh</code> emite um token de admin e um de member via <code>curl</code> e <code>jq</code> e testa a listagem com o de member.",
      "<code>test/api.test.js</code>: bloco «POST /v1/auth/service-token» (token de admin, de member, super secret errado, credencial errada) e «Service token - API access &amp; rate limiting»."
     ],
     "rodar": [
      "<code>curl -X POST localhost:9999/v1/auth/service-token -H 'Content-Type: application/json' -d '{\"username\":\"erickwendel\",\"password\":\"123123\",\"adminSuperSecret\":\"AM I THE BOSS?\"}'</code>.",
      "Use o <code>serviceToken</code> retornado como <code>Authorization: Bearer ...</code> nas rotas protegidas."
     ],
     "armadilhas": [
      "<b>Verificado:</b> o <code>README.md</code> diz que o endpoint de service token é limitado a «3 requisições por minuto»; no código só existe o limite global de 90 por minuto (<code>REQUESTS_PER_MINUTE</code>). Seis emissões seguidas retornaram 200.",
      "Tokens vivem só na memória do processo: reiniciar a API invalida todos os service tokens e o MCP passa a receber 401 até você emitir outro.",
      "Quem tiver o super secret emite quantos tokens quiser, sem expiração nem revogação no código; e o segredo é comparado com <code>!==</code> (sem comparação em tempo constante) e está publicado no README e nos scripts.",
      "<code>.vscode/mcp.json</code> do MCP traz um UUID de service token commitado: só funciona enquanto aquele processo da API estiver vivo, mas acostuma o time a versionar credencial.",
      "Os comentários de <code>index.js</code> mostram o header alternativo <code>X-Service-Token</code>, não adotado."
     ],
     "templateVsZ": "No <b>template</b> não existe a rota de emissão nem o mapa; os dois blocos de teste relacionados estão em <code>describe.skip</code>. O -z tem tudo implementado."
    }
   ]
  },
  {
   "id": "D3-11",
   "bloco": "d03-b4",
   "mod": "Unidade 6 · Aula 4",
   "emoji": "🚦",
   "read": "8 min",
   "title": "Rate limiting: confiança zero, limite por token e resposta 429",
   "short": "Mesmo autenticado e autorizado, o cliente respeita um teto de requisições por janela de tempo.",
   "oneliner": "Parta do princípio de <b>confiança zero</b>: um cliente legítimo pode entrar em loop, errar na implementação ou ser abusado. O <b>rate limiting</b> é a terceira camada, depois de autenticação e autorização: define máximo de requisições por janela, identifica o cliente (pelo token, com IP de reserva) e responde <b>429</b> quando o teto estoura.",
   "vovo": [
    "Um restaurante com garçons treinados (autenticação) e cardápio por mesa (autorização) ainda põe um limite: cada mesa pode pedir no máximo certo número de pratos por minuto. Quem normalmente pede 10 e de repente pede 1000 está com problema, ou é golpe.",
    "O limite protege a cozinha e o caixa, principalmente quando cada prato consome um ingrediente caro (como chamar um modelo de linguagem pago)."
   ],
   "oque": [
    "<b>Confiança zero:</b> não assuma que o cliente se comporta bem; loops acidentais, erros de implementação, uso indevido e ataques automatizados acontecem.",
    "<b>Por que é essencial:</b> um salto de 10 para 1000 requisições por minuto pode indicar bug, abuso ou ataque; e, se a API consome serviços pagos por requisição ou token (modelos de linguagem), sem controle há custo inesperado e até indisponibilidade.",
    "<b>Camada adicional:</b> mesmo autenticado e autorizado, o cliente respeita limites. É prática padrão em API pública madura.",
    "<b>Configuração central:</b> quantidade máxima de requisições e janela de tempo (exemplo da aula: 90 por minuto). Janela por minuto tolera picos melhor que por segundo.",
    "<b>Quem é o cliente:</b> a própria credencial de autenticação (JWT ou service token); sem token, o IP serve de fallback. Isso reaproveita o padrão do header de autorização e mantém consistência entre autenticação e limite.",
    "<b>Plugin do framework:</b> resolve contagem, janela, bloqueio automático e resposta padronizada, em vez de reinventar."
   ],
   "como": [
    "<b>Teste com limite baixo:</b> a aula usa 1 requisição por minuto para reproduzir fácil (a primeira passa, a segunda falha) e depois restaura o valor real.",
    "<b>Resposta de erro:</b> código <b>429 Too Many Requests</b>, com mensagem de limite excedido e quando tentar de novo, o que permite ao cliente implementar retry sem agressividade.",
    "<b>Limite por token:</b> dois clientes não competem entre si; cada integração tem seu controle de uso. Usuários de JWT também são limitados individualmente.",
    "<b>Rotas públicas:</b> o fallback por IP mitiga ataques simples em endpoints abertos.",
    "<b>Impacto no MCP:</b> MCPs automatizam chamadas, encadeiam operações e executam tarefas em sequência; sem limite podem gerar carga muito alta. O limite evita sobrecarga, controla custo e mantém estabilidade.",
    "<b>Evolução para produção:</b> limites por tipo de cliente, planos (free, premium), monitoramento e métricas, bloqueio automático por comportamento suspeito."
   ],
   "aplica": [
    "Proteger APIs consumidas por agentes, que podem chamar em sequência e em loop.",
    "Separar tetos por papel ou plano em vez de um valor único."
   ],
   "pros": [
    "Protege disponibilidade e custo com pouco código (plugin).",
    "O 429 dá ao cliente um sinal claro para recuar."
   ],
   "contras": [
    "Limite por token pode ser contornado criando vários tokens (a própria aula cita combinar token e IP).",
    "O valor certo depende do perfil da aplicação: ou barra uso legítimo, ou deixa abuso passar."
   ],
   "traps": [
    "Limitar por segundo de forma rígida e prejudicar picos legítimos.",
    "Achar que autenticação e autorização dispensam controle de volume.",
    "Esquecer de restaurar o limite alto depois de testar com valor baixo."
   ],
   "cola": [
    [
     "Rate limiting",
     "Teto de requisições por cliente numa janela de tempo"
    ],
    [
     "429",
     "Too Many Requests: resposta quando o limite é excedido"
    ],
    [
     "keyGenerator",
     "Função que decide quem é o cliente do limite (aqui, token ou IP)"
    ],
    [
     "timeWindow",
     "Janela de contagem (1 minuto no projeto)"
    ],
    [
     "Confiança zero",
     "Não presumir bom comportamento do cliente, mesmo autenticado"
    ]
   ],
   "links": [
    [
     "Indicação 3: Security Best Practices (MCP)",
     "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices"
    ],
    [
     "Código: 07-api-security-auth-rate-limiting-z",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica"
    ]
   ],
   "codigo": [
    {
     "proj": "07-api-security-auth-rate-limiting-z (rate limit na API)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z/nodejs-fastify-mongodb-crud-z",
     "resumo": "O limite é configurado em <code>src/config.js</code> e <code>src/auth.js</code> e registrado em <code>src/index.js</code> com <code>@fastify/rate-limit</code>.",
     "fluxo": [
      "<code>src/config.js</code>: <code>export const REQUESTS_PER_MINUTE = 90</code>.",
      "<code>src/auth.js</code>: <code>rateLimitOptions = { max: REQUESTS_PER_MINUTE, timeWindow: '1 minute', keyGenerator: (request) =&gt; request.headers?.authorization?.replace(/bearer /i, '') ?? request.ip }</code>.",
      "<code>src/index.js</code>: <code>await fastify.register(fastifyRateLimit, rateLimitOptions)</code>, depois do JWT e antes de <code>initAuthRoute</code>.",
      "<code>test/api.test.js</code> (bloco «Service token - API access &amp; rate limiting»): emite um service token, faz <code>REQUESTS_PER_MINUTE</code> chamadas a <code>GET /v1/customers</code> esperando 200 e a próxima esperando 429. Importa a constante em vez de usar o 1 req/min da aula."
     ],
     "rodar": [
      "Com a API de pé, em loop: <code>for i in $(seq 1 100); do curl -s -o /dev/null -w '%{http_code}\\n' localhost:9999/v1/customers -H \"Authorization: Bearer $SERVICE_TOKEN\"; done | sort | uniq -c</code> deve mostrar 200 e depois 429.",
      "Para ver o efeito rápido, baixe <code>REQUESTS_PER_MINUTE</code> em <code>config.js</code> (o teste acompanha a constante)."
     ],
     "armadilhas": [
      "<b>Verificado:</b> 95 requisições seguidas com o mesmo token <b>inválido</b> responderam sempre 401, nenhuma 429. O hook global de autenticação responde 401 antes do limitador (que atua por rota), então tentativas com token inválido não são limitadas: dá para tentar adivinhar tokens sem teto. A causa que apontei (ordem dos hooks) é hipótese; o resultado observado é certo.",
      "<b>Verificado:</b> em rotas públicas o limite por IP funciona: repetir <code>POST /v1/auth/login</code> com senha errada passou a retornar 429.",
      "A chave do limitador é o header bruto, sem validar: como service tokens são ilimitados para quem tem o super secret, o contorno por múltiplos tokens citado pela aula é fácil.",
      "Só há um teste de limite, com service token; não há teste para JWT nem para o fallback por IP (que a aula descreve).",
      "No contêiner, o IP visto pela API pode ser o do proxy ou do Docker, o que afetaria o fallback por IP (hipótese, não testei)."
     ],
     "templateVsZ": "O <b>template</b> não tem <code>rateLimitOptions</code> nem o registro do plugin e o teste de limite está em <code>describe.skip</code>."
    }
   ]
  },
  {
   "id": "D3-12",
   "bloco": "d03-b4",
   "mod": "Unidade 6 · Aula 5",
   "emoji": "🧱",
   "read": "11 min",
   "title": "O MCP como cliente real da API: service token obrigatório e erros estruturados",
   "short": "O servidor só sobe com SERVICE_TOKEN e traduz 401, 403 e 429 em respostas que a IA entende.",
   "oneliner": "O MCP passa a ser um <b>cliente real</b> da API: exige um <b>service token</b> por variável de ambiente (sem ele o servidor nem inicia), envia o token em toda chamada e converte erros de autenticação, autorização e limite em <b>respostas estruturadas</b> que o modelo consegue interpretar.",
   "vovo": [
    "O recepcionista agora só começa o expediente se tiver o crachá no bolso; sem crachá, nem abre a porta (falhar no início é melhor que trabalhar em estado inválido).",
    "E quando o prédio responde «você não tem permissão» ou «você ligou demais», ele não fica mudo: escreve um bilhete claro para o visitante entender o que aconteceu."
   ],
   "oque": [
    "<b>Antes e depois:</b> antes, chamadas diretas, sem controle e sem segurança; depois, autenticação obrigatória, autorização consistente, limites definidos e comportamento previsível. É o que diferencia protótipo de solução real.",
    "<b>Uso obrigatório do service token:</b> vem da variável de ambiente; se não estiver configurada, o servidor MCP não inicia. A verificação acontece na inicialização: é melhor falhar na partida do que rodar em estado inválido.",
    "<b>Variável de ambiente:</b> evita expor o token no código-fonte, hardcode e vazamento acidental; é o mesmo modelo de outros MCPs.",
    "<b>Camada de infraestrutura:</b> toda requisição do MCP leva o header de autorização com o service token, o que permite à API autenticar, aplicar RBAC e aplicar rate limiting.",
    "<b>Tratamento de erros na origem:</b> token inválido, acesso negado e limite excedido são capturados e viram respostas estruturadas, com um indicador de erro. A IA entende claramente que algo deu errado e a falha não é silenciosa.",
    "<b>RBAC dentro do MCP:</b> com token de <code>member</code>, o MCP funciona mas operações de escrita são bloqueadas; com <code>admin</code>, todas funcionam."
   ],
   "como": [
    "<b>Testes específicos de falha:</b> token inválido, ausência de token e limite excedido, além dos cenários felizes. Para testar o ambiente completo: subir banco, build da aplicação e execução em contêiner.",
    "<b>VS Code:</b> o MCP é configurado com o service token no <code>mcp.json</code>; o editor usa automaticamente. Em linguagem natural (criar e remover cliente) a IA escolhe a tool e tudo respeita autenticação, autorização e limite.",
    "<b>Possível bypass:</b> se o limite é por token e o usuário usa vários service tokens, ele contorna parcialmente o limite. Em ambiente real combina-se identificação por token e por IP.",
    "<b>Próximo passo da aula:</b> tornar o MCP acessível a outras pessoas: publicação, distribuição e uso externo (<a href=\"#D3-13\">tópico 13</a>)."
   ],
   "aplica": [
    "Qualquer MCP que fale com uma API protegida: credencial por variável de ambiente e erro estruturado.",
    "Dar a agentes de leitura um token <code>member</code>, e só dar <code>admin</code> a quem precisa escrever."
   ],
   "pros": [
    "Falha rápida e explícita na inicialização.",
    "A IA recebe mensagens de erro úteis em vez de um silêncio.",
    "Permissões da API continuam valendo dentro do MCP."
   ],
   "contras": [
    "A credencial fica na configuração do cliente do MCP (arquivo do editor), exposta a quem lê a configuração.",
    "Token sem expiração: o dano de um vazamento depende de revogação e rotação que o projeto não implementa."
   ],
   "traps": [
    "Subir o MCP sem credencial e deixar cada chamada falhar de forma obscura.",
    "Commitar o <code>.vscode/mcp.json</code> com o token real.",
    "Devolver a exceção bruta em vez de uma resposta estruturada que o modelo entenda."
   ],
   "cola": [
    [
     "SERVICE_TOKEN",
     "Variável de ambiente exigida pelo servidor MCP para falar com a API"
    ],
    [
     "Falha na partida",
     "Encerrar o processo na inicialização se faltar configuração essencial"
    ],
    [
     "UnauthorizedError, ForbiddenError, RateLimitError",
     "Erros de domínio mapeados de 401, 403 e 429"
    ],
    [
     "Erro estruturado",
     "Resposta com campo de erro e mensagem, não exceção solta"
    ],
    [
     "Bypass por vários tokens",
     "Contornar limite por token criando outros tokens"
    ]
   ],
   "links": [
    [
     "Indicação 3: Security Best Practices (MCP)",
     "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices"
    ],
    [
     "Código: 07-api-security-auth-rate-limiting-z/customers-mcp-z",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z/customers-mcp-z"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica"
    ]
   ],
   "codigo": [
    {
     "proj": "07-api-security-auth-rate-limiting-template e -z (customers-mcp-z com service token)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/07-api-security-auth-rate-limiting-z/customers-mcp-z",
     "resumo": "O servidor MCP de clientes evoluído do <a href=\"#D3-08\">tópico 08</a>: exige <code>SERVICE_TOKEN</code>, manda <code>Authorization: Bearer</code> à API, mapeia status HTTP em erros de domínio e devolve erros estruturados.",
     "fluxo": [
      "<code>src/index.ts</code>: lê <code>process.env.SERVICE_TOKEN ?? ''</code> e, se vazio, loga «[error]: SERVICE_TOKEN env var is required» e faz <code>process.exit(1)</code> antes de conectar o transporte.",
      "<code>src/mcp/server.ts</code>: <code>new CustomerService(BASE_URL, process.env.SERVICE_TOKEN!)</code> e registra as cinco tools, o resource e o prompt.",
      "<code>src/infrastructure/customer-http-client.ts</code>: monta <code>authHeaders = { Authorization: `Bearer ${serviceToken}` }</code>; <code>#assertOk</code> lança <code>UnauthorizedError</code> (401), <code>ForbiddenError</code> (403), <code>RateLimitError</code> (429) ou <code>Error('HTTP status - texto - corpo')</code>; <code>getCustomerById</code> trata 404 e 400 como <code>null</code>.",
      "<code>src/domain/errors.ts</code>: as três classes com mensagens padrão («Unauthorized: service token is missing or invalid», «Forbidden: token does not have sufficient permissions», «Rate limit exceeded. Please try again later.»).",
      "<code>src/mcp/tools/*.ts</code> (nomes em kebab-case, como <code>create-customer.ts</code>): no <code>catch</code> devolvem <code>content</code> com a mensagem e <code>structuredContent: { isError: true, message }</code>. Todas usam <code>CustomerMutationSchema.shape</code> como <code>outputSchema</code>.",
      "<code>tests/helpers.ts</code>: <code>getServiceToken()</code> pede um token de admin à API e <code>createTestClient(token)</code> sobe o servidor passando <code>SERVICE_TOKEN</code> no <code>env</code> do transporte. <code>tests/tools/customers.test.ts</code> tem 11 testes (CRUD, id inválido, token inválido, rate limit); <code>tests/resources/api-info.test.ts</code> tem 2.",
      "<code>.vscode/mcp.json</code>: <code>env.SERVICE_TOKEN</code> com um UUID fixo; <code>getServiceToken.sh</code> emite tokens; <code>.github/agents/developer.agent.md</code> é o agent do <a href=\"#D3-04\">tópico 04</a>."
     ],
     "rodar": [
      "Suba a API (<a href=\"#D3-09\">tópico 09</a>), rode <code>bash getServiceToken.sh</code>, copie o token para o <code>.vscode/mcp.json</code> e <code>npm test</code> (o teste emite o próprio token).",
      "<code>SERVICE_TOKEN=... npm run mcp:inspect</code> para ver as tools no Inspector.",
      "<b>Verificado rodando</b> (Node 22.16, MongoDB 8): os 13 testes passam; sem <code>SERVICE_TOKEN</code> o processo sai com a mensagem de erro; token de <code>member</code> bloqueia <code>create_customer</code> com «Forbidden: token does not have sufficient permissions» e lista normalmente."
     ],
     "armadilhas": [
      "<b>Verificado:</b> <code>get_customer</code> por <code>_id</code> lança <code>McpError -32602 ... must NOT have additional properties</code> para clientes que chamam <code>listTools</code> (mesma causa do <a href=\"#D3-08\">tópico 08</a>: a API devolve <code>id</code>). O teste «should get a customer by _id» passa porque o cliente de teste nunca chama <code>listTools</code>.",
      "<b>Verificado:</b> <code>get_customer</code> sem resultado devolve <code>customer: null</code>, mas o <code>outputSchema</code> compartilhado só aceita <code>customer</code> opcional (não nulo): o servidor devolve um texto «Output validation error ... Expected object, received null». O teste «should return null when getting a deleted customer by name» passa por acidente (<code>!structuredContent?.customer</code> é verdadeiro quando não há <code>structuredContent</code>).",
      "O <code>isError</code> está dentro do <code>structuredContent</code>, não no campo <code>isError</code> do resultado MCP: clientes que olham o flag do protocolo tratam a falha como sucesso.",
      "Todas as tools compartilham <code>CustomerMutationSchema.shape</code> como <code>outputSchema</code>: é um remendo (comentário FIX no domínio) que enfraquece o contrato de cada tool.",
      "<code>tests/prompts/findCustomer.ts</code> não termina em <code>.test.ts</code>: o glob <code>tests/**/*.test.ts</code> do <code>npm test</code> não o executa. O mesmo vale em <code>08-publishing-mcps-private-npm</code>.",
      "<code>.vscode/mcp.json</code> está commitado com um service token e com vírgula sobrando (JSON com comentários e vírgulas é aceito pelo VS Code, mas não por parsers estritos).",
      "Dependências: <code>@types/node</code> em <code>dependencies</code>, e o <code>engines</code> fixa <code>v24.14.0</code> exatamente."
     ],
     "templateVsZ": "A pasta <code>customers-mcp-z</code> do <b>template</b> já vem completa: só difere do -z pelo UUID do <code>.vscode/mcp.json</code> e pelo nome e versão dentro do <code>package-lock.json</code> (que no template ainda diz <code>@erickwendel/ciphersuite-mcp</code>). O que está incompleto no template de 07 é a API (<code>nodejs-fastify-mongodb-crud-z</code>, ver <a href=\"#D3-09\">tópico 09</a>)."
    }
   ]
  },
  {
   "id": "D3-13",
   "bloco": "d03-b5",
   "mod": "Unidade 7 · Aula 1",
   "emoji": "📦",
   "read": "10 min",
   "title": "Publicando o MCP como pacote: Verdaccio (privado) e NPM (público)",
   "short": "Transformar o servidor em pacote executável por npx, testando num registry privado antes do público.",
   "oneliner": "Publicar o MCP como pacote o torna <b>reutilizável, padronizado e acessível a outros times</b>. A aula usa o <b>Verdaccio</b> (registry privado, em Docker) como ensaio e o <b>NPM</b> público como destino, com versionamento semântico, <b>bin</b> executável via <code>npx</code> e configuração do editor apontando para o pacote.",
   "vovo": [
    "Enquanto o MCP só roda na sua máquina, é uma receita guardada na gaveta de casa. Publicar é imprimir o livro e colocá-lo numa biblioteca: primeiro numa biblioteca interna da empresa (para testar com calma) e, quando estiver bom, na biblioteca pública.",
    "Cada edição do livro precisa de um número de versão único, para ninguém ficar com uma versão misturada."
   ],
   "oque": [
    "<b>Por que publicar:</b> reutilização, distribuição, instalação padronizada e acesso a outros times, o modelo das ferramentas que distribuem integrações prontas.",
    "<b>Dois cenários:</b> registry privado com Verdaccio (código que não pode ser exposto, regras de negócio sensíveis, uso restrito à empresa) e NPM público (qualquer pessoa instala).",
    "<b>Verdaccio:</b> serviço local, em Docker, com interface web para criar usuário, publicar e ver versões, simulando um registry completo sob seu controle. É preciso criar usuário na interface e fazer login no terminal.",
    "<b>Versionamento semântico:</b> cada publicação exige versão única, para evitar conflito e garantir rastreabilidade; o ciclo é atualizar versão, publicar e validar no registry.",
    "<b>Executável:</b> definir um comando (bin) apontando para o arquivo de entrada, e tratar o arquivo principal como executável com uma instrução (shebang) que indica o runtime. Isso permite uso com <code>npx</code>.",
    "<b>TypeScript no pacote:</b> o TypeScript nativo do Node funciona bem localmente, mas tem limitação quando o código está dentro de <code>node_modules</code>; a solução da aula é uma abordagem que executa TypeScript direto, sem build prévio."
   ],
   "como": [
    "<b>Consumo:</b> em vez de executar um arquivo local, o editor roda <code>npx</code> com o nome do pacote publicado, os argumentos e, no caso privado, o registry. O pacote é baixado e executado automaticamente; as tools e prompts aparecem se estiver tudo certo.",
    "<b>Boa prática:</b> testar no registry privado, validar o funcionamento completo e só então publicar no NPM, evitando versões quebradas e correções frequentes em produção. No público basta <code>npx</code> e o nome, sem informar registry.",
    "<b>Resultado:</b> o MCP não depende mais do ambiente local, pode ser compartilhado, versionado e reutilizado, e continua respeitando autenticação e rate limiting."
   ],
   "aplica": [
    "Distribuir um MCP interno por registry privado a todos os times.",
    "Publicar MCP aberto no NPM para qualquer cliente instalar com <code>npx -y pacote</code>."
   ],
   "pros": [
    "Instalação uniforme (<code>npx</code>) em editor, agente e pipeline.",
    "Versionamento e histórico de publicações."
   ],
   "contras": [
    "Quem publica passa a manter um pacote: versões, compatibilidade e segurança da cadeia de suprimentos.",
    "Cada nova versão exige republicar e atualizar quem consome."
   ],
   "traps": [
    "Publicar no NPM público sem validar antes no registry privado.",
    "Esquecer de incrementar a versão: a publicação é recusada.",
    "Empacotar sem tornar o arquivo de entrada executável (e sem <code>bin</code>): o <code>npx</code> não acha o comando."
   ],
   "cola": [
    [
     "Verdaccio",
     "Registry npm privado e leve, executado localmente (Docker, porta 4873)"
    ],
    [
     "bin",
     "Campo do package.json que define o comando executável do pacote"
    ],
    [
     "Shebang",
     "Primeira linha do arquivo indicando o runtime que o executa"
    ],
    [
     "npx",
     "Baixa e executa o pacote sem instalá-lo globalmente"
    ],
    [
     "files",
     "Lista do que vai dentro do pacote publicado (aqui, só <code>src</code>)"
    ],
    [
     "Semver",
     "Versionamento major.minor.patch: cada publicação, versão única"
    ]
   ],
   "links": [
    [
     "Indicação 3: Security Best Practices (MCP)",
     "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices"
    ],
    [
     "Código: 08-publishing-mcps-private-npm",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/08-publishing-mcps-private-npm"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica"
    ]
   ],
   "codigo": [
    {
     "proj": "08-publishing-mcps-private-npm",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/08-publishing-mcps-private-npm",
     "resumo": "Mesmo servidor de clientes do <a href=\"#D3-12\">tópico 12</a> (<code>customers-mcp-z</code>) preparado como pacote <code>@erickwendel/customers-mcp</code>, mais a API (<code>nodejs-fastify-mongodb-crud-z</code>, idêntica à do 07) e um <code>docker-compose.yaml</code> com o Verdaccio.",
     "fluxo": [
      "<code>customers-mcp-z/package.json</code>: <code>name: @erickwendel/customers-mcp</code>, <code>version: 0.0.2</code>, <code>bin: { customers-mcp: ./src/index.ts }</code>, <code>files: [src]</code>; scripts <code>build</code> (<code>chmod 755 src/index.ts</code>), <code>registry:start</code>/<code>registry:stop</code>, <code>registry:login:private</code> (<code>npm login --registry http://localhost:4873</code>), <code>release:private</code> (<code>npm version patch &amp;&amp; npm publish --registry http://localhost:4873</code>), <code>registry:login:public</code> e <code>release:public</code> (<code>--access public</code> no registry oficial).",
      "<code>src/index.ts</code> começa com <code>#!/usr/bin/env tsx</code>; <code>tsx</code> está nas <code>dependencies</code>, para o shebang funcionar a partir de <code>node_modules</code>. O resto é o <code>index.ts</code> do tópico 12 (exige <code>SERVICE_TOKEN</code>).",
      "<code>docker-compose.yaml</code>: serviço <code>verdaccio</code> (imagem <code>verdaccio/verdaccio:6</code>, porta 4873).",
      "<code>.vscode/mcp.json</code>: <code>command: npx</code>, <code>args: ['-y', '@erickwendel/customers-mcp@latest']</code>, com <code>env.SERVICE_TOKEN</code>; há uma linha comentada com <code>--registry http://localhost:4873</code> para o caso privado, mas ela ainda aponta para o nome antigo <code>@erickwendel/ew-customers-mcp@latest</code>: o nome do pacote foi trocado no <code>package.json</code> e a linha não acompanhou.",
      "O diretório inclui o agent <code>developer.agent.md</code> e os mesmos testes do tópico 12."
     ],
     "rodar": [
      "<code>npm run registry:start</code>, crie o usuário em <code>http://localhost:4873</code>, <code>npm run registry:login:private</code> e <code>npm run release:private</code>.",
      "Configure o editor com <code>npx -y --registry http://localhost:4873 @erickwendel/customers-mcp@latest</code>; para o público, <code>npm run registry:login:public</code> e <code>npm run release:public</code>.",
      "<b>Verificado rodando</b> (Node 22.16, Verdaccio 6 em Docker): <code>npm pack --dry-run</code> inclui 15 arquivos (só <code>src</code>, README e package.json; os testes ficam de fora); publicando uma versão nova no Verdaccio, <code>npx -y --registry http://localhost:4873 @erickwendel/customers-mcp@&lt;versão&gt;</code> iniciou o servidor, respondeu ao <code>initialize</code> e, sem <code>SERVICE_TOKEN</code>, saiu com o erro esperado."
     ],
     "armadilhas": [
      "<b>Verificado:</b> o nome <code>@erickwendel/customers-mcp</code> já existe no NPM público (versão 0.0.2); no Verdaccio, publicar a mesma 0.0.2 falha com 409 «this package is already present» (provavelmente porque o Verdaccio repassa a consulta ao registry público). Para reproduzir, troque o escopo e o nome pelos seus.",
      "<b>Verificado:</b> o servidor responde <code>serverInfo</code> com nome <code>@erickwendel/ew-customers-mcp</code> e versão <code>0.0.1</code> (fixos em <code>mcp/server.ts</code>), diferentes do pacote publicado (<code>customers-mcp</code> 0.0.2): a versão do protocolo não acompanha a do pacote.",
      "<b>Verificado:</b> o <code>engines</code> pede <code>v24.14.0</code> exato e o npm avisa <code>EBADENGINE</code> em outras versões do Node (rodou mesmo assim no 22.16).",
      "O projeto do <a href=\"#D3-15\">tópico 15</a> consome <code>@erickwendel/ew-customers-mcp@latest</code> (outro nome, que também existe no NPM), não <code>@erickwendel/customers-mcp</code> deste projeto. A origem da divergência: o <code>package.json</code> do 07 ainda se chama <code>@erickwendel/ew-customers-mcp</code> (e é esse nome que o <code>serverInfo</code> carrega); o 08 renomeou o pacote para <code>customers-mcp</code> ao publicar, sem atualizar o <code>serverInfo</code> nem o comentário do <code>mcp.json</code>.",
      "<code>npm version patch</code> cria também commit e tag git se a pasta fizer parte de um repositório (comportamento padrão do npm): rodar <code>release:private</code> dentro do clone do curso suja o histórico.",
      "<code>@types/node</code> e <code>tsx</code> estão em <code>dependencies</code>, indo no pacote de quem instala.",
      "O Verdaccio do compose não declara volume: ao remover o contêiner, os pacotes publicados somem (provável pelo compose, não testei).",
      "O <code>.vscode/mcp.json</code> está commitado com um service token."
     ],
     "templateVsZ": "Esta unidade não tem par template/-z: só existe a pasta resolvida."
    }
   ]
  },
  {
   "id": "D3-14",
   "bloco": "d03-b5",
   "mod": "Unidade 7 · Aula 2",
   "emoji": "🌐",
   "read": "8 min",
   "title": "Transports: STDIO, HTTP, streaming e SSE, e ideias para o próximo servidor",
   "short": "STDIO é o padrão por simplicidade; HTTP, streaming e SSE entram quando o servidor é central ou em tempo real.",
   "oneliner": "Todo o módulo usou <b>STDIO</b>: o MCP roda como processo local e conversa por entrada e saída padrão. Funciona bem para editor, automação local e pipelines simples, e reduz a complexidade de segurança por não expor serviço de rede. Para servidores centralizados, com vários clientes ou em tempo real, existem <b>HTTP</b>, <b>streaming</b> e <b>SSE</b>.",
   "vovo": [
    "STDIO é como conversar com alguém sentado ao seu lado: sem telefone, sem endereço, rápido. HTTP é ligar para um escritório central que atende muita gente ao mesmo tempo. Streaming e SSE são deixar a linha aberta para a outra pessoa ir avisando assim que algo acontece.",
    "Cada um tem seu lugar: ao lado do colega, tudo é simples; no escritório central, há fila, segurança e escala para cuidar."
   ],
   "oque": [
    "<b>STDIO:</b> o MCP é executado localmente, roda como processo no ambiente do cliente, se comunica por entrada e saída padrão e normalmente é distribuído como pacote NPM. Não exige infraestrutura, é simples de instalar e funciona bem com editores e ferramentas locais.",
    "<b>Por que é padrão:</b> resolve a maioria dos casos com baixo custo e reduz a complexidade de segurança, já que não expõe serviços na rede.",
    "<b>HTTP:</b> o MCP é exposto como serviço web, recebe requisições pela rede e responde de forma síncrona ou assíncrona. Interessante quando o serviço precisa ser centralizado, múltiplos clientes acessam o mesmo MCP ou há necessidade de escalabilidade.",
    "<b>Streaming via HTTP:</b> o servidor envia dados continuamente conforme processa (vídeo, áudio, geração incremental, pipelines de dados): deixa de ser só request-resposta.",
    "<b>Server-Sent Events (SSE):</b> o servidor mantém a conexão aberta e envia eventos; o cliente recebe em tempo real (notificações, atualizações de estado, monitoramento). Mais complexo e poderoso.",
    "<b>Containers:</b> MCP rodando em Docker fica isolado, distribuível e padronizado; faz sentido com ambiente padronizado, dependências complexas ou MCP parte de um sistema maior. Para ferramentas simples pode ser excesso."
   ],
   "como": [
    "<b>Escolha:</b> para facilitar adoção, reduzir a barreira de entrada e atingir devs rápido, NPM com STDIO costuma ser melhor; para escalar, centralizar e controlar infraestrutura, HTTP ou contêineres fazem mais sentido.",
    "<b>Decisão rápida (resumo do quadro da aula):</b> <b>STDIO</b> para uso local, editor, automação e pipelines simples (distribuição via NPM). <b>HTTP</b> para serviço centralizado, vários clientes e escala. <b>Streaming e SSE</b> para tempo real ou processamento contínuo. <b>Container</b> quando é preciso padronizar ambiente, há dependências complexas ou o MCP faz parte de um sistema maior.",
    "<b>Exemplo prático:</b> dashboards e sistemas de monitoramento, que consomem dados continuamente e reagem a eventos, combinam com SSE ou HTTP, não com STDIO.",
    "<b>MCP como camada de automação:</b> ler eventos externos, disparar ações, integrar sistemas e orquestrar fluxos (gestão de projetos, comunicação, e-mail, agenda): receber notificação, processar com IA, gerar resumo, atualizar sistema e enviar mensagem.",
    "<b>Explorar o ecossistema:</b> listas e repositórios com exemplos de servidores MCP (sistemas operacionais, produtividade, serviços externos, plataformas de comunicação) mostram o potencial real.",
    "<b>Mensagem de fechamento da aula:</b> o limite passa a ser mais criativo do que técnico; o próximo passo não é aprender a tecnologia, e sim explorar possibilidades no seu contexto.",
    "<b>Complemento da live:</b> as mensagens são JSON-RPC 2.0 sobre transporte local (stdio) ou de rede (HTTP/SSE).",
    "<b>No curso:</b> Esta aula não tem pasta própria. A apostila associa a Unidade 7 a <code>08-publishing-mcps-private-npm</code>, que é a da aula anterior (<a href=\"#D3-13\">tópico 13</a>).",
    "<b>No curso:</b> Verifiquei no código do repositório: todos os servidores MCP do módulo (05, 06, 07, 08) usam <code>StdioServerTransport</code>; os clientes de teste usam <code>StdioClientTransport</code>; as configurações do <code>MultiServerMCPClient</code> declaram <code>transport: 'stdio'</code>. Não há exemplo de HTTP, SSE ou streaming no repositório."
   ],
   "aplica": [
    "Distribuir como pacote com STDIO quando o público são devs com editor ou agente local.",
    "Hospedar por HTTP quando um serviço central precisa atender vários clientes com autenticação e limites (tópicos <a href=\"#D3-09\">09</a> a <a href=\"#D3-12\">12</a>).",
    "Ideias da aula: automação de tarefas pessoais, ferramentas de trabalho, dados em tempo real, orquestração de workflows, APIs externas."
   ],
   "pros": [
    "STDIO: simples, sem rede, com superfície de ataque menor.",
    "HTTP e SSE: centralização, escala e tempo real."
   ],
   "contras": [
    "Ao expor por rede, autenticação, autorização e limite de uso viram requisito, não opção.",
    "SSE e streaming são mais complexos de implementar e operar."
   ],
   "traps": [
    "Subir HTTP só por moda, sem necessidade de centralizar ou escalar.",
    "Expor um MCP por rede com a mesma configuração do uso local (sem autenticação nem limites).",
    "Usar Docker para ferramenta simples demais."
   ],
   "cola": [
    [
     "STDIO",
     "Transporte por entrada e saída padrão, com o servidor como processo local"
    ],
    [
     "HTTP",
     "Transporte por rede para serviço centralizado e escalável"
    ],
    [
     "Streaming",
     "Envio contínuo de dados conforme são processados"
    ],
    [
     "SSE",
     "Server-Sent Events: conexão aberta com eventos do servidor para o cliente"
    ],
    [
     "Container",
     "Servidor MCP empacotado em Docker, isolado e padronizado"
    ]
   ],
   "links": [
    [
     "Indicação 3: Security Best Practices (MCP)",
     "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices"
    ],
    [
     "Indicação 1: What is MCP?",
     "https://modelcontextprotocol.io/docs/getting-started/intro"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica"
    ]
   ]
  },
  {
   "id": "D3-15",
   "bloco": "d03-b5",
   "mod": "Unidade 8 · Aula 1",
   "emoji": "🤖",
   "read": "11 min",
   "title": "Agente LangChain.js consumindo o Customers MCP publicado",
   "short": "O MCP publicado vira dependência real: um agente combina o MCP de clientes com File System e age sozinho.",
   "oneliner": "Fechamento do módulo: o <b>Customers MCP Server</b> publicado entra num agente <b>LangChain.js</b> como mais um conjunto de tools, ao lado do File System. O prompt é genérico, o grafo tem um único nó e o agente decide, em linguagem natural, criar, listar e remover clientes e salvar dados em arquivo, reaproveitando o <b>service token</b>.",
   "vovo": [
    "Depois de construir, proteger e embalar a recepção do prédio, agora ela trabalha para valer: você diz «cadastre três clientes de teste, anote-os numa folha e me mostre a lista», e ela encadeia sozinha as ações.",
    "O detalhe é que ela não lembra do que foi dito antes (sem memória): se você perguntar «qual o id daquele cliente?» sem repetir o contexto, ela pode se perder."
   ],
   "oque": [
    "<b>Objetivo:</b> usar o MCP publicado como peça real de uma aplicação com LangChain.js, como qualquer servidor MCP disponível via NPM: entender a solicitação, decidir quando usar o MCP de clientes, executar operações, combinar com outras tools e devolver resposta coerente.",
    "<b>Reaproveitamento:</b> o Customers MCP já publicado, a autenticação por service token, a integração com LangChain.js, a estratégia de tools via MCP e a organização dos projetos anteriores.",
    "<b>Estrutura:</b> um grafo enxuto: a mensagem do usuário vai a um nó que resolve a solicitação com as tools; o prompt orienta o comportamento geral e entrega um conjunto de capacidades, em vez de um fluxo imperativo.",
    "<b>Prompt intencionalmente genérico:</b> se a intenção é sobre clientes, use as tools de clientes; senão, pode recorrer às demais ferramentas.",
    "<b>Múltiplos MCPs:</b> File System e Customers MCP ao mesmo tempo; o agente não fica preso a uma integração.",
    "<b>Consumo via NPM:</b> o MCP de clientes deixa de ser código-fonte local e passa a ser pacote publicado; a configuração aponta o pacote e fornece as variáveis de ambiente, em especial o <b>service token</b>, obrigatório para autenticar as chamadas na API protegida."
   ],
   "como": [
    "<b>Demonstração:</b> «criar três clientes de teste, salvá-los em um arquivo e listar os clientes» força o encadeamento: MCP de clientes para criar, File System para salvar, MCP de novo para listar. Também remover todos os clientes, percorrendo a lista.",
    "<b>Ergonomia:</b> um script gera o service token e atualiza o arquivo de ambiente automaticamente, para não copiar token a cada reinício.",
    "<b>Limitação mostrada:</b> sem memória de conversa consolidada, perguntas que dependem do contexto anterior (pedir o id de um cliente recém-criado) podem não funcionar. MCP resolve a integração; a experiência completa ainda depende de histórico, memória, desenho do grafo e persistência de contexto.",
    "<b>Ganho arquitetural:</b> a inteligência do sistema não precisa conhecer a API original, só as ações que o MCP decidiu expor: desacoplamento, camada reutilizável, versionada e protegida. É a ideia do MCP como ponte de modernização, não substituição do legado.",
    "<b>Revisão final da disciplina:</b> reúne evolução de function calling para MCP, pipeline com MCPs e tools, instructions, agents e skills, servidor do zero, legado como MCP, JWT, RBAC, service tokens, rate limiting, publicação, transports e consumo por agente."
   ],
   "aplica": [
    "Qualquer agente que precise operar um sistema da empresa por meio de um MCP interno publicado.",
    "Combinar capacidades de origens diferentes (cadastro, arquivos, banco) num único prompt genérico."
   ],
   "pros": [
    "Reaproveitamento: o mesmo MCP serve editor e aplicação.",
    "Pouco código imperativo: o prompt e as tools definem o comportamento."
   ],
   "contras": [
    "Sem memória, interações encadeadas por contexto falham.",
    "Autonomia com tools de escrita (remover clientes) exige permissões e limites bem definidos."
   ],
   "traps": [
    "Dar ao agente um token <code>admin</code> quando só leitura bastaria.",
    "Esperar continuidade de conversa sem implementar memória.",
    "Apontar para o nome de pacote errado: o código deste projeto usa <code>@erickwendel/ew-customers-mcp</code>, e o projeto do <a href=\"#D3-13\">tópico 13</a> publica <code>@erickwendel/customers-mcp</code>."
   ],
   "cola": [
    [
     "onInitialized",
     "Callback do MultiServerMCPClient quando um servidor conecta"
    ],
    [
     "onConnectionError",
     "Callback de falha de conexão com um servidor MCP"
    ],
    [
     "Prompt genérico",
     "Prompt amplo que deixa o agente escolher entre capacidades"
    ],
    [
     "Service token no env",
     "Credencial passada ao MCP por variável de ambiente"
    ],
    [
     "Memória de conversa",
     "Histórico persistido entre interações: ausente neste projeto"
    ]
   ],
   "links": [
    [
     "Indicação 2: MCP na documentação do LangChain.js",
     "https://docs.langchain.com/oss/javascript/langchain/mcp"
    ],
    [
     "Código: 09-using-mcp-with-langchain",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/09-using-mcp-with-langchain"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica"
    ]
   ],
   "codigo": [
    {
     "proj": "09-using-mcp-with-langchain",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/09-using-mcp-with-langchain",
     "resumo": "Dois projetos: <code>01-multiple-mcp-tools-z</code> (a aplicação LangGraph com um nó agente) e <code>nodejs-fastify-mongodb-crud-z</code> (a mesma API protegida do 07, idêntica byte a byte, verificado com <code>diff</code>).",
     "fluxo": [
      "<code>src/tools/customersTool.ts</code>: lança erro se <code>SERVICE_TOKEN</code> não existir; devolve o servidor <code>customers-mcp</code> via <code>stdio</code>, <code>command: npx</code>, <code>args: ['-y', '@erickwendel/ew-customers-mcp@latest']</code>, com <code>env.SERVICE_TOKEN</code>. Há uma linha comentada para um registry local.",
      "<code>src/tools/fsTool.ts</code>: servidor <code>filesystem</code> com diretório permitido <code>${process.cwd()}/data</code> (diferente do projeto 01, que abre a raiz inteira).",
      "<code>src/services/mcpService.ts</code>: <code>MultiServerMCPClient</code> com os dois servidores e callbacks <code>onMessage</code>, <code>onInitialized</code> e <code>onConnectionError</code> (este faz <code>process.exit(1)</code>).",
      "<code>src/graph/graph.ts</code>: um único nó <code>agent</code>; <code>START → agent</code> e aresta condicional <code>state.error ? 'agent' : END</code>.",
      "<code>src/graph/nodes/agentNode.ts</code>: lê a última mensagem (<code>state.messages.at(-1)!.text</code>), chama <code>generateStructured(systemPrompt, pergunta)</code> sem schema (modo agente com tools) e devolve <code>answer</code> e <code>messages</code>.",
      "<code>src/prompts/v1/agentNode.ts</code>: system prompt para «responder perguntas gerais e gerenciar clientes por tools», com regras: responder no idioma do usuário, salvar arquivos em JSON válido (array de objetos), não pedir confirmação para criar clientes, e em falha de tool reportar o erro e tentar uma vez mais.",
      "<code>src/index.ts</code>: pergunta fixa «Crie 3 clientes de teste usando as tools de customer, depois guarde estes clientes em ./data/users.json, em seguida, liste os clientes cadastrados também pela tool de customers.»; <code>data/users.json</code> traz um exemplo de saída.",
      "<code>getServiceToken.sh</code>: emite um service token de admin via <code>curl</code> e <code>jq</code> e grava <code>SERVICE_TOKEN</code> no <code>.env</code> com <code>sed</code>."
     ],
     "rodar": [
      "API: <code>cd nodejs-fastify-mongodb-crud-z</code>, <code>npm ci</code>, <code>docker-compose up -d mongodb</code>, <code>npm start</code>.",
      "Agente: <code>cd 01-multiple-mcp-tools-z</code>, <code>npm i</code>, <code>cp .env.example .env</code> (<code>OPENROUTER_API_KEY</code>), <code>bash getServiceToken.sh</code>, <code>npm start</code>. O resultado vai para <code>data/users.json</code>.",
      "Não executei o agente (sem chave do OpenRouter): a análise é de leitura do código, e a API foi verificada separadamente no <a href=\"#D3-09\">tópico 09</a>."
     ],
     "armadilhas": [
      "<b>Verificado:</b> o <code>getServiceToken.sh</code> usa <code>sed -i ''</code> (sintaxe do macOS/BSD); no Linux com GNU sed isso falha com «sed: can't read s|^SERVICE_TOKEN=...: No such file or directory» e o <code>.env</code> não é atualizado quando já tem a variável. Exige também <code>jq</code>.",
      "A aresta condicional <code>state.error ? 'agent' : END</code> reexecuta o nó enquanto houver erro e não há contador de tentativas próprio (o limite «tente uma vez» está só no prompt). O freio é o <code>recursionLimit</code> do LangGraph, que no pacote <code>@langchain/langgraph</code> 1.2.0 vale 25 por padrão (verificado no código do pacote) e termina com erro de recursão. Pior: na repetição, <code>state.messages.at(-1)</code> já é a mensagem de desculpas do nó anterior, então o modelo recebe o pedido de desculpas como se fosse a pergunta do usuário (leitura do código, não executei).",
      "O system prompt fala em intents <code>customer_operations</code> e <code>general_question</code>, mas o grafo não tem nó de intenção: o campo <code>intent</code> nunca é preenchido, instrução morta herdada do projeto 01.",
      "<code>package.json</code> define scripts <code>docker:infra:*</code> sem haver <code>docker-compose.yaml</code> nesta pasta (o compose da API está no projeto vizinho), e mantém nome e descrição do projeto do Google Trends; <code>.env.example</code> tem <code>LANGCHAIN_PROJECT=transforming-services-into-tools</code>.",
      "O pacote consumido é <code>@erickwendel/ew-customers-mcp@latest</code>, não o <code>@erickwendel/customers-mcp</code> publicado na aula anterior: confira qual versão o <code>npx</code> está de fato baixando (<code>latest</code> muda sem aviso).",
      "O estado carrega <code>fileType</code>, <code>fileContent</code> e <code>fileName</code> sem uso, resto do projeto 01.",
      "Sem memória de conversa, como a própria aula mostra: cada <code>invoke</code> parte de um histórico novo."
     ],
     "templateVsZ": "Aqui só existe a versão resolvida (<code>-z</code>); o projeto 01 serviu de base (mesmo <code>openRouterService</code>, com callbacks de log e <code>import type</code> nos tipos)."
    }
   ]
  }
 ]
});
