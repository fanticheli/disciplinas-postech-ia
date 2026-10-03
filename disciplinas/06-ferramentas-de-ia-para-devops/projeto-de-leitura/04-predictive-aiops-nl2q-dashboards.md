# 04 · AIOps e observabilidade preditiva: NL2Q, alerta antes da queda e dashboards dinâmicos

> **Unidade 5 · Aulas 1 a 3** · Leitura: ~6 min · Bloco: Observabilidade, ChatOps e Segurança

## 🎯 Em uma frase
Observabilidade preditiva busca fazer o **alerta tocar antes da falha**: o agente de AIOps traduz linguagem natural em **PromQL (NL2Q)**, aplica um modelo preditivo sobre o histórico (disco enchendo) e gera um **dashboard em JSON** pronto para importar no Grafana.

---

## 👵 Explicando para a vovó

O alerta tradicional é o alarme de incêndio que só toca quando já tem fogo. A observabilidade preditiva é o sensor que percebe «a temperatura sobe sem parar» e avisa que a sala vai pegar fogo em quatro horas, a tempo de agir.

E o dashboard dinâmico é como montar, em segundos, o painel exato de que você precisa naquele incêndio, em vez de passar meia hora desenhando gráficos com a casa pegando fogo.

---

## 🔧 Tecnicamente

### O que é
- **NL2Q (Natural Language to Query):** o agente traduz «taxa de erro do checkout» para **PromQL** (métricas) ou **LogQL** (logs). Democratiza a observabilidade: quem não domina a sintaxe consegue consultar.
- **Alertas estáticos geram ruído:** CPU a 90% na Black Friday é normal. O resultado é a **fadiga de alertas**, em que equipes ignoram notificações importantes. Soluções: considerar histórico, sazonalidade e múltiplos indicadores.
- **Séries temporais e Machine Learning:** **Prophet** (previsão com sazonalidade) e **Isolation Forest** (pontos fora da curva). Anomalia não é problema por definição: precisa de contexto, e é preciso tratar falsos positivos e falsos negativos.
- **Dashboards dinâmicos:** durante um incidente, montar painel no Grafana (datasource, painéis, visualizações) consome tempo precioso. O agente lê o contexto e gera o JSON com os painéis certos (métricas, logs, traces).
- **Indicação de leitura 1:** *Observability Engineering* aprofunda a crítica a alertas estáticos e painéis fixos e prepara o terreno para NL2Q e dashboards gerados por IA.

### Como funciona
- **Agente de AIOps:** «engenheiro de AIOps e análise de dados», com background em séries temporais, PromQL, Prophet e Isolation Forest. Não só mostra métricas, transforma em insight acionável.
- **Fluxo da aula (3 etapas):** (1) traduzir «qual a porcentagem de disco livre?» para PromQL; (2) analisar o histórico «uso atual 85%, crescimento contínuo de 2 GB por hora» e emitir um alerta preditivo de **saturação em cerca de 4 horas**; (3) gerar o dashboard de «Disk Saturation».
- **Mitigação sugerida:** rotina de limpeza, reorganização de temporários ou ampliação do armazenamento. A escolha final depende das regras da empresa; o essencial é a recomendação chegar *antes* da indisponibilidade.
- **Dashboard:** o JSON inclui painel de uso de disco e painel de taxa de erro, o que permite correlacionar infraestrutura com impacto na aplicação. É ponto de partida, não estrutura rígida: período e organização podem ser ajustados.
- **Grafana local (Aula 3):** sobe em container; a importação por JSON funciona e o título do painel reflete o contexto do incidente. Os dados são **simulados** (sem Prometheus/CloudWatch reais). A frase da aula: «se não funciona localmente, dificilmente funciona em produção».
- **Preditivo + MTTR:** MTTR acelera a recuperação depois da falha; o preditivo tenta evitá-la. Juntos formam ambientes mais resilientes.

### Onde aplicar
- Prever saturação de disco, memória ou conexões e abrir o chamado antes do incidente.
- Painel de incidente gerado sob demanda, com as métricas do contexto.
- Permitir que times de dev consultem Prometheus/Loki em português.

