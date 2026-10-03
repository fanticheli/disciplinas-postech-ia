# 06 · Estimativas com três pontos e PERT: sair da data única

> **Unidade 4 · Aula 1** · Leitura: ~6 min · Bloco: Priorizar, planejar e estimar (Unidades 2 a 4)

## 🎯 Em uma frase
Estimativa pontual transmite segurança que não existe. A **estimativa de três pontos** e a **distribuição PERT** dão um valor ponderado e uma medida de incerteza por história, e a conversa com o stakeholder passa de «qual é a data?» para «que nível de confiança queremos assumir?».

---

## 👵 Explicando para a vovó

Quando alguém pergunta quanto tempo você leva para ir ao aeroporto, você responde «40 minutos», o que vale para o trânsito bom. A resposta honesta é «de 30 a 70 minutos, normalmente 40». Quem fecha o horário do voo com base nos 40 chega correndo.

As três respostas (otimista, provável, pessimista) dão ao stakeholder o mapa real do risco. O PERT dá mais peso ao «normalmente 40», sem ignorar os extremos.

---

## 🔧 Tecnicamente

### O que é
- **Planning fallacy:** Kahneman e Tversky mostraram que as pessoas subestimam sistematicamente tempo, custo e complexidade, mesmo equipes experientes. Não é falta de competência técnica: o conhecimento reduz erro técnico, não o viés de acreditar que o próximo projeto será mais tranquilo.
- **Inside view versus outside view:** a visão de dentro analisa as características do projeto atual (equipe, arquitetura, domínio). A visão de fora pergunta quanto tempo projetos equivalentes realmente levaram. A IA ajuda a trazer referências históricas, métricas e padrões de produtividade para a estimativa.
- **Linguagem probabilística:** em vez de «10 de maio», «85% de probabilidade de entrega até 15 de maio». É o mesmo raciocínio de seguradoras, bancos e times de confiabilidade: não eliminar a incerteza, mas entendê-la para decidir.
- **Estimativa de três pontos:** otimista (O, o melhor cenário razoável), mais provável (M, o que costuma acontecer, com pequenos ajustes e dúvidas) e pessimista (P, vários fatores desfavoráveis ao mesmo tempo). O pessimista não é o pior caso imaginável: falha grave de infraestrutura ou indisponibilidade total da equipe ficam de fora.
- **PERT:** estimativa = (O + 4M + P) ÷ 6, variância = ((P − O) ÷ 6)² e desvio padrão = (P − O) ÷ 6. O cenário mais provável pesa mais que os extremos. O resultado é uma estimativa ponderada, não uma média aritmética simples.
- **Agregação:** o esforço total soma os PERT das histórias e o desvio padrão agregado é a raiz da soma das variâncias (regra do prompt do repositório; ela trata as histórias como independentes, o que nem sempre vale quando a US-03 depende da US-01).

### Como funciona
- **O papel da IA:** gera automaticamente o PERT de cada história a partir das três estimativas fornecidas pelos especialistas, com valores consistentes para as etapas seguintes. O objetivo é interpretar o risco, não tornar o planejamento matematicamente complexo.
- **Exemplo do curso:** alertas de velocidade com O = 2, M = 3 e P = 5 semanas dá PERT de 3,17 (os slides arredondam para 3,2), variância de 0,25 e desvio padrão de 0,5.
- **Como levantar o pessimista:** a pressão social (ninguém quer parecer improdutivo) encolhe o P. Levante individualmente antes da discussão e troque «quanto você acha?» por «que evento técnico específico poderia dobrar o esforço?».
- **Regras no prompt do repositório:** se P for menor que 1,5 vez M, questionar se o pessimista está subestimado; se o desvio padrão passar de 30% do PERT, classificar a história como de alta incerteza; nunca devolver só o número, sempre explicar o raciocínio.
- **Do PERT ao Monte Carlo:** os números por história não dizem a probabilidade de o projeto cumprir um prazo. Para isso é preciso agregar as distribuições e simular milhares de execuções, o assunto do [tópico seguinte](./07-monte-carlo-p50-p85-p95.md).

### Onde aplicar
- Substituir a estimativa única por O, M e P em todo o backlog do MVP e comparar a soma dos PERT com a soma das estimativas pontuais.
- Escolher as três histórias de maior variância e planejar spike, PoC ou pesquisa antes do desenvolvimento.
- Documentar o P com um risco técnico concreto («integração com GPS em área rural») e não com «pode complicar».

### Vantagens e limites
**Vantagens**
- Torna visível a incerteza que o número único esconde.
- Direciona esforço para reduzir variância onde ela é maior.
- Estimativas feitas em separado reduzem o viés de ancoragem social.

**Limites**
- Continua dependendo de O, M e P honestos: lixo entra, lixo sai.
- Pessimista inflado como «cenário de incêndio» distorce os intervalos.
- A fórmula PERT assume uma forma de distribuição que pode não refletir o histórico da equipe.

