# 03 · Corpus CVM: coleta, normalização e parágrafos determinísticos sem LLM

> **Unidade 1 · Aula 5** · Leitura: ~10 min · Bloco: Unidade 1 · Ideação, setup e deploy inicial

## 🎯 Em uma frase
O corpus do RAG vem dos **dados abertos da CVM**: `pnpm collect` baixa os ZIPs, localiza as contas (o código de conta **não é estável entre setores**), normaliza milhares para reais e escreve **80 documentos** (20 empresas, 4 trimestres) com parágrafo por **template determinístico**: custo zero e sem alucinação numérica.

---

## 👵 Explicando para a vovó

Pense em montar uma ficha de cada empresa a partir de balancetes oficiais. Você poderia pedir a um redator criativo (a LLM) que escrevesse cada ficha, mas ele pode errar um número com a maior confiança e cobra por ficha. Em vez disso, você usa um formulário com lacunas: "No trimestre X, a empresa Y teve receita de Z". Quem preenche é uma regra, sempre igual.

E se o órgão oficial publicar um arquivo faltando, o formulário não quebra a fábrica inteira: pula aquele arquivo e segue com os que existem.

---

## 🔧 Tecnicamente

### O que é
- Fonte: **Portal de Dados Abertos da CVM**, ZIPs anuais com um CSV por demonstrativo. Os arquivos precisam ser lidos e baixados automaticamente, sem download manual, limpos e convertidos em JSON.
- Regra do CLAUDE.md na parte "nunca": nunca usar LLM para gerar os parágrafos do corpus. O agente não pode inventar nem alucinar números; tudo é baseado em dados.
- Dois motivos para não usar LLM: **custo** (o script poderia rodar um milhão de vezes sem nenhuma chamada) e **alucinação** (mesmo com os valores certos no prompt, a LLM pode errar). Regra geral: onde o dado não admite risco de alucinação, código determinístico.
- Um único prompt cria o pacote: `packages/corpus`, lista de 20 empresas em `data/empresas.csv` (ticker, razão social, código CVM, setor), arquivos ITR e DFP de `dados.cvm.gov.br`, últimos 4 trimestres, seis indicadores (receita líquida, lucro bruto, lucro líquido, ativo total, patrimônio líquido, caixa operacional), normalização de milhares para reais e um JSON por empresa em `data/documentos/{TICKER}.json`.
- Metadados exigidos por documento: ticker, nome da companhia, setor, período, data final do período, URL da fonte e data de download (aula: `ticker, company_name, setor, period, period_end, source_url, fetched_at`).
- Pegadinha da escala: na CVM, "200" são 200 mil milhares, ou seja, 200 milhões. Guarda-se o valor cheio em reais para poder fazer contas.
- O que o agente descobriu lendo os arquivos: o **código de conta** não é estável entre setores. Bancos usam outra árvore de DRE e balanço (confirmado com Vale, Itaú, Bradesco e Banco do Brasil) e até o Itaú tem menos linhas antes do lucro líquido que o Bradesco. Por isso o `select-quarters.ts` procura certas contas pelo nome.
- Erro não previsto na demo: `pnpm collect` falhou com **404** porque a CVM tinha os arquivos de 2013 a 2024 e 2026, mas não o de 2025. O script estava certo; a situação da fonte não tinha sido prevista. Novo prompt: ignorar o arquivo quando não existir e seguir com os dados disponíveis (correção mais simples).
- Resultado: JSON em `packages/corpus/data`, com valores inteiros (não abreviados), data de download e o parágrafo sempre no mesmo modelo. Para ler o que foi coletado há um script de leitura rodado com o `--filter` do pnpm.
- Na starter o pacote já existe; ao receber o prompt o agente confirma as 20 empresas e roda os testes, porque o CLAUDE.md exige um teste para cada requisito.

