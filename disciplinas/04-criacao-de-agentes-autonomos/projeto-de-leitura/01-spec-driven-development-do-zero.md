# 01 · Spec-Driven Development do zero: Constitution, spec, plan, tasks, implement e guardrails

> **Unidade 1 · Aulas 3, 4 e 5** · Leitura: ~11 min · Bloco: Agentes de código e Spec-Driven Development

## 🎯 Em uma frase
SDD troca “pedir a feature num chat” por artefatos versionados (**Constitution, Specify, Plan, Tasks, Implement**) com revisão humana entre as fases, mais guardrails **determinísticos** (deny list e pre-commit): uma instrução pode ser esquecida, um hook não.

---

## 👵 Explicando para a vovó

É como reformar a casa com contrato, planta, cronograma e obra por etapas, em vez de dizer ao pedreiro “faz uma cozinha bonita” e voltar no fim do dia. Cada papel fica no disco, e se o pedreiro trocar, o próximo lê a planta.

O pre-commit é o porteiro que não deixa sair da obra com a prumada torta, mesmo que o pedreiro tenha esquecido a regra.

---

## 🔧 Tecnicamente

### O que é
- **Por que SDD:** quando o agente é potente, o gargalo deixa de ser programar e vira dizer com precisão o que se quer. Uma conversa tem janela de contexto e uma sessão nova pode não conhecer decisões anteriores. Os artefatos em disco sobrevivem à troca de chat, de ferramenta (a Unidade 2 troca Copilot por Cursor no meio) e entram em pull request.
- **Cinco fases:** Constitution (princípios não negociáveis), Specify (o quê e por quê), Plan (como), Tasks (unidades pequenas, ordenadas e testáveis) e Implement. Cada fase gera um artefato revisável.
- **A spec:** contexto e problema, user stories (papel, objetivo, benefício), requisitos funcionais numerados, critérios de aceite em **EARS** (“quando evento, o sistema deve resposta”), fora de escopo e questões em aberto. A apostila lembra que a spec não é fonte de verdade eterna: o código e os testes dizem o estado real, a spec ancora a intenção.
- **Os quatro prompts do framework artesanal:** a Constitution é criada sem alterar arquivos existentes (senão o agente a mistura às instructions) e os prompts rodam em modo agente; depois de criá-los, abre-se um chat novo para o Copilot reconhecê-los. **Specify** lê a Constitution, não escreve código nem decide implementação, numera a spec (próximo número livre) e pergunta se algo estiver ambíguo. **Plan** lê spec e Constitution e registra arquitetura e camadas, arquivos a criar ou alterar, modelo de dados (tipos e schemas Zod), contratos externos (rotas, comandos), decisões e trade-offs, estratégia de testes, riscos e pontos que pedem decisão humana. **Tasks** gera tarefas pequenas (um commit), com forma de verificar, dependências explícitas e marcação de progresso. Nenhum dos três implementa nada.
- **Constitution x instructions:** a Constitution é um contrato relido a cada fase; as instructions são a memória do projeto. Os princípios se repetem de propósito, mas os papéis são diferentes.
- **Menor privilégio por fase:** quem só especifica não precisa editar código-fonte. A sintaxe de limitar ferramentas varia por versão e deve ser confirmada na documentação.
- **Implementar uma tarefa por vez:** o agente pega a próxima tarefa com dependências prontas, implementa com teste, roda testes e typecheck, só marca como concluída com tudo verde e para para revisão. Regras explícitas: nunca desativar teste nem enfraquecer tipos para passar, e parar e avisar se a spec estiver errada.
- **Guardrails em camadas:** a deny list controla comandos perigosos; o pre-commit roda typecheck e testes antes de aceitar o commit e funciona no terminal comum, fora do chat; uma terceira camada poderia ser CI. Permissão responde “esta ação pode rodar?”; guardrail determinístico responde “o resultado continua válido?”.
- **Contexto estruturado:** com spec, plano, tarefas e instructions, o agente consulta o artefato de cada etapa em vez de deduzir a intenção de uma conversa longa. A apostila diz que isso pode reduzir o desperdício de tokens; o ponto é usar o contexto com mais eficiência, não gastar menos por gastar menos.
- **Outros frameworks:** a aula constrói o framework na mão e aponta equivalentes prontos: GitHub Spec Kit (adotado a partir da Unidade 2), OpenSpec (mais leve) e BMAD Method (simula papéis de uma equipe).

