# 16 · Live Safer: skills de agente, MCP e Lagune no fluxo de uma landing page

> **Live · 28/07/2026** · Leitura: ~9 min · Bloco: Front-end AI-Native: Angular, MCP e Design System

## 🎯 Em uma frase
A live **Safer** monta, em React + TypeScript + Vite + Tailwind, uma landing page fictícia para ensinar **UX e DX com IA**: o agente recebe **skills** (engineering, ui, cdp, writer), **MCPs** (Context7, Magnific) e o **Lagune** para levar a segurança do levantamento de riscos à verificação das correções.

---

## 👵 Explicando para a vovó

Imagine contratar uma equipe para montar uma loja a partir de uma foto de inspiração. Você não entrega só a foto: entrega o manual de obra (convenções de código), o guia de acabamento (detalhes visuais), um inspetor que olha a loja pronta em três tamanhos de tela e um engenheiro de segurança que lista os riscos antes e confere as correções depois.

O agente de IA é a equipe. As skills são esses manuais e inspetores em forma de arquivo, e o PRD é o pedido da obra, com o que construir e como revisar.

---

## 🔧 Tecnicamente

### O que é
- **O projeto:** a Safer é uma landing page fictícia criada para ensinar UX e DX de forma simplificada com IA, em React, TypeScript, Vite e Tailwind, todos na versão `latest`. No PRD, o nome troca o «Sentry» da imagem de inspiração por **Safer**. A página é gerada ao vivo a partir do PRD: o repositório da live traz só a configuração e os prompts.
- **Agente intercambiável:** os exemplos usam o Claude Code, mas o README diz que dá para usar outros agentes, trocando o identificador do agente (cada CLI tem a sua lista de agentes suportados, em lagune.ai/docs/supported-agents e no README do skills.sh).
- **Lagune:** segundo o README, reforça a segurança dentro do fluxo de desenvolvimento de ponta a ponta, guiando o agente do levantamento de riscos até a verificação das correções aplicadas. Aqui usa as especializações `owasp` e `javascript` (`npx -y lagune@latest init claude --skills owasp javascript`); quem clona um projeto já configurado roda `npx -y lagune@latest pull`. A live de SEO do mesmo curso descreve o fluxo do Lagune em cinco passos: Charter, Detect, Plan, Harden e Verify ([tópico da live de SEO, GEO e AEO](./17-live-seo-geo-aeo.md)).
- **Especialização sob medida:** o primeiro prompt pede `/lagune.specialize` uma especialização chamada `react`, para vulnerabilidades comuns de React, Vite e JavaScript no navegador (DOM e Virtual DOM), onde a segurança é subestimada por «ser só frontend». As tags são Vite, DOM, Virtual DOM e JSX, e o prompt manda usar a skill `/writer` para uma escrita clara e objetiva.
- **Políticas de segurança:** o segundo prompt, `/lagune.charter`, entende o escopo do projeto a partir do `@PRD.md` e estende o conhecimento ao `@.lagune/skills/react.md` (a especialização gerada no passo anterior).
- **Skills de wellwelwel/skills:** `engineering` (convenções de código, tipos, testes e mensagens de commit), `ui` (detalhes visuais e de interação que fazem a interface parecer acabada), `cdp` (verificação do que o navegador realmente renderiza, via Chrome DevTools) e `writer` (como a prosa do projeto é escrita e revisada). Instalação: `npx skills@latest add wellwelwel/skills --agent claude-code --skill engineering ui cdp writer -y`.
- **PRD como prompt de construção:** pede para se basear na imagem de inspiração (`resources/inspiration.webp`) e usar React + TypeScript com Vite e Tailwind. Ferramentas: MCP **Context7** para documentação atualizada e MCP **Magnific** para gerar imagens conforme necessário. Skill `/engineering` para boas práticas e DX, com desacoplamento inteligente entre componentes e separação entre UI e lógica de negócio (hooks, context). Skill `/ui` para equilibrar visual e experiência: toda transição suave e toda interação com feedback visual.
- **Loop de revisão:** o PRD fecha com a skill `/cdp` para comparar visualmente a landing page com a referência, testando desktop, tablet e mobile, e com a skill `/lagune` para garantir a segurança do projeto de ponta a ponta.
- **Regras do repositório (CLAUDE.md):** o PRD diz o que e como construir, o README diz como preparar o ambiente. Antes de dar uma mudança por concluída, rodar `lint` e `typecheck`; o Prettier é dono da formatação, então nunca formatar à mão. O `AGENTS.md` e o `.github/copilot-instructions.md` são links simbólicos para o mesmo `CLAUDE.md`, então outros agentes leem a mesma instrução.

