# 01 · OpenRouter: laboratório de modelos, roteamento e fallback

> **Unidade 1 · Aulas 3 e 4** · Leitura: ~11 min · Bloco: Mercado de IA e Gateway de Modelos

## 🎯 Em uma frase
O **OpenRouter** é uma camada de acesso e roteamento entre modelos e provedores: você aprova uma **lista de modelos**, escolhe o critério (preço, latência ou throughput) e ele decide dentro dessa lista, com fallback se um falhar.

---

## 👵 Explicando para a vovó

Imagine pedir um táxi por um aplicativo que consulta várias cooperativas. A senhora diz «quero o mais barato» ou «quero o que chega mais rápido», e o app escolhe. Se o motorista recusar, ele chama o próximo da lista sozinho.

O gateway do curso é esse aplicativo: a pergunta chega, o OpenRouter escolhe entre os modelos que a gente aprovou e tem um plano B automático.

---

## 🔧 Tecnicamente

### O que é
- **OpenRouter:** camada de roteamento. Importante: «o modelo está no OpenRouter» é uma confusão; ele roteia para provedores diferentes. Um modelo open source pode ser hospedado por um provedor específico, o que afeta risco, disponibilidade, compliance e geografia.
- **Laboratório antes do código:** o painel permite filtrar modelos, ver preço, limites e contexto, acompanhar consumo por chave e por modelo (com exportação), comparar respostas lado a lado no chat e ver rankings e market share.
- **Lista de modelos aprovados:** o sistema é construído para uma *capacidade*, não para um modelo. Modelos, preços, latência e qualidade mudam; ficar preso a um fornecedor é risco desnecessário.
- **Critérios de roteamento:** preço (protótipo e controle de gasto), latência (chat que precisa responder rápido) e throughput (textos maiores e velocidade de entrega). O mais barato nem sempre é o melhor: contam previsibilidade, consistência, seguir instruções e tamanho de contexto.

### Como funciona
- Configuração e segredos: chave nova por projeto, com **expiração curta** e **limite de gasto** (protege contra loop com bug ou abuso drenando créditos). `.env` fora do versionamento e `.env.example` com placeholder documentando o contrato.
- O config valida no startup (falhar cedo se faltar a chave), centraliza porta, *referer* e *title* (identificam o app no OpenRouter) e a lista de modelos.
- Um serviço dedicado isola a integração: monta mensagens (system prompt + pergunta do usuário), define temperatura baixa para consistência e limite de tokens para controlar custo, passa o bloco de roteamento e extrai o conteúdo do primeiro *choice* de forma defensiva. Devolve também **qual modelo respondeu**, útil para observabilidade.
- O servidor Fastify é só transporte: valida o body (schema com `question` string de tamanho mínimo), chama o serviço e responde. O serviço aceita override de config no construtor para facilitar teste.
- Ambiente reprodutível: Node 24 (a aula recomenda NVM para todo mundo usar a mesma versão) com TypeScript nativo (sem transpilação), versões do Fastify e do SDK fixadas, `node --watch` e `--inspect` para depurar com breakpoint em vez de console.log.
- Testes com `node:test` e `fastify.inject` (requisição simulada em memória, sem subir porta): um cenário garante que por padrão sai o modelo mais barato, outro que ao trocar para throughput sai o mais rápido.

### Onde aplicar
- Comparar modelos rapidamente antes de escrever código, trocando só o nome do modelo.
- Montar um gateway interno que centraliza chave, custo e política de modelos para vários produtos.
- Escolher critério por cenário: preço no protótipo, latência no chat, throughput em geração longa.
- Justificar custo com os dados de uso por chave e por modelo exportados do painel.
- A live de 24/09 usa o OpenRouter como backend de um agente LangGraph via `ChatOpenAI` com `base_url` do OpenRouter e modelo em variável de ambiente: [Live NetFibra](./12-live-netfibra-langgraph-graphrag-hitl.md).

### Vantagens e limites
**Vantagens**
- Fallback e roteamento sem escrever lógica de disponibilidade.
- Troca de modelo sem mexer na arquitetura, o que reduz lock-in.
- Modelos gratuitos permitem estudar sem custo; cerca de 10 dólares de crédito liberam os modelos de topo para testar.

