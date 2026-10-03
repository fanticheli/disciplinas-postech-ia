# 07 · Linhagem do modelo: hash SHA-256, Model Card, registry e Preference Tuning

> **Unidade 3 · Aula 5** · Leitura: ~10 min · Bloco: Fine-tuning via API (Vertex AI)

## 🎯 Em uma frase
Um endpoint publicado é só um identificador operacional. A aula transforma o job em um **artefato rastreável**: dataset identificado por **hash SHA-256** do conteúdo, hiperparâmetros realmente aplicados, modelo base e resultado, registrados num **Model Card**; e fecha com um segundo caminho, o **Preference Tuning** (DPO).

---

## 👵 Explicando para a vovó

Um carro que funciona não explica sua própria história. A ficha de manutenção diz quando saiu da fábrica, que peças foram trocadas, com que óleo e em que data. Sem ficha, quando o carro falhar ninguém sabe se mexeram nele.

O pulo do gato é identificar as peças pelo conteúdo, não pelo nome da etiqueta: a etiqueta «dataset-final-v2» pode ser colada em outra coisa, mas a impressão digital do conteúdo muda se qualquer detalhe mudar.

---

## 🔧 Tecnicamente

### O que é
- **Por que um endpoint não basta:** o mesmo projeto retreina várias vezes, troca hiperparâmetros, muda o modelo base, publica novo endpoint. Sem as relações registradas, é difícil explicar por que o comportamento mudou ou reproduzir um treino. É por isso que MLOps virou disciplina própria.
- **O que versionar (no mínimo 4):** o dataset (pelo conteúdo, não pelo nome do arquivo), os hiperparâmetros realmente aplicados (o módulo 3.3 mostrou que pedido e aplicado podem divergir), o modelo base (o checkpoint de origem, que o provedor pode aposentar) e o resultado (modelo ajustado, endpoints, identificadores do job).
- **Nome de arquivo não é versão:** alguém corrige um erro de digitação e sobe de novo para o mesmo caminho; o nome continua igual e o conteúdo mudou.
- **Hash SHA-256:** hexadecimal de 64 caracteres; mesma entrada, mesmo hash; qualquer alteração muda tudo. É o versionamento por conteúdo de Git e de imagens de container. Com o hash no Model Card, comparar com o arquivo atual é objetivo, sem depender de memória ou convenção de nomes.
- **Model Card:** documentação estruturada (a ideia vem do trabalho «Model Cards for Model Reporting», de pesquisadores do Google), numa versão enxuta: identificação do job, modelo ajustado, endpoint, estado, modelo base, dataset e hash, hiperparâmetros aplicados, estatísticas e linha do tempo.
- **Do Markdown ao registry:** para a escala da disciplina um arquivo Markdown basta; em escala maior o mesmo princípio é formalizado em Vertex AI Model Registry ou MLflow, que automatizam versões, métricas, promoção e rollback. Os campos são os mesmos.
- **Rastrear o dado e rastrear o modelo:** são dois níveis da mesma prática; do modelo publicado se desce ao job, ao dataset e aos exemplos.
- **Custo estimado versus real:** a ficha separa uma estimativa de referência (faixa de GPU cloud, para comparar com o caminho local) do custo efetivamente conferido no billing do Google Cloud: R$ 2,39 para o job de 200 exemplos (27.353 tokens × 3 épocas = 82.059 unidades à taxa real apurada de R$ 0,00002909).
- **Preference Tuning (DPO):** no SFT cada entrada tem um gabarito; no Preference Tuning o prompt tem duas respostas, uma preferida e uma rejeitada, e o modelo se aproxima da preferida e se afasta da outra. DPO otimiza direto sobre os pares, sem modelo de recompensa nem etapa de reinforcement learning.
- **O teste real:** 40 exemplos do módulo 3.2 viraram pares (a extração correta contra uma resposta de um prompt mais fraco, sem exigência de JSON); o job terminou com sucesso em ~17 min 32 s. O tempo menor não prova superioridade: o dataset é cinco vezes menor.
- **Onde cada um fica:** extração de campos tem resposta objetiva e SFT é o habitat natural; Preference Tuning ganha relevância quando a qualidade é subjetiva e há mais de uma resposta plausível (tom, voz de marca, linguagem de compliance, comunicado de sinistro, negativa de cobertura).

### Como funciona
- **Quase tudo é local:** calcular hash, duração, custo estimado, montar a ficha e gerar o Model Card não exige chamar o provedor; só a consulta ao job existente toca a nuvem. O artefato pode ser regenerado ou validado sem criar novo treino.
- **Testes:** o mesmo arquivo gera o mesmo hash, o valor tem 64 hexadecimais e conteúdos diferentes geram hashes diferentes; um job sem identificador obrigatório é rejeitado e a validação falha se o endpoint for removido; o Model Card carrega duração, hash, identificadores e dados financeiros. A aula cita 13 testes; a execução do repositório mostra 14.
- **Timestamps absolutos:** guardar criação e conclusão (não só duração) permite cruzar a mudança do modelo com deploys e incidentes.
- **Vale além da nuvem:** um adaptador LoRA (arquivo SafeTensor) também pode receber SHA-256; o hash é o mesmo em JavaScript e Python.
- **Missão prática:** converter o dataset, validar hiperparâmetros e comparar pedido e aplicado, implementar acompanhamento com backoff e um teste sem rede, e gerar a ficha com hash e campos mínimos de um Model Card. Simular a criação documentando o que seria enviado (hiperparâmetros, hash, custo estimado) é válido, e documentar uma decisão de não executar também é rastreabilidade.

