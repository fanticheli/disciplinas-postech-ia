# 📝 Disciplina 09 · Prova comentada

> Processamento de dados e fine-tuning de modelos (caso Amplitude Seguros). Cada questão traz o enunciado, a resposta certa, o raciocínio, uma mini-aula dos conceitos citados, o erro de cada alternativa errada e onde se aprofundar no guia de leitura.

**Resumo das respostas**

| Questão | Tema | Resposta |
|---------|------|----------|
| 01 | Holdout e vazamento treino/teste | **C** |
| 02 | Gate das quatro perguntas: um vermelho reprova | **E** |
| 03 | Rank do LoRA e retorno decrescente | **B** |
| 04 | Por que rodar Monte Carlo se o NPV já é positivo | **C** |
| 05 | Documento de decisões: por que registrar a alternativa rejeitada | **D** |
| 06 | Quase-duplicatas e deduplicação (MinHash + LSH) | **E** |
| 07 | Teste adversarial com N pequeno | **E** |
| 08 | Trava de confirmação na automação (epoch_count = 0) | **C** |
| 09 | AHP e Razão de Consistência (limiar de Saaty) | **C** |
| 10 | Valor do fine-tuning versus prompt engineering | **C** |

---

## Questão 01 · Holdout e vazamento treino/teste

**Pergunta:** Por que o holdout usado para avaliar um modelo fine-tunado precisa ser de exemplos que o modelo nunca viu durante o treino ou a deduplicação, e não só uma fatia aleatória do mesmo lote usado?

**Alternativas:**
- A) É uma questão de conformidade com a LGPD, não de qualidade da métrica.
- B) O holdout precisa ser numericamente menor que o treino; a origem importa menos que o tamanho relativo.
- C) ✅ Porque, se o exemplo de teste (ou uma quase-duplicata dele) já passou pelo modelo no treino, a avaliação fica inflada: o modelo pode memorizar a resposta em vez de generalizar, e a métrica deixa de refletir o desempenho em dado novo.
- D) É mera convenção entre times, sem efeito mensurável.
- E) Os exemplos de teste devem ser sempre escritos à mão por um humano.

**Resposta: C.** Vazamento treino/teste (o mesmo exemplo, ou uma quase-duplicata, nos dois lados) infla a métrica: o número deixa de significar "desempenho em dado novo".

### Resolução comentada

Pense numa prova escolar. Se as questões da prova já estavam na lista de exercícios que o aluno decorou, a nota alta não diz se ele aprendeu a matéria; diz que ele lembrou. Com o modelo é igual: o conjunto de teste existe para responder "como ele se sai no que nunca viu?". Se um exemplo (ou uma cópia quase idêntica) participou do treino, a pergunta passa a ser "ele lembra do que viu?", e a métrica fica inflada.

Por isso a regra do guia é separar os papéis: o treino ajusta o modelo, a validação compara configurações durante o desenvolvimento e o teste responde, depois das escolhas, como o modelo se comporta em dados retidos. Se o teste influencia alguma escolha, ele deixa de ser teste. E por isso a deduplicação também precisa olhar entre treino e teste, não só dentro do treino: uma quase-duplicata do exemplo de teste que sobrou no treino é vazamento disfarçado.

Repare que nenhuma alternativa errada fala de "quem já viu o quê". Elas tratam de legislação, tamanho, convenção ou autoria humana, que são fatores laterais. O que torna o teste confiável é a independência em relação ao que o modelo viu.

### Entenda os conceitos

- **Holdout (conjunto retido):** parte dos dados separada antes do treino e usada só no final para medir. No guia, o "teste retido" é gerado com índices fora da faixa usada no treino, com margem de segurança para uma futura ampliação do treino.
- **Vazamento treino/teste:** quando o mesmo exemplo, ou um quase igual, aparece nos dois conjuntos. A métrica passa a medir memória, não generalização. Analogia: a prova com as mesmas questões da lista decorada.
- **Treino, validação e teste:** o guia separa três papéis. A validation loss (erro num conjunto reservado que não entra no aprendizado) guia as decisões; mas, como os mesmos 30 exemplos de validação foram usados várias vezes para escolher rank e configuração, ela não é avaliação final.
- **Divisão sem entidade partida:** no treino local, a divisão em 157, 30 e 13 exemplos é agrupada por entidade e determinística, para nenhuma entidade ficar dividida entre treino e teste.
- **Quase-duplicata:** texto quase igual a outro (o mesmo sinistro reenviado, ou reescaneado com pequena diferença de OCR). O estudo da Google Research no corpus C4, citado no guia, mostrou que deduplicar reduz texto memorizado e contaminação entre treino e teste.
- **Generalizar x memorizar:** generalizar é acertar em dado novo; memorizar é reproduzir o que já viu. A métrica só é útil se medir o primeiro.
- **Ressalva do próprio guia:** o teste retido de 11 exemplos veio do mesmo gerador determinístico do treino, e nele os nomes eram inéditos, mas placa, valor e data vêm de pools menores e podem ter aparecido no treino. Para extração isso não invalida o teste (o valor correto está dentro do texto, o modelo precisa ler), mas limita o que 100% prova: generalização para exemplos novos do mesmo padrão.

### Por que as outras erram

- **A:** LGPD e privacidade são assuntos reais (o gate de governança do guia), mas a razão do holdout independente é estatística, não legal.
- **B:** o tamanho relativo importa pouco diante da origem. Um holdout pequeno e limpo mede melhor que um grande contaminado. (O guia, aliás, lembra que 11 exemplos é pouco, mas por outra razão: um único erro derruba a média.)
- **D:** o efeito é mensurável e grande: a métrica inflada pode virar um "100%" sem significado.
- **E:** não é preciso que os exemplos de teste sejam escritos à mão. O guia usa um gerador determinístico para o teste retido e reserva a escrita manual para o teste de estresse (tópico 14). O que importa é a independência em relação ao treino.

### Aprofundar no guia

- [12 · Teste retido e harness de avaliação](./projeto-de-leitura/12-teste-retido-e-harness-de-avaliacao.md), seção "O que é": os papéis de treino, validação e teste, o teste retido com índices fora do treino e a ressalva do gerador.
- [04 · O dataset como conjunto: MinHash, LSH, temperatura](./projeto-de-leitura/04-dataset-como-conjunto-minhash-lsh-temperatura.md), seção "Onde aplicar": "deduplicar também entre treino e teste, para não medir memória no lugar de generalização".
- [09 · Treinando LoRA local com MLX](./projeto-de-leitura/09-lora-local-mlx-treino-e-curva.md), seção "O que é": divisão treino/validação/teste agrupada por entidade e o que a validation loss mede.
- [14 · Robustez, overfitting e artefato de medição](./projeto-de-leitura/14-robustez-overfitting-e-artefato-de-medicao.md), seção "O que é": o ponto cego de treino e teste virem do mesmo gerador.

*Código da questão: 179523*

---

## Questão 02 · Gate das quatro perguntas: um vermelho reprova

**Pergunta:** Um quinto caso hipotético da Amplitude Seguros é avaliado pelo framework de quatro perguntas, numa escala de 0 a 1, com limiar verde de 0,6. As notas são p1 = 0,85; p2 = 0,80; p3 = 0,35; p4 = 0,90. A média simples é 0,725, acima do limiar. O que o framework conclui?

**Alternativas:**
- A) Fica indefinido até calcular os pesos do AHP.
- B) Reprovado, mas porque a soma ponderada pelo AHP fica abaixo do limiar, e não por p3 sozinho.
- C) Aprovado por maioria: três de quatro perguntas em verde (maioria simples).
- D) Aprovado porque a média 0,725 passa de 0,6 e é essa a média que decide.
- E) ✅ Reprovado: p3 sozinho fica abaixo do limiar (vermelho), e uma única pergunta vermelha reprova o caso inteiro, não importa a média.

**Resposta: E.** O gate reprova se qualquer pergunta individual ficar abaixo do limiar verde, mesmo com média composta alta.

### Resolução comentada

