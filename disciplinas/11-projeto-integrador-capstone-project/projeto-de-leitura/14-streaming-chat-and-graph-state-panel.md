# 14 · Chat com streaming e citações clicáveis + painel de estado do grafo

> **Unidade 4 · Aulas 19 e 20** · Leitura: ~12 min · Bloco: Unidade 4 · Frontend

## 🎯 Em uma frase
O **ChatService** faz POST em `/api/chat` e devolve um async generator de eventos; o **ChatStore** guarda mensagens e solta a resposta aos poucos (70 ms por passo); o **parseAnswer** separa corpo e fontes; o **GraphStore** deduz o andamento do grafo a partir de eventos de nó concluído, espelhando o limite de iterações sem importar o pacote do agente.

---

## 👵 Explicando para a vovó

Pense numa transmissão ao vivo de futebol com narrador. A rede entrega os lances em rajadas irregulares, mas o narrador (ChatStore) fala num ritmo constante para o texto parecer natural. A régua de pontos no canto da tela (painel do grafo) só recebe "fulano terminou a jogada"; quem desenha a próxima jogada é o próprio painel, adivinhando pelas regras do jogo.

As citações são a bibliografia no fim do artigo: o texto vem primeiro, as fontes aparecem quando ele termina, e cada fonte diz se veio do arquivo da casa (base local da CVM) ou da internet.

---

## 🔧 Tecnicamente

### O que é
- **Peças (Aula 19):** rotas (chat na raiz, health em /health), ChatService (POST + leitura do stream), ChatStore (mensagens e revelação), parseAnswer (citações) e o componente Chat que liga tudo.
- **Roteamento:** a aula refatora o frontend para `app.routes.ts` com '' para Chat e 'health' para um componente Health novo, `provideRouter` em app.config e `<router-outlet />` em app.html. Standalone components, sem módulos.
- **Bug da rota /chat da API:** depois do MCP, a rota respondia só pelo grafo falso. A correção faz a rota receber um `getGraph` resolvido com `await` no handler, e o `index.ts` passa a mesma função memoizada (`getRealGraph`) para chat e MCP, para não duplicar Postgres, Vertex AI e circuit breaker.
- **ChatService:** método `ask(question)` com fetch POST, leitura do ReadableStream e async generator dos eventos (retrieve, grade, webSearch, answer). Frames separados por linha em branco, com `data:` e JSON. Evento `error` lança exceção com a mensagem.
- **Contrato no pacote compartilhado:** o schema do evento vive em `@hero/contracts`, servindo Angular e backend. Angular atual: `inject()`, Observable não é mais obrigatório com signals, e `resource` não foi usado porque na época não tratava retorno por stream.
- **ChatStore e o truque da digitação fluida:** chunks chegam irregulares; mostrar como chegam deixa o texto truncado. O store guarda a resposta como buffer e a solta a 70 ms por passo. Não é obrigatório, é UX. Falha na chamada mostra mensagem de erro fixa, sem streaming, e timers pendentes são limpos.
- **Citações:** o answerText termina com um bloco de fontes. Rótulo com ticker e período vira origem 'Base local (CVM)' com data-base; qualquer outro vira o hostname da URL.
- **Componente Chat:** injeta o store, liga input a um signal local, Enter envia, botão desabilitado enquanto vazio ou aguardando resposta, mensagens com `@if`/`@for` (sintaxe atual, em vez de ngIf/ngFor).
- **Painel do grafo (Aula 20):** requisito do projeto, didático (ChatGPT e Gemini não mostram). O backend informa cada nó *conforme o processa*, nunca avisa que concluiu um e que outro vem; o frontend deduz. A cada evento: marca a última etapa como concluída e prevê a próxima.
- **Tabela de previsão:** retrieve leva sempre a grade; grade suficiente leva a answer; grade insuficiente leva a webSearch, exceto se o máximo de iterações já foi atingido (aí answer); webSearch leva sempre a retrieve.
- **Espelhar sem importar:** o limite de iterações é copiado como constante no frontend porque @hero/agent carrega LangGraph, Vertex AI e Postgres, que não pertencem ao bundle. Risco: se o backend mudar o limite (ex.: 3) o front fica errado. Atenuante: monorepo, o agente lê os dois.
- **Componente do painel:** timeline vertical, spinner enquanto running, check quando concluída, rótulo, descrição e duração; banner de fallback quando alguma etapa é webSearch. Durações são calculadas no frontend pela chegada dos eventos, portanto aproximadas (medição precisa é a Aula 22).

