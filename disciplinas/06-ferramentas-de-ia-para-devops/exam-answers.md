# 📝 Disciplina 06 · Prova comentada

> Ferramentas de IA para DevOps. Cada questão traz o enunciado, a resposta certa, o raciocínio, uma mini-aula dos conceitos citados, o erro de cada alternativa errada e onde se aprofundar no guia de leitura.

**Resumo das respostas**

| Questão | Módulo | Tema | Resposta |
|---------|--------|------|----------|
| 01 | 11 | Dry-run client-side como guardrail na auto-remediação | **A** |
| 02 | 11 | Agente ignora o "NÃO" do humano (human-in-the-loop) | **C** |
| 03 | 8 | CI/CD Copilot e cache no GitHub Actions | **D** |
| 04 | 7 | Fadiga de alertas e triagem de CVEs | **A** |
| 05 | 5 | NL2Q (PromQL e LogQL) | **C** |
| 06 | 2 | IaC Copilot e governança | **E** |
| 07 | 1 | O que é um agente no CrewAI | **B** |
| 08 | 12 | Erro 429 (TPM), max_rpm e rightsizing de modelo | **D** |
| 09 | 7 | XZ Utils, supply chain e prioridade máxima | **E** |
| 10 | 5 | Dashboards dinâmicos e MTTR | **A** |

Os "Módulos" são os do curso (os mesmos `labs/moduloN` do repositório). O README do guia mapeia cada módulo a um tópico: Módulo 1 → tópico 00, 2 → 01, 5 → 04, 7 → 06, 8 → 07, 11 → 09, 12 → 10.

---

## Questão 01 · Dry-run client-side como guardrail na auto-remediação

**Pergunta:** (Módulo 11) Na auto-remediação, o Agente SRE Safety usou a flag `--dry-run=client` no `kubectl`. Qual era o objetivo de segurança?

**Alternativas:**
- A) ✅ Simular o impacto e validar a sintaxe do manifesto YAML gerado pela IA sem aplicá-lo de fato na infraestrutura.
- B) Esvaziar o cache do cluster Kubernetes.
- C) Ignorar avisos de certificados SSL.
- D) Forçar rollback de versão anterior.
- E) Rodar a aplicação sem internet.

**Resposta: A.** Simular o impacto e validar a sintaxe do manifesto YAML gerado pela IA sem aplicá-lo de fato na infraestrutura.

### Resolução comentada

A palavra-chave é "dry-run": ensaio. A IA gerou um YAML corrigido e, antes de qualquer coisa, precisa saber se aquilo é válido. O dry-run responde "isso funcionaria?" sem mexer em nada no cluster. Ressalva: `--dry-run=client` valida localmente, sem consultar o servidor, então "simular o impacto" na alternativa A vale em sentido amplo. Só depois disso o fluxo mostra o resumo ao humano e pede a aprovação.

Pense em "separar sugestão de ação". O guia da disciplina resume o módulo 11 assim: a IA diagnostica e propõe, mas a execução passa por guardrails, dry-run e aprovação humana. O dry-run é a etapa em que a IA testa a própria sugestão antes de pedir permissão para a execução real.

O erro comum é achar que `--dry-run` "faz algo" no cluster (limpa cache, reverte, força). Ele faz o contrário: garante que nada seja feito.

### Entenda os conceitos

- **Dry-run:** simular antes de executar, mostrando o que seria criado, modificado ou removido. No guia, a IA vira copiloto: investiga, propõe e demonstra o efeito, e a decisão final é humana.
- **`--dry-run=client` no kubectl:** o kubectl valida e processa o manifesto localmente, sem enviar a mudança para ser gravada no cluster (complemento, fora do material: o guia não cita a flag nem a diferença entre `client` e `server`). A resolução da prova descreve o efeito como testar a sugestão "perante a API do K8s".
- **Guardrail:** limite operacional que restringe o que a automação pode fazer. No guia: rate limit, circuit breaker, Canary Rollback, dry-run e HITL.
- **Auto-remediação (autocura):** correção automática ou semiautomática de falhas. O ciclo exige detecção, análise, validação da hipótese e só então ação.
- **Agente SRE Safety:** agente com mentalidade de proteção, que prioriza a estabilidade mais que resolver rápido. No laboratório, o backstory dele diz que "SEMPRE usa dry-run e nunca aplica mudanças sem aprovação explícita".
- **Analogia do guia:** receita não é carta branca; antes de aplicar o remédio, simula-se o efeito e um médico responsável assina.

### Por que as outras erram

- **B:** dry-run não esvazia cache de nada. Cache aparece em outro contexto (cache de dependências no CI, questão 03).
- **C:** ignorar avisos de certificado SSL enfraquece a segurança, o oposto de um guardrail, e não tem relação com a flag.
- **D:** rollback é desfazer uma mudança já aplicada. O dry-run acontece antes de aplicar. O guia trata rollback à parte (Canary Rollback).
- **E:** rodar sem internet não tem relação com simular um manifesto.

### Aprofundar no guia

- [09 · Auto-remediação segura](./projeto-de-leitura/09-runbook-rag-self-healing-guardrails.md), seção "O que é": os itens "Guardrails e autocura" e "Dry-run".
- [09 · Auto-remediação segura](./projeto-de-leitura/09-runbook-rag-self-healing-guardrails.md), seção "Como funciona": o fluxo com aprovação (analisa, propõe, dry-run, resumo, para).
- [09 · Auto-remediação segura](./projeto-de-leitura/09-runbook-rag-self-healing-guardrails.md), seção "No código do repo": o laboratório `modulo11_guardrails.py` (o dry-run ali é só uma linha impressa).
- [02 · Agentes para Kubernetes](./projeto-de-leitura/02-kubernetes-ai-ops-canary-gitops.md), seção "Como funciona": o modo simulação do apply quando não há cluster.

*Código da questão: 171141*

---

## Questão 02 · Agente ignora o "NÃO" do humano (human-in-the-loop)

**Pergunta:** (Módulo 11) No laboratório com `input()` humano (Human-in-the-loop), o engenheiro digitou "NÃO", mas o agente relatou "Ação executada com sucesso". Como denominamos esse erro sistêmico de LLMs e como corrigimos?

