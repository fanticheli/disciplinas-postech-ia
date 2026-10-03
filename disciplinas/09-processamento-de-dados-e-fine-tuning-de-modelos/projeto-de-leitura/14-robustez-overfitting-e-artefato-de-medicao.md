# 14 · Robustez, overfitting e artefato de medição: quando o número ruim é culpa da régua

> **Unidade 5 · Aula 3** · Leitura: ~12 min · Bloco: Avaliar modelos fine-tunados

## 🎯 Em uma frase
Os 100% do teste retido só provam generalização dentro do padrão do gerador. A aula faz **behavioral testing**: uma sonda de capacidade geral (Round 0), variação de formato (Round 1) e variação estrutural (Round 2), todos escritos à mão. O número que parecia overfitting era um **artefato de medição**, e outro alarme sumiu com **N = 58**.

---

## 👵 Explicando para a vovó

Um aluno que gabarita as provas do professor pode ter só decorado o estilo das perguntas. Você muda o jeito de perguntar (a mesma coisa em outras palavras), depois muda a estrutura (conversa informal, duas pessoas no mesmo texto) e vê se ele continua acertando.

E quando a nota cai, antes de culpar o aluno, você olha a folha de correção: às vezes o erro foi do corretor, que anotou «consulta» como errada porque o aluno escreveu «Consulta» com C maiúsculo.

---

## 🔧 Tecnicamente

### O que é
- **O ponto cego:** treino e teste vieram da mesma função determinística: o índice mudou, o template não. Um exemplo pode ser novo e pertencer ao mesmo template. Overfitting é aprender os padrões do treino e pouco da tarefa.
- **Round 0, sonda de capacidade geral:** quatro perguntas fora do domínio (capital da França, trem a 80 km/h por 3 horas, recursão, frase inspiradora). O conteúdo permaneceu correto, mas o formato mudou: o modelo passou a embrulhar até respostas fora do domínio em JSON. É especialização de formato, não esquecimento catastrófico; e quatro perguntas são só um sinal qualitativo.
- **Behavioral testing e invariância:** perturbações que não deveriam alterar a resposta correta. O Round 1 tem seis documentos escritos à mão (3 de Auto e 3 de Saúde), plausíveis e não quebrados: rótulos coloquiais, ausência de «R$», texto corrido sem campo:valor e nome-isca (um atendente ou médico antes do segurado ou beneficiário).
- **Integridade experimental:** os IDs dos exemplos de estresse não colidem com o teste retido nem entre rounds; se um exemplo reaparece, o acerto pode ser memória.
- **O alarme falso do Round 1:** a primeira execução deu 88,9%, 11,1 pontos abaixo do baseline. Em vez de aceitar, o professor olhou a resposta bruta: os três valores estavam certos; o esperado tinha o procedimento em minúsculas e o modelo devolveu com inicial maiúscula, e o harness contou erro. **O modelo não falhou: a métrica falhou.**
- **Artefato de medição:** quando a ferramenta penaliza algo que não altera o conteúdo. Corrigido com normalização textual (caixa e espaços), o Round 1 foi reexecutado do início: 6/6 com esquema válido e precisão de 100%. Não foi flexibilizado para favorecer o modelo: a métrica passou a medir o que pretendia.
- **Causa raiz antes do veredito:** falha de compreensão? erro de parsing? normalização? dado esperado incorreto? ruído de amostragem? Só depois disso o número vira evidência.
- **Round 2, variação estrutural:** uma mensagem informal sem estrutura de documento, um valor por extenso sem dígitos («três mil e quinhentos reais») e duas entidades no mesmo texto, uma com valor fechado e outra ainda sem cobrança. Nenhum dos 200 exemplos de treino tinha mais de uma entidade principal.
- **Temperatura zero:** aqui temperatura é parâmetro de geração do modelo, sem relação com a amostragem por temperatura do balanceamento. Mesmo em zero, a plataforma não garante saída totalmente determinística.
- **Resultado do Round 2:** 100%, incluindo as duas entidades (o modelo escolheu a que tinha o valor fechado).
- **Um segundo alarme:** em um exemplo houve diferença de fraseado e, repetindo 3 vezes, o comportamento se repetiu; parecia sistemático. Com dezenas de chamadas (58 execuções) o erro nunca voltou. Três observações não provam um fenômeno; a boa avaliação testa também a estabilidade da evidência.
- **Limites assumidos:** dataset pequeno (200 exemplos), um único gerador, um registro linguístico, um idioma e uma moeda; sem teste adversarial malicioso (nenhum prompt injection); sem teste de produção em escala (latência, concorrência, rate limit); sem garantia para uma nova linha de negócio (seguro residencial seria outra distribuição); esquecimento catastrófico só parcialmente avaliado.
- **O que o 5.3 prova:** uma terceira camada de evidência: a qualidade permanece quando forma e estrutura mudam de modo realista, e a avaliação em si precisa ser investigada quando produz um resultado inesperado. «Métrica não é verdade por definição.»

