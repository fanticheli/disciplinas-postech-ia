# 📝 Disciplina 11 · Prova comentada

> Projeto Integrador (Capstone Project): o AI Researcher. Cada questão traz o enunciado, a resposta certa, o raciocínio, uma mini-aula dos conceitos citados, o erro de cada alternativa errada e onde se aprofundar no guia de leitura.

**Resumo das respostas**

| Questão | Tema | Resposta |
|---------|------|----------|
| 01 | Quando o grafo aciona a busca na web (RAG corretivo e nó grade) | **D** |
| 02 | Restrição regulatória da CVM e guardrail no código | **D** |
| 03 | Função principal do chatbot AI Researcher | **D** |
| 04 | Serper indisponível: timeout, retry, circuit breaker e degradação graciosa | **E** |
| 05 | Workload Identity Federation no GitHub Actions | **D** |
| 06 | Rate limiting x budget de tokens em /api/chat | **D** |
| 07 | Origem dos dados do corpus (ITR e DFP da CVM) | **E** |
| 08 | Parágrafos do corpus por template determinístico | **D** |
| 09 | Papel do CLAUDE.md | **D** |
| 10 | Guard MAX_ITERATIONS = 2 | **B** |

---

## Questão 01 · Quando o grafo aciona a busca na web (RAG corretivo e nó grade)

**Pergunta:** Em que situação o grafo do agente aciona a busca na web?

**Alternativas:**
- A) Quando o Postgres atinge o limite de conexões.
- B) Sempre, em toda pergunta, para dados atualizados.
- C) Quando o Vertex AI está indisponível.
- D) ✅ Somente quando o nó grade classifica o contexto recuperado do corpus como insuficiente.
- E) Apenas quando o usuário pede explicitamente busca externa.

**Resposta: D.** Somente quando o nó grade classifica o contexto recuperado do corpus como insuficiente.

### Resolução comentada

Comece pelo desenho do fluxo: a pergunta vai primeiro à base vetorial (o corpus da CVM). Quem decide o que acontece depois não é o usuário, nem uma falha de infraestrutura: é o nó `grade`, que olha os documentos recuperados e responde "isso basta para responder a pergunta?". Só se a resposta for "não" o grafo segue para `webSearch`.

Esse desenho se chama RAG corretivo: a recuperação não é aceita às cegas, ela é avaliada e, se estiver fraca, corrigida com outra fonte. O resultado da busca web é gravado na base e o fluxo volta ao `retrieve`, para o `grade` reavaliar.

Na prática, o corpus só tem números (indicadores de balanço). Uma pergunta numérica coberta pelo corpus fica na base. Uma pergunta qualitativa (motivo de uma queda, último fato relevante) é considerada insuficiente mesmo com a empresa certa, e aí a web entra.

### Entenda os conceitos

- **RAG (Retrieval-Augmented Generation):** recuperar documentos numa base antes de gerar a resposta. No projeto, a base é o Postgres com pgvector e é sempre a primeira fonte.
- **RAG corretivo:** variação em que um passo extra avalia a qualidade do que foi recuperado e, se for ruim, aciona uma correção (aqui, a busca na web). É o slide 1.1 da revisão integrada, que avisa ser um desenho simplificado: o grafo real tem guard de iteração e persistência do enriquecimento web.
- **Nó `grade`:** usa uma LLM com saída estruturada (schema zod `{ sufficient: boolean, missingAspects: string[] }`). Pergunta numérica coberta é suficiente; qualitativa, sem documentos ou com período ou indicador ausente é insuficiente. O guia chama de "bilhete escrito": não há mágica, é um prompt interno.
- **Aresta condicional:** aresta do grafo cujo destino é decidido por uma função sobre o estado. Aqui ela olha `sufficient` e `iterations`.
- **`webSearch` e retroalimentação:** o nó busca na web usando os `missingAspects`, grava os trechos numa tabela vetorial com validade (TTL de 7 dias por padrão) e volta ao `retrieve`. Uma pergunta parecida depois já acha o conteúdo na base.
- **Analogia do guia:** o `retrieve` é o auxiliar que traz as cinco pastas mais parecidas com o assunto; o `grade` é o chefe que olha as pastas e diz se respondem ou não.
- **Calibragem do grade:** regra fechada demais manda tudo para a web (mais custo); aberta demais nunca busca e deixa a resposta incompleta.

### Por que as outras erram

- **A:** limite de conexões do Postgres é problema de infraestrutura e não é critério de roteamento do grafo.
- **B:** "sempre" anula a ideia de base primeiro. O guia lista como vantagem justamente que usar a base antes é mais rápido e mais barato em tokens do que ir sempre à internet.
- **C:** indisponibilidade do Vertex AI não aciona a web. A web é acionada por insuficiência de contexto, não por falha de outro serviço.
- **E:** o usuário não controla o roteamento. A decisão é do sistema, pelo julgamento do `grade`.

### Aprofundar no guia

- [06 · Os nós retrieve e grade](./projeto-de-leitura/06-retrieve-and-grade-nodes.md), seção "O que é": a regra de suficiência (numérica coberta, qualitativa, vazio, período ausente) e o schema do grade.
- [07 · Serper, adapter de busca e fallback web com TTL](./projeto-de-leitura/07-serper-and-web-fallback.md), seção "O que é": o nó `web_search`, o TTL e a retroalimentação do RAG.
- [08 · O grafo real: aresta condicional e guard do loop](./projeto-de-leitura/08-real-graph-conditional-edge-and-loop-guard.md), seção "Como funciona": como a aresta condicional liga grade, webSearch e retrieve.
- [19 · Revisão integrada](./projeto-de-leitura/19-integrated-review.md), seção "O que é": o slide 1.1 do RAG corretivo.

*Código da questão: 183365*

---

## Questão 02 · Restrição regulatória da CVM e guardrail no código

**Pergunta:** Qual é a restrição regulatória central das respostas do AI Researcher, sabendo que consultoria de valores mobiliários é atividade regulada pela CVM?

**Alternativas:**
- A) Responde sobre uma empresa por vez.
- B) Sempre recomenda diversificação de carteira.
- C) Sempre cita um analista humano.
- D) ✅ O sistema informa, mas nunca recomenda compra, venda ou manutenção de posição.
- E) Exige cadastro do usuário antes de responder.

