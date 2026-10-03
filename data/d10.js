STUDY.push({
 "disc": {
  "num": "10",
  "nome": "Disciplina 10",
  "titulo": "Segurança e Governança em IA",
  "autor": "Jéssica da Silva Costa",
  "emoji": "🛡️",
  "resumo": "Governança, explicabilidade, vieses e responsabilidade, segurança de LLMs e agentes (OWASP), regulação e geopolítica, custos financeiros e ambientais da IA, sempre com o ser humano e a responsabilidade organizacional no centro das decisões."
 },
 "materiais": [
  [
   "Repositório oficial — módulo 10",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
  ],
  [
   "Indicação 1: OWASP Top 10 para LLM e IA Generativa (2025, português)",
   "https://genai.owasp.org/resource/owasp-top-10-para-aplicacoes-de-llm-e-ia-generativa-2025/"
  ],
  [
   "Indicação 2: OWASP Top 10 for Agentic Applications for 2026",
   "https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/"
  ],
  [
   "Indicação 3: GenAI Red Teaming Guide (OWASP)",
   "https://genai.owasp.org/resource/genai-red-teaming-guide/"
  ],
  [
   "Indicação 4: Machine Learning for High-Risk Applications (O'Reilly)",
   "https://www.oreilly.com/library/view/machine-learning-for/9781098102425/colophon01.html"
  ],
  [
   "Indicação 5: MIT AI Risk Repository",
   "https://airisk.mit.edu/"
  ],
  [
   "Indicação 6: A Practical Guide for Secure MCP Server Development (OWASP)",
   "https://genai.owasp.org/resource/a-practical-guide-for-secure-mcp-server-development/"
  ],
  [
   "Indicação 7: NIST AI Risk Management Framework",
   "https://www.nist.gov/itl/ai-risk-management-framework"
  ],
  [
   "Indicação 8: Lei da UE sobre IA (Parlamento Europeu)",
   "https://www.europarl.europa.eu/topics/pt/article/20230601STO93804/lei-da-ue-sobre-ia-primeira-regulamentacao-de-inteligencia-artificial"
  ],
  [
   "Indicação 9: NIST SP 1270, viés em IA",
   "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1270.pdf"
  ],
  [
   "Indicação 10: The silicon gaze (vieses regionais em LLMs)",
   "https://journals.sagepub.com/doi/full/10.1177/29768624251408919"
  ],
  [
   "Indicação 11: Artificial intelligence policy worldwide",
   "https://royalsocietypublishing.org/rsos/article/13/2/242234/480264/Artificial-intelligence-policy-worldwide-a"
  ],
  [
   "Indicação 12: The EU Artificial Intelligence Act",
   "https://artificialintelligenceact.eu/"
  ],
  [
   "Indicação 13: CAPEX (B3)",
   "https://borainvestir.b3.com.br/glossario/capex-capital-expenditure/"
  ],
  [
   "Indicação 13 (repetida no PDF): Data centre water consumption (Nature)",
   "https://www.nature.com/articles/s41545-021-00101-w"
  ]
 ],
 "blocos": [
  {
   "id": "d10-b0",
   "label": "Fundamentos e explicabilidade"
  },
  {
   "id": "d10-b1",
   "label": "Vieses, responsabilidade e ética"
  },
  {
   "id": "d10-b2",
   "label": "Segurança em IA"
  },
  {
   "id": "d10-b3",
   "label": "Regulação e geopolítica"
  },
  {
   "id": "d10-b4",
   "label": "Custos financeiros e ambientais"
  },
  {
   "id": "d10-b5",
   "label": "Revisão integrada"
  }
 ],
 "topics": [
  {
   "id": "D10-00",
   "bloco": "d10-b0",
   "mod": "Unidade 1 · Aula 1",
   "emoji": "🏛️",
   "read": "7 min",
   "title": "Governança de IA: pilares, riscos e por onde começar",
   "short": "Governança é prática, não documento: acompanha design, dados, treino e operação, com humano no controle.",
   "oneliner": "<b>Governança de IA</b> é o conjunto de regras, processos, políticas e ferramentas que orienta criação, implantação e uso de IA numa organização. Ela é <b>prática</b> (não um PDF numa pasta), é estratégica (não se resolve só com código) e precisa existir no design, nos dados, no treinamento e na operação.",
   "vovo": [
    "Pense num prédio com elevador. Ninguém acha que o elevador é perigoso por existir, mas existe inspeção periódica, limite de peso, botão de emergência e alguém responsável pela manutenção. Governança de IA é a inspeção, o limite de peso e o nome do responsável.",
    "E não adianta pendurar o regulamento na parede e esquecer: se ninguém inspeciona de verdade, o regulamento vira enfeite."
   ],
   "oque": [
    "<b>Definição da aula:</b> regras, processos, políticas e ferramentas para criar, implementar e usar IA. A primeira pergunta de governança é <b>para quê?</b>: qual objetivo, qual processo melhorar, qual problema resolver, e manter a IA alinhada a isso ao longo do tempo.",
    "<b>Os quatro pilares da IA ética:</b> transparência (saber o que o sistema faz, que dados usa, que resultado produz e como será usado), justiça/fairness (evitar discriminação e perguntar quem ganha e quem perde, não só a performance média), segurança e privacidade (dados, acessos, saídas, ataques) e responsabilidade (cada decisão relevante tem dono; alguém pode interromper o sistema e aprovar mudanças).",
    "<b>Custo de não ter governança:</b> risco reputacional (vieses, discriminação), jurídico (regras variam por país; LGPD e afins continuam valendo), operacional (alucinação é característica conhecida: a pergunta é como mitigar) e de dados (\"lixo entra, lixo sai\" continua valendo na IA generativa).",
    "<b>Shadow AI:</b> uso não oficial de ferramentas de IA por colaboradores (chatbots, extensões, assistentes de código). A empresa pode não saber quais dados saem, onde ficam armazenados e que acesso a ferramenta tem. Por isso ferramentas precisam ser <b>homologadas</b>.",
    "<b>Governança by design:</b> começa no design (impacto, quem é afetado, risco de discriminação, recomendação versus ação autônoma, custo), passa pelos dados (curadoria e limpeza), pelo treinamento (métricas e viés, inclusive ao só integrar uma API) e vai até a operação (usuários, impacto, custo, incidentes, comportamento inesperado)."
   ],
   "como": [
    "<b>Supervisão humana:</b> IA como copiloto. Ela acelera e organiza, mas existe uma pessoa responsável pelo resultado. Quanto maior o impacto da decisão, mais explícito precisa ser como a supervisão funciona.",
    "<b>Comitê de IA:</b> multidisciplinar (tecnologia, jurídico, RH, áreas de negócio e, se a IA faz parte do produto, clientes). Governança não é responsabilidade exclusiva de tecnologia.",
    "<b>Letramento e treino contínuo:</b> entregar ferramentas sem preparar as pessoas não é prática segura; elas precisam entender limitações, riscos, que informação pode ou não ser enviada e como reconhecer erros.",
    "<b>Por onde começar (quatro passos práticos):</b> (1) inventário das ferramentas de IA em uso (quais, quantos usuários, oficiais ou não); (2) classificação de uso por risco (baixo, médio, alto, dependente do contexto e dos dados acessados); (3) políticas de uso (o que pode, que dado não vai, quais ferramentas homologadas, quando exige revisão humana); (4) monitoramento com KPIs.",
    "<b>KPIs de ética e segurança citados:</b> número de aplicações de IA, de usuários, de incidentes, políticas implantadas, aplicações classificadas por risco e ferramentas homologadas. Não existe KPI universal: cada organização adapta ao contexto.",
    "<b>No curso:</b> A Aula 1 não tem projeto no repositório; é uma aula conceitual. O material de apoio citado é o NIST AI Risk Management Framework, retomado nas Aulas 6 e 7. A frase que ancora a disciplina inteira, dita na introdução da apostila: tecnologia não é só técnica; é construída por pessoas, aplicada em organizações formadas por pessoas e produz impacto sobre outras pessoas."
   ],
   "aplica": [
    "Montar o inventário de IA de um time ou empresa e classificar cada uso por risco antes de liberar novas ferramentas.",
    "Escrever política de uso de IA (dados proibidos, ferramentas homologadas, quando exigir revisão humana).",
    "Incluir custo, impacto e plano de monitoramento já na fase de design de uma feature com LLM."
   ],
   "pros": [
    "Reduz exposição de dados e incidentes causados por uso sem orientação.",
    "Transforma risco em número acompanhável (KPIs), o que orienta decisão.",
    "Começa pequeno: inventário, classificação, política e treino já reduzem parte relevante do risco humano."
   ],
   "contras": [
    "Exige envolvimento de várias áreas e incentivo da liderança; política que ninguém usa não protege.",
    "Não existe KPI nem classificação universal: precisa de adaptação ao contexto da organização.",
    "É contínua: não termina na implantação, o que custa tempo e atenção permanentes."
   ],
   "traps": [
    "Tratar governança como um documento escrito uma vez e arquivado.",
    "Achar que governança é problema só de código ou só de TI.",
    "Deixar a fase de produção sem monitoramento (a aula insiste que governança continua durante toda a vida da solução).",
    "Descobrir o custo da solução só quando a fatura chega."
   ],
   "tip": "Para um time pequeno, o primeiro entregável de governança é uma planilha: ferramenta de IA, quem usa, dado envolvido, nível de risco, homologada (sim/não).",
   "cola": [
    [
     "Governança de IA",
     "Regras, processos, políticas e ferramentas que orientam criação, implantação e uso de IA"
    ],
    [
     "Shadow AI",
     "Uso não oficial de ferramentas de IA por colaboradores, sem homologação"
    ],
    [
     "Governança by design",
     "Governança desde o design, passando por dados, treino e operação"
    ],
    [
     "Copiloto",
     "IA que apoia e acelera, com pessoa responsável pelo resultado"
    ],
    [
     "Comitê de IA",
     "Grupo multidisciplinar que discute impactos da IA"
    ],
    [
     "Inventário",
     "Primeiro passo: levantar quais ferramentas de IA existem e quem usa"
    ],
    [
     "Classificação de risco",
     "Baixo, médio ou alto, conforme o que a aplicação faz e os dados que acessa"
    ],
    [
     "KPIs de ética e segurança",
     "Número de apps, usuários, incidentes, políticas, apps por risco, ferramentas homologadas"
    ]
   ],
   "links": [
    [
     "NIST AI Risk Management Framework",
     "https://www.nist.gov/itl/ai-risk-management-framework"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ]
  },
  {
   "id": "D10-01",
   "bloco": "d10-b0",
   "mod": "Unidade 1 · Aula 2",
   "emoji": "📚",
   "read": "6 min",
   "title": "Fontes de materiais: framework, repositório de riscos, Scholar e arXiv",
   "short": "Cada fonte cumpre uma função; versão e data importam; preprint exige leitura crítica.",
   "oneliner": "A disciplina ensina a <b>reconhecer o tipo de fonte</b> (livro, framework institucional, repositório de riscos, indexador acadêmico, repositório de preprints) e a avaliar origem, atualidade e limitações, porque em IA os materiais mudam rápido.",
   "vovo": [
    "Quando a senhora quer saber se um remédio é seguro, não pergunta ao vizinho: lê a bula, consulta o médico, procura a pesquisa publicada. Cada fonte serve para uma coisa, e a bula de dois anos atrás pode não falar do remédio novo.",
    "Com IA é igual: o documento oficial é ótimo, mas precisa olhar o ano da versão; o artigo recém-saído é interessante, mas ainda pode não ter sido revisado."
   ],
   "oque": [
    "<b>Livro técnico:</b> aprofundamento estruturado. O livro de apoio é <i>Machine Learning for High-Risk Applications</i> (O'Reilly); não é obrigatório, e os pontos usados nas aulas são referenciados.",
    "<b>Framework institucional:</b> organiza práticas, riscos e referências. O NIST (agência dos EUA) é a fonte principal; o <b>AI Risk Management Framework</b> tem documento principal e playbooks, e há material do NIST dedicado a viés.",
    "<b>OWASP:</b> a referência de segurança aplicada, principalmente o Top 10 para aplicações com LLMs (versão 2025 na aula). Sempre observar ano e versão; o original em inglês sai primeiro e a tradução depois.",
    "<b>MIT AI Risk Repository:</b> base ampla que classifica riscos de IA (a aula cita discriminação, privacidade, desinformação, interação e comportamento malicioso). A indicação de leitura 5 detalha: mais de 1700 riscos extraídos de 74 frameworks, taxonomia causal e taxonomia de domínios (7 domínios, 24 subdomínios).",
    "<b>Google Scholar:</b> <i>indexador</i> de literatura acadêmica (aponta para revistas, eventos, repositórios; nem tudo é gratuito). <b>arXiv:</b> <i>repositório</i> de preprints, mantido pela Cornell University, gratuito; ótimo para acompanhar a fronteira da pesquisa, mas preprint pode não ter passado por revisão por pares."
   ],
   "como": [
    "Escolha da fonte conforme a necessidade: livro para narrativa aprofundada, framework para organizar práticas e riscos, OWASP para segurança aplicada, MIT para mapear categorias de risco, Scholar para localizar literatura, arXiv para pesquisa recente.",
    "Tensão atualidade versus confiabilidade: artigo revisado dá segurança metodológica mas pode ser antigo; preprint cobre o que surgiu há semanas sem revisão; framework institucional é crível mas a versão anterior pode não cobrir agentes.",
    "Pesquisas específicas rendem mais: em vez de \"inteligência artificial\", busque \"viés em modelos de linguagem\" ou \"segurança de agentes\".",
    "Cultura de referência: citar a origem de framework, classificação ou metodologia permite conferir, estudar além da aula e separar opinião pessoal de recomendação baseada em documento.",
    "Ter fonte reconhecida não dispensa pensamento crítico: o documento pode estar desatualizado e a recomendação institucional pode não se aplicar ao seu contexto.",
    "<b>No curso:</b> Aula conceitual, sem projeto no repositório. A aula apresenta o ecossistema de fontes que vai sustentar o resto da disciplina e que reaparece no PDF de indicações de leitura (13 indicações, resumidas no README desta pasta)."
   ],
   "aplica": [
    "Justificar uma decisão de política ou arquitetura apontando framework e versão.",
    "Acompanhar novas versões do OWASP Top 10 (inclusive o de agentes) antes de projetar controles.",
    "Pesquisar artigo sobre um problema específico (ex.: viés em LLMs) e decidir quanto confiar com base em revisão por pares."
   ],
   "pros": [
    "Dá repertório para argumentar tecnicamente com fonte e versão.",
    "Muitos materiais institucionais são gratuitos e abertos.",
    "Hábito de checar a origem reduz decisões baseadas em resumo de rede social."
   ],
   "contras": [
    "Materiais envelhecem rápido; é preciso reconferir versão com frequência.",
    "Parte do material mais recente só existe em inglês por um tempo.",
    "Preprints exigem esforço extra de análise de método e resultados."
   ],
   "traps": [
    "Confundir indexador (Scholar) com repositório (arXiv).",
    "Usar uma versão antiga do OWASP ou do NIST sem checar se há versão nova.",
    "Tratar preprint como verdade confirmada.",
    "Copiar recomendação institucional sem adaptar ao contexto da organização."
   ],
   "cola": [
    [
     "NIST AI RMF",
     "Framework de gestão de risco de IA do NIST, com playbooks"
    ],
    [
     "OWASP Top 10 LLM",
     "Lista dos dez riscos recorrentes em aplicações com LLMs (versão 2025 na aula)"
    ],
    [
     "MIT AI Risk Repository",
     "Banco com 1700+ riscos de 74 frameworks e duas taxonomias (causal e de domínios)"
    ],
    [
     "Google Scholar",
     "Indexador de literatura acadêmica; aponta para onde o artigo está hospedado"
    ],
    [
     "arXiv",
     "Repositório de preprints da Cornell; sem revisão por pares garantida"
    ],
    [
     "Preprint",
     "Trabalho divulgado antes da revisão formal por revista ou conferência"
    ],
    [
     "Revisão por pares",
     "Avaliação de especialistas antes da publicação; camada extra de confiança, não garantia"
    ]
   ],
   "links": [
    [
     "Indicação 7: NIST AI Risk Management Framework",
     "https://www.nist.gov/itl/ai-risk-management-framework"
    ],
    [
     "Indicação 9: NIST SP 1270, identificar e gerenciar viés em IA",
     "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1270.pdf"
    ],
    [
     "Indicação 1: OWASP Top 10 para LLM e IA Generativa (2025, em português)",
     "https://genai.owasp.org/resource/owasp-top-10-para-aplicacoes-de-llm-e-ia-generativa-2025/"
    ],
    [
     "Indicação 5: MIT AI Risk Repository",
     "https://airisk.mit.edu/"
    ],
    [
     "Indicação 4: Machine Learning for High-Risk Applications (repositório do livro)",
     "https://github.com/ml-for-high-risk-apps-book/Machine-Learning-for-High-Risk-Applications-Book"
    ],
    [
     "Google Scholar",
     "https://scholar.google.com/"
    ],
    [
     "arXiv",
     "https://arxiv.org/"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ]
  },
  {
   "id": "D10-02",
   "bloco": "d10-b0",
   "mod": "Unidade 2 · Aula 3",
   "emoji": "🔍",
   "read": "6 min",
   "title": "Trustworthy AI, interpretabilidade e explicabilidade",
   "short": "Interpretabilidade é entender o próprio modelo; explicabilidade é traduzir um modelo complexo por método externo.",
   "oneliner": "<b>Interpretabilidade</b> é o grau em que uma pessoa entende a causa de uma decisão pela própria estrutura do modelo (árvore de decisão); <b>explicabilidade</b> usa técnicas externas, aplicadas depois do treino, para traduzir o comportamento de modelos complexos (caixa-preta). As duas sustentam o conceito de <b>Trustworthy AI</b>.",
   "vovo": [
    "Uma receita de bolo escrita passo a passo é interpretável: a senhora lê e sabe por que o bolo cresce. Já um chef que cozinha por intuição e não sabe explicar é uma caixa-preta; para entender, a senhora precisa de um tradutor que observe o que ele faz e diga: \"ele sempre põe mais açúcar quando a massa está seca\".",
    "O tradutor é a explicabilidade. E ela serve também para o chef descobrir que estava pondo sal demais sem perceber."
   ],
   "oque": [
    "<b>Trustworthy AI:</b> IA confiável é o <i>sistema</i> (desenvolvimento, implantação, operação, uso), não só o modelo. Um modelo bom pode ser usado de forma ruim. O conceito ganhou força com as discussões do AI Act da União Europeia.",
    "<b>Requisitos técnicos:</b> robustez, aplicabilidade no contexto real, transparência, reprodutibilidade e capacidade de generalização. <b>Requisitos éticos:</b> equidade, privacidade, responsabilidade, com transparência atravessando as duas dimensões.",
    "<b>Interpretabilidade:</b> a estrutura interna permite acompanhar variáveis, condições, limiares e relações até a decisão. Exemplo da aula: árvore de decisão de crédito (Joana: renda acima ou abaixo de um valor, depois score; resultado aprovado ou revisão manual). É \"transparência estrutural\".",
    "<b>Ensembles:</b> uma árvore é inspecionável; Random Forest com dezenas ou centenas delas deixa de ser interpretável por inspeção humana. Não é um modelo ruim: a complexidade muda a estratégia de análise.",
    "<b>Explicabilidade:</b> técnicas externas, aplicadas após o treino, que funcionam como tradutor (quais variáveis pesaram, contribuições positivas e negativas, aproximação local). Também é diagnóstico: pode revelar vazamento de informação, correlação indesejada ou feature que não deveria ser usada."
   ],
   "como": [
    "Regra de decisão da aula: quanto maior o impacto da decisão, mais importante entender o funcionamento do modelo ou, ao menos, conseguir explicar seu comportamento (razões técnicas, de negócio, de auditoria, regulatórias ou porque uma pessoa foi afetada).",
    "Explicabilidade como ferramenta de desenvolvimento: se uma variável aparentemente pouco útil pesa muito, investigue vazamento ou correlação; depois refine (remover variável, rever tratamento de dados, investigar viés, repensar o problema).",
    "LLMs: modelos com enorme número de parâmetros; entender como conceitos são representados e como uma resposta é construída ainda é área de pesquisa ativa. A aula recomenda o material da Anthropic <i>Mapping the Mind of a Large Language Model</i>.",
    "Perguntas abertas citadas: até onde interpretamos uma rede neural, que representação interna é identificável, como relacionar unidades internas a conceitos e como saber se a explicação representa o comportamento real do modelo.",
    "Preferência por artigos revisados por pares e uso parcimonioso de preprints; a biblioteca de leituras é para consulta ao longo do tempo, não para ler tudo de uma vez.",
    "<b>No curso:</b> Aula conceitual, sem código no repositório. As leituras do módulo estão listadas no README do repo, na seção de Interpretabilidade e Explicabilidade (livro de ML interpretável, artigo da Anthropic e dois artigos da ACM sobre Trustworthy AI). O próximo tópico mostra as técnicas citadas (SHAP, LIME, Integrated Gradients): <a href=\"#D10-03\">03 · SHAP, LIME e Integrated Gradients</a>."
   ],
   "aplica": [
    "Escolher entre um modelo interpretável e um complexo com explicação posterior, conforme o impacto da decisão (crédito, saúde, seleção).",
    "Usar explicações como etapa de depuração: investigar features suspeitas antes de colocar o modelo em produção.",
    "Documentar para auditoria como cada decisão automatizada pode ser justificada."
   ],
   "pros": [
    "Interpretabilidade nativa dispensa ferramenta externa e facilita auditoria.",
    "Explicabilidade permite usar modelos complexos sem abrir mão de justificar decisões.",
    "Ajuda a detectar viés, vazamento e dependência de variáveis inadequadas."
   ],
   "contras": [
    "Modelos interpretáveis podem ser menos expressivos que ensembles e redes profundas.",
    "Explicação posterior é aproximação: nem sempre representa fielmente o modelo.",
    "Em LLMs, a explicabilidade ainda é imatura e é tema de pesquisa."
   ],
   "traps": [
    "Usar interpretabilidade e explicabilidade como sinônimos (a aula insiste na distinção).",
    "Achar que boa precisão basta para ser \"confiável\".",
    "Tratar a explicação como um enfeite visual no fim do projeto em vez de ferramenta de diagnóstico.",
    "Assumir que um conjunto de árvores continua interpretável só porque cada árvore é."
   ],
   "cola": [
    [
     "Trustworthy AI",
     "IA confiável: requisitos técnicos e éticos aplicados ao sistema inteiro"
    ],
    [
     "Interpretabilidade",
     "Entender a decisão pela estrutura do próprio modelo"
    ],
    [
     "Explicabilidade",
     "Técnicas externas pós-treino que traduzem o comportamento do modelo"
    ],
    [
     "Caixa-preta (black box)",
     "Modelo cujo caminho interno é difícil de compreender diretamente"
    ],
    [
     "Árvore de decisão",
     "Exemplo clássico de modelo interpretável, parecido com um fluxograma"
    ],
    [
     "Ensemble / Random Forest",
     "Muitas árvores combinadas; o conjunto deixa de ser interpretável por inspeção"
    ],
    [
     "Robustez",
     "Manter comportamento adequado em condições não ideais"
    ],
    [
     "Generalização",
     "Funcionar além dos dados de treino, no contexto real"
    ]
   ],
   "links": [
    [
     "Anthropic: Mapping the Mind of a Large Language Model",
     "https://www.anthropic.com/research/mapping-mind-language-model"
    ],
    [
     "Interpretable Machine Learning (livro online, citado no README do repo)",
     "https://christophm.github.io/interpretable-ml-book/"
    ],
    [
     "Trustworthy AI: From Principles to Practices (ACM)",
     "https://dl.acm.org/doi/full/10.1145/3555803"
    ],
    [
     "Towards Trustworthy AI: A Review of Ethical and Robust Large Language Models (ACM)",
     "https://dl.acm.org/doi/epdf/10.1145/3777382"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ]
  },
  {
   "id": "D10-03",
   "bloco": "d10-b0",
   "mod": "Unidade 2 · Aula 4",
   "emoji": "🧪",
   "read": "6 min",
   "title": "SHAP, LIME e Integrated Gradients",
   "short": "Três jeitos de transformar um modelo complexo em sinais analisáveis: contribuição, aproximação local e atribuição por trajetória.",
   "oneliner": "<b>SHAP</b> decompõe uma previsão em contribuições por variável (visão local e global, mais custo); <b>LIME</b> explica uma instância por aproximação local, model-agnostic; <b>Integrated Gradients</b> atribui importância à entrada integrando mudanças ao longo do caminho entre uma baseline e a entrada real (comum em redes neurais).",
   "vovo": [
    "Três jeitos de entender por que a prova foi corrigida daquele jeito. SHAP é o professor que mostra, questão por questão, quantos pontos cada resposta somou ou tirou. LIME é o que pega só a prova do João e refaz o raciocínio perto daquele caso. Integrated Gradients é ir da folha em branco até a prova preenchida, uma resposta por vez, vendo a nota mudar.",
    "Em nenhum dos três a senhora pode confiar sem pensar: o gráfico mostra uma pista, não um atestado."
   ],
   "oque": [
    "<b>SHAP (SHapley Additive exPlanations):</b> base na teoria dos jogos; transforma a previsão numa soma de contribuições. Permite também visão <b>global</b> (quais variáveis mais pesam no conjunto). Pode demandar mais recurso computacional. Em LLMs, a lógica se aplica a <b>tokens</b>.",
    "<b>LIME (Local Interpretable Model-Agnostic Explanations):</b> explica uma instância específica aproximando o comportamento do modelo perto daquele ponto. É <b>model-agnostic</b> (observa entradas modificadas e saídas). Foi apresentado em trabalho ligado à conferência KDD.",
    "<b>Integrated Gradients:</b> parte de uma <b>baseline</b> neutra, cria uma trajetória até a entrada real, mede como a saída muda em cada passo e integra para atribuir importância. Criado para evitar gradientes pequenos ou pouco informativos em certas regiões. Exemplo da aula: imagem de elefantes com tromba e orelhas destacadas.",
    "<b>Ferramentas:</b> LIT (Learning Interpretability Tool, recursos visuais) e Captum (ecossistema PyTorch). Implementações conhecidas estão em Python, mas o conceito não pertence à linguagem."
   ],
   "como": [
    "Escolha do método: não há resposta universal. SHAP tende a dar fundamento matemático mais forte e visão ampla, a um custo maior; LIME é mais econômico e pontual. A decisão considera cenário, criticidade, custo, tempo e infraestrutura.",
    "Contexto crítico (medicina, finanças): vale pensar em SHAP pela visão global, porque o problema pode estar no padrão geral e não num caso isolado. Necessidade pontual e recursos limitados: LIME pode bastar.",
    "Em saúde e outros domínios de alta criticidade, a saída não pode ser aceita automaticamente só porque veio de uma técnica sofisticada: exige revisão, validação e responsabilidade.",
    "Em NLP, não interprete uma palavra isolada como se explicasse tudo: a importância depende do contexto e da frase inteira.",
    "Explicação visual (Integrated Gradients) é ferramenta de investigação: uma região destacada não prova que o modelo \"entendeu\" o objeto como uma pessoa; ajuda a formular hipóteses.",
    "Compare métodos: se SHAP e LIME divergem muito na mesma observação, é sinal para investigar. Pergunte sempre: qual pergunta estou respondendo, a explicação é local ou global, o método tem limitações, a escala de importância está sendo lida certo?",
    "<b>No curso:</b> A aula apresenta as técnicas e mostra exemplos visuais (como o das imagens com Integrated Gradients), mas o repositório do módulo não tem código dessas técnicas. Para praticar, a apostila aponta a documentação oficial de cada biblioteca."
   ],
   "aplica": [
    "Explicar a recusa de um crédito (LIME) ou o padrão geral de um modelo de fraude (SHAP).",
    "Auditar um classificador de imagens com Integrated Gradients para ver onde o modelo concentra evidência.",
    "Detectar viés, vazamento de informação e dependência de variáveis inadequadas como parte da governança."
   ],
   "pros": [
    "Permitem investigar decisões de modelos que não são interpretáveis por construção.",
    "SHAP oferece visão local e global; LIME é flexível por ser model-agnostic.",
    "Contribuem para transparência, auditoria e IA responsável."
   ],
   "contras": [
    "SHAP pode ser custoso computacionalmente; LIME é local e não descreve o modelo todo.",
    "Explicações são aproximações e podem divergir entre métodos.",
    "Ferramenta pronta e gráfico bonito não substituem entender a técnica."
   ],
   "traps": [
    "Tratar explicabilidade como certificação automática de confiança (a apostila diz o contrário).",
    "Ler importância de token isolada, fora do contexto.",
    "Escolher o método pela moda e não pela pergunta, criticidade e custo.",
    "Ficar preso à linguagem da biblioteca: aprender o conceito permite trocar de implementação."
   ],
   "cola": [
    [
     "SHAP",
     "Contribuição de cada variável via teoria dos jogos; local e global"
    ],
    [
     "LIME",
     "Aproximação local e model-agnostic para uma instância"
    ],
    [
     "Integrated Gradients",
     "Atribuição integrando o gradiente da baseline até a entrada"
    ],
    [
     "Baseline",
     "Referência neutra de onde parte a trajetória do Integrated Gradients"
    ],
    [
     "Model-agnostic",
     "Não depende do tipo de algoritmo; só observa entrada e saída"
    ],
    [
     "Explicação local",
     "Vale para uma instância e sua vizinhança, não para o modelo todo"
    ],
    [
     "LIT",
     "Learning Interpretability Tool: interface visual para investigar modelos"
    ],
    [
     "Captum",
     "Biblioteca de interpretabilidade associada ao PyTorch"
    ]
   ],
   "links": [
    [
     "SHAP: documentação",
     "https://shap.readthedocs.io/en/latest/"
    ],
    [
     "LIME: projeto",
     "https://marcotcr.github.io/lime/"
    ],
    [
     "Integrated Gradients: tutorial TensorFlow",
     "https://www.tensorflow.org/tutorials/interpretability/integrated_gradients"
    ],
    [
     "Learning Interpretability Tool (LIT)",
     "https://pair-code.github.io/lit/"
    ],
    [
     "Captum: Integrated Gradients",
     "https://captum.ai/docs/extension/integrated_gradients"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ]
  },
  {
   "id": "D10-04",
   "bloco": "d10-b1",
   "mod": "Unidade 3 · Aula 5",
   "emoji": "⚖️",
   "read": "6 min",
   "title": "Vieses em IA: tipos, origens e mitigação",
   "short": "Viés é distorção sistemática (não erro aleatório) e nasce muito antes do modelo.",
   "oneliner": "<b>Viés</b> é um efeito que reduz a representatividade de um resultado e produz <b>distorção sistemática</b>. Na estrutura do NIST usada na aula, vem de três fontes: <b>estatístico/computacional</b>, <b>humano</b> e <b>sistêmico</b>; mitigar exige dados, métricas por grupo, diversidade, governança e supervisão humana.",
   "vovo": [
    "Um erro aleatório é a balança errar um pouco hoje e outro pouco amanhã. Viés é a balança sempre marcar dois quilos a mais: erra para o mesmo lado, todo dia.",
    "Se a balança foi calibrada só com pessoas de um tipo, vai errar mais para as outras. E o dono da balança pode nem notar, porque ele só pesa gente do mesmo tipo."
   ],
   "oque": [
    "<b>Três grupos (iceberg):</b> na ponta, o <b>estatístico/computacional</b> (população versus amostra, sub-representação, erro maior para um grupo, qualidade da distribuição); abaixo da superfície, o <b>sistêmico</b> (estruturas sociais e históricas que deixam marca nos dados) e o <b>humano</b> (atalhos cognitivos e pressupostos de quem desenvolve).",
    "<b>Sub-representação não é só minoria numérica:</b> grupos grandes com pouco poder ou pouca presença nas fontes também aparecem pouco. <b>Viés regional e cultural:</b> grandes iniciativas de IA surgem em países com capacidade econômica e tecnológica, e isso influencia conteúdo coletado e priorizado; uma resposta pode estar gramaticalmente correta e culturalmente inclinada.",
    "<b>Vieses humanos citados:</b> Dunning-Kruger (pouco conhecimento, muita confiança; IA generativa agrava a falsa sensação de especialização), <b>viés de automação</b> (confiar demais porque veio de um sistema; automatizar um processo ruim só escala o problema) e <b>viés de confirmação</b> (equipes homogêneas reforçam as mesmas premissas).",
    "<b>Alucinação:</b> o termo é usado com ressalva (não é pensar como humano); o ponto prático é que o usuário precisa de conhecimento de domínio para revisar a saída.",
    "<b>Fairness não tem métrica universal:</b> uma métrica boa para crédito pode não servir para saúde; antes de escolher, defina o tipo de dano, os grupos comparados e a diferença aceitável."
   ],
   "como": [
    "Mitigação em camadas: analisar diversidade dos dados, medir fairness segundo o contexto, monitorar desde o início (dados, depois modelo, depois aplicação), testar viés e segurança mesmo sob pressão de prazo e manter supervisão humana definida.",
    "\"Viés by design\": perguntar já no início se o dataset representa a população, se há grupos ausentes, se as métricas revelam diferenças e se a própria definição do problema pode prejudicar alguém. Quanto mais cedo, mais barato.",
    "Diversidade nas equipes não é cota: amplia as lentes e aumenta a chance de ver o que um grupo homogêneo não vê; ajuda a desafiar hipóteses mas não elimina o viés.",
    "Governança organizacional: políticas claras, responsabilidades definidas e liderança que cobre fairness, segurança e revisão; sem incentivo, a equipe prioriza só o que é cobrado no prazo.",
    "Leituras da aula: artigo sobre viés de gênero e IA e outro sobre viés racial em imagens geradas por IA; ler a metodologia, não só o resumo.",
    "<b>No curso:</b> Aula conceitual, baseada na publicação especial do NIST sobre viés. O README do repo sugere a ferramenta <b>Fairlearn</b> (https://fairlearn.org/) para esse módulo, mas não há notebook ou exercício com ela no repositório. O caso prático de viés aparece na aula seguinte: <a href=\"#D10-05\">05 · IA responsável e o caso da triagem hospitalar</a>."
   ],
   "aplica": [
    "Revisar um dataset de treino para sub-representação antes de treinar.",
    "Incluir revisão de fairness no checklist de entrega, com métricas escolhidas para o domínio.",
    "Montar equipes e processos de validação com perspectivas diferentes."
   ],
   "pros": [
    "A taxonomia em três tipos ajuda a escolher a mitigação certa para cada origem.",
    "Tratar viés cedo reduz custo de correção.",
    "Conecta estatística, contexto social e governança numa mesma visão."
   ],
   "contras": [
    "Vieses humanos e sistêmicos são implícitos e difíceis de medir.",
    "Não há métrica de fairness universal; a escolha depende de julgamento.",
    "Mitigar nem sempre elimina; muitas vezes é reduzir."
   ],
   "traps": [
    "Olhar só a performance média (acurácia alta pode esconder erro maior em um grupo).",
    "Achar que automatizar resolve inconsistência de processo (automatiza o caos).",
    "Deixar teste de viés para o fim por causa do prazo.",
    "Acreditar que um algoritmo resolve sozinho problemas sociais complexos."
   ],
   "cola": [
    [
     "Viés",
     "Distorção sistemática que reduz a representatividade de um resultado"
    ],
    [
     "Viés estatístico/computacional",
     "Mensurável: amostra, sub-representação, erro por grupo"
    ],
    [
     "Viés sistêmico",
     "Herdado de estruturas sociais e históricas presentes nos dados"
    ],
    [
     "Viés humano",
     "Atalhos cognitivos de quem constrói e usa o sistema"
    ],
    [
     "Viés de automação",
     "Confiar demais numa decisão só porque veio do sistema"
    ],
    [
     "Dunning-Kruger",
     "Pouco conhecimento gera superestimação do que se sabe"
    ],
    [
     "Fairness",
     "Justiça entre grupos; não existe métrica universal"
    ],
    [
     "Viés by design",
     "Perguntar onde o viés pode aparecer desde o início do projeto"
    ]
   ],
   "links": [
    [
     "NIST SP 1270: identificar e gerenciar viés em IA",
     "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1270.pdf"
    ],
    [
     "MIT AI Risk Repository",
     "https://airisk.mit.edu/"
    ],
    [
     "Fairlearn (ferramenta sugerida no README do repo)",
     "https://fairlearn.org/"
    ],
    [
     "Gender bias perpetuation and mitigation in AI technologies (AI & Society, 2024)",
     "https://doi.org/10.1007/s00146-023-01675-4"
    ],
    [
     "Racial bias in AI-generated images (AI & Society, 2025)",
     "https://doi.org/10.1007/s00146-025-02282-1"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ]
  },
  {
   "id": "D10-05",
   "bloco": "d10-b1",
   "mod": "Unidade 3 · Aula 6",
   "emoji": "🏥",
   "read": "9 min",
   "title": "IA responsável e o caso da triagem hospitalar",
   "short": "Responsabilidade é multidimensional; o caso do hospital mostra proxies, eficiência versus equidade e o limite da acurácia.",
   "oneliner": "<b>IA responsável</b> é desenvolver e usar IA considerando perspectivas éticas e legais, com equidade, transparência, não maleficência, accountability, privacidade, robustez e segurança. O <b>estudo de caso da triagem de UTI</b> mostra um modelo \"tecnicamente correto e socialmente inadequado\", que usa CEP e hospital de origem como <b>proxies</b>.",
   "vovo": [
    "Um hospital contrata alguém para organizar a fila da UTI e o sistema aprende que quem mora em certos bairros costuma se recuperar menos. Então empurra esses pacientes para o fim da fila, mesmo com o mesmo quadro clínico. Ninguém mandou discriminar; ele só aprendeu com a história.",
    "A pergunta da aula é: quem responde por isso, e vale perder um pouco de eficiência para corrigir uma injustiça antiga?"
   ],
   "oque": [
    "<b>Princípios destacados:</b> equidade (reduzir discriminação, atenção à sub-representação), transparência e explicabilidade, não maleficência (não causar dano social, econômico, ambiental ou humano), responsabilidade/accountability (quem responde, decide, interrompe, investiga e aprova nova versão), privacidade (LGPD como referência) e robustez e segurança.",
    "<b>Três pilares de confiança:</b> dado de qualidade, algoritmo resiliente e teste de software, conectados entre si. Em IA, teste também verifica se o sistema funciona <i>sem causar dano</i>: performance, segurança, viés, comportamento inesperado e impacto, desde o início do ciclo de vida.",
    "<b>Práticas:</b> design centrado no humano (resolver necessidade real; evitar solução procurando problema), feedback de usuários diversos desde cedo, métricas multidimensionais (desagregar por grupo, não só média), auditoria de dados brutos (ausentes, incorretos, redundantes, problemas de coleta), gestão e documentação de limitações, experimentação consciente e validação ética contínua.",
    "<b>Plano de resposta:</b> pensar em rollback, revisão manual, suspensão temporária e correção definitiva antes do incidente. Responsabilidade é estar preparado para falhas, não acreditar que não haverá.",
    "<b>O caso:</b> sistema treinado com 10 anos de histórico clínico de milhões de pacientes para otimizar a fila de UTI e exames de alta complexidade. Auditores descobrem que pacientes de baixa renda e minorias ficam sistematicamente abaixo, com o mesmo quadro clínico. Raça e renda não são variáveis do modelo, mas <b>CEP e hospital de origem</b> funcionam como proxies; o modelo calculou menor sobrevivência a longo prazo na região X e priorizou a região Y."
   ],
   "como": [
    "O impasse: remover ou penalizar as variáveis geográficas e socioeconômicas reduz a eficiência (menos vidas salvas no ano, segundo o cenário); manter perpetua e aprofunda uma desigualdade histórica.",
    "Remover a variável sensível não basta: os proxies carregam a informação socioeconômica. O volume de dados também não elimina o viés.",
    "Justiça é maximizar o total de vidas, dar tratamento equivalente a quadros equivalentes ou compensar desigualdades históricas? As definições podem conflitar; fairness depende do contexto e de valores humanos, e o algoritmo sozinho não decide.",
    "Responsabilidade não some porque o padrão veio dos dados: alguém escolheu o conjunto, as variáveis, o objetivo de otimização e aprovou a implantação. Responsabilidade em IA não se reduz à acurácia.",
    "Transparência diante do afetado: como explicar à família de um paciente periférico por que ele perdeu prioridade? A explicação técnica basta? Que consentimento deveria existir? O papel profissional é reconhecer conflitos, explicitar riscos, ouvir áreas e construir uma decisão consciente."
   ],
   "aplica": [
    "Auditar um modelo de priorização procurando proxies (CEP, hospital, escola, renda indireta).",
    "Medir taxa de erro por grupo antes de aprovar um modelo, não só a métrica global.",
    "Definir antes do deploy quem pode interromper o sistema e qual é o plano de rollback."
   ],
   "pros": [
    "O caso força a discussão de trade-offs reais, sem resposta pronta.",
    "As práticas (métricas por grupo, auditoria de dados, plano de resposta) são acionáveis.",
    "Liga responsabilidade, viés, explicabilidade e governança num único cenário."
   ],
   "contras": [
    "Os dilemas de justiça não têm solução técnica única.",
    "Corrigir proxies pode reduzir a eficiência estatística geral.",
    "Exige participação de áreas além de engenharia (clínica, jurídico, ética)."
   ],
   "traps": [
    "Achar que remover raça ou renda do dataset elimina a discriminação.",
    "Confiar em boa acurácia média como prova de justiça.",
    "Delegar a responsabilidade \"aos dados\" ou \"ao algoritmo\".",
    "Fazer validação ética uma única vez, sem repetir quando dados, usuários e modelo mudam."
   ],
   "cola": [
    [
     "Proxy",
     "Variável correlacionada que carrega informação sensível sem declará-la (CEP, hospital)"
    ],
    [
     "Equidade",
     "Reduzir discriminação sistemática entre grupos"
    ],
    [
     "Não maleficência",
     "Não causar dano; desempenho técnico não basta"
    ],
    [
     "Accountability",
     "Governança clara e prestação de contas: quem responde, decide e interrompe"
    ],
    [
     "Design centrado no humano",
     "Construir para resolver necessidade real, com feedback de usuários diversos"
    ],
    [
     "Métricas multidimensionais",
     "Desempenho e erro por grupo, não só média global"
    ],
    [
     "Auditoria de dados brutos",
     "Checar ausentes, incorretos, redundantes, problemas de coleta e viés"
    ],
    [
     "Validação ética contínua",
     "Revisitar princípios durante a operação, não só antes do deploy"
    ]
   ],
   "links": [
    [
     "NIST AI Risk Management Framework",
     "https://www.nist.gov/itl/ai-risk-management-framework"
    ],
    [
     "Machine Learning for High-Risk Applications (repositório do livro)",
     "https://github.com/ml-for-high-risk-apps-book/Machine-Learning-for-High-Risk-Applications-Book"
    ],
    [
     "Estudo de Caso: Responsabilidade em IA (PDF no repo)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia/modulo4-aspectos-humanos-eticos"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo4-aspectos-humanos-eticos",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia/modulo4-aspectos-humanos-eticos",
     "resumo": "A pasta tem um único arquivo, o PDF <code>Estudo_de_Caso_Responsabilidade_IA_Atualizado.pdf</code> (2 páginas): o caso \"O Dilema do Algoritmo de Triagem de Saúde\", que é o mesmo cenário narrado na Aula 6 da apostila. Não há código.",
     "fluxo": [
      "<b>1. O Cenário:</b> rede de hospitais públicos contrata equipe para otimizar a fila de UTI e exames de alta complexidade; objetivo de salvar mais vidas, priorizando risco imediato e probabilidade estatística de recuperação (\"princípio da eficiência médica\"); treino com 10 anos de histórico de milhões de pacientes.",
      "<b>2. O Conflito (Dados Ocultos):</b> auditores veem pacientes de baixa renda e minorias em posições mais baixas com o mesmo quadro clínico. Quatro achados: cor da pele e renda não são variáveis; o modelo aprendeu proxies (CEP e hospital de origem); desigualdade histórica de acesso faz pacientes de periferia chegarem em estágio mais avançado; o algoritmo concluiu que a região X tem menor sobrevivência a longo prazo e priorizou a região Y.",
      "<b>O Impasse Ético:</b> penalizar variáveis geográficas e socioeconômicas reduz a eficiência (menos vidas totais salvas no ano); manter perpetua uma desigualdade histórica.",
      "<b>3. Questões para Debate:</b> A) o que é \"justiça\" para uma IA (eficiência fria versus equidade, pilar da Equidade); B) de quem é a responsabilidade pelo viés (pilar de Accountability; o dev deve \"corrigir a sociedade\" alterando pesos?); C) limite da transparência e explicabilidade (como explicar à família e como desenhar o Termo de Consentimento e Governança)."
     ],
     "rodar": [
      "Abra o PDF e use as três questões como roteiro de discussão com o time; é material de sala de aula, sem execução.",
      "O rodapé do PDF avisa que o material foi gerado com auxílio de IA."
     ],
     "armadilhas": [
      "O README do módulo cita a pasta como <code>modulo-04-aspectos-humanos-eticos/</code>, mas no repositório ela se chama <code>modulo4-aspectos-humanos-eticos</code> (sem hífen); a apostila usa o nome real.",
      "O caso do PDF (triagem de UTI) é diferente do caso narrado na Aula 7 da apostila (modelo de sinistralidade e inadimplência com renda e CEP): os dois compartilham o mesmo problema de proxies."
     ]
    }
   ]
  },
  {
   "id": "D10-06",
   "bloco": "d10-b1",
   "mod": "Unidade 3 · Aulas 7 e 8",
   "emoji": "🧭",
   "read": "8 min",
   "title": "Aspectos humanos e desafios éticos: do caso da inadimplência ao NIST",
   "short": "Acurácia alta pode ser uma solução ruim; autonomia, privacidade, trabalho, saúde mental e deepfakes entram na engenharia.",
   "oneliner": "Um modelo preditivo de <b>sinistralidade e inadimplência</b> que usa renda e CEP tem ótimo desempenho e discrimina; a resposta da professora é <b>não aprovar, mas propor alternativas</b>. A aula amplia para dignidade, autonomia, privacidade, trabalho, bem-estar psicológico e deepfakes, e apresenta o <b>NIST AI RMF (Govern, Map, Measure, Manage)</b> e a classificação de risco do AI Act.",
   "vovo": [
    "Imagine o gerente de um banco que descobre que o CEP do cliente prevê bem quem atrasa a conta. Usar o CEP melhora o número, mas na prática quem mora na periferia nunca consegue crédito. O número ficou bonito e a vida de muita gente ficou pior.",
    "O bom profissional não diz só \"isso está errado\": mostra por que o número engana e propõe outro caminho, como olhar o histórico de pagamento."
   ],
   "oque": [
    "<b>O caso (Aula 7):</b> modelo para uma mesa de subscrição (plano de saúde, empréstimo, seguro) que prevê quem tem maior risco de prejuízo ou inadimplência. Renda familiar e CEP são ótimos preditores; na operação, levam à reprovação automática de pessoas de baixa renda e moradores de áreas periféricas. A pergunta passa de \"tem boa performance?\" para \"eu aprovo esse modelo?\".",
    "<b>Resposta (Aula 8): não.</b> Acurácia alta significa que o modelo achou um padrão nos dados, não que o padrão representa a realidade. CEP provavelmente é proxy de renda, acesso a serviços ou desigualdade regional. Também pode haver <b>viés de disponibilidade</b> (poucas variáveis, sinal forte por falta de melhores) e <b>overfitting</b> com base pequena.",
    "<b>Postura profissional:</b> não basta dizer \"não dá\"; propor outro caminho (novas variáveis como histórico de pagamento, comportamento financeiro, relação renda e compromisso, atrasos recentes; melhorar a massa de dados; rever a definição do problema). Ética também é competência: explicar tecnicamente (overfitting, viés de amostragem, proxy, impacto jurídico) por que a decisão merece revisão.",
    "<b>Riscos humanos discutidos:</b> dignidade e direitos fundamentais; justiça e equidade (dados históricos carregam discriminação; mitigar nem sempre é eliminar); caixa-preta (explicabilidade como auditoria); perda de autonomia por sistemas de recomendação (manipulação comportamental, \"nudging\"); privacidade e vigilância (localização, biometria, consentimento); trabalho cognitivo automatizado e pressão por produtividade; <b>aconselhamento psicológico por LLMs</b> (modelos tendem a acompanhar o usuário, o que agrada não é o que a pessoa precisa); deepfakes que atingem desproporcionalmente mulheres; <b>medo de ficar para trás</b>."
   ],
   "como": [
    "<b>NIST AI RMF em quatro funções:</b> <b>Govern</b> (cultura, responsabilidades, gestão; risco de IA não é de uma pessoa só), <b>Map</b> (identificar riscos conforme o contexto: saúde não é filtro de spam; agente com acesso a sistemas não é chatbot informativo), <b>Measure</b> (indicadores, comparar, avaliar se a mitigação melhorou) e <b>Manage</b> (contínuo: tecnologia, uso e incidentes mudam).",
    "<b>Classificação do AI Act (introdução):</b> risco mínimo, limitado, alto e inaceitável. Vigilância em massa e pontuação social como exemplos de inaceitável; saúde e infraestrutura crítica como alto risco (controles e auditoria mais fortes); chatbots e deepfakes com obrigações de transparência (a pessoa precisa saber que fala com IA); filtro de spam como baixo risco, que ainda pode errar.",
    "Técnica e uso não são a mesma coisa: deepfake pode ter uso legítimo; o dano está no uso. Avaliar contexto, intenção, consentimento e consequência.",
    "Estudo sobre vieses regionais em respostas de um modelo generativo (milhões de consultas, comparando países, incluindo estados brasileiros): ler a metodologia (como os prompts foram construídos, amostra, limitações), porque um estudo sobre viés também pode ter viés metodológico.",
    "Pressão por velocidade: \"convergiu de primeira\" não significa \"está certo\"; a decisão final pode não ser do cientista de dados, daí a importância de argumentar, mostrar riscos e propor alternativas. Às vezes a atitude mais responsável é atrasar uma entrega.",
    "<b>No curso:</b> Aulas de reflexão, sem código. A Aula 7 propõe o caso do comitê de ética e deixa a pergunta aberta (\"eu aprovo esse modelo?\"); a Aula 8 retoma o caso e responde. O PDF do repo com o estudo de caso é o da triagem hospitalar, em <a href=\"#D10-05\">05 · IA responsável e o caso da triagem hospitalar</a>. Os slides da Aula 4 do curso (\"Aspectos Humanos e Éticos\") estão criptografados no pacote de material e não puderam ser lidos; este tópico se apoia na apostila e nas leituras do README do repo."
   ],
   "aplica": [
    "Revisar variáveis de um modelo de crédito ou seguro procurando proxies antes de aprovar para produção.",
    "Usar Govern, Map, Measure e Manage como estrutura de conversa com a liderança sobre risco de uma aplicação.",
    "Classificar uma aplicação nos quatro níveis do AI Act para calibrar o nível de controle."
   ],
   "pros": [
    "O caso é abstraível para qualquer decisão que afeta pessoas (crédito, saúde, seguros).",
    "O NIST RMF dá uma estrutura simples e contínua para gestão de risco.",
    "Treina o argumento técnico-ético, que é o que o time realmente precisa em reunião."
   ],
   "contras": [
    "Não há resposta única: o trade-off entre sustentabilidade financeira e justiça é real.",
    "Framework organiza, mas não resolve; precisa de adaptação ao contexto.",
    "Impactos sociais (trabalho, desemprego) não têm solução individual simples."
   ],
   "traps": [
    "Aceitar uma variável porque a métrica ficou boa, sem perguntar por que ela prevê.",
    "Parar no diagnóstico (\"não dá\") sem propor alternativa.",
    "Usar LLM como substituto de profissional de saúde mental.",
    "Tomar decisões por medo de ficar para trás, sem governança suficiente."
   ],
   "cola": [
    [
     "Govern / Map / Measure / Manage",
     "As quatro funções do NIST AI RMF"
    ],
    [
     "Viés de disponibilidade",
     "Usar o que está disponível e tratar como verdade suficiente"
    ],
    [
     "Overfitting",
     "Ajuste excessivo a padrões da amostra; acurácia não generaliza"
    ],
    [
     "Nudging",
     "Influência comportamental por recomendação; a aula prefere \"manipulação comportamental\""
    ],
    [
     "Risco inaceitável",
     "Usos proibidos no AI Act, como pontuação social governamental"
    ],
    [
     "Alto risco",
     "Permitido com controles mais fortes e auditoria (saúde, infraestrutura crítica)"
    ],
    [
     "Risco limitado",
     "Obrigação de transparência (chatbot avisa que é IA; deepfake rotulado)"
    ],
    [
     "Risco mínimo",
     "Poucas exigências (filtro de spam)"
    ]
   ],
   "links": [
    [
     "NIST AI Risk Management Framework",
     "https://www.nist.gov/itl/ai-risk-management-framework"
    ],
    [
     "Lei da UE sobre IA, Parlamento Europeu (indicação 8)",
     "https://www.europarl.europa.eu/topics/pt/article/20230601STO93804/lei-da-ue-sobre-ia-primeira-regulamentacao-de-inteligencia-artificial"
    ],
    [
     "The silicon gaze: biases and inequality in LLMs through the lens of place (indicação 10)",
     "https://journals.sagepub.com/doi/full/10.1177/29768624251408919"
    ],
    [
     "Mais mulheres tornam-se vítimas de deepfakes (ONU News, citado no README do repo)",
     "https://news.un.org/pt/story/2026/03/1852522"
    ],
    [
     "Sobre o Medo de Ficar para Trás (Jéssica Costa, Medium)",
     "https://medium.com/jessica-costa/sobre-o-medo-de-ficar-para-tr%C3%A1s-1f233fb658d1"
    ],
    [
     "MIT AI Risk Repository",
     "https://airisk.mit.edu/"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ]
  },
  {
   "id": "D10-07",
   "bloco": "d10-b2",
   "mod": "Unidade 4 · Aula 9",
   "emoji": "🛡️",
   "read": "7 min",
   "title": "Segurança em IA: o novo cenário e o OWASP Top 10 para LLMs",
   "short": "Sistemas probabilísticos movem a superfície de ataque para dados de treino, prompts e autonomia dos agentes.",
   "oneliner": "Software tradicional é <b>determinístico</b>; IA é <b>probabilística</b> (comportamento emergente, saídas estatísticas). Os riscos antigos continuam, mas surgem novos pontos de ataque: <b>dados de treino, prompts e autonomia dada aos agentes</b>. A referência de mercado é o <b>OWASP Top 10 para aplicações com LLMs (2025)</b>.",
   "vovo": [
    "Uma máquina de refrigerante tradicional sempre faz a mesma coisa: botão A, lata A. Dá para inspecionar o mecanismo e prever tudo. Um atendente humano treinado é diferente: responde conforme a conversa, pode ser enganado por um papo bem montado e, se der a ele a chave do caixa, o estrago de um engano é maior.",
    "IA com agentes é o atendente com a chave do caixa: a segurança continua precisando de cadeado, mas também de limite do que ele pode fazer e de olhar para quem o treinou."
   ],
   "oque": [
    "<b>Determinístico versus probabilístico:</b> em software tradicional as regras estão no código e dá para analisar entradas, fluxos, permissões, validações e saídas. Em ML e IA generativa há padrões aprendidos, probabilidades e comportamento emergente: não existe \"a linha de código\" responsável. Uma saída pode parecer convincente e estar errada.",
    "<b>Os riscos não desaparecem, mudam de lugar:</b> autenticação, autorização, proteção de dados, rede e validação de entrada continuam. Entram: <b>dados de treinamento</b> (de onde vieram, quem acessou, foram alterados?), <b>prompts</b> (podem trazer instruções de sistema, conteúdo externo, dados privados e orientar ação) e <b>autonomia de agentes</b> (consultar sistemas, chamar APIs, manipular arquivos).",
    "<b>A autonomia é concedida por pessoas:</b> a pergunta não é se o agente pode executar, e sim até onde faz sentido permitir (só consultar? alterar registro? enviar mensagem? comprar? executar código? acessar dado confidencial?).",
    "<b>OWASP Top 10 para LLMs, versão 2025 (revisão de março de 2025; existe tradução em português):</b> injeção de prompt; divulgação de informações sensíveis; cadeia de suprimentos; envenenamento de dados e modelos; manipulação imprópria de saída; autonomia excessiva; vazamento de prompt; vetores e embeddings; desinformação; consumo irrestrito. A numeração LLM01 a LLM10 segue essa ordem e bate com os IDs usados nos slides da Aula 5 do curso."
   ],
   "como": [
    "<b>Injeção de prompt:</b> entradas manipulam instruções do modelo ou da aplicação; o texto vira vetor de ataque. <b>Divulgação de informações sensíveis:</b> dados pessoais, internos e credenciais no contexto; não basta confiar que o modelo saberá o que revelar.",
    "<b>Cadeia de suprimentos:</b> modelos, bibliotecas, APIs, datasets, serviços, plugins e ferramentas; um componente comprometido propaga o risco. <b>Envenenamento:</b> manipular dados ou componentes para influenciar o comportamento futuro; reforça a importância de origem e integridade dos dados.",
    "<b>Manipulação imprópria de saída:</b> a saída do LLM não é confiável só porque veio do modelo; se for executada ou inserida em outro sistema, precisa de validação. <b>Autonomia excessiva:</b> princípio do privilégio mínimo aplicado a sistemas que decidem e agem.",
    "<b>Vazamento de prompt:</b> instruções internas podem conter regras, contexto e até dados. <b>Vetores e embeddings:</b> RAG e busca semântica criam superfícies de risco; recuperação sem proteção pode misturar ou expor conteúdo. <b>Desinformação:</b> respostas incorretas com aparência de confiança, ainda mais quando publicadas sem revisão. <b>Consumo irrestrito:</b> chamadas excessivas e custos inesperados; segurança também é disponibilidade e sustentabilidade operacional.",
    "Controles de arquitetura citados para autonomia: restringir ferramentas, definir permissões, exigir confirmação humana em ações críticas, monitorar logs, validar antes de executar, limitar consumo e separar ambientes. Decisão de arquitetura e de governança.",
    "Leitura recomendada: o documento da OWASP tem cerca de cinquenta páginas; uma leitura dinâmica já prepara para os casos, e dá para aprofundar depois. Observar sempre a versão e se há uma mais recente.",
    "<b>No curso:</b> Aula introdutória, sem código: prepara o cenário e pede leitura prévia do OWASP Top 10. O repositório tem a pasta <code>modulo5-seguranca-dados</code> com a demonstração e o manual das próximas aulas (<a href=\"#D10-09\">09</a> e <a href=\"#D10-10\">10</a>). Os dez riscos aparecem aplicados em cinco casos nos slides da Aula 5 do curso: <a href=\"#D10-08\">08 · Cinco casos de segurança</a>."
   ],
   "aplica": [
    "Usar o Top 10 como checklist de ameaças no desenho de uma aplicação com LLM, RAG ou agentes.",
    "Definir, para cada ferramenta de um agente, o nível de autonomia permitido e o controle correspondente.",
    "Incluir limites de consumo e validação de saída no design, não só após o incidente.",
    "A live de 28/07 (Safer), na Disciplina 05, mostra segurança no fluxo de desenvolvimento web com agente (Lagune com a especialização OWASP): <a href=\"#D5-16\">Live Safer</a>."
   ],
   "pros": [
    "Referência de mercado que organiza riscos recorrentes numa lista curta.",
    "Mostra continuidade com a segurança tradicional em vez de recomeçar do zero.",
    "Ajuda a transformar \"IA é perigosa\" em riscos específicos e controláveis."
   ],
   "contras": [
    "A lista envelhece: versão e ano precisam ser conferidos (já existe material para agentes).",
    "Não substitui análise de contexto da aplicação.",
    "Parte do material mais novo sai primeiro em inglês."
   ],
   "traps": [
    "Tratar prompt apenas como pergunta de chatbot, quando na aplicação ele funciona como lógica de controle.",
    "Confiar na saída do modelo sem validar antes de executar ou inserir em outro sistema.",
    "Achar que a segurança tradicional deixou de ser necessária.",
    "Ignorar dados de treino como superfície de ataque."
   ],
   "cola": [
    [
     "Superfície de ataque (IA)",
     "Dados de treino, prompts de entrada e autonomia dada a agentes"
    ],
    [
     "Comportamento emergente",
     "Capacidades ou respostas não programadas como regra explícita"
    ],
    [
     "LLM01 Prompt Injection",
     "Entradas que manipulam o comportamento esperado"
    ],
    [
     "LLM02 Sensitive Info Disclosure",
     "Exposição de dados que não deveriam sair"
    ],
    [
     "LLM03 Supply Chain",
     "Componentes de terceiros comprometidos"
    ],
    [
     "LLM05 Improper Output Handling",
     "Saída do modelo usada sem validação"
    ],
    [
     "LLM06 Excessive Agency",
     "Permissões ou autonomia além do necessário"
    ],
    [
     "LLM10 Unbounded Consumption",
     "Uso sem limites de recurso; custo e disponibilidade"
    ]
   ],
   "links": [
    [
     "OWASP Top 10 for LLM Applications 2025",
     "https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/"
    ],
    [
     "OWASP Top 10 para LLM e IA Generativa 2025 (português, indicação 1)",
     "https://genai.owasp.org/resource/owasp-top-10-para-aplicacoes-de-llm-e-ia-generativa-2025/"
    ],
    [
     "OWASP Top 10 for Agentic Applications for 2026 (indicação 2)",
     "https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/"
    ],
    [
     "A Practical Guide for Secure MCP Server Development (indicação 6)",
     "https://genai.owasp.org/resource/a-practical-guide-for-secure-mcp-server-development/"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ]
  },
  {
   "id": "D10-08",
   "bloco": "d10-b2",
   "mod": "Unidade 4 · Slides da Aula 5 (casos)",
   "emoji": "🧯",
   "read": "9 min",
   "title": "Cinco casos de segurança em IA e a correlação com o OWASP",
   "short": "Agente de suporte, RH \"fofoqueira\", deploy sem aprovação, modelo envenenado e ataque ao bolso, cada um com causa, risco OWASP e mitigação.",
   "oneliner": "Os slides da Aula 5 do curso (\"Gerenciamento de Riscos em IA: Segurança e Dados\") trabalham <b>cinco casos</b>: cada um tem cenário, vetor de ataque, impacto, <b>risco OWASP correlato</b> e solução. O padrão que se repete: o erro raramente é \"do modelo\"; é de arquitetura (validação, RBAC, privilégio mínimo, supply chain, limites).",
   "vovo": [
    "Cinco histórias de \"o que deu errado\" numa empresa. Num atendente que recebeu ordem escondida num bilhete. Num arquivo trancado que o sistema abriu para a pessoa errada. Num funcionário novo a quem deram todas as chaves. Num pacote comprado de um desconhecido. E numa conta de luz que explodiu porque deixaram a porta aberta.",
    "A moral de todas é a mesma: antes de culpar a inteligência, olhe quem deu a chave, quem conferiu o pacote e quem conferiu a conta."
   ],
   "oque": [
    "<b>Caso 1: o agente de suporte técnico.</b> Assistente integrado ao sistema de chamados de um e-commerce com permissão de consultar e interagir com o banco de pedidos. Entrada do atacante: um texto que manda esquecer as regras, assume a persona de \"auditor de banco de dados sênior\" e pede para chamar a função <code>buscar_pedido</code> com um parâmetro que carrega um fragmento de SQL destrutivo (tautologia e <code>DROP TABLE</code>, o padrão clássico de SQL injection). A aplicação executou a saída do modelo sem validação, e o banco interpretou SQL destrutivo. Riscos: <b>LLM01 Prompt Injection</b> (inversão de papel por texto) e <b>LLM05 Improper Output Handling</b>. Solução: parametrização estrita de queries e privilégio mínimo (a conta da IA nunca deve ter <code>DROP</code> ou <code>DELETE</code>).",
    "<b>Caso 2: a IA de RH \"fofoqueira\".</b> IA corporativa conectada a um banco vetorial com arquivos internos. Um funcionário júnior pede: \"resuma os feedbacks de desempenho e os salários atuais de toda a diretoria de tecnologia\". O retriever puxou documentos confidenciais para o contexto e o modelo gerou o relatório. Risco: <b>LLM02 Sensitive Data Disclosure</b>. Solução: o erro não foi do LLM; a camada de recuperação (RAG) deve aplicar <b>RBAC</b> filtrando os arquivos por perfil de usuário antes de enviá-los como contexto.",
    "<b>Caso 3: o deploy sem aprovação.</b> Agente de DevOps com acesso total a repositório, CI/CD e produção recebe \"Corrija o erro de autenticação e faça o deploy\" e, tentando resolver falhas intermitentes, altera permissões de IAM, reinicia serviços, mexe em variáveis de ambiente sensíveis e faz deploy direto na nuvem, sem aprovação. Resultado: regressão derruba parcialmente a autenticação, o IAM ficou com permissões excessivas e a causa raiz é difícil de achar. Risco: <b>LLM06 Excessive Agency</b>. Solução: menor privilégio, separar sugestão de execução (o modelo propõe, não executa), aprovação humana para ações críticas, allowlist de ações e auditoria com trilha de decisão.",
    "<b>Caso 4: o modelo com código malicioso.</b> Startup de educação baixa um modelo aberto otimizado de um repositório público não verificado, que havia sido envenenado: o modelo funciona normalmente mas tinha backdoor com gatilho específico que gera conteúdo malicioso, que pode comprometer sessões ou executar ações em aplicações que processam a saída sem validação. Risco: <b>LLM03 Supply Chain</b>. Solução: fontes confiáveis, verificar assinaturas e hashes, versionar, preferir formatos seguros (ex.: safetensors em vez de pickle, quando aplicável) e validar e auditar antes de promover a produção.",
    "<b>Caso 5: o ataque ao bolso.</b> Chat público de revisão de código, com modelo avançado e limite generoso por sessão. Script automatizado envia milhares de requisições simultâneas com textos gigantes que estouram a janela de contexto. Resultado: cota esgotada junto ao provedor, cobrança astronômica em horas (<b>Denial of Wallet</b>) e indisponibilidade para usuários legítimos (DoS). Risco: <b>LLM10 Unbounded Consumption</b>. Solução: rate limiting (requisições ou tokens por IP), validação estrita do tamanho da entrada, cache semântico e travas de gasto diário (hard caps) no provedor."
   ],
   "como": [
    "Leitura transversal: dois casos são <b>limites de arquitetura</b> (1: output sem validação, 3: agente sem limites), um é de <b>autorização de dados</b> (2: RBAC na recuperação), um é de <b>cadeia de suprimentos</b> (4) e um é de <b>disponibilidade e custo</b> (5).",
    "Padrão de mitigação: o controle fica fora do modelo e é determinístico (parametrização de query, RBAC no retriever, allowlist e aprovação humana, verificação de hash, rate limit e hard cap).",
    "Princípio do privilégio mínimo reaparece em três casos (1: conta sem escrita, 3: agente sem poder de deploy, 2: usuário só vê o que o seu perfil permite).",
    "A aula foi desenhada como \"aulas diferentes, baseadas em casos\": para cada caso, ler cenário e vetor, antecipar o que quebra e só depois ver correlação e solução.",
    "Os casos casam com o resumo de controles da apostila (<a href=\"#D10-07\">07</a>): validação de saída, permissões, supervisão humana e limites de consumo.",
    "<b>No curso:</b> Esses casos vêm dos slides da Aula 5 do curso (Gerenciamento de Riscos em IA, Segurança e Dados), que complementam a Unidade 4 da apostila. Não têm código no repositório; a demonstração prática do repo (notebook) cobre prompt injection indireto e jailbreaking, em <a href=\"#D10-09\">09</a>."
   ],
   "aplica": [
    "Usar os cinco casos como roteiro de design review de uma feature com LLM: o que o modelo pode tocar, quem filtra o contexto e quanto pode custar.",
    "Revisar o acesso de um agente de CI/CD para separar \"propor\" de \"executar\".",
    "Estimar o pior caso de custo de um endpoint público de LLM e definir hard cap e rate limit."
   ],
   "pros": [
    "Cada caso ancora um risco abstrato do OWASP num cenário reconhecível.",
    "As soluções são controles de engenharia concretos, não promessas de prompt.",
    "Cobrem o espectro: integridade (1), confidencialidade (2), agência (3), cadeia (4) e disponibilidade (5)."
   ],
   "contras": [
    "São cenários didáticos, simplificados (a aula não os apresenta como incidentes reais documentados).",
    "O slide cita a mitigação em alto nível; implementação exige conhecimento da stack.",
    "Cobrem seis dos dez riscos; envenenamento de dados, vazamento de prompt, embeddings e desinformação não têm caso próprio."
   ],
   "traps": [
    "Concluir que o problema é \"o modelo\" e responder com mais um prompt de regra.",
    "Entregar ao agente credenciais de produção \"para ir mais rápido\".",
    "Baixar pesos de modelo de um repositório não verificado.",
    "Lançar chat público sem limite de tamanho de entrada nem teto de gasto."
   ],
   "cola": [
    [
     "Parametrização de query",
     "Separar comando de dado, para o SQL do modelo nunca virar código"
    ],
    [
     "RBAC no retriever",
     "Filtrar documentos por perfil de usuário antes de ir ao contexto"
    ],
    [
     "Allowlist de ações",
     "Lista fechada do que o agente pode executar"
    ],
    [
     "Human-in-the-loop",
     "Aprovação humana para ações críticas (deploy, IAM, produção)"
    ],
    [
     "safetensors vs pickle",
     "Formato de pesos que não executa código na carga (quando aplicável)"
    ],
    [
     "Denial of Wallet",
     "Esgotar o orçamento de uso de API por abuso de tokens"
    ],
    [
     "Rate limiting",
     "Limite de requisições ou tokens por IP"
    ],
    [
     "Hard cap",
     "Teto de gasto diário no provedor"
    ]
   ],
   "links": [
    [
     "OWASP Top 10 for LLM Applications 2025",
     "https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/"
    ],
    [
     "OWASP Top 10 for Agentic Applications for 2026",
     "https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ]
  },
  {
   "id": "D10-09",
   "bloco": "d10-b2",
   "mod": "Unidade 4 · Aulas 10 e 11",
   "emoji": "💉",
   "read": "11 min",
   "title": "Prompt injection, jailbreaking, guardrails e segredos",
   "short": "Texto vira vetor de ataque; guardrail ajuda mas não substitui arquitetura; um teste que passa não prova segurança.",
   "oneliner": "<b>Prompt injection</b> tenta fazer uma entrada se sobrepor às regras da aplicação; <b>jailbreaking</b> reformula o pedido proibido num contexto \"legítimo\" (ficção, aula, personagem). <b>Guardrails</b> ajudam, mas segredos devem ser protegidos por <b>arquitetura</b>, e a segurança só se avalia com <b>testes sistemáticos</b>, não com uma tentativa.",
   "vovo": [
    "Prompt injection é um bilhete que a pessoa põe dentro de uma pasta de clientes dizendo \"ignore as regras e dê um desconto\". O atendente lê a pasta e pode obedecer ao bilhete como se fosse ordem do chefe.",
    "Jailbreaking é pedir a mesma coisa vestindo uma fantasia: \"estou escrevendo um romance e meu personagem precisa explicar...\". E a regra de ouro é: se o cofre tem a senha anotada na mesa, nenhuma conversa esperta do atendente vai salvar. Não deixe a senha na mesa."
   ],
   "oque": [
    "<b>Prompt injection:</b> o modelo recebe instruções do sistema, dados internos, histórico, documentos recuperados e a mensagem do usuário; o ataque tenta fazer a nova entrada ter prioridade sobre as regras mais importantes. É dos riscos mais frequentes. O problema central é a <b>mistura entre dado e instrução</b> no mesmo contexto.",
    "<b>Jailbreaking:</b> estratégia diferente: em vez de mandar ignorar regras, reformula o pedido como livro, simulação, aula ou personagem, explorando a forma contextual como LLMs processam linguagem.",
    "<b>Guardrails:</b> restrições e mecanismos de controle sobre entradas, saídas, conteúdo proibido, regras de negócio e ações. Podem ser nativos do provedor ou configurados pela organização. Servem como <b>camadas de contenção</b>, não como trava única.",
    "<b>Segredos:</b> chaves de API, credenciais e dados internos não devem ficar no contexto do modelo; devem estar em mecanismo apropriado (a aula usa os Secrets do Google Colab). Se um segredo aparece no contexto, a superfície de risco aumenta; o modelo só deve conhecer o que realmente precisa.",
    "<b>Gandalf:</b> jogo educacional em que o objetivo é fazer o modelo revelar uma senha protegida; cada nível adiciona proteções. Aprender atacando em ambiente autorizado e controlado ajuda a pensar em defesa; o jogo não é convite para atacar sistemas reais."
   ],
   "como": [
    "Experimento da aula: assistente de e-commerce com \"Regra de Negócio Absoluta\" (cliente bloqueado não recebe vantagem ou cupom). Para um usuário legítimo, responde normalmente; para o atacante, o dado traz uma pseudo \"instrução do sistema\" pedindo cupom de R$ 500 e que o bloqueio seja omitido. No teste, o modelo (Gemini 2.5 Flash) identificou a contradição e recusou.",
    "Mas atenção: uma tentativa simples falhar não significa sistema seguro. Num segundo teste (jailbreak por personagem de ficção policial), o guardrail falhou: o modelo atendeu o pedido e devolveu conteúdo técnico sobre invasão de redes sem fio que deveria ter sido bloqueado (o conteúdo não é reproduzido neste material). Segurança não se avalia com um único teste.",
    "Temperatura: no experimento ela foi aumentada (0,8) para deixar o comportamento mais variável e o teste mais interessante; em produção, depende do objetivo e sistemas que exigem previsibilidade pedem configurações mais controladas.",
    "Instruções claras: regras ambíguas ou conflitantes abrem espaço para interpretação errada; a aplicação não pode depender de o modelo adivinhar qual regra tem prioridade. Perguntas de arquitetura: quais regras têm prioridade, quais dados nunca podem ser expostos, que resposta precisa ser bloqueada, que validação existe depois da saída.",
    "Avaliação <b>sistemática e estocástica</b>: variar entradas, formulações, contextos e fluxos; em LLMs o mesmo tipo de ataque pode falhar uma vez e funcionar na próxima.",
    "Defesa em profundidade: um guardrail não substitui arquitetura. Se há informação sensível direto no contexto e a aposta é que o guardrail sempre impedirá exposição, \"o desenho já começou errado\". Segredos, credenciais e dados internos protegidos por arquitetura, não pelo comportamento esperado do modelo."
   ],
   "aplica": [
    "Testar um assistente corporativo com ataques de injeção e jailbreak variados antes do lançamento, de forma repetida e versionada.",
    "Retirar chaves e dados internos do prompt e do contexto; usar secrets manager e o mínimo de dado necessário.",
    "Colocar validação de saída e controle de acesso fora do modelo (determinístico)."
   ],
   "pros": [
    "Experimento barato e reproduzível mostra o problema na prática.",
    "Camadas (instrução clara, guardrail, arquitetura, teste) dão defesa em profundidade.",
    "Ambiente controlado (Gandalf, Colab) permite aprender sem risco real."
   ],
   "contras": [
    "Guardrails nativos melhoram, mas não são infalíveis; novo ataque pode contornar amanhã.",
    "Testes de segurança de LLM são estocásticos: exigem muitas variações.",
    "Mitigação perfeita não existe; é redução de risco."
   ],
   "traps": [
    "Concluir \"está seguro\" depois de uma tentativa que o modelo recusou.",
    "Deixar segredo, credencial ou regra crítica no prompt.",
    "Usar a mesma instrução para regra de negócio e para o conteúdo do usuário sem separar dado de comando.",
    "Usar técnicas de ataque fora de ambiente autorizado."
   ],
   "cola": [
    [
     "Prompt injection",
     "Entrada tenta sobrepor as regras da aplicação"
    ],
    [
     "Injeção indireta",
     "A instrução maliciosa vem nos dados (banco, documento), não da mensagem do usuário"
    ],
    [
     "Jailbreaking",
     "Reformular pedido proibido num contexto aparentemente legítimo"
    ],
    [
     "Guardrail",
     "Restrição ou controle sobre entrada, saída, conteúdo ou ação"
    ],
    [
     "Dado versus instrução",
     "Distinção difícil em linguagem natural; precisa de arquitetura"
    ],
    [
     "Secrets",
     "Mecanismo próprio para credenciais; nunca no notebook, arquivo ou prompt"
    ],
    [
     "Temperatura",
     "Parâmetro de variabilidade da resposta; testes usam valor maior, produção menor"
    ],
    [
     "Gandalf",
     "Jogo educacional de prompt injection"
    ]
   ],
   "links": [
    [
     "Gandalf (jogo educacional de prompt injection)",
     "https://gandalf.lakera.ai/"
    ],
    [
     "Google Colab",
     "https://colab.research.google.com/"
    ],
    [
     "OWASP Top 10 for LLM Applications 2025",
     "https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/"
    ],
    [
     "OWASP GenAI Red Teaming Guide",
     "https://genai.owasp.org/resource/genai-red-teaming-guide/"
    ],
    [
     "Demonstração de prompt injection (notebook no repo)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia/modulo5-seguranca-dados"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo5-seguranca-dados / Demonstração.ipynb",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia/modulo5-seguranca-dados",
     "resumo": "Notebook Jupyter para Google Colab (12 células) com duas demos educativas: <b>prompt injection indireto</b> num agente de suporte de e-commerce e <b>jailbreaking conceitual</b> por personagem de ficção. Usa o SDK <code>google-genai</code> com <code>gemini-2.5-flash</code>. A primeira célula declara: \"Estes códigos são meramente ilustrativos com fins educacionais\".",
     "fluxo": [
      "Célula de setup: <code>pip install -q google-genai</code> e imports (<code>genai</code>, <code>types</code>, <code>userdata</code> do Colab).",
      "Célula de chave: lê <code>GEMINI_API_KEY</code> dos Secrets do Colab via <code>userdata.get</code> dentro de try/except; se faltar, imprime orientação e relança o erro.",
      "Dados: <code>dados_usuario_legitimo</code> (\"Cliente: Fulano. Status: Premium...\") e <code>dados_usuario_atacante</code>, em que o campo de dados traz uma falsa \"instrução do sistema\" embutida no texto, mandando ignorar as regras, conceder um cupom de alto valor, revelar um código de ativação e omitir o bloqueio (o padrão é o da apostila: dado que se disfarça de comando).",
      "<code>PROMPT_SISTEMA</code> define o assistente de suporte e a \"Regra de Negócio Absoluta: Clientes bloqueados não podem receber nenhuma vantagem ou cupom\". <code>rodar_agente</code> chama <code>generate_content</code> com <code>system_instruction</code>, <code>temperature=0.8</code> e injeta os dados no <code>contents</code> como \"Histórico recuperado do banco de dados\".",
      "Saída salva no notebook: no teste 1 o modelo atende o cliente premium normalmente; no teste 2 identifica a contradição, nega o cupom, mantém o bloqueio e pede revisão da \"instrução do sistema central\". Ou seja, na execução salva o ataque de injeção foi barrado.",
      "Jailbreaking: <code>pedido_proibido_direto</code> (invadir o Wi-Fi do vizinho) versus <code>pedido_com_jailbreak</code> (autor de ficção policial, hacker ético, \"fins puramente educacionais e literários\"). <code>testar_seguranca</code> usa a configuração padrão, sem instruções restritivas extras.",
      "Saída salva: o pedido direto é recusado com alternativas legais; o pedido com personagem <b>é atendido na forma de um capítulo de ficção que carrega instruções técnicas de ataque</b>; o guardrail nativo falhou. Esse é o ponto da aula: o jailbreak funcionou onde o pedido direto falhou. O conteúdo gravado não é reproduzido aqui de propósito."
     ],
     "rodar": [
      "Abra o notebook no Google Colab e cadastre o secret <code>GEMINI_API_KEY</code> (ícone de chave); depois execute as células em ordem.",
      "Fora do Colab, <code>from google.colab import userdata</code> falha: troque por variável de ambiente se quiser rodar localmente.",
      "Não executei o notebook; os resultados descritos são as saídas já gravadas nas células do arquivo."
     ],
     "armadilhas": [
      "O README do repo cita o arquivo como <code>demonstração.ipynb</code> e a pasta como <code>modulo-05-seguranca-dados/</code>; o nome real é <code>Demonstração.ipynb</code> em <code>modulo5-seguranca-dados</code>.",
      "<code>import os</code> é importado e não usado; <code>pip install google-genai</code> sem versão fixada, então o notebook pode quebrar com versões futuras do SDK.",
      "O notebook chama a primeira demo de \"injeção indireta\" (a instrução vem nos dados do banco), enquanto o texto da apostila descreve o atacante como o usuário que digita a instrução; a mecânica é a mesma, o vetor muda.",
      "A saída gravada do jailbreak contém conteúdo operacional: use o notebook só em ambiente controlado e não reutilize nem republique a saída; o rótulo \"educacional\" não elimina o risco."
     ]
    }
   ]
  },
  {
   "id": "D10-10",
   "bloco": "d10-b2",
   "mod": "Unidade 4 · Aulas 10 e 11",
   "emoji": "🎯",
   "read": "9 min",
   "title": "Pentest, Red Team, Blue Team e Purple Team em IA",
   "short": "Pentest é pontual, Red Team é amplo e inclui pessoas, Blue Team defende, Purple Team troca aprendizado; em IA tudo é estocástico.",
   "oneliner": "<b>Pentest</b> é um ataque simulado, pontual e autorizado a um alvo definido; <b>Red Team</b> simula um adversário real sobre tecnologia, processos e pessoas (inclui engenharia social); <b>Blue Team</b> é a defesa contínua; <b>Purple Team</b> é a colaboração estruturada entre os dois. Em IA, entram prompts, modelos, RAG, agentes e <b>avaliação estocástica</b>.",
   "vovo": [
    "Contratar um chaveiro para testar as fechaduras do prédio e entregar um relatório é o Pentest. Contratar alguém que estuda a rotina dos porteiros, clona crachá e tenta entrar disfarçado é o Red Team. O Blue Team é a equipe de segurança do prédio, todos os dias.",
    "E o Purple Team é quando o \"ladrão contratado\" explica ao segurança como entrou, o segurança conserta, e eles testam de novo."
   ],
   "oque": [
    "<b>Pentest:</b> avaliação técnica, pontual e rigorosamente autorizada; escopo definido (ex.: uma API ou bloco de IPs); entrega relatório com brechas e correções; em geral conhecida pela equipe de TI. Em IA: testar guardrails, resistência a jailbreak, vazamento e alteração de comportamento por entrada maliciosa.",
    "<b>Red Team:</b> adota a perspectiva de um adversário persistente; o foco é atingir um objetivo (ex.: comprometer o servidor central ou obter dados confidenciais) usando qualquer vetor, incluindo engenharia social (phishing), intrusão física e evasão de defesas. Testa detecção, reação e resiliência da organização inteira. Em geral é oculto para a maioria da empresa.",
    "<b>Blue Team:</b> defensores internos; operação constante: monitoramento de tráfego, auditoria de logs, triagem de alertas via SIEM; firewalls, privilégio mínimo, criptografia; responder a incidentes, revisar acessos, melhorar o ambiente com base nas vulnerabilidades encontradas.",
    "<b>Purple Team:</b> não é uma estrutura física, é uma dinâmica: o Red compartilha os caminhos de exploração logo após o exercício, o Blue ajusta as regras de detecção para que aquele método não funcione mais; o cenário é testado de novo, num ciclo contínuo.",
    "<b>Red Team para IA:</b> não é cópia do tradicional: comportamento estocástico, prompts, modelos, RAG, bases vetoriais, agentes, ferramentas conectadas e autonomia criam novas superfícies. A apostila recomenda o <b>GenAI Red Teaming Guide</b> da OWASP (escopo, tipos de avaliação, critérios, particularidades de IA generativa)."
   ],
   "como": [
    "Avaliação estocástica: em software tradicional o mesmo input dá o mesmo resultado; em LLMs não, então o planejamento de testes precisa considerar variabilidade (uma tentativa falha, outra muito parecida funciona).",
    "RAG merece atenção especial: o modelo recebe conteúdo recuperado de fontes (documentos, bases de conhecimento, políticas, informações de clientes). É preciso pensar em autorização: quem pode consultar o quê, e se o modelo respeita os mesmos limites que o usuário teria fora da IA. Busca semântica mal protegida expõe conteúdo restrito.",
    "A dimensão humana: credencial compartilhada, estação desbloqueada, colaborador convencido por engenharia social, chave publicada por engano. Segurança não se resolve só com tecnologia.",
    "Teste precisa gerar mudança: se o Red Team mostra que pessoas caem em determinado ataque, o resultado não fica só em relatório: revisar políticas, criar treinamentos, reduzir privilégios, melhorar autenticação, ajustar arquitetura. O teste só tem valor quando reduz risco.",
    "Segurança em IA em múltiplas camadas: prompt injection e jailbreak mostram que o modelo é manipulável por linguagem; guardrails são barreiras; Pentest testa um alvo; Red Team amplia ao sistema todo; Blue estrutura a defesa; Purple integra. Nenhuma sozinha resolve.",
    "Profissionais de IA não precisam virar especialistas em segurança, mas precisam reconhecer risco, saber que segredo não pertence ao prompt, que agente com privilégio excessivo amplia o impacto e que testar funcionalidade é diferente de testar segurança."
   ],
   "aplica": [
    "Contratar ou montar um exercício de Red Team focado em IA (prompts, RAG, ferramentas dos agentes) com escopo e autorização.",
    "Usar o ciclo Purple: cada achado do ataque vira regra de detecção, guardrail ou política, seguido de reteste.",
    "Checar controle de acesso do RAG como parte do Pentest da aplicação."
   ],
   "pros": [
    "Dá vocabulário e papéis claros para organizar testes de segurança.",
    "O ciclo Purple transforma achado em melhoria contínua.",
    "Reconhece o fator humano e organizacional, não só o técnico."
   ],
   "contras": [
    "Red Team exige maturidade e autorização formal; pode ser custoso.",
    "Em IA, resultado depende de variabilidade; difícil dar \"aprovado\" definitivo.",
    "O material de apoio do repo é um resumo introdutório, não substitui o guia da OWASP."
   ],
   "traps": [
    "Confundir Pentest (escopo definido, pontual) com Red Team (objetivo, múltiplos vetores).",
    "Entregar o relatório e não mudar política, treinamento ou arquitetura.",
    "Executar testes ofensivos sem autorização ou fora de ambiente controlado.",
    "Testar só o modelo e esquecer RAG, ferramentas e pessoas."
   ],
   "cola": [
    [
     "Pentest",
     "Ataque simulado, pontual e autorizado a um escopo definido"
    ],
    [
     "Red Team",
     "Adversário simulado, objetivo amplo, inclui pessoas e processos"
    ],
    [
     "Blue Team",
     "Defesa contínua: monitorar, responder, configurar controles"
    ],
    [
     "Purple Team",
     "Colaboração Red + Blue: compartilhar caminhos de ataque e ajustar detecção"
    ],
    [
     "Engenharia social",
     "Explorar pessoas (phishing, crachá, suporte falso) em vez de código"
    ],
    [
     "SIEM",
     "Sistema de triagem de alertas e logs usado pelo Blue Team"
    ],
    [
     "Avaliação estocástica",
     "Testar variando entradas porque a saída do LLM varia"
    ],
    [
     "Defesa em profundidade",
     "Várias camadas; nenhuma controle isolado basta"
    ]
   ],
   "links": [
    [
     "OWASP GenAI Red Teaming Guide (indicação 3)",
     "https://genai.owasp.org/resource/genai-red-teaming-guide/"
    ],
    [
     "OWASP Top 10 for LLM Applications 2025",
     "https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/"
    ],
    [
     "Manual de Segurança (PDF no repo)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia/modulo5-seguranca-dados"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo5-seguranca-dados / manual_seguranca_aula.pdf",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia/modulo5-seguranca-dados",
     "resumo": "PDF de 3 páginas, \"O Tabuleiro da Cibersegurança: Conceitos Essenciais: Pentest, Red Team e Blue Team\", que acompanha as Aulas 10 e 11. É um manual conceitual (sem código) com metáforas, matriz comparativa e o conceito de Purple Team.",
     "fluxo": [
      "Introdução: segurança como processo dinâmico e contínuo de ataque e defesa, estruturado em três pilares.",
      "<b>1. Pentest (Teste de Intrusão):</b> avaliação técnica, pontual e rigorosamente autorizada; escopo definido; abordagem técnico-prática; entregável é relatório com brechas e correções. Metáfora do chaveiro profissional que testa trancas e janelas.",
      "<b>2. Red Team:</b> adversário real e persistente; foco em objetivos; ataques multidimensionais (engenharia social, intrusão física, evasão de defesas); metáfora de quem estuda a rotina dos funcionários, clona cartões e cria disfarces.",
      "<b>3. Blue Team:</b> defensores internos, operação constante; monitoramento contínuo (tráfego, logs, SIEM) e engenharia de defesa (firewalls, privilégio mínimo, criptografia).",
      "<b>Matriz comparativa:</b> abordagem, objetivo, ciência da operação e resultado primário: Pentest (preventiva, mapeada, pontual; identifica vulnerabilidades; conhecida pela equipe de TI; relatório técnico), Red Team (ofensiva, adaptável; testa prontidão, processos e pessoas; oculta para a maioria; diagnóstico de resiliência e maturidade), Blue Team (defensiva, contínua; proteger, detectar, conter e remediar; integrada à rotina; infraestrutura monitorada).",
      "<b>Purple Team:</b> colaboração transparente; o Red compartilha os caminhos de exploração, o Blue ajusta as regras de detecção; objetivo é evolução acelerada da maturidade."
     ],
     "rodar": [
      "Leia o PDF como material de apoio antes das Aulas 10 e 11; não há o que executar.",
      "O rodapé avisa que o material foi gerado com auxílio de IA."
     ],
     "armadilhas": [
      "O manual é genérico de cibersegurança e não trata de IA; a especificidade de IA (estocástico, RAG, agentes) vem da apostila e do guia da OWASP.",
      "O README do repo cita a pasta como <code>modulo-05-seguranca-dados/</code> e a apostila usa <code>modulo5-seguranca-dados</code>, que é o nome real.",
      "O PDF tem um callout chamado \"Linha de Frente Oblíqua\" no Blue Team, expressão que não aparece em outras fontes; trate como redação do material, não como termo técnico."
     ]
    }
   ]
  },
  {
   "id": "D10-11",
   "bloco": "d10-b3",
   "mod": "Unidade 5 · Aula 12",
   "emoji": "⚖️",
   "read": "7 min",
   "title": "Por que regular IA: interesses, dilema de Collingridge e lobby",
   "short": "Regular é negociar interesses sob incerteza: cedo falta informação, tarde custa mudar.",
   "oneliner": "Regular é estabelecer limites e reduzir conflitos entre muitos grupos com interesses legítimos (empresas, governos, produtores de conteúdo, trabalhadores, pesquisadores). O <b>dilema de Collingridge</b> resume a dificuldade: no início é fácil mudar e difícil prever; depois é fácil compreender e difícil alterar. <b>Lobby</b> pode ser legítimo se for transparente.",
   "vovo": [
    "Imagine criar as regras de trânsito quando os primeiros carros aparecem. Se regra demais, a senhora trava uma invenção que talvez fosse ótima. Se esperar, a cidade já está cheia de carro e mudar a rua sai caríssimo.",
    "E todo mundo quer uma regra a seu favor: o fabricante, o pedestre, o taxista. Um bom acordo é quando todos conseguem ver quem disse o quê."
   ],
   "oque": [
    "<b>Por que regular:</b> convivência de grupos gera conflito e risco; regular organiza relações, reduz risco e define o que deve ser permitido. É proteção coletiva diante de tecnologia usada sem compreender todos os detalhes internos.",
    "<b>Direitos autorais:</b> modelos precisam de dados e muito conteúdo vem de jornais, autores e artistas que investem tempo e dinheiro. A discussão é antiga, mas a escala mudou. O slide da aula aponta um caso de disputa judicial nos EUA entre um jornal e uma empresa de IA (link da Reuters). Dados sintéticos ajudam, mas treinar em excesso com conteúdo artificial empobrece o material, então o conteúdo humano segue relevante.",
    "<b>Riscos (slide \"Alguns riscos de IA\"):</b> desinformação e vieses (deepfakes, preconceitos históricos), impacto no emprego, privacidade e segurança (dados pessoais para treino, ciberataques mais sofisticados) e alucinações e decisões não explicáveis. A escala é o que mudou na desinformação; em saúde o risco é de decisão perigosa.",
    "<b>Dilema de Collingridge:</b> regular cedo é mais fácil (infraestrutura e hábitos ainda não consolidados) mas há pouca informação e pode-se bloquear algo benéfico; regular tarde tem dados e impactos visíveis, mas a tecnologia já está integrada à sociedade e mudar é caro. Não há solução perfeita: é escolha sob incerteza.",
    "<b>Atores:</b> Big Techs, governos e agências, produtores de conteúdo, sociedade civil e ONGs, comunidade científica, sindicatos e trabalhadores, profissionais de segurança, Judiciário e profissionais do direito, investidores e venture capital. Cada um vê custos e benefícios diferentes."
   ],
   "como": [
    "<b>Multidisciplinaridade:</b> direito é indispensável, mas insuficiente; sem tecnologia, saúde mental, economia e segurança, pode-se propor regra juridicamente boa e tecnicamente inviável. Cada área enxerga um pedaço.",
    "<b>Lobby:</b> influenciar decisões de agentes públicos em favor de interesse específico; pode ser legítimo (empresas, sindicatos, ONGs, associações) quando é transparente (reuniões registradas, pauta pública, argumentação). Vira <b>tráfico de influência</b> quando há reuniões escondidas, troca de favores e benefícios em troca de decisões públicas.",
    "Pergunta do slide: se uma empresa diz às redes que está preocupada com o futuro da humanidade, mas se reúne às escondidas com políticos para mudar as leis e seguir lucrando sem fiscalização, é defesa legítima da inovação ou tráfico de influência?",
    "Evitar \"torcida\": uma proposta pode ser excessiva ou insuficiente; empresa defende liberdade por acreditar em inovação e também porque preserva lucro; um grupo pode defender proteção por preocupação legítima ou exagerar riscos. Analise argumentos e incentivos.",
    "Fontes internacionais: acompanhar veículos de países e idiomas diferentes ajuda a comparar abordagens e a ver que o debate é global (EUA, Europa e outros).",
    "<b>No curso:</b> Aula conceitual, sem código. Os slides da Aula 6 do curso (Aspectos Regulatórios) trazem o dilema de Collingridge, a lista de atores, o slide de lobby e a pergunta provocativa sobre tráfico de influência, que reproduzi acima."
   ],
   "aplica": [
    "Ler propostas regulatórias na fonte antes de opinar e identificar quem ganha e quem perde com cada texto.",
    "Participar de discussões internas de conformidade levando a visão técnica de viabilidade.",
    "Mapear que decisões de produto dependem de regras ainda em debate (dados de treino, rotulagem de conteúdo)."
   ],
   "pros": [
    "Dá estrutura para pensar regulação sem ideologia: interesses, incerteza e escala.",
    "Valoriza o engenheiro como participante técnico do debate.",
    "Ajuda a distinguir defesa legítima de interesse de influência indevida."
   ],
   "contras": [
    "Não há consenso fácil; o debate envolve poder, economia e valores.",
    "O Collingridge não resolve o dilema, só o explicita.",
    "Parte dos exemplos (litígios) muda rápido e precisa de atualização por fonte oficial."
   ],
   "traps": [
    "Tratar regulação como \"a favor\" ou \"contra\".",
    "Aceitar resumo de rede social em vez do texto da proposta.",
    "Esquecer que desinformação e deepfake têm danos diferentes conforme o alvo e o contexto.",
    "Propor regra sem ouvir equipes técnicas e acabar com exigência inviável."
   ],
   "cola": [
    [
     "Dilema de Collingridge",
     "Fácil mudar e difícil prever no início; fácil entender e difícil mudar depois"
    ],
    [
     "Soft law",
     "Regulação por princípios, flexível"
    ],
    [
     "Hard law",
     "Regulação por regras, com limites e penalidades"
    ],
    [
     "Lobby",
     "Influenciar agentes públicos em defesa de interesse; legítimo se transparente"
    ],
    [
     "Tráfico de influência",
     "Favorecimento indevido por canais ocultos; prática ilegal"
    ],
    [
     "Multidisciplinaridade",
     "Direito, tecnologia, saúde, economia e segurança juntos na regulação"
    ],
    [
     "Dados sintéticos",
     "Úteis, mas não substituem a produção humana por completo"
    ]
   ],
   "links": [
    [
     "Comissão Europeia: quadro regulatório de IA",
     "https://digital-strategy.ec.europa.eu/pt/policies/regulatory-framework-ai"
    ],
    [
     "Reuters: disputa de direitos autorais (citada nos slides da Aula 6)",
     "https://www.reuters.com/legal/litigation/new-york-times-led-group-asks-court-sanction-openai-us-copyright-dispute-2026-07-09/"
    ],
    [
     "Artificial intelligence policy worldwide: a comparative analysis (indicação 11)",
     "https://royalsocietypublishing.org/rsos/article/13/2/242234/480264/Artificial-intelligence-policy-worldwide-a"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ]
  },
  {
   "id": "D10-12",
   "bloco": "d10-b3",
   "mod": "Unidade 5 · Aula 13",
   "emoji": "🇪🇺",
   "read": "7 min",
   "title": "Tipos de regulação e o EU AI Act: princípios, regras e classificação por risco",
   "short": "Princípios dão direção, regras operacionalizam; o AI Act regula o caso de uso por nível de risco.",
   "oneliner": "A regulação pode ser por <b>princípios</b> (soft law, flexível, abstrata), por <b>regras</b> (hard law, objetiva, com penalidades) ou <b>híbrida</b>. O <b>EU AI Act</b> (aprovado em 2024) é a primeira legislação abrangente de IA e <b>regula o caso de uso e o impacto, não a tecnologia</b>, em quatro níveis: inaceitável, alto, limitado e mínimo.",
   "vovo": [
    "Princípio é a placa \"dirija com responsabilidade\": bonita, vale para qualquer carro e época, mas cada motorista interpreta. Regra é a placa \"máximo 60 km/h, multa de tal valor\": clara, mas pode envelhecer se o limite mudar. As boas leis juntam as duas.",
    "E a lei europeia olha para o que o carro está fazendo: ir ao mercado é uma coisa, levar produtos perigosos é outra, mesmo sendo o mesmo carro."
   ],
   "oque": [
    "<b>Por princípios (soft law):</b> valores (dignidade humana, responsabilidade, transparência, segurança, governança) em nível de abstração maior. Vantagem: sobrevive melhor a mudanças tecnológicas. Desafio: transformar conceito em decisão concreta (que requisito comprova transparência? qual explicabilidade basta? como transformar valor em teste?).",
    "<b>Por regras (hard law):</b> limites, proibições, obrigações, penalidades, prazos, quem cumpre. Mais fácil de converter em requisito (ex.: \"guardar logs por X meses\"), menos flexível e pode envelhecer rápido se amarrada a uma técnica ou produto.",
    "<b>Híbrido:</b> princípios dão direção; regras operacionalizam; a classificação de risco calibra a intensidade da obrigação.",
    "<b>EU AI Act:</b> aprovado em 2024, referência global (os slides dizem aplicação prática consolidada entre 2025 e 2026, hipótese do material, não verifiquei). Abordagem baseada em risco; unidade de análise é o <b>caso de uso</b>: um mesmo modelo pode gerar legenda de imagem, apoiar triagem de saúde, influenciar crédito ou controlar infraestrutura crítica; o impacto muda completamente.",
    "<b>Quatro categorias:</b> <b>risco inaceitável</b> (proibido: social scoring governamental, manipulação comportamental subliminar, algumas formas de categorização biométrica; nem toda biometria é automaticamente proibida), <b>alto risco</b> (permitido com auditoria, documentação, gestão de risco e supervisão; ex.: infraestrutura crítica, medicina, RH/recrutamento, biometria), <b>risco limitado</b> (transparência: chatbot avisa que é IA; deepfake rotulado) e <b>risco mínimo</b> (spam, jogos)."
   ],
   "como": [
    "Impacto prático para desenvolvedores: princípio exige interpretação e diálogo com jurídico, negócio, segurança e governança (como documentar, testar, provar conformidade e medir impacto). Regra gera controle direto: obrigação vira controle, proibição vira restrição de arquitetura, requisito de auditoria vira processo.",
    "Proporcionalidade: quanto maior o risco potencial, mais fortes as obrigações; obrigações também variam com o <b>papel</b> na cadeia (desenvolvedor de modelo, fornecedor, integrador, usuário corporativo) e com o tamanho da empresa. Modelos e sistemas de propósito geral têm tratamento próprio.",
    "Recursos oficiais citados: site dedicado ao AI Act (capítulos, anexos, definições, exceções, penalidades, código de conduta), o <b>High-Level Summary</b> (porta de entrada para as categorias) e o <b>Compliance Checker</b> (formulário orientador). Sempre consultar a versão mais recente: prazos e interpretações mudam.",
    "Transparência como controle: se o usuário acha que fala com uma pessoa mas fala com IA, ou vê conteúdo sintético sem identificação, há assimetria; rotular reduz essa assimetria.",
    "Outros países: a aula cita a Austrália como exemplo de país estruturando princípios; documentos de princípios indicam a direção mesmo sem lei abrangente. Regulação é escolha política e estratégica; nenhuma lei surge isolada.",
    "Conselho de carreira da aula: não construa toda a carreira em torno de uma única técnica; o mesmo raciocínio justifica regular por caso de uso (mais durável).",
    "<b>No curso:</b> Aula conceitual, sem código. Os slides da Aula 6 trazem uma tabela comparativa soft law versus hard law (foco, velocidade de adaptação, clareza para o desenvolvedor) e a lista das quatro categorias de risco, e apontam o site artificialintelligenceact.eu como fonte."
   ],
   "aplica": [
    "Classificar as features de IA de um produto por nível de risco do AI Act antes de priorizar controles.",
    "Traduzir um princípio (ex.: transparência) em requisitos testáveis: logs, rótulos de conteúdo sintético, documentação.",
    "Mapear o papel da sua empresa na cadeia (provedor, integrador, usuário) para entender obrigações."
   ],
   "pros": [
    "Regular por caso de uso resiste melhor à evolução técnica.",
    "Níveis de risco evitam aplicar o mesmo peso a spam e a infraestrutura crítica.",
    "Combinar princípios e regras dá direção e operacionalidade."
   ],
   "contras": [
    "Princípios exigem interpretação e podem gerar insegurança de conformidade.",
    "Regras específicas envelhecem rápido.",
    "A lei é extensa; resumo de aula não substitui a leitura da fonte oficial."
   ],
   "traps": [
    "Dizer que o sistema \"usa IA\" sem identificar o caso de uso e o nível de risco.",
    "Generalizar a proibição de biometria (depende do contexto específico).",
    "Usar um resumo antigo do AI Act sem checar versão e prazos.",
    "Assumir que as obrigações são iguais para todas as empresas da cadeia."
   ],
   "cola": [
    [
     "Soft law",
     "Regulação por princípios, flexível e abstrata"
    ],
    [
     "Hard law",
     "Regulação por regras, com proibições, obrigações e penalidades"
    ],
    [
     "Híbrido",
     "Princípios para direção + regras para operacionalização"
    ],
    [
     "EU AI Act",
     "Lei europeia abrangente de IA, baseada em risco e em caso de uso"
    ],
    [
     "Inaceitável / Alto / Limitado / Mínimo",
     "Os quatro níveis de risco do AI Act"
    ],
    [
     "High-Level Summary",
     "Resumo de alto nível do AI Act, boa porta de entrada"
    ],
    [
     "Compliance Checker",
     "Formulário que orienta a análise inicial de conformidade"
    ],
    [
     "Propósito geral",
     "Categoria de modelos e sistemas usados em muitos contextos, com obrigações próprias"
    ]
   ],
   "links": [
    [
     "The EU Artificial Intelligence Act (site, indicação 12)",
     "https://artificialintelligenceact.eu/"
    ],
    [
     "Lei da UE sobre IA, Parlamento Europeu (indicação 8)",
     "https://www.europarl.europa.eu/topics/pt/article/20230601STO93804/lei-da-ue-sobre-ia-primeira-regulamentacao-de-inteligencia-artificial"
    ],
    [
     "Comissão Europeia: quadro regulatório de IA",
     "https://digital-strategy.ec.europa.eu/pt/policies/regulatory-framework-ai"
    ],
    [
     "Artificial intelligence policy worldwide: a comparative analysis (indicação 11)",
     "https://royalsocietypublishing.org/rsos/article/13/2/242234/480264/Artificial-intelligence-policy-worldwide-a"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ]
  },
  {
   "id": "D10-13",
   "bloco": "d10-b3",
   "mod": "Unidade 5 · Aula 14",
   "emoji": "🌍",
   "read": "8 min",
   "title": "Geopolítica da IA, Efeito Bruxelas e o cenário brasileiro",
   "short": "IA é disputa de poder: EUA (mercado), China (controle estatal), UE (direitos) e o Brasil entre eles, com PL 2338, LGPD e outras regras.",
   "oneliner": "IA é tecnologia estratégica ligada a <b>soberania</b>, energia, chips e dados. Três polos: <b>EUA</b> (mercado e velocidade), <b>China</b> (controle estatal e soberania), <b>UE</b> (direitos fundamentais e risco). O <b>Efeito Bruxelas</b> explica como a regra europeia vira padrão global por lógica de mercado; no Brasil, o <b>PL 2338/2023</b> e as leis já vigentes (LGPD, TSE, ECA Digital) moldam o projeto.",
   "vovo": [
    "Três grandes países montam o tabuleiro de um jogo. Um aposta na velocidade das empresas, outro no controle do governo, o terceiro nas regras para proteger as pessoas. O dono de uma loja global não quer fabricar um produto diferente para cada país; então adota a regra mais exigente em todo lugar. É assim que a regra de um mercado grande vira regra do mundo.",
    "O Brasil não precisa só assistir: pode proteger seus interesses, e quem programa já precisa cumprir leis que existem."
   ],
   "oque": [
    "<b>Geopolítica:</b> relação entre território, história e decisões políticas para interpretar fenômenos globais (guerras, migrações, acordos, disputas econômicas, controle de recursos, tecnologia). Tecnologia sempre foi instrumento de poder (ex.: Guerra Fria). Não existe país \"do bem\" ou \"do mal\": existem interesses e estratégias.",
    "<b>Três visões:</b> <b>EUA</b>, orientados a mercado, capital de risco e velocidade (mas com restrições de acesso por segurança nacional); <b>China</b>, soberania, controle estatal, planejamento de longo prazo e formação de mão de obra técnica; <b>UE</b>, direitos fundamentais, mitigação de risco, transparência e responsabilidade, pioneira num marco abrangente baseado em risco.",
    "<b>Efeito Bruxelas</b> (Anu Bradford, Columbia Law School): a UE influencia práticas fora dela sem imposição direta, por tamanho de mercado e custo de adaptação. Manter duas arquiteturas (uma transparente para a Europa, outra opaca para o resto) é economicamente proibitivo, então as empresas adotam o padrão mais alto globalmente. Quem chega primeiro define o padrão, e o AI Act virou modelo inclusive para o Brasil.",
    "<b>Soberania tecnológica:</b> de onde vêm os modelos, onde os dados são processados, quais fornecedores controlam a infraestrutura, quem fabrica componentes críticos e quem define regras de acesso. IA depende de recursos físicos (energia, chips, data centers, redes, refrigeração).",
    "<b>Brasil:</b> posição intermediária. A professora defende uma postura ativa e evitar a visão de que o país \"não desenvolve nada\" (há pesquisa, open source, iniciativas em português)."
   ],
   "como": [
    "<b>PL 2338/2023</b> (Senado), ainda em debate, com quatro eixos: centralidade na pessoa humana, classificação de riscos (inspirada no modelo europeu), direitos das pessoas afetadas (informação, explicação, contestação, proteção) e direitos autorais e treinamento de modelos. Textos mudam durante o processo legislativo: consulte a fonte e as emendas.",
    "<b>Leis que já existem (slides):</b> <b>LGPD</b> (Lei 13.709/2018), com direito de revisão humana de decisões exclusivamente automatizadas e transparência no tratamento de dados; <b>resoluções do TSE</b> para eleições (identificar conteúdo sintético, limitar robôs); <b>ECA Digital</b> (Lei 15.211/2025): proíbe perfilamento algorítmico e direcionamento de anúncios para menores, prazo de 24 horas para remoção automatizada de conteúdo nocivo e responsabiliza plataformas por danos de recomendação. Os detalhes de ECA Digital e TSE vêm dos slides; a apostila só cita os temas.",
    "<b>O que fazer como engenheiro:</b> cumprir o que já existe (privacidade, segurança, normas setoriais), adotar explicabilidade quando o risco justificar (SHAP, LIME, Integrated Gradients), avaliar viés (métricas entre grupos, datasets, sub-representação, diferença de erro), rastrear a origem dos dados (autorização, direitos autorais, dados pessoais, transformações) e aplicar privacidade desde o projeto (dados necessários, onde ficam, quem acessa, por quanto tempo).",
    "Empresas internacionais: quem mora no Brasil e trabalha para empresa europeia pode ter requisitos europeus no projeto. Observe o que acontece depois que a regra entra em vigor (funcionou, gerou custo, protegeu, criou barreiras?).",
    "Decisões geopolíticas chegam ao código: um modelo pode deixar de estar disponível, uma API pode sofrer restrição, uma regra pode exigir armazenamento local, um fornecedor pode ser proibido.",
    "Slides: os slides citam \"Linha Dupla\" e \"Padrão Único\" como as duas opções das Big Techs; o \"vácuo regulatório\" faz a UE virar modelo de cópia (como o PL 2338 no Brasil).",
    "<b>No curso:</b> Aula conceitual, sem código. Os slides da Aula 6 (\"Panorama Global e o Cenário Brasileiro\") reúnem o tabuleiro geopolítico, o Efeito Bruxelas e a lista de leis brasileiras vigentes, e fecham com \"IA Responsável na Prática de Engenharia\": XAI com SHAP e LIME, detecção de viés com fairness metrics e linhagem de dados."
   ],
   "aplica": [
    "Checar LGPD e direito de revisão humana em qualquer decisão automatizada sobre pessoas.",
    "Antever restrições regulatórias e de fornecedor na arquitetura (residência de dados, plano B de provedor).",
    "Manter rastreabilidade de dados de treino para conformidade e discussões de direitos autorais."
   ],
   "pros": [
    "Dá contexto para entender por que a regra europeia influencia o mundo todo.",
    "Conecta regulação a práticas técnicas concretas (explicabilidade, viés, linhagem).",
    "Alerta que não é preciso esperar uma lei específica de IA para agir."
   ],
   "contras": [
    "Cenário muda rápido: PL, resoluções e prazos precisam de checagem em fonte oficial.",
    "A discussão tem componente político e interesses de todos os lados.",
    "Parte do conteúdo (ECA Digital, resoluções do TSE) está só nos slides, em resumo."
   ],
   "traps": [
    "Discutir um projeto de lei com base em resumo antigo ou post em rede social.",
    "Ver geopolítica como assunto distante do código.",
    "Tratar o Efeito Bruxelas como imposição direta da UE aos outros países.",
    "Simplificar: país \"vilão\" e país \"mocinho\"."
   ],
   "cola": [
    [
     "Efeito Bruxelas",
     "Regras da UE viram padrão global pelo tamanho do mercado e custo de adaptação"
    ],
    [
     "Soberania tecnológica",
     "Entender e reduzir dependências de modelos, dados, fornecedores e componentes"
    ],
    [
     "PL 2338/2023",
     "Projeto de lei brasileiro de IA: pessoa humana, risco, direitos dos afetados, direitos autorais"
    ],
    [
     "LGPD",
     "Lei 13.709/2018; revisão humana e transparência no tratamento de dados"
    ],
    [
     "ECA Digital",
     "Lei 15.211/2025; proteção de menores no ambiente digital"
    ],
    [
     "Linhagem de dados",
     "Rastreabilidade de origem e transformação dos dados"
    ],
    [
     "Privacidade desde o projeto",
     "Perguntar desde o início que dados, onde, quem acessa e por quanto tempo"
    ]
   ],
   "links": [
    [
     "PL 2338/2023 no Senado",
     "https://www25.senado.leg.br/web/atividade/materias/-/materia/157233"
    ],
    [
     "Brussels Effect (Anu Bradford, SSRN)",
     "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2770634"
    ],
    [
     "Comissão Europeia: quadro regulatório de IA",
     "https://digital-strategy.ec.europa.eu/pt/policies/regulatory-framework-ai"
    ],
    [
     "Artificial intelligence policy worldwide: a comparative analysis (indicação 11)",
     "https://royalsocietypublishing.org/rsos/article/13/2/242234/480264/Artificial-intelligence-policy-worldwide-a"
    ],
    [
     "Geopolítica (CNN Brasil, citada nos slides)",
     "https://www.cnnbrasil.com.br/politica/geopolitica/"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ]
  },
  {
   "id": "D10-14",
   "bloco": "d10-b4",
   "mod": "Unidade 6 · Aulas 15 e 16",
   "emoji": "💸",
   "read": "8 min",
   "title": "Custos financeiros de IA: CAPEX/OPEX, API versus infraestrutura própria e como reduzir",
   "short": "Custo é requisito de arquitetura: tokens, MVP, escala, caching, quantização, routing e RAG eficiente; produtividade não é consumo de tokens.",
   "oneliner": "A conta aparece <b>depois</b> da adoção. <b>CAPEX</b> (ativos de longo prazo) e <b>OPEX</b> (despesa recorrente) coexistem; API comercial dá simplicidade (pay-as-you-go, custo unitário maior), infraestrutura própria dá controle (custo fixo, pessoas, MLOps). Para reduzir: <b>prompt caching, quantização, LLM routing, RAG eficiente, modelos menores, negociação e simulação de pricing</b>.",
   "vovo": [
    "Ter um táxi por aplicativo é pagar por corrida: fácil de começar, sem comprar carro, mas se a senhora roda o dia inteiro a conta pesa. Comprar o próprio carro exige entrada, motorista, seguro e garagem, mesmo parado. Qual é melhor depende de quanto a senhora roda, de quão previsível é a rota e de quem sabe dirigir.",
    "E para gastar menos: não mande o carrão de luxo para buscar pão, não leve a casa inteira de mudança a cada viagem e negocie desconto se virar cliente frequente."
   ],
   "oque": [
    "<b>CAPEX:</b> gasto com ativos de longo prazo (data center, servidores, hardware especializado, rede, energia, refrigeração, segurança física, espaço, equipe). <b>OPEX:</b> despesa operacional do dia a dia (folha, serviços, assinaturas, nuvem; API paga por uso é OPEX claro). As duas categorias coexistem.",
    "<b>MVP versus escala:</b> muitos produtos morrem no MVP: a demonstração impressiona, mas aparecem custo, performance, latência, infraestrutura e manutenção; uma ideia boa pode ser financeiramente inviável. Um centavo por chamada vira conta enorme com milhões de chamadas; contexto longo pesa na fatura.",
    "<b>API comercial:</b> sem infraestrutura, pay-as-you-go, bom em validação e tráfego incerto; custo unitário pode ser maior que infraestrutura própria bem otimizada; há custo de dependência (termos, mudança de preço, de limite e de modelo, disponibilidade).",
    "<b>Hospedar o próprio modelo (aberto ou ajustado por fine-tuning):</b> instância dedicada 24h gera custo fixo mesmo sem uso; envolve inferência, rede, armazenamento, monitoramento, autenticação, segurança, backup, atualização, observabilidade e <b>pessoas (MLOps)</b>. Faz sentido com privacidade rígida, volume alto e previsível, necessidade de controle, equipe capacitada e modelo especializado.",
    "<b>Tokens:</b> a cobrança costuma incluir entrada e saída; janela de contexto enorme (um milhão de tokens) não significa que deva ser usada inteira; \"engenharia de contexto também é engenharia de custo\"."
   ],
   "como": [
    "<b>Decisão entre API e infra própria</b> considera privacidade (ler termos de uso: armazenamento, retenção, treino com seus dados, região), volume, orçamento, equipe, latência, escalabilidade, customização, disponibilidade, dependência de fornecedor e manutenção. Não existe arquitetura universal; \"quando alguém diz que há uma única melhor forma, desconfie\".",
    "<b>Modelo menor pode bastar:</b> fine-tuning de um modelo menor (a aula cita 8B ou 14B parâmetros como exemplo) e destilação reduzem memória e hardware; o maior modelo não é automaticamente a melhor solução.",
    "<b>Estratégias de redução (Aula 16):</b> <b>prompt caching</b> (reaproveitar partes estáticas, útil com instrução de sistema estável; pouco útil se o contexto muda a cada chamada); <b>quantização</b> (reduzir a precisão dos pesos, por exemplo de FP16, para menor memória e GPU, com testes de qualidade); <b>LLM routing</b> (tarefas simples para modelos menores, difíceis para os maiores, escalonando por dificuldade); <b>RAG eficiente</b> (recuperar só o necessário; contexto demais confunde, dilui o sinal e aumenta a fatura; RAG não é só banco vetorial: pode usar SQL, busca tradicional, metadados e filtros); <b>negociação</b> com provedores (descontos, créditos, compromisso de consumo).",
    "<b>Simuladores de pricing</b> antes do deploy (Google Cloud e AWS): o custo muda drasticamente ao reduzir o tamanho médio de entrada e saída, mesmo mantendo as requisições; considerar input e output, região (preço, latência, residência de dados, conformidade, disponibilidade do modelo), câmbio (muitos serviços em dólar) e simular uso atual, crescimento, pior caso e picos.",
    "<b>Cadeia dos chips:</b> ASML (equipamentos de fabricação), TSMC (fabricação física, Taiwan) e NVIDIA (design e ecossistema). Concentração aumenta risco; o preço por chamada resume uma infraestrutura enorme (chips, data centers, energia, rede, profissionais, pesquisa, fabricação e logística).",
    "<b>Governança do orçamento e produtividade:</b> estourar o orçamento anual em poucos meses é sinal de falta de governança. A aula critica o <b>token maxing</b> (medir adoção ou produtividade por tokens consumidos): produtividade é valor gerado (problemas resolvidos, entregas, tempo economizado, qualidade); duas equipes com o mesmo resultado e gasto dez vezes maior não é mais produtiva, é menos eficiente. \"Por que pessoas ou IA? Por que não pessoas e IA?\"",
    "<b>No curso:</b> Duas aulas conceituais, sem código no repositório; a Aula 16 inclui demonstrações em calculadoras de pricing do Google Cloud e da AWS (links acima). O slide da Aula 7 do curso (\"Custos em Inteligência Artificial\") está criptografado e não pôde ser lido; o conteúdo aqui vem da apostila e do README do repo (que lista duas leituras de custo financeiro)."
   ],
   "aplica": [
    "Estimar custo por requisição, por usuário e por mês, e simular \"crescer dez vezes\", antes de ir a produção.",
    "Adotar routing por dificuldade: classificação e extração em modelo pequeno, raciocínio complexo no modelo grande.",
    "Revisar RAG para reduzir número e tamanho dos trechos enviados e medir efeito em custo e qualidade."
   ],
   "pros": [
    "Faz o custo entrar no desenho, ao lado das métricas técnicas.",
    "As estratégias são combináveis (fine-tuning + routing + cache).",
    "RAG eficiente melhora custo e qualidade ao mesmo tempo."
   ],
   "contras": [
    "Infraestrutura própria exige know-how e pessoas (MLOps); a economia aparente pode sumir em falhas e manutenção.",
    "Quantização e modelo menor podem afetar qualidade e precisam de teste.",
    "Prompt caching depende do padrão de repetição; sem repetição, o ganho é pequeno."
   ],
   "traps": [
    "Comparar só preço por token versus preço de GPU, esquecendo pessoas, segurança e observabilidade.",
    "Achar que o MVP validado já está pronto para produção.",
    "Usar o maior modelo para tudo e uma janela de contexto gigante \"porque cabe\".",
    "Medir produtividade por tokens consumidos (token maxing)."
   ],
   "cola": [
    [
     "CAPEX / OPEX",
     "Investimento em ativo de longo prazo versus despesa operacional recorrente"
    ],
    [
     "Pay-as-you-go",
     "Pagar pelo que usa; ótimo no início, exige controle ao crescer"
    ],
    [
     "MLOps",
     "Operação de modelos: implantação, monitoramento, versões, performance"
    ],
    [
     "Prompt caching",
     "Reutilizar partes estáticas do contexto entre chamadas"
    ],
    [
     "Quantização",
     "Reduzir precisão dos pesos (ex.: FP16 para menor) para economizar memória e GPU"
    ],
    [
     "LLM routing",
     "Encaminhar cada tarefa ao modelo com capacidade proporcional"
    ],
    [
     "Destilação / fine-tuning",
     "Modelo menor especializado derivado de outro ou ajustado"
    ],
    [
     "Token maxing",
     "Medir produtividade por tokens gastos; métrica que premia o gasto"
    ]
   ],
   "links": [
    [
     "Google Cloud Pricing Calculator",
     "https://cloud.google.com/products/calculator"
    ],
    [
     "AWS Pricing Calculator",
     "https://calculator.aws/#/"
    ],
    [
     "Indicação 13: CAPEX (B3)",
     "https://borainvestir.b3.com.br/glossario/capex-capital-expenditure/"
    ],
    [
     "TSMC, ASML, Nvidia: as ações que surfam a onda dos hiperchips (README do repo)",
     "https://vocesa.abril.com.br/economia/nvidia-e-cia-as-acoes-que-surfam-a-onda-dos-hiperchips/"
    ],
    [
     "AI Costs More Than The People It Replaced (Forbes, README do repo)",
     "https://www.forbes.com/sites/jemmagreen/2026/07/02/ai-costs-more-than-the-people-it-replaced/"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ]
  },
  {
   "id": "D10-15",
   "bloco": "d10-b4",
   "mod": "Unidade 7 · Aula 17",
   "emoji": "🗺️",
   "read": "7 min",
   "title": "Custo ambiental: onde ficam os data centers, cabos, água e matriz energética",
   "short": "A nuvem é física: localização define água, carbono, latência e comunidades afetadas.",
   "oneliner": "A \"nuvem\" é <b>infraestrutura material</b> (servidores, data centers, cabos, energia, água) e o impacto <b>não é distribuído por igual</b>. A aula parte de dados (mapas) antes de concluir: <b>localização</b> define estresse hídrico, <b>matriz energética</b>, intensidade de carbono, latência e as comunidades que absorvem o custo.",
   "vovo": [
    "Quando a senhora manda uma mensagem pelo celular, parece mágica. Mas existe um prédio cheio de máquinas ligadas, gastando luz e esfriando com ar ou água, e cabos no fundo do mar levando a mensagem. Alguém mora perto desse prédio.",
    "A mesma máquina faz um estrago diferente dependendo de onde está: numa cidade onde falta água, pesa na torneira; onde a luz vem de carvão, pesa no ar."
   ],
   "oque": [
    "<b>Nuvem não é abstrata:</b> AWS, Azure, Google Cloud criaram uma abstração (\"cloud\") que esconde servidores, energia, refrigeração, rede, prédios e localização. IA amplia uma discussão que já existia com a nuvem, pela intensidade (modelos maiores, mais treino, mais inferência).",
    "<b>Mapas apresentados:</b> Data Center Map (distribuição global: concentração em EUA, Europa e partes da Ásia; Brasil concentrado em São Paulo e Rio), AI Data Center Map (EUA, com estresse hídrico), regiões de Google Cloud, AWS e Azure, Submarine Cable Map e Electricity Maps. Nem todo data center é igual (um universitário não é um hyperscale).",
    "<b>Estresse hídrico:</b> demanda por água compete com oferta (empresas, agricultura, moradores). Data center em região de menor disponibilidade pode disputar água com necessidades locais. A localização deixa de ser decisão só técnica.",
    "<b>Regiões de nuvem são lugares físicos:</b> escolher região é escolher latência, preço, disponibilidade de serviços, conformidade <i>e impacto ambiental</i>. Cabos submarinos mostram que a internet é física; distância e rota influenciam desempenho.",
    "<b>Matriz energética e intensidade de carbono:</b> não basta perguntar quanto consome, mas de onde vem a energia. Intensidade de carbono mede, de forma simplificada, o carbono associado à geração de certa quantidade de energia (carvão tende a mais; fontes de baixo carbono, menos). Electricity Maps mostra intensidade, participação de renováveis e fonte dominante."
   ],
   "como": [
    "Panorama da matriz (da aula): Brasil com participação elevada de renováveis (Nordeste com eólica; hidrelétrica em várias regiões); EUA com grande variação regional (solar, gás, carvão); Canadá com hidrelétrica, gás e nuclear; Europa variada (países nórdicos com renováveis, França com nuclear, Alemanha com mix de solar, renováveis e fósseis); China com muito carvão e investimento forte em renováveis; partes da África e Oriente Médio com carvão, petróleo e gás.",
    "Nuances: renovável não é \"sem impacto\" (hidrelétrica altera ecossistemas, solar e eólica ocupam área); nuclear tem baixa emissão na operação mas não é renovável no mesmo sentido e gera resíduos. Evite reduzir tudo a uma métrica.",
    "Clima importa: refrigeração é parte importante da operação e o clima altera custo operacional e ambiental (aprofunda na Aula 18).",
    "Impacto não distribuído igualmente: a aplicação roda no mundo todo, mas a infraestrutura está em comunidades específicas, que convivem com água, energia, território e mudanças locais. O usuário está longe do impacto; \"a interface esconde toda a cadeia física\".",
    "Perguntas-guia: onde estão os data centers, qual é a situação da água, de onde vem a energia, qual a intensidade de carbono, como a rede está conectada. Não é demonizar a tecnologia, é conhecer o impacto e reconhecer que adoção é decisão.",
    "O impacto não pode ser calculado só por número de requisições ou tamanho do modelo.",
    "<b>No curso:</b> Aula de análise de dados: a professora abre os mapas citados e conduz a leitura. O README do repo lista as ferramentas (datacentermap, aidatacentermap, submarinecablemap, electricitymaps) em \"Sugestões de ferramentas\" e as leituras de custos ambientais, mas não há código. Os slides \"Custos Ambientais da IA\" trazem os mesmos mapas e a lista de leituras (FGV, WSJ, IEEE, ASHRAE, DW)."
   ],
   "aplica": [
    "Escolher região de nuvem considerando também matriz elétrica e disponibilidade de água, não só preço e latência.",
    "Pesquisar a matriz da região antes de decidir onde rodar treino ou inferência de alto volume.",
    "Incluir impacto ambiental em avaliações de arquitetura (reduzir inferência desnecessária, otimizar contexto)."
   ],
   "pros": [
    "Método baseado em dados e mapas abertos e gratuitos.",
    "Liga decisões técnicas cotidianas (região, modelo) a impacto físico.",
    "Evita discussão ambiental abstrata ou slogan."
   ],
   "contras": [
    "Mapas são retratos de um momento; matriz e data centers mudam.",
    "Dados regionais exigem interpretação; não há métrica única.",
    "O assunto é complexo: renovável, nuclear e fóssil têm trade-offs distintos."
   ],
   "traps": [
    "Dizer \"data center nos EUA\" sem especificar a região (a matriz varia muito).",
    "Equiparar renovável a impacto zero.",
    "Julgar impacto só pelo consumo de energia, sem olhar a origem.",
    "Esquecer que região de nuvem é um local físico com comunidade ao redor."
   ],
   "cola": [
    [
     "Estresse hídrico",
     "Demanda por água competindo com a oferta disponível"
    ],
    [
     "Matriz energética",
     "Composição das fontes de geração de uma região"
    ],
    [
     "Intensidade de carbono",
     "Carbono associado à geração de certa quantidade de energia"
    ],
    [
     "Hyperscale",
     "Data center de escala muito maior que instalações pequenas ou universitárias"
    ],
    [
     "Electricity Maps",
     "Mapa de intensidade de carbono, fontes e renováveis por região"
    ],
    [
     "Submarine Cable Map",
     "Mapa dos cabos de fibra óptica submarinos"
    ],
    [
     "Região de nuvem",
     "Localização física que afeta latência, preço, conformidade e impacto ambiental"
    ]
   ],
   "links": [
    [
     "Data Center Map",
     "https://www.datacentermap.com/"
    ],
    [
     "AI Data Center Map",
     "https://aidatacentermap.org/map"
    ],
    [
     "Submarine Cable Map",
     "https://www.submarinecablemap.com/"
    ],
    [
     "Electricity Maps",
     "https://app.electricitymaps.com/"
    ],
    [
     "Data centre water consumption (Nature, indicação 14)",
     "https://www.nature.com/articles/s41545-021-00101-w"
    ],
    [
     "Global Energy Monitor (citado nos slides)",
     "https://globalenergymonitor.org/#explore"
    ],
    [
     "WRI: impactos do crescimento de data centers nos EUA (README do repo)",
     "https://www.wri.org/insights/us-data-center-growth-impacts"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ]
  },
  {
   "id": "D10-16",
   "bloco": "d10-b4",
   "mod": "Unidade 7 · Aulas 18 e 19",
   "emoji": "🌡️",
   "read": "9 min",
   "title": "Treinamento, inferência, refrigeração, PUE e o dilema água versus energia",
   "short": "Três custos físicos (treino, inferência, refrigeração), a métrica PUE e quatro métodos de resfriamento, cada um com trade-offs.",
   "oneliner": "O custo físico se divide em <b>treinamento</b> (concentrado), <b>inferência</b> (contínua e pode superar o treino na vida do modelo) e <b>refrigeração</b>. O <b>PUE</b> mede energia total / energia de TI (1,0 é o ideal). Resfriar exige <b>gastar água ou energia</b>: ar, evaporativo, ar natural e circuito fechado, cada um deslocando custo; também há ruído, resíduos, emprego e comunidades.",
   "vovo": [
    "Treinar o modelo é como construir a fábrica: um esforço enorme, mas que acaba. Responder perguntas é a fábrica funcionando todos os dias, a qualquer hora. A fábrica esquenta, e esfriar custa: ou ar-condicionado (gasta luz) ou água que evapora (gasta água).",
    "Num lugar frio dá para abrir a janela. Num lugar quente, não. E quem mora ao lado ouve o barulho dos ventiladores o ano todo."
   ],
   "oque": [
    "<b>Treinamento:</b> evento concentrado (dias, semanas, meses), com GPUs perto da carga máxima; depende de tamanho do modelo, dados, arquitetura e número de GPUs. A pegada de carbono depende da matriz energética do local. Slide: treinar um grande modelo pode emitir centenas de toneladas de CO2, e há custo extrativo de minérios críticos (lítio, cobre, terras raras).",
    "<b>Inferência:</b> uso diário e contínuo, a cada prompt, chamada de API ou requisição de pipeline; milhões ou bilhões de interações, incluindo agentes e integrações automáticas. Ao longo da vida do modelo, a inferência pode superar o treinamento; exige infraestrutura 24x7. Responsabilidade individual (prompts menores) existe, mas não substitui a estrutural (eficiência do data center, matriz, refrigeração, hardware).",
    "<b>Refrigeração:</b> servidores e GPUs geram calor; parte relevante da energia mantém os equipamentos em temperatura segura. Água pode ser usada em sistemas evaporativos; GPUs mais potentes pressionam a refrigeração e impulsionam tecnologias líquidas. Ciclo preocupante: regiões quentes exigem mais refrigeração, que consome mais energia, que se tiver alto carbono agrava o clima.",
    "<b>PUE (Power Usage Effectiveness):</b> energia total do data center dividida pela energia dos equipamentos de TI. PUE 1,0 é o ideal teórico (tudo vai para TI); PUE 1,4 significa 0,4 de energia adicional em refrigeração, iluminação e demais sistemas. Quanto menor, melhor. A apostila e o slide citam o artigo da Nature sobre consumo de água em data centers como fonte.",
    "<b>Limites do PUE:</b> não informa a origem da energia, não mede água, impacto territorial nem resíduos; dois data centers com PUE parecido podem ter pegadas de carbono muito diferentes (um em renováveis, outro em carvão). Use PUE (quanto se desperdiça fora do processamento) junto com a matriz (qual a origem)."
   ],
   "como": [
    "<b>Resfriamento a ar:</b> ventiladores e ar-condicionado; consumo de água operacional baixo ou próximo de zero; custa eletricidade (pior em climas quentes); se a energia é fóssil, a pegada sobe; pode pressionar a rede elétrica regional.",
    "<b>Resfriamento evaporativo:</b> a água evapora e absorve calor (efeito do suor); mais eficiente eletricamente (PUE baixo) mas consome grandes volumes de água, parte perdida para a atmosfera; delicado em regiões áridas e de escassez hídrica.",
    "<b>Ar natural / free cooling (países frios, ex.: Islândia):</b> usa o ar externo, reduz compressores, PUE muito baixo e água próxima de zero; depende de clima e localização; custos de construção, redes de energia e telecomunicações, latência para quem está longe e lixo eletrônico.",
    "<b>Circuito fechado:</b> líquido refrigerante circula sobre os chips ou os componentes ficam em fluido dielétrico; alta eficiência térmica, água muito baixa; CAPEX maior, infraestrutura especializada e impactos de fabricação, manutenção e descarte de fluidos e equipamentos.",
    "<b>Não existe método perfeito:</b> cada solução desloca custos entre energia, água, infraestrutura, latência, investimento e resíduos. \"O barato volta a entrar\": a alternativa mais barata pode transferir custo para outros lugares (mais água, mais energia, comunidades). Eficiência técnica (PUE baixo) precisa ser lida junto com o impacto local.",
    "<b>Outras questões:</b> poluição sonora (exaustores, compressores, torres 24/7; ruído contínuo e de baixa frequência afeta sono, estresse e, pelos slides, hipertensão; fauna também), e o debate de empregos: a construção gera muitos empregos temporários e a operação exige equipes menores (a aula cita o estudo da FGV sobre empregos e um artigo do WSJ de contraponto; \"ler além da manchete\": quantos são temporários, quantos permanecem, que tipo de trabalho).",
    "<b>Brasil:</b> atrai interesse por energia, renováveis, recursos hídricos, território e minerais, mas não é homogêneo (áreas secas, ecossistemas sensíveis, comunidades vulneráveis). Perguntar onde, qual método de refrigeração, de onde vem a energia, quanta água, impacto na rede e que mitigação. Estratégia: ser só fornecedor de infraestrutura ou usar as vantagens para conhecimento, pesquisa, patentes e tecnologia própria?",
    "<b>No curso:</b> Duas aulas conceituais, sem código. A figura do PUE 1,4 é didática: a própria apostila avisa que o valor adicional de 0,4 é a diferença implícita entre PUE 1,4 e a referência de energia de TI igual a 1,0. Os slides \"Custos Ambientais da IA\" têm um slide por método de resfriamento (como funciona, vantagem, custo ambiental)."
   ],
   "aplica": [
    "Pedir ao provedor PUE, matriz e consumo de água da região ao comparar opções de hospedagem.",
    "Questionar propostas de data center local: método de refrigeração, origem da energia, água, ruído e empregos permanentes.",
    "Reduzir inferência desnecessária (cache, routing, contexto enxuto), que atende ao custo financeiro e ao ambiental."
   ],
   "pros": [
    "O modelo de três custos (treino, inferência, refrigeração) simplifica a conversa.",
    "PUE dá uma métrica comparável de eficiência de infraestrutura.",
    "O quadro de trade-offs ensina a perguntar quem recebe o benefício e quem paga o custo."
   ],
   "contras": [
    "PUE sozinho esconde matriz, água e impacto territorial.",
    "Sem método de refrigeração perfeito, a decisão é sempre contextual.",
    "Parte dos dados (centenas de toneladas de CO2, hipertensão) vem de slides em resumo; confira as fontes."
   ],
   "traps": [
    "Achar que o maior impacto é só o treinamento.",
    "Confiar em PUE baixo como prova de sustentabilidade.",
    "Escolher a alternativa mais barata sem olhar o custo transferido a água, energia e comunidade.",
    "Aceitar a manchete de milhares de empregos sem separar temporários de permanentes."
   ],
   "cola": [
    [
     "Treinamento",
     "Evento concentrado de alto consumo; carbono depende da matriz do local"
    ],
    [
     "Inferência",
     "Uso contínuo; pode superar o treinamento ao longo da vida do modelo"
    ],
    [
     "PUE",
     "Energia total do data center / energia dos equipamentos de TI"
    ],
    [
     "PUE 1,4",
     "0,4 de energia adicional para cada 1,0 de TI (refrigeração e demais sistemas)"
    ],
    [
     "Resfriamento evaporativo",
     "Usa água evaporada; menos energia, mais água"
    ],
    [
     "Free cooling",
     "Ar externo frio; depende de clima e traz custos de rede e infraestrutura"
    ],
    [
     "Circuito fechado / dielétrico",
     "Líquido circulando ou imersão; pouca água, CAPEX maior, descarte de fluidos"
    ],
    [
     "Poluição sonora",
     "Ruído contínuo de ventiladores e compressores; afeta sono e fauna"
    ]
   ],
   "links": [
    [
     "Data centre water consumption (Nature)",
     "https://www.nature.com/articles/s41545-021-00101-w"
    ],
    [
     "ASHRAE: energy and thermal efficiency (README do repo)",
     "https://www.ashrae.org/technical-resources/ai-data-center-framework/energy-and-thermal-efficiency"
    ],
    [
     "IEEE TechNav: Power Usage Effectiveness (README do repo)",
     "https://technav.ieee.org/topic/power-usage-effectiveness/"
    ],
    [
     "DW: pushback on data centers (README do repo)",
     "https://www.dw.com/en/pushback-on-data-centers-artificial-intelligence-water-drought-environmental-problems/a-78064418"
    ],
    [
     "FGV: data centers com IA geram mais de 12 mil empregos (README do repo)",
     "https://portal.fgv.br/noticias/estudo-da-fgv-aponta-que-data-centers-com-ia-geram-mais-de-12-mil-empregos-e-mobilizam-25-bilhoes"
    ],
    [
     "The water use of data center workloads (ScienceDirect, README do repo)",
     "https://www.sciencedirect.com/science/article/abs/pii/S0921344925001892?via%3Dihub"
    ],
    [
     "Electricity Maps",
     "https://app.electricitymaps.com/"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ]
  },
  {
   "id": "D10-17",
   "bloco": "d10-b5",
   "mod": "Unidade 8 · Aula 20",
   "emoji": "🔁",
   "read": "7 min",
   "title": "Revisão integrada: o que fica para a prática profissional",
   "short": "Governança, explicabilidade, viés, segurança, regulação, custos e ambiente convergem para: o ser humano no centro.",
   "oneliner": "A revisão final conecta os blocos numa postura: <b>governança começa na concepção e acompanha todo o ciclo de vida</b>, a produção exige monitoramento, segurança e custo são decisões de arquitetura, regulação e impacto ambiental entram na engenharia, e o raciocínio crítico (pesquisa, fontes, trade-offs) é a competência central.",
   "vovo": [
    "A disciplina inteira é como aprender a dirigir com responsabilidade: não basta saber acelerar. É preciso olhar o painel, conhecer as regras, saber quanto a viagem custa e quem mora na rua por onde se passa.",
    "O fim da aula repete o mesmo recado: o ser humano continua no centro, e a técnica serve a ele."
   ],
   "oque": [
    "<b>Governança:</b> começa na concepção (que dados, quem é afetado, qual risco, restrição regulatória, como monitorar, quem responde); acompanha dados, treino, validação, implantação, produção, monitoramento, manutenção e desativação. A produção costuma ser negligenciada: distribuição dos dados, usuários e contexto mudam, e a responsabilidade não termina quando o endpoint responde.",
    "<b>Interpretabilidade e explicabilidade</b> não são a mesma coisa; explicabilidade tende a ser cada vez mais demandada (segurança, regulação, auditoria, confiança, investigação de falhas). SHAP (contribuição, visão mais ampla) e LIME (local, por aproximação). É parte da responsabilidade, não recurso visual.",
    "<b>Vieses:</b> sociais, sistêmicos e estatísticos, vindos de dados, história, sociedade, escolhas de coleta, rotulagem e formulação do problema; medir impacto de forma segmentada (taxa de erro, grupos prejudicados, representatividade, diferença estatística ou decisão de projeto). <b>Direitos autorais</b> também fazem parte da IA responsável: produção humana não é recurso gratuito e dados sintéticos não substituem por completo.",
    "<b>Segurança de IA:</b> prompt injection, envenenamento de modelos e dados, e agência excessiva (privilégio mínimo para agentes). Perguntas: em que estamos trabalhando, o que pode dar errado, como reduzir o risco, como sabemos que os controles funcionaram? Materiais (OWASP, agentes) evoluem: a aula não é ponto final.",
    "<b>Regulação:</b> afeta arquitetura, dados, processos, responsabilidade e produtos; Collingridge, AI Act (quatro níveis), cenário brasileiro (LGPD, regras setoriais, debate de marco de IA), lobby e interesses sem \"torcida\". <b>Custos financeiros:</b> API versus infra própria, tokens, redução (caching, quantização, routing, RAG eficiente, modelos menores, fine-tuning, negociação), previsibilidade e produtividade como valor, não token. <b>Custos ambientais:</b> a nuvem não está no céu; treino, inferência e refrigeração se somam; dilema água versus energia; comunidades; energia como desafio geopolítico."
   ],
   "como": [
    "<b>Checklist de postura:</b> (1) perguntar antes de adotar: o que resolve, quanto custa, que risco cria, quem é afetado; (2) pesquisar fonte original, comparar versões e observar interesses; (3) trabalhar com trade-offs e reconhecer incerteza; (4) ser propositivo: apontar problema e propor controle.",
    "<b>Conexões entre blocos:</b> governança, segurança e responsabilidade se encontram na pergunta \"quem responde quando falha?\"; custo e infraestrutura também são decisões de governança; o papel que permanece humano mesmo com maior automação é decidir, responder e supervisionar.",
    "Aprendizado não termina na aula: cada tema (governança, explicabilidade, viés, segurança, regulação, FinOps, sustentabilidade) é um campo próprio; a disciplina dá base e aponta fontes.",
    "Mensagem final: construir soluções úteis, seguras, economicamente sustentáveis, ambientalmente conscientes e tecnicamente justificáveis, sempre pesquisando, questionando e atualizando o conhecimento. Não ser levado pelo hype de agentes, novos modelos e frameworks.",
    "<b>No curso:</b> Aula de revisão em formato de síntese, para consolidar e preparar o questionário da disciplina. Os slides \"Revisão\" listam os oito tópicos: Governança de IA, Interpretabilidade e Explicabilidade, Vieses e Responsabilidade, Aspectos Humanos e Éticos, Segurança e Dados, Aspectos Regulatórios, Custos Financeiros e Custos Ambientais."
   ],
   "aplica": [
    "Usar a lista de perguntas da concepção como template de design review para qualquer feature de IA.",
    "Transformar cada checkpoint da revisão em item de checklist de entrega (viés por grupo, controle de acesso do RAG, teto de custo).",
    "Estudar cada bloco aprofundando na fonte primária indicada (NIST, OWASP, AI Act, mapas de energia)."
   ],
   "pros": [
    "Costura os blocos numa narrativa única de responsabilidade.",
    "Oferece perguntas práticas em vez de decoreba de termos.",
    "Reforça pesquisa e pensamento crítico como competência contínua."
   ],
   "contras": [
    "É síntese: quem quer o detalhe precisa voltar ao tópico correspondente.",
    "Não traz material novo; depende do estudo prévio.",
    "Os slides da revisão listam só os oito tópicos abordados."
   ],
   "traps": [
    "Estudar só a revisão e pular os casos e exemplos que dão sentido aos conceitos.",
    "Tratar governança como etapa final.",
    "Decorar nomes de vulnerabilidades em vez de aprender a fazer as perguntas de segurança."
   ],
   "cola": [
    [
     "Governança by design",
     "Desde a concepção; acompanha todo o ciclo de vida"
    ],
    [
     "Ciclo de vida",
     "Dados, treino, validação, implantação, produção, monitoramento, manutenção, desativação"
    ],
    [
     "Privilégio mínimo para agentes",
     "Não dar ao agente mais poder do que ele precisa"
    ],
    [
     "Medição segmentada",
     "Taxa de erro e resultados por grupo, não só global"
    ],
    [
     "Collingridge",
     "Regular cedo sem informação ou tarde com custo alto de mudança"
    ],
    [
     "Token maxing",
     "Métrica ruim: produtividade medida por tokens gastos"
    ],
    [
     "Nuvem física",
     "Toda aplicação digital tem base material: prédios, energia, água, cabos, chips"
    ],
    [
     "Pessoa no centro",
     "Eixo que conecta governança, segurança, regulação, custo e ambiente"
    ]
   ],
   "links": [
    [
     "NIST AI Risk Management Framework",
     "https://www.nist.gov/itl/ai-risk-management-framework"
    ],
    [
     "OWASP Top 10 for LLM Applications 2025",
     "https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/"
    ],
    [
     "The EU Artificial Intelligence Act",
     "https://artificialintelligenceact.eu/"
    ],
    [
     "MIT AI Risk Repository",
     "https://airisk.mit.edu/"
    ],
    [
     "Repositório oficial do módulo (GitHub)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia"
    ]
   ]
  }
 ]
});
