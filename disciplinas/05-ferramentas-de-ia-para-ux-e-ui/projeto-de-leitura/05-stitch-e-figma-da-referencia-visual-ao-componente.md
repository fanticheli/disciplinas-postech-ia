# 05 · Stitch e Figma: da referência visual ao componente Angular

> **Unidade 2 · Aulas 4 e 5** · Leitura: ~10 min · Bloco: Front-end AI-Native: Angular, MCP e Design System

## 🎯 Em uma frase
O **Stitch** gera protótipo (HTML e CSS) a partir de linguagem natural e o **Figma** entrega o handoff; em ambos o agente deve **refatorar para standalone component, signals e tokens** do projeto, e não copiar a referência às cegas.

---

## 👵 Explicando para a vovó

Imagine que um arquiteto te entrega a foto de uma cozinha dos sonhos e um desenhista rápido te entrega um croqui em minutos. Nenhum dos dois é a obra. Quem constrói precisa adaptar à tubulação da sua casa, ao padrão dos seus azulejos e às suas tomadas.

O Stitch é o desenhista rápido; o Figma é a foto com medidas. O agente é o mestre de obras que traduz os dois para a casa que já existe, sem quebrar a instalação.

---

## 🔧 Tecnicamente

### O que é
- **Stitch (Google):** gera interfaces gráficas a partir de linguagem natural, como o AI Studio, mas especializado em UX e interface. Funciona como camada intermediária entre UX e implementação: ideação, prototipação e aceleração visual. O resultado não é só imagem, é HTML, CSS e componentes visuais usáveis como ponto de partida. Permite visualizar, testar, criar variações, adaptar e exportar, inclusive para o Figma. Lovable é citado como categoria semelhante: o conceito vale mais do que a ferramenta.
- **Prompt do Stitch:** descrever tela, estilo e conteúdo (card centralizado, sombra suave, ícone de sucesso, valor em destaque, nome do recebedor, data e hora, botão de retorno) e reaproveitar a identidade visual do design system, para manter o alinhamento mesmo em ferramentas externas.
- **O protótipo ainda não é do projeto:** o Stitch gerou uma página com Tailwind, e o projeto usa Angular, standalone components, tokens próprios e não usa Tailwind. É preciso refatorar. A cadeia é: Stitch (visual), Antigravity (agente de engenharia), MCP do Angular (boas práticas) e tokens (consistência).
- **Prompt de refatoração:** o agente deixa de gerar do zero e passa a transformar um HTML bruto em componente Angular real: standalone component, Input Signals, tokens, sem cor absoluta, layout desktop, arquivos separados. O Antigravity produz artifacts (listas de ação, plano, rastreio de alterações), o que dá rastreabilidade. Os ícones do Tailwind foram trocados por Material Symbols, uma adaptação contextual.
- **Integração:** com valor válido e menor que cinco mil, o formulário some e o comprovante aparece, usando standalone components, Input Signals e control flow moderno.
- **Figma e handoff:** normalmente UX pesquisa e testa, e entrega ao desenvolvimento via Figma; o handoff transforma decisões visuais e comportamentais em algo implementável com fidelidade. Antes dependia de interpretação manual (espaçamentos, fontes, cores, alinhamentos). Agora modelos multimodais analisam a imagem e geram código: texto para texto, texto para código, HTML para componente e agora imagem para código.
- **Entradas multimodais da aula:** a imagem do extrato Pix, as especificações textuais que simulam o Dev Mode do Figma (espaçamento, dimensões, alinhamento, tipografia, cores) e o contexto arquitetural do projeto. O objetivo não é reproduzir a imagem literalmente, e sim integrar UX, arquitetura e consistência visual.
- **Prompt do Figma:** engenheiro front-end sênior especialista em Angular 21, acessibilidade e design systems; gerar um standalone component com interface TypeScript de transação, Signals, control flow moderno (`@for`), consumo exclusivo dos tokens, proibição de hex absoluto e ícones Material Symbols.
- **Integração e revisão:** nova conversa para criar a rota `extrato`, o item de menu com `routerLink` e manter o estilo da navegação. Apareceu um bug típico: o componente usava os nomes dos ícones, mas a biblioteca não tinha sido importada. Reaproveitou-se a conversa anterior porque o contexto já tinha o raciocínio necessário; contexto tem valor, e saber quando reaproveitar ou recomeçar faz parte do ofício.

