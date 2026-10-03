# 00 · O agente de código por dentro: harness, modos e context engineering

> **Unidade 1 · Aulas 1 e 2** · Leitura: ~10 min · Bloco: Agentes de código e Spec-Driven Development

## 🎯 Em uma frase
Um LLM só gera texto; o **harness** (loop, ferramentas e regras) o torna **agente**. Operar um agente de código com método é **curar o contexto** e separar **instrução** (influencia o modelo) de **permissão** (aplicada pelo ambiente).

---

## 👵 Explicando para a vovó

Pense num estagiário muito rápido que lê tudo e obedece quase tudo. As instruções do projeto são o caderno de regras que ele relê toda manhã: quanto mais curto e objetivo, mais ele lembra. Já a permissão é a chave do armário: dizer “não mexa no armário” é instrução, trancar o armário é permissão.

O harness é o escritório em volta do estagiário: a mesa, o terminal, o chefe que aprova gastos. Sem ele, o estagiário só conversa; com ele, ele age.

---

## 🔧 Tecnicamente

### O que é
- **Agente x skill:** o agente recebe um objetivo, planeja e executa uma tarefa completa. A skill é uma capacidade atômica usada durante a execução (terminal, editor, Git, compilador). Ferramenta não tem autonomia: o agente é quem raciocina sobre o objetivo e escolhe como usá-las. O ciclo é perceber, raciocinar, agir e ajustar pelo resultado; num agente de código o ambiente é o repositório.
- **Autocomplete não é agente.** O agente é o Copilot Chat em Agent Mode. O que transforma o modelo em agente é o **harness**: o programa que executa o loop, disponibiliza ferramentas e aplica regras. Nos módulos anteriores o curso implementou esse loop; aqui se configura um harness maduro. A apostila diz que a ideia vale para Claude Code e Cursor, com adaptações de interface. O curso roda no Copilot gratuito (estudante com e-mail educacional elegível pode ter o Pro); o que importa é o modo agente.
- **Três modos no Copilot:** Ask (perguntas, sem alterar nada), Edit (edições dirigidas em arquivos) e Agent (planeja, altera vários arquivos, roda comandos e itera quando erra). Dentro do agente há duas estratégias: **interativa** (executa e pede permissão no caminho) e **planejamento** (lê o projeto, faz perguntas, registra um plano revisável e só depois implementa).
- **Prompt engineering x context engineering:** o primeiro escreve uma boa instrução para uma interação; o segundo gerencia todo o espaço de trabalho do agente (instruções permanentes, arquivos, resultados de ferramentas, histórico). Contexto é orçamento: informação irrelevante dilui a atenção (*context rot*). A regra é curar, não acumular.
- **Memória permanente do projeto:** o arquivo `.github/copilot-instructions.md` entra nas conversas do repositório. Deve ser curto e factual (a aula fala em cerca de 40 linhas): stack, comandos, estrutura de camadas, convenções, fluxo. Também existem instruções de workspace e de usuário.
- **Instruções com escopo:** arquivos de instruction com `applyTo` só entram quando o agente trabalha naquela parte do repo (por exemplo, a camada de service nunca importa HTTP). É especialização sob demanda, sem gastar contexto nas outras tarefas.
- **Instrução não é permissão.** Dizer ao modelo “não faça X” influencia a decisão; barrar X exige uma regra do ambiente. No VS Code isso é a auto-aprovação de terminal: uma **allow list** (testes, typecheck, git status/diff/add/commit) elimina pop-ups de rotina e uma **deny list** (remoção recursiva, privilégio elevado, ler `.env`, `git push --force`) continua exigindo um humano.

### Como funciona
- O setup do projeto `notas-api` é pedido no modo interativo, com as opções do `tsconfig`, os scripts e o `.gitignore` descritos à mão. O autor faz isso de propósito para medir a aderência do agente. O agente corrige erros de digitação do prompt, o que não dispensa conferir o diff.
- Um erro real vira aula: sem arquivos em `src`, o `tsc` devolve TS18003. O agente interpreta o feedback e propõe um arquivo placeholder; é o ciclo completo objetivo, ação, feedback, análise e nova ação.
- No modo de planejamento (um README, na demo) o agente lê `package.json` e `.gitignore`, pergunta o idioma, registra um plano editável e só implementa depois da aprovação. Tarefa pequena cabe no interativo; tarefa de várias decisões ou maior impacto pede plano.
- As regras de instruction devem ser testadas pedindo algo que as viole. Se uma regra nova não aparece, a apostila sugere abrir uma nova conversa para recarregar o contexto.
- O contrato de permissões é verificado nos dois sentidos: antes da allow list o teste pedia aprovação, depois roda direto; já `rm -rf node_modules` continua pedindo e é negado.

### Onde aplicar
- Qualquer repositório onde um agente de código opera: registrar stack, comandos e camadas em um arquivo curto em vez de repetir no prompt.
- Regras de arquitetura por pasta (controllers, repositories, adapters) via instructions com escopo.
- Reduzir fadiga de aprovação sem abrir mão de controle: allow para rotina previsível, deny para destrutivo.

### Vantagens e limites
**Vantagens**
- Convenções registradas uma vez reduzem repetição e ambiguidade em toda conversa do repositório.
- A permissão do ambiente funciona mesmo quando o modelo esquece ou interpreta mal uma instrução.
- O modo de planejamento dá um ponto de revisão antes de qualquer alteração no repositório.