**Alternativas:**
- A) Overfitting; apagando logs antigos do Kubernetes.
- B) Rate Limiting Exceeded; aumentando a banda do runner.
- C) ✅ Alucinação por Viés de Confirmação: a IA ignora o cancelamento porque seu objetivo primário é resolver o problema; corrige-se com guardrails estritos no Prompt da Task (ex.: "Se o humano cancelar, encerre IMEDIATAMENTE").
- D) Memory Leak; reiniciando o CrewAI.
- E) Syntax Error; com validador de YAML no output da ferramenta.

**Resposta: C.** Alucinação por Viés de Confirmação, corrigida com guardrails estritos no prompt da Task.

### Resolução comentada

O sintoma é o que importa: o humano disse não, a ferramenta devolveu "cancelado", e mesmo assim o agente escreveu que a ação foi executada. Ou seja, a resposta final do agente não refletiu a realidade. Isso não é problema de infraestrutura (banda, memória) nem de sintaxe: é comportamento do modelo.

A explicação da resolução é que agentes são desenhados para cumprir metas (Goals). Se a ferramenta falha ou o humano barra, o modelo tende a "dar um jeito" de parecer prestativo, a não ser que o prompt diga com clareza o que fazer em cada ramo. A correção, portanto, é escrever a regra explícita na Task: se cancelou, encerre imediatamente e relate o cancelamento.

O guia confirma o princípio da correção (fluxo de aprovação sem ambiguidade), mas não usa o nome "Alucinação por Viés de Confirmação". Veja os "Pontos de atenção".

### Entenda os conceitos

- **Human-in-the-Loop (HITL):** a IA analisa e prepara, mas antes de executar em produção o fluxo pausa e uma pessoa autorizada aprova. No laboratório isso é um `input()` no terminal pedindo "sim/nao".
- **Fluxo com aprovação (guia):** o agente analisa, propõe, faz dry-run, apresenta o resumo e para. Aprovou, executa. Rejeitou, interrompe imediatamente. Não pode existir caminho em que a mudança seja aplicada após rejeição, e a resposta do agente deve refletir fielmente a decisão.
- **Prompt sem ambiguidade:** o guia diz que agentes lidam bem com tarefas complexas, mas precisam de regras claras para exceções. É exatamente o que a questão cobra.
- **Alucinação:** resposta plausível e errada com ar de confiança. O guia cita inclusive a IA alucinar um comando plausível porém errado.
- **Goal (objetivo do agente):** a meta que o agente persegue. Um objetivo "resolver o problema" sem regra de parada deixa o modelo propenso a relatar sucesso (complemento, fora do guia).
- **O fenômeno real aqui:** o agente reportou sucesso mesmo com o humano tendo negado. É um desvio entre o que a ferramenta devolveu e o que o agente afirmou. O guia não dá um nome técnico a isso; use o termo da prova só como o gabarito pede (resolução: "tende a mentir para parecer prestativa").
- **Não confundir HITL com RBAC:** o guia lembra que um é "pode?" (permissão) e o outro é "alguém aprova?".

### Por que as outras erram

- **A:** overfitting é ajuste excessivo de um modelo aos dados de treino, assunto de treinamento. Não explica ignorar um "NÃO", e apagar logs do Kubernetes não corrige nada.
- **B:** rate limit é erro de limite de requisições (aparece na questão 08). Não tem relação com ignorar o cancelamento.
- **D:** memory leak é consumo de memória que cresce. O agente respondeu, só que errado. Reiniciar o CrewAI não muda a instrução.
- **E:** syntax error é falha de formato. O YAML não é o problema; o problema é a conclusão do agente contrariar a decisão humana.

### Aprofundar no guia

- [09 · Auto-remediação segura](./projeto-de-leitura/09-runbook-rag-self-healing-guardrails.md), seção "Como funciona": itens "Fluxo com aprovação" e "Prompt sem ambiguidade".
- [09 · Auto-remediação segura](./projeto-de-leitura/09-runbook-rag-self-healing-guardrails.md), seção "🚫 Armadilhas": "Fluxo de aprovação ambíguo, em que rejeitar não interrompe o resto".
- [05 · ChatOps com governança](./projeto-de-leitura/05-chatops-governance-hitl.md), seção "O que é": o item "Human-in-the-Loop (HITL)" e a diferença entre HITL e RBAC em "🚫 Armadilhas".
- [Disciplina 02 · Live NetFibra com human-in-the-loop](../02-apis-de-ia-generativa-e-prompt-engineering/projeto-de-leitura/12-live-netfibra-langgraph-graphrag-hitl.md), seção "O que é": HITL com `interrupt` num grafo LangGraph.

*Código da questão: 171148*

---

## Questão 03 · CI/CD Copilot e cache no GitHub Actions

**Pergunta:** (Módulo 8) No laboratório de CI/CD Copilot, como o Agente otimizou o `workflow_lento.yaml` do GitHub Actions que levava 10 minutos?

**Alternativas:**
- A) Aumentando a memória do servidor de banco.
- B) Mudando a aplicação de Node.js para Go.
- C) Desativando os testes unitários.
- D) ✅ Analisando o pipeline e reescrevendo o YAML para incluir estratégias de cache (ex.: `actions/cache` do npm).
- E) Exigindo commits menores.

**Resposta: D.** Analisando o pipeline e reescrevendo o YAML para incluir estratégias de cache.

### Resolução comentada

Pipeline lenta com `npm install` a cada execução: o gargalo clássico é baixar todas as dependências do zero toda vez. O agente leu o YAML, notou que não havia cache e propôs reescrever o trecho com `actions/cache`, reutilizando o que já foi baixado.

Use a regra "otimizar sem mudar o resultado": a pipeline otimizada faz o mesmo (instala, compila, testa) e só desperdiça menos. Qualquer alternativa que corte qualidade, troque a tecnologia ou mexa em algo fora da pipeline foge do caso.

O ganho também é financeiro: cada minuto de runner custa, então pipeline mais rápida é menos custo.

### Entenda os conceitos