### Como funciona
- Backend escreve `data: {json}\n\n` por nó concluído; o ChatService acumula bytes num buffer, divide em `\n\n`, guarda o resto parcial e entrega cada frame.
- `ask()` valida cada evento com o schema do contrato antes de entregar; se o frame for `event: error`, lança `Error` com a mensagem.
- `ChatStore.send()`: ignora vazio ou se já há envio pendente; adiciona mensagem do usuário e placeholder do assistente; chama `graphStore.startRun()`; para cada evento chama `graphStore.onEvent()` e, no evento answer com texto, inicia a revelação.
- A revelação faz `parseAnswer(fullText)`, tokeniza só o corpo e avança 1 token a cada 70 ms; as citações aparecem de uma vez quando a mensagem termina.
- `parseAnswer` procura `\n\nFontes:\n`; cada linha `- rótulo: url` vira uma Citation; rótulo com período vira 'Base local (CVM)' + data-base, senão origem é o hostname (ou 'Busca web' se a URL for inválida).
- Teste local: Postgres no ar com migrate e seed feitos. O Postgres da aula é efêmero (sem volume); reiniciou a máquina, suba e semeie de novo. Com volume Docker a carga persiste.
- Verificação no navegador pelo agente (Claude no Chrome, porta 4200): pergunta sobre o lucro líquido da Petrobras; o agente achou o botão desabilitado com aparência de habilitado, corrigiu e retestou. Teste unitário não pegaria isso.
- GraphStore: `startRun()` zera e empurra retrieve em execução; `onEvent()` conclui a última etapa do mesmo nó e empurra a prevista; `failRun()` fecha a etapa pendente se o stream falhar.
- Monorepo com Turborepo permite rodar todos os testes (a aula fala em mais de 40), só os de frontend ou só uma parte do backend.

### Onde aplicar
- Qualquer chat com LLM via SSE sobre POST (EventSource só faz GET).
- UX de streaming irregular: buffer no cliente e revelação em ritmo fixo.
- Agentes com etapas visíveis ao usuário, mesmo quando o backend só emite nó concluído.
- Monorepo front e back: espelhar constante em vez de importar pacote de servidor no bundle.

### Vantagens e limites
**Vantagens**
- Serviço isola integração; componente só renderiza.
- Revelação em ritmo fixo esconde a irregularidade da rede.
- Painel dá transparência do raciocínio sem mudar o backend.
- Contrato compartilhado reduz drift entre front e back.

**Limites**
- Revelação artificial atrasa a resposta que já chegou inteira.
- Previsão do próximo nó é heurística; se o grafo mudar, o painel mente.
- Constante espelhada pode ficar desatualizada.
- Durações do cliente incluem latência de rede e não são medida do backend.

### 🚫 Armadilhas
- Importar @hero/agent no frontend: leva LangGraph, Vertex AI e pg para o bundle (o prompt precisa proibir).
- Duas instâncias do grafo (chat e MCP): circuit breaker e conexões duplicados; use a mesma função memoizada.
- Achar que teste unitário cobre aparência: o botão desabilitado com cara de habilitado só apareceu no navegador.
- Postgres local efêmero: depois de reiniciar a máquina os testes falham até refazer migrate e seed.
- Mostrar erro de backend cru na tela: use mensagem fixa.

> 💡 Escreva a tabela de transições do grafo uma vez (no pacote do agente) e cubra a cópia do frontend com um teste que falha se MAX_ITERATIONS divergir; espelhar sem teste é aposta.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| ChatService | Serviço Angular que faz POST em /api/chat e devolve AsyncGenerator de eventos. |
| ChatStore | Store com signals: mensagens, estado pendente e revelação da resposta. |
| parseAnswer | Separa o corpo do bloco 'Fontes:' e monta as Citation. |
| GraphStore | Store que deduz etapas concluídas e prevê a próxima a partir dos eventos. |
| STREAM_SPEED_MS | Constante de 70 ms do ritmo de revelação. |
| SSE por POST | Frames 'data: json' separados por linha em branco, lidos do ReadableStream. |
| Fallback | Passagem por webSearch quando o contexto local é insuficiente. |
| MAX_ITERATIONS | Limite de rodadas do loop retrieve, grade, webSearch (2 no repo). |
| getRealGraph | Função memoizada que entrega o mesmo grafo ao chat e ao MCP. |
| Pirâmide de testes | Unitário, integração e navegador se complementam. |

---

## 💻 No código do repo

**Projeto:** [apps/web/src/app (api, state, chat, graph), apps/api/src/routes/chat.ts, packages/contracts/src/chat.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/web/src/app)

Li todos os arquivos citados abaixo no repo completo. Contei 38 blocos `it(` em 9 arquivos de spec de apps/web com grep, mas não executei os testes nem o build. O seed só tem o health check no Angular.

