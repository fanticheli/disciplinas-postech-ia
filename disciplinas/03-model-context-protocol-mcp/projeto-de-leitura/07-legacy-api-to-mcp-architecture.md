# 07 · API legada como MCP: não espelhe endpoints, separe camadas

> **Unidade 5 · Aulas 1 e 2** · Leitura: ~11 min · Bloco: Servidores MCP do zero e sobre APIs legadas

## 🎯 Em uma frase
Para conectar IA a um sistema legado você **não reescreve nada**: cria uma camada MCP separada que abstrai o domínio. A regra central é **não espelhar endpoints**; a arquitetura é **HTTP Client** (infraestrutura, sem regra de negócio), **service** (lógica) e **tools** (capacidades expostas).

---

## 👵 Explicando para a vovó

Um prédio antigo tem várias portinhas, cada uma para uma coisa. Em vez de ensinar o visitante a usar todas, você põe uma recepção na entrada: ele pede «quero falar com a Maria» e a recepcionista sabe por quais portas passar. O prédio continua o mesmo.

A recepção é o MCP. Ela não mexe na estrutura do prédio, só traduz o pedido do visitante para o jeito antigo de funcionar.

---

## 🔧 Tecnicamente

### O que é
- **Cenário (aula 1):** uma API legada de CRUD (criação, leitura, atualização, remoção), algo que quase toda empresa tem para clientes, alunos ou produtos. O objetivo é transformá-la em algo adequado à IA aplicada.
- **MCP não é espelhamento de endpoint:** uma tool por rota até funciona, mas desperdiça o valor do protocolo. Uma única ação do MCP pode chamar vários endpoints, combinar respostas, aplicar regras e esconder complexidade técnica.
- **Mapeamento direto REST para MCP** (existem ferramentas que fazem isso automaticamente) gera excesso de granularidade: o consumidor, LLM ou sistema, teria de conhecer muitos endpoints, combiná-los, fazer chamadas sequenciais e lidar com detalhes que não deveriam ser expostos.
- **Proxy inteligente:** a camada MCP fica entre a API legada e o cliente, organiza, transforma e prepara os dados. Permite evoluir o MCP sem alterar o sistema original; a API é o sistema de origem e o MCP é a camada de tradução.
- **Segurança desde a concepção:** a API da aula está aberta (sem autenticação nem autorização), aceitável como demo mas não em aplicação real. Ao publicar um MCP você cria uma camada de acesso que outras pessoas, sistemas e modelos podem consumir; isso exige governança (ver [tópico 09](./09-jwt-and-rbac.md)).
- **Camadas (aula 2):** domínio (tipos, como o cliente com id, nome e telefone), infraestrutura (HTTP Client que só faz chamadas e converte respostas), serviço (agregações, validações, transformações, composição de chamadas) e MCP (expõe capacidades).

### Como funciona
- **Ordem de trabalho da aula:** subir e testar a API legada primeiro (listar e criar) para não confundir problema de infraestrutura com erro da camada MCP; preparar o template; validar o HTTP Client com uma listagem; criar a camada de serviço (que ainda só repassa); escrever o teste da tool `listCustomers` (que falha), implementar a tool e registrá-la no servidor.
- **Fluxo completo de uma chamada:** cliente chama o MCP, o MCP chama a tool, a tool chama a service, a service chama o HTTP Client, o HTTP Client chama a API; a resposta volta pelo caminho inverso.
- **Schema de saída mesmo sem entrada:** uma tool sem parâmetros ainda define o output, o que ajuda validação, documentação implícita e entendimento do modelo.
- **Resource como documentação viva:** um resource descreve a API (URL base, endpoints, comportamento) e reduz a inferência do modelo. Ele é testado como as tools: listado, com a URI e a descrição esperadas. Depois se valida tudo no Inspector.
- **O template é ponto de partida, não prisão:** importa a coerência arquitetural, não decorar a estrutura. Erros a evitar: mapear endpoints direto, misturar regra de negócio com infraestrutura, não validar com testes, não documentar o comportamento.

### Onde aplicar
- Modernizar sistemas existentes sem reescrevê-los: o MCP como ponte para agentes (reduz custo, risco e tempo de adoção).
- Expor «buscar cliente por nome» mesmo que a API legada não tenha esse endpoint, compondo a busca na camada de serviço.

### Vantagens e limites
**Vantagens**
- A API original permanece intacta; evolução independente das duas partes.
- Responsabilidades separadas facilitam teste, manutenção e auditoria.
- Quem consome vê ações de negócio, não detalhes técnicos.

**Limites**
- Mais uma camada para manter e para proteger.
- Se o MCP herda as limitações da API (como exigir todos os campos no update), elas aparecem no contrato das tools.

### 🚫 Armadilhas
- Validar o MCP antes de confirmar que a API legada está estável.
- Colocar regra de negócio no HTTP Client.
- Registrar a função da tool mas esquecer de ligá-la ao servidor: ela simplesmente não existe para o cliente.
- Deixar a API aberta e publicar o MCP por cima.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Camada de adaptação | O MCP como interface sobre o sistema legado, sem alterá-lo |
| HTTP Client | Adaptador técnico que fala com a API e converte respostas, sem regra de negócio |
| Service | Camada de aplicação: lógica, agregações e composição de chamadas |
| Domain | Tipos que representam os dados (cliente: _id, name, phone) |
| Resource api-info | Documentação embutida da API no próprio servidor MCP |
| Espelhamento | Uma tool por endpoint: o anti-padrão que a aula combate |

