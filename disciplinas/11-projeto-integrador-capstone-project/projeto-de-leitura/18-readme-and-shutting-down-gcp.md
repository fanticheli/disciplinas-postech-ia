# 18 · README com Mermaid e desligando o ambiente pelo Console do GCP

> **Unidade 5 · Aula 24 e fechamento** · Leitura: ~9 min · Bloco: Unidade 5 · Observabilidade e produção

## 🎯 Em uma frase
O README do projeto traz visão geral, **disclaimer regulatório** e três diagramas **Mermaid** (infra, grafo do agente, deploy canary): texto que o modelo gera barato e o GitHub renderiza. Ao final, **encerre o projeto no Console do GCP**, porque o **Cloud SQL cobra mesmo sem uso**; o projeto fica arquivado 30 dias e pode ser restaurado.

---

## 👵 Explicando para a vovó

Mermaid é escrever a planta da casa em texto e deixar uma máquina desenhar, em vez de ficar alinhando quadradinhos no PowerPoint. Se mudar um cômodo, muda uma linha e a planta é redesenhada.

Encerrar o projeto é desligar o disjuntor geral da obra quando ela acaba: o que tem aluguel fixo (o banco de dados) continua cobrando se você só sair de casa sem desligar.

---

## 🔧 Tecnicamente

### O que é
- Com o desenvolvimento concluído sobram duas tarefas: documentar (README) e desligar o ambiente na nuvem para não gerar custo.
- O README fica na raiz e é gerado pelo Claude Code depois de todo o desenvolvimento, com visão geral, **disclaimer regulatório logo no início** e três diagramas Mermaid.
- Os três diagramas: arquitetura de infraestrutura completa (cliente, Cloud Run, Google Cloud, serviços externos), grafo do agente como RAG corretivo e pipeline de deploy canary.
- **Mermaid**: biblioteca open source que cria diagramas (componentes, sequência, Gantt, classes, Git) em notação de texto; a biblioteca renderiza a imagem, exportável. O GitHub renderiza blocos Mermaid em Markdown, com zoom, exportar e copiar.
- Por que combina com IA: modelos geram imagens, mas são muito melhores e mais baratos para gerar texto. Sem desenhar à mão, da conversa ao diagrama pronto, fácil de alterar (muda o texto, renderiza de novo). Hoje a discussão acontece com o agente e o diagrama registra o resultado.
- **graph é palavra reservada** na gramática do Mermaid, mesmo dentro de `flowchart TB`: o nó principal deve se chamar `agentGraph`, senão o parser quebra com erro genérico.
- Encerramento no GCP: Vertex AI e Cloud Run só cobram por uso; o **Cloud SQL cobra pelo armazenamento mesmo sem uso**.
- Passo a passo no console: IAM e administrador, Configurações (onde está o projeto), Encerrar (exige ser administrador da conta, natural em conta pessoal) e digitar o código do projeto para confirmar. Toda conexão do projeto é fechada e não há mais chamadas.
- Janela de 30 dias: o projeto encerrado fica arquivado por 30 dias; a cobrança para a partir do pedido, a aplicação deixa de funcionar e ainda pode ser restaurado. Em ambiente corporativo, só o dono da conta tem esse acesso.
- Depois do projeto, expanda por conta própria: outra linguagem, outro agente (Codex, Kimi, Gemini), outra nuvem (AWS, Azure) ou tudo local. O projeto foi escrito quase todo pelo Claude Code, prompt a prompt; spec-driven development é outra forma de construir.

### Como funciona
- Pedir ao Claude Code o README com o prompt da aula: visão geral, três diagramas Mermaid, nó principal chamado `agentGraph`, disclaimer regulatório no início e renderização com `@mermaid-js/mermaid-cli` antes de considerar pronto.
- Conferir o resultado: o README traz uma tabela (stack) e, mais adiante, os blocos `mermaid` de infraestrutura, grafo e deploy.
- Na demo, o autor removeu a última frase do prompt (renderização demorada) e o preview de Markdown do VS Code não renderizou os diagramas, mesmo com extensão de Mermaid; a saída foi pedir ao agente que renderizasse e testasse e conferir no GitHub. Talvez a frase não devesse ter saído.
- Quando terminar e compartilhar o link, abrir o console do GCP: IAM e administrador, Configurações do projeto.
- Clicar em encerrar (administrador da conta) e digitar o código do projeto para confirmar.
- Saber que a cobrança para no pedido, a app para e há 30 dias para restaurar.
- Em outra nuvem o caminho é diferente, mas a providência é a mesma: apagar o ambiente.
- Fechamento da disciplina: usar o material como guia de estudo, alternando explicação, reprodução do código, experimentação, validação e adaptação.
- Ciclo de revisão final: revisitar os checkpoints sem consultar as respostas, abrir os projetos do GitHub e identificar os conceitos em cada implementação, criar uma variação própria para portfólio e registrar dúvidas para professores e comunidade.