A chave é perceber que as quatro perguntas não são "pontos a somar", e sim condições necessárias. Todas precisam estar verdes ao mesmo tempo. Uma tarefa estreita sem dados suficientes (p3 vermelha) não é bom candidato, por mais que o prompt esteja esgotado (p2), a tarefa seja estável (p4) e bem delimitada (p1).

Analogia (complemento, não está no guia): o trem de pouso de um avião. Não adianta o piloto ser ótimo, o combustível ser abundante e o tempo estar bom se o trem de pouso falhou. Um item crítico vermelho trava a decolagem, e a "média de segurança" não entra na conversa. O mesmo vale para o caso real do guia, a Saúde Empresarial: p1, p2 e p4 verdes, p3 vermelha (0,35 contra o limiar 0,6), resultado "ainda não".

Também ajuda o fato de o enunciado ter uma isca: a média 0,725 passa do limiar. As alternativas C e D tentam atrair quem decide por média ou por contagem. O guia mostra o mesmo risco com Atendimento ao Cliente, cujo score composto (0,66) supera o da Saúde (0,60) e que mesmo assim é reprovado, porque P1 e P4 continuam vermelhas.

### Entenda os conceitos

- **As quatro perguntas:** (1) a tarefa é estreita e repetida? (2) prompt engineering, RAG, roteamento e cache já foram esgotados de verdade? (3) existem dados suficientes, diversos e de qualidade? (4) a tarefa é estável o bastante para não virar uma esteira de retreino? Cada uma tem sinal verde e sinal vermelho.
- **Gate (portão):** verificação que barra o avanço quando não passa. Há dois níveis no guia: o gate de governança (binário, roda antes de tudo: há base legal? há DPA com o provedor se o dado é sensível?) e o gate das quatro perguntas, com limiar 0,6.
- **Condições necessárias, não compensáveis:** um ponto forte não paga um ponto fraco. Tarefa estreita sem dado não é boa candidata; muito dado numa tarefa aberta não resolve; tarefa repetitiva com contrato que muda toda semana vira esteira de retreino.
- **Score composto (média ou soma ponderada):** serve para quantificar e comparar, mas, segundo o guia, "nunca substitui o gate". O guia chama de armadilha "deixar a média compensar um vermelho".
- **AHP:** método que deriva os pesos das perguntas por comparação pareada (Questão 09). Na demonstração, p3 (dados) tem o maior peso (0,455), porque é a única restrição que o tempo e a coleta resolvem, não uma decisão da equipe. Os pesos entram no score, não no gate.
- **"Ainda não" x "não":** Saúde pode melhorar com tempo e coleta de dados (por isso recebe Real Options); Atendimento não melhora esperando, porque o problema é a natureza da tarefa.
- **Complemento, fora do material:** aplicando à mão os pesos da demonstração (0,141; 0,141; 0,455; 0,263) a estas notas, a soma ponderada dá cerca de 0,629, ainda acima de 0,6. Isso mostra que a alternativa B não se sustenta nem pelos números: o que reprova o caso é o gate, não a média.

### Por que as outras erram

- **A:** não está indefinido. O gate decide pela nota individual de p3, sem precisar de pesos. Os pesos do AHP só importam para o score ponderado.
- **B:** acerta o veredito (reprovado) e erra a causa. Reprova por p3 abaixo do limiar, não por uma soma ponderada (que, com os pesos da demonstração, nem ficaria abaixo de 0,6).
- **C:** "maioria simples" não existe no framework. As perguntas são condições necessárias, não votos.
- **D:** é a armadilha central: decidir pela média. A média compensa um vermelho, e o framework proíbe isso.

### Aprofundar no guia

- [00 · Fine-tuning ensina comportamento, não fatos](./projeto-de-leitura/00-comportamento-vs-conhecimento-4-perguntas-e-casos.md), seção "Como funciona": o fluxo governança, depois P1 a P4, e os três casos (Auto aprovado, Saúde "ainda não", Atendimento "não").
- [00 · Fine-tuning ensina comportamento, não fatos](./projeto-de-leitura/00-comportamento-vs-conhecimento-4-perguntas-e-casos.md), seção "🚫 Armadilhas": "Deixar a média compensar um vermelho".
- [01 · AHP, NPV, Monte Carlo e Real Options](./projeto-de-leitura/01-ahp-npv-monte-carlo-real-options.md), seção "O que é": os pesos do AHP e por que Atendimento (0,66) tem score maior que Saúde (0,60) e continua reprovado.

*Código da questão: 179508*

---

## Questão 03 · Rank do LoRA e retorno decrescente

**Pergunta:** Se um rank maior dá ao adaptador LoRA mais capacidade de se aproximar do full fine-tuning, por que não usar sempre o rank mais alto?

**Alternativas:**
- A) Bibliotecas como a PEFT limitam artificialmente o rank.
- B) ✅ Rank mais alto aumenta o número de parâmetros treináveis e o tamanho do adaptador de forma proporcional, mas o ganho tem retorno decrescente: cada dobra de rank entrega uma fatia cada vez menor de melhoria, então o custo extra deixa de se justificar pelo ganho marginal, não porque rank alto piore o modelo.
- C) Rank alto degrada o modelo base, corrompendo os pesos congelados.
- D) Rank e alpha precisam ser iguais, e alpha acima de 16 instabiliza o treino.
- E) Rank alto sempre trava o treino por incompatibilidade de hardware.

**Resposta: B.** Nos três treinos reais (rank 4, 8 e 16, mesmo dataset pequeno), mais rank sempre melhorou a validation loss, sem sinal de overfitting. O limite é o retorno decrescente: cada dobra dobra o parâmetro treinável e o tamanho do adaptador em disco.

### Resolução comentada

A pergunta traz uma pegadinha de lógica: "mais capacidade é melhor, então por que não sempre o máximo?". A resposta é de economia, não de defeito. Rank maior não quebra nada nem piora o modelo; só custa mais (parâmetros treináveis e tamanho do adaptador crescem na mesma proporção) e devolve menos a cada dobra.

Os números do guia mostram isso. Com tudo fixo e só o rank mudando: rank 4 tem ~3,4 milhões de parâmetros e validation loss 1,246; rank 8, ~6,8 milhões e 0,895; rank 16, ~13,6 milhões e 0,725. Do 4 para o 8 a loss melhora ~28,17%; do 8 para o 16, ~18,99%, com os parâmetros dobrando nos dois saltos. Cada dobra custa o mesmo e entrega menos.

A decisão passa a ser econômica: escolher o menor rank que atende a margem de qualidade do negócio. Com margem de 10% do melhor loss, só o rank 16 entra; com 60%, o rank 8 basta. A ferramenta formaliza a pergunta, mas quem define a margem é você.

### Entenda os conceitos

- **LoRA (Low-Rank Adaptation):** em vez de atualizar a matriz original W do modelo, aprende duas matrizes pequenas, A e B, com posto R muito menor que as dimensões de W; a atualização é o produto delas. Só A e B recebem gradiente. Exemplo do guia: numa matriz de 1.000 por 1.000 (1 milhão de números), posto 4 treina 8 mil números (menos de 1%).
- **Rank (posto, R):** a dimensão interna das matrizes A e B, que controla a capacidade do adaptador. Analogia do guia: o tamanho da prateleira que você instala na parede. Maior comporta mais, mas pesa e ocupa mais.
- **Scale (alpha dividido por R):** a intensidade com que a contribuição do adaptador é somada ao modelo. Não é a mesma coisa que rank: rank é capacidade, scale é força. Nos três treinos o scale ficou fixo em 20 e só o rank mudou.
- **Retorno decrescente:** cada dobra de rank custa o mesmo (dobra parâmetros e disco) e entrega menos melhoria que a anterior.
- **Validation loss:** erro num conjunto reservado que não entra no aprendizado. Cair indica aprendizado; subir depois de um mínimo sugere overfitting.
- **Memória:** cresce pouco com o rank, porque a maior parte é o modelo base, carregado inteiro em todos os casos. Se a restrição é memória, quantizar a base (QLoRA) muda gigabytes; reduzir o rank economiza megabytes. No guia, o adaptador vai de ~13 MB (rank 4) a ~27 MB (rank 8) e ~52 MB (rank 16), contra um modelo de ~10,24 GB.
- **Full fine-tuning:** atualizar todos os pesos. Tem teto de qualidade potencialmente maior, mas custo de memória e de armazenamento (um checkpoint completo por variante).
- **Limite do experimento:** tudo foi medido em 20 iterações, que a aula anterior mostrou ser subtreino. A ordem entre os ranks é informativa; o valor absoluto não.

