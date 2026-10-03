# 09 · Treinando LoRA local com MLX: split sem vazamento, validation loss e a curva que 20 iterações escondem

> **Unidade 4 · Aula 2** · Leitura: ~12 min · Bloco: LoRA e PEFT

## 🎯 Em uma frase
A aula executa LoRA de verdade, sem chamada de nuvem: converte o dataset de 200 exemplos, valida hiperparâmetros, divide **157/30/13 sem vazamento por entidade**, orquestra o MLX-LM e mede **validation loss de 4,752 para 0,895** em 20 iterações. Depois mostra que isso era subtreino e prova a mudança de comportamento comparando o modelo com e sem o adaptador.

---

## 👵 Explicando para a vovó

Treinar um aluno e testar com as mesmas questões que ele já viu não prova nada. Você separa três pastas: exercícios para estudar (treino), um simulado para decidir como estudar (validação) e uma prova final fechada (teste). E cuida para que nenhuma pessoa apareça em duas pastas diferentes, senão a prova vira cola.

Também não adianta o aluno dizer «terminei de estudar» (o programa saiu sem erro): é preciso mostrar a mesma pergunta respondida antes e depois do estudo, e a resposta mudar do jeito esperado.

---

## 🔧 Tecnicamente

### O que é
- **Mesmo dataset, dois caminhos:** os 200 exemplos (120 Auto e 80 Saúde) que treinaram o job gerenciado agora treinam localmente. A comparação é justa porque os dados são os mesmos; muda a infraestrutura. No gerenciado há abstração e menos visibilidade; no local há mais responsabilidade e visão direta de parâmetros treináveis, memória, taxa de processamento e curva de aprendizado.
- **Hardware da demonstração:** Apple M5 Pro com 24 GB de memória unificada, modelo (~10,24 GB) já em cache. Em primeira execução o download conta; um token gratuito do Hugging Face pode ajudar.
- **Validation loss:** erro medido num conjunto reservado, que não entra no aprendizado. Cair indica aprendizado; estabilizar indica ganho pequeno; subir depois de um mínimo sugere overfitting.
- **Divisão treino, validação e teste:** 157, 30 e 13 exemplos (validação ~15%, teste cerca de 5%, ambos ajustados pelo agrupamento). Agrupada por entidade e determinística: nenhuma entidade é partida entre divisões e o resultado é reprodutível.
- **Esquema canônico facilita migrar:** a Vertex AI usa contents/role/parts; o MLX usa mensagens no padrão de chat. A superfície muda e a informação continua a mesma.
- **JavaScript orquestra, Python executa:** o MLX-LM não tem binding para Node, então o JS monta a configuração e dispara um processo externo; JS é ótimo para integrar APIs gerenciadas, mas para treino, quantização e tensores o ecossistema continua em Python (PyTorch, Hugging Face, MLX-LM).
- **Configuração do treino:** LoRA, 20 iterações, batch size 1 e learning rate de 1e-5 (específico do MLX-LM, não copiar cegamente para outro framework). Ao começar aparece o que o gerenciado escondia: ~6,8 milhões de parâmetros treináveis em ~4,6286 bilhões (0,147%).
- **Primeiros números:** validation loss 4,752 na iteração 1 e ~0,895 na 20; pico de memória ao redor de 10,8 GB, abaixo dos 24 GB.
- **Alternativas sem Apple Silicon:** um notebook no Google Colab (GPU T4 gratuita) treina o mesmo rank 8 via Hugging Face (val loss ~0,8305 na aula; o companion do repositório registra 0,8248 numa execução real na T4), e há um script standalone para GPU NVIDIA com CUDA em Windows ou Linux. A barreira real é a GPU: CPU sozinha normalmente não entrega um tempo razoável.
- **Duas medidas não provam convergência:** repetindo a configuração o valor na iteração 20 foi ~0,907 (ruído normal). Estendendo para ~125 iterações na aula (o código registra 120), a loss cai até as iterações 80 a 90 (~0,474) e volta a subir (0,485; 0,496; 0,520), sinal de início de overfitting. As 20 iterações eram **subtreino**.
- **Early stopping:** uma função da ferramenta analisa a curva e identifica o melhor ponto, em vez de escolher um número fixo de iterações.
- **Velocidade real:** perto de 6 iterações por segundo e ~900 tokens por segundo; com 2.000 exemplos e dez épocas a aula estima ~56 minutos de computação pura.
- **Adaptador final:** ~27 MB, centenas de vezes menor que o modelo de ~10,24 GB.
- **Rodar sem erro não significa que treinou:** o mesmo exemplo de teste, nunca usado no treino, vai primeiro ao modelo base e depois ao modelo com o adaptador. Sem adaptador, o modelo entra em texto livre, explica o raciocínio e nem conclui no limite de tokens; com o adaptador, devolve exatamente a estrutura esperada, batendo com o gabarito. Esse é o teste que separa «código de saída zero» de «o fine-tuning mudou o comportamento».

