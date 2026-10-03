# 02 · Trustworthy AI, interpretabilidade e explicabilidade

> **Unidade 2 · Aula 3** · Leitura: ~6 min · Bloco: Fundamentos e explicabilidade

## 🎯 Em uma frase
**Interpretabilidade** é o grau em que uma pessoa entende a causa de uma decisão pela própria estrutura do modelo (árvore de decisão); **explicabilidade** usa técnicas externas, aplicadas depois do treino, para traduzir o comportamento de modelos complexos (caixa-preta). As duas sustentam o conceito de **Trustworthy AI**.

---

## 👵 Explicando para a vovó

Uma receita de bolo escrita passo a passo é interpretável: a senhora lê e sabe por que o bolo cresce. Já um chef que cozinha por intuição e não sabe explicar é uma caixa-preta; para entender, a senhora precisa de um tradutor que observe o que ele faz e diga: "ele sempre põe mais açúcar quando a massa está seca".

O tradutor é a explicabilidade. E ela serve também para o chef descobrir que estava pondo sal demais sem perceber.

---

## 🔧 Tecnicamente

### O que é
- **Trustworthy AI:** IA confiável é o *sistema* (desenvolvimento, implantação, operação, uso), não só o modelo. Um modelo bom pode ser usado de forma ruim. O conceito ganhou força com as discussões do AI Act da União Europeia.
- **Requisitos técnicos:** robustez, aplicabilidade no contexto real, transparência, reprodutibilidade e capacidade de generalização. **Requisitos éticos:** equidade, privacidade, responsabilidade, com transparência atravessando as duas dimensões.
- **Interpretabilidade:** a estrutura interna permite acompanhar variáveis, condições, limiares e relações até a decisão. Exemplo da aula: árvore de decisão de crédito (Joana: renda acima ou abaixo de um valor, depois score; resultado aprovado ou revisão manual). É "transparência estrutural".
- **Ensembles:** uma árvore é inspecionável; Random Forest com dezenas ou centenas delas deixa de ser interpretável por inspeção humana. Não é um modelo ruim: a complexidade muda a estratégia de análise.
- **Explicabilidade:** técnicas externas, aplicadas após o treino, que funcionam como tradutor (quais variáveis pesaram, contribuições positivas e negativas, aproximação local). Também é diagnóstico: pode revelar vazamento de informação, correlação indesejada ou feature que não deveria ser usada.

### Como funciona
- Regra de decisão da aula: quanto maior o impacto da decisão, mais importante entender o funcionamento do modelo ou, ao menos, conseguir explicar seu comportamento (razões técnicas, de negócio, de auditoria, regulatórias ou porque uma pessoa foi afetada).
- Explicabilidade como ferramenta de desenvolvimento: se uma variável aparentemente pouco útil pesa muito, investigue vazamento ou correlação; depois refine (remover variável, rever tratamento de dados, investigar viés, repensar o problema).
- LLMs: modelos com enorme número de parâmetros; entender como conceitos são representados e como uma resposta é construída ainda é área de pesquisa ativa. A aula recomenda o material da Anthropic *Mapping the Mind of a Large Language Model*.
- Perguntas abertas citadas: até onde interpretamos uma rede neural, que representação interna é identificável, como relacionar unidades internas a conceitos e como saber se a explicação representa o comportamento real do modelo.
- Preferência por artigos revisados por pares e uso parcimonioso de preprints; a biblioteca de leituras é para consulta ao longo do tempo, não para ler tudo de uma vez.

### Onde aplicar
- Escolher entre um modelo interpretável e um complexo com explicação posterior, conforme o impacto da decisão (crédito, saúde, seleção).
- Usar explicações como etapa de depuração: investigar features suspeitas antes de colocar o modelo em produção.
- Documentar para auditoria como cada decisão automatizada pode ser justificada.

### Vantagens e limites
**Vantagens**
- Interpretabilidade nativa dispensa ferramenta externa e facilita auditoria.
- Explicabilidade permite usar modelos complexos sem abrir mão de justificar decisões.
- Ajuda a detectar viés, vazamento e dependência de variáveis inadequadas.

**Limites**
- Modelos interpretáveis podem ser menos expressivos que ensembles e redes profundas.
- Explicação posterior é aproximação: nem sempre representa fielmente o modelo.
- Em LLMs, a explicabilidade ainda é imatura e é tema de pesquisa.

### 🚫 Armadilhas
- Usar interpretabilidade e explicabilidade como sinônimos (a aula insiste na distinção).
- Achar que boa precisão basta para ser "confiável".
- Tratar a explicação como um enfeite visual no fim do projeto em vez de ferramenta de diagnóstico.
- Assumir que um conjunto de árvores continua interpretável só porque cada árvore é.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Trustworthy AI | IA confiável: requisitos técnicos e éticos aplicados ao sistema inteiro |
| Interpretabilidade | Entender a decisão pela estrutura do próprio modelo |
| Explicabilidade | Técnicas externas pós-treino que traduzem o comportamento do modelo |
| Caixa-preta (black box) | Modelo cujo caminho interno é difícil de compreender diretamente |
| Árvore de decisão | Exemplo clássico de modelo interpretável, parecido com um fluxograma |
| Ensemble / Random Forest | Muitas árvores combinadas; o conjunto deixa de ser interpretável por inspeção |
| Robustez | Manter comportamento adequado em condições não ideais |
| Generalização | Funcionar além dos dados de treino, no contexto real |

---

## 💻 No curso

Aula conceitual, sem código no repositório. As leituras do módulo estão listadas no README do repo, na seção de Interpretabilidade e Explicabilidade (livro de ML interpretável, artigo da Anthropic e dois artigos da ACM sobre Trustworthy AI).

O próximo tópico mostra as técnicas citadas (SHAP, LIME, Integrated Gradients): [03 · SHAP, LIME e Integrated Gradients](./03-shap-lime-integrated-gradients.md).

---

## 🔗 Para ir além
- [Anthropic: Mapping the Mind of a Large Language Model](https://www.anthropic.com/research/mapping-mind-language-model)
- [Interpretable Machine Learning (livro online, citado no README do repo)](https://christophm.github.io/interpretable-ml-book/)
- [Trustworthy AI: From Principles to Practices (ACM)](https://dl.acm.org/doi/full/10.1145/3555803)
- [Towards Trustworthy AI: A Review of Ethical and Robust Large Language Models (ACM)](https://dl.acm.org/doi/epdf/10.1145/3777382)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia)

---

⬅️ [01 · Fontes de materiais: framework, repositório de riscos, Scholar e arXiv](./01-fontes-e-leitura-critica.md)  ·  [03 · SHAP, LIME e Integrated Gradients](./03-shap-lime-integrated-gradients.md) ➡️
