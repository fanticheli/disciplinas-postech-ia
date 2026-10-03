# 04 · Design tokens e componentes acessíveis

> **Unidade 2 · Aulas 2 e 3** · Leitura: ~9 min · Bloco: Front-end AI-Native: Angular, MCP e Design System

## 🎯 Em uma frase
**Design tokens** são a menor unidade reutilizável do visual (cor, fonte, espaçamento); o agente deve **consumir tokens, nunca valores soltos**. E acessibilidade (ARIA, teclado, foco, ESC) entra no **nascimento** do componente, porque corrigir depois é mais caro.

---

## 👵 Explicando para a vovó

Imagine uma rede de padarias. Se cada loja pintar a fachada com o azul que achar bonito, a marca vira uma colcha de retalhos. A solução é uma cartela de tintas oficial: cada loja pede «a cor principal», e se a marca mudar de azul para laranja, troca-se a tinta da cartela, não as mil paredes.

A acessibilidade é a rampa e o aviso em braille na porta. É barato colocar quando a loja é construída e caro quando já está funcionando. O leitor de tela é o cliente que só «enxerga» o que está escrito na placa, mesmo que ninguém mais repare nela.

---

## 🔧 Tecnicamente

### O que é
- **Token de design** não é token de LLM. Aqui é conceito de design system: uma cor, fonte, espaçamento, raio de borda ou sombra, com nome. Evita o «cada tela com um azul diferente» e o vermelho de erro aleatório, e reduz o desalinhamento entre design e desenvolvimento.
- **Nome semântico, não literal:** `cor primária`, `cor de destaque`, `cor de erro`, `fundo` e `texto`, em vez de «azul» e «verde». Se a primária mudar de azul para outro tom, o nome continua verdadeiro.
- **O briefing da aula:** marca que transmite confiança e modernidade, azul noturno como principal, verde neon como destaque, vermelho clássico para erro, fundo quase branco no claro e chumbo no escuro, Montserrat nos títulos, Inter no corpo, espaçamentos em múltiplos de 4px (8, 16, 24 e 32).
- **Prompt como arquivo do projeto:** em vez de digitar no chat, cria-se um arquivo de prompt (Prompt as Code). Papel: design system engineer sênior. Objetivo: converter o briefing em variáveis nativas de CSS. Diretrizes: nomenclatura semântica, escala de tipografia, variáveis no seletor raiz, suporte a troca de tema. O agente lê briefing e prompt e escreve no arquivo global de estilos.
- **Aplicação restrita:** o segundo prompt pede para estilizar a navegação e o formulário, proibindo cores hexadecimais absolutas e exigindo `var(...)`. O modelo tende a resolver o visual do jeito mais direto e a gerar cores fixas, estilos inline ou valores duplicados, o que quebra a ideia de design system. A aula também faz o agente separar o template em arquivo HTML, uma preferência arquitetural que precisa ser comunicada.
- **Outras stacks:** com Tailwind, CSS Modules ou Styled Components, o prompt muda para gerar a estrutura compatível, mas o princípio é o mesmo. Em projetos maiores os tokens podem vir do Figma e ser sincronizados com o código.
- **Acessibilidade:** não é uma checklist superficial; envolve navegação por teclado, leitores de tela, ordem semântica, clareza textual, contraste, gerenciamento de foco, feedback e comportamento previsível. O foco do módulo é a W3C e as diretrizes WCAG.
- **ARIA:** atributos que enriquecem a semântica para tecnologias assistivas. Visualmente nada muda, mas dizer que um elemento é um modal altera como o leitor de tela trata foco e anuncia conteúdo. A acessibilidade ajuda também usuários avançados (teclado), pessoas com limitação motora e quem depende de fluxo de foco.
- **Componente da aula: modal de erro.** Requisitos: leitura correta por leitores de tela, foco, teclado, fechamento por ESC, semântica adequada, isolamento da interface, consumo exclusivo dos tokens. Um leitor de tela preso num modal sem saída fácil é um problema grave de usabilidade; ao abrir, o foco vai para o componente, e ao fechar deveria voltar ao elemento anterior.
- **Prompt Garden:** coleção versionada de prompts do time (componentes acessíveis, tokens, refinamento, backlog, documentação, sanitização, UX Writing). Cada conversa nova por domínio evita confusão contextual.
- **Ressalvas da aula:** o Angular Language Service marcou falsos positivos no listener de ESC; avisos de IDE nem sempre são erros reais, então valida-se o comportamento da aplicação. A regra de negócio de demonstração é: valor acima de R$ 5.000 mostra o modal de erro.

### Como funciona
- Briefing de marca (texto), prompt de tokens (arquivo), geração do bloco `:root` no CSS global com cores, tipografia, espaçamento e temas claro e escuro.
- Prompt de estilização restrita aplicando os tokens nos componentes existentes, sem hex absoluto.
- Prompt de componente acessível (papel: engenheiro front-end sênior especialista em a11y e WCAG; objetivo: componente standalone que consome só tokens; regras ARIA, teclado e foco; saída em `.ts`, `.html` e `.css`), executado em conversa nova.
- Integração ao fluxo com a nova sintaxe condicional do Angular, e checagem manual de: modal aparece, mensagem exibida, botão e ESC fecham, tokens respeitados, ARIA presente.

### Onde aplicar
- Transformar o briefing de marca de qualquer cliente em tokens antes da primeira tela.
- Fazer do modal, do formulário e dos botões da sua biblioteca interna componentes que nascem com ARIA e teclado.
- Manter um Prompt Garden para tokens e componentes e reutilizá-lo entre projetos.

