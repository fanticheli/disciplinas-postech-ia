STUDY.push({
 "disc": {
  "num": "09",
  "nome": "Disciplina 09",
  "titulo": "Processamento de Dados e Fine-Tuning de Modelos",
  "autor": "José Ahirton Batista Lopes Filho",
  "emoji": "🎛️",
  "resumo": "Decidir se fine-tuning vale a pena (gate, AHP, NPV), preparar o dataset, treinar na Vertex AI e com LoRA local, avaliar com rigor e integrar o modelo num protótipo, tudo sobre o caso da Amplitude Seguros."
 },
 "materiais": [
  [
   "Repositório oficial — módulo 09",
   "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos"
  ],
  [
   "Vertex AI (provedor de fine-tuning gerenciado)",
   "https://cloud.google.com/vertex-ai"
  ],
  [
   "Indicação: LoRA (Hu et al.)",
   "https://arxiv.org/abs/2106.09685"
  ],
  [
   "Indicação: QLoRA (Dettmers et al.)",
   "https://arxiv.org/abs/2305.14314"
  ],
  [
   "Indicação: Deduplicating Training Data (Lee et al.)",
   "https://arxiv.org/abs/2107.06499"
  ],
  [
   "Indicação: LIMA (Zhou et al.)",
   "https://arxiv.org/abs/2305.11206"
  ],
  [
   "Indicação: Fine-Tuning or Retrieval? (Ovadia et al.)",
   "https://arxiv.org/abs/2312.05934"
  ],
  [
   "Indicação: DoRA (Liu et al.)",
   "https://arxiv.org/abs/2402.09353"
  ],
  [
   "Indicação: The Analytic Hierarchy Process (Saaty)",
   "https://archive.org/details/analytichierarch0000saat"
  ],
  [
   "Indicação: Biblioteca PEFT (Hugging Face)",
   "https://github.com/huggingface/peft"
  ],
  [
   "Indicação: Tesseract OCR",
   "https://github.com/tesseract-ocr/tesseract"
  ],
  [
   "Indicação: Microsoft Presidio",
   "https://microsoft.github.io/presidio/"
  ],
  [
   "Indicação: descontinuação do fine-tuning self-serve da OpenAI",
   "https://developers.openai.com/api/docs/deprecations"
  ],
  [
   "Indicação: model tuning da Gemini API",
   "https://ai.google.dev/gemini-api/docs/model-tuning"
  ],
  [
   "Indicação: OpenAI, caso Indeed",
   "https://openai.com/index/indeed"
  ]
 ],
 "blocos": [
  {
   "id": "d09-b0",
   "label": "Decidir: quando fazer fine-tuning"
  },
  {
   "id": "d09-b1",
   "label": "Dados: do documento ao dataset"
  },
  {
   "id": "d09-b2",
   "label": "Fine-tuning via API (Vertex AI)"
  },
  {
   "id": "d09-b3",
   "label": "LoRA e PEFT"
  },
  {
   "id": "d09-b4",
   "label": "Avaliar modelos fine-tunados"
  },
  {
   "id": "d09-b5",
   "label": "Projeto final"
  }
 ],
 "topics": [
  {
   "id": "D9-00",
   "bloco": "d09-b0",
   "mod": "Unidade 1 · Aulas 1 e 2",
   "emoji": "🧭",
   "read": "11 min",
   "title": "Fine-tuning ensina comportamento, não fatos: gate de governança, 4 perguntas e os 3 casos",
   "short": "Antes de qualquer dataset ou API, decida se fine-tuning é a ferramenta certa; as 4 perguntas precisam estar todas verdes.",
   "oneliner": "Fine-tuning é uma das ferramentas <b>mais caras e mais lentas de iterar</b>, então deveria ser uma das últimas opções. Ele ensina <b>comportamento, formato, tom e estrutura</b>, não fatos novos (isso é papel do RAG). A decisão se organiza em um <b>gate de governança</b> binário seguido de <b>4 perguntas</b> que precisam estar todas verdes.",
   "vovo": [
    "Pense numa loja com um atendente novo. O RAG é a prateleira de manuais ao lado do balcão: a cada pergunta, o atendente consulta o manual certo, e se um manual muda, a resposta muda na hora. Fine-tuning é um treinamento de semanas para o atendente falar sempre do jeito da loja (mesmo formato, mesmo tom). Se o problema é «o manual mudou», treinar o atendente de novo é gastar dinheiro à toa.",
    "Antes de pagar o treinamento, um comitê cauteloso faz perguntas simples: a tarefa é sempre a mesma? já tentamos o jeito barato? temos exemplos de verdade? o formato muda toda semana? E antes de tudo: podemos legalmente usar esses dados para treinar? Se uma resposta for «não», o comitê para ali."
   ],
   "oque": [
    "<b>O mito central:</b> fine-tuning não serve para ensinar fatos novos. Ele ajuda o modelo a responder de forma consistente a uma classe de solicitações (comportamento, formato, padrão, tom, estrutura). Conhecimento novo é resolvido pelo <b>RAG</b>: o texto vem de uma fonte externa a cada chamada e o modelo não muda.",
    "<b>Evidências citadas na aula:</b> no caso do Anyscale (ecossistema do Ray), textos de Shakespeare tiveram «Romeo» trocado por «Bob» e, mesmo depois do fine-tuning, o modelo continuou respondendo «Romeo» quando perguntado sobre o amado de Julieta com a dica de que o nome começava com R. Em um estudo da Microsoft (2024), no Llama 2 o fine-tuning isolado chegou a <i>piorar</i> a acurácia em fatos recentes, enquanto o RAG foi de cerca de 35% para quase 60%.",
    "<b>O lado certo:</b> a Indeed validou o comportamento com few-shot prompting e só depois fine-tunou um modelo menor para manter a qualidade com menor custo de inferência: cerca de 60% menos tokens, em escala de milhões de mensagens por mês.",
    "<b>As 4 perguntas:</b> (1) a tarefa é estreita e repetida? (2) prompt engineering, RAG, roteamento e cache já foram esgotados de verdade? (3) existem dados suficientes, diversos e de qualidade? (4) a tarefa é estável o bastante para não virar esteira de retreino? Cada uma tem sinal verde e sinal vermelho.",
    "<b>Gate de governança:</b> uma verificação binária que roda <i>antes</i> das 4 perguntas (e antes de AHP e análise econômica): há base legal definida para o tratamento? Se o dado é de categoria sensível, há DPA adequado com o provedor? Não é uma quinta pergunta ponderável, é um bloqueador.",
    "<b>Escada de customização:</b> prompt, <b>context engineering</b> (tudo que entra no contexto: histórico, documentos recuperados, saída de ferramentas, exemplos escolhidos dinamicamente; RAG é uma técnica dentro disso), <b>agent skills</b> (pacotes de instruções e, às vezes, código carregados sob demanda, sem alterar pesos) e só então fine-tuning.",
    "<b>Onde fine-tuning ainda ganha:</b> volume (reconstruir um contexto grande em milhões de chamadas custa tokens e latência), consistência de formato (sem repetir instruções em todo prompt, embora a validação determinística continue necessária e existam mecanismos como Structured Outputs) e modelo pequeno rodando local, sem contexto enorme nem skills externas."
   ],
   "como": [
    "<b>Fluxo da decisão:</b> governança primeiro; depois P1 a P4. Um sinal vermelho em pergunta importante interrompe a recomendação ali, sem forçar as demais para justificar uma decisão que já começou errada. O checklist organiza o julgamento, não o substitui.",
    "<b>Condições necessárias, não compensáveis:</b> tarefa estreita sem dados não é bom candidato; muito dado em tarefa aberta não resolve; tarefa repetitiva com contrato que muda toda semana vira esteira de retreino. Por isso as perguntas não compensam umas às outras.",
    "<b>Caso 1, Amplitude Auto</b> (extrair segurado, placa e valor de orçamentos de oficina): quatro verdes. A variação está só na forma de entrada (cada oficina tem seu layout), não na tarefa; prompt e RAG já estão em produção e ainda há inconsistência em escala; milhares de sinistros históricos (cerca de 8 mil por mês no exemplo); contrato de saída estável.",
    "<b>Caso 2, Amplitude Saúde Empresarial</b> (beneficiário, procedimento e valor de recibos médicos, cruzando titular e dependente): P1, P2 e P4 verdes, <b>P3 vermelha</b>. Linha mais nova, cerca de 1.200 casos por mês contra ~8 mil de Auto, score de dados 0,35 contra limiar 0,6. Recomendação: <i>ainda não</i>; o gargalo é histórico representativo, não ausência total de exemplos.",
    "<b>Caso 3, Atendimento ao Cliente</b> (negociar contestações de sinistro em conversa aberta): P2 e P3 <i>verdes de propósito</i> (prompt, RAG e roteamento humano já em produção; mais conversas por mês que Auto e Saúde somadas) e <b>P1 e P4 vermelhas</b> (tarefa aberta; política muda com revisão regulatória e produtos novos). Recomendação: <i>não</i> para a tarefa como definida. Dado de sobra não basta.",
    "<b>«Ainda não» versus «não»:</b> Saúde pode melhorar com tempo e coleta; Atendimento não melhora esperando, porque o problema é a natureza da tarefa.",
    "<b>Por que dados pesam mais no AHP</b> (adiantado na aula): prompt melhor se escreve amanhã, contrato se redesenha, RAG se revisa; histórico representativo depende de tempo, coleta ou fonte alternativa confiável.",
    "<b>Contexto do caso:</b> a Amplitude Seguros nasceu cooperativa de produtores rurais, virou S.A. e tem cultura de decisão colegiada e aversão a risco; Camila Andrade (head de dados e IA) já não precisa provar que IA generativa importa, a pergunta agora é quando vale ir além de prompt e RAG. A abertura da disciplina retoma o Trial Forge da disciplina anterior: um modelo menor especializado poderia deixar de escalar sempre para um modelo caro?"
   ],
   "aplica": [
    "Antes de pedir orçamento de treinamento, aplicar as 4 perguntas a uma tarefa do seu contexto, registrando para cada uma o sinal e a evidência.",
    "Separar casos de «ainda não» (dado insuficiente) de casos de «não» (tarefa aberta ou instável) e documentar a justificativa.",
    "Candidatos típicos: extração de campos fixos de documentos heterogêneos, classificação com contrato de saída fixo, saída estruturada em alto volume.",
    "Checar o gate de governança antes de discutir treinamento quando houver dado de saúde ou outro dado sensível."
   ],
   "pros": [
    "Barato de aplicar (um checklist) e evita o erro caro de treinar para o problema errado.",
    "Falha cedo: um vermelho interrompe a recomendação, e as justificativas ficam registradas para comitê.",
    "Separa com clareza conhecimento (RAG) de comportamento (fine-tuning)."
   ],
   "contras": [
    "Os scores dos casos são julgamentos do professor com números ilustrativos, não medições; o checklist organiza o julgamento mas não o substitui.",
    "Janelas de contexto maiores, modelos de raciocínio e tokens mais baratos mudam a escada de alternativas; o framework precisa ser revisitado.",
    "O gate de governança é raso por desenho (base legal e DPA); mascaramento de PII e auditoria completa ficam para depois, e para a disciplina de segurança e governança."
   ],
   "traps": [
    "Usar fine-tuning para «ensinar» política, preço ou regra que muda: isso é problema de conhecimento, e a resposta é RAG.",
    "Pular a pergunta 2: treinar não deveria ser um jeito de evitar especificar o comportamento num prompt bem escrito, com exemplos reais.",
    "Achar que muito dado resolve tarefa aberta (o caso Atendimento ao Cliente mostra que não).",
    "Deixar a média compensar um vermelho: as perguntas são condições necessárias.",
    "Tratar os números financeiros e de volume do exemplo (8 mil, 1.200 casos por mês) como dado real: a própria aula os chama de ilustrativos."
   ],
   "tip": "O framework executável (AHP, NPV, Monte Carlo, Real Options) está no <a href=\"#D9-01\">tópico 01</a>. Aqui ficam o checklist e os dados dos três casos.",
   "cola": [
    [
     "Pergunta 0",
     "O problema é de conhecimento (RAG) ou de comportamento (fine-tuning)?"
    ],
    [
     "Gate de governança",
     "Base legal definida e, se dado sensível, DPA com o provedor; binário e anterior a tudo"
    ],
    [
     "Tarefa estreita e repetida",
     "Descrita por uma frase válida para quase todo caso, com contrato de saída reconhecível"
    ],
    [
     "Context engineering",
     "Tudo que entra no contexto do modelo; RAG é uma técnica dentro dele"
    ],
    [
     "Agent skills",
     "Pacotes de instruções (e código) carregados sob demanda, sem alterar pesos"
    ],
    [
     "Esteira de retreino",
     "Contrato que muda toda semana obriga a revisar dataset, reavaliar e treinar de novo"
    ],
    [
     "Ainda não versus não",
     "Falha por dado pode melhorar com tempo; falha por tarefa aberta ou instável não"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 01 (Decision Framework)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-01-decision-framework"
    ],
    [
     "Ovadia et al. (Microsoft): Fine-Tuning or Retrieval? (indicação 18)",
     "https://arxiv.org/abs/2312.05934"
    ],
    [
     "OpenAI: Indeed constrói um recrutador virtual (indicação, relatório 1)",
     "https://openai.com/index/indeed"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-01-decision-framework (checklist e casos)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-01-decision-framework",
     "resumo": "A pasta do módulo 1 traz o checklist em Markdown e o JSON com os três casos da Amplitude. O executável que consome esses dados é descrito no tópico 01.",
     "fluxo": [
      "<code>decision-framework-checklist.md</code>: Pergunta 0 (conhecimento muda porque um fato mudou? então RAG) e a tabela das 4 perguntas com sinal verde e vermelho. Regra prática: as quatro precisam de verde. Registra a escada prompt, context engineering (RAG incluído), Agent Skills, fine-tuning.",
      "<code>amplitude-seguros-casos.json</code>: <code>limiarVerde: 0.6</code>, a matriz AHP e os 3 casos, cada um com <code>scores</code> de p1 a p4, <code>justificativas</code> por pergunta e bloco <code>governanca</code> (<code>dadoSensivelLGPD</code>, <code>baseLegalDefinida</code>, <code>dpaAssinado</code>).",
      "Scores: Auto (0,90; 0,85; 0,90; 0,85), Saúde Empresarial (0,85; 0,80; 0,35; 0,80), Atendimento ao Cliente (0,30; 0,75; 0,92; 0,35). Só Auto e Saúde têm bloco <code>financeiro</code>, e só Saúde tem <code>opcaoReal</code>.",
      "Só a Saúde Empresarial tem <code>dadoSensivelLGPD: true</code> (LGPD Art. 5º, II); é o único caso em que o DPA é de fato exigido pelo gate."
     ],
     "rodar": [
      "Nada a instalar: leia os dois arquivos e preencha a tabela «Seu caso» do checklist para uma tarefa sua (é a Missão Prática 1).",
      "Para ver os números rodando, execute o framework do <a href=\"#D9-01\">tópico 01</a>."
     ],
     "armadilhas": [
      "O próprio <code>_comentario</code> do JSON avisa que volume, custo por chamada, custo de treino e taxa de desconto são ilustrativos, calibrados para dar uma história coerente; não são dado de mercado.",
      "Os três casos passam no gate de governança: ele nunca bloqueia um caso do curso, só os testes o exercitam com casos construídos.",
      "O checklist e o cheatsheet apontam para <code>fine-tuning-zoo-poster.png</code>, mas a pasta só tem o <code>.html</code> do pôster (tópico 02).",
      "Os vídeos são numerados «Módulo 1.1, 1.2, 1.3» nos comentários do código; na apostila isso corresponde a Unidade 1, Aulas 1, 2 e 3."
     ]
    }
   ]
  },
  {
   "id": "D9-01",
   "bloco": "d09-b0",
   "mod": "Unidade 1 · Aula 3",
   "emoji": "📐",
   "read": "11 min",
   "title": "AHP, NPV, Monte Carlo e Real Options: do sinal verde ao número",
   "short": "O framework roda no terminal: pesos por AHP, NPV, 10 mil simulações e o valor de esperar, sem trocar o gate por média.",
   "oneliner": "A aula 3 tira a decisão do slide e a executa: <b>gate de governança, AHP com razão de consistência, NPV e break-even, 10 mil simulações de Monte Carlo e Real Options</b> para o caso que reprova só por dado. O score ponderado ajuda a quantificar, mas <b>nunca substitui o gate</b>.",
   "vovo": [
    "Em vez de o comitê dizer «acho que vale a pena», ele pede três coisas: quanto cada critério pesa e por quê, quanto dinheiro entra mês a mês depois de descontar o tempo, e o que acontece se as premissas oscilarem. É como planejar uma reforma: não basta o orçamento médio, você quer saber o pior e o melhor cenário.",
    "Para quem só foi reprovado por falta de exemplos, a pergunta vira outra: vale mais treinar agora arriscando erro, ou esperar uns meses juntando dado e treinar depois? Isso tem preço, e dá para calcular."
   ],
   "oque": [
    "<b>AHP (Analytic Hierarchy Process):</b> os pesos das 4 perguntas não são percentuais escolhidos a dedo; saem de uma matriz de comparação pareada. Na demonstração, a pergunta de dados ganha o maior peso porque é a única restrição que não se resolve por decisão da equipe. Pesos derivados: p1 = p2 = 0,141, p3 = 0,455, p4 = 0,263.",
    "<b>Razão de consistência:</b> detecta comparações contraditórias antes de confiar nos pesos; a referência é CR abaixo de 10%. A aula cita cerca de 0,038; o código do repositório imprime 0,0038 (os dois estão abaixo do limiar).",
    "<b>Comitê:</b> três perfis (produto, compliance, engenharia) com matrizes próprias, agregadas pela média geométrica célula a célula. Os pesos mudam pouco e os três veredictos continuam iguais: Auto aprovado, Saúde «ainda não», Atendimento reprovado.",
    "<b>NPV e break-even:</b> valor presente dos benefícios menos o investimento; break-even é o mês em que o acumulado cobre o investimento. Taxa de desconto de 1% ao mês (perfil avesso a risco). Para Auto, NPV em 24 meses positivo e break-even por volta do mês 10.",
    "<b>Monte Carlo (10.000 simulações):</b> volume, economia por requisição e custo variam, então os parâmetros viram distribuições triangulares (mínimo, mais provável, máximo). Para Auto, probabilidade de retorno positivo de 100% no horizonte analisado.",
    "<b>Real Options:</b> para Saúde, que reprova só por dado, a pergunta vira quanto vale manter a opção de treinar depois. A volatilidade é derivada do Monte Carlo e uma árvore binomial de 9 passos (um por mês, até o score de dados cruzar o limiar) é resolvida de trás para frente comparando treinar agora e continuar esperando.",
    "<b>Atendimento ao Cliente não recebe Real Options:</b> seu score composto pode até superar o de Saúde (0,66 contra 0,60), e uma decisão por média o aprovaria por engano; as condições necessárias P1 e P4 continuam vermelhas, e esperar não torna a tarefa estreita nem estabiliza uma política que muda.",
    "<b>Aprovar fine-tuning responde se vale, não como:</b> a escolha de técnica, provedor e infraestrutura é uma segunda decisão, tratada nos módulos 3 e 4."
   ],
   "como": [
    "<b>Pipeline do código:</b> governança, depois AHP e as 4 perguntas; só então NPV, Monte Carlo e, se e somente se a única pergunta vermelha for a de dados, Real Options; por fim análise de sensibilidade (±20% por parâmetro).",
    "<b>Antes de rodar:</b> uma suíte automatizada valida o comportamento esperado (29 testes na demonstração: 25 do framework mais 4 da seção de comitê).",
    "<b>Valor de esperar na prática:</b> decidir imediatamente tem valor econômico baixo (o risco do dado insuficiente supera a economia esperada); a opção de esperar recebe valor positivo, na ordem de centenas de reais. O número varia entre execuções porque a volatilidade vem da simulação. Esperar não é abandonar: fica registrada uma reavaliação futura (feita de verdade na aula 3.2 da Unidade 3).",
    "<b>Custo de treino vira premissa:</b> os R$ 2.400 usados como custo de treino são ilustrativos; para análise real, substituir por volume, custo de inferência, custo de treino, taxa de erro e impacto econômico próprios. A ferramenta organiza o cálculo, não cria premissas de negócio.",
    "<b>Missão prática:</b> aplicar as 4 perguntas ao seu caso, ponderar (AHP completo ou score simples, desde que documente por que um critério pesa mais), estimar retorno (um NPV determinístico ou break-even já bastam) e adaptar o Decision Framework Tool. Concluir que a tarefa não precisa de fine-tuning também é entrega válida."
   ],
   "aplica": [
    "Levar uma proposta de treinamento a um comitê com pesos justificados, NPV, intervalo de resultados e uma recomendação reprodutível.",
    "Para casos que reprovam só por dado, calcular quanto esperar e quando reavaliar, em vez de um «não» seco.",
    "Descobrir qual premissa mais move o resultado (sensibilidade) antes de gastar tempo refinando as outras.",
    "Tratar decisão de grupo: agregar matrizes de várias pessoas sem deixar um avaliador dominar."
   ],
   "pros": [
    "Decisão rastreável: cada pergunta tem justificativa, cada peso tem origem, cada cenário tem probabilidade.",
    "Monte Carlo troca uma planilha única por uma distribuição de resultados possíveis.",
    "O comitê mostra que o veredito é robusto a quem preencheu a matriz."
   ],
   "contras": [
    "Os números financeiros são ilustrativos e as distribuições triangulares são palpites de min/moda/max, não ajuste a dado histórico.",
    "AHP exige julgamentos subjetivos de importância relativa; a razão de consistência prova coerência, não acerto.",
    "Real Options só faz sentido para reprovação que o tempo resolve (dados); não se aplica a tarefa aberta ou instável."
   ],
   "traps": [
    "Aprovar por score composto alto: Atendimento ao Cliente tem score maior que Saúde e continua reprovado.",
    "Tratar o resultado de Real Options como valor fixo: ele muda a cada execução.",
    "Confundir «vale a pena treinar» com «como treinar»: a escolha entre Full, LoRA e API gerenciada vem depois.",
    "Esquecer que a análise financeira usa premissas calibradas para o case, não as suas."
   ],
   "cola": [
    [
     "AHP",
     "Pesos derivados de matriz de comparação pareada (escala de Saaty)"
    ],
    [
     "Razão de consistência (CR)",
     "Mede contradição no julgamento; abaixo de 0,10 é aceitável"
    ],
    [
     "AIJ",
     "Agregar julgamentos individuais pela média geométrica célula a célula"
    ],
    [
     "NPV",
     "Valor presente dos benefícios futuros menos o investimento"
    ],
    [
     "Break-even",
     "Mês em que o retorno acumulado cobre o investimento"
    ],
    [
     "Monte Carlo",
     "Muitas simulações com parâmetros amostrados de distribuições triangulares"
    ],
    [
     "Real Options",
     "Valor de esperar, via árvore binomial, quando a reprovação melhora com o tempo"
    ],
    [
     "Sensibilidade",
     "Ranking de quanto cada parâmetro move o NPV"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 01 (Decision Framework)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-01-decision-framework"
    ],
    [
     "Saaty: The Analytic Hierarchy Process (indicação 16)",
     "https://archive.org/details/analytichierarch0000saat"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-01-decision-framework (decision-framework-tool)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-01-decision-framework",
     "resumo": "Ferramenta de decisão em Node.js e Python (paridade funcional, sem dependências) que carrega os casos do JSON e executa gate, AHP, NPV, Monte Carlo, Real Options e sensibilidade. Reutilizada pelos módulos 3, 4 e 5.",
     "fluxo": [
      "<code>validarGovernancaDado</code>: reprova sem base legal definida ou com dado sensível sem DPA; roda antes do AHP e do resto, e um caso bloqueado nunca chega a calcular NPV.",
      "<code>derivarPesosAHP</code> usa a média geométrica das linhas (aproximação padrão do autovetor); <code>calcularConsistenciaAHP</code> calcula lambda_max, CI e CR com o índice aleatório de Saaty para n = 4 (0,90); <code>agregarMatrizesComite</code> faz a média geométrica célula a célula.",
      "<code>avaliarFramework</code> marca cada pergunta VERDE ou VERMELHO contra o limiar 0,6; <code>falhaSoDado</code> só é verdadeiro quando a única pergunta vermelha é a 3, o que habilita Real Options. <code>avaliarCasoCompleto</code> encadeia governança e gate.",
      "<code>calcularNPV</code>: volume cresce de forma composta, a economia mensal é volume vezes a diferença de custo por chamada, descontada mês a mês; aceita <code>atrasoMeses</code> (sem economia enquanto espera dado).",
      "<code>amostrarTriangular</code> e <code>simularMonteCarlo</code> (10.000 por padrão, RNG injetável para teste); <code>derivarVolatilidade</code> e <code>precificarOpcaoDeEsperar</code> montam a árvore CRR (u, d e probabilidade neutra ao risco) com meses de espera = ceil((scoreAlvo − score atual) / taxa de crescimento do score).",
      "<code>analisarSensibilidade</code> varia ±20% e ordena por amplitude. Na demo de Auto: custo por chamada do status quo (R$ 4.457), custo do fine-tuned, crescimento e custo de treino (R$ 960)."
     ],
     "rodar": [
      "<code>node decision-framework-tool.js</code> ou <code>python3 decision_framework_tool.py</code> (funcionou em Node 20 e Python 3, sem instalar nada).",
      "A saída termina com a seção «AHP de comitê» e os testes de regressão (comitê de 1 avaliador reproduz o AHP original)."
     ],
     "armadilhas": [
      "CR: a aula fala em cerca de 0,038 e o código (JS e Python) imprime 0,0038; leia como erro de transcrição ou arredondamento da aula, os dois estão abaixo de 0,10.",
      "As 10.000 simulações usam <code>Math.random</code> sem semente na demonstração: o valor da opção de esperar variou entre minhas execuções (R$ 225,91 em JS, R$ 232,52 em Python). Os testes usam RNG semeado.",
      "Os riscos operacionais de provedor (OpenAI e Gemini API) estão fixos no código com datas; viram desatualizados com o tempo.",
      "Na Saúde, «valor de exercer agora» sai zero porque o JSON soma uma penalidade de R$ 0,08 por chamada ao custo do fine-tuned (<code>custoDeErroEsperadoPorChamada</code>); mude esse parâmetro e o resultado muda."
     ]
    }
   ]
  },
  {
   "id": "D9-02",
   "bloco": "d09-b0",
   "mod": "Unidade 1 · Aula 3 (parte final)",
   "emoji": "🦒",
   "read": "12 min",
   "title": "Mapa das técnicas (o Zoo), casos de mercado e o risco de provedor e de obsolescência",
   "short": "Full, LoRA, QLoRA, instruction tuning, RLHF/DPO, destilação e GRPO, mais o risco de o provedor ou o modelo deixarem de existir.",
   "oneliner": "Depois de provar que fine-tuning vale a pena, escolhe-se a <b>técnica</b>: Full Fine-Tuning, LoRA, QLoRA, Instruction Tuning, RLHF/DPO, destilação (e, no cheatsheet, GRPO/RFT). Duas ressalvas operacionais fecham a unidade: o <b>provedor</b> pode abandonar o serviço e o <b>modelo de fronteira</b> pode alcançar o seu modelo customizado.",
   "vovo": [
    "Escolher a técnica é como escolher o jeito de reformar a casa: derrubar tudo e reconstruir (Full), trocar só os móveis e acabamentos (LoRA), fazer isso com materiais compactados para caber num orçamento pequeno (QLoRA), ensinar o morador a seguir qualquer instrução do síndico (instruction tuning), ou ajustar pelo gosto de quem mora (preferência humana).",
    "E existe o risco do «dono do terreno»: a empreiteira que você escolheu pode parar de prestar o serviço, e a casa que você reformou pode ficar atrás das novas construções do bairro. Um bom projeto prevê as duas coisas."
   ],
   "oque": [
    "<b>Full Fine-Tuning:</b> ajusta todos os parâmetros; mais caro e exige mais infraestrutura, mas dá mais liberdade quando o domínio está longe do comportamento original. Referência histórica: o Codex (GPT-3 com fine-tune completo em 159 GB de código do GitHub), base do GitHub Copilot.",
    "<b>LoRA:</b> o modelo base fica congelado e só adaptadores menores são treinados, reduzindo memória, custo e tempo. Caso Checkr + Predibase (Llama-3-8B com LoRA): 90% de acurácia nos casos mais difíceis, 5 vezes mais barato e 30 vezes mais rápido que a solução anterior com GPT-4.",
    "<b>QLoRA:</b> adaptadores sobre um modelo base quantizado (tipicamente 4 bits). Caso Guanaco: modelo de 65 bilhões de parâmetros numa única GPU de 48 GB, chegando a 99,3% do desempenho do ChatGPT no benchmark Vicuna.",
    "<b>Instruction Tuning:</b> ensina a seguir instruções em linguagem natural numa variedade de tarefas (FLAN: 137 bilhões de parâmetros ajustados em mais de 60 tarefas, superando o GPT-3 de 175 bilhões em 20 de 25 tarefas inéditas).",
    "<b>RLHF e DPO:</b> trabalham com preferência entre respostas. RLHF usa um modelo de recompensa e depois reinforcement learning; DPO otimiza diretamente sobre pares preferido e rejeitado. Variante RLAIF/Constitutional AI: o próprio modelo critica as respostas contra princípios escritos (custo de rotulagem de US$ 0,06 contra US$ 0,67 por exemplo humano, cerca de 11 vezes menor).",
    "<b>Destilação:</b> um modelo menor aprende a imitar um maior, em geral com exemplos gerados pelo maior (DeepSeek-R1: 800 mil exemplos destilados em modelos de 1,5 a 70 bilhões de parâmetros).",
    "<b>GRPO e RFT:</b> reforço com recompensa verificável; o modelo gera um grupo de respostas e a vantagem de cada uma é relativa ao grupo. Limite: se todo o grupo recebe a mesma recompensa, o desvio-padrão zera e não há sinal de treino (grupo degenerado, nomeado no DAPO).",
    "<b>Risco operacional de provedor:</b> serviço self-service pode mudar de estratégia. Na época da disciplina, o self-service de fine-tuning da OpenAI estava em descontinuação (orgs novas bloqueadas desde 7/mai/2026, perda de acesso por inatividade em 2/jul/2026, fim total em 6/jan/2027) e a API pública do Gemini já não aceitava fine-tuning desde maio de 2025 (último modelo suportado: Gemini 1.5 Flash-001). Isso muda <i>onde</i> treinar, não <i>se</i> vale a pena; a decisão técnica precisa de estratégia de saída.",
    "<b>Risco de obsolescência (caso Harvey):</b> em 2023 o modelo jurídico customizado foi preferido ao GPT-4 por advogados em 97% dos casos; em 2025 sete modelos de fronteira sem fine-tuning jurídico já o superavam no benchmark da Harvey; em 2026 a Harvey re-treinou e recuperou a liderança. Fine-tuning tem prazo de validade operacional e precisa ser reavaliado contra novas baselines."
   ],
   "como": [
    "<b>O cheat sheet como mapa da segunda decisão:</b> compara requisitos de dado, hardware, orçamento, hiperparâmetros e exemplos de mercado, e propõe perguntas práticas: quão distante o domínio está do modelo genérico, quanto orçamento existe, qual latência a produção exige. A lógica é a mesma do framework: primeiro provar que fine-tuning merece existir, depois escolher Full, LoRA, API gerenciada ou outra abordagem.",
    "<b>Faixas de referência do cheatsheet</b> (modelo de 7B, valores de ago/2026 que o próprio documento manda reconferir): Full ~100 a 120 GB de VRAM (multi-GPU), LoRA ~16 a 24 GB (uma GPU), QLoRA ~10 a 14 GB (GPU de consumidor). Para LoRA, o documento cita rank e alpha proporcionais, com alvo mínimo nas camadas de atenção.",
    "<b>Quando DPO, quando RLHF:</b> DPO é mais simples e estável com um conjunto fixo de pares de preferência; RLHF compensa quando a fidelidade do sinal de recompensa importa mais que a simplicidade e há orçamento para o pipeline completo.",
    "<b>Estratégia de saída:</b> considerar dependência de fornecedor, portabilidade de artefatos e alternativas locais ou em outros provedores. Por isso a disciplina usa dois caminhos reais: nuvem gerenciada (Vertex AI) e treino local (MLX).",
    "<b>Reavaliar periodicamente:</b> o arco da Harvey mostra que um fine-tuning vantajoso hoje pode perder a vantagem sem nenhum aviso; o treinamento anterior não foi erro, gerou valor enquanto tinha vantagem."
   ],
   "aplica": [
    "Escolher a técnica pelo problema, pelo hardware, pelo orçamento e pela distância entre o comportamento desejado e o que o modelo base já faz.",
    "Para pouco volume ou dado sensível, comparar nuvem gerenciada com treino local (assunto da Unidade 4).",
    "Antes de comprometer orçamento, checar se o provedor ainda oferece fine-tuning self-service e se a versão do modelo base ainda será suportada.",
    "Agendar uma reavaliação contra modelos de fronteira novos."
   ],
   "pros": [
    "Dá vocabulário e critérios comuns para comparar técnicas muito diferentes.",
    "Cada técnica vem com um caso real verificável e fonte.",
    "Mostra cedo os riscos de dependência de provedor e de obsolescência."
   ],
   "contras": [
    "Os números de hardware e custo são faixas de mercado de uma data (ago/2026) e envelhecem rápido.",
    "Alguns casos de mercado vêm de relatos das próprias empresas ou de fornecedores.",
    "O cheatsheet cobre mais técnicas do que o resto da disciplina executa de fato (só SFT, LoRA e Full são treinados; DPO é testado uma vez)."
   ],
   "traps": [
    "Escolher a técnica antes de provar que fine-tuning se justifica.",
    "Assumir que o tutorial antigo de um provedor ainda aponta para um fluxo que existe: verifique a capacidade real na data de uso.",
    "Confundir a retirada de uma versão de modelo (a família Gemini 2.5 tem aposentadoria anunciada para 16/out/2026, segundo o companion e os comentários de código do repositório; a apostila só diz que existem datas de retirada anunciadas, sem citar o dia) com a retirada do recurso de fine-tuning do provedor; são riscos diferentes.",
    "Esperar que RLAIF ou DPO substituam a necessidade de dados de preferência de boa qualidade."
   ],
   "cola": [
    [
     "Full Fine-Tuning",
     "Atualiza todos os parâmetros; teto de qualidade mais alto, custo mais alto"
    ],
    [
     "LoRA",
     "Congela o modelo e treina só matrizes de baixo posto"
    ],
    [
     "QLoRA",
     "LoRA sobre base quantizada em 4 bits"
    ],
    [
     "Instruction Tuning",
     "Ajuste para seguir instruções em linguagem natural"
    ],
    [
     "RLHF / DPO",
     "Preferência humana via modelo de recompensa (RLHF) ou direto em pares (DPO)"
    ],
    [
     "Distillation",
     "Modelo menor imita modelo maior"
    ],
    [
     "GRPO / RFT",
     "Reforço com recompensa verificável, vantagem relativa ao grupo"
    ],
    [
     "Grupo degenerado",
     "Todas as recompensas iguais: vantagem zero e nenhum sinal de aprendizado"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 01 (cheatsheet, pôster e demo GRPO)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-01-decision-framework"
    ],
    [
     "LoRA (Hu et al.)",
     "https://arxiv.org/abs/2106.09685"
    ],
    [
     "QLoRA (Dettmers et al.)",
     "https://arxiv.org/abs/2305.14314"
    ],
    [
     "FLAN: Finetuned Language Models Are Zero-Shot Learners",
     "https://arxiv.org/abs/2109.01652"
    ],
    [
     "InstructGPT: instruções com feedback humano",
     "https://arxiv.org/abs/2203.02155"
    ],
    [
     "DeepSeek-R1",
     "https://arxiv.org/abs/2501.12948"
    ],
    [
     "Codex: Evaluating LLMs Trained on Code",
     "https://arxiv.org/abs/2107.03374"
    ],
    [
     "Constitutional AI",
     "https://arxiv.org/abs/2212.08073"
    ],
    [
     "RLAIF versus RLHF",
     "https://arxiv.org/abs/2309.00267"
    ],
    [
     "DeepSeekMath (GRPO)",
     "https://arxiv.org/abs/2402.03300"
    ],
    [
     "DAPO (grupo degenerado)",
     "https://arxiv.org/abs/2503.14476"
    ],
    [
     "Cronograma de descontinuação do fine-tuning self-serve da OpenAI",
     "https://developers.openai.com/api/docs/deprecations"
    ],
    [
     "Model tuning da Gemini API (descontinuado)",
     "https://ai.google.dev/gemini-api/docs/model-tuning"
    ],
    [
     "Harvey: Expanding Harvey's Model Offerings (2025)",
     "https://harvey.ai/blog/expanding-harveys-model-offerings"
    ],
    [
     "Applied Compute: case study Harvey (2026)",
     "https://appliedcompute.com/case-studies/harvey"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-01-decision-framework (cheatsheet, zoo, GRPO) e companions da raiz",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-01-decision-framework",
     "resumo": "Material de consulta do módulo 1 (cheatsheet dos tipos, pôster, dossiê interativo, demo de GRPO) mais quatro companions na raiz da disciplina: casos de mercado, disponibilidade de provedores, risco de validade de modelo e histórico do fine-tuning.",
     "fluxo": [
      "<code>fine-tuning-types-cheatsheet.md</code>: sete seções (Full, LoRA, QLoRA, Instruction Tuning, RLHF/DPO, Distillation, GRPO/RFT), cada uma com o que é, quando usar, requisitos práticos, caso real e fontes; fecha com tabela comparativa e as seções de risco de provedor e obsolescência (Harvey).",
      "<code>fine-tuning-zoo-poster.html</code>: chave de identificação (gate e P1 a P4 em fluxograma) e seis «espécies»; <code>mecanismo-estado-arte-companion.html</code> é o «Bestiário», dossiê de mecanismo com 45+ fontes.",
      "<code>grpo-verifiable-reward-demo.js/.py</code>: amostra G = 6 respostas reais de um modelo local (Ollama, <code>gemma4:e2b</code>, temperatura 1) para extrair campos de um comunicado de sinistro ruidoso, calcula recompensa verificável por campo e a vantagem relativa ao grupo (com EPS contra divisão por zero), sem atualizar pesos. 10 testes sem rede.",
      "Na raiz: <code>disponibilidade-fine-tuning-provedores-companion.md</code> (Google, OpenAI, Anthropic), <code>risco-validade-modelo-companion.md</code> (Gemini 2.5 e Gemma 4), <code>historico-fine-tuning-companion.md</code> (de BERT a LoRA/DPO) e <code>casos-de-mercado-fine-tuning-companion.md</code> (21 casos em 7 setores)."
     ],
     "rodar": [
      "<code>node grpo-verifiable-reward-demo.js</code>: os 10 testes rodam offline; a amostragem real precisa de <code>ollama serve</code> e do modelo <code>gemma4:e2b</code> (aqui só rodei a parte offline: o script avisa que não conectou ao Ollama).",
      "Abra os <code>.html</code> no navegador; os companions são Markdown."
     ],
     "armadilhas": [
      "O README raiz fala em «6 tipos» num ponto e em «7 tipos» em outro; o pôster tem seis espécies e o cheatsheet e o dossiê têm sete (GRPO/RFT entrou depois e «ainda não entrou no pôster»).",
      "O cheatsheet e o checklist citam <code>fine-tuning-zoo-poster.png</code>, que não está no repositório (só o HTML).",
      "O companion de risco e vários comentários de código registram que a família Gemini 2.5 tem retirement anunciado para <b>16/out/2026</b> (a apostila não cita a data, só diz que há datas de retirada anunciadas; não conferi na documentação da Google). Em 03/10/2026 faltavam 13 dias. Os scripts de Vertex AI dependem de <code>gemini-2.5-flash</code> (constante a trocar em cada um).",
      "O Gemma 4 E2B aparece em três formas (MLX, Hugging Face e Ollama), cada uma com seu id; a demo de GRPO usa a de Ollama."
     ]
    }
   ]
  },
  {
   "id": "D9-03",
   "bloco": "d09-b1",
   "mod": "Unidade 2 · Aula 1",
   "emoji": "🧾",
   "read": "12 min",
   "title": "Do documento bruto ao exemplo validado: relevância, OCR, parser, esquema canônico e PII",
   "short": "Um pipeline em estágios (gate, OCR, parser tolerante, validação, redação de PII) que transforma documento em exemplo JSONL rastreável.",
   "oneliner": "Preparar dado para fine-tuning não é acumular documentos. A aula monta um pipeline em estágios, cada um impedindo uma falha diferente: <b>gate de relevância, OCR, parser tolerante, validação de esquema, PII scrubbing e JSONL canônico</b>, tudo com texto bruto e metadados preservados para rastrear a origem de cada exemplo.",
   "vovo": [
    "Imagine montar um álbum de receitas a partir de caixas de papéis velhos. Primeiro você descarta o que não é receita (relevância). Depois alguém digita o texto de cada papel (OCR), outra pessoa localiza ingredientes e modo de preparo mesmo quando cada autor escreveu de um jeito (parser tolerante), uma terceira confere se a receita está completa (validação) e, por fim, você apaga o nome e o telefone de quem escreveu (redação de dado pessoal).",
    "Se uma receita sai sem ingredientes e você a coloca no álbum assim mesmo, quem aprender com ele vai achar normal receita sem ingrediente. Por isso o bom curador prefere rejeitar a aceitar «quase certo»."
   ],
   "oque": [
    "<b>Pré-requisito vindo da Unidade 1:</b> Auto já estava aprovado e Saúde Empresarial devia esperar; mas decidir treinar ou esperar não produz dataset. A espera de Saúde não é inatividade: é o período para melhorar coleta, qualidade, governança e cobertura, então ela é preparada com o mesmo rigor.",
    "<b>Gate de relevância (data-centric AI):</b> o dataset não é tudo que existe no arquivo. Quatro perguntas, todas verdadeiras: o documento tem o ground truth da tarefa? vem do fluxo real de produção? ajuda a cobrir a variação real de formatos? pode ser usado em treino do ponto de vista de sensibilidade e compliance? O LIMA é citado: um conjunto pequeno e curado pode superar volumes maiores e menos controlados.",
    "<b>Sete candidatos, dois aprovados:</b> passam o orçamento de oficina e o recibo médico. Boletim de ocorrência não entrega segurado, placa e valor de forma confiável; foto do veículo não contém o documento textual; transcrição de ligação varia demais entre atendentes; prontuário completo falha em compliance (minimização da LGPD); cadastro de beneficiários é tabela de referência, não par de entrada e saída.",
    "<b>OCR com Tesseract:</b> motor open source (rede neural nas versões modernas); para português é preciso instalar o pacote de idioma (acentos, cedilha, termos médicos). O OCR entra nos documentos de apoio que nascem fora da plataforma (orçamento de oficina, recibo de clínica), não no formulário principal, que chega estruturado.",
    "<b>Parser tolerante:</b> «segurado» versus «nome do segurado», «placa» versus «placa do veículo», «valor» versus «valor cobrado». Expressões regulares tolerantes a variações plausíveis, sem depender de posição fixa e sem inventar campo quando o valor não foi encontrado.",
    "<b>Validação de esquema como portão:</b> campo obrigatório ausente ou valor zero/negativo é rejeitado. Sem isso, o parser que devolve campo vazio entra no dataset e o modelo aprende que não identificar o segurado é normal; multiplicado por centenas de documentos vira ruído sistemático.",
    "<b>Esquema canônico de 4 campos:</b> instrução (a mesma frase dentro de um caso), entrada (texto bruto do OCR, sem edição manual), saída (objeto estruturado) e metadata (caso, arquivo de origem, confiança do OCR, resultado das validações). Deliberadamente independente de provedor: conversores específicos vêm depois.",
    "<b>PII scrubbing:</b> o texto bruto preserva nome completo, então em produção é preciso pseudonimizar antes do treino. O gate redige nome e CPF (CPF validado pelo dígito verificador; nome ancorado em rótulos como «segurado» e «beneficiário»); placa e valor ficam porque a tarefa precisa deles. O limite é assumido: nome solto em texto livre exigiria NER mais robusto, como o Microsoft Presidio.",
    "<b>Quando 4 viram centenas:</b> aparecem viés de amostragem (90% dos orçamentos de poucas oficinas) e quase-duplicatas. São problemas de composição do conjunto, tratados na aula seguinte."
   ],
   "como": [
    "<b>Fluxo:</b> documento bruto, OCR, parser, validação de esquema, exemplo estruturado. Misturar tudo numa função esconderia onde um erro nasceu; separar mantém a rastreabilidade.",
    "<b>Dado real na demonstração:</b> quatro imagens sintéticas (dois orçamentos e dois recibos) passam pelo binário real do Tesseract. O texto bruto não é perfeito (espaços extras, quebras) e é preservado como entrada. O parser converte valor monetário brasileiro para número decimal.",
    "<b>Confiança do OCR como metadado:</b> a média palavra a palavra reportada pelo Tesseract (cerca de 94% a 96% nos quatro documentos). Fica guardada para virar gate operacional depois (documento degradado deve ir a revisão humana).",
    "<b>Testes que provam recusa:</b> 28 testes automatizados: conversão de valores em reais (a vírgula decimal), OCR e campos nos 4 documentos, confiança em faixa válida e, no fim, o caminho contrário (exemplo sem placa e exemplo com valor zero são rejeitados). Não basta provar que aceita o correto, é preciso provar que recusa o incorreto.",
    "<b>Rastreabilidade versus privacidade:</b> guardar o texto bruto permite voltar do exemplo estranho ao documento, ao OCR ou ao parser, e auditar o tratamento de dado de saúde (sensível); mas preservar o nome completo é uma tensão que o scrubbing resolve antes do treino.",
    "<b>Companion de dado regulado:</b> cobre higienização de PII/PHI (regex para identificadores estruturados mais NER para nome em texto livre; rodar a detecção localmente), privacidade diferencial (DP-SGD, DP-LoRA), fine-tuning federado, risco de memorização e o cenário regulatório brasileiro (LGPD e a agenda da ANPD).",
    "<b>OCR versus LLM multimodal (material extra):</b> o mesmo gabarito rodado contra o Gemini 2.5 Flash, sem OCR nem regex, deu 12/12 em ambos os caminhos. A diferença é de engenharia: o OCR precisou de um parser por layout; o multimodal usou um prompt genérico, ao custo de latência de rede (cerca de 2,6 a 4,8 s por documento) e tokens (~2.384 de entrada por documento)."
   ],
   "aplica": [
    "Antes de coletar, aplicar o gate de relevância a pelo menos quatro candidatos de fonte do seu caso e manter ao menos um rejeitado com justificativa.",
    "Extrair campos de documentos heterogêneos com OCR e parser tolerante, ou com um LLM multimodal quando há muitos layouts e pouco volume.",
    "Definir um esquema canônico com instrução, entrada, saída e metadata e só depois converter para cada provedor.",
    "Redigir identificadores diretos antes de qualquer treinamento, e registrar o limite do método usado."
   ],
   "pros": [
    "Cada estágio tem uma responsabilidade clara e testável isoladamente.",
    "O esquema canônico evita refazer OCR, parsing, compliance e validação ao trocar de provedor.",
    "A confiança do OCR vira um sinal de qualidade que não se perde."
   ],
   "contras": [
    "Parser por regex exige uma função por layout e quebra com layouts inéditos.",
    "A redação por âncora de rótulo não pega nome solto em texto livre; não é anonimização completa.",
    "Preservar texto bruto é bom para auditoria e ruim para privacidade se o scrubbing não rodar antes do treino."
   ],
   "traps": [
    "Chamar de dataset tudo o que existe no arquivo da empresa.",
    "Aceitar extração incompleta: «quase certo» não é suficiente para dado de treino.",
    "Achar que dado real e limpo é automaticamente dado adequado (o cadastro de beneficiários é real e limpo, mas não é par de entrada e saída).",
    "Esquecer o pacote de idioma português do Tesseract e perder acentos e termos médicos."
   ],
   "tip": "A deduplicação, o balanceamento e as métricas de diversidade vêm no <a href=\"#D9-04\">tópico 04</a>.",
   "cola": [
    [
     "Data-centric AI",
     "Melhorar sistematicamente o dado e os critérios do que entra no treino"
    ],
    [
     "Gate de relevância",
     "Quatro perguntas, todas verdadeiras, antes de OCR e parsing"
    ],
    [
     "Parser tolerante",
     "Regex que aceita variações de rótulo e não depende de posição fixa"
    ],
    [
     "Esquema canônico",
     "instrução, entrada, saída e metadata, independente do provedor"
    ],
    [
     "PII scrubbing",
     "Redação de nome e CPF (com dígito verificador) antes do treino"
    ],
    [
     "NER",
     "Reconhecimento de entidades nomeadas, necessário para nome em texto livre"
    ],
    [
     "Confiança do OCR",
     "Média palavra a palavra do Tesseract guardada no metadata"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 02 (Preparação de Datasets)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-02-preparacao-datasets"
    ],
    [
     "LIMA: Less Is More for Alignment (indicação 10)",
     "https://arxiv.org/abs/2305.11206"
    ],
    [
     "Tesseract OCR",
     "https://github.com/tesseract-ocr/tesseract"
    ],
    [
     "Microsoft Presidio",
     "https://microsoft.github.io/presidio/"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-02-preparacao-datasets (relevância, extração, PII)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-02-preparacao-datasets",
     "resumo": "Quatro ferramentas (JS e Python) e três documentos: gate de relevância, extração OCR para JSONL, gate de PII e o contraponto com LLM multimodal, mais as imagens sintéticas em <code>documentos-brutos/</code> e o JSONL de saída.",
     "fluxo": [
      "<code>data-relevance-scoring-tool.js</code>: <code>avaliarCandidato</code> exige os 4 critérios verdadeiros; aplica aos 7 candidatos (4 de Auto, 3 de Saúde) e confirma que exatamente <code>orcamento-oficina</code> e <code>recibo-medico</code> passam (11 testes).",
      "<code>extraction-to-jsonl-tool.js</code>: <code>ocrTexto</code> e <code>ocrConfiancaMedia</code> chamam o binário <code>tesseract</code> (<code>-l por</code>, saída texto e TSV); <code>parsearOrcamentoAuto</code> e <code>parsearReciboSaude</code> usam regex tolerantes; <code>parsearValorBRL</code> converte «3.210,50»; <code>validarExemplo</code> exige campos obrigatórios e valor positivo; grava <code>dataset-amplitude-seguros.jsonl</code>.",
      "<code>pii-scrubbing-gate-tool.js</code>: valida CPF pelo dígito verificador (rejeita sequência repetida e dígito errado), detecta nome por âncora de rótulo (com e sem acento) e redige para <code>[NOME_REDIGIDO]</code> e <code>[CPF_REDIGIDO]</code>; CPF inválido não é redigido (evita falso positivo). 11 testes.",
      "<code>extracao-llm-multimodal-tool.js</code>: manda cada PNG ao Gemini via Vertex AI (REST, token do <code>gcloud</code>) com prompt genérico e compara com o mesmo gabarito; <code>ocr-vs-llm-extracao-comparativo.md</code> traz o resultado lado a lado.",
      "<code>privacy-preserving-finetuning-companion.md</code> (PII/PHI, privacidade diferencial, federado, memorização, LGPD) e <code>documentos-brutos/</code> (4 PNG sintéticos)."
     ],
     "rodar": [
      "<code>node data-relevance-scoring-tool.js</code> e <code>node pii-scrubbing-gate-tool.js</code> rodam sem instalar nada (e os equivalentes <code>python3 ..._tool.py</code>).",
      "<code>node extraction-to-jsonl-tool.js</code> exige <code>tesseract</code> com o pacote <code>por</code> (<code>brew install tesseract tesseract-lang</code> no macOS). Aqui não tinha Tesseract instalado, então não executei esta etapa; contei os 28 testes lendo o código (2 de valor, 6 por documento vezes 4, 2 de rejeição).",
      "<code>GCP_PROJECT_ID=meu-projeto node extracao-llm-multimodal-tool.js</code> faz chamada paga à Vertex AI e exige <code>gcloud auth application-default login</code>; sem a variável, o script lança erro já no topo do arquivo."
     ],
     "armadilhas": [
      "O gate de PII é uma ferramenta separada: <code>extraction-to-jsonl-tool.js</code> não o chama. Por isso <code>dataset-amplitude-seguros.jsonl</code> guarda os nomes completos sem redação.",
      "Esse JSONL também guarda ruído de OCR no rótulo: o primeiro registro tem <code>placa: QJk-4F82</code> (esperado QJK-4F82). O teste passa porque a comparação de texto ignora caixa; é exatamente o tipo de ruído de rótulo que a aula diz querer rejeitar.",
      "O cabeçalho dos testes do gate de PII diz «Módulo 11» (o algoritmo de CPF), o que lê como número de módulo do curso; é só o nome do algoritmo.",
      "A referência de indicações atribui o estudo LLM-Anonymizer (NEJM AI) a «Becker et al.»; o companion do repositório cita «Wiest et al.»: conferir antes de citar.",
      "A confiança do OCR existe no metadata, mas o gate que a usa só aparece no módulo 3 (tópico 05)."
     ]
    }
   ]
  },
  {
   "id": "D9-04",
   "bloco": "d09-b1",
   "mod": "Unidade 2 · Aula 2",
   "emoji": "🧬",
   "read": "11 min",
   "title": "O dataset como conjunto: MinHash, LSH, amostragem por temperatura e entropia",
   "short": "Exemplos válidos um a um ainda podem formar um dataset ruim: quase-duplicatas e fontes dominantes pedem método formal.",
   "oneliner": "Um dataset pode ter só exemplos individualmente corretos e ainda induzir o modelo ao erro. A aula muda a unidade de análise para o conjunto e usa <b>MinHash + LSH</b> para achar quase-duplicatas, <b>amostragem por temperatura</b> (alfa = 0,3) para balancear fontes e <b>entropia de Shannon</b> para medir diversidade.",
   "vovo": [
    "Uma turma com 50 alunos em que 30 são irmãos que copiam a mesma redação parece grande, mas ensina pouco: o professor corrige trinta vezes a mesma coisa. Primeiro você identifica as cópias quase idênticas (mesmo que uma tenha um erro de digitação), sem comparar cada aluno com todos os outros.",
    "Depois equilibra a turma: nenhuma família pode ocupar metade das vagas, mas você também não inventa alunos que não existem. E, para provar que a turma ficou mais variada, usa um número em vez de impressão."
   ],
   "oque": [
    "<b>Dois problemas de conjunto:</b> quase-duplicatas (o mesmo sinistro reenviado, ou reescaneado com pequena diferença de OCR) e desbalanceamento de fonte (uma oficina de grande volume com mais da metade do dataset: se uma fonte tem 60%, tem 60% das oportunidades de ajuste).",
    "<b>Por que deduplicar muda o modelo, não só o arquivo:</b> o estudo da Google Research no corpus C4 achou uma frase repetida dezenas de milhares de vezes e mostrou menos texto memorizado, menos passos de treino para desempenho equivalente e menos contaminação entre treino e teste. Deduplicar protege treinamento, custo e avaliação ao mesmo tempo.",
    "<b>Padronização antes de comparar:</b> minúsculas, colapso de espaços e remoção de sobras nas extremidades, para que diferenças cosméticas não escondam semelhança.",
    "<b>MinHash:</b> cada texto vira uma assinatura de tamanho fixo (32 valores na demo); a fração de posições iguais entre duas assinaturas aproxima a similaridade de Jaccard sem comparar todos os fragmentos. Sozinho, não decide duplicata, só barateia a comparação.",
    "<b>LSH (Locality Sensitive Hashing):</b> a assinatura é dividida em bandas (8 bandas de 4 valores). Quem colide em ao menos uma banda vira candidato. No conjunto da aula, 549 comparações por força bruta viraram 20 candidatos (redução de ~96,4%) e os três pares plantados foram todos encontrados (recall perfeito).",
    "<b>Refino exato:</b> o LSH só localiza candidatos; antes de remover, uma comparação de Jaccard exata confirma. Dois orçamentos da mesma oficina com o mesmo template e sinistros diferentes não são duplicata: mesmo template não é duplicata.",
    "<b>Amostragem por temperatura:</b> pesos proporcionais à frequência elevada a alfa (alfa = 1 mantém a proporção original; alfa menor suaviza para o uniforme; alfa = 0,3, valor associado ao mT5). Os pesos contínuos viram contagens inteiras pelo método do maior resto <i>com restrição de capacidade</i>: nenhuma fonte recebe mais exemplos do que realmente tem. Balancear não é duplicar minoria.",
    "<b>Efeito medido:</b> a Oficina Estrela cai de ~53,8% para 40% dos exemplos de Auto; a Clínica Vitalis de ~61,1% para 50% em Saúde.",
    "<b>Diversidade com número:</b> entropia de Shannon da distribuição por fonte e o <i>número efetivo de fontes</i> (exp da entropia: a quantas fontes igualmente representadas a distribuição equivale). Auto vai de ~3,279 para ~3,742 (4 fontes reais); Saúde de ~2,544 para ~2,814 (3 fontes).",
    "<b>Resultado do pipeline:</b> 47 exemplos simulados, 44 após deduplicação, 34 após balanceamento: um arquivo menor, com menos repetição e melhor distribuído."
   ],
   "como": [
    "<b>Ordem:</b> normalizar, shingles, assinatura MinHash, bandas LSH, candidatos, Jaccard exato, remoção, depois balancear por temperatura e medir entropia antes e depois.",
    "<b>16 testes automatizados:</b> aproximação do MinHash em relação ao Jaccard exato, recall do LSH, duplicatas plantadas, restrição de capacidade e comportamento das métricas (suavizar nunca reduz a diversidade medida; nenhuma fonte recebe mais do que possui).",
    "<b>Implementar à mão:</b> na construção do material não havia biblioteca JavaScript madura com MinHash e LSH banding; quando a abstração pronta não existe, ainda é preciso entender a técnica para implementar ou validar.",
    "<b>Qualidade e volume juntos:</b> fine-tuning ainda precisa de cobertura suficiente; o erro é contar exemplos repetidos ou concentrados como informação nova. Passa-se a medir volume, redundância e diversidade.",
    "<b>Missão prática:</b> aplicar o gate a pelo menos quatro candidatos (um rejeitado), declarar o esquema canônico, montar ou simular um dataset de pelo menos 15 exemplos de pelo menos 3 fontes, rodar MinHash + LSH e balanceamento, comparar a distribuição antes e depois com entropia e ter ao menos um teste automatizado. Concluir que a fonte principal ainda não tem volume também é válido."
   ],
   "aplica": [
    "Limpar datasets de documentos onde várias unidades de uma mesma rede geram texto quase idêntico.",
    "Evitar que poucos parceiros de grande volume dominem o treinamento e o modelo generalize mal para fontes novas.",
    "Medir diversidade antes e depois de uma curadoria, em vez de declarar que «ficou mais diverso».",
    "Proteger a avaliação: deduplicar também entre treino e teste, para não medir memória no lugar de generalização."
   ],
   "pros": [
    "Reduz o custo de comparação de O(n²) para um número muito menor de candidatos sem perder duplicatas reais (nos testes).",
    "A temperatura balanceia sem corte arbitrário e sem inventar exemplo.",
    "Entropia e número efetivo de fontes dão um número comparável antes e depois."
   ],
   "contras": [
    "Os números da aula vêm de um dataset simulado, pequeno, com duplicatas plantadas; em dado real o LSH precisa de calibração de bandas e limiares.",
    "Fonte pequena demais não pode ser inflada: o balanceamento só reaproveita o que existe.",
    "MinHash trata similaridade sintática; não detecta o mesmo sentido com palavras diferentes."
   ],
   "traps": [
    "Remover candidato do LSH sem o refino exato: mesmo template com sinistros distintos não é duplicata.",
    "Balancear duplicando exemplos da fonte minoritária para preencher cota.",
    "Confundir a «temperatura» do balanceamento com a temperatura de geração do LLM (parâmetro que aparece mais adiante).",
    "Comparar só a entrada ao deduplicar quando o par instrução e entrada é que define o exemplo (aparece no dataset Dolly do módulo 3)."
   ],
   "cola": [
    [
     "Quase-duplicata",
     "Mesmo conteúdo com pequena diferença cosmética (reenvio, OCR)"
    ],
    [
     "Jaccard",
     "Interseção sobre união de dois conjuntos de shingles"
    ],
    [
     "MinHash",
     "Assinatura de tamanho fixo que aproxima o Jaccard"
    ],
    [
     "LSH banding",
     "Divide a assinatura em bandas; colisão numa banda gera candidato"
    ],
    [
     "Recall",
     "Fração das duplicatas reais que o método encontra"
    ],
    [
     "Amostragem por temperatura",
     "Peso proporcional a n elevado a alfa; alfa = 0,3 como no mT5"
    ],
    [
     "Maior resto",
     "Converte pesos contínuos em inteiros somando ao alvo, com capacidade"
    ],
    [
     "Número efetivo de fontes",
     "exp(entropia de Shannon): fontes equivalentes igualmente representadas"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 02 (Preparação de Datasets)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-02-preparacao-datasets"
    ],
    [
     "Lee et al.: Deduplicating Training Data Makes Language Models Better",
     "https://arxiv.org/abs/2107.06499"
    ],
    [
     "Raffel et al.: T5 (amostragem por temperatura)",
     "https://arxiv.org/abs/1910.10683"
    ],
    [
     "Xue et al.: mT5 (alfa = 0,3)",
     "https://arxiv.org/abs/2010.11934"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-02-preparacao-datasets (limpeza e balanceamento)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-02-preparacao-datasets",
     "resumo": "Uma ferramenta de ~750 linhas (JS e Python) que implementa do zero MinHash, LSH banding, refino de Jaccard, amostragem por temperatura com maior resto capacitado, entropia e número efetivo de fontes. É reutilizada pelos módulos 3 e 6, e há um documento de comparação com bibliotecas de mercado.",
     "fluxo": [
      "<code>gerarDatasetSimulado</code> monta 47 exemplos (28 Auto de 4 oficinas, 19 Saúde de 3 clínicas) com um reenvio e um ruído de OCR («P1aca do veicu1o») plantados; <code>normalizarTexto</code> e <code>shingles</code> (5 palavras).",
      "<code>gerarCoeficientesHash</code> (LCG determinístico), <code>assinaturaMinHash</code> (k = 32), <code>bandingLSH</code> (b = 8, r = 4), <code>encontrarQuaseDuplicatasMinHashLSH</code> com refino por <code>similaridadeJaccardExata</code> e limiar de 0,55; <code>removerQuaseDuplicatas</code> mantém a primeira ocorrência.",
      "Balanceamento por temperatura (alfa = 0,3), alocação por maior resto com capacidade, <code>entropiaShannon</code> e número efetivo de fontes; <code>limparEBalancear</code> encadeia tudo e é exportada para os módulos seguintes.",
      "<code>de-para-bibliotecas-de-mercado.md</code>: três das seis peças não têm biblioteca madura (deduplicação completa em JS, amostragem por temperatura, validação de schema JSONL por API); normalização e similaridade têm (<code>natural</code>, <code>compromise</code>, <code>fastest-levenshtein</code>); PII tem o Presidio."
     ],
     "rodar": [
      "<code>node dataset-cleaning-balancing-tool.js</code> (ou o <code>.py</code>); sem dependências. Saída real: 549 pares força-bruta reduzidos a 20 candidatos, 47 para 44 para 34 exemplos, Auto 3,279 para 3,742 e Saúde 2,544 para 2,814.",
      "Os 16 testes rodaram verdes em JS e Python."
     ],
     "armadilhas": [
      "Nas minhas execuções a redução do LSH foi de 95,0% em Auto (19 candidatos de 28 itens, porque os templates repetem cabeçalhos longos) e 99,4% em Saúde; os «96,4%» da aula são o total.",
      "O LSH com b = 8 e r = 4 tem ponto de corte aproximado de similaridade (1/b)^(1/r) ≈ 0,59, pouco acima do limiar de 0,55 do refino: um par com similaridade perto de 0,55 vira candidato só em cerca de metade das vezes (1 − (1 − s^4)^8 ≈ 0,54), e a probabilidade sobe para ~0,89 em s = 0,7. Duplicatas fracas podem escapar do LSH antes do refino. O recall de 100% vale para as 3 duplicatas plantadas, não é garantia geral.",
      "O documento de comparação lembra que a amostragem por temperatura daqui usa a convenção n elevado a alfa (mT5), diferente da r elevado a 1/T do T5 original (seqio/t5x).",
      "As funções <code>encontrarQuaseDuplicatasMinHashLSH</code> e <code>limparEBalancear</code> são fixas nos dois casos da disciplina (Auto e Saúde); o dataset Dolly (tópico 06) reimplementa o laço de forma genérica."
     ]
    }
   ]
  },
  {
   "id": "D9-05",
   "bloco": "d09-b2",
   "mod": "Unidade 3 · Aulas 1 e 2",
   "emoji": "☁️",
   "read": "12 min",
   "title": "Fine-tuning gerenciado na Vertex AI: diligência de provedor, os 5 passos e um job real",
   "short": "O provedor óbvio pode sumir; o processo de 5 passos permanece, e o esquema canônico paga o investimento na conversão.",
   "oneliner": "Aprovar fine-tuning é a primeira decisão; <b>como treinar</b> é a segunda. A Unidade 3 trata o caminho gerenciado: escolher o provedor com <b>diligência de continuidade</b> (Vertex AI), seguir os <b>5 passos</b> (converter, subir, configurar, treinar, monitorar) e rodar um job real com 200 exemplos, depois de reavaliar Saúde Empresarial pelo mesmo critério.",
   "vovo": [
    "Contratar fine-tuning por API é como mandar uma obra para uma construtora: você entrega as plantas no formato que ela exige, ela faz o serviço no canteiro dela e você acompanha pelo painel. Antes de assinar, a pergunta madura é se a construtora ainda vai existir daqui a seis meses, quando você precisar de uma reforma.",
    "E o contrato bom não obriga você a refazer a papelada inteira se trocar de construtora: você guarda as plantas num formato próprio e só ajusta a última página para cada fornecedor."
   ],
   "oque": [
    "<b>Segunda decisão:</b> o módulo 1 decidiu se vale a pena; o módulo 2 preparou dado relevante, validado, higienizado, deduplicado e diverso; agora é «como treinar»: API gerenciada (módulo 3) ou LoRA local (módulo 4). Aprovar fine-tuning não significa que a API gerenciada seja automaticamente a melhor técnica.",
    "<b>Risco de depender de um provedor:</b> durante a preparação da disciplina o self-service de fine-tuning da OpenAI entrou em descontinuação e a API pública do Gemini já havia encerrado o recurso. Tutorial antigo pode estar conceitualmente certo e apontar para um fluxo que já não existe.",
    "<b>Diligência de provedor:</b> a pergunta de Camila não é só se há API funcional, e sim: se for preciso retreinar em seis meses o serviço continuará disponível? o modelo base ainda será suportado? o acesso continuará self-service? contrato e permissões continuarão adequados?",
    "<b>Provedor adotado:</b> Vertex AI no Google Cloud (apresentado sob a marca da plataforma empresarial do Gemini), escolhido pela integração com o resto do stack (armazenamento, identidade, permissões, faturamento, cotas). Azure OpenAI, Together AI, Fireworks e Mistral são citados como opções que continuam relevantes. Não é a antiga API pública do Gemini com fine-tuning por API key.",
    "<b>Os 5 passos genéricos:</b> (1) preparar o dataset no formato exato do provedor, (2) enviá-lo a um armazenamento acessível ao serviço, (3) configurar o job (modelo base e hiperparâmetros), (4) treinamento gerenciado, (5) monitorar até sucesso ou falha. O que muda entre provedores é o contrato concreto, não a arquitetura.",
    "<b>Cada treino gera um artefato versionado:</b> retreinar não deve substituir silenciosamente o anterior; produção precisa saber qual versão atende, com qual dataset e quais configurações.",
    "<b>Validação sintética antes do dado real:</b> 32 exemplos separados dos conjuntos do módulo 2, só para provar a infraestrutura: pending, running e succeeded em pouco menos de meia hora, endpoint publicado ao final. Confirma que a conversão foi aceita, o upload funcionou com as permissões certas, os hiperparâmetros foram aceitos e o status da API bate com o console.",
    "<b>Governança reaberta:</b> uma base legal e um DPA aprovados para um serviço não se transferem automaticamente a outro; trocar de provedor reabre o gate do módulo 1.",
    "<b>Esquema canônico paga a conta:</b> no formato da Vertex AI, instrução e entrada são combinadas no turno do usuário e a saída vira o turno do modelo (o JSON exato). A camada de adaptação é pequena porque limpeza, relevância, deduplicação e balanceamento não dependem do provedor.",
    "<b>Gate de confiança de OCR:</b> a confiança guardada no módulo 2 ganha função: documentos reais (94% a 96%) passam; um documento degradado (62%) vai para revisão humana em vez de entrar no treino. Os 200 exemplos do job não passam pelo gate porque são texto sintético, sem confiança de OCR (ausência é «não aplicável», não «baixa qualidade»).",
    "<b>Escala do pipeline:</b> 305 exemplos brutos (6 oficinas e 5 clínicas), 300 após deduplicação, 200 após balanceamento por temperatura (120 Auto e 80 Saúde). Número efetivo de fontes: Auto ~5,2 para ~5,7 (a aula diz 5,516 no «antes»; o código imprime 5,160) e Saúde ~4,1 para ~4,7.",
    "<b>Reavaliação de Saúde, nove meses depois:</b> o mesmo framework, mesmos pesos e limiar, só a pergunta 3 atualizada: de 0,35 para 0,62 (crescimento de 0,03 por mês), volume de 1.200 para ~1.862. «A régua não foi reduzida para caber na demonstração.»",
    "<b>Um bug real no gerador sintético:</b> listas de nomes, placas e valores de 40 itens ciclavam juntas; o exemplo 41 repetia nome, placa e valor do exemplo 1 e o detector via duplicata. A correção usou pools de tamanhos diferentes (mais de 1.500 combinações antes de repetir) e só restaram os 5 pares plantados. Lição: valide as duplicatas do bruto antes de confiar na métrica.",
    "<b>Job real:</b> o job foi criado antes da gravação (leva dezenas de minutos); ao vivo roda-se uma consulta de status real. Gemini 2.5 Flash, 3 épocas, upload como novo objeto (cada versão do dataset mantém seu caminho). Succeeded em ~45 min 42 s (o piloto de 32 exemplos levou ~28 min 32 s), ~27.353 tokens cobráveis, modelo ajustado e endpoint publicado."
   ],
   "como": [
    "<b>Fronteira local versus nuvem:</b> conversão do dataset e gate de OCR rodam localmente, sem credenciais nem custo; só depois entram autenticação, bucket, API e recursos cobráveis. Isso permite testar regra de qualidade sem depender de cota.",
    "<b>Estados do job:</b> Pending é a fila; Running é treinamento em execução (os pesos estão sendo atualizados por lote); Succeeded significa que terminou e o artefato foi publicado; Failed pode trazer formato inválido, cota excedida ou hiperparâmetro fora da faixa. Em produção, esses estados decidem se o sistema espera ou se alguém age.",
    "<b>Testes antes do upload:</b> 13 testes confirmam que cada exemplo convertido tem dois turnos, o turno do usuário carrega instrução e entrada completas, o do modelo traz o JSON esperado, exemplos incompletos são rejeitados antes de qualquer upload e o gate de OCR encaminha cada caso pelo motivo certo.",
    "<b>Custo gerenciado não é minuto visível:</b> a Vertex AI cobra o treinamento por tokens processados. A aula cita uma faixa de cinco a onze centavos de dólar; o repositório a trata como subestimativa e registra o valor real do billing, R$ 2,39 (27.353 tokens × 3 épocas, tópico 07). Número do repositório prevalece sobre o da aula.",
    "<b>Escala de tempo:</b> converter, subir e configurar o job é rápido para centenas de exemplos; o tempo real está no treinamento. Em dataset pequeno, nuvem e local levam minutos; a diferença estrutural (comparada no módulo 4 com números) é quem controla e paga o tempo: fila e infraestrutura compartilhada no gerenciado, a sua máquina no local.",
    "<b>Missão prática do bloco:</b> representar o processo em cinco passos, registrar as verificações locais anteriores ao uso de recursos do provedor e incluir diligência de provedor e reavaliação de governança na arquitetura."
   ],
   "aplica": [
    "Escolher provedor de fine-tuning avaliando continuidade, suporte ao modelo base, governança e estratégia de saída, não só a documentação.",
    "Validar o caminho completo com um dataset sintético pequeno antes de pôr dado real no pipeline.",
    "Manter um formato canônico e um conversor final por provedor.",
    "Reavaliar uma decisão antiga («esperar») com o mesmo critério e dado novo, em vez de mudar a régua."
   ],
   "pros": [
    "Sem GPU nem ambiente próprio: sobe-se o dataset e dispara-se o job.",
    "O esquema canônico torna a troca de provedor um problema de conversor, não de pipeline.",
    "Os estados do job e os artefatos publicados são observáveis por API."
   ],
   "contras": [
    "Você passa a depender de fila, cota, modelos suportados, limites e preço do provedor.",
    "O modelo base tem data de retirada anunciada; o nome do modelo da demo pode não existir quando você executar.",
    "O treino é opaco: não há curva de loss na API usada, só estatísticas do dataset."
   ],
   "traps": [
    "Confiar em post de blog ou exemplo de curso como se descrevesse a capacidade atual do provedor.",
    "Reaproveitar o aceite jurídico de um provedor para outro.",
    "Sobrescrever o dataset de um job anterior: o job que falha precisa continuar apontando para os dados usados.",
    "Tratar como «real» o dataset de 200 exemplos: são textos sintéticos gerados por um gerador determinístico, só chamados de reais por terem sido treinados de verdade."
   ],
   "cola": [
    [
     "Vertex AI",
     "Plataforma gerenciada do Google Cloud usada para o fine-tuning supervisionado"
    ],
    [
     "Job de tuning",
     "Recurso cobrável que treina e publica modelo ajustado e endpoint"
    ],
    [
     "Pending / Running / Succeeded",
     "Fila, treinamento em execução, terminou com artefato publicado"
    ],
    [
     "contents / role / parts",
     "Formato de exemplo da Vertex AI: turnos user e model com partes de texto"
    ],
    [
     "Gate de confiança de OCR",
     "Confiança baixa vai para revisão humana antes do treino"
    ],
    [
     "Diligência de provedor",
     "Checar continuidade, suporte, acesso e contrato antes de escolher"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 03 (Fine-Tuning via API)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-03-fine-tuning-via-api"
    ],
    [
     "Vertex AI",
     "https://cloud.google.com/vertex-ai"
    ],
    [
     "Documentação de tuning (Gemini Enterprise Agent Platform)",
     "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning"
    ],
    [
     "Notas de versão da Vertex AI (aposentadoria de modelos)",
     "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/release-notes"
    ],
    [
     "Cronograma de descontinuação da OpenAI",
     "https://developers.openai.com/api/docs/deprecations"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-03-fine-tuning-via-api (conversão, escala e job real)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-03-fine-tuning-via-api",
     "resumo": "Três ferramentas (JS e Python), o dataset treinado em formato Vertex e o guia opcional de setup do Google Cloud. A conversão e o gate rodam local; só a consulta ao job real chama a nuvem.",
     "fluxo": [
      "<code>dataset-upload-and-tracking-tool.js</code>: <code>converterParaFormatoGemini</code> gera <code>contents</code> com um turno <code>user</code> (instrução, linha em branco, entrada) e um <code>model</code> (<code>JSON.stringify(saida)</code>); <code>filtrarPorConfiancaOcr</code> (limiar padrão 0,85) separa aprovados, sem confiança de OCR e sinalizados para revisão; <code>consultarStatusJob</code> faz GET REST em <code>aiplatform.googleapis.com</code> com <code>gcloud auth print-access-token</code>. 13 testes.",
      "<code>m3-dataset-scaling-tool.js</code>: gera 305 exemplos brutos (183 Auto e 122 Saúde), reusa <code>limparEBalancear</code> do módulo 2 por <code>require</code> e entrega 200 (120 e 80); 6 testes, incluindo «nenhum id repete» (o bug do gerador). Exporta <code>gerarExemplo</code>, reutilizado pelo harness do módulo 5.",
      "<code>reavaliacao-saude-empresarial.js</code>: <code>construirCasoNoveMesesDepois</code> soma 0,03 por mês ao score p3 durante 9 meses (0,62) e cresce o volume; reaplica o mesmo <code>avaliarFramework</code> do módulo 1. 5 testes.",
      "<code>dataset-treinado.jsonl</code> (200 linhas, só <code>contents</code>, sem metadata) é o dataset enviado ao job; <code>gcp-setup-companion.md</code> traz os 7 passos para criar projeto, billing, APIs, autenticação e bucket."
     ],
     "rodar": [
      "<code>node m3-dataset-scaling-tool.js</code> e <code>node reavaliacao-saude-empresarial.js</code> rodam sem nada (resultado: 305 para 300 para 200; p3 0,62; volume 1.862).",
      "<code>TUNING_JOB_NAME=projects/.../tuningJobs/ID node dataset-upload-and-tracking-tool.js</code> roda os 13 testes e tenta a consulta; sem <code>gcloud</code> ela cai no aviso «Não foi possível consultar o job agora». O script lança erro no topo se a variável não existir."
     ],
     "armadilhas": [
      "A aula diz que o número efetivo de Auto sobe de ~5,516 para ~5,723; o código imprime 5,160 antes e 5,723 depois (Saúde 4,140 para 4,706 bate). Provável erro de digitação da aula.",
      "A aula aponta custo de cinco a onze centavos de dólar para o job; o model card e o documento de decisões do repositório corrigem para R$ 2,39 conferidos no billing (tópico 07).",
      "A nota de p3 = 0,62 é uma projeção linear (0,35 + 0,03 × 9), não uma medição de dado novo; o código «constrói o caso nove meses depois», não coleta nada.",
      "O dataset de 200 exemplos só tem 28 nomes, 28 placas e 28 valores distintos repetidos em vários templates (contei no arquivo): a «diversidade de fonte» é de template, não de entidade.",
      "Comentários de código e documentos citam o ID de um job real do autor; as ferramentas exigem <code>TUNING_JOB_NAME</code> e não têm valor padrão.",
      "A chamada do job exige <code>gcloud</code> autenticado e projeto com billing; a família Gemini 2.5 tem retirement anunciado para 16/out/2026."
     ]
    }
   ]
  },
  {
   "id": "D9-06",
   "bloco": "d09-b2",
   "mod": "Unidade 3 · Aulas 3 e 4",
   "emoji": "🛡️",
   "read": "12 min",
   "title": "Hiperparâmetros, silêncio de API e automação segura: validar antes, comparar depois",
   "short": "A API aceitou epoch_count igual a zero e treinou: duas camadas de proteção e uma automação com trava de confirmação, backoff e testes sem rede.",
   "oneliner": "Criar um job não é operá-lo com critério. A aula mostra um incidente real (<b>epoch_count = 0 aceito sem erro</b>) e constrói duas proteções, <b>validar antes da rede</b> e <b>comparar pedido versus aplicado</b>, e depois uma automação com <b>fail fast, confirmação explícita antes de ação cara, backoff exponencial e injeção de dependência</b> para testar sem rede.",
   "vovo": [
    "Você pede à padaria 3 bolos e o balconista, sem avisar, anota «um qualquer» porque não entendeu o pedido. A nota fiscal sai correta, o bolo chega errado e você só descobre na festa. A defesa é dupla: conferir o pedido antes de mandar (valores impossíveis nem saem de casa) e conferir a nota depois (o que foi anotado é o que eu pedi?).",
    "E se você pede à padaria para entregar toda semana sozinha, a regra de ouro é: tudo que é barato pode rodar sozinho; o que gasta dinheiro precisa de um «pode confirmar» explícito."
   ],
   "oque": [
    "<b>Três hiperparâmetros do módulo:</b> epoch count (quantas vezes o modelo percorre o dataset; 3), learning rate multiplier (multiplica uma taxa base interna calibrada pelo provedor; 5) e adapter size (capacidade da camada adaptativa treinada; 4).",
    "<b>Épocas:</b> poucas passagens dão underfitting; demais, principalmente em dataset pequeno, dão overfitting. Dataset menor tolera mais épocas; maior pede menos. É ponto de partida, não fórmula.",
    "<b>Multiplicador e adapter:</b> perto de 1 preserva o ritmo calibrado; um valor baixo demais deixaria o modelo parecido com o base; alto demais pode desestabilizar. Adapter size baixo basta para aprender um padrão estreito (saída curta de três campos); ranks 8 ou 16 custam mais parâmetros, memória e tempo.",
    "<b>O incidente real:</b> ao tentar criar um job com epoch count 0, esperava-se falha de validação antes de alocar recurso. A Vertex AI aceitou, levou o job a Running e o campo apareceu ausente na configuração aplicada. O job foi cancelado após cerca de 40 segundos (custo pequeno, mas real).",
    "<b>Silêncio não é confirmação:</b> numa automação semanal de retreino, um bug que zerasse o epoch count criaria jobs por semanas.",
    "<b>Proteção 1, validar antes da rede:</b> epoch count inteiro entre 1 e 20 e learning rate multiplier entre 0,1 e 10; valor zero, negativo ou fracionário é rejeitado localmente, de graça.",
    "<b>Proteção 2, pedido versus aplicado:</b> depois de criar o job, comparar o que foi pedido com o que o objeto do job diz ter aplicado. Uma pegadinha: a API devolve inteiros de 64 bits como texto, então a comparação tenta converter os dois lados para número antes de decidir se há divergência (senão, o monitor acusaria erro em jobs corretos).",
    "<b>Monitoramento sem curva de loss:</b> nesta API não há loss durante o job, só estatísticas do dataset: ~27.353 tokens cobráveis, entradas na ordem de uma centena de tokens e saídas ao redor de 27 em média. A API aceita um dataset de validação separado, deixado de fora de propósito para o módulo de avaliação.",
    "<b>Automação em 5 passos:</b> converter, validar, subir ao bucket, criar o job, acompanhar até estado terminal. Sequencial por desenho: se o upload falha, não se cria job; se um exemplo é incompleto, para antes dos hiperparâmetros (fail fast).",
    "<b>Confirmação onde o impacto justifica:</b> a criação do job só executa a chamada com confirmação explícita (<code>confirmar: true</code>); sem ela, o erro sai localmente. É a versão mínima do «plan e apply» da infraestrutura como código e do dry run.",
    "<b>Idempotência parcial:</b> repetir o upload para o mesmo caminho substitui o objeto (idempotente); criar job não é: cada chamada bem-sucedida cria um treino novo e uma nova cobrança.",
    "<b>Polling com backoff:</b> primeira consulta imediata; depois 5 s, multiplicando por 1,5 até o teto de 60 s (5; 7,5; 11,25; 16,875...). O teto limita a demora para perceber o fim a ~1 minuto. Um callback registra cada estado, para a automação não parecer travada.",
    "<b>Injeção de dependência:</b> a função de consulta e a de espera são injetáveis; nos testes entram versões falsas (estado terminal já na primeira consulta; sequência Pending, Running, Running, Succeeded com exatamente 3 esperas; callback recebendo todos os estados na ordem)."
   ],
   "como": [
    "<b>Testes da etapa 3.3:</b> 9 testes (configuração real passa, epoch 0 rejeitado, negativos e não inteiros falham, comparação detecta divergência de valor e campo ausente, texto equivale a número) e a reprodução local do bloqueio do zero.",
    "<b>Testes da etapa 3.4:</b> 18 testes em grupos: upload (comando montado, extensão JSONL, destino começando com o esquema do storage), trava de confirmação (bloqueia sem opção, com opções vazias, libera só com verdadeiro), conversão e validação reusadas, backoff (fator e teto) e o loop assíncrono com dependências falsas, mais a orquestração ponta a ponta e seus caminhos de falha.",
    "<b>Dataset alternativo:</b> para quem não tem caso de trabalho, o repositório processa o Dolly-15k de ponta a ponta com a mesma esteira (mapeamento ao esquema canônico, dedup, balanceamento, conversão, job real, inferência com temperatura 0). O primeiro job usou multiplicador 1 e o modelo ficou quase igual ao base; refeito com multiplicador 5, a mesma pergunta passou a ter resposta correta.",
    "<b>Configuração é contextual:</b> três épocas, multiplicador 5 e adapter 4 valem para este dataset e esta tarefa; com dataset maior, menos épocas; com tarefa mais ampla, rank maior; em experimentos comparativos, fixar o resto para variar uma coisa por vez."
   ],
   "aplica": [
    "Tratar toda API de treinamento como não confiável para validação: validar localmente e auditar o aplicado.",
    "Colocar confirmação explícita em qualquer passo de automação que crie recurso cobrável.",
    "Escrever monitores com backoff, teto, callback e retry de falha transiente, testados sem rede e sem esperar.",
    "Registrar cada hiperparâmetro como decisão do experimento, não como número copiado de tutorial."
   ],
   "pros": [
    "Uma falha que consumiria infraestrutura vira um erro local imediato e barato.",
    "A injeção de dependência torna o loop assíncrono rápido e determinístico de testar.",
    "A confirmação concentra a supervisão humana no ponto de maior impacto."
   ],
   "contras": [
    "A validação local não prevê todas as regras internas do provedor (por isso a segunda camada).",
    "A comparação cobre só os campos que você passa para comparar.",
    "O backoff de 5 s a 60 s para jobs de dezenas de minutos significa que a maior parte do tempo é gasta no teto de consulta."
   ],
   "traps": [
    "Interpretar a ausência de erro da API como prova de configuração correta.",
    "Comparar 3 com «3» por igualdade estrita.",
    "Deixar a automação criar outro job a cada execução acidental.",
    "Escolher época e multiplicador por tutorial, sem relação com o volume e o objetivo."
   ],
   "tip": "O versionamento do resultado do job (hash de dataset, Model Card) vem no <a href=\"#D9-07\">tópico 07</a>.",
   "cola": [
    [
     "Epoch count",
     "Número de passagens completas pelo dataset"
    ],
    [
     "Learning rate multiplier",
     "Fator sobre a taxa base interna do provedor"
    ],
    [
     "Adapter size",
     "Capacidade (rank) da camada adaptativa treinada"
    ],
    [
     "Fail fast",
     "Interromper no primeiro passo que falha, antes de criar recursos"
    ],
    [
     "Backoff exponencial",
     "Intervalo entre consultas que cresce por um fator até um teto"
    ],
    [
     "Callback",
     "Função chamada a cada atualização, para tornar o acompanhamento observável"
    ],
    [
     "Injeção de dependência",
     "Passar consulta e espera como argumentos, para testar sem rede"
    ],
    [
     "Pedido versus aplicado",
     "Comparar a configuração enviada com a que o job informa ter usado"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 03 (Fine-Tuning via API)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-03-fine-tuning-via-api"
    ],
    [
     "Databricks Dolly 15k (companion de dataset alternativo)",
     "https://huggingface.co/datasets/databricks/databricks-dolly-15k"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-03-fine-tuning-via-api (hiperparâmetros, automação e Dolly)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-03-fine-tuning-via-api",
     "resumo": "Duas ferramentas centrais (monitoramento e automação) e o pipeline paralelo do Dolly-15k, todos em JS e Python, com suítes de teste que rodam sem rede.",
     "fluxo": [
      "<code>hyperparameter-and-monitoring-tool.js</code>: <code>validarHiperparametros</code> (epoch 1 a 20 inteiro, multiplicador 0,1 a 10), <code>valoresEquivalentes</code> (converte para número) e <code>compararHiperparametros</code>; <code>consultarJobCompleto</code> e <code>resumirEstatisticaTreino</code> leem <code>tuningDataStats</code>. 9 testes.",
      "<code>finetuning-automation-tool.js</code>: <code>exigirConfirmacao</code>, <code>criarJobFineTuning</code> (POST em <code>tuningJobs</code>), <code>calcularProximoIntervalo</code>, <code>consultarComRetry</code> (3 tentativas, 3 s de atraso, retry de leitura transiente), <code>acompanharAteFinalizar</code> (5 s, fator 1,5, teto 60 s, estados terminais SUCCEEDED, FAILED e CANCELLED) e <code>automatizarFineTuning</code>, que injeta upload, criação e acompanhamento. 18 testes.",
      "<code>dolly-dataset-real-starter.js</code> (4.467 exemplos compatíveis, dedup por instrução mais entrada) e <code>dolly-vertex-pipeline.js</code> (conversão sem <code>JSON.stringify</code> porque a saída é texto, refresh de token, retry, inferência com <code>temperature: 0</code>); <code>dataset-real-alternativo-companion.md</code> e <code>model-card-dolly-extra-200.md</code> documentam os dois jobs (13 min 09,9 s, 67.668 tokens)."
     ],
     "rodar": [
      "<code>TUNING_JOB_NAME=... GCP_PROJECT_ID=... node hyperparameter-and-monitoring-tool.js</code> e <code>node finetuning-automation-tool.js</code> (os testes rodam sem <code>gcloud</code>; a parte de nuvem falha com aviso). <code>node dolly-vertex-pipeline.js</code> só roda a suíte local; criar job exige <code>confirmar: true</code>.",
      "Para o Dolly, baixe o JSONL (13 MB) do Hugging Face; ele não é versionado no repositório."
     ],
     "armadilhas": [
      "Nenhuma ferramenta do repositório envia <code>adapterSize</code> na criação do job (só <code>epochCount</code> e <code>learningRateMultiplier</code>), e a validação também não o cobre. O documento de decisões do módulo 6 admite que o «posto 4» é o default silencioso da Vertex AI. A aula, porém, apresenta o adapter size 4 como escolha deliberada: leia o repositório como correção.",
      "No <code>main</code> da ferramenta de monitoramento, a comparação usa um pedido fixo no código (3 épocas, multiplicador 5) e só compara esses dois campos; o <code>adapterSize</code> é só impresso.",
      "O upload usa <code>gsutil cp</code> montado como string de shell (<code>execSync</code>); caminho com aspas quebraria o comando, e <code>gsutil</code> precisa estar instalado.",
      "O mecanismo de retry (<code>consultarComRetry</code>) existe no código e não é citado na aula.",
      "Vários scripts lançam erro ao serem importados quando falta <code>TUNING_JOB_NAME</code> ou <code>GCP_PROJECT_ID</code>; o harness do módulo 5 faz a checagem de forma preguiçosa para evitar isso.",
      "O teste de inferência do Dolly usa uma pergunta do próprio dataset de treino, então mostra aprendizado do formato, não generalização."
     ]
    }
   ]
  },
  {
   "id": "D9-07",
   "bloco": "d09-b2",
   "mod": "Unidade 3 · Aula 5",
   "emoji": "🏷️",
   "read": "10 min",
   "title": "Linhagem do modelo: hash SHA-256, Model Card, registry e Preference Tuning",
   "short": "Um endpoint não é documentação: amarre dataset por conteúdo, hiperparâmetros aplicados, modelo base e resultado.",
   "oneliner": "Um endpoint publicado é só um identificador operacional. A aula transforma o job em um <b>artefato rastreável</b>: dataset identificado por <b>hash SHA-256</b> do conteúdo, hiperparâmetros realmente aplicados, modelo base e resultado, registrados num <b>Model Card</b>; e fecha com um segundo caminho, o <b>Preference Tuning</b> (DPO).",
   "vovo": [
    "Um carro que funciona não explica sua própria história. A ficha de manutenção diz quando saiu da fábrica, que peças foram trocadas, com que óleo e em que data. Sem ficha, quando o carro falhar ninguém sabe se mexeram nele.",
    "O pulo do gato é identificar as peças pelo conteúdo, não pelo nome da etiqueta: a etiqueta «dataset-final-v2» pode ser colada em outra coisa, mas a impressão digital do conteúdo muda se qualquer detalhe mudar."
   ],
   "oque": [
    "<b>Por que um endpoint não basta:</b> o mesmo projeto retreina várias vezes, troca hiperparâmetros, muda o modelo base, publica novo endpoint. Sem as relações registradas, é difícil explicar por que o comportamento mudou ou reproduzir um treino. É por isso que MLOps virou disciplina própria.",
    "<b>O que versionar (no mínimo 4):</b> o dataset (pelo conteúdo, não pelo nome do arquivo), os hiperparâmetros realmente aplicados (o módulo 3.3 mostrou que pedido e aplicado podem divergir), o modelo base (o checkpoint de origem, que o provedor pode aposentar) e o resultado (modelo ajustado, endpoints, identificadores do job).",
    "<b>Nome de arquivo não é versão:</b> alguém corrige um erro de digitação e sobe de novo para o mesmo caminho; o nome continua igual e o conteúdo mudou.",
    "<b>Hash SHA-256:</b> hexadecimal de 64 caracteres; mesma entrada, mesmo hash; qualquer alteração muda tudo. É o versionamento por conteúdo de Git e de imagens de container. Com o hash no Model Card, comparar com o arquivo atual é objetivo, sem depender de memória ou convenção de nomes.",
    "<b>Model Card:</b> documentação estruturada (a ideia vem do trabalho «Model Cards for Model Reporting», de pesquisadores do Google), numa versão enxuta: identificação do job, modelo ajustado, endpoint, estado, modelo base, dataset e hash, hiperparâmetros aplicados, estatísticas e linha do tempo.",
    "<b>Do Markdown ao registry:</b> para a escala da disciplina um arquivo Markdown basta; em escala maior o mesmo princípio é formalizado em Vertex AI Model Registry ou MLflow, que automatizam versões, métricas, promoção e rollback. Os campos são os mesmos.",
    "<b>Rastrear o dado e rastrear o modelo:</b> são dois níveis da mesma prática; do modelo publicado se desce ao job, ao dataset e aos exemplos.",
    "<b>Custo estimado versus real:</b> a ficha separa uma estimativa de referência (faixa de GPU cloud, para comparar com o caminho local) do custo efetivamente conferido no billing do Google Cloud: R$ 2,39 para o job de 200 exemplos (27.353 tokens × 3 épocas = 82.059 unidades à taxa real apurada de R$ 0,00002909).",
    "<b>Preference Tuning (DPO):</b> no SFT cada entrada tem um gabarito; no Preference Tuning o prompt tem duas respostas, uma preferida e uma rejeitada, e o modelo se aproxima da preferida e se afasta da outra. DPO otimiza direto sobre os pares, sem modelo de recompensa nem etapa de reinforcement learning.",
    "<b>O teste real:</b> 40 exemplos do módulo 3.2 viraram pares (a extração correta contra uma resposta de um prompt mais fraco, sem exigência de JSON); o job terminou com sucesso em ~17 min 32 s. O tempo menor não prova superioridade: o dataset é cinco vezes menor.",
    "<b>Onde cada um fica:</b> extração de campos tem resposta objetiva e SFT é o habitat natural; Preference Tuning ganha relevância quando a qualidade é subjetiva e há mais de uma resposta plausível (tom, voz de marca, linguagem de compliance, comunicado de sinistro, negativa de cobertura)."
   ],
   "como": [
    "<b>Quase tudo é local:</b> calcular hash, duração, custo estimado, montar a ficha e gerar o Model Card não exige chamar o provedor; só a consulta ao job existente toca a nuvem. O artefato pode ser regenerado ou validado sem criar novo treino.",
    "<b>Testes:</b> o mesmo arquivo gera o mesmo hash, o valor tem 64 hexadecimais e conteúdos diferentes geram hashes diferentes; um job sem identificador obrigatório é rejeitado e a validação falha se o endpoint for removido; o Model Card carrega duração, hash, identificadores e dados financeiros. A aula cita 13 testes; a execução do repositório mostra 14.",
    "<b>Timestamps absolutos:</b> guardar criação e conclusão (não só duração) permite cruzar a mudança do modelo com deploys e incidentes.",
    "<b>Vale além da nuvem:</b> um adaptador LoRA (arquivo SafeTensor) também pode receber SHA-256; o hash é o mesmo em JavaScript e Python.",
    "<b>Missão prática:</b> converter o dataset, validar hiperparâmetros e comparar pedido e aplicado, implementar acompanhamento com backoff e um teste sem rede, e gerar a ficha com hash e campos mínimos de um Model Card. Simular a criação documentando o que seria enviado (hiperparâmetros, hash, custo estimado) é válido, e documentar uma decisão de não executar também é rastreabilidade."
   ],
   "aplica": [
    "Antes de promover um modelo a produção, gerar a ficha de linhagem e guardá-la com o artefato.",
    "Detectar alteração silenciosa de dataset comparando o hash do arquivo atual com o hash do Model Card.",
    "Escolher entre SFT e Preference Tuning pela natureza da tarefa: gabarito objetivo ou preferência subjetiva.",
    "Registrar a versão do modelo base, que o provedor pode aposentar."
   ],
   "pros": [
    "Um identificador de conteúdo é independente de nome, caminho e linguagem de processamento.",
    "A ficha responde a «qual dataset treinou aquele endpoint?» meses depois.",
    "Separa custo estimado de custo real e evita confundir infraestrutura própria com cobrança gerenciada."
   ],
   "contras": [
    "Markdown vira difícil de manter com muitos modelos; um registry formal automatiza, mas é mais infraestrutura.",
    "O hash prova identidade de conteúdo, não qualidade do dado.",
    "O Preference Tuning foi testado só com 40 pares e sem avaliação de qualidade na disciplina."
   ],
   "traps": [
    "Documentar só o nome do arquivo: dá falsa sensação de versionamento.",
    "Esquecer de registrar o modelo base: o modelo ajustado continua publicado mas sua origem pode não aceitar mais treino.",
    "Concluir que Preference Tuning é melhor porque o job terminou mais rápido.",
    "Comparar custo estimado por GPU com a fatura do serviço gerenciado, que cobra por tokens."
   ],
   "cola": [
    [
     "Linhagem",
     "Cadeia modelo, job, dataset e exemplos que explica a origem de um artefato"
    ],
    [
     "SHA-256",
     "Hash de conteúdo de 64 caracteres hexadecimais"
    ],
    [
     "Model Card",
     "Ficha estruturada do modelo: origem, dataset, configuração, resultado"
    ],
    [
     "Model Registry",
     "Registro com versões, métricas, promoção e rollback (Vertex AI, MLflow)"
    ],
    [
     "SFT",
     "Supervised Fine-Tuning: resposta correta por entrada"
    ],
    [
     "Preference Tuning / DPO",
     "Pares preferida e rejeitada otimizados diretamente, sem modelo de recompensa"
    ],
    [
     "Custo real versus estimado",
     "Billing conferido versus faixa de referência de GPU"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 03 (Fine-Tuning via API)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-03-fine-tuning-via-api"
    ],
    [
     "DPO e RLHF: InstructGPT (referência de RLHF)",
     "https://arxiv.org/abs/2203.02155"
    ],
    [
     "Google: supervised fine-tuning de modelos Gemini (indicação, relatório 14)",
     "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-03-fine-tuning-via-api (versionamento e Model Cards)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-03-fine-tuning-via-api",
     "resumo": "Ferramenta que lê o job real, calcula hash do dataset e gera a ficha e o Model Card, mais três artefatos prontos: o card do job principal, o card do Dolly e o dataset de preferência.",
     "fluxo": [
      "<code>model-versioning-tool.js</code>: <code>calcularHashDataset</code> (SHA-256 de <code>dataset-treinado.jsonl</code>), <code>consultarJobCompleto</code>, <code>gerarFichaVersionamento</code> (job, modelo base, hash, hiperparâmetros, estatísticas, endpoint, timestamps, custo estimado e real), <code>validarFichaCompleta</code> (campos obrigatórios), <code>gerarModelCardMarkdown</code> e <code>gerarSecaoDPO</code> (job de DPO como constante congelada).",
      "<code>calcularCustoReal</code> = tokens cobráveis × épocas × R$ 0,00002909; <code>calcularCustoEstimado</code> usa as faixas de GPU do cheatsheet (US$ 0,40 a 0,80 por hora consumer; 2,50 a 4,00 H100).",
      "<code>model-card-amplitude-auto-saude-m3-200.md</code> (e a versão <code>-py</code>, idêntica salvo a menção ao script) é o card de referência: 3 épocas, multiplicador 5, <code>ADAPTER_SIZE_FOUR</code>, 200 exemplos, 27.353 tokens, 45 min 42 s, R$ 2,39. <code>preference-dataset-amplitude.jsonl</code> tem 40 linhas com <code>completions</code> pontuadas."
     ],
     "rodar": [
      "<code>TUNING_JOB_NAME=... node model-versioning-tool.js</code>: os 14 testes rodam local; a ficha exige <code>gcloud</code>.",
      "Para conferir o hash sem nuvem: <code>sha256sum dataset-treinado.jsonl</code>. Aqui resultou f6eb8f99…b52ed, igual ao do model card."
     ],
     "armadilhas": [
      "Ao gerar a ficha com sucesso, o script <b>sobrescreve</b> <code>model-card-amplitude-auto-saude-m3-200.md</code> no repositório, o card de referência do curso; aponte para uma cópia se for usar com seu job.",
      "O hash é sempre do arquivo local <code>dataset-treinado.jsonl</code>, não do objeto no bucket referenciado pelo job: se seu dataset enviado for outro, a ficha mostrará um hash que não corresponde.",
      "O texto do model card fala em pares <code>chosen</code>/<code>rejected</code>, mas o arquivo de preferência usa <code>completions</code> com <code>score</code> 1.0 e 0.0.",
      "A aula cita 13 testes e a execução mostra 14; o job de DPO é uma constante fixa no código, não uma consulta.",
      "O card traz o ID de projeto e o bucket do autor, úteis só como exemplo de formato."
     ]
    }
   ]
  },
  {
   "id": "D9-08",
   "bloco": "d09-b3",
   "mod": "Unidade 4 · Aula 1",
   "emoji": "🧩",
   "read": "11 min",
   "title": "LoRA e PEFT: custo fixo em baixo volume, posto baixo e a família de técnicas eficientes",
   "short": "Quando o caso já foi aprovado mas o volume é pequeno, o custo fixo de treino decide; LoRA treina uma fração minúscula dos parâmetros.",
   "oneliner": "LoRA entra <b>depois</b> que o gate disse sim: a pergunta passa a ser a forma economicamente mais adequada de executar o ajuste. Com volume pequeno, o <b>custo fixo por treino</b> pode matar o NPV; LoRA congela o modelo e treina duas matrizes de <b>posto baixo</b> (menos de 0,2% dos pesos no piloto), dentro da família maior chamada <b>PEFT</b>.",
   "vovo": [
    "Reformar uma sala não exige derrubar a casa e reconstruir. Você mantém as paredes (o modelo congelado) e pendura quadros e prateleiras (as pequenas matrizes treinadas). Para cada parceiro que quer a sala de um jeito, você guarda só os quadros dele, não uma casa inteira nova.",
    "A intuição do «posto baixo» é parecida com uma planilha em que cada linha é só a anterior multiplicada por um número: parece ter muita informação, mas só tem uma ideia repetida em escalas diferentes. O ajuste necessário costuma ser assim, bem mais «redundante» do que parece."
   ],
   "oque": [
    "<b>Duas decisões separadas:</b> a primeira (vale fazer fine-tuning?) já foi resolvida pelo gate. LoRA não salva um caso que deveria ter sido reprovado, como Atendimento ao Cliente: o problema ali nunca foi custo de treino, foi tarefa aberta e instável.",
    "<b>Custo fixo em operações menores:</b> o caso nacional processa milhares de sinistros por mês, o que dilui o custo fixo. Parcerias regionais (Sul, Nordeste) fazem a mesma tarefa com volume de algumas centenas por mês; pagar GPU alugada para cada parceria pode destruir a viabilidade.",
    "<b>Mesma conta, dois caminhos:</b> para 400 documentos por mês, o NPV em 24 meses com um custo fixo ilustrativo de R$ 2.400 por treino fica em cerca de menos R$ 2.041, sem break-even; com LoRA local (custo marginal próximo do tempo de máquina), cerca de mais R$ 359, com break-even já no primeiro mês. Cinco parcerias seriam R$ 12 mil de treino, sem nenhuma chegando ao break-even sozinha.",
    "<b>O valor de R$ 2.400 não é cotação:</b> é um número ilustrativo do case; para análise real, usar o preço atual da GPU vezes as horas efetivas.",
    "<b>O que LoRA faz:</b> a ideia vem de Hu e colegas (2021, formalizada no ICLR 2022): a mudança de pesos necessária para adaptar um modelo grande tem estrutura de posto baixo. LoRA não atualiza a matriz original W durante o fine-tuning. A atualização é o produto de duas matrizes menores (A e B) com posto R muito menor que as dimensões de W, somada à saída original com um fator de escala ligado a alfa e R. O gradiente flui só para A e B.",
    "<b>Economia de parâmetros:</b> numa matriz de 1.000 por 1.000 (1 milhão de números), posto 4 usa duas matrizes de 1.000 por 4 e 4 por 1.000, ou 8 mil números treináveis (menos de 1%).",
    "<b>Piloto da disciplina:</b> no Gemma, o adaptador LoRA tem ~6,8 milhões de parâmetros treináveis contra ~4,6286 bilhões totais, cerca de 0,147%. Isso explica treinar em hardware de consumidor, em minutos.",
    "<b>Armazenamento:</b> com Full Fine-Tuning, cada parceria teria um checkpoint completo (modelo base de ~10,24 GB, cinco cópias passariam de 51 GB); com LoRA, uma cópia da base mais cinco adaptadores de poucas dezenas de megabytes.",
    "<b>O job gerenciado do módulo 3 já era adapter:</b> o campo <code>adapterSize</code> do Model Card se refere justamente a esse ajuste eficiente; o Full Fine-Tuning de verdade só aparece mais adiante.",
    "<b>A família PEFT (quatro grupos):</b> métodos de adição (adapters: módulos pequenos em gargalo entre camadas, com base congelada), métodos seletivos (BitFit treina só os termos de viés, abaixo de 0,1% dos parâmetros em variantes de BERT), soft prompts (Prefix Tuning e Prompt Tuning aprendem vetores contínuos por gradiente, não palavras) e reparametrização (LoRA).",
    "<b>QLoRA:</b> LoRA sobre uma base quantizada (por exemplo 4 bits), que reduz a memória e permite modelos maiores numa única GPU de consumidor.",
    "<b>Caso Checkr:</b> Llama de 8 bilhões classificando registros de verificação de antecedentes: ~90% de acurácia nos casos mais difíceis (cerca de 2% do conjunto), ~97% no geral, ~5 vezes mais barato e 30 vezes mais rápido que a solução com GPT-4.",
    "<b>Por que LoRA venceu na engenharia:</b> Prefix e Prompt Tuning consomem janela de contexto; adapters adicionam etapas sequenciais e podem aumentar latência de inferência. Depois do treino, a contribuição B vezes A pode ser somada a W (merge) uma única vez, e a inferência não paga custo extra.",
    "<b>PEFT não muda RAG versus fine-tuning:</b> a biblioteca PEFT (Hugging Face) reúne várias técnicas numa interface comum e reduz a barreira de implementação, mas só reduz o custo de exercer a opção de fine-tuning quando ela já foi aprovada."
   ],
   "como": [
    "<b>Reuso do NPV:</b> o script de comparação reaproveita <code>calcularNPV</code> do framework do módulo 1 (mesmo custo por chamada, só muda o custo fixo), para a comparação ser justa.",
    "<b>Previsão do próximo passo:</b> a aula antecipa o treino local em Apple Silicon com MLX-LM, validation loss de 4,752 para 0,895 em 20 iterações, a comparação de ranks e, por fim, Full versus LoRA com limites reais de memória.",
    "<b>Missão prática:</b> comparar, para um caso de baixo volume, o raciocínio financeiro entre treino gerenciado e LoRA local, registrar o custo fixo usado e refazê-lo com premissa adequada ao seu contexto, e explicar por que a decisão sobre LoRA acontece depois do gate."
   ],
   "aplica": [
    "Atender muitas variantes pequenas de uma mesma tarefa (parceiros, regiões, clientes) com um modelo base compartilhado e um adaptador por variante.",
    "Treinar em hardware de consumidor quando o volume não justifica GPU de datacenter.",
    "Entender, ao ler a documentação de um provedor gerenciado, que parâmetros como rank e adapter size descrevem esse mesmo mecanismo.",
    "Escolher entre as famílias PEFT pensando em contexto consumido e latência de inferência."
   ],
   "pros": [
    "Treina uma fração mínima dos parâmetros, com muito menos memória, custo e tempo.",
    "Adaptadores pequenos, trocáveis e compartilhando a mesma base.",
    "Depois do merge não há custo extra de inferência."
   ],
   "contras": [
    "Não corrige um caso que o gate reprovaria.",
    "A conta financeira depende de premissas ilustrativas, como o custo fixo de R$ 2.400.",
    "O teto de qualidade pode ser menor que o de Full Fine-Tuning (tópico 11)."
   ],
   "traps": [
    "Usar LoRA para «salvar» uma tarefa aberta ou instável.",
    "Tratar R$ 2.400 como preço de mercado.",
    "Achar que técnica eficiente só existe no treino local: ela aparece por baixo de ferramentas gerenciadas.",
    "Esquecer que scale (alfa dividido por R) e rank controlam coisas diferentes: intensidade versus capacidade."
   ],
   "cola": [
    [
     "PEFT",
     "Parameter-Efficient Fine-Tuning: treinar uma pequena fração de parâmetros"
    ],
    [
     "LoRA",
     "Low-Rank Adaptation: base congelada mais duas matrizes de baixo posto"
    ],
    [
     "Posto (rank)",
     "Dimensão interna das matrizes A e B; controla a capacidade do adaptador"
    ],
    [
     "Merge",
     "Somar B vezes A a W uma vez, sem custo extra de inferência"
    ],
    [
     "Adapters",
     "Módulos em gargalo inseridos entre camadas, com base congelada"
    ],
    [
     "BitFit",
     "Treina só os termos de viés"
    ],
    [
     "Soft prompts",
     "Vetores contínuos aprendidos (Prefix e Prompt Tuning)"
    ],
    [
     "Custo fixo por treino",
     "Parcela do custo que não depende do volume e pesa em operação pequena"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 04 (LoRA e PEFT)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft"
    ],
    [
     "LoRA: Low-Rank Adaptation (Hu et al.)",
     "https://arxiv.org/abs/2106.09685"
    ],
    [
     "QLoRA (Dettmers et al.)",
     "https://arxiv.org/abs/2305.14314"
    ],
    [
     "Prefix-Tuning (Li e Liang)",
     "https://arxiv.org/abs/2101.00190"
    ],
    [
     "Prompt Tuning (Lester et al.)",
     "https://arxiv.org/abs/2104.08691"
    ],
    [
     "Adapters: Parameter-Efficient Transfer Learning (Houlsby et al.)",
     "https://arxiv.org/abs/1902.00751"
    ],
    [
     "Biblioteca PEFT (Hugging Face)",
     "https://github.com/huggingface/peft"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-04-lora-e-peft (custo fixo e API gerenciada)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft",
     "resumo": "Duas ferramentas pequenas (JS e Python): a comparação financeira reaproveitando o NPV do módulo 1 e a montagem da requisição de LoRA para uma API gerenciada de terceiros.",
     "fluxo": [
      "<code>regional-lora-vs-cloud-npv.js</code>: importa <code>calcularNPV</code> do módulo 1, fixa o volume regional em 400 por mês, mantém custos por chamada (R$ 0,045 e R$ 0,016) e só troca o custo fixo (2.400 contra 0). Cinco testes verificam NPV negativo sem break-even, NPV positivo com break-even rápido e que a diferença é exatamente o custo fixo descontado.",
      "<code>lora-managed-api-preview-tool.js</code> (e <code>lora-managed-api-preview-companion.md</code>): monta o POST para a API de fine-tuning da Together AI com <code>training_type</code> Lora, rank 8, alfa 20, dropout 0 e <code>all-linear</code>, reaproveitando a configuração de <code>mlx-adapters/adapter_config.json</code>. Sem <code>TOGETHER_API_KEY</code> só imprime a requisição. Seis testes."
     ],
     "rodar": [
      "<code>node regional-lora-vs-cloud-npv.js</code> imprime NPV de R$ -2.040,99 sem break-even e de R$ 359,01 com break-even no mês 1.",
      "<code>node lora-managed-api-preview-tool.js</code> funciona sem chave; com a chave, envia de verdade (custo real)."
     ],
     "armadilhas": [
      "A conclusão financeira depende do R$ 2.400: o job real de 200 exemplos na Vertex AI do módulo 3 custou R$ 2,39 no billing. O próprio repositório admite (tópico 15) que a estimativa de R$ 2.400 superestimou o custo; leia o argumento «LoRA vence em baixo volume» pela estrutura de custo fixo, não por esse número.",
      "O preview usa Llama 3.1 8B no provedor Together AI, não o Gemma do treino local; o código avisa que scale (MLX) e lora_alpha (Together AI) não são garantidamente equivalentes e usa o valor 20 como ponte ilustrativa.",
      "O texto da aula fala de «setembro de 2026» como referência para preços de GPU de consumidor; o código não busca preço algum."
     ]
    }
   ]
  },
  {
   "id": "D9-09",
   "bloco": "d09-b3",
   "mod": "Unidade 4 · Aula 2",
   "emoji": "💻",
   "read": "12 min",
   "title": "Treinando LoRA local com MLX: split sem vazamento, validation loss e a curva que 20 iterações escondem",
   "short": "O mesmo dataset de 200 exemplos vira treino local; rodar sem erro não prova que treinou, e 20 iterações ainda eram subtreino.",
   "oneliner": "A aula executa LoRA de verdade, sem chamada de nuvem: converte o dataset de 200 exemplos, valida hiperparâmetros, divide <b>157/30/13 sem vazamento por entidade</b>, orquestra o MLX-LM e mede <b>validation loss de 4,752 para 0,895</b> em 20 iterações. Depois mostra que isso era subtreino e prova a mudança de comportamento comparando o modelo com e sem o adaptador.",
   "vovo": [
    "Treinar um aluno e testar com as mesmas questões que ele já viu não prova nada. Você separa três pastas: exercícios para estudar (treino), um simulado para decidir como estudar (validação) e uma prova final fechada (teste). E cuida para que nenhuma pessoa apareça em duas pastas diferentes, senão a prova vira cola.",
    "Também não adianta o aluno dizer «terminei de estudar» (o programa saiu sem erro): é preciso mostrar a mesma pergunta respondida antes e depois do estudo, e a resposta mudar do jeito esperado."
   ],
   "oque": [
    "<b>Mesmo dataset, dois caminhos:</b> os 200 exemplos (120 Auto e 80 Saúde) que treinaram o job gerenciado agora treinam localmente. A comparação é justa porque os dados são os mesmos; muda a infraestrutura. No gerenciado há abstração e menos visibilidade; no local há mais responsabilidade e visão direta de parâmetros treináveis, memória, taxa de processamento e curva de aprendizado.",
    "<b>Hardware da demonstração:</b> Apple M5 Pro com 24 GB de memória unificada, modelo (~10,24 GB) já em cache. Em primeira execução o download conta; um token gratuito do Hugging Face pode ajudar.",
    "<b>Validation loss:</b> erro medido num conjunto reservado, que não entra no aprendizado. Cair indica aprendizado; estabilizar indica ganho pequeno; subir depois de um mínimo sugere overfitting.",
    "<b>Divisão treino, validação e teste:</b> 157, 30 e 13 exemplos (validação ~15%, teste cerca de 5%, ambos ajustados pelo agrupamento). Agrupada por entidade e determinística: nenhuma entidade é partida entre divisões e o resultado é reprodutível.",
    "<b>Esquema canônico facilita migrar:</b> a Vertex AI usa contents/role/parts; o MLX usa mensagens no padrão de chat. A superfície muda e a informação continua a mesma.",
    "<b>JavaScript orquestra, Python executa:</b> o MLX-LM não tem binding para Node, então o JS monta a configuração e dispara um processo externo; JS é ótimo para integrar APIs gerenciadas, mas para treino, quantização e tensores o ecossistema continua em Python (PyTorch, Hugging Face, MLX-LM).",
    "<b>Configuração do treino:</b> LoRA, 20 iterações, batch size 1 e learning rate de 1e-5 (específico do MLX-LM, não copiar cegamente para outro framework). Ao começar aparece o que o gerenciado escondia: ~6,8 milhões de parâmetros treináveis em ~4,6286 bilhões (0,147%).",
    "<b>Primeiros números:</b> validation loss 4,752 na iteração 1 e ~0,895 na 20; pico de memória ao redor de 10,8 GB, abaixo dos 24 GB.",
    "<b>Alternativas sem Apple Silicon:</b> um notebook no Google Colab (GPU T4 gratuita) treina o mesmo rank 8 via Hugging Face (val loss ~0,8305 na aula; o companion do repositório registra 0,8248 numa execução real na T4), e há um script standalone para GPU NVIDIA com CUDA em Windows ou Linux. A barreira real é a GPU: CPU sozinha normalmente não entrega um tempo razoável.",
    "<b>Duas medidas não provam convergência:</b> repetindo a configuração o valor na iteração 20 foi ~0,907 (ruído normal). Estendendo para ~125 iterações na aula (o código registra 120), a loss cai até as iterações 80 a 90 (~0,474) e volta a subir (0,485; 0,496; 0,520), sinal de início de overfitting. As 20 iterações eram <b>subtreino</b>.",
    "<b>Early stopping:</b> uma função da ferramenta analisa a curva e identifica o melhor ponto, em vez de escolher um número fixo de iterações.",
    "<b>Velocidade real:</b> perto de 6 iterações por segundo e ~900 tokens por segundo; com 2.000 exemplos e dez épocas a aula estima ~56 minutos de computação pura.",
    "<b>Adaptador final:</b> ~27 MB, centenas de vezes menor que o modelo de ~10,24 GB.",
    "<b>Rodar sem erro não significa que treinou:</b> o mesmo exemplo de teste, nunca usado no treino, vai primeiro ao modelo base e depois ao modelo com o adaptador. Sem adaptador, o modelo entra em texto livre, explica o raciocínio e nem conclui no limite de tokens; com o adaptador, devolve exatamente a estrutura esperada, batendo com o gabarito. Esse é o teste que separa «código de saída zero» de «o fine-tuning mudou o comportamento»."
   ],
   "como": [
    "<b>Suíte antes do treino:</b> 16 testes em seis grupos: conversão, divisão sem entidade partida, validação de hiperparâmetros (iters, learning rate, tipo de ajuste), parser das linhas de validation loss com saídas simuladas, orquestração com um processo falso injetado e análise da curva. Valida a integração sem gastar tempo de GPU.",
    "<b>Validar antes de rodar:</b> iterações, learning rate, tipo de fine-tuning e batch size são verificados antes de qualquer processo; configuração faz parte do contrato do treino.",
    "<b>Equivalente por API:</b> uma ferramenta complementar monta a mesma ideia de LoRA (rank 8, escala 20, dropout 0) como corpo de uma requisição HTTP, sem disparar (tópico 08), mostrando que LoRA não é exclusivo do local.",
    "<b>Trade-off de nuvem e local:</b> nenhum é universalmente melhor; a decisão depende de custo, volume, infraestrutura e necessidade operacional.",
    "<b>Missão prática:</b> preparar o mesmo dataset em treino, validação e teste preservando a separação; executar ou documentar o treino LoRA local registrando validation loss, tempo e memória; validar hiperparâmetros antes e manter a preparação separada da ferramenta de treino."
   ],
   "aplica": [
    "Treinar um adaptador pequeno com os dados nunca saindo da máquina (dado sensível) e sem custo de nuvem.",
    "Usar o parser de métricas e a análise de curva para decidir o ponto de parada em vez de fixar iterações por convenção.",
    "Medir tempo de treino com a própria máquina como referência para alimentar o NPV.",
    "Verificar que um fine-tuning funcionou comparando saída com e sem adaptador num exemplo retido."
   ],
   "pros": [
    "Visibilidade total do treino: parâmetros treináveis, memória, velocidade, curva.",
    "Reprodutível: split determinístico e hiperparâmetros validados.",
    "Custo de nuvem zero e dado local."
   ],
   "contras": [
    "Exige GPU adequada (Apple Silicon para MLX; CUDA no caminho Hugging Face).",
    "20 iterações com batch 1 passam por apenas 20 dos 157 exemplos de treino, bem menos de uma época: serve para mostrar a mecânica, não para treinar bem.",
    "O download do modelo e o preparo fazem parte do tempo real."
   ],
   "traps": [
    "Dividir sequencialmente e deixar a mesma entidade em treino e teste, criando uma avaliação artificialmente fácil.",
    "Comparar apenas início e fim de 20 iterações e chamar de convergência.",
    "Copiar o learning rate do MLX para outro framework.",
    "Achar que o processo terminar com código zero prova que o ajuste funcionou."
   ],
   "tip": "O efeito do rank, da quantização e de DoRA vem no <a href=\"#D9-10\">tópico 10</a>; a comparação com Full Fine-Tuning no <a href=\"#D9-11\">tópico 11</a>.",
   "cola": [
    [
     "MLX / MLX-LM",
     "Biblioteca de ML da Apple para Apple Silicon, com LoRA integrado"
    ],
    [
     "Validation loss",
     "Erro num conjunto reservado, usado para comparar configurações"
    ],
    [
     "Split agrupado por entidade",
     "Nenhuma pessoa aparece em mais de um conjunto"
    ],
    [
     "Subtreino",
     "Parar antes de a loss estabilizar"
    ],
    [
     "Early stopping",
     "Parar na melhor iteração medida"
    ],
    [
     "Adaptador",
     "Arquivo pequeno (SafeTensors) com só os pesos LoRA"
    ],
    [
     "Orquestração por subprocesso",
     "JS monta e dispara um comando Python"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 04 (LoRA e PEFT)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft"
    ],
    [
     "MLX-LM (README do repositório oficial)",
     "https://github.com/ml-explore/mlx-lm"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-04-lora-e-peft (treino local e comparações com adaptador)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft",
     "resumo": "Ferramenta de treino local (JS e Python), splits MLX já gerados, YAML do rank 8, adaptador treinado e as alternativas para quem não tem Mac: notebook Colab e script Hugging Face para CUDA.",
     "fluxo": [
      "<code>local-lora-training-tool.js</code>: <code>converterExemploParaMensagens</code> (contents para messages), <code>dividirTrainValidTest</code> (agrupa por segurado ou beneficiário, preenche teste, depois validação, resto treino), <code>validarHiperparametrosLora</code>, <code>montarArgumentosLora</code> (<code>python -m mlx_lm lora --train ...</code>), <code>extrairMetricas</code>, <code>analisarCurvaConvergencia</code> (limiar de 3%) e <code>rodarTreinoLocal</code> com <code>spawn</code> injetável. 16 testes.",
      "<code>mlx-data/</code> (train 157, valid 30, test 13), <code>lora-rank8-config.yaml</code> (modelo <code>mlx-community/gemma-4-e2b-it-bf16</code>, 16 camadas, batch 1, 20 iterações, lr 1e-5, rank 8, scale 20, dropout 0; o YAML do rank 8 reaproveita <code>./mlx-adapters</code>) e <code>mlx-adapters/</code> com o adaptador.",
      "<code>adapter-comparison-tool.js</code> (e companion): roda <code>mlx_lm generate</code> duas vezes no mesmo exemplo (índice 8 do teste: Felipe Alves Monteiro), sem e com <code>--adapter-path</code>; sem adaptador 80 tokens (bate no limite), com adaptador 28 tokens e JSON exato.",
      "<code>colab-lora-training-notebook.ipynb</code> e <code>colab-lora-training-companion.md</code> (QLoRA 4 bits, lr 2e-4, <code>trl</code>, T4: val loss 0,8248, 20 passos, 57,6 s), <code>local-lora-training-hf-tool.py</code> (mesmo treino para GPU CUDA local), <code>gpu-cuda-anatomia-poster.html</code> e <code>guia-execucao-local-modulo-4-companion.md</code>."
     ],
     "rodar": [
      "<code>node local-lora-training-tool.js</code> (aqui, em uma cópia): testes verdes, gera 157/30/13 (conteúdo idêntico ao <code>mlx-data</code> do repositório, conferi) e imprime a curva de convergência.",
      "O treino de verdade: <code>python3 -m mlx_lm lora --config lora-rank8-config.yaml</code> em Mac com Apple Silicon (não consegui rodar aqui; sem <code>mlx_lm</code>).",
      "Sem Mac: abrir o notebook no Colab (T4) ou rodar <code>python3 local-lora-training-hf-tool.py --test</code> antes numa GPU CUDA."
     ],
     "armadilhas": [
      "Cuidado: <code>node local-lora-training-tool.js</code> <b>reescreve</b> <code>mlx-data/</code> dentro da pasta do repositório (mesmo conteúdo, mas rode numa cópia).",
      "A «curva de convergência» impressa pela demonstração usa valores fixos digitados no código (as medições do autor), não um treino executado na hora; ela é a de 120 iterações, enquanto a aula diz ~125, e o valor da iteração 20 é 0,916 (a aula cita ~0,913).",
      "20 iterações × batch 1 = 20 exemplos vistos de 157 (derivei a conta): menos de 13% de uma época. É coerente com o achado de subtreino.",
      "O README raiz diz que os pesos <code>adapters.safetensors</code> não estão no repositório, mas os de rank 4, 8 e 16 (13, 27 e 54 MB) estão versionados; só o checkpoint de Full Fine-Tuning (~2 GB) ficou de fora e é baixado do Hugging Face (<code>ahirtonlopes/amplitude-seguros-full-finetune</code>, segundo o guia).",
      "Os notebooks Colab dizem usar «o mesmo dataset real do Módulo 2.2», mas é o dataset de 200 exemplos gerado no módulo 3.2.",
      "O script <code>local-lora-training-hf-tool.py</code> declara no cabeçalho que ainda não foi testado numa GPU CUDA local real (só a lógica foi validada no Colab).",
      "A contagem de parâmetros do modelo é ~4,63 bilhões no README e na aula, e ~5,12 bilhões nos companions de Colab; provavelmente a segunda inclui tabelas de embeddings por camada (hipótese, não verifiquei)."
     ]
    }
   ]
  },
  {
   "id": "D9-10",
   "bloco": "d09-b3",
   "mod": "Unidade 4 · Aula 3",
   "emoji": "🎚️",
   "read": "11 min",
   "title": "Rank, QLoRA e DoRA: transformando um hiperparâmetro em decisão medida",
   "short": "Mesmo dataset, mesmo modelo, só o rank muda: retorno decrescente, memória dominada pela base e quantização como alavanca real.",
   "oneliner": "Três treinos reais com o <b>rank 4, 8 e 16</b>, tudo o mais fixo, mostram que dobrar o rank dobra os parâmetros treináveis e o adaptador, melhora a validation loss com <b>retorno decrescente</b> e quase não muda a memória. A alavanca de memória é a <b>quantização (QLoRA)</b>; o <b>DoRA</b> não trouxe ganho neste caso.",
   "vovo": [
    "O rank é o tamanho da prateleira que você instala na parede: maior comporta mais coisas, mas pesa e ocupa mais. O scale é a força com que o que está na prateleira é usado. Não são a mesma coisa.",
    "Dobrar a prateleira ajuda bastante da primeira vez e menos da segunda, enquanto o prédio inteiro (o modelo base) continua pesando quase o mesmo. Se o problema é o peso do prédio, comprimir o prédio (quantizar) resolve mais que encolher a prateleira."
   ],
   "oque": [
    "<b>Rank e scale:</b> o rank (R) controla a dimensão interna das matrizes e, portanto, a capacidade; o scale controla a intensidade da contribuição (ligado a alfa dividido por R). Nos três experimentos o scale fica em 20 e só o rank muda.",
    "<b>O padrão 8 era default:</b> o rank 8 do treino anterior era o padrão da ferramenta, não o resultado de um estudo; agora ele fica entre 4 e 16.",
    "<b>Os três treinos</b> (157 exemplos, 20 iterações, batch 1, mesmo lr): rank 4 tem ~3,4 milhões de parâmetros treináveis (0,074%), validation loss final 1,246 e adaptador de ~13 MB; rank 8, ~6,8 milhões (0,147%), 0,895 e ~27 MB; rank 16, ~13,6 milhões (0,295%), 0,725 e ~52 MB.",
    "<b>Memória cresce pouco:</b> a maior parte da memória é o modelo base, carregado inteiro em todos os casos. Dobrar o rank não dobra a memória total. Velocidade: ~7,401, ~7,295 e ~7,253 iterações por segundo.",
    "<b>A pergunta de viabilidade vem antes:</b> se o modelo base não cabe no hardware, nenhum rank resolve. Se cabe, o rank passa a ser decisão de qualidade e eficiência (isso pode mudar em modelos maiores).",
    "<b>QLoRA medido:</b> o modelo em BF16 ocupa ~10,24 GB em disco; a versão de 4 bits cai para ~3,58 GB (-65%). O pico de memória no treino vai de ~10,833 GB para ~4,193 GB (-61%).",
    "<b>Quantização cobra:</b> no rank 8, a validation loss fica em ~0,932 contra 0,895 (cerca de 4,1% pior), acima da faixa de ruído de ~2,3% medida entre execuções: custo real, não aleatório.",
    "<b>DoRA:</b> decompõe a atualização em magnitude e direção. No mesmo rank 8, usa ~7,3 milhões de parâmetros (contra 6,8), adaptador de ~28 MB e pico de memória maior, com a mesma validation loss de ~0,895: sem ganho dentro do ruído. Isso não prova que DoRA não funciona (a literatura relata ganho em tarefas complexas e treinos longos); mostra que técnica promissora não vira padrão sem teste no caso real.",
    "<b>Retorno decrescente:</b> do rank 4 para o 8 a loss melhora ~28,17%; do 8 para o 16, ~18,99%, com os parâmetros dobrando nos dois saltos.",
    "<b>Rank por margem de qualidade:</b> uma função procura o menor rank que fica dentro de uma margem do melhor validation loss. Com margem de 10%, só o rank 16 entra; com 60%, o rank 8 já basta; o rank 4 fica fora mesmo assim. A decisão pode ser econômica: o objetivo é o menor nível de parametrização com qualidade suficiente.",
    "<b>Teste adversarial à mão:</b> um orçamento de oficina nova com valor de peças (R$ 1.850), mão de obra (R$ 970) e só depois o total (R$ 2.820). O modelo base responde em texto livre; os ranks 4, 8 e 16 acertam o total e ignoram os distratores. A validation loss separa os ranks, o exemplo não: uma métrica agregada e um comportamento observável não são a mesma coisa, e um único exemplo não basta para avaliar."
   ],
   "como": [
    "<b>Desenho experimental:</b> mudar rank, learning rate e iterações ao mesmo tempo impediria saber o que causou o resultado; aqui qualquer diferença é atribuível principalmente ao rank.",
    "<b>13 testes:</b> a recomendação de rank para as duas margens, a quantização (disco -65%, memória -61%, custo de loss abaixo de 10%) e DoRA (≈ 7,5% mais parâmetros, +0,2 a 0,35 GB, empate de loss).",
    "<b>Se a restrição for memória,</b> quantizar a base muda gigabytes; reduzir o rank economiza megabytes.",
    "<b>Missão prática:</b> comparar pelo menos dois ranks mantendo o resto constante, registrar validation loss, memória, tempo e tamanho do adaptador e incluir um exemplo difícil de propósito."
   ],
   "aplica": [
    "Escolher o rank pelo menor valor que atende a margem de qualidade do negócio.",
    "Reduzir o consumo de memória pela quantização da base (QLoRA) quando a GPU é pequena.",
    "Testar uma técnica nova (DoRA) no caso real antes de adotá-la como padrão.",
    "Desenhar exemplos adversariais (distratores) para separar quem entendeu o campo de quem copia posição."
   ],
   "pros": [
    "Decisão mensurável, com quatro eixos: parâmetros, memória, velocidade e qualidade.",
    "Mostra que otimizar o componente que domina (a base) rende mais que otimizar o adaptador.",
    "Honesto sobre resultados negativos (DoRA empatou)."
   ],
   "contras": [
    "Tudo medido em 20 iterações, que a aula anterior mostrou ser subtreino: a ordem entre ranks é informativa, o valor absoluto não.",
    "Um único exemplo adversarial e um único dataset pequeno.",
    "A margem escolhida (10% ou 60%) determina a resposta: a ferramenta formaliza a pergunta, não decide por você."
   ],
   "traps": [
    "Concluir que rank maior é sempre melhor sem olhar o custo adicional.",
    "Reduzir rank para economizar memória quando a base domina o consumo.",
    "Confundir rank com scale.",
    "Adotar DoRA porque o paper é promissor, sem medir."
   ],
   "cola": [
    [
     "Rank (R)",
     "Capacidade do adaptador: dimensão interna das matrizes"
    ],
    [
     "Scale",
     "Intensidade da contribuição do adaptador (fixo em 20)"
    ],
    [
     "Retorno decrescente",
     "Cada dobra de rank entrega menos melhora que a anterior"
    ],
    [
     "QLoRA",
     "LoRA sobre modelo base quantizado em 4 bits"
    ],
    [
     "DoRA",
     "LoRA com a atualização decomposta em magnitude e direção"
    ],
    [
     "Faixa de ruído",
     "Variação entre execuções (~2,3%) abaixo da qual não se conclui nada"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 04 (LoRA e PEFT)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft"
    ],
    [
     "DoRA: Weight-Decomposed Low-Rank Adaptation (indicação 19)",
     "https://arxiv.org/abs/2402.09353"
    ],
    [
     "QLoRA (Dettmers et al.)",
     "https://arxiv.org/abs/2305.14314"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-04-lora-e-peft (rank, QLoRA, DoRA)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft",
     "resumo": "Duas ferramentas que consolidam as medições reais do autor (rank 4/8/16, QLoRA e DoRA), dois YAMLs de rank, os adaptadores de rank 4 e 16 e a comparação de saídas num exemplo difícil.",
     "fluxo": [
      "<code>lora-rank-tradeoff-tool.js</code>: constante <code>EXECUCOES_REAIS</code> com parâmetros treináveis, validation loss inicial e final, pico de memória, iterações por segundo e tamanho do adaptador por rank; calcula ganho por dobra e a recomendação do menor rank dentro de uma margem; compara BF16 contra 4 bits e LoRA contra DoRA. 13 testes.",
      "<code>lora-rank4-config.yaml</code> e <code>lora-rank16-config.yaml</code> (iguais ao do rank 8, mudando <code>rank</code> e <code>adapter_path</code>) e os adaptadores <code>mlx-adapters-rank4/</code> e <code>-rank16/</code>.",
      "<code>rank-adapter-comparison-tool.js</code> (e companion): roda o exemplo «Boa Vista Reparos Automotivos» (peças R$ 1.850, mão de obra R$ 970, total R$ 2.820) sem adaptador e com os três ranks."
     ],
     "rodar": [
      "<code>node lora-rank-tradeoff-tool.js</code> (ou o <code>.py</code>) imprime a tabela e as recomendações offline.",
      "<code>python3 -m mlx_lm lora --config lora-rank4-config.yaml</code> reproduz um treino; a comparação de saídas exige Apple Silicon e o modelo baixado (não consegui executar aqui)."
     ],
     "armadilhas": [
      "Os números não são medidos pelo script: são dados digitados (saída real do autor, 08/08/2026). A ferramenta analisa e imprime; o aviso final lembra que a recomendação foi medida em 20 iterações, ainda subtreino.",
      "Os testes do script de comparação de saída (3 testes) usam a saída real capturada como fixture; a execução de verdade falha sem <code>mlx_lm</code>.",
      "Tamanhos de adaptador: o código imprime 26 e 52 MB (MiB) e a aula 27 e 52 MB; o arquivo do rank 8 tem 27.290.736 bytes."
     ]
    }
   ]
  },
  {
   "id": "D9-11",
   "bloco": "d09-b3",
   "mod": "Unidade 4 · Aula 4",
   "emoji": "⚖️",
   "read": "11 min",
   "title": "Full Fine-Tuning versus LoRA: o teto existe, o custo também, e o critério de decisão",
   "short": "Full tem validation loss 31% melhor que o rank 8, mas 153 vezes mais parâmetros e um checkpoint 74 vezes maior, sem diferença de comportamento.",
   "oneliner": "Com o mesmo modelo, dataset, 20 iterações e learning rate, o <b>Full Fine-Tuning das últimas 16 camadas</b> chega a validation loss 0,612 contra 0,895 do rank 8 (e 0,725 do rank 16), mas treina ~153 vezes mais parâmetros e salva um checkpoint de ~2 GB. Nos exemplos testados, <b>o comportamento é idêntico</b>: o teto de qualidade existe, mas não apareceu como valor.",
   "vovo": [
    "Quanto vale reescrever o livro inteiro em vez de colocar notas de rodapé? O livro reescrito pode ficar melhor, e esse teto é real. Mas gasta bem mais papel, tinta e espaço na estante, e para a tarefa de «copiar três campos de um recibo» as notas de rodapé já deixam o leitor igualmente satisfeito.",
    "Para cinco parceiros, são cinco livros inteiros (~2 GB cada) contra um livro mais cinco pequenos cadernos de notas."
   ],
   "oque": [
    "<b>O que significa «Full» aqui:</b> o framework chama de Full o treino que atualiza todos os pesos das camadas selecionadas, sem a decomposição B e A. Tanto LoRA quanto Full agem nas últimas 16 camadas, então a comparação é justa. Treinar todos os ~4,63 bilhões provavelmente estouraria os 24 GB; as 16 camadas somam ~22,567% do modelo.",
    "<b>Por que Full cresce em memória:</b> cada peso treinável precisa de gradiente e dos estados do otimizador Adam (momento e variância). No LoRA essa estrutura existe só para as pequenas matrizes B e A; a base apenas precisa estar carregada.",
    "<b>Os números:</b> ~22,567% dos parâmetros treináveis contra 0,147% (cerca de 153 vezes mais); validation loss 0,612 contra 0,895 (ganho de ~31% sobre o rank 8); pico de memória ~15,338 GB contra ~10,833 GB (+42%); checkpoint ~1,992 GB contra ~27 MB (~74 vezes maior).",
    "<b>A comparação certa é com o melhor LoRA:</b> contra o rank 16 (0,725) o ganho do Full cai para ~15,59%. Com um limiar mínimo de ganho de 20%, o Full não passa; com 10%, passa. Não há limiar universal: depende do contexto econômico (se armazenar e servir 2 GB é barato, 15% pode compensar).",
    "<b>Cinco parcerias:</b> cinco adaptadores rank 8 somam ~135 MB e compartilham a base; cinco checkpoints Full chegam perto de 10 GB adicionais. Em stacks de serving compatíveis, vários adaptadores podem compartilhar a mesma base.",
    "<b>Segundo eixo, esquecimento catastrófico:</b> alterar muitos pesos pode melhorar a tarefa e degradar capacidades gerais. LoRA mantém a base congelada. O experimento <i>não mede</i> isso (só as últimas 16 camadas, avaliação só na tarefa); a aula cita estudos de literatura PEFT com degradação maior no Full fora da tarefa treinada, inclusive um com modelos BLOOM.",
    "<b>Mesmo comportamento:</b> o Full acerta o exemplo simples e o com distratores, campo a campo, igual aos ranks 4, 8 e 16. Existe um teto mais alto, mas na extração estreita de campos fixos ele não apareceu como erro corrigido. O resultado vale para o caso estudado.",
    "<b>Três caminhos reais:</b> API gerenciada (Vertex AI), LoRA local e Full local. Todos funcionam e nenhum é sempre o certo; agora há números de custo, memória, qualidade, armazenamento e controle. O modelo que segue para o módulo 5 é o adaptador LoRA rank 8, não o checkpoint Full.",
    "<b>A disciplina de decidir medindo:</b> custo fixo versus marginal, rank, quantização, LoRA versus DoRA e Full versus LoRA foram todos medidos; a ideia é executar, medir e decidir sobre o caso real, não decorar regra de bolso."
   ],
   "como": [
    "<b>Mesmas condições:</b> 157 exemplos de treino, 20 iterações, mesmo learning rate; a única mudança estrutural é o método de ajuste.",
    "<b>8 testes:</b> a métrica derivada (ganho ~31,6% sobre o rank 8, ~153x parâmetros, checkpoint ~76,6x maior, memória maior que qualquer LoRA), a regra de limiar (20% e 10%) e a validação dos resultados de inferência dos dois exemplos.",
    "<b>Missão prática 4:</b> escolher um caso já aprovado pelo gate mas de volume pequeno; executar ou documentar LoRA local comparando ao menos dois ranks (se o hardware não permitir, usar os números reais da disciplina e documentar a limitação); construir um teste adversarial; implementar em JavaScript a conversão e a validação de hiperparâmetros; e decidir LoRA ou Full com números."
   ],
   "aplica": [
    "Decidir se vale pagar memória e armazenamento extra pelo teto de qualidade, com um limiar de ganho explícito.",
    "Servir muitas especializações de uma mesma tarefa com uma base e um adaptador por cliente.",
    "Preferir PEFT quando preservar capacidades gerais do modelo base importa.",
    "Documentar a limitação de hardware e usar números de referência quando não for possível treinar."
   ],
   "pros": [
    "Decisão com critério numérico explícito (limiar de ganho).",
    "LoRA entrega o mesmo comportamento observado por uma fração do custo.",
    "Resultado honesto: reconhece que o teto de Full existe."
   ],
   "contras": [
    "Duas execuções, 20 iterações (subtreino) e dois exemplos de comportamento: o tamanho real do teto não foi medido até convergência.",
    "O Full aqui é parcial (16 camadas); o Full de todas as camadas não coube nem foi testado.",
    "Esquecimento catastrófico não foi medido, apenas citado."
   ],
   "traps": [
    "Comparar Full contra o rank 8 em vez do melhor LoRA testado.",
    "Chamar de Full o treino de todas as camadas quando só 16 foram liberadas.",
    "Extrapolar a conclusão «LoRA empata» para tarefas abertas ou ambíguas, onde a liberdade extra do Full pode importar.",
    "Esquecer que o limiar de ganho depende do custo de armazenar e servir checkpoints grandes."
   ],
   "cola": [
    [
     "Full Fine-Tuning (aqui)",
     "Atualiza todos os pesos das 16 camadas selecionadas, sem decomposição"
    ],
    [
     "Adam",
     "Otimizador que guarda momento e variância por parâmetro treinável"
    ],
    [
     "Checkpoint",
     "Arquivo de pesos salvo do treino (~2 GB no Full; ~27 MB no adaptador)"
    ],
    [
     "Esquecimento catastrófico",
     "Perda de capacidades gerais ao ajustar muitos pesos"
    ],
    [
     "Limiar de ganho",
     "Melhora mínima do Full sobre o melhor LoRA para justificar o custo"
    ],
    [
     "Servir adaptadores",
     "Uma base compartilhada com vários adaptadores especializados"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 04 (LoRA e PEFT)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft"
    ],
    [
     "LoRA (Hu et al.)",
     "https://arxiv.org/abs/2106.09685"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-04-lora-e-peft (Full versus LoRA e alternativa Colab)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft",
     "resumo": "Ferramenta de comparação com os números reais do autor e o caminho para quem não tem Mac: notebook de Full Fine-Tuning em escala reduzida (família Qwen) no Colab.",
     "fluxo": [
      "<code>full-vs-lora-tradeoff-tool.js</code> (e <code>.py</code>): <code>CONFIGURACOES_REAIS</code> (LoRA 4, 8, 16 e Full com percentual do modelo, validation loss, pico de memória e checkpoint); métricas derivadas, regra de «vale a pena» por limiar de ganho e verificação dos dois exemplos de inferência (Felipe Alves Monteiro e Ricardo Alves Monteiro).",
      "<code>guia-execucao-local-modulo-4-companion.md</code>: os três comandos <code>mlx_lm</code> reais; explica que o checkpoint Full (~2 GB) não cabe no GitHub e é baixado com <code>hf download ahirtonlopes/amplitude-seguros-full-finetune --local-dir ./mlx-full-finetune</code>.",
      "<code>colab-full-finetune-training-notebook.ipynb</code> e o companion: Full genuíno no Colab T4 com Qwen3-1.7B (default), Qwen2.5-1.5B ou Qwen3-0.6B, otimizador de 8 bits e gradient checkpointing; 20 passos, val loss 1,302, pico de GPU 13,51 GB."
     ],
     "rodar": [
      "<code>node full-vs-lora-tradeoff-tool.js</code> (offline): Full 31,62% melhor que o rank 8, 153,5x mais parâmetros, 1,42x de memória, checkpoint 76,6x maior; contra o rank 16, ganho de 15,59%, que falha o limiar de 20%.",
      "Pipeline de Full no Mac: <code>python3 -m mlx_lm lora ... --fine-tune-type full --adapter-path ./mlx-full-finetune</code> (pico real de ~15,3 GB). Sem Mac: o notebook Colab em escala reduzida."
     ],
     "armadilhas": [
      "O código imprime checkpoint 76,6x maior (usa 26 MB), a aula e o documento de decisões dizem 73,8x (usa 27 MB); provavelmente é a mesma diferença de unidade (MiB contra MB) vista nos adaptadores, hipótese minha, não confirmada em nenhuma fonte.",
      "O README raiz afirma «val loss real caindo de 4,856 para 0,779 na melhor configuração»; esses números não aparecem em nenhum script ou documento (os medidos são 4,752 inicial e 0,725 no rank 16, 0,612 no Full).",
      "O companion de Colab explica por que o Full do modelo oficial (~5,12 bilhões de parâmetros, 27 a 74 GB de memória estimados) não cabe numa T4; por isso o notebook troca de modelo, e seus números (val loss 1,302) não são comparáveis aos do MLX (0,612).",
      "Neste notebook o Full terminou com campos extras no JSON e sem fechar a chave no limite de 100 tokens, achado que o companion documenta sem maquiagem.",
      "O checkpoint Full citado nos comandos 2 e 3 não está no repositório (<code>mlx-full-finetune</code>): sem baixar do Hugging Face, os comandos falham com arquivo não encontrado."
     ]
    }
   ]
  },
  {
   "id": "D9-12",
   "bloco": "d09-b4",
   "mod": "Unidade 5 · Aula 1",
   "emoji": "🧪",
   "read": "11 min",
   "title": "Teste retido de verdade e harness de avaliação: precisão por campo, consistência e esquema",
   "short": "Validation loss ajuda a escolher o modelo, não prova que ele generaliza: monte um teste retido e três métricas reprodutíveis.",
   "oneliner": "Validation loss serve para <b>selecionar</b>, não para provar generalização, ainda mais com um conjunto de 30 exemplos reutilizado várias vezes. A aula constrói um <b>conjunto de teste retido</b> (11 exemplos, índice 5000 ou mais) e um <b>harness</b> com três métricas objetivas: precisão por campo, consistência e adequação de esquema.",
   "vovo": [
    "Um aluno que refaz o mesmo simulado dez vezes melhora a nota, mas isso não garante a nota numa prova que ele nunca viu. Treino é o material de estudo, validação é o simulado usado para decidir como estudar, e teste é a prova fechada guardada num cofre.",
    "E um bom corretor não pergunta «a resposta parece boa?»: tem um gabarito campo a campo, confere se o aluno respondeu sempre igual à mesma pergunta e se preencheu a folha no formato certo."
   ],
   "oque": [
    "<b>Validation loss não é avaliação final:</b> os 30 exemplos de validação foram reutilizados repetidamente para escolher entre ranks, tipo de ajuste e configuração. Não se treina neles, mas decide-se com base neles; isso ajusta indiretamente as escolhas ao conjunto.",
    "<b>O problema herdado:</b> o job gerenciado do módulo 3.2 treinou com todos os 200 exemplos (120 Auto e 80 Saúde); não há conjunto de teste final para o modelo da nuvem. Avaliar no treino mostra reprodução, não aprendizado.",
    "<b>Papéis:</b> treino ajusta o modelo; validação compara configurações durante o desenvolvimento; teste responde, depois das escolhas, como o modelo se comporta em dados retidos. Se o teste influencia a escolha, deixa de ser teste.",
    "<b>Teste retido gerado:</b> o mesmo gerador determinístico do módulo 3.2 com índices fora da faixa de treino. 11 exemplos cobrem as 6 fontes de Auto e as 5 de Saúde (inclusive as de menor volume). No treino o gerador nunca passou do índice 59 por fonte; o teste usa 5000 ou mais, uma margem de segurança contra uma futura ampliação do treino.",
    "<b>O que ainda pode se repetir:</b> os nomes são inéditos, mas placa, valor e data vêm de pools menores e podem ter aparecido no treino. Para extração isso não invalida o teste: o valor correto está dentro do texto, o modelo precisa ler, não lembrar.",
    "<b>Três perguntas, três métricas:</b> (1) o conteúdo extraído está correto? Precisão por campo, comparando cada campo com o esperado (segurado, placa, valor; beneficiário, procedimento, valor), com tolerância numérica para arredondamento. (2) o modelo responde de forma estável à mesma entrada? Consistência entre chamadas. (3) a saída respeita o esquema? Adequação de esquema: JSON válido, exatamente os campos esperados, sem faltar nem sobrar.",
    "<b>Formato é requisito de produção:</b> uma resposta bonita com campo extra ou estrutura inesperada quebra o código que a consome. Nenhuma métrica conta a história inteira; reduzir a um só número dá visão incompleta.",
    "<b>Harness de avaliação:</b> uma estrutura automatizada que roda sempre os mesmos testes, com os mesmos critérios (nome em referência ao LM Evaluation Harness, da EleutherAI).",
    "<b>Por que não LLM como juiz aqui:</b> LLM-as-a-Judge serve quando a resposta é subjetiva (resumo, tom). Para JSON com campos objetivos, checagem programática é mais barata, rápida, determinística e sem o viés de um segundo modelo.",
    "<b>Resultados no endpoint publicado:</b> 11/11 com esquema válido (100%), precisão média por campo de 100% e, no teste de consistência (mesmo exemplo, três chamadas), três respostas idênticas byte a byte.",
    "<b>Como ler 100%:</b> a tarefa é estreita (poucos campos, formato fixo), onde fine-tuning costuma dar ganhos claros. O resultado vale para esta tarefa, este dataset, este processo e estes exemplos.",
    "<b>A ressalva do gerador:</b> o teste foi criado pelo mesmo gerador determinístico do treino: prova generalização para exemplos novos <i>do mesmo padrão</i>. Se o modelo aprendeu a tarefa ou só se adaptou ao formato do gerador fica para o teste de estresse (tópico 14)."
   ],
   "como": [
    "<b>11 testes do harness:</b> o conjunto retido usa índices fora da faixa de treino; o esquema reprova campo faltando, campo extra e resposta que não é JSON; a precisão por campo aceita tolerância numérica. É preciso testar o avaliador antes de confiar nele, para não atribuir ao modelo um bug do código de avaliação.",
    "<b>Casos reais de formatação:</b> o modelo às vezes devolve o JSON dentro de uma cerca de Markdown, que o harness aceita; e diferenças simples de acentuação não contam como erro de extração.",
    "<b>Reuso:</b> o harness é importado, sem duplicação, pelos módulos 5.2 a 5.4 e pelo protótipo do módulo 6.",
    "<b>Missão prática do bloco:</b> separar quais dados seriam treino, validação e teste no seu caso; definir três métricas compatíveis com tarefa estruturada; e esboçar um harness que valide o caminho correto e as falhas do próprio avaliador."
   ],
   "aplica": [
    "Construir um conjunto retido antes de qualquer decisão de escala, reservando a faixa de índices ou de fontes.",
    "Medir precisão por campo, consistência e conformidade de esquema para integrações que consomem JSON.",
    "Testar o avaliador com casos de falha plantados.",
    "Aceitar variações irrelevantes de formato (cerca de Markdown, acentos) sem reprovar o modelo à toa."
   ],
   "pros": [
    "Métricas objetivas, baratas, rápidas e determinísticas para tarefa estruturada.",
    "Três métricas capturam falhas diferentes (conteúdo, estabilidade, formato).",
    "O harness único é reaproveitado em todo o resto da disciplina."
   ],
   "contras": [
    "Só 11 exemplos: um único erro derrubaria a média de 100% para cerca de 91%.",
    "Mesma origem do treino: mede generalização dentro do padrão do gerador.",
    "Consistência é medida com chamadas a temperatura 0, que não garantem determinismo total."
   ],
   "traps": [
    "Chamar de «teste» o conjunto de validação que guiou as decisões.",
    "Atribuir 100% a «o modelo é ótimo» em vez de «o modelo é ótimo nesta tarefa estreita, neste padrão».",
    "Confiar num avaliador que ninguém testou.",
    "Medir consistência com amostras de duas chamadas e concluir estabilidade."
   ],
   "cola": [
    [
     "Conjunto retido",
     "Dados que não participaram de nenhuma decisão de treino ou escolha"
    ],
    [
     "Precisão por campo",
     "Comparação campo a campo com tolerância numérica"
    ],
    [
     "Consistência",
     "Mesma entrada, várias chamadas, mesma resposta"
    ],
    [
     "Adequação de esquema",
     "JSON válido com exatamente os campos esperados"
    ],
    [
     "Harness",
     "Bateria automatizada e reprodutível de avaliação"
    ],
    [
     "Índice 5000",
     "Margem de segurança fora da faixa de treino do gerador (máx. 59)"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 05 (Avaliação de Modelos)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-05-avaliacao-modelos (harness e ledger)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos",
     "resumo": "O harness de avaliação (JS e Python) que chama o endpoint publicado, mais o ledger <code>resultado-medido.json</code> que guarda os números medidos para o veredito.",
     "fluxo": [
      "<code>gerarConjuntoTesteRetido</code>: reaproveita <code>gerarExemplo</code> do módulo 3.2 com <code>OFFSET_RETIDO = 5000</code>, um exemplo por fonte (6 de Auto e 5 de Saúde).",
      "<code>chamarModeloReal</code>: POST em <code>endpoint:generateContent</code> (<code>temperature: 0</code>, token do <code>gcloud</code>); <code>removerCercaMarkdown</code> e <code>avaliarAdequacaoSchema</code> (campos faltando e extras); <code>normalizarTexto</code> (sem acento, caixa e espaços) e <code>avaliarPrecisaoPorCampo</code> (número com tolerância de 0,01); <code>avaliarConsistencia</code> (3 chamadas por padrão).",
      "<code>gravarResultadoMedido</code>: escreve a chave <code>baseline</code> em <code>resultado-medido.json</code> com lock exclusivo (<code>.lock</code>) e escrita atômica; só roda em execução real, nunca nos testes.",
      "<code>resultado-medido.json</code> já traz as cinco chaves usadas pelo veredito: <code>baseline</code>, <code>robusto-formato</code>, <code>robusto-estrutura</code>, <code>bate-generico</code> e <code>junto-bate-separado</code>."
     ],
     "rodar": [
      "<code>ENDPOINT_MODULO32=projects/.../endpoints/ID GCP_PROJECT_ID=... node model-evaluation-harness-tool.js</code>: 11 testes (10 locais e 1 que chama o endpoint) e depois a avaliação real (consome o seu endpoint, gera custo).",
      "Sem <code>gcloud</code>, 10 testes passam e o da chamada real falha."
     ],
     "armadilhas": [
      "Rodando o gerador, verifiquei no treino de 200 exemplos: só 28 nomes, 28 placas e 28 valores distintos. No teste retido de 11 exemplos nenhum nome foi visto, mas todos os 11 valores e 6 das 11 placas já apareciam no treino. Para extração isso é tolerável (a resposta está no texto), mas a palavra «inédito» vale só para o nome.",
      "Os 11 exemplos vêm do mesmo gerador, com os mesmos templates (<code>FONTES_AUTO</code> e <code>FONTES_SAUDE</code>): a limitação que a aula assume é estrutural.",
      "O harness grava no <code>resultado-medido.json</code> do repositório quando roda de verdade: rode numa cópia para não alterar os números de referência.",
      "A consistência de 3 chamadas a temperatura 0 é um sinal fraco: a aula 5.3 lembra que temperatura zero não garante determinismo absoluto."
     ]
    }
   ]
  },
  {
   "id": "D9-13",
   "bloco": "d09-b4",
   "mod": "Unidade 5 · Aula 2",
   "emoji": "⚔️",
   "read": "12 min",
   "title": "Baseline, teste A/B, bootstrap, LLM-as-a-Judge e modelo conjunto versus separado",
   "short": "O fine-tuning valeu o esforço? Compare com um genérico no mesmo protocolo, com e sem hint de formato, e meça a incerteza.",
   "oneliner": "Sem baseline a avaliação é isolada. A aula compara o fine-tunado com o <b>Gemini 2.5 Flash sem ajuste</b> (mesmo conjunto, mesmo prompt, mesmas métricas), testa o efeito de um <b>hint de formato</b>, estima a vantagem por <b>bootstrap</b>, mostra onde <b>LLM-as-a-Judge</b> é necessário e responde se treinar os dois domínios <b>juntos</b> foi melhor que separar.",
   "vovo": [
    "Quando o aluno tira 10 numa prova, a pergunta honesta é: e se qualquer aluno sem curso tirasse 9? Por isso você faz a mesma prova, com as mesmas regras, para o aluno do curso e para um aluno comum, e olha a diferença. Se o aluno comum só errou porque ninguém avisou o formato da folha, você avisa e refaz.",
    "E se a prova for uma redação, em vez de uma resposta única, você precisa de um corretor com critérios escritos, e ainda assim confere se ele não favorece quem aparece primeiro."
   ],
   "oque": [
    "<b>Duas perguntas:</b> fine-tuning valeu o esforço, ou um modelo genérico faria o mesmo? E treinar Auto e Saúde juntos (como o módulo 3.2 fez) é melhor que dois modelos especializados?",
    "<b>Protocolo igual:</b> mesmo conjunto retido, mesmas métricas, mesmo prompt para os dois. Dar uma dica de JSON só ao genérico contamina a comparação; primeiro compara-se sem ela, depois testa-se o efeito do hint isoladamente. O harness do tópico 12 é reaproveitado sem duplicação.",
    "<b>Resultado A/B puro:</b> o fine-tunado devolve os 11 exemplos com esquema válido e 100% de precisão; o genérico não devolve nenhum dos 11 no esquema exigido (precisão medida 0%). O 0% não é erro de conteúdo: o genérico acertou valores, mas devolveu texto livre em lista, e para uma API que espera JSON isso é falha total. Em integração, formato é requisito funcional.",
    "<b>Hint de formato:</b> com a instrução de responder apenas com objeto JSON válido, o genérico melhora bastante e passa a devolver JSON na maioria das chamadas, mas não fica estável: às vezes falha o esquema, às vezes o JSON é válido com nomes de campo errados (valor_orcamento em vez de valor). JSON válido não é esquema válido.",
    "<b>Precisão de conteúdo:</b> com hint, a precisão do genérico variou entre ~54,5% e ~72,7% (média ~61,8%) em múltiplas execuções, bem abaixo dos 100% do fine-tunado. O ganho não é só formato: aparece também na extração e no uso exato dos campos.",
    "<b>A pergunta certa antes de fine-tunar:</b> depois de corrigir o formato por prompt, a precisão de conteúdo basta para o nível de automação que você quer? Com revisão humana, menos precisão pode servir; saída direto para API ou banco pede rigor.",
    "<b>Bootstrap:</b> reamostragem com reposição das diferenças por exemplo para estimar a estabilidade da vantagem. Com os 11 exemplos, o intervalo de 95% da diferença de precisão entre fine-tunado e genérico com hint ficou entre ~24,2 e ~51,5 pontos percentuais, todo acima de zero.",
    "<b>Amostra pequena exige cautela:</b> 11 exemplos é pouco, mas 100% contra 0% é grande demais para ignorar.",
    "<b>Quando exact match deixa de servir:</b> uma tarefa de parecer em texto livre, sem gabarito único. Entra o LLM-as-a-Judge, com rúbrica: fidelidade aos fatos, capacidade de sinalizar a pendência real e clareza. Os casos são escritos à mão (um valor de consulta muito acima do histórico; um distrator de beneficiário com autorização prévia não localizada).",
    "<b>O hábito aprendido aparece fora da tarefa:</b> mesmo pedindo texto livre, o fine-tunado continua respondendo em estilo JSON; especialização não é domínio universal. Normalizando o formato (reescrevendo o conteúdo em prosa equivalente), um caso muda de vencedor (o conteúdo do fine-tunado passa a ser melhor) e outro continua favorável ao genérico, o que indica diferença real de conteúdo.",
    "<b>Vieses do juiz:</b> viés de posição (inverter a ordem e repetir; o veredito se manteve) e self-preference (usar um juiz de outra família; concordância aumenta a confiança, mas pode haver divergência). LLM-as-a-Judge não é verdade absoluta.",
    "<b>Dois casos extras:</b> um exemplo arquivado de benchmark público (explicar um livro e recomendar bibliografia), em que as duas respostas estão corretas e a diferença é profundidade e utilidade; e um caso de red teaming (extrair instruções internas) em que as duas recusam, mas uma explica o motivo e oferece caminho legítimo: recusa correta não é recusa boa, e falso positivo de segurança também é problema.",
    "<b>Conjunto versus separado:</b> foram treinados dois jobs novos com os mesmos hiperparâmetros (um só com os 120 de Auto e outro só com os 80 de Saúde). Auto: empate, 6/6 nos dois. Saúde: conjunto 5/5; o modelo só de Saúde falhou o esquema nos 5 exemplos, devolvendo lista com marcadores como o genérico. Os 80 exemplos isolados não bastaram para fixar o contrato de saída; com os 200, a repetição reforçou o padrão. Neste experimento o conjunto nunca perdeu.",
    "<b>Ressalva metodológica:</b> os modelos separados veem menos exposições totais aos dados, então a diferença não se atribui só à separação de domínio. Fica a fragilidade de os 11 exemplos serem do mesmo universo do treino, tratada no tópico 14."
   ],
   "como": [
    "<b>21 testes antes da comparação:</b> a lógica herdada do harness, os cenários (genérico sem hint, fine-tunado, genérico com hint), o bootstrap, o LLM-as-a-Judge e os mecanismos de retry.",
    "<b>Remedições:</b> um comando <code>medir-graduacao [N]</code> repete as medições (N = 20) e grava o pior caso para o lado que precisa vencer (mínimo do fine-tunado, máximo do genérico); o veredito do tópico 15 usa esse ledger.",
    "<b>Missão prática:</b> montar um A/B com o mesmo conjunto, prompt e métricas; testar o efeito de um hint de formato separando esquema, conteúdo ou ambos; e, para tarefa subjetiva, escrever uma rúbrica curta de juiz com checagem de viés de posição."
   ],
   "aplica": [
    "Provar o valor de um fine-tuning contra o melhor prompt de um modelo genérico, e não contra um prompt fraco.",
    "Separar ganho de formato (corrigível por prompt ou pós-processamento) de ganho de conteúdo.",
    "Avaliar saídas abertas (pareceres, recusas) com rúbrica explícita, inversão de posição e juiz de outra família.",
    "Decidir entre modelo único multidomínio e modelos por domínio com dados, não com intuição."
   ],
   "pros": [
    "Transforma «está bom» em comparação com um baseline sob o mesmo protocolo.",
    "O bootstrap quantifica a incerteza com poucos exemplos.",
    "Mostra o limite da especialização (hábito de JSON fora da tarefa)."
   ],
   "contras": [
    "O conjunto continua pequeno e do mesmo gerador.",
    "O LLM-as-a-Judge introduz vieses próprios e custo de chamada.",
    "A comparação conjunto versus separado não é controle perfeito (menos exposição no separado) e depende de treinar dois jobs extras."
   ],
   "traps": [
    "Dar ao genérico instruções diferentes das do fine-tunado.",
    "Interpretar o 0% do genérico como incapacidade de entender o texto.",
    "Validar só se a resposta é JSON, sem checar os nomes dos campos.",
    "Usar o mesmo modelo como candidato e juiz sem checar self-preference."
   ],
   "cola": [
    [
     "Baseline",
     "Referência contra a qual se mede ganho real"
    ],
    [
     "Teste A/B",
     "Dois modelos, mesmo conjunto, prompt e métricas"
    ],
    [
     "Hint de formato",
     "Instrução extra para responder em JSON, testada isoladamente"
    ],
    [
     "Bootstrap",
     "Reamostragem com reposição para estimar a estabilidade de uma diferença"
    ],
    [
     "LLM-as-a-Judge",
     "Modelo que julga respostas com rúbrica, quando não há gabarito único"
    ],
    [
     "Viés de posição",
     "Preferir a primeira ou a segunda resposta pela ordem"
    ],
    [
     "Self-preference",
     "Tendência de o juiz preferir respostas de sua própria família"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 05 (Avaliação de Modelos)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-05-avaliacao-modelos (A/B, juiz e domínios)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos",
     "resumo": "Ferramenta de 60 KB (JS e Python) que faz A/B, hint, bootstrap, LLM-as-judge e a comparação por domínio, mais os dois datasets de domínio único usados para treinar os jobs extras e o companion com os casos de juiz na íntegra.",
     "fluxo": [
      "<code>chamarRecurso</code>: <code>generateContent</code> genérico para endpoint ajustado ou modelo do publisher, com <code>comHint</code> e retry em HTTP 429 (backoff, 4 tentativas); <code>avaliarRecurso</code> reaproveita as funções do harness.",
      "<code>bootstrapIntervaloConfianca</code>: 10.000 reamostragens, nível 95%, RNG injetável.",
      "Pareceres: <code>gerarCasosPareceres</code> (valor anômalo e distrator de beneficiário), <code>julgarPareceres</code>, <code>julgarComTrocaDePosicao</code> (inverte a ordem) e juiz alternativo <code>gemini-2.5-pro</code>; <code>gerarCasoArenaHard</code> e <code>gerarCasoRedTeaming</code> para os dois casos extras.",
      "Comparação por domínio: precisa de <code>ENDPOINT_AUTO_ONLY</code> e <code>ENDPOINT_SAUDE_ONLY</code>; sem elas a seção é pulada com aviso. <code>amplitude-auto-only-120.jsonl</code> e <code>amplitude-saude-only-80.jsonl</code> são os datasets de treino desses jobs.",
      "<code>medirGraduacao</code> (<code>node ab-and-domain-tradeoff-tool.js medir-graduacao 20</code>) grava no ledger; <code>casos-llm-as-judge-companion.md</code> traz prompt, respostas e vereditos dos quatro casos (A, B, Arena-Hard e red teaming)."
     ],
     "rodar": [
      "<code>GCP_PROJECT_ID=... ENDPOINT_MODULO32=... node ab-and-domain-tradeoff-tool.js</code>: 21 testes (15 locais, 6 que dependem de rede) e mais de 20 chamadas reais; sem <code>gcloud</code> os 6 falham.",
      "O custo de uma bateria é da ordem de R$ 1 a 2, segundo o README raiz."
     ],
     "armadilhas": [
      "A faixa do genérico com hint aparece como 54,5% a 72,7% (média 61,8%) na aula, no guia do módulo 6 e nos valores de fallback do código; o <code>resultado-medido.json</code> versionado mostra, também com N = 20, mínimo 54,5%, máximo 66,7% e média 61,2%. As duas remedições coexistem no repositório.",
      "O bootstrap e os casos de juiz usam <code>gemini-2.5-flash</code> e <code>gemini-2.5-pro</code>, ambos com retirement anunciado para 16/out/2026; as constantes são <code>MODELO_GENERICO</code> e <code>MODELO_JUIZ_ALTERNATIVO</code>.",
      "Os textos dos Casos A e B no companion são de uma execução de referência: rodando de novo você terá o mesmo padrão, não as mesmas palavras.",
      "A seção de domínio (b) só roda se você tiver treinado os dois jobs extras (cerca de R$ 1,53 e R$ 0,86 no billing do autor)."
     ]
    }
   ]
  },
  {
   "id": "D9-14",
   "bloco": "d09-b4",
   "mod": "Unidade 5 · Aula 3",
   "emoji": "🔬",
   "read": "12 min",
   "title": "Robustez, overfitting e artefato de medição: quando o número ruim é culpa da régua",
   "short": "Testes de invariância e estruturais escritos à mão, uma queda para 88,9% que era bug do avaliador e um alarme que 58 chamadas desfizeram.",
   "oneliner": "Os 100% do teste retido só provam generalização dentro do padrão do gerador. A aula faz <b>behavioral testing</b>: uma sonda de capacidade geral (Round 0), variação de formato (Round 1) e variação estrutural (Round 2), todos escritos à mão. O número que parecia overfitting era um <b>artefato de medição</b>, e outro alarme sumiu com <b>N = 58</b>.",
   "vovo": [
    "Um aluno que gabarita as provas do professor pode ter só decorado o estilo das perguntas. Você muda o jeito de perguntar (a mesma coisa em outras palavras), depois muda a estrutura (conversa informal, duas pessoas no mesmo texto) e vê se ele continua acertando.",
    "E quando a nota cai, antes de culpar o aluno, você olha a folha de correção: às vezes o erro foi do corretor, que anotou «consulta» como errada porque o aluno escreveu «Consulta» com C maiúsculo."
   ],
   "oque": [
    "<b>O ponto cego:</b> treino e teste vieram da mesma função determinística: o índice mudou, o template não. Um exemplo pode ser novo e pertencer ao mesmo template. Overfitting é aprender os padrões do treino e pouco da tarefa.",
    "<b>Round 0, sonda de capacidade geral:</b> quatro perguntas fora do domínio (capital da França, trem a 80 km/h por 3 horas, recursão, frase inspiradora). O conteúdo permaneceu correto, mas o formato mudou: o modelo passou a embrulhar até respostas fora do domínio em JSON. É especialização de formato, não esquecimento catastrófico; e quatro perguntas são só um sinal qualitativo.",
    "<b>Behavioral testing e invariância:</b> perturbações que não deveriam alterar a resposta correta. O Round 1 tem seis documentos escritos à mão (3 de Auto e 3 de Saúde), plausíveis e não quebrados: rótulos coloquiais, ausência de «R$», texto corrido sem campo:valor e nome-isca (um atendente ou médico antes do segurado ou beneficiário).",
    "<b>Integridade experimental:</b> os IDs dos exemplos de estresse não colidem com o teste retido nem entre rounds; se um exemplo reaparece, o acerto pode ser memória.",
    "<b>O alarme falso do Round 1:</b> a primeira execução deu 88,9%, 11,1 pontos abaixo do baseline. Em vez de aceitar, o professor olhou a resposta bruta: os três valores estavam certos; o esperado tinha o procedimento em minúsculas e o modelo devolveu com inicial maiúscula, e o harness contou erro. <b>O modelo não falhou: a métrica falhou.</b>",
    "<b>Artefato de medição:</b> quando a ferramenta penaliza algo que não altera o conteúdo. Corrigido com normalização textual (caixa e espaços), o Round 1 foi reexecutado do início: 6/6 com esquema válido e precisão de 100%. Não foi flexibilizado para favorecer o modelo: a métrica passou a medir o que pretendia.",
    "<b>Causa raiz antes do veredito:</b> falha de compreensão? erro de parsing? normalização? dado esperado incorreto? ruído de amostragem? Só depois disso o número vira evidência.",
    "<b>Round 2, variação estrutural:</b> uma mensagem informal sem estrutura de documento, um valor por extenso sem dígitos («três mil e quinhentos reais») e duas entidades no mesmo texto, uma com valor fechado e outra ainda sem cobrança. Nenhum dos 200 exemplos de treino tinha mais de uma entidade principal.",
    "<b>Temperatura zero:</b> aqui temperatura é parâmetro de geração do modelo, sem relação com a amostragem por temperatura do balanceamento. Mesmo em zero, a plataforma não garante saída totalmente determinística.",
    "<b>Resultado do Round 2:</b> 100%, incluindo as duas entidades (o modelo escolheu a que tinha o valor fechado).",
    "<b>Um segundo alarme:</b> em um exemplo houve diferença de fraseado e, repetindo 3 vezes, o comportamento se repetiu; parecia sistemático. Com dezenas de chamadas (58 execuções) o erro nunca voltou. Três observações não provam um fenômeno; a boa avaliação testa também a estabilidade da evidência.",
    "<b>Limites assumidos:</b> dataset pequeno (200 exemplos), um único gerador, um registro linguístico, um idioma e uma moeda; sem teste adversarial malicioso (nenhum prompt injection); sem teste de produção em escala (latência, concorrência, rate limit); sem garantia para uma nova linha de negócio (seguro residencial seria outra distribuição); esquecimento catastrófico só parcialmente avaliado.",
    "<b>O que o 5.3 prova:</b> uma terceira camada de evidência: a qualidade permanece quando forma e estrutura mudam de modo realista, e a avaliação em si precisa ser investigada quando produz um resultado inesperado. «Métrica não é verdade por definição.»"
   ],
   "como": [
    "<b>Reuso do harness:</b> as mesmas funções de esquema e precisão, o mesmo conjunto retido como baseline: nenhuma régua nova só para o cenário mais difícil.",
    "<b>Dois níveis de dificuldade:</b> Round 1 testa sinônimo de rótulo e nome-isca; Round 2 empurra para estrutura nunca vista (informal, por extenso, duas entidades).",
    "<b>Repetição ampliada:</b> medir a robustez estrutural com N = 58 execuções e gravar no ledger.",
    "<b>Missão prática:</b> criar pelo menos um teste de invariância que altere a forma sem mudar o conteúdo esperado; incluir uma variação estrutural que não exista no gerador e registrar como distinguir erro real de artefato de medição; listar o que ainda não foi testado (nova distribuição, segurança adversarial, operação em escala)."
   ],
   "aplica": [
    "Ler um resultado inesperado como hipótese a investigar (resposta bruta, campo a campo), não como veredito.",
    "Escrever conjuntos de estresse à mão, fora do gerador de treino.",
    "Registrar explicitamente o que a avaliação não cobre, para não transformar um número forte em promessa exagerada.",
    "Repetir chamadas suficientes antes de declarar um comportamento sistemático."
   ],
   "pros": [
    "Reduz a hipótese de que 100% era só memória do template.",
    "Ensina a separar erro de modelo de erro de medição.",
    "Documenta limites com franqueza."
   ],
   "contras": [
    "Seis exemplos por round são poucos; a confiança vem de repetição, não de tamanho.",
    "Os testes são plausíveis, não adversariais: não testam segurança.",
    "A sonda de capacidade geral tem só quatro perguntas."
   ],
   "traps": [
    "Reprovar um modelo correto porque a régua foi mal definida (maiúscula, espaço).",
    "Concluir overfitting pelo primeiro número ruim, sem olhar a resposta bruta.",
    "Aceitar um erro «sistemático» observado em 3 repetições.",
    "Confundir hábito de formato com esquecimento catastrófico."
   ],
   "cola": [
    [
     "Overfitting",
     "Aprender o padrão do treino e pouco da tarefa"
    ],
    [
     "Behavioral testing",
     "Testar o comportamento sob perturbações que não deveriam mudar a resposta"
    ],
    [
     "Teste de invariância",
     "Muda a forma, o resultado esperado permanece"
    ],
    [
     "Artefato de medição",
     "Queda de métrica causada pelo avaliador, não pelo modelo"
    ],
    [
     "Normalização textual",
     "Ignorar caixa e espaços que não mudam o conteúdo"
    ],
    [
     "Esquecimento catastrófico",
     "Perda de capacidades gerais depois do ajuste"
    ],
    [
     "N de repetições",
     "Quantas chamadas sustentam a afirmação de que algo é sistemático"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 05 (Avaliação de Modelos)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-05-avaliacao-modelos (teste de estresse)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos",
     "resumo": "Ferramenta (JS e Python) com os conjuntos escritos à mão e os rounds 0, 1 e 2, reaproveitando o harness e o A/B.",
     "fluxo": [
      "<code>gerarSondaCapacidadeGeral</code> (4 perguntas), <code>gerarConjuntoInvariancia</code> (Round 1: 3 de Auto e 3 de Saúde com <code>variacao</code> rotulada) e <code>gerarConjuntoInvarianciaSevero</code> (Round 2: mensagem informal, valor por extenso e dois registros no mesmo texto).",
      "<code>avaliarConjunto</code> chama <code>chamarModeloReal</code> por exemplo e acumula esquema e precisão; <code>rodarRound0/1/2</code> imprimem a comparação com o baseline; <code>medirRobustezEstrutural</code> repete o Round 2 (N = 58) e grava <code>robusto-estrutura</code> no ledger.",
      "O modo de uso é <code>node overfitting-stress-test-tool.js [round0|round1|round2|round2-medir] [N]</code>."
     ],
     "rodar": [
      "Com endpoint e <code>gcloud</code>: <code>ENDPOINT_MODULO32=... GCP_PROJECT_ID=... node overfitting-stress-test-tool.js round1</code>. Os testes locais: 4 do Round 0 e 6 dos demais, com um que chama o endpoint (falha sem rede)."
     ],
     "armadilhas": [
      "Os conjuntos têm IDs próprios («invariancia-...» e «invariancia-severo-...»), pensados para não colidir com o teste retido; a checagem é por convenção, não por validação automática de dados.",
      "O verificador do módulo 6 (tópico 17) que reavalia o modelo escalado reproduz «literalmente» os mesmos 12 exemplos (esses conjuntos não são exportados); cópias que podem divergir.",
      "O modelo avaliado é o do job de 200 exemplos (<code>ENDPOINT_MODULO32</code>); nada aqui avalia o modelo local.",
      "O hábito de JSON fora do domínio (Round 0) só foi observado qualitativamente em quatro perguntas."
     ]
    }
   ]
  },
  {
   "id": "D9-15",
   "bloco": "d09-b4",
   "mod": "Unidade 5 · Aula 4",
   "emoji": "🏁",
   "read": "11 min",
   "title": "Veredito de escala: checklist de graduação, gate reaberto, NPV real e o modelo local",
   "short": "Cinco critérios com limiares escritos antes, o mesmo gate do módulo 1 reaplicado e o LoRA local avaliado com a mesma régua.",
   "oneliner": "Medir não é decidir. O módulo fecha com um <b>checklist de graduação de 5 critérios com limiares definidos antes</b>, o <b>mesmo gate do módulo 1 reaberto</b> com evidência nova, o veredito (Auto e Saúde escalam; Atendimento não) e a avaliação do <b>modelo LoRA local</b> pelo mesmo conjunto retido, que fecha a promessa do módulo 4.",
   "vovo": [
    "Antes de uma obra ser liberada, o fiscal usa uma lista de verificação escrita antes de ver a obra, com limites claros para cada item. Não adianta ajustar o limite depois de ver o resultado. E ele reabre o projeto original com os mesmos critérios, agora alimentado com dados reais em vez de estimativas.",
    "Passar na lista de uma obra não autoriza construir um prédio de outro tipo: a evidência vale só para o que foi medido."
   ],
   "oque": [
    "<b>Três evidências acumuladas:</b> 100% no teste retido (5.1); fine-tunado muito acima do genérico e conjunto empatando ou vencendo separados (5.2); aprovado nos estresses mais severos (5.3). O que muda é organizá-las num critério explícito de decisão, um gate, para evitar o time técnico se empolgar e tratar a escala como consequência automática.",
    "<b>Checklist de graduação (5 critérios):</b> (1) precisão em dado nunca visto (>= 95%); (2) bate o modelo genérico, mesmo no melhor caso observado do genérico; (3) treinar domínios juntos é igual ou melhor que separar; (4) robusto a variação de formato (>= 95%); (5) robusto à variação estrutural mais difícil (>= 90%).",
    "<b>Limiar proporcional à dificuldade:</b> exigir 95% num teste deliberadamente mais difícil reprovaria um piloto bom; exigir só 90% onde a tarefa é fácil afrouxaria o padrão. Inverter os limiares seria permissivo onde deveria ser excelente. O bom checklist tem critérios justificáveis, não os maiores números.",
    "<b>Sem métricas novas:</b> cada critério vem do que já foi medido nos módulos 5.1 a 5.3. Algumas comparações são repetidas para dar confiança; o checklist usa o melhor caso observado do genérico, não a média, para tornar a comparação conservadora e tirar a desculpa de uma execução ruim.",
    "<b>Reabrir o gate do módulo 1:</b> a ferramenta reaproveita a mesma lógica, sem inventar um gate novo agora que se conhece a resposta. Auto: gate aprovado desde o início e 5/5 no checklist, veredito <i>escalar</i>. Saúde: o gate só aprovou depois de a pergunta de dados passar de 0,35 para 0,62; com 5/5, também <i>escalar</i>.",
    "<b>Escalar tem escopo:</b> não supõe que o modelo funcionará em qualquer tarefa futura; transforma este piloto, dentro do escopo medido, num fluxo real de uso.",
    "<b>Atendimento ao Cliente continua fora:</b> as perguntas verdes continuam verdes, e as estruturais continuam vermelhas (P1 em 0,3 e P4 em 0,35). O motivo não é falta de evidência nova, é falta de evidência relevante: todo o módulo 5 avaliou extração estruturada de campos fixos, uma tarefa fechada; negociar uma exceção de cobertura é uma tarefa aberta. O limite é de escopo, não de rigor. Recomendação: prompt, RAG e roteamento para especialista humano.",
    "<b>A lacuna do modelo local:</b> o módulo 4.4 prometeu avaliar os dois modelos reais com o mesmo rigor; o da Vertex AI já foi medido. O local é avaliado em Python de propósito: a API Python do MLX carrega o modelo (~10 GB) uma vez e roda os 11 exemplos no mesmo processo, em vez de recarregá-lo por exemplo.",
    "<b>Mesmo conjunto, mesma régua:</b> o LoRA rank 8 recebe o conjunto retido do 5.1 e as mesmas funções de esquema e precisão. Resultado: 11/11 de esquema válido e 100% de precisão, igual ao modelo da Vertex AI. No Colab (alternativa sem Apple Silicon) a aula cita 11/11 e ~97% de precisão média.",
    "<b>Convergência de dois caminhos:</b> modelos diferentes (adapter size 4 contra rank 8), dois ambientes e mesmo resultado sugerem que o comportamento não é peculiaridade de um provedor. Não é garantia universal, mas evidência adicional.",
    "<b>O checkpoint de 20 iterações:</b> o treino mais longo mostrou melhora até perto de 90, mas o checkpoint estabelecido foi o de 20. Ponto de parada também é decisão, e precisa de critério explícito.",
    "<b>NPV real contra projetado (companion):</b> reabre o NPV do módulo 1 trocando só o custo de treino de R$ 2.400 estimados para o medido no billing (R$ 1,53 para Auto e R$ 0,86 para Saúde): Auto de R$ 4.780,27 (break-even mês 10) para R$ 7.178,74 (mês 1); Saúde de R$ -993,23 (sem break-even) para R$ 1.405,91 (mês 1). Custo por chamada em produção e crescimento de volume continuam projeção, nunca medidos."
   ],
   "como": [
    "<b>Definir antes de checar:</b> primeiro os limiares, depois a verificação; senão vira racionalização a posteriori.",
    "<b>Ledger como fonte única:</b> cada harness grava sua chave em <code>resultado-medido.json</code>; o veredito lê esses ledgers e só cai nos valores históricos se o ledger não existir, avisando.",
    "<b>Missão prática:</b> definir, antes de olhar os resultados, um checklist com critérios e limiares; reaplicar o gate original e documentar o que escala, o que fica em piloto e o que está fora de escopo; comparar duas implementações sob o mesmo conjunto de teste e registrar o que a convergência permite e não permite concluir."
   ],
   "aplica": [
    "Promover um piloto para produção só depois de um checklist de graduação escrito antes e com evidência reproduzível.",
    "Reabrir uma decisão financeira antiga trocando uma premissa por medição, sem inventar dados novos.",
    "Comparar caminhos de treinamento diferentes (nuvem e local) sob a mesma régua.",
    "Declarar o escopo de cada veredito."
   ],
   "pros": [
    "Impede que métricas boas virem escala por entusiasmo.",
    "Os limiares escritos antes dão credibilidade.",
    "A convergência de dois caminhos independentes fortalece a evidência."
   ],
   "contras": [
    "O veredito herda as limitações dos testes: 11 exemplos no retido, 6 por round de estresse, um único gerador.",
    "O NPV real só atualiza o custo de treino; o resto continua projeção.",
    "Cinco critérios medidos em apenas uma tarefa estreita."
   ],
   "traps": [
    "Ajustar o limiar depois de ver o resultado.",
    "Comparar contra a média do baseline quando o melhor caso desmentiria a vantagem.",
    "Usar o resultado do módulo 5 para reverter a reprovação estrutural de Atendimento.",
    "Chamar de medida a pergunta 3 de Saúde: ela é projetada (0,35 mais 0,03 por mês), não medida."
   ],
   "cola": [
    [
     "Checklist de graduação",
     "Critérios e limiares escritos antes, que o piloto precisa cumprir para escalar"
    ],
    [
     "Limiar",
     "Valor mínimo por critério (95% ou 90%) proporcional à dificuldade"
    ],
    [
     "Escopo da evidência",
     "A conclusão vale só para a tarefa e o conjunto medidos"
    ],
    [
     "Melhor caso do baseline",
     "Comparar com o genérico no seu melhor resultado observado"
    ],
    [
     "Ledger",
     "Arquivo com os números medidos por cada harness"
    ],
    [
     "Ponto de parada",
     "Número de iterações escolhido por critério medido"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 05 (Avaliação de Modelos)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-05-avaliacao-modelos (veredito, NPV real e modelo local)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos",
     "resumo": "Três ferramentas: o veredito de escala, o companion financeiro e a avaliação do modelo local (Python e a alternativa em JS), mais o notebook Colab de avaliação.",
     "fluxo": [
      "<code>veredito-escala-tool.js</code>: <code>METADATA_CRITERIOS</code> (5 critérios com limiar e valor de fallback), <code>carregarCriteriosGraduacao</code> (lê o <code>resultado-medido.json</code>), <code>avaliarGraduacao</code>, <code>avaliarVereditoCaso</code> e <code>avaliarVeredito</code>, que importa <code>avaliarCasoCompleto</code> do módulo 1 e <code>construirCasoNoveMesesDepois</code> do módulo 3. 4 testes.",
      "<code>npv-real-vs-projetado-tool.js</code> (e companion): reabre <code>calcularNPV</code> trocando o custo de treino por R$ 1,53 (Auto) e R$ 0,86 (Saúde). 5 testes.",
      "<code>avaliacao_modelo_local_tool.py</code> (principal): carrega o MLX uma vez e avalia os 11 exemplos; <code>avaliacao-modelo-local-tool.js</code> (alternativa) chama <code>mlx_lm generate</code> por subprocesso e paga um carregamento de ~10 GB por exemplo (imprime o tempo para mostrar o custo). <code>colab-model-evaluation-notebook.ipynb</code> e companion fazem o mesmo na T4."
     ],
     "rodar": [
      "<code>node veredito-escala-tool.js</code> e <code>node npv-real-vs-projetado-tool.js</code> rodam offline com o ledger versionado: graduação 5/5, Auto e Saúde escalar SIM, Atendimento NÃO (P1 e P4 vermelhas).",
      "A avaliação local exige Apple Silicon e <code>mlx_lm</code> (não executada aqui; sem o módulo, o JS reporta 11 falhas de CLI)."
     ],
     "armadilhas": [
      "O fallback do código para o critério «bate o genérico» é 72,7%; o ledger versionado, que tem prioridade, diz 66,7%. A saída real do veredito imprime 66,7%.",
      "No companion de Colab, a avaliação é 11/11 e 100,0% de precisão; a aula cita ~97% de precisão média por campo no Colab.",
      "O NPV real usa os custos dos jobs de domínio único (R$ 1,53 e R$ 0,86), que somam os R$ 2,39 do job conjunto; a divisão por domínio é uma convenção do companion.",
      "A pergunta 3 de Saúde (0,62) é projetada pelo próprio código a partir de 0,35 mais 0,03 por mês, não uma medição de dado novo.",
      "Os números do ledger foram medidos em 11 e 12/09/2026, com 6 exemplos por round e repetições de chamadas; valem para aquela data e aquele endpoint."
     ]
    }
   ]
  },
  {
   "id": "D9-16",
   "bloco": "d09-b5",
   "mod": "Unidade 6 · Aulas 1 e 2",
   "emoji": "🤖",
   "read": "12 min",
   "title": "Do modelo ao protótipo: classificar, rotear, validar e responder, recusando quando há incerteza",
   "short": "Um endpoint não é um produto: o protótipo em JavaScript orquestra 4 passos com política explícita de recusa e dois caminhos de inferência.",
   "oneliner": "Um modelo treinado, publicado, avaliado e aprovado ainda não é um produto. O projeto final constrói a <b>carroceria</b> ao redor do motor: um protótipo em JavaScript com <b>4 passos (classificar, rotear, validar em duas camadas, responder)</b>, <b>Vertex AI por padrão e LoRA local opcional</b>, e uma regra que atravessa tudo: <b>incerteza não vira resposta forçada</b>.",
   "vovo": [
    "Um motor perfeito, testado no dinamômetro, ainda não é um carro: faltam carroceria, volante e pedais. O modelo fine-tunado é o motor; o protótipo é o carro que uma pessoa comum consegue dirigir sem saber montar prompt, autenticar e interpretar JSON.",
    "E um bom recepcionista tem três respostas, não duas: «sim, anotei», «isso não é comigo, vou chamar um especialista» e «não entendi, pode confirmar?». Chutar um setor para parecer eficiente é o pior caminho."
   ],
   "oque": [
    "<b>Não repete os módulos anteriores:</b> reaproveita tudo que já é confiável (endpoint do módulo 3, harness do módulo 5, funções de avaliação) e constrói só a cola. Reescrever lógica validada só para ter um arquivo novo aumenta o risco; copiar uma regra em dois lugares permite divergência.",
    "<b>Casos de mercado (aula 1):</b> a EXL (BPO para seguradoras) com a NVIDIA e um modelo fine-tunado em dados proprietários de sinistros (extração e apoio a underwriting: +30% de acurácia sobre o genérico e -30% de custo operacional, segundo o caso) e o Nubank (transformer sobre sequências de transações; +1,25% de AUC relativo no teste offline e, segundo a aula, ganho de longo prazo de 32% na métrica de negócio). Lição comum: fine-tuning não é o produto final, é um componente que precisa de arquitetura.",
    "<b>O fluxo de 4 passos, nesta ordem:</b> (1) classificar o domínio a partir do texto bruto (o classificador ainda não tem o JSON de saída); (2) rotear para o modelo (endpoint da Vertex AI por padrão, ou o checkpoint LoRA local por uma flag); (3) extrair e validar o esquema; (4) responder em linguagem natural. Classificar vem antes de rotear; validar antes de responder, senão uma resposta bonita sobre um JSON errado só esconde o erro.",
    "<b>Duas decisões antes do código:</b> qual modelo por padrão (os dois bateram 11/11 e 100% no conjunto retido, então a escolha é de arquitetura: Vertex AI é gerenciado e mais próximo de produção, mas tem custo por chamada e depende de rede; o local não tem custo por chamada e funciona offline, mas exige checkpoint e hardware) e o que fazer sem confiança.",
    "<b>Política de incerteza:</b> um texto de atendimento ao cliente não pode ser forçado para Auto ou Saúde (domínio não aprovado): vai para um especialista humano. Um texto com sinais dos dois domínios ou sem pista clara pede confirmação ao usuário: o atrito é menor que extrair campos do domínio errado. Rejeitar temporariamente um caso válido custa menos que devolver dado corrompido como se fosse confiável.",
    "<b>Implementação:</b> JavaScript orquestra; um segundo arquivo em Python chama o checkpoint local (MLX não tem par em JS). O JS dispara o Python como programa externo, envia JSON por entrada padrão e recebe o texto bruto da resposta pela saída padrão. Os dois caminhos devolvem o mesmo contrato, então a camada seguinte não precisa saber de onde veio a inferência, e os erros do Python são propagados com a causa real.",
    "<b>Chamada bloqueante por escolha:</b> o processo espera o Python carregar o checkpoint; para um protótipo que processa um caso por vez simplifica leitura e depuração. Em produção: comunicação assíncrona ou processo Python vivo para não recarregar o checkpoint a cada requisição. A aula deixa essa limitação explícita.",
    "<b>O classificador por palavras-chave:</b> vocabulário deliberadamente específico (placa, veículo, oficina, funilaria...; beneficiário, procedimento, clínica...), com e sem acento. A palavra «sinistro» foi excluída de propósito: também aparece em atendimento (contestação de sinistro) e viraria um voto falso, encaminhando uma tarefa não aprovada ao modelo. Regra conservadora: mais pontos define o domínio; 0 a 0 é fora do escopo; empate maior que zero é ambíguo.",
    "<b>Por que não outro LLM para classificar:</b> mais custo, latência, dependência e um ponto de falha; com dois domínios de vocabulários distintos, uma regra simples é proporcional ao problema. Simplicidade também é decisão de arquitetura.",
    "<b>Validação em duas camadas:</b> a primeira é a adequação de esquema do harness (chaves exatas); a segunda, nova, confere consistência de valores (campo textual não vazio, <code>valor</code> numérico válido), porque um JSON com as chaves certas ainda pode ter <code>valor</code> não numérico. Se qualquer camada reprova, o protótipo não corrige em silêncio nem inventa campo: pede para tentar de novo.",
    "<b>Resposta humana:</b> dados estruturados para máquinas, linguagem natural para pessoas: uma frase de confirmação em português com o valor formatado em reais.",
    "<b>Demonstrações:</b> um orçamento de oficina escrito à mão com distratores (peças e mão de obra antes do total) é extraído corretamente; contestação de cobertura (0 a 0) é fora do escopo, sem chamar a API; texto com sinais dos dois domínios pede confirmação. Recusar corretamente pode ser mais barato e mais seguro que aceitar errado.",
    "<b>Nuvem versus local:</b> o mesmo texto, trocando só a flag, dá os mesmos três campos nos dois caminhos; nenhuma lógica central muda. O modo local demora mais porque cada execução recarrega o checkpoint, consequência da implementação simplificada, não do conceito.",
    "<b>Fechamento de requisitos:</b> integrar o modelo customizado num fluxo prático e implementar em JavaScript um protótipo funcional usando o modelo treinado via API real. A implementação central tem pouco mais de 200 linhas de lógica porque os módulos anteriores fizeram o trabalho pesado."
   ],
   "como": [
    "<b>14 testes automatizados:</b> 13 não chamam rede (classificação, formatação, consistência de valores, recusas, roteamento, JSON malformado) com dependências injetadas, e um chama o endpoint de verdade com um caso de automóvel escrito à mão. Testar barato o que pode ser testado barato; só a integração real usa rede.",
    "<b>As recusas não chamam a API:</b> a recusa acontece antes do roteamento, o que reduz custo e latência e evita processar domínio não aprovado.",
    "<b>Alternativa sem Apple Silicon:</b> um notebook Colab treina o mesmo LoRA rank 8 e reproduz o contrato de entrada e saída; há um script standalone para CUDA em Windows ou Linux.",
    "<b>Missão prática do bloco:</b> implementar um classificador simples que retorne domínio conhecido, fora do escopo ou ambíguo; testar que casos recusados não chamam o provedor; definir um contrato único para trocar dois provedores sem alterar a validação e a resposta."
   ],
   "aplica": [
    "Pôr um modelo especializado atrás de um fluxo que um usuário comum consegue usar.",
    "Definir antes do código o que o sistema faz quando não sabe: recusar, encaminhar ou pedir confirmação.",
    "Isolar o passo de inferência atrás de um contrato único para trocar provedor sem mexer em validação e resposta.",
    "Usar uma regra simples e verificável quando o problema é simples, e documentar a escolha."
   ],
   "pros": [
    "Pequeno e previsível: poucas peças novas, o resto é reaproveitado.",
    "Política explícita de incerteza que reduz custo e evita corrupção silenciosa.",
    "Dois provedores intercambiáveis sem alterar a orquestração."
   ],
   "contras": [
    "O classificador por palavras-chave é frágil (veja o achado abaixo).",
    "A chamada local bloqueante e o recarregamento do checkpoint não servem para produção.",
    "O caminho local só existe em Python/MLX (Apple Silicon) ou na alternativa Hugging Face."
   ],
   "traps": [
    "Forçar um esquema inadequado a um caso fora do escopo: a saída pareceria válida e estaria errada.",
    "Escolher o domínio de maior pontuação mesmo em empate ou sem pista.",
    "Formatar uma resposta amigável antes de validar o JSON.",
    "Tratar o protótipo didático como arquitetura de produção."
   ],
   "tip": "As oito decisões de arquitetura que justificam estas escolhas, e a escala para 3.000 exemplos, estão no <a href=\"#D9-17\">tópico 17</a>.",
   "cola": [
    [
     "Orquestração",
     "Encadear classificar, rotear, validar e responder"
    ],
    [
     "Roteamento",
     "Escolher o provedor de inferência (Vertex AI por padrão, local por flag)"
    ],
    [
     "Recusa explícita",
     "Fora do escopo: encaminhar ao humano; ambíguo: pedir confirmação"
    ],
    [
     "Validação em duas camadas",
     "Esquema (chaves) mais consistência de valores (tipos e vazios)"
    ],
    [
     "Contrato único",
     "Mesma entrada e saída para os dois provedores"
    ],
    [
     "Chamada bloqueante",
     "O processo espera o filho terminar; simples, não serve para concorrência"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 06 (Projeto Final)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-06-projeto-final"
    ],
    [
     "Nubank: Your Spending Needs Attention (indicação, relatório 19)",
     "https://arxiv.org/abs/2507.23267"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-06-projeto-final (assistente e caminho local)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-06-projeto-final",
     "resumo": "O protótipo em JavaScript, o script Python do modelo local e as alternativas multiplataforma (notebook Colab e script Hugging Face).",
     "fluxo": [
      "<code>amplitude-seguros-assistente.js</code>: <code>classificarDominio</code> conta ocorrências em <code>PALAVRAS_AUTO</code> e <code>PALAVRAS_SAUDE</code> e devolve <code>dominio</code> ou <code>motivo</code> (<code>fora_do_escopo</code>, <code>ambiguo</code>); <code>chamarModelo</code> roteia para <code>chamarModeloReal</code> (módulo 5) ou para <code>chamarModeloLocal</code> (<code>spawnSync('python3', ...)</code> com JSON no stdin).",
      "<code>avaliarAdequacaoSchema</code> (módulo 5) e <code>avaliarConsistenciaDeValores</code> (novo); <code>formatarResposta</code> monta a confirmação com <code>formatarMoeda</code>; <code>processarMensagem</code> devolve um de <code>fora_do_escopo</code>, <code>ambiguo</code>, <code>schema_invalido</code> ou <code>sucesso</code>.",
      "<code>chamar_modelo_local.py</code>: lê JSON do stdin, carrega MLX com o adaptador rank 8 (<code>../modulo-04-lora-e-peft/mlx-adapters</code>), aplica o chat template e gera até 150 tokens, imprimindo o texto bruto.",
      "<code>colab-local-model-notebook.ipynb</code> (treina do zero no Colab e reproduz o contrato) e <code>chamar-modelo-local-hf.py</code> (mesmo contrato com <code>transformers</code> e <code>peft</code>, para CUDA); o companion documenta os resultados."
     ],
     "rodar": [
      "<code>node amplitude-seguros-assistente.js 'texto do usuário'</code> (nuvem) ou <code>--local</code> (MLX); <code>--skip-tests</code> pula a suíte. Precisa de <code>GCP_PROJECT_ID</code> e <code>ENDPOINT_MODULO32</code> no caminho de nuvem.",
      "Sem <code>gcloud</code>, 13 dos 14 testes passam e o da chamada real falha; como o script aborta quando um teste falha, é preciso <code>--skip-tests</code> para ver a recusa funcionar offline."
     ],
     "armadilhas": [
      "O filtro de fora do escopo só dispara no placar 0 a 0. Reproduzi a lógica numa cópia isolada: «contestar a negativa de cobertura... o guincho do veículo não foi pago» cai em Auto (uma palavra de Auto e nenhuma de Saúde) e «o hospital negou a cobertura da internação» cai em Saúde; um único termo como <code>veículo</code>, <code>hospital</code> ou <code>consulta</code> faz uma queixa de atendimento seguir para o modelo fine-tunado, que é justamente o domínio reprovado.",
      "As listas reais têm mais palavras que as citadas na aula (por exemplo <code>pintura</code>, <code>exame</code>, <code>paciente</code>, <code>consulta</code>, <code>hospital</code>), e a busca é por substring, não por palavra inteira.",
      "A suíte roda a cada execução (inclusive o teste que chama o endpoint, com custo) salvo <code>--skip-tests</code>.",
      "O notebook do Colab mostrou um erro reproduzível (4 de 4) no caminho Hugging Face: <code>valor: 187050</code> em vez de 1870,5 num caso com centavo fracionário novo; o companion o relaciona ao trade-off de precisão da quantização e adverte para não apresentar o Colab como «prova de convergência de três frameworks».",
      "O docstring de <code>chamar-modelo-local-hf.py</code> manda trocar o nome do script na linha 88; no arquivo atual a variável <code>scriptLocal</code> está na linha 89. O script HF também ainda não foi testado isoladamente.",
      "Cada chamada local recarrega o checkpoint porque cada <code>spawnSync</code> é um processo novo: o cache de módulo do Python de <code>chamar_modelo_local.py</code> não ajuda entre chamadas."
     ]
    }
   ]
  },
  {
   "id": "D9-17",
   "bloco": "d09-b5",
   "mod": "Unidade 6 · Aula 3",
   "emoji": "📜",
   "read": "12 min",
   "title": "Decisões de arquitetura, escala para 3.000 exemplos (e a regressão) e o fechamento da disciplina",
   "short": "Oito decisões com alternativa rejeitada e resultado real, um modelo escalado que regrediu no Round 2 e o que o case prova e não prova.",
   "oneliner": "Código funcionando não encerra um projeto profissional. A aula documenta as <b>oito decisões</b> no formato <b>escolha, alternativa rejeitada, por quê, resultado real</b>, reavalia o modelo escalado para <b>3.000 exemplos</b> com o mesmo protocolo (e encontra uma <b>regressão no Round 2: 100% para 66,7%</b>) e delimita o que o case prova e o que não prova.",
   "vovo": [
    "Quem herdar este projeto daqui a um ano vai perguntar: por que um classificador de palavras e não um LLM? Por que a nuvem como padrão? Se o motivo morreu na cabeça de quem decidiu, a próxima pessoa reconstrói o raciocínio, talvez diferente. Escrever o porquê é deixar o diário de bordo.",
    "E um bom diário registra também a tentativa que deu errado. Dar mais dado a um aluno nem sempre melhora a nota: às vezes ele erra uma coisa nova. Escrever isso com todas as letras vale mais que esconder."
   ],
   "oque": [
    "<b>O formato:</b> escolha (o caminho adotado), alternativa rejeitada (metade do raciocínio), por quê (ligado a custo, escala, manutenção, qualidade, latência, risco, disponibilidade de dados) e resultado real (um número, uma métrica, um comportamento rastreável a um experimento).",
    "<b>As oito decisões:</b> (1) gate ponderado por AHP e não checklist binário (Saúde 0,60 e Atendimento 0,66 parecem próximos no agregado, mas um reprova por dado, temporário, e outro por tarefa aberta, estrutural); (2) MinHash + LSH e não comparação par a par (549 para 20 comparações, recall perfeito); (3) API gerenciada na Vertex AI e não infraestrutura própria (provar o caso de negócio antes); (4) LoRA rank 8 e não Full (empate comportamental com 153,5 vezes menos parâmetros); (5) protocolo de avaliação em três frentes (retido, baseline, estresse); (6) classificador de palavras-chave e não um segundo LLM; (7) Vertex AI por padrão e modelo local opcional; (8) recusar em vez de adivinhar.",
    "<b>Honestidade documentada:</b> o rank 8 era também o default da ferramenta, e foi confirmado por experimento depois; a decisão só é auditável se o documento reflete o processo real. O documento do repositório admite também que o <b>posto 4 do job da Vertex AI nunca foi pedido</b> em nenhum job (é o default silencioso do provedor, achado numa auditoria posterior) e que a faixa de 3.000 exemplos é um critério aplicado na revisão, não uma recomendação numérica do módulo 5.4.",
    "<b>Decisão transversal de reuso:</b> importar a função já testada (framework do módulo 1, limpeza do módulo 2, harness do módulo 5) em vez de copiá-la; no módulo 3 o reuso é por chamada de API (o endpoint).",
    "<b>O modelo de 3.000 exemplos:</b> 1.800 de Auto e 1.200 de Saúde, 10 oficinas e 8 clínicas (contra 6 e 5), três personas de redação por fonte (bloco formal, texto corrido, exportação abreviada), campos distratores (apólice, franquia, convênio, guia, CRM) e ruído de OCR em ~9% dos exemplos. Quinze vezes mais dados que o piloto, mesmos hiperparâmetros, mesma Vertex AI.",
    "<b>Reavaliado com o mesmo protocolo:</b> teste retido, Round 1 e Round 2. No retido e no Round 1 o desempenho continuou forte (11/11 e 6/6); no Round 2 houve <b>regressão: 100% para 66,7%</b>, e os dois casos que falharam são os únicos com dois registros no mesmo texto (um completo, outro incompleto). O resultado foi confirmado em dezenas de chamadas, então não é o ruído de amostra pequena do alarme falso do 5.3. Mais dados não garantem manter o que funcionava: escalar precisa ser medido, não presumido.",
    "<b>O que o case prova:</b> um piloto curado de 200 exemplos, com protocolo rigoroso, generalizou para dados nunca vistos, superou o genérico por margem clara, resistiu a variações de formato e estrutura e foi integrado a um protótipo; e a abordagem pode ser escalada e reavaliada pelo mesmo protocolo.",
    "<b>O que não prova:</b> que 3.000 bastam em qualquer escala de produção; generalização para outro idioma, moeda, padrão de documento ou volume de tráfego; resistência a entradas maliciosas; que escalar sempre preserva o desempenho. Dizer o que o experimento não prova delimita onde a evidência vale.",
    "<b>Custo real do escalado:</b> o job de 3.000 levou 24 min 53 s (o de 200, 45 min 42 s; provavelmente variação de fila, não relação causal), com 474.448 tokens faturáveis e custo de R$ 41,40 no billing. O total do case (piloto R$ 2,39 mais escalado R$ 41,40) é de R$ 43,78; os jobs de ablação por domínio (R$ 1,53 e R$ 0,86) vêm além disso. Estimar custo pela página de preços engana nos dois sentidos: confundir preço de inferência com o de treino superestima dezenas de vezes; esquecer o fator épocas subestima cerca de mil vezes.",
    "<b>Fine-tuning não desaparece:</b> modelos genéricos melhoram, e empresas continuam com dado proprietário, vocabulário e processos próprios. Mas a decisão precisa ser medida. O material complementar reúne casos reais (atendimento, saúde, jurídico, finanças, ferramentas de desenvolvimento, varejo, mídia).",
    "<b>Missão prática final (4 etapas):</b> aplicar o framework a um caso real (reprovar é entrega válida); construir um piloto pequeno se aprovado (curado, deduplicado, balanceado, com origem conhecida; com dado sintético só com cuidado para o modelo não decorar o padrão do gerador); avaliar em três frentes (o estresse escrito à mão, não variação automática do template); e documentar cada decisão no formato escolha, alternativa, por quê, resultado.",
    "<b>O campo continua mudando:</b> world models, sistemas agênticos, protocolos de integração, mais autonomia e novos riscos; mais autonomia exige auditoria, sandboxing, permissões, monitoramento, rastreabilidade e segurança, tema da disciplina seguinte (Segurança e Governança em IA). Disponibilidade de provedores e validade de modelos também mudam.",
    "<b>Dois fios do curso:</b> a ferramenta certa, não a mais sofisticada (AHP porque separava melhor, MinHash porque escalava, API gerenciada por ser proporcional ao piloto, LoRA pelo resultado com menos parâmetros, palavras-chave porque o problema era simples, recusa porque incerteza não vira dado errado) e mensurar antes de confiar (todo resultado incômodo é investigado). Fecho da apostila: escolher com evidência, medir antes de confiar e registrar o que sustentou cada escolha."
   ],
   "como": [
    "<b>Reavaliar sem mudar o protocolo:</b> se o protocolo muda junto com o modelo, perde-se a comparação; o verificador reexecuta os mesmos três conjuntos contra os dois endpoints.",
    "<b>Documentar o dataset de produção:</b> a montagem dos 3.000 exemplos tem documentação própria; resultado de modelo sem rastreabilidade de dados é incompleto.",
    "<b>Guias complementares:</b> um guia de reavaliação pós-escala (congelar o número do dia do gate com o método de medição, e remedir depois do deploy, citando o estudo de Chen, Zaharia e Zou sobre drift do GPT-4 entre março e junho de 2023) e um guia de geração sintética via LLM (escrever o texto em torno do valor, pedir diversidade, incluir distratores, gerar mais e curar pelo pipeline real, validar uma amostra).",
    "<b>Revisão final (perguntas da apostila):</b> em que situação o framework deve interromper a recomendação; por que um dataset válido exemplo a exemplo pode ser inadequado como conjunto; como pedido versus aplicado reduz risco; por que hash e Model Card importam para a linhagem; como rank e scale alteram a decisão de LoRA; quando o ganho do Full justifica memória e armazenamento."
   ],
   "aplica": [
    "Fechar um projeto de IA com um documento de decisões auditável.",
    "Reavaliar um modelo depois de escalar o dataset com o mesmo protocolo, antes de declarar melhora.",
    "Gerar dado sintético com rótulo garantido (valor conhecido, texto escrito em torno dele).",
    "Monitorar um modelo em produção contra o número registrado no dia do gate."
   ],
   "pros": [
    "Faz o raciocínio sobreviver a quem decidiu.",
    "Registrar resultado incômodo (a regressão) aumenta a credibilidade.",
    "Custos reais conferidos no billing tornam o NPV honesto."
   ],
   "contras": [
    "O dataset de produção é gerado por um gerador determinístico: a «diversidade» é a de templates e personas projetados pelo autor.",
    "Seis exemplos por round de estresse são pouco para tirar conclusões sobre o escalado.",
    "O documento de decisões mistura decisões tomadas antes e racionalizações feitas depois, algumas admitidas (rank 8 e posto 4 por default)."
   ],
   "traps": [
    "Assumir que mais dado melhora um piloto que já funcionava.",
    "Estimar custo de treino pela página de preços sem fator de épocas.",
    "Esconder alternativas rejeitadas e só registrar a escolha final.",
    "Apresentar uma conclusão sem delimitar o que ela não prova."
   ],
   "cola": [
    [
     "ADR",
     "Architecture Decision Record: escolha, alternativa rejeitada, por quê e resultado"
    ],
    [
     "Escopo da evidência",
     "Onde a conclusão vale e onde não foi testada"
    ],
    [
     "Regressão",
     "O modelo escalado piorou num caso que o piloto acertava"
    ],
    [
     "Dataset de produção",
     "3.000 exemplos (1.800 Auto e 1.200 Saúde) gerados pelo pipeline"
    ],
    [
     "Drift",
     "Comportamento do modelo que muda sem mudar a pergunta"
    ],
    [
     "Sandboxing",
     "Isolamento do agente, assunto da disciplina de segurança"
    ]
   ],
   "links": [
    [
     "Repositório oficial, módulo 06 (Projeto Final)",
     "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-06-projeto-final"
    ],
    [
     "Chen, Zaharia e Zou: How Is ChatGPT's Behavior Changing over Time? (citado no guia)",
     "https://arxiv.org/abs/2307.09009"
    ],
    [
     "Hugging Face: Anatomy of a Frontier Lab Agent Intrusion (indicação, relatório 22)",
     "https://huggingface.co/blog"
    ]
   ],
   "codigo": [
    {
     "proj": "modulo-06-projeto-final (escala, verificação e documentos)",
     "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-06-projeto-final",
     "resumo": "O gerador do dataset de produção, o verificador do modelo escalado, o documento de decisões, os guias complementares e o pôster do estado da fronteira.",
     "fluxo": [
      "<code>m6-dataset-scaling-tool.js</code> (e <code>.py</code>): gerador com 53 prenomes, personas <code>blocoFormal</code>, <code>textoCorrido</code> e <code>exportacaoAbreviada</code>, <code>distratorAuto/Saude</code> e <code>aplicarRuidoOcr</code>; reaproveita <code>limparEBalancear</code> do módulo 2: 4.107 brutos, 4.099 depois da deduplicação (8 duplicatas), 3.000 balanceados (1.800 e 1.200). 6 testes.",
      "<code>amplitude-seguros-dataset-producao-3000.jsonl</code> (1,8 MB, 3.000 linhas no esquema canônico) e <code>dataset-de-producao-leia-me.md</code>.",
      "<code>m6-scaled-model-verification-tool.js</code> (e <code>.py</code>): avalia o endpoint antigo (<code>ENDPOINT_MODULO32</code>) e o novo (<code>ENDPOINT_MODULO63</code>) contra o retido, o Round 1 e o Round 2 reproduzidos literalmente.",
      "<code>decisoes-de-arquitetura.md</code> (oito decisões, adendo da escala, custo real, o que prova e o que não prova), <code>guia-reavaliacao-pos-escala.md</code>, <code>guia-geracao-sintetica-via-llm.md</code> e <code>estado-da-fronteira-poster.html</code> (Genie 3, crescimento do MCP, o incidente de sandbox de um agente da OpenAI na Hugging Face, a resposta regulatória, e uma seção declarada como extrapolação)."
     ],
     "rodar": [
      "<code>node m6-dataset-scaling-tool.js</code> (offline): imprime o pipeline 4.107, 4.099 e 3.000, as contagens por fonte e o número efetivo de fontes (Auto 7,438 para 8,366; Saúde 6,084 para 6,946).",
      "<code>ENDPOINT_MODULO32=... ENDPOINT_MODULO63=... node m6-scaled-model-verification-tool.js</code> exige dois endpoints seus e chamadas pagas."
     ],
     "armadilhas": [
      "O <code>leia-me</code> diz que rodar <code>node m6-dataset-scaling-tool.js</code> «reproduz este dataset do zero», mas nem a versão JS nem a Python gravam arquivo: só imprimem o pipeline e uma amostra (a primeira amostra bate com a primeira linha do JSONL, o que indica determinismo).",
      "O README raiz e o documento falam em «3.000 exemplos reais»; são gerados por um pipeline determinístico com personas, distratores e ruído, como o próprio leia-me descreve.",
      "O verificador reproduz os conjuntos do Round 1 e 2 «literalmente» porque o arquivo do 5.3 não os exporta: duas cópias que podem divergir, o contrário da decisão transversal de reuso.",
      "O documento de decisões fala em R$ 43,78 para os dois jobs principais; a Atividade 3 em PDF cita R$ 60,62 somando fine-tuning e inferência do projeto inteiro: são recortes diferentes.",
      "Os IDs de job no texto (<code>tuningJobs/4180970763655839744</code> e <code>8278721957516541952</code>) são do autor; seus endpoints vêm de variáveis de ambiente.",
      "As Atividades e Exemplos em PDF de cada módulo (Missões Práticas 1 a 6) estão nas pastas dos módulos."
     ]
    }
   ]
  }
 ]
});
