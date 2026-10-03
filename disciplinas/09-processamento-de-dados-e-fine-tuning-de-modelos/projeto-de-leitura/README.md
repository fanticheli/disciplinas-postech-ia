# 📚 Processamento de Dados e Fine-Tuning de Modelos: Guia de Leitura

> Resumo organizado da **Disciplina 09** da pós de Engenharia de IA Aplicada (autoria: **José Ahirton Batista Lopes Filho**).
> Cada assunto é explicado em **duas camadas**: 👵 *para a vovó* (analogias do mundo real) e 🔧 *tecnicamente* (nível sênior), e fecha com o que existe **no código do repositório** (ferramentas, dados e achados).

---

## 🗺️ Como usar este guia

Cada arquivo é auto-contido e segue sempre a mesma estrutura:

| Seção | Para quê serve |
|-------|----------------|
| 🎯 **Em uma frase** | O conceito destilado |
| 👵 **Explicando para a vovó** | Analogia do mundo real, sem jargão |
| 🔧 **Tecnicamente** | O que é, como funciona, onde aplicar, vantagens e limites, armadilhas |
| 🧩 **Cola rápida** | Glossário dos termos-chave |
| 💻 **No código do repo** | Fluxo por arquivo, como rodar e achados (bugs e inconsistências reais) |
| 🔗 **Para ir além** | Links de referência |

---

## 📘 Qual apostila cobre o quê

A disciplina tem **duas apostilas oficiais** em `material/`, que são a mesma obra em duas edições:

| Arquivo | Páginas | Conteúdo |
|---------|---------|----------|
| `apostila-oficial.pdf` | 146 | Edição completa: introdução, **Unidades 1 a 6** (21 aulas), revisão de cada unidade, revisão final e Anexo A com os links do GitHub; cada aula traz o bloco «GitHub e prática» apontando para o artefato do repositório |
| `apostila-edicao-anterior-u1-u5.pdf` | 112 | Edição anterior, com a mesma introdução e as **Unidades 1 a 5** (18 aulas), sem a Unidade 6 (Projeto Final) e sem os blocos «GitHub e prática» detalhados por aula |

Comparei o texto das duas (descontando cabeçalhos de página): as Unidades 1 a 5 são idênticas, salvo diferenças de diagramação. Portanto **a apostila completa cobre tudo** e a edição anterior é um subconjunto; este guia foi escrito sobre a apostila completa e usou a edição anterior só para conferir. Não há tópico duplicado entre elas.

**Numeração dos vídeos:** os comentários do código e os documentos do repositório usam «Módulo N.M» (por exemplo, «Módulo 1.3» ou «Módulo 5.4»). Isso corresponde a **Unidade N, Aula M** da apostila (PT-M).

---

## 🧭 Trilha de leitura sugerida

A ordem é a da apostila: decidir, preparar dados, treinar na nuvem, treinar local com LoRA, avaliar e fechar com o projeto final. O caso condutor é a **Amplitude Seguros** (seguradora fictícia, linhas Auto e Saúde Empresarial).

### Bloco 1 · Decidir: quando fazer fine-tuning
- [00 · Fine-tuning ensina comportamento, não fatos: gate de governança, 4 perguntas e os 3 casos](./00-comportamento-vs-conhecimento-4-perguntas-e-casos.md)
- [01 · AHP, NPV, Monte Carlo e Real Options: do sinal verde ao número](./01-ahp-npv-monte-carlo-real-options.md)
- [02 · Mapa das técnicas (o Zoo), casos de mercado e o risco de provedor e de obsolescência](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md)

### Bloco 2 · Dados: do documento ao dataset
- [03 · Do documento bruto ao exemplo validado: relevância, OCR, parser, esquema canônico e PII](./03-do-documento-ao-exemplo-validado.md)
- [04 · O dataset como conjunto: MinHash, LSH, amostragem por temperatura e entropia](./04-dataset-como-conjunto-minhash-lsh-temperatura.md)

### Bloco 3 · Fine-tuning via API (Vertex AI)
- [05 · Fine-tuning gerenciado na Vertex AI: diligência de provedor, os 5 passos e um job real](./05-vertex-ai-provedor-pipeline-e-job-real.md)
- [06 · Hiperparâmetros, silêncio de API e automação segura: validar antes, comparar depois](./06-hiperparametros-e-automacao-segura.md)
- [07 · Linhagem do modelo: hash SHA-256, Model Card, registry e Preference Tuning](./07-versionamento-model-card-e-preference-tuning.md)

### Bloco 4 · LoRA e PEFT
- [08 · LoRA e PEFT: custo fixo em baixo volume, posto baixo e a família de técnicas eficientes](./08-lora-peft-teoria-e-custo-fixo.md)
- [09 · Treinando LoRA local com MLX: split sem vazamento, validation loss e a curva que 20 iterações escondem](./09-lora-local-mlx-treino-e-curva.md)
- [10 · Rank, QLoRA e DoRA: transformando um hiperparâmetro em decisão medida](./10-rank-qlora-dora.md)
- [11 · Full Fine-Tuning versus LoRA: o teto existe, o custo também, e o critério de decisão](./11-full-fine-tuning-vs-lora.md)

### Bloco 5 · Avaliar modelos fine-tunados
- [12 · Teste retido de verdade e harness de avaliação: precisão por campo, consistência e esquema](./12-teste-retido-e-harness-de-avaliacao.md)
- [13 · Baseline, teste A/B, bootstrap, LLM-as-a-Judge e modelo conjunto versus separado](./13-baseline-ab-juiz-e-conjunto-vs-separado.md)
- [14 · Robustez, overfitting e artefato de medição: quando o número ruim é culpa da régua](./14-robustez-overfitting-e-artefato-de-medicao.md)
- [15 · Veredito de escala: checklist de graduação, gate reaberto, NPV real e o modelo local](./15-veredito-de-escala-e-npv-real.md)

