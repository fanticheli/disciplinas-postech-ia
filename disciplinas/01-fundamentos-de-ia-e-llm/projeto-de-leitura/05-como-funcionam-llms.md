# 05 · Como funcionam LLMs — transformers, embeddings, attention

> **Módulo 5 (Cap. 2) da disciplina** · Leitura: ~13 min · Pré-requisito: doc [01](./01-ml-dl-ia-redes-neurais.md) · ⭐ **Doc central**

## 🎯 Em uma frase
Um **LLM** (Large Language Model) é um autocompletar gigante: ele quebra o texto em **tokens**, transforma cada token em um **vetor de significado** (embedding), usa o mecanismo de **attention** para entender o contexto inteiro, e gera a resposta **um token por vez**, sempre escolhendo o próximo mais provável.

> **GPT** = **G**enerative (gera texto) · **P**re-trained (treinado antes com muito texto) · **T**ransformer (a arquitetura que torna tudo possível).

---

## 👵 Explicando para a vovó

Sabe o **autocompletar do celular**, que sugere a próxima palavra enquanto a senhora digita? Um LLM é isso levado ao extremo: em vez de sugerir uma palavrinha, ele escreve textos inteiros, sempre adivinhando "qual é a próxima palavra mais provável".

Mas como ele "entende" as palavras? Ele transforma cada pedacinho de texto num **ponto num mapa gigante**. Nesse mapa, ideias parecidas ficam pertinho: "carro" e "veículo" são vizinhos; "médico" mora perto de "hospital". Esse mapa é tão bem organizado que dá pra fazer conta com significado: *Rei − Homem + Mulher = Rainha*. É como se andar "para o lado feminino" no mapa fosse uma direção fixa.

E como ele não se perde numa frase longa? Toda vez que lê uma palavra, ele **relê a frase inteira** para entender o contexto. Na frase *"A Maria contou para a Ana que ela foi promovida"*, quem foi promovida? Ele olha tudo em volta pra decidir se "ela" é a Maria ou a Ana. Esse "reler tudo para entender cada palavra" é o famoso **attention**.

Um aviso importante da vovó pro neto: **o LLM não sabe o que é verdade.** Ele só escolhe a palavra mais provável. Se faltar informação, ele "chuta com confiança" — e às vezes inventa (isso se chama **alucinação**). Por isso, quanto melhor a pergunta e mais contexto a senhora der, melhor a resposta.

---

## 🔧 Tecnicamente

O funcionamento de um LLM tem **5 componentes**:

### 1. Tokenização
Antes de processar, o texto é quebrado em unidades chamadas **tokens**. Tokens **não são necessariamente palavras** — podem ser partes de palavras, espaços ou pontuação. O modelo trabalha com tokens porque são mais eficientes para representar linguagem.

> ⚠️ Uma palavra pode conter vários tokens. Quando um modelo limita o prompt a "4.000 tokens", **não são 4.000 palavras** — são unidades menores. Isso importa direto no custo e no planejamento de prompts.

### 2. Embeddings
Cada token é convertido em um **vetor de números** — o *embedding* — que representa seu significado **no contexto**. Palavras que aparecem em contextos parecidos acabam com embeddings próximos:
- "carro" e "veículo" → vetores próximos
- "médico" e "hospital" → relação semântica forte, mesmo sem serem sinônimos

Como as relações semânticas viram **direções no espaço vetorial**, dá para fazer aritmética:
- `Rei − Homem + Mulher = Rainha`
- `Paris − França + Itália = Roma`

> ⚠️ Trate a aritmética de vetores como ilustração didática clássica de embeddings, não como propriedade garantida de qualquer modelo.

### 3. Transformers e o mecanismo de Attention
Com os tokens virados em embeddings, a arquitetura **Transformer** os processa — uma das maiores revoluções da IA moderna. Seu coração é o **Self-Attention**: ao interpretar ou gerar cada token, o modelo **considera todas as palavras do contexto**.

> Exemplo: *"A Maria contou para a Ana que **ela** foi promovida."* — o attention ajuda a decidir a qual referência "ela" se liga, olhando o contexto completo.

