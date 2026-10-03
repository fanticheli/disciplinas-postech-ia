# 08 · LoRA e PEFT: custo fixo em baixo volume, posto baixo e a família de técnicas eficientes

> **Unidade 4 · Aula 1** · Leitura: ~11 min · Bloco: LoRA e PEFT

## 🎯 Em uma frase
LoRA entra **depois** que o gate disse sim: a pergunta passa a ser a forma economicamente mais adequada de executar o ajuste. Com volume pequeno, o **custo fixo por treino** pode matar o NPV; LoRA congela o modelo e treina duas matrizes de **posto baixo** (menos de 0,2% dos pesos no piloto), dentro da família maior chamada **PEFT**.

---

## 👵 Explicando para a vovó

Reformar uma sala não exige derrubar a casa e reconstruir. Você mantém as paredes (o modelo congelado) e pendura quadros e prateleiras (as pequenas matrizes treinadas). Para cada parceiro que quer a sala de um jeito, você guarda só os quadros dele, não uma casa inteira nova.

A intuição do «posto baixo» é parecida com uma planilha em que cada linha é só a anterior multiplicada por um número: parece ter muita informação, mas só tem uma ideia repetida em escalas diferentes. O ajuste necessário costuma ser assim, bem mais «redundante» do que parece.

---

## 🔧 Tecnicamente

### O que é
- **Duas decisões separadas:** a primeira (vale fazer fine-tuning?) já foi resolvida pelo gate. LoRA não salva um caso que deveria ter sido reprovado, como Atendimento ao Cliente: o problema ali nunca foi custo de treino, foi tarefa aberta e instável.
- **Custo fixo em operações menores:** o caso nacional processa milhares de sinistros por mês, o que dilui o custo fixo. Parcerias regionais (Sul, Nordeste) fazem a mesma tarefa com volume de algumas centenas por mês; pagar GPU alugada para cada parceria pode destruir a viabilidade.
- **Mesma conta, dois caminhos:** para 400 documentos por mês, o NPV em 24 meses com um custo fixo ilustrativo de R$ 2.400 por treino fica em cerca de menos R$ 2.041, sem break-even; com LoRA local (custo marginal próximo do tempo de máquina), cerca de mais R$ 359, com break-even já no primeiro mês. Cinco parcerias seriam R$ 12 mil de treino, sem nenhuma chegando ao break-even sozinha.
- **O valor de R$ 2.400 não é cotação:** é um número ilustrativo do case; para análise real, usar o preço atual da GPU vezes as horas efetivas.
- **O que LoRA faz:** a ideia vem de Hu e colegas (2021, formalizada no ICLR 2022): a mudança de pesos necessária para adaptar um modelo grande tem estrutura de posto baixo. LoRA não atualiza a matriz original W durante o fine-tuning. A atualização é o produto de duas matrizes menores (A e B) com posto R muito menor que as dimensões de W, somada à saída original com um fator de escala ligado a alfa e R. O gradiente flui só para A e B.
- **Economia de parâmetros:** numa matriz de 1.000 por 1.000 (1 milhão de números), posto 4 usa duas matrizes de 1.000 por 4 e 4 por 1.000, ou 8 mil números treináveis (menos de 1%).
- **Piloto da disciplina:** no Gemma, o adaptador LoRA tem ~6,8 milhões de parâmetros treináveis contra ~4,6286 bilhões totais, cerca de 0,147%. Isso explica treinar em hardware de consumidor, em minutos.
- **Armazenamento:** com Full Fine-Tuning, cada parceria teria um checkpoint completo (modelo base de ~10,24 GB, cinco cópias passariam de 51 GB); com LoRA, uma cópia da base mais cinco adaptadores de poucas dezenas de megabytes.
- **O job gerenciado do módulo 3 já era adapter:** o campo `adapterSize` do Model Card se refere justamente a esse ajuste eficiente; o Full Fine-Tuning de verdade só aparece mais adiante.
- **A família PEFT (quatro grupos):** métodos de adição (adapters: módulos pequenos em gargalo entre camadas, com base congelada), métodos seletivos (BitFit treina só os termos de viés, abaixo de 0,1% dos parâmetros em variantes de BERT), soft prompts (Prefix Tuning e Prompt Tuning aprendem vetores contínuos por gradiente, não palavras) e reparametrização (LoRA).
- **QLoRA:** LoRA sobre uma base quantizada (por exemplo 4 bits), que reduz a memória e permite modelos maiores numa única GPU de consumidor.
- **Caso Checkr:** Llama de 8 bilhões classificando registros de verificação de antecedentes: ~90% de acurácia nos casos mais difíceis (cerca de 2% do conjunto), ~97% no geral, ~5 vezes mais barato e 30 vezes mais rápido que a solução com GPT-4.
- **Por que LoRA venceu na engenharia:** Prefix e Prompt Tuning consomem janela de contexto; adapters adicionam etapas sequenciais e podem aumentar latência de inferência. Depois do treino, a contribuição B vezes A pode ser somada a W (merge) uma única vez, e a inferência não paga custo extra.
- **PEFT não muda RAG versus fine-tuning:** a biblioteca PEFT (Hugging Face) reúne várias técnicas numa interface comum e reduz a barreira de implementação, mas só reduz o custo de exercer a opção de fine-tuning quando ela já foi aprovada.