### Como funciona
- `pnpm collect` (raiz) chama `pnpm --filter @hero/corpus run collect`, que executa `tsx src/collect/run.ts`.
- `lerEmpresas()` lê `data/empresas.csv` e padroniza `cdCvm` com 6 dígitos (`padStart(6, '0')`).
- `coletarUltimosTrimestres` parte do trimestre corrente e anda para trás (até 8 candidatos), aceitando um trimestre se pelo menos 75% das empresas têm dado, e para ao juntar 4 trimestres.
- Para 1T a 3T lê o ITR do ano; para o 4T combina DFP anual menos o acumulado do ITR do 3T (receita, lucro bruto, lucro líquido, caixa). Ativo e patrimônio vêm direto do DFP.
- Contas: receita `3.01`, lucro bruto `3.03`, ativo total `1`, caixa operacional `6.01` por código; **lucro líquido e patrimônio líquido por texto de `DS_CONTA`** com `ST_CONTA_FIXA=S`, escolhendo o código mais raso e a maior `VERSAO`.
- Consolidado quando existe, individual quando não (caso Sendas/Assaí), sempre as quatro demonstrações da mesma variante.
- `paraCanonico` converte `MIL` em reais multiplicando por 1000, uma única vez; `gerarParagrafo` monta o texto com YoY e QoQ da receita, margem líquida e caixa operacional.
- Falha de fonte: `fetch-cvm.ts` lança `ArquivoCvmNaoEncontradoError` só em HTTP 404; `carregarDemonstrativos` captura essa classe, avisa e devolve demonstrativos vazios. Outro erro de rede continua estourando.
- Conferência: `pnpm --filter @hero/corpus run report [TICKER...]` imprime os seis indicadores para comparar com o release oficial.

### Onde aplicar
- Qualquer RAG sobre dados estruturados (financeiros, catálogo, métricas): gere o texto indexável por template a partir do dado, não por LLM.
- Ingestão de fontes públicas com esquema irregular: localize campos por rótulo estável quando o código muda entre categorias.
- Pipelines que dependem de arquivos publicados por terceiros: trate ausência (404) como estado esperado, distinto de falha real.
- Normalização de unidades (milhares, milhões): converta uma vez, na fronteira, e guarde o valor cheio.

### Vantagens e limites
**Vantagens**
- Custo zero por execução e resultado reprodutível byte a byte (teste de igualdade exata da string gerada).
- Sem alucinação numérica: o texto deriva do dado estruturado.
- Metadados (fonte, período, data) permitem citação com data-base e política de expiração.
- JSONs versionados no repo: a coleta só roda na preparação do material.

**Limites**
- O template é rígido: só cobre o que foi previsto (no repo, 3 dos 6 indicadores entram no texto).
- Busca por descrição de conta depende de rótulos da CVM; mudança de texto quebra a coleta.
- Dados são snapshot: ficam desatualizados até a próxima coleta.
- Ignorar silenciosamente o que falta pode mascarar buracos no corpus se ninguém ler os avisos.

### 🚫 Armadilhas
- Gerar o parágrafo com LLM "só dessa vez": viola a regra "nunca" do CLAUDE.md e reabre custo e alucinação.
- Esquecer a escala: valor em milhares tratado como reais erra por 1000x.
- Assumir código de conta fixo entre bancos e indústrias: lucro líquido e patrimônio mudam de posição.
- Tratar todo erro como bug do código: um 404 pode ser da fonte; decida a política (ignorar, repetir, falhar) conscientemente.
- Achado: o JSON do repo usa camelCase (`companyName`, `periodEnd`, `sourceUrl`, `fetchedAt`); o prompt da aula cita snake_case. As colunas do banco (`company_name`, `source_url`) são snake_case em `schema.ts`.

> 💡 Sempre que um agente gerar um parser, peça um teste com fixture de uma linha real do CSV (como `__fixtures__/exemplo-dre.csv`) e abra o arquivo bruto antes de confiar nas colunas.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| CVM | Comissão de Valores Mobiliários; publica os dados abertos usados como corpus. |
| ITR / DFP | Informações trimestrais (ITR) e demonstrações financeiras anuais (DFP). |
| CD_CONTA | Código da conta no plano da CVM; não é estável entre setores. |
| DS_CONTA | Descrição textual da conta; usada para achar lucro líquido e patrimônio. |
| ESCALA_MOEDA | MIL (milhares) ou UNIDADE; o normalizador converte para reais. |
| Template determinístico | Parágrafo montado por regras fixas, sem LLM. |
| YoY / QoQ | Comparação com o mesmo trimestre do ano anterior / com o trimestre anterior. |
| pnpm collect | Comando que baixa, trata e grava os JSONs do corpus. |
| Snapshot | Estado dos arquivos de data/documentos na última coleta, versionado. |
| ArquivoCvmNaoEncontradoError | Erro específico de 404 que o coletor trata como dado ausente. |

---

## 💻 No código do repo