**Resposta: D.** O sistema informa, mas nunca recomenda compra, venda ou manutenção de posição.

### Resolução comentada

A pista está no enunciado: atividade regulada pela CVM. No Brasil, recomendar investimento exige certificação e registro. Então a regra do produto não é de estilo, é de conformidade: apresentar informação pública é permitido, aconselhar o que fazer com a posição não é.

Repare que as alternativas erradas descrevem exigências que ninguém impõe ao sistema (uma empresa por vez, cadastro, citar analista) ou, pior, uma forma de recomendar (diversificar a carteira já é aconselhar). A certa é a única que traça a linha entre informar e recomendar.

O ponto que o guia insiste em ensinar: a regra não vive só no prompt. O prompt do nó `answer` proíbe linguagem recomendatória (primeira linha de defesa), mas um filtro por código, coberto por teste obrigatório, garante o caso restante. Prompt é instrução, não garantia.

### Entenda os conceitos

- **CVM (Comissão de Valores Mobiliários):** reguladora do mercado de capitais e também a fonte dos dados do corpus.
- **"Informa, nunca recomenda":** regra de domínio escrita no CLAUDE.md do repo. Exige também citar fonte e período, ter um teste automatizado para "devo comprar X?" e manter um disclaimer permanente na interface.
- **Guardrail:** trava que impede o sistema de sair do que é permitido. Analogia do guia: o prompt é o bilhete colado na mesa; o código é a trava na porta de saída. Mesmo que o atendente escreva "compre", o texto é trocado antes de chegar ao cliente.
- **Guardrail no código:** em `format-resposta.ts`, `montarResposta` chama `contemLinguagemRecomendatoria` (6 expressões regulares em `PADROES_RECOMENDACAO`). Se alguma casar, a resposta inteira vira `RESPOSTA_GUARDRAIL`, mantendo as citações.
- **Duas camadas:** o prompt reduz a taxa de violação; o filtro determinístico garante o resto. O filtro olha a saída do LLM, então erro de digitação do usuário não o atrapalha.
- **Disclaimer permanente:** faixa fixa no chat com "Este assistente apresenta informações públicas, não recomendação de investimento", sem modal e sem condicional.
- **Limite do guardrail:** regex avalia a string, não o sentido. Paráfrases fora da lista passam e uma lista ampla demais gera falso positivo (a palavra "venda" sozinha bloquearia "receita de vendas").

### Por que as outras erram

- **A:** não há restrição de uma empresa por vez. O corpus tem 20 empresas e o produto responde sobre qualquer uma delas.
- **B:** recomendar diversificação é uma forma de aconselhar, exatamente o que a regra proíbe.
- **C:** citar analista humano não é regra do domínio. O que a regra exige é citar a fonte dos dados e o período.
- **E:** cadastro do usuário não faz parte da regra regulatória do projeto. A mitigação é o aviso permanente e o guardrail.

### Aprofundar no guia

- [00 · Bem-vindo ao Capstone](./projeto-de-leitura/00-welcome-to-the-capstone.md), seção "O que é": a regra regulatória, os três exemplos de comportamento e o aviso permanente.
- [09 · Nó answer, citação obrigatória, guardrail por código e SSE](./projeto-de-leitura/09-answer-node-citation-guardrail-and-sse.md), seção "O que é": prompt versus filtro determinístico e o bloco de fontes.
- [00 · Bem-vindo ao Capstone](./projeto-de-leitura/00-welcome-to-the-capstone.md), seção "No código do repo": `PADROES_RECOMENDACAO`, `montarResposta` e o achado de que o filtro age sobre a resposta, não sobre a pergunta.
- [Disciplina 02 · Prompt injection](../02-apis-de-ia-generativa-e-prompt-engineering/projeto-de-leitura/06-prompt-injection-limites-do-system-prompt.md), seção "O que é": por que system prompt não é controle de acesso.

*Código da questão: 183366*

---

## Questão 03 · Função principal do chatbot AI Researcher

**Pergunta:** Qual é a função principal do chatbot AI Researcher?

**Alternativas:**
- A) Substituir corretores autorizados pela CVM.
- B) Executar ordens de compra e venda na B3.
- C) Gerar relatórios de auditoria contábil certificados.
- D) ✅ Consultar uma base vetorial de indicadores financeiros de empresas da B3, avaliar se o contexto é suficiente, buscar na web quando necessário e responder com citação e data-base.
- E) Treinar um LLM do zero com dados da CVM.

**Resposta: D.** Consultar uma base vetorial de indicadores financeiros de empresas da B3, avaliar se o contexto é suficiente, buscar na web quando necessário e responder com citação e data-base.

### Resolução comentada

A alternativa certa é a única que descreve o fluxo inteiro do projeto, na ordem: base vetorial, julgamento de suficiência, web como fallback e resposta com citação. As outras quatro atribuem ao chatbot um papel que ele não tem e que, em alguns casos, a regulação proíbe.

Um jeito rápido de eliminar: o AI Researcher é um consultor que informa. Ele não opera (B), não substitui profissional regulado (A), não emite documento certificado (C) e não treina modelo (E): usa um LLM pronto, via Vertex AI, para julgar e redigir.

A resposta também carrega duas marcas do produto: a citação (ticker, período, título ou fonte) e a data-base, anexadas pelo código no bloco `Fontes:`, sem depender de o modelo lembrar. E o enriquecimento da web é persistido na base, o que poupa custo nas perguntas seguintes.

### Entenda os conceitos

- **Base vetorial (pgvector):** extensão que transforma o Postgres em banco vetorial, com busca por similaridade em SQL. O projeto usa o operador de cosseno (`<=>`) e devolve o top-k (padrão 5).
- **Embedding:** representação numérica do texto; perto no espaço significa parecido no significado. O top-k são os mais próximos, nunca "o certo".
- **Corpus de 20 empresas da B3:** 80 documentos (4 trimestres por empresa), com seis indicadores coletados da CVM.
- **Suficiência de contexto:** julgamento do `grade` sobre se os documentos recuperados respondem a pergunta (ver Questão 01).
- **Citação e data-base:** `Fontes:` com ticker, período e data-base para documentos da CVM, ou título para os da web, deduplicadas por `sourceUrl`.
- **Persistência do enriquecimento:** o conteúdo da web vira registros em `documentos_web` com `expiresAt`; o TTL é aplicado na consulta (WHERE), sem cron.
- **O que o chatbot não faz:** não executa ordens, não substitui profissional regulado e nunca recomenda (ver Questão 02).