### Vantagens e limites
**Vantagens**
- Troca de tema ou de cor da marca em um único lugar.
- Consistência visual e menos retrabalho quando várias pessoas trabalham no produto.
- Acessibilidade barata porque entra no início e fica descrita no prompt reutilizável.

**Limites**
- O agente pode ignorar a restrição de tokens; é preciso conferir o CSS gerado.
- ARIA é invisível: sem teste com teclado e leitor de tela, a falta de um atributo passa despercebida.

### 🚫 Armadilhas
- Nomear variável pela cor (`--azul`) em vez de pela função.
- Aceitar cor hexadecimal, estilo inline ou valor duplicado só porque «ficou igual».
- Achar que ARIA «não faz diferença» porque a tela não muda.
- Confiar no alerta do language service sem validar o comportamento real, ou o contrário.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Design token | Menor unidade reutilizável do sistema visual: cor, fonte, espaçamento, sombra |
| CSS custom property | Variável nativa `--nome`, lida com `var(--nome)` |
| Nome semântico | Nome pela função (`--color-primary`), não pela cor |
| WCAG | Diretrizes de acessibilidade da W3C |
| WAI-ARIA | Atributos `role`, `aria-*` que descrevem a semântica a tecnologias assistivas |
| Gerenciamento de foco | Levar o foco ao modal ao abrir e devolvê-lo ao fechar |
| Prompt Garden | Biblioteca versionada de prompts do time |

---

## 💻 No código do repo

**Projeto:** [modulo-02/pix-app](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app)

Do briefing de marca ao `:root` em `src/styles.css`, e do prompt de acessibilidade ao `ErrorModal` usado pela tela de transferência.

**Fluxo**
1. `briefing/branding-briefing.txt` mais `prompts/design-tokens-generator.md` geram `src/styles.css`: `--color-primary` (#0A192F), `--color-action` (#64FFDA), `--color-error` (#FF6B6B), `--color-background` e `--color-text`, `--font-heading` (Montserrat) e `--font-body` (Inter), `--spacing-small`, `-medium`, `-large` e `-extra-large` (8, 16, 24 e 32px), e um `@media (prefers-color-scheme: dark)` que troca fundo (#112240) e texto (#F8F9FA).
2. `app.css` e `pix-transfer/pix-transfer.css` consomem os tokens (`var(--color-primary)`, `var(--spacing-large)` e afins), sem hex literal.
3. `prompts/a11y-component-generator.md` (papel de especialista em a11y e WCAG, ARIA obrigatório, teclado, foco, ESC, CSS sem cor nem espaçamento absolutos) gera `components/error-modal/`: `title` e `message` como `input.required`, `close` como `output`, `role="alertdialog"`, `aria-modal="true"`, `aria-labelledby` e `aria-describedby`, botão com `aria-label="Fechar"`, foco inicial no botão em `ngAfterViewInit` e fechamento por ESC via `@HostListener('document:keydown.escape')`. O backdrop também fecha ao clique.
4. `pix-transfer/pix-transfer.ts`: signals `pixKey`, `transferAmount`, `schedulingDate`, `showErrorModal` e `transferReceiptData`; `onSubmit()` abre o modal se o valor passar de 5000. O template usa `@if (showErrorModal())` para exibir o `app-error-modal` com o título «Limite Excedido».

**Como rodar**
- `npm start`, abra `/pix`, informe um valor acima de 5000 e confirme: o modal aparece com o foco no botão fechar; ESC e clique no fundo fecham.
- Troque o tema do sistema operacional entre claro e escuro para ver o `prefers-color-scheme` trocar os tokens.

**Armadilhas e achados no código**
- Contraste na navegação, pela leitura do CSS (não renderizei): `aside` usa fundo `--color-primary` (#0A192F) e os links usam `--color-text`, que no tema claro também é #0A192F. Os links ficam invisíveis no claro e só aparecem no escuro (#F8F9FA).
- Montserrat e Inter nunca são carregadas: `src/index.html` só importa o Material Symbols (duas vezes, com FILL 0 e FILL 1). As fontes caem para `sans-serif`. O `<html>` também está com `lang="en"` numa UI em português.
- O comentário do modal fala em «trap» de foco, mas só há foco inicial; não há retenção do foco dentro do diálogo nem devolução ao elemento anterior, que a própria apostila cita como boa prática.
- `@HostListener`, `@ViewChild` e `AfterViewInit` são o estilo antigo; o `.gemini/GEMINI.md` do projeto do módulo 5 proíbe `@HostListener` (usar o objeto `host`). O código da unidade 2 é anterior a esse arquivo, que o Angular CLI gera na criação do `brag-bot`, e não segue a regra.
- O formulário tem `required` nos inputs, mas `onSubmit()` não bloqueia: valor vazio vira `0` e o comprovante aparece com R$ 0,00 e a chave Pix digitada (mesmo vazia) como «Destinatário». `schedulingDate` nunca é usada. Leitura do código, sem ter executado a tela.
- A mensagem do modal («precisam ser aprovadas pelo seu gerente») não vem do `pt-BR.json` do módulo 1, cujo equivalente seria `SCHEDULE_PIX_VALUE_TOO_HIGH`.

---

## 🔗 Para ir além
- [Repositório oficial: pix-app (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app)
- [Antigravity](https://antigravity.dev/)

---

⬅️ [03 · Ambiente AI-first: Angular, Antigravity e MCP](./03-ambiente-ai-native-angular-antigravity-mcp.md)  ·  [05 · Stitch e Figma: da referência visual ao componente Angular](./05-stitch-e-figma-da-referencia-visual-ao-componente.md) ➡️
