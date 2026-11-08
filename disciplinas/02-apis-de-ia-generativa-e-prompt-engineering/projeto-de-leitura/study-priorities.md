# 🎯 Disciplina 02 · O que vale estudar

> Análise de prioridade (opinião fundamentada no guia e na prática atual), não conteúdo da apostila. Premissas: engenheiro de software backend (TypeScript/Node e Python, AWS, Postgres, filas e jobs, LLMs em produção, automação de fluxos e uso intenso de agentes de código) que quer virar engenheiro de IA aplicada especialista (construir, avaliar, operar e governar sistemas com LLMs), não pesquisador de modelos.

## Veredito
A disciplina entrega mais valor em três ideias: saída estruturada com schema, segurança fora do modelo (guardrail e autorização em código) e loops de LLM com validação e limite de tentativas. Quem já faz backend aproveita direto, porque o resto é engenharia normal em volta de uma chamada de modelo. Nota ⭐⭐⭐⭐ (4 de 5): conteúdo de alto retorno nos tópicos 03 a 09 e 11, mas parte do tempo vai para framework e demo que mudam rápido, e avaliação e observabilidade ficam só na superfície. Mais útil para quem já programa e precisa colocar LLM em produção com segurança e custo sob controle.

## Mapa de prioridade por tópico

| Tópico | Dia a dia | Especialista | Veredito |
|--------|-----------|--------------|----------|
| [00 · Mercado de IA como serviço, wrappers e o Applied AI Engineer](./00-mercado-ia-servico-e-wrappers.md) | ⚪ | 🟡 | Conhecer |
| [01 · OpenRouter: laboratório de modelos, roteamento e fallback](./01-openrouter-gateway-multi-modelo.md) | 🟡 | 🟡 | Conhecer |
| [02 · LangChain.js e LangGraph: pipes, estado, nodes e edges](./02-langchain-langgraph-estado-nodes-edges.md) | 🟡 | 🟡 | Conhecer |
| [03 · Pipeline condicional, node de fallback e testes automatizados](./03-pipeline-condicional-fallback-testes.md) | 🟡 | 🟡 | Conhecer |
| [04 · Structured JSON e JSON Prompts: da linguagem natural à ação](./04-structured-json-e-json-prompts.md) | 🟢 | 🟢 | Implementar |
| [05 · Memória: preferências, SQLite, Postgres e resumo incremental](./05-memoria-preferencias-e-resumo.md) | 🟡 | 🟡 | Conhecer |
| [06 · Prompt injection: por que o System Prompt não é controle de acesso](./06-prompt-injection-limites-do-system-prompt.md) | 🟢 | 🟢 | Aprofundar |
| [07 · MCP, PromptTemplate e guardrails: bloqueio antes da tool call](./07-mcp-e-guardrails.md) | 🟢 | 🟢 | Aprofundar |
| [08 · RAG com Neo4j: arquitetura, Query Planner e Cypher Generator](./08-rag-neo4j-planner-e-cypher-generator.md) | ⚪ | 🟡 | Conhecer |
| [09 · RAG com Neo4j: executor, autocorreção e resposta analítica](./09-rag-neo4j-executor-correcao-resposta.md) | 🟡 | 🟢 | Aprofundar |
| [10 · Modelos multimodais: documentos, áudio e real-time](./10-modelos-multimodais.md) | 🟡 | 🟡 | Conhecer |
| [11 · Monitoramento com Langfuse e evaluation tests](./11-langfuse-e-evaluation.md) | 🟢 | 🟢 | Aprofundar |
| [12 · Live NetFibra: suporte com LangGraph, GraphRAG em memória e human-in-the-loop](./12-live-netfibra-langgraph-graphrag-hitl.md) | 🟡 | 🟡 | Conhecer |

## ✅ Implemente no dia a dia

