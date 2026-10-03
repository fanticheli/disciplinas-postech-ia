# 15 · Live Temporal: Process Manager, paralelismo e retry com workflows duráveis

> **Live · 26/09/2026** · Leitura: ~12 min · Bloco: Lives complementares

## 🎯 Em uma frase
O **Process Manager** é o coordenador central que conduz um pedido por várias etapas. Na live ele é um **Workflow do Temporal**: reserva de estoque e autorização de pagamento rodam **em paralelo**; só depois, envio e nota fiscal rodam **em paralelo**; cada chamada externa é uma **Activity** com **retry**. É a versão «durável» do que o [tópico 06](./06-seis-padroes-de-orquestracao.md) chama de Sequential + Parallel + Supervisor e do que o [tópico 07](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md) chama de retry, idempotência e Saga. Atenção: o repositório entrega o **esqueleto** do workshop; o workflow e as activities estão vazios.

---

## 👵 Explicando para a vovó

Imagine um gerente de pedidos numa loja. Chega um pedido e ele liga ao mesmo tempo para o estoque («separa o produto?») e para o financeiro («o cartão passa?»). Só quando os dois dizem sim ele manda, também ao mesmo tempo, o setor de envio gerar a etiqueta e o fiscal emitir a nota. Se o envio não atende, ele não desiste na primeira: liga de novo, e de novo, até a quarta vez.

O diferencial do Temporal é que o caderno do gerente nunca se perde: se ele sair almoçar no meio (o processo cair), outro gerente abre o caderno e continua da última ligação feita, sem repetir as que já deram certo.

---

## 🔧 Tecnicamente

### O que é
- **Process Manager (padrão de integração):** um coordenador que mantém o estado do processo e decide o próximo passo conforme as respostas. O README da live diz que o exemplo se inspira no livro *Enterprise Integration Patterns* e o atribui a Martin Fowler; pelo meu conhecimento (fora da live), o livro é de Gregor Hohpe e Bobby Woolf, e Fowler é o editor da série.
- **Workflow:** pelo `CONTEXT.md`, é «a execução durável que representa a instância do process manager de um pedido»; o glossário pede para não chamá-lo de job nem de controller. **Activity:** operação externa chamada pelo Workflow (Inventory, Billing, Shipping); evitar «step» e «handler». **Compensation:** operação corretiva futura que desfaz uma ação concluída, como liberar a reserva de estoque; evitar «rollback».
- **Fluxo do pedido:** `RECEIVED` (registrado) → `VALIDATING` (Inventory reservation e Payment authorization em paralelo) → `FULFILLING` (Shipment e Invoice em paralelo) → `COMPLETED`, ou `FAILED` se uma etapa termina com falha definitiva. O `workflowId` é igual ao `orderId`.
- **Falhas determinísticas por cenário (mocks):** estoque com `sku-1` responde `422 INSUFFICIENT_INVENTORY`; SKU desconhecido responde `404 PRODUCT_NOT_FOUND`; cartão só de zeros responde `402 PAYMENT_DECLINED`; cartão que não seja só de uns nem só de zeros responde `422 UNKNOWN_CARD`; o Shipping responde `503 SHIPPING_UNAVAILABLE` nas três primeiras tentativas de cada `orderId` e `201` na quarta.
- **Erro de negócio versus erro transitório:** 402 e 422 são recusas definitivas (o pedido vai a `FAILED`), o 503 é transitório (deve ser retentado). O `HttpClientError` do pacote `http-client` carrega `code` e `statusCode` justamente para permitir essa distinção; como a live classifica isso nas Activities não está no repo (hipótese).
- **Escopo declarado do workshop:** sem testes automatizados e sem Activities de Compensation no primeiro escopo; persistência dos pedidos em memória (reiniciar descarta tudo). As extensões sugeridas são testes pelas interfaces públicas, Compensation que libera a reserva de Inventory quando uma etapa posterior falha, e repositório em banco.

