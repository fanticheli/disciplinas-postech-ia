# 09 · Git worktree, agentes em paralelo, integração e archive

> **Unidade 3 · Aulas 3 e 4** · Leitura: ~9 min · Bloco: Monorepo, Spec-Driven Development e agentes

## 🎯 Em uma frase
**Git worktree** dá a cada agente um diretório físico e uma branch próprios no mesmo repositório; a **spec** é o mecanismo de orquestração (cada agente aplica uma parte); depois vem **integração, validação humana e archive**, porque gerar código é só o começo.

---

## 👵 Explicando para a vovó

Imagine dois pintores contratados para a mesma casa. Se os dois trabalham no mesmo cômodo ao mesmo tempo, um pisa na tinta do outro. Se cada um recebe um andar com chave própria, trabalham sem se atrapalhar, e no fim o dono confere os dois andares e junta tudo.

O worktree é o andar com chave própria; a spec é a lista do que cada pintor deve fazer; e o archive é o caderno em que o dono anota o que foi feito e por quê, para o próximo contrato partir daí.

---

## 🔧 Tecnicamente

### O que é
- **O risco do paralelo:** vários agentes na mesma base causam sobrescrita de arquivos, conflitos, inconsistências, mudanças acidentais, perda de contexto e problemas de merge. Precisa-se de isolamento.
- **Git worktree:** funcionalidade antiga do Git, pouco usada até a IA, que cria múltiplos workspaces físicos ligados ao mesmo repositório, cada um apontando para uma branch. Não é cópia do projeto: todos compartilham o mesmo banco do Git. Serve também para humanos trabalhando em contextos separados.
- **Agent Manager do Antigravity:** evolui do «chat integrado» para orquestração: abre vários workspaces e atribui tarefas independentes. Cada agente tem contexto, branch, workspace e tarefas próprios. Na aula, dois worktrees: API e UI.
- **Spec como mecanismo de orquestração:** as tasks já estavam divididas em front-end, back-end e shared types. O agente da API aplicou só back-end e shared; o do front aplicou só front-end. O prompt fica pequeno porque requisitos, arquitetura, tasks e restrições já existem na spec, o que também economiza tokens.
- **O que os agentes entregaram:** o front criou componente Angular, rota `submit-talk` (no repo final a tela está em `/talks/new`), integração com Signals, ARIA e mocks temporários (como em times reais, em que o front avança sem a API pronta); o back criou DTOs, validações, controllers, services e integração com class-validator.
- **Custo e modelos:** o agente do back falhou com o modelo Flash por limite de output. Modelos menores são mais baratos e rápidos para tarefas simples; modelos maiores têm mais contexto e raciocínio. Estratégia citada: modelos fortes para planejamento, arquitetura e raciocínio complexo, baratos para execução repetitiva.
- **Validação e lacunas de spec:** o Antigravity rodou testes, abriu navegador e verificou rotas, mas o agente criou o design visual por conta própria, porque a spec não detalhava UX e identidade visual. Se quiser controle fino, a spec precisa trazer Figma, tokens, layout e padrões de design. O papel do dev vira o de arquiteto, orquestrador, revisor, integrador e validador.
- **Integração (aula 4):** geração é só o começo. Criou-se uma branch de integração (Integrate CFP Feature) e fez-se o merge das duas branches: para o Git, worktrees são branches normais, então merge, commit e revisão seguem como sempre. Subiu-se front e back, fez-se uma submissão e validou-se o fluxo completo: código que compila não é feature pronta.
- **Archive:** a spec vira baseline histórica; futuras specs consideram requisitos, arquitetura, decisões e padrões anteriores. Git versiona arquivos e sabe o que mudou; OpenSpec versiona contexto semântico e sabe por quê. A spec gera o código, o código atualiza a spec e a spec arquivada alimenta as próximas.
- **Segunda feature, dashboard:** em vez de «crie uma tela de dashboard», especificou-se rota GET no NestJS retornando `SpeakerDTO`, componente Angular com HttpClient e Signals, identidade visual, tokens e navegação. O agente consultou os MCPs do Angular e do Nx e percebeu sozinho que precisava extrair tokens do formulário original, graças ao contexto acumulado (specs arquivadas, design system, histórico).
- **Um agente basta quando basta:** o apply do dashboard usou um único agente; paralelizar é estratégia, não obrigação, e depende de complexidade, tamanho, isolamento possível, dependências e custo. O agente tentou `npm run test`, percebeu que o projeto é Nx e corrigiu os comandos; usou o navegador automatizado (preencheu formulário, submeteu, navegou ao dashboard, inspecionou o DOM, executou asserts). A aprovação final continua sendo do desenvolvedor.
- **Limpeza:** removem-se worktrees, branches temporárias e ambientes auxiliares para não acumular lixo operacional.

### Como funciona
- Criar um worktree por frente (API e UI), cada um com sua branch, e abri-los no Agent Manager.
- Aplicar à spec só as tasks de cada frente (back-end e shared num agente, front-end no outro) com um prompt curto.
- Aprovar o plano de cada agente, deixar executar, revisar.
- Voltar à branch principal, criar a branch de integração, fazer merge das duas, subir tudo e validar à mão.
- Arquivar a spec e remover worktrees e branches temporárias.

### Onde aplicar
- Features com front e back separáveis por contrato (o DTO compartilhado define a fronteira).
- Experimentos com mais de um agente ou modelo na mesma tarefa, em diretórios isolados.
- Manter a spec viva como memória do projeto entre features.

