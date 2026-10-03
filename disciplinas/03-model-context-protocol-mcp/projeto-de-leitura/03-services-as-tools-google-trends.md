# 03 · Services como tools: Google Trends com LangChain.js

> **Unidade 2 · Aula 6** · Leitura: ~9 min · Bloco: Múltiplos MCPs e tools com LangChain.js

## 🎯 Em uma frase
Nem sempre existe um MCP pronto: uma **service** que já encapsula regra de negócio e API externa pode ser exposta ao modelo como **tool**. O modelo ganha autonomia para decidir quando usá-la; a lógica técnica continua numa camada de serviço convencional.

---

## 👵 Explicando para a vovó

Você pergunta a um amigo publicitário «esse título de vídeo é bom?». Em vez de ele chutar, ele liga para um instituto de pesquisa (a service), pergunta o que as pessoas andam procurando e só então responde.

O detalhe é que o instituto cobra por ligação. Por isso a instrução ao amigo é: «ligue uma vez só, com as duas palavras-chave juntas».

---

## 🔧 Tecnicamente

### O que é
- **Caso de uso:** o criador de conteúdo informa um tema, a LLM interpreta, extrai palavras-chave, chama uma tool que consulta a API do Google Trends, recebe os dados processados e responde com sugestões de título embasadas em dados reais.
- **Por que service como tool:** combina autonomia da LLM, controle da aplicação sobre a regra de negócio, reaproveitamento de serviços existentes e menor acoplamento entre fluxo e implementação.
- **Estrutura:** dois papéis, um que pesquisa e outro que responde. Na primeira etapa a LLM atua como pesquisadora (interpreta o tema e extrai keywords); na segunda usa os resultados para montar a resposta final, de preferência no idioma do usuário.
- **A service é a camada de negócio:** recebe as keywords, consulta a API e agrega, interpreta e organiza termos relacionados, tópicos em ascensão, consultas associadas e sinais de relevância, em vez de repassar dado bruto.
- **Expor como tool:** define-se nome, descrição, schema de entrada e a função que chama a service. A service nunca é chamada manualmente dentro dos nós do grafo: o modelo decide.

### Como funciona
- **Prompt como limitador operacional:** a API tem plano gratuito com limite de consultas. A instrução de executar **apenas uma chamada** impede que o modelo entre em ciclos de refinamento e consuma a cota.
- **Diferença do fluxo tradicional:** antes você interpretaria a pergunta, extrairia as keywords no código, chamaria a API, processaria e só então devolveria à LLM. Agora a decisão de usar a service sai do código imperativo e vai para o modelo.
- **Reaproveitamento:** o mesmo padrão serve para enriquecer cadastro de clientes, buscar em serviços internos, análise de mercado, dados públicos e sistemas da empresa.
- A origem da capacidade muda (tool local, service interna, API externa ou servidor MCP), mas o mecanismo de exposição ao modelo é praticamente o mesmo.

### Onde aplicar
- Qualquer service existente que o agente deva acionar sob demanda.
- APIs pagas ou com cota, onde o prompt (e idealmente o código) precisa limitar o número de chamadas.

### Vantagens e limites
**Vantagens**
- A regra de negócio fica testável numa service comum.
- A resposta nasce de dados reais, não só da criatividade do modelo.

**Limites**
- Sem limite técnico no código, a única barreira contra chamadas repetidas é o prompt.
- Dependência de API externa com cota e chave.

### 🚫 Armadilhas
- Confiar só no prompt para controlar custo de uma API paga.
- Passar dado bruto da API para o modelo em vez de uma estrutura enxuta e já interpretada.
- Esquecer de fornecer fixture ou modo desativado para desenvolver sem gastar a cota.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Service como tool | Função de negócio exposta ao modelo com nome, descrição e schema |
| Researcher e responder | Os dois nós: um busca dados (com a tool), outro redige a resposta |
| SerpAPI | API usada para acessar o Google Trends (exige chave e tem cota gratuita) |
| Fixture | Dado de exemplo devolvido quando a service está desativada |
| Autonomia controlada | O modelo decide quando chamar, mas o prompt e a service impõem limites |