**Projeto:** [packages/corpus (src/collect, src/normalize, src/paragraphs, data/)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/corpus)

Li todo o código-fonte do pacote (coleta, normalização, template), os nomes dos testes e os dados. Contei os arquivos por script de leitura de JSON. Não executei `pnpm collect` (depende de rede) nem os testes.

**Fluxo**
1. `data/empresas.csv`: 20 linhas (ticker, razao_social, cd_cvm, setor). Ex.: ITUB 19348, BBDC 906, VALE 4170, ELET "Axia Energia S.A." 2437, ASAI 25372.
2. `src/collect/cvm-urls.ts`: monta `https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/{ITR|DFP}/DADOS/{itr|dfp}_cia_aberta_{ano}.zip`.
3. `src/collect/fetch-cvm.ts`: baixa e descompacta com `adm-zip` em `.cache`; 404 vira `ArquivoCvmNaoEncontradoError`, outros status viram `Error`.
4. `src/collect/parse-csv.ts`: lê em `latin1`, separador `;`, sem biblioteca de CSV.
5. `src/collect/select-quarters.ts` (508 linhas): `CONTAS` por código, `DESCRICOES_LUCRO_LIQUIDO` e `DESCRICOES_PATRIMONIO_LIQUIDO` por texto, `buscarConta`, `buscarContaPorDescricao`, 4T por subtração DFP menos ITR, `LIMIAR_COBERTURA = 0.75`.
6. `src/normalize/to-canonical.ts`: `paraReais` multiplica por 1000 quando `escalaMoeda === 'MIL'`.
7. `src/paragraphs/template.ts`: `gerarParagrafo` com `Intl.NumberFormat('pt-BR')` (bilhões ou milhões) e cláusulas YoY e QoQ omitidas quando ausentes.
8. `data/documentos/*.json`: 20 arquivos, 80 documentos (4 por empresa: 2T25, 3T25, 4T25, 1T26), `fetchedAt` de 2026-08-08. Os 4T25 não têm `receitaMesmoTrimestreAnoAnterior`.

**Como rodar**
- `pnpm collect` (rede; regrava data/documentos)
- `pnpm --filter @hero/corpus run report VALE ITUB` (lê os JSONs e imprime os indicadores)
- `pnpm --filter @hero/corpus run test` (Vitest; não executei)

**Armadilhas e achados no código**
- Nuance: a aula fala em buscar as contas "pelo nome", mas admite o código de conta (a apostila também diz que o filtro usa o código definido no início do arquivo). No código só **lucro líquido e patrimônio líquido** são buscados por descrição; receita (3.01), lucro bruto (3.03), ativo (1) e caixa (6.01) seguem por código, estáveis na amostra segundo o comentário do arquivo.
- Achado: o template só cita receita líquida, lucro líquido, margem líquida e caixa operacional; lucro bruto, ativo total e patrimônio líquido são coletados mas não entram no texto indexado (registrado no CLAUDE.md como achado do D.5).
- Achado: a falha de 2025 da demo não se reproduz no snapshot do repo (existe 4T25 para as 20 empresas). O tratamento atual cobre qualquer 404, não só 2025.
- Achado: no seed, `select-quarters.ts` já tem o tratamento de 404; o repo completo acrescenta testes (`select-quarters.test.ts`, `parse-csv.test.ts`, fixture) e exporta as funções puras para teste.
- Hipótese, não verifiquei contra o release: para bancos, a conta 3.01 usada como "receita líquida" pode não ser equivalente à receita líquida industrial (o parágrafo do ITUB diz R$ 102,8 bilhões).

---

## 🔗 Para ir além
- [Capstone Project AI Researcher](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher)
- [AI Researcher Seed](https://github.com/unipds-engenharia-de-ia-aplicada/ai-researcher-seed)
- [packages/corpus (completo)](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/tree/main/packages/corpus)
- [select-quarters.ts](https://github.com/unipds-engenharia-de-ia-aplicada/capstone-project-ai-researcher/blob/main/packages/corpus/src/collect/select-quarters.ts)
- [Portal de Dados Abertos da CVM](https://dados.cvm.gov.br)

---

⬅️ [02 · Tour pelo Google Cloud e GitHub Actions com Workload Identity Federation](./02-google-cloud-tour-and-github-actions-wif.md)  ·  [04 · Fundação GCP por prompts, Walking Skeleton e Deploy Zero](./04-gcp-foundation-and-walking-skeleton.md) ➡️
