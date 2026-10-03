# 10 · Projeto integrador: orquestração hierárquica, Game Day e ROI

> **Unidade 12 · Aulas 1 a 3** · Leitura: ~6 min · Bloco: Projeto Integrador

## 🎯 Em uma frase
No **projeto integrador**, um agente **Manager** (o «CTO virtual») coordena especialistas de **SRE, Segurança e FinOps** sobre um incidente multidomínio num **Game Day**, **compartilha contexto** para correlacionar causa e efeito e consolida tudo num relatório executivo com **MTTR e ROI**.

---

## 👵 Explicando para a vovó

Numa crise de verdade (a loja fora do ar, um vírus detectado e a conta de luz disparando) ninguém resolve tudo sozinho. O diretor reúne o time: «você cuida da loja, você do vírus, você do custo», escuta cada um e, no fim, explica ao presidente o que aconteceu, o que foi feito e quanto dinheiro isso poupou.

O Manager é esse diretor: não põe a mão na massa, distribui, junta os laudos e traduz para a linguagem do negócio.

---

## 🔧 Tecnicamente

### O que é
- **Incidentes são multidisciplinares:** uma vulnerabilidade pode gerar instabilidade, que aumenta consumo de infra, que sobe o custo. Agentes isolados resolvem só uma parte.
- **Orquestração hierárquica:** cada agente é especialista em um domínio e uma camada superior (o **Manager**) entende o problema, **delega**, consolida e recomenda. Reproduz a estrutura de times reais.
- **Por que não um agente só:** ele trocaria de contexto o tempo todo (custo, segurança, métricas), o que degrada a qualidade. Especialistas focados respondem melhor e processam menos contexto.
- **Compartilhamento de contexto e correlação:** a vulnerabilidade pode ter causado o comportamento anormal, que causou o consumo excessivo, que gerou o custo. Juntos, os sinais aparecem como manifestações de uma mesma causa raiz, não como dezenas de alertas desconectados.
- **Execução paralela:** segurança, SRE e FinOps investigam ao mesmo tempo, o que importa em crise. O Manager então prioriza (às vezes a vulnerabilidade crítica vem primeiro; às vezes estabilizar a operação).
- **Game Day:** simulação controlada de incidentes para testar processos, ferramentas e a equipe antes de acontecerem de verdade. Aqui, o grande teste da arquitetura.
- **Métricas e ROI:** eficiência operacional (horas economizadas), **MTTR**, vulnerabilidades críticas impedidas de chegar a produção e redução de custo. O **ROI** converte ganho técnico em indicador de negócio e é o que sustenta o investimento em IA.
- **Limites:** agentes ainda erram, têm vieses e alucinam; o HITL continua pilar. A arquitetura escala com novos especialistas (arquitetura de software, qualidade, backend, front, dados, ML) sem mudar o papel do Manager.

### Como funciona
- **Cenário:** o checkout está fora do ar (HTTP 500), há backdoor crítico no pacote XZ e o custo subiu 40% na última hora. Cada especialista recebe uma missão: SRE analisa os logs e estabiliza, Segurança valida o risco do backdoor, FinOps acha o pico de custo.
- **Consolidação:** os resultados voltam ao Manager, que produz o **relatório executivo**: o problema, os riscos, o que foi corrigido, os benefícios, o dinheiro economizado e o impacto operacional evitado. Linguagem de negócio, não só técnica.
- **Resultado da simulação:** a investigação concluiu que instabilidade, segurança e custos estavam relacionados; o agente de segurança corrigiu vulnerabilidades, o SRE estabilizou e o FinOps propôs otimização. A própria aula frisa que o cenário é simulado.
- **Transformar em ROI:** estabilizar o checkout melhora a capacidade operacional; corrigir vulnerabilidade reduz risco financeiro de incidentes; otimizar custo aparece direto na despesa. Tudo consolidado numa visão única para gestores.

### Onde aplicar
- Sala de crise virtual: um coordenador que reúne análise de SRE, segurança e custo numa só resposta.
- Exercícios de Game Day automatizados.
- Relatório pós-incidente para liderança, com impacto financeiro estimado.

