# 09 · Auto-remediação segura: RAG de runbooks, postmortem automático, guardrails e dry-run

> **Unidades 10 e 11 · Aulas 1 e 2 de cada** · Leitura: ~9 min · Bloco: Entrega, Custo e Auto-remediação

## 🎯 Em uma frase
**Conhecimento vivo:** runbooks e postmortems deixam de ser documentos esquecidos e viram fonte de consulta (RAG) para o agente de SRE. **Auto-remediação segura:** a IA diagnostica e propõe, mas a execução passa por **guardrails** (rate limit, Canary Rollback), **dry-run** e **Human-in-the-Loop**, separando sugestão de ação.

---

## 👵 Explicando para a vovó

Runbook é a «receita de emergência» do hospital: se o paciente chega com tal sintoma, siga os passos. O problema é que ninguém lê o manual na hora do aperto. Com RAG, o plantonista virtual já chega com a receita certa na mão.

Mas receita não é carta branca: antes de aplicar o remédio, simula-se o efeito (dry-run) e um médico responsável assina. E se o paciente piorar depois da dose, o protocolo manda reverter na hora (rollback).

---

## 🔧 Tecnicamente

### O que é
- **Conhecimento vivo:** a documentação existe (wiki, repositório), mas é estática e ninguém consulta durante um incidente. O RAG combina o raciocínio da IA com a base da organização (runbooks, playbooks, políticas, arquiteturas). Também reduz o **conhecimento tribal** e acelera onboarding.
- **Runbook** descreve sintomas, diagnóstico e ações corretivas de uma situação conhecida. O agente *interpreta* o runbook junto com o contexto do incidente, em vez de copiá-lo, como faria um SRE experiente.
- **Postmortem automático:** reconstruir o que aconteceu às 3 da manhã é difícil e perde detalhes. Um agente acompanha o incidente (chat, transcrições de reunião, métricas) e gera, quase em tempo real, um rascunho com resumo de impacto, causa raiz, ações corretivas e ações preventivas. A equipe só revisa e complementa.
- **Circuito de auto-remediação:** alerta, investigação (logs, métricas), consulta ao runbook, proposta de correção no ChatOps (módulo 6), validação humana e execução. O exemplo da aula é saturação de conexões num banco, causada por conexões ociosas.
- **Guardrails e autocura:** guardrails limitam o que a automação pode fazer; autocura aplica correções automáticas ou semiautomáticas. O ciclo exige **detecção, análise, validação da hipótese e só então ação**, porque a mesma métrica pode ter causas diferentes.
- **Falha em cascata e alucinação:** a própria automação pode criar um problema pior, e a IA pode alucinar um comando plausível porém errado. Defesas: **circuit breaker** operacional, **rate limiting** (máximo de ações por intervalo), **Canary Rollback** (monitorar depois da ação e reverter se piorar) e **HITL** para operações de alto impacto (apagar banco, reiniciar componente central, remover infra).
- **Dry-run:** simular antes de executar, mostrando o que seria criado, modificado ou removido. A IA vira **copiloto**: investiga, propõe e demonstra o efeito; a decisão final é humana.

### Como funciona
- **Agente SRE de conhecimento:** perfil de veterano de plantões, que baseia soluções em documentação oficial e evidências, com uma ferramenta que consulta o runbook do serviço afetado. A consulta é direcionada: banco busca runbook de banco, Kubernetes busca o de cluster.
- **Exemplo do banco:** o runbook orienta olhar processos e sessões abertas sem necessidade. O agente identifica conexões ociosas como causa comum e propõe a remoção, depois produz o rascunho de postmortem (resumo, causa raiz, correção, prevenção).
- **Segurança operacional:** um agente com mentalidade de proteção (auditor das ações propostas) tem prioridade em preservar a estabilidade, mais que em resolver rápido. Uma correção tecnicamente válida pode ser inadequada naquele momento (janela de manutenção, deploy planejado, dependência externa).
- **Fluxo com aprovação:** o agente analisa, propõe, faz dry-run, apresenta o resumo (problema, correção, efeito esperado) e **para**. Aprovou: executa. Rejeitou: interrompe imediatamente. Não pode haver caminho em que a mudança seja aplicada após rejeição, e a resposta do agente deve refletir fielmente a decisão.
- **Prompt sem ambiguidade:** em fluxos de aprovação, o agente precisa saber exatamente o que fazer em cada ramo. Agentes lidam bem com tarefas complexas, mas precisam de regras claras para exceções.
- **Cenário K8s:** um *checkout* falha após deployment, o agente acha uma inconsistência no Deployment, gera o ajuste, simula e aguarda o humano.
- **Indicação de leitura 3:** *The Site Reliability Workbook* aprofunda playbooks, runbooks acionáveis, postmortems baseados em evidência e guardrails operacionais.

### Onde aplicar
- Assistente de incidente que consulta runbooks e posta no Slack a ação sugerida para aprovar.
- Geração de postmortem a partir de chat, métricas e linha do tempo do incidente.
- Remediação automática de falhas conhecidas e de baixo risco, com limite de taxa e rollback.

### Vantagens e limites
**Vantagens**
- Respostas alinhadas às práticas internas, com menos dependência de pessoas específicas.
- Postmortem sai no calor do incidente, sem perda de detalhe.
- Camadas de proteção tornam a automação auditável e reversível.

**Limites**
- Runbook desatualizado ou incompleto leva a recomendação ruim (RAG não corrige documentação ruim).
- Cada camada de guardrail adiciona latência e complexidade.
- HITL reduz velocidade; é preciso decidir o que realmente exige aprovação.

