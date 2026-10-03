# 13 · Cloud simulada e interface: LocalStack e Streamlit dentro do Kubernetes

> **Unidade 13 · Aulas 6 a 9** · Leitura: ~8 min · Bloco: Do Terminal ao Escalável

## 🎯 Em uma frase
O **LocalStack** emula serviços da AWS (S3, SQS, IAM) dentro do cluster: custo zero, sem credenciais reais e com o mesmo contrato de API. A aplicação troca de ambiente **só por configuração (endpoint)**. Em cima disso, um painel **Streamlit** em Deployment próprio, exposto por `LoadBalancer`, lê os buckets via **Boto3**.

---

## 👵 Explicando para a vovó

É como ensaiar o show num palco de papelão idêntico ao palco real: mesmas marcações, mesmos equipamentos, mas se cair não custa nada. Quando a banda sobe no palco de verdade, só muda o endereço do teatro.

E o Streamlit é a vitrine: em vez de todo mundo precisar de terminal para saber o que há no palco, um painel mostra os buckets com um clique.

---

## 🔧 Tecnicamente

### O que é
- **Por que simular nuvem:** usar a AWS de verdade em desenvolvimento gera custo, exige credenciais, limites de uso, acesso e conexão. O LocalStack permite criar buckets S3, filas SQS e identidades IAM localmente, e os conceitos valem para qualquer provedor (AWS, GCP, Azure).
- **Cloud native:** a aplicação deixa de depender de arquivos locais e fala com serviços via API. Rodando o LocalStack dentro do cluster, valida-se um fluxo próximo da realidade.
- **Fidelidade e limites:** nomes, comandos e eventos seguem a AWS, mas um ambiente local nunca reproduz tudo. A versão usada deve ser fixada para ficar na edição comunitária (gratuita).
- **Service e Deployment:** o Service expõe o LocalStack (porta 4566) com um nome estável de DNS interno; o Deployment mantém os Pods.
- **Troca de ambiente por configuração:** o código chama serviços «equivalentes à AWS»; só o endpoint muda (LocalStack no cluster, AWS real em produção). Credenciais ainda são exigidas pelo SDK, e as dos exemplos são educacionais.
- **Streamlit:** interface web só com Python, no mesmo ecossistema dos agentes. Roda como serviço independente (separação de responsabilidades: LocalStack simula nuvem, agentes analisam, Streamlit visualiza), exposto com `Service` do tipo `LoadBalancer`.
- **Deployment → ReplicaSet → Pods → Service:** o Deployment define o desejado, o ReplicaSet garante réplicas, os Pods executam e o Service é o ponto de acesso estável (Pods são efêmeros).
- **Limites de CPU/memória:** mesmo um app simples consome recursos, e um cluster local é pequeno; limites protegem a estabilidade e aproximam do que governança faz em produção.

### Como funciona
- **Validação (Aula 7):** em vez de só ver o Pod «Running», execute comandos dentro dele (`kubectl exec`) com ferramentas compatíveis: listar buckets, criar um bucket, enviar um arquivo e listar objetos. Isso testa conectividade, criação de recursos e consulta.
- **Integração dos agentes:** o Job dos agentes recebe, por variável de ambiente, o endpoint do LocalStack. Para provar que a conexão funciona, um **Job extra** só de teste conecta e lista os buckets; a resposta traz códigos de retorno, metadados e os buckets criados. O Kube Proxy cuida do roteamento interno.
- **Painel (Aulas 8 e 9):** o app usa Boto3 apontando para o endpoint do LocalStack e lista os buckets. Ele foi para uma imagem nova (rebuild) e um Deployment novo, com Service `LoadBalancer`.
- **Acesso local:** no Minikube, o LoadBalancer vira um túnel (algo como port-forward): a porta da app, a porta do Service e o encaminhamento interno são camadas diferentes para evitar conflitos.
- **Prova de tempo real:** cria-se um bucket por fora (ferramentas administrativas) e uma nova consulta no painel já o mostra: a UI lê o estado atual da infraestrutura. Ideias de extensão: custos, incidentes ativos, vulnerabilidades, análises FinOps, auditorias de conformidade.

### Onde aplicar
- Testar integrações com S3/SQS/IAM em CI e em cluster local sem custo.
- Painéis internos em Python para dar visibilidade a agentes e recursos.
- Desenvolver contra uma API compatível e migrar de provedor por configuração.

### Vantagens e limites
**Vantagens**
- Zero custo e zero risco de mexer em conta real.
- Código portável: só o endpoint muda.
- Painel em Python reaproveita o ecossistema dos agentes.

**Limites**
- A emulação não cobre todo o comportamento do provedor.
- Imagem do LocalStack e do app consomem memória do cluster local.
- Credenciais «de mentira» nos manifestos não podem virar hábito.

### 🚫 Armadilhas
- Usar a tag `latest` do LocalStack e cair em recursos de plano pago.
- Escrever Access Key/Secret Key reais em manifestos (use Secrets).
- Validar só que o Pod está ativo, sem testar uma operação real.
- Expor a UI sem limites de recursos.

