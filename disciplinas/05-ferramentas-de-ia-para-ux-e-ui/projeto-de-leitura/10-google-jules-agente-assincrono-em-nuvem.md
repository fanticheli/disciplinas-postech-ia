# 10 · Google Jules: agente assíncrono em nuvem

> **Unidade 3 · Aula 5** · Leitura: ~7 min · Bloco: Monorepo, Spec-Driven Development e agentes

## 🎯 Em uma frase
Agente **assíncrono** trabalha como outro desenvolvedor: sobe uma VM efêmera, clona o repo, cria branch, roda testes e **abre um pull request**; você descreve uma tarefa objetiva e revisa o PR como o de qualquer colega.

---

## 👵 Explicando para a vovó

Até aqui o agente era como um colega sentado ao seu lado, mexendo no seu computador: se você desliga a máquina, ele para. Agora é como contratar um freelancer remoto: você manda um briefing claro, ele trabalha na própria casa e devolve um pacote pronto para você conferir.

Você não dá a ele a chave do cofre nem deixa mexer direto no que já está no ar. Ele entrega, você confere, e só então aceita.

---

## 🔧 Tecnicamente

### O que é
- **Local versus assíncrono:** no fluxo local o agente depende da sua máquina, do seu ambiente e da sua sessão. No assíncrono a ferramenta sobe o próprio ambiente, clona o repositório, cria uma branch, executa a tarefa, roda testes e abre um pull request. Existem várias ferramentas (a aula cita o Devin) e usa o Google Jules.
- **Jules:** conecta-se ao GitHub como um GitHub App, acessa os repositórios autorizados, cria branches, altera arquivos e abre PRs; também pode partir de issues do GitHub ou de integrações como o Jira.
- **Configuração do repositório:** o ambiente é efêmero, então ele precisa saber como preparar o projeto. Num monorepo Node com Nx, Angular e NestJS quase nada; em projetos reais pode exigir scripts de setup, dependências, variáveis e secrets. API keys, senhas e credenciais nunca vão em script ou arquivo: ficam em secrets. O raciocínio é o do onboarding: documentar para o agente o que documentaria para uma pessoa nova.
- **A tarefa da aula:** cadastro de local de evento no monorepo, com papel de desenvolvedora full stack sênior. Diretrizes: manter rigorosamente design system, cores e tokens do formulário de CFP; menu com exatamente três opções (cadastro de eventos, cadastro de palestras e dashboard); novo DTO compartilhado de evento; NestJS com controller e service para receber POST e guardar em memória; Angular com Reactive Forms e Signals; criar branch, implementar e abrir PR. Em produção, poderia ser separada em tarefas menores.
- **Mudança de postura:** no agente local se interage, ajusta e revisa passo a passo; no assíncrono passa-se uma tarefa específica e bem descrita e se deixa o agente trabalhar. Quanto mais objetiva e delimitada, melhor o resultado.
- **Execução:** o Jules sobe uma VM, clona, prepara o ambiente e monta um plano (DTO, API, componente, design system, navegação, testes e PR). Durante a execução altera arquivos, roda testes e registra evidências, inclusive abrindo o navegador no ambiente e gerando imagens ou pequenos registros do teste. Ele faz uma espécie de autorrevisão, que não substitui o code review humano.
- **Revisão:** baixou-se a branch, rodou-se com Nx e testou-se o cadastro. Os detalhes visuais (o menu) poderiam virar comentário no PR para o Jules corrigir numa nova iteração. O agente assíncrono é tratado como outro desenvolvedor: sem permissões irrestritas para produção, para a main ou para ambientes sensíveis. O fluxo seguro é branch, pull request, revisão e merge.
- **Mensagem final:** não existe uma única forma de usar IA: conversação para refinar, agentes locais para pair programming, múltiplos agentes com worktree para paralelizar, agentes na nuvem para delegar. A produtividade vem de combinar com critério.

### Como funciona
- Autorizar o GitHub App no repositório certo e criar a tarefa.
- Escrever o prompt com papel, diretrizes obrigatórias (design system, navegação, arquitetura, DTO, teste, branch e PR).
- Acompanhar o plano e as evidências; esperar o PR.
- Revisar como PR humano: baixar a branch, rodar, testar, comentar, pedir ajustes ou aprovar e fazer merge.

