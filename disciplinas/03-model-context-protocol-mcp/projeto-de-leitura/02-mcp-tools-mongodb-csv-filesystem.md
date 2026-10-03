# 02 · MongoDB MCP, tool customizada e File System MCP: camadas de capacidade do agente

> **Unidade 2 · Aulas 3, 4 e 5** · Leitura: ~12 min · Bloco: Múltiplos MCPs e tools com LangChain.js

## 🎯 Em uma frase
Depois da intenção, o agente ganha três tipos de capacidade na mesma lista: o **MCP do MongoDB** (consultas e agregações), uma **tool customizada** que converte CSV em JSON e o **MCP de File System** restrito a uma pasta. O modelo decide quando usar cada uma; o código só descreve e limita.

---

## 👵 Explicando para a vovó

O modelo sozinho até soma uma planilha de cabeça, como um chef que faz conta no guardanapo: funciona, mas erra e demora. Melhor entregar uma calculadora (a tool de CSV), um armário bem organizado (o banco) e uma gaveta onde ele só pode guardar o relatório (o file system limitado).

Quanto menos gavetas ele puder abrir, menos tempo perde olhando coisa que não importa.

---

## 🔧 Tecnicamente

### O que é
- **Execução sem tools (aula 3):** sem ferramentas, o modelo até converte CSV em JSON e agrega por conta própria, mas isso não é adequado a produção: ele não foi feito para cálculo complexo com precisão garantida e gasta tokens. A estratégia é delegar a ferramentas.
- **Nó de execução sem schema:** diferente do parsing, o nó do agente não usa schema estruturado, porque agora o modelo precisa poder usar tools. Essa decisão habilita o comportamento autônomo.
- **MCP do MongoDB:** permite criar e remover coleções, inserir, consultar e agregar. A configuração é uma função que devolve nome, tipo de transporte, forma de execução, permissões de leitura e escrita e o banco (criado automaticamente se não existir).
- **Camada de agregação de MCPs:** centraliza a configuração, inicializa os servidores e converte as capacidades em tools que o framework entende, por meio de **adapters**.
- **Tool customizada (aula 4):** converter CSV em JSON na LLM traz inconsistência, precisão variável, gasto de tokens e trata uma tarefa determinística como inferência. A tool tem dois blocos, a função que executa e o objeto de configuração (nome, descrição, schema de entrada, mensagens). O resultado volta como string.
- **Tool não é servidor MCP:** é uma função exposta ao modelo dentro da aplicação; o MCP é a camada mais ampla de protocolo, descoberta, transporte e integração. Aqui os dois são usados de forma complementar.
- **File System MCP (aula 5):** leitura, escrita, listagem, movimentação e metadados de arquivos já prontos. A configuração inclui o **diretório acessível**, que delimita o escopo.

### Como funciona
- **Segurança (aula 3):** nem todo repositório de MCP é confiável; como roda no ambiente local, há risco de expor dados sensíveis. Priorize repositórios oficiais, ferramentas mantidas pelos próprios fornecedores e fontes confiáveis.
- **Escopo e contexto (aula 5):** se o modelo pode acessar toda a estrutura do projeto, ele pode explorar arquivos desnecessários, gastando tokens e perdendo o foco. A aula restringe o acesso à pasta de relatórios.
- **Schema como contrato (aula 4):** o modelo só consegue chamar a tool se enviar os parâmetros no formato esperado; a validação é a barreira entre a liberdade do modelo e a segurança da aplicação.
- **Resiliência:** mesmo com uma tool ainda não integrada (como o file system antes da aula 5), o modelo registrou o erro e seguiu com o que tinha, tentando alternativas.
- **Dados grandes (aula 5):** arquivos maiores, em modelos gratuitos, causaram falhas de parsing, de conversão, de inserção e perda de contexto. Recomendação: upload de arquivos, tools de leitura sob demanda, processar em partes e persistir incrementalmente.

### Onde aplicar
- Capacidades determinísticas (conversão, cálculo, formatação) viram tool em vez de inferência do modelo.
- Integrações prontas com banco, arquivos ou SaaS entram como servidores MCP, sem reimplementar.
- Adicionar uma nova capacidade sem tocar no fluxo nem no agente: basta incluir na camada de agregação.

### Vantagens e limites
**Vantagens**
- Confiabilidade e economia de tokens ao tirar tarefas técnicas do modelo.
- Modularidade: cada capacidade é independente e reutilizável.
- Não é preciso um servidor MCP completo para uma função pontual.

**Limites**
- Servidores MCP de terceiros rodam na sua máquina, com os seus privilégios.
- Modelos gratuitos degradam com volumes maiores de dados no prompt.

### 🚫 Armadilhas
- Dar ao modelo acesso a mais do que ele precisa (a aula recomenda só a pasta de relatórios).
- Confiar em qualquer servidor MCP encontrado em repositório aleatório.
- Deixar a LLM fazer conversão ou conta que um código resolve de forma exata.
- Mandar o arquivo inteiro no prompt em vez de usar tools de leitura sob demanda.