### Por que as outras erram

- **A:** a biblioteca PEFT (Hugging Face) reúne várias técnicas numa interface comum, não impõe um teto artificial de rank. (O guia não discute limite de rank na biblioteca; complemento, fora do material.)
- **C:** os pesos do modelo base ficam congelados no LoRA, e o adaptador é um módulo à parte, que pode inclusive ser somado a W no merge. Não há corrupção do base.
- **D:** rank e alpha são coisas distintas (capacidade x intensidade), e o guia não traz regra de igualdade nem de instabilidade acima de 16. O que o guia mostra é scale fixo em 20 com ranks 4, 8 e 16 treinando normalmente.
- **E:** nos testes, o rank 16 treinou na mesma máquina, com velocidade quase igual (~7,25 contra ~7,40 iterações por segundo no rank 4) e pouca diferença de memória.

### Aprofundar no guia

- [10 · Rank, QLoRA e DoRA](./projeto-de-leitura/10-rank-qlora-dora.md), seção "O que é": os três treinos (4, 8 e 16), o retorno decrescente (28,17% e 18,99%) e a escolha do rank por margem de qualidade.
- [10 · Rank, QLoRA e DoRA](./projeto-de-leitura/10-rank-qlora-dora.md), seção "🚫 Armadilhas": "Concluir que rank maior é sempre melhor sem olhar o custo adicional" e "Confundir rank com scale".
- [08 · LoRA e PEFT](./projeto-de-leitura/08-lora-peft-teoria-e-custo-fixo.md), seção "O que é": a ideia de posto baixo, a economia de parâmetros e a família PEFT.
- [11 · Full Fine-Tuning versus LoRA](./projeto-de-leitura/11-full-fine-tuning-vs-lora.md), seção "O que é": o teto do Full, o custo dele e o critério de decisão.

*Código da questão: 179520*

---

## Questão 04 · Por que rodar Monte Carlo se o NPV já é positivo

**Pergunta:** No case Amplitude Auto, o NPV determinístico (com o valor mais provável de crescimento mensal e de custo por chamada) já dá positivo em 24 meses, com breakeven no mês 10. Mesmo assim, o case roda 10.000 simulações de Monte Carlo com distribuições triangulares e chega a 100% de probabilidade de retorno positivo, mesmo no pior cenário simulado. Por que rodar a simulação?

**Alternativas:**
- A) O cálculo com a moda superestima o resultado, e o Monte Carlo corrige para baixo.
- B) O Monte Carlo só serve para derivar a volatilidade do Real Options do caso Saúde Empresarial, sem valor próprio em Amplitude Auto.
- C) ✅ O determinístico testa só um cenário (o mais provável); a simulação testa milhares de combinações plausíveis dentro da faixa triangular de cada parâmetro, incluindo as pessimistas, e o resultado (100% positivo no pior cenário simulado) é uma afirmação bem mais forte sobre o risco do que "positivo no cenário mais provável".
- D) É redundante: não acrescenta informação.
- E) As 10 mil simulações são necessárias porque o determinístico não tem precisão para achar o mês do breakeven.

**Resposta: C.** É a diferença entre "meu cenário mais provável funciona" e "funciona mesmo quando as coisas vão mal dentro do plausível". Essa simulação também fornece a volatilidade usada depois para Real Options no caso Saúde Empresarial.

### Resolução comentada

O NPV determinístico é uma foto de um único cenário: tudo acontece do jeito mais provável. O Monte Carlo troca essa foto por um filme: sorteia 10.000 combinações de parâmetros (volume, economia por requisição, custo) dentro de faixas plausíveis e olha a distribuição dos resultados. Dizer "100% das simulações deram retorno positivo" é uma afirmação sobre risco, enquanto "deu positivo no cenário esperado" é só uma afirmação sobre um ponto.

É como planejar uma reforma. Não basta o orçamento médio: você quer saber o que acontece no pior e no melhor cenário. O guia usa exatamente essa imagem.

Duas observações ajudam a descartar as outras. Primeiro, o determinístico não "erra para cima" nem "não acha o breakeven": ele só não mostra a incerteza. Segundo, o Monte Carlo tem valor próprio em Auto (o intervalo de risco) e um segundo uso (a volatilidade para Real Options), mas o segundo não anula o primeiro.

### Entenda os conceitos

- **NPV (valor presente líquido):** valor presente dos benefícios futuros menos o investimento, descontados mês a mês. O guia usa taxa de 1% ao mês (perfil avesso a risco). Para Auto, o NPV em 24 meses é positivo.
- **Breakeven:** o mês em que o retorno acumulado cobre o investimento. Em Auto, por volta do mês 10.
- **Cenário determinístico:** um único conjunto de premissas, normalmente as mais prováveis.
- **Monte Carlo:** rodar muitas simulações com parâmetros sorteados de distribuições, para obter uma distribuição de resultados em vez de um número único. No guia, 10.000 simulações; a probabilidade de retorno positivo em Auto foi de 100% no horizonte analisado.
- **Distribuição triangular:** distribuição definida por três números: mínimo, mais provável (a moda) e máximo. É a que os scripts do curso sorteiam. Limite assumido pelo guia: são palpites de mínimo, moda e máximo, não um ajuste a dado histórico.
- **Real Options:** quando o caso reprova só por dado (Saúde), a pergunta vira "quanto vale manter a opção de treinar depois?". A volatilidade vem do Monte Carlo e uma árvore binomial de 9 passos (um por mês) compara treinar agora com esperar. O resultado varia entre execuções porque a volatilidade vem de uma simulação sem semente fixa na demonstração.
- **Sensibilidade (±20%):** ranking de quanto cada parâmetro move o NPV, para saber qual premissa refinar primeiro.
- **Aviso do guia:** os números financeiros do caso são ilustrativos, e as premissas são calibradas para o case, não para o seu.

### Por que as outras erram

- **A:** o valor mais provável não superestima por definição. O Monte Carlo não "corrige para baixo": ele mostra a faixa de resultados, incluindo os piores.
- **B:** o Monte Carlo fornece, sim, a volatilidade do Real Options da Saúde, mas isso é um uso adicional. Em Auto ele vale por si: mostra a robustez do retorno.
- **D:** não é redundante. Acrescenta a distribuição de resultados e a probabilidade de retorno positivo, que o cenário único não dá.
- **E:** o determinístico acha o breakeven (mês 10) sem problema. As 10.000 simulações servem para medir incerteza, não para dar precisão ao mês.

### Aprofundar no guia

- [01 · AHP, NPV, Monte Carlo e Real Options](./projeto-de-leitura/01-ahp-npv-monte-carlo-real-options.md), seção "O que é": NPV, breakeven, as 10.000 simulações triangulares e a volatilidade derivada para Real Options.
- [01 · AHP, NPV, Monte Carlo e Real Options](./projeto-de-leitura/01-ahp-npv-monte-carlo-real-options.md), seção "No código do repo": `amostrarTriangular`, `simularMonteCarlo` e a análise de sensibilidade.
- [01 · AHP, NPV, Monte Carlo e Real Options](./projeto-de-leitura/01-ahp-npv-monte-carlo-real-options.md), seção "Vantagens e limites": distribuições triangulares como palpites, não ajuste a dado histórico.
- [Disciplina 07 · Monte Carlo: prazo como probabilidade](../07-ferramentas-de-ia-para-gestao-de-projetos/projeto-de-leitura/07-monte-carlo-p50-p85-p95.md), seções "Cola rápida" e "No código do repo": o mesmo método com distribuição triangular aplicado a prazos.

