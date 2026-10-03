# 📚 Ferramentas de IA para UX e UI — Guia de Leitura

> Resumo organizado da **Disciplina 05** da pós de Engenharia de IA Aplicada (autoria: **Álvaro Camillo Neto**).
> Cada assunto é explicado em **duas camadas**: 👵 *para a vovó* (analogias do mundo real) e 🔧 *tecnicamente* (nível sênior), e fecha com o que foi feito **no código dos projetos do repositório**.

---

## 🗺️ Como usar este guia

Cada arquivo é auto-contido e segue sempre a mesma estrutura:

| Seção | Para quê serve |
|-------|----------------|
| 🎯 **Em uma frase** | O conceito destilado |
| 👵 **Explicando para a vovó** | Analogia do mundo real, sem jargão |
| 🔧 **Tecnicamente** | O que é, como funciona, onde aplicar, vantagens e limites, armadilhas |
| 🧩 **Cola rápida** | Glossário dos termos-chave |
| 💻 **No código do repo** | Fluxo por arquivo, como rodar e achados reais no código do projeto |
| 🔗 **Para ir além** | Links de referência |

A disciplina é diferente das outras porque quase tudo é **processo de trabalho com IA** (prompts, specs, agentes, MCPs) e não uma biblioteca. Por isso a seção de código mostra muito **artefato versionado** (prompts, specs, snapshots) além de aplicações.

---

## 🧭 Trilha de leitura sugerida

A ordem segue a apostila: das cinco unidades, que acompanham a evolução de um produto, do discovery à IA dentro da aplicação.

### Bloco 1 — Discovery e Prompt as Code
- [00 · Refinamento de requisitos, edge cases e fluxos em Mermaid](./00-refinamento-requisitos-edge-cases-mermaid.md) *(Unidade 1 · Aulas 1 e 2)*
- [01 · UX Writing e sanitização de dados como ativos técnicos](./01-ux-writing-e-sanitizacao-de-dados.md) *(Unidade 1 · Aulas 3 e 4)*
- [02 · Do feedback ao backlog e Prompt as Code](./02-feedback-em-backlog-e-prompt-as-code.md) *(Unidade 1 · Aulas 5 e 6)*

### Bloco 2 — Front-end AI-Native: Angular, MCP e Design System
- [03 · Ambiente AI-first: Angular, Antigravity e MCP](./03-ambiente-ai-native-angular-antigravity-mcp.md) *(Unidade 2 · Aula 1)*
- [04 · Design tokens e componentes acessíveis](./04-design-tokens-e-componentes-acessiveis.md) *(Unidade 2 · Aulas 2 e 3)*
- [05 · Stitch e Figma: da referência visual ao componente Angular](./05-stitch-e-figma-da-referencia-visual-ao-componente.md) *(Unidade 2 · Aulas 4 e 5)*
- [06 · Corrigindo a interface com IA: contraste, responsividade e revisão humana](./06-corrigindo-a-interface-com-ia.md) *(Unidade 2 · Aula 6)*

### Bloco 3 — Monorepo, Spec-Driven Development e agentes
- [07 · Fundação enterprise: Nx, shared-types e MCP](./07-fundacao-enterprise-nx-monorepo-shared-types.md) *(Unidade 3 · Aula 1)*
- [08 · Spec-Driven Development com OpenSpec](./08-spec-driven-development-com-openspec.md) *(Unidade 3 · Aula 2)*
- [09 · Git worktree, agentes em paralelo, integração e archive](./09-worktrees-agentes-paralelos-review-e-archive.md) *(Unidade 3 · Aulas 3 e 4)*
- [10 · Google Jules: agente assíncrono em nuvem](./10-google-jules-agente-assincrono-em-nuvem.md) *(Unidade 3 · Aula 5)*

### Bloco 4 — QA AI-Native: Cypress e Playwright MCP
- [11 · QA no Nx: Cypress tradicional e testes gerados por OpenSpec](./11-qa-no-nx-cypress-e-testes-gerados-por-openspec.md) *(Unidade 4 · Aula 1)*
- [12 · cy.prompt, self-healing e Playwright MCP: três estratégias de QA com IA](./12-cy-prompt-self-healing-e-playwright-mcp.md) *(Unidade 4 · Aulas 2 e 3)*

