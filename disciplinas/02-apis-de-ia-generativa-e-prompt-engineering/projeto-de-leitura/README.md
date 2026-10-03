# 📚 APIs de IA Generativa e Prompt Engineering — Guia de Leitura

> Resumo organizado da **Disciplina 02** da pós de Engenharia de IA Aplicada (autoria: **Erick Wendel**).
> Cada assunto é explicado em **duas camadas**: 👵 *para a vovó* (analogias do mundo real) e 🔧 *tecnicamente* (nível sênior), e fecha com o que foi feito **no código dos projetos do repositório**.

---

## 🗺️ Como usar este guia

Cada arquivo é auto-contido e segue sempre a mesma estrutura:

| Seção | Para quê serve |
|-------|----------------|
| 🎯 **Em uma frase** | O conceito destilado |
| 👵 **Explicando para a vovó** | Analogia do mundo real, sem jargão |
| 🔧 **Tecnicamente** | O que é, como funciona, onde aplicar, vantagens e limites, armadilhas |
| 🧩 **Cola rápida** | Glossário dos termos-chave |
| 💻 **No código do repo** | Fluxo, como rodar, armadilhas e template versus -z do projeto (quando há) |
| 🔗 **Para ir além** | Links de referência |

---

## 🧭 Trilha de leitura sugerida

A ordem respeita a progressão da apostila: do mercado e do gateway de modelos, passando por orquestração, memória e segurança, até RAG, multimodalidade e observabilidade.

### Bloco 1 — Mercado de IA e Gateway de Modelos
- [00 · Mercado de IA como serviço, wrappers e o Applied AI Engineer](./00-mercado-ia-servico-e-wrappers.md)
- [01 · OpenRouter: laboratório de modelos, roteamento e fallback](./01-openrouter-gateway-multi-modelo.md)

### Bloco 2 — LangGraph e Saída Estruturada
- [02 · LangChain.js e LangGraph: pipes, estado, nodes e edges](./02-langchain-langgraph-estado-nodes-edges.md)
- [03 · Pipeline condicional, node de fallback e testes automatizados](./03-pipeline-condicional-fallback-testes.md)
- [04 · Structured JSON e JSON Prompts: da linguagem natural à ação](./04-structured-json-e-json-prompts.md)

### Bloco 3 — Memória e Segurança
- [05 · Memória: preferências, SQLite, Postgres e resumo incremental](./05-memoria-preferencias-e-resumo.md)
- [06 · Prompt injection: por que o System Prompt não é controle de acesso](./06-prompt-injection-limites-do-system-prompt.md)
- [07 · MCP, PromptTemplate e guardrails: bloqueio antes da tool call](./07-mcp-e-guardrails.md)

### Bloco 4 — RAG, Multimodal e Observabilidade
- [08 · RAG com Neo4j: arquitetura, Query Planner e Cypher Generator](./08-rag-neo4j-planner-e-cypher-generator.md)
- [09 · RAG com Neo4j: executor, autocorreção e resposta analítica](./09-rag-neo4j-executor-correcao-resposta.md)
- [10 · Modelos multimodais: documentos, áudio e real-time](./10-modelos-multimodais.md)
- [11 · Monitoramento com Langfuse e evaluation tests](./11-langfuse-e-evaluation.md)

---

## ✅ Cobertura módulo a módulo (Disciplina 02)

