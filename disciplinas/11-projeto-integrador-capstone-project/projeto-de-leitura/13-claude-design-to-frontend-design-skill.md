# 13 · Do protótipo no Claude Design à skill frontend-design

> **Unidade 4 · Aula 18** · Leitura: ~8 min · Bloco: Unidade 4 · Frontend

## 🎯 Em uma frase
A tela nasce de um **prompt no Claude Design**, refinado por iteração e exportado em **HTML standalone**. O Claude Code lê esse HTML e cria a skill **frontend-design** (tokens, tipografia, forma e padrões de componente), que depois gera os **tokens globais** e a **casca estática** do chat em Angular, sem lógica de streaming.

---

## 👵 Explicando para a vovó

É como contratar um reformador de casa: antes de quebrar parede, você mostra uma maquete e uma paleta de tintas. A maquete é o protótipo. O caderno de regras ("cozinha sempre azul, só a porta da frente é verde") é a skill: qualquer pedreiro novo que chegar consulta o caderno e não precisa adivinhar.

A casca estática é a casa pintada e mobiliada, mas ainda sem luz nem água: tem o formato do chat, mas nada conversa com o backend.

---

## 🔧 Tecnicamente

### O que é
- **Ferramentas de design com IA:** Claude Design (a partir da assinatura Pro, no app ou no site) e Google Stitch (gratuito, cota generosa). Ambos funcionam por prompt. A aula diz que qualquer uma serve e que o importante é o processo.
- **Claude Design vai além de UX:** cria design system inteiro, slides, documentos, mockups e diagramas. O projeto não usa design system, mas poderia.
- **Prompt do protótipo:** chat consultor de investimentos estilo ChatGPT, paleta da página da UNIPDS (fundo quase-preto, accent ciano, um único botão verde-limão no envio), bolha do usuário à direita e do assistente à esquerda com avatar, texto token a token com cursor piscando, painel lateral com 4 etapas (Retrieve, Grade, Search, Answer) em 3 estados, citação clicável abrindo painel com data-base, origem e link.
- **Tudo é mock:** o código que a ferramenta gera pouco importa. O protótipo é exemplo para a aplicação Angular, não código de produção.
- **Refino por conversa:** pílula de citação com borda ciano parada (fechada) e preenchida (aberta); banner de fallback de busca web na mesma paleta ciano; remover a barra lateral de conversas (a app não guarda conversas); destacar em vermelho o aviso de conteúdo informativo.
- **Fallback não é erro:** a busca web é caminho normal do sistema, por isso o banner usa ciano e não vermelho/amarelo de alerta.
- **Exportação:** compartilhar, exportar em HTML, escolher **HTML standalone** (uma página só, JS embutido) em vez do ZIP, e salvar numa pasta de exemplo de UI do projeto. Não exportar em PDF: o agente teria menos dados para extrair.
- **Skill frontend-design:** criada pelo Claude Code em `.claude/skills/frontend-design/`, com descrição, origem das regras e tokens (cores em hex, tipografia, formas). Regra de produto embutida: nunca verde ou vermelho em dado financeiro ou estado do pipeline, só ciano é cor de estado.
- **Três fontes de regras no frontend:** angular-component (criada para o projeto, arquitetura), skills do time do Angular (sintaxe atual) e frontend-design (aparência). O protótipo continua como exemplo ao lado da skill.
- **Skills da comunidade:** reduzem a dependência do modelo; um modelo fraco pode gerar Angular com padrões antigos, a skill força as práticas atuais.

