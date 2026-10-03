# 05 · ChatOps com governança: RBAC, IAM e Human-in-the-Loop

> **Unidade 6 · Aulas 1 a 3** · Leitura: ~7 min · Bloco: Observabilidade, ChatOps e Segurança

## 🎯 Em uma frase
**ChatOps** transforma o canal de conversa em interface operacional: o usuário pede em linguagem natural e o agente executa, **desde que identidade (IAM), permissões (RBAC) e aprovação humana (Human-in-the-Loop)** estejam no caminho. O módulo é ChatOps *com governança*, não só conveniência.

---

## 👵 Explicando para a vovó

É como pedir pelo WhatsApp que o síndico abra o portão: prático para todo mundo, mas o síndico confere quem está pedindo. Pedido simples («o portão está aberto?») ele responde na hora; pedido perigoso («derrube o muro») ele só faz depois de uma confirmação extra.

Facilitar o acesso sem controle é como dar a chave de todas as portas para quem escreve primeiro no grupo.

---

## 🔧 Tecnicamente

### O que é
- **ChatOps:** o foco não é Slack ou Teams, e sim o canal virar interface para infraestrutura, segurança e automação, sem exigir que a pessoa saiba Terraform, AWS ou kubectl. É a mesma democratização do NL2Q aplicada a operações.
- **Autonomia não é anarquia:** automação amplia o impacto de um erro. Um bot que escala o cluster também pode gerar custo enorme se qualquer um o acionar (o exemplo dos slides: o estagiário escalando 1.000 instâncias de GPU).
- **RBAC + IAM:** RBAC define o que cada perfil pode fazer; IAM identifica quem pede. O agente cruza a identidade de quem solicitou (ex.: ID do Slack) com as permissões antes de agir.
- **Caso GitLab 2017:** alguém recém-chegado removeu dados críticos. O problema não era a pessoa, e sim o processo que permitiu acesso tão sensível. É a **blameless culture**: buscar falhas de processo, não culpados. Vale também para agentes mal configurados.
- **Human-in-the-Loop (HITL):** a IA analisa, prepara código e comandos, mas antes de executar em produção o fluxo **pausa** e uma pessoa autorizada aprova (um sênior, senha temporária ou fluxo formal).
- **Observabilidade do próprio agente:** logs do CrewAI mostram como o agente interpreta, classifica e escolhe ferramentas. Agentes também são componentes que precisam ser observados e governados.

### Como funciona
- **Agente de ChatOps:** «engenheiro de automação de ChatOps» com contexto de governança, RBAC e integração com Slack/Teams. A regra principal: **nunca executar ação destrutiva sem validação humana**.
- **Simulador em Streamlit:** em vez de integrar Slack/Teams, uma interface local reproduz o chat, com um canal «InfraOps». Isso concentra a aula em agentes, permissões e governança.
- **Três cenários de mensagem:** baixo risco (consulta; segue direto), destrutiva (interrompe e pede aprovação) e fora de contexto. Exigir aprovação para tudo vira burocracia; não exigir para nada vira risco, e o equilíbrio é a parte difícil.
- **Ferramenta de guardrail por palavras-chave:** se o comando traz termos de destruição, o agente pede uma credencial de aprovação; sem ela, bloqueia. É propositalmente simples; em produção a classificação de risco seria muito mais sofisticada.
- **Segredo no código:** a credencial está escrita no código só para a demo e, na gravação, chega a aparecer na conversa. A autora é explícita: em ambiente real, use gerenciamento de segredos.
- **Demonstração (Aula 3):** «quantas máquinas estão rodando?» e «gere um plano do Terraform» passam sem aprovação; a solicitação de remover um recurso crítico dispara o HITL, e os logs do CrewAI espelham o que aparece no chat (rastreabilidade para auditoria).

### Onde aplicar
- Bot de plataforma no Slack/Teams para consultas, `terraform plan` e provisionamento de ambientes temporários.
- Fluxo de aprovação para ações destrutivas ou de custo alto (destroy, escala, reinício).
- Trilha de auditoria: quem pediu, o que o agente decidiu e quem aprovou.

### Vantagens e limites
**Vantagens**
- Menos barreira técnica para usar a plataforma.
- Operações críticas têm controle humano explícito.
- Log do agente dá rastreabilidade e confiança.

