# 11 · Circuit breaker, retry e degradação graciosa

> **Unidade 3 · Aula 15** · Leitura: ~10 min · Bloco: Unidade 3 · Qualidade, resiliência e MCP

## 🎯 Em uma frase
Em produção o Serper cai, oscila e estoura limite. O projeto envolve qualquer **SearchProvider** num **decorator** (`comResiliencia`) com timeout de 10 s, até 3 tentativas com **backoff exponencial** e **circuit breaker**; e o nó web search captura erro por query para o grafo terminar no **answer** com aviso de contexto incompleto.

---

## 👵 Explicando para a vovó

Você liga para um restaurante e ninguém atende. Primeiro você espera um tempo razoável (timeout), depois tenta de novo com intervalos cada vez maiores (retry com backoff). Se já ligou várias vezes e continua sem resposta, para de ligar por um tempo, para não atrapalhar a cozinha que está tentando se recuperar (circuit breaker).

Se mesmo assim o restaurante não abre, você não fica parado de fome: pede o que tem em casa e avisa que o jantar ficou incompleto. Isso é degradação graciosa. Mas se o problema for o pagamento de um ingresso, você não finge que deu certo: avisa que falhou.

---

## 🔧 Tecnicamente

### O que é
- **Contexto:** o modo demo resolve dev e demonstração, não produção. Em produção a flag está desligada e o Serper está no ar de verdade, inclusive nos dias em que não está.
- **Timeout:** `fetch` não tem timeout por padrão; se o Serper travar, a requisição trava junto. Erro claro é melhor que espera sem fim. No projeto: 10 segundos, com o parâmetro `signal`, nos dois providers.
- **Retry com backoff:** a falha pode ser passageira (pico). Cancela a conexão e tenta de novo; muitas vezes fica transparente para o cliente. Máximo de tentativas padrão: três, com backoff exponencial.
- **Circuit breaker:** retry mal feito vira falha em massa e derruba o terceiro que tenta se recuperar. O circuito abre após algumas falhas consecutivas; chamadas seguintes falham na hora, sem chamar o provider, até passar o resfriamento. Quando uma tentativa dá certo, fecha. Protege o serviço externo e a latência do próprio sistema.
- **Onde se aplica:** a aula aplica ao Serper, mas serve a Vertex AI ou banco. Em sistema com muitos microsserviços é muito comum; o projeto só tem um serviço externo de busca.
- **Decorator:** comportamento padronizado implementado uma vez numa função que envelopa outra. O problema: dar a mesma resiliência ao Serper e ao Google Custom Search sem reescrever os dois. Decorator não é o arroba (syntax sugar, não padrão de JS/TS); no projeto é `comResiliencia` envolvendo o provider. Primeiro o problema, depois o padrão.
- **Constantes configuráveis no arquivo próprio:** máximo de tentativas (padrão 3), backoff inicial, limite de falhas consecutivas e tempo de resfriamento. Tempo de espera e relógio são injetáveis para testar sem esperar segundos de verdade. A fixture do DEMO fica fora da camada, porque não há rede para proteger.
- **Degradação graciosa:** depois de tentar tudo, registrar em log/telemetria e mostrar a falha de forma que conforte; o pior é tela branca. No nó web search: `try/catch` por query; se nenhuma rende documento, o nó não adiciona nada, o grafo volta ao retrieve de mãos vazias, o guard de iteração corta o loop e o answer avisa que o contexto pode estar incompleto.
- **Quando degradar e quando falhar:** extrato e saldo (PO define uma tela só com saldo) aceitam degradação; pagamento de ingresso não: a operação aborta, o usuário recebe mensagem, tudo vai para telemetria. Mesmo a falha obrigatória vem com mensagem, nunca tela em branco.
- **Grafo com answer:** grade decide; contexto suficiente vai ao answer, insuficiente vai ao web search, que volta ao retrieve no máximo duas vezes; na última, a execução vai ao answer. Antes, com contexto suficiente o processamento só terminava.
- **O que os testes pegaram:** o nó answer não tinha evento de chat (sem ele não apareceria no painel de raciocínio) e o LangGraph não aceita canal de estado com o mesmo nome de um nó, então o canal virou `answerText` (o evento SSE segue com o campo `answer`). O agente corrigiu o código, não o teste: deixe isso explícito nas instruções.

