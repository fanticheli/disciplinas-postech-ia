# 16 · Live de SDD enterprise: spec boa, harness, o limite dos 36% e o fluxo do Spec Kit numa tela estilo Netflix

> **Live · 27/05/2026** · Leitura: ~11 min · Bloco: Agentes de código e Spec-Driven Development

## 🎯 Em uma frase
A live pergunta “SDD é só um prompt bem feito?” e responde “Não (Talvez?)”: é uma **especificação estruturada** escrita antes de o agente tocar no código (comportamento, regras, critérios de aceite, fora do escopo e “não faça”), guardada no **harness** do agente, com o custo de mantê-la dito às claras. A demo percorre o **GitHub Spec Kit** com Claude Code numa tela inicial estilo Netflix.

---

## 👵 Explicando para a vovó

Pedir “adiciona um limite diário de transferência” é como dizer ao pedreiro “faz uma cozinha bonita”. A spec é a pasta da obra: o que construir, as regras da casa, o que fica de fora e o que ele não pode derrubar. Quanto mais o pedreiro desconhece o prédio, mais a pasta precisa dizer.

A **constituição** é o regulamento do condomínio, conferido na hora de aprovar a planta. O **CLAUDE.md** é o bilhete na geladeira com o jeito de trabalhar da casa. Os *symlinks* da dica final são o mesmo bilhete exposto em vários cômodos sem fotocópia: se você corrige o original, todos leem a versão nova.

---

## 🔧 Tecnicamente

### O que é
- **Definição (slides):** SDD é a prática de escrever uma especificação estruturada antes de deixar o agente de IA tocar no código. O slide de abertura define *harness* como tudo o que envolve uma LLM para torná-la funcional. A pergunta “é só um prompt bem feito?” aparece com a resposta “Não” e depois “Não (Talvez?)”; o PDF não traz a explicação falada, então não sei qual ressalva foi feita.
- **Exemplo ruim:** “Adiciona um limite diário de transferência. Pra contas premium: R$50k e pra contas normais: R$10k.” Não diz o que é “dia”, quando o saldo conta, o que fazer ao exceder nem o que não tocar.
- **Exemplo bom (slide de uma spec em markdown):** título; referências do Jira (task, épico e um documento, `TDD: bacen-api-tdd.pdf`, provavelmente um documento de design técnico, hipótese); comportamento esperado (conta padrão R$ 10.000, premium R$ 50.000); regras de negócio (dia corrido de 00h00 a 23h59 no horário de Brasília, saldo calculado em tempo real somando transferências já liquidadas, agendadas não consomem limite até a liquidação, transferências entre contas do mesmo CPF/CNPJ são isentas, excedente é rejeitado por inteiro, sem aprovação parcial); critérios de aceite no formato QUANDO/ENTÃO (HTTP 422 com código `DAILY_LIMIT_EXCEEDED` e o saldo restante no corpo; à meia-noite o limite é restaurado); **fora do escopo** (limite por transação em outro arquivo, PJ na fase 2, notificações com o time de produto); e **não faça** (não criar endpoint novo, usar o middleware de validação existente; não alterar a tabela de contas, usar tabela auxiliar). O slide parece terminar cortado na lista de “não faça”.
- **5W2H como framework:** um slide “Um framework útil” mostra o 5W2H (o quê, por quê, quem, onde, quando, como, quanto), logo antes do exemplo bom. A ligação entre cada letra e o exemplo é minha leitura (hipótese): a spec boa responde o quê (comportamento), onde (arquivos existentes) e como (regras), e cita quem e por quê pelas referências do Jira.
- **SDD no harness:** o slide lista `CLAUDE.md` e `DESIGN.md` (Claude), `AGENTS.md` (Codex/OpenAI) e `GEMINI.md` (Gemini). O README da live acrescenta a dica de manter um único arquivo e espelhar por *symlink* para `.github/copilot-instructions.md` (Copilot), `.cursorrules` (Cursor), `.windsurfrules` (Windsurf) e `AGENTS.md` (Codex, Gemini etc.).
- **Enterprise versus startup:** os slides contrastam banco e fintech (transatlântico contra veleiro) e mostram dois recortes de notícia sobre “SDD em nível enterprise”: o *Auto Approval* do iFood (revisão de código 33% mais rápida com avaliação automática de risco; o diagrama mostra webhook do GitLab, uma API, consumidor Kafka, um worker, um proxy interno de IA generativa e o Gemini 2.5 Flash na Vertex AI, com a nota de que a inferência rápida mantém milhares de MRs por dia) e a manchete da Forbes de maio de 2023 “Samsung Bans ChatGPT Among Employees After Sensitive Code Leak”. Os slides são só imagens, sem a conclusão do professor; a leitura mais provável (hipótese) é que enterprise soma escala, risco e confidencialidade.
- **O que a academia diz (slides):** “só 36% de chance do agente seguir sua spec inteira corretamente”. A conta do slide: cada instrução com 95% de sucesso, spec com 20 itens, 0,95^20 = 36% (confere: 0,95^20 ≈ 0,358). Ela supõe itens independentes e a mesma taxa para todos, o que é uma simplificação, mas dá a ordem de grandeza: spec longa sem verificação não se cumpre sozinha. O mesmo slide fala do custo de manter as specs atualizadas.
- **Quando vale a pena:** agentes trabalham bem em terreno limpo (feature nova); testes existentes criam uma rede de segurança; manter a spec atualizada precisa ser parte da cultura. O slide seguinte pergunta em que momento a spec deixa de ser ativo e vira passivo, com um “(Lá ele)” que o PDF não explica.
- **O gargalo é conhecimento:** para escrever uma boa spec você precisa saber algo que o agente não sabe; em grandes empresas esse conhecimento está em processos, na cabeça de sêniores, em documentos antigos, no histórico do Teams e em códigos ilegíveis (o slide escreve “inelegíveis”).

