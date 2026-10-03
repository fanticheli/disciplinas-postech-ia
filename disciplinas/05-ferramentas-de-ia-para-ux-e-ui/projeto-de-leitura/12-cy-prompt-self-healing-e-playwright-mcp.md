# 12 · cy.prompt, self-healing e Playwright MCP: três estratégias de QA com IA

> **Unidade 4 · Aulas 2 e 3** · Leitura: ~8 min · Bloco: QA AI-Native: Cypress e Playwright MCP

## 🎯 Em uma frase
Três abordagens: **IA gera Cypress tradicional**; **cy.prompt** descreve a intenção e se autocorrige (**self-healing**) ao custo de lock-in; e o **Playwright MCP** deixa o agente operar o navegador sem código de teste, ao custo de tokens. Não há solução universal: há trade-offs.

---

## 👵 Explicando para a vovó

Primeira estratégia: você contrata alguém que escreve um roteiro de conferência e um robô o repete todo dia. Barato e rápido, mas se mudam o rótulo de um botão, o robô trava.

Segunda: o roteiro diz «aperte o botão de salvar», sem dizer qual é. Se mudam o botão de lugar, o robô entende pelo sentido e continua, mas só funciona dentro do sistema de um fornecedor. Terceira: não há roteiro nenhum, você diz o objetivo a um funcionário esperto que usa o computador sozinho. Flexível, porém cobra por hora.

---

## 🔧 Tecnicamente

### O que é
- **Flaky tests:** times começam motivados e, em meses, os testes quebram o tempo todo; a confiança cai, os testes são ignorados, o pipeline falha, surgem falsos negativos e a manutenção vira pesadelo, muitas vezes sem que nada de importante tenha mudado para o usuário.
- **cy.prompt:** recurso do ecossistema Cypress que depende dos serviços de nuvem do Cypress (exige autenticação na plataforma). Em vez de escrever `cy.get`, `cy.contains` e `cy.should`, escrevem-se instruções semânticas («digite auditório Oracle no campo nome», «clique no botão de salvar», «verifique a mensagem de sucesso»): descreve-se intenção, não implementação. É a tendência de subir o nível de abstração (assembly, linguagens de alto nível, frameworks, ORMs, low-code, agora automação por intenção).
- **Sem mágica:** o Cypress usa o prompt para gerar código Cypress tradicional (visível na aba Code: `visit`, `get`, `type`, `click`, `contains`). Há cache: a primeira execução é mais lenta, as seguintes reutilizam o código gerado, o que reduz custo, tokens e tempo.
- **Self-healing:** a demonstração mudou a classe CSS do botão de submit. O teste tradicional quebrou; o baseado em prompt detectou que o seletor não existia mais, reinterpretou a interface pelo contexto semântico e gerou um caminho válido. Reduz a fragilidade e o custo de manutenção, que historicamente era o maior da automação E2E.
- **Trade-off:** ganha-se automação semântica, autocorreção e menos dependência de seletores, mas cria-se dependência da plataforma Cypress Cloud, do modelo usado e de integração proprietária (lock-in). Alternativa sem IA proprietária: instrumentar o front com `data-cy`, `data-testid` ou `data-qa`, que um agente pode inclusive automatizar (analisar componentes, adicionar atributos, padronizar e refatorar testes).
- **Playwright MCP:** o Playwright é um framework E2E consolidado (e opção oficial em projetos Angular modernos). O MCP não só ensina boas práticas, ele entrega ferramentas reais de manipulação do navegador: abrir páginas, clicar, preencher formulários, capturar screenshots, executar JavaScript, ler console, interagir com pop-ups e navegar pela interface. O agente deixa de escrever testes e passa a controlar um browser.
- **RPA:** o mesmo modelo serve para Robotic Process Automation: sistemas legados sem API, portais internos, rotinas administrativas. O navegador vira camada universal de integração.
- **Sem código de teste:** o que se cria é um prompt operacional (subir o ambiente Nx, iniciar front e API, acessar a aplicação, achar o formulário, preencher dados realistas, submeter, validar a mensagem de sucesso). O agente usou o MCP do Nx para saber subir o ambiente e o do Playwright para controlar o navegador: múltiplos MCPs no mesmo fluxo, cada um como extensão cognitiva. Gerou artifacts (ações, snapshots, logs, sequência de navegação), uma espécie de log procedural reutilizável.
- **Comparativo da aula.** IA gera Cypress tradicional: barato de executar, roda no CI sem depender de IA, rápido; frágil e dependente de seletores. Cypress Prompt: automação semântica, autocorreção, menos fragilidade; lock-in na nuvem do Cypress, dependência da plataforma, possível custo extra. Playwright MCP com agente: flexibilidade, navegação inteligente, QA e RPA, independência de código de teste; consumo contínuo de tokens, custo computacional maior, execução potencialmente mais lenta.
- **Híbrido:** as abordagens não são exclusivas; por exemplo, Cypress tradicional para smoke tests rápidos, Cypress Prompt para fluxos frágeis e Playwright MCP para RPA e sistemas legados. Profissionais seniores escolhem por custo, benefício, contexto, manutenção, escala, arquitetura e flexibilidade, não por moda.