### Como funciona
- Prompt ao Claude Code: timeout explícito de 10 s no fetch dos dois providers, depois um decorador `comResiliencia()` com retry, backoff exponencial e circuit breaker, aplicado por padrão em `criarSearchProvider()` a Serper e Google, não à fixture DEMO.
- No provider: `fetch(..., { signal: AbortSignal.timeout(10_000) })`; a exceção de abort sobe e é capturada pelo decorador, que tenta de novo.
- No decorator: um `for` chama `provider.search(query)` até `maxTentativas`; entre tentativas espera `backoffBaseMs * 2 ** (tentativa - 1)`.
- Ao esgotar as tentativas conta uma falha consecutiva; ao atingir o limiar grava `abertoAte = agora() + tempoResfriamentoMs`.
- Chamada com circuito aberto lança `CircuitoAbertoError` na hora, sem tocar o provider; passado o resfriamento, volta a chamar o provider.
- Injete `esperar` e `agora` nas opções para os testes usarem relógio e espera falsos.
- No nó web search, envolva só a chamada `search()` de cada query em `try/catch` e use `continue`; não propague.
- Escreva o teste de ponta a ponta em `graph.test.ts`: SearchProvider sempre falhando e o grafo ainda assim termina em answer com resposta real.

### Onde aplicar
- Qualquer chamada a API de terceiro com cota ou instabilidade (busca, LLM, pagamento, e-mail).
- Vários providers com a mesma interface: um decorator em vez de duplicar retry em cada um.
- Fluxos agênticos em que uma ferramenta secundária (busca web) não deve derrubar a resposta principal (corpus).
- Regras de negócio com decisão explícita de degradar ou falhar, definida com o PO.

### Vantagens e limites
**Vantagens**
- Resiliência escrita uma vez e reutilizada por qualquer provider.
- Circuit breaker protege o terceiro e a latência do próprio sistema.
- Usuário recebe resposta parcial e avisada em vez de tela branca.
- Testável sem esperar tempo real, graças a espera e relógio injetáveis.

**Limites**
- Mais código e mais estado (contador e instante de abertura) por instância de provider.
- Retry multiplica a latência percebida antes da falha final.
- Degradar entrega resposta incompleta: só serve onde a regra de negócio aceita.
- Se o framework já traz resiliência, reimplementar é duplicação (a aula recomenda usar o que o framework dá).

### 🚫 Armadilhas
- Capturar erro e seguir em frente em todo lugar, como se nunca fosse haver erro: pagamento precisa falhar.
- Retry sem breaker: insiste em serviço que está subindo e piora a queda.
- Duas instâncias do provider significam dois circuit breakers independentes para a mesma API (ver aula 17).
- Mudar o teste para passar: o agente deve corrigir o código, não o teste.
- Código: o `catch` do nó web search descarta o erro sem registrar log; a aula diz que o log entra quando a observabilidade for adicionada, mas o `web-search.ts` final não tem log nesse ponto.

> 💡 Escreva a política de degradação por regra de negócio (degrada, falha, ou alerta) antes de escrever try/catch, e valide com quem conhece o cliente.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Timeout | Limite de espera do fetch; no projeto 10 s via AbortSignal. |
| Retry com backoff | Nova tentativa com espera crescente (200 ms, 400 ms...) para absorver falha passageira. |
| Circuit breaker | Após N falhas consecutivas o circuito abre e as chamadas falham na hora até o resfriamento. |
| Resfriamento | Tempo em que o circuito fica aberto; padrão do repo, 30 000 ms. |
| Decorator | Função que envelopa outra e acrescenta comportamento; independe da sintaxe com arroba. |
| comResiliencia | Decorator do projeto que envolve qualquer SearchProvider. |
| CircuitoAbertoError | Erro lançado quando o circuito está aberto, sem chamar o provider. |
| Degradação graciosa | Entregar resposta parcial e avisada quando o serviço não volta. |
| MAX_ITERATIONS | Guard de iteração do grafo, valor 2: força a saída para o answer. |
| answerText | Canal de estado do answer, renomeado porque não pode ter o nome do nó. |

