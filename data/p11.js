PRACTICE.push({
 "disc": "11",
 "intro": "Na D11 as técnicas saem do projeto de ponta a ponta: contexto e skills do agente de código, identidade sem chave no CI/CD, corpus sem LLM, busca vetorial, juiz de suficiência com fallback, guardrail por código, testes sem rede, circuit breaker, streaming, observabilidade por nó, budget de tokens e encerramento do ambiente, com um número ou critério medido no fim de cada passo.",
 "items": [
  {
   "id": "P11-01",
   "title": "Guardrail determinístico pós-LLM com teste que não pode sumir",
   "topics": [
    "D11-00"
   ],
   "cenario": "Um assistente de domínio regulado já tem a regra no system prompt, mas o modelo ocasionalmente escreve a frase proibida e ninguém percebe até um cliente reclamar.",
   "passos": [
    "Liste 10 frases proibidas reais do seu domínio (verbo em primeira pessoa ou imperativo com objeto) e 10 frases legítimas parecidas (ex.: \"receita de vendas\").",
    "Escreva uma função pura <code>containsForbiddenAdvice(text)</code> com regex que mirem a forma da recomendação, não palavras isoladas.",
    "Aplique-a na saída do LLM e troque o texto inteiro por uma resposta fixa quando casar.",
    "Escreva o teste com as duas listas (<code>it.each</code>) e registre no guia do projeto que ele não pode ser removido.",
    "Rode contra 50 respostas reais do seu modelo e conte falsos positivos e negativos."
   ],
   "code": {
    "lang": "ts",
    "src": "const FORBIDDEN_PATTERNS: RegExp[] = [\n  /\\brecomend(o|amos|a|aria)\\b/i,\n  /\\bvale a pena (comprar|vender|manter)\\b/i,\n  /\\b(compre|venda|mantenha)\\s+(essa|esta|a)\\s*(ação|posição|papel)/i,\n];\n\nconst FALLBACK_ANSWER =\n  'Não recomendamos decisões de compra, venda ou manutenção de posição.';\n\nexport function containsForbiddenAdvice(text: string): boolean {\n  return FORBIDDEN_PATTERNS.some((pattern) => pattern.test(text));\n}\n\nexport function applyGuardrail(llmText: string): string {\n  return containsForbiddenAdvice(llmText) ? FALLBACK_ANSWER : llmText.trim();\n}"
   },
   "resultado": "Taxa de bloqueio das 10 frases proibidas (meta: 10/10) e de falsos positivos nas 10 legítimas (meta: 0/10); depois, número de falhas nas 50 respostas reais.",
   "quandoNao": [
    "Restrição que depende de significado e não de forma (ex.: viés sutil): regex não pega, use um classificador ou revisão humana.",
    "Domínio sem exigência regulatória, em que o prompt já basta e um falso positivo custa mais que o erro."
   ],
   "armadilha": "Regex sobre palavras soltas (\"venda\") dispara em texto legítimo; mire a construção da recomendação.",
   "repo": {
    "label": "packages/agent/src/answer (format-resposta.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/packages/agent/src/answer/format-resposta.ts"
   }
  },
  {
   "id": "P11-02",
   "title": "Dividir contexto: CLAUDE.md curto e uma skill por tipo de tarefa",
   "topics": [
    "D11-01"
   ],
   "cenario": "O arquivo de instruções do time passou de 50 KB, o agente fica lento e custa mais por conversa, e ainda assim ignora a convenção de rotas.",
   "passos": [
    "Meça o baseline: <code>wc -c</code> do arquivo de instruções e divida por 4 para estimar tokens fixos por interação.",
    "Deixe no CLAUDE.md só o que vale para toda tarefa: stack, comandos, regras \"pergunte antes\" e \"nunca\", convenções gerais.",
    "Mova cada procedimento (rota HTTP, nó do grafo, componente) para <code>.claude/skills/&lt;nome&gt;/SKILL.md</code> com <code>description</code> que diga quando usar.",
    "Se existir skill oficial do framework, instale-a e escreva no topo da sua: \"em conflito, a oficial vence\".",
    "Mova o histórico de estado (\"bloco X pronto\") para <code>docs/</code> e deixe um ponteiro.",
    "Peça uma tarefa de backend e confira, pelo log do agente, que nenhuma skill de frontend foi carregada."
   ],
   "code": {
    "lang": "yaml",
    "src": "---\nname: fastify-route\ndescription: Use ao criar ou modificar rotas HTTP na API Fastify. Cobre validação com zod, erro em problem+json e SSE.\n---\n\n# Rotas Fastify\n\nEm conflito com a skill oficial do framework, a oficial vence.\n\n1. Uma rota por arquivo, registrada como plugin.\n2. Toda entrada é validada com zod.\n3. Erro de domínio responde em application/problem+json.\n4. Rota se testa com app.inject()."
   },
   "resultado": "Bytes fixos antes e depois (meta: queda de pelo menos 50% do arquivo sempre carregado) e se a convenção de rotas passou a ser seguida em 5 tarefas de teste.",
   "quandoNao": [
    "Projeto pequeno e de um dev só: um CLAUDE.md de 40 linhas basta e skills viram overhead.",
    "Regra que precisa de garantia (segredo, comando destrutivo): use hook, permissão ou teste, não só texto."
   ],
   "armadilha": "Descrição vaga na skill (\"ajuda com backend\") faz o agente não carregá-la; escreva o gatilho de uso.",
   "repo": {
    "label": ".claude/skills (fastify-route)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/.claude/skills/fastify-route/SKILL.md"
   }
  },
  {
   "id": "P11-03",
   "title": "Deploy sem chave: Workload Identity Federation para GitHub Actions",
   "topics": [
    "D11-02"
   ],
   "cenario": "Seu pipeline faz deploy em nuvem com um JSON de service account guardado em secret do GitHub e ninguém sabe há quanto tempo essa chave existe.",
   "passos": [
    "Crie o pool e o provider OIDC apontando para <code>https://token.actions.githubusercontent.com</code>, mapeando <code>attribute.repository</code>.",
    "Restrinja o provider ao seu repositório com <code>--attribute-condition</code>.",
    "Crie a service account de deploy com só as roles necessárias e dê <code>roles/iam.workloadIdentityUser</code> ao <code>principalSet</code> do repositório.",
    "No workflow, adicione <code>permissions: id-token: write</code> e o step <code>google-github-actions/auth@v3</code> com provider e service account vindos de <code>vars</code>.",
    "Apague o secret com o JSON e rode o deploy; depois tente o mesmo em um fork diferente para confirmar que a condição bloqueia.",
    "Confirme com <code>gh secret list</code> e <code>gcloud iam service-accounts keys list</code>."
   ],
   "code": {
    "lang": "bash",
    "src": "gcloud iam workload-identity-pools create github-actions-pool --location=global\n\ngcloud iam workload-identity-pools providers create-oidc github-actions-provider \\\n  --location=global --workload-identity-pool=github-actions-pool \\\n  --issuer-uri=https://token.actions.githubusercontent.com \\\n  --attribute-mapping=\"google.subject=assertion.sub,attribute.repository=assertion.repository\" \\\n  --attribute-condition=\"assertion.repository=='OWNER/REPO'\"\n\ngcloud iam service-accounts add-iam-policy-binding deployer@PROJECT.iam.gserviceaccount.com \\\n  --role=roles/iam.workloadIdentityUser \\\n  --member=\"principalSet://iam.googleapis.com/projects/NUMBER/locations/global/workloadIdentityPools/github-actions-pool/attribute.repository/OWNER/REPO\""
   },
   "resultado": "Contagem de chaves estáticas: <code>gh secret list</code> sem o JSON e <code>keys list</code> sem chaves gerenciadas pelo usuário (meta: 0); deploy verde no repo certo e falha de autenticação no fork errado. Comandos no padrão da documentação do Google, não extraídos do repo (o repo guarda só o resultado no README).",
   "quandoNao": [
    "Provedor de CI sem emissor OIDC suportado: nesse caso, chave com rotação curta e permissão mínima.",
    "Projeto descartável de estudo em que o tempo de configurar supera o risco (ainda assim, prefira não versionar chave)."
   ],
   "armadilha": "Provider sem <code>attribute-condition</code> aceita qualquer repositório que o GitHub assine; sempre prenda a um repo.",
   "repo": {
    "label": "infra/README.md (WIF) e .github/workflows/deploy.yml",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/infra/README.md"
   }
  },
  {
   "id": "P11-04",
   "title": "Teardown em ordem de custo para não pagar por infra esquecida",
   "topics": [
    "D11-02"
   ],
   "cenario": "Projeto de estudo termina e ninguém lembra de apagar o banco, que segue cobrando por tamanho reservado.",
   "passos": [
    "Liste os recursos criados e marque os que cobram parado (instância de banco) e os que cobram por uso (serverless).",
    "Ordene o desmonte começando pelo custo fixo: banco, depois serviço, registry, segredos, federação e service account.",
    "Exija confirmação digitando o identificador do projeto antes de qualquer comando.",
    "Rode e confira com <code>gcloud sql instances list</code> vazio.",
    "No dia seguinte, abra o relatório de custos e confirme que a linha do banco zerou."
   ],
   "code": {
    "lang": "bash",
    "src": "gcloud sql instances delete ai-researcher-db --project \"$PROJECT_ID\" --quiet\ngcloud run services delete ai-researcher-api --region us-central1 --project \"$PROJECT_ID\" --quiet\ngcloud artifacts repositories delete ai-researcher --location us-central1 --project \"$PROJECT_ID\" --quiet\ngcloud iam workload-identity-pools delete github-actions-pool --location=global --project \"$PROJECT_ID\" --quiet"
   },
   "resultado": "Custo diário da instância de banco igual a zero no relatório do dia seguinte e <code>gcloud sql instances list</code> vazio.",
   "quandoNao": [
    "Ambiente compartilhado com outros times: apagar por nome fixo pode derrubar recurso alheio.",
    "Produção real: use fluxo de PR e backup antes, não script de confirmação simples."
   ],
   "armadilha": "Apagar primeiro o que é barato e deixar o banco por último; se o script falhar no meio, o custo fixo continua.",
   "repo": {
    "label": "scripts/destroy.ts",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/scripts/destroy.ts"
   }
  },
  {
   "id": "P11-05",
   "title": "Parágrafo indexável por template com teste de igualdade exata da string gerada",
   "topics": [
    "D11-03"
   ],
   "cenario": "Seu RAG indexa texto gerado por LLM a partir de uma planilha e, de vez em quando, um número muda de lugar ou ganha uma casa decimal a mais.",
   "passos": [
    "Defina o schema canônico com os campos numéricos já em reais (valor cheio, não abreviado).",
    "Escreva <code>buildParagraph(indicator, comparisons)</code> como função pura, com formatação <code>Intl.NumberFormat('pt-BR')</code>.",
    "Omita a cláusula de comparação quando o dado não existe; nunca aproxime.",
    "Crie o teste com uma entrada fixa e a saída esperada literal (mesma entrada, mesma saída byte a byte).",
    "Rode a geração duas vezes e compare os arquivos com <code>diff</code>."
   ],
   "code": {
    "lang": "ts",
    "src": "interface Indicator {\n  companyName: string;\n  period: string;\n  revenue: number;\n  netIncome: number;\n}\n\nconst oneDecimal = new Intl.NumberFormat('pt-BR', {\n  minimumFractionDigits: 1,\n  maximumFractionDigits: 1,\n});\n\nfunction formatMoney(value: number): string {\n  return value >= 1_000_000_000\n    ? `R$ ${oneDecimal.format(value / 1_000_000_000)} bilhões`\n    : `R$ ${oneDecimal.format(value / 1_000_000)} milhões`;\n}\n\nexport function buildParagraph(indicator: Indicator, previousRevenue?: number): string {\n  const comparison =\n    previousRevenue === undefined\n      ? ''\n      : `, variação de ${oneDecimal.format(((indicator.revenue - previousRevenue) / Math.abs(previousRevenue)) * 100)}%`;\n  const margin = (indicator.netIncome / indicator.revenue) * 100;\n  return `No ${indicator.period}, a ${indicator.companyName} reportou receita líquida de ${formatMoney(indicator.revenue)}${comparison}. O lucro líquido foi de ${formatMoney(indicator.netIncome)}, com margem líquida de ${oneDecimal.format(margin)}%.`;\n}"
   },
   "resultado": "Diff vazio entre duas execuções (meta: 0 linhas diferentes) e custo de LLM da etapa igual a zero; o teste de igualdade exata quebra se alguém mudar o formato.",
   "quandoNao": [
    "Texto narrativo ou qualitativo (notícias, teses): o template não cobre, e a LLM é a ferramenta certa.",
    "Corpus com poucos documentos e rótulos variáveis, em que manter o template custa mais que revisar à mão."
   ],
   "armadilha": "Divisão por zero ou valor negativo: use <code>Math.abs</code> no denominador e trate receita zero antes de calcular margem.",
   "repo": {
    "label": "packages/corpus/src/paragraphs (template.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/packages/corpus/src/paragraphs/template.ts"
   }
  },
  {
   "id": "P11-06",
   "title": "Coletor tolerante a arquivo ausente (404) sem engolir outros erros",
   "topics": [
    "D11-03"
   ],
   "cenario": "A fonte pública deixa de publicar um arquivo anual e o seu coletor derruba a execução inteira com um 404.",
   "passos": [
    "Crie uma classe de erro específica para 404 (<code>SourceFileNotFoundError</code>).",
    "No download, lance essa classe só quando <code>response.status === 404</code>; para outros status lance <code>Error</code> comum.",
    "No chamador, capture só a classe específica, registre um aviso com a URL e devolva resultado vazio.",
    "Defina um limiar de cobertura (ex.: 75% das entidades) para aceitar um período e registre o que ficou de fora.",
    "Teste com <code>fetch</code> falso: 404 segue com aviso, 500 estoura."
   ],
   "code": {
    "lang": "ts",
    "src": "export class SourceFileNotFoundError extends Error {\n  constructor(url: string) {\n    super(`File not found at source: ${url}`);\n    this.name = 'SourceFileNotFoundError';\n  }\n}\n\nexport async function download(url: string): Promise<Buffer> {\n  const response = await fetch(url);\n  if (response.status === 404) {\n    throw new SourceFileNotFoundError(url);\n  }\n  if (!response.ok) {\n    throw new Error(`Download failed for ${url}: HTTP ${response.status}`);\n  }\n  return Buffer.from(await response.arrayBuffer());\n}\n\nexport async function loadOrSkip(url: string): Promise<Buffer | undefined> {\n  try {\n    return await download(url);\n  } catch (error) {\n    if (error instanceof SourceFileNotFoundError) {\n      console.warn(`${error.message}, continuing with the available data`);\n      return undefined;\n    }\n    throw error;\n  }\n}"
   },
   "resultado": "Coleta termina com código 0 e aviso listando o arquivo ausente; um 500 simulado continua terminando com código diferente de zero (2 casos de teste verdes).",
   "quandoNao": [
    "Pipeline em que o arquivo ausente invalida o resultado (ex.: conciliação contábil): falhe alto.",
    "Quando ninguém lê os avisos: use métrica ou falha controlada acima de um limiar."
   ],
   "armadilha": "Capturar qualquer erro e seguir adiante esconde falha de rede; capture só a classe específica.",
   "repo": {
    "label": "packages/corpus/src/collect (fetch-cvm.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/packages/corpus/src/collect/fetch-cvm.ts"
   }
  },
  {
   "id": "P11-07",
   "title": "Health check que testa dependência real e degrada sem cair",
   "topics": [
    "D11-04"
   ],
   "cenario": "O serviço sobe em produção, o balanceador marca verde, mas o banco está inacessível e ninguém percebe até o primeiro usuário.",
   "passos": [
    "Defina o contrato de resposta com Zod em um pacote compartilhado entre API e frontend.",
    "Crie um <code>Pool</code> do <code>pg</code> com <code>connectionTimeoutMillis</code> baixo e um listener de <code>error</code> que registra em log.",
    "Implemente <code>checkDatabase()</code> com <code>SELECT 1</code> que devolve <code>false</code> em qualquer exceção.",
    "Injete <code>checkDatabase</code> no <code>build()</code> da app para testar com <code>app.inject()</code> sem banco real.",
    "Escreva dois testes: banco ok e banco falhando (resposta 200 com <code>degraded</code>, processo vivo).",
    "Derrube o Postgres local e meça o tempo de resposta do health."
   ],
   "code": {
    "lang": "ts",
    "src": "import Fastify from 'fastify';\nimport { Pool } from 'pg';\nimport { z } from 'zod';\n\nexport const healthResponseSchema = z.object({\n  status: z.enum(['ok', 'degraded']),\n  database: z.enum(['ok', 'error']),\n});\n\ninterface BuildOptions {\n  checkDatabase?: () => Promise<boolean>;\n}\n\nconst pool = new Pool({\n  connectionString: process.env.DATABASE_URL,\n  connectionTimeoutMillis: 2000,\n});\n\nasync function defaultCheckDatabase(): Promise<boolean> {\n  try {\n    await pool.query('SELECT 1');\n    return true;\n  } catch {\n    return false;\n  }\n}\n\nexport function build({ checkDatabase = defaultCheckDatabase }: BuildOptions = {}) {\n  const app = Fastify({ logger: true });\n  pool.on('error', (error) => app.log.error(error));\n\n  app.get('/api/health', async () => {\n    const databaseOk = await checkDatabase();\n    return healthResponseSchema.parse({\n      status: databaseOk ? 'ok' : 'degraded',\n      database: databaseOk ? 'ok' : 'error',\n    });\n  });\n\n  return app;\n}"
   },
   "resultado": "Com o banco parado, <code>curl -w '%{time_total}'</code> deve retornar 200 com <code>degraded</code> em até cerca de 2 s (o timeout de conexão), e o processo continua respondendo; 2 testes verdes. Snippet simplificado: o repo separa db.ts, app.ts e a rota.",
   "quandoNao": [
    "Health usado por balanceador que deve tirar a instância do ar quando o banco cai: nesse caso retorne 503 (readiness) em vez de 200.",
    "Dependências caras de checar (chamada de LLM): use health leve e checagens separadas."
   ],
   "armadilha": "Sem listener de <code>error</code> no Pool, uma queda de conexão ociosa vira exceção não tratada e derruba o processo.",
   "repo": {
    "label": "apps/api/src (app.ts, db.ts, routes/health.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed/tree/main/apps/api/src"
   }
  },
  {
   "id": "P11-08",
   "title": "Diagnosticar primeiro deploy: Cloud Run privado e liberação consciente",
   "topics": [
    "D11-04"
   ],
   "cenario": "A esteira ficou verde, a URL do Firebase abre, mas a tela mostra erro ao consultar a API.",
   "passos": [
    "Chame a URL do Cloud Run direto com <code>curl -i</code> e anote o status (403 indica serviço privado).",
    "Leia a política IAM do serviço e confirme a ausência de <code>allUsers</code> com <code>run.invoker</code>.",
    "Pergunte-se: o endpoint tem custo (LLM, banco pesado)? Se sim, não libere sem rate limit.",
    "Só para um endpoint barato, libere com <code>add-iam-policy-binding</code> e registre data e motivo no README.",
    "Repita o <code>curl</code> e depois valide de fora com o seu script de auditoria."
   ],
   "code": {
    "lang": "bash",
    "src": "SERVICE_URL=$(gcloud run services describe ai-researcher-api --region=us-central1 --format='value(status.url)')\ncurl -s -o /dev/null -w '%{http_code}\\n' \"$SERVICE_URL/api/health\"\ngcloud run services get-iam-policy ai-researcher-api --region=us-central1\ngcloud run services add-iam-policy-binding ai-researcher-api --region=us-central1 --member=allUsers --role=roles/run.invoker\ncurl -s \"$SERVICE_URL/api/health\""
   },
   "resultado": "Status HTTP passa de 403 para 200 e o corpo vira <code>{\"status\":\"ok\",\"database\":\"ok\"}</code>; o script de auditoria externa deve passar o item de endpoint público.",
   "quandoNao": [
    "Serviço com custo por requisição (LLM) e sem rate limit: mantenha privado ou ponha autenticação.",
    "Ambiente corporativo com política de organização que proíbe allUsers: use IAP ou invocador autenticado."
   ],
   "armadilha": "Liberar o serviço inteiro quando só uma rota é pública: o binding vale para o serviço todo.",
   "repo": {
    "label": "infra/README.md (Cloud Run público)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/infra/README.md"
   }
  },
  {
   "id": "P11-09",
   "title": "Índice HNSW por cosseno e medida de recall contra a busca exata",
   "topics": [
    "D11-05"
   ],
   "cenario": "Você colocou embeddings numa tabela Postgres e quer saber se o índice aproximado está devolvendo o mesmo top-5 que a busca exata antes de ir para produção.",
   "passos": [
    "Suba <code>pgvector/pgvector:pg16</code> e crie a extensão <code>vector</code>.",
    "Crie a tabela com <code>embedding vector(768)</code> e o índice <code>USING hnsw (embedding vector_cosine_ops)</code>.",
    "Carregue os documentos com o mesmo modelo que será usado na consulta e na mesma dimensão.",
    "Rode a consulta <code>ORDER BY embedding &lt;=&gt; $1 LIMIT 5</code> com o índice ativo e guarde os ids.",
    "Rode a mesma consulta com <code>SET enable_indexscan = off</code> (busca exata) e guarde os ids.",
    "Repita para 20 perguntas reais e calcule a fração de ids da busca exata que o índice devolveu."
   ],
   "code": {
    "lang": "sql",
    "src": "CREATE EXTENSION IF NOT EXISTS vector;\n\nCREATE TABLE docs (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  body text NOT NULL,\n  embedding vector(768)\n);\n\nCREATE INDEX docs_embedding_idx ON docs USING hnsw (embedding vector_cosine_ops);\n\nSELECT id, 1 - (embedding <=> $1) AS similarity\nFROM docs\nORDER BY embedding <=> $1\nLIMIT 5;\n\nSET enable_indexscan = off;\n\nSELECT id FROM docs ORDER BY embedding <=> $1 LIMIT 5;"
   },
   "resultado": "Recall@5 = ids em comum entre índice e busca exata dividido por 5, médio sobre as 20 perguntas. Abaixo de 1,0 você quantificou a perda do HNSW; com poucas linhas o planner pode nem usar o índice, então confira com EXPLAIN.",
   "quandoNao": [
    "Base de dezenas de linhas, como as 80 do projeto: o full scan já é instantâneo.",
    "Domínio em que nenhuma perda é aceitável: use tabelas relacionais e responda 'não encontrei'.",
    "Quando o modelo de embedding ainda não está definido: você reindexaria tudo depois."
   ],
   "armadilha": "Comparar índice contra índice (a mesma consulta duas vezes) em vez de contra a busca exata.",
   "repo": {
    "label": "packages/agent (src/db/schema.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent"
   }
  },
  {
   "id": "P11-10",
   "title": "Seed de embeddings em lotes de 10 com guarda de dimensão",
   "topics": [
    "D11-05"
   ],
   "cenario": "Seu script de carga chama o provedor de embeddings uma vez por documento e já gravou vetores com tamanho errado depois de trocar de modelo.",
   "passos": [
    "Extraia uma função <code>inBatches</code> pura e teste com tamanhos que não dividem o total.",
    "Receba o cliente de embeddings por parâmetro (<code>embedDocuments</code>) para trocar por fake no teste.",
    "Chame o provedor uma vez por lote de 10 textos, não uma vez por texto.",
    "Valide que cada vetor tem exatamente 768 posições antes de gravar e lance erro explícito se não tiver.",
    "Grave com upsert por chave natural e rode o seed duas vezes: a contagem de linhas não deve mudar."
   ],
   "code": {
    "lang": "ts",
    "src": "export interface DocumentEmbedder {\n  embedDocuments(texts: string[]): Promise<number[][]>;\n}\n\nexport const EMBEDDING_DIMENSIONS = 768;\nexport const BATCH_SIZE = 10;\n\nexport function inBatches<T>(items: readonly T[], size: number): T[][] {\n  const batches: T[][] = [];\n  for (let index = 0; index < items.length; index += size) {\n    batches.push(items.slice(index, index + size));\n  }\n  return batches;\n}\n\nexport async function embedAll(\n  texts: readonly string[],\n  embedder: DocumentEmbedder,\n): Promise<number[][]> {\n  const vectors: number[][] = [];\n  for (const batch of inBatches(texts, BATCH_SIZE)) {\n    const batchVectors = await embedder.embedDocuments(batch);\n    for (const vector of batchVectors) {\n      if (vector.length !== EMBEDDING_DIMENSIONS) {\n        throw new Error(`expected ${EMBEDDING_DIMENSIONS} dimensions, got ${vector.length}`);\n      }\n      vectors.push(vector);\n    }\n  }\n  return vectors;\n}"
   },
   "resultado": "Número de chamadas ao provedor = ceil(N / 10) (para 80 documentos, 8) e contagem de linhas idêntica após rodar o seed duas vezes. O repo faz o lote e o upsert em <code>seed/run.ts</code>; a guarda de dimensão é adição deste exercício.",
   "quandoNao": [
    "Provedor com limite de lote menor que 10: ajuste o tamanho ao limite documentado.",
    "Carga de uma única linha: lote não agrega nada.",
    "Embedding local barato e sem rede: o ganho do lote some."
   ],
   "armadilha": "Validar a dimensão só no banco: o erro vem tarde e com mensagem pior do que a sua.",
   "repo": {
    "label": "packages/agent (src/seed/run.ts, lotes.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent"
   }
  },
  {
   "id": "P11-11",
   "title": "Nó de RAG como factory testável com fakes",
   "topics": [
    "D11-06"
   ],
   "cenario": "Seu nó de recuperação importa o cliente de embeddings e o pool do banco, então todo teste exige credencial e Postgres.",
   "passos": [
    "Defina interfaces mínimas: só <code>embedQuery</code> e uma função <code>search(embedding, k)</code>.",
    "Transforme o nó numa factory <code>makeRetrieveNode(embeddings, search)</code> sem nenhum import de cliente concreto.",
    "Use <code>topK ?? 5</code> como default e aceite override no estado.",
    "Escreva o teste com <code>vi.fn()</code> como fake e assegure que <code>search</code> recebe o vetor do fake e o k certo.",
    "Rode a suíte sem rede e sem banco e meça o tempo."
   ],
   "code": {
    "lang": "ts",
    "src": "export interface EmbeddingsClient {\n  embedQuery(text: string): Promise<number[]>;\n}\n\nexport type Search<T> = (embedding: number[], k: number) => Promise<T[]>;\n\nconst DEFAULT_TOP_K = 5;\n\nexport function makeRetrieveNode<T>(embeddings: EmbeddingsClient, search: Search<T>) {\n  return async (state: { question: string; topK?: number }): Promise<{ documents: T[] }> => {\n    const embedding = await embeddings.embedQuery(state.question);\n    const documents = await search(embedding, state.topK ?? DEFAULT_TOP_K);\n    return { documents };\n  };\n}\n\nimport { expect, it, vi } from 'vitest';\n\nit('searches with the question embedding and the default k', async () => {\n  const embeddings: EmbeddingsClient = { embedQuery: vi.fn(async () => [0.1, 0.2]) };\n  const search = vi.fn(async () => [{ id: 'a' }]);\n  const node = makeRetrieveNode(embeddings, search);\n\n  const result = await node({ question: 'revenue?' });\n\n  expect(search).toHaveBeenCalledWith([0.1, 0.2], 5);\n  expect(result.documents).toEqual([{ id: 'a' }]);\n});"
   },
   "resultado": "Suíte do nó roda em milissegundos sem credencial nem Postgres; troque o fake por outro provedor sem tocar no nó. Critério: zero imports de cliente concreto dentro do arquivo do nó.",
   "quandoNao": [
    "Script descartável de uma execução só.",
    "Quando só existe um fornecedor e nenhum teste: a abstração é custo sem retorno.",
    "Para esconder lógica de negócio dentro do fake: o fake deve ser burro."
   ],
   "armadilha": "Fake que replica a lógica do banco e passa a testar o fake, não o nó.",
   "repo": {
    "label": "packages/agent (src/nodes/retrieve.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/nodes"
   }
  },
  {
   "id": "P11-12",
   "title": "Juiz de suficiência com saída estruturada e regra explícita",
   "topics": [
    "D11-06"
   ],
   "cenario": "Seu RAG responde com base em contexto fraco porque ninguém decide se o que foi recuperado basta; a LLM em texto livre ora diz 'sim', ora 'talvez'.",
   "passos": [
    "Defina o schema zod <code>{ sufficient: boolean, missingAspects: string[] }</code>.",
    "Escreva o prompt como função pura que recebe pergunta e documentos e imprime '(nenhum documento encontrado)' quando a lista é vazia.",
    "Escreva a regra do seu domínio no prompt: o que o contexto cobre e o que nunca cobre.",
    "Receba o cliente por parâmetro com <code>withStructuredOutput(schema).invoke(prompt)</code>.",
    "Monte 10 perguntas rotuladas (5 cobertas, 5 não) e compare a classificação com o rótulo."
   ],
   "code": {
    "lang": "ts",
    "src": "import { z } from 'zod';\n\nexport const gradeSchema = z.object({\n  sufficient: z.boolean(),\n  missingAspects: z.array(z.string()),\n});\n\nexport type Grade = z.infer<typeof gradeSchema>;\n\nexport interface GradeClient {\n  withStructuredOutput(schema: typeof gradeSchema): {\n    invoke(prompt: string): Promise<Grade>;\n  };\n}\n\nexport function gradePrompt(question: string, documents: string[]): string {\n  const context = documents.length > 0 ? documents.join('\\n') : '(no documents found)';\n  return [\n    'Decide if the context answers the question.',\n    'The context only has numeric indicators per company and quarter.',\n    'Qualitative questions are always insufficient, even for the right company.',\n    `Context:\\n${context}`,\n    `Question: ${question}`,\n  ].join('\\n\\n');\n}\n\nexport function makeGradeNode(llm: GradeClient) {\n  return async (state: { question: string; documents: string[] }): Promise<Grade> => {\n    const structured = llm.withStructuredOutput(gradeSchema);\n    return structured.invoke(gradePrompt(state.question, state.documents));\n  };\n}"
   },
   "resultado": "Acurácia de classificação nas 10 perguntas (ex.: 9/10) e quantos falsos 'suficiente' ocorreram; falso suficiente é o erro caro, pois responde sem a informação. Ajuste a regra e meça de novo.",
   "quandoNao": [
    "Quando uma regra determinística resolve (ex.: período pedido não existe na base).",
    "Quando o custo de uma chamada extra por pergunta é inaceitável.",
    "Sem conjunto rotulado para calibrar: você não sabe se a regra está aberta ou fechada demais."
   ],
   "armadilha": "Regra aberta demais: tudo é suficiente e o agente nunca busca a informação que falta.",
   "repo": {
    "label": "packages/agent (src/nodes/grade.ts, src/prompts/grade.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src"
   }
  },
  {
   "id": "P11-13",
   "title": "Adapter de provedor externo com fábrica por env e fetch fake",
   "topics": [
    "D11-07"
   ],
   "cenario": "Seu agente chama a API de busca direto em vários lugares; o provedor ficou caro e trocar exige tocar em todo o código, e os testes gastam cota.",
   "passos": [
    "Defina <code>SearchProvider</code> com um único método e o tipo <code>SearchResult { title, snippet, url }</code>.",
    "Implemente um adapter por fornecedor com <code>fetch</code> nativo e timeout, mapeando o JSON do fornecedor para o contrato.",
    "Crie a fábrica que lê <code>SEARCH_PROVIDER</code> (default <code>serper</code>), valida a chave e lança erro claro se faltar.",
    "Teste o adapter com <code>vi.stubGlobal('fetch', ...)</code> devolvendo um JSON do fornecedor.",
    "Troque de fornecedor só alterando a env e confira que nenhum arquivo do agente mudou."
   ],
   "code": {
    "lang": "ts",
    "src": "export interface SearchResult {\n  title: string;\n  snippet: string;\n  url: string;\n}\n\nexport interface SearchProvider {\n  search(query: string): Promise<SearchResult[]>;\n}\n\ninterface SerperResponse {\n  organic?: { title: string; snippet: string; link: string }[];\n}\n\nexport function makeSerperProvider(apiKey: string): SearchProvider {\n  return {\n    async search(query) {\n      const response = await fetch('https://google.serper.dev/search', {\n        method: 'POST',\n        headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },\n        body: JSON.stringify({ q: query }),\n        signal: AbortSignal.timeout(10_000),\n      });\n      if (!response.ok) throw new Error(`serper responded ${response.status}`);\n      const body = (await response.json()) as SerperResponse;\n      return (body.organic ?? []).map((item) => ({\n        title: item.title,\n        snippet: item.snippet,\n        url: item.link,\n      }));\n    },\n  };\n}\n\nexport function createSearchProvider(env: NodeJS.ProcessEnv = process.env): SearchProvider {\n  const provider = env.SEARCH_PROVIDER ?? 'serper';\n  if (provider === 'serper') {\n    if (!env.SERPER_API_KEY) throw new Error('SERPER_API_KEY is not set');\n    return makeSerperProvider(env.SERPER_API_KEY);\n  }\n  throw new Error(`unknown SEARCH_PROVIDER: ${provider}`);\n}"
   },
   "resultado": "Quantidade de arquivos alterados ao trocar de fornecedor (meta: 1, o adapter novo, mais a env) e zero chamadas reais de rede na suíte de testes.",
   "quandoNao": [
    "Fornecedor único e estável sem plano de troca e sem testes.",
    "Quando o contrato mínimo perderia dados de que o consumidor precisa.",
    "Para embrulhar SDK que já expõe uma interface padronizada."
   ],
   "armadilha": "Vazar o formato do fornecedor (campo <code>organic</code>) para fora do adapter.",
   "repo": {
    "label": "packages/agent (src/search/)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/search"
   }
  },
  {
   "id": "P11-14",
   "title": "Cache vetorial de web com TTL aplicado na leitura",
   "topics": [
    "D11-07"
   ],
   "cenario": "Você grava resultados de busca no RAG para economizar chamadas, mas o agente continua citando uma notícia de semanas atrás.",
   "passos": [
    "Crie a tabela com <code>fetched_at</code> e <code>expires_at</code> e índice HNSW por cosseno.",
    "Calcule <code>expires_at = fetched_at + ttl_days</code> (default 7) na escrita.",
    "Filtre <code>expires_at &gt; now()</code> na consulta de similaridade, não por job.",
    "Grave um registro por chunk de ~1000 caracteres com overlap de 100.",
    "Insira um registro com <code>expires_at</code> no passado e confirme que ele não aparece no top-k.",
    "Conte as linhas expiradas e decida se vale um DELETE periódico."
   ],
   "code": {
    "lang": "sql",
    "src": "CREATE TABLE web_documents (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  query text NOT NULL,\n  title text NOT NULL,\n  content text NOT NULL,\n  source_url text NOT NULL,\n  fetched_at timestamptz NOT NULL,\n  expires_at timestamptz NOT NULL,\n  embedding vector(768)\n);\n\nCREATE INDEX web_documents_embedding_idx ON web_documents USING hnsw (embedding vector_cosine_ops);\n\nSELECT id, title, 1 - (embedding <=> $1) AS similarity\nFROM web_documents\nWHERE expires_at > now()\nORDER BY embedding <=> $1\nLIMIT 5;\n\nSELECT count(*) FROM web_documents WHERE expires_at <= now();"
   },
   "resultado": "Registro expirado ausente do top-5 (teste binário) e contagem de linhas expiradas acumuladas; se a contagem cresce sem parar, agende a limpeza. Perguntas repetidas dentro do TTL devem fazer zero buscas web.",
   "quandoNao": [
    "Dado perene (como o corpus CVM): TTL só adiciona perda.",
    "Dado que precisa ser fresco a cada pergunta (cotação em tempo real).",
    "Fonte pouco confiável que não deveria entrar no contexto sem revisão."
   ],
   "armadilha": "Reinserir o mesmo conteúdo a cada expiração sem remover o antigo: a tabela só cresce.",
   "repo": {
    "label": "packages/agent (src/db/retrieve-similar.ts, src/nodes/web-search.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src"
   }
  },
  {
   "id": "P11-15",
   "title": "Guard de loop com reducer no estado e teste do trace",
   "topics": [
    "D11-08"
   ],
   "cenario": "Seu agente de pesquisa tenta de novo enquanto 'não está bom o bastante' e, num caso ruim, gastou centenas de chamadas de LLM numa só requisição.",
   "passos": [
    "Declare o estado com <code>Annotation.Root</code> e um campo <code>iterations</code> com reducer de soma e default 0.",
    "Faça o nó avaliador devolver <code>iterations: 1</code> a cada passada.",
    "Escreva a função de roteamento pura: suficiente ou <code>iterations &gt;= MAX_ITERATIONS</code> vai ao fim, senão ao nó de ação.",
    "Ligue o nó de ação de volta ao nó de recuperação.",
    "Teste com um avaliador fake que sempre devolve insuficiente e use <code>stream</code> para coletar a trilha de nós.",
    "Assegure que o avaliador rodou exatamente <code>MAX_ITERATIONS</code> vezes."
   ],
   "code": {
    "lang": "ts",
    "src": "import { Annotation, END, START, StateGraph } from '@langchain/langgraph';\n\nexport const MAX_ITERATIONS = 2;\n\nconst State = Annotation.Root({\n  question: Annotation<string>,\n  sufficient: Annotation<boolean>({\n    reducer: (_previous, next) => next,\n    default: () => false,\n  }),\n  iterations: Annotation<number>({\n    reducer: (previous, next) => previous + next,\n    default: () => 0,\n  }),\n});\n\nfunction nextNode(state: typeof State.State): 'act' | typeof END {\n  if (state.sufficient) return END;\n  if (state.iterations >= MAX_ITERATIONS) return END;\n  return 'act';\n}\n\nexport function buildLoop(isSufficient: () => boolean) {\n  return new StateGraph(State)\n    .addNode('retrieve', () => ({}))\n    .addNode('grade', () => ({ sufficient: isSufficient(), iterations: 1 }))\n    .addNode('act', () => ({}))\n    .addEdge(START, 'retrieve')\n    .addEdge('retrieve', 'grade')\n    .addConditionalEdges('grade', nextNode)\n    .addEdge('act', 'retrieve')\n    .compile();\n}\n\nexport async function trace(isSufficient: () => boolean): Promise<string[]> {\n  const visited: string[] = [];\n  for await (const chunk of await buildLoop(isSufficient).stream({ question: 'q' })) {\n    visited.push(...Object.keys(chunk));\n  }\n  return visited;\n}"
   },
   "resultado": "Com avaliador sempre insuficiente, a trilha deve ser retrieve, grade, act, retrieve, grade e o número de 'grade' igual a MAX_ITERATIONS. Registre também o custo máximo por requisição: MAX_ITERATIONS chamadas de avaliação mais (MAX_ITERATIONS - 1) buscas.",
   "quandoNao": [
    "Fluxo linear sem retry: não há loop para limitar.",
    "Quando o critério de parada é por orçamento de tokens: use um guard de custo em vez de contagem.",
    "Agentes de uma só chamada de ferramenta."
   ],
   "armadilha": "Deixar o contador numa variável de módulo: requisições concorrentes se misturam.",
   "repo": {
    "label": "packages/agent (src/graph.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src"
   }
  },
  {
   "id": "P11-16",
   "title": "Guardrail de saída por regex com casos que passam e que não podem passar",
   "topics": [
    "D11-09"
   ],
   "cenario": "Seu assistente em domínio regulado não pode emitir conselho, e o system prompt sozinho já falhou em testes de red team.",
   "passos": [
    "Liste 20 frases proibidas (variações de verbo, pessoa e tempo) e 20 frases legítimas do domínio ('receita de vendas').",
    "Escreva padrões que mirem a forma da recomendação (verbo em 1ª pessoa, imperativo com objeto de investimento), não palavras soltas.",
    "Aplique o filtro depois da resposta da LLM e troque o texto inteiro por um aviso fixo quando casar.",
    "Mantenha as citações e o aviso de contexto incompleto fora do filtro.",
    "Rode os dois conjuntos e registre falsos negativos (passaram) e falsos positivos (bloqueadas).",
    "Cada escape vira caso de teste novo."
   ],
   "code": {
    "lang": "ts",
    "src": "const RECOMMENDATION_PATTERNS: readonly RegExp[] = [\n  /\\brecomend(o|amos|aria|ariamos|aríamos)\\b/i,\n  /\\bsugir(o|imos)\\b|\\bsugeri(ria|riamos)\\b/i,\n  /\\baconselh(o|amos)\\b|\\baconselhar(ia|iamos)\\b/i,\n  /\\bvale a pena (comprar|vender|manter)\\b/i,\n  /\\b(compre|venda|mantenha)\\s+(essa|esta|a)\\s*(ação|posição|papel)/i,\n];\n\nexport const GUARDRAIL_NOTICE =\n  'This assistant only reports public data and never advises on investments.';\n\nexport function containsRecommendation(text: string): boolean {\n  return RECOMMENDATION_PATTERNS.some((pattern) => pattern.test(text));\n}\n\nexport function buildAnswer(llmText: string, sources: string[]): string {\n  const body = containsRecommendation(llmText) ? GUARDRAIL_NOTICE : llmText.trim();\n  return sources.length > 0 ? `${body}\\n\\nSources:\\n${sources.join('\\n')}` : body;\n}"
   },
   "resultado": "Taxa de falsos negativos nas 20 frases proibidas (meta: 0) e de falsos positivos nas 20 legítimas (meta: 0). No exemplo do repo, 'sugeriria' e 'aconselharia' escapavam; este snippet já as cobre.",
   "quandoNao": [
    "Quando o risco exige entender sentido (paráfrases): use classificador ou segundo modelo além da regex.",
    "Idiomas ou domínios sem lista fechada de verbos.",
    "Como única defesa para conteúdo de segurança crítica."
   ],
   "armadilha": "Bloquear a palavra solta ('venda') e derrubar respostas legítimas sobre receita de vendas.",
   "repo": {
    "label": "packages/agent (src/answer/format-resposta.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/answer"
   }
  },
  {
   "id": "P11-17",
   "title": "Rota POST que transmite um evento SSE por etapa do grafo",
   "topics": [
    "D11-09"
   ],
   "cenario": "Seu agente leva 8 a 15 s e o front fica em branco até o fim; atrás de um proxy gerenciado a resposta chega toda de uma vez.",
   "passos": [
    "Receba o grafo por uma interface mínima (<code>GraphLike</code> com só <code>stream</code>).",
    "Valide o corpo antes de abrir o stream, para ainda poder responder 400 ou 429.",
    "Escreva <code>Content-Type: text/event-stream</code>, <code>Cache-Control: no-cache, no-transform</code> e <code>Connection: keep-alive</code>.",
    "Para cada chunk do <code>stream</code>, emita <code>data: &lt;json&gt;\\n\\n</code> por nó.",
    "No catch emita <code>event: error</code> com mensagem fixa e finalize a conexão no finally.",
    "Teste com um grafo fake e meça o tempo até o primeiro evento no ambiente real."
   ],
   "code": {
    "lang": "ts",
    "src": "import type { FastifyPluginAsync } from 'fastify';\n\nexport interface GraphLike {\n  stream(input: { question: string }): Promise<AsyncIterable<Record<string, unknown>>>;\n}\n\nexport const chatRoute: FastifyPluginAsync<{ graph: GraphLike }> = async (app, { graph }) => {\n  app.post('/chat', async (request, reply) => {\n    const { question } = request.body as { question: string };\n\n    reply.raw.writeHead(200, {\n      'Content-Type': 'text/event-stream',\n      'Cache-Control': 'no-cache, no-transform',\n      Connection: 'keep-alive',\n    });\n\n    try {\n      for await (const chunk of await graph.stream({ question })) {\n        for (const [node, update] of Object.entries(chunk)) {\n          reply.raw.write(`data: ${JSON.stringify({ node, update })}\\n\\n`);\n        }\n      }\n    } catch (error) {\n      request.log.error(error);\n      reply.raw.write(`event: error\\ndata: ${JSON.stringify({ message: 'request failed' })}\\n\\n`);\n    } finally {\n      reply.raw.end();\n    }\n  });\n};"
   },
   "resultado": "Tempo até o primeiro evento (meta: poucos segundos, bem abaixo do tempo total) e número de eventos igual ao de nós visitados. Se o primeiro evento chega junto do último, algo no caminho está bufferizando.",
   "quandoNao": [
    "Resposta curta (menos de 1 s): JSON normal basta.",
    "Precisa de canal bidirecional: use WebSocket.",
    "Quer streaming por token: o repo emite por nó, não por token."
   ],
   "armadilha": "Validar o corpo ou checar cota depois do <code>writeHead</code>: a resposta já é 200 e o erro vira evento, não status.",
   "repo": {
    "label": "apps/api (src/routes/chat.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api/src/routes"
   }
  },
  {
   "id": "P11-18",
   "title": "Testar um fluxo com LLM sem rede usando fakes injetados",
   "topics": [
    "D11-10"
   ],
   "cenario": "Seu fluxo chama LLM, embeddings e uma API de busca paga; os testes ficam flaky e custam token a cada CI.",
   "passos": [
    "Liste as dependências externas da função e passe todas por parâmetro (interfaces mínimas, não classes do SDK).",
    "Crie um fake de LLM que devolve um JSON fixo por <code>vi.fn().mockResolvedValue</code>.",
    "Escreva um teste de caminho feliz e um de falha (<code>mockRejectedValue</code>) para a busca.",
    "Rode a suíte 20 vezes seguidas em loop e confirme zero variação.",
    "Meça o tempo e o custo da suíte antes e depois."
   ],
   "code": {
    "lang": "ts",
    "src": "import { expect, it, vi } from 'vitest';\n\ninterface SearchProvider {\n  search(query: string): Promise<string[]>;\n}\n\ninterface ChatModel {\n  invoke(prompt: string): Promise<{ content: string }>;\n}\n\nexport function makeAnswerFlow(search: SearchProvider, model: ChatModel) {\n  return async (question: string): Promise<string> => {\n    const hits = await search.search(question).catch(() => [] as string[]);\n    const reply = await model.invoke(`${question}\\n${hits.join('\\n')}`);\n    return reply.content;\n  };\n}\n\nit('answers even when search fails', async () => {\n  const search: SearchProvider = { search: vi.fn().mockRejectedValue(new Error('down')) };\n  const model: ChatModel = { invoke: vi.fn().mockResolvedValue({ content: 'ok' }) };\n  expect(await makeAnswerFlow(search, model)('q')).toBe('ok');\n});"
   },
   "resultado": "Suíte determinística: 20 execuções seguidas com o mesmo resultado, sem chamada de rede e com custo de token zero.",
   "quandoNao": [
    "Quando o objetivo é medir qualidade da resposta da LLM: use um eval com modelo real, não fake.",
    "Código trivial sem fronteira externa: um teste padrão basta, sem injeção.",
    "Protótipo descartável em que refatorar para injeção custa mais que o teste."
   ],
   "armadilha": "Fake que sempre devolve a resposta ideal esconde bugs de parsing da saída real do modelo.",
   "repo": {
    "label": "packages/agent (graph.test.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src"
   }
  },
  {
   "id": "P11-19",
   "title": "Fixture de bytes latin1 reais para um parser de CSV",
   "topics": [
    "D11-10"
   ],
   "cenario": "Você consome CSV de um órgão público em ISO-8859-1 e um refactor trocou a leitura para UTF-8, quebrando acentos em produção sem teste que acuse.",
   "passos": [
    "Gere o arquivo com <code>iconv -f utf8 -t latin1</code> a partir de um CSV curto com acentos e salve em <code>__fixtures__/</code>.",
    "Confirme com <code>file</code> que ele é ISO-8859 e não UTF-8.",
    "Leia o arquivo no teste com <code>readFileSync(path, 'latin1')</code> a cada execução.",
    "Asserte um campo acentuado (ex.: <code>'Prejuízo'</code>) e a chave do cabeçalho.",
    "Mude temporariamente a leitura para utf8 e veja o teste falhar (prova de que o teste detecta o bug)."
   ],
   "code": {
    "lang": "ts",
    "src": "import { readFileSync } from 'node:fs';\nimport { expect, it } from 'vitest';\n\nfunction parseCsv(path: string): Record<string, string>[] {\n  const [headerLine, ...rows] = readFileSync(path, 'latin1')\n    .split(/\\r?\\n/)\n    .filter((line) => line.length > 0);\n  const header = headerLine.split(';');\n  return rows.map((row) => {\n    const cells = row.split(';');\n    return Object.fromEntries(header.map((key, i) => [key, cells[i] ?? '']));\n  });\n}\n\nit('decodes latin1 accents', () => {\n  const rows = parseCsv(new URL('./__fixtures__/sample.csv', import.meta.url).pathname);\n  expect(rows[0].DS_CONTA).toBe('Lucro/Prejuízo');\n});"
   },
   "resultado": "O teste passa com latin1 e falha com utf8: 1 falha provocada confirma que ele pega a regressão de encoding.",
   "quandoNao": [
    "Fonte que já entrega UTF-8 garantido por contrato.",
    "CSV com aspas e quebras de linha embutidas: use uma lib de parsing, o split simples não serve.",
    "Dado sensível: nunca copie linhas reais com dados pessoais para a fixture."
   ],
   "armadilha": "Editar a fixture no editor e salvar em UTF-8 sem perceber destrói os bytes latin1 e o teste passa a validar nada.",
   "repo": {
    "label": "packages/corpus/src/collect (parse-csv.test.ts, __fixtures__)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/corpus/src/collect"
   }
  },
  {
   "id": "P11-20",
   "title": "Decorator de retry com backoff e circuit breaker testável",
   "topics": [
    "D11-11"
   ],
   "cenario": "Dois clientes HTTP de busca precisam do mesmo retry e do mesmo breaker; hoje cada um tem um loop próprio e ninguém testou o resfriamento.",
   "passos": [
    "Defina a interface comum <code>SearchProvider</code> com um único método <code>search</code>.",
    "Escreva <code>withResilience(provider, options)</code> com <code>maxAttempts=3</code>, <code>baseBackoffMs=200</code>, <code>failureThreshold=3</code> e <code>cooldownMs=30000</code>.",
    "Injete <code>sleep</code> e <code>now</code> para não esperar tempo real.",
    "Teste: 1 falha isolada é absorvida; backoff registrado é <code>[200, 400]</code>; após o limiar a chamada seguinte falha sem tocar o provider; após o resfriamento volta a chamar.",
    "Aplique o mesmo decorator aos dois providers e confirme que nenhum deles foi alterado."
   ],
   "code": {
    "lang": "ts",
    "src": "export interface SearchProvider {\n  search(query: string): Promise<string[]>;\n}\n\nexport class CircuitOpenError extends Error {\n  constructor() {\n    super('circuit open');\n    this.name = 'CircuitOpenError';\n  }\n}\n\ninterface Options {\n  maxAttempts?: number;\n  baseBackoffMs?: number;\n  failureThreshold?: number;\n  cooldownMs?: number;\n  sleep?: (ms: number) => Promise<void>;\n  now?: () => number;\n}\n\nexport function withResilience(provider: SearchProvider, options: Options = {}): SearchProvider {\n  const maxAttempts = options.maxAttempts ?? 3;\n  const baseBackoffMs = options.baseBackoffMs ?? 200;\n  const failureThreshold = options.failureThreshold ?? 3;\n  const cooldownMs = options.cooldownMs ?? 30_000;\n  const sleep = options.sleep ?? ((ms: number) => new Promise<void>((r) => setTimeout(r, ms)));\n  const now = options.now ?? Date.now;\n  let consecutiveFailures = 0;\n  let openUntil: number | undefined;\n\n  return {\n    async search(query) {\n      if (openUntil !== undefined && now() < openUntil) throw new CircuitOpenError();\n      let lastError: unknown;\n      for (let attempt = 1; attempt <= maxAttempts; attempt++) {\n        try {\n          const result = await provider.search(query);\n          consecutiveFailures = 0;\n          openUntil = undefined;\n          return result;\n        } catch (error) {\n          lastError = error;\n          if (attempt < maxAttempts) await sleep(baseBackoffMs * 2 ** (attempt - 1));\n        }\n      }\n      consecutiveFailures += 1;\n      if (consecutiveFailures >= failureThreshold) openUntil = now() + cooldownMs;\n      throw lastError;\n    },\n  };\n}"
   },
   "resultado": "Teste com relógio falso: 4 asserts (absorve falha, backoff [200, 400], circuito aberto sem tocar o provider, volta após 30 000 ms) rodando em milissegundos, sem espera real.",
   "quandoNao": [
    "Quando o framework ou o cliente HTTP já traz retry e breaker configuráveis: use o que existe.",
    "Operações não idempotentes (pagamento): retry automático pode cobrar duas vezes.",
    "Chamada interna e barata sem terceiro instável: o decorator é custo sem retorno."
   ],
   "armadilha": "Retry em erro permanente (4xx) só adiciona latência: classifique o que é transitório antes de repetir.",
   "repo": {
    "label": "packages/agent/src/search (resilient-search-provider.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/search"
   }
  },
  {
   "id": "P11-21",
   "title": "Degradação graciosa por item com teste de ponta a ponta",
   "topics": [
    "D11-11"
   ],
   "cenario": "Seu pipeline consulta N queries numa API externa; um erro em qualquer uma derruba a resposta inteira mesmo com dados internos suficientes.",
   "passos": [
    "Envolva só a chamada externa de cada item em <code>try/catch</code> e use <code>continue</code>.",
    "Faça a etapa seguinte aceitar entrada vazia e sinalizar contexto incompleto.",
    "Escreva um teste em que a API falha sempre e a saída ainda contém a resposta e o aviso.",
    "Escreva o contraexemplo: uma operação de escrita crítica que continua propagando o erro.",
    "Meça: 100% das execuções com API falhando terminam com resposta, e 0% das falhas críticas são engolidas."
   ],
   "code": {
    "lang": "ts",
    "src": "export async function collectWebDocs(\n  queries: string[],\n  search: (query: string) => Promise<string[]>,\n): Promise<string[]> {\n  const docs: string[] = [];\n  for (const query of queries) {\n    try {\n      docs.push(...(await search(query)).slice(0, 3));\n    } catch {\n      continue;\n    }\n  }\n  return docs;\n}\n\nexport function buildAnswer(text: string, sufficient: boolean): string {\n  return sufficient ? text : `${text}\\n\\nContext may be incomplete.`;\n}"
   },
   "resultado": "Com a busca sempre falhando, a resposta sai com o corpus interno e o aviso: 1 teste de ponta a ponta prova que o fluxo não cai.",
   "quandoNao": [
    "Pagamento, escrita em banco ou qualquer operação em que o resultado parcial é pior que falhar.",
    "Quando o usuário não pode ser avisado de que a resposta é parcial.",
    "Quando a falha silenciosa esconde incidente: sem log e métrica, degradar vira silêncio."
   ],
   "armadilha": "Engolir o erro sem registrar log ou métrica transforma degradação em bug invisível.",
   "repo": {
    "label": "packages/agent/src/nodes (web-search.ts, graph.test.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/nodes"
   }
  },
  {
   "id": "P11-22",
   "title": "Error handler central com RFC 7807 em Fastify",
   "topics": [
    "D11-12"
   ],
   "cenario": "Cada rota da API devolve erro num formato diferente e o 500 expõe a mensagem da exceção.",
   "passos": [
    "Defina o schema <code>problemDetailsSchema</code> (type, title, status, detail) num pacote de contratos.",
    "Crie <code>toProblem(error)</code> como função pura: <code>ZodError</code> para 400, erro de domínio para o status certo, resto para 500 com detalhe fixo.",
    "Registre <code>app.setErrorHandler</code> uma vez, logando o erro completo internamente e respondendo <code>application/problem+json</code>.",
    "Remova qualquer <code>try/catch</code> de erro HTTP das rotas.",
    "Teste: um teste por mapeamento e um que prova que o 500 não contém o texto do erro interno; confirme com <code>curl</code> o 400 e o content-type."
   ],
   "code": {
    "lang": "ts",
    "src": "import Fastify from 'fastify';\nimport type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';\nimport { ZodError, z } from 'zod';\n\nexport const problemSchema = z.object({\n  type: z.string(),\n  title: z.string(),\n  status: z.number(),\n  detail: z.string(),\n});\n\nexport type Problem = z.infer<typeof problemSchema>;\n\nexport function toProblem(error: Error): Problem {\n  if (error instanceof ZodError) {\n    return {\n      type: 'https://example.dev/problems/invalid-input',\n      title: 'Invalid input',\n      status: 400,\n      detail: error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; '),\n    };\n  }\n  return {\n    type: 'https://example.dev/problems/internal',\n    title: 'Internal error',\n    status: 500,\n    detail: 'Unexpected error. Try again.',\n  };\n}\n\nexport function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {\n  const problem = toProblem(error);\n  request.log.error(error);\n  reply.code(problem.status).type('application/problem+json').send(problem);\n}\n\nexport const app = Fastify({ logger: true });\napp.setErrorHandler(errorHandler);"
   },
   "resultado": "100% das respostas de erro validam contra <code>problemDetailsSchema</code> e o 500 nunca contém o texto da exceção: medido com 1 teste por tipo de erro.",
   "quandoNao": [
    "API interna com um único consumidor que já usa outro contrato de erro estável.",
    "Quando o framework já fornece problem+json pronto: use o dele.",
    "Erro de domínio que precisa de campos extras: estenda o contrato em vez de mudar o formato por rota."
   ],
   "armadilha": "Identificar o erro por <code>instanceof</code> de uma cópia duplicada da lib (versões diferentes de zod) faz todo erro cair no 500 sem aviso.",
   "repo": {
    "label": "apps/api/src (error-handler.ts) e packages/contracts (problem.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api/src"
   }
  },
  {
   "id": "P11-23",
   "title": "Servidor MCP com uma tool, descrição como prompt e teste em memória",
   "topics": [
    "D11-12"
   ],
   "cenario": "Você quer que agentes externos consultem seu sistema sem abrir todas as funções do backend nem burlar o guardrail.",
   "passos": [
    "Defina a interface mínima do grafo (<code>invoke({ question })</code>) e injete-a na tool.",
    "Escreva a descrição como prompt: domínio, o que faz, o que nunca faz.",
    "Em erro, devolva <code>isError: true</code> com mensagem genérica (o detalhe vai para o log interno).",
    "Teste o servidor inteiro com <code>InMemoryTransport.createLinkedPair()</code> e um <code>Client</code> do SDK.",
    "Adicione o transporte stdio e consuma por <code>claude mcp add</code>; peça explicitamente o uso da tool e depois sem pedir, comparando se o agente a escolhe pela descrição."
   ],
   "code": {
    "lang": "ts",
    "src": "import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';\nimport { Client } from '@modelcontextprotocol/sdk/client/index.js';\nimport { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';\nimport { z } from 'zod';\n\ninterface GraphLike {\n  invoke(input: { question: string }): Promise<{ answerText: string }>;\n}\n\nexport function createServer(graph: GraphLike): McpServer {\n  const server = new McpServer({ name: 'researcher', version: '0.0.0' });\n  server.registerTool(\n    'ask',\n    {\n      title: 'Ask the researcher',\n      description:\n        'Answers questions about quarterly financial indicators of 20 listed companies, citing source and period. Never recommends buying, selling or holding an asset.',\n      inputSchema: { question: z.string().min(1) },\n    },\n    async ({ question }) => {\n      try {\n        const state = await graph.invoke({ question });\n        return { content: [{ type: 'text' as const, text: state.answerText }] };\n      } catch {\n        return {\n          content: [{ type: 'text' as const, text: 'Could not answer right now.' }],\n          isError: true,\n        };\n      }\n    },\n  );\n  return server;\n}\n\nexport async function connectInMemory(graph: GraphLike): Promise<Client> {\n  const [serverSide, clientSide] = InMemoryTransport.createLinkedPair();\n  const client = new Client({ name: 'test', version: '0.0.0' });\n  await Promise.all([createServer(graph).connect(serverSide), client.connect(clientSide)]);\n  return client;\n}"
   },
   "resultado": "listTools devolve exatamente 1 tool; callTool com grafo falso devolve o texto; com grafo que lança devolve <code>isError: true</code> sem a mensagem interna.",
   "quandoNao": [
    "Quando todos os consumidores são humanos via UI: uma API comum basta.",
    "Quando a operação não é segura para qualquer agente chamar (escrita crítica) sem autenticação e autorização.",
    "Quando expor mais de uma tool for necessário: modele o guardrail em cada uma, não só na descrição."
   ],
   "armadilha": "Devolver <code>error.message</code> cru na tool vaza detalhe interno ao agente externo, como o código do repo faz hoje.",
   "repo": {
    "label": "packages/mcp-server (server.ts, tools/perguntar.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/mcp-server"
   }
  },
  {
   "id": "P11-24",
   "title": "Protótipo exportado vira skill de design com regra de domínio",
   "topics": [
    "D11-13"
   ],
   "cenario": "Time faz front com agente de código e cada sessão devolve uma cor, fonte e raio diferentes; o designer reclama de inconsistência no PR.",
   "passos": [
    "Prototipe a tela numa ferramenta de design (Claude Design, Stitch ou outra) e itere até o mock ficar fiel.",
    "Exporte em <b>HTML standalone</b> e salve em <code>docs/design/prototype/</code> junto de um <code>design-tokens-used.md</code>.",
    "Peça ao agente: ler os dois arquivos e criar <code>.claude/skills/frontend-design/SKILL.md</code> com tokens, tipografia, forma e padrões de componente.",
    "Inclua no prompt uma regra de domínio inegociável (ex.: só uma cor de estado; nada de verde ou vermelho em número financeiro).",
    "Gere os tokens como custom properties globais e a casca estática (header, aviso, lista vazia, composer) usando só a skill.",
    "Rode o grep de conformidade abaixo e corrija o que escapou."
   ],
   "code": {
    "lang": "bash",
    "src": "grep -rnE '#[0-9a-fA-F]{3,8}\\b' apps/web/src --include=*.scss --include=*.html | grep -v 'src/styles.scss' | wc -l\ngrep -rniE 'green|red|#(0f0|f00)' apps/web/src --include=*.scss | wc -l"
   },
   "resultado": "Número de hex literais fora de styles.scss (meta: 0) e de menções a verde ou vermelho em estilos (meta: 0). Não executei este grep no repo do capstone; ele é uma verificação sugerida.",
   "quandoNao": [
    "Protótipo descartável de um dia: skill é custo sem retorno.",
    "Time com design system já mantido como pacote: aponte a skill para o pacote em vez de duplicar tokens.",
    "Quando o agente tem acesso só a PDF ou imagem e você não consegue o HTML: a qualidade da skill cai."
   ],
   "armadilha": "Deixar a skill descrever o mockup (citação inline) enquanto o código real evoluiu para outra coisa.",
   "repo": {
    "label": ".claude/skills/frontend-design (SKILL.md)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/.claude/skills/frontend-design"
   }
  },
  {
   "id": "P11-25",
   "title": "Buffer de revelação em ritmo fixo para streaming irregular",
   "topics": [
    "D11-14"
   ],
   "cenario": "Seu chat recebe chunks irregulares do backend e o texto aparece aos solavancos, truncado no meio das palavras.",
   "passos": [
    "Receba a resposta e guarde-a inteira (ou o que chegou) num buffer, sem renderizar direto.",
    "Tokenize preservando espaços (<code>split(/(\\s+)/)</code>) para que <code>join('')</code> reconstrua o texto.",
    "Avance um contador de tokens revelados num <code>setInterval</code> de 70 ms e renderize só <code>slice(0, revealed)</code>.",
    "Limpe o timer ao concluir, ao reiniciar a conversa e ao destruir o store.",
    "Mostre um cursor piscando enquanto <code>done</code> for falso.",
    "Meça o tempo total revelado para uma resposta de 100 palavras e ajuste a velocidade."
   ],
   "code": {
    "lang": "ts",
    "src": "const STREAM_SPEED_MS = 70;\n\nexport function tokenize(text: string): string[] {\n  return text.split(/(\\s+)/).filter((token) => token.length > 0);\n}\n\nexport function revealTokens(\n  fullText: string,\n  onTick: (revealed: number, done: boolean) => void,\n): () => void {\n  const tokens = tokenize(fullText);\n  let revealed = 0;\n  const timer = setInterval(() => {\n    revealed++;\n    const done = revealed >= tokens.length;\n    onTick(revealed, done);\n    if (done) clearInterval(timer);\n  }, STREAM_SPEED_MS);\n  return () => clearInterval(timer);\n}"
   },
   "resultado": "Tempo de revelação por resposta: 200 tokens (100 palavras mais espaços) a 70 ms dão cerca de 14 s; decida se o ritmo é aceitável ou reduza o intervalo.",
   "quandoNao": [
    "Respostas curtas ou ferramentas internas: o atraso artificial só irrita.",
    "Quando o backend já faz streaming token a token regular: renderize direto.",
    "Acessibilidade: leitores de tela precisam do texto completo, ofereça opção de pular a animação."
   ],
   "armadilha": "Contar tokens com espaços e dizer que são palavras: o ritmo real fica metade do que você planejou.",
   "repo": {
    "label": "apps/web/src/app/state (chat-store.ts, chat-message.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/web/src/app/state"
   }
  },
  {
   "id": "P11-26",
   "title": "Painel de progresso que prevê a próxima etapa sem importar o servidor",
   "topics": [
    "D11-14"
   ],
   "cenario": "O stream do agente só avisa nó concluído, mas o usuário quer ver qual etapa está rodando agora; importar o pacote do agente no front levaria dependências de servidor ao bundle.",
   "passos": [
    "Liste as transições do grafo (nó concluído leva a qual próximo) numa função pura.",
    "Copie o limite de iterações como constante local e comente no PR de onde veio.",
    "A cada evento: marque a última etapa do mesmo nó como concluída e empurre a prevista como <code>running</code>.",
    "Trate falha do stream marcando a etapa pendente como interrompida, para o spinner não girar para sempre.",
    "Escreva um teste que percorre o caminho feliz e o caminho com fallback até o limite.",
    "Compare o valor local com o do backend num teste ou checagem de CI."
   ],
   "code": {
    "lang": "ts",
    "src": "type GraphNode = 'retrieve' | 'grade' | 'webSearch' | 'answer';\n\ninterface StreamEvent {\n  node: GraphNode;\n  sufficient?: boolean;\n}\n\nconst MAX_ITERATIONS = 2;\n\nexport function nextNode(event: StreamEvent, currentIteration: number): GraphNode | null {\n  if (event.node === 'retrieve') return 'grade';\n  if (event.node === 'webSearch') return 'retrieve';\n  if (event.node === 'grade') {\n    if (event.sufficient) return 'answer';\n    return currentIteration >= MAX_ITERATIONS ? 'answer' : 'webSearch';\n  }\n  return null;\n}"
   },
   "resultado": "Caminho feliz: 3 etapas (retrieve, grade, answer). Com contexto sempre insuficiente e limite 2: retrieve, grade, webSearch, retrieve, grade, answer (6 etapas, por leitura da regra; não executei).",
   "quandoNao": [
    "Backend que já emite nó iniciado e concluído: use os eventos reais, sem previsão.",
    "Fluxos com ramificações dinâmicas demais: a previsão fica errada com frequência.",
    "Quando precisa de tempo exato por etapa: meça no backend (observabilidade)."
   ],
   "armadilha": "Espelhar a constante sem teste de paridade: o painel passa a mentir quando o backend muda.",
   "repo": {
    "label": "apps/web/src/app/state/graph-store.ts",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/web/src/app/state"
   }
  },
  {
   "id": "P11-27",
   "title": "E2E de caminho feliz com dependências caras trocadas por fixture",
   "topics": [
    "D11-15"
   ],
   "cenario": "Seu E2E precisa de LLM pago, busca externa e banco vetorial; no CI isso custa dinheiro, quebra por razões alheias e exige secrets.",
   "passos": [
    "Crie uma flag única (<code>DEMO=true</code>) lida em cada fábrica de dependência: embeddings, busca, LLM de avaliação e LLM de resposta.",
    "Devolva fixtures determinísticas (o mesmo documento real congelado, resposta fixa, vetor de zeros).",
    "Isole o que nunca deve rodar em demo (seed em lote) numa função separada.",
    "Escreva o teste Playwright com <code>webServer</code> subindo API (com a flag) e front.",
    "Valide aviso fixo, resposta completa, citação com metadados e estado final do painel.",
    "Rode no CI após build, testes unitários e lint, e só então libere o deploy."
   ],
   "code": {
    "lang": "ts",
    "src": "interface Embeddings {\n  embedQuery(text: string): Promise<number[]>;\n}\n\nconst EMBEDDING_DIMENSIONS = 768;\n\nexport function createEmbeddings(realFactory: () => Embeddings): Embeddings {\n  if (process.env.DEMO === 'true') {\n    return {\n      async embedQuery() {\n        return new Array<number>(EMBEDDING_DIMENSIONS).fill(0);\n      },\n    };\n  }\n  return realFactory();\n}"
   },
   "resultado": "Tempo do job E2E no CI (compare com a versão sem mocks), custo em tokens (esperado: zero) e número de falhas por indisponibilidade externa (esperado: zero).",
   "quandoNao": [
    "Quando o risco crítico está na dependência externa: use flag fina ou teste real separado.",
    "Quando a qualidade da resposta é o que se quer medir: use evals, não E2E de UI.",
    "Quando a fixture é tão simples que deixa de exercitar o caminho real (ex.: sempre suficiente)."
   ],
   "armadilha": "Achar que o E2E verde prova o backend real: ele só prova a integração com as fixtures.",
   "repo": {
    "label": "packages/agent/src (embeddings.ts, llm-demo.ts, db/retrieve-demo.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src"
   }
  },
  {
   "id": "P11-28",
   "title": "Playwright com webServer duplo e job de CI antes do deploy",
   "topics": [
    "D11-15"
   ],
   "cenario": "Front e API precisam estar de pé para o teste, e o time quer que o merge só vá para produção se o E2E passar.",
   "passos": [
    "No <code>playwright.config.ts</code>, declare dois <code>webServer</code> com <code>url</code> de healthcheck e <code>timeout</code>.",
    "Use <code>reuseExistingServer: !process.env.CI</code> para não brigar com servidores locais.",
    "Em CI use <code>retries: 2</code>, <code>workers: 1</code> e <code>trace: 'on-first-retry'</code>.",
    "No workflow: build, testes unitários, lint, <code>playwright install --with-deps chromium</code> e o script de E2E.",
    "Faça o job de deploy depender do de teste (<code>needs: test</code>).",
    "Force uma quebra proposital (mude o texto do disclaimer) e confirme que o job vermelho barra o deploy."
   ],
   "code": {
    "lang": "ts",
    "src": "import { defineConfig, devices } from '@playwright/test';\n\nexport default defineConfig({\n  testDir: './e2e',\n  retries: process.env['CI'] ? 2 : 0,\n  workers: process.env['CI'] ? 1 : undefined,\n  use: { baseURL: 'http://localhost:4200', trace: 'on-first-retry' },\n  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],\n  webServer: [\n    {\n      command: 'pnpm --filter @hero/api run start',\n      url: 'http://localhost:3000/api/health',\n      env: { DEMO: 'true', PORT: '3000' },\n      reuseExistingServer: !process.env['CI'],\n      timeout: 30_000,\n    },\n    {\n      command: 'pnpm --filter @hero/web run start',\n      url: 'http://localhost:4200',\n      reuseExistingServer: !process.env['CI'],\n      timeout: 60_000,\n    },\n  ],\n});"
   },
   "resultado": "Job E2E verde com o texto original e vermelho com o texto alterado (2 execuções), e deploy bloqueado na segunda.",
   "quandoNao": [
    "Projetos sem interface: use teste de integração de API.",
    "Matriz de navegadores como requisito: adicione firefox e webkit nos projects.",
    "Time que ainda não tem build reproduzível: conserte antes o pipeline."
   ],
   "armadilha": "Subir a API sem ter rodado o build antes: o comando <code>node dist/index.js</code> falha por falta do dist.",
   "repo": {
    "label": "apps/web (playwright.config.ts) e .github/workflows/deploy.yml",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/web"
   }
  },
  {
   "id": "P11-29",
   "title": "Instrumentar um grafo LangChain com Langfuse sem tocar nos nós",
   "topics": [
    "D11-16"
   ],
   "cenario": "Seu agente em produção responde mal para alguns usuários e ninguém sabe qual nó falhou nem quanto cada pergunta custa.",
   "passos": [
    "Crie conta e projeto no Langfuse (free) e exporte <code>LANGFUSE_PUBLIC_KEY</code>, <code>LANGFUSE_SECRET_KEY</code> e <code>LANGFUSE_BASE_URL</code> da região do projeto.",
    "Crie <code>observability/langfuse.ts</code> com <code>registerLangfuseTracing()</code> (idempotente, no-op sem chaves) e <code>createLangfuseCallbacks()</code> (array vazio sem chaves).",
    "Chame <code>registerLangfuseTracing()</code> no boot de cada processo que invoca o grafo.",
    "Passe <code>{ callbacks: createLangfuseCallbacks() }</code> no <code>graph.stream()</code>/<code>invoke()</code>, nunca dentro de um nó.",
    "Rode uma pergunta real (modo demo desligado) e abra Tracing: confira um span por nó e o custo calculado."
   ],
   "code": {
    "lang": "ts",
    "src": "import { CallbackHandler } from '@langfuse/langchain';\nimport { LangfuseSpanProcessor } from '@langfuse/otel';\nimport { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';\n\nlet registered = false;\n\nfunction isConfigured(): boolean {\n  return Boolean(process.env.LANGFUSE_PUBLIC_KEY && process.env.LANGFUSE_SECRET_KEY);\n}\n\nexport function registerLangfuseTracing(): void {\n  if (registered || !isConfigured()) return;\n  new NodeTracerProvider({ spanProcessors: [new LangfuseSpanProcessor()] }).register();\n  registered = true;\n}\n\nexport function createLangfuseCallbacks(): CallbackHandler[] {\n  return isConfigured() ? [new CallbackHandler()] : [];\n}"
   },
   "resultado": "Um trace por pergunta no Langfuse com um span por nó, modelo e custo em USD; sem as variáveis, o processo sobe igual e nada é enviado.",
   "quandoNao": [
    "Protótipo descartável sem usuário real e sem custo relevante.",
    "Dados sensíveis (ex.: saúde) sem decidir antes a região e a governança do fornecedor.",
    "Time que já tem um APM com módulo de IA e exige tudo no mesmo painel."
   ],
   "armadilha": "Região do projeto diferente da do monitor aberto: a telemetria chega, mas o dashboard aparece vazio.",
   "repo": {
    "label": "packages/agent/src/observability (langfuse.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/observability"
   }
  },
  {
   "id": "P11-30",
   "title": "Conferir a chegada do trace pela API do Langfuse",
   "topics": [
    "D11-16"
   ],
   "cenario": "Você subiu a instrumentação em produção e quer um check automático de que a telemetria realmente chega, sem abrir o dashboard.",
   "passos": [
    "Gere o header <code>Authorization: Basic</code> com <code>base64(PUBLIC:SECRET)</code>.",
    "Chame <code>GET $LANGFUSE_BASE_URL/api/public/traces?fromTimestamp=&lt;24h atrás&gt;</code>.",
    "Leia <code>meta.totalItems</code> e falhe o check se for 0.",
    "Rode depois de uma pergunta real com <code>DEMO=false</code>."
   ],
   "code": {
    "lang": "ts",
    "src": "const publicKey = process.env.LANGFUSE_PUBLIC_KEY ?? '';\nconst secretKey = process.env.LANGFUSE_SECRET_KEY ?? '';\nconst baseUrl = process.env.LANGFUSE_BASE_URL ?? 'https://us.cloud.langfuse.com';\nconst from = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();\nconst auth = Buffer.from(`${publicKey}:${secretKey}`).toString('base64');\n\nconst response = await fetch(`${baseUrl}/api/public/traces?fromTimestamp=${from}`, {\n  headers: { Authorization: `Basic ${auth}` },\n});\nconst body = (await response.json()) as { meta: { totalItems: number } };\n\nif (body.meta.totalItems === 0) {\n  console.error('no traces in the last 24h');\n  process.exit(1);\n}"
   },
   "resultado": "Exit code 0 com <code>totalItems &gt; 0</code>; exit 1 se nenhum trace nas últimas 24h.",
   "quandoNao": [
    "Ambiente sem tráfego nas últimas 24h (falso negativo).",
    "Chaves de produção em máquina de desenvolvimento compartilhada.",
    "Quando o objetivo é validar conteúdo do trace, não só a chegada."
   ],
   "armadilha": "Validação que passa fácil demais: um trace antigo satisfaz o check, use a janela de tempo curta após o teste.",
   "repo": {
    "label": "scripts/capstone-check.ts (item 6, descrito no CLAUDE.md)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/scripts"
   }
  },
  {
   "id": "P11-31",
   "title": "Contadores de tokens e custo por nó a partir do usage real",
   "topics": [
    "D11-17"
   ],
   "cenario": "A fatura do LLM sobe e ninguém sabe qual nó do grafo gasta mais.",
   "passos": [
    "Crie um <code>Registry</code> próprio e dois <code>Counter</code>: tokens (<code>node</code>, <code>model</code>, <code>kind</code>) e custo USD (<code>node</code>, <code>model</code>).",
    "Escreva um callback que guarda <code>langgraph_node</code> e <code>ls_model_name</code> por <code>runId</code> em <code>handleChatModelStart</code>.",
    "Em <code>handleLLMEnd</code> incremente com o <code>usage_metadata</code> real e o preço da tabela USD/milhão; modelo fora da tabela custa 0 com aviso.",
    "Limpe o <code>Map</code> também em <code>handleLLMError</code>.",
    "Passe o callback no <code>stream()</code> junto com os demais e exponha <code>GET /metrics</code>."
   ],
   "code": {
    "lang": "ts",
    "src": "import { Counter, Registry } from 'prom-client';\n\ninterface Usage {\n  input_tokens: number;\n  output_tokens: number;\n}\n\nconst PRICES: Record<string, { input: number; output: number }> = {\n  'gemini-3.5-flash-lite': { input: 0.3, output: 2.5 },\n};\n\nexport const registry = new Registry();\n\nconst tokens = new Counter({\n  name: 'llm_tokens_total',\n  help: 'tokens by node, model and kind',\n  labelNames: ['node', 'model', 'kind'] as const,\n  registers: [registry],\n});\n\nconst cost = new Counter({\n  name: 'llm_cost_usd_total',\n  help: 'cost in USD by node and model',\n  labelNames: ['node', 'model'] as const,\n  registers: [registry],\n});\n\nfunction costUsd(model: string, usage: Usage): number {\n  const price = PRICES[model];\n  if (!price) return 0;\n  return (usage.input_tokens / 1e6) * price.input + (usage.output_tokens / 1e6) * price.output;\n}\n\nexport function createMetricsCallback() {\n  const runs = new Map<string, { node: string; model: string }>();\n  return {\n    handleChatModelStart(\n      _llm: unknown,\n      _messages: unknown,\n      runId: string,\n      _parentRunId?: string,\n      _extraParams?: unknown,\n      _tags?: string[],\n      metadata?: { langgraph_node?: string; ls_model_name?: string },\n    ) {\n      runs.set(runId, {\n        node: metadata?.langgraph_node ?? 'unknown',\n        model: metadata?.ls_model_name ?? 'unknown',\n      });\n    },\n    handleLLMEnd(output: { llmOutput?: { usage_metadata?: Usage } }, runId: string) {\n      const run = runs.get(runId);\n      runs.delete(runId);\n      const usage = output.llmOutput?.usage_metadata;\n      if (!usage || !run) return;\n      tokens.inc({ ...run, kind: 'input' }, usage.input_tokens);\n      tokens.inc({ ...run, kind: 'output' }, usage.output_tokens);\n      cost.inc(run, costUsd(run.model, usage));\n    },\n    handleLLMError(_error: unknown, runId: string) {\n      runs.delete(runId);\n    },\n  };\n}"
   },
   "resultado": "Com 10 perguntas de teste, <code>/metrics</code> mostra tokens e USD por nó; compare a soma com o custo no Langfuse e anote a diferença percentual.",
   "quandoNao": [
    "Preço do modelo muda toda semana e você não mantém a tabela: use o custo calculado pelo provedor de observabilidade.",
    "Serviço sem LLM: não há <code>usage_metadata</code> para contar.",
    "Quando precisa de custo contábil exato: a tabela local é aproximação."
   ],
   "armadilha": "Passar o callback dentro do nó em vez de no call site do <code>stream()</code> substitui o callback manager ambiente e some com o trace.",
   "repo": {
    "label": "packages/agent/src/observability (metrics.ts, pricing.ts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/agent/src/observability"
   }
  },
  {
   "id": "P11-32",
   "title": "Rate limit global e budget diário que devolvem 429",
   "topics": [
    "D11-17"
   ],
   "cenario": "Um cliente em loop ou um bot pode derrubar a API ou queimar o orçamento de tokens em uma tarde.",
   "passos": [
    "Crie <code>createRateLimitOptions()</code> lendo <code>RATE_LIMIT_MAX</code> e <code>RATE_LIMIT_WINDOW</code> e chame dentro de <code>build()</code>.",
    "Desligue o limite em <code>/health</code> e <code>/metrics</code> com <code>config: { rateLimit: false }</code>.",
    "Crie o contador diário em memória (reseta quando a data UTC muda) alimentado pelo mesmo callback de métricas.",
    "Chame <code>checkBudget()</code> no início da rota, antes de <code>writeHead(200)</code>.",
    "Mapeie as duas exceções para 429 no error handler central e teste com <code>RATE_LIMIT_MAX=2</code> e <code>TOKEN_BUDGET=1</code>."
   ],
   "code": {
    "lang": "ts",
    "src": "import type { RateLimitOptions } from '@fastify/rate-limit';\n\nexport class DailyBudgetExceededError extends Error {\n  constructor(limit: number) {\n    super(`daily token budget exceeded (limit: ${limit})`);\n    this.name = 'DailyBudgetExceededError';\n  }\n}\n\nlet currentDay = new Date().toISOString().slice(0, 10);\nlet tokensToday = 0;\n\nfunction rollDay(): void {\n  const today = new Date().toISOString().slice(0, 10);\n  if (today !== currentDay) {\n    currentDay = today;\n    tokensToday = 0;\n  }\n}\n\nexport function recordTokens(tokens: number): void {\n  rollDay();\n  tokensToday += tokens;\n}\n\nexport function checkBudget(): void {\n  const limit = process.env.TOKEN_BUDGET_DAILY;\n  if (!limit) return;\n  rollDay();\n  if (tokensToday >= Number(limit)) throw new DailyBudgetExceededError(Number(limit));\n}\n\nexport function createRateLimitOptions(): RateLimitOptions {\n  return {\n    max: Number(process.env.RATE_LIMIT_MAX ?? 20),\n    timeWindow: process.env.RATE_LIMIT_WINDOW ?? '1 minute',\n  };\n}"
   },
   "resultado": "Com <code>RATE_LIMIT_MAX=2</code>, três chamadas seguidas devolvem 200, 200, 429 e <code>/health</code> segue 200; com budget 1, a segunda pergunta devolve 429.",
   "quandoNao": [
    "Várias instâncias sem estado compartilhado: o limite vira por instância, use Redis ou gateway.",
    "Já existe rate limit no API gateway com a mesma granularidade.",
    "Tráfego legítimo em rajada (ex.: jobs em lote) sem janela dimensionada."
   ],
   "armadilha": "Verificar o budget depois de iniciar o stream SSE: a resposta já saiu como 200 e o 429 não chega ao cliente.",
   "repo": {
    "label": "apps/api/src/rate-limit.ts e packages/agent/src/observability/budget.ts",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/apps/api/src"
   }
  },
  {
   "id": "P11-33",
   "title": "README com diagramas Mermaid validados antes do push",
   "topics": [
    "D11-18"
   ],
   "cenario": "Seu projeto tem arquitetura só na cabeça do time e um diagrama em PowerPoint desatualizado.",
   "passos": [
    "Peça ao agente o README com visão geral e três diagramas Mermaid: infraestrutura, fluxo principal da aplicação e pipeline de deploy.",
    "Nomeie o nó principal com um id que não seja palavra reservada (use <code>agentGraph</code>, nunca <code>graph</code>).",
    "Renderize cada bloco com <code>npx @mermaid-js/mermaid-cli -i diagram.mmd -o diagram.svg</code>.",
    "Falhou no parser? Troque ids suspeitos antes de olhar o label, pois o erro aponta o texto errado.",
    "Abra o README no GitHub e confirme que os três diagramas renderizam."
   ],
   "code": {
    "lang": "bash",
    "src": "mkdir -p /tmp/diagrams\nprintf 'flowchart LR\\n  start([start]) --> retrieve[retrieve]\\n  retrieve --> grade[grade]\\n  grade --> agentGraph[answer]\\n' > /tmp/diagrams/graph.mmd\nnpx @mermaid-js/mermaid-cli -i /tmp/diagrams/graph.mmd -o /tmp/diagrams/graph.svg\ntest -s /tmp/diagrams/graph.svg && echo rendered"
   },
   "resultado": "3 de 3 blocos renderizam sem erro no CLI e no GitHub; mede-se pelo exit code 0 do CLI em cada bloco.",
   "quandoNao": [
    "Diagrama com centenas de nós: use ferramenta própria de arquitetura.",
    "Apresentação a clientes que exige identidade visual: exporte e refine em ferramenta de design.",
    "Ambiente sem Node para rodar o CLI: valide só no GitHub."
   ],
   "armadilha": "Palavra reservada como id de nó (<code>graph</code>) gera erro de parser que aponta para o label, não para o id.",
   "repo": {
    "label": "README.md (3 blocos mermaid)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/README.md"
   }
  },
  {
   "id": "P11-34",
   "title": "Checklist de encerramento de ambiente de estudo na nuvem",
   "topics": [
    "D11-18"
   ],
   "cenario": "Você terminou o capstone, compartilhou o link e quer garantir custo zero sem perder a chance de voltar atrás.",
   "passos": [
    "Liste o que tem custo fixo (banco gerenciado) e o que só cobra por uso (LLM, serverless).",
    "Exporte o que quiser guardar (dump do banco, secrets locais) antes de desligar.",
    "No console: IAM e administrador, Configurações, Encerrar projeto, digite o código do projeto.",
    "Confirme que o projeto aparece como pendente de exclusão e anote a data limite de restauração (30 dias).",
    "Verifique em Faturamento, no dia seguinte, que nenhuma cobrança nova foi gerada."
   ],
   "code": {
    "lang": "bash",
    "src": "gcloud projects describe \"$GOOGLE_CLOUD_PROJECT_ID\" --format='value(lifecycleState)'\ngcloud projects delete \"$GOOGLE_CLOUD_PROJECT_ID\"\ngcloud projects describe \"$GOOGLE_CLOUD_PROJECT_ID\" --format='value(lifecycleState)'"
   },
   "resultado": "O estado vai de <code>ACTIVE</code> para <code>DELETE_REQUESTED</code> e o custo diário do projeto em Faturamento cai a zero.",
   "quandoNao": [
    "Projeto compartilhado com outros recursos que ainda são usados.",
    "Ambiente corporativo: só o dono da conta deve decidir, siga o processo da empresa.",
    "Quando você quer manter o link demo no ar: reduza custo, não encerre."
   ],
   "armadilha": "Apagar só Cloud Run e Vertex AI e esquecer o Cloud SQL, que segue cobrando armazenamento.",
   "repo": {
    "label": "scripts/destroy.ts e Makefile (destroy)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/scripts"
   }
  },
  {
   "id": "P11-35",
   "title": "Auditoria aula x repo: provar cada afirmação do material em um arquivo",
   "topics": [
    "D11-19"
   ],
   "cenario": "Você vai explicar o projeto a um colega ou reproduzi-lo em outra stack e quer saber o que da aula realmente está no código.",
   "passos": [
    "Escolha 10 afirmações verificáveis das aulas (um limite, um nome de nó, uma variável, um status HTTP).",
    "Para cada uma, ache a prova com <code>grep -rn</code> no repositório e anote arquivo e linha.",
    "Marque cada afirmação como confere, diverge ou não achei.",
    "Para as divergências, escreva a diferença em uma frase e o impacto (didático ou de comportamento).",
    "Compare o resultado com a tabela de achados do README da disciplina e complete o que faltar."
   ],
   "code": {
    "lang": "bash",
    "src": "git clone https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher\ncd capstone-project-ai-researcher\ngrep -rn \"verificarOrcamento\" apps packages\ngrep -rn \"instanceof\" apps/api/src | head"
   },
   "resultado": "Uma tabela com 10 linhas e a taxa de confere sobre divergem; leitura que não gera divergência nenhuma é suspeita e pede mais afirmações.",
   "quandoNao": [
    "Projeto sem repositório de referência: nada para auditar.",
    "Quando só se quer a ideia geral e não reproduzir."
   ],
   "armadilha": "Confiar na memória da aula em vez do grep: os achados do README vieram justamente de divergências assim.",
   "repo": {
    "label": "capstone-project-ai-researcher",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher"
   }
  }
 ]
});