### Por que as outras erram

- **A:** substituir corretores contraria a regra de domínio. O sistema só informa dados públicos.
- **B:** executar ordens na B3 está fora do escopo. O produto é de consulta e informação.
- **C:** o corpus são indicadores públicos da CVM. O sistema não produz relatório de auditoria certificado.
- **E:** não há treinamento de modelo no projeto. O LLM é consumido via Vertex AI e o que se constrói é a orquestração (RAG, grafo, guardrail).

### Aprofundar no guia

- [00 · Bem-vindo ao Capstone](./projeto-de-leitura/00-welcome-to-the-capstone.md), seção "Em uma frase" e "O que é": o produto, as três regras de negócio e os três comportamentos de exemplo.
- [05 · pgvector, embeddings e o script de seed](./projeto-de-leitura/05-pgvector-and-seed.md), seção "O que é": a base vetorial e o cosseno.
- [07 · Serper, adapter de busca e fallback web com TTL](./projeto-de-leitura/07-serper-and-web-fallback.md), seção "O que é": a retroalimentação com TTL.
- [19 · Revisão integrada](./projeto-de-leitura/19-integrated-review.md), seção "Como funciona": a trilha de revisão do produto de ponta a ponta.

*Código da questão: 183356*

---

## Questão 04 · Serper indisponível: timeout, retry, circuit breaker e degradação graciosa

**Pergunta:** O SearchProvider (Serper) fica indisponível durante a conversa, e o projeto implementa timeout, retry e circuit breaker. Qual é o comportamento esperado?

**Alternativas:**
- A) A API responde 5xx e interrompe tudo.
- B) O nó grade passa a classificar todo contexto como suficiente.
- C) O usuário reenvia a pergunta após um tempo fixo.
- D) O Cloud Run reinicia o processo Node.js.
- E) ✅ O sistema degrada graciosamente: a resposta chega ao usuário com aviso, sem erro de servidor.

**Resposta: E.** O sistema degrada graciosamente: a resposta chega ao usuário com aviso, sem erro de servidor.

### Resolução comentada

Pense na busca web como uma ferramenta secundária: o corpus é a fonte principal. Se a ferramenta secundária falha, o sistema não deve derrubar a resposta principal. Os três mecanismos do enunciado formam uma cadeia de defesa: o timeout evita esperar para sempre, o retry absorve falha passageira e o circuit breaker para de insistir num serviço que está claramente fora.

Depois que tudo isso falha, entra a degradação graciosa. O nó `webSearch` captura o erro de cada query e segue. Se nenhuma query rende documento, o grafo volta ao `retrieve` de mãos vazias, o guard de iteração corta o loop e o `answer` responde com o que tem, acrescentando "O contexto disponível pode estar incompleto para responder com certeza". Segundo a resolução da prova, o resultado é uma resposta 200 com aviso, nunca 5xx.

O guia dá a regra de quando degradar e quando falhar: extrato e saldo aceitam resposta parcial; pagamento de ingresso não, porque fingir sucesso seria pior. Aqui a busca web é complementar, então degradar é a decisão certa.

### Entenda os conceitos

- **Timeout:** `fetch` não tem limite por padrão, então um Serper travado travaria a requisição. No projeto são 10 s via `AbortSignal.timeout(10_000)`.
- **Retry com backoff exponencial:** nova tentativa com espera crescente (200 ms, 400 ms...), até 3 tentativas. Absorve pico e falha passageira.
- **Circuit breaker:** depois de algumas falhas consecutivas o circuito abre e as chamadas seguintes falham na hora (`CircuitoAbertoError`), sem tocar o provider, até passar o resfriamento (30 s por padrão). Protege o serviço externo que tenta se recuperar e a latência do próprio sistema.
- **Decorator `comResiliencia`:** função que envelopa qualquer `SearchProvider` e acrescenta retry e breaker. Escreve-se uma vez e vale para Serper e Google Custom Search.
- **Degradação graciosa:** entregar resposta parcial e avisada em vez de erro ou tela branca. Analogia do guia: o restaurante não atende, você pede o que tem em casa e avisa que o jantar ficou incompleto.
- **Adapter `SearchProvider`:** interface mínima `search(query)` que permite trocar de fornecedor por variável de ambiente (`SEARCH_PROVIDER`).
- **Retry sem breaker piora a queda:** insistir num serviço que está subindo atrapalha a recuperação.

### Por que as outras erram

- **A:** é o oposto da degradação graciosa. O teste de grafo com provider sempre falhando confirma que o fluxo termina em `answer` com resposta real.
- **B:** o `grade` não muda de critério por causa de falha externa. O contexto continua insuficiente, e o aviso de contexto incompleto existe justamente por isso.
- **C:** empurra o problema para o usuário. A resiliência existe para que ele não perceba a falha, só receba o aviso.
- **D:** o Cloud Run reiniciar o processo é mecanismo de plataforma e não faz parte do comportamento descrito. Aqui o processo continua de pé, o erro é tratado dentro do nó.

### Aprofundar no guia

- [11 · Circuit breaker, retry e degradação graciosa](./projeto-de-leitura/11-circuit-breaker-retry-and-graceful-degradation.md), seção "O que é": timeout, retry, breaker, decorator e quando degradar ou falhar.
- [11 · Circuit breaker, retry e degradação graciosa](./projeto-de-leitura/11-circuit-breaker-retry-and-graceful-degradation.md), seção "No código do repo": `comResiliencia`, os defaults (3 tentativas, 200 ms, limiar 3, 30 000 ms) e o teste do grafo.
- [07 · Serper, adapter de busca e fallback web com TTL](./projeto-de-leitura/07-serper-and-web-fallback.md), seção "O que é": o padrão adapter do `SearchProvider`.
- [Disciplina 04 · Tools externas resilientes](../04-criacao-de-agentes-autonomos/projeto-de-leitura/07-tool-externa-resiliente.md), seção "O que é": timeout, retry e falha como observação, o mesmo tema em outro projeto.

*Código da questão: 183370*

---

## Questão 05 · Workload Identity Federation no GitHub Actions

