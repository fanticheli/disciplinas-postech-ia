# 🧩 Arquitetura de Sistemas com IA: Guia de Leitura

> Resumo organizado da **Disciplina 08** da pós de Engenharia de IA Aplicada (autoria: **José Ahirton Batista Lopes Filho**, o Prof. Ahirton Lopes).
> Cada assunto é explicado em **duas camadas**: 👵 *para a vovó* (analogias do mundo real) e 🔧 *tecnicamente* (nível sênior), e fecha com o que há **no código do repositório do curso** (canvases, protótipos em JavaScript e Python, trilhas de auditoria e atividades).

---

## 🗺️ Como usar este guia

Cada arquivo é auto-contido e segue sempre a mesma estrutura:

| Seção | Para quê serve |
|-------|----------------|
| 🎯 **Em uma frase** | O conceito destilado |
| 👵 **Explicando para a vovó** | Analogia do mundo real, sem jargão |
| 🔧 **Tecnicamente** | O que é, como funciona, onde aplicar, vantagens e limites, armadilhas |
| 🧩 **Cola rápida** | Glossário dos termos-chave |
| 💻 **No código do repo** | Fluxo por arquivo, como rodar e achados reais no código (inconsistências, dependências faltando) |
| 🔗 **Para ir além** | Links de referência retirados das indicações de leitura e do repositório |

A apostila chama os cinco blocos de *Unidades*; os slides e o repositório os chamam de *Módulos 1 a 5*. Este guia usa **Módulo**.

---

## 🧭 Trilha de leitura sugerida

A disciplina é uma só história: o **Trial Forge**, plataforma de agentes da Vitalis Pharma que gera documentos de estudos clínicos regulatórios (ICF, protocolo, CSR). Cada módulo amplia a arquitetura anterior, de um agente único até uma plataforma enterprise, sempre ao redor do mesmo diagrama de referência: Gateway, Orquestrador, Modelo + Tools/RAG, Approval Gate e uma banda de observabilidade.

### Bloco 1 · Fundamentos de Arquitetura AI-First
- [00 · AI-First: o modelo é só um componente, os 5 pilares e o diagrama de referência](./00-ai-first-pilares-e-diagrama-de-referencia.md)
- [01 · Agente ou regra? O framework das três perguntas e o orçamento de trade-offs](./01-framework-de-decisao-e-trade-offs.md)

### Bloco 2 · Arquiteturas Single-Agent
- [02 · Anatomia do agente único: memória, planejamento, ferramentas e ação](./02-anatomia-do-agente-unico.md)
- [03 · ReAct e Reflection: raciocinar e agir em loop, depois criticar o que foi produzido](./03-react-e-reflection.md)
- [04 · Ferramentas tipadas, MCP e a calibragem do agente completo](./04-ferramentas-mcp-e-calibragem-do-agente.md)

### Bloco 3 · Arquiteturas Multi-Agent
- [05 · Por que múltiplos agentes: especialização, custo de coordenação e agente não é ferramenta](./05-por-que-multiplos-agentes.md)
- [06 · Seis padrões de orquestração: Sequential, Parallel, Supervisor, Hierarchical, Group Chat e Handoff](./06-seis-padroes-de-orquestracao.md)
- [07 · Falhas distribuídas: CAP, timeout, retry, idempotência, Saga e a fila de mensagens](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md)

### Bloco 4 · Padrões de Design AI-Específicos
- [08 · RAG como padrão de arquitetura: Basic RAG, Hybrid Search, Multi-Index e Agentic RAG](./08-rag-basic-hybrid-multi-index-agentic.md)
- [09 · Roteamento, cache semântico, prompt cache e response streaming](./09-roteamento-cache-e-streaming.md)
- [10 · Approval Gate formalizado: interrupção, limiar de confiança e trilha de auditoria](./10-approval-gate-confidence-threshold-e-audit-trail.md)
- [11 · O gateway integrado: a ordem dos padrões importa](./11-gateway-integrado.md)

### Bloco 5 · Arquitetura Enterprise
- [12 · Do fluxo à plataforma: stack enterprise, três princípios e o Eval Gate](./12-stack-enterprise-principios-e-eval-gate.md)
- [13 · Observabilidade de IA em escala e implantação híbrida: Kubernetes, Serverless e Edge](./13-observabilidade-e-implantacao-hibrida.md)
- [14 · Model Cascading e orçamento por tenant: a arquitetura completa e o critério final](./14-model-cascading-e-orcamento-por-tenant.md)

### Lives complementares
- [15 · Live Temporal: Process Manager, paralelismo e retry com workflows duráveis](./15-live-temporal-process-manager.md) (live de 26/09)

---

## ✅ Cobertura aula a aula (Disciplina 08)

