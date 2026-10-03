# 04 · ReAct, Plan-and-Execute e Reflection no código: arena e benchmark

> **Unidade 2 · Aulas 4, 5 e 6** · Leitura: ~9 min · Bloco: Padrões de raciocínio e o núcleo do OpsPilot

## 🎯 Em uma frase
O ReAct usa o agente pronto do LangGraph; o Plan-and-Execute é um **grafo explícito** (planner, executor, replanner, teto de 8 passos); o Reflection é um **decorator** (`withReflection`, até 2 reflexões). A **arena** compara lado a lado e o **bench** mede acerto pelo **estado do store**, não pelo texto.

---

## 👵 Explicando para a vovó

É um campeonato com árbitro de verdade: não basta o cozinheiro dizer “fiz o prato”, o bench olha a mesa e confere se o prato está lá. E o crítico do Reflection é o fiscal que pode mandar refazer, no máximo duas vezes.

---

## 🔧 Tecnicamente

### O que é
- **ReAct no código:** reaproveita o suporte do ecossistema LangChain/LangGraph em vez de reconstruir o loop de tool calling. A estratégia registra o instante inicial, cria o agente com o modelo da fábrica e as tools, envia a entrada e converte o histórico de mensagens em trace tipado. O limite de recursão é um guardrail técnico, não uma instrução ao modelo.
- **Descrição da tool também orienta o modelo:** nome, descrição e schema Zod formam uma interface controlada; descrição ruim faz o agente escolher a ação errada mesmo com um bom modelo.
- **Plan-and-Execute:** estado compartilhado (entrada, plano, lista de passos feitos com reducer que **acumula**, resposta, mais trace, iterações e chamadas ao LLM). O planner devolve um plano estruturado com Zod (passos curtos, ordenados e executáveis); a fronteira de validação agora é o próprio modelo. O executor faz um passo por vez; o replanner decide entre ajustar, continuar ou finalizar. Teto total de oito passos.
- **Reflection como Decorator:** não é uma terceira estratégia independente; recebe qualquer estratégia, executa-a, chama um crítico (veredito com `approved` e `feedback`, validado com Zod, avaliando a resposta contra as observações do trace) e, se reprovar, regenera com o feedback. O padrão permite ReAct puro, P&E puro, ou qualquer um com Reflection, sem mexer em quem consome.
- **Bench:** três cenários, direto (“quantos alertas críticos estão disparando?”), estruturado (abrir três incidentes sev2 em ordem e resolver o primeiro) e dinâmico (abrir incidente para o alerta mais antigo e dizer quantos sobraram). O acerto compara o **estado final do store** com o esperado; a saída é uma tabela com cenário, estratégia, acerto, chamadas de LLM e latência.

### Como funciona
- **Números da aula (ilustrativos, com modelo gratuito):** ReAct respondeu a consulta simples com 2 chamadas e cerca de 7 s. O Plan-and-Execute, num pedido de três incidentes, chegou ao teto de 8 passos com cerca de 20 chamadas e mais de um minuto. ReAct puro levou ~35 s e com Reflection ~45 s (uma chamada a mais, o crítico aprovou de primeira).
- **Resultado do bench:** na primeira execução, o cenário que roda nas duas estratégias mostrou 2 chamadas no ReAct e 7 no P&E; depois de corrigir erros do P&E, o ReAct acertou os três cenários com menos chamadas e menor latência, e o P&E errou o estado final nos cenários 2 e 3. A aula insiste: o resultado pertence aos cenários, à implementação e às tools; o valor do bench é trocar preferência por evidência.
- **Operação:** o script da arena não carregava o `.env` (Node nativo exige `--env-file`), então a variável obrigatória não era vista; o ajuste foi no script. Nome de estratégia errado imprime as válidas. O free tier do OpenRouter tem limite de requisições, por isso o bench não deve rodar repetidamente.

### Onde aplicar
- Escolher a estratégia de uma feature com números: chamadas, latência e acerto no estado real.
- Adicionar camada de verificação (Reflection) só onde a criticidade justifica o custo.

### Vantagens e limites
**Vantagens**
- Contrato único permite combinar estratégia e Reflection sem tocar na API.
- Medir o estado do store pega agente que “explica bem” e executa errado.
- A arena dá comparação lado a lado em condições equivalentes.

**Limites**
- O P&E custa várias vezes mais chamadas e latência para tarefas que o ReAct resolve.
- Bench com modelo real é lento, consome cota e varia com o modelo do dia.
- Reflection soma custo mesmo quando a primeira resposta estava correta.

