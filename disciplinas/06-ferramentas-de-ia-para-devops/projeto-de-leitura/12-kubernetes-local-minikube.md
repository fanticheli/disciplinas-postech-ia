# 12 · Kubernetes local com Minikube: componentes, escala, Secrets e Jobs

> **Unidade 13 · Aulas 4 e 5** · Leitura: ~7 min · Bloco: Do Terminal ao Escalável

## 🎯 Em uma frase
O **Kubernetes** resolve a orquestração (escala, resiliência, estado desejado) que o Docker não resolve. O **Minikube** traz um cluster completo ao seu computador; o Nexus-Bot sobe com **Secret** para a chave de API e, por terminar a tarefa e sair, precisa ser tratado como **Job** e não como serviço eterno.

---

## 👵 Explicando para a vovó

Se Docker é a marmita, Kubernetes é a cozinha industrial: decide em qual bancada cada marmita é preparada, chama mais cozinheiros no horário de pico e manda embora quando esvazia, e se um cozinheiro passa mal, coloca outro no lugar sem ninguém perceber.

O Minikube é uma cozinha de brinquedo em casa, completa o suficiente para ensaiar tudo sem alugar um restaurante (nuvem).

---

## 🔧 Tecnicamente

### O que é
- **Orquestração:** o Docker Swarm perdeu espaço e o Kubernetes virou padrão (EKS, GKE e AKS são Kubernetes gerenciado). Exemplo clássico: Black Friday, quando é preciso subir e descer capacidade dinamicamente.
- **Hierarquia:** cluster contém **nós**; nós contêm **Pods** (menor unidade de execução); Pods contêm containers. Um Pod pode ter mais de um container, como no padrão **Sidecar** (container auxiliar de observabilidade, por exemplo).
- **Componentes:** **Kubelet** (monitora nós/pods), **Kube Proxy** (roteia tráfego interno), **Scheduler** (decide em qual nó cada Pod roda, por CPU, memória, afinidade e regras), **etcd** (base distribuída com o estado do cluster), **API Server** e componentes de integração com a nuvem (balanceadores, rede, discos).
- **Escalabilidade:** **HPA** (Horizontal Pod Autoscaling) muda a quantidade de Pods; **VPA** (Vertical) muda CPU/memória de cada Pod. Podem coexistir, dependendo da arquitetura.
- **Minikube:** distribuição simplificada para estudo e testes, sem custo de nuvem, bem integrada ao Docker; as imagens construídas podem rodar como em ambiente corporativo.
- **Secrets:** guardam tokens, senhas e chaves fora da imagem. Nos exemplos locais, os valores foram só convertidos para **Base64**, que *não é criptografia*: aceitável em demo, inaceitável em produção, onde se usam soluções de segredos.
- **Deployment:** declara o estado desejado (réplicas, imagem). Se um Pod falha, é recriado.
- **Workload transitório:** um agente que roda, gera um relatório e encerra faz o Pod terminar; sob Deployment, o Kubernetes pode reiniciá-lo em loop e mostrar `CrashLoopBackOff`, mesmo sem erro real. A leitura correta depende do tipo de workload.

### Como funciona
- **Subir o cluster:** `minikube start` com driver Docker. O Kubelet e o API Server precisam estar saudáveis, e o **kubeconfig** é a ponte entre sua máquina e a API do cluster (autenticação e comunicação).
- **Imagem dentro do cluster:** em vez de publicar em um registry (Docker Hub, Amazon ECR, Google Artifact Registry), constrói-se a imagem direto no ambiente Docker do Minikube. Cada mudança no app pede novo build ali.
- **Credenciais:** a imagem fica genérica; a chave entra via Secret, associada ao Pod por variável de ambiente. A mesma imagem serve a dev, homologação e produção, mudando só o Secret.
- **Deploy:** o Deployment declara o desejado e o cluster mantém. Se o container termina (o agente concluiu o trabalho), o Pod sai e o controlador pode entender como falha.
- **Qual objeto usar:** para tarefas que terminam, um **Job** com política de reinício adequada (só em falha real) é a forma correta de representar o agente.

### Onde aplicar
- Ensaiar manifestos, Secrets e limites localmente antes de ir para um cluster gerenciado.
- Rodar agentes de IA como Jobs agendados ou disparados por evento.
- Validar HPA/limites de recursos de cargas de IA sem custo de nuvem.

### Vantagens e limites
**Vantagens**
- Ambiente próximo de produção sem custo de nuvem.
- Estado declarativo: o cluster corrige desvios sozinho.
- Mesma imagem do Docker roda sem alterações.