### Como funciona
- Escreva o prompt descrevendo estilo, mensagens, streaming, painel lateral e citação (a aula mostra o prompt inteiro). Alternativa mais assertiva: escrever uma spec do frontend (spec-driven) e conversar com o Claude até chegar num prompt melhor.
- Itere no que não foi pedido ou ficou diferente: o Claude Design testa o próprio CSS (na demo percebeu o scroll quebrado e adicionou rolagem automática).
- Exporte como HTML standalone e salve em `docs/design/prototype/` (no repo: `ai-researcher-chat.dc.html` mais `design-tokens-used.md`).
- Prompt ao Claude Code: ler o HTML e o `design-tokens-used.md`, criar `.claude/skills/frontend-design/` traduzindo tokens de cor, tipografia e forma e os padrões de componente (bolha, citação, painel do pipeline, disclaimer, botão de envio) em regras para Angular, incluindo a regra de só ciano como cor de estado.
- Prompt seguinte: usando a skill, declarar tokens de cor e tipografia como custom properties globais em `styles.scss` e gerar a casca estática do Chat (header com wordmark, faixa de disclaimer, área de mensagens vazia, composer com input e botão Enviar), sem streaming.
- Na demo o Claude Code perguntou sobre a fonte, o autor mandou adicionar; ele adicionou as fontes, criou a folha de estilos, criou o chat só com HTML, fez o build e refatorou o primeiro componente, que servia só ao health check.
- Nessa etapa só a frontend-design é usada; as skills do Angular entram quando o trabalho passa a envolver lógica de componente.
- Verificação: com a extensão do Claude no Chrome, o Claude Code abre o navegador e testa a interface além dos testes unitários.

### Onde aplicar
- Qualquer front novo em que você quer consistência visual entre sessões de agente: protótipo exportado vira fonte de verdade versionada.
- Times com design system: a skill pode apontar para os tokens do DS em vez de hex solto.
- Vue ou React: o processo é o mesmo, combinando com skills da comunidade do framework.
- Regras de domínio que viram regra de estilo (aqui: nada de verde/vermelho em dado financeiro, para não sugerir compra e venda).

### Vantagens e limites
**Vantagens**
- Menos tokens e mais assertividade: o agente recebe exemplo concreto em vez de descrição vaga.
- Regras de estilo ficam versionadas no repo e valem para qualquer sessão ou modelo.
- Iteração visual rápida antes de escrever uma linha de Angular.
- Carregamento sob demanda: a skill só entra no contexto quando o trabalho é de estilo.

**Limites**
- O protótipo é mock: pode inventar elementos não pedidos (a barra de conversas) que você precisa remover.
- Skill gerada a partir do mockup pode divergir do que o código real faz (ver achados).
- Dependência de ferramenta paga ou com cota (Claude Design exige Pro).
- Prompt único é simplificação; sem spec, o resultado depende do que você lembrou de pedir.

### 🚫 Armadilhas
- Exportar em PDF: o agente tem menos dados para extrair e pensar o código.
- Deixar o agente hardcodar hex e fonte em cada componente: a skill manda sempre usar variável.
- Usar verde ou vermelho em dado financeiro ou estado do pipeline: viola a regra de produto (informa, não recomenda).
- Misturar a variante Nocturne (roxo/Inter) com a canônica: a skill do repo manda seguir a canônica.
- Confiar no código gerado pela ferramenta de design em vez de tratá-lo como exemplo.

> 💡 Depois de gerar a skill, abra o `SKILL.md` e confira se cada regra aponta para um trecho do protótipo; regra sem origem rastreável vira dívida quando o design mudar.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Claude Design | Ferramenta de design por prompt do Claude (a partir do plano Pro); gera protótipo, design system, slides e mockups. |
| Google Stitch | Alternativa gratuita de design por prompt, com cota generosa. |
| HTML standalone | Export com todo o código (JS dentro) em uma página; formato preferido para alimentar o agente. |
| Skill | Pasta com SKILL.md carregada sob demanda pelo agente; traz regras do projeto. |
| frontend-design | Skill do projeto com tokens e padrões de componente traduzidos do protótipo. |
| Tokens globais | Custom properties CSS (--bg, --cyan, --lime, fontes) declaradas em styles.scss. |
| Casca estática | Componente Chat só com HTML: header, disclaimer, mensagens vazias e composer, sem lógica. |
| Cor de estado | Só ciano marca pendente, em execução, concluído e fallback. |
| Spec-driven | Escrever a especificação antes de gerar; alternativa ao prompt único. |