### Onde aplicar
- Features pequenas e bem delimitadas que podem esperar sem você: formulário novo, endpoint simples, refatoração mecânica.
- Equipes distribuídas que querem tratar o agente como mais um colaborador no fluxo de PR.

### Vantagens e limites
**Vantagens**
- Continua trabalhando sem a sua máquina ligada; paraleliza com seu trabalho.
- Entrega evidências (testes e imagens) que facilitam a triagem do PR.
- Usa o fluxo que o time já conhece: branch e PR.

**Limites**
- Precisa de ambiente reproduzível e secrets configurados, senão não roda.
- Menos interativo: tarefa mal descrita volta como PR errado.
- Autorrevisão não substitui a revisão humana.

### 🚫 Armadilhas
- Dar permissão irrestrita (main, produção, ambientes sensíveis).
- Colocar credenciais em script de setup em vez de secrets.
- Delegar uma tarefa vaga ou enorme demais.
- Aceitar o PR porque o agente disse que os testes passaram.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Agente assíncrono | Agente que roda fora da sua máquina e entrega por PR |
| VM efêmera | Ambiente temporário criado para executar a tarefa |
| GitHub App | Forma de o Jules acessar repositórios autorizados |
| Secrets | Cofre para credenciais que o agente precisa, fora do código |
| Reactive Forms | API de formulários do Angular baseada em `FormGroup` e validadores |

---

## 💻 No código do repo

**Projeto:** [modulo-03/cfp-platform (eventos)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform)

O que o PR do Jules deixou no repositório: contrato, API e tela de cadastro de evento. Não há registro do PR nem das evidências no repo, só o resultado.

**Fluxo**
1. `shared-types/src/lib/event.dto.ts`: `EventDTO` com `nome`, `endereco`, `capacidade` e `data`.
2. API: `create-event.dto.ts` (`@IsNotEmpty`, `@IsString`, `@IsNumber`, `@IsDateString`), `event.controller.ts` (`POST` e `GET /api/events`) e `event.service.ts` (array em memória).
3. Front: `event-registration.component.ts` usa `FormBuilder.nonNullable.group` com `nome`, `endereco`, `capacidade` (`Validators.min(1)`) e `data`; `onSubmit()` chama `markAllAsTouched()` se inválido e, senão, faz `POST /api/events` e controla o status por signal. O template mostra `.error-text` por campo, o botão «Cadastrar Evento» e a mensagem `.success-msg`.
4. Menu e rota: o `app.html` ganhou o link «Cadastro de Evento» (`/event/new`), que é o ponto de partida dos testes E2E do módulo 4.

**Como rodar**
- `npx nx serve frontend` e abra `/event/new`; cadastre um evento e confira com `GET /api/events` (os dados ficam em memória).

**Armadilhas e achados no código**
- Verifiquei contra a API compilada: `capacidade: -5` é aceito, porque o back só valida `@IsNumber`, enquanto o front exige mínimo 1; e campos extras também são armazenados (sem `whitelist`).
- Não há teste unitário para eventos, nem na API nem no front (os specs existentes cobrem app e speaker). O prompt da aula não pedia testes.
- O OpenSpec não foi usado nesta feature: em `openspec/changes/archive/` só há `add-cfp-feature` e `add-cfp-dashboard`.
- `capacidade` começa em `0` no formulário (`nonNullable`), e o `id` do evento sai de `Math.random()`.
- O formulário usa Reactive Forms (como pedia o prompt) enquanto o de submissão usa `ngModel`: dois estilos de formulário no mesmo app.

---

## 🔗 Para ir além
- [Repositório oficial: cfp-platform (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform)
- [Google Jules](https://jules.google/)

---

⬅️ [09 · Git worktree, agentes em paralelo, integração e archive](./09-worktrees-agentes-paralelos-review-e-archive.md)  ·  [11 · QA no Nx: Cypress tradicional e testes gerados por OpenSpec](./11-qa-no-nx-cypress-e-testes-gerados-por-openspec.md) ➡️
