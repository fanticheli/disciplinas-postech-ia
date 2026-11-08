# 📝 Disciplina 01 · Prova comentada

> Fundamentos de IA e LLMs para Programadores. Cada questão traz o enunciado, a resposta certa, a resolução passo a passo, uma mini-aula sobre os conceitos, o erro de cada alternativa errada e onde se aprofundar no guia de leitura. O texto das alternativas foi reconstruído a partir da resolução da prova.

**Resumo das respostas**

| Questão | Tema | Resposta |
|---------|------|----------|
| 01 | O que é RAG | **E** |
| 02 | Busca por similaridade | **E** |
| 03 | Sufixo `q4f32_1` | **D** |
| 04 | Correferência e self-attention | **C** |
| 05 | Camada oculta | **D** |
| 06 | One-hot encoding | **E** |
| 07 | Aprendizado por reforço | **C** |
| 08 | Embeddings e Transformer | **A** |
| 09 | O que são embeddings | **C** |
| 10 | Top-K na busca vetorial | **B** |

---

## Questão 01 · O que é RAG

**Pergunta:** O que é RAG (Retrieval-Augmented Generation)?

**Alternativas:**
- A) Uma técnica que elimina o uso de embeddings, baseando-se apenas em busca por palavra-chave.
- B) Um parâmetro que controla a criatividade das respostas.
- C) Um processo que ajusta os pesos do modelo com novos exemplos.
- D) Um recurso que faz a LLM executar ações (rodar testes, abrir PR, fazer deploy).
- E) ✅ Um padrão em que o sistema busca informação externa relevante e injeta trechos no contexto antes da LLM responder.

**Resposta: E.** Um padrão em que o sistema busca informação externa relevante e injeta trechos no contexto antes da LLM responder.

### Resolução comentada
Pense em RAG como "buscar antes de responder". A LLM sozinha só sabe o que aprendeu no treino, e quando falta informação ela completa com o que é mais provável, o que pode virar invenção. No RAG, o sistema primeiro procura trechos nas suas fontes (documentos, PDFs, banco, código), coloca esses trechos no prompt e só então pede a resposta.

O truque para acertar a questão é perguntar "o que muda no modelo?". No RAG, nada: os pesos ficam iguais e só o prompt ganha contexto novo. Isso já elimina a C (que mexe nos pesos). A B é parâmetro de geração, a D é ação (ferramenta) e a A é o contrário do que o RAG normalmente faz.

Por isso a resposta fica apoiada em evidência atual, privada ou de um domínio específico, e não só na memória do modelo.

### Entenda os conceitos
- **RAG (Retrieval-Augmented Generation):** arquitetura que adiciona um passo de recuperação de informação externa antes da geração. A LLM recebe as informações injetadas dinamicamente no contexto. O conceito foi formalizado num paper de 2020. Analogia do guia: o aluno que, antes de escrever cada resposta da prova, consulta a cola certa ou a página exata do livro.
- **Memória paramétrica:** o conhecimento aprendido no treino e codificado nos pesos do modelo.
- **Memória não-paramétrica:** uma base externa pesquisável, geralmente com índice vetorial, que identifica os trechos relevantes para cada pergunta. É o que o RAG usa.
- **Embedding:** vetor numérico que representa o significado de um texto. É o que permite a busca por sentido (mais na Questão 09).
- **Chunk:** pedaço coerente de texto, com sentido completo, em que as fontes são divididas na indexação.
- **RAG em 2 fases:** na indexação (feita uma vez) coleta fontes, divide em chunks, gera embeddings e guarda num banco vetorial. Na consulta (a cada pergunta) converte a pergunta em embedding, busca os mais similares e injeta os trechos no prompt.
- **Fine-tuning:** ajusta os pesos do modelo com novos exemplos. É memória permanente, mas cara e demorada. RAG, ao contrário, só vale enquanto a informação está no prompt e é descartada ao fim da interação.
- **MCP:** protocolo que dá à LLM acesso a ferramentas externas. Pode ser o canal por onde o RAG busca, mas não é método de recuperação.
- **Temperature, Top-K e Top-P:** parâmetros de como a LLM escolhe o próximo token (detalhes na Questão 04).

### Por que as outras erram
- **A:** RAG normalmente usa embeddings, que são justamente o que permite a busca por sentido. Não elimina embeddings nem se limita a palavra-chave.
- **B:** criatividade é controlada por temperature, Top-K e Top-P, que são da geração de texto.
- **C:** ajustar pesos com novos exemplos é fine-tuning. No RAG o modelo não muda, só recebe contexto novo.
- **D:** executar ações (rodar testes, abrir PR, fazer deploy) é o que MCP e agentes fazem.