---

## 💻 No código do repo

**Projeto:** [.claude/skills/frontend-design, docs/design/prototype, apps/web/src/styles.scss](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/.claude/skills/frontend-design)

Li o SKILL.md da frontend-design, o design-tokens-used.md e o styles.scss do repo completo. O seed só traz o health check no Angular (apps/web/src/app/api/health.service.ts), sem chat. Não abri o HTML do protótipo inteiro nem rodei o build.

**Fluxo**
1. `docs/design/prototype/ai-researcher-chat.dc.html`: protótipo canônico exportado do Claude Design (existe também a variante `ai-researcher-chat-nocturne.dc.html`, skin roxo/Inter, só referência).
2. `docs/design/prototype/design-tokens-used.md`: origem dos tokens (amostra de cor de um print da landing da UNIPDS; Anton e Poppins são inferência visual).
3. `.claude/skills/frontend-design/SKILL.md`: tokens de cor (`--bg #080909`, `--surface #141517`, `--surface-2 #1c1e21`, `--border #2b2e32`, `--text #f2f3f4`, `--text-muted #95999e`, `--cyan #14fefe`, `--cyan-dim #0d8f8f`, `--cyan-tint`, `--lime #a3ea1f`).
4. Mesma skill: tipografia (`--font-display` Anton só no wordmark, `--font-body` Poppins), raios (6px botões/inputs, 8px painéis, 10px bolhas, 999px pílulas, 50% círculos), e tabela de padrões de componente apontando para trechos do protótipo.
5. Mesma skill: regra de domínio "--cyan é a única cor de estado" e números monetários em peso 700 com tabular-nums, sempre em --text.
6. `apps/web/src/styles.scss`: declara os mesmos tokens em `:root` e o corpo usa `var(--bg)`, `var(--text)`, `var(--font-body)`.
7. `.claude/skills/angular-component/SKILL.md`: a skill de arquitetura que complementa (a frontend-design diz explicitamente que não cobre arquitetura).

**Como rodar**
- git clone do repo completo e abrir `docs/design/prototype/ai-researcher-chat.dc.html` no navegador para ver o mock
- `pnpm install` na raiz e `pnpm --filter @hero/web run start` (ng serve na porta 4200, com proxy /api para 3000)
- `pnpm test` na raiz (turbo run test); não executei

**Armadilhas e achados no código**
- Achado: a skill do repo descreve citação inline `[n]` (pílula no meio do texto, `tok.isCite`), mas o código final usa pílulas abaixo da resposta a partir do bloco "Fontes:" (ver state/citation.ts e o CLAUDE.md, F.4). A skill ficou com a descrição do protótipo.
- Achado: a skill diz que o botão Enviar vazio fica `surface-2`/text-muted; o chat.scss tem um bloco `.chat__send:disabled` com `background: var(--surface-2)`, coerente com o bug do botão desabilitado com cara de habilitado que a Aula 19 corrige.
- A aula diz que a skill tem partes Descrição, Origem e Tokens; o SKILL.md real tem também tabela de componentes, ícones e a seção "Duas variantes existem". Mais completo que o narrado.
- Fontes Anton e Poppins vêm do Google Fonts por inferência visual, não de um brand guide: trate como decisão revisável.

---

## 🔗 Para ir além
- [Projeto completo (capstone)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main)
- [Skill frontend-design](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/.claude/skills/frontend-design)
- [Protótipo exportado](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/docs/design/prototype)
- [Ponto de partida (seed)](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed)

---

⬅️ [12 · Erros padronizados e o servidor MCP](./12-standard-errors-and-mcp-server.md)  ·  [14 · Chat com streaming e citações clicáveis + painel de estado do grafo](./14-streaming-chat-and-graph-state-panel.md) ➡️
