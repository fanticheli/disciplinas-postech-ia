# 📚 Ferramentas de IA para DevOps — Guia de Leitura

> Resumo organizado da **Disciplina 06** da pós de Engenharia de IA Aplicada (autoria: **Camilla Martins**).
> Cada assunto é explicado em **duas camadas**: 👵 *para a vovó* (analogias do mundo real) e 🔧 *tecnicamente* (nível sênior), e fecha com o que foi feito **no código do projeto Nexus do repositório**.

---

## 🗺️ Como usar este guia

Cada arquivo é auto-contido e segue sempre a mesma estrutura:

| Seção | Para quê serve |
|-------|----------------|
| 🎯 **Em uma frase** | O conceito destilado |
| 👵 **Explicando para a vovó** | Analogia do mundo real, sem jargão |
| 🔧 **Tecnicamente** | O que é, como funciona, onde aplicar, vantagens e limites, armadilhas |
| 🧩 **Cola rápida** | Glossário dos termos-chave |
| 💻 **No código do repo** | Fluxo por arquivo, como rodar e achados reais no código (bugs e inconsistências) |
| 🔗 **Para ir além** | Links de referência |

Convenção: o que vem da **apostila e dos slides** é teoria da professora; o que está em *No código do repo* vem do código lido. Onde não verifiquei algo (não executei os labs nem o cluster), o texto diz «hipótese» ou «não verifiquei».

---

## 🧭 Trilha de leitura sugerida

A ordem segue a apostila: do fundamento (LLM, agente, RAG) à operação (IaC, Kubernetes, troubleshooting, observabilidade, ChatOps), depois segurança, entrega, custo e auto-remediação, o projeto integrador e, por fim, a execução próxima de produção com Docker, Kubernetes, LocalStack, Streamlit e Ollama.

### Bloco 1 — Fundamentos e Infraestrutura como Código
- [00 · Da automação à inteligência agêntica: LLMs, agentes CrewAI, RAG e o Nexus Foundation](./00-ai-for-devops-agents-and-nexus-foundation.md)
- [01 · IaC Copilot: Arquiteto e Auditor com Checkov e OPA](./01-iac-copilot-terraform-checkov-opa.md)

### Bloco 2 — Kubernetes e Troubleshooting
- [02 · Agentes para Kubernetes: manifestos, reconciliação e Canary](./02-kubernetes-ai-ops-canary-gitops.md)
- [03 · Troubleshooting com ReAct: reduzindo o MTTR com Prometheus, Jaeger e eventos do K8s](./03-troubleshooting-react-mttr.md)

### Bloco 3 — Observabilidade, ChatOps e Segurança
- [04 · AIOps e observabilidade preditiva: NL2Q, alerta antes da queda e dashboards dinâmicos](./04-predictive-aiops-nl2q-dashboards.md)
- [05 · ChatOps com governança: RBAC, IAM e Human-in-the-Loop](./05-chatops-governance-hitl.md)
- [06 · DevSecOps com IA: triagem de vulnerabilidades, CVE-2024-3094 e Compliance as Code](./06-devsecops-vulnerability-triage.md)

### Bloco 4 — Entrega, Custo e Auto-remediação
- [07 · CI/CD Copilot: cache, multi-stage build, Canary e rollback automático](./07-cicd-copilot-cache-multistage.md)
- [08 · FinOps com IA: recursos zumbis, rightsizing, Spot e relatório de economia](./08-finops-zombie-resources-rightsizing.md)
- [09 · Auto-remediação segura: RAG de runbooks, postmortem automático, guardrails e dry-run](./09-runbook-rag-self-healing-guardrails.md)

### Bloco 5 — Projeto Integrador
- [10 · Projeto integrador: orquestração hierárquica, Game Day e ROI](./10-multi-agent-hierarchy-final-project.md)

