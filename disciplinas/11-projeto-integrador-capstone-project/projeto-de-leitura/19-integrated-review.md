# 19 · Revisão integrada: o AI Researcher de ponta a ponta, os slides de diagrama e as leituras indicadas

> **Revisão integrada** · Leitura: ~10 min · Bloco: Unidade 5 · Observabilidade e produção

## 🎯 Em uma frase
O AI Researcher é um **RAG corretivo**: busca na base vetorial, um nó **grade** julga se o contexto basta, cai para a web quando não basta e responde com **citação**, com o guardrail de "informar, nunca recomendar" **no código**. O resto da disciplina (testes sem rede, circuit breaker, MCP, Angular, Langfuse, budget, deploy sem chave) é o que transforma esse fluxo em um sistema de produção.

---

## 👵 Explicando para a vovó

Pense numa biblioteca com uma bibliotecária cuidadosa. Você pergunta; ela olha primeiro nas estantes da casa (a base vetorial). Se o que achou não basta, ela mesma decide ir pesquisar na internet, anota a fonte e só então responde. E há uma placa na parede: ela informa, mas nunca diz "compre" ou "venda". Essa placa não é um pedido educado, é uma trava na porta de saída.

O resto do curso é o prédio em volta dela: um portão que só abre com crachá temporário (o deploy sem chave), um aviso quando uma fonte externa cai (circuit breaker), um painel que mostra cada passo (Langfuse e o painel do grafo) e a conta de luz limitada (budget de tokens). Ao fim, você desliga a luz pelo painel do condomínio para não pagar à toa.

---

## 🔧 Tecnicamente

### O que é
- **Fluxo de negócio (slide 1.1, RAG corretivo):** pergunta, base vetorial (indicadores CVM de 20 empresas da B3), contexto suficiente? Sim: resposta com citação (fonte e data-base). Não: busca na web (fallback) e resposta. O slide avisa que é simplificado: o grafo real tem guard de iteração e persistência do enriquecimento web.
- **Mapa de infraestrutura (slide 1.3):** GitHub Actions, Artifact Registry, Cloud Run, Firebase Hosting, Cloud SQL com pgvector, Secret Manager e Vertex AI.
- **Workload Identity Federation (slide 1.4):** o runner do GitHub Actions apresenta um token OIDC de curta duração ao Workload Identity Pool e Provider, que permite impersonar a service account de deploy; ela publica no Cloud Run, no Artifact Registry e no Firebase Hosting. Não existe chave JSON estática no projeto.
- **Busca vetorial (slides 2.1a, b e c):** perto no espaço é parecido no significado; o cosseno mede ângulo, não tamanho; top-k são os k mais próximos, nunca "o certo". No pgvector os operadores são `<->` (euclidiana), `<#>` (produto interno, não normalizado) e `<=>` (cosseno, o usado no projeto), e o top-k cabe em uma linha: `ORDER BY embedding <=> :pergunta LIMIT 5`, sem serviço de banco vetorial separado. O índice HNSW faz busca aproximada em camadas (esparsa no topo, densa na base), muito mais rápida em escala que a busca exata, que compara com todos.
- **Unidade 1:** CLAUDE.md sempre carregado versus skills sob demanda (a skill oficial do framework vence a do projeto), tour GCP, WIF, corpus CVM com parágrafos gerados por código, fundação por prompts e walking skeleton com deploy zero.
- **Unidade 2:** pgvector e seed, nós `retrieve` e `grade`, Serper, fallback com upsert do enriquecimento web, aresta condicional com guard do loop, nó `answer` com citação obrigatória, guardrail por código e streaming SSE.
- **Unidade 3:** grafo testado sem rede (fakes e fixtures), circuit breaker, retry e degradação graciosa, erros padronizados e o servidor MCP como segunda porta para o mesmo agente.
- **Unidade 4:** protótipo no Claude Design, skill frontend-design, chat com streaming e citações clicáveis, painel de estado do grafo, disclaimer e E2E no CI.
- **Unidade 5:** Langfuse por nó, métricas, budget de tokens e rate limiting, README com Mermaid e encerramento do projeto pelo Console do GCP (o Cloud SQL cobra mesmo sem uso; o projeto encerrado fica 30 dias arquivado e restaurável).