### Como funciona
- Instalar dependências (`npm ci` e `npx -y playwright install chromium`).
- Preparar o agente: `lagune init` com as especializações `owasp` e `javascript` e `skills add` com as quatro skills.
- Prompt 1: gerar a especialização `react` com `/lagune.specialize`.
- Prompt 2: gerar as políticas de segurança com `/lagune.charter`, lendo o PRD e a especialização.
- Prompt do PRD: construir a landing page com as skills e os MCPs listados.
- Loop de revisão: `/cdp` compara com a referência em três resoluções e `/lagune` verifica a segurança; ajustar e repetir até `lint` e `typecheck` passarem.

### Onde aplicar
- Registrar o PRD, as skills e as regras do agente (`CLAUDE.md`) no repositório, para o resultado não depender de quem digitou o prompt.
- Tornar a segurança parte do fluxo desde o escopo, em vez de uma auditoria no fim: charter antes do código, verificação depois.
- Usar uma imagem de referência e uma checagem visual automatizada em desktop, tablet e mobile para fechar o loop de UI, em vez de confiar só no que o agente diz que fez.
- Ligar com o que a disciplina mostra antes: [MCP no ambiente do agente](./03-ambiente-ai-native-angular-antigravity-mcp.md), [revisão visual do que a IA gerou](./06-corrigindo-a-interface-com-ia.md) e [skills em Markdown como Prompt as Code](./08-spec-driven-development-com-openspec.md). Do lado de segurança, o OWASP aparece na [Disciplina 10](../../10-seguranca-e-governanca-em-ia/projeto-de-leitura/07-owasp-top-10-llm-novo-cenario.md).

### Vantagens e limites
**Vantagens**
- Skills e regras versionadas deixam o comportamento do agente transparente e repetível entre pessoas e entre agentes.
- O loop de revisão visual (cdp) e de segurança (Lagune) dá critério de validação ao agente, em vez de deixar o julgamento só para o fim.
- A especialização gerada sob medida cobre o ponto cego de segurança do frontend.

**Limites**
- O repositório da live não traz o código da landing page nem a saída do agente, só configuração e prompts: o que o agente de fato gerou não pode ser estudado ali.
- Depende de ferramentas externas e recentes (Lagune, skills, MCPs Context7 e Magnific), instaladas com `@latest`: o comportamento pode mudar sem aviso.
- A live descreve os comandos e o fluxo, mas o repositório não mostra resultados de segurança nem a verificação dos achados (não verifiquei o Lagune rodando).

### 🚫 Armadilhas
- Rodar `npx -y ...@latest` e `skills add ... -y` sem fixar versão nem ler o que será instalado: código remoto roda no seu projeto. Esta é uma observação minha de supply chain, não algo dito na live.
- Tratar o PRD como suficiente sem o loop de revisão: o PRD termina com o loop (cdp e Lagune) como etapa obrigatória; a leitura de que isso existe porque o agente não percebe sozinho o que o navegador renderiza é inferência minha.
- Achar que «é só frontend» dispensa segurança: foi o argumento do prompt de especialização.
- Confundir a especialização `react` (gerada por prompt, fica em `.lagune/skills/react.md`) com as especializações `owasp` e `javascript` do `init`.

---

> 💡 A live aprofunda, no tema UX e DX, o que os tópicos de MCP, revisão visual e skills mostram: o repositório é pequeno e vale ler os dois prompts, o PRD e o CLAUDE.md na ordem em que são usados.

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Lagune | Ferramenta que guia o agente de IA em segurança, do levantamento de riscos à verificação das correções; usa especializações (skills de segurança) por stack |
| Especialização | Conjunto de conhecimento de segurança para uma stack (`owasp`, `javascript`, `react`), instalado no agente |
| /lagune.specialize | Prompt que gera uma especialização nova (aqui, `react`) |
| /lagune.charter | Prompt que define as políticas de segurança do projeto a partir do PRD |
| skills.sh | CLI (`npx skills`) que instala skills de agente a partir de um repositório |
| engineering / ui / cdp / writer | Skills de convenção de código, acabamento de UI, verificação via Chrome DevTools e escrita |
| Context7 | MCP de documentação atualizada de bibliotecas |
| Magnific | MCP de geração de imagens |
| PRD | Documento com o que e como construir, usado como prompt de construção |
| DX | Developer Experience: a experiência de quem desenvolve (convenções, desacoplamento, lint, typecheck) |