*Código da questão: 179525*

---

## Questão 05 · Documento de decisões: por que registrar a alternativa rejeitada

**Pergunta:** No documento de decisões de arquitetura (Escolha / Alternativa rejeitada / Por quê / Resultado real), por que documentar a alternativa rejeitada, e não só a escolha, é valioso em qualquer projeto de fine-tuning?

**Alternativas:**
- A) Regulações de proteção de dados exigem o registro formal.
- B) A alternativa rejeitada costuma virar o plano B.
- C) Permite recalcular o retorno financeiro automaticamente.
- D) ✅ Registra o raciocínio por trás da decisão, permitindo que alguém (inclusive o time, meses depois) entenda por que a alternativa aparentemente óbvia não foi escolhida e reavalie se o contexto mudar, sem reconstruir o raciocínio do zero.
- E) É mera formalidade, sem efeito prático.

**Resposta: D.** Preserva o raciocínio, não só o resultado; sem isso, decisões tomadas sem contexto repetem erros já descartados ou perdem restrições que já não são visíveis.

### Resolução comentada

Quem lê só "escolhemos LoRA rank 8" fica sem saber por que não foi o Full fine-tuning, que parece mais poderoso. Seis meses depois, alguém propõe o Full "porque é melhor" e o time refaz uma discussão que já tinha sido encerrada. Com a alternativa rejeitada registrada, a resposta está ali: no caso do guia, o rank 8 empatou comportamentalmente com o Full usando 153,5 vezes menos parâmetros.

O formato do guia tem quatro campos, e cada um faz um trabalho. A escolha é o caminho adotado. A alternativa rejeitada é, nas palavras do guia, "metade do raciocínio". O por quê liga a decisão a custo, escala, manutenção, qualidade, latência, risco ou dados. O resultado real é um número, uma métrica ou um comportamento rastreável a um experimento. Juntos, fazem o raciocínio sobreviver a quem decidiu.

Quando o contexto muda (o provedor retira um modelo, o volume cresce, o custo cai), o registro permite reavaliar rapidamente: a restrição que motivou a rejeição ainda vale? Sem o registro, a decisão vira dogma ou é desfeita sem entender o que ela protegia.

### Entenda os conceitos

- **Registro de decisões de arquitetura:** documento que lista cada decisão no formato Escolha, Alternativa rejeitada, Por quê, Resultado real. O projeto final do guia tem oito decisões (gate ponderado por AHP, MinHash + LSH, API gerenciada, LoRA rank 8, avaliação em três frentes, classificador por palavras-chave, Vertex AI por padrão com local opcional, e recusar em vez de adivinhar).
- **Alternativa rejeitada:** a opção que parecia razoável e foi descartada. Exemplos do guia: comparação par a par no lugar de MinHash + LSH (549 comparações contra 20, recall perfeito) e Full fine-tuning no lugar de LoRA.
- **Resultado real:** o desfecho medido, rastreável a um experimento, e não uma promessa.
- **Honestidade documentada:** o guia admite que o rank 8 era também o default da ferramenta (confirmado por experimento depois) e que o posto 4 do job da Vertex AI nunca foi pedido, sendo o default silencioso do provedor. O documento só é auditável se refletir o processo real, mas, como o guia também nota, ele mistura decisões tomadas antes e racionalizações feitas depois.
- **O que o experimento não prova:** o fecho do guia recomenda delimitar o que a conclusão não sustenta (outro idioma, outra moeda, escala de produção, entradas maliciosas).
- **Armadilha do guia:** "esconder alternativas rejeitadas e só registrar a escolha final".

### Por que as outras erram

- **A:** o guia não trata o registro de alternativas como exigência de proteção de dados. O gate de governança (base legal e DPA) é outro assunto.
- **B:** é plausível na prática, mas não é a razão central: o valor é preservar o porquê, e não montar um plano B. O guia não apresenta o plano B como função do documento.
- **C:** o documento não recalcula nada. Quem recalcula o retorno é a ferramenta de NPV; o documento só guarda o raciocínio.
- **E:** é o contrário: o guia afirma que o documento faz o raciocínio sobreviver a quem decidiu, com efeito direto em auditoria e reavaliação.

### Aprofundar no guia

- [17 · Decisões de arquitetura, escala para 3.000 exemplos e o fechamento](./projeto-de-leitura/17-decisoes-de-arquitetura-escala-3000-e-fechamento.md), seção "O que é": o formato escolha, alternativa, por quê, resultado e as oito decisões do projeto.
- [17 · Decisões de arquitetura, escala para 3.000 exemplos e o fechamento](./projeto-de-leitura/17-decisoes-de-arquitetura-escala-3000-e-fechamento.md), seção "🚫 Armadilhas": esconder alternativas rejeitadas e apresentar conclusão sem delimitar o que ela não prova.
- [17 · Decisões de arquitetura, escala para 3.000 exemplos e o fechamento](./projeto-de-leitura/17-decisoes-de-arquitetura-escala-3000-e-fechamento.md), seção "Vantagens e limites": o documento faz o raciocínio sobreviver a quem decidiu, e seus limites.
- [11 · Full Fine-Tuning versus LoRA](./projeto-de-leitura/11-full-fine-tuning-vs-lora.md), seção "O que é": o raciocínio por trás da alternativa rejeitada mais citada (Full).

*Código da questão: 179526*

---

## Questão 06 · Quase-duplicatas e deduplicação (MinHash + LSH)

**Pergunta:** Num novo lote de 800 exemplos de sinistros de Auto, 40 são cópias quase idênticas de um modelo de formulário, preenchido por operadores diferentes com pequenas variações. Qual é o principal risco de treinar sem remover as quase-duplicatas?

**Alternativas:**
- A) Elas só afetam o tempo do OCR.
- B) A repetição reforça o padrão sem custo, e o modelo trata os 40 como um só.
- C) Há risco de vazamento de dado sensível entre operadores, e não de qualidade.
- D) Há custo extra de armazenamento, sem efeito na qualidade.
- E) ✅ O modelo memoriza o texto repetido em vez de aprender o padrão geral, o que infla a frequência daquele exemplo no treino e prejudica a generalização para casos diferentes.

**Resposta: E.** A deduplicação via MinHash + LSH protege disso: texto quase repetido em excesso faz o modelo memorizar em vez de generalizar, mesmo parecendo reforçar o aprendizado.

### Resolução comentada

Intuitivamente, repetir parece ajudar ("quanto mais ele vê, mais aprende"). O problema é o que ele aprende. Quarenta cópias do mesmo formulário dão ao modelo quarenta oportunidades de ajustar-se àquele texto específico e nenhuma de aprender algo novo. O guia usa a analogia de uma turma de 50 alunos em que 30 são irmãos que copiam a mesma redação: parece uma turma grande, mas o professor corrige trinta vezes a mesma coisa.

Há um efeito de frequência: um texto que aparece 40 vezes tem 40 vezes mais peso no ajuste que um texto único. O modelo tende a memorizá-lo, e a generalização para casos diferentes sofre. Pior, se uma dessas cópias for parar no conjunto de teste, a métrica inflada reaparece (Questão 01).

A saída do guia é mudar a unidade de análise para o conjunto: um dataset pode ter só exemplos individualmente corretos e ainda assim induzir o modelo ao erro. MinHash + LSH acham as quase-duplicatas sem comparar todo mundo com todo mundo.

### Entenda os conceitos

