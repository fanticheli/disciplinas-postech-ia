# 14 · IA offline com Ollama no Kubernetes (e um passeio pelo dashboard do Minikube)

> **Unidade 13 · Aulas 10 e 11** · Leitura: ~7 min · Bloco: Do Terminal ao Escalável

## 🎯 Em uma frase
Agentes e multiagentes consomem **muitos tokens**, e APIs externas têm limite e custo. Rodar um modelo **local com Ollama** no cluster elimina a cobrança por token e mantém os dados dentro da infra (privacidade, offline), mas **transfere o custo para CPU, RAM e disco**: no laboratório o Pod ficou `Pending` por falta de recurso.

---

## 👵 Explicando para a vovó

Usar uma API de IA é pedir comida por delivery: prático, mas cada pedido custa, há limite por dia e a comida (seus dados) passa pela casa de outras pessoas. Rodar o modelo local é ter uma cozinha própria: ninguém cobra por prato e nada sai de casa, mas você precisa de fogão grande e despensa cheia.

A cozinha da aula (o Minikube de um nó só) era pequena demais para o fogão grande, e o Pod esperou na fila para sempre.

---

## 🔧 Tecnicamente

### O que é
- **Tokens:** unidade de medida do que o modelo processa. Toda pergunta e toda resposta consomem tokens; prompts e respostas complexas consomem mais. Planos gratuitos ou básicos têm limites restritivos e mesmo planos pagos têm limites operacionais.
- **Agentes multiplicam o consumo:** cada tarefa envolve ferramentas, raciocínio intermediário e validações; num multiagente, o gestor consulta vários especialistas e consolida. Em volume alto, o custo vira fator de arquitetura.
- **Vantagens do modelo local:** sem cobrança por token e sem limite de plano, **privacidade** (setores com dados financeiros, médicos, propriedade intelectual), menos dependência de conectividade e de disponibilidade de provedores.
- **Ollama:** simplifica baixar, instalar e executar modelos abertos localmente, com suporte a vários modelos e documentação para Python e JavaScript. O modelo da aula é o **Llama 3.1**. Todo modelo é um trade-off: maiores respondem melhor e exigem mais recursos.
- **Infra importa:** modelos continuam sendo cargas intensivas; num Minikube que divide recursos com a sua máquina, limites baixos impedem iniciar. Reserve CPU e memória adequadas sem sufocar o sistema.
- **Agentes agnósticos de provedor:** a arquitetura permite trocar entre OpenAI, Gemini, Grok, Claude e Ollama. Também dá para **coexistir**: dados sensíveis processados localmente, demandas mais sofisticadas em provedor externo.
- **Dashboard do Minikube (Aula 11):** visão gráfica de Deployments, Services, Jobs, DaemonSets, Secrets, ConfigMaps, Roles/ClusterRoles/RoleBindings (controle de acesso) e namespaces (segmentação lógica). Falhas aparecem em destaque.
- **Service x Ingress:** o Service dá conectividade e roteamento básico; o Ingress opera acima, com rotas por URL, regras de acesso, TLS e um ponto de entrada para várias apps (o Ingress NGINX foi o padrão por muito tempo). **ConfigMap** guarda configuração não sensível; **Secret**, dados críticos.

### Como funciona
- **Implantação:** um Service expõe o modelo numa porta, um Deployment mantém o container do Ollama. Do ponto de vista arquitetural é como qualquer outra app.
- **O que aconteceu na aula:** mesmo com a configuração correta, o Pod ficou **pendente**: o cluster tinha um único nó compartilhando recursos com a estação de trabalho, e só baixar o modelo já exigia vários gigabytes, além da memória para carregá-lo.
- **A moral:** eliminar a dependência de APIs externas passa a responsabilidade de processamento para a sua infraestrutura; é por isso que muitas empresas usam servidores especializados para hospedar modelos.
- **Integração (se houvesse recurso):** os agentes passariam a chamar o endpoint do Ollama no cluster, com a mesma lógica das integrações anteriores, trocando só o provedor.