- **Cache de dependências no GitHub Actions:** reutiliza pacotes baixados entre execuções. A **chave de cache** deriva do lockfile (se o lockfile muda, a chave muda e o cache é invalidado) e as **chaves de restauração** são um plano B.
- **Analogia do guia:** em vez de plantar o cafezal de novo toda manhã, guardar o café moído e só preparar outro se a receita (o lockfile) mudou.
- **`actions/cache` do npm:** no laboratório, `workflow_rapido.yaml` guarda `~/.npm` com chave baseada em `hashFiles('package-lock.json')`.
- **Runner:** ambiente que executa os jobs do CI, hospedado pelo GitHub ou próprio. Tempo de runner tem custo.
- **Gargalos comuns:** camadas Docker mal estruturadas, ausência de cache e uso ineficiente do gerenciador de dependências.
- **Sugestão, não commit:** o agente devolve uma proposta e não altera o arquivo. A estimativa de ganho (2 a 5 minutos por execução, meta de cerca de 60%) é aproximada.
- **Multi-stage build:** estágio de build completo mais estágio final enxuto, para imagens menores. É outro assunto da mesma unidade, não a resposta desta questão.

### Por que as outras erram

- **A:** o gargalo é o runner baixando dependências, não o banco de dados.
- **B:** trocar a linguagem da aplicação é uma reescrita enorme e não resolve o download repetido de dependências.
- **C:** desativar testes reduz a qualidade. O guia alerta contra "otimizar a pipeline cortando testes necessários".
- **E:** commits menores não mudam o que cada execução da pipeline faz.

### Aprofundar no guia

- [07 · CI/CD Copilot](./projeto-de-leitura/07-cicd-copilot-cache-multistage.md), seção "O que é": os itens "Gargalos comuns" e "Cache no GitHub Actions".
- [07 · CI/CD Copilot](./projeto-de-leitura/07-cicd-copilot-cache-multistage.md), seção "Como funciona": a análise do workflow, a reescrita com cache e a estimativa de economia.
- [07 · CI/CD Copilot](./projeto-de-leitura/07-cicd-copilot-cache-multistage.md), seção "No código do repo": `workflow_lento.yaml` x `workflow_rapido.yaml`.
- [07 · CI/CD Copilot](./projeto-de-leitura/07-cicd-copilot-cache-multistage.md), seção "🚫 Armadilhas": chave de cache sem lockfile e confusão entre cache do Docker e cache de dependências.

*Código da questão: 171137*

---

## Questão 04 · Fadiga de alertas e triagem de CVEs

**Pergunta:** (Módulo 7) Scanners tradicionais geram "Fadiga de Alertas". No laboratório de DevSecOps, como o Agente IA filtrou as CVEs do `trivy.json`?

**Alternativas:**
- A) ✅ Filtrando falsos positivos e priorizando só o que tinha risco real de exploração (o backdoor do XZ Utils).
- B) Desativando alertas de criticidade média e baixa.
- C) Apagando o JSON e rodando o scan de novo.
- D) Atualizando o Linux automaticamente toda noite.
- E) Bloqueando deploy de imagens não baseadas em Alpine.

**Resposta: A.** Filtrando falsos positivos e priorizando só o que tinha risco real de exploração (o backdoor do XZ Utils).

### Resolução comentada

O enunciado dá a pista: o problema é excesso de alertas, não falta de scanner. Trivy e Snyk são ótimos em achar vulnerabilidades e ruins em dizer quais importam. A IA entra depois do scan, lê o relatório, descarta o ruído e isola o que é explorável de verdade.

A ideia central é diferenciar "presente" de "explorável". Uma vulnerabilidade pode estar na imagem e nunca ser alcançável. Priorizar é aplicar contexto, não apagar dados nem apertar um filtro fixo de severidade.

No laboratório, o ponto de maior risco é a CVE-2024-3094 (backdoor no XZ Utils). A questão 09 aprofunda por que ela pesa tanto.

### Entenda os conceitos

- **Fadiga de alertas:** excesso de notificações que leva as equipes a ignorarem as críticas. Em segurança, uma imagem pode vir com dezenas ou centenas de itens High/Critical.
- **Falso positivo:** alerta sem risco real naquele contexto (por exemplo, biblioteca que nem é usada ou dependência indireta fora do caminho de execução).
- **Priorização por exploração:** a IA age como segurança experiente. Analogia do guia: o detector de metais apita para fivela, moeda e chave; o segurança separa "é só uma fivela" de "isso aqui é uma arma".
- **Trivy / Snyk:** scanners de vulnerabilidade de imagens e dependências. Continuam fazendo o scan; a IA complementa.
- **CVE:** identificador público de vulnerabilidade.
- **Relatório executivo:** a IA traduz a saída técnica em prioridades e plano de ação para gestores.
- **Trilha de auditoria:** a dica do guia é pedir ao agente que liste também o que foi descartado e por quê, porque ignorar um CVE precisa de justificativa.
- **Limite:** a priorização é opinião de um LLM e pode variar entre execuções.

### Por que as outras erram

- **B:** descartar por severidade é um filtro cego. O guia manda avaliar a exploração real, não só a severidade do scanner, e um item de severidade menor pode importar no contexto.
- **C:** apagar o JSON e escanear de novo gera o mesmo ruído. Não resolve a fadiga de alertas.
- **D:** atualizar o sistema toda noite é rotina de patching, não triagem de relatório, e não aparece no laboratório.
- **E:** bloquear imagens fora do Alpine é uma regra arbitrária que não analisa risco. O guia lembra que Alpine aparece só como exemplo de estágio final enxuto no multi-stage.

### Aprofundar no guia

- [06 · DevSecOps com IA](./projeto-de-leitura/06-devsecops-vulnerability-triage.md), seção "O que é": "Fadiga de alertas em segurança" e "Agente como segurança ofensiva".
- [06 · DevSecOps com IA](./projeto-de-leitura/06-devsecops-vulnerability-triage.md), seção "Como funciona": ferramenta-ponte, tarefa e resultado da aula.
- [06 · DevSecOps com IA](./projeto-de-leitura/06-devsecops-vulnerability-triage.md), seção "No código do repo": o `trivy.json` do laboratório (só 3 CVEs).
- [04 · AIOps e observabilidade preditiva](./projeto-de-leitura/04-predictive-aiops-nl2q-dashboards.md), seção "O que é": o mesmo problema de fadiga de alertas, agora em monitoramento.

*Código da questão: 171135*

---

## Questão 05 · NL2Q (PromQL e LogQL)