### Onde aplicar
- Antes de promover um modelo a produção, gerar a ficha de linhagem e guardá-la com o artefato.
- Detectar alteração silenciosa de dataset comparando o hash do arquivo atual com o hash do Model Card.
- Escolher entre SFT e Preference Tuning pela natureza da tarefa: gabarito objetivo ou preferência subjetiva.
- Registrar a versão do modelo base, que o provedor pode aposentar.

### Vantagens e limites
**Vantagens**
- Um identificador de conteúdo é independente de nome, caminho e linguagem de processamento.
- A ficha responde a «qual dataset treinou aquele endpoint?» meses depois.
- Separa custo estimado de custo real e evita confundir infraestrutura própria com cobrança gerenciada.

**Limites**
- Markdown vira difícil de manter com muitos modelos; um registry formal automatiza, mas é mais infraestrutura.
- O hash prova identidade de conteúdo, não qualidade do dado.
- O Preference Tuning foi testado só com 40 pares e sem avaliação de qualidade na disciplina.

### 🚫 Armadilhas
- Documentar só o nome do arquivo: dá falsa sensação de versionamento.
- Esquecer de registrar o modelo base: o modelo ajustado continua publicado mas sua origem pode não aceitar mais treino.
- Concluir que Preference Tuning é melhor porque o job terminou mais rápido.
- Comparar custo estimado por GPU com a fatura do serviço gerenciado, que cobra por tokens.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Linhagem | Cadeia modelo, job, dataset e exemplos que explica a origem de um artefato |
| SHA-256 | Hash de conteúdo de 64 caracteres hexadecimais |
| Model Card | Ficha estruturada do modelo: origem, dataset, configuração, resultado |
| Model Registry | Registro com versões, métricas, promoção e rollback (Vertex AI, MLflow) |
| SFT | Supervised Fine-Tuning: resposta correta por entrada |
| Preference Tuning / DPO | Pares preferida e rejeitada otimizados diretamente, sem modelo de recompensa |
| Custo real versus estimado | Billing conferido versus faixa de referência de GPU |

---

## 💻 No código do repo

**Projeto:** [modulo-03-fine-tuning-via-api (versionamento e Model Cards)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-03-fine-tuning-via-api)

Ferramenta que lê o job real, calcula hash do dataset e gera a ficha e o Model Card, mais três artefatos prontos: o card do job principal, o card do Dolly e o dataset de preferência.

**Fluxo**
1. `model-versioning-tool.js`: `calcularHashDataset` (SHA-256 de `dataset-treinado.jsonl`), `consultarJobCompleto`, `gerarFichaVersionamento` (job, modelo base, hash, hiperparâmetros, estatísticas, endpoint, timestamps, custo estimado e real), `validarFichaCompleta` (campos obrigatórios), `gerarModelCardMarkdown` e `gerarSecaoDPO` (job de DPO como constante congelada).
2. `calcularCustoReal` = tokens cobráveis × épocas × R$ 0,00002909; `calcularCustoEstimado` usa as faixas de GPU do cheatsheet (US$ 0,40 a 0,80 por hora consumer; 2,50 a 4,00 H100).
3. `model-card-amplitude-auto-saude-m3-200.md` (e a versão `-py`, idêntica salvo a menção ao script) é o card de referência: 3 épocas, multiplicador 5, `ADAPTER_SIZE_FOUR`, 200 exemplos, 27.353 tokens, 45 min 42 s, R$ 2,39. `preference-dataset-amplitude.jsonl` tem 40 linhas com `completions` pontuadas.

**Como rodar**
- `TUNING_JOB_NAME=... node model-versioning-tool.js`: os 14 testes rodam local; a ficha exige `gcloud`.
- Para conferir o hash sem nuvem: `sha256sum dataset-treinado.jsonl`. Aqui resultou f6eb8f99…b52ed, igual ao do model card.

**Armadilhas e achados no código**
- Ao gerar a ficha com sucesso, o script **sobrescreve** `model-card-amplitude-auto-saude-m3-200.md` no repositório, o card de referência do curso; aponte para uma cópia se for usar com seu job.
- O hash é sempre do arquivo local `dataset-treinado.jsonl`, não do objeto no bucket referenciado pelo job: se seu dataset enviado for outro, a ficha mostrará um hash que não corresponde.
- O texto do model card fala em pares `chosen`/`rejected`, mas o arquivo de preferência usa `completions` com `score` 1.0 e 0.0.
- A aula cita 13 testes e a execução mostra 14; o job de DPO é uma constante fixa no código, não uma consulta.
- O card traz o ID de projeto e o bucket do autor, úteis só como exemplo de formato.

---

## 🔗 Para ir além
- [Repositório oficial, módulo 03 (Fine-Tuning via API)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-03-fine-tuning-via-api)
- [DPO e RLHF: InstructGPT (referência de RLHF)](https://arxiv.org/abs/2203.02155)
- [Google: supervised fine-tuning de modelos Gemini (indicação, relatório 14)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning)

---

⬅️ [06 · Hiperparâmetros, silêncio de API e automação segura: validar antes, comparar depois](./06-hiperparametros-e-automacao-segura.md)  ·  [08 · LoRA e PEFT: custo fixo em baixo volume, posto baixo e a família de técnicas eficientes](./08-lora-peft-teoria-e-custo-fixo.md) ➡️