### Onde aplicar
- Processar localmente código, configurações e dados sensíveis que não podem sair da empresa.
- Desenvolvimento e testes de agentes sem gastar tokens ou bater em rate limit.
- Operar com conectividade limitada.

### Vantagens e limites
**Vantagens**
- Sem custo por token nem limites de plano.
- Privacidade e controle sobre os dados.
- Funciona sem depender de provedor externo.

**Limites**
- Exige CPU, RAM e disco consideráveis; clusters locais pequenos não aguentam.
- Modelos locais menores podem ser inferiores em tarefas complexas.
- Operação, atualização e capacidade passam a ser sua responsabilidade.

### 🚫 Armadilhas
- Achar que «de graça» significa «sem custo»: o custo vira infraestrutura.
- Definir limites de recurso baixos e culpar o manifesto quando o Pod não sobe.
- Esquecer de planejar armazenamento para os pesos do modelo.
- Trocar todo o uso por local e perder qualidade onde um modelo maior fazia falta.

> 💡 **Dica:** Combine: modelo local para o que é sensível ou em alto volume, API externa para o que exige o melhor modelo. Decida por dado, custo e qualidade, não por ideologia.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Token | Unidade de texto processada e cobrada pelo provedor |
| Rate limit | Limite de requisições/tokens por plano |
| Ollama | Plataforma para rodar modelos abertos localmente |
| Llama 3.1 | Modelo aberto usado na aula |
| Pending | Pod aguardando recurso para ser agendado |
| Ingress | Roteamento HTTP por URL/TLS acima do Service |
| ConfigMap / Secret | Configuração comum / dado sensível |
| Namespace | Segmentação lógica do cluster |

---

## 💻 No código do repo

**Projeto:** [k8s/ollama.yaml](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/k8s/ollama.yaml)

Service e Deployment que sobem o Ollama no cluster na porta 11434.

**Fluxo**
1. `k8s/ollama.yaml`: Service `ollama` (porta `11434`) e Deployment com `ollama/ollama:latest`, 1 réplica.
2. O bloco `resources` do container repete a chave `limits`: primeiro `memory: "1536Mi"` e `cpu: "500m"` (comentário «LLMs precisam de mais RAM»), depois `memory: "2Gi"` e `cpu: "1"` (comentário «O máximo que ele pode roubar»). Não há `requests`.
3. Os slides do módulo 13.5 sugerem: `kubectl apply -f k8s/ollama.yaml`, `kubectl exec -it deployment/ollama -- ollama run llama3.1` e, para testar de outro Pod, `curl http://ollama:11434/api/tags`.

**Como rodar**
- `kubectl apply -f k8s/ollama.yaml` num Minikube com memória e CPU reservadas (por exemplo, iniciar o cluster com mais recursos) e depois baixar o modelo dentro do Pod.
- Em máquina pequena, espere o estado `Pending` da aula.

**Armadilhas e achados no código**
- **Chave `limits` duplicada** em `resources`: dependendo do parser, a última (2Gi e 1 CPU) vence ou o apply reclama; não executei. Como só há `limits`, o request vira igual ao limite, o que explica (hipótese) o Pod `Pending` num nó pequeno.
- Os slides dão `memory: 4Gi` e `cpu: 2` para o Ollama; o manifesto do repositório tem outros valores.
- O manifesto não monta volume: o modelo baixado deve se perder se o Pod for recriado (inferência, não testei).
- Nenhum código do módulo usa Ollama: `core/llm_config.py` está fixo em `groq/llama-3.1-8b-instant`. Os slides dizem «mudamos apenas o `base_url`», mas essa troca não existe no repositório.
- O slide usa `llama3.1:8b` na explicação e `ollama run llama3.1` no comando.

---

## 🔗 Para ir além
- [Ollama](https://ollama.com/)
- [Slides do módulo 13.5](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides)
- [Manifestos k8s](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/k8s)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica)

---

⬅️ [13 · Cloud simulada e interface: LocalStack e Streamlit dentro do Kubernetes](./13-localstack-streamlit-on-kubernetes.md)  ·  [15 · O que podemos fazer com IA em DevOps: tendências, carreira e revisão final](./15-what-can-we-do-with-ai-in-devops.md) ➡️