| Aula da apostila | Documento |
|------------------|-----------|
| Introdução da disciplina, mapa da disciplina, mapa do GitHub e 'Como usar este material' | [00 · AI-First: o modelo é só um componente, os 5 pilares e o diagrama de referência](./00-ai-first-pilares-e-diagrama-de-referencia.md). Resumo do case Trial Forge, dos cinco módulos e do mapa do GitHub em D8-00 e neste README |
| **Módulo 1 · Aula 1** · Fundamentos de Arquitetura AI-First (PT-1): não determinismo, cinco pilares | [00 · AI-First: o modelo é só um componente, os 5 pilares e o diagrama de referência](./00-ai-first-pilares-e-diagrama-de-referencia.md) |
| **Módulo 1 · Aula 2** · (PT-2): do princípio ao componente, diagrama de referência, AI Architecture Canvas | [00 · AI-First: o modelo é só um componente, os 5 pilares e o diagrama de referência](./00-ai-first-pilares-e-diagrama-de-referencia.md) |
| **Módulo 1 · Aula 3** · (PT-3): framework de três perguntas, casos-limite, tarefas híbridas | [01 · Agente ou regra? O framework das três perguntas e o orçamento de trade-offs](./01-framework-de-decisao-e-trade-offs.md) |
| **Módulo 1 · Aula 4** · (PT-4): trade-offs de latência, custo, precisão e performance; orçamento por componente | [01 · Agente ou regra? O framework das três perguntas e o orçamento de trade-offs](./01-framework-de-decisao-e-trade-offs.md) |
| **Módulo 2 · Aula 1** · Arquiteturas Single-Agent (PT-1): memória, planejamento, ferramentas e ação | [02 · Anatomia do agente único: memória, planejamento, ferramentas e ação](./02-anatomia-do-agente-unico.md) |
| **Módulo 2 · Aula 2** · (PT-2): loop ReAct, loops variáveis, riscos e contenção | [03 · ReAct e Reflection: raciocinar e agir em loop, depois criticar o que foi produzido](./03-react-e-reflection.md) |
| **Módulo 2 · Aula 3** · (PT-3): padrão Reflection, níveis de reflexão, limites | [03 · ReAct e Reflection: raciocinar e agir em loop, depois criticar o que foi produzido](./03-react-e-reflection.md) |
| **Módulo 2 · Aula 4** · (PT-4): tool calling, esquemas tipados, leitura e escrita, MCP | [04 · Ferramentas tipadas, MCP e a calibragem do agente completo](./04-ferramentas-mcp-e-calibragem-do-agente.md) |
| **Módulo 2 · Aula 5** · (PT-5): calibragem do agente, blueprint, critérios de parada, implementação | [04 · Ferramentas tipadas, MCP e a calibragem do agente completo](./04-ferramentas-mcp-e-calibragem-do-agente.md) |
| **Módulo 3 · Aula 1** · Arquiteturas Multi-Agent (PT-1): quando um agente não basta, agente versus ferramenta, A2A | [05 · Por que múltiplos agentes: especialização, custo de coordenação e agente não é ferramenta](./05-por-que-multiplos-agentes.md) |
| **Módulo 3 · Aula 2** · (PT-2): Sequential, Parallel e Supervisor | [06 · Seis padrões de orquestração: Sequential, Parallel, Supervisor, Hierarchical, Group Chat e Handoff](./06-seis-padroes-de-orquestracao.md) |
| **Módulo 3 · Aula 3** · (PT-3): Hierarchical, Group Chat e Handoff, seletor de padrões | [06 · Seis padrões de orquestração: Sequential, Parallel, Supervisor, Hierarchical, Group Chat e Handoff](./06-seis-padroes-de-orquestracao.md) |
| **Módulo 3 · Aula 4** · (PT-4): CAP, timeout, retry, idempotência, Saga, controle otimista de versão | [07 · Falhas distribuídas: CAP, timeout, retry, idempotência, Saga e a fila de mensagens](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md) |
| **Módulo 3 · Aula 5** · (PT-5): protótipo integrado, eventos assíncronos, falhas parciais | [07 · Falhas distribuídas: CAP, timeout, retry, idempotência, Saga e a fila de mensagens](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md) |
| **Módulo 4 · Aula 1** · Padrões de Design AI-Específicos (PT-1): Basic RAG e limites; Hybrid, Multi-Index e Agentic RAG | [08 · RAG como padrão de arquitetura: Basic RAG, Hybrid Search, Multi-Index e Agentic RAG](./08-rag-basic-hybrid-multi-index-agentic.md) |
| **Módulo 4 · Aula 2** · (PT-2): Model Router e Intent-Based Routing | [09 · Roteamento, cache semântico, prompt cache e response streaming](./09-roteamento-cache-e-streaming.md) |
| **Módulo 4 · Aula 3** · (PT-3): Semantic Cache, Prompt Cache e Response Streaming | [09 · Roteamento, cache semântico, prompt cache e response streaming](./09-roteamento-cache-e-streaming.md) |
| **Módulo 4 · Aula 4** · (PT-4): Approval Gate formal, Confidence Threshold, Audit Trail | [10 · Approval Gate formalizado: interrupção, limiar de confiança e trilha de auditoria](./10-approval-gate-confidence-threshold-e-audit-trail.md) |
| **Módulo 4 · Aula 5** · (PT-5): gateway integrado e a ordem dos padrões | [11 · O gateway integrado: a ordem dos padrões importa](./11-gateway-integrado.md) |
| **Módulo 5 · Aula 1** · Arquitetura Enterprise (PT-1): stack, serviços compartilhados, KServe, Eval Gate, três princípios | [12 · Do fluxo à plataforma: stack enterprise, três princípios e o Eval Gate](./12-stack-enterprise-principios-e-eval-gate.md) |
| **Módulo 5 · Aula 2** · (PT-2): observabilidade de IA, prompt como código, deriva de qualidade | [13 · Observabilidade de IA em escala e implantação híbrida: Kubernetes, Serverless e Edge](./13-observabilidade-e-implantacao-hibrida.md) |
| **Módulo 5 · Aula 3** · (PT-3): Kubernetes, Serverless, Edge e implantação híbrida | [13 · Observabilidade de IA em escala e implantação híbrida: Kubernetes, Serverless e Edge](./13-observabilidade-e-implantacao-hibrida.md) |
| **Módulo 5 · Aula 4** · (PT-4): Model Cascading, orçamento por tenant, bloquear antes de gastar | [14 · Model Cascading e orçamento por tenant: a arquitetura completa e o critério final](./14-model-cascading-e-orcamento-por-tenant.md) |
| Revisões das Unidades 1 a 5 (fluxo visual e checklist) e Revisão final da disciplina | [14 · Model Cascading e orçamento por tenant: a arquitetura completa e o critério final](./14-model-cascading-e-orcamento-por-tenant.md). Seção 'Mentalidade da disciplina' deste README e fechamento de D8-14 |
| Anexo A · GitHub da disciplina | [14 · Model Cascading e orçamento por tenant: a arquitetura completa e o critério final](./14-model-cascading-e-orcamento-por-tenant.md). Seção 'Materiais oficiais' deste README |
| **Live 26/09/2026** · Temporal Process Manager Workshop (Process Manager, paralelismo e retry) | [15 · Live Temporal: Process Manager, paralelismo e retry com workflows duráveis](./15-live-temporal-process-manager.md) |

> A apostila tem 23 aulas (U1 com 4, U2 com 5, U3 com 5, U4 com 5 e U5 com 4), a introdução, as cinco revisões de unidade e a revisão final; tudo está coberto em 15 documentos. A live de 26/09 entra como o documento 15 e não conta entre as aulas da apostila. Os slides dos módulos 1 a 5 (22 PDFs) foram usados para complementar, principalmente em Hybrid Search, Multi-Index e Agentic RAG (que a apostila só menciona), nos números de mercado e nos exemplos de código.

