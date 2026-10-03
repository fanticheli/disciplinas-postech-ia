# 05 · Uma API que também é um agente: POST /chat, registry e testes sem rede

> **Unidade 2 · Aula 7** · Leitura: ~7 min · Bloco: Padrões de raciocínio e o núcleo do OpsPilot

## 🎯 Em uma frase
O `POST /chat` faz da API um agente: entra linguagem natural, um **registry** escolhe a estratégia, um **decorator** aplica Reflection, e a resposta mantém o contrato **answer + trace + metrics**. Os testes de integração usam uma estratégia **fake determinística**, sem rede.

---

## 👵 Explicando para a vovó

É o balcão do restaurante: o cliente diz o pedido em português, o balcão escolhe qual cozinheiro chamar e devolve o prato com o recibo de como foi feito. Para treinar o balcão, usa-se um cozinheiro de mentira que sempre devolve o mesmo prato.

---

## 🔧 Tecnicamente

### O que é
- **Contrato de entrada:** mensagem do usuário, estratégia (padrão ReAct) e se Reflection deve ser aplicada; tudo validado com Zod, porque HTTP é fronteira externa.
- **Contrato de saída:** 200 com `answer`, `trace` e `metrics`; 400 com as *issues* do Zod; 422 se a estratégia não existe no registry; 504 se estourar o timeout. O timeout inicial pensado era de 60 s e foi para 180 s por causa da latência de modelos gratuitos.
- **Strategy + Decorator:** Strategy troca o mecanismo de raciocínio, Decorator acrescenta Reflection, e a API só conhece a abstração comum.
- **Testes sem rede:** uma estratégia fake com o mesmo contrato torna previsíveis validação, seleção, formato e status; chamadas reais ao LLM ficam na arena e no bench, que medem raciocínio, custo e qualidade.
- **Um núcleo, várias interfaces:** terminal, arena, bench e HTTP convergem para as mesmas estratégias e tools. Postman ou Insomnia usam o mesmo protocolo.

### Como funciona
- Specify, plan e tasks seguem o fluxo normal; no implement não é preciso uma referência extensa porque não há mudança conceitual. A revisão continua: rotas, validações, registry e erros.
- Dois problemas de execução entram como lição: o script `dev` não carregava o arquivo de ambiente (o mesmo problema da arena) e a porta 3000 estava ocupada por um processo anterior.
- O teste real da aula: `POST /chat` pedindo um incidente de severidade 2 para o catálogo, com ReAct e Reflection; a resposta trouxe o incidente aberto e métricas (3 chamadas ao LLM).
- A apostila reconhece que Copilot, Cursor ou modelos diferentes geram arquivos e erros diferentes a partir da mesma spec: o objetivo é entender o desenho e revisar.

### Onde aplicar
- Expor um agente a qualquer cliente HTTP mantendo a lógica de raciocínio fora da camada web.
- Testar a camada HTTP sem LLM com estratégias fake.

### Vantagens e limites
**Vantagens**
- Contrato explícito de sucesso e erro (200, 400, 422, 504).
- Estratégia selecionável sem alterar a API.
- CI rápido e repetível, sem rede.

**Limites**
- A latência de um agente real (de dezenas de segundos a mais de um minuto na aula) não cabe no padrão de requisição curta.
- Timeout alto demais segura conexões; baixo demais gera falsas falhas com modelo lento.

### 🚫 Armadilhas
- Confundir 400 (corpo inválido) com 422 (estratégia semanticamente impossível).
- Testar o contrato HTTP com o modelo real e ter CI instável.
- Esquecer que o env nativo do Node exige `--env-file` também no script do servidor.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| POST /chat | Endpoint que recebe a mensagem e devolve answer, trace e metrics |
| Registry | Mapa de nomes para estratégias disponíveis |
| 422 | Estratégia desconhecida: pedido compreensível mas não executável |
| 504 | Timeout da execução do agente |
| Estratégia fake | Implementação determinística do contrato para testes sem rede |

---

## 💻 No código do repo

**Projeto:** [03-function-calling-e-tool-use (src/http e src/agents/index.ts)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use)