### Como funciona
- **Instalação (README da live):** Python 3.11+, Git e `uv`; `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.8.15` e `specify init . --integration claude`. O init cria `.specify/` (templates, scripts, memória), `.claude/skills/` (os comandos como skills `speckit-*`) e o `CLAUDE.md`. O `init-options.json` da pasta confirma agente claude, shell `sh` e versão 0.8.15.
- **Comandos, na ordem:** `/speckit.constitution` (princípios; uma vez), `/speckit.specify` (o quê e por quê, sem tecnologia, gera `specs/NNN-nome/spec.md`), `/speckit.clarify` (até cinco perguntas dirigidas, uma por vez; confere com o texto da skill), `/speckit.checklist` (exige um domínio de foco), `/speckit.plan` (stack, arquitetura, `plan.md`, `research.md`, `data-model.md`, `quickstart.md`, `contracts/`), `/speckit.tasks`, `/speckit.analyze` (consistência entre spec, plano e tasks) e `/speckit.implement`. Caminho mínimo para experimentar: specify, plan, tasks, implement; em enterprise os opcionais deixam de ser opcionais.
- **Constitution Check:** o template do plano marca o bloco como “GATE: Must pass before Phase 0 research. Re-check after Phase 1 design”, com PASS, FAIL ou N/A por princípio e FAIL indo para “Complexity Tracking” ou bloqueando a feature. É o que, segundo o README, impede que a constituição vire “poster decorativo”.
- **Constituição ou CLAUDE.md:** a constituição é governança (princípios não negociáveis, gate no plan, versionamento semântico próprio com Sync Impact Report, edição só pelo comando); o `CLAUDE.md` é instrução operacional (contexto contínuo, sem gate, versionado só pelo Git, edição manual). Regra de bolso do README: precisa de fiscalização ativa, versionamento e propagação, é constituição; é lembrete de como conduzir o trabalho, é `CLAUDE.md`; princípio inegociável que também precisa de lembrete diário pode estar nos dois.
- **Extensão Git:** instalada por padrão, acopla hooks `before_*` e `after_*` aos comandos. No `.specify/extensions.yml`, `before_constitution` (inicializar o repositório) e `before_specify` (criar a branch da feature) têm `optional: false` e rodam sozinhos; os commits automáticos antes e depois das demais etapas têm `optional: true` e perguntam antes.
- **Relação com o resto da disciplina:** a Unidade 1 monta à mão *constitution, specify, plan, tasks, implement* ([tópico 01](./01-spec-driven-development-do-zero.md)); o Spec Kit traz os mesmos nomes mais *clarify, checklist, analyze* e o gate da constituição, e a Unidade 2 o adota com o Copilot ([tópico 03](./03-spec-kit-e-estrutura-do-opspilot.md)). A live o usa com Claude Code, cujo harness é o `CLAUDE.md` e as skills em `.claude/skills` (o harness em geral está no [tópico 00](./00-agente-de-codigo-harness-e-context-engineering.md)).
- **Onde a demo parou:** a pasta final tem constituição, spec com cinco clarificações, dois checklists, plano, pesquisa, modelo de dados, quickstart e quatro contratos. Não há `tasks.md`, `src/` nem testes: analyze e implement não aparecem no que foi versionado (hipótese: não foram executados ou não foram commitados).