### 🚫 Armadilhas
- Deixar a IA agir só com hipótese, sem validar a causa.
- Dry-run que apenas imprime «sucesso» sem executar a simulação real.
- Fluxo de aprovação ambíguo, em que rejeitar não interrompe o resto.
- Deixar o agente alterar também a documentação/runbook sem revisão.

> 💡 **Dica:** Defina por escrito quais ações são «baixo risco, automática», «média, com dry-run» e «alta, só com humano»; é essa tabela que o guardrail precisa implementar.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Conhecimento vivo | Documentação consultável pelo agente em tempo real |
| Runbook | Procedimento para uma situação operacional conhecida |
| Postmortem | Documento pós-incidente: causa raiz, ações, prevenção |
| Auto-remediação / autocura | Correção automática ou semiautomática de falhas |
| Guardrail | Limite operacional que restringe a ação da IA |
| Circuit breaker / rate limit | Interrompe ou limita ações em sequência |
| Canary Rollback | Monitora depois da ação e reverte se piorar |
| Dry-run | Simulação do efeito antes de executar |
| Falha em cascata | Correção que causa novos problemas em série |

---

## 💻 No código do repo

**Projeto:** [labs/modulo10_remediation.py + data/runbook_db.md](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo10_remediation.py)

O agente SRE de conhecimento consulta o runbook do serviço `db`, identifica o comando de limpeza de conexões e escreve um rascunho de postmortem.

**Fluxo**
1. `labs/modulo10_remediation.py` define `consult_runbook(service_name)`: lê `data/runbook_<service_name>.md` (ou devolve «Runbook not found») e a entrega ao agente `get_sre_knowledge_agent`.
2. A Task descreve o alerta («Saturação de Conexões» no banco), pede para consultar o runbook de `db`, identificar o comando SQL exato para limpar conexões ociosas e escrever o rascunho de postmortem.
3. `data/runbook_db.md` traz título («Saturação de Conexões no PostgreSQL»), sintoma (alerta `PostgresqlTooManyConnections`, erro de slots reservados, latência de escrita acima de 500 ms) e diagnóstico com `SELECT count(*), state FROM pg_stat_activity GROUP BY state;`.

**Como rodar**
- `python3 labs/modulo10_remediation.py` (opção 10 do menu); os slides usam `./venv/bin/python3 labs/modulo10_remediation.py`.

**Armadilhas e achados no código**
- O `runbook_db.md` está **truncado**: termina dentro de um bloco de código aberto, logo após a query de diagnóstico, e não tem seção de remediação. O «comando SQL exato» que a Task exige não está no runbook, então o agente provavelmente o produz do conhecimento do próprio modelo, o que derrota a ideia de RAG.
- O «RAG» é leitura de um arquivo pelo nome do serviço: sem embeddings, busca ou ranking. E `service_name` vem do LLM e compõe o caminho do arquivo sem validação (endurecimento necessário fora do laboratório).
- O postmortem é um rascunho de LLM sobre o texto da Task; não há coleta de chat, métricas ou reunião como na teoria.

**Projeto:** [labs/modulo11_guardrails.py](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo11_guardrails.py)

Um agente Safety SRE corrige o *checkout-api* (imagem inválida) passando por uma ferramenta com dry-run simulado e confirmação humana pelo terminal.

**Fluxo**
1. `labs/modulo11_guardrails.py` define a ferramenta `executar_fix_k8s_com_seguranca(manifesto_yaml)`: imprime o manifesto proposto, imprime um «dry-run realizado com sucesso» fixo, pergunta `input("... (sim/nao)")` e devolve «SUCESSO: Alteração aplicada…» ou «CANCELADO».
2. O agente é `get_safety_sre_agent` (backstory: «SEMPRE usa dry-run e nunca aplica mudanças sem aprovação explícita»). A Task manda gerar um Deployment corrigido apontando para `checkout-api:v2.0`, validar com a ferramenta e nunca aplicar fora dela.
3. O resultado final é impresso depois de `crew.kickoff()`.

**Como rodar**
- `python3 labs/modulo11_guardrails.py` (opção 11 do menu) em terminal interativo: ele aguarda a resposta «sim» ou «nao».
- Rodar o lab dentro de um container sem TTY tende a falhar em `input()` (hipótese, não testei).

**Armadilhas e achados no código**
- O dry-run é uma linha impressa: nada executa `kubectl apply --dry-run`, e o «SUCESSO» de aprovação também é só texto. O guardrail demonstra o fluxo, não a proteção.
- O slide 11 sugere `python3 labs/modulo11_guardrails.py --dry-run`, mas o script não processa argumentos.
- Rate limiting, circuit breaker e Canary Rollback (teoria da aula) não estão no código.
- Único lab com nomes em português (`executar_fix_k8s_com_seguranca`, `manifesto_yaml`), resultado do alinhamento à videoaula (commit `fix(modulo06): alinha lab do modulo 11`).
- A proteção depende de o LLM chamar a ferramenta: não há outra camada que impeça um agente de «aplicar» por outro meio.

---

## 🔗 Para ir além
- [Slides dos módulos 10 e 11](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica)

---

⬅️ [08 · FinOps com IA: recursos zumbis, rightsizing, Spot e relatório de economia](./08-finops-zombie-resources-rightsizing.md)  ·  [10 · Projeto integrador: orquestração hierárquica, Game Day e ROI](./10-multi-agent-hierarchy-final-project.md) ➡️