O `POST /chat` da spec 003 foi commitado junto com a persistência da U3, então só existe a partir da pasta 03. Lá o fluxo é o da aula: registry, decorator, 400, 422 e 504. No snapshot final (09) o endpoint passou pelo grafo de produção (U6) e o registry saiu do caminho HTTP; os dois estados estão abaixo.

**Fluxo**
1. **Snapshot 03.** `src/http/chat-schema.ts`: `{message, strategy (default "react"), reflect (default false), conversationId?}` validado com Zod. `src/http/server.ts`: `createApp(deps)` em Express; `express.json` aceita também corpo sem `Content-Type` (o `curl -d` padrão); `POST /chat` chama `resolveStrategy(registry, strategy, reflect)` e `runChat` e responde 200 com `answer, trace, metrics, conversationId`.
2. `src/agents/index.ts`: `createRegistry`, `resolveStrategy` (aplica `withReflection` quando `reflect` é true) e `listStrategies`; `UnknownStrategyError` vira 422.
3. `runWithTimeout` (180000 ms por padrão) rejeita com `ChatTimeoutError`, que vira 504; o handler final mapeia também 400 (Zod e JSON inválido), 404 (conversa inexistente) e 500.
4. `src/http/server.test.ts` sobe o app em porta efêmera (`app.listen(0)`), chama com `fetch` e usa `fakeStrategy`: caminho feliz, estratégia explícita, Reflection com crítico aprovando, 400, 422, padrão ReAct sem Reflection, 504 (estratégia lenta com timeout injetado), registry só com fakes e corpo estilo curl.
5. **Snapshot final (09).** O schema ganha `userId` (obrigatório desde a U4), `awaitHumanApproval` (U7) e `strategy` opcional; o handler gera um `requestId` com `randomUUID`, devolve `X-Request-Id` e chama `runProductionTurn` ([tópico 12](./12-langgraph-roteador-e-fallback.md)). `strategy` vira override (`react`, `planExecute`, `reflect`, `team` ou o alias `plan-and-execute`; outro valor dá 422 por `refine`); `reflect: true` sem `strategy` força a rota `reflect` (ReAct mais Reflection); com `strategy` informada, o `reflect` é ignorado. O handler final mapeia ainda 404 (conversa, request ou aprovação inexistente) e 503 (modelo indisponível).
6. No 09, `createRegistry`, `resolveStrategy` e `listStrategies` continuam exportados, mas o fluxo HTTP não os usa mais; só testes e exports os referenciam.

**Como rodar**
- `npm run dev` (porta 3000) e `curl -X POST localhost:3000/chat -H 'content-type: application/json' -d '{"message":"quais alertas estão disparando?","userId":"u1"}'`.
- `npm test` para a suíte HTTP com fakes.

**Armadilhas e achados no código**
- O timeout rejeita a promise da requisição, mas não cancela a execução: não há `AbortSignal`, então a estratégia continua rodando e consumindo chamadas.
- O `userId` vem do corpo, sem autenticação: qualquer cliente informa o id que quiser.
- Armadilha da evolução: depois da U6 o `reflect` do corpo só vale sem `strategy`, e a rota `reflect` é sempre ReAct mais Reflection; Plan-and-Execute com Reflection só existe na arena.
- Na pasta 02 não existe API: `src/index.ts` só exporta `bootstrapOpsPilot()`, e o `dev` da U2 é `tsx src/index.ts` sem env file; só o snapshot 03 tem `node --env-file-if-exists` no `dev`.
- O UNIDADE.md da U2 diz que o `/chat` estava planejado para fechar a U2 e caiu na U3; a apostila o ensina na U2.

---

## 🔗 Para ir além
- [Snapshot da Unidade 3 (onde o POST /chat chegou ao repositório)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use)
- [UNIDADE.md da Unidade 2](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/02-padroes-de-raciocinio-e-execucao/UNIDADE.md)

---

⬅️ [04 · ReAct, Plan-and-Execute e Reflection no código: arena e benchmark](./04-estrategias-arena-e-bench.md)  ·  [06 · Persistência real com SQLite: OpsStore, checks e prepared statements](./06-sqlite-opsstore-e-prepared-statements.md) ➡️