### Como funciona
- **Spec 001 (gerenciar tarefas via HTTP e CLI):** o agente encontra uma ambiguidade (concluir tarefa já concluída?) e pergunta; a decisão é idempotente. O plano nasce sem a numeração da spec no nome do arquivo; o autor corrige o prompt de planejamento, não o arquivo, porque está construindo um processo reutilizável. As tarefas são cinco: domínio e store, service e erros, HTTP, CLI, integração e validação.
- Na implementação o agente respeita as camadas e a instruction de funções puras no service. A validação roda no service com Zod, erros previsíveis viram classes de domínio e a borda HTTP os traduz (400, 404). HTTP usa `node:http` com regex de caminho; HTTP e CLI chamam o mesmo service. Os testes crescem a cada tarefa, não no fim.
- **Pre-commit:** o autor força uma incompatibilidade de tipos, tenta o commit, vê o typecheck falhar e só então pede a correção.
- **Spec 002:** a CLI perde o estado porque cada execução é um processo novo e a store é em memória. A solução é um arquivo JSON, e o caminho padrão fica como questão em aberto. Como o JSON é fronteira externa, o plano pede validação ao carregar. Durante a implementação o agente desvia para SQL e chave estrangeira; a revisão humana percebe e o fluxo volta ao JSON.
- **Exercício deixado:** uma spec 003 para CLI e HTTP usarem a mesma fonte de dados. Ela não existe no repositório.

### Onde aplicar
- Features com várias regras e arquivos, onde o contexto de uma conversa não basta.
- Equipes que revisam por PR: spec, plano e tarefas pequenas tornam a revisão do código gerado viável.
- Qualquer projeto com agente onde “testes e tipos verdes” precisa valer mesmo quando o modelo esquece.

### Vantagens e limites
**Vantagens**
- Ambiguidades aparecem antes do código, nas questões em aberto da spec.
- Tarefas pequenas (um commit cada) são fáceis de revisar e reverter.
- O processo é independente da ferramenta, como mostra a troca de agente no meio da Unidade 2.

**Limites**
- Mais artefatos e mais cerimônia, desproporcional para uma mudança de uma linha.
- O agente ainda desvia (o desvio para SQL na spec 002); o processo só torna o desvio visível.
- Spec e plano envelhecem se não forem atualizados quando a decisão muda.

### 🚫 Armadilhas
- Esquecer de ativar o hook: ele só vale com `git config core.hooksPath .githooks` e nada no repositório automatiza isso.
- Deixar a spec descrever implementação (a fase Specify não deve decidir como).
- Marcar tarefa como feita sem testes e typecheck passando.
- Tratar o hook local como única barreira: a própria aula cita CI como terceira camada.

> 💡 A Aula 5 se chama “Guardrails, Revisor e Delegação”, mas o texto da apostila cobre a spec 002 e o exercício da spec 003. Revisor e delegação (issue até PR) não são desenvolvidos na apostila nem no repositório.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| SDD | Spec-Driven Development: especificar, planejar, quebrar em tarefas e só então implementar |
| Constitution | Princípios não negociáveis relidos em cada fase do fluxo |
| EARS | Formato de critério de aceite: quando um evento ocorrer, o sistema deve responder de tal forma |
| Menor privilégio por fase | Cada fase recebe só as capacidades de que precisa |
| Pre-commit | Hook do Git que roda typecheck e testes antes de aceitar o commit |
| Guardrail determinístico | Verificação executada independentemente da decisão do modelo |
| Spec Kit / OpenSpec / BMAD | Frameworks prontos de SDD, do mais estruturado ao mais leve |

---

## 💻 No código do repo

**Projeto:** [01-arquitetura-de-agentes-de-codigo (notas-api e specs)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/01-arquitetura-de-agentes-de-codigo)

O framework de SDD feito à mão (constitution, quatro prompt files e hook) e as duas features que ele produziu: gerenciamento de tarefas com HTTP e CLI (spec 001) e persistência da CLI em JSON (spec 002). Os testes passaram em 42 execuções locais (Node 22).