**Fluxo**
1. `apps/web/src/app/api/chat.service.ts`: `parseSse` (buffer, split em `\n\n`) e `ask()`; faz `fetch('/api/chat')`, lança em status não ok ou evento `error`, e valida com `chatStreamEventSchema.parse`.
2. `packages/contracts/src/chat.ts`: `chatRequestSchema` (question min 1) e `chatStreamEventSchema` (node enum de 4 valores, documents, sufficient, missingAspects, iterations, answerText).
3. `apps/web/src/app/state/chat-store.ts`: `STREAM_SPEED_MS = 70`, signals `messages` e `pending`, `send()`, `startReveal()` via `setInterval`, mensagem de erro fixa 'Não foi possível obter uma resposta agora...'.
4. `apps/web/src/app/state/chat-message.ts`: `tokenize` com `split(/(\s+)/)` mantendo espaços como tokens, e `visibleText`.
5. `apps/web/src/app/state/citation.ts`: `parseAnswer`, marcador `'\n\nFontes:\n'`, regex de linha e de rótulo com período, fallback 'Busca web'.
6. `apps/web/src/app/state/graph-step.ts` e `graph-store.ts`: tipos, `detalheParaEvento`, `formatarDuracao`, `MAX_ITERATIONS = 2`, `proximoNoEsperado`, `failRun`.
7. `apps/web/src/app/graph/graph-panel/graph-panel.ts` e `.html`: timeline com spinner ou check, rótulo 'Retrieve · iteração N' a partir da 2ª volta, banner de fallback com `fallbackActive`.
8. `apps/api/src/app.ts`: `criarObterGrafo()` (instância única memoizada) alimentando `chatRoute` e `mcpHttpRoute`; `packages/agent/src/graph.ts` define `MAX_ITERATIONS = 2`.

**Como rodar**
- `pnpm install`
- `pnpm db:migrate` e `pnpm seed` (Postgres local no ar, exige credenciais Vertex AI)
- `pnpm --filter @hero/web run test` (ng test)
- `pnpm dev` (turbo) ou `pnpm --filter @hero/web run start` e abrir http://localhost:4200; não executei

**Armadilhas e achados no código**
- Achado: a aula descreve roteamento com `app.routes.ts` e componente Health; no repo final não há `app.routes.ts`, nem `provideRouter` em app.config.ts, e `app.html` é só `<app-chat />` (grep sem ocorrência de router em apps/web/src). Essa refatoração não está no estado final do repo.
- Achado: a aula fala em textarea com Enter envia e Shift+Enter quebra linha; o chat.html usa `<input type="text">` e o `onKeydown` trata só Enter, sem Shift.
- Achado: a aula descreve rótulo 'TICKER · período (data-base X)'; o repo usa o formato `TICKER (período, data-base X)` (regex `ROTULO_COM_PERIODO`, gerado por `formatarCitacoes` em packages/agent/src/answer/format-resposta.ts), e a citação exibida é 'VALE (3T25)'.
- Achado: `tokenize` mantém espaços como tokens e o intervalo de 70 ms avança 1 token por tick, então o ritmo efetivo é de cerca de 70 ms por token (palavra ou espaço), ou seja, ~35 ms por palavra, não 70 ms por palavra como a aula narra. Conclusão por leitura do código, não medi.
- Achado (hipótese por leitura): o evento answer é o último; ao terminar o stream `pending` vira false enquanto a revelação ainda corre. Se o usuário enviar outra pergunta nesse intervalo, `send()` chama `clearReveal()` e a mensagem anterior pode ficar com `done: false` (cursor preso). Não reproduzi.
- Achado: o painel do protótipo tem 4 etapas fixas; o `GraphStore` do repo modela uma lista que cresce a cada passagem por um nó (com 'iteração N'), segundo o CLAUDE.md para não colapsar o loop.
- Achado: o `ChatStore` também injeta o `GraphStore` e o orquestra; a aula apresenta os dois stores separados. O `chat.html` tem ainda um botão 'Nova conversa' (`reset()`) que a aula não menciona.
- Achado: a opção do build da API hoje é `graph`/`mcpGraph` com `criarObterGrafo()`, e não `getChatGraph`/`getMcpGraph`/`getRealGraph` como no prompt da aula; o objetivo (uma instância só) foi mantido.

---

## 🔗 Para ir além
- [Projeto completo (capstone)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main)
- [apps/web (Angular)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/web)
- [state/ (stores e parseAnswer)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/web/src/app/state)
- [Ponto de partida (seed)](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed)

---

⬅️ [13 · Do protótipo no Claude Design à skill frontend-design](./13-claude-design-to-frontend-design-skill.md)  ·  [15 · Disclaimer, guardrail visual e o E2E no CI](./15-disclaimer-visual-guardrail-and-e2e-in-ci.md) ➡️