### 🚫 Armadilhas
- Acreditar na resposta textual sem conferir o estado do sistema.
- Rodar o bench em loop num free tier com limite diário.
- Esquecer de carregar o `.env` nos scripts quando se usa o env nativo do Node.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| createReactAgent | Agente ReAct pré-construído do LangGraph |
| recursionLimit | Teto de passos do grafo, usado como guardrail contra loop |
| planSchema / replanSchema | Schemas Zod do plano e da decisão adjust, continue ou finish |
| Acumulador (reducer) | Regra que concatena os passos feitos em vez de sobrescrever |
| withReflection | Decorator que embrulha uma estratégia com crítico e regeneração |
| reflect:react | Nome da estratégia ReAct decorada com Reflection na arena |
| Acerto por estado | O bench confere o estado do store, não o texto da resposta |

---

## 💻 No código do repo

**Projeto:** [02-padroes-de-raciocinio-e-execucao (estratégias, arena e bench)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/02-padroes-de-raciocinio-e-execucao)

As três estratégias, a arena e o bench. Os arquivos são os do snapshot da U2, com notas do que mudou até o snapshot final (U9: entradas com histórico, node stamping, tokens).

**Fluxo**
1. `src/agents/react.ts`: `createReactAgent({ llm, tools })` e `recursionLimit: Math.max(3, maxIterations * 3)` (30 com o default 10); `GraphRecursionError` vira resposta de teto atingido; `llmCalls` é a contagem de `AIMessage`; `buildTraceFromMessages` produz thought, action, observation e answer.
2. `src/strategies/plan-execute.ts`: `StateGraph` planner, executor e replanner; `MAX_STEPS = 8`; `planSchema` e `replanSchema` (decisão adjust, continue ou finish; o código explica que o schema é “flat” porque `discriminatedUnion` quebra com modelos via OpenRouter). O executor cria um `createReactAgent` novo por passo e injeta o progresso anterior; `enableReplanner: false` (flag `--no-replanner` do bench) executa o plano linearmente.
3. `src/strategies/reflect.ts`: `withReflection(strategy, { maxReflections = 2, critic, modelFactory })`; `critiqueSchema` com `approved` e `feedback`; evento `critique` com `round` e `approved`; a base é re-executada com `enrichInputWithFeedback`; `llmCalls` soma base e críticas; nome `reflect:<base>`.
4. `src/arena.ts`: `--strategies react,plan-and-execute,reflect:react,reflect:plan-and-execute`, `--input` (ou posicional) e `--max-iterations`; imprime trace, métricas e resposta; erro de uma estratégia não derruba as demais.
5. `src/bench.ts`: cenários C1, C2 e C3, cada um com `check` contra o store e `diagnose` com os motivos do miss; stores novas por célula; flags `--scenario`, `--no-replanner`, `--max-iterations` e (nas pastas posteriores) `--strategies` e `--max-llm-calls`; código de saída 1 se houver miss.

**Como rodar**
- `npm run arena -- --strategies react,plan-and-execute --input "quantos alertas críticos estão disparando?"`.
- `npm run arena -- --strategies reflect:react --input "resuma o plantão e diga o que atacar primeiro"`.
- `npm run bench` ou `npm run bench -- --scenario C1` (chamadas reais, gasta cota do OpenRouter).
- `npm test` cobre store, trace e o decorator de Reflection com críticos fake.

**Armadilhas e achados no código**
- O UNIDADE.md da U2 manda `--strategies react,plan-execute`, mas o nome válido é `plan-and-execute`. O `parseArgs` da arena descarta nomes inválidos em silêncio, então só o ReAct rodaria (a spec usa `plan-and-execute`).
- O teto de recursão do ReAct no código é `maxIterations * 3`; o “12 ciclos” da aula era a referência, não o código final.
- Planner e replanner têm `catch` amplo: se o modelo falhar, o planner cai num plano de um passo e o replanner finaliza. O ReAct trata `GraphRecursionError`; o Plan-and-Execute não.
- No C3, “alerta mais antigo” é o primeiro alerta firing do array (alertas não têm timestamp), ou seja, depende da ordem do seed. O C2 pede “payment” no singular, enquanto o seed a partir da U3 chama o serviço de `payments`.
- O crítico faz fail-open: se a saída estruturada falhar, o código trata como aprovado.
- Nos prompts do bench, “sev2” significa severidade `high` (`const SEV2 = "high"`, estilo PagerDuty). A normalização sev1 a sev4 só vira código compartilhado em `src/domain/severity.ts`, na U3.

---

## 🔗 Para ir além
- [Snapshot da Unidade 2 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/02-padroes-de-raciocinio-e-execucao)
- [LangGraph JS](https://langchain-ai.github.io/langgraphjs)

---

⬅️ [03 · Spec Kit e a estrutura inicial do OpsPilot: contrato de estratégia, trace e fábrica de modelo](./03-spec-kit-e-estrutura-do-opspilot.md)  ·  [05 · Uma API que também é um agente: POST /chat, registry e testes sem rede](./05-api-que-tambem-e-um-agente.md) ➡️