### Como funciona
- **Reuso do NPV:** o script de comparação reaproveita `calcularNPV` do framework do módulo 1 (mesmo custo por chamada, só muda o custo fixo), para a comparação ser justa.
- **Previsão do próximo passo:** a aula antecipa o treino local em Apple Silicon com MLX-LM, validation loss de 4,752 para 0,895 em 20 iterações, a comparação de ranks e, por fim, Full versus LoRA com limites reais de memória.
- **Missão prática:** comparar, para um caso de baixo volume, o raciocínio financeiro entre treino gerenciado e LoRA local, registrar o custo fixo usado e refazê-lo com premissa adequada ao seu contexto, e explicar por que a decisão sobre LoRA acontece depois do gate.

### Onde aplicar
- Atender muitas variantes pequenas de uma mesma tarefa (parceiros, regiões, clientes) com um modelo base compartilhado e um adaptador por variante.
- Treinar em hardware de consumidor quando o volume não justifica GPU de datacenter.
- Entender, ao ler a documentação de um provedor gerenciado, que parâmetros como rank e adapter size descrevem esse mesmo mecanismo.
- Escolher entre as famílias PEFT pensando em contexto consumido e latência de inferência.

### Vantagens e limites
**Vantagens**
- Treina uma fração mínima dos parâmetros, com muito menos memória, custo e tempo.
- Adaptadores pequenos, trocáveis e compartilhando a mesma base.
- Depois do merge não há custo extra de inferência.

**Limites**
- Não corrige um caso que o gate reprovaria.
- A conta financeira depende de premissas ilustrativas, como o custo fixo de R$ 2.400.
- O teto de qualidade pode ser menor que o de Full Fine-Tuning (tópico 11).

### 🚫 Armadilhas
- Usar LoRA para «salvar» uma tarefa aberta ou instável.
- Tratar R$ 2.400 como preço de mercado.
- Achar que técnica eficiente só existe no treino local: ela aparece por baixo de ferramentas gerenciadas.
- Esquecer que scale (alfa dividido por R) e rank controlam coisas diferentes: intensidade versus capacidade.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| PEFT | Parameter-Efficient Fine-Tuning: treinar uma pequena fração de parâmetros |
| LoRA | Low-Rank Adaptation: base congelada mais duas matrizes de baixo posto |
| Posto (rank) | Dimensão interna das matrizes A e B; controla a capacidade do adaptador |
| Merge | Somar B vezes A a W uma vez, sem custo extra de inferência |
| Adapters | Módulos em gargalo inseridos entre camadas, com base congelada |
| BitFit | Treina só os termos de viés |
| Soft prompts | Vetores contínuos aprendidos (Prefix e Prompt Tuning) |
| Custo fixo por treino | Parcela do custo que não depende do volume e pesa em operação pequena |

---

## 💻 No código do repo

**Projeto:** [modulo-04-lora-e-peft (custo fixo e API gerenciada)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft)

Duas ferramentas pequenas (JS e Python): a comparação financeira reaproveitando o NPV do módulo 1 e a montagem da requisição de LoRA para uma API gerenciada de terceiros.

**Fluxo**
1. `regional-lora-vs-cloud-npv.js`: importa `calcularNPV` do módulo 1, fixa o volume regional em 400 por mês, mantém custos por chamada (R$ 0,045 e R$ 0,016) e só troca o custo fixo (2.400 contra 0). Cinco testes verificam NPV negativo sem break-even, NPV positivo com break-even rápido e que a diferença é exatamente o custo fixo descontado.
2. `lora-managed-api-preview-tool.js` (e `lora-managed-api-preview-companion.md`): monta o POST para a API de fine-tuning da Together AI com `training_type` Lora, rank 8, alfa 20, dropout 0 e `all-linear`, reaproveitando a configuração de `mlx-adapters/adapter_config.json`. Sem `TOGETHER_API_KEY` só imprime a requisição. Seis testes.

**Como rodar**
- `node regional-lora-vs-cloud-npv.js` imprime NPV de R$ -2.040,99 sem break-even e de R$ 359,01 com break-even no mês 1.
- `node lora-managed-api-preview-tool.js` funciona sem chave; com a chave, envia de verdade (custo real).

**Armadilhas e achados no código**
- A conclusão financeira depende do R$ 2.400: o job real de 200 exemplos na Vertex AI do módulo 3 custou R$ 2,39 no billing. O próprio repositório admite (tópico 15) que a estimativa de R$ 2.400 superestimou o custo; leia o argumento «LoRA vence em baixo volume» pela estrutura de custo fixo, não por esse número.
- O preview usa Llama 3.1 8B no provedor Together AI, não o Gemma do treino local; o código avisa que scale (MLX) e lora_alpha (Together AI) não são garantidamente equivalentes e usa o valor 20 como ponte ilustrativa.
- O texto da aula fala de «setembro de 2026» como referência para preços de GPU de consumidor; o código não busca preço algum.

---

## 🔗 Para ir além
- [Repositório oficial, módulo 04 (LoRA e PEFT)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft)
- [LoRA: Low-Rank Adaptation (Hu et al.)](https://arxiv.org/abs/2106.09685)
- [QLoRA (Dettmers et al.)](https://arxiv.org/abs/2305.14314)
- [Prefix-Tuning (Li e Liang)](https://arxiv.org/abs/2101.00190)
- [Prompt Tuning (Lester et al.)](https://arxiv.org/abs/2104.08691)
- [Adapters: Parameter-Efficient Transfer Learning (Houlsby et al.)](https://arxiv.org/abs/1902.00751)
- [Biblioteca PEFT (Hugging Face)](https://github.com/huggingface/peft)

---

⬅️ [07 · Linhagem do modelo: hash SHA-256, Model Card, registry e Preference Tuning](./07-versionamento-model-card-e-preference-tuning.md)  ·  [09 · Treinando LoRA local com MLX: split sem vazamento, validation loss e a curva que 20 iterações escondem](./09-lora-local-mlx-treino-e-curva.md) ➡️