**Pergunta:** Por que o projeto usa Workload Identity Federation no GitHub Actions?

**Alternativas:**
- A) Criptografar o tráfego HTTP entre frontend e backend.
- B) Fazer rollback automático de revisões quebradas no Cloud Run.
- C) Gerenciar múltiplos ambientes de teste.
- D) ✅ Permitir deploy autenticado no GCP a partir do GitHub Actions sem armazenar chave de service account.
- E) Acelerar o build do Angular no CI.

**Resposta: D.** Permitir deploy autenticado no GCP a partir do GitHub Actions sem armazenar chave de service account.

### Resolução comentada

A palavra "Identity" já diz o assunto: autenticação, não criptografia, nem velocidade, nem ambientes. A esteira precisa provar ao Google Cloud quem ela é para fazer o deploy. O jeito antigo é guardar um JSON de chave de service account num secret do repositório, uma chave estática que serve para sempre a quem a roubar. O jeito do projeto é a federação: ninguém guarda chave.

O fluxo tem quatro passos: o runner pede ao GitHub um token OIDC de curtíssima duração; o GCP confere que o chamador é conhecido e que vem do repositório autorizado; é criado um token impersonado da service account de deploy, no ato; ao terminar, tudo é descartado. Se o repositório vazar, não há chave para roubar.

Um bom sinal ao revisar um workflow: `permissions: id-token: write`, o step `google-github-actions/auth` com provider e service account e a ausência de `credentials_json`.

### Entenda os conceitos

- **Workload Identity Federation (WIF):** o GCP passa a confiar no OIDC do GitHub e emite credencial efêmera. No projeto existem um pool (`github-actions-pool`), um provider e uma condição que restringe o acesso a um repositório específico.
- **Token OIDC:** token de curtíssima duração emitido pelo GitHub a cada execução.
- **Service account impersonada:** identidade de deploy (`github-actions-deployer`) assumida no ato, via token, e descartada ao fim.
- **Chave estática de service account:** a alternativa descartada. Tem permissões mínimas, mas é usável por qualquer um que comprometa o repositório.
- **Analogia do guia:** a chave mestra na gaveta (JSON no secret) contra o crachá que vale minutos, emitido pela transportadora e só aceito se vier dela.
- **`GITHUB_TOKEN`:** coisa diferente. É o token do próprio GitHub para a execução, não uma credencial de nuvem.
- **Cloud Run, Artifact Registry e Firebase Hosting:** os destinos do deploy (API serverless, imagens Docker versionadas e hospedagem do Angular com rewrite de `/api`).
- **Armadilha de fork:** a condição do pool aponta para um repositório; ao usar fork é preciso trocá-la, senão a autenticação falha.

### Por que as outras erram

- **A:** criptografar tráfego é papel de TLS. Na arquitetura, o rewrite do Firebase Hosting até dispensa CORS, mas isso não tem relação com WIF.
- **B:** rollback automático é recurso de revisões do Cloud Run, não de identidade. O repo faz deploy canary em unidades futuras, mas não via WIF.
- **C:** WIF não gerencia ambientes de teste. Os jobs de teste nem precisam de acesso ao GCP; só o `deploy` precisa.
- **E:** o build do Angular roda no runner sem relação com a federação. WIF afeta autenticação, não desempenho.

### Aprofundar no guia

- [02 · Tour pelo Google Cloud e GitHub Actions com WIF](./projeto-de-leitura/02-google-cloud-tour-and-github-actions-wif.md), seção "Como funciona": o fluxo WIF em 4 passos e a condição do pool.
- [02 · Tour pelo Google Cloud e GitHub Actions com WIF](./projeto-de-leitura/02-google-cloud-tour-and-github-actions-wif.md), seção "No código do repo": o `deploy.yml` (`id-token: write`, `auth@v3`, sem `credentials_json`).
- [19 · Revisão integrada](./projeto-de-leitura/19-integrated-review.md), seção "O que é": o slide 1.4 do WIF e o "teste de profundidade 4" (do commit ao Cloud Run).

*Código da questão: 183360*

---

## Questão 06 · Rate limiting x budget de tokens em /api/chat

**Pergunta:** Dois mecanismos independentes de proteção contra abuso em `/api/chat`, cada um podendo gerar seu próprio 429: rate limiting por requisição e budget de tokens por dia. Qual avaliação justifica manter os dois?

**Alternativas:**
- A) Rate limiting só no frontend e budget só no backend.
- B) O budget substitui o rate limiting em produção.
- C) Verificam exatamente a mesma condição com nomes diferentes.
- D) ✅ Rate limiting protege contra volume alto de requisições num curto período, independente do custo de cada uma; o budget protege contra o custo acumulado de LLM ao longo do dia, independente da frequência; um usuário pode violar um sem violar o outro.
- E) É redundância desnecessária.

**Resposta: D.** Rate limiting protege contra volume alto de requisições num curto período, independente do custo de cada uma; o budget protege contra o custo acumulado de LLM ao longo do dia, independente da frequência; um usuário pode violar um sem violar o outro.

### Resolução comentada

A pergunta pede justificativa para manter dois mecanismos, então procure a dimensão que cada um mede. Rate limiting mede frequência: quantas requisições por janela. Budget mede gasto: quantos tokens (e, portanto, quanto custo de LLM) por dia. São dimensões diferentes de abuso.

Dois cenários mostram que um não cobre o outro. Poucas requisições muito caras (perguntas longas e respostas longas) estouram o budget sem chegar perto do limite de requisições por janela. E o inverso: muitas requisições baratas e rápidas estouram o rate limit sem consumir o budget. Por isso um usuário pode violar um sem violar o outro, e cada um tem o seu 429.

Ainda há uma terceira razão: o guia trata os dois como camadas que se somam à resiliência da Aula 15. Se uma faltar ou for mal calculada, outra protege.

### Entenda os conceitos

