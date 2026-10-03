# 04 · O dataset como conjunto: MinHash, LSH, amostragem por temperatura e entropia

> **Unidade 2 · Aula 2** · Leitura: ~11 min · Bloco: Dados: do documento ao dataset

## 🎯 Em uma frase
Um dataset pode ter só exemplos individualmente corretos e ainda induzir o modelo ao erro. A aula muda a unidade de análise para o conjunto e usa **MinHash + LSH** para achar quase-duplicatas, **amostragem por temperatura** (alfa = 0,3) para balancear fontes e **entropia de Shannon** para medir diversidade.

---

## 👵 Explicando para a vovó

Uma turma com 50 alunos em que 30 são irmãos que copiam a mesma redação parece grande, mas ensina pouco: o professor corrige trinta vezes a mesma coisa. Primeiro você identifica as cópias quase idênticas (mesmo que uma tenha um erro de digitação), sem comparar cada aluno com todos os outros.

Depois equilibra a turma: nenhuma família pode ocupar metade das vagas, mas você também não inventa alunos que não existem. E, para provar que a turma ficou mais variada, usa um número em vez de impressão.

---

## 🔧 Tecnicamente

### O que é
- **Dois problemas de conjunto:** quase-duplicatas (o mesmo sinistro reenviado, ou reescaneado com pequena diferença de OCR) e desbalanceamento de fonte (uma oficina de grande volume com mais da metade do dataset: se uma fonte tem 60%, tem 60% das oportunidades de ajuste).
- **Por que deduplicar muda o modelo, não só o arquivo:** o estudo da Google Research no corpus C4 achou uma frase repetida dezenas de milhares de vezes e mostrou menos texto memorizado, menos passos de treino para desempenho equivalente e menos contaminação entre treino e teste. Deduplicar protege treinamento, custo e avaliação ao mesmo tempo.
- **Padronização antes de comparar:** minúsculas, colapso de espaços e remoção de sobras nas extremidades, para que diferenças cosméticas não escondam semelhança.
- **MinHash:** cada texto vira uma assinatura de tamanho fixo (32 valores na demo); a fração de posições iguais entre duas assinaturas aproxima a similaridade de Jaccard sem comparar todos os fragmentos. Sozinho, não decide duplicata, só barateia a comparação.
- **LSH (Locality Sensitive Hashing):** a assinatura é dividida em bandas (8 bandas de 4 valores). Quem colide em ao menos uma banda vira candidato. No conjunto da aula, 549 comparações por força bruta viraram 20 candidatos (redução de ~96,4%) e os três pares plantados foram todos encontrados (recall perfeito).
- **Refino exato:** o LSH só localiza candidatos; antes de remover, uma comparação de Jaccard exata confirma. Dois orçamentos da mesma oficina com o mesmo template e sinistros diferentes não são duplicata: mesmo template não é duplicata.
- **Amostragem por temperatura:** pesos proporcionais à frequência elevada a alfa (alfa = 1 mantém a proporção original; alfa menor suaviza para o uniforme; alfa = 0,3, valor associado ao mT5). Os pesos contínuos viram contagens inteiras pelo método do maior resto *com restrição de capacidade*: nenhuma fonte recebe mais exemplos do que realmente tem. Balancear não é duplicar minoria.
- **Efeito medido:** a Oficina Estrela cai de ~53,8% para 40% dos exemplos de Auto; a Clínica Vitalis de ~61,1% para 50% em Saúde.
- **Diversidade com número:** entropia de Shannon da distribuição por fonte e o *número efetivo de fontes* (exp da entropia: a quantas fontes igualmente representadas a distribuição equivale). Auto vai de ~3,279 para ~3,742 (4 fontes reais); Saúde de ~2,544 para ~2,814 (3 fontes).
- **Resultado do pipeline:** 47 exemplos simulados, 44 após deduplicação, 34 após balanceamento: um arquivo menor, com menos repetição e melhor distribuído.

### Como funciona
- **Ordem:** normalizar, shingles, assinatura MinHash, bandas LSH, candidatos, Jaccard exato, remoção, depois balancear por temperatura e medir entropia antes e depois.
- **16 testes automatizados:** aproximação do MinHash em relação ao Jaccard exato, recall do LSH, duplicatas plantadas, restrição de capacidade e comportamento das métricas (suavizar nunca reduz a diversidade medida; nenhuma fonte recebe mais do que possui).
- **Implementar à mão:** na construção do material não havia biblioteca JavaScript madura com MinHash e LSH banding; quando a abstração pronta não existe, ainda é preciso entender a técnica para implementar ou validar.
- **Qualidade e volume juntos:** fine-tuning ainda precisa de cobertura suficiente; o erro é contar exemplos repetidos ou concentrados como informação nova. Passa-se a medir volume, redundância e diversidade.
- **Missão prática:** aplicar o gate a pelo menos quatro candidatos (um rejeitado), declarar o esquema canônico, montar ou simular um dataset de pelo menos 15 exemplos de pelo menos 3 fontes, rodar MinHash + LSH e balanceamento, comparar a distribuição antes e depois com entropia e ter ao menos um teste automatizado. Concluir que a fonte principal ainda não tem volume também é válido.

### Onde aplicar
- Limpar datasets de documentos onde várias unidades de uma mesma rede geram texto quase idêntico.
- Evitar que poucos parceiros de grande volume dominem o treinamento e o modelo generalize mal para fontes novas.
- Medir diversidade antes e depois de uma curadoria, em vez de declarar que «ficou mais diverso».
- Proteger a avaliação: deduplicar também entre treino e teste, para não medir memória no lugar de generalização.