**Limites**
- Os testes que fixam qual modelo deve ser escolhido dependem do estado do mercado e podem quebrar com o tempo: validam pipeline e estratégia, não uma garantia eterna.
- O roteamento fica limitado à lista que você aprovou e às capacidades dos modelos nela.
- Mais uma camada entre você e o provedor, com implicações de compliance e geografia.

### 🚫 Armadilhas
- Achar que o modelo mais barato é sempre o melhor para o seu caso.
- Deixar a chave sem expiração nem teto de gasto: um loop com bug pode drenar o crédito em minutos.
- Não registrar qual modelo respondeu, perdendo rastreabilidade de custo e qualidade.
- Instalar sempre a última versão do SDK em material de referência: dependências mudam e quebram quem vem depois.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| OpenRouter | Camada de acesso e roteamento entre modelos e provedores |
| Lista de modelos | Conjunto aprovado que habilita roteamento e fallback |
| provider.sort | Critério de ordenação: price, latency ou throughput |
| Throughput | Tokens por segundo, importa para textos longos |
| Fastify inject | Simula requisição HTTP em memória nos testes |
| Referer e title | Cabeçalhos que identificam seu app no OpenRouter |
| Limite de gasto | Teto de custo da chave, camada básica de segurança operacional |

---

## 💻 No código do repo

**Projeto:** [01-smart-model-router-gateway](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms/01-smart-model-router-gateway)

Gateway Fastify 5 que envia a pergunta ao OpenRouter com uma lista de modelos e uma regra de ordenação, deixando roteamento e fallback por conta da plataforma. Sem LangChain; usa o SDK oficial do OpenRouter.

**Fluxo**
1. `src/index.ts` instancia o serviço e o servidor e sobe na porta 3000.
2. `src/server.ts` define `POST /chat` com schema do Fastify: `question` obrigatória, `minLength: 5`.
3. `src/openrouterService.ts` chama `client.chat.send` com `models`, `temperature`, `maxTokens` e o bloco `provider`, e devolve `{ model, content }`.
4. `config.ts` guarda a lista de modelos (:free), temperatura 0.2, `maxTokens: 100` e `provider.sort.by` (padrão `throughput`, com `latency` e `price` comentados); `partition: none` ordena entre todos os modelos da lista.
5. `tests/router.e2e.test.ts`: dois testes com `app.inject` clonando o config; price espera o modelo mais barato e throughput o mais rápido. São chamadas reais, sem mock.

**Como rodar**
- `npm i` e `cp .env.example .env` (variável `OPENROUTER_API_KEY`). Os scripts `dev` e `test` carregam o `.env` com `node --env-file .env`.
- `npm run dev` e `curl localhost:3000/chat -H 'Content-type: application/json' --data '{"question":"What is rate limiting?"}'`.
- `npm test` (consome chamadas reais). Requer Node com suporte a rodar .ts (>=24.10).

**Armadilhas e achados no código**
- Os testes dependem do mundo real: modelos :free mudam de ranking, saem do ar ou tomam rate limit, e o assert do nome do modelo pode quebrar sem mudança no seu código.
- `maxTokens: 100` corta a resposta no meio; é de propósito, mas parece bug.
- `index.ts` ignora `config.port` e usa 3000 literal.
- O construtor de `OpenRouterService` usa o `config.apiKey` importado em vez de `this.config.apiKey`, então o override de config não troca a chave.
- O handler de erro faz `return reply.code(500)` sem `.send(...)`, e sem a chave só aparece um `console.assert`, o erro vem depois na chamada.
- `String(response.choices.at(0)?.message.content) ?? ''`: o `?? ''` nunca vale, porque `String(undefined)` vira a string `'undefined'` e não um valor vazio.
- A aula insiste em fixar versão do SDK e do Fastify, mas o `package.json` usa `^` (`@openrouter/sdk ^0.5.1`, `fastify ^5.7.4`); quem trava de verdade é o `package-lock.json`.

---

## 🔗 Para ir além
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms)

---

⬅️ [00 · Mercado de IA como serviço, wrappers e o Applied AI Engineer](./00-mercado-ia-servico-e-wrappers.md)  ·  [02 · LangChain.js e LangGraph: pipes, estado, nodes e edges](./02-langchain-langgraph-estado-nodes-edges.md) ➡️