### Como funciona
- **Monorepo pnpm:** `apps/*` (`process-manager`, `inventory`, `billing`, `shipping`) e `packages/*` (`contracts`, `http-client`, `mock-http`). Só o servidor do Temporal roda em container; o resto são processos Node na máquina. `pnpm run dev` sobe tudo com `concurrently`.
- **Portas:** Process Manager 3000, Inventory 3001, Billing 3002, Shipping 3003, Temporal gRPC 7233 e Temporal UI em 8080 (o container mapeia `8080:8233`). Na UI aparecem o Workflow, as Activities, os retries e o histórico.
- **Esqueleto do Process Manager:** `main.ts` espera o Temporal aceitar conexão TCP (tenta de novo a cada 1 s), cria o app Nest e escuta em `PORT`. O `AppModule` registra o `TemporalModule` com task queue `order-processing`, `workflowsPath` apontando para `order.workflow.js` (arquivo compilado) e `activityClasses: [OrderActivities]`.
- **Domínio já pronto:** `OrderState` (enum), `OrderEntity` (sem número de cartão: ele só serve à autorização) e `OrderRepository` em `Map` (`save` acrescenta `createdAt`, `saveState` lança erro se o pedido não existe, `remove`, `find`).
- **O que o workshop preenche (os estágios incrementais do `AGENTS.md`):** `OrdersController`, `OrdersService`, `OrderActivities` e `orderWorkflow()` estão vazios. A API pretendida está no README: `POST /orders` responde 202 com `orderId` e `workflowId`; `GET /orders/:orderId` devolve a entidade.
- **Esboço do que a live implementa (hipótese a partir do README e do desenho):** o service grava o pedido em `RECEIVED` e inicia o Workflow com `workflowId = orderId`; o Workflow muda o estado e dispara `Promise.all` sobre as Activities de estoque e pagamento, depois sobre envio e nota; as Activities chamam os clientes HTTP injetados pelos tokens `INVENTORY_HTTP_CLIENT`, `BILLING_HTTP_CLIENT` e `SHIPPING_HTTP_CLIENT`. O motivo de o workflow ficar num arquivo isolado é o sandbox determinístico do Temporal (conhecimento do Temporal, não da live).
- **Como observar o retry:** `pnpm run order:create` imprime `orderId`; `pnpm run order:get -- ORDER_ID` mostra o `state`. O README diz que, como o Shipping falha 3 vezes, é preciso esperar alguns segundos e consultar de novo para ver a transição até `COMPLETED`. Os atalhos `order:fail:inventory` (`sku-1`) e `order:fail:payment` (cartão de zeros) levam a `FAILED`.

### Onde aplicar
- Processos de negócio longos com várias chamadas a sistemas externos, em que perder o ponto de parada no meio é inaceitável (pedido, onboarding, cobrança).
- Fan-out e fan-in explícitos: paralelizar o que é independente (estoque e pagamento) e sequenciar o que depende (envio só depois de aprovado). É o seletor do [tópico 06](./06-seis-padroes-de-orquestracao.md) aplicado a serviços, não a agentes.
- Orquestrar passos de agentes de IA (chamadas de modelo e de ferramentas) como Activities com retry e timeout, no lugar de um barramento em memória como o do protótipo do [tópico 07](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md) (que perde mensagens se o processo cair); aplicação sugerida por analogia, a live não usa LLM.
- Ensinar o vocabulário do domínio com um `CONTEXT.md` que lista também os termos a evitar.

### Vantagens e limites
**Vantagens**
- Estado e progresso duráveis, com histórico visível na Temporal UI.
- Retry e paralelismo declarados no workflow, não espalhados em controllers e filas.
- Mocks determinísticos tornam cada cenário (sucesso, estoque, pagamento, retry) reproduzível.
- O coordenador único deixa a ordem das etapas legível num só lugar.

**Limites**
- O coordenador conhece todos os serviços: é um ponto central de acoplamento (o mesmo trade-off do Supervisor).
- Exige operar o Temporal e respeitar as regras de determinismo do workflow (conhecimento do Temporal).
- Compensation, testes e persistência real ficaram fora do escopo do workshop; sem Compensation, nada libera a reserva de Inventory se uma etapa posterior falhar (é a extensão sugerida no README).
- Os mocks guardam estado em memória (contador de tentativas do Shipping): reiniciar o mock zera o retry.

### 🚫 Armadilhas
- Tratar 402 e 422 como transitórios e repetir para sempre; ou tratar o 503 como definitivo e falhar o pedido na primeira tentativa.
- Retry sem idempotência: o Billing e o Inventory respondem com ids derivados do `orderId` (`authorization-ORDER`, `reservation-ORDER`), mas os mocks não guardam estado, então isso não prova que o retry de uma Activity real seria seguro.
- Colocar lógica de I/O dentro do arquivo do workflow; a live separa o workflow (`order.workflow.ts`) das Activities.
- Usar a imagem `temporalio/temporal:latest` sem fixar versão: o ambiente do workshop pode mudar de comportamento entre execuções.
- Esperar o fluxo completo logo após o clone: sem implementar controller, service, activities e workflow, `order:create` não tem rota para chamar.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Process Manager | Coordenador que mantém o estado do processo e decide o próximo passo |
| Workflow (Temporal) | Execução durável de um processo; aqui, uma por pedido |
| Activity (Temporal) | Operação externa chamada pelo workflow, com retry |
| Task queue | Fila de onde o worker pega trabalho; aqui, `order-processing` |
| Fan-out / fan-in | Disparar etapas independentes juntas e esperar todas antes de seguir |
| Compensation | Ação que desfaz uma etapa concluída (liberar a reserva de estoque) |
| Falha transitória | Erro que pode passar sozinho (503); retentar |
| Falha definitiva | Recusa de negócio (402, 422); não adianta retentar |
| `workflowId = orderId` | Casa o pedido com a execução do Temporal; facilita achar o workflow na UI |

---

## 💻 No código do repo

**Projeto:** [lives/2026-09-26 (Temporal Process Manager Workshop)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-09-26)

