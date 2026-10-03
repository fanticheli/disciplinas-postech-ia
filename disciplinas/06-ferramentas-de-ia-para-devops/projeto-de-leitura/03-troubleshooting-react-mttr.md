# 03 · Troubleshooting com ReAct: reduzindo o MTTR com Prometheus, Jaeger e eventos do K8s

> **Unidade 4 · Aulas 1 a 3** · Leitura: ~8 min · Bloco: Kubernetes e Troubleshooting

## 🎯 Em uma frase
**ReAct** (Reason + Act, nada a ver com o React do front-end) é um ciclo de **pensar, agir, observar**. O agente SRE on-call correlaciona **Prometheus** (métricas), **Jaeger** (traces) e a inspeção de pods do Kubernetes para chegar à causa raiz e propor a correção, reduzindo o **MTTR**.

---

## 👵 Explicando para a vovó

Um bom médico não dá o diagnóstico só ouvindo «dói»: pede exame de sangue, raio-X, olha o histórico e vai refinando a hipótese. ReAct é isso no mundo dos servidores: o agente levanta um sintoma, escolhe uma ferramenta, lê o resultado e só então decide o próximo passo.

Métricas dizem «tem algo lento»; o trace aponta «a demora está na consulta ao banco»; o evento do pod diz «o contêiner nem chegou a subir». Juntos, formam o laudo.

---

## 🔧 Tecnicamente

### O que é
- **MTTR** (Mean Time To Recovery/Repair): tempo para identificar, diagnosticar e corrigir um problema em produção. Quanto menor, menor o impacto no usuário e no negócio.
- **ReAct:** a resposta final é construída aos poucos; cada ação gera evidências que mudam a decisão seguinte. É diferente de um agente simples que recebe pergunta e responde.
- **Erros clássicos:** `CrashLoopBackOff` (container sobe e cai em loop: variável de ambiente errada, banco inacessível, imagem, health check mal configurado), `OOMKilled` (passou do limite de memória, em qualquer linguagem) e `ImagePullBackOff` (tag de imagem inexistente). Há ainda o caso em que os logs parecem normais e a falha está no **Readiness Probe**.
- **Prometheus** coleta métricas por *scraping* e é consultado com **PromQL**; as duas métricas centrais da aula são **latência** e **taxa de erro 5xx**. **Jaeger** faz tracing distribuído e mostra onde, no caminho da requisição, está o gargalo.
- **kubectl describe pod** funciona como linha do tempo: eventos desde o download da imagem até as tentativas de iniciar. É o que o agente usa para compor o diagnóstico.
- **Observabilidade antes do incidente:** latência anormal, erros crescentes e consumo de recursos aparecem antes da queda. Detectá-los cedo muda a operação de reativa para preventiva (tema do módulo 5).

### Como funciona
- **Cenário controlado:** uma aplicação *Checkout* é colocada em falha de propósito. O agente investiga com ReAct: métricas de erro e latência, traces do serviço, inspeção do pod, e por fim sugere a correção.
- **Camada de ferramentas de observabilidade:** uma consulta Prometheus, uma consulta Jaeger e uma inspeção de pods, mais um sugeridor de correções. Na aula, Prometheus e Jaeger são **simulados**, mas representam o que viria de um ambiente real; a apostila cita como exemplo um gargalo numa chamada ao PostgreSQL (o código fixa esse span em 800 ms).
- **Catálogo de falhas + recomendações:** `ImagePullBackOff` leva a corrigir a tag (ECR ou Docker Hub); OOM leva a subir limites; CrashLoop leva a revisar env vars, Secrets e banco.
- **A realidade foge do catálogo:** na demonstração o erro acontecia antes de o container iniciar, e a memória configurada era tão baixa que o recurso nem era criado. Por isso o catálogo precisa evoluir com novos erros.
- **Correção gerada:** o agente produziu um manifesto corrigido com recursos, liveness e readiness com atraso inicial e intervalos, porque health checks cedo demais fazem o Kubernetes reiniciar uma app que só estava inicializando (típico quando há conexão com banco, cache ou fila).
- **Validação:** reaplicado o fix, os eventos passam de falha e reinicialização para criação, inicialização e ativação dos probes, e o pod fica saudável.

### Onde aplicar
- Plantão de SRE com agente que reúne métricas, traces e eventos antes de o humano abrir o primeiro dashboard.
- Geração de hotfix de manifesto (probes, limites, imagem) para revisão humana.
- Enriquecer alertas com hipóteses de causa raiz e links de evidência.

### Vantagens e limites
**Vantagens**
- Diagnóstico estruturado e rastreável: cada conclusão aponta para uma evidência.
- Correlação de fontes diferentes reduz o ruído de alertas isolados.
- Fecha o ciclo: do sintoma ao manifesto corrigido.

**Limites**
- O diagnóstico é tão bom quanto as ferramentas que o agente tem; sem dados reais ele só reproduz um cenário.
- Catálogos de erro ficam desatualizados.
- O agente pode propor uma correção plausível que não resolve a causa.