---

## 💻 No código do repo

**Projeto:** [lives/2026-07-28 (Safer)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-07-28)

Estado «pré-live» do projeto: só configuração, PRD e prompts. Não há `src/`, `vite.config`, `tsconfig` nem código React; a landing page nasce dos prompts durante a live. Também não há slides.

**Fluxo**
1. `README.md` descreve a instalação (`npm ci`, `npx -y playwright install chromium`), a preparação do Lagune (`init claude --skills owasp javascript`, `pull` depois de clonar) e das skills (`engineering ui cdp writer`), e aponta os prompts em ordem de execução.
2. `resources/prompts.md` tem dois prompts: `/lagune.specialize` (cria a especialização `react` com as tags Vite, DOM, Virtual DOM e JSX, usando `/writer`) e `/lagune.charter` (escopo pelo `@PRD.md`, conhecimento estendido a `@.lagune/skills/react.md`).
3. `PRD.md` é o prompt de construção: imagem de inspiração `resources/inspiration.webp`, stack, MCPs Context7 e Magnific, skills `/engineering` e `/ui`, e o loop de revisão com `/cdp` (desktop, tablet e mobile) e `/lagune`.
4. `CLAUDE.md` fixa as regras do agente (scripts `lint`, `lint:fix` e `typecheck`; rodar lint e typecheck antes de concluir; Prettier manda na formatação). `AGENTS.md` e `.github/copilot-instructions.md` são links simbólicos para ele.
5. `package.json` traz só devDependencies: `prettier`, `@ianvs/prettier-plugin-sort-imports`, `playwright`, `tsx` e `@types/node`.

**Como rodar**
- `npm ci` e `npx -y playwright install chromium`.
- `npx -y lagune@latest init claude --skills owasp javascript` e `npx skills@latest add wellwelwel/skills --agent claude-code --skill engineering ui cdp writer -y` (não executei: dependem do agente e de pacotes remotos).
- Depois, colar os prompts de `resources/prompts.md` e o `PRD.md` no agente, nessa ordem.

**Armadilhas e achados no código**
- `npm run typecheck` roda `tsc --noEmit`, mas o `package.json` não declara `typescript` (o `package-lock.json` também não tem `node_modules/typescript`) e não há `tsconfig.json`. Como está, o script provavelmente só passa depois que o scaffold do Vite trouxer o TypeScript; o `CLAUDE.md` já exige o typecheck antes de concluir.
- Não há arquivo de configuração do Prettier (nem `.prettierrc` nem chave `prettier` no `package.json`), então o plugin `@ianvs/prettier-plugin-sort-imports` instalado não é carregado por nenhuma config do repositório. Hipótese: a config vem junto com o scaffold ou com a skill `engineering`.
- O `tsx` está instalado, mas nenhum script o usa. O papel do Playwright também não é documentado: o README liga a skill `cdp` ao Chrome DevTools; que o `cdp` use o Playwright é hipótese minha.
- O README instala o Lagune com `--skills owasp javascript`, e o PRD manda usar `/lagune`; a especialização `react` usada no `charter` só existe depois do prompt `/lagune.specialize` (ordem importa).
- O PRD cita a skill `/writer` apenas no prompt de especialização; no resto do fluxo ela não é chamada.

---

## 🔗 Para ir além
- [Live Safer no repositório do curso (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-07-28)
- [Lagune](https://lagune.ai)
- [Lagune: agentes suportados](https://lagune.ai/docs/supported-agents)
- [skills.sh: agentes suportados](https://github.com/vercel-labs/skills#supported-agents)
- [wellwelwel/skills](https://github.com/wellwelwel/skills)
- [Context7 (llms.txt)](https://context7.com/llms.txt)
- [Magnific (MCP)](https://docs.magnific.com/modelcontextprotocol.md)

---

⬅️ [06 · Corrigindo a interface com IA: contraste, responsividade e revisão humana](./06-corrigindo-a-interface-com-ia.md)  ·  [07 · Fundação enterprise: Nx, shared-types e MCP](./07-fundacao-enterprise-nx-monorepo-shared-types.md) ➡️
