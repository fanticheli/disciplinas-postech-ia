# 11 · Dockerização: o artefato de IA imutável

> **Unidade 13 · Aulas 1 a 3** · Leitura: ~6 min · Bloco: Do Terminal ao Escalável

## 🎯 Em uma frase
Empacotar o Nexus-Bot em **Docker** dá um **artefato imutável**: mesma versão de Python, mesmas dependências e mesmo comportamento em qualquer máquina. Boas práticas: imagem enxuta (`slim`), responsabilidade única, `.dockerignore`, versionamento, cache de camadas e **credenciais fora da imagem**.

---

## 👵 Explicando para a vovó

Docker é uma marmita lacrada: tem dentro tudo o que o prato precisa, e esquenta igual em qualquer cozinha. A «imagem» é a marmita lacrada de fábrica, o «container» é ela aberta e sendo comida. Já a chave do cofre (API key) nunca vai dentro da marmita: entrega-se na hora de comer.

A receita (Dockerfile) é montada em camadas, e quem muda só a cobertura não precisa refazer o prato inteiro.

---

## 🔧 Tecnicamente

### O que é
- **VM x container:** VMs rodam um SO completo sobre um hypervisor (mais memória, armazenamento e tempo de subida). Containers compartilham o kernel do host e levam só a aplicação e suas dependências. O Docker (open source desde 2013) popularizou isso e matou o «na minha máquina funciona».
- **Imagem x container:** a imagem é o artefato imutável, uma fotografia do ambiente; o container é uma instância em execução dela. Docker Desktop traz GUI e CLI.
- **Por que no módulo:** controlar a versão do Python (diferenças de versão quebram bibliotecas), eliminar instalação manual e garantir portabilidade (local, homologação, produção, cluster, nuvem).
- **Imagens pequenas:** transferem e sobem mais rápido, ocupam menos e têm menor superfície de ataque. Variantes `slim` e `alpine`; técnicas: base enxuta, remover arquivos desnecessários e multi-stage build.
- **Responsabilidade única:** um container, uma função (ex.: WordPress em um container e o servidor web em outro). Cada imagem fica menor, componentes evoluem e escalam separadamente.
- **.dockerignore**: define o que não vai para a imagem (temporários, caches, logs, venvs); reduz tamanho e evita expor arquivos por engano.
- **Cache de camadas:** cada instrução do Dockerfile gera uma camada reaproveitada se nada mudou; uma mudança invalida as camadas seguintes, daí a ordem importar.
- **Versionamento de imagem:** use versões (semântico), não só identificadores genéricos: permite saber o que roda onde e fazer rollback.

### Como funciona
- **Receita do Dockerfile (Aula 2):** imagem base (no projeto, Python 3.12 Slim), instalar dependências do sistema para compilar, definir o diretório de trabalho, instalar as dependências Python a partir de um arquivo de requisitos, copiar o resto do código (respeitando o `.dockerignore`) e ajustar variáveis de ambiente. Instalar sem cache de pacotes (`pip --no-cache-dir`) mantém o ambiente previsível.
- **Build e conferência (Aula 3):** gerado o build, inspecione tamanho e camadas; monitorar o tamanho evita imagem inchada. Depois, rode.
- **Segredos:** API keys não ficam no código nem na imagem; entram na execução como **variáveis de ambiente**. A mesma imagem serve a vários ambientes só trocando os valores, e o comportamento no container deve ser idêntico ao local.
- **O agente no container:** o Nexus-Bot coordena SRE, Segurança e FinOps sobre o mesmo contexto e devolve um relatório unificado (o projeto integrador, em container).
- **Container de vida curta:** nem todo container é um serviço eterno; muitos fazem uma tarefa e terminam (relatórios, auditorias, análises sob demanda). Isso lembra os *jobs* de orquestradores, ótimo para agentes pontuais.

### Onde aplicar
- Empacotar agentes de IA com versões de Python e bibliotecas travadas.
- Rodar o mesmo agente local, em CI e em cluster sem reconfigurar.
- Agendar execuções sob demanda sem manter processo ativo.