### Bloco 6 — Do Terminal ao Escalável
- [11 · Dockerização: o artefato de IA imutável](./11-docker-immutable-ai-artifact.md)
- [12 · Kubernetes local com Minikube: componentes, escala, Secrets e Jobs](./12-kubernetes-local-minikube.md)
- [13 · Cloud simulada e interface: LocalStack e Streamlit dentro do Kubernetes](./13-localstack-streamlit-on-kubernetes.md)
- [14 · IA offline com Ollama no Kubernetes (e um passeio pelo dashboard do Minikube)](./14-offline-ai-ollama-on-kubernetes.md)
- [15 · O que podemos fazer com IA em DevOps: tendências, carreira e revisão final](./15-what-can-we-do-with-ai-in-devops.md)

---

## ✅ Cobertura módulo a módulo (Disciplina 06)

| Unidade · Aula da apostila | Documento |
|----------------------------|-----------|
| **Introdução da disciplina**, mapa e como estudar | Este README |
| **U1 · Aula 1** · Da Automação à Inteligência Agêntica (PT-1) | [00 · Da automação à inteligência agêntica: LLMs, agentes CrewAI, RAG e o Nexus Foundation](./00-ai-for-devops-agents-and-nexus-foundation.md) |
| **U1 · Aula 2** · Da Automação à Inteligência Agêntica (PT-2) | [00 · Da automação à inteligência agêntica: LLMs, agentes CrewAI, RAG e o Nexus Foundation](./00-ai-for-devops-agents-and-nexus-foundation.md) |
| **U1 · Aula 3** · Da Automação à Inteligência Agêntica (PT-3) | [00 · Da automação à inteligência agêntica: LLMs, agentes CrewAI, RAG e o Nexus Foundation](./00-ai-for-devops-agents-and-nexus-foundation.md) |
| **U1 · Aula 4** · Da Automação à Inteligência Agêntica (PT-4) | [00 · Da automação à inteligência agêntica: LLMs, agentes CrewAI, RAG e o Nexus Foundation](./00-ai-for-devops-agents-and-nexus-foundation.md) |
| **U2 · Aula 1** · Geração, Auditoria e Self-Healing com IA (PT-1) | [01 · IaC Copilot: Arquiteto e Auditor com Checkov e OPA](./01-iac-copilot-terraform-checkov-opa.md) |
| **U2 · Aula 2** · Geração, Auditoria e Self-Healing com IA (PT-2) | [01 · IaC Copilot: Arquiteto e Auditor com Checkov e OPA](./01-iac-copilot-terraform-checkov-opa.md) |
| **U2 · Aula 3** · Geração, Auditoria e Self-Healing com IA (PT-3) | [01 · IaC Copilot: Arquiteto e Auditor com Checkov e OPA](./01-iac-copilot-terraform-checkov-opa.md) |
| **U3 · Aula 1** · Orquestração e SRE Assistida por IA (PT-1) | [02 · Agentes para Kubernetes: manifestos, reconciliação e Canary](./02-kubernetes-ai-ops-canary-gitops.md) |
| **U3 · Aula 2** · Orquestração e SRE Assistida por IA (PT-2) | [02 · Agentes para Kubernetes: manifestos, reconciliação e Canary](./02-kubernetes-ai-ops-canary-gitops.md) |
| **U3 · Aula 3** · Orquestração e SRE Assistida por IA (PT-3) | [02 · Agentes para Kubernetes: manifestos, reconciliação e Canary](./02-kubernetes-ai-ops-canary-gitops.md) |
| **U4 · Aula 1** · Reduzindo MTTR com Inteligência Agêntica (PT-1) | [03 · Troubleshooting com ReAct: reduzindo o MTTR com Prometheus, Jaeger e eventos do K8s](./03-troubleshooting-react-mttr.md) |
| **U4 · Aula 2** · Reduzindo MTTR com Inteligência Agêntica (PT-2) | [03 · Troubleshooting com ReAct: reduzindo o MTTR com Prometheus, Jaeger e eventos do K8s](./03-troubleshooting-react-mttr.md) |
| **U4 · Aula 3** · Reduzindo MTTR com Inteligência Agêntica (PT-3) | [03 · Troubleshooting com ReAct: reduzindo o MTTR com Prometheus, Jaeger e eventos do K8s](./03-troubleshooting-react-mttr.md) |
| **U5 · Aula 1** · Observabilidade Preditiva com IA (PT-1) | [04 · AIOps e observabilidade preditiva: NL2Q, alerta antes da queda e dashboards dinâmicos](./04-predictive-aiops-nl2q-dashboards.md) |
| **U5 · Aula 2** · Observabilidade Preditiva com IA (PT-2) | [04 · AIOps e observabilidade preditiva: NL2Q, alerta antes da queda e dashboards dinâmicos](./04-predictive-aiops-nl2q-dashboards.md) |
| **U5 · Aula 3** · Observabilidade Preditiva com IA (PT-3) | [04 · AIOps e observabilidade preditiva: NL2Q, alerta antes da queda e dashboards dinâmicos](./04-predictive-aiops-nl2q-dashboards.md) |
| **U6 · Aula 1** · O Poder da IA com Segurança no Slack/Teams (PT-1) | [05 · ChatOps com governança: RBAC, IAM e Human-in-the-Loop](./05-chatops-governance-hitl.md) |
| **U6 · Aula 2** · O Poder da IA com Segurança no Slack/Teams (PT-2) | [05 · ChatOps com governança: RBAC, IAM e Human-in-the-Loop](./05-chatops-governance-hitl.md) |
| **U6 · Aula 3** · O Poder da IA com Segurança no Slack/Teams (PT-3) | [05 · ChatOps com governança: RBAC, IAM e Human-in-the-Loop](./05-chatops-governance-hitl.md) |
| **U7 · Aula 1** · Priorização Inteligente de Vulnerabilidades (PT-1) | [06 · DevSecOps com IA: triagem de vulnerabilidades, CVE-2024-3094 e Compliance as Code](./06-devsecops-vulnerability-triage.md) |
| **U7 · Aula 2** · Priorização Inteligente de Vulnerabilidades (PT-2) | [06 · DevSecOps com IA: triagem de vulnerabilidades, CVE-2024-3094 e Compliance as Code](./06-devsecops-vulnerability-triage.md) |
| **U7 · Aula 3** · Priorização Inteligente de Vulnerabilidades (PT-3) | [06 · DevSecOps com IA: triagem de vulnerabilidades, CVE-2024-3094 e Compliance as Code](./06-devsecops-vulnerability-triage.md) |
| **U8 · Aula 1** · Eficiência Extrema no Ciclo de Entrega (PT-1) | [07 · CI/CD Copilot: cache, multi-stage build, Canary e rollback automático](./07-cicd-copilot-cache-multistage.md) |
| **U8 · Aula 2** · Eficiência Extrema no Ciclo de Entrega (PT-2) | [07 · CI/CD Copilot: cache, multi-stage build, Canary e rollback automático](./07-cicd-copilot-cache-multistage.md) |
| **U8 · Aula 3** · Eficiência Extrema no Ciclo de Entrega (PT-3) | [07 · CI/CD Copilot: cache, multi-stage build, Canary e rollback automático](./07-cicd-copilot-cache-multistage.md) |
| **U8 · Aula 4** · Eficiência Extrema no Ciclo de Entrega (PT-4) | [07 · CI/CD Copilot: cache, multi-stage build, Canary e rollback automático](./07-cicd-copilot-cache-multistage.md) |
| **U9 · Aula 1** · Gestão Financeira Cloud com IA (PT-1) | [08 · FinOps com IA: recursos zumbis, rightsizing, Spot e relatório de economia](./08-finops-zombie-resources-rightsizing.md) |
| **U9 · Aula 2** · Gestão Financeira Cloud com IA (PT-2) | [08 · FinOps com IA: recursos zumbis, rightsizing, Spot e relatório de economia](./08-finops-zombie-resources-rightsizing.md) |
| **U10 · Aula 1** · Conhecimento Vivo e Auto-Remediação (PT-1) | [09 · Auto-remediação segura: RAG de runbooks, postmortem automático, guardrails e dry-run](./09-runbook-rag-self-healing-guardrails.md) |
| **U10 · Aula 2** · Conhecimento Vivo e Auto-Remediação (PT-2) | [09 · Auto-remediação segura: RAG de runbooks, postmortem automático, guardrails e dry-run](./09-runbook-rag-self-healing-guardrails.md) |
| **U11 · Aula 1** · Automação com Segurança Operacional (PT-1) | [09 · Auto-remediação segura: RAG de runbooks, postmortem automático, guardrails e dry-run](./09-runbook-rag-self-healing-guardrails.md) |
| **U11 · Aula 2** · Automação com Segurança Operacional (PT-1, rótulo repetido na apostila) | [09 · Auto-remediação segura: RAG de runbooks, postmortem automático, guardrails e dry-run](./09-runbook-rag-self-healing-guardrails.md) |
| **U12 · Aula 1** · O Nascimento do nosso Bot Full-Stack (PT-1) | [10 · Projeto integrador: orquestração hierárquica, Game Day e ROI](./10-multi-agent-hierarchy-final-project.md) |
| **U12 · Aula 2** · O Nascimento do nosso Bot Full-Stack (PT-2) | [10 · Projeto integrador: orquestração hierárquica, Game Day e ROI](./10-multi-agent-hierarchy-final-project.md) |
| **U12 · Aula 3** · O Nascimento do nosso Bot Full-Stack (PT-3) | [10 · Projeto integrador: orquestração hierárquica, Game Day e ROI](./10-multi-agent-hierarchy-final-project.md) |
| **U13 · Aula 1** · Dockerização: Criando o Artefato de IA Imutável (PT-1) | [11 · Dockerização: o artefato de IA imutável](./11-docker-immutable-ai-artifact.md) |
| **U13 · Aula 2** · Dockerização: Criando o Artefato de IA Imutável (PT-2) | [11 · Dockerização: o artefato de IA imutável](./11-docker-immutable-ai-artifact.md) |
| **U13 · Aula 3** · Dockerização: Criando o Artefato de IA Imutável (PT-3) | [11 · Dockerização: o artefato de IA imutável](./11-docker-immutable-ai-artifact.md) |
| **U13 · Aula 4** · Kubernetes Local: Do Docker ao Cluster com Minikube (PT-1) | [12 · Kubernetes local com Minikube: componentes, escala, Secrets e Jobs](./12-kubernetes-local-minikube.md) |
| **U13 · Aula 5** · Kubernetes Local: Do Docker ao Cluster com Minikube (PT-2) | [12 · Kubernetes local com Minikube: componentes, escala, Secrets e Jobs](./12-kubernetes-local-minikube.md) |
| **U13 · Aula 6** · Cloud Simulada: LocalStack dentro do Kubernetes (PT-1) | [13 · Cloud simulada e interface: LocalStack e Streamlit dentro do Kubernetes](./13-localstack-streamlit-on-kubernetes.md) |
| **U13 · Aula 7** · Cloud Simulada: LocalStack dentro do Kubernetes (PT-2) | [13 · Cloud simulada e interface: LocalStack e Streamlit dentro do Kubernetes](./13-localstack-streamlit-on-kubernetes.md) |
| **U13 · Aula 8** · Interface do Agente: Dashboards com Streamlit no Kubernetes (PT-1) | [13 · Cloud simulada e interface: LocalStack e Streamlit dentro do Kubernetes](./13-localstack-streamlit-on-kubernetes.md) |
| **U13 · Aula 9** · Interface do Agente: Dashboards com Streamlit no Kubernetes (PT-2) | [13 · Cloud simulada e interface: LocalStack e Streamlit dentro do Kubernetes](./13-localstack-streamlit-on-kubernetes.md) |
| **U13 · Aula 10** · IA Offline com Ollama no Kubernetes (PT-1) | [14 · IA offline com Ollama no Kubernetes (e um passeio pelo dashboard do Minikube)](./14-offline-ai-ollama-on-kubernetes.md) |
| **U13 · Aula 11** · IA Offline com Ollama no Kubernetes (PT-2) | [14 · IA offline com Ollama no Kubernetes (e um passeio pelo dashboard do Minikube)](./14-offline-ai-ollama-on-kubernetes.md) |
| **U13 · Aula 12** · O que podemos fazer com IA em DevOps? (PT-1) | [15 · O que podemos fazer com IA em DevOps: tendências, carreira e revisão final](./15-what-can-we-do-with-ai-in-devops.md) |
| **U13 · Aula 13** · O que podemos fazer com IA em DevOps? (PT-2) | [15 · O que podemos fazer com IA em DevOps: tendências, carreira e revisão final](./15-what-can-we-do-with-ai-in-devops.md) |
| **U13 · Aula 14** · O que podemos fazer com IA em DevOps? (PT-3) | [15 · O que podemos fazer com IA em DevOps: tendências, carreira e revisão final](./15-what-can-we-do-with-ai-in-devops.md) |
| **Revisão final da disciplina** e Anexo A (GitHub) | [15 · O que podemos fazer com IA em DevOps: tendências, carreira e revisão final](./15-what-can-we-do-with-ai-in-devops.md) e a seção «Materiais oficiais» abaixo |

