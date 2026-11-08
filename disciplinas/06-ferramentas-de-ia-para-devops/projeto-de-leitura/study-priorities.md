# 🎯 Disciplina 06 · O que vale estudar

> Análise de prioridade (opinião fundamentada no guia e na prática atual), não conteúdo da apostila. Premissas: engenheiro de software backend (TypeScript/Node e Python) com APIs e serviços em nuvem (AWS), Postgres, filas e jobs, produto com LLMs em produção, automação de fluxos (Jira/Slack) e uso intenso de agentes de código; objetivo de virar engenheiro de IA aplicada especialista (construir, avaliar, operar e governar sistemas com LLMs), não pesquisador de modelos.

## Veredito
O maior valor desta disciplina está em governança de agentes que agem sobre infraestrutura: HITL, RBAC fora do LLM, dry-run real, guardrails por nível de risco e trilha de auditoria (tópicos 05 e 09; a triagem de CVE do 06 aparece só no item 4 de Implemente). O resto é, em boa parte, um catálogo de "agente que lê X e escreve um relatório", demonstrado com dados simulados. O próprio guia avisa que Prometheus, Jaeger, OPA, Trivy, o modelo preditivo, o dry-run e o "RAG" são simulados em Python ou arquivos fixos.

Nota: ⭐⭐⭐ (3 de 5). Os princípios de segurança operacional são sólidos e transferem para qualquer agente em produção, mas o código do curso não é referência de implementação e metade do bloco final é Minikube, LocalStack e Ollama, pouco ligados ao seu dia a dia.

Mais útil para quem opera agentes com poder de escrita (infra, banco, filas, tickets) e precisa decidir o que pode ser automático e o que exige aprovação.

## Mapa de prioridade por tópico

| Tópico | Dia a dia | Especialista | Veredito |
|--------|-----------|--------------|----------|
| [00 · Agentes CrewAI, RAG e Nexus Foundation](./00-ai-for-devops-agents-and-nexus-foundation.md) | 🟡 | 🟡 | Conhecer |
| [01 · IaC Copilot com Checkov e OPA](./01-iac-copilot-terraform-checkov-opa.md) | 🟡 | 🟡 | Conhecer |
| [02 · Agentes para Kubernetes e Canary](./02-kubernetes-ai-ops-canary-gitops.md) | 🟡 | 🟡 | Conhecer |
| [03 · Troubleshooting com ReAct e MTTR](./03-troubleshooting-react-mttr.md) | 🟡 | 🟡 | Conhecer |
| [04 · AIOps preditivo, NL2Q e dashboards](./04-predictive-aiops-nl2q-dashboards.md) | 🟡 | 🟡 | Conhecer |
| [05 · ChatOps com RBAC, IAM e HITL](./05-chatops-governance-hitl.md) | 🟢 | 🟢 | Implementar |
| [06 · DevSecOps e triagem de vulnerabilidades](./06-devsecops-vulnerability-triage.md) | 🟡 | 🟡 | Conhecer |
| [07 · CI/CD Copilot, cache e multi-stage](./07-cicd-copilot-cache-multistage.md) | 🟡 | ⚪ | Conhecer |
| [08 · FinOps com IA](./08-finops-zombie-resources-rightsizing.md) | 🟡 | ⚪ | Conhecer |
| [09 · Runbook RAG, guardrails e dry-run](./09-runbook-rag-self-healing-guardrails.md) | 🟢 | 🟢 | Aprofundar |
| [10 · Multiagente hierárquico, Game Day e ROI](./10-multi-agent-hierarchy-final-project.md) | 🟡 | 🟢 | Aprofundar |
| [11 · Docker: artefato imutável](./11-docker-immutable-ai-artifact.md) | 🟡 | ⚪ | Conhecer |
| [12 · Kubernetes local com Minikube](./12-kubernetes-local-minikube.md) | ⚪ | ⚪ | Pular |
| [13 · LocalStack e Streamlit no Kubernetes](./13-localstack-streamlit-on-kubernetes.md) | ⚪ | ⚪ | Pular |
| [14 · IA offline com Ollama no Kubernetes](./14-offline-ai-ollama-on-kubernetes.md) | ⚪ | 🟡 | Conhecer |
| [15 · O que fazer com IA em DevOps](./15-what-can-we-do-with-ai-in-devops.md) | ⚪ | ⚪ | Pular |

Critério: Implementar é retorno imediato no dia a dia; Aprofundar é retorno sobretudo para especialista (o 09 é exceção: também alimenta itens de Implemente); Conhecer é leitura com princípio aproveitável (pode alimentar um item de Implemente, como o 01 e o 06); Pular é ⚪ nas duas colunas.

## ✅ Implemente no dia a dia