### Aprofundar no guia
- [11 · RAG, embeddings e busca semântica](./projeto-de-leitura/11-rag-embeddings-busca-semantica.md), seção "A essência do RAG": memória paramétrica x não-paramétrica e o problema que o RAG resolve.
- Mesmo tópico, seção "RAG vs. MCP vs. Fine-tuning": tabela que compara o que cada abordagem faz e se muda os pesos.
- [09 · MCP e automação](./projeto-de-leitura/09-mcp-e-automacao.md): o que é o MCP, para entender por que ele não é método de recuperação.
- [08 · RAG como padrão de arquitetura (disciplina 08)](../08-arquitetura-de-sistemas-com-ia/projeto-de-leitura/08-rag-basic-hybrid-multi-index-agentic.md), seção "O que é": Basic RAG, Hybrid Search, Multi-Index e Agentic RAG, quando o RAG vira componente de arquitetura.

*Código da questão: 157678*

---

## Questão 02 · Busca por similaridade

**Pergunta:** Na aula, "busca por similaridade" foi descrita como:

**Alternativas:**
- A) Treinar um modelo para memorizar a transcrição inteira.
- B) Procurar a palavra exata digitada pelo usuário no texto.
- C) Ordenar os trechos por data ou popularidade.
- D) A LLM prever a resposta sem consultar nenhum contexto.
- E) ✅ Comparar embeddings e retornar trechos com sentido parecido ao da pergunta.

**Resposta: E.** Comparar embeddings e retornar trechos com sentido parecido ao da pergunta.

### Resolução comentada
A palavra-chave aqui é **sentido**. Na busca por similaridade o sistema não procura a palavra igual: transforma o texto e a pergunta em vetores (embeddings) e devolve os trechos cujos vetores estão mais próximos do vetor da pergunta, os top-K.

Para eliminar as erradas, pergunte "a busca olha o significado?". Palavra exata é Ctrl+F, data ou popularidade é ordenação e prever sem contexto é geração pura. Nenhuma delas compara significados.

### Entenda os conceitos
- **Busca por similaridade (busca semântica):** busca pelo **sentido**, não pela forma literal das palavras. Textos com significado parecido ficam próximos no espaço vetorial, mesmo escritos com palavras diferentes. A consulta é só um cálculo matemático de qual vetor está mais perto do vetor da pergunta.
- **Embedding:** o vetor numérico que representa o significado do texto. Analogia do guia: um mapa onde ideias semelhantes estão geograficamente próximas, ou uma biblioteca organizada por assunto (e não por ordem alfabética), em que livros parecidos ficam na mesma prateleira.
- **Busca lexical (Ctrl+F):** procura a palavra idêntica. A busca semântica entende que "como a rede ajusta os pesos" e "backpropagation" falam da mesma coisa, mesmo sem repetir as palavras.
- **Banco vetorial:** armazena embeddings para fazer essa busca por similaridade.
- **Top-K:** quantos dos trechos mais próximos voltam (tratado na Questão 10).

### Por que as outras erram
- **A:** treinar um modelo para memorizar a transcrição é o oposto do RAG. Na busca nada é treinado.
- **B:** procurar a palavra exata é o Ctrl+F, a busca lexical.
- **C:** ordenar por data ou popularidade não olha o significado.
- **D:** a LLM prever a resposta sem contexto é geração pura, sem busca.

### Aprofundar no guia
- [11 · RAG, embeddings e busca semântica](./projeto-de-leitura/11-rag-embeddings-busca-semantica.md), seção "Embeddings e Vector Databases (Cap. 2)": a definição de busca por similaridade e o mapa de ideias próximas.
- Mesmo tópico, seção "👵 Explicando para a vovó": a analogia da biblioteca por assunto e a diferença para o Ctrl+F.
- [05 · Como funcionam LLMs](./projeto-de-leitura/05-como-funcionam-llms.md), seção "2. Embeddings": o token vira um vetor de números e palavras que aparecem em contextos parecidos ficam com vetores próximos.
- [08 · RAG como padrão de arquitetura (disciplina 08)](../08-arquitetura-de-sistemas-com-ia/projeto-de-leitura/08-rag-basic-hybrid-multi-index-agentic.md), seção "O que é": mostra o limite da busca só semântica (termo exato) e o Hybrid Search.

*Código da questão: 157683*

---

## Questão 03 · O sufixo `q4f32_1`

**Pergunta:** Você vai rodar um modelo no navegador via WebLLM/MLC e encontra um nome com sufixo `q4f32_1`. Qual interpretação é a mais adequada?

**Alternativas:**
- A) Pesos em float32; `_1` indica que o modelo foi treinado do zero.
- B) Pesos em 16 bits; `_1` é o número de tokens de contexto.
- C) Pesos em 4 bits; ativações em 16 bits; `_1` indica "sem calibração".
- D) ✅ Pesos em 4 bits; ativações e cálculos intermediários em float32; `_1` é uma variante da receita.
- E) Idêntica à C no texto da prova.

**Resposta: D.** Pesos em 4 bits; ativações e cálculos intermediários em float32; `_1` é uma variante da receita.

### Resolução comentada
Leia o sufixo em pedaços, como uma etiqueta: `q4` + `f32` + `_1`. O `q4` fala dos **pesos** (quantizados para 4 bits). O `f32` fala das **ativações** (os cálculos no meio do caminho, em float32). O `_1` é só o identificador da variante da receita de quantização.