- **Quase-duplicata:** texto muito parecido com outro, mas não idêntico (o mesmo sinistro reenviado, ou reescaneado com pequena diferença de OCR).
- **Memorização x generalização:** memorizar é reproduzir o que viu; generalizar é acertar no que nunca viu. O estudo da Google Research no corpus C4 (citado no guia) achou uma frase repetida dezenas de milhares de vezes e mostrou que deduplicar reduz o texto memorizado, os passos de treino necessários e a contaminação entre treino e teste.
- **Frequência no treino:** se uma fonte tem 60% dos exemplos, ela tem 60% das oportunidades de ajuste. O mesmo raciocínio vale para um texto repetido.
- **Padronização antes de comparar:** minúsculas, colapso de espaços e remoção de sobras nas pontas, para que diferenças cosméticas não escondam a semelhança.
- **Similaridade de Jaccard:** fração do conteúdo em comum entre dois conjuntos de fragmentos (shingles) de texto.
- **MinHash:** transforma cada texto numa assinatura de tamanho fixo (32 valores na demo); a fração de posições iguais entre duas assinaturas aproxima o Jaccard sem comparar todos os fragmentos. Sozinho, não decide duplicata.
- **LSH (Locality Sensitive Hashing):** divide a assinatura em bandas (8 bandas de 4 valores); quem colide em ao menos uma banda vira candidato. No conjunto da aula, 549 comparações viraram 20 candidatos (redução de ~96,4%) e os três pares plantados foram encontrados (recall perfeito).
- **Refino exato:** antes de remover, uma comparação de Jaccard exata confirma o candidato. Atenção: o guia alerta que "mesmo template não é duplicata" (dois orçamentos do mesmo template com sinistros diferentes). Ver "Pontos de atenção".
- **Balanceamento por temperatura:** depois de deduplicar, o guia equilibra as fontes (alfa = 0,3) sem duplicar a minoria e mede a diversidade com entropia de Shannon e número efetivo de fontes.

### Por que as outras erram

- **A:** quase-duplicatas não afetam o OCR; elas afetam o conjunto de treino já extraído.
- **B:** é a ilusão que a questão quer desfazer. A repetição não é "sem custo" e o modelo não trata os 40 como um só: ele os conta 40 vezes.
- **C:** vazamento entre operadores é outro risco (privacidade, PII, tratado no tópico 03). O risco principal desta questão é de qualidade.
- **D:** armazenamento é secundário. O efeito relevante é na qualidade e na avaliação.

### Aprofundar no guia

- [04 · O dataset como conjunto: MinHash, LSH, temperatura](./projeto-de-leitura/04-dataset-como-conjunto-minhash-lsh-temperatura.md), seção "O que é": por que deduplicar muda o modelo, MinHash, LSH, refino exato e balanceamento.
- [04 · O dataset como conjunto: MinHash, LSH, temperatura](./projeto-de-leitura/04-dataset-como-conjunto-minhash-lsh-temperatura.md), seção "Como funciona": a ordem do pipeline e a suíte de 16 testes.
- [04 · O dataset como conjunto: MinHash, LSH, temperatura](./projeto-de-leitura/04-dataset-como-conjunto-minhash-lsh-temperatura.md), seção "🚫 Armadilhas": remover candidato do LSH sem o refino exato.
- [03 · Do documento bruto ao exemplo validado](./projeto-de-leitura/03-do-documento-ao-exemplo-validado.md), seção "O que é": relevância, OCR, esquema canônico e PII, que vêm antes da deduplicação.

*Código da questão: 179512*

---

## Questão 07 · Teste adversarial com N pequeno

**Pergunta:** Um teste adversarial com três casos difíceis (cada um com dois valores distratores plausíveis) é aplicado a três adaptadores (rank 4, 8 e 16). Os três acertam os mesmos dois de três casos e erram o terceiro da mesma forma. O que se conclui com segurança?

**Alternativas:**
- A) O rank não tem efeito prático, então é melhor escolher sempre o mais barato.
- B) O script do teste tem erro, pois ranks diferentes deveriam dar resultados diferentes.
- C) O erro comum vem do modelo base, nada a ver com o rank.
- D) A validation loss deixou de ser confiável e deve ser descartada.
- E) ✅ Que esse teste específico não discriminou os ranks. Não é evidência de que o rank não importa em geral, só de que esse conjunto pequeno de casos não revelou diferença, o que pede um conjunto maior ou mais variado antes de generalizar.

**Resposta: E.** Um N pequeno (3) que não separa os ranks é evidência limitada, não conclusiva. Reconhecer o limite da amostra e ampliar o teste é uma lição de rigor estatístico.

### Resolução comentada

A pergunta é sobre o que um resultado nulo permite concluir. "Não vi diferença" não é "não há diferença". Com três casos, a chance de o teste não separar duas coisas parecidas é enorme, e o resultado não tem poder para afirmar equivalência nem para apontar uma causa (modelo base, script).

O guia mostra o mesmo fenômeno com um caso à mão: um orçamento de oficina nova com valor de peças (R$ 1.850), mão de obra (R$ 970) e só depois o total (R$ 2.820). Os ranks 4, 8 e 16 acertam o total e ignoram os distratores, e o exemplo não separa os ranks, mas a validation loss separa (1,246; 0,895; 0,725). Moral do guia: uma métrica agregada e um comportamento observável não são a mesma coisa, e um único exemplo não basta para avaliar.

O caminho certo é ampliar: mais casos, mais variados, repetições suficientes. O guia reforça em outro ponto que três observações não provam um fenômeno (o "erro sistemático" visto em 3 repetições nunca voltou em 58 execuções) e que seis exemplos por round de estresse são poucos.

### Entenda os conceitos

- **Teste adversarial (de estresse):** casos escritos à mão, difíceis de propósito, com distratores plausíveis, para separar quem entendeu o campo de quem copia posição. No guia, a ideia é incluir ao menos um exemplo difícil de propósito, fora do gerador de treino.
- **Distrator:** valor que parece correto mas não é (o valor de peças ao lado do total).
- **Poder discriminativo:** a capacidade de um teste de separar duas alternativas. Um teste fácil demais, ou pequeno demais, não separa, e o empate resultante não significa equivalência.
- **N pequeno:** poucas observações. Um único erro altera muito a média (no teste retido de 11 exemplos, um erro derruba 100% para cerca de 91%), e a confiança vem de repetição e variedade, não do tamanho nominal.
- **Ausência de evidência x evidência de ausência:** "o teste não achou diferença" é diferente de "provou que não há diferença".
- **Validation loss x teste observável:** a validation loss é uma medida agregada; o teste adversarial mostra comportamento. As duas visões se complementam e podem divergir.
- **Artefato de medição:** o guia ensina a investigar a régua antes de culpar o modelo. Um resultado inesperado é hipótese a investigar (resposta bruta, campo a campo), não veredito.
- **Repetição ampliada:** o guia mediu a robustez com N = 58 execuções e gravou o resultado em um ledger, justamente para não depender de três observações.

### Por que as outras erram

- **A:** generaliza demais. O próprio guia mostra que o rank muda a validation loss (de 1,246 para 0,725), e que a escolha deve ser feita por margem de qualidade e custo, não por "sempre o mais barato".
- **B:** ranks diferentes não "deveriam" dar resultados diferentes em qualquer teste. Um teste fácil pode empatar sem que haja bug. Além disso, nada no enunciado aponta falha do script.
- **C:** é uma hipótese não sustentada: três casos não permitem atribuir o erro comum ao modelo base. Poderia ser a natureza do caso, a ambiguidade do enunciado ou o próprio teste.
- **D:** a validation loss mede outra coisa (erro num conjunto reservado) e é informativa. O teste adversarial pequeno não a desqualifica.

### Aprofundar no guia

- [10 · Rank, QLoRA e DoRA](./projeto-de-leitura/10-rank-qlora-dora.md), seção "O que é": o "Teste adversarial à mão" e a frase "a validation loss separa os ranks, o exemplo não".
- [10 · Rank, QLoRA e DoRA](./projeto-de-leitura/10-rank-qlora-dora.md), seção "Vantagens e limites": "Um único exemplo adversarial e um único dataset pequeno".
- [14 · Robustez, overfitting e artefato de medição](./projeto-de-leitura/14-robustez-overfitting-e-artefato-de-medicao.md), seção "O que é": o segundo alarme (3 repetições x 58 execuções) e os limites assumidos.
- [12 · Teste retido e harness de avaliação](./projeto-de-leitura/12-teste-retido-e-harness-de-avaliacao.md), seção "Vantagens e limites": só 11 exemplos, um erro derrubaria a média para ~91%.

*Código da questão: 179522*

---

## Questão 08 · Trava de confirmação na automação (epoch_count = 0)