### Como funciona
- **Suíte antes do treino:** 16 testes em seis grupos: conversão, divisão sem entidade partida, validação de hiperparâmetros (iters, learning rate, tipo de ajuste), parser das linhas de validation loss com saídas simuladas, orquestração com um processo falso injetado e análise da curva. Valida a integração sem gastar tempo de GPU.
- **Validar antes de rodar:** iterações, learning rate, tipo de fine-tuning e batch size são verificados antes de qualquer processo; configuração faz parte do contrato do treino.
- **Equivalente por API:** uma ferramenta complementar monta a mesma ideia de LoRA (rank 8, escala 20, dropout 0) como corpo de uma requisição HTTP, sem disparar (tópico 08), mostrando que LoRA não é exclusivo do local.
- **Trade-off de nuvem e local:** nenhum é universalmente melhor; a decisão depende de custo, volume, infraestrutura e necessidade operacional.
- **Missão prática:** preparar o mesmo dataset em treino, validação e teste preservando a separação; executar ou documentar o treino LoRA local registrando validation loss, tempo e memória; validar hiperparâmetros antes e manter a preparação separada da ferramenta de treino.

### Onde aplicar
- Treinar um adaptador pequeno com os dados nunca saindo da máquina (dado sensível) e sem custo de nuvem.
- Usar o parser de métricas e a análise de curva para decidir o ponto de parada em vez de fixar iterações por convenção.
- Medir tempo de treino com a própria máquina como referência para alimentar o NPV.
- Verificar que um fine-tuning funcionou comparando saída com e sem adaptador num exemplo retido.

### Vantagens e limites
**Vantagens**
- Visibilidade total do treino: parâmetros treináveis, memória, velocidade, curva.
- Reprodutível: split determinístico e hiperparâmetros validados.
- Custo de nuvem zero e dado local.

**Limites**
- Exige GPU adequada (Apple Silicon para MLX; CUDA no caminho Hugging Face).
- 20 iterações com batch 1 passam por apenas 20 dos 157 exemplos de treino, bem menos de uma época: serve para mostrar a mecânica, não para treinar bem.
- O download do modelo e o preparo fazem parte do tempo real.

### 🚫 Armadilhas
- Dividir sequencialmente e deixar a mesma entidade em treino e teste, criando uma avaliação artificialmente fácil.
- Comparar apenas início e fim de 20 iterações e chamar de convergência.
- Copiar o learning rate do MLX para outro framework.
- Achar que o processo terminar com código zero prova que o ajuste funcionou.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| MLX / MLX-LM | Biblioteca de ML da Apple para Apple Silicon, com LoRA integrado |
| Validation loss | Erro num conjunto reservado, usado para comparar configurações |
| Split agrupado por entidade | Nenhuma pessoa aparece em mais de um conjunto |
| Subtreino | Parar antes de a loss estabilizar |
| Early stopping | Parar na melhor iteração medida |
| Adaptador | Arquivo pequeno (SafeTensors) com só os pesos LoRA |
| Orquestração por subprocesso | JS monta e dispara um comando Python |

---

## 💻 No código do repo

O efeito do rank, da quantização e de DoRA vem no [tópico 10](./10-rank-qlora-dora.md); a comparação com Full Fine-Tuning no [tópico 11](./11-full-fine-tuning-vs-lora.md).

**Projeto:** [modulo-04-lora-e-peft (treino local e comparações com adaptador)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft)

Ferramenta de treino local (JS e Python), splits MLX já gerados, YAML do rank 8, adaptador treinado e as alternativas para quem não tem Mac: notebook Colab e script Hugging Face para CUDA.