### Onde aplicar
- Registrar arquitetura de qualquer projeto no README com diagramas versionados junto do código.
- Documentar decisões de arquitetura ao fim de uma conversa com o agente (diagrama Mermaid como resultado).
- Encerrar ambientes de estudo, demo ou PoC na nuvem para eliminar custo fixo residual.
- Portfólio: variação do projeto em outra linguagem, agente ou nuvem.

### Vantagens e limites
**Vantagens**
- Diagrama em texto: barato de gerar, fácil de alterar e de versionar em diff.
- O GitHub renderiza sem ferramenta extra.
- Encerrar o projeto no console para toda cobrança de uma vez e é reversível por 30 dias.
- Disclaimer no topo do README explicita o limite regulatório do sistema.

**Limites**
- Preview do editor pode não renderizar Mermaid; é preciso conferir no GitHub ou renderizar com o CLI.
- Mermaid pode ficar complicado em diagramas grandes e tem palavras reservadas que quebram o parser.
- Renderizar com o CLI para testar é lento.
- Encerrar o projeto derruba tudo, inclusive o link compartilhado.

### 🚫 Armadilhas
- Chamar o nó principal de `graph`: palavra reservada, o parser quebra com erro genérico apontando para o texto do label.
- Confiar no preview do VS Code para validar o Mermaid.
- Achar que Vertex AI e Cloud Run parados custam zero e esquecer que o Cloud SQL cobra pelo armazenamento.
- Esperar que encerrar o projeto apague tudo na hora: ele fica 30 dias arquivado.
- Achado: `make destroy` do repo não encerra o projeto GCP nem o Firebase Hosting, só remove recursos; o encerramento do projeto continua manual.

> 💡 Peça o README ao agente com a instrução de renderizar os diagramas com o CLI do Mermaid: é uma forma de conferir que não há erro de parser antes do push (a aula também confere no GitHub).

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| README | Arquivo na raiz com visão geral, disclaimer e diagramas do projeto. |
| Mermaid | Linguagem de marcação em texto que o GitHub e o CLI renderizam em diagramas. |
| agentGraph | Nome do nó principal do diagrama do grafo; `graph` é reservado. |
| @mermaid-js/mermaid-cli | CLI que renderiza os diagramas, usado como teste de validade. |
| Disclaimer regulatório | Aviso no início do README de que o sistema informa e não recomenda investimento. |
| Cloud SQL | Banco gerenciado que cobra armazenamento mesmo sem uso. |
| IAM e administrador | Seção do console GCP onde se encerra o projeto. |
| Janela de 30 dias | Prazo em que o projeto encerrado fica arquivado e pode ser restaurado. |
| Spec-driven development | Alternativa a prompt a prompt: construir a partir de uma spec fim a fim. |
| Ciclo de revisão final | Checkpoints, abrir os repos, criar variação de portfólio, registrar dúvidas. |

---

## 💻 No código do repo

**Projeto:** [README.md (raiz)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/README.md)

Li o README completo. Não renderizei os diagramas.

**Fluxo**
1. `README.md`: disclaimer regulatório em citação logo após o título ("O sistema informa, nunca recomenda", citando a CVM e `packages/agent/src/answer/format-resposta.ts`).
2. Seção "O que é": base vetorial de 20 empresas da B3, ITR/DFP da CVM, RAG corretivo com busca web.
3. Seção "Arquitetura": primeiro `mermaid` `flowchart TB` com subgraphs Cliente, Cloud Run (nó `agentGraph`), Google Cloud (Vertex AI, Cloud SQL, Secret Manager) e Serviços externos (Serper, Langfuse, Grafana).
4. Segundo diagrama (`flowchart LR`): `retrieve` → `grade` → `answer` ou `webSearch` → `retrieve`; texto abaixo cita `MAX_ITERATIONS = 2`.
5. Terceiro diagrama: push em main, test, build, deploy Cloud Run a 0% com tag canary, healthcheck `/api/health`, update-traffic ou para, Firebase Hosting; cita `pnpm rollback`.
6. Tabela de stack, "Como rodar localmente" (`docker compose up -d`, `pnpm db:migrate`, `pnpm seed`, `pnpm dev`) e `DEMO=true` para rodar sem Postgres nem GCP.

