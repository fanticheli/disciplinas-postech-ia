STUDY.push({
 "disc": {
  "num": "05",
  "nome": "Disciplina 05",
  "titulo": "Ferramentas de IA para UX e UI",
  "autor": "Álvaro Camillo Neto",
  "emoji": "🎨",
  "resumo": "Como usar IA em todo o ciclo de um produto digital: discovery e prompts como código, front-end com agentes e MCP, monorepo com Spec-Driven Development, QA com Cypress e Playwright MCP, e IA dentro da aplicação com Genkit."
 },
 "materiais": [
  [
   "Repositório oficial — módulo 05",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX"
  ],
  [
   "Projeto: modulo-01 (discovery, prompts, dados e relatórios)",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01"
  ],
  [
   "Projeto: modulo-02 (pix-app, Angular AI-Native)",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app"
  ],
  [
   "Projeto: modulo-03 (cfp-platform, Nx, OpenSpec e agentes)",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform"
  ],
  [
   "Projeto: modulo-04 (cfp-platform v1, QA com Cypress e Playwright MCP)",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-04/cfp-plataform_v1/cfp-platform_v1"
  ],
  [
   "Projeto: modulo-05 (brag-bot, Genkit e Gemini)",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-05/brag-bot"
  ],
  [
   "Google AI Studio (ferramenta citada no README do repo)",
   "https://aistudio.google.com/"
  ],
  [
   "Google Stitch (ferramenta citada no README do repo)",
   "https://stitch.withgoogle.com"
  ],
  [
   "Google Jules (ferramenta citada no README do repo)",
   "https://jules.google/"
  ],
  [
   "Antigravity (ferramenta citada no README do repo)",
   "https://antigravity.dev/"
  ],
  [
   "Figma (ferramenta citada no README do repo)",
   "https://www.figma.com/"
  ],
  [
   "Mermaid Live Editor (ferramenta citada no README do repo)",
   "https://mermaid.live"
  ],
  [
   "Firebase Genkit (ferramenta citada no README do repo)",
   "https://genkit.dev/"
  ],
  [
   "Nx (ferramenta citada no README do repo)",
   "https://nx.dev"
  ],
  [
   "OpenSpec (ferramenta citada no README do repo)",
   "https://openspec.dev/"
  ],
  [
   "Live 28/07/2026 · Safer (UX e DX com IA, skills e Lagune)",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-07-28"
  ],
  [
   "Live 30/09/2026 · SEO, GEO e AEO",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-09-30"
  ],
  [
   "Indicação 1: Teixeira, F. Introdução e boas práticas em UX Design (Casa do Código, 2014). Antropocentrismo digital, user journey e personas; base para validar protótipos gerados por IA quanto a usabilidade e acessibilidade",
   ""
  ],
  [
   "Indicação 2: Pereira, S. IA Generativa para Desenvolvimento de Software (Novatec, 2025). Guia prático para avaliar ferramentas de geração de código; GenAI em UI/UX e front-end, revisões de código e detecção precoce de erros",
   ""
  ],
  [
   "Indicação 3: Phoenix, J.; Taylor, M. Prompt Engineering for Generative AI (O'Reilly, 2024). Cinco princípios de prompt engineering, chain-of-thought e loops de planejamento; estruturar contexto para mitigar alucinações",
   ""
  ],
  [
   "Indicação 4: Osmani, A.; Djirdeh, H. Product Engineering with AI (Leanpub, 2024). O engenheiro como Product Engineer, requisitos agênticos, Bolt e Lovable, automação de testes de usabilidade",
   ""
  ]
 ],
 "blocos": [
  {
   "id": "d05-b0",
   "label": "Discovery e Prompt as Code"
  },
  {
   "id": "d05-b1",
   "label": "Front-end AI-Native: Angular, MCP e Design System"
  },
  {
   "id": "d05-b2",
   "label": "Monorepo, Spec-Driven Development e agentes"
  },
  {
   "id": "d05-b3",
   "label": "QA AI-Native: Cypress e Playwright MCP"
  },
  {
   "id": "d05-b4",
   "label": "IA dentro da aplicação: Genkit e BragBot"
  },
  {
   "id": "d05-b5",
   "label": "Lives complementares"
  }
 ],
 "topics": [
  {
   "id": "D5-00",
   "bloco": "d05-b0",
   "mod": "Unidade 1 · Aulas 1 e 2",
   "emoji": "🧭",
   "read": "10 min",
   "title": "Refinamento de requisitos, edge cases e fluxos em Mermaid",
   "short": "A IA como segunda camada de pensamento crítico antes do código, e o refinamento virando diagrama versionável.",
   "oneliner": "Antes de implementar, a IA expande o requisito bruto em <b>edge cases, estados de interface e riscos</b> a partir de um prompt com <b>papel, objetivo, regras e formato de saída</b>; o resultado vira um fluxo <b>Mermaid</b>, texto versionado no Git.",
   "vovo": [
    "Pense em quem vai construir uma casa a partir de uma planta simples. Antes de levantar a primeira parede, um engenheiro experiente percorre a planta fazendo perguntas chatas: e se o cano vazar? E se faltar luz? E se a porta não couber a cadeira de rodas? Ele não constrói nada, só acha buracos que ninguém tinha visto.",
    "A IA, neste início do curso, faz esse papel de engenheiro perguntador. E o Mermaid é a planta redesenhada em texto: quando surge uma regra nova, a gente edita uma linha em vez de redesenhar tudo na mão."
   ],
   "oque": [
    "<b>Requisito bruto quase nunca basta.</b> O exemplo da aula é um PIX agendado: escolher contato, informar valor, escolher data, confirmar e receber comprovante, com limite diário, proibição de agendar para o mesmo dia e possibilidade de cancelar. Parece completo, mas deixa perguntas sem resposta: o saldo é validado no agendamento ou na execução? O valor agendado já consome o limite diário? O que acontece se a chave for removida depois? E em feriados? Até que horas dá para cancelar? Como a interface reage a uma falha de comunicação?",
    "<b>IA como expansão analítica, não como oráculo.</b> A apostila a chama de «segunda camada de pensamento crítico» e de ferramenta de brainstorming técnico: nem tudo que ela sugere é certo, e tudo bem, porque o valor está em provocar perguntas para a reunião de refinamento. Ela não substitui analista, PO ou arquiteto, porque não conhece estratégia de negócio, limitações políticas, cultura da empresa nem nuances emocionais do usuário.",
    "<b>Prompt estruturado em quatro blocos:</b> papel (arquiteto, analista, especialista em UX), objetivo (analisar requisitos, achar edge cases, mapear estados), regras (caminhos felizes e infelizes, estados de carregamento, conflitos de negócio, cenários de falha) e formato de saída. A qualidade da resposta depende da qualidade do contexto fornecido.",
    "<b>Edge cases</b> são situações extremas ou pouco óbvias. Os da aula: a virada de data (usuário começa às 23h59 e confirma depois da meia-noite: ainda é o mesmo dia?), saldo insuficiente na data programada (o usuário é avisado? o agendamento é cancelado?) e chave PIX removida entre o agendamento e a execução.",
    "<b>Estados de interface:</b> carregamento (sem feedback o usuário acha que travou), vazio (sem contatos, sem agendamentos, busca sem resultado) e erro (saldo insuficiente, limite excedido, falha de comunicação, chave inválida, timeout, indisponibilidade do serviço bancário). A forma de comunicar o erro afeta a confiança no produto.",
    "<b>Mermaid</b> é uma ferramenta open source que desenha diagramas a partir de texto. O diagrama passa a ser código: vai para o Git, é revisado em pull request e evolui junto com a aplicação. GitHub, VS Code e Jira têm suporte nativo ou plugin para renderizar. Isso ataca o problema histórico da documentação desatualizada.",
    "<b>Fluxo funcional não é arquitetura.</b> Estes diagramas mapeiam jornada, decisões de negócio e estados da aplicação. Depois eles podem servir de base para identificar serviços e componentes, mas o foco inicial é entender o comportamento."
   ],
   "como": [
    "Passo 1: configurar o System Prompt do modelo como arquiteto sênior e especialista em UX e enviar o requisito bruto. Saída esperada: riscos, estados de UI, cenários ocultos e regras conflitantes.",
    "Passo 2: pedir ao mesmo chat (que já tem o contexto do refinamento) um flowchart top-down que cubra caminho feliz e infelizes, com estados de loading, vazio e erro. Convenção descrita na aula: retângulos para ações do usuário e processos do sistema, losangos para decisões de negócio e cor para estados críticos.",
    "Passo 3: o time revisa. QA deriva casos de teste, o arquiteto pensa nos componentes, o dev enxerga os estados antes de implementar e o PO valida se a jornada faz sentido.",
    "Passo 4: iterar. Surgiu um cenário novo (por exemplo, autenticação negada)? Adiciona-se uma condição no texto e o diagrama renderiza de novo. A IA gera, o time discute, novas regras aparecem, o refinamento amadurece.",
    "Quanto mais estruturado o prompt (tipo de diagrama, orientação, tipos de nó, regras de estilo), mais próximo da realidade fica o resultado. A sintaxe objetiva do Mermaid facilita a geração pelos modelos."
   ],
   "aplica": [
    "Refinar uma story antes de a sprint começar, levando a lista expandida de perguntas para a reunião em vez de começar do zero.",
    "Gerar a base dos casos de teste de QA a partir dos caminhos infelizes mapeados.",
    "Documentar jornadas no README do repositório com um bloco Mermaid renderizado pelo próprio GitHub.",
    "Melhorar o contexto de qualquer geração posterior: código, testes, contratos de API e automações de QA dependem da clareza do requisito."
   ],
   "pros": [
    "Antecipa em horas o que normalmente só apareceria em homologação ou produção.",
    "Diagrama como código: versionável, revisável em PR e barato de atualizar.",
    "Alinha dev, QA, PO e arquiteto sobre o mesmo fluxo e os mesmos estados."
   ],
   "contras": [
    "A IA sugere cenários improváveis ou interpretações discutíveis; sem triagem humana vira ruído.",
    "Não conhece o contexto organizacional: regras reais do negócio (como limites regulatórios) precisam ser confirmadas por quem as conhece.",
    "O diagrama gerado pode estar sintaticamente correto e logicamente simplificado."
   ],
   "traps": [
    "Jogar o requisito no chat sem papel, regras e formato e esperar uma análise sofisticada.",
    "Tratar o diagrama como verdade só porque ele renderizou: a validação continua sendo do time.",
    "Confundir fluxo funcional com arquitetura de sistema.",
    "Parar na primeira versão: o valor do Mermaid está na iteração."
   ],
   "cola": [
    [
     "Edge case",
     "Situação extrema ou pouco óbvia que muda o comportamento do sistema (ex.: virada de data às 23h59)"
    ],
    [
     "Unhappy path",
     "Caminho em que algo dá errado: erro de API, validação, timeout, saldo insuficiente"
    ],
    [
     "Empty state",
     "Tela sem dados (sem contatos, sem agendamentos) que precisa de tratamento próprio"
    ],
    [
     "System Prompt",
     "Instrução fixa que define o papel e as regras do modelo durante a conversa"
    ],
    [
     "Papel, objetivo, regras, formato",
     "Estrutura de prompt usada em todas as aulas do módulo"
    ],
    [
     "Mermaid",
     "Linguagem de diagramas em texto, renderizada por GitHub, VS Code, Jira e outros"
    ],
    [
     "graph TD",
     "Flowchart orientado de cima para baixo no Mermaid"
    ],
    [
     "classDef",
     "Declaração de estilo reutilizável por classe, usada para colorir erros e sucessos"
    ]
   ],
   "links": [
    [
     "Repositório oficial: módulo 01 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01"
    ],
    [
     "Google AI Studio",
     "https://aistudio.google.com/"
    ],
    [
     "Mermaid Live Editor",
     "https://mermaid.live"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-01 · refinamento e Mermaid",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01",
     "resumo": "Artefatos de discovery das aulas 1 e 2: o ticket bruto de Pix Agendado, o System Prompt de arquiteto, a análise devolvida pela IA e dois diagramas Mermaid. Tudo em Markdown versionado; não há código executável, o laboratório roda no Google AI Studio.",
     "fluxo": [
      "<code>docs/refinement/briefing-bruto.md</code>: o ticket de entrada, com três regras (limite diário de R$ 5.000,00, proibição de agendar para o mesmo dia e botão para cancelar o agendamento depois).",
      "<code>prompts/system-instructions-refinement.md</code>: papel de Arquiteto de Software Sênior e Especialista em UX, regras (caminhos infelizes que o PO esqueceu, estados de loading, vazio e erro, falhas de segurança ou regras conflitantes) e quatro chaves de saída: <code>analise_de_risco</code>, <code>mapeamento_de_estados</code>, <code>cenarios_ocultos</code> e <code>regras_de_negocio_conflitantes</code>.",
      "<code>report/refinamento-pix-aula-1.md</code>: a resposta da IA, que se apresenta como segunda rodada de análise. Riscos: limite noturno, janela de cancelamento, chave excluída ou portada, MFA no agendamento, concorrência de saldo futuro. Traz o checklist de estados de UI, um <code>graph TD</code> e três dicas ao dev (redirecionar de «hoje» para Pix comum herdando os dados, date picker acessível por teclado e <code>x-idempotency-key</code> no header).",
      "<code>report/mermaid-detalhado-aula-2.md</code>: o prompt «COMANDO DE ENGENHARIA DE FLUXO» (graph TD, cobrir todos os caminhos infelizes, retângulos para ações, losangos para decisões, <code>classDef</code> error e success) seguido do diagrama gerado, com loading, empty states, MFA, <code>POST /pix/schedule</code>, tratamento de 201, 403, 429 ou 500 e timeout, e o cancelamento por <code>DELETE</code>."
     ],
     "rodar": [
      "Abra o Google AI Studio, cole o conteúdo de <code>system-instructions-refinement.md</code> em System Instructions e envie o <code>briefing-bruto.md</code>.",
      "Peça a análise de caminhos infelizes e, em seguida, o código Mermaid; renderize no Mermaid Live Editor ou em um plugin do VS Code."
     ],
     "armadilhas": [
      "O README do <code>modulo05</code> e o do <code>modulo-01</code> descrevem uma estrutura que não existe: pastas <code>modulo-01-discovery-refinement/</code> e <code>reports/</code>, prompts em <code>.json</code>, <code>edge-cases.md</code> e <code>fluxo-logico.mmd</code>. No repo real os prompts são <code>.md</code>, a pasta é <code>report/</code> e os fluxos estão dentro dos relatórios.",
      "<code>system-instructions-refinement.md</code> está em pseudo-YAML: há uma aspa solta no fim da lista de regras e vírgulas dentro dos valores. À vista, não é YAML válido; funciona como texto livre para o modelo.",
      "No Mermaid detalhado sobrou um comentário de depuração (<code>%% Aqui o Gemini comenteu um erro ...</code>) dentro do bloco do diagrama.",
      "O diagrama trata o limite como regra por valor (<code>Valor &gt; R$ 5.000,00?</code>), mas o requisito fala em limite diário, que é uma soma do dia. É uma simplificação da modelagem (leitura minha).",
      "Os dois diagramas divergem entre si (o da aula 1 é bem menor); o do arquivo da aula 2 é o mais completo."
     ]
    }
   ]
  },
  {
   "id": "D5-01",
   "bloco": "d05-b0",
   "mod": "Unidade 1 · Aulas 3 e 4",
   "emoji": "✍️",
   "read": "10 min",
   "title": "UX Writing e sanitização de dados como ativos técnicos",
   "short": "Mensagens de interface e feedbacks de usuários viram JSON versionável, sem culpar o usuário e sem vazar PII.",
   "oneliner": "O mesmo modelo muda de papel conforme o System Prompt: como <b>UX Writer</b> gera mensagens em JSON sem culpa e com próximo passo; como <b>engenheiro de dados com viés de LGPD</b> remove PII e ruído de feedbacks sem destruir o contexto técnico.",
   "vovo": [
    "Imagine dois funcionários de um banco. O primeiro escreve os avisos do caixa eletrônico: em vez de «você errou a senha», escreve «não foi possível confirmar, tente de novo». O segundo recebe uma pilha de cartas de clientes, risca CPFs e telefones com caneta preta, joga fora as cartas de propaganda e entrega só o que ajuda a consertar o banco.",
    "É o mesmo funcionário em dias diferentes: o que muda é a instrução que ele recebeu de manhã. E o resultado de cada um sai em fichas padronizadas (JSON), que o resto da empresa consegue arquivar e usar."
   ],
   "oque": [
    "<b>UX Writing (microcopy):</b> projetar a comunicação dentro da experiência. Uma mensagem mal construída gera insegurança, frustração e abandono; em sistemas financeiros o cuidado é maior, porque mensagens agressivas ou excessivamente técnicas geram desconfiança.",
    "<b>Princípios da aula:</b> não culpar o usuário («Não foi possível concluir a operação», não «você digitou errado»); ser objetivo e evitar becos sem saída (dizer o que aconteceu, por que e o que fazer agora); padronizar a semântica (se o sistema usa «transferência», não alterna com «envio», «remessa» ou «operação»); manter tom de voz e terminologia do design system da empresa; reduzir carga cognitiva, o que também é acessibilidade.",
    "<b>Mensagens como ativo técnico:</b> não se espalha texto hardcoded nos componentes. O padrão é manter as mensagens em arquivos estruturados (normalmente JSON) carregados por biblioteca de internacionalização: manutenção fácil, suporte multilíngue, padronização, desacoplamento da interface e reaproveitamento. Pedir à IA o JSON já no formato do projeto (código identificador, título, mensagem principal, ação sugerida) faz o texto virar parte do código.",
    "<b>Janela de contexto como ativo:</b> a conversa já contém requisito refinado, edge cases e diagramas; a IA usa isso para gerar mensagens específicas de cada cenário (sucesso de agendamento, saldo insuficiente, limite excedido, data inválida, erro de autenticação, timeout, falha de comunicação, cancelamento, chave inválida).",
    "<b>Sanitização de datasets:</b> reviews de loja, tickets de suporte e redes sociais mostram o que não apareceu em homologação, mas chegam com spam, testes internos, respostas automáticas e dados pessoais (CPF, telefone, e-mail, endereço, conta bancária, dados de terceiros). Do ponto de vista de compliance isso é risco real.",
    "<b>O que a LLM adiciona:</b> regex acha CPF, telefone e e-mail; o modelo também interpreta contexto e separa reclamação relevante de ruído, bot, spam, assunto fora do domínio e teste interno. O papel do modelo aqui é engenheiro de dados sênior e especialista em compliance e LGPD.",
    "<b>Equilíbrio:</b> PII (qualquer dado que identifique direta ou indiretamente alguém) é trocada por marcador neutro, não apagada junto com o feedback. Se remover demais, perde-se contexto analítico; de menos, risco de privacidade. Detalhes como «agendar no dia 31 usando iPhone» (ação, edge case de calendário, dispositivo) precisam sobreviver. A saída em JSON alimenta analytics, BI, tickets e novas automações, e identificadores de usuário podem ser anonimizados mantendo rastreabilidade estatística.",
    "<b>A IA não substitui engenharia de dados:</b> para volumes grandes continuam necessários governança, validação, observabilidade e segurança. O LLM é uma camada semântica de preparação inicial."
   ],
   "como": [
    "UX Writing: o System Prompt troca o papel do modelo para UX Writer técnico e especialista em i18n; define tom de voz, termos proibidos e permitidos e o schema JSON. Depois, no mesmo chat, uma tarefa de extração pede os cenários de erro, validação, exceção e sucesso do histórico e gera o JSON aplicando o System Prompt.",
    "Sanitização: o System Prompt define regras numeradas (anonimizar PII com marcador, descartar ruído, preservar contexto técnico) e exige como saída apenas um array JSON, com o autor trocado por um ID anonimizado.",
    "Ciclo que a aula descreve: usuários usam, feedbacks são coletados, dados são sanitizados, a IA ajuda na análise, melhorias são identificadas, novos requisitos surgem e o produto evolui. A sanitização é a primeira etapa de uma cadeia: sem dado limpo, as análises seguintes perdem qualidade.",
    "Revisão humana permanece: o UX Writer, o designer, o dev e o PO continuam responsáveis pela qualidade final do texto; o engenheiro de dados e o analista continuam responsáveis pelo pipeline."
   ],
   "aplica": [
    "Criar um catálogo de mensagens de erro e sucesso de uma feature nova já em JSON, pronto para o i18n do front.",
    "Padronizar a terminologia de produto (transferência, agendamento, chave Pix) em um style guide que o próprio prompt aplica.",
    "Preparar exportações de tickets e reviews antes de analisar ou enviar a qualquer serviço externo.",
    "Servir de etapa zero para classificação, agrupamento e geração automática de tickets (próximo tópico)."
   ],
   "pros": [
    "Texto consistente com o tom de voz da empresa desde a primeira versão.",
    "Mensagens como dado: trocáveis, traduzíveis e testáveis sem mexer no componente.",
    "Interpretação semântica do ruído, o que filtros puramente sintáticos não fazem.",
    "Dataset limpo e estruturado alimenta várias automações seguintes."
   ],
   "contras": [
    "O modelo pode errar a classificação de ruído versus sinal e deixar passar PII em formatos inesperados; a revisão humana continua necessária.",
    "Enviar dados brutos com PII a um serviço de IA externo para sanitizar pode ser, por si só, o problema de compliance (ponto de atenção meu; a aula trata da sanitização em si).",
    "Não substitui pipelines de engenharia de dados para grandes volumes."
   ],
   "traps": [
    "Mensagem que culpa o usuário («dado inválido», «erro do usuário»).",
    "Erro sem próximo passo: becos sem saída.",
    "Remover PII apagando também o contexto técnico que torna o feedback útil.",
    "Esquecer de trocar o System Prompt ao mudar de tarefa, herdando regras da tarefa anterior."
   ],
   "cola": [
    [
     "UX Writing / microcopy",
     "Texto de interface projetado como parte da experiência"
    ],
    [
     "i18n",
     "Internacionalização: textos em arquivos por idioma carregados por biblioteca"
    ],
    [
     "PII",
     "Dado que identifica direta ou indiretamente uma pessoa (CPF, telefone, e-mail, nome completo)"
    ],
    [
     "LGPD",
     "Lei Geral de Proteção de Dados: motivo de anonimizar antes de processar"
    ],
    [
     "Marcador neutro",
     "Substituto da PII que preserva a estrutura da frase (no repo, [REDACTED])"
    ],
    [
     "Ruído",
     "Teste interno, bot, spam, resposta automática, assunto fora do software"
    ],
    [
     "Janela de contexto",
     "Quantidade de informação que o modelo mantém na mesma conversa"
    ],
    [
     "Blameless",
     "Mensagem que não atribui culpa ao usuário"
    ]
   ],
   "links": [
    [
     "Repositório oficial: módulo 01 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01"
    ],
    [
     "Google AI Studio",
     "https://aistudio.google.com/"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-01 · UX Writing e sanitização",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01",
     "resumo": "Dois laboratórios de prompt versionados em Markdown, com entradas e saídas em JSON: o gerador de mensagens de UX Writing do Pix agendado e o sanitizador do dataset de feedbacks.",
     "fluxo": [
      "<code>prompts/ux-writing-system.md</code>: papel de Lead UX Writer Técnico e especialista em i18n para sistemas bancários; diretrizes de tom (proibido «Erro do usuário», «Dado inválido» e «Você esqueceu»; permitido «Não foi possível processar» e «Formato não reconhecido»), regra de resolutividade (todo erro sugere o próximo passo) e consistência técnica (Transferência e não Envio, Agendamento e não Reserva, Chave Pix e não ID). Saída: objeto JSON <code>ERROR_KEY_OR_CODE</code> com <code>title</code> (máx. 40 caracteres), <code>message</code> (máx. 140) e <code>action_label</code> (verbo no imperativo).",
      "<code>report/ux-writer-aula-3.md</code>: o prompt de extração usado depois do System Prompt (identificar cenários de erro, validação e exceção, os de sucesso e gerar o JSON).",
      "<code>report/pt-BR.json</code>: o resultado, com 14 chaves <code>SCHEDULE_PIX_*</code> (por exemplo <code>SCHEDULE_PIX_INVALID_DATE</code>, <code>SCHEDULE_PIX_VALUE_TOO_HIGH</code>, <code>SCHEDULE_PIX_CANT_CANCEL_TODAY</code> e <code>SCHEDULE_PIX_SUCCESS</code>). Verifiquei que o JSON é válido e que todos os títulos e mensagens respeitam os limites de 40 e 140 caracteres.",
      "<code>prompts/data-sanitizer.md</code>: papel de Engenheiro de Dados Sênior e Analista de LGPD; regras de anonimização com <code>[REDACTED]</code>, descarte de ruído (bots, tickets de teste, reclamação de atendimento físico) e preservação de contexto técnico; saída estritamente um array JSON com <code>author</code> trocado por <code>user_1</code> e assim por diante.",
      "<code>data/raw-feedbacks.json</code> (6 tickets) e <code>data/sanitized-feedbacks.json</code> (3 tickets): sobrevivem <code>tkt_01</code> (CPF virou <code>[REDACTED]</code>), <code>tkt_05</code> (crash no dia 31 com iPhone 13) e <code>tkt_06</code> (telefone redigido); saem <code>tkt_02</code> (teste de produção), <code>tkt_03</code> (reclamação do gerente da agência) e <code>tkt_04</code> (resposta automática de bot)."
     ],
     "rodar": [
      "Sem código a executar. No AI Studio, cole o <code>ux-writing-system.md</code> como System Instructions, reaproveite a conversa do tópico anterior e cole o prompt de <code>ux-writer-aula-3.md</code>.",
      "Para a sanitização, troque o System Prompt por <code>data-sanitizer.md</code> e envie o conteúdo de <code>raw-feedbacks.json</code>; compare com <code>sanitized-feedbacks.json</code>."
     ],
     "armadilhas": [
      "Nenhum app do repositório consome <code>pt-BR.json</code>: o <code>pix-app</code> do módulo 2 escreve os textos direto nos templates (inclusive a mensagem do modal de erro, que não vem de nenhuma chave do JSON). Ou seja, o ativo foi gerado mas não foi ligado ao front.",
      "O <code>pt-BR.json</code> mantém na última chave uma indentação fora do padrão, sinal de edição manual; não afeta a validade.",
      "O README do <code>modulo-01</code> fala em Structured Prompt com <code>sentiment_score</code> e <code>technical_priority</code>, campos que não existem nos prompts do repositório (próximo tópico).",
      "<code>sanitized-feedbacks.json</code> mantém os <code>id</code> originais (<code>tkt_01</code>); isso preserva rastreabilidade, mas o vínculo com o dado bruto precisa ser guardado com cuidado (observação minha)."
     ]
    }
   ]
  },
  {
   "id": "D5-02",
   "bloco": "d05-b0",
   "mod": "Unidade 1 · Aulas 5 e 6",
   "emoji": "📦",
   "read": "9 min",
   "title": "Do feedback ao backlog e Prompt as Code",
   "short": "Structured prompts transformam feedback limpo em backlog priorizado, e prompts viram patrimônio do repositório.",
   "oneliner": "Um <b>structured prompt</b> faz o modelo atuar como Tech Lead e PM e devolver tickets em JSON com categoria, severidade e ação; <b>Prompt as Code</b> é tratar esses prompts como código: arquivos separados, versionados, documentados e reutilizáveis.",
   "vovo": [
    "Imagine a caixa de sugestões de um prédio com centenas de bilhetes: «o elevador travou», «ficou preso entre andares», «a porta não abre». O síndico experiente percebe que são o mesmo problema, cria uma única tarefa, marca como urgente e escreve o que o zelador deve olhar primeiro.",
    "Agora imagine que o síndico guardou o jeito de fazer isso numa pasta com o nome certo na gaveta, em vez de na cabeça. Quando ele sair de férias, qualquer pessoa abre a pasta e faz igual. É isso o Prompt as Code: o conhecimento deixa de morar num chat e passa a morar no repositório."
   ],
   "oque": [
    "<b>Problema:</b> produto em produção gera sinais o tempo todo (reviews, tickets, pesquisas, métricas) e o time pergunta «por onde começamos?». O desafio é converter reclamação difusa em backlog acionável.",
    "<b>System Prompt estruturado:</b> papel (Tech Lead e Product Manager de um app financeiro), objetivo, regras de classificação e formato de saída. O modelo passa a pensar em impacto técnico, criticidade, experiência e priorização ao mesmo tempo.",
    "<b>Classificação:</b> categorias explícitas (bug crítico, melhoria de interface, nova funcionalidade) e severidade. Crash e tela branca são alta severidade: erros podem acontecer, mas a interface nunca deveria quebrar sem fallback, feedback visual, mensagem clara e possibilidade de recuperação.",
    "<b>Ações propostas:</b> o modelo transforma sintoma em hipótese de melhoria (para tela branca em transação: investigar logs, tratar exceções, adicionar error boundaries, melhorar o fallback visual, revisar timeout; para dia 31 em mês curto: validar o DatePicker, restringir datas e tratar exceção no back-end).",
    "<b>Agrupamento semântico:</b> «travou», «ficou carregando infinitamente», «tela branca» e «fechou sozinho» podem ser o mesmo bug com palavras diferentes; o modelo consolida em um ticket em vez de dezenas de duplicados, o que ajuda priorização, planejamento e gestão da sprint.",
    "<b>Saída estruturada</b> (ID do ticket, categoria, severidade, resumo, ação proposta) integra com Jira, plataformas de backlog, automações e dashboards. O valor não está em «conversar com o modelo», e sim em transformar respostas em ativos reutilizáveis.",
    "<b>Prompt as Code:</b> prompts carregam decisões técnicas, de produto e de compliance. Tratados como código: um arquivo por propósito com nome claro, em pasta própria, versionados, documentados e compartilhados. Estrutura mínima: dados brutos, prompts, resultados processados e documentação (README) separados. O repositório vira vitrine técnica e biblioteca interna de «inteligência operacional».",
    "<b>Meta prompt:</b> um prompt que gera outro artefato a partir do projeto, aqui o README. Exige pedir só Markdown válido (sem «aqui está o seu README»), vale para qualquer formato que será colado em arquivo (JSON, YAML, Mermaid).",
    "<b>Contexto é parte da arquitetura:</b> na demonstração, o modelo respondeu no formato errado porque o System Prompt anterior (backlog em JSON) ainda estava ativo. Antes de mudar de tarefa, validar o contexto ativo, limpar ou abrir nova conversa."
   ],
   "como": [
    "Alimentar o modelo com o dataset sanitizado, com o System Prompt de backlog ativo e saída exigida como array JSON cru, sem blocos de Markdown.",
    "Revisar o backlog: o humano valida, prioriza e alinha com a organização; a IA acelera a triagem inicial.",
    "Tirar os prompts da ferramenta: copiar cada System Prompt para um arquivo em <code>prompts/</code>; dados em <code>data/</code>, resultados em <code>report/</code>, documentação no README.",
    "Gerar o README por meta prompt apontando o repositório (no AI Studio há opção de contexto de URL; em outras ferramentas pode ser preciso browsing, integração, upload dos arquivos ou colar a árvore do projeto).",
    "Revisar o README gerado: nomes de arquivos, descrição do fluxo e informações inventadas.",
    "Com o tempo, a equipe monta uma biblioteca com prompts de refinamento, edge cases, UX Writing, casos de teste, sanitização, classificação de feedback, documentação, análise de PR, diagramas e backlog."
   ],
   "aplica": [
    "Triar uma exportação de reviews ou tickets do trimestre em um backlog priorizado importável.",
    "Padronizar o mesmo prompt de classificação para todo o time, versionado e revisável em PR.",
    "Criar um repositório de portfólio em que o README explica pipeline, arquivos e como reproduzir.",
    "Detectar regressões e tendências sazonais ao analisar grandes volumes de feedback na mesma janela de contexto."
   ],
   "pros": [
    "Backlog consistente: categoria e severidade explícitas evitam uma lista caótica.",
    "Prompts versionados são revisáveis, reutilizáveis e rastreáveis, ao contrário de histórico de chat.",
    "Saída JSON conecta a IA ao fluxo operacional sem retrabalho manual."
   ],
   "contras": [
    "O backlog gerado é uma primeira triagem; priorização final e alinhamento organizacional são humanos.",
    "Qualidade depende da entrada: dataset sujo contamina tudo (a saída depende da qualidade da entrada).",
    "O modelo pode inventar informações no README se não tiver contexto suficiente do repositório."
   ],
   "traps": [
    "Reaproveitar o chat com o System Prompt de outra tarefa e receber o formato errado.",
    "Pedir README e receber introdução do tipo «segue abaixo a documentação» colada no arquivo.",
    "Deixar prompts só no histórico da ferramenta: ninguém encontra, ninguém revisa, não há governança.",
    "Aceitar o texto gerado sem conferir nomes de arquivos e fluxo descritos."
   ],
   "cola": [
    [
     "Structured prompt",
     "Prompt com papel, regras e schema de saída que força resposta estruturada"
    ],
    [
     "Severidade",
     "Gravidade do problema (ALTA, MEDIA, BAIXA); crash e tela branca são sempre ALTA"
    ],
    [
     "Agrupamento semântico",
     "Consolidar relatos diferentes que descrevem o mesmo problema"
    ],
    [
     "Error boundary",
     "Mecanismo que impede uma exceção de derrubar a tela inteira"
    ],
    [
     "Prompt as Code",
     "Prompts tratados como código: versionados, organizados, documentados e compartilhados"
    ],
    [
     "Meta prompt",
     "Prompt que produz outro artefato (aqui, o README) a partir do projeto"
    ],
    [
     "Prompt Garden",
     "Coleção organizada de prompts reutilizáveis do time (termo da aula 3 da unidade 2)"
    ]
   ],
   "links": [
    [
     "Repositório oficial: módulo 01 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01"
    ],
    [
     "Google AI Studio",
     "https://aistudio.google.com/"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-01 · backlog e Prompt as Code",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01",
     "resumo": "O pipeline completo da unidade 1 em arquivos: dataset bruto, dataset sanitizado, prompt do PM, backlog gerado e o meta prompt do README. A estrutura de pastas do módulo é a própria lição de Prompt as Code.",
     "fluxo": [
      "<code>prompts/insights-distiller.md</code>: papel de Tech Lead e PM de um app financeiro; categorias <code>BUG_CRITICO</code>, <code>UX_UI_IMPROVEMENT</code> e <code>NEW_FEATURE</code>; severidades <code>ALTA</code>, <code>MEDIA</code> e <code>BAIXA</code> (crash e tela branca sempre ALTA); saída estritamente um array JSON, sem Markdown, com <code>ticket_id</code>, <code>original_ref</code>, <code>category</code>, <code>severity</code>, <code>user_pain</code> e <code>proposed_action</code>.",
      "<code>data/backlog.json</code>: três tickets gerados a partir do dataset sanitizado: <code>TKT-101</code> (tela branca no Pix, BUG_CRITICO, ALTA, sugere Error Boundary), <code>TKT-102</code> (crash com datas inexistentes, BUG_CRITICO, ALTA, sugere validar máximo de dias por mês) e <code>TKT-103</code> (comprovante difícil de achar, UX_UI_IMPROVEMENT, MEDIA, sugere atalho na home).",
      "<code>prompts/readme-generator.md</code>: meta prompt de Tech Lead que lê o repositório, infere o propósito de cada arquivo e gera o README completo (título, arquitetura do pipeline, como usar, stack), exigindo só Markdown.",
      "Estrutura do módulo: <code>data/</code> (bruto, sanitizado, backlog), <code>prompts/</code> (cinco prompts), <code>docs/refinement/</code> (briefing) e <code>report/</code> (saídas da IA). É a separação de dado, prompt, resultado e documentação que a aula pede."
     ],
     "rodar": [
      "Sem código. No AI Studio, ative o <code>insights-distiller.md</code> como System Instructions, envie <code>sanitized-feedbacks.json</code> e compare com <code>backlog.json</code>.",
      "Para o README, troque o System Prompt para <code>readme-generator.md</code> (ou abra nova conversa) e habilite contexto de URL."
     ],
     "armadilhas": [
      "O dataset tem só três tickets; ele não exercita o agrupamento semântico que a aula destaca (não há relatos duplicados para consolidar).",
      "O README do <code>modulo-01</code> cita Structured Prompt com <code>sentiment_score</code> e <code>technical_priority</code> e saída em <code>reports/backlog-priorizado.json</code>; o prompt real usa <code>severity</code> e <code>proposed_action</code>, e o backlog está em <code>data/backlog.json</code>.",
      "O <code>readme-generator.md</code> aponta para <code>github.com/unipds-engenharia-de-ia-aplicada/ferramentas-de-IA-para-UX-UI/tree/main/modulo-01-discovery-refinement</code>, um repositório e caminho diferentes da árvore atual (<code>engenharia-de-software-com-ia-aplicada/modulo05.../modulo-01</code>): o meta prompt está desatualizado em relação a onde o material vive hoje.",
      "O README raiz do <code>modulo05</code> descreve outro curso: módulo 2 como Firebase Studio e Figma to Code, módulo 3 como Gemini CLI, módulo 4 como MCP com testes E2E e módulo 5 como Firebase AI Logic. O conteúdo real usa Stitch, Antigravity, Nx, OpenSpec, Jules, Cypress, Playwright MCP e Genkit.",
      "Os cinco prompts (<code>data-sanitizer</code>, <code>insights-distiller</code>, <code>readme-generator</code>, <code>system-instructions-refinement</code>, <code>ux-writing-system</code>) usam formatos diferentes: quatro em Markdown com seções (<code>insights-distiller</code> e <code>ux-writing-system</code> com schema JSON embutido) e <code>system-instructions-refinement</code> em pseudo-YAML. Não há convenção única."
     ]
    }
   ]
  },
  {
   "id": "D5-03",
   "bloco": "d05-b1",
   "mod": "Unidade 2 · Aula 1",
   "emoji": "🛠️",
   "read": "7 min",
   "title": "Ambiente AI-first: Angular, Antigravity e MCP",
   "short": "Antes de pedir código ao agente, preparar a IDE, o projeto limpo e uma fonte de contexto atualizada via MCP.",
   "oneliner": "Um agente de código só é confiável se trabalhar com <b>contexto atualizado</b>: o <b>MCP do Angular</b> liga o agente à documentação oficial, e a primeira tarefa deve ser um esqueleto com <b>escopo e restrições</b> explícitos, aprovado por plano antes de aplicar.",
   "vovo": [
    "Imagine contratar um pedreiro muito rápido que aprendeu o ofício há dois anos. As regras de construção mudaram desde então e ele não sabe. Você não vai confiar na memória dele: entrega a ele o livro de normas atualizado e diz exatamente que parede pode mexer.",
    "O MCP é o livro de normas atualizado; o plano que o agente mostra antes de agir é ele dizendo «vou mexer nestas três paredes, pode ser?». Quem aprova continua sendo você."
   ],
   "oque": [
    "<b>Mudança de fase:</b> até aqui a IA apoiou refinamento, documentação e análise; agora ela entra no desenvolvimento front-end. Existe uma diferença grande entre pedir código a um chat e configurar um ambiente em que o agente enxerga o workspace, propõe alterações e executa tarefas.",
    "<b>Antigravity:</b> IDE com filosofia AI-first. Parece VS Code, Cursor e outras IDEs com chat, e é um fork do VS Code, então extensões do VS Code costumam servir. Diferencial: permite controlar agentes de codificação, que analisam arquivos e aplicam mudanças no código. A IA deixa de ser um chat externo.",
    "<b>Mais poder, mais responsabilidade:</b> sem escopo, restrições e padrões, o agente pode gerar estilos antes da hora, alterar arquivos demais ou criar estrutura diferente da esperada.",
    "<b>Angular CLI:</b> o exemplo cria o projeto PixApp com CSS puro e roteamento (Angular 21 na gravação; a versão pode mudar, o processo não). O raciocínio vale também para React, Vue ou outro framework.",
    "<b>Por que MCP:</b> o modelo é treinado em dados com janela temporal e frameworks evoluem rápido (Angular, React, Vue, Next.js, Spring, Quarkus, Micronaut). Há risco real de padrões antigos: módulos em vez de standalone components, sintaxe desatualizada, roteamento antigo, desconhecimento de signals.",
    "<b>MCP (Model Context Protocol):</b> forma de conectar agentes de IA a servidores especializados que fornecem ferramentas e contexto atualizado. O time do Angular mantém um servidor MCP com documentação, recomendações e boas práticas. A mesma lógica vale para qualquer stack: React, Spring, Quarkus.",
    "<b>Primeira tarefa:</b> o prompt segue papel, objetivo, regras e saída. Papel: engenheiro front-end sênior especialista em Angular 21. Tarefas: limpar o conteúdo padrão da CLI, criar estrutura semântica com navegação, menu lateral e área principal, configurar rota para PIX, criar componente standalone de transferência e um formulário inicial. Restrição essencial: não gerar CSS nem estilo inline, porque a IA tende a «melhorar» a entrega por conta própria.",
    "<b>Plano antes da ação:</b> o Antigravity cria um plano de execução, lista os arquivos que vai alterar e aguarda aprovação. A IA propõe e o desenvolvedor revisa; automação cega não é o modelo ideal."
   ],
   "como": [
    "Ordem do fluxo: criar o projeto limpo, abrir no Antigravity, subir a aplicação padrão, configurar o agente, conectar o MCP e só então pedir alterações. Pular direto para geração de código aumenta a chance de solução desatualizada ou desalinhada com o framework.",
    "O próprio Angular fornece um comando que devolve o JSON de configuração do servidor MCP; esse JSON é registrado na seção de MCP Servers da área de agentes da IDE.",
    "Resultado da primeira tarefa: menu lateral com item PIX, rota configurada e formulário com chave PIX, valor, data de agendamento e botão de confirmação. Sem estilo, sem componentes finais, sem integração real.",
    "Restringir escopo é uma habilidade central: quanto mais claro o limite da tarefa, melhor a entrega."
   ],
   "aplica": [
    "Configurar o MCP oficial do framework do seu projeto antes de qualquer geração de código com agente.",
    "Começar toda feature com uma tarefa de esqueleto sem estilo, validar a estrutura e só depois estilizar.",
    "Exigir plano e lista de arquivos antes de qualquer alteração automática.",
    "A live de 28/07 aprofunda o uso de MCPs (Context7, Magnific) e skills de agente no mesmo fluxo: <a href=\"#D5-16\">Live Safer</a>."
   ],
   "pros": [
    "Menos código desatualizado: o agente consulta a fonte oficial em vez de confiar só no treino.",
    "Esqueleto previsível e fácil de revisar, porque nada visual foi misturado.",
    "O desenvolvedor mantém o controle pela aprovação do plano."
   ],
   "contras": [
    "Mais uma peça de ambiente para configurar e manter por IDE e por stack.",
    "O MCP reduz, mas não elimina, a necessidade de revisar o que o agente gera."
   ],
   "traps": [
    "Pedir código antes de preparar o ambiente.",
    "Não restringir escopo e deixar o agente inventar CSS, classes e decisões visuais.",
    "Decorar a ferramenta (Antigravity) em vez do princípio: o mesmo vale para Cursor, Windsurf, Copilot e outras."
   ],
   "cola": [
    [
     "Antigravity",
     "IDE AI-first, fork do VS Code, com agentes de codificação (segundo a apostila)"
    ],
    [
     "MCP",
     "Model Context Protocol: conecta o agente a servidores com ferramentas e contexto atualizado"
    ],
    [
     "Angular CLI",
     "Linha de comando oficial para criar projeto, componentes, rotas e serviços"
    ],
    [
     "Standalone component",
     "Componente Angular sem NgModule"
    ],
    [
     "Plano de execução",
     "Lista de arquivos e ações que o agente propõe antes de alterar o projeto"
    ],
    [
     "Escopo e restrições",
     "O que o agente pode e não pode tocar na tarefa"
    ]
   ],
   "links": [
    [
     "Repositório oficial: pix-app (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app"
    ],
    [
     "Antigravity",
     "https://antigravity.dev/"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-02/pix-app",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app",
     "resumo": "Aplicação Angular 21 com CSS puro, rotas lazy, Vitest e o servidor MCP do Angular registrado em <code>.vscode/mcp.json</code>. É o projeto que as seis aulas da unidade 2 evoluem; neste tópico interessa o esqueleto.",
     "fluxo": [
      "<code>.vscode/mcp.json</code>: servidor <code>angular-cli</code> iniciado por <code>npx -y @angular/cli mcp</code> (o arquivo é JSON com comentário e aponta para angular.dev/ai/mcp).",
      "<code>src/app/app.ts</code> e <code>app.html</code>: <code>App</code> standalone com <code>RouterOutlet</code> e <code>RouterLink</code>, um <code>&lt;aside&gt;&lt;nav&gt;</code> com links para <code>/pix</code> e <code>/extrato</code> e um <code>&lt;main&gt;</code> com o <code>router-outlet</code>.",
      "<code>src/app/app.routes.ts</code>: redireciona <code>''</code> para <code>/pix</code> e usa <code>loadComponent</code> (lazy) para <code>PixTransfer</code> e <code>PixHistoryComponent</code>.",
      "<code>src/app/app.config.ts</code>: <code>provideBrowserGlobalErrorListeners()</code> e <code>provideRouter(routes)</code>. <code>angular.json</code> e <code>package.json</code> mostram Angular 21.1, TypeScript 5.9 e Vitest 4.",
      "O formulário de transferência (<code>pix-transfer/</code>) nasce aqui sem estilo e é tratado no próximo tópico."
     ],
     "rodar": [
      "<code>npm install</code> e <code>npm start</code> (<code>ng serve</code>, em http://localhost:4200). <code>npm run build</code> compila (verifiquei que o build passa).",
      "O MCP é ativado pela IDE com o <code>.vscode/mcp.json</code>; o comando que gera o JSON é fornecido pelo Angular CLI (a apostila não o transcreve)."
     ],
     "armadilhas": [
      "O README do <code>pix-app</code> é o texto padrão do Angular CLI; não descreve o projeto nem os prompts.",
      "<code>npm test</code> (<code>ng test</code>) não roda como está: verifiquei que <code>pix-receipt.spec.ts</code> importa <code>PixReceipt</code>, mas a classe exportada se chama <code>PixReceiptComponent</code>, e a compilação dos testes falha.",
      "Removendo esse arquivo só para investigar (repeti numa cópia fora do repo), os dois testes de <code>app.spec.ts</code> falham com <code>NG0201 No provider found for ActivatedRoute</code>: o <code>RouterLink</code> do template exige <code>provideRouter</code> no TestBed. Mesmo corrigindo isso, o segundo teste ainda esperaria um <code>h1</code> com «Hello, pix-app», que o template atual não tem (leitura do código). Só <code>pix-transfer.spec.ts</code> passa.",
      "Não há spec para <code>pix-history</code> e <code>error-modal</code>."
     ]
    }
   ]
  },
  {
   "id": "D5-04",
   "bloco": "d05-b1",
   "mod": "Unidade 2 · Aulas 2 e 3",
   "emoji": "🎨",
   "read": "9 min",
   "title": "Design tokens e componentes acessíveis",
   "short": "Briefing de marca vira variáveis CSS semânticas, e o primeiro componente nasce acessível por prompt versionado.",
   "oneliner": "<b>Design tokens</b> são a menor unidade reutilizável do visual (cor, fonte, espaçamento); o agente deve <b>consumir tokens, nunca valores soltos</b>. E acessibilidade (ARIA, teclado, foco, ESC) entra no <b>nascimento</b> do componente, porque corrigir depois é mais caro.",
   "vovo": [
    "Imagine uma rede de padarias. Se cada loja pintar a fachada com o azul que achar bonito, a marca vira uma colcha de retalhos. A solução é uma cartela de tintas oficial: cada loja pede «a cor principal», e se a marca mudar de azul para laranja, troca-se a tinta da cartela, não as mil paredes.",
    "A acessibilidade é a rampa e o aviso em braille na porta. É barato colocar quando a loja é construída e caro quando já está funcionando. O leitor de tela é o cliente que só «enxerga» o que está escrito na placa, mesmo que ninguém mais repare nela."
   ],
   "oque": [
    "<b>Token de design</b> não é token de LLM. Aqui é conceito de design system: uma cor, fonte, espaçamento, raio de borda ou sombra, com nome. Evita o «cada tela com um azul diferente» e o vermelho de erro aleatório, e reduz o desalinhamento entre design e desenvolvimento.",
    "<b>Nome semântico, não literal:</b> <code>cor primária</code>, <code>cor de destaque</code>, <code>cor de erro</code>, <code>fundo</code> e <code>texto</code>, em vez de «azul» e «verde». Se a primária mudar de azul para outro tom, o nome continua verdadeiro.",
    "<b>O briefing da aula:</b> marca que transmite confiança e modernidade, azul noturno como principal, verde neon como destaque, vermelho clássico para erro, fundo quase branco no claro e chumbo no escuro, Montserrat nos títulos, Inter no corpo, espaçamentos em múltiplos de 4px (8, 16, 24 e 32).",
    "<b>Prompt como arquivo do projeto:</b> em vez de digitar no chat, cria-se um arquivo de prompt (Prompt as Code). Papel: design system engineer sênior. Objetivo: converter o briefing em variáveis nativas de CSS. Diretrizes: nomenclatura semântica, escala de tipografia, variáveis no seletor raiz, suporte a troca de tema. O agente lê briefing e prompt e escreve no arquivo global de estilos.",
    "<b>Aplicação restrita:</b> o segundo prompt pede para estilizar a navegação e o formulário, proibindo cores hexadecimais absolutas e exigindo <code>var(...)</code>. O modelo tende a resolver o visual do jeito mais direto e a gerar cores fixas, estilos inline ou valores duplicados, o que quebra a ideia de design system. A aula também faz o agente separar o template em arquivo HTML, uma preferência arquitetural que precisa ser comunicada.",
    "<b>Outras stacks:</b> com Tailwind, CSS Modules ou Styled Components, o prompt muda para gerar a estrutura compatível, mas o princípio é o mesmo. Em projetos maiores os tokens podem vir do Figma e ser sincronizados com o código.",
    "<b>Acessibilidade:</b> não é uma checklist superficial; envolve navegação por teclado, leitores de tela, ordem semântica, clareza textual, contraste, gerenciamento de foco, feedback e comportamento previsível. O foco do módulo é a W3C e as diretrizes WCAG.",
    "<b>ARIA:</b> atributos que enriquecem a semântica para tecnologias assistivas. Visualmente nada muda, mas dizer que um elemento é um modal altera como o leitor de tela trata foco e anuncia conteúdo. A acessibilidade ajuda também usuários avançados (teclado), pessoas com limitação motora e quem depende de fluxo de foco.",
    "<b>Componente da aula: modal de erro.</b> Requisitos: leitura correta por leitores de tela, foco, teclado, fechamento por ESC, semântica adequada, isolamento da interface, consumo exclusivo dos tokens. Um leitor de tela preso num modal sem saída fácil é um problema grave de usabilidade; ao abrir, o foco vai para o componente, e ao fechar deveria voltar ao elemento anterior.",
    "<b>Prompt Garden:</b> coleção versionada de prompts do time (componentes acessíveis, tokens, refinamento, backlog, documentação, sanitização, UX Writing). Cada conversa nova por domínio evita confusão contextual.",
    "<b>Ressalvas da aula:</b> o Angular Language Service marcou falsos positivos no listener de ESC; avisos de IDE nem sempre são erros reais, então valida-se o comportamento da aplicação. A regra de negócio de demonstração é: valor acima de R$ 5.000 mostra o modal de erro."
   ],
   "como": [
    "Briefing de marca (texto), prompt de tokens (arquivo), geração do bloco <code>:root</code> no CSS global com cores, tipografia, espaçamento e temas claro e escuro.",
    "Prompt de estilização restrita aplicando os tokens nos componentes existentes, sem hex absoluto.",
    "Prompt de componente acessível (papel: engenheiro front-end sênior especialista em a11y e WCAG; objetivo: componente standalone que consome só tokens; regras ARIA, teclado e foco; saída em <code>.ts</code>, <code>.html</code> e <code>.css</code>), executado em conversa nova.",
    "Integração ao fluxo com a nova sintaxe condicional do Angular, e checagem manual de: modal aparece, mensagem exibida, botão e ESC fecham, tokens respeitados, ARIA presente."
   ],
   "aplica": [
    "Transformar o briefing de marca de qualquer cliente em tokens antes da primeira tela.",
    "Fazer do modal, do formulário e dos botões da sua biblioteca interna componentes que nascem com ARIA e teclado.",
    "Manter um Prompt Garden para tokens e componentes e reutilizá-lo entre projetos.",
    "A live de 30/09 mostra a hierarquia semântica de títulos e os dados estruturados que ajudam a máquina a ler a página: <a href=\"#D5-17\">Live SEO, GEO e AEO</a>."
   ],
   "pros": [
    "Troca de tema ou de cor da marca em um único lugar.",
    "Consistência visual e menos retrabalho quando várias pessoas trabalham no produto.",
    "Acessibilidade barata porque entra no início e fica descrita no prompt reutilizável."
   ],
   "contras": [
    "O agente pode ignorar a restrição de tokens; é preciso conferir o CSS gerado.",
    "ARIA é invisível: sem teste com teclado e leitor de tela, a falta de um atributo passa despercebida."
   ],
   "traps": [
    "Nomear variável pela cor (<code>--azul</code>) em vez de pela função.",
    "Aceitar cor hexadecimal, estilo inline ou valor duplicado só porque «ficou igual».",
    "Achar que ARIA «não faz diferença» porque a tela não muda.",
    "Confiar no alerta do language service sem validar o comportamento real, ou o contrário."
   ],
   "cola": [
    [
     "Design token",
     "Menor unidade reutilizável do sistema visual: cor, fonte, espaçamento, sombra"
    ],
    [
     "CSS custom property",
     "Variável nativa <code>--nome</code>, lida com <code>var(--nome)</code>"
    ],
    [
     "Nome semântico",
     "Nome pela função (<code>--color-primary</code>), não pela cor"
    ],
    [
     "WCAG",
     "Diretrizes de acessibilidade da W3C"
    ],
    [
     "WAI-ARIA",
     "Atributos <code>role</code>, <code>aria-*</code> que descrevem a semântica a tecnologias assistivas"
    ],
    [
     "Gerenciamento de foco",
     "Levar o foco ao modal ao abrir e devolvê-lo ao fechar"
    ],
    [
     "Prompt Garden",
     "Biblioteca versionada de prompts do time"
    ]
   ],
   "links": [
    [
     "Repositório oficial: pix-app (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app"
    ],
    [
     "Antigravity",
     "https://antigravity.dev/"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-02/pix-app",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app",
     "resumo": "Do briefing de marca ao <code>:root</code> em <code>src/styles.css</code>, e do prompt de acessibilidade ao <code>ErrorModal</code> usado pela tela de transferência.",
     "fluxo": [
      "<code>briefing/branding-briefing.txt</code> mais <code>prompts/design-tokens-generator.md</code> geram <code>src/styles.css</code>: <code>--color-primary</code> (#0A192F), <code>--color-action</code> (#64FFDA), <code>--color-error</code> (#FF6B6B), <code>--color-background</code> e <code>--color-text</code>, <code>--font-heading</code> (Montserrat) e <code>--font-body</code> (Inter), <code>--spacing-small</code>, <code>-medium</code>, <code>-large</code> e <code>-extra-large</code> (8, 16, 24 e 32px), e um <code>@media (prefers-color-scheme: dark)</code> que troca fundo (#112240) e texto (#F8F9FA).",
      "<code>app.css</code> e <code>pix-transfer/pix-transfer.css</code> consomem os tokens (<code>var(--color-primary)</code>, <code>var(--spacing-large)</code> e afins), sem hex literal.",
      "<code>prompts/a11y-component-generator.md</code> (papel de especialista em a11y e WCAG, ARIA obrigatório, teclado, foco, ESC, CSS sem cor nem espaçamento absolutos) gera <code>components/error-modal/</code>: <code>title</code> e <code>message</code> como <code>input.required</code>, <code>close</code> como <code>output</code>, <code>role=\"alertdialog\"</code>, <code>aria-modal=\"true\"</code>, <code>aria-labelledby</code> e <code>aria-describedby</code>, botão com <code>aria-label=\"Fechar\"</code>, foco inicial no botão em <code>ngAfterViewInit</code> e fechamento por ESC via <code>@HostListener('document:keydown.escape')</code>. O backdrop também fecha ao clique.",
      "<code>pix-transfer/pix-transfer.ts</code>: signals <code>pixKey</code>, <code>transferAmount</code>, <code>schedulingDate</code>, <code>showErrorModal</code> e <code>transferReceiptData</code>; <code>onSubmit()</code> abre o modal se o valor passar de 5000. O template usa <code>@if (showErrorModal())</code> para exibir o <code>app-error-modal</code> com o título «Limite Excedido»."
     ],
     "rodar": [
      "<code>npm start</code>, abra <code>/pix</code>, informe um valor acima de 5000 e confirme: o modal aparece com o foco no botão fechar; ESC e clique no fundo fecham.",
      "Troque o tema do sistema operacional entre claro e escuro para ver o <code>prefers-color-scheme</code> trocar os tokens."
     ],
     "armadilhas": [
      "Contraste na navegação, pela leitura do CSS (não renderizei): <code>aside</code> usa fundo <code>--color-primary</code> (#0A192F) e os links usam <code>--color-text</code>, que no tema claro também é #0A192F. Os links ficam invisíveis no claro e só aparecem no escuro (#F8F9FA).",
      "Montserrat e Inter nunca são carregadas: <code>src/index.html</code> só importa o Material Symbols (duas vezes, com FILL 0 e FILL 1). As fontes caem para <code>sans-serif</code>. O <code>&lt;html&gt;</code> também está com <code>lang=\"en\"</code> numa UI em português.",
      "O comentário do modal fala em «trap» de foco, mas só há foco inicial; não há retenção do foco dentro do diálogo nem devolução ao elemento anterior, que a própria apostila cita como boa prática.",
      "<code>@HostListener</code>, <code>@ViewChild</code> e <code>AfterViewInit</code> são o estilo antigo; o <code>.gemini/GEMINI.md</code> do projeto do módulo 5 proíbe <code>@HostListener</code> (usar o objeto <code>host</code>). O código da unidade 2 é anterior a esse arquivo, que o Angular CLI gera na criação do <code>brag-bot</code>, e não segue a regra.",
      "O formulário tem <code>required</code> nos inputs, mas <code>onSubmit()</code> não bloqueia: valor vazio vira <code>0</code> e o comprovante aparece com R$ 0,00 e a chave Pix digitada (mesmo vazia) como «Destinatário». <code>schedulingDate</code> nunca é usada. Leitura do código, sem ter executado a tela.",
      "A mensagem do modal («precisam ser aprovadas pelo seu gerente») não vem do <code>pt-BR.json</code> do módulo 1, cujo equivalente seria <code>SCHEDULE_PIX_VALUE_TOO_HIGH</code>."
     ]
    }
   ]
  },
  {
   "id": "D5-05",
   "bloco": "d05-b1",
   "mod": "Unidade 2 · Aulas 4 e 5",
   "emoji": "🖼️",
   "read": "10 min",
   "title": "Stitch e Figma: da referência visual ao componente Angular",
   "short": "Protótipo gerado e imagem do Figma não são o front final: o agente os traduz para o design system e a arquitetura do projeto.",
   "oneliner": "O <b>Stitch</b> gera protótipo (HTML e CSS) a partir de linguagem natural e o <b>Figma</b> entrega o handoff; em ambos o agente deve <b>refatorar para standalone component, signals e tokens</b> do projeto, e não copiar a referência às cegas.",
   "vovo": [
    "Imagine que um arquiteto te entrega a foto de uma cozinha dos sonhos e um desenhista rápido te entrega um croqui em minutos. Nenhum dos dois é a obra. Quem constrói precisa adaptar à tubulação da sua casa, ao padrão dos seus azulejos e às suas tomadas.",
    "O Stitch é o desenhista rápido; o Figma é a foto com medidas. O agente é o mestre de obras que traduz os dois para a casa que já existe, sem quebrar a instalação."
   ],
   "oque": [
    "<b>Stitch (Google):</b> gera interfaces gráficas a partir de linguagem natural, como o AI Studio, mas especializado em UX e interface. Funciona como camada intermediária entre UX e implementação: ideação, prototipação e aceleração visual. O resultado não é só imagem, é HTML, CSS e componentes visuais usáveis como ponto de partida. Permite visualizar, testar, criar variações, adaptar e exportar, inclusive para o Figma. Lovable é citado como categoria semelhante: o conceito vale mais do que a ferramenta.",
    "<b>Prompt do Stitch:</b> descrever tela, estilo e conteúdo (card centralizado, sombra suave, ícone de sucesso, valor em destaque, nome do recebedor, data e hora, botão de retorno) e reaproveitar a identidade visual do design system, para manter o alinhamento mesmo em ferramentas externas.",
    "<b>O protótipo ainda não é do projeto:</b> o Stitch gerou uma página com Tailwind, e o projeto usa Angular, standalone components, tokens próprios e não usa Tailwind. É preciso refatorar. A cadeia é: Stitch (visual), Antigravity (agente de engenharia), MCP do Angular (boas práticas) e tokens (consistência).",
    "<b>Prompt de refatoração:</b> o agente deixa de gerar do zero e passa a transformar um HTML bruto em componente Angular real: standalone component, Input Signals, tokens, sem cor absoluta, layout desktop, arquivos separados. O Antigravity produz artifacts (listas de ação, plano, rastreio de alterações), o que dá rastreabilidade. Os ícones do Tailwind foram trocados por Material Symbols, uma adaptação contextual.",
    "<b>Integração:</b> com valor válido e menor que cinco mil, o formulário some e o comprovante aparece, usando standalone components, Input Signals e control flow moderno.",
    "<b>Figma e handoff:</b> normalmente UX pesquisa e testa, e entrega ao desenvolvimento via Figma; o handoff transforma decisões visuais e comportamentais em algo implementável com fidelidade. Antes dependia de interpretação manual (espaçamentos, fontes, cores, alinhamentos). Agora modelos multimodais analisam a imagem e geram código: texto para texto, texto para código, HTML para componente e agora imagem para código.",
    "<b>Entradas multimodais da aula:</b> a imagem do extrato Pix, as especificações textuais que simulam o Dev Mode do Figma (espaçamento, dimensões, alinhamento, tipografia, cores) e o contexto arquitetural do projeto. O objetivo não é reproduzir a imagem literalmente, e sim integrar UX, arquitetura e consistência visual.",
    "<b>Prompt do Figma:</b> engenheiro front-end sênior especialista em Angular 21, acessibilidade e design systems; gerar um standalone component com interface TypeScript de transação, Signals, control flow moderno (<code>@for</code>), consumo exclusivo dos tokens, proibição de hex absoluto e ícones Material Symbols.",
    "<b>Integração e revisão:</b> nova conversa para criar a rota <code>extrato</code>, o item de menu com <code>routerLink</code> e manter o estilo da navegação. Apareceu um bug típico: o componente usava os nomes dos ícones, mas a biblioteca não tinha sido importada. Reaproveitou-se a conversa anterior porque o contexto já tinha o raciocínio necessário; contexto tem valor, e saber quando reaproveitar ou recomeçar faz parte do ofício."
   ],
   "como": [
    "Escrever o prompt do Stitch com tela, estilo e conteúdo, gerar, e baixar o HTML e o CSS exportados.",
    "Guardar o código bruto numa pasta própria do projeto, separando protótipo bruto, implementação real, prompts e componentes.",
    "Escrever o prompt de refatoração (papel, objetivo, diretrizes, formato de saída) e pedir ao agente que leia o prompt e o código exportado.",
    "Integrar o componente à tela e validar no navegador.",
    "Figma: criar prompt de papel e regras, abrir conversa nova com prompt, imagem e specs, revisar os artifacts, integrar com rota e menu e corrigir o que faltou (como o import dos ícones)."
   ],
   "aplica": [
    "Ganhar velocidade na ideação visual de uma tela nova sem comprometer a arquitetura do front real.",
    "Receber um handoff do Figma e entregar componente alinhado ao design system em vez de CSS copiado.",
    "Combinar ferramentas por etapa (protótipo, refatoração, documentação, requisitos) com o desenvolvedor como orquestrador."
   ],
   "pros": [
    "Protótipo em minutos que serve de ponto de partida técnico, não só de mockup.",
    "O handoff deixa de depender só de olho e régua: a imagem e as specs viram contexto para o agente.",
    "Os artifacts do agente tornam a decisão rastreável."
   ],
   "contras": [
    "A saída do Stitch vem com stack e paleta próprias que não respeitam necessariamente as do projeto.",
    "A interpretação de imagem é mais lenta e pode esquecer dependências (como o import de ícones).",
    "Fidelidade ao Figma e respeito ao design system podem competir; alguém precisa decidir."
   ],
   "traps": [
    "Colar o HTML do Stitch no projeto e seguir adiante com Tailwind, ícones e paleta alheios.",
    "Copiar o Figma pixel a pixel ignorando tokens, componentes e contratos.",
    "Não revisar o que o agente «esqueceu»: import de biblioteca, rota, link de menu."
   ],
   "cola": [
    [
     "Stitch",
     "Ferramenta do Google que gera interface a partir de linguagem natural (HTML e CSS)"
    ],
    [
     "Handoff",
     "Passagem do design (Figma) para o desenvolvimento com fidelidade"
    ],
    [
     "Dev Mode",
     "Visão do Figma com espaçamentos, dimensões, tipografia e cores"
    ],
    [
     "Multimodal",
     "Modelo que aceita mais de um tipo de entrada (texto, imagem, áudio, vídeo, documento)"
    ],
    [
     "Input Signals",
     "Entradas de componente Angular baseadas em signals (<code>input()</code>)"
    ],
    [
     "Control flow",
     "Sintaxe <code>@if</code>, <code>@else</code>, <code>@for</code> do Angular moderno"
    ],
    [
     "Material Symbols",
     "Biblioteca de ícones usada no projeto"
    ],
    [
     "Artifact",
     "Registro intermediário (plano, tarefas, alterações) que o Antigravity gera"
    ]
   ],
   "links": [
    [
     "Repositório oficial: pix-app (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app"
    ],
    [
     "Google Stitch",
     "https://stitch.withgoogle.com"
    ],
    [
     "Figma",
     "https://www.figma.com/"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-02/pix-app",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app",
     "resumo": "Dois componentes nascem aqui: <code>PixReceiptComponent</code> (a partir do HTML do Stitch) e <code>PixHistoryComponent</code> (a partir da imagem do Figma e das specs), mais a integração na tela de transferência e a rota de extrato.",
     "fluxo": [
      "<code>briefing/google-stitch.txt</code> é o prompt do Stitch (tela web desktop de comprovante de sucesso, card centralizado, check grande, R$ 150,00, «Erick S.», data e hora, botão largo «Voltar ao Início», azul escuro e verde neon). <code>stitch/comprovante_stitch.html</code> é a saída bruta: Tailwind via CDN, fonte Space Grotesk, paleta própria (<code>primary</code> #0f49bd, <code>accent</code> #39ff14), cabeçalho «PixBank» com navegação, card, grade de ações e botões.",
      "<code>prompts/stitch-code-refactor.md</code> e <code>prompts/refatoracao-stich.txt</code> mandam criar <code>PixReceiptComponent</code> com <code>@Input</code> Signals, tokens do <code>styles.css</code> e Material Symbols. Resultado em <code>pix-receipt/</code>: <code>nome</code> e <code>valor</code> como <code>input.required</code>, <code>CurrencyPipe</code> para o valor em BRL, template e CSS separados.",
      "<code>prompts/adicionar-fluxo-comprovante.txt</code> integra o componente: em <code>pix-transfer.html</code>, <code>@if (transferReceiptData(); as receipt) { &lt;app-pix-receipt ...&gt; } @else { &lt;section&gt;...formulário...&lt;/section&gt; }</code>.",
      "Figma: <code>briefing/figma-specs.txt</code> (PixHistoryList vertical com gap 0; TransactionItem horizontal com space-between, padding 16px 24px, borda inferior 1px; títulos 600 16px, datas 400 12px; valor recebido e enviado em 700 16px; gap do ícone 12px e ícone de 24px), <code>imagem/extrato-pix.png</code>, <code>prompts/figma-to-angular.md</code> e <code>prompts/componente-figma.txt</code>.",
      "Resultado em <code>pix-history/</code>: interface <code>Transaction</code> (<code>id</code>, <code>title</code>, <code>amount</code>, <code>type</code> como <code>'received' | 'sent'</code> e <code>date</code>), signal com três transações mockadas, <code>@for (transaction of transactions(); track transaction.id)</code>, ícones <code>arrow_downward</code> e <code>arrow_upward</code>, <code>CurrencyPipe</code> e <code>DatePipe</code>.",
      "<code>prompts/criacao-menu-extrato.txt</code> gera a rota <code>/extrato</code> em <code>app.routes.ts</code> e o link no menu do <code>app.html</code>."
     ],
     "rodar": [
      "<code>npm start</code>; em <code>/pix</code> envie um valor até 5000 para ver o comprovante; em <code>/extrato</code>, a lista mockada.",
      "Abra <code>stitch/comprovante_stitch.html</code> no navegador para comparar o protótipo com o componente refatorado (o protótipo usa CDN do Tailwind e precisa de internet)."
     ],
     "armadilhas": [
      "Os prompts apontam para nomes que não existem: <code>@stitch-bruto.html</code> e <code>@stitch-bruto.css</code> (o repo tem <code>stitch/comprovante_stitch.html</code> e nenhum CSS separado), <code>@pix-receipt.component.ts</code> e <code>@pix-transfer.component.ts</code> (os arquivos são <code>pix-receipt.ts</code> e <code>pix-transfer.ts</code>), <code>@extrato-figma.png</code> (o arquivo é <code>imagem/extrato-pix.png</code>). Reproduzir os prompts literalmente exige ajustar caminhos.",
      "O Stitch não seguiu a paleta do briefing: usou #39ff14 como destaque (o token é #64FFDA) e inventou um cabeçalho «PixBank» com navegação que o prompt não pedia. A refatoração descartou esse cabeçalho.",
      "<code>pix-receipt.html</code> mantém dados fixos do mockup: «24 de Maio, 2024», «14:30:45», «Banco Neon» e o ID <code>PIX9823749823BCN9283</code>. Só nome e valor são dinâmicos; os botões Compartilhar, Baixar PDF, Imprimir e Voltar ao Início não têm handler.",
      "O template do comprovante abre um <code>&lt;main&gt;</code> dentro do <code>&lt;main&gt;</code> do <code>app.html</code> (dois landmarks principais) e usa <code>min-height: 100vh</code> no container.",
      "<code>pix-receipt.css</code> desobedece à regra «sem valores absolutos» dos prompts: há <code>rgba(100, 255, 218, ...)</code>, <code>rgba(10, 25, 47, ...)</code>, <code>96px</code>, <code>500px</code> e sombras fixas. Além disso, <code>border: 1px solid rgba(var(--color-primary), 0.1)</code> é inválido, porque <code>--color-primary</code> é um hex e não uma tripla RGB; o navegador descarta a declaração (leitura, não renderizei).",
      "<code>pix-history.component.css</code> usa <code>padding: 0 var(--spacing-lg)</code>, mas o token se chama <code>--spacing-large</code>; <code>--spacing-lg</code> não existe, e a declaração fica inválida em tempo de computação (sem padding lateral). Também usa <code>12px</code>, <code>24px</code> e <code>16px</code> literais, vindos direto das specs do Figma.",
      "O extrato usa <code>--color-action</code> (neon) para valores recebidos e <code>--color-error</code> para enviados, e não os #10B981 e #EF4444 do Figma: foi a adaptação ao design system que a aula defende, mas muda a fidelidade visual.",
      "Nomenclatura inconsistente: <code>pix-history.component.*</code> (sufixo antigo) convive com <code>pix-transfer.ts</code> e <code>pix-receipt.ts</code> (convenção do Angular 21)."
     ]
    }
   ]
  },
  {
   "id": "D5-06",
   "bloco": "d05-b1",
   "mod": "Unidade 2 · Aula 6",
   "emoji": "🔍",
   "read": "7 min",
   "title": "Corrigindo a interface com IA: contraste, responsividade e revisão humana",
   "short": "IA acelera a correção, mas contraste, mobile e número mágico só aparecem com revisão humana no DevTools.",
   "oneliner": "Código que compila não é interface boa: <b>contraste, responsividade e aderência ao design system</b> exigem revisão visual, e as correções devem ser <b>pontuais e específicas</b>, reaproveitando tokens em vez de pedir uma cor qualquer.",
   "vovo": [
    "Você pede ao pintor para pintar a sala e ele entrega uma sala linda, mas com letras cinza-escuro sobre parede azul-marinho: ninguém consegue ler o aviso na parede. O pintor não percebeu; quem percebe é quem olha. A correção não precisa de um contrato novo, basta dizer «use a tinta clara da cartela neste aviso».",
    "E uma casa que parece ótima no desktop pode ter a porta presa quando a gente a vê numa tela de celular. Por isso alguém precisa ir lá, abrir o celular e olhar."
   ],
   "oque": [
    "<b>A IA acelera, não elimina a revisão:</b> a responsabilidade pela qualidade final continua do desenvolvedor: revisão visual, validação arquitetural, acessibilidade, responsividade, testes, integração e comportamento.",
    "<b>Caso 1, contraste:</b> o comprovante criado a partir do Stitch funcionava e estava integrado, mas tinha texto escuro sobre o azul noturno, com contraste insuficiente até para quem não tem deficiência visual. A IA gerou a estrutura certa e não percebeu o contraste naquele contexto visual.",
    "<b>Prompt proporcional ao problema:</b> correção pontual não pede um System Prompt complexo; basta uma instrução direta e específica. O pedido da aula: há problema de acessibilidade, o texto está escuro, o fundo é azul noturno, usar a variável de texto claro do design system. Em vez de uma cor qualquer, usa-se um token existente, preservando a consistência.",
    "<b>Front-end exige mais revisão visual que back-end:</b> no back-end muita coisa se valida com testes unitários, de integração, contratos e asserts. No front-end muitos problemas só aparecem visualmente: alinhamento, responsividade, contraste, overflow, espaçamento, adaptação mobile e experiência de navegação. Por isso o Chrome DevTools (simulação de dispositivos móveis) continua essencial.",
    "<b>Caso 2, mobile:</b> dois problemas abaixo de 600px: a lista horizontal do histórico espremia os valores e o menu lateral esmagava a interface principal. O prompt: abaixo de 600px, transformar o item em coluna (<code>flex-direction</code>), esconder o menu lateral, criar um menu colapsável com Signal, botão hambúrguer com Material Symbols.",
    "<b>O que o agente fez:</b> leu <code>app.ts</code>, <code>app.html</code> e o CSS do histórico; criou o Signal <code>isMenuOpen</code>, o botão hambúrguer e a lógica de abrir e fechar; aplicou media queries abaixo de 600px. Mas usou um número mágico no CSS, o que mostra que a revisão arquitetural (aderência ao design system, reuso de tokens) continua necessária.",
    "<b>Princípio de fechamento:</b> a IA elimina parte do trabalho operacional, não o trabalho crítico. O profissional valida UX, comportamento, inconsistências, responsividade e qualidade."
   ],
   "como": [
    "Abrir o resultado e olhar contraste e legibilidade; abrir o DevTools no modo dispositivo e olhar telas pequenas.",
    "Escrever um prompt curto com o arquivo, o sintoma, o critério (por exemplo, abaixo de 600px) e o token a usar.",
    "Conferir o diff: o agente alterou só o que foi pedido? Houve número mágico? Tokens reaproveitados?",
    "Testar de novo no DevTools, incluindo o menu mobile, e checar que a correção não gerou regressão em outras telas."
   ],
   "aplica": [
    "Auditar telas geradas por agente com DevTools antes do PR.",
    "Corrigir problemas de contraste usando os tokens já existentes.",
    "Fazer ajustes de responsividade com prompts curtos e específicos.",
    "A live de 28/07 aprofunda a revisão visual com a skill <code>cdp</code> (desktop, tablet e mobile) e a segurança com Lagune: <a href=\"#D5-16\">Live Safer</a>. A live de 30/09 estende a revisão a performance (LCP, INP) e SEO: <a href=\"#D5-17\">Live SEO, GEO e AEO</a>."
   ],
   "pros": [
    "Correções rápidas e localizadas, com o agente já conhecendo os arquivos.",
    "Reaproveitar tokens mantém a consistência visual."
   ],
   "contras": [
    "A IA não percebe sozinha problemas visuais de contexto (contraste, espremido, overflow).",
    "Correções soltas podem introduzir números mágicos e regressões em outras partes."
   ],
   "traps": [
    "Achar que o agente gerou, portanto terminou.",
    "Pedir «use uma cor mais clara» em vez de apontar o token do design system.",
    "Validar só no desktop.",
    "Aceitar o valor fixo que o agente colocou no CSS sem checar se existe token equivalente."
   ],
   "cola": [
    [
     "Contraste",
     "Diferença de luminosidade entre texto e fundo, essencial para legibilidade"
    ],
    [
     "Media query",
     "Regra CSS condicional por largura de tela (<code>max-width: 600px</code>)"
    ],
    [
     "Número mágico",
     "Valor fixo no CSS sem token ou justificativa"
    ],
    [
     "DevTools",
     "Ferramentas do Chrome, incluindo a simulação de dispositivos"
    ],
    [
     "Menu hambúrguer",
     "Botão que abre e fecha a navegação em telas pequenas"
    ],
    [
     "Signal",
     "Estado reativo do Angular (aqui, <code>isMenuOpen</code>)"
    ]
   ],
   "links": [
    [
     "Repositório oficial: pix-app (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-02/pix-app",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app",
     "resumo": "O prompt das correções está em <code>prompts/correcao_css.md</code>, mas o estado do repositório só reflete uma parte do que a aula mostra.",
     "fluxo": [
      "<code>prompts/correcao_css.md</code> reúne os dois pedidos: responsividade abaixo de 600px (histórico em coluna e menu lateral colapsável com Signal <code>isMenuOpen</code> e botão hambúrguer do Material Symbols) e acessibilidade do comprovante (aplicar <code>var(--color-text-light)</code> para dar contraste sobre o azul noturno).",
      "<code>pix-history/pix-history.component.css</code> tem o <code>@media (max-width: 600px)</code>: <code>flex-direction: column</code> no item, <code>align-items: flex-start</code> e <code>margin-left: 36px</code> no valor. O <code>36px</code> provavelmente é o ícone (24px) mais o gap (12px); é o número mágico mais visível (hipótese).",
      "Não há <code>isMenuOpen</code>, botão hambúrguer nem media query em <code>app.ts</code>, <code>app.html</code> e <code>app.css</code>: o menu colapsável da aula não está no repositório.",
      "<code>--color-text-light</code> não existe em <code>styles.css</code> e <code>pix-receipt.css</code> não o usa; o comprovante usa <code>--color-text</code> sobre <code>--color-background</code>. O estado final do repo não bate com o que a aula descreve (hipótese: o componente foi regenerado depois, ou a correção ficou fora do commit)."
     ],
     "rodar": [
      "<code>npm start</code>, abra o DevTools (modo dispositivo) e reduza a largura abaixo de 600px em <code>/extrato</code>.",
      "Em <code>/pix</code> envie um valor válido e inspecione o contraste do comprovante."
     ],
     "armadilhas": [
      "O prompt de <code>correcao_css.md</code> mistura dois pedidos independentes num arquivo e cita um token (<code>--color-text-light</code>) que o design system do repo não declara.",
      "Com o menu ausente, a navegação lateral segue ocupando largura fixa em telas pequenas: o problema 2 da aula continua aberto no repo.",
      "O contraste dos links do menu (invisíveis no tema claro, ver tópico anterior) é do mesmo tipo de bug que esta aula ensina a caçar."
     ]
    }
   ]
  },
  {
   "id": "D5-16",
   "bloco": "d05-b1",
   "mod": "Live · 28/07/2026",
   "emoji": "🔐",
   "read": "9 min",
   "title": "Live Safer: skills de agente, MCP e Lagune no fluxo de uma landing page",
   "short": "Uma landing page fictícia vira laboratório de UX e DX com IA: skills de convenção e UI, MCPs, loop de revisão visual e segurança com Lagune.",
   "oneliner": "A live <b>Safer</b> monta, em React + TypeScript + Vite + Tailwind, uma landing page fictícia para ensinar <b>UX e DX com IA</b>: o agente recebe <b>skills</b> (engineering, ui, cdp, writer), <b>MCPs</b> (Context7, Magnific) e o <b>Lagune</b> para levar a segurança do levantamento de riscos à verificação das correções.",
   "vovo": [
    "Imagine contratar uma equipe para montar uma loja a partir de uma foto de inspiração. Você não entrega só a foto: entrega o manual de obra (convenções de código), o guia de acabamento (detalhes visuais), um inspetor que olha a loja pronta em três tamanhos de tela e um engenheiro de segurança que lista os riscos antes e confere as correções depois.",
    "O agente de IA é a equipe. As skills são esses manuais e inspetores em forma de arquivo, e o PRD é o pedido da obra, com o que construir e como revisar."
   ],
   "oque": [
    "<b>O projeto:</b> a Safer é uma landing page fictícia criada para ensinar UX e DX de forma simplificada com IA, em React, TypeScript, Vite e Tailwind, todos na versão <code>latest</code>. No PRD, o nome troca o «Sentry» da imagem de inspiração por <b>Safer</b>. A página é gerada ao vivo a partir do PRD: o repositório da live traz só a configuração e os prompts.",
    "<b>Agente intercambiável:</b> os exemplos usam o Claude Code, mas o README diz que dá para usar outros agentes, trocando o identificador do agente (cada CLI tem a sua lista de agentes suportados, em lagune.ai/docs/supported-agents e no README do skills.sh).",
    "<b>Lagune:</b> segundo o README, reforça a segurança dentro do fluxo de desenvolvimento de ponta a ponta, guiando o agente do levantamento de riscos até a verificação das correções aplicadas. Aqui usa as especializações <code>owasp</code> e <code>javascript</code> (<code>npx -y lagune@latest init claude --skills owasp javascript</code>); quem clona um projeto já configurado roda <code>npx -y lagune@latest pull</code>. A live de SEO do mesmo curso descreve o fluxo do Lagune em cinco passos: Charter, Detect, Plan, Harden e Verify (<a href=\"#D5-17\">tópico da live de SEO, GEO e AEO</a>).",
    "<b>Especialização sob medida:</b> o primeiro prompt pede <code>/lagune.specialize</code> uma especialização chamada <code>react</code>, para vulnerabilidades comuns de React, Vite e JavaScript no navegador (DOM e Virtual DOM), onde a segurança é subestimada por «ser só frontend». As tags são Vite, DOM, Virtual DOM e JSX, e o prompt manda usar a skill <code>/writer</code> para uma escrita clara e objetiva.",
    "<b>Políticas de segurança:</b> o segundo prompt, <code>/lagune.charter</code>, entende o escopo do projeto a partir do <code>@PRD.md</code> e estende o conhecimento ao <code>@.lagune/skills/react.md</code> (a especialização gerada no passo anterior).",
    "<b>Skills de wellwelwel/skills:</b> <code>engineering</code> (convenções de código, tipos, testes e mensagens de commit), <code>ui</code> (detalhes visuais e de interação que fazem a interface parecer acabada), <code>cdp</code> (verificação do que o navegador realmente renderiza, via Chrome DevTools) e <code>writer</code> (como a prosa do projeto é escrita e revisada). Instalação: <code>npx skills@latest add wellwelwel/skills --agent claude-code --skill engineering ui cdp writer -y</code>.",
    "<b>PRD como prompt de construção:</b> pede para se basear na imagem de inspiração (<code>resources/inspiration.webp</code>) e usar React + TypeScript com Vite e Tailwind. Ferramentas: MCP <b>Context7</b> para documentação atualizada e MCP <b>Magnific</b> para gerar imagens conforme necessário. Skill <code>/engineering</code> para boas práticas e DX, com desacoplamento inteligente entre componentes e separação entre UI e lógica de negócio (hooks, context). Skill <code>/ui</code> para equilibrar visual e experiência: toda transição suave e toda interação com feedback visual.",
    "<b>Loop de revisão:</b> o PRD fecha com a skill <code>/cdp</code> para comparar visualmente a landing page com a referência, testando desktop, tablet e mobile, e com a skill <code>/lagune</code> para garantir a segurança do projeto de ponta a ponta.",
    "<b>Regras do repositório (CLAUDE.md):</b> o PRD diz o que e como construir, o README diz como preparar o ambiente. Antes de dar uma mudança por concluída, rodar <code>lint</code> e <code>typecheck</code>; o Prettier é dono da formatação, então nunca formatar à mão. O <code>AGENTS.md</code> e o <code>.github/copilot-instructions.md</code> são links simbólicos para o mesmo <code>CLAUDE.md</code>, então outros agentes leem a mesma instrução."
   ],
   "como": [
    "Instalar dependências (<code>npm ci</code> e <code>npx -y playwright install chromium</code>).",
    "Preparar o agente: <code>lagune init</code> com as especializações <code>owasp</code> e <code>javascript</code> e <code>skills add</code> com as quatro skills.",
    "Prompt 1: gerar a especialização <code>react</code> com <code>/lagune.specialize</code>.",
    "Prompt 2: gerar as políticas de segurança com <code>/lagune.charter</code>, lendo o PRD e a especialização.",
    "Prompt do PRD: construir a landing page com as skills e os MCPs listados.",
    "Loop de revisão: <code>/cdp</code> compara com a referência em três resoluções e <code>/lagune</code> verifica a segurança; ajustar e repetir até <code>lint</code> e <code>typecheck</code> passarem."
   ],
   "aplica": [
    "Registrar o PRD, as skills e as regras do agente (<code>CLAUDE.md</code>) no repositório, para o resultado não depender de quem digitou o prompt.",
    "Tornar a segurança parte do fluxo desde o escopo, em vez de uma auditoria no fim: charter antes do código, verificação depois.",
    "Usar uma imagem de referência e uma checagem visual automatizada em desktop, tablet e mobile para fechar o loop de UI, em vez de confiar só no que o agente diz que fez.",
    "Ligar com o que a disciplina mostra antes: <a href=\"#D5-03\">MCP no ambiente do agente</a>, <a href=\"#D5-06\">revisão visual do que a IA gerou</a> e <a href=\"#D5-08\">skills em Markdown como Prompt as Code</a>. Do lado de segurança, o OWASP aparece na <a href=\"#D10-07\">Disciplina 10</a>."
   ],
   "pros": [
    "Skills e regras versionadas deixam o comportamento do agente transparente e repetível entre pessoas e entre agentes.",
    "O loop de revisão visual (cdp) e de segurança (Lagune) dá critério de validação ao agente, em vez de deixar o julgamento só para o fim.",
    "A especialização gerada sob medida cobre o ponto cego de segurança do frontend."
   ],
   "contras": [
    "O repositório da live não traz o código da landing page nem a saída do agente, só configuração e prompts: o que o agente de fato gerou não pode ser estudado ali.",
    "Depende de ferramentas externas e recentes (Lagune, skills, MCPs Context7 e Magnific), instaladas com <code>@latest</code>: o comportamento pode mudar sem aviso.",
    "A live descreve os comandos e o fluxo, mas o repositório não mostra resultados de segurança nem a verificação dos achados (não verifiquei o Lagune rodando)."
   ],
   "traps": [
    "Rodar <code>npx -y ...@latest</code> e <code>skills add ... -y</code> sem fixar versão nem ler o que será instalado: código remoto roda no seu projeto. Esta é uma observação minha de supply chain, não algo dito na live.",
    "Tratar o PRD como suficiente sem o loop de revisão: o PRD termina com o loop (cdp e Lagune) como etapa obrigatória; a leitura de que isso existe porque o agente não percebe sozinho o que o navegador renderiza é inferência minha.",
    "Achar que «é só frontend» dispensa segurança: foi o argumento do prompt de especialização.",
    "Confundir a especialização <code>react</code> (gerada por prompt, fica em <code>.lagune/skills/react.md</code>) com as especializações <code>owasp</code> e <code>javascript</code> do <code>init</code>."
   ],
   "tip": "A live aprofunda, no tema UX e DX, o que os tópicos de MCP, revisão visual e skills mostram: o repositório é pequeno e vale ler os dois prompts, o PRD e o CLAUDE.md na ordem em que são usados.",
   "cola": [
    [
     "Lagune",
     "Ferramenta que guia o agente de IA em segurança, do levantamento de riscos à verificação das correções; usa especializações (skills de segurança) por stack"
    ],
    [
     "Especialização",
     "Conjunto de conhecimento de segurança para uma stack (<code>owasp</code>, <code>javascript</code>, <code>react</code>), instalado no agente"
    ],
    [
     "/lagune.specialize",
     "Prompt que gera uma especialização nova (aqui, <code>react</code>)"
    ],
    [
     "/lagune.charter",
     "Prompt que define as políticas de segurança do projeto a partir do PRD"
    ],
    [
     "skills.sh",
     "CLI (<code>npx skills</code>) que instala skills de agente a partir de um repositório"
    ],
    [
     "engineering / ui / cdp / writer",
     "Skills de convenção de código, acabamento de UI, verificação via Chrome DevTools e escrita"
    ],
    [
     "Context7",
     "MCP de documentação atualizada de bibliotecas"
    ],
    [
     "Magnific",
     "MCP de geração de imagens"
    ],
    [
     "PRD",
     "Documento com o que e como construir, usado como prompt de construção"
    ],
    [
     "DX",
     "Developer Experience: a experiência de quem desenvolve (convenções, desacoplamento, lint, typecheck)"
    ]
   ],
   "links": [
    [
     "Live Safer no repositório do curso (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-07-28"
    ],
    [
     "Lagune",
     "https://lagune.ai"
    ],
    [
     "Lagune: agentes suportados",
     "https://lagune.ai/docs/supported-agents"
    ],
    [
     "skills.sh: agentes suportados",
     "https://github.com/vercel-labs/skills#supported-agents"
    ],
    [
     "wellwelwel/skills",
     "https://github.com/wellwelwel/skills"
    ],
    [
     "Context7 (llms.txt)",
     "https://context7.com/llms.txt"
    ],
    [
     "Magnific (MCP)",
     "https://docs.magnific.com/modelcontextprotocol.md"
    ]
   ],
   "codigo": [
    {
     "proj": "lives/2026-07-28 (Safer)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-07-28",
     "resumo": "Estado «pré-live» do projeto: só configuração, PRD e prompts. Não há <code>src/</code>, <code>vite.config</code>, <code>tsconfig</code> nem código React; a landing page nasce dos prompts durante a live. Também não há slides.",
     "fluxo": [
      "<code>README.md</code> descreve a instalação (<code>npm ci</code>, <code>npx -y playwright install chromium</code>), a preparação do Lagune (<code>init claude --skills owasp javascript</code>, <code>pull</code> depois de clonar) e das skills (<code>engineering ui cdp writer</code>), e aponta os prompts em ordem de execução.",
      "<code>resources/prompts.md</code> tem dois prompts: <code>/lagune.specialize</code> (cria a especialização <code>react</code> com as tags Vite, DOM, Virtual DOM e JSX, usando <code>/writer</code>) e <code>/lagune.charter</code> (escopo pelo <code>@PRD.md</code>, conhecimento estendido a <code>@.lagune/skills/react.md</code>).",
      "<code>PRD.md</code> é o prompt de construção: imagem de inspiração <code>resources/inspiration.webp</code>, stack, MCPs Context7 e Magnific, skills <code>/engineering</code> e <code>/ui</code>, e o loop de revisão com <code>/cdp</code> (desktop, tablet e mobile) e <code>/lagune</code>.",
      "<code>CLAUDE.md</code> fixa as regras do agente (scripts <code>lint</code>, <code>lint:fix</code> e <code>typecheck</code>; rodar lint e typecheck antes de concluir; Prettier manda na formatação). <code>AGENTS.md</code> e <code>.github/copilot-instructions.md</code> são links simbólicos para ele.",
      "<code>package.json</code> traz só devDependencies: <code>prettier</code>, <code>@ianvs/prettier-plugin-sort-imports</code>, <code>playwright</code>, <code>tsx</code> e <code>@types/node</code>."
     ],
     "rodar": [
      "<code>npm ci</code> e <code>npx -y playwright install chromium</code>.",
      "<code>npx -y lagune@latest init claude --skills owasp javascript</code> e <code>npx skills@latest add wellwelwel/skills --agent claude-code --skill engineering ui cdp writer -y</code> (não executei: dependem do agente e de pacotes remotos).",
      "Depois, colar os prompts de <code>resources/prompts.md</code> e o <code>PRD.md</code> no agente, nessa ordem."
     ],
     "armadilhas": [
      "<code>npm run typecheck</code> roda <code>tsc --noEmit</code>, mas o <code>package.json</code> não declara <code>typescript</code> (o <code>package-lock.json</code> também não tem <code>node_modules/typescript</code>) e não há <code>tsconfig.json</code>. Como está, o script provavelmente só passa depois que o scaffold do Vite trouxer o TypeScript; o <code>CLAUDE.md</code> já exige o typecheck antes de concluir.",
      "Não há arquivo de configuração do Prettier (nem <code>.prettierrc</code> nem chave <code>prettier</code> no <code>package.json</code>), então o plugin <code>@ianvs/prettier-plugin-sort-imports</code> instalado não é carregado por nenhuma config do repositório. Hipótese: a config vem junto com o scaffold ou com a skill <code>engineering</code>.",
      "O <code>tsx</code> está instalado, mas nenhum script o usa. O papel do Playwright também não é documentado: o README liga a skill <code>cdp</code> ao Chrome DevTools; que o <code>cdp</code> use o Playwright é hipótese minha.",
      "O README instala o Lagune com <code>--skills owasp javascript</code>, e o PRD manda usar <code>/lagune</code>; a especialização <code>react</code> usada no <code>charter</code> só existe depois do prompt <code>/lagune.specialize</code> (ordem importa).",
      "O PRD cita a skill <code>/writer</code> apenas no prompt de especialização; no resto do fluxo ela não é chamada."
     ]
    }
   ]
  },
  {
   "id": "D5-07",
   "bloco": "d05-b2",
   "mod": "Unidade 3 · Aula 1",
   "emoji": "🏗️",
   "read": "7 min",
   "title": "Fundação enterprise: Nx, shared-types e MCP",
   "short": "Monorepo Nx com Angular, NestJS e uma biblioteca de contratos compartilhados, preparado para agentes.",
   "oneliner": "Um <b>monorepo Nx</b> (Angular + NestJS + biblioteca de tipos) dá ao agente a visão do sistema inteiro e elimina contratos duplicados entre front e back; <b>monorepo não é monólito</b>: um é organização de código, o outro é arquitetura de deploy.",
   "vovo": [
    "Imagine duas equipes que moram em casas diferentes e conversam por bilhetes: a cozinha escreve «prato: nome, preço» e o salão entende «item: título, valor». Cedo ou tarde alguém muda um bilhete e o outro lado não sabe. Agora imagine as duas equipes no mesmo prédio, com um quadro de avisos único afixado no corredor: quando o cardápio muda, muda para todos.",
    "O monorepo é o prédio; a biblioteca de tipos compartilhados é o quadro de avisos. E o agente, que enxerga o prédio inteiro, erra menos do que se visse só uma casa."
   ],
   "oque": [
    "<b>Mudança de cenário:</b> da unidade 2 para um cenário enterprise, com front, back, contratos compartilhados e execução integrada. O laboratório é uma plataforma de Call for Papers para eventos: cadastro de palestrantes, submissão de propostas, regras de negócio, telas administrativas e APIs.",
    "<b>Stack:</b> Angular no front e NestJS no back (framework de back-end Node para APIs estruturadas; não confundir com Next.js). A aula reforça que o ponto é o modo de trabalhar, não decorar ferramenta: poderia ser React, Java, Python, Spring Boot ou Quarkus.",
    "<b>Monorepo versus monólito:</b> monorepo é estratégia de organização de código e desenvolvimento (vários projetos no mesmo repositório; o Google é o exemplo clássico); monólito é estratégia arquitetural ou de deploy. Dá para ter um monorepo com aplicações independentes, empacotadas e escaladas separadamente, e um monólito em vários repositórios.",
    "<b>Nx:</b> open source (MIT), gerencia múltiplas aplicações, bibliotecas, dependências, execução, testes e build num workspace, com cache, análise de dependências e integração com Nx Cloud para CI/CD. Executa vários targets ao mesmo tempo, em vez de vários terminais manuais.",
    "<b>Contrato compartilhado:</b> em repositórios separados, DTOs do back acabam duplicados no front e divergem (campo muda de um lado e não do outro). Uma biblioteca compartilhada define o contrato em um só lugar. Exemplo da aula: interface Speaker com identificador, nome, e-mail, título da palestra e flag GDE, consumida por front e back.",
    "<b>Montagem:</b> criar o workspace Nx (inicializa Git e estrutura), instalar plugins de Angular, NestJS e JS/TS, criar a aplicação Angular (CSS puro, roteamento, standalone, TypeScript strict, Vitest e Playwright), a aplicação NestJS (ESLint e Jest) e a biblioteca de tipos.",
    "<b>MCP do Nx:</b> dá ao agente um servidor especializado que entende projetos, targets, bibliotecas e boas práticas do Nx. Menos tentativa e erro, menos comando inventado e menos consumo de tokens: IA tem custo, mesmo parecendo gratuita no ambiente.",
    "<b>Primeira tarefa controlada:</b> criar o DTO Speaker na biblioteca compartilhada, consultando o MCP do Nx, mapeando os projetos e declarando que não deve modificar front nem API. O agente apresenta o plano (criar a interface, exportá-la no ponto público da biblioteca, validar com comandos do Nx), o dev revisa e autoriza, e o resultado é commitado: commits pequenos, atômicos e descritivos continuam valendo."
   ],
   "como": [
    "Workspace: um repositório, três projetos (front, API, tipos), um comando de execução integrada.",
    "Contrato primeiro: a interface mora na biblioteca e é exportada pelo ponto público; front e API importam do mesmo alias.",
    "Agente com MCP: pedir sempre escopo explícito («não modifique os apps»), conferir o plano, só então autorizar.",
    "Fechar com commit pequeno revisado, como em qualquer feature feita à mão."
   ],
   "aplica": [
    "Qualquer produto com front e back em TypeScript que sofra com DTO duplicado.",
    "Preparar um workspace para trabalho com agentes: contexto estruturado, comandos padronizados, MCP do build tool."
   ],
   "pros": [
    "Um contrato, vários consumidores: menos divergência e menos bug difícil de rastrear.",
    "Execução, teste e build orquestrados pelo Nx, com cache e análise de dependência.",
    "O agente vê front, back e contratos e acerta mais."
   ],
   "contras": [
    "Curva de aprendizado e configuração do Nx e dos plugins.",
    "Acoplamento: mudar o contrato afeta todos os consumidores ao mesmo tempo."
   ],
   "traps": [
    "Chamar monorepo de monólito, ou o contrário.",
    "Deixar o agente sem escopo em base com vários projetos.",
    "Colocar contratos duplicados «por enquanto» no front."
   ],
   "cola": [
    [
     "Monorepo",
     "Vários projetos no mesmo repositório; organização de código, não de deploy"
    ],
    [
     "Monólito",
     "Estratégia arquitetural ou de deploy em uma única unidade"
    ],
    [
     "Nx",
     "Ferramenta de monorepo: targets, cache, grafo de dependências, plugins"
    ],
    [
     "NestJS",
     "Framework Node para APIs estruturadas (não é Next.js)"
    ],
    [
     "shared-types",
     "Biblioteca de interfaces e DTOs usada por front e back"
    ],
    [
     "Target",
     "Tarefa de um projeto Nx (build, serve, test, lint)"
    ],
    [
     "GDE",
     "Google Developer Expert, campo do contrato SpeakerDTO"
    ]
   ],
   "links": [
    [
     "Repositório oficial: cfp-platform (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform"
    ],
    [
     "Nx",
     "https://nx.dev"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-03/cfp-platform",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform",
     "resumo": "Workspace Nx 22.6.3 com <code>frontend</code> (Angular 21.2, Vitest), <code>api</code> (NestJS 11, Jest, webpack), <code>shared-types</code> (biblioteca esbuild), <code>frontend-e2e</code> (Playwright) e <code>api-e2e</code> (Jest com axios). O alias <code>@cfp-platform/shared-types</code> está em <code>tsconfig.base.json</code>.",
     "fluxo": [
      "<code>shared-types/src/index.ts</code> reexporta <code>speaker.dto</code>, <code>event.dto</code> e o placeholder <code>shared-types.ts</code> (função <code>sharedTypes()</code> gerada pelo Nx). <code>SpeakerDTO</code> tem <code>id</code>, <code>name</code>, <code>email</code>, <code>talkTitle</code> e <code>isGDE</code>; <code>EventDTO</code> (adicionado depois, no tópico do Jules) tem <code>id</code>, <code>nome</code>, <code>endereco</code>, <code>capacidade</code> e <code>data</code>.",
      "<code>api/src/main.ts</code> sobe o Nest com prefixo global <code>api</code> e porta <code>PORT</code> ou 3000; <code>api/webpack.config.js</code> usa o <code>NxAppWebpackPlugin</code>.",
      "<code>frontend/project.json</code>: o target <code>serve</code> tem <code>dependsOn: [\"api:serve\"]</code> e <code>proxyConfig</code> apontando <code>/api</code> para <code>http://localhost:3000</code> (<code>frontend/proxy.conf.json</code>). Um comando sobe os dois.",
      "<code>nx.json</code>: plugins do Playwright, ESLint, webpack e Jest; geradores do Angular com <code>vitest-angular</code> e Playwright. <code>.vscode/launch.json</code> traz a configuração de debug da API com <code>--inspect=9229</code>."
     ],
     "rodar": [
      "<code>npm install</code> (veja o aviso abaixo sobre <code>npm ci</code>) e <code>npx nx serve frontend</code>: sobe API e front, em http://localhost:4200.",
      "<code>npx nx run-many -t test</code>: verifiquei que passam <code>shared-types</code> (1 teste), <code>api</code> (5) e <code>frontend</code> (4). <code>npx nx build api</code> também compilou."
     ],
     "armadilhas": [
      "Verifiquei que <code>npm ci</code> falha neste projeto (Node 20.19, npm 10.8): o <code>package-lock.json</code> está fora de sincronia com o <code>package.json</code> (versões de <code>@swc/helpers</code> e <code>@emnapi/*</code> e pacotes ausentes como <code>@rspack/core</code>). <code>npm install</code> funcionou.",
      "O README é o texto padrão do Nx; a configuração do MCP do Nx não está no repositório (não há <code>.vscode/mcp.json</code> aqui): na aula ela é feita na IDE.",
      "O contrato de evento usa português (<code>nome</code>, <code>endereco</code>, <code>capacidade</code>, <code>data</code>) enquanto o de palestrante usa inglês: não há padrão de idioma.",
      "<code>shared-types.ts</code> e seu spec são o placeholder gerado pelo Nx, sem uso real."
     ]
    }
   ]
  },
  {
   "id": "D5-08",
   "bloco": "d05-b2",
   "mod": "Unidade 3 · Aula 2",
   "emoji": "📐",
   "read": "8 min",
   "title": "Spec-Driven Development com OpenSpec",
   "short": "A especificação vira o artefato central: proposal, design e tasks guiam o agente e deixam rastro versionado.",
   "oneliner": "Em vez de pedir código direto, o <b>Spec-Driven Development</b> cria primeiro uma especificação estruturada; o <b>OpenSpec</b> faz isso com <b>arquivos Markdown que funcionam como System Prompts</b> (skills) e gera <b>proposal, design e tasks</b>, inclusive dizendo o que não fazer.",
   "vovo": [
    "Pedir «crie um sistema de eventos técnicos» a um agente é como dizer a uma construtora «faça uma casa». Ela vai preencher as lacunas com as próprias suposições: quantos quartos, que material, onde fica a cozinha. Quanto mais lacunas, mais surpresas e mais retrabalho.",
    "A especificação é a planta aprovada, com a lista de serviços e a lista do que não deve ser feito (não construir piscina). O OpenSpec é o caderno de modelos de planta que o agente recebe: sem magia, só papel bem organizado."
   ],
   "oque": [
    "<b>O problema:</b> a falsa sensação de que uma frase simples gera um sistema correto. Quanto mais espaço para interpretação, mais alucinação, inconsistência arquitetural, retrabalho, desperdício de tokens, decisões erradas, requisitos implícitos e código desalinhado. Prompts estruturados (papel, regras, objetivo, formato) funcionam bem para tarefas pequenas, como um componente, um modal ou um DTO; features completas exigem mais.",
    "<b>Spec-Driven Development (SDD):</b> desenvolvimento guiado por especificações. A especificação, antes tratada como secundária no ágil («o código é a documentação»), volta a ser central porque agora se orientam agentes. Ela deixa de ser só documentação humana e vira contrato operacional entre pessoas e agentes, com ganho de assertividade, velocidade, qualidade, consistência e economia de tokens.",
    "<b>Ferramentas:</b> SpecKit, Kiro e OpenSpec compartilham a ideia de gerar artefatos estruturados que servem de base para os agentes. A aula usa o OpenSpec: open source, criado pela comunidade e agnóstico de fornecedor.",
    "<b>Sem mágica:</b> o OpenSpec instala um conjunto de skills em Markdown no projeto (exploração, proposta, design, aplicação, tasks), cada uma orientando o agente num contexto. É Prompt as Code: o comportamento do agente fica transparente, auditável e editável, e funciona com Antigravity, Claude, Codex, Cursor, Copilot e outros.",
    "<b>Explore:</b> um comando especial pede ao agente que mapeie o monorepo e gere um resumo da topologia (usando MCP do Nx, MCP do Angular e a estrutura do workspace), com diagramas ASCII. Útil como onboarding em projeto grande com documentação desatualizada.",
    "<b>A spec da feature:</b> módulo de submissão de palestras (Call for Papers). O prompt define objetivo, regras arquiteturais, frameworks, uso obrigatório de standalone components, Signals e acessibilidade ARIA, NestJS, compartilhamento do SpeakerDTO e obrigatoriedade de testes. E, importante, o que não fazer (criar autenticação, upload, banco desnecessário, regras não solicitadas), porque sem isso o agente inventa requisitos.",
    "<b>Três artefatos:</b> <code>proposal.md</code> (o quê e por quê: problema, objetivo, impacto, capacidades), <code>design.md</code> (como: decisões arquiteturais, requisitos funcionais e não funcionais, limitações, escolhas técnicas) e <code>tasks.md</code> (plano operacional dividido em back-end, front-end, integração e testes).",
    "<b>Revisão e versionamento:</b> os artefatos são uma primeira versão acelerada; o dev valida, revisa a arquitetura, completa regras e corrige lacunas. Depois são versionados no repositório: decisões revisáveis, specs novas, mudanças incrementais.",
    "<b>Mensagem da aula:</b> a IA não elimina engenharia de requisitos, aumenta a importância dela."
   ],
   "como": [
    "Instalar o OpenSpec no projeto para o agente escolhido (ele adapta os prompts ao agente).",
    "Explore: mapear o monorepo.",
    "Propose: escrever o prompt da feature com objetivos, regras e o que não fazer; o agente cria a mudança e os três artefatos.",
    "Revisar e ajustar proposal, design e tasks; só então implementar (próximo tópico)."
   ],
   "aplica": [
    "Features que cruzam front, back, contratos, validação, testes e acessibilidade.",
    "Entrada de pessoas novas num projeto grande: o explore gera o mapa.",
    "Qualquer time que queira rastreabilidade de por que algo foi construído daquele jeito.",
    "A live de 28/07 usa skills em Markdown (<code>engineering</code>, <code>ui</code>, <code>cdp</code>, <code>writer</code>) e um PRD como prompt de construção: <a href=\"#D5-16\">Live Safer</a>."
   ],
   "pros": [
    "Menos interpretação, menos retrabalho e menos tokens gastos em tentativas.",
    "Decisões e requisitos ficam documentados junto ao código.",
    "Agnóstico de agente e de IDE: as skills são arquivos que você pode ler e alterar."
   ],
   "contras": [
    "Exige disciplina de revisar e manter specs, senão elas apodrecem.",
    "Spec incompleta produz agente improvisando, inclusive em UX e identidade visual."
   ],
   "traps": [
    "Prompt de uma frase para uma feature inteira.",
    "Esquecer de listar o que não deve ser feito.",
    "Aprovar proposal, design e tasks sem ler."
   ],
   "cola": [
    [
     "SDD",
     "Spec-Driven Development: a spec guia a implementação"
    ],
    [
     "OpenSpec",
     "Ferramenta open source de SDD, agnóstica de agente"
    ],
    [
     "proposal.md",
     "O quê e por quê da mudança"
    ],
    [
     "design.md",
     "Como: decisões arquiteturais, requisitos, limitações"
    ],
    [
     "tasks.md",
     "Plano de implementação com checkboxes"
    ],
    [
     "Skill",
     "Arquivo Markdown de instruções que o agente carrega para um tipo de tarefa"
    ],
    [
     "Delta spec",
     "Spec de uma mudança, que depois é sincronizada com as specs principais"
    ]
   ],
   "links": [
    [
     "Repositório oficial: cfp-platform (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform"
    ],
    [
     "OpenSpec",
     "https://openspec.dev/"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-03/cfp-platform (openspec e .agent)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform",
     "resumo": "Os arquivos do OpenSpec na raiz do workspace: skills e workflows instalados em <code>.agent/</code> e as specs e mudanças em <code>openspec/</code>.",
     "fluxo": [
      "<code>.agent/skills/openspec-explore</code>, <code>-propose</code>, <code>-apply-change</code> e <code>-archive-change</code> (<code>SKILL.md</code> com <code>generatedBy: \"1.2.0\"</code> e requisito do CLI <code>openspec</code>) e <code>.agent/workflows/opsx-explore.md</code>, <code>opsx-propose.md</code>, <code>opsx-apply.md</code> e <code>opsx-archive.md</code> (comandos <code>/opsx:*</code>).",
      "O workflow de propose cria a mudança com <code>openspec new change</code>, consulta <code>openspec status --change ... --json</code> e <code>openspec instructions &lt;artifact&gt; --json</code> e gera proposal, design e tasks em ordem de dependência. O de apply lê os arquivos de contexto, implementa as tarefas e troca <code>- [ ]</code> por <code>- [x]</code>. O de archive confere artefatos e tarefas, avalia a sincronização das delta specs e move a mudança para <code>archive/AAAA-MM-DD-nome</code>. O de explore é um modo de pensar que proíbe implementar.",
      "<code>openspec/changes/archive/2026-03-31-add-cfp-feature/</code>: <code>.openspec.yaml</code> (<code>schema: spec-driven</code>, criada em 2026-03-28), <code>proposal.md</code>, <code>design.md</code> (não-objetivos: banco persistente, autenticação, upload), <code>tasks.md</code> (1 back-end, 2 front-end, 3 integração e verificação, todas marcadas) e <code>specs/cfp-submission/spec.md</code>.",
      "Formato das specs: <code>### Requirement</code> e <code>#### Scenario</code> com <code>WHEN</code> e <code>THEN</code>, linguagem de obrigatoriedade (<code>MUST</code>, <code>SHALL</code>). A capability de submissão exige <code>POST /api/speakers</code> com validação (201 ou 400), signals iniciais, botão desabilitado em <code>loading</code> e ARIA com <code>role=\"alert\"</code>."
     ],
     "rodar": [
      "O CLI <code>openspec</code> não é dependência do projeto: instale-o à parte (veja openspec.dev) e use os comandos <code>/opsx:*</code> no agente que tiver as skills de <code>.agent/</code>.",
      "Para estudar sem rodar nada, leia na ordem proposal, design, tasks e spec da mudança arquivada."
     ],
     "armadilhas": [
      "A skill <code>openspec-archive-change</code> manda invocar a skill <code>openspec-sync-specs</code> para sincronizar as specs, mas ela não está em <code>.agent/skills/</code> (só há quatro skills); a sincronização depende de algo que não veio no repositório.",
      "A skill de apply, como escrita, não filtra tarefas por área. O «apply só de back-end e shared» que a aula 3 mostra foi, provavelmente, feito por instrução no prompt (hipótese).",
      "As specs e tasks falam em «Jest» para o front-end, mas o frontend usa Vitest (<code>@angular/build:unit-test</code>; verifiquei ao rodar os testes). Pequeno drift entre spec e implementação.",
      "<code>openspec/specs/cfp-submission/spec.md</code> manteve o cabeçalho <code>## ADDED Requirements</code> de delta spec e já incorpora o requisito «Dashboard Navigation»; <code>openspec/specs/cfp-dashboard/spec.md</code> começa com <code># Capability: CFP Dashboard</code>. Os dois arquivos principais não seguem o mesmo formato.",
      "A proposal do dashboard fala em «secure dashboard for administrators», e o design da mesma mudança declara autenticação como não-objetivo: texto e escopo não batem."
     ]
    }
   ]
  },
  {
   "id": "D5-09",
   "bloco": "d05-b2",
   "mod": "Unidade 3 · Aulas 3 e 4",
   "emoji": "🌳",
   "read": "9 min",
   "title": "Git worktree, agentes em paralelo, integração e archive",
   "short": "Dois agentes em dois worktrees executam partes da mesma spec; depois, merge, validação, archive e limpeza.",
   "oneliner": "<b>Git worktree</b> dá a cada agente um diretório físico e uma branch próprios no mesmo repositório; a <b>spec</b> é o mecanismo de orquestração (cada agente aplica uma parte); depois vem <b>integração, validação humana e archive</b>, porque gerar código é só o começo.",
   "vovo": [
    "Imagine dois pintores contratados para a mesma casa. Se os dois trabalham no mesmo cômodo ao mesmo tempo, um pisa na tinta do outro. Se cada um recebe um andar com chave própria, trabalham sem se atrapalhar, e no fim o dono confere os dois andares e junta tudo.",
    "O worktree é o andar com chave própria; a spec é a lista do que cada pintor deve fazer; e o archive é o caderno em que o dono anota o que foi feito e por quê, para o próximo contrato partir daí."
   ],
   "oque": [
    "<b>O risco do paralelo:</b> vários agentes na mesma base causam sobrescrita de arquivos, conflitos, inconsistências, mudanças acidentais, perda de contexto e problemas de merge. Precisa-se de isolamento.",
    "<b>Git worktree:</b> funcionalidade antiga do Git, pouco usada até a IA, que cria múltiplos workspaces físicos ligados ao mesmo repositório, cada um apontando para uma branch. Não é cópia do projeto: todos compartilham o mesmo banco do Git. Serve também para humanos trabalhando em contextos separados.",
    "<b>Agent Manager do Antigravity:</b> evolui do «chat integrado» para orquestração: abre vários workspaces e atribui tarefas independentes. Cada agente tem contexto, branch, workspace e tarefas próprios. Na aula, dois worktrees: API e UI.",
    "<b>Spec como mecanismo de orquestração:</b> as tasks já estavam divididas em front-end, back-end e shared types. O agente da API aplicou só back-end e shared; o do front aplicou só front-end. O prompt fica pequeno porque requisitos, arquitetura, tasks e restrições já existem na spec, o que também economiza tokens.",
    "<b>O que os agentes entregaram:</b> o front criou componente Angular, rota <code>submit-talk</code> (no repo final a tela está em <code>/talks/new</code>), integração com Signals, ARIA e mocks temporários (como em times reais, em que o front avança sem a API pronta); o back criou DTOs, validações, controllers, services e integração com class-validator.",
    "<b>Custo e modelos:</b> o agente do back falhou com o modelo Flash por limite de output. Modelos menores são mais baratos e rápidos para tarefas simples; modelos maiores têm mais contexto e raciocínio. Estratégia citada: modelos fortes para planejamento, arquitetura e raciocínio complexo, baratos para execução repetitiva.",
    "<b>Validação e lacunas de spec:</b> o Antigravity rodou testes, abriu navegador e verificou rotas, mas o agente criou o design visual por conta própria, porque a spec não detalhava UX e identidade visual. Se quiser controle fino, a spec precisa trazer Figma, tokens, layout e padrões de design. O papel do dev vira o de arquiteto, orquestrador, revisor, integrador e validador.",
    "<b>Integração (aula 4):</b> geração é só o começo. Criou-se uma branch de integração (Integrate CFP Feature) e fez-se o merge das duas branches: para o Git, worktrees são branches normais, então merge, commit e revisão seguem como sempre. Subiu-se front e back, fez-se uma submissão e validou-se o fluxo completo: código que compila não é feature pronta.",
    "<b>Archive:</b> a spec vira baseline histórica; futuras specs consideram requisitos, arquitetura, decisões e padrões anteriores. Git versiona arquivos e sabe o que mudou; OpenSpec versiona contexto semântico e sabe por quê. A spec gera o código, o código atualiza a spec e a spec arquivada alimenta as próximas.",
    "<b>Segunda feature, dashboard:</b> em vez de «crie uma tela de dashboard», especificou-se rota GET no NestJS retornando <code>SpeakerDTO</code>, componente Angular com HttpClient e Signals, identidade visual, tokens e navegação. O agente consultou os MCPs do Angular e do Nx e percebeu sozinho que precisava extrair tokens do formulário original, graças ao contexto acumulado (specs arquivadas, design system, histórico).",
    "<b>Um agente basta quando basta:</b> o apply do dashboard usou um único agente; paralelizar é estratégia, não obrigação, e depende de complexidade, tamanho, isolamento possível, dependências e custo. O agente tentou <code>npm run test</code>, percebeu que o projeto é Nx e corrigiu os comandos; usou o navegador automatizado (preencheu formulário, submeteu, navegou ao dashboard, inspecionou o DOM, executou asserts). A aprovação final continua sendo do desenvolvedor.",
    "<b>Limpeza:</b> removem-se worktrees, branches temporárias e ambientes auxiliares para não acumular lixo operacional."
   ],
   "como": [
    "Criar um worktree por frente (API e UI), cada um com sua branch, e abri-los no Agent Manager.",
    "Aplicar à spec só as tasks de cada frente (back-end e shared num agente, front-end no outro) com um prompt curto.",
    "Aprovar o plano de cada agente, deixar executar, revisar.",
    "Voltar à branch principal, criar a branch de integração, fazer merge das duas, subir tudo e validar à mão.",
    "Arquivar a spec e remover worktrees e branches temporárias."
   ],
   "aplica": [
    "Features com front e back separáveis por contrato (o DTO compartilhado define a fronteira).",
    "Experimentos com mais de um agente ou modelo na mesma tarefa, em diretórios isolados.",
    "Manter a spec viva como memória do projeto entre features."
   ],
   "pros": [
    "Isolamento físico sem duplicar o repositório e sem mudar o fluxo de merge e revisão.",
    "A spec arquivada dá continuidade de contexto às próximas features.",
    "Prompts curtos: o contexto está na spec."
   ],
   "contras": [
    "Paralelizar custa mais (tokens e modelos) e exige integração cuidadosa.",
    "Agentes isolados tomam decisões visuais próprias se a spec for silenciosa."
   ],
   "traps": [
    "Dois agentes no mesmo diretório.",
    "Usar o mesmo modelo para planejar e para codar sem olhar custo e limite de output.",
    "Considerar pronto porque compilou, sem validar o fluxo completo.",
    "Esquecer de arquivar a spec e de limpar worktrees e branches."
   ],
   "cola": [
    [
     "Git worktree",
     "Vários diretórios de trabalho do mesmo repositório, cada um numa branch"
    ],
    [
     "Agent Manager",
     "Painel do Antigravity para atribuir tarefas a agentes em vários workspaces"
    ],
    [
     "Apply",
     "Comando do OpenSpec que implementa as tasks de uma mudança"
    ],
    [
     "Archive",
     "Move a mudança para o histórico e consolida a spec como baseline"
    ],
    [
     "Branch de integração",
     "Branch em que se juntam e validam os resultados paralelos"
    ],
    [
     "Mock temporário",
     "Dado simulado no front enquanto a API não está pronta"
    ],
    [
     "git worktree add",
     "Comando padrão do Git para criar o workspace (a apostila não mostra o comando literal)"
    ]
   ],
   "links": [
    [
     "Repositório oficial: cfp-platform (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform"
    ],
    [
     "OpenSpec",
     "https://openspec.dev/"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-03/cfp-platform (speakers, dashboard e telas)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform",
     "resumo": "O resultado das duas frentes paralelas (API de speakers e telas de submissão) e da feature seguinte (dashboard), já integradas no mesmo workspace. O repositório guarda o resultado, não os worktrees.",
     "fluxo": [
      "API: <code>api/src/app/create-speaker.dto.ts</code> (<code>implements Omit&lt;SpeakerDTO, 'id'&gt;</code> com <code>@IsNotEmpty</code>, <code>@IsString</code>, <code>@IsEmail</code> e <code>@IsBoolean</code>), <code>speaker.controller.ts</code> (<code>@Controller('speakers')</code>, <code>POST</code> com <code>ValidationPipe({ transform: true })</code> e <code>GET</code>), <code>speaker.service.ts</code> (array em memória; id por <code>Math.random().toString(36)</code>) e <code>app.module.ts</code>. O <code>speaker.controller.spec.ts</code> usa o <code>ValidationPipe</code> com <code>whitelist: true</code> e espera <code>BadRequestException</code> para payload inválido.",
      "Front, submissão: <code>cfp-submission.component.ts</code> com signals <code>name</code>, <code>email</code>, <code>talkTitle</code>, <code>isGDE</code>, <code>submissionStatus</code> (<code>'idle' | 'loading' | 'success' | 'error'</code>) e <code>errorMessage</code>; <code>submit()</code> faz <code>POST /api/speakers</code> e trata sucesso e erro. O template usa <code>[(ngModel)]</code> sobre os signals, <code>aria-labelledby</code>, <code>aria-required</code>, <code>role=\"alert\" aria-live=\"polite\"</code> e desabilita o botão em <code>loading</code>. O spec tem três testes (signals iniciais e botão bloqueado).",
      "Front, dashboard: <code>cfp-dashboard.component.ts</code> com signals <code>submissions</code>, <code>isLoading</code> e <code>error</code>; <code>ngOnInit</code> faz <code>GET /api/speakers</code>. O template alterna <code>@if</code> e <code>@else if</code> entre loading (<code>role=\"status\"</code>), erro com Retry (<code>role=\"alert\"</code>), vazio e tabela com <code>scope=\"col\"</code> e badge GDE.",
      "Navegação: <code>app.html</code> com três links (<code>routerLinkActive</code>) para <code>/event/new</code>, <code>/talks/new</code> e <code>/dashboard</code>; <code>app.routes.ts</code> com rotas lazy e redirecionamento para o dashboard; <code>provideHttpClient()</code> em <code>app.config.ts</code>.",
      "Rastro da spec: <code>openspec/changes/archive/2026-03-31-add-cfp-dashboard/</code> (proposal, design, tasks, delta specs) e as specs consolidadas em <code>openspec/specs/</code>."
     ],
     "rodar": [
      "<code>npx nx serve frontend</code> e abra <code>/talks/new</code>; envie uma proposta e confira em <code>/dashboard</code> (os dados somem ao reiniciar a API).",
      "<code>npx nx test api</code> e <code>npx nx test frontend</code> (verifiquei: 5 e 4 testes passam)."
     ],
     "armadilhas": [
      "Verifiquei contra a API compilada: <code>POST /api/speakers</code> aceita campos extras (enviei <code>x: 1</code> e ele foi armazenado e devolvido), porque o <code>ValidationPipe</code> dos controllers não usa <code>whitelist</code>; só o teste usa.",
      "A API devolve <code>message</code> como array nos erros 400 do class-validator (verifiquei); o front trata <code>err.error?.message</code> como string, então a UI mostra a lista concatenada, em inglês.",
      "As três telas copiam o mesmo CSS «glass» (473 linhas no total) com cores literais (#1c1c1e, #ff8a00, #e52e71...) e nenhum <code>var(--...)</code>. A spec do dashboard pede «reusar tokens», mas o que existe é valor copiado, não token.",
      "Mistura de idiomas na UI: submissão e dashboard em inglês, cadastro de evento em português.",
      "<code>frontend-e2e/src/example.spec.ts</code> (Playwright) é o exemplo padrão do Nx: espera um <code>h1</code> com «Welcome», que o app não tem. Não executei o Playwright; pela leitura, o teste falharia.",
      "Comentários do tipo «Task 2.2» e «Task 2.4» no componente de submissão são vestígio do <code>tasks.md</code> gerado pelo agente."
     ]
    }
   ]
  },
  {
   "id": "D5-10",
   "bloco": "d05-b2",
   "mod": "Unidade 3 · Aula 5",
   "emoji": "☁️",
   "read": "7 min",
   "title": "Google Jules: agente assíncrono em nuvem",
   "short": "Delegar uma tarefa bem delimitada a um agente que clona o repo, implementa e abre um PR para revisão.",
   "oneliner": "Agente <b>assíncrono</b> trabalha como outro desenvolvedor: sobe uma VM efêmera, clona o repo, cria branch, roda testes e <b>abre um pull request</b>; você descreve uma tarefa objetiva e revisa o PR como o de qualquer colega.",
   "vovo": [
    "Até aqui o agente era como um colega sentado ao seu lado, mexendo no seu computador: se você desliga a máquina, ele para. Agora é como contratar um freelancer remoto: você manda um briefing claro, ele trabalha na própria casa e devolve um pacote pronto para você conferir.",
    "Você não dá a ele a chave do cofre nem deixa mexer direto no que já está no ar. Ele entrega, você confere, e só então aceita."
   ],
   "oque": [
    "<b>Local versus assíncrono:</b> no fluxo local o agente depende da sua máquina, do seu ambiente e da sua sessão. No assíncrono a ferramenta sobe o próprio ambiente, clona o repositório, cria uma branch, executa a tarefa, roda testes e abre um pull request. Existem várias ferramentas (a aula cita o Devin) e usa o Google Jules.",
    "<b>Jules:</b> conecta-se ao GitHub como um GitHub App, acessa os repositórios autorizados, cria branches, altera arquivos e abre PRs; também pode partir de issues do GitHub ou de integrações como o Jira.",
    "<b>Configuração do repositório:</b> o ambiente é efêmero, então ele precisa saber como preparar o projeto. Num monorepo Node com Nx, Angular e NestJS quase nada; em projetos reais pode exigir scripts de setup, dependências, variáveis e secrets. API keys, senhas e credenciais nunca vão em script ou arquivo: ficam em secrets. O raciocínio é o do onboarding: documentar para o agente o que documentaria para uma pessoa nova.",
    "<b>A tarefa da aula:</b> cadastro de local de evento no monorepo, com papel de desenvolvedora full stack sênior. Diretrizes: manter rigorosamente design system, cores e tokens do formulário de CFP; menu com exatamente três opções (cadastro de eventos, cadastro de palestras e dashboard); novo DTO compartilhado de evento; NestJS com controller e service para receber POST e guardar em memória; Angular com Reactive Forms e Signals; criar branch, implementar e abrir PR. Em produção, poderia ser separada em tarefas menores.",
    "<b>Mudança de postura:</b> no agente local se interage, ajusta e revisa passo a passo; no assíncrono passa-se uma tarefa específica e bem descrita e se deixa o agente trabalhar. Quanto mais objetiva e delimitada, melhor o resultado.",
    "<b>Execução:</b> o Jules sobe uma VM, clona, prepara o ambiente e monta um plano (DTO, API, componente, design system, navegação, testes e PR). Durante a execução altera arquivos, roda testes e registra evidências, inclusive abrindo o navegador no ambiente e gerando imagens ou pequenos registros do teste. Ele faz uma espécie de autorrevisão, que não substitui o code review humano.",
    "<b>Revisão:</b> baixou-se a branch, rodou-se com Nx e testou-se o cadastro. Os detalhes visuais (o menu) poderiam virar comentário no PR para o Jules corrigir numa nova iteração. O agente assíncrono é tratado como outro desenvolvedor: sem permissões irrestritas para produção, para a main ou para ambientes sensíveis. O fluxo seguro é branch, pull request, revisão e merge.",
    "<b>Mensagem final:</b> não existe uma única forma de usar IA: conversação para refinar, agentes locais para pair programming, múltiplos agentes com worktree para paralelizar, agentes na nuvem para delegar. A produtividade vem de combinar com critério."
   ],
   "como": [
    "Autorizar o GitHub App no repositório certo e criar a tarefa.",
    "Escrever o prompt com papel, diretrizes obrigatórias (design system, navegação, arquitetura, DTO, teste, branch e PR).",
    "Acompanhar o plano e as evidências; esperar o PR.",
    "Revisar como PR humano: baixar a branch, rodar, testar, comentar, pedir ajustes ou aprovar e fazer merge."
   ],
   "aplica": [
    "Features pequenas e bem delimitadas que podem esperar sem você: formulário novo, endpoint simples, refatoração mecânica.",
    "Equipes distribuídas que querem tratar o agente como mais um colaborador no fluxo de PR."
   ],
   "pros": [
    "Continua trabalhando sem a sua máquina ligada; paraleliza com seu trabalho.",
    "Entrega evidências (testes e imagens) que facilitam a triagem do PR.",
    "Usa o fluxo que o time já conhece: branch e PR."
   ],
   "contras": [
    "Precisa de ambiente reproduzível e secrets configurados, senão não roda.",
    "Menos interativo: tarefa mal descrita volta como PR errado.",
    "Autorrevisão não substitui a revisão humana."
   ],
   "traps": [
    "Dar permissão irrestrita (main, produção, ambientes sensíveis).",
    "Colocar credenciais em script de setup em vez de secrets.",
    "Delegar uma tarefa vaga ou enorme demais.",
    "Aceitar o PR porque o agente disse que os testes passaram."
   ],
   "cola": [
    [
     "Agente assíncrono",
     "Agente que roda fora da sua máquina e entrega por PR"
    ],
    [
     "VM efêmera",
     "Ambiente temporário criado para executar a tarefa"
    ],
    [
     "GitHub App",
     "Forma de o Jules acessar repositórios autorizados"
    ],
    [
     "Secrets",
     "Cofre para credenciais que o agente precisa, fora do código"
    ],
    [
     "Reactive Forms",
     "API de formulários do Angular baseada em <code>FormGroup</code> e validadores"
    ]
   ],
   "links": [
    [
     "Repositório oficial: cfp-platform (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform"
    ],
    [
     "Google Jules",
     "https://jules.google/"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-03/cfp-platform (eventos)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform",
     "resumo": "O que o PR do Jules deixou no repositório: contrato, API e tela de cadastro de evento. Não há registro do PR nem das evidências no repo, só o resultado.",
     "fluxo": [
      "<code>shared-types/src/lib/event.dto.ts</code>: <code>EventDTO</code> com <code>nome</code>, <code>endereco</code>, <code>capacidade</code> e <code>data</code>.",
      "API: <code>create-event.dto.ts</code> (<code>@IsNotEmpty</code>, <code>@IsString</code>, <code>@IsNumber</code>, <code>@IsDateString</code>), <code>event.controller.ts</code> (<code>POST</code> e <code>GET /api/events</code>) e <code>event.service.ts</code> (array em memória).",
      "Front: <code>event-registration.component.ts</code> usa <code>FormBuilder.nonNullable.group</code> com <code>nome</code>, <code>endereco</code>, <code>capacidade</code> (<code>Validators.min(1)</code>) e <code>data</code>; <code>onSubmit()</code> chama <code>markAllAsTouched()</code> se inválido e, senão, faz <code>POST /api/events</code> e controla o status por signal. O template mostra <code>.error-text</code> por campo, o botão «Cadastrar Evento» e a mensagem <code>.success-msg</code>.",
      "Menu e rota: o <code>app.html</code> ganhou o link «Cadastro de Evento» (<code>/event/new</code>), que é o ponto de partida dos testes E2E do módulo 4."
     ],
     "rodar": [
      "<code>npx nx serve frontend</code> e abra <code>/event/new</code>; cadastre um evento e confira com <code>GET /api/events</code> (os dados ficam em memória)."
     ],
     "armadilhas": [
      "Verifiquei contra a API compilada: <code>capacidade: -5</code> é aceito, porque o back só valida <code>@IsNumber</code>, enquanto o front exige mínimo 1; e campos extras também são armazenados (sem <code>whitelist</code>).",
      "Não há teste unitário para eventos, nem na API nem no front (os specs existentes cobrem app e speaker). O prompt da aula não pedia testes.",
      "O OpenSpec não foi usado nesta feature: em <code>openspec/changes/archive/</code> só há <code>add-cfp-feature</code> e <code>add-cfp-dashboard</code>.",
      "<code>capacidade</code> começa em <code>0</code> no formulário (<code>nonNullable</code>), e o <code>id</code> do evento sai de <code>Math.random()</code>.",
      "O formulário usa Reactive Forms (como pedia o prompt) enquanto o de submissão usa <code>ngModel</code>: dois estilos de formulário no mesmo app."
     ]
    }
   ]
  },
  {
   "id": "D5-11",
   "bloco": "d05-b3",
   "mod": "Unidade 4 · Aula 1",
   "emoji": "🧪",
   "read": "8 min",
   "title": "QA no Nx: Cypress tradicional e testes gerados por OpenSpec",
   "short": "Mais código gerado exige mais validação: E2E com Cypress no monorepo e specs de teste geradas pelo OpenSpec.",
   "oneliner": "Testes também são requisitos: uma <b>spec do OpenSpec</b> descreve os cenários E2E (sucesso e erro), o agente gera o <b>Cypress tradicional</b> no Nx e os <b>seletores frágeis</b> viram o gancho para a próxima aula.",
   "vovo": [
    "Quanto mais rápido a fábrica produz, mais rápido precisa funcionar o controle de qualidade. Um robô conferindo todas as peças do mesmo jeito, todo dia, sem cansar, é o teste automatizado.",
    "Mas se o robô reconhece a peça pela cor da etiqueta e alguém troca a etiqueta, ele para a linha mesmo com a peça perfeita. Isso é o teste frágil: quebra por um detalhe que o cliente nem percebe."
   ],
   "oque": [
    "<b>IA não elimina testes:</b> quanto mais rápido se gera código com agentes, mais importante é garantir segurança, regressão e validação automatizada. Se produz mais rápido, é preciso validar mais rápido.",
    "<b>E2E:</b> unitários validam partes isoladas; integração valida comunicação; E2E trabalha do ponto de vista do usuário: abrir navegador, acessar rota, preencher, clicar, validar mensagem e comportamento visual. Detecta erro de integração entre front e back, falha de navegação, quebra de formulário, inconsistência de UX e regressão de fluxo crítico.",
    "<b>QA moderno:</b> quem conhece regra de negócio, cenários críticos e casos de erro passa a gastar menos tempo na execução repetitiva e mais na criação de cenários de validação; a barreira de entrada da automação cai, mesmo para quem não domina o framework.",
    "<b>Cypress:</b> framework E2E popular e maduro, que sobe a aplicação, abre um navegador real ou headless e simula um usuário. A estrutura é a de qualquer teste: preparar estado, executar ação, validar resultado. No Nx, o plugin do Cypress entende as aplicações, scripts e dependências; como front, back e contratos estão no mesmo repositório, o agente enxerga o sistema e acerta mais.",
    "<b>Testes como spec:</b> o OpenSpec não serve só para funcionalidades. A spec <code>createEventTest</code> (no repo, a mudança se chama <code>create-event-tests</code>) definiu objetivo, cenários, regras e restrições: sucesso (navegar até <code>event-new</code>, preencher, enviar, validar mensagem de sucesso) e erro (enviar vazio, validar mensagens). Restrição explícita: sintaxe tradicional do Cypress (<code>get</code>, <code>contains</code>, <code>should</code>) e nenhuma biblioteca externa.",
    "<b>BDD implícito:</b> a spec saiu estruturada como dado, quando, então. O apply detectou que o projeto já tinha Playwright e propôs coexistência com Cypress; depois configurou o Cypress no Nx, ajustou o ESLint, criou o projeto E2E, gerou os testes e os executou. Rodaram em modo headless pelo Nx e também no modo visual.",
    "<b>Fragilidade:</b> o teste gerado seleciona por classe CSS e por texto da mensagem. Funciona, mas é frágil: mudança de texto, de classe ou ajuste visual quebra o teste mesmo com o fluxo funcionando. Remédio clássico: instrumentar o front com atributos de automação (<code>data-cy</code>, <code>data-testid</code>). Testabilidade também faz parte do design da aplicação.",
    "<b>O que fica:</b> Cypress no Nx, coexistência com Playwright, spec de testes, cenários de sucesso e erro, execução headless e visual. Testes também fazem parte do fluxo assistido por IA."
   ],
   "como": [
    "Instalar o plugin do Cypress no workspace Nx.",
    "Escrever a spec de teste (objetivo, cenários, regras, restrições) e deixar o OpenSpec gerar proposal, design e tasks.",
    "Aplicar a spec: o agente configura o projeto E2E e gera os testes.",
    "Rodar headless pelo Nx e abrir o Cypress visual para depurar.",
    "Revisar os testes: seletores, mensagens esperadas e critérios de aceite."
   ],
   "aplica": [
    "Cobrir fluxos críticos (cadastro, checkout, login) logo após o agente gerar a feature.",
    "Deixar que o QA descreva cenários em linguagem de negócio e use o agente para virar automação.",
    "Montar regressão antes de uma refatoração grande."
   ],
   "pros": [
    "Cenários vêm de uma spec explícita, com critérios claros.",
    "O monorepo dá ao agente as mensagens e componentes reais para escrever asserts corretos.",
    "Roda como Cypress normal: barato e previsível no CI, sem depender de IA na execução."
   ],
   "contras": [
    "Seletores por classe, ID e texto geram flaky tests.",
    "Teste gerado por IA ainda precisa de critérios de aceite e revisão.",
    "Coexistir Cypress e Playwright dobra configuração."
   ],
   "traps": [
    "Aceitar seletores por classe CSS como se fossem estáveis.",
    "Deixar a spec de teste vaga («teste a tela de eventos»).",
    "Achar que, com IA, teste é opcional."
   ],
   "cola": [
    [
     "E2E",
     "Teste de ponta a ponta pela interface, como um usuário"
    ],
    [
     "Flaky test",
     "Teste instável que quebra por mudanças não funcionais"
    ],
    [
     "headless",
     "Execução do navegador sem interface gráfica"
    ],
    [
     "data-cy / data-testid",
     "Atributos estáveis feitos para automação"
    ],
    [
     "BDD",
     "Descrição por dado, quando, então"
    ],
    [
     "Regressão",
     "Verificar se o que funcionava continua funcionando"
    ]
   ],
   "links": [
    [
     "Repositório oficial: cfp-platform v1 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-04/cfp-plataform_v1/cfp-platform_v1"
    ],
    [
     "OpenSpec",
     "https://openspec.dev/"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-04/cfp-plataform_v1/cfp-platform_v1",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-04/cfp-plataform_v1/cfp-platform_v1",
     "resumo": "O mesmo workspace do módulo 3 com Cypress, a mudança <code>create-event-tests</code> do OpenSpec e o teste tradicional de cadastro de evento. A pasta cobre as três aulas da unidade 4; este tópico usa a parte tradicional.",
     "fluxo": [
      "<code>openspec/changes/create-event-tests/</code>: <code>.openspec.yaml</code> (criada em 2026-04-05), <code>proposal.md</code> (capability <code>event-registration-e2e</code>), <code>design.md</code> (seletores <code>#nome</code>, <code>#endereco</code>, <code>#capacidade</code>, <code>#data</code> e <code>.submit-btn</code>; não-objetivo: bibliotecas de IA), <code>tasks.md</code> (inclui «Rule of Gold Compliance»: usar só <code>cy.get</code>, <code>cy.contains</code> e <code>should</code>) e <code>specs/event-registration-e2e/spec.md</code> (cenários de sucesso e de formulário vazio em dado, quando, então).",
      "<code>frontend-e2e/cypress/e2e/event-registration.cy.ts</code>: <code>beforeEach</code> visita <code>/event/new</code>; o teste de sucesso digita nos quatro campos, clica em <code>.submit-btn</code> e espera <code>.success-msg</code> visível com «Evento cadastrado com sucesso!»; o de formulário vazio espera quatro <code>.error-text</code> com as mensagens exatas do front.",
      "<code>frontend-e2e/cypress.config.ts</code>: <code>nxE2EPreset</code>, <code>baseUrl: 'http://localhost:4200'</code> e um <code>projectId</code> (Cypress Cloud). Suporte padrão em <code>cypress/support/</code> e fixture de exemplo.",
      "<code>nx.json</code> ganhou o plugin <code>@nx/cypress/plugin</code> (targets <code>e2e</code>, <code>open-cypress</code>, <code>component-test</code> e <code>e2e-ci</code>); o <code>package.json</code> ganhou <code>@nx/cypress</code>, <code>cypress ^15.8.0</code> e <code>eslint-plugin-cypress</code>."
     ],
     "rodar": [
      "<code>npm install</code> (o <code>npm ci</code> falha como no módulo 3). O instalador do Cypress baixa o binário; se quiser só instalar sem baixá-lo, <code>CYPRESS_INSTALL_BINARY=0</code> (usei assim para inspecionar a configuração; não executei os testes).",
      "Terminal 1: <code>npx nx serve frontend</code> (sobe API e front). Terminal 2: <code>npx nx e2e frontend-e2e</code> (<code>cypress run</code>) ou <code>npx nx run frontend-e2e:open-cypress</code>."
     ],
     "templateVsZ": "<code>modulo-03/cfp-platform</code> é o ponto de partida e <code>modulo-04/.../cfp-platform_v1</code> é o mesmo código com QA. Comparei as duas pastas com um <code>diff</code> recursivo: as únicas diferenças são <code>@nx/cypress</code>, <code>cypress</code> e <code>eslint-plugin-cypress</code> no <code>package.json</code>, o plugin e as exclusões de <code>cypress/**</code> no <code>nx.json</code>, o <code>eslint.config.mjs</code> do <code>frontend-e2e</code>, <code>cypress.config.ts</code> e a pasta <code>cypress/</code>, a mudança <code>create-event-tests</code>, a pasta <code>.playwright-mcp/</code> e, como consequência das dependências novas, o <code>package-lock.json</code>. API, front, shared-types e as specs principais do OpenSpec são idênticos.",
     "armadilhas": [
      "Verifiquei com <code>nx show project frontend-e2e</code>: os plugins do Playwright e do Cypress definem ambos o target <code>e2e</code>; o do Cypress vence (<code>cypress run</code>) e o Playwright ficou acessível só por <code>e2e-ci</code> (<code>example.spec.ts</code>). O target <code>e2e</code> não tem <code>dependsOn</code>: ele não sobe front e API sozinho.",
      "A mudança <code>create-event-tests</code> não foi arquivada e todas as tasks seguem <code>[ ]</code>, embora o teste exista. Os caminhos divergem: proposal e design citam <code>frontend-e2e/src/e2e/event-registration.cy.ts</code>, mas o arquivo real está em <code>frontend-e2e/cypress/e2e/</code>.",
      "A spec diz «native validation error messages» e usa campos <code>name</code>, <code>address</code>, <code>capacity</code> e <code>date</code>; o app usa validação do Angular com <code>.error-text</code> e campos <code>nome</code>, <code>endereco</code>, <code>capacidade</code> e <code>data</code>. A spec não descreve o que o teste verifica.",
      "Os seletores são exatamente os frágeis da aula (<code>.submit-btn</code>, <code>.success-msg</code>, <code>.error-text</code> e texto); verifiquei que não há <code>data-cy</code> nem <code>data-testid</code> no front.",
      "O <code>projectId</code> em <code>cypress.config.ts</code> provavelmente pertence a uma conta de Cypress Cloud do autor (não verifiquei); para usar a parte de IA do tópico seguinte é preciso o seu próprio login e projeto.",
      "O README continua sendo o texto padrão do Nx (idêntico ao do módulo 3)."
     ]
    }
   ]
  },
  {
   "id": "D5-12",
   "bloco": "d05-b3",
   "mod": "Unidade 4 · Aulas 2 e 3",
   "emoji": "🤖",
   "read": "8 min",
   "title": "cy.prompt, self-healing e Playwright MCP: três estratégias de QA com IA",
   "short": "Do teste escrito por IA ao teste descrito por intenção e ao agente que opera o navegador, com trade-offs claros.",
   "oneliner": "Três abordagens: <b>IA gera Cypress tradicional</b>; <b>cy.prompt</b> descreve a intenção e se autocorrige (<b>self-healing</b>) ao custo de lock-in; e o <b>Playwright MCP</b> deixa o agente operar o navegador sem código de teste, ao custo de tokens. Não há solução universal: há trade-offs.",
   "vovo": [
    "Primeira estratégia: você contrata alguém que escreve um roteiro de conferência e um robô o repete todo dia. Barato e rápido, mas se mudam o rótulo de um botão, o robô trava.",
    "Segunda: o roteiro diz «aperte o botão de salvar», sem dizer qual é. Se mudam o botão de lugar, o robô entende pelo sentido e continua, mas só funciona dentro do sistema de um fornecedor. Terceira: não há roteiro nenhum, você diz o objetivo a um funcionário esperto que usa o computador sozinho. Flexível, porém cobra por hora."
   ],
   "oque": [
    "<b>Flaky tests:</b> times começam motivados e, em meses, os testes quebram o tempo todo; a confiança cai, os testes são ignorados, o pipeline falha, surgem falsos negativos e a manutenção vira pesadelo, muitas vezes sem que nada de importante tenha mudado para o usuário.",
    "<b>cy.prompt:</b> recurso do ecossistema Cypress que depende dos serviços de nuvem do Cypress (exige autenticação na plataforma). Em vez de escrever <code>cy.get</code>, <code>cy.contains</code> e <code>cy.should</code>, escrevem-se instruções semânticas («digite auditório Oracle no campo nome», «clique no botão de salvar», «verifique a mensagem de sucesso»): descreve-se intenção, não implementação. É a tendência de subir o nível de abstração (assembly, linguagens de alto nível, frameworks, ORMs, low-code, agora automação por intenção).",
    "<b>Sem mágica:</b> o Cypress usa o prompt para gerar código Cypress tradicional (visível na aba Code: <code>visit</code>, <code>get</code>, <code>type</code>, <code>click</code>, <code>contains</code>). Há cache: a primeira execução é mais lenta, as seguintes reutilizam o código gerado, o que reduz custo, tokens e tempo.",
    "<b>Self-healing:</b> a demonstração mudou a classe CSS do botão de submit. O teste tradicional quebrou; o baseado em prompt detectou que o seletor não existia mais, reinterpretou a interface pelo contexto semântico e gerou um caminho válido. Reduz a fragilidade e o custo de manutenção, que historicamente era o maior da automação E2E.",
    "<b>Trade-off:</b> ganha-se automação semântica, autocorreção e menos dependência de seletores, mas cria-se dependência da plataforma Cypress Cloud, do modelo usado e de integração proprietária (lock-in). Alternativa sem IA proprietária: instrumentar o front com <code>data-cy</code>, <code>data-testid</code> ou <code>data-qa</code>, que um agente pode inclusive automatizar (analisar componentes, adicionar atributos, padronizar e refatorar testes).",
    "<b>Playwright MCP:</b> o Playwright é um framework E2E consolidado (e opção oficial em projetos Angular modernos). O MCP não só ensina boas práticas, ele entrega ferramentas reais de manipulação do navegador: abrir páginas, clicar, preencher formulários, capturar screenshots, executar JavaScript, ler console, interagir com pop-ups e navegar pela interface. O agente deixa de escrever testes e passa a controlar um browser.",
    "<b>RPA:</b> o mesmo modelo serve para Robotic Process Automation: sistemas legados sem API, portais internos, rotinas administrativas. O navegador vira camada universal de integração.",
    "<b>Sem código de teste:</b> o que se cria é um prompt operacional (subir o ambiente Nx, iniciar front e API, acessar a aplicação, achar o formulário, preencher dados realistas, submeter, validar a mensagem de sucesso). O agente usou o MCP do Nx para saber subir o ambiente e o do Playwright para controlar o navegador: múltiplos MCPs no mesmo fluxo, cada um como extensão cognitiva. Gerou artifacts (ações, snapshots, logs, sequência de navegação), uma espécie de log procedural reutilizável.",
    "<b>Comparativo da aula.</b> IA gera Cypress tradicional: barato de executar, roda no CI sem depender de IA, rápido; frágil e dependente de seletores. Cypress Prompt: automação semântica, autocorreção, menos fragilidade; lock-in na nuvem do Cypress, dependência da plataforma, possível custo extra. Playwright MCP com agente: flexibilidade, navegação inteligente, QA e RPA, independência de código de teste; consumo contínuo de tokens, custo computacional maior, execução potencialmente mais lenta.",
    "<b>Híbrido:</b> as abordagens não são exclusivas; por exemplo, Cypress tradicional para smoke tests rápidos, Cypress Prompt para fluxos frágeis e Playwright MCP para RPA e sistemas legados. Profissionais seniores escolhem por custo, benefício, contexto, manutenção, escala, arquitetura e flexibilidade, não por moda."
   ],
   "como": [
    "cy.prompt: autenticar no Cypress Cloud, escrever os passos como lista de instruções semânticas, executar, ler o código gerado na aba Code e observar o cache nas execuções seguintes.",
    "Self-healing: alterar de propósito um seletor da aplicação e comparar o teste tradicional (quebra) com o baseado em prompt (continua).",
    "Playwright MCP: registrar o servidor MCP na IDE, listar as tools, escrever o prompt operacional e acompanhar a execução e os artifacts.",
    "Decidir por fluxo: smoke rápido, fluxo frágil ou RPA."
   ],
   "aplica": [
    "Smoke tests baratos em CI com Cypress tradicional.",
    "Fluxos em que o front muda muito (cy.prompt, aceitando o lock-in).",
    "Automação de sistemas legados sem API com agente e Playwright MCP."
   ],
   "pros": [
    "Menos manutenção de testes com semântica e self-healing.",
    "Qualquer pessoa que descreva o fluxo em linguagem natural consegue automatizar.",
    "Rastreabilidade pelos artifacts e snapshots do agente."
   ],
   "contras": [
    "Lock-in de plataforma e custo no cy.prompt.",
    "Consumo contínuo de tokens e execução mais lenta no agente autônomo.",
    "Self-healing pode esconder um problema real: um teste que «se conserta» sozinho também pode passar quando o fluxo mudou de verdade e precisaria de revisão."
   ],
   "traps": [
    "Escolher a ferramenta mais nova sem olhar custo, lock-in e CI.",
    "Dar a um agente autônomo um objetivo sem escopo e sem critérios de sucesso.",
    "Achar que self-healing dispensa critério de aceite."
   ],
   "cola": [
    [
     "cy.prompt",
     "Comando do Cypress que gera e adapta código de teste a partir de instruções semânticas"
    ],
    [
     "Self-healing",
     "Autocorreção do teste quando o seletor deixa de existir"
    ],
    [
     "Lock-in",
     "Dependência de um fornecedor ou plataforma específica"
    ],
    [
     "Playwright MCP",
     "Servidor MCP que dá ao agente ferramentas reais de controle do navegador"
    ],
    [
     "RPA",
     "Automação de processos repetitivos operando interfaces"
    ],
    [
     "Artifact / snapshot",
     "Registro das ações do agente (aqui, árvores de acessibilidade em YAML)"
    ]
   ],
   "links": [
    [
     "Repositório oficial: cfp-platform v1 (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-04/cfp-plataform_v1/cfp-platform_v1"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-04/cfp-plataform_v1/cfp-platform_v1 (cy.prompt e Playwright MCP)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-04/cfp-plataform_v1/cfp-platform_v1",
     "resumo": "O teste escrito com <code>cy.prompt</code> e os snapshots deixados pelo Playwright MCP.",
     "fluxo": [
      "<code>frontend-e2e/cypress/e2e/event-registration-ai.cy.ts</code>: abre <code>/event/new</code> e chama <code>cy.prompt([...])</code> com cinco instruções em inglês (digitar «Auditório Oracle» no nome, «Av. Dr. Chucri Zaidan, SP» no endereço, «500» na capacidade, «2026-12-31» na data e clicar no botão que salva); depois outro <code>cy.prompt(['Verify that a success message is visible'])</code> como asserção por intenção. O comentário no arquivo explica agrupar os passos num único array para otimizar o LLM.",
      "<code>.playwright-mcp/page-2026-04-05T23-22-58-510Z.yml</code>, <code>...23-05-990Z.yml</code> e <code>...23-17-624Z.yml</code>: três snapshots de acessibilidade (árvore ARIA em YAML) do fluxo do agente: o dashboard vazio («No submissions found...»), o formulário de evento com capacidade 0 e o mesmo formulário com o alerta «✓ Evento cadastrado com sucesso!».",
      "O servidor MCP do Playwright em si não está configurado no repositório (na aula ele é registrado na IDE)."
     ],
     "rodar": [
      "Para o <code>cy.prompt</code>: o repo declara <code>cypress ^15.8.0</code>; é preciso login no Cypress Cloud e <code>projectId</code> próprio; depois <code>npx nx run frontend-e2e:open-cypress</code> com a API e o front no ar. Não executei esta parte (depende de conta e do binário).",
      "Para o Playwright MCP: registre o servidor na sua IDE e use um prompt operacional como o da aula; os snapshots do repo mostram o resultado esperado."
     ],
     "armadilhas": [
      "O repositório não guarda o prompt operacional do agente de QA: só a evidência (snapshots). Reproduzir exige reescrever o prompt a partir da descrição da aula.",
      "A apostila descreve as instruções do <code>cy.prompt</code> em português; o arquivo do repo as escreve em inglês, com o texto «Auditório Oracle» em português dentro delas.",
      "A pasta <code>.playwright-mcp/</code> é artefato de execução e está versionada sem estar no <code>.gitignore</code>.",
      "Com <code>cy.prompt</code>, o teste de IA e o tradicional cobrem o mesmo fluxo: bom para comparar, mas rodar os dois no mesmo CI duplica o custo e o tempo."
     ]
    }
   ]
  },
  {
   "id": "D5-13",
   "bloco": "d05-b4",
   "mod": "Unidade 5 · Aulas 1 e 2",
   "emoji": "🧠",
   "read": "9 min",
   "title": "Genkit, setup seguro e interface mockada do BragBot",
   "short": "A IA deixa de ser ferramenta de dev e vira componente da aplicação: base com Genkit, chave protegida e UI validada com mock.",
   "oneliner": "No BragBot a LLM passa a ser <b>parte da arquitetura</b>: o <b>Genkit</b> abstrai o provedor e valida a saída, a <b>API key vive em .env fora do Git</b> e a interface é construída primeiro com <b>dados mockados e Signals</b>, para só depois ligar o modelo.",
   "vovo": [
    "Até agora a IA era uma ferramenta na oficina: o marceneiro usava a furadeira. Agora a furadeira passa a ser uma peça do móvel que o cliente leva para casa. Isso muda tudo: a peça precisa de chave guardada, manual, garantia e uma interface que continue funcionando se trocarem o fabricante.",
    "E antes de instalar a peça cara, monta-se o móvel com uma peça de madeira no lugar, só para ver se as portas abrem. Trocar a peça de madeira pela furadeira real depois é simples."
   ],
   "oque": [
    "<b>Mudança de paradigma:</b> nas unidades anteriores Gemini, Cypress Prompt, agentes e MCPs eram ferramentas usadas por desenvolvedores. Agora a aplicação conversa com a IA, a IA retorna dados, o back-end processa e o front consome. Isso exige pensar em contratos, observabilidade, segurança e desacoplamento.",
    "<b>BragBot e Brag Doc:</b> o Brag Doc é o diário de conquistas profissionais usado em avaliações, PDI e promoções. O app transforma uma conquista informal em documento estruturado. Mas o foco real é aprender a integrar LLMs profissionalmente numa aplicação.",
    "<b>Por que um framework de IA:</b> cada fornecedor tem endpoints, SDKs, autenticação e formatos próprios; consumir direto cria acoplamento e trocar de modelo fica caro. O Genkit, criado pelo Google para Node.js, é agnóstico de modelo, funciona por plugins (Gemini, OpenAI, outros, modelos open source) e abstrai a interação com LLMs como ORMs abstraem banco, frameworks abstraem HTTP e SDKs abstraem APIs.",
    "<b>Não é só um wrapper:</b> ajuda em construção de prompts, validação de saída, tratamento de erros, debug, observabilidade, troca de modelos e padronização. A validação estrutural é central: a resposta da LLM não pode ser tratada como texto solto; contratos e schemas permitem detectar saída inválida e lançar exceção para o sistema tratar.",
    "<b>Biblioteca, não framework:</b> o Genkit pode viver dentro de Angular SSR, Express, NestJS, aplicações Node, microsserviços ou APIs tradicionais.",
    "<b>Decisão arquitetural didática:</b> usar o servidor SSR do Angular (Node) também como back-end simplificado, para não distrair com infraestrutura paralela. A apostila avisa que isso não é a arquitetura ideal para produção enterprise, onde caberiam Angular, NestJS, microsserviço de IA e workers separados.",
    "<b>Segurança da chave:</b> a API key da LLM representa custo e acesso à infraestrutura do modelo; vazamento permite consumir a cota, gerar custos e abusar da API. Nunca no código: cria-se <code>.env</code> e adiciona-se ao <code>.gitignore</code> (há bots procurando chaves vazadas em repositórios públicos). O Genkit reconhece variáveis padrão como <code>GOOGLE_API_KEY</code>.",
    "<b>Ferramentas:</b> Genkit CLI instalado globalmente (desenvolvimento, debug, observabilidade, inspeção), Genkit no projeto e plugin do Google AI. O Angular já sugere arquivos de contexto para agentes de IA na criação do projeto. O Genkit tem MCP próprio, configurado como o do Angular, Nx e Playwright; a validação foi perguntar ao agente quais modelos o servidor MCP lista.",
    "<b>Interface mockada primeiro (aula 2):</b> montar o fluxo visual, validar navegação e look and feel e só depois plugar o back-end ou a IA separa problema de interface de problema de integração. A identidade visual simulou a página da pós da UniPDS: o agente acessa a página, extrai a identidade e aplica no Angular. O prompt fixou Angular 21 com Tailwind CSS, Genkit e MCPs instalados, duas telas (dashboard e detail, com identificador na rota de detalhe) e rota padrão no dashboard.",
    "<b>Serviço com Signals:</b> o componente cuida da tela e o serviço, do estado e da lógica de dados. Dois signals: lista de conquistas e estado de loading (spinner, texto do botão). Um método mockado ativa o loading, espera de forma assíncrona e adiciona uma conquista com título, contexto, impacto, tecnologias e métrica: o formato aproximado do que a LLM devolverá. O dashboard tem um campo de texto para a conquista bruta e o botão «destilar conquista»; os cards usam <code>@for</code> e levam ao detalhe.",
    "<b>Decisão revisada:</b> o agente colocou o template dentro do TypeScript; o professor prefere arquivos separados quando a tela cresce. A preferência do time precisa ser revisada depois da geração."
   ],
   "como": [
    "Criar o projeto Angular com SSR; instalar Genkit, plugin do Google AI e Genkit CLI; criar <code>.env</code> com a chave e ignorá-lo no Git.",
    "Registrar o MCP do Genkit e validar listando os modelos.",
    "Pedir a UI ao agente com identidade visual de referência, duas telas, rotas e serviço com Signals, usando um método mockado.",
    "Validar fluxo, estado, navegação e identidade antes da integração."
   ],
   "aplica": [
    "Qualquer app que vá chamar um LLM: primeiro contrato e UI estáveis, depois o modelo.",
    "Equipes que querem poder trocar de fornecedor sem reescrever a aplicação."
   ],
   "pros": [
    "Troca de modelo por configuração de plugin e nome do modelo.",
    "A UI estável isola bugs de interface dos de integração.",
    "Segredos fora do repositório desde o primeiro commit."
   ],
   "contras": [
    "Mais uma dependência de framework a acompanhar (versões e nomes de modelo mudam).",
    "Usar o servidor SSR como back-end é simplificação didática, não desenho de produção."
   ],
   "traps": [
    "Subir a API key para o GitHub.",
    "Ligar o modelo antes de a interface e o contrato estarem validados.",
    "Acoplar a aplicação a um fornecedor de LLM sem camada de abstração."
   ],
   "cola": [
    [
     "Genkit",
     "Biblioteca do Google para Node.js que abstrai LLMs, flows e observabilidade"
    ],
    [
     "Plugin",
     "Adaptador de provedor de modelo (Google AI, OpenAI, etc.)"
    ],
    [
     "Brag Doc",
     "Diário estruturado de conquistas profissionais"
    ],
    [
     "Angular SSR",
     "Renderização no servidor (Node) pelo próprio Angular"
    ],
    [
     "GOOGLE_API_KEY",
     "Variável de ambiente que o plugin do Google AI reconhece"
    ],
    [
     "Genkit CLI",
     "Ferramentas de desenvolvimento, debug e Dev UI"
    ],
    [
     "Mock",
     "Dado simulado que permite validar a UI antes da integração"
    ]
   ],
   "links": [
    [
     "Repositório oficial: brag-bot (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-05/brag-bot"
    ],
    [
     "Firebase Genkit",
     "https://genkit.dev/"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-05/brag-bot",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-05/brag-bot",
     "resumo": "Angular 21.1 com SSR, Tailwind 4, Genkit 1.32 e Gemini. Este tópico cobre o setup e as telas; o flow e a rota de API estão nos dois próximos.",
     "fluxo": [
      "<code>package.json</code>: <code>@angular/ssr</code>, <code>genkit</code> e <code>@genkit-ai/google-genai</code> (^1.32), <code>express</code> 5, <code>uuid</code> 13, <code>tailwindcss</code> 4 com <code>@tailwindcss/postcss</code> (<code>.postcssrc.json</code>) e o script <code>genkit:ui</code> (<code>genkit start -- npx tsx --watch src/flows.ts</code>).",
      "<code>angular.json</code>: <code>outputMode: \"server\"</code>, <code>ssr.entry: \"src/server.ts\"</code> e <code>externalDependencies</code> com <code>genkit</code>, <code>@genkit-ai/google-genai</code>, <code>uuid</code> e <code>express</code>, para o build não empacotá-los.",
      "<code>.gitignore</code> inclui <code>.env</code> e <code>.genkit</code>; <code>.vscode/mcp.json</code> registra só o MCP do Angular (o do Genkit não está no repo); <code>.gemini/GEMINI.md</code> traz as regras que o Angular CLI gera para agentes.",
      "Rotas: <code>app.routes.ts</code> com <code>''</code> (<code>DashboardComponent</code>) e <code>detail/:id</code> (<code>DetailComponent</code>) lazy; <code>app.routes.server.ts</code> com <code>RenderMode.Server</code> para tudo; <code>app.config.ts</code> com <code>provideHttpClient(withFetch())</code> e <code>provideClientHydration(withEventReplay())</code>.",
      "<code>dashboard.component.ts</code> e <code>detail.component.ts</code>: templates inline com classes do Tailwind (tema escuro com destaque esmeralda), título «Brag-Bot | Pós IA UNIPDS», <code>@for ... @empty</code> nos cards, estado vazio, spinner no botão e uma página de «Conquista não encontrada». O detalhe lê o id da rota e usa <code>computed</code> sobre o serviço.",
      "<code>services/brag.service.ts</code>: signals <code>brags</code> e <code>loading</code> e <code>getBragById</code>. Na versão do repo o método de geração já chama a API; o mock desta aula não existe mais."
     ],
     "rodar": [
      "<code>npm install</code>; crie <code>.env</code> com <code>GOOGLE_API_KEY=...</code> (não há <code>.env.example</code>); <code>npm start</code> para o dev server com SSR; <code>npm run build</code> compila (verifiquei) e <code>npm run serve:ssr:brag-bot</code> serve o build.",
      "<code>npm run genkit:ui</code> abre a Dev UI do Genkit (exige o Genkit CLI instalado; o <code>tsx</code> vem via <code>npx</code>). Não executei com uma chave real."
     ],
     "armadilhas": [
      "O <code>.gemini/GEMINI.md</code> proíbe <code>standalone: true</code>, prefere Reactive Forms, exige <code>OnPush</code> e evita <code>any</code>. O código gerado faz o contrário: <code>standalone: true</code> explícito, <code>FormsModule</code> com <code>ngModel</code>, nenhum <code>ChangeDetectionStrategy.OnPush</code>, <code>CommonModule</code> importado sem uso e <code>post&lt;any&gt;</code> no serviço.",
      "Falta um <code>.env.example</code> documentando a variável; o README é o padrão do Angular CLI. O <code>index.html</code> está com <code>lang=\"en\"</code> numa UI em português.",
      "<code>npm test</code>: verifiquei que <code>app.spec.ts</code> tem um teste passando e um falhando (espera o texto «Hello, brag-bot» num <code>h1</code> que não existe). Não há testes do serviço, do flow nem do endpoint.",
      "As conquistas só existem no signal do serviço, em memória: recarregar <code>/detail/:id</code> mostra «Conquista não encontrada» (pela leitura; verifiquei só que a rota responde 200 no SSR).",
      "<code>prompt</code> do dashboard é uma propriedade simples com <code>ngModel</code>, não um signal, ao contrário do resto do estado."
     ]
    }
   ]
  },
  {
   "id": "D5-14",
   "bloco": "d05-b4",
   "mod": "Unidade 5 · Aula 3",
   "emoji": "⚙️",
   "read": "8 min",
   "title": "Flows, Zod e Google AI: o cérebro do Genkit",
   "short": "Um flow tipado transforma texto livre em objeto validado, com schema Zod que também orienta o modelo.",
   "oneliner": "No Genkit toda interação com a LLM acontece num <b>flow</b>: uma função assíncrona estruturada que encapsula prompt, modelo, <b>schemas Zod</b>, validação, tracing e observabilidade; os <code>describe</code> do schema ajudam a montar o prompt, e a Dev UI permite testar e depurar sem subir a aplicação.",
   "vovo": [
    "Imagine um funcionário de cozinha que recebe um pedido falado, bagunçado, de um cliente («aquele prato de ontem, mas sem cebola e mais rápido»). Ele precisa devolver sempre uma comanda no formato exato da cozinha: nome do prato, ingredientes, tempo. Se a comanda sair faltando campo, o garçom devolve.",
    "O flow é essa estação de trabalho; o schema Zod é o formulário de comanda; e as legendas escritas em cada campo do formulário («aqui vai o prato principal») são o que o funcionário lê para entender o que preencher."
   ],
   "oque": [
    "<b>O Genkit como camada de abstração:</b> cada fornecedor tem SDK, API, autenticação, formato e convenções próprios, e consumir direto cria acoplamento e custo de troca. Com o Genkit, trocar entre Gemini, OpenAI, Anthropic, modelos locais ou open source é basicamente mudar plugin e modelo. Também oferece flows, validação estrutural, observabilidade, tracing, debug, controle de output e integração tipada.",
    "<b>Flow:</b> praticamente toda interação com LLM acontece por flows. É uma função assíncrona estruturada, mas representa mais: encapsula prompt, modelo, schemas, validação, observabilidade, tracing e configuração de execução. É a unidade operacional de IA na aplicação. O da aula transforma um rascunho informal em um Brag Document com título, contexto, ação tomada, impacto, métricas e tecnologias.",
    "<b>Configuração:</b> uma instância principal do Genkit com plugin do Google AI, modelo Gemini e comportamento padrão. Todo o resto fica agnóstico de modelo: flow, schemas e lógica continuam iguais; muda plugin, nome do modelo e eventuais configurações.",
    "<b>Temperatura:</b> controla criatividade. Mais alta: mais criatividade, diversidade e imprevisibilidade; mais baixa: mais consistência e previsibilidade. A aula usou uma temperatura intermediária para dar alguma criatividade sem perder o tom profissional.",
    "<b>Zod:</b> o TypeScript valida tipos em compilação, mas dados externos (usuários, requests, serviços, LLMs) não têm garantia de respeitar a tipagem. O Zod valida contratos em tempo de execução, essencial porque LLMs não são determinísticas: podem alucinar, mudar a estrutura, esquecer propriedades ou devolver formato inválido.",
    "<b>Schema participa do prompt:</b> o Genkit usa os <code>describe</code> do schema para montar o prompt enviado à LLM. Eles funcionam como documentação semântica (por exemplo, o título é a ação principal e o contexto é a situação original). O schema deixa de ser só validação técnica e entra na engenharia de prompt.",
    "<b>System Prompt do flow:</b> persona, objetivo, regras e formato. A persona é de redatora profissional que transforma conquistas técnicas em documentação executiva; tom profissional, linguagem objetiva, sem exageros emocionais e preservando o idioma do input. Com uma instrução simples a aplicação fica multilíngue.",
    "<b>Output schema:</b> o Genkit instrui a LLM a responder no formato esperado; no Gemini o schema pode ir separado como parte estruturada da requisição, em outros modelos pode ser incorporado ao texto do prompt. A aplicação não precisa saber dessas particularidades. A resposta textual vira JSON validado: a LLM responde, o Genkit processa o schema, valida e o flow devolve um objeto tipado.",
    "<b>Dev UI:</b> permite executar flows isoladamente, ver traces, analisar prompts, verificar output, inspecionar schemas e depurar erros, sem criar API nem subir o front. Na aula o modelo Gemini estava configurado errado; usou-se a própria ferramenta para ver o erro, identificar o modelo inválido, consultar os modelos disponíveis, ajustar e reexecutar. Mostra o prompt enviado, o schema gerado, o output retornado, o parsing do JSON e o trace completo.",
    "<b>Depurar LLM é diferente:</b> não se analisa só código determinístico; é preciso entender contexto enviado, temperatura, schema e comportamento do modelo. O ambiente muda rápido (versões, modelos, SDKs e nomes), então observabilidade e debug são competências centrais."
   ],
   "como": [
    "Definir o schema de entrada e o de saída com Zod, cada campo com <code>describe</code>.",
    "Criar a instância do Genkit com plugin e modelo; definir o flow com os schemas e a lógica.",
    "Dentro do flow, chamar <code>generate</code> com o prompt e o <code>output</code> estruturado; lançar erro se não houver saída válida.",
    "Testar na Dev UI com entradas reais, inspecionando prompt, schema, output e trace; ajustar modelo, temperatura e instruções."
   ],
   "aplica": [
    "Qualquer transformação de texto livre em estrutura (resumir, classificar, extrair campos).",
    "Isolar a lógica de IA de uma aplicação num módulo testável e observável."
   ],
   "pros": [
    "Saída tipada e validada, consumível como qualquer função.",
    "Troca de provedor por configuração.",
    "Observabilidade e debug nativos pela Dev UI."
   ],
   "contras": [
    "Mesmo validada, a saída continua probabilística: o schema garante forma, não verdade.",
    "O prompt e o schema precisam ser mantidos juntos; mudar um sem o outro quebra a qualidade."
   ],
   "traps": [
    "Tratar a resposta da LLM como texto solto.",
    "Esquecer que <code>describe</code> entra no prompt e escrevê-los como comentário interno.",
    "Hardcodar nome de modelo sem plano para quando ele mudar."
   ],
   "cola": [
    [
     "Flow",
     "Função assíncrona estruturada do Genkit que encapsula prompt, modelo, schemas e tracing"
    ],
    [
     "Zod",
     "Biblioteca de schemas com validação em tempo de execução para TypeScript"
    ],
    [
     "describe",
     "Texto semântico num campo do schema que também orienta o modelo"
    ],
    [
     "Temperatura",
     "Controle de criatividade versus previsibilidade da resposta"
    ],
    [
     "Dev UI",
     "Interface local para executar flows e ver traces e prompts"
    ],
    [
     "Output estruturado",
     "Resposta do modelo no formato do schema, validada pelo Genkit"
    ]
   ],
   "links": [
    [
     "Repositório oficial: brag-bot (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-05/brag-bot"
    ],
    [
     "Firebase Genkit",
     "https://genkit.dev/"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-05/brag-bot (src/flows.ts)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-05/brag-bot",
     "resumo": "O flow inteiro cabe em <code>src/flows.ts</code>: instância do Genkit, schemas Zod e o <code>bragGeneratorFlow</code> chamando o Gemini.",
     "fluxo": [
      "<code>ai = genkit({ plugins: [googleAI()], model: googleAI.model('gemini-2.5-flash') })</code>.",
      "<code>BragInputSchema</code>: <code>definition</code> (rascunho informal do usuário). <code>BragSchema</code>: <code>title</code>, <code>context</code>, <code>actionTaken</code>, <code>businessImpact</code>, <code>metrics</code> (array) e <code>technologiesUsed</code> (array), todos com <code>.describe(...)</code>.",
      "<code>bragGeneratorFlow = ai.defineFlow({ name, inputSchema, outputSchema }, async (input) =&gt; ...)</code>: monta um prompt em template string (persona «Senior Career Consultant» para PDI de engenheiros de software; regras: tom profissional sem adjetivos emocionais, inferir a natureza da métrica quando não houver números, seguir o schema, respeitar o idioma do input) e chama <code>ai.generate</code> com <code>temperature: 0.8</code> e <code>output: { format: 'json', schema: BragSchema }</code>.",
      "Se não vier <code>output</code>, lança <code>Error</code>; senão devolve <code>{ ...output, id: uuidv4() }</code>."
     ],
     "rodar": [
      "Com <code>GOOGLE_API_KEY</code> no ambiente: <code>npm run genkit:ui</code>, abra a Dev UI e execute <code>bragGeneratorFlow</code> com <code>{ \"definition\": \"otimizei a API com redis e ficou 10x mais rápida\" }</code>. Não executei com chave real.",
      "Sem chave, testei só o comportamento dos schemas com uma sonda local (sem chamar o modelo), descrita abaixo."
     ],
     "armadilhas": [
      "O nome do flow no repositório é <code>bragGeneratorFlow</code>; a apostila o chama de <code>bragGenerateFlow</code>.",
      "Instruções conflitantes: a regra 2 do prompt manda inferir a natureza da métrica de forma plausível quando não há métrica exata, enquanto o <code>describe</code> de <code>metrics</code> pede «apenas dados estritamente quantificáveis». Isso convida o modelo a inventar métricas num documento que serve a avaliação de desempenho.",
      "<code>temperature: 0.8</code> é uma escolha alta para um texto executivo; a aula fala em «intermediária». Menor valor tenderia a mais consistência (hipótese, não testei).",
      "O <code>id</code> não faz parte do <code>outputSchema</code>. Verifiquei com Genkit 1.32.0 que um flow com <code>outputSchema</code> sem <code>id</code> devolve o campo extra sem erro: funciona, mas o contrato declarado do flow não descreve o que a API de fato devolve.",
      "Verifiquei também que o flow rejeita <code>definition</code> que não seja string com <code>INVALID_ARGUMENT</code> (<code>Schema validation failed</code>), o que importa para a rota do próximo tópico.",
      "<code>actionTaken</code> é gerado e pago em tokens, mas o front o descarta (a interface <code>Brag</code> não tem esse campo).",
      "O nome do modelo (<code>gemini-2.5-flash</code>) está fixo em código; a própria aula relata um erro de modelo mal configurado."
     ]
    }
   ]
  },
  {
   "id": "D5-15",
   "bloco": "d05-b4",
   "mod": "Unidade 5 · Aulas 4 e 5",
   "emoji": "🏁",
   "read": "9 min",
   "title": "Micro-BFF full-stack e o Engenheiro AI-Native",
   "short": "A rota Express do SSR chama o flow, o serviço Angular troca o mock por HttpClient, e a jornada fecha com a visão AI-Native.",
   "oneliner": "O <b>micro-BFF</b> é o servidor SSR do Angular (Express) expondo <code>POST /api/brag</code> que chama o flow: front, API, Genkit e Gemini no <b>mesmo processo Node</b>. E o fechamento da disciplina: <b>AI-Native é integrar IA com arquitetura, especificação, validação e pensamento crítico, não depender cegamente dela</b>.",
   "vovo": [
    "Um BFF é o garçom que conhece o cliente: o cliente fala com ele numa linguagem simples e ele conversa com a cozinha, o estoque e o caixa, escondendo as chaves do cofre. Aqui, o garçom e a cozinha dividem a mesma sala pequena, só para a aula ser mais fácil de acompanhar.",
    "E a lição final é de quem aprende a usar um bom forno: o forno novo não faz do cozinheiro um sem-cérebro. Receita, higiene, teste de sabor e responsabilidade com o cliente continuam sendo dele."
   ],
   "oque": [
    "<b>BFF (Backend For Frontend):</b> camada intermediária que serve as necessidades da interface: expõe APIs adequadas, encapsula regras, adapta payloads, protege credenciais e centraliza integrações. Comum com microsserviços, SPAs, mobile, SSR e APIs externas.",
    "<b>Micro-BFF da aula:</b> o servidor SSR do Angular já roda Express, então se adicionam endpoints REST nele: front Angular, servidor SSR, API Express e Genkit no mesmo processo Node. Em produção enterprise poderia haver Angular separado, NestJS, microsserviço de IA, autenticação dedicada, gateway, filas e workers. Simplifica-se a infraestrutura para focar no conceito.",
    "<b>Prompt para o agente:</b> usar o MCP do Genkit, modificar <code>server.ts</code>, criar a rota, integrar com o flow, tratar erros, atualizar o serviço Angular e validar o build. Detalhe de arquitetura: a rota da API precisa ficar antes da rota catch-all do Angular SSR, senão o Angular intercepta as chamadas.",
    "<b>A API é simples:</b> <code>express.json</code>, uma rota POST que extrai a definição, chama o flow e devolve JSON. Uma aplicação com LLM continua sendo entrada, processamento, validação e resposta; parte do processamento é por modelo generativo. Como LLMs podem falhar, exceder limites ou lançar exceção, a rota captura e responde HTTP 500, como em qualquer integração externa crítica.",
    "<b>Front:</b> standalone components exigem registrar providers (como <code>HttpClient</code>). O serviço deixou de usar <code>setTimeout</code> e arrays locais e passou a consumir a API com HttpClient; a interface praticamente não mudou, graças à separação entre estado, serviço e interface. O agente também executou build, ajustes de configuração e validação do SSR.",
    "<b>Primeiro fluxo completo:</b> o usuário escreve uma conquista informal, a aplicação envia à API, a API chama o flow, o Genkit conversa com o Gemini, o Gemini gera a resposta estruturada e o front renderiza.",
    "<b>Aprendizado sobre não determinismo:</b> a instrução «respeitar o idioma do input» falhou parcialmente: entrada em inglês, parte da resposta veio em português. Prompt engineering é um processo iterativo (testar, observar, refinar, ajustar, validar), e a Dev UI ajuda a rever o prompt e o contexto.",
    "<b>Fechamento (aula 5):</b> o engenheiro AI-Native atua como arquiteto, orquestrador, integrador, revisor e estrategista técnico. Ser AI-Native não é depender cegamente de IA nem deixá-la fazer tudo: é integrá-la corretamente ao fluxo de engenharia.",
    "<b>A jornada em uma linha por módulo:</b> módulo 1, IA em todo o ciclo (requisitos, edge cases, UX Writing, documentação, design, arquitetura); módulos 2 e 3, agentes, MCPs, orquestração, monorepo, isolamento e SDD; módulo 4, qualidade (Cypress, Playwright, self-healing, Playwright MCP); módulo 5, a IA como componente arquitetural (Genkit, Gemini, flows, Zod, SSR).",
    "<b>O que permanece:</b> engenharia de contexto, especificação estruturada, validação, observabilidade, automação, arquitetura e pensamento crítico. Ferramentas e modelos mudam; a IA acelera a execução, a responsabilidade técnica continua humana. Prompt engineering não desaparece com frameworks: fica encapsulada na arquitetura. O futuro provável é colaboração contínua entre humanos e sistemas inteligentes.",
    "<b>Checklist de revisão final da apostila:</b> refinar requisitos sem tratar o modelo como verdade; transformar jornadas, mensagens, dados e prompts em artefatos versionáveis; entender como MCP, design systems e especificações reduzem variabilidade; explicar por que monorepo, isolamento, code review e QA continuam importantes; integrar um modelo por contratos, schemas e camadas, sem acoplar à interface; saber onde revisão humana, segurança, observabilidade e pensamento crítico são indispensáveis."
   ],
   "como": [
    "Escrever a rota POST antes do catch-all do SSR: ler o corpo, chamar o flow, devolver o JSON e responder 500 em caso de exceção.",
    "Registrar <code>provideHttpClient</code> e trocar o método mockado do serviço por uma chamada HTTP, mantendo a interface do serviço.",
    "Testar o fluxo ponta a ponta e observar a variação de comportamento do modelo (idioma, formato) na Dev UI."
   ],
   "aplica": [
    "Qualquer aplicação com SSR que queira expor um endpoint de IA sem criar outro serviço no começo.",
    "Pontes para evoluir o micro-BFF em um serviço de IA separado quando a escala pedir."
   ],
   "pros": [
    "A chave do modelo fica no servidor, nunca no navegador.",
    "Um processo, um deploy, ótimo para aprender e prototipar.",
    "Contrato claro: o front só conhece <code>/api/brag</code>."
   ],
   "contras": [
    "Acopla renderização e IA no mesmo processo: não é um desenho de produção em larga escala.",
    "Sem camadas de autenticação, limite de uso e observabilidade, o endpoint é um ponto de custo exposto."
   ],
   "traps": [
    "Colocar a rota depois do catch-all do SSR.",
    "Deixar o front acoplado ao provedor do modelo.",
    "Considerar pronto um comportamento do LLM visto uma vez (idioma, formato).",
    "Tomar o micro-BFF como arquitetura final."
   ],
   "cola": [
    [
     "BFF",
     "Backend For Frontend: camada que serve o que a interface precisa"
    ],
    [
     "Micro-BFF",
     "BFF mínimo dentro do próprio servidor SSR do Angular"
    ],
    [
     "Catch-all",
     "Rota que renderiza qualquer caminho; a API deve vir antes dela"
    ],
    [
     "HttpClient",
     "Cliente HTTP do Angular, registrado por <code>provideHttpClient</code>"
    ],
    [
     "AI-Native",
     "Integrar IA ao fluxo e à arquitetura mantendo engenharia e responsabilidade humana"
    ],
    [
     "Não determinismo",
     "O mesmo prompt pode produzir saídas diferentes"
    ]
   ],
   "links": [
    [
     "Repositório oficial: brag-bot (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-05/brag-bot"
    ],
    [
     "Firebase Genkit",
     "https://genkit.dev/"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-05/brag-bot (server.ts e brag.service.ts)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-05/brag-bot",
     "resumo": "A cola entre a interface e o flow: a rota Express no servidor SSR e o serviço Angular que a consome.",
     "fluxo": [
      "<code>src/server.ts</code>: <code>express.json()</code>, <code>express.static</code> do build do browser (sem index) e, antes do handler do Angular, <code>app.post('/api/brag', ...)</code>: lê <code>definition</code>, responde 400 <code>{ error: 'Definition is required' }</code> se for falso, chama <code>bragGeneratorFlow({ definition })</code> e devolve <code>res.json(result)</code>; no <code>catch</code>, <code>console.error</code> e 500 <code>{ error: 'Failed to generate brag' }</code>. O último <code>app.use</code> entrega ao <code>AngularNodeAppEngine</code>, e <code>reqHandler</code> é exportado para o CLI.",
      "<code>src/app/services/brag.service.ts</code>: <code>generateBrag</code> liga o loading e faz <code>http.post('/api/brag', { definition })</code>; mapeia <code>businessImpact</code> para <code>impact</code>, junta <code>metrics</code> em string com vírgulas, usa <code>technologiesUsed</code> como <code>technologies</code> e adiciona o novo item no topo da lista (<code>brags.update</code>). No erro, só <code>console.error</code> e desliga o loading.",
      "Fluxo ponta a ponta: <code>dashboard.component.ts</code> chama o serviço, o serviço chama <code>/api/brag</code>, a rota chama o flow, o flow chama o Gemini, e a lista de cards e a tela de detalhe reagem ao signal."
     ],
     "rodar": [
      "Com <code>GOOGLE_API_KEY</code> no <code>.env</code>: <code>npm start</code>, abra http://localhost:4200, descreva uma conquista e clique em «Destilar Conquista». Não executei com chave real.",
      "Sem chave dá para exercitar a rota: <code>npm run build</code>, <code>PORT=4055 node dist/brag-bot/server/server.mjs</code> e <code>curl -X POST localhost:4055/api/brag -H 'Content-Type: application/json' -d '{}'</code>. Verifiquei: <code>{}</code> responde 400, e <code>definition</code> como objeto responde 500, porque o flow rejeita o tipo."
     ],
     "armadilhas": [
      "Validação rasa: a rota só checa se <code>definition</code> é «verdadeiro». Um objeto ou número passa e acaba em 500 (verifiquei), em vez de 400. Não há limite de tamanho, autenticação nem limite de uso: qualquer cliente que alcance o servidor gasta a cota da chave (risco que a apostila menciona em termos de custo e segurança).",
      "A UI não tem estado de erro: se a API falhar, o botão volta ao normal e nada é mostrado ao usuário (só <code>console.error</code>), apesar de a aula tratar o erro no servidor.",
      "O <code>onSubmit()</code> do dashboard limpa o campo (<code>this.prompt = ''</code>) logo depois de chamar o serviço, antes de a resposta chegar: se a API falhar, o texto digitado se perde e nenhum erro aparece.",
      "O serviço aceita resposta sem <code>id</code> (<code>crypto.randomUUID()</code> de reserva): dupla geração de id no servidor e no cliente.",
      "O comentário JSDoc do <code>server.ts</code> é o do scaffold do Angular CLI e descreve exemplos de API que o arquivo agora implementa."
     ]
    }
   ]
  },
  {
   "id": "D5-17",
   "bloco": "d05-b5",
   "mod": "Live · 30/09/2026",
   "emoji": "🔎",
   "read": "11 min",
   "title": "Live SEO, GEO e AEO: ser encontrado por buscadores, IAs e redes sociais",
   "short": "Quatro frentes que se reforçam: SEO clássico, dados estruturados, conteúdo pronto para IAs (GEO/LLMO) e performance com compartilhamento social.",
   "oneliner": "SEO, GEO e AEO são <b>quatro frentes que se reforçam</b>: <b>SEO clássico</b> (rastreamento, indexação e on-page), <b>dados estruturados</b> (base de AEO e GEO), <b>GEO/LLMO</b> (conteúdo pronto para IAs) e <b>performance e compartilhamento social</b>. Cada prática vem de projetos reais, o Awesome You e o Lagune.ai.",
   "vovo": [
    "Pense numa loja de bairro. SEO clássico é ter a placa na rua certa e o endereço no mapa (o buscador te acha). Dados estruturados são a ficha técnica colada em cada produto, em formato que máquina lê. GEO é deixar na entrada um folheto curto e limpo que a IA possa ler e citar sem errar o seu nome. Performance e redes sociais são a vitrine que abre rápido e aparece bonita quando alguém compartilha o endereço.",
    "A ideia da live é que as quatro coisas se ajudam: a ficha técnica ajuda o mapa e o folheto, e a vitrine rápida ajuda os dois."
   ],
   "oque": [
    "<b>Origem das práticas:</b> o estudo parte das métricas e observações de SEO, GEO e AEO do <b>Awesome You</b> e da <b>Lagune.ai</b>, apresentadas na live (30/09/2026, professores Aurélio Oliveira e Weslley Araújo; curadoria do material por Weslley Araújo). O README avisa: cada abordagem é uma prática real desses projetos, inspiração para adaptar, não recomendação absoluta. Ambos são públicos e open source, e dá para explorá-los com o Gitingest.",
    "<b>1. SEO técnico (rastreamento e indexação):</b> <code>robots.txt</code> com liberação total e link para o sitemap (funciona porque todo o conteúdo é público; com áreas privadas ou preview, gerencie o que é rastreado); meta robots <code>index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1</code>; sitemap XML com prioridade por nível (home 1.0, <code>/docs</code> 0.9 e assim por diante) e <code>lastmod</code> (o Google se guia pelo <code>lastmod</code> e costuma ignorar <code>priority</code> e <code>changefreq</code>); <code>llms.txt</code> e <code>llms-full.txt</code> dentro do sitemap; URLs canônicas com forma única e sem barra final; build que falha com qualquer link, âncora ou link Markdown quebrado; datas de publicação e modificação vindas do primeiro e do último commit do arquivo, usadas como sinal de frescor.",
    "<b>2. SEO on-page:</b> título por página no formato palavra-chave mais marca; meta description por página (controla o snippet e influencia o CTR); meta keywords com impacto praticamente nulo no Google; idioma e localidade (<code>lang</code>, <code>og:locale</code>, <code>inLanguage</code>); um único H1 e hierarquia H2/H3, com linkagem interna por TOC, sidebar, paginação e rodapé; clusters de conteúdo por intenção (glossário, paper metodológico, comparação com concorrentes) para buscas informacionais e comparativas.",
    "<b>3. Dados estruturados (Schema.org em JSON-LD):</b> blocos com <code>@id</code> estáveis que se referenciam, formando um <b>grafo de entidades</b> (<code>#author</code>, <code>#organization</code>, <code>#website</code>, <code>#software</code>). Tipos: <code>Person</code> (E-E-A-T), <code>Organization</code> com <code>disambiguatingDescription</code> para não ser confundida com um nome parecido, <code>WebSite</code> (nome do site na SERP), <code>SoftwareApplication</code> (categoria, oferta gratuita, <code>featureList</code>), <code>HowTo</code> (5 passos), <code>FAQPage</code>, <code>BreadcrumbList</code>, <code>TechArticle</code> e <code>ScholarlyArticle</code>, <code>WebPage</code>.",
    "<b>Ressalvas do próprio material sobre rich results:</b> o rich result visual de HowTo foi descontinuado pelo Google, mas a marcação segue útil para AEO; o rich result de FAQ hoje é restrito pelo Google a sites de governo e saúde, e o maior ganho está em featured snippets, «As pessoas também perguntam», assistentes de voz e respostas de IA que extraem o par pergunta e resposta.",
    "<b>4. GEO/LLMO:</b> <code>llms.txt</code> gerado no build (resumo do produto e lista de docs com link <code>.md</code> e descrição); <code>llms-full.txt</code> com todo o corpus em um arquivo (ideal para assistentes de código e RAG); <b>twins Markdown</b> de cada página na URL com sufixo <code>.md</code>, com cabeçalho <code>Canonical:</code> e <code>Last updated:</code>; <code>&lt;link rel=\"alternate\" type=\"text/markdown\"&gt;</code> nas docs; boas-vindas nominais a robôs de IA no <code>robots.txt</code> (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended e outros); conteúdo desenhado para citação, com definições diretas e frases-resumo autocontidas; descrições escritas para NLP parsing no Awesome You (entidades e relações extraídas do texto).",
    "<b>5. AEO:</b> não é uma prática nova, é a leitura das anteriores pelo papel nos motores de resposta: FAQPage e FAQ renderizado com perguntas reais, HowTo com passos numerados, descrições autocontidas (frontmatter e <code>featureList</code>) e snippets sem limite de tamanho, para servir o conteúdo como resposta direta sem exigir clique.",
    "<b>6. SMO:</b> Open Graph completo (<code>og:type</code>, <code>og:site_name</code>, <code>og:locale</code>, <code>og:url</code>, título, descrição, <code>og:image</code> com <code>secure_url</code>, 1280x640 e <code>alt</code> por página) e Twitter Card <code>summary_large_image</code>, com imagem social padrão para páginas sem imagem própria. Uma página <code>/share</code> com QR code leva o público de eventos direto ao repositório.",
    "<b>7. Performance e Core Web Vitals:</b> critical CSS inline na home (melhora FCP e LCP); só WOFF2; imagens WebP com <code>srcset</code>, <code>fetchpriority=\"high\"</code> e <code>loading=\"eager\"</code> na imagem ativa e carregamento adiado nas demais; shader pesado carregado sob demanda e rodando em worker com OffscreenCanvas (ajuda INP e TBT); cache HTTP agressivo (assets imutáveis por 1 ano, imagens 30 dias, HTML 1 hora); site estático pré-renderizado (SSG), para que robôs que não executam JavaScript, a maioria dos robôs de IA, leiam todo o conteúdo e o JSON-LD."
   ],
   "como": [
    "Começar pelo rastreamento: <code>robots.txt</code> coerente, sitemap com <code>lastmod</code>, canônicas e build que quebra com link inválido.",
    "Definir título e description por página e uma hierarquia H1/H2/H3 clara, com linkagem interna.",
    "Modelar as entidades (pessoa, organização, site, produto) em JSON-LD com <code>@id</code> estáveis e ligar os tipos entre si.",
    "Gerar no build o <code>llms.txt</code>, o <code>llms-full.txt</code> e o espelho Markdown de cada página, anunciando o espelho com <code>rel=\"alternate\"</code>.",
    "Declarar Open Graph e Twitter Card com dimensões e <code>alt</code>, e medir LCP, INP e TBT (critical CSS, imagens responsivas, cache, pré-renderização)."
   ],
   "aplica": [
    "Documentação de produto ou de projeto open source que precisa ser citada corretamente por buscadores e por IAs.",
    "Site estático pré-renderizado: tudo já está no HTML, o que é a condição para robôs de IA que não executam JavaScript.",
    "Projeto com nome ambíguo: <code>Organization</code> com <code>disambiguatingDescription</code> evita a confusão (o caso da Lagune com a «Laguna AI»).",
    "Ligação com o resto da disciplina: <a href=\"#D5-04\">HTML semântico e acessibilidade</a> ajudam a hierarquia e a leitura por máquina, e a <a href=\"#D5-06\">revisão visual no DevTools</a> pode ser estendida a LCP e INP. A <a href=\"#D5-16\">live Safer</a> usa o mesmo Lagune."
   ],
   "pros": [
    "Dados estruturados e Markdown limpo diminuem a alucinação da IA e garantem a atribuição correta, com URL oficial e data.",
    "Muitas práticas são automáticas no build (llms.txt, twins Markdown, datas do Git, canônicas, link quebrado), então não dependem de lembrança humana.",
    "As frentes se reforçam: o mesmo FAQ ou HowTo serve SEO, AEO e GEO."
   ],
   "contras": [
    "Várias marcações têm efeito limitado hoje: o Google ignora meta keywords, <code>priority</code> e <code>changefreq</code>, o rich result de HowTo foi descontinuado e o de FAQ é restrito.",
    "O material descreve práticas de dois projetos específicos (conteúdo todo público, site estático em inglês); não são recomendação absoluta.",
    "O README não traz medições antes e depois; os ganhos descritos como «na ponta» são os esperados, não resultados medidos (não verifiquei)."
   ],
   "traps": [
    "Copiar o <code>robots.txt</code> de liberação total em projeto com áreas privadas, ambientes de preview ou rotas sem valor de busca.",
    "Marcar FAQ ou HowTo esperando o rich result visual no Google, que hoje não aparece na maioria dos sites.",
    "Publicar <code>llms.txt</code> sem o espelho <code>.md</code> das páginas, deixando a IA com HTML ruidoso.",
    "Renderizar conteúdo e JSON-LD só no cliente: robôs que não executam JavaScript não veem nada.",
    "Declarar <code>og:image</code> sem dimensões e <code>alt</code>, o que atrasa ou recorta o preview."
   ],
   "tip": "O diretório da live tem só o README (extenso, curadoria de Weslley Araújo), sem código nem slides: as práticas vêm do código aberto do Awesome You e da Lagune.ai. Para aplicar, explore esses repositórios (por exemplo, com o Gitingest) e adapte ao seu projeto. O Lagune desta live é o mesmo da live Safer.",
   "cola": [
    [
     "SEO",
     "Otimização para mecanismos de busca tradicionais, como o Google"
    ],
    [
     "GEO / LLMO",
     "Otimização para motores generativos (ChatGPT, Perplexity, Claude); no material, LLMO é tratado como equivalente ao GEO"
    ],
    [
     "AEO",
     "Otimização para motores de resposta, que entregam a informação pronta em vez de uma lista de links"
    ],
    [
     "SMO",
     "Otimização para o compartilhamento em redes sociais (Open Graph e Twitter Cards)"
    ],
    [
     "JSON-LD",
     "JSON para dados interligados; o formato em que o Schema.org é embutido na página"
    ],
    [
     "llms.txt / llms-full.txt",
     "Mapa curado do site para LLMs; versão com todo o corpus em um único arquivo"
    ],
    [
     "Twin Markdown",
     "Espelho da página em Markdown limpo, na mesma URL com sufixo <code>.md</code>"
    ],
    [
     "E-E-A-T",
     "Experiência, especialidade, autoridade e confiança: critérios do Google de qualidade"
    ],
    [
     "SERP / CTR",
     "Página de resultados do buscador / taxa de cliques"
    ],
    [
     "LCP / INP / TBT / FCP",
     "Métricas de carregamento e interação (maior elemento, resposta a interação, bloqueio da thread principal, primeiro conteúdo)"
    ],
    [
     "SSG",
     "Site estático com todas as páginas geradas no build"
    ]
   ],
   "links": [
    [
     "Live SEO, GEO e AEO no repositório do curso (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-09-30"
    ],
    [
     "Awesome You",
     "https://awesomeyou.io"
    ],
    [
     "Lagune.ai",
     "https://lagune.ai"
    ],
    [
     "Gitingest",
     "https://gitingest.com/"
    ]
   ]
  }
 ]
});
