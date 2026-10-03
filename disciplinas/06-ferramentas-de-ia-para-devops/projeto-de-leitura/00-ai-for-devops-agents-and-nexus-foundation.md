# 00 · Da automação à inteligência agêntica: LLMs, agentes CrewAI, RAG e o Nexus Foundation

> **Unidade 1 · Aulas 1 a 4** · Leitura: ~10 min · Bloco: Fundamentos e IaC

## 🎯 Em uma frase
A tese da disciplina: **a IA é apoio ao conhecimento técnico, não substituta dele**. Um **agente** é uma LLM com papel, autonomia e ferramentas; o **RAG** injeta as regras da sua empresa; e o Nexus Foundation (módulo 1) usa um arquiteto com RAG de políticas para **desenhar** um bucket de logs, sem criar nada ainda.

---

## 👵 Explicando para a vovó

Imagine um estagiário brilhante que leu a internet inteira, mas nunca pisou na sua empresa. Se você só disser «faz uma infra», ele chuta região, nome e segurança. Se você der um cargo claro (agente), um manual de normas da casa (RAG) e ferramentas (escrever arquivo, consultar regras), ele entrega algo alinhado ao que a empresa exige.

Mesmo assim, quem assina embaixo é você: ele é rápido e convincente, mas às vezes erra com a maior segurança do mundo. Por isso o trabalho dele é um rascunho que um profissional experiente valida.

---

## 🔧 Tecnicamente

### O que é
- **IA como base de apoio (Aula 1):** a professora usa IA todo dia para troubleshooting, geração de código e validação de configuração, mas insiste que ela não é salvadora nem substitui conhecimento técnico. Respostas convincentes porém incorretas existem (versões erradas, arquiteturas inadequadas), e **quanto mais experiência a pessoa tem, melhor aproveita** a resposta. A validação final é do profissional.
- **Por que a LLM entende código:** a maioria usa a arquitetura **Transformer** com **Self-Attention**, que relaciona partes distantes de um mesmo arquivo. Isso importa para HCL (Terraform) e YAML (Kubernetes), onde uma seção influencia outra bem longe dela. A **tokenização** quebra o código em unidades menores (símbolos, operadores, comandos) e o modelo aprende padrões de estrutura, não busca palavras parecidas.
- **Prompt como especificação:** prompt vago gera resposta superficial. Detalhe provedor, região, zonas, autoscaling, rede e padrões internos, dê exemplos (few-shot) e peça o **plano antes do código**. Os slides nomeiam as técnicas: **Chain-of-Thought** (descrever o plano antes de executar comandos) e **Few-Shot** (exemplos do «Padrão Nexus» para garantir conformidade).
- **Mercado e consistência:** a aula cita Gemini (preferido pela autora), ChatGPT (versátil, mas com «cara de IA»), Claude (código limpo e bem estruturado), AWS Bedrock e o Kiro (IDE da AWS que quebra um objetivo em tarefas e executa etapa por etapa). Usar uma mesma plataforma por tempo gera histórico de contexto, o que *não* é treinar o modelo para você. Texto e comentários gerados precisam de revisão humana final.
- **Agentes e frameworks (Aula 2):** a LLM vira «motor de raciocínio» dentro de um sistema que executa tarefas dentro de regras. O agente acrescenta organização, autonomia e especialização. Em DevOps isso vale para checar nomenclatura (ex.: todo bucket começa com o nome da empresa), vulnerabilidades e custo junto de Terraform/Pulumi (IaC) e Infracost/Kubecost.
- **CrewAI:** estrutura para equipes de agentes. Suporta multiagente, fluxo **sequencial** (parecido com pipeline CI/CD, uma etapa só libera a próxima) e **hierárquico** (coordenador e executores), além de preservar estado e contexto entre etapas. A escolha de Python vem da proximidade com automação, dados e IA (Go domina as ferramentas, como Docker, Kubernetes e Terraform, pelos binários portáveis).
- **RAG como «lupa»:** a LLM não conhece o que é recente nem o que só existe dentro da empresa. O RAG consulta documentação interna, políticas e repositórios antes de responder, e vira uma segunda camada de validação: LLM = conhecimento geral, RAG = regras da organização.

