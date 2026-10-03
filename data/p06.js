PRACTICE.push({
 "disc": "06",
 "intro": "Cada técnica aqui roda no Nexus-Bot, o projeto do curso: agentes CrewAI com ferramentas finas, políticas por RAG, e sempre guardrail, dry-run e humano antes de tocar em produção. O padrão se repete: um agente por domínio, evidência real nas ferramentas, execução gated.",
 "items": [
  {
   "title": "Agente com papel, ferramenta e política via RAG",
   "topics": [
    "D6-00"
   ],
   "cenario": "O time de plataforma pede ao LLM um bucket de logs e recebe Terraform genérico: região errada, sem prefixo corporativo, bucket público. Sem as regras da empresa no contexto, o modelo inventa o padrão que mais viu no treino.",
   "passos": [
    "Centralize a conexão com a LLM em um módulo (modelo, temperatura baixa, chave lida de variável de ambiente).",
    "Escreva o agente com <code>role</code>, <code>goal</code> e <code>backstory</code> específicos do domínio (arquiteto cloud com foco em governança).",
    "Exponha as regras da empresa como ferramenta de consulta. Aqui é uma <code>BaseTool</code> com <code>description</code> explícita (o decorator <code>@tool</code> do CrewAI exige docstring, que quebraria a regra de zero comentários) que devolve texto fixo; no curso é um stub, em produção seria busca vetorial sobre a wiki de políticas.",
    "Dê ao agente a ferramenta e uma tarefa com <code>expected_output</code> explícito: desenhar, sem provisionar nada.",
    "Trate a saída como rascunho e valide com o time antes de qualquer <code>apply</code>."
   ],
   "code": {
    "lang": "python",
    "src": "import os\nfrom crewai import LLM, Agent, Task, Crew\nfrom crewai.tools import BaseTool\n\nllm = LLM(\n    model=\"groq/llama-3.1-8b-instant\",\n    api_key=os.getenv(\"GROQ_API_KEY\"),\n    temperature=0.2,\n)\n\n\nclass CheckComplianceRules(BaseTool):\n    name: str = \"check_compliance_rules\"\n    description: str = \"Returns corporate naming, region and security rules.\"\n\n    def _run(self, query: str) -> str:\n        return \"Prefix must be 'nexus-', region must be 'us-east-1', buckets must be private.\"\n\n\narchitect = Agent(\n    role=\"Cloud Architect\",\n    goal=\"Design infrastructure that follows company policy\",\n    backstory=\"AWS and Terraform specialist focused on governance.\",\n    tools=[CheckComplianceRules()],\n    llm=llm,\n)\n\ndesign = Task(\n    description=(\n        \"Design an S3 bucket for application logs. \"\n        \"Consult the policy tool first. Do not create anything.\"\n    ),\n    expected_output=\"A short design with bucket name, region and access rules.\",\n    agent=architect,\n)\n\nprint(Crew(agents=[architect], tasks=[design]).kickoff())"
   },
   "resultado": "O desenho já sai com prefixo, região e acesso privado conforme a política, em vez de depender do palpite do modelo; trocar de modelo muda uma linha.",
   "quandoNao": [
    "Tarefa determinística que um script ou template resolve sem LLM.",
    "Quando as políticas são poucas e cabem num prompt fixo (RAG é exagero).",
    "Quando ninguém vai revisar a saída antes de aplicar."
   ],
   "armadilha": "Prompt vago do tipo «crie um cluster Kubernetes», que deixa provedor, zonas e rede em aberto.",
   "repo": {
    "label": "core (agentes e llm_config)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/core"
   },
   "id": "P6-01"
  },
  {
   "title": "Arquiteto + Auditor: IaC com Checkov e OPA",
   "topics": [
    "D6-01"
   ],
   "cenario": "Um time gera Terraform com IA e o revisor humano vira gargalo. O código passa em segurança técnica, mas viola regra de negócio (região, prefixo, custo) que só quem conhece a empresa pega.",
   "passos": [
    "Crie dois agentes: o Arquiteto grava o <code>main.tf</code> por uma ferramenta de escrita; o Auditor só audita.",
    "Dê ao Auditor duas ferramentas: <code>checkov</code> (boas práticas de segurança) e uma validação das políticas da empresa (OPA no curso, simulada por regras em Python).",
    "Monte um <code>Process.sequential</code>: gerar, depois auditar.",
    "Faça o Auditor devolver um relatório de conformidade com falhas por regra.",
    "Corrija na origem (prompt ou política), não editando o arquivo gerado.",
    "Rode o laço de correção explicitamente: o framework não o faz sozinho."
   ],
   "code": {
    "lang": "python",
    "src": "from crewai import Agent, Task, Crew, Process\nfrom core.llm_config import nexus_llm\nfrom tools.file_writer import write_file\nfrom tools.security_scan import run_checkov_scan, validate_opa_policies\n\narchitect = Agent(\n    role=\"Cloud Architect\",\n    goal=\"Generate Terraform that follows governance rules\",\n    backstory=\"AWS and Terraform specialist.\",\n    tools=[write_file],\n    llm=nexus_llm,\n)\nauditor = Agent(\n    role=\"DevSecOps Engineer\",\n    goal=\"Guarantee security and compliance\",\n    backstory=\"Strict auditor using Checkov and OPA.\",\n    tools=[run_checkov_scan, validate_opa_policies],\n    llm=nexus_llm,\n)\n\ngenerate = Task(\n    description=(\n        \"Write main.tf for a private S3 bucket named nexus-apollo-data in us-east-1.\"\n    ),\n    expected_output=\"main.tf written to disk.\",\n    agent=architect,\n)\naudit = Task(\n    description=(\n        \"Validate main.tf with run_checkov_scan and validate_opa_policies \"\n        \"and report violations.\"\n    ),\n    expected_output=\"Compliance report listing each failed rule.\",\n    agent=auditor,\n    context=[generate],\n)\n\npipeline = Crew(\n    agents=[architect, auditor],\n    tasks=[generate, audit],\n    process=Process.sequential,\n)"
   },
   "resultado": "Cada Terraform gerado passa por duas barreiras automáticas antes de chegar a uma pessoa; o revisor vê só o que falhou.",
   "quandoNao": [
    "Módulo Terraform trivial e já padronizado por template.",
    "Time sem políticas escritas: não há o que o OPA validar.",
    "Quando Checkov e OPA já rodam no CI e a IA só duplicaria a checagem."
   ],
   "armadilha": "Confiar só no Checkov e esquecer as regras do negócio (região, custo, nomenclatura).",
   "repo": {
    "label": "modulo06-aiops-engenharia-agentica/labs/modulo2_iac_copilot.py",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/labs/modulo2_iac_copilot.py"
   },
   "id": "P6-02"
  },
  {
   "title": "Manifesto K8s por template + restrições no prompt",
   "topics": [
    "D6-02"
   ],
   "cenario": "Um dev pede à IA «um deployment do meu app» e recebe YAML com imagem inexistente e <code>readinessProbe</code> escrito errado: o deploy falha na sexta à noite.",
   "passos": [
    "Faça a ferramenta ser um template com <code>apiVersion</code>, <code>kind</code> e probe fixos (aqui <code>string.Template</code>, que evita escapar as chaves do YAML).",
    "Deixe o agente preencher só nome, réplicas e porta, com tipos explícitos nos parâmetros.",
    "No prompt, exija imagem pública válida e a grafia exata de <code>readinessProbe</code>.",
    "Inclua o Service como ponto estável (pods mudam de IP): no repo ele vai no mesmo template, com <code>---</code>; o trecho acima mostra só o Deployment para caber na tela.",
    "Fixe a versão da imagem (no lab é <code>nginx:latest</code>, o que fere reprodutibilidade; em produção use tag fixa).",
    "Valide com <code>kubectl apply --dry-run=client</code> antes de aplicar."
   ],
   "code": {
    "lang": "python",
    "src": "from pathlib import Path\nfrom string import Template\nfrom crewai.tools import BaseTool\n\nTEMPLATE = Template(\"\"\"apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: $name\nspec:\n  replicas: $replicas\n  selector:\n    matchLabels:\n      app: $name\n  template:\n    metadata:\n      labels:\n        app: $name\n    spec:\n      containers:\n      - name: $name\n        image: nginx:1.27\n        ports:\n        - containerPort: $port\n        readinessProbe:\n          httpGet:\n            path: /\n            port: $port\n\"\"\")\n\n\nclass GenerateK8sManifest(BaseTool):\n    name: str = \"generate_k8s_manifest\"\n    description: str = \"Writes a Deployment manifest for the given app.\"\n\n    def _run(self, app_name: str, replicas: int, port: int) -> str:\n        filename = f\"{app_name}-k8s.yaml\"\n        values = dict(name=app_name, replicas=replicas, port=port)\n        Path(filename).write_text(TEMPLATE.substitute(values), encoding=\"utf-8\")\n        return f\"manifest written to {filename}\""
   },
   "resultado": "O YAML sai sempre válido e com probe, porque a robustez está no template e não na criatividade do modelo.",
   "quandoNao": [
    "Workload que exige Helm/Kustomize com muitos ambientes: o template em string vira dívida.",
    "Quando o time já tem um chart padrão aprovado.",
    "Prod real sem GitOps: não deixe o agente aplicar direto."
   ],
   "armadilha": "Achar que a robustez vem da «esperteza» da LLM quando vem do template.",
   "repo": {
    "label": "modulo06-aiops-engenharia-agentica/tools/k8s_ops.py",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/tools/k8s_ops.py"
   },
   "id": "P6-03"
  },
  {
   "title": "Reconciliação com Canary Analyzer (promover ou reverter)",
   "topics": [
    "D6-02"
   ],
   "cenario": "Um rollout novo vai para 100% do tráfego e só se descobre o erro pelo cliente. Sem um critério objetivo, a decisão de promover ou voltar vira opinião no meio do incidente.",
   "passos": [
    "Aplique o manifesto com <code>kubectl apply</code> (reconciliação do estado desejado).",
    "Libere a versão nova para uma fração pequena do tráfego.",
    "Meça taxa de erro e latência da versão canary e da estável.",
    "Compare com limites explícitos e devolva uma decisão: <code>promote</code> ou <code>rollback</code>.",
    "O agente SRE só executa a decisão; o critério é código. Aviso: no lab o analisador é simulado, aqui é uma simplificação.",
    "Registre a decisão e as métricas que a justificaram."
   ],
   "code": {
    "lang": "python",
    "src": "from dataclasses import dataclass\n\n\n@dataclass(frozen=True)\nclass CanaryMetrics:\n    error_rate: float\n    p95_latency_ms: float\n\n\ndef decide_rollout(\n    canary: CanaryMetrics,\n    stable: CanaryMetrics,\n    max_error_delta: float = 0.01,\n    max_latency_ratio: float = 1.2,\n) -> str:\n    if canary.error_rate - stable.error_rate > max_error_delta:\n        return \"rollback\"\n    if canary.p95_latency_ms > stable.p95_latency_ms * max_latency_ratio:\n        return \"rollback\"\n    return \"promote\"\n\n\nprint(decide_rollout(CanaryMetrics(0.002, 180.0), CanaryMetrics(0.001, 170.0)))"
   },
   "resultado": "A promoção deixa de ser julgamento no calor do momento e vira regra auditável; versões ruins são revertidas com 1-5% do tráfego exposto.",
   "quandoNao": [
    "Serviço com pouco tráfego: a amostra do canary não tem significância.",
    "Mudança de schema irreversível, onde rollback não existe.",
    "Ambiente de dev, onde apply direto basta."
   ],
   "armadilha": "Considerar o Canary Analyzer do lab equivalente a uma análise real de produção.",
   "repo": {
    "label": "tools/k8s_ops.py e labs/modulo3_k8s_ops.py",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/tools/k8s_ops.py"
   },
   "id": "P6-04"
  },
  {
   "title": "Troubleshooting ReAct com Prometheus, Jaeger e pods",
   "topics": [
    "D6-03"
   ],
   "cenario": "Às 3h o checkout retorna 500. O on-call abre cinco abas (métricas, traces, pods, logs) e correlaciona na mão, gastando 40 minutos para achar que o limite de memória estava errado.",
   "passos": [
    "Crie ferramentas finas, uma por fonte: consulta Prometheus, consulta Jaeger, inspeção de pods (no curso, Prometheus e Jaeger são simulados).",
    "Dê ao agente on-call o perfil ReAct (no repo há também <code>suggest_fix</code>): pensar, agir, observar, repetir.",
    "Descreva a tarefa com o sintoma, sem a causa, e peça causa raiz e correção sugerida.",
    "Exija no <code>expected_output</code> a evidência de cada fonte, não só o veredito.",
    "A correção sugerida passa por revisão humana; reiniciar pod não resolve limite errado.",
    "Compare o tempo até a causa raiz com e sem o agente para medir o MTTR."
   ],
   "code": {
    "lang": "python",
    "src": "from crewai import Agent, Task, Crew\nfrom core.llm_config import nexus_llm\nfrom tools.obs_tools import query_prometheus_metrics, query_jaeger_traces\nfrom tools.k8s_diag import inspect_pod_failure\n\noncall = Agent(\n    role=\"On-Call SRE\",\n    goal=\"Find the root cause of checkout failures and cut MTTR\",\n    backstory=\"Thinks before acting, observes results and correlates evidence.\",\n    tools=[query_prometheus_metrics, query_jaeger_traces, inspect_pod_failure],\n    llm=nexus_llm,\n)\n\ninvestigate = Task(\n    description=(\n        \"The checkout service returns HTTP 500. \"\n        \"Check error metrics, traces and pod state, then propose a fix.\"\n    ),\n    expected_output=(\n        \"Root cause with evidence from metrics, traces and pods, plus a proposed fix.\"\n    ),\n    agent=oncall,\n)\n\nprint(Crew(agents=[oncall], tasks=[investigate]).kickoff())"
   },
   "resultado": "O agente entrega a correlação métricas-traces-pods em minutos; a meta é cortar o tempo de diagnóstico, não substituir o on-call.",
   "quandoNao": [
    "Incidente já conhecido com runbook de um passo.",
    "Sem acesso a dados reais: com fontes simuladas o agente só treina.",
    "Falha de infraestrutura fora do cluster que as ferramentas não enxergam."
   ],
   "armadilha": "Trocar a causa raiz pelo sintoma: reiniciar pod não conserta um limite de memória errado.",
   "repo": {
    "label": "modulo06-aiops-engenharia-agentica/labs/modulo4_troubleshooting.py",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/labs/modulo4_troubleshooting.py"
   },
   "id": "P6-05"
  },
  {
   "title": "NL2Q e alerta preditivo de saturação",
   "topics": [
    "D6-04"
   ],
   "cenario": "O disco do banco enche todo trimestre e o alerta só toca em 95%, quando já é tarde. Ninguém no time lembra a PromQL exata para consultar disco livre.",
   "passos": [
    "Traduza a pergunta em linguagem natural para PromQL com uma ferramenta dedicada (NL2Q).",
    "Valide a query gerada contra o Prometheus antes de confiar nela.",
    "Projete a saturação a partir do histórico: no exemplo da aula, 85% de uso e +2 GB/h.",
    "Dispare alerta com antecedência (ex.: saturação prevista em menos de 4 h, como na regra abaixo), não por limiar fixo.",
    "No curso o modelo preditivo é uma simulação; em produção use <code>predict_linear</code> do PromQL ou Prophet."
   ],
   "code": {
    "lang": "yaml",
    "src": "groups:\n  - name: disk-saturation\n    rules:\n      - alert: DiskWillFillIn4Hours\n        expr: predict_linear(node_filesystem_avail_bytes{mountpoint=\"/\"}[1h], 4 * 3600) < 0\n        for: 10m\n        labels:\n          severity: warning\n        annotations:\n          summary: \"Disk on {{ $labels.instance }} predicted to fill within 4 hours\""
   },
   "resultado": "O alerta chega horas antes da queda, com tempo para agir em horário comercial.",
   "quandoNao": [
    "Métrica com sazonalidade forte sem modelo que a capture.",
    "Pouco histórico: a projeção é ruído.",
    "Recurso que enche de forma abrupta (log bomb), onde a tendência não ajuda."
   ],
   "armadilha": "Confiar numa previsão sem checar os dados de entrada.",
   "repo": {
    "label": "modulo06-aiops-engenharia-agentica/tools/aiops_tools.py",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/tools/aiops_tools.py"
   },
   "id": "P6-06"
  },
  {
   "title": "Dashboard Grafana gerado como JSON",
   "topics": [
    "D6-04"
   ],
   "cenario": "Cada incidente pede um painel novo e o time gasta meia hora montando na mão, ou fica sem. O conhecimento do painel «bom» não é replicável.",
   "passos": [
    "Peça ao agente o JSON do dashboard a partir do contexto do incidente (ex.: Disk Saturation).",
    "Use um esquema mínimo (título, painéis, queries) e valide o JSON antes de importar.",
    "Importe pela UI (Import dashboard) ou pela API <code>POST /api/dashboards/db</code>, que espera o JSON embrulhado em <code>{\"dashboard\": ..., \"overwrite\": true}</code>; escolha o datasource Prometheus no painel (o esquema mínimo acima não o declara).",
    "Versione o JSON no repositório junto do serviço.",
    "Revise as queries: o agente pode referenciar métricas que não existem no seu ambiente."
   ],
   "code": {
    "lang": "json",
    "src": "{\n  \"title\": \"Disk Saturation\",\n  \"panels\": [\n    {\n      \"type\": \"timeseries\",\n      \"title\": \"Disk usage percent\",\n      \"targets\": [\n        {\n          \"refId\": \"A\",\n          \"expr\": \"100 * (1 - node_filesystem_avail_bytes{mountpoint=\\\"/\\\"} / node_filesystem_size_bytes{mountpoint=\\\"/\\\"})\"\n        }\n      ]\n    },\n    {\n      \"type\": \"stat\",\n      \"title\": \"Hours until full\",\n      \"targets\": [\n        {\n          \"refId\": \"A\",\n          \"expr\": \"node_filesystem_avail_bytes{mountpoint=\\\"/\\\"} / -deriv(node_filesystem_avail_bytes{mountpoint=\\\"/\\\"}[1h]) / 3600\"\n        }\n      ]\n    }\n  ]\n}"
   },
   "resultado": "Painel de incidente em segundos, versionável e igual para todo o time.",
   "quandoNao": [
    "Dashboards críticos de negócio, que merecem design humano.",
    "Quando não há convenção de métricas no ambiente.",
    "Painel que será usado uma vez só e pode ser feito no Explore."
   ],
   "armadilha": "Achar que «NL2Q» elimina a necessidade de entender PromQL.",
   "repo": {
    "label": "modulo06-aiops-engenharia-agentica/incident_dashboard.json",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/incident_dashboard.json"
   },
   "id": "P6-07"
  },
  {
   "title": "ChatOps com RBAC e Human-in-the-Loop",
   "topics": [
    "D6-05"
   ],
   "cenario": "Alguém escreve no Slack «destrói o ambiente de staging» e o bot executa. Sem identidade verificada nem aprovação, o chat vira superfície de ataque.",
   "passos": [
    "Classifique as ações por risco: consulta segue direto, destrutiva exige aprovação.",
    "Verifique a identidade do solicitante fora do texto da mensagem (RBAC: «pode?»).",
    "Para ação destrutiva, exija aprovação de um segundo humano autorizado (HITL: «alguém aprova?»).",
    "Mantenha o segredo de aprovação fora do alcance do modelo (no lab é uma string fixa, o que é só didático).",
    "Registre quem pediu, quem aprovou e o resultado."
   ],
   "code": {
    "lang": "python",
    "src": "from dataclasses import dataclass\n\nDESTRUCTIVE_WORDS = (\"destroy\", \"delete\", \"drop\")\nROLES_ALLOWED_TO_REQUEST = {\"sre\", \"platform\"}\nROLES_ALLOWED_TO_APPROVE = {\"manager\"}\n\n\n@dataclass(frozen=True)\nclass Actor:\n    user_id: str\n    role: str\n\n\ndef authorize(command: str, requester: Actor, approver: Actor | None) -> str:\n    destructive = any(word in command.lower() for word in DESTRUCTIVE_WORDS)\n    if requester.role not in ROLES_ALLOWED_TO_REQUEST:\n        return \"denied: requester lacks permission\"\n    if not destructive:\n        return \"allowed\"\n    if approver is None or approver.role not in ROLES_ALLOWED_TO_APPROVE:\n        return \"blocked: human approval required\"\n    if approver.user_id == requester.user_id:\n        return \"blocked: self approval not allowed\"\n    return \"allowed with approval\""
   },
   "resultado": "Nenhuma ação destrutiva sai do chat sem identidade verificada e segundo par de olhos, com trilha de auditoria.",
   "quandoNao": [
    "Ferramenta interna de um só dono, sem risco de blast radius.",
    "Quando um pipeline com PR e aprovação já cobre o fluxo.",
    "Consultas read-only, onde HITL só atrasa."
   ],
   "armadilha": "Achar que HITL e RBAC são a mesma coisa: um é «pode?», o outro «alguém aprova?».",
   "repo": {
    "label": "tools/chatops_tools.py e ui/app.py",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/tools/chatops_tools.py"
   },
   "id": "P6-08"
  },
  {
   "title": "Triagem de vulnerabilidades do Trivy",
   "topics": [
    "D6-06"
   ],
   "cenario": "O scanner despeja 300 CVEs por imagem e o time ignora todos. Um backdoor como o do XZ Utils fica enterrado entre falsos positivos.",
   "passos": [
    "Use um agente só de segurança, sem acesso a infra.",
    "Dê a ele o JSON do scanner por uma ferramenta de leitura.",
    "Peça priorização por explorabilidade (exploit público, serviço exposto), não só por severidade.",
    "Exija uma lista explícita do que foi descartado e por quê.",
    "Faça checagem específica de CVEs de alto impacto (ex.: CVE-2024-3094).",
    "Gere o relatório executivo com plano de ação."
   ],
   "code": {
    "lang": "python",
    "src": "import json\nfrom crewai import Agent, Task, Crew\nfrom crewai.tools import BaseTool\nfrom core.llm_config import nexus_llm\n\n\nclass ReadTrivyReport(BaseTool):\n    name: str = \"read_trivy_report\"\n    description: str = \"Reads a Trivy JSON report from disk.\"\n\n    def _run(self, path: str) -> str:\n        with open(path, \"r\", encoding=\"utf-8\") as file:\n            return json.dumps(json.load(file))\n\n\nanalyst = Agent(\n    role=\"DevSecOps Analyst\",\n    goal=\"Prioritize exploitable vulnerabilities and discard noise with justification\",\n    backstory=\"Offensive security specialist.\",\n    tools=[ReadTrivyReport()],\n    llm=nexus_llm,\n)\n\ntriage = Task(\n    description=(\n        \"Read data/trivy.json, check CVE-2024-3094 specifically, \"\n        \"list what you discarded and why, and prioritize the rest.\"\n    ),\n    expected_output=\"Executive report with prioritized findings, discarded items and an action plan.\",\n    agent=analyst,\n)\n\nprint(Crew(agents=[analyst], tasks=[triage]).kickoff())"
   },
   "resultado": "A fila de correção cai de centenas para poucos itens acionáveis, com o descarte documentado.",
   "quandoNao": [
    "Imagens sem exposição externa e baixo risco, onde a política do scanner basta.",
    "Quando exigem decisão formal de compliance sem IA no loop.",
    "Sem o relatório real do scanner: não peça ao modelo para «lembrar» CVEs."
   ],
   "armadilha": "Deixar a IA «sumir» com vulnerabilidades sem registro do que foi descartado.",
   "repo": {
    "label": "labs/modulo7_devsecops.py e data/trivy.json",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/labs/modulo7_devsecops.py"
   },
   "id": "P6-09"
  },
  {
   "title": "Cache de dependências no CI com chave do lockfile",
   "topics": [
    "D6-07"
   ],
   "cenario": "O pipeline do checkout leva ~10 minutos porque reinstala todas as dependências a cada commit, queimando minutos de runner e a paciência do time.",
   "passos": [
    "Entregue o workflow lento ao agente de plataforma e peça o gargalo.",
    "Cache no diretório <code>~/.npm</code> com chave derivada de <code>hashFiles('package-lock.json')</code>.",
    "Use <code>restore-keys</code> como fallback para cache parcial.",
    "Valide o YAML antes de commitar (a sugestão da IA pode vir inválida).",
    "Meça o tempo antes e depois; a meta da aula é cerca de 60% de redução.",
    "Não corte testes para ganhar tempo."
   ],
   "code": {
    "lang": "yaml",
    "src": "name: CI Checkout Service\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/cache@v4\n        with:\n          path: ~/.npm\n          key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}\n          restore-keys: |\n            ${{ runner.os }}-node-\n      - run: npm ci\n      - run: npm run build\n      - run: npm test"
   },
   "resultado": "Instalação cai de minutos para segundos em cache hit; o tempo total tende a cair na faixa de 40-60%.",
   "quandoNao": [
    "Pipeline já curto (poucos minutos).",
    "Dependências que mudam em todo commit.",
    "Projeto sem lockfile: a chave não representa o conteúdo."
   ],
   "armadilha": "Cachear sem chave derivada do lockfile (ou com chave que nunca muda).",
   "repo": {
    "label": "data/workflow_lento.yaml e data/workflow_rapido.yaml",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/data/workflow_rapido.yaml"
   },
   "id": "P6-10"
  },
  {
   "title": "Multi-stage build e rollback pós-deploy",
   "topics": [
    "D6-07",
    "D6-11"
   ],
   "cenario": "A imagem de produção carrega compilador e ferramentas de build (centenas de MB) e, quando uma versão ruim sobe, ninguém sabe voltar rápido.",
   "passos": [
    "Separe o build do runtime em dois estágios do Dockerfile.",
    "Copie para o estágio final só o artefato necessário.",
    "Use imagem final <code>slim</code> e execute sem root.",
    "Aplique a versão com rollout gradual (<code>kubectl rollout status</code>; Canary de verdade pede Argo Rollouts ou service mesh) e acompanhe a saúde.",
    "Se a verificação falhar, reverta com <code>kubectl rollout undo</code>.",
    "Tagueie imagens com versão imutável para permitir o retorno."
   ],
   "code": {
    "lang": "bash",
    "src": "cat > Dockerfile <<'EOF'\nFROM node:22 AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:22-slim\nWORKDIR /app\nCOPY --from=build /app/package*.json ./\nRUN npm ci --omit=dev\nCOPY --from=build /app/dist ./dist\nUSER node\nCMD [\"node\", \"dist/main.js\"]\nEOF\ndocker build -t \"$REGISTRY/checkout-api:v2.1.0\" .\ndocker push \"$REGISTRY/checkout-api:v2.1.0\"\nkubectl set image deployment/checkout-api checkout-api=\"$REGISTRY/checkout-api:v2.1.0\"\nif ! kubectl rollout status deployment/checkout-api --timeout=120s; then\n  kubectl rollout undo deployment/checkout-api\n  exit 1\nfi"
   },
   "resultado": "Imagem menor, superfície de ataque reduzida e retorno à versão anterior em segundos quando o rollout falha.",
   "quandoNao": [
    "Linguagem interpretada simples sem etapa de build.",
    "Banco com migração irreversível acoplada ao deploy.",
    "Ambiente sem verificação de saúde confiável: rollback automático decide errado."
   ],
   "armadilha": "Confundir cache do Docker (camadas) com cache de dependências do CI.",
   "repo": {
    "label": "modulo06-aiops-engenharia-agentica/Dockerfile",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/Dockerfile"
   },
   "id": "P6-11"
  },
  {
   "title": "FinOps: zumbis e rightsizing a partir do inventário",
   "topics": [
    "D6-08"
   ],
   "cenario": "A fatura cresce todo mês e ninguém sabe por quê: volumes EBS soltos, IPs sem uso, uma m5.4xlarge a 2,5% de CPU.",
   "passos": [
    "Exporte o inventário em JSON (pode vir do state do Terraform).",
    "Peça ao agente itens zumbis, superdimensionados, volumes sem uso e IPs soltos, com custo mensal.",
    "Calcule a economia por ação em código, não no modelo.",
    "Valide dono e dependência antes de remover qualquer recurso.",
    "Dimensione por percentil de uso em janela longa, não por pico isolado.",
    "Configure alertas de orçamento."
   ],
   "code": {
    "lang": "python",
    "src": "import json\n\nwith open(\"data/inventario_cloud.json\", \"r\", encoding=\"utf-8\") as file:\n    inventory = json.load(file)\n\nZOMBIE_STATUSES = {\"available\", \"unassociated\"}\nCPU_LIMIT_PERCENT = 5.0\n\n\ndef cpu_percent(resource: dict) -> float | None:\n    raw = resource.get(\"avg_cpu_utilization\")\n    return float(raw.rstrip(\"%\")) if raw else None\n\n\nzombies = [r for r in inventory[\"resources\"] if r.get(\"status\") in ZOMBIE_STATUSES]\noversized = [\n    r for r in inventory[\"resources\"]\n    if (cpu_percent(r) or 100.0) < CPU_LIMIT_PERCENT\n]\nsavings = sum(r[\"cost_per_month\"] for r in zombies)\nprint(len(zombies), len(oversized), savings)"
   },
   "resultado": "No inventário do lab, volume solto e IP ocioso somam US$ 55/mês; a instância sobredimensionada (US$ 340) é candidata a rightsizing.",
   "quandoNao": [
    "Conta pequena em que o esforço custa mais que a economia.",
    "Recursos de DR/backup que parecem ociosos de propósito.",
    "Sem tags de dono: a remoção é um risco."
   ],
   "armadilha": "Remover um recurso «órfão» sem checar dono e dependência.",
   "repo": {
    "label": "labs/modulo9_finops.py e data/inventario_cloud.json",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/data/inventario_cloud.json"
   },
   "id": "P6-12"
  },
  {
   "title": "RAG de runbook e rascunho de postmortem",
   "topics": [
    "D6-09"
   ],
   "cenario": "O banco lota de conexões ociosas e o on-call, novo no time, não acha o runbook certo em meio a wikis antigas.",
   "passos": [
    "Indexe os runbooks por serviço (banco, cluster, rede).",
    "Faça a ferramenta consultar o runbook do serviço afetado, não todos.",
    "Dê ao agente SRE a regra de basear a resposta no runbook e citar o trecho.",
    "Peça um rascunho de postmortem (resumo, causa, linha do tempo, ações).",
    "Humano revisa e aprova antes de publicar ou atualizar o runbook.",
    "No curso o RAG é um arquivo lido por ferramenta (<code>data/runbook_db.md</code>), sem busca vetorial."
   ],
   "code": {
    "lang": "python",
    "src": "from pathlib import Path\nfrom crewai.tools import BaseTool\n\nRUNBOOKS = {\"database\": Path(\"data/runbook_db.md\")}\n\n\nclass LookupRunbook(BaseTool):\n    name: str = \"lookup_runbook\"\n    description: str = \"Returns the runbook for the affected service kind.\"\n\n    def _run(self, service_kind: str) -> str:\n        path = RUNBOOKS.get(service_kind.lower())\n        if path is None or not path.exists():\n            return f\"no runbook found for {service_kind}\"\n        return path.read_text(encoding=\"utf-8\")"
   },
   "resultado": "Resposta e postmortem partem de conhecimento da própria empresa; o tempo para a primeira ação correta cai e o aprendizado vira documento.",
   "quandoNao": [
    "Runbooks desatualizados: o agente propaga o erro.",
    "Poucos serviços com procedimento óbvio.",
    "Incidente inédito, sem runbook que o cubra."
   ],
   "armadilha": "Deixar o agente alterar também a documentação/runbook sem revisão.",
   "repo": {
    "label": "labs/modulo10_remediation.py e data/runbook_db.md",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/data/runbook_db.md"
   },
   "id": "P6-13"
  },
  {
   "title": "Guardrail: dry-run + aprovação humana antes de aplicar",
   "topics": [
    "D6-09"
   ],
   "cenario": "A IA propõe um fix para o deploy quebrado. Se ela mesma aplicar em produção com base numa hipótese, um erro pequeno vira um incidente maior.",
   "passos": [
    "Separe sugerir e executar: o agente só chama uma ferramenta guardada.",
    "A ferramenta roda <code>kubectl apply --dry-run=server</code> e mostra o resultado.",
    "Mostre o diff ao humano e peça aprovação explícita.",
    "Só aplique com <code>yes</code> (o prompt do snippet); qualquer outra resposta cancela e interrompe o fluxo.",
    "Adicione rate limit e Canary Rollback como guardrails extras.",
    "No lab o dry-run é simulado com um <code>print</code>; aqui ele executa de fato."
   ],
   "code": {
    "lang": "python",
    "src": "import subprocess\nfrom crewai.tools import BaseTool\n\n\ndef run_kubectl(args: list[str]) -> subprocess.CompletedProcess:\n    return subprocess.run([\"kubectl\", *args], capture_output=True, text=True, check=False)\n\n\nclass ApplyFixWithGuardrails(BaseTool):\n    name: str = \"apply_fix_with_guardrails\"\n    description: str = \"Runs a server-side dry-run and applies only after explicit human approval.\"\n\n    def _run(self, manifest_path: str) -> str:\n        dry_run = run_kubectl([\"apply\", \"-f\", manifest_path, \"--dry-run=server\"])\n        if dry_run.returncode != 0:\n            return f\"dry-run failed: {dry_run.stderr.strip()}\"\n        print(dry_run.stdout)\n        answer = input(\"Apply this change to production? (yes/no): \")\n        if answer.strip().lower() != \"yes\":\n            return \"cancelled by engineer\"\n        applied = run_kubectl([\"apply\", \"-f\", manifest_path])\n        return applied.stdout.strip() or applied.stderr.strip()"
   },
   "resultado": "Nenhuma mudança chega ao cluster sem simulação real e aprovação registrada; rejeitar realmente interrompe.",
   "quandoNao": [
    "Ambiente efêmero de dev.",
    "Correções triviais já cobertas por GitOps com PR.",
    "Quando o humano aprova no automático (fadiga de aprovação) e o guardrail vira teatro."
   ],
   "armadilha": "Dry-run que apenas imprime «sucesso» sem executar a simulação real.",
   "repo": {
    "label": "modulo06-aiops-engenharia-agentica/labs/modulo11_guardrails.py",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/labs/modulo11_guardrails.py"
   },
   "id": "P6-14"
  },
  {
   "title": "Orquestração hierárquica com Manager e Game Day",
   "topics": [
    "D6-10"
   ],
   "cenario": "Numa noite o checkout cai, um CVE crítico aparece e o custo sobe 40%. Três times, três dashboards, ninguém correlaciona causa e efeito e a diretoria quer um relatório.",
   "passos": [
    "Crie especialistas (SRE, Segurança, FinOps), cada um com seu escopo.",
    "Use o Manager do repo (<code>allow_delegation=True</code>), sem ferramentas de execução.",
    "Descreva a missão multidomínio em uma única <code>Task</code> dona do Manager.",
    "Monte a <code>Crew</code> com <code>Process.hierarchical</code> e <code>manager_agent</code>.",
    "Peça relatório executivo com problema, riscos, ações, MTTR e economia.",
    "Ações críticas continuam passando por HITL; o Game Day é simulação, não prova de produção."
   ],
   "code": {
    "lang": "python",
    "src": "from crewai import Crew, Task, Process\nfrom core.agents import (\n    get_nexus_manager_agent,\n    get_oncall_sre,\n    get_devsecops_agent,\n    get_finops_agent,\n)\n\nsre = get_oncall_sre()\nsecurity = get_devsecops_agent()\nfinops = get_finops_agent()\nmanager = get_nexus_manager_agent()\n\nincident = Task(\n    description=(\n        \"Checkout is down (500), a critical XZ backdoor was flagged, \"\n        \"cost rose 40% in the last hour. \"\n        \"Delegate to SRE, Security and FinOps and consolidate.\"\n    ),\n    expected_output=\"Executive report with actions taken, residual risk, MTTR and savings.\",\n    agent=manager,\n)\n\ncrew = Crew(\n    agents=[sre, security, finops],\n    tasks=[incident],\n    process=Process.hierarchical,\n    manager_agent=manager,\n    memory=False,\n)"
   },
   "resultado": "Um único relatório correlaciona incidente, risco e custo em linguagem de negócio, com o ROI de cada ação.",
   "quandoNao": [
    "Problema de um só domínio: um agente basta.",
    "Orçamento de tokens apertado: o Manager multiplica chamadas.",
    "Sem números reais para o ROI."
   ],
   "armadilha": "Medir ROI com números inventados pelo modelo.",
   "repo": {
    "label": "modulo06-aiops-engenharia-agentica/labs/modulo12_projeto_final.py",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/labs/modulo12_projeto_final.py"
   },
   "id": "P6-15"
  },
  {
   "title": "Docker: artefato imutável do agente",
   "topics": [
    "D6-11"
   ],
   "cenario": "O bot funciona na máquina do autor e quebra no CI por versão diferente de Python e dependência. Pior: alguém commita o <code>.env</code> com a chave da API.",
   "passos": [
    "Parta de <code>python:3.12-slim</code>.",
    "Copie <code>requirements.txt</code> antes do código para aproveitar o cache de camadas.",
    "Instale com <code>pip --no-cache-dir</code>.",
    "Crie um <code>.dockerignore</code> com <code>.env</code>, <code>venv</code> e <code>.git</code>.",
    "Passe a chave por variável de ambiente em runtime, nunca na imagem.",
    "Use tags de versão, não só <code>latest</code>."
   ],
   "code": {
    "lang": "bash",
    "src": "docker build -t nexus-bot:v1 .\ndocker run --rm -e GROQ_API_KEY=\"$GROQ_API_KEY\" nexus-bot:v1\ndocker images nexus-bot:v1"
   },
   "resultado": "Mesmo comportamento em qualquer máquina, imagem enxuta e rastreável por tag; a chave nunca entra na imagem.",
   "quandoNao": [
    "Script de uso único local.",
    "Quando o runtime já é gerenciado (Lambda zip, por exemplo).",
    "GPU ou drivers específicos que exigem imagem base própria."
   ],
   "armadilha": "Colocar a chave de API no Dockerfile, no código ou na imagem.",
   "repo": {
    "label": "modulo06-aiops-engenharia-agentica/Dockerfile",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/Dockerfile"
   },
   "id": "P6-16"
  },
  {
   "title": "Secret e Job no Minikube",
   "topics": [
    "D6-12"
   ],
   "cenario": "O agente roda uma tarefa e sai. Como Deployment, o Kubernetes o reinicia em loop e o time acha que é bug; e a chave da API está em texto num manifesto commitado.",
   "passos": [
    "Suba o Minikube e construa a imagem no Docker do cluster (<code>eval $(minikube docker-env)</code>).",
    "Crie o Secret por comando, sem commitar o valor.",
    "Use <code>kind: Job</code> para tarefa que termina.",
    "Injete a chave com <code>secretKeyRef</code>.",
    "Defina <code>imagePullPolicy: Never</code> para imagem local e <code>restartPolicy: OnFailure</code>.",
    "Defina limites de recursos."
   ],
   "code": {
    "lang": "yaml",
    "src": "apiVersion: batch/v1\nkind: Job\nmetadata:\n  name: nexus-bot-run\nspec:\n  template:\n    spec:\n      restartPolicy: OnFailure\n      containers:\n        - name: nexus-bot\n          image: nexus-bot:v1\n          imagePullPolicy: Never\n          resources:\n            limits:\n              memory: 1Gi\n              cpu: \"1\"\n          env:\n            - name: GROQ_API_KEY\n              valueFrom:\n                secretKeyRef:\n                  name: nexus-secrets\n                  key: GROQ_API_KEY"
   },
   "resultado": "A tarefa roda uma vez e termina com status Completed, sem loop, e a credencial não aparece no manifesto.",
   "quandoNao": [
    "Serviço de longa duração (use Deployment).",
    "Cluster compartilhado, onde Secret precisa de RBAC e criptografia em repouso.",
    "Tarefa agendada: use CronJob."
   ],
   "armadilha": "Achar que Base64 protege o segredo.",
   "repo": {
    "label": "k8s/job.yaml e k8s/secret.yml",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/k8s"
   },
   "id": "P6-17"
  },
  {
   "title": "LocalStack: trocar de ambiente só pelo endpoint",
   "topics": [
    "D6-13"
   ],
   "cenario": "Testar o agente contra a AWS real custa dinheiro e exige credenciais. O time quer validar a lógica de S3 sem tocar na conta.",
   "passos": [
    "Suba o LocalStack no cluster com versão fixa (no lab, <code>3.0</code>).",
    "Exponha-o por Service na porta 4566.",
    "Leia o endpoint de <code>AWS_ENDPOINT_URL</code> no código com Boto3.",
    "Valide com <code>kubectl exec</code>: criar bucket, enviar arquivo, listar.",
    "Use credenciais dummy via Secret; nunca as reais.",
    "Em produção basta remover a variável."
   ],
   "code": {
    "lang": "python",
    "src": "import os\nimport boto3\n\ns3 = boto3.client(\n    \"s3\",\n    endpoint_url=os.getenv(\"AWS_ENDPOINT_URL\"),\n    region_name=\"us-east-1\",\n)\n\ns3.create_bucket(Bucket=\"nexus-apollo-data\")\ns3.put_object(Bucket=\"nexus-apollo-data\", Key=\"probe.txt\", Body=b\"ok\")\nkeys = [obj[\"Key\"] for obj in s3.list_objects_v2(Bucket=\"nexus-apollo-data\").get(\"Contents\", [])]\nprint(keys)"
   },
   "resultado": "Testes de infra em custo zero e sem risco; o mesmo código roda em dev (LocalStack) e prod (AWS) só mudando configuração.",
   "quandoNao": [
    "Serviços AWS que o LocalStack community não cobre bem.",
    "Teste de IAM real e limites de conta.",
    "Validação final pré-produção, que exige a AWS real."
   ],
   "armadilha": "Validar só que o Pod está ativo, sem testar uma operação real.",
   "repo": {
    "label": "k8s/localstack.yml e k8s/connect-test.yaml",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/k8s/localstack.yml"
   },
   "id": "P6-18"
  },
  {
   "title": "Ollama no cluster: LLM local e o custo em infraestrutura",
   "topics": [
    "D6-14"
   ],
   "cenario": "Agentes multiagente estouram a cota e o orçamento de tokens, e os dados não podem sair da rede. A equipe decide rodar o modelo localmente.",
   "passos": [
    "Suba o Ollama como Deployment e Service na porta 11434.",
    "Reserve memória, CPU e disco para os pesos do modelo (o limite de <code>2Gi</code> do manifesto do repo tende a ser apertado para um modelo de 8B; dimensione antes de subir).",
    "Baixe o modelo com <code>kubectl exec deployment/ollama -- ollama pull llama3.1</code> e aponte o <code>LLM</code> do CrewAI (prefixo <code>ollama/</code>) para o <code>base_url</code> do Service.",
    "Verifique se o Pod saiu de <code>Pending</code>: no lab, falta de recurso o impediu.",
    "Use modelo local nas tarefas simples e mantenha modelo maior onde a qualidade pesa.",
    "O YAML do repo tem a chave <code>limits</code> duplicada, o que é erro de manifesto a corrigir."
   ],
   "code": {
    "lang": "python",
    "src": "from crewai import LLM\n\nlocal_llm = LLM(\n    model=\"ollama/llama3.1\",\n    base_url=\"http://ollama:11434\",\n    temperature=0.2,\n)"
   },
   "resultado": "Sem cobrança por token e com dados dentro da infra; o custo passa a ser CPU, RAM e disco, que você precisa dimensionar.",
   "quandoNao": [
    "Cluster pequeno, sem GPU nem RAM de sobra.",
    "Tarefas que exigem o raciocínio de um modelo de fronteira.",
    "Time sem capacidade de operar a infraestrutura de inferência."
   ],
   "armadilha": "Achar que «de graça» significa «sem custo»: o custo vira infraestrutura.",
   "repo": {
    "label": "modulo06-aiops-engenharia-agentica/k8s/ollama.yaml",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/k8s/ollama.yaml"
   },
   "id": "P6-19"
  },
  {
   "title": "Portfólio e checklist de domínio em AIOps",
   "topics": [
    "D6-15"
   ],
   "cenario": "Um engenheiro quer mostrar competência em IA para DevOps, mas o portfólio é um repositório genérico de «chatbot». Entrevistas pedem decisões e trade-offs.",
   "passos": [
    "Escolha um problema concreto (MTTR, custo, pipeline lento).",
    "Meça a linha de base antes de usar IA.",
    "Implemente com guardrails e um humano no loop.",
    "Registre o que falhou e o que o modelo errou.",
    "Documente o resultado em número e a decisão de arquitetura.",
    "Revise com o checklist ao final."
   ],
   "code": {
    "lang": "text",
    "src": "Portfolio checklist\n[ ] Problem stated with a baseline number (MTTR, cost, pipeline minutes)\n[ ] Agent has one domain and explicit tools\n[ ] Policies and runbooks injected as context\n[ ] Destructive actions blocked by RBAC + approval\n[ ] Dry-run before any apply\n[ ] Secrets only via environment or Secret\n[ ] Result measured against the baseline\n[ ] Failures and model mistakes documented"
   },
   "resultado": "Um projeto que mostra critério e resultado mensurável, em vez de uma demo que só impressiona uma vez.",
   "quandoNao": [
    "Quando o objetivo é só aprender a ferramenta, sem necessidade de portfólio.",
    "Projeto copiado sem entender o porquê.",
    "Número sem linha de base."
   ],
   "armadilha": "Portfólio genérico no lugar de problemas concretos.",
   "id": "P6-20"
  }
 ]
});
