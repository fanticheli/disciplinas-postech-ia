# 🎯 Disciplina 05 · O que vale estudar

> Análise de prioridade (opinião fundamentada no guia e na prática atual), não conteúdo da apostila. Premissas: leitor engenheiro de software backend (TypeScript/Node e Python, APIs, AWS, Postgres, filas e jobs, produto com LLMs em produção, automação Jira/Slack e uso intenso de agentes de código) que quer virar engenheiro de IA aplicada especialista (construir, avaliar, operar e governar sistemas com LLMs), não pesquisador de modelos.

## Veredito
Esta é a disciplina menos alinhada ao seu perfil: cerca de metade do conteúdo é front-end (tópicos 03 a 07, 11 e 12: Angular, design tokens, Stitch, Figma, Nx, Cypress) e ferramentas de um fornecedor que mudam a cada trimestre. O que vale ouro é a camada transferível: prompt como código versionado, saída estruturada validada por schema, contrato compartilhado entre IA e consumidor, spec-driven development, revisão humana de código de agente e o alerta (do próprio guia) de que a rota de IA do exemplo é um "ponto de custo exposto". Nota geral: ⭐⭐⭐ (3 de 5), porque 5 de 18 tópicos têm alto retorno no dia a dia (02, 08, 09, 14 e 15) e o resto é contexto de front-end que você só precisa reconhecer. Mais útil para quem é full-stack ou vai conversar com times de produto e design; para você, é uma disciplina de seleção, não de leitura linear.

## Mapa de prioridade por tópico

| Tópico | Dia a dia | Especialista | Veredito |
|---|---|---|---|
| [00 · Refinamento de requisitos, edge cases e Mermaid](./00-refinamento-requisitos-edge-cases-mermaid.md) | 🟡 | ⚪ | Conhecer |
| [01 · UX Writing e sanitização de dados](./01-ux-writing-e-sanitizacao-de-dados.md) | 🟡 | 🟡 | Conhecer |
| [02 · Feedback em backlog e Prompt as Code](./02-feedback-em-backlog-e-prompt-as-code.md) | 🟢 | 🟢 | Implementar |
| [03 · Ambiente AI-native: Angular, Antigravity e MCP](./03-ambiente-ai-native-angular-antigravity-mcp.md) | ⚪ | 🟡 | Conhecer |
| [04 · Design tokens e componentes acessíveis](./04-design-tokens-e-componentes-acessiveis.md) | ⚪ | ⚪ | Pular |
| [05 · Stitch e Figma: da referência visual ao componente](./05-stitch-e-figma-da-referencia-visual-ao-componente.md) | ⚪ | ⚪ | Pular |
| [06 · Corrigindo a interface com IA](./06-corrigindo-a-interface-com-ia.md) | ⚪ | ⚪ | Pular (ler só o princípio: front-end exige mais revisão visual; revisar diff por número mágico e reuso de token) |
| [07 · Fundação enterprise: Nx, shared-types e MCP](./07-fundacao-enterprise-nx-monorepo-shared-types.md) | 🟡 | 🟡 | Conhecer |
| [08 · Spec-Driven Development com OpenSpec](./08-spec-driven-development-com-openspec.md) | 🟢 | 🟢 | Implementar |
| [09 · Worktrees, agentes em paralelo, review e archive](./09-worktrees-agentes-paralelos-review-e-archive.md) | 🟢 | 🟡 | Implementar |
| [10 · Google Jules: agente assíncrono em nuvem](./10-google-jules-agente-assincrono-em-nuvem.md) | 🟡 | 🟡 | Conhecer |
| [11 · QA no Nx: Cypress e testes gerados por OpenSpec](./11-qa-no-nx-cypress-e-testes-gerados-por-openspec.md) | 🟡 | 🟡 | Conhecer |
| [12 · cy.prompt, self-healing e Playwright MCP](./12-cy-prompt-self-healing-e-playwright-mcp.md) | 🟡 | 🟢 | Aprofundar |
| [13 · Genkit, setup seguro e interface mockada](./13-genkit-setup-seguro-e-interface-mockada.md) | 🟡 | 🟡 | Conhecer |
| [14 · Flows, Zod e Google AI](./14-flows-zod-e-google-ai.md) | 🟢 | 🟢 | Aprofundar |
| [15 · Micro-BFF full-stack e o Engenheiro AI-Native](./15-micro-bff-fullstack-e-engenheiro-ai-native.md) | 🟢 | 🟢 | Aprofundar |
| [16 · Live Safer: skills, MCP e Lagune](./16-live-safer-skills-mcp-e-lagune.md) | 🟡 | 🟢 | Aprofundar |
| [17 · Live SEO, GEO e AEO](./17-live-seo-geo-aeo.md) | ⚪ | ⚪ | Pular |

Minha análise: Angular, Antigravity, Stitch, Jules, cy.prompt e Lagune são ferramentas específicas e recentes; o guia mesmo diz que versões e nomes mudam e manda decorar o princípio, não a ferramenta. O 17 está longe do foco da disciplina (o próprio guia admite). Os tópicos 12 e 16 ficam como Aprofundar pelo princípio (self-healing que mascara regressão; MCP e skills como dependência), não pela ferramenta.

