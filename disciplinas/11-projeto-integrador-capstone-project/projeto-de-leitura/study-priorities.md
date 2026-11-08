# 🎯 Disciplina 11 · O que vale estudar

> Análise de prioridade (opinião fundamentada no guia e na prática atual), não conteúdo da apostila. Premissas: leitor engenheiro de software backend (TypeScript/Node e Python, AWS, Postgres, filas e jobs, produto com LLMs em produção, automação Jira/Slack, uso intenso de agentes de código); objetivo de virar engenheiro de IA aplicada especialista (construir, avaliar, operar e governar sistemas com LLMs), não pesquisador de modelos.

## Veredito
O valor desta disciplina está nas decisões de engenharia em volta do LLM, não no LLM: guardrail em código, resiliência com degradação explícita, testes sem rede, métrica por nó, teto de tokens e deploy sem chave. Tudo isso se transfere a qualquer sistema de IA, em AWS ou GCP, TypeScript ou Python. Nota: ⭐⭐⭐⭐ (4 de 5): um caso completo e honesto, com a tabela de achados mostrando onde a aula erra, mas com boa parte do tempo gasta em stack específica (GCP, Angular, LangGraph) e em demo de ferramenta. Mais útil para quem já constrói backend e quer fechar o ciclo de produção de um sistema com LLM.

## Mapa de prioridade por tópico

| Tópico | Dia a dia | Especialista | Veredito |
|---|---|---|---|
| [00 · Bem-vindo ao Capstone](./00-welcome-to-the-capstone.md) | 🟢 | 🟢 | Implementar |
| [01 · CLAUDE.md e AI Dev Skills](./01-claude-md-and-ai-dev-skills.md) | 🟢 | 🟡 | Implementar |
| [02 · Google Cloud e GitHub Actions com WIF](./02-google-cloud-tour-and-github-actions-wif.md) | 🟡 | ⚪ | Conhecer |
| [03 · Corpus CVM](./03-cvm-corpus.md) | 🟡 | 🟡 | Conhecer |
| [04 · Fundação GCP e Walking Skeleton](./04-gcp-foundation-and-walking-skeleton.md) | 🟡 | ⚪ | Conhecer |
| [05 · pgvector, embeddings e seed](./05-pgvector-and-seed.md) | 🟢 | 🟡 | Aprofundar (pgvector na prática) |
| [06 · Nós retrieve e grade](./06-retrieve-and-grade-nodes.md) | 🟡 | 🟢 | Aprofundar |
| [07 · Serper, adapter e fallback web com TTL](./07-serper-and-web-fallback.md) | 🟡 | 🟡 | Conhecer |
| [08 · Grafo real, aresta condicional e guard do loop](./08-real-graph-conditional-edge-and-loop-guard.md) | 🟢 | 🟢 | Implementar |
| [09 · Nó answer, citação, guardrail por código e SSE](./09-answer-node-citation-guardrail-and-sse.md) | 🟢 | 🟢 | Aprofundar |
| [10 · Testando o grafo sem rede](./10-testing-the-graph-without-network.md) | 🟢 | 🟢 | Implementar |
| [11 · Circuit breaker, retry e degradação graciosa](./11-circuit-breaker-retry-and-graceful-degradation.md) | 🟢 | 🟢 | Implementar |
| [12 · Erros padronizados e servidor MCP](./12-standard-errors-and-mcp-server.md) | 🟡 | 🟡 | Conhecer |
| [13 · Claude Design e skill frontend-design](./13-claude-design-to-frontend-design-skill.md) | ⚪ | ⚪ | Pular |
| [14 · Chat com streaming e painel de estado](./14-streaming-chat-and-graph-state-panel.md) | ⚪ | 🟡 | Conhecer (só ChatService/SSE e armadilhas; painel do grafo fica em Pular) |
| [15 · Disclaimer, guardrail visual e E2E no CI](./15-disclaimer-visual-guardrail-and-e2e-in-ci.md) | 🟡 | 🟡 | Conhecer |
| [16 · Langfuse e instrumentação por nó](./16-langfuse-per-node-instrumentation.md) | 🟢 | 🟢 | Aprofundar |
| [17 · Métricas, budget de tokens e rate limiting](./17-metrics-token-budget-and-rate-limiting.md) | 🟢 | 🟢 | Implementar |
| [18 · README com Mermaid e desligar o ambiente](./18-readme-and-shutting-down-gcp.md) | 🟡 | ⚪ | Conhecer |
| [19 · Revisão integrada](./19-integrated-review.md) | 🟡 | 🟡 | Conhecer |

## ✅ Implemente no dia a dia