**Limites**
- Instruction longa consome contexto de forma permanente e compete com a tarefa atual.
- Allow list larga demais enfraquece o deny: padrões de texto não são sandbox.
- Interfaces e nomes de configuração mudam entre versões do Copilot, Cursor e Claude Code.

### 🚫 Armadilhas
- Transformar o arquivo de instructions em manual: cada frase extra disputa atenção com a tarefa.
- Achar que “instruir” o modelo equivale a proibir: só a permissão do ambiente garante.
- Aceitar o resultado do agente sem abrir o diff e os comandos que ele pediu para rodar.
- Alterar uma instruction e continuar na mesma conversa sem checar se ela foi carregada.

> 💡 Abra e leia o que o agente gravou. Na Unidade 2, a instrução “siga o Spec Kit” virou uma frase genérica no arquivo e precisou ser reescrita com as etapas explícitas. A live de 27/05 mostra o mesmo harness com Claude Code: um único `CLAUDE.md` espelhado por symlink para `AGENTS.md`, `.cursorrules` e `.windsurfrules`. Veja o [tópico da live](./16-live-sdd-enterprise-and-spec-kit-catalog.md).

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Harness | Programa que executa o loop do agente, entrega ferramentas e aplica regras |
| Agente x skill | Agente decide e executa uma tarefa; skill é uma capacidade atômica que ele usa |
| Ask / Edit / Agent | Perguntar sem alterar, editar arquivos de forma dirigida, ou planejar e executar com iteração |
| Interativo x planejamento | Executar pedindo permissão no caminho, ou registrar um plano revisável antes de implementar |
| Context engineering | Gerenciar tudo que ocupa a janela do modelo, não só o prompt do momento |
| Context rot | Perda de foco do modelo quando o contexto acumula informação irrelevante |
| copilot-instructions.md | Memória permanente do repositório, curta e factual |
| applyTo | Escopo por glob de uma instruction, usada só quando o agente toca aqueles arquivos |
| Allow list / deny list | Comandos de terminal liberados automaticamente / que sempre exigem aprovação |

---

## 💻 No código do repo

**Projeto:** [01-arquitetura-de-agentes-de-codigo (notas-api)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/01-arquitetura-de-agentes-de-codigo)

Projeto-fundação do módulo: a notas-api, uma API HTTP e CLI de tarefas em Node 22, TypeScript ESM, Zod e node:test. Nesta aula o que importa são os artefatos de contexto e permissão em notas-api/.github e notas-api/.vscode.

**Fluxo**
1. `.github/copilot-instructions.md`: seções Stack (Node 22 LTS, TS ESM strict, Zod na fronteira, `node:test` via tsx, sem framework HTTP, `node:http` por design), Comandos, Estrutura (`src/domain`, `store`, `service`, `http`, `cli.ts`, `specs/`), Convenções (camadas não pulam: http/cli para service para store; Zod em toda entrada; erros de domínio; teste junto com a lógica; typecheck e test verdes; nunca commitar secrets nem ler `.env`) e Fluxo (`/especificar`, `/planejar`, `/tarefas`, `/implementar`).
2. `.github/instructions/service.instructions.md`: frontmatter `applyTo: "src/service/**"` e uma regra, funções puras e nunca importar de `src/http`.
3. `.vscode/settings.json`: `terminalCommandExecution.allowed` (`npm run dev`, `npm test`, `npm run *`, `npx tsc`, `node`, `git status`, `git diff`, `git add`, `git commit`) e `denied` (`rm -rf`, `sudo`, `git push --force`, `git push -f`, `git push` e leituras de `.env` por cat, less, more, head, tail, grep).
4. A estrutura que a regra de camadas descreve está em `src/`: `domain/task.ts` (schemas Zod), `store/task-store.ts` (interface), `service/task-service.ts`, `http/task-routes.ts` e `cli/commands.ts`. O detalhe do código é o tema do próximo tópico.

**Como rodar**
- `cd notas-api && npm ci`.
- `npm test` (42 testes passaram na minha execução com Node 22) e `npm run typecheck`.
- `npm run dev` sobe a API em `http://localhost:3000`; a CLI é `npm run cli -- task list`.

**Armadilhas e achados no código**
- O `settings.json` do notas-api é o mesmo do OpsPilot (o UNIDADE.md admite): lista `npm run arena` e `npm run bench`, scripts que o notas-api não tem.
- As entradas `node` e `npm run *` da allow list são largas: provavelmente permitem rodar qualquer código por `node -e` ou por um script npm. A deny list é por padrão de texto, não sandbox (hipótese; não testei dentro do Copilot).
- O `copilot-instructions.md` ainda diz “persistência in-memory”, mas a CLI ganhou uma store em JSON; o README pede Node 20+ enquanto as instructions pedem Node 22; a seção “Estrutura atual” do README está desatualizada.
- O chat mode revisor (`/revisar`) previsto no roteiro não está no repositório (UNIDADE.md), apesar de a apostila anunciar “revisor e delegação”.

---

## 🔗 Para ir além
- [Snapshot da Unidade 1 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/01-arquitetura-de-agentes-de-codigo)
- [UNIDADE.md da Unidade 1](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/01-arquitetura-de-agentes-de-codigo/UNIDADE.md)

---

⬅️ [README](./README.md)  ·  [01 · Spec-Driven Development do zero: Constitution, spec, plan, tasks, implement e guardrails](./01-spec-driven-development-do-zero.md) ➡️
