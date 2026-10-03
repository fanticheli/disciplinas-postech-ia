# 08 · Tools de CRUD de clientes, busca composta, prompt e uso no VS Code

> **Unidade 5 · Aulas 3 e 4** · Leitura: ~12 min · Bloco: Servidores MCP do zero e sobre APIs legadas

## 🎯 Em uma frase
Com as camadas prontas, a unidade completa o CRUD (listar, criar, atualizar, remover) e adiciona uma **busca composta** por id, nome ou telefone que a API original não oferece. Cada tool segue o mesmo padrão (descrição, schema de entrada e saída, callback), é guiada por teste e acaba usada em linguagem natural no VS Code.

---

## 👵 Explicando para a vovó

Na recepção do prédio, cada serviço ganha um formulário curto: «cadastrar», «atualizar», «remover». E a recepcionista ainda aprende a procurar por nome, coisa que o arquivo antigo não sabia fazer: ela folheia a lista e filtra.

Quando o visitante diz «remova o cliente João», ela sozinha acha o João, pega o número dele e executa a remoção. Ele nunca disse qual formulário usar.

---

## 🔧 Tecnicamente

### O que é
- **Criação (aula 3):** teste primeiro (nome e telefone entram, volta um id e uma mensagem). Antes de implementar, olha-se o retorno real da API: a criação não devolve o objeto, só confirmação e id. O contrato da tool respeita isso, com um tipo específico (`id`, `message`).
- **Busca como ação composta:** a API não tem busca flexível, então o MCP a constrói. Critérios opcionais (id, nome, telefone). Se há id, busca direta; senão lista todos e filtra em memória. Sem resultado, devolve nulo. Um prompt é criado para facilitar o uso.
- **Update e delete (aula 4):** o teste de update cria o próprio cliente (isolamento). Criação e atualização retornam estruturas parecidas, então nasce um tipo de **mutação** (id, mensagem, indicador de erro) que padroniza todas as operações de escrita.
- **Schema de update:** exige o id; os demais campos seguem o padrão do cliente, reaproveitando schemas já criados. No client, o id vai na URL e o resto no corpo (enviar o id nos dois lugares gerou erro na API).
- **Restrição da API:** o update exige todos os campos, não é um patch parcial; isso impacta o design da tool.
- **Delete:** só o id de entrada; saída com o padrão de mutação.

### Como funciona
- **Descrições e schemas guiam a IA:** ao definir bem nomes, descrições e schemas, a IA entende o que fazer, escolhe a tool certa e encadeia operações sem instruções explícitas.
- **Natural language no VS Code:** «remover cliente com determinado nome» faz o editor buscar o cliente, recuperar o id e só então executar o delete. A API original não tinha busca por nome; essa capacidade veio da camada de serviço.
- **Padrão de cada tool:** registrar no servidor, descrever, schema de entrada e de saída, callback; a service delega ao HTTP client.
- **Próximos passos citados pela aula:** prompts para todas as tools, melhores mensagens de retorno, autenticação e tratamento de erros mais robusto.

### Onde aplicar
- Qualquer CRUD legado que um agente deva manipular em linguagem natural.
- Criar ações compostas (buscar por nome) quando a API só oferece operações atômicas.

### Vantagens e limites
**Vantagens**
- Contrato único para operações de escrita (mutation) simplifica o consumo.
- Testes guiam a implementação e documentam o comportamento esperado.

**Limites**
- Busca em memória sobre a lista completa não escala: serve para a demo.
- As limitações da API (update total, ids) vazam para o schema se não forem tratadas.

### 🚫 Armadilhas
- Inventar um formato de retorno diferente do da API real em vez de respeitá-lo.
- Um schema de update com campos opcionais sobre uma API que os exige: o modelo manda parcial e a chamada falha.
- Testes que dependem uns dos outros (o update precisa de um cliente existente: crie-o dentro do próprio teste).

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Mutation | Tipo padrão de resposta de escrita: id, message e indicador de erro |
| Busca composta | Tool que combina listagem e filtro para oferecer algo que a API não tem |
| structuredContent | Retorno estruturado da tool, validado contra o outputSchema |
| find_customer_prompt | Prompt que monta a instrução de busca a partir de _id, name ou phone |
| `Omit<Customer, '_id'>` | Utilitário do TypeScript para impedir que o chamador envie o id na criação |

---

## 💻 No código do repo

**Projeto:** [06-your-legacy-api-as-mcp/customers-mcp-z (tools, prompt e testes)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/06-your-legacy-api-as-mcp/customers-mcp-z)