Vantagens sobre modelos antigos:
- **Processa todos os tokens em paralelo** (não sequencialmente).
- **Entende relações de longa distância** dentro do texto.
- Usa **positional encodings** para preservar a **ordem** das palavras — por isso distingue *"o cachorro mordeu o homem"* de *"o homem mordeu o cachorro"* (os vetores sozinhos não carregam ordem).

### 4. Probabilidades e Decoding
Depois de processar os embeddings, o Transformer gera uma **lista de probabilidades** para o próximo token. Para *"O céu é..."*:

| Token | Probabilidade |
|-------|---------------|
| azul | 55% |
| nublado | 18% |
| claro | 10% |
| bonito | 7% |

Como o modelo **escolhe** dentre eles depende de parâmetros:
- **Temperature** — grau de aleatoriedade. Baixa = respostas mais determinísticas (menos criativas); alta = mais variedade.
- **Top-K** — limita a escolha aos K tokens mais prováveis.
- **Top-P (nucleus sampling)** — soma as probabilidades até um limiar (ex.: 90%) e escolhe dentro desse subconjunto.

### 5. Geração passo a passo (Sampling)
A IA **não gera o texto todo de uma vez**. Ela gera **token por token**, recalculando o contexto a cada nova palavra:

1. Analisa o texto gerado até agora.
2. Calcula a probabilidade dos próximos tokens.
3. Escolhe um novo token.
4. Adiciona esse token ao contexto — e repete.

Quanto maior o texto, maior o custo computacional.

> 🧭 **Complemento (fora da apostila):** a temperature atua antes da escolha, reescalando as pontuações do modelo; com valor 0 ele tende a pegar sempre o token mais provável. Top-K e Top-P costumam poder ser combinados nas APIs. E o limite de contexto conta prompt e resposta juntos: o que passar disso fica de fora.

### Alucinações e limitações
O modelo **não sabe o que é verdade ou mentira** — apenas gera o token mais provável dado o contexto. Quando falta informação ou o prompt é ambíguo, ele pode gerar **afirmações falsas que soam convincentes**. Para reduzir alucinações:
- Fornecer **contexto completo**.
- Permitir respostas do tipo **"não sei"**.
- **Evitar prompts** que pressionem por certeza absoluta.

> 🔗 É exatamente aqui que entram o **Prompt Engineering** (doc [07](./07-prompt-engineering.md)) e o **RAG** (doc [11](./11-rag-embeddings-busca-semantica.md)): dar o contexto certo, na hora certa.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| **Token** | Menor unidade de texto processada (≠ palavra) |
| **Embedding** | Vetor numérico que representa o significado |
| **Transformer** | Arquitetura que processa embeddings em paralelo |
| **Self-Attention** | Considerar todo o contexto ao interpretar cada token |
| **Positional encoding** | Informação de ordem das palavras |
| **Temperature** | Controla aleatoriedade/criatividade |
| **Top-K / Top-P** | Estratégias de escolha do próximo token |
| **Sampling** | Geração token por token |
| **Alucinação** | Afirmação falsa e convincente por falta de contexto |

---

## 💻 No curso
- Uso do **tokenizer da OpenAI** para ver na prática quantos tokens uma frase consome.
- Demonstração de **temperature** e **top-K** alterando o comportamento das respostas.
- As referências da aula incluem matérias sobre o custo de operar o ChatGPT em escala (uma de 2023 fala em cerca de US$ 700 mil por dia; é estimativa de terceiros, não verificada aqui) — reforçando por que **otimizar prompts e tokens** é engenharia, não detalhe.
- A apostila fecha o capítulo dizendo que entender tokenização, embeddings, attention e sampling ajuda a reduzir custos otimizando prompts, ajustar parâmetros e criar experiências robustas com APIs de IA.

---

## 🔗 Para ir além
- Tokenizer da OpenAI — https://platform.openai.com/tokenizer
- BertViz (visualizar attention) — https://github.com/jessevig/bertviz
- GAN Lab / experimentos visuais — https://poloclub.github.io/ganlab/
- Guia de prompting (Gemini) — https://ai.google.dev/gemini-api/docs/prompting-strategies
