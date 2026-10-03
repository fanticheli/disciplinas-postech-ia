STUDY.push({
 "disc": {
  "num": "04",
  "nome": "Disciplina 04",
  "titulo": "Criação de Agentes Autônomos",
  "autor": "Thiago Bussola",
  "emoji": "🤖",
  "resumo": "Opera um agente de código com método (contexto, permissões, spec-driven development) e constrói do zero o OpsPilot, um copiloto de plantão: padrões ReAct, Plan-and-Execute e Reflection, tools, MCP, memória, orçamento de contexto, LangGraph, observabilidade, War Room publicada e multiagente."
 },
 "materiais": [
  [
   "Repositório oficial — módulo 04",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo"
  ],
  [
   "Snapshot da Unidade 1 (notas-api)",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/01-arquitetura-de-agentes-de-codigo"
  ],
  [
   "Snapshot final (Unidade 9, OpsPilot completo)",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/09-multi-agent-systems"
  ],
  [
   "OpenRouter (gateway de modelos usado no módulo)",
   "https://openrouter.ai/"
  ],
  [
   "OpenRouter: modelos gratuitos",
   "https://openrouter.ai/models?max_price=0"
  ],
  [
   "Indicação: Model Context Protocol (especificação e servidores)",
   "https://modelcontextprotocol.io"
  ],
  [
   "Indicação: LangGraph JS",
   "https://langchain-ai.github.io/langgraphjs"
  ],
  [
   "Indicação: GitHub Spec Kit",
   "https://github.com/github/spec-kit"
  ],
  [
   "Indicação: ReAct (Yao et al., arXiv:2210.03629)",
   "https://arxiv.org/abs/2210.03629"
  ],
  [
   "Indicação: Plan-and-Solve Prompting (Wang et al., arXiv:2305.04091)",
   "https://arxiv.org/abs/2305.04091"
  ],
  [
   "Indicação: Reflexion (Shinn et al., arXiv:2303.11366)",
   "https://arxiv.org/abs/2303.11366"
  ],
  [
   "Indicação: Self-Refine (Madaan et al., arXiv:2303.17651)",
   "https://arxiv.org/abs/2303.17651"
  ],
  [
   "Indicação: Lost in the Middle (Liu et al., arXiv:2307.03172)",
   "https://arxiv.org/abs/2307.03172"
  ],
  [
   "Indicação: Generative Agents (Park et al., arXiv:2304.03442)",
   "https://arxiv.org/abs/2304.03442"
  ],
  [
   "Live de 27/05/2026: SDD enterprise (repositório do curso)",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-05-27"
  ]
 ],
 "blocos": [
  {
   "id": "d04-b0",
   "label": "Agentes de código e Spec-Driven Development"
  },
  {
   "id": "d04-b1",
   "label": "Padrões de raciocínio e o núcleo do OpsPilot"
  },
  {
   "id": "d04-b2",
   "label": "Tools, persistência e MCP"
  },
  {
   "id": "d04-b3",
   "label": "Memória e contexto"
  },
  {
   "id": "d04-b4",
   "label": "Grafo de produção, observabilidade e governança"
  },
  {
   "id": "d04-b5",
   "label": "War Room e multiagente"
  }
 ],
 "topics": [
  {
   "id": "D4-00",
   "bloco": "d04-b0",
   "mod": "Unidade 1 · Aulas 1 e 2",
   "emoji": "🧰",
   "read": "10 min",
   "title": "O agente de código por dentro: harness, modos e context engineering",
   "short": "O modelo só gera texto; o harness o transforma em agente, e contexto curto mais permissões do ambiente dão o controle.",
   "oneliner": "Um LLM só gera texto; o <b>harness</b> (loop, ferramentas e regras) o torna <b>agente</b>. Operar um agente de código com método é <b>curar o contexto</b> e separar <b>instrução</b> (influencia o modelo) de <b>permissão</b> (aplicada pelo ambiente).",
   "vovo": [
    "Pense num estagiário muito rápido que lê tudo e obedece quase tudo. As instruções do projeto são o caderno de regras que ele relê toda manhã: quanto mais curto e objetivo, mais ele lembra. Já a permissão é a chave do armário: dizer “não mexa no armário” é instrução, trancar o armário é permissão.",
    "O harness é o escritório em volta do estagiário: a mesa, o terminal, o chefe que aprova gastos. Sem ele, o estagiário só conversa; com ele, ele age."
   ],
   "oque": [
    "<b>Agente x skill:</b> o agente recebe um objetivo, planeja e executa uma tarefa completa. A skill é uma capacidade atômica usada durante a execução (terminal, editor, Git, compilador). Ferramenta não tem autonomia: o agente é quem raciocina sobre o objetivo e escolhe como usá-las. O ciclo é perceber, raciocinar, agir e ajustar pelo resultado; num agente de código o ambiente é o repositório.",
    "<b>Autocomplete não é agente.</b> O agente é o Copilot Chat em Agent Mode. O que transforma o modelo em agente é o <b>harness</b>: o programa que executa o loop, disponibiliza ferramentas e aplica regras. Nos módulos anteriores o curso implementou esse loop; aqui se configura um harness maduro. A apostila diz que a ideia vale para Claude Code e Cursor, com adaptações de interface. O curso roda no Copilot gratuito (estudante com e-mail educacional elegível pode ter o Pro); o que importa é o modo agente.",
    "<b>Três modos no Copilot:</b> Ask (perguntas, sem alterar nada), Edit (edições dirigidas em arquivos) e Agent (planeja, altera vários arquivos, roda comandos e itera quando erra). Dentro do agente há duas estratégias: <b>interativa</b> (executa e pede permissão no caminho) e <b>planejamento</b> (lê o projeto, faz perguntas, registra um plano revisável e só depois implementa).",
    "<b>Prompt engineering x context engineering:</b> o primeiro escreve uma boa instrução para uma interação; o segundo gerencia todo o espaço de trabalho do agente (instruções permanentes, arquivos, resultados de ferramentas, histórico). Contexto é orçamento: informação irrelevante dilui a atenção (<i>context rot</i>). A regra é curar, não acumular.",
    "<b>Memória permanente do projeto:</b> o arquivo <code>.github/copilot-instructions.md</code> entra nas conversas do repositório. Deve ser curto e factual (a aula fala em cerca de 40 linhas): stack, comandos, estrutura de camadas, convenções, fluxo. Também existem instruções de workspace e de usuário.",
    "<b>Instruções com escopo:</b> arquivos de instruction com <code>applyTo</code> só entram quando o agente trabalha naquela parte do repo (por exemplo, a camada de service nunca importa HTTP). É especialização sob demanda, sem gastar contexto nas outras tarefas.",
    "<b>Instrução não é permissão.</b> Dizer ao modelo “não faça X” influencia a decisão; barrar X exige uma regra do ambiente. No VS Code isso é a auto-aprovação de terminal: uma <b>allow list</b> (testes, typecheck, git status/diff/add/commit) elimina pop-ups de rotina e uma <b>deny list</b> (remoção recursiva, privilégio elevado, ler <code>.env</code>, <code>git push --force</code>) continua exigindo um humano."
   ],
   "como": [
    "O setup do projeto <code>notas-api</code> é pedido no modo interativo, com as opções do <code>tsconfig</code>, os scripts e o <code>.gitignore</code> descritos à mão. O autor faz isso de propósito para medir a aderência do agente. O agente corrige erros de digitação do prompt, o que não dispensa conferir o diff.",
    "Um erro real vira aula: sem arquivos em <code>src</code>, o <code>tsc</code> devolve TS18003. O agente interpreta o feedback e propõe um arquivo placeholder; é o ciclo completo objetivo, ação, feedback, análise e nova ação.",
    "No modo de planejamento (um README, na demo) o agente lê <code>package.json</code> e <code>.gitignore</code>, pergunta o idioma, registra um plano editável e só implementa depois da aprovação. Tarefa pequena cabe no interativo; tarefa de várias decisões ou maior impacto pede plano.",
    "As regras de instruction devem ser testadas pedindo algo que as viole. Se uma regra nova não aparece, a apostila sugere abrir uma nova conversa para recarregar o contexto.",
    "O contrato de permissões é verificado nos dois sentidos: antes da allow list o teste pedia aprovação, depois roda direto; já <code>rm -rf node_modules</code> continua pedindo e é negado."
   ],
   "aplica": [
    "Qualquer repositório onde um agente de código opera: registrar stack, comandos e camadas em um arquivo curto em vez de repetir no prompt.",
    "Regras de arquitetura por pasta (controllers, repositories, adapters) via instructions com escopo.",
    "Reduzir fadiga de aprovação sem abrir mão de controle: allow para rotina previsível, deny para destrutivo."
   ],
   "pros": [
    "Convenções registradas uma vez reduzem repetição e ambiguidade em toda conversa do repositório.",
    "A permissão do ambiente funciona mesmo quando o modelo esquece ou interpreta mal uma instrução.",
    "O modo de planejamento dá um ponto de revisão antes de qualquer alteração no repositório."
   ],
   "contras": [
    "Instruction longa consome contexto de forma permanente e compete com a tarefa atual.",
    "Allow list larga demais enfraquece o deny: padrões de texto não são sandbox.",
    "Interfaces e nomes de configuração mudam entre versões do Copilot, Cursor e Claude Code."
   ],
   "traps": [
    "Transformar o arquivo de instructions em manual: cada frase extra disputa atenção com a tarefa.",
    "Achar que “instruir” o modelo equivale a proibir: só a permissão do ambiente garante.",
    "Aceitar o resultado do agente sem abrir o diff e os comandos que ele pediu para rodar.",
    "Alterar uma instruction e continuar na mesma conversa sem checar se ela foi carregada."
   ],
   "tip": "Abra e leia o que o agente gravou. Na Unidade 2, a instrução “siga o Spec Kit” virou uma frase genérica no arquivo e precisou ser reescrita com as etapas explícitas. A live de 27/05 mostra o mesmo harness com Claude Code: um único <code>CLAUDE.md</code> espelhado por symlink para <code>AGENTS.md</code>, <code>.cursorrules</code> e <code>.windsurfrules</code>. <a href=\"#D4-16\">Veja o tópico da live</a>.",
   "cola": [
    [
     "Harness",
     "Programa que executa o loop do agente, entrega ferramentas e aplica regras"
    ],
    [
     "Agente x skill",
     "Agente decide e executa uma tarefa; skill é uma capacidade atômica que ele usa"
    ],
    [
     "Ask / Edit / Agent",
     "Perguntar sem alterar, editar arquivos de forma dirigida, ou planejar e executar com iteração"
    ],
    [
     "Interativo x planejamento",
     "Executar pedindo permissão no caminho, ou registrar um plano revisável antes de implementar"
    ],
    [
     "Context engineering",
     "Gerenciar tudo que ocupa a janela do modelo, não só o prompt do momento"
    ],
    [
     "Context rot",
     "Perda de foco do modelo quando o contexto acumula informação irrelevante"
    ],
    [
     "copilot-instructions.md",
     "Memória permanente do repositório, curta e factual"
    ],
    [
     "applyTo",
     "Escopo por glob de uma instruction, usada só quando o agente toca aqueles arquivos"
    ],
    [
     "Allow list / deny list",
     "Comandos de terminal liberados automaticamente / que sempre exigem aprovação"
    ]
   ],
   "links": [
    [
     "Snapshot da Unidade 1 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/01-arquitetura-de-agentes-de-codigo"
    ],
    [
     "UNIDADE.md da Unidade 1",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/01-arquitetura-de-agentes-de-codigo/UNIDADE.md"
    ]
   ],
   "codigo": [
    {
     "proj": "01-arquitetura-de-agentes-de-codigo (notas-api)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/01-arquitetura-de-agentes-de-codigo",
     "resumo": "Projeto-fundação do módulo: a notas-api, uma API HTTP e CLI de tarefas em Node 22, TypeScript ESM, Zod e node:test. Nesta aula o que importa são os artefatos de contexto e permissão em notas-api/.github e notas-api/.vscode.",
     "fluxo": [
      "<code>.github/copilot-instructions.md</code>: seções Stack (Node 22 LTS, TS ESM strict, Zod na fronteira, <code>node:test</code> via tsx, sem framework HTTP, <code>node:http</code> por design), Comandos, Estrutura (<code>src/domain</code>, <code>store</code>, <code>service</code>, <code>http</code>, <code>cli.ts</code>, <code>specs/</code>), Convenções (camadas não pulam: http/cli para service para store; Zod em toda entrada; erros de domínio; teste junto com a lógica; typecheck e test verdes; nunca commitar secrets nem ler <code>.env</code>) e Fluxo (<code>/especificar</code>, <code>/planejar</code>, <code>/tarefas</code>, <code>/implementar</code>).",
      "<code>.github/instructions/service.instructions.md</code>: frontmatter <code>applyTo: \"src/service/**\"</code> e uma regra, funções puras e nunca importar de <code>src/http</code>.",
      "<code>.vscode/settings.json</code>: <code>terminalCommandExecution.allowed</code> (<code>npm run dev</code>, <code>npm test</code>, <code>npm run *</code>, <code>npx tsc</code>, <code>node</code>, <code>git status</code>, <code>git diff</code>, <code>git add</code>, <code>git commit</code>) e <code>denied</code> (<code>rm -rf</code>, <code>sudo</code>, <code>git push --force</code>, <code>git push -f</code>, <code>git push</code> e leituras de <code>.env</code> por cat, less, more, head, tail, grep).",
      "A estrutura que a regra de camadas descreve está em <code>src/</code>: <code>domain/task.ts</code> (schemas Zod), <code>store/task-store.ts</code> (interface), <code>service/task-service.ts</code>, <code>http/task-routes.ts</code> e <code>cli/commands.ts</code>. O detalhe do código é o tema do próximo tópico."
     ],
     "rodar": [
      "<code>cd notas-api && npm ci</code>.",
      "<code>npm test</code> (42 testes passaram na minha execução com Node 22) e <code>npm run typecheck</code>.",
      "<code>npm run dev</code> sobe a API em <code>http://localhost:3000</code>; a CLI é <code>npm run cli -- task list</code>."
     ],
     "armadilhas": [
      "O <code>settings.json</code> do notas-api é o mesmo do OpsPilot (o UNIDADE.md admite): lista <code>npm run arena</code> e <code>npm run bench</code>, scripts que o notas-api não tem.",
      "As entradas <code>node</code> e <code>npm run *</code> da allow list são largas: provavelmente permitem rodar qualquer código por <code>node -e</code> ou por um script npm. A deny list é por padrão de texto, não sandbox (hipótese; não testei dentro do Copilot).",
      "O <code>copilot-instructions.md</code> ainda diz “persistência in-memory”, mas a CLI ganhou uma store em JSON; o README pede Node 20+ enquanto as instructions pedem Node 22; a seção “Estrutura atual” do README está desatualizada.",
      "O chat mode revisor (<code>/revisar</code>) previsto no roteiro não está no repositório (UNIDADE.md), apesar de a apostila anunciar “revisor e delegação”."
     ]
    }
   ]
  },
  {
   "id": "D4-01",
   "bloco": "d04-b0",
   "mod": "Unidade 1 · Aulas 3, 4 e 5",
   "emoji": "📐",
   "read": "11 min",
   "title": "Spec-Driven Development do zero: Constitution, spec, plan, tasks, implement e guardrails",
   "short": "Artefatos versionados e revisados dirigem o agente, e hooks determinísticos cobrem o que a instrução não garante.",
   "oneliner": "SDD troca “pedir a feature num chat” por artefatos versionados (<b>Constitution, Specify, Plan, Tasks, Implement</b>) com revisão humana entre as fases, mais guardrails <b>determinísticos</b> (deny list e pre-commit): uma instrução pode ser esquecida, um hook não.",
   "vovo": [
    "É como reformar a casa com contrato, planta, cronograma e obra por etapas, em vez de dizer ao pedreiro “faz uma cozinha bonita” e voltar no fim do dia. Cada papel fica no disco, e se o pedreiro trocar, o próximo lê a planta.",
    "O pre-commit é o porteiro que não deixa sair da obra com a prumada torta, mesmo que o pedreiro tenha esquecido a regra."
   ],
   "oque": [
    "<b>Por que SDD:</b> quando o agente é potente, o gargalo deixa de ser programar e vira dizer com precisão o que se quer. Uma conversa tem janela de contexto e uma sessão nova pode não conhecer decisões anteriores. Os artefatos em disco sobrevivem à troca de chat, de ferramenta (a Unidade 2 troca Copilot por Cursor no meio) e entram em pull request.",
    "<b>Cinco fases:</b> Constitution (princípios não negociáveis), Specify (o quê e por quê), Plan (como), Tasks (unidades pequenas, ordenadas e testáveis) e Implement. Cada fase gera um artefato revisável.",
    "<b>A spec:</b> contexto e problema, user stories (papel, objetivo, benefício), requisitos funcionais numerados, critérios de aceite em <b>EARS</b> (“quando evento, o sistema deve resposta”), fora de escopo e questões em aberto. A apostila lembra que a spec não é fonte de verdade eterna: o código e os testes dizem o estado real, a spec ancora a intenção.",
    "<b>Os quatro prompts do framework artesanal:</b> a Constitution é criada sem alterar arquivos existentes (senão o agente a mistura às instructions) e os prompts rodam em modo agente; depois de criá-los, abre-se um chat novo para o Copilot reconhecê-los. <b>Specify</b> lê a Constitution, não escreve código nem decide implementação, numera a spec (próximo número livre) e pergunta se algo estiver ambíguo. <b>Plan</b> lê spec e Constitution e registra arquitetura e camadas, arquivos a criar ou alterar, modelo de dados (tipos e schemas Zod), contratos externos (rotas, comandos), decisões e trade-offs, estratégia de testes, riscos e pontos que pedem decisão humana. <b>Tasks</b> gera tarefas pequenas (um commit), com forma de verificar, dependências explícitas e marcação de progresso. Nenhum dos três implementa nada.",
    "<b>Constitution x instructions:</b> a Constitution é um contrato relido a cada fase; as instructions são a memória do projeto. Os princípios se repetem de propósito, mas os papéis são diferentes.",
    "<b>Menor privilégio por fase:</b> quem só especifica não precisa editar código-fonte. A sintaxe de limitar ferramentas varia por versão e deve ser confirmada na documentação.",
    "<b>Implementar uma tarefa por vez:</b> o agente pega a próxima tarefa com dependências prontas, implementa com teste, roda testes e typecheck, só marca como concluída com tudo verde e para para revisão. Regras explícitas: nunca desativar teste nem enfraquecer tipos para passar, e parar e avisar se a spec estiver errada.",
    "<b>Guardrails em camadas:</b> a deny list controla comandos perigosos; o pre-commit roda typecheck e testes antes de aceitar o commit e funciona no terminal comum, fora do chat; uma terceira camada poderia ser CI. Permissão responde “esta ação pode rodar?”; guardrail determinístico responde “o resultado continua válido?”.",
    "<b>Contexto estruturado:</b> com spec, plano, tarefas e instructions, o agente consulta o artefato de cada etapa em vez de deduzir a intenção de uma conversa longa. A apostila diz que isso pode reduzir o desperdício de tokens; o ponto é usar o contexto com mais eficiência, não gastar menos por gastar menos.",
    "<b>Outros frameworks:</b> a aula constrói o framework na mão e aponta equivalentes prontos: GitHub Spec Kit (adotado a partir da Unidade 2), OpenSpec (mais leve) e BMAD Method (simula papéis de uma equipe)."
   ],
   "como": [
    "<b>Spec 001 (gerenciar tarefas via HTTP e CLI):</b> o agente encontra uma ambiguidade (concluir tarefa já concluída?) e pergunta; a decisão é idempotente. O plano nasce sem a numeração da spec no nome do arquivo; o autor corrige o prompt de planejamento, não o arquivo, porque está construindo um processo reutilizável. As tarefas são cinco: domínio e store, service e erros, HTTP, CLI, integração e validação.",
    "Na implementação o agente respeita as camadas e a instruction de funções puras no service. A validação roda no service com Zod, erros previsíveis viram classes de domínio e a borda HTTP os traduz (400, 404). HTTP usa <code>node:http</code> com regex de caminho; HTTP e CLI chamam o mesmo service. Os testes crescem a cada tarefa, não no fim.",
    "<b>Pre-commit:</b> o autor força uma incompatibilidade de tipos, tenta o commit, vê o typecheck falhar e só então pede a correção.",
    "<b>Spec 002:</b> a CLI perde o estado porque cada execução é um processo novo e a store é em memória. A solução é um arquivo JSON, e o caminho padrão fica como questão em aberto. Como o JSON é fronteira externa, o plano pede validação ao carregar. Durante a implementação o agente desvia para SQL e chave estrangeira; a revisão humana percebe e o fluxo volta ao JSON.",
    "<b>Exercício deixado:</b> uma spec 003 para CLI e HTTP usarem a mesma fonte de dados. Ela não existe no repositório."
   ],
   "aplica": [
    "Features com várias regras e arquivos, onde o contexto de uma conversa não basta.",
    "Equipes que revisam por PR: spec, plano e tarefas pequenas tornam a revisão do código gerado viável.",
    "Qualquer projeto com agente onde “testes e tipos verdes” precisa valer mesmo quando o modelo esquece."
   ],
   "pros": [
    "Ambiguidades aparecem antes do código, nas questões em aberto da spec.",
    "Tarefas pequenas (um commit cada) são fáceis de revisar e reverter.",
    "O processo é independente da ferramenta, como mostra a troca de agente no meio da Unidade 2."
   ],
   "contras": [
    "Mais artefatos e mais cerimônia, desproporcional para uma mudança de uma linha.",
    "O agente ainda desvia (o desvio para SQL na spec 002); o processo só torna o desvio visível.",
    "Spec e plano envelhecem se não forem atualizados quando a decisão muda."
   ],
   "traps": [
    "Esquecer de ativar o hook: ele só vale com <code>git config core.hooksPath .githooks</code> e nada no repositório automatiza isso.",
    "Deixar a spec descrever implementação (a fase Specify não deve decidir como).",
    "Marcar tarefa como feita sem testes e typecheck passando.",
    "Tratar o hook local como única barreira: a própria aula cita CI como terceira camada."
   ],
   "tip": "A Aula 5 se chama “Guardrails, Revisor e Delegação”, mas o texto da apostila cobre a spec 002 e o exercício da spec 003. Revisor e delegação (issue até PR) não são desenvolvidos na apostila nem no repositório. A live de 27/05 aprofunda isso: spec boa contra spec ruim, o limite dos 36% e o custo de manter specs em enterprise. <a href=\"#D4-16\">Veja o tópico da live</a>.",
   "cola": [
    [
     "SDD",
     "Spec-Driven Development: especificar, planejar, quebrar em tarefas e só então implementar"
    ],
    [
     "Constitution",
     "Princípios não negociáveis relidos em cada fase do fluxo"
    ],
    [
     "EARS",
     "Formato de critério de aceite: quando um evento ocorrer, o sistema deve responder de tal forma"
    ],
    [
     "Menor privilégio por fase",
     "Cada fase recebe só as capacidades de que precisa"
    ],
    [
     "Pre-commit",
     "Hook do Git que roda typecheck e testes antes de aceitar o commit"
    ],
    [
     "Guardrail determinístico",
     "Verificação executada independentemente da decisão do modelo"
    ],
    [
     "Spec Kit / OpenSpec / BMAD",
     "Frameworks prontos de SDD, do mais estruturado ao mais leve"
    ]
   ],
   "links": [
    [
     "Snapshot da Unidade 1 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/01-arquitetura-de-agentes-de-codigo"
    ],
    [
     "GitHub Spec Kit",
     "https://github.com/github/spec-kit"
    ]
   ],
   "codigo": [
    {
     "proj": "01-arquitetura-de-agentes-de-codigo (notas-api e specs)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/01-arquitetura-de-agentes-de-codigo",
     "resumo": "O framework de SDD feito à mão (constitution, quatro prompt files e hook) e as duas features que ele produziu: gerenciamento de tarefas com HTTP e CLI (spec 001) e persistência da CLI em JSON (spec 002). Os testes passaram em 42 execuções locais (Node 22).",
     "fluxo": [
      "<code>specs/constitution.md</code>: sete princípios (camadas explícitas, validação na fronteira, erros de domínio, teste é parte da tarefa, segurança por padrão, spec antes de código, pequeno e reversível) e a stack obrigatória.",
      "<code>.github/prompts/{especificar,planejar,tarefas,implementar}.prompt.md</code>, todos com <code>mode: agent</code>: <code>planejar</code> e <code>tarefas</code> resolvem “001” para <code>specs/001-*-spec.md</code> e gravam arquivos irmãos <code>-plan.md</code> e <code>-tasks.md</code>; <code>implementar</code> escolhe a próxima <code>- [ ]</code> com dependências prontas, só marca <code>[x]</code> com testes e tipos verdes e para para revisão.",
      "<code>specs/001-gerenciamento-de-tarefas-{spec,plan,tasks}.md</code> e <code>specs/002-persistencia-cli-json-*</code>: as cinco tarefas de cada feature estão marcadas como concluídas.",
      "<code>src/domain/task.ts</code> (schemas Zod e tipos), <code>src/store/task-store.ts</code> (interface) com <code>in-memory-task-store.ts</code> e <code>json-file-task-store.ts</code>, <code>src/service/task-service.ts</code> (valida com Zod e converte <code>ZodError</code> em <code>TaskValidationError</code>; ausência vira <code>TaskNotFoundError</code>), <code>src/http/task-routes.ts</code> com <code>http-errors.ts</code> e <code>src/cli/commands.ts</code>.",
      "<code>src/factories/task-app.ts</code>: <code>createTaskApp(store = new InMemoryTaskStore())</code> compõe service e handler HTTP. <code>src/cli.ts</code> injeta <code>JsonFileTaskStore</code> (caminho de <code>TASK_CLI_STORE_PATH</code> ou <code>.tasks-cli-store.json</code>); <code>src/index.ts</code> mantém a store em memória, como pede o RF-8 da spec 002.",
      "<code>JsonFileTaskStore</code> valida o arquivo com Zod ao carregar e grava em arquivo temporário seguido de <code>renameSync</code> (escrita atômica); falhas viram <code>TaskStorePersistenceError</code> com mensagem legível e saída diferente de zero.",
      "<code>.githooks/pre-commit</code>: <code>npm run typecheck</code> e depois <code>npm run test</code>, com <code>set -e</code>."
     ],
     "rodar": [
      "<code>npm ci</code>, <code>npm test</code> (42 testes) e <code>npm run typecheck</code>.",
      "<code>git config core.hooksPath .githooks</code> para ativar o hook.",
      "<code>npm run cli -- task create --title \"Comprar leite\"</code> e depois <code>npm run cli -- task list</code>: o segundo processo enxerga a tarefa porque a CLI persiste em JSON.",
      "<code>npm run dev</code> para a API HTTP em memória (<code>POST /tasks</code>, <code>GET /tasks?status=open</code>, <code>PATCH /tasks/:id/complete</code>, <code>DELETE /tasks/:id</code>)."
     ],
     "armadilhas": [
      "O hook só vale depois do <code>git config core.hooksPath</code>; o <code>package.json</code> não tem script de instalação. O arquivo não tem shebang; no meu teste em Linux o Git executou o hook mesmo assim.",
      "<code>.tasks-cli-store.json</code>, com uma tarefa de teste (“Criar novo agente”), está commitado e fora do <code>.gitignore</code>.",
      "O README pede Node 20+ e as instructions Node 22; a seção “Estrutura atual” do README mostra só <code>src/</code>, sem o conteúdo; o <code>package.json</code> não declara <code>engines</code>. As versões do <code>package.json</code> (TypeScript ^7, @types/node ^26) instalaram e o typecheck passou.",
      "A CLI e a API HTTP usam stores diferentes por decisão da spec 002; compartilhar a fonte é o exercício 003, que não está no repositório.",
      "A apostila fala em CI como terceira camada, mas o notas-api não tem workflow.",
      "Os quatro prompt files têm só <code>mode: agent</code> e <code>description</code> no cabeçalho: não há restrição de ferramentas por fase, então o “menor privilégio por fase” da Aula 3 não está aplicado no repositório (a apostila já avisa que a sintaxe varia por versão)."
     ]
    }
   ]
  },
  {
   "id": "D4-16",
   "bloco": "d04-b0",
   "mod": "Live · 27/05/2026",
   "emoji": "🎬",
   "read": "11 min",
   "title": "Live de SDD enterprise: spec boa, harness, o limite dos 36% e o fluxo do Spec Kit numa tela estilo Netflix",
   "short": "A live separa spec estruturada de prompt bem feito, mostra o custo de mantê-la e percorre o Spec Kit com Claude Code até o plano técnico.",
   "oneliner": "A live pergunta “SDD é só um prompt bem feito?” e responde “Não (Talvez?)”: é uma <b>especificação estruturada</b> escrita antes de o agente tocar no código (comportamento, regras, critérios de aceite, fora do escopo e “não faça”), guardada no <b>harness</b> do agente, com o custo de mantê-la dito às claras. A demo percorre o <b>GitHub Spec Kit</b> com Claude Code numa tela inicial estilo Netflix.",
   "vovo": [
    "Pedir “adiciona um limite diário de transferência” é como dizer ao pedreiro “faz uma cozinha bonita”. A spec é a pasta da obra: o que construir, as regras da casa, o que fica de fora e o que ele não pode derrubar. Quanto mais o pedreiro desconhece o prédio, mais a pasta precisa dizer.",
    "A <b>constituição</b> é o regulamento do condomínio, conferido na hora de aprovar a planta. O <b>CLAUDE.md</b> é o bilhete na geladeira com o jeito de trabalhar da casa. Os <i>symlinks</i> da dica final são o mesmo bilhete exposto em vários cômodos sem fotocópia: se você corrige o original, todos leem a versão nova."
   ],
   "oque": [
    "<b>Definição (slides):</b> SDD é a prática de escrever uma especificação estruturada antes de deixar o agente de IA tocar no código. O slide de abertura define <i>harness</i> como tudo o que envolve uma LLM para torná-la funcional. A pergunta “é só um prompt bem feito?” aparece com a resposta “Não” e depois “Não (Talvez?)”; o PDF não traz a explicação falada, então não sei qual ressalva foi feita.",
    "<b>Exemplo ruim:</b> “Adiciona um limite diário de transferência. Pra contas premium: R$50k e pra contas normais: R$10k.” Não diz o que é “dia”, quando o saldo conta, o que fazer ao exceder nem o que não tocar.",
    "<b>Exemplo bom (slide de uma spec em markdown):</b> título; referências do Jira (task, épico e um documento, <code>TDD: bacen-api-tdd.pdf</code>, provavelmente um documento de design técnico, hipótese); comportamento esperado (conta padrão R$ 10.000, premium R$ 50.000); regras de negócio (dia corrido de 00h00 a 23h59 no horário de Brasília, saldo calculado em tempo real somando transferências já liquidadas, agendadas não consomem limite até a liquidação, transferências entre contas do mesmo CPF/CNPJ são isentas, excedente é rejeitado por inteiro, sem aprovação parcial); critérios de aceite no formato QUANDO/ENTÃO (HTTP 422 com código <code>DAILY_LIMIT_EXCEEDED</code> e o saldo restante no corpo; à meia-noite o limite é restaurado); <b>fora do escopo</b> (limite por transação em outro arquivo, PJ na fase 2, notificações com o time de produto); e <b>não faça</b> (não criar endpoint novo, usar o middleware de validação existente; não alterar a tabela de contas, usar tabela auxiliar). O slide parece terminar cortado na lista de “não faça”.",
    "<b>5W2H como framework:</b> um slide “Um framework útil” mostra o 5W2H (o quê, por quê, quem, onde, quando, como, quanto), logo antes do exemplo bom. A ligação entre cada letra e o exemplo é minha leitura (hipótese): a spec boa responde o quê (comportamento), onde (arquivos existentes) e como (regras), e cita quem e por quê pelas referências do Jira.",
    "<b>SDD no harness:</b> o slide lista <code>CLAUDE.md</code> e <code>DESIGN.md</code> (Claude), <code>AGENTS.md</code> (Codex/OpenAI) e <code>GEMINI.md</code> (Gemini). O README da live acrescenta a dica de manter um único arquivo e espelhar por <i>symlink</i> para <code>.github/copilot-instructions.md</code> (Copilot), <code>.cursorrules</code> (Cursor), <code>.windsurfrules</code> (Windsurf) e <code>AGENTS.md</code> (Codex, Gemini etc.).",
    "<b>Enterprise versus startup:</b> os slides contrastam banco e fintech (transatlântico contra veleiro) e mostram dois recortes de notícia sobre “SDD em nível enterprise”: o <i>Auto Approval</i> do iFood (revisão de código 33% mais rápida com avaliação automática de risco; o diagrama mostra webhook do GitLab, uma API, consumidor Kafka, um worker, um proxy interno de IA generativa e o Gemini 2.5 Flash na Vertex AI, com a nota de que a inferência rápida mantém milhares de MRs por dia) e a manchete da Forbes de maio de 2023 “Samsung Bans ChatGPT Among Employees After Sensitive Code Leak”. Os slides são só imagens, sem a conclusão do professor; a leitura mais provável (hipótese) é que enterprise soma escala, risco e confidencialidade.",
    "<b>O que a academia diz (slides):</b> “só 36% de chance do agente seguir sua spec inteira corretamente”. A conta do slide: cada instrução com 95% de sucesso, spec com 20 itens, 0,95^20 = 36% (confere: 0,95^20 ≈ 0,358). Ela supõe itens independentes e a mesma taxa para todos, o que é uma simplificação, mas dá a ordem de grandeza: spec longa sem verificação não se cumpre sozinha. O mesmo slide fala do custo de manter as specs atualizadas.",
    "<b>Quando vale a pena:</b> agentes trabalham bem em terreno limpo (feature nova); testes existentes criam uma rede de segurança; manter a spec atualizada precisa ser parte da cultura. O slide seguinte pergunta em que momento a spec deixa de ser ativo e vira passivo, com um “(Lá ele)” que o PDF não explica.",
    "<b>O gargalo é conhecimento:</b> para escrever uma boa spec você precisa saber algo que o agente não sabe; em grandes empresas esse conhecimento está em processos, na cabeça de sêniores, em documentos antigos, no histórico do Teams e em códigos ilegíveis (o slide escreve “inelegíveis”)."
   ],
   "como": [
    "<b>Instalação (README da live):</b> Python 3.11+, Git e <code>uv</code>; <code>uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.8.15</code> e <code>specify init . --integration claude</code>. O init cria <code>.specify/</code> (templates, scripts, memória), <code>.claude/skills/</code> (os comandos como skills <code>speckit-*</code>) e o <code>CLAUDE.md</code>. O <code>init-options.json</code> da pasta confirma agente claude, shell <code>sh</code> e versão 0.8.15.",
    "<b>Comandos, na ordem:</b> <code>/speckit.constitution</code> (princípios; uma vez), <code>/speckit.specify</code> (o quê e por quê, sem tecnologia, gera <code>specs/NNN-nome/spec.md</code>), <code>/speckit.clarify</code> (até cinco perguntas dirigidas, uma por vez; confere com o texto da skill), <code>/speckit.checklist</code> (exige um domínio de foco), <code>/speckit.plan</code> (stack, arquitetura, <code>plan.md</code>, <code>research.md</code>, <code>data-model.md</code>, <code>quickstart.md</code>, <code>contracts/</code>), <code>/speckit.tasks</code>, <code>/speckit.analyze</code> (consistência entre spec, plano e tasks) e <code>/speckit.implement</code>. Caminho mínimo para experimentar: specify, plan, tasks, implement; em enterprise os opcionais deixam de ser opcionais.",
    "<b>Constitution Check:</b> o template do plano marca o bloco como “GATE: Must pass before Phase 0 research. Re-check after Phase 1 design”, com PASS, FAIL ou N/A por princípio e FAIL indo para “Complexity Tracking” ou bloqueando a feature. É o que, segundo o README, impede que a constituição vire “poster decorativo”.",
    "<b>Constituição ou CLAUDE.md:</b> a constituição é governança (princípios não negociáveis, gate no plan, versionamento semântico próprio com Sync Impact Report, edição só pelo comando); o <code>CLAUDE.md</code> é instrução operacional (contexto contínuo, sem gate, versionado só pelo Git, edição manual). Regra de bolso do README: precisa de fiscalização ativa, versionamento e propagação, é constituição; é lembrete de como conduzir o trabalho, é <code>CLAUDE.md</code>; princípio inegociável que também precisa de lembrete diário pode estar nos dois.",
    "<b>Extensão Git:</b> instalada por padrão, acopla hooks <code>before_*</code> e <code>after_*</code> aos comandos. No <code>.specify/extensions.yml</code>, <code>before_constitution</code> (inicializar o repositório) e <code>before_specify</code> (criar a branch da feature) têm <code>optional: false</code> e rodam sozinhos; os commits automáticos antes e depois das demais etapas têm <code>optional: true</code> e perguntam antes.",
    "<b>Relação com o resto da disciplina:</b> a Unidade 1 monta à mão <i>constitution, specify, plan, tasks, implement</i> (<a href=\"#D4-01\">tópico 01</a>); o Spec Kit traz os mesmos nomes mais <i>clarify, checklist, analyze</i> e o gate da constituição, e a Unidade 2 o adota com o Copilot (<a href=\"#D4-03\">tópico 03</a>). A live o usa com Claude Code, cujo harness é o <code>CLAUDE.md</code> e as skills em <code>.claude/skills</code> (o harness em geral está no <a href=\"#D4-00\">tópico 00</a>).",
    "<b>Onde a demo parou:</b> a pasta final tem constituição, spec com cinco clarificações, dois checklists, plano, pesquisa, modelo de dados, quickstart e quatro contratos. Não há <code>tasks.md</code>, <code>src/</code> nem testes: analyze e implement não aparecem no que foi versionado (hipótese: não foram executados ou não foram commitados)."
   ],
   "aplica": [
    "Escrever a spec de uma mudança em sistema existente com referências (Jira, documento técnico), regras de negócio numeradas, critérios de aceite verificáveis, fora do escopo e “não faça” apontando para o código que deve ser reaproveitado.",
    "Manter um único arquivo de instruções do repositório e espelhá-lo por <i>symlink</i> para as ferramentas do time (<code>ln -sf CLAUDE.md AGENTS.md</code> e equivalentes), sem duplicar texto.",
    "Separar governança de instrução operacional: princípios fiscalizados no plano (constituição) e jeito de trabalhar do agente (<code>CLAUDE.md</code>).",
    "Usar <code>/speckit.checklist</code> como “teste unitário da escrita da spec” antes do plano, em especial em áreas como acessibilidade, segurança ou auditoria."
   ],
   "pros": [
    "Requisito discutido em texto custa minutos; a lacuna descoberta no meio do código custa dias (argumento do README da live).",
    "O agente recebe contexto estável: spec, plano e tasks como briefing permanente, e o Spec Kit cuida da numeração, das branches e dos artefatos.",
    "Rastreabilidade: a decisão de produto está na spec, a técnica no plano, e o <code>research.md</code> registra cada alternativa rejeitada."
   ],
   "contras": [
    "Custo de manter spec, plano e tasks em dia; o slide chama a atenção para o ponto em que a spec vira passivo.",
    "A conta dos 36%: spec longa tem baixa chance de ser seguida por inteiro se nada a verifica; checklist e analyze ajudam, mas dependem do mesmo modelo.",
    "O Constitution Check do plano foi preenchido pelo mesmo agente que escreveu o plano (6/6 PASS, sem violações); sem revisão humana ele é uma autoavaliação (observação minha, não da live).",
    "A boa spec exige conhecimento que o agente não tem e que em grandes empresas está espalhado em pessoas e documentos antigos."
   ],
   "traps": [
    "Tratar a spec como um prompt maior: sem critérios de aceite, fora do escopo e “não faça” ela repete o exemplo ruim.",
    "Misturar decisão de produto na spec e de stack no plano (o <code>CLAUDE.md</code> da live pede para não misturar).",
    "Editar à mão arquivos que o Spec Kit mantém (a constituição, os templates, os scripts): o <code>CLAUDE.md</code> da live proíbe, porque quebra o Sync Impact Report e a propagação.",
    "Confiar no <code>.gitignore.example</code> da live para versionar só <code>.specify/memory</code> e <code>feature.json</code>: as exceções não funcionam (ver armadilhas no código).",
    "Aceitar o PASS do Constitution Check sem ler a justificativa de cada princípio."
   ],
   "tip": "O <code>README.md</code> é idêntico em <code>000-pre-live</code> e <code>001-pos-live</code>. Para ver o que a live produziu, compare o <code>CLAUDE.md</code> e a pasta <code>specs/</code>, não o README.",
   "cola": [
    [
     "SDD",
     "Spec-Driven Development: especificação estruturada escrita antes de o agente tocar no código"
    ],
    [
     "Harness",
     "Tudo o que envolve uma LLM para torná-la funcional (slide da live): arquivos de instrução, ferramentas, permissões"
    ],
    [
     "5W2H",
     "O quê, por quê, quem, onde, quando, como e quanto: checklist para não esquecer partes da spec"
    ],
    [
     "Fora do escopo / Não faça",
     "Seções da spec boa: o que não será tratado e o que o agente não pode alterar"
    ],
    [
     "Constituição",
     "Princípios não negociáveis do projeto em <code>.specify/memory/constitution.md</code>, fiscalizados no <code>/speckit.plan</code>"
    ],
    [
     "Constitution Check",
     "Gate do plano que confere o plano contra cada princípio (PASS, FAIL ou N/A)"
    ],
    [
     "Clarify",
     "Rodada de até cinco perguntas dirigidas que grava as respostas na spec"
    ],
    [
     "Symlink de instruções",
     "Atalho de <code>AGENTS.md</code>, <code>.cursorrules</code> etc. para o <code>CLAUDE.md</code>, para manter uma única fonte"
    ],
    [
     "0,95^20",
     "Conta do slide: 20 instruções com 95% de acerto cada resultam em cerca de 36% de chance de cumprir todas"
    ]
   ],
   "links": [
    [
     "Live de 27/05/2026 no repositório do curso",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-05-27"
    ],
    [
     "Slide: SDD com agentes de IA em codebases enterprise (PDF)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/lives/2026-05-27/unipds-sdd-enterprise.pdf"
    ],
    [
     "Estado final da live (001-pos-live)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-05-27/001-pos-live"
    ],
    [
     "GitHub Spec Kit",
     "https://github.com/github/spec-kit"
    ]
   ],
   "codigo": [
    {
     "proj": "lives/2026-05-27 (000-pre-live e 001-pos-live)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-05-27",
     "resumo": "Um projeto só de artefatos (sem código-fonte) com o Spec Kit 0.8.15 instalado para Claude Code. <code>000-pre-live</code> é o ponto de partida: framework, constituição já ratificada, <code>CLAUDE.md</code> e symlinks. <code>001-pos-live</code> acrescenta a feature <code>001-catalog-browse</code> (tela inicial de catálogo estilo Netflix: hero rotativo e três carrosséis). Li todos os arquivos autorais; não executei o <code>specify</code> nem o Claude Code.",
     "fluxo": [
      "<code>README.md</code>: PRD da tela (visão, persona, problema, solução, escopo, métricas, premissas), instalação do Spec Kit, os comandos na ordem com tabela comparativa, extensão Git, valor enterprise e a tabela “constituição x CLAUDE.md”.",
      "<code>CLAUDE.md</code>: contexto, fluxo canônico (specify, clarify, plan, tasks, analyze, implement), “fonte primária da verdade”, resumo dos cinco princípios, restrições do domínio e regras de operação (não editar README, templates, scripts, integrações, workflows nem skills; mudar a constituição só por <code>/speckit.constitution</code>). <code>AGENTS.md</code>, <code>.cursorrules</code>, <code>.windsurfrules</code> e <code>.github/copilot-instructions.md</code> são symlinks para ele.",
      "<code>.specify/memory/constitution.md</code> v1.0.0 (ratificada em 2026-05-27): Test-First, Simplicidade e YAGNI, Versionamento Semântico, Performance e UX-First (LCP ≤ 2,5 s, INP ≤ 200 ms, 60 fps) e Acessibilidade WCAG AA; mais restrições de UI, fluxo de desenvolvimento e governança, com o Sync Impact Report no topo.",
      "<code>specs/001-catalog-browse/spec.md</code>: quatro user stories (três P1 e uma P2), 21 requisitos funcionais (FR-001 a FR-021), sete critérios de sucesso, casos de borda e a seção Clarifications com cinco perguntas respondidas (overlay para o detalhe, seis cards visíveis, sem loop nas bordas, dados por função geradora com latência e erro injetáveis, live region polite no hero).",
      "<code>checklists/requirements.md</code> (todos os itens marcados) e <code>checklists/accessibility.md</code> (29 itens CHK sobre a qualidade dos requisitos de teclado, foco, contraste, movimento e leitor de tela; nenhum marcado).",
      "<code>plan.md</code>: React 19, Vite 6, TypeScript 5.6, CSS Modules; Vitest, Testing Library, axe-core e Playwright; orçamento de 80 KB de JS gzip; Constitution Check com seis linhas, todas PASS; estrutura de <code>src/</code> e <code>tests/</code> planejada. <code>research.md</code> registra decisão, racional e alternativas rejeitadas (inclusive Next.js); <code>data-model.md</code> define as entidades e o <code>catalogService</code>; <code>quickstart.md</code> traz scripts e parâmetros de URL para forçar estados.",
      "<code>contracts/</code>: <code>catalog-service.md</code> (nunca rejeita, latência exata, dados estáveis), <code>region-states.md</code> (<code>DataRegion</code> com os quatro estados e os papéis ARIA), <code>overlay-controller.md</code> (foco, trap, Esc, backdrop) e <code>visual-tokens.md</code> (cores, foco, dimensões).",
      "<code>.specify/extensions.yml</code> (hooks da extensão Git), <code>.specify/feature.json</code> (<code>{\"feature_directory\": \"specs/001-catalog-browse\"}</code>, só no pós-live), <code>.specify/workflows/speckit/workflow.yml</code> (ciclo “Full SDD Cycle”: specify, gate de revisão da spec, plan, gate de revisão do plano, tasks, implement) e <code>.gitignore.example</code>."
     ],
     "rodar": [
      "Para refazer o fluxo: <code>uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.8.15</code>, <code>specify version</code> e, numa pasta de trabalho, <code>specify init . --integration claude</code>; depois, no Claude Code, <code>/speckit.constitution</code>, <code>/speckit.specify</code> (com o texto do README), <code>/speckit.clarify</code>, <code>/speckit.checklist</code> (com um domínio) e <code>/speckit.plan</code>. Não executei.",
      "Dica de espelhamento do README: <code>mkdir -p .github &amp;&amp; ln -sf ../CLAUDE.md .github/copilot-instructions.md</code>; <code>ln -sf CLAUDE.md .cursorrules</code>; <code>ln -sf CLAUDE.md .windsurfrules</code>; <code>ln -sf CLAUDE.md AGENTS.md</code>."
     ],
     "templateVsZ": "Pré-live e pós-live têm o mesmo framework, a mesma constituição e o mesmo README. O que a live acrescenta: o bloco <code>SPECKIT START/END</code> no <code>CLAUDE.md</code> apontando para <code>specs/001-catalog-browse/plan.md</code> (é o plano corrente que o <code>/speckit.plan</code> registra, como no <a href=\"#D4-03\">tópico 03</a>), a pasta <code>specs/001-catalog-browse/</code>, o <code>.specify/feature.json</code> e o <code>.gitignore.example</code>.",
     "armadilhas": [
      "O <code>.gitignore.example</code> ignora <code>/.specify</code> e tenta reincluir <code>!/.specify/memory</code> e <code>!/.specify/feature.json</code>: o Git não reinclui arquivo cujo diretório pai está ignorado. Verifiquei numa cópia: <code>git check-ignore -v</code> reporta os dois como ignorados pela regra <code>/.specify</code>. O comentário do arquivo também tem um erro de digitação (“bpara”).",
      "O README diz que o plano fixou <b>Next.js</b>; o <code>plan.md</code> escolheu React 19 + Vite 6 e o <code>research.md</code> rejeita o Next.js, reconhecendo que o README o citava como hipótese inicial. O README é igual nas duas pastas e ficou desatualizado.",
      "Metas inconsistentes entre artefatos: o LCP é “4G simulada” na constituição e “Fast 3G” no plano; a rolagem é 60 fps no PRD, na constituição e no plano, e 50 fps no SC-007 da spec.",
      "<code>visual-tokens.md</code> declara contrastes que não conferem com a fórmula WCAG: calculei 18,1:1 (declarado 16,1) para o texto primário, 10,2:1 (7,9) para o secundário, 4,1:1 (5,1) para o <code>--color-accent</code> e 7,0:1 (7,6) para o erro, todos contra <code>#0B0D11</code>. O acento a 4,1:1 passa o mínimo de componente (3:1) mas não o de texto normal (4,5:1), e o contrato o lista também para “CTA”.",
      "A spec termina com um link vazio <code>[](./PRD.md)</code> e o arquivo não existe (o PRD está no README). O <code>region-states.md</code> cita “FR-024 implícito”, mas a spec vai só até FR-021.",
      "<code>checklists/accessibility.md</code> está desatualizado: nenhum dos 29 itens foi marcado e as notas ainda tratam o FR-013 como pendente, embora o clarify já o tenha resolvido. O <code>requirements.md</code> diz que o clarify aplicou “mais quatro decisões” e lista seis requisitos.",
      "O <code>quickstart.md</code> usa pnpm 9 e parâmetros de URL (<code>?hero=loading</code>, <code>?reduce-motion=force</code>) que não aparecem na spec, no plano nem nos contratos; o <code>plan.md</code> lista <code>tasks.md</code>, que não existe, e nada de <code>src/</code> foi gerado."
     ]
    }
   ]
  },
  {
   "id": "D4-02",
   "bloco": "d04-b1",
   "mod": "Unidade 2 · Aula 1",
   "emoji": "🧠",
   "read": "6 min",
   "title": "Os três padrões de raciocínio: ReAct, Plan-and-Execute e Reflection",
   "short": "Três formas de decidir e agir, cada uma com um ganho e um custo, todas com teto de execução.",
   "oneliner": "<b>ReAct</b> alterna pensar, agir e observar (adaptativo); <b>Plan-and-Execute</b> planeja, executa e replaneja (visão global, mas o plano envelhece); <b>Reflection</b> põe um crítico sobre outra estratégia (mais qualidade, mais custo). Nenhum vence sempre, e todos precisam de teto de iterações.",
   "vovo": [
    "ReAct é o detetive que segue uma pista de cada vez: abre a gaveta, vê o que tem, decide a próxima. Plan-and-Execute é o chef que escreve o cardápio antes de cozinhar e refaz a lista se faltar ingrediente. Reflection é o revisor que lê o texto pronto contra uma lista de critérios antes de deixar sair.",
    "O limite de iterações é o despertador do detetive: sem ele, ele sempre encontra mais uma gaveta para abrir."
   ],
   "oque": [
    "<b>ReAct (Reason + Act, não React):</b> antes dele, o modelo ou raciocinava sozinho (e preenchia lacunas com fatos inventados) ou agia direto, sem fundamento. O ReAct intercala as duas coisas: pensamento, ação, observação, e volta a pensar com a nova informação. Serve quando o caminho completo não é conhecido de antemão, como investigar um incidente em que cada observação muda o próximo passo.",
    "<b>Limitações do ReAct:</b> trabalha um passo por vez e pode andar em círculos; cada passo é uma chamada ao modelo carregando o histórico, então o custo cresce com a tarefa; sem teto pode entrar em loop infinito.",
    "<b>Plan-and-Execute:</b> o agente pensa a tarefa globalmente, define uma sequência de passos, executa e, quando necessário, replaneja. Permite um modelo mais forte no planejamento e executores mais baratos, e passos independentes podem rodar em paralelo. O risco é o <b>plano envelhecido</b>: se o contexto muda ou uma hipótese cai, seguir o plano original leva à direção errada, por isso o replanner faz parte do padrão.",
    "<b>Reflection:</b> gera um resultado, um crítico avalia contra critérios definidos, e se reprovar produz feedback para uma nova versão. O crítico precisa de critérios objetivos (não “poderia melhorar”) e o ciclo precisa de um número máximo de reflexões, porque um crítico sempre acha algo a melhorar.",
    "<b>Os padrões já apareciam no curso:</b> o Agent Mode e seu reasoning trace eram ReAct; especificar, planejar, quebrar em tarefas e implementar era Plan-and-Execute; code review e pre-commit eram Reflection (um resultado avaliado contra critérios antes de ser aceito).",
    "<b>O projeto OpsPilot</b> começa aqui: um copiloto de plantão que consulta alertas, abre incidentes e recupera runbooks. As três estratégias ficam atrás de uma interface comum, o raciocínio gera um trace tipado para auditoria, uma <b>arena</b> compara estratégias sobre a mesma pergunta (lado a lado, com custo) e um <b>bench</b> mede acerto, número de chamadas e latência numa bateria fixa."
   ],
   "como": [
    "Comparativo da aula: ReAct é adaptativo, mas acumula histórico e pode entrar em loop. Plan-and-Execute dá visão global, custo potencialmente mais previsível e paralelismo, mas exige replanejamento. Reflection acrescenta uma camada explícita de qualidade, ao custo de chamadas extras e da necessidade de critérios e limite de parada.",
    "A apostila indica a linhagem teórica: ReAct (Yao et al.), Plan-and-Solve (Wang et al.), Reflexion (Shinn et al.) e Self-Refine (Madaan et al.). O ensaio “Building Effective Agents” (Anthropic, dez./2024) é citado como contraprova ao entusiasmo com multiagente: começar pelo mais simples.",
    "Em todos os casos, quem decide a estratégia é uma escolha de engenharia baseada no tipo de problema e em métricas, não numa preferência.",
    "A implementação das três estratégias, da arena e do bench está nos tópicos <a href=\"#D4-03\">03</a> e <a href=\"#D4-04\">04</a>."
   ],
   "aplica": [
    "Consultas pontuais e investigação exploratória: ReAct.",
    "Pedidos de várias etapas com ordem explícita e dependências: Plan-and-Execute.",
    "Respostas de alta criticidade ou que precisam de verificação contra evidências: Reflection sobre uma das duas."
   ],
   "pros": [
    "ReAct adapta cada decisão à observação mais recente.",
    "Plan-and-Execute dá uma visão global antes de agir e abre espaço para executores mais baratos.",
    "Reflection verifica a resposta antes de aceitá-la."
   ],
   "contras": [
    "ReAct pode andar em círculos e seu custo cresce com o histórico.",
    "Plan-and-Execute depende de replanejamento, que custa chamadas e latência.",
    "Reflection soma chamadas mesmo quando a primeira resposta já estava boa."
   ],
   "traps": [
    "Rodar qualquer estratégia sem teto de iterações.",
    "Crítico sem critérios objetivos, que aprova ou reprova por gosto.",
    "Tratar o plano como definitivo.",
    "Comparar estratégias só pela resposta textual, ignorando chamadas, latência e o estado real do sistema."
   ],
   "cola": [
    [
     "ReAct",
     "Reason + Act: ciclos de pensamento, ação e observação"
    ],
    [
     "Plan-and-Execute",
     "Planner, executor e replanner sobre um plano explícito"
    ],
    [
     "Replanner",
     "Revisa o plano depois de cada passo (ajustar, continuar ou finalizar)"
    ],
    [
     "Reflection",
     "Crítico que avalia a resposta e pede nova geração, com teto de rodadas"
    ],
    [
     "Trace",
     "Registro estruturado e tipado do passo a passo do raciocínio"
    ],
    [
     "Arena",
     "Comando que roda a mesma pergunta em várias estratégias e imprime traces e métricas"
    ],
    [
     "Bench",
     "Bateria fixa de cenários que mede acerto, chamadas e latência"
    ]
   ],
   "links": [
    [
     "ReAct (arXiv:2210.03629)",
     "https://arxiv.org/abs/2210.03629"
    ],
    [
     "Plan-and-Solve Prompting (arXiv:2305.04091)",
     "https://arxiv.org/abs/2305.04091"
    ],
    [
     "Reflexion (arXiv:2303.11366)",
     "https://arxiv.org/abs/2303.11366"
    ],
    [
     "Self-Refine (arXiv:2303.17651)",
     "https://arxiv.org/abs/2303.17651"
    ],
    [
     "Snapshot da Unidade 2 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/02-padroes-de-raciocinio-e-execucao"
    ]
   ]
  },
  {
   "id": "D4-03",
   "bloco": "d04-b1",
   "mod": "Unidade 2 · Aulas 2 e 3",
   "emoji": "🏗️",
   "read": "8 min",
   "title": "Spec Kit e a estrutura inicial do OpsPilot: contrato de estratégia, trace e fábrica de modelo",
   "short": "O OpsPilot nasce com Spec Kit e fixa um contrato: estratégia, trace tipado, métricas e uma única fábrica de modelo.",
   "oneliner": "O OpsPilot nasce com o <b>GitHub Spec Kit</b> no lugar do framework artesanal da Unidade 1. A primeira spec fixa o contrato do agente: uma <b>interface única de estratégia</b> que devolve <b>resposta, trace tipado e métricas</b>, uma <b>fábrica única de modelo</b> (OpenRouter) e tools mock sobre um store em memória.",
   "vovo": [
    "Antes de contratar os cozinheiros (as estratégias), a gente padroniza a cozinha: todos recebem o pedido no mesmo formato, devolvem prato, receita seguida e tempo gasto, e compram ingrediente do mesmo fornecedor. Assim dá para trocar o cozinheiro sem reformar o restaurante."
   ],
   "oque": [
    "<b>Spec Kit no repositório:</b> o init roda dentro do projeto existente, escolhe-se o agente (GitHub Copilot) e o shell. Ele cria <code>.specify/</code> (scripts, templates, memória com a Constitution) e comandos <code>speckit.*</code> em <code>.github/prompts</code>, além de specify, plan, tasks e implement: analyze, checklist, clarify, constitution, converge, taskstoissues e atualização de contexto do agente.",
    "<b>Revisar o que o framework instala:</b> a aula mostra duas falhas reais. A instruction “siga o Spec Kit” virou uma frase genérica e foi reescrita com as quatro etapas explícitas; a Constitution copiada da Unidade 1 trazia camadas do projeto anterior e foi atualizada (Express, MVC com service). A Constitution duplicada foi removida em favor da nativa do Spec Kit, para não haver duas fontes divergentes.",
    "<b>Stack e ambiente:</b> Zod, LangChain, LangGraph e cliente OpenAI apontando para o OpenRouter, Express e (na época) MySQL, que é escolha do exercício e não do módulo. Variáveis de ambiente carregadas pelo suporte nativo do Node, sem dependência extra. Scripts: <code>dev</code>, <code>arena</code>, <code>bench</code>, <code>test</code> e <code>typecheck</code>. Permissões por projeto em <code>.vscode/settings.json</code>.",
    "<b>OpenRouter:</b> gateway compatível com o formato OpenAI, com modelos pagos e gratuitos (marcados free). A chave é criada por projeto, com expiração (7 dias na demo), e fica no ambiente fora do Git. A aula usa a seleção automática de modelos gratuitos para não depender de um modelo lento. Trocar modelo é trocar configuração.",
    "<b>A spec do núcleo de raciocínio:</b> uma abstração de estratégia (identificador e <code>run</code>) que recebe entrada e devolve resposta final, trace e métricas; trace feito de eventos tipados (log, pensamento, ação com ferramenta e argumentos, observação, plano, crítica, resposta); métricas desde o início (chamadas ao LLM e latência); fábrica única de modelo (chave, nome do modelo, base URL, temperatura 0); tools mock com Zod (listar alertas por status, abrir incidente com título, serviço e severidade, resolver por id); seed repetível com cinco serviços e seis alertas (três firing, três resolved); teto de iterações em toda estratégia; arena; testes determinísticos sem rede.",
    "<b>Dois agentes, um processo:</b> o agente de código (Copilot) constrói; o agente de produto (OpsPilot) é o que está sendo especificado. A aula insiste em não confundir o raciocínio de um com as estratégias do outro."
   ],
   "como": [
    "O Spec Kit gera spec, checklist, plano, pesquisa, modelo de dados, contratos, quickstart e tarefas. A spec do núcleo saiu sem ambiguidades abertas e o plano foi revisado (inclusive a decisão de persistência).",
    "Antes do implement, o autor prepara <b>referências de código</b> (fábrica de modelo, tools, estratégia) para ancorar o padrão que quer. Elas não são o código final: orientam o agente. Ao escrever a referência, conferir o nome das variáveis no <code>.env</code> em vez de confiar no autocomplete."
   ],
   "aplica": [
    "Qualquer agente de produto em que várias estratégias precisam coexistir e ser comparadas.",
    "Projetos com agente de código em que a Constitution precisa refletir o projeto atual, não o anterior."
   ],
   "pros": [
    "Um contrato único (resposta, trace e métricas) deixa arena, bench e API independentes da estratégia.",
    "Fábrica única de modelo concentra chave, endpoint e parâmetros em um ponto.",
    "Trace tipado desde o dia 1 vira trilha de auditoria depois."
   ],
   "contras": [
    "O Spec Kit gera muitos arquivos (specs, contratos, checklists), e a revisão custa tempo.",
    "O framework não decide o design: sem referências de código, o resultado funciona, mas pode divergir do padrão pretendido."
   ],
   "traps": [
    "Assumir que o arquivo está certo porque foi criado (a instruction genérica da aula).",
    "Manter duas Constitutions e deixar o agente consultar a errada.",
    "Variável de ambiente com nome divergente: a aplicação usa o default e você acha que está testando outra coisa."
   ],
   "cola": [
    [
     "Spec Kit",
     "Framework do GitHub para SDD com comandos speckit.* e memória de Constitution"
    ],
    [
     "ReasoningStrategy",
     "Contrato comum: identificador e run que devolve resposta, trace e métricas"
    ],
    [
     "TraceEvent",
     "Evento tipado do raciocínio (thought, action, observation, plan, critique, answer)"
    ],
    [
     "Fábrica de modelo",
     "Função única que cria o cliente de chat configurado"
    ],
    [
     "OpenRouter",
     "Gateway de modelos compatível com a API da OpenAI"
    ],
    [
     "Seed",
     "Dados iniciais repetíveis: 5 serviços e 6 alertas"
    ]
   ],
   "links": [
    [
     "Snapshot da Unidade 2 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/02-padroes-de-raciocinio-e-execucao"
    ],
    [
     "OpenRouter",
     "https://openrouter.ai/"
    ],
    [
     "GitHub Spec Kit",
     "https://github.com/github/spec-kit"
    ]
   ],
   "codigo": [
    {
     "proj": "02-padroes-de-raciocinio-e-execucao (esqueleto)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/02-padroes-de-raciocinio-e-execucao",
     "resumo": "Snapshot do commit da Unidade 2, já com Spec Kit. Aqui interessa o esqueleto: contratos de domínio, fábrica de modelo, tools mock, store em memória com seed e o construtor de trace. As estratégias estão no próximo tópico.",
     "fluxo": [
      "<code>package.json</code>: scripts <code>dev</code>, <code>arena</code> e <code>bench</code> com <code>node --env-file-if-exists=.env --import tsx</code> (arena e bench; o <code>dev</code> da U2 é <code>tsx src/index.ts</code> sem env file), <code>test</code> com <code>node --import tsx --test</code> e <code>typecheck</code> com <code>tsc --noEmit</code>.",
      "<code>.github/copilot-instructions.md</code>: stack (Node 22, TS ESM, LangChain/LangGraph para OpenRouter, Zod, Express, MySQL via Sequelize, <code>node:test</code>), fluxo <code>speckit.specify, plan, tasks, implement</code> e um bloco entre marcadores <code>SPECKIT START/END</code> que aponta para o plano da feature corrente (atualizado pelo Spec Kit).",
      "<code>src/domain/types.ts</code>: <code>ReasoningStrategy { name; run(input) }</code>, <code>StrategyResult { answer, trace, metrics }</code>, <code>TraceEvent</code> (thought, action com <code>tool</code> e <code>toolArgs</code>, observation, plan, critique com <code>round</code> e <code>approved</code>, answer) e <code>ExecutionMetrics { llmCalls, latencyMs }</code>.",
      "<code>src/agents/model.ts</code> (re-exportado por <code>src/llm/factory.ts</code>): <code>createModel()</code> devolve <code>ChatOpenAI</code> com <code>baseURL</code> do OpenRouter, <code>temperature: 0</code> e modelo de <code>OPENROUTER_MODEL</code> (default <code>openai/gpt-4o-mini</code>); sem <code>OPENROUTER_API_KEY</code> lança erro.",
      "<code>src/agents/tools.ts</code>: <code>list_alerts</code> (status firing, resolved ou all, default firing), <code>open_incident</code> (título, serviço, severidade) e <code>resolve_incident</code> (id), com Zod; nesta unidade as descrições são curtas.",
      "<code>src/store/in-memory-store.ts</code>, <code>seed-data.json</code> e <code>seed.ts</code>: 5 serviços e 6 alertas (3 firing, 3 resolved, dos firing dois são critical); incidentes recebem id <code>inc-&lt;timestamp&gt;-&lt;4 hex&gt;</code>; erro de domínio <code>IncidentNotFoundError</code>.",
      "<code>src/trace/builder.ts</code>: <code>buildTraceFromMessages</code> converte mensagens do LangChain (<code>AIMessage</code> com <code>tool_calls</code>, <code>ToolMessage</code>) em eventos tipados."
     ],
     "rodar": [
      "<code>npm ci</code>, defina <code>OPENROUTER_API_KEY</code> no <code>.env</code> e rode <code>npm run arena -- --strategies react --input \"quantos alertas críticos estão disparando?\"</code>.",
      "<code>npm test</code> e <code>npm run typecheck</code> (os testes desta unidade não chamam a rede)."
     ],
     "armadilhas": [
      "Nenhum snapshot das pastas 02 a 05 tem <code>.env.example</code>, embora o UNIDADE.md mande copiá-lo. Ele só aparece a partir da pasta 06. O <code>.gitignore</code> tem <code>.env.*</code>; a negação <code>!.env.example</code> só existe de 06 em diante.",
      "O <code>package.json</code> da U2 lista <code>mysql2</code> e <code>sequelize</code> e a instruction diz “MySQL via Sequelize”, mas nada em <code>src</code> usa. A Unidade 3 troca por SQLite.",
      "Os arquivos <code>src/strategies/react.ts</code>, <code>src/tools/*.ts</code>, <code>src/llm/factory.ts</code> e <code>src/agents/plan-execute.ts</code> só re-exportam; as implementações moram em <code>src/agents/</code> (react, tools, model) e em <code>src/strategies/plan-execute.ts</code>. O layout das specs e o do código divergem.",
      "O default <code>openai/gpt-4o-mini</code> é pago: sem <code>OPENROUTER_MODEL</code> o projeto não roda a custo zero, apesar do README do módulo."
     ]
    }
   ],
   "tip": "A live de 27/05 usa o Spec Kit com Claude Code (skills em <code>.claude/skills</code>) e percorre constitution, specify, clarify, checklist e plan numa tela estilo Netflix. <a href=\"#D4-16\">Veja o tópico da live</a>."
  },
  {
   "id": "D4-04",
   "bloco": "d04-b1",
   "mod": "Unidade 2 · Aulas 4, 5 e 6",
   "emoji": "⚔️",
   "read": "9 min",
   "title": "ReAct, Plan-and-Execute e Reflection no código: arena e benchmark",
   "short": "As três estratégias implementadas atrás do mesmo contrato, comparadas na arena e medidas pelo estado real do store.",
   "oneliner": "O ReAct usa o agente pronto do LangGraph; o Plan-and-Execute é um <b>grafo explícito</b> (planner, executor, replanner, teto de 8 passos); o Reflection é um <b>decorator</b> (<code>withReflection</code>, até 2 reflexões). A <b>arena</b> compara lado a lado e o <b>bench</b> mede acerto pelo <b>estado do store</b>, não pelo texto.",
   "vovo": [
    "É um campeonato com árbitro de verdade: não basta o cozinheiro dizer “fiz o prato”, o bench olha a mesa e confere se o prato está lá. E o crítico do Reflection é o fiscal que pode mandar refazer, no máximo duas vezes."
   ],
   "oque": [
    "<b>ReAct no código:</b> reaproveita o suporte do ecossistema LangChain/LangGraph em vez de reconstruir o loop de tool calling. A estratégia registra o instante inicial, cria o agente com o modelo da fábrica e as tools, envia a entrada e converte o histórico de mensagens em trace tipado. O limite de recursão é um guardrail técnico, não uma instrução ao modelo.",
    "<b>Descrição da tool também orienta o modelo:</b> nome, descrição e schema Zod formam uma interface controlada; descrição ruim faz o agente escolher a ação errada mesmo com um bom modelo.",
    "<b>Plan-and-Execute:</b> estado compartilhado (entrada, plano, lista de passos feitos com reducer que <b>acumula</b>, resposta, mais trace, iterações e chamadas ao LLM). O planner devolve um plano estruturado com Zod (passos curtos, ordenados e executáveis); a fronteira de validação agora é o próprio modelo. O executor faz um passo por vez; o replanner decide entre ajustar, continuar ou finalizar. Teto total de oito passos.",
    "<b>Reflection como Decorator:</b> não é uma terceira estratégia independente; recebe qualquer estratégia, executa-a, chama um crítico (veredito com <code>approved</code> e <code>feedback</code>, validado com Zod, avaliando a resposta contra as observações do trace) e, se reprovar, regenera com o feedback. O padrão permite ReAct puro, P&amp;E puro, ou qualquer um com Reflection, sem mexer em quem consome.",
    "<b>Bench:</b> três cenários, direto (“quantos alertas críticos estão disparando?”), estruturado (abrir três incidentes sev2 em ordem e resolver o primeiro) e dinâmico (abrir incidente para o alerta mais antigo e dizer quantos sobraram). O acerto compara o <b>estado final do store</b> com o esperado; a saída é uma tabela com cenário, estratégia, acerto, chamadas de LLM e latência."
   ],
   "como": [
    "<b>Números da aula (ilustrativos, com modelo gratuito):</b> ReAct respondeu a consulta simples com 2 chamadas e cerca de 7 s. O Plan-and-Execute, num pedido de três incidentes, chegou ao teto de 8 passos com cerca de 20 chamadas e mais de um minuto. ReAct puro levou ~35 s e com Reflection ~45 s (uma chamada a mais, o crítico aprovou de primeira).",
    "<b>Resultado do bench:</b> na primeira execução, o cenário que roda nas duas estratégias mostrou 2 chamadas no ReAct e 7 no P&amp;E; depois de corrigir erros do P&amp;E, o ReAct acertou os três cenários com menos chamadas e menor latência, e o P&amp;E errou o estado final nos cenários 2 e 3. A aula insiste: o resultado pertence aos cenários, à implementação e às tools; o valor do bench é trocar preferência por evidência.",
    "<b>Operação:</b> o script da arena não carregava o <code>.env</code> (Node nativo exige <code>--env-file</code>), então a variável obrigatória não era vista; o ajuste foi no script. Nome de estratégia errado imprime as válidas. O free tier do OpenRouter tem limite de requisições, por isso o bench não deve rodar repetidamente."
   ],
   "aplica": [
    "Escolher a estratégia de uma feature com números: chamadas, latência e acerto no estado real.",
    "Adicionar camada de verificação (Reflection) só onde a criticidade justifica o custo."
   ],
   "pros": [
    "Contrato único permite combinar estratégia e Reflection sem tocar na API.",
    "Medir o estado do store pega agente que “explica bem” e executa errado.",
    "A arena dá comparação lado a lado em condições equivalentes."
   ],
   "contras": [
    "O P&amp;E custa várias vezes mais chamadas e latência para tarefas que o ReAct resolve.",
    "Bench com modelo real é lento, consome cota e varia com o modelo do dia.",
    "Reflection soma custo mesmo quando a primeira resposta estava correta."
   ],
   "traps": [
    "Acreditar na resposta textual sem conferir o estado do sistema.",
    "Rodar o bench em loop num free tier com limite diário.",
    "Esquecer de carregar o <code>.env</code> nos scripts quando se usa o env nativo do Node."
   ],
   "cola": [
    [
     "createReactAgent",
     "Agente ReAct pré-construído do LangGraph"
    ],
    [
     "recursionLimit",
     "Teto de passos do grafo, usado como guardrail contra loop"
    ],
    [
     "planSchema / replanSchema",
     "Schemas Zod do plano e da decisão adjust, continue ou finish"
    ],
    [
     "Acumulador (reducer)",
     "Regra que concatena os passos feitos em vez de sobrescrever"
    ],
    [
     "withReflection",
     "Decorator que embrulha uma estratégia com crítico e regeneração"
    ],
    [
     "reflect:react",
     "Nome da estratégia ReAct decorada com Reflection na arena"
    ],
    [
     "Acerto por estado",
     "O bench confere o estado do store, não o texto da resposta"
    ]
   ],
   "links": [
    [
     "Snapshot da Unidade 2 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/02-padroes-de-raciocinio-e-execucao"
    ],
    [
     "LangGraph JS",
     "https://langchain-ai.github.io/langgraphjs"
    ]
   ],
   "codigo": [
    {
     "proj": "02-padroes-de-raciocinio-e-execucao (estratégias, arena e bench)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/02-padroes-de-raciocinio-e-execucao",
     "resumo": "As três estratégias, a arena e o bench. Os arquivos são os do snapshot da U2, com notas do que mudou até o snapshot final (U9: entradas com histórico, node stamping, tokens).",
     "fluxo": [
      "<code>src/agents/react.ts</code>: <code>createReactAgent({ llm, tools })</code> e <code>recursionLimit: Math.max(3, maxIterations * 3)</code> (30 com o default 10); <code>GraphRecursionError</code> vira resposta de teto atingido; <code>llmCalls</code> é a contagem de <code>AIMessage</code>; <code>buildTraceFromMessages</code> produz thought, action, observation e answer.",
      "<code>src/strategies/plan-execute.ts</code>: <code>StateGraph</code> planner, executor e replanner; <code>MAX_STEPS = 8</code>; <code>planSchema</code> e <code>replanSchema</code> (decisão adjust, continue ou finish; o código explica que o schema é “flat” porque <code>discriminatedUnion</code> quebra com modelos via OpenRouter). O executor cria um <code>createReactAgent</code> novo por passo e injeta o progresso anterior; <code>enableReplanner: false</code> (flag <code>--no-replanner</code> do bench) executa o plano linearmente.",
      "<code>src/strategies/reflect.ts</code>: <code>withReflection(strategy, { maxReflections = 2, critic, modelFactory })</code>; <code>critiqueSchema</code> com <code>approved</code> e <code>feedback</code>; evento <code>critique</code> com <code>round</code> e <code>approved</code>; a base é re-executada com <code>enrichInputWithFeedback</code>; <code>llmCalls</code> soma base e críticas; nome <code>reflect:&lt;base&gt;</code>.",
      "<code>src/arena.ts</code>: <code>--strategies react,plan-and-execute,reflect:react,reflect:plan-and-execute</code>, <code>--input</code> (ou posicional) e <code>--max-iterations</code>; imprime trace, métricas e resposta; erro de uma estratégia não derruba as demais.",
      "<code>src/bench.ts</code>: cenários C1, C2 e C3, cada um com <code>check</code> contra o store e <code>diagnose</code> com os motivos do miss; stores novas por célula; flags <code>--scenario</code>, <code>--no-replanner</code>, <code>--max-iterations</code> e (nas pastas posteriores) <code>--strategies</code> e <code>--max-llm-calls</code>; código de saída 1 se houver miss."
     ],
     "rodar": [
      "<code>npm run arena -- --strategies react,plan-and-execute --input \"quantos alertas críticos estão disparando?\"</code>.",
      "<code>npm run arena -- --strategies reflect:react --input \"resuma o plantão e diga o que atacar primeiro\"</code>.",
      "<code>npm run bench</code> ou <code>npm run bench -- --scenario C1</code> (chamadas reais, gasta cota do OpenRouter).",
      "<code>npm test</code> cobre store, trace e o decorator de Reflection com críticos fake."
     ],
     "armadilhas": [
      "O UNIDADE.md da U2 manda <code>--strategies react,plan-execute</code>, mas o nome válido é <code>plan-and-execute</code>. O <code>parseArgs</code> da arena descarta nomes inválidos em silêncio, então só o ReAct rodaria (a spec usa <code>plan-and-execute</code>).",
      "O teto de recursão do ReAct no código é <code>maxIterations * 3</code>; o “12 ciclos” da aula era a referência, não o código final.",
      "Planner e replanner têm <code>catch</code> amplo: se o modelo falhar, o planner cai num plano de um passo e o replanner finaliza. O ReAct trata <code>GraphRecursionError</code>; o Plan-and-Execute não.",
      "No C3, “alerta mais antigo” é o primeiro alerta firing do array (alertas não têm timestamp), ou seja, depende da ordem do seed. O C2 pede “payment” no singular, enquanto o seed a partir da U3 chama o serviço de <code>payments</code>.",
      "O crítico faz fail-open: se a saída estruturada falhar, o código trata como aprovado.",
      "Nos prompts do bench, “sev2” significa severidade <code>high</code> (<code>const SEV2 = \"high\"</code>, estilo PagerDuty). A normalização sev1 a sev4 só vira código compartilhado em <code>src/domain/severity.ts</code>, na U3."
     ]
    }
   ]
  },
  {
   "id": "D4-05",
   "bloco": "d04-b1",
   "mod": "Unidade 2 · Aula 7",
   "emoji": "🔌",
   "read": "7 min",
   "title": "Uma API que também é um agente: POST /chat, registry e testes sem rede",
   "short": "A API recebe linguagem natural, escolhe a estratégia no registry e devolve resposta, trace e métricas, com contrato de erros claro.",
   "oneliner": "O <code>POST /chat</code> faz da API um agente: entra linguagem natural, um <b>registry</b> escolhe a estratégia, um <b>decorator</b> aplica Reflection, e a resposta mantém o contrato <b>answer + trace + metrics</b>. Os testes de integração usam uma estratégia <b>fake determinística</b>, sem rede.",
   "vovo": [
    "É o balcão do restaurante: o cliente diz o pedido em português, o balcão escolhe qual cozinheiro chamar e devolve o prato com o recibo de como foi feito. Para treinar o balcão, usa-se um cozinheiro de mentira que sempre devolve o mesmo prato."
   ],
   "oque": [
    "<b>Contrato de entrada:</b> mensagem do usuário, estratégia (padrão ReAct) e se Reflection deve ser aplicada; tudo validado com Zod, porque HTTP é fronteira externa.",
    "<b>Contrato de saída:</b> 200 com <code>answer</code>, <code>trace</code> e <code>metrics</code>; 400 com as <i>issues</i> do Zod; 422 se a estratégia não existe no registry; 504 se estourar o timeout. O timeout inicial pensado era de 60 s e foi para 180 s por causa da latência de modelos gratuitos.",
    "<b>Strategy + Decorator:</b> Strategy troca o mecanismo de raciocínio, Decorator acrescenta Reflection, e a API só conhece a abstração comum.",
    "<b>Testes sem rede:</b> uma estratégia fake com o mesmo contrato torna previsíveis validação, seleção, formato e status; chamadas reais ao LLM ficam na arena e no bench, que medem raciocínio, custo e qualidade.",
    "<b>Um núcleo, várias interfaces:</b> terminal, arena, bench e HTTP convergem para as mesmas estratégias e tools. Postman ou Insomnia usam o mesmo protocolo."
   ],
   "como": [
    "Specify, plan e tasks seguem o fluxo normal; no implement não é preciso uma referência extensa porque não há mudança conceitual. A revisão continua: rotas, validações, registry e erros.",
    "Dois problemas de execução entram como lição: o script <code>dev</code> não carregava o arquivo de ambiente (o mesmo problema da arena) e a porta 3000 estava ocupada por um processo anterior.",
    "O teste real da aula: <code>POST /chat</code> pedindo um incidente de severidade 2 para o catálogo, com ReAct e Reflection; a resposta trouxe o incidente aberto e métricas (3 chamadas ao LLM).",
    "A apostila reconhece que Copilot, Cursor ou modelos diferentes geram arquivos e erros diferentes a partir da mesma spec: o objetivo é entender o desenho e revisar."
   ],
   "aplica": [
    "Expor um agente a qualquer cliente HTTP mantendo a lógica de raciocínio fora da camada web.",
    "Testar a camada HTTP sem LLM com estratégias fake."
   ],
   "pros": [
    "Contrato explícito de sucesso e erro (200, 400, 422, 504).",
    "Estratégia selecionável sem alterar a API.",
    "CI rápido e repetível, sem rede."
   ],
   "contras": [
    "A latência de um agente real (de dezenas de segundos a mais de um minuto na aula) não cabe no padrão de requisição curta.",
    "Timeout alto demais segura conexões; baixo demais gera falsas falhas com modelo lento."
   ],
   "traps": [
    "Confundir 400 (corpo inválido) com 422 (estratégia semanticamente impossível).",
    "Testar o contrato HTTP com o modelo real e ter CI instável.",
    "Esquecer que o env nativo do Node exige <code>--env-file</code> também no script do servidor."
   ],
   "cola": [
    [
     "POST /chat",
     "Endpoint que recebe a mensagem e devolve answer, trace e metrics"
    ],
    [
     "Registry",
     "Mapa de nomes para estratégias disponíveis"
    ],
    [
     "422",
     "Estratégia desconhecida: pedido compreensível mas não executável"
    ],
    [
     "504",
     "Timeout da execução do agente"
    ],
    [
     "Estratégia fake",
     "Implementação determinística do contrato para testes sem rede"
    ]
   ],
   "links": [
    [
     "Snapshot da Unidade 3 (onde o POST /chat chegou ao repositório)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use"
    ],
    [
     "UNIDADE.md da Unidade 2",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/02-padroes-de-raciocinio-e-execucao/UNIDADE.md"
    ]
   ],
   "codigo": [
    {
     "proj": "03-function-calling-e-tool-use (src/http e src/agents/index.ts)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use",
     "resumo": "O <code>POST /chat</code> da spec 003 foi commitado junto com a persistência da U3, então só existe a partir da pasta 03. Lá o fluxo é o da aula: registry, decorator, 400, 422 e 504. No snapshot final (09) o endpoint passou pelo grafo de produção (U6) e o registry saiu do caminho HTTP; os dois estados estão abaixo.",
     "fluxo": [
      "<b>Snapshot 03.</b> <code>src/http/chat-schema.ts</code>: <code>{message, strategy (default \"react\"), reflect (default false), conversationId?}</code> validado com Zod. <code>src/http/server.ts</code>: <code>createApp(deps)</code> em Express; <code>express.json</code> aceita também corpo sem <code>Content-Type</code> (o <code>curl -d</code> padrão); <code>POST /chat</code> chama <code>resolveStrategy(registry, strategy, reflect)</code> e <code>runChat</code> e responde 200 com <code>answer, trace, metrics, conversationId</code>.",
      "<code>src/agents/index.ts</code>: <code>createRegistry</code>, <code>resolveStrategy</code> (aplica <code>withReflection</code> quando <code>reflect</code> é true) e <code>listStrategies</code>; <code>UnknownStrategyError</code> vira 422.",
      "<code>runWithTimeout</code> (180000 ms por padrão) rejeita com <code>ChatTimeoutError</code>, que vira 504; o handler final mapeia também 400 (Zod e JSON inválido), 404 (conversa inexistente) e 500.",
      "<code>src/http/server.test.ts</code> sobe o app em porta efêmera (<code>app.listen(0)</code>), chama com <code>fetch</code> e usa <code>fakeStrategy</code>: caminho feliz, estratégia explícita, Reflection com crítico aprovando, 400, 422, padrão ReAct sem Reflection, 504 (estratégia lenta com timeout injetado), registry só com fakes e corpo estilo curl.",
      "<b>Snapshot final (09).</b> O schema ganha <code>userId</code> (obrigatório desde a U4), <code>awaitHumanApproval</code> (U7) e <code>strategy</code> opcional; o handler gera um <code>requestId</code> com <code>randomUUID</code>, devolve <code>X-Request-Id</code> e chama <code>runProductionTurn</code> (<a href=\"#D4-12\">tópico 12</a>). <code>strategy</code> vira override (<code>react</code>, <code>planExecute</code>, <code>reflect</code>, <code>team</code> ou o alias <code>plan-and-execute</code>; outro valor dá 422 por <code>refine</code>); <code>reflect: true</code> sem <code>strategy</code> força a rota <code>reflect</code> (ReAct mais Reflection); com <code>strategy</code> informada, o <code>reflect</code> é ignorado. O handler final mapeia ainda 404 (conversa, request ou aprovação inexistente) e 503 (modelo indisponível).",
      "No 09, <code>createRegistry</code>, <code>resolveStrategy</code> e <code>listStrategies</code> continuam exportados, mas o fluxo HTTP não os usa mais; só testes e exports os referenciam."
     ],
     "rodar": [
      "<code>npm run dev</code> (porta 3000) e <code>curl -X POST localhost:3000/chat -H 'content-type: application/json' -d '{\"message\":\"quais alertas estão disparando?\",\"userId\":\"u1\"}'</code>.",
      "<code>npm test</code> para a suíte HTTP com fakes."
     ],
     "armadilhas": [
      "O timeout rejeita a promise da requisição, mas não cancela a execução: não há <code>AbortSignal</code>, então a estratégia continua rodando e consumindo chamadas.",
      "O <code>userId</code> vem do corpo, sem autenticação: qualquer cliente informa o id que quiser.",
      "Armadilha da evolução: depois da U6 o <code>reflect</code> do corpo só vale sem <code>strategy</code>, e a rota <code>reflect</code> é sempre ReAct mais Reflection; Plan-and-Execute com Reflection só existe na arena.",
      "Na pasta 02 não existe API: <code>src/index.ts</code> só exporta <code>bootstrapOpsPilot()</code>, e o <code>dev</code> da U2 é <code>tsx src/index.ts</code> sem env file; só o snapshot 03 tem <code>node --env-file-if-exists</code> no <code>dev</code>.",
      "O UNIDADE.md da U2 diz que o <code>/chat</code> estava planejado para fechar a U2 e caiu na U3; a apostila o ensina na U2."
     ]
    }
   ]
  },
  {
   "id": "D4-06",
   "bloco": "d04-b2",
   "mod": "Unidade 3 · Aulas 1 e 2",
   "emoji": "🗄️",
   "read": "7 min",
   "title": "Persistência real com SQLite: OpsStore, checks e prepared statements",
   "short": "O estado do OpsPilot sobrevive ao restart, atrás do mesmo contrato OpsStore, com garantias em quatro camadas.",
   "oneliner": "A store em memória dá lugar a <b>SQLite</b> (<code>node:sqlite</code>) implementando o mesmo contrato <b>OpsStore</b>, de modo que estratégias e tools não mudam. A integridade vem em camadas: <b>TypeScript</b> (contrato), <b>Zod</b> (fronteira), <b>CHECKs do banco</b> e <b>prepared statements</b> (SQL injection).",
   "vovo": [
    "É trocar o quadro-negro da cozinha por um caderno de receitas encadernado: o garçom continua pedindo do mesmo jeito (o contrato), mas o que foi anotado não some quando apaga a luz. E o caderno tem regras na capa: só aceita tamanho P, M ou G, não qualquer coisa que o garçom escrever."
   ],
   "oque": [
    "<b>Por que SQLite:</b> compatibilidade e praticidade do curso. Um banco externo exigiria Docker e configuração, e consumiria aula que deveria ir para agentes. Com <code>node:sqlite</code> nativo, a estrutura fica menor. Migrar para MySQL ou Postgres vira exercício: troca-se a implementação da store, não o raciocínio.",
    "<b>Constitution antes da spec:</b> como a decisão muda a arquitetura, a Constitution é atualizada primeiro, senão as fases seguintes leriam a regra antiga.",
    "<b>OpsStore como contrato:</b> a <code>SQLiteOpsStore</code> implementa a interface existente. O arquivo fica numa pasta de dados fora do Git; os testes e o benchmark usam <code>:memory:</code> (ou a store em memória) para ficar isolados e repetíveis. A composição normal usa SQLite; testes e bench injetam a store descartável.",
    "<b>Modelo:</b> quatro tabelas (services, alerts, incidents, runbooks); incidente guarda data de resolução e um <code>summary</code> nulo até resolver. Checks no banco para tier, severidade e status. DDL e seed idempotentes.",
    "<b>Prepared statements:</b> o valor entra como parâmetro, não como texto do SQL. É o que protege contra SQL injection quando o título de um incidente nasce de uma mensagem do usuário. Zod valida estrutura, o prepared statement protege a interpretação do SQL.",
    "<b>Tools:</b> entram <code>list_incidents</code> (default open) e a consulta de runbook por serviço, e as descrições são revisadas (a descrição é parte do prompt da tool).",
    "<b>Revisar o que o agente gerou:</b> o agente completou as demais tabelas a partir de uma referência de uma só, mas usou severidades diferentes das pedidas; a aula escolhe normalizar de forma explícita e manter um único significado por severidade. A prova de persistência é abrir incidentes, reiniciar o servidor e listar de novo."
   ],
   "como": [
    "O plano e as tarefas cobrem ajustes de dependências (sair do setup de banco anterior), tipos, <code>RunbookNotFoundError</code> como erro de domínio, seed, consultas, integração das tools e testes. As tarefas continuam do tamanho de um commit.",
    "Antes do implement, o autor escreve uma referência com a classe <code>SQLiteOpsStore</code> (caminho configurável, DDL no construtor), a tabela de incidentes completa e a query de listagem com filtro e ordenação por data de criação, deixando o agente completar o resto.",
    "Ele prefere ficar próximo do SQLite e dos prepared statements para entender as garantias; um ORM pode vir depois, sem perder de vista o que cada camada protege."
   ],
   "aplica": [
    "Qualquer agente com estado que precisa sobreviver ao processo: incidentes, tarefas, histórico.",
    "Testes de store com banco em memória, rápidos e isolados."
   ],
   "pros": [
    "Sem infraestrutura externa, o foco continua em agentes.",
    "Contrato de store permite trocar o banco depois sem tocar nas estratégias.",
    "Defesa em profundidade: tipos, Zod, CHECK e prepared statements."
   ],
   "contras": [
    "SQLite embutido não escala para múltiplos processos escrevendo muito.",
    "<code>node:sqlite</code> é experimental e exige Node recente."
   ],
   "traps": [
    "Aceitar o schema que o agente gerou sem comparar com os valores de domínio definidos (a divergência de severidade da aula).",
    "Concatenar valores em SQL por conveniência.",
    "Deixar o arquivo do banco de desenvolvimento entrar no Git."
   ],
   "cola": [
    [
     "OpsStore",
     "Interface de persistência do OpsPilot (alertas, incidentes, runbooks)"
    ],
    [
     "node:sqlite / DatabaseSync",
     "Driver SQLite nativo e síncrono do Node"
    ],
    [
     ":memory:",
     "Banco SQLite descartável usado nos testes"
    ],
    [
     "CHECK",
     "Restrição do banco que limita valores aceitos"
    ],
    [
     "Prepared statement",
     "Comando SQL com parâmetros separados dos valores"
    ],
    [
     "DDL/seed idempotentes",
     "Podem ser aplicados várias vezes sem duplicar ou destruir"
    ],
    [
     "normalizeSeverity",
     "Mapeia sev1..sev4 e variações de caixa para critical, high, medium, low"
    ]
   ],
   "links": [
    [
     "Snapshot da Unidade 3 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use"
    ],
    [
     "UNIDADE.md da Unidade 3",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use/UNIDADE.md"
    ]
   ],
   "codigo": [
    {
     "proj": "03-function-calling-e-tool-use (store SQLite)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use",
     "resumo": "Spec 004: a SqliteOpsStore com node:sqlite, tabelas com CHECK, seed idempotente e prepared statements, mais a normalização de severidade e as tools de incidentes e runbook.",
     "fluxo": [
      "<code>src/store/sqlite-ops-store.ts</code>: <code>DatabaseSync</code> com <code>CREATE TABLE IF NOT EXISTS</code> para <code>services</code> (tier), <code>alerts</code>, <code>incidents</code> (com <code>resolved_at</code> e <code>summary</code>) e <code>runbooks</code>, todos com <code>CHECK</code> nos campos fechados; statements preparados no construtor; <code>seed()</code> com <code>INSERT OR IGNORE</code>; <code>createIncident</code> gera <code>inc-&lt;timestamp&gt;-&lt;4 hex&gt;</code>; <code>getRunbook</code> lança <code>RunbookNotFoundError</code>. Caminho de <code>OPSPILOT_DB</code> (default <code>./data/opspilot.db</code>) ou <code>:memory:</code>.",
      "<code>src/domain/severity.ts</code>: <code>normalizeSeverity</code> aceita sev1..sev4 e a caixa do texto e devolve critical, high, medium ou low; é aplicado por <code>z.preprocess</code> no schema de <code>open_incident</code>.",
      "<code>src/domain/types.ts</code>: <code>OpsStore</code> (seed, getAlerts, getIncidents, createIncident, resolveIncident, getRunbook), implementada por <code>InMemoryStore</code> (testes e bench) e por <code>SqliteOpsStore</code>.",
      "<code>src/store/seed.ts</code> e <code>seed-data.json</code>: o seed do “Mercadinho” com 5 serviços e tier (checkout e payments critical, auth high, catalog e inventory standard), 6 alertas (3 firing) e 3 runbooks (checkout, payments, auth).",
      "<code>src/tools/list-incidents.ts</code> e <code>consultar-runbook.ts</code> (re-exportam as factories de <code>src/agents/tools.ts</code>); <code>src/index.ts</code> abre <code>SqliteOpsStore</code> e roda o seed."
     ],
     "rodar": [
      "<code>npm run dev</code> e um <code>POST /chat</code> pedindo para abrir um incidente de checkout; encerre o servidor, suba de novo e peça os incidentes abertos.",
      "<code>OPSPILOT_DB=:memory:</code> para uma execução efêmera; <code>npm test</code> usa <code>:memory:</code> (precisa de Node 22 com <code>node:sqlite</code>)."
     ],
     "armadilhas": [
      "A descrição do alerta <code>alert-005</code> (serviço <code>catalog</code>) continua “Email delivery queue stalled”, resquício do serviço <code>notification-worker</code> da U2.",
      "O seed só tem runbook para checkout, payments e auth. O serviço “notifications”, usado em demos da apostila e no script de conversa longa, não existe, e <code>createIncident</code> não valida o serviço (sem chave estrangeira): o agente abre incidente para serviço inexistente.",
      "<code>resolveIncident</code> não exige status open: resolver duas vezes reescreve <code>resolved_at</code> e <code>summary</code> (o UPDATE não filtra por status).",
      "Cada store abre sua própria conexão no mesmo arquivo e não há <code>journal_mode</code> nem <code>busy_timeout</code> no código; hipótese: sob escrita concorrente pode haver SQLITE_BUSY (não testei).",
      "<code>node:sqlite</code> não existe no Node 20 (testei: ERR_UNKNOWN_BUILTIN_MODULE); no Node 22.16 os testes passaram com um aviso de recurso experimental. O <code>.gitignore</code> ignora <code>data/</code>."
     ]
    }
   ]
  },
  {
   "id": "D4-07",
   "bloco": "d04-b2",
   "mod": "Unidade 3 · Aula 3",
   "emoji": "🛡️",
   "read": "7 min",
   "title": "Tools externas resilientes: erro como observação, timeout, retry e Zod",
   "short": "Falha de rede vira observação que o agente lê, com timeout, retry limitado e validação de resposta.",
   "oneliner": "Toda tool que depende de rede nasce com três defesas: <b>timeout</b>, <b>retry limitado</b> e <b>validação da resposta com Zod</b>. A falha final <b>não é exceção</b>: vira uma string legível que entra no raciocínio como observação, e o agente continua com o que tem (<b>degradação controlada</b>).",
   "vovo": [
    "Se o motoboy não consegue falar com a loja parceira, ele não para a entrega inteira: avisa “não consegui confirmar a loja X, sigo com o que tenho” e o pedido principal continua. A falha vira informação, não pane."
   ],
   "oque": [
    "<b>Erro como observação:</b> uma exceção interrompe o fluxo; uma observação pode ser lida pelo modelo, que decide tentar outro caminho ou avisar o plantonista da limitação. A resiliência passa a fazer parte do raciocínio.",
    "<b>Defesas de fábrica:</b> limitar o tempo de espera, repetir falhas transitórias poucas vezes e nunca confiar no JSON recebido, mesmo em resposta 200.",
    "<b>A tool de status:</b> consulta páginas públicas de status (GitHub e Cloudflare, sem chave) para ajudar a distinguir problema interno de indisponibilidade externa. O parâmetro é um enum fechado (GitHub como padrão) e a descrição diz quando usar (suspeita de problema externo, dependência fora do ar).",
    "<b>Spec da resiliência:</b> timeout de 5 s por tentativa via cancelamento nativo, no máximo duas tentativas (rede ou 5xx), validação Zod com indicador e descrição, retorno compacto numa linha (o resultado entra no contexto, então tamanho importa), falha final como string legível, <code>fetch</code> injetável para teste.",
    "<b>Testes sem internet:</b> três cenários mínimos com fetch fake: resposta válida, timeout e formato inválido.",
    "<b>Demonstração:</b> uma URL é invalidada de propósito; mesmo assim o ReAct combina a limitação com dados internos e abre o incidente pedido. Um copiloto de plantão que cai porque uma página de status caiu não serve no pior momento."
   ],
   "como": [
    "A referência de código mostra o schema da resposta externa (<code>indicator</code>, <code>description</code>), as URLs centralizadas por provedor, a função de consulta com <code>fetch</code> injetável e o tratamento da última tentativa: se há retry, volta ao laço; se acabou, devolve a mensagem de falha com a causa conhecida.",
    "A mensagem de falha também orienta o raciocínio seguinte: continue com os alertas internos e avise o plantonista de que a dependência não pôde ser verificada. Isso mostra, de forma concreta, “erro como observação”.",
    "As specs falam em “6 regras” de descrição de tool, e a lista muda de um documento para outro: a <code>spec.md</code> da 005 cita quando usar, o que retorna, o que não fazer, defaults, enums com <code>.describe()</code> e erros como observação; o contrato cita nome, o quê, quando usar, quando não usar, <code>.describe()</code> em todo campo e enums fechados. A U3 reescreve as descrições das tools existentes por essas regras."
   ],
   "aplica": [
    "Integrações com APIs de terceiros dentro de agentes: status, CRM, tickets.",
    "Qualquer tool em que a indisponibilidade não deve derrubar a resposta inteira."
   ],
   "pros": [
    "O agente continua útil com informação parcial e comunica a limitação.",
    "Teste determinístico, sem depender de GitHub ou Cloudflare.",
    "O trace registra a observação de falha, explicando decisões tomadas sem aquele dado."
   ],
   "contras": [
    "Engolir erro como texto pode esconder falhas se ninguém observar o trace.",
    "Retry sem backoff e sem jitter não é uma política completa de resiliência."
   ],
   "traps": [
    "Retry infinito: toda repetição tem custo e latência; o teto precisa existir.",
    "Confiar no JSON de uma resposta 200 sem validar.",
    "Devolver estruturas enormes à tool e inflar o contexto do agente."
   ],
   "cola": [
    [
     "Erro como observação",
     "Falha de ferramenta devolvida como texto que o modelo lê"
    ],
    [
     "AbortSignal.timeout",
     "Cancelamento nativo de requisição por tempo"
    ],
    [
     "Retry limitado",
     "Poucas tentativas para falhas transitórias (rede, 5xx)"
    ],
    [
     "Fetch injetável",
     "A função de rede é parâmetro, para trocar por fake nos testes"
    ],
    [
     "Degradação controlada",
     "Perder uma informação, preservar o resto da capacidade"
    ],
    [
     "statuspage.io",
     "Formato das páginas públicas de status consultadas"
    ]
   ],
   "links": [
    [
     "Snapshot da Unidade 3 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use"
    ],
    [
     "UNIDADE.md da Unidade 3",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use/UNIDADE.md"
    ]
   ],
   "codigo": [
    {
     "proj": "03-function-calling-e-tool-use (tool de status de provedores)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use",
     "resumo": "Spec 005: a tool check_provider_status com timeout, retry, Zod e fetch injetável, e a reescrita das descrições de todas as tools por regras de design de schema.",
     "fluxo": [
      "<code>src/tools/check-provider-status.ts</code>: <code>PROVIDER_URLS</code> (<code>githubstatus.com</code> e <code>cloudflarestatus.com</code>, <code>/api/v2/status.json</code>); <code>statusPageStatusSchema</code> (Zod, <code>status.indicator</code> e <code>status.description</code>, com <code>passthrough</code>); <code>fetchProviderStatus(provider, { fetch })</code> faz até 2 tentativas, <code>AbortSignal.timeout(5000)</code> em cada uma, retenta rede, timeout e 5xx, e devolve texto sem retry para 4xx e para JSON ou schema inválido. Nunca rejeita.",
      "Sucesso: <code>&lt;provider&gt; está &lt;indicator&gt; - &lt;description&gt;</code>. Falha: “não consegui consultar o status de &lt;provider&gt; (&lt;detalhe&gt;). Responda com base nos alertas internos e avise o plantonista da limitação”.",
      "<code>src/agents/tools.ts</code>: <code>createCheckProviderStatusTool</code> com <code>provider</code> como enum (github default, cloudflare) e descrição com “Quando usar / Quando não usar”; as demais tools seguem o mesmo formato.",
      "<code>src/tools/check-provider-status.test.ts</code> (fetch fake): sucesso do GitHub, URL e formatação do Cloudflare, timeout com retry e erro legível, 5xx e depois sucesso, 4xx sem retry, corpo inválido e campos extras tolerados."
     ],
     "rodar": [
      "<code>npm test</code> (esta suíte não usa rede).",
      "Pelo chat: “o GitHub está com problema?” com a estratégia react; para ver a degradação, altere uma URL em <code>PROVIDER_URLS</code> localmente (o código não tem flag para isso, a demo editou a URL)."
     ],
     "armadilhas": [
      "Não há espera entre tentativas: no pior caso são 2 timeouts de 5 s, cerca de 10 s para o agente.",
      "429 (rate limit) é tratado como 4xx: a tool responde “respondeu HTTP 429” sem retry.",
      "A observação de erro embute uma instrução ao modelo (“Responda com base nos alertas internos…”). É texto do próprio código, não do provedor, mas é prompt dentro de dado de tool.",
      "As tools locais não seguem o padrão por completo: <code>resolve_incident</code> converte só <code>IncidentNotFoundError</code> em “Error: ...”; as demais exceções sobem."
     ]
    }
   ]
  },
  {
   "id": "D4-08",
   "bloco": "d04-b2",
   "mod": "Unidade 3 · Aula 4",
   "emoji": "🔗",
   "read": "6 min",
   "title": "MCP: o OpsPilot como servidor de ferramentas, outra porta para a mesma aplicação",
   "short": "As tools viram um servidor MCP stdio reaproveitando store e schemas, e o stdout passa a ser do protocolo.",
   "oneliner": "O <b>MCP</b> resolve o problema N agentes x M fontes de ferramentas: escreve-se o servidor uma vez e qualquer cliente compatível o usa. Regra da aula: o MCP <b>não é um novo backend</b>, é outra porta para a mesma <code>OpsStore</code> e os mesmos schemas Zod; e no <b>stdio</b> o stdout é do protocolo.",
   "vovo": [
    "É uma tomada padrão na parede da cozinha: em vez de fazer um adaptador diferente para cada eletrodoméstico, qualquer aparelho compatível liga. E a regra do stdout é “não grite no corredor onde as pessoas combinam o pedido por sussurro”: qualquer ruído atrapalha a conversa."
   ],
   "oque": [
    "<b>Protocolo aberto:</b> um servidor MCP pode expor <i>tools</i> (funções que o agente chama), <i>resources</i> (dados) e <i>prompts</i> (templates). A aula foca nas tools.",
    "<b>Segunda porta:</b> a API HTTP é uma porta, o MCP é outra, e ambas precisam chegar à mesma lógica e ao mesmo estado persistido. Duas implementações paralelas virariam dois produtos no mesmo repositório.",
    "<b>Regra do stdio:</b> sem <code>console.log</code> livre no servidor; diagnóstico vai para stderr. Um log inocente pode ser lido pelo cliente como mensagem do protocolo.",
    "<b>Catálogo da v1:</b> listar alertas, abrir incidentes e resolver incidentes, com servidor chamado “OpsPilot” e um script do projeto que também carrega o ambiente.",
    "<b>Clientes:</b> o servidor é registrado por configuração em cada cliente (VS Code e Cursor usam pastas diferentes, com conteúdo quase igual). Depois de configurar, é preciso recarregar e, muitas vezes, abrir uma nova sessão, pois a lista de ferramentas é lida no início da conversa.",
    "<b>Prova circular:</b> no Cursor, o agente escolhe a tool MCP e abre um incidente em notifications; no VS Code, o Copilot faz o mesmo; e a API HTTP lista os incidentes criados pelos dois, porque a store é compartilhada. A apostila separa falha de MCP de falha de ambiente (o Copilot numa branch errada parecia “MCP quebrado”)."
   ],
   "como": [
    "A referência do servidor cria <code>McpServer</code> com nome e versão, instancia a <code>SQLiteOpsStore</code> e registra a primeira tool (<code>open_incident</code>) com descrição clara e campos descritos; as outras duas seguem o padrão. Depois conecta o transporte stdio.",
    "O primeiro erro de conexão no Cursor vinha do comando de inicialização não achar o runtime para TypeScript; foi corrigido com ajuda do agente. Disponibilizar uma tool não termina na implementação: o processo precisa ser iniciável pelo cliente."
   ],
   "aplica": [
    "Reutilizar as mesmas capacidades em Copilot, Cursor ou outro agente sem reescrever integrações.",
    "Oferecer operações de domínio (abrir, resolver) como ferramentas padronizadas."
   ],
   "pros": [
    "Uma implementação, vários clientes.",
    "Reuso de store, schemas e regras: sem divergência entre portas."
   ],
   "contras": [
    "Configuração por cliente e sessões que não recarregam ferramentas dificultam o diagnóstico.",
    "O MCP acrescenta interoperabilidade, mas não substitui validação, limites e revisão."
   ],
   "traps": [
    "<code>console.log</code> no servidor stdio.",
    "Duplicar a regra de negócio no servidor MCP.",
    "Concluir que o protocolo está com defeito quando a causa é branch, sessão ou caminho do runtime."
   ],
   "cola": [
    [
     "MCP",
     "Model Context Protocol: protocolo aberto entre agentes e provedores de ferramentas"
    ],
    [
     "Tools / resources / prompts",
     "As três categorias que um servidor MCP pode expor"
    ],
    [
     "stdio",
     "Transporte por entrada e saída padrão do processo; stdout é do protocolo"
    ],
    [
     "registerTool",
     "Registro de uma tool no McpServer com schema de entrada"
    ],
    [
     "N x M",
     "N agentes e M fontes de ferramentas: o problema que o MCP resolve"
    ]
   ],
   "links": [
    [
     "Model Context Protocol",
     "https://modelcontextprotocol.io"
    ],
    [
     "Snapshot da Unidade 3 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use"
    ]
   ],
   "codigo": [
    {
     "proj": "03-function-calling-e-tool-use (src/mcp)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use",
     "resumo": "Spec 006: servidor MCP stdio que expõe list_alerts, open_incident e resolve_incident reaproveitando as tools e os schemas do agente.",
     "fluxo": [
      "<code>src/mcp/create-server.ts</code>: <code>createOpsMcpServer(store)</code> devolve um <code>McpServer</code> de nome <code>opspilot</code>; registra as três tools com <code>registerTool</code>, reutilizando a <code>description</code> e os schemas Zod exportados por <code>src/agents/tools.ts</code> e chamando <code>tool.invoke(args)</code>. O resultado é texto em <code>content</code>.",
      "<code>src/mcp/server.ts</code>: abre <code>SqliteOpsStore(OPSPILOT_DB)</code>, roda o seed, conecta <code>StdioServerTransport</code> e só escreve em <code>console.error</code> (“opspilot MCP server: pronto (stdio)”).",
      "<code>package.json</code>: <code>npm run mcp</code> é <code>node --env-file-if-exists=.env --import tsx src/mcp/server.ts</code>.",
      "<code>.vscode/mcp.json</code> e <code>.cursor/mcp.json</code>: transporte stdio e <code>npm --prefix ${workspaceFolder} run --silent mcp</code>; o <code>--silent</code> provavelmente existe para o npm não escrever no stdout (hipótese).",
      "<code>src/mcp/server.test.ts</code>: lista exatamente as três tools, confere a identidade do servidor, a paridade com a tool do LangChain sobre o mesmo store, abrir e resolver incidente, e um teste que varre <code>src/mcp</code> e falha se houver <code>console.log</code> (a regra do stdio virou teste)."
     ],
     "rodar": [
      "<code>npm run mcp</code> (processo stdio; use um cliente MCP para conversar).",
      "Registre em <code>.vscode/mcp.json</code> (VS Code) ou <code>.cursor/mcp.json</code> (Cursor), recarregue a janela e abra uma sessão nova.",
      "<code>npm test</code> cobre o catálogo e o contrato."
     ],
     "armadilhas": [
      "O catálogo MCP tem só 3 tools; <code>list_incidents</code>, <code>consultar_runbook</code>, <code>check_provider_status</code> e <code>forget_preference</code> ficam fora (há teste que afirma isso).",
      "Erros chegam como texto “Error: ...” num resultado normal: pelo código não há <code>isError</code>, então o cliente não distingue falha de sucesso.",
      "HTTP e MCP são processos distintos que compartilham o arquivo SQLite; o caminho padrão <code>./data/opspilot.db</code> é relativo ao diretório de execução."
     ]
    }
   ]
  },
  {
   "id": "D4-09",
   "bloco": "d04-b3",
   "mod": "Unidade 4 · Aulas 1 e 2",
   "emoji": "💾",
   "read": "10 min",
   "title": "Memória do agente: conversa persistente, memória semântica com embeddings e refletor de aprendizado",
   "short": "O modelo não lembra de nada; toda memória é engenharia nossa: guardar, recuperar com relevância e injetar com limite.",
   "oneliner": "Um LLM não lembra de nada: <b>toda memória de agente é engenharia nossa</b>. O OpsPilot ganha <b>memória episódica</b> (mensagens por <code>conversationId</code>, janela recente), <b>memória semântica</b> (fatos por <code>userId</code>, embeddings locais, dedup e recall com limiar) e um <b>refletor</b> que destila aprendizados duráveis.",
   "vovo": [
    "A memória episódica é o diário do plantão, na ordem em que as coisas aconteceram. A semântica é o caderninho de preferências: “o João gosta de ver os críticos primeiro”. Para achar a anotação certa quando alguém diz “organize meu plantão”, o caderninho é pesquisado por significado, não pela palavra exata.",
    "O refletor é o assistente que, depois de cada conversa, risca uma frase do que vale guardar e ignora o resto."
   ],
   "oque": [
    "<b>O problema:</b> o agente respondia a um pedido de incidente e, na requisição seguinte, não sabia o nome do usuário. Cada request é uma execução nova; produtos como GPT e Gemini parecem contínuos porque há memória construída ao redor do modelo.",
    "<b>Camadas:</b> <i>working memory</i> (a conversa em andamento), memória de longa duração (como o arquivo de instructions, declarada por nós), <i>episódica</i> (diário do que aconteceu, em ordem) e <i>semântica</i> (fatos e preferências destilados). Persistir não basta: o desafio é a relevância, trazer de volta só o que ajuda naquele turno.",
    "<b>Episódica:</b> uma Conversation Store (criar, anexar, recuperar as últimas mensagens) na mesma SQLite; o <code>/chat</code> aceita <code>conversationId</code> opcional e o devolve; a aula começa com janela de 12 mensagens, e a métrica <code>historyMessages</code> mede o peso da memória.",
    "<b>Embedding:</b> representação numérica do texto (384 dimensões no <code>all-MiniLM-L6-v2</code>); textos de sentido parecido ficam próximos. A similaridade usa produto escalar sobre vetores normalizados, equivalente ao cosseno. O modelo roda localmente (dezenas de MB): sem custo de API, sem enviar preferência do usuário para fora, e a escala é de dezenas de memórias por usuário. Com milhões de vetores a resposta seria outra.",
    "<b>Memory Store por userId:</b> <code>remember</code> (com deduplicação: similaridade acima de 0,92 não grava de novo) e <code>recall</code> (no máximo 3, e só acima de um limiar de 0,3, porque sempre existem três “melhores”, mesmo ruins). Contexto é orçamento: memória irrelevante é ruído.",
    "<b>Refletor de aprendizado:</b> depois da resposta, uma chamada com saída estruturada decide se há um fato durável; pedido pontual e segredo não viram memória. Há também o esquecimento: o usuário precisa poder pedir para remover algo.",
    "<b>Validação da aula:</b> o nome informado num <code>conversationId</code> volta na pergunta seguinte; a preferência “críticos primeiro” é gravada, gravar de novo devolve <code>stored: false</code> (dedup) e “organize meu plantão” recupera a memória e ordena a resposta; a métrica mostra uma memória recuperada e zero mensagens de histórico.",
    "<b>Referências:</b> Generative Agents (Park et al.) define observação, reflexão e planejamento, o desenho que o refletor implementa em escala reduzida; Hands-On LLMs (Alammar e Grootendorst) aprofunda embeddings e busca semântica."
   ],
   "como": [
    "Fluxo do turno com memória (U4): criar ou carregar a conversa, ler as últimas mensagens, fazer recall com a mensagem atual, anexar a mensagem do usuário, executar a estratégia com mensagem enriquecida, anexar a resposta, agendar o aprendizado sem bloquear.",
    "Testes: SQLite em memória e, na spec de memória semântica, embeddings reais (não fake), possíveis porque o modelo é local.",
    "O que acontece quando a janela e as memórias crescem demais é o tema dos tópicos <a href=\"#D4-10\">10</a> e <a href=\"#D4-11\">11</a>.",
    "Na validação, a aula mostra defeitos comuns de agente de código: a rota de memórias gerada pelo agente estava incompleta e foi corrigida no Cursor; o formato da resposta ainda precisou de ajuste."
   ],
   "aplica": [
    "Assistentes que precisam de continuidade (plantão, suporte) sem reenviar histórico inteiro.",
    "Preferências por usuário recuperadas por significado, não por palavra exata."
   ],
   "pros": [
    "Continuidade entre requests e entre reinícios.",
    "Dedup e limiar mantêm a memória limpa e o contexto enxuto.",
    "Embeddings locais: privacidade e custo zero de API."
   ],
   "contras": [
    "Limiar e dedup são números heurísticos (0,92 e 0,3) que dependem do modelo e dos dados.",
    "Busca linear em memória serve para dezenas de itens por usuário, não para milhões.",
    "Cada refletor é uma chamada extra de LLM por turno."
   ],
   "traps": [
    "Guardar tudo e nunca recuperar, ou recuperar demais e inflar o contexto.",
    "Esquecer o limiar de relevância: “top 3” sempre devolve três, mesmo irrelevantes.",
    "Gravar pedido pontual ou segredo como memória permanente."
   ],
   "cola": [
    [
     "Working / episódica / semântica",
     "Conversa atual, diário ordenado e fatos destilados"
    ],
    [
     "conversationId / userId",
     "Chave do fio de conversa / chave de isolamento das memórias"
    ],
    [
     "Embedding",
     "Vetor numérico do texto; sentidos parecidos ficam próximos"
    ],
    [
     "all-MiniLM-L6-v2",
     "Modelo local de embeddings de 384 dimensões usado no curso"
    ],
    [
     "Dedup 0,92",
     "Similaridade acima disso é considerada a mesma memória"
    ],
    [
     "Gate 0,3 / top 3",
     "Recall devolve até 3 memórias e só as acima de 0,3"
    ],
    [
     "Refletor",
     "Chamada pós-resposta que destila um fato durável"
    ]
   ],
   "links": [
    [
     "Generative Agents (arXiv:2304.03442)",
     "https://arxiv.org/abs/2304.03442"
    ],
    [
     "Snapshot da Unidade 4 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/04-memoria-e-reflexao-em-agentes-autonomos"
    ],
    [
     "UNIDADE.md da Unidade 4",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/04-memoria-e-reflexao-em-agentes-autonomos/UNIDADE.md"
    ]
   ],
   "codigo": [
    {
     "proj": "04-memoria-e-reflexao-em-agentes-autonomos",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/04-memoria-e-reflexao-em-agentes-autonomos",
     "resumo": "Specs 007 (conversa persistente), 008 (memória semântica) e 009 (refletor). A conversa persistente já aparece na pasta 03 (commitada junto com o MCP). Os trechos abaixo descrevem o snapshot 04 e, quando difere, o final.",
     "fluxo": [
      "<code>src/store/sqlite-conversation-store.ts</code>: tabelas <code>conversations</code>, <code>messages</code> (<code>role</code> com CHECK user ou assistant, chave estrangeira, índice por conversa) e, depois, <code>conversation_summaries</code>; métodos <code>create</code>, <code>append</code>, <code>lastMessages(limit)</code> e outros; conversa inexistente lança <code>ConversationNotFoundError</code> (404).",
      "<code>src/chat/run-chat.ts</code> (U4): <code>HISTORY_LIMIT = 12</code>; <code>lastMessages</code>, <code>recall</code>, <code>append</code> do usuário, estratégia com a mensagem enriquecida (<code>Relevant memories:</code> e <code>Current message:</code>), <code>append</code> da resposta e <code>scheduleLearning</code> sem aguardar. A partir da U5 o limite cai para 8 e o fluxo migra para o grafo de produção; <code>run-chat.ts</code> permanece, mas só os testes e <code>formatHistoryForPrompt</code> o usam.",
      "<code>src/memory/embeddings.ts</code>: <code>pipeline(\"feature-extraction\", \"Xenova/all-MiniLM-L6-v2\")</code> do <code>@huggingface/transformers</code>, pooling média e normalização; confere 384 dimensões; singleton preguiçoso; falha vira <code>EmbeddingError</code>.",
      "<code>src/memory/memory-store.ts</code>: <code>SqliteMemoryStore</code> com tabela <code>memories</code> (embedding como BLOB Float32); <code>remember</code> deduplica com <code>dot &gt; 0.92</code> e devolve <code>stored: false</code>; <code>recall</code> pontua tudo, filtra <code>&gt;= 0.3</code>, ordena e pega 3; <code>forget(userId, id)</code>.",
      "<code>src/memory/learning-reflector.ts</code>: <code>learningReflectionSchema { hasLearning, fact }</code>, prompt que recusa pedido pontual e segredo, <code>scheduleLearning</code> (best-effort, nunca quebra o chat) e, nas correções “war room”, <code>prepareMemoriesForTurn</code>: para pedidos de organizar o plantão, aguarda o refletor antes do recall.",
      "<code>src/memory/chat-user-context.ts</code>: <code>AsyncLocalStorage</code> com o <code>userId</code> do turno, usado pela tool <code>forget_preference</code>; <code>POST /memories</code> em <code>server.ts</code> (201 se gravou, 200 se duplicado); <code>src/agents/system-prompt.ts</code> define o formato Resumo, Achados e Próximos passos e a ordenação por severidade."
     ],
     "rodar": [
      "<code>npm run dev</code>; na primeira execução (e na primeira vez que o <code>npm test</code> toca o embedder) o modelo de embeddings é baixado.",
      "<code>curl -X POST localhost:3000/chat -d '{\"message\":\"me chame de Thiago e abra um incidente low no catalog\",\"userId\":\"u1\"}'</code>, guarde o <code>conversationId</code> e pergunte “qual é o meu nome?” no mesmo id.",
      "<code>curl -X POST localhost:3000/memories -d '{\"userId\":\"u1\",\"fact\":\"prefere ver alertas críticos primeiro\"}'</code> e depois peça “organize o meu plantão”."
     ],
     "armadilhas": [
      "O <code>npm test</code> baixa o modelo de embeddings na primeira execução (<code>embeddings.test.ts</code> usa o modelo real e levou o timeout para 180 s), embora o README do módulo diga que os testes usam fakes e não chamam a rede.",
      "A janela era de 12 mensagens na U4 (como na apostila) e é 8 do snapshot 05 em diante.",
      "<code>GET /memories</code> e <code>DELETE /memories</code> ficaram fora do escopo (UNIDADE.md). O esquecimento existe como tool <code>forget_preference</code>, que apaga o primeiro resultado do recall (qualquer score acima de 0,3): pode apagar uma memória parecida, mas errada (hipótese).",
      "O refletor roda a cada mensagem (uma chamada extra de LLM que não entra em <code>llmCalls</code>) e vê só a mensagem do usuário, não a resposta.",
      "Há remendos em português para a demo do plantão (correções “war room”, a partir da pasta 06): o prompt do refletor manda gravar um fato de ordenação (<code>PLANTAO_ORG_MEMORY_FACT</code>) sempre que o usuário pede para “organizar” o plantão, mesmo sem declarar preferência; regexes (<code>organiz</code>, <code>priorid</code>, <code>severidade</code>, <code>order</code>) fazem o turno esperar o refletor antes do recall; e <code>buildMemoryRecallQuery</code> acrescenta texto fixo (“preferência organização plantão”, “ordenar Achados por severidade…”) à query do recall. O “críticos primeiro” da War Room vem em parte desses remendos e do system prompt, não só da similaridade semântica.",
      "O <code>UNIDADE.md</code> da U4 cita um evento <code>learning</code> no trace; o código não tem esse tipo de evento (<code>TraceEventType</code> não o lista) e o refletor grava direto na store.",
      "O <code>userId</code> vem do corpo e não há autenticação: quem sabe o id lê e grava as memórias dele."
     ]
    }
   ]
  },
  {
   "id": "D4-10",
   "bloco": "d04-b3",
   "mod": "Unidade 5 · Aula 1",
   "emoji": "📏",
   "read": "7 min",
   "title": "Contexto como orçamento: medir tokens, podar e sumarizar em rolo",
   "short": "Antes de cortar, medir: tokens reais, estimativa por fonte e um resumo incremental que preserva decisões.",
   "oneliner": "Contexto ativo é tudo que o modelo enxerga numa chamada. Primeiro <b>medir</b>: o uso real devolvido pela API e uma estimativa de ~4 caracteres por token. Depois, em vez de apagar mensagens antigas, <b>sumarizar em rolo</b> para preservar decisões, fatos e pendências.",
   "vovo": [
    "Imagine a mala de viagem com limite de peso. Primeiro você pesa o que levou, depois decide o que fica. E para as roupas que não cabem você não joga fora tudo: faz uma lista curta do que precisa lembrar (“casaco azul no hotel”) e leva a lista, que a cada viagem incorpora a anterior."
   ],
   "oque": [
    "<b>Fontes do contexto ativo no OpsPilot:</b> system prompt fixo, memórias recuperadas, histórico recente, definições de tools e mensagem atual; no ReAct somam-se as observações das tools. Nada disso é gratuito, nem o system prompt e os schemas, que entram em toda chamada.",
    "<b>Context rot e “lost in the middle”:</b> mais tokens não é mais inteligência; informação no meio de um contexto grande recebe menos atenção que a do começo e do fim (Liu et al.). O objetivo é o menor contexto capaz de sustentar uma boa decisão.",
    "<b>Duas medições:</b> real (campo <code>usage</code> da resposta do modelo) para observabilidade, e estimada (cerca de 4 caracteres por token) para decidir cortes antes de pagar a chamada. As métricas do <code>/chat</code> ganham <code>promptTokens</code> e um <code>contextBreakdown</code> por fonte; numa execução da aula o prompt chegou a cerca de 6.751 tokens.",
    "<b>Pruning não é apagar:</b> a janela recente já é uma forma de pruning, mas cortar mensagens antigas pode perder uma decisão (o freeze de deploy que termina no dia 15, atualizado depois para o dia 20). A solução é <b>sumarização do histórico</b>: um resumo de ~150 tokens, em tópicos telegráficos, que preserva decisões, fatos (nomes, datas), incidentes e pendências, descarta conversa social e <b>incorpora o resumo anterior</b>.",
    "<b>Quando sumarizar:</b> não em toda request. Atualiza-se só quando um novo lote de mensagens sai da janela (na aula, oito).",
    "<b>Script de conversa longa:</b> simula um plantão de vários turnos e mostra o consumo por turno; é para rodar uma vez, porque faz muitas chamadas e gasta cota."
   ],
   "como": [
    "A spec 010 pede a função de estimativa e a captura do <code>usage</code> do LangChain; as métricas do chat passam a incluir <code>promptTokens</code> e <code>contextBreakdown</code>; o script de conversa longa passa a imprimir o consumo por turno; entram testes.",
    "A spec 011 cria a estrutura <code>conversation_summaries</code>. Antes do implement há uma referência para o prompt do sumarizador. Validação: depois de algumas rodadas, o resumo recuperado preserva “o freeze de deploys permanece ativo até o dia 15” mesmo fora da janela recente."
   ],
   "aplica": [
    "Conversas longas de suporte ou plantão em que decisões antigas ainda valem.",
    "Qualquer agente cujo custo por turno cresce com o histórico."
   ],
   "pros": [
    "Decisões deixam de depender de uma janela deslizante.",
    "O consumo vira dado: pruning por evidência, não por intuição.",
    "O resumo incremental mantém o custo do passado aproximadamente constante."
   ],
   "contras": [
    "A estimativa de 4 caracteres por token é grosseira (idioma e símbolos mudam o resultado).",
    "Sumarização é lossy e usa uma chamada extra de LLM."
   ],
   "traps": [
    "Cortar o histórico sem sumarizar e perder decisões.",
    "Rodar o script de conversa longa repetidamente e queimar a cota.",
    "Sumarizar a cada request em vez de por lote."
   ],
   "tip": "Para a escolha entre simplesmente aumentar a janela e cuidar do contexto, a indicação de leitura “Lost in the Middle” (TACL 2024) é a evidência empírica citada na apostila.",
   "cola": [
    [
     "Contexto ativo",
     "Tudo que é enviado ao modelo numa chamada"
    ],
    [
     "promptTokens",
     "Tokens de prompt informados pela API do modelo"
    ],
    [
     "contextBreakdown",
     "Estimativa de tokens por fonte (system, history, memories, message, summary)"
    ],
    [
     "Sumarização em rolo",
     "Cada novo resumo incorpora o anterior"
    ],
    [
     "Context rot",
     "Qualidade que cai quando o contexto acumula ruído"
    ],
    [
     "Lost in the middle",
     "O meio do contexto longo recebe menos atenção que o início e o fim"
    ]
   ],
   "links": [
    [
     "Lost in the Middle (arXiv:2307.03172)",
     "https://arxiv.org/abs/2307.03172"
    ],
    [
     "Snapshot da Unidade 5 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/05-gerenciamento-de-contextos"
    ],
    [
     "UNIDADE.md da Unidade 5",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/05-gerenciamento-de-contextos/UNIDADE.md"
    ]
   ],
   "codigo": [
    {
     "proj": "05-gerenciamento-de-contextos (medição e sumarização)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/05-gerenciamento-de-contextos",
     "resumo": "Specs 010 e 011: estimativa e usage real de tokens, breakdown por fonte e sumarização em rolo do histórico, mais o script que demonstra o context rot.",
     "fluxo": [
      "<code>src/context/tokens.ts</code>: <code>estimateTokens</code> = <code>Math.floor(chars / 4)</code>; <code>readLlmUsage</code> lê <code>usage_metadata</code> ou <code>response_metadata.tokenUsage</code> de forma defensiva (nunca lança); <code>sumPromptTokensFromMessages</code> soma o uso das mensagens do turno; <code>buildContextBreakdown</code> devolve cinco chaves (system, history, memories, message, summary).",
      "<code>src/chat/history-summarizer.ts</code>: <code>HISTORY_LIMIT = 8</code>, <code>SUMMARY_BATCH_SIZE = 8</code>, <code>SUMMARY_TOKEN_TARGET = 150</code> e <code>SUMMARIZER_PROMPT</code>; <code>maybeSummarize</code> calcula <code>outside = total - 8</code> e <code>pending = outside - covered</code> e, com ≥ 8 pendentes, resume o próximo lote de 8 (em ordem) junto com o resumo anterior, guarda <code>covered_count</code> como marca d'água e emite o evento <code>summarize</code>; qualquer erro devolve <code>null</code> sem barulho.",
      "Tabela <code>conversation_summaries</code> (<code>conversation_id</code>, <code>summary_text</code>, <code>covered_count</code>, <code>updated_at</code>) em <code>sqlite-conversation-store.ts</code>.",
      "<code>scripts/conversa-longa.sh</code>: 30 turnos no mesmo <code>conversationId</code>; o turno 3 planta “o freeze de deploys termina dia 15”; imprime <code>promptTokens</code>, estimativas, <code>recalled</code> e <code>hist</code> por turno; usa <code>jq</code> e <code>BASE_URL</code> (default <code>localhost:3000</code>). <code>src/context/conversa-longa.script.test.ts</code> testa o script."
     ],
     "rodar": [
      "<code>npm run dev</code> e, em outro terminal, <code>./scripts/conversa-longa.sh</code> (requer <code>jq</code>; faz até 30 chamadas reais).",
      "Observe <code>contextBreakdown</code> e o evento <code>summarize</code> depois que as mensagens passam da janela.",
      "<code>npm test</code> e <code>npm run typecheck</code>."
     ],
     "armadilhas": [
      "<code>promptTokens</code> é a soma do <code>input_tokens</code> de todas as chamadas do turno no ReAct (não o tamanho de um prompt). Roteador, crítico e sumarizador, que usam saída estruturada ou ficam fora das mensagens da estratégia, não entram.",
      "O UNIDADE.md da U5 descreve o breakdown como system, memories, history, tools e message e fala de um evento <code>context</code> no trace; o código tem <code>summary</code> no breakdown, não mede as definições de tools e só emite o evento <code>summarize</code>.",
      "Um resumo acima de ~150 tokens é cortado por caracteres (<code>slice(0, 600)</code>): fica o começo e se perde o fim.",
      "A sumarização falha em silêncio (<code>catch</code> devolve <code>null</code>): se o modelo cair, o resumo simplesmente não avança.",
      "O script cita o serviço “notifications”, que não existe no seed, e depende de <code>jq</code>; a aula manda rodá-lo uma única vez."
     ]
    }
   ]
  },
  {
   "id": "D4-11",
   "bloco": "d04-b3",
   "mod": "Unidade 5 · Aula 2",
   "emoji": "🧵",
   "read": "6 min",
   "title": "Context stitching: ContextBuilder com teto, prioridade e regra de corte por seção",
   "short": "Cada fonte do prompt ganha teto, prioridade e política de corte própria, montadas num único ponto.",
   "oneliner": "<b>Context stitching</b> é montar o prompt a partir de seções (system, resumo, histórico, memórias, mensagem), cada uma com <b>teto</b>, <b>prioridade</b> e <b>regra de corte</b> próprios. Um <b>ContextBuilder</b> único centraliza isso para todas as estratégias.",
   "vovo": [
    "É montar a marmita com compartimentos de tamanho fixo: arroz, feijão, salada e sobremesa. Se o feijão passa do compartimento, tira o excesso do feijão, não da sobremesa. E o compartimento é um teto: não precisa encher tudo só porque cabe."
   ],
   "oque": [
    "<b>Por seção, uma política própria:</b> o system prompt define o comportamento e é intocável; o resumo existe porque já comprimimos o passado, então cortá-lo às cegas elimina o que a sumarização preservou; o histórico encurta removendo as mais antigas, que é a ordem natural; as memórias já vêm com score e perdem as de menor relevância primeiro.",
    "<b>Orçamentos configuráveis</b> por ambiente (valores de exemplo da aula: resumo ~200, memórias ~300 tokens), porque modelos e custos diferem. Budget é teto, não meta: se sobra espaço, não se enche com informação irrelevante.",
    "<b>Um builder único:</b> se cada estratégia costurasse o contexto do seu jeito, o mesmo pedido teria orçamentos diferentes sem ninguém notar. O builder devolve também um <b>breakdown por seção</b>, o que torna o budget auditável (permitido versus efetivo).",
    "<b>Paralelo com as ferramentas:</b> Copilot e outros agentes também selecionam, resumem e priorizam o que continua na janela; no OpsPilot essas decisões ficam explícitas. Isso explica por que uma nova janela se comporta diferente e por que instruções precisam estar persistidas.",
    "<b>Prioridade protege a qualidade:</b> o budget não é só economia; evita que histórico e memórias empurrem a informação atual para um contexto ruidoso."
   ],
   "como": [
    "Spec 012 com testes de tetos propositalmente baixos para provar a ordem de corte. A referência mostra a sequência: system (não cortar), resumo (do <code>conversationId</code>, protegido), histórico (limitado, mais antigas primeiro), memórias (recall por <code>userId</code> e mensagem, menor score primeiro) e, ao final, <i>fit to budget</i> por seção e o breakdown.",
    "Na validação, o autor reaproveita um <code>conversationId</code> do script de conversa longa e lê o breakdown: o system fica acima de valores pequenos porque é protegido; histórico e resumo ficam no teto; as memórias usam pouco porque o recall trouxe pouco.",
    "Um aprendizado de revisão: os nomes das variáveis geradas pelo agente não coincidiam com os imaginados e o teste usaria os defaults sem perceber."
   ],
   "aplica": [
    "Qualquer agente com várias fontes de contexto que competem por espaço.",
    "Ajustar orçamento por modelo, custo ou domínio sem mudar código."
   ],
   "pros": [
    "Política explícita, mensurável e testável.",
    "Mudança num único ponto vale para todas as estratégias."
   ],
   "contras": [
    "Heurísticas de corte (caracteres por token) são aproximadas.",
    "Orçamentos mal calibrados podem cortar o que importa."
   ],
   "traps": [
    "Variáveis de ambiente com nome diferente do que o código lê.",
    "Tratar o budget como meta a preencher.",
    "Cortar o system prompt ou o resumo com a mesma regra do histórico."
   ],
   "cola": [
    [
     "Context stitching",
     "Costura das fontes do prompt num contexto final"
    ],
    [
     "ContextBuilder",
     "Ponto único de montagem com orçamento por seção"
    ],
    [
     "Regra de corte",
     "never, truncate, oldest-first, lowest-score-first"
    ],
    [
     "Fit to budget",
     "Aplicar teto e regra a cada seção"
    ],
    [
     "CONTEXT_BUDGET_*",
     "Variáveis de ambiente com o teto de cada seção"
    ]
   ],
   "links": [
    [
     "Snapshot da Unidade 5 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/05-gerenciamento-de-contextos"
    ]
   ],
   "codigo": [
    {
     "proj": "05-gerenciamento-de-contextos (ContextBuilder)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/05-gerenciamento-de-contextos",
     "resumo": "Spec 012: buildContext, uma função pura que recebe system, resumo, histórico, memórias e mensagem, aplica tetos e devolve o contexto montado.",
     "fluxo": [
      "<code>src/context/context-builder.ts</code>: <code>buildContext(input, { budgets, env })</code> é puro (sem I/O); <code>resolveSectionBudgets</code> lê <code>CONTEXT_BUDGET_SUMMARY</code> (200), <code>CONTEXT_BUDGET_HISTORY</code> (1200; alias legado <code>CONTEXT_BUDGET_WINDOW</code>), <code>CONTEXT_BUDGET_MEMORIES</code> (300) e <code>CONTEXT_BUDGET_SYSTEM</code> (lido, mas ignorado).",
      "Regras: system <code>never</code>; resumo <code>truncate</code> (corta por caracteres); histórico <code>oldest-first</code> (remove da mais antiga; se sobrar só uma, trunca o conteúdo); memórias <code>lowest-score-first</code> (empate remove a de maior índice) e os sobreviventes voltam à ordem original.",
      "Saída: <code>enrichedMessage</code> (<code>Conversation summary:</code>, <code>Relevant memories:</code> e <code>Current message:</code>), <code>history</code>, <code>historyMessages</code>, <code>recalledMemories</code> e os textos usados no breakdown.",
      "Uso: o nó <code>contexto</code> do grafo (U6) chama <code>buildContext</code> e as estratégias recebem <code>built.enrichedMessage</code> e <code>built.history</code>; o system prompt entra pelo <code>prompt</code> do <code>createReactAgent</code>.",
      "<code>src/context/context-builder.test.ts</code>: tetos baixos e ordem de corte por seção."
     ],
     "rodar": [
      "<code>CONTEXT_BUDGET_HISTORY=400 CONTEXT_BUDGET_MEMORIES=100 npm run dev</code> e envie um <code>/chat</code> com o <code>conversationId</code> de uma conversa longa; leia <code>metrics.contextBreakdown</code>.",
      "<code>npm test</code> roda os testes do builder junto com a suíte inteira."
     ],
     "armadilhas": [
      "As variáveis <code>CONTEXT_BUDGET_*</code> não estão no <code>.env.example</code>: sem defini-las, valem os defaults (200, 1200, 300).",
      "O resumo é cortado com <code>slice(0, orçamento * 4)</code>: mantém o começo e descarta o fim, que é onde ficam as decisões mais recentes (hipótese de impacto; o código só mostra o corte).",
      "A mensagem atual é intocável: uma mensagem gigante estoura o orçamento sem corte. As definições de tools e as observações do ReAct ficam fora do orçamento.",
      "Dos tetos, só o resumo, o histórico e as memórias são aplicados; <code>CONTEXT_BUDGET_SYSTEM</code> existe no código mas o system nunca é cortado."
     ]
    }
   ]
  },
  {
   "id": "D4-12",
   "bloco": "d04-b4",
   "mod": "Unidade 6 · Aula 1",
   "emoji": "🕸️",
   "read": "8 min",
   "title": "LangGraph no OpsPilot: grafo de produção, roteador estruturado e fallback de modelo",
   "short": "O cliente deixa de escolher a estratégia: um grafo roteia pela intenção, e retry e fallback protegem o modelo.",
   "oneliner": "As estratégias viram nós de um <b>StateGraph</b> (<b>contexto → roteador → estratégia → resposta</b>); o <b>roteador</b> escolhe a rota com saída estruturada <code>{route, reason}</code> e <code>strategy</code> vira <b>override</b>. <b>Roteamento e disponibilidade são problemas diferentes</b>: o fallback de modelo (retry, reserva, 503) mora na fábrica de modelo.",
   "vovo": [
    "É a recepção de um hospital: o paciente não precisa saber se é caso de clínico, cirurgia ou observação; a triagem decide pela queixa e anota o motivo. E se o médico de plantão não atende, o sistema chama o reserva, e se ninguém atende, avisa com honestidade que está indisponível, em vez de fingir."
   ],
   "oque": [
    "<b>Por que grafo:</b> estados percorrem nós ligados por transições; o fluxo se desenha no próprio código, o roteamento ganha entradas e saídas explícitas, o tracing sabe por quais nós a execução passou e retry ou fallback podem ficar em um ponto específico. Condicionais continuam existindo, mas num lugar explícito. Paralelismo em ondas e o “raio X” do grafo ficam como exercício.",
    "<b>Roteador:</b> classificador que lê o pedido e escolhe entre ReAct (consulta pontual), Plan-and-Execute (várias etapas) e Reflection (verificação). O plantonista às três da manhã não deveria precisar saber qual padrão usar.",
    "<b>Grafo unificado:</b> nó de contexto, roteador, três estratégias que convergem para um nó de resposta. Cada evento de trace identifica o nó. O estado compartilhado carrega entrada, rota, trace e resultado intermediário.",
    "<b>Saída estruturada com Zod:</b> a rota é restrita às estratégias conhecidas e a justificativa é uma frase, que melhora a observabilidade (“por que ReAct?”).",
    "<b>Override:</b> o <code>strategy</code> do corpo passa a ser opcional; se vier, vale como override para teste, bench e depuração, e precisa aparecer no trace para não parecer decisão do roteador.",
    "<b>Resiliência de modelo:</b> o grafo escolher bem não evita o modelo cair. Modelo principal e de fallback na fábrica, retry de cerca de duas tentativas em cada, evento de trace quando o fallback acontece, métrica do modelo efetivamente usado e, se tudo falhar, <b>503</b> em vez de resposta inventada. Retry sempre dentro de um teto conhecido.",
    "<b>O que a aula implementa e valida:</b> o roteamento (ReAct para “quantos alertas críticos”, Plan-and-Execute para “monte um plano de resposta ao incidente de checkout, em ordem”). O fallback fica “especificado e exemplificado” na aula; no repositório ele está implementado (spec 014)."
   ],
   "como": [
    "Specify, plan e tasks para o <b>ProductionGraph</b>, depois uma referência: <code>StateGraph</code> do estado, nós de contexto, roteador, ReAct, Plan-and-Execute, Reflection e resposta; arestas do início ao contexto, ao roteador e, por aresta condicional que lê a rota do estado, à estratégia; todas apontam para a resposta e fim. Compila-se o grafo.",
    "Referência do roteador: schema de decisão, <code>withStructuredOutput</code> com o system prompt do roteador e o pedido, evento <code>route</code> no trace com a justificativa e atualização do estado."
   ],
   "aplica": [
    "Qualquer produto com várias estratégias que precisa esconder a escolha do cliente.",
    "Colocar retry e fallback num único ponto (a fábrica de modelo) em vez de espalhar tratamento de erro."
   ],
   "pros": [
    "Fluxo visível e testável, com nó de origem em cada evento.",
    "Roteador explicável (campo <code>reason</code>) e sobrescrevível.",
    "Resiliência de modelo central e observável."
   ],
   "contras": [
    "Um roteador por LLM é mais uma chamada e pode errar a rota.",
    "Mais conceitos (estado, nós, arestas) do que um <code>if/else</code>."
   ],
   "traps": [
    "Misturar roteamento (qual estratégia) com disponibilidade (qual modelo).",
    "Esquecer de registrar o override no trace.",
    "Retry sem teto antes do fallback."
   ],
   "cola": [
    [
     "StateGraph",
     "Grafo de nós que leem e atualizam um estado compartilhado"
    ],
    [
     "Aresta condicional",
     "Transição escolhida pelo valor do estado (a rota)"
    ],
    [
     "Roteador",
     "Nó classificador que escolhe a estratégia"
    ],
    [
     "Override",
     "Estratégia forçada pelo corpo do request, registrada no trace"
    ],
    [
     "withRetry / withFallbacks",
     "Composição do LangChain para tentar de novo e cair no reserva"
    ],
    [
     "503",
     "Indisponibilidade quando primário e reserva falham"
    ]
   ],
   "links": [
    [
     "LangGraph JS",
     "https://langchain-ai.github.io/langgraphjs"
    ],
    [
     "Snapshot da Unidade 6 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/06-langgraph-e-workflows-complexos"
    ],
    [
     "UNIDADE.md da Unidade 6",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/06-langgraph-e-workflows-complexos/UNIDADE.md"
    ]
   ],
   "codigo": [
    {
     "proj": "06-langgraph-e-workflows-complexos",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/06-langgraph-e-workflows-complexos",
     "resumo": "Specs 013 (grafo de produção) e 014 (resiliência de modelo). O snapshot 06 usa a árvore do commit das unidades 6 a 8 sem a parte web; por isso já contém código de observabilidade. A rota team só chega na U9, e eu a cito porque está no arquivo final.",
     "fluxo": [
      "<code>src/graph/production-graph.ts</code>: estado com <code>Annotation.Root</code> (message, userId, conversationId, requestId, overrideRoute, built, route, answer, trace, strategyMetrics, routerLlmCalls); nós <code>contexto</code>, <code>roteador</code>, <code>react</code>, <code>planExecute</code>, <code>reflect</code> (e <code>team</code> na U9) e <code>resposta</code>; <code>addConditionalEdges(\"roteador\", s => s.route ?? \"react\", ...)</code>. <code>runProductionTurn</code> compila o grafo e roda dentro de <code>runWithModelTelemetry</code> e <code>runWithChatUser</code>.",
      "Nó <code>contexto</code>: cria ou carrega a conversa, <code>maybeSummarize</code>, <code>lastMessages</code>, <code>prepareMemoriesForTurn</code>, <code>buildContext</code> e grava a mensagem do usuário. Nó <code>resposta</code>: grava a resposta, monta métricas (<code>route</code>, <code>routeReason</code>, <code>modelUsed</code>, breakdown), emite o evento <code>fallback</code> quando aplicável e persiste a auditoria.",
      "<code>src/graph/router.ts</code> e <code>router-prompt.ts</code>: <code>routeSchema</code> (<code>route</code> e <code>reason</code>) e tabela de decisão no system prompt (pontual para react, multi-passo para planExecute, verificação ou alta criticidade para reflect, investigação mais plano e execução para team); erro, schema inválido ou rota fora da lista caem em <code>react</code> com <code>reason</code> de fallback; o override gera evento <code>route</code> com <code>override: true</code>; <code>parseOverrideStrategy</code> aceita o alias <code>plan-and-execute</code>.",
      "<code>src/graph/stamp-node.ts</code>: <code>stampNode</code> sobrescreve <code>node</code> em todos os eventos de uma estratégia.",
      "<code>src/agents/model.ts</code>: <code>createModel()</code> devolve <code>OpsResilientChatModel</code>; <code>ChatOpenAI</code> com <code>maxRetries: 0</code>; <code>withRetry({ stopAfterAttempt: 2 })</code> no primário e no reserva (<code>OPENROUTER_MODEL_FALLBACK</code>) e <code>withFallbacks</code>; <code>bindTools</code> e <code>withStructuredOutput</code> também são blindados; a falha total vira <code>ModelUnavailableError</code> (503).",
      "<code>src/llm/model-telemetry.ts</code>: <code>AsyncLocalStorage</code> mais um callback <code>handleLLMEnd</code> registram o modelo que respondeu; se foi o reserva, <code>fallbackUsed</code> vira true e o trace ganha o evento <code>fallback</code> (“primário → reserva”)."
     ],
     "rodar": [
      "No <code>.env</code>, defina <code>OPENROUTER_API_KEY</code>, <code>OPENROUTER_MODEL</code> e <code>OPENROUTER_MODEL_FALLBACK</code>.",
      "<code>npm run dev</code> e um <code>POST /chat</code> sem <code>strategy</code>: leia <code>metrics.route</code> e <code>metrics.routeReason</code>; com <code>\"strategy\":\"planExecute\"</code> o roteador é pulado.",
      "<code>npm test</code> cobre roteador fake, override, falha do classificador, nó em todo evento e o 503 de <code>ModelUnavailableError</code>."
     ],
     "armadilhas": [
      "Com <code>OPENROUTER_MODEL</code> vazio (como no <code>.env.example</code>) o código cai em <code>openai/gpt-4o-mini</code>, que é pago, contrariando o “custo zero” do README.",
      "<code>stampNode</code> sobrescreve o <code>node</code> dos eventos internos: o raio-X por nó vale para as rotas (react, planExecute...), não para planner, executor e replanner dentro do Plan-and-Execute.",
      "Roteador, planner, replanner e crítico engolem erros do modelo (<code>catch</code> amplo): o 503 só nasce em caminhos sem esse <code>catch</code>, como o ReAct e o executor (hipótese pela leitura do código).",
      "O grafo é recompilado a cada requisição (<code>createProductionGraph</code> dentro de <code>runProductionTurn</code>). A rota <code>reflect</code> é sempre <code>withReflection(react)</code>.",
      "O <code>preview.md</code> (o mesmo arquivo nas pastas 05 a 09) desenha a rota como <code>plan-exec</code> e só três rotas; o código usa <code>planExecute</code> e quatro. O executor em ondas e o <code>graph:draw</code> ficaram como exercício, não implementados."
     ]
    }
   ]
  },
  {
   "id": "D4-13",
   "bloco": "d04-b4",
   "mod": "Unidade 7 · Aula 1",
   "emoji": "🔍",
   "read": "8 min",
   "title": "Observabilidade e limites de autonomia: trace persistido, logs, métricas e aprovação humana",
   "short": "Reconstruir qualquer execução pelo requestId e classificar o que o agente pode fazer sozinho.",
   "oneliner": "Observabilidade em agente é reconstruir <b>rota, modelo, tools, observações e justificativas</b> de cada requisição, com três sinais (<b>trace persistido, logs JSON, métricas</b>) ligados por um <b>requestId</b>, mais uma <b>matriz de autonomia</b>: o que o agente faz sozinho, o que registra, o que exige aprovação e o que é proibido.",
   "vovo": [
    "É a caixa-preta do avião mais o painel de voo: a caixa-preta (trace) conta a viagem inteira depois do fato; o diário de bordo (logs) registra eventos soltos; os instrumentos (métricas) mostram tendência. E o manual de bordo diz o que o piloto automático pode fazer sozinho e o que sempre pede o capitão."
   ],
   "oque": [
    "<b>Por que é diferente em agentes:</b> duas execuções parecidas podem seguir trajetórias diferentes. Importam rota, modelo, tools, observações e justificativas que influenciaram o grafo, não o raciocínio interno irrestrito do modelo.",
    "<b>Três sinais:</b> trace persistido (sequência de eventos por requisição), logs estruturados em JSON (só metadados, sem vazar prompt, segredo ou conteúdo) e métricas agregadas (requisições, erros, tokens, latência por rota e modelo). Métrica mostra tendência, log mostra evento, trace mostra a trajetória.",
    "<b>Matriz de autonomia:</b> quatro faixas. (1) decide sozinho (baixo risco, reversível: consultar alertas). (2) decide e executa, mas registra de forma auditável (abrir ou resolver incidente). (3) pede aprovação (ações destrutivas, silenciar recursos, apagar histórico, gasto acima de um teto). (4) proibido, mesmo com aprovação (apagar a própria trilha de auditoria, vazar dados de usuário).",
    "<b>requestId como eixo:</b> identificador da requisição devolvido ao cliente e usado para ligar resposta, registro persistido, eventos de trace, logs e métricas.",
    "<b>Auditoria e métricas na aula:</b> o registro da requisição guarda usuário, rota, modelo, tokens, latência e status; os eventos guardam sequência, nó, tipo e payload. Uma rota consulta a execução pelo requestId, com eventos ordenados. Uma rota de estatísticas das últimas 24 horas dá total, erros, tokens, custo estimado e p50 e p95 por rota e modelo.",
    "<b>Resultado visto na aula:</b> “resolva o incidente mais antigo” foi para Plan-and-Execute, e o trace mostrou a justificativa do roteador, o plano (listar, identificar o mais antigo, resolver), o modelo, o orçamento de contexto e cerca de um minuto e meio de latência.",
    "<b>Da auditoria à operação:</b> a aula cita Grafana e afins como extensão e relaciona p95 alto ou rota cara frequente a decisões de ajuste do roteador, do fallback ou da configuração principal."
   ],
   "como": [
    "A spec pede <code>requests</code> e <code>trace_events</code> no SQLite, um logger dedicado com uma linha JSON por evento e uma rota de consulta; a referência mostra o nó de resposta como ponto de persistência: salvar o requestId, usuário, rota, modelo, tokens, latência e status; percorrer os eventos e salvá-los na ordem; emitir um log estruturado.",
    "O ‘human-in-the-loop’ é um extra do repositório: com <code>awaitHumanApproval: true</code> o chat não executa, guarda a requisição e responde 202; a decisão do plantonista executa ou descarta."
   ],
   "aplica": [
    "Auditar por que um agente tomou uma decisão horas depois, sem reproduzir.",
    "Medir custo e latência por rota e modelo, e ajustar roteador e fallback com dados.",
    "Pôr aprovação humana antes de ações de maior impacto."
   ],
   "pros": [
    "Investigação por requestId sem abrir código nem usar debugger.",
    "Logs que nunca vazam conteúdo (a regra virou teste).",
    "p50 e p95 por rota e modelo apontam onde otimizar."
   ],
   "contras": [
    "Persistir trace aumenta armazenamento e exige política de retenção (não implementada).",
    "O custo é estimado, não faturado."
   ],
   "traps": [
    "Logar prompt, resposta ou segredo “para depurar”.",
    "Ter eventos corretos sem um identificador que os una.",
    "Tratar aprovação como se fosse a matriz de autonomia inteira."
   ],
   "cola": [
    [
     "requestId",
     "Chave de correlação de resposta, registro, trace e logs"
    ],
    [
     "Trace persistido",
     "Eventos da execução gravados em ordem (tabelas requests e trace_events)"
    ],
    [
     "Log estruturado",
     "Uma linha JSON por evento, só com metadados escalares"
    ],
    [
     "p50 / p95",
     "Latência típica e latência da cauda lenta"
    ],
    [
     "Matriz de autonomia",
     "Quatro faixas: sozinho, com registro, com aprovação, proibido"
    ],
    [
     "HIL",
     "Human-in-the-loop: aprovação humana antes de executar"
    ]
   ],
   "links": [
    [
     "Snapshot da Unidade 7 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/07-observabilidade-e-limites-de-autonomia"
    ],
    [
     "UNIDADE.md da Unidade 7",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/07-observabilidade-e-limites-de-autonomia/UNIDADE.md"
    ]
   ],
   "codigo": [
    {
     "proj": "07-observabilidade-e-limites-de-autonomia",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/07-observabilidade-e-limites-de-autonomia",
     "resumo": "Spec 015 (trace persistido, logs e stats) e a aprovação humana por flag. O snapshot 07 é a mesma árvore do 06; citei também arquivos do snapshot final.",
     "fluxo": [
      "<code>src/store/sqlite-request-store.ts</code>: tabelas <code>requests</code> (<code>status</code> success ou error, <code>metrics_json</code>, rota, modelo) e <code>trace_events</code> (<code>seq</code>, <code>type</code>, <code>node</code>, <code>content</code>, <code>payload_json</code>, único por requisição e sequência); <code>save</code> em transação (BEGIN/COMMIT/ROLLBACK), <code>getById</code> e <code>stats(sinceMs)</code>.",
      "O nó <code>resposta</code> do grafo chama <code>persistTurnAudit</code> (falha de persistência vira log <code>request_persist_failed</code>, sem derrubar o turno) e emite o log <code>chat_request_end</code>.",
      "<code>src/http/server.ts</code>: cabeçalho <code>X-Request-Id</code>; <code>GET /requests/:id</code> (UUID; 404 <code>request_not_found</code>) devolve o registro e o trace ordenado; <code>GET /stats?since=24h</code> aceita <code>ms|s|m|h|d</code> e devolve total, erros, tokens, <code>costUsd</code>, latência p50 e p95, <code>byRoute</code> e <code>byModel</code>.",
      "<code>src/obs/logger.ts</code>: JSON por linha com <code>ts</code>, <code>level</code> e <code>event</code>; remove as chaves proibidas (<code>message</code>, <code>answer</code>, <code>trace</code>, <code>content</code>, <code>payload</code>, <code>toolArgs</code>, <code>body</code>, <code>prompt</code>) e aceita só valores escalares.",
      "<code>src/obs/request-stats.ts</code>: <code>percentile</code> (nearest-rank), <code>parseSinceDuration</code> e <code>estimatePromptCostUsd</code> (US$ 0,15 por milhão de tokens de prompt; modelos com <code>:free</code> custam 0).",
      "Aprovação humana: <code>MemoryApprovalStore</code> (<code>save</code>, <code>get</code>, <code>take</code>); com <code>awaitHumanApproval: true</code> o <code>/chat</code> responde 202 com <code>pending.approvalId</code>; <code>POST /approvals/:approvalId</code> recebe <code>{decision: \"approve\" | \"deny\", userId}</code>; aprovar executa a requisição guardada com um novo <code>requestId</code>; negar devolve “Ação cancelada pelo plantonista.” sem chamar o modelo."
     ],
     "rodar": [
      "<code>npm run dev</code>; faça um <code>POST /chat</code>, copie o <code>requestId</code> e rode <code>curl localhost:3000/requests/&lt;requestId&gt;</code> e <code>curl \"localhost:3000/stats?since=24h\"</code>.",
      "<code>curl -X POST localhost:3000/chat -d '{\"message\":\"resolva o incidente mais antigo\",\"userId\":\"u1\",\"awaitHumanApproval\":true}'</code> e depois <code>curl -X POST localhost:3000/approvals/&lt;approvalId&gt; -d '{\"decision\":\"approve\",\"userId\":\"u1\"}'</code>.",
      "<code>npm test</code>."
     ],
     "armadilhas": [
      "O UNIDADE.md da U7 sugere <code>-d '{\"approve\":true}'</code> para aprovar; o schema real exige <code>{decision, userId}</code> e a chamada retornaria 400.",
      "Bug verificado: <code>TRACE_PAYLOAD_KEYS</code> não inclui <code>to</code>. Rodei <code>SqliteRequestStore</code> em memória com um evento <code>handoff</code> e <code>to: \"analista\"</code>: o <code>getById</code> devolveu <code>{\"type\":\"handoff\",\"node\":\"supervisor\",\"content\":\"brief\"}</code>, sem o destino. O handoff do modo equipe perde o <code>to</code> na auditoria (só aparece na resposta ao vivo).",
      "O status <code>error</code> existe no schema, mas nada o grava: só o nó <code>resposta</code> salva (sempre <code>success</code> e 200) e o handler de erros não persiste. Logo <code>/stats.errors</code> tende a zero e 504, 503 e 400 não deixam registro em <code>requests</code>.",
      "A apostila diz que o <code>requestId</code> pode vir no corpo ou em header; o código sempre gera <code>randomUUID()</code> e o schema do chat não tem <code>requestId</code>.",
      "As aprovações ficam num <code>Map</code> em memória (somem no restart, sem expiração). Divergência entre o <code>userId</code> da aprovação e o da requisição só gera o log <code>approval_user_mismatch</code>; não bloqueia. A aprovação cobre a requisição inteira, não uma tool específica.",
      "Divergências com o UNIDADE.md: ele diz que o <code>/stats</code> não calcula dólares, mas <code>estimatePromptCostUsd</code> existe desde o snapshot 06 (só tokens de prompt, taxa única); o contrato de autonomia em quatro faixas (AUTONOMIA.md), o teto de custo com 429 e a tool <code>silence_all_alerts</code> com <code>interrupt()</code> do LangGraph não foram implementados."
     ]
    }
   ]
  },
  {
   "id": "D4-14",
   "bloco": "d04-b5",
   "mod": "Unidade 8 · Aulas 1 e 2",
   "emoji": "🖥️",
   "read": "8 min",
   "title": "War Room: interface web sobre a mesma API e publicação no GitHub Pages",
   "short": "Um front React que é só mais um cliente da API, publicado como estático e ligado ao backend local por túnel.",
   "oneliner": "A <b>War Room</b> (React + Vite) é só mais uma <b>porta de entrada</b> para o mesmo OpsPilot: chat no <code>/chat</code>, trace lateral e cartões de aprovação. Vai para o <b>GitHub Pages</b> por <b>GitHub Actions</b>; como o Pages é estático, o backend segue local, exposto por <b>Cloudflare Tunnel</b>.",
   "vovo": [
    "É a vitrine da loja: mostra o que está no estoque e deixa o cliente pedir, mas o estoque e a cozinha continuam nos fundos. Se a vitrine fica aberta mas a porta dos fundos está trancada (o túnel caiu), ela abre mas nada é entregue."
   ],
   "oque": [
    "<b>Instructions de design para o agente:</b> arquivo de instruções aplicado aos arquivos de <code>web/</code>, genérico de propósito: hierarquia visual, espaçamento, estados vazios e de erro, dark mode e acessibilidade (e um equivalente para o Cursor).",
    "<b>Spec da War Room:</b> chat conectado ao <code>/chat</code>, área lateral para o trace (ação, observação, resposta), cartões para ações que pedem aprovação e uma engrenagem para configurar a URL base da API. O front não repete o raciocínio do agente: só transforma contratos que já existem em experiência visual.",
    "<b>Primeira versão:</b> um MVP, com hierarquia e responsividade a refinar; loading e Markdown ficam como melhorias. A validação abre um incidente pela interface e pede um resumo do plantão.",
    "<b>Memória pela UI:</b> a preferência “críticos primeiro” é informada na interface, vira memória semântica e a resposta passa a ordenar assim. A aula explica por que não ordena no backend: regra global (“críticos sempre primeiro para todos”) pertence ao backend; preferência de um usuário pertence à memória. Aqui ordenar pela memória é uma escolha didática.",
    "<b>Publicação:</b> habilitar o Pages (Source = GitHub Actions); workflow disparado por push na branch principal, com jobs de build (Node 22, <code>npm ci</code> e build na pasta <code>web</code>) e deploy; permissões de leitura de conteúdo, escrita no Pages e emissão de token de identidade. O <b>base path do Vite</b> precisa do prefixo do repositório, senão o HTML abre e os assets 404. Falhas do build voltam ao agente com o log do erro.",
    "<b>Backend por túnel:</b> o Pages não roda Node, SQLite nem LangGraph. Para o teste usa-se <code>cloudflared</code> que expõe o servidor local numa URL temporária; a War Room é apontada para ela pela engrenagem. A validação usa uma operação curta (listar incidentes) para reduzir variáveis.",
    "<b>Próximos passos citados:</b> hospedar o backend, criar CI de typecheck e testes do backend, domínio próprio e variáveis por ambiente."
   ],
   "como": [
    "Specify, plan, tasks e implement sem referência extensa: a camada web é convencional e as design instructions orientam. Depois do implement, sobe o backend e o servidor do front.",
    "Para o Pages, uma segunda spec (017) descreve o workflow e a documentação. A Aula 1 para antes de validar a publicação; a Aula 2 completa: ativar o Pages, corrigir o build com o agente, abrir a URL pública e conectar o túnel.",
    "O caminho completo da requisição na demo: navegador, GitHub Pages, URL do túnel, Cloudflare Tunnel e servidor Node local."
   ],
   "aplica": [
    "Dar interface a um agente sem criar uma segunda implementação da lógica.",
    "Publicar o front estático de graça e manter o backend onde ele já roda."
   ],
   "pros": [
    "Uma lógica de negócio, várias portas (terminal, MCP, web).",
    "Trace e aprovação visíveis ao plantonista.",
    "Deploy automático do front a cada push."
   ],
   "contras": [
    "O backend precisa de hospedagem real para a War Room publicada ser útil.",
    "O túnel temporário muda de URL e expõe o servidor local."
   ],
   "traps": [
    "Esquecer o <code>base</code> do Vite no Pages.",
    "Achar que o Pages hospedou a aplicação inteira.",
    "Expor um backend sem autenticação por túnel público."
   ],
   "cola": [
    [
     "War Room",
     "Interface web do OpsPilot: chat, trace e aprovação"
    ],
    [
     "Vite base",
     "Prefixo de caminho dos assets quando o site é servido sob /repositorio/"
    ],
    [
     "GitHub Pages / Actions",
     "Hospedagem estática e pipeline que a publica"
    ],
    [
     "Cloudflare Tunnel",
     "cloudflared expõe o servidor local numa URL pública temporária"
    ],
    [
     "Design instructions",
     "Instruction com escopo (web/**) para o agente de código"
    ]
   ],
   "links": [
    [
     "Snapshot da Unidade 8 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/08-projeto-pratico-opspilot-publicado"
    ],
    [
     "UNIDADE.md da Unidade 8",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/08-projeto-pratico-opspilot-publicado/UNIDADE.md"
    ]
   ],
   "codigo": [
    {
     "proj": "08-projeto-pratico-opspilot-publicado",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/08-projeto-pratico-opspilot-publicado",
     "resumo": "Specs 016 (War Room) e 017 (deploy no Pages): a pasta web/ em Vite, React 19 e TypeScript, CORS configurável na API e o workflow de deploy. Do 08 para o 09 a web só ganha o evento <code>handoff</code> (campo <code>to</code>, exibido como “para:” no painel de raciocínio).",
     "fluxo": [
      "<code>web/src/api/client.ts</code>: <code>postChat</code> (userId padrão <code>war-room</code>, <code>awaitHumanApproval</code>, resposta 200 ou 202) e <code>postApproval</code> (<code>{decision, userId}</code>); a resposta é validada com Zod em <code>web/src/api/types.ts</code>, que espelha o trace e o contrato do chat.",
      "<code>web/src/api/config.ts</code>: a URL da API fica em <code>localStorage</code> (<code>opspilot.warRoom.apiBaseUrl</code>), default <code>http://localhost:3000</code>, só aceita http ou https.",
      "<code>web/src/App.tsx</code>: estado dos turnos e do <code>conversationId</code>; checkbox de aprovação humana; <code>ApprovalCard</code> quando a resposta é 202 (aprovar ou negar); <code>TraceDrawer</code> (“Raciocínio”) lista tipo, nó, tool e “para:” do handoff; repetição da última mensagem falha e abort da requisição.",
      "<code>web/vite.config.ts</code> com <code>base: \"/opspilot/\"</code>; <code>.github/workflows/deploy.yml</code>: <code>actions/checkout</code>, <code>setup-node</code> (22), <code>npm ci</code> e <code>npm run build -- --base=/ops-pilot/</code> em <code>web/</code>, <code>upload-pages-artifact</code> e <code>deploy-pages</code>; permissões <code>contents: read</code>, <code>pages: write</code>, <code>id-token: write</code>.",
      "<code>src/http/cors.ts</code>: <code>OPSPILOT_CORS_ORIGINS</code> (lista separada por vírgula); por padrão libera qualquer origem refletindo o <code>Origin</code>; <code>OPTIONS</code> responde 204; cabeçalhos <code>GET,POST,OPTIONS</code> e <code>Content-Type, X-Request-Id</code>.",
      "<code>.github/instructions/design.instructions.md</code> (<code>applyTo: \"web/**\"</code>) e <code>.cursor/rules/design.mdc</code>, com o mesmo conteúdo: hierarquia, escala de 4 px, estados vazio e erro, dark mode por tokens, acessibilidade."
     ],
     "rodar": [
      "API: <code>npm run dev</code> (porta 3000). Front: <code>cd web && npm ci && npm run dev</code> e abra <code>http://localhost:5173/opspilot/</code>.",
      "Build igual ao CI: <code>npm --prefix web run build -- --base=/ops-pilot/</code>.",
      "Testes do front: <code>npm --prefix web test</code> (na minha execução, 13 testes em 8 arquivos passaram) e <code>typecheck</code> sem erros."
     ],
     "armadilhas": [
      "O UNIDADE.md da U8 cita a variável <code>CORS_ORIGIN</code>; a variável real é <code>OPSPILOT_CORS_ORIGINS</code>, e o padrão é liberar todas as origens.",
      "O workflow está numa subpasta do repositório do curso; o GitHub só executa <code>.github/workflows</code> da raiz de um repositório, então aqui ele não roda. Ele serve ao repositório original do autor (<code>ThiagoBussola/ops-pilot</code>, citado no README e no YAML), e o gatilho é a branch <code>master</code>.",
      "Duas bases: <code>/opspilot/</code> no Vite local e <code>/ops-pilot/</code> (com hífen) no CI; é fácil errar uma das duas.",
      "O <code>userId</code> é fixo (<code>war-room</code>): toda a interface compartilha a mesma memória semântica.",
      "A apostila deixa loading e Markdown como melhorias futuras; no snapshot final o loading virou o botão “Enviando…” com Cancelar (abort da requisição), e as respostas seguem sem Markdown.",
      "Os README das pastas 06 e 07 citam o workflow <code>pages.yml</code>, que não existe, e o script <code>web:dev</code>, que está no <code>package.json</code> mas aponta para uma <code>web/</code> ausente nesses snapshots; o workflow real das pastas 08 e 09 é <code>deploy.yml</code>.",
      "A demo expõe o backend por túnel público com CORS liberado e sem autenticação: quem tiver a URL consegue chamar o <code>/chat</code> (inferência da leitura do código)."
     ]
    }
   ]
  },
  {
   "id": "D4-15",
   "bloco": "d04-b5",
   "mod": "Unidade 9 · Aula 1",
   "emoji": "👥",
   "read": "8 min",
   "title": "Multi-agent systems: supervisor, papéis, handoffs e blackboard",
   "short": "Um time de papéis restritos coordenado por um supervisor, sobre o mesmo grafo, memória e guardrails.",
   "oneliner": "Para um pedido que mistura <b>análise, planejamento e execução</b>, o OpsPilot ganha um <b>time</b>: <b>supervisor</b> (coordena, não executa), <b>analista</b> (só lê), <b>planejador</b> (sem tools) e <b>executor</b> (age em incidentes). O <b>handoff</b> fica no trace e o <b>blackboard</b> (estado do grafo) é a memória compartilhada.",
   "vovo": [
    "É a equipe do plantão: um coordenador distribui as tarefas, um investigador só olha e relata, um planejador só escreve o plano e um operador só executa. Ninguém faz o trabalho do outro, e o quadro branco na parede registra o que cada um descobriu e decidiu."
   ],
   "oque": [
    "<b>Por que dividir:</b> cada agente fica com função específica, capacidades compatíveis e responsabilidade clara. O analista não pensa em executar, o planejador não precisa consultar todas as ferramentas e o executor recebe um plano pronto.",
    "<b>Supervisor:</b> não executa ações operacionais; lê o estado, decide quem age e quando acabou. Sua saída é estruturada: próximo papel e um <i>brief</i> (a instrução de trabalho ou, no fim, o resumo final).",
    "<b>Analista:</b> levanta fatos (alertas disparando, incidentes, runbooks, status de provedores) em tópicos telegráficos; não propõe soluções, não abre nem resolve incidentes; deve ser cético e não afirmar o que não está nas observações.",
    "<b>Planejador</b> transforma os fatos do blackboard em plano de mitigação (sequência, dependências, próximos passos); <b>executor</b> aplica o plano com as tools de incidente, passando pelos mesmos contratos e guardrails.",
    "<b>Handoff</b> é a transição explícita de responsabilidade e fica no trace (de onde veio, para quem vai, qual brief). Isso permite reconstruir como o time se organizou.",
    "<b>Blackboard:</b> quadro compartilhado, representado pelo estado do grafo; cada agente escreve e os seguintes leem. <b>Consenso:</b> dois pareceres independentes e um juiz que arbitra com critérios (a aula descreve; não foi implementado). <b>Agent-to-Agent</b> (Google) aparece como protocolo para comunicação entre agentes, deixado como exercício.",
    "<b>Multiagente não é reescrever o projeto:</b> o supervisor é mais um nó do grafo, o blackboard reusa o estado, os trabalhadores usam as tools existentes e a memória, o trace e a observabilidade seguem valendo. O roteador ganha a rota <code>team</code>. Teto de 8 transições.",
    "<b>Custo e qualidade:</b> na demo (latência alta no checkout e erro 500 no payments, com pedido de plano e abertura de incidentes) o time fez cerca de dez chamadas ao LLM. Consulta pontual continua melhor no ReAct; o time se justifica quando a qualidade e a organização compram o custo extra. Ler também “Building Effective Agents” (Anthropic) como contraprova e Russell e Norvig, cap. 2, como base conceitual de agente."
   ],
   "como": [
    "Spec do modo equipe: área própria (supervisor, blackboard e três papéis), saída do supervisor com <code>next</code> e <code>brief</code>, analista somente leitura, planejador sem tools de execução, executor sobre incidentes, evento de handoff no trace, rota <code>team</code> e teto de oito transições.",
    "Referências antes do implement: o schema do supervisor (próximo: analista, planejador, executor ou done) e o prompt do analista (função única, o que pode listar, o que é proibido, formato telegráfico). O supervisor se parece com o roteador, mas decide várias vezes na mesma execução.",
    "Na demo, o blackboard mostra a investigação do analista com alertas por severidade (críticos primeiro, como o OpsPilot já aprendeu) e a ausência de fatos explícita em vez de inventada; o trace mostra o roteamento, os handoffs, as actions e as observations."
   ],
   "aplica": [
    "Pedidos complexos que combinam investigação, plano e ação.",
    "Contextos em que separar permissões por papel aumenta a segurança (leitura, planejamento, escrita)."
   ],
   "pros": [
    "Especialização reduz objetivos concorrentes num prompt.",
    "Cada papel só recebe as ferramentas do seu papel.",
    "Handoffs registrados deixam a colaboração auditável."
   ],
   "contras": [
    "Mais chamadas, mais latência e mais custo (cerca de dez chamadas na demo).",
    "Mais complexidade: sem trace e auditoria, a depuração piora."
   ],
   "traps": [
    "Usar o time para perguntas simples.",
    "Dar ao analista ou ao planejador ferramentas de escrita.",
    "Deixar o supervisor delegar sem teto."
   ],
   "cola": [
    [
     "Supervisor",
     "Coordena o time e decide o próximo papel; não executa"
    ],
    [
     "Blackboard",
     "Quadro compartilhado de contribuições, no estado do grafo"
    ],
    [
     "Handoff",
     "Passagem de trabalho entre papéis, registrada no trace"
    ],
    [
     "Brief",
     "Instrução ao próximo papel, ou resumo final quando done"
    ],
    [
     "Teto de 8",
     "Limite de delegações por turno (MAX_HANDOFFS)"
    ],
    [
     "Consenso / juiz",
     "Pareceres independentes arbitrados por um terceiro papel"
    ]
   ],
   "links": [
    [
     "Snapshot da Unidade 9 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/09-multi-agent-systems"
    ],
    [
     "UNIDADE.md da Unidade 9",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/09-multi-agent-systems/UNIDADE.md"
    ],
    [
     "Generative Agents (arXiv:2304.03442)",
     "https://arxiv.org/abs/2304.03442"
    ]
   ],
   "codigo": [
    {
     "proj": "09-multi-agent-systems",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/09-multi-agent-systems",
     "resumo": "Spec 018: o modo equipe em src/team, plugado como rota do roteador. O snapshot é o estado de trabalho mais recente do autor (o modo equipe não estava commitado no repositório original). Typecheck e os 216 testes do snapshot passaram na minha execução (Node 22.16).",
     "fluxo": [
      "<code>src/team/supervisor.ts</code> e <code>supervisor-prompt.ts</code>: <code>supervisorDecisionSchema { next: analista | planejador | executor | done, brief }</code> e prompt com a tabela de papéis, a sequência típica e o teto de 8 delegações.",
      "<code>src/team/blackboard.ts</code>: <code>BlackboardEntry { role, kind: facts | plan | execution | error, brief, content }</code> e <code>renderBlackboard</code>.",
      "<code>src/team/roles.ts</code>: <code>createAnalistaRunner</code> (agente ReAct com tools de leitura), <code>createPlanejadorRunner</code> (sem tools, uma chamada ao modelo sobre o blackboard) e <code>createExecutorRunner</code> (tools de incidente), cada um com prompt de função única; <code>DEFAULT_MAX_ITERATIONS = 6</code>.",
      "<code>src/team/team-graph.ts</code>: <code>TeamState</code> (blackboard com reducer concat, <code>handoffCount</code>, <code>brief</code>, <code>next</code>, <code>answer</code>, trace, <code>llmCalls</code>); nós supervisor, analista, planejador, executor e done; <code>MAX_HANDOFFS = 8</code> (ao atingir, encerra com “teto de handoffs atingido”); um evento <code>handoff</code> por decisão com <code>to</code> e o brief; decisão inválida vira <code>done</code> (“decisão inválida do supervisor”); erro de papel entra no blackboard como <code>error</code> e o controle volta ao supervisor; <code>recursionLimit</code> = 34.",
      "<code>src/team/team-strategy.ts</code>: <code>TeamStrategy</code> implementa <code>ReasoningStrategy</code>, compõe o histórico em texto e soma <code>llmCalls</code> (1 por decisão do supervisor mais os papéis).",
      "<code>src/index.ts</code>: partição estrutural de ferramentas: analista (<code>list_alerts</code>, <code>list_incidents</code>, <code>consultar_runbook</code>, <code>check_provider_status</code>), executor (<code>open_incident</code>, <code>resolve_incident</code>, <code>list_incidents</code>), planejador nenhuma; <code>src/graph/router.ts</code> ganha a rota <code>team</code> e <code>/chat</code> aceita <code>strategy: \"team\"</code>.",
      "Testes: <code>team-graph.test.ts</code> (ordem do ciclo, decisão malformada, falha de papel, teto de exatamente 8 delegações), <code>roles.test.ts</code> (ferramentas de cada papel) e <code>supervisor.test.ts</code>."
     ],
     "rodar": [
      "<code>npm run dev</code> e um <code>POST /chat</code> como “latência alta no checkout e erro 500 no payments: levante o que está disparando, monte o plano e abra os incidentes” (o roteador deve escolher <code>team</code>; ou force com <code>\"strategy\":\"team\"</code>).",
      "Na War Room, clique em “Ver raciocínio” para ver os handoffs.",
      "<code>npm test</code> e <code>npm run typecheck</code> (216 testes na raiz; <code>npm --prefix web test</code> para o front)."
     ],
     "armadilhas": [
      "O consenso (dois pareceres e um juiz) não foi implementado (UNIDADE.md).",
      "O evento <code>handoff</code> perde o campo <code>to</code> ao ser persistido (<a href=\"#D4-13\">tópico 13</a>): na auditoria só sobra o brief.",
      "O executor abre e resolve incidentes sem aprovação por ação; a única aprovação humana é a flag <code>awaitHumanApproval</code> na requisição inteira.",
      "Se um papel lança exceção, as chamadas que ele já fez não entram em <code>llmCalls</code> (o <code>catch</code> não soma).",
      "“Não repita um papel sem motivo” está só no prompt do supervisor; o freio determinístico é o teto de 8 delegações.",
      "O snapshot é o estado não commitado do autor e o comparativo de custo (<code>team</code> contra <code>react</code> no <code>/stats</code>) depende de um cálculo de custo simplificado (<a href=\"#D4-13\">tópico 13</a>)."
     ]
    }
   ]
  }
 ]
});
