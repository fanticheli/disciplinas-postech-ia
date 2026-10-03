# 03 · Do documento bruto ao exemplo validado: relevância, OCR, parser, esquema canônico e PII

> **Unidade 2 · Aula 1** · Leitura: ~12 min · Bloco: Dados: do documento ao dataset

## 🎯 Em uma frase
Preparar dado para fine-tuning não é acumular documentos. A aula monta um pipeline em estágios, cada um impedindo uma falha diferente: **gate de relevância, OCR, parser tolerante, validação de esquema, PII scrubbing e JSONL canônico**, tudo com texto bruto e metadados preservados para rastrear a origem de cada exemplo.

---

## 👵 Explicando para a vovó

Imagine montar um álbum de receitas a partir de caixas de papéis velhos. Primeiro você descarta o que não é receita (relevância). Depois alguém digita o texto de cada papel (OCR), outra pessoa localiza ingredientes e modo de preparo mesmo quando cada autor escreveu de um jeito (parser tolerante), uma terceira confere se a receita está completa (validação) e, por fim, você apaga o nome e o telefone de quem escreveu (redação de dado pessoal).

Se uma receita sai sem ingredientes e você a coloca no álbum assim mesmo, quem aprender com ele vai achar normal receita sem ingrediente. Por isso o bom curador prefere rejeitar a aceitar «quase certo».

---

## 🔧 Tecnicamente

### O que é
- **Pré-requisito vindo da Unidade 1:** Auto já estava aprovado e Saúde Empresarial devia esperar; mas decidir treinar ou esperar não produz dataset. A espera de Saúde não é inatividade: é o período para melhorar coleta, qualidade, governança e cobertura, então ela é preparada com o mesmo rigor.
- **Gate de relevância (data-centric AI):** o dataset não é tudo que existe no arquivo. Quatro perguntas, todas verdadeiras: o documento tem o ground truth da tarefa? vem do fluxo real de produção? ajuda a cobrir a variação real de formatos? pode ser usado em treino do ponto de vista de sensibilidade e compliance? O LIMA é citado: um conjunto pequeno e curado pode superar volumes maiores e menos controlados.
- **Sete candidatos, dois aprovados:** passam o orçamento de oficina e o recibo médico. Boletim de ocorrência não entrega segurado, placa e valor de forma confiável; foto do veículo não contém o documento textual; transcrição de ligação varia demais entre atendentes; prontuário completo falha em compliance (minimização da LGPD); cadastro de beneficiários é tabela de referência, não par de entrada e saída.
- **OCR com Tesseract:** motor open source (rede neural nas versões modernas); para português é preciso instalar o pacote de idioma (acentos, cedilha, termos médicos). O OCR entra nos documentos de apoio que nascem fora da plataforma (orçamento de oficina, recibo de clínica), não no formulário principal, que chega estruturado.
- **Parser tolerante:** «segurado» versus «nome do segurado», «placa» versus «placa do veículo», «valor» versus «valor cobrado». Expressões regulares tolerantes a variações plausíveis, sem depender de posição fixa e sem inventar campo quando o valor não foi encontrado.
- **Validação de esquema como portão:** campo obrigatório ausente ou valor zero/negativo é rejeitado. Sem isso, o parser que devolve campo vazio entra no dataset e o modelo aprende que não identificar o segurado é normal; multiplicado por centenas de documentos vira ruído sistemático.
- **Esquema canônico de 4 campos:** instrução (a mesma frase dentro de um caso), entrada (texto bruto do OCR, sem edição manual), saída (objeto estruturado) e metadata (caso, arquivo de origem, confiança do OCR, resultado das validações). Deliberadamente independente de provedor: conversores específicos vêm depois.
- **PII scrubbing:** o texto bruto preserva nome completo, então em produção é preciso pseudonimizar antes do treino. O gate redige nome e CPF (CPF validado pelo dígito verificador; nome ancorado em rótulos como «segurado» e «beneficiário»); placa e valor ficam porque a tarefa precisa deles. O limite é assumido: nome solto em texto livre exigiria NER mais robusto, como o Microsoft Presidio.
- **Quando 4 viram centenas:** aparecem viés de amostragem (90% dos orçamentos de poucas oficinas) e quase-duplicatas. São problemas de composição do conjunto, tratados na aula seguinte.