> 💡 **Dica:** Teste a conectividade com um Job descartável: ele usa o mesmo endpoint, as mesmas variáveis e a mesma rede dos Pods reais, e deixa evidência nos logs.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| LocalStack | Emulador local de serviços AWS (S3, SQS, IAM...) |
| Endpoint | Endereço da API; troca de ambiente por config |
| Cloud native | App que usa serviços via API em vez de recursos locais |
| Boto3 | SDK Python da AWS |
| kubectl exec | Executar comando dentro de um Pod |
| Streamlit | Interface web em Python |
| Service LoadBalancer | Ponto de entrada estável (túnel no Minikube) |
| ReplicaSet | Garante o número de réplicas do Deployment |

---

## 💻 No código do repo

**Projeto:** [k8s/localstack.yml + k8s/connect-test.yaml + k8s/streamlit.yaml + ui/app.py](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/ui)

A cloud simulada (LocalStack), o Job de teste de conectividade e o painel Streamlit (explorador de buckets S3 e sandbox de políticas OPA).

**Fluxo**
1. `k8s/localstack.yml`: Service `localstack` (porta 4566) e Deployment com `localstack/localstack:3.0`, `SERVICES=s3,sqs,iam`, `DEBUG=1`, `ACTIVATE_PRO=0` e limites de 512Mi/500m. O comentário explica que fixar a versão evita o check de licença Pro.
2. `k8s/connect-test.yaml`: Job `nexus-conn-test` com a imagem `nexus-bot:v1` que executa `python -c` com `boto3` e imprime `list_buckets()` no endpoint `http://localstack:4566` (credenciais `test`/`test`), `restartPolicy: Never`.
3. `k8s/streamlit.yaml`: Service `nexus-ui` (`LoadBalancer`, 8501) e Deployment com a mesma imagem e o comando `streamlit run ui/app.py --server.port=8501 --server.address=0.0.0.0`, `AWS_ENDPOINT_URL` apontando para o LocalStack e limites 256Mi/200m.
4. `ui/app.py`: cria o cliente S3 com `endpoint_url` vindo de `AWS_ENDPOINT_URL` (padrão `http://localhost:4566`). Três abas: visão geral dos agentes (cartões), **explorador de buckets** (listar, criar, atualizar) e **sandbox OPA** que chama `validate_opa_policies` sobre o código colado (exemplo com `t3.large`, que é rejeitado).

**Como rodar**
- `kubectl apply -f k8s/localstack.yml` e `kubectl get pods -l app=localstack`; testes: `kubectl exec -it deployment/localstack -- awslocal s3 ls` (e `awslocal s3 mb s3://nexus-logs`).
- `kubectl apply -f k8s/connect-test.yaml` e olhe os logs do Job; depois `kubectl apply -f k8s/streamlit.yaml` e `minikube service nexus-ui` (slide 13.4).
- Fora do cluster: `streamlit run ui/app.py` (opção D do menu) com o LocalStack em `localhost:4566`.

**Armadilhas e achados no código**
- Os slides citam `k8s/localstack.yaml` com `image: localstack/localstack:latest`; no repositório o arquivo é `localstack.yml` e a imagem é a `3.0` com `ACTIVATE_PRO=0`.
- A apostila apresenta os agentes consumindo S3 do LocalStack, mas nenhum lab usa `boto3`: o `AWS_ENDPOINT_URL` do `job.yaml` não é lido. Só `connect-test.yaml` e `ui/app.py` falam com o LocalStack.
- O slide 13.4 diz que o Streamlit lê «relatórios que o Nexus-Job salvou no S3», mas nada no código grava relatórios no S3.
- `ui/app.py` ignora as variáveis `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY` do manifesto e fixa `mock_key`/`mock_secret`; se `RUNNING_IN_DOCKER` estiver definida, força `http://localstack:4566` e descarta `AWS_ENDPOINT_URL`.
- A barra lateral e o README dizem «11 agentes»; são 12 fábricas em `agents.py` e a aba mostra 8 cartões.
- O painel chama `validate_opa_policies(code_input)`, função decorada com `@tool` do CrewAI; não verifiquei se esse objeto é chamável diretamente na versão fixada (CrewAI não está instalado aqui). O Pod do painel tem só 256Mi e importa o CrewAI via `tools.security_scan` (hipótese de risco de OOM).
- A lista de serviços do slide 13.3 inclui DynamoDB, mas o manifesto habilita só `s3,sqs,iam`.

---

## 🔗 Para ir além
- [LocalStack](https://www.localstack.cloud/)
- [Streamlit](https://streamlit.io/)
- [Slides 13.3 e 13.4](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides)
- [Manifestos k8s](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/k8s)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica)

---

⬅️ [12 · Kubernetes local com Minikube: componentes, escala, Secrets e Jobs](./12-kubernetes-local-minikube.md)  ·  [14 · IA offline com Ollama no Kubernetes (e um passeio pelo dashboard do Minikube)](./14-offline-ai-ollama-on-kubernetes.md) ➡️