Com essa leitura, as erradas caem por detalhes: a A diz que os pesos são float32 (é o contrário), a B diz 16 bits (o sufixo é q4) e C e E dizem ativações em 16 bits (o sufixo é `f32`, não `f16`).

Quantização é o que permite, por exemplo, rodar um modelo de 20B de parâmetros com 16 GB de RAM.

### Entenda os conceitos
- **Parâmetros:** os pesos do modelo, o que ele aprendeu. Mais parâmetros significam mais capacidade e mais exigência computacional (ex.: modelos de 20B ou 120B).
- **Quantização:** reduzir o tamanho do modelo trocando a representação numérica dos pesos por uma mais compacta. Usa menos memória e roda mais rápido, com leve perda de qualidade.
- **`q4`:** os pesos em 4 bits.
- **Ativação:** o valor que cada neurônio calcula e passa adiante no meio do caminho. Aqui ficam em float32, mais estável do que quantizar tudo (esse "mais estável" é a explicação da resolução da prova).
- **`_1`:** identificador interno da variante da receita de quantização. O guia não detalha as variantes; a ideia de "sem calibração" das alternativas C e E não aparece no material.
- **MLC / WebLLM:** o material avisa que essa grafia é a do MLC (o link da aula aponta para `Llama-3-8B-Instruct-q4f32_1-MLC`), provavelmente não a das tags do Ollama. Rodar o modelo "no navegador" via WebLLM é o contexto do enunciado (complemento, fora do material: o tópico 06 trata de IA no navegador, mas não menciona WebLLM nem MLC).
- **Tamanho de contexto:** quantos tokens o modelo processa por vez (32k, 128k, até 1M). É outra coisa, e não tem relação com o `_1`.

### Por que as outras erram
- **A:** inverte tudo. Os pesos não ficam em float32 (são de 4 bits) e `_1` não quer dizer "treinado do zero".
- **B:** os pesos não são de 16 bits e `_1` não é número de tokens de contexto (contexto é outro conceito).
- **C e E:** são idênticas no enunciado da prova. Dizem ativações em 16 bits (o sufixo é `f32`, não `f16`) e que `_1` indica "sem calibração", o que não é o significado.

### Aprofundar no guia
- [10 · Modelos open-source vs. proprietários](./projeto-de-leitura/10-modelos-open-vs-fechados.md), seção "Ollama a fundo (Cap. 2)": os três conceitos (parâmetros, contexto, quantização) e o exemplo do `q4f32_1`.
- Mesmo tópico, seção "Cola rápida": tabela de termos com parâmetros, contexto e quantização lado a lado.
- [06 · Web AI e multimodal](./projeto-de-leitura/06-web-ai-e-multimodal.md): IA rodando no navegador, o contexto geral do enunciado (o tópico não cita WebLLM nem MLC).
- [01 · ML, DL, IA e redes neurais](./projeto-de-leitura/01-ml-dl-ia-redes-neurais.md), seção "Como uma rede neural funciona por dentro": o que são pesos e função de ativação.

*Código da questão: 157688*

---

## Questão 04 · "Ela" é a Maria ou a Ana?

**Pergunta:** Na frase "A Maria contou para a Ana que ela foi promovida", qual componente do Transformer pesa os tokens para decidir a quem "ela" se refere?

**Alternativas:**
- A) Temperature.
- B) Top-K.
- C) ✅ Self-attention, pois pesa os tokens relevantes para resolver a referência.
- D) Tokenização.
- E) Embeddings posicionais.

**Resposta: C.** Self-attention, pois pesa os tokens relevantes para resolver a referência.

### Resolução comentada
A pergunta é sobre **entender** a frase, e não sobre **gerar** a saída. O modelo, a cada token, olha para a frase inteira e dá um peso a cada outro token conforme a relevância. É esse mecanismo, o attention, que liga "ela" ao token certo a partir do contexto.

Separe as etapas na cabeça: (1) tokenizar, (2) virar embedding, (3) Transformer com attention entende o contexto, (4) decoding escolhe o próximo token. Temperature e Top-K ficam na etapa 4, depois que o modelo já entendeu. A tokenização está na 1 e só quebra o texto. Posição ajuda na ordem, mas não decide quem é "ela".