1. **Guardrail de regra de negócio em código, com teste**
   - Por quê: instrução no prompt não é garantia. Na prática, o que a comunidade faz: o prompt orienta, uma camada determinística valida a saída e um teste fixa o comportamento.
   - Primeiro passo mínimo: escolha uma regra que o seu produto não pode violar, escreva um filtro sobre a saída (regex, schema ou classificador simples) e dois testes: o que deve bloquear e o que não pode bloquear.
   - Quando não adotar: regra puramente de estilo ou tom, sem consequência legal ou financeira.
   - Ressalva do guia: o filtro do caso é regex e tem furos (paráfrases como "sugeriria" passam) e falso positivo (`recomenda` bloqueia "a empresa recomenda dividendos"). Trate cada escape em produção como caso de teste novo.
   - Tópicos: [00](./00-welcome-to-the-capstone.md), [09](./09-answer-node-citation-guardrail-and-sse.md).

2. **Teto de iterações com estado no grafo e teste do teto**
   - Por quê: loop de agente sem limite queima tokens e pode nunca responder. O contador deve viver no estado da execução, não em variável global, ou quebra com concorrência.
   - Primeiro passo mínimo: um `MAX_ITERATIONS` no estado, a decisão de sair em uma função pura, e um teste com LLM fake que sempre devolve "insuficiente" afirmando o número exato de passadas.
   - Quando não adotar: fluxo linear de uma chamada só.
   - Ressalva do guia: a aula descreve o corte na terceira passada, mas o código faz duas rodadas de grade e uma única busca web. Confie no teste, não na narração. O guia também lembra que a resposta final precisa distinguir "guard cortou" de "contexto suficiente".
   - Tópico: [08](./08-real-graph-conditional-edge-and-loop-guard.md).

3. **Testes sem rede com injeção por fronteira e flag de demo**
   - Por quê: sem fixtures e fakes nas fronteiras (LLM, busca, banco, embeddings), CI vira loteria de rede e custo. Vale igual com Vitest/Jest em Node ou pytest em Python.
   - Primeiro passo mínimo: passe as dependências externas como funções para o seu fluxo e troque por fakes no teste. Só depois pense em flag global.
   - Quando não adotar: função pura não precisa de mock, só de teste comum.
   - Ressalva do guia: com `DEMO=true` o E2E nunca exercita o circuit breaker nem o ramo de web search, e `retries: 2` no CI esconde flakiness. Fake demais dá falsa confiança.
   - Tópicos: [10](./10-testing-the-graph-without-network.md), [15](./15-disclaimer-visual-guardrail-and-e2e-in-ci.md).

4. **Retry, circuit breaker e degradação por regra de negócio**
   - Por quê: todo provedor externo de LLM, busca ou embedding cai. Decida antes quem degrada (busca web opcional), quem falha (pagamento) e quem alerta.
   - Primeiro passo mínimo: retry com backoff só para erro transitório (timeout, 5xx, 429), mais um contador de falhas consecutivas com tempo de resfriamento. Em AWS e TypeScript, uma biblioteca madura de resiliência costuma servir melhor que código próprio (confira a versão atual).
   - Quando não adotar: chamada única, interna e barata. Breaker sem retry bem calibrado só adiciona estado.
   - Ressalva do guia: o retry do caso repete até erro 4xx, não há half-open explícito, o estado do breaker é por instância (e por processo) e o `catch` descarta o erro sem log. Isso é degradação silenciosa, o oposto do que o comentário do código promete.
   - Tópico: [11](./11-circuit-breaker-retry-and-graceful-degradation.md).

5. **Budget de tokens e rate limit checados antes de abrir o stream**
   - Por quê: custo de LLM é o risco operacional novo. Rejeitar com 429 antes do `writeHead(200)` é a única forma limpa de responder o erro em SSE.
   - Primeiro passo mínimo: contador diário de tokens (entrada mais saída, vindos do retorno do modelo) e limite por IP ou chave, com valores derivados de tráfego medido, testados com limites minúsculos (2 ou 1).
   - Quando não adotar: ferramenta interna com poucos usuários e teto de gasto já imposto pelo provedor.
   - Ressalva do guia: contador por processo não vale com várias instâncias (em produção use Redis ou Postgres), o gateway MCP não passa pelo budget, modelo fora da tabela de preços vira custo zero e embeddings ficam fora da métrica.
   - Erro único: um só error handler (`setErrorHandler`) respondendo problem+json, sem vazar stack, em vez de cada rota tratar o seu (tópico 12).
   - Tópico: [17](./17-metrics-token-budget-and-rate-limiting.md).