### Vantagens e limites
**Vantagens**
- Especialização com visão global: cada agente profundo no seu domínio, e um coordenador integrando.
- Correlação entre domínios que alertas isolados não mostram.
- Relatório que traduz técnica em valor para o negócio.

**Limites**
- Mais agentes significam mais chamadas de LLM, tokens e latência.
- O Manager também é um LLM: a consolidação pode errar ou inventar números de ROI.
- Sem ferramentas reais, o relatório é uma narrativa sobre dados fictícios.

### 🚫 Armadilhas
- Medir ROI com números inventados pelo modelo.
- Dar ao Manager o poder de executar ações críticas sem HITL.
- Confundir a simulação do Game Day com resultado real de produção.
- Compartilhar contexto demais e estourar a janela do modelo.

> 💡 **Dica:** Se um número entra no relatório executivo (horas, dólares, % de MTTR), ele deve vir de uma medição ou ferramenta, nunca da imaginação do modelo.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Manager agent | Coordena especialistas: delega, consolida, recomenda |
| Process hierárquico | Modo do CrewAI em que um manager comanda os demais agentes |
| Delegação | Distribuir subtarefas aos especialistas adequados |
| Contexto compartilhado | Descobertas de um agente servem aos demais |
| Game Day | Simulação controlada de incidentes |
| MTTR | Tempo médio de reparo |
| ROI | Retorno sobre o investimento |
| Relatório executivo | Síntese em linguagem de negócio |

---

## 💻 No código do repo

**Projeto:** [labs/modulo12_projeto_final.py](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo12_projeto_final.py)

Crew hierárquica: o Nexus Manager coordena os agentes SRE on-call, DevSecOps e FinOps numa missão com três incidentes simultâneos e devolve um relatório executivo com ROI.

**Fluxo**
1. `labs/modulo12_projeto_final.py` instancia `sre = get_oncall_sre()`, `seguranca = get_devsecops_agent()`, `finops = get_finops_agent()` e `nexus_manager = get_nexus_manager_agent()`, todos **sem ferramentas**.
2. Uma única Task descreve os três incidentes (checkout com erro 500 no K8s, backdoor crítico no XZ, custo +40% na última hora), instrui o Manager a pedir análise a cada especialista e exige um relatório executivo consolidado com as ações e o ROI.
3. `Crew(agents=[sre, seguranca, finops], tasks=[missao_complexa], process=Process.hierarchical, manager_agent=nexus_manager, verbose=True, memory=False)`. O `nexus_manager` tem `allow_delegation=True`.
4. O `Dockerfile` do módulo usa este arquivo como `CMD`, então é o «Nexus-Bot» que roda no container e no Kubernetes (módulo 13).

**Como rodar**
- `python3 labs/modulo12_projeto_final.py` (opção 12 do menu).
- No container: `docker run --rm -e GROQ_API_KEY=... nexus-bot:v1` (slide 13.1).

**Armadilhas e achados no código**
- Os especialistas não têm ferramentas: o diagnóstico, o ROI e as «correções» são narrativa gerada pelo LLM a partir do texto da Task, sem dados reais. Os números do relatório não vêm de medição.
- O mesmo `nexus_manager` é `manager_agent` da Crew e dono da Task; não verifiquei como a versão 1.14.4 do CrewAI trata essa combinação.
- `memory=False` tem o comentário «para evitar erros de biblioteca no Mac»; ou seja, o «contexto compartilhado» da teoria vem só do encadeamento da execução hierárquica, não de memória persistente.
- Slides de 12 falam em ROI como retorno da IA; nenhum código calcula ROI.

---

## 🔗 Para ir além
- [Slides do módulo 12](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides)
- [CrewAI](https://www.crewai.com/)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica)

---

⬅️ [09 · Auto-remediação segura: RAG de runbooks, postmortem automático, guardrails e dry-run](./09-runbook-rag-self-healing-guardrails.md)  ·  [11 · Dockerização: o artefato de IA imutável](./11-docker-immutable-ai-artifact.md) ➡️