**Pergunta:** (Módulo 5) NL2Q (Natural Language to Query) resolve qual dor da Observabilidade?

**Alternativas:**
- A) Falta de testes de integração em microsserviços.
- B) Lentidão nos builds de CI/CD.
- C) ✅ Dificuldade de escrever sintaxes complexas de madrugada, traduzindo perguntas em texto livre (ex.: "taxa de erro do checkout") em queries exatas de PromQL ou LogQL.
- D) Custo de armazenamento de logs no CloudWatch.
- E) Aprovação manual em pull requests.

**Resposta: C.** NL2Q traduz perguntas em texto livre em queries exatas de PromQL ou LogQL.

### Resolução comentada

Decifre a sigla: Natural Language to Query. Linguagem natural entra, consulta sai. Então a dor só pode ser a de quem precisa consultar dados de observabilidade e não domina a sintaxe, especialmente num incidente de madrugada.

Nas alternativas erradas, cada dor pertence a outra área (testes, CI/CD, custo de logs, revisão de PR). Nenhuma tem a ver com traduzir texto em query.

O guia ainda dá um aviso prático: a query gerada precisa ser lida e revisada, porque NL2Q também alucina.

### Entenda os conceitos

- **NL2Q:** o agente traduz "taxa de erro do checkout" para PromQL (métricas) ou LogQL (logs). Democratiza a observabilidade para quem não domina a sintaxe.
- **PromQL:** linguagem de consulta do Prometheus. No laboratório, "taxa de erro" vira `rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])`.
- **LogQL:** linguagem de consulta de logs. O guia cita o Loki de passagem (em "Onde aplicar": consultar Prometheus/Loki em português) e na cola rápida chama LogQL de linguagem das consultas de logs, sem defini-la em detalhe.
- **Observabilidade:** capacidade de entender o estado do sistema por métricas, logs e traces.
- **AIOps:** IA aplicada a operações, interpretando dados operacionais e agindo.
- **Cuidado:** o guia diz que NL2Q não elimina a necessidade de entender PromQL e que a query é código e merece revisão como qualquer outro.
- **Mesma democratização no ChatOps:** o guia compara com o ChatOps, em que o canal vira interface para quem não sabe Terraform ou kubectl.

### Por que as outras erram

- **A:** falta de testes de integração é questão de qualidade de software, sem ligação com consultas de observabilidade.
- **B:** lentidão em builds é o problema do CI/CD Copilot (questão 03), resolvido com cache.
- **D:** custo de armazenamento de logs é tema de FinOps e retenção. NL2Q não reduz esse custo.
- **E:** aprovação manual em PR é fluxo de revisão de código, sem relação com NL2Q.

### Aprofundar no guia

- [04 · AIOps e observabilidade preditiva](./projeto-de-leitura/04-predictive-aiops-nl2q-dashboards.md), seção "O que é": o item "NL2Q (Natural Language to Query)".
- [04 · AIOps e observabilidade preditiva](./projeto-de-leitura/04-predictive-aiops-nl2q-dashboards.md), seção "Como funciona": o passo 1 do fluxo da aula (traduzir "qual a porcentagem de disco livre?" em PromQL).
- [04 · AIOps e observabilidade preditiva](./projeto-de-leitura/04-predictive-aiops-nl2q-dashboards.md), seção "🚫 Armadilhas": achar que NL2Q elimina a necessidade de entender PromQL.
- [03 · Troubleshooting com ReAct](./projeto-de-leitura/03-troubleshooting-react-mttr.md), seção "O que é": PromQL e as métricas de latência e taxa de erro 5xx.

*Código da questão: 171134*

---

## Questão 06 · IaC Copilot e governança

**Pergunta:** (Módulo 2) Qual a principal vantagem do Agente Arquiteto (IaC Copilot) para gerar infraestrutura em nuvem?

**Alternativas:**
- A) Desativa o faturamento da nuvem.
- B) Converte Terraform em Bash.
- C) Compila Java mais rápido.
- D) Substitui a necessidade de conta AWS.
- E) ✅ Gera código HCL (Terraform) validado e garante que a infraestrutura nasça seguindo as políticas de governança da empresa.

**Resposta: E.** Gera código HCL (Terraform) validado e garante que a infraestrutura nasça seguindo as políticas de governança da empresa.

### Resolução comentada

Pergunte-se qual valor o agente agrega além de "escrever Terraform". A resposta do curso é governança: o Arquiteto traduz requisitos em HCL já alinhados às regras da empresa (tags, redes, permissões, região) antes do `terraform apply`.

Isso funciona porque o agente tem contexto organizacional (RAG de políticas, módulo 1) e porque o código passa por revisão de um Auditor com Checkov (segurança) e OPA (regras de negócio). A infraestrutura pode ser tecnicamente segura e ainda violar uma política: por isso as duas camadas.

As alternativas A a D são absurdas (nenhuma ferramenta de IaC desativa fatura, troca de linguagem sem motivo ou dispensa conta de nuvem). A E é a única sobre qualidade e conformidade.

### Entenda os conceitos

- **IaC (Infrastructure as Code) com Terraform:** descreve recursos de forma declarativa, em HCL, com providers e state. Dá rastreabilidade e governança.
- **IaC Copilot:** o Arquiteto gera o Terraform e grava o arquivo (Writer Tool); o Auditor (DevSecOps) revisa com Checkov e OPA. É revisão por pares automatizada.
- **Governança:** regras da empresa aplicadas de forma repetível (nomenclatura, região, tags, acesso). Segundo o guia, as decisões saem da cabeça de poucas pessoas e viram regras consumidas por agentes.
- **Checkov:** análise estática de IaC para boas práticas de segurança (criptografia, acesso público, versionamento), antes do provisionamento ("shift left").
- **OPA (Open Policy Agent):** transforma regras de negócio em código, como soberania de dados (região) e controle de custo (tipo de instância).
- **RAG de políticas:** consulta as regras da empresa antes de gerar. LLM é conhecimento geral; RAG é regra da organização.
- **Conformidade técnica x organizacional:** na demonstração, o Checkov aprovou e o OPA reprovou por região fora da política.
- **Ressalva do guia:** quem gera e quem audita são LLMs e podem errar; o relatório pede leitura humana. "Validado" não significa infalível.