---

## 💻 No código do repo

**Projeto:** [06-your-legacy-api-as-mcp (API legada, template e estrutura em camadas)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/06-your-legacy-api-as-mcp)

A pasta tem três projetos: `nodejs-fastify-mongodb-crud` (a API legada em Fastify 4 com MongoDB), `customers-mcp-template` (esqueleto do servidor MCP) e `customers-mcp-z` (resolvido). As tools de CRUD e o prompt estão no [tópico 08](./08-customer-crud-tools-and-prompt.md).

**Fluxo**
1. `nodejs-fastify-mongodb-crud/src/index.js`: rotas `GET /v1/health`, `GET /v1/customers` (ordenado por nome), `GET /v1/customers/:id`, `POST`, `PUT` e `DELETE`; valida o `ObjectId` (400 para id inválido), usa schemas de resposta do Fastify, tem hook de CORS e exige `DB_NAME` fora de teste. Sobe na porta 9999.
2. `nodejs-fastify-mongodb-crud/src/config.js` e `docker-compose.yml`: conexão `mongodb://root:example@localhost:27017` por padrão; `config/seed.js` recria 3 clientes de exemplo; `test/api.test.js` usa `server.inject` com seed antes de cada teste.
3. `customers-mcp-template/src/mcp/server.ts`: só a constante `BASE_URL = 'http://localhost:9999/v1'` e `new McpServer({ name: '@erickwendel/ew-customers-mcp', version: '0.0.1' })`. As pastas `domain`, `application`, `infrastructure` e `mcp/{tools,prompts,resources}` existem vazias (só `.gitkeep`).
4. `customers-mcp-z/src/infrastructure/customerHttpClient.ts`: classe com `fetch` para listar, criar, buscar por id, atualizar e remover; só faz HTTP e devolve o JSON.
5. `customers-mcp-z/src/application/customerService.ts`: `CustomerService` instancia o client e delega; é aqui que mora a busca composta do [tópico 08](./08-customer-crud-tools-and-prompt.md).
6. `customers-mcp-z/src/mcp/server.ts`: cria `new CustomerService(BASE_URL)` e chama os `register*` de cada tool, do prompt e do resource.
7. `customers-mcp-z/src/mcp/tools/listCustomers.ts`: `list_customers` sem entrada e com `outputSchema` de `customers: z.array(CustomerSchema)`; `resources/apiInfo.ts`: resource `customers://api-info` descrevendo base URL, endpoints e o formato do cliente.

**Como rodar**
- API: `cd nodejs-fastify-mongodb-crud`, `npm ci`, `docker-compose up -d mongodb`, depois `npm start` (que executa `DB_NAME=customers node src/index.js`, sintaxe que não funciona no PowerShell). Para popular: `DB_NAME=customers node config/seed.js`.
- MCP: `cd customers-mcp-z`, `npm i`, `npm test` (precisa da API de pé) e `npm run mcp:inspect`.
- **Verificado rodando** (Node 22.16, MongoDB 8 em Docker): os 9 testes da API passam com `node --test test/api.test.js`; o `npm test` original usa `--test test/` (diretório), que funciona no Node 20 do `engines` mas falha no Node 22; os 6 testes do `customers-mcp-z` passam.

**Armadilhas e achados no código**
- O `README.md` do `customers-mcp-z` (e do template) é uma cópia idêntica, byte a byte, do README do CipherSuite (`@erickwendel/ciphersuite-mcp`), e não descreve este projeto. A mesma cópia está nos `customers-mcp-z` de 07 e 08 (verificado com `cmp`).
- **Verificado:** `GET /v1/customers/:id` devolve `id` (não `_id`) e, quando não acha, o corpo é `{}`, porque o schema de resposta 404 só declara `message` e `id` e o código envia `{ error: ... }`. O `DELETE` de um id inexistente faz `return reply.code(404)` sem `send`: a requisição ficou pendurada até o timeout do curl.
- O `docker-compose.yml` da API traz credenciais fixas do MongoDB (`root`/`example`) e usa a chave `version`, que o Compose atual considera obsoleta.
- O workflow `run_tests.yaml` chama o passo de «Start Postgres and Adminer», mas sobe o MongoDB: nome herdado de outro projeto.
- A apostila diz que o template traz uma URL base apontando para a API original e que a aula evita complicar com variáveis de ambiente: confirmado, a URL está fixa no código (`localhost:9999`).

**Template versus -z**
O **template** tem `index.ts` idêntico, `server.ts` mínimo e as pastas de camadas vazias, mais `.vscode/mcp.json`. O **-z** preenche domínio, client, service, as cinco tools, o prompt `find_customer_prompt`, o resource e a suíte de testes. A única diferença no `package.json` é o nome do script: `dev` no template e `start:dev` no -z.

---

## 🔗 Para ir além
- [Indicação 1: What is MCP?](https://modelcontextprotocol.io/docs/getting-started/intro)
- [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)
- [Código: 06-your-legacy-api-as-mcp](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/06-your-legacy-api-as-mcp)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica)

---

⬅️ [06 · Servidor MCP do zero: tools, resources, prompts, testes via MCP Client e Inspector](./06-mcp-server-from-scratch.md)  ·  [08 · Tools de CRUD de clientes, busca composta, prompt e uso no VS Code](./08-customer-crud-tools-and-prompt.md) ➡️