> As 49 aulas da apostila (13 unidades) estão cobertas em 16 documentos. U1 tem 4 aulas, U2 3, U3 3, U4 3, U5 3, U6 3, U7 3, U8 4, U9 2, U10 2, U11 2, U12 3 e U13 14. A apostila rotula as duas aulas da U11 como «PT-1»; mantive o rótulo original.

---

## 🧪 Código do repositório absorvido

O repositório do módulo (`modulo06-aiops-engenharia-agentica`) é um único projeto, o **Nexus AI-Ops**, com `core`, `tools`, `labs`, `ui`, `k8s`, `data` e `slides`. Não há pares `*-template` / `*-z` neste módulo: cada laboratório é a versão resolvida. O equivalente à diferença «ponto de partida versus resolvido» aqui é a distância entre o que os slides/apostila mostram e o que o repositório tem hoje, registrada nas armadilhas de cada tópico.

| Arquivo/pasta no GitHub | Onde está neste guia |
|-------------------------|----------------------|
| core/llm_config.py, core/agents.py | [00 · Da automação à inteligência agêntica: LLMs, agentes CrewAI, RAG e o Nexus Foundation](./00-ai-for-devops-agents-and-nexus-foundation.md) |
| tools/policy_rag.py | [00 · Da automação à inteligência agêntica: LLMs, agentes CrewAI, RAG e o Nexus Foundation](./00-ai-for-devops-agents-and-nexus-foundation.md) |
| labs/modulo1_foundation.py | [00 · Da automação à inteligência agêntica: LLMs, agentes CrewAI, RAG e o Nexus Foundation](./00-ai-for-devops-agents-and-nexus-foundation.md) |
| nexus_iac_copilot.py (central de comando CLI) | [00 · Da automação à inteligência agêntica: LLMs, agentes CrewAI, RAG e o Nexus Foundation](./00-ai-for-devops-agents-and-nexus-foundation.md) |
| README.md do módulo | [00 · Da automação à inteligência agêntica: LLMs, agentes CrewAI, RAG e o Nexus Foundation](./00-ai-for-devops-agents-and-nexus-foundation.md) |
| labs/modulo2_iac_copilot.py | [01 · IaC Copilot: Arquiteto e Auditor com Checkov e OPA](./01-iac-copilot-terraform-checkov-opa.md) |
| tools/file_writer.py, tools/security_scan.py | [01 · IaC Copilot: Arquiteto e Auditor com Checkov e OPA](./01-iac-copilot-terraform-checkov-opa.md) |
| main.tf | [01 · IaC Copilot: Arquiteto e Auditor com Checkov e OPA](./01-iac-copilot-terraform-checkov-opa.md) |
| labs/modulo3_k8s_ops.py | [02 · Agentes para Kubernetes: manifestos, reconciliação e Canary](./02-kubernetes-ai-ops-canary-gitops.md) |
| tools/k8s_ops.py | [02 · Agentes para Kubernetes: manifestos, reconciliação e Canary](./02-kubernetes-ai-ops-canary-gitops.md) |
| nexus-api-k8s.yaml, nexus-api-error-k8s.yaml, nexus-api-unipds-k8s.yaml | [02 · Agentes para Kubernetes: manifestos, reconciliação e Canary](./02-kubernetes-ai-ops-canary-gitops.md) |
| labs/modulo4_troubleshooting.py | [03 · Troubleshooting com ReAct: reduzindo o MTTR com Prometheus, Jaeger e eventos do K8s](./03-troubleshooting-react-mttr.md) |
| tools/k8s_diag.py, tools/obs_tools.py | [03 · Troubleshooting com ReAct: reduzindo o MTTR com Prometheus, Jaeger e eventos do K8s](./03-troubleshooting-react-mttr.md) |
| checkout-broken.yaml, checkout-k8s-fix.yaml | [03 · Troubleshooting com ReAct: reduzindo o MTTR com Prometheus, Jaeger e eventos do K8s](./03-troubleshooting-react-mttr.md) |
| labs/modulo5_aiops.py, tools/aiops_tools.py | [04 · AIOps e observabilidade preditiva: NL2Q, alerta antes da queda e dashboards dinâmicos](./04-predictive-aiops-nl2q-dashboards.md) |
| incident_dashboard.json | [04 · AIOps e observabilidade preditiva: NL2Q, alerta antes da queda e dashboards dinâmicos](./04-predictive-aiops-nl2q-dashboards.md) |
| labs/modulo6_chatops.py, tools/chatops_tools.py | [05 · ChatOps com governança: RBAC, IAM e Human-in-the-Loop](./05-chatops-governance-hitl.md) |
| labs/modulo7_devsecops.py, data/trivy.json | [06 · DevSecOps com IA: triagem de vulnerabilidades, CVE-2024-3094 e Compliance as Code](./06-devsecops-vulnerability-triage.md) |
| tools/governance_tools.py (ferramentas-esboço não usadas) | [06 · DevSecOps com IA: triagem de vulnerabilidades, CVE-2024-3094 e Compliance as Code](./06-devsecops-vulnerability-triage.md) |
| labs/modulo8_cicd.py, data/workflow_lento.yaml, data/workflow_rapido.yaml | [07 · CI/CD Copilot: cache, multi-stage build, Canary e rollback automático](./07-cicd-copilot-cache-multistage.md) |
| labs/modulo9_finops.py, data/inventario_cloud.json | [08 · FinOps com IA: recursos zumbis, rightsizing, Spot e relatório de economia](./08-finops-zombie-resources-rightsizing.md) |
| labs/modulo10_remediation.py, data/runbook_db.md | [09 · Auto-remediação segura: RAG de runbooks, postmortem automático, guardrails e dry-run](./09-runbook-rag-self-healing-guardrails.md) |
| labs/modulo11_guardrails.py | [09 · Auto-remediação segura: RAG de runbooks, postmortem automático, guardrails e dry-run](./09-runbook-rag-self-healing-guardrails.md) |
| labs/modulo12_projeto_final.py | [10 · Projeto integrador: orquestração hierárquica, Game Day e ROI](./10-multi-agent-hierarchy-final-project.md) |
| Dockerfile, .dockerignore, requirements.txt, .gitignore | [11 · Dockerização: o artefato de IA imutável](./11-docker-immutable-ai-artifact.md) |
| k8s/deploy.yml, k8s/job.yaml, k8s/secret.yml | [12 · Kubernetes local com Minikube: componentes, escala, Secrets e Jobs](./12-kubernetes-local-minikube.md) |
| k8s/localstack.yml, k8s/connect-test.yaml, k8s/streamlit.yaml | [13 · Cloud simulada e interface: LocalStack e Streamlit dentro do Kubernetes](./13-localstack-streamlit-on-kubernetes.md) |
| ui/app.py | [13 · Cloud simulada e interface: LocalStack e Streamlit dentro do Kubernetes](./13-localstack-streamlit-on-kubernetes.md) |
| k8s/ollama.yaml | [14 · IA offline com Ollama no Kubernetes (e um passeio pelo dashboard do Minikube)](./14-offline-ai-ollama-on-kubernetes.md) |
| slides/ (slides1 a slides12 e slides131 a slides135) | um por unidade: D6-00 a D6-14 |