- **Rate limit:** teto de chamadas por janela. No projeto, `@fastify/rate-limit` global, configurável por `RATE_LIMIT_MAX` e `RATE_LIMIT_WINDOW` (padrão do repo: 20 por 1 minuto), desligado em `/health` e `/metrics`. Protege contra abuso, bot, invasão e loop de um chamador.
- **Budget diário de tokens:** contador em memória que zera na virada do dia (UTC), alimentado pela mesma fonte das métricas (`usage_metadata` real do Vertex AI) e verificado no início da rota `/chat`, antes de qualquer byte SSE. Controlado por `TOKEN_BUDGET_DIARIO`.
- **429 (Too Many Requests):** status usado pelos dois. O error handler central mapeia `LimiteDeRequisicoesExcedidoError` e `OrcamentoDiarioExcedidoError` para 429 em `application/problem+json`.
- **FinOps:** saber controlar o custo da aplicação. A métrica interna permite que o custo vire erro ou fallback para um modelo mais barato.
- **Telemetria x métrica:** telemetria é o dado item a item (o trace); métrica é o agregado, e é sobre ela que se controla custo. Analogia do guia: o extrato com cada compra contra o total da fatura.
- **Analogia do guia:** o rate limit é o porteiro que barra uma multidão entrando de uma vez; o budget é o limite do cartão, e acabou o saldo do dia nenhuma compra passa.
- **Contadores Prometheus:** `llm_tokens_total` e `llm_cost_usd_total`, expostos em `GET /api/metrics`.
- **Por que verificar antes do `writeHead`:** depois que o SSE começa, a resposta já é 200 e não dá mais para devolver 429.

### Por que as outras erram

- **A:** os dois vivem no backend. O rate limit é um plugin do Fastify na API; proteção só no frontend seria contornável por qualquer cliente direto.
- **B:** o budget não substitui o rate limit. Ele não vê frequência: 40 requisições baratas em um segundo passariam por ele.
- **C:** a condição verificada é diferente. Um conta requisições por janela, o outro soma tokens no dia.
- **E:** a redundância é aparente. Cada um cobre uma dimensão de abuso que o outro não enxerga.

### Aprofundar no guia

- [17 · Métricas, budget de tokens e rate limiting](./projeto-de-leitura/17-metrics-token-budget-and-rate-limiting.md), seção "Como funciona": o comparativo rate limit x budget (dado, onde atua, resposta).
- [17 · Métricas, budget de tokens e rate limiting](./projeto-de-leitura/17-metrics-token-budget-and-rate-limiting.md), seção "No código do repo": `criarRateLimitOptions`, `verificarOrcamento` e o mapeamento para 429.
- [Disciplina 03 · Rate limiting](../03-model-context-protocol-mcp/projeto-de-leitura/11-rate-limiting.md), seção "Em uma frase": confiança zero, limite por token e a terceira camada depois de autenticação e autorização.

*Código da questão: 183375*

---

## Questão 07 · Origem dos dados do corpus (ITR e DFP da CVM)

**Pergunta:** De onde vêm os dados do corpus financeiro das 20 empresas da B3?

**Alternativas:**
- A) Scraping do site de RI de cada empresa.
- B) API paga de dados de mercado em tempo real.
- C) Planilha mantida à mão.
- D) Dataset do Kaggle.
- E) ✅ Formulários ITR e DFP publicados pela CVM em dados.cvm.gov.br.

**Resposta: E.** Formulários ITR e DFP publicados pela CVM em dados.cvm.gov.br.

### Resolução comentada

Todas as alternativas parecem plausíveis para um projeto de dados financeiros, mas o projeto escolheu uma fonte única, oficial e aberta: o Portal de Dados Abertos da CVM. A fonte oficial também combina com o domínio regulado: a citação aponta para um dado público e verificável.

Os arquivos são ZIPs anuais com um CSV por demonstrativo: o ITR (informações trimestrais) e o DFP (demonstrações financeiras anuais). O pacote `packages/corpus` baixa direto de `dados.cvm.gov.br` com `pnpm collect`, sem download manual, e converte para JSON.

Dica de leitura para eliminar as outras: o projeto não tem custo de API nem scraping, e a regra "nunca usar LLM no corpus" mostra a preferência por dado oficial e reprodutível.

### Entenda os conceitos

- **ITR e DFP:** ITR são as informações trimestrais; DFP são as demonstrações financeiras anuais. Para o 4T, o código combina o DFP anual menos o acumulado do ITR do 3T (receita, lucro bruto, lucro líquido, caixa).
- **Portal de Dados Abertos da CVM:** a URL é montada como `https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/{ITR|DFP}/DADOS/{itr|dfp}_cia_aberta_{ano}.zip`.
- **`packages/corpus`:** o pacote com a lista de 20 empresas (`data/empresas.csv`), a coleta, a normalização e o template do parágrafo.
- **Seis indicadores:** receita líquida, lucro bruto, lucro líquido, ativo total, patrimônio líquido e caixa operacional.
- **Código de conta não é estável entre setores:** bancos usam outra árvore de contas. Por isso lucro líquido e patrimônio líquido são localizados pela descrição (`DS_CONTA`), e as demais pelo código.
- **Escala:** na CVM, "200" em `MIL` são 200 mil milhares, ou seja, 200 milhões. O normalizador converte para reais uma única vez, na fronteira.
- **Metadados por documento:** ticker, nome da companhia, setor, período, fim do período, URL da fonte e data de download, que habilitam a citação com data-base.
- **404 da fonte:** `ArquivoCvmNaoEncontradoError` trata arquivo ausente como estado esperado, segue com o que existe e avisa.

### Por que as outras erram

- **A:** scraping de RI cada empresa em formato diferente seria frágil e não oficial. O projeto não faz scraping de RI.
- **B:** não há API paga de mercado. O corpus é um snapshot de indicadores trimestrais, não cotação em tempo real.
- **C:** planilha manual contraria a coleta automática do `pnpm collect`.
- **D:** Kaggle não é fonte. A fonte é a própria CVM.

### Aprofundar no guia

- [03 · Corpus CVM](./projeto-de-leitura/03-cvm-corpus.md), seção "O que é": fonte, 20 empresas, metadados, a pegadinha da escala e o 404 de 2025.
- [03 · Corpus CVM](./projeto-de-leitura/03-cvm-corpus.md), seção "Como funciona": `pnpm collect`, seleção de trimestres, 4T por subtração e as contas por código ou por descrição.
- [03 · Corpus CVM](./projeto-de-leitura/03-cvm-corpus.md), seção "Cola rápida": ITR, DFP, `CD_CONTA`, `DS_CONTA` e `ESCALA_MOEDA`.

*Código da questão: 183361*

---