### Como funciona
- **Arquitetura do projeto (Aula 3):** um diretório `core` guarda os agentes; ferramentas ficam em `tools`; cada aula tem um script em `labs`. A conexão com a LLM fica numa camada própria (modelo, credencial, parâmetros), com a API key em variável de ambiente, o mesmo padrão usado com provedores de nuvem e observabilidade.
- **Papel antes de tarefa:** o agente Arquiteto recebe role, objetivo e histórico («especialista em AWS/Terraform com foco em governança»). Um especialista com escopo fechado responde melhor que um modelo genérico, e reproduz como equipes reais dividem funções.
- **RAG de padrões corporativos:** a ferramenta de políticas é consultada *antes* de gerar. As regras do laboratório são simples (nomenclatura, região definida, serviços privados), mas ilustram o ponto: sem o RAG, o modelo poderia sugerir outra região ou um nome fora do padrão.
- **Missão do Módulo 1:** projetar um bucket de logs seguindo as normas da empresa. O agente consulta as regras, monta um plano e só então descreve nome, região e segurança. Mostrar o raciocínio antes do resultado dá transparência e ajuda auditoria.
- **Desenho, não execução (Aula 4):** ainda não se cria infra. O resultado é um «contrato arquitetural» (nome padronizado, região, bucket privado, versionamento e retenção de logs) que o módulo 2 vai implementar. Separar planejamento de execução espelha empresas maduras, onde nada é provisionado sem análise e aprovação.
- **Valor de longo prazo:** as decisões saem das cabeças de poucas pessoas e viram regras consumidas por agentes, aplicadas de forma repetível. Os especialistas continuam necessários, porque são eles que definem as regras.

### Onde aplicar
- Padronizar nomenclatura, região, tags e política de acesso em times grandes onde dezenas de pessoas alteram infra todo dia.
- Usar IA para acelerar troubleshooting: dar logs, erro e contexto e receber hipóteses de causa raiz para validar.
- Qualquer fluxo em que a LLM precise de conhecimento privado (políticas, runbooks, padrões de arquitetura): é caso de RAG.

### Vantagens e limites
**Vantagens**
- Acelera análise e geração sem eliminar a revisão humana.
- Especialização por agente melhora a qualidade e deixa o comportamento previsível.
- RAG alinha a resposta às regras reais da empresa e reduz a dependência de conhecimento tribal.

**Limites**
- Respostas plausíveis e erradas (alucinação) continuam possíveis, inclusive com versões e APIs inventadas.
- Quanto mais genérico o prompt, mais hipóteses a IA assume, e maior o risco de desvio.
- Agentes e RAG adicionam camadas (chaves de API, ferramentas, contexto) que também precisam de governança.

### 🚫 Armadilhas
- Tratar a saída da IA como verdade pronta: ela é rascunho, a validação é sua.
- Alternar entre muitos modelos sem critério e perder consistência de contexto.
- Prompt vago do tipo «crie um cluster Kubernetes», que deixa provedor, zonas e rede em aberto.
- Confundir o Módulo 1 (desenho) com provisionamento: nenhum recurso é criado nele.

> 💡 **Dica:** Trate o prompt como especificação: provedor, região, requisitos de rede e segurança, padrões internos e um exemplo do formato esperado. Peça o plano de execução antes de qualquer código e valide o entendimento primeiro.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Transformer | Arquitetura de LLM baseada em Self-Attention |
| Self-Attention | Mecanismo que relaciona partes distantes do mesmo contexto (ex.: seções de um HCL/YAML) |
| Token | Unidade menor que a palavra (símbolo, operador, comando) que o modelo processa |
| Agente | LLM com papel definido, autonomia e ferramentas |
| CrewAI | Framework Python de equipes de agentes (sequencial ou hierárquico) |
| RAG | Retrieval-Augmented Generation: consulta fontes externas antes de gerar (a «lupa») |
| Chain-of-Thought | Obrigar o modelo a descrever o plano antes de executar |
| Few-Shot | Dar exemplos do formato/padrão esperado no prompt |
| Contrato arquitetural | Saída do módulo 1: nome, região e segurança que o módulo 2 implementa |