## ✅ Implemente no dia a dia

1. **Prompts como código versionado, com papel, regras e schema de saída.**
   - Por quê: na prática, prompt solto em histórico de chat não é revisável nem auditável; o guia mostra a separação `data/`, `prompts/`, `report/` e a regra "papel, objetivo, regras, formato de saída".
   - Primeiro passo: mova os prompts do seu produto para arquivos num diretório `prompts/` no repositório, com PR obrigatório para mudar.
   - Quando não adotar: protótipo descartável de uma tarde.
   - Tópico: [02](./02-feedback-em-backlog-e-prompt-as-code.md).

2. **Saída de LLM validada por schema (Zod no TypeScript, Pydantic no Python) com falha explícita.**
   - Por quê: o guia afirma que o schema garante a forma, não a verdade. É a base de todo contrato entre IA e o resto do sistema.
   - Primeiro passo: em uma chamada de LLM do seu backend, defina o schema de saída, valide e retorne erro tipado quando falhar (sem engolir). Teste com uma entrada que o modelo costuma errar.
   - Quando não adotar: saída de texto livre para humano, sem consumidor programático.
   - Tópico: [14](./14-flows-zod-e-google-ai.md).

3. **Endurecer a rota que chama o modelo: autenticação, limite de uso, validação de tipo, log estruturado.**
   - Por quê: o achado do guia é exatamente o oposto (rota sem auth, sem limite, objeto vira 500, `console.error` como único log). Endpoint de LLM é custo exposto; você já sabe fazer isso em APIs, só falta tratar LLM como caso crítico.
   - Primeiro passo: checklist de 4 itens (auth, rate limit por usuário, validação de entrada, teto de tokens por chamada) aplicado a cada endpoint que chama modelo.
   - Quando não adotar: uso estritamente interno e de baixo volume ainda precisa de, no mínimo, auth e teto de custo.
   - Tópico: [15](./15-micro-bff-fullstack-e-engenheiro-ai-native.md).

4. **Spec antes do agente (proposal, design, tasks, critérios de aceite e "o que não fazer").**
   - Por quê: reduz retrabalho e tokens com agentes de código; o guia alerta que spec sem manutenção apodrece e que spec vaga faz o agente improvisar.
   - Primeiro passo: para a próxima feature média, escreva uma spec de uma página (requisitos com cenário WHEN/THEN, não-objetivos) e passe ao agente. Você não precisa adotar o OpenSpec; o formato é o que importa.
   - Quando não adotar: correção de uma linha ou refatoração mecânica.
   - Tópico: [08](./08-spec-driven-development-com-openspec.md).

5. **Isolamento e revisão humana para agentes em paralelo (worktree por tarefa, revisar fluxo completo antes de integrar).**
   - Por quê: dois agentes no mesmo diretório é armadilha listada no guia; "compilou" não é "pronto". Ligado ao seu uso intenso de agentes.
   - Primeiro passo: `git worktree add` por tarefa e uma lista curta de verificação (testes, fluxo real, diff lido) antes do merge.
   - Quando não adotar: tarefa única e sequencial; paralelizar custa mais tokens e integração.
   - Tópico: [09](./09-worktrees-agentes-paralelos-review-e-archive.md).

## 🔬 Aprofunde (rumo a especialista)

1. **Contrato de IA que não acopla a UI ao provedor (flow tipado, camada de abstração, troca de modelo por configuração).**
   - Diferencial: o especialista desenha a fronteira para que trocar modelo ou provedor seja mudança de configuração com avaliação, não reescrita. O guia lista "acoplar ao fornecedor" como armadilha.
   - Além da aula: documentação oficial do Genkit e de um segundo SDK de LLM para comparar abstrações; leitura sobre structured output e tool calling dos provedores (confira a versão atual).
   - Exercício: faça o mesmo endpoint funcionar com dois modelos diferentes mudando só config, com o mesmo schema, e compare as saídas em 10 entradas fixas.
   - Tópico: [14](./14-flows-zod-e-google-ai.md).

2. **Observabilidade e custo de fluxos de IA (traces por etapa, tokens, latência, falhas de schema).**
   - Diferencial: o guia cita "observabilidade nativa pela Dev UI" (tópico 14) e a falta de observabilidade no endpoint como risco; operar IA em produção exige saber o que cada chamada custou e por que falhou. A aula só arranha o assunto.
   - Além da aula: documentação do OpenTelemetry (padrão de observabilidade) e de convenções para spans de LLM (confira a versão atual).
   - Exercício: instrumente um fluxo com um span por chamada de modelo contendo modelo, tokens e resultado da validação; faça um painel simples de taxa de falha de schema.
   - Tópicos: [14](./14-flows-zod-e-google-ai.md), [15](./15-micro-bff-fullstack-e-engenheiro-ai-native.md).