### Achados transversais no código

- **Nada é real:** Prometheus, Jaeger, OPA, Trivy, o modelo preditivo, o dry-run e o «RAG» são simulados em Python ou arquivos fixos; só `kubectl` e `checkov` são chamados de verdade (e nem isso quando o binário não existe). Serve para ensinar o fluxo, não como implementação de referência.
- **Groq, não Grok:** a apostila diz «Grok»; o código usa `groq/llama-3.1-8b-instant` (README cita também Llama-3.3-70B).
- **11 versus 12 agentes:** README e UI dizem 11; `core/agents.py` tem 12 fábricas.
- **Ferramentas sem uso:** `tools/governance_tools.py` não é importado por nenhum lab; `pandas`, `numpy`, `kubernetes` e `langchain-groq` não são importados diretamente.
- **`data/runbook_db.md` truncado** (sem a seção de remediação) e `data/trivy.json` com 3 CVEs (apostila e slides falam em ~50).
- **Slide 9 promete US$ 500/mês de economia**, mas o inventário soma US$ 395/mês.
- **`inspect_pod_failure`:** `checkout-api` casa com a substring `api` e cai no ramo de banco de dados.
- **Senha de aprovação no docstring** da ferramenta `execute_terraform` (visível ao LLM).
- **`.dockerignore` exclui `data/*.json`**, então os labs 7 e 9 não funcionam na imagem; a imagem é de um estágio só.
- **`k8s/ollama.yaml` com a chave `limits` duplicada**; nenhum código usa o Ollama.
- **Caminhos divergentes entre slides e repo:** `localstack.yaml` x `localstack.yml`, `secrets.yaml` x `secret.yml`, `python3 modulo5_aiops.py` sem `labs/`, flag `--dry-run` inexistente.
- **README do módulo 4** manda aplicar `k8s/deploy.yml` (o Nexus-Bot válido); o cenário quebrado é `checkout-broken.yaml`.