| Unidade · Aula da apostila | Documento |
|----------------------------|-----------|
| **Introdução da disciplina**, mapa e revisão final | Seção [Mentalidade da disciplina](#-mentalidade-da-disciplina) deste README |
| **U1 · Aula 1** · Panorama do mercado de IA como serviço (wrappers) | [00 · Mercado de IA como serviço, wrappers e o Applied AI Engineer](./00-mercado-ia-servico-e-wrappers.md) |
| **U1 · Aula 2** · Oportunidades, Applied AI Engineer | [00 · Mercado de IA como serviço, wrappers e o Applied AI Engineer](./00-mercado-ia-servico-e-wrappers.md) |
| **U1 · Aula 3** · OpenRouter na prática: projeto inicial | [01 · OpenRouter: laboratório de modelos, roteamento e fallback](./01-openrouter-gateway-multi-modelo.md) |
| **U1 · Aula 4** · OpenRouter: roteamento multi-modelo, fallback e testes | [01 · OpenRouter: laboratório de modelos, roteamento e fallback](./01-openrouter-gateway-multi-modelo.md) |
| **U2 · Aula 1** · LangChain.js, pipes, fluxos condicionais, gerador de apps | [02 · LangChain.js e LangGraph: pipes, estado, nodes e edges](./02-langchain-langgraph-estado-nodes-edges.md) |
| **U2 · Aula 2** · Estado, LangGraph Studio, Web API | [02 · LangChain.js e LangGraph: pipes, estado, nodes e edges](./02-langchain-langgraph-estado-nodes-edges.md) |
| **U2 · Aula 3** · Nodes e edges | [02 · LangChain.js e LangGraph: pipes, estado, nodes e edges](./02-langchain-langgraph-estado-nodes-edges.md) |
| **U2 · Aula 4** · Pipeline completo, fluxos condicionais e testes | [03 · Pipeline condicional, node de fallback e testes automatizados](./03-pipeline-condicional-fallback-testes.md) |
| **U2 · Aula 5** · Node de fallback e casos de teste restantes | [03 · Pipeline condicional, node de fallback e testes automatizados](./03-pipeline-condicional-fallback-testes.md) |
| **U3 · Aula 1** · Intenção e consultas médicas (introdução) | [04 · Structured JSON e JSON Prompts: da linguagem natural à ação](./04-structured-json-e-json-prompts.md) |
| **U3 · Aula 2** · Structured JSON + JSON Prompts | [04 · Structured JSON e JSON Prompts: da linguagem natural à ação](./04-structured-json-e-json-prompts.md) |
| **U3 · Aula 3** · Intenção em JSON, primeiro teste end-to-end | [04 · Structured JSON e JSON Prompts: da linguagem natural à ação](./04-structured-json-e-json-prompts.md) |
| **U3 · Aula 4** · Cancelamento e último teste end-to-end | [04 · Structured JSON e JSON Prompts: da linguagem natural à ação](./04-structured-json-e-json-prompts.md) |
| **U4 · Aula 1** · Recomendador de músicas (introdução) | [05 · Memória: preferências, SQLite, Postgres e resumo incremental](./05-memoria-preferencias-e-resumo.md) |
| **U4 · Aula 2** · Extração de preferências | [05 · Memória: preferências, SQLite, Postgres e resumo incremental](./05-memoria-preferencias-e-resumo.md) |
| **U4 · Aula 3** · Memory: SQLite | [05 · Memória: preferências, SQLite, Postgres e resumo incremental](./05-memoria-preferencias-e-resumo.md) |
| **U4 · Aula 4** · Resumo de histórico e Postgres | [05 · Memória: preferências, SQLite, Postgres e resumo incremental](./05-memoria-preferencias-e-resumo.md) |
| **U5 · Aula 1** · Protegendo contra prompt injection | [06 · Prompt injection: por que o System Prompt não é controle de acesso](./06-prompt-injection-limites-do-system-prompt.md) |
| **U5 · Aula 2** · Prompt Templates e MCP Adapters | [07 · MCP, PromptTemplate e guardrails: bloqueio antes da tool call](./07-mcp-e-guardrails.md) |
| **U5 · Aula 3** · Prompt injection na prática | [06 · Prompt injection: por que o System Prompt não é controle de acesso](./06-prompt-injection-limites-do-system-prompt.md) |
| **U5 · Aula 4** · Safeguard na prática | [07 · MCP, PromptTemplate e guardrails: bloqueio antes da tool call](./07-mcp-e-guardrails.md) |
| **U6 · Aula 1** · Template, arquitetura e definição do projeto | [08 · RAG com Neo4j: arquitetura, Query Planner e Cypher Generator](./08-rag-neo4j-planner-e-cypher-generator.md) |
| **U6 · Aula 2** · Query Planner Node | [08 · RAG com Neo4j: arquitetura, Query Planner e Cypher Generator](./08-rag-neo4j-planner-e-cypher-generator.md) |
| **U6 · Aula 3** · Cypher Generator | [08 · RAG com Neo4j: arquitetura, Query Planner e Cypher Generator](./08-rag-neo4j-planner-e-cypher-generator.md) |
| **U6 · Aula 4** · Cypher Executor | [09 · RAG com Neo4j: executor, autocorreção e resposta analítica](./09-rag-neo4j-executor-correcao-resposta.md) |
| **U6 · Aula 5** · Cypher Correction e Analytical Response | [09 · RAG com Neo4j: executor, autocorreção e resposta analítica](./09-rag-neo4j-executor-correcao-resposta.md) |
| **U7 · Aula 1** · Modelos multimodais | [10 · Modelos multimodais: documentos, áudio e real-time](./10-modelos-multimodais.md) |
| **U7 · Aula 2** · Langfuse e Evaluation Tests | [11 · Monitoramento com Langfuse e evaluation tests](./11-langfuse-e-evaluation.md) |

> As 28 aulas da apostila (7 unidades) estão cobertas em 12 documentos. U1 tem 4 aulas, U2 tem 5, U3 tem 4, U4 tem 4, U5 tem 4, U6 tem 5 e U7 tem 2.

---

## 🧪 Projetos do repositório absorvidos

O código dos 7 projetos práticos está dentro dos documentos, na seção **💻 No código do repo** (fluxo por arquivo, como rodar, achados de bugs e diferenças entre template e -z).

| Projeto no GitHub | Onde está neste guia |
|-------------------|----------------------|
| 01-smart-model-router-gateway | [01 · OpenRouter: laboratório de modelos, roteamento e fallback](./01-openrouter-gateway-multi-modelo.md) |
| 02-langchain-intro | [03 · Pipeline condicional, node de fallback e testes automatizados](./03-pipeline-condicional-fallback-testes.md) |
| 03-medical-appointment (template e z) | [04 · Structured JSON e JSON Prompts: da linguagem natural à ação](./04-structured-json-e-json-prompts.md) |
| 04-song-highlights (template e z) | [05 · Memória: preferências, SQLite, Postgres e resumo incremental](./05-memoria-preferencias-e-resumo.md) |
| 05-safeguard-prompt-injection (template e z) | [07 · MCP, PromptTemplate e guardrails: bloqueio antes da tool call](./07-mcp-e-guardrails.md) |
| 06-rag-neo4j-students (template e z) | [09 · RAG com Neo4j: executor, autocorreção e resposta analítica](./09-rag-neo4j-executor-correcao-resposta.md) |
| 07-doc-analysis | [10 · Modelos multimodais: documentos, áudio e real-time](./10-modelos-multimodais.md) |

---

## 🎓 Mentalidade da disciplina

A introdução e a revisão final da apostila resumem o fio condutor do módulo:

- **LLM não é mágica nem solução isolada: é componente.** O que transforma uma API de IA em produto é arquitetura, estado, validação, segurança, monitoramento e engenharia de software.
- Conectar uma API não é diferencial competitivo; o diferencial está em engenharia, produto e arquitetura ([00 · Mercado de IA como serviço, wrappers e o Applied AI Engineer](./00-mercado-ia-servico-e-wrappers.md)).
- Saída estruturada troca parsing frágil por **contrato formal** de resposta ([04 · Structured JSON e JSON Prompts: da linguagem natural à ação](./04-structured-json-e-json-prompts.md)).
- Estado, nodes, edges e fallback transformam um chat em fluxo determinístico e observável ([02 · LangChain.js e LangGraph: pipes, estado, nodes e edges](./02-langchain-langgraph-estado-nodes-edges.md), [03 · Pipeline condicional, node de fallback e testes automatizados](./03-pipeline-condicional-fallback-testes.md)).
- Contexto ilimitado é insustentável: resumir, armazenar e controlar tokens ([05 · Memória: preferências, SQLite, Postgres e resumo incremental](./05-memoria-preferencias-e-resumo.md)).
- A segurança não pode depender do comportamento probabilístico do modelo: guardrails externos e bloqueio determinístico ([06 · Prompt injection: por que o System Prompt não é controle de acesso](./06-prompt-injection-limites-do-system-prompt.md), [07 · MCP, PromptTemplate e guardrails: bloqueio antes da tool call](./07-mcp-e-guardrails.md)).
- Pipeline analítico com validação antes de executar, autocorreção e loop com limite ([08 · RAG com Neo4j: arquitetura, Query Planner e Cypher Generator](./08-rag-neo4j-planner-e-cypher-generator.md), [09 · RAG com Neo4j: executor, autocorreção e resposta analítica](./09-rag-neo4j-executor-correcao-resposta.md)).
- Multimodal amplia possibilidades, mas não elimina fundamentos ([10 · Modelos multimodais: documentos, áudio e real-time](./10-modelos-multimodais.md)).
- Observabilidade e evaluation com score e threshold, inclusive no CI/CD ([11 · Monitoramento com Langfuse e evaluation tests](./11-langfuse-e-evaluation.md)).

Checklist de domínio da revisão final: explicar por que chamar a API não basta; como estado, nodes, edges e fallback criam um fluxo observável; a separação entre linguagem natural, JSON e regras determinísticas; como SQLite, Postgres e resumo controlam memória; por que prompt injection não se resolve só com System Prompt; o pipeline do RAG com Neo4j do Planner à resposta analítica; os trade-offs de modalidades; e como tracing, custo, latência, score e threshold apoiam monitoramento e evaluation.

---

## 🧰 Materiais oficiais da disciplina

- **Repositório de código:** https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms
- **Pastas do módulo:** 01-smart-model-router-gateway, 02-langchain-intro, 03-medical-appointment-template e -z, 04-song-highlights-template e -z, 05-safeguard-prompt-injection-template e -z, 06-rag-neo4j-students-template e -z, 07-doc-analysis
- **Linguagem principal:** TypeScript no Node.js 24 (TypeScript nativo, sem transpilação), com Fastify, LangChain.js e LangGraph

### Indicações de leitura complementar
1. **Mastering Advanced RAG Techniques: A Comprehensive Guide** (Ahmed, S., Medium, 22 fev. 2025). Evolui do RAG básico para produção: indexação, pré-retrieval, retrieval e pós-retrieval, com hierarchical indexing, query expansion e decomposition, multi-hop, hybrid search, reranking com cross-encoders, fine-tuning de embeddings e context compression. Reforça começar por melhorias de alto impacto (hybrid search e reranking). Relaciona-se com [08 · RAG com Neo4j: arquitetura, Query Planner e Cypher Generator](./08-rag-neo4j-planner-e-cypher-generator.md). https://medium.com/@sahin.samia/mastering-advanced-rag-techniques-a-comprehensive-guide-f0491717998a
2. **PayloadsAllTheThings: Prompt Injection** (Swisskyrepo, GitHub). Catálogo de system prompt, direct e indirect prompt injection, com exemplos, cenários de abuso, ferramentas e desafios, útil para sanitização de entrada, isolamento de contexto, validação de saída e testes de segurança. Relaciona-se com [06 · Prompt injection: por que o System Prompt não é controle de acesso](./06-prompt-injection-limites-do-system-prompt.md). https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Prompt%20Injection/README.md
3. **LangChain Docs: Evaluate Agent Performance / Test (JS/TS) + LangSmith Evaluation Quickstart.** Rotina de testes e avaliação contínua com trajectories, integração com Vitest ou Jest e a função evaluate, e conceitos de dataset, target function e evaluators. Relaciona-se com [11 · Monitoramento com Langfuse e evaluation tests](./11-langfuse-e-evaluation.md). https://docs.langchain.com/oss/javascript/langchain/evals

---

*Guia gerado a partir da apostila oficial (108 págs) e das indicações de leitura da disciplina.*