1. **Saída estruturada com schema validado, regra de negócio em código**
   - Por que vale: o modelo só extrai intenção e parâmetros; domínio (agendar, cancelar, checar disponibilidade) fica num service testável. Na prática, o que a comunidade faz: schema (Zod em TypeScript, Pydantic em Python) como contrato, mais revalidação em cada etapa que consome o dado.
   - Primeiro passo mínimo: pegue uma chamada de LLM que hoje devolve texto e faça parse; troque por uma função `generateStructured(system, user, schema)` com Zod ou Pydantic e `safeParse` no consumidor. Uma função, um schema.
   - Quando não adotar: se a saída é texto livre para humano ler, não precisa de schema. E se o modelo escolhido não suporta formato estruturado, valide manualmente em vez de fingir contrato (confira a versão e o suporte atual do modelo).
   - Tópico: [04](./04-structured-json-e-json-prompts.md).

2. **Autorização fora do modelo: guardrail antes da tool call e permissão no código da tool**
   - Por que vale: a aula prova que regra no system prompt é política probabilística e quebra ao trocar de modelo. O padrão sólido é quem executa não decide se pode executar. Atenção ao achado do próprio guia: no projeto, as tools MCP vão para qualquer usuário e `permissions` só é exibido. Em produção, não entregue a tool ou cheque permissão dentro dela.
   - Primeiro passo mínimo: liste as tools do seu agente e, para cada uma com efeito colateral, adicione checagem de papel no código da tool (retorna erro explícito). Só depois pense em classificador de entrada.
   - Quando não adotar: guardrail LLM em fluxo sem tools nem dados sensíveis é custo e latência sem retorno. Ele também erra (falso positivo e negativo) e, no código do guia, falha aberta quando a saída foge do formato; prefira falhar fechado.
   - Tópicos: [06](./06-prompt-injection-limites-do-system-prompt.md), [07](./07-mcp-e-guardrails.md).

3. **Loop de LLM com validação, correção e teto de tentativas**
   - Por que vale: gerar, validar sem executar (ex.: `EXPLAIN`), corrigir uma ou duas vezes e então devolver erro amigável é o padrão de qualquer geração de query, código ou JSON. O limite protege custo e evita estouro de recursão.
   - Primeiro passo mínimo: em um gerador que você já tem, adicione `maxAttempts` em config, um contador no estado e uma resposta final de erro sem stacktrace.
   - Quando não adotar: se a primeira resposta já é determinística o bastante (schema simples), a correção só adiciona custo e caminhos para testar. Se a saída executa algo (SQL, Cypher), validar sintaxe não basta: use usuário read-only, como o próprio guia alerta.
   - Tópico: [09](./09-rag-neo4j-executor-correcao-resposta.md).

4. **Fallback explícito e teste do caminho "desconhecido"**
   - Por que vale: todo roteamento por intenção precisa de um caminho definido para o caso não reconhecido, com resposta estável. É o que separa demo de produto.
   - Primeiro passo mínimo: um teste por ramo, incluindo `unknown`, comparando status e corpo. Roteamento por palavra-chave é frágil (o próprio guia mostra), então use só para o esqueleto.
   - Quando não adotar: não precisa de framework de grafo para isso; um `switch` com default e teste resolve.
   - Tópico: [03](./03-pipeline-condicional-fallback-testes.md) (fonte do princípio; o tópico fica como "Conhecer" porque o framework de grafo é dispensável).

5. **Chaves com expiração e teto de gasto, e registro de qual modelo respondeu**
   - Por que vale: um loop com bug pode drenar crédito em minutos, e sem registrar o modelo você perde rastreabilidade de custo e qualidade.
   - Primeiro passo mínimo: uma chave por projeto com limite de gasto no provedor e um campo `model` no log estruturado de cada chamada.
   - Quando não adotar: um gateway multi-modelo só compensa se você realmente troca de modelo ou precisa de fallback. Com um provedor único e estável, o SDK direto é mais simples (minha análise: uma camada a mais também é mais um intermediário de compliance, como o guia lembra).
   - Tópico: [01](./01-openrouter-gateway-multi-modelo.md).