### Como funciona
- **Fluxo:** documento bruto, OCR, parser, validação de esquema, exemplo estruturado. Misturar tudo numa função esconderia onde um erro nasceu; separar mantém a rastreabilidade.
- **Dado real na demonstração:** quatro imagens sintéticas (dois orçamentos e dois recibos) passam pelo binário real do Tesseract. O texto bruto não é perfeito (espaços extras, quebras) e é preservado como entrada. O parser converte valor monetário brasileiro para número decimal.
- **Confiança do OCR como metadado:** a média palavra a palavra reportada pelo Tesseract (cerca de 94% a 96% nos quatro documentos). Fica guardada para virar gate operacional depois (documento degradado deve ir a revisão humana).
- **Testes que provam recusa:** 28 testes automatizados: conversão de valores em reais (a vírgula decimal), OCR e campos nos 4 documentos, confiança em faixa válida e, no fim, o caminho contrário (exemplo sem placa e exemplo com valor zero são rejeitados). Não basta provar que aceita o correto, é preciso provar que recusa o incorreto.
- **Rastreabilidade versus privacidade:** guardar o texto bruto permite voltar do exemplo estranho ao documento, ao OCR ou ao parser, e auditar o tratamento de dado de saúde (sensível); mas preservar o nome completo é uma tensão que o scrubbing resolve antes do treino.
- **Companion de dado regulado:** cobre higienização de PII/PHI (regex para identificadores estruturados mais NER para nome em texto livre; rodar a detecção localmente), privacidade diferencial (DP-SGD, DP-LoRA), fine-tuning federado, risco de memorização e o cenário regulatório brasileiro (LGPD e a agenda da ANPD).
- **OCR versus LLM multimodal (material extra):** o mesmo gabarito rodado contra o Gemini 2.5 Flash, sem OCR nem regex, deu 12/12 em ambos os caminhos. A diferença é de engenharia: o OCR precisou de um parser por layout; o multimodal usou um prompt genérico, ao custo de latência de rede (cerca de 2,6 a 4,8 s por documento) e tokens (~2.384 de entrada por documento).

### Onde aplicar
- Antes de coletar, aplicar o gate de relevância a pelo menos quatro candidatos de fonte do seu caso e manter ao menos um rejeitado com justificativa.
- Extrair campos de documentos heterogêneos com OCR e parser tolerante, ou com um LLM multimodal quando há muitos layouts e pouco volume.
- Definir um esquema canônico com instrução, entrada, saída e metadata e só depois converter para cada provedor.
- Redigir identificadores diretos antes de qualquer treinamento, e registrar o limite do método usado.

### Vantagens e limites
**Vantagens**
- Cada estágio tem uma responsabilidade clara e testável isoladamente.
- O esquema canônico evita refazer OCR, parsing, compliance e validação ao trocar de provedor.
- A confiança do OCR vira um sinal de qualidade que não se perde.

**Limites**
- Parser por regex exige uma função por layout e quebra com layouts inéditos.
- A redação por âncora de rótulo não pega nome solto em texto livre; não é anonimização completa.
- Preservar texto bruto é bom para auditoria e ruim para privacidade se o scrubbing não rodar antes do treino.

### 🚫 Armadilhas
- Chamar de dataset tudo o que existe no arquivo da empresa.
- Aceitar extração incompleta: «quase certo» não é suficiente para dado de treino.
- Achar que dado real e limpo é automaticamente dado adequado (o cadastro de beneficiários é real e limpo, mas não é par de entrada e saída).
- Esquecer o pacote de idioma português do Tesseract e perder acentos e termos médicos.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Data-centric AI | Melhorar sistematicamente o dado e os critérios do que entra no treino |
| Gate de relevância | Quatro perguntas, todas verdadeiras, antes de OCR e parsing |
| Parser tolerante | Regex que aceita variações de rótulo e não depende de posição fixa |
| Esquema canônico | instrução, entrada, saída e metadata, independente do provedor |
| PII scrubbing | Redação de nome e CPF (com dígito verificador) antes do treino |
| NER | Reconhecimento de entidades nomeadas, necessário para nome em texto livre |
| Confiança do OCR | Média palavra a palavra do Tesseract guardada no metadata |

---

## 💻 No código do repo

A deduplicação, o balanceamento e as métricas de diversidade vêm no [tópico 04](./04-dataset-como-conjunto-minhash-lsh-temperatura.md).