### Onde aplicar
- Escrever a spec de uma mudança em sistema existente com referências (Jira, documento técnico), regras de negócio numeradas, critérios de aceite verificáveis, fora do escopo e “não faça” apontando para o código que deve ser reaproveitado.
- Manter um único arquivo de instruções do repositório e espelhá-lo por *symlink* para as ferramentas do time (`ln -sf CLAUDE.md AGENTS.md` e equivalentes), sem duplicar texto.
- Separar governança de instrução operacional: princípios fiscalizados no plano (constituição) e jeito de trabalhar do agente (`CLAUDE.md`).
- Usar `/speckit.checklist` como “teste unitário da escrita da spec” antes do plano, em especial em áreas como acessibilidade, segurança ou auditoria.

### Vantagens e limites
**Vantagens**
- Requisito discutido em texto custa minutos; a lacuna descoberta no meio do código custa dias (argumento do README da live).
- O agente recebe contexto estável: spec, plano e tasks como briefing permanente, e o Spec Kit cuida da numeração, das branches e dos artefatos.
- Rastreabilidade: a decisão de produto está na spec, a técnica no plano, e o `research.md` registra cada alternativa rejeitada.

**Limites**
- Custo de manter spec, plano e tasks em dia; o slide chama a atenção para o ponto em que a spec vira passivo.
- A conta dos 36%: spec longa tem baixa chance de ser seguida por inteiro se nada a verifica; checklist e analyze ajudam, mas dependem do mesmo modelo.
- O Constitution Check do plano foi preenchido pelo mesmo agente que escreveu o plano (6/6 PASS, sem violações); sem revisão humana ele é uma autoavaliação (observação minha, não da live).
- A boa spec exige conhecimento que o agente não tem e que em grandes empresas está espalhado em pessoas e documentos antigos.

### 🚫 Armadilhas
- Tratar a spec como um prompt maior: sem critérios de aceite, fora do escopo e “não faça” ela repete o exemplo ruim.
- Misturar decisão de produto na spec e de stack no plano (o `CLAUDE.md` da live pede para não misturar).
- Editar à mão arquivos que o Spec Kit mantém (a constituição, os templates, os scripts): o `CLAUDE.md` da live proíbe, porque quebra o Sync Impact Report e a propagação.
- Confiar no `.gitignore.example` da live para versionar só `.specify/memory` e `feature.json`: as exceções não funcionam (ver armadilhas no código).
- Aceitar o PASS do Constitution Check sem ler a justificativa de cada princípio.