## 🔬 Aprofunde (rumo a especialista)

1. **Segurança de LLM com tools (injection direta e indireta, privilégio mínimo)**
   - Por que diferencia: é o assunto em que a maioria erra com confiança. Um especialista modela ameaça por tool, não por prompt, e sabe que "o teste bloqueou" só prova que aquele modelo, naquela execução, obedeceu.
   - Estudar além da aula: OWASP Top 10 for LLM Applications; o catálogo PayloadsAllTheThings de prompt injection (link no [tópico 06](./06-prompt-injection-limites-do-system-prompt.md)); a distinção entre injeção direta e indireta (dado externo lido pela tool).
   - Exercício: monte 10 payloads de injection contra seu agente com 2 modelos diferentes e meça a taxa de bloqueio por camada (só prompt, prompt mais guardrail, permissão na tool). Critério verificável: com a permissão na tool, a taxa de vazamento é zero independente do modelo.
   - Tópicos: [06](./06-prompt-injection-limites-do-system-prompt.md), [07](./07-mcp-e-guardrails.md).

2. **Evaluation: dataset, avaliadores, score e threshold no CI**
   - Por que diferencia: sem medir, mudança de prompt ou de modelo é aposta. A aula só aponta a direção (o guia diz que não é para virar especialista em monitoramento ali), então o aprofundamento é por sua conta.
   - Estudar além da aula: LangChain Docs sobre avaliação de agentes e LangSmith Evaluation Quickstart (link no [tópico 11](./11-langfuse-e-evaluation.md)); na prática, o que a comunidade faz: mistura de checagens determinísticas (schema, campos, enums) com avaliador LLM para qualidade subjetiva, sempre calibrado contra exemplos rotulados por humano.
   - Exercício: crie 20 casos rotulados para uma funcionalidade sua, rode antes e depois de editar o prompt e falhe o CI se o score cair abaixo do limite. Verificável: um PR que piora o prompt de propósito é barrado.
   - Tópico: [11](./11-langfuse-e-evaluation.md).

3. **Observabilidade de LLM com OpenTelemetry**
   - Por que diferencia: custo por usuário, latência por etapa e tool calls rastreáveis são requisito de operação. O painel do provedor mostra gasto, não rota, usuário nem prompt.
   - Estudar além da aula: documentação oficial do OpenTelemetry e do Langfuse (confira a versão atual, a aula cita aquisição e portas típicas que podem mudar); veja como o seu backend já exporta traces.
   - Exercício: instrumente uma chamada de LLM e responda em menos de 1 minuto "qual rota e qual usuário gastaram mais tokens ontem". Verificável: o dashboard responde sem olhar código.
   - Tópico: [11](./11-langfuse-e-evaluation.md).

4. **Orquestração com estado, checkpoint e human-in-the-loop**
   - Por que diferencia: fluxos longos precisam pausar, retomar e sobreviver a reinício. Um especialista sabe quando um grafo se justifica e quando uma fila com máquina de estados própria é melhor.
   - Estudar além da aula: documentação oficial do LangGraph sobre checkpointers persistentes e `interrupt` (confira a versão atual); compare com o que você faria com fila e Postgres.
   - Exercício: faça um fluxo que pausa para uma escolha humana, reinicie o processo e retome pelo `thread_id`. Verificável: a retomada funciona após restart (o `MemorySaver` da live não sobrevive a isso, então use um checkpointer persistente).
   - Tópicos: [12](./12-live-netfibra-langgraph-graphrag-hitl.md), [05](./05-memoria-preferencias-e-resumo.md).