### Vantagens e limites
**Vantagens**
- Reprodutibilidade e portabilidade.
- Imagem enxuta: mais rápida e menos superfície de ataque.
- Configuração separada do código via variáveis de ambiente.

**Limites**
- Cada nova funcionalidade exige novo build e nova versão da imagem.
- Dependências de IA são pesadas e podem inflar a imagem.
- Cache de camadas mal ordenado vira build lento.

### 🚫 Armadilhas
- Colocar a chave de API no Dockerfile, no código ou na imagem.
- Esquecer o `.dockerignore` e copiar `.env`, `venv` e `.git`.
- Usar só `latest` como tag e perder rastreabilidade.
- Achar que container que termina é container com erro.

> 💡 **Dica:** Copie primeiro o arquivo de dependências e instale; copie o código depois. Assim a camada pesada só é refeita quando as dependências mudam.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Imagem | Artefato imutável com app, dependências e configuração |
| Container | Instância em execução de uma imagem |
| Dockerfile | Receita passo a passo para construir a imagem |
| Slim / Alpine | Variantes enxutas de imagens base |
| Camada | Resultado de cada instrução; reaproveitável via cache |
| Multi-stage build | Separa o build do estágio final menor |
| Variável de ambiente | Forma de injetar segredo/configuração em runtime |
| Responsabilidade única | Um container, uma função |

---

## 💻 No código do repo

**Projeto:** [Dockerfile + .dockerignore + requirements.txt](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/Dockerfile)

A imagem `nexus-bot:v1`: Python 3.12 Slim com compilador, dependências do `requirements.txt`, código copiado e o projeto integrador como comando padrão.

**Fluxo**
1. `Dockerfile`: `FROM python:3.12-slim`; `apt-get install -y build-essential curl` (para compilar, como o tiktoken/PyO3, segundo o comentário do arquivo); `WORKDIR /app`; `COPY requirements.txt .` + `pip install --no-cache-dir -r requirements.txt` antes de `COPY . .` para aproveitar o cache; `ENV OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES` (fork no macOS/Docker) e `ENV PYTHONPATH=/app`; `CMD ["python", "labs/modulo12_projeto_final.py"]`.
2. `.dockerignore`: `venv/`, `.env`, `__pycache__/`, `*.pyc`, `.git/` e `data/*.json`.
3. `requirements.txt`: `crewai==1.14.4` e `crewai[tools]==1.14.4` fixados; `langchain-groq`, `python-dotenv`, `streamlit`, `checkov<3.0.0`, `kubernetes`, `pandas`, `numpy` e `litellm` sem versão.

**Como rodar**
- `docker build -t nexus-bot:v1 .` e `docker run --rm -e GROQ_API_KEY="..." nexus-bot:v1` (slide 13.1).
- Para o Kubernetes local, o build é feito no daemon do Minikube (próximo tópico).

**Armadilhas e achados no código**
- `data/*.json` está no `.dockerignore`: dentro da imagem não existem `trivy.json` nem `inventario_cloud.json`, então os labs 7 e 9 falhariam no container. O `CMD` roda só o lab 12, que não os usa.
- Imagem de um estágio só: `build-essential` e `curl` ficam na imagem final, o contrário do multi-stage ensinado na unidade 8. Também roda como root (não há `USER`).
- O README recomenda Python 3.10 a 3.13, e a imagem fixa 3.12; os slides justificam o Docker para evitar o 3.14.
- Só o `crewai` está fixado; as demais dependências (inclusive `litellm`) flutuam entre builds. `boto3`, usado por `ui/app.py`, não está listado (provavelmente transitivo de `crewai[tools]`; não verifiquei).
- O `.dockerignore` não exclui `slides/`, `k8s/` nem `k8s/secret.yml`: tudo vai para a imagem.

---

## 🔗 Para ir além
- [Slides do módulo 13.1](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides)
- [Dockerfile do módulo](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/Dockerfile)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica)

---

⬅️ [10 · Projeto integrador: orquestração hierárquica, Game Day e ROI](./10-multi-agent-hierarchy-final-project.md)  ·  [12 · Kubernetes local com Minikube: componentes, escala, Secrets e Jobs](./12-kubernetes-local-minikube.md) ➡️