1. **Gate determinístico de identidade, permissão e aprovação fora do LLM.**
   - Por que vale: é a lição central do tópico 05 e vale para qualquer agente com ferramenta de escrita. Dica do guia (tópico 05): o modelo só recebe "permitido" ou "bloqueado"; quem decide é código. O lab faz o oposto (senha no docstring que o LLM enxerga, usuário como string fixa no prompt), então use a aula como contraexemplo.
   - Primeiro passo mínimo: para cada ferramenta de escrita que seu agente tem, uma função que checa o usuário autenticado e uma allowlist antes de executar, e retorna erro tipado ao modelo.
   - Quando não adotar: ferramentas só de leitura em ambiente sem dado sensível.
   - Tópico: [05](./05-chatops-governance-hitl.md).

2. **Tabela escrita de risco por ação (automática, dry-run, só humano) e log de decisões.**
   - Por que vale: o guia recomenda exatamente isso no tópico 09, e é o que torna a automação auditável e reversível. Minha análise: é a parte mais reutilizável da disciplina, porque independe de stack.
   - Primeiro passo mínimo: um arquivo de política versionado listando ações e nível; o executor lê o nível e registra quem aprovou, o quê e quando (log estruturado).
   - Guardrails que o guia cita no tópico 09: rejeitar tem de interromper o fluxo (nenhum caminho aplica a mudança após rejeição) e rate limit, circuit breaker e canary rollback limitam a cascata de ações. No código do curso esses três não existem.
   - Quando não adotar: fluxos 100% reversíveis e de baixo impacto (ex.: rascunho de comentário); aqui a aprovação só adiciona atrito.
   - Tópico: [09](./09-runbook-rag-self-healing-guardrails.md).

3. **Dry-run de verdade e validação do output do LLM antes de aplicar.**
   - Por que vale: o guia mostra que o dry-run do lab é uma linha impressa, e a própria prova cobra `--dry-run=client` como simulação. Não confunda: validação client-side checa sintaxe, não impacto real (confira a documentação do kubectl na versão atual). Vale também para SQL, JSON de ferramenta e YAML de CI. O tópico 02 reforça: a robustez vem do template, não da esperteza do LLM, e reaplicar o manifesto e ver "unchanged" é um bom teste de idempotência.
   - Primeiro passo mínimo: toda saída estruturada do modelo passa por um schema (Zod ou Pydantic) e por uma checagem executável (linter, `plan`, transação com rollback) antes de qualquer efeito.
   - Quando não adotar: quando o efeito é puramente informativo.
   - Tópicos: [09](./09-runbook-rag-self-healing-guardrails.md), [01](./01-iac-copilot-terraform-checkov-opa.md), [02](./02-kubernetes-ai-ops-canary-gitops.md).

4. **Triagem de alertas e vulnerabilidades com LLM, sempre com lista do que foi descartado.**
   - Por que vale: reduz fadiga de alerta, mas o guia reconhece que a priorização é opinião de LLM e varia entre execuções. A dica de registrar o descartado e o motivo é o que a torna defensável.
   - Primeiro passo mínimo: rodar o relatório do seu scanner de dependências atual por um prompt que devolve ordem de prioridade, justificativa e descartes, e comparar com o julgamento de uma pessoa em 10 itens.
   - Quando não adotar: se você tem poucos achados por semana; o custo de revisar o LLM supera o ganho.
   - Tópico: [06](./06-devsecops-vulnerability-triage.md).

## 🔬 Aprofunde (rumo a especialista)

1. **Segurança de agentes com ferramentas (permissões, injeção de prompt, menor privilégio).**
   - Por que diferencia: minha análise: quase todo incidente sério com agente nasce de ferramenta com poder demais ou de dado não confiável virando instrução. Isso aparece no guia como `service_name` do LLM compondo caminho de arquivo sem validação e como proteção que depende de o modelo se comportar.
   - Estudar além da aula: OWASP Top 10 para aplicações com LLM (confira a versão atual) e a documentação de segurança do provedor de modelo que você usa.
   - Exercício verificável: pegue uma ferramenta de escrita do seu agente e escreva 5 entradas hostis (path traversal, argumento fora da allowlist, instrução embutida em dado); a suíte de testes deve provar que todas são bloqueadas sem o LLM.
   - Tópicos: [05](./05-chatops-governance-hitl.md), [09](./09-runbook-rag-self-healing-guardrails.md).

2. **Avaliação de agentes que diagnosticam (ReAct) contra incidentes reais.**
   - Por que diferencia: o guia admite que o diagnóstico é tão bom quanto as ferramentas e que o lab só reproduz cenário fixo, inclusive com um bug de substring que desvia o diagnóstico. Quem sabe medir acerto, custo e variação por execução sabe se o agente serve.
   - Estudar além da aula: o livro de observabilidade indicado no README (Observability Engineering) e o artigo original do padrão ReAct.
   - Exercício: monte 10 incidentes passados (logs e eventos reais, anonimizados) com causa raiz conhecida; rode o agente 3 vezes cada e reporte taxa de acerto e variação.
   - Tópicos: [03](./03-troubleshooting-react-mttr.md), [04](./04-predictive-aiops-nl2q-dashboards.md).

