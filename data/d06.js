STUDY.push({
 "disc": {
  "num": "06",
  "nome": "Disciplina 06",
  "titulo": "Ferramentas de IA para DevOps",
  "autor": "Camilla Martins",
  "emoji": "🛠️",
  "resumo": "Como usar LLMs, agentes (CrewAI) e RAG em DevOps: IaC, Kubernetes, troubleshooting, observabilidade preditiva, ChatOps, DevSecOps, CI/CD, FinOps e auto-remediação com guardrails, até um bot multiagente que roda em Docker e Kubernetes."
 },
 "materiais": [
  [
   "Repositório oficial — módulo 06 (Nexus AI-Ops)",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica"
  ],
  [
   "Slides do módulo no repositório",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides"
  ],
  [
   "Indicação: Observability Engineering (Majors, Fong-Jones, Miranda, O'Reilly, 2022)",
   ""
  ],
  [
   "Indicação: Cloud FinOps, 2ª ed. (Storment, Fuller, O'Reilly, 2023)",
   ""
  ],
  [
   "Indicação: The Site Reliability Workbook (Beyer et al., O'Reilly, 2018)",
   ""
  ],
  [
   "Indicação: Securing DevOps (Vehent, Manning, 2018)",
   ""
  ]
 ],
 "blocos": [
  {
   "id": "d06-b0",
   "label": "Fundamentos e IaC"
  },
  {
   "id": "d06-b1",
   "label": "Kubernetes e Troubleshooting"
  },
  {
   "id": "d06-b2",
   "label": "Observabilidade, ChatOps e Segurança"
  },
  {
   "id": "d06-b3",
   "label": "Entrega, Custo e Auto-remediação"
  },
  {
   "id": "d06-b4",
   "label": "Projeto Integrador"
  },
  {
   "id": "d06-b5",
   "label": "Do Terminal ao Escalável"
  }
 ],
 "topics": [
  {
   "id": "D6-00",
   "bloco": "d06-b0",
   "mod": "Unidade 1 · Aulas 1 a 4",
   "emoji": "🧭",
   "read": "10 min",
   "title": "Da automação à inteligência agêntica: LLMs, agentes CrewAI, RAG e o Nexus Foundation",
   "short": "IA como apoio ao DevOps: LLM + papel + ferramentas + RAG. O módulo 1 só desenha, não cria infra.",
   "oneliner": "A tese da disciplina: <b>a IA é apoio ao conhecimento técnico, não substituta dele</b>. Um <b>agente</b> é uma LLM com papel, autonomia e ferramentas; o <b>RAG</b> injeta as regras da sua empresa; e o Nexus Foundation (módulo 1) usa um arquiteto com RAG de políticas para <b>desenhar</b> um bucket de logs, sem criar nada ainda.",
   "vovo": [
    "Imagine um estagiário brilhante que leu a internet inteira, mas nunca pisou na sua empresa. Se você só disser «faz uma infra», ele chuta região, nome e segurança. Se você der um cargo claro (agente), um manual de normas da casa (RAG) e ferramentas (escrever arquivo, consultar regras), ele entrega algo alinhado ao que a empresa exige.",
    "Mesmo assim, quem assina embaixo é você: ele é rápido e convincente, mas às vezes erra com a maior segurança do mundo. Por isso o trabalho dele é um rascunho que um profissional experiente valida."
   ],
   "oque": [
    "<b>IA como base de apoio (Aula 1):</b> a professora usa IA todo dia para troubleshooting, geração de código e validação de configuração, mas insiste que ela não é salvadora nem substitui conhecimento técnico. Respostas convincentes porém incorretas existem (versões erradas, arquiteturas inadequadas), e <b>quanto mais experiência a pessoa tem, melhor aproveita</b> a resposta. A validação final é do profissional.",
    "<b>Por que a LLM entende código:</b> a maioria usa a arquitetura <b>Transformer</b> com <b>Self-Attention</b>, que relaciona partes distantes de um mesmo arquivo. Isso importa para HCL (Terraform) e YAML (Kubernetes), onde uma seção influencia outra bem longe dela. A <b>tokenização</b> quebra o código em unidades menores (símbolos, operadores, comandos) e o modelo aprende padrões de estrutura, não busca palavras parecidas.",
    "<b>Prompt como especificação:</b> prompt vago gera resposta superficial. Detalhe provedor, região, zonas, autoscaling, rede e padrões internos, dê exemplos (few-shot) e peça o <b>plano antes do código</b>. Os slides nomeiam as técnicas: <b>Chain-of-Thought</b> (descrever o plano antes de executar comandos) e <b>Few-Shot</b> (exemplos do «Padrão Nexus» para garantir conformidade).",
    "<b>Mercado e consistência:</b> a aula cita Gemini (preferido pela autora), ChatGPT (versátil, mas com «cara de IA»), Claude (código limpo e bem estruturado), AWS Bedrock e o Kiro (IDE da AWS que quebra um objetivo em tarefas e executa etapa por etapa). Usar uma mesma plataforma por tempo gera histórico de contexto, o que <i>não</i> é treinar o modelo para você. Texto e comentários gerados precisam de revisão humana final.",
    "<b>Agentes e frameworks (Aula 2):</b> a LLM vira «motor de raciocínio» dentro de um sistema que executa tarefas dentro de regras. O agente acrescenta organização, autonomia e especialização. Em DevOps isso vale para checar nomenclatura (ex.: todo bucket começa com o nome da empresa), vulnerabilidades e custo junto de Terraform/Pulumi (IaC) e Infracost/Kubecost.",
    "<b>CrewAI:</b> estrutura para equipes de agentes. Suporta multiagente, fluxo <b>sequencial</b> (parecido com pipeline CI/CD, uma etapa só libera a próxima) e <b>hierárquico</b> (coordenador e executores), além de preservar estado e contexto entre etapas. A escolha de Python vem da proximidade com automação, dados e IA (Go domina as ferramentas, como Docker, Kubernetes e Terraform, pelos binários portáveis).",
    "<b>RAG como «lupa»:</b> a LLM não conhece o que é recente nem o que só existe dentro da empresa. O RAG consulta documentação interna, políticas e repositórios antes de responder, e vira uma segunda camada de validação: LLM = conhecimento geral, RAG = regras da organização."
   ],
   "como": [
    "<b>Arquitetura do projeto (Aula 3):</b> um diretório <code>core</code> guarda os agentes; ferramentas ficam em <code>tools</code>; cada aula tem um script em <code>labs</code>. A conexão com a LLM fica numa camada própria (modelo, credencial, parâmetros), com a API key em variável de ambiente, o mesmo padrão usado com provedores de nuvem e observabilidade.",
    "<b>Papel antes de tarefa:</b> o agente Arquiteto recebe role, objetivo e histórico («especialista em AWS/Terraform com foco em governança»). Um especialista com escopo fechado responde melhor que um modelo genérico, e reproduz como equipes reais dividem funções.",
    "<b>RAG de padrões corporativos:</b> a ferramenta de políticas é consultada <i>antes</i> de gerar. As regras do laboratório são simples (nomenclatura, região definida, serviços privados), mas ilustram o ponto: sem o RAG, o modelo poderia sugerir outra região ou um nome fora do padrão.",
    "<b>Missão do Módulo 1:</b> projetar um bucket de logs seguindo as normas da empresa. O agente consulta as regras, monta um plano e só então descreve nome, região e segurança. Mostrar o raciocínio antes do resultado dá transparência e ajuda auditoria.",
    "<b>Desenho, não execução (Aula 4):</b> ainda não se cria infra. O resultado é um «contrato arquitetural» (nome padronizado, região, bucket privado, versionamento e retenção de logs) que o módulo 2 vai implementar. Separar planejamento de execução espelha empresas maduras, onde nada é provisionado sem análise e aprovação.",
    "<b>Valor de longo prazo:</b> as decisões saem das cabeças de poucas pessoas e viram regras consumidas por agentes, aplicadas de forma repetível. Os especialistas continuam necessários, porque são eles que definem as regras."
   ],
   "aplica": [
    "Padronizar nomenclatura, região, tags e política de acesso em times grandes onde dezenas de pessoas alteram infra todo dia.",
    "Usar IA para acelerar troubleshooting: dar logs, erro e contexto e receber hipóteses de causa raiz para validar.",
    "Qualquer fluxo em que a LLM precise de conhecimento privado (políticas, runbooks, padrões de arquitetura): é caso de RAG."
   ],
   "pros": [
    "Acelera análise e geração sem eliminar a revisão humana.",
    "Especialização por agente melhora a qualidade e deixa o comportamento previsível.",
    "RAG alinha a resposta às regras reais da empresa e reduz a dependência de conhecimento tribal."
   ],
   "contras": [
    "Respostas plausíveis e erradas (alucinação) continuam possíveis, inclusive com versões e APIs inventadas.",
    "Quanto mais genérico o prompt, mais hipóteses a IA assume, e maior o risco de desvio.",
    "Agentes e RAG adicionam camadas (chaves de API, ferramentas, contexto) que também precisam de governança."
   ],
   "traps": [
    "Tratar a saída da IA como verdade pronta: ela é rascunho, a validação é sua.",
    "Alternar entre muitos modelos sem critério e perder consistência de contexto.",
    "Prompt vago do tipo «crie um cluster Kubernetes», que deixa provedor, zonas e rede em aberto.",
    "Confundir o Módulo 1 (desenho) com provisionamento: nenhum recurso é criado nele."
   ],
   "tip": "Trate o prompt como especificação: provedor, região, requisitos de rede e segurança, padrões internos e um exemplo do formato esperado. Peça o plano de execução antes de qualquer código e valide o entendimento primeiro.",
   "cola": [
    [
     "Transformer",
     "Arquitetura de LLM baseada em Self-Attention"
    ],
    [
     "Self-Attention",
     "Mecanismo que relaciona partes distantes do mesmo contexto (ex.: seções de um HCL/YAML)"
    ],
    [
     "Token",
     "Unidade menor que a palavra (símbolo, operador, comando) que o modelo processa"
    ],
    [
     "Agente",
     "LLM com papel definido, autonomia e ferramentas"
    ],
    [
     "CrewAI",
     "Framework Python de equipes de agentes (sequencial ou hierárquico)"
    ],
    [
     "RAG",
     "Retrieval-Augmented Generation: consulta fontes externas antes de gerar (a «lupa»)"
    ],
    [
     "Chain-of-Thought",
     "Obrigar o modelo a descrever o plano antes de executar"
    ],
    [
     "Few-Shot",
     "Dar exemplos do formato/padrão esperado no prompt"
    ],
    [
     "Contrato arquitetural",
     "Saída do módulo 1: nome, região e segurança que o módulo 2 implementa"
    ]
   ],
   "links": [
    [
     "CrewAI",
     "https://www.crewai.com/"
    ],
    [
     "Groq (inferência usada no código)",
     "https://groq.com/"
    ],
    [
     "Slides do módulo 1 no repositório",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica"
    ]
   ],
   "codigo": [
    {
     "proj": "core/ + labs/modulo1_foundation.py + tools/policy_rag.py + nexus_iac_copilot.py",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/core",
     "resumo": "Base de todo o curso: um LLM central, 12 fábricas de agentes e o primeiro laboratório, em que o Arquiteto consulta uma ferramenta de políticas e desenha um bucket S3 de logs para a empresa fictícia Nexus.",
     "fluxo": [
      "<code>core/llm_config.py</code> cria o objeto único <code>nexus_llm = LLM(model=\"groq/llama-3.1-8b-instant\", api_key=os.getenv(\"GROQ_API_KEY\"), temperature=0.2)</code> depois de <code>load_dotenv()</code>. Todos os agentes importam este objeto.",
      "<code>core/agents.py</code> tem 12 funções <code>get_*</code> (architect, auditor, sre_agent, safety_sre_agent, oncall_sre, aiops_agent, chatops_agent, devsecops_agent, cicd_agent, finops_agent, sre_knowledge_agent, nexus_manager_agent). Cada uma devolve um <code>Agent(role, goal, backstory, tools, llm=nexus_llm, verbose=True)</code>; só <code>oncall_sre</code> e <code>nexus_manager</code> têm <code>allow_delegation=True</code>.",
      "<code>tools/policy_rag.py</code> expõe <code>check_compliance_rules</code>, que devolve uma string fixa: prefixo <code>nexus-</code>, região <code>us-east-1</code> e S3 sempre privado.",
      "<code>labs/modulo1_foundation.py</code> insere a raiz do projeto no <code>sys.path</code>, cria o arquiteto com essa ferramenta, define a Task («Desenhe um bucket S3 para logs seguindo as normas da empresa Nexus») e roda <code>Crew(agents=[architect], tasks=[task_design_s3]).kickoff()</code>.",
      "<code>nexus_iac_copilot.py</code> é a «central de comando» CLI: um menu (1 a 12, D para o dashboard, Q para sair) que dispara cada lab com <code>subprocess</code>; o lab 6 e o dashboard rodam via <code>streamlit run</code>."
     ],
     "rodar": [
      "Python 3.10 a 3.13 (o README manda evitar o 3.14), <code>python3 -m venv venv</code>, <code>pip install -r requirements.txt</code> e <code>pip install streamlit</code>.",
      "Crie um <code>.env</code> com <code>GROQ_API_KEY</code> (não existe <code>.env.example</code> no módulo).",
      "<code>python3 labs/modulo1_foundation.py</code> ou <code>python3 nexus_iac_copilot.py</code> e escolha a opção 1."
     ],
     "armadilhas": [
      "A apostila diz «Grok», mas o código usa <b>Groq</b> (<code>groq/llama-3.1-8b-instant</code>). O README cita Llama-3.3-70B/3.1-8B e os slides falam em LiteLLM e Llama 3.3, mas só o 8B aparece no código.",
      "O «RAG» do lab 1 é uma string fixa: não há embeddings, busca nem base documental. Serve para mostrar o conceito, não para escalar.",
      "README e dashboard anunciam «11 agentes», mas <code>agents.py</code> tem 12 fábricas.",
      "O slide diz que o DevSecOps valida no módulo 1, mas o lab tem só o arquiteto.",
      "<code>pandas</code>, <code>numpy</code>, <code>kubernetes</code> e <code>langchain-groq</code> estão no <code>requirements.txt</code>, mas nenhum arquivo do módulo os importa diretamente (não verifiquei dependências transitivas)."
     ]
    }
   ]
  },
  {
   "id": "D6-01",
   "bloco": "d06-b0",
   "mod": "Unidade 2 · Aulas 1 a 3",
   "emoji": "🏗️",
   "read": "8 min",
   "title": "IaC Copilot: Arquiteto e Auditor com Checkov e OPA",
   "short": "Um agente gera o Terraform, outro audita com Checkov e OPA; a conformidade técnica não é a organizacional.",
   "oneliner": "No IaC Copilot, o <b>Arquiteto</b> traduz requisitos em Terraform e grava o arquivo; o <b>Auditor</b> (DevSecOps) roda o <b>Checkov</b> (boas práticas de segurança) e o <b>OPA</b> (regras de negócio da empresa). Infra pode estar tecnicamente segura e ainda assim violar uma política corporativa.",
   "vovo": [
    "É como uma obra com dois profissionais: o engenheiro desenha e constrói a planta (Arquiteto) e um fiscal confere. O fiscal tem dois manuais: o código de obras da cidade (Checkov, regras gerais de segurança) e o regulamento interno do condomínio (OPA, regras só da sua empresa, como «só construir neste bairro»).",
    "Se o fiscal acha problema, ele não sai quebrando parede: escreve um relatório explicando o que está errado, e a correção é feita na origem, no jeito como o engenheiro trabalha."
   ],
   "oque": [
    "<b>IaC com Terraform:</b> descreve recursos de forma declarativa, usa <i>providers</i> (AWS, GCP, Azure, Oracle e até ambientes locais) e mantém <b>state</b> dos recursos, o que dá rastreabilidade, rollback controlado e base para detectar mudanças. <b>Pulumi</b> descreve infra em linguagens de programação (Python, TypeScript), no estilo «CDK». <b>Ansible</b> costuma configurar o que o Terraform provisiona (Terraform é a estrutura, Ansible o acabamento).",
    "<b>Tradução semântica:</b> o usuário descreve a necessidade em linguagem natural e o agente a converte em implementação técnica. Só funciona bem porque o módulo 1 deu contexto organizacional (RAG e padrões).",
    "<b>Writer Tool:</b> uma LLM produz texto, mas virar arquivo real exige uma ferramenta. O Python faz a ponte entre agente, ferramentas e sistema operacional.",
    "<b>Checkov:</b> análise estática de IaC que detecta má configuração antes do provisionamento (criptografia em repouso, bloqueio de acesso público, versionamento). Desloca a segurança para o início do ciclo («shift left»).",
    "<b>OPA (Open Policy Agent):</b> transforma regras de negócio em código. Os exemplos da aula: <b>soberania de dados</b> (tudo na região definida) e <b>controle de custo</b> (limite de tamanho/família de instância), o que também é FinOps. Ficou popular no Kubernetes, mas serve a qualquer validação de política antes de uma ação.",
    "<b>Drift detection:</b> divergência entre o estado real e o código, tipicamente alguém mexendo no console. A IA pode comparar o real com os arquivos Terraform e sinalizar. Isso reforça o argumento da autora a favor de IaC: histórico, previsibilidade e governança.",
    "<b>Self-healing assistido:</b> o ciclo gera, audita, devolve o relatório e corrige. Ainda não é autocorreção em produção, é a fundação para ela."
   ],
   "como": [
    "<b>Dois agentes com papéis distintos:</b> o Arquiteto («especialista em AWS e Terraform com foco em governança») gera o código e persiste via Writer Tool; o Auditor («engenheiro DevSecOps») revisa tudo com as duas ferramentas. É a revisão por pares automatizada.",
    "<b>Pipeline sequencial:</b> executa o Arquiteto, registra o resultado, transfere ao Auditor, que roda Checkov e depois OPA. Se tudo passa, sai um relatório de conformidade. O CrewAI imprime versões, ids de tarefa e raciocínio, úteis para troubleshooting dos agentes.",
    "<b>Demonstração da Aula 2 e 3:</b> o Arquiteto recebeu uma região diferente da política. O Checkov aprovou, o <b>OPA reprovou</b> (soberania de dados). Esse é o recado central: conformidade técnica ≠ conformidade organizacional, e as duas camadas são necessárias.",
    "<b>O auditor não corrige sozinho:</b> ele produz um relatório com a regra violada e a causa. Na aula, a correção foi feita direto na configuração/prompt do Arquiteto, resolvendo a causa para que as próximas gerações já saiam corretas.",
    "<b>Resultado final:</b> sem vulnerabilidades e sem violação de política, o pipeline emite um relatório de conformidade e o artefato segue para as próximas etapas."
   ],
   "aplica": [
    "Gate de PR para Terraform: scanner de segurança mais política de negócio (região, tamanho de instância, ingress aberto).",
    "Copilot interno em que o dev descreve o recurso em linguagem natural e recebe HCL já aderente aos padrões.",
    "Auditoria periódica de drift entre o console da nuvem e o repositório de IaC."
   ],
   "pros": [
    "Problemas de segurança e política aparecem antes de qualquer recurso existir.",
    "Regras de negócio viram código versionável e repetível, em vez de PDF.",
    "Auditor com relatório explicável acelera a correção e a revisão humana."
   ],
   "contras": [
    "Quem gera e quem audita são LLMs: ambos podem errar, e o relatório precisa de leitura humana.",
    "O OPA só é tão bom quanto as regras escritas, e o Checkov cobre apenas boas práticas conhecidas.",
    "Cada agente e ferramenta adicionada aumenta o custo de tokens e a superfície de falha."
   ],
   "traps": [
    "Confiar só no Checkov e esquecer as regras do negócio (região, custo, nomenclatura).",
    "Consertar o arquivo gerado em vez da origem (prompt/regra), repetindo o erro na próxima execução.",
    "Esperar que a IA «descubra» a região correta sem que a política esteja no contexto do agente.",
    "Achar que o laço de correção é automático em qualquer framework: precisa estar desenhado no fluxo."
   ],
   "tip": "Quando o OPA reprovar, corrija a causa na origem (prompt ou política do agente) e rode de novo: o objetivo é que a próxima geração já nasça conforme.",
   "cola": [
    [
     "Terraform",
     "IaC declarativa com providers e state"
    ],
    [
     "Pulumi",
     "IaC com linguagens de programação (estilo CDK)"
    ],
    [
     "Ansible",
     "Gerenciamento de configuração do que foi provisionado"
    ],
    [
     "Writer Tool",
     "Ferramenta que persiste o texto gerado em arquivo real"
    ],
    [
     "Checkov",
     "Análise estática de IaC para segurança e boas práticas"
    ],
    [
     "OPA",
     "Open Policy Agent: regras de negócio como código"
    ],
    [
     "Soberania de dados",
     "Regra de manter recursos numa região específica"
    ],
    [
     "Drift",
     "Estado real divergente do código (alteração manual no console)"
    ],
    [
     "Self-healing",
     "Detectar, diagnosticar e corrigir, aqui de forma assistida"
    ]
   ],
   "links": [
    [
     "Terraform",
     "https://www.terraform.io/"
    ],
    [
     "Open Policy Agent",
     "https://www.openpolicyagent.org/"
    ],
    [
     "Slides do módulo 2",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica"
    ]
   ],
   "codigo": [
    {
     "proj": "labs/modulo2_iac_copilot.py + tools/file_writer.py + tools/security_scan.py + main.tf",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo2_iac_copilot.py",
     "resumo": "Pipeline sequencial de dois agentes: o Arquiteto grava um <code>main.tf</code> de um bucket S3 chamado <code>nexus-apollo-data</code> em <code>us-east-1</code> e o Auditor valida com Checkov (binário real) e OPA (regras simuladas em Python).",
     "fluxo": [
      "<code>labs/modulo2_iac_copilot.py</code>: <code>architect = get_architect(tools=[write_file])</code> e <code>auditor = get_auditor(tools=[run_checkov_scan, validate_opa_policies])</code>. Duas Tasks: gerar o <code>main.tf</code> e auditá-lo («Se houver erro, o arquiteto deve corrigir»), em <code>Crew(..., process=Process.sequential, verbose=True)</code>.",
      "<code>tools/file_writer.py</code> (<code>write_file</code>) remove as cercas <code>```hcl</code> e <code>```</code> do conteúdo e grava em <code>filename</code> (padrão <code>main.tf</code>), no diretório atual.",
      "<code>tools/security_scan.py</code> (<code>run_checkov_scan</code>) roda <code>checkov -f &lt;arquivo&gt; --quiet --compact</code> via <code>subprocess</code>; se <code>FAILED</code> aparece na saída devolve as falhas, se o binário não existe orienta <code>pip install checkov</code>.",
      "<code>validate_opa_policies</code> não usa Rego: faz checagens de string. Rejeita se não houver <code>us-east-1</code> (<code>SOBERANIA_DADOS</code>), se aparecer <code>t3.large</code> (<code>COST_CONTROL</code>) ou <code>0.0.0.0/0</code> (<code>NO_PUBLIC_INGRESS</code>).",
      "<code>main.tf</code> (raiz do módulo) parece ser o resultado de uma execução (não verifiquei): provider AWS em <code>us-east-1</code>, bucket <code>nexus-apollo-data</code> com <code>acl = \"private\"</code>, <code>versioning</code> habilitado e criptografia <code>AES256</code>."
     ],
     "rodar": [
      "Na raiz do módulo, com <code>.env</code> e o venv ativos: <code>python3 labs/modulo2_iac_copilot.py</code> (ou opção 2 do menu).",
      "O Checkov vem de <code>checkov&lt;3.0.0</code> no <code>requirements.txt</code>.",
      "Rode da raiz: <code>main.tf</code> é lido e gravado relativo ao diretório atual."
     ],
     "armadilhas": [
      "O OPA do repositório é uma função Python, não o OPA real: os slides falam em Rego e «proibido instância maior que t3.medium», mas o código só barra a string literal <code>t3.large</code>.",
      "O «feedback loop» descrito na aula não existe estruturalmente no código lido: a Crew sequencial roda cada Task uma vez e o auditor não tem <code>allow_delegation</code>. A frase «o arquiteto deve corrigir» está só no texto da Task (não executei para confirmar).",
      "O <code>main.tf</code> commitado usa <code>acl</code> e <code>versioning</code> inline, estilo de provider AWS mais antigo; não rodei o Checkov para ver o que ele reporta (hipótese: pode apontar itens como log e public access block).",
      "O <code>main.tf</code> é artefato de execução: a próxima rodada o sobrescreve."
     ]
    }
   ]
  },
  {
   "id": "D6-02",
   "bloco": "d06-b1",
   "mod": "Unidade 3 · Aulas 1 a 3",
   "emoji": "☸️",
   "read": "7 min",
   "title": "Agentes para Kubernetes: manifestos, reconciliação e Canary",
   "short": "Arquiteto gera o YAML, SRE aplica e decide o rollout; quase toda a robustez vem do template.",
   "oneliner": "No K8s AI-Ops o <b>Arquiteto</b> gera o manifesto (Deployment + Service com readinessProbe) e o agente <b>SRE</b> reconcilia com <code>kubectl apply</code> e decide, via um <b>Canary Analyzer</b>, se o rollout segue ou volta. A aula mostra que bons prompts e restrições explícitas reduzem erros, e o código mostra que o template carrega boa parte disso.",
   "vovo": [
    "Pense numa padaria que quer lançar uma receita nova. Em vez de trocar todos os pães de uma vez, serve a nova só para 10% dos clientes (o «canário» da mina que avisava do gás antes dos mineiros). Se ninguém passar mal, aumenta para 25%, 50% e 100%.",
    "O agente de SRE é o encarregado que observa as reações (erros, demora) e decide: continua ou volta atrás. O arquiteto só escreve a receita no formato certo."
   ],
   "oque": [
    "<b>«YAML Engineers»:</b> Docker Compose, Kubernetes, CI, Prometheus e Grafana vivem de YAML sensível a indentação. A IA ajuda porque infere os recursos necessários: pediu Nginx, vem Deployment, imagem, portas e, se couber, Service.",
    "<b>Readiness Probe:</b> só deixa o pod receber tráfego quando está pronto de verdade. Sem ela, o container já «de pé» recebe requisição antes de terminar de iniciar e os usuários veem erro.",
    "<b>Canary Deployment:</b> liberação gradual (ex.: 10%, 25%, 50%, 100%) com observação entre as etapas. A IA entra olhando logs e métricas: erro, latência e degradação decidem continuar, parar ou fazer <b>rollback</b>.",
    "<b>GitOps:</b> o Git é a fonte da verdade do estado desejado e controladores como <b>Argo CD</b> e <b>Flux</b> reconciliam o cluster continuamente. A IA complementa (gera ou ajusta manifestos) e não substitui o fluxo. O laboratório <i>não</i> usa Argo/Flux, só simplifica.",
    "<b>Dois agentes:</b> o Arquiteto agora gera YAML de Kubernetes (a ferramenta nova substitui a Writer Tool) e o <b>SRE</b> aplica manifestos e analisa métricas de rollout. A aula nota que DevOps e SRE se sobrepõem na prática.",
    "<b>Reconciliação declarativa:</b> o Kubernetes compara estado desejado e real e executa só o necessário. Reaplicar um manifesto igual retorna «sem mudanças»; alterar o nome da app cria novos objetos."
   ],
   "como": [
    "<b>Restrições no prompt:</b> exigir <b>imagem pública válida</b> evita que a IA invente imagem inexistente, e a grafia exata de <code>readinessProbe</code> evita manifesto que falha no deploy. Quanto mais detalhado o prompt, melhor a saída.",
    "<b>Template com variáveis:</b> a ferramenta usa um modelo com <code>apiVersion</code>, <code>kind</code>, metadados, réplicas, containers e imagem. O agente só preenche nome da app, réplicas e porta, extraídos do prompt. O <b>Service</b> existe porque pods são efêmeros e mudam de endereço.",
    "<b>Modo simulação:</b> se não houver cluster (ou <code>kubectl</code>), a ferramenta de apply opera em simulação, o que permite validar o manifesto sem ambiente.",
    "<b>Canary Analyzer:</b> observa taxa de erros e latência; em ambiente local sem tráfego, as métricas ficam estáveis e o rollout é aprovado.",
    "<b>Teste da Aula 3:</b> trocar o nome da app no prompt propaga para Deployment, Service e labels; 2 réplicas e pods saudáveis aparecem no cluster. Tentativas de induzir manifestos errados falharam, mas isso <i>não</i> prova que o agente é infalível: nenhum sistema com LLM tem garantia.",
    "<b>Próximo passo:</b> provocar falhas de propósito e usar Prometheus e Jaeger no diagnóstico (módulo 4)."
   ],
   "aplica": [
    "Geração de manifestos padronizados com probes, limites e nomes consistentes para vários microserviços.",
    "Gate de rollout: decidir promoção ou rollback com base em erro e latência observados.",
    "Reconciliar mudanças geradas por IA dentro de um fluxo GitOps normal (PR, revisão, Argo/Flux)."
   ],
   "pros": [
    "Readiness e demais boas práticas entram por padrão no manifesto.",
    "Template reduz a liberdade da LLM e, portanto, os erros.",
    "Decisão de rollout baseada em métricas, não em intuição."
   ],
   "contras": [
    "Manifestos válidos hoje podem quebrar com APIs deprecadas em versões futuras do cluster.",
    "Decisões de rollback automáticas exigem métricas confiáveis e governança.",
    "O lab roda sem tráfego real, então a análise de Canary é só demonstrativa."
   ],
   "traps": [
    "Achar que a robustez vem da «esperteza» da LLM quando vem do template.",
    "Não fixar a versão da imagem (<code>latest</code>) e perder reprodutibilidade.",
    "Esquecer que o Service é o ponto estável de acesso: pods mudam.",
    "Considerar o Canary Analyzer do lab equivalente a uma análise real de produção."
   ],
   "tip": "Reaplicar o mesmo manifesto e ver «unchanged» é um bom teste de idempotência; mude só o nome da app para provar que o fluxo gera objetos novos.",
   "cola": [
    [
     "Deployment",
     "Descreve estado desejado e réplicas de uma app"
    ],
    [
     "Service",
     "Ponto estável de acesso aos pods efêmeros"
    ],
    [
     "Readiness Probe",
     "Só encaminha tráfego a pods realmente prontos"
    ],
    [
     "Canary",
     "Liberação gradual de uma nova versão com observação"
    ],
    [
     "Rollback",
     "Voltar à versão estável anterior"
    ],
    [
     "GitOps",
     "Git como fonte da verdade; Argo CD/Flux reconciliam"
    ],
    [
     "Reconciliação",
     "Eliminar a diferença entre estado desejado e real (<code>kubectl apply</code>)"
    ],
    [
     "SRE agent",
     "Aplica manifestos e valida a operação pós-deploy"
    ]
   ],
   "links": [
    [
     "Kubernetes",
     "https://kubernetes.io/"
    ],
    [
     "Slides do módulo 3",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica"
    ]
   ],
   "codigo": [
    {
     "proj": "labs/modulo3_k8s_ops.py + tools/k8s_ops.py + nexus-api*-k8s.yaml",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo3_k8s_ops.py",
     "resumo": "Fluxo GitOps em miniatura: o Arquiteto gera <code>nexus-api-k8s.yaml</code>, o SRE o aplica com <code>kubectl</code> (ou simula) e aprova ou reverte o rollout com um analisador de métricas.",
     "fluxo": [
      "<code>labs/modulo3_k8s_ops.py</code>: <code>architect = get_architect(tools=[generate_k8s_manifest])</code> e <code>sre = get_sre_agent(tools=[apply_k8s_manifest, analyze_canary_metrics])</code>, três Tasks em <code>Process.sequential</code>: desenhar (app <code>nexus-api</code>, 2 réplicas, porta 80, <code>nginx:latest</code>, readinessProbe), sincronizar <code>nexus-api-k8s.yaml</code> e decidir o rollout com <code>'error_rate: 1%, latency: 80ms'</code>.",
      "<code>tools/k8s_ops.py</code>, <code>generate_k8s_manifest(app_name, replicas, port)</code>: monta um YAML fixo (Deployment com <code>image: nginx:latest</code>, readinessProbe em <code>/</code>, mais Service <code>&lt;app&gt;-svc</code> que mapeia a porta 80 para <code>targetPort</code>) e grava <code>&lt;app&gt;-k8s.yaml</code> no diretório atual.",
      "<code>apply_k8s_manifest(filename)</code>: erro se o arquivo não existe; roda <code>kubectl apply -f</code>; código 0 devolve «GitOps Sync Success»; código diferente de 0 devolve «GitOps Simulation»; sem o binário, «Simulation Mode» citando ArgoCD/Flux.",
      "<code>analyze_canary_metrics(metrics_data)</code>: regex <code>error_rate:\\s*([\\d.]+)\\s*%</code>; acima de 5 devolve ROLLBACK, senão PROCEED.",
      "Os arquivos <code>nexus-api-k8s.yaml</code>, <code>nexus-api-error-k8s.yaml</code> e <code>nexus-api-unipds-k8s.yaml</code> da raiz provavelmente são saídas das execuções da aula (mesma estrutura do template, só o nome da app muda), o que reproduz o teste de «trocar o nome para forçar novo deploy»."
     ],
     "rodar": [
      "<code>python3 labs/modulo3_k8s_ops.py</code> (opção 3 do menu); sem cluster o apply vira simulação.",
      "Com cluster local: <code>kubectl apply -f nexus-api-k8s.yaml</code>, <code>kubectl get deployments</code>, <code>kubectl get pods</code> (comandos do slide 3)."
     ],
     "armadilhas": [
      "O Canary Analyzer só lê <code>error_rate</code>: a latência que a apostila cita está no texto da Task, mas não é avaliada no código.",
      "Qualquer código de saída diferente de 0 do <code>kubectl</code> vira «nenhum cluster detectado», o que mascara erros reais (YAML inválido, permissão negada).",
      "A «robustez» da aula vem do template: imagem, probe e estrutura são fixos na ferramenta, e a LLM só preenche nome, réplicas e porta. Por isso induzir erro pelo prompt não funcionou.",
      "A imagem é <code>nginx:latest</code>, tag mutável."
     ]
    }
   ]
  },
  {
   "id": "D6-03",
   "bloco": "d06-b1",
   "mod": "Unidade 4 · Aulas 1 a 3",
   "emoji": "🔎",
   "read": "8 min",
   "title": "Troubleshooting com ReAct: reduzindo o MTTR com Prometheus, Jaeger e eventos do K8s",
   "short": "Agente SRE pensa, age e observa; correlaciona métricas, traces e pods para achar a causa raiz.",
   "oneliner": "<b>ReAct</b> (Reason + Act, nada a ver com o React do front-end) é um ciclo de <b>pensar, agir, observar</b>. O agente SRE on-call correlaciona <b>Prometheus</b> (métricas), <b>Jaeger</b> (traces) e a inspeção de pods do Kubernetes para chegar à causa raiz e propor a correção, reduzindo o <b>MTTR</b>.",
   "vovo": [
    "Um bom médico não dá o diagnóstico só ouvindo «dói»: pede exame de sangue, raio-X, olha o histórico e vai refinando a hipótese. ReAct é isso no mundo dos servidores: o agente levanta um sintoma, escolhe uma ferramenta, lê o resultado e só então decide o próximo passo.",
    "Métricas dizem «tem algo lento»; o trace aponta «a demora está na consulta ao banco»; o evento do pod diz «o contêiner nem chegou a subir». Juntos, formam o laudo."
   ],
   "oque": [
    "<b>MTTR</b> (Mean Time To Recovery/Repair): tempo para identificar, diagnosticar e corrigir um problema em produção. Quanto menor, menor o impacto no usuário e no negócio.",
    "<b>ReAct:</b> a resposta final é construída aos poucos; cada ação gera evidências que mudam a decisão seguinte. É diferente de um agente simples que recebe pergunta e responde.",
    "<b>Erros clássicos:</b> <code>CrashLoopBackOff</code> (container sobe e cai em loop: variável de ambiente errada, banco inacessível, imagem, health check mal configurado), <code>OOMKilled</code> (passou do limite de memória, em qualquer linguagem) e <code>ImagePullBackOff</code> (tag de imagem inexistente). Há ainda o caso em que os logs parecem normais e a falha está no <b>Readiness Probe</b>.",
    "<b>Prometheus</b> coleta métricas por <i>scraping</i> e é consultado com <b>PromQL</b>; as duas métricas centrais da aula são <b>latência</b> e <b>taxa de erro 5xx</b>. <b>Jaeger</b> faz tracing distribuído e mostra onde, no caminho da requisição, está o gargalo.",
    "<b>kubectl describe pod</b> funciona como linha do tempo: eventos desde o download da imagem até as tentativas de iniciar. É o que o agente usa para compor o diagnóstico.",
    "<b>Observabilidade antes do incidente:</b> latência anormal, erros crescentes e consumo de recursos aparecem antes da queda. Detectá-los cedo muda a operação de reativa para preventiva (tema do módulo 5)."
   ],
   "como": [
    "<b>Cenário controlado:</b> uma aplicação <i>Checkout</i> é colocada em falha de propósito. O agente investiga com ReAct: métricas de erro e latência, traces do serviço, inspeção do pod, e por fim sugere a correção.",
    "<b>Camada de ferramentas de observabilidade:</b> uma consulta Prometheus, uma consulta Jaeger e uma inspeção de pods, mais um sugeridor de correções. Na aula, Prometheus e Jaeger são <b>simulados</b>, mas representam o que viria de um ambiente real; a apostila cita como exemplo um gargalo numa chamada ao PostgreSQL (o código fixa esse span em 800 ms).",
    "<b>Catálogo de falhas + recomendações:</b> <code>ImagePullBackOff</code> leva a corrigir a tag (ECR ou Docker Hub); OOM leva a subir limites; CrashLoop leva a revisar env vars, Secrets e banco.",
    "<b>A realidade foge do catálogo:</b> na demonstração o erro acontecia antes de o container iniciar, e a memória configurada era tão baixa que o recurso nem era criado. Por isso o catálogo precisa evoluir com novos erros.",
    "<b>Correção gerada:</b> o agente produziu um manifesto corrigido com recursos, liveness e readiness com atraso inicial e intervalos, porque health checks cedo demais fazem o Kubernetes reiniciar uma app que só estava inicializando (típico quando há conexão com banco, cache ou fila).",
    "<b>Validação:</b> reaplicado o fix, os eventos passam de falha e reinicialização para criação, inicialização e ativação dos probes, e o pod fica saudável."
   ],
   "aplica": [
    "Plantão de SRE com agente que reúne métricas, traces e eventos antes de o humano abrir o primeiro dashboard.",
    "Geração de hotfix de manifesto (probes, limites, imagem) para revisão humana.",
    "Enriquecer alertas com hipóteses de causa raiz e links de evidência."
   ],
   "pros": [
    "Diagnóstico estruturado e rastreável: cada conclusão aponta para uma evidência.",
    "Correlação de fontes diferentes reduz o ruído de alertas isolados.",
    "Fecha o ciclo: do sintoma ao manifesto corrigido."
   ],
   "contras": [
    "O diagnóstico é tão bom quanto as ferramentas que o agente tem; sem dados reais ele só reproduz um cenário.",
    "Catálogos de erro ficam desatualizados.",
    "O agente pode propor uma correção plausível que não resolve a causa."
   ],
   "traps": [
    "Confundir ReAct (padrão de raciocínio) com React (biblioteca de front-end).",
    "Assumir que todo erro cabe em <code>CrashLoopBackOff</code>/<code>OOMKilled</code>.",
    "Configurar probes cedo demais para apps que dependem de banco ou cache.",
    "Trocar a causa raiz pelo sintoma: reiniciar pod não conserta um limite de memória errado."
   ],
   "tip": "Quando os logs parecem normais e a app está fora do ar, olhe o Readiness Probe e os eventos do pod antes de mexer no código.",
   "cola": [
    [
     "MTTR",
     "Tempo médio para recuperar/reparar um serviço após um incidente"
    ],
    [
     "ReAct",
     "Ciclo pensar, agir, observar, repetir"
    ],
    [
     "CrashLoopBackOff",
     "Container reinicia em loop por falha na inicialização"
    ],
    [
     "OOMKilled",
     "Container morto por exceder o limite de memória"
    ],
    [
     "ImagePullBackOff",
     "Falha ao baixar a imagem (tag inexistente ou sem acesso)"
    ],
    [
     "Prometheus / PromQL",
     "Métricas por scraping e a linguagem de consulta"
    ],
    [
     "Jaeger",
     "Tracing distribuído para achar gargalos entre serviços"
    ],
    [
     "kubectl describe pod",
     "Eventos e estado do pod como linha do tempo"
    ],
    [
     "Liveness / Readiness",
     "Probes de saúde e de prontidão para tráfego"
    ]
   ],
   "links": [
    [
     "Prometheus",
     "https://prometheus.io/"
    ],
    [
     "Jaeger",
     "https://www.jaegertracing.io/"
    ],
    [
     "Slides do módulo 4",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica"
    ]
   ],
   "codigo": [
    {
     "proj": "labs/modulo4_troubleshooting.py + tools/k8s_diag.py + tools/obs_tools.py + checkout-broken.yaml + checkout-k8s-fix.yaml",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo4_troubleshooting.py",
     "resumo": "Dois agentes em sequência: o SRE on-call diagnostica o <i>checkout-api</i> com ferramentas de métricas, trace e pod; o Arquiteto grava o manifesto de correção seguindo regras estritas.",
     "fluxo": [
      "<code>labs/modulo4_troubleshooting.py</code>: <code>sre_oncall = get_oncall_sre(tools=[inspect_pod_failure, suggest_fix, query_prometheus_metrics, query_jaeger_traces])</code> (agente com <code>allow_delegation=True</code>) e <code>architect = get_architect(tools=[write_file])</code>. Task 1: investigar com ReAct em 4 passos (Prometheus, Jaeger, pod, sugestão); Task 2: gerar <code>checkout-k8s-fix.yaml</code> com regras estritas (Deployment, <code>nginx:latest</code>, porta 80, probes em <code>/</code>, <code>initialDelaySeconds</code>).",
      "<code>tools/obs_tools.py</code>: <code>query_prometheus_metrics</code> devolve texto fixo por palavra-chave (latência: 850 ms «HIGH»; erro: 12% de 5xx; senão «normal»). <code>query_jaeger_traces</code> sempre aponta um span de 800 ms na chamada ao PostgreSQL, qualquer que seja o serviço.",
      "<code>tools/k8s_diag.py</code>: <code>inspect_pod_failure</code> responde por substring do nome do pod (<code>api</code>: falha de conexão com banco; <code>worker</code>: OOMKilled; senão: readiness probe falhando); <code>suggest_fix</code> consulta um dicionário (OOMKilled, ImagePullBackOff, CrashLoopBackOff).",
      "<code>checkout-broken.yaml</code>: Deployment <code>checkout-api</code> com <code>image: nginx:versao-que-nao-existe-999</code> (erro proposital: ImagePullBackOff). <code>checkout-k8s-fix.yaml</code>: <code>nginx:latest</code>, porta 80, liveness (<code>initialDelaySeconds: 15</code>) e readiness (<code>5</code>), ambos em <code>/</code>."
     ],
     "rodar": [
      "Cenário quebrado: <code>kubectl apply -f checkout-broken.yaml</code> (como no slide 4); depois <code>python3 labs/modulo4_troubleshooting.py</code>; aplicar <code>kubectl apply -f checkout-k8s-fix.yaml</code> e <code>kubectl get pods</code>.",
      "Sem cluster, dá para rodar só o agente: as ferramentas de diagnóstico são simuladas."
     ],
     "armadilhas": [
      "<code>\"api\" in pod_name.lower()</code> é verdadeiro para <code>checkout-api</code>, então o diagnóstico devolvido é o de falha de conexão com o banco, não o ImagePullBackOff do manifesto quebrado. O ramo «readiness» é inalcançável para esse pod.",
      "O README manda aplicar <code>k8s/deploy.yml</code> para «simular a quebra», mas esse arquivo é o Deployment do <code>nexus-bot</code> (módulo 13). O cenário quebrado correto, como nos slides, é <code>checkout-broken.yaml</code>.",
      "A apostila descreve um manifesto quebrado por memória baixíssima; o repositório atual usa tag de imagem inexistente (o <code>checkout-broken.yaml</code> entrou no commit <code>4e59133</code>; não verifiquei se a apostila foi gravada antes ou depois dele).",
      "A regra «path <code>/</code> nos probes» no prompt existe porque o Nginx responde 404 em <code>/healthz</code>: a limitação do cenário foi empurrada para o texto da Task.",
      "Prometheus e Jaeger são texto fixo: os números (850 ms, 12%, 800 ms) não vêm de nenhuma medição."
     ]
    }
   ]
  },
  {
   "id": "D6-04",
   "bloco": "d06-b2",
   "mod": "Unidade 5 · Aulas 1 a 3",
   "emoji": "📈",
   "read": "6 min",
   "title": "AIOps e observabilidade preditiva: NL2Q, alerta antes da queda e dashboards dinâmicos",
   "short": "Linguagem natural vira PromQL, uma previsão avisa 4h antes e a IA gera o JSON do dashboard do Grafana.",
   "oneliner": "Observabilidade preditiva busca fazer o <b>alerta tocar antes da falha</b>: o agente de AIOps traduz linguagem natural em <b>PromQL (NL2Q)</b>, aplica um modelo preditivo sobre o histórico (disco enchendo) e gera um <b>dashboard em JSON</b> pronto para importar no Grafana.",
   "vovo": [
    "O alerta tradicional é o alarme de incêndio que só toca quando já tem fogo. A observabilidade preditiva é o sensor que percebe «a temperatura sobe sem parar» e avisa que a sala vai pegar fogo em quatro horas, a tempo de agir.",
    "E o dashboard dinâmico é como montar, em segundos, o painel exato de que você precisa naquele incêndio, em vez de passar meia hora desenhando gráficos com a casa pegando fogo."
   ],
   "oque": [
    "<b>NL2Q (Natural Language to Query):</b> o agente traduz «taxa de erro do checkout» para <b>PromQL</b> (métricas) ou <b>LogQL</b> (logs). Democratiza a observabilidade: quem não domina a sintaxe consegue consultar.",
    "<b>Alertas estáticos geram ruído:</b> CPU a 90% na Black Friday é normal. O resultado é a <b>fadiga de alertas</b>, em que equipes ignoram notificações importantes. Soluções: considerar histórico, sazonalidade e múltiplos indicadores.",
    "<b>Séries temporais e Machine Learning:</b> <b>Prophet</b> (previsão com sazonalidade) e <b>Isolation Forest</b> (pontos fora da curva). Anomalia não é problema por definição: precisa de contexto, e é preciso tratar falsos positivos e falsos negativos.",
    "<b>Dashboards dinâmicos:</b> durante um incidente, montar painel no Grafana (datasource, painéis, visualizações) consome tempo precioso. O agente lê o contexto e gera o JSON com os painéis certos (métricas, logs, traces).",
    "<b>Indicação de leitura 1:</b> <i>Observability Engineering</i> aprofunda a crítica a alertas estáticos e painéis fixos e prepara o terreno para NL2Q e dashboards gerados por IA."
   ],
   "como": [
    "<b>Agente de AIOps:</b> «engenheiro de AIOps e análise de dados», com background em séries temporais, PromQL, Prophet e Isolation Forest. Não só mostra métricas, transforma em insight acionável.",
    "<b>Fluxo da aula (3 etapas):</b> (1) traduzir «qual a porcentagem de disco livre?» para PromQL; (2) analisar o histórico «uso atual 85%, crescimento contínuo de 2 GB por hora» e emitir um alerta preditivo de <b>saturação em cerca de 4 horas</b>; (3) gerar o dashboard de «Disk Saturation».",
    "<b>Mitigação sugerida:</b> rotina de limpeza, reorganização de temporários ou ampliação do armazenamento. A escolha final depende das regras da empresa; o essencial é a recomendação chegar <i>antes</i> da indisponibilidade.",
    "<b>Dashboard:</b> o JSON inclui painel de uso de disco e painel de taxa de erro, o que permite correlacionar infraestrutura com impacto na aplicação. É ponto de partida, não estrutura rígida: período e organização podem ser ajustados.",
    "<b>Grafana local (Aula 3):</b> sobe em container; a importação por JSON funciona e o título do painel reflete o contexto do incidente. Os dados são <b>simulados</b> (sem Prometheus/CloudWatch reais). A frase da aula: «se não funciona localmente, dificilmente funciona em produção».",
    "<b>Preditivo + MTTR:</b> MTTR acelera a recuperação depois da falha; o preditivo tenta evitá-la. Juntos formam ambientes mais resilientes."
   ],
   "aplica": [
    "Prever saturação de disco, memória ou conexões e abrir o chamado antes do incidente.",
    "Painel de incidente gerado sob demanda, com as métricas do contexto.",
    "Permitir que times de dev consultem Prometheus/Loki em português."
   ],
   "pros": [
    "Troca reação por antecipação e reduz alerta ruidoso.",
    "Reduz a barreira de PromQL/LogQL.",
    "Economiza o tempo mais caro do incidente: montar painel e consulta."
   ],
   "contras": [
    "Modelos preditivos exigem histórico e ajuste; sazonalidade mal modelada gera falso alarme.",
    "A query gerada precisa ser revisada: NL2Q também alucina.",
    "Dashboards automáticos são ponto de partida e carecem de curadoria."
   ],
   "traps": [
    "Tratar toda anomalia como incidente (e vice-versa).",
    "Confiar numa previsão sem checar os dados de entrada.",
    "Achar que «NL2Q» elimina a necessidade de entender PromQL.",
    "Considerar o laboratório um modelo preditivo real (veja os achados no código)."
   ],
   "tip": "Gere a query em linguagem natural, mas leia o PromQL resultante: ele é código e precisa de revisão como qualquer outro.",
   "cola": [
    [
     "AIOps",
     "IA aplicada a operações: interpretar dados operacionais e agir"
    ],
    [
     "NL2Q",
     "Linguagem natural para consulta (PromQL/LogQL)"
    ],
    [
     "PromQL / LogQL",
     "Linguagens de consulta do Prometheus e de logs"
    ],
    [
     "Prophet",
     "Previsão de séries temporais com sazonalidade"
    ],
    [
     "Isolation Forest",
     "Detecção de anomalias (pontos fora do padrão)"
    ],
    [
     "Fadiga de alertas",
     "Excesso de notificações que leva a ignorar as críticas"
    ],
    [
     "Falso positivo/negativo",
     "Alarme sem problema / problema sem alarme"
    ],
    [
     "Dashboard dinâmico",
     "Painel gerado pela IA a partir do contexto do incidente"
    ]
   ],
   "links": [
    [
     "Prometheus",
     "https://prometheus.io/"
    ],
    [
     "Grafana",
     "https://grafana.com/"
    ],
    [
     "Slides do módulo 5",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica"
    ]
   ],
   "codigo": [
    {
     "proj": "labs/modulo5_aiops.py + tools/aiops_tools.py + incident_dashboard.json",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo5_aiops.py",
     "resumo": "Um agente, uma Task e três ferramentas (NL para PromQL, alerta preditivo de disco e gerador de dashboard) que percorrem o cenário do disco enchendo.",
     "fluxo": [
      "<code>labs/modulo5_aiops.py</code>: <code>get_aiops_agent(tools=[nl_to_promql, predictive_disk_alert, generate_grafana_dashboard])</code> e uma única Task com os 3 passos, em <code>Crew(..., verbose=True).kickoff()</code>.",
      "<code>nl_to_promql</code>: se o texto tem «taxa de erro»/«error» devolve <code>rate(http_requests_total{status=~\"5..\"}[5m]) / rate(http_requests_total[5m])</code>; se tem «disco»/«disk», <code>node_filesystem_avail_bytes{mountpoint=\"/data\"} / node_filesystem_size_bytes{mountpoint=\"/data\"} * 100</code>; senão <code>up{job=\"kubernetes-pods\"}</code>.",
      "<code>predictive_disk_alert</code>: se o histórico contém «growth» ou «crescimento», devolve um alerta com «saturação de 100% em exatas 4 horas»; senão «padrão normal».",
      "<code>generate_grafana_dashboard</code>: monta um dicionário com <code>title</code> «Dynamic Incident Dashboard: &lt;contexto&gt;» e dois painéis (<code>timeseries</code> de <code>node_filesystem_avail_bytes</code> e <code>stat</code> de erros 500) e grava <code>incident_dashboard.json</code> no diretório atual. O arquivo da raiz é uma saída de execução."
     ],
     "rodar": [
      "<code>python3 labs/modulo5_aiops.py</code> (opção 5 do menu).",
      "Opcional: <code>docker run -d -p 3000:3000 --name meu-grafana grafana/grafana</code> e importar o JSON (slide 5)."
     ],
     "armadilhas": [
      "O slide manda rodar <code>python3 modulo5_aiops.py</code> (sem <code>labs/</code>): o caminho correto é <code>labs/modulo5_aiops.py</code>.",
      "Não há modelo preditivo: o README fala em «regressão linear» e a docstring cita Prophet, mas o código só testa palavras-chave e devolve texto fixo. As «4 horas» não são calculadas a partir de 85% + 2 GB/h.",
      "O JSON do dashboard é mínimo (<code>title</code> e <code>panels</code>); não conferi se o Grafana o importa sem ajustes, embora a aula mostre a importação funcionando.",
      "Os dados do Grafana na aula são mockados; nada consulta um Prometheus real."
     ]
    }
   ]
  },
  {
   "id": "D6-05",
   "bloco": "d06-b2",
   "mod": "Unidade 6 · Aulas 1 a 3",
   "emoji": "💬",
   "read": "7 min",
   "title": "ChatOps com governança: RBAC, IAM e Human-in-the-Loop",
   "short": "Operar infra pelo chat em linguagem natural, mas com identidade, permissão e aprovação humana.",
   "oneliner": "<b>ChatOps</b> transforma o canal de conversa em interface operacional: o usuário pede em linguagem natural e o agente executa, <b>desde que identidade (IAM), permissões (RBAC) e aprovação humana (Human-in-the-Loop)</b> estejam no caminho. O módulo é ChatOps <i>com governança</i>, não só conveniência.",
   "vovo": [
    "É como pedir pelo WhatsApp que o síndico abra o portão: prático para todo mundo, mas o síndico confere quem está pedindo. Pedido simples («o portão está aberto?») ele responde na hora; pedido perigoso («derrube o muro») ele só faz depois de uma confirmação extra.",
    "Facilitar o acesso sem controle é como dar a chave de todas as portas para quem escreve primeiro no grupo."
   ],
   "oque": [
    "<b>ChatOps:</b> o foco não é Slack ou Teams, e sim o canal virar interface para infraestrutura, segurança e automação, sem exigir que a pessoa saiba Terraform, AWS ou kubectl. É a mesma democratização do NL2Q aplicada a operações.",
    "<b>Autonomia não é anarquia:</b> automação amplia o impacto de um erro. Um bot que escala o cluster também pode gerar custo enorme se qualquer um o acionar (o exemplo dos slides: o estagiário escalando 1.000 instâncias de GPU).",
    "<b>RBAC + IAM:</b> RBAC define o que cada perfil pode fazer; IAM identifica quem pede. O agente cruza a identidade de quem solicitou (ex.: ID do Slack) com as permissões antes de agir.",
    "<b>Caso GitLab 2017:</b> alguém recém-chegado removeu dados críticos. O problema não era a pessoa, e sim o processo que permitiu acesso tão sensível. É a <b>blameless culture</b>: buscar falhas de processo, não culpados. Vale também para agentes mal configurados.",
    "<b>Human-in-the-Loop (HITL):</b> a IA analisa, prepara código e comandos, mas antes de executar em produção o fluxo <b>pausa</b> e uma pessoa autorizada aprova (um sênior, senha temporária ou fluxo formal).",
    "<b>Observabilidade do próprio agente:</b> logs do CrewAI mostram como o agente interpreta, classifica e escolhe ferramentas. Agentes também são componentes que precisam ser observados e governados."
   ],
   "como": [
    "<b>Agente de ChatOps:</b> «engenheiro de automação de ChatOps» com contexto de governança, RBAC e integração com Slack/Teams. A regra principal: <b>nunca executar ação destrutiva sem validação humana</b>.",
    "<b>Simulador em Streamlit:</b> em vez de integrar Slack/Teams, uma interface local reproduz o chat, com um canal «InfraOps». Isso concentra a aula em agentes, permissões e governança.",
    "<b>Três cenários de mensagem:</b> baixo risco (consulta; segue direto), destrutiva (interrompe e pede aprovação) e fora de contexto. Exigir aprovação para tudo vira burocracia; não exigir para nada vira risco, e o equilíbrio é a parte difícil.",
    "<b>Ferramenta de guardrail por palavras-chave:</b> se o comando traz termos de destruição, o agente pede uma credencial de aprovação; sem ela, bloqueia. É propositalmente simples; em produção a classificação de risco seria muito mais sofisticada.",
    "<b>Segredo no código:</b> a credencial está escrita no código só para a demo e, na gravação, chega a aparecer na conversa. A autora é explícita: em ambiente real, use gerenciamento de segredos.",
    "<b>Demonstração (Aula 3):</b> «quantas máquinas estão rodando?» e «gere um plano do Terraform» passam sem aprovação; a solicitação de remover um recurso crítico dispara o HITL, e os logs do CrewAI espelham o que aparece no chat (rastreabilidade para auditoria)."
   ],
   "aplica": [
    "Bot de plataforma no Slack/Teams para consultas, <code>terraform plan</code> e provisionamento de ambientes temporários.",
    "Fluxo de aprovação para ações destrutivas ou de custo alto (destroy, escala, reinício).",
    "Trilha de auditoria: quem pediu, o que o agente decidiu e quem aprovou."
   ],
   "pros": [
    "Menos barreira técnica para usar a plataforma.",
    "Operações críticas têm controle humano explícito.",
    "Log do agente dá rastreabilidade e confiança."
   ],
   "contras": [
    "Segurança baseada só em palavras-chave é frágil.",
    "Cada aprovação exigida custa velocidade; calibrar é um trade-off.",
    "O controle só vale se identidade e permissão forem verificadas fora do LLM."
   ],
   "traps": [
    "Segredo ou senha de aprovação visível para o modelo ou hard-coded no código.",
    "Achar que HITL e RBAC são a mesma coisa: um é «pode?», o outro «alguém aprova?».",
    "Tratar o chat como identidade: é preciso verificar quem é o usuário.",
    "Esquecer de logar decisões do agente."
   ],
   "tip": "Faça a verificação de identidade, permissão e aprovação em código determinístico, fora do alcance do modelo: o LLM só deve receber o resultado («permitido» ou «bloqueado»).",
   "cola": [
    [
     "ChatOps",
     "Operar infra por canais de chat"
    ],
    [
     "RBAC",
     "Controle de acesso por papel"
    ],
    [
     "IAM",
     "Gestão de identidade e permissões na nuvem"
    ],
    [
     "Human-in-the-Loop",
     "Pausa antes de executar para aprovação humana"
    ],
    [
     "Blameless culture",
     "Investigar falhas de processo, não culpar pessoas"
    ],
    [
     "Ação destrutiva",
     "Remoção/destruição de recursos que exige validação extra"
    ],
    [
     "Streamlit",
     "Biblioteca Python para interfaces web (simulador de chat)"
    ]
   ],
   "links": [
    [
     "Streamlit",
     "https://streamlit.io/"
    ],
    [
     "Slides do módulo 6",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica"
    ]
   ],
   "codigo": [
    {
     "proj": "labs/modulo6_chatops.py + tools/chatops_tools.py",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo6_chatops.py",
     "resumo": "Simulador de Slack em Streamlit: cada mensagem vira uma Task para o agente de ChatOps, que usa <code>execute_terraform</code>; comandos com destroy/apagar/destruir exigem a senha do gestor.",
     "fluxo": [
      "<code>labs/modulo6_chatops.py</code>: <code>st.set_page_config</code>, título «Nexus Slack Simulator», canal <code>#infra-ops</code> e usuário fixo <code>@camilla.martins</code>. O histórico fica em <code>st.session_state.messages</code> e é repintado a cada interação.",
      "Para cada mensagem (<code>st.chat_input</code>), o app cria <code>get_chatops_agent(tools=[execute_terraform])</code>, uma Task («O usuário @camilla.martins disse: '…'. Se for algo crítico, use 'execute_terraform'. Responda curto e com emojis.») e roda <code>Crew(...).kickoff()</code>. Exceções viram «Erro na IA».",
      "<code>tools/chatops_tools.py</code>, <code>execute_terraform(command, manager_password=\"None\")</code>: se o comando contém <code>destruir</code>, <code>apagar</code> ou <code>destroy</code>, exige <code>manager_password == \"GESTOR-APROVA\"</code>; sem isso devolve «BLOCKED». Qualquer outro comando devolve «SUCCESS (Low impact)». Não executa Terraform de verdade."
     ],
     "rodar": [
      "<code>streamlit run labs/modulo6_chatops.py</code> (ou <code>python3 -m streamlit run ...</code>, como no slide 6; opção 6 do menu), em <code>http://localhost:8501</code>.",
      "Teste: «@nexus-bot destrua o banco de dados». O README informa a senha <code>GESTOR-APROVA</code>."
     ],
     "armadilhas": [
      "A senha está no <i>docstring</i> da ferramenta, que o CrewAI entrega ao LLM como descrição da tool. O modelo pode, portanto, fornecer a senha sozinho: o HITL só funciona se o modelo se comportar, o que contraria a lição da própria aula (a apostila reconhece o segredo exposto como simplificação).",
      "Cada mensagem recria agente e crew e a Task só leva a mensagem atual: o histórico do chat é exibido na UI mas não entra no contexto do agente. Responder «a senha é X» numa mensagem seguinte não tem o contexto da anterior (inferência do código lido).",
      "Não há RBAC nem IAM no código: o usuário é uma string fixa no prompt. A palavra-chave cobre só 3 termos (remover, delete, terminate passam como baixo impacto).",
      "O tema CSS (<code>.reportview-container</code>) é de versões antigas do Streamlit e provavelmente não tem efeito (não verifiquei)."
     ]
    }
   ]
  },
  {
   "id": "D6-06",
   "bloco": "d06-b2",
   "mod": "Unidade 7 · Aulas 1 a 3",
   "emoji": "🛡️",
   "read": "7 min",
   "title": "DevSecOps com IA: triagem de vulnerabilidades, CVE-2024-3094 e Compliance as Code",
   "short": "O scanner acha centenas de CVEs; o agente decide quais são exploráveis e entrega um plano de ação.",
   "oneliner": "Trivy e Snyk são ótimos em achar vulnerabilidades e péssimos em dizer <b>quais importam</b>. O agente de DevSecOps age como analista de segurança ofensiva: lê o relatório do scanner, descarta ruído e prioriza o que é <b>explorável</b>, como o backdoor do <b>XZ Utils (CVE-2024-3094)</b>, gerando um relatório executivo com plano de ação.",
   "vovo": [
    "Um detector de metais de aeroporto apita para fivela, moeda e chave. Se o segurança tratasse todo apito como ameaça, a fila nunca andaria. O agente é o segurança experiente: olha o que apitou e separa «é só uma fivela» de «isso aqui é uma arma».",
    "O scanner continua apitando (é bom nisso). A IA entra depois, interpretando e priorizando."
   ],
   "oque": [
    "<b>Fadiga de alertas em segurança:</b> uma imagem de container pode vir com dezenas ou centenas de itens High/Critical. Vulnerabilidade <i>presente</i> não é vulnerabilidade <i>explorável</i>: a biblioteca pode nem ser usada, ou ser dependência indireta fora do caminho de execução.",
    "<b>Caso XZ Utils (CVE-2024-3094):</b> backdoor inserido deliberadamente no XZ (biblioteca de compressão amplamente usada em Linux). Mostra que o risco moderno inclui <b>ataques à cadeia de suprimentos</b>: uma única CVE ligada a uma campanha ativa pode pesar mais que todas as outras juntas.",
    "<b>Imagem popular não é imagem segura:</b> milhões de downloads não garantem ausência de problemas. Avalie procedência, mantenedor e selos de verificação (imagens oficiais e autores verificados no Docker Hub).",
    "<b>Agente como «segurança ofensiva»:</b> o background do agente muda a forma de ler o relatório, focando em invasões reais, backdoors e exploração, não em severidade genérica.",
    "<b>Relatório executivo:</b> gestores precisam do risco e da ação, não da lista de pacotes. A IA traduz saída técnica em prioridades e recomendações (atualizar libs, substituir pacotes, verificar impactos secundários).",
    "<b>Compliance as Code (só teoria):</b> ISO 27001 e SOC 2 exigem coleta de evidências, muitas vezes manual e demorada. Um agente pode atuar como <b>pré-auditor</b> organizando evidências e achando lacunas antes da auditoria, sem substituir a auditoria externa. (Não há laboratório de código para isso.)",
    "<b>Indicação de leitura 4:</b> <i>Securing DevOps</i> reforça a integração contínua de segurança no pipeline e a teoria por trás da fadiga de alertas."
   ],
   "como": [
    "<b>Um agente por domínio:</b> o princípio de todo o curso é não usar um agente genérico. Aqui o agente só trata vulnerabilidades, sem tocar infra ou observabilidade.",
    "<b>Ferramenta-ponte:</b> uma função lê o JSON do Trivy e entrega os dados ao agente, definida dentro do próprio laboratório (mais simples que as ferramentas em <code>tools/</code>). O relatório simula a estrutura real do Trivy.",
    "<b>Tarefa:</b> analisar o relatório, filtrar ruído, procurar ameaças críticas, checar especificamente a CVE-2024-3094 e produzir o relatório executivo com plano de ação imediato.",
    "<b>Resultado da aula:</b> o relatório de teste tinha duas vulnerabilidades principais, o backdoor (prioridade máxima por permitir execução arbitrária de código) e uma falha High na biblioteca MiniZip, que também aparece, só com menos destaque.",
    "<b>Teste de adaptação:</b> adicionou-se à mão uma vulnerabilidade fictícia de componente HTTP (DoS). O agente a leu, interpretou e incorporou ao relatório, provando que não repete resposta pronta.",
    "<b>IA complementa o scanner:</b> o Trivy (Aqua Security) fornece links de referência que dão a profundidade técnica; a IA dá a visão priorizada e contextualizada."
   ],
   "aplica": [
    "Triagem pós-scan no CI: priorizar o que bloqueia a esteira e o que vira backlog.",
    "Relatório executivo de segurança para liderança.",
    "Pré-auditoria contínua de evidências de compliance."
   ],
   "pros": [
    "Reduz a fadiga de alertas e o tempo de análise manual.",
    "Adapta a priorização ao contexto da empresa (RCE, supply chain, credenciais).",
    "Gera plano de ação, não só lista."
   ],
   "contras": [
    "A priorização é uma opinião de LLM: pode errar, inclusive subestimar um item.",
    "Depende da qualidade e do formato do relatório de entrada.",
    "Não substitui scanner, auditoria nem analista de segurança."
   ],
   "traps": [
    "Confiar na severidade do scanner sem avaliar exploração real.",
    "Presumir que imagem muito baixada é segura.",
    "Deixar a IA «sumir» com vulnerabilidades sem registro do que foi descartado.",
    "Tratar o JSON do laboratório como dado real de produção."
   ],
   "tip": "Peça ao agente que liste também o que foi descartado e por quê: a decisão de ignorar um CVE precisa de trilha de auditoria.",
   "cola": [
    [
     "Trivy / Snyk",
     "Scanners de vulnerabilidade de imagens e dependências"
    ],
    [
     "CVE",
     "Identificador público de vulnerabilidade"
    ],
    [
     "CVE-2024-3094",
     "Backdoor no XZ Utils (liblzma), ataque à cadeia de suprimentos"
    ],
    [
     "Falso positivo",
     "Alerta sem risco real no contexto"
    ],
    [
     "Supply chain",
     "Ataque via componentes reutilizados"
    ],
    [
     "Compliance as Code",
     "Evidências e controles de conformidade automatizados"
    ],
    [
     "Pré-auditor",
     "Agente que organiza evidências antes da auditoria formal"
    ]
   ],
   "links": [
    [
     "Trivy",
     "https://trivy.dev/"
    ],
    [
     "CVE-2024-3094 (referência do README do curso)",
     "https://avd.aquasec.com/nvd/cve-2024-3094"
    ],
    [
     "Slides do módulo 7",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica"
    ]
   ],
   "codigo": [
    {
     "proj": "labs/modulo7_devsecops.py + data/trivy.json + tools/governance_tools.py",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo7_devsecops.py",
     "resumo": "Um agente de DevSecOps lê <code>data/trivy.json</code> (relatório da imagem <code>python:3.11-slim</code>), filtra o ruído e produz um relatório executivo com foco na CVE-2024-3094.",
     "fluxo": [
      "<code>labs/modulo7_devsecops.py</code> define a ferramenta <code>analyze_trivy_report(file_path)</code>, que devolve o <code>json.load</code> do arquivo, e usa <code>get_devsecops_agent(tools=[analyze_trivy_report])</code>. O caminho absoluto de <code>data/trivy.json</code> vai dentro do texto da Task.",
      "A Task pede: filtrar ruído, identificar ameaça crítica de backdoor (como a CVE-2024-3094) e gerar relatório executivo com plano de ação imediato.",
      "<code>data/trivy.json</code> tem <code>ArtifactName: python:3.11-slim</code> e <b>3</b> vulnerabilidades: CVE-2024-3094 (<code>liblzma5</code> 5.6.0-1, corrigida em 5.6.1-1, CRITICAL), CVE-2023-45853 (<code>zlib1g</code>, HIGH, «integer overflow in miniizip») e <code>CVE-2022-123</code> (nginx, LOW, DoS por HTTP/2).",
      "<code>tools/governance_tools.py</code> traz três ferramentas-esboço com texto fixo (<code>triage_security_vulnerabilities</code>, <code>optimize_cicd_pipeline</code>, <code>analyze_finops_costs</code>), que cobrem as unidades 7, 8 e 9. Nenhum laboratório as importa."
     ],
     "rodar": [
      "<code>python3 labs/modulo7_devsecops.py</code> (opção 7 do menu); os slides usam <code>./venv/bin/python3 labs/modulo7_devsecops.py</code>.",
      "Para repetir o experimento da aula, acrescente uma entrada em <code>Vulnerabilities</code> do JSON e rode de novo."
     ],
     "armadilhas": [
      "Os slides e a apostila falam em ~50 CVEs; o <code>trivy.json</code> tem 3. A terceira (<code>CVE-2022-123</code>, com 3 dígitos, formato que não existe de verdade) provavelmente é a entrada fictícia acrescentada na aula (a apostila descreve o teste de um DoS em componente HTTP; não verifiquei o histórico do arquivo).",
      "O README chama de «scan real», mas é um arquivo escrito/editado à mão com a estrutura do Trivy (inclusive com «miniizip» escrito errado e URLs de domínios diferentes).",
      "<code>governance_tools.py</code> é código morto: três ferramentas com resposta fixa que nenhum lab usa; as ferramentas reais das unidades 7 a 9 estão dentro dos próprios labs.",
      "A «análise» é do LLM: o código só lê JSON, e a priorização varia de execução para execução."
     ]
    }
   ]
  },
  {
   "id": "D6-07",
   "bloco": "d06-b3",
   "mod": "Unidade 8 · Aulas 1 a 4",
   "emoji": "⚡",
   "read": "6 min",
   "title": "CI/CD Copilot: cache, multi-stage build, Canary e rollback automático",
   "short": "O agente lê o workflow, acha o desperdício (falta de cache) e propõe a versão otimizada.",
   "oneliner": "Pipelines rígidas rodam tudo a cada commit e queimam tempo de runner. O <b>CI/CD Copilot</b> revisa o workflow do GitHub Actions, encontra o gargalo (sem <b>cache</b> de dependências) e propõe a versão otimizada; o módulo também cobre <b>multi-stage build</b>, <b>Canary</b> e <b>rollback pós-deploy</b>.",
   "vovo": [
    "Toda manhã você sai de casa e, em vez de pegar o café já moído do dia anterior, planta o cafezal de novo. É isso que uma pipeline sem cache faz: baixa todas as dependências do zero em cada execução. O cache é guardar o café moído e só preparar outro se a receita (o lockfile) mudou.",
    "Já o multi-stage build é cozinhar numa cozinha cheia de panelas e entregar só o prato pronto, sem levar a bagunça junto."
   ],
   "oque": [
    "<b>Pipeline adaptativa:</b> em vez de executar sempre o mesmo fluxo, o agente olha os arquivos alterados e decide quais testes, validações ou builds são necessários, dando feedback mais rápido e gastando menos infraestrutura.",
    "<b>Gargalos comuns:</b> camadas Docker mal estruturadas, ausência de cache e uso ineficiente do gerenciador de dependências (o clássico <code>node_modules</code> reinstalado). O mesmo vale para pip (Python) e Go.",
    "<b>Runners e custo:</b> cada minuto de runner (GitHub-hosted ou self-hosted) tem custo. Pipeline mais rápida é também eficiência financeira e ROI.",
    "<b>Multi-stage build:</b> um container deve ter uma única responsabilidade e conter só o necessário. O build usa um estágio completo (compiladores, ferramentas) e o estágio final, menor (ex.: Alpine), recebe só o artefato. Resultado: imagem menor, deploy mais rápido, menor superfície de ataque.",
    "<b>Cache no GitHub Actions:</b> reutiliza o que foi baixado em execuções anteriores. A <b>chave de cache</b> deriva do lockfile (muda o lockfile, muda a chave, invalida o cache) e as <b>chaves de restauração</b> funcionam como plano B para achar uma versão compatível.",
    "<b>Qualidade e rollback:</b> o «deploy de sexta» divide opiniões, mas com testes, observabilidade e recuperação robustos não deveria haver diferença entre segunda e sexta. A <b>inteligência pós-deploy</b> monitora erro e latência nos primeiros minutos e, se a taxa de erro (ex.: HTTP 500) sobe, pode reverter via API do GitHub Actions, GitLab CI etc.",
    "<b>Canary:</b> a mesma ideia do módulo 3, agora como proteção da entrega: poucos usuários primeiro, métricas observadas, e reversão automática ao primeiro comportamento anômalo."
   ],
   "como": [
    "<b>Agente:</b> engenheiro de plataforma com «aversão ao desperdício de tempo de runner»; conhece cache avançado, multi-stage e Canary. Além de acelerar, deve manter rollback funcional e não comprometer a segurança do processo.",
    "<b>Workflow-alvo:</b> um workflow Node.js propositalmente ineficiente (Ubuntu; instalar dependências, build, testes) com um comentário apontando a falta de cache. A pipeline do microserviço Checkout leva ~10 min; a meta é reduzir cerca de 60%.",
    "<b>Análise e reescrita:</b> o agente identifica que tudo é baixado a cada execução, reescreve o trecho com o cache do GitHub Actions baseado no lockfile e estima <b>2 a 5 minutos</b> de economia por execução, dependendo do projeto.",
    "<b>Sugestão, não commit:</b> o agente devolve uma proposta estruturada, sem alterar o arquivo. Na aula a sugestão foi refinada com outra ferramenta de IA para o formato YAML correto, prática comum de iterar sobre a saída do modelo.",
    "<b>Equivalência funcional:</b> a pipeline otimizada faz o mesmo (instala, compila, testa); só desperdiça menos. Otimizar não significa reduzir a qualidade das validações."
   ],
   "aplica": [
    "Revisão automática de workflows para achar cache ausente e jobs redundantes.",
    "Dockerfiles multi-stage em imagens com compilação.",
    "Rollback automático baseado em taxa de erro após o deploy."
   ],
   "pros": [
    "Feedback mais rápido para devs e menor custo de runner.",
    "Padrões de otimização aplicados de forma consistente.",
    "A mesma análise vale para vários repositórios."
   ],
   "contras": [
    "O ganho depende de projeto, dependências e infraestrutura; a estimativa é aproximada.",
    "Cache mal configurado pode servir dependência desatualizada.",
    "Rollback automático exige métricas confiáveis e guardrails (módulo 11)."
   ],
   "traps": [
    "Cachear sem chave derivada do lockfile (ou com chave que nunca muda).",
    "Aplicar a sugestão da IA sem validar o YAML.",
    "Confundir cache do Docker (camadas) com cache de dependências do CI.",
    "Otimizar a pipeline cortando testes necessários."
   ],
   "tip": "Derive a chave de cache do lockfile e mantenha uma chave de restauração mais genérica: o primeiro garante correção, o segundo evita perder todo o cache numa pequena mudança.",
   "cola": [
    [
     "Runner",
     "Ambiente que executa os jobs do CI (GitHub-hosted ou self-hosted)"
    ],
    [
     "Cache de dependências",
     "Reutiliza pacotes baixados entre execuções"
    ],
    [
     "Chave de cache",
     "Identificador derivado do lockfile que decide reuso/invalidação"
    ],
    [
     "Multi-stage build",
     "Estágio de build completo + estágio final enxuto"
    ],
    [
     "Canary",
     "Liberação gradual com rollback ao detectar anomalia"
    ],
    [
     "Pipeline adaptativa",
     "Executa só o que a mudança exige"
    ],
    [
     "Pós-deploy",
     "Monitoramento automático logo após a implantação"
    ]
   ],
   "links": [
    [
     "GitHub Actions",
     "https://docs.github.com/actions"
    ],
    [
     "Slides do módulo 8",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica"
    ]
   ],
   "codigo": [
    {
     "proj": "labs/modulo8_cicd.py + data/workflow_lento.yaml + data/workflow_rapido.yaml",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo8_cicd.py",
     "resumo": "O agente lê <code>data/workflow_lento.yaml</code>, aponta a falta de cache e propõe a reescrita para Node.js; <code>workflow_rapido.yaml</code> é a versão otimizada de referência.",
     "fluxo": [
      "<code>labs/modulo8_cicd.py</code> define a ferramenta <code>analyze_workflow_yaml(file_path)</code> (devolve o conteúdo do arquivo) e usa <code>get_cicd_agent(tools=[analyze_workflow_yaml])</code>. O caminho de <code>data/workflow_lento.yaml</code> é montado a partir de <code>PROJECT_ROOT</code> e vai na Task.",
      "A Task pede identificar a lentidão («dica: falta de cache»), reescrever o trecho com as boas práticas de cache para Node.js e explicar a economia estimada.",
      "<code>data/workflow_lento.yaml</code>: job <code>build</code> em <code>ubuntu-latest</code> com <code>actions/checkout@v4</code>, <code>npm install</code> (comentário «ERRO: Sem cache»), <code>npm run build</code> e <code>npm test</code>.",
      "<code>data/workflow_rapido.yaml</code>: acrescenta <code>actions/cache@v3</code> com <code>path: ~/.npm</code>, <code>key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}</code> e <code>restore-keys</code> genérico, seguido dos mesmos passos."
     ],
     "rodar": [
      "<code>python3 labs/modulo8_cicd.py</code> (opção 8 do menu); os slides usam <code>./venv/bin/python3 labs/modulo8_cicd.py</code>.",
      "Compare a sugestão do agente com <code>data/workflow_rapido.yaml</code>."
     ],
     "armadilhas": [
      "O agente só sugere: nenhum código grava o YAML otimizado nem mede o ganho. As cifras (2 a 5 min, ~60%) vêm da fala da aula e da estimativa do LLM.",
      "<code>workflow_rapido.yaml</code> declara <code>id: cache</code> sem usar a saída <code>steps.cache.outputs</code>, e continua com <code>npm install</code> (não <code>npm ci</code>). A chave depende de <code>package-lock.json</code>; sem esse arquivo o cache nunca valida.",
      "O Dockerfile do módulo (módulo 13) é de um único estágio, apesar de a unidade ensinar multi-stage.",
      "Rollback automático, pipeline adaptativa e Canary são só teoria: o repositório não tem código para isso neste módulo."
     ]
    }
   ]
  },
  {
   "id": "D6-08",
   "bloco": "d06-b3",
   "mod": "Unidade 9 · Aulas 1 e 2",
   "emoji": "💰",
   "read": "6 min",
   "title": "FinOps com IA: recursos zumbis, rightsizing, Spot e relatório de economia",
   "short": "O agente lê o inventário de nuvem, caça desperdício e calcula quanto se economiza.",
   "oneliner": "<b>FinOps</b> junta tecnologia, operação e finanças para que o gasto em nuvem acompanhe a necessidade real. O agente FinOps funciona como <b>auditor financeiro permanente</b>: lê um inventário em JSON, acha <b>recursos zumbis</b> e instâncias <b>superdimensionadas</b> e entrega um relatório com economia estimada por ação.",
   "vovo": [
    "Nuvem é como um hotel em que você pode reservar quartos com um clique. Fácil demais: sobram quartos pagos que ninguém usa (zumbis), suítes presidenciais para quem só dorme (superdimensionamento) e a conta chega no fim do mês.",
    "O agente é o auditor que passa de porta em porta com o inventário na mão e anota: «este quarto está vazio, pode devolver; esta suíte pode virar um quarto simples»."
   ],
   "oque": [
    "<b>Custos de nuvem não são intuitivos:</b> VM cobra por tamanho, armazenamento e tempo ligada; Kubernetes por nós e capacidade; serverless por execuções e tempo. Entender o modelo financeiro é tão importante quanto a parte técnica.",
    "<b>Free Tier e créditos:</b> a AWS tem o Free Tier (limites por tipo de recurso e tempo); Google Cloud e Oracle costumam dar créditos. Em qualquer caso, configure <b>alertas orçamentários</b> para não ser surpreendido.",
    "<b>Infracost e Kubecost:</b> Infracost mostra o impacto financeiro de mudanças de IaC antes do apply (inclusive no code review); Kubecost foca no custo por nó e configuração de clusters Kubernetes. Os slides ilustram: o bot comenta no PR «essa mudança aumenta sua conta em $200/mês».",
    "<b>Cultura FinOps:</b> aproximar a responsabilidade financeira de quem cria o recurso, tratando eficiência de custo como requisito de qualidade, junto com segurança e disponibilidade.",
    "<b>Recursos zumbis:</b> existem e custam sem gerar valor: volumes EBS órfãos (a VM sumiu, o disco ficou), Elastic IPs não associados e snapshots antigos (sem política de retenção). Ficam silenciosos porque não causam falha.",
    "<b>Rightsizing:</b> usar histórico de CPU e memória para adequar o tamanho (ex.: um blog em máquina grande com 2 a 3% de CPU). <b>Spot</b>: capacidade ociosa com desconto grande, mas pode ser interrompida, então serve para lote e dev, não para produção crítica (Fargate, por outro lado, simplifica a operação a custo maior).",
    "<b>Indicação de leitura 2:</b> <i>Cloud FinOps</i> dá a base de negócio (rightsizing, caça a zumbis) para calibrar o agente com métricas reais."
   ],
   "como": [
    "<b>Agente FinOps:</b> «auditor financeiro de nuvem» com histórico em auditoria e otimização com recursos de baixo custo. A qualidade da instrução manda: em vez de «analise custos», peça zumbis, instâncias superdimensionadas, volumes sem uso, IPs soltos e o impacto financeiro de cada item.",
    "<b>Entrada estruturada:</b> um inventário, normalmente JSON (que pode vir do state do Terraform), com atributos como tipo, região, CPU, custo e associação. É um retrato da nuvem em um momento.",
    "<b>Saída esperada:</b> um relatório com diagnóstico, estimativa e recomendação por item (remover volume órfão, liberar IP, reduzir instância), cada um com impacto financeiro, o que facilita priorizar e comunicar com a área de negócio.",
    "<b>Estimativas são projeções:</b> o custo final varia com tráfego, armazenamento e transferência. Mesmo assim servem de referência para decisão.",
    "<b>Preventivo, não reativo:</b> em vez de descobrir o problema na fatura, o processo vira contínuo. E democratiza a análise para DevOps, SRE e devs interessados em infra."
   ],
   "aplica": [
    "Auditoria periódica de contas AWS/GCP para limpeza de zumbis em dev e homologação.",
    "Rightsizing por histórico de utilização com revisão humana.",
    "Estimativa de custo no PR de infraestrutura."
   ],
   "pros": [
    "Economia imediata com baixo risco (zumbis não afetam produção).",
    "Relatório em linguagem de negócio ajuda a justificar iniciativas.",
    "Funciona com qualquer fonte estruturada (JSON, state, exportação do provedor)."
   ],
   "contras": [
    "Estimativas do LLM podem divergir do preço real do provedor.",
    "Rightsizing mal feito afeta desempenho; exige métricas de período longo.",
    "Spot não serve para cargas que não toleram interrupção."
   ],
   "traps": [
    "Remover um recurso «órfão» sem checar dono e dependência.",
    "Dimensionar por um pico isolado de CPU.",
    "Esquecer de configurar alertas de orçamento.",
    "Tomar a economia estimada pelo agente como valor contratual."
   ],
   "tip": "Peça ao agente a conta item a item (recurso, custo mensal, ação, economia) e confira você mesmo a soma: números de LLM precisam de conferência.",
   "cola": [
    [
     "FinOps",
     "Gestão financeira de nuvem com cultura de responsabilidade"
    ],
    [
     "Recurso zumbi",
     "Existe e cobra, mas não gera valor (EBS órfão, EIP solto, snapshot antigo)"
    ],
    [
     "Rightsizing",
     "Ajustar o tamanho ao consumo real"
    ],
    [
     "Spot",
     "Capacidade ociosa com desconto, interrompível"
    ],
    [
     "Free Tier / créditos",
     "Uso gratuito limitado (AWS) / saldo promocional (GCP, Oracle)"
    ],
    [
     "Infracost",
     "Estima custo de mudanças de IaC antes do apply"
    ],
    [
     "Kubecost",
     "Visibilidade de custo em clusters Kubernetes"
    ],
    [
     "Alerta orçamentário",
     "Notificação ao atingir % do orçamento"
    ]
   ],
   "links": [
    [
     "Slides do módulo 9",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides"
    ],
    [
     "Pasta data do módulo (inventário)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/data"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica"
    ]
   ],
   "codigo": [
    {
     "proj": "labs/modulo9_finops.py + data/inventario_cloud.json",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo9_finops.py",
     "resumo": "Um agente FinOps lê <code>data/inventario_cloud.json</code> e produz um relatório com zumbis, rightsizing e economia mensal estimada em dólares.",
     "fluxo": [
      "<code>labs/modulo9_finops.py</code> define <code>analyze_cloud_costs(file_path)</code> (devolve o JSON do arquivo) e usa <code>get_finops_agent(tools=[analyze_cloud_costs])</code>. A Task pede zumbis (volumes disponíveis sem uso, IPs soltos), instâncias superdimensionadas e a economia total em dólares.",
      "<code>data/inventario_cloud.json</code> (conta fictícia <code>123456789012</code>, <code>us-east-1</code>) tem 3 recursos: volume <code>vol-0a1b2c3d</code> (EBS 500 GB, <code>available</code>, US$ 50/mês), instância <code>i-99887766</code> (<code>m5.4xlarge</code>, CPU média 2,5%, US$ 340/mês, «Extremely overprovisioned») e <code>eipalloc-001122</code> (Elastic IP sem associação, US$ 5/mês).",
      "O cálculo é feito pelo LLM: o código só entrega o dicionário ao agente."
     ],
     "rodar": [
      "<code>python3 labs/modulo9_finops.py</code> (opção 9 do menu); os slides usam <code>./venv/bin/python3 labs/modulo9_finops.py</code>."
     ],
     "armadilhas": [
      "O slide 9 promete «plano para economizar US$ 500/mês», mas o inventário soma apenas US$ 395/mês de custo (50 + 340 + 5): a meta não é alcançável com esses dados.",
      "Nenhum código soma ou valida a economia; o valor varia a cada execução e precisa ser conferido.",
      "Infracost, Kubecost, snapshots antigos e Spot são teoria da aula: não aparecem no inventário nem no código.",
      "O <code>.dockerignore</code> exclui <code>data/*.json</code>, então este lab falha dentro da imagem Docker do módulo 13 (o arquivo não é copiado)."
     ]
    }
   ]
  },
  {
   "id": "D6-09",
   "bloco": "d06-b3",
   "mod": "Unidades 10 e 11 · Aulas 1 e 2 de cada",
   "emoji": "🚦",
   "read": "9 min",
   "title": "Auto-remediação segura: RAG de runbooks, postmortem automático, guardrails e dry-run",
   "short": "A IA consulta o runbook, propõe o fix e gera o postmortem; a execução só acontece com guardrails e aprovação.",
   "oneliner": "<b>Conhecimento vivo:</b> runbooks e postmortems deixam de ser documentos esquecidos e viram fonte de consulta (RAG) para o agente de SRE. <b>Auto-remediação segura:</b> a IA diagnostica e propõe, mas a execução passa por <b>guardrails</b> (rate limit, Canary Rollback), <b>dry-run</b> e <b>Human-in-the-Loop</b>, separando sugestão de ação.",
   "vovo": [
    "Runbook é a «receita de emergência» do hospital: se o paciente chega com tal sintoma, siga os passos. O problema é que ninguém lê o manual na hora do aperto. Com RAG, o plantonista virtual já chega com a receita certa na mão.",
    "Mas receita não é carta branca: antes de aplicar o remédio, simula-se o efeito (dry-run) e um médico responsável assina. E se o paciente piorar depois da dose, o protocolo manda reverter na hora (rollback)."
   ],
   "oque": [
    "<b>Conhecimento vivo:</b> a documentação existe (wiki, repositório), mas é estática e ninguém consulta durante um incidente. O RAG combina o raciocínio da IA com a base da organização (runbooks, playbooks, políticas, arquiteturas). Também reduz o <b>conhecimento tribal</b> e acelera onboarding.",
    "<b>Runbook</b> descreve sintomas, diagnóstico e ações corretivas de uma situação conhecida. O agente <i>interpreta</i> o runbook junto com o contexto do incidente, em vez de copiá-lo, como faria um SRE experiente.",
    "<b>Postmortem automático:</b> reconstruir o que aconteceu às 3 da manhã é difícil e perde detalhes. Um agente acompanha o incidente (chat, transcrições de reunião, métricas) e gera, quase em tempo real, um rascunho com resumo de impacto, causa raiz, ações corretivas e ações preventivas. A equipe só revisa e complementa.",
    "<b>Circuito de auto-remediação:</b> alerta, investigação (logs, métricas), consulta ao runbook, proposta de correção no ChatOps (módulo 6), validação humana e execução. O exemplo da aula é saturação de conexões num banco, causada por conexões ociosas.",
    "<b>Guardrails e autocura:</b> guardrails limitam o que a automação pode fazer; autocura aplica correções automáticas ou semiautomáticas. O ciclo exige <b>detecção, análise, validação da hipótese e só então ação</b>, porque a mesma métrica pode ter causas diferentes.",
    "<b>Falha em cascata e alucinação:</b> a própria automação pode criar um problema pior, e a IA pode alucinar um comando plausível porém errado. Defesas: <b>circuit breaker</b> operacional, <b>rate limiting</b> (máximo de ações por intervalo), <b>Canary Rollback</b> (monitorar depois da ação e reverter se piorar) e <b>HITL</b> para operações de alto impacto (apagar banco, reiniciar componente central, remover infra).",
    "<b>Dry-run:</b> simular antes de executar, mostrando o que seria criado, modificado ou removido. A IA vira <b>copiloto</b>: investiga, propõe e demonstra o efeito; a decisão final é humana."
   ],
   "como": [
    "<b>Agente SRE de conhecimento:</b> perfil de veterano de plantões, que baseia soluções em documentação oficial e evidências, com uma ferramenta que consulta o runbook do serviço afetado. A consulta é direcionada: banco busca runbook de banco, Kubernetes busca o de cluster.",
    "<b>Exemplo do banco:</b> o runbook orienta olhar processos e sessões abertas sem necessidade. O agente identifica conexões ociosas como causa comum e propõe a remoção, depois produz o rascunho de postmortem (resumo, causa raiz, correção, prevenção).",
    "<b>Segurança operacional:</b> um agente com mentalidade de proteção (auditor das ações propostas) tem prioridade em preservar a estabilidade, mais que em resolver rápido. Uma correção tecnicamente válida pode ser inadequada naquele momento (janela de manutenção, deploy planejado, dependência externa).",
    "<b>Fluxo com aprovação:</b> o agente analisa, propõe, faz dry-run, apresenta o resumo (problema, correção, efeito esperado) e <b>para</b>. Aprovou: executa. Rejeitou: interrompe imediatamente. Não pode haver caminho em que a mudança seja aplicada após rejeição, e a resposta do agente deve refletir fielmente a decisão.",
    "<b>Prompt sem ambiguidade:</b> em fluxos de aprovação, o agente precisa saber exatamente o que fazer em cada ramo. Agentes lidam bem com tarefas complexas, mas precisam de regras claras para exceções.",
    "<b>Cenário K8s:</b> um <i>checkout</i> falha após deployment, o agente acha uma inconsistência no Deployment, gera o ajuste, simula e aguarda o humano.",
    "<b>Indicação de leitura 3:</b> <i>The Site Reliability Workbook</i> aprofunda playbooks, runbooks acionáveis, postmortems baseados em evidência e guardrails operacionais."
   ],
   "aplica": [
    "Assistente de incidente que consulta runbooks e posta no Slack a ação sugerida para aprovar.",
    "Geração de postmortem a partir de chat, métricas e linha do tempo do incidente.",
    "Remediação automática de falhas conhecidas e de baixo risco, com limite de taxa e rollback."
   ],
   "pros": [
    "Respostas alinhadas às práticas internas, com menos dependência de pessoas específicas.",
    "Postmortem sai no calor do incidente, sem perda de detalhe.",
    "Camadas de proteção tornam a automação auditável e reversível."
   ],
   "contras": [
    "Runbook desatualizado ou incompleto leva a recomendação ruim (RAG não corrige documentação ruim).",
    "Cada camada de guardrail adiciona latência e complexidade.",
    "HITL reduz velocidade; é preciso decidir o que realmente exige aprovação."
   ],
   "traps": [
    "Deixar a IA agir só com hipótese, sem validar a causa.",
    "Dry-run que apenas imprime «sucesso» sem executar a simulação real.",
    "Fluxo de aprovação ambíguo, em que rejeitar não interrompe o resto.",
    "Deixar o agente alterar também a documentação/runbook sem revisão."
   ],
   "tip": "Defina por escrito quais ações são «baixo risco, automática», «média, com dry-run» e «alta, só com humano»; é essa tabela que o guardrail precisa implementar.",
   "cola": [
    [
     "Conhecimento vivo",
     "Documentação consultável pelo agente em tempo real"
    ],
    [
     "Runbook",
     "Procedimento para uma situação operacional conhecida"
    ],
    [
     "Postmortem",
     "Documento pós-incidente: causa raiz, ações, prevenção"
    ],
    [
     "Auto-remediação / autocura",
     "Correção automática ou semiautomática de falhas"
    ],
    [
     "Guardrail",
     "Limite operacional que restringe a ação da IA"
    ],
    [
     "Circuit breaker / rate limit",
     "Interrompe ou limita ações em sequência"
    ],
    [
     "Canary Rollback",
     "Monitora depois da ação e reverte se piorar"
    ],
    [
     "Dry-run",
     "Simulação do efeito antes de executar"
    ],
    [
     "Falha em cascata",
     "Correção que causa novos problemas em série"
    ]
   ],
   "links": [
    [
     "Slides dos módulos 10 e 11",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica"
    ]
   ],
   "codigo": [
    {
     "proj": "labs/modulo10_remediation.py + data/runbook_db.md",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo10_remediation.py",
     "resumo": "O agente SRE de conhecimento consulta o runbook do serviço <code>db</code>, identifica o comando de limpeza de conexões e escreve um rascunho de postmortem.",
     "fluxo": [
      "<code>labs/modulo10_remediation.py</code> define <code>consult_runbook(service_name)</code>: lê <code>data/runbook_&lt;service_name&gt;.md</code> (ou devolve «Runbook not found») e a entrega ao agente <code>get_sre_knowledge_agent</code>.",
      "A Task descreve o alerta («Saturação de Conexões» no banco), pede para consultar o runbook de <code>db</code>, identificar o comando SQL exato para limpar conexões ociosas e escrever o rascunho de postmortem.",
      "<code>data/runbook_db.md</code> traz título («Saturação de Conexões no PostgreSQL»), sintoma (alerta <code>PostgresqlTooManyConnections</code>, erro de slots reservados, latência de escrita acima de 500 ms) e diagnóstico com <code>SELECT count(*), state FROM pg_stat_activity GROUP BY state;</code>."
     ],
     "rodar": [
      "<code>python3 labs/modulo10_remediation.py</code> (opção 10 do menu); os slides usam <code>./venv/bin/python3 labs/modulo10_remediation.py</code>."
     ],
     "armadilhas": [
      "O <code>runbook_db.md</code> está <b>truncado</b>: termina dentro de um bloco de código aberto, logo após a query de diagnóstico, e não tem seção de remediação. O «comando SQL exato» que a Task exige não está no runbook, então o agente provavelmente o produz do conhecimento do próprio modelo, o que derrota a ideia de RAG.",
      "O «RAG» é leitura de um arquivo pelo nome do serviço: sem embeddings, busca ou ranking. E <code>service_name</code> vem do LLM e compõe o caminho do arquivo sem validação (endurecimento necessário fora do laboratório).",
      "O postmortem é um rascunho de LLM sobre o texto da Task; não há coleta de chat, métricas ou reunião como na teoria."
     ]
    },
    {
     "proj": "labs/modulo11_guardrails.py",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo11_guardrails.py",
     "resumo": "Um agente Safety SRE corrige o <i>checkout-api</i> (imagem inválida) passando por uma ferramenta com dry-run simulado e confirmação humana pelo terminal.",
     "fluxo": [
      "<code>labs/modulo11_guardrails.py</code> define a ferramenta <code>executar_fix_k8s_com_seguranca(manifesto_yaml)</code>: imprime o manifesto proposto, imprime um «dry-run realizado com sucesso» fixo, pergunta <code>input(\"... (sim/nao)\")</code> e devolve «SUCESSO: Alteração aplicada…» ou «CANCELADO».",
      "O agente é <code>get_safety_sre_agent</code> (backstory: «SEMPRE usa dry-run e nunca aplica mudanças sem aprovação explícita»). A Task manda gerar um Deployment corrigido apontando para <code>checkout-api:v2.0</code>, validar com a ferramenta e nunca aplicar fora dela.",
      "O resultado final é impresso depois de <code>crew.kickoff()</code>."
     ],
     "rodar": [
      "<code>python3 labs/modulo11_guardrails.py</code> (opção 11 do menu) em terminal interativo: ele aguarda a resposta «sim» ou «nao».",
      "Rodar o lab dentro de um container sem TTY tende a falhar em <code>input()</code> (hipótese, não testei)."
     ],
     "armadilhas": [
      "O dry-run é uma linha impressa: nada executa <code>kubectl apply --dry-run</code>, e o «SUCESSO» de aprovação também é só texto. O guardrail demonstra o fluxo, não a proteção.",
      "O slide 11 sugere <code>python3 labs/modulo11_guardrails.py --dry-run</code>, mas o script não processa argumentos.",
      "Rate limiting, circuit breaker e Canary Rollback (teoria da aula) não estão no código.",
      "Único lab com nomes em português (<code>executar_fix_k8s_com_seguranca</code>, <code>manifesto_yaml</code>), resultado do alinhamento à videoaula (commit <code>fix(modulo06): alinha lab do modulo 11</code>).",
      "A proteção depende de o LLM chamar a ferramenta: não há outra camada que impeça um agente de «aplicar» por outro meio."
     ]
    }
   ]
  },
  {
   "id": "D6-10",
   "bloco": "d06-b4",
   "mod": "Unidade 12 · Aulas 1 a 3",
   "emoji": "🧠",
   "read": "6 min",
   "title": "Projeto integrador: orquestração hierárquica, Game Day e ROI",
   "short": "Um Manager delega a SRE, Segurança e FinOps, correlaciona o incidente e entrega um relatório executivo com ROI.",
   "oneliner": "No <b>projeto integrador</b>, um agente <b>Manager</b> (o «CTO virtual») coordena especialistas de <b>SRE, Segurança e FinOps</b> sobre um incidente multidomínio num <b>Game Day</b>, <b>compartilha contexto</b> para correlacionar causa e efeito e consolida tudo num relatório executivo com <b>MTTR e ROI</b>.",
   "vovo": [
    "Numa crise de verdade (a loja fora do ar, um vírus detectado e a conta de luz disparando) ninguém resolve tudo sozinho. O diretor reúne o time: «você cuida da loja, você do vírus, você do custo», escuta cada um e, no fim, explica ao presidente o que aconteceu, o que foi feito e quanto dinheiro isso poupou.",
    "O Manager é esse diretor: não põe a mão na massa, distribui, junta os laudos e traduz para a linguagem do negócio."
   ],
   "oque": [
    "<b>Incidentes são multidisciplinares:</b> uma vulnerabilidade pode gerar instabilidade, que aumenta consumo de infra, que sobe o custo. Agentes isolados resolvem só uma parte.",
    "<b>Orquestração hierárquica:</b> cada agente é especialista em um domínio e uma camada superior (o <b>Manager</b>) entende o problema, <b>delega</b>, consolida e recomenda. Reproduz a estrutura de times reais.",
    "<b>Por que não um agente só:</b> ele trocaria de contexto o tempo todo (custo, segurança, métricas), o que degrada a qualidade. Especialistas focados respondem melhor e processam menos contexto.",
    "<b>Compartilhamento de contexto e correlação:</b> a vulnerabilidade pode ter causado o comportamento anormal, que causou o consumo excessivo, que gerou o custo. Juntos, os sinais aparecem como manifestações de uma mesma causa raiz, não como dezenas de alertas desconectados.",
    "<b>Execução paralela:</b> segurança, SRE e FinOps investigam ao mesmo tempo, o que importa em crise. O Manager então prioriza (às vezes a vulnerabilidade crítica vem primeiro; às vezes estabilizar a operação).",
    "<b>Game Day:</b> simulação controlada de incidentes para testar processos, ferramentas e a equipe antes de acontecerem de verdade. Aqui, o grande teste da arquitetura.",
    "<b>Métricas e ROI:</b> eficiência operacional (horas economizadas), <b>MTTR</b>, vulnerabilidades críticas impedidas de chegar a produção e redução de custo. O <b>ROI</b> converte ganho técnico em indicador de negócio e é o que sustenta o investimento em IA.",
    "<b>Limites:</b> agentes ainda erram, têm vieses e alucinam; o HITL continua pilar. A arquitetura escala com novos especialistas (arquitetura de software, qualidade, backend, front, dados, ML) sem mudar o papel do Manager."
   ],
   "como": [
    "<b>Cenário:</b> o checkout está fora do ar (HTTP 500), há backdoor crítico no pacote XZ e o custo subiu 40% na última hora. Cada especialista recebe uma missão: SRE analisa os logs e estabiliza, Segurança valida o risco do backdoor, FinOps acha o pico de custo.",
    "<b>Consolidação:</b> os resultados voltam ao Manager, que produz o <b>relatório executivo</b>: o problema, os riscos, o que foi corrigido, os benefícios, o dinheiro economizado e o impacto operacional evitado. Linguagem de negócio, não só técnica.",
    "<b>Resultado da simulação:</b> a investigação concluiu que instabilidade, segurança e custos estavam relacionados; o agente de segurança corrigiu vulnerabilidades, o SRE estabilizou e o FinOps propôs otimização. A própria aula frisa que o cenário é simulado.",
    "<b>Transformar em ROI:</b> estabilizar o checkout melhora a capacidade operacional; corrigir vulnerabilidade reduz risco financeiro de incidentes; otimizar custo aparece direto na despesa. Tudo consolidado numa visão única para gestores."
   ],
   "aplica": [
    "Sala de crise virtual: um coordenador que reúne análise de SRE, segurança e custo numa só resposta.",
    "Exercícios de Game Day automatizados.",
    "Relatório pós-incidente para liderança, com impacto financeiro estimado."
   ],
   "pros": [
    "Especialização com visão global: cada agente profundo no seu domínio, e um coordenador integrando.",
    "Correlação entre domínios que alertas isolados não mostram.",
    "Relatório que traduz técnica em valor para o negócio."
   ],
   "contras": [
    "Mais agentes significam mais chamadas de LLM, tokens e latência.",
    "O Manager também é um LLM: a consolidação pode errar ou inventar números de ROI.",
    "Sem ferramentas reais, o relatório é uma narrativa sobre dados fictícios."
   ],
   "traps": [
    "Medir ROI com números inventados pelo modelo.",
    "Dar ao Manager o poder de executar ações críticas sem HITL.",
    "Confundir a simulação do Game Day com resultado real de produção.",
    "Compartilhar contexto demais e estourar a janela do modelo."
   ],
   "tip": "Se um número entra no relatório executivo (horas, dólares, % de MTTR), ele deve vir de uma medição ou ferramenta, nunca da imaginação do modelo.",
   "cola": [
    [
     "Manager agent",
     "Coordena especialistas: delega, consolida, recomenda"
    ],
    [
     "Process hierárquico",
     "Modo do CrewAI em que um manager comanda os demais agentes"
    ],
    [
     "Delegação",
     "Distribuir subtarefas aos especialistas adequados"
    ],
    [
     "Contexto compartilhado",
     "Descobertas de um agente servem aos demais"
    ],
    [
     "Game Day",
     "Simulação controlada de incidentes"
    ],
    [
     "MTTR",
     "Tempo médio de reparo"
    ],
    [
     "ROI",
     "Retorno sobre o investimento"
    ],
    [
     "Relatório executivo",
     "Síntese em linguagem de negócio"
    ]
   ],
   "links": [
    [
     "Slides do módulo 12",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides"
    ],
    [
     "CrewAI",
     "https://www.crewai.com/"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica"
    ]
   ],
   "codigo": [
    {
     "proj": "labs/modulo12_projeto_final.py",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo12_projeto_final.py",
     "resumo": "Crew hierárquica: o Nexus Manager coordena os agentes SRE on-call, DevSecOps e FinOps numa missão com três incidentes simultâneos e devolve um relatório executivo com ROI.",
     "fluxo": [
      "<code>labs/modulo12_projeto_final.py</code> instancia <code>sre = get_oncall_sre()</code>, <code>seguranca = get_devsecops_agent()</code>, <code>finops = get_finops_agent()</code> e <code>nexus_manager = get_nexus_manager_agent()</code>, todos <b>sem ferramentas</b>.",
      "Uma única Task descreve os três incidentes (checkout com erro 500 no K8s, backdoor crítico no XZ, custo +40% na última hora), instrui o Manager a pedir análise a cada especialista e exige um relatório executivo consolidado com as ações e o ROI.",
      "<code>Crew(agents=[sre, seguranca, finops], tasks=[missao_complexa], process=Process.hierarchical, manager_agent=nexus_manager, verbose=True, memory=False)</code>. O <code>nexus_manager</code> tem <code>allow_delegation=True</code>.",
      "O <code>Dockerfile</code> do módulo usa este arquivo como <code>CMD</code>, então é o «Nexus-Bot» que roda no container e no Kubernetes (módulo 13)."
     ],
     "rodar": [
      "<code>python3 labs/modulo12_projeto_final.py</code> (opção 12 do menu).",
      "No container: <code>docker run --rm -e GROQ_API_KEY=... nexus-bot:v1</code> (slide 13.1)."
     ],
     "armadilhas": [
      "Os especialistas não têm ferramentas: o diagnóstico, o ROI e as «correções» são narrativa gerada pelo LLM a partir do texto da Task, sem dados reais. Os números do relatório não vêm de medição.",
      "O mesmo <code>nexus_manager</code> é <code>manager_agent</code> da Crew e dono da Task; não verifiquei como a versão 1.14.4 do CrewAI trata essa combinação.",
      "<code>memory=False</code> tem o comentário «para evitar erros de biblioteca no Mac»; ou seja, o «contexto compartilhado» da teoria vem só do encadeamento da execução hierárquica, não de memória persistente.",
      "Slides de 12 falam em ROI como retorno da IA; nenhum código calcula ROI."
     ]
    }
   ]
  },
  {
   "id": "D6-11",
   "bloco": "d06-b5",
   "mod": "Unidade 13 · Aulas 1 a 3",
   "emoji": "🐳",
   "read": "6 min",
   "title": "Dockerização: o artefato de IA imutável",
   "short": "Imagem pequena, Dockerfile em camadas, segredos por variável de ambiente e container de vida curta.",
   "oneliner": "Empacotar o Nexus-Bot em <b>Docker</b> dá um <b>artefato imutável</b>: mesma versão de Python, mesmas dependências e mesmo comportamento em qualquer máquina. Boas práticas: imagem enxuta (<code>slim</code>), responsabilidade única, <code>.dockerignore</code>, versionamento, cache de camadas e <b>credenciais fora da imagem</b>.",
   "vovo": [
    "Docker é uma marmita lacrada: tem dentro tudo o que o prato precisa, e esquenta igual em qualquer cozinha. A «imagem» é a marmita lacrada de fábrica, o «container» é ela aberta e sendo comida. Já a chave do cofre (API key) nunca vai dentro da marmita: entrega-se na hora de comer.",
    "A receita (Dockerfile) é montada em camadas, e quem muda só a cobertura não precisa refazer o prato inteiro."
   ],
   "oque": [
    "<b>VM x container:</b> VMs rodam um SO completo sobre um hypervisor (mais memória, armazenamento e tempo de subida). Containers compartilham o kernel do host e levam só a aplicação e suas dependências. O Docker (open source desde 2013) popularizou isso e matou o «na minha máquina funciona».",
    "<b>Imagem x container:</b> a imagem é o artefato imutável, uma fotografia do ambiente; o container é uma instância em execução dela. Docker Desktop traz GUI e CLI.",
    "<b>Por que no módulo:</b> controlar a versão do Python (diferenças de versão quebram bibliotecas), eliminar instalação manual e garantir portabilidade (local, homologação, produção, cluster, nuvem).",
    "<b>Imagens pequenas:</b> transferem e sobem mais rápido, ocupam menos e têm menor superfície de ataque. Variantes <code>slim</code> e <code>alpine</code>; técnicas: base enxuta, remover arquivos desnecessários e multi-stage build.",
    "<b>Responsabilidade única:</b> um container, uma função (ex.: WordPress em um container e o servidor web em outro). Cada imagem fica menor, componentes evoluem e escalam separadamente.",
    "<b>.dockerignore</b>: define o que não vai para a imagem (temporários, caches, logs, venvs); reduz tamanho e evita expor arquivos por engano.",
    "<b>Cache de camadas:</b> cada instrução do Dockerfile gera uma camada reaproveitada se nada mudou; uma mudança invalida as camadas seguintes, daí a ordem importar.",
    "<b>Versionamento de imagem:</b> use versões (semântico), não só identificadores genéricos: permite saber o que roda onde e fazer rollback."
   ],
   "como": [
    "<b>Receita do Dockerfile (Aula 2):</b> imagem base (no projeto, Python 3.12 Slim), instalar dependências do sistema para compilar, definir o diretório de trabalho, instalar as dependências Python a partir de um arquivo de requisitos, copiar o resto do código (respeitando o <code>.dockerignore</code>) e ajustar variáveis de ambiente. Instalar sem cache de pacotes (<code>pip --no-cache-dir</code>) mantém o ambiente previsível.",
    "<b>Build e conferência (Aula 3):</b> gerado o build, inspecione tamanho e camadas; monitorar o tamanho evita imagem inchada. Depois, rode.",
    "<b>Segredos:</b> API keys não ficam no código nem na imagem; entram na execução como <b>variáveis de ambiente</b>. A mesma imagem serve a vários ambientes só trocando os valores, e o comportamento no container deve ser idêntico ao local.",
    "<b>O agente no container:</b> o Nexus-Bot coordena SRE, Segurança e FinOps sobre o mesmo contexto e devolve um relatório unificado (o projeto integrador, em container).",
    "<b>Container de vida curta:</b> nem todo container é um serviço eterno; muitos fazem uma tarefa e terminam (relatórios, auditorias, análises sob demanda). Isso lembra os <i>jobs</i> de orquestradores, ótimo para agentes pontuais."
   ],
   "aplica": [
    "Empacotar agentes de IA com versões de Python e bibliotecas travadas.",
    "Rodar o mesmo agente local, em CI e em cluster sem reconfigurar.",
    "Agendar execuções sob demanda sem manter processo ativo."
   ],
   "pros": [
    "Reprodutibilidade e portabilidade.",
    "Imagem enxuta: mais rápida e menos superfície de ataque.",
    "Configuração separada do código via variáveis de ambiente."
   ],
   "contras": [
    "Cada nova funcionalidade exige novo build e nova versão da imagem.",
    "Dependências de IA são pesadas e podem inflar a imagem.",
    "Cache de camadas mal ordenado vira build lento."
   ],
   "traps": [
    "Colocar a chave de API no Dockerfile, no código ou na imagem.",
    "Esquecer o <code>.dockerignore</code> e copiar <code>.env</code>, <code>venv</code> e <code>.git</code>.",
    "Usar só <code>latest</code> como tag e perder rastreabilidade.",
    "Achar que container que termina é container com erro."
   ],
   "tip": "Copie primeiro o arquivo de dependências e instale; copie o código depois. Assim a camada pesada só é refeita quando as dependências mudam.",
   "cola": [
    [
     "Imagem",
     "Artefato imutável com app, dependências e configuração"
    ],
    [
     "Container",
     "Instância em execução de uma imagem"
    ],
    [
     "Dockerfile",
     "Receita passo a passo para construir a imagem"
    ],
    [
     "Slim / Alpine",
     "Variantes enxutas de imagens base"
    ],
    [
     "Camada",
     "Resultado de cada instrução; reaproveitável via cache"
    ],
    [
     "Multi-stage build",
     "Separa o build do estágio final menor"
    ],
    [
     "Variável de ambiente",
     "Forma de injetar segredo/configuração em runtime"
    ],
    [
     "Responsabilidade única",
     "Um container, uma função"
    ]
   ],
   "links": [
    [
     "Slides do módulo 13.1",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides"
    ],
    [
     "Dockerfile do módulo",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/Dockerfile"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica"
    ]
   ],
   "codigo": [
    {
     "proj": "Dockerfile + .dockerignore + requirements.txt",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/Dockerfile",
     "resumo": "A imagem <code>nexus-bot:v1</code>: Python 3.12 Slim com compilador, dependências do <code>requirements.txt</code>, código copiado e o projeto integrador como comando padrão.",
     "fluxo": [
      "<code>Dockerfile</code>: <code>FROM python:3.12-slim</code>; <code>apt-get install -y build-essential curl</code> (para compilar, como o tiktoken/PyO3, segundo o comentário do arquivo); <code>WORKDIR /app</code>; <code>COPY requirements.txt .</code> + <code>pip install --no-cache-dir -r requirements.txt</code> antes de <code>COPY . .</code> para aproveitar o cache; <code>ENV OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES</code> (fork no macOS/Docker) e <code>ENV PYTHONPATH=/app</code>; <code>CMD [\"python\", \"labs/modulo12_projeto_final.py\"]</code>.",
      "<code>.dockerignore</code>: <code>venv/</code>, <code>.env</code>, <code>__pycache__/</code>, <code>*.pyc</code>, <code>.git/</code> e <code>data/*.json</code>.",
      "<code>requirements.txt</code>: <code>crewai==1.14.4</code> e <code>crewai[tools]==1.14.4</code> fixados; <code>langchain-groq</code>, <code>python-dotenv</code>, <code>streamlit</code>, <code>checkov&lt;3.0.0</code>, <code>kubernetes</code>, <code>pandas</code>, <code>numpy</code> e <code>litellm</code> sem versão."
     ],
     "rodar": [
      "<code>docker build -t nexus-bot:v1 .</code> e <code>docker run --rm -e GROQ_API_KEY=\"...\" nexus-bot:v1</code> (slide 13.1).",
      "Para o Kubernetes local, o build é feito no daemon do Minikube (próximo tópico)."
     ],
     "armadilhas": [
      "<code>data/*.json</code> está no <code>.dockerignore</code>: dentro da imagem não existem <code>trivy.json</code> nem <code>inventario_cloud.json</code>, então os labs 7 e 9 falhariam no container. O <code>CMD</code> roda só o lab 12, que não os usa.",
      "Imagem de um estágio só: <code>build-essential</code> e <code>curl</code> ficam na imagem final, o contrário do multi-stage ensinado na unidade 8. Também roda como root (não há <code>USER</code>).",
      "O README recomenda Python 3.10 a 3.13, e a imagem fixa 3.12; os slides justificam o Docker para evitar o 3.14.",
      "Só o <code>crewai</code> está fixado; as demais dependências (inclusive <code>litellm</code>) flutuam entre builds. <code>boto3</code>, usado por <code>ui/app.py</code>, não está listado (provavelmente transitivo de <code>crewai[tools]</code>; não verifiquei).",
      "O <code>.dockerignore</code> não exclui <code>slides/</code>, <code>k8s/</code> nem <code>k8s/secret.yml</code>: tudo vai para a imagem."
     ]
    }
   ]
  },
  {
   "id": "D6-12",
   "bloco": "d06-b5",
   "mod": "Unidade 13 · Aulas 4 e 5",
   "emoji": "☸️",
   "read": "7 min",
   "title": "Kubernetes local com Minikube: componentes, escala, Secrets e Jobs",
   "short": "Do Docker ao cluster: nó, pod, scheduler, HPA/VPA, Secrets em Base64 e por que agente que termina vira Job.",
   "oneliner": "O <b>Kubernetes</b> resolve a orquestração (escala, resiliência, estado desejado) que o Docker não resolve. O <b>Minikube</b> traz um cluster completo ao seu computador; o Nexus-Bot sobe com <b>Secret</b> para a chave de API e, por terminar a tarefa e sair, precisa ser tratado como <b>Job</b> e não como serviço eterno.",
   "vovo": [
    "Se Docker é a marmita, Kubernetes é a cozinha industrial: decide em qual bancada cada marmita é preparada, chama mais cozinheiros no horário de pico e manda embora quando esvazia, e se um cozinheiro passa mal, coloca outro no lugar sem ninguém perceber.",
    "O Minikube é uma cozinha de brinquedo em casa, completa o suficiente para ensaiar tudo sem alugar um restaurante (nuvem)."
   ],
   "oque": [
    "<b>Orquestração:</b> o Docker Swarm perdeu espaço e o Kubernetes virou padrão (EKS, GKE e AKS são Kubernetes gerenciado). Exemplo clássico: Black Friday, quando é preciso subir e descer capacidade dinamicamente.",
    "<b>Hierarquia:</b> cluster contém <b>nós</b>; nós contêm <b>Pods</b> (menor unidade de execução); Pods contêm containers. Um Pod pode ter mais de um container, como no padrão <b>Sidecar</b> (container auxiliar de observabilidade, por exemplo).",
    "<b>Componentes:</b> <b>Kubelet</b> (monitora nós/pods), <b>Kube Proxy</b> (roteia tráfego interno), <b>Scheduler</b> (decide em qual nó cada Pod roda, por CPU, memória, afinidade e regras), <b>etcd</b> (base distribuída com o estado do cluster), <b>API Server</b> e componentes de integração com a nuvem (balanceadores, rede, discos).",
    "<b>Escalabilidade:</b> <b>HPA</b> (Horizontal Pod Autoscaling) muda a quantidade de Pods; <b>VPA</b> (Vertical) muda CPU/memória de cada Pod. Podem coexistir, dependendo da arquitetura.",
    "<b>Minikube:</b> distribuição simplificada para estudo e testes, sem custo de nuvem, bem integrada ao Docker; as imagens construídas podem rodar como em ambiente corporativo.",
    "<b>Secrets:</b> guardam tokens, senhas e chaves fora da imagem. Nos exemplos locais, os valores foram só convertidos para <b>Base64</b>, que <i>não é criptografia</i>: aceitável em demo, inaceitável em produção, onde se usam soluções de segredos.",
    "<b>Deployment:</b> declara o estado desejado (réplicas, imagem). Se um Pod falha, é recriado.",
    "<b>Workload transitório:</b> um agente que roda, gera um relatório e encerra faz o Pod terminar; sob Deployment, o Kubernetes pode reiniciá-lo em loop e mostrar <code>CrashLoopBackOff</code>, mesmo sem erro real. A leitura correta depende do tipo de workload."
   ],
   "como": [
    "<b>Subir o cluster:</b> <code>minikube start</code> com driver Docker. O Kubelet e o API Server precisam estar saudáveis, e o <b>kubeconfig</b> é a ponte entre sua máquina e a API do cluster (autenticação e comunicação).",
    "<b>Imagem dentro do cluster:</b> em vez de publicar em um registry (Docker Hub, Amazon ECR, Google Artifact Registry), constrói-se a imagem direto no ambiente Docker do Minikube. Cada mudança no app pede novo build ali.",
    "<b>Credenciais:</b> a imagem fica genérica; a chave entra via Secret, associada ao Pod por variável de ambiente. A mesma imagem serve a dev, homologação e produção, mudando só o Secret.",
    "<b>Deploy:</b> o Deployment declara o desejado e o cluster mantém. Se o container termina (o agente concluiu o trabalho), o Pod sai e o controlador pode entender como falha.",
    "<b>Qual objeto usar:</b> para tarefas que terminam, um <b>Job</b> com política de reinício adequada (só em falha real) é a forma correta de representar o agente."
   ],
   "aplica": [
    "Ensaiar manifestos, Secrets e limites localmente antes de ir para um cluster gerenciado.",
    "Rodar agentes de IA como Jobs agendados ou disparados por evento.",
    "Validar HPA/limites de recursos de cargas de IA sem custo de nuvem."
   ],
   "pros": [
    "Ambiente próximo de produção sem custo de nuvem.",
    "Estado declarativo: o cluster corrige desvios sozinho.",
    "Mesma imagem do Docker roda sem alterações."
   ],
   "contras": [
    "Cluster local tem capacidade limitada e compartilha recursos com a sua máquina.",
    "Mais peças (Secrets, Deployments, Services, probes) aumentam a curva de aprendizado.",
    "Base64 passa falsa sensação de segurança."
   ],
   "traps": [
    "Achar que Base64 protege o segredo.",
    "Rodar agente de tarefa única como Deployment e interpretar o loop como bug.",
    "Esquecer de definir limites de recursos e travar a máquina local.",
    "Usar imagem local sem política de pull adequada e ver o cluster tentar baixar da internet."
   ],
   "tip": "Se o Pod do seu agente aparece em <code>CrashLoopBackOff</code> mas o log mostra que ele terminou o relatório, o problema não é o código: é usar Deployment onde cabia um Job.",
   "cola": [
    [
     "Pod",
     "Menor unidade de execução; contém containers"
    ],
    [
     "Kubelet / Kube Proxy",
     "Agente de nó / roteamento de tráfego interno"
    ],
    [
     "Scheduler",
     "Decide em qual nó cada Pod roda"
    ],
    [
     "etcd",
     "Base distribuída com o estado do cluster"
    ],
    [
     "HPA / VPA",
     "Escala horizontal (réplicas) / vertical (recursos)"
    ],
    [
     "Minikube",
     "Cluster Kubernetes local para estudo"
    ],
    [
     "kubeconfig",
     "Credenciais e endereço do cluster para o kubectl"
    ],
    [
     "Secret",
     "Recurso para dados sensíveis (Base64 não é criptografia)"
    ],
    [
     "Deployment x Job",
     "Serviço contínuo x tarefa que termina"
    ]
   ],
   "links": [
    [
     "Kubernetes",
     "https://kubernetes.io/"
    ],
    [
     "Slides do módulo 13.2",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides"
    ],
    [
     "Manifestos k8s do módulo",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/k8s"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica"
    ]
   ],
   "codigo": [
    {
     "proj": "k8s/deploy.yml + k8s/job.yaml + k8s/secret.yml",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/k8s",
     "resumo": "Três manifestos que levam o Nexus-Bot ao Minikube: o Secret com a chave Groq, um Deployment (que acaba em loop porque o app termina) e o Job que corrige isso.",
     "fluxo": [
      "<code>k8s/secret.yml</code>: Secret <code>nexus-secrets</code> do tipo <code>Opaque</code> com a chave <code>GROQ_API_KEY</code>. O valor commitado é o Base64 de <code>insira_sua_chave_aqui</code> (placeholder); o comentário instrui <code>echo -n \"gsk_...\" | base64</code>.",
      "<code>k8s/deploy.yml</code>: Deployment <code>nexus-bot</code>, 1 réplica, imagem <code>nexus-bot:v1</code> com <code>imagePullPolicy: Never</code> (o Minikube não busca na internet), limites <code>512Mi</code>/<code>500m</code> e requests <code>256Mi</code>/<code>250m</code>, <code>GROQ_API_KEY</code> vinda do Secret e as variáveis <code>OBJC_DISABLE_INITIALIZE_FORK_SAFETY</code>, <code>PYTHONPATH</code> e <code>PYTHONUNBUFFERED</code>.",
      "<code>k8s/job.yaml</code>: Job <code>nexus-bot-run</code>, mesma imagem e mesmo Secret, mais <code>AWS_ENDPOINT_URL=http://localstack:4566</code> e <code>restartPolicy: OnFailure</code> («só reinicia se der erro real, não se completar»)."
     ],
     "rodar": [
      "<code>minikube start --driver=docker</code>, <code>eval $(minikube docker-env)</code>, <code>docker build -t nexus-bot:v1 .</code> (slide 13.2).",
      "<code>kubectl apply -f k8s/secret.yml</code> (com a chave real em Base64, sem commitar), depois <code>kubectl apply -f k8s/job.yaml</code> e <code>kubectl logs job/nexus-bot-run</code>."
     ],
     "armadilhas": [
      "Aplicar <code>deploy.yml</code> reproduz o que a Aula 5 explica: o container termina, o Deployment o reinicia e o Pod passa por <code>Completed</code>/<code>CrashLoopBackOff</code>. O <code>job.yaml</code> é a correção.",
      "O README manda aplicar <code>k8s/deploy.yml</code> no Módulo 4 para «simular a quebra com imagem errada», mas esse manifesto não tem imagem errada: ele é o Nexus-Bot válido.",
      "Os slides citam <code>k8s/secrets.yaml</code>; o arquivo do repositório é <code>k8s/secret.yml</code>. Nunca commite a chave real no lugar do placeholder.",
      "O <code>AWS_ENDPOINT_URL</code> do Job não é lido por nenhum código do lab 12 (só <code>ui/app.py</code> usa <code>boto3</code>).",
      "Limite de memória de 512Mi para um app com CrewAI pode ser apertado; é uma hipótese, não testei."
     ]
    }
   ]
  },
  {
   "id": "D6-13",
   "bloco": "d06-b5",
   "mod": "Unidade 13 · Aulas 6 a 9",
   "emoji": "☁️",
   "read": "8 min",
   "title": "Cloud simulada e interface: LocalStack e Streamlit dentro do Kubernetes",
   "short": "S3/SQS/IAM emulados no cluster, validados por kubectl exec e Job, e um painel Streamlit que lê tudo via Boto3.",
   "oneliner": "O <b>LocalStack</b> emula serviços da AWS (S3, SQS, IAM) dentro do cluster: custo zero, sem credenciais reais e com o mesmo contrato de API. A aplicação troca de ambiente <b>só por configuração (endpoint)</b>. Em cima disso, um painel <b>Streamlit</b> em Deployment próprio, exposto por <code>LoadBalancer</code>, lê os buckets via <b>Boto3</b>.",
   "vovo": [
    "É como ensaiar o show num palco de papelão idêntico ao palco real: mesmas marcações, mesmos equipamentos, mas se cair não custa nada. Quando a banda sobe no palco de verdade, só muda o endereço do teatro.",
    "E o Streamlit é a vitrine: em vez de todo mundo precisar de terminal para saber o que há no palco, um painel mostra os buckets com um clique."
   ],
   "oque": [
    "<b>Por que simular nuvem:</b> usar a AWS de verdade em desenvolvimento gera custo, exige credenciais, limites de uso, acesso e conexão. O LocalStack permite criar buckets S3, filas SQS e identidades IAM localmente, e os conceitos valem para qualquer provedor (AWS, GCP, Azure).",
    "<b>Cloud native:</b> a aplicação deixa de depender de arquivos locais e fala com serviços via API. Rodando o LocalStack dentro do cluster, valida-se um fluxo próximo da realidade.",
    "<b>Fidelidade e limites:</b> nomes, comandos e eventos seguem a AWS, mas um ambiente local nunca reproduz tudo. A versão usada deve ser fixada para ficar na edição comunitária (gratuita).",
    "<b>Service e Deployment:</b> o Service expõe o LocalStack (porta 4566) com um nome estável de DNS interno; o Deployment mantém os Pods.",
    "<b>Troca de ambiente por configuração:</b> o código chama serviços «equivalentes à AWS»; só o endpoint muda (LocalStack no cluster, AWS real em produção). Credenciais ainda são exigidas pelo SDK, e as dos exemplos são educacionais.",
    "<b>Streamlit:</b> interface web só com Python, no mesmo ecossistema dos agentes. Roda como serviço independente (separação de responsabilidades: LocalStack simula nuvem, agentes analisam, Streamlit visualiza), exposto com <code>Service</code> do tipo <code>LoadBalancer</code>.",
    "<b>Deployment → ReplicaSet → Pods → Service:</b> o Deployment define o desejado, o ReplicaSet garante réplicas, os Pods executam e o Service é o ponto de acesso estável (Pods são efêmeros).",
    "<b>Limites de CPU/memória:</b> mesmo um app simples consome recursos, e um cluster local é pequeno; limites protegem a estabilidade e aproximam do que governança faz em produção."
   ],
   "como": [
    "<b>Validação (Aula 7):</b> em vez de só ver o Pod «Running», execute comandos dentro dele (<code>kubectl exec</code>) com ferramentas compatíveis: listar buckets, criar um bucket, enviar um arquivo e listar objetos. Isso testa conectividade, criação de recursos e consulta.",
    "<b>Integração dos agentes:</b> o Job dos agentes recebe, por variável de ambiente, o endpoint do LocalStack. Para provar que a conexão funciona, um <b>Job extra</b> só de teste conecta e lista os buckets; a resposta traz códigos de retorno, metadados e os buckets criados. O Kube Proxy cuida do roteamento interno.",
    "<b>Painel (Aulas 8 e 9):</b> o app usa Boto3 apontando para o endpoint do LocalStack e lista os buckets. Ele foi para uma imagem nova (rebuild) e um Deployment novo, com Service <code>LoadBalancer</code>.",
    "<b>Acesso local:</b> no Minikube, o LoadBalancer vira um túnel (algo como port-forward): a porta da app, a porta do Service e o encaminhamento interno são camadas diferentes para evitar conflitos.",
    "<b>Prova de tempo real:</b> cria-se um bucket por fora (ferramentas administrativas) e uma nova consulta no painel já o mostra: a UI lê o estado atual da infraestrutura. Ideias de extensão: custos, incidentes ativos, vulnerabilidades, análises FinOps, auditorias de conformidade."
   ],
   "aplica": [
    "Testar integrações com S3/SQS/IAM em CI e em cluster local sem custo.",
    "Painéis internos em Python para dar visibilidade a agentes e recursos.",
    "Desenvolver contra uma API compatível e migrar de provedor por configuração."
   ],
   "pros": [
    "Zero custo e zero risco de mexer em conta real.",
    "Código portável: só o endpoint muda.",
    "Painel em Python reaproveita o ecossistema dos agentes."
   ],
   "contras": [
    "A emulação não cobre todo o comportamento do provedor.",
    "Imagem do LocalStack e do app consomem memória do cluster local.",
    "Credenciais «de mentira» nos manifestos não podem virar hábito."
   ],
   "traps": [
    "Usar a tag <code>latest</code> do LocalStack e cair em recursos de plano pago.",
    "Escrever Access Key/Secret Key reais em manifestos (use Secrets).",
    "Validar só que o Pod está ativo, sem testar uma operação real.",
    "Expor a UI sem limites de recursos."
   ],
   "tip": "Teste a conectividade com um Job descartável: ele usa o mesmo endpoint, as mesmas variáveis e a mesma rede dos Pods reais, e deixa evidência nos logs.",
   "cola": [
    [
     "LocalStack",
     "Emulador local de serviços AWS (S3, SQS, IAM...)"
    ],
    [
     "Endpoint",
     "Endereço da API; troca de ambiente por config"
    ],
    [
     "Cloud native",
     "App que usa serviços via API em vez de recursos locais"
    ],
    [
     "Boto3",
     "SDK Python da AWS"
    ],
    [
     "kubectl exec",
     "Executar comando dentro de um Pod"
    ],
    [
     "Streamlit",
     "Interface web em Python"
    ],
    [
     "Service LoadBalancer",
     "Ponto de entrada estável (túnel no Minikube)"
    ],
    [
     "ReplicaSet",
     "Garante o número de réplicas do Deployment"
    ]
   ],
   "links": [
    [
     "LocalStack",
     "https://www.localstack.cloud/"
    ],
    [
     "Streamlit",
     "https://streamlit.io/"
    ],
    [
     "Slides 13.3 e 13.4",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides"
    ],
    [
     "Manifestos k8s",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/k8s"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica"
    ]
   ],
   "codigo": [
    {
     "proj": "k8s/localstack.yml + k8s/connect-test.yaml + k8s/streamlit.yaml + ui/app.py",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/ui",
     "resumo": "A cloud simulada (LocalStack), o Job de teste de conectividade e o painel Streamlit (explorador de buckets S3 e sandbox de políticas OPA).",
     "fluxo": [
      "<code>k8s/localstack.yml</code>: Service <code>localstack</code> (porta 4566) e Deployment com <code>localstack/localstack:3.0</code>, <code>SERVICES=s3,sqs,iam</code>, <code>DEBUG=1</code>, <code>ACTIVATE_PRO=0</code> e limites de 512Mi/500m. O comentário explica que fixar a versão evita o check de licença Pro.",
      "<code>k8s/connect-test.yaml</code>: Job <code>nexus-conn-test</code> com a imagem <code>nexus-bot:v1</code> que executa <code>python -c</code> com <code>boto3</code> e imprime <code>list_buckets()</code> no endpoint <code>http://localstack:4566</code> (credenciais <code>test</code>/<code>test</code>), <code>restartPolicy: Never</code>.",
      "<code>k8s/streamlit.yaml</code>: Service <code>nexus-ui</code> (<code>LoadBalancer</code>, 8501) e Deployment com a mesma imagem e o comando <code>streamlit run ui/app.py --server.port=8501 --server.address=0.0.0.0</code>, <code>AWS_ENDPOINT_URL</code> apontando para o LocalStack e limites 256Mi/200m.",
      "<code>ui/app.py</code>: cria o cliente S3 com <code>endpoint_url</code> vindo de <code>AWS_ENDPOINT_URL</code> (padrão <code>http://localhost:4566</code>). Três abas: visão geral dos agentes (cartões), <b>explorador de buckets</b> (listar, criar, atualizar) e <b>sandbox OPA</b> que chama <code>validate_opa_policies</code> sobre o código colado (exemplo com <code>t3.large</code>, que é rejeitado)."
     ],
     "rodar": [
      "<code>kubectl apply -f k8s/localstack.yml</code> e <code>kubectl get pods -l app=localstack</code>; testes: <code>kubectl exec -it deployment/localstack -- awslocal s3 ls</code> (e <code>awslocal s3 mb s3://nexus-logs</code>).",
      "<code>kubectl apply -f k8s/connect-test.yaml</code> e olhe os logs do Job; depois <code>kubectl apply -f k8s/streamlit.yaml</code> e <code>minikube service nexus-ui</code> (slide 13.4).",
      "Fora do cluster: <code>streamlit run ui/app.py</code> (opção D do menu) com o LocalStack em <code>localhost:4566</code>."
     ],
     "armadilhas": [
      "Os slides citam <code>k8s/localstack.yaml</code> com <code>image: localstack/localstack:latest</code>; no repositório o arquivo é <code>localstack.yml</code> e a imagem é a <code>3.0</code> com <code>ACTIVATE_PRO=0</code>.",
      "A apostila apresenta os agentes consumindo S3 do LocalStack, mas nenhum lab usa <code>boto3</code>: o <code>AWS_ENDPOINT_URL</code> do <code>job.yaml</code> não é lido. Só <code>connect-test.yaml</code> e <code>ui/app.py</code> falam com o LocalStack.",
      "O slide 13.4 diz que o Streamlit lê «relatórios que o Nexus-Job salvou no S3», mas nada no código grava relatórios no S3.",
      "<code>ui/app.py</code> ignora as variáveis <code>AWS_ACCESS_KEY_ID</code>/<code>AWS_SECRET_ACCESS_KEY</code> do manifesto e fixa <code>mock_key</code>/<code>mock_secret</code>; se <code>RUNNING_IN_DOCKER</code> estiver definida, força <code>http://localstack:4566</code> e descarta <code>AWS_ENDPOINT_URL</code>.",
      "A barra lateral e o README dizem «11 agentes»; são 12 fábricas em <code>agents.py</code> e a aba mostra 8 cartões.",
      "O painel chama <code>validate_opa_policies(code_input)</code>, função decorada com <code>@tool</code> do CrewAI; não verifiquei se esse objeto é chamável diretamente na versão fixada (CrewAI não está instalado aqui). O Pod do painel tem só 256Mi e importa o CrewAI via <code>tools.security_scan</code> (hipótese de risco de OOM).",
      "A lista de serviços do slide 13.3 inclui DynamoDB, mas o manifesto habilita só <code>s3,sqs,iam</code>."
     ]
    }
   ]
  },
  {
   "id": "D6-14",
   "bloco": "d06-b5",
   "mod": "Unidade 13 · Aulas 10 e 11",
   "emoji": "🏠",
   "read": "7 min",
   "title": "IA offline com Ollama no Kubernetes (e um passeio pelo dashboard do Minikube)",
   "short": "Modelos locais eliminam limite de tokens e dados saindo do cluster, mas cobram CPU, RAM e disco.",
   "oneliner": "Agentes e multiagentes consomem <b>muitos tokens</b>, e APIs externas têm limite e custo. Rodar um modelo <b>local com Ollama</b> no cluster elimina a cobrança por token e mantém os dados dentro da infra (privacidade, offline), mas <b>transfere o custo para CPU, RAM e disco</b>: no laboratório o Pod ficou <code>Pending</code> por falta de recurso.",
   "vovo": [
    "Usar uma API de IA é pedir comida por delivery: prático, mas cada pedido custa, há limite por dia e a comida (seus dados) passa pela casa de outras pessoas. Rodar o modelo local é ter uma cozinha própria: ninguém cobra por prato e nada sai de casa, mas você precisa de fogão grande e despensa cheia.",
    "A cozinha da aula (o Minikube de um nó só) era pequena demais para o fogão grande, e o Pod esperou na fila para sempre."
   ],
   "oque": [
    "<b>Tokens:</b> unidade de medida do que o modelo processa. Toda pergunta e toda resposta consomem tokens; prompts e respostas complexas consomem mais. Planos gratuitos ou básicos têm limites restritivos e mesmo planos pagos têm limites operacionais.",
    "<b>Agentes multiplicam o consumo:</b> cada tarefa envolve ferramentas, raciocínio intermediário e validações; num multiagente, o gestor consulta vários especialistas e consolida. Em volume alto, o custo vira fator de arquitetura.",
    "<b>Vantagens do modelo local:</b> sem cobrança por token e sem limite de plano, <b>privacidade</b> (setores com dados financeiros, médicos, propriedade intelectual), menos dependência de conectividade e de disponibilidade de provedores.",
    "<b>Ollama:</b> simplifica baixar, instalar e executar modelos abertos localmente, com suporte a vários modelos e documentação para Python e JavaScript. O modelo da aula é o <b>Llama 3.1</b>. Todo modelo é um trade-off: maiores respondem melhor e exigem mais recursos.",
    "<b>Infra importa:</b> modelos continuam sendo cargas intensivas; num Minikube que divide recursos com a sua máquina, limites baixos impedem iniciar. Reserve CPU e memória adequadas sem sufocar o sistema.",
    "<b>Agentes agnósticos de provedor:</b> a arquitetura permite trocar entre OpenAI, Gemini, Grok, Claude e Ollama. Também dá para <b>coexistir</b>: dados sensíveis processados localmente, demandas mais sofisticadas em provedor externo.",
    "<b>Dashboard do Minikube (Aula 11):</b> visão gráfica de Deployments, Services, Jobs, DaemonSets, Secrets, ConfigMaps, Roles/ClusterRoles/RoleBindings (controle de acesso) e namespaces (segmentação lógica). Falhas aparecem em destaque.",
    "<b>Service x Ingress:</b> o Service dá conectividade e roteamento básico; o Ingress opera acima, com rotas por URL, regras de acesso, TLS e um ponto de entrada para várias apps (o Ingress NGINX foi o padrão por muito tempo). <b>ConfigMap</b> guarda configuração não sensível; <b>Secret</b>, dados críticos."
   ],
   "como": [
    "<b>Implantação:</b> um Service expõe o modelo numa porta, um Deployment mantém o container do Ollama. Do ponto de vista arquitetural é como qualquer outra app.",
    "<b>O que aconteceu na aula:</b> mesmo com a configuração correta, o Pod ficou <b>pendente</b>: o cluster tinha um único nó compartilhando recursos com a estação de trabalho, e só baixar o modelo já exigia vários gigabytes, além da memória para carregá-lo.",
    "<b>A moral:</b> eliminar a dependência de APIs externas passa a responsabilidade de processamento para a sua infraestrutura; é por isso que muitas empresas usam servidores especializados para hospedar modelos.",
    "<b>Integração (se houvesse recurso):</b> os agentes passariam a chamar o endpoint do Ollama no cluster, com a mesma lógica das integrações anteriores, trocando só o provedor."
   ],
   "aplica": [
    "Processar localmente código, configurações e dados sensíveis que não podem sair da empresa.",
    "Desenvolvimento e testes de agentes sem gastar tokens ou bater em rate limit.",
    "Operar com conectividade limitada."
   ],
   "pros": [
    "Sem custo por token nem limites de plano.",
    "Privacidade e controle sobre os dados.",
    "Funciona sem depender de provedor externo."
   ],
   "contras": [
    "Exige CPU, RAM e disco consideráveis; clusters locais pequenos não aguentam.",
    "Modelos locais menores podem ser inferiores em tarefas complexas.",
    "Operação, atualização e capacidade passam a ser sua responsabilidade."
   ],
   "traps": [
    "Achar que «de graça» significa «sem custo»: o custo vira infraestrutura.",
    "Definir limites de recurso baixos e culpar o manifesto quando o Pod não sobe.",
    "Esquecer de planejar armazenamento para os pesos do modelo.",
    "Trocar todo o uso por local e perder qualidade onde um modelo maior fazia falta."
   ],
   "tip": "Combine: modelo local para o que é sensível ou em alto volume, API externa para o que exige o melhor modelo. Decida por dado, custo e qualidade, não por ideologia.",
   "cola": [
    [
     "Token",
     "Unidade de texto processada e cobrada pelo provedor"
    ],
    [
     "Rate limit",
     "Limite de requisições/tokens por plano"
    ],
    [
     "Ollama",
     "Plataforma para rodar modelos abertos localmente"
    ],
    [
     "Llama 3.1",
     "Modelo aberto usado na aula"
    ],
    [
     "Pending",
     "Pod aguardando recurso para ser agendado"
    ],
    [
     "Ingress",
     "Roteamento HTTP por URL/TLS acima do Service"
    ],
    [
     "ConfigMap / Secret",
     "Configuração comum / dado sensível"
    ],
    [
     "Namespace",
     "Segmentação lógica do cluster"
    ]
   ],
   "links": [
    [
     "Ollama",
     "https://ollama.com/"
    ],
    [
     "Slides do módulo 13.5",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides"
    ],
    [
     "Manifestos k8s",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/k8s"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica"
    ]
   ],
   "codigo": [
    {
     "proj": "k8s/ollama.yaml",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/k8s/ollama.yaml",
     "resumo": "Service e Deployment que sobem o Ollama no cluster na porta 11434.",
     "fluxo": [
      "<code>k8s/ollama.yaml</code>: Service <code>ollama</code> (porta <code>11434</code>) e Deployment com <code>ollama/ollama:latest</code>, 1 réplica.",
      "O bloco <code>resources</code> do container repete a chave <code>limits</code>: primeiro <code>memory: \"1536Mi\"</code> e <code>cpu: \"500m\"</code> (comentário «LLMs precisam de mais RAM»), depois <code>memory: \"2Gi\"</code> e <code>cpu: \"1\"</code> (comentário «O máximo que ele pode roubar»). Não há <code>requests</code>.",
      "Os slides do módulo 13.5 sugerem: <code>kubectl apply -f k8s/ollama.yaml</code>, <code>kubectl exec -it deployment/ollama -- ollama run llama3.1</code> e, para testar de outro Pod, <code>curl http://ollama:11434/api/tags</code>."
     ],
     "rodar": [
      "<code>kubectl apply -f k8s/ollama.yaml</code> num Minikube com memória e CPU reservadas (por exemplo, iniciar o cluster com mais recursos) e depois baixar o modelo dentro do Pod.",
      "Em máquina pequena, espere o estado <code>Pending</code> da aula."
     ],
     "armadilhas": [
      "<b>Chave <code>limits</code> duplicada</b> em <code>resources</code>: dependendo do parser, a última (2Gi e 1 CPU) vence ou o apply reclama; não executei. Como só há <code>limits</code>, o request vira igual ao limite, o que explica (hipótese) o Pod <code>Pending</code> num nó pequeno.",
      "Os slides dão <code>memory: 4Gi</code> e <code>cpu: 2</code> para o Ollama; o manifesto do repositório tem outros valores.",
      "O manifesto não monta volume: o modelo baixado deve se perder se o Pod for recriado (inferência, não testei).",
      "Nenhum código do módulo usa Ollama: <code>core/llm_config.py</code> está fixo em <code>groq/llama-3.1-8b-instant</code>. Os slides dizem «mudamos apenas o <code>base_url</code>», mas essa troca não existe no repositório.",
      "O slide usa <code>llama3.1:8b</code> na explicação e <code>ollama run llama3.1</code> no comando."
     ]
    }
   ]
  },
  {
   "id": "D6-15",
   "bloco": "d06-b5",
   "mod": "Unidade 13 · Aulas 12 a 14 · Revisão final",
   "emoji": "🚀",
   "read": "6 min",
   "title": "O que podemos fazer com IA em DevOps: tendências, carreira e revisão final",
   "short": "IA é amplificador de produtividade; muda como se trabalha, não elimina a necessidade de conhecimento.",
   "oneliner": "A IA em DevOps está passando de assistente de texto a camada de <b>conhecimento, AIOps, segurança, FinOps e agentes</b> dentro dos pipelines. A mensagem final: <b>o diferencial continua humano</b> (entender o problema, validar, decidir, gerar valor), e quem usa IA estrategicamente amplia a própria capacidade.",
   "vovo": [
    "Quando surgiu a calculadora, o contador não perdeu o emprego: passou a gastar o tempo em análise em vez de em somas. Com a IA em DevOps acontece algo parecido: tarefas repetitivas ficam rápidas, e o que vale mais é saber o que perguntar, conferir a resposta e decidir.",
    "Quem cola tudo sem entender é como o aluno que copia o gabarito: a prova oral denuncia."
   ],
   "oque": [
    "<b>Ciclos de tecnologia:</b> a trajetória do DevOps (a cultura nasceu para aproximar dev e ops; encontros como o DevOps Days foram espaço de troca) mostra que ferramentas surgem, algumas somem e outras se consolidam: Docker, Kubernetes, Prometheus e Grafana passaram pelo ceticismo. A IA parece estar nesse mesmo caminho.",
    "<b>«A IA vai substituir TI?»:</b> a realidade é mais complexa: algumas atividades são automatizadas, outras seguem exigindo experiência e julgamento. A mudança central é <b>como o trabalho é feito</b>; saber usar IA entra na lista de habilidades, como Git, Docker e Kubernetes.",
    "<b>Onde a IA ajuda e onde não:</b> excelente em brainstorming, hipóteses de troubleshooting e navegar documentação; mas continua alucinando. Às vezes a melhor fonte é a documentação oficial, um colega ou documentação interna que não está no treino dos modelos públicos, e aí entra o <b>RAG</b> (runbooks, wikis, arquitetura, repositórios).",
    "<b>Gestão de conhecimento:</b> gerar documentação a partir do código, estruturar procedimentos, resumir reuniões, relatórios de incidentes e <b>onboarding</b>, e consultar a base em linguagem natural.",
    "<b>Segurança e compliance:</b> a IA identifica padrões de risco, aponta vulnerabilidades conhecidas e ajuda em revisão de código, como camada complementar a scanners, análise estática e auditorias.",
    "<b>Copilotos e AIOps:</b> dos trechos de código a ambientes que entendem projetos inteiros, executam comandos e leem repositórios. <b>AIOps</b> é IA para desafios operacionais: observabilidade inteligente, diagnóstico, postmortems, runbooks e autocura, passando de reativo para <b>preditivo</b>.",
    "<b>Tendências:</b> modelos locais (Ollama e versões corporativas dos provedores) por privacidade; interação em linguagem natural com a infra; <b>agentes autônomos</b> nos pipelines; análise inteligente de logs; FinOps com estimativa de custo a partir de IaC; <b>plataformas de Developer Experience</b> com portais internos que reduzem gargalo do time de DevOps.",
    "<b>Carreira:</b> tarefas muito repetitivas são automatizadas, e cresce a expectativa de entregar valor além da execução. Portfólios com problemas reais (automações, dashboards, integrações, IA aplicada) pesam mais que projetos genéricos. Prompt Engineering virou competência prática; validação humana, soft skills e diversificar modelos continuam essenciais."
   ],
   "como": [
    "<b>Como a disciplina fecha o ciclo:</b> começa nos fundamentos (IA como apoio, prompt, RAG, agentes), passa por IaC, Kubernetes, troubleshooting, observabilidade, ChatOps, DevSecOps, CI/CD, FinOps, runbooks, guardrails e coordenação multiagente, e termina na execução próxima de produção (Docker, Kubernetes, LocalStack, Streamlit, Ollama).",
    "<b>Checklist de domínio (revisão final):</b> explicar por que a IA é apoio e não substituta; relacionar Prompt Engineering, RAG e agentes ao contexto organizacional; descrever como IaC Copilot, Kubernetes e troubleshooting transformam requisitos em artefatos e decisões; explicar o alcance de observabilidade preditiva, ChatOps, DevSecOps, CI/CD e FinOps; diferenciar auto-remediação de execução irrestrita (guardrails, dry-run, aprovação humana); e mostrar a evolução final com containers, Kubernetes, LocalStack, Streamlit e Ollama.",
    "<b>Postura prática:</b> a discussão deixou de ser «se» a IA será usada e passou a ser «como»; o caminho produtivo é entender capacidades e limites, experimentar vários modelos e manter o profissional como filtro crítico."
   ],
   "aplica": [
    "Montar um portfólio com automações e agentes que resolvem problemas reais da sua equipe.",
    "Usar IA para brainstorming de troubleshooting e leitura de documentação, validando contra a fonte oficial.",
    "Propor um portal interno de plataforma com IA para reduzir pedidos repetitivos ao time de DevOps."
   ],
   "pros": [
    "Ganho de produtividade em tarefas repetitivas e de análise.",
    "Democratiza o acesso à infraestrutura por linguagem natural.",
    "Abre espaço para trabalho mais estratégico."
   ],
   "contras": [
    "Alucinações, vieses e erros com aparência de confiança.",
    "Dependência de contexto e de dados que o modelo público não tem.",
    "Risco de profissionais iniciantes dependerem da IA sem construir fundamento."
   ],
   "traps": [
    "Copiar respostas de IA sem entender o que e por que foi gerado.",
    "Resistir totalmente à tecnologia por receio ou aceitá-la sem crítica.",
    "Escolher uma única ferramenta para tudo.",
    "Portfólio genérico no lugar de problemas concretos."
   ],
   "tip": "Para cada resposta da IA que você vai usar, responda em voz alta: por que esta abordagem, qual o risco e qual a alternativa? Se não souber, ainda não está pronta.",
   "cola": [
    [
     "AIOps",
     "IA aplicada a operações (observabilidade, diagnóstico, autocura)"
    ],
    [
     "Reativo x preditivo",
     "Agir após o alerta x antecipar a falha"
    ],
    [
     "Developer Experience",
     "Portais internos que dão autonomia a devs"
    ],
    [
     "Agentes autônomos",
     "Agentes integrados a pipelines que analisam e propõem/executam"
    ],
    [
     "Prompt Engineering",
     "Competência de formular contexto e objetivo"
    ],
    [
     "RAG",
     "Conhecimento interno consultado antes de responder"
    ],
    [
     "Modelo local",
     "LLM na própria infra por privacidade e controle"
    ]
   ],
   "links": [
    [
     "Repositório oficial do módulo",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica"
    ],
    [
     "Slides do módulo 13",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides"
    ]
   ]
  }
 ]
});
