# 10 · Rank, QLoRA e DoRA: transformando um hiperparâmetro em decisão medida

> **Unidade 4 · Aula 3** · Leitura: ~11 min · Bloco: LoRA e PEFT

## 🎯 Em uma frase
Três treinos reais com o **rank 4, 8 e 16**, tudo o mais fixo, mostram que dobrar o rank dobra os parâmetros treináveis e o adaptador, melhora a validation loss com **retorno decrescente** e quase não muda a memória. A alavanca de memória é a **quantização (QLoRA)**; o **DoRA** não trouxe ganho neste caso.

---

## 👵 Explicando para a vovó

O rank é o tamanho da prateleira que você instala na parede: maior comporta mais coisas, mas pesa e ocupa mais. O scale é a força com que o que está na prateleira é usado. Não são a mesma coisa.

Dobrar a prateleira ajuda bastante da primeira vez e menos da segunda, enquanto o prédio inteiro (o modelo base) continua pesando quase o mesmo. Se o problema é o peso do prédio, comprimir o prédio (quantizar) resolve mais que encolher a prateleira.

---

## 🔧 Tecnicamente

### O que é
- **Rank e scale:** o rank (R) controla a dimensão interna das matrizes e, portanto, a capacidade; o scale controla a intensidade da contribuição (ligado a alfa dividido por R). Nos três experimentos o scale fica em 20 e só o rank muda.
- **O padrão 8 era default:** o rank 8 do treino anterior era o padrão da ferramenta, não o resultado de um estudo; agora ele fica entre 4 e 16.
- **Os três treinos** (157 exemplos, 20 iterações, batch 1, mesmo lr): rank 4 tem ~3,4 milhões de parâmetros treináveis (0,074%), validation loss final 1,246 e adaptador de ~13 MB; rank 8, ~6,8 milhões (0,147%), 0,895 e ~27 MB; rank 16, ~13,6 milhões (0,295%), 0,725 e ~52 MB.
- **Memória cresce pouco:** a maior parte da memória é o modelo base, carregado inteiro em todos os casos. Dobrar o rank não dobra a memória total. Velocidade: ~7,401, ~7,295 e ~7,253 iterações por segundo.
- **A pergunta de viabilidade vem antes:** se o modelo base não cabe no hardware, nenhum rank resolve. Se cabe, o rank passa a ser decisão de qualidade e eficiência (isso pode mudar em modelos maiores).
- **QLoRA medido:** o modelo em BF16 ocupa ~10,24 GB em disco; a versão de 4 bits cai para ~3,58 GB (-65%). O pico de memória no treino vai de ~10,833 GB para ~4,193 GB (-61%).
- **Quantização cobra:** no rank 8, a validation loss fica em ~0,932 contra 0,895 (cerca de 4,1% pior), acima da faixa de ruído de ~2,3% medida entre execuções: custo real, não aleatório.
- **DoRA:** decompõe a atualização em magnitude e direção. No mesmo rank 8, usa ~7,3 milhões de parâmetros (contra 6,8), adaptador de ~28 MB e pico de memória maior, com a mesma validation loss de ~0,895: sem ganho dentro do ruído. Isso não prova que DoRA não funciona (a literatura relata ganho em tarefas complexas e treinos longos); mostra que técnica promissora não vira padrão sem teste no caso real.
- **Retorno decrescente:** do rank 4 para o 8 a loss melhora ~28,17%; do 8 para o 16, ~18,99%, com os parâmetros dobrando nos dois saltos.
- **Rank por margem de qualidade:** uma função procura o menor rank que fica dentro de uma margem do melhor validation loss. Com margem de 10%, só o rank 16 entra; com 60%, o rank 8 já basta; o rank 4 fica fora mesmo assim. A decisão pode ser econômica: o objetivo é o menor nível de parametrização com qualidade suficiente.
- **Teste adversarial à mão:** um orçamento de oficina nova com valor de peças (R$ 1.850), mão de obra (R$ 970) e só depois o total (R$ 2.820). O modelo base responde em texto livre; os ranks 4, 8 e 16 acertam o total e ignoram os distratores. A validation loss separa os ranks, o exemplo não: uma métrica agregada e um comportamento observável não são a mesma coisa, e um único exemplo não basta para avaliar.

### Como funciona
- **Desenho experimental:** mudar rank, learning rate e iterações ao mesmo tempo impediria saber o que causou o resultado; aqui qualquer diferença é atribuível principalmente ao rank.
- **13 testes:** a recomendação de rank para as duas margens, a quantização (disco -65%, memória -61%, custo de loss abaixo de 10%) e DoRA (≈ 7,5% mais parâmetros, +0,2 a 0,35 GB, empate de loss).
- **Se a restrição for memória,** quantizar a base muda gigabytes; reduzir o rank economiza megabytes.
- **Missão prática:** comparar pelo menos dois ranks mantendo o resto constante, registrar validation loss, memória, tempo e tamanho do adaptador e incluir um exemplo difícil de propósito.