### Entenda os conceitos
- **Transformer:** a arquitetura que processa os embeddings em paralelo (não sequencialmente) e entende relações de longa distância no texto. É o "T" de GPT (Generative Pre-trained Transformer).
- **Self-attention:** o coração do Transformer. Ao interpretar ou gerar cada token, o modelo considera todas as palavras do contexto. Analogia do guia: toda vez que lê uma palavra, ele "relê a frase inteira" para entender o contexto. Exatamente a frase da Maria e da Ana é o exemplo do material.
- **Positional encoding (embeddings posicionais):** informação da ordem das palavras. Os vetores sozinhos não carregam ordem, por isso o modelo distingue "o cachorro mordeu o homem" de "o homem mordeu o cachorro". Ajuda na ordem, mas não resolve a referência sozinho.
- **Tokenização:** quebra o texto em tokens, que não são necessariamente palavras (podem ser partes de palavras, espaços ou pontuação). Uma palavra pode ter vários tokens.
- **Decoding:** depois que o Transformer processa, sai uma lista de probabilidades para o próximo token; o decoding escolhe um deles.
- **Temperature:** grau de aleatoriedade. Baixa gera respostas mais determinísticas, alta gera mais variedade.
- **Top-K:** limita a escolha aos K tokens mais prováveis.
- **Top-P (nucleus sampling):** soma as probabilidades até um limiar (ex.: 90%) e escolhe dentro desse subconjunto.

### Por que as outras erram
- **A (Temperature):** é parâmetro de seleção da saída (decoding), depois que o contexto foi entendido.
- **B (Top-K):** também é de decoding, limita quantos tokens candidatos entram na escolha. Não participa de entender a frase.
- **D (Tokenização):** só quebra o texto em pedaços, não define a quem o pronome se refere.
- **E (Embeddings posicionais):** ajudam a saber a ordem das palavras, mas não resolvem a referência sozinhos.

### Aprofundar no guia
- [05 · Como funcionam LLMs](./projeto-de-leitura/05-como-funcionam-llms.md), seção "3. Transformers e o mecanismo de Attention": o exemplo da Maria e da Ana e as vantagens sobre modelos antigos.
- Mesmo tópico, seção "4. Probabilidades e Decoding": temperature, Top-K e Top-P e por que são da escolha da saída.
- Mesmo tópico, seção "👵 Explicando para a vovó": a analogia do autocompletar do celular e do "reler a frase inteira".

*Código da questão: 157671*

---

## Questão 05 · Para que serve a camada oculta

**Pergunta:** as entradas (idade, cor, localização, já em tensor numérico) passam por uma camada oculta com neurônios e chegam a uma camada de saída com 3 neurônios (premium, medium, basic). O enunciado da prova veio sem a frase da pergunta; pelas alternativas, ela pergunta qual é o papel da camada oculta.

**Alternativas:**
- A) Ela toma a decisão final de qual categoria o usuário pertence.
- B) Ela faz o one-hot encoding das categorias.
- C) Ela remove colunas dos dados de entrada.
- D) ✅ Ela aplica cálculos e combinações nos inputs para extrair padrões antes da decisão final.
- E) Ela normaliza a idade para a faixa de 0 a 1.

**Resposta: D.** Ela aplica cálculos e combinações nos inputs para extrair padrões antes da decisão final.

### Resolução comentada
Divida a rede em três partes: entrada, oculta e saída. A entrada recebe os dados já em número. A saída tem um neurônio por categoria e entrega as probabilidades. A oculta fica no meio e faz o trabalho de "digerir" os dados: cada neurônio recebe todos os valores de entrada, aplica pesos e uma função de ativação e gera um valor novo, uma representação intermediária.

Uma dica para a prova: tudo que é preparação do dado (one-hot, normalizar, remover colunas) acontece **antes** da rede. A decisão final sai da camada de saída. Sobra a D, que descreve o que a camada oculta realmente faz.

### Entenda os conceitos
- **Camada de entrada:** recebe os dados já convertidos em números. No exemplo do guia são 7 atributos (1 idade normalizada, 3 cores e 3 cidades).
- **Camada oculta:** cada neurônio combina os valores recebidos, aplica pesos e uma função de ativação (ex.: ReLU) e emite um novo valor. Cada camada funciona como um filtro que extrai padrões mais abstratos. Analogia do guia: uma linha de montagem em que cada funcionário faz uma parte do julgamento.
- **Camada de saída:** cada neurônio representa uma categoria possível e a rede devolve uma probabilidade por categoria (ex.: via Softmax).
- **Neurônio artificial:** uma mini calculadora que recebe números, faz uma conta e passa o resultado adiante. Apesar do nome, não é um cérebro, é matemática e estatística.
- **Peso:** quanto cada conexão influencia o resultado. É o que a rede "aprende".
- **Função de ativação (ReLU, Softmax):** ReLU só passa valores positivos; Softmax entrega probabilidades que somam 1.
- **Tensor:** estrutura numérica (vetor ou matriz) que o framework processa. O TensorFlow.js não entende objetos, só tensores.
- **Normalização e one-hot:** preparação dos dados antes da rede (tratados na Questão 06).
- **Treinar:** mostrar muitos exemplos rotulados e ajustar os pesos para reduzir o erro (a loss), repetindo por várias epochs.

### Por que as outras erram
- **A:** a decisão final sai da camada de saída, que é obrigatória. A oculta só gera as representações intermediárias.
- **B:** one-hot encoding é feito antes da rede, na preparação dos dados.
- **C:** a rede não remove colunas; quem reduz features é a preparação dos dados.
- **E:** normalizar a idade (0 a 1) também é pré-processamento, não função da camada oculta.

