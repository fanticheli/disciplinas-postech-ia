# 08 · Spec-Driven Development com OpenSpec

> **Unidade 3 · Aula 2** · Leitura: ~8 min · Bloco: Monorepo, Spec-Driven Development e agentes

## 🎯 Em uma frase
Em vez de pedir código direto, o **Spec-Driven Development** cria primeiro uma especificação estruturada; o **OpenSpec** faz isso com **arquivos Markdown que funcionam como System Prompts** (skills) e gera **proposal, design e tasks**, inclusive dizendo o que não fazer.

---

## 👵 Explicando para a vovó

Pedir «crie um sistema de eventos técnicos» a um agente é como dizer a uma construtora «faça uma casa». Ela vai preencher as lacunas com as próprias suposições: quantos quartos, que material, onde fica a cozinha. Quanto mais lacunas, mais surpresas e mais retrabalho.

A especificação é a planta aprovada, com a lista de serviços e a lista do que não deve ser feito (não construir piscina). O OpenSpec é o caderno de modelos de planta que o agente recebe: sem magia, só papel bem organizado.

---

## 🔧 Tecnicamente

### O que é
- **O problema:** a falsa sensação de que uma frase simples gera um sistema correto. Quanto mais espaço para interpretação, mais alucinação, inconsistência arquitetural, retrabalho, desperdício de tokens, decisões erradas, requisitos implícitos e código desalinhado. Prompts estruturados (papel, regras, objetivo, formato) funcionam bem para tarefas pequenas, como um componente, um modal ou um DTO; features completas exigem mais.
- **Spec-Driven Development (SDD):** desenvolvimento guiado por especificações. A especificação, antes tratada como secundária no ágil («o código é a documentação»), volta a ser central porque agora se orientam agentes. Ela deixa de ser só documentação humana e vira contrato operacional entre pessoas e agentes, com ganho de assertividade, velocidade, qualidade, consistência e economia de tokens.
- **Ferramentas:** SpecKit, Kiro e OpenSpec compartilham a ideia de gerar artefatos estruturados que servem de base para os agentes. A aula usa o OpenSpec: open source, criado pela comunidade e agnóstico de fornecedor.
- **Sem mágica:** o OpenSpec instala um conjunto de skills em Markdown no projeto (exploração, proposta, design, aplicação, tasks), cada uma orientando o agente num contexto. É Prompt as Code: o comportamento do agente fica transparente, auditável e editável, e funciona com Antigravity, Claude, Codex, Cursor, Copilot e outros.
- **Explore:** um comando especial pede ao agente que mapeie o monorepo e gere um resumo da topologia (usando MCP do Nx, MCP do Angular e a estrutura do workspace), com diagramas ASCII. Útil como onboarding em projeto grande com documentação desatualizada.
- **A spec da feature:** módulo de submissão de palestras (Call for Papers). O prompt define objetivo, regras arquiteturais, frameworks, uso obrigatório de standalone components, Signals e acessibilidade ARIA, NestJS, compartilhamento do SpeakerDTO e obrigatoriedade de testes. E, importante, o que não fazer (criar autenticação, upload, banco desnecessário, regras não solicitadas), porque sem isso o agente inventa requisitos.
- **Três artefatos:** `proposal.md` (o quê e por quê: problema, objetivo, impacto, capacidades), `design.md` (como: decisões arquiteturais, requisitos funcionais e não funcionais, limitações, escolhas técnicas) e `tasks.md` (plano operacional dividido em back-end, front-end, integração e testes).
- **Revisão e versionamento:** os artefatos são uma primeira versão acelerada; o dev valida, revisa a arquitetura, completa regras e corrige lacunas. Depois são versionados no repositório: decisões revisáveis, specs novas, mudanças incrementais.
- **Mensagem da aula:** a IA não elimina engenharia de requisitos, aumenta a importância dela.

### Como funciona
- Instalar o OpenSpec no projeto para o agente escolhido (ele adapta os prompts ao agente).
- Explore: mapear o monorepo.
- Propose: escrever o prompt da feature com objetivos, regras e o que não fazer; o agente cria a mudança e os três artefatos.
- Revisar e ajustar proposal, design e tasks; só então implementar (próximo tópico).

### Onde aplicar
- Features que cruzam front, back, contratos, validação, testes e acessibilidade.
- Entrada de pessoas novas num projeto grande: o explore gera o mapa.
- Qualquer time que queira rastreabilidade de por que algo foi construído daquele jeito.

### Vantagens e limites
**Vantagens**
- Menos interpretação, menos retrabalho e menos tokens gastos em tentativas.
- Decisões e requisitos ficam documentados junto ao código.
- Agnóstico de agente e de IDE: as skills são arquivos que você pode ler e alterar.