---

## 💻 No código do repo

**Projeto:** [core/ + labs/modulo1_foundation.py + tools/policy_rag.py + nexus_iac_copilot.py](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/core)

Base de todo o curso: um LLM central, 12 fábricas de agentes e o primeiro laboratório, em que o Arquiteto consulta uma ferramenta de políticas e desenha um bucket S3 de logs para a empresa fictícia Nexus.

**Fluxo**
1. `core/llm_config.py` cria o objeto único `nexus_llm = LLM(model="groq/llama-3.1-8b-instant", api_key=os.getenv("GROQ_API_KEY"), temperature=0.2)` depois de `load_dotenv()`. Todos os agentes importam este objeto.
2. `core/agents.py` tem 12 funções `get_*` (architect, auditor, sre_agent, safety_sre_agent, oncall_sre, aiops_agent, chatops_agent, devsecops_agent, cicd_agent, finops_agent, sre_knowledge_agent, nexus_manager_agent). Cada uma devolve um `Agent(role, goal, backstory, tools, llm=nexus_llm, verbose=True)`; só `oncall_sre` e `nexus_manager` têm `allow_delegation=True`.
3. `tools/policy_rag.py` expõe `check_compliance_rules`, que devolve uma string fixa: prefixo `nexus-`, região `us-east-1` e S3 sempre privado.
4. `labs/modulo1_foundation.py` insere a raiz do projeto no `sys.path`, cria o arquiteto com essa ferramenta, define a Task («Desenhe um bucket S3 para logs seguindo as normas da empresa Nexus») e roda `Crew(agents=[architect], tasks=[task_design_s3]).kickoff()`.
5. `nexus_iac_copilot.py` é a «central de comando» CLI: um menu (1 a 12, D para o dashboard, Q para sair) que dispara cada lab com `subprocess`; o lab 6 e o dashboard rodam via `streamlit run`.

**Como rodar**
- Python 3.10 a 3.13 (o README manda evitar o 3.14), `python3 -m venv venv`, `pip install -r requirements.txt` e `pip install streamlit`.
- Crie um `.env` com `GROQ_API_KEY` (não existe `.env.example` no módulo).
- `python3 labs/modulo1_foundation.py` ou `python3 nexus_iac_copilot.py` e escolha a opção 1.

**Armadilhas e achados no código**
- A apostila diz «Grok», mas o código usa **Groq** (`groq/llama-3.1-8b-instant`). O README cita Llama-3.3-70B/3.1-8B e os slides falam em LiteLLM e Llama 3.3, mas só o 8B aparece no código.
- O «RAG» do lab 1 é uma string fixa: não há embeddings, busca nem base documental. Serve para mostrar o conceito, não para escalar.
- README e dashboard anunciam «11 agentes», mas `agents.py` tem 12 fábricas.
- O slide diz que o DevSecOps valida no módulo 1, mas o lab tem só o arquiteto.
- `pandas`, `numpy`, `kubernetes` e `langchain-groq` estão no `requirements.txt`, mas nenhum arquivo do módulo os importa diretamente (não verifiquei dependências transitivas).

---

## 🔗 Para ir além
- [CrewAI](https://www.crewai.com/)
- [Groq (inferência usada no código)](https://groq.com/)
- [Slides do módulo 1 no repositório](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica)

---

[01 · IaC Copilot: Arquiteto e Auditor com Checkov e OPA](./01-iac-copilot-terraform-checkov-opa.md) ➡️
