# 01 · AHP, NPV, Monte Carlo e Real Options: do sinal verde ao número

> **Unidade 1 · Aula 3** · Leitura: ~11 min · Bloco: Decidir: quando fazer fine-tuning

## 🎯 Em uma frase
A aula 3 tira a decisão do slide e a executa: **gate de governança, AHP com razão de consistência, NPV e break-even, 10 mil simulações de Monte Carlo e Real Options** para o caso que reprova só por dado. O score ponderado ajuda a quantificar, mas **nunca substitui o gate**.

---

## 👵 Explicando para a vovó

Em vez de o comitê dizer «acho que vale a pena», ele pede três coisas: quanto cada critério pesa e por quê, quanto dinheiro entra mês a mês depois de descontar o tempo, e o que acontece se as premissas oscilarem. É como planejar uma reforma: não basta o orçamento médio, você quer saber o pior e o melhor cenário.

Para quem só foi reprovado por falta de exemplos, a pergunta vira outra: vale mais treinar agora arriscando erro, ou esperar uns meses juntando dado e treinar depois? Isso tem preço, e dá para calcular.

---

## 🔧 Tecnicamente

### O que é
- **AHP (Analytic Hierarchy Process):** os pesos das 4 perguntas não são percentuais escolhidos a dedo; saem de uma matriz de comparação pareada. Na demonstração, a pergunta de dados ganha o maior peso porque é a única restrição que não se resolve por decisão da equipe. Pesos derivados: p1 = p2 = 0,141, p3 = 0,455, p4 = 0,263.
- **Razão de consistência:** detecta comparações contraditórias antes de confiar nos pesos; a referência é CR abaixo de 10%. A aula cita cerca de 0,038; o código do repositório imprime 0,0038 (os dois estão abaixo do limiar).
- **Comitê:** três perfis (produto, compliance, engenharia) com matrizes próprias, agregadas pela média geométrica célula a célula. Os pesos mudam pouco e os três veredictos continuam iguais: Auto aprovado, Saúde «ainda não», Atendimento reprovado.
- **NPV e break-even:** valor presente dos benefícios menos o investimento; break-even é o mês em que o acumulado cobre o investimento. Taxa de desconto de 1% ao mês (perfil avesso a risco). Para Auto, NPV em 24 meses positivo e break-even por volta do mês 10.
- **Monte Carlo (10.000 simulações):** volume, economia por requisição e custo variam, então os parâmetros viram distribuições triangulares (mínimo, mais provável, máximo). Para Auto, probabilidade de retorno positivo de 100% no horizonte analisado.
- **Real Options:** para Saúde, que reprova só por dado, a pergunta vira quanto vale manter a opção de treinar depois. A volatilidade é derivada do Monte Carlo e uma árvore binomial de 9 passos (um por mês, até o score de dados cruzar o limiar) é resolvida de trás para frente comparando treinar agora e continuar esperando.
- **Atendimento ao Cliente não recebe Real Options:** seu score composto pode até superar o de Saúde (0,66 contra 0,60), e uma decisão por média o aprovaria por engano; as condições necessárias P1 e P4 continuam vermelhas, e esperar não torna a tarefa estreita nem estabiliza uma política que muda.
- **Aprovar fine-tuning responde se vale, não como:** a escolha de técnica, provedor e infraestrutura é uma segunda decisão, tratada nos módulos 3 e 4.

### Como funciona
- **Pipeline do código:** governança, depois AHP e as 4 perguntas; só então NPV, Monte Carlo e, se e somente se a única pergunta vermelha for a de dados, Real Options; por fim análise de sensibilidade (±20% por parâmetro).
- **Antes de rodar:** uma suíte automatizada valida o comportamento esperado (29 testes na demonstração: 25 do framework mais 4 da seção de comitê).
- **Valor de esperar na prática:** decidir imediatamente tem valor econômico baixo (o risco do dado insuficiente supera a economia esperada); a opção de esperar recebe valor positivo, na ordem de centenas de reais. O número varia entre execuções porque a volatilidade vem da simulação. Esperar não é abandonar: fica registrada uma reavaliação futura (feita de verdade na aula 3.2 da Unidade 3).
- **Custo de treino vira premissa:** os R$ 2.400 usados como custo de treino são ilustrativos; para análise real, substituir por volume, custo de inferência, custo de treino, taxa de erro e impacto econômico próprios. A ferramenta organiza o cálculo, não cria premissas de negócio.
- **Missão prática:** aplicar as 4 perguntas ao seu caso, ponderar (AHP completo ou score simples, desde que documente por que um critério pesa mais), estimar retorno (um NPV determinístico ou break-even já bastam) e adaptar o Decision Framework Tool. Concluir que a tarefa não precisa de fine-tuning também é entrega válida.

### Onde aplicar
- Levar uma proposta de treinamento a um comitê com pesos justificados, NPV, intervalo de resultados e uma recomendação reprodutível.
- Para casos que reprovam só por dado, calcular quanto esperar e quando reavaliar, em vez de um «não» seco.
- Descobrir qual premissa mais move o resultado (sensibilidade) antes de gastar tempo refinando as outras.
- Tratar decisão de grupo: agregar matrizes de várias pessoas sem deixar um avaliador dominar.