> 💡 **Dica:** Descrição e nome da tool são o que o modelo lê. Uma descrição que diga «converte CSV em JSON» evita que ele tente converter por conta própria.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| MultiServerMCPClient | Cliente do LangChain que conecta a vários servidores MCP e os converte em tools |
| Adapter | Camada que traduz capacidades MCP para o formato de tool do framework |
| csv_to_json | Tool customizada com schema Zod: recebe `csvText` e devolve JSON em string |
| Diretório acessível | Pasta que o MCP de filesystem pode ler e escrever: define o escopo |
| stdio | Transporte local: o servidor roda como processo filho do cliente |
| Agregação de MCPs | Camada única que monta todas as tools que o agente enxerga |

---

## 💻 No código do repo

**Projeto:** [01-multiple-mcp-tools-z (tools e camada MCP)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/01-multiple-mcp-tools-z)

Continuação do projeto do [tópico 01](./01-multi-mcp-app-and-intent-parsing.md): `mcpService.ts` agrega o MCP do MongoDB, o MCP de filesystem e a tool `csv_to_json`, e o prompt do agente descreve o pipeline em cinco passos.

**Fluxo**
1. `src/services/mcpService.ts` cria um `MultiServerMCPClient` com `mcpServers: { ...getMongoDBTool(), ...getFSTool() }` e `onMessage` logando por servidor; `getMCPTools` devolve `[...mcpTools, getCSVTOJSONTool()]`.
2. `src/tools/mongodbTool.ts` declara o servidor `MongoDB` em `stdio` via `npx -y mongodb-mcp-server@latest`, com `MDB_MCP_CONNECTION_STRING=mongodb://localhost:27017/dataprocessing`.
3. `src/tools/fsTool.ts` declara o servidor `filesystem` via `npx -y @modelcontextprotocol/server-filesystem` com `process.cwd()` como diretório permitido.
4. `src/tools/csvToJSONTool.ts` usa `tool()` do LangChain: nome `csv_to_json`, schema `z.object({ csvText: z.string() })`, converte com `csvtojson().fromString`, loga a quantidade de registros e devolve `JSON.stringify(result)`.
5. `src/prompts/v1/agentNode.ts`: o system prompt manda seguir passos fixos (Step 0 apagar as coleções do usuário no MongoDB; Step 1 converter CSV com `csv_to_json`; Step 2 salvar JSON se pedido; Step 3 inserir no MongoDB; Step 4 consultar para responder; Step 5 gravar o relatório .txt em `./reports/`); o user prompt leva intent, fileName e fileContent.
6. `src/services/openRouterService.ts`: `#getTools` carrega as tools só na primeira chamada (cache em `this.tools`); sem schema, `createAgent` roda com essas tools e callbacks logam decisão do modelo, início e fim de cada tool.
7. Artefatos já commitados no -z: `reports/*.txt` (por exemplo, receita total de $71.33 sobre as 8 linhas de `sales.csv`), `data.json` e `products.json` na raiz: são saídas de execuções do agente, não código.

**Como rodar**
- Suba a infraestrutura com `npm run docker:infra:up` (MongoDB 8 e mongo-express em [localhost:8081](http://localhost:8081)) e depois `npm start`.
- Confira o resultado em `reports/` e a coleção criada no mongo-express. `npm run docker:infra:cleanup` remove volumes.
- Não executei o agente (sem chave do OpenRouter); a análise é de leitura do código.

**Armadilhas e achados no código**
- O MCP de filesystem aponta para `process.cwd()`, a raiz do projeto inteira (incluindo o `.env` com a chave do OpenRouter), ao contrário do que a aula recomenda (restringir à pasta de relatórios). No projeto do [tópico 15](./15-langchain-agent-consuming-mcp.md) a raiz foi limitada a `./data`.
- O passo 0 do prompt apaga todas as coleções do usuário a cada execução: aceitável em laboratório, perigoso fora dele.
- `mongodb-mcp-server@latest` sem versão fixa: o comportamento pode mudar entre execuções.
- A conexão do MongoDB não tem autenticação e o compose usa credenciais fixas no mongo-express.
- `console.log('LLM Response', JSON.stringify(data))` despeja todas as mensagens do agente no log; útil para aprender, ruim para dados sensíveis.
- A tool `csv_to_json` está nos `mcpTools` do agente mas é função local, não um servidor MCP.

**Template versus -z**
No template, `mcpService.ts` retorna lista vazia e `src/tools` está vazia: é o que você implementa seguindo as aulas 3 a 5. O -z traz os três arquivos de tools e o `mcpService` completo.

---

## 🔗 Para ir além
- [Indicação 2: MCP na documentação do LangChain.js](https://docs.langchain.com/oss/javascript/langchain/mcp)
- [Servidor MCP do MongoDB (citado no código)](https://github.com/mongodb-js/mongodb-mcp-server)
- [Código: 01-multiple-mcp-tools-z](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/01-multiple-mcp-tools-z)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica)

---

⬅️ [01 · App com múltiplos MCPs: arquitetura em agentes e parsing estruturado da intenção](./01-multi-mcp-app-and-intent-parsing.md)  ·  [03 · Services como tools: Google Trends com LangChain.js](./03-services-as-tools-google-trends.md) ➡️
