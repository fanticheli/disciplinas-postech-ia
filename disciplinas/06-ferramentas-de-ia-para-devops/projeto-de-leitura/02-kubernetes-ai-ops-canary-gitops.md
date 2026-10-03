# 02 · Agentes para Kubernetes: manifestos, reconciliação e Canary

> **Unidade 3 · Aulas 1 a 3** · Leitura: ~7 min · Bloco: Kubernetes e Troubleshooting

## 🎯 Em uma frase
No K8s AI-Ops o **Arquiteto** gera o manifesto (Deployment + Service com readinessProbe) e o agente **SRE** reconcilia com `kubectl apply` e decide, via um **Canary Analyzer**, se o rollout segue ou volta. A aula mostra que bons prompts e restrições explícitas reduzem erros, e o código mostra que o template carrega boa parte disso.

---

## 👵 Explicando para a vovó

Pense numa padaria que quer lançar uma receita nova. Em vez de trocar todos os pães de uma vez, serve a nova só para 10% dos clientes (o «canário» da mina que avisava do gás antes dos mineiros). Se ninguém passar mal, aumenta para 25%, 50% e 100%.

O agente de SRE é o encarregado que observa as reações (erros, demora) e decide: continua ou volta atrás. O arquiteto só escreve a receita no formato certo.

---

## 🔧 Tecnicamente

### O que é
- **«YAML Engineers»:** Docker Compose, Kubernetes, CI, Prometheus e Grafana vivem de YAML sensível a indentação. A IA ajuda porque infere os recursos necessários: pediu Nginx, vem Deployment, imagem, portas e, se couber, Service.
- **Readiness Probe:** só deixa o pod receber tráfego quando está pronto de verdade. Sem ela, o container já «de pé» recebe requisição antes de terminar de iniciar e os usuários veem erro.
- **Canary Deployment:** liberação gradual (ex.: 10%, 25%, 50%, 100%) com observação entre as etapas. A IA entra olhando logs e métricas: erro, latência e degradação decidem continuar, parar ou fazer **rollback**.
- **GitOps:** o Git é a fonte da verdade do estado desejado e controladores como **Argo CD** e **Flux** reconciliam o cluster continuamente. A IA complementa (gera ou ajusta manifestos) e não substitui o fluxo. O laboratório *não* usa Argo/Flux, só simplifica.
- **Dois agentes:** o Arquiteto agora gera YAML de Kubernetes (a ferramenta nova substitui a Writer Tool) e o **SRE** aplica manifestos e analisa métricas de rollout. A aula nota que DevOps e SRE se sobrepõem na prática.
- **Reconciliação declarativa:** o Kubernetes compara estado desejado e real e executa só o necessário. Reaplicar um manifesto igual retorna «sem mudanças»; alterar o nome da app cria novos objetos.

### Como funciona
- **Restrições no prompt:** exigir **imagem pública válida** evita que a IA invente imagem inexistente, e a grafia exata de `readinessProbe` evita manifesto que falha no deploy. Quanto mais detalhado o prompt, melhor a saída.
- **Template com variáveis:** a ferramenta usa um modelo com `apiVersion`, `kind`, metadados, réplicas, containers e imagem. O agente só preenche nome da app, réplicas e porta, extraídos do prompt. O **Service** existe porque pods são efêmeros e mudam de endereço.
- **Modo simulação:** se não houver cluster (ou `kubectl`), a ferramenta de apply opera em simulação, o que permite validar o manifesto sem ambiente.
- **Canary Analyzer:** observa taxa de erros e latência; em ambiente local sem tráfego, as métricas ficam estáveis e o rollout é aprovado.
- **Teste da Aula 3:** trocar o nome da app no prompt propaga para Deployment, Service e labels; 2 réplicas e pods saudáveis aparecem no cluster. Tentativas de induzir manifestos errados falharam, mas isso *não* prova que o agente é infalível: nenhum sistema com LLM tem garantia.
- **Próximo passo:** provocar falhas de propósito e usar Prometheus e Jaeger no diagnóstico (módulo 4).

### Onde aplicar
- Geração de manifestos padronizados com probes, limites e nomes consistentes para vários microserviços.
- Gate de rollout: decidir promoção ou rollback com base em erro e latência observados.
- Reconciliar mudanças geradas por IA dentro de um fluxo GitOps normal (PR, revisão, Argo/Flux).

### Vantagens e limites
**Vantagens**
- Readiness e demais boas práticas entram por padrão no manifesto.
- Template reduz a liberdade da LLM e, portanto, os erros.
- Decisão de rollout baseada em métricas, não em intuição.