### Como funciona
- Escrever o prompt do Stitch com tela, estilo e conteúdo, gerar, e baixar o HTML e o CSS exportados.
- Guardar o código bruto numa pasta própria do projeto, separando protótipo bruto, implementação real, prompts e componentes.
- Escrever o prompt de refatoração (papel, objetivo, diretrizes, formato de saída) e pedir ao agente que leia o prompt e o código exportado.
- Integrar o componente à tela e validar no navegador.
- Figma: criar prompt de papel e regras, abrir conversa nova com prompt, imagem e specs, revisar os artifacts, integrar com rota e menu e corrigir o que faltou (como o import dos ícones).

### Onde aplicar
- Ganhar velocidade na ideação visual de uma tela nova sem comprometer a arquitetura do front real.
- Receber um handoff do Figma e entregar componente alinhado ao design system em vez de CSS copiado.
- Combinar ferramentas por etapa (protótipo, refatoração, documentação, requisitos) com o desenvolvedor como orquestrador.

### Vantagens e limites
**Vantagens**
- Protótipo em minutos que serve de ponto de partida técnico, não só de mockup.
- O handoff deixa de depender só de olho e régua: a imagem e as specs viram contexto para o agente.
- Os artifacts do agente tornam a decisão rastreável.

**Limites**
- A saída do Stitch vem com stack e paleta próprias que não respeitam necessariamente as do projeto.
- A interpretação de imagem é mais lenta e pode esquecer dependências (como o import de ícones).
- Fidelidade ao Figma e respeito ao design system podem competir; alguém precisa decidir.

### 🚫 Armadilhas
- Colar o HTML do Stitch no projeto e seguir adiante com Tailwind, ícones e paleta alheios.
- Copiar o Figma pixel a pixel ignorando tokens, componentes e contratos.
- Não revisar o que o agente «esqueceu»: import de biblioteca, rota, link de menu.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Stitch | Ferramenta do Google que gera interface a partir de linguagem natural (HTML e CSS) |
| Handoff | Passagem do design (Figma) para o desenvolvimento com fidelidade |
| Dev Mode | Visão do Figma com espaçamentos, dimensões, tipografia e cores |
| Multimodal | Modelo que aceita mais de um tipo de entrada (texto, imagem, áudio, vídeo, documento) |
| Input Signals | Entradas de componente Angular baseadas em signals (`input()`) |
| Control flow | Sintaxe `@if`, `@else`, `@for` do Angular moderno |
| Material Symbols | Biblioteca de ícones usada no projeto |
| Artifact | Registro intermediário (plano, tarefas, alterações) que o Antigravity gera |

---

## 💻 No código do repo

**Projeto:** [modulo-02/pix-app](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app)

Dois componentes nascem aqui: `PixReceiptComponent` (a partir do HTML do Stitch) e `PixHistoryComponent` (a partir da imagem do Figma e das specs), mais a integração na tela de transferência e a rota de extrato.

