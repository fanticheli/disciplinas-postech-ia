# 01 · CLAUDE.md e AI Dev Skills: contexto sempre ligado versus instruções sob demanda

> **Unidade 1 · Aula 2** · Leitura: ~9 min · Bloco: Unidade 1 · Ideação, setup e deploy inicial

## 🎯 Em uma frase
O modelo é **stateless**, então o projeto guarda contexto e regras em **.claude/CLAUDE.md** (sempre carregado) e em **skills** (Markdown carregado conforme a tarefa). Em ambiguidade entre skill do projeto e skill oficial do framework, a **oficial vence**.

---

## 👵 Explicando para a vovó

O agente de código é como um prestador de serviço que esquece tudo toda vez que vai embora. O CLAUDE.md é o bilhete na porta de entrada que ele lê sempre: onde está, o que perguntar antes de mexer, o que nunca fazer.

As skills são as pastas de procedimento no armário: o manual de hidráulica só sai quando há cano vazando. Assim o bilhete fica curto e o prestador não gasta tempo lendo o que não precisa. E se existe o manual do próprio fabricante da torneira, ele manda mais que o seu manual caseiro.

---

## 🔧 Tecnicamente

### O que é
- Ponto de partida: pegar o link do repo no material complementar (o endereço pode mudar), fazer **fork** para a sua conta, **git clone** do fork, abrir no editor e trabalhar na branch **starter**. Usa-se conta própria de GitHub e de Google Cloud porque a esteira de DevOps entrega no seu GCP.
- **Projeto seed** é um ponto de partida com só o início do necessário; a branch starter cumpre esse papel e a Aula 7 apresenta um repositório separado com o mesmo conteúdo.
- O modelo por trás do agente é **stateless**: cada interação é como uma requisição nova. A solução é um arquivo de configuração carregado sempre. No Claude é o `CLAUDE.md` na pasta `.claude`; Gemini e Codex têm equivalente.
- O CLAUDE.md do projeto começa pelo contexto (repo demonstrativo do módulo Capstone, código didático), descreve as partes do projeto e o estado atual, depois traz as regras de trabalho e as convenções.
- Regras "pergunte antes de" (5): instalar dependência nova; criar abstração ou interface; alterar esquema do banco; mudar deploy, workflow ou infraestrutura; reorganizar pastas ou mover arquivos.
- Regras "nunca" (4 na aula): segredo, chave ou connection string em arquivo versionado (vem de variável de ambiente e, em produção, do Secret Manager); LLM para gerar os parágrafos do corpus CVM; `any` sem comentário justificando (prefira `unknown` com narrowing); teste que dependa de rede (use fixtures ou fakes).
- Dois níveis de CLAUDE.md: global da máquina e do projeto. **O do projeto manda**; se o projeto não define algo, vale o global. Em equipe, versiona-se o do projeto.
- **Skill** é Markdown com instruções para trabalhar segundo um padrão, carregado conforme o contexto da tarefa (em tarefa de backend, as skills de Angular não entram). Evita contexto inicial grande, que custa mais tokens e atrasa o processamento.
- Duas origens de skill: oficiais do time do framework (o time do Angular criou as dele, motivo declarado para escolher Angular) e as do projeto, como `angular-component` e a do Fastify.
- Precedência: se houver ambiguidade entre skill do projeto e oficial, a **oficial sempre vence**. Dá para inverter, mas a recomendação da aula é manter a oficial. E vale escrever até regras óbvias no arquivo, para o agente sempre achar a regra atual se o negócio mudar.

### Como funciona
- 1. Fork do repo do Capstone no GitHub; 2. `git clone` do seu fork; 3. entrar na pasta e abrir no editor (VS Code na aula); 4. `git checkout starter`. Para refazer do zero sem conflito de merge, a Aula 7 indica o repo Seed, cuja `main` equivale à starter.
- Leia `.claude/CLAUDE.md` de cima para baixo: Contexto, Estado atual, Stack, Estrutura, Comandos, Regras de trabalho (pergunte antes / nunca), Convenções, Domínio, Corpus, Modelos, Skills.
- Decida o que vai para o CLAUDE.md (vale para toda tarefa: regras, comandos, convenções, limites) e o que vai para skill (vale para um tipo de tarefa: como fazer uma rota Fastify, um nó do grafo, um componente Angular).
- Cada skill é uma pasta com `SKILL.md` e frontmatter `name` e `description`; a descrição diz quando usar e é o que permite ao agente decidir carregá-la.
- Instale skills oficiais com `npx skills add https://github.com/angular/skills` (comando registrado no CLAUDE.md e na skill `angular-component`); o `skills-lock.json` registra origem e hash de cada skill instalada.
- Escreva a regra de precedência no CLAUDE.md e repita no topo da skill do projeto, apontando para a oficial.
- Prática da aula: ler o CLAUDE.md e as skills do repo e, se quiser, pedir ao Claude para explicar cada detalhe.