**Limites**
- Manifestos válidos hoje podem quebrar com APIs deprecadas em versões futuras do cluster.
- Decisões de rollback automáticas exigem métricas confiáveis e governança.
- O lab roda sem tráfego real, então a análise de Canary é só demonstrativa.

### 🚫 Armadilhas
- Achar que a robustez vem da «esperteza» da LLM quando vem do template.
- Não fixar a versão da imagem (`latest`) e perder reprodutibilidade.
- Esquecer que o Service é o ponto estável de acesso: pods mudam.
- Considerar o Canary Analyzer do lab equivalente a uma análise real de produção.

> 💡 **Dica:** Reaplicar o mesmo manifesto e ver «unchanged» é um bom teste de idempotência; mude só o nome da app para provar que o fluxo gera objetos novos.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Deployment | Descreve estado desejado e réplicas de uma app |
| Service | Ponto estável de acesso aos pods efêmeros |
| Readiness Probe | Só encaminha tráfego a pods realmente prontos |
| Canary | Liberação gradual de uma nova versão com observação |
| Rollback | Voltar à versão estável anterior |
| GitOps | Git como fonte da verdade; Argo CD/Flux reconciliam |
| Reconciliação | Eliminar a diferença entre estado desejado e real (`kubectl apply`) |
| SRE agent | Aplica manifestos e valida a operação pós-deploy |

---

## 💻 No código do repo

**Projeto:** [labs/modulo3_k8s_ops.py + tools/k8s_ops.py + nexus-api*-k8s.yaml](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo3_k8s_ops.py)

Fluxo GitOps em miniatura: o Arquiteto gera `nexus-api-k8s.yaml`, o SRE o aplica com `kubectl` (ou simula) e aprova ou reverte o rollout com um analisador de métricas.

**Fluxo**
1. `labs/modulo3_k8s_ops.py`: `architect = get_architect(tools=[generate_k8s_manifest])` e `sre = get_sre_agent(tools=[apply_k8s_manifest, analyze_canary_metrics])`, três Tasks em `Process.sequential`: desenhar (app `nexus-api`, 2 réplicas, porta 80, `nginx:latest`, readinessProbe), sincronizar `nexus-api-k8s.yaml` e decidir o rollout com `'error_rate: 1%, latency: 80ms'`.
2. `tools/k8s_ops.py`, `generate_k8s_manifest(app_name, replicas, port)`: monta um YAML fixo (Deployment com `image: nginx:latest`, readinessProbe em `/`, mais Service `<app>-svc` que mapeia a porta 80 para `targetPort`) e grava `<app>-k8s.yaml` no diretório atual.
3. `apply_k8s_manifest(filename)`: erro se o arquivo não existe; roda `kubectl apply -f`; código 0 devolve «GitOps Sync Success»; código diferente de 0 devolve «GitOps Simulation»; sem o binário, «Simulation Mode» citando ArgoCD/Flux.
4. `analyze_canary_metrics(metrics_data)`: regex `error_rate:\s*([\d.]+)\s*%`; acima de 5 devolve ROLLBACK, senão PROCEED.
5. Os arquivos `nexus-api-k8s.yaml`, `nexus-api-error-k8s.yaml` e `nexus-api-unipds-k8s.yaml` da raiz provavelmente são saídas das execuções da aula (mesma estrutura do template, só o nome da app muda), o que reproduz o teste de «trocar o nome para forçar novo deploy».

**Como rodar**
- `python3 labs/modulo3_k8s_ops.py` (opção 3 do menu); sem cluster o apply vira simulação.
- Com cluster local: `kubectl apply -f nexus-api-k8s.yaml`, `kubectl get deployments`, `kubectl get pods` (comandos do slide 3).

**Armadilhas e achados no código**
- O Canary Analyzer só lê `error_rate`: a latência que a apostila cita está no texto da Task, mas não é avaliada no código.
- Qualquer código de saída diferente de 0 do `kubectl` vira «nenhum cluster detectado», o que mascara erros reais (YAML inválido, permissão negada).
- A «robustez» da aula vem do template: imagem, probe e estrutura são fixos na ferramenta, e a LLM só preenche nome, réplicas e porta. Por isso induzir erro pelo prompt não funcionou.
- A imagem é `nginx:latest`, tag mutável.

---

## 🔗 Para ir além
- [Kubernetes](https://kubernetes.io/)
- [Slides do módulo 3](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica)

---

⬅️ [01 · IaC Copilot: Arquiteto e Auditor com Checkov e OPA](./01-iac-copilot-terraform-checkov-opa.md)  ·  [03 · Troubleshooting com ReAct: reduzindo o MTTR com Prometheus, Jaeger e eventos do K8s](./03-troubleshooting-react-mttr.md) ➡️
