PRACTICE.push({
 "disc": "04",
 "intro": "Na D4 a técnica é montar o harness do agente: instruções e specs versionadas para quem constrói, e para quem opera o OpsPilot os padrões de raciocínio, tools resilientes, memória, orçamento de contexto, grafo, observabilidade e limites de autonomia, com um número medido no final de cada passo.",
 "items": [
  {
   "id": "P4-01",
   "title": "Instruções curtas, escopo por pasta e allow/deny de terminal",
   "topics": [
    "D4-00"
   ],
   "cenario": "Time com Copilot/Claude Code em agent mode: cada dev repete stack e convenções no prompt, o agente quebra a regra de camadas e pede aprovação a cada <code>npm test</code>. Pior: alguém confia em \"não leia o .env\" escrito no prompt.",
   "passos": [
    "Escreva um arquivo de instruções de ~40 linhas: stack, comandos, estrutura de camadas, convenções e fluxo. Só fato, sem manual.",
    "Crie instructions com <code>applyTo</code> para regras locais (ex.: <code>src/service/**</code> nunca importa de <code>src/http</code>).",
    "Configure a <b>allow list</b> (formato do <code>.vscode/settings.json</code> do repo; versões novas do VS Code também aceitam <code>chat.tools.terminal.autoApprove</code>) só com rotina previsível (testes, typecheck, git status/diff/add/commit).",
    "Configure a <b>deny list</b> com o destrutivo (<code>rm -rf</code>, <code>sudo</code>, <code>git push</code>, leitura de <code>.env</code>).",
    "Teste os dois sentidos: peça algo que viole a regra e confira que o terminal pede aprovação ou nega.",
    "Mudou uma instruction? Abra um chat novo para ela ser recarregada. Evite entradas largas como <code>node</code> e <code>npm run *</code> (permitem rodar código arbitrário)."
   ],
   "code": {
    "lang": "json",
    "src": "{\n  \"github.copilot.chat.agent.terminalCommandExecution.allowed\": [\n    \"npm run typecheck\",\n    \"npm test\",\n    \"npx tsc\",\n    \"git status\",\n    \"git diff\",\n    \"git add\",\n    \"git commit\"\n  ],\n  \"github.copilot.chat.agent.terminalCommandExecution.denied\": [\n    \"rm -rf\",\n    \"sudo\",\n    \"git push --force\",\n    \"git push\",\n    \"cat .env\",\n    \"grep .env\"\n  ]\n}"
   },
   "resultado": "Sem pop-up de rotina e com bloqueio real do destrutivo; as convenções entram em toda conversa sem repetir prompt.",
   "quandoNao": [
    "Repositório de um dev só e script descartável: arquivo de instruction longo é custo sem retorno.",
    "Como substituto de sandbox: deny list é padrão de texto, não isolamento.",
    "Time que muda de ferramenta toda semana sem espelhar o arquivo (veja o card de symlink)."
   ],
   "armadilha": "Achar que instruir o modelo equivale a proibir: só a permissão do ambiente garante.",
   "repo": {
    "label": "01-arquitetura-de-agentes-de-codigo (notas-api)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/01-arquitetura-de-agentes-de-codigo"
   }
  },
  {
   "id": "P4-02",
   "title": "Guardrail determinístico: pre-commit com typecheck e testes",
   "topics": [
    "D4-01"
   ],
   "cenario": "O agente marca a tarefa como feita com tipo quebrado ou teste vermelho. Na revisão do PR o time descobre, e a instrução \"rode os testes antes\" já foi esquecida há três prompts.",
   "passos": [
    "Crie <code>.githooks/pre-commit</code> com <code>set -e</code>, <code>npm run typecheck</code> e <code>npm run test</code>.",
    "Torne o hook executável (<code>chmod +x .githooks/pre-commit</code>) e ative com <code>git config core.hooksPath .githooks</code>; nada no repo faz isso sozinho, então documente no README ou num script de setup.",
    "Force um erro de tipo de propósito e tente commitar, para ver o hook barrar.",
    "No prompt de implementação, proíba desativar teste ou enfraquecer tipo para passar.",
    "Adicione CI como terceira camada: o hook local pode ser pulado com <code>--no-verify</code>."
   ],
   "code": {
    "lang": "bash",
    "src": "#!/usr/bin/env bash\nset -e\necho \"pre-commit: typecheck...\" && npm run typecheck\necho \"pre-commit: testes...\" && npm run test"
   },
   "resultado": "Commit com tipo ou teste quebrado deixa de existir no terminal, mesmo quando o modelo esquece a regra.",
   "quandoNao": [
    "Suíte de testes de vários minutos: o hook vira obstáculo e o dev passa a usar <code>--no-verify</code>; mova para CI.",
    "Projeto sem testes nem typecheck: não há o que garantir ainda.",
    "Como única barreira de qualidade."
   ],
   "armadilha": "Esquecer de ativar o hook: ele só vale com <code>core.hooksPath</code> configurado.",
   "repo": {
    "label": "01-arquitetura-de-agentes-de-codigo (.githooks)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/01-arquitetura-de-agentes-de-codigo"
   }
  },
  {
   "id": "P4-03",
   "title": "Spec boa: 5W2H, regras numeradas, QUANDO/ENTÃO, fora do escopo e não faça",
   "topics": [
    "D4-01",
    "D4-16"
   ],
   "cenario": "Banco pede ao agente \"adiciona limite diário de transferência: premium R$50k, normal R$10k\". Não definiu o que é dia, quando o saldo conta, o que fazer ao exceder, nem o que não tocar; o agente decide tudo isso sozinho.",
   "passos": [
    "Cite as referências (task, épico, documento técnico) no topo.",
    "Descreva o comportamento esperado e numere as regras de negócio (RN-1...), cobrindo o 5W2H: o quê, onde (arquivos existentes), como (regras); quem e por quê vêm das referências.",
    "Escreva critérios de aceite verificáveis em QUANDO/ENTÃO (EARS), com código e status HTTP.",
    "Liste <b>fora do escopo</b> e <b>não faça</b>, apontando o código a reaproveitar.",
    "Contra os 36% (0,95^20): spec longa sem verificação não é seguida inteira. Converta cada critério em teste ou item de checklist.",
    "Spec não descreve implementação; isso fica no plano."
   ],
   "code": {
    "lang": "text",
    "src": "# 042 - Limite diário de transferência\n\nRefs: Jira PAY-1234 (task), PAY-1200 (épico), TDD: transfer-limits-tdd.pdf\n\n## Comportamento esperado\nConta padrão: R$ 10.000/dia. Conta premium: R$ 50.000/dia.\n\n## Regras de negócio\nRN-1 Dia = 00h00 a 23h59, horário de Brasília.\nRN-2 Saldo do dia = soma das transferências já liquidadas, em tempo real.\nRN-3 Agendada só consome limite na liquidação.\nRN-4 Mesmo CPF/CNPJ é isento.\nRN-5 Excedente é rejeitado por inteiro (sem aprovação parcial).\n\n## Critérios de aceite (QUANDO/ENTÃO)\nQUANDO a soma do dia + valor > limite\nENTÃO responder 422 DAILY_LIMIT_EXCEEDED com o saldo restante.\n\n## Fora do escopo\nMudança de limite pelo cliente; limites por canal.\n\n## Não faça\nNão altere src/ledger/*. Reuse DailyTotalsService."
   },
   "resultado": "Ambiguidade aparece na revisão da spec (minutos) e não no meio do código (dias); cada critério vira teste verificável.",
   "quandoNao": [
    "Mudança de uma linha ou ajuste cosmético: a cerimônia custa mais que o código.",
    "Terreno exploratório em que você ainda não sabe o que quer (prototipe antes).",
    "Time sem cultura de manter spec atualizada: ela vira passivo."
   ],
   "armadilha": "Tratar a spec como um prompt maior: sem critérios de aceite, fora do escopo e \"não faça\" ela repete o exemplo ruim.",
   "repo": {
    "label": "lives/2026-05-27 (SDD enterprise, pos-live)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-05-27"
   }
  },
  {
   "id": "P4-04",
   "title": "Fluxo do Spec Kit com Claude Code, constituição e um CLAUDE.md espelhado",
   "topics": [
    "D4-01",
    "D4-03",
    "D4-16"
   ],
   "cenario": "Time com Copilot, Cursor e Claude Code mantém três arquivos de instrução divergentes, e cada dev escreve spec num formato. A \"Constitution\" do projeto virou pôster: ninguém confere o plano contra ela.",
   "passos": [
    "Instale o <code>specify-cli</code> (versão fixada) e rode <code>specify init . --integration claude</code>: cria <code>.specify/</code>, as skills <code>speckit-*</code> e o <code>CLAUDE.md</code>.",
    "Rode <code>/speckit.constitution</code> uma vez, com princípios inegociáveis.",
    "Siga <code>specify</code> (o quê e por quê, sem tecnologia), <code>clarify</code> (até 5 perguntas), <code>checklist</code> por domínio, <code>plan</code> (stack e arquitetura).",
    "No plano, leia o Constitution Check (PASS/FAIL/N/A) e a justificativa de cada princípio; FAIL vai para Complexity Tracking ou bloqueia.",
    "Rode <code>analyze</code> antes de <code>tasks</code> e <code>implement</code>. O caminho mínimo é specify, plan, tasks, implement; em enterprise os opcionais passam a ser obrigatórios.",
    "Mantenha um único <code>CLAUDE.md</code> e espelhe por symlink para as outras ferramentas.",
    "Não edite à mão constituição, templates e scripts: quebra o Sync Impact Report."
   ],
   "code": {
    "lang": "text",
    "src": "uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.8.15\nspecify init . --integration claude\n\n/speckit.constitution\n/speckit.specify\n/speckit.clarify\n/speckit.checklist security\n/speckit.plan\n/speckit.analyze\n/speckit.tasks\n/speckit.implement\n\nln -sf CLAUDE.md AGENTS.md\nln -sf CLAUDE.md .cursorrules"
   },
   "resultado": "Spec, plano e tasks viram artefatos versionados e revisáveis em PR, e uma única fonte de instrução serve todas as ferramentas.",
   "quandoNao": [
    "Protótipo ou spike descartável.",
    "Time pequeno que já vive bem com OpenSpec (mais leve).",
    "Quando o PASS do Constitution Check é preenchido pelo mesmo agente e ninguém revisa: vira autoavaliação."
   ],
   "armadilha": "Aceitar o PASS do Constitution Check sem ler a justificativa de cada princípio.",
   "repo": {
    "label": "lives/2026-05-27 (Spec Kit + Claude Code)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-05-27"
   }
  },
  {
   "id": "P4-05",
   "title": "ReAct com teto de iterações",
   "topics": [
    "D4-02",
    "D4-04"
   ],
   "cenario": "Plantão pergunta \"o checkout está com problema? cheque alertas e status do provedor\". O caminho não é conhecido: cada observação decide o próximo passo. Sem teto, o agente pode girar em círculos e queimar tokens.",
   "passos": [
    "Defina as tools com schema Zod e descrição de quando usar.",
    "Crie o agente com <code>createReactAgent({ llm, tools, prompt })</code> e um system prompt que obriga a consultar tool antes de afirmar fato.",
    "Passe <code>recursionLimit</code> no <code>invoke</code> (cada passo conta ~3 nós; o repo usa <code>max(3, maxIterations * 3)</code>).",
    "Capture <code>GraphRecursionError</code> e devolva uma mensagem explícita de limite, nunca silêncio.",
    "Converta <code>result.messages</code> em trace (thought/action/observation/answer) para auditoria.",
    "Neste snippet a conversão de trace foi omitida."
   ],
   "code": {
    "lang": "ts",
    "src": "import { GraphRecursionError } from \"@langchain/langgraph\";\nimport { createReactAgent } from \"@langchain/langgraph/prebuilt\";\nimport { tool } from \"@langchain/core/tools\";\nimport { ChatOpenAI } from \"@langchain/openai\";\nimport { z } from \"zod\";\n\nconst listAlerts = tool(async ({ status }) => `Found 2 ${status} alert(s)`, {\n  name: \"list_alerts\",\n  description: \"Lista alertas por status. Quando usar: inventário de alertas.\",\n  schema: z.object({ status: z.enum([\"firing\", \"resolved\", \"all\"]).default(\"firing\") }),\n});\n\nconst model = new ChatOpenAI({\n  model: process.env.OPENROUTER_MODEL,\n  temperature: 0,\n  maxRetries: 0,\n  apiKey: process.env.OPENROUTER_API_KEY,\n  configuration: { baseURL: \"https://openrouter.ai/api/v1\" },\n});\n\nconst agent = createReactAgent({\n  llm: model,\n  tools: [listAlerts],\n  prompt: \"Você é o OpsPilot. Use as tools antes de afirmar qualquer fato.\",\n});\n\nconst maxIterations = 4;\n\nexport async function ask(message: string): Promise<string> {\n  try {\n    const result = await agent.invoke(\n      { messages: [{ role: \"user\", content: message }] },\n      { recursionLimit: Math.max(3, maxIterations * 3) },\n    );\n    return String(result.messages.at(-1)?.content ?? \"No answer generated.\");\n  } catch (error) {\n    if (error instanceof GraphRecursionError) {\n      return `[Iteration limit reached after ${maxIterations} steps.]`;\n    }\n    throw error;\n  }\n}"
   },
   "resultado": "Consulta simples resolve em ~2 chamadas ao modelo (~7 s no free tier da aula) e um loop nunca passa do teto configurado.",
   "quandoNao": [
    "Pedido com ordem fixa e dependências claras (use Plan-and-Execute).",
    "Fluxo determinístico sem decisão: código normal basta.",
    "Sem teto de iterações: nunca."
   ],
   "armadilha": "Deixar rodar sem limite: um ReAct acumula histórico a cada passo e o custo cresce com a tarefa.",
   "repo": {
    "label": "02-padroes-de-raciocinio-e-execucao",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/02-padroes-de-raciocinio-e-execucao"
   }
  },
  {
   "id": "P4-06",
   "title": "Plan-and-Execute com plano estruturado e replan",
   "topics": [
    "D4-02",
    "D4-04"
   ],
   "cenario": "\"Resolva o incidente mais antigo\": é preciso listar, identificar o mais antigo e só então resolver. Um ReAct solto pode pular a ordem ou inventar o ID.",
   "passos": [
    "Peça o plano com <code>withStructuredOutput(planSchema)</code>: de 1 a 8 passos curtos e executáveis; a validação Zod é a fronteira com o modelo.",
    "Execute um passo por vez, com um executor ReAct que recebe pedido original, progresso acumulado e passo atual.",
    "Acumule <code>[passo, resultado]</code>: o próximo passo precisa dos IDs já obtidos.",
    "Em produção há um <b>replanner</b> (adjust/continue/finish) entre os passos, contra o plano envelhecido. O snippet o omite e é um laço linear, não o StateGraph do repo.",
    "Mantenha o teto de 8 passos."
   ],
   "code": {
    "lang": "ts",
    "src": "import { createReactAgent } from \"@langchain/langgraph/prebuilt\";\nimport type { DynamicStructuredTool } from \"@langchain/core/tools\";\nimport type { ChatOpenAI } from \"@langchain/openai\";\nimport { z } from \"zod\";\n\nconst planSchema = z.object({\n  steps: z.array(z.string().min(1)).min(1).max(8)\n    .describe(\"passos curtos, ordenados, executáveis com as tools disponíveis\"),\n});\n\nexport async function planAndExecute(\n  model: ChatOpenAI,\n  tools: DynamicStructuredTool[],\n  request: string,\n): Promise<string> {\n  const { steps } = planSchema.parse(\n    await model.withStructuredOutput(planSchema).invoke([\n      [\"system\", \"Planeje o pedido em passos curtos e ordenados.\"],\n      [\"user\", request],\n    ]),\n  );\n\n  const executor = createReactAgent({ llm: model, tools });\n  const done: [string, string][] = [];\n\n  for (const step of steps) {\n    const progress = done.map(([s, r], i) => `${i + 1}. ${s} -> ${r}`).join(\"\\n\") || \"none\";\n    const result = await executor.invoke({\n      messages: [\n        {\n          role: \"user\",\n          content: `Pedido: ${request}\\nProgresso:\\n${progress}\\nPasso atual: ${step}`,\n        },\n      ],\n    });\n    done.push([step, String(result.messages.at(-1)?.content ?? \"\")]);\n  }\n\n  return done.map(([step, result]) => `${step}: ${result}`).join(\"\\n\");\n}"
   },
   "resultado": "Ordem e dependências ficam explícitas e auditáveis no trace; o plano pode usar um modelo mais forte e executores mais baratos.",
   "quandoNao": [
    "Consulta pontual: na aula, 7 chamadas contra 2 do ReAct.",
    "Ambiente que muda a cada observação sem replanner.",
    "Free tier com cota apertada."
   ],
   "armadilha": "Plano envelhecido: seguir o plano original depois de uma observação que o invalida.",
   "repo": {
    "label": "02-padroes-de-raciocinio-e-execucao",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/02-padroes-de-raciocinio-e-execucao"
   }
  },
  {
   "id": "P4-07",
   "title": "Reflection como decorator com crítico objetivo",
   "topics": [
    "D4-02",
    "D4-04"
   ],
   "cenario": "O copiloto resume o estado do plantão e afirma um serviço saudável que não aparece nas observações. Em resposta de alta criticidade ninguém quer descobrir isso depois.",
   "passos": [
    "Defina a interface comum de estratégia (<code>run</code>) e envolva qualquer uma com <code>withReflection</code>.",
    "O crítico devolve <code>{approved, feedback}</code> validado por Zod e julga só contra pedido e observações do trace.",
    "Se reprovar, rode de novo com o feedback no input (<code>[Critique - Round n]</code>).",
    "Limite as rodadas (<code>maxReflections</code>, padrão 2): um crítico sempre acha algo a melhorar.",
    "Falha do crítico = aprovação (fail-safe), para não derrubar a resposta.",
    "O snippet simplifica as métricas e o trace do repo."
   ],
   "code": {
    "lang": "ts",
    "src": "import type { ChatOpenAI } from \"@langchain/openai\";\nimport { z } from \"zod\";\n\ninterface Strategy {\n  readonly name: string;\n  run(input: string): Promise<{ answer: string; observations: string[] }>;\n}\n\nconst critiqueSchema = z.object({\n  approved: z.boolean(),\n  feedback: z.string().describe(\"se reprovado: o que corrigir, específico e acionável\"),\n});\n\nexport function withReflection(\n  strategy: Strategy,\n  model: ChatOpenAI,\n  maxReflections = 2,\n): Strategy {\n  const critic = model.withStructuredOutput(critiqueSchema);\n  return {\n    name: `reflect:${strategy.name}`,\n    async run(input) {\n      let result = await strategy.run(input);\n      for (let round = 1; round <= maxReflections; round += 1) {\n        const observations = result.observations.join(\"\\n\")\n        const verdict = await critic\n          .invoke([\n            [\"system\", \"Avalie APENAS contra as observações e o pedido. Não invente fatos.\"],\n            [\"user\", `Pedido: ${input}\\nObservações: ${observations}\\nResposta: ${result.answer}`],\n          ])\n          .catch(() => ({ approved: true, feedback: \"\" }));\n        if (verdict.approved) break;\n        const critique = `[Critique - Round ${round}]:\\n${verdict.feedback}`\n        result = await strategy.run(`${critique}\\n\\nOriginal request:\\n${input}`);\n      }\n      return result;\n    },\n  };\n}"
   },
   "resultado": "Camada de verificação plugável sobre ReAct ou Plan-and-Execute, sem mudar quem consome a estratégia; custa 1 chamada extra quando aprova de primeira.",
   "quandoNao": [
    "Consulta de baixo risco, em que a chamada extra é desperdício.",
    "Sem critério objetivo para o crítico (\"poderia melhorar\").",
    "Sem teto de rodadas."
   ],
   "armadilha": "Crítico sem critérios objetivos e sem limite: o ciclo não termina ou reprova por estética.",
   "repo": {
    "label": "02-padroes-de-raciocinio-e-execucao",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/02-padroes-de-raciocinio-e-execucao"
   }
  },
  {
   "id": "P4-08",
   "title": "Arena e bench: avaliar pelo estado final do sistema",
   "topics": [
    "D4-04",
    "D4-02"
   ],
   "cenario": "O time discute se Plan-and-Execute \"é melhor\" que ReAct por preferência. O agente explica muito bem o que fez e o estado do banco está errado.",
   "passos": [
    "Monte uma bateria fixa de cenários (direto, estruturado, dinâmico) com prompt e função <code>check</code>.",
    "Cada <code>check</code> compara o <b>estado final do store</b> com o esperado, não o texto da resposta.",
    "Use um store novo por célula (cenário x estratégia) para não contaminar.",
    "Meça acerto, chamadas ao LLM e latência; imprima tabela.",
    "Limite o total de chamadas e não rode em loop num free tier.",
    "Lembre que o resultado pertence aos cenários, à implementação e às tools."
   ],
   "code": {
    "lang": "ts",
    "src": "interface Incident { service: string; severity: string; status: \"open\" | \"resolved\" }\n\ninterface Scenario {\n  id: string;\n  prompt: string;\n  check: (incidents: Incident[]) => boolean;\n}\n\nconst scenarios: Scenario[] = [\n  {\n    id: \"C2\",\n    prompt: \"Abra 3 incidentes sev2 (checkout, payment, catalog) e resolva o de checkout\",\n    check: (incidents) =>\n      incidents.length === 3 &&\n      incidents.every((i) => i.severity === \"high\") &&\n      incidents.find((i) => i.service === \"checkout\")?.status === \"resolved\",\n  },\n];\n\nexport async function bench(\n  strategies: { name: string; run: (prompt: string) => Promise<{ llmCalls: number }> }[],\n  freshStore: () => { incidents: () => Incident[] },\n) {\n  const rows = [];\n  for (const scenario of scenarios) {\n    for (const strategy of strategies) {\n      const store = freshStore();\n      const startedAt = Date.now();\n      const { llmCalls } = await strategy.run(scenario.prompt);\n      rows.push({\n        scenario: scenario.id,\n        strategy: strategy.name,\n        pass: scenario.check(store.incidents()),\n        llmCalls,\n        latencyMs: Date.now() - startedAt,\n      });\n    }\n  }\n  console.table(rows);\n}"
   },
   "resultado": "Troca preferência por evidência: na aula o ReAct acertou os 3 cenários com menos chamadas e o P&E errou o estado final em 2.",
   "quandoNao": [
    "Uma feature só com uma estratégia óbvia.",
    "Sem store reinicializável.",
    "Cota de modelo limitada e bench sem teto de chamadas."
   ],
   "armadilha": "Acreditar na resposta textual sem conferir o estado do sistema.",
   "repo": {
    "label": "02-padroes-de-raciocinio-e-execucao (arena.ts, bench.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/02-padroes-de-raciocinio-e-execucao"
   }
  },
  {
   "id": "P4-09",
   "title": "API que também é agente: POST /chat validado, 400 vs 422 e testes sem rede",
   "topics": [
    "D4-05",
    "D4-03"
   ],
   "cenario": "O agente só roda via script local. A plataforma e o front precisam de um contrato HTTP estável, e o CI falha aleatoriamente porque os testes chamam o modelo real.",
   "passos": [
    "Defina o schema Zod do corpo (<code>message</code>, <code>userId</code>, <code>strategy</code> opcional, <code>conversationId</code> uuid).",
    "Corpo inválido devolve <b>400</b> com <code>issues</code>; estratégia bem formada mas inexistente devolve <b>422</b>.",
    "Use um registry de estratégias injetado em <code>createApp</code>.",
    "Nos testes injete estratégias fake e verifique status e corpo, sem rede nem chave.",
    "Passe <code>--env-file</code> também no script do servidor (env nativo do Node)."
   ],
   "code": {
    "lang": "ts",
    "src": "import express from \"express\";\nimport { z } from \"zod\";\n\nconst ROUTES = [\"react\", \"planExecute\", \"reflect\", \"team\"] as const;\n\nconst chatRequestSchema = z.object({\n  message: z.string().min(1),\n  userId: z.string().min(1),\n  strategy: z.string().optional(),\n  conversationId: z.string().uuid().optional(),\n});\n\ntype Run = (input: { message: string; userId: string }) => Promise<{ answer: string }>;\n\nexport function createApp(registry: Record<(typeof ROUTES)[number], Run>) {\n  const app = express();\n  app.use(express.json());\n\n  app.post(\"/chat\", async (req, res, next) => {\n    const parsed = chatRequestSchema.safeParse(req.body);\n    if (!parsed.success) {\n      res.status(400).json({ error: \"validation_error\", issues: parsed.error.issues });\n      return;\n    }\n    const { strategy = \"react\", message, userId } = parsed.data;\n    if (!(ROUTES as readonly string[]).includes(strategy)) {\n      res.status(422).json({ error: \"unknown_strategy\", strategy });\n      return;\n    }\n    try {\n      const result = await registry[strategy as (typeof ROUTES)[number]]({ message, userId });\n      res.status(200).json(result);\n    } catch (error) {\n      next(error);\n    }\n  });\n\n  return app;\n}"
   },
   "resultado": "Contrato HTTP testável em milissegundos e CI determinístico.",
   "quandoNao": [
    "Agente de uso interno via CLI, sem consumidor externo.",
    "Quando já existe API e basta um adaptador.",
    "Teste de qualidade do modelo (isso é bench, não teste de contrato)."
   ],
   "armadilha": "Testar o contrato HTTP com o modelo real e ter CI instável.",
   "repo": {
    "label": "08-projeto-pratico-opspilot-publicado (src/http)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/08-projeto-pratico-opspilot-publicado"
   }
  },
  {
   "id": "P4-10",
   "title": "Persistência com SQLite: prepared statements e CHECK constraints",
   "topics": [
    "D4-06"
   ],
   "cenario": "Incidentes e alertas vivem em memória e somem a cada restart. Além disso o agente gerou o schema com severidade \"sev1\" enquanto o domínio usa critical/high/medium/low.",
   "passos": [
    "Abra o banco com <code>node:sqlite</code> (<code>DatabaseSync</code>); <code>:memory:</code> nos testes.",
    "Declare as tabelas com <code>CHECK (col IN (...))</code> espelhando o tipo do domínio.",
    "Prepare os statements uma vez (<code>prepare</code>) e use <code>?</code>; nunca concatene valores em SQL.",
    "Mantenha a interface <code>OpsStore</code> com duas implementações (memória e SQLite) e teste as constraints.",
    "Compare o schema gerado pelo agente com o domínio antes de aceitar.",
    "Coloque o arquivo <code>.db</code> no <code>.gitignore</code>."
   ],
   "code": {
    "lang": "ts",
    "src": "import { DatabaseSync } from \"node:sqlite\";\n\nconst database = new DatabaseSync(process.env.OPSPILOT_DB ?? \":memory:\");\n\ndatabase.exec(`\n  CREATE TABLE IF NOT EXISTS incidents (\n    id TEXT PRIMARY KEY,\n    title TEXT NOT NULL,\n    service TEXT NOT NULL,\n    severity TEXT NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),\n    status TEXT NOT NULL CHECK (status IN ('open', 'resolved')),\n    created_at INTEGER NOT NULL,\n    resolved_at INTEGER\n  );\n`);\n\nconst insertIncident = database.prepare(\n  \"INSERT INTO incidents (id, title, service, severity, status, created_at) \" +\n    \"VALUES (?, ?, ?, ?, 'open', ?)\",\n);\nconst selectByStatus = database.prepare(\n  \"SELECT id, title, service, severity FROM incidents WHERE status = ? ORDER BY created_at\",\n);\n\nexport function openIncident(title: string, service: string, severity: string): string {\n  const id = `inc-${Date.now()}`;\n  insertIncident.run(id, title, service, severity, Date.now());\n  return id;\n}\n\nexport function listOpen() {\n  return selectByStatus.all(\"open\");\n}"
   },
   "resultado": "Estado sobrevive a restart e valor fora do domínio é rejeitado pelo banco, não só pelo código.",
   "quandoNao": [
    "Várias instâncias escrevendo ao mesmo tempo: SQLite não é a ferramenta.",
    "Protótipo de uma sessão, em que memória basta.",
    "Carga alta de escrita concorrente."
   ],
   "armadilha": "Aceitar o schema que o agente gerou sem comparar com os valores de domínio definidos.",
   "repo": {
    "label": "08-projeto-pratico-opspilot-publicado (src/store)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/08-projeto-pratico-opspilot-publicado"
   }
  },
  {
   "id": "P4-11",
   "title": "Tool externa resiliente: timeout, retry curto, Zod e erro como observação",
   "topics": [
    "D4-07"
   ],
   "cenario": "O copiloto precisa saber se a queda é do provedor externo, mas se a página de status cair o agente inteiro falha, justo no pior momento do plantão.",
   "passos": [
    "Dê timeout de 5 s por tentativa com <code>AbortSignal.timeout</code>.",
    "No máximo duas tentativas, só para rede/timeout/5xx; 4xx não repete.",
    "Valide o JSON com Zod mesmo em resposta 200.",
    "Devolva sempre string compacta (o resultado entra no contexto).",
    "Na falha final devolva texto legível que orienta o próximo passo (\"responda com os alertas internos e avise o plantonista\").",
    "Injete o <code>fetch</code> para testar com fake: resposta válida, timeout e formato inválido."
   ],
   "code": {
    "lang": "ts",
    "src": "import { z } from \"zod\";\n\nconst statusSchema = z\n  .object({ status: z.object({ indicator: z.string(), description: z.string() }) })\n  .passthrough();\n\nconst URLS = {\n  github: \"https://www.githubstatus.com/api/v2/status.json\",\n  cloudflare: \"https://www.cloudflarestatus.com/api/v2/status.json\",\n} as const;\n\ntype FetchLike = typeof globalThis.fetch;\n\nexport async function fetchProviderStatus(\n  provider: keyof typeof URLS,\n  doFetch: FetchLike = globalThis.fetch,\n): Promise<string> {\n  let detail = \"unknown error\";\n  for (let attempt = 1; attempt <= 2; attempt += 1) {\n    try {\n      const response = await doFetch(URLS[provider], { signal: AbortSignal.timeout(5000) });\n      if (response.status >= 500) throw new Error(`upstream ${response.status}`);\n      if (!response.ok) return `status page de ${provider} respondeu HTTP ${response.status}`;\n      const parsed = statusSchema.safeParse(await response.json());\n      if (!parsed.success) return `não consegui validar a resposta de ${provider}`;\n      return `${provider} está ${parsed.data.status.indicator} - ${parsed.data.status.description}`;\n    } catch (error) {\n      detail = (error as Error).message;\n    }\n  }\n  return (\n    `não consegui consultar ${provider} (${detail}). ` +\n    \"Responda com os alertas internos e avise o plantonista\"\n  );\n}"
   },
   "resultado": "O agente continua útil com informação parcial e o trace registra a limitação; testes sem internet.",
   "quandoNao": [
    "Escrita não idempotente: retry pode duplicar.",
    "Dependência crítica em que a falha deve abortar o fluxo.",
    "API interna com SLA e circuit breaker já existentes."
   ],
   "armadilha": "Retry infinito, ou confiar no JSON de uma resposta 200 sem validar.",
   "repo": {
    "label": "03-function-calling-e-tool-use",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use"
   }
  },
  {
   "id": "P4-12",
   "title": "Contrato de tool: descrição \"quando usar / quando não usar\" e schema defensivo",
   "topics": [
    "D4-07",
    "D4-02"
   ],
   "cenario": "O agente abre incidente com severity \"sev2\" e o banco só aceita \"high\"; em outro dia chama <code>open_incident</code> só para consultar. A descrição ruim faz escolher a ação errada mesmo com bom modelo.",
   "passos": [
    "Descreva a tool com: o que faz, quando usar, quando não usar (apontando a tool certa).",
    "Use enums fechados e <code>.describe()</code> em todo campo.",
    "Normalize aliases com <code>z.preprocess</code> (sev1..sev4 para critical..low).",
    "Compartilhe o schema entre o agente e o servidor MCP (fonte única).",
    "Valide por teste: erro de input vira mensagem legível, não exceção."
   ],
   "code": {
    "lang": "ts",
    "src": "import { tool } from \"@langchain/core/tools\";\nimport { z } from \"zod\";\n\nconst SEVERITIES = [\"critical\", \"high\", \"medium\", \"low\"] as const;\n\nconst aliases: Record<string, string> = {\n  sev1: \"critical\",\n  sev2: \"high\",\n  sev3: \"medium\",\n  sev4: \"low\",\n};\n\nconst normalizeSeverity = (value: unknown) =>\n  typeof value === \"string\" ? (aliases[value.trim().toLowerCase()] ?? value) : value;\n\nexport const openIncidentSchema = z.object({\n  title: z.string().min(1).describe(\"Título curto do incidente\"),\n  service: z.string().min(1).describe(\"Nome exato do serviço afetado (ex.: payments, checkout)\"),\n  severity: z\n    .preprocess(normalizeSeverity, z.enum(SEVERITIES))\n    .describe(\"critical | high | medium | low\"),\n});\n\nexport const openIncident = tool(\n  async ({ title, service, severity }) => `Incident created: ${service} | ${severity} | ${title}`,\n  {\n    name: \"open_incident\",\n    description:\n      \"Abre um incidente formal. Quando usar: após identificar problema que exige registro. \" +\n      \"Quando não usar: só para consultar alertas ou se o incidente já existe (use list_incidents).\",\n    schema: openIncidentSchema,\n  },\n);"
   },
   "resultado": "Menos chamadas inválidas e menos escolha errada de tool, com o schema como única fonte de verdade.",
   "quandoNao": [
    "Tool trivial de um parâmetro sem ambiguidade.",
    "Aliases que escondem erro real do modelo sem registrar.",
    "Tools demais com descrições sobrepostas (consolide)."
   ],
   "armadilha": "Descrição vaga: o modelo escolhe a ação errada e ninguém vê, porque o schema valida.",
   "repo": {
    "label": "03-function-calling-e-tool-use",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use"
   }
  },
  {
   "id": "P4-13",
   "title": "Expor as tools como servidor MCP sem duplicar regra",
   "topics": [
    "D4-08"
   ],
   "cenario": "O OpsPilot tem tools prontas, mas o Copilot/Claude Code do time não as enxerga. Reescrever a lógica num segundo lugar cria divergência.",
   "passos": [
    "Crie um <code>McpServer</code> com nome e versão.",
    "Registre cada tool com <code>registerTool(nome, {description, inputSchema}, handler)</code> reusando o mesmo schema Zod.",
    "O handler só chama a função de negócio existente e embrulha em <code>{content:[{type:\"text\"}]}</code>.",
    "Conecte com <code>StdioServerTransport</code>; no stdio, <b>stdout é do protocolo</b>, logue em stderr.",
    "Exponha só leitura e ações reversíveis na v1 (listar, abrir, resolver)."
   ],
   "code": {
    "lang": "ts",
    "src": "import { McpServer } from \"@modelcontextprotocol/sdk/server/mcp.js\";\nimport { StdioServerTransport } from \"@modelcontextprotocol/sdk/server/stdio.js\";\nimport { z } from \"zod\";\n\nconst listAlertsSchema = z.object({\n  status: z.enum([\"firing\", \"resolved\", \"all\"]).default(\"firing\"),\n});\n\nasync function listAlerts(args: z.infer<typeof listAlertsSchema>): Promise<string> {\n  return `Found 2 ${args.status} alert(s)`;\n}\n\nconst server = new McpServer({ name: \"opspilot\", version: \"0.1.0\" });\n\nserver.registerTool(\n  \"list_alerts\",\n  {\n    description: \"Lista alertas por status. Quando usar: inventário de alertas operacionais.\",\n    inputSchema: listAlertsSchema,\n  },\n  async (args) => ({ content: [{ type: \"text\" as const, text: await listAlerts(args) }] }),\n);\n\nawait server.connect(new StdioServerTransport());\nconsole.error(\"opspilot MCP server: pronto (stdio)\");"
   },
   "resultado": "Mesmas regras de negócio atendem a API HTTP, o agente e qualquer cliente MCP.",
   "quandoNao": [
    "Só você usa a tool, dentro do mesmo processo.",
    "Ferramenta que exige permissões que o cliente MCP não consegue controlar.",
    "Tool destrutiva sem camada de aprovação."
   ],
   "armadilha": "<code>console.log</code> no servidor stdio: corrompe o protocolo.",
   "repo": {
    "label": "08-projeto-pratico-opspilot-publicado (src/mcp)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/08-projeto-pratico-opspilot-publicado"
   }
  },
  {
   "id": "P4-14",
   "title": "Memória semântica: embeddings, limiar de relevância e deduplicação",
   "topics": [
    "D4-09"
   ],
   "cenario": "O plantonista diz toda semana \"priorize o checkout\". Sem memória longa o agente esquece; com memória que recupera \"top 3\" sempre, injeta fatos irrelevantes e infla o contexto.",
   "passos": [
    "Guarde cada fato com embedding normalizado, por usuário.",
    "Antes de gravar, calcule a similaridade com os existentes e ignore se passar de 0,92 (dedup).",
    "Na recuperação, <b>filtre por score mínimo (0,3) antes</b> de cortar no top-k (3).",
    "Injete só os fatos recuperados no prompt (<code>Relevant memories</code>).",
    "Dê uma tool de esquecer preferência.",
    "O snippet usa lista em memória; o repo persiste embeddings em SQLite (BLOB)."
   ],
   "code": {
    "lang": "ts",
    "src": "import { randomUUID } from \"node:crypto\";\n\ninterface Embedder { embed(text: string): Promise<Float32Array> }\n\ninterface MemoryRow { id: string; userId: string; fact: string; embedding: Float32Array }\n\nconst DEDUP_THRESHOLD = 0.92;\nconst RECALL_MIN_SCORE = 0.3;\nconst RECALL_TOP_K = 3;\n\nconst dot = (a: Float32Array, b: Float32Array) =>\n  a.reduce((sum, value, index) => sum + value * (b[index] ?? 0), 0);\n\nexport class SemanticMemory {\n  private readonly rows: MemoryRow[] = [];\n\n  constructor(private readonly embedder: Embedder) {}\n\n  async remember(userId: string, fact: string) {\n    const embedding = await this.embedder.embed(fact);\n    const duplicate = this.rows.find(\n      (row) => row.userId === userId && dot(embedding, row.embedding) > DEDUP_THRESHOLD,\n    );\n    if (duplicate) return { id: duplicate.id, stored: false };\n    const id = randomUUID();\n    this.rows.push({ id, userId, fact, embedding });\n    return { id, stored: true };\n  }\n\n  async recall(userId: string, query: string, k = RECALL_TOP_K) {\n    const q = await this.embedder.embed(query);\n    return this.rows\n      .filter((row) => row.userId === userId)\n      .map((row) => ({ id: row.id, fact: row.fact, score: dot(q, row.embedding) }))\n      .filter((hit) => hit.score >= RECALL_MIN_SCORE)\n      .sort((a, b) => b.score - a.score)\n      .slice(0, k);\n  }\n}"
   },
   "resultado": "Preferências duráveis sobrevivem entre conversas, sem duplicatas e sem lixo no contexto.",
   "quandoNao": [
    "Poucos fatos por usuário: busca por palavra-chave resolve.",
    "Dados sensíveis sem política de retenção.",
    "Conversa de uso único."
   ],
   "armadilha": "Esquecer o limiar: \"top 3\" sempre devolve três, mesmo irrelevantes.",
   "repo": {
    "label": "04-memoria-e-reflexao-em-agentes-autonomos",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/04-memoria-e-reflexao-em-agentes-autonomos"
   }
  },
  {
   "id": "P4-15",
   "title": "Refletor de aprendizado: o que merece virar memória permanente",
   "topics": [
    "D4-09"
   ],
   "cenario": "Gravar toda mensagem como memória enche a base de pedidos pontuais e, pior, de segredos colados no chat (tokens, senhas).",
   "passos": [
    "Rode um passo de classificação com saída estruturada <code>{hasLearning, fact}</code>.",
    "O prompt define durável (\"sempre priorize checkout\") versus pontual (\"liste alertas\") e proíbe segredos.",
    "Grave <code>fact</code> normalizado numa frase, não a mensagem crua.",
    "Falha do refletor é engolida de propósito (<i>best effort</i>): nunca quebra o turno. Registre a falha em métrica.",
    "Para pedidos de organizar o plantão, espere o refletor antes de recuperar; nos demais, rode em segundo plano."
   ],
   "code": {
    "lang": "ts",
    "src": "import type { ChatOpenAI } from \"@langchain/openai\";\nimport { z } from \"zod\";\n\nconst learningSchema = z.object({\n  hasLearning: z\n    .boolean()\n    .describe(\"true só para preferência ou fato operacional DURÁVEL, nunca pedido pontual nem segredo\"),\n  fact: z.string().describe(\"enunciado estável em 1 frase; vazio se hasLearning=false\"),\n});\n\nconst PROMPT =\n  \"Destile APRENDIZADOS DURÁVEIS da mensagem. \" +\n  \"hasLearning=false para pedidos pontuais e para qualquer segredo (senha, token, chave).\";\n\ninterface Memory { remember(userId: string, fact: string): Promise<unknown> }\n\nexport async function learnFromMessage(\n  model: ChatOpenAI,\n  memory: Memory,\n  userId: string,\n  message: string,\n): Promise<void> {\n  try {\n    const learning = learningSchema.parse(\n      await model.withStructuredOutput(learningSchema).invoke([\n        [\"system\", PROMPT],\n        [\"user\", message],\n      ]),\n    );\n    const fact = learning.fact.trim();\n    if (learning.hasLearning && fact.length > 0) {\n      await memory.remember(userId, fact);\n    }\n  } catch {\n    return;\n  }\n}"
   },
   "resultado": "Memória só com preferências estáveis, sem segredos e sem repetição.",
   "quandoNao": [
    "Sem memória semântica por trás.",
    "Chat anônimo sem identidade de usuário.",
    "Domínio em que nada deve ser retido (regulado)."
   ],
   "armadilha": "Gravar pedido pontual ou segredo como memória permanente.",
   "repo": {
    "label": "04-memoria-e-reflexao-em-agentes-autonomos",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/04-memoria-e-reflexao-em-agentes-autonomos"
   }
  },
  {
   "id": "P4-16",
   "title": "Contexto como orçamento: medir tokens e sumarizar em lote",
   "topics": [
    "D4-10"
   ],
   "cenario": "Conversas longas de plantão estouram janela e custo; cortar o histórico às cegas perde decisões e incidentes abertos.",
   "passos": [
    "Meça antes de otimizar: estimativa <code>chars/4</code> e, quando houver, o <code>usage_metadata</code> real do provedor.",
    "Mantenha só as últimas 8 mensagens cruas.",
    "Quando 8 mensagens saírem da janela, sumarize <b>um lote</b>, incorporando o resumo anterior.",
    "O prompt do sumarizador preserva decisões, fatos, incidentes e pendências e descarta cumprimento.",
    "Guarde o watermark (<code>covered</code>) para não ressumarizar.",
    "Em produção o sumarizador é fail-safe: erro retorna sem resumo novo."
   ],
   "code": {
    "lang": "ts",
    "src": "import type { ChatOpenAI } from \"@langchain/openai\";\n\ninterface Message { role: \"user\" | \"assistant\"; content: string }\n\nconst HISTORY_LIMIT = 8;\nconst SUMMARY_BATCH_SIZE = 8;\nconst SUMMARY_TOKEN_TARGET = 150;\n\nexport const estimateTokens = (text: string) => Math.floor(text.length / 4);\n\nexport async function maybeSummarize(\n  model: ChatOpenAI,\n  messages: Message[],\n  summary: { text: string; covered: number },\n): Promise<{ text: string; covered: number }> {\n  const pending = Math.max(0, messages.length - HISTORY_LIMIT) - summary.covered;\n  if (pending < SUMMARY_BATCH_SIZE) return summary;\n\n  const batch = messages.slice(summary.covered, summary.covered + SUMMARY_BATCH_SIZE);\n  const excerpt = batch.map((m) => `${m.role}: ${m.content}`).join(\"\\n\")\n  const result = await model.invoke([\n    [\n      \"system\",\n      `Comprima em no máximo ${SUMMARY_TOKEN_TARGET} tokens, preservando decisões, fatos, ` +\n        \"incidentes e pendências. Só tópicos telegráficos.\",\n    ],\n    [\"user\", `Resumo anterior:\\n${summary.text || \"(nenhum)\"}\\n\\nTrecho:\\n${excerpt}`],\n  ]);\n  const text = String(result.content).trim().slice(0, SUMMARY_TOKEN_TARGET * 4);\n  return { text, covered: summary.covered + SUMMARY_BATCH_SIZE };\n}"
   },
   "resultado": "Prompt com tamanho previsível sem perder decisões; sumariza a cada 8 mensagens e não a cada request.",
   "quandoNao": [
    "Conversas curtas.",
    "Fluxo em que o histórico completo é auditável e precisa ficar no prompt.",
    "Modelos com janela folgada e sem pressão de custo."
   ],
   "armadilha": "Cortar o histórico sem sumarizar, e perder decisões.",
   "repo": {
    "label": "05-gerenciamento-de-contextos",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/05-gerenciamento-de-contextos"
   }
  },
  {
   "id": "P4-17",
   "title": "Context stitching: ContextBuilder com teto e regra de corte por seção",
   "topics": [
    "D4-11",
    "D4-10"
   ],
   "cenario": "Prompt montado por concatenação: um histórico gigante empurra para fora memórias relevantes, e quando o corte acontece é no system prompt.",
   "passos": [
    "Defina o orçamento por seção (resumo 200, histórico 1200, memórias 300) lido de env.",
    "Declare a regra de corte de cada uma: system e mensagem atual <b>nunca</b> cortam; histórico corta o mais antigo; memórias cortam o menor score.",
    "Corte até caber; restando um item, trunque o texto.",
    "Monte o envelope: resumo, memórias relevantes e mensagem atual.",
    "Devolva as contagens (mensagens, memórias) para o trace.",
    "Confira se o nome da env é o mesmo que o código lê."
   ],
   "code": {
    "lang": "ts",
    "src": "interface Message { role: string; content: string }\ninterface Memory { fact: string; score: number }\n\nconst estimateTokens = (text: string) => Math.floor(text.length / 4);\nconst historyText = (history: Message[]) =>\n  history.map((m) => `${m.role}: ${m.content}`).join(\"\\n\")\n\nconst SUMMARY_BUDGET = Number(process.env.CONTEXT_SUMMARY_TOKENS ?? 200)\nconst HISTORY_BUDGET = Number(process.env.CONTEXT_HISTORY_TOKENS ?? 1200)\nconst MEMORIES_BUDGET = Number(process.env.CONTEXT_MEMORIES_TOKENS ?? 300);\n\nexport function fitHistory(history: Message[], budget: number): Message[] {\n  let kept = [...history];\n  while (kept.length > 1 && estimateTokens(historyText(kept)) > budget) kept = kept.slice(1);\n  return kept;\n}\n\nexport function fitMemories(memories: Memory[], budget: number): Memory[] {\n  const kept = [...memories];\n  const size = () => estimateTokens(kept.map((m) => `- ${m.fact}`).join(\"\\n\"));\n  while (kept.length > 1 && size() > budget) {\n    const worst = kept.reduce((low, m, i) => (m.score < kept[low]!.score ? i : low), 0);\n    kept.splice(worst, 1);\n  }\n  return kept;\n}\n\nexport function buildPrompt(input: {\n  system: string;\n  summary: string;\n  history: Message[];\n  memories: Memory[];\n  message: string;\n}) {\n  const history = fitHistory(input.history, HISTORY_BUDGET);\n  const memories = fitMemories(input.memories, MEMORIES_BUDGET);\n  const summary = input.summary.slice(0, SUMMARY_BUDGET * 4);\n  const body = [\n    summary && `Conversation summary:\\n${summary}`,\n    memories.length > 0 && `Relevant memories:\\n${memories.map((m) => `- ${m.fact}`).join(\"\\n\")}`,\n    `Current message:\\n${input.message}`,\n  ].filter(Boolean);\n  return { system: input.system, history, user: body.join(\"\\n\\n\") };\n}"
   },
   "resultado": "Prompt com teto por seção e perda previsível: cortam-se os itens menos valiosos.",
   "quandoNao": [
    "Prompts curtos que nunca chegam ao teto.",
    "Contexto pequeno e estático.",
    "Quando o corte exige entendimento semântico (aí sumarize)."
   ],
   "armadilha": "Tratar o budget como meta a preencher, ou cortar system e resumo com a mesma regra do histórico.",
   "repo": {
    "label": "05-gerenciamento-de-contextos",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/05-gerenciamento-de-contextos"
   }
  },
  {
   "id": "P4-18",
   "title": "Grafo de produção com roteador estruturado (LangGraph)",
   "topics": [
    "D4-12",
    "D4-02"
   ],
   "cenario": "Três estratégias existem, mas o cliente precisa escolher qual usar. Pedido simples vai para o P&E e demora um minuto; pedido de várias etapas vai para o ReAct e erra a ordem.",
   "passos": [
    "Declare o estado com <code>Annotation.Root</code>.",
    "Crie um nó <code>classify</code> com <code>withStructuredOutput(routeSchema)</code>, devolvendo rota e <b>razão</b>.",
    "Se o roteador falhar, caia em <code>react</code> com razão de fallback.",
    "Ligue com <code>addConditionalEdges</code> para o nó de cada estratégia.",
    "Aceite override pelo corpo da requisição e registre-o no trace.",
    "Grave rota e razão no trace."
   ],
   "code": {
    "lang": "ts",
    "src": "import { Annotation, END, START, StateGraph } from \"@langchain/langgraph\";\nimport type { ChatOpenAI } from \"@langchain/openai\";\nimport { z } from \"zod\";\nconst ROUTES = [\"react\", \"planExecute\", \"reflect\", \"team\"] as const;\ntype Route = (typeof ROUTES)[number];\ntype Runners = Record<Route, (message: string) => Promise<string>>;\nconst routeSchema = z.object({ route: z.enum(ROUTES), reason: z.string() });\nconst ROUTER_PROMPT =\n  \"Escolha: react (consulta), planExecute (várias etapas), \" +\n  \"reflect (alta criticidade), team (diagnóstico + plano + execução).\";\nconst State = Annotation.Root({\n  message: Annotation<string>(),\n  route: Annotation<Route>(),\n  reason: Annotation<string>(),\n  answer: Annotation<string>(),\n});\nexport function buildGraph(model: ChatOpenAI, runners: Runners) {\n  const router = model.withStructuredOutput(routeSchema);\n  const classify = async (state: typeof State.State) =>\n    router\n      .invoke([[\"system\", ROUTER_PROMPT], [\"user\", state.message]])\n      .catch(() => ({ route: \"react\" as const, reason: \"fallback: router failed\" }));\n\n  const run = (route: Route) => async (state: typeof State.State) => ({\n    answer: await runners[route](state.message),\n  });\n\n  return new StateGraph(State)\n    .addNode(\"classify\", classify)\n    .addNode(\"react\", run(\"react\"))\n    .addNode(\"planExecute\", run(\"planExecute\"))\n    .addNode(\"reflect\", run(\"reflect\"))\n    .addNode(\"team\", run(\"team\"))\n    .addEdge(START, \"classify\")\n    .addConditionalEdges(\"classify\", (state) => state.route)\n    .addEdge(\"react\", END)\n    .addEdge(\"planExecute\", END)\n    .addEdge(\"reflect\", END)\n    .addEdge(\"team\", END)\n    .compile();\n}"
   },
   "resultado": "A estratégia sai do cliente e vira decisão auditável (rota + justificativa no trace).",
   "quandoNao": [
    "Só uma estratégia em produção.",
    "Classificador mais caro que a tarefa.",
    "Rota que pode ser decidida por regra simples no código."
   ],
   "armadilha": "Esquecer de registrar o override no trace.",
   "repo": {
    "label": "06-langgraph-e-workflows-complexos",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/06-langgraph-e-workflows-complexos"
   }
  },
  {
   "id": "P4-19",
   "title": "Fallback de modelo com retry curto (disponibilidade, não roteamento)",
   "topics": [
    "D4-12"
   ],
   "cenario": "O modelo gratuito do provedor responde 429/5xx no horário de pico e o plantão fica sem copiloto.",
   "passos": [
    "Crie o modelo primário com <code>maxRetries: 0</code> e use <code>withRetry({ stopAfterAttempt: 2 })</code> (teto explícito).",
    "Crie o backup (outro modelo) com a mesma configuração.",
    "Componha: <code>primary.withFallbacks([backup])</code>.",
    "Faça o mesmo para <code>bindTools</code> e <code>withStructuredOutput</code>, não só para <code>invoke</code> (o repo usa uma fachada para isso).",
    "Registre no trace e nas métricas qual modelo respondeu.",
    "Se tudo falhar, devolva um erro de domínio claro (modelo indisponível)."
   ],
   "code": {
    "lang": "ts",
    "src": "import { ChatOpenAI } from \"@langchain/openai\";\n\nconst RETRY_ATTEMPTS = 2;\n\nconst baseModel = (modelId: string) =>\n  new ChatOpenAI({\n    model: modelId,\n    temperature: 0,\n    maxRetries: 0,\n    apiKey: process.env.OPENROUTER_API_KEY,\n    configuration: { baseURL: \"https://openrouter.ai/api/v1\" },\n  });\n\nexport function createResilientModel() {\n  const primary = baseModel(process.env.OPENROUTER_MODEL ?? \"primary/model\").withRetry({\n    stopAfterAttempt: RETRY_ATTEMPTS,\n  });\n  const backupId = process.env.OPENROUTER_MODEL_FALLBACK;\n  if (!backupId) return primary;\n  const backup = baseModel(backupId).withRetry({ stopAfterAttempt: RETRY_ATTEMPTS });\n  return primary.withFallbacks([backup]);\n}"
   },
   "resultado": "Queda do modelo principal vira degradação invisível ao usuário, com o modelo usado visível nas métricas.",
   "quandoNao": [
    "Quando os dois modelos têm comportamento muito diferente em tool calling.",
    "Provedor único contratado, sem alternativa aprovada.",
    "Custo do backup muito acima do primário sem alerta."
   ],
   "armadilha": "Misturar roteamento (qual estratégia) com disponibilidade (qual modelo), ou retry sem teto antes do fallback.",
   "repo": {
    "label": "06-langgraph-e-workflows-complexos",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/06-langgraph-e-workflows-complexos"
   }
  },
  {
   "id": "P4-20",
   "title": "Trace persistido e logs JSON só com metadados",
   "topics": [
    "D4-13"
   ],
   "cenario": "Horas depois, alguém pergunta por que o agente resolveu aquele incidente. Sem trace não há como reproduzir; com log de prompt \"para depurar\" vazam dados de usuário.",
   "passos": [
    "Gere um <code>requestId</code> por requisição e devolva ao cliente.",
    "Persista um registro de requisição (usuário, rota, modelo, tokens, latência, status) e os eventos do trace na ordem, ligados pelo requestId.",
    "Faça o logger emitir uma linha JSON por evento e <b>descartar</b> chaves proibidas (message, answer, prompt, trace...) por construção.",
    "Cubra com teste que prova que o conteúdo nunca sai.",
    "Exponha consulta por requestId e estatísticas (p50/p95 por rota e modelo).",
    "Defina retenção: o repo não implementa."
   ],
   "code": {
    "lang": "ts",
    "src": "type LogMeta = Record<string, string | number | boolean | null | undefined>;\n\nconst FORBIDDEN_KEYS = new Set([\n  \"message\",\n  \"answer\",\n  \"trace\",\n  \"content\",\n  \"payload\",\n  \"toolArgs\",\n  \"body\",\n  \"prompt\",\n]);\n\nexport function createLogger(write: (line: string) => void = (line) => process.stdout.write(line)) {\n  const emit = (level: \"info\" | \"warn\" | \"error\", event: string, meta: LogMeta = {}) => {\n    const safe = Object.fromEntries(\n      Object.entries(meta).filter(\n        ([key, value]) => !FORBIDDEN_KEYS.has(key) && value !== undefined,\n      ),\n    );\n    write(`${JSON.stringify({ ts: Date.now(), level, event, ...safe })}\\n`);\n  };\n  return {\n    info: (event: string, meta?: LogMeta) => emit(\"info\", event, meta),\n    warn: (event: string, meta?: LogMeta) => emit(\"warn\", event, meta),\n    error: (event: string, meta?: LogMeta) => emit(\"error\", event, meta),\n  };\n}\n\nconst logger = createLogger();\nlogger.info(\"chat_request_end\", {\n  requestId: \"7f0c\",\n  route: \"planExecute\",\n  latencyMs: 91000,\n  answer: \"texto que nunca sai\",\n});"
   },
   "resultado": "Investigação por requestId sem debugger, métricas por rota/modelo e logs que não vazam conteúdo.",
   "quandoNao": [
    "Protótipo local sem usuários reais.",
    "Quando a plataforma já tem tracing de LLM contratado.",
    "Domínio sem política de retenção definida para o payload."
   ],
   "armadilha": "Logar prompt, resposta ou segredo \"para depurar\".",
   "repo": {
    "label": "07-observabilidade-e-limites-de-autonomia",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/07-observabilidade-e-limites-de-autonomia"
   }
  },
  {
   "id": "P4-21",
   "title": "Matriz de autonomia e aprovação humana (HITL)",
   "topics": [
    "D4-13"
   ],
   "cenario": "O copiloto pode resolver e silenciar coisas em produção. Sem limite explícito, uma alucinação vira ação destrutiva; aprovar tudo, por outro lado, torna o agente inútil.",
   "passos": [
    "Classifique as ações em 4 faixas: decide sozinho (consultar), decide e audita (abrir/resolver), pede aprovação (destrutivo, gasto acima do teto) e proibido (apagar a própria trilha).",
    "Para a faixa 3, com <code>awaitHumanApproval: true</code> o endpoint guarda a requisição e devolve <b>202</b> com <code>approvalId</code>, sem executar.",
    "Uma rota de decisão recebe <code>approve</code> ou <code>deny</code>, confere o usuário e só então executa.",
    "A aprovação é consumida (uso único).",
    "O snippet usa um Map em memória; persistir é decisão de produção.",
    "Aprovação cobre só a faixa 3: não é a matriz inteira."
   ],
   "code": {
    "lang": "ts",
    "src": "import { randomUUID } from \"node:crypto\";\nimport express from \"express\";\nimport { z } from \"zod\";\n\ninterface Pending { approvalId: string; userId: string; message: string }\n\nconst pending = new Map<string, Pending>();\nconst decisionSchema = z.object({\n  decision: z.enum([\"approve\", \"deny\"]),\n  userId: z.string().min(1),\n});\n\nexport function approvalRoutes(execute: (message: string, userId: string) => Promise<string>) {\n  const app = express();\n  app.use(express.json());\n\n  app.post(\"/chat\", async (req, res) => {\n    const { message, userId, awaitHumanApproval } = req.body as {\n      message: string; userId: string; awaitHumanApproval?: boolean;\n    };\n    if (!awaitHumanApproval) {\n      res.status(200).json({ answer: await execute(message, userId) });\n      return;\n    }\n    const approvalId = randomUUID();\n    pending.set(approvalId, { approvalId, userId, message });\n    res.status(202).json({ pending: { approvalId, summary: message.slice(0, 240) } });\n  });\n\n  app.post(\"/approvals/:approvalId\", async (req, res) => {\n    const body = decisionSchema.safeParse(req.body);\n    if (!body.success) { res.status(400).json({ error: \"validation_error\" }); return; }\n    const request = pending.get(req.params.approvalId);\n    if (!request || request.userId !== body.data.userId) {\n      res.status(404).json({ error: \"approval_not_found\" });\n      return;\n    }\n    pending.delete(request.approvalId);\n    if (body.data.decision === \"deny\") { res.status(200).json({ status: \"denied\" }); return; }\n    res.status(200).json({ answer: await execute(request.message, request.userId) });\n  });\n\n  return app;\n}"
   },
   "resultado": "Ações de maior impacto passam por um humano identificável, enquanto a rotina continua autônoma.",
   "quandoNao": [
    "Ações leitura-apenas.",
    "Aprovar tudo, o que cria fadiga e anula o controle.",
    "Fluxos em que a latência humana é inaceitável (use limites e reversibilidade)."
   ],
   "armadilha": "Tratar aprovação como se fosse a matriz de autonomia inteira.",
   "repo": {
    "label": "07-observabilidade-e-limites-de-autonomia",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/07-observabilidade-e-limites-de-autonomia"
   }
  },
  {
   "id": "P4-22",
   "title": "War Room: front sobre a mesma API e publicação estática no Pages",
   "topics": [
    "D4-14"
   ],
   "cenario": "O time quer uma tela do plantão e uma demo pública. O build funciona local, mas no GitHub Pages os assets dão 404, e alguém propõe expor o backend por um túnel sem autenticação.",
   "passos": [
    "Faça o front consumir a mesma API HTTP (sem lógica duplicada).",
    "Configure o <code>base</code> do Vite pelo nome do repositório (<code>/nome-do-repo/</code>) na build do Pages.",
    "Publique só o estático; o backend continua em outro lugar.",
    "Se usar túnel público, ponha autenticação antes.",
    "CORS explícito no backend para a origem do Pages."
   ],
   "code": {
    "lang": "ts",
    "src": "import { defineConfig } from \"vite\";\n\nexport default defineConfig({\n  base: process.env.VITE_BASE ?? \"/\",\n  build: { outDir: \"dist\" },\n});"
   },
   "resultado": "Demo navegável publicada, com a mesma API do agente por trás.",
   "quandoNao": [
    "Painel interno que cabe num endpoint de status.",
    "Backend com dados reais e sem autenticação.",
    "Quando ninguém além do dev vai abrir a tela."
   ],
   "armadilha": "Esquecer o <code>base</code> do Vite no Pages, ou achar que o Pages hospedou a aplicação inteira.",
   "repo": {
    "label": "08-projeto-pratico-opspilot-publicado (web)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/08-projeto-pratico-opspilot-publicado"
   }
  },
  {
   "id": "P4-23",
   "title": "Multiagente: supervisor, papéis com ferramentas mínimas e blackboard",
   "topics": [
    "D4-15"
   ],
   "cenario": "Um incidente exige diagnosticar, planejar e executar. Um agente único com todas as tools mistura as fases e pode agir antes de ter fatos.",
   "passos": [
    "Defina papéis: analista (só leitura), planejador (sem tools) e executor (tools de escrita).",
    "Crie um <b>blackboard</b> por turno: cada papel acrescenta uma entrada (papel, brief, conteúdo).",
    "O supervisor devolve <code>{next, brief}</code> estruturado; <code>done</code> encerra.",
    "Cada papel volta ao supervisor (handoff); registre cada handoff no trace.",
    "Imponha um teto de delegações (8 no repo) e trate decisão inválida como encerramento.",
    "Use o time só para pedidos que cruzam diagnóstico, plano e execução."
   ],
   "code": {
    "lang": "ts",
    "src": "import { Annotation, END, START, StateGraph } from \"@langchain/langgraph\";\n\nconst MAX_HANDOFFS = 8;\ntype Role = \"analista\" | \"planejador\" | \"executor\";\ntype Decision = { next: Role | \"done\"; brief: string };\ninterface Entry { role: Role; brief: string; content: string }\n\nconst State = Annotation.Root({\n  message: Annotation<string>(),\n  blackboard: Annotation<Entry[]>({\n    reducer: (left, right) => left.concat(right),\n    default: () => [],\n  }),\n  handoffs: Annotation<number>({ reducer: (_left, right) => right, default: () => 0 }),\n  next: Annotation<Role | \"done\">({ reducer: (_left, right) => right, default: () => \"analista\" }),\n  brief: Annotation<string>({ reducer: (_left, right) => right, default: () => \"\" }),\n});\n\nexport function createTeam(\n  decideNext: (message: string, blackboard: Entry[]) => Promise<Decision>,\n  runRole: Record<Role, (brief: string, blackboard: Entry[]) => Promise<string>>,\n) {\n  const supervisor = async (state: typeof State.State) => {\n    if (state.handoffs >= MAX_HANDOFFS) return { next: \"done\" as const };\n    const decision = await decideNext(state.message, state.blackboard);\n    const delegated = decision.next === \"done\" ? 0 : 1;\n    return { next: decision.next, brief: decision.brief, handoffs: state.handoffs + delegated };\n  };\n\n  const role = (name: Role) => async (state: typeof State.State) => {\n    const content = await runRole[name](state.brief, state.blackboard)\n    return { blackboard: [{ role: name, brief: state.brief, content }] }\n  };\n\n  return new StateGraph(State)\n    .addNode(\"supervisor\", supervisor)\n    .addNode(\"analista\", role(\"analista\"))\n    .addNode(\"planejador\", role(\"planejador\"))\n    .addNode(\"executor\", role(\"executor\"))\n    .addEdge(START, \"supervisor\")\n    .addConditionalEdges(\"supervisor\", (state) => (state.next === \"done\" ? END : state.next))\n    .addEdge(\"analista\", \"supervisor\")\n    .addEdge(\"planejador\", \"supervisor\")\n    .addEdge(\"executor\", \"supervisor\")\n    .compile();\n}"
   },
   "resultado": "Separação de responsabilidades verificável: quem diagnostica não escreve, quem escreve segue um plano registrado.",
   "quandoNao": [
    "Pergunta simples que um ReAct responde.",
    "Quando o custo de várias chamadas por turno não se justifica.",
    "Antes de provar que um agente único não basta."
   ],
   "armadilha": "Dar ao analista ou ao planejador ferramentas de escrita, ou deixar o supervisor delegar sem teto.",
   "repo": {
    "label": "09-multi-agent-systems (src/team)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/09-multi-agent-systems"
   }
  }
 ]
});
