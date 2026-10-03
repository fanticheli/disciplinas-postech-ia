# 11 · QA no Nx: Cypress tradicional e testes gerados por OpenSpec

> **Unidade 4 · Aula 1** · Leitura: ~8 min · Bloco: QA AI-Native: Cypress e Playwright MCP

## 🎯 Em uma frase
Testes também são requisitos: uma **spec do OpenSpec** descreve os cenários E2E (sucesso e erro), o agente gera o **Cypress tradicional** no Nx e os **seletores frágeis** viram o gancho para a próxima aula.

---

## 👵 Explicando para a vovó

Quanto mais rápido a fábrica produz, mais rápido precisa funcionar o controle de qualidade. Um robô conferindo todas as peças do mesmo jeito, todo dia, sem cansar, é o teste automatizado.

Mas se o robô reconhece a peça pela cor da etiqueta e alguém troca a etiqueta, ele para a linha mesmo com a peça perfeita. Isso é o teste frágil: quebra por um detalhe que o cliente nem percebe.

---

## 🔧 Tecnicamente

### O que é
- **IA não elimina testes:** quanto mais rápido se gera código com agentes, mais importante é garantir segurança, regressão e validação automatizada. Se produz mais rápido, é preciso validar mais rápido.
- **E2E:** unitários validam partes isoladas; integração valida comunicação; E2E trabalha do ponto de vista do usuário: abrir navegador, acessar rota, preencher, clicar, validar mensagem e comportamento visual. Detecta erro de integração entre front e back, falha de navegação, quebra de formulário, inconsistência de UX e regressão de fluxo crítico.
- **QA moderno:** quem conhece regra de negócio, cenários críticos e casos de erro passa a gastar menos tempo na execução repetitiva e mais na criação de cenários de validação; a barreira de entrada da automação cai, mesmo para quem não domina o framework.
- **Cypress:** framework E2E popular e maduro, que sobe a aplicação, abre um navegador real ou headless e simula um usuário. A estrutura é a de qualquer teste: preparar estado, executar ação, validar resultado. No Nx, o plugin do Cypress entende as aplicações, scripts e dependências; como front, back e contratos estão no mesmo repositório, o agente enxerga o sistema e acerta mais.
- **Testes como spec:** o OpenSpec não serve só para funcionalidades. A spec `createEventTest` (no repo, a mudança se chama `create-event-tests`) definiu objetivo, cenários, regras e restrições: sucesso (navegar até `event-new`, preencher, enviar, validar mensagem de sucesso) e erro (enviar vazio, validar mensagens). Restrição explícita: sintaxe tradicional do Cypress (`get`, `contains`, `should`) e nenhuma biblioteca externa.
- **BDD implícito:** a spec saiu estruturada como dado, quando, então. O apply detectou que o projeto já tinha Playwright e propôs coexistência com Cypress; depois configurou o Cypress no Nx, ajustou o ESLint, criou o projeto E2E, gerou os testes e os executou. Rodaram em modo headless pelo Nx e também no modo visual.
- **Fragilidade:** o teste gerado seleciona por classe CSS e por texto da mensagem. Funciona, mas é frágil: mudança de texto, de classe ou ajuste visual quebra o teste mesmo com o fluxo funcionando. Remédio clássico: instrumentar o front com atributos de automação (`data-cy`, `data-testid`). Testabilidade também faz parte do design da aplicação.
- **O que fica:** Cypress no Nx, coexistência com Playwright, spec de testes, cenários de sucesso e erro, execução headless e visual. Testes também fazem parte do fluxo assistido por IA.

### Como funciona
- Instalar o plugin do Cypress no workspace Nx.
- Escrever a spec de teste (objetivo, cenários, regras, restrições) e deixar o OpenSpec gerar proposal, design e tasks.
- Aplicar a spec: o agente configura o projeto E2E e gera os testes.
- Rodar headless pelo Nx e abrir o Cypress visual para depurar.
- Revisar os testes: seletores, mensagens esperadas e critérios de aceite.

### Onde aplicar
- Cobrir fluxos críticos (cadastro, checkout, login) logo após o agente gerar a feature.
- Deixar que o QA descreva cenários em linguagem de negócio e use o agente para virar automação.
- Montar regressão antes de uma refatoração grande.

### Vantagens e limites
**Vantagens**
- Cenários vêm de uma spec explícita, com critérios claros.
- O monorepo dá ao agente as mensagens e componentes reais para escrever asserts corretos.
- Roda como Cypress normal: barato e previsível no CI, sem depender de IA na execução.

**Limites**
- Seletores por classe, ID e texto geram flaky tests.
- Teste gerado por IA ainda precisa de critérios de aceite e revisão.
- Coexistir Cypress e Playwright dobra configuração.

### 🚫 Armadilhas
- Aceitar seletores por classe CSS como se fossem estáveis.
- Deixar a spec de teste vaga («teste a tela de eventos»).
- Achar que, com IA, teste é opcional.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| E2E | Teste de ponta a ponta pela interface, como um usuário |
| Flaky test | Teste instável que quebra por mudanças não funcionais |
| headless | Execução do navegador sem interface gráfica |
| data-cy / data-testid | Atributos estáveis feitos para automação |
| BDD | Descrição por dado, quando, então |
| Regressão | Verificar se o que funcionava continua funcionando |