## Questão 08 · Parágrafos do corpus por template determinístico

**Pergunta:** Como são gerados os parágrafos do corpus indexado?

**Alternativas:**
- A) Sumarização extrativa sobre release em PDF.
- B) LLM que resume os dados de cada empresa.
- C) Fine-tuning do modelo de embedding.
- D) ✅ Por template determinístico, sem uso de LLM.
- E) Tradução automática dos releases.

**Resposta: D.** Por template determinístico, sem uso de LLM.

### Resolução comentada

Aqui a pegadinha é a alternativa B, que parece o caminho "moderno" num projeto de IA. Mas o CLAUDE.md do projeto tem uma regra "nunca": nunca usar LLM para gerar os parágrafos do corpus. O agente não pode inventar nem alucinar números, e tudo tem de ser baseado em dados.

O guia dá dois motivos: custo (o script poderia rodar um milhão de vezes sem nenhuma chamada a LLM) e alucinação (mesmo com os valores certos no prompt, a LLM pode errar). Regra geral: onde o dado não admite risco de alucinação, use código determinístico.

Por isso o parágrafo vem de uma função `gerarParagrafo` que preenche um formulário com lacunas a partir dos indicadores normalizados. Mesma entrada, mesmo texto, byte a byte, o que permite teste de snapshot.

### Entenda os conceitos

- **Template determinístico:** texto montado por regras fixas. No repo, `packages/corpus/src/paragraphs/template.ts` formata com `Intl.NumberFormat('pt-BR')` (bilhões ou milhões) e inclui receita líquida, comparações YoY e QoQ, margem líquida e caixa operacional.
- **Alucinação numérica:** o modelo escrever um número que não está nos dados. Num domínio regulado e de números, é o erro mais caro.
- **Analogia do guia:** em vez de um redator criativo que cobra por ficha e pode errar com confiança, um formulário com lacunas preenchido por uma regra, sempre igual.
- **YoY e QoQ:** comparação com o mesmo trimestre do ano anterior e com o trimestre anterior. As cláusulas são omitidas quando o dado não existe.
- **Snapshot:** estado dos JSONs em `data/documentos` na última coleta, versionado no repo. Os dados ficam desatualizados até a próxima coleta.
- **Onde o projeto economiza tokens:** parágrafos do corpus sem LLM, RAG antes da web, skills em vez de CLAUDE.md gigante, budget de tokens e métricas por nó (teste de profundidade 2 da revisão).
- **Limite do template:** é rígido. No repo, só 3 dos 6 indicadores coletados entram no texto indexado (ver Pontos de atenção).

### Por que as outras erram

- **A:** o corpus não vem de releases em PDF, vem dos CSVs da CVM. Sumarizar release seria usar texto livre onde há dado estruturado.
- **B:** é exatamente o que a regra "nunca" proíbe: custo e risco de alucinação.
- **C:** fine-tuning de embedding é outro assunto. O embedding (Vertex AI) é só consumido para indexar os parágrafos, nenhum treino acontece.
- **E:** tradução automática não existe no pipeline. Os parágrafos são gerados em português pelo próprio template.

### Aprofundar no guia

- [03 · Corpus CVM](./projeto-de-leitura/03-cvm-corpus.md), seção "O que é": os dois motivos para não usar LLM (custo e alucinação).
- [03 · Corpus CVM](./projeto-de-leitura/03-cvm-corpus.md), seção "Vantagens e limites": reprodutibilidade por snapshot e a rigidez do template.
- [01 · CLAUDE.md e AI Dev Skills](./projeto-de-leitura/01-claude-md-and-ai-dev-skills.md), seção "O que é": as regras "nunca", entre elas LLM no corpus.
- [19 · Revisão integrada](./projeto-de-leitura/19-integrated-review.md), seção "Como funciona": o teste de profundidade 2 (custo).

*Código da questão: 183362*

---

## Questão 09 · Papel do CLAUDE.md

**Pergunta:** Qual é o papel do CLAUDE.md no projeto?

**Alternativas:**
- A) Configurar o pipeline de CI/CD.
- B) Substituir o README como única documentação pública.
- C) Armazenar credenciais do GCP.
- D) ✅ Documentar, para o Claude Code, o contexto, as regras de trabalho e as convenções do projeto.
- E) Guardar os embeddings do Vertex AI.

**Resposta: D.** Documentar, para o Claude Code, o contexto, as regras de trabalho e as convenções do projeto.

### Resolução comentada

O ponto de partida é um fato sobre o modelo: ele é stateless. Cada interação é como uma requisição nova, e o agente não lembra o que aconteceu antes. A solução é um arquivo carregado sempre, que dá ao agente o contexto do projeto antes de qualquer tarefa. No Claude, é o `.claude/CLAUDE.md`.

O arquivo do projeto traz contexto, estado atual, stack, estrutura, comandos, regras de trabalho ("pergunte antes de" e "nunca"), convenções e restrições de domínio. É um contrato de trabalho versionado com o time. Nunca contém segredos: eles vêm de variável de ambiente e, em produção, do Secret Manager.

As alternativas erradas atribuem ao arquivo funções de outras peças: pipeline é o workflow YAML, credencial é o Secret Manager, embeddings ficam no Postgres.

### Entenda os conceitos

- **Stateless:** o modelo não retém memória entre interações, então o contexto precisa ser reinjetado.
- **CLAUDE.md:** arquivo sempre carregado. Analogia do guia: o bilhete na porta de entrada que o prestador de serviço (que esquece tudo toda vez) lê sempre: onde está, o que perguntar, o que nunca fazer.
- **Regras "pergunte antes":** instalar dependência nova, criar abstração ou interface, alterar esquema do banco, mudar deploy, workflow ou infraestrutura, reorganizar pastas.
- **Regras "nunca":** segredo em arquivo versionado, LLM para gerar parágrafos do corpus, `any` sem justificativa e teste que dependa de rede. O repo traz uma quinta: não commitar ZIPs ou CSVs brutos da CVM.
- **Skills:** Markdown de instruções carregado conforme a tarefa (por exemplo, a de rota Fastify ou de nó de grafo). Analogia: as pastas de procedimento no armário, o manual de hidráulica só sai quando há cano vazando.
- **CLAUDE.md x skill:** o que vale para toda tarefa vai no CLAUDE.md; o que vale para um tipo de tarefa vai na skill.
- **Precedência:** o CLAUDE.md do projeto manda sobre o global; entre skill do projeto e skill oficial do framework, a oficial vence.
- **Custo fixo:** CLAUDE.md que só cresce vira gasto em toda interação. O do repo completo tem 325 linhas e cerca de 57 KB (ver Pontos de atenção).
- **Harness:** o ambiente do agente de código que carrega esse arquivo (complemento, ver Disciplina 04).