### Onde aplicar
- Escolher o rank pelo menor valor que atende a margem de qualidade do negócio.
- Reduzir o consumo de memória pela quantização da base (QLoRA) quando a GPU é pequena.
- Testar uma técnica nova (DoRA) no caso real antes de adotá-la como padrão.
- Desenhar exemplos adversariais (distratores) para separar quem entendeu o campo de quem copia posição.

### Vantagens e limites
**Vantagens**
- Decisão mensurável, com quatro eixos: parâmetros, memória, velocidade e qualidade.
- Mostra que otimizar o componente que domina (a base) rende mais que otimizar o adaptador.
- Honesto sobre resultados negativos (DoRA empatou).

**Limites**
- Tudo medido em 20 iterações, que a aula anterior mostrou ser subtreino: a ordem entre ranks é informativa, o valor absoluto não.
- Um único exemplo adversarial e um único dataset pequeno.
- A margem escolhida (10% ou 60%) determina a resposta: a ferramenta formaliza a pergunta, não decide por você.

### 🚫 Armadilhas
- Concluir que rank maior é sempre melhor sem olhar o custo adicional.
- Reduzir rank para economizar memória quando a base domina o consumo.
- Confundir rank com scale.
- Adotar DoRA porque o paper é promissor, sem medir.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Rank (R) | Capacidade do adaptador: dimensão interna das matrizes |
| Scale | Intensidade da contribuição do adaptador (fixo em 20) |
| Retorno decrescente | Cada dobra de rank entrega menos melhora que a anterior |
| QLoRA | LoRA sobre modelo base quantizado em 4 bits |
| DoRA | LoRA com a atualização decomposta em magnitude e direção |
| Faixa de ruído | Variação entre execuções (~2,3%) abaixo da qual não se conclui nada |

---

## 💻 No código do repo

**Projeto:** [modulo-04-lora-e-peft (rank, QLoRA, DoRA)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft)

Duas ferramentas que consolidam as medições reais do autor (rank 4/8/16, QLoRA e DoRA), dois YAMLs de rank, os adaptadores de rank 4 e 16 e a comparação de saídas num exemplo difícil.

**Fluxo**
1. `lora-rank-tradeoff-tool.js`: constante `EXECUCOES_REAIS` com parâmetros treináveis, validation loss inicial e final, pico de memória, iterações por segundo e tamanho do adaptador por rank; calcula ganho por dobra e a recomendação do menor rank dentro de uma margem; compara BF16 contra 4 bits e LoRA contra DoRA. 13 testes.
2. `lora-rank4-config.yaml` e `lora-rank16-config.yaml` (iguais ao do rank 8, mudando `rank` e `adapter_path`) e os adaptadores `mlx-adapters-rank4/` e `-rank16/`.
3. `rank-adapter-comparison-tool.js` (e companion): roda o exemplo «Boa Vista Reparos Automotivos» (peças R$ 1.850, mão de obra R$ 970, total R$ 2.820) sem adaptador e com os três ranks.

**Como rodar**
- `node lora-rank-tradeoff-tool.js` (ou o `.py`) imprime a tabela e as recomendações offline.
- `python3 -m mlx_lm lora --config lora-rank4-config.yaml` reproduz um treino; a comparação de saídas exige Apple Silicon e o modelo baixado (não consegui executar aqui).

**Armadilhas e achados no código**
- Os números não são medidos pelo script: são dados digitados (saída real do autor, 08/08/2026). A ferramenta analisa e imprime; o aviso final lembra que a recomendação foi medida em 20 iterações, ainda subtreino.
- Os testes do script de comparação de saída (3 testes) usam a saída real capturada como fixture; a execução de verdade falha sem `mlx_lm`.
- Tamanhos de adaptador: o código imprime 26 e 52 MB (MiB) e a aula 27 e 52 MB; o arquivo do rank 8 tem 27.290.736 bytes.

---

## 🔗 Para ir além
- [Repositório oficial, módulo 04 (LoRA e PEFT)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft)
- [DoRA: Weight-Decomposed Low-Rank Adaptation (indicação 19)](https://arxiv.org/abs/2402.09353)
- [QLoRA (Dettmers et al.)](https://arxiv.org/abs/2305.14314)

---

⬅️ [09 · Treinando LoRA local com MLX: split sem vazamento, validation loss e a curva que 20 iterações escondem](./09-lora-local-mlx-treino-e-curva.md)  ·  [11 · Full Fine-Tuning versus LoRA: o teto existe, o custo também, e o critério de decisão](./11-full-fine-tuning-vs-lora.md) ➡️