3. **RAG de runbooks de verdade (e o que ele não conserta).**
   - Por que diferencia: o "RAG" do lab é leitura de arquivo, e o runbook está truncado, então o modelo improvisa o comando. Saber indexar, recuperar e checar que a resposta veio da fonte é o diferencial.
   - Primeiro passo mínimo: gere um rascunho de postmortem a partir do chat e das métricas de um incidente passado (o lab não coleta isso, só reescreve a Task) e indexe o resultado junto dos runbooks.
   - Estudar além da aula: documentação do pgvector (você já tem Postgres) e material de avaliação de RAG da comunidade.
   - Exercício: indexe 5 runbooks em Postgres, pergunte 20 questões e meça quantas respostas citam o trecho correto; adicione um runbook propositalmente errado e veja o efeito.
   - Tópico: [09](./09-runbook-rag-self-healing-guardrails.md).

4. **Orquestração multiagente com custo e números ancorados em medição.**
   - Por que diferencia: o guia mostra que o ROI do projeto final é narrativa do LLM. Um especialista sabe quando um único agente com boas ferramentas basta, e exige que todo número de relatório venha de ferramenta.
   - Estudar além da aula: documentação do CrewAI (confira a versão atual).
   - Exercício: refaça o fluxo com um agente e com um hierárquico; compare tokens, latência e acerto, e prove que cada número do relatório tem fonte.
   - Tópico: [10](./10-multi-agent-hierarchy-final-project.md).

## 🧂 Pode ficar no superficial

- **Minikube, LocalStack e Streamlit (tópicos 12 e 13):** é infraestrutura de laboratório. O guia mostra que nenhum lab usa de fato o S3 simulado, e você já tem AWS e Docker no dia a dia. Leia os achados (Deployment onde cabia Job, Base64 não é proteção) e siga.
- **Docker (11):** só vale se você não tem imagem base padronizada pelo time; um backend em AWS já domina isso. Se for escrever um Dockerfile para serviço com LLM, fixe versões, copie o arquivo de dependências antes do código, use multi-stage e usuário não-root, `.dockerignore` correto e segredo por variável, nunca na imagem. O lab falha em `.dockerignore`, estágio único e root, então não copie.
- **Ollama no Kubernetes (14):** a ideia útil é híbrida: modelo local para dado sensível ou alto volume, API externa onde precisa de qualidade. O manifesto tem chave `limits` duplicada e nenhum código usa o Ollama. Quando precisar, avalie com seus dados.
- **Catálogo de ferramentas de nicho (CrewAI, Nexus, Groq):** o guia nota que a apostila diz "Grok" e o código usa Groq, e que a contagem de agentes diverge. Minha análise: frameworks de agente mudam a cada trimestre; aprenda o padrão (agente, ferramenta, tarefa), não a API.
- **Kubernetes com Canary e rollback (02, 07):** conceito válido, mas o guia aponta que o Canary do lab só lê `error_rate` e que rollback automático é só teoria. Só aprofunde se você operar Kubernetes.
- **Tópico 15 (tendências e carreira):** reflexão genérica; a dica de justificar toda resposta de IA em voz alta é boa, o resto não precisa de tempo de estudo.

## ⚠️ Cuidados e lacunas

- **Nada é real no código:** o guia afirma que só `kubectl` e `checkov` são chamados de verdade. Não trate nenhum lab como implementação de referência; o dry-run, o HITL e o RBAC do curso são demonstrações do fluxo, não proteção.
- **Números do curso não são evidência:** ganho de 60% no CI vem de fala de aula e de estimativa do LLM; a economia de US$ 500/mês do slide não fecha com um inventário de US$ 395/mês. Meça no seu ambiente antes de repetir qualquer cifra.
- **Lacunas:** faltam avaliação sistemática de agentes (evals), observabilidade do próprio agente (traces de chamadas e custo), e testes automatizados para as ferramentas. O guia cobre superficialmente a observabilidade do agente (trilha de auditoria, tópico 05) e não cobre os outros dois; e são o que separa demo de produção.
- **Risco de autonomia:** o guia insiste que HITL e guardrails vêm antes de autonomia e que a proteção depende de o LLM chamar a ferramenta certa. Dica do guia (tópico 05): aplicar o controle na camada da ferramenta, não no prompt.
- **Variação por versão:** versões de CrewAI, LocalStack e imagens citadas mudam rápido (confira a versão atual antes de usar qualquer manifesto).

## ✔️ Como saber que aprendeu

- Consigo explicar, sem consultar, a diferença entre RBAC ("pode?") e HITL ("alguém aprova?") e apontar onde cada um vive no código do meu agente, fora do prompt.
- Meu agente com ferramenta de escrita tem uma tabela de risco versionada, um log estruturado de decisões e testes que provam o bloqueio de entradas hostis.
- Tenho um conjunto de incidentes ou alertas reais com resposta conhecida e um relatório de acerto, custo e variação do agente, com todo número do relatório vindo de medição.

Veja também a [trilha consolidada](../../study-roadmap.md).