---

## 🧪 Código do repositório absorvido

O módulo 08 do repositório tem cinco pastas (`modulo-01-fundamentos-ai-first` a `modulo-05-arquitetura-enterprise`). Não há pares template/-z nesta disciplina: cada pasta tem canvases, protótipos em **JavaScript** (versão oficial da ementa) e **Python** (espelho de referência), dados de referência e a atividade prática com um exemplo resolvido.

| Arquivo(s) no repositório | Onde está neste guia |
|---------------------------|----------------------|
| modulo-01 · `ai-first-architecture-canvas.md` (Módulo 1.1) | [00 · AI-First: o modelo é só um componente, os 5 pilares e o diagrama de referência](./00-ai-first-pilares-e-diagrama-de-referencia.md) |
| modulo-01 · `reference-architecture-canvas.md` (Módulo 1.2, Mermaid) | [00 · AI-First: o modelo é só um componente, os 5 pilares e o diagrama de referência](./00-ai-first-pilares-e-diagrama-de-referencia.md) |
| modulo-01 · `AI-Architecture-Decision-Canvas.pdf` e `...-Preenchido-TrialForge.pdf` | [00 · AI-First: o modelo é só um componente, os 5 pilares e o diagrama de referência](./00-ai-first-pilares-e-diagrama-de-referencia.md) |
| modulo-01 · `cheat-sheet-arquiteturas-referencia-clouds.pdf` e `.png` | [00 · AI-First: o modelo é só um componente, os 5 pilares e o diagrama de referência](./00-ai-first-pilares-e-diagrama-de-referencia.md) |
| modulo-01 · `decision-framework-checklist.md` | [01 · Agente ou regra? O framework das três perguntas e o orçamento de trade-offs](./01-framework-de-decisao-e-trade-offs.md) |
| modulo-01 · `decision-framework-tool.js` e `decision_framework_tool.py` | [01 · Agente ou regra? O framework das três perguntas e o orçamento de trade-offs](./01-framework-de-decisao-e-trade-offs.md) |
| modulo-01 · `Atividade 1 - Módulo 1.pdf` e `Exemplo - Módulo 1.pdf` | [01 · Agente ou regra? O framework das três perguntas e o orçamento de trade-offs](./01-framework-de-decisao-e-trade-offs.md) |
| modulo-02 · `agent-anatomy-canvas.md`, `agent-components-demo.js` e `.py` | [02 · Anatomia do agente único: memória, planejamento, ferramentas e ação](./02-anatomia-do-agente-unico.md) |
| modulo-02 · `react-loop-canvas.md` e `reflection-prompt-canvas.md` | [03 · ReAct e Reflection: raciocinar e agir em loop, depois criticar o que foi produzido](./03-react-e-reflection.md) |
| modulo-02 · `react-agent-prototype.js` e `.py` | [04 · Ferramentas tipadas, MCP e a calibragem do agente completo](./04-ferramentas-mcp-e-calibragem-do-agente.md) |
| modulo-02 · `provedores-pagos.js` e `provedores_pagos.py` | [04 · Ferramentas tipadas, MCP e a calibragem do agente completo](./04-ferramentas-mcp-e-calibragem-do-agente.md) |
| modulo-02 · `tool-schema-canvas.md` e `prototype-blueprint-canvas.md` | [04 · Ferramentas tipadas, MCP e a calibragem do agente completo](./04-ferramentas-mcp-e-calibragem-do-agente.md) |
| modulo-02 · `package.json` e `Atividade 2` / `Exemplo - Módulo 2` (PDF) | [04 · Ferramentas tipadas, MCP e a calibragem do agente completo](./04-ferramentas-mcp-e-calibragem-do-agente.md) |
| modulo-03 · `multi-agent-boundary-canvas.md` | [05 · Por que múltiplos agentes: especialização, custo de coordenação e agente não é ferramenta](./05-por-que-multiplos-agentes.md) |
| modulo-03 · `orchestration-pattern-selector.md` e `-v2.md` | [06 · Seis padrões de orquestração: Sequential, Parallel, Supervisor, Hierarchical, Group Chat e Handoff](./06-seis-padroes-de-orquestracao.md) |
| modulo-03 · `trialforge-message-queue-prototype.js` e `trialforge_message_queue_prototype.py` | [07 · Falhas distribuídas: CAP, timeout, retry, idempotência, Saga e a fila de mensagens](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md) |
| modulo-03 · `distributed-failure-canvas.md` e `message-queue-canvas.md` | [07 · Falhas distribuídas: CAP, timeout, retry, idempotência, Saga e a fila de mensagens](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md) |
| modulo-03 · `Atividade 3` / `Exemplo - Módulo 3` (PDF) | [07 · Falhas distribuídas: CAP, timeout, retry, idempotência, Saga e a fila de mensagens](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md) |
| modulo-04 · `rag-pattern-selector-canvas.md` (e a camada de RAG do gateway) | [08 · RAG como padrão de arquitetura: Basic RAG, Hybrid Search, Multi-Index e Agentic RAG](./08-rag-basic-hybrid-multi-index-agentic.md) |
| modulo-04 · `routing-decision-canvas.md` e `cache-streaming-decision-canvas.md` (e roteamento, cache e streaming do gateway) | [09 · Roteamento, cache semântico, prompt cache e response streaming](./09-roteamento-cache-e-streaming.md) |
| modulo-04 · `hitl-formalization-canvas.md` e `audit-trail.jsonl` (e gate e auditoria do gateway) | [10 · Approval Gate formalizado: interrupção, limiar de confiança e trilha de auditoria](./10-approval-gate-confidence-threshold-e-audit-trail.md) |
| modulo-04 · `trialforge-gateway-prototype.js` e `trialforge_gateway_prototype.py` (gateway integrado) | [11 · O gateway integrado: a ordem dos padrões importa](./11-gateway-integrado.md) |
| modulo-04 · `gateway-blueprint-canvas.md`, `package.json` e `Atividade 4` / `Exemplo - Módulo 4` (PDF) | [11 · O gateway integrado: a ordem dos padrões importa](./11-gateway-integrado.md) |
| modulo-05 · `enterprise-stack-canvas.md` | [12 · Do fluxo à plataforma: stack enterprise, três princípios e o Eval Gate](./12-stack-enterprise-principios-e-eval-gate.md) |
| modulo-05 · `model-eval-gate-prototype.js` e `model_eval_gate_prototype.py` | [12 · Do fluxo à plataforma: stack enterprise, três princípios e o Eval Gate](./12-stack-enterprise-principios-e-eval-gate.md) |
| modulo-05 · `observability-signals-canvas.md` e `deployment-decision-canvas.md` | [13 · Observabilidade de IA em escala e implantação híbrida: Kubernetes, Serverless e Edge](./13-observabilidade-e-implantacao-hibrida.md) |
| modulo-05 · `manipulation-guardrail-prototype.js` e `manipulation_guardrail_prototype.py` | [13 · Observabilidade de IA em escala e implantação híbrida: Kubernetes, Serverless e Edge](./13-observabilidade-e-implantacao-hibrida.md) |
| modulo-05 · `model-tiering-cascade-canvas.md` | [14 · Model Cascading e orçamento por tenant: a arquitetura completa e o critério final](./14-model-cascading-e-orcamento-por-tenant.md) |
| modulo-05 · `trialforge-model-tiering-prototype.js` e `trialforge_model_tiering_prototype.py` | [14 · Model Cascading e orçamento por tenant: a arquitetura completa e o critério final](./14-model-cascading-e-orcamento-por-tenant.md) |
| modulo-05 · `audit-trail-tiering.jsonl`, `package.json` e `Atividade 5` / `Exemplo - Módulo 5` (PDF) | [14 · Model Cascading e orçamento por tenant: a arquitetura completa e o critério final](./14-model-cascading-e-orcamento-por-tenant.md) |
| raiz da disciplina · `README.md` (stack central, local versus pago) e `.gitignore` | README deste guia (seção Pré-requisitos) e [00 · AI-First: o modelo é só um componente, os 5 pilares e o diagrama de referência](./00-ai-first-pilares-e-diagrama-de-referencia.md) |
| lives/2026-09-26 · monorepo pnpm `process-manager`, `inventory`, `billing`, `shipping`, `packages/*`, `compose.yaml`, `CONTEXT.md`, `AGENTS.md` e `scripts/` | [15 · Live Temporal: Process Manager, paralelismo e retry com workflows duráveis](./15-live-temporal-process-manager.md) |