### Por que as outras erram

- **A:** o pipeline de CI/CD é definido em `.github/workflows/deploy.yml`, não no CLAUDE.md.
- **B:** não substitui o README. O CLAUDE.md é voltado ao agente, enquanto o README apresenta o projeto, a arquitetura e a demo.
- **C:** credenciais nunca ficam em arquivo versionado. Vêm de variável de ambiente e do Secret Manager, e a autenticação do deploy usa WIF.
- **E:** embeddings ficam no Postgres com pgvector. O Vertex AI gera os embeddings, mas não é guardado em arquivo de instrução.

### Aprofundar no guia

- [01 · CLAUDE.md e AI Dev Skills](./projeto-de-leitura/01-claude-md-and-ai-dev-skills.md), seção "O que é": stateless, as seções do arquivo, as regras "pergunte antes" e "nunca" e a precedência de skills.
- [01 · CLAUDE.md e AI Dev Skills](./projeto-de-leitura/01-claude-md-and-ai-dev-skills.md), seção "Vantagens e limites": o custo fixo de um CLAUDE.md que só cresce.
- [01 · CLAUDE.md e AI Dev Skills](./projeto-de-leitura/01-claude-md-and-ai-dev-skills.md), seção "No código do repo": as quatro skills do projeto e o `skills-lock.json`.
- [Disciplina 04 · O agente de código por dentro](../04-criacao-de-agentes-autonomos/projeto-de-leitura/00-agente-de-codigo-harness-e-context-engineering.md), seção "O que é": harness e context engineering.

*Código da questão: 183357*

---

## Questão 10 · Guard MAX_ITERATIONS = 2

**Pergunta:** O guard `MAX_ITERATIONS = 2` limita quantas vezes o ciclo grade, webSearch, retrieve pode se repetir. Se, após o limite, o contexto continuar insuficiente, o que o grafo faz?

**Alternativas:**
- A) Tenta indefinidamente.
- B) ✅ Interrompe o loop e segue para o nó answer mesmo com o contexto disponível até ali.
- C) Retorna só a lista de fontes sem texto.
- D) Lança exceção não tratada e derruba a requisição.
- E) Reinicia o grafo do zero a partir do retrieve.

**Resposta: B.** Interrompe o loop e segue para o nó answer mesmo com o contexto disponível até ali.

### Resolução comentada

Todo loop de agente precisa de uma saída garantida. Sem limite, o agente queima tokens e pode nunca responder. O guard resolve isso: quando o contador atinge o máximo, a aresta condicional deixa de mandar para `webSearch` e manda para `answer`.

A pergunta é o que acontece com a resposta nesse caso. A decisão do projeto é responder com o melhor contexto disponível, em vez de falhar. E o `answer` sabe que o contexto ficou fraco: `sufficient` continua falso, então a resposta acrescenta o aviso de contexto possivelmente incompleto. Ou seja, "guard cortou" não é o mesmo que "contexto suficiente", e a resposta final precisa mostrar a diferença.

O código confirma: `proximoNo` devolve `'answer'` se `sufficient`, `'answer'` se `iterations >= MAX_ITERATIONS`, e `'webSearch'` caso contrário. A constante `MAX_ITERATIONS = 2` e a linha do guard constam em `graph.ts` do repo clonado.

### Entenda os conceitos

- **Guard de iteração:** limite explícito de voltas num loop de agente. O valor (2, 3, 4 ou 5) é ajuste fino; o que não pode faltar é o limite.
- **`iterations` no estado:** contador dentro do estado do grafo, com reducer `(prev, next) => prev + next` e valor inicial 0. O `grade` devolve `iterations: 1` a cada passada e o reducer acumula. Sem variável global, funciona em execuções concorrentes.
- **Reducer:** função que combina o valor antigo e o novo de um campo do estado.
- **Trace real do teste (achado do guia, tópico 08):** com o LLM sempre insuficiente, o caminho é `retrieve, grade, webSearch, retrieve, grade, answer`: duas rodadas de grade e uma única busca web. O teste "não entra em laço infinito" confirma que as rodadas de grade são exatamente `MAX_ITERATIONS`.
- **Aresta condicional termina em `answer`:** no repo final, a aresta condicional não vai para END, e sim para `answer`, nos dois casos (suficiente ou guard). A Aula 12 descrevia END; o `answer` só entra na Aula 13.
- **Analogia do guia:** uma linha de montagem com um fiscal e uma ficha com contador. Depois de duas inspeções a peça sai de qualquer jeito, para a fábrica não ficar presa.
- **Custo de cada volta:** uma chamada de LLM (o grade) e uma busca web.
- **Dependências por função (`GraphDeps`):** permite testar o grafo inteiro com fakes, inclusive o guard.

### Por que as outras erram

- **A:** é o cenário que o guard existe para evitar.
- **C:** o `answer` gera texto normal; o bloco `Fontes:` é anexado ao texto, não o substitui.
- **D:** não há exceção. O corte é uma decisão de roteamento prevista, e a degradação é tratada com aviso.
- **E:** reiniciar a partir do `retrieve` recriaria o loop, que é exatamente o que o guard corta.

### Aprofundar no guia

- [08 · O grafo real: aresta condicional e guard do loop](./projeto-de-leitura/08-real-graph-conditional-edge-and-loop-guard.md), seção "O que é": as arestas, o `iterations` com reducer e o guard.
- [08 · O grafo real: aresta condicional e guard do loop](./projeto-de-leitura/08-real-graph-conditional-edge-and-loop-guard.md), seção "No código do repo": `proximoNo`, `GraphDeps` e os achados do trace e da aresta que termina em `answer`.
- [11 · Circuit breaker, retry e degradação graciosa](./projeto-de-leitura/11-circuit-breaker-retry-and-graceful-degradation.md), seção "O que é": como o guard corta o loop quando a busca web falha e o `answer` avisa.
- [Disciplina 04 · Três padrões de raciocínio](../04-criacao-de-agentes-autonomos/projeto-de-leitura/02-tres-padroes-de-raciocinio.md), seção "O que é": o risco de loop infinito no ReAct e a necessidade de um teto.

