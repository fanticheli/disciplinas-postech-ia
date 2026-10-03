# 📚 Model Context Protocol (MCP): Guia de Leitura

> Resumo organizado da **Disciplina 03** da pós de Engenharia de IA Aplicada (autoria: **Erick Wendel Gomes da Silva**).
> Cada assunto é explicado em **duas camadas**: 👵 *para a vovó* (analogias do mundo real) e 🔧 *tecnicamente* (nível sênior), e fecha com o que foi feito **no código dos projetos do repositório** (incluindo bugs e inconsistências que encontrei).

---

## 🗺️ Como usar este guia

Cada arquivo é auto-contido e segue sempre a mesma estrutura:

| Seção | Para quê serve |
|-------|----------------|
| 🎯 **Em uma frase** | O conceito destilado |
| 👵 **Explicando para a vovó** | Analogia do mundo real, sem jargão |
| 🔧 **Tecnicamente** | O que é, como funciona, onde aplicar, vantagens e limites, armadilhas |
| 🧩 **Cola rápida** | Glossário dos termos-chave |
| 💻 **No código do repo** | Fluxo por arquivo, como rodar, armadilhas e achados, template versus -z (quando há projeto); nas aulas sem projeto, a seção **No curso** |
| 🔗 **Para ir além** | Links de referência |

Convenções: «**Verificado rodando**» marca o que eu executei de fato; «(live)» marca conteúdo que vem da base teórica da live de 24/02/2026 do repositório, não da apostila; «hipótese» marca o que não consegui provar.

---

## 🧭 Trilha de leitura sugerida

A ordem respeita a progressão da apostila: da visão conceitual ao consumo de um MCP publicado por um agente.

### Bloco 1: Visão geral do MCP
- [00 · Do plugin e function calling ao MCP: tools, resources, prompts e descoberta](./00-mcp-protocol-overview.md)

### Bloco 2: Múltiplos MCPs e tools com LangChain.js
- [01 · App com múltiplos MCPs: arquitetura em agentes e parsing estruturado da intenção](./01-multi-mcp-app-and-intent-parsing.md)
- [02 · MongoDB MCP, tool customizada e File System MCP: camadas de capacidade do agente](./02-mcp-tools-mongodb-csv-filesystem.md)
- [03 · Services como tools: Google Trends com LangChain.js](./03-services-as-tools-google-trends.md)

### Bloco 3: Agents, instructions e skills
- [04 · Vibe coding: arquivos de instrução, llms.txt e agents especializados](./04-instructions-llms-txt-and-agents.md)
- [05 · Skills: conhecimento modular carregado sob demanda](./05-agent-skills.md)
- [16 · Live de MCP e Agent Skills: o caso MySQL2, a ingestão de contexto e a escolha entre Skill e MCP](./16-live-mcp-and-skills-practical-case.md) (live de 24/02/2026)

### Bloco 4: Servidores MCP do zero e sobre APIs legadas
- [06 · Servidor MCP do zero: tools, resources, prompts, testes via MCP Client e Inspector](./06-mcp-server-from-scratch.md)
- [07 · API legada como MCP: não espelhe endpoints, separe camadas](./07-legacy-api-to-mcp-architecture.md)
- [08 · Tools de CRUD de clientes, busca composta, prompt e uso no VS Code](./08-customer-crud-tools-and-prompt.md)

### Bloco 5: Segurança e governança
- [09 · Segurança da API: autenticação com JWT e autorização com RBAC](./09-jwt-and-rbac.md)
- [10 · Service tokens: credencial persistente para MCPs e integrações](./10-service-tokens.md)
- [11 · Rate limiting: confiança zero, limite por token e resposta 429](./11-rate-limiting.md)
- [12 · O MCP como cliente real da API: service token obrigatório e erros estruturados](./12-mcp-with-service-token-and-errors.md)