### 🚫 Armadilhas
- Confundir ReAct (padrão de raciocínio) com React (biblioteca de front-end).
- Assumir que todo erro cabe em `CrashLoopBackOff`/`OOMKilled`.
- Configurar probes cedo demais para apps que dependem de banco ou cache.
- Trocar a causa raiz pelo sintoma: reiniciar pod não conserta um limite de memória errado.

> 💡 **Dica:** Quando os logs parecem normais e a app está fora do ar, olhe o Readiness Probe e os eventos do pod antes de mexer no código.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| MTTR | Tempo médio para recuperar/reparar um serviço após um incidente |
| ReAct | Ciclo pensar, agir, observar, repetir |
| CrashLoopBackOff | Container reinicia em loop por falha na inicialização |
| OOMKilled | Container morto por exceder o limite de memória |
| ImagePullBackOff | Falha ao baixar a imagem (tag inexistente ou sem acesso) |
| Prometheus / PromQL | Métricas por scraping e a linguagem de consulta |
| Jaeger | Tracing distribuído para achar gargalos entre serviços |
| kubectl describe pod | Eventos e estado do pod como linha do tempo |
| Liveness / Readiness | Probes de saúde e de prontidão para tráfego |

---

## 💻 No código do repo

**Projeto:** [labs/modulo4_troubleshooting.py + tools/k8s_diag.py + tools/obs_tools.py + checkout-broken.yaml + checkout-k8s-fix.yaml](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo4_troubleshooting.py)

Dois agentes em sequência: o SRE on-call diagnostica o *checkout-api* com ferramentas de métricas, trace e pod; o Arquiteto grava o manifesto de correção seguindo regras estritas.

**Fluxo**
1. `labs/modulo4_troubleshooting.py`: `sre_oncall = get_oncall_sre(tools=[inspect_pod_failure, suggest_fix, query_prometheus_metrics, query_jaeger_traces])` (agente com `allow_delegation=True`) e `architect = get_architect(tools=[write_file])`. Task 1: investigar com ReAct em 4 passos (Prometheus, Jaeger, pod, sugestão); Task 2: gerar `checkout-k8s-fix.yaml` com regras estritas (Deployment, `nginx:latest`, porta 80, probes em `/`, `initialDelaySeconds`).
2. `tools/obs_tools.py`: `query_prometheus_metrics` devolve texto fixo por palavra-chave (latência: 850 ms «HIGH»; erro: 12% de 5xx; senão «normal»). `query_jaeger_traces` sempre aponta um span de 800 ms na chamada ao PostgreSQL, qualquer que seja o serviço.
3. `tools/k8s_diag.py`: `inspect_pod_failure` responde por substring do nome do pod (`api`: falha de conexão com banco; `worker`: OOMKilled; senão: readiness probe falhando); `suggest_fix` consulta um dicionário (OOMKilled, ImagePullBackOff, CrashLoopBackOff).
4. `checkout-broken.yaml`: Deployment `checkout-api` com `image: nginx:versao-que-nao-existe-999` (erro proposital: ImagePullBackOff). `checkout-k8s-fix.yaml`: `nginx:latest`, porta 80, liveness (`initialDelaySeconds: 15`) e readiness (`5`), ambos em `/`.

**Como rodar**
- Cenário quebrado: `kubectl apply -f checkout-broken.yaml` (como no slide 4); depois `python3 labs/modulo4_troubleshooting.py`; aplicar `kubectl apply -f checkout-k8s-fix.yaml` e `kubectl get pods`.
- Sem cluster, dá para rodar só o agente: as ferramentas de diagnóstico são simuladas.

**Armadilhas e achados no código**
- `"api" in pod_name.lower()` é verdadeiro para `checkout-api`, então o diagnóstico devolvido é o de falha de conexão com o banco, não o ImagePullBackOff do manifesto quebrado. O ramo «readiness» é inalcançável para esse pod.
- O README manda aplicar `k8s/deploy.yml` para «simular a quebra», mas esse arquivo é o Deployment do `nexus-bot` (módulo 13). O cenário quebrado correto, como nos slides, é `checkout-broken.yaml`.
- A apostila descreve um manifesto quebrado por memória baixíssima; o repositório atual usa tag de imagem inexistente (o `checkout-broken.yaml` entrou no commit `4e59133`; não verifiquei se a apostila foi gravada antes ou depois dele).
- A regra «path `/` nos probes» no prompt existe porque o Nginx responde 404 em `/healthz`: a limitação do cenário foi empurrada para o texto da Task.
- Prometheus e Jaeger são texto fixo: os números (850 ms, 12%, 800 ms) não vêm de nenhuma medição.

---

## 🔗 Para ir além
- [Prometheus](https://prometheus.io/)
- [Jaeger](https://www.jaegertracing.io/)
- [Slides do módulo 4](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica)

---

⬅️ [02 · Agentes para Kubernetes: manifestos, reconciliação e Canary](./02-kubernetes-ai-ops-canary-gitops.md)  ·  [04 · AIOps e observabilidade preditiva: NL2Q, alerta antes da queda e dashboards dinâmicos](./04-predictive-aiops-nl2q-dashboards.md) ➡️