### Aprofundar no guia
- [01 · ML, DL, IA e redes neurais](./projeto-de-leitura/01-ml-dl-ia-redes-neurais.md), seção "Como uma rede neural funciona por dentro": as três camadas e o que é treinar.
- Mesmo tópico, seção "A primeira rede neural (Caps. 4 e 5)": o exemplo com 80 neurônios ocultos em ReLU e 3 de saída em Softmax.
- Mesmo tópico, seção "No código do repo": o `exemplo-00` passo a passo (tensores, `dense`, `compile`, `fit`).

*Código da questão: 157687*

---

## Questão 06 · Cor virando [1, 0, 0]

**Pergunta:** Transformar "cor = azul/vermelho/verde" em colunas de 0 e 1 (ex.: `[1,0,0]`) é:

**Alternativas:**
- A) Regularização.
- B) Decoding.
- C) Backpropagation.
- D) Normalização.
- E) ✅ One-hot encoding (categorização): representa categorias discretas com 0 e 1.

**Resposta: E.** One-hot encoding (categorização): representa categorias discretas com 0 e 1.

### Resolução comentada
Veja o que acontece com o dado: uma categoria (cor) vira um vetor em que só a posição da categoria escolhida recebe `1` e o resto fica `0`. Isso é o one-hot. O objetivo é impedir que o modelo trate as cores como números com ordem (verde "maior" que azul), já que não existe "meia cor".

As outras opções são de fases diferentes: regularização e backpropagation são do treino, decoding é da saída de LLM, e normalização é sobre escala de valores contínuos. Aqui o 0 e o 1 são rótulos de categoria, não uma escala.

### Entenda os conceitos
- **One-hot encoding:** categorias (cor, cidade) viram vetores binários, e só a posição correspondente recebe `1`. Evita que o modelo interprete categorias como se tivessem ordem numérica.
- **Normalização:** valores contínuos (ex.: idade de 15 a 45) são escalados para o intervalo 0 a 1, para nenhuma feature dominar por causa da escala. Fórmula padrão: `(valor - min) / (max - min)`. No guia, o "Zé" de 28 anos vira `(28 - 25) / (40 - 25) = 0.2`.
- **Tensor:** a estrutura numérica em que tudo isso termina; os frameworks só entendem tensores.
- **Backpropagation:** ajusta os pesos a partir do erro, durante o treino (o guia descreve o ciclo de comparar com o rótulo e corrigir os pesos; o nome "backpropagation" é complemento, fora do material).
- **Regularização:** técnica contra overfitting (complemento, fora do material; o guia só cita overfitting nos exercícios do `exemplo-00`).
- **Decoding:** escolha do token de saída em LLMs (Questão 04).

### Por que as outras erram
- **A (Regularização):** é técnica contra overfitting, não codifica categorias.
- **B (Decoding):** é escolher o token de saída mais provável em uma LLM.
- **C (Backpropagation):** ajusta pesos a partir do erro, durante o treino.
- **D (Normalização):** é outra etapa (por exemplo, idade levada para a faixa 0 a 1 por fórmula). Os valores 0 e 1 aqui são rótulos de categoria, não escala.

### Aprofundar no guia
- [01 · ML, DL, IA e redes neurais](./projeto-de-leitura/01-ml-dl-ia-redes-neurais.md), seção "Do objeto ao tensor": normalização e one-hot lado a lado.
- Mesmo tópico, seção "Cola rápida": tabela com normalização, one-hot, tensor, loss e epoch.
- Mesmo tópico, seção "No código do repo": o vetor de 7 posições `[idade_normalizada, azul, vermelho, verde, São Paulo, Rio, Curitiba]` e os rótulos one-hot `[premium, medium, basic]`.

*Código da questão: 157677*

---

## Questão 07 · Aprendizado por reforço

**Pergunta:** No aprendizado por reforço, o algoritmo aprende principalmente por:

**Alternativas:**
- A) Repetir exemplos rotulados até acertar.
- B) Misturar soluções com cruzamento e mutação.
- C) ✅ Tentativa e erro, recebendo recompensas e punições conforme o resultado.
- D) Ordenar tokens com Top-K e Top-P.
- E) Converter imagens em texto e prever tokens.

**Resposta: C.** Tentativa e erro, recebendo recompensas e punições conforme o resultado.

### Resolução comentada
O nome já ajuda: "reforço" é reforçar o que deu certo. O agente age, vê a pontuação (positiva ou negativa) e ajusta o comportamento para maximizar a recompensa acumulada ao longo do tempo. Pense no adestramento do cachorro com petisco.

Para descartar as outras, associe cada uma ao seu tema: exemplos rotulados são aprendizado supervisionado, cruzamento e mutação são algoritmo genético, Top-K e Top-P são decoding de LLM e imagem para texto é multimodal. Só a C fala de recompensa e punição.