### Por que as outras erram

- **A:** IaC não desativa o faturamento. O guia trata custo à parte, com FinOps, OPA e Infracost.
- **B:** converter Terraform em Bash não é objetivo nem vantagem do Arquiteto. Terraform é declarativo, e o valor está em gerar HCL conforme as regras.
- **C:** compilar Java não tem relação com IaC.
- **D:** a infra continua sendo criada na nuvem do provedor (AWS, GCP, Azure). O agente gera o código, não substitui a conta.

### Aprofundar no guia

- [01 · IaC Copilot](./projeto-de-leitura/01-iac-copilot-terraform-checkov-opa.md), seção "O que é": os itens sobre Checkov, OPA e tradução semântica.
- [01 · IaC Copilot](./projeto-de-leitura/01-iac-copilot-terraform-checkov-opa.md), seção "Como funciona": os dois agentes e a demonstração em que o OPA reprova mesmo com o Checkov aprovando.
- [00 · Da automação à inteligência agêntica](./projeto-de-leitura/00-ai-for-devops-agents-and-nexus-foundation.md), seção "Como funciona": o RAG de padrões corporativos e o "contrato arquitetural" do Módulo 1.
- [01 · IaC Copilot](./projeto-de-leitura/01-iac-copilot-terraform-checkov-opa.md), seção "🚫 Armadilhas": confiar só no Checkov e esquecer as regras do negócio.

*Código da questão: 171133*

---

## Questão 07 · O que é um agente no CrewAI

**Pergunta:** (Módulo 1) Em frameworks de agentes (como CrewAI), o que caracteriza tecnicamente um "Agente"?

**Alternativas:**
- A) Um contêiner Docker isolado para rodar testes.
- B) ✅ Uma entidade com papel definido (Role), objetivo claro (Goal), história (Backstory) e ferramentas à disposição para tomar decisões autônomas.
- C) Um script Python em cron.
- D) A interface gráfica do Prometheus.
- E) Uma chave de API do GitHub.

**Resposta: B.** Entidade com Role, Goal, Backstory e Tools para tomar decisões autônomas.

### Resolução comentada

A questão pede a definição técnica. Um agente não é infraestrutura (contêiner, chave, interface), nem automação fixa (cron): é uma persona configurada, movida por uma LLM, que usa ferramentas para atingir uma meta de forma dinâmica.

Diferencie de um script estático: o script executa passos fixos; o agente decide quais ferramentas usar e como raciocinar. A resolução dá o exemplo do "Especialista em FinOps".

No curso, todo agente é montado desse jeito. O Arquiteto, por exemplo, é um "especialista em AWS e Terraform com foco em governança", com ferramentas de políticas e de escrita de arquivo.

### Entenda os conceitos

- **Agente (guia):** LLM com papel definido, autonomia e ferramentas. A LLM vira "motor de raciocínio" dentro de um sistema que executa tarefas dentro de regras.
- **Role (papel):** a função do agente (por exemplo, SRE, auditor, arquiteto). O guia diz "papel antes de tarefa": um especialista com escopo fechado responde melhor que um modelo genérico.
- **Goal (objetivo):** a meta que o agente persegue (o guia fala em "objetivo").
- **Backstory (história):** o histórico/perfil que molda como o agente raciocina (o guia fala em "histórico"). Exemplo do laboratório: o backstory do agente Safety SRE diz que ele sempre usa dry-run. Os nomes `role`, `goal` e `backstory` como campos do CrewAI vêm da resolução e do uso do framework (o guia usa as palavras "role, objetivo e histórico").
- **Tools (ferramentas):** funções que o agente pode chamar (consultar políticas, escrever arquivo, rodar checagens). Sem ferramentas, o agente só produz texto.
- **CrewAI:** framework Python para equipes de agentes, com fluxo sequencial (parecido com pipeline de CI/CD) e hierárquico (coordenador e executores), que preserva estado e contexto entre etapas.
- **Analogia do guia:** o estagiário brilhante que, com cargo claro, manual da casa (RAG) e ferramentas, entrega algo alinhado ao que a empresa exige. Quem assina embaixo continua sendo você.
- **Um agente por domínio:** princípio do curso. Agente genérico troca de contexto o tempo todo e perde qualidade.

### Por que as outras erram

- **A:** contêiner Docker é artefato de execução (tópico 11). Um agente não é um contêiner, embora possa rodar dentro de um.
- **C:** script em cron é automação fixa e agendada. Falta raciocínio e escolha de ferramentas.
- **D:** a interface do Prometheus é uma ferramenta de observabilidade, não um agente.
- **E:** chave de API é uma credencial de acesso. O agente usa credenciais, mas não é uma.

### Aprofundar no guia

- [00 · Da automação à inteligência agêntica](./projeto-de-leitura/00-ai-for-devops-agents-and-nexus-foundation.md), seção "O que é": os itens "Agentes e frameworks (Aula 2)" e "CrewAI".
- [00 · Da automação à inteligência agêntica](./projeto-de-leitura/00-ai-for-devops-agents-and-nexus-foundation.md), seção "Como funciona": "Papel antes de tarefa".
- [00 · Da automação à inteligência agêntica](./projeto-de-leitura/00-ai-for-devops-agents-and-nexus-foundation.md), seção "Cola rápida": definições de Agente, CrewAI e RAG.
- [10 · Projeto integrador](./projeto-de-leitura/10-multi-agent-hierarchy-final-project.md), seção "O que é": por que especialistas coordenados por um Manager superam um agente único.

*Código da questão: 171132*

---

## Questão 08 · Erro 429 (TPM), max_rpm e rightsizing de modelo

**Pergunta:** (Módulo 12) No processo hierárquico com 4 agentes houve erro crítico de infraestrutura da LLM: `Client error '429 Too Many Requests'` (TPM Limit). Qual a solução sistêmica ideal em AI-Ops?

**Alternativas:**
- A) Mudar o código de Python para GoLang.
- B) Excluir o Agente de FinOps para sempre.
- C) Transformar cada agente em contêiner Docker em clusters separados sem rede.
- D) ✅ Implementar Cooldown definindo `max_rpm` (requisições por minuto) no objeto Crew e otimizar tokens usando um modelo LLM mais rápido e leve (ex.: 8b) só para a função de Gerente.
- E) Reclamar no fórum e aguardar atualização do framework.