### Vantagens e limites
**Vantagens**
- Troca reação por antecipação e reduz alerta ruidoso.
- Reduz a barreira de PromQL/LogQL.
- Economiza o tempo mais caro do incidente: montar painel e consulta.

**Limites**
- Modelos preditivos exigem histórico e ajuste; sazonalidade mal modelada gera falso alarme.
- A query gerada precisa ser revisada: NL2Q também alucina.
- Dashboards automáticos são ponto de partida e carecem de curadoria.

### 🚫 Armadilhas
- Tratar toda anomalia como incidente (e vice-versa).
- Confiar numa previsão sem checar os dados de entrada.
- Achar que «NL2Q» elimina a necessidade de entender PromQL.
- Considerar o laboratório um modelo preditivo real (veja os achados no código).

> 💡 **Dica:** Gere a query em linguagem natural, mas leia o PromQL resultante: ele é código e precisa de revisão como qualquer outro.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| AIOps | IA aplicada a operações: interpretar dados operacionais e agir |
| NL2Q | Linguagem natural para consulta (PromQL/LogQL) |
| PromQL / LogQL | Linguagens de consulta do Prometheus e de logs |
| Prophet | Previsão de séries temporais com sazonalidade |
| Isolation Forest | Detecção de anomalias (pontos fora do padrão) |
| Fadiga de alertas | Excesso de notificações que leva a ignorar as críticas |
| Falso positivo/negativo | Alarme sem problema / problema sem alarme |
| Dashboard dinâmico | Painel gerado pela IA a partir do contexto do incidente |

---

## 💻 No código do repo

**Projeto:** [labs/modulo5_aiops.py + tools/aiops_tools.py + incident_dashboard.json](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo5_aiops.py)

Um agente, uma Task e três ferramentas (NL para PromQL, alerta preditivo de disco e gerador de dashboard) que percorrem o cenário do disco enchendo.

**Fluxo**
1. `labs/modulo5_aiops.py`: `get_aiops_agent(tools=[nl_to_promql, predictive_disk_alert, generate_grafana_dashboard])` e uma única Task com os 3 passos, em `Crew(..., verbose=True).kickoff()`.
2. `nl_to_promql`: se o texto tem «taxa de erro»/«error» devolve `rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])`; se tem «disco»/«disk», `node_filesystem_avail_bytes{mountpoint="/data"} / node_filesystem_size_bytes{mountpoint="/data"} * 100`; senão `up{job="kubernetes-pods"}`.
3. `predictive_disk_alert`: se o histórico contém «growth» ou «crescimento», devolve um alerta com «saturação de 100% em exatas 4 horas»; senão «padrão normal».
4. `generate_grafana_dashboard`: monta um dicionário com `title` «Dynamic Incident Dashboard: <contexto>» e dois painéis (`timeseries` de `node_filesystem_avail_bytes` e `stat` de erros 500) e grava `incident_dashboard.json` no diretório atual. O arquivo da raiz é uma saída de execução.

**Como rodar**
- `python3 labs/modulo5_aiops.py` (opção 5 do menu).
- Opcional: `docker run -d -p 3000:3000 --name meu-grafana grafana/grafana` e importar o JSON (slide 5).

**Armadilhas e achados no código**
- O slide manda rodar `python3 modulo5_aiops.py` (sem `labs/`): o caminho correto é `labs/modulo5_aiops.py`.
- Não há modelo preditivo: o README fala em «regressão linear» e a docstring cita Prophet, mas o código só testa palavras-chave e devolve texto fixo. As «4 horas» não são calculadas a partir de 85% + 2 GB/h.
- O JSON do dashboard é mínimo (`title` e `panels`); não conferi se o Grafana o importa sem ajustes, embora a aula mostre a importação funcionando.
- Os dados do Grafana na aula são mockados; nada consulta um Prometheus real.

---

## 🔗 Para ir além
- [Prometheus](https://prometheus.io/)
- [Grafana](https://grafana.com/)
- [Slides do módulo 5](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica)

---

⬅️ [03 · Troubleshooting com ReAct: reduzindo o MTTR com Prometheus, Jaeger e eventos do K8s](./03-troubleshooting-react-mttr.md)  ·  [05 · ChatOps com governança: RBAC, IAM e Human-in-the-Loop](./05-chatops-governance-hitl.md) ➡️