### Como funciona
- **Trilha de revisão sugerida:** refaça o desenho do RAG corretivo de memória; depois responda os checkpoints de cada aula sem consultar o texto; por fim, compare cada resposta com a seção "No código do repo" do tópico.
- **Teste de profundidade 1 (segurança):** explique por que o guardrail está no código e não só no system prompt. Resposta esperada: prompt é instrução e pode falhar; o filtro no código é determinístico. Depois leia o achado do tópico 09: o filtro é uma regex sobre a resposta do LLM, com cobertura limitada.
- **Teste de profundidade 2 (custo):** liste onde o projeto economiza tokens: parágrafos do corpus sem LLM, RAG antes da web, skills em vez de CLAUDE.md gigante, budget de tokens com 429 e métricas por nó.
- **Teste de profundidade 3 (resiliência):** trace o que acontece quando a busca web cai: retry, circuit breaker abrindo, degradação graciosa, erro padronizado e o que o painel mostra ao usuário.
- **Teste de profundidade 4 (produção):** descreva o caminho do commit ao Cloud Run (GitHub Actions, token OIDC, service account impersonada, Artifact Registry, Cloud Run, Firebase Hosting) e por que isso dispensa chave JSON.
- **Divergências aula x repo:** cada tópico registra os achados na seção "Armadilhas e achados no código". O README da disciplina reúne todos em uma tabela.
- **Expansão proposta pela aula final:** refazer o projeto com outra linguagem, outro agente de código (Codex, Kimi, Gemini) ou outra nuvem (AWS, Azure) ou tudo local, e encerrar o ambiente depois.

### Onde aplicar
- Qualquer chatbot de domínio regulado: base própria primeiro, web só como complemento julgado, citação de fonte e restrição legal no código.
- Qualquer agente em produção: grafo com teto de iteração, resiliência nas fronteiras, observabilidade por nó e controle de custo antes de abrir ao público.
- Projetos de portfólio: o ciclo final da apostila pede escolher um projeto e criar uma variação própria.
- Times com agentes de código: CLAUDE.md curto com regras de "pergunte antes" e "nunca faça", skills por tema e precedência definida.

### Vantagens e limites
**Vantagens**
- O projeto cobre todo o ciclo, do primeiro commit ao desligamento, em uma base de código só.
- Os fundamentos (padrões, segurança, testes, resiliência, leitura crítica do código gerado) valem para outra ferramenta, nuvem ou linguagem.
- Há um seed para o aluno reproduzir e um repositório completo para comparar.

**Limites**
- O código final diverge da aula em vários pontos, então decorar a aula sem ler o repo induz a erro.
- Há dependência de contas e serviços pagos ou com cota (GCP, Vertex AI, Serper, Langfuse), o que pesa em quem só quer estudar.
- O guardrail por regex tem falsos positivos e lacunas; é uma camada, não uma garantia total.

### 🚫 Armadilhas
- Estudar só a aula e não abrir o repositório: os achados mostram que repo e aula divergem em números, nomes e escopo.
- Tratar o top-k como "a resposta certa": ele são só os mais próximos.
- Esquecer de encerrar o ambiente: o Cloud SQL cobra mesmo sem uso.
- Confiar no CLAUDE.md como diário: o do repo completo acumulou 325 linhas, contra a própria lição de manter o contexto sempre ligado enxuto (achado do tópico 01).
- Copiar a configuração de permissões do deploy sem revisar: a service account tem papéis amplos (achado do tópico 02).