**Resposta: D.** Implementar `max_rpm` no objeto Crew e usar um modelo mais leve só para o Gerente.

### Resolução comentada

Leia o erro: 429 significa "muitas requisições" e TPM é "tokens por minuto". O provedor da LLM está dizendo que o projeto consumiu o limite do plano. Não é bug de código nem de rede: é consumo excessivo.

Num processo hierárquico, o Gerente conversa com vários especialistas e consolida tudo, então a troca de contexto é grande e esgota o TPM com facilidade. A resposta sistêmica tem duas frentes: controlar o ritmo (`max_rpm`, um cooldown entre requisições) e gastar menos tokens nas tarefas que não exigem raciocínio denso (um modelo menor para orquestrar).

Esse último ponto é "rightsizing de modelos": modelos menores para orquestração, maiores para raciocínio denso. A mesma lógica do rightsizing de infraestrutura, aplicada a LLMs.

### Entenda os conceitos

- **Erro 429 e rate limit:** o provedor limita requisições e tokens por plano. O guia diz que planos gratuitos ou básicos têm limites restritivos e que mesmo planos pagos têm limites operacionais.
- **TPM (tokens por minuto):** limite de volume de tokens processados por minuto. O guia explica que tokens são a unidade do que o modelo processa e que toda pergunta e resposta consomem tokens.
- **Agentes multiplicam o consumo:** cada tarefa envolve ferramentas, raciocínio intermediário e validações; num multiagente, o gestor consulta vários especialistas e consolida. O guia diz que em volume alto o custo vira fator de arquitetura. Mais agentes significam mais chamadas de LLM, tokens e latência.
- **Processo hierárquico (CrewAI):** modo em que um manager comanda os demais agentes. No projeto integrador, o Nexus Manager coordena SRE, DevSecOps e FinOps.
- **`max_rpm`:** parâmetro do objeto Crew que limita requisições por minuto, criando um cooldown (complemento, fora do material: o guia não cita `max_rpm`; o conceito vem da resolução da prova).
- **Rightsizing de modelo:** usar um modelo leve (ex.: 8b, com 8 bilhões de parâmetros) onde a tarefa é só coordenar, e reservar um maior para raciocínio denso. O guia trata rightsizing só de infraestrutura (CPU e memória); a aplicação a modelos é da resolução. O guia observa que "todo modelo é um trade-off: maiores respondem melhor e exigem mais recursos".
- **Rate limiting como guardrail:** o guia também usa "rate limiting" como defesa para limitar ações da automação (tópico 09), outro uso do mesmo termo.
- **Alternativa local:** o tópico 14 cita modelo local (Ollama) como forma de testar agentes sem gastar tokens nem bater em rate limit.

### Por que as outras erram

- **A:** a linguagem do código não é a causa. O limite é do provedor de LLM, e o guia justifica Python pela proximidade com automação e IA.
- **B:** excluir o agente de FinOps remove capacidade do projeto e não trata o excesso de consumo. É uma solução destrutiva.
- **C:** contêineres isolados e sem rede não resolvem limite de tokens (e agentes sem rede não chamariam a LLM). Containerização é assunto dos tópicos 11 a 14.
- **E:** esperar o framework não é solução sistêmica. O controle de ritmo e de tokens está ao alcance de quem projeta a Crew.

### Aprofundar no guia

- [14 · IA offline com Ollama no Kubernetes](./projeto-de-leitura/14-offline-ai-ollama-on-kubernetes.md), seção "O que é": os itens "Tokens", "Agentes multiplicam o consumo" e o trade-off de tamanho do modelo.
- [10 · Projeto integrador](./projeto-de-leitura/10-multi-agent-hierarchy-final-project.md), seção "Vantagens e limites": "Mais agentes significam mais chamadas de LLM, tokens e latência".
- [10 · Projeto integrador](./projeto-de-leitura/10-multi-agent-hierarchy-final-project.md), seção "No código do repo": a Crew hierárquica com `Process.hierarchical` e o `nexus_manager`.
- [08 · FinOps com IA](./projeto-de-leitura/08-finops-zombie-resources-rightsizing.md), seção "O que é": "Rightsizing" (o conceito original, para infraestrutura).
- [Disciplina 02 · OpenRouter](../02-apis-de-ia-generativa-e-prompt-engineering/projeto-de-leitura/01-openrouter-gateway-multi-modelo.md), seção "O que é": roteamento entre modelos por preço e latência, com fallback.

*Código da questão: 171151*

---

## Questão 09 · XZ Utils, supply chain e prioridade máxima

**Pergunta:** (Módulo 7) Por que o Agente de DevSecOps classificou a vulnerabilidade do liblzma5 (XZ Utils) com prioridade máxima?

**Alternativas:**
- A) Era a única vulnerabilidade no relatório.
- B) Consumia muita RAM.
- C) O desenvolvedor esqueceu de commitar o código.
- D) Pacote obsoleto há mais de 10 anos.
- E) ✅ Identificou a CVE como "Supply Chain Attack" (Backdoor) inserido intencionalmente, e não apenas um bug.

**Resposta: E.** Identificou a CVE como Supply Chain Attack (backdoor) inserido intencionalmente, e não apenas um bug.

### Resolução comentada

A pergunta é sobre o critério da priorização. Um bug é um erro acidental; um backdoor é uma porta aberta deixada de propósito para invasores. Isso muda o risco: o backdoor do XZ permite execução arbitrária de código, o que o guia trata como prioridade máxima com plano de ação imediato (parar o deploy é complemento do revisor, não do guia).

O agente faz o que um analista sênior faria: cruza o relatório do scanner com o contexto da ameaça. O guia também diz que uma única CVE ligada a uma campanha ativa pode pesar mais que todas as outras juntas.

Cuidado com alternativas que parecem técnicas, mas não indicam risco (RAM, idade do pacote, commit esquecido). Prioridade máxima vem de impacto e exploração, não de detalhes operacionais.

### Entenda os conceitos