*Código da questão: 183371*

---

## Pontos de atenção na prova

- **Questão 01:** o guia confirma a regra do `grade` (tópico 06) e o fallback (tópico 07). A palavra "somente" da alternativa D vale para o roteamento normal; o próprio guia observa que, depois do guard, o `answer` pode receber contexto insuficiente (Q10). A resposta D segue a resolução.
- **Questão 02:** o guia confirma a regra e o teste de guardrail, mas registra um achado: o guardrail é um filtro por regex sobre a resposta do LLM, não bloqueia a pergunta (o `retrieve` e a busca web rodam normalmente) e cobre só 6 padrões. Paráfrases como "sugeriria" ou "aconselharia" podem passar. O enunciado diz que o filtro garante a regra; o guia mostra que a garantia é limitada a formas conhecidas.
- **Questão 03:** a descrição completa da alternativa D combina elementos de tópicos diferentes (00, 05, 07, 09). O guia confirma cada parte isoladamente, e que o sistema nunca executa ordens, pelo escopo do produto.
- **Questão 04:** o guia confirma a cadeia timeout, retry, breaker e o teste de grafo que termina em `answer` com "incompleto". A frase "200 com aviso, nunca 5xx" vem da resolução; o guia não traz um teste que afirme explicitamente o status HTTP. Achados do tópico 11: o circuito abre após 3 buscas que esgotaram as tentativas (9 chamadas ao provider com os defaults), não há estado half-open explícito, o retry repete também erros não transitórios e o `catch` do nó web search não registra log.
- **Questão 05:** o guia confirma o WIF no workflow e na infra. Achado do tópico 02: a service account de deploy tem papéis amplos (`run.admin`, `iam.serviceAccountUser`, `firebasehosting.admin`), mais que a "mínima permissão" que a aula pede.
- **Questão 06:** o guia confirma as duas dimensões, os dois 429 e o comparativo. Achados do tópico 17: o budget é em tokens (não em USD) e em memória, então vale por instância do Cloud Run; `verificarOrcamento()` só é chamado em `chat.ts`, e não encontrei chamada no gateway `/api/mcp` nem na tool `perguntar`, embora a aula diga o contrário (o rate limit global cobre `/api/mcp`). O budget foi verificado apenas em `/chat`.
- **Questão 07:** o guia confirma a fonte e o pacote `packages/corpus`. Achados do tópico 03: a aula diz que as contas são buscadas "pelo nome", mas no código só lucro líquido e patrimônio líquido usam descrição; o snapshot do repo tem 4T25 para as 20 empresas, então o 404 de 2025 da demo não se reproduz.
- **Questão 08:** o guia confirma a regra e o template. Achado: o template só cita receita líquida, lucro líquido, margem líquida e caixa operacional; lucro bruto, ativo total e patrimônio líquido são coletados mas não entram no texto indexado.
- **Questão 09:** o guia confirma o papel do arquivo. Achado do tópico 01: o CLAUDE.md do repo completo tem 325 linhas e cerca de 57 KB porque acumulou o diário de cada bloco em "Estado atual", contra a própria lição de manter o contexto sempre carregado enxuto. A convenção de commits em português do arquivo é do projeto do curso, não regra geral.
- **Questão 10:** o guia confirma `MAX_ITERATIONS = 2`, o guard e o trace (tópico 08). Achados: a aula diz que na terceira passada o guard impede a busca, mas no código são duas rodadas de grade e uma única busca web; e a aresta condicional termina em `answer`, não em END.
- **Texto das alternativas:** as alternativas e as resoluções vieram da resolução da prova; o texto de cada alternativa segue o enunciado fornecido.
- **Complementos fora do material:** em nenhuma questão foi preciso recorrer a conteúdo fora do guia, exceto onde marcado como "complemento" (a menção a harness na Questão 09 remete à Disciplina 04).

## Mapa de estudo desta disciplina

| Tema da prova | Tópico do guia que mais cobre |
|---------------|-------------------------------|
| RAG corretivo, nó grade e quando a web entra (Q01) | [06 · Os nós retrieve e grade](./projeto-de-leitura/06-retrieve-and-grade-nodes.md) e [07 · Serper, adapter de busca e fallback web com TTL](./projeto-de-leitura/07-serper-and-web-fallback.md) |
| Restrição CVM e guardrail no código (Q02) | [09 · Nó answer, citação obrigatória, guardrail por código e SSE](./projeto-de-leitura/09-answer-node-citation-guardrail-and-sse.md) e [00 · Bem-vindo ao Capstone](./projeto-de-leitura/00-welcome-to-the-capstone.md) |
| Função do chatbot (Q03) | [00 · Bem-vindo ao Capstone](./projeto-de-leitura/00-welcome-to-the-capstone.md) |
| Timeout, retry, circuit breaker e degradação graciosa (Q04) | [11 · Circuit breaker, retry e degradação graciosa](./projeto-de-leitura/11-circuit-breaker-retry-and-graceful-degradation.md) |
| Workload Identity Federation (Q05) | [02 · Tour pelo Google Cloud e GitHub Actions com WIF](./projeto-de-leitura/02-google-cloud-tour-and-github-actions-wif.md) |
| Rate limiting x budget de tokens (Q06) | [17 · Métricas, budget de tokens e rate limiting](./projeto-de-leitura/17-metrics-token-budget-and-rate-limiting.md) |
| Corpus ITR e DFP da CVM (Q07) | [03 · Corpus CVM](./projeto-de-leitura/03-cvm-corpus.md) |
| Parágrafos determinísticos sem LLM (Q08) | [03 · Corpus CVM](./projeto-de-leitura/03-cvm-corpus.md) |
| CLAUDE.md e skills (Q09) | [01 · CLAUDE.md e AI Dev Skills](./projeto-de-leitura/01-claude-md-and-ai-dev-skills.md) |
| Guard de iteração MAX_ITERATIONS (Q10) | [08 · O grafo real: aresta condicional e guard do loop](./projeto-de-leitura/08-real-graph-conditional-edge-and-loop-guard.md) |