**Pergunta:** Um novo script de automação de fine-tuning para outro provedor gerenciado tem uma função que cria o job e dispara a chamada de rede assim que é chamada, sem parâmetro de confirmação. Um bug na montagem dos hiperparâmetros poderia criar um job real sem ninguém perceber. Que princípio, já usado no script da Vertex AI do curso, evitaria isso?

**Alternativas:**
- A) Aumentar o intervalo entre as checagens de status do job.
- B) Logs mais detalhados na criação do job, que ajudariam só a reconstruir o incidente depois do custo gasto.
- C) ✅ Exigir um parâmetro de confirmação explícita (como `confirmar=True`) antes de a função de criação chamar a rede, para que nenhum bug em outra parte do código dispare um job real sem uma decisão consciente e visível.
- D) Rodar primeiro num ambiente de teste separado.
- E) Validar só o formato do dataset antes do upload, sem trava na criação do job.

**Resposta: C.** O script real só chama a rede com `confirmar=True` explícito, uma trava que nasceu do incidente do `epoch_count=0` do Módulo 3.3. Validar o dataset é outra camada, complementar.

### Resolução comentada

Raciocine pelo tipo de erro. O risco descrito é de uma ação cara e irreversível acionada sem querer (cada job criado gera uma cobrança nova). A defesa certa tem de agir antes da ação, no ponto de maior impacto, e exigir uma decisão consciente. É o que faz a trava de confirmação: sem `confirmar=True`, o erro sai localmente e a rede não é chamada.

O guia conta o incidente que motivou esse cuidado: ao tentar criar um job com `epoch_count = 0`, esperava-se falha de validação antes de alocar recurso; a Vertex AI aceitou, levou o job a Running, e o campo apareceu ausente na configuração aplicada. O job foi cancelado após cerca de 40 segundos (custo pequeno, mas real). A lição é que silêncio da API não é confirmação, e numa automação semanal um bug que zerasse o valor criaria jobs por semanas.

O guia monta defesas em camadas: validar antes da rede (inteiro entre 1 e 20, multiplicador entre 0,1 e 10), comparar pedido com aplicado e exigir confirmação antes da ação cara. A trava de confirmação é a versão mínima do "plan e apply" da infraestrutura como código e do dry run. As alternativas erradas mexem em outras camadas ou agem tarde demais.

### Entenda os conceitos

- **Trava de confirmação (`confirmar`):** a função que cria o job só executa a chamada de rede com confirmação explícita; sem ela, falha localmente. No guia, aparece como `confirmar: true` (versão JavaScript). No repositório do curso, a versão Python (`finetuning_automation_tool.py`) exige `confirmar=True` e a versão JavaScript exige `{ confirmar: true }`; sem isso, o script lança erro antes de chamar a rede.
- **epoch_count:** quantas vezes o modelo percorre o dataset (3 no módulo). Poucas dão underfitting; demais, em dataset pequeno, dão overfitting. O valor 0 não faz sentido, e a API o aceitou em silêncio.
- **Validar antes da rede (proteção 1):** rejeitar localmente, de graça, valores impossíveis (zero, negativo, fracionário).
- **Pedido x aplicado (proteção 2):** depois de criar o job, comparar o que se pediu com o que o objeto do job diz ter aplicado. Pegadinha do guia: a API devolve inteiros de 64 bits como texto, então a comparação converte os dois lados para número antes de decidir se há divergência.
- **Fail fast:** a automação em 5 passos (converter, validar, subir ao bucket, criar o job, acompanhar) é sequencial por desenho: se o upload falha, não se cria job; se um exemplo é incompleto, para antes dos hiperparâmetros.
- **Idempotência parcial:** repetir o upload para o mesmo caminho substitui o objeto (idempotente); criar job não é, e cada chamada bem-sucedida cria um treino novo e uma nova cobrança.
- **Polling com backoff exponencial:** primeira consulta imediata, depois 5 s multiplicando por 1,5 até o teto de 60 s. Regula a frequência de consulta de status, não a criação do job.
- **Injeção de dependência:** a função de consulta e a de espera são injetáveis, e os testes usam versões falsas, rápidas e sem rede.
- **Plan e apply / dry run:** analogia da infraestrutura como código; primeiro se mostra o que será feito, depois se confirma a execução.

### Por que as outras erram

- **A:** o intervalo entre checagens (o backoff) controla o acompanhamento do job já criado. Não impede que o job seja criado indevidamente.
- **B:** logs ajudam a reconstruir o incidente depois, quando o custo já foi gasto. A questão pede prevenção.
- **D:** um ambiente de teste é uma boa prática (o guia usa dependências injetadas e testes sem rede), mas não é a trava do script real, e um bug que dispare a criação em produção continuaria sem barreira. (Complemento, fora do material: ambiente separado não substitui a decisão explícita no ponto de ação cara.)
- **E:** validar o dataset é uma camada diferente e complementar, que não impede um job criado por engano com hiperparâmetros errados.

### Aprofundar no guia

- [06 · Hiperparâmetros, silêncio de API e automação segura](./projeto-de-leitura/06-hiperparametros-e-automacao-segura.md), seção "O que é": o incidente `epoch_count = 0`, as duas proteções e a confirmação explícita antes da ação cara.
- [06 · Hiperparâmetros, silêncio de API e automação segura](./projeto-de-leitura/06-hiperparametros-e-automacao-segura.md), seção "Como funciona": os 18 testes da automação, incluindo a trava que "bloqueia sem opção, com opções vazias e libera só com verdadeiro".
- [06 · Hiperparâmetros, silêncio de API e automação segura](./projeto-de-leitura/06-hiperparametros-e-automacao-segura.md), seção "🚫 Armadilhas": "Interpretar a ausência de erro da API como prova de configuração correta".
- [05 · Fine-tuning gerenciado na Vertex AI](./projeto-de-leitura/05-vertex-ai-provedor-pipeline-e-job-real.md), seção "Como funciona": os passos e o job real que a automação protege.

*Código da questão: 179517*

---

## Questão 09 · AHP e Razão de Consistência (limiar de Saaty)

**Pergunta:** O comitê preenche uma matriz de comparação pareada para pesar as quatro perguntas, e o AHP calcula uma Razão de Consistência CR = 0,34. O que isso indica e qual é a ação recomendada?

**Alternativas:**
- A) CR acima de 0,10 é o desejável: quanto mais alto, mais confiável.
- B) O CR mede o quão bem o caso passou no gate de governança da LGPD.
- C) ✅ O julgamento é internamente inconsistente (CR acima do limiar de Saaty, 0,10); os pesos derivados não devem ser usados até o comitê revisar as comparações e reduzir a inconsistência.
- D) A matriz é válida; um CR alto só indica pesos muito diferentes entre si.
- E) O framework rejeita automaticamente o caso avaliado.

**Resposta: C.** CR < 0,10 é o limiar padrão de Saaty. Um valor de 0,34 indica contradições (por exemplo, A > B, B > C, mas C > A), e a ação é revisar as comparações.

### Resolução comentada

O AHP transforma comparações pareadas ("a pergunta de dados é quanto mais importante que a de prompt?") em pesos. Mas julgamentos humanos podem se contradizer. A Razão de Consistência é o detector de contradição: abaixo de 0,10 o julgamento é aceitável; acima, é incoerente e os pesos que saíram dele não merecem confiança.

Um exemplo de contradição: o comitê diz que A é mais importante que B, B mais que C, e C mais que A. Não existe ordenação que satisfaça os três julgamentos, e o CR alto sinaliza isso. Com CR = 0,34, mais de três vezes o limite, a ação é voltar à matriz, rever as comparações em conflito e recalcular. Não se usa o resultado enquanto isso não for feito.

Duas armadilhas de interpretação: confundir "consistente" com "certo" (o guia diz que a razão prova coerência, não acerto) e confundir o CR com o resultado do caso (ele avalia a qualidade do julgamento do comitê, não se o caso passou ou não).

### Entenda os conceitos

