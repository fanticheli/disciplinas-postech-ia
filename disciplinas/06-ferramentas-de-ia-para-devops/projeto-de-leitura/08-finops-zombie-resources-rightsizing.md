# 08 · FinOps com IA: recursos zumbis, rightsizing, Spot e relatório de economia

> **Unidade 9 · Aulas 1 e 2** · Leitura: ~6 min · Bloco: Entrega, Custo e Auto-remediação

## 🎯 Em uma frase
**FinOps** junta tecnologia, operação e finanças para que o gasto em nuvem acompanhe a necessidade real. O agente FinOps funciona como **auditor financeiro permanente**: lê um inventário em JSON, acha **recursos zumbis** e instâncias **superdimensionadas** e entrega um relatório com economia estimada por ação.

---

## 👵 Explicando para a vovó

Nuvem é como um hotel em que você pode reservar quartos com um clique. Fácil demais: sobram quartos pagos que ninguém usa (zumbis), suítes presidenciais para quem só dorme (superdimensionamento) e a conta chega no fim do mês.

O agente é o auditor que passa de porta em porta com o inventário na mão e anota: «este quarto está vazio, pode devolver; esta suíte pode virar um quarto simples».

---

## 🔧 Tecnicamente

### O que é
- **Custos de nuvem não são intuitivos:** VM cobra por tamanho, armazenamento e tempo ligada; Kubernetes por nós e capacidade; serverless por execuções e tempo. Entender o modelo financeiro é tão importante quanto a parte técnica.
- **Free Tier e créditos:** a AWS tem o Free Tier (limites por tipo de recurso e tempo); Google Cloud e Oracle costumam dar créditos. Em qualquer caso, configure **alertas orçamentários** para não ser surpreendido.
- **Infracost e Kubecost:** Infracost mostra o impacto financeiro de mudanças de IaC antes do apply (inclusive no code review); Kubecost foca no custo por nó e configuração de clusters Kubernetes. Os slides ilustram: o bot comenta no PR «essa mudança aumenta sua conta em $200/mês».
- **Cultura FinOps:** aproximar a responsabilidade financeira de quem cria o recurso, tratando eficiência de custo como requisito de qualidade, junto com segurança e disponibilidade.
- **Recursos zumbis:** existem e custam sem gerar valor: volumes EBS órfãos (a VM sumiu, o disco ficou), Elastic IPs não associados e snapshots antigos (sem política de retenção). Ficam silenciosos porque não causam falha.
- **Rightsizing:** usar histórico de CPU e memória para adequar o tamanho (ex.: um blog em máquina grande com 2 a 3% de CPU). **Spot**: capacidade ociosa com desconto grande, mas pode ser interrompida, então serve para lote e dev, não para produção crítica (Fargate, por outro lado, simplifica a operação a custo maior).
- **Indicação de leitura 2:** *Cloud FinOps* dá a base de negócio (rightsizing, caça a zumbis) para calibrar o agente com métricas reais.

### Como funciona
- **Agente FinOps:** «auditor financeiro de nuvem» com histórico em auditoria e otimização com recursos de baixo custo. A qualidade da instrução manda: em vez de «analise custos», peça zumbis, instâncias superdimensionadas, volumes sem uso, IPs soltos e o impacto financeiro de cada item.
- **Entrada estruturada:** um inventário, normalmente JSON (que pode vir do state do Terraform), com atributos como tipo, região, CPU, custo e associação. É um retrato da nuvem em um momento.
- **Saída esperada:** um relatório com diagnóstico, estimativa e recomendação por item (remover volume órfão, liberar IP, reduzir instância), cada um com impacto financeiro, o que facilita priorizar e comunicar com a área de negócio.
- **Estimativas são projeções:** o custo final varia com tráfego, armazenamento e transferência. Mesmo assim servem de referência para decisão.
- **Preventivo, não reativo:** em vez de descobrir o problema na fatura, o processo vira contínuo. E democratiza a análise para DevOps, SRE e devs interessados em infra.