### Entenda os conceitos
- **Aprendizado por reforço (RL):** um agente toma decisões sequenciais para maximizar uma recompensa acumulada, aprendendo por tentativa e erro. Recompensado nos acertos, penalizado nos erros. Analogia do guia: o cachorro que senta e ganha petisco; ou a cobrinha do jogo SnakeAI, que ganha ponto ao comer a fruta e perde ao bater na parede.
- **Agente e recompensa:** o agente é quem decide; a recompensa é o sinal numérico de acerto ou erro que guia o aprendizado.
- **Algoritmo genético:** trabalha com uma população de soluções candidatas e repete avaliação (fitness), seleção, crossover e mutação por várias gerações. Analogia do guia: cruzar roseiras e escolher as melhores a cada geração.
- **Diferença central:** no genético a unidade é a população inteira de candidatos; no RL é um agente, passo a passo.
- **Aprendizado supervisionado:** aprender com exemplos rotulados ("isto é laranja, isto não é"), como a vovó mostrando mil fotos de frutas. O guia usa essa lógica ao explicar o ML.
- **Decoding (Top-K e Top-P):** escolha do próximo token em LLMs (Questão 04).
- **Multimodal:** modelos que lidam com mais de um tipo de dado, como imagem e texto (tópico 06 do guia).
- **Dilema explorar x aproveitar:** (complemento, fora do material, citado no guia como complemento) experimentar ações novas versus repetir o que já dá recompensa.

### Por que as outras erram
- **A:** repetir exemplos rotulados até acertar é aprendizado supervisionado.
- **B:** misturar soluções com cruzamento e mutação é algoritmo genético.
- **D:** ordenar tokens com Top-K e Top-P é decoding de LLM.
- **E:** converter imagens em texto e prever tokens é outro tema (modelos multimodais).

### Aprofundar no guia
- [04 · Algoritmos genéticos e aprendizado por reforço](./projeto-de-leitura/04-algoritmos-geneticos-e-reforco.md), seção "Aprendizado por Reforço (RL)": agente, decisões sequenciais e recompensa acumulada.
- Mesmo tópico, seção "A diferença central entre os dois": tabela genético x reforço.
- Mesmo tópico, seção "Algoritmos genéticos": o ciclo de avaliação, seleção, crossover e mutação e a taxa de mutação.
- [06 · Web AI e multimodal](./projeto-de-leitura/06-web-ai-e-multimodal.md): para o tema de modelos multimodais citado na alternativa E.

*Código da questão: 157674*

---

## Questão 08 · Embeddings e Transformer

**Pergunta:** Duas afirmações: (I) "Embeddings colocam tokens num espaço numérico com semântica aproximada." (II) "O Transformer transforma esses vetores em representações contextualizadas, reduzindo ambiguidades." Qual alternativa está correta?

**Alternativas:**
- A) ✅ As duas são verdadeiras: embeddings são a base; o Transformer contextualiza.
- B) A semântica depende apenas do decoding (Top-P e Top-K).
- C) A ambiguidade é resolvida pela tokenização.
- D) Embeddings já carregam o contexto completo.
- E) Só o Transformer gera vetores numéricos; embeddings não são numéricos.

**Resposta: A.** As duas são verdadeiras: embeddings são a base; o Transformer contextualiza.

### Resolução comentada
Separe o **ponto de partida** da **contextualização**. O embedding dá a cada token um vetor com o significado geral e aproximado. O Transformer (attention mais camadas) recalcula esse vetor olhando o resto da frase. É assim que "banco" de sentar e "banco" financeiro deixam de ser a mesma coisa (complemento, fora do material).

Confira cada afirmação contra o fluxo do modelo: (I) fala de embedding, e está certa. (II) fala do Transformer contextualizando, e também está certa. Como as duas valem, a resposta é a A. As demais ou atribuem a tarefa à etapa errada (decoding, tokenização) ou invertem os papéis.

Atenção ao ponto de atenção desta questão: o guia diz que o embedding representa o significado "no contexto", enquanto a prova trata o embedding como a base geral e o Transformer como quem contextualiza (veja "Pontos de atenção").

### Entenda os conceitos
- **Embedding:** vetor numérico que representa o significado do token. Palavras que aparecem em contextos parecidos ficam próximas ("carro" e "veículo"; "médico" e "hospital"). Analogia do guia: um ponto num mapa gigante em que ideias parecidas ficam pertinho.
- **Aritmética de embeddings:** como relações semânticas viram direções no espaço, dá para fazer `Rei − Homem + Mulher = Rainha`. O guia avisa que é ilustração didática, não propriedade garantida de qualquer modelo.
- **Transformer:** arquitetura que processa os embeddings (em paralelo) e, pelo self-attention, considera todo o contexto ao interpretar cada token.
- **Representação contextualizada:** o vetor depois de passar pelo Transformer, já ajustado ao contexto da frase. O termo é da afirmação II da prova. O guia descreve o efeito (o attention decide a qual referência "ela" se liga) sem usar essa expressão exata.
- **Tokenização:** só quebra o texto em tokens; não resolve ambiguidade.
- **Decoding (Top-K e Top-P):** só escolhe o próximo token a partir das probabilidades.