### Vantagens e limites
**Vantagens**
- Reduz o custo de comparação de O(n²) para um número muito menor de candidatos sem perder duplicatas reais (nos testes).
- A temperatura balanceia sem corte arbitrário e sem inventar exemplo.
- Entropia e número efetivo de fontes dão um número comparável antes e depois.

**Limites**
- Os números da aula vêm de um dataset simulado, pequeno, com duplicatas plantadas; em dado real o LSH precisa de calibração de bandas e limiares.
- Fonte pequena demais não pode ser inflada: o balanceamento só reaproveita o que existe.
- MinHash trata similaridade sintática; não detecta o mesmo sentido com palavras diferentes.

### 🚫 Armadilhas
- Remover candidato do LSH sem o refino exato: mesmo template com sinistros distintos não é duplicata.
- Balancear duplicando exemplos da fonte minoritária para preencher cota.
- Confundir a «temperatura» do balanceamento com a temperatura de geração do LLM (parâmetro que aparece mais adiante).
- Comparar só a entrada ao deduplicar quando o par instrução e entrada é que define o exemplo (aparece no dataset Dolly do módulo 3).

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Quase-duplicata | Mesmo conteúdo com pequena diferença cosmética (reenvio, OCR) |
| Jaccard | Interseção sobre união de dois conjuntos de shingles |
| MinHash | Assinatura de tamanho fixo que aproxima o Jaccard |
| LSH banding | Divide a assinatura em bandas; colisão numa banda gera candidato |
| Recall | Fração das duplicatas reais que o método encontra |
| Amostragem por temperatura | Peso proporcional a n elevado a alfa; alfa = 0,3 como no mT5 |
| Maior resto | Converte pesos contínuos em inteiros somando ao alvo, com capacidade |
| Número efetivo de fontes | exp(entropia de Shannon): fontes equivalentes igualmente representadas |

---

## 💻 No código do repo

**Projeto:** [modulo-02-preparacao-datasets (limpeza e balanceamento)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-02-preparacao-datasets)

Uma ferramenta de ~750 linhas (JS e Python) que implementa do zero MinHash, LSH banding, refino de Jaccard, amostragem por temperatura com maior resto capacitado, entropia e número efetivo de fontes. É reutilizada pelos módulos 3 e 6, e há um documento de comparação com bibliotecas de mercado.

**Fluxo**
1. `gerarDatasetSimulado` monta 47 exemplos (28 Auto de 4 oficinas, 19 Saúde de 3 clínicas) com um reenvio e um ruído de OCR («P1aca do veicu1o») plantados; `normalizarTexto` e `shingles` (5 palavras).
2. `gerarCoeficientesHash` (LCG determinístico), `assinaturaMinHash` (k = 32), `bandingLSH` (b = 8, r = 4), `encontrarQuaseDuplicatasMinHashLSH` com refino por `similaridadeJaccardExata` e limiar de 0,55; `removerQuaseDuplicatas` mantém a primeira ocorrência.
3. Balanceamento por temperatura (alfa = 0,3), alocação por maior resto com capacidade, `entropiaShannon` e número efetivo de fontes; `limparEBalancear` encadeia tudo e é exportada para os módulos seguintes.
4. `de-para-bibliotecas-de-mercado.md`: três das seis peças não têm biblioteca madura (deduplicação completa em JS, amostragem por temperatura, validação de schema JSONL por API); normalização e similaridade têm (`natural`, `compromise`, `fastest-levenshtein`); PII tem o Presidio.

**Como rodar**
- `node dataset-cleaning-balancing-tool.js` (ou o `.py`); sem dependências. Saída real: 549 pares força-bruta reduzidos a 20 candidatos, 47 para 44 para 34 exemplos, Auto 3,279 para 3,742 e Saúde 2,544 para 2,814.
- Os 16 testes rodaram verdes em JS e Python.

**Armadilhas e achados no código**
- Nas minhas execuções a redução do LSH foi de 95,0% em Auto (19 candidatos de 28 itens, porque os templates repetem cabeçalhos longos) e 99,4% em Saúde; os «96,4%» da aula são o total.
- O LSH com b = 8 e r = 4 tem ponto de corte aproximado de similaridade (1/b)^(1/r) ≈ 0,59, pouco acima do limiar de 0,55 do refino: um par com similaridade perto de 0,55 vira candidato só em cerca de metade das vezes (1 − (1 − s^4)^8 ≈ 0,54), e a probabilidade sobe para ~0,89 em s = 0,7. Duplicatas fracas podem escapar do LSH antes do refino. O recall de 100% vale para as 3 duplicatas plantadas, não é garantia geral.
- O documento de comparação lembra que a amostragem por temperatura daqui usa a convenção n elevado a alfa (mT5), diferente da r elevado a 1/T do T5 original (seqio/t5x).
- As funções `encontrarQuaseDuplicatasMinHashLSH` e `limparEBalancear` são fixas nos dois casos da disciplina (Auto e Saúde); o dataset Dolly (tópico 06) reimplementa o laço de forma genérica.

---

## 🔗 Para ir além
- [Repositório oficial, módulo 02 (Preparação de Datasets)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-02-preparacao-datasets)
- [Lee et al.: Deduplicating Training Data Makes Language Models Better](https://arxiv.org/abs/2107.06499)
- [Raffel et al.: T5 (amostragem por temperatura)](https://arxiv.org/abs/1910.10683)
- [Xue et al.: mT5 (alfa = 0,3)](https://arxiv.org/abs/2010.11934)

---

⬅️ [03 · Do documento bruto ao exemplo validado: relevância, OCR, parser, esquema canônico e PII](./03-do-documento-ao-exemplo-validado.md)  ·  [05 · Fine-tuning gerenciado na Vertex AI: diligência de provedor, os 5 passos e um job real](./05-vertex-ai-provedor-pipeline-e-job-real.md) ➡️