**Limites**
- Exige disciplina de revisar e manter specs, senão elas apodrecem.
- Spec incompleta produz agente improvisando, inclusive em UX e identidade visual.

### 🚫 Armadilhas
- Prompt de uma frase para uma feature inteira.
- Esquecer de listar o que não deve ser feito.
- Aprovar proposal, design e tasks sem ler.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| SDD | Spec-Driven Development: a spec guia a implementação |
| OpenSpec | Ferramenta open source de SDD, agnóstica de agente |
| proposal.md | O quê e por quê da mudança |
| design.md | Como: decisões arquiteturais, requisitos, limitações |
| tasks.md | Plano de implementação com checkboxes |
| Skill | Arquivo Markdown de instruções que o agente carrega para um tipo de tarefa |
| Delta spec | Spec de uma mudança, que depois é sincronizada com as specs principais |

---

## 💻 No código do repo

**Projeto:** [modulo-03/cfp-platform (openspec e .agent)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform)

Os arquivos do OpenSpec na raiz do workspace: skills e workflows instalados em `.agent/` e as specs e mudanças em `openspec/`.

**Fluxo**
1. `.agent/skills/openspec-explore`, `-propose`, `-apply-change` e `-archive-change` (`SKILL.md` com `generatedBy: "1.2.0"` e requisito do CLI `openspec`) e `.agent/workflows/opsx-explore.md`, `opsx-propose.md`, `opsx-apply.md` e `opsx-archive.md` (comandos `/opsx:*`).
2. O workflow de propose cria a mudança com `openspec new change`, consulta `openspec status --change ... --json` e `openspec instructions <artifact> --json` e gera proposal, design e tasks em ordem de dependência. O de apply lê os arquivos de contexto, implementa as tarefas e troca `- [ ]` por `- [x]`. O de archive confere artefatos e tarefas, avalia a sincronização das delta specs e move a mudança para `archive/AAAA-MM-DD-nome`. O de explore é um modo de pensar que proíbe implementar.
3. `openspec/changes/archive/2026-03-31-add-cfp-feature/`: `.openspec.yaml` (`schema: spec-driven`, criada em 2026-03-28), `proposal.md`, `design.md` (não-objetivos: banco persistente, autenticação, upload), `tasks.md` (1 back-end, 2 front-end, 3 integração e verificação, todas marcadas) e `specs/cfp-submission/spec.md`.
4. Formato das specs: `### Requirement` e `#### Scenario` com `WHEN` e `THEN`, linguagem de obrigatoriedade (`MUST`, `SHALL`). A capability de submissão exige `POST /api/speakers` com validação (201 ou 400), signals iniciais, botão desabilitado em `loading` e ARIA com `role="alert"`.

**Como rodar**
- O CLI `openspec` não é dependência do projeto: instale-o à parte (veja openspec.dev) e use os comandos `/opsx:*` no agente que tiver as skills de `.agent/`.
- Para estudar sem rodar nada, leia na ordem proposal, design, tasks e spec da mudança arquivada.

**Armadilhas e achados no código**
- A skill `openspec-archive-change` manda invocar a skill `openspec-sync-specs` para sincronizar as specs, mas ela não está em `.agent/skills/` (só há quatro skills); a sincronização depende de algo que não veio no repositório.
- A skill de apply, como escrita, não filtra tarefas por área. O «apply só de back-end e shared» que a aula 3 mostra foi, provavelmente, feito por instrução no prompt (hipótese).
- As specs e tasks falam em «Jest» para o front-end, mas o frontend usa Vitest (`@angular/build:unit-test`; verifiquei ao rodar os testes). Pequeno drift entre spec e implementação.
- `openspec/specs/cfp-submission/spec.md` manteve o cabeçalho `## ADDED Requirements` de delta spec e já incorpora o requisito «Dashboard Navigation»; `openspec/specs/cfp-dashboard/spec.md` começa com `# Capability: CFP Dashboard`. Os dois arquivos principais não seguem o mesmo formato.
- A proposal do dashboard fala em «secure dashboard for administrators», e o design da mesma mudança declara autenticação como não-objetivo: texto e escopo não batem.

---

## 🔗 Para ir além
- [Repositório oficial: cfp-platform (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform)
- [OpenSpec](https://openspec.dev/)

---

⬅️ [07 · Fundação enterprise: Nx, shared-types e MCP](./07-fundacao-enterprise-nx-monorepo-shared-types.md)  ·  [09 · Git worktree, agentes em paralelo, integração e archive](./09-worktrees-agentes-paralelos-review-e-archive.md) ➡️
