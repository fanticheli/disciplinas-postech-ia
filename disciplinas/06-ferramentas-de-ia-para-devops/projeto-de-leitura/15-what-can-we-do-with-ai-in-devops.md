# 15 · O que podemos fazer com IA em DevOps: tendências, carreira e revisão final

> **Unidade 13 · Aulas 12 a 14 · Revisão final** · Leitura: ~6 min · Bloco: Do Terminal ao Escalável

## 🎯 Em uma frase
A IA em DevOps está passando de assistente de texto a camada de **conhecimento, AIOps, segurança, FinOps e agentes** dentro dos pipelines. A mensagem final: **o diferencial continua humano** (entender o problema, validar, decidir, gerar valor), e quem usa IA estrategicamente amplia a própria capacidade.

---

## 👵 Explicando para a vovó

Quando surgiu a calculadora, o contador não perdeu o emprego: passou a gastar o tempo em análise em vez de em somas. Com a IA em DevOps acontece algo parecido: tarefas repetitivas ficam rápidas, e o que vale mais é saber o que perguntar, conferir a resposta e decidir.

Quem cola tudo sem entender é como o aluno que copia o gabarito: a prova oral denuncia.

---

## 🔧 Tecnicamente

### O que é
- **Ciclos de tecnologia:** a trajetória do DevOps (a cultura nasceu para aproximar dev e ops; encontros como o DevOps Days foram espaço de troca) mostra que ferramentas surgem, algumas somem e outras se consolidam: Docker, Kubernetes, Prometheus e Grafana passaram pelo ceticismo. A IA parece estar nesse mesmo caminho.
- **«A IA vai substituir TI?»:** a realidade é mais complexa: algumas atividades são automatizadas, outras seguem exigindo experiência e julgamento. A mudança central é **como o trabalho é feito**; saber usar IA entra na lista de habilidades, como Git, Docker e Kubernetes.
- **Onde a IA ajuda e onde não:** excelente em brainstorming, hipóteses de troubleshooting e navegar documentação; mas continua alucinando. Às vezes a melhor fonte é a documentação oficial, um colega ou documentação interna que não está no treino dos modelos públicos, e aí entra o **RAG** (runbooks, wikis, arquitetura, repositórios).
- **Gestão de conhecimento:** gerar documentação a partir do código, estruturar procedimentos, resumir reuniões, relatórios de incidentes e **onboarding**, e consultar a base em linguagem natural.
- **Segurança e compliance:** a IA identifica padrões de risco, aponta vulnerabilidades conhecidas e ajuda em revisão de código, como camada complementar a scanners, análise estática e auditorias.
- **Copilotos e AIOps:** dos trechos de código a ambientes que entendem projetos inteiros, executam comandos e leem repositórios. **AIOps** é IA para desafios operacionais: observabilidade inteligente, diagnóstico, postmortems, runbooks e autocura, passando de reativo para **preditivo**.
- **Tendências:** modelos locais (Ollama e versões corporativas dos provedores) por privacidade; interação em linguagem natural com a infra; **agentes autônomos** nos pipelines; análise inteligente de logs; FinOps com estimativa de custo a partir de IaC; **plataformas de Developer Experience** com portais internos que reduzem gargalo do time de DevOps.
- **Carreira:** tarefas muito repetitivas são automatizadas, e cresce a expectativa de entregar valor além da execução. Portfólios com problemas reais (automações, dashboards, integrações, IA aplicada) pesam mais que projetos genéricos. Prompt Engineering virou competência prática; validação humana, soft skills e diversificar modelos continuam essenciais.

### Como funciona
- **Como a disciplina fecha o ciclo:** começa nos fundamentos (IA como apoio, prompt, RAG, agentes), passa por IaC, Kubernetes, troubleshooting, observabilidade, ChatOps, DevSecOps, CI/CD, FinOps, runbooks, guardrails e coordenação multiagente, e termina na execução próxima de produção (Docker, Kubernetes, LocalStack, Streamlit, Ollama).
- **Checklist de domínio (revisão final):** explicar por que a IA é apoio e não substituta; relacionar Prompt Engineering, RAG e agentes ao contexto organizacional; descrever como IaC Copilot, Kubernetes e troubleshooting transformam requisitos em artefatos e decisões; explicar o alcance de observabilidade preditiva, ChatOps, DevSecOps, CI/CD e FinOps; diferenciar auto-remediação de execução irrestrita (guardrails, dry-run, aprovação humana); e mostrar a evolução final com containers, Kubernetes, LocalStack, Streamlit e Ollama.
- **Postura prática:** a discussão deixou de ser «se» a IA será usada e passou a ser «como»; o caminho produtivo é entender capacidades e limites, experimentar vários modelos e manter o profissional como filtro crítico.

### Onde aplicar
- Montar um portfólio com automações e agentes que resolvem problemas reais da sua equipe.
- Usar IA para brainstorming de troubleshooting e leitura de documentação, validando contra a fonte oficial.
- Propor um portal interno de plataforma com IA para reduzir pedidos repetitivos ao time de DevOps.

### Vantagens e limites
**Vantagens**
- Ganho de produtividade em tarefas repetitivas e de análise.
- Democratiza o acesso à infraestrutura por linguagem natural.
- Abre espaço para trabalho mais estratégico.

**Limites**
- Alucinações, vieses e erros com aparência de confiança.
- Dependência de contexto e de dados que o modelo público não tem.
- Risco de profissionais iniciantes dependerem da IA sem construir fundamento.

### 🚫 Armadilhas
- Copiar respostas de IA sem entender o que e por que foi gerado.
- Resistir totalmente à tecnologia por receio ou aceitá-la sem crítica.
- Escolher uma única ferramenta para tudo.
- Portfólio genérico no lugar de problemas concretos.

> 💡 **Dica:** Para cada resposta da IA que você vai usar, responda em voz alta: por que esta abordagem, qual o risco e qual a alternativa? Se não souber, ainda não está pronta.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| AIOps | IA aplicada a operações (observabilidade, diagnóstico, autocura) |
| Reativo x preditivo | Agir após o alerta x antecipar a falha |
| Developer Experience | Portais internos que dão autonomia a devs |
| Agentes autônomos | Agentes integrados a pipelines que analisam e propõem/executam |
| Prompt Engineering | Competência de formular contexto e objetivo |
| RAG | Conhecimento interno consultado antes de responder |
| Modelo local | LLM na própria infra por privacidade e controle |

---

## 📘 No curso

Esta aula é conceitual e de visão de mercado: não há projeto de código associado. O que a sustenta no repositório são os laboratórios e manifestos dos tópicos anteriores, por exemplo AIOps em [D6-04](./04-predictive-aiops-nl2q-dashboards.md), FinOps em [D6-08](./08-finops-zombie-resources-rightsizing.md), runbooks e guardrails em [D6-09](./09-runbook-rag-self-healing-guardrails.md), projeto integrador em [D6-10](./10-multi-agent-hierarchy-final-project.md) e IA offline em [D6-14](./14-offline-ai-ollama-on-kubernetes.md).

---

## 🔗 Para ir além
- [Repositório oficial do módulo](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica)
- [Slides do módulo 13](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides)

---

⬅️ [14 · IA offline com Ollama no Kubernetes (e um passeio pelo dashboard do Minikube)](./14-offline-ai-ollama-on-kubernetes.md)