**Limites**
- Cluster local tem capacidade limitada e compartilha recursos com a sua máquina.
- Mais peças (Secrets, Deployments, Services, probes) aumentam a curva de aprendizado.
- Base64 passa falsa sensação de segurança.

### 🚫 Armadilhas
- Achar que Base64 protege o segredo.
- Rodar agente de tarefa única como Deployment e interpretar o loop como bug.
- Esquecer de definir limites de recursos e travar a máquina local.
- Usar imagem local sem política de pull adequada e ver o cluster tentar baixar da internet.

> 💡 **Dica:** Se o Pod do seu agente aparece em `CrashLoopBackOff` mas o log mostra que ele terminou o relatório, o problema não é o código: é usar Deployment onde cabia um Job.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Pod | Menor unidade de execução; contém containers |
| Kubelet / Kube Proxy | Agente de nó / roteamento de tráfego interno |
| Scheduler | Decide em qual nó cada Pod roda |
| etcd | Base distribuída com o estado do cluster |
| HPA / VPA | Escala horizontal (réplicas) / vertical (recursos) |
| Minikube | Cluster Kubernetes local para estudo |
| kubeconfig | Credenciais e endereço do cluster para o kubectl |
| Secret | Recurso para dados sensíveis (Base64 não é criptografia) |
| Deployment x Job | Serviço contínuo x tarefa que termina |

---

## 💻 No código do repo

**Projeto:** [k8s/deploy.yml + k8s/job.yaml + k8s/secret.yml](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/k8s)

Três manifestos que levam o Nexus-Bot ao Minikube: o Secret com a chave Groq, um Deployment (que acaba em loop porque o app termina) e o Job que corrige isso.

**Fluxo**
1. `k8s/secret.yml`: Secret `nexus-secrets` do tipo `Opaque` com a chave `GROQ_API_KEY`. O valor commitado é o Base64 de `insira_sua_chave_aqui` (placeholder); o comentário instrui `echo -n "gsk_..." | base64`.
2. `k8s/deploy.yml`: Deployment `nexus-bot`, 1 réplica, imagem `nexus-bot:v1` com `imagePullPolicy: Never` (o Minikube não busca na internet), limites `512Mi`/`500m` e requests `256Mi`/`250m`, `GROQ_API_KEY` vinda do Secret e as variáveis `OBJC_DISABLE_INITIALIZE_FORK_SAFETY`, `PYTHONPATH` e `PYTHONUNBUFFERED`.
3. `k8s/job.yaml`: Job `nexus-bot-run`, mesma imagem e mesmo Secret, mais `AWS_ENDPOINT_URL=http://localstack:4566` e `restartPolicy: OnFailure` («só reinicia se der erro real, não se completar»).

**Como rodar**
- `minikube start --driver=docker`, `eval $(minikube docker-env)`, `docker build -t nexus-bot:v1 .` (slide 13.2).
- `kubectl apply -f k8s/secret.yml` (com a chave real em Base64, sem commitar), depois `kubectl apply -f k8s/job.yaml` e `kubectl logs job/nexus-bot-run`.

**Armadilhas e achados no código**
- Aplicar `deploy.yml` reproduz o que a Aula 5 explica: o container termina, o Deployment o reinicia e o Pod passa por `Completed`/`CrashLoopBackOff`. O `job.yaml` é a correção.
- O README manda aplicar `k8s/deploy.yml` no Módulo 4 para «simular a quebra com imagem errada», mas esse manifesto não tem imagem errada: ele é o Nexus-Bot válido.
- Os slides citam `k8s/secrets.yaml`; o arquivo do repositório é `k8s/secret.yml`. Nunca commite a chave real no lugar do placeholder.
- O `AWS_ENDPOINT_URL` do Job não é lido por nenhum código do lab 12 (só `ui/app.py` usa `boto3`).
- Limite de memória de 512Mi para um app com CrewAI pode ser apertado; é uma hipótese, não testei.

---

## 🔗 Para ir além
- [Kubernetes](https://kubernetes.io/)
- [Slides do módulo 13.2](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides)
- [Manifestos k8s do módulo](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/k8s)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica)

---

⬅️ [11 · Dockerização: o artefato de IA imutável](./11-docker-immutable-ai-artifact.md)  ·  [13 · Cloud simulada e interface: LocalStack e Streamlit dentro do Kubernetes](./13-localstack-streamlit-on-kubernetes.md) ➡️