6. **CLAUDE.md curto, skills por tarefa e medir o contexto fixo**
   - Por quê: o achado do tópico 01 é que o `.claude/CLAUDE.md` do repo cresceu para 325 linhas e cerca de 57 KB (diário de cada bloco em "Estado atual"), contrariando a própria lição de contexto sempre carregado. O guia também lembra: regra no arquivo não é garantia técnica, nada impede o agente de violá-la sem hook, teste ou revisão.
   - Primeiro passo mínimo: `wc -c` no seu CLAUDE.md, tire o que é histórico ou específico de uma tarefa e mova para uma skill carregada só quando preciso. Regra que não pode ser violada vira hook ou teste.
   - Quando não adotar: repositório pequeno, com CLAUDE.md que já cabe em poucas dezenas de linhas.
   - Tópico: [01](./01-claude-md-and-ai-dev-skills.md).

## 🔬 Aprofunde (rumo a especialista)

1. **Avaliar o julgador de suficiência (LLM-as-grader) e o RAG corretivo**
   - Diferencia porque o nó `grade` erra para os dois lados (busca web desnecessária ou resposta com contexto fraco) e o repo só tem 3 testes dele, sem teste do prompt. Quem sabe medir esse erro sabe operar RAG.
   - Estudar: o livro de Huyen, *AI Engineering* (confira o sumário); documentação de avaliação da sua ferramenta de tracing; literatura de RAG corretivo e RAG agêntico pelo nome.
   - Praticar: monte um dataset de 30 perguntas com rótulo "suficiente/insuficiente" feito à mão, rode o grader e meça acerto e taxa de falso negativo. O prompt só muda se a métrica melhorar.
   - Tópicos: [06](./06-retrieve-and-grade-nodes.md), [08](./08-real-graph-conditional-edge-and-loop-guard.md).

2. **Guardrails de saída além de regex**
   - Diferencia porque o guia mostra o limite: padrão fixo cobre formas conhecidas. Especialista combina regras, classificador (inclusive um LLM barato) e política de fallback, e mede falso positivo e falso negativo.
   - Estudar: OWASP Top 10 para aplicações com LLM; práticas de moderação de saída; o livro de Huyen, *AI Engineering* (confira o sumário).
   - Praticar: monte um conjunto de 40 frases (20 que devem bloquear, 20 legítimas, incluindo paráfrases e "a empresa recomenda dividendos") e compare regex contra regex mais classificador, reportando as duas taxas de erro.
   - Tópicos: [09](./09-answer-node-citation-guardrail-and-sse.md), [00](./00-welcome-to-the-capstone.md).

3. **Observabilidade por nó com traces e métricas**
   - Diferencia porque sem trace por nó você não explica custo nem erro. O padrão (span por passo, tokens e custo por span) é o mesmo com OpenTelemetry em AWS, qualquer que seja a ferramenta de LLM observability.
   - Estudar: documentação do OpenTelemetry (spans e métricas); a ferramenta de tracing que você escolher (confira a versão atual); o livro de Huyen, *AI Engineering* (confira o sumário).
   - Praticar: instrumente um fluxo de 3 passos e responda, a partir do trace, qual passo gasta mais tokens e mais tempo numa pergunta real.
   - Ressalva: o guia traz o achado de que passar `callbacks` explícito dentro do nó faz a generation sumir do trace. Verifique o dashboard antes de confiar nele.
   - Tópicos: [16](./16-langfuse-per-node-instrumentation.md), [17](./17-metrics-token-budget-and-rate-limiting.md).

4. **Citação e grounding verificáveis**
   - Diferencia porque "cite as fontes" no prompt não prova nada. O caso monta o bloco de fontes por código, não pelo LLM, o que torna a citação auditável.
   - Estudar: leituras sobre groundedness e verificação de atribuição em RAG (pelo nome); o livro de Huyen, *AI Engineering* (confira o sumário).
   - Praticar: escreva um verificador que confere se todo número da resposta aparece no contexto recuperado e marque as respostas que falham num lote de 20 perguntas.
   - Tópico: [09](./09-answer-node-citation-guardrail-and-sse.md).

5. **pgvector na prática e avaliação offline do RAG**
   - Diferencia porque quem usa Postgres erra aqui em silêncio. O guia traz: o embedding da carga e o da busca têm de vir do mesmo modelo; o limite de 2.000 dimensões do índice força truncar de 3.072 para 768; o operador do HNSW tem de casar com a consulta (`vector_cosine_ops` e `<=>`); HNSW é aproximado; o seed é idempotente por upsert; trocar de modelo exige reindexar.
   - Primeiro passo mínimo: rodar a mesma consulta com e sem índice (`SET enable_indexscan = off`) e comparar os ids do top-5. Divergência grande é recall perdido.
   - Estudar: documentação do pgvector (índices, operadores, recall); avaliação offline de retrieval (recall@k em um conjunto rotulado à mão), que a aula não cobre.
   - Quando não adotar: poucas centenas de linhas, onde varredura exata é rápida e dispensa índice aproximado.
   - Tópico: [05](./05-pgvector-and-seed.md).