Cinco tools (`list_customers`, `get_customer`, `create_customer`, `update_customer`, `delete_customer`), um prompt, um resource e testes de integração sobre a API real.

**Fluxo**
1. `src/domain/customer.ts`: `CustomerSchema` (`_id?`, `name`, `phone`), `CustomerQuerySchema` (tudo opcional), `CustomerUpdateSchema` (query com `_id` obrigatório) e `CustomerMutationSchema` (`id`, `message`, `isError`, mais `customer` e `customers` adicionados por causa de um erro de «additional properties», conforme o comentário FIX).
2. `src/application/customerService.ts`: `findCustomer(query)` usa `getCustomerById` se houver `_id`; senão lista e usa `customers.find`, exigindo que cada campo informado esteja contido (`includes`) no cliente; sem match devolve `null`.
3. `src/infrastructure/customerHttpClient.ts`: `createCustomer` faz `POST` com JSON; `updateCustomer` separa `{ _id, ...remaining }` e faz `PUT /customers/${_id}`; `deleteCustomer` faz `DELETE`; `getCustomerById` devolve `null` em 404.
4. `src/mcp/tools/*.ts`: cada arquivo exporta um `register*Tool(server, service)`; `create_customer` tem saída `{ id, message }`; `update_customer` e `delete_customer` usam `CustomerMutationSchema.shape`; `get_customer` tem saída `customer: CustomerSchema.nullable()`. Todos têm `try/catch` que devolve `isError: true`.
5. `src/mcp/prompts/findCustomer.ts`: `find_customer_prompt` com `argsSchema = CustomerQuerySchema.shape`; a mensagem pede para achar o cliente «using the get_customer or list_customers tool» com a query em JSON.
6. `tests/tools/customers.test.ts` (4 testes: listar, criar, atualizar, remover), `tests/prompts/findCustomer.test.ts` e `tests/resources/apiInfo.test.ts`; `tests/helpers.ts` sobe o servidor por stdio. `.vscode/mcp.json` inicia `./src/index.ts` com `--experimental-strip-types`.

**Como rodar**
- Suba a API (ver [tópico 07](./07-legacy-api-to-mcp-architecture.md)), depois no `customers-mcp-z`: `npm i`, `npm test`, `npm run mcp:inspect`.
- No VS Code, abra o projeto, deixe o `.vscode/mcp.json` iniciar o servidor e peça em linguagem natural: criar, buscar e remover cliente.
- **Verificado rodando** (Node 22.16, MongoDB 8): os 6 testes passam. Cada execução cria clientes e não limpa, como a aula observa.

**Armadilhas e achados no código**
- **Bug verificado:** `get_customer` por `_id` falha para qualquer cliente que chamou `listTools` antes (o fluxo normal de VS Code e LangChain): `McpError -32602: Structured content does not match the tool's output schema: data/customer must NOT have additional properties`. Causa: a API devolve `id`, o schema espera `_id`. Os testes não cobrem `get_customer`.
- **Verificado:** a busca por nome é `includes` sensível a maiúsculas (`name: 'jane'` não acha «Jane Doe»), devolve só o primeiro cliente que casar e, sem nenhum critério, devolve o primeiro cliente da lista (`[].every` é `true`).
- **Verificado:** `update_customer` só com `name` chega à API, que responde 400 «body must have required property 'phone'»; como o client não checa `res.ok`, isso volta como resultado normal, sem `isError`. Mesmo com `delete_customer` de um id inválido («the id is invalid!»).
- Os `catch` de `create`, `get`, `update` e `delete` dizem «Failed to list customers» (copiado da tool de listagem); `deleteCustomer.ts` importa `CustomerUpdateSchema` sem usar.
- Há prompt só para busca; a própria aula lista «prompts para todas as tools» como próximo passo.

**Template versus -z**
Ver [tópico 07](./07-legacy-api-to-mcp-architecture.md): o template vem vazio nas camadas; o -z contém tudo acima.

---

## 🔗 Para ir além
- [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)
- [Código: 06-your-legacy-api-as-mcp/customers-mcp-z](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/06-your-legacy-api-as-mcp/customers-mcp-z)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica)

---

⬅️ [07 · API legada como MCP: não espelhe endpoints, separe camadas](./07-legacy-api-to-mcp-architecture.md)  ·  [09 · Segurança da API: autenticação com JWT e autorização com RBAC](./09-jwt-and-rbac.md) ➡️
