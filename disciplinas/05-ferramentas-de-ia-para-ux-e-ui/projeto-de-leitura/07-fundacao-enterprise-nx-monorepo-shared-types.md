# 07 · Fundação enterprise: Nx, shared-types e MCP

> **Unidade 3 · Aula 1** · Leitura: ~7 min · Bloco: Monorepo, Spec-Driven Development e agentes

## 🎯 Em uma frase
Um **monorepo Nx** (Angular + NestJS + biblioteca de tipos) dá ao agente a visão do sistema inteiro e elimina contratos duplicados entre front e back; **monorepo não é monólito**: um é organização de código, o outro é arquitetura de deploy.

---

## 👵 Explicando para a vovó

Imagine duas equipes que moram em casas diferentes e conversam por bilhetes: a cozinha escreve «prato: nome, preço» e o salão entende «item: título, valor». Cedo ou tarde alguém muda um bilhete e o outro lado não sabe. Agora imagine as duas equipes no mesmo prédio, com um quadro de avisos único afixado no corredor: quando o cardápio muda, muda para todos.

O monorepo é o prédio; a biblioteca de tipos compartilhados é o quadro de avisos. E o agente, que enxerga o prédio inteiro, erra menos do que se visse só uma casa.

---

## 🔧 Tecnicamente

### O que é
- **Mudança de cenário:** da unidade 2 para um cenário enterprise, com front, back, contratos compartilhados e execução integrada. O laboratório é uma plataforma de Call for Papers para eventos: cadastro de palestrantes, submissão de propostas, regras de negócio, telas administrativas e APIs.
- **Stack:** Angular no front e NestJS no back (framework de back-end Node para APIs estruturadas; não confundir com Next.js). A aula reforça que o ponto é o modo de trabalhar, não decorar ferramenta: poderia ser React, Java, Python, Spring Boot ou Quarkus.
- **Monorepo versus monólito:** monorepo é estratégia de organização de código e desenvolvimento (vários projetos no mesmo repositório; o Google é o exemplo clássico); monólito é estratégia arquitetural ou de deploy. Dá para ter um monorepo com aplicações independentes, empacotadas e escaladas separadamente, e um monólito em vários repositórios.
- **Nx:** open source (MIT), gerencia múltiplas aplicações, bibliotecas, dependências, execução, testes e build num workspace, com cache, análise de dependências e integração com Nx Cloud para CI/CD. Executa vários targets ao mesmo tempo, em vez de vários terminais manuais.
- **Contrato compartilhado:** em repositórios separados, DTOs do back acabam duplicados no front e divergem (campo muda de um lado e não do outro). Uma biblioteca compartilhada define o contrato em um só lugar. Exemplo da aula: interface Speaker com identificador, nome, e-mail, título da palestra e flag GDE, consumida por front e back.
- **Montagem:** criar o workspace Nx (inicializa Git e estrutura), instalar plugins de Angular, NestJS e JS/TS, criar a aplicação Angular (CSS puro, roteamento, standalone, TypeScript strict, Vitest e Playwright), a aplicação NestJS (ESLint e Jest) e a biblioteca de tipos.
- **MCP do Nx:** dá ao agente um servidor especializado que entende projetos, targets, bibliotecas e boas práticas do Nx. Menos tentativa e erro, menos comando inventado e menos consumo de tokens: IA tem custo, mesmo parecendo gratuita no ambiente.
- **Primeira tarefa controlada:** criar o DTO Speaker na biblioteca compartilhada, consultando o MCP do Nx, mapeando os projetos e declarando que não deve modificar front nem API. O agente apresenta o plano (criar a interface, exportá-la no ponto público da biblioteca, validar com comandos do Nx), o dev revisa e autoriza, e o resultado é commitado: commits pequenos, atômicos e descritivos continuam valendo.

### Como funciona
- Workspace: um repositório, três projetos (front, API, tipos), um comando de execução integrada.
- Contrato primeiro: a interface mora na biblioteca e é exportada pelo ponto público; front e API importam do mesmo alias.
- Agente com MCP: pedir sempre escopo explícito («não modifique os apps»), conferir o plano, só então autorizar.
- Fechar com commit pequeno revisado, como em qualquer feature feita à mão.

