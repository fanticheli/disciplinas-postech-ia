# 07 · CI/CD Copilot: cache, multi-stage build, Canary e rollback automático

> **Unidade 8 · Aulas 1 a 4** · Leitura: ~6 min · Bloco: Entrega, Custo e Auto-remediação

## 🎯 Em uma frase
Pipelines rígidas rodam tudo a cada commit e queimam tempo de runner. O **CI/CD Copilot** revisa o workflow do GitHub Actions, encontra o gargalo (sem **cache** de dependências) e propõe a versão otimizada; o módulo também cobre **multi-stage build**, **Canary** e **rollback pós-deploy**.

---

## 👵 Explicando para a vovó

Toda manhã você sai de casa e, em vez de pegar o café já moído do dia anterior, planta o cafezal de novo. É isso que uma pipeline sem cache faz: baixa todas as dependências do zero em cada execução. O cache é guardar o café moído e só preparar outro se a receita (o lockfile) mudou.

Já o multi-stage build é cozinhar numa cozinha cheia de panelas e entregar só o prato pronto, sem levar a bagunça junto.

---

## 🔧 Tecnicamente

### O que é
- **Pipeline adaptativa:** em vez de executar sempre o mesmo fluxo, o agente olha os arquivos alterados e decide quais testes, validações ou builds são necessários, dando feedback mais rápido e gastando menos infraestrutura.
- **Gargalos comuns:** camadas Docker mal estruturadas, ausência de cache e uso ineficiente do gerenciador de dependências (o clássico `node_modules` reinstalado). O mesmo vale para pip (Python) e Go.
- **Runners e custo:** cada minuto de runner (GitHub-hosted ou self-hosted) tem custo. Pipeline mais rápida é também eficiência financeira e ROI.
- **Multi-stage build:** um container deve ter uma única responsabilidade e conter só o necessário. O build usa um estágio completo (compiladores, ferramentas) e o estágio final, menor (ex.: Alpine), recebe só o artefato. Resultado: imagem menor, deploy mais rápido, menor superfície de ataque.
- **Cache no GitHub Actions:** reutiliza o que foi baixado em execuções anteriores. A **chave de cache** deriva do lockfile (muda o lockfile, muda a chave, invalida o cache) e as **chaves de restauração** funcionam como plano B para achar uma versão compatível.
- **Qualidade e rollback:** o «deploy de sexta» divide opiniões, mas com testes, observabilidade e recuperação robustos não deveria haver diferença entre segunda e sexta. A **inteligência pós-deploy** monitora erro e latência nos primeiros minutos e, se a taxa de erro (ex.: HTTP 500) sobe, pode reverter via API do GitHub Actions, GitLab CI etc.
- **Canary:** a mesma ideia do módulo 3, agora como proteção da entrega: poucos usuários primeiro, métricas observadas, e reversão automática ao primeiro comportamento anômalo.

### Como funciona
- **Agente:** engenheiro de plataforma com «aversão ao desperdício de tempo de runner»; conhece cache avançado, multi-stage e Canary. Além de acelerar, deve manter rollback funcional e não comprometer a segurança do processo.
- **Workflow-alvo:** um workflow Node.js propositalmente ineficiente (Ubuntu; instalar dependências, build, testes) com um comentário apontando a falta de cache. A pipeline do microserviço Checkout leva ~10 min; a meta é reduzir cerca de 60%.
- **Análise e reescrita:** o agente identifica que tudo é baixado a cada execução, reescreve o trecho com o cache do GitHub Actions baseado no lockfile e estima **2 a 5 minutos** de economia por execução, dependendo do projeto.
- **Sugestão, não commit:** o agente devolve uma proposta estruturada, sem alterar o arquivo. Na aula a sugestão foi refinada com outra ferramenta de IA para o formato YAML correto, prática comum de iterar sobre a saída do modelo.
- **Equivalência funcional:** a pipeline otimizada faz o mesmo (instala, compila, testa); só desperdiça menos. Otimizar não significa reduzir a qualidade das validações.

### Onde aplicar
- Revisão automática de workflows para achar cache ausente e jobs redundantes.
- Dockerfiles multi-stage em imagens com compilação.
- Rollback automático baseado em taxa de erro após o deploy.

