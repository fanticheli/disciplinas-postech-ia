# 03 · Ambiente AI-first: Angular, Antigravity e MCP

> **Unidade 2 · Aula 1** · Leitura: ~7 min · Bloco: Front-end AI-Native: Angular, MCP e Design System

## 🎯 Em uma frase
Um agente de código só é confiável se trabalhar com **contexto atualizado**: o **MCP do Angular** liga o agente à documentação oficial, e a primeira tarefa deve ser um esqueleto com **escopo e restrições** explícitos, aprovado por plano antes de aplicar.

---

## 👵 Explicando para a vovó

Imagine contratar um pedreiro muito rápido que aprendeu o ofício há dois anos. As regras de construção mudaram desde então e ele não sabe. Você não vai confiar na memória dele: entrega a ele o livro de normas atualizado e diz exatamente que parede pode mexer.

O MCP é o livro de normas atualizado; o plano que o agente mostra antes de agir é ele dizendo «vou mexer nestas três paredes, pode ser?». Quem aprova continua sendo você.

---

## 🔧 Tecnicamente

### O que é
- **Mudança de fase:** até aqui a IA apoiou refinamento, documentação e análise; agora ela entra no desenvolvimento front-end. Existe uma diferença grande entre pedir código a um chat e configurar um ambiente em que o agente enxerga o workspace, propõe alterações e executa tarefas.
- **Antigravity:** IDE com filosofia AI-first. Parece VS Code, Cursor e outras IDEs com chat, e é um fork do VS Code, então extensões do VS Code costumam servir. Diferencial: permite controlar agentes de codificação, que analisam arquivos e aplicam mudanças no código. A IA deixa de ser um chat externo.
- **Mais poder, mais responsabilidade:** sem escopo, restrições e padrões, o agente pode gerar estilos antes da hora, alterar arquivos demais ou criar estrutura diferente da esperada.
- **Angular CLI:** o exemplo cria o projeto PixApp com CSS puro e roteamento (Angular 21 na gravação; a versão pode mudar, o processo não). O raciocínio vale também para React, Vue ou outro framework.
- **Por que MCP:** o modelo é treinado em dados com janela temporal e frameworks evoluem rápido (Angular, React, Vue, Next.js, Spring, Quarkus, Micronaut). Há risco real de padrões antigos: módulos em vez de standalone components, sintaxe desatualizada, roteamento antigo, desconhecimento de signals.
- **MCP (Model Context Protocol):** forma de conectar agentes de IA a servidores especializados que fornecem ferramentas e contexto atualizado. O time do Angular mantém um servidor MCP com documentação, recomendações e boas práticas. A mesma lógica vale para qualquer stack: React, Spring, Quarkus.
- **Primeira tarefa:** o prompt segue papel, objetivo, regras e saída. Papel: engenheiro front-end sênior especialista em Angular 21. Tarefas: limpar o conteúdo padrão da CLI, criar estrutura semântica com navegação, menu lateral e área principal, configurar rota para PIX, criar componente standalone de transferência e um formulário inicial. Restrição essencial: não gerar CSS nem estilo inline, porque a IA tende a «melhorar» a entrega por conta própria.
- **Plano antes da ação:** o Antigravity cria um plano de execução, lista os arquivos que vai alterar e aguarda aprovação. A IA propõe e o desenvolvedor revisa; automação cega não é o modelo ideal.

### Como funciona
- Ordem do fluxo: criar o projeto limpo, abrir no Antigravity, subir a aplicação padrão, configurar o agente, conectar o MCP e só então pedir alterações. Pular direto para geração de código aumenta a chance de solução desatualizada ou desalinhada com o framework.
- O próprio Angular fornece um comando que devolve o JSON de configuração do servidor MCP; esse JSON é registrado na seção de MCP Servers da área de agentes da IDE.
- Resultado da primeira tarefa: menu lateral com item PIX, rota configurada e formulário com chave PIX, valor, data de agendamento e botão de confirmação. Sem estilo, sem componentes finais, sem integração real.
- Restringir escopo é uma habilidade central: quanto mais claro o limite da tarefa, melhor a entrega.

### Onde aplicar
- Configurar o MCP oficial do framework do seu projeto antes de qualquer geração de código com agente.
- Começar toda feature com uma tarefa de esqueleto sem estilo, validar a estrutura e só depois estilizar.
- Exigir plano e lista de arquivos antes de qualquer alteração automática.
- A live de 28/07 aprofunda o uso de MCPs (Context7, Magnific) e skills de agente no mesmo fluxo: [Live Safer](./16-live-safer-skills-mcp-e-lagune.md).