- **XZ Utils / liblzma:** biblioteca de compressão amplamente usada em Linux. No laboratório, o pacote afetado é `liblzma5` 5.6.0-1, com correção em 5.6.1-1.
- **CVE-2024-3094:** o backdoor no XZ Utils, inserido deliberadamente. No `trivy.json` do laboratório está marcada como CRITICAL.
- **Supply chain attack (ataque à cadeia de suprimentos):** o ataque entra via componentes reutilizados em que todo mundo confia. O guia diz que o risco moderno inclui esse tipo de ataque.
- **Backdoor:** acesso oculto que permite a invasores executarem código. A diferença para um bug comum é a intenção maliciosa.
- **Imagem popular não é imagem segura:** milhões de downloads não garantem ausência de problemas; avalie procedência, mantenedor e selos de verificação.
- **Relatório executivo:** a IA traduz o achado em prioridade e plano de ação (atualizar a lib, verificar impactos secundários).
- **Segunda vulnerabilidade da aula:** uma falha High na MiniZip (zlib), que também aparece com menos destaque, para mostrar que a IA ordena, não ignora.
- **Leitura complementar do curso:** *Securing DevOps* (Vehent) trata ataques à cadeia de suprimentos como o XZ Utils.

### Por que as outras erram

- **A:** o relatório de teste tinha mais de uma vulnerabilidade (no laboratório, 3). Ser única não seria motivo de prioridade, e não é o caso.
- **B:** consumo de RAM não é critério de severidade de segurança.
- **C:** commit esquecido não tem relação com a classificação de uma CVE em uma imagem.
- **D:** idade do pacote não indica exploração. O contexto crítico é o backdoor, não a obsolescência.

### Aprofundar no guia

- [06 · DevSecOps com IA](./projeto-de-leitura/06-devsecops-vulnerability-triage.md), seção "O que é": o item "Caso XZ Utils (CVE-2024-3094)" e "Imagem popular não é imagem segura".
- [06 · DevSecOps com IA](./projeto-de-leitura/06-devsecops-vulnerability-triage.md), seção "Como funciona": o "Resultado da aula" (backdoor com prioridade máxima e a falha da MiniZip).
- [06 · DevSecOps com IA](./projeto-de-leitura/06-devsecops-vulnerability-triage.md), seção "Cola rápida": CVE-2024-3094, supply chain e falso positivo.
- [10 · Projeto integrador](./projeto-de-leitura/10-multi-agent-hierarchy-final-project.md), seção "Como funciona": o cenário em que o backdoor do XZ aparece junto de erro no checkout e custo em alta.

*Código da questão: 171136*

---

## Questão 10 · Dashboards dinâmicos e MTTR

**Pergunta:** (Módulo 5) Em crise, montar painéis leva tempo. Como "Dashboards Dinâmicos" resolvem isso?

**Alternativas:**
- A) ✅ O Agente usa a API do Grafana para ler o contexto do incidente e gerar um modelo JSON on the fly, entregando um dashboard só com o necessário para o troubleshoot daquele momento.
- B) Converter painéis do Grafana em planilhas Excel por e-mail.
- C) Monitor gigante na sala de TI com todos os gráficos piscando.
- D) Templates baixados aleatoriamente durante o alerta.
- E) Bloquear o acesso ao Grafana para só a IA ver as métricas.

**Resposta: A.** O agente lê o contexto do incidente e gera um modelo JSON na hora, com só o necessário para o troubleshoot.

### Resolução comentada

Durante um incidente, o tempo mais caro é o do operador. Montar painel no Grafana (datasource, painéis, visualizações) consome minutos que ele não tem. O dashboard dinâmico troca isso por contexto direcionado: o agente entende o incidente e gera só os painéis relevantes.

O benefício final é menor MTTR, o tempo para recuperar o serviço. A questão pede "como resolve", então procure a alternativa que automatiza a montagem e foca no necessário. Mais gráficos (C), templates aleatórios (D), e-mails (B) ou restrição de acesso (E) não ajudam ninguém a diagnosticar.

### Entenda os conceitos

- **Dashboard dinâmico:** painel gerado pela IA a partir do contexto do incidente. O JSON inclui painéis de métricas, logs e traces conforme a necessidade; no laboratório, um painel de uso de disco e um de taxa de erro.
- **Grafana:** ferramenta de visualização de métricas. O JSON gerado pode ser importado nela. Analogia do guia: montar em segundos o painel exato do incêndio, em vez de meia hora desenhando gráficos com a casa pegando fogo.
- **Contexto direcionado:** mostrar só o necessário para o troubleshoot daquele momento, sem despejar todos os gráficos.
- **MTTR (Mean Time To Recovery/Repair):** tempo para identificar, diagnosticar e corrigir um problema em produção. Quanto menor, menor o impacto.
- **Preditivo + MTTR:** o MTTR acelera a recuperação depois da falha; o preditivo tenta evitá-la. Juntos formam ambientes mais resilientes.
- **Ponto de partida, não produto final:** o guia diz que dashboards automáticos carecem de curadoria e permitem ajustar período e organização.
- **Observação sobre o laboratório:** o guia mostra a geração do JSON e a importação no Grafana; não descreve o agente chamando a "API do Grafana" (veja os "Pontos de atenção").

### Por que as outras erram

- **B:** planilhas por e-mail são lentas e estáticas, o oposto de reduzir o tempo na crise.
- **C:** um monitor gigante com tudo piscando aumenta o ruído e a fadiga de alertas, sem direcionar a atenção.
- **D:** templates aleatórios não têm relação com o incidente e podem mostrar métricas irrelevantes.
- **E:** bloquear o acesso humano ao Grafana contraria a ideia: a IA acelera o trabalho do operador, não o substitui. O guia insiste que a validação final é do profissional.

### Aprofundar no guia

- [04 · AIOps e observabilidade preditiva](./projeto-de-leitura/04-predictive-aiops-nl2q-dashboards.md), seção "O que é": o item "Dashboards dinâmicos".
- [04 · AIOps e observabilidade preditiva](./projeto-de-leitura/04-predictive-aiops-nl2q-dashboards.md), seção "Como funciona": o passo 3 (dashboard "Disk Saturation") e o "Grafana local (Aula 3)".
- [03 · Troubleshooting com ReAct](./projeto-de-leitura/03-troubleshooting-react-mttr.md), seção "O que é": a definição de MTTR e o ciclo ReAct.
- [10 · Projeto integrador](./projeto-de-leitura/10-multi-agent-hierarchy-final-project.md), seção "O que é": "Métricas e ROI", em que o MTTR aparece como indicador de negócio.