## 📖 Conhecer (leia só o trecho indicado)

- **Servidor MCP (12):** leia "a descrição da tool é prompt", "uma tool só" (não expor o grafo nem o guardrail) e o achado de que, no HTTP standalone, cada POST cria um grafo novo (novo SearchProvider e breaker), contrariando a instância única. O resto do MCP muda rápido; aprenda quando houver caso real.
- **Frontend (14):** só a parte do ChatService e do SSE e as armadilhas: SSE sobre POST (EventSource só faz GET), parser de frames com buffer parcial, validar cada evento com o Zod do contrato compartilhado, mensagem de erro fixa na tela, e o teste de navegador que achou o botão desabilitado com cara de habilitado. O painel do grafo continua em Pular.
- **Skill de design (13), Pular com um ponto:** veja o 💡 e as armadilhas: regra de domínio vira regra de estilo, a skill gerada pode divergir do código e regra sem origem rastreável vira dívida.

## 🧂 Pode ficar no superficial

- **GCP em si (tópicos 02 e 04):** Cloud Run, Secret Manager, Firebase Hosting e o tour do console são específicos de stack. Mantenha só o princípio e traduza para AWS (papel de execução separado do papel de deploy, segredo fora do repo, health check, deploy canary).
- **WIF como produto:** o conceito vale muito (deploy sem chave JSON, via federação OIDC), mas o equivalente em AWS é o provedor OIDC do GitHub com role assumida. Aprenda uma vez no seu ambiente, não pela aula.
- **Frontend (13 e painel do 14):** Angular, protótipo no Claude Design e painel de estado do grafo não pertencem ao seu dia a dia nem ao caminho de especialista em IA aplicada. A UI que importa aqui é o disclaimer permanente, que é guardrail visual.
- **Corpus CVM, README com Mermaid (03, 18):** parágrafos determinísticos sem LLM é boa ideia (menos custo e alucinação), mas é detalhe do domínio. Mermaid é conveniência.

## ⚠️ Cuidados e lacunas

- **A aula diverge do código em pontos centrais:** guardrail que "impede pedidos" na verdade filtra a resposta; o corte do loop é diferente do narrado; o breaker abre após 9 chamadas ao provider, não 3. Use a [tabela de achados do README](./README.md) como contrapeso e confie em teste, não em narração.
- **Nada foi executado pelo autor do guia:** o próprio README diz que nenhum teste, build ou deploy rodou. O que o guia afirma sobre comportamento é leitura de código; marque como hipótese até rodar.
- **Vazamento de erro interno:** a tool MCP devolve `error.message` cru ao cliente, na contramão do erro genérico no SSE. Para produção, mensagem fixa ao cliente e detalhe só no log.
- **Lacunas ausentes na aula:** avaliação offline do RAG (qualidade de retrieval e do grader; ver item 5 de aprofundar), prompt injection vindo da web fallback (minha análise: o tópico 07 só diz que conteúdo da web é menos confiável e entra no mesmo contexto) e estado compartilhado para budget e breaker. Todas relevantes em produção, nenhuma coberta com profundidade.
- **Fallback web acumula lixo:** achado do tópico 07: `insert()` duplica chunks da mesma URL depois do TTL e a tabela web acumula linhas expiradas, sem cron de limpeza. Afeta qualquer RAG com fonte externa; trate no item de RAG (aprofundar 1 e 5).
- **Permissão acima do pedido:** a service account de deploy tem papéis amplos apesar do discurso de mínimo privilégio. Em AWS, restrinja a role por repositório e por branch na trust policy.

## ✔️ Como saber que aprendeu

1. Consigo desenhar, sem consultar, o fluxo retrieve, grade, busca externa, retrieve, grade, answer com o teto de iterações, e dizer onde a regra de negócio é garantida por código e onde é só orientada por prompt.
2. Meu serviço com LLM tem um guardrail de saída com teste (casos que bloqueiam e casos que não podem bloquear), testes que rodam sem rede e um teste de degradação que simula o provedor externo fora do ar.
3. Consigo abrir o trace de uma pergunta real, ler tokens e custo por nó, e demonstrar o 429 do budget e do rate limit com limites minúsculos, verificando que a resposta chega antes do stream abrir.

Veja também a [trilha consolidada](../../study-roadmap.md).