### Por que as outras erram
- **B:** a semântica não depende só do decoding; Top-P e Top-K atuam apenas na escolha da saída.
- **C:** ambiguidade não é resolvida pela tokenização, que só quebra o texto.
- **D:** embeddings não carregam o contexto completo; quem contextualiza é o Transformer.
- **E:** embeddings também são vetores numéricos; não é só o Transformer que os gera.

### Aprofundar no guia
- [05 · Como funcionam LLMs](./projeto-de-leitura/05-como-funcionam-llms.md), seção "2. Embeddings": o vetor de significado e a aritmética de vetores.
- Mesmo tópico, seção "3. Transformers e o mecanismo de Attention": como o Transformer processa os embeddings com o contexto inteiro.
- Mesmo tópico, seção "Cola rápida": tabela de token, embedding, Transformer e self-attention.

*Código da questão: 157672*

---

## Questão 09 · O que são embeddings

**Pergunta:** Em LLMs, o termo "embeddings" se refere a:

**Alternativas:**
- A) Um parâmetro que controla a aleatoriedade das respostas.
- B) Estratégias de escolha do próximo token entre os mais prováveis.
- C) ✅ Vetores numéricos que representam tokens em um espaço semântico.
- D) O mecanismo que pondera todo o contexto ao interpretar cada token.
- E) O processo de quebrar texto em unidades menores.

**Resposta: C.** Vetores numéricos que representam tokens em um espaço semântico.

### Resolução comentada
Cada token vira um vetor de números que representa seu significado. Palavras de uso parecido acabam com vetores próximos, formando um "espaço semântico" (o mapa do guia). Essa é a definição direta de embedding.

A questão é uma "caça à definição": cada errada descreve outro termo do mesmo capítulo. Decore o par termo e definição: temperature (aleatoriedade), Top-K e Top-P (escolha do token), attention (pondera o contexto) e tokenização (quebra o texto). Embedding é o vetor.

### Entenda os conceitos
- **Embedding:** vetor numérico que representa o significado de um token, aprendido a partir de como a palavra aparece em contexto. Analogia do guia: pontos num mapa em que "carro" e "veículo" são vizinhos e "médico" mora perto de "hospital".
- **Espaço semântico (espaço vetorial):** o "mapa" onde esses vetores vivem. Relações de significado viram direções.
- **Token:** menor unidade de texto processada; não é necessariamente uma palavra. Ao limitar o prompt em "4.000 tokens", não são 4.000 palavras.
- **Tokenização:** o ato de quebrar texto em tokens.
- **Temperature:** grau de aleatoriedade na escolha do token.
- **Top-K e Top-P:** estratégias de escolha do próximo token (K mais prováveis; probabilidades somadas até um limiar).
- **Self-attention:** o mecanismo que considera todo o contexto ao interpretar cada token.
- **Embeddings no RAG:** os mesmos vetores servem para a busca semântica (Questões 01, 02 e 10).

### Por que as outras erram
- **A:** é a definição de temperature.
- **B:** é a definição de Top-K e Top-P.
- **D:** é a definição de attention.
- **E:** é a tokenização, que divide em tokens (e eles nem sempre são palavras completas).

### Aprofundar no guia
- [05 · Como funcionam LLMs](./projeto-de-leitura/05-como-funcionam-llms.md), seção "2. Embeddings": a definição, os exemplos e a aritmética de vetores.
- Mesmo tópico, seção "1. Tokenização": a diferença entre token e palavra e o impacto em custo.
- [11 · RAG, embeddings e busca semântica](./projeto-de-leitura/11-rag-embeddings-busca-semantica.md), seção "Embeddings e Vector Databases (Cap. 2)": para que embeddings servem fora do modelo (busca por similaridade).

*Código da questão: 157669*

---

## Questão 10 · Top-K na busca no Neo4j

**Pergunta:** Você indexou uma transcrição em chunks no Neo4j e quer que, para cada pergunta, o banco retorne apenas os trechos mais relevantes, sem trazer "muita coisa". Qual ajuste conversa mais diretamente com isso?

**Alternativas:**
- A) Remover o índice vetorial.
- B) ✅ Ajustar o top-K para retornar menos resultados por consulta.
- C) Diminuir a temperature da LLM.
- D) Aproximar a query da pergunta do usuário para melhorar a relevância.
- E) Reduzir os tokens do prompt.

**Resposta: B.** Ajustar o top-K para retornar menos resultados por consulta.

### Resolução comentada
Foque no verbo do enunciado: o **banco** deve retornar menos trechos. Isso é uma decisão da etapa de **busca**, e não da LLM. O top-K da busca vetorial é exatamente "quantos resultados eu quero de volta": quer menos trechos, diminui o K.

Então elimine tudo o que é da LLM (temperature, tokens do prompt) e tudo que desmonta a busca (remover o índice). Sobra a D, que parece plausível porque melhora a relevância, mas não controla a quantidade, que é o que o enunciado pede.

