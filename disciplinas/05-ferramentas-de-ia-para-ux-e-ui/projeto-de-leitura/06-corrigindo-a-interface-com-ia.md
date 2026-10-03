# 06 · Corrigindo a interface com IA: contraste, responsividade e revisão humana

> **Unidade 2 · Aula 6** · Leitura: ~7 min · Bloco: Front-end AI-Native: Angular, MCP e Design System

## 🎯 Em uma frase
Código que compila não é interface boa: **contraste, responsividade e aderência ao design system** exigem revisão visual, e as correções devem ser **pontuais e específicas**, reaproveitando tokens em vez de pedir uma cor qualquer.

---

## 👵 Explicando para a vovó

Você pede ao pintor para pintar a sala e ele entrega uma sala linda, mas com letras cinza-escuro sobre parede azul-marinho: ninguém consegue ler o aviso na parede. O pintor não percebeu; quem percebe é quem olha. A correção não precisa de um contrato novo, basta dizer «use a tinta clara da cartela neste aviso».

E uma casa que parece ótima no desktop pode ter a porta presa quando a gente a vê numa tela de celular. Por isso alguém precisa ir lá, abrir o celular e olhar.

---

## 🔧 Tecnicamente

### O que é
- **A IA acelera, não elimina a revisão:** a responsabilidade pela qualidade final continua do desenvolvedor: revisão visual, validação arquitetural, acessibilidade, responsividade, testes, integração e comportamento.
- **Caso 1, contraste:** o comprovante criado a partir do Stitch funcionava e estava integrado, mas tinha texto escuro sobre o azul noturno, com contraste insuficiente até para quem não tem deficiência visual. A IA gerou a estrutura certa e não percebeu o contraste naquele contexto visual.
- **Prompt proporcional ao problema:** correção pontual não pede um System Prompt complexo; basta uma instrução direta e específica. O pedido da aula: há problema de acessibilidade, o texto está escuro, o fundo é azul noturno, usar a variável de texto claro do design system. Em vez de uma cor qualquer, usa-se um token existente, preservando a consistência.
- **Front-end exige mais revisão visual que back-end:** no back-end muita coisa se valida com testes unitários, de integração, contratos e asserts. No front-end muitos problemas só aparecem visualmente: alinhamento, responsividade, contraste, overflow, espaçamento, adaptação mobile e experiência de navegação. Por isso o Chrome DevTools (simulação de dispositivos móveis) continua essencial.
- **Caso 2, mobile:** dois problemas abaixo de 600px: a lista horizontal do histórico espremia os valores e o menu lateral esmagava a interface principal. O prompt: abaixo de 600px, transformar o item em coluna (`flex-direction`), esconder o menu lateral, criar um menu colapsável com Signal, botão hambúrguer com Material Symbols.
- **O que o agente fez:** leu `app.ts`, `app.html` e o CSS do histórico; criou o Signal `isMenuOpen`, o botão hambúrguer e a lógica de abrir e fechar; aplicou media queries abaixo de 600px. Mas usou um número mágico no CSS, o que mostra que a revisão arquitetural (aderência ao design system, reuso de tokens) continua necessária.
- **Princípio de fechamento:** a IA elimina parte do trabalho operacional, não o trabalho crítico. O profissional valida UX, comportamento, inconsistências, responsividade e qualidade.

### Como funciona
- Abrir o resultado e olhar contraste e legibilidade; abrir o DevTools no modo dispositivo e olhar telas pequenas.
- Escrever um prompt curto com o arquivo, o sintoma, o critério (por exemplo, abaixo de 600px) e o token a usar.
- Conferir o diff: o agente alterou só o que foi pedido? Houve número mágico? Tokens reaproveitados?
- Testar de novo no DevTools, incluindo o menu mobile, e checar que a correção não gerou regressão em outras telas.

### Onde aplicar
- Auditar telas geradas por agente com DevTools antes do PR.
- Corrigir problemas de contraste usando os tokens já existentes.
- Fazer ajustes de responsividade com prompts curtos e específicos.

### Vantagens e limites
**Vantagens**
- Correções rápidas e localizadas, com o agente já conhecendo os arquivos.
- Reaproveitar tokens mantém a consistência visual.

**Limites**
- A IA não percebe sozinha problemas visuais de contexto (contraste, espremido, overflow).
- Correções soltas podem introduzir números mágicos e regressões em outras partes.

### 🚫 Armadilhas
- Achar que o agente gerou, portanto terminou.
- Pedir «use uma cor mais clara» em vez de apontar o token do design system.
- Validar só no desktop.
- Aceitar o valor fixo que o agente colocou no CSS sem checar se existe token equivalente.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Contraste | Diferença de luminosidade entre texto e fundo, essencial para legibilidade |
| Media query | Regra CSS condicional por largura de tela (`max-width: 600px`) |
| Número mágico | Valor fixo no CSS sem token ou justificativa |
| DevTools | Ferramentas do Chrome, incluindo a simulação de dispositivos |
| Menu hambúrguer | Botão que abre e fecha a navegação em telas pequenas |
| Signal | Estado reativo do Angular (aqui, `isMenuOpen`) |

---

## 💻 No código do repo

**Projeto:** [modulo-02/pix-app](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app)

O prompt das correções está em `prompts/correcao_css.md`, mas o estado do repositório só reflete uma parte do que a aula mostra.

**Fluxo**
1. `prompts/correcao_css.md` reúne os dois pedidos: responsividade abaixo de 600px (histórico em coluna e menu lateral colapsável com Signal `isMenuOpen` e botão hambúrguer do Material Symbols) e acessibilidade do comprovante (aplicar `var(--color-text-light)` para dar contraste sobre o azul noturno).
2. `pix-history/pix-history.component.css` tem o `@media (max-width: 600px)`: `flex-direction: column` no item, `align-items: flex-start` e `margin-left: 36px` no valor. O `36px` provavelmente é o ícone (24px) mais o gap (12px); é o número mágico mais visível (hipótese).
3. Não há `isMenuOpen`, botão hambúrguer nem media query em `app.ts`, `app.html` e `app.css`: o menu colapsável da aula não está no repositório.
4. `--color-text-light` não existe em `styles.css` e `pix-receipt.css` não o usa; o comprovante usa `--color-text` sobre `--color-background`. O estado final do repo não bate com o que a aula descreve (hipótese: o componente foi regenerado depois, ou a correção ficou fora do commit).

**Como rodar**
- `npm start`, abra o DevTools (modo dispositivo) e reduza a largura abaixo de 600px em `/extrato`.
- Em `/pix` envie um valor válido e inspecione o contraste do comprovante.

**Armadilhas e achados no código**
- O prompt de `correcao_css.md` mistura dois pedidos independentes num arquivo e cita um token (`--color-text-light`) que o design system do repo não declara.
- Com o menu ausente, a navegação lateral segue ocupando largura fixa em telas pequenas: o problema 2 da aula continua aberto no repo.
- O contraste dos links do menu (invisíveis no tema claro, ver tópico anterior) é do mesmo tipo de bug que esta aula ensina a caçar.

---

## 🔗 Para ir além
- [Repositório oficial: pix-app (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app)

---

⬅️ [05 · Stitch e Figma: da referência visual ao componente Angular](./05-stitch-e-figma-da-referencia-visual-ao-componente.md)  ·  [07 · Fundação enterprise: Nx, shared-types e MCP](./07-fundacao-enterprise-nx-monorepo-shared-types.md) ➡️
