# 11 · Full Fine-Tuning versus LoRA: o teto existe, o custo também, e o critério de decisão

> **Unidade 4 · Aula 4** · Leitura: ~11 min · Bloco: LoRA e PEFT

## 🎯 Em uma frase
Com o mesmo modelo, dataset, 20 iterações e learning rate, o **Full Fine-Tuning das últimas 16 camadas** chega a validation loss 0,612 contra 0,895 do rank 8 (e 0,725 do rank 16), mas treina ~153 vezes mais parâmetros e salva um checkpoint de ~2 GB. Nos exemplos testados, **o comportamento é idêntico**: o teto de qualidade existe, mas não apareceu como valor.

---

## 👵 Explicando para a vovó

Quanto vale reescrever o livro inteiro em vez de colocar notas de rodapé? O livro reescrito pode ficar melhor, e esse teto é real. Mas gasta bem mais papel, tinta e espaço na estante, e para a tarefa de «copiar três campos de um recibo» as notas de rodapé já deixam o leitor igualmente satisfeito.

Para cinco parceiros, são cinco livros inteiros (~2 GB cada) contra um livro mais cinco pequenos cadernos de notas.

---

## 🔧 Tecnicamente

### O que é
- **O que significa «Full» aqui:** o framework chama de Full o treino que atualiza todos os pesos das camadas selecionadas, sem a decomposição B e A. Tanto LoRA quanto Full agem nas últimas 16 camadas, então a comparação é justa. Treinar todos os ~4,63 bilhões provavelmente estouraria os 24 GB; as 16 camadas somam ~22,567% do modelo.
- **Por que Full cresce em memória:** cada peso treinável precisa de gradiente e dos estados do otimizador Adam (momento e variância). No LoRA essa estrutura existe só para as pequenas matrizes B e A; a base apenas precisa estar carregada.
- **Os números:** ~22,567% dos parâmetros treináveis contra 0,147% (cerca de 153 vezes mais); validation loss 0,612 contra 0,895 (ganho de ~31% sobre o rank 8); pico de memória ~15,338 GB contra ~10,833 GB (+42%); checkpoint ~1,992 GB contra ~27 MB (~74 vezes maior).
- **A comparação certa é com o melhor LoRA:** contra o rank 16 (0,725) o ganho do Full cai para ~15,59%. Com um limiar mínimo de ganho de 20%, o Full não passa; com 10%, passa. Não há limiar universal: depende do contexto econômico (se armazenar e servir 2 GB é barato, 15% pode compensar).
- **Cinco parcerias:** cinco adaptadores rank 8 somam ~135 MB e compartilham a base; cinco checkpoints Full chegam perto de 10 GB adicionais. Em stacks de serving compatíveis, vários adaptadores podem compartilhar a mesma base.
- **Segundo eixo, esquecimento catastrófico:** alterar muitos pesos pode melhorar a tarefa e degradar capacidades gerais. LoRA mantém a base congelada. O experimento *não mede* isso (só as últimas 16 camadas, avaliação só na tarefa); a aula cita estudos de literatura PEFT com degradação maior no Full fora da tarefa treinada, inclusive um com modelos BLOOM.
- **Mesmo comportamento:** o Full acerta o exemplo simples e o com distratores, campo a campo, igual aos ranks 4, 8 e 16. Existe um teto mais alto, mas na extração estreita de campos fixos ele não apareceu como erro corrigido. O resultado vale para o caso estudado.
- **Três caminhos reais:** API gerenciada (Vertex AI), LoRA local e Full local. Todos funcionam e nenhum é sempre o certo; agora há números de custo, memória, qualidade, armazenamento e controle. O modelo que segue para o módulo 5 é o adaptador LoRA rank 8, não o checkpoint Full.
- **A disciplina de decidir medindo:** custo fixo versus marginal, rank, quantização, LoRA versus DoRA e Full versus LoRA foram todos medidos; a ideia é executar, medir e decidir sobre o caso real, não decorar regra de bolso.

### Como funciona
- **Mesmas condições:** 157 exemplos de treino, 20 iterações, mesmo learning rate; a única mudança estrutural é o método de ajuste.
- **8 testes:** a métrica derivada (ganho ~31,6% sobre o rank 8, ~153x parâmetros, checkpoint ~76,6x maior, memória maior que qualquer LoRA), a regra de limiar (20% e 10%) e a validação dos resultados de inferência dos dois exemplos.
- **Missão prática 4:** escolher um caso já aprovado pelo gate mas de volume pequeno; executar ou documentar LoRA local comparando ao menos dois ranks (se o hardware não permitir, usar os números reais da disciplina e documentar a limitação); construir um teste adversarial; implementar em JavaScript a conversão e a validação de hiperparâmetros; e decidir LoRA ou Full com números.

### Onde aplicar
- Decidir se vale pagar memória e armazenamento extra pelo teto de qualidade, com um limiar de ganho explícito.
- Servir muitas especializações de uma mesma tarefa com uma base e um adaptador por cliente.
- Preferir PEFT quando preservar capacidades gerais do modelo base importa.
- Documentar a limitação de hardware e usar números de referência quando não for possível treinar.