---

## 💻 No código do repo

**Projeto:** [packages/agent/src/search, nodes/web-search.ts, graph.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/search)

Li o decorator, os providers, o nó, o grafo e os testes. Não executei os testes. Nomes em português (comResiliencia, OpcoesResiliencia, CircuitoAbertoError) são os do repo.

**Fluxo**
1. `search/resilient-search-provider.ts`: `comResiliencia(provider, opcoes)`; defaults `maxTentativas=3`, `backoffBaseMs=200`, `limiarCircuito=3`, `tempoResfriamentoMs=30_000`, `esperar` e `agora` injetáveis.
2. Estados do circuito: não há enum. O estado é `abertoAte: number | undefined` e `falhasConsecutivas`; aberto se `agora() < abertoAte`. Sucesso zera contador e `abertoAte`.
3. `search/serper.ts` e `search/google-custom-search.ts`: `TIMEOUT_MS = 10_000` e `signal: AbortSignal.timeout(TIMEOUT_MS)` no fetch.
4. `search/index.ts`: `criarSearchProvider()` devolve `criarSearchProviderFixture()` se `DEMO === 'true'`; senão `comResiliencia(makeSerperProvider(...))` ou Google; `SEARCH_PROVIDER` default `serper`.
5. `nodes/web-search.ts`: `for (const query of queries)` com `try { search(...).slice(0, 3) } catch { continue }`; `RESULTADOS_POR_QUERY = 3` e `TTL_PADRAO_DIAS = 7`; retorna `{}`.
6. `graph.ts`: `MAX_ITERATIONS = 2`; `proximoNo` manda ao `answer` se `sufficient` ou `iterations >= MAX_ITERATIONS`, senão a `webSearch`; canal `answerText` com comentário sobre a colisão de nome.
7. `answer/format-resposta.ts`: com `sufficient` falso acrescenta "O contexto disponível pode estar incompleto para responder com certeza."
8. Testes: `resilient-search-provider.test.ts` (retry, backoff `[200, 400]`, abre circuito, fecha após 30 s, sucesso zera contador), `web-search.test.ts` (degradação por query), `graph.test.ts` (SearchProvider falhando termina em answer contendo "incompleto").

**Como rodar**
- `pnpm --filter @hero/agent test` (hipótese: filtro padrão do pnpm; não executei).
- `pnpm test` na raiz, que roda o turbo por pacote.

**Armadilhas e achados no código**
- Achado: a aula diz que depois de três tentativas o circuito abre; no código o contador `falhasConsecutivas` conta chamadas a `search()` que esgotaram as tentativas. Com os defaults, são 3 buscas falhas, ou 9 chamadas ao provider, antes de abrir.
- Achado: não há estado half-open explícito. Depois do resfriamento a próxima chamada vai ao provider e, se falhar, o contador já está no limiar e reabre o circuito de imediato.
- Achado: o retry também repete erros não transitórios (por exemplo, resposta 4xx do Serper), porque o decorator captura qualquer exceção.
- Achado: o estado do circuito vive dentro de cada instância de `comResiliencia`; é por isso que a instância do grafo precisa ser compartilhada (ver D11-12).
- Achado: `catch { continue }` em `web-search.ts` não registra log, embora o comentário diga "degradação graciosa, não silêncio".

---

## 🔗 Para ir além
- [Capstone Project AI Researcher](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)
- [AI Researcher Seed](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed)
- [packages/agent/src/search](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/search)
- [Circuit Breaker (Martin Fowler)](https://martinfowler.com/bliki/CircuitBreaker.html)

---

⬅️ [10 · Testando o grafo sem rede](./10-testing-the-graph-without-network.md)  ·  [12 · Erros padronizados e o servidor MCP](./12-standard-errors-and-mcp-server.md) ➡️