### Onde aplicar
- Qualquer repo com agente de código: o CLAUDE.md (ou AGENTS.md, GEMINI.md) é o contrato de trabalho versionado com o time.
- Times com várias stacks: skill por tipo de tarefa (frontend, backend, grafo) em vez de um arquivo gigante sempre carregado.
- Frameworks com skills oficiais (Angular, Langfuse): instalar a oficial e deixar a do projeto só para decisões locais.
- Governança de agente: lista de "pergunte antes" e "nunca" reduz mudanças arriscadas (dependência, schema, deploy).

### Vantagens e limites
**Vantagens**
- Contexto sempre presente evita repetir instruções a cada conversa.
- Skills sob demanda mantêm o contexto inicial pequeno, com menos tokens e menos latência.
- Skill oficial acompanha a versão do framework; a do projeto cobre só o que é específico.
- Regras versionadas viram revisão de código: mudar a regra é um commit.

**Limites**
- CLAUDE.md que só cresce vira custo fixo em toda interação.
- Duas skills sobre o mesmo assunto geram conflito se a precedência não estiver escrita.
- A skill só carrega se a descrição for boa; descrição vaga faz o agente nunca usá-la.
- Regra no arquivo não é garantia técnica: nada impede o agente de violá-la sem hook, teste ou revisão.

### 🚫 Armadilhas
- Pôr tudo (Angular, backend, convenções) no CLAUDE.md: contexto inicial inflado, mais tokens e mais demora.
- Deixar a skill do projeto repetir o que a oficial já cobre: divergência futura e conflito de precedência.
- Não escrever regras "óbvias" porque o agente supostamente já as segue: se o negócio mudar, o agente não acha a regra atual.
- Trabalhar direto no repo do curso sem fork: sem dono do repositório, a autenticação por Workload Identity (Aula 6) não funciona no seu GCP.
- Achado: o `.claude/CLAUDE.md` do repo completo tem 325 linhas e cerca de 57 KB porque acumulou o diário de cada bloco em "Estado atual"; o do seed tem 205 linhas e cerca de 12 KB. Contradiz a lição da própria aula sobre contexto sempre carregado.

> 💡 Meça: `wc -c .claude/CLAUDE.md` e divida por 4 para estimar tokens carregados em toda interação. Se passar de uns poucos milhares, mova procedimento para skill e histórico para docs.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Stateless | Modelo que não lembra interações anteriores; cada chamada é independente. |
| CLAUDE.md | Arquivo em .claude/ carregado em toda interação com contexto, regras e convenções. |
| Skill | Markdown de instruções carregado conforme o contexto da tarefa. |
| Skill oficial | Skill criada pelo time do framework (ex.: angular-developer, angular-new-app). |
| Precedência | Regra: em ambiguidade, a skill oficial vence a do projeto. |
| Projeto seed | Ponto de partida com só o início do projeto (branch starter ou repo Seed). |
| Pergunte antes | Lista de ações que o agente só faz com aprovação. |
| Nunca | Lista de proibições do projeto (segredo em arquivo, LLM no corpus, any, teste com rede). |
| skills-lock.json | Registro de origem e hash das skills instaladas via npx skills. |

---

## 💻 No código do repo

**Projeto:** [.claude/CLAUDE.md, .claude/skills/, .agents/skills/, skills-lock.json (repo completo)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/.claude)

Li o CLAUDE.md, o frontmatter e o início das quatro skills próprias, os symlinks e o skills-lock.json do repo completo. Não executei nada.