3. **Avaliação de prompts e de saídas (conjunto fixo de casos, regressão ao mudar prompt ou modelo).**
   - Diferencial: o guia mostra o conflito de instruções no prompt do exemplo (inferir métrica vs. só dado quantificável), que convida alucinação. Achar isso sem teste é sorte; com um conjunto de avaliação é rotina. A aula não ensina avaliação, é lacuna sua a fechar.
   - Além da aula: leituras sobre LLM-as-judge e eval sets em engenharia de IA (docs dos provedores e material de avaliação de sistemas com LLM; confira a versão atual).
   - Exercício: pegue o prompt do exemplo, crie 15 entradas com resultado esperado e meça quantas vezes o modelo inventa métrica; ajuste o prompt e compare.
   - Tópico: [14](./14-flows-zod-e-google-ai.md).

4. **Segurança de ferramentas e contexto de agente (MCP, skills e supply chain).**
   - Diferencial: o guia (com marcação de observação própria) alerta para `npx -y ...@latest` sem fixar versão. Quem opera agentes em produção precisa tratar MCP e skills como dependências com permissão mínima e versão fixa.
   - Além da aula: documentação do Model Context Protocol e boas práticas de OWASP para aplicações com LLM (confira a versão atual).
   - Exercício: inventarie os MCPs e skills que seu agente usa, fixe versões e liste o que cada um pode ler e escrever; remova o que não usa.
   - Tópico: [16](./16-live-safer-skills-mcp-e-lagune.md).

5. **Testes de fluxos com IA e o risco do self-healing que mascara regressão.**
   - Diferencial: o guia aponta que teste que "se conserta" pode passar quando o fluxo mudou de verdade. Isso vale também para avaliação de agentes, não só E2E.
   - Além da aula: documentação do Playwright e conceitos de teste baseado em intenção vs. seletor; você não precisa do cy.prompt para isso.
   - Exercício: escreva um E2E com seletor semântico estável e force uma mudança real de fluxo; verifique que o teste falha.
   - Tópico: [12](./12-cy-prompt-self-healing-e-playwright-mcp.md).

## 🧂 Pode ficar no superficial
- **Design tokens, Stitch, Figma, correção visual e Angular (tópicos 03 a 06):** é front-end e design, fora do seu dia a dia. Leia só o princípio transferível: restringir o agente com contexto e regras (tokens aqui, schemas e convenções no seu backend) reduz variabilidade.
- **Ferramentas específicas (Antigravity, Stitch, Jules, cy.prompt, Lagune):** mudam rápido e prendem a um fornecedor. Entenda o papel (IDE com agente, agente assíncrono por PR, teste semântico) e use o equivalente que você já tem.
- **Nx e monorepo (07):** o que importa é "um contrato, vários consumidores", que você pode aplicar com um pacote de tipos num repositório qualquer; configurar Nx só vale se o seu time já usa.
- **Mermaid e UX Writing (00, 01):** úteis como hábito de pedir edge cases e mensagens estruturadas ao modelo, mas é trabalho de produto e design. Aproveite o gerador de edge cases e a ideia de mensagens como dado, sem aprofundar.
- **SEO, GEO e AEO (17):** só vale se você mantiver páginas públicas; o guia admite efeito limitado e ganhos não medidos.

## ⚠️ Cuidados e lacunas
- **Código do exemplo não é referência de produção.** O guia registra: API aceita `capacidade` negativa e campos extras, rota de IA sem auth, limite ou validação, testes que não compilam e `npm ci` quebrado. Use como ilustração, não copie.
- **O guia diz que o schema garante forma, não verdade.** Validação com Zod não substitui avaliação de qualidade; minha análise: a aula não cobre avaliação nem guardrails (lacuna).
- **Pontos de atenção do guia que a aula não enfatiza:** enviar dados com PII a serviço externo para sanitizar pode ser o próprio problema de compliance (tópico 01); autorrevisão do agente não substitui revisão humana (10); self-healing pode esconder regressão (12).
- **Versões e modelos citados "no momento da gravação"** (Angular, Gemini, Antigravity) vão mudar; o nome de modelo fixo em código é um risco do próprio exemplo (confira a versão atual antes de usar qualquer coisa).
- **O cenário é ecossistema de um fornecedor** (Genkit, Gemini, Jules, Stitch). Minha análise: o princípio é portátil, mas custos, limites e APIs diferem em outros provedores; compare antes de assumir equivalência.

## ✔️ Como saber que aprendeu
- Consigo, sem consultar, desenhar um fluxo de LLM com prompt versionado, schema de saída validado e erro explícito, e explicar o que o schema garante e o que não garante.
- Meu serviço tem, verificável em código, auth, rate limit, validação de entrada, teto de tokens e log estruturado em todo endpoint que chama modelo.
- Consigo trocar o modelo de uma chamada por configuração e rodar um conjunto fixo de casos que mostra se a qualidade regrediu, e uma spec de uma página guia o agente na minha próxima feature sem retrabalho por interpretação.

Veja também a [trilha consolidada](../../study-roadmap.md).