> 💡 O `README.md` é idêntico em `000-pre-live` e `001-pos-live`. Para ver o que a live produziu, compare o `CLAUDE.md` e a pasta `specs/`, não o README.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| SDD | Spec-Driven Development: especificação estruturada escrita antes de o agente tocar no código |
| Harness | Tudo o que envolve uma LLM para torná-la funcional (slide da live): arquivos de instrução, ferramentas, permissões |
| 5W2H | O quê, por quê, quem, onde, quando, como e quanto: checklist para não esquecer partes da spec |
| Fora do escopo / Não faça | Seções da spec boa: o que não será tratado e o que o agente não pode alterar |
| Constituição | Princípios não negociáveis do projeto em `.specify/memory/constitution.md`, fiscalizados no `/speckit.plan` |
| Constitution Check | Gate do plano que confere o plano contra cada princípio (PASS, FAIL ou N/A) |
| Clarify | Rodada de até cinco perguntas dirigidas que grava as respostas na spec |
| Symlink de instruções | Atalho de `AGENTS.md`, `.cursorrules` etc. para o `CLAUDE.md`, para manter uma única fonte |
| 0,95^20 | Conta do slide: 20 instruções com 95% de acerto cada resultam em cerca de 36% de chance de cumprir todas |

---

## 💻 No código do repo

**Projeto:** [lives/2026-05-27 (000-pre-live e 001-pos-live)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-05-27)

Um projeto só de artefatos (sem código-fonte) com o Spec Kit 0.8.15 instalado para Claude Code. `000-pre-live` é o ponto de partida: framework, constituição já ratificada, `CLAUDE.md` e symlinks. `001-pos-live` acrescenta a feature `001-catalog-browse` (tela inicial de catálogo estilo Netflix: hero rotativo e três carrosséis). Li todos os arquivos autorais; não executei o `specify` nem o Claude Code.

**Fluxo**
1. `README.md`: PRD da tela (visão, persona, problema, solução, escopo, métricas, premissas), instalação do Spec Kit, os comandos na ordem com tabela comparativa, extensão Git, valor enterprise e a tabela “constituição x CLAUDE.md”.
2. `CLAUDE.md`: contexto, fluxo canônico (specify, clarify, plan, tasks, analyze, implement), “fonte primária da verdade”, resumo dos cinco princípios, restrições do domínio e regras de operação (não editar README, templates, scripts, integrações, workflows nem skills; mudar a constituição só por `/speckit.constitution`). `AGENTS.md`, `.cursorrules`, `.windsurfrules` e `.github/copilot-instructions.md` são symlinks para ele.
3. `.specify/memory/constitution.md` v1.0.0 (ratificada em 2026-05-27): Test-First, Simplicidade e YAGNI, Versionamento Semântico, Performance e UX-First (LCP ≤ 2,5 s, INP ≤ 200 ms, 60 fps) e Acessibilidade WCAG AA; mais restrições de UI, fluxo de desenvolvimento e governança, com o Sync Impact Report no topo.
4. `specs/001-catalog-browse/spec.md`: quatro user stories (três P1 e uma P2), 21 requisitos funcionais (FR-001 a FR-021), sete critérios de sucesso, casos de borda e a seção Clarifications com cinco perguntas respondidas (overlay para o detalhe, seis cards visíveis, sem loop nas bordas, dados por função geradora com latência e erro injetáveis, live region polite no hero).
5. `checklists/requirements.md` (todos os itens marcados) e `checklists/accessibility.md` (29 itens CHK sobre a qualidade dos requisitos de teclado, foco, contraste, movimento e leitor de tela; nenhum marcado).
6. `plan.md`: React 19, Vite 6, TypeScript 5.6, CSS Modules; Vitest, Testing Library, axe-core e Playwright; orçamento de 80 KB de JS gzip; Constitution Check com seis linhas, todas PASS; estrutura de `src/` e `tests/` planejada. `research.md` registra decisão, racional e alternativas rejeitadas (inclusive Next.js); `data-model.md` define as entidades e o `catalogService`; `quickstart.md` traz scripts e parâmetros de URL para forçar estados.
7. `contracts/`: `catalog-service.md` (nunca rejeita, latência exata, dados estáveis), `region-states.md` (`DataRegion` com os quatro estados e os papéis ARIA), `overlay-controller.md` (foco, trap, Esc, backdrop) e `visual-tokens.md` (cores, foco, dimensões).
8. `.specify/extensions.yml` (hooks da extensão Git), `.specify/feature.json` (`{"feature_directory": "specs/001-catalog-browse"}`, só no pós-live), `.specify/workflows/speckit/workflow.yml` (ciclo “Full SDD Cycle”: specify, gate de revisão da spec, plan, gate de revisão do plano, tasks, implement) e `.gitignore.example`.

