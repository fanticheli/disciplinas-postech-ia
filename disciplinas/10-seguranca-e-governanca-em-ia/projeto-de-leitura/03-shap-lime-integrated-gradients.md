# 03 · SHAP, LIME e Integrated Gradients

> **Unidade 2 · Aula 4** · Leitura: ~6 min · Bloco: Fundamentos e explicabilidade

## 🎯 Em uma frase
**SHAP** decompõe uma previsão em contribuições por variável (visão local e global, mais custo); **LIME** explica uma instância por aproximação local, model-agnostic; **Integrated Gradients** atribui importância à entrada integrando mudanças ao longo do caminho entre uma baseline e a entrada real (comum em redes neurais).

---

## 👵 Explicando para a vovó

Três jeitos de entender por que a prova foi corrigida daquele jeito. SHAP é o professor que mostra, questão por questão, quantos pontos cada resposta somou ou tirou. LIME é o que pega só a prova do João e refaz o raciocínio perto daquele caso. Integrated Gradients é ir da folha em branco até a prova preenchida, uma resposta por vez, vendo a nota mudar.

Em nenhum dos três a senhora pode confiar sem pensar: o gráfico mostra uma pista, não um atestado.

---

## 🔧 Tecnicamente

### O que é
- **SHAP (SHapley Additive exPlanations):** base na teoria dos jogos; transforma a previsão numa soma de contribuições. Permite também visão **global** (quais variáveis mais pesam no conjunto). Pode demandar mais recurso computacional. Em LLMs, a lógica se aplica a **tokens**.
- **LIME (Local Interpretable Model-Agnostic Explanations):** explica uma instância específica aproximando o comportamento do modelo perto daquele ponto. É **model-agnostic** (observa entradas modificadas e saídas). Foi apresentado em trabalho ligado à conferência KDD.
- **Integrated Gradients:** parte de uma **baseline** neutra, cria uma trajetória até a entrada real, mede como a saída muda em cada passo e integra para atribuir importância. Criado para evitar gradientes pequenos ou pouco informativos em certas regiões. Exemplo da aula: imagem de elefantes com tromba e orelhas destacadas.
- **Ferramentas:** LIT (Learning Interpretability Tool, recursos visuais) e Captum (ecossistema PyTorch). Implementações conhecidas estão em Python, mas o conceito não pertence à linguagem.

### Como funciona
- Escolha do método: não há resposta universal. SHAP tende a dar fundamento matemático mais forte e visão ampla, a um custo maior; LIME é mais econômico e pontual. A decisão considera cenário, criticidade, custo, tempo e infraestrutura.
- Contexto crítico (medicina, finanças): vale pensar em SHAP pela visão global, porque o problema pode estar no padrão geral e não num caso isolado. Necessidade pontual e recursos limitados: LIME pode bastar.
- Em saúde e outros domínios de alta criticidade, a saída não pode ser aceita automaticamente só porque veio de uma técnica sofisticada: exige revisão, validação e responsabilidade.
- Em NLP, não interprete uma palavra isolada como se explicasse tudo: a importância depende do contexto e da frase inteira.
- Explicação visual (Integrated Gradients) é ferramenta de investigação: uma região destacada não prova que o modelo "entendeu" o objeto como uma pessoa; ajuda a formular hipóteses.
- Compare métodos: se SHAP e LIME divergem muito na mesma observação, é sinal para investigar. Pergunte sempre: qual pergunta estou respondendo, a explicação é local ou global, o método tem limitações, a escala de importância está sendo lida certo?

### Onde aplicar
- Explicar a recusa de um crédito (LIME) ou o padrão geral de um modelo de fraude (SHAP).
- Auditar um classificador de imagens com Integrated Gradients para ver onde o modelo concentra evidência.
- Detectar viés, vazamento de informação e dependência de variáveis inadequadas como parte da governança.

### Vantagens e limites
**Vantagens**
- Permitem investigar decisões de modelos que não são interpretáveis por construção.
- SHAP oferece visão local e global; LIME é flexível por ser model-agnostic.
- Contribuem para transparência, auditoria e IA responsável.

**Limites**
- SHAP pode ser custoso computacionalmente; LIME é local e não descreve o modelo todo.
- Explicações são aproximações e podem divergir entre métodos.
- Ferramenta pronta e gráfico bonito não substituem entender a técnica.

### 🚫 Armadilhas
- Tratar explicabilidade como certificação automática de confiança (a apostila diz o contrário).
- Ler importância de token isolada, fora do contexto.
- Escolher o método pela moda e não pela pergunta, criticidade e custo.
- Ficar preso à linguagem da biblioteca: aprender o conceito permite trocar de implementação.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| SHAP | Contribuição de cada variável via teoria dos jogos; local e global |
| LIME | Aproximação local e model-agnostic para uma instância |
| Integrated Gradients | Atribuição integrando o gradiente da baseline até a entrada |
| Baseline | Referência neutra de onde parte a trajetória do Integrated Gradients |
| Model-agnostic | Não depende do tipo de algoritmo; só observa entrada e saída |
| Explicação local | Vale para uma instância e sua vizinhança, não para o modelo todo |
| LIT | Learning Interpretability Tool: interface visual para investigar modelos |
| Captum | Biblioteca de interpretabilidade associada ao PyTorch |

---

## 💻 No curso

A aula apresenta as técnicas e mostra exemplos visuais (como o das imagens com Integrated Gradients), mas o repositório do módulo não tem código dessas técnicas. Para praticar, a apostila aponta a documentação oficial de cada biblioteca.

---

## 🔗 Para ir além
- [SHAP: documentação](https://shap.readthedocs.io/en/latest/)
- [LIME: projeto](https://marcotcr.github.io/lime/)
- [Integrated Gradients: tutorial TensorFlow](https://www.tensorflow.org/tutorials/interpretability/integrated_gradients)
- [Learning Interpretability Tool (LIT)](https://pair-code.github.io/lit/)
- [Captum: Integrated Gradients](https://captum.ai/docs/extension/integrated_gradients)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia)

---

⬅️ [02 · Trustworthy AI, interpretabilidade e explicabilidade](./02-trustworthy-ai-interpretabilidade-explicabilidade.md)  ·  [04 · Vieses em IA: tipos, origens e mitigação](./04-vieses-em-ia.md) ➡️