### Entenda os conceitos
- **Top-K (na busca vetorial):** número de trechos mais próximos que a busca devolve. No `exemplo-12` do guia, `similarity.topK` vale 3 e a busca devolve 3 trechos por pergunta.
- **Top-K (na geração):** o mesmo nome aparece na LLM, limitando a escolha aos K tokens mais prováveis (Questão 04). Aqui o contexto é outro: busca, não geração. O guia usa o mesmo termo nos dois lugares, por isso cuidado.
- **Chunk:** pedaço coerente de texto. No Neo4j, os chunks viram nós do grafo.
- **Neo4j como banco vetorial:** conhecido como banco de grafos, também funciona como vector database. Os chunks viram nós, os embeddings viram propriedades desses nós e cria-se um índice vetorial para consultas por similaridade. Cada chunk pode carregar metadados (título da aula, seção, minuto do vídeo).
- **Índice vetorial:** a estrutura que permite buscar por similaridade. Sem ele, a busca por similaridade não funciona.
- **Temperature:** parâmetro da geração, não da busca.
- **Janela de contexto e tokens do prompt:** mexem no que vai para a LLM, não no que o banco devolve.

### Por que as outras erram
- **A:** sem o índice vetorial, a busca por similaridade deixa de funcionar ou fica lenta.
- **C:** temperature é da geração de texto, não da busca.
- **D:** aproximar a query da pergunta pode melhorar a relevância, mas não controla a quantidade de resultados, que é o que o enunciado pede.
- **E:** reduzir tokens do prompt mexe na LLM, não no que o banco devolve.

### Aprofundar no guia
- [11 · RAG, embeddings e busca semântica](./projeto-de-leitura/11-rag-embeddings-busca-semantica.md), seção "Embeddings e Vector Databases (Cap. 2)": o Neo4j como banco vetorial (chunks como nós, embeddings como propriedades).
- Mesmo tópico, seção "No código do repo": o `exemplo-12`, com `topK: 3`, `chunkSize` e `similaritySearch`; e o `exemplo-13`, com o filtro por score e o passo de geração.
- [05 · Como funcionam LLMs](./projeto-de-leitura/05-como-funcionam-llms.md), seção "4. Probabilidades e Decoding": o Top-K da geração, para não confundir com o da busca.

*Código da questão: 157685*

---

## Pontos de atenção na prova

- **Questão 03:** as alternativas C e E são idênticas no texto; a certa é a D. O guia não detalha o significado do `_1` além de "variante do esquema", e a ideia de "sem calibração" não aparece no material.
- **Questão 05:** o enunciado veio sem a frase da pergunta; respondi pelo contexto e pelas alternativas.
- **Questão 08:** o guia diz que o embedding representa o significado "no contexto"; a prova trata o embedding como a base geral e o Transformer como quem contextualiza. A resposta certa na prova é a A.
- **Questão 10:** a D também parece plausível; a B é a que responde diretamente a "retornar menos trechos". O termo "Top-K" aparece tanto na geração (Questão 04) quanto na busca (aqui), com sentidos diferentes.
- **Alternativas reconstruídas:** o texto das alternativas nas Questões 01, 02, 03, 05, 08 e 10 foi reconstruído a partir da resolução da prova, não copiado do enunciado original.

---

## Mapa de estudo desta disciplina

| Tema da prova | Tópico do guia que mais cobre |
|---------------|-------------------------------|
| RAG (Q01) | [11 · RAG, embeddings e busca semântica](./projeto-de-leitura/11-rag-embeddings-busca-semantica.md) |
| Busca por similaridade (Q02) | [11 · RAG, embeddings e busca semântica](./projeto-de-leitura/11-rag-embeddings-busca-semantica.md) |
| Quantização, `q4f32_1` (Q03) | [10 · Modelos open-source vs. proprietários](./projeto-de-leitura/10-modelos-open-vs-fechados.md) |
| Self-attention e correferência (Q04) | [05 · Como funcionam LLMs](./projeto-de-leitura/05-como-funcionam-llms.md) |
| Camada oculta (Q05) | [01 · ML, DL, IA e redes neurais](./projeto-de-leitura/01-ml-dl-ia-redes-neurais.md) |
| One-hot encoding (Q06) | [01 · ML, DL, IA e redes neurais](./projeto-de-leitura/01-ml-dl-ia-redes-neurais.md) |
| Aprendizado por reforço (Q07) | [04 · Algoritmos genéticos e aprendizado por reforço](./projeto-de-leitura/04-algoritmos-geneticos-e-reforco.md) |
| Embeddings e Transformer (Q08) | [05 · Como funcionam LLMs](./projeto-de-leitura/05-como-funcionam-llms.md) |
| O que são embeddings (Q09) | [05 · Como funcionam LLMs](./projeto-de-leitura/05-como-funcionam-llms.md) |
| Top-K na busca vetorial (Q10) | [11 · RAG, embeddings e busca semântica](./projeto-de-leitura/11-rag-embeddings-busca-semantica.md) |