**Fluxo**
1. `specs/constitution.md`: sete princípios (camadas explícitas, validação na fronteira, erros de domínio, teste é parte da tarefa, segurança por padrão, spec antes de código, pequeno e reversível) e a stack obrigatória.
2. `.github/prompts/{especificar,planejar,tarefas,implementar}.prompt.md`, todos com `mode: agent`: `planejar` e `tarefas` resolvem “001” para `specs/001-*-spec.md` e gravam arquivos irmãos `-plan.md` e `-tasks.md`; `implementar` escolhe a próxima `- [ ]` com dependências prontas, só marca `[x]` com testes e tipos verdes e para para revisão.
3. `specs/001-gerenciamento-de-tarefas-{spec,plan,tasks}.md` e `specs/002-persistencia-cli-json-*`: as cinco tarefas de cada feature estão marcadas como concluídas.
4. `src/domain/task.ts` (schemas Zod e tipos), `src/store/task-store.ts` (interface) com `in-memory-task-store.ts` e `json-file-task-store.ts`, `src/service/task-service.ts` (valida com Zod e converte `ZodError` em `TaskValidationError`; ausência vira `TaskNotFoundError`), `src/http/task-routes.ts` com `http-errors.ts` e `src/cli/commands.ts`.
5. `src/factories/task-app.ts`: `createTaskApp(store = new InMemoryTaskStore())` compõe service e handler HTTP. `src/cli.ts` injeta `JsonFileTaskStore` (caminho de `TASK_CLI_STORE_PATH` ou `.tasks-cli-store.json`); `src/index.ts` mantém a store em memória, como pede o RF-8 da spec 002.
6. `JsonFileTaskStore` valida o arquivo com Zod ao carregar e grava em arquivo temporário seguido de `renameSync` (escrita atômica); falhas viram `TaskStorePersistenceError` com mensagem legível e saída diferente de zero.
7. `.githooks/pre-commit`: `npm run typecheck` e depois `npm run test`, com `set -e`.

**Como rodar**
- `npm ci`, `npm test` (42 testes) e `npm run typecheck`.
- `git config core.hooksPath .githooks` para ativar o hook.
- `npm run cli -- task create --title "Comprar leite"` e depois `npm run cli -- task list`: o segundo processo enxerga a tarefa porque a CLI persiste em JSON.
- `npm run dev` para a API HTTP em memória (`POST /tasks`, `GET /tasks?status=open`, `PATCH /tasks/:id/complete`, `DELETE /tasks/:id`).

**Armadilhas e achados no código**
- O hook só vale depois do `git config core.hooksPath`; o `package.json` não tem script de instalação. O arquivo não tem shebang; no meu teste em Linux o Git executou o hook mesmo assim.
- `.tasks-cli-store.json`, com uma tarefa de teste (“Criar novo agente”), está commitado e fora do `.gitignore`.
- O README pede Node 20+ e as instructions Node 22; a seção “Estrutura atual” do README mostra só `src/`, sem o conteúdo; o `package.json` não declara `engines`. As versões do `package.json` (TypeScript ^7, @types/node ^26) instalaram e o typecheck passou.
- A CLI e a API HTTP usam stores diferentes por decisão da spec 002; compartilhar a fonte é o exercício 003, que não está no repositório.
- A apostila fala em CI como terceira camada, mas o notas-api não tem workflow.
- Os quatro prompt files têm só `mode: agent` e `description` no cabeçalho: não há restrição de ferramentas por fase, então o “menor privilégio por fase” da Aula 3 não está aplicado no repositório (a apostila já avisa que a sintaxe varia por versão).

---

## 🔗 Para ir além
- [Snapshot da Unidade 1 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/01-arquitetura-de-agentes-de-codigo)
- [GitHub Spec Kit](https://github.com/github/spec-kit)

---

⬅️ [00 · O agente de código por dentro: harness, modos e context engineering](./00-agente-de-codigo-harness-e-context-engineering.md)  ·  [02 · Os três padrões de raciocínio: ReAct, Plan-and-Execute e Reflection](./02-tres-padroes-de-raciocinio.md) ➡️