**Como rodar**
- `pnpm capstone:check --url <url>` (o item 11 confere seção de arquitetura e bloco ````mermaid` no README; não executei)
- Abrir o README no GitHub para ver os diagramas renderizados

**Armadilhas e achados no código**
- Achado: a aula manda nomear `agentGraph` o nó principal do diagrama do grafo; no repo ele está no diagrama de arquitetura, e no diagrama do grafo os nós são `retrieve`, `grade`, `answer`, `webSearch` (não há nó chamado `graph`).
- Achado: o CLAUDE.md afirma que os diagramas foram validados com `@mermaid-js/mermaid-cli` (a aula, na demo, retirou essa frase do prompt); não reproduzi a validação.
- Achado: o README traz URLs reais de demo e API de produção (`ai-researcher-capstone.web.app`) que deixam de funcionar quando o projeto é encerrado (CLAUDE.md registra que `pnpm destroy` foi executado de verdade no H.5 e o ambiente reconstruído).

**Projeto:** [scripts/destroy.ts, Makefile, infra/README.md](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/scripts)

A aula encerra pelo Console do GCP; o repo oferece o equivalente por CLI (`make destroy`). Li destroy.ts e o Makefile. Não executei (apagaria recursos reais).

**Fluxo**
1. `Makefile`: alvo `destroy` chama `pnpm destroy` (`tsx scripts/destroy.ts`).
2. `scripts/destroy.ts`: exige `GOOGLE_CLOUD_PROJECT_ID`; sai com erro se faltar.
3. Ordem dos passos `gcloud`: Cloud SQL (`ai-researcher-db`) primeiro por ser o único custo fixo, depois Cloud Run (`ai-researcher-api`), Artifact Registry (`ai-researcher`), 5 secrets, Workload Identity Pool (`github-actions-pool`) e service account de deploy.
4. Confirmação: sem `--yes`, o usuário digita o project id de volta; se não bater, cancela e sai com código 1.
5. Falha em um passo não interrompe os seguintes: acumula em `falhas` e termina com `exitCode = 1`.
6. Mensagem final: Firebase Hosting e o projeto GCP em si não são removidos; sugere `firebase hosting:disable` e `gcloud projects delete <id>` manualmente.

**Como rodar**
- `GOOGLE_CLOUD_PROJECT_ID=<id> make destroy` (destrutivo; pede o project id)
- Alternativa da aula: Console do GCP, IAM e administrador, Configurações, Encerrar

**Armadilhas e achados no código**
- Achado: aula e repo divergem de mecanismo: console encerra o projeto inteiro (30 dias de arquivo, restaurável); o script apaga recursos um a um, sem janela de restauração para a maioria deles; a exceção é o pool de identidade do WIF, que tem soft-delete de 30 dias.
- Achado: o CLAUDE.md registra que o Workload Identity Pool tem soft-delete de 30 dias (undelete possível) e que a service account recriada perde roles e binding; a aula não trata disso.
- Achado: o script não remove o projeto, então nada impede que algum recurso que ele não conhece continue cobrando; para zerar a conta, encerre o projeto.
- Achado: a estimativa do repo para o Cloud SQL é de aproximadamente US$ 10-15 por mês (comentário em destroy.ts, citando o plano); número do repo, não da aula.

---

## 🔗 Para ir além
- [Capstone Project AI Researcher (completo)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)
- [AI Researcher Seed (ponto de partida)](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed)
- [README.md do projeto](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/README.md)
- [scripts/destroy.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/scripts)

---

⬅️ [17 · Métricas, budget de tokens e rate limiting](./17-metrics-token-budget-and-rate-limiting.md)  ·  [19 · Revisão integrada: o AI Researcher de ponta a ponta, os slides de diagrama e as leituras indicadas](./19-integrated-review.md) ➡️
