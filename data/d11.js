STUDY.push({
 "disc": {
  "num": "11",
  "nome": "Disciplina 11",
  "titulo": "Projeto Integrador (Capstone Project)",
  "autor": "Álvaro Camillo Neto",
  "emoji": "🚀",
  "resumo": "Constrói do primeiro commit à produção o AI Researcher, um chatbot de bolsa com RAG corretivo: banco vetorial (pgvector), grafo LangGraph com retrieve, grade e fallback para a web, guardrail por código, SSE, testes sem rede, resiliência, MCP, frontend Angular, Langfuse, métricas e deploy no GCP com GitHub Actions."
 },
 "materiais": [
  [
   "Repositório oficial: Capstone Project AI Researcher",
   "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
  ],
  [
   "Ponto de partida do estudante: AI Researcher Seed",
   "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
  ],
  [
   "Indicação 1: Huyen, AI Engineering (O'Reilly, 2025)",
   "https://www.amazon.com.br/AI-Engineering-Building-Applications-Foundation/dp/1098166302"
  ],
  [
   "Indicação 2: Auffarth e Kuligin, Generative AI with LangChain, 2ª ed. (Packt, 2025)",
   "https://www.amazon.com/Generative-LangChain-production-ready-applications-LangGraph/dp/1837022011"
  ],
  [
   "Indicação 3: Kleppmann, Designing Data-Intensive Applications (O'Reilly, 2017)",
   "https://www.amazon.com.br/Designing-Data-Intensive-Applications-Martin-Kleppmann/dp/1449373321"
  ],
  [
   "Indicação 4: Beyer et al., Site Reliability Engineering (O'Reilly, 2016)",
   "https://www.amazon.com.br/Site-Reliability-Engineering-Betsy-Beyer/dp/149192912X"
  ]
 ],
 "blocos": [
  {
   "id": "d11-b0",
   "label": "Unidade 1 · Ideação, setup e deploy inicial"
  },
  {
   "id": "d11-b1",
   "label": "Unidade 2 · Orquestração cognitiva e APIs"
  },
  {
   "id": "d11-b2",
   "label": "Unidade 3 · Qualidade, resiliência e MCP"
  },
  {
   "id": "d11-b3",
   "label": "Unidade 4 · Frontend"
  },
  {
   "id": "d11-b4",
   "label": "Unidade 5 · Observabilidade e produção"
  }
 ],
 "topics": [
  {
   "id": "D11-00",
   "bloco": "d11-b0",
   "mod": "Unidade 1 · Aula 1",
   "emoji": "🧭",
   "read": "7 min",
   "title": "Bem-vindo ao Capstone: o AI Researcher e a regra \"informa, nunca recomenda\"",
   "short": "O projeto que a disciplina constrói do primeiro commit à produção: um chatbot de bolsa que busca na base, julga o contexto, vai à web se faltar e nunca recomenda compra ou venda.",
   "oneliner": "O <b>AI Researcher</b> responde perguntas sobre empresas da B3 com <b>RAG primeiro</b>, <b>web como fallback</b> quando ele mesmo julga o contexto insuficiente. Recomendar compra ou venda é atividade regulada pela CVM, então a restrição vive em um <b>guardrail no código</b>, não só no system prompt.",
   "vovo": [
    "Pense num atendente de biblioteca que primeiro procura a resposta na estante da casa. Se o livro não resolve, ele sai para consultar a internet. E tem uma regra de ofício: pode explicar o que os livros dizem sobre uma empresa, mas jamais pode dizer \"compre\" ou \"venda\", porque isso exige registro profissional.",
    "Essa regra não fica só num bilhete colado na mesa (o prompt). Ela é uma trava na porta de saída (o código): mesmo que o atendente se distraia e escreva \"compre\", o texto é trocado antes de chegar ao cliente."
   ],
   "oque": [
    "A disciplina aplica o que foi visto nas outras matérias em <b>um único projeto</b>, do primeiro commit à entrega na nuvem: código da aplicação, observabilidade, FinOps (inclusive para sistemas que consomem LLMs) e deploy automatizado por GitHub Actions.",
    "O <b>AI Researcher</b> é um chatbot especializado em investimentos de bolsa. Foi escolhido porque exercita as duas frentes ao mesmo tempo: agentes que <i>desenvolvem</i> o código e um sistema que, ele próprio, <i>consome</i> LLMs.",
    "Regra de negócio em três movimentos: (1) busca na base vetorial (RAG); (2) se o contexto basta, responde citando a base; (3) se não basta, e é o próprio sistema que faz esse julgamento, busca na internet.",
    "A interface tem um <b>pipeline de raciocínio</b>: mostra cada etapa percorrida para responder, inclusive os erros, o que ajuda a entender o que acontece por dentro.",
    "Três comportamentos de exemplo: \"Qual é a receita líquida da Vale no último semestre?\" é respondida só pela base; \"Qual foi o último fato relevante da Vale?\" avisa \"Contexto local insuficiente neste turno\" e a etapa Search busca na web; \"Eu devo comprar a Vale no preço atual?\" faz a busca, mas o guardrail bloqueia a recomendação.",
    "O chat exibe aviso permanente: \"Este assistente apresenta informações públicas, não recomendação de investimento\". Reflete regra do domínio: no Brasil, recomendar exige certificações e registro na CVM (e junto à Bolsa).",
    "O <b>guardrail está no código</b>, além do system prompt (detalhado na Aula 13). Prompt é instrução, não garantia.",
    "A ferramenta de desenvolvimento é o Claude (Anthropic), mas a aula frisa que o trabalho serve com Antigravity, Codex ou Kimi: o que permanece é o fundamento, não a ferramenta.",
    "Observabilidade aparece o tempo todo: Grafana para requisições e latência, e uma segunda ferramenta de observabilidade de LLM apresentada quando o projeto chega à produção."
   ],
   "como": [
    "Fluxo do agente (visão da aula): pergunta, busca na base vetorial, julgamento de suficiência, resposta com citação ou complemento pela web, e só então a resposta final.",
    "No código o fluxo é um grafo LangGraph com os nós <code>retrieve</code>, <code>grade</code>, <code>webSearch</code> e <code>answer</code>; <code>MAX_ITERATIONS = 2</code> impede o loop infinito (README do repo). Isso é matéria das unidades seguintes.",
    "Caminho do guardrail no código: o LLM gera o texto, <code>montarResposta</code> chama <code>contemLinguagemRecomendatoria</code> e, se casar com algum dos padrões, troca o texto inteiro por <code>RESPOSTA_GUARDRAIL</code>.",
    "Quando o contexto não foi suficiente, <code>montarResposta</code> acrescenta o aviso \"O contexto disponível pode estar incompleto para responder com certeza\", igual ao que a aula mostra no terceiro exemplo.",
    "Toda resposta termina com um bloco <code>Fontes:</code> com ticker, período e data-base (corpus) ou título (web), deduplicado por <code>sourceUrl</code>.",
    "A UI mantém o aviso regulatório fixo e o painel do grafo mostra \"Contexto local insuficiente neste turno\" quando a web entrou (strings conferidas em <code>chat.html</code> e <code>graph-panel.html</code>).",
    "Como estudar: tente reproduzir o passo a passo antes de abrir a implementação completa; a prática da aula é explicar os pontos centrais com suas palavras e conferir o que ficou de fora."
   ],
   "aplica": [
    "Qualquer assistente em domínio regulado (saúde, jurídico, financeiro): a regra de conformidade precisa de camada determinística, não só de instrução ao modelo.",
    "Produtos RAG com fallback: separar \"a base resolve\" de \"preciso de fonte externa\" e deixar essa decisão visível para o usuário.",
    "Projetos de portfólio e capstones: escolher um domínio que exercite desenvolvimento assistido por agente e consumo de LLM ao mesmo tempo.",
    "Interfaces de IA que expõem o raciocínio (etapas, erros) para ganhar confiança e facilitar depuração."
   ],
   "pros": [
    "Base primeiro é mais rápido e mais barato em tokens do que ir sempre à internet.",
    "Guardrail no código é testável e determinístico; o prompt sozinho pode ser ignorado pelo modelo.",
    "Pipeline de raciocínio visível torna erros e fallbacks auditáveis pelo usuário e pelo time.",
    "Projeto único de ponta a ponta mostra o ciclo completo (código, observabilidade, FinOps, deploy)."
   ],
   "contras": [
    "Guardrail por padrões (regex) cobre formas conhecidas de recomendação e pode deixar passar paráfrases ou bloquear frases legítimas.",
    "O julgamento de suficiência é feito por um LLM: erra para os dois lados (web desnecessária ou resposta com contexto fraco).",
    "Fallback para a web traz fontes de qualidade variável e custo extra de busca.",
    "O aviso permanente reduz o risco, mas não substitui revisão jurídica do produto."
   ],
   "traps": [
    "Confiar só no system prompt para uma restrição regulatória: instrução não é garantia.",
    "Achar que o projeto depende do Claude: a aula é explícita de que o fundamento vale para qualquer ferramenta.",
    "Tratar \"informar\" e \"recomendar\" como sutileza de estilo: é regra do domínio (CVM), não escolha de tom.",
    "Remover o teste de guardrail para \"destravar\" o CI: o CLAUDE.md do repo diz que, se ele quebrar, o problema é o comportamento, não o teste.",
    "Achado: o guardrail do repo age sobre a saída do LLM por padrões de linguagem; a busca (retrieve) acontece normalmente, como a aula descreve, e só o texto final é substituído."
   ],
   "tip": "Para cada regra de negócio crítica, escreva duas linhas: onde ela é garantida (código, teste) e onde é apenas orientada (prompt). Se a coluna \"código\" estiver vazia, a regra ainda não existe.",
   "cola": [
    [
     "AI Researcher",
     "Chatbot de investimentos de bolsa que serve de projeto integrador da disciplina."
    ],
    [
     "RAG",
     "Recuperação em base vetorial antes de gerar a resposta; primeira fonte do agente."
    ],
    [
     "Contexto suficiente",
     "Julgamento (feito pelo sistema) de que o que veio da base basta para responder."
    ],
    [
     "Fallback web",
     "Busca na internet quando o contexto local é insuficiente."
    ],
    [
     "Pipeline de raciocínio",
     "Painel da interface que mostra cada etapa percorrida, inclusive erros."
    ],
    [
     "Guardrail",
     "Trava que impede o sistema de responder pedidos de compra ou venda; vive no código."
    ],
    [
     "CVM",
     "Comissão de Valores Mobiliários, reguladora do mercado de capitais e fonte dos dados."
    ],
    [
     "Informar, nunca recomendar",
     "Regra de domínio: apresentar informação pública, sem sugerir compra, venda ou manutenção."
    ],
    [
     "Walking skeleton",
     "Esqueleto mínimo ponta a ponta que sobe cedo e é incrementado (Aula 7)."
    ]
   ],
   "links": [
    [
     "Capstone Project AI Researcher (projeto completo)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
    ],
    [
     "AI Researcher Seed (ponto de partida)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
    ],
    [
     "Guardrail no código (format-resposta.ts)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/packages/agent/src/answer/format-resposta.ts"
    ]
   ],
   "codigo": [
    {
     "proj": "README.md, .claude/CLAUDE.md (seção Domínio), packages/agent/src/answer/format-resposta.ts, apps/web (disclaimer)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher",
     "resumo": "Aula conceitual: o que há no repo de relevante é o README (arquitetura e demo), a seção de domínio do CLAUDE.md e o guardrail que a Aula 13 detalha. Li os arquivos citados, mas não executei testes nem a aplicação.",
     "fluxo": [
      "<code>README.md</code>: descreve o produto, a arquitetura 100% Google Cloud e o grafo <code>retrieve, grade, webSearch, answer</code> com <code>MAX_ITERATIONS = 2</code>.",
      "<code>.claude/CLAUDE.md</code> (seção \"Domínio: restrição regulatória\"): \"O sistema informa, nunca recomenda\"; exige citar fonte e período, teste automatizado de \"devo comprar X?\" e disclaimer permanente.",
      "<code>packages/agent/src/answer/format-resposta.ts</code>: <code>PADROES_RECOMENDACAO</code> (6 regex), <code>contemLinguagemRecomendatoria</code>, <code>RESPOSTA_GUARDRAIL</code> e <code>montarResposta</code>.",
      "<code>packages/agent/src/answer/format-resposta.test.ts</code>: teste com 5 frases recomendatórias que devem disparar e 3 frases financeiras legítimas que não devem.",
      "<code>packages/agent/src/prompts/answer.ts</code>: o prompt do nó <code>answer</code> também proíbe recomendação (primeira linha de defesa).",
      "<code>apps/web/src/app/chat/chat.html</code>: faixa fixa com \"Este assistente apresenta informações públicas, não recomendação de investimento.\"",
      "<code>apps/web/src/app/graph/graph-panel/graph-panel.html</code>: aviso \"Contexto local insuficiente neste turno\" do pipeline de raciocínio."
     ],
     "rodar": [
      "<code>pnpm install</code> e <code>pnpm test</code> (script da raiz, roda os testes via Turborepo); não executei.",
      "<code>pnpm --filter @hero/agent run test</code> para isolar o pacote do guardrail (não executei; o filtro segue o nome do pacote em <code>packages/agent/package.json</code>)."
     ],
     "armadilhas": [
      "Achado: a aula diz que o guardrail \"impede responder pedidos de compra ou venda\"; no código ele não barra a pergunta, filtra a <i>resposta</i> do LLM por regex e a substitui. A busca roda antes, como a aula mostra.",
      "Achado: a lista de padrões é pequena (6 regex) e mira formas conhecidas (\"recomendo\", \"vale a pena comprar\", \"compre esta ação\"); paráfrases fora dela não são detectadas.",
      "O CLAUDE.md do repo exige que o teste do guardrail seja mantido e que a UI exiba o disclaimer sempre, sem modal e sem condicional."
     ]
    }
   ]
  },
  {
   "id": "D11-01",
   "bloco": "d11-b0",
   "mod": "Unidade 1 · Aula 2",
   "emoji": "📜",
   "read": "9 min",
   "title": "CLAUDE.md e AI Dev Skills: contexto sempre ligado versus instruções sob demanda",
   "short": "Fork, clone e branch starter; o CLAUDE.md carrega regras em toda interação, as skills entram só quando a tarefa pede, e a skill oficial do framework vence a do projeto.",
   "oneliner": "O modelo é <b>stateless</b>, então o projeto guarda contexto e regras em <b>.claude/CLAUDE.md</b> (sempre carregado) e em <b>skills</b> (Markdown carregado conforme a tarefa). Em ambiguidade entre skill do projeto e skill oficial do framework, a <b>oficial vence</b>.",
   "vovo": [
    "O agente de código é como um prestador de serviço que esquece tudo toda vez que vai embora. O CLAUDE.md é o bilhete na porta de entrada que ele lê sempre: onde está, o que perguntar antes de mexer, o que nunca fazer.",
    "As skills são as pastas de procedimento no armário: o manual de hidráulica só sai quando há cano vazando. Assim o bilhete fica curto e o prestador não gasta tempo lendo o que não precisa. E se existe o manual do próprio fabricante da torneira, ele manda mais que o seu manual caseiro."
   ],
   "oque": [
    "Ponto de partida: pegar o link do repo no material complementar (o endereço pode mudar), fazer <b>fork</b> para a sua conta, <b>git clone</b> do fork, abrir no editor e trabalhar na branch <b>starter</b>. Usa-se conta própria de GitHub e de Google Cloud porque a esteira de DevOps entrega no seu GCP.",
    "<b>Projeto seed</b> é um ponto de partida com só o início do necessário; a branch starter cumpre esse papel e a Aula 7 apresenta um repositório separado com o mesmo conteúdo.",
    "O modelo por trás do agente é <b>stateless</b>: cada interação é como uma requisição nova. A solução é um arquivo de configuração carregado sempre. No Claude é o <code>CLAUDE.md</code> na pasta <code>.claude</code>; Gemini e Codex têm equivalente.",
    "O CLAUDE.md do projeto começa pelo contexto (repo demonstrativo do módulo Capstone, código didático), descreve as partes do projeto e o estado atual, depois traz as regras de trabalho e as convenções.",
    "Regras \"pergunte antes de\" (5): instalar dependência nova; criar abstração ou interface; alterar esquema do banco; mudar deploy, workflow ou infraestrutura; reorganizar pastas ou mover arquivos.",
    "Regras \"nunca\" (4 na aula): segredo, chave ou connection string em arquivo versionado (vem de variável de ambiente e, em produção, do Secret Manager); LLM para gerar os parágrafos do corpus CVM; <code>any</code> sem comentário justificando (prefira <code>unknown</code> com narrowing); teste que dependa de rede (use fixtures ou fakes).",
    "Dois níveis de CLAUDE.md: global da máquina e do projeto. <b>O do projeto manda</b>; se o projeto não define algo, vale o global. Em equipe, versiona-se o do projeto.",
    "<b>Skill</b> é Markdown com instruções para trabalhar segundo um padrão, carregado conforme o contexto da tarefa (em tarefa de backend, as skills de Angular não entram). Evita contexto inicial grande, que custa mais tokens e atrasa o processamento.",
    "Duas origens de skill: oficiais do time do framework (o time do Angular criou as dele, motivo declarado para escolher Angular) e as do projeto, como <code>angular-component</code> e a do Fastify.",
    "Precedência: se houver ambiguidade entre skill do projeto e oficial, a <b>oficial sempre vence</b>. Dá para inverter, mas a recomendação da aula é manter a oficial. E vale escrever até regras óbvias no arquivo, para o agente sempre achar a regra atual se o negócio mudar."
   ],
   "como": [
    "1. Fork do repo do Capstone no GitHub; 2. <code>git clone</code> do seu fork; 3. entrar na pasta e abrir no editor (VS Code na aula); 4. <code>git checkout starter</code>. Para refazer do zero sem conflito de merge, a Aula 7 indica o repo Seed, cuja <code>main</code> equivale à starter.",
    "Leia <code>.claude/CLAUDE.md</code> de cima para baixo: Contexto, Estado atual, Stack, Estrutura, Comandos, Regras de trabalho (pergunte antes / nunca), Convenções, Domínio, Corpus, Modelos, Skills.",
    "Decida o que vai para o CLAUDE.md (vale para toda tarefa: regras, comandos, convenções, limites) e o que vai para skill (vale para um tipo de tarefa: como fazer uma rota Fastify, um nó do grafo, um componente Angular).",
    "Cada skill é uma pasta com <code>SKILL.md</code> e frontmatter <code>name</code> e <code>description</code>; a descrição diz quando usar e é o que permite ao agente decidir carregá-la.",
    "Instale skills oficiais com <code>npx skills add https://github.com/angular/skills</code> (comando registrado no CLAUDE.md e na skill <code>angular-component</code>); o <code>skills-lock.json</code> registra origem e hash de cada skill instalada.",
    "Escreva a regra de precedência no CLAUDE.md e repita no topo da skill do projeto, apontando para a oficial.",
    "Prática da aula: ler o CLAUDE.md e as skills do repo e, se quiser, pedir ao Claude para explicar cada detalhe."
   ],
   "aplica": [
    "Qualquer repo com agente de código: o CLAUDE.md (ou AGENTS.md, GEMINI.md) é o contrato de trabalho versionado com o time.",
    "Times com várias stacks: skill por tipo de tarefa (frontend, backend, grafo) em vez de um arquivo gigante sempre carregado.",
    "Frameworks com skills oficiais (Angular, Langfuse): instalar a oficial e deixar a do projeto só para decisões locais.",
    "Governança de agente: lista de \"pergunte antes\" e \"nunca\" reduz mudanças arriscadas (dependência, schema, deploy)."
   ],
   "pros": [
    "Contexto sempre presente evita repetir instruções a cada conversa.",
    "Skills sob demanda mantêm o contexto inicial pequeno, com menos tokens e menos latência.",
    "Skill oficial acompanha a versão do framework; a do projeto cobre só o que é específico.",
    "Regras versionadas viram revisão de código: mudar a regra é um commit."
   ],
   "contras": [
    "CLAUDE.md que só cresce vira custo fixo em toda interação.",
    "Duas skills sobre o mesmo assunto geram conflito se a precedência não estiver escrita.",
    "A skill só carrega se a descrição for boa; descrição vaga faz o agente nunca usá-la.",
    "Regra no arquivo não é garantia técnica: nada impede o agente de violá-la sem hook, teste ou revisão."
   ],
   "traps": [
    "Pôr tudo (Angular, backend, convenções) no CLAUDE.md: contexto inicial inflado, mais tokens e mais demora.",
    "Deixar a skill do projeto repetir o que a oficial já cobre: divergência futura e conflito de precedência.",
    "Não escrever regras \"óbvias\" porque o agente supostamente já as segue: se o negócio mudar, o agente não acha a regra atual.",
    "Trabalhar direto no repo do curso sem fork: sem dono do repositório, a autenticação por Workload Identity (Aula 6) não funciona no seu GCP.",
    "Achado: o <code>.claude/CLAUDE.md</code> do repo completo tem 325 linhas e cerca de 57 KB porque acumulou o diário de cada bloco em \"Estado atual\"; o do seed tem 205 linhas e cerca de 12 KB. Contradiz a lição da própria aula sobre contexto sempre carregado."
   ],
   "tip": "Meça: <code>wc -c .claude/CLAUDE.md</code> e divida por 4 para estimar tokens carregados em toda interação. Se passar de uns poucos milhares, mova procedimento para skill e histórico para docs.",
   "cola": [
    [
     "Stateless",
     "Modelo que não lembra interações anteriores; cada chamada é independente."
    ],
    [
     "CLAUDE.md",
     "Arquivo em .claude/ carregado em toda interação com contexto, regras e convenções."
    ],
    [
     "Skill",
     "Markdown de instruções carregado conforme o contexto da tarefa."
    ],
    [
     "Skill oficial",
     "Skill criada pelo time do framework (ex.: angular-developer, angular-new-app)."
    ],
    [
     "Precedência",
     "Regra: em ambiguidade, a skill oficial vence a do projeto."
    ],
    [
     "Projeto seed",
     "Ponto de partida com só o início do projeto (branch starter ou repo Seed)."
    ],
    [
     "Pergunte antes",
     "Lista de ações que o agente só faz com aprovação."
    ],
    [
     "Nunca",
     "Lista de proibições do projeto (segredo em arquivo, LLM no corpus, any, teste com rede)."
    ],
    [
     "skills-lock.json",
     "Registro de origem e hash das skills instaladas via npx skills."
    ]
   ],
   "links": [
    [
     "Capstone Project AI Researcher",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
    ],
    [
     "AI Researcher Seed",
     "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
    ],
    [
     "CLAUDE.md do projeto completo",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/.claude/CLAUDE.md"
    ],
    [
     "Skills do projeto (.claude/skills)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/.claude/skills"
    ],
    [
     "Skills oficiais do Angular",
     "https://github.com/angular/skills"
    ]
   ],
   "codigo": [
    {
     "proj": ".claude/CLAUDE.md, .claude/skills/, .agents/skills/, skills-lock.json (repo completo)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/.claude",
     "resumo": "Li o CLAUDE.md, o frontmatter e o início das quatro skills próprias, os symlinks e o skills-lock.json do repo completo. Não executei nada.",
     "fluxo": [
      "<code>.claude/CLAUDE.md</code> (325 linhas): seções Contexto, Estado atual, Stack, Estrutura, Comandos, Regras de trabalho (pergunte antes / nunca), Convenções, Domínio, Corpus, Modelos, Skills e Observação sobre versões.",
      "<code>.claude/skills/fastify-route/SKILL.md</code> (83 linhas): uma rota por arquivo como plugin, entrada validada com zod, erro em <code>application/problem+json</code>, SSE com <code>no-transform</code>, teste com <code>app.inject()</code>.",
      "<code>.claude/skills/langgraph-node/SKILL.md</code> (138 linhas): assinatura de nó, estado, arestas condicionais, guard de iteração e teste com LLM fake.",
      "<code>.claude/skills/angular-component/SKILL.md</code> (82 linhas): abre mandando usar a skill oficial <code>angular-developer</code> e diz que, em conflito, a oficial vence; depois lista convenções locais (componente não conhece HTTP, um store por domínio).",
      "<code>.claude/skills/frontend-design/SKILL.md</code> (70 linhas): tokens visuais e fidelidade ao protótipo; existe só no repo completo.",
      "<code>.claude/skills/angular-developer</code>, <code>angular-new-app</code> e <code>langfuse</code> são <b>symlinks</b> para <code>.agents/skills/*</code> (instaladas por <code>npx skills add</code>).",
      "<code>skills-lock.json</code>: 3 entradas (angular-developer e angular-new-app de <code>angular/skills</code>, langfuse de <code>langfuse/skills</code>), cada uma com <code>computedHash</code>. No seed são só 2 (sem langfuse)."
     ],
     "rodar": [
      "<code>git clone &lt;seu-fork&gt; &amp;&amp; cd capstone-project-ai-researcher &amp;&amp; git checkout starter</code>",
      "<code>npx skills add https://github.com/angular/skills</code> (reinstala as skills oficiais; não executei)",
      "<code>wc -c .claude/CLAUDE.md .claude/skills/*/SKILL.md</code> para medir o contexto fixo e o sob demanda"
     ],
     "armadilhas": [
      "Achado: a aula descreve 4 regras \"nunca\" e o repo traz uma quinta: não commitar os ZIPs ou CSVs brutos da CVM (só os JSONs normalizados).",
      "Achado: a regra de precedência está duplicada, no CLAUDE.md (seção Skills) e no topo de <code>angular-component/SKILL.md</code>; consistente, mas precisa mudar nos dois lugares.",
      "Achado: o repo declara seed e completo com skills diferentes (<code>frontend-design</code> e <code>langfuse</code> só no completo), coerente com os blocos que cada um já cobre.",
      "O CLAUDE.md do repo fixa convenção de commits em português sem prefixo convencional; é do projeto do curso, não regra geral."
     ]
    },
    {
     "proj": ".claude/CLAUDE.md e .claude/skills/ (repo seed)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed/tree/main/.claude",
     "resumo": "O seed traz o CLAUDE.md enxuto (205 linhas) e 5 skills (3 delas por symlink ou instaladas), sem frontend-design nem langfuse. Comparei por diff e listagem; não executei.",
     "fluxo": [
      "<code>.claude/CLAUDE.md</code>: mesmas seções, mas \"Estado atual\" só até o Bloco C (walking skeleton) e declara que <code>packages/agent</code> e <code>packages/mcp-server</code> ainda não existem.",
      "<code>.claude/skills/</code>: <code>angular-component</code>, <code>fastify-route</code>, <code>langgraph-node</code> e symlinks para <code>angular-developer</code> e <code>angular-new-app</code>.",
      "<code>skills-lock.json</code>: só as duas skills do Angular."
     ],
     "rodar": [
      "<code>diff -r seed/.claude full/.claude</code> para ver o que o repo completo acrescenta"
     ],
     "armadilhas": [
      "Achado: o seed já está no estado pós-Unidade 1 (tem <code>apps/api</code>, <code>apps/web</code>, <code>deploy.yml</code>, <code>capstone-check.ts</code>), então o CLAUDE.md dele diz que o Bloco C está pronto, embora a Aula 2 chame o ponto de partida de \"o mínimo configurado\"."
     ]
    }
   ]
  },
  {
   "id": "D11-02",
   "bloco": "d11-b0",
   "mod": "Unidade 1 · Aulas 3 e 4",
   "emoji": "☁️",
   "read": "11 min",
   "title": "Tour pelo Google Cloud e GitHub Actions com Workload Identity Federation",
   "short": "As sete peças do GCP que sustentam o AI Researcher e a esteira que faz deploy sem nenhuma chave JSON, trocando um token OIDC por uma service account impersonada.",
   "oneliner": "A arquitetura usa <b>Cloud Run</b> (API serverless), <b>Firebase Hosting</b> (Angular + rewrite de <code>/api</code>), <b>Artifact Registry</b>, <b>Cloud SQL com pgvector</b>, <b>Vertex AI</b> e <b>Secret Manager</b>, tudo disparado por <b>GitHub Actions</b>. A esteira autentica por <b>Workload Identity Federation</b>: token OIDC curto, service account impersonada, nada guardado.",
   "vovo": [
    "Imagine um prédio com portaria. O jeito antigo de dar acesso ao entregador é copiar uma chave mestra e deixá-la numa gaveta (o JSON no secret): se alguém arromba a gaveta, a chave serve para sempre.",
    "O jeito novo é a portaria conhecer o entregador: ele mostra um crachá que vale minutos, emitido na hora pela transportadora e só aceito se vier da transportadora certa. Na portaria, ele recebe um uniforme temporário de \"entregador do prédio\" e, ao terminar, tudo é descartado. Não sobra chave para roubar."
   ],
   "oque": [
    "<b>GitHub Actions</b>: a esteira de DevOps; toda ação na infra é disparada por ela. Passa pelos quality gates e, no fim, faz deploy no Google Cloud.",
    "<b>Cloud Run</b>: onde roda a regra de negócio, a API Fastify em Node. Serverless: o GCP sobe containers sob demanda e não há servidor ligado sem requisição. Equivalente: Lambda (AWS) e serviço serverless da Azure. Cobrado por requisição (valor por GB de memória por segundo com muitos zeros).",
    "<b>Firebase Hosting</b>: serve o Angular e estáticos, com DNS. Equivalentes: bucket S3 exposto (AWS), Blob Storage (Azure). A regra de <b>rewrite</b> manda tudo que começa com <code>/api</code> para o Cloud Run e o resto para o Angular, dispensando CORS no backend e no frontend.",
    "<b>Artifact Registry</b>: guarda e versiona a imagem Docker do backend; quem executa é o Cloud Run. A mesma imagem roda local em desenvolvimento.",
    "<b>Cloud SQL (Postgres) + pgvector</b>: menor instância possível, 10 GB. A extensão transforma o Postgres em banco vetorial com busca semântica via SQL. Quem já roda Postgres e precisa de RAG pode reaproveitar o banco e o conhecimento do time.",
    "<b>Vertex AI</b>: serviço de modelos (Model Garden: Gemini Flash, Flash-Lite, Pro, Gemma, parceiros como Anthropic, abertos como Kimi, Llama e Hugging Face). No projeto faz o embedding do RAG e é a LLM do agente. Equivalente: Bedrock (AWS).",
    "<b>Secret Manager</b>: cofre das chaves do banco e dos serviços externos (Langfuse, exportador OpenTelemetry para o Grafana, Serper). Em ambiente local, variáveis de ambiente.",
    "Custos citados: ~R$ 30 em mais de um mês (aula 3) e ~R$ 50/mês com tudo online (aula 6); o <b>Cloud SQL cobra mesmo sem uso</b> (10 GB reservados), por isso a infra deve ser desmontada ao fim. Conta nova ganha ~US$ 300 de crédito.",
    "<b>Duas formas de dar acesso da esteira à nuvem</b>: (a) chave de service account em JSON guardada em secret do GitHub, com permissões mínimas, mas estática e usável por quem comprometer o repo; (b) <b>Workload Identity Federation (WIF)</b> com workload identity pool, adotada no projeto.",
    "Anatomia de um workflow YAML: nome, <code>on</code> (gatilho: push, PR, issue, fork), <code>jobs</code> (no projeto: teste e deploy), máquina por job (<code>ubuntu-latest</code>, container descartado a cada run; Windows e Mac normalmente pagos) e <code>steps</code> (comandos ou actions prontas, como <code>checkout</code>)."
   ],
   "como": [
    "Fluxo WIF em 4 passos (aula): (1) o runner pede ao GitHub um <b>token OIDC</b> de curtíssima duração, novo a cada execução; (2) com ele faz login no GCP, que confirma que o chamador é conhecido e que a chamada vem de um repositório conhecido; (3) é criado um <b>token impersonado</b> de uma service account de deploy, no ato; (4) terminado o deploy, tudo é apagado.",
    "No GCP o pool fica em IAM, federação de identidade. A tela mostra quando foi usado (auditoria; o Google avisa abuso), as asserções e a <b>condição</b>: acesso só para um repositório específico. No fork do aluno, a condição precisa apontar para o seu repositório.",
    "No workflow, o job de deploy declara <code>permissions: id-token: write</code> e usa <code>google-github-actions/auth@v3</code> com <code>workload_identity_provider</code> e <code>service_account</code> vindos de variáveis (identificadores, não segredos).",
    "<code>GITHUB_TOKEN</code> é outra coisa: token do próprio GitHub, não da nuvem, que identifica quem executa a run conforme a permissão no repo.",
    "Jobs de build e teste não precisam de acesso ao GCP; só o deploy precisa. Por isso o <code>deploy</code> tem <code>needs: test</code> e roda só em push na <code>main</code>.",
    "Roteamento em produção: o navegador chama <code>/api/health</code> no domínio do Firebase; o <code>rewrite</code> encaminha ao serviço <code>ai-researcher-api</code> em <code>us-central1</code>; qualquer outro caminho cai no <code>index.html</code> (SPA).",
    "Segredos no runtime: o Cloud Run injeta <code>DATABASE_URL=database-url:latest</code> a partir do Secret Manager e conecta ao Cloud SQL por <code>--add-cloudsql-instances</code> (socket Unix).",
    "Desmontagem: <code>make destroy</code> chama <code>pnpm destroy</code> (scripts/destroy.ts), que apaga primeiro o Cloud SQL (único custo fixo), depois Cloud Run, Artifact Registry, secrets, pool WIF e service account, pedindo para digitar o project id."
   ],
   "aplica": [
    "Qualquer pipeline que faz deploy em nuvem: troque chaves estáticas por federação OIDC (GCP, AWS e Azure têm equivalentes).",
    "APIs com tráfego esporádico: serverless por requisição sai muito mais barato que servidor sempre ligado.",
    "Apps que já têm Postgres e precisam de RAG: pgvector evita um banco vetorial separado.",
    "SPAs com API própria: rewrite no hosting para manter mesma origem e eliminar CORS.",
    "Estimativa de custo de projeto de estudo: identificar o único recurso com custo fixo e planejar o teardown."
   ],
   "pros": [
    "WIF não deixa credencial duradoura: se o repo vazar, não há chave para roubar, e o acesso fica preso a um repositório.",
    "Cada uso do pool é auditado pelo próprio Google Cloud.",
    "Cloud Run e Firebase Hosting têm custo praticamente zero em uso baixo.",
    "Mesma imagem Docker roda local e em produção."
   ],
   "contras": [
    "Configurar pool, provider, condição e bindings à mão é trabalhoso e cheio de detalhes de permissão.",
    "Lock-in parcial: o Vertex AI é específico do Google (embora Bedrock e outros cubram o papel).",
    "Cloud SQL tem custo fixo por instância mesmo parada.",
    "Serverless pode não compensar com tráfego alto e constante, caso em que servidor dedicado pode sair melhor."
   ],
   "traps": [
    "Nunca versionar secret; o GitHub tem área própria para secrets, e o ideal aqui é nem ter secret.",
    "Esquecer de trocar o repositório na condição do pool ao usar fork: a autenticação falha e o deploy quebra.",
    "Esquecer de desmontar a infra: o Cloud SQL segue cobrando os 10 GB reservados.",
    "Confundir <code>GITHUB_TOKEN</code> (do GitHub) com credencial do GCP.",
    "Achado: a aula diz região us-central1 \"mais barata\"; o infra/README do repo completo justifica por cobertura de serviços e nota que os modelos Gemini usados no chat só respondem em <code>location: \"global\"</code>."
   ],
   "tip": "Ao revisar qualquer workflow, procure três linhas: <code>permissions: id-token: write</code>, o step <code>auth</code> com provider e service account e a ausência de <code>credentials_json</code>. Se houver JSON de chave, a esteira não é keyless.",
   "cola": [
    [
     "Cloud Run",
     "Backend serverless do GCP, cobrado por requisição, escala sob demanda."
    ],
    [
     "Firebase Hosting",
     "Hospedagem de estáticos com DNS e regras de rewrite para o Cloud Run."
    ],
    [
     "Rewrite",
     "Regra que envia /api/** ao Cloud Run e o resto ao Angular; dispensa CORS."
    ],
    [
     "Artifact Registry",
     "Repositório versionado de imagens Docker."
    ],
    [
     "pgvector",
     "Extensão do Postgres para guardar embeddings e buscar por similaridade em SQL."
    ],
    [
     "Vertex AI",
     "Plataforma de modelos do Google (embedding e LLM); equivalente ao Bedrock."
    ],
    [
     "Secret Manager",
     "Cofre de segredos do GCP; lido pelo Cloud Run em runtime."
    ],
    [
     "WIF",
     "Workload Identity Federation: confia no OIDC do GitHub e emite credencial efêmera."
    ],
    [
     "Token OIDC",
     "Token de curtíssima duração emitido pelo GitHub a cada run."
    ],
    [
     "Service account impersonada",
     "Identidade de deploy assumida no ato via token, descartada ao fim."
    ],
    [
     "GITHUB_TOKEN",
     "Token do próprio GitHub para a run, não é credencial de nuvem."
    ]
   ],
   "links": [
    [
     "Capstone Project AI Researcher",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
    ],
    [
     "AI Researcher Seed",
     "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
    ],
    [
     "Workflow de deploy",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/.github/workflows/deploy.yml"
    ],
    [
     "infra/README.md (recursos e WIF)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/infra/README.md"
    ],
    [
     "Documentação: Workload Identity Federation",
     "https://cloud.google.com/iam/docs/workload-identity-federation"
    ]
   ],
   "codigo": [
    {
     "proj": ".github/workflows/deploy.yml",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/.github/workflows/deploy.yml",
     "resumo": "Li o workflow do repo completo (160 linhas) e do seed (79 linhas). O seed é o workflow \"da aula\"; o completo evoluiu com E2E, canary e mais secrets. Não executei a esteira.",
     "fluxo": [
      "<code>on:</code> <code>push</code> em <code>main</code> e <code>pull_request</code>; o <code>env</code> lê <code>PROJECT_ID</code> de <code>vars.GCP_PROJECT_ID</code> (variável, não secret), fixa <code>REGION: us-central1</code>, <code>ARTIFACT_REPO: ai-researcher</code> e <code>CLOUD_RUN_SERVICE: ai-researcher-api</code>.",
      "Job <code>test</code> (<code>ubuntu-latest</code>): <code>actions/checkout@v7</code>, <code>pnpm/action-setup@v6</code>, <code>actions/setup-node@v7</code> com Node 24 e cache pnpm, <code>pnpm install --frozen-lockfile</code>, <code>pnpm build</code>, <code>pnpm test</code>, <code>pnpm lint</code> (o completo acrescenta Playwright chromium e <code>pnpm test:e2e</code>).",
      "Job <code>deploy</code>: <code>needs: test</code>, <code>if: github.event_name == 'push' &amp;&amp; github.ref == 'refs/heads/main'</code> e <code>permissions: id-token: write, contents: read</code>.",
      "Step <code>auth</code>: <code>google-github-actions/auth@v3</code> com <code>workload_identity_provider: ${{ vars.GCP_WIF_PROVIDER }}</code> e <code>service_account: ${{ vars.GCP_DEPLOY_SERVICE_ACCOUNT }}</code>, sem <code>credentials_json</code>.",
      "Build da imagem: <code>gcloud auth configure-docker us-central1-docker.pkg.dev</code>, <code>docker build -f infra/docker/api.Dockerfile</code>, <code>docker push</code> com tag <code>${{ github.sha }}</code>.",
      "Deploy no Cloud Run com <code>google-github-actions/deploy-cloudrun@v3</code>: <code>secrets: DATABASE_URL=database-url:latest</code> e <code>flags: --add-cloudsql-instances=${PROJECT_ID}:us-central1:ai-researcher-db</code>.",
      "Fim: <code>pnpm turbo run build --filter=@hero/web</code> e <code>npx firebase-tools deploy --only hosting --project ... --non-interactive</code>."
     ],
     "rodar": [
      "<code>gh variable set GCP_PROJECT_ID --body \"&lt;seu-project-id&gt;\"</code> (e <code>GCP_WIF_PROVIDER</code>, <code>GCP_DEPLOY_SERVICE_ACCOUNT</code>) conforme infra/README.md",
      "<code>gh run list --workflow=deploy.yml</code> e <code>gh run watch</code> para acompanhar a esteira (não executei)"
     ],
     "armadilhas": [
      "Achado: o gatilho real é <code>push</code> em main <b>e</b> <code>pull_request</code>; o <code>deploy</code> é que fica restrito a push na main. A aula fala só do push na main.",
      "Achado: no repo completo existe um passo <code>check-service</code> que escolhe entre deploy canary (<code>no_traffic</code>, <code>tag: canary</code>) e primeiro deploy sem canary, porque o gcloud rejeita <code>--no-traffic</code> ao criar um serviço; é evolução de unidades futuras, ausente no seed.",
      "O ID do provider e da service account aparecem como <code>vars</code>, o que é coerente com a aula (identificação, não secret)."
     ]
    },
    {
     "proj": "infra/ (README.md, docker/, grafana/), firebase.json, .firebaserc, Makefile, scripts/destroy.ts",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/infra",
     "resumo": "Li o infra/README.md (completo e seed), firebase.json, os Dockerfiles, nginx.conf, o Makefile e o destroy.ts. Não executei comandos de nuvem. O repo não tem IaC (Terraform/Pulumi): a fundação é documentada para reprodução manual.",
     "fluxo": [
      "<code>infra/README.md</code>: tabela de recursos: projeto <code>ai-researcher-capstone</code>, região <code>us-central1</code>, Artifact Registry <code>ai-researcher</code>, Cloud SQL <code>ai-researcher-db</code> (Postgres 16, <code>db-f1-micro</code>, zonal, sem backup, IP público), banco <code>ai_researcher</code> com pgvector 0.8.1, usuário <code>app_user</code>.",
      "WIF no README: pool <code>github-actions-pool</code>, provider <code>github-actions-provider</code> restrito ao repo do curso via <code>attribute.repository</code>; service account <code>github-actions-deployer</code> com roles <code>run.admin</code>, <code>artifactregistry.writer</code>, <code>iam.serviceAccountUser</code>, <code>cloudsql.client</code>, <code>secretmanager.secretAccessor</code>, <code>cloudbuild.builds.editor</code> e <code>firebasehosting.admin</code>.",
      "<code>firebase.json</code>: <code>public: apps/web/dist/web/browser</code>; rewrite <code>/api/**</code> para <code>run.serviceId: ai-researcher-api</code> em <code>us-central1</code>; <code>**</code> para <code>/index.html</code>. Idêntico no seed.",
      "<code>infra/docker/api.Dockerfile</code>: 4 estágios (<code>base</code>, <code>pruner</code> com <code>turbo prune @hero/api --docker</code>, <code>installer</code>, <code>runner</code> em <code>node:24-alpine</code> com usuário não-root <code>fastify</code>, porta 3000).",
      "<code>infra/docker/web.Dockerfile</code> + <code>nginx.conf</code>: só para paridade local; o nginx faz o mesmo papel do rewrite (<code>/api/</code> para <code>http://api:3000/api/</code>). O deploy de produção do web não usa Docker.",
      "<code>Makefile</code> e <code>scripts/destroy.ts</code>: <code>make destroy</code> remove Cloud SQL primeiro e exige digitar o project id; lê <code>GOOGLE_CLOUD_PROJECT_ID</code>.",
      "<code>docs/hero-project-plano.md</code>: seção 3 desenha a arquitetura 100% Google Cloud com GitHub Actions ligado por WIF; ementa da Unidade 1 de 1h."
     ],
     "rodar": [
      "<code>make destroy</code> (ou <code>pnpm destroy</code>): apaga a infra do projeto em ordem; não executei",
      "<code>gcloud projects describe &lt;id&gt; --format=\"value(projectNumber)\"</code> para montar o caminho do provider (do infra/README)"
     ],
     "armadilhas": [
      "Achado: a aula pede \"mínima permissão\", mas a service account de deploy tem <code>run.admin</code>, <code>iam.serviceAccountUser</code> e <code>firebasehosting.admin</code>; amplo para o escopo. Hipótese: <code>cloudbuild.builds.editor</code> é sobra, pois o commit \"Troca Cloud Build por docker build+push direto no runner\" removeu o uso do Cloud Build (não verifiquei no GCP).",
      "Achado: <code>.firebaserc</code> ainda traz <code>\"default\": \"ai-researcher-capstone\"</code> fixo; o README manda trocar pelo seu project id (o deploy.yml passa <code>--project</code> explícito e não depende dele).",
      "Achado: nenhuma configuração de CORS existe em <code>apps</code> ou <code>packages</code> (busca por \"cors\" sem resultado); coerente com o rewrite/proxy de mesma origem.",
      "Achado: a SA de execução do Cloud Run (padrão do Compute) precisou de <code>secretmanager.secretAccessor</code> em <code>database-url</code>, distinta da SA de deploy; é um dos três bugs do deploy zero no README.",
      "Achado: <code>destroy.ts</code> estima o Cloud SQL em cerca de US$ 10-15/mês (comentário do script), na mesma linha do alerta da aula."
     ]
    }
   ]
  },
  {
   "id": "D11-03",
   "bloco": "d11-b0",
   "mod": "Unidade 1 · Aula 5",
   "emoji": "📊",
   "read": "10 min",
   "title": "Corpus CVM: coleta, normalização e parágrafos determinísticos sem LLM",
   "short": "Um script baixa ITR e DFP da CVM, acha as contas, converte milhares em reais e gera um JSON por empresa com parágrafo montado por template, nunca por LLM.",
   "oneliner": "O corpus do RAG vem dos <b>dados abertos da CVM</b>: <code>pnpm collect</code> baixa os ZIPs, localiza as contas (o código de conta <b>não é estável entre setores</b>), normaliza milhares para reais e escreve <b>80 documentos</b> (20 empresas, 4 trimestres) com parágrafo por <b>template determinístico</b>: custo zero e sem alucinação numérica.",
   "vovo": [
    "Pense em montar uma ficha de cada empresa a partir de balancetes oficiais. Você poderia pedir a um redator criativo (a LLM) que escrevesse cada ficha, mas ele pode errar um número com a maior confiança e cobra por ficha. Em vez disso, você usa um formulário com lacunas: \"No trimestre X, a empresa Y teve receita de Z\". Quem preenche é uma regra, sempre igual.",
    "E se o órgão oficial publicar um arquivo faltando, o formulário não quebra a fábrica inteira: pula aquele arquivo e segue com os que existem."
   ],
   "oque": [
    "Fonte: <b>Portal de Dados Abertos da CVM</b>, ZIPs anuais com um CSV por demonstrativo. Os arquivos precisam ser lidos e baixados automaticamente, sem download manual, limpos e convertidos em JSON.",
    "Regra do CLAUDE.md na parte \"nunca\": nunca usar LLM para gerar os parágrafos do corpus. O agente não pode inventar nem alucinar números; tudo é baseado em dados.",
    "Dois motivos para não usar LLM: <b>custo</b> (o script poderia rodar um milhão de vezes sem nenhuma chamada) e <b>alucinação</b> (mesmo com os valores certos no prompt, a LLM pode errar). Regra geral: onde o dado não admite risco de alucinação, código determinístico.",
    "Um único prompt cria o pacote: <code>packages/corpus</code>, lista de 20 empresas em <code>data/empresas.csv</code> (ticker, razão social, código CVM, setor), arquivos ITR e DFP de <code>dados.cvm.gov.br</code>, últimos 4 trimestres, seis indicadores (receita líquida, lucro bruto, lucro líquido, ativo total, patrimônio líquido, caixa operacional), normalização de milhares para reais e um JSON por empresa em <code>data/documentos/{TICKER}.json</code>.",
    "Metadados exigidos por documento: ticker, nome da companhia, setor, período, data final do período, URL da fonte e data de download (aula: <code>ticker, company_name, setor, period, period_end, source_url, fetched_at</code>).",
    "Pegadinha da escala: na CVM, \"200\" são 200 mil milhares, ou seja, 200 milhões. Guarda-se o valor cheio em reais para poder fazer contas.",
    "O que o agente descobriu lendo os arquivos: o <b>código de conta</b> não é estável entre setores. Bancos usam outra árvore de DRE e balanço (confirmado com Vale, Itaú, Bradesco e Banco do Brasil) e até o Itaú tem menos linhas antes do lucro líquido que o Bradesco. Por isso o <code>select-quarters.ts</code> procura certas contas pelo nome.",
    "Erro não previsto na demo: <code>pnpm collect</code> falhou com <b>404</b> porque a CVM tinha os arquivos de 2013 a 2024 e 2026, mas não o de 2025. O script estava certo; a situação da fonte não tinha sido prevista. Novo prompt: ignorar o arquivo quando não existir e seguir com os dados disponíveis (correção mais simples).",
    "Resultado: JSON em <code>packages/corpus/data</code>, com valores inteiros (não abreviados), data de download e o parágrafo sempre no mesmo modelo. Para ler o que foi coletado há um script de leitura rodado com o <code>--filter</code> do pnpm.",
    "Na starter o pacote já existe; ao receber o prompt o agente confirma as 20 empresas e roda os testes, porque o CLAUDE.md exige um teste para cada requisito."
   ],
   "como": [
    "<code>pnpm collect</code> (raiz) chama <code>pnpm --filter @hero/corpus run collect</code>, que executa <code>tsx src/collect/run.ts</code>.",
    "<code>lerEmpresas()</code> lê <code>data/empresas.csv</code> e padroniza <code>cdCvm</code> com 6 dígitos (<code>padStart(6, '0')</code>).",
    "<code>coletarUltimosTrimestres</code> parte do trimestre corrente e anda para trás (até 8 candidatos), aceitando um trimestre se pelo menos 75% das empresas têm dado, e para ao juntar 4 trimestres.",
    "Para 1T a 3T lê o ITR do ano; para o 4T combina DFP anual menos o acumulado do ITR do 3T (receita, lucro bruto, lucro líquido, caixa). Ativo e patrimônio vêm direto do DFP.",
    "Contas: receita <code>3.01</code>, lucro bruto <code>3.03</code>, ativo total <code>1</code>, caixa operacional <code>6.01</code> por código; <b>lucro líquido e patrimônio líquido por texto de <code>DS_CONTA</code></b> com <code>ST_CONTA_FIXA=S</code>, escolhendo o código mais raso e a maior <code>VERSAO</code>.",
    "Consolidado quando existe, individual quando não (caso Sendas/Assaí), sempre as quatro demonstrações da mesma variante.",
    "<code>paraCanonico</code> converte <code>MIL</code> em reais multiplicando por 1000, uma única vez; <code>gerarParagrafo</code> monta o texto com YoY e QoQ da receita, margem líquida e caixa operacional.",
    "Falha de fonte: <code>fetch-cvm.ts</code> lança <code>ArquivoCvmNaoEncontradoError</code> só em HTTP 404; <code>carregarDemonstrativos</code> captura essa classe, avisa e devolve demonstrativos vazios. Outro erro de rede continua estourando.",
    "Conferência: <code>pnpm --filter @hero/corpus run report [TICKER...]</code> imprime os seis indicadores para comparar com o release oficial."
   ],
   "aplica": [
    "Qualquer RAG sobre dados estruturados (financeiros, catálogo, métricas): gere o texto indexável por template a partir do dado, não por LLM.",
    "Ingestão de fontes públicas com esquema irregular: localize campos por rótulo estável quando o código muda entre categorias.",
    "Pipelines que dependem de arquivos publicados por terceiros: trate ausência (404) como estado esperado, distinto de falha real.",
    "Normalização de unidades (milhares, milhões): converta uma vez, na fronteira, e guarde o valor cheio."
   ],
   "pros": [
    "Custo zero por execução e resultado reprodutível byte a byte (teste de snapshot).",
    "Sem alucinação numérica: o texto deriva do dado estruturado.",
    "Metadados (fonte, período, data) permitem citação com data-base e política de expiração.",
    "JSONs versionados no repo: a coleta só roda na preparação do material."
   ],
   "contras": [
    "O template é rígido: só cobre o que foi previsto (no repo, 3 dos 6 indicadores entram no texto).",
    "Busca por descrição de conta depende de rótulos da CVM; mudança de texto quebra a coleta.",
    "Dados são snapshot: ficam desatualizados até a próxima coleta.",
    "Ignorar silenciosamente o que falta pode mascarar buracos no corpus se ninguém ler os avisos."
   ],
   "traps": [
    "Gerar o parágrafo com LLM \"só dessa vez\": viola a regra \"nunca\" do CLAUDE.md e reabre custo e alucinação.",
    "Esquecer a escala: valor em milhares tratado como reais erra por 1000x.",
    "Assumir código de conta fixo entre bancos e indústrias: lucro líquido e patrimônio mudam de posição.",
    "Tratar todo erro como bug do código: um 404 pode ser da fonte; decida a política (ignorar, repetir, falhar) conscientemente.",
    "Achado: o JSON do repo usa camelCase (<code>companyName</code>, <code>periodEnd</code>, <code>sourceUrl</code>, <code>fetchedAt</code>); o prompt da aula cita snake_case. As colunas do banco (<code>company_name</code>, <code>source_url</code>) são snake_case em <code>schema.ts</code>."
   ],
   "tip": "Sempre que um agente gerar um parser, peça um teste com fixture de uma linha real do CSV (como <code>__fixtures__/exemplo-dre.csv</code>) e abra o arquivo bruto antes de confiar nas colunas.",
   "cola": [
    [
     "CVM",
     "Comissão de Valores Mobiliários; publica os dados abertos usados como corpus."
    ],
    [
     "ITR / DFP",
     "Informações trimestrais (ITR) e demonstrações financeiras anuais (DFP)."
    ],
    [
     "CD_CONTA",
     "Código da conta no plano da CVM; não é estável entre setores."
    ],
    [
     "DS_CONTA",
     "Descrição textual da conta; usada para achar lucro líquido e patrimônio."
    ],
    [
     "ESCALA_MOEDA",
     "MIL (milhares) ou UNIDADE; o normalizador converte para reais."
    ],
    [
     "Template determinístico",
     "Parágrafo montado por regras fixas, sem LLM."
    ],
    [
     "YoY / QoQ",
     "Comparação com o mesmo trimestre do ano anterior / com o trimestre anterior."
    ],
    [
     "pnpm collect",
     "Comando que baixa, trata e grava os JSONs do corpus."
    ],
    [
     "Snapshot",
     "Estado dos arquivos de data/documentos na última coleta, versionado."
    ],
    [
     "ArquivoCvmNaoEncontradoError",
     "Erro específico de 404 que o coletor trata como dado ausente."
    ]
   ],
   "links": [
    [
     "Capstone Project AI Researcher",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
    ],
    [
     "AI Researcher Seed",
     "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
    ],
    [
     "packages/corpus (completo)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/corpus"
    ],
    [
     "select-quarters.ts",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/packages/corpus/src/collect/select-quarters.ts"
    ],
    [
     "Portal de Dados Abertos da CVM",
     "https://dados.cvm.gov.br"
    ]
   ],
   "codigo": [
    {
     "proj": "packages/corpus (src/collect, src/normalize, src/paragraphs, data/)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/corpus",
     "resumo": "Li todo o código-fonte do pacote (coleta, normalização, template), os nomes dos testes e os dados. Contei os arquivos por script de leitura de JSON. Não executei <code>pnpm collect</code> (depende de rede) nem os testes.",
     "fluxo": [
      "<code>data/empresas.csv</code>: 20 linhas (ticker, razao_social, cd_cvm, setor). Ex.: ITUB 19348, BBDC 906, VALE 4170, ELET \"Axia Energia S.A.\" 2437, ASAI 25372.",
      "<code>src/collect/cvm-urls.ts</code>: monta <code>https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/{ITR|DFP}/DADOS/{itr|dfp}_cia_aberta_{ano}.zip</code>.",
      "<code>src/collect/fetch-cvm.ts</code>: baixa e descompacta com <code>adm-zip</code> em <code>.cache</code>; 404 vira <code>ArquivoCvmNaoEncontradoError</code>, outros status viram <code>Error</code>.",
      "<code>src/collect/parse-csv.ts</code>: lê em <code>latin1</code>, separador <code>;</code>, sem biblioteca de CSV.",
      "<code>src/collect/select-quarters.ts</code> (508 linhas): <code>CONTAS</code> por código, <code>DESCRICOES_LUCRO_LIQUIDO</code> e <code>DESCRICOES_PATRIMONIO_LIQUIDO</code> por texto, <code>buscarConta</code>, <code>buscarContaPorDescricao</code>, 4T por subtração DFP menos ITR, <code>LIMIAR_COBERTURA = 0.75</code>.",
      "<code>src/normalize/to-canonical.ts</code>: <code>paraReais</code> multiplica por 1000 quando <code>escalaMoeda === 'MIL'</code>.",
      "<code>src/paragraphs/template.ts</code>: <code>gerarParagrafo</code> com <code>Intl.NumberFormat('pt-BR')</code> (bilhões ou milhões) e cláusulas YoY e QoQ omitidas quando ausentes.",
      "<code>data/documentos/*.json</code>: 20 arquivos, 80 documentos (4 por empresa: 2T25, 3T25, 4T25, 1T26), <code>fetchedAt</code> de 2026-08-08. Os 4T25 não têm <code>receitaMesmoTrimestreAnoAnterior</code>."
     ],
     "rodar": [
      "<code>pnpm collect</code> (rede; regrava data/documentos)",
      "<code>pnpm --filter @hero/corpus run report VALE ITUB</code> (lê os JSONs e imprime os indicadores)",
      "<code>pnpm --filter @hero/corpus run test</code> (Vitest; não executei)"
     ],
     "armadilhas": [
      "Achado: a aula diz que a busca das contas é \"pelo nome\"; no código só <b>lucro líquido e patrimônio líquido</b> são buscados por descrição. Receita (3.01), lucro bruto (3.03), ativo (1) e caixa (6.01) seguem por código, estáveis na amostra segundo o comentário do arquivo.",
      "Achado: o template só cita receita líquida, lucro líquido, margem líquida e caixa operacional; lucro bruto, ativo total e patrimônio líquido são coletados mas não entram no texto indexado (registrado no CLAUDE.md como achado do D.5).",
      "Achado: a falha de 2025 da demo não se reproduz no snapshot do repo (existe 4T25 para as 20 empresas). O tratamento atual cobre qualquer 404, não só 2025.",
      "Achado: no seed, <code>select-quarters.ts</code> já tem o tratamento de 404; o repo completo acrescenta testes (<code>select-quarters.test.ts</code>, <code>parse-csv.test.ts</code>, fixture) e exporta as funções puras para teste.",
      "Hipótese, não verifiquei contra o release: para bancos, a conta 3.01 usada como \"receita líquida\" pode não ser equivalente à receita líquida industrial (o parágrafo do ITUB diz R$ 102,8 bilhões)."
     ]
    }
   ]
  },
  {
   "id": "D11-04",
   "bloco": "d11-b0",
   "mod": "Unidade 1 · Aulas 6 e 7",
   "emoji": "🚀",
   "read": "14 min",
   "title": "Fundação GCP por prompts, Walking Skeleton e Deploy Zero",
   "short": "Sete prompts provisionam a nuvem com o gcloud, e um esqueleto mínimo (API com health check, contrato Zod, Angular, Docker Compose) vai à produção pela primeira vez via GitHub Actions.",
   "oneliner": "A fundação (projeto, APIs, Artifact Registry, Cloud SQL, Secret Manager, WIF, Firebase) é criada por <b>prompts ao Claude Code</b> que leem o <code>infra/README.md</code> e rodam o <code>gcloud</code> com aprovação. Em seguida o <b>walking skeleton</b> sobe em produção; o primeiro deploy costuma falhar porque o <b>Cloud Run nasce privado</b>, e o <code>capstone:check</code> valida de fora.",
   "vovo": [
    "Montar a fundação é como preparar um restaurante antes de abrir: alvará (projeto e conta de faturamento), ligar a água e a luz só do que vai usar (APIs), comprar a geladeira que demora a chegar (o banco, 20 a 30 minutos), guardar as chaves num cofre (Secret Manager) e cadastrar quem pode entregar mercadoria (Workload Identity).",
    "O walking skeleton é abrir a porta com o cardápio de uma linha só: o prato é um \"estou vivo\" (health check), mas já atende cliente de verdade. E a primeira vez a porta da rua está trancada por segurança (Cloud Run privado): o cardápio existe, mas ninguém de fora entra até você destrancar de propósito."
   ],
   "oque": [
    "<b>Aula 6</b>: provisiona a fundação com prompts ao Claude Code. O agente propõe e executa um comando por vez e você aprova cada um. O mesmo caminho serve a AWS ou Azure (CLI diferente). O SDK/CLI é parte do que se chama <b>IaC</b>.",
    "Conceitos: uma <b>conta de faturamento</b> pode ter N <b>projetos</b>, cada um com infraestrutura isolada; projeto novo nasce sem nenhuma API habilitada (<b>mínima permissão</b>), então o primeiro prompt habilita só as que serão usadas.",
    "Pré-requisito: instalar o <code>gcloud</code> e fazer <b>dois logins</b> (CLI e SDK/ADC); o Cloud SQL leva de 20 a 30 minutos, o resto é rápido.",
    "Os 7 prompts: (1) projeto <code>ai-researcher-capstone</code>, billing e APIs (Cloud Run, Cloud SQL Admin, Artifact Registry, Secret Manager, IAM Credentials); (2) repositório Docker no Artifact Registry em <code>us-central1</code>; (3) Cloud SQL Postgres 16 com pgvector, instância <code>ai-researcher-db</code>, tier <code>db-f1-micro</code>, banco <code>ai_researcher</code>, extensão <code>vector</code>, usuário <code>app_user</code> com senha gerada; (4) <code>database-url</code> no Secret Manager em formato de socket Unix, sem arquivo local; (5) Workload Identity Federation; (6) variáveis; (7) Firebase Hosting.",
    "Prompt 5 cria pool, provider restrito por <code>attribute.repository</code>, service account <code>github-actions-deployer</code> com as roles do README e o binding de impersonação. <b>Troque o repositório pelo seu</b> (fork ou repo próprio), ou o deploy falha.",
    "Prompt 6 tira identificadores do código: <code>GOOGLE_CLOUD_PROJECT_ID</code> no <code>~/.zshrc</code> e variáveis de repo <code>GCP_PROJECT_ID</code>, <code>GCP_WIF_PROVIDER</code>, <code>GCP_DEPLOY_SERVICE_ACCOUNT</code>. Não são sensíveis; existem porque cada aluno tem o seu projeto.",
    "Custo: ~R$ 50/mês com tudo online; só <b>Cloud SQL</b> e <b>Vertex AI</b> cobram de fato. O Cloud Run fica de fora da lista de propósito: nasce no primeiro deploy. A imagem Docker é escolhida (em vez de subir código) para simular o backend localmente.",
    "Segurança de secrets: nunca senha fixa (use aleatória, que ninguém precisa conhecer), nunca versionar. Se vazar no GitHub, <b>invalide e crie outro</b>; apagar não adianta (fica no <code>git log</code>) e rebase não é o caminho seguro. Cuidado com o que o agente imprime ao mexer em variáveis.",
    "<b>Aula 7</b>: dois repos. O Capstone tem o projeto completo, todas as tags e a branch starter (refazer ali causa conflito de merge porque a esteira já existe). O <b>Seed</b> tem só o estado da starter como <code>main</code>. Licença MIT; dá para trocar GCP por AWS ou Angular por React.",
    "Walking skeleton: API Fastify com <code>GET /api/health</code>, contrato Zod compartilhado em <code>packages/contracts</code> (<code>status: ok|degraded</code>, <code>database: ok|error</code>), app Angular 22 (standalone, signals, <code>resource()</code>) criado pela skill oficial <code>angular-new-app</code>, e Docker Compose com Postgres/pgvector.",
    "O health faz <code>SELECT 1</code> com timeout curto e nunca derruba o processo: banco fora do ar vira <code>degraded</code>. O prompt pede <code>.env</code> na raiz (gitignorado) com <code>DATABASE_URL</code> para localhost (não o nome do serviço do Compose), <code>.env.example</code> versionado e o script dev carregando o .env sem afetar produção.",
    "<code>ng analytics off</code> evita que o Angular CLI espere uma resposta interativa dentro do <code>pnpm dev</code>/turbo e trave a tela. <code>!pnpm dev</code> roda comando no shell sem sair da sessão do agente.",
    "<code>turbo prune --docker</code> separa o que pertence a cada projeto do monorepo para imagens eficientes. O Postgres do Compose é efêmero e <b>nunca é o Cloud SQL</b>.",
    "Workflow <code>deploy.yml</code>: job <code>test</code> (build, teste, lint) em todo PR; job <code>deploy</code> só em push na main e só após o teste, com WIF, imagem para o Artifact Registry, Cloud Run com acesso ao Cloud SQL e ao secret, build do Angular e Firebase Hosting. Instala pelo lockfile congelado.",
    "Primeiro deploy: o Cloud Run nasce <b>privado</b> e o Firebase não alcança a API (403), por isso a página pode mostrar <code>degraded</code> e <code>error</code>. Correção: <code>allUsers</code> com <code>roles/run.invoker</code>, após confirmar o risco; aceitável porque o <code>/api/health</code> não tem custo de LLM. Proteção contra abuso fica para a Aula 23.",
    "<code>capstone:check</code>: confere de fora requisitos não funcionais contra uma URL. Terá 11 checks; os três primeiros: endpoint público válido, deploy automatizado ok, segredos protegidos. Ao fim da unidade, crie a tag <code>v1</code>."
   ],
   "como": [
    "Instale <code>gcloud</code>, rode os dois logins e abra o Claude Code no repo; cada prompt manda ler <code>infra/README.md</code> e rodar <b>um comando por vez com aprovação</b>.",
    "Prompt 1 (resumo): \"Seguindo o infra/README.md, crie o projeto GCP ai-researcher-capstone, vincule à billing account e habilite as APIs necessárias... Rode um comando por vez e espere minha aprovação\".",
    "Prompt 4: monte a connection string do <code>app_user</code> em socket Unix (<code>?host=/cloudsql/...</code>) e grave como <code>database-url</code> sem escrever em arquivo. Se o secret já existir, o agente avisa que a senha antiga vale até o código reler o novo e pergunta se reseta.",
    "Prompt 7: o Firebase tem CLI próprio; o agente roda com <code>npx</code> (cerca de 5 minutos). Depois confira no console: Cloud SQL, projeto com billing, secret <code>database-url</code>, registry e Firebase.",
    "Local: <code>docker compose up -d</code> para o Postgres, <code>pnpm install</code>, <code>pnpm dev</code> (API na 3000, Angular com proxy de <code>/api</code> para <code>localhost:3000</code>, sem CORS).",
    "Reproduza do Seed: configure as 3 variáveis do GitHub, troque o project id no <code>.firebaserc</code>, faça commit e push na main e acompanhe a esteira no GitHub Actions.",
    "Se aparecer <code>degraded</code>: leia o log do Cloud Run e a resposta HTTP; 403 indica serviço privado, e o README também registra que a service account de execução precisa de <code>secretmanager.secretAccessor</code> em <code>database-url</code>.",
    "Libere o health publicamente (comando do README): <code>gcloud run services add-iam-policy-binding ai-researcher-api --region=us-central1 --member=allUsers --role=roles/run.invoker</code>.",
    "Valide: <code>pnpm capstone:check --url &lt;url&gt;</code> e depois <code>git tag v1 &amp;&amp; git push --tags</code>."
   ],
   "aplica": [
    "Provisionamento assistido por agente em qualquer nuvem, com aprovação comando a comando e um README de infra como fonte de verdade.",
    "Primeiro deploy de qualquer serviço: um health check que testa o banco de verdade e degrada sem derrubar o processo.",
    "Monorepos com Docker: <code>turbo prune --docker</code> para imagens menores e cache melhor.",
    "Auditoria externa de requisitos não funcionais: um script que bate na URL de produção e confere endpoint, deploy e vazamento de credencial."
   ],
   "pros": [
    "Walking skeleton em produção cedo prova a esteira, a rede e os secrets antes de existir lógica de negócio.",
    "Aprovar comando a comando mantém o humano no controle e vira aprendizado.",
    "Contrato Zod compartilhado dá a API e ao frontend o mesmo schema em runtime e em tipos.",
    "Instalar pelo lockfile garante que nada foi atualizado sem teste."
   ],
   "contras": [
    "Provisionar à mão por prompts não é reproduzível como IaC: o repo documenta, mas não versiona Terraform.",
    "O Cloud SQL leva 20 a 30 minutos e cobra mesmo sem uso.",
    "Tornar o Cloud Run público exige avaliar risco; só é seguro porque o endpoint ainda não custa LLM.",
    "Agente operando o terminal pode exibir variáveis sensíveis na tela."
   ],
   "traps": [
    "Deixar o repositório do curso no prompt do WIF: você não é dono, a federação não autentica e o deploy falha.",
    "Esperar o primeiro deploy verde: Cloud Run privado (403) e permissões de runtime são o caminho comum.",
    "Colocar secret em arquivo, mesmo \"temporário\"; vazou, invalide, não apague.",
    "Liberar <code>allUsers</code> em serviço que depois ganha custo de LLM sem rate limit.",
    "Achado: o prompt da aula manda criar <code>.env.example</code> e carregar o <code>.env</code> no script dev, mas o repo (seed e completo) não tem <code>.env.example</code> versionado e o <code>dev</code> da API é só <code>tsx watch src/index.ts</code>; <code>DATABASE_URL</code> precisa vir do ambiente."
   ],
   "tip": "Depois de cada prompt de provisionamento, peça ao agente o comando de leitura que prova o resultado (<code>gcloud ... describe</code>) e cole a saída no README; sem prova, trate como não verificado.",
   "cola": [
    [
     "Billing account",
     "Conta de faturamento; pode ter vários projetos isolados."
    ],
    [
     "Mínima permissão",
     "Projeto novo nasce sem APIs habilitadas; habilite só o necessário."
    ],
    [
     "ADC / dois logins",
     "Login do CLI e login das bibliotecas (SDK) no gcloud."
    ],
    [
     "Socket Unix do Cloud SQL",
     "Formato da connection string no Cloud Run: ?host=/cloudsql/..."
    ],
    [
     "Walking skeleton",
     "Esqueleto mínimo ponta a ponta já implantado."
    ],
    [
     "Health check",
     "GET /api/health com SELECT 1 no Postgres; reporta degraded sem derrubar."
    ],
    [
     "turbo prune --docker",
     "Isola o subgrafo de um app do monorepo para o build da imagem."
    ],
    [
     "Lockfile congelado",
     "pnpm install --frozen-lockfile: instala exatamente o que foi testado."
    ],
    [
     "roles/run.invoker",
     "Papel que, dado a allUsers, torna o Cloud Run público."
    ],
    [
     "capstone:check",
     "Script que audita de fora os requisitos não funcionais; 11 checks no repo completo."
    ],
    [
     "Tag v1",
     "Marco do fim da Unidade 1, ao concluir o deploy zero."
    ]
   ],
   "links": [
    [
     "Capstone Project AI Researcher",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
    ],
    [
     "AI Researcher Seed",
     "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
    ],
    [
     "apps/api",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api"
    ],
    [
     "apps/web",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/web"
    ],
    [
     "scripts/capstone-check.ts",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/scripts/capstone-check.ts"
    ],
    [
     "infra/README.md",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/infra/README.md"
    ]
   ],
   "codigo": [
    {
     "proj": "apps/api, packages/contracts (seed e completo)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed/tree/main/apps/api",
     "resumo": "Li o API e o contrato do seed (estado da aula) e comparei com o completo por diff. Não rodei testes nem servidor.",
     "fluxo": [
      "<code>apps/api/src/index.ts</code>: <code>build()</code> e <code>listen({ port: Number(process.env.PORT ?? 3000), host: '0.0.0.0' })</code>; erro no listen vira log e <code>process.exit(1)</code>.",
      "<code>apps/api/src/app.ts</code>: <code>Fastify({ logger: true })</code>, registra o plugin de health sob o prefixo <code>/api</code> e aceita <code>checkDatabase</code> injetável (facilita teste).",
      "<code>apps/api/src/db.ts</code>: <code>Pool</code> do <code>pg</code> com <code>connectionTimeoutMillis: 2000</code>, listener <code>pool.on('error')</code> (sem ele o Node derruba o processo) e <code>checkDatabase()</code> com <code>SELECT 1</code> que devolve <code>false</code> em exceção.",
      "<code>apps/api/src/routes/health.ts</code>: <code>GET /health</code> responde <code>healthResponseSchema.parse({ status, database })</code>; <b>HTTP 200 mesmo em degraded</b>.",
      "<code>packages/contracts/src/health.ts</code>: <code>z.object({ status: z.enum(['ok','degraded']), database: z.enum(['ok','error']) })</code> (zod 4.4.3) e tipo <code>HealthResponse</code>; teste rejeita <code>status: 'up'</code>.",
      "<code>apps/api/src/app.test.ts</code>: 2 testes com <code>app.inject()</code> (banco ok e banco falhando).",
      "<code>apps/api/package.json</code>: scripts <code>dev</code> (<code>tsx watch src/index.ts</code>), <code>build</code>, <code>start</code>, <code>test</code>; dependências <code>fastify 5.11.2</code> e <code>pg 8.22.0</code>."
     ],
     "rodar": [
      "<code>docker compose up -d postgres</code> e <code>DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_researcher pnpm --filter @hero/api dev</code> (URL do docker-compose.yml; não executei)",
      "<code>curl localhost:3000/api/health</code> deve devolver <code>{\"status\":\"ok\",\"database\":\"ok\"}</code>",
      "<code>pnpm test</code> (Turborepo; <code>test</code> depende de <code>build</code>)"
     ],
     "armadilhas": [
      "Achado: o timeout curto do health é de <i>conexão</i> (2000 ms); o <code>SELECT 1</code> em si não tem timeout de consulta no código.",
      "Achado: no repo completo o health ganha <code>config: { rateLimit: false }</code> (Bloco G), não presente no seed.",
      "Achado: a UI do seed só mostra <code>status: ... · database: ...</code> se a API responde; em erro HTTP (como o 403 do Cloud Run privado) o texto é \"Não foi possível consultar /api/health.\", não <code>degraded</code>/<code>error</code> como a aula descreve. <code>degraded</code> aparece quando a API responde 200 mas o banco falha (ex.: falta de permissão no secret)."
     ]
    },
    {
     "proj": "apps/web, docker-compose.yml, infra/docker (seed)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed/tree/main/apps/web",
     "resumo": "Li o app Angular mínimo, o proxy, o Compose e os Dockerfiles do seed. Não subi o Compose nem o ng serve.",
     "fluxo": [
      "<code>apps/web/src/app/api/health.service.ts</code>: <code>HttpClient.get&lt;HealthResponse&gt;('/api/health')</code> com <code>firstValueFrom</code>; tipa com o contrato de <code>@hero/contracts</code>.",
      "<code>apps/web/src/app/app.ts</code>: <code>resource({ loader: () =&gt; healthService.fetchHealth() })</code>; <code>app.html</code> usa <code>@if (health.isLoading())</code>, <code>health.error()</code> e <code>health.value()</code>.",
      "<code>apps/web/proxy.conf.json</code>: <code>/api</code> para <code>http://localhost:3000</code>; <code>dev</code> é <code>ng serve --proxy-config proxy.conf.json</code>. Dependências <code>@angular/*</code> <code>^22.0.0</code>.",
      "<code>docker-compose.yml</code>: <code>pgvector/pgvector:pg16</code> (sem volume, efêmero, healthcheck <code>pg_isready</code>), <code>api</code> na 3000 com <code>DATABASE_URL=postgresql://postgres:postgres@postgres:5432/ai_researcher</code> e <code>web</code> na 8080.",
      "<code>infra/docker/api.Dockerfile</code>: multi-stage com <code>turbo prune @hero/api --docker</code>, <code>pnpm install --frozen-lockfile</code>, usuário não-root e <code>CMD [\"node\",\"apps/api/dist/index.js\"]</code>.",
      "<code>infra/docker/web.Dockerfile</code> + <code>nginx.conf</code>: serve o build e repassa <code>/api/</code> para <code>http://api:3000/api/</code>."
     ],
     "rodar": [
      "<code>docker compose up --build</code> (web em http://localhost:8080; não executei)",
      "<code>pnpm dev</code> (turbo roda api e web em watch)"
     ],
     "armadilhas": [
      "Achado: o Compose usa <code>postgres</code> como host (rede Docker), enquanto o dev local fora do Compose precisa de <code>localhost</code>, exatamente a pegadinha citada no prompt da aula.",
      "Achado: <code>ng analytics off</code> grava na configuração global do Angular CLI, não no repo (busca por \"analytics\" em <code>angular.json</code> sem resultado); cada máquina precisa rodar.",
      "Achado: o Seed já contém <code>apps/api</code>, <code>apps/web</code>, <code>deploy.yml</code> e <code>capstone-check.ts</code>, ou seja, o resultado da Aula 7; reproduzir os prompts ali significa refazer ou conferir arquivos existentes."
     ]
    },
    {
     "proj": ".github/workflows/deploy.yml, scripts/capstone-check.ts, firebase.json, Makefile (completo)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/.github/workflows",
     "resumo": "Li o workflow e o capstone-check do seed (3 checks) e do completo (11), o firebase.json e o Makefile. Não executei a esteira nem o check.",
     "fluxo": [
      "<code>.github/workflows/deploy.yml</code> (seed): gatilhos <code>push</code> em main e <code>pull_request</code>; job <code>test</code> e job <code>deploy</code> com WIF, build/push da imagem por <code>${{ github.sha }}</code>, <code>deploy-cloudrun@v3</code> com <code>secrets: DATABASE_URL=database-url:latest</code>, build Angular via <code>pnpm turbo run build --filter=@hero/web</code> e <code>firebase-tools deploy --only hosting</code>.",
      "<code>scripts/capstone-check.ts</code> (seed): item 1 faz <code>fetch</code> de <code>/api/health</code> e exige <code>resposta.ok</code> e HTTPS; item 2 consulta o último run de <code>deploy.yml</code> por <code>gh api</code>; item 3 varre <code>git ls-files</code> em busca de <code>.env</code> e padrões de chave privada, <code>AKIA...</code> e <code>AIza...</code>.",
      "Saída: relatório com <code>SCORE: n/3 e a mensagem de que os itens 4 a 12 chegam nos próximos blocos</code>; <code>process.exitCode</code> 0 só se todos passam.",
      "<code>scripts/capstone-check.ts</code> (completo): 11 itens numerados 1 a 11 (inclui testes no CI, degradação graciosa, traces, rate limit, rollback, custo, guardrail e README); <code>main</code> ordena por número no relatório.",
      "<code>firebase.json</code>: rewrite <code>/api/**</code> para o Cloud Run e <code>**</code> para <code>/index.html</code>.",
      "<code>Makefile</code> (só no completo): um alvo <code>destroy</code> que chama <code>pnpm destroy</code>.",
      "Tag <code>v1</code> no repo completo aponta para o commit \"Libera acesso público ao Cloud Run e confirma capstone:check 3/3\" (18 commits no histórico até ali); o seed não tem tags."
     ],
     "rodar": [
      "<code>pnpm capstone:check --url https://&lt;sua-url&gt;</code> (precisa do <code>gh</code> autenticado para o item 2; não executei)",
      "<code>gh variable set GCP_PROJECT_ID --body &lt;id&gt;</code>, <code>GCP_WIF_PROVIDER</code>, <code>GCP_DEPLOY_SERVICE_ACCOUNT</code>",
      "<code>gh run list --workflow=deploy.yml</code>"
     ],
     "armadilhas": [
      "Achado: a aula diz \"11 checks\"; o repo completo implementa 11 (o item 12 do plano, showcase, não existe no código), mas <code>docs/hero-project-plano.md</code>, o <code>docs/hero-project-tarefas.md</code> (\"Doze verificações\") e o texto do seed ainda dizem 12.",
      "Achado: o item 2 do check usa a última run do workflow, de qualquer branch (<code>workflow_runs[0]</code>), e não filtra por main.",
      "Achado: o passo que torna o Cloud Run público não está no <code>deploy.yml</code>; foi manual (gcloud), registrado no README com data de 2026-08-08.",
      "Achado: o item 3 só verifica o que está commitado em <code>HEAD</code> com poucos padrões de credencial; não varre o histórico do git, então um vazamento antigo não é detectado (por isso a aula insiste em invalidar)."
     ]
    }
   ]
  },
  {
   "id": "D11-05",
   "bloco": "d11-b1",
   "mod": "Unidade 2 · Aula 8",
   "emoji": "🧲",
   "read": "9 min",
   "title": "pgvector, embeddings e o script de seed",
   "short": "Postgres vira banco vetorial: tabela com vector(768), índice HNSW por cosseno e seed em lotes de 10 com upsert.",
   "oneliner": "O RAG do projeto é uma busca de <b>proximidade por cosseno</b> entre o embedding da pergunta e o de cada documento, no <b>Postgres com pgvector</b>. A tabela <code>documentos</code> nasce por migration Drizzle (vector(768) + índice <b>HNSW</b>) e o <code>pnpm seed</code> gera os embeddings no Vertex AI em lotes de 10 e grava com upsert por (ticker, period).",
   "vovo": [
    "Pense numa biblioteca onde, em vez de organizar os livros por título, alguém coloca cada livro numa posição de um mapa gigante, e livros que falam de coisas parecidas ficam perto. Quando você faz uma pergunta, ela também vira um ponto no mapa e o bibliotecário devolve os livros mais próximos desse ponto.",
    "O índice HNSW é um atalho de bibliotecário: em vez de medir a distância até todos os livros, ele anda por andares do mapa e chega rápido na região certa. Quase sempre acerta, mas de vez em quando deixa passar um livro que estava logo ali."
   ],
   "oque": [
    "<b>RAG</b> (apostila): dada a pergunta, achar entre centenas de documentos os poucos que a respondem e entregá-los como contexto. Os dados da CVM (já normalizados em JSON na Unidade 1) vão para um banco em vez de o agente buscar tudo sozinho, para reduzir alucinação e pegar informação incorreta.",
    "Busca textual (<code>LIKE</code>) falha porque depende das mesmas palavras: 'rentável' não casa com 'rentabilidade'. O banco vetorial resolve por significado, não por string.",
    "<b>Embedding</b>: matriz numérica de N dimensões que representa um texto. A pergunta também vira embedding na etapa de retrieve, e o banco calcula a proximidade entre os pontos.",
    "<b>Top-k</b>: os k pontos mais próximos da pergunta (3, 10, conforme config). O banco traduz os pontos de volta em texto e eles entram no prompt. Menos alucinação não é alucinação zero: a arquitetura precisa de uma conferência.",
    "<b>pgvector</b> habilita o Postgres como banco vetorial sem infra nova (alternativas citadas: Pinecone, Weaviate, bancos vetoriais das nuvens). O SQL continua o mesmo, mudam o tipo <code>vector</code> e os operadores de distância (simples, cosseno, produto interno). O projeto usa <b>cosseno</b>.",
    "<b>HNSW</b> organiza os registros em camadas. Sem índice, a busca é full scan (aceitável com os 80 registros do projeto); com índice é rápida porém <b>aproximada</b>: o registro mais adequado pode ficar fora do top-k. Se nenhuma perda é aceitável, a apostila aponta outro caminho: tabelas relacionais comuns e um agente instruído a dizer que não achou.",
    "<b>Drizzle</b> é usado mais pelas migrations (rastreabilidade e rollback) do que pelas consultas, que são mais SQL. Gerar a migration não é aplicá-la: <code>pnpm db:migrate</code> aplica.",
    "<b>Embeddings: custo e consistência</b>. Barato porque a carga é rara (uma vez ou a cada trimestre) e a busca é consultada o tempo todo. O modelo da carga e o da busca <b>têm de ser o mesmo</b>, senão a busca não encontra direito.",
    "<b>768 dimensões</b>: o Vertex AI devolve 3.072 por padrão e a extensão aceita no máximo 2.000 (para indexar); o README de infra fixa 768. Sem esse parâmetro o vetor estoura o tamanho da coluna."
   ],
   "como": [
    "1) Prompt ao Claude Code: schema Drizzle em <code>packages/agent/src/db/schema.ts</code> com todos os campos do corpus, os seis indicadores como bigint, <code>paragraph</code>, coluna <code>embedding vector(768)</code>, índice único em (ticker, period) e índice HNSW com operador de cosseno. Gerar a migration com drizzle-kit.",
    "2) No repo seed o Drizzle ainda não está nas dependências: o agente pergunta antes de instalar (regra do CLAUDE.md). Gerar: <code>pnpm --filter @hero/agent run db:generate</code>.",
    "3) Subir o Postgres local por Docker (imagem <code>pgvector/pgvector:pg16</code>) e aplicar: <code>pnpm db:migrate</code>. Conferir no banco a extensão e a tabela <code>documentos</code> no schema <code>public</code>.",
    "4) Prompt do seed: <code>packages/agent/src/seed/run.ts</code> lê todos os JSONs de <code>packages/corpus/data/documentos/</code>, valida com zod, chama o Vertex AI em <b>lotes de 10</b> (não um por vez), insere via Drizzle com <b>upsert por (ticker, period)</b>.",
    "5) A criação do cliente de embeddings reais fica numa função própria porque o modo DEMO (Aula 14) troca por um fake sem rede.",
    "6) Executar: <code>pnpm seed</code>. Rodar de novo atualiza em vez de duplicar. Cada linha fica com id, parágrafo e embedding (um campo numérico multidimensional, parecido com um blob).",
    "7) Quando um comando falha dentro do Claude Code, o agente investiga sozinho (na demo, adicionou o script que faltava no mesmo padrão do <code>collect</code>). O prefixo <code>!</code> roda o comando no shell sem gastar tokens."
   ],
   "aplica": [
    "RAG sobre base pequena ou média que já vive em Postgres: evita um segundo banco para operar.",
    "Busca semântica em FAQ, base de conhecimento, catálogo ou documentos internos com pergunta em linguagem natural.",
    "Pipelines de carga raros (trimestral) com consulta frequente, onde o custo de embedding é irrelevante frente à busca.",
    "Casos em que a idempotência da carga importa: seed reexecutável com upsert por chave natural."
   ],
   "pros": [
    "Sem infra nova: mesmo Postgres, mesmo SQL, migrations versionadas e rollback.",
    "Cosseno + HNSW dá busca rápida em bases grandes sem mudar a consulta.",
    "Upsert por chave natural deixa o seed idempotente.",
    "Carga em lote reduz chamadas ao Vertex AI e tempo de seed."
   ],
   "contras": [
    "HNSW é aproximado: mais um elemento não determinístico no RAG, e o melhor documento pode sair do top-k.",
    "Trocar o modelo de embedding invalida tudo que já está indexado (reindexar).",
    "Limite de 2.000 dimensões do índice força truncar o vetor (768), com perda de informação que a apostila não quantifica.",
    "Menos alucinação não é zero: o RAG não substitui conferência."
   ],
   "traps": [
    "Gerar a migration e achar que o banco está pronto: gerar não é aplicar (apostila).",
    "Usar um modelo de embedding na carga e outro na busca: a busca 'não encontra direito'.",
    "Esquecer o parâmetro de dimensão: o Vertex devolve 3.072 e estoura o vector(768).",
    "Criar índice HNSW sem informar o operador: ele tem de casar com o operador da consulta (aqui <code>vector_cosine_ops</code> e <code>&lt;=&gt;</code>).",
    "Tratar o índice aproximado como determinístico em domínio que não tolera perda."
   ],
   "tip": "Antes de confiar no HNSW, meça: rode a mesma consulta com e sem índice (<code>SET enable_indexscan = off</code>) e compare os ids do top-5. Com 80 linhas o full scan é suficiente e elimina a perda.",
   "cola": [
    [
     "RAG",
     "Buscar contexto relevante numa base e entregá-lo ao prompt da LLM."
    ],
    [
     "Embedding",
     "Vetor numérico de N dimensões que representa um texto."
    ],
    [
     "Top-k",
     "Os k vizinhos mais próximos da pergunta."
    ],
    [
     "pgvector",
     "Extensão do Postgres com tipo vector, operadores de distância e índices."
    ],
    [
     "Distância do cosseno",
     "Operador <code>&lt;=&gt;</code>; o projeto obtém similaridade como 1 menos a distância."
    ],
    [
     "HNSW",
     "Índice em camadas para busca de vizinhos: rápido, aproximado."
    ],
    [
     "vector(768)",
     "Coluna do embedding, limitada porque o índice não passa de 2.000 dimensões."
    ],
    [
     "Upsert",
     "Insert que atualiza em conflito; aqui por (ticker, period)."
    ],
    [
     "Drizzle",
     "ORM/gerador de migrations usado no agente."
    ],
    [
     "Full scan",
     "Sem índice: calcula a distância contra todas as linhas."
    ]
   ],
   "links": [
    [
     "Capstone Project AI Researcher",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
    ],
    [
     "AI Researcher Seed",
     "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
    ],
    [
     "packages/agent (schema, seed, embeddings)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent"
    ],
    [
     "pgvector",
     "https://github.com/pgvector/pgvector"
    ]
   ],
   "codigo": [
    {
     "proj": "packages/agent (src/db/schema.ts, migrations/, src/seed/, src/embeddings.ts), docker-compose.yml",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent",
     "resumo": "Li schema, as duas migrations, drizzle.config.ts, o seed completo, o cliente de embeddings, package.json e o docker-compose. Contei o corpus: 20 arquivos JSON com 80 documentos no total (confere com os '80 registros' da aula). Não executei nada (sem Docker nem credencial Vertex).",
     "fluxo": [
      "<code>packages/agent/src/db/schema.ts</code>: tabela <code>documentos</code> com <code>embedding: vector('embedding', { dimensions: EMBEDDING_DIMENSIONS })</code>, <code>EMBEDDING_DIMENSIONS = 768</code>, <code>uniqueIndex('documentos_ticker_period_idx')</code> e <code>index('documentos_embedding_idx').using('hnsw', table.embedding.op('vector_cosine_ops'))</code>.",
      "<code>packages/agent/migrations/0000_*.sql</code>: começa com <code>CREATE EXTENSION IF NOT EXISTS vector;</code> e cria a tabela e os dois índices. <code>0001_*.sql</code> cria <code>documentos_web</code> (Aula 11).",
      "<code>packages/agent/src/db/migrate.ts</code>: usa <code>migrate()</code> do drizzle com <code>pg.Pool</code> e <code>DATABASE_URL</code>; é o que o script <code>db:migrate</code> roda via <code>tsx</code>.",
      "<code>packages/agent/src/seed/run.ts</code>: <code>semear()</code> lê JSONs, <code>TAMANHO_LOTE = 10</code>, <code>embeddings.embedDocuments</code> por lote, <code>insert().onConflictDoUpdate({ target: [ticker, period] })</code> com <code>excluded.*</code>, loga progresso.",
      "<code>packages/agent/src/seed/lotes.ts</code> (<code>emLotes</code>), <code>read-documentos.ts</code> (zod <code>documentosArraySchema</code>) e <code>to-row.ts</code> (<code>paraLinha</code>): peças pequenas e testáveis do seed.",
      "<code>packages/agent/src/embeddings.ts</code>: <code>criarEmbeddingsReal()</code> usa <code>VertexAIEmbeddings</code> com modelo <code>MODEL_EMBEDDING</code> (default <code>gemini-embedding-001</code>), <code>location</code> default <code>us-central1</code>, <code>dimensions: 768</code>, <code>apiKey: ''</code> para forçar ADC. Exige <code>GOOGLE_CLOUD_PROJECT_ID</code>.",
      "<code>docker-compose.yml</code>: serviço <code>postgres</code> com imagem <code>pgvector/pgvector:pg16</code>, banco <code>ai_researcher</code>, sem volume (dados somem no <code>docker compose down</code>)."
     ],
     "rodar": [
      "<code>docker compose up -d postgres</code>",
      "<code>export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_researcher</code>",
      "<code>pnpm install &amp;&amp; pnpm db:migrate</code>",
      "<code>gcloud auth application-default login</code> e <code>export GOOGLE_CLOUD_PROJECT_ID=...</code> (ver infra/README.md), depois <code>pnpm seed</code>",
      "Testes do seed: <code>pnpm --filter @hero/agent test</code> (não executei)"
     ],
     "armadilhas": [
      "Achado: os nomes do código são em português (<code>semear</code>, <code>emLotes</code>, <code>criarEmbeddingsReal</code>, tabela <code>documentos</code>); o prompt da aula também fala em português. Ao refazer, o padrão do repo é esse.",
      "Achado: o código tem comentários explicando o limite de 2.000 dimensões e o motivo de <code>apiKey: ''</code> (a lib usaria GOOGLE_API_KEY e a Predict API devolveria 401). É um detalhe de autenticação que a aula não menciona.",
      "Achado: a aula diz que o Vertex devolve 3.072 por padrão e que o README fixa 768; no código o limite é a constante <code>EMBEDDING_DIMENSIONS</code> usada tanto no schema quanto no cliente, então os dois não divergem.",
      "Achado: o docker-compose é efêmero de propósito (sem volume): depois de reiniciar é preciso migrar e semear de novo.",
      "Achado: <code>criarEmbeddings()</code> (grafo) respeita <code>DEMO=true</code>, mas <code>criarEmbeddingsReal()</code> do seed nunca, por design."
     ]
    }
   ]
  },
  {
   "id": "D11-06",
   "bloco": "d11-b1",
   "mod": "Unidade 2 · Aula 9",
   "emoji": "🎯",
   "read": "9 min",
   "title": "Os nós retrieve e grade",
   "short": "retrieve gera o embedding e traz o top-5; grade usa saída estruturada e uma regra explícita para decidir se o contexto basta.",
   "oneliner": "<b>retrieve</b> transforma a pergunta em embedding e busca os 5 documentos mais similares; <b>grade</b> classifica, com saída estruturada (<code>sufficient</code>, <code>missingAspects</code>), se esse contexto responde a pergunta. Os dois são factories que recebem as dependências por parâmetro (<b>inversão de dependência</b>), o que os torna testáveis sem rede nem banco.",
   "vovo": [
    "O retrieve é o auxiliar que vai ao arquivo e traz as cinco pastas mais parecidas com o assunto. O grade é o chefe que olha as pastas e diz: 'isso responde ou não?'. Se a pergunta é sobre o motivo de uma queda e as pastas só têm números, a resposta é não, mesmo que as pastas sejam da empresa certa.",
    "E a regra do chefe é só um bilhete escrito: não há mágica, é um prompt interno."
   ],
   "oque": [
    "Agente = partes chamadas <b>nós</b>. <b>retrieve</b>: pega a pergunta do estado, gera o embedding e consulta o Postgres. Devolve o top-k, <b>default 5</b>.",
    "O nó <b>não importa nenhum cliente global</b>: é uma factory que recebe um cliente de embeddings e uma função de busca. A função de busca fica em <code>db/retrieve-similar.ts</code>, usando o operador de cosseno do Drizzle; a similaridade é, por convenção, 1 menos a distância.",
    "<b>Inversão de dependência</b> resolve dois problemas: trocar de fornecedor (Gemini por OpenAI) e testar sem Vertex AI nem banco, com um fake que já devolve valores.",
    "Padrões de projeto importam mais com agentes: (1) custo, porque quanto menos o agente muda, mais barato; (2) revisão de PR, o gargalo atual. Refatoração tem de ser cirúrgica.",
    "Skills: ao criar o retrieve, o Claude Code chamou a skill <code>langgraph-node</code> (criada antes pelo professor). Sem skill de Drizzle, o agente lê o código da biblioteca. Ler o código continua sendo responsabilidade de quem desenvolve.",
    "<b>grade</b>: recebe <code>question</code> e <code>documents</code>, usa saída estruturada com schema zod <code>{ sufficient: boolean, missingAspects: string[] }</code>. O prompt fica em <code>prompts/grade.ts</code>.",
    "Regra de suficiência: contexto só numérico (indicadores por empresa e trimestre). Pergunta numérica coberta é suficiente; qualitativa (motivo, notícia, fato relevante, guidance, previsão de preço) é insuficiente mesmo com a empresa certa; sem documentos é insuficiente; indicador, empresa ou período ausente também, sem inventar número.",
    "Calibragem: regra fechada demais manda tudo para a web (mais custo e mais alucinação); aberta demais nunca busca e deixa a resposta incompleta. Varia por projeto.",
    "Cadeia de pensamentos aqui é um prompt interno que o usuário não vê. Na UI do projeto ela aparece por didática. 'Sem magia, são prompts e mais prompts' (o Claude Code é um harness)."
   ],
   "como": [
    "1) Prompt do retrieve: factory em <code>packages/agent/src/nodes/retrieve.ts</code> recebendo <code>embeddings</code> e <code>buscar</code>; função de busca em <code>db/retrieve-similar.ts</code>; top-k default 5.",
    "2) O nó faz só duas coisas: <code>embedQuery(question)</code> e <code>buscar(embedding, k)</code>; devolve <code>{ documents }</code>.",
    "3) O teste unitário injeta um embedding falso e uma busca falsa e roda sem Postgres e sem Vertex. Com <code>!</code> no Claude Code, filtre só o teste do retrieve (sem gastar tokens).",
    "4) Prompt do grade: nó em <code>nodes/grade.ts</code> + prompt em <code>prompts/grade.ts</code>, factory recebendo o cliente de LLM por parâmetro.",
    "5) O prompt monta primeiro o contexto: sem documentos aparece '(nenhum documento encontrado)'. Depois o system prompt aplica a regra de suficiência.",
    "6) Dois testes do grade: do prompt (sem LLM, verifica se monta o conteúdo certo) e do nó (fake chat model injetado).",
    "7) Quando <code>sufficient</code> é falso, o fluxo segue para o nó de busca na web usando <code>missingAspects</code> (Aulas 10 a 12)."
   ],
   "aplica": [
    "Qualquer RAG em que a base cobre só parte das perguntas: o grade decide quando recorrer a outra fonte.",
    "Nós de agente testáveis: factory com dependências por parâmetro, sem import de cliente global.",
    "Classificação estruturada com zod em vez de texto livre ('sim, parece suficiente') que precisa de parsing.",
    "Times que usam agente de código e precisam reduzir custo e esforço de revisão com padrões explícitos em skills."
   ],
   "pros": [
    "Nós pequenos e de responsabilidade única são fáceis de ler, testar e trocar.",
    "Saída estruturada evita texto livre ambíguo na decisão de rota.",
    "Fakes tornam os testes rápidos, determinísticos e sem custo.",
    "A regra de suficiência fica num único arquivo de prompt, fácil de calibrar."
   ],
   "contras": [
    "O grade é uma LLM: a decisão de suficiência continua não determinística.",
    "Uma chamada de LLM a mais por rodada (custo e latência).",
    "Regra mal calibrada degrada para web demais ou web nunca.",
    "Fake testa o contrato, não a qualidade real da classificação."
   ],
   "traps": [
    "Importar o cliente concreto dentro do nó: perde troca de fornecedor e teste sem rede.",
    "Pedir à LLM resposta em texto livre para decidir suficiência.",
    "Deixar a pergunta numérica autorizar a LLM a inventar número que não está no contexto.",
    "Achar que, com agente escrevendo o código, padrão de projeto deixou de importar (a aula diz o contrário).",
    "Não ler o código gerado pelo agente."
   ],
   "tip": "Escreva a regra de suficiência como tabela de casos (numérica coberta, qualitativa, vazio, período ausente) e transforme cada linha num caso de teste do prompt antes de mexer na redação.",
   "cola": [
    [
     "Nó",
     "Função do grafo que lê o estado e devolve uma atualização."
    ],
    [
     "Factory",
     "Função que recebe dependências e devolve o nó."
    ],
    [
     "Inversão de dependência",
     "O nó recebe o cliente por parâmetro em vez de importá-lo."
    ],
    [
     "Top-k (5)",
     "Quantidade de documentos que o retrieve devolve por padrão."
    ],
    [
     "Saída estruturada",
     "Resposta da LLM validada por schema (zod)."
    ],
    [
     "sufficient",
     "Booleano: o contexto basta para responder."
    ],
    [
     "missingAspects",
     "Lista do que falta; vira query da busca web."
    ],
    [
     "Skill",
     "Instrução reutilizável que fixa o padrão de código do agente."
    ],
    [
     "Harness",
     "As 'rédeas' em volta do modelo: skills e system prompts."
    ]
   ],
   "links": [
    [
     "packages/agent (nodes e prompts)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/nodes"
    ],
    [
     "Capstone Project AI Researcher",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
    ],
    [
     "AI Researcher Seed",
     "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
    ]
   ],
   "codigo": [
    {
     "proj": "packages/agent (src/nodes/retrieve.ts, grade.ts, db/retrieve-similar.ts, prompts/grade.ts, prompts/contexto.ts)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src",
     "resumo": "Li os dois nós, a função de busca, os dois prompts e o formatador de contexto. Não executei os testes (nodes/retrieve.test.ts, grade.test.ts).",
     "fluxo": [
      "<code>nodes/retrieve.ts</code>: <code>TOP_K_PADRAO = 5</code>; <code>makeRetrieveNode(embeddings, buscar)</code>; estado <code>{ question, topK? }</code>; devolve <code>{ documents }</code>. Interface <code>EmbeddingsClient</code> só com <code>embedQuery</code>.",
      "<code>db/retrieve-similar.ts</code>: <code>cosineDistance()</code> do Drizzle, <code>orderBy(distance).limit(k)</code>. <code>buscarDocumentosSimilares</code> já consulta corpus e web (evolução da Aula 11) e <code>combinarResultados</code> ordena por distância e corta em k.",
      "<code>nodes/grade.ts</code>: schema zod <code>gradeResultSchema</code>; <code>makeGradeNode(llm)</code> chama <code>llm.withStructuredOutput(schema).invoke(gradePrompt(...))</code> e devolve <code>{ sufficient, missingAspects, iterations: 1 }</code>.",
      "<code>prompts/grade.ts</code>: contexto formatado ou '(nenhum documento encontrado)', pergunta, e a regra: contexto só numérico, qualitativo é sempre insuficiente.",
      "<code>prompts/contexto.ts</code>: <code>formatarContexto</code> rotula docs do corpus como <code>[TICKER período]</code> e docs web como <code>[web: título]</code>; usado por grade e answer.",
      "<code>apps/api/src/routes/debug-retrieve.ts</code>: rota <code>GET /debug/retrieve</code> que usa <code>makeRetrieveNode</code> direto (uso da factory fora do grafo)."
     ],
     "rodar": [
      "<code>pnpm --filter @hero/agent test</code> (Vitest; não executei)",
      "Só o retrieve: <code>pnpm --filter @hero/agent exec vitest run src/nodes/retrieve.test.ts</code>",
      "<code>pnpm lint</code>"
     ],
     "armadilhas": [
      "Achado: o nó grade retorna <code>iterations: 1</code> e o grafo soma com um reducer; a aula só explica isso na Aula 12.",
      "Achado: o prompt do repo não diz 'não invente número' com essas palavras; ele diz que qualitativas são insuficientes mesmo com a empresa certa. A tabela da aula (indicador ausente é insuficiente) é comportamento esperado do modelo, não verificado por teste que eu tenha lido.",
      "Hipótese (não testada): como o prompt descreve o contexto como 'indicadores financeiros trimestrais, CVM' e manda tratar qualitativas como insuficientes, uma pergunta qualitativa respondida só por documentos web recuperados poderia continuar sendo classificada como insuficiente. A aula (Aula 11) descreve o oposto na segunda pergunta.",
      "Achado: o <code>retrieve.ts</code> aceita <code>topK</code> opcional no estado (usado pelo <code>/debug/retrieve</code>); a aula fala só em constante 5.",
      "Achado: o código mistura português e inglês (<code>buscar</code>, <code>makeRetrieveNode</code>)."
     ]
    }
   ]
  },
  {
   "id": "D11-07",
   "bloco": "d11-b1",
   "mod": "Unidade 2 · Aulas 10 e 11",
   "emoji": "🌐",
   "read": "12 min",
   "title": "Serper, adapter de busca e fallback web com TTL",
   "short": "SearchProvider como adapter (Serper ou Google), nó webSearch que busca só o que falta e grava chunks com TTL para o agente se retroalimentar.",
   "oneliner": "Quando o <b>grade</b> marca o contexto como insuficiente, o agente busca na web por um <b>SearchProvider</b> (padrão adapter, Serper por padrão). O nó <b>webSearch</b> pesquisa só os <code>missingAspects</code>, lê as 3 primeiras páginas, divide em chunks de ~1000 caracteres (overlap 100), embeda e grava em <code>documentos_web</code> com <b>TTL de 7 dias</b>; o retrieve passa a consultar as duas tabelas.",
   "vovo": [
    "Você pergunta ao arquivista algo que não está nas pastas. Ele vai à biblioteca da cidade, só procura o pedaço que faltava, tira cópias das páginas úteis e guarda no próprio arquivo com um carimbo de validade. Na próxima vez que alguém perguntar algo parecido, a resposta já está na casa.",
    "Mas notícia estraga: depois de uns dias o carimbo vence, a cópia deixa de ser consultada e ele vai buscar de novo."
   ],
   "oque": [
    "<b>Aula 10</b>: corpus CVM só tem números. Pergunta qualitativa ou trimestre ausente deixa o grade marcar insuficiente e o agente precisa de um provedor de busca na web.",
    "O <b>Google Custom Search</b> foi depreciado: não aceita novas chaves e quem tem chave precisa migrar até 1º de janeiro de 2027. O projeto usa o <b>Serper</b>: até 2.500 queries grátis, sem cartão, sem free tier permanente depois disso.",
    "A chave fica em <code>SERPER_API_KEY</code> (env ou Secret Manager), nunca no código. Se vazar, mesmo em repo privado, <b>invalide a credencial</b> (reset/apagar e criar outra); apagar do histórico não resolve.",
    "<b>Padrão adapter</b>: interface mínima <code>SearchProvider { search(query): Promise&lt;SearchResult[]&gt; }</code> com <code>SearchResult { title, snippet, url }</code>. Duas implementações com <code>fetch</code> nativo, sem SDK. <code>SEARCH_PROVIDER</code> escolhe (default serper). Testes com <code>vi.stubGlobal</code> no fetch, sem gastar cota.",
    "<b>Aula 11, nó web_search</b>: recebe <code>question</code> e <code>missingAspects</code>. Uma query por aspecto (<code>${question} ${aspecto}</code>) ou só a pergunta se a lista é vazia. Mandar a pergunta inteira anularia o grade.",
    "Por query: 3 primeiros resultados, <code>fetch</code> do HTML com timeout de 10 s, extração de texto sem tags, chunks de ~1000 caracteres com overlap 100, embedding por chunk (mesmo cliente do retrieve), um registro por chunk em <code>documentos_web</code> (query, title, content, sourceUrl, fetchedAt, expiresAt).",
    "Página fora do ar ou timeout: ignora o resultado e segue, sem derrubar o nó.",
    "<b>TTL</b> (dias, default 7): notícia pode deixar de ser válida e é menos confiável que a CVM; o corpus CVM é estático e perene, não expira. O TTL é aplicado <b>na consulta</b> (WHERE), não por cron (um cron de limpeza é opcional).",
    "<b>Retroalimentação</b>: 1ª pergunta qualitativa (ex.: fato relevante e preço das ações da Totvs) gera busca web e grava; uma pergunta parecida depois acha CVM + web no retrieve e o grade considera suficiente, sem nova busca. Depois de 7 dias o ciclo recomeça.",
    "Harness: padrões repetidos viram skills ('testar sempre com fakes', 'adapter para terceiros'). O <code>!</code> roda comandos sem gastar tokens."
   ],
   "como": [
    "1) Prompt da Aula 10: <code>packages/agent/src/search</code> com <code>SearchProvider</code>, <code>makeSerperProvider(apiKey)</code> (POST <code>https://google.serper.dev/search</code>, header <code>X-API-KEY</code>, corpo <code>{ q }</code>, mapeia <code>organic[]</code>) e <code>makeGoogleCustomSearchProvider(apiKey, cx)</code> (GET customsearch/v1, mapeia <code>items[]</code>).",
    "2) <code>criarSearchProvider()</code> em <code>index.ts</code> lê <code>SEARCH_PROVIDER</code>, valida as variáveis da chave e lança erro claro se faltar ou se o provider for desconhecido.",
    "3) Criar a chave no dashboard do Serper e exportar <code>SERPER_API_KEY</code>; rodar os testes do provedor (fetch fake).",
    "4) Prompt da Aula 11: nó <code>packages/agent/src/nodes/web-search.ts</code> (<code>makeWebSearchNode</code>) com tabela nova <code>documentos_web</code>, TTL em dias (default 7) e testes com fakes.",
    "5) Estender <code>buscarDocumentosSimilares</code> (o do retrieve): select em <code>documentos</code> e outro em <code>documentos_web</code> com <code>expires_at &gt; now</code>, combinados e ordenados só pela distância.",
    "6) O Claude Code também criou a tabela no ORM com migration e índice HNSW, ajustou o grade à nova regra e criou os testes.",
    "7) Fluxo no grafo: grade (insuficiente) → webSearch (grava) → retrieve (agora acha) → grade."
   ],
   "aplica": [
    "Agentes que precisam de fallback para fonte aberta quando a base interna não cobre a pergunta.",
    "Qualquer integração com API de terceiro que possa ser trocada: contrato mínimo + adapter + fábrica por env.",
    "Cache semântico com validade: gravar o resultado caro numa tabela vetorial com <code>expires_at</code>.",
    "Testes de integrações pagas sem consumir cota (fetch fake)."
   ],
   "pros": [
    "Troca de fornecedor por variável de ambiente, sem mexer no agente.",
    "Buscar só o que falta reduz custo e ruído.",
    "Retroalimentar o RAG poupa custo e latência nas perguntas seguintes.",
    "TTL na leitura é simples: sem job de limpeza para garantir validade."
   ],
   "contras": [
    "Conteúdo da web é menos confiável que a CVM e entra no mesmo contexto.",
    "Cada página vira vários embeddings e várias gravações (custo e latência do nó).",
    "Sem limpeza, a tabela de web acumula linhas expiradas.",
    "Serper some do free tier depois de 2.500 queries."
   ],
   "traps": [
    "Colocar a API key no código ou no repo: invalide a chave, não basta apagar.",
    "Mandar a pergunta inteira à busca e jogar fora o trabalho do grade.",
    "Sem timeout no fetch da página: o nó pode travar o grafo inteiro.",
    "Esquecer o filtro de expiração: o agente serve notícia velha para sempre.",
    "Misturar fornecedor no código do agente: o adapter existe para isso não acontecer."
   ],
   "tip": "Se o dado muda com o tempo, grave a data de expiração no registro e filtre na leitura; limpar com cron é otimização, não garantia.",
   "cola": [
    [
     "SearchProvider",
     "Interface mínima de busca: search(query) devolve title, snippet, url."
    ],
    [
     "Adapter",
     "Padrão que esconde o fornecedor atrás de um contrato."
    ],
    [
     "Serper",
     "API de busca Google, 2.500 queries grátis sem cartão."
    ],
    [
     "Google Custom Search",
     "Serviço depreciado; migrar até 1º/01/2027."
    ],
    [
     "SEARCH_PROVIDER",
     "Variável que escolhe serper (default) ou google."
    ],
    [
     "missingAspects",
     "O que falta, vindo do grade; vira a query."
    ],
    [
     "Chunk",
     "Pedaço de texto (~1000 caracteres, overlap 100) com embedding próprio."
    ],
    [
     "TTL",
     "Time to live: validade do dado, 7 dias por padrão."
    ],
    [
     "Retroalimentação",
     "Gravar no RAG o que veio da web para a próxima pergunta."
    ],
    [
     "documentos_web",
     "Tabela dos chunks web com expires_at."
    ]
   ],
   "links": [
    [
     "packages/agent/src/search",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/search"
    ],
    [
     "packages/agent/src/nodes/web-search.ts",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/nodes"
    ],
    [
     "Serper",
     "https://serper.dev/"
    ],
    [
     "Capstone Project AI Researcher",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
    ]
   ],
   "codigo": [
    {
     "proj": "packages/agent (src/search/, src/nodes/web-search.ts, src/web-search/, src/db/retrieve-similar.ts, src/db/upsert-web-document.ts, src/db/schema.ts)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src",
     "resumo": "Li todo o módulo de busca, o nó, os helpers de chunk, extração e conversão para linha, e a consulta combinada. Não executei os testes (search/*.test.ts, web-search.test.ts).",
     "fluxo": [
      "<code>search/types.ts</code>: <code>SearchResult { title, snippet, url }</code> e <code>SearchProvider</code>.",
      "<code>search/serper.ts</code>: <code>makeSerperProvider</code>, POST com <code>X-API-KEY</code>, <code>AbortSignal.timeout(10_000)</code>, erro se <code>!response.ok</code>, mapeia <code>organic</code> (link vira url).",
      "<code>search/google-custom-search.ts</code>: GET com <code>key</code>, <code>cx</code>, <code>q</code>; mapeia <code>items</code>.",
      "<code>search/index.ts</code>: <code>criarSearchProvider()</code>; <code>DEMO=true</code> devolve fixture; senão <code>SEARCH_PROVIDER ?? 'serper'</code>, exige <code>SERPER_API_KEY</code> (ou <code>GOOGLE_CUSTOM_SEARCH_API_KEY</code> + <code>GOOGLE_CUSTOM_SEARCH_CX</code>) e embrulha em <code>comResiliencia</code>.",
      "<code>search/resilient-search-provider.ts</code>: retry com backoff (3 tentativas, base 200 ms, dobra) e circuit breaker (3 falhas consecutivas abrem por 30 s); <code>CircuitoAbertoError</code>.",
      "<code>nodes/web-search.ts</code>: <code>RESULTADOS_POR_QUERY = 3</code>, <code>TTL_PADRAO_DIAS = 7</code>; queries por aspecto; try/catch por busca e por página; um embedding por chunk via <code>embedQuery</code>; devolve <code>{}</code> (o efeito é a escrita no banco).",
      "<code>web-search/chunk.ts</code>: <code>RecursiveCharacterTextSplitter</code> com <code>chunkSize 1000</code>, <code>chunkOverlap 100</code>; <code>extract.ts</code>: <code>html-to-text</code> e <code>buscarPagina</code> com timeout de 10 s; <code>to-row.ts</code>: <code>expiresAt = fetchedAt + ttlDias * 24h</code>.",
      "<code>db/retrieve-similar.ts</code>: <code>buscarNaWeb</code> filtra <code>gt(expiresAt, new Date())</code>; <code>combinarResultados</code> junta corpus e web e ordena por distância."
     ],
     "rodar": [
      "<code>export SERPER_API_KEY=...</code> (nunca no repo)",
      "<code>pnpm --filter @hero/agent test</code> (não executei)",
      "<code>SEARCH_PROVIDER=google</code> exige <code>GOOGLE_CUSTOM_SEARCH_API_KEY</code> e <code>GOOGLE_CUSTOM_SEARCH_CX</code>",
      "<code>DEMO=true</code> usa fixtures de busca e de página, sem rede"
     ],
     "armadilhas": [
      "Achado: a aula diz que o Claude Code 'alterou a tabela de documentos para registrar a origem'; no código <code>documentos_web</code> é uma tabela separada e a origem é inferida por <code>ticker</code> ausente (<code>RetrievedDoc.ticker?</code>, <code>title?</code>). A tabela <code>documentos</code> não tem coluna de origem.",
      "Achado: o título da aula fala em 'upsert retroativo', mas <code>db/upsert-web-document.ts</code> faz só <code>insert()</code>. Rodar a mesma pergunta depois do TTL grava chunks duplicados da mesma URL (os expirados ficam na tabela). Não há cron de limpeza no repo que eu tenha encontrado.",
      "Achado: <code>search/index.ts</code> envolve os providers em retry e circuit breaker, que a aula não menciona; e o nó engole erro do provider (<code>catch { continue }</code>) para degradar sem derrubar o grafo.",
      "Achado: o nó faz um <code>embedQuery</code> por chunk, em série, e não em lote como o seed (<code>embedDocuments</code>).",
      "Achado: o SearchResult traz <code>snippet</code>, mas o nó não o usa: grava o texto extraído da página inteira."
     ]
    }
   ]
  },
  {
   "id": "D11-08",
   "bloco": "d11-b1",
   "mod": "Unidade 2 · Aula 12",
   "emoji": "🔀",
   "read": "8 min",
   "title": "O grafo real: aresta condicional e guard do loop",
   "short": "StateGraph do LangGraph ligando retrieve, grade e webSearch, com aresta condicional e MAX_ITERATIONS = 2 vindo de um reducer no estado.",
   "oneliner": "O grafo é <code>START → retrieve → grade</code>, com uma <b>aresta condicional</b> a partir do grade: termina se <code>sufficient</code>, termina se <code>iterations &gt;= MAX_ITERATIONS</code> (2), senão vai ao <code>webSearch</code>, que sempre volta ao <code>retrieve</code>. O contador <code>iterations</code> vive <b>dentro do estado</b> (reducer que soma 1 por passada no grade), sem contador externo.",
   "vovo": [
    "É uma linha de montagem com um fiscal no meio. O fiscal olha a peça: se está boa, vai para a saída; se não está, volta para a bancada de ajuste e passa de novo. Mas o fiscal tem uma ficha com um contador: depois de duas inspeções, a peça sai de qualquer jeito, para a fábrica não ficar presa para sempre.",
    "O contador vai grudado na peça (o estado), não num caderno separado."
   ],
   "oque": [
    "Os nós retrieve, grade e web search existem soltos; a aula os liga com o <b>StateGraph</b> do LangGraph e fecha o loop com uma trava. Sem ela o agente gasta tokens para sempre.",
    "Regra de negócio = caminho entre nós (arestas). START → retrieve (sempre), retrieve → grade (sempre), grade → END se suficiente ou se <code>iterations</code> já atingiu <code>MAX_ITERATIONS = 2</code>, caso contrário grade → webSearch, e webSearch → retrieve (sempre).",
    "O webSearch não termina o grafo nem avalia: volta ao retrieve para buscar de novo e o grade reavalia.",
    "<b>Guard do loop</b>: o campo <code>iterations</code> soma 1 a cada passada pelo grade via <b>reducer</b>. A aula diz que a 2ª passada pela busca ocorre e que 'na terceira, o guard impede'.",
    "O prompt exige <code>GraphDeps</code> com dependências <b>por função</b> (<code>buscar</code>, <code>inserirDocumentoWeb</code>...), não o cliente de banco, para o grafo inteiro ser testável com fakes (inversão de dependência de novo).",
    "Testes com <code>app.stream()</code> coletando a sequência de nós: caminho direto (suficiente na 1ª rodada), loop completo (insuficiente) e guard cortando exatamente em MAX_ITERATIONS rodadas de grade mesmo com LLM fake sempre insuficiente.",
    "<code>graph.ts</code> tem ~60 linhas: constante, estado (pergunta, documentos, sufficient, missingAspects, iterations), interface de deps, função condicional, função que constrói (<code>addNode</code> x3, arestas) e <code>compile()</code>.",
    "Por que ficou simples: <b>responsabilidade única</b>. retrieve só busca no RAG, grade só avalia, webSearch só busca na web e adiciona ao RAG.",
    "O fundamento não muda com a ferramenta: dá para trocar modelo, nuvem, frontend e até LangGraph por ADK; o conceito é nós interligados. Quem domina o código é você."
   ],
   "como": [
    "1) Declare <code>MAX_ITERATIONS = 2</code> e o estado com <code>Annotation.Root</code>: <code>iterations</code> com reducer <code>(prev, next) =&gt; prev + next</code> e default 0.",
    "2) Cada nó devolve só o delta; o grade devolve <code>iterations: 1</code> e o reducer acumula.",
    "3) Escreva a função condicional pura que lê <code>sufficient</code> e <code>iterations</code> e devolve o próximo nó.",
    "4) <code>buildGraph(deps)</code> instancia cada nó com suas dependências, registra com <code>addNode</code> e liga com <code>addEdge</code>/<code>addConditionalEdges</code>; <code>compile()</code>.",
    "5) Teste com <code>app.stream()</code> e compare a lista de nós com a trilha esperada.",
    "6) Rode a suíte com <code>!</code> no Claude Code (sem gastar token) e passe o lint.",
    "7) Na Aula 13 o destino 'fim' vira o nó <code>answer</code> (ver armadilhas)."
   ],
   "aplica": [
    "Qualquer loop de agente (buscar, avaliar, tentar de novo) que precisa de um limite explícito de iterações.",
    "Orquestração em que cada nó é testável isoladamente e o grafo só decide rotas.",
    "Migração de framework: nós como funções puras reduzem o custo de trocar o orquestrador.",
    "Revisão de agentes de terceiros: perguntar onde está o guard do loop."
   ],
   "pros": [
    "Contador no estado viaja com a execução e é testável sem estado global.",
    "Roteamento fica em uma função pura de poucas linhas.",
    "Nós de responsabilidade única mantêm o grafo legível mesmo sem conhecer LangGraph.",
    "Deps por função permitem testar o grafo todo sem rede."
   ],
   "contras": [
    "O limite (2, 3, 4, 5) é ajuste fino: baixo demais responde com contexto incompleto.",
    "Cada volta custa uma LLM (grade) e uma busca web.",
    "Reducer somando exige que só um nó incremente, senão o contador conta errado.",
    "Acoplamento ao LangGraph nos nomes de canais e nós (ex.: nó e estado não podem ter o mesmo nome)."
   ],
   "traps": [
    "Loop sem limite: o agente queima tokens e pode nunca responder.",
    "Contador fora do estado (variável global ou closure): quebra em execuções concorrentes.",
    "Esquecer que o webSearch tem de voltar ao retrieve: sem isso o que foi gravado nunca é lido.",
    "Passar o cliente de banco direto para o grafo em vez de funções: teste exige Postgres.",
    "Confundir 'guard cortou' com 'contexto suficiente': a resposta final precisa saber a diferença."
   ],
   "tip": "Teste o guard com um LLM fake que sempre devolve insuficiente e assegure o número exato de passadas no grade; é o teste que impede alguém de remover a trava.",
   "cola": [
    [
     "StateGraph",
     "Grafo do LangGraph cujo estado passa de nó em nó."
    ],
    [
     "Aresta condicional",
     "Aresta cujo destino é decidido por uma função sobre o estado."
    ],
    [
     "MAX_ITERATIONS",
     "Limite de rodadas de grade; vale 2 no projeto."
    ],
    [
     "Reducer",
     "Função que combina o valor antigo com o novo de um campo do estado."
    ],
    [
     "iterations",
     "Contador no estado; soma 1 por passada no grade."
    ],
    [
     "GraphDeps",
     "Interface com as dependências dos nós, por função."
    ],
    [
     "START / END",
     "Marcadores de entrada e saída do grafo."
    ],
    [
     "Responsabilidade única",
     "Cada nó faz uma coisa só."
    ],
    [
     "compile()",
     "Fecha a definição e devolve o grafo executável."
    ]
   ],
   "links": [
    [
     "packages/agent/src/graph.ts",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src"
    ],
    [
     "LangGraph JS",
     "https://langchain-ai.github.io/langgraphjs"
    ],
    [
     "Capstone Project AI Researcher",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
    ]
   ],
   "codigo": [
    {
     "proj": "packages/agent (src/graph.ts, src/graph-deps.ts, src/graph.test.ts)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src",
     "resumo": "Li graph.ts (77 linhas no total), graph-deps.ts e os casos de graph.test.ts. Não executei os testes.",
     "fluxo": [
      "<code>graph.ts</code>: <code>export const MAX_ITERATIONS = 2</code> e <code>ResearchState = Annotation.Root({ question, documents, sufficient, missingAspects, iterations, answerText })</code>.",
      "<code>iterations</code> usa <code>reducer: (prev, next) =&gt; prev + next</code> com default 0; os demais campos usam <code>(_prev, next) =&gt; next</code>.",
      "<code>proximoNo(state)</code>: devolve <code>'answer'</code> se <code>sufficient</code>, <code>'answer'</code> se <code>iterations &gt;= MAX_ITERATIONS</code>, senão <code>'webSearch'</code>.",
      "<code>buildGraph(deps)</code>: <code>addNode</code> para <code>retrieve</code>, <code>grade</code>, <code>webSearch</code>, <code>answer</code>; arestas START→retrieve, retrieve→grade, grade→(condicional), webSearch→retrieve, answer→END; <code>compile()</code>.",
      "<code>GraphDeps</code>: <code>embeddings, buscar, gradeLlm, searchProvider, buscarPagina, inserirDocumentoWeb, answerLlm</code> (sete dependências, todas por função ou interface mínima).",
      "<code>graph-deps.ts</code>: <code>criarGraphDepsPadrao()</code> liga os clientes reais (ou fixtures com <code>DEMO=true</code>) e é usado pela API e pelo servidor MCP.",
      "<code>graph.test.ts</code>: casos do caminho direto, do loop, do guard por <code>MAX_ITERATIONS</code>, do estado final e da degradação graciosa com o provider fora do ar."
     ],
     "rodar": [
      "<code>pnpm --filter @hero/agent exec vitest run src/graph.test.ts</code> (não executei)",
      "<code>pnpm lint</code>"
     ],
     "armadilhas": [
      "Achado: no repo final a aresta condicional termina em <code>answer</code>, não em END, nos dois casos (suficiente ou guard). A aula da Aula 12 descreve END; o nó answer só entra na Aula 13.",
      "Achado: a aula diz que na terceira passada o guard impede a busca; no código o trace com LLM sempre insuficiente é <code>retrieve, grade, webSearch, retrieve, grade, answer</code>: duas rodadas de grade e <b>uma única</b> busca web. O teste <code>não entra em laço infinito</code> confirma que as rodadas de grade são exatamente <code>MAX_ITERATIONS</code>.",
      "Achado: o campo da resposta se chama <code>answerText</code> porque LangGraph não deixa nó e canal de estado compartilharem o nome <code>answer</code> (comentário no código).",
      "Achado: <code>graph.ts</code> tem 77 linhas contra as '~60' da aula (já inclui o nó answer).",
      "Achado: o <code>webSearch</code> engole falha do provider e o grafo chega ao answer com aviso de contexto incompleto (teste de degradação graciosa)."
     ]
    }
   ]
  },
  {
   "id": "D11-09",
   "bloco": "d11-b1",
   "mod": "Unidade 2 · Aula 13",
   "emoji": "🛡️",
   "read": "12 min",
   "title": "Nó answer, citação obrigatória, guardrail por código e SSE",
   "short": "A resposta final só com o contexto recuperado, fontes sempre anexadas, filtro regex que bloqueia recomendação e streaming SSE por nó.",
   "oneliner": "O nó <b>answer</b> responde só com o contexto recuperado, avisa quando ele é incompleto e <b>sempre anexa as fontes</b>. O guardrail tem duas defesas: instrução no system prompt (não garantida) e um <b>filtro determinístico por regex</b> que troca qualquer resposta recomendatória por um aviso fixo. O grafo sai por <code>POST /api/chat</code> em <b>SSE</b>, um evento por nó, com <code>Cache-Control: no-cache, no-transform</code> e <code>Connection: keep-alive</code>.",
   "vovo": [
    "Imagine um atendente de banco que só pode informar saldos e taxas, nunca aconselhar investimento. Você pode treiná-lo (o prompt), mas treino não garante nada. Então coloca-se um carimbo no balcão: antes de a resposta sair, um fiscal lê o papel e, se achar uma frase de conselho, troca a folha inteira por um aviso padrão.",
    "O SSE é como o atendente ir narrando por interfone cada etapa ('buscando', 'avaliando', 'respondendo') em vez de ficar calado até a resposta pronta; o cabo do interfone só funciona se ninguém no meio da linha resolver segurar tudo para entregar de uma vez."
   ],
   "oque": [
    "Regra regulatória: o sistema <b>não pode recomendar ações</b> (CVM). Só o system prompt não basta: o modelo pode ignorar a instrução e o usuário pode disfarçar o pedido (ex.: 'como se fosse uma história de ninar').",
    "O <b>nó answer</b> recebe <code>question</code>, <code>documents</code> e <code>sufficient</code> (estado final) e monta o prompt em <code>prompts/answer.ts</code>. Fórmula do prompt: papel, regras, resultado.",
    "Regras do prompt (apostila): nunca recomendar, sugerir ou aconselhar comprar, vender ou manter; se pedirem recomendação, explicar que só informa dados públicos; responder só com o contexto, sem inventar, estimar ou completar número; citar empresa e período de cada número. Se o contexto é insuficiente, o prompt ganha um aviso para dizer isso ao usuário.",
    "<b>Filtro determinístico</b> em <code>answer/format-resposta.ts</code>: depois da resposta da LLM, se houver linguagem recomendatória, a resposta inteira é substituída por um aviso fixo, <b>mantendo as citações</b>. Erro de digitação do usuário não atrapalha: o filtro olha o retorno da LLM.",
    "<b>Bloco de fontes</b> sempre no final, um item por documento, deduplicado por <code>sourceUrl</code>: ticker + período + data-base para documentos da CVM; título para os da web.",
    "Comparativo: o prompt atua antes e não é garantido; a regex atua depois, é determinística, mas avalia a string, não o sentido. Há guardrails mais elaborados (outro RAG por similaridade, testes de segurança da LLM).",
    "Máximo de iterações pode ser 3, 4 ou 5 (ajuste fino); o que não pode faltar é o limite. Contexto incompleto chega ao answer quando o guard corta.",
    "<b>SSE</b>: como um WebSocket unidirecional (cliente só recebe). A rota <code>POST /api/chat</code> (Fastify) valida <code>{ question }</code> com o schema de <code>@hero/contracts</code>, itera <code>graph.stream()</code> e emite <b>um evento por nó concluído, não por token</b>.",
    "Headers escritos à mão: <code>Cache-Control: no-cache, no-transform</code> (sem isso o Cloud Run bufferiza e entrega tudo de uma vez) e <code>Connection: keep-alive</code>. Erro no meio do stream: evento SSE de erro e encerra a conexão, sem derrubar o processo.",
    "Eventos tipados em <code>chat-event.ts</code>: retrieve = documentos resumidos; grade = sufficient, missingAspects, iterations; answer = texto final; webSearch = só o nome. Alimentam o painel de raciocínio do frontend. <b>GraphLike</b> (só <code>stream</code>) é a interface mínima que a rota recebe, para testar com grafo fake."
   ],
   "como": [
    "1) Prompt do answer: <code>packages/agent/src/nodes/answer.ts</code> + <code>prompts/answer.ts</code> + <code>answer/format-resposta.ts</code>; insere o nó no <code>graph.ts</code>.",
    "2) O nó chama <code>llm.invoke(answerPrompt(...))</code> e passa o texto por <code>montarResposta(texto, documents, sufficient)</code>.",
    "3) <code>montarResposta</code>: regex recomendatória → aviso fixo; se <code>!sufficient</code> acrescenta aviso de contexto incompleto; anexa 'Fontes:' deduplicadas.",
    "4) Testes com LLM fake: resposta normal com citação; resposta filtrada quando o LLM diz 'Eu recomendo comprar PETR4 agora'; e um teste de que o próprio prompt manda nunca recomendar.",
    "5) Prompt da rota: <code>apps/api/src/routes/chat.ts</code> com <code>GraphLike</code> injetado, <code>writeHead(200, headers SSE)</code>, <code>for await</code> sobre <code>graph.stream()</code>, tradução por <code>paraEventoSse</code> e evento de erro no catch.",
    "6) Testar a rota com um grafo fake (sem LLM e sem Postgres) e verificar os eventos na ordem dos nós.",
    "7) No Cloud Run, conferir os dois headers; sem o de cache a resposta deixa de ser SSE."
   ],
   "aplica": [
    "Qualquer domínio regulado (finanças, saúde, jurídico) em que uma frase específica nunca pode sair.",
    "Guardrail de saída barato e testável antes de pensar em classificadores ou segundo modelo.",
    "Streaming de progresso de agente (painel de raciocínio) sem WebSocket.",
    "Respostas de RAG com rastreabilidade: fonte, período e data-base em toda resposta."
   ],
   "pros": [
    "Regex é determinística, rápida, gratuita e coberta por teste unitário.",
    "Duas camadas: o prompt reduz a taxa de violação e o filtro garante o caso restante.",
    "Citação sempre anexada pelo código, não pelo modelo: não depende de a LLM lembrar.",
    "SSE por nó dá visibilidade do raciocínio e funciona com POST."
   ],
   "contras": [
    "A regex avalia a string, não o sentido: paráfrase escapa e há falso positivo.",
    "Substituir a resposta inteira descarta conteúdo útil que vinha junto.",
    "Granularidade por nó, não por token: a resposta só aparece quando o nó answer termina.",
    "SSE depende de cada camada da infra não bufferizar a resposta."
   ],
   "traps": [
    "Confiar só no system prompt como guardrail.",
    "Lista de padrões ampla demais (palavra 'venda' sozinha bloqueia 'receita de vendas').",
    "Lista estreita demais: variações como 'sugeriria' ou 'aconselharia' passam (ver armadilhas do código).",
    "Esquecer <code>no-transform</code> no Cloud Run e descobrir só em produção que não há streaming.",
    "Checar orçamento ou validação depois do <code>writeHead</code>: a resposta já é 200 e não dá mais para devolver 429."
   ],
   "tip": "Trate cada frase recomendatória que escapou em produção como um caso de teste novo do filtro; e escreva também os casos que não podem ser bloqueados, para a lista não crescer demais.",
   "cola": [
    [
     "Guardrail",
     "Barreira que impede uma saída proibida; aqui, recomendar investimento."
    ],
    [
     "Filtro determinístico",
     "Regex aplicada ao texto da LLM depois da resposta."
    ],
    [
     "Citação obrigatória",
     "Bloco de fontes sempre anexado pelo código."
    ],
    [
     "Data-base",
     "periodEnd do trimestre citado, junto de ticker e período."
    ],
    [
     "SSE",
     "Server-Sent Events: fluxo unidirecional servidor para cliente."
    ],
    [
     "no-transform",
     "Parte do Cache-Control que evita o buffer no Cloud Run."
    ],
    [
     "keep-alive",
     "Mantém a conexão aberta durante o stream."
    ],
    [
     "GraphLike",
     "Interface mínima (só stream) que a rota recebe do grafo."
    ],
    [
     "Evento tipado",
     "Formato validado por schema (chatStreamEventSchema)."
    ],
    [
     "Painel de raciocínio",
     "UI que mostra os nós concluídos."
    ]
   ],
   "links": [
    [
     "packages/agent (answer)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src"
    ],
    [
     "apps/api (chat SSE)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api/src/routes"
    ],
    [
     "Capstone Project AI Researcher",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
    ],
    [
     "MDN: Server-sent events",
     "https://developer.mozilla.org/docs/Web/API/Server-sent_events"
    ]
   ],
   "codigo": [
    {
     "proj": "packages/agent (src/nodes/answer.ts, src/prompts/answer.ts, src/answer/format-resposta.ts) e apps/api (src/routes/chat.ts, chat-event.ts)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api/src/routes",
     "resumo": "Li os três arquivos do answer e da API, os casos de teste e executei só as seis regex do filtro num script Node avulso, fora do repo, contra 9 frases. Não rodei a suíte do repo.",
     "fluxo": [
      "<code>packages/agent/src/nodes/answer.ts</code>: <code>makeAnswerNode(llm)</code> com <code>AnswerLlmClient { invoke(prompt): Promise&lt;{ content: string }&gt; }</code>; devolve <code>{ answerText }</code>.",
      "<code>prompts/answer.ts</code>: papel de assistente de dados financeiros públicos que 'NUNCA recomenda decisão de investimento', contexto, pergunta e regras; só acrescenta o aviso de contexto incompleto quando <code>sufficient</code> é falso.",
      "<code>answer/format-resposta.ts</code>: <code>PADROES_RECOMENDACAO</code> (6 regex), <code>contemLinguagemRecomendatoria</code>, <code>RESPOSTA_GUARDRAIL</code>, <code>formatarCitacoes</code> (dedupe por <code>sourceUrl</code>, <code>TICKER (período, data-base YYYY-MM-DD)</code>) e <code>montarResposta</code>.",
      "<code>apps/api/src/routes/chat.ts</code>: <code>GraphLike</code>, <code>chatRequestSchema.parse</code>, <code>verificarOrcamento()</code> antes do <code>writeHead</code>, headers SSE, <code>for await</code> do <code>graph.stream</code>, <code>data: JSON\\n\\n</code> por evento, <code>event: error</code> no catch e <code>reply.raw.end()</code> no finally.",
      "<code>apps/api/src/routes/chat-event.ts</code>: <code>paraEventoSse(node, update)</code> traduz retrieve (id, ticker, period, title, sourceUrl), grade, answer e webSearch em eventos do contrato <code>chatStreamEventSchema</code> (<code>packages/contracts/src/chat.ts</code>).",
      "<code>apps/api/src/routes/chat.test.ts</code>: 429 por orçamento, um evento SSE por nó, validação de <code>question</code> ausente e evento de erro com stream encerrado."
     ],
     "rodar": [
      "<code>pnpm --filter @hero/agent test</code> e <code>pnpm --filter @hero/api test</code> (não executei)",
      "<code>pnpm dev</code> (API :3000 e web :4200) e <code>curl -N -X POST localhost:3000/api/chat -H 'content-type: application/json' -d '{\"question\":\"Qual a receita da Vale no 3T25?\"}'</code> (precisa de Postgres semeado e Vertex AI, ou <code>DEMO=true</code>; não executei)"
     ],
     "armadilhas": [
      "Achado (testado com as regex copiadas num script Node): 'Eu recomendo comprar PETR4 agora', 'Vale a pena comprar' e 'Eu recomendaria' são bloqueadas; 'Eu sugeriria vender', 'Eu aconselharia manter' e 'Você deveria vender essa ação' <b>passam</b>. A aula cita 'sugeriria' e 'aconselharia' entre as palavras procuradas; o código só cobre <code>sugir(o|imos|a)</code> e <code>aconselh(o|amos|a)</code>.",
      "Achado: a aula diz que a regex procura 'vender' e 'manter'; o código evita palavra solta de propósito (comentário: 'receita de vendas' é legítimo) e usa construções como <code>vale a pena (comprar|vender|manter)</code> e <code>(compre|venda|mantenha) (essa|esta|a) (ação|posição|papel)</code>.",
      "Achado: <code>\\brecomend(a)\\b</code> também casa 'a empresa recomenda dividendos' (falso positivo que troca a resposta inteira pelo aviso).",
      "Achado: a rota chama <code>verificarOrcamento()</code> (orçamento diário de tokens, 429 problem+json) antes do <code>writeHead</code>; a aula não menciona e é a razão de a checagem ficar antes de o stream abrir.",
      "Achado: o erro SSE envia mensagem fixa <code>'Erro ao processar a pergunta.'</code> e loga o erro real no servidor; a rota não repassa o detalhe ao cliente.",
      "Achado: o filtro substitui o texto mas <code>montarResposta</code> ainda anexa o aviso de incompleto e as fontes, então a resposta bloqueada continua listando as fontes (como a aula diz: 'mantendo as citações')."
     ]
    }
   ]
  },
  {
   "id": "D11-10",
   "bloco": "d11-b2",
   "mod": "Unidade 3 · Aula 14",
   "emoji": "🧪",
   "read": "9 min",
   "title": "Testando o grafo sem rede",
   "short": "LLM tratada como API de terceiro: fakes por injeção, testes padrão, fixture em bytes latin1 e a flag DEMO=true.",
   "oneliner": "Uma LLM não é idempotente, então nos testes ela entra como <b>dependência injetada</b> e é trocada por <b>fakes</b>. Cada tipo de código ganha sua estratégia: fake para nós e grafo, teste padrão para regex e formatação, <b>fixture em arquivo</b> para o parser da CVM e <b>DEMO=true</b> para não gastar o Serper em demos e QA.",
   "vovo": [
    "Imagine treinar um jogador de xadrez com um adversário que muda de humor a cada partida. Para saber se o seu treino funciona, você não joga contra ele: usa um boneco que responde sempre igual. É isso que um fake faz no lugar da LLM.",
    "Já para checar se uma máquina lê bem as notas fiscais antigas, você guarda uma nota fiscal de verdade, com os borrões de sempre, numa gaveta e passa a mesma nota toda vez. Essa é a fixture em arquivo."
   ],
   "oque": [
    "<b>Problema:</b> teste automatizado deve dar o mesmo resultado sempre; a LLM é não determinística. O harness (skills e guardrails) reduz o risco, mas ele sempre existe.",
    "<b>Tese da aula:</b> nos testes a LLM é uma API de terceiro, porque literalmente é uma, e não há garantia de resposta idêntica.",
    "<b>O que viabiliza o teste é a estrutura do código:</b> com inversão de dependência, as dependências dos nós entram por parâmetro e são trocadas no teste: <code>fakeChatModel</code> simula a LLM, um mock do cliente de embeddings devolve o retorno esperado e um mock do search provider substitui o Serper.",
    "<b>Código determinístico tem teste padrão:</b> o guardrail principal é uma expressão regular e a formatação é um conjunto de funções puras. Entrada (inclusive um documento da CVM simulado) e <code>expect</code> contra a saída.",
    "<b>Fixture em arquivo:</b> os CSVs da CVM vêm em ISO-8859-1, não UTF-8. O teste lê um CSV com bytes latin1 reais a cada execução, não uma string reescrita em UTF-8. Garante decodificação de acento e leitura correta do cabeçalho (usado como chave de cada campo).",
    "<b>select-quarters.ts</b> é o arquivo mais frágil do coletor: posição de conta por setor, fallback consolidado/individual, versão retificada, subtração YTD do 4º trimestre e matemática de data com ano bissexto. O prompt pede exportar só o necessário para testar funções puras, sem mudar comportamento.",
    "<b>Casos citados:</b> versão retificada escolhida pela maior numericamente (não lexicograficamente), <code>undefined</code> quando o dado não aparece, consolidado vazio ou ausente, escala da unidade e subtração.",
    "<b>Modo demo:</b> teste unitário do provider é uma coisa; QA, teste funcional e manual rodam o sistema de ponta a ponta e precisam de busca. Serper é integração cara. Solução: <code>DEMO=true</code> liga fixtures para SearchProvider e fetch de página, cobrindo Vale, Petrobras e Klabin (grupo B do <code>evals/dataset.json</code>).",
    "<b>Regras do demo no prompt:</b> casa por substring do ticker ou nome da empresa na query; pergunta sem fixture cai numa fixture genérica e nunca lança erro; flag lida em um único lugar por dependência; o provider real e o fetch real não sabem que o demo existe; escopo só busca web (a aula diz que grade, answer e embeddings seguem na Vertex AI).",
    "<b>Refatoração exigida pela flag:</b> antes a busca de página usava a implementação padrão e os testes usavam spies/stubs (troca em memória). Para flag em runtime, a busca de página virou dependência por parâmetro. Inversão de dependência não é regra universal: refatore quando a necessidade aparecer."
   ],
   "como": [
    "Classifique o código: depende de LLM/embeddings/busca (fake injetado), é função pura (teste padrão), lê arquivo externo sujo (fixture em arquivo), integra serviço caro (flag de demo).",
    "Nos nós, receba as dependências por parâmetro (<code>makeWebSearchNode(searchProvider, embeddings, buscarPagina, inserirDocumentoWeb)</code>) e no teste passe <code>vi.fn()</code> ou objetos mínimos.",
    "Para o parser CSV, crie o arquivo de teste em bytes latin1 reais (abrir no VS Code mostra caracteres estranhos, de propósito) e leia-o a cada execução; asserte acento e chave de cabeçalho.",
    "Para <code>select-quarters.ts</code>, peça ao Claude Code testes das funções puras e exporte só o necessário, sem mudar comportamento.",
    "Para o demo, crie fixtures de SearchProvider e de fetch de página, com casamento por substring e fallback genérico, ligadas por <code>DEMO=true</code>.",
    "Leia a flag num ponto por dependência: uma função verifica a variável de ambiente e a função que cria o search provider devolve o fake quando ligada; o resto segue igual com Serper ou Google Custom Search.",
    "Documente a flag no <code>.env.example</code> (versionável, só exemplos) junto das demais variáveis.",
    "Ajuste os testes antigos para a nova dependência injetada (buscar página por parâmetro)."
   ],
   "aplica": [
    "Qualquer app com LLM: trate o modelo como API externa e injete-o para testar o fluxo sem depender da resposta.",
    "Pipelines de ingestão com arquivos legados (encoding, cabeçalho variável): fixture em binário real em vez de string reescrita.",
    "Integração paga ou com cota (busca, OCR, e-mail): flag de demo com fixtures para QA, demos gravadas e E2E no CI.",
    "Regras de limpeza de dados com muitas exceções (retificações, escalas, fallbacks): testes unitários de funções puras documentando cada caso."
   ],
   "pros": [
    "Testes rápidos, determinísticos e sem custo de token ou de serviço de terceiro.",
    "Cada estratégia casa com o tipo de código, evitando mock onde basta teste padrão.",
    "Fixture binária pega bug de encoding que string em UTF-8 esconderia.",
    "Demo reproduzível: grava demonstração sem depender do Serper estar no ar."
   ],
   "contras": [
    "Fake não prova qualidade da resposta real da LLM; isso exige eval, não teste unitário.",
    "Fixtures de demo ficam desatualizadas e o dado não é 100% correto (a própria aula admite).",
    "Injetar tudo por parâmetro aumenta a superfície de wiring; a aula alerta que não é obrigatório em tudo.",
    "Flag de demo é caminho paralelo de código: precisa ficar isolada para não vazar para produção."
   ],
   "traps": [
    "Testar o parser com string escrita em UTF-8: o bug de latin1 nunca aparece.",
    "Spy/stub em memória para algo que precisa trocar em runtime (flag): exige refatorar para injeção.",
    "Fixture de demo que lança erro para pergunta desconhecida: a aula exige fallback genérico.",
    "Espalhar a leitura de <code>DEMO</code> pelo código em vez de um ponto por dependência.",
    "Código: o repo final usa DEMO=true também para embeddings, grade e answer, indo além do escopo descrito na aula."
   ],
   "tip": "Antes de escrever um mock, pergunte se a função é pura. Se for, teste padrão; mock é para a fronteira com o mundo externo.",
   "cola": [
    [
     "Idempotência da LLM",
     "Mesmo prompt pode gerar saídas diferentes; não dá para garantir resposta igual."
    ],
    [
     "Inversão de dependência",
     "Dependências entram por parâmetro, o que permite trocá-las no teste."
    ],
    [
     "fakeChatModel",
     "Função de teste que simula a resposta da LLM."
    ],
    [
     "Fixture em arquivo",
     "Arquivo fake lido a cada execução, aqui um CSV com bytes latin1 reais."
    ],
    [
     "ISO-8859-1 (latin1)",
     "Encoding dos CSVs da CVM, diferente de UTF-8."
    ],
    [
     "select-quarters.ts",
     "Arquivo mais frágil do coletor: regras de limpeza de dado por trimestre."
    ],
    [
     "Versão retificada",
     "A CVM republica dados com número de versão; vale a maior numericamente."
    ],
    [
     "DEMO=true",
     "Feature flag que troca a busca web por um mini Serper fake."
    ],
    [
     "Fixture genérica",
     "Resposta padrão do demo para pergunta sem fixture cadastrada, nunca lança erro."
    ],
    [
     "Spy/stub",
     "Troca de comportamento em memória durante o teste, insuficiente para flag em runtime."
    ]
   ],
   "links": [
    [
     "Capstone Project AI Researcher (código completo)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
    ],
    [
     "AI Researcher Seed (ponto de partida)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
    ],
    [
     "packages/agent",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent"
    ],
    [
     "packages/corpus (coletor CVM)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/corpus"
    ]
   ],
   "codigo": [
    {
     "proj": "packages/agent (graph, nodes, search, web-search) e packages/corpus/src/collect",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src",
     "resumo": "Li os arquivos citados no repo full (main). Não executei os testes. Os nomes em português (criarSearchProvider, comResiliencia, buscarPagina) são os do repo.",
     "fluxo": [
      "<code>packages/agent/src/graph.test.ts</code>: <code>fakeGradeLlm</code> e <code>fakeDeps</code> montam todas as dependências com <code>vi.fn()</code>; <code>searchProviderFalha</code> troca o search por <code>mockRejectedValue</code>.",
      "<code>packages/agent/src/graph.ts</code>: <code>buildGraph(deps: GraphDeps)</code> recebe embeddings, buscar, gradeLlm, searchProvider, buscarPagina, inserirDocumentoWeb e answerLlm por parâmetro.",
      "<code>packages/agent/src/answer/format-resposta.ts</code> e <code>format-resposta.test.ts</code>: guardrail por lista de regex (<code>PADROES_RECOMENDACAO</code>) testado com entrada e saída esperada.",
      "<code>packages/corpus/src/collect/__fixtures__/exemplo-dre.csv</code>: <code>file</code> reporta &quot;ISO-8859 text, with CRLF&quot;; <code>parse-csv.test.ts</code> asserta <code>'Lucro/Prejuízo Consolidado do Período'</code> e <code>'ÚLTIMO'</code>.",
      "<code>packages/corpus/src/collect/parse-csv.ts</code>: <code>readFileSync(caminho, 'latin1')</code>, split por <code>;</code>, cabeçalho como chave.",
      "<code>packages/corpus/src/collect/select-quarters.test.ts</code>: describes para periodEndIso (fevereiro bissexto), valorConta/subtrairValorConta (escala divergente lança erro), escolherMaiorVersao, buscarContaPorDescricao, demonstrativosDaEmpresa (fallback individual, caso Sendas/Assaí).",
      "<code>packages/agent/src/web-search/fixtures.ts</code>: <code>FIXTURES</code> com palavras-chave vale, petrobras, klabin; <code>encontrarFixture</code> casa por <code>toLowerCase().includes()</code> e cai em <code>FIXTURE_GENERICA</code>.",
      "<code>packages/agent/src/search/index.ts</code> (<code>criarSearchProvider</code> devolve a fixture se <code>DEMO === 'true'</code>) e <code>fixtures.ts</code> (<code>criarBuscarPagina</code>): os dois pontos onde o demo aparece para a busca."
     ],
     "rodar": [
      "<code>pnpm test</code> (turbo run test, vitest por pacote), conforme package.json da raiz.",
      "<code>pnpm --filter @hero/agent test</code> e <code>pnpm --filter @hero/corpus test</code> para um pacote só (hipótese: filtro padrão do pnpm, não executei).",
      "<code>DEMO=true pnpm dev</code> para o grafo com fixtures; o README do repo diz que DEMO=true roda sem Postgres nem credencial GCP."
     ],
     "armadilhas": [
      "Achado: a aula diz que no demo grade, answer e embeddings continuam na Vertex AI; no repo final <code>llm.ts</code> devolve <code>criarGradeLlmDemo()</code> e <code>criarAnswerLlmDemo()</code> com DEMO=true, <code>embeddings.ts</code> tem <code>criarEmbeddingsDemo()</code> e <code>graph-deps.ts</code> usa <code>criarBuscarDemo()</code> no lugar do Postgres. Isso foi acrescentado depois (E2E no CI sem banco nem Vertex AI) e o demo hoje é bem maior que só a busca.",
      "Achado: a aula diz que a versão retificada vale a maior numericamente, e o código usa <code>Number(VERSAO)</code>, mas o teste só compara versões '1' e '2', que não provam numérico contra lexicográfico (faltaria '9' contra '10').",
      "Achado: <code>process.env.DEMO === 'true'</code> aparece em <code>search/index.ts</code>, <code>web-search/fixtures.ts</code> (<code>criarBuscarPagina</code>), <code>llm.ts</code>, <code>embeddings.ts</code> e <code>graph-deps.ts</code>: um ponto por dependência, como a aula pede, mas espalhado por cinco arquivos."
     ]
    }
   ]
  },
  {
   "id": "D11-11",
   "bloco": "d11-b2",
   "mod": "Unidade 3 · Aula 15",
   "emoji": "🛡️",
   "read": "10 min",
   "title": "Circuit breaker, retry e degradação graciosa",
   "short": "Três camadas no provedor de busca (timeout, retry com backoff, circuit breaker) mais degradação graciosa no nó web search.",
   "oneliner": "Em produção o Serper cai, oscila e estoura limite. O projeto envolve qualquer <b>SearchProvider</b> num <b>decorator</b> (<code>comResiliencia</code>) com timeout de 10 s, até 3 tentativas com <b>backoff exponencial</b> e <b>circuit breaker</b>; e o nó web search captura erro por query para o grafo terminar no <b>answer</b> com aviso de contexto incompleto.",
   "vovo": [
    "Você liga para um restaurante e ninguém atende. Primeiro você espera um tempo razoável (timeout), depois tenta de novo com intervalos cada vez maiores (retry com backoff). Se já ligou várias vezes e continua sem resposta, para de ligar por um tempo, para não atrapalhar a cozinha que está tentando se recuperar (circuit breaker).",
    "Se mesmo assim o restaurante não abre, você não fica parado de fome: pede o que tem em casa e avisa que o jantar ficou incompleto. Isso é degradação graciosa. Mas se o problema for o pagamento de um ingresso, você não finge que deu certo: avisa que falhou."
   ],
   "oque": [
    "<b>Contexto:</b> o modo demo resolve dev e demonstração, não produção. Em produção a flag está desligada e o Serper está no ar de verdade, inclusive nos dias em que não está.",
    "<b>Timeout:</b> <code>fetch</code> não tem timeout por padrão; se o Serper travar, a requisição trava junto. Erro claro é melhor que espera sem fim. No projeto: 10 segundos, com o parâmetro <code>signal</code>, nos dois providers.",
    "<b>Retry com backoff:</b> a falha pode ser passageira (pico). Cancela a conexão e tenta de novo; muitas vezes fica transparente para o cliente. Máximo de tentativas padrão: três, com backoff exponencial.",
    "<b>Circuit breaker:</b> retry mal feito vira falha em massa e derruba o terceiro que tenta se recuperar. O circuito abre após algumas falhas consecutivas; chamadas seguintes falham na hora, sem chamar o provider, até passar o resfriamento. Quando uma tentativa dá certo, fecha. Protege o serviço externo e a latência do próprio sistema.",
    "<b>Onde se aplica:</b> a aula aplica ao Serper, mas serve a Vertex AI ou banco. Em sistema com muitos microsserviços é muito comum; o projeto só tem um serviço externo de busca.",
    "<b>Decorator:</b> comportamento padronizado implementado uma vez numa função que envelopa outra. O problema: dar a mesma resiliência ao Serper e ao Google Custom Search sem reescrever os dois. Decorator não é o arroba (syntax sugar, não padrão de JS/TS); no projeto é <code>comResiliencia</code> envolvendo o provider. Primeiro o problema, depois o padrão.",
    "<b>Constantes configuráveis no arquivo próprio:</b> máximo de tentativas (padrão 3), backoff inicial, limite de falhas consecutivas e tempo de resfriamento. Tempo de espera e relógio são injetáveis para testar sem esperar segundos de verdade. A fixture do DEMO fica fora da camada, porque não há rede para proteger.",
    "<b>Degradação graciosa:</b> depois de tentar tudo, registrar em log/telemetria e mostrar a falha de forma que conforte; o pior é tela branca. No nó web search: <code>try/catch</code> por query; se nenhuma rende documento, o nó não adiciona nada, o grafo volta ao retrieve de mãos vazias, o guard de iteração corta o loop e o answer avisa que o contexto pode estar incompleto.",
    "<b>Quando degradar e quando falhar:</b> extrato e saldo (PO define uma tela só com saldo) aceitam degradação; pagamento de ingresso não: a operação aborta, o usuário recebe mensagem, tudo vai para telemetria. Mesmo a falha obrigatória vem com mensagem, nunca tela em branco.",
    "<b>Grafo com answer:</b> grade decide; contexto suficiente vai ao answer, insuficiente vai ao web search, que volta ao retrieve no máximo duas vezes; na última, a execução vai ao answer. Antes, com contexto suficiente o processamento só terminava.",
    "<b>O que os testes pegaram:</b> o nó answer não tinha evento de chat (sem ele não apareceria no painel de raciocínio) e o LangGraph não aceita canal de estado com o mesmo nome de um nó, então o canal virou <code>answerText</code> (o evento SSE segue com o campo <code>answer</code>). O agente corrigiu o código, não o teste: deixe isso explícito nas instruções."
   ],
   "como": [
    "Prompt ao Claude Code: timeout explícito de 10 s no fetch dos dois providers, depois um decorador <code>comResiliencia()</code> com retry, backoff exponencial e circuit breaker, aplicado por padrão em <code>criarSearchProvider()</code> a Serper e Google, não à fixture DEMO.",
    "No provider: <code>fetch(..., { signal: AbortSignal.timeout(10_000) })</code>; a exceção de abort sobe e é capturada pelo decorador, que tenta de novo.",
    "No decorator: um <code>for</code> chama <code>provider.search(query)</code> até <code>maxTentativas</code>; entre tentativas espera <code>backoffBaseMs * 2 ** (tentativa - 1)</code>.",
    "Ao esgotar as tentativas conta uma falha consecutiva; ao atingir o limiar grava <code>abertoAte = agora() + tempoResfriamentoMs</code>.",
    "Chamada com circuito aberto lança <code>CircuitoAbertoError</code> na hora, sem tocar o provider; passado o resfriamento, volta a chamar o provider.",
    "Injete <code>esperar</code> e <code>agora</code> nas opções para os testes usarem relógio e espera falsos.",
    "No nó web search, envolva só a chamada <code>search()</code> de cada query em <code>try/catch</code> e use <code>continue</code>; não propague.",
    "Escreva o teste de ponta a ponta em <code>graph.test.ts</code>: SearchProvider sempre falhando e o grafo ainda assim termina em answer com resposta real."
   ],
   "aplica": [
    "Qualquer chamada a API de terceiro com cota ou instabilidade (busca, LLM, pagamento, e-mail).",
    "Vários providers com a mesma interface: um decorator em vez de duplicar retry em cada um.",
    "Fluxos agênticos em que uma ferramenta secundária (busca web) não deve derrubar a resposta principal (corpus).",
    "Regras de negócio com decisão explícita de degradar ou falhar, definida com o PO."
   ],
   "pros": [
    "Resiliência escrita uma vez e reutilizada por qualquer provider.",
    "Circuit breaker protege o terceiro e a latência do próprio sistema.",
    "Usuário recebe resposta parcial e avisada em vez de tela branca.",
    "Testável sem esperar tempo real, graças a espera e relógio injetáveis."
   ],
   "contras": [
    "Mais código e mais estado (contador e instante de abertura) por instância de provider.",
    "Retry multiplica a latência percebida antes da falha final.",
    "Degradar entrega resposta incompleta: só serve onde a regra de negócio aceita.",
    "Se o framework já traz resiliência, reimplementar é duplicação (a aula recomenda usar o que o framework dá)."
   ],
   "traps": [
    "Capturar erro e seguir em frente em todo lugar, como se nunca fosse haver erro: pagamento precisa falhar.",
    "Retry sem breaker: insiste em serviço que está subindo e piora a queda.",
    "Duas instâncias do provider significam dois circuit breakers independentes para a mesma API (ver aula 17).",
    "Mudar o teste para passar: o agente deve corrigir o código, não o teste.",
    "Código: o <code>catch</code> do nó web search descarta o erro sem registrar log; a aula diz que o log entra quando a observabilidade for adicionada, mas o <code>web-search.ts</code> final não tem log nesse ponto."
   ],
   "tip": "Escreva a política de degradação por regra de negócio (degrada, falha, ou alerta) antes de escrever try/catch, e valide com quem conhece o cliente.",
   "cola": [
    [
     "Timeout",
     "Limite de espera do fetch; no projeto 10 s via AbortSignal."
    ],
    [
     "Retry com backoff",
     "Nova tentativa com espera crescente (200 ms, 400 ms...) para absorver falha passageira."
    ],
    [
     "Circuit breaker",
     "Após N falhas consecutivas o circuito abre e as chamadas falham na hora até o resfriamento."
    ],
    [
     "Resfriamento",
     "Tempo em que o circuito fica aberto; padrão do repo, 30 000 ms."
    ],
    [
     "Decorator",
     "Função que envelopa outra e acrescenta comportamento; independe da sintaxe com arroba."
    ],
    [
     "comResiliencia",
     "Decorator do projeto que envolve qualquer SearchProvider."
    ],
    [
     "CircuitoAbertoError",
     "Erro lançado quando o circuito está aberto, sem chamar o provider."
    ],
    [
     "Degradação graciosa",
     "Entregar resposta parcial e avisada quando o serviço não volta."
    ],
    [
     "MAX_ITERATIONS",
     "Guard de iteração do grafo, valor 2: força a saída para o answer."
    ],
    [
     "answerText",
     "Canal de estado do answer, renomeado porque não pode ter o nome do nó."
    ]
   ],
   "links": [
    [
     "Capstone Project AI Researcher",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
    ],
    [
     "AI Researcher Seed",
     "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
    ],
    [
     "packages/agent/src/search",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/search"
    ],
    [
     "Circuit Breaker (Martin Fowler)",
     "https://martinfowler.com/bliki/CircuitBreaker.html"
    ]
   ],
   "codigo": [
    {
     "proj": "packages/agent/src/search, nodes/web-search.ts, graph.ts",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/search",
     "resumo": "Li o decorator, os providers, o nó, o grafo e os testes. Não executei os testes. Nomes em português (comResiliencia, OpcoesResiliencia, CircuitoAbertoError) são os do repo.",
     "fluxo": [
      "<code>search/resilient-search-provider.ts</code>: <code>comResiliencia(provider, opcoes)</code>; defaults <code>maxTentativas=3</code>, <code>backoffBaseMs=200</code>, <code>limiarCircuito=3</code>, <code>tempoResfriamentoMs=30_000</code>, <code>esperar</code> e <code>agora</code> injetáveis.",
      "Estados do circuito: não há enum. O estado é <code>abertoAte: number | undefined</code> e <code>falhasConsecutivas</code>; aberto se <code>agora() &lt; abertoAte</code>. Sucesso zera contador e <code>abertoAte</code>.",
      "<code>search/serper.ts</code> e <code>search/google-custom-search.ts</code>: <code>TIMEOUT_MS = 10_000</code> e <code>signal: AbortSignal.timeout(TIMEOUT_MS)</code> no fetch.",
      "<code>search/index.ts</code>: <code>criarSearchProvider()</code> devolve <code>criarSearchProviderFixture()</code> se <code>DEMO === 'true'</code>; senão <code>comResiliencia(makeSerperProvider(...))</code> ou Google; <code>SEARCH_PROVIDER</code> default <code>serper</code>.",
      "<code>nodes/web-search.ts</code>: <code>for (const query of queries)</code> com <code>try { search(...).slice(0, 3) } catch { continue }</code>; <code>RESULTADOS_POR_QUERY = 3</code> e <code>TTL_PADRAO_DIAS = 7</code>; retorna <code>{}</code>.",
      "<code>graph.ts</code>: <code>MAX_ITERATIONS = 2</code>; <code>proximoNo</code> manda ao <code>answer</code> se <code>sufficient</code> ou <code>iterations &gt;= MAX_ITERATIONS</code>, senão a <code>webSearch</code>; canal <code>answerText</code> com comentário sobre a colisão de nome.",
      "<code>answer/format-resposta.ts</code>: com <code>sufficient</code> falso acrescenta &quot;O contexto disponível pode estar incompleto para responder com certeza.&quot;",
      "Testes: <code>resilient-search-provider.test.ts</code> (retry, backoff <code>[200, 400]</code>, abre circuito, fecha após 30 s, sucesso zera contador), <code>web-search.test.ts</code> (degradação por query), <code>graph.test.ts</code> (SearchProvider falhando termina em answer contendo &quot;incompleto&quot;)."
     ],
     "rodar": [
      "<code>pnpm --filter @hero/agent test</code> (hipótese: filtro padrão do pnpm; não executei).",
      "<code>pnpm test</code> na raiz, que roda o turbo por pacote."
     ],
     "armadilhas": [
      "Achado: a aula diz que depois de três tentativas o circuito abre; no código o contador <code>falhasConsecutivas</code> conta chamadas a <code>search()</code> que esgotaram as tentativas. Com os defaults, são 3 buscas falhas, ou 9 chamadas ao provider, antes de abrir.",
      "Achado: não há estado half-open explícito. Depois do resfriamento a próxima chamada vai ao provider e, se falhar, o contador já está no limiar e reabre o circuito de imediato.",
      "Achado: o retry também repete erros não transitórios (por exemplo, resposta 4xx do Serper), porque o decorator captura qualquer exceção.",
      "Achado: o estado do circuito vive dentro de cada instância de <code>comResiliencia</code>; é por isso que a instância do grafo precisa ser compartilhada (ver D11-12).",
      "Achado: <code>catch { continue }</code> em <code>web-search.ts</code> não registra log, embora o comentário diga &quot;degradação graciosa, não silêncio&quot;."
     ]
    }
   ]
  },
  {
   "id": "D11-12",
   "bloco": "d11-b2",
   "mod": "Unidade 3 · Aulas 16 e 17",
   "emoji": "🔌",
   "read": "12 min",
   "title": "Erros padronizados e o servidor MCP",
   "short": "Um error handler central em RFC 7807 e o agente exposto por MCP com uma única tool, em stdio e Streamable HTTP.",
   "oneliner": "A API trata todo erro num <b>único error handler</b> que responde <b>application/problem+json</b> (RFC 7807) sem vazar stack trace. O agente é exposto por <b>MCP</b> com uma só tool, <code>perguntar</code>, cuja descrição é lida pelo cliente MCP, em <b>stdio</b> (local) e <b>Streamable HTTP</b> (servidor), com <b>uma única instância do grafo</b> para /chat e /mcp.",
   "vovo": [
    "Uma loja com vários guichês: se cada atendente dá a má notícia do seu jeito, o cliente se perde. Com um formulário único de ocorrência, qualquer cliente (ou outro robô) entende o que houve, e o relatório interno com os detalhes técnicos fica só com a gerência.",
    "Já o MCP é a vitrine da loja para outros robôs: em vez de abrir o depósito inteiro, você coloca um único balcão, com uma placa dizendo exatamente o que ele atende e o que nunca faz. O robô lê a placa para decidir se vale perguntar ali."
   ],
   "oque": [
    "<b>Aula 16, problema:</b> se cada rota trata erro do seu jeito, a experiência piora. O tratamento único fica em função unificada no <code>app.ts</code>, registrada uma vez com <code>app.setErrorHandler()</code>; nenhuma rota trata erro por conta própria. É nesse ponto que depois entram telemetria e demais controles.",
    "<b>Mapeamento pedido:</b> <code>ZodError</code> para 400 (identificado por <code>instanceof</code>), circuito aberto do SearchProvider para 503 (por duck typing: é um <code>Error</code> com o nome do erro de circuito aberto) e qualquer outro erro para 500 genérico, sem stack trace.",
    "<b>Não vazar detalhe interno:</b> stack trace é questão de segurança; a telemetria fica nos serviços internos e o cliente externo recebe só o necessário. Alguém mal-intencionado pode usar o stack para explorar o servidor.",
    "<b>Contrato RFC 7807:</b> <code>application/problem+json</code> com <code>type</code>, <code>title</code>, <code>status</code>, <code>detail</code>, schema em <code>packages/contracts</code>. Atende o frontend (acordo de formato) e outros agentes (erro padronizado gasta bem menos tokens).",
    "<b>Dependência nova ou duck typing:</b> a API não depende do pacote do agente (só contratos, Fastify e pg), por desenho: a rota de chat recebe o grafo por tipo estrutural para testar sem LLM e sem Postgres. O erro de circuito aberto só é exportado pelo módulo de busca, não pelo índice público do agente. <code>instanceof</code> exigiria nova dependência e reexportar o erro, e instalar dependência é o que o CLAUDE.md manda perguntar antes. O Claude Code perguntou e a decisão foi duck typing. Custo: se o nome da exceção mudar, a checagem quebra.",
    "<b>Aula 17, uma única tool:</b> pensa-se na experiência de quem consome, aqui o agente. Expor o grafo inteiro arrisca outro agente pular o guardrail. O servidor MCP abstrai: o agente pergunta e o sistema responde. Não se abre todo o sistema por MCP, como não se vira todas as funções do backend em API.",
    "<b>Tool:</b> nome, título, descrição, schema e função. Em MCP não há endpoints, há tools. Em <code>perguntar.ts</code>: nome <code>perguntar</code>, schema só com a pergunta, resultado com texto e indicador de erro; a função obtém o mesmo grafo do chat, processa e responde; em erro devolve a mensagem com <code>isError: true</code>.",
    "<b>A descrição é prompt:</b> o cliente MCP a coloca no contexto e decide se chama a tool. Deve declarar: indicadores financeiros (receita líquida, lucro líquido) de 20 empresas da B3 com dados da CVM; busca na web quando o corpus não basta; toda resposta cita fonte e período; nunca recomenda comprar, vender ou manter; não é consultoria, e pedido de opinião é recusado pela própria resposta, não pela ausência da tool.",
    "<b>Transportes:</b> stdio é a interface local de texto (console), basicamente um script executado quando o agente pergunta, adicionado com <code>claude mcp add</code>. Streamable HTTP expõe a mesma tool num servidor: standalone com porta própria (<code>MCP_HTTP_PORT</code>, default 3100) e dentro do apps/api como gateway em <code>/api/mcp</code>, sem CORS novo. Stateless: GET e DELETE respondem 405.",
    "<b>Uma instância do grafo:</b> /chat e /mcp compartilham o mesmo grafo, senão haveria dois SearchProviders e dois circuit breakers independentes para a mesma API. Com instância única, o circuito abre e toda a resiliência vale em qualquer porta de entrada.",
    "<b>Separação biblioteca x execução:</b> a superfície pública importada pela API (plugin e tipos) fica separada dos arquivos com efeito colateral (bootstrap do stdio, <code>app.listen()</code> do HTTP standalone); importar como biblioteca nunca dispara nenhum dos dois."
   ],
   "como": [
    "Error handler: registre <code>app.setErrorHandler(errorHandler)</code> uma vez, remova os <code>reply.code(400)</code> das rotas e deixe o <code>ZodError</code> do <code>parse</code> subir.",
    "Defina o schema <code>ProblemDetails</code> (type, title, status, detail) em <code>packages/contracts</code> e exporte.",
    "Teste com a aplicação no ar: suba só a API local, faça <code>curl</code> a uma rota inexistente (a aula mostra resposta unificada com 404 e mensagem de rota POST não encontrada) e envie body vazio à rota de chat para ver o 400 no formato do contrato.",
    "MCP: crie <code>packages/mcp-server</code> com uma tool <code>perguntar</code> que roda o grafo inteiro (retrieve, grade, webSearch, answer). O grafo entra por parâmetro (<code>GetGraph</code>/<code>GraphLike</code>) para testar com fake e <code>InMemoryTransport</code> do SDK.",
    "Se o grafo falhar, a tool não deixa a exceção crua vazar: devolve <code>isError: true</code>. A construção do grafo real (Postgres e Vertex AI, com clientes de embeddings, grade e answer) mora em <code>packages/agent</code> e é construída só na primeira chamada, nunca na inicialização.",
    "Ambiente local em seis passos: Docker Compose para o Postgres, <code>.env</code> na raiz (<code>DATABASE_URL</code> para o Postgres local, <code>GOOGLE_CLOUD_PROJECT</code>, <code>GOOGLE_CLOUD_LOCATION=global</code>, <code>MODEL_GRADE=gemini-3.5-flash-lite</code>, <code>MODEL_ANSWER=gemini-3.6-flash</code>, <code>MODEL_EMBEDDING=gemini-embedding-001</code>), migration, <code>pnpm seed</code>, build do servidor e <code>claude mcp add</code>, e então a pergunta numa outra aba do Claude Code.",
    "Pergunta de teste que força a tool: &quot;Usando a tool perguntar do servidor ai-researcher, qual foi a receita líquida da Vale no último trimestre?&quot;. Sem citar a tool, o agente decide pela descrição. Na demonstração a resposta veio da fonte web complementar (R$ 53 bilhões) com fontes citadas.",
    "HTTP: plugin Fastify reutilizável <code>mcpHttpPlugin</code> (no repo, <code>mcpHttpRoute</code>), registrado no standalone e dentro do apps/api; só POST aceito, GET e DELETE retornam 405. Faça commit antes da mudança para ver o diff."
   ],
   "aplica": [
    "Qualquer API que precisa de contrato de erro único para frontend e para agentes consumidores.",
    "Expor um agente ou backend a outros agentes com uma superfície mínima (uma tool) e guardrail do lado de dentro.",
    "Serviço que roda local para um agente de CLI (stdio) e também em servidor (HTTP) com a mesma lógica.",
    "Decidir entre acoplar pacotes (instanceof) e manter desacoplamento (duck typing) conversando com o agente antes de executar."
   ],
   "pros": [
    "Erro unificado simplifica rotas, UX do frontend e o consumo por outros agentes, com menos tokens.",
    "Stack trace fica na telemetria interna; o cliente externo não recebe pista para ataque.",
    "Uma tool só reduz a superfície e mantém o guardrail dentro do sistema.",
    "Mesma lógica em dois transportes; grafo compartilhado mantém um único circuit breaker."
   ],
   "contras": [
    "Duck typing por nome quebra silenciosamente se a exceção for renomeada.",
    "Uma tool única limita o que o agente externo pode fazer.",
    "Descrição de tool mal escrita faz o cliente MCP chamar (ou deixar de chamar) a tool errada.",
    "Stateless no HTTP recria servidor e transport por POST."
   ],
   "traps": [
    "Rota tratando erro por conta própria: quebra o contrato e espalha a regra.",
    "Devolver <code>error.stack</code> ou a mensagem crua da exceção ao cliente externo.",
    "Duas instâncias do grafo (uma por rota) criam dois circuit breakers para o mesmo serviço.",
    "Efeito colateral no módulo de biblioteca (listen ou bootstrap no import).",
    "Código: no repo final o handler usa <code>instanceof CircuitoAbertoError</code>, não duck typing, e a tool devolve o texto do erro; ver armadilhas abaixo."
   ],
   "tip": "Escreva a descrição da tool como um prompt: domínio, o que faz, o que nunca faz e o formato da resposta, e teste forçando e não forçando o uso da tool.",
   "cola": [
    [
     "RFC 7807",
     "Formato padrão de erro HTTP, application/problem+json, com type, title, status, detail."
    ],
    [
     "setErrorHandler",
     "Registro único do tratamento de erro do Fastify; nenhuma rota trata erro sozinha."
    ],
    [
     "Duck typing",
     "Reconhecer o erro pelas características (Error com certo name), não pelo tipo importado."
    ],
    [
     "MCP",
     "Model Context Protocol: expõe tools de um backend para agentes."
    ],
    [
     "Tool",
     "Nome, título, descrição, schema e função executada a partir da entrada do agente."
    ],
    [
     "isError",
     "Indicador no resultado da tool para sinalizar falha sem lançar exceção."
    ],
    [
     "stdio",
     "Transporte local por entrada e saída de texto; executa um script."
    ],
    [
     "Streamable HTTP",
     "Transporte MCP por POST em servidor; no projeto, stateless."
    ],
    [
     "InMemoryTransport",
     "Transporte em memória do SDK para testar o servidor MCP inteiro."
    ],
    [
     "Stateless",
     "Sem sessão em memória entre chamadas; GET e DELETE respondem 405."
    ]
   ],
   "links": [
    [
     "Capstone Project AI Researcher",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
    ],
    [
     "AI Researcher Seed",
     "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
    ],
    [
     "packages/mcp-server",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/mcp-server"
    ],
    [
     "apps/api",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api"
    ],
    [
     "RFC 7807",
     "https://datatracker.ietf.org/doc/html/rfc7807"
    ],
    [
     "Model Context Protocol",
     "https://modelcontextprotocol.io"
    ]
   ],
   "codigo": [
    {
     "proj": "apps/api (app.ts, error-handler.ts) e packages/contracts/src/problem.ts",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api/src",
     "resumo": "Li o handler, o schema, o app e os testes. Não executei. O handler do repo final já inclui mapeamentos acrescentados depois da aula (429).",
     "fluxo": [
      "<code>packages/contracts/src/problem.ts</code>: <code>problemDetailsSchema</code> (zod) com <code>type</code>, <code>title</code>, <code>status</code>, <code>detail</code> e o tipo <code>ProblemDetails</code>.",
      "<code>apps/api/src/error-handler.ts</code>: <code>paraProblema(error)</code> mapeia <code>ZodError</code> para 400, <code>CircuitoAbertoError</code> para 503, <code>OrcamentoDiarioExcedidoError</code> e <code>LimiteDeRequisicoesExcedidoError</code> para 429, e o resto para 500 com detalhe fixo &quot;Ocorreu um erro inesperado. Tente novamente.&quot;.",
      "<code>errorHandler</code>: <code>request.log.error(error)</code> e <code>reply.code(status).type('application/problem+json').send(problema)</code>; o stack vai para o log interno, não para a resposta.",
      "<code>apps/api/src/app.ts</code>: <code>app.setErrorHandler(errorHandler)</code> logo após criar o Fastify; <code>BASE_URL</code> dos tipos é <code>https://ai-researcher.dev/problems</code>.",
      "<code>apps/api/src/error-handler.test.ts</code>: um teste por mapeamento, incluindo 500 que não contém o texto do erro interno; <code>app.test.ts</code> verifica 400 com <code>application/problem+json; charset=utf-8</code> para question ausente."
     ],
     "rodar": [
      "<code>pnpm --filter @hero/api test</code> (hipótese de filtro; não executei).",
      "<code>pnpm dev</code> e <code>curl</code> na API para ver o problem+json (a porta padrão é <code>PORT</code> ou 3000, conforme <code>index.ts</code>)."
     ],
     "armadilhas": [
      "Achado: a aula conta que o Claude Code optou por duck typing por não existir dependência da API no pacote do agente; no repo final <code>apps/api/package.json</code> já depende de <code>@hero/agent</code> e <code>error-handler.ts</code> usa <code>error instanceof CircuitoAbertoError</code> importado de <code>@hero/agent</code>. O histórico (commit 20f1620, E.7) já mostra <code>instanceof</code>; não encontrei duck typing em nenhuma versão (<code>git log -S</code>). A decisão da aula não está no código.",
      "Achado: <code>CircuitoAbertoError</code> é reexportado em <code>packages/agent/src/index.ts</code>, o que a aula dizia que não acontecia.",
      "Achado: o handler do repo vai além da aula, com 429 para orçamento diário e limite de requisições.",
      "Não verifiquei se o 404 de rota inexistente passa pelo handler: não há <code>setNotFoundHandler</code> no repo, então o formato dessa resposta depende do comportamento padrão do Fastify (hipótese, não testei)."
     ]
    },
    {
     "proj": "packages/mcp-server",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/mcp-server",
     "resumo": "Li o servidor, a tool, os dois transportes e os testes; li também a integração em apps/api/src/app.ts. Não executei build nem testes, e não li o .env.example (acesso negado no ambiente).",
     "fluxo": [
      "<code>src/tools/perguntar.ts</code>: <code>GraphLike { invoke({question}) =&gt; Promise&lt;{answerText}&gt; }</code>; <code>DESCRICAO</code> com domínio (20 empresas da B3, CVM), busca web, citação de fonte e período, e &quot;NUNCA recomenda&quot;; <code>perguntarInputSchema</code> com <code>question</code> (<code>z.string().min(1)</code>); <code>perguntarConfig</code> com título &quot;Perguntar ao AI Researcher&quot;.",
      "<code>makePerguntarTool(graph)</code>: sucesso devolve <code>content: [{type:'text', text: answerText}]</code>; falha devolve <code>isError: true</code> com <code>Não foi possível responder agora: ${detalhe}</code>.",
      "<code>src/server.ts</code>: <code>criarServidor(graph = criarGraphPadrao())</code> cria <code>McpServer({name:'ai-researcher'})</code> e <code>registerTool('perguntar', ...)</code>; <code>criarGraphPadrao</code> memoiza <code>buildGraph(criarGraphDepsPadrao())</code> na primeira chamada de <code>invoke</code>.",
      "<code>src/stdio.ts</code>: <code>registrarLangfuseTracing()</code>, <code>criarServidor()</code>, <code>StdioServerTransport</code> e <code>server.connect</code> (efeito colateral ao importar); <code>package.json</code>: <code>start:stdio</code> = <code>node dist/stdio.js</code>.",
      "<code>src/http-route.ts</code>: plugin Fastify <code>mcpHttpRoute</code>; <code>POST /mcp</code> cria server e <code>StreamableHTTPServerTransport({ sessionIdGenerator: undefined })</code> por requisição (stateless); GET e DELETE respondem 405 com JSON-RPC <code>-32000</code>.",
      "<code>src/http.ts</code>: standalone, <code>MCP_HTTP_PORT</code> default 3100, <code>listen</code> em <code>0.0.0.0</code>; <code>src/index.ts</code>: superfície pública (<code>criarServidor</code>, <code>mcpHttpRoute</code>, <code>makePerguntarTool</code>, tipos) sem efeito colateral.",
      "<code>apps/api/src/app.ts</code>: <code>criarObterGrafo()</code> memoiza um único grafo; <code>/chat</code> usa <code>obterGrafo().stream</code> e <code>mcpHttpRoute</code> usa <code>obterGrafo().invoke</code>; registrado dentro do prefixo <code>/api</code>, vira <code>/api/mcp</code>.",
      "Testes: <code>server.test.ts</code> (InMemoryTransport, lista 1 tool <code>perguntar</code> e chama ponta a ponta), <code>tools/perguntar.test.ts</code> (isError), <code>http-route.test.ts</code> (POST e 405), <code>apps/api/src/app.test.ts</code> (<code>/api/mcp</code> com <code>StreamableHTTPClientTransport</code>)."
     ],
     "rodar": [
      "<code>pnpm --filter @hero/mcp-server build</code> e depois <code>claude mcp add ai-researcher -- node &lt;caminho&gt;/packages/mcp-server/dist/stdio.js</code> (nome vem do prompt da aula; forma exata do comando é hipótese, não executei).",
      "<code>pnpm --filter @hero/mcp-server dev:http</code> para o servidor HTTP standalone (porta 3100).",
      "<code>pnpm --filter @hero/mcp-server test</code> e <code>pnpm --filter @hero/api test</code> (não executei).",
      "Ambiente da aula: Docker Compose do repo, <code>pnpm db:migrate</code>, <code>pnpm seed</code> (scripts da raiz do package.json)."
     ],
     "armadilhas": [
      "Achado: a aula diz que a tool devolve mensagem genérica em erro; o código devolve <code>Não foi possível responder agora: ${detalhe}</code> com <code>error.message</code> cru, e o teste exige que o texto contenha &quot;Vertex AI indisponível&quot;. Isso pode vazar detalhe interno ao cliente MCP, na contramão da Aula 16.",
      "Achado: a aula pede que a construção do grafo real, memoizada por processo, more em <code>packages/agent</code>. No repo, <code>criarGraphDepsPadrao()</code> está em <code>packages/agent/src/graph-deps.ts</code>, mas a memoização está duplicada em <code>mcp-server/src/server.ts</code> e em <code>apps/api/src/app.ts</code>.",
      "Achado: no HTTP standalone (<code>http.ts</code>), <code>mcpHttpRoute</code> é registrado sem <code>graph</code> e <code>criarServidor(graph)</code> roda a cada POST; como o default <code>criarGraphPadrao()</code> é avaliado a cada chamada, cada requisição cria um grafo novo, com um novo SearchProvider e circuit breaker. Isso contraria o ponto da aula de instância única (que só vale dentro da API, onde o grafo é injetado). Conclusão de leitura de código, não testei.",
      "Achado: o nome do plugin na aula é <code>mcpHttpPlugin</code>; no repo é <code>mcpHttpRoute</code> (default export de <code>http-route.ts</code>).",
      "Achado: o prompt da aula nomeia o tipo <code>GetGraph</code>; no código a interface se chama <code>GraphLike</code> e não há <code>GetGraph</code>."
     ]
    }
   ]
  },
  {
   "id": "D11-13",
   "bloco": "d11-b3",
   "mod": "Unidade 4 · Aula 18",
   "emoji": "🎨",
   "read": "8 min",
   "title": "Do protótipo no Claude Design à skill frontend-design",
   "short": "Prompt vira protótipo, protótipo exportado em HTML vira skill de design, skill gera tokens globais e a casca estática do chat.",
   "oneliner": "A tela nasce de um <b>prompt no Claude Design</b>, refinado por iteração e exportado em <b>HTML standalone</b>. O Claude Code lê esse HTML e cria a skill <b>frontend-design</b> (tokens, tipografia, forma e padrões de componente), que depois gera os <b>tokens globais</b> e a <b>casca estática</b> do chat em Angular, sem lógica de streaming.",
   "vovo": [
    "É como contratar um reformador de casa: antes de quebrar parede, você mostra uma maquete e uma paleta de tintas. A maquete é o protótipo. O caderno de regras (\"cozinha sempre azul, só a porta da frente é verde\") é a skill: qualquer pedreiro novo que chegar consulta o caderno e não precisa adivinhar.",
    "A casca estática é a casa pintada e mobiliada, mas ainda sem luz nem água: tem o formato do chat, mas nada conversa com o backend."
   ],
   "oque": [
    "<b>Ferramentas de design com IA:</b> Claude Design (a partir da assinatura Pro, no app ou no site) e Google Stitch (gratuito, cota generosa). Ambos funcionam por prompt. A aula diz que qualquer uma serve e que o importante é o processo.",
    "<b>Claude Design vai além de UX:</b> cria design system inteiro, slides, documentos, mockups e diagramas. O projeto não usa design system, mas poderia.",
    "<b>Prompt do protótipo:</b> chat consultor de investimentos estilo ChatGPT, paleta da página da UNIPDS (fundo quase-preto, accent ciano, um único botão verde-limão no envio), bolha do usuário à direita e do assistente à esquerda com avatar, texto token a token com cursor piscando, painel lateral com 4 etapas (Retrieve, Grade, Search, Answer) em 3 estados, citação clicável abrindo painel com data-base, origem e link.",
    "<b>Tudo é mock:</b> o código que a ferramenta gera pouco importa. O protótipo é exemplo para a aplicação Angular, não código de produção.",
    "<b>Refino por conversa:</b> pílula de citação com borda ciano parada (fechada) e preenchida (aberta); banner de fallback de busca web na mesma paleta ciano; remover a barra lateral de conversas (a app não guarda conversas); destacar em vermelho o aviso de conteúdo informativo.",
    "<b>Fallback não é erro:</b> a busca web é caminho normal do sistema, por isso o banner usa ciano e não vermelho/amarelo de alerta.",
    "<b>Exportação:</b> compartilhar, exportar em HTML, escolher <b>HTML standalone</b> (uma página só, JS embutido) em vez do ZIP, e salvar numa pasta de exemplo de UI do projeto. Não exportar em PDF: o agente teria menos dados para extrair.",
    "<b>Skill frontend-design:</b> criada pelo Claude Code em <code>.claude/skills/frontend-design/</code>, com descrição, origem das regras e tokens (cores em hex, tipografia, formas). Regra de produto embutida: nunca verde ou vermelho em dado financeiro ou estado do pipeline, só ciano é cor de estado.",
    "<b>Três fontes de regras no frontend:</b> angular-component (criada para o projeto, arquitetura), skills do time do Angular (sintaxe atual) e frontend-design (aparência). O protótipo continua como exemplo ao lado da skill.",
    "<b>Skills da comunidade:</b> reduzem a dependência do modelo; um modelo fraco pode gerar Angular com padrões antigos, a skill força as práticas atuais."
   ],
   "como": [
    "Escreva o prompt descrevendo estilo, mensagens, streaming, painel lateral e citação (a aula mostra o prompt inteiro). Alternativa mais assertiva: escrever uma spec do frontend (spec-driven) e conversar com o Claude até chegar num prompt melhor.",
    "Itere no que não foi pedido ou ficou diferente: o Claude Design testa o próprio CSS (na demo percebeu o scroll quebrado e adicionou rolagem automática).",
    "Exporte como HTML standalone e salve em <code>docs/design/prototype/</code> (no repo: <code>ai-researcher-chat.dc.html</code> mais <code>design-tokens-used.md</code>).",
    "Prompt ao Claude Code: ler o HTML e o <code>design-tokens-used.md</code>, criar <code>.claude/skills/frontend-design/</code> traduzindo tokens de cor, tipografia e forma e os padrões de componente (bolha, citação, painel do pipeline, disclaimer, botão de envio) em regras para Angular, incluindo a regra de só ciano como cor de estado.",
    "Prompt seguinte: usando a skill, declarar tokens de cor e tipografia como custom properties globais em <code>styles.scss</code> e gerar a casca estática do Chat (header com wordmark, faixa de disclaimer, área de mensagens vazia, composer com input e botão Enviar), sem streaming.",
    "Na demo o Claude Code perguntou sobre a fonte, o autor mandou adicionar; ele adicionou as fontes, criou a folha de estilos, criou o chat só com HTML, fez o build e refatorou o primeiro componente, que servia só ao health check.",
    "Nessa etapa só a frontend-design é usada; as skills do Angular entram quando o trabalho passa a envolver lógica de componente.",
    "Verificação: com a extensão do Claude no Chrome, o Claude Code abre o navegador e testa a interface além dos testes unitários."
   ],
   "aplica": [
    "Qualquer front novo em que você quer consistência visual entre sessões de agente: protótipo exportado vira fonte de verdade versionada.",
    "Times com design system: a skill pode apontar para os tokens do DS em vez de hex solto.",
    "Vue ou React: o processo é o mesmo, combinando com skills da comunidade do framework.",
    "Regras de domínio que viram regra de estilo (aqui: nada de verde/vermelho em dado financeiro, para não sugerir compra e venda)."
   ],
   "pros": [
    "Menos tokens e mais assertividade: o agente recebe exemplo concreto em vez de descrição vaga.",
    "Regras de estilo ficam versionadas no repo e valem para qualquer sessão ou modelo.",
    "Iteração visual rápida antes de escrever uma linha de Angular.",
    "Carregamento sob demanda: a skill só entra no contexto quando o trabalho é de estilo."
   ],
   "contras": [
    "O protótipo é mock: pode inventar elementos não pedidos (a barra de conversas) que você precisa remover.",
    "Skill gerada a partir do mockup pode divergir do que o código real faz (ver achados).",
    "Dependência de ferramenta paga ou com cota (Claude Design exige Pro).",
    "Prompt único é simplificação; sem spec, o resultado depende do que você lembrou de pedir."
   ],
   "traps": [
    "Exportar em PDF: o agente tem menos dados para extrair e pensar o código.",
    "Deixar o agente hardcodar hex e fonte em cada componente: a skill manda sempre usar variável.",
    "Usar verde ou vermelho em dado financeiro ou estado do pipeline: viola a regra de produto (informa, não recomenda).",
    "Misturar a variante Nocturne (roxo/Inter) com a canônica: a skill do repo manda seguir a canônica.",
    "Confiar no código gerado pela ferramenta de design em vez de tratá-lo como exemplo."
   ],
   "tip": "Depois de gerar a skill, abra o <code>SKILL.md</code> e confira se cada regra aponta para um trecho do protótipo; regra sem origem rastreável vira dívida quando o design mudar.",
   "cola": [
    [
     "Claude Design",
     "Ferramenta de design por prompt do Claude (a partir do plano Pro); gera protótipo, design system, slides e mockups."
    ],
    [
     "Google Stitch",
     "Alternativa gratuita de design por prompt, com cota generosa."
    ],
    [
     "HTML standalone",
     "Export com todo o código (JS dentro) em uma página; formato preferido para alimentar o agente."
    ],
    [
     "Skill",
     "Pasta com SKILL.md carregada sob demanda pelo agente; traz regras do projeto."
    ],
    [
     "frontend-design",
     "Skill do projeto com tokens e padrões de componente traduzidos do protótipo."
    ],
    [
     "Tokens globais",
     "Custom properties CSS (--bg, --cyan, --lime, fontes) declaradas em styles.scss."
    ],
    [
     "Casca estática",
     "Componente Chat só com HTML: header, disclaimer, mensagens vazias e composer, sem lógica."
    ],
    [
     "Cor de estado",
     "Só ciano marca pendente, em execução, concluído e fallback."
    ],
    [
     "Spec-driven",
     "Escrever a especificação antes de gerar; alternativa ao prompt único."
    ]
   ],
   "links": [
    [
     "Projeto completo (capstone)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main"
    ],
    [
     "Skill frontend-design",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/.claude/skills/frontend-design"
    ],
    [
     "Protótipo exportado",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/docs/design/prototype"
    ],
    [
     "Ponto de partida (seed)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
    ]
   ],
   "codigo": [
    {
     "proj": ".claude/skills/frontend-design, docs/design/prototype, apps/web/src/styles.scss",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/.claude/skills/frontend-design",
     "resumo": "Li o SKILL.md da frontend-design, o design-tokens-used.md e o styles.scss do repo completo. O seed só traz o health check no Angular (apps/web/src/app/api/health.service.ts), sem chat. Não abri o HTML do protótipo inteiro nem rodei o build.",
     "fluxo": [
      "<code>docs/design/prototype/ai-researcher-chat.dc.html</code>: protótipo canônico exportado do Claude Design (existe também a variante <code>ai-researcher-chat-nocturne.dc.html</code>, skin roxo/Inter, só referência).",
      "<code>docs/design/prototype/design-tokens-used.md</code>: origem dos tokens (amostra de cor de um print da landing da UNIPDS; Anton e Poppins são inferência visual).",
      "<code>.claude/skills/frontend-design/SKILL.md</code>: tokens de cor (<code>--bg #080909</code>, <code>--surface #141517</code>, <code>--surface-2 #1c1e21</code>, <code>--border #2b2e32</code>, <code>--text #f2f3f4</code>, <code>--text-muted #95999e</code>, <code>--cyan #14fefe</code>, <code>--cyan-dim #0d8f8f</code>, <code>--cyan-tint</code>, <code>--lime #a3ea1f</code>).",
      "Mesma skill: tipografia (<code>--font-display</code> Anton só no wordmark, <code>--font-body</code> Poppins), raios (6px botões/inputs, 8px painéis, 10px bolhas, 999px pílulas, 50% círculos), e tabela de padrões de componente apontando para trechos do protótipo.",
      "Mesma skill: regra de domínio \"--cyan é a única cor de estado\" e números monetários em peso 700 com tabular-nums, sempre em --text.",
      "<code>apps/web/src/styles.scss</code>: declara os mesmos tokens em <code>:root</code> e o corpo usa <code>var(--bg)</code>, <code>var(--text)</code>, <code>var(--font-body)</code>.",
      "<code>.claude/skills/angular-component/SKILL.md</code>: a skill de arquitetura que complementa (a frontend-design diz explicitamente que não cobre arquitetura)."
     ],
     "rodar": [
      "git clone do repo completo e abrir <code>docs/design/prototype/ai-researcher-chat.dc.html</code> no navegador para ver o mock",
      "<code>pnpm install</code> na raiz e <code>pnpm --filter @hero/web run start</code> (ng serve na porta 4200, com proxy /api para 3000)",
      "<code>pnpm test</code> na raiz (turbo run test); não executei"
     ],
     "armadilhas": [
      "Achado: a skill do repo descreve citação inline <code>[n]</code> (pílula no meio do texto, <code>tok.isCite</code>), mas o código final usa pílulas abaixo da resposta a partir do bloco \"Fontes:\" (ver state/citation.ts e o CLAUDE.md, F.4). A skill ficou com a descrição do protótipo.",
      "Achado: a skill diz que o botão Enviar vazio fica <code>surface-2</code>/text-muted; o chat.scss tem um bloco <code>.chat__send:disabled</code> com <code>background: var(--surface-2)</code>, coerente com o bug do botão desabilitado com cara de habilitado que a Aula 19 corrige.",
      "A aula diz que a skill tem partes Descrição, Origem e Tokens; o SKILL.md real tem também tabela de componentes, ícones e a seção \"Duas variantes existem\". Mais completo que o narrado.",
      "Fontes Anton e Poppins vêm do Google Fonts por inferência visual, não de um brand guide: trate como decisão revisável."
     ]
    }
   ]
  },
  {
   "id": "D11-14",
   "bloco": "d11-b3",
   "mod": "Unidade 4 · Aulas 19 e 20",
   "emoji": "💬",
   "read": "12 min",
   "title": "Chat com streaming e citações clicáveis + painel de estado do grafo",
   "short": "ChatService lê o SSE, ChatStore revela a resposta aos poucos, parseAnswer monta citações e GraphStore deduz o andamento do grafo.",
   "oneliner": "O <b>ChatService</b> faz POST em <code>/api/chat</code> e devolve um async generator de eventos; o <b>ChatStore</b> guarda mensagens e solta a resposta aos poucos (70 ms por passo); o <b>parseAnswer</b> separa corpo e fontes; o <b>GraphStore</b> deduz o andamento do grafo a partir de eventos de nó concluído, espelhando o limite de iterações sem importar o pacote do agente.",
   "vovo": [
    "Pense numa transmissão ao vivo de futebol com narrador. A rede entrega os lances em rajadas irregulares, mas o narrador (ChatStore) fala num ritmo constante para o texto parecer natural. A régua de pontos no canto da tela (painel do grafo) só recebe \"fulano terminou a jogada\"; quem desenha a próxima jogada é o próprio painel, adivinhando pelas regras do jogo.",
    "As citações são a bibliografia no fim do artigo: o texto vem primeiro, as fontes aparecem quando ele termina, e cada fonte diz se veio do arquivo da casa (base local da CVM) ou da internet."
   ],
   "oque": [
    "<b>Peças (Aula 19):</b> rotas (chat na raiz, health em /health), ChatService (POST + leitura do stream), ChatStore (mensagens e revelação), parseAnswer (citações) e o componente Chat que liga tudo.",
    "<b>Roteamento:</b> a aula refatora o frontend para <code>app.routes.ts</code> com '' para Chat e 'health' para um componente Health novo, <code>provideRouter</code> em app.config e <code>&lt;router-outlet /&gt;</code> em app.html. Standalone components, sem módulos.",
    "<b>Bug da rota /chat da API:</b> depois do MCP, a rota respondia só pelo grafo falso. A correção faz a rota receber um <code>getGraph</code> resolvido com <code>await</code> no handler, e o <code>index.ts</code> passa a mesma função memoizada (<code>getRealGraph</code>) para chat e MCP, para não duplicar Postgres, Vertex AI e circuit breaker.",
    "<b>ChatService:</b> método <code>ask(question)</code> com fetch POST, leitura do ReadableStream e async generator dos eventos (retrieve, grade, webSearch, answer). Frames separados por linha em branco, com <code>data:</code> e JSON. Evento <code>error</code> lança exceção com a mensagem.",
    "<b>Contrato no pacote compartilhado:</b> o schema do evento vive em <code>@hero/contracts</code>, servindo Angular e backend. Angular atual: <code>inject()</code>, Observable não é mais obrigatório com signals, e <code>resource</code> não foi usado porque na época não tratava retorno por stream.",
    "<b>ChatStore e o truque da digitação fluida:</b> chunks chegam irregulares; mostrar como chegam deixa o texto truncado. O store guarda a resposta como buffer e a solta a 70 ms por passo. Não é obrigatório, é UX. Falha na chamada mostra mensagem de erro fixa, sem streaming, e timers pendentes são limpos.",
    "<b>Citações:</b> o answerText termina com um bloco de fontes. Rótulo com ticker e período vira origem 'Base local (CVM)' com data-base; qualquer outro vira o hostname da URL.",
    "<b>Componente Chat:</b> injeta o store, liga input a um signal local, Enter envia, botão desabilitado enquanto vazio ou aguardando resposta, mensagens com <code>@if</code>/<code>@for</code> (sintaxe atual, em vez de ngIf/ngFor).",
    "<b>Painel do grafo (Aula 20):</b> requisito do projeto, didático (ChatGPT e Gemini não mostram). O backend informa cada nó <i>conforme o processa</i>, nunca avisa que concluiu um e que outro vem; o frontend deduz. A cada evento: marca a última etapa como concluída e prevê a próxima.",
    "<b>Tabela de previsão:</b> retrieve leva sempre a grade; grade suficiente leva a answer; grade insuficiente leva a webSearch, exceto se o máximo de iterações já foi atingido (aí answer); webSearch leva sempre a retrieve.",
    "<b>Espelhar sem importar:</b> o limite de iterações é copiado como constante no frontend porque @hero/agent carrega LangGraph, Vertex AI e Postgres, que não pertencem ao bundle. Risco: se o backend mudar o limite (ex.: 3) o front fica errado. Atenuante: monorepo, o agente lê os dois.",
    "<b>Componente do painel:</b> timeline vertical, spinner enquanto running, check quando concluída, rótulo, descrição e duração; banner de fallback quando alguma etapa é webSearch. Durações são calculadas no frontend pela chegada dos eventos, portanto aproximadas (medição precisa é a Aula 22)."
   ],
   "como": [
    "Backend escreve <code>data: {json}\\n\\n</code> por nó concluído; o ChatService acumula bytes num buffer, divide em <code>\\n\\n</code>, guarda o resto parcial e entrega cada frame.",
    "<code>ask()</code> valida cada evento com o schema do contrato antes de entregar; se o frame for <code>event: error</code>, lança <code>Error</code> com a mensagem.",
    "<code>ChatStore.send()</code>: ignora vazio ou se já há envio pendente; adiciona mensagem do usuário e placeholder do assistente; chama <code>graphStore.startRun()</code>; para cada evento chama <code>graphStore.onEvent()</code> e, no evento answer com texto, inicia a revelação.",
    "A revelação faz <code>parseAnswer(fullText)</code>, tokeniza só o corpo e avança 1 token a cada 70 ms; as citações aparecem de uma vez quando a mensagem termina.",
    "<code>parseAnswer</code> procura <code>\\n\\nFontes:\\n</code>; cada linha <code>- rótulo: url</code> vira uma Citation; rótulo com período vira 'Base local (CVM)' + data-base, senão origem é o hostname (ou 'Busca web' se a URL for inválida).",
    "Teste local: Postgres no ar com migrate e seed feitos. O Postgres da aula é efêmero (sem volume); reiniciou a máquina, suba e semeie de novo. Com volume Docker a carga persiste.",
    "Verificação no navegador pelo agente (Claude no Chrome, porta 4200): pergunta sobre o lucro líquido da Petrobras; o agente achou o botão desabilitado com aparência de habilitado, corrigiu e retestou. Teste unitário não pegaria isso.",
    "GraphStore: <code>startRun()</code> zera e empurra retrieve em execução; <code>onEvent()</code> conclui a última etapa do mesmo nó e empurra a prevista; <code>failRun()</code> fecha a etapa pendente se o stream falhar.",
    "Monorepo com Turborepo permite rodar todos os testes (a aula fala em mais de 40), só os de frontend ou só uma parte do backend."
   ],
   "aplica": [
    "Qualquer chat com LLM via SSE sobre POST (EventSource só faz GET).",
    "UX de streaming irregular: buffer no cliente e revelação em ritmo fixo.",
    "Agentes com etapas visíveis ao usuário, mesmo quando o backend só emite nó concluído.",
    "Monorepo front e back: espelhar constante em vez de importar pacote de servidor no bundle."
   ],
   "pros": [
    "Serviço isola integração; componente só renderiza.",
    "Revelação em ritmo fixo esconde a irregularidade da rede.",
    "Painel dá transparência do raciocínio sem mudar o backend.",
    "Contrato compartilhado reduz drift entre front e back."
   ],
   "contras": [
    "Revelação artificial atrasa a resposta que já chegou inteira.",
    "Previsão do próximo nó é heurística; se o grafo mudar, o painel mente.",
    "Constante espelhada pode ficar desatualizada.",
    "Durações do cliente incluem latência de rede e não são medida do backend."
   ],
   "traps": [
    "Importar @hero/agent no frontend: leva LangGraph, Vertex AI e pg para o bundle (o prompt precisa proibir).",
    "Duas instâncias do grafo (chat e MCP): circuit breaker e conexões duplicados; use a mesma função memoizada.",
    "Achar que teste unitário cobre aparência: o botão desabilitado com cara de habilitado só apareceu no navegador.",
    "Postgres local efêmero: depois de reiniciar a máquina os testes falham até refazer migrate e seed.",
    "Mostrar erro de backend cru na tela: use mensagem fixa."
   ],
   "tip": "Escreva a tabela de transições do grafo uma vez (no pacote do agente) e cubra a cópia do frontend com um teste que falha se MAX_ITERATIONS divergir; espelhar sem teste é aposta.",
   "cola": [
    [
     "ChatService",
     "Serviço Angular que faz POST em /api/chat e devolve AsyncGenerator de eventos."
    ],
    [
     "ChatStore",
     "Store com signals: mensagens, estado pendente e revelação da resposta."
    ],
    [
     "parseAnswer",
     "Separa o corpo do bloco 'Fontes:' e monta as Citation."
    ],
    [
     "GraphStore",
     "Store que deduz etapas concluídas e prevê a próxima a partir dos eventos."
    ],
    [
     "STREAM_SPEED_MS",
     "Constante de 70 ms do ritmo de revelação."
    ],
    [
     "SSE por POST",
     "Frames 'data: json' separados por linha em branco, lidos do ReadableStream."
    ],
    [
     "Fallback",
     "Passagem por webSearch quando o contexto local é insuficiente."
    ],
    [
     "MAX_ITERATIONS",
     "Limite de rodadas do loop retrieve, grade, webSearch (2 no repo)."
    ],
    [
     "getRealGraph",
     "Função memoizada que entrega o mesmo grafo ao chat e ao MCP."
    ],
    [
     "Pirâmide de testes",
     "Unitário, integração e navegador se complementam."
    ]
   ],
   "links": [
    [
     "Projeto completo (capstone)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main"
    ],
    [
     "apps/web (Angular)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/web"
    ],
    [
     "state/ (stores e parseAnswer)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/web/src/app/state"
    ],
    [
     "Ponto de partida (seed)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
    ]
   ],
   "codigo": [
    {
     "proj": "apps/web/src/app (api, state, chat, graph), apps/api/src/routes/chat.ts, packages/contracts/src/chat.ts",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/web/src/app",
     "resumo": "Li todos os arquivos citados abaixo no repo completo. Contei 38 blocos <code>it(</code> em 9 arquivos de spec de apps/web com grep, mas não executei os testes nem o build. O seed só tem o health check no Angular.",
     "fluxo": [
      "<code>apps/web/src/app/api/chat.service.ts</code>: <code>parseSse</code> (buffer, split em <code>\\n\\n</code>) e <code>ask()</code>; faz <code>fetch('/api/chat')</code>, lança em status não ok ou evento <code>error</code>, e valida com <code>chatStreamEventSchema.parse</code>.",
      "<code>packages/contracts/src/chat.ts</code>: <code>chatRequestSchema</code> (question min 1) e <code>chatStreamEventSchema</code> (node enum de 4 valores, documents, sufficient, missingAspects, iterations, answerText).",
      "<code>apps/web/src/app/state/chat-store.ts</code>: <code>STREAM_SPEED_MS = 70</code>, signals <code>messages</code> e <code>pending</code>, <code>send()</code>, <code>startReveal()</code> via <code>setInterval</code>, mensagem de erro fixa 'Não foi possível obter uma resposta agora...'.",
      "<code>apps/web/src/app/state/chat-message.ts</code>: <code>tokenize</code> com <code>split(/(\\s+)/)</code> mantendo espaços como tokens, e <code>visibleText</code>.",
      "<code>apps/web/src/app/state/citation.ts</code>: <code>parseAnswer</code>, marcador <code>'\\n\\nFontes:\\n'</code>, regex de linha e de rótulo com período, fallback 'Busca web'.",
      "<code>apps/web/src/app/state/graph-step.ts</code> e <code>graph-store.ts</code>: tipos, <code>detalheParaEvento</code>, <code>formatarDuracao</code>, <code>MAX_ITERATIONS = 2</code>, <code>proximoNoEsperado</code>, <code>failRun</code>.",
      "<code>apps/web/src/app/graph/graph-panel/graph-panel.ts</code> e <code>.html</code>: timeline com spinner ou check, rótulo 'Retrieve · iteração N' a partir da 2ª volta, banner de fallback com <code>fallbackActive</code>.",
      "<code>apps/api/src/app.ts</code>: <code>criarObterGrafo()</code> (instância única memoizada) alimentando <code>chatRoute</code> e <code>mcpHttpRoute</code>; <code>packages/agent/src/graph.ts</code> define <code>MAX_ITERATIONS = 2</code>."
     ],
     "rodar": [
      "<code>pnpm install</code>",
      "<code>pnpm db:migrate</code> e <code>pnpm seed</code> (Postgres local no ar, exige credenciais Vertex AI)",
      "<code>pnpm --filter @hero/web run test</code> (ng test)",
      "<code>pnpm dev</code> (turbo) ou <code>pnpm --filter @hero/web run start</code> e abrir http://localhost:4200; não executei"
     ],
     "armadilhas": [
      "Achado: a aula descreve roteamento com <code>app.routes.ts</code> e componente Health; no repo final não há <code>app.routes.ts</code>, nem <code>provideRouter</code> em app.config.ts, e <code>app.html</code> é só <code>&lt;app-chat /&gt;</code> (grep sem ocorrência de router em apps/web/src). Essa refatoração não está no estado final do repo.",
      "Achado: a aula fala em textarea com Enter envia e Shift+Enter quebra linha; o chat.html usa <code>&lt;input type=\"text\"&gt;</code> e o <code>onKeydown</code> trata só Enter, sem Shift.",
      "Achado: a aula descreve rótulo 'TICKER · período (data-base X)'; o repo usa o formato <code>TICKER (período, data-base X)</code> (regex <code>ROTULO_COM_PERIODO</code>, gerado por <code>formatarCitacoes</code> em packages/agent/src/answer/format-resposta.ts), e a citação exibida é 'VALE (3T25)'.",
      "Achado: <code>tokenize</code> mantém espaços como tokens e o intervalo de 70 ms avança 1 token por tick, então o ritmo efetivo é de cerca de 70 ms por token (palavra ou espaço), ou seja, ~35 ms por palavra, não 70 ms por palavra como a aula narra. Conclusão por leitura do código, não medi.",
      "Achado (hipótese por leitura): o evento answer é o último; ao terminar o stream <code>pending</code> vira false enquanto a revelação ainda corre. Se o usuário enviar outra pergunta nesse intervalo, <code>send()</code> chama <code>clearReveal()</code> e a mensagem anterior pode ficar com <code>done: false</code> (cursor preso). Não reproduzi.",
      "Achado: o painel do protótipo tem 4 etapas fixas; o <code>GraphStore</code> do repo modela uma lista que cresce a cada passagem por um nó (com 'iteração N'), segundo o CLAUDE.md para não colapsar o loop.",
      "Achado: o <code>ChatStore</code> também injeta o <code>GraphStore</code> e o orquestra; a aula apresenta os dois stores separados. O <code>chat.html</code> tem ainda um botão 'Nova conversa' (<code>reset()</code>) que a aula não menciona.",
      "Achado: a opção do build da API hoje é <code>graph</code>/<code>mcpGraph</code> com <code>criarObterGrafo()</code>, e não <code>getChatGraph</code>/<code>getMcpGraph</code>/<code>getRealGraph</code> como no prompt da aula; o objetivo (uma instância só) foi mantido."
     ]
    }
   ]
  },
  {
   "id": "D11-15",
   "bloco": "d11-b3",
   "mod": "Unidade 4 · Aula 21",
   "emoji": "🧪",
   "read": "9 min",
   "title": "Disclaimer, guardrail visual e o E2E no CI",
   "short": "Faixa de disclaimer fixa, modo demo estendido ao grafo inteiro e teste Playwright de caminho feliz rodando no GitHub Actions.",
   "oneliner": "O <b>disclaimer</b> é uma faixa sempre visível (sem @if, sem fechar, sem modal) que complementa o guardrail do backend. Para testar de ponta a ponta sem gastar Serper e Vertex AI, <b>DEMO=true</b> vira mock do grafo inteiro, e um <b>script Playwright</b> (criado pelo agente, executado na esteira) valida disclaimer, streaming, citação e painel do grafo.",
   "vovo": [
    "O disclaimer é a placa \"informativo, não é recomendação\" na porta de uma consultoria: fica fixa, sem botão de fechar, porque a lei pede que o cliente a veja sempre. O guardrail do backend é o segurança lá dentro; a placa só deixa a regra clara para quem chega.",
    "O E2E com mocks é um ensaio geral com figurantes: o palco, a luz e o roteiro são reais, mas os atores caros (Vertex AI e Serper) são substituídos por dublês que sempre dizem a mesma fala. Barato e repetível, mas não prova que os atores reais estão em forma."
   ],
   "oque": [
    "<b>Disclaimer fixo:</b> faixa entre header e lista de mensagens, renderizada incondicionalmente, sem <code>@if</code>, sem botão de fechar, sem modal. Texto: 'Este assistente apresenta informações públicas, não recomendação de investimento.' Respeita a diretriz da CVM.",
    "<b>Não substitui o backend:</b> a validação continua no guardrail do backend; o aviso torna a regra clara ao usuário. Nem toda obrigação precisa de muita engenharia.",
    "<b>Agente vs framework E2E:</b> agente operando o navegador é bem mais caro (tokens a cada execução) e mais lento; Playwright só consome máquina, é determinístico e roda quantas vezes quiser. Agente serve no desenvolvimento local; script serve na esteira.",
    "<b>Caminho adotado:</b> o Claude Code escreve o script e o Playwright o executa na esteira. Saber Cypress ou Playwright continua necessário.",
    "<b>Modo demo estendido (flag criada na Aula 14 só para o Serper):</b> embeddings devolvem vetor de zeros, busca devolve sempre o mesmo documento real da Vale 3T25 congelado do corpus, grade sempre considera suficiente, answer devolve resposta fixa.",
    "<b>Seed fora do demo:</b> o <code>embedDocuments()</code> em lote, usado só pelo seed real, é isolado em <code>criarEmbeddingsReal()</code>; o seed nunca roda em modo demo. Tudo só vale com <code>DEMO</code> igual a <code>true</code>. Depois da refatoração, a aula cita 82 testes unitários.",
    "<b>Trade-offs de mocks:</b> podem maquiar problemas do backend; escolha por custo e rapidez. Alternativas: flags mais finas (uma só para o Serper, outra só para a Vertex AI) ou sem mocks (o teste quebra por razão alheia, como o Serper fora do ar).",
    "<b>Teste E2E:</b> <code>apps/web/e2e/chat-happy-path.spec.ts</code>; sobe API com DEMO=true e <code>ng serve</code> via <code>webServer</code>; verifica disclaimer, pergunta sobre a receita líquida da Vale no 3T25, resposta com 'R$ 56,7 bilhões', clique na citação (data-base 2025-09-30, origem 'Base local (CVM)', link do ZIP da CVM) e painel com 3 etapas sem Search.",
    "<b>Playwright roda em background:</b> ao contrário do Claude no Chrome, não abre o navegador na tela. BDD (Cucumber) pode gerar o teste Playwright.",
    "<b>Inconsistência achada pelo agente:</b> o teste exigia a origem após clicar na citação, mas o template só renderizava link e período; a skill de frontend já documentava um painel de detalhes (tabela chave e valor). Opções: painel completo (mais trabalho, fecha com o design) ou fix mínimo (origem inline). O autor escolheu o fix mínimo."
   ],
   "como": [
    "Prompt do disclaimer: faixa fixa em Chat entre header e lista, renderizada incondicionalmente, com o texto exato.",
    "Prompt do demo: estender <code>DEMO=true</code> ao grafo: <code>criarEmbeddings()</code> com zeros em demo, <code>criarBuscarDemo()</code>, <code>criarGradeLlmDemo()</code>, <code>criarAnswerLlmDemo()</code>, e <code>criarEmbeddingsReal()</code> separado para o seed.",
    "Prompt do E2E: criar <code>apps/web/e2e/chat-happy-path.spec.ts</code> com <code>webServer</code> no <code>playwright.config.ts</code> subindo <code>apps/api</code> com DEMO=true e <code>apps/web</code> com ng serve; descrever os 5 passos do teste; executar no final.",
    "O Claude Code instala o Chromium e configura o Playwright; o teste roda em background.",
    "Na esteira (GitHub Actions): <code>pnpm build</code>, <code>pnpm test</code>, <code>pnpm lint</code>, instalar Chromium com <code>playwright install --with-deps chromium</code> e <code>pnpm test:e2e</code>; o deploy só roda depois (<code>needs: test</code>).",
    "Ao criar o teste o agente parou e perguntou sobre a origem da citação; decisão humana sobre escopo (fix mínimo) antes de seguir.",
    "Decida a flag: uma única DEMO barata e simples, ou flags por dependência quando o risco for crítico."
   ],
   "aplica": [
    "Aplicações reguladas: aviso persistente de escopo (informa, não recomenda) além da validação no backend.",
    "CI de front com backend real e dependências pagas mockadas por flag.",
    "Decidir entre agente no navegador (dev local) e script Playwright (CI).",
    "Gerar testes E2E a partir de regras de negócio escritas em BDD."
   ],
   "pros": [
    "E2E barato e rápido: zero token, só máquina.",
    "Determinístico: mesma resposta, mesma citação, mesmo painel a cada execução.",
    "Roda sem credenciais GCP nem Postgres no runner.",
    "O teste pegou uma inconsistência entre interface e design documentado."
   ],
   "contras": [
    "Mocks podem esconder problemas do backend real (embeddings, similaridade, LLM).",
    "Resposta e documento fixos: não testam o fallback de busca web (coberto em teste unitário do grafo).",
    "Flag DEMO é global: não isola só o Serper ou só a Vertex AI.",
    "Manter o seed fora do modo demo exige disciplina (função separada)."
   ],
   "traps": [
    "Colocar o disclaimer atrás de @if, botão de fechar ou modal: deixa de ser sempre visível.",
    "Rodar agente operando navegador a cada PR: gasta muitos tokens e demora.",
    "Deixar o seed rodar em modo demo: semearia o banco com vetores zerados.",
    "Achar que o E2E com mocks prova o backend: ele prova a integração front, SSE e grafo.",
    "Teste exigir algo que a interface não renderiza (origem da citação) sem alinhar com o design."
   ],
   "tip": "Mantenha pelo menos um teste (mesmo manual, em ambiente real) sem DEMO para o caminho real; o E2E com mocks cobre regressão de interface, não a qualidade do RAG.",
   "cola": [
    [
     "Disclaimer",
     "Faixa fixa com aviso de que o sistema informa e não recomenda."
    ],
    [
     "Guardrail",
     "Validação no backend que impede recomendação de investimento; o disclaimer só o complementa."
    ],
    [
     "DEMO=true",
     "Variável que troca embeddings, busca, grade, answer e Serper por fixtures."
    ],
    [
     "Fixture",
     "Dado congelado do corpus (aqui, Vale 3T25) devolvido sempre igual."
    ],
    [
     "Playwright",
     "Framework E2E que executa script determinístico em navegador headless."
    ],
    [
     "webServer",
     "Bloco do playwright.config.ts que sobe os processos reais antes dos testes."
    ],
    [
     "Caminho feliz",
     "Teste da jornada principal sem falhas nem fallback."
    ],
    [
     "E2E",
     "Teste de ponta a ponta: front, API e grafo juntos."
    ],
    [
     "BDD",
     "Behavior-Driven Development, regras em Gherkin/Cucumber."
    ],
    [
     "Flags finas",
     "Uma flag por dependência (só Serper, só Vertex AI)."
    ]
   ],
   "links": [
    [
     "Projeto completo (capstone)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main"
    ],
    [
     "Teste E2E",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/web/e2e"
    ],
    [
     "Workflow de CI",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/.github/workflows"
    ],
    [
     "Modo demo (packages/agent/src)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src"
    ],
    [
     "Ponto de partida (seed)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
    ]
   ],
   "codigo": [
    {
     "proj": "apps/web (e2e, playwright.config.ts, chat.html), packages/agent/src (llm-demo, db/retrieve-demo, embeddings, search), .github/workflows/deploy.yml",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/web/e2e",
     "resumo": "Li o spec E2E, o playwright.config.ts, o chat.html, os arquivos de demo do agente e o job test do deploy.yml. Não executei o Playwright nem a contagem de 82 testes. A pasta evals/ do repo (dataset.json) não faz parte desta aula.",
     "fluxo": [
      "<code>apps/web/src/app/chat/chat.html</code>: <code>div.chat__disclaimer</code> entre o header e o <code>.chat__body</code>, sem condicional, com o texto da aula.",
      "<code>packages/agent/src/embeddings.ts</code>: <code>criarEmbeddings()</code> devolve <code>criarEmbeddingsDemo()</code> (768 zeros, <code>EMBEDDING_DIMENSIONS</code>) quando <code>DEMO === 'true'</code>; <code>criarEmbeddingsReal()</code> usa Vertex AI e é o que o seed usa.",
      "<code>packages/agent/src/db/retrieve-demo.ts</code>: <code>criarBuscarDemo()</code> devolve sempre um documento VALE 3T25 (<code>periodEnd 2025-09-30</code>, URL do ZIP ITR 2025 da CVM), ignorando o embedding.",
      "<code>packages/agent/src/llm-demo.ts</code>: <code>criarGradeLlmDemo()</code> (sufficient true) e <code>criarAnswerLlmDemo()</code> (resposta fixa com R$ 56,7 bilhões).",
      "<code>packages/agent/src/graph-deps.ts</code> e <code>llm.ts</code>: escolhem demo ou real via <code>process.env.DEMO</code>; <code>search/index.ts</code> dá prioridade a DEMO sobre <code>SEARCH_PROVIDER</code> e usa <code>criarSearchProviderFixture()</code>.",
      "<code>apps/web/playwright.config.ts</code>: só projeto chromium, <code>retries: 2</code> e <code>workers: 1</code> em CI, <code>webServer</code> com API (<code>DEMO=true PORT=3000</code>, healthcheck em <code>/api/health</code>, timeout 30 s) e web (porta 4200, timeout 60 s), <code>reuseExistingServer</code> fora do CI.",
      "<code>apps/web/e2e/chat-happy-path.spec.ts</code>: um teste; confere título, disclaimer, bolha do usuário, resposta com 'R$ 56,7 bilhões' (timeout 15 s), cursor sumindo, pílula 'VALE (3T25)', painel com 2025-09-30, 'Base local (CVM)' e href do ZIP, 3 <code>.step</code> e nenhum 'Em execução'.",
      "<code>.github/workflows/deploy.yml</code>, job <code>test</code>: checkout, pnpm, Node 24, <code>pnpm install --frozen-lockfile</code>, <code>pnpm build</code>, <code>pnpm test</code>, <code>pnpm lint</code>, instalar Chromium, <code>pnpm test:e2e</code>; job <code>deploy</code> tem <code>needs: test</code> e só roda em push na main."
     ],
     "rodar": [
      "<code>pnpm install</code> e <code>pnpm build</code> (a API é iniciada com <code>node dist/index.js</code>, precisa do build)",
      "<code>pnpm --filter @hero/web exec playwright install --with-deps chromium</code>",
      "<code>pnpm test:e2e</code> (equivale a <code>pnpm --filter @hero/web run e2e</code>); não executei"
     ],
     "armadilhas": [
      "Achado: a aula diz que o autor escolheu o fix mínimo (origem inline). No repo final o <code>chat-message.html</code> tem o painel completo de citação (<code>.citation-panel</code> com Data-base, Origem e link), e o E2E asserta nesse painel; o painel já existia desde a F.4 (commit 7c07fca). Ou o fix mínimo foi superado, ou a ordem narrada difere do histórico do repo; não verifiquei qual.",
      "Achado: a aula diz que a esteira roda E2E 'em todo PR aprovado para a main'; o workflow dispara em <code>push</code> na main e em qualquer <code>pull_request</code>, e o job test (com E2E) roda nos dois casos; o deploy é o que fica restrito a push na main.",
      "Achado: com <code>retries: 2</code> em CI um teste intermitente passa e esconde flakiness; <code>trace: 'on-first-retry'</code> ajuda a investigar.",
      "Achado: a flag DEMO também troca o provedor de busca por fixture mesmo se <code>SEARCH_PROVIDER</code> estiver definido, então o E2E nunca exercita o circuit breaker do Serper.",
      "Achado: a fixture do grade sempre devolve suficiente, então o E2E nunca passa por <code>webSearch</code>; o fallback fica coberto só por teste unitário (<code>graph.test.ts</code>) e pelo fake lá usado.",
      "Contagem de 82 testes unitários da aula: não verifiquei (só contei 38 blocos <code>it(</code> em apps/web)."
     ]
    }
   ]
  },
  {
   "id": "D11-16",
   "bloco": "d11-b4",
   "mod": "Unidade 5 · Aula 22",
   "emoji": "🔭",
   "read": "9 min",
   "title": "Langfuse: tour e instrumentação por nó",
   "short": "Como instrumentar o grafo do agente com Langfuse (OpenTelemetry + callback interceptor) para ver trace e custo de cada chamada em produção.",
   "oneliner": "Em produção só dá para responder \"o usuário está com problema?\" e \"quanto isso custa?\" se a aplicação enviar <b>telemetria</b>. A aula instrumenta o grafo com <b>Langfuse</b> em dois pontos: um <b>provider OpenTelemetry</b> registrado uma vez no boot e um <b>CallbackHandler</b> (padrão <b>interceptor</b>) criado a cada chamada do grafo. Sem as chaves, nada registra e o processo sobe normalmente.",
   "vovo": [
    "Pense na caixa-preta de um avião e no painel do piloto: em terra você abre o capô, mas com o avião voando só os sensores dizem o que está acontecendo. Telemetria são esses sensores: cada operação avisa quando começou, quando terminou e se deu erro.",
    "O interceptor é como um fiscal de pedágio que anota a placa de todo carro que passa, sem mexer na viagem de ninguém. O carro (a chamada do grafo) segue o mesmo caminho; o fiscal (callback) só registra."
   ],
   "oque": [
    "<b>Observabilidade</b>: capacidade de saber, com a aplicação em produção, se há usuário com problema e quanto ela custa. Na aula, foco no consumo de modelos.",
    "<b>Telemetria</b>: dados puros de log (início, fim, erro, duração) que o sistema envia ao servidor, na prática um JSON. Monitoramento e alarmes são construídos sobre ela; sem ingestão não há o que monitorar.",
    "<b>Instrumentar</b>: usar o SDK da ferramenta de observabilidade nos pontos de chamada do projeto para que ele envie a telemetria. Dependendo do framework, nem é muito invasivo.",
    "<b>Langfuse</b>: framework open source de observabilidade de agentes, com serviço de nuvem. Plano gratuito: até 2 usuários, retenção de 30 dias, sem cartão de crédito. Não é a única opção, serve para explicar os conceitos.",
    "<b>OpenTelemetry (OTel)</b>: padrão aberto de telemetria aceito pela indústria. Permite trocar de ferramenta (ELK customizado, Dynatrace) sem grandes traumas, porque o formato é aceito.",
    "<b>Interceptor</b>: função no meio do caminho entre a chamada e o que ela executa. Aqui, o 2º parâmetro do <code>stream()</code> recebe o callback que envia a telemetria sem interferir na execução. Junta-se a adapter e strategy, padrões dos anos 90 ainda essenciais para guiar o agente de código.",
    "Três decisões do prompt de instrumentação: provider no boot de cada processo que pode invocar o grafo (API e os dois transportes do MCP), callback novo a cada chamada, e sem chaves nada registra nem impede o boot.",
    "No dashboard: <b>trace</b> por chamada (aba Tracing), <b>modelo</b> identificado e <b>custo</b> calculado (centavos por chamada) e <b>alertas</b> por e-mail ao atingir threshold.",
    "Região importa: Langfuse tem EUA, Europa, Japão e HIPAA. Se o ambiente aponta para uma região e o monitor aberto é de outra, os dados não aparecem."
   ],
   "como": [
    "Cadastro e login no Langfuse, chegando ao dashboard.",
    "Criar um projeto e, em Settings, criar a API key (com secret key).",
    "Colocar no ambiente de desenvolvimento as três variáveis que a tela indica (no arquivo de ambiente ou nas variáveis do SO). No repo: <code>LANGFUSE_PUBLIC_KEY</code>, <code>LANGFUSE_SECRET_KEY</code> e <code>LANGFUSE_BASE_URL</code>.",
    "Enviar ao Claude Code o prompt: registrar um <code>NodeTracerProvider</code> do OTel com <code>LangfuseSpanProcessor</code> (<code>@langfuse/otel</code>) uma vez no boot de <code>apps/api</code> e dos dois transportes de <code>packages/mcp-server</code>; criar um <code>CallbackHandler</code> (<code>@langfuse/langchain</code>) a cada <code>graph.stream()</code>/<code>graph.invoke()</code>; sem chaves, nada registra nem impede o boot.",
    "No código, a telemetria é inicializada antes de o backend Node subir; a função de callback fica pronta para ser passada nas chamadas do grafo.",
    "Opcional: instalar a skill oficial do Langfuse no agente (mais rápido e assertivo); a instrumentação também pode partir de uma spec fim a fim.",
    "Testar com <code>DEMO=false</code> (com <code>DEMO=true</code> o sistema responde com mocks e não chama o Vertex AI). Na demo, o Claude Code subiu a app, perguntou o lucro líquido da Vale no último trimestre e consultou a API do Langfuse para confirmar a chegada do trace.",
    "Contratempos da demo: chaves estavam nas variáveis do SO e não no <code>.env</code>; porta 3000 ocupada por teste anterior (o agente liberou e reexecutou).",
    "Em produção funciona igual: os secrets vêm do vault da nuvem (GCP ou outra) e a app envia ao mesmo lugar."
   ],
   "aplica": [
    "Qualquer agente em produção onde é preciso investigar uma resposta ruim sem reproduzir em homologação.",
    "Controle de custo por chamada e por modelo, desde o começo, pesado contra o valor entregue ao usuário.",
    "Alertas por threshold (custo, erro, latência) enviados por e-mail.",
    "Troca de ferramenta de observabilidade mantendo o OTel como padrão de emissão."
   ],
   "pros": [
    "Trace por chamada permite investigar problema sem simular em homologação.",
    "Callback interceptor é pouco invasivo: a chamada do grafo continua a mesma.",
    "OTel é padrão aberto, reduz lock-in.",
    "Plano gratuito basta para desenvolvimento e estudo."
   ],
   "contras": [
    "Mais uma dependência externa e mais secrets para gerenciar (chaves e região).",
    "Plano gratuito tem retenção de apenas 30 dias.",
    "Dados saem do ambiente para a nuvem do fornecedor: região e governança precisam ser decididas.",
    "Teste real exige chamadas reais ao Vertex AI (custo, mesmo que centavos)."
   ],
   "traps": [
    "Região diferente entre ambiente e monitor: nada aparece no dashboard e parece que a telemetria não chegou.",
    "Testar com <code>DEMO=true</code>: mocks não chamam o modelo e portanto não geram trace de LLM real.",
    "Chaves procuradas no <code>.env</code> quando estão nas variáveis do SO (ou o contrário).",
    "Instrumentar só a API e esquecer os transportes do MCP: chamadas feitas pelo MCP ficam invisíveis.",
    "Achado: no repo, passar <code>{ callbacks }</code> explícito dentro de um nó (em <code>llm.ts</code>) substitui o callback manager ambiente e faz a generation sumir do trace Langfuse; o callback vai sempre no call site do <code>stream()</code>/<code>invoke()</code>."
   ],
   "tip": "Antes de confiar no dashboard, consulte a API do Langfuse (<code>GET /api/public/traces</code> com Basic auth das duas chaves) e confirme que há trace nas últimas 24h: é o que o <code>capstone:check</code> do repo faz.",
   "cola": [
    [
     "Telemetria",
     "Dado item a item (início, fim, erro, duração) enviado ao servidor, em geral JSON."
    ],
    [
     "Observabilidade",
     "Saber o que acontece na app em produção e quanto ela custa."
    ],
    [
     "Instrumentar",
     "Usar o SDK da ferramenta nos pontos de chamada para emitir telemetria."
    ],
    [
     "Langfuse",
     "Framework open source de observabilidade de agentes, com nuvem (free: 2 usuários, 30 dias)."
    ],
    [
     "OpenTelemetry",
     "Padrão aberto de telemetria aceito pela maioria das ferramentas."
    ],
    [
     "LangfuseSpanProcessor",
     "Span processor de <code>@langfuse/otel</code> que exporta os spans ao Langfuse."
    ],
    [
     "CallbackHandler",
     "Callback de <code>@langfuse/langchain</code> criado por chamada do grafo."
    ],
    [
     "Interceptor",
     "Função entre a chamada e a execução que registra sem alterar o fluxo."
    ],
    [
     "Região Langfuse",
     "EUA, Europa, Japão ou HIPAA: ambiente e monitor precisam coincidir."
    ],
    [
     "DEMO",
     "Variável: <code>true</code> usa mocks, <code>false</code> chama o Vertex AI de verdade."
    ]
   ],
   "links": [
    [
     "Capstone Project AI Researcher (completo)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
    ],
    [
     "AI Researcher Seed (ponto de partida)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
    ],
    [
     "packages/agent/src/observability/langfuse.ts",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/observability"
    ]
   ],
   "codigo": [
    {
     "proj": "packages/agent/src/observability/langfuse.ts, apps/api/src/index.ts, packages/mcp-server/src/{stdio,http}.ts",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/observability",
     "resumo": "Li o código-fonte (langfuse.ts, index.ts da API, stdio.ts, http.ts, app.ts, server.ts e o trecho de deploy.yml). Não executei testes nem a aplicação.",
     "fluxo": [
      "<code>packages/agent/src/observability/langfuse.ts</code>: <code>registrarLangfuseTracing()</code> cria <code>new NodeTracerProvider({ spanProcessors: [new LangfuseSpanProcessor()] }).register()</code>; idempotente (flag <code>tracerRegistrado</code>).",
      "Mesmo arquivo: <code>configurado()</code> exige <code>LANGFUSE_PUBLIC_KEY</code> e <code>LANGFUSE_SECRET_KEY</code>; sem elas, retorna sem registrar e o processo sobe.",
      "<code>criarLangfuseCallbacks()</code> devolve <code>[new CallbackHandler()]</code> ou array vazio, então o call site nunca precisa de branch.",
      "<code>apps/api/src/index.ts</code>: chama <code>registrarLangfuseTracing()</code> antes de <code>build()</code> e do <code>listen</code>.",
      "<code>packages/mcp-server/src/stdio.ts</code> e <code>http.ts</code>: cada um chama <code>registrarLangfuseTracing()</code> no topo (os 3 processos da aula).",
      "<code>apps/api/src/app.ts</code>: <code>obterGrafo().stream(input, { callbacks: [...criarLangfuseCallbacks(), criarMetricsCallback()] })</code> para <code>/chat</code>, e <code>invoke</code> com os mesmos callbacks para <code>/api/mcp</code>.",
      "<code>packages/mcp-server/src/server.ts</code>: <code>invoke</code> do grafo com os mesmos callbacks (tool <code>perguntar</code>).",
      "<code>.github/workflows/deploy.yml</code>: injeta <code>LANGFUSE_PUBLIC_KEY</code>/<code>LANGFUSE_SECRET_KEY</code> via Secret Manager e <code>LANGFUSE_BASE_URL=https://us.cloud.langfuse.com</code> como env var."
     ],
     "rodar": [
      "<code>pnpm install</code>",
      "<code>export LANGFUSE_PUBLIC_KEY=... LANGFUSE_SECRET_KEY=... LANGFUSE_BASE_URL=https://us.cloud.langfuse.com</code>",
      "<code>pnpm dev</code> com <code>DEMO</code> não definida como <code>true</code> (precisa de Postgres e GCP, ver README)",
      "<code>pnpm test</code> (inclui <code>langfuse.test.ts</code>; não executei)"
     ],
     "armadilhas": [
      "Achado: o prompt da aula cita <code>criarLangfuseCallbacks()</code>, mas o repo usa pacote com escopo <code>@langfuse/langchain</code> + <code>@langfuse/otel</code> (v5); o CLAUDE.md registra que o legado <code>langfuse-langchain</code> exigiria a dependência <code>langchain</code> inteira.",
      "Achado: o dashboard da aula mostra \"Gemini 3.5 Flash\"; a tabela de preços do repo tem <code>gemini-3.5-flash-lite</code>, <code>gemini-3.6-flash</code> e <code>gemini-embedding-001</code>. Divergência de nome de modelo entre vídeo e código atual.",
      "Achado: <code>LANGFUSE_BASE_URL</code> fixo em <code>us.cloud.langfuse.com</code> no deploy.yml; é o caso de região casando com o projeto, mas quem criar projeto em outra região precisa trocar.",
      "Exportação OTLP é assíncrona e best-effort (CLAUDE.md afirma ter confirmado com credenciais falsas; não reproduzi)."
     ]
    }
   ]
  },
  {
   "id": "D11-17",
   "bloco": "d11-b4",
   "mod": "Unidade 5 · Aula 23",
   "emoji": "💸",
   "read": "11 min",
   "title": "Métricas, budget de tokens e rate limiting",
   "short": "Contadores Prometheus de tokens e custo, endpoint /api/metrics, rate limit (429) e orçamento diário de tokens como controles de FinOps no próprio agente.",
   "oneliner": "<b>Telemetria</b> é o dado item a item; <b>métrica</b> é o agregado, e é sobre a métrica que se controla custo. A aula cria contadores <b>Prometheus</b> alimentados pelo <code>usage_metadata</code> real do Vertex AI, expõe em <code>GET /api/metrics</code> e sobre isso monta dois controles: <b>rate limit</b> (volume de chamadas) e <b>budget diário de tokens</b>, ambos respondendo <b>429</b>.",
   "vovo": [
    "Telemetria é o extrato com cada compra do cartão; métrica é o total da fatura do mês. Para saber se você estourou o limite, precisa do total, não de cada compra.",
    "O rate limit é o porteiro que barra uma multidão entrando de uma vez. O budget diário é o limite do cartão: acabou o saldo do dia, nenhuma compra nova passa até amanhã."
   ],
   "oque": [
    "<b>Telemetria x métrica</b>: telemetria é o dado analítico item a item (o trace de cada chamada); métrica é o agregado (quanto neste mês, nesta semana). O Langfuse oferece os dois, mas o projeto cria métrica própria e local porque é sobre ela que os controles de custo rodam no agente.",
    "<b>FinOps</b>: saber controlar o custo da aplicação. Com a métrica dentro da app, abuso ou custo acima do desejado pode virar erro ou fallback para modelo mais barato.",
    "<b>Contadores Prometheus</b> (<code>prom-client</code>) em <code>Registry</code> próprio: <code>llm_tokens_total</code> (labels <code>node</code>, <code>model</code>, <code>kind</code>) e <code>llm_cost_usd_total</code> (labels <code>node</code>, <code>model</code>).",
    "<b>Callback LangChain genérico</b> correlaciona <code>handleChatModelStart</code>/<code>handleLLMEnd</code> por <code>runId</code>, lê <code>metadata.langgraph_node</code> e <code>metadata.ls_model_name</code> e incrementa a partir do <code>usage_metadata</code> real, nunca de estimativa.",
    "<b>Tabela de preço</b> em USD por milhão de tokens. Modelo fora da tabela: aviso no log e custo zero, nunca quebra a resposta.",
    "<b>Interceptors encadeados</b>: <code>callbacks: [...criarLangfuseCallbacks(), criarMetricsCallback()]</code> no mesmo call site (<code>apps/api/src/app.ts</code>), nunca dentro de <code>llm.ts</code>: o LangGraph propaga o callback manager por AsyncLocalStorage e um <code>callbacks</code> explícito num nó o substituiria em vez de somar.",
    "<b>Endpoint de métricas</b>: <code>GET /api/metrics</code> em formato Prometheus, com interface mínima de registry para <code>apps/api</code> não ganhar a dependência do <code>prom-client</code>.",
    "<b>Rate limit</b>: limite de rajadas; ao atingir, 429. Conceito de backend, não só de app agêntica. Protege contra invasão, abuso, bot (no caso do MCP) e loop infinito de um chamador. A volumetria depende do negócio: app interna de 100 usuários não precisa de arquitetura para 1 milhão.",
    "<b>Budget diário</b>: contador de tokens em memória que zera na virada do dia, alimentado pela mesma fonte das métricas (sem segunda contagem) e verificado no início da rota <code>/chat</code>, antes de qualquer byte SSE. Estourou: 429 para o frontend ou para o agente que usa o MCP.",
    "Limites declarados pela aula: o custo não é tão preciso quanto o do Langfuse (opção de simplificar, em vez de serviço de preço em tempo real) e o <code>prom-client</code> foi avisado como depreciado, mantido por fins didáticos (use a versão mais nova)."
   ],
   "como": [
    "Prompt 1 (contadores): dois <code>Counter</code> em <code>Registry</code> próprio, callback genérico por <code>runId</code>, custo vindo da tabela de preços, callback somado ao do Langfuse no call site.",
    "Prompt 2 (endpoint): <code>GET /api/metrics</code> usando o Registry já criado, via interface mínima.",
    "Prompt 3 (controles): <code>@fastify/rate-limit</code> global configurável por <code>RATE_LIMIT_MAX</code>/<code>RATE_LIMIT_WINDOW</code>, desligado em <code>/health</code> e <code>/metrics</code>, opções calculadas em função chamada em <code>build()</code> (não em objeto lido no import).",
    "Mesmo prompt: budget diário em memória, zera na virada do dia UTC, alimentado pela fonte de tokens do callback de métricas, verificado no início de <code>/chat</code>.",
    "Para o orçamento criou-se uma nova exceção (orçamento excedido); a verificação consulta o total do dia (já acumulado) e compara com o limite diário.",
    "Como os erros foram unificados na Aula 16, a nova exceção exigiu mexer em um lugar só (error handler).",
    "Os testes unitários pegaram um bug: o rate limit lançava 429 mas o error handler sobrescrevia o status com 500. Ajuste no error handler e os testes passaram.",
    "O rate limit soma-se à resiliência da Aula 15 (degradação graciosa): várias camadas, se uma faltar ou for mal calculada, outra protege.",
    "Comparativo: rate limit controla volume de chamadas, dado vem da contagem de requisições do plugin, atua em todas as rotas menos health e metrics, devolve 429. Budget controla gasto acumulado do dia, dado vem do callback de métricas, atua no início de <code>/chat</code>, devolve 429 (ou fallback para modelo mais barato)."
   ],
   "aplica": [
    "Qualquer API que expõe LLM a usuário final ou a agentes externos via MCP.",
    "Dashboards e alertas de custo por nó e por modelo (Grafana/Prometheus).",
    "Serviços internos que precisam de teto de volumetria compatível com a arquitetura provisionada.",
    "Fallback para modelo menor quando o custo passa do desejado (alternativa citada pela aula ao 429)."
   ],
   "pros": [
    "Custo real por nó e modelo, vindo do uso devolvido pelo provedor.",
    "Uma única fonte de tokens alimenta métrica e budget: sem divergência.",
    "Controles dentro da app protegem contra abuso e loop mesmo sem gateway.",
    "Um error handler central torna novos tipos de erro uma mudança em um lugar."
   ],
   "contras": [
    "Estado em memória: com mais de uma instância, rate limit e budget são por instância, não globais.",
    "Cálculo de custo menos preciso que o do Langfuse; tabela de preços precisa de manutenção manual.",
    "Budget só existe se há métricas: dependência de ordem de implementação.",
    "Escolher o limite errado derruba usuário legítimo (volumetria é decisão de negócio)."
   ],
   "traps": [
    "Passar <code>callbacks</code> explícito dentro de <code>llm.ts</code>: substitui o callback manager ambiente e a generation some do trace.",
    "Calcular opções do rate limit em objeto de módulo: lê a env var cedo demais e testes que ajustam a variável não têm efeito.",
    "Error handler genérico sobrescrevendo 429 com 500: só o teste unitário revela.",
    "Verificar o budget depois do <code>writeHead(200)</code> do SSE: a resposta já é 200 e não dá mais para devolver 429.",
    "Achado: modelo não cadastrado em <code>pricing.ts</code> vira custo 0 com aviso uma vez; trocar <code>MODEL_ANSWER</code> sem atualizar a tabela deixa o custo e o orçamento em dólar silenciosamente subestimados (o budget é em tokens, não em USD, então segue valendo).",
    "Achado: <code>verificarOrcamento()</code> só é chamado em <code>chat.ts</code>; não encontrei chamada no gateway <code>/api/mcp</code> nem na tool <code>perguntar</code>, apesar de a aula dizer que o agente que consome o MCP também recebe 429 no budget (o rate limit global cobre o <code>/api/mcp</code>)."
   ],
   "tip": "Defina TOKEN_BUDGET_DIARIO e RATE_LIMIT_MAX a partir do tráfego medido (a métrica existe para isso), não de chute, e teste os dois com valores minúsculos (limite 2 ou 1) para ver o 429 de verdade.",
   "cola": [
    [
     "Métrica",
     "Valor agregado ao longo do tempo (ex.: tokens no dia)."
    ],
    [
     "Telemetria",
     "Registro item a item de cada chamada (trace)."
    ],
    [
     "FinOps",
     "Controle do custo da aplicação."
    ],
    [
     "Counter (prom-client)",
     "Métrica que só cresce; aqui <code>llm_tokens_total</code> e <code>llm_cost_usd_total</code>."
    ],
    [
     "usage_metadata",
     "Uso real de tokens devolvido pelo Vertex AI, base de custo e budget."
    ],
    [
     "Tabela de preço",
     "USD por milhão de tokens, por modelo; modelo ausente conta custo zero com aviso."
    ],
    [
     "Rate limit",
     "Teto de chamadas por janela; estouro devolve 429."
    ],
    [
     "Budget diário",
     "Teto de tokens/dia em memória, zera na virada do dia UTC."
    ],
    [
     "Interceptors encadeados",
     "Vários callbacks independentes na mesma chamada."
    ],
    [
     "429",
     "Too Many Requests: usado por rate limit e por budget excedido."
    ]
   ],
   "links": [
    [
     "Capstone Project AI Researcher (completo)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
    ],
    [
     "AI Researcher Seed (ponto de partida)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
    ],
    [
     "packages/agent/src/observability",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/observability"
    ],
    [
     "apps/api/src/rate-limit.ts",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api/src"
    ]
   ],
   "codigo": [
    {
     "proj": "packages/agent/src/observability/{metrics,pricing,budget}.ts",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/observability",
     "resumo": "Li os três arquivos e os testes existem ao lado (metrics/pricing/budget .test.ts). Não executei a suíte.",
     "fluxo": [
      "<code>metrics.ts</code>: <code>export const registry = new Registry()</code> e dois <code>Counter</code>: <code>llm_tokens_total</code> (<code>node</code>, <code>model</code>, <code>kind</code>) e <code>llm_cost_usd_total</code> (<code>node</code>, <code>model</code>).",
      "<code>criarMetricsCallback()</code>: uma instância por chamada, <code>Map</code> local por <code>runId</code>; <code>handleChatModelStart</code> guarda <code>langgraph_node</code> e <code>ls_model_name</code> (fallback <code>'desconhecido'</code>).",
      "<code>handleLLMEnd</code>: incrementa tokens <code>input</code> e <code>output</code>, custo via <code>custoUsd()</code> e chama <code>registrarConsumoDeTokens(input + output)</code> (mesma fonte do budget).",
      "<code>handleLLMError</code>: apaga a entrada do <code>Map</code> para não vazar memória quando a chamada falha.",
      "<code>pricing.ts</code>: <code>PRECOS</code> USD/milhão: <code>gemini-3.5-flash-lite</code> 0.3 in / 2.5 out; <code>gemini-3.6-flash</code> 1.5 / 7.5; <code>gemini-embedding-001</code> 0.15 / 0. Modelo ausente: <code>console.warn</code> uma vez e retorna 0.",
      "<code>budget.ts</code>: <code>diaDeHoje()</code> em ISO (UTC); <code>garantirDiaAtual()</code> zera na leitura/escrita ao virar o dia (sem cron); <code>verificarOrcamento()</code> lança <code>OrcamentoDiarioExcedidoError</code> se <code>tokensConsumidosHoje() &gt;= TOKEN_BUDGET_DIARIO</code>; sem a env var, nunca lança."
     ],
     "rodar": [
      "<code>pnpm test</code> (Vitest via turbo; não executei)",
      "<code>TOKEN_BUDGET_DIARIO=1 pnpm dev</code>, uma pergunta passa e a segunda recebe 429 (comportamento descrito no CLAUDE.md; não reproduzi)",
      "<code>curl http://localhost:3000/api/metrics</code> para ver <code>llm_tokens_total</code> e <code>llm_cost_usd_total</code>"
     ],
     "armadilhas": [
      "Achado: o escopo das métricas é só <code>grade</code> e <code>answer</code>; o custo de embeddings não entra (CLAUDE.md: <code>embedQuery()</code> não expõe callbacks), embora a tabela de preços inclua <code>gemini-embedding-001</code>.",
      "Achado: o orçamento é em tokens, não em USD, e o contador é por processo (CLAUDE.md admite a limitação com várias instâncias do Cloud Run).",
      "Achado: <code>prom-client</code> está fixado em <code>15.1.3</code> em <code>packages/agent/package.json</code>; a aula diz que o agente avisou depreciação. Não verifiquei o status atual da biblioteca."
     ]
    },
    {
     "proj": "apps/api/src/{rate-limit,app,error-handler}.ts e routes/{metrics,chat}.ts",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api/src",
     "resumo": "Li rate-limit.ts, app.ts, error-handler.ts, routes/metrics.ts e routes/chat.ts; os testes de 429 estão em app.test.ts, error-handler.test.ts e routes/chat.test.ts (não executei).",
     "fluxo": [
      "<code>rate-limit.ts</code>: <code>criarRateLimitOptions()</code> devolve <code>max: Number(process.env.RATE_LIMIT_MAX ?? 20)</code>, <code>timeWindow: process.env.RATE_LIMIT_WINDOW ?? '1 minute'</code> e <code>errorResponseBuilder</code> que devolve <code>LimiteDeRequisicoesExcedidoError</code>.",
      "<code>app.ts</code>: <code>app.register(rateLimit, criarRateLimitOptions())</code> dentro de <code>build()</code>, na raiz, depois de <code>otelHttpMetricsPlugin</code>.",
      "<code>routes/health.ts</code> e <code>routes/metrics.ts</code>: <code>{ config: { rateLimit: false } }</code> nas próprias rotas.",
      "<code>routes/metrics.ts</code>: interface <code>MetricsRegistry { contentType; metrics(): Promise&lt;string&gt; }</code>; <code>app.ts</code> injeta <code>metrics ?? metricsRegistry</code>.",
      "<code>app.ts</code>: <code>callbacks: [...criarLangfuseCallbacks(), criarMetricsCallback()]</code> em <code>stream()</code> (chat) e <code>invoke()</code> (mcp).",
      "<code>routes/chat.ts</code>: <code>verificarOrcamento()</code> logo após validar o body e antes de <code>reply.raw.writeHead(200, ...)</code>.",
      "<code>error-handler.ts</code>: <code>paraProblema()</code> mapeia <code>OrcamentoDiarioExcedidoError</code> (tipo <code>orcamento-excedido</code>) e <code>LimiteDeRequisicoesExcedidoError</code> (<code>limite-de-requisicoes</code>) para status 429 em <code>application/problem+json</code>."
     ],
     "rodar": [
      "<code>RATE_LIMIT_MAX=2 pnpm dev</code> e três <code>POST /api/chat</code> seguidos: 200, 200, 429 (descrito no CLAUDE.md)",
      "<code>pnpm load:test --url http://127.0.0.1:3000 --n 40</code> para estourar o rate limit de propósito",
      "<code>pnpm --filter @hero/api test</code> (não executei; confira o nome do filtro no package.json)"
     ],
     "armadilhas": [
      "Achado: o bug \"error handler sobrescreve 429 com 500\" da aula está resolvido no repo por construção: o <code>errorResponseBuilder</code> devolve a instância do erro, tratada em <code>paraProblema()</code>, e <code>/health</code> e <code>/metrics</code> usam <code>rateLimit: false</code>.",
      "Achado: default do rate limit é 20 por 1 minuto, números que a aula não cita.",
      "Achado: <code>apps/api/package.json</code> não lista <code>prom-client</code>, coerente com a interface mínima pedida no prompt (a dependência está em <code>packages/agent</code>).",
      "Achado: <code>/api/mcp</code> não chama <code>verificarOrcamento()</code> (ver armadilhas do tópico)."
     ]
    }
   ]
  },
  {
   "id": "D11-18",
   "bloco": "d11-b4",
   "mod": "Unidade 5 · Aula 24 e fechamento",
   "emoji": "🧹",
   "read": "9 min",
   "title": "README com Mermaid e desligando o ambiente pelo Console do GCP",
   "short": "Documentar a arquitetura em diagramas Mermaid gerados pelo agente e encerrar o projeto no GCP para não pagar por Cloud SQL parado.",
   "oneliner": "O README do projeto traz visão geral, <b>disclaimer regulatório</b> e três diagramas <b>Mermaid</b> (infra, grafo do agente, deploy canary): texto que o modelo gera barato e o GitHub renderiza. Ao final, <b>encerre o projeto no Console do GCP</b>, porque o <b>Cloud SQL cobra mesmo sem uso</b>; o projeto fica arquivado 30 dias e pode ser restaurado.",
   "vovo": [
    "Mermaid é escrever a planta da casa em texto e deixar uma máquina desenhar, em vez de ficar alinhando quadradinhos no PowerPoint. Se mudar um cômodo, muda uma linha e a planta é redesenhada.",
    "Encerrar o projeto é desligar o disjuntor geral da obra quando ela acaba: o que tem aluguel fixo (o banco de dados) continua cobrando se você só sair de casa sem desligar."
   ],
   "oque": [
    "Com o desenvolvimento concluído sobram duas tarefas: documentar (README) e desligar o ambiente na nuvem para não gerar custo.",
    "O README fica na raiz e é gerado pelo Claude Code depois de todo o desenvolvimento, com visão geral, <b>disclaimer regulatório logo no início</b> e três diagramas Mermaid.",
    "Os três diagramas: arquitetura de infraestrutura completa (cliente, Cloud Run, Google Cloud, serviços externos), grafo do agente como RAG corretivo e pipeline de deploy canary.",
    "<b>Mermaid</b>: biblioteca open source que cria diagramas (componentes, sequência, Gantt, classes, Git) em notação de texto; a biblioteca renderiza a imagem, exportável. O GitHub renderiza blocos Mermaid em Markdown, com zoom, exportar e copiar.",
    "Por que combina com IA: modelos geram imagens, mas são muito melhores e mais baratos para gerar texto. Sem desenhar à mão, da conversa ao diagrama pronto, fácil de alterar (muda o texto, renderiza de novo). Hoje a discussão acontece com o agente e o diagrama registra o resultado.",
    "<b>graph é palavra reservada</b> na gramática do Mermaid, mesmo dentro de <code>flowchart TB</code>: o nó principal deve se chamar <code>agentGraph</code>, senão o parser quebra com erro genérico.",
    "Encerramento no GCP: Vertex AI e Cloud Run só cobram por uso; o <b>Cloud SQL cobra pelo armazenamento mesmo sem uso</b>.",
    "Passo a passo no console: IAM e administrador, Configurações (onde está o projeto), Encerrar (exige ser administrador da conta, natural em conta pessoal) e digitar o código do projeto para confirmar. Toda conexão do projeto é fechada e não há mais chamadas.",
    "Janela de 30 dias: o projeto encerrado fica arquivado por 30 dias; a cobrança para a partir do pedido, a aplicação deixa de funcionar e ainda pode ser restaurado. Em ambiente corporativo, só o dono da conta tem esse acesso.",
    "Depois do projeto, expanda por conta própria: outra linguagem, outro agente (Codex, Kimi, Gemini), outra nuvem (AWS, Azure) ou tudo local. O projeto foi escrito quase todo pelo Claude Code, prompt a prompt; spec-driven development é outra forma de construir."
   ],
   "como": [
    "Pedir ao Claude Code o README com o prompt da aula: visão geral, três diagramas Mermaid, nó principal chamado <code>agentGraph</code>, disclaimer regulatório no início e renderização com <code>@mermaid-js/mermaid-cli</code> antes de considerar pronto.",
    "Conferir o resultado: o README traz uma tabela (stack) e, mais adiante, os blocos <code>mermaid</code> de infraestrutura, grafo e deploy.",
    "Na demo, o autor removeu a última frase do prompt (renderização demorada) e o preview de Markdown do VS Code não renderizou os diagramas, mesmo com extensão de Mermaid; a saída foi pedir ao agente que renderizasse e testasse e conferir no GitHub. Talvez a frase não devesse ter saído.",
    "Quando terminar e compartilhar o link, abrir o console do GCP: IAM e administrador, Configurações do projeto.",
    "Clicar em encerrar (administrador da conta) e digitar o código do projeto para confirmar.",
    "Saber que a cobrança para no pedido, a app para e há 30 dias para restaurar.",
    "Em outra nuvem o caminho é diferente, mas a providência é a mesma: apagar o ambiente.",
    "Fechamento da disciplina: usar o material como guia de estudo, alternando explicação, reprodução do código, experimentação, validação e adaptação.",
    "Ciclo de revisão final: revisitar os checkpoints sem consultar as respostas, abrir os projetos do GitHub e identificar os conceitos em cada implementação, criar uma variação própria para portfólio e registrar dúvidas para professores e comunidade."
   ],
   "aplica": [
    "Registrar arquitetura de qualquer projeto no README com diagramas versionados junto do código.",
    "Documentar decisões de arquitetura ao fim de uma conversa com o agente (diagrama Mermaid como resultado).",
    "Encerrar ambientes de estudo, demo ou PoC na nuvem para eliminar custo fixo residual.",
    "Portfólio: variação do projeto em outra linguagem, agente ou nuvem."
   ],
   "pros": [
    "Diagrama em texto: barato de gerar, fácil de alterar e de versionar em diff.",
    "O GitHub renderiza sem ferramenta extra.",
    "Encerrar o projeto no console para toda cobrança de uma vez e é reversível por 30 dias.",
    "Disclaimer no topo do README explicita o limite regulatório do sistema."
   ],
   "contras": [
    "Preview do editor pode não renderizar Mermaid; é preciso conferir no GitHub ou renderizar com o CLI.",
    "Mermaid pode ficar complicado em diagramas grandes e tem palavras reservadas que quebram o parser.",
    "Renderizar com o CLI para testar é lento.",
    "Encerrar o projeto derruba tudo, inclusive o link compartilhado."
   ],
   "traps": [
    "Chamar o nó principal de <code>graph</code>: palavra reservada, o parser quebra com erro genérico apontando para o texto do label.",
    "Confiar no preview do VS Code para validar o Mermaid.",
    "Achar que Vertex AI e Cloud Run parados custam zero e esquecer que o Cloud SQL cobra pelo armazenamento.",
    "Esperar que encerrar o projeto apague tudo na hora: ele fica 30 dias arquivado.",
    "Achado: <code>make destroy</code> do repo não encerra o projeto GCP nem o Firebase Hosting, só remove recursos; o encerramento do projeto continua manual."
   ],
   "tip": "Peça o README ao agente com a instrução de renderizar os diagramas com o CLI do Mermaid: é o único jeito de garantir que não há erro de parser antes do push.",
   "cola": [
    [
     "README",
     "Arquivo na raiz com visão geral, disclaimer e diagramas do projeto."
    ],
    [
     "Mermaid",
     "Linguagem de marcação em texto que o GitHub e o CLI renderizam em diagramas."
    ],
    [
     "agentGraph",
     "Nome do nó principal do diagrama do grafo; <code>graph</code> é reservado."
    ],
    [
     "@mermaid-js/mermaid-cli",
     "CLI que renderiza os diagramas, usado como teste de validade."
    ],
    [
     "Disclaimer regulatório",
     "Aviso no início do README de que o sistema informa e não recomenda investimento."
    ],
    [
     "Cloud SQL",
     "Banco gerenciado que cobra armazenamento mesmo sem uso."
    ],
    [
     "IAM e administrador",
     "Seção do console GCP onde se encerra o projeto."
    ],
    [
     "Janela de 30 dias",
     "Prazo em que o projeto encerrado fica arquivado e pode ser restaurado."
    ],
    [
     "Spec-driven development",
     "Alternativa a prompt a prompt: construir a partir de uma spec fim a fim."
    ],
    [
     "Ciclo de revisão final",
     "Checkpoints, abrir os repos, criar variação de portfólio, registrar dúvidas."
    ]
   ],
   "links": [
    [
     "Capstone Project AI Researcher (completo)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
    ],
    [
     "AI Researcher Seed (ponto de partida)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
    ],
    [
     "README.md do projeto",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/README.md"
    ],
    [
     "scripts/destroy.ts",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/scripts"
    ]
   ],
   "codigo": [
    {
     "proj": "README.md (raiz)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/README.md",
     "resumo": "Li o README completo. Não renderizei os diagramas.",
     "fluxo": [
      "<code>README.md</code>: disclaimer regulatório em citação logo após o título (\"O sistema informa, nunca recomenda\", citando a CVM e <code>packages/agent/src/answer/format-resposta.ts</code>).",
      "Seção \"O que é\": base vetorial de 20 empresas da B3, ITR/DFP da CVM, RAG corretivo com busca web.",
      "Seção \"Arquitetura\": primeiro <code>mermaid</code> <code>flowchart TB</code> com subgraphs Cliente, Cloud Run (nó <code>agentGraph</code>), Google Cloud (Vertex AI, Cloud SQL, Secret Manager) e Serviços externos (Serper, Langfuse, Grafana).",
      "Segundo diagrama (<code>flowchart LR</code>): <code>retrieve</code> → <code>grade</code> → <code>answer</code> ou <code>webSearch</code> → <code>retrieve</code>; texto abaixo cita <code>MAX_ITERATIONS = 2</code>.",
      "Terceiro diagrama: push em main, test, build, deploy Cloud Run a 0% com tag canary, healthcheck <code>/api/health</code>, update-traffic ou para, Firebase Hosting; cita <code>pnpm rollback</code>.",
      "Tabela de stack, \"Como rodar localmente\" (<code>docker compose up -d</code>, <code>pnpm db:migrate</code>, <code>pnpm seed</code>, <code>pnpm dev</code>) e <code>DEMO=true</code> para rodar sem Postgres nem GCP."
     ],
     "rodar": [
      "<code>pnpm capstone:check --url &lt;url&gt;</code> (o item 11 confere seção de arquitetura e bloco <code>```mermaid</code> no README; não executei)",
      "Abrir o README no GitHub para ver os diagramas renderizados"
     ],
     "armadilhas": [
      "Achado: o nó principal está como <code>agentGraph</code> no diagrama de arquitetura, como a aula manda; no diagrama do grafo os nós são <code>retrieve</code>, <code>grade</code>, <code>answer</code>, <code>webSearch</code> (não há nó chamado <code>graph</code>).",
      "Achado: o CLAUDE.md afirma que os diagramas foram validados com <code>@mermaid-js/mermaid-cli</code> (a aula, na demo, retirou essa frase do prompt); não reproduzi a validação.",
      "Achado: o README traz URLs reais de demo e API de produção (<code>ai-researcher-capstone.web.app</code>) que deixam de funcionar quando o projeto é encerrado (CLAUDE.md registra que <code>pnpm destroy</code> foi executado de verdade no H.5 e o ambiente reconstruído)."
     ]
    },
    {
     "proj": "scripts/destroy.ts, Makefile, infra/README.md",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/scripts",
     "resumo": "A aula encerra pelo Console do GCP; o repo oferece o equivalente por CLI (<code>make destroy</code>). Li destroy.ts e o Makefile. Não executei (apagaria recursos reais).",
     "fluxo": [
      "<code>Makefile</code>: alvo <code>destroy</code> chama <code>pnpm destroy</code> (<code>tsx scripts/destroy.ts</code>).",
      "<code>scripts/destroy.ts</code>: exige <code>GOOGLE_CLOUD_PROJECT_ID</code>; sai com erro se faltar.",
      "Ordem dos passos <code>gcloud</code>: Cloud SQL (<code>ai-researcher-db</code>) primeiro por ser o único custo fixo, depois Cloud Run (<code>ai-researcher-api</code>), Artifact Registry (<code>ai-researcher</code>), 5 secrets, Workload Identity Pool (<code>github-actions-pool</code>) e service account de deploy.",
      "Confirmação: sem <code>--yes</code>, o usuário digita o project id de volta; se não bater, cancela e sai com código 1.",
      "Falha em um passo não interrompe os seguintes: acumula em <code>falhas</code> e termina com <code>exitCode = 1</code>.",
      "Mensagem final: Firebase Hosting e o projeto GCP em si não são removidos; sugere <code>firebase hosting:disable</code> e <code>gcloud projects delete &lt;id&gt;</code> manualmente."
     ],
     "rodar": [
      "<code>GOOGLE_CLOUD_PROJECT_ID=&lt;id&gt; make destroy</code> (destrutivo; pede o project id)",
      "Alternativa da aula: Console do GCP, IAM e administrador, Configurações, Encerrar"
     ],
     "armadilhas": [
      "Achado: aula e repo divergem de mecanismo: console encerra o projeto inteiro (30 dias de arquivo, restaurável); o script apaga recursos um a um sem janela de restauração para o que ele deleta.",
      "Achado: o CLAUDE.md registra que o Workload Identity Pool tem soft-delete de 30 dias (undelete possível) e que a service account recriada perde roles e binding; a aula não trata disso.",
      "Achado: o script não remove o projeto, então nada impede que algum recurso que ele não conhece continue cobrando; para zerar a conta, encerre o projeto.",
      "Achado: a estimativa do repo para o Cloud SQL é de aproximadamente US$ 10-15 por mês (comentário em destroy.ts, citando o plano); número do repo, não da aula."
     ]
    }
   ]
  },
  {
   "id": "D11-19",
   "bloco": "d11-b4",
   "mod": "Revisão integrada",
   "emoji": "🧩",
   "read": "10 min",
   "title": "Revisão integrada: o AI Researcher de ponta a ponta, os slides de diagrama e as leituras indicadas",
   "short": "Junta as 24 aulas em um fluxo só (corpus, pgvector, grafo, guardrail, resiliência, frontend, observabilidade, encerramento), com os seis diagramas dos slides e os quatro livros indicados.",
   "oneliner": "O AI Researcher é um <b>RAG corretivo</b>: busca na base vetorial, um nó <b>grade</b> julga se o contexto basta, cai para a web quando não basta e responde com <b>citação</b>, com o guardrail de \"informar, nunca recomendar\" <b>no código</b>. O resto da disciplina (testes sem rede, circuit breaker, MCP, Angular, Langfuse, budget, deploy sem chave) é o que transforma esse fluxo em um sistema de produção.",
   "vovo": [
    "Pense numa biblioteca com uma bibliotecária cuidadosa. Você pergunta; ela olha primeiro nas estantes da casa (a base vetorial). Se o que achou não basta, ela mesma decide ir pesquisar na internet, anota a fonte e só então responde. E há uma placa na parede: ela informa, mas nunca diz \"compre\" ou \"venda\". Essa placa não é um pedido educado, é uma trava na porta de saída.",
    "O resto do curso é o prédio em volta dela: um portão que só abre com crachá temporário (o deploy sem chave), um aviso quando uma fonte externa cai (circuit breaker), um painel que mostra cada passo (Langfuse e o painel do grafo) e a conta de luz limitada (budget de tokens). Ao fim, você desliga a luz pelo painel do condomínio para não pagar à toa."
   ],
   "oque": [
    "<b>Fluxo de negócio (slide 1.1, RAG corretivo):</b> pergunta, base vetorial (indicadores CVM de 20 empresas da B3), contexto suficiente? Sim: resposta com citação (fonte e data-base). Não: busca na web (fallback) e resposta. O slide avisa que é simplificado: o grafo real tem guard de iteração e persistência do enriquecimento web.",
    "<b>Mapa de infraestrutura (slide 1.3):</b> GitHub Actions, Artifact Registry, Cloud Run, Firebase Hosting, Cloud SQL com pgvector, Secret Manager e Vertex AI.",
    "<b>Workload Identity Federation (slide 1.4):</b> o runner do GitHub Actions apresenta um token OIDC de curta duração ao Workload Identity Pool e Provider, que permite impersonar a service account de deploy; ela publica no Cloud Run, no Artifact Registry e no Firebase Hosting. Não existe chave JSON estática no projeto.",
    "<b>Busca vetorial (slides 2.1a, b e c):</b> perto no espaço é parecido no significado; o cosseno mede ângulo, não tamanho; top-k são os k mais próximos, nunca \"o certo\". No pgvector os operadores são <code>&lt;-&gt;</code> (euclidiana), <code>&lt;#&gt;</code> (produto interno, não normalizado) e <code>&lt;=&gt;</code> (cosseno, o usado no projeto), e o top-k cabe em uma linha: <code>ORDER BY embedding &lt;=&gt; :pergunta LIMIT 5</code>, sem serviço de banco vetorial separado. O índice HNSW faz busca aproximada em camadas (esparsa no topo, densa na base), muito mais rápida em escala que a busca exata, que compara com todos.",
    "<b>Unidade 1:</b> CLAUDE.md sempre carregado versus skills sob demanda (a skill oficial do framework vence a do projeto), tour GCP, WIF, corpus CVM com parágrafos gerados por código, fundação por prompts e walking skeleton com deploy zero.",
    "<b>Unidade 2:</b> pgvector e seed, nós <code>retrieve</code> e <code>grade</code>, Serper, fallback com upsert do enriquecimento web, aresta condicional com guard do loop, nó <code>answer</code> com citação obrigatória, guardrail por código e streaming SSE.",
    "<b>Unidade 3:</b> grafo testado sem rede (fakes e fixtures), circuit breaker, retry e degradação graciosa, erros padronizados e o servidor MCP como segunda porta para o mesmo agente.",
    "<b>Unidade 4:</b> protótipo no Claude Design, skill frontend-design, chat com streaming e citações clicáveis, painel de estado do grafo, disclaimer e E2E no CI.",
    "<b>Unidade 5:</b> Langfuse por nó, métricas, budget de tokens e rate limiting, README com Mermaid e encerramento do projeto pelo Console do GCP (o Cloud SQL cobra mesmo sem uso; o projeto encerrado fica 30 dias arquivado e restaurável)."
   ],
   "como": [
    "<b>Trilha de revisão sugerida:</b> refaça o desenho do RAG corretivo de memória; depois responda os checkpoints de cada aula sem consultar o texto; por fim, compare cada resposta com a seção \"No código do repo\" do tópico.",
    "<b>Teste de profundidade 1 (segurança):</b> explique por que o guardrail está no código e não só no system prompt. Resposta esperada: prompt é instrução e pode falhar; o filtro no código é determinístico. Depois leia o achado do tópico 09: o filtro é uma regex sobre a resposta do LLM, com cobertura limitada.",
    "<b>Teste de profundidade 2 (custo):</b> liste onde o projeto economiza tokens: parágrafos do corpus sem LLM, RAG antes da web, skills em vez de CLAUDE.md gigante, budget de tokens com 429 e métricas por nó.",
    "<b>Teste de profundidade 3 (resiliência):</b> trace o que acontece quando a busca web cai: retry, circuit breaker abrindo, degradação graciosa, erro padronizado e o que o painel mostra ao usuário.",
    "<b>Teste de profundidade 4 (produção):</b> descreva o caminho do commit ao Cloud Run (GitHub Actions, token OIDC, service account impersonada, Artifact Registry, Cloud Run, Firebase Hosting) e por que isso dispensa chave JSON.",
    "<b>Divergências aula x repo:</b> cada tópico registra os achados na seção \"Armadilhas e achados no código\". O README da disciplina reúne todos em uma tabela.",
    "<b>Expansão proposta pela aula final:</b> refazer o projeto com outra linguagem, outro agente de código (Codex, Kimi, Gemini) ou outra nuvem (AWS, Azure) ou tudo local, e encerrar o ambiente depois."
   ],
   "aplica": [
    "Qualquer chatbot de domínio regulado: base própria primeiro, web só como complemento julgado, citação de fonte e restrição legal no código.",
    "Qualquer agente em produção: grafo com teto de iteração, resiliência nas fronteiras, observabilidade por nó e controle de custo antes de abrir ao público.",
    "Projetos de portfólio: o ciclo final da apostila pede escolher um projeto e criar uma variação própria.",
    "Times com agentes de código: CLAUDE.md curto com regras de \"pergunte antes\" e \"nunca faça\", skills por tema e precedência definida."
   ],
   "pros": [
    "O projeto cobre todo o ciclo, do primeiro commit ao desligamento, em uma base de código só.",
    "Os fundamentos (padrões, segurança, testes, resiliência, leitura crítica do código gerado) valem para outra ferramenta, nuvem ou linguagem.",
    "Há um seed para o aluno reproduzir e um repositório completo para comparar."
   ],
   "contras": [
    "O código final diverge da aula em vários pontos, então decorar a aula sem ler o repo induz a erro.",
    "Há dependência de contas e serviços pagos ou com cota (GCP, Vertex AI, Serper, Langfuse), o que pesa em quem só quer estudar.",
    "O guardrail por regex tem falsos positivos e lacunas; é uma camada, não uma garantia total."
   ],
   "traps": [
    "Estudar só a aula e não abrir o repositório: os achados mostram que repo e aula divergem em números, nomes e escopo.",
    "Tratar o top-k como \"a resposta certa\": ele são só os mais próximos.",
    "Esquecer de encerrar o ambiente: o Cloud SQL cobra mesmo sem uso.",
    "Confiar no CLAUDE.md como diário: o do repo completo acumulou 325 linhas, contra a própria lição de manter o contexto sempre ligado enxuto (achado do tópico 01).",
    "Copiar a configuração de permissões do deploy sem revisar: a service account tem papéis amplos (achado do tópico 02)."
   ],
   "tip": "Refaça os seis diagramas dos slides à mão (RAG corretivo, mapa GCP, WIF, distância vetorial, pgvector e HNSW) sem olhar: se você não consegue desenhar, ainda não consegue explicar.",
   "cola": [
    [
     "RAG corretivo",
     "RAG com um juiz de suficiência (grade) que decide se recorre à web antes de responder"
    ],
    [
     "Grade",
     "Nó que julga se o contexto recuperado basta para responder"
    ],
    [
     "Guard do loop",
     "Teto de iterações do grafo para impedir ciclo infinito entre retrieve, grade e busca web"
    ],
    [
     "Top-k",
     "Os k vizinhos mais próximos da pergunta no espaço vetorial; nunca \"o certo\""
    ],
    [
     "Cosseno (<=>)",
     "Distância por ângulo, usada no projeto; ignora o tamanho do vetor"
    ],
    [
     "HNSW",
     "Índice de busca aproximada em camadas, mais rápido que a busca exata em escala"
    ],
    [
     "WIF",
     "Workload Identity Federation: token OIDC de curta duração no lugar de chave JSON"
    ],
    [
     "Walking skeleton",
     "Versão mínima ponta a ponta já em produção, evoluída por camadas"
    ],
    [
     "Circuit breaker",
     "Corta chamadas a um provedor que está falhando e degrada com elegância"
    ],
    [
     "SSE",
     "Server-Sent Events: streaming de eventos do servidor para o chat e o painel do grafo"
    ],
    [
     "Langfuse",
     "Ferramenta de observabilidade de LLM usada para instrumentar cada nó"
    ],
    [
     "Budget de tokens",
     "Limite de consumo que, estourado, responde 429"
    ]
   ],
   "links": [
    [
     "Capstone Project AI Researcher",
     "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
    ],
    [
     "AI Researcher Seed",
     "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed"
    ],
    [
     "Huyen, AI Engineering (O'Reilly, 2025): avaliar se o contexto basta, quando cair para fonte externa, custo e latência por chamada",
     "https://www.amazon.com.br/AI-Engineering-Building-Applications-Foundation/dp/1098166302"
    ],
    [
     "Auffarth e Kuligin, Generative AI with LangChain, 2ª ed.: LangGraph, grafos de estado, arestas condicionais",
     "https://www.amazon.com/Generative-LangChain-production-ready-applications-LangGraph/dp/1837022011"
    ],
    [
     "Kleppmann, Designing Data-Intensive Applications: o porquê de pgvector, HNSW e trade-offs de armazenamento",
     "https://www.amazon.com.br/Designing-Data-Intensive-Applications-Martin-Kleppmann/dp/1449373321"
    ],
    [
     "Beyer et al., Site Reliability Engineering: circuit breaker, degradação graciosa, rate limiting, canary e error budgets",
     "https://www.amazon.com.br/Site-Reliability-Engineering-Betsy-Beyer/dp/149192912X"
    ]
   ],
   "codigo": [
    {
     "proj": "capstone-project-ai-researcher (visão geral do repositório)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher",
     "resumo": "Visão de conjunto dos tópicos 00 a 18; o detalhe por arquivo está em cada um. Estrutura lida: apps/ (API e web), packages/ (agente), infra/, scripts/, evals/, docs/, .github/workflows, Makefile e firebase.json.",
     "fluxo": [
      "Tópicos 00 e 01: contexto, regras do agente e skills (CLAUDE.md e .claude/skills).",
      "Tópicos 02 a 04: infraestrutura, GitHub Actions com WIF e o walking skeleton publicado.",
      "Tópicos 05 a 09: pgvector, nós do grafo, busca web, guard do loop e answer com guardrail e SSE.",
      "Tópicos 10 a 12: testes sem rede, resiliência, erros padronizados e MCP.",
      "Tópicos 13 a 15: frontend Angular, painel do grafo e E2E no CI.",
      "Tópicos 16 a 18: Langfuse, métricas e budget, README com Mermaid e encerramento."
     ],
     "rodar": [
      "Os comandos de cada etapa estão nos tópicos; o resumo dos que existem no repo está no README da disciplina."
     ],
     "armadilhas": [
      "Os slides de diagrama são editoriais e simplificados (o próprio slide 1.1 avisa); o grafo real tem guard de iteração e persistência do enriquecimento web."
     ]
    }
   ]
  }
 ]
});