### Bloco 6 · Projeto final
- [16 · Do modelo ao protótipo: classificar, rotear, validar e responder, recusando quando há incerteza](./16-assistente-arquitetura-e-implementacao.md)
- [17 · Decisões de arquitetura, escala para 3.000 exemplos (e a regressão) e o fechamento da disciplina](./17-decisoes-de-arquitetura-escala-3000-e-fechamento.md)

---

## ✅ Cobertura aula a aula (Disciplina 09)

| Unidade · Aula da apostila | Documento |
|----------------------------|-----------|
| **Introdução da disciplina** e mapa da disciplina | Seção [Mentalidade da disciplina](#-mentalidade-da-disciplina) deste README e [00](./00-comportamento-vs-conhecimento-4-perguntas-e-casos.md) |
| **U1 · Aula 1** · Quando fazer fine-tuning (PT-1): mito, 4 perguntas, escada, gate | [00 · Fine-tuning ensina comportamento, não fatos: gate de governança, 4 perguntas e os 3 casos](./00-comportamento-vs-conhecimento-4-perguntas-e-casos.md) |
| **U1 · Aula 2** · Quando fazer fine-tuning (PT-2): gate de governança e os 3 casos | [00 · Fine-tuning ensina comportamento, não fatos: gate de governança, 4 perguntas e os 3 casos](./00-comportamento-vs-conhecimento-4-perguntas-e-casos.md) |
| **U1 · Aula 3** · Quando fazer fine-tuning (PT-3): AHP, NPV, Monte Carlo, Real Options | [01 · AHP, NPV, Monte Carlo e Real Options: do sinal verde ao número](./01-ahp-npv-monte-carlo-real-options.md) |
| **U1 · Aula 3** · tipos de fine-tuning, risco de provedor e de obsolescência | [02 · Mapa das técnicas (o Zoo), casos de mercado e o risco de provedor e de obsolescência](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md) |
| **U2 · Aula 1** · Preparação de datasets (PT-1): relevância, OCR, parser, PII | [03 · Do documento bruto ao exemplo validado: relevância, OCR, parser, esquema canônico e PII](./03-do-documento-ao-exemplo-validado.md) |
| **U2 · Aula 2** · Preparação de datasets (PT-2): MinHash, LSH, temperatura, entropia | [04 · O dataset como conjunto: MinHash, LSH, amostragem por temperatura e entropia](./04-dataset-como-conjunto-minhash-lsh-temperatura.md) |
| **U3 · Aula 1** · Fine-tuning via API (PT-1): provedor e os 5 passos | [05 · Fine-tuning gerenciado na Vertex AI: diligência de provedor, os 5 passos e um job real](./05-vertex-ai-provedor-pipeline-e-job-real.md) |
| **U3 · Aula 2** · Fine-tuning via API (PT-2): conversão, upload e job real | [05 · Fine-tuning gerenciado na Vertex AI: diligência de provedor, os 5 passos e um job real](./05-vertex-ai-provedor-pipeline-e-job-real.md) |
| **U3 · Aula 3** · Fine-tuning via API (PT-3): hiperparâmetros e monitoramento | [06 · Hiperparâmetros, silêncio de API e automação segura: validar antes, comparar depois](./06-hiperparametros-e-automacao-segura.md) |
| **U3 · Aula 4** · Fine-tuning via API (PT-4): automação do pipeline | [06 · Hiperparâmetros, silêncio de API e automação segura: validar antes, comparar depois](./06-hiperparametros-e-automacao-segura.md) |
| **U3 · Aula 5** · Fine-tuning via API (PT-5): versionamento, Model Card, Preference Tuning | [07 · Linhagem do modelo: hash SHA-256, Model Card, registry e Preference Tuning](./07-versionamento-model-card-e-preference-tuning.md) |
| **U4 · Aula 1** · LoRA e PEFT (PT-1): custo fixo, posto baixo, família PEFT | [08 · LoRA e PEFT: custo fixo em baixo volume, posto baixo e a família de técnicas eficientes](./08-lora-peft-teoria-e-custo-fixo.md) |
| **U4 · Aula 2** · LoRA e PEFT (PT-2): treinamento local com MLX | [09 · Treinando LoRA local com MLX: split sem vazamento, validation loss e a curva que 20 iterações escondem](./09-lora-local-mlx-treino-e-curva.md) |
| **U4 · Aula 3** · LoRA e PEFT (PT-3): rank, QLoRA, DoRA | [10 · Rank, QLoRA e DoRA: transformando um hiperparâmetro em decisão medida](./10-rank-qlora-dora.md) |
| **U4 · Aula 4** · LoRA e PEFT (PT-4): Full Fine-Tuning versus LoRA | [11 · Full Fine-Tuning versus LoRA: o teto existe, o custo também, e o critério de decisão](./11-full-fine-tuning-vs-lora.md) |
| **U5 · Aula 1** · Avaliar modelos (PT-1): teste retido e harness | [12 · Teste retido de verdade e harness de avaliação: precisão por campo, consistência e esquema](./12-teste-retido-e-harness-de-avaliacao.md) |
| **U5 · Aula 2** · Avaliar modelos (PT-2): baseline, A/B, juiz, conjunto versus separado | [13 · Baseline, teste A/B, bootstrap, LLM-as-a-Judge e modelo conjunto versus separado](./13-baseline-ab-juiz-e-conjunto-vs-separado.md) |
| **U5 · Aula 3** · Avaliar modelos (PT-3): robustez, overfitting, artefato de medição | [14 · Robustez, overfitting e artefato de medição: quando o número ruim é culpa da régua](./14-robustez-overfitting-e-artefato-de-medicao.md) |
| **U5 · Aula 4** · Avaliar modelos (PT-4): veredito de escala e modelo local | [15 · Veredito de escala: checklist de graduação, gate reaberto, NPV real e o modelo local](./15-veredito-de-escala-e-npv-real.md) |
| **U6 · Aula 1** · Projeto final (PT-1): arquitetura, classificação e roteamento | [16 · Do modelo ao protótipo: classificar, rotear, validar e responder, recusando quando há incerteza](./16-assistente-arquitetura-e-implementacao.md) |
| **U6 · Aula 2** · Projeto final (PT-2): implementação JavaScript e caminho local | [16 · Do modelo ao protótipo: classificar, rotear, validar e responder, recusando quando há incerteza](./16-assistente-arquitetura-e-implementacao.md) |
| **U6 · Aula 3** · Projeto final (PT-3): decisões de arquitetura, escala e fechamento | [17 · Decisões de arquitetura, escala para 3.000 exemplos (e a regressão) e o fechamento da disciplina](./17-decisoes-de-arquitetura-escala-3000-e-fechamento.md) |
| **Revisões de unidade 1 a 6**, revisão final e perguntas de revisão | Checklist de domínio em [Mentalidade da disciplina](#-mentalidade-da-disciplina) e «Revisão final» em [17](./17-decisoes-de-arquitetura-escala-3000-e-fechamento.md) |
| **Anexo A** · GitHub da disciplina (links por módulo) | Seção [Materiais oficiais](#-materiais-oficiais-da-disciplina) deste README |

> As 21 aulas da apostila (6 unidades) estão cobertas em 18 documentos. U1 tem 3 aulas, U2 tem 2, U3 tem 5, U4 tem 4, U5 tem 4 e U6 tem 3. A aula 3 da Unidade 1 foi dividida em dois documentos (decisão financeira e mapa de técnicas), e duas aulas de U3 e uma de U6 foram agrupadas por afinidade.

---

## 🧪 Código do repositório absorvido

O código está em `modulo09-processamento-de-dados-e-fine-tuning-de-modelos/` do repositório do curso, na seção **Módulo 09** do README raiz (que lista os 6 módulos, as leituras recomendadas e as plataformas). Cada ferramenta existe em Node.js e Python (paridade funcional), sem dependências externas; o que é pago ou exige hardware está indicado em cada tópico. Cada pasta de módulo também traz uma **Atividade** e um **Exemplo resolvido** em PDF (as Missões Práticas 1 a 6).

| Projeto ou arquivo no GitHub | Onde está neste guia |
|------------------------------|----------------------|
| modulo-01 · `decision-framework-checklist.md`, `amplitude-seguros-casos.json` | [00 · Fine-tuning ensina comportamento, não fatos: gate de governança, 4 perguntas e os 3 casos](./00-comportamento-vs-conhecimento-4-perguntas-e-casos.md) |
| modulo-01 · `decision-framework-tool.js/.py` | [01 · AHP, NPV, Monte Carlo e Real Options: do sinal verde ao número](./01-ahp-npv-monte-carlo-real-options.md) |
| modulo-01 · `fine-tuning-types-cheatsheet.md`, `fine-tuning-zoo-poster.html`, `mecanismo-estado-arte-companion.html`, `grpo-verifiable-reward-demo.js/.py` | [02 · Mapa das técnicas (o Zoo), casos de mercado e o risco de provedor e de obsolescência](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md) |
| raiz · `casos-de-mercado`, `disponibilidade-provedores`, `risco-validade-modelo`, `historico-fine-tuning` (companions) e README raiz | [02 · Mapa das técnicas (o Zoo), casos de mercado e o risco de provedor e de obsolescência](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md) |
| modulo-01 a 06 · `Atividade N` e `Exemplo` em PDF (Missões Práticas 1 a 6) | [00 · Fine-tuning ensina comportamento, não fatos: gate de governança, 4 perguntas e os 3 casos](./00-comportamento-vs-conhecimento-4-perguntas-e-casos.md) |
| modulo-02 · `data-relevance-scoring-tool`, `extraction-to-jsonl-tool`, `pii-scrubbing-gate-tool`, `extracao-llm-multimodal-tool`, `documentos-brutos/`, `dataset-amplitude-seguros.jsonl`, comparativo OCR vs LLM e companion de privacidade | [03 · Do documento bruto ao exemplo validado: relevância, OCR, parser, esquema canônico e PII](./03-do-documento-ao-exemplo-validado.md) |
| modulo-02 · `dataset-cleaning-balancing-tool` e `de-para-bibliotecas-de-mercado.md` | [04 · O dataset como conjunto: MinHash, LSH, amostragem por temperatura e entropia](./04-dataset-como-conjunto-minhash-lsh-temperatura.md) |
| modulo-03 · `dataset-upload-and-tracking-tool`, `m3-dataset-scaling-tool`, `reavaliacao-saude-empresarial`, `dataset-treinado.jsonl`, `gcp-setup-companion.md` | [05 · Fine-tuning gerenciado na Vertex AI: diligência de provedor, os 5 passos e um job real](./05-vertex-ai-provedor-pipeline-e-job-real.md) |
| modulo-03 · `hyperparameter-and-monitoring-tool`, `finetuning-automation-tool`, `dolly-*`, companion e model card do Dolly | [06 · Hiperparâmetros, silêncio de API e automação segura: validar antes, comparar depois](./06-hiperparametros-e-automacao-segura.md) |
| modulo-03 · `model-versioning-tool`, model cards, `preference-dataset-amplitude.jsonl` | [07 · Linhagem do modelo: hash SHA-256, Model Card, registry e Preference Tuning](./07-versionamento-model-card-e-preference-tuning.md) |
| modulo-04 · `regional-lora-vs-cloud-npv`, `lora-managed-api-preview-tool` | [08 · LoRA e PEFT: custo fixo em baixo volume, posto baixo e a família de técnicas eficientes](./08-lora-peft-teoria-e-custo-fixo.md) |
| modulo-04 · `local-lora-training-tool`, `local-lora-training-hf-tool.py`, `mlx-data/`, `mlx-adapters/`, YAML do rank 8, `adapter-comparison-tool`, notebook e companion Colab LoRA, pôster GPU/CUDA, guia de execução local | [09 · Treinando LoRA local com MLX: split sem vazamento, validation loss e a curva que 20 iterações escondem](./09-lora-local-mlx-treino-e-curva.md) |
| modulo-04 · `lora-rank-tradeoff-tool`, `rank-adapter-comparison-tool`, YAMLs e adaptadores rank 4 e 16 | [10 · Rank, QLoRA e DoRA: transformando um hiperparâmetro em decisão medida](./10-rank-qlora-dora.md) |
| modulo-04 · `full-vs-lora-tradeoff-tool`, notebook e companion Colab de Full Fine-Tuning | [11 · Full Fine-Tuning versus LoRA: o teto existe, o custo também, e o critério de decisão](./11-full-fine-tuning-vs-lora.md) |
| modulo-05 · `model-evaluation-harness-tool`, `resultado-medido.json` | [12 · Teste retido de verdade e harness de avaliação: precisão por campo, consistência e esquema](./12-teste-retido-e-harness-de-avaliacao.md) |
| modulo-05 · `ab-and-domain-tradeoff-tool`, `amplitude-auto-only-120.jsonl`, `amplitude-saude-only-80.jsonl`, `casos-llm-as-judge-companion.md` | [13 · Baseline, teste A/B, bootstrap, LLM-as-a-Judge e modelo conjunto versus separado](./13-baseline-ab-juiz-e-conjunto-vs-separado.md) |
| modulo-05 · `overfitting-stress-test-tool` | [14 · Robustez, overfitting e artefato de medição: quando o número ruim é culpa da régua](./14-robustez-overfitting-e-artefato-de-medicao.md) |
| modulo-05 · `veredito-escala-tool`, `npv-real-vs-projetado-tool`, `avaliacao-modelo-local-tool`, notebook e companion Colab de avaliação | [15 · Veredito de escala: checklist de graduação, gate reaberto, NPV real e o modelo local](./15-veredito-de-escala-e-npv-real.md) |
| modulo-06 · `amplitude-seguros-assistente.js`, `chamar_modelo_local.py`, `chamar-modelo-local-hf.py`, notebook e companion Colab do modelo local | [16 · Do modelo ao protótipo: classificar, rotear, validar e responder, recusando quando há incerteza](./16-assistente-arquitetura-e-implementacao.md) |
| modulo-06 · `m6-dataset-scaling-tool`, `m6-scaled-model-verification-tool`, dataset de 3.000, `decisoes-de-arquitetura.md`, guias, pôster do estado da fronteira | [17 · Decisões de arquitetura, escala para 3.000 exemplos (e a regressão) e o fechamento da disciplina](./17-decisoes-de-arquitetura-escala-3000-e-fechamento.md) |

---

## 🎓 Mentalidade da disciplina

A introdução e a revisão final da apostila resumem o fio condutor:

- Fine-tuning é uma das últimas opções, não a primeira: ensina comportamento e formato, não fatos (RAG resolve conhecimento). ([00 · Fine-tuning ensina comportamento, não fatos: gate de governança, 4 perguntas e os 3 casos](./00-comportamento-vs-conhecimento-4-perguntas-e-casos.md))
- Governança é um bloqueador binário que roda antes das 4 perguntas; as 4 perguntas são condições necessárias, não compensáveis, e o score ponderado nunca substitui o gate. ([01 · AHP, NPV, Monte Carlo e Real Options: do sinal verde ao número](./01-ahp-npv-monte-carlo-real-options.md))
- Dado é a restrição estrutural: o gate de relevância, o esquema canônico, o scrubbing de PII e a medição de redundância e diversidade vêm antes do treino. ([03 · Do documento bruto ao exemplo validado: relevância, OCR, parser, esquema canônico e PII](./03-do-documento-ao-exemplo-validado.md))
- Em APIs gerenciadas, silêncio não é confirmação: valide antes da rede, compare pedido e aplicado, confirme antes de ação cara, e versione por conteúdo (hash e Model Card). ([06 · Hiperparâmetros, silêncio de API e automação segura: validar antes, comparar depois](./06-hiperparametros-e-automacao-segura.md))
- LoRA entra depois que o gate disse sim e decide o custo fixo; rank, quantização e DoRA são decisões medidas, e o Full tem teto real, mas só vale se o ganho passar de um limiar explícito. ([10 · Rank, QLoRA e DoRA: transformando um hiperparâmetro em decisão medida](./10-rank-qlora-dora.md))
- Avaliar é construir evidência independente: teste retido, baseline sob o mesmo protocolo, estresse escrito à mão, e investigar a régua antes de culpar o modelo. ([14 · Robustez, overfitting e artefato de medição: quando o número ruim é culpa da régua](./14-robustez-overfitting-e-artefato-de-medicao.md))
- Um endpoint não é um produto: arquitetura, política de recusa, documentação das decisões, e medir de novo ao escalar, porque mais dado não garante manter o que funcionava. ([16 · Do modelo ao protótipo: classificar, rotear, validar e responder, recusando quando há incerteza](./16-assistente-arquitetura-e-implementacao.md))

Checklist de domínio (perguntas da revisão final): em que situação o framework interrompe a recomendação de fine-tuning; por que um dataset válido exemplo a exemplo pode ser inadequado como conjunto; como comparar pedido e aplicado reduz risco operacional; por que hash e Model Card importam para a linhagem; como rank e scale mudam a decisão de um LoRA; em que condições o ganho do Full justificaria memória e armazenamento.

---

## 🔎 Achados no repositório (resumo)

Inconsistências reais que encontrei lendo e rodando o código (detalhes em cada tópico):

**Apostila versus código**
- Razão de consistência do AHP: a aula diz ~0,038, o código imprime 0,0038 ([01](./01-ahp-npv-monte-carlo-real-options.md)).
- Adapter size 4: a aula o apresenta como escolha; o repositório nunca o envia na criação do job e o documento de decisões o admite como default silencioso ([06](./06-hiperparametros-e-automacao-segura.md), [17](./17-decisoes-de-arquitetura-escala-3000-e-fechamento.md)).
- Número efetivo de fontes de Auto na aula 3.2 (5,516) não bate com o código (5,160) ([05](./05-vertex-ai-provedor-pipeline-e-job-real.md)); testes do versionamento: 13 na aula, 14 no código ([07](./07-versionamento-model-card-e-preference-tuning.md)); checkpoint Full 73,8x (aula) contra 76,6x (código) ([11](./11-full-fine-tuning-vs-lora.md)); curva de 125 iterações (aula) contra 120 (código) ([09](./09-lora-local-mlx-treino-e-curva.md)).
- Custo do job de 200 exemplos: cinco a onze centavos de dólar na aula e R$ 2,39 no billing registrado no model card ([05](./05-vertex-ai-provedor-pipeline-e-job-real.md), [07](./07-versionamento-model-card-e-preference-tuning.md)).
- Faixa do genérico com hint de formato: 54,5% a 72,7% na aula e nos fallbacks do código; 54,5% a 66,7% no ledger versionado ([13](./13-baseline-ab-juiz-e-conjunto-vs-separado.md), [15](./15-veredito-de-escala-e-npv-real.md)). Colab local: 97% na aula e 100% no companion ([15](./15-veredito-de-escala-e-npv-real.md)); val loss do Colab LoRA: 0,8305 na aula e 0,8248 no companion ([09](./09-lora-local-mlx-treino-e-curva.md)).

**Repositório**
- O README raiz fala em 6 e em 7 tipos de fine-tuning, diz que os pesos LoRA não estão no repositório (os de rank 4, 8 e 16 estão) e cita val loss 4,856 para 0,779, que não aparece em nenhum lugar ([02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md), [09](./09-lora-local-mlx-treino-e-curva.md), [11](./11-full-fine-tuning-vs-lora.md)).
- `fine-tuning-zoo-poster.png` é citado pelo checklist e pelo cheatsheet, mas só existe o HTML do pôster ([02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md)). O checkpoint Full não está no repositório (vem do Hugging Face) ([11](./11-full-fine-tuning-vs-lora.md)).
- O gate de PII é uma ferramenta separada: o JSONL de extração guarda nomes completos e um ruído de OCR no rótulo (`QJk-4F82`) ([03](./03-do-documento-ao-exemplo-validado.md)).
- O assistente do módulo 6 deixa passar queixas de atendimento que contenham uma só palavra de domínio (`veículo`, `hospital`, `consulta`) ([16](./16-assistente-arquitetura-e-implementacao.md)).
- `m6-dataset-scaling-tool` não grava o JSONL que o leia-me diz reproduzir ([17](./17-decisoes-de-arquitetura-escala-3000-e-fechamento.md)). Ferramentas gravam dentro do repositório ao rodar (`mlx-data/`, model card, `resultado-medido.json`) ([07](./07-versionamento-model-card-e-preference-tuning.md), [09](./09-lora-local-mlx-treino-e-curva.md), [12](./12-teste-retido-e-harness-de-avaliacao.md)).
- Dataset de 200 exemplos: só 28 nomes, placas e valores distintos; no teste retido de 11, todos os valores e 6 placas já estavam no treino ([12](./12-teste-retido-e-harness-de-avaliacao.md)). A «curva de convergência» impressa é fixa no código ([09](./09-lora-local-mlx-treino-e-curva.md)).
- Pergunta 3 de Saúde (0,62) é projeção linear, não medição ([05](./05-vertex-ai-provedor-pipeline-e-job-real.md), [15](./15-veredito-de-escala-e-npv-real.md)). Os R$ 2.400 de custo fixo são ilustrativos e o job real custou R$ 2,39 ([08](./08-lora-peft-teoria-e-custo-fixo.md), [15](./15-veredito-de-escala-e-npv-real.md)).
- Gemini 2.5 tem retirement anunciado para 16/out/2026 segundo o companion e comentários do código do repositório (a apostila não cita a data); os módulos 2, 3, 5 e 6 dependem dele ([02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md)).

**O que ficou incerto ou fora**
- Não executei nada que dependa de Vertex AI/gcloud, Tesseract, MLX (Apple Silicon), Ollama, GPU CUDA ou Colab; as afirmações sobre resultados dessas etapas vêm da apostila e dos companions do repositório, que as marcam como medidas pelo autor. Executei offline, em cópia, as ferramentas de módulo 1, 2 (menos extração com Tesseract), 3 (conversão, escala, testes), 4 (custo, rank, Full versus LoRA, preparação de dados), 5 (veredito e NPV) e 6 (gerador de dataset), em JS e, por amostragem, em Python.
- A contagem de 28 testes da extração com Tesseract foi feita lendo o código.
- A hipótese de que os ~5,12 bilhões de parâmetros citados nos companions de Colab incluem tabelas de embeddings por camada não foi verificada.
- Os nomes de modelos e preços de GPU citados são de ago/set de 2026 e envelhecem; a retirada do Gemini 2.5 em 16/10/2026 vem do repositório (companion de risco e comentários de código), não da apostila, e não foi conferida na documentação da Google.
- As indicações de leitura sem URL no PDF (Anyscale, Intercom, Harvey fora do blog etc.) foram resumidas sem link.

---

## 🧰 Materiais oficiais da disciplina

- **Repositório de código:** https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos
- **Pastas do módulo:** `modulo-01-decision-framework`, `modulo-02-preparacao-datasets`, `modulo-03-fine-tuning-via-api`, `modulo-04-lora-e-peft`, `modulo-05-avaliacao-modelos`, `modulo-06-projeto-final`, mais quatro companions na raiz (casos de mercado, disponibilidade de provedores, risco de validade de modelo, histórico do fine-tuning).
- **Stack:** Node.js e Python; fine-tuning gerenciado na Vertex AI (`gemini-2.5-flash`); treino local com MLX-LM e Gemma 4 E2B (`mlx-community/gemma-4-e2b-it-bf16`); alternativas Hugging Face (`transformers`, `peft`, `trl`) para Colab e CUDA.
- **Aviso de custo:** as ferramentas que chamam a Vertex AI fazem chamada real e paga (jobs de R$ 0,86 a R$ 41,40 segundo o README); cada aluno configura `GCP_PROJECT_ID`, `TUNING_JOB_NAME`, `ENDPOINT_MODULO32` e `ENDPOINT_MODULO63`.

### Indicações de leitura complementar

O PDF de indicações lista 25 referências científicas, 23 de mercado e 2 vídeos. Resumo, com os tópicos onde cada uma aparece:

**1. Referências científicas**
1. **Hu et al. (Microsoft). LoRA: Low-Rank Adaptation of Large Language Models. arXiv:2106.09685, 2021.** Aprende duas matrizes de posto baixo escaladas por alfa sobre r, sem trocar a arquitetura. Relaciona-se com [08](./08-lora-peft-teoria-e-custo-fixo.md), [10](./10-rank-qlora-dora.md). https://arxiv.org/abs/2106.09685
2. **Dettmers et al. QLoRA: Efficient Finetuning of Quantized LLMs. arXiv:2305.14314, NeurIPS 2023.** LoRA com quantização de 4 bits: modelo de 65B numa GPU de 48 GB (Guanaco, 99,3% do ChatGPT no Vicuna). Relaciona-se com [02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md), [10](./10-rank-qlora-dora.md). https://arxiv.org/abs/2305.14314
3. **Li e Liang. Prefix-Tuning. arXiv:2101.00190, ACL 2021.** Otimiza um prefixo contínuo nas ativações de atenção com o modelo congelado. Relaciona-se com [08](./08-lora-peft-teoria-e-custo-fixo.md). https://arxiv.org/abs/2101.00190
4. **Lester, Al-Rfou, Constant. The Power of Scale for Parameter-Efficient Prompt Tuning. arXiv:2104.08691, EMNLP 2021.** Com modelos de bilhões de parâmetros, um prompt contínuo aprendido fecha o gap contra o ajuste completo. Relaciona-se com [08](./08-lora-peft-teoria-e-custo-fixo.md). https://arxiv.org/abs/2104.08691
5. **Houlsby et al. Parameter-Efficient Transfer Learning for NLP. arXiv:1902.00751, ICML 2019.** Módulos adapter: 0,4% de diferença para o fine-tuning completo com 3,6% dos parâmetros por tarefa. Relaciona-se com [08](./08-lora-peft-teoria-e-custo-fixo.md). https://arxiv.org/abs/1902.00751
6. **Wei et al. (Google). Finetuned Language Models Are Zero-Shot Learners. arXiv:2109.01652, 2021.** FLAN: 137B ajustado em mais de 60 tarefas superou o GPT-3 175B em 20 de 25 tarefas inéditas. Relaciona-se com [02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md). https://arxiv.org/abs/2109.01652
7. **Ouyang et al. (OpenAI). Training Language Models to Follow Instructions with Human Feedback. arXiv:2203.02155, 2022.** InstructGPT: um modelo de 1,3B com RLHF foi preferido ao GPT-3 de 175B. Relaciona-se com [02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md). https://arxiv.org/abs/2203.02155
8. **DeepSeek-AI. DeepSeek-R1. arXiv:2501.12948, 2025.** Destilação de 800 mil exemplos do modelo de 671B para modelos de 1,5B a 70B. Relaciona-se com [02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md). https://arxiv.org/abs/2501.12948
9. **Chen et al. (OpenAI). Evaluating Large Language Models Trained on Code. arXiv:2107.03374, 2021.** Codex: GPT-3 com fine-tune completo em 159 GB de código; 28,8% no HumanEval contra 0%. Relaciona-se com [02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md). https://arxiv.org/abs/2107.03374
10. **Zhou et al. LIMA: Less Is More for Alignment. arXiv:2305.11206, NeurIPS 2023.** 65B com só 1.000 exemplos curados, sem RLHF: curadoria sobre volume. Relaciona-se com [03](./03-do-documento-ao-exemplo-validado.md). https://arxiv.org/abs/2305.11206
11. **Lee et al. (Google Research). Deduplicating Training Data Makes Language Models Better. arXiv:2107.06499, ACL 2022.** No C4, uma frase de 61 palavras repetida mais de 60 mil vezes; deduplicar reduz texto memorizado em cerca de 10 vezes. Relaciona-se com [04](./04-dataset-como-conjunto-minhash-lsh-temperatura.md). https://arxiv.org/abs/2107.06499
12. **Broder. On the Resemblance and Containment of Documents. SEQUENCES, IEEE, 1997.** Paper original do MinHash: assinatura de números fixos que estima o Jaccard. Relaciona-se com [04](./04-dataset-como-conjunto-minhash-lsh-temperatura.md).
13. **Raffel et al. T5. arXiv:1910.10683, JMLR 2020.** Formaliza a amostragem por temperatura para balancear fontes. Relaciona-se com [04](./04-dataset-como-conjunto-minhash-lsh-temperatura.md). https://arxiv.org/abs/1910.10683
14. **Xue et al. mT5. arXiv:2010.11934, NAACL 2021.** 101 idiomas, alfa = 0,3 na amostragem por temperatura (o mesmo valor do pipeline da disciplina). Relaciona-se com [04](./04-dataset-como-conjunto-minhash-lsh-temperatura.md). https://arxiv.org/abs/2010.11934
15. **Hill (1973) e Jost (2006). Diversity and Evenness / Entropy and Diversity.** Número efetivo de espécies, aqui número efetivo de fontes: exp da entropia de Shannon. Relaciona-se com [04](./04-dataset-como-conjunto-minhash-lsh-temperatura.md).
16. **Saaty. The Analytic Hierarchy Process. McGraw-Hill, 1980.** Pesos a partir de comparação pareada, com Razão de Consistência. Relaciona-se com [01](./01-ahp-npv-monte-carlo-real-options.md).
17. **Halevy, Norvig e Pereira (Google). The Unreasonable Effectiveness of Data. IEEE Intelligent Systems, 2009.** Em muitos problemas, mais dado supera arquitetura mais sofisticada; usado para explicar por que o job conjunto (200) bateu os separados (80 e 120). Relaciona-se com [13](./13-baseline-ab-juiz-e-conjunto-vs-separado.md).
18. **Ovadia et al. (Microsoft). Fine-Tuning or Retrieval? arXiv:2312.05934, EMNLP 2024.** RAG supera fine-tuning de forma consistente para injetar conhecimento novo; em um modelo, fine-tuning sozinho piorou a acurácia. Relaciona-se com [00](./00-comportamento-vs-conhecimento-4-perguntas-e-casos.md). https://arxiv.org/abs/2312.05934
19. **Liu et al. (NVIDIA). DoRA. arXiv:2402.09353, ICML 2024.** Decompõe a atualização em magnitude e direção; na disciplina empatou com o LoRA rank 8. Relaciona-se com [10](./10-rank-qlora-dora.md). https://arxiv.org/abs/2402.09353
20. **Bai et al. (Anthropic). Constitutional AI. arXiv:2212.08073, 2022.** O próprio modelo se autocritica contra princípios escritos, reduzindo a anotação humana. Relaciona-se com [02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md). https://arxiv.org/abs/2212.08073
21. **Lee et al. (Google DeepMind). RLAIF vs. RLHF. arXiv:2309.00267, 2023.** Rotulagem por feedback de IA custa US$ 0,06 contra US$ 0,67 humano, com qualidade comparável. Relaciona-se com [02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md). https://arxiv.org/abs/2309.00267
22. **Shao et al. (DeepSeek-AI). DeepSeekMath. arXiv:2402.03300, 2024.** Introduz o GRPO: vantagem pela média e desvio do grupo, sem modelo crítico. Relaciona-se com [02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md). https://arxiv.org/abs/2402.03300
23. **Yu et al. DAPO. arXiv:2503.14476, 2025.** Nomeia o grupo degenerado: recompensas iguais zeram a vantagem e o sinal de treino. Relaciona-se com [02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md). https://arxiv.org/abs/2503.14476
24. **Google DeepMind. Gemini 2.5. arXiv:2507.06261, 2025.** Cita recompensas generativas baseadas em modelo, inspiradas em Constitutional AI, em produção. Relaciona-se com [02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md). https://arxiv.org/abs/2507.06261
25. **LLM-Anonymizer. NEJM AI, DOI 10.1056/AIdbp2400537, 2025.** Llama-3 70B local desidentificando 250 cartas clínicas: 99,24% dos caracteres de PHI redigidos, 2,43% de falso positivo. Relaciona-se com [03](./03-do-documento-ao-exemplo-validado.md).

**2. Referências de mercado e relatórios**
1. **OpenAI. Indeed builds an AI-powered virtual recruiter.** Fine-tuning de modelo menor com 60% menos tokens que few-shot em escala. Relaciona-se com [00](./00-comportamento-vs-conhecimento-4-perguntas-e-casos.md).
2. **Kadous e Hakhamaneshi (Anyscale). Fine Tuning Is For Form, Not Facts. 2023.** O modelo continuou respondendo «Romeo» depois do fine-tuning com «Bob». Relaciona-se com [00](./00-comportamento-vs-conhecimento-4-perguntas-e-casos.md).
3. **Predibase. Fine-Tuned SLMs Help Checkr Optimize Background Checks.** Llama-3-8B com LoRA: 90% nos casos difíceis, 5x mais barato e 30x mais rápido que GPT-4. Relaciona-se com [02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md), [08](./08-lora-peft-teoria-e-custo-fixo.md).
4. **OpenAI. Customizing models for legal professionals (Harvey). 2023.** Advogados preferiram o modelo ajustado ao GPT-4 em 97% dos casos. Relaciona-se com [02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md).
5. **Harvey. Expanding Harvey's Model Offerings. 13/05/2025.** Sete modelos de fronteira sem fine-tuning jurídico já superavam o customizado. Relaciona-se com [02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md).
6. **Applied Compute. Case study Harvey. 2026.** Re-treino (GLM-5.1) recuperou a liderança, com avaliação 5x mais barata. Relaciona-se com [02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md).
7. **OpenAI. Introducing Structured Outputs in the API. 2024.** Garante aderência a um schema JSON sem fine-tuning. Relaciona-se com [00](./00-comportamento-vs-conhecimento-4-perguntas-e-casos.md).
8. **Jaffer (OpenAI), citado em Gupta. RAG vs Fine-tuning vs Prompt Engineering.** Ordem de escalar: prompt, RAG, só então fine-tuning. Relaciona-se com [00](./00-comportamento-vs-conhecimento-4-perguntas-e-casos.md).
9. **OpenAI. API deprecations (fine-tuning self-serve).** Orgs novas bloqueadas desde maio/2026, desligamento total em janeiro/2027. Relaciona-se com [02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md), [05](./05-vertex-ai-provedor-pipeline-e-job-real.md).
10. **Google. Model tuning da Gemini API.** Fine-tuning público descontinuado desde maio de 2025. Relaciona-se com [02](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md), [05](./05-vertex-ai-provedor-pipeline-e-job-real.md).
11. **Hugging Face. Biblioteca PEFT.** LoRA, QLoRA, Prefix, Prompt Tuning e Adapters numa interface só. Relaciona-se com [08](./08-lora-peft-teoria-e-custo-fixo.md).
12. **Tesseract OCR. Projeto open source.** Motor de OCR usado no pipeline de extração. Relaciona-se com [03](./03-do-documento-ao-exemplo-validado.md).
13. **Brasil. LGPD, Lei 13.709/2018, Art. 5º II, Art. 7º, Art. 11.** Base legal do gate de governança. Relaciona-se com [00](./00-comportamento-vs-conhecimento-4-perguntas-e-casos.md), [03](./03-do-documento-ao-exemplo-validado.md).
14. **Google. About supervised fine-tuning for Gemini models. 2026.** Modelos suportados: gemini-2.5-pro, flash e flash-lite; evolução do Vertex AI. Relaciona-se com [05](./05-vertex-ai-provedor-pipeline-e-job-real.md), [07](./07-versionamento-model-card-e-preference-tuning.md).
15. **Google DeepMind. VaultGemma. 2025.** LLM de escala de produção treinado do zero com DP-SGD (privacidade diferencial). Relaciona-se com [03](./03-do-documento-ao-exemplo-validado.md).
16. **ANPD. Nota Técnica 12/2025 e Agenda Regulatória 2026-2027.** Privacidade diferencial e anonimização como mitigação obrigatória de RIPD. Relaciona-se com [03](./03-do-documento-ao-exemplo-validado.md).
17. **Microsoft. Presidio.** Regex para identificador estruturado mais NER (spaCy) para nome; ~13 tipos de entidade. Relaciona-se com [03](./03-do-documento-ao-exemplo-validado.md).
18. **EXL e NVIDIA. EXL launches specialized Insurance LLM. 2024.** SFT + LoRA em 25 anos de dados de sinistro: +30% de acurácia e -30% de custo operacional. Relaciona-se com [16](./16-assistente-arquitetura-e-implementacao.md).
19. **Nubank. Your Spending Needs Attention. arXiv:2507.23267.** Transformer sobre sequência bruta de transações, +1,25% de AUC relativo, 100 milhões de clientes. Relaciona-se com [16](./16-assistente-arquitetura-e-implementacao.md).
20. **Intercom. Announcing Fin Apex. 26/03/2026.** Modelo pós-treinado para resolução de tickets: 73,1% de resolução autônoma. Relaciona-se com [17](./17-decisoes-de-arquitetura-escala-3000-e-fechamento.md).
21. **Fortune. Replit wiped a company's production database. 23/07/2025.** Contraponto ao design de recusa: nunca inventar resposta sem certeza. Relaciona-se com [16](./16-assistente-arquitetura-e-implementacao.md).
22. **Hugging Face. Anatomy of a Frontier Lab Agent Intrusion. 27/07/2026.** Dois modelos escaparam de um sandbox e comprometeram infraestrutura real; motiva a disciplina seguinte. Relaciona-se com [17](./17-decisoes-de-arquitetura-escala-3000-e-fechamento.md).
23. **Hassabis. A Framework for Frontier AI and the Dawning of a New Age. 14/07/2026.** Ensaio sobre AGI e um órgão de padrões no modelo da FINRA. Relaciona-se com [17](./17-decisoes-de-arquitetura-escala-3000-e-fechamento.md).

**3. Vídeos**
1. **IBM Technology (Martin Keen). Is Fine-Tuning Still Needed? LLMs, RAG, & LoRA.** RAG versus fine-tuning versus LoRA como decisão prática, mesmo com modelos de fronteira melhores. Relaciona-se com [00](./00-comportamento-vs-conhecimento-4-perguntas-e-casos.md), [08](./08-lora-peft-teoria-e-custo-fixo.md).
2. **Sebastian Raschka. Finetuning LLMs for Classification. Abril/2025.** 19 experimentos (inclusive LoRA versus Full) para virar um LLM decoder-only em classificador. Relaciona-se com [09](./09-lora-local-mlx-treino-e-curva.md), [11](./11-full-fine-tuning-vs-lora.md).

---

*Guia gerado a partir da apostila oficial (apostila completa e edição anterior: 146 e 112 págs), das indicações de leitura (15 págs) e do código do repositório da disciplina.*