5. **Text-to-query seguro e RAG pragmático**
   - Por que diferencia: o padrão planner, gerador, validador e corretor serve a SQL, Cypher e geração de código. O diferencial é sabê-lo seguro (read-only, allow-list) e saber quando recuperação determinística ou híbrida basta.
   - Estudar além da aula: a leitura sobre técnicas avançadas de RAG indicada no [README](./README.md) (hybrid search e reranking como melhorias de maior impacto, segundo o guia); documentação do seu banco sobre papéis read-only.
   - Exercício: adapte o loop para SQL em Postgres com usuário read-only e prove que uma instrução de escrita gerada pelo modelo é rejeitada pelo banco. Verificável: teste que injeta um `DELETE` e espera erro.
   - Tópicos: [08](./08-rag-neo4j-planner-e-cypher-generator.md), [09](./09-rag-neo4j-executor-correcao-resposta.md).

## 🧂 Pode ficar no superficial

- **Mercado de wrappers, equity e salários ([00](./00-mercado-ia-servico-e-wrappers.md)):** vale a ideia central (chamar API não é diferencial; custo por requisição e dependência de provedor importam). Os números de vaga e de captação são do contexto da aula, mudam e não ajudam a codar.
- **Detalhes de template, versão e boilerplate de LangChain, LangSmith e Studio ([02](./02-langchain-langgraph-estado-nodes-edges.md)):** o guia mesmo diz que templates e versões mudam rápido. Entenda estado, node e edge; não decore flags, variáveis de ambiente nem workaround de versão.
- **Neo4j e Cypher em si ([08](./08-rag-neo4j-planner-e-cypher-generator.md)):** pouco provável no seu dia a dia com Postgres. Leve o padrão, não o banco.
- **Áudio direto, real-time, WebRTC ([10](./10-modelos-multimodais.md)):** no repo só o caminho de PDF existe, o resto é teoria. Fora do seu foco backend atual, aprofunde só se o produto pedir voz.
- **Memória com dois bancos (SQLite mais Postgres) ([05](./05-memoria-preferencias-e-resumo.md)):** conceito útil (curto versus longo prazo, resumo incremental), mas na prática você usaria só o Postgres que já tem. Minha análise: dois bancos na demo são didáticos, não recomendação.

## ⚠️ Cuidados e lacunas

- **Testes com modelo gratuito e ranking de mercado são frágeis.** O guia mostra asserts que dependem de qual modelo é o mais barato ou o mais rápido, e testes end-to-end que flutuam (um agendamento com `it.skip`). Valide pipeline e contrato, não o texto nem o ranking.
- **O código do repo tem bugs que a aula não menciona.** O guia aponta, entre outros: `catch` que devolve `success: true` no `generateStructured`, acumulador multi-step que nunca cresce, argumentos invertidos, limite de correção literal e o `agent.py` ausente na live. Marque como conclusão do guia, algumas "pela leitura do código, sem rodar". Não copie esses trechos para produção.
- **Segurança do material é de demo.** Autorização só no prompt, senha de Postgres fixa no `npm run docker:up` (tópico 05), fail-open no guardrail e dados de paciente em log (atenção à LGPD). Trate como contraexemplo parcial.
- **Lacuna: avaliação e observabilidade vêm sem projeto no repo.** O [tópico 11](./11-langfuse-e-evaluation.md) é conceito; o repositório do módulo não traz exemplo. É o principal buraco para quem quer operar em produção.
- **Lacuna: pouco sobre custo e limites de uso.** Há `maxTokens` e chave com teto, mas não cache de prompt, tratamento de rate limit nem idempotência de jobs com LLM. Complete com o que você já sabe de filas e retentativas.

## ✔️ Como saber que aprendeu

- Consigo, sem consultar, desenhar para um agente com tools as três camadas (guardrail de entrada, permissão no código da tool, escopo mínimo da ferramenta) e explicar por que o system prompt sozinho não basta.
- Meu serviço tem uma chamada de LLM com schema validado e teste do caso `unknown`, e o log de cada chamada registra o modelo usado, tokens e latência de forma verificável.
- Existe no meu repositório um conjunto de casos de avaliação com score e limite que falha o CI quando um prompt piora, e um loop de LLM com `maxAttempts` testado.

Veja também a [trilha consolidada](../../study-roadmap.md).