**Fluxo**
1. `briefing/google-stitch.txt` é o prompt do Stitch (tela web desktop de comprovante de sucesso, card centralizado, check grande, R$ 150,00, «Erick S.», data e hora, botão largo «Voltar ao Início», azul escuro e verde neon). `stitch/comprovante_stitch.html` é a saída bruta: Tailwind via CDN, fonte Space Grotesk, paleta própria (`primary` #0f49bd, `accent` #39ff14), cabeçalho «PixBank» com navegação, card, grade de ações e botões.
2. `prompts/stitch-code-refactor.md` e `prompts/refatoracao-stich.txt` mandam criar `PixReceiptComponent` com `@Input` Signals, tokens do `styles.css` e Material Symbols. Resultado em `pix-receipt/`: `nome` e `valor` como `input.required`, `CurrencyPipe` para o valor em BRL, template e CSS separados.
3. `prompts/adicionar-fluxo-comprovante.txt` integra o componente: em `pix-transfer.html`, `@if (transferReceiptData(); as receipt) { <app-pix-receipt ...> } @else { <section>...formulário...</section> }`.
4. Figma: `briefing/figma-specs.txt` (PixHistoryList vertical com gap 0; TransactionItem horizontal com space-between, padding 16px 24px, borda inferior 1px; títulos 600 16px, datas 400 12px; valor recebido e enviado em 700 16px; gap do ícone 12px e ícone de 24px), `imagem/extrato-pix.png`, `prompts/figma-to-angular.md` e `prompts/componente-figma.txt`.
5. Resultado em `pix-history/`: interface `Transaction` (`id`, `title`, `amount`, `type` como `'received' | 'sent'` e `date`), signal com três transações mockadas, `@for (transaction of transactions(); track transaction.id)`, ícones `arrow_downward` e `arrow_upward`, `CurrencyPipe` e `DatePipe`.
6. `prompts/criacao-menu-extrato.txt` gera a rota `/extrato` em `app.routes.ts` e o link no menu do `app.html`.

**Como rodar**
- `npm start`; em `/pix` envie um valor até 5000 para ver o comprovante; em `/extrato`, a lista mockada.
- Abra `stitch/comprovante_stitch.html` no navegador para comparar o protótipo com o componente refatorado (o protótipo usa CDN do Tailwind e precisa de internet).

**Armadilhas e achados no código**
- Os prompts apontam para nomes que não existem: `@stitch-bruto.html` e `@stitch-bruto.css` (o repo tem `stitch/comprovante_stitch.html` e nenhum CSS separado), `@pix-receipt.component.ts` e `@pix-transfer.component.ts` (os arquivos são `pix-receipt.ts` e `pix-transfer.ts`), `@extrato-figma.png` (o arquivo é `imagem/extrato-pix.png`). Reproduzir os prompts literalmente exige ajustar caminhos.
- O Stitch não seguiu a paleta do briefing: usou #39ff14 como destaque (o token é #64FFDA) e inventou um cabeçalho «PixBank» com navegação que o prompt não pedia. A refatoração descartou esse cabeçalho.
- `pix-receipt.html` mantém dados fixos do mockup: «24 de Maio, 2024», «14:30:45», «Banco Neon» e o ID `PIX9823749823BCN9283`. Só nome e valor são dinâmicos; os botões Compartilhar, Baixar PDF, Imprimir e Voltar ao Início não têm handler.
- O template do comprovante abre um `<main>` dentro do `<main>` do `app.html` (dois landmarks principais) e usa `min-height: 100vh` no container.
- `pix-receipt.css` desobedece à regra «sem valores absolutos» dos prompts: há `rgba(100, 255, 218, ...)`, `rgba(10, 25, 47, ...)`, `96px`, `500px` e sombras fixas. Além disso, `border: 1px solid rgba(var(--color-primary), 0.1)` é inválido, porque `--color-primary` é um hex e não uma tripla RGB; o navegador descarta a declaração (leitura, não renderizei).
- `pix-history.component.css` usa `padding: 0 var(--spacing-lg)`, mas o token se chama `--spacing-large`; `--spacing-lg` não existe, e a declaração fica inválida em tempo de computação (sem padding lateral). Também usa `12px`, `24px` e `16px` literais, vindos direto das specs do Figma.
- O extrato usa `--color-action` (neon) para valores recebidos e `--color-error` para enviados, e não os #10B981 e #EF4444 do Figma: foi a adaptação ao design system que a aula defende, mas muda a fidelidade visual.
- Nomenclatura inconsistente: `pix-history.component.*` (sufixo antigo) convive com `pix-transfer.ts` e `pix-receipt.ts` (convenção do Angular 21).

---

## 🔗 Para ir além
- [Repositório oficial: pix-app (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app)
- [Google Stitch](https://stitch.withgoogle.com)
- [Figma](https://www.figma.com/)

---

⬅️ [04 · Design tokens e componentes acessíveis](./04-design-tokens-e-componentes-acessiveis.md)  ·  [06 · Corrigindo a interface com IA: contraste, responsividade e revisão humana](./06-corrigindo-a-interface-com-ia.md) ➡️