### Bloco 6: Produção: publicação, transports e consumo
- [13 · Publicando o MCP como pacote: Verdaccio (privado) e NPM (público)](./13-publishing-npm-and-verdaccio.md)
- [14 · Transports: STDIO, HTTP, streaming e SSE, e ideias para o próximo servidor](./14-transports-and-next-steps.md)
- [15 · Agente LangChain.js consumindo o Customers MCP publicado](./15-langchain-agent-consuming-mcp.md)

---

## ✅ Cobertura módulo a módulo (Disciplina 03)

| Unidade · Aula da apostila | Tema | Documento |
|----------------------------|------|-----------|
| **Introdução da disciplina**, mapa da disciplina, mapa do GitHub e revisão final | Visão geral | Seção [Mentalidade da disciplina](#-mentalidade-da-disciplina) deste README e [15 · Agente LangChain.js consumindo o Customers MCP publicado](./15-langchain-agent-consuming-mcp.md) |
| **U1 · Aula 1** | Diferença entre MCPs e o modelo clássico de «tools/plugins» | [00 · Do plugin e function calling ao MCP: tools, resources, prompts e descoberta](./00-mcp-protocol-overview.md) |
| **U2 · Aula 1** | Conhecendo o Projeto: Template Inicial e Arquitetura | [01 · App com múltiplos MCPs: arquitetura em agentes e parsing estruturado da intenção](./01-multi-mcp-app-and-intent-parsing.md) |
| **U2 · Aula 2** | Parsing Inteligente: Organizando a Entrada do Cliente | [01 · App com múltiplos MCPs: arquitetura em agentes e parsing estruturado da intenção](./01-multi-mcp-app-and-intent-parsing.md) |
| **U2 · Aula 3** | Orquestração Autônoma com LangChain.js e MCP no MongoDB | [02 · MongoDB MCP, tool customizada e File System MCP: camadas de capacidade do agente](./02-mcp-tools-mongodb-csv-filesystem.md) |
| **U2 · Aula 4** | Construindo Uma Tool Customizada no LangChain | [02 · MongoDB MCP, tool customizada e File System MCP: camadas de capacidade do agente](./02-mcp-tools-mongodb-csv-filesystem.md) |
| **U2 · Aula 5** | Orquestração Autônoma com LangChain.js e MCP para Gerenciamento de Sistema de Arquivos | [02 · MongoDB MCP, tool customizada e File System MCP: camadas de capacidade do agente](./02-mcp-tools-mongodb-csv-filesystem.md) |
| **U2 · Aula 6** | Usando Services Como Tools: Google Trends API com LangChain.js | [03 · Services como tools: Google Trends com LangChain.js](./03-services-as-tools-google-trends.md) |
| **U3 · Aula 1** | Entendendo Agents e Instructions | [04 · Vibe coding: arquivos de instrução, llms.txt e agents especializados](./04-instructions-llms-txt-and-agents.md) |
| **U3 · Aula 2** | Entendendo skills | [05 · Skills: conhecimento modular carregado sob demanda](./05-agent-skills.md) |
| **Live de 24/02/2026** | MCP e Agent Skills (base teórica no repositório; teoria absorvida nos documentos 00, 04 e 05) e abordagem prática | [16 · Live de MCP e Agent Skills: o caso MySQL2, a ingestão de contexto e a escolha entre Skill e MCP](./16-live-mcp-and-skills-practical-case.md), mais os documentos [00](./00-mcp-protocol-overview.md), [04](./04-instructions-llms-txt-and-agents.md) e [05](./05-agent-skills.md) |
| **U4 · Aula 1** | Criando um MCP do Zero: Testes Automatizados Via MCP Client, Definindo Tools e Inspecionando MCP Servers | [06 · Servidor MCP do zero: tools, resources, prompts, testes via MCP Client e Inspector](./06-mcp-server-from-scratch.md) |
| **U4 · Aula 2** | Definindo Resources e Prompts em Servidores MCP + Usando Nosso Servidor MCP no VSCode | [06 · Servidor MCP do zero: tools, resources, prompts, testes via MCP Client e Inspector](./06-mcp-server-from-scratch.md) |
| **U5 · Aula 1** | Template Inicial e Arquitetura + Boas Práticas de Organização de Código e Estrutura de Projeto | [07 · API legada como MCP: não espelhe endpoints, separe camadas](./07-legacy-api-to-mcp-architecture.md) |
| **U5 · Aula 2** | Como Empresas Usam MCPs para Conectar IA a Sistemas Legados | [07 · API legada como MCP: não espelhe endpoints, separe camadas](./07-legacy-api-to-mcp-architecture.md) |
| **U5 · Aula 3** | Criando Tools de Listagem e Criação de Clientes | [08 · Tools de CRUD de clientes, busca composta, prompt e uso no VS Code](./08-customer-crud-tools-and-prompt.md) |
| **U5 · Aula 4** | Criando Tools de Update e Delete de Clientes + Usando no VSCode | [08 · Tools de CRUD de clientes, busca composta, prompt e uso no VS Code](./08-customer-crud-tools-and-prompt.md) |
| **U6 · Aula 1** | Template Inicial e Arquitetura + Boas Práticas de Organização de Código e Estrutura de Projeto (segurança) | [09 · Segurança da API: autenticação com JWT e autorização com RBAC](./09-jwt-and-rbac.md) |
| **U6 · Aula 2** | Implementando Autenticação com RBAC e Autenticação com JWT em Web API | [09 · Segurança da API: autenticação com JWT e autorização com RBAC](./09-jwt-and-rbac.md) |
| **U6 · Aula 3** | Autenticação e Autorização com Service Tokens em Web APIs | [10 · Service tokens: credencial persistente para MCPs e integrações](./10-service-tokens.md) |
| **U6 · Aula 4** | Controlando Acesso por Tokens com Rate Limiting | [11 · Rate limiting: confiança zero, limite por token e resposta 429](./11-rate-limiting.md) |
| **U6 · Aula 5** | Usando Service Tokens em Nosso Servidor MCP + Rate Limiting | [12 · O MCP como cliente real da API: service token obrigatório e erros estruturados](./12-mcp-with-service-token-and-errors.md) |
| **U7 · Aula 1** | Publicando Servidores MCP em NPM Registry (público) e Verdaccio (privado) | [13 · Publicando o MCP como pacote: Verdaccio (privado) e NPM (público)](./13-publishing-npm-and-verdaccio.md) |
| **U7 · Aula 2** | Indo Além em Servidores MCP: Diferentes Transports e Ideias para seu Próximo Servidor | [14 · Transports: STDIO, HTTP, streaming e SSE, e ideias para o próximo servidor](./14-transports-and-next-steps.md) |
| **U8 · Aula 1** | Criando um Agente para Gerenciar Operações de Clientes com Nosso Customers MCP Server e LangChain.js | [15 · Agente LangChain.js consumindo o Customers MCP publicado](./15-langchain-agent-consuming-mcp.md) |

> As 23 aulas da apostila (8 unidades) estão cobertas em 16 documentos (00 a 15), mais o 16, da live de 24/02/2026. U1 tem 1 aula, U2 tem 6, U3 tem 2, U4 tem 2, U5 tem 4, U6 tem 5, U7 tem 2 e U8 tem 1. A apostila tem 132 páginas.

---

## 🧪 Projetos do repositório absorvidos

O código dos 12 diretórios listados no Anexo A da apostila está nos documentos, na seção **💻 No código do repo**.

| Projeto no GitHub (`modulo03-mcp-na-pratica`) | Onde está neste guia |
|-----------------------------------------------|----------------------|
| 01-multiple-mcp-tools-template | [01 · App com múltiplos MCPs: arquitetura em agentes e parsing estruturado da intenção](./01-multi-mcp-app-and-intent-parsing.md)<br>[02 · MongoDB MCP, tool customizada e File System MCP: camadas de capacidade do agente](./02-mcp-tools-mongodb-csv-filesystem.md) |
| 01-multiple-mcp-tools-z | [01 · App com múltiplos MCPs: arquitetura em agentes e parsing estruturado da intenção](./01-multi-mcp-app-and-intent-parsing.md)<br>[02 · MongoDB MCP, tool customizada e File System MCP: camadas de capacidade do agente](./02-mcp-tools-mongodb-csv-filesystem.md) |
| 02-google-trends-agent | [03 · Services como tools: Google Trends com LangChain.js](./03-services-as-tools-google-trends.md) |
| 03-dev-instructions-agents/.github/agents | [04 · Vibe coding: arquivos de instrução, llms.txt e agents especializados](./04-instructions-llms-txt-and-agents.md) |
| 04-skills | [05 · Skills: conhecimento modular carregado sob demanda](./05-agent-skills.md) |
| 05-mcps-do-zero-template | [06 · Servidor MCP do zero: tools, resources, prompts, testes via MCP Client e Inspector](./06-mcp-server-from-scratch.md) |
| 05-mcps-do-zero-z | [06 · Servidor MCP do zero: tools, resources, prompts, testes via MCP Client e Inspector](./06-mcp-server-from-scratch.md) |
| 06-your-legacy-api-as-mcp (nodejs-fastify-mongodb-crud, customers-mcp-template, customers-mcp-z) | [07 · API legada como MCP: não espelhe endpoints, separe camadas](./07-legacy-api-to-mcp-architecture.md)<br>[08 · Tools de CRUD de clientes, busca composta, prompt e uso no VS Code](./08-customer-crud-tools-and-prompt.md) |
| 07-api-security-auth-rate-limiting-template (API e customers-mcp-z) | [09 · Segurança da API: autenticação com JWT e autorização com RBAC](./09-jwt-and-rbac.md)<br>[10 · Service tokens: credencial persistente para MCPs e integrações](./10-service-tokens.md)<br>[11 · Rate limiting: confiança zero, limite por token e resposta 429](./11-rate-limiting.md)<br>[12 · O MCP como cliente real da API: service token obrigatório e erros estruturados](./12-mcp-with-service-token-and-errors.md) |
| 07-api-security-auth-rate-limiting-z (API e customers-mcp-z) | [09 · Segurança da API: autenticação com JWT e autorização com RBAC](./09-jwt-and-rbac.md)<br>[10 · Service tokens: credencial persistente para MCPs e integrações](./10-service-tokens.md)<br>[11 · Rate limiting: confiança zero, limite por token e resposta 429](./11-rate-limiting.md)<br>[12 · O MCP como cliente real da API: service token obrigatório e erros estruturados](./12-mcp-with-service-token-and-errors.md) |
| 08-publishing-mcps-private-npm (customers-mcp-z, API e Verdaccio) | [13 · Publicando o MCP como pacote: Verdaccio (privado) e NPM (público)](./13-publishing-npm-and-verdaccio.md) |
| 09-using-mcp-with-langchain (agente LangChain.js e API) | [15 · Agente LangChain.js consumindo o Customers MCP publicado](./15-langchain-agent-consuming-mcp.md) |
| `lives/2026-02-24/base-teorica` (MCP e Agent Skills, material complementar) | [00 · Do plugin e function calling ao MCP: tools, resources, prompts e descoberta](./00-mcp-protocol-overview.md)<br>[04 · Vibe coding: arquivos de instrução, llms.txt e agents especializados](./04-instructions-llms-txt-and-agents.md)<br>[05 · Skills: conhecimento modular carregado sob demanda](./05-agent-skills.md)<br>[16 · Live de MCP e Agent Skills: o caso MySQL2, a ingestão de contexto e a escolha entre Skill e MCP](./16-live-mcp-and-skills-practical-case.md) |

---

## 🐛 Achados no código do repo (resumo)

Resumo do que está detalhado em cada documento. Os itens «verificado» eu reproduzi rodando o código (Node 22.16, MongoDB 8 e Verdaccio 6 em Docker, SDK MCP 1.27.1); os projetos que dependem de chave do OpenRouter e da SerpAPI (01, 02 e 09) eu só li, não executei.

- **Bug verificado:** `get_customer` por `_id` quebra com `McpError -32602` em clientes que chamam `listTools`, porque a API devolve `id` e o schema espera `_id`. Em 07 e 08 o teste passa porque o cliente de teste não chama `listTools`. ([08](./08-customer-crud-tools-and-prompt.md), [12](./12-mcp-with-service-token-and-errors.md))
- **Teste que passa por acidente (verificado):** em 07 e 08, «should return null when getting a deleted customer by name» passa porque o resultado vem sem `structuredContent` (erro de validação do `outputSchema`), não porque devolveu `null`. ([12](./12-mcp-with-service-token-and-errors.md))
- **JWT sem expiração (verificado):** o token só tem `username`, `role` e `iat`; a apostila diz que ele pode expirar. ([09](./09-jwt-and-rbac.md))
- **Rate limit não cobre token inválido (verificado):** 95 requisições com o mesmo token inválido responderam 401, nenhuma 429. ([11](./11-rate-limiting.md))
- **README desatualizado (verificado):** o endpoint de service token não tem limite de 3 por minuto como diz o README; o README do 05 cita um prompt e testes que não existem; os READMEs dos customers-mcp de 06, 07 e 08 são cópia idêntica do README do CipherSuite; o README do 02 é de outro projeto. ([10](./10-service-tokens.md), [06](./06-mcp-server-from-scratch.md), [07](./07-legacy-api-to-mcp-architecture.md), [03](./03-services-as-tools-google-trends.md))
- **API legada:** `GET /customers/:id` devolve `id` e, no 404, corpo `{}`; `DELETE` de id inexistente fica pendurado (verificado). ([07](./07-legacy-api-to-mcp-architecture.md))
- **Scripts e config:** `getServiceToken.sh` do projeto 09 usa `sed -i ''` (macOS) e falha no Linux (verificado); nomes de pacote divergentes entre 08 (`customers-mcp`) e 09 (`ew-customers-mcp`); MCP de filesystem aberto na raiz do projeto em 01 e 02; `serverInfo` do MCP com nome e versão diferentes do pacote; `tests/prompts/findCustomer.ts` nunca roda por não casar com o glob. ([13](./13-publishing-npm-and-verdaccio.md), [15](./15-langchain-agent-consuming-mcp.md), [02](./02-mcp-tools-mongodb-csv-filesystem.md), [12](./12-mcp-with-service-token-and-errors.md))

---

## 🎓 Mentalidade da disciplina

A introdução e a revisão final da apostila resumem o fio condutor:

- **Você não precisa abandonar o que já foi construído para adotar IA: precisa conectar melhor o que já existe.** O MCP não substitui APIs nem elimina sistemas legados: cria uma camada de adaptação ([07](./07-legacy-api-to-mcp-architecture.md)).
- MCP não é ruptura: incorpora tools e function calling num protocolo com resources, prompts e descoberta ([00](./00-mcp-protocol-overview.md)).
- Delegar ao modelo a orquestração é poderoso, mas o que é determinístico (conversão, cálculo) vira tool ou MCP, e o escopo de cada capacidade é limitado ([01](./01-multi-mcp-app-and-intent-parsing.md), [02](./02-mcp-tools-mongodb-csv-filesystem.md)).
- Contexto persistente e conhecimento modular: instructions, agents e skills reduzem tokens e ambiguidade ([04](./04-instructions-llms-txt-and-agents.md), [05](./05-agent-skills.md)).
- Servidor MCP é software: testes via MCP Client, schemas, resources, prompts e Inspector ([06](./06-mcp-server-from-scratch.md)).
- Abstrair o domínio em vez de espelhar endpoints, com camadas separadas ([07](./07-legacy-api-to-mcp-architecture.md), [08](./08-customer-crud-tools-and-prompt.md)).
- Segurança e governança em camadas: JWT e RBAC para humanos, service tokens para integrações, rate limiting e falha rápida no MCP ([09](./09-jwt-and-rbac.md) a [12](./12-mcp-with-service-token-and-errors.md)).
- Publicar como pacote (privado antes, público depois) e escolher o transport pelo problema: STDIO por padrão, HTTP, streaming e SSE quando centralizar ou tempo real ([13](./13-publishing-npm-and-verdaccio.md), [14](./14-transports-and-next-steps.md)).
- O MCP publicado vira uma capacidade reutilizável que um agente LangChain.js consome, mas MCP não substitui arquitetura de agente (memória, histórico, grafo) ([15](./15-langchain-agent-consuming-mcp.md)).

Checklist de domínio da revisão final: explicar a evolução de plugins e function calling até o MCP e a diferença entre uma lista de funções e um protocolo; reconstruir o pipeline com parsing, tool de CSV, MongoDB e File System indicando o que o modelo decide e o que é determinístico; comparar instructions, agents e skills; descrever como testes via MCP Client, tools, resources, prompts e Inspector estruturam um servidor do zero; explicar por que transformar API legada em MCP não é espelhar endpoints; diferenciar JWT, RBAC e service tokens e o papel do rate limiting; comparar publicação pública e privada e relacionar STDIO, HTTP, streaming e SSE; e mostrar como o agente LangChain.js consome o Customers MCP Server.

---

## 🧰 Materiais oficiais da disciplina

- **Repositório de código:** https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica
- **Pastas do módulo:** 01-multiple-mcp-tools-template e -z, 02-google-trends-agent, 03-dev-instructions-agents/.github/agents, 04-skills, 05-mcps-do-zero-template e -z, 06-your-legacy-api-as-mcp, 07-api-security-auth-rate-limiting-template e -z, 08-publishing-mcps-private-npm, 09-using-mcp-with-langchain
- **Linguagem principal:** TypeScript no Node.js 24 (strip de tipos nativo, sem transpilação), com LangChain.js, LangGraph, `@modelcontextprotocol/sdk`, Zod e Fastify; a API legada é JavaScript.
- **Material complementar do repositório:** `lives/2026-02-24/base-teorica` (MCP e Agent Skills), usado nos documentos 00, 04, 05 e 16, sempre marcado como «live».

### Indicações de leitura complementar
1. **Model Context Protocol: What is the Model Context Protocol (MCP)?** (documentação oficial, 2025). Principal leitura introdutória: o MCP como padrão aberto para conectar aplicações de IA a sistemas externos, expondo tools, resources e workflows/prompts de forma padronizada. Consolida a visão conceitual, a proposta arquitetural e o motivo de ele ter surgido como alternativa mais adequada para integrar LLMs com contexto e ações sob demanda. Relaciona-se com [00 · Do plugin e function calling ao MCP: tools, resources, prompts e descoberta](./00-mcp-protocol-overview.md). https://modelcontextprotocol.io/docs/getting-started/intro
2. **LangChain: Model Context Protocol (MCP), LangChain JS Docs** (documentação oficial, 2025 e 2026). Mostra como os MCP adapters permitem que agentes LangChain.js usem tools de um ou mais servidores MCP, preservando a abstração de tools do framework; relaciona MCP, autonomia do modelo e integração com aplicações reais em JavaScript. Relaciona-se com [02 · MongoDB MCP, tool customizada e File System MCP: camadas de capacidade do agente](./02-mcp-tools-mongodb-csv-filesystem.md) e [15 · Agente LangChain.js consumindo o Customers MCP publicado](./15-langchain-agent-consuming-mcp.md). https://docs.langchain.com/oss/javascript/langchain/mcp
3. **Model Context Protocol: Security Best Practices** (documentação oficial, 2025). Boas práticas de implementação e operação de servidores MCP: riscos de segurança, vetores de ataque e recomendações para autorização, operação e exposição segura. Útil para governança, proteção de acesso e os cuidados ao publicar MCPs para agentes e aplicações corporativas. Relaciona-se com [09](./09-jwt-and-rbac.md) a [12](./12-mcp-with-service-token-and-errors.md) e [13](./13-publishing-npm-and-verdaccio.md). https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices

Ferramenta citada no código do módulo: MCP Inspector (https://modelcontextprotocol.io/docs/tools/inspector).

---

*Guia gerado a partir da apostila oficial (132 págs), das indicações de leitura da disciplina, do código do repositório do curso e do material da live de 24/02/2026.*
