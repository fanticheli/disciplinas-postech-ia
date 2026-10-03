PRACTICE.push({
 "disc": "07",
 "intro": "Em gestão de projetos, a IA entra como copiloto numa cadeia: transcrição vira backlog, backlog vira prioridade, plano e probabilidade de prazo. O que se aplica na prática são prompts versionados, contas pequenas em script e curadoria humana em cada passo.",
 "items": [
  {
   "id": "P7-01",
   "title": "Mapa da cadeia e inventário de ferramentas de IA",
   "topics": [
    "D7-00",
    "D7-15"
   ],
   "cenario": "Um PMO adota IA em pedaços: um prompt de ata aqui, um gerador de relatório ali. Cada ferramenta funciona sozinha, mas a saída de uma não alimenta a seguinte e ninguém sabe onde o julgamento humano é obrigatório.",
   "passos": [
    "Liste as etapas do seu ciclo (discovery, backlog, priorização, cronograma, estimativa, monitoramento, reuniões, status, governança, integrações, OKRs).",
    "Para cada etapa, escreva o artefato de entrada, o de saída e quem valida (curadoria humana).",
    "Garanta que a saída de uma etapa seja exatamente a entrada da próxima (backlog estruturado alimenta priorização, e assim por diante).",
    "Marque onde a IA só propõe e o humano decide: prioridade, risco, estratégia.",
    "Anote qual etapa gera mais resistência no time: costuma ser a maior oportunidade.",
    "Revise o inventário a cada ciclo e registre onde o dado estava ausente."
   ],
   "code": {
    "lang": "text",
    "src": "ETAPA            ENTRADA              SAIDA                    VALIDA\nDiscovery        transcricao          User Stories + Gherkin   analista\nPriorizacao      backlog              ranking + flags          PO\nCronograma       ranking + capacidade V1/V2/V3 do plano        tech lead\nEstimativa       plano + O/M/P        P50/P85/P95              gerente\nMonitoramento    metricas de fluxo    cockpit verde/amarelo    gerente\nReunioes         transcricao          ata + cards              dono da reuniao\nStatus           dados da sprint      3 relatorios             gerente\nGovernanca       evento + contexto    checklist + regras PR    time + juridico\nOKRs             backlog + KRs        alinhamento + scorecard  lideranca"
   },
   "resultado": "A IA passa a ser uma cadeia auditável em vez de dez ferramentas soltas, e cada ponto de decisão humana fica explícito.",
   "quandoNao": [
    "Projeto pequeno, de poucas semanas, em que três ou quatro etapas já resolvem.",
    "Processo ainda sem estrutura básica: a IA só acelera a bagunça.",
    "Time sem capacidade de fazer curadoria das saídas."
   ],
   "armadilha": "Aplicar a cadeia a um processo desorganizado e esperar que a IA o organize.",
   "repo": {
    "label": "Repositório do módulo 07",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/"
   }
  },
  {
   "id": "P7-02",
   "title": "Requirements Copilot: system prompt como contrato",
   "topics": [
    "D7-01"
   ],
   "cenario": "Uma reunião de discovery de 35 minutos termina com consenso aparente. Dias depois, cada participante descreve uma solução diferente e o backlog nasce com papéis genéricos e critérios como «deve ser rápido».",
   "passos": [
    "Cole o system prompt (versionado no git, com changelog) no campo de instruções do modelo; o bloco «contexto do projeto» muda por projeto.",
    "Passe a transcrição bruta e peça primeiro o mapa de domínios com confiança alta, média ou baixa.",
    "Exija User Story com papel específico, validação INVEST e Gherkin com pelo menos dois cenários.",
    "Mande listar dependências não declaradas e perguntas em aberto, em vez de deixar o modelo decidir.",
    "Use o modo rápido (só histórias, perguntas e cards) para validar dentro da reunião.",
    "Para cada história, localize o trecho da transcrição que a originou; sem origem, é candidata a alucinação."
   ],
   "code": {
    "lang": "text",
    "src": "Voce e um Requirements Copilot. Voce nao transcreve: analisa.\n\nCONTEXTO DO PROJETO\ndominio: logistica | perfis: gestor de frota, motorista, operador de despacho\nlegado: sistema de 2016 | restricoes: LGPD | prazo: 12 semanas\n\nREGRAS\n1. User Story: \"Como [papel especifico], quero [acao], para que [resultado mensuravel]\".\n   Papel nunca e \"usuario\". Faltou campo -> [INCOMPLETA].\n2. INVEST em toda historia. Falha -> [INVEST-FAIL: letra]. Nao segue para a sprint.\n3. Gherkin: minimo 2 cenarios (happy path e edge case).\n   O \"Entao\" nao pode usar \"corretamente\", \"adequadamente\", \"rapido\".\n   Nao automatizavel -> [MANUAL-ONLY].\n4. Termo vago (\"tempo real\", \"rapido\"): marque [AMBIGUIDADE] e\n   [A CONFIRMAR COM STAKEHOLDER] e abra pergunta. Nunca assuma um numero.\n5. Preserve o papel como o stakeholder falou.\n6. Ao final liste integracoes e decisoes de arquitetura que as historias\n   exigem e que ninguem citou.\n\nSAIDA: 1 mapa de dominios | 2 historias | 3 perguntas em aberto | 4 cards Jira"
   },
   "resultado": "Requisitos saem rastreáveis, testáveis e com as dúvidas explícitas; as perguntas abertas viram a pauta da próxima entrevista.",
   "quandoNao": [
    "Quando o stakeholder ainda não disse nada concreto: um mapa de cobertura basta.",
    "Transcrição de áudio ruim, sem revisão: o erro de transcrição vira requisito.",
    "Decisão que exige julgamento de arquitetura ou de negócio, que continua humana."
   ],
   "armadilha": "Confiar na formatação: a história pode ter papel, INVEST e Gherkin impecáveis e descrever algo que ninguém pediu.",
   "repo": {
    "label": "modulo-01-planejamento-e-escopo",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-01-planejamento-e-escopo"
   }
  },
  {
   "id": "P7-03",
   "title": "Curadoria de alucinações com log e gate de backlog",
   "topics": [
    "D7-02"
   ],
   "cenario": "O copiloto transformou «rápido» em «latência máxima de 200 ms» e sugeriu exportar para o RH, que não tem API. Sem revisão, isso entra no backlog como compromisso formal.",
   "passos": [
    "Releia cada critério de aceite e pergunte «de qual fala vem isto?»; sem origem, marque como especificação inventada.",
    "Cheque dependências propostas contra a realidade (existe API, formato, SLA, segurança?).",
    "Mande viabilidade técnica para o arquiteto e escopo para negócio com liderança técnica.",
    "Se a correção muda o que foi prometido ao stakeholder, valide com ele antes do backlog.",
    "Registre cada correção no log de curadoria (produzido, corrigido, motivo, categoria).",
    "A cada duas ou três sprints, leia o log e ajuste o prompt (muita especificação inventada pede protocolo de ambiguidade mais firme)."
   ],
   "code": {
    "lang": "text",
    "src": "LOG DE CURADORIA\nid  historia  categoria              produzido                  corrigido                       quem corrige\n01  US-03     especificacao inventada \"latencia maxima 200 ms\"   \"tempo real\" (a confirmar)      analista\n02  US-07     dependencia nao mapeada \"exportar para o RH\"       RH sem API; SLA de 6 semanas    infra\n03  US-05     gold plating            dashboard multinivel       alerta simples                  PO\n\nGATE ANTES DA SPRINT\n[ ] viavel na arquitetura e no orcamento reais?\n[ ] expoe dado pessoal (LGPD, localizacao, comportamento)?\n[ ] dependencias externas identificadas antes do planning?\n[ ] cada linha de aceite tem origem na transcricao?"
   },
   "resultado": "Alucinações são interceptadas antes do planejamento, e o log vira melhoria contínua do prompt em vez de retrabalho repetido.",
   "quandoNao": [
    "Brainstorming inicial, em que tudo ainda é rascunho.",
    "Backlog minúsculo revisado integralmente por quem esteve na reunião.",
    "Correção puramente de formato: basta registrar e seguir."
   ],
   "armadilha": "Pular a curadoria porque o documento «parece completo».",
   "repo": {
    "label": "modulo-01-planejamento-e-escopo",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-01-planejamento-e-escopo"
   }
  },
  {
   "id": "P7-04",
   "title": "Funil MoSCoW, RICE e WSJF",
   "topics": [
    "D7-03"
   ],
   "cenario": "O diretor pede um relatório de cores da frota e quem fala mais alto ganha a prioridade (HiPPO). O time gasta a sessão de planejamento discutindo opinião e a feature de maior retorno espera.",
   "passos": [
    "Filtre por MoSCoW e tire os Won't Have antes de qualquer cálculo.",
    "Calcule RICE nos candidatos: Reach só de quem é de fato afetado, Impact na escala fixa 3/2/1/0,5/0,25, Confidence pela evidência e Effort em pessoa-mês.",
    "Calcule WSJF nos mesmos itens: (valor + criticidade temporal + redução de risco) ÷ job size.",
    "Compare as posições nos dois rankings, não os valores (252 no RICE e 20 no WSJF para o mesmo item).",
    "Discuta as divergências: RICE responde onde o esforço rende, WSJF o que não pode esperar.",
    "O gestor decide; reavalie quando chegarem dados novos. Os números de US-02 aqui (Reach, Confidence, Effort) são ilustrativos."
   ],
   "code": {
    "lang": "js",
    "src": "const backlog = [\n  { id: \"US-01\", moscow: \"must\", reach: 140, impact: 2, confidence: 0.9, effort: 1,\n    value: 8, timeCriticality: 9, riskReduction: 3, jobSize: 1 },\n  { id: \"US-02\", moscow: \"should\", reach: 140, impact: 2, confidence: 0.5, effort: 3,\n    value: 6, timeCriticality: 7, riskReduction: 5, jobSize: 3 },\n  { id: \"US-05\", moscow: \"wont\", reach: 5, impact: 0.25, confidence: 0.8, effort: 0.75,\n    value: 1, timeCriticality: 1, riskReduction: 1, jobSize: 1 },\n];\n\nconst rice = (i) => (i.reach * i.impact * i.confidence) / i.effort;\nconst wsjf = (i) => (i.value + i.timeCriticality + i.riskReduction) / i.jobSize;\n\nconst rankBy = (items, score) =>\n  [...items].sort((a, b) => score(b) - score(a)).map((i) => i.id);\n\nconst candidates = backlog.filter((i) => i.moscow !== \"wont\");\nconst riceRank = rankBy(candidates, rice);\nconst wsjfRank = rankBy(candidates, wsjf);\n\nconsole.table(\n  candidates.map((i) => ({\n    id: i.id,\n    rice: Number(rice(i).toFixed(1)),\n    wsjf: Number(wsjf(i).toFixed(1)),\n    riceRank: riceRank.indexOf(i.id) + 1,\n    wsjfRank: wsjfRank.indexOf(i.id) + 1,\n  }))\n);"
   },
   "resultado": "A conversa passa a ser sobre números e premissas rastreáveis; no caso do curso, alertas (RICE 252, WSJF 20) vencem manutenção preditiva (WSJF 6).",
   "quandoNao": [
    "Backlog de poucos itens com ordem óbvia.",
    "Itens sem nenhuma evidência de Reach ou Impact: coletar dado antes.",
    "Item obrigatório por lei ou contrato: é restrição, não competição."
   ],
   "armadilha": "Usar o Reach como base total de usuários em vez de quem é de fato afetado, o que contamina o RICE inteiro.",
   "repo": {
    "label": "modulo-02-priorizacao-de-backlog",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-02-priorizacao-de-backlog"
   }
  },
  {
   "id": "P7-05",
   "title": "Backlog Scorer: contexto, flags e calibração",
   "topics": [
    "D7-04"
   ],
   "cenario": "O primeiro ranking do modelo usa Reach como «140 veículos» e Confidence de 100%. O time aceita o número sem perguntar de onde veio e só descobre na sprint que três itens dependem de um sensor com 60 dias de lead time.",
   "passos": [
    "Monte o prompt com histórias, OKR com baseline e meta, restrições operacionais e framework (temperatura 0,2 a 0,3).",
    "Rode a rodada 1 sem calibração e guarde o resultado.",
    "Pré-processe 3 ou 4 métricas por feature (acessos mensais, usuários únicos, conclusão) de analytics, pesquisa e financeiro; sem dado interno, use benchmark por analogia com a origem registrada.",
    "Rode a rodada 2 e compare o que mudou e por quê (no curso, o RICE de alertas foi de 420 para 3.091 com Reach de 1.288 acessos/mês e Confidence de 80%).",
    "Transforme cada flag em um card curto (spike, confirmação de SLA, compra antecipada) com a pergunta «o bloqueador foi resolvido?».",
    "Marque na tabela quais números são medição e quais são analogia."
   ],
   "code": {
    "lang": "text",
    "src": "RODADA 2 (com calibracao)\nitem  Reach              Impact Conf  Effort RICE\nUS01  1288 (analogia)    3      80%   1      3091.2   <- 1288 x 3 x 0.8 / 1\nUS02  238 (proxy)        2      80%   ...    126.9\n\nFLAGS\n[HARDWARE]  sensor com lead time de 60 dias -> comprar ja, alocar depois\n[ACURACIA]  meta de 80% sem dados historicos -> coletar dados primeiro\n[OKR]       dashboard sem evidencia de contribuicao -> nova sessao de discovery\n\nORIGEM DOS NUMEROS\nReach US01: analogia (transportadora similar, ajustado para 140 veiculos)\nReach US02: proxy (relatorio de combustivel)"
   },
   "resultado": "O ranking passa a carregar a origem de cada número e uma lista de bloqueadores que normalmente só apareceria no meio da sprint.",
   "quandoNao": [
    "Produto maduro com dados abundantes e processo de priorização já calibrado.",
    "Backlog muito pequeno.",
    "Quando não há nem analogia razoável: mantenha Confidence baixa e colete dado antes."
   ],
   "armadilha": "Descartar flags em vez de trabalhá-los: um flag ignorado é um blocker disfarçado de feature.",
   "repo": {
    "label": "modulo-02-priorizacao-de-backlog",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-02-priorizacao-de-backlog"
   }
  },
  {
   "id": "P7-06",
   "title": "Cronograma adaptativo: capacidade real e what-if",
   "topics": [
    "D7-05"
   ],
   "cenario": "O plano usa 100% da capacidade nominal e ignora feriados, cerimônias e a compra de hardware que não está no backlog. Na segunda sprint, o time já está atrasado e entrega com atalhos.",
   "passos": [
    "Informe ao modelo backlog priorizado, time, duração da sprint, capacidade nominal, fator de capacidade real e restrições (marcos, feriados).",
    "Aplique o fator de 65% sobre a capacidade nominal; desconte feriados da sprint correspondente.",
    "Peça dependências candidatas (técnicas, de recurso, externas) e valide-as com o time; adicione as de ambiente (CI, staging, acessos) como tasks.",
    "Peça itens habilitadores (por exemplo iniciar a compra do hardware) para sprints iniciais.",
    "A cada restrição nova (férias, atraso do fornecedor), rode o what-if e versione V1, V2, V3 com a causa.",
    "Leve a alocação sugerida ao Planning Poker: é ponto de partida, não compromisso. O script abaixo assume 10 dias úteis por sprint."
   ],
   "code": {
    "lang": "js",
    "src": "const nominalPoints = 35;\nconst effectiveFactor = 0.65;\nconst sprintWorkingDays = 10;\n\nfunction sprintCapacity({ holidays = 0 } = {}) {\n  const base = nominalPoints * effectiveFactor;\n  return base * ((sprintWorkingDays - holidays) / sprintWorkingDays);\n}\n\nfunction fitsSprint(committedPoints, options) {\n  const capacity = sprintCapacity(options);\n  return { capacity: Number(capacity.toFixed(1)), committedPoints, fits: committedPoints <= capacity };\n}\n\nconsole.log(fitsSprint(22));\nconsole.log(fitsSprint(22, { holidays: 2 }));\nconsole.log(fitsSprint(35));"
   },
   "resultado": "A sprint é comprometida com ~22,8 SP (e ~18,2 com dois feriados) em vez de 35, e mudanças de restrição são replanejadas em minutos com trade-offs explícitos.",
   "quandoNao": [
    "Projeto de poucas semanas com um único dev.",
    "Fluxo contínuo (Kanban) sem sprints.",
    "Time sem histórico para justificar o fator de 65%: use como hipótese e ajuste."
   ],
   "armadilha": "Planejar a sprint com 100% da capacidade, sem margem para defeitos, incidentes e reuniões.",
   "repo": {
    "label": "modulo-03-cronograma-e-capacidade",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-03-cronograma-e-capacidade"
   }
  },
  {
   "id": "P7-07",
   "title": "Estimativa de três pontos e PERT",
   "topics": [
    "D7-06"
   ],
   "cenario": "O time responde «3 semanas» para cada história. A soma dá um prazo único que ninguém sabe qual probabilidade tem, e o pessimista nunca é dito em voz alta por medo de parecer lento.",
   "passos": [
    "Levante O, M e P por história individualmente, antes da discussão, para evitar ancoragem social.",
    "Pergunte «que evento técnico específico poderia dobrar o esforço?» para definir o P.",
    "Calcule PERT = (O + 4M + P) ÷ 6 e desvio = (P − O) ÷ 6.",
    "Questione histórias com P menor que 1,5×M e marque alta incerteza quando o desvio passar de 30% do PERT.",
    "Some os PERT; o desvio agregado é a raiz da soma das variâncias (assume independência, o que não vale entre US-01 e US-03).",
    "Planeje spike nas três histórias de maior variância."
   ],
   "code": {
    "lang": "js",
    "src": "const stories = [\n  { id: \"US-01\", o: 2, m: 3, p: 5 },\n  { id: \"US-03\", o: 3, m: 4, p: 6 },\n  { id: \"US-04\", o: 1, m: 2, p: 3 },\n  { id: \"US-09\", o: 2, m: 3, p: 5 },\n];\n\nfunction pert({ id, o, m, p }) {\n  const expected = (o + 4 * m + p) / 6;\n  const sigma = (p - o) / 6;\n  return {\n    id,\n    expected,\n    sigma,\n    underestimatedPessimistic: p < 1.5 * m,\n    highUncertainty: sigma > 0.3 * expected,\n  };\n}\n\nconst rows = stories.map(pert);\nconst total = rows.reduce((sum, r) => sum + r.expected, 0);\nconst totalSigma = Math.sqrt(rows.reduce((sum, r) => sum + r.sigma ** 2, 0));\n\nconsole.table(rows.map((r) => ({ ...r, expected: r.expected.toFixed(2), sigma: r.sigma.toFixed(2) })));\nconsole.log(`sum ${total.toFixed(2)} weeks, sigma ${totalSigma.toFixed(2)}`);"
   },
   "resultado": "Cada história ganha valor esperado e incerteza (US-01: 3,17 ± 0,5 semana; soma 12,50 e desvio 0,93), e o debate sobe do «qual é a data?» para «que confiança queremos?».",
   "quandoNao": [
    "Trabalho repetitivo com histórico estável: use o throughput real.",
    "Histórias minúsculas, em que a incerteza é irrelevante.",
    "Como previsão de prazo do projeto: PERT é por história, o prazo vem de Monte Carlo."
   ],
   "armadilha": "Reduzir artificialmente o pessimista para não parecer lento.",
   "repo": {
    "label": "modulo-04-estimativas-e-previsoes",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-04-estimativas-e-previsoes"
   }
  },
  {
   "id": "P7-08",
   "title": "Monte Carlo em JavaScript: P50, P85 e P95",
   "topics": [
    "D7-07"
   ],
   "cenario": "O cronograma promete 12 semanas. O cliente quer uma data única, e ninguém sabe que o fornecedor de hardware, com entrega na semana 9, domina o prazo e torna 12 semanas improvável.",
   "passos": [
    "Modele duas trilhas: software (US-01 e US-03 em sequência com pouco overlap) e hardware (começa na semana 9).",
    "Sorteie cada história na distribuição triangular a partir de O, M e P (a do script, não a beta do PERT).",
    "Em cada simulação, o prazo é o máximo entre as trilhas; rode 10 mil vezes e ordene.",
    "Leia os percentis: P50 para análise interna, P85 para comprometer com cliente, P95 para projeto crítico.",
    "Rode um what-if mudando só a semana do hardware (9 contra 13) e compare.",
    "Os fatores 1,3 e 1,5 de paralelismo são os do script do curso e estão fixos no código (o prompt usa 1,7)."
   ],
   "code": {
    "lang": "js",
    "src": "const stories = {\n  us01: { o: 2, m: 3, p: 5 },\n  us03: { o: 3, m: 4, p: 6 },\n  us04: { o: 1, m: 2, p: 3 },\n  us09: { o: 2, m: 3, p: 5 },\n};\n\nconst SIMULATIONS = 10_000;\n\nfunction triangular({ o, m, p }) {\n  const u = Math.random();\n  const cut = (m - o) / (p - o);\n  if (u < cut) return o + Math.sqrt(u * (p - o) * (m - o));\n  return p - Math.sqrt((1 - u) * (p - o) * (p - m));\n}\n\nfunction simulate(hardwareWeek) {\n  const totals = [];\n  for (let i = 0; i < SIMULATIONS; i += 1) {\n    const software = (triangular(stories.us01) + triangular(stories.us03)) / 1.3;\n    const hardware = hardwareWeek + (triangular(stories.us04) + triangular(stories.us09)) / 1.5;\n    totals.push(Math.max(software, hardware));\n  }\n  return totals.sort((a, b) => a - b);\n}\n\nconst percentile = (sorted, pct) => sorted[Math.floor((pct * sorted.length) / 100)];\n\nfor (const hardwareWeek of [9, 13]) {\n  const totals = simulate(hardwareWeek);\n  const summary = [50, 85, 95].map((pct) => `P${pct} ${percentile(totals, pct).toFixed(1)}`);\n  console.log(`hardware week ${hardwareWeek}: ${summary.join(\" | \")}`);\n}"
   },
   "resultado": "Com hardware na semana 9: P50 12,5, P85 13,1 e P95 13,4 semanas; o time passa a comprometer 13 semanas em vez de 12 e fica claro que o hardware governa o prazo.",
   "quandoNao": [
    "Sem O, M e P minimamente calibrados: a simulação só embeleza hipóteses.",
    "Projeto curto e simples, em que a data única já é segura.",
    "Riscos determinísticos (aprovação, orçamento): trate fora da simulação."
   ],
   "armadilha": "Pedir ao LLM para «simular 1000 cenários»: o número sai plausível, mas não há distribuição real.",
   "repo": {
    "label": "modulo-04-estimativas-e-previsoes",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-04-estimativas-e-previsoes"
   }
  },
  {
   "id": "P7-09",
   "title": "Probabilidade de cumprir uma data (Monte Carlo em Python)",
   "topics": [
    "D7-07",
    "D7-06"
   ],
   "cenario": "O stakeholder insiste: «dá para entregar em 12 semanas?». Responder sim ou não sem probabilidade transforma uma escolha de risco em promessa.",
   "passos": [
    "Reaproveite a simulação em Python do curso (mesma triangular e as duas trilhas).",
    "Em vez de só percentis, calcule a fração de simulações que terminam até cada data candidata.",
    "Apresente a tabela de datas e probabilidades e pergunte qual risco de atraso ele aceita.",
    "Ofereça duas saídas honestas: cortar escopo ou renegociar a data.",
    "Se a data do hardware mudar, rode de novo com outro valor de hardware_week.",
    "Sem semente fixa, os valores variam alguns pontos entre rodadas."
   ],
   "code": {
    "lang": "python",
    "src": "import random\nimport math\n\nSTORIES = {\n    \"us01\": (2, 3, 5),\n    \"us03\": (3, 4, 6),\n    \"us04\": (1, 2, 3),\n    \"us09\": (2, 3, 5),\n}\nSIMULATIONS = 100_000\n\n\ndef triangular(o, m, p):\n    u = random.random()\n    cut = (m - o) / (p - o)\n    if u < cut:\n        return o + math.sqrt(u * (p - o) * (m - o))\n    return p - math.sqrt((1 - u) * (p - o) * (p - m))\n\n\ndef simulate(hardware_week):\n    totals = []\n    for _ in range(SIMULATIONS):\n        software = sum(triangular(*STORIES[k]) for k in (\"us01\", \"us03\")) / 1.3\n        hardware = hardware_week + sum(triangular(*STORIES[k]) for k in (\"us04\", \"us09\")) / 1.5\n        totals.append(max(software, hardware))\n    return totals\n\n\ndef probability_within(totals, weeks):\n    return sum(1 for t in totals if t <= weeks) / len(totals)\n\n\ntotals = simulate(hardware_week=9)\nfor weeks in (12, 13, 14):\n    print(f\"P(done within {weeks} weeks) = {probability_within(totals, weeks):.0%}\")"
   },
   "resultado": "12 semanas ficam em torno de 13-14% de chance (varia entre rodadas), 13 semanas em cerca de 81% e 14 semanas perto de 100%, o que dá ao stakeholder uma decisão informada.",
   "quandoNao": [
    "Quando a data é imposta por lei e não negociável: a questão é o escopo.",
    "Dados de O, M e P sem qualquer calibração.",
    "Projeto com poucas histórias e prazo folgado."
   ],
   "armadilha": "Concluir que o projeto é «previsível» só porque P50 e P95 estão próximos: é uma restrição dominante.",
   "repo": {
    "label": "modulo-04-estimativas-e-previsoes",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-04-estimativas-e-previsoes"
   }
  },
  {
   "id": "P7-10",
   "title": "Risk Monitor: métricas de fluxo e cockpit de riscos",
   "topics": [
    "D7-08"
   ],
   "cenario": "A reunião de status diz que está tudo bem, mas o lead time subiu de 6 para 11 dias e o saldo de bugs cresce a cada sprint. O atraso só aparece na Sprint Review.",
   "passos": [
    "Exporte do Jira, por sprint, lead time, cycle time, bugs abertos e resolvidos, itens parados e velocidade.",
    "Defina limiares a partir do histórico da própria equipe, não de benchmark.",
    "Compare lead e cycle time: lead subindo com cycle estável indica fila (WIP, dependência); os dois subindo indica desenvolvimento.",
    "Calcule o saldo acumulado de bugs para ver a dívida silenciosa.",
    "Gere um cockpit verde/amarelo/vermelho por componente e separe sintoma de causa.",
    "Dê dono, prazo e critério de sucesso a cada item vermelho (por exemplo Stop Starting, Start Finishing e Definition of Ready para itens dependentes de hardware)."
   ],
   "code": {
    "lang": "js",
    "src": "const sprints = [\n  { name: \"Sprint 1\", leadTime: 6.2, cycleTime: 4.8, bugsOpened: 3, bugsResolved: 3 },\n  { name: \"Sprint 2\", leadTime: 7.1, cycleTime: 5.0, bugsOpened: 5, bugsResolved: 4 },\n  { name: \"Sprint 3\", leadTime: 9.4, cycleTime: 5.1, bugsOpened: 8, bugsResolved: 5 },\n  { name: \"Sprint 4\", leadTime: 10.8, cycleTime: 5.3, bugsOpened: 11, bugsResolved: 6 },\n];\n\nconst growth = (current, base) => (current - base) / base;\nconst percent = (ratio) => `${(ratio * 100).toFixed(0)}%`;\n\nfunction diagnose(history) {\n  const first = history[0];\n  const last = history[history.length - 1];\n  const leadGrowth = growth(last.leadTime, first.leadTime);\n  const cycleGrowth = growth(last.cycleTime, first.cycleTime);\n  const bugBacklog = history.reduce((sum, s) => sum + s.bugsOpened - s.bugsResolved, 0);\n  const signals = [];\n\n  if (leadGrowth > 0.3 && cycleGrowth < 0.15) {\n    signals.push(\"queueing, not implementation: check WIP and external dependencies\");\n  }\n  if (leadGrowth > 0.3 && cycleGrowth >= 0.15) signals.push(\"bottleneck is in development\");\n  if (bugBacklog > 5) signals.push(`silent debt: ${bugBacklog} unresolved bugs`);\n\n  return { leadGrowth: percent(leadGrowth), cycleGrowth: percent(cycleGrowth), bugBacklog, signals };\n}\n\nconsole.log(diagnose(sprints));"
   },
   "resultado": "O monitor identifica o gargalo de fila (lead time +74%, cycle +10%) e 9 bugs acumulados, reduzindo o tempo de detecção de cerca de 2 semanas para dias.",
   "quandoNao": [
    "Time com menos de 3 sprints de histórico.",
    "Projeto curto demais para formar tendência.",
    "Sem dono para tratar os alertas: gera fadiga."
   ],
   "armadilha": "Confundir lead time com cycle time e atacar o lugar errado do processo.",
   "repo": {
    "label": "modulo-05-riscos-e-aiops",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-05-riscos-e-aiops"
   }
  },
  {
   "id": "P7-11",
   "title": "Meeting Digest: ata, ações e cards a partir da transcrição",
   "topics": [
    "D7-09"
   ],
   "cenario": "A Sprint Review termina e alguém passa quase 20 minutos escrevendo a ata. Decisões implícitas se perdem, responsáveis são atribuídos por proximidade de fala e ninguém cria os cards.",
   "passos": [
    "Revise a transcrição (nomes, sistemas, termos técnicos) antes de passar ao modelo.",
    "Use um prompt específico para o tipo de reunião (review, planning, daily e retrospectiva são diferentes).",
    "Peça a classificação em ações, decisões, riscos e perguntas em aberto; só ações viram card.",
    "Exija JSON com título, responsável, prioridade, prazo e descrição, sem inventar responsável.",
    "Audite: leia a tabela de ações em voz alta, procure responsável ou prazo vazio e confirme decisões críticas com um participante.",
    "Distribua a ata logo após a reunião e importe o JSON via webhook, Zapier ou Make."
   ],
   "code": {
    "lang": "json",
    "src": "{\n  \"actions\": [\n    {\n      \"title\": \"Estimar US-05 (Dashboard Base)\",\n      \"assignee\": \"Marcus\",\n      \"priority\": \"high\",\n      \"dueDate\": null,\n      \"description\": \"Estimar antes do Sprint Planning 3\"\n    }\n  ],\n  \"decisions\": [\n    \"US-05 volta ao backlog com prioridade alta por causa da apresentação para a diretoria\"\n  ],\n  \"risks\": [\n    \"Prazo do fornecedor de hardware desconhecido\"\n  ],\n  \"openQuestions\": [\n    {\n      \"question\": \"O RH tem API?\",\n      \"owner\": null\n    }\n  ],\n  \"followUps\": [\n    {\n      \"note\": \"Acompanhar lead time\",\n      \"createCard\": false\n    }\n  ]\n}"
   },
   "resultado": "A ata e os cards saem em minutos, e a auditoria de cinco passos pega lacunas típicas (prazo nulo, pergunta sem dono).",
   "quandoNao": [
    "Reunião sensível ou com dados que não podem sair da empresa, sem opção de modelo local.",
    "Áudio ruim sem revisão da transcrição.",
    "Conversa de 5 minutos sem decisão."
   ],
   "armadilha": "Criar card para toda ação, inclusive responsabilidades contínuas de acompanhamento.",
   "repo": {
    "label": "modulo-06-reunioes-turbinadas",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-06-reunioes-turbinadas"
   }
  },
  {
   "id": "P7-12",
   "title": "Status report em três audiências",
   "topics": [
    "D7-10"
   ],
   "cenario": "Toda sexta o gerente gasta 40 a 50 minutos reunindo métricas para um único relatório. A diretoria recebe jargão técnico e o time não vê a ação corretiva.",
   "passos": [
    "Mantenha um único template de dados: planejado, entregue, velocidade, lead time, bugs, bloqueios e relatório anterior.",
    "Gere três versões com a mesma base, mudando só a instrução de audiência (temperatura 0,3).",
    "Valide todos os números contra o Jira (22 não vira 23 por arredondamento do modelo).",
    "Leia o executivo como um diretor sem formação técnica; limite as decisões a duas ou três.",
    "Dê a cada risco do relatório gerencial uma ação e um responsável.",
    "Arquive as versões como histórico de decisões."
   ],
   "code": {
    "lang": "text",
    "src": "DADOS: sprint 4 | planejadas 5 | entregues 2 | velocidade 22 SP\n       lead time 10,8 d | bugs 11 abertos / 6 resolvidos | bloqueio de hardware ativo\n\nTECNICO   velocity, lead/cycle time, saldo de bugs, acao: limitar WIP\nGERENCIAL status (verde/amarelo/vermelho), riscos com acao e dono,\n          2 decisoes: aprovar compra do hardware OU tirar o score do MVP\nEXECUTIVO 1 pagina, linguagem de negocio: o que esta pronto, qual o risco,\n          que aprovacao e necessaria"
   },
   "resultado": "O relatório de sexta cai de dezenas de minutos para uma revisão, e cada público recebe a linguagem e a decisão que lhe cabe.",
   "quandoNao": [
    "Equipe pequena com daily diária que já mantém todos alinhados.",
    "Dados do Jira desatualizados: o relatório amplifica o erro.",
    "Quando a mensagem é sensível e exige conversa presencial."
   ],
   "armadilha": "Enviar o relatório técnico para a diretoria sem adaptação.",
   "repo": {
    "label": "modulo-07-status-reports",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-07-status-reports"
   }
  },
  {
   "id": "P7-13",
   "title": "Compliance Checklist dinâmico por evento",
   "topics": [
    "D7-11"
   ],
   "cenario": "Antes do primeiro deploy do módulo de alertas, o time marca um checklist genérico de 40 itens sem ler. Um bug deixa 43 veículos sem alerta e o painel não avisa, gerando falso negativo operacional.",
   "passos": [
    "Descreva o evento (deploy), a funcionalidade, os sistemas, os dados sensíveis (localização, LGPD), os aprovadores e o histórico de incidentes.",
    "Peça saída em três categorias: bloqueadores, verificações operacionais e informativos.",
    "Limite o checklist (máximo de 10 itens, com 3 ou 4 bloqueadores).",
    "Revise o que só o contexto produz, como o bloqueador de sinalizar os 43 veículos sem alerta.",
    "O gerente decide mitigações com custo de interface (por exemplo comunicação oficial em vez de mudar uma release fechada).",
    "Versione o template-base e revise o checklist a cada incidente."
   ],
   "code": {
    "lang": "text",
    "src": "EVENTO: primeiro deploy do modulo de alertas (140 veiculos)\nCONTEXTO: bug S4-10 -> 43 veiculos com rastreador v1 sem alerta; 97 recebem\n          dado sensivel: localizacao de motoristas (LGPD)\n\nBLOQUEADORES\n[ ] painel e app sinalizam os 43 veiculos nao monitorados\n[ ] base legal LGPD documentada\n[ ] aprovacao operacional e tecnica registradas\nVERIFICACOES OPERACIONAIS\n[ ] teste de carga com os 97 veiculos suportados\n[ ] rollback por script e feature flag\nINFORMATIVOS\n[ ] registro de tratamento de dados e notas de release"
   },
   "resultado": "O checklist curto e específico expõe um risco real que a lista genérica esconderia, e o time passa a lê-lo em vez de marcar tudo OK.",
   "quandoNao": [
    "Ferramenta interna de baixo risco, sem dado pessoal.",
    "Quando já existe um processo regulatório formal que a lista duplicaria.",
    "Mudança trivial, como correção de texto."
   ],
   "armadilha": "Checklist com dezenas de itens: o time marca tudo OK sem ler.",
   "repo": {
    "label": "modulo-08-governanca-e-compliance",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-08-governanca-e-compliance"
   }
  },
  {
   "id": "P7-14",
   "title": "Danger.js: regras de conformidade no pipeline",
   "topics": [
    "D7-12",
    "D7-11"
   ],
   "cenario": "A regra «todo PR cita um card do Jira» existe só no wiki. Seis meses depois, ninguém consegue dizer por que uma mudança no módulo de GPS foi feita nem quem a aprovou.",
   "passos": [
    "Escreva as regras em JavaScript no dangerfile.js: card do Jira, aprovadores em caminhos críticos, arquivos sensíveis, PR grande e descrição curta.",
    "Leia os caminhos críticos de configuração, não de substring solta.",
    "Comece com warn nas regras novas e só vire fail quando o time internalizar; as duas primeiras do curso bloqueiam.",
    "No CI, rode npx danger ci --text-only em um job sem permissão de escrita e publique o resultado como artefato (fork recebe token somente leitura).",
    "Em um segundo workflow (workflow_run), baixe o artefato e poste o comentário.",
    "Nunca interpole conteúdo do PR em expressões do workflow. Revise o histórico dos checks todo mês."
   ],
   "code": {
    "lang": "js",
    "src": "const CONFIG = {\n  jiraPrefix: \"ROUTEWISE\",\n  criticalPaths: [\"src/integrations/gps\", \"src/services/notifications\", \"src/api/routes\", \"migrations/\"],\n  sensitiveFiles: [\".env\", \".env.local\", \".env.production\"],\n  criticalApprovers: 2,\n  largePRThreshold: 500,\n};\n\nconst jiraPattern = new RegExp(`${CONFIG.jiraPrefix}-\\\\d+`, \"i\");\nconst { title, body = \"\" } = danger.github.pr;\nconst { created_files, modified_files } = danger.git;\nconst changedFiles = [...created_files, ...modified_files];\n\nif (!jiraPattern.test(title) && !jiraPattern.test(body)) {\n  fail(`PR must reference a Jira card such as ${CONFIG.jiraPrefix}-42.`);\n}\n\nconst critical = changedFiles.filter((f) => CONFIG.criticalPaths.some((p) => f.includes(p)));\nconst approvals = danger.github.reviews.filter((r) => r.state === \"APPROVED\").length;\nif (critical.length > 0 && approvals < CONFIG.criticalApprovers) {\n  fail(`Critical files changed with ${approvals}/${CONFIG.criticalApprovers} approvals: ${critical}`);\n}\n\nconst leaked = changedFiles.filter((f) => CONFIG.sensitiveFiles.some((n) => f.endsWith(n)));\nif (leaked.length > 0) fail(`Sensitive files must not be committed: ${leaked}`);\n\nconst totalChanges = danger.github.pr.additions + danger.github.pr.deletions;\nif (totalChanges > CONFIG.largePRThreshold) warn(`Large PR (${totalChanges} lines): consider splitting.`);\nif (body.trim().length < 30) warn(\"PR description is too short: explain what changes and why.\");"
   },
   "resultado": "Cada PR é verificado na abertura e a trilha card, PR, aprovação fica auditável sem caça manual a documentos.",
   "quandoNao": [
    "Repositório pessoal ou protótipo descartável.",
    "Time que ainda não concorda com as regras: comece por warn.",
    "Regra que falharia em 30% dos PRs: será desligada em uma semana."
   ],
   "armadilha": "Começar com todas as regras como fail em vez de warn.",
   "repo": {
    "label": "modulo-08-governanca-e-compliance",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-08-governanca-e-compliance"
   }
  },
  {
   "id": "P7-15",
   "title": "Bot Slack para Jira: NL to Workflow com confirmação",
   "topics": [
    "D7-13"
   ],
   "cenario": "Alguém relata um bug no Slack. Outra pessoa copia o texto para o Jira, define prioridade, acha o responsável e avisa o gestor: quatro ações em três sistemas, várias vezes por semana.",
   "passos": [
    "Restrinja o bot a um canal de projeto com palavra-chave de gatilho (card:).",
    "Peça ao modelo (SDK da Anthropic) um JSON com tipo, título, prioridade, componente, responsável, prazo, actionRequired e confidence.",
    "No prompt, proíba inventar responsável e exija que decisão de gestão preencha actionRequired.",
    "Mostre um rascunho com botão de confirmação antes de criar o card.",
    "Ao confirmar, crie o card no Jira com a mensagem original e o link da thread.",
    "Registre log estruturado (versão do prompt, resultado) e mantenha o fluxo manual como fallback. O trecho só marca o ponto de criação do card (a chamada ao Jira está omitida), o <code>NL_PARSER_PROMPT</code> vem do ambiente e o modelo é o do repo do curso (troque pelo vigente na sua conta). Rascunho e ids ficam em <code>Map</code> em memória: em produção use armazenamento persistente."
   ],
   "code": {
    "lang": "js",
    "src": "const { App } = require(\"@slack/bolt\");\nconst Anthropic = require(\"@anthropic-ai/sdk\");\n\nconst anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });\nconst app = new App({\n  token: process.env.SLACK_BOT_TOKEN,\n  appToken: process.env.SLACK_APP_TOKEN,\n  socketMode: true,\n});\nconst pending = new Map();\n\nasync function parseMessage(text) {\n  const response = await anthropic.messages.create({\n    model: process.env.CLAUDE_MODEL ?? \"claude-sonnet-4-6\",\n    max_tokens: 1024,\n    messages: [{ role: \"user\", content: `${process.env.NL_PARSER_PROMPT}\\n\\n${text}` }],\n  });\n  const match = response.content[0].text.match(/\\{[\\s\\S]*\\}/);\n  if (!match) throw new Error(\"parser did not return JSON\");\n  return JSON.parse(match[0]);\n}\n\napp.message(\"card:\", async ({ message, say }) => {\n  const parsed = await parseMessage(message.text.replace(\"card:\", \"\").trim());\n  pending.set(message.ts, parsed);\n  const button = { type: \"button\", action_id: \"confirm_card\", value: message.ts,\n    text: { type: \"plain_text\", text: \"Create card\" } };\n  await say({\n    thread_ts: message.ts,\n    text: `${parsed.type}: ${parsed.title} (assignee: ${parsed.assignee ?? \"TBD\"})`,\n    blocks: [{ type: \"actions\", elements: [button] }],\n  });\n});\n\napp.action(\"confirm_card\", async ({ ack, action, say }) => {\n  await ack();\n  const draft = pending.get(action.value);\n  if (!draft) return;\n  pending.delete(action.value);\n  await say(`Creating card: ${draft.title}`);\n});\n\napp.start();"
   },
   "resultado": "O card nasce em segundos com contexto preservado, e a etapa de confirmação impede que um mal-entendido do parser vire tarefa errada.",
   "quandoNao": [
    "Volume de menos de uma dúzia de cards por mês.",
    "Jira como fonte oficial e Slack sem papel de entrada: sincronize só do Jira para o Slack.",
    "Mensagens com dado sensível que não podem ir a um modelo externo."
   ],
   "armadilha": "Criar o card direto da mensagem, sem etapa de confirmação.",
   "repo": {
    "label": "modulo-09-automacao-de-ecossistema",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-09-automacao-de-ecossistema"
   }
  },
  {
   "id": "P7-16",
   "title": "Validar OKRs e alinhar o backlog",
   "topics": [
    "D7-14"
   ],
   "cenario": "A equipe concluiu 47 histórias e o churn não mexeu. Os Key Results eram tarefas («implementar o módulo de alertas»), e nada no backlog era filtrado por objetivo.",
   "passos": [
    "Rode a validação: o Objective é um estado desejado? Cada KR é mensurável, tem baseline, prazo, responsável implícito, independência de output e verificação por terceiros?",
    "Reescreva as falhas (tarefa vira resultado: «reduzir acidentes por excesso de velocidade»).",
    "Rode o alinhamento com todas as histórias, inclusive descartadas, em quatro categorias: direto, indireto, não alinhado, épico futuro.",
    "Calcule o percentual de capacidade em itens não alinhados.",
    "Tome decisão explícita para cada não alinhada: remover, mover para épico futuro ou justificar.",
    "Cruze com o RICE: dois frameworks independentes concordando fortalecem o argumento."
   ],
   "code": {
    "lang": "text",
    "src": "OBJECTIVE: Tornar a operacao de frota mais segura\nKR1: reduzir sinistros por excesso de velocidade de 7 para 5 ate setembro\n     mensuravel OK | baseline OK | prazo OK | dono (OPS) | output? nao | terceiro OK\nKR2: [ruim] \"implementar o modulo de alertas\"  -> e tarefa\n     [bom]  reduzir infracoes de velocidade por 1000 km em 20% ate setembro\n\nALINHAMENTO\nUS-01 alertas de velocidade     direto\nUS-05 dashboard base            indireto (visibilidade)\nUS-11 tema escuro               nao alinhado -> mover para backlog de inovacao\ncapacidade em nao alinhados: 8%"
   },
   "resultado": "OKRs viram resultados verificáveis e o backlog passa a ter um filtro explícito: o que não move um KR precisa de justificativa.",
   "quandoNao": [
    "Time muito pequeno, em que o objetivo é óbvio e compartilhado.",
    "Cultura que usa OKR para punir: as metas encolhem.",
    "Mais de 5 a 7 objetivos: ninguém acompanha."
   ],
   "armadilha": "Escrever tarefa como Key Result.",
   "repo": {
    "label": "modulo-10-portfolio-e-okrs",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-10-portfolio-e-okrs"
   }
  },
  {
   "id": "P7-17",
   "title": "Scorecard de portfólio com rubrica verde, amarelo e vermelho",
   "topics": [
    "D7-14",
    "D7-15"
   ],
   "cenario": "A diretoria acompanha três projetos com relatórios diferentes. Um blocker jurídico sem dono passa despercebido, e o mesmo desenvolvedor de integrações atende os três projetos sem ninguém notar.",
   "passos": [
    "Aplique a mesma rubrica a todos os projetos: verde (todos os KRs com pelo menos 60% do progresso proporcional ao tempo e sem blocker sem dono), amarelo (algum KR entre 40% e 60%, ou blocker com dono) e vermelho (algum KR abaixo de 40% ou blocker sem dono).",
    "Calcule o progresso proporcional: avanço do KR ÷ fração do tempo decorrido.",
    "Gere o scorecard e procure riscos transversais (recurso compartilhado, ponto único de falha).",
    "Dê a cada item vermelho responsável, prazo e ação.",
    "Feche o ciclo registrando entregas, resultados e aprendizado, não só prazo, orçamento e escopo.",
    "Os números do exemplo são ilustrativos, com 50% do tempo decorrido."
   ],
   "code": {
    "lang": "js",
    "src": "function proportionalProgress(keyResult, elapsedFraction) {\n  const achieved = (keyResult.current - keyResult.baseline) / (keyResult.target - keyResult.baseline);\n  return achieved / elapsedFraction;\n}\n\nfunction projectStatus(project, elapsedFraction) {\n  const ratios = project.keyResults.map((kr) => proportionalProgress(kr, elapsedFraction));\n  const blockersWithoutOwner = project.blockers.filter((b) => !b.owner).length;\n\n  if (Math.min(...ratios) < 0.4 || blockersWithoutOwner > 0) return \"red\";\n  if (Math.min(...ratios) < 0.6 || project.blockers.length > 0) return \"yellow\";\n  return \"green\";\n}\n\nconst projects = [\n  { name: \"RouteWise\", keyResults: [{ baseline: 7, current: 6, target: 5 }], blockers: [{ owner: \"Priya\" }] },\n  { name: \"Fintech\", keyResults: [{ baseline: 0, current: 10, target: 100 }], blockers: [{ owner: null }] },\n  { name: \"E-commerce\", keyResults: [{ baseline: 0, current: 50, target: 100 }], blockers: [] },\n];\n\nfor (const project of projects) {\n  console.log(project.name, projectStatus(project, 0.5));\n}"
   },
   "resultado": "RouteWise amarelo, Fintech vermelho e E-commerce verde saem de uma mesma régua, e a reunião de portfólio vai direto ao que precisa de decisão.",
   "quandoNao": [
    "Projeto único.",
    "Quando os KRs não têm baseline: a rubrica depende dele.",
    "Como avaliação individual de pessoas."
   ],
   "armadilha": "Fazer um dashboard que só evidencia problemas, sem responsável, prazo e mitigação para cada item crítico.",
   "repo": {
    "label": "modulo-10-portfolio-e-okrs",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-10-portfolio-e-okrs"
   }
  }
 ]
});