---

## 💻 No código do repo

**Projeto:** [02-google-trends-agent](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/02-google-trends-agent)

Servidor Fastify com `POST /chat` e um grafo de dois nós (`researcher → responder`) no qual a tool `google_trends` envolve uma `SerpAPIService`. Existe uma versão única (não há par template/-z).

**Fluxo**
1. `src/graph/graph.ts`: `START → researcher → responder → END`; `src/graph/state.ts` guarda `messages`, `trendsData`, `question` e `keywords`.
2. `src/graph/nodes/researcherNode.ts` chama `generateStructured` sem schema com o prompt de `prompts/v1/keywords.ts` («extraia exatamente 2 keywords e chame `google_trends` UMA vez, com as duas num único array; não responda sem chamar a tool»). Guarda `trendsData = JSON.stringify(result.data)`.
3. `src/graph/nodes/responderNode.ts` monta o prompt com a pergunta e `trendsData` (`prompts/v1/videoTrends.ts`) e devolve um `AIMessage`; o system prompt pede recomendação concreta no idioma do usuário, de preferência pt-BR.
4. `src/services/mcpService.ts` junta o MCP de filesystem (`process.cwd()`) com `createGoogleTrendsTool(serpAPIService)`.
5. `src/tools/googleTrendsTool.ts`: `tool()` de nome `google_trends`, schema `z.object({ keywords: z.array(z.string()) })`, devolve `JSON.stringify(await service.getGoogleTrends(keywords))`.
6. `src/services/serpApiService.ts`: se `config.disabled`, devolve a fixture `risingTrendFixture` (`data/trendingData.ts`); senão, para cada keyword chama `getJson` com `engine: 'google_trends'`, `date: 'now 7-d'` e `data_type: 'TIMESERIES'`.
7. O parsing calcula média de interesse e tendência: `rising` se a média dos 3 últimos pontos passar de 1,2× a dos 3 primeiros, `declining` se ficar abaixo de 0,8×; consultas relacionadas (top 10) e tópicos em alta (top 5) são ordenados e cortados.

**Como rodar**
- Node >= 24.10; `npm i`; `cp .env.example .env` com `OPENROUTER_API_KEY` e `SERPAPI_API_KEY`.
- `npm start` sobe o servidor na porta 3000 e já dispara a pergunta fixa de `index.ts` (títulos para um vídeo sobre Web AI). Para economizar cota, troque `disabled` para `true` em `config.ts`.
- Não executei (sem chaves); análise por leitura de código.

**Armadilhas e achados no código**
- O `README.md` da pasta descreve outro projeto («Prompt Chaining Article Generator», com `npm run generate`, MockLLMClient e pasta `tests/`); nada disso existe aqui. Os scripts `test*` do `package.json` apontam para `tests/`, que não existe.
- `trendsData` não é a resposta crua da tool: `generateStructured` devolve o texto da última mensagem do agente pesquisador, que é o que vai para o responder.
- `researcherNode` loga «Trends data fetched via tool call» mesmo que o modelo não tenha chamado a tool.
- `KeywordsSchema` e `VideoTrendsSchema` são exportados, mas nunca usados.
- `serpAPIConfig.cacheTTL` está definido em `config.ts` e a `SerpAPIService` declara um `cache: Map`, mas nenhum dos dois é usado: não há cache real.
- Não há limite técnico de chamadas da tool (nenhuma configuração de limite de iterações no agente): só o prompt manda chamar uma vez.

---

## 🔗 Para ir além
- [Indicação 2: MCP na documentação do LangChain.js](https://docs.langchain.com/oss/javascript/langchain/mcp)
- [Código: 02-google-trends-agent](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/02-google-trends-agent)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica)

---

⬅️ [02 · MongoDB MCP, tool customizada e File System MCP: camadas de capacidade do agente](./02-mcp-tools-mongodb-csv-filesystem.md)  ·  [04 · Vibe coding: arquivos de instrução, llms.txt e agents especializados](./04-instructions-llms-txt-and-agents.md) ➡️