### Vantagens e limites
**Vantagens**
- Feedback mais rápido para devs e menor custo de runner.
- Padrões de otimização aplicados de forma consistente.
- A mesma análise vale para vários repositórios.

**Limites**
- O ganho depende de projeto, dependências e infraestrutura; a estimativa é aproximada.
- Cache mal configurado pode servir dependência desatualizada.
- Rollback automático exige métricas confiáveis e guardrails (módulo 11).

### 🚫 Armadilhas
- Cachear sem chave derivada do lockfile (ou com chave que nunca muda).
- Aplicar a sugestão da IA sem validar o YAML.
- Confundir cache do Docker (camadas) com cache de dependências do CI.
- Otimizar a pipeline cortando testes necessários.

> 💡 **Dica:** Derive a chave de cache do lockfile e mantenha uma chave de restauração mais genérica: o primeiro garante correção, o segundo evita perder todo o cache numa pequena mudança.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Runner | Ambiente que executa os jobs do CI (GitHub-hosted ou self-hosted) |
| Cache de dependências | Reutiliza pacotes baixados entre execuções |
| Chave de cache | Identificador derivado do lockfile que decide reuso/invalidação |
| Multi-stage build | Estágio de build completo + estágio final enxuto |
| Canary | Liberação gradual com rollback ao detectar anomalia |
| Pipeline adaptativa | Executa só o que a mudança exige |
| Pós-deploy | Monitoramento automático logo após a implantação |

---

## 💻 No código do repo

**Projeto:** [labs/modulo8_cicd.py + data/workflow_lento.yaml + data/workflow_rapido.yaml](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo8_cicd.py)

O agente lê `data/workflow_lento.yaml`, aponta a falta de cache e propõe a reescrita para Node.js; `workflow_rapido.yaml` é a versão otimizada de referência.

**Fluxo**
1. `labs/modulo8_cicd.py` define a ferramenta `analyze_workflow_yaml(file_path)` (devolve o conteúdo do arquivo) e usa `get_cicd_agent(tools=[analyze_workflow_yaml])`. O caminho de `data/workflow_lento.yaml` é montado a partir de `PROJECT_ROOT` e vai na Task.
2. A Task pede identificar a lentidão («dica: falta de cache»), reescrever o trecho com as boas práticas de cache para Node.js e explicar a economia estimada.
3. `data/workflow_lento.yaml`: job `build` em `ubuntu-latest` com `actions/checkout@v4`, `npm install` (comentário «ERRO: Sem cache»), `npm run build` e `npm test`.
4. `data/workflow_rapido.yaml`: acrescenta `actions/cache@v3` com `path: ~/.npm`, `key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}` e `restore-keys` genérico, seguido dos mesmos passos.

**Como rodar**
- `python3 labs/modulo8_cicd.py` (opção 8 do menu); os slides usam `./venv/bin/python3 labs/modulo8_cicd.py`.
- Compare a sugestão do agente com `data/workflow_rapido.yaml`.

**Armadilhas e achados no código**
- O agente só sugere: nenhum código grava o YAML otimizado nem mede o ganho. As cifras (2 a 5 min, ~60%) vêm da fala da aula e da estimativa do LLM.
- `workflow_rapido.yaml` declara `id: cache` sem usar a saída `steps.cache.outputs`, e continua com `npm install` (não `npm ci`). A chave depende de `package-lock.json`; sem esse arquivo o cache nunca valida.
- O Dockerfile do módulo (módulo 13) é de um único estágio, apesar de a unidade ensinar multi-stage.
- Rollback automático, pipeline adaptativa e Canary são só teoria: o repositório não tem código para isso neste módulo.

---

## 🔗 Para ir além
- [GitHub Actions](https://docs.github.com/actions)
- [Slides do módulo 8](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica)

---

⬅️ [06 · DevSecOps com IA: triagem de vulnerabilidades, CVE-2024-3094 e Compliance as Code](./06-devsecops-vulnerability-triage.md)  ·  [08 · FinOps com IA: recursos zumbis, rightsizing, Spot e relatório de economia](./08-finops-zombie-resources-rightsizing.md) ➡️