**Projeto:** [modulo-02-preparacao-datasets (relevância, extração, PII)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-02-preparacao-datasets)

Quatro ferramentas (JS e Python) e três documentos: gate de relevância, extração OCR para JSONL, gate de PII e o contraponto com LLM multimodal, mais as imagens sintéticas em `documentos-brutos/` e o JSONL de saída.

**Fluxo**
1. `data-relevance-scoring-tool.js`: `avaliarCandidato` exige os 4 critérios verdadeiros; aplica aos 7 candidatos (4 de Auto, 3 de Saúde) e confirma que exatamente `orcamento-oficina` e `recibo-medico` passam (11 testes).
2. `extraction-to-jsonl-tool.js`: `ocrTexto` e `ocrConfiancaMedia` chamam o binário `tesseract` (`-l por`, saída texto e TSV); `parsearOrcamentoAuto` e `parsearReciboSaude` usam regex tolerantes; `parsearValorBRL` converte «3.210,50»; `validarExemplo` exige campos obrigatórios e valor positivo; grava `dataset-amplitude-seguros.jsonl`.
3. `pii-scrubbing-gate-tool.js`: valida CPF pelo dígito verificador (rejeita sequência repetida e dígito errado), detecta nome por âncora de rótulo (com e sem acento) e redige para `[NOME_REDIGIDO]` e `[CPF_REDIGIDO]`; CPF inválido não é redigido (evita falso positivo). 11 testes.
4. `extracao-llm-multimodal-tool.js`: manda cada PNG ao Gemini via Vertex AI (REST, token do `gcloud`) com prompt genérico e compara com o mesmo gabarito; `ocr-vs-llm-extracao-comparativo.md` traz o resultado lado a lado.
5. `privacy-preserving-finetuning-companion.md` (PII/PHI, privacidade diferencial, federado, memorização, LGPD) e `documentos-brutos/` (4 PNG sintéticos).

**Como rodar**
- `node data-relevance-scoring-tool.js` e `node pii-scrubbing-gate-tool.js` rodam sem instalar nada (e os equivalentes `python3 ..._tool.py`).
- `node extraction-to-jsonl-tool.js` exige `tesseract` com o pacote `por` (`brew install tesseract tesseract-lang` no macOS). Aqui não tinha Tesseract instalado, então não executei esta etapa; contei os 28 testes lendo o código (2 de valor, 6 por documento vezes 4, 2 de rejeição).
- `GCP_PROJECT_ID=meu-projeto node extracao-llm-multimodal-tool.js` faz chamada paga à Vertex AI e exige `gcloud auth application-default login`; sem a variável, o script lança erro já no topo do arquivo.

**Armadilhas e achados no código**
- O gate de PII é uma ferramenta separada: `extraction-to-jsonl-tool.js` não o chama. Por isso `dataset-amplitude-seguros.jsonl` guarda os nomes completos sem redação.
- Esse JSONL também guarda ruído de OCR no rótulo: o primeiro registro tem `placa: QJk-4F82` (esperado QJK-4F82). O teste passa porque a comparação de texto ignora caixa; é exatamente o tipo de ruído de rótulo que a aula diz querer rejeitar.
- O cabeçalho dos testes do gate de PII diz «Módulo 11» (o algoritmo de CPF), o que lê como número de módulo do curso; é só o nome do algoritmo.
- A referência de indicações atribui o estudo LLM-Anonymizer (NEJM AI) a «Becker et al.»; o companion do repositório cita «Wiest et al.»: conferir antes de citar.
- A confiança do OCR existe no metadata, mas o gate que a usa só aparece no módulo 3 (tópico 05).

---

## 🔗 Para ir além
- [Repositório oficial, módulo 02 (Preparação de Datasets)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-02-preparacao-datasets)
- [LIMA: Less Is More for Alignment (indicação 10)](https://arxiv.org/abs/2305.11206)
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract)
- [Microsoft Presidio](https://microsoft.github.io/presidio/)

---

⬅️ [02 · Mapa das técnicas (o Zoo), casos de mercado e o risco de provedor e de obsolescência](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md)  ·  [04 · O dataset como conjunto: MinHash, LSH, amostragem por temperatura e entropia](./04-dataset-como-conjunto-minhash-lsh-temperatura.md) ➡️