### Como funciona
- cy.prompt: autenticar no Cypress Cloud, escrever os passos como lista de instruções semânticas, executar, ler o código gerado na aba Code e observar o cache nas execuções seguintes.
- Self-healing: alterar de propósito um seletor da aplicação e comparar o teste tradicional (quebra) com o baseado em prompt (continua).
- Playwright MCP: registrar o servidor MCP na IDE, listar as tools, escrever o prompt operacional e acompanhar a execução e os artifacts.
- Decidir por fluxo: smoke rápido, fluxo frágil ou RPA.

### Onde aplicar
- Smoke tests baratos em CI com Cypress tradicional.
- Fluxos em que o front muda muito (cy.prompt, aceitando o lock-in).
- Automação de sistemas legados sem API com agente e Playwright MCP.

### Vantagens e limites
**Vantagens**
- Menos manutenção de testes com semântica e self-healing.
- Qualquer pessoa que descreva o fluxo em linguagem natural consegue automatizar.
- Rastreabilidade pelos artifacts e snapshots do agente.

**Limites**
- Lock-in de plataforma e custo no cy.prompt.
- Consumo contínuo de tokens e execução mais lenta no agente autônomo.
- Self-healing pode esconder um problema real: um teste que «se conserta» sozinho também pode passar quando o fluxo mudou de verdade e precisaria de revisão.

### 🚫 Armadilhas
- Escolher a ferramenta mais nova sem olhar custo, lock-in e CI.
- Dar a um agente autônomo um objetivo sem escopo e sem critérios de sucesso.
- Achar que self-healing dispensa critério de aceite.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| cy.prompt | Comando do Cypress que gera e adapta código de teste a partir de instruções semânticas |
| Self-healing | Autocorreção do teste quando o seletor deixa de existir |
| Lock-in | Dependência de um fornecedor ou plataforma específica |
| Playwright MCP | Servidor MCP que dá ao agente ferramentas reais de controle do navegador |
| RPA | Automação de processos repetitivos operando interfaces |
| Artifact / snapshot | Registro das ações do agente (aqui, árvores de acessibilidade em YAML) |

---

## 💻 No código do repo

**Projeto:** [modulo-04/cfp-plataform_v1/cfp-platform_v1 (cy.prompt e Playwright MCP)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-04/cfp-plataform_v1/cfp-platform_v1)

O teste escrito com `cy.prompt` e os snapshots deixados pelo Playwright MCP.

**Fluxo**
1. `frontend-e2e/cypress/e2e/event-registration-ai.cy.ts`: abre `/event/new` e chama `cy.prompt([...])` com cinco instruções em inglês (digitar «Auditório Oracle» no nome, «Av. Dr. Chucri Zaidan, SP» no endereço, «500» na capacidade, «2026-12-31» na data e clicar no botão que salva); depois outro `cy.prompt(['Verify that a success message is visible'])` como asserção por intenção. O comentário no arquivo explica agrupar os passos num único array para otimizar o LLM.
2. `.playwright-mcp/page-2026-04-05T23-22-58-510Z.yml`, `...23-05-990Z.yml` e `...23-17-624Z.yml`: três snapshots de acessibilidade (árvore ARIA em YAML) do fluxo do agente: o dashboard vazio («No submissions found...»), o formulário de evento com capacidade 0 e o mesmo formulário com o alerta «✓ Evento cadastrado com sucesso!».
3. O servidor MCP do Playwright em si não está configurado no repositório (na aula ele é registrado na IDE).

**Como rodar**
- Para o `cy.prompt`: o repo declara `cypress ^15.8.0`; é preciso login no Cypress Cloud e `projectId` próprio; depois `npx nx run frontend-e2e:open-cypress` com a API e o front no ar. Não executei esta parte (depende de conta e do binário).
- Para o Playwright MCP: registre o servidor na sua IDE e use um prompt operacional como o da aula; os snapshots do repo mostram o resultado esperado.

**Armadilhas e achados no código**
- O repositório não guarda o prompt operacional do agente de QA: só a evidência (snapshots). Reproduzir exige reescrever o prompt a partir da descrição da aula.
- A apostila descreve as instruções do `cy.prompt` em português; o arquivo do repo as escreve em inglês, com o texto «Auditório Oracle» em português dentro delas.
- A pasta `.playwright-mcp/` é artefato de execução e está versionada sem estar no `.gitignore`.
- Com `cy.prompt`, o teste de IA e o tradicional cobrem o mesmo fluxo: bom para comparar, mas rodar os dois no mesmo CI duplica o custo e o tempo.

---

## 🔗 Para ir além
- [Repositório oficial: cfp-platform v1 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-04/cfp-plataform_v1/cfp-platform_v1)

---

⬅️ [11 · QA no Nx: Cypress tradicional e testes gerados por OpenSpec](./11-qa-no-nx-cypress-e-testes-gerados-por-openspec.md)  ·  [13 · Genkit, setup seguro e interface mockada do BragBot](./13-genkit-setup-seguro-e-interface-mockada.md) ➡️