### Vantagens e limites
**Vantagens**
- Isolamento físico sem duplicar o repositório e sem mudar o fluxo de merge e revisão.
- A spec arquivada dá continuidade de contexto às próximas features.
- Prompts curtos: o contexto está na spec.

**Limites**
- Paralelizar custa mais (tokens e modelos) e exige integração cuidadosa.
- Agentes isolados tomam decisões visuais próprias se a spec for silenciosa.

### 🚫 Armadilhas
- Dois agentes no mesmo diretório.
- Usar o mesmo modelo para planejar e para codar sem olhar custo e limite de output.
- Considerar pronto porque compilou, sem validar o fluxo completo.
- Esquecer de arquivar a spec e de limpar worktrees e branches.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Git worktree | Vários diretórios de trabalho do mesmo repositório, cada um numa branch |
| Agent Manager | Painel do Antigravity para atribuir tarefas a agentes em vários workspaces |
| Apply | Comando do OpenSpec que implementa as tasks de uma mudança |
| Archive | Move a mudança para o histórico e consolida a spec como baseline |
| Branch de integração | Branch em que se juntam e validam os resultados paralelos |
| Mock temporário | Dado simulado no front enquanto a API não está pronta |
| git worktree add | Comando padrão do Git para criar o workspace (a apostila não mostra o comando literal) |

---

## 💻 No código do repo

**Projeto:** [modulo-03/cfp-platform (speakers, dashboard e telas)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform)

O resultado das duas frentes paralelas (API de speakers e telas de submissão) e da feature seguinte (dashboard), já integradas no mesmo workspace. O repositório guarda o resultado, não os worktrees.

**Fluxo**
1. API: `api/src/app/create-speaker.dto.ts` (`implements Omit<SpeakerDTO, 'id'>` com `@IsNotEmpty`, `@IsString`, `@IsEmail` e `@IsBoolean`), `speaker.controller.ts` (`@Controller('speakers')`, `POST` com `ValidationPipe({ transform: true })` e `GET`), `speaker.service.ts` (array em memória; id por `Math.random().toString(36)`) e `app.module.ts`. O `speaker.controller.spec.ts` usa o `ValidationPipe` com `whitelist: true` e espera `BadRequestException` para payload inválido.
2. Front, submissão: `cfp-submission.component.ts` com signals `name`, `email`, `talkTitle`, `isGDE`, `submissionStatus` (`'idle' | 'loading' | 'success' | 'error'`) e `errorMessage`; `submit()` faz `POST /api/speakers` e trata sucesso e erro. O template usa `[(ngModel)]` sobre os signals, `aria-labelledby`, `aria-required`, `role="alert" aria-live="polite"` e desabilita o botão em `loading`. O spec tem três testes (signals iniciais e botão bloqueado).
3. Front, dashboard: `cfp-dashboard.component.ts` com signals `submissions`, `isLoading` e `error`; `ngOnInit` faz `GET /api/speakers`. O template alterna `@if` e `@else if` entre loading (`role="status"`), erro com Retry (`role="alert"`), vazio e tabela com `scope="col"` e badge GDE.
4. Navegação: `app.html` com três links (`routerLinkActive`) para `/event/new`, `/talks/new` e `/dashboard`; `app.routes.ts` com rotas lazy e redirecionamento para o dashboard; `provideHttpClient()` em `app.config.ts`.
5. Rastro da spec: `openspec/changes/archive/2026-03-31-add-cfp-dashboard/` (proposal, design, tasks, delta specs) e as specs consolidadas em `openspec/specs/`.

**Como rodar**
- `npx nx serve frontend` e abra `/talks/new`; envie uma proposta e confira em `/dashboard` (os dados somem ao reiniciar a API).
- `npx nx test api` e `npx nx test frontend` (verifiquei: 5 e 4 testes passam).

**Armadilhas e achados no código**
- Verifiquei contra a API compilada: `POST /api/speakers` aceita campos extras (enviei `x: 1` e ele foi armazenado e devolvido), porque o `ValidationPipe` dos controllers não usa `whitelist`; só o teste usa.
- A API devolve `message` como array nos erros 400 do class-validator (verifiquei); o front trata `err.error?.message` como string, então a UI mostra a lista concatenada, em inglês.
- As três telas copiam o mesmo CSS «glass» (473 linhas no total) com cores literais (#1c1c1e, #ff8a00, #e52e71...) e nenhum `var(--...)`. A spec do dashboard pede «reusar tokens», mas o que existe é valor copiado, não token.
- Mistura de idiomas na UI: submissão e dashboard em inglês, cadastro de evento em português.
- `frontend-e2e/src/example.spec.ts` (Playwright) é o exemplo padrão do Nx: espera um `h1` com «Welcome», que o app não tem. Não executei o Playwright; pela leitura, o teste falharia.
- Comentários do tipo «Task 2.2» e «Task 2.4» no componente de submissão são vestígio do `tasks.md` gerado pelo agente.

---

## 🔗 Para ir além
- [Repositório oficial: cfp-platform (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform)
- [OpenSpec](https://openspec.dev/)

---

⬅️ [08 · Spec-Driven Development com OpenSpec](./08-spec-driven-development-com-openspec.md)  ·  [10 · Google Jules: agente assíncrono em nuvem](./10-google-jules-agente-assincrono-em-nuvem.md) ➡️