**Fluxo**
1. `.claude/CLAUDE.md` (325 linhas): seções Contexto, Estado atual, Stack, Estrutura, Comandos, Regras de trabalho (pergunte antes / nunca), Convenções, Domínio, Corpus, Modelos, Skills e Observação sobre versões.
2. `.claude/skills/fastify-route/SKILL.md` (83 linhas): uma rota por arquivo como plugin, entrada validada com zod, erro em `application/problem+json`, SSE com `no-transform`, teste com `app.inject()`.
3. `.claude/skills/langgraph-node/SKILL.md` (138 linhas): assinatura de nó, estado, arestas condicionais, guard de iteração e teste com LLM fake.
4. `.claude/skills/angular-component/SKILL.md` (82 linhas): abre mandando usar a skill oficial `angular-developer` e diz que, em conflito, a oficial vence; depois lista convenções locais (componente não conhece HTTP, um store por domínio).
5. `.claude/skills/frontend-design/SKILL.md` (70 linhas): tokens visuais e fidelidade ao protótipo; existe só no repo completo.
6. `.claude/skills/angular-developer`, `angular-new-app` e `langfuse` são **symlinks** para `.agents/skills/*` (instaladas por `npx skills add`).
7. `skills-lock.json`: 3 entradas (angular-developer e angular-new-app de `angular/skills`, langfuse de `langfuse/skills`), cada uma com `computedHash`. No seed são só 2 (sem langfuse).

**Como rodar**
- `git clone <seu-fork> && cd capstone-project-ai-researcher && git checkout starter`
- `npx skills add https://github.com/angular/skills` (reinstala as skills oficiais; não executei)
- `wc -c .claude/CLAUDE.md .claude/skills/*/SKILL.md` para medir o contexto fixo e o sob demanda

**Armadilhas e achados no código**
- Achado: a aula descreve 4 regras "nunca" e o repo traz uma quinta: não commitar os ZIPs ou CSVs brutos da CVM (só os JSONs normalizados).
- Achado: a regra de precedência está duplicada, no CLAUDE.md (seção Skills) e no topo de `angular-component/SKILL.md`; consistente, mas precisa mudar nos dois lugares.
- Achado: o repo declara seed e completo com skills diferentes (`frontend-design` e `langfuse` só no completo), coerente com os blocos que cada um já cobre.
- O CLAUDE.md do repo fixa convenção de commits em português sem prefixo convencional; é do projeto do curso, não regra geral.

**Projeto:** [.claude/CLAUDE.md e .claude/skills/ (repo seed)](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed/tree/main/.claude)

O seed traz o CLAUDE.md enxuto (205 linhas) e 5 skills: 3 próprias (`angular-component`, `fastify-route`, `langgraph-node`) e 2 por symlink (`angular-developer`, `angular-new-app`, para `.agents/skills/*`, instaladas por `npx skills add`), sem frontend-design nem langfuse. Comparei por diff e listagem; não executei.

**Fluxo**
1. `.claude/CLAUDE.md`: mesmas seções, mas "Estado atual" só até o Bloco C (walking skeleton) e declara que `packages/agent` e `packages/mcp-server` ainda não existem.
2. `.claude/skills/`: `angular-component`, `fastify-route`, `langgraph-node` e symlinks para `angular-developer` e `angular-new-app`.
3. `skills-lock.json`: só as duas skills do Angular.

**Como rodar**
- `diff -r seed/.claude full/.claude` para ver o que o repo completo acrescenta

**Armadilhas e achados no código**
- Achado: o seed já está no estado pós-Unidade 1 (tem `apps/api`, `apps/web`, `deploy.yml`, `capstone-check.ts`), então o CLAUDE.md dele diz que o Bloco C está pronto, embora a Aula 2 chame o ponto de partida de "o mínimo configurado".

---

## 🔗 Para ir além
- [Capstone Project AI Researcher](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)
- [AI Researcher Seed](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed)
- [CLAUDE.md do projeto completo](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/.claude/CLAUDE.md)
- [Skills do projeto (.claude/skills)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/.claude/skills)
- [Skills oficiais do Angular](https://github.com/angular/skills)

---

⬅️ [00 · Bem-vindo ao Capstone: o AI Researcher e a regra "informa, nunca recomenda"](./00-welcome-to-the-capstone.md)  ·  [02 · Tour pelo Google Cloud e GitHub Actions com Workload Identity Federation](./02-google-cloud-tour-and-github-actions-wif.md) ➡️