### Pré-requisitos para rodar

- **Módulos 1 e 3:** sem dependência. `node decision-framework-tool.js` e `node trialforge-message-queue-prototype.js` (ou os `.py`) rodam direto. Verifiquei os dois no Node 20 e no Python: os testes passam.
- **Módulos 2, 4 e 5:** precisam do [Ollama](https://ollama.com/) rodando local e do pacote `ollama` (`npm install` na pasta; `pip install ollama` no Python). Modelos: `gemma4:e2b` (cerca de 7,2 GB), `gemma4` (cerca de 9,6 GB, módulos 4.5 e 5.4) e `nomic-embed-text` (embeddings, módulos 4.5, 5.1 e 5.4). O Eval Gate do módulo 5 usa também `gemma4:e2b-mlx`, que o README do repositório não lista.
- **Trade-off local versus pago (README do repo):** Ollama local custa zero, o dado não sai da máquina e não há rate limit, mas a qualidade é mais limitada e exige disco e RAM; provedores pagos (Claude, Gemini, GPT) têm modelo de fronteira, custo por token e dado enviado à API. É decisão de **prototipagem**, não de produção: numa arquitetura enterprise provavelmente pesaria um provedor gerenciado.
- Não executei os protótipos que dependem de Ollama nesta pesquisa; o que digo sobre eles vem da leitura do código e dos logs de referência.

### Achados consolidados no repositório

- Textos do módulo 2 citam uma pasta `demos/` que não existe; os arquivos estão em `modulo-02-single-agent/` ([02](./02-anatomia-do-agente-unico.md), [04](./04-ferramentas-mcp-e-calibragem-do-agente.md)).
- `provedores-pagos.js` importa as três SDKs pagas no topo e nenhuma está no `package.json` ([04](./04-ferramentas-mcp-e-calibragem-do-agente.md)).
- O protótipo do módulo 3 só emite um evento (`protocolo:pronto`) e não implementa Hierarchical, Group Chat, Handoff nem o Agente Bioética; o canvas e o slide de calibração divergem do código nos retries ([07](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md)).
- O `audit-trail.jsonl` do módulo 4 é o log de referência *e* o arquivo em que o protótipo escreve; a trilha real grava menos campos que o checklist do próprio canvas (sem versão de prompt, sem quem aprovou, limiar só em texto) ([10](./10-approval-gate-confidence-threshold-e-audit-trail.md)).
- O cache semântico do módulo 4 é global, sem tenant e sem invalidação; o Prompt Cache não é demonstrado ([09](./09-roteamento-cache-e-streaming.md)).
- A Atividade 4 traz 0,643 onde os demais materiais trazem 0,633 e pede quatro casos onde o blueprint e o slide falam em cinco ([11](./11-gateway-integrado.md)).
- O slide 2.5 e o Passo 2 do `Exemplo - Módulo 2.pdf` mencionam reflexão no agente único, mas apostila, código e o Passo 1 do exemplo dizem que ela não existe ([04](./04-ferramentas-mcp-e-calibragem-do-agente.md)).
- O `Exemplo - Módulo 5.pdf` descreve uma versão anterior do protótipo (Tier 1 `gemma4:e2b-mlx` e um único sinal de confiança); o código atual usa dois sinais ([14](./14-model-cascading-e-orcamento-por-tenant.md)).
- O Eval Gate só imprime a decisão (sai com código 0 mesmo quando bloqueia) e o guardrail sai com `exitCode = 1` se os três casos falharem, mas é fail-open; nenhum dos dois tem `assert` nem integração com CI ([12](./12-stack-enterprise-principios-e-eval-gate.md), [13](./13-observabilidade-e-implantacao-hibrida.md)).
- A apostila grafa 'LightLLM' onde o resto do material (e o projeto real) é LiteLLM ([12](./12-stack-enterprise-principios-e-eval-gate.md)).
- A Atividade 1 manda comparar com `Exemplo - Módulo 1.docx`, mas o repositório entrega o PDF (o `.gitignore` do módulo exclui `*.docx`).
- O README do módulo (Python sem `requirements.txt`, `gemma4:e2b-mlx` não listado) está resumido nos pré-requisitos acima.
- A live de 26/09 entrega o esqueleto do workshop: controller, service, activities e workflow estão vazios, falta o `.nvmrc` citado no README e o `nestjs-temporal-core` 3.4.0 declara peer de NestJS até a 11 enquanto o projeto usa a 12 ([15](./15-live-temporal-process-manager.md)).

---

## 🎓 Mentalidade da disciplina

A introdução e a revisão final da apostila resumem o fio condutor:

- **O modelo é um componente, não o sistema.** O diferencial é a arquitetura em volta: gateway, orquestração, recuperação de contexto, aprovação humana, observabilidade, trilha de auditoria, controle de custo e degradação graciosa ([00](./00-ai-first-pilares-e-diagrama-de-referencia.md)).
- **Decida com perguntas objetivas**, por subtarefa, e dê a cada componente um orçamento de latência, custo, precisão e performance ([01](./01-framework-de-decisao-e-trade-offs.md)).
- **Um agente é calibrado, não maximizado:** memória, planejamento, ferramentas e ação no nível que a tarefa exige, com critério de parada explícito ([02](./02-anatomia-do-agente-unico.md), [03](./03-react-e-reflection.md), [04](./04-ferramentas-mcp-e-calibragem-do-agente.md)).
- **Dividir custa:** múltiplos agentes só quando vocabulário, ferramentas ou risco divergem, e então compor padrões de orquestração e assumir que falhas acontecem ([05](./05-por-que-multiplos-agentes.md), [06](./06-seis-padroes-de-orquestracao.md), [07](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md)).
- **Padrões de IA têm ordem:** intenção, cache, roteador, RAG, streaming, limiar, gate e trilha, com a verificação mais barata e que mais encerra antes da cara ([08](./08-rag-basic-hybrid-multi-index-agentic.md) a [11](./11-gateway-integrado.md)).
- **Enterprise é multiplicar, não substituir:** serviços compartilhados, observabilidade de qualidade, implantação por componente e cascata de modelos com orçamento por tenant ([12](./12-stack-enterprise-principios-e-eval-gate.md) a [14](./14-model-cascading-e-orcamento-por-tenant.md)).

Perguntas que o professor quer que você consiga responder ao fim: quando usar um agente? quando manter uma regra determinística? quando dividir entre especialistas? quando executar em paralelo? quando pausar para aprovação? quando reutilizar uma resposta? quando escolher um modelo mais caro? quando bloquear uma requisição antes que ultrapasse o orçamento?

---

## 🧰 Materiais oficiais da disciplina

- **Repositório de código:** https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia
- **Pastas do módulo:** [modulo-01-fundamentos-ai-first](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-01-fundamentos-ai-first), [modulo-02-single-agent](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-02-single-agent), [modulo-03-multi-agent](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-03-multi-agent), [modulo-04-padroes-ai-especificos](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-04-padroes-ai-especificos), [modulo-05-arquitetura-enterprise](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-05-arquitetura-enterprise)
- **Linguagens:** Node.js (CommonJS) e Python, com paridade funcional; modelos locais via Ollama (`gemma4:e2b`, `gemma4`, `nomic-embed-text`)
- **Material do aluno:** apostila oficial (113 páginas), indicações de leitura (20 páginas) e slides dos módulos 1 a 5
- **Live 26/09/2026 (TypeScript, Temporal):** https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-09-26

### Indicações de leitura complementar

O PDF de indicações tem três blocos: referências científicas, relatórios de mercado e documentação de provedores, e vídeos. Todos os links abaixo vêm do próprio PDF.

#### Referências científicas e acadêmicas

| Referência | Resumo | Tópico |
|------------|--------|--------|
| [Yao et al. · ReAct: Synergizing Reasoning and Acting in Language Models (ICLR 2023)](https://arxiv.org/abs/2210.03629) | Loop Pensamento-Ação-Observação, base do agente do Trial Forge. | [03](./03-react-e-reflection.md) |
| [Shinn et al. · Reflexion: Language Agents with Verbal Reinforcement Learning (NeurIPS 2023)](https://arxiv.org/abs/2303.11366) | Autocrítica verbal sem re-treinamento, base do protótipo de reflexão. | [03](./03-react-e-reflection.md) |
| [Wang et al. · InformGen: An AI Copilot for Accurate and Compliant Clinical Research Consent Document Generation (arXiv 2504.00934, 2025)](https://arxiv.org/abs/2504.00934) | Copiloto que gera TCLE a partir do protocolo com RAG e avaliação de compliance; mesmo problema do case, como pesquisa publicada. | [03](./03-react-e-reflection.md) |
| [Brewer · Towards Robust Distributed Systems (PODC 2000)](https://people.eecs.berkeley.edu/~brewer/cs262b-2004/PODC-keynote.pdf) | Teorema CAP, base para decidir como agentes reagem a falha de nó. | [07](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md) |
| [Gilbert e Lynch · Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services (SIGACT News 2002)](https://www.comp.nus.edu.sg/~gilbert/pubs/BrewersConjecture-SigAct.pdf) | Demonstração formal do CAP. | [07](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md) |
| [Garcia-Molina e Salem · Sagas (SIGMOD 1987)](http://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf) | Transações locais com compensação explícita. | [07](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md) |
| [Chang e Geng · SagaLLM (arXiv 2503.11951, 2025)](https://arxiv.org/abs/2503.11951) | Estende a Saga a planejamento multiagente de LLMs: contexto, validação e garantias transacionais. | [07](./07-falhas-distribuidas-cap-saga-e-fila-de-mensagens.md) |
| [Lewis et al. · Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (NeurIPS 2020)](https://arxiv.org/abs/2005.11401) | Paper seminal do RAG. | [08](./08-rag-basic-hybrid-multi-index-agentic.md) |
| [Cormack, Clarke, Büttcher · Reciprocal Rank Fusion (SIGIR 2009)](https://research.google/pubs/reciprocal-rank-fusion-outperforms-condorcet-and-individual-rank-learning-methods/) | Fusão por posição supera métodos mais sofisticados; base da busca híbrida. | [08](./08-rag-basic-hybrid-multi-index-agentic.md) |
| [Jiang et al. · Active Retrieval Augmented Generation (FLARE, 2023)](https://arxiv.org/abs/2305.06983) | Busca iterativa decidida a cada passo. | [08](./08-rag-basic-hybrid-multi-index-agentic.md) |
| [Asai et al. · Self-RAG (ICLR 2024)](https://arxiv.org/abs/2310.11511) | Recuperar, gerar e criticar com autoavaliação. | [08](./08-rag-basic-hybrid-multi-index-agentic.md) |
| [Singh et al. · Agentic Retrieval-Augmented Generation: A Survey (arXiv 2501.09136, 2025)](https://arxiv.org/abs/2501.09136) | Consolida o termo Agentic RAG: o agente decide quando, onde e quantas vezes buscar. | [08](./08-rag-basic-hybrid-multi-index-agentic.md) |
| [RouteLLM: Learning to Route LLMs with Preference Data (ICLR 2025)](https://arxiv.org/abs/2406.18665) | Roteamento aprendido entre modelo caro e barato. | [09](./09-roteamento-cache-e-streaming.md) |
| [GPTCache (Fu Bang, Zilliz; NLP-OSS 2023)](https://aclanthology.org/2023.nlposs-1.24/) | Cache semântico de código aberto para LLMs. | [09](./09-roteamento-cache-e-streaming.md) |
| [Prompt Cache: Modular Attention Reuse for Low-Latency Inference (Yale e Google, MLSys 2024)](https://arxiv.org/abs/2311.04934) | Reuso do estado de atenção de partes reutilizáveis do prompt. | [09](./09-roteamento-cache-e-streaming.md) |
| [Madras, Pitassi, Zemel · Predict Responsibly: Improving Fairness and Accuracy by Learning to Defer (NeurIPS 2018)](https://arxiv.org/abs/1711.06664) | Quando um sistema deve adiar a decisão a um humano; base do limiar de confiança e do Approval Gate. | [10](./10-approval-gate-confidence-threshold-e-audit-trail.md) |
| [Stevens, Myers, Constantine · Structured Design (IBM Systems Journal, 1974)](https://dl.acm.org/doi/10.1147/sj.132.0115) | Acoplamento e coesão, base do desacoplamento em escala. | [12](./12-stack-enterprise-principios-e-eval-gate.md) |
| [Chen, Zaharia, Zou · estudo sobre variação de acurácia do GPT-4 ao longo do tempo (2023) e How Is ChatGPT's Behavior Changing over Time? (arXiv 2307.09009)](https://arxiv.org/abs/2307.09009) | Acurácia na tarefa de números primos de 84% (março) para 51% (junho de 2023): qualidade pode mudar sem sinal de infraestrutura. | [13](./13-observabilidade-e-implantacao-hibrida.md) |
| [Chen, Zaharia, Zou · FrugalGPT (TMLR 2024)](https://arxiv.org/abs/2305.05176) | Cascata de modelos: barato primeiro, escala só se necessário. | [14](./14-model-cascading-e-orcamento-por-tenant.md) |

#### Relatórios de mercado, documentação técnica e normas

| Fonte | Resumo | Tópico |
|-------|--------|--------|
| [RAND · Why AI Projects Fail (PTA2680-1, 2025)](https://www.rand.org/pubs/presentations/PTA2680-1.html) | Mais de 80% dos projetos de IA corporativos não entregam o valor prometido (estimativas de terceiros). | [00](./00-ai-first-pilares-e-diagrama-de-referencia.md) |
| [S&P Global · Voice of the Enterprise: AI & ML (2025)](https://www.spglobal.com/market-intelligence/en/news-insights/research/ai-experiences-rapid-adoption-but-with-mixed-outcomes-highlights-from-vote-ai-machine-learning) | 42% das empresas abandonaram a maioria das iniciativas; 46% dos protótipos descartados em média. | [00](./00-ai-first-pilares-e-diagrama-de-referencia.md) |
| [Gartner · mais de 40% dos projetos de IA agêntica serão cancelados até o fim de 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) | Custo crescente, valor pouco claro ou controle de risco inadequado. | [00](./00-ai-first-pilares-e-diagrama-de-referencia.md) |
| [AWS · Generative AI Lens e Agentic AI Lens (Well-Architected)](https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/) | Referência oficial para a arquitetura Gateway, Orquestrador, Modelo e Gate humano. | [00](./00-ai-first-pilares-e-diagrama-de-referencia.md) |
| [Google Cloud · Reference Architectures for Generative AI with RAG](https://docs.cloud.google.com/architecture/rag-reference-architectures) | Ingestão e Serving como dois subsistemas. | [00](./00-ai-first-pilares-e-diagrama-de-referencia.md) |
| [Microsoft · Baseline Microsoft Foundry Chat Reference Architecture](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/architecture/baseline-microsoft-foundry-chat) | Arquitetura production-ready com identidades gerenciadas e endpoints privados. | [00](./00-ai-first-pilares-e-diagrama-de-referencia.md) |
| [Anthropic · Model Context Protocol (nov. 2024)](https://www.anthropic.com/news/model-context-protocol) | Padrão aberto de ferramentas e contexto. | [04](./04-ferramentas-mcp-e-calibragem-do-agente.md) |
| [Google · Agent2Agent Protocol (abr. 2025)](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/) | Equivalente ao MCP entre agentes; hoje na Linux Foundation. | [05](./05-por-que-multiplos-agentes.md) |
| [Microsoft Research · AutoGen (2023)](https://www.microsoft.com/en-us/research/publication/autogen-enabling-next-gen-llm-applications-via-multi-agent-conversation-framework/) | Origem do padrão Group Chat com GroupChatManager. | [06](./06-seis-padroes-de-orquestracao.md) |
| [OpenAI · Swarm (out. 2024) e Agents SDK (mar. 2025)](https://openai.com/index/new-tools-for-building-agents/) | Origem do padrão Handoff. | [06](./06-seis-padroes-de-orquestracao.md) |
| [Gartner · Multiagent Systems (artigo) e 40% dos apps corporativos com agentes por tarefa até 2026](https://www.gartner.com/en/articles/multiagent-systems) | Alta de 1.445% nas consultas sobre multiagentes; projeção de adoção. | [05](./05-por-que-multiplos-agentes.md) |
| [Lucidworks e Forrester · estudo de caso de busca híbrida B2B](https://lucidworks.com/ebooks/forrester-tei-report) | Retorno de 391% em três anos combinando busca exata e semântica. | [08](./08-rag-basic-hybrid-multi-index-agentic.md) |
| [Salesforce · Fisher & Paykel com Agentforce](https://www.salesforce.com/customer-stories/fisher-and-paykel/) | Atendimento 50% mais rápido; autoatendimento projetado acima de 65%. | [08](./08-rag-basic-hybrid-multi-index-agentic.md) |
| [OpenAI · System Card do GPT-5 (7 ago. 2025)](https://openai.com/index/gpt-5-system-card/) | Roteador em tempo real entre gpt-5-main e gpt-5-thinking. | [09](./09-roteamento-cache-e-streaming.md) |
| [Nielsen · Response Times: The 3 Important Limits (1993)](https://www.nngroup.com/articles/response-times-3-important-limits/) | 0,1 s instantâneo, 1 s mantém o fluxo, 10 s perde a atenção. | [09](./09-roteamento-cache-e-streaming.md) |
| [Walmart Global Tech · Semantic Caching at Scale (2024)](https://portkey.ai/blog/semantic-caching-at-scale-with-walmarts-chief-architect/) | Cerca de 50% de acerto em consultas de cauda longa. | [09](./09-roteamento-cache-e-streaming.md) |
| [AWS · Amazon ElastiCache, benchmark de cache semântico](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/semantic-caching-benchmarks.html) | 63.796 perguntas: no limiar 0,75, acerto 90,3%, precisão 91,2%, até 86% de redução de custo. | [09](./09-roteamento-cache-e-streaming.md) |
| [Anthropic · Prompt Caching (ago. 2024) e OpenAI · Prompt Caching in the API (out. 2024)](https://www.anthropic.com/news/prompt-caching) | Cache de prompt nativo: até 90% de custo e 85% de latência; desconto automático de 50% na OpenAI. | [09](./09-roteamento-cache-e-streaming.md) |
| [FDA · guidance sobre IA em decisões regulatórias de medicamentos (jan. 2025)](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/considerations-use-artificial-intelligence-support-regulatory-decision-making-drug-and-biological) | Framework de risco em sete passos; revisão humana reduz a influência do modelo. | [10](./10-approval-gate-confidence-threshold-e-audit-trail.md) |
| [FDA · 21 CFR Part 11](https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-11) | Trilhas de auditoria seguras, com timestamp, só de acréscimo. | [10](./10-approval-gate-confidence-threshold-e-audit-trail.md) |
| [União Europeia · EU AI Act, Artigo 12](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng) | Registro automático de eventos em sistemas de alto risco. | [10](./10-approval-gate-confidence-threshold-e-audit-trail.md) |
| [LangGraph · interrupt()](https://docs.langchain.com/oss/python/langgraph/interrupts) | Pausa com estado preservado até entrada externa. | [10](./10-approval-gate-confidence-threshold-e-audit-trail.md) |
| [AWS Bedrock Agents · confirmação de ação](https://docs.aws.amazon.com/bedrock/latest/userguide/agents-userconfirmation.html) | Passo CONFIRM ou DENY antes de executar a ação proposta. | [10](./10-approval-gate-confidence-threshold-e-audit-trail.md) |
| [Stripe · Radar, avaliação de risco](https://docs.stripe.com/radar/risk-evaluation) | Pontuação 0-99: acima de 65 revisão manual, acima de 75 alto risco bloqueado por padrão. | [10](./10-approval-gate-confidence-threshold-e-audit-trail.md) |
| [Google Cloud · cold start de IA no Cloud Run (2025)](https://cloud.google.com/blog/topics/developers-practitioners/a-guide-to-ai-cold-starts-on-cloud-run) | Quatro fases do cold start; carregar o modelo é o maior gargalo; quantização como mitigação. | [13](./13-observabilidade-e-implantacao-hibrida.md) |
| [Modal Labs · snapshot de memória de GPU (2025)](https://modal.com/blog/truly-serverless-gpus) | Boot de até 2000 s para cerca de 50 s. | [13](./13-observabilidade-e-implantacao-hibrida.md) |
| [AWS · Bedrock, preço serverless](https://aws.amazon.com/bedrock/pricing/) | Sem gerenciar infraestrutura, cobrança por token. | [13](./13-observabilidade-e-implantacao-hibrida.md) |
| [Cloudflare · Workers AI](https://blog.cloudflare.com/workers-ai-bigger-better-faster/) | GPUs em mais de 180 cidades; 95% da população a menos de 50 ms. | [13](./13-observabilidade-e-implantacao-hibrida.md) |
| [Apple · Apple Intelligence e Private Cloud Compute](https://machinelearning.apple.com/research/introducing-apple-foundation-models) | Modelo de cerca de 3 bilhões de parâmetros no dispositivo; escala para nuvem privada. | [13](./13-observabilidade-e-implantacao-hibrida.md) |
| [Google · Gemini Nano e AICore (Android)](https://developer.android.com/ai/gemini-nano) | Roda no sistema, sem latência de rede, offline. | [13](./13-observabilidade-e-implantacao-hibrida.md) |
| [Kingfisher plc · arquitetura de dados e IA](https://medium.com/kingfisher-technology/ai-at-scale-serverless-or-kubernetes-825e9e177d0c) | Mais de 130 pipelines em Kubeflow serverless; inferência em Kubernetes; serverless cerca de 2x mais caro por vCPU-mês. | [13](./13-observabilidade-e-implantacao-hibrida.md) |
| [DigitalOcean · custo de GPU dedicada versus serverless](https://www.digitalocean.com/community/tutorials/serverless-vs-dedicated-vs-self-hosted-llm-inference-cost) | Acima de 22-48% de utilização constante, GPU própria sai mais barata. | [13](./13-observabilidade-e-implantacao-hibrida.md) |
| [LiteLLM, Cloudflare AI Gateway e Kong AI Gateway](https://github.com/BerriAI/litellm) | Gateway unificado de provedores de modelo com cache, limite de taxa e failover. | [12](./12-stack-enterprise-principios-e-eval-gate.md) |
| [KServe (CNCF) e Kubeflow](https://www.cncf.io/projects/kserve/) | KServe serve modelos com canary por percentual; Kubeflow orquestra o treino. | [12](./12-stack-enterprise-principios-e-eval-gate.md) |
| [Sam Newman · Building Microservices e Thomas Erl · SOA: Principles of Service Design](https://www.oreilly.com/library/view/building-microservices-2nd/9781492034018/) | Loose coupling e contratos explícitos. | [12](./12-stack-enterprise-principios-e-eval-gate.md) |
| [Open Policy Agent (CNCF, graduado em 2021)](https://www.cncf.io/announcements/2021/02/04/cloud-native-computing-foundation-announces-open-policy-agent-graduation/) | Policy-as-code avaliada em tempo de execução. | [12](./12-stack-enterprise-principios-e-eval-gate.md) |
| [Uber · GenAI Gateway (jul. 2024)](https://www.uber.com/us/en/blog/genai-gateway/) | 60+ casos de uso, cerca de 30 times, 16 milhões de consultas por mês, redação de PII. | [12](./12-stack-enterprise-principios-e-eval-gate.md) |
| [PromptLayer, Langfuse e Arize Phoenix](https://www.promptlayer.com/) | Versionamento de prompt com diff e replay; observabilidade open source e self-hosted. | [13](./13-observabilidade-e-implantacao-hibrida.md) |
| [OpenTelemetry · GenAI Semantic Conventions](https://github.com/open-telemetry/semantic-conventions-genai) | Campos padronizados de telemetria para IA generativa. | [13](./13-observabilidade-e-implantacao-hibrida.md) |
| [Google · Site Reliability Engineering, Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/) | Os quatro sinais de ouro. | [13](./13-observabilidade-e-implantacao-hibrida.md) |
| [DPD · incidente do chatbot manipulado (jan. 2024)](https://www.bbc.com/news/technology-68025677) | Chatbot induzido a xingar a empresa com todos os sinais de infraestrutura verdes. | [13](./13-observabilidade-e-implantacao-hibrida.md) |
| [Yuan et al. · DeepSeek-R1 em hospitais da China (medRxiv, 2025)](https://www.medrxiv.org/content/10.1101/2025.05.15.25326843v1.full) | 261 hospitais com implantação local de modelo. | [13](./13-observabilidade-e-implantacao-hibrida.md) |
| [Microsoft Model Router (Azure AI Foundry) e Amazon Bedrock Intelligent Prompt Routing](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-router) | Roteamento entre modelos em produção: modos Balanceado, Custo e Qualidade; economia de até 30% na AWS. | [14](./14-model-cascading-e-orcamento-por-tenant.md) |
| [Anthropic · How We Built Our Multi-Agent Research System (jun. 2025)](https://www.anthropic.com/engineering/multi-agent-research-system) | Multiagente superou agente único em 90,2% a cerca de 15 vezes mais tokens. | [05](./05-por-que-multiplos-agentes.md) |
| [AWS · Multi-agent collaboration (Amazon Bedrock)](https://aws.amazon.com/blogs/machine-learning/amazon-bedrock-announces-general-availability-of-multi-agent-collaboration/) | Modos Supervisor e Supervisor com Roteamento; caso Syngenta. | [06](./06-seis-padroes-de-orquestracao.md) |
| [AWS · Architecting Distributed Agentic AI Workloads across AWS Hybrid Cloud Services (2025)](https://aws.amazon.com/blogs/infrastructure-sustainability/architecting-distributed-agentic-ai-workloads-across-aws-hybrid-cloud-services/) | Decompor a carga e posicionar cada componente na instância mais adequada. | [13](./13-observabilidade-e-implantacao-hibrida.md) |

#### Vídeos

| Vídeo | Resumo | Tópico |
|-------|--------|--------|
| [Beyond the Hype: Architecting Systems with Agentic AI (InfoQ Live, 2 out. 2025, cerca de 1 hora)](https://www.youtube.com/watch?v=wUkYozIu-Yk) | Por que a maioria dos projetos de IA agêntica fica em protótipo; complexidade, não determinismo e guardrails. | [00](./00-ai-first-pilares-e-diagrama-de-referencia.md) |
| [How We Build Effective Agents (Barry Zhang, Anthropic, AI Engineer Summit, 21 fev. 2025)](https://www.youtube.com/watch?v=D7_ipDqhtwk) | Padrões práticos de arquitetura de agente usados na Anthropic; complementa ReAct, Reflexão e Tool-Using. | [02](./02-anatomia-do-agente-unico.md) |
| [Armchair Architects: Multi-agent Orchestration and Patterns (Microsoft, jan. 2026)](https://learn.microsoft.com/en-us/shows/azure-essentials-show/armchair-architects-multi-agent-orchestration-and-patterns) | Padrões de orquestração multiagente em ambiente corporativo. | [06](./06-seis-padroes-de-orquestracao.md) |
| [What is Retrieval-Augmented Generation (RAG)? (Marina Danilevsky, IBM Technology, 2023)](https://www.youtube.com/watch?v=T-D1OfcDW1M) | Nivelamento conceitual de RAG. | [08](./08-rag-basic-hybrid-multi-index-agentic.md) |
| [Armchair Architects: Hybrid and Multi-Cloud Architectures, Observability (Microsoft)](https://learn.microsoft.com/en-us/shows/azure-essentials-show/armchair-architects-hybrid-and-multi-cloud-architectures-observability) | Observabilidade em arquiteturas híbridas e multi-cloud. | [13](./13-observabilidade-e-implantacao-hibrida.md) |

---

*Guia gerado a partir da apostila oficial (113 págs), das indicações de leitura (20 págs), dos slides dos módulos 1 a 5 e do código do módulo 08 do repositório do curso.*