> 💡 Refaça os seis diagramas dos slides à mão (RAG corretivo, mapa GCP, WIF, distância vetorial, pgvector e HNSW) sem olhar: se você não consegue desenhar, ainda não consegue explicar.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| RAG corretivo | RAG com um juiz de suficiência (grade) que decide se recorre à web antes de responder |
| Grade | Nó que julga se o contexto recuperado basta para responder |
| Guard do loop | Teto de iterações do grafo para impedir ciclo infinito entre retrieve, grade e busca web |
| Top-k | Os k vizinhos mais próximos da pergunta no espaço vetorial; nunca "o certo" |
| Cosseno (<=>) | Distância por ângulo, usada no projeto; ignora o tamanho do vetor |
| HNSW | Índice de busca aproximada em camadas, mais rápido que a busca exata em escala |
| WIF | Workload Identity Federation: token OIDC de curta duração no lugar de chave JSON |
| Walking skeleton | Versão mínima ponta a ponta já em produção, evoluída por camadas |
| Circuit breaker | Corta chamadas a um provedor que está falhando e degrada com elegância |
| SSE | Server-Sent Events: streaming de eventos do servidor para o chat e o painel do grafo |
| Langfuse | Ferramenta de observabilidade de LLM usada para instrumentar cada nó |
| Budget de tokens | Limite de consumo que, estourado, responde 429 |

---

## 💻 No código do repo

**Projeto:** [capstone-project-ai-researcher (visão geral do repositório)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)

Visão de conjunto dos tópicos 00 a 18; o detalhe por arquivo está em cada um. Estrutura lida: apps/ (API e web), packages/ (agente), infra/, scripts/, evals/, docs/, .github/workflows, Makefile e firebase.json.

**Fluxo**
1. Tópicos 00 e 01: contexto, regras do agente e skills (CLAUDE.md e .claude/skills).
2. Tópicos 02 a 04: infraestrutura, GitHub Actions com WIF e o walking skeleton publicado.
3. Tópicos 05 a 09: pgvector, nós do grafo, busca web, guard do loop e answer com guardrail e SSE.
4. Tópicos 10 a 12: testes sem rede, resiliência, erros padronizados e MCP.
5. Tópicos 13 a 15: frontend Angular, painel do grafo e E2E no CI.
6. Tópicos 16 a 18: Langfuse, métricas e budget, README com Mermaid e encerramento.

**Como rodar**
- Os comandos de cada etapa estão nos tópicos; o resumo dos que existem no repo está no README da disciplina.

**Armadilhas e achados no código**
- Os slides de diagrama são editoriais e simplificados (o próprio slide 1.1 avisa); o grafo real tem guard de iteração e persistência do enriquecimento web.

---

## 🔗 Para ir além
- [Capstone Project AI Researcher](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)
- [AI Researcher Seed](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed)
- [Huyen, AI Engineering (O'Reilly, 2025): avaliar se o contexto basta, quando cair para fonte externa, custo e latência por chamada](https://www.amazon.com.br/AI-Engineering-Building-Applications-Foundation/dp/1098166302)
- [Auffarth e Kuligin, Generative AI with LangChain, 2ª ed.: LangGraph, grafos de estado, arestas condicionais](https://www.amazon.com/Generative-LangChain-production-ready-applications-LangGraph/dp/1837022011)
- [Kleppmann, Designing Data-Intensive Applications: o porquê de pgvector, HNSW e trade-offs de armazenamento](https://www.amazon.com.br/Designing-Data-Intensive-Applications-Martin-Kleppmann/dp/1449373321)
- [Beyer et al., Site Reliability Engineering: circuit breaker, degradação graciosa, rate limiting, canary e error budgets](https://www.amazon.com.br/Site-Reliability-Engineering-Betsy-Beyer/dp/149192912X)

---

⬅️ [18 · README com Mermaid e desligando o ambiente pelo Console do GCP](./18-readme-and-shutting-down-gcp.md)