**Como rodar**
- Para refazer o fluxo: `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.8.15`, `specify version` e, numa pasta de trabalho, `specify init . --integration claude`; depois, no Claude Code, `/speckit.constitution`, `/speckit.specify` (com o texto do README), `/speckit.clarify`, `/speckit.checklist` (com um domínio) e `/speckit.plan`. Não executei.
- Dica de espelhamento do README: `mkdir -p .github && ln -sf ../CLAUDE.md .github/copilot-instructions.md`; `ln -sf CLAUDE.md .cursorrules`; `ln -sf CLAUDE.md .windsurfrules`; `ln -sf CLAUDE.md AGENTS.md`.

**Estado inicial versus final**
Pré-live e pós-live têm o mesmo framework, a mesma constituição e o mesmo README. O que a live acrescenta: o bloco `SPECKIT START/END` no `CLAUDE.md` apontando para `specs/001-catalog-browse/plan.md` (é o plano corrente que o `/speckit.plan` registra, como no [tópico 03](./03-spec-kit-e-estrutura-do-opspilot.md)), a pasta `specs/001-catalog-browse/`, o `.specify/feature.json` e o `.gitignore.example`.

**Armadilhas e achados no código**
- O `.gitignore.example` ignora `/.specify` e tenta reincluir `!/.specify/memory` e `!/.specify/feature.json`: o Git não reinclui arquivo cujo diretório pai está ignorado. Verifiquei numa cópia: `git check-ignore -v` reporta os dois como ignorados pela regra `/.specify`. O comentário do arquivo também tem um erro de digitação (“bpara”).
- O README diz que o plano fixou **Next.js**; o `plan.md` escolheu React 19 + Vite 6 e o `research.md` rejeita o Next.js, reconhecendo que o README o citava como hipótese inicial. O README é igual nas duas pastas e ficou desatualizado.
- Metas inconsistentes entre artefatos: o LCP é “4G simulada” na constituição e “Fast 3G” no plano; a rolagem é 60 fps no PRD, na constituição e no plano, e 50 fps no SC-007 da spec.
- `visual-tokens.md` declara contrastes que não conferem com a fórmula WCAG: calculei 18,1:1 (declarado 16,1) para o texto primário, 10,2:1 (7,9) para o secundário, 4,1:1 (5,1) para o `--color-accent` e 7,0:1 (7,6) para o erro, todos contra `#0B0D11`. O acento a 4,1:1 passa o mínimo de componente (3:1) mas não o de texto normal (4,5:1), e o contrato o lista também para “CTA”.
- A spec termina com um link vazio `[](./PRD.md)` e o arquivo não existe (o PRD está no README). O `region-states.md` cita “FR-024 implícito”, mas a spec vai só até FR-021.
- `checklists/accessibility.md` está desatualizado: nenhum dos 29 itens foi marcado e as notas ainda tratam o FR-013 como pendente, embora o clarify já o tenha resolvido. O `requirements.md` diz que o clarify aplicou “mais quatro decisões” e lista seis requisitos.
- O `quickstart.md` usa pnpm 9 e parâmetros de URL (`?hero=loading`, `?reduce-motion=force`) que não aparecem na spec, no plano nem nos contratos; o `plan.md` lista `tasks.md`, que não existe, e nada de `src/` foi gerado.

---

## 🔗 Para ir além
- [Live de 27/05/2026 no repositório do curso](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-05-27)
- [Slide: SDD com agentes de IA em codebases enterprise (PDF)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/lives/2026-05-27/unipds-sdd-enterprise.pdf)
- [Estado final da live (001-pos-live)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-05-27/001-pos-live)
- [GitHub Spec Kit](https://github.com/github/spec-kit)

---

⬅️ [01 · Spec-Driven Development do zero: Constitution, spec, plan, tasks, implement e guardrails](./01-spec-driven-development-do-zero.md)  ·  [02 · Os três padrões de raciocínio: ReAct, Plan-and-Execute e Reflection](./02-tres-padroes-de-raciocinio.md) ➡️