### 🚫 Armadilhas
- Reduzir artificialmente o pessimista para não parecer lento.
- Tratar o PERT como previsão de prazo do projeto: ele é por história.
- Esperar que o LLM faça a simulação (ver [Monte Carlo](./07-monte-carlo-p50-p85-p95.md)).

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Estimativa de 3 pontos | Otimista, mais provável e pessimista por história |
| PERT | (O + 4M + P) ÷ 6; o provável pesa quatro vezes |
| Variância e desvio | ((P − O) ÷ 6)² e (P − O) ÷ 6 |
| Inside/Outside view | Olhar o projeto por dentro ou pelo histórico de projetos parecidos |
| Planning fallacy | Viés sistemático de subestimar tempo e custo ao planejar |
| Alta incerteza | Critério do prompt: desvio padrão acima de 30% do PERT |

---

## 💻 No código do repo

**Projeto:** [modulo-04-estimativas-e-previsoes (prompt PERT e output)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-04-estimativas-e-previsoes)

A Parte 1 do `probability-forecast-prompt.md` é o prompt do AI Studio para PERT, variância e interpretação por audiência. O output de referência foi gerado com temperatura 0,2 e um Monte Carlo rodado por script, descrito no [tópico seguinte](./07-monte-carlo-p50-p85-p95.md).

**Fluxo**
1. `probability-forecast-prompt.md` (Parte 1): input com O, M e P em semanas por história (exemplo: US-01 2/3/5, US-03 3/4/6, US-04 1/2/3, US-09 2/3/5), número de devs em paralelo e fator de paralelismo (exemplo: 2 devs, fator 1,7). Pede PERT, variância e desvio por história, totais do projeto (soma, tempo corrido com paralelismo, desvio agregado) e interpretação para quatro audiências (técnico, gestor de produto, executivo e cliente).
2. As restrições do prompt: explicar o raciocínio, questionar pessimista menor que 1,5 vez o provável, classificar «Alta Incerteza» se o desvio passar de 30% do PERT e **não calcular Monte Carlo**.
3. `output-exemplo-forecast-m42.md`: PERT de 3,17, 4,17, 2,00 e 3,17 semanas (soma 12,51), desvio agregado de 0,93 e tempo corrido de 7,36 semanas (12,51 ÷ 1,7). Com o hardware na semana 9: 9 + 3,04 = 12,04 semanas. Traz as três maiores incertezas com ações (spike do acelerômetro, testes de perda de pacotes GPS, mocks de payload do hardware) e quatro comunicações por audiência.

**Como rodar**
- No AI Studio, cole o prompt da Parte 1 preenchendo as histórias e o paralelismo, com temperatura 0,2. Compare a tabela PERT com o output de referência.
- Refiz as contas: 3,17 + 4,17 + 2,00 + 3,17 = 12,51; √(0,25 + 0,25 + 0,11 + 0,25) = 0,93; 7,34 ÷ 1,7 = 4,3 semanas na fase de software. Tudo confere.

**Armadilhas e achados no código**
- O output sinaliza «Alerta de Viés» para US-03 e US-04, mas nelas P é exatamente 1,5 vez M, e a regra do prompt diz «menos de 1,5x». O modelo aplicou a regra de forma mais rígida que o texto (observação minha).
- O prompt diz «Não calcule Monte Carlo», mas o output traz um bloco de Monte Carlo; ele foi rodado à parte pelo script e colado depois, como indica o cabeçalho do arquivo.
- O slide 4.1 diz que o prompt «simula Monte Carlo» e fala em snippet Python, em desacordo com a instrução do prompt do repositório, que proíbe isso por LLM não sortear números aleatórios.
- O fator de paralelismo é 1,7 no prompt e no output, mas os scripts de Monte Carlo usam 1,3 e 1,5 fixos no código.
- A comunicação ao cliente no output soma 1 desvio padrão ao prazo base de 12,04 semanas (cerca de 13) e fala em «cerca de 84%» de confiança, uma leitura de curva normal sobre o cálculo determinístico. No Monte Carlo do próprio arquivo, a data de 12 semanas fica abaixo do P50 (12,5); refiz a simulação com 400 mil rodadas e 12,04 semanas têm cerca de 16% de chance, e 13 semanas cerca de 81% (o P85 é 13,1). O 13 recomendado é razoável, mas o 84% não sai da simulação.

---

## 🔗 Para ir além
- [Pasta do módulo 4 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-04-estimativas-e-previsoes)
- [Repositório oficial do módulo 07 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos)
- [Planning Fallacy (Wikipedia)](https://en.wikipedia.org/wiki/Planning_fallacy)
- [PERT, Program Evaluation and Review Technique (Wikipedia)](https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique)
- Indicação 9: Thinking, Fast and Slow (Kahneman), sem URL na fonte

---

⬅️ [05 · Cronograma adaptativo: dependências, capacidade real e what-if](./05-cronograma-adaptativo-dependencias-capacidade-what-if.md)  ·  [Guia de leitura](./README.md)  ·  [07 · Monte Carlo: prazo como probabilidade (P50, P85, P95)](./07-monte-carlo-p50-p85-p95.md) ➡️