Monorepo pnpm com um Process Manager (NestJS mais Worker do Temporal) e três serviços simulados (Inventory, Billing, Shipping) sobre um `json-server`, mais scripts para criar e consultar pedidos. O que está no repositório é o **ponto de partida do workshop**: infraestrutura, contratos, mocks e domínio prontos; controller, service, activities e workflow vazios.

**Fluxo**
1. `package.json` e `pnpm-workspace.yaml`: scripts `dev`, `infra:up`/`infra:down`, `*:up` por app, `order:*`, `build` e `typecheck`. `compose.yaml` sobe só o `temporalio/temporal:latest` com `server start-dev` (7233 e UI em 8080).
2. `packages/contracts/src/index.ts`: tipos `OrderRequest` e `OrderInput` (request mais `orderId`) e os pares requisição/resposta de reserva, autorização, nota e envio, com status literais `RESERVED`, `AUTHORIZED`, `ISSUED` e `ACCEPTED`.
3. `packages/http-client`: `createHttpClient` (axios) converte falhas em `HttpClientError(message, code, statusCode, details)` lendo `error` e `message` do corpo; o módulo global `HttpClientsModule` expõe um cliente por serviço, com URL em `INVENTORY_URL`, `BILLING_URL` e `SHIPPING_URL` (padrões 3001, 3002 e 3003).
4. `packages/mock-http`: `createMockServer` tenta primeiro a função `route`; se ela devolve `false`, delega ao `json-server` 1.0.0-beta.15 com banco em memória. `respond` e `readJsonBody` são os helpers.
5. `apps/inventory` (`POST /inventory/reservations`), `apps/billing` (`POST /billing/authorizations` e `/billing/invoices`) e `apps/shipping` (`POST /shipping/shipments`, com contador de tentativas por `orderId`) implementam os cenários da tabela do README.
6. `apps/process-manager`: `main.ts`, `app.module.ts`, `temporal.runtime.ts` (endereço, namespace, task queue `order-processing`, `waitForTemporal`), `order.entity.ts` e `orders.repository.ts` prontos; `orders.controller.ts`, `orders.service.ts`, `order.activities.ts` e `order.workflow.ts` são os pontos a preencher.
7. `scripts/*.mjs`: `order-client.mjs` (`fetch` com variáveis `CUSTOMER_ID`, `SKU`, `QUANTITY`, `CARD_NUMBER`, `AMOUNT`), `order-create`, `order-get`, `order-fail-inventory` e `order-fail-payment`. `CONTEXT.md` e `AGENTS.md` fixam o vocabulário e as regras de escopo.

**Como rodar**
- Pré-requisitos do README: Node 24.21.0 (via nvm), pnpm 12.4.2, Docker com Compose e navegador para a Temporal UI.
- `pnpm install --frozen-lockfile` e `pnpm run dev` na raiz; depois `pnpm run order:create` e `pnpm run order:get -- SEU_ORDER_ID`. Para parar: Ctrl+C e `pnpm run infra:down`.
- Não executei nada desta live (exigiria `pnpm install` e Docker). O que afirmo vem da leitura do código. Com o esqueleto atual, esperar o fluxo completo é incorreto, pois o controller não tem handlers.

**Armadilhas e achados no código**
- **README descreve o estado final, o código é o esqueleto:** `OrdersController` não tem rotas, então `POST /orders` e `GET /orders/:id` não existem e os scripts `order:*` receberiam 404; `orderWorkflow()` é uma função vazia que retorna `Promise<void>`.
- O README manda rodar `nvm install` / `nvm use` e diz que a versão do Node está no `.nvmrc`, mas não há `.nvmrc` na pasta (listei os arquivos ocultos).
- `nestjs-temporal-core@3.4.0` declara peer dependency de `@nestjs/common` e `@nestjs/core` em `^9 || ^10 || ^11`, e o projeto usa `^12.0.3`: peer fora da faixa (o pnpm deve avisar; não instalei para ver se funciona).
- O README diz que qualquer cartão diferente do aprovado e do recusado responde `422 UNKNOWN_CARD`; o Billing usa regex (`/^0+$/` recusa e `/^1+$/` aprova), então qualquer sequência só de uns (por exemplo `11`) é autorizada e só de zeros é recusada.
- O Inventory só distingue pelo SKU: `sku-1` sempre recusa, `sku-5` sempre reserva, e a quantidade é só validada (inteiro positivo); não existe estoque real.
- O `process-manager` tem script `dev` que roda `build` e depois `node dist/main.js`: não há modo watch. O pacote `http-client` exporta `dist/index.js` (precisa de build), enquanto `contracts` e `mock-http` exportam `src/*.ts`.
- O final do `CONTEXT.md` tem uma linha solta `_Avoid_: Sleep, timeout` sem termo associado.
- Erros de digitação no README («Inventoty», «nota fical»).

---

## 🔗 Para ir além
- [Pasta da live 26/09 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-09-26)
- [Temporal UI local (README da live)](http://localhost:8080)

---

⬅️ [14 · Model Cascading e orçamento por tenant: a arquitetura completa e o critério final](./14-model-cascading-e-orcamento-por-tenant.md)  ·  [README](./README.md)
