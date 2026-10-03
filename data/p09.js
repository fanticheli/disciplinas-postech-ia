PRACTICE.push({
 "disc": "09",
 "intro": "Fine-tuning é um pipeline de decisões medidas: portão de governança, dado limpo como conjunto, treino gerenciado ou local, avaliação honesta e linhagem. Cada cartão mostra a técnica aplicada a um cenário de documentos de seguros e saúde, como no curso.",
 "items": [
  {
   "id": "P9-01",
   "title": "Gate de 4 perguntas antes de treinar",
   "topics": [
    "D9-00"
   ],
   "cenario": "Uma seguradora quer \"treinar o modelo com as apólices\" para o atendente responder dúvidas de cobertura. As regras mudam todo trimestre: o modelo ajustado vai citar cobertura velha com tom de certeza e ninguém vai notar até o sinistro.",
   "passos": [
    "Escreva a tarefa em uma frase e classifique: <b>comportamento</b> (formato, tom, esquema) ou <b>conhecimento</b> (fato que muda). Conhecimento vai para RAG.",
    "Pergunta 2: o melhor prompt com exemplos reais já foi tentado e medido? Sem baseline de prompt, não há gate.",
    "Pergunta 3: há volume e rótulo estável suficientes (a tarefa tem saída fechada e verificável)?",
    "Pergunta 4: o ganho esperado paga o custo e o risco de provedor?",
    "Cada resposta recebe sinal (verde, amarelo, vermelho) e evidência. É condição necessária: um vermelho reprova, a média não compensa.",
    "Separe \"ainda não\" (falta dado: reavalie com data) de \"não\" (tarefa aberta ou instável)."
   ],
   "code": {
    "lang": "text",
    "src": "TAREFA: extrair campos de sinistro de PDF heterogêneo para JSON\n\nP1 comportamento (nao fato)   VERDE     saida e esquema fixo, regra nao entra\nP2 prompt ja tentado          VERDE     prompt c/ 5 exemplos: 41% campos certos\nP3 volume + rotulo estavel    AMARELO   180 exemplos validados; meta 500\nP4 ganho paga custo           VERDE     retrabalho 6 min/doc x 8k docs/mes\n\nGATE: sem vermelho -> avancar com plano de dados\nDECISAO: AINDA NAO (P3), reavaliar com 500 exemplos\n\nTAREFA: responder duvida de cobertura vigente\nP1 comportamento (nao fato)   VERMELHO  regra muda por trimestre\nDECISAO: NAO treinar -> RAG sobre a base de apolices"
   },
   "resultado": "Você chega ao comitê com uma decisão registrada em vez de um orçamento de treino. Tarefas de conhecimento deixam de consumir ciclo de fine-tuning e vão para RAG.",
   "quandoNao": [
    "Tarefa claramente resolvida por prompt bem escrito e medido: o gate é só confirmar, não faça cerimônia.",
    "Prova de conceito descartável sem dado sensível nem custo relevante.",
    "Quando a decisão já veio de requisito regulatório (modelo local obrigatório): o gate vira só plano de dados."
   ],
   "armadilha": "Deixar a média compensar um vermelho: as perguntas são condições necessárias, não pontos somáveis.",
   "repo": {
    "label": "modulo-01-decision-framework",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-01-decision-framework"
   }
  },
  {
   "id": "P9-02",
   "title": "NPV com Monte Carlo para a decisão de investir",
   "topics": [
    "D9-01"
   ],
   "cenario": "O time defende o fine-tuning com um NPV de planilha, uma única linha com premissas otimistas. O financeiro pergunta o intervalo e qual premissa derruba o caso, e ninguém sabe responder.",
   "passos": [
    "Liste as premissas do fluxo: volume mensal, economia por documento, custo de treino, custo de manutenção, horizonte.",
    "Dê a cada premissa incerta uma distribuição (triangular com mínimo, mais provável, máximo) em vez de um número.",
    "Simule milhares de cenários com semente fixa, para o resultado ser reprodutível.",
    "Reporte mediana, P10 e P90 e a probabilidade de NPV negativo.",
    "Faça sensibilidade: varie uma premissa por vez e veja qual move mais o NPV antes de refinar as outras.",
    "As premissas do exemplo são ilustrativas (a aula diz isso); troque pelas suas medições."
   ],
   "code": {
    "lang": "python",
    "src": "import random\nimport statistics\n\ndef npv(cash_flows, rate):\n    return sum(cf / (1 + rate) ** t for t, cf in enumerate(cash_flows))\n\ndef simulate(runs=10000, seed=42):\n    rng = random.Random(seed)\n    results = []\n    for _ in range(runs):\n        volume = rng.triangular(4000, 12000, 8000)\n        saving = rng.triangular(0.3, 3.0, 1.0)\n        training_cost = rng.triangular(15000, 45000, 25000)\n        upkeep = rng.triangular(1000, 6000, 2500)\n        flows = [-training_cost] + [volume * saving - upkeep] * 12\n        results.append(npv(flows, 0.01))\n    results.sort()\n    return {\n        \"median\": statistics.median(results),\n        \"p10\": results[int(runs * 0.10)],\n        \"p90\": results[int(runs * 0.90)],\n        \"loss_probability\": sum(r < 0 for r in results) / runs,\n    }\n\nif __name__ == \"__main__\":\n    print(simulate())"
   },
   "resultado": "A conversa muda de \"o NPV é X\" para \"há N% de chance de perder dinheiro, e a premissa Y é a que decide\". Você sabe onde gastar tempo medindo.",
   "quandoNao": [
    "Quando o gate já reprovou por motivo estrutural (tarefa aberta): NPV bonito não reverte.",
    "Quando o custo é trivial perto do orçamento: simulação é exagero.",
    "Sem nenhuma medição para ancorar as distribuições: você só está embrulhando chute em estatística."
   ],
   "armadilha": "Aprovar por score composto alto: o caso Atendimento ao Cliente tem score maior que Saúde e continua reprovado pelo gate.",
   "repo": {
    "label": "modulo-01-decision-framework",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-01-decision-framework"
   }
  },
  {
   "id": "P9-03",
   "title": "Diligência de provedor e de obsolescência do modelo base",
   "topics": [
    "D9-02",
    "D9-05"
   ],
   "cenario": "O plano de fine-tuning se apoia num tutorial de 2024. Na hora de executar, o recurso mudou ou o modelo base tem aposentadoria anunciada, e o modelo ajustado nasce com prazo de validade.",
   "passos": [
    "Verifique na data de uso, na documentação oficial, se o provedor ainda oferece fine-tuning self-service para o modelo base escolhido.",
    "Registre a data de retirada do modelo base e a janela de suporte (campo da ficha). Retirada de versão e retirada do recurso de tuning são riscos diferentes. Preencha o modelo base com o que a documentação mostrar no dia, sem copiar o do exemplo.",
    "Cheque o aceite jurídico: o do provedor A não vale para o B.",
    "Mantenha o dataset num esquema canônico com um conversor por provedor: a saída de emergência custa um conversor, não um retrabalho.",
    "Agende uma reavaliação contra modelos de fronteira novos.",
    "Guarde a ficha da diligência com data. Ela envelhece."
   ],
   "code": {
    "lang": "text",
    "src": "DILIGENCIA DE PROVEDOR  (data: 2026-10-03)\n\nprovedor ............ Vertex AI\nrecurso tuning ...... confirmado na doc oficial hoje [link + data]\nmodelo base ......... <id e versao do modelo base>\nretirada do base .... data anunciada: ______  -> reavaliar 60 dias antes\naceite juridico ..... [ ] DPA  [ ] regiao  [ ] retencao\ndados saem do pais .. [ ] sim  [ ] nao\nestrategia de saida . dataset canonico + conversor por provedor\nplano B ............. LoRA local (MLX) / outro provedor\nproxima revisao ..... ______"
   },
   "resultado": "Você descobre a mudança de capacidade antes de comprometer orçamento e deixa registrado o prazo de validade do modelo ajustado.",
   "quandoNao": [
    "Experimento local descartável em que o modelo base é de pesos abertos que você guarda.",
    "Quando a plataforma já é padrão corporativo com contrato e suporte de longo prazo definidos.",
    "Se a janela de retirada é bem posterior ao horizonte do projeto."
   ],
   "armadilha": "Confiar em post de blog ou exemplo de curso como se descrevesse a capacidade atual do provedor.",
   "repo": {
    "label": "modulo-03-fine-tuning-via-api",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-03-fine-tuning-via-api"
   }
  },
  {
   "id": "P9-04",
   "title": "Gate de relevância e esquema canônico JSONL",
   "topics": [
    "D9-03"
   ],
   "cenario": "A empresa tem milhares de arquivos \"que parecem dados\": cadastro de beneficiários, PDFs de sinistro, planilhas. Chamar tudo de dataset leva a treinar com dado real e limpo que não é um par entrada e saída.",
   "passos": [
    "Liste ao menos quatro candidatos de fonte e mantenha pelo menos um rejeitado, com justificativa.",
    "Pontue cada fonte em critérios binários: tem par entrada e saída? o rótulo é verificável? cobre a tarefa? pode ser usado (governança)?",
    "Extraia os campos dos documentos aceitos (OCR com parser tolerante, ou LLM multimodal se há muito layout e pouco volume).",
    "Rejeite extração incompleta: \"quase certo\" não entra.",
    "Grave tudo no esquema canônico (instrução, entrada, saída, metadata) e converta por provedor só no final.",
    "O exemplo abaixo é simplificado; a ferramenta do repo tem mais critérios."
   ],
   "code": {
    "lang": "python",
    "src": "import json\n\nREQUIRED_FIELDS = (\"policy_number\", \"claim_date\", \"amount\", \"category\")\n\ndef relevance(source):\n    checks = {\n        \"has_input_output_pair\": source[\"has_pair\"],\n        \"label_verifiable\": source[\"verifiable\"],\n        \"covers_task\": source[\"covers_task\"],\n        \"usable_under_governance\": source[\"allowed\"],\n    }\n    return all(checks.values()), [name for name, ok in checks.items() if not ok]\n\ndef to_canonical(document_text, extracted, source_id):\n    missing = [f for f in REQUIRED_FIELDS if not extracted.get(f)]\n    if missing:\n        raise ValueError(f\"incomplete extraction: {missing}\")\n    return {\n        \"instruction\": \"Extract the claim fields as JSON.\",\n        \"input\": document_text,\n        \"output\": json.dumps(extracted, ensure_ascii=False, sort_keys=True),\n        \"metadata\": {\"source\": source_id},\n    }\n\ndef write_jsonl(path, records):\n    with open(path, \"w\", encoding=\"utf-8\") as handle:\n        for record in records:\n            handle.write(json.dumps(record, ensure_ascii=False) + \"\\n\")"
   },
   "resultado": "O dataset só contém pares com origem e rótulo verificáveis, e trocar de provedor passa a custar um conversor de formato.",
   "quandoNao": [
    "Dado que já nasce como par validado (log de decisões humanas rotuladas): pule o gate de relevância.",
    "Volume minúsculo em que a revisão manual de cada exemplo é mais barata que um pipeline.",
    "Tarefa de conhecimento (RAG): você indexa documentos, não monta pares."
   ],
   "armadilha": "Achar que dado real e limpo é automaticamente dado adequado: o cadastro de beneficiários é real e limpo, mas não é par de entrada e saída.",
   "repo": {
    "label": "modulo-02-preparacao-datasets",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-02-preparacao-datasets"
   }
  },
  {
   "id": "P9-05",
   "title": "Gate de PII antes de qualquer treino",
   "topics": [
    "D9-03"
   ],
   "cenario": "Documentos de sinistro e saúde trazem CPF, nome do segurado e placa. Se isso entra no JSONL, o dado sensível vai parar num provedor externo e possivelmente nos pesos do modelo.",
   "passos": [
    "Defina os identificadores diretos do seu domínio: CPF, nome ancorado em rótulo (\"Segurado:\"), telefone, placa.",
    "Valide CPF pelo dígito verificador para não mascarar números aleatórios de 11 dígitos nem deixar passar um válido formatado diferente.",
    "Substitua por tokens estáveis do tipo <code>[CPF]</code> e <code>[NOME]</code>, preservando a estrutura do texto.",
    "Faça o gate bloquear o pipeline se sobrar qualquer detecção após a limpeza.",
    "Registre o limite do método: regex ancorada não pega nome sem rótulo nem quase-identificadores. É redução de risco, não anonimização garantida.",
    "Rode o gate também no que o modelo gera durante a avaliação."
   ],
   "code": {
    "lang": "python",
    "src": "import re\n\nCPF_PATTERN = re.compile(r\"\\b\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}\\b\")\nNAME_PATTERN = re.compile(\n    r\"(Insured|Segurado|Beneficiário)[ \\t]*:[ \\t]*\"\n    r\"([A-ZÀ-Ú][\\wÀ-ú]*(?:[ \\t]+(?:d[aeo]s?[ \\t]+)?[A-ZÀ-Ú][\\wÀ-ú]*){1,4})\"\n)\n\ndef check_digit(partial):\n    weight = len(partial) + 1\n    total = sum(int(d) * (weight - i) for i, d in enumerate(partial))\n    rest = (total * 10) % 11\n    return 0 if rest == 10 else rest\n\ndef is_valid_cpf(raw):\n    digits = re.sub(r\"\\D\", \"\", raw)\n    if len(digits) != 11 or len(set(digits)) == 1:\n        return False\n    first = check_digit(digits[:9])\n    second = check_digit(digits[:9] + str(first))\n    return digits[9:] == f\"{first}{second}\"\n\ndef scrub(text):\n    text = CPF_PATTERN.sub(\n        lambda m: \"[CPF]\" if is_valid_cpf(m.group()) else m.group(), text\n    )\n    return NAME_PATTERN.sub(lambda m: f\"{m.group(1)}: [NAME]\", text)\n\ndef gate(text):\n    cleaned = scrub(text)\n    leftovers = [\n        m.group() for m in CPF_PATTERN.finditer(cleaned) if is_valid_cpf(m.group())\n    ]\n    if leftovers:\n        raise RuntimeError(\"PII left after scrubbing\")\n    return cleaned"
   },
   "resultado": "Nenhum identificador direto detectável chega ao provedor, e o gate falha alto se algo escapar em vez de seguir em silêncio.",
   "quandoNao": [
    "Dado sintético gerado do zero, sem nenhuma origem real.",
    "Quando o contrato exige tokenização reversível por vault: regex substitutiva não é o mecanismo.",
    "Texto livre sem rótulos, onde só um NER dedicado resolve e a regex dá falsa segurança."
   ],
   "armadilha": "Tratar o regex como anonimização completa: ele só reduz risco e o limite do método precisa ser registrado.",
   "repo": {
    "label": "modulo-02-preparacao-datasets",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-02-preparacao-datasets"
   }
  },
  {
   "id": "P9-06",
   "title": "Deduplicação por MinHash + LSH com refino exato",
   "topics": [
    "D9-04"
   ],
   "cenario": "Várias unidades de uma rede geram laudos quase idênticos, e o mesmo sinistro é reescaneado com pequena diferença de OCR. Comparar todos os pares é quadrático e a duplicata vaza do treino para o teste, inflando a avaliação.",
   "passos": [
    "Normalize o texto: minúsculas, espaços colapsados, bordas aparadas.",
    "Quebre em shingles (n-gramas de caracteres) e calcule a assinatura MinHash de tamanho fixo.",
    "Divida a assinatura em bandas. Quem colide em ao menos uma banda vira candidato (LSH).",
    "Confirme cada candidato com Jaccard exato: o LSH só localiza, não decide.",
    "Deduplique pelo par instrução e entrada, não só pela entrada.",
    "Rode também entre treino e teste para não medir memória."
   ],
   "code": {
    "lang": "python",
    "src": "import hashlib\nimport re\nfrom collections import defaultdict\nfrom itertools import combinations\n\ndef normalize(text):\n    return re.sub(r\"\\s+\", \" \", text.lower()).strip()\n\ndef shingles(text, size=5):\n    text = normalize(text)\n    return {text[i:i + size] for i in range(max(1, len(text) - size + 1))}\n\ndef stable_hash(value, seed):\n    digest = hashlib.blake2b(f\"{seed}:{value}\".encode(), digest_size=8).digest()\n    return int.from_bytes(digest, \"big\")\n\ndef signature(items, size=32):\n    return [min(stable_hash(item, seed) for item in items) for seed in range(size)]\n\ndef candidates(signatures, bands=8, rows=4):\n    buckets = defaultdict(list)\n    for doc_id, sig in signatures.items():\n        for band in range(bands):\n            key = (band, tuple(sig[band * rows:(band + 1) * rows]))\n            buckets[key].append(doc_id)\n    pairs = set()\n    for ids in buckets.values():\n        pairs.update(combinations(sorted(ids), 2))\n    return pairs\n\ndef jaccard(a, b):\n    return len(a & b) / len(a | b)\n\ndef near_duplicates(docs, threshold=0.8):\n    sets = {k: shingles(v) for k, v in docs.items()}\n    sigs = {k: signature(v) for k, v in sets.items()}\n    return [p for p in candidates(sigs) if jaccard(sets[p[0]], sets[p[1]]) >= threshold]"
   },
   "resultado": "Na aula, 549 comparações por força bruta viraram 20 candidatos (cerca de 96% a menos) com os três pares plantados encontrados. A avaliação deixa de medir memorização.",
   "quandoNao": [
    "Dataset pequeno (centenas de exemplos): força bruta com Jaccard exato é mais simples e suficiente.",
    "Duplicata exata: um hash do texto normalizado basta.",
    "Quando o domínio tem templates legítimos repetidos: mesmo template não é duplicata, o refino exato precisa olhar o conteúdo variável."
   ],
   "armadilha": "Remover candidato do LSH sem o refino exato: mesmo template com sinistros distintos não é duplicata.",
   "repo": {
    "label": "modulo-02-preparacao-datasets",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-02-preparacao-datasets"
   }
  },
  {
   "id": "P9-07",
   "title": "Balanceamento por temperatura e entropia de diversidade",
   "topics": [
    "D9-04"
   ],
   "cenario": "Uma oficina de grande volume responde por mais da metade do dataset de Auto. O modelo aprende o estilo dela e generaliza mal para as outras fontes, e ninguém consegue provar que a curadoria melhorou a diversidade.",
   "passos": [
    "Conte exemplos por fonte.",
    "Calcule pesos proporcionais a n elevado a alfa. Alfa 1 mantém a proporção, alfa menor suaviza (a aula usa 0,3).",
    "Converta pesos em contagens inteiras pelo método do maior resto, com teto igual ao que cada fonte realmente tem.",
    "Redistribua o excedente entre as fontes que ainda têm capacidade: nunca duplique a minoria.",
    "Meça a entropia de Shannon e o número efetivo de fontes (exp da entropia) antes e depois.",
    "Não confunda este alfa com a temperatura de geração do LLM."
   ],
   "code": {
    "lang": "python",
    "src": "import math\n\ndef temperature_weights(counts, alpha):\n    raw = {k: n ** alpha for k, n in counts.items()}\n    total = sum(raw.values())\n    return {k: v / total for k, v in raw.items()}\n\ndef largest_remainder(weights, target):\n    floors = {k: int(w * target) for k, w in weights.items()}\n    remainders = sorted(weights, key=lambda k: weights[k] * target - floors[k], reverse=True)\n    for key in remainders[: target - sum(floors.values())]:\n        floors[key] += 1\n    return floors\n\ndef allocate(counts, alpha, target):\n    allocation = {k: 0 for k in counts}\n    active = dict(counts)\n    remaining = target\n    while remaining > 0 and active:\n        quota = largest_remainder(temperature_weights(active, alpha), remaining)\n        saturated = False\n        for key, want in quota.items():\n            room = counts[key] - allocation[key]\n            take = min(want, room)\n            allocation[key] += take\n            remaining -= take\n            if allocation[key] == counts[key]:\n                del active[key]\n                saturated = True\n        if not saturated:\n            break\n    return allocation\n\ndef entropy(counts):\n    total = sum(counts.values())\n    return -sum(n / total * math.log(n / total) for n in counts.values() if n)\n\ndef effective_sources(counts):\n    return math.exp(entropy(counts))"
   },
   "resultado": "Na aula, a Oficina Estrela caiu de cerca de 54% para 40% do Auto e a Clínica Vitalis de cerca de 61% para 50% em Saúde. A diversidade vira número comparável.",
   "quandoNao": [
    "Poucas fontes, todas equilibradas: não há dominância a corrigir.",
    "Quando a produção real tem a mesma distribuição desbalanceada e o modelo deve refleti-la.",
    "Fontes minoritárias pequenas demais: suavizar não cria dado, e o teto de capacidade vai limitar o efeito."
   ],
   "armadilha": "Balancear duplicando exemplos da fonte minoritária para preencher cota.",
   "repo": {
    "label": "modulo-02-preparacao-datasets",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-02-preparacao-datasets"
   }
  },
  {
   "id": "P9-08",
   "title": "Job de fine-tuning supervisionado na Vertex AI (REST)",
   "topics": [
    "D9-05",
    "D9-06"
   ],
   "cenario": "O dataset canônico está pronto e a equipe quer um modelo ajustado sem montar GPU. Sem um fluxo de cinco passos, o job falha com o dataset já sobrescrito e ninguém sabe qual versão de dado gerou qual modelo.",
   "passos": [
    "Passo 1: dataset JSONL no formato do provedor, versionado com sufixo (nunca sobrescreva o do job anterior).",
    "Passo 2: envie para um bucket do Cloud Storage e guarde o URI.",
    "Passo 3: valide hiperparâmetros localmente e peça confirmação explícita antes de criar o job, que é cobrável. O <code>token</code> OAuth vem do ambiente (por exemplo <code>gcloud auth print-access-token</code> exportado em variável), nunca do código.",
    "Passo 4: crie o job (<code>tuningJobs</code>) e consulte o estado com backoff.",
    "Passo 5: ao concluir, registre o modelo ajustado e o hash do dataset (veja o cartão de linhagem).",
    "O repo chama a API REST com <code>urllib</code>; o esquema do corpo abaixo segue o dele. Confirme os campos na documentação vigente: a API muda."
   ],
   "code": {
    "lang": "python",
    "src": "import json\nimport urllib.request\n\ndef create_tuning_job(project, region, token, config):\n    url = (\n        f\"https://{region}-aiplatform.googleapis.com/v1/\"\n        f\"projects/{project}/locations/{region}/tuningJobs\"\n    )\n    body = {\n        \"baseModel\": config[\"baseModel\"],\n        \"tunedModelDisplayName\": config[\"displayName\"],\n        \"supervisedTuningSpec\": {\n            \"trainingDatasetUri\": config[\"datasetUri\"],\n            \"hyperParameters\": {\n                \"epochCount\": config[\"epochCount\"],\n                \"learningRateMultiplier\": config[\"learningRateMultiplier\"],\n            },\n        },\n    }\n    request = urllib.request.Request(\n        url,\n        data=json.dumps(body).encode(),\n        headers={\n            \"Authorization\": f\"Bearer {token}\",\n            \"Content-Type\": \"application/json\",\n        },\n        method=\"POST\",\n    )\n    with urllib.request.urlopen(request, timeout=60) as response:\n        return json.load(response)[\"name\"]"
   },
   "resultado": "Cada modelo ajustado fica rastreável até o dataset e a configuração que o geraram, e uma falha deixa de apagar a evidência.",
   "quandoNao": [
    "Menos de algumas dezenas de exemplos: não há o que ajustar de forma mensurável.",
    "Dado sensível que não pode sair da organização: considere LoRA local.",
    "Quando o provedor deixou de oferecer o recurso para o modelo base: refaça a diligência."
   ],
   "armadilha": "Sobrescrever o dataset de um job anterior: o job que falha precisa continuar apontando para os dados usados.",
   "repo": {
    "label": "modulo-03-fine-tuning-via-api",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-03-fine-tuning-via-api"
   }
  },
  {
   "id": "P9-09",
   "title": "Validar hiperparâmetros e travar a automação cobrável",
   "topics": [
    "D9-06"
   ],
   "cenario": "Um script de automação cria o job de treino. Uma execução acidental cria outro, cobrado, e a API aceitou epochCount como string sem reclamar: o treino rodou com algo diferente do pretendido.",
   "passos": [
    "Defina as faixas válidas por hiperparâmetro (por exemplo epochs de 1 a 20 e multiplicador de 0,1 a 10).",
    "Valide tipo e faixa localmente, rejeitando bool e string (<code>3</code> não é <code>\"3\"</code>).",
    "Exija um parâmetro explícito de confirmação para qualquer função que crie recurso cobrável.",
    "Torne a criação idempotente: chave de execução registrada, repetir não cria outro job.",
    "Depois de criar, consulte o job e compare o aplicado com o pedido: o silêncio da API não prova configuração correta.",
    "Registre cada hiperparâmetro como decisão do experimento, com motivo."
   ],
   "code": {
    "lang": "python",
    "src": "VALID_RANGES = {\n    \"epochCount\": (int, 1, 20),\n    \"learningRateMultiplier\": ((int, float), 0.1, 10),\n}\n\ndef validate(config):\n    errors = []\n    for name, (kind, low, high) in VALID_RANGES.items():\n        value = config.get(name)\n        is_bool = isinstance(value, bool)\n        if is_bool or not isinstance(value, kind) or not low <= value <= high:\n            errors.append(f\"{name} invalid: {value!r}\")\n    return errors\n\ndef create_job_once(config, confirm, registry, submit):\n    if confirm is not True:\n        raise PermissionError(\"explicit confirmation required\")\n    errors = validate(config)\n    if errors:\n        raise ValueError(\"; \".join(errors))\n    key = (config[\"datasetUri\"], config[\"epochCount\"], config[\"learningRateMultiplier\"])\n    if key in registry:\n        return registry[key]\n    registry[key] = submit(config)\n    return registry[key]\n\ndef audit(requested, applied):\n    return {k: (v, applied.get(k)) for k, v in requested.items() if applied.get(k) != v}"
   },
   "resultado": "Execução acidental não cria job extra, e divergência entre o pedido e o aplicado aparece em auditoria em vez de virar surpresa na fatura.",
   "quandoNao": [
    "Notebook interativo de exploração onde cada célula já é confirmação manual.",
    "Job gratuito e descartável.",
    "Quando o provedor já tem idempotency key nativa documentada: use a dele."
   ],
   "armadilha": "Interpretar a ausência de erro da API como prova de configuração correta.",
   "repo": {
    "label": "modulo-03-fine-tuning-via-api",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-03-fine-tuning-via-api"
   }
  },
  {
   "id": "P9-10",
   "title": "Linhagem do modelo: hash SHA-256 e Model Card",
   "topics": [
    "D9-07"
   ],
   "cenario": "Um modelo vai para produção e três meses depois alguém altera o dataset no mesmo caminho. Ninguém sabe qual dado gerou o modelo, nem qual modelo base o provedor pode aposentar.",
   "passos": [
    "Calcule o SHA-256 do arquivo do dataset no momento do job.",
    "Monte a ficha: dataset e hash, modelo base e versão, hiperparâmetros, job, custo, métricas de avaliação, data.",
    "Valide que nenhum campo obrigatório está vazio antes de promover o modelo.",
    "Gere o Model Card em Markdown e guarde com o artefato.",
    "Em auditoria, recalcule o hash do arquivo atual e compare com o da ficha para detectar alteração silenciosa.",
    "Para tarefa de preferência subjetiva avalie Preference Tuning; em tarefa com gabarito objetivo, SFT. Job mais rápido não significa melhor."
   ],
   "code": {
    "lang": "python",
    "src": "import hashlib\nimport json\nfrom datetime import date\n\nREQUIRED = (\"dataset_path\", \"dataset_sha256\", \"base_model\", \"hyperparameters\", \"job_name\")\n\ndef sha256_of(path):\n    digest = hashlib.sha256()\n    with open(path, \"rb\") as handle:\n        for chunk in iter(lambda: handle.read(1 << 20), b\"\"):\n            digest.update(chunk)\n    return digest.hexdigest()\n\ndef build_card(path, base_model, hyperparameters, job_name, metrics):\n    return {\n        \"dataset_path\": path,\n        \"dataset_sha256\": sha256_of(path),\n        \"base_model\": base_model,\n        \"hyperparameters\": hyperparameters,\n        \"job_name\": job_name,\n        \"metrics\": metrics,\n        \"created_at\": date.today().isoformat(),\n    }\n\ndef validate(card):\n    return [field for field in REQUIRED if not card.get(field)]\n\ndef dataset_changed(card):\n    return sha256_of(card[\"dataset_path\"]) != card[\"dataset_sha256\"]\n\ndef to_markdown(card):\n    lines = [f\"# Model card: {card['job_name']}\", \"\"]\n    lines += [f\"- **{k}**: {json.dumps(v, ensure_ascii=False)}\" for k, v in card.items()]\n    return \"\\n\".join(lines)"
   },
   "resultado": "Todo modelo em produção aponta para o hash exato do dado que o treinou, e adulteração do dataset é detectável por comparação de um valor.",
   "quandoNao": [
    "Experimento descartável que nunca vai para produção.",
    "Quando a plataforma de ML já tem model registry com lineage automático: use o dela.",
    "Documentar só o nome do arquivo substitui o hash: não substitui, dá falsa sensação de versionamento."
   ],
   "armadilha": "Esquecer de registrar o modelo base: o modelo ajustado continua publicado mas sua origem pode não aceitar mais treino.",
   "repo": {
    "label": "modulo-03-fine-tuning-via-api",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-03-fine-tuning-via-api"
   }
  },
  {
   "id": "P9-11",
   "title": "Split sem vazamento por entidade",
   "topics": [
    "D9-09",
    "D9-12"
   ],
   "cenario": "O dataset de sinistros é dividido por posição: 80% primeiros para treino, resto para teste. A mesma oficina aparece nos dois lados e o modelo \"acerta\" por reconhecer o template. A métrica sai linda e some em produção.",
   "passos": [
    "Escolha a chave de entidade que não pode cruzar a fronteira (oficina, clínica, cliente, apólice).",
    "Agrupe os exemplos por essa chave e atribua grupos inteiros a treino, validação ou teste.",
    "Use hash estável da chave em vez de sorteio, para o split ser reprodutível entre execuções.",
    "Reserve o teste antes de qualquer decisão e não olhe para ele durante o ajuste: o conjunto que guiou decisões é validação.",
    "Grave <code>train.jsonl</code>, <code>valid.jsonl</code> e <code>test.jsonl</code>, que é o formato que o <code>mlx_lm lora</code> lê no diretório de dados.",
    "Confirme com uma asserção que a interseção de entidades entre os conjuntos é vazia."
   ],
   "code": {
    "lang": "python",
    "src": "import hashlib\nimport json\nimport os\n\ndef bucket(entity, buckets=10):\n    digest = hashlib.sha256(entity.encode()).hexdigest()\n    return int(digest, 16) % buckets\n\ndef split_by_entity(examples, key):\n    splits = {\"train\": [], \"valid\": [], \"test\": []}\n    for example in examples:\n        slot = bucket(example[key])\n        name = \"test\" if slot == 0 else \"valid\" if slot == 1 else \"train\"\n        splits[name].append(example)\n    return splits\n\ndef assert_no_leak(splits, key):\n    seen = {name: {e[key] for e in rows} for name, rows in splits.items()}\n    assert not seen[\"train\"] & seen[\"test\"]\n    assert not seen[\"train\"] & seen[\"valid\"]\n    assert not seen[\"valid\"] & seen[\"test\"]\n\ndef write_splits(splits, directory):\n    os.makedirs(directory, exist_ok=True)\n    for name, rows in splits.items():\n        with open(os.path.join(directory, f\"{name}.jsonl\"), \"w\", encoding=\"utf-8\") as handle:\n            for row in rows:\n                handle.write(json.dumps(row, ensure_ascii=False) + \"\\n\")"
   },
   "resultado": "A métrica de teste passa a estimar generalização para uma fonte nova, não reconhecimento de template, e o número deixa de ser inflado.",
   "quandoNao": [
    "Dados realmente independentes e sem entidade repetida (cada linha é de um cliente distinto).",
    "Dataset minúsculo: um split por entidade pode deixar o teste vazio ou enviesado, e aí vale validação cruzada.",
    "Quando a produção é sempre com as mesmas entidades: o vazamento por entidade é parte do cenário real."
   ],
   "armadilha": "Dividir sequencialmente e deixar a mesma entidade em treino e teste, criando uma avaliação artificialmente fácil.",
   "repo": {
    "label": "modulo-04-lora-e-peft",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft"
   }
  },
  {
   "id": "P9-12",
   "title": "LoRA local com MLX e leitura da curva de validação",
   "topics": [
    "D9-08",
    "D9-09"
   ],
   "cenario": "Documentos sensíveis não podem sair da máquina e a nuvem gerenciada não se paga para o volume. Treinar um adaptador local é viável, mas o time para em 20 iterações por convenção e declara que \"convergiu\".",
   "passos": [
    "Garanta <code>train/valid/test.jsonl</code> no diretório de dados (cartão anterior).",
    "Configure o treino em YAML: modelo base, <code>fine_tune_type: lora</code>, número de camadas, batch, <code>iters</code>, learning rate e <code>lora_parameters</code> (rank, scale, dropout).",
    "Rode <code>python3 -m mlx_lm lora -c config.yaml</code>, guardando a saída para ter a curva (linhas <code>Iter N: Val loss X</code>).",
    "Extraia a val loss por checkpoint e decida o ponto de parada olhando a curva inteira, não só início e fim.",
    "Compare a geração com e sem <code>--adapter-path</code> no mesmo exemplo retido: terminar com código zero não prova que o ajuste funcionou.",
    "Meça o tempo na sua máquina para alimentar o NPV. O learning rate de 1e-5 é do exemplo do repo para o MLX: não o copie para outro framework."
   ],
   "code": {
    "lang": "yaml",
    "src": "model: \"mlx-community/gemma-4-e2b-it-bf16\"\ntrain: true\ndata: \"./mlx-data\"\nfine_tune_type: lora\nnum_layers: 16\nbatch_size: 1\niters: 200\nlearning_rate: 1.0e-5\nval_batches: 25\nsteps_per_report: 10\nsteps_per_eval: 20\nsave_every: 100\nseed: 0\nlora_parameters:\n  rank: 8\n  dropout: 0.0\n  scale: 20.0\nadapter_path: \"./mlx-adapters\""
   },
   "resultado": "Você obtém um adaptador de poucas dezenas de MB treinado sem dado sair da máquina, e um ponto de parada justificado pela curva, não por convenção.",
   "quandoNao": [
    "Máquina sem Apple Silicon: MLX não se aplica, use o equivalente HF/PEFT.",
    "Volume alto e recorrente com SLA: infraestrutura gerenciada pode compensar.",
    "Tarefa aberta ou instável: LoRA não a salva."
   ],
   "armadilha": "Comparar apenas início e fim de 20 iterações e chamar de convergência.",
   "repo": {
    "label": "modulo-04-lora-e-peft",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft"
   }
  },
  {
   "id": "P9-13",
   "title": "Escolher rank, QLoRA e DoRA por medição",
   "topics": [
    "D9-10"
   ],
   "cenario": "O time quer \"rank 64 porque é melhor\" e uma GPU pequena. Sem comparar, paga mais memória sem ganho, ou adota DoRA porque o paper é promissor.",
   "passos": [
    "Fixe dataset, split, hiperparâmetros e semente: só uma variável muda por execução. O <code>config.yaml</code> é o do cartão anterior; o rank só existe em <code>lora_parameters</code> do YAML (não há flag de CLI), e flags de CLI têm precedência sobre o YAML (conferido no código do <code>mlx_lm</code> 0.32).",
    "Rode ranks crescentes (4, 8, 16) e registre val loss final, parâmetros treináveis e pico de memória.",
    "Escolha o menor rank que atinge a margem de qualidade do negócio, definida antes.",
    "Para GPU pequena, repita o rank escolhido com a base quantizada em 4-bit (QLoRA) e compare memória e val loss.",
    "Teste DoRA no seu caso com <code>--fine-tune-type dora</code> antes de adotar como padrão.",
    "Referência da aula (rank 8 no repo): pico de memória de 10,8 GB em bf16 contra 4,2 GB em 4-bit, com val loss de 0,895 contra 0,932; DoRA empatou em 0,895 com um pouco mais de memória. São números do caso do curso, meça o seu."
   ],
   "code": {
    "lang": "bash",
    "src": "mkdir -p configs logs\nfor rank in 4 8 16; do\n  sed \"s/rank: 8/rank: $rank/\" config.yaml > \"configs/rank$rank.yaml\"\n  python3 -m mlx_lm lora -c \"configs/rank$rank.yaml\" \\\n    --adapter-path \"adapters-rank$rank\" | tee \"logs/rank$rank.log\"\ndone\n\npython3 -m mlx_lm lora -c config.yaml \\\n  --fine-tune-type dora \\\n  --adapter-path adapters-dora | tee logs/dora.log"
   },
   "resultado": "O rank deixa de ser palpite e vira uma linha de tabela: melhor custo por qualidade, com a memória do QLoRA e o ganho (ou não) do DoRA medidos no seu dado.",
   "quandoNao": [
    "Baseline já passa com folga no rank baixo: parar no mais barato.",
    "Memória sobrando: QLoRA só troca precisão por economia que você não precisa.",
    "Sem tempo para rodar o comparativo: fique no rank 8 e registre como hipótese não medida."
   ],
   "armadilha": "Concluir que rank maior é sempre melhor sem olhar o custo adicional; e confundir rank (capacidade) com scale (intensidade).",
   "repo": {
    "label": "modulo-04-lora-e-peft",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft"
   }
  },
  {
   "id": "P9-14",
   "title": "Full Fine-Tuning ou LoRA com limiar de ganho explícito",
   "topics": [
    "D9-08",
    "D9-11"
   ],
   "cenario": "Há um debate sobre treinar o modelo inteiro porque \"o teto é maior\". Cada cliente teria um checkpoint de gigabytes para armazenar e servir, quando um adaptador de dezenas de MB poderia atender.",
   "passos": [
    "Compare Full contra o <b>melhor</b> LoRA testado, não contra o rank 8 por conveniência.",
    "Defina antes o limiar de ganho que justifica o custo extra (por exemplo, 2 pontos de acerto).",
    "Calcule o custo adicional: memória de treino, armazenamento por cliente e servir múltiplos checkpoints.",
    "Confirme que o Full é de fato completo: liberar só 16 camadas não é Full.",
    "Decida: ganho abaixo do limiar, fique com uma base e um adaptador por cliente.",
    "Delimite: \"LoRA empata\" vale para tarefa fechada, não para tarefa aberta ou ambígua."
   ],
   "code": {
    "lang": "python",
    "src": "def decide(full, best_lora, threshold_points, clients, full_gb, adapter_mb):\n    gain = (full[\"accuracy\"] - best_lora[\"accuracy\"]) * 100\n    storage_full_gb = clients * full_gb\n    storage_lora_gb = full_gb + clients * adapter_mb / 1024\n    verdict = \"full\" if gain >= threshold_points else \"lora\"\n    return {\n        \"gain_points\": round(gain, 2),\n        \"storage_full_gb\": round(storage_full_gb, 1),\n        \"storage_lora_gb\": round(storage_lora_gb, 1),\n        \"verdict\": verdict,\n    }\n\nprint(decide(\n    full={\"accuracy\": 0.97},\n    best_lora={\"accuracy\": 0.96},\n    threshold_points=2.0,\n    clients=40,\n    full_gb=10.0,\n    adapter_mb=26,\n))"
   },
   "resultado": "A decisão tem um critério escrito antes dos números, e o custo de armazenar e servir 40 especializações aparece lado a lado com o ganho de qualidade. Os números acima são ilustrativos.",
   "quandoNao": [
    "Tarefa aberta em que a liberdade extra do Full pode importar: meça de verdade.",
    "Um único modelo para um único cliente, sem preocupação de armazenamento.",
    "Quando preservar capacidades gerais do base é irrelevante e há GPU de sobra."
   ],
   "armadilha": "Comparar Full contra o rank 8 em vez do melhor LoRA testado.",
   "repo": {
    "label": "modulo-04-lora-e-peft",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft"
   }
  },
  {
   "id": "P9-15",
   "title": "Harness de avaliação: precisão por campo, consistência e esquema",
   "topics": [
    "D9-12",
    "D9-14"
   ],
   "cenario": "O modelo extrai JSON de sinistros e o time o avalia olhando três exemplos. Um \"campo certo\" com maiúscula diferente reprova, um JSON válido com nomes de campo errados passa, e ninguém repete a chamada para ver se é estável.",
   "passos": [
    "Reserve o conjunto retido por faixa de índices ou de fontes, fora do gerador de treino.",
    "Remova cerca de Markdown da resposta antes de parsear.",
    "Valide o esquema: nomes dos campos e tipos, não só \"é JSON\".",
    "Compare campo a campo com normalização (caixa, espaços, acentos) para não reprovar variação irrelevante de formato.",
    "Meça consistência repetindo a mesma chamada várias vezes (mais de duas) com temperatura 0.",
    "Teste o avaliador com falhas plantadas antes de confiar nele e liste o que a avaliação não cobre."
   ],
   "code": {
    "lang": "python",
    "src": "import json\nimport re\nimport unicodedata\n\nEXPECTED_FIELDS = {\n    \"policy_number\": str,\n    \"claim_date\": str,\n    \"amount\": (int, float),\n    \"category\": str,\n}\n\ndef strip_fence(text):\n    text = text.strip()\n    fence = chr(96) * 3\n    match = re.match(rf\"^{fence}(?:json)?\\s*(.*?)\\s*{fence}$\", text, re.DOTALL)\n    return match.group(1) if match else text\n\ndef normalize(value):\n    text = unicodedata.normalize(\"NFKD\", str(value)).encode(\"ascii\", \"ignore\").decode()\n    return re.sub(r\"\\s+\", \" \", text).strip().lower()\n\ndef schema_errors(parsed):\n    errors = [f\"missing {k}\" for k in EXPECTED_FIELDS if k not in parsed]\n    errors += [\n        f\"type {k}\" for k, t in EXPECTED_FIELDS.items()\n        if k in parsed and not isinstance(parsed[k], t)\n    ]\n    return errors\n\ndef field_accuracy(expected, text):\n    try:\n        parsed = json.loads(strip_fence(text))\n    except json.JSONDecodeError:\n        return {k: False for k in expected}\n    return {k: normalize(parsed.get(k)) == normalize(v) for k, v in expected.items()}\n\ndef consistency(call, example, repetitions=5):\n    outputs = {normalize(strip_fence(call(example))) for _ in range(repetitions)}\n    return len(outputs) == 1"
   },
   "resultado": "Você passa a ter precisão por campo, taxa de conformidade de esquema e estabilidade em vez de uma impressão, e uma régua que não reprova o modelo por maiúscula.",
   "quandoNao": [
    "Saída de texto livre sem esquema: use rúbrica e juiz, não igualdade por campo.",
    "Protótipo exploratório em que três exemplos olhados à mão bastam.",
    "Sem conjunto retido de verdade, qualquer número vira número de validação."
   ],
   "armadilha": "Chamar de teste o conjunto de validação que guiou as decisões.",
   "repo": {
    "label": "modulo-05-avaliacao-modelos",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos"
   }
  },
  {
   "id": "P9-16",
   "title": "Baseline justo e teste A/B com bootstrap",
   "topics": [
    "D9-13"
   ],
   "cenario": "O fine-tuning é apresentado como melhor que o modelo genérico, mas o genérico recebeu um prompt fraco e a diferença é de poucos exemplos num conjunto de 20. Ninguém sabe se o ganho é sinal ou acaso.",
   "passos": [
    "Dê ao genérico o melhor prompt possível, com as mesmas instruções e exemplos do ajustado. Zero do genérico pode ser formato, não incapacidade.",
    "Rode os dois sobre o mesmo conjunto retido e guarde acerto por exemplo (0 ou 1).",
    "Calcule a diferença pareada por exemplo.",
    "Reamostre as diferenças com reposição (bootstrap, semente fixa) e tire o intervalo de confiança da média.",
    "Se o intervalo cruza zero, não declare vitória. Se o ganho é de formato, tente consertá-lo por prompt ou pós-processamento antes de pagar fine-tuning.",
    "Compare contra o melhor caso do baseline, não só contra a média."
   ],
   "code": {
    "lang": "python",
    "src": "import random\n\ndef paired_differences(tuned, baseline):\n    return [t - b for t, b in zip(tuned, baseline)]\n\ndef bootstrap_interval(differences, iterations=10000, confidence=0.95, seed=7):\n    rng = random.Random(seed)\n    size = len(differences)\n    means = sorted(\n        sum(rng.choices(differences, k=size)) / size for _ in range(iterations)\n    )\n    low = means[int(iterations * (1 - confidence) / 2)]\n    high = means[int(iterations * (1 + confidence) / 2) - 1]\n    return low, high\n\ntuned = [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1]\nbaseline = [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1]\nprint(bootstrap_interval(paired_differences(tuned, baseline)))"
   },
   "resultado": "A afirmação \"ganhamos\" vem com intervalo de confiança, e o ganho de formato fica separado do ganho de conteúdo. Os vetores acima são ilustrativos.",
   "quandoNao": [
    "Diferença gritante em conjunto grande: o intervalo é confirmação, não decisão.",
    "Conjunto de poucos exemplos (por exemplo 5): o bootstrap não cria informação, colete mais dados.",
    "Quando a decisão independe de ganho estatístico (obrigação regulatória de modelo local)."
   ],
   "armadilha": "Dar ao genérico instruções diferentes das do fine-tunado.",
   "repo": {
    "label": "modulo-05-avaliacao-modelos",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos"
   }
  },
  {
   "id": "P9-17",
   "title": "LLM-as-a-Judge com rúbrica e inversão de posição",
   "topics": [
    "D9-13"
   ],
   "cenario": "Pareceres e recusas são texto aberto, sem gabarito por campo. Um juiz LLM sem cuidado prefere a resposta que aparece primeiro, ou a do próprio modelo dele, e o A/B sai enviesado.",
   "passos": [
    "Escreva uma rúbrica explícita (critérios observáveis, escala curta) e peça saída em JSON.",
    "Julgue cada par duas vezes, trocando a ordem (A,B e B,A).",
    "Só conte vitória quando o veredito é o mesmo nas duas ordens; o resto é empate ou viés de posição.",
    "Use um juiz de outra família do candidato para reduzir self-preference.",
    "Valide o juiz com casos conhecidos (um par em que o vencedor é óbvio) e remova cerca de Markdown antes de parsear.",
    "A chamada ao modelo é injetada em <code>judge_call</code>: o código é agnóstico de provedor, não é a API real."
   ],
   "code": {
    "lang": "python",
    "src": "import json\n\nRUBRIC = (\n    \"Compare the two answers. Score correctness, completeness and refusal \"\n    \"when information is missing. Reply only with JSON: \"\n    '{\"winner\": \"A\" | \"B\" | \"tie\"}'\n)\n\ndef ask(judge_call, question, first, second):\n    prompt = f\"{RUBRIC}\\n\\nQuestion: {question}\\n\\nA: {first}\\n\\nB: {second}\"\n    return json.loads(judge_call(prompt))[\"winner\"]\n\ndef judge_with_swap(judge_call, question, tuned, baseline):\n    forward = ask(judge_call, question, tuned, baseline)\n    backward = ask(judge_call, question, baseline, tuned)\n    if forward == \"A\" and backward == \"B\":\n        return \"tuned\"\n    if forward == \"B\" and backward == \"A\":\n        return \"baseline\"\n    return \"tie\"\n\ndef win_rate(judge_call, cases):\n    verdicts = [\n        judge_with_swap(judge_call, c[\"question\"], c[\"tuned\"], c[\"baseline\"])\n        for c in cases\n    ]\n    return {v: verdicts.count(v) / len(verdicts) for v in (\"tuned\", \"baseline\", \"tie\")}"
   },
   "resultado": "O juiz deixa de premiar posição, e a taxa de empate por inconsistência passa a ser um indicador de que a rúbrica ou o juiz precisam de ajuste.",
   "quandoNao": [
    "Saída com gabarito objetivo: use comparação por campo.",
    "Sem orçamento para duas chamadas por par e um segundo modelo juiz.",
    "Decisão de alto risco sem revisão humana de amostra: juiz LLM não substitui validação humana."
   ],
   "armadilha": "Usar o mesmo modelo como candidato e juiz sem checar self-preference.",
   "repo": {
    "label": "modulo-05-avaliacao-modelos",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos"
   }
  },
  {
   "id": "P9-18",
   "title": "Investigar resultado ruim: régua antes de overfitting",
   "topics": [
    "D9-14"
   ],
   "cenario": "O modelo ajustado tira 0% num teste de estresse e o time decreta overfitting. Quando alguém lê a resposta bruta, ela está certa, só com maiúscula, espaço ou formato diferente do esperado.",
   "passos": [
    "Trate o número ruim como hipótese. Antes de concluir, abra a resposta bruta de alguns exemplos.",
    "Separe a falha por causa: esquema, formato, normalização ou erro de conteúdo.",
    "Reavalie com a régua corrigida e registre o que mudou.",
    "Escreva conjuntos de estresse à mão, fora do gerador de treino.",
    "Repita a chamada o suficiente (mais de 3) antes de chamar um erro de \"sistemático\".",
    "Registre o que a avaliação não cobre."
   ],
   "code": {
    "lang": "python",
    "src": "import re\nimport unicodedata\n\ndef canonical(value):\n    text = unicodedata.normalize(\"NFKD\", str(value)).encode(\"ascii\", \"ignore\").decode()\n    return re.sub(r\"\\s+\", \" \", text).strip().lower()\n\ndef classify_failure(expected, raw, parsed):\n    if parsed is None:\n        return \"format\"\n    if parsed == expected:\n        return \"ok\"\n    if canonical(parsed) == canonical(expected):\n        return \"ruler\"\n    return \"content\"\n\ndef report(results):\n    summary = {}\n    for expected, raw, parsed in results:\n        kind = classify_failure(expected, raw, parsed)\n        summary[kind] = summary.get(kind, 0) + 1\n    return summary\n\ndef is_systematic(outcomes, minimum_runs=10):\n    return len(outcomes) >= minimum_runs and len(set(outcomes)) == 1"
   },
   "resultado": "Você distingue modelo ruim de régua ruim antes de refazer treino: falha de régua corrige-se em minutos, falha de conteúdo exige mexer em dado.",
   "quandoNao": [
    "Avaliação já usa régua testada com falhas plantadas e o resultado ruim é consistente em muitas repetições.",
    "Falha em esquema crítico para integração: formato errado já é falha real.",
    "Sem acesso à resposta bruta (só métrica agregada): corrija o log antes de qualquer conclusão."
   ],
   "armadilha": "Reprovar um modelo correto porque a régua foi mal definida (maiúscula, espaço).",
   "repo": {
    "label": "modulo-05-avaliacao-modelos",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos"
   }
  },
  {
   "id": "P9-19",
   "title": "Checklist de graduação e veredito com NPV real",
   "topics": [
    "D9-15"
   ],
   "cenario": "O piloto foi bem e todos querem ir para produção. Sem critério prévio, o limiar é ajustado depois de ver o resultado, e o NPV continua usando a premissa de acerto que era só projeção.",
   "passos": [
    "Escreva o checklist de graduação antes de medir: acerto mínimo por campo, conformidade de esquema, consistência, intervalo de confiança do ganho.",
    "Cada item exige evidência reproduzível, não afirmação.",
    "Compare contra o melhor caso do baseline, não a média.",
    "Reabra o NPV trocando só as premissas que agora têm medição (acerto, tempo de treino) e mantendo as demais.",
    "Compare nuvem e local sob a mesma régua e o mesmo horizonte.",
    "Declare o escopo do veredito: o que ele não prova (por exemplo, outras fontes, outros domínios)."
   ],
   "code": {
    "lang": "text",
    "src": "CHECKLIST DE GRADUACAO  (escrito ANTES da medicao, congelado em git)\n\n[ ] precisao por campo >= 0.95 no teste retido (n >= 100)\n[ ] conformidade de esquema = 100%\n[ ] consistencia em 5 repeticoes >= 0.98\n[ ] IC95% do ganho vs melhor baseline nao cruza zero\n[ ] ganho de conteudo separado do ganho de formato\n[ ] hash do dataset e do teste na ficha\n[ ] nenhum vermelho no gate de governanca\n\nNPV: premissa trocada = acerto (medido). resto = igual ao gate original.\nCAMINHO      NPV(12m)   HORIZONTE   NOTAS\nnuvem        ____       12m         custo por token\nlocal        ____       12m         tempo de treino medido\n\nESCOPO: vale para Auto/Saude no padrao de documento X. Nao prova: outros layouts."
   },
   "resultado": "A promoção para produção vira uma checagem contra critérios congelados, e o NPV passa a usar o dado medido onde antes havia projeção.",
   "quandoNao": [
    "Experimento interno sem decisão de investimento atrelada.",
    "Quando um número é projetado (não medido), ele não entra como evidência de graduação.",
    "Tentar reverter uma reprovação estrutural do gate (tarefa aberta) com métrica de piloto."
   ],
   "armadilha": "Ajustar o limiar depois de ver o resultado.",
   "repo": {
    "label": "modulo-05-avaliacao-modelos",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos"
   }
  },
  {
   "id": "P9-20",
   "title": "Pipeline do protótipo: classificar, rotear, validar, recusar",
   "topics": [
    "D9-16"
   ],
   "cenario": "Um assistente recebe pedidos de Auto e de Saúde. Um modelo de domínio errado, ou um caso fora do escopo forçado em um esquema, produz um JSON válido e errado, que vai direto para o cliente com tom amigável.",
   "passos": [
    "Classifique o domínio com uma regra simples e verificável (palavras-chave com pontuação) quando o problema é simples.",
    "Em empate ou sem pista, recuse ou peça confirmação: não escolha o maior por padrão.",
    "Isole a inferência atrás de uma função única, para trocar provedor sem mexer na validação.",
    "Valide o JSON contra o esquema do domínio antes de qualquer formatação da resposta.",
    "Só depois monte a resposta amigável; se a validação falhar, encaminhe a um humano.",
    "É protótipo didático: não é arquitetura de produção."
   ],
   "code": {
    "lang": "python",
    "src": "import json\n\nKEYWORDS = {\n    \"auto\": {\"placa\", \"colisão\", \"para-choque\", \"oficina\"},\n    \"health\": {\"consulta\", \"exame\", \"clínica\", \"internação\"},\n}\nREQUIRED = {\n    \"auto\": {\"plate\", \"damage\"},\n    \"health\": {\"procedure\", \"provider\"},\n}\n\ndef route(text):\n    words = set(text.lower().split())\n    scores = {d: len(words & kw) for d, kw in KEYWORDS.items()}\n    best = max(scores.values())\n    winners = [d for d, s in scores.items() if s == best]\n    return winners[0] if best > 0 and len(winners) == 1 else None\n\ndef handle(text, infer):\n    domain = route(text)\n    if domain is None:\n        return {\"action\": \"refuse\", \"reason\": \"unknown or ambiguous domain\"}\n    try:\n        data = json.loads(infer(domain, text))\n    except json.JSONDecodeError:\n        return {\"action\": \"escalate\", \"reason\": \"invalid json\"}\n    if not REQUIRED[domain] <= data.keys():\n        return {\"action\": \"escalate\", \"reason\": \"schema mismatch\"}\n    return {\"action\": \"answer\", \"domain\": domain, \"data\": data}"
   },
   "resultado": "Casos ambíguos e fora do escopo viram recusa ou encaminhamento explícito em vez de resposta confiante e errada.",
   "quandoNao": [
    "Domínio único: não precisa de roteador.",
    "Roteamento que exige entendimento semântico profundo: aí um classificador treinado ou LLM compensa, medindo.",
    "Produção real: este é protótipo, faltam observabilidade, autenticação e fila."
   ],
   "armadilha": "Forçar um esquema inadequado a um caso fora do escopo: a saída pareceria válida e estaria errada.",
   "repo": {
    "label": "modulo-06-projeto-final",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-06-projeto-final"
   }
  },
  {
   "id": "P9-21",
   "title": "Dado sintético com rótulo garantido e reavaliação pós-escala",
   "topics": [
    "D9-17"
   ],
   "cenario": "Há 200 exemplos e o time quer 3.000. Gerar texto por LLM e depois extrair o rótulo cria rótulo duvidoso, e depois de escalar o modelo regride em alguns campos sem ninguém medir de novo.",
   "passos": [
    "Inverta o fluxo: sorteie o valor conhecido (rótulo) e gere o texto em torno dele. O rótulo é garantido por construção.",
    "Varie templates, fontes e ruído para não aumentar duplicata (rode o dedup e o balanceamento).",
    "Escale em degraus (por exemplo 200, 1.000, 3.000), sempre com o mesmo split por entidade.",
    "Reavalie cada degrau com o mesmo protocolo e o mesmo teste retido antes de declarar melhora.",
    "Estime custo de treino com o fator de épocas, não só a página de preço.",
    "Documente decisões e alternativas rejeitadas, e o que a conclusão não prova."
   ],
   "code": {
    "lang": "python",
    "src": "import random\n\nTEMPLATES = [\n    \"Policy {policy}: collision on {date}, repair estimate {amount} BRL.\",\n    \"Claim for policy {policy} filed {date}. Estimated cost: {amount} reais.\",\n    \"On {date} the insured (policy {policy}) reported damage worth {amount} BRL.\",\n]\n\ndef make_example(rng, source):\n    policy = f\"AP{rng.randint(100000, 999999)}\"\n    date = f\"2026-{rng.randint(1, 12):02d}-{rng.randint(1, 28):02d}\"\n    amount = rng.randint(500, 40000)\n    text = rng.choice(TEMPLATES).format(policy=policy, date=date, amount=amount)\n    label = {\"policy_number\": policy, \"claim_date\": date, \"amount\": amount}\n    return {\"input\": text, \"output\": label, \"metadata\": {\"source\": source}}\n\ndef generate(total, sources, seed=11):\n    rng = random.Random(seed)\n    return [make_example(rng, sources[i % len(sources)]) for i in range(total)]\n\ndef training_tokens(examples, tokens_per_example, epochs):\n    return len(examples) * tokens_per_example * epochs"
   },
   "resultado": "Rótulo correto por construção e uma reavaliação por degrau que pega regressão (mais dado nem sempre melhora um piloto que já funcionava) antes de ir para produção.",
   "quandoNao": [
    "Já existe volume real validado suficiente.",
    "Template sintético muito regular: o modelo aprende o gerador, não o domínio real. Misture dado real no teste.",
    "Domínio em que o texto real é muito mais variado do que você consegue simular."
   ],
   "armadilha": "Assumir que mais dado melhora um piloto que já funcionava.",
   "repo": {
    "label": "modulo-06-projeto-final",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-06-projeto-final"
   }
  }
 ]
});