---

## 🎓 Mentalidade da disciplina

A introdução e a revisão final da apostila resumem o fio condutor:

- **IA é apoio ao conhecimento técnico, não substituta.** A validação final é do profissional ([00](./00-ai-for-devops-agents-and-nexus-foundation.md), [15](./15-what-can-we-do-with-ai-in-devops.md)).
- **Contexto vence modelo:** prompts como especificação, RAG e agentes especializados incorporam políticas e padrões da organização ([00](./00-ai-for-devops-agents-and-nexus-foundation.md), [01](./01-iac-copilot-terraform-checkov-opa.md)).
- **Da geração à decisão:** IaC e Kubernetes transformam requisitos em artefatos; troubleshooting e observabilidade preditiva transformam sinais em diagnóstico e antecipação ([01](./01-iac-copilot-terraform-checkov-opa.md) a [04](./04-predictive-aiops-nl2q-dashboards.md)).
- **Governança antes de autonomia:** ChatOps com RBAC/IAM e HITL, segurança com triagem contextual, guardrails, dry-run e aprovação humana separam sugestão de execução ([05](./05-chatops-governance-hitl.md), [06](./06-devsecops-vulnerability-triage.md), [09](./09-runbook-rag-self-healing-guardrails.md)).
- **Valor mensurável:** pipeline mais rápida, custo menor, MTTR menor e ROI explicável ([07](./07-cicd-copilot-cache-multistage.md), [08](./08-finops-zombie-resources-rightsizing.md), [10](./10-multi-agent-hierarchy-final-project.md)).
- **Do terminal ao escalável:** container imutável, Kubernetes local, cloud simulada, interface e IA offline ([11](./11-docker-immutable-ai-artifact.md) a [14](./14-offline-ai-ollama-on-kubernetes.md)).