### Vantagens e limites
**Vantagens**
- Decisão rastreável: cada pergunta tem justificativa, cada peso tem origem, cada cenário tem probabilidade.
- Monte Carlo troca uma planilha única por uma distribuição de resultados possíveis.
- O comitê mostra que o veredito é robusto a quem preencheu a matriz.

**Limites**
- Os números financeiros são ilustrativos e as distribuições triangulares são palpites de min/moda/max, não ajuste a dado histórico.
- AHP exige julgamentos subjetivos de importância relativa; a razão de consistência prova coerência, não acerto.
- Real Options só faz sentido para reprovação que o tempo resolve (dados); não se aplica a tarefa aberta ou instável.

### 🚫 Armadilhas
- Aprovar por score composto alto: Atendimento ao Cliente tem score maior que Saúde e continua reprovado.
- Tratar o resultado de Real Options como valor fixo: ele muda a cada execução.
- Confundir «vale a pena treinar» com «como treinar»: a escolha entre Full, LoRA e API gerenciada vem depois.
- Esquecer que a análise financeira usa premissas calibradas para o case, não as suas.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| AHP | Pesos derivados de matriz de comparação pareada (escala de Saaty) |
| Razão de consistência (CR) | Mede contradição no julgamento; abaixo de 0,10 é aceitável |
| AIJ | Agregar julgamentos individuais pela média geométrica célula a célula |
| NPV | Valor presente dos benefícios futuros menos o investimento |
| Break-even | Mês em que o retorno acumulado cobre o investimento |
| Monte Carlo | Muitas simulações com parâmetros amostrados de distribuições triangulares |
| Real Options | Valor de esperar, via árvore binomial, quando a reprovação melhora com o tempo |
| Sensibilidade | Ranking de quanto cada parâmetro move o NPV |

---

## 💻 No código do repo

**Projeto:** [modulo-01-decision-framework (decision-framework-tool)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-01-decision-framework)

Ferramenta de decisão em Node.js e Python (paridade funcional, sem dependências) que carrega os casos do JSON e executa gate, AHP, NPV, Monte Carlo, Real Options e sensibilidade. Reutilizada pelos módulos 3, 4 e 5.

**Fluxo**
1. `validarGovernancaDado`: reprova sem base legal definida ou com dado sensível sem DPA; roda antes do AHP e do resto, e um caso bloqueado nunca chega a calcular NPV.
2. `derivarPesosAHP` usa a média geométrica das linhas (aproximação padrão do autovetor); `calcularConsistenciaAHP` calcula lambda_max, CI e CR com o índice aleatório de Saaty para n = 4 (0,90); `agregarMatrizesComite` faz a média geométrica célula a célula.
3. `avaliarFramework` marca cada pergunta VERDE ou VERMELHO contra o limiar 0,6; `falhaSoDado` só é verdadeiro quando a única pergunta vermelha é a 3, o que habilita Real Options. `avaliarCasoCompleto` encadeia governança e gate.
4. `calcularNPV`: volume cresce de forma composta, a economia mensal é volume vezes a diferença de custo por chamada, descontada mês a mês; aceita `atrasoMeses` (sem economia enquanto espera dado).
5. `amostrarTriangular` e `simularMonteCarlo` (10.000 por padrão, RNG injetável para teste); `derivarVolatilidade` e `precificarOpcaoDeEsperar` montam a árvore CRR (u, d e probabilidade neutra ao risco) com meses de espera = ceil((scoreAlvo − score atual) / taxa de crescimento do score).
6. `analisarSensibilidade` varia ±20% e ordena por amplitude. Na demo de Auto: custo por chamada do status quo (R$ 4.457), custo do fine-tuned, crescimento e custo de treino (R$ 960).

**Como rodar**
- `node decision-framework-tool.js` ou `python3 decision_framework_tool.py` (funcionou em Node 20 e Python 3, sem instalar nada).
- A saída termina com a seção «AHP de comitê» e os testes de regressão (comitê de 1 avaliador reproduz o AHP original).

**Armadilhas e achados no código**
- CR: a aula fala em cerca de 0,038 e o código (JS e Python) imprime 0,0038; leia como erro de transcrição ou arredondamento da aula, os dois estão abaixo de 0,10.
- As 10.000 simulações usam `Math.random` sem semente na demonstração: o valor da opção de esperar variou entre minhas execuções (R$ 225,91 em JS, R$ 232,52 em Python). Os testes usam RNG semeado.
- Os riscos operacionais de provedor (OpenAI e Gemini API) estão fixos no código com datas; viram desatualizados com o tempo.
- Na Saúde, «valor de exercer agora» sai zero porque o JSON soma uma penalidade de R$ 0,08 por chamada ao custo do fine-tuned (`custoDeErroEsperadoPorChamada`); mude esse parâmetro e o resultado muda.

---

## 🔗 Para ir além
- [Repositório oficial, módulo 01 (Decision Framework)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-01-decision-framework)
- [Saaty: The Analytic Hierarchy Process (indicação 16)](https://archive.org/details/analytichierarch0000saat)

---

⬅️ [00 · Fine-tuning ensina comportamento, não fatos: gate de governança, 4 perguntas e os 3 casos](./00-comportamento-vs-conhecimento-4-perguntas-e-casos.md)  ·  [02 · Mapa das técnicas (o Zoo), casos de mercado e o risco de provedor e de obsolescência](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md) ➡️