**Limites**
- Segurança baseada só em palavras-chave é frágil.
- Cada aprovação exigida custa velocidade; calibrar é um trade-off.
- O controle só vale se identidade e permissão forem verificadas fora do LLM.

### 🚫 Armadilhas
- Segredo ou senha de aprovação visível para o modelo ou hard-coded no código.
- Achar que HITL e RBAC são a mesma coisa: um é «pode?», o outro «alguém aprova?».
- Tratar o chat como identidade: é preciso verificar quem é o usuário.
- Esquecer de logar decisões do agente.

> 💡 **Dica:** Faça a verificação de identidade, permissão e aprovação em código determinístico, fora do alcance do modelo: o LLM só deve receber o resultado («permitido» ou «bloqueado»).

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| ChatOps | Operar infra por canais de chat |
| RBAC | Controle de acesso por papel |
| IAM | Gestão de identidade e permissões na nuvem |
| Human-in-the-Loop | Pausa antes de executar para aprovação humana |
| Blameless culture | Investigar falhas de processo, não culpar pessoas |
| Ação destrutiva | Remoção/destruição de recursos que exige validação extra |
| Streamlit | Biblioteca Python para interfaces web (simulador de chat) |

---

## 💻 No código do repo

**Projeto:** [labs/modulo6_chatops.py + tools/chatops_tools.py](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo6_chatops.py)

Simulador de Slack em Streamlit: cada mensagem vira uma Task para o agente de ChatOps, que usa `execute_terraform`; comandos com destroy/apagar/destruir exigem a senha do gestor.

**Fluxo**
1. `labs/modulo6_chatops.py`: `st.set_page_config`, título «Nexus Slack Simulator», canal `#infra-ops` e usuário fixo `@camilla.martins`. O histórico fica em `st.session_state.messages` e é repintado a cada interação.
2. Para cada mensagem (`st.chat_input`), o app cria `get_chatops_agent(tools=[execute_terraform])`, uma Task («O usuário @camilla.martins disse: '…'. Se for algo crítico, use 'execute_terraform'. Responda curto e com emojis.») e roda `Crew(...).kickoff()`. Exceções viram «Erro na IA».
3. `tools/chatops_tools.py`, `execute_terraform(command, manager_password="None")`: se o comando contém `destruir`, `apagar` ou `destroy`, exige `manager_password == "GESTOR-APROVA"`; sem isso devolve «BLOCKED». Qualquer outro comando devolve «SUCCESS (Low impact)». Não executa Terraform de verdade.

**Como rodar**
- `streamlit run labs/modulo6_chatops.py` (ou `python3 -m streamlit run ...`, como no slide 6; opção 6 do menu), em `http://localhost:8501`.
- Teste: «@nexus-bot destrua o banco de dados». O README informa a senha `GESTOR-APROVA`.

**Armadilhas e achados no código**
- A senha está no *docstring* da ferramenta, que o CrewAI entrega ao LLM como descrição da tool. O modelo pode, portanto, fornecer a senha sozinho: o HITL só funciona se o modelo se comportar, o que contraria a lição da própria aula (a apostila reconhece o segredo exposto como simplificação).
- Cada mensagem recria agente e crew e a Task só leva a mensagem atual: o histórico do chat é exibido na UI mas não entra no contexto do agente. Responder «a senha é X» numa mensagem seguinte não tem o contexto da anterior (inferência do código lido).
- Não há RBAC nem IAM no código: o usuário é uma string fixa no prompt. A palavra-chave cobre só 3 termos (remover, delete, terminate passam como baixo impacto).
- O tema CSS (`.reportview-container`) é de versões antigas do Streamlit e provavelmente não tem efeito (não verifiquei).

---

## 🔗 Para ir além
- [Streamlit](https://streamlit.io/)
- [Slides do módulo 6](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica)

---

⬅️ [04 · AIOps e observabilidade preditiva: NL2Q, alerta antes da queda e dashboards dinâmicos](./04-predictive-aiops-nl2q-dashboards.md)  ·  [06 · DevSecOps com IA: triagem de vulnerabilidades, CVE-2024-3094 e Compliance as Code](./06-devsecops-vulnerability-triage.md) ➡️