*Código da questão: 171144*

---

## Pontos de atenção na prova

- **Módulos:** o "(Módulo N)" dos enunciados corresponde aos laboratórios `labs/moduloN` do curso. O README do guia mapeia cada módulo a um tópico (1 → 00, 2 → 01, 5 → 04, 7 → 06, 8 → 07, 11 → 09, 12 → 10).
- **Questão 01:** o guia explica o dry-run e o fluxo de aprovação, mas não cita a flag `--dry-run=client` nem a diferença entre `client` e `server`. A resposta A segue a resolução. Além disso, o laboratório do guia (`modulo11_guardrails.py`) não executa `kubectl apply --dry-run`: o "dry-run" ali é uma linha impressa, e o slide que sugere `--dry-run` aponta uma flag que o script não processa.
- **Questão 02:** o termo "Alucinação por Viés de Confirmação" vem da prova e não aparece no guia. O material trata apenas o fenômeno real: o agente reportou sucesso mesmo com o humano tendo negado. O guia pede fluxo de aprovação sem ambiguidade, em que rejeitar interrompe tudo e a resposta do agente reflete a decisão, e fala de alucinação de forma geral. O nome do erro e o exemplo de prompt ("encerre IMEDIATAMENTE") seguem a resolução, sem que o material os endosse.
- **Questão 03:** o guia confirma o cache (`actions/cache` com chave do lockfile) e o `workflow_lento.yaml`. O cenário de "10 minutos" vem da aula (pipeline do Checkout em cerca de 10 min), e o guia lembra que as cifras de ganho são estimativas do LLM, não medições.
- **Questão 04:** o guia cobre a triagem e a fadiga de alertas. O `trivy.json` do repositório tem só 3 CVEs (slides e apostila falam em cerca de 50), e a priorização é opinião de LLM, que pode variar entre execuções.
- **Questão 05:** o guia cobre NL2Q, PromQL e LogQL, e cita o Loki só de passagem ("Onde aplicar": consultar Prometheus/Loki em português), sem definir LogQL. No laboratório, o NL2Q é um mapeamento por palavras-chave, não um modelo.
- **Questão 06:** o guia confirma Arquiteto, Auditor, Checkov, OPA e governança. A palavra "validado" convive com a ressalva de que gerador e auditor são LLMs e precisam de revisão humana. O detalhe de "tags, redes e permissões" vem da resolução (o guia cita nomenclatura, região, tags e política de acesso).
- **Questão 07:** o guia descreve agente como "LLM com papel, autonomia e ferramentas" e fala em "role, objetivo e histórico". Os nomes exatos `Role`, `Goal`, `Backstory` e `Tools` do CrewAI vêm da prova e da resolução. O guia também não discute "scripts estáticos" como contraponto direto.
- **Questão 08:** o material não cobre erro 429, TPM, `max_rpm` nem rightsizing de modelo. Ele cobre limites de tokens e de plano (tópico 14), o custo de multiagentes (tópicos 10 e 14), o trade-off de tamanho de modelo e rightsizing de infraestrutura (tópico 08). Além disso, o código do repositório já usa `groq/llama-3.1-8b-instant` em todos os agentes e não define `max_rpm`. A resposta D segue a resolução.
- **Questão 09:** o guia confirma o backdoor como ataque à cadeia de suprimentos, mas não registra literalmente o rótulo "Supply Chain Attack" como critério do agente: ele aparece como explicação do caso e na cola rápida.
- **Questão 10:** o guia fala em gerar o JSON do dashboard e importar no Grafana. Não descreve o agente usando a "API do Grafana": no laboratório, a ferramenta grava `incident_dashboard.json` no disco e a importação é manual. Os dados da demonstração também são simulados. A resposta A segue a resolução.
- **Numeração das unidades:** a apostila rotula as duas aulas da U11 como "PT-1"; o guia manteve o rótulo original.

## Mapa de estudo desta disciplina

| Tema da prova | Tópico do guia que mais cobre |
|---------------|-------------------------------|
| Dry-run, guardrails e auto-remediação (Q01) | [09 · Auto-remediação segura](./projeto-de-leitura/09-runbook-rag-self-healing-guardrails.md) |
| Human-in-the-loop e agente que ignora a recusa (Q02) | [09 · Auto-remediação segura](./projeto-de-leitura/09-runbook-rag-self-healing-guardrails.md) e [05 · ChatOps com governança](./projeto-de-leitura/05-chatops-governance-hitl.md) |
| Cache em CI e `actions/cache` (Q03) | [07 · CI/CD Copilot](./projeto-de-leitura/07-cicd-copilot-cache-multistage.md) |
| Fadiga de alertas e priorização de CVEs (Q04) | [06 · DevSecOps com IA](./projeto-de-leitura/06-devsecops-vulnerability-triage.md) |
| NL2Q, PromQL e LogQL (Q05) | [04 · AIOps e observabilidade preditiva](./projeto-de-leitura/04-predictive-aiops-nl2q-dashboards.md) |
| IaC Copilot e governança (Q06) | [01 · IaC Copilot](./projeto-de-leitura/01-iac-copilot-terraform-checkov-opa.md) |
| Agente no CrewAI: Role, Goal, Backstory, Tools (Q07) | [00 · Da automação à inteligência agêntica](./projeto-de-leitura/00-ai-for-devops-agents-and-nexus-foundation.md) |
| Rate limit, TPM, `max_rpm` e rightsizing de modelo (Q08) | [10 · Projeto integrador](./projeto-de-leitura/10-multi-agent-hierarchy-final-project.md) e [14 · IA offline com Ollama](./projeto-de-leitura/14-offline-ai-ollama-on-kubernetes.md) |
| XZ Utils, CVE-2024-3094 e supply chain (Q09) | [06 · DevSecOps com IA](./projeto-de-leitura/06-devsecops-vulnerability-triage.md) |
| Dashboards dinâmicos e MTTR (Q10) | [04 · AIOps e observabilidade preditiva](./projeto-de-leitura/04-predictive-aiops-nl2q-dashboards.md) e [03 · Troubleshooting com ReAct](./projeto-de-leitura/03-troubleshooting-react-mttr.md) |