### Vantagens e limites
**Vantagens**
- Menos código desatualizado: o agente consulta a fonte oficial em vez de confiar só no treino.
- Esqueleto previsível e fácil de revisar, porque nada visual foi misturado.
- O desenvolvedor mantém o controle pela aprovação do plano.

**Limites**
- Mais uma peça de ambiente para configurar e manter por IDE e por stack.
- O MCP reduz, mas não elimina, a necessidade de revisar o que o agente gera.

### 🚫 Armadilhas
- Pedir código antes de preparar o ambiente.
- Não restringir escopo e deixar o agente inventar CSS, classes e decisões visuais.
- Decorar a ferramenta (Antigravity) em vez do princípio: o mesmo vale para Cursor, Windsurf, Copilot e outras.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Antigravity | IDE AI-first, fork do VS Code, com agentes de codificação (segundo a apostila) |
| MCP | Model Context Protocol: conecta o agente a servidores com ferramentas e contexto atualizado |
| Angular CLI | Linha de comando oficial para criar projeto, componentes, rotas e serviços |
| Standalone component | Componente Angular sem NgModule |
| Plano de execução | Lista de arquivos e ações que o agente propõe antes de alterar o projeto |
| Escopo e restrições | O que o agente pode e não pode tocar na tarefa |

---

## 💻 No código do repo

**Projeto:** [modulo-02/pix-app](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app)

Aplicação Angular 21 com CSS puro, rotas lazy, Vitest e o servidor MCP do Angular registrado em `.vscode/mcp.json`. É o projeto que as seis aulas da unidade 2 evoluem; neste tópico interessa o esqueleto.

**Fluxo**
1. `.vscode/mcp.json`: servidor `angular-cli` iniciado por `npx -y @angular/cli mcp` (o arquivo é JSON com comentário e aponta para angular.dev/ai/mcp).
2. `src/app/app.ts` e `app.html`: `App` standalone com `RouterOutlet` e `RouterLink`, um `<aside><nav>` com links para `/pix` e `/extrato` e um `<main>` com o `router-outlet`.
3. `src/app/app.routes.ts`: redireciona `''` para `/pix` e usa `loadComponent` (lazy) para `PixTransfer` e `PixHistoryComponent`.
4. `src/app/app.config.ts`: `provideBrowserGlobalErrorListeners()` e `provideRouter(routes)`. `angular.json` e `package.json` mostram Angular 21.1, TypeScript 5.9 e Vitest 4.
5. O formulário de transferência (`pix-transfer/`) nasce aqui sem estilo e é tratado no próximo tópico.

**Como rodar**
- `npm install` e `npm start` (`ng serve`, em http://localhost:4200). `npm run build` compila (verifiquei que o build passa).
- O MCP é ativado pela IDE com o `.vscode/mcp.json`; o comando que gera o JSON é fornecido pelo Angular CLI (a apostila não o transcreve).

**Armadilhas e achados no código**
- O README do `pix-app` é o texto padrão do Angular CLI; não descreve o projeto nem os prompts.
- `npm test` (`ng test`) não roda como está: verifiquei que `pix-receipt.spec.ts` importa `PixReceipt`, mas a classe exportada se chama `PixReceiptComponent`, e a compilação dos testes falha.
- Removendo esse arquivo só para investigar (repeti numa cópia fora do repo), os dois testes de `app.spec.ts` falham com `NG0201 No provider found for ActivatedRoute`: o `RouterLink` do template exige `provideRouter` no TestBed. Mesmo corrigindo isso, o segundo teste ainda esperaria um `h1` com «Hello, pix-app», que o template atual não tem (leitura do código). Só `pix-transfer.spec.ts` passa.
- Não há spec para `pix-history` e `error-modal`.

---

## 🔗 Para ir além
- [Repositório oficial: pix-app (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app)
- [Antigravity](https://antigravity.dev/)

---

⬅️ [02 · Do feedback ao backlog e Prompt as Code](./02-feedback-em-backlog-e-prompt-as-code.md)  ·  [04 · Design tokens e componentes acessíveis](./04-design-tokens-e-componentes-acessiveis.md) ➡️