- **AHP (Analytic Hierarchy Process):** método (Saaty, 1980) que deriva os pesos de critérios a partir de uma matriz de comparação pareada, na escala de Saaty. No guia, os pesos das quatro perguntas saem daí, e não de percentuais escolhidos a dedo: p1 = p2 = 0,141, p3 = 0,455, p4 = 0,263.
- **Comparação pareada:** comparar os critérios dois a dois ("A é quanto mais importante que B?"). Fica mais fácil que atribuir um peso a cada um isoladamente.
- **Razão de Consistência (CR):** mede a contradição no julgamento. A referência é CR abaixo de 10% (0,10). O código calcula lambda_max, CI e CR com o índice aleatório de Saaty para n = 4 (0,90).
- **Inconsistência (intransitividade):** A > B, B > C e C > A ao mesmo tempo.
- **Média geométrica:** o guia usa a média geométrica das linhas para aproximar o autovetor e, no comitê, para agregar as matrizes de vários avaliadores célula a célula (AIJ).
- **Comitê:** três perfis (produto, compliance, engenharia) com matrizes próprias. No guia, os pesos mudam pouco e os três veredictos continuam iguais, o que mostra robustez a quem preencheu.
- **CR de referência no guia:** a aula cita ~0,038 e o código imprime 0,0038; os dois estão muito abaixo de 0,10.
- **Gate x AHP:** os pesos entram no score ponderado, mas o gate (Questão 02) e o gate de governança são independentes do AHP.

### Por que as outras erram

- **A:** inverte a lógica. CR alto é ruim, indica inconsistência; quanto menor, melhor.
- **B:** o CR não mede nada sobre LGPD nem governança. Ele avalia a coerência das comparações do comitê. O gate de governança (base legal, DPA) é verificação binária à parte.
- **D:** CR alto não indica "pesos muito diferentes", e sim contradições. Pesos muito desiguais podem ser perfeitamente consistentes.
- **E:** o framework não rejeita automaticamente o caso. O CR alto invalida os pesos, e a ação é revisar o julgamento; o veredito do caso depende do gate e das notas.

### Aprofundar no guia

- [01 · AHP, NPV, Monte Carlo e Real Options](./projeto-de-leitura/01-ahp-npv-monte-carlo-real-options.md), seção "O que é": AHP, pesos derivados, Razão de Consistência abaixo de 10% e o comitê.
- [01 · AHP, NPV, Monte Carlo e Real Options](./projeto-de-leitura/01-ahp-npv-monte-carlo-real-options.md), seção "Cola rápida": AHP, CR e AIJ em uma linha cada.
- [01 · AHP, NPV, Monte Carlo e Real Options](./projeto-de-leitura/01-ahp-npv-monte-carlo-real-options.md), seção "No código do repo": `derivarPesosAHP`, `calcularConsistenciaAHP` e a discrepância 0,038 x 0,0038.
- [01 · AHP, NPV, Monte Carlo e Real Options](./projeto-de-leitura/01-ahp-npv-monte-carlo-real-options.md), seção "Vantagens e limites": "a razão de consistência prova coerência, não acerto".

*Código da questão: 179510*

---

## Questão 10 · Valor do fine-tuning versus prompt engineering

**Pergunta:** Um modelo fine-tunado responde JSON válido com 100% de precisão média ao extrair campos de sinistro (segurado, placa, valor), sem instrução extra. O modelo genérico, sem instrução, tem 0% (nem devolve JSON válido); com uma instrução explícita de formato no prompt ("responda apenas com um objeto JSON válido, sem markdown, sem texto extra"), sobe para 66,7%. O que isso revela sobre o que o fine-tuning ensinou?

**Alternativas:**
- A) A diferença é só do tamanho do modelo; trocar por um genérico maior fecha tudo.
- B) O ganho é pequeno demais para justificar o investimento.
- C) ✅ O fine-tuning internalizou o formato e a tarefa de forma persistente, sem instrução extra a cada chamada, enquanto o genérico só se aproxima com ajuda explícita no prompt; a diferença mede o valor do fine-tuning além do que o prompt engineering sozinho conseguiria.
- D) O fine-tunado também depende de uma instrução implícita no prompt.
- E) Prova que instruir o formato no prompt substitui o fine-tuning em qualquer cenário parecido.

**Resposta: C.** O teste A/B isola o que cada abordagem aprendeu: o fine-tunado carrega o comportamento internalizado (100%), o genérico falha (0%) sem ajuda e chega a 66,7% só com a instrução que o fine-tuning tornou desnecessária.

### Resolução comentada

O A/B compara três cenários sob o mesmo protocolo: fine-tunado, genérico sem instrução, genérico com instrução. O fine-tunado acerta 100% sem receber instrução alguma, e isso significa que o formato e a tarefa viraram comportamento do modelo. O genérico precisa ser lembrado do formato a cada chamada e, mesmo assim, fica abaixo. A distância entre 100% e 66,7% é o valor que o fine-tuning agrega além do melhor prompt.

Há um detalhe: o 0% do genérico não é falta de entendimento do texto. O guia explica que ele acertou valores, mas devolveu texto livre em lista, e para uma API que espera JSON isso é falha total, porque em integração o formato é requisito funcional. Com a instrução, o genérico melhora, mas continua instável: às vezes falha o esquema, às vezes o JSON é válido com nomes de campo errados. JSON válido não é esquema válido.

Por fim, nada disso prova que prompt engineering é inútil, nem que o fine-tuning é sempre necessário. O guia manda comparar contra o melhor prompt do genérico, e perguntar, depois de corrigir o formato por prompt, se a precisão de conteúdo basta para o nível de automação desejado (com revisão humana, menos precisão pode servir).

### Entenda os conceitos

- **Teste A/B com baseline:** comparar o modelo fine-tunado com um modelo genérico sob o mesmo conjunto retido, as mesmas métricas e o mesmo prompt. Dar uma dica de formato só ao genérico contamina a comparação; por isso se compara primeiro sem a dica e depois se testa o efeito da dica isoladamente.
- **Hint (instrução) de formato:** a instrução explícita de responder só com um objeto JSON válido. Com ela, o genérico no guia varia de ~54,5% a ~72,7% (média ~61,8%) na aula e nos fallbacks do código; o ledger versionado registra o pior caso de 66,7%.
- **Comportamento internalizado:** o que o fine-tuning ensina (formato, tom, estrutura), o que dispensa repetir instruções em cada prompt. Isso é coerente com a tese da Unidade 1: fine-tuning ensina comportamento, não fatos.
- **JSON válido x esquema válido:** a primeira exige só um JSON bem-formado; o segundo exige exatamente os campos esperados, sem faltar nem sobrar. O harness do guia mede três coisas: precisão por campo, consistência e adequação de esquema.
- **Bootstrap:** reamostragem com reposição das diferenças por exemplo para medir a estabilidade da vantagem. Com os 11 exemplos, o intervalo de 95% da diferença entre fine-tunado e genérico com hint ficou entre ~24,2 e ~51,5 pontos percentuais, todo acima de zero.
- **Amostra pequena:** 11 exemplos é pouco, mas 100% contra 0% é grande demais para ignorar. O guia pede cautela, e não desprezo pela evidência.
- **Limite da especialização:** o fine-tunado carrega o hábito de JSON até para tarefas de texto livre; especialização não é domínio universal.
- **Quando fine-tuning ainda ganha:** volume (reconstruir um contexto grande em milhões de chamadas custa tokens e latência), consistência de formato (sem repetir instruções) e modelo pequeno rodando local. Mesmo assim, o guia lembra que a validação determinística segue necessária.

### Por que as outras erram

- **A:** o guia não testa um genérico maior. A comparação é entre o fine-tunado e o genérico sob o mesmo protocolo, e a hipótese "só o tamanho" não está demonstrada. (Complemento, fora do material: um modelo maior pode, sim, seguir melhor instruções, mas isso exigiria um novo A/B.)
- **B:** 100% contra 66,7% (ou 0% sem instrução) não é um ganho pequeno, e o bootstrap mostra que a vantagem está inteira acima de zero.
- **D:** o fine-tunado responde 100% sem instrução alguma no prompt. É justamente o contrário: ele não depende de instrução.
- **E:** extrapola. O experimento mostra que o prompt aproxima o genérico em um cenário, mas ele continua abaixo (e instável). O guia diz para decidir com dados, caso a caso, e não por regra geral.