### Vantagens e limites
**Vantagens**
- Decisão com critério numérico explícito (limiar de ganho).
- LoRA entrega o mesmo comportamento observado por uma fração do custo.
- Resultado honesto: reconhece que o teto de Full existe.

**Limites**
- Duas execuções, 20 iterações (subtreino) e dois exemplos de comportamento: o tamanho real do teto não foi medido até convergência.
- O Full aqui é parcial (16 camadas); o Full de todas as camadas não coube nem foi testado.
- Esquecimento catastrófico não foi medido, apenas citado.

### 🚫 Armadilhas
- Comparar Full contra o rank 8 em vez do melhor LoRA testado.
- Chamar de Full o treino de todas as camadas quando só 16 foram liberadas.
- Extrapolar a conclusão «LoRA empata» para tarefas abertas ou ambíguas, onde a liberdade extra do Full pode importar.
- Esquecer que o limiar de ganho depende do custo de armazenar e servir checkpoints grandes.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Full Fine-Tuning (aqui) | Atualiza todos os pesos das 16 camadas selecionadas, sem decomposição |
| Adam | Otimizador que guarda momento e variância por parâmetro treinável |
| Checkpoint | Arquivo de pesos salvo do treino (~2 GB no Full; ~27 MB no adaptador) |
| Esquecimento catastrófico | Perda de capacidades gerais ao ajustar muitos pesos |
| Limiar de ganho | Melhora mínima do Full sobre o melhor LoRA para justificar o custo |
| Servir adaptadores | Uma base compartilhada com vários adaptadores especializados |

---

## 💻 No código do repo

**Projeto:** [modulo-04-lora-e-peft (Full versus LoRA e alternativa Colab)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft)

Ferramenta de comparação com os números reais do autor e o caminho para quem não tem Mac: notebook de Full Fine-Tuning em escala reduzida (família Qwen) no Colab.

**Fluxo**
1. `full-vs-lora-tradeoff-tool.js` (e `.py`): `CONFIGURACOES_REAIS` (LoRA 4, 8, 16 e Full com percentual do modelo, validation loss, pico de memória e checkpoint); métricas derivadas, regra de «vale a pena» por limiar de ganho e verificação dos dois exemplos de inferência (Felipe Alves Monteiro e Ricardo Alves Monteiro).
2. `guia-execucao-local-modulo-4-companion.md`: os três comandos `mlx_lm` reais; explica que o checkpoint Full (~2 GB) não cabe no GitHub e é baixado com `hf download ahirtonlopes/amplitude-seguros-full-finetune --local-dir ./mlx-full-finetune`.
3. `colab-full-finetune-training-notebook.ipynb` e o companion: Full genuíno no Colab T4 com Qwen3-1.7B (default), Qwen2.5-1.5B ou Qwen3-0.6B, otimizador de 8 bits e gradient checkpointing; 20 passos, val loss 1,302, pico de GPU 13,51 GB.

**Como rodar**
- `node full-vs-lora-tradeoff-tool.js` (offline): Full 31,62% melhor que o rank 8, 153,5x mais parâmetros, 1,42x de memória, checkpoint 76,6x maior; contra o rank 16, ganho de 15,59%, que falha o limiar de 20%.
- Pipeline de Full no Mac: `python3 -m mlx_lm lora ... --fine-tune-type full --adapter-path ./mlx-full-finetune` (pico real de ~15,3 GB). Sem Mac: o notebook Colab em escala reduzida.

**Armadilhas e achados no código**
- O código imprime checkpoint 76,6x maior (usa 26 MB), a aula e o documento de decisões dizem 73,8x (usa 27 MB); provavelmente é a mesma diferença de unidade (MiB contra MB) vista nos adaptadores, hipótese minha, não confirmada em nenhuma fonte.
- O README raiz afirma «val loss real caindo de 4,856 para 0,779 na melhor configuração»; esses números não aparecem em nenhum script ou documento (os medidos são 4,752 inicial e 0,725 no rank 16, 0,612 no Full).
- O companion de Colab explica por que o Full do modelo oficial (~5,12 bilhões de parâmetros, 27 a 74 GB de memória estimados) não cabe numa T4; por isso o notebook troca de modelo, e seus números (val loss 1,302) não são comparáveis aos do MLX (0,612).
- Neste notebook o Full terminou com campos extras no JSON e sem fechar a chave no limite de 100 tokens, achado que o companion documenta sem maquiagem.
- O checkpoint Full citado nos comandos 2 e 3 não está no repositório (`mlx-full-finetune`): sem baixar do Hugging Face, os comandos falham com arquivo não encontrado.

---

## 🔗 Para ir além
- [Repositório oficial, módulo 04 (LoRA e PEFT)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft)
- [LoRA (Hu et al.)](https://arxiv.org/abs/2106.09685)

---

⬅️ [10 · Rank, QLoRA e DoRA: transformando um hiperparâmetro em decisão medida](./10-rank-qlora-dora.md)  ·  [12 · Teste retido de verdade e harness de avaliação: precisão por campo, consistência e esquema](./12-teste-retido-e-harness-de-avaliacao.md) ➡️