### Como funciona
- **Reuso do harness:** as mesmas funções de esquema e precisão, o mesmo conjunto retido como baseline: nenhuma régua nova só para o cenário mais difícil.
- **Dois níveis de dificuldade:** Round 1 testa sinônimo de rótulo e nome-isca; Round 2 empurra para estrutura nunca vista (informal, por extenso, duas entidades).
- **Repetição ampliada:** medir a robustez estrutural com N = 58 execuções e gravar no ledger.
- **Missão prática:** criar pelo menos um teste de invariância que altere a forma sem mudar o conteúdo esperado; incluir uma variação estrutural que não exista no gerador e registrar como distinguir erro real de artefato de medição; listar o que ainda não foi testado (nova distribuição, segurança adversarial, operação em escala).

### Onde aplicar
- Ler um resultado inesperado como hipótese a investigar (resposta bruta, campo a campo), não como veredito.
- Escrever conjuntos de estresse à mão, fora do gerador de treino.
- Registrar explicitamente o que a avaliação não cobre, para não transformar um número forte em promessa exagerada.
- Repetir chamadas suficientes antes de declarar um comportamento sistemático.

### Vantagens e limites
**Vantagens**
- Reduz a hipótese de que 100% era só memória do template.
- Ensina a separar erro de modelo de erro de medição.
- Documenta limites com franqueza.

**Limites**
- Seis exemplos por round são poucos; a confiança vem de repetição, não de tamanho.
- Os testes são plausíveis, não adversariais: não testam segurança.
- A sonda de capacidade geral tem só quatro perguntas.

### 🚫 Armadilhas
- Reprovar um modelo correto porque a régua foi mal definida (maiúscula, espaço).
- Concluir overfitting pelo primeiro número ruim, sem olhar a resposta bruta.
- Aceitar um erro «sistemático» observado em 3 repetições.
- Confundir hábito de formato com esquecimento catastrófico.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Overfitting | Aprender o padrão do treino e pouco da tarefa |
| Behavioral testing | Testar o comportamento sob perturbações que não deveriam mudar a resposta |
| Teste de invariância | Muda a forma, o resultado esperado permanece |
| Artefato de medição | Queda de métrica causada pelo avaliador, não pelo modelo |
| Normalização textual | Ignorar caixa e espaços que não mudam o conteúdo |
| Esquecimento catastrófico | Perda de capacidades gerais depois do ajuste |
| N de repetições | Quantas chamadas sustentam a afirmação de que algo é sistemático |

---

## 💻 No código do repo

**Projeto:** [modulo-05-avaliacao-modelos (teste de estresse)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos)

Ferramenta (JS e Python) com os conjuntos escritos à mão e os rounds 0, 1 e 2, reaproveitando o harness e o A/B.

**Fluxo**
1. `gerarSondaCapacidadeGeral` (4 perguntas), `gerarConjuntoInvariancia` (Round 1: 3 de Auto e 3 de Saúde com `variacao` rotulada) e `gerarConjuntoInvarianciaSevero` (Round 2: mensagem informal, valor por extenso e dois registros no mesmo texto).
2. `avaliarConjunto` chama `chamarModeloReal` por exemplo e acumula esquema e precisão; `rodarRound0/1/2` imprimem a comparação com o baseline; `medirRobustezEstrutural` repete o Round 2 (N = 58) e grava `robusto-estrutura` no ledger.
3. O modo de uso é `node overfitting-stress-test-tool.js [round0|round1|round2|round2-medir] [N]`.

**Como rodar**
- Com endpoint e `gcloud`: `ENDPOINT_MODULO32=... GCP_PROJECT_ID=... node overfitting-stress-test-tool.js round1`. Os testes locais: 4 do Round 0 e 6 dos demais, com um que chama o endpoint (falha sem rede).

**Armadilhas e achados no código**
- Os conjuntos têm IDs próprios («invariancia-...» e «invariancia-severo-...»), pensados para não colidir com o teste retido; a checagem é por convenção, não por validação automática de dados.
- O verificador do módulo 6 (tópico 17) que reavalia o modelo escalado reproduz «literalmente» os mesmos 12 exemplos (esses conjuntos não são exportados); cópias que podem divergir.
- O modelo avaliado é o do job de 200 exemplos (`ENDPOINT_MODULO32`); nada aqui avalia o modelo local.
- O hábito de JSON fora do domínio (Round 0) só foi observado qualitativamente em quatro perguntas.

---

## 🔗 Para ir além
- [Repositório oficial, módulo 05 (Avaliação de Modelos)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos)

---

⬅️ [13 · Baseline, teste A/B, bootstrap, LLM-as-a-Judge e modelo conjunto versus separado](./13-baseline-ab-juiz-e-conjunto-vs-separado.md)  ·  [15 · Veredito de escala: checklist de graduação, gate reaberto, NPV real e o modelo local](./15-veredito-de-escala-e-npv-real.md) ➡️