### Onde aplicar
- Auditoria periódica de contas AWS/GCP para limpeza de zumbis em dev e homologação.
- Rightsizing por histórico de utilização com revisão humana.
- Estimativa de custo no PR de infraestrutura.

### Vantagens e limites
**Vantagens**
- Economia imediata com baixo risco (zumbis não afetam produção).
- Relatório em linguagem de negócio ajuda a justificar iniciativas.
- Funciona com qualquer fonte estruturada (JSON, state, exportação do provedor).

**Limites**
- Estimativas do LLM podem divergir do preço real do provedor.
- Rightsizing mal feito afeta desempenho; exige métricas de período longo.
- Spot não serve para cargas que não toleram interrupção.

### 🚫 Armadilhas
- Remover um recurso «órfão» sem checar dono e dependência.
- Dimensionar por um pico isolado de CPU.
- Esquecer de configurar alertas de orçamento.
- Tomar a economia estimada pelo agente como valor contratual.

> 💡 **Dica:** Peça ao agente a conta item a item (recurso, custo mensal, ação, economia) e confira você mesmo a soma: números de LLM precisam de conferência.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| FinOps | Gestão financeira de nuvem com cultura de responsabilidade |
| Recurso zumbi | Existe e cobra, mas não gera valor (EBS órfão, EIP solto, snapshot antigo) |
| Rightsizing | Ajustar o tamanho ao consumo real |
| Spot | Capacidade ociosa com desconto, interrompível |
| Free Tier / créditos | Uso gratuito limitado (AWS) / saldo promocional (GCP, Oracle) |
| Infracost | Estima custo de mudanças de IaC antes do apply |
| Kubecost | Visibilidade de custo em clusters Kubernetes |
| Alerta orçamentário | Notificação ao atingir % do orçamento |

---

## 💻 No código do repo

**Projeto:** [labs/modulo9_finops.py + data/inventario_cloud.json](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo9_finops.py)

Um agente FinOps lê `data/inventario_cloud.json` e produz um relatório com zumbis, rightsizing e economia mensal estimada em dólares.

**Fluxo**
1. `labs/modulo9_finops.py` define `analyze_cloud_costs(file_path)` (devolve o JSON do arquivo) e usa `get_finops_agent(tools=[analyze_cloud_costs])`. A Task pede zumbis (volumes disponíveis sem uso, IPs soltos), instâncias superdimensionadas e a economia total em dólares.
2. `data/inventario_cloud.json` (conta fictícia `123456789012`, `us-east-1`) tem 3 recursos: volume `vol-0a1b2c3d` (EBS 500 GB, `available`, US$ 50/mês), instância `i-99887766` (`m5.4xlarge`, CPU média 2,5%, US$ 340/mês, «Extremely overprovisioned») e `eipalloc-001122` (Elastic IP sem associação, US$ 5/mês).
3. O cálculo é feito pelo LLM: o código só entrega o dicionário ao agente.

**Como rodar**
- `python3 labs/modulo9_finops.py` (opção 9 do menu); os slides usam `./venv/bin/python3 labs/modulo9_finops.py`.

**Armadilhas e achados no código**
- O slide 9 promete «plano para economizar US$ 500/mês», mas o inventário soma apenas US$ 395/mês de custo (50 + 340 + 5): a meta não é alcançável com esses dados.
- Nenhum código soma ou valida a economia; o valor varia a cada execução e precisa ser conferido.
- Infracost, Kubecost, snapshots antigos e Spot são teoria da aula: não aparecem no inventário nem no código.
- O `.dockerignore` exclui `data/*.json`, então este lab falha dentro da imagem Docker do módulo 13 (o arquivo não é copiado).

---

## 🔗 Para ir além
- [Slides do módulo 9](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides)
- [Pasta data do módulo (inventário)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/data)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica)

---

⬅️ [07 · CI/CD Copilot: cache, multi-stage build, Canary e rollback automático](./07-cicd-copilot-cache-multistage.md)  ·  [09 · Auto-remediação segura: RAG de runbooks, postmortem automático, guardrails e dry-run](./09-runbook-rag-self-healing-guardrails.md) ➡️