**Fluxo**
1. `local-lora-training-tool.js`: `converterExemploParaMensagens` (contents para messages), `dividirTrainValidTest` (agrupa por segurado ou beneficiário, preenche teste, depois validação, resto treino), `validarHiperparametrosLora`, `montarArgumentosLora` (`python -m mlx_lm lora --train ...`), `extrairMetricas`, `analisarCurvaConvergencia` (limiar de 3%) e `rodarTreinoLocal` com `spawn` injetável. 16 testes.
2. `mlx-data/` (train 157, valid 30, test 13), `lora-rank8-config.yaml` (modelo `mlx-community/gemma-4-e2b-it-bf16`, 16 camadas, batch 1, 20 iterações, lr 1e-5, rank 8, scale 20, dropout 0; o YAML do rank 8 reaproveita `./mlx-adapters`) e `mlx-adapters/` com o adaptador.
3. `adapter-comparison-tool.js` (e companion): roda `mlx_lm generate` duas vezes no mesmo exemplo (índice 8 do teste: Felipe Alves Monteiro), sem e com `--adapter-path`; sem adaptador 80 tokens (bate no limite), com adaptador 28 tokens e JSON exato.
4. `colab-lora-training-notebook.ipynb` e `colab-lora-training-companion.md` (QLoRA 4 bits, lr 2e-4, `trl`, T4: val loss 0,8248, 20 passos, 57,6 s), `local-lora-training-hf-tool.py` (mesmo treino para GPU CUDA local), `gpu-cuda-anatomia-poster.html` e `guia-execucao-local-modulo-4-companion.md`.

**Como rodar**
- `node local-lora-training-tool.js` (aqui, em uma cópia): testes verdes, gera 157/30/13 (conteúdo idêntico ao `mlx-data` do repositório, conferi) e imprime a curva de convergência.
- O treino de verdade: `python3 -m mlx_lm lora --config lora-rank8-config.yaml` em Mac com Apple Silicon (não consegui rodar aqui; sem `mlx_lm`).
- Sem Mac: abrir o notebook no Colab (T4) ou rodar `python3 local-lora-training-hf-tool.py --test` antes numa GPU CUDA.

**Armadilhas e achados no código**
- Cuidado: `node local-lora-training-tool.js` **reescreve** `mlx-data/` dentro da pasta do repositório (mesmo conteúdo, mas rode numa cópia).
- A «curva de convergência» impressa pela demonstração usa valores fixos digitados no código (as medições do autor), não um treino executado na hora; ela é a de 120 iterações, enquanto a aula diz ~125, e o valor da iteração 20 é 0,916 (a aula cita ~0,913).
- 20 iterações × batch 1 = 20 exemplos vistos de 157 (derivei a conta): menos de 13% de uma época. É coerente com o achado de subtreino.
- O README raiz diz que os pesos `adapters.safetensors` não estão no repositório, mas os de rank 4, 8 e 16 (13, 27 e 54 MB) estão versionados; só o checkpoint de Full Fine-Tuning (~2 GB) ficou de fora e é baixado do Hugging Face (`ahirtonlopes/amplitude-seguros-full-finetune`, segundo o guia).
- Os notebooks Colab dizem usar «o mesmo dataset real do Módulo 2.2», mas é o dataset de 200 exemplos gerado no módulo 3.2.
- O script `local-lora-training-hf-tool.py` declara no cabeçalho que ainda não foi testado numa GPU CUDA local real (só a lógica foi validada no Colab).
- A contagem de parâmetros do modelo é ~4,63 bilhões no README e na aula, e ~5,12 bilhões nos companions de Colab; provavelmente a segunda inclui tabelas de embeddings por camada (hipótese, não verifiquei).

---

## 🔗 Para ir além
- [Repositório oficial, módulo 04 (LoRA e PEFT)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-04-lora-e-peft)
- [MLX-LM (README do repositório oficial)](https://github.com/ml-explore/mlx-lm)

---

⬅️ [08 · LoRA e PEFT: custo fixo em baixo volume, posto baixo e a família de técnicas eficientes](./08-lora-peft-teoria-e-custo-fixo.md)  ·  [10 · Rank, QLoRA e DoRA: transformando um hiperparâmetro em decisão medida](./10-rank-qlora-dora.md) ➡️