---

## 💻 No código do repo

**Projeto:** [modulo-04/cfp-plataform_v1/cfp-platform_v1](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-04/cfp-plataform_v1/cfp-platform_v1)

O mesmo workspace do módulo 3 com Cypress, a mudança `create-event-tests` do OpenSpec e o teste tradicional de cadastro de evento. A pasta cobre as três aulas da unidade 4; este tópico usa a parte tradicional.

**Fluxo**
1. `openspec/changes/create-event-tests/`: `.openspec.yaml` (criada em 2026-04-05), `proposal.md` (capability `event-registration-e2e`), `design.md` (seletores `#nome`, `#endereco`, `#capacidade`, `#data` e `.submit-btn`; não-objetivo: bibliotecas de IA), `tasks.md` (inclui «Rule of Gold Compliance»: usar só `cy.get`, `cy.contains` e `should`) e `specs/event-registration-e2e/spec.md` (cenários de sucesso e de formulário vazio em dado, quando, então).
2. `frontend-e2e/cypress/e2e/event-registration.cy.ts`: `beforeEach` visita `/event/new`; o teste de sucesso digita nos quatro campos, clica em `.submit-btn` e espera `.success-msg` visível com «Evento cadastrado com sucesso!»; o de formulário vazio espera quatro `.error-text` com as mensagens exatas do front.
3. `frontend-e2e/cypress.config.ts`: `nxE2EPreset`, `baseUrl: 'http://localhost:4200'` e um `projectId` (Cypress Cloud). Suporte padrão em `cypress/support/` e fixture de exemplo.
4. `nx.json` ganhou o plugin `@nx/cypress/plugin` (targets `e2e`, `open-cypress`, `component-test` e `e2e-ci`); o `package.json` ganhou `@nx/cypress`, `cypress ^15.8.0` e `eslint-plugin-cypress`.

**Como rodar**
- `npm install` (o `npm ci` falha como no módulo 3). O instalador do Cypress baixa o binário; se quiser só instalar sem baixá-lo, `CYPRESS_INSTALL_BINARY=0` (usei assim para inspecionar a configuração; não executei os testes).
- Terminal 1: `npx nx serve frontend` (sobe API e front). Terminal 2: `npx nx e2e frontend-e2e` (`cypress run`) ou `npx nx run frontend-e2e:open-cypress`.

**Comparação com o módulo anterior (template versus versão evoluída)**
`modulo-03/cfp-platform` é o ponto de partida e `modulo-04/.../cfp-platform_v1` é o mesmo código com QA. Comparei as duas pastas com um `diff` recursivo: as únicas diferenças são `@nx/cypress`, `cypress` e `eslint-plugin-cypress` no `package.json`, o plugin e as exclusões de `cypress/**` no `nx.json`, o `eslint.config.mjs` do `frontend-e2e`, `cypress.config.ts` e a pasta `cypress/`, a mudança `create-event-tests`, a pasta `.playwright-mcp/` e, como consequência das dependências novas, o `package-lock.json`. API, front, shared-types e as specs principais do OpenSpec são idênticos.

**Armadilhas e achados no código**
- Verifiquei com `nx show project frontend-e2e`: os plugins do Playwright e do Cypress definem ambos o target `e2e`; o do Cypress vence (`cypress run`) e o Playwright ficou acessível só por `e2e-ci` (`example.spec.ts`). O target `e2e` não tem `dependsOn`: ele não sobe front e API sozinho.
- A mudança `create-event-tests` não foi arquivada e todas as tasks seguem `[ ]`, embora o teste exista. Os caminhos divergem: proposal e design citam `frontend-e2e/src/e2e/event-registration.cy.ts`, mas o arquivo real está em `frontend-e2e/cypress/e2e/`.
- A spec diz «native validation error messages» e usa campos `name`, `address`, `capacity` e `date`; o app usa validação do Angular com `.error-text` e campos `nome`, `endereco`, `capacidade` e `data`. A spec não descreve o que o teste verifica.
- Os seletores são exatamente os frágeis da aula (`.submit-btn`, `.success-msg`, `.error-text` e texto); verifiquei que não há `data-cy` nem `data-testid` no front.
- O `projectId` em `cypress.config.ts` provavelmente pertence a uma conta de Cypress Cloud do autor (não verifiquei); para usar a parte de IA do tópico seguinte é preciso o seu próprio login e projeto.
- O README continua sendo o texto padrão do Nx (idêntico ao do módulo 3).

---

## 🔗 Para ir além
- [Repositório oficial: cfp-platform v1 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-04/cfp-plataform_v1/cfp-platform_v1)
- [OpenSpec](https://openspec.dev/)

---

⬅️ [10 · Google Jules: agente assíncrono em nuvem](./10-google-jules-agente-assincrono-em-nuvem.md)  ·  [12 · cy.prompt, self-healing e Playwright MCP: três estratégias de QA com IA](./12-cy-prompt-self-healing-e-playwright-mcp.md) ➡️