### Bloco 5 — IA dentro da aplicação: Genkit e BragBot
- [13 · Genkit, setup seguro e interface mockada do BragBot](./13-genkit-setup-seguro-e-interface-mockada.md) *(Unidade 5 · Aulas 1 e 2)*
- [14 · Flows, Zod e Google AI: o cérebro do Genkit](./14-flows-zod-e-google-ai.md) *(Unidade 5 · Aula 3)*
- [15 · Micro-BFF full-stack e o Engenheiro AI-Native](./15-micro-bff-fullstack-e-engenheiro-ai-native.md) *(Unidade 5 · Aulas 4 e 5)*

---

## ✅ Cobertura aula a aula (Disciplina 05)

| Unidade · Aula da apostila | Documento |
|----------------------------|-----------|
| **Introdução da disciplina**, mapa da disciplina e revisão final | Seção [Mentalidade da disciplina](#-mentalidade-da-disciplina) deste README e [15 · Micro-BFF full-stack e o Engenheiro AI-Native](./15-micro-bff-fullstack-e-engenheiro-ai-native.md) |
| **U1 · Aula 1** · Refinamento de Requisitos e Edge Cases | [00 · Refinamento de requisitos, edge cases e fluxos em Mermaid](./00-refinamento-requisitos-edge-cases-mermaid.md) |
| **U1 · Aula 2** · Design de Fluxos Lógicos e Diagramação | [00 · Refinamento de requisitos, edge cases e fluxos em Mermaid](./00-refinamento-requisitos-edge-cases-mermaid.md) |
| **U1 · Aula 3** · Refinamento de UX Writing e Comunicação Técnica | [01 · UX Writing e sanitização de dados como ativos técnicos](./01-ux-writing-e-sanitizacao-de-dados.md) |
| **U1 · Aula 4** · Preparação e Sanitização de Datasets | [01 · UX Writing e sanitização de dados como ativos técnicos](./01-ux-writing-e-sanitizacao-de-dados.md) |
| **U1 · Aula 5** · Laboratório: Structured Prompts no AI Studio | [02 · Do feedback ao backlog e Prompt as Code](./02-feedback-em-backlog-e-prompt-as-code.md) |
| **U1 · Aula 6** · Prompt as Code & Integração | [02 · Do feedback ao backlog e Prompt as Code](./02-feedback-em-backlog-e-prompt-as-code.md) |
| **U2 · Aula 1** · Setup Angular e MCP | [03 · Ambiente AI-first: Angular, Antigravity e MCP](./03-ambiente-ai-native-angular-antigravity-mcp.md) |
| **U2 · Aula 2** · Criação de Tokens e Estilização | [04 · Design tokens e componentes acessíveis](./04-design-tokens-e-componentes-acessiveis.md) |
| **U2 · Aula 3** · Geração de Componentes Acessíveis | [04 · Design tokens e componentes acessíveis](./04-design-tokens-e-componentes-acessiveis.md) |
| **U2 · Aula 4** · Criando Interfaces Utilizando o Stitch | [05 · Stitch e Figma: da referência visual ao componente Angular](./05-stitch-e-figma-da-referencia-visual-ao-componente.md) |
| **U2 · Aula 5** · Criando Interfaces a partir do Figma | [05 · Stitch e Figma: da referência visual ao componente Angular](./05-stitch-e-figma-da-referencia-visual-ao-componente.md) |
| **U2 · Aula 6** · Corrigindo a Interface Utilizando IA | [06 · Corrigindo a interface com IA: contraste, responsividade e revisão humana](./06-corrigindo-a-interface-com-ia.md) |
| **U3 · Aula 1** · A Fundação Enterprise (Nx Monorepo, MCP e Execução) | [07 · Fundação enterprise: Nx, shared-types e MCP](./07-fundacao-enterprise-nx-monorepo-shared-types.md) |
| **U3 · Aula 2** · Spec-Driven Development com OpenSpec | [08 · Spec-Driven Development com OpenSpec](./08-spec-driven-development-com-openspec.md) |
| **U3 · Aula 3** · Orquestração Paralela (Isolamento Físico e OpenSpec Apply) | [09 · Git worktree, agentes em paralelo, integração e archive](./09-worktrees-agentes-paralelos-review-e-archive.md) |
| **U3 · Aula 4** · Code Review e Melhoria Contínua | [09 · Git worktree, agentes em paralelo, integração e archive](./09-worktrees-agentes-paralelos-review-e-archive.md) |
| **U3 · Aula 5** · Escala na Nuvem: Orquestração e Cadastro de Eventos com Google Jules | [10 · Google Jules: agente assíncrono em nuvem](./10-google-jules-agente-assincrono-em-nuvem.md) |
| **U4 · Aula 1** · Arquitetura de QA no Nx: Cypress Tradicional e Geração com OpenSpec | [11 · QA no Nx: Cypress tradicional e testes gerados por OpenSpec](./11-qa-no-nx-cypress-e-testes-gerados-por-openspec.md) |
| **U4 · Aula 2** · O Fim da Fragilidade: Asserções Semânticas com Cypress | [12 · cy.prompt, self-healing e Playwright MCP: três estratégias de QA com IA](./12-cy-prompt-self-healing-e-playwright-mcp.md) |
| **U4 · Aula 3** · O Agente de QA Autônomo com Playwright MCP | [12 · cy.prompt, self-healing e Playwright MCP: três estratégias de QA com IA](./12-cy-prompt-self-healing-e-playwright-mcp.md) |
| **U5 · Aula 1** · O que é o Genkit e Configuração Inicial do Projeto | [13 · Genkit, setup seguro e interface mockada do BragBot](./13-genkit-setup-seguro-e-interface-mockada.md) |
| **U5 · Aula 2** · Design System UNIPDS e Interface Mockada | [13 · Genkit, setup seguro e interface mockada do BragBot](./13-genkit-setup-seguro-e-interface-mockada.md) |
| **U5 · Aula 3** · O Cérebro do Genkit: Flows, Zod e Google AI | [14 · Flows, Zod e Google AI: o cérebro do Genkit](./14-flows-zod-e-google-ai.md) |
| **U5 · Aula 4** · O Micro-BFF: Integração Full-Stack | [15 · Micro-BFF full-stack e o Engenheiro AI-Native](./15-micro-bff-fullstack-e-engenheiro-ai-native.md) |
| **U5 · Aula 5** · O Engenheiro AI-Native (Revisão da Jornada e Encerramento) | [15 · Micro-BFF full-stack e o Engenheiro AI-Native](./15-micro-bff-fullstack-e-engenheiro-ai-native.md) |

> As **25 aulas** da apostila (5 unidades) estão cobertas em **16 documentos**. U1 tem 6 aulas, U2 tem 6, U3 tem 5, U4 tem 3 e U5 tem 5. Cada unidade termina com uma «Revisão da Unidade» na apostila (checklist de estudo, sem conteúdo novo), absorvida nos documentos de cada bloco e na revisão final do último.

---

## 🧪 Projetos do repositório absorvidos

O código está dentro dos documentos, na seção **💻 No código do repo**. O repositório do módulo tem cinco pastas (uma por unidade) e todas estão cobertas.

| Pasta no GitHub | Onde está neste guia |
|-----------------|----------------------|
| [modulo-01](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01) (prompts, docs, dados, relatórios) | [00 · Refinamento de requisitos, edge cases e fluxos em Mermaid](./00-refinamento-requisitos-edge-cases-mermaid.md); [01 · UX Writing e sanitização de dados como ativos técnicos](./01-ux-writing-e-sanitizacao-de-dados.md); [02 · Do feedback ao backlog e Prompt as Code](./02-feedback-em-backlog-e-prompt-as-code.md) |
| [modulo-02/pix-app](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app) | [03 · Ambiente AI-first: Angular, Antigravity e MCP](./03-ambiente-ai-native-angular-antigravity-mcp.md); [04 · Design tokens e componentes acessíveis](./04-design-tokens-e-componentes-acessiveis.md); [05 · Stitch e Figma: da referência visual ao componente Angular](./05-stitch-e-figma-da-referencia-visual-ao-componente.md); [06 · Corrigindo a interface com IA: contraste, responsividade e revisão humana](./06-corrigindo-a-interface-com-ia.md) |
| [modulo-03/cfp-platform](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform) (workspace Nx, api, frontend, shared-types, openspec, .agent) | [07 · Fundação enterprise: Nx, shared-types e MCP](./07-fundacao-enterprise-nx-monorepo-shared-types.md); [08 · Spec-Driven Development com OpenSpec](./08-spec-driven-development-com-openspec.md); [09 · Git worktree, agentes em paralelo, integração e archive](./09-worktrees-agentes-paralelos-review-e-archive.md); [10 · Google Jules: agente assíncrono em nuvem](./10-google-jules-agente-assincrono-em-nuvem.md) |
| [modulo-04/cfp-plataform_v1/cfp-platform_v1](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-04/cfp-plataform_v1/cfp-platform_v1) (Cypress, `create-event-tests`, `.playwright-mcp`) | [11 · QA no Nx: Cypress tradicional e testes gerados por OpenSpec](./11-qa-no-nx-cypress-e-testes-gerados-por-openspec.md); [12 · cy.prompt, self-healing e Playwright MCP: três estratégias de QA com IA](./12-cy-prompt-self-healing-e-playwright-mcp.md) |
| [modulo-05/brag-bot](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-05/brag-bot) | [13 · Genkit, setup seguro e interface mockada do BragBot](./13-genkit-setup-seguro-e-interface-mockada.md); [14 · Flows, Zod e Google AI: o cérebro do Genkit](./14-flows-zod-e-google-ai.md); [15 · Micro-BFF full-stack e o Engenheiro AI-Native](./15-micro-bff-fullstack-e-engenheiro-ai-native.md) |

---

## 📎 Materiais oficiais

- [Repositório oficial: módulo 05](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX) (o README do módulo está desatualizado; veja os achados abaixo)
- Ferramentas citadas na seção «Modulo 05» do README da raiz do repositório do curso: [Google AI Studio](https://aistudio.google.com/), [Google Stitch](https://stitch.withgoogle.com), [Google Jules](https://jules.google/), [Antigravity](https://antigravity.dev/), [Figma](https://www.figma.com/), [Mermaid Live Editor](https://mermaid.live), [Firebase Genkit](https://genkit.dev/), [Nx](https://nx.dev) e [OpenSpec](https://openspec.dev/)
- Apostila oficial (75 páginas) e indicações de leitura, em `material/` desta disciplina

## 📖 Indicações de leitura (PDF da disciplina)

O PDF traz quatro livros, sem links. Resumo do que ele diz de cada um, e onde se conecta neste guia:

1. **Teixeira, F. — *Introdução e boas práticas em UX Design*** (Casa do Código, 2014). Estabelece o «antropocentrismo digital»: user journey, personas e mapeamento de ecossistemas, a base para questionar se uma interface realmente materializa a experiência pretendida. Segundo o PDF, é leitura obrigatória para validar protótipos gerados por ferramentas como Figma AI ou Uizard, garantindo que velocidade não comprometa usabilidade e acessibilidade. Conecta com [00 · Refinamento de requisitos, edge cases e fluxos em Mermaid](./00-refinamento-requisitos-edge-cases-mermaid.md), [04 · Design tokens e componentes acessíveis](./04-design-tokens-e-componentes-acessiveis.md) e [05 · Stitch e Figma: da referência visual ao componente Angular](./05-stitch-e-figma-da-referencia-visual-ao-componente.md).
2. **Pereira, S. — *IA Generativa para Desenvolvimento de Software*** (Novatec, 2025). Guia prático da programação assistida, com uma estrutura para avaliar ferramentas de geração de código em desafios reais; explora como a GenAI transforma UI/UX e front-end, simplifica revisões de código e detecção precoce de erros, e como assistentes de preenchimento automático deslocam o foco para arquitetura e estratégia de produto. Conecta com [05 · Stitch e Figma: da referência visual ao componente Angular](./05-stitch-e-figma-da-referencia-visual-ao-componente.md), [06 · Corrigindo a interface com IA: contraste, responsividade e revisão humana](./06-corrigindo-a-interface-com-ia.md) e [15 · Micro-BFF full-stack e o Engenheiro AI-Native](./15-micro-bff-fullstack-e-engenheiro-ai-native.md).
3. **Phoenix, J.; Taylor, M. — *Prompt Engineering for Generative AI*** (O'Reilly, 2024). Cinco princípios de engenharia de prompts para extrair resultados confiáveis de LLMs e modelos de difusão; chain-of-thought, loops de planejamento e arquiteturas de comportamento para agentes em produção; como estruturar contexto para mitigar alucinações. Conecta com [00 · Refinamento de requisitos, edge cases e fluxos em Mermaid](./00-refinamento-requisitos-edge-cases-mermaid.md), [02 · Do feedback ao backlog e Prompt as Code](./02-feedback-em-backlog-e-prompt-as-code.md) e [14 · Flows, Zod e Google AI: o cérebro do Genkit](./14-flows-zod-e-google-ai.md).
4. **Osmani, A.; Djirdeh, H. — *Product Engineering with AI*** (Leanpub, 2024). A evolução do engenheiro de software para «Product Engineer»: produtos em que a IA é o motor da experiência, requisitos agênticos, plataformas como Bolt e Lovable para full-stack acelerado, personalização de UX com insights de IA e automação de testes de usabilidade. Conecta com [05 · Stitch e Figma: da referência visual ao componente Angular](./05-stitch-e-figma-da-referencia-visual-ao-componente.md), [10 · Google Jules: agente assíncrono em nuvem](./10-google-jules-agente-assincrono-em-nuvem.md) e [12 · cy.prompt, self-healing e Playwright MCP: três estratégias de QA com IA](./12-cy-prompt-self-healing-e-playwright-mcp.md).

---

## 🎓 Mentalidade da disciplina

A introdução, o mapa e a revisão final da apostila resumem o fio condutor: **a IA acelera o trabalho quando recebe contexto, contratos, especificações e critérios de validação claros**, e utilizar IA profissionalmente não substitui engenharia de software, torna a base de arquitetura, qualidade, validação, versionamento, especificação e pensamento crítico ainda mais importante.

- Discovery: a IA expande requisitos, edge cases e estados, e o resultado vira artefato versionável (diagrama, JSON de mensagens, backlog) ([00](./00-refinamento-requisitos-edge-cases-mermaid.md), [01](./01-ux-writing-e-sanitizacao-de-dados.md), [02](./02-feedback-em-backlog-e-prompt-as-code.md)).
- Prompt tem a mesma estrutura do começo ao fim: **papel, objetivo, regras e formato de saída**, e vira código do projeto (Prompt as Code, Prompt Garden).
- Contexto atualizado e restrito: **MCP**, design tokens, specs e o que **não** fazer reduzem a variabilidade do agente ([03](./03-ambiente-ai-native-angular-antigravity-mcp.md), [04](./04-design-tokens-e-componentes-acessiveis.md), [08](./08-spec-driven-development-com-openspec.md)).
- Protótipo (Stitch) e handoff (Figma) são referência, não front final: o agente os traduz para a arquitetura real ([05](./05-stitch-e-figma-da-referencia-visual-ao-componente.md)).
- Em escala: monorepo, contratos compartilhados, spec como orquestração, worktrees, agentes assíncronos e **revisão humana** ([07](./07-fundacao-enterprise-nx-monorepo-shared-types.md), [09](./09-worktrees-agentes-paralelos-review-e-archive.md), [10](./10-google-jules-agente-assincrono-em-nuvem.md)).
- Mais código gerado exige mais validação: três estratégias de QA com trade-offs, sem solução universal ([11](./11-qa-no-nx-cypress-e-testes-gerados-por-openspec.md), [12](./12-cy-prompt-self-healing-e-playwright-mcp.md)).
- A IA vira componente da arquitetura: Genkit, flows, schemas Zod, micro-BFF; o que permanece é engenharia de contexto, especificação, validação, observabilidade, automação, arquitetura e pensamento crítico ([13](./13-genkit-setup-seguro-e-interface-mockada.md), [14](./14-flows-zod-e-google-ai.md), [15](./15-micro-bff-fullstack-e-engenheiro-ai-native.md)).

Checklist de revisão final da apostila: refinar requisitos sem tratar a resposta como verdade; transformar jornadas, mensagens, dados e prompts em artefatos versionáveis; explicar como MCP, design systems e especificações reduzem variabilidade; justificar monorepo, isolamento, code review e QA em fluxos com agentes; integrar um modelo por contratos e schemas sem acoplá-lo à interface; saber onde revisão humana, segurança, observabilidade e pensamento crítico continuam indispensáveis.

---

## 🐞 Achados gerais no repositório do módulo

Resumo do que foi encontrado lendo (e, quando indicado, rodando) o código. Os detalhes estão na seção de código de cada tópico.

- **README raiz do módulo desatualizado:** descreve pastas, ferramentas e módulos que não existem no repo (Firebase Studio, Gemini CLI, Firebase AI Logic, `modulo-01-discovery-refinement/`). Os READMEs dos projetos `modulo-02` a `modulo-05` são o texto padrão do Angular CLI ou do Nx.
- **Testes que não passam como estão:** no `pix-app`, `ng test` não compila (`PixReceipt` inexistente) e `app.spec.ts` falha; no `brag-bot`, `app.spec.ts` espera um `h1` que não existe; nos monorepos, o teste de exemplo do Playwright espera «Welcome». Já `npx nx run-many -t test` no `cfp-platform` passa (1 + 5 + 4 testes).
- **`npm ci` falha** nos dois monorepos Nx (`cfp-platform` e `cfp-platform_v1`): lockfile fora de sincronia com o `package.json` (testado com Node 20.19 e npm 10.8). `npm install` funciona.
- **Prompts que apontam para arquivos inexistentes** (`@stitch-bruto.html`, `@pix-receipt.component.ts`, `@extrato-figma.png`) e um meta prompt apontando para outro repositório e caminho.
- **Estado do repo diferente da aula:** o menu mobile e o token `--color-text-light` da aula 6 da unidade 2 não estão no código; `create-event-tests` do OpenSpec não foi arquivada e suas tasks estão desmarcadas.
- **Design system só no papel:** o `cfp-platform` copia CSS com cores literais em vez de tokens; o `pix-app` tem token inexistente (`--spacing-lg`), `rgba` literal e `rgba(var(--color-primary), ...)` inválido; links do menu invisíveis no tema claro.
- **API sem endurecimento:** o `cfp-platform` aceita `capacidade` negativa e campos extras (verificado), e a rota `/api/brag` do `brag-bot` não tem autenticação, limite de uso nem validação de tipo (objeto vira 500).

---

## ❓ Incertezas e o que ficou de fora

- Não executei fluxos que dependem de conta ou chave: Google AI Studio, Antigravity, Stitch, Figma, Jules, `cy.prompt` (Cypress Cloud), Playwright MCP e chamadas reais ao Gemini. O que se afirma sobre eles vem da apostila; sobre o código, da leitura, e do que rodei (build, testes, API Nest compilada, rota Express do SSR, sonda de flow) quando está marcado «verifiquei».
- O PDF de indicações diz que a Indicação 3 complementa «as unidades de RAG e busca semântica da disciplina», mas a apostila desta disciplina não tem unidade de RAG (provável texto reaproveitado de outra disciplina).
- A pasta `lives/` do repositório tem uma live de 2026-07-28 («Safer», laboratório de UX e DX com IA, ligada a segurança com Lagune e skills de UI). Pelo conteúdo não é claramente desta disciplina e não foi absorvida; fica como leitura complementar opcional. O mesmo vale para a live de 2026-05-27 (Spec-Driven Development em codebases enterprise, de outros professores): é afim ao tópico 08, mas não é material desta disciplina.
- A apostila cita versões e nomes de ferramentas «no momento da gravação» (Angular 21, modelos Gemini, Antigravity); eles mudam rápido e podem estar diferentes quando você rodar.