### Aprofundar no guia

- [13 · Baseline, teste A/B, bootstrap, LLM-as-a-Judge](./projeto-de-leitura/13-baseline-ab-juiz-e-conjunto-vs-separado.md), seção "O que é": o resultado A/B puro, o hint de formato, a precisão do genérico e o bootstrap.
- [13 · Baseline, teste A/B, bootstrap, LLM-as-a-Judge](./projeto-de-leitura/13-baseline-ab-juiz-e-conjunto-vs-separado.md), seção "🚫 Armadilhas": dar ao genérico instruções diferentes e interpretar o 0% como incapacidade de entender o texto.
- [00 · Fine-tuning ensina comportamento, não fatos](./projeto-de-leitura/00-comportamento-vs-conhecimento-4-perguntas-e-casos.md), seção "O que é": onde o fine-tuning ainda ganha (volume, consistência de formato, modelo pequeno local).
- [15 · Veredito de escala e NPV real](./projeto-de-leitura/15-veredito-de-escala-e-npv-real.md), seção "No código do repo": o ledger que fixa o critério "bate o genérico" em 66,7%.

*Código da questão: 179524*

---

## Pontos de atenção na prova

- **Questão 01:** o guia confirma o princípio (teste independente do treino, deduplicação entre treino e teste), mas ressalva que o teste retido do curso veio do mesmo gerador determinístico do treino e que, nele, placa, valor e data podem ter aparecido no treino. Para extração, o guia considera isso aceitável (o modelo precisa ler, não lembrar), o que limita o alcance da frase "o modelo pode memorizar a resposta". A resposta C segue a resolução da prova.
- **Questão 02:** o guia diz que "um sinal vermelho em pergunta importante interrompe a recomendação" e trata as perguntas como condições necessárias não compensáveis; a prova afirma que qualquer pergunta abaixo do limiar reprova. As duas leituras levam ao mesmo veredito aqui (p3 é a pergunta de dados, a de maior peso). O cálculo de 0,629 da soma ponderada é uma conta deste comentário com os pesos da demonstração, não está no guia.
- **Questão 03:** o guia mostra que o rank 16 teve a melhor validation loss e que há retorno decrescente, mas faz a ressalva de que tudo foi medido em 20 iterações (subtreino). A frase "sem sinal de overfitting" vem da resolução da prova; o guia só descreve o início de overfitting numa curva longa de rank 8 (tópico 09). O guia não discute limite de rank na PEFT nem uma regra de igualdade entre rank e alpha (alternativas A e D).
- **Questão 04:** o guia confirma NPV positivo em 24 meses, breakeven por volta do mês 10, 10.000 simulações triangulares e a volatilidade para Real Options. A expressão "100% no pior cenário simulado" é da prova; o guia diz "100% no horizonte analisado". Os números financeiros são ilustrativos, e as distribuições triangulares são palpites de mínimo, moda e máximo.
- **Questão 05:** o guia traz o formato Escolha / Alternativa rejeitada / Por quê / Resultado real (tópico 17) e chama a alternativa rejeitada de "metade do raciocínio". O trecho da resolução sobre "repetir erros descartados ou perder restrições invisíveis" é da prova, e o guia não o descreve nesses termos. As alternativas A (regulação) e B (plano B) não são tratadas no material.
- **Questão 06:** o guia alerta que "mesmo template não é duplicata" (dois orçamentos da mesma oficina com o mesmo template e sinistros diferentes) e exige o refino exato por Jaccard antes de remover. Na prova, as 40 cópias são quase idênticas, preenchidas "com pequenas variações", e a resolução manda deduplicar. Quem aplicar o guia à risca deve confirmar, pelo Jaccard exato, que se trata de repetição e não só de template compartilhado com conteúdo diferente. A resposta E segue a resolução da prova.
- **Questão 07:** o material traz um único caso adversarial (os ranks 4, 8 e 16 acertam, e a validation loss separa) e não um teste de três casos com dois distratores cada. A conclusão sobre amostra pequena é coerente com os limites do guia (seis exemplos por round, três repetições x 58 execuções), mas a resposta E segue a resolução da prova.
- **Questão 08:** o guia apresenta o incidente `epoch_count = 0` no Módulo 3.3 e a trava de confirmação na automação do Módulo 3.4, mas não afirma literalmente que a trava "nasceu" do incidente; essa ligação vem da resolução da prova. No guia a trava aparece como `confirmar: true` (JavaScript); no repositório do curso, a versão Python exige `confirmar=True` (conferido em `finetuning_automation_tool.py`). O guia não cita "outro provedor gerenciado".
- **Questão 09:** o guia confirma o limiar de 10% e a ideia de contradição, mas não traz o valor 0,34 nem o exemplo A > B, B > C, C > A; ambos vêm da resolução da prova. A aula cita CR ~0,038 e o código imprime 0,0038 (divergência registrada no guia).
- **Questão 10:** a faixa do genérico com hint é 54,5% a 72,7% na aula e nos fallbacks do código, e 54,5% a 66,7% no ledger versionado; o 66,7% da prova coincide com o ledger (pior caso para o lado que precisa vencer). O guia traz o teste A/B (100% contra 0% contra faixa com hint), e a interpretação "valor do fine-tuning além do prompt engineering" segue a resolução da prova.

## Mapa de estudo desta disciplina

| Tema da prova | Tópico do guia que mais cobre |
|---------------|-------------------------------|
| Holdout, teste retido e vazamento (Q01) | [12 · Teste retido e harness de avaliação](./projeto-de-leitura/12-teste-retido-e-harness-de-avaliacao.md) e [04 · O dataset como conjunto](./projeto-de-leitura/04-dataset-como-conjunto-minhash-lsh-temperatura.md) |
| Quatro perguntas e gate de governança (Q02) | [00 · Fine-tuning ensina comportamento, não fatos](./projeto-de-leitura/00-comportamento-vs-conhecimento-4-perguntas-e-casos.md) |
| Rank, LoRA e retorno decrescente (Q03) | [10 · Rank, QLoRA e DoRA](./projeto-de-leitura/10-rank-qlora-dora.md) e [08 · LoRA e PEFT](./projeto-de-leitura/08-lora-peft-teoria-e-custo-fixo.md) |
| NPV, breakeven, Monte Carlo e Real Options (Q04) | [01 · AHP, NPV, Monte Carlo e Real Options](./projeto-de-leitura/01-ahp-npv-monte-carlo-real-options.md) |
| Documento de decisões de arquitetura (Q05) | [17 · Decisões de arquitetura, escala e fechamento](./projeto-de-leitura/17-decisoes-de-arquitetura-escala-3000-e-fechamento.md) |
| Deduplicação, MinHash e LSH (Q06) | [04 · O dataset como conjunto](./projeto-de-leitura/04-dataset-como-conjunto-minhash-lsh-temperatura.md) |
| Teste adversarial e N pequeno (Q07) | [10 · Rank, QLoRA e DoRA](./projeto-de-leitura/10-rank-qlora-dora.md) e [14 · Robustez, overfitting e artefato de medição](./projeto-de-leitura/14-robustez-overfitting-e-artefato-de-medicao.md) |
| Automação segura e trava de confirmação (Q08) | [06 · Hiperparâmetros, silêncio de API e automação segura](./projeto-de-leitura/06-hiperparametros-e-automacao-segura.md) |
| AHP e Razão de Consistência (Q09) | [01 · AHP, NPV, Monte Carlo e Real Options](./projeto-de-leitura/01-ahp-npv-monte-carlo-real-options.md) |
| Fine-tuning versus prompt engineering, teste A/B (Q10) | [13 · Baseline, teste A/B, bootstrap, LLM-as-a-Judge](./projeto-de-leitura/13-baseline-ab-juiz-e-conjunto-vs-separado.md) |