**Checklist de domínio (revisão final):** explicar por que a IA é apoio; relacionar Prompt Engineering, RAG e agentes ao contexto organizacional; descrever como IaC Copilot, Kubernetes e troubleshooting viram artefatos e decisões; explicar como observabilidade preditiva, ChatOps, DevSecOps, CI/CD e FinOps ampliam o alcance da IA; diferenciar auto-remediação de execução irrestrita (guardrails, dry-run, aprovação humana); e mostrar a evolução de containerização, Kubernetes, LocalStack, Streamlit e Ollama.

---

## 🧰 Materiais oficiais da disciplina

- **Repositório de código:** https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica
- **Estrutura:** `core`, `tools`, `labs` (modulo1 a modulo12), `ui`, `k8s`, `data`, `slides`; unidade 13 usa `Dockerfile`, `k8s/` e `ui/`
- **Linguagem e stack:** Python 3.10 a 3.13 (imagem Docker em 3.12), CrewAI 1.14.4, Groq (Llama 3.1 8B), Streamlit, Checkov, kubectl, Docker/Minikube, LocalStack, Ollama
- **Links do README do curso para o módulo 06:** [CrewAI](https://www.crewai.com/), [Groq](https://groq.com/), [Ollama](https://ollama.com/), [Streamlit](https://streamlit.io/), [Prometheus](https://prometheus.io/), [Jaeger](https://www.jaegertracing.io/), [Grafana](https://grafana.com/), [Trivy](https://trivy.dev/), [OPA](https://www.openpolicyagent.org/), [Kubernetes](https://kubernetes.io/), [Terraform](https://www.terraform.io/), [LocalStack](https://www.localstack.cloud/), [GitHub Actions](https://docs.github.com/actions)

### Indicações de leitura complementar
1. **Observability Engineering: Achieving Production Excellence** (Majors, C.; Fong-Jones, L.; Miranda, G. (1ª ed., O'Reilly, 2022)). Leitura de base para AIOps e observabilidade preditiva: desconstrói alertas estáticos e painéis fixos e prepara o terreno para NL2Q e dashboards gerados por IA. Dá a base para entender sazonalidade e anomalias antes de automatizar a redução do MTTR. Relaciona-se com [04 · AIOps e observabilidade preditiva: NL2Q, alerta antes da queda e dashboards dinâmicos](./04-predictive-aiops-nl2q-dashboards.md).
2. **Cloud FinOps: Collaborative, Real-Time Cloud Financial Management** (Storment, J.R.; Fuller, M. (2ª ed., O'Reilly, 2023)). Referência para as automações de eficiência e o ROI do Projeto Integrador: cultura de responsabilidade financeira, estratégias de rightsizing e caça a recursos zumbis, para calibrar o agente FinOps com métricas reais. Relaciona-se com [08 · FinOps com IA: recursos zumbis, rightsizing, Spot e relatório de economia](./08-finops-zombie-resources-rightsizing.md).
3. **The Site Reliability Workbook: Practical Ways to Implement SRE** (Beyer, B.; Murphy, N. R.; Rensin, D. K.; Kawahara, K.; Thorne, S. (1ª ed., O'Reilly, 2018)). Anatomia de um incidente antes de delegar auto-remediação: playbooks e runbooks acionáveis, post-mortems baseados em evidências e guardrails operacionais; sustenta o RAG de runbooks, o dry-run e o Human-in-the-loop. Relaciona-se com [09 · Auto-remediação segura: RAG de runbooks, postmortem automático, guardrails e dry-run](./09-runbook-rag-self-healing-guardrails.md).
4. **Securing DevOps: Security in the Cloud** (Vehent, J. (1ª ed., Manning, 2018)). Integração contínua de segurança no pipeline de CI/CD sem estrangular a velocidade; cobre DevSecOps, ataques à cadeia de suprimentos (como o XZ Utils) e a teoria por trás da fadiga de alertas. Relaciona-se com [06 · DevSecOps com IA: triagem de vulnerabilidades, CVE-2024-3094 e Compliance as Code](./06-devsecops-vulnerability-triage.md).

O PDF de indicações não traz links, só referências bibliográficas.

---

*Guia gerado a partir da apostila oficial (188 págs, 13 unidades), dos slides do repositório (17 arquivos) e das indicações de leitura da disciplina.*