### Onde aplicar
- Qualquer produto com front e back em TypeScript que sofra com DTO duplicado.
- Preparar um workspace para trabalho com agentes: contexto estruturado, comandos padronizados, MCP do build tool.

### Vantagens e limites
**Vantagens**
- Um contrato, vários consumidores: menos divergência e menos bug difícil de rastrear.
- Execução, teste e build orquestrados pelo Nx, com cache e análise de dependência.
- O agente vê front, back e contratos e acerta mais.

**Limites**
- Curva de aprendizado e configuração do Nx e dos plugins.
- Acoplamento: mudar o contrato afeta todos os consumidores ao mesmo tempo.

### 🚫 Armadilhas
- Chamar monorepo de monólito, ou o contrário.
- Deixar o agente sem escopo em base com vários projetos.
- Colocar contratos duplicados «por enquanto» no front.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Monorepo | Vários projetos no mesmo repositório; organização de código, não de deploy |
| Monólito | Estratégia arquitetural ou de deploy em uma única unidade |
| Nx | Ferramenta de monorepo: targets, cache, grafo de dependências, plugins |
| NestJS | Framework Node para APIs estruturadas (não é Next.js) |
| shared-types | Biblioteca de interfaces e DTOs usada por front e back |
| Target | Tarefa de um projeto Nx (build, serve, test, lint) |
| GDE | Google Developer Expert, campo do contrato SpeakerDTO |

---

## 💻 No código do repo

**Projeto:** [modulo-03/cfp-platform](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform)

Workspace Nx 22.6.3 com `frontend` (Angular 21.2, Vitest), `api` (NestJS 11, Jest, webpack), `shared-types` (biblioteca esbuild), `frontend-e2e` (Playwright) e `api-e2e` (Jest com axios). O alias `@cfp-platform/shared-types` está em `tsconfig.base.json`.

**Fluxo**
1. `shared-types/src/index.ts` reexporta `speaker.dto`, `event.dto` e o placeholder `shared-types.ts` (função `sharedTypes()` gerada pelo Nx). `SpeakerDTO` tem `id`, `name`, `email`, `talkTitle` e `isGDE`; `EventDTO` (adicionado depois, no tópico do Jules) tem `id`, `nome`, `endereco`, `capacidade` e `data`.
2. `api/src/main.ts` sobe o Nest com prefixo global `api` e porta `PORT` ou 3000; `api/webpack.config.js` usa o `NxAppWebpackPlugin`.
3. `frontend/project.json`: o target `serve` tem `dependsOn: ["api:serve"]` e `proxyConfig` apontando `/api` para `http://localhost:3000` (`frontend/proxy.conf.json`). Um comando sobe os dois.
4. `nx.json`: plugins do Playwright, ESLint, webpack e Jest; geradores do Angular com `vitest-angular` e Playwright. `.vscode/launch.json` traz a configuração de debug da API com `--inspect=9229`.

**Como rodar**
- `npm install` (veja o aviso abaixo sobre `npm ci`) e `npx nx serve frontend`: sobe API e front, em http://localhost:4200.
- `npx nx run-many -t test`: verifiquei que passam `shared-types` (1 teste), `api` (5) e `frontend` (4). `npx nx build api` também compilou.

**Armadilhas e achados no código**
- Verifiquei que `npm ci` falha neste projeto (Node 20.19, npm 10.8): o `package-lock.json` está fora de sincronia com o `package.json` (versões de `@swc/helpers` e `@emnapi/*` e pacotes ausentes como `@rspack/core`). `npm install` funcionou.
- O README é o texto padrão do Nx; a configuração do MCP do Nx não está no repositório (não há `.vscode/mcp.json` aqui): na aula ela é feita na IDE.
- O contrato de evento usa português (`nome`, `endereco`, `capacidade`, `data`) enquanto o de palestrante usa inglês: não há padrão de idioma.
- `shared-types.ts` e seu spec são o placeholder gerado pelo Nx, sem uso real.

---

## 🔗 Para ir além
- [Repositório oficial: cfp-platform (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform)
- [Nx](https://nx.dev)

---

⬅️ [06 · Corrigindo a interface com IA: contraste, responsividade e revisão humana](./06-corrigindo-a-interface-com-ia.md)  ·  [08 · Spec-Driven Development com OpenSpec](./08-spec-driven-development-com-openspec.md) ➡️
