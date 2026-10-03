# 07 · Monte Carlo: prazo como probabilidade (P50, P85, P95)

> **Unidade 4 · Aula 2** · Leitura: ~7 min · Bloco: Priorizar, planejar e estimar (Unidades 2 a 4)

## 🎯 Em uma frase
A **simulação de Monte Carlo** sorteia valores dentro das distribuições de cada história milhares de vezes e devolve a distribuição das datas de entrega. **P50, P85 e P95** viram uma escolha explícita de tolerância ao risco, e a conta roda em **script**, não no LLM.

---

## 👵 Explicando para a vovó

Para saber a chance de chegar no horário, você não faz um cálculo só: refaz a viagem mil vezes na cabeça, com trânsito bom, normal e ruim, e anota quantas vezes chegou a tempo. Se em 85 de 100 viagens você chega até as 9h, dizer «chego até as 9h» tem 85% de confiança.

O computador faz essas viagens em milissegundos. O que ele não faz bem é o LLM «fingir» que sorteou: modelo de linguagem não gera aleatoriedade de verdade, aproxima um resultado que parece estatístico. Por isso o sorteio vai para um script.

---

## 🔧 Tecnicamente

### O que é
- **Monte Carlo:** em vez de um cenário, milhares de simulações independentes, cada uma com valores sorteados dentro das distribuições estimadas. Ao final há uma distribuição completa de datas de conclusão.
- **P50, P85, P95:** P50 é a mediana (comprometer o prazo aí é aceitar cerca de 50% de chance de atraso; serve para análise interna). P85 é o nível usado para comunicar com clientes e patrocinadores. P95 é mais conservador, para projetos críticos, com penalidade contratual ou impacto regulatório.
- **Resultado do caso (10 mil simulações, a partir dos O, M e P do [tópico anterior](./06-estimativas-tres-pontos-e-pert.md)):** P50 de 12,5 semanas, P85 de 13,1 e P95 de 13,4.
- **Por que P50 e P95 estão tão próximos:** não é projeto previsível, é uma *restrição dominante*. O lead time do hardware entrou como data fixa (semana 9), e a variabilidade do software perde influência. O Monte Carlo só representa a incerteza que foi modelada; riscos determinísticos exigem outra gestão (homologar fornecedor antes, aprovar orçamento antes, plano de contingência).
- **Comparar com o plano:** o cronograma previa 12 semanas, mas o P85 é de cerca de 13. Comprometer 12 semanas é assumir um nível de confiança baixo. A apostila diz que seria próximo de P35.
- **SLO de projeto:** a analogia com engenharia de confiabilidade: assim como se definem percentis de latência, definem-se percentis de entrega. A discussão passa a ser sobre tolerância ao risco, com duas saídas honestas: cortar escopo ou renegociar a data.

### Como funciona
- **Modelagem do caso:** quatro histórias com O, M e P em semanas (US-01 2/3/5, US-03 3/4/6, US-04 1/2/3, US-09 2/3/5). Duas trilhas: *software* (US-01 e US-03 em sequência com pouco overlap) e *hardware* (US-04 e US-09, que só começam na semana 9). O projeto termina quando a trilha mais lenta termina.
- **Espera não é esforço:** o prazo do fornecedor é restrição de calendário e não variabilidade de desenvolvimento; misturar os dois é um erro comum.
- **Comunicação por público:** o time técnico precisa de variâncias e das histórias de maior incerteza (spikes, protótipos). O gestor de produto precisa do nível de confiança do prazo e dos drivers (aqui, o lead time do hardware). O executivo precisa da decisão de negócio (qual investimento aprovar, aqui acelerar a compra). O cliente externo precisa saber que o risco foi identificado e mitigado, sem estatística.
- **Cinco cuidados:** pessimista subestimado, distribuição inadequada (para caudas pesadas, como mudanças de escopo e defeitos críticos, considerar log-normal), P85 não é prazo garantido (os 15% restantes podem atrasar semanas), estimativas devem ser calibradas contra o histórico de entregas, e quando o stakeholder insiste em uma data única, transformar isso em discussão sobre o risco que ele aceita.

### Onde aplicar
- Calcular P50, P85 e P95 do backlog do MVP com o script e escolher o percentil de compromisso externo de forma consciente.
- Rodar de novo quando o lead time do fornecedor mudar (basta alterar a constante da semana do hardware).
- Levar ao stakeholder a pergunta «qual probabilidade de atraso você aceita?» em vez de uma data.

### Vantagens e limites
**Vantagens**
- Comunica risco com precisão e muda o contrato com o stakeholder.
- Mostra o que de fato governa o prazo (aqui o hardware, não o software).
- O script é pequeno, sem dependências, e roda no navegador, em Node ou em Python.

**Limites**
- Só captura a incerteza que o modelo inclui: riscos tratados como fixos ficam invisíveis.
- Depende de histórico para calibrar O, M e P; sem ele são hipóteses.
- Percentis dão aparência de exatidão a um modelo simplificado.

### 🚫 Armadilhas
- Pedir ao LLM para «simular 1000 cenários»: o número sai plausível, mas não há distribuição real.
- Prometer o P50 ao cliente.
- Concluir que o projeto é «previsível» só porque P50 e P95 estão próximos.

> 💡 **Dica:** Se a data do hardware é incerta, rode o script com mais de um valor para a constante e compare os percentis.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Monte Carlo | Simulação por sorteio repetido para obter a distribuição de um resultado |
| P50 / P85 / P95 | Percentis da distribuição de prazo: 50%, 85% e 95% das simulações terminam até lá |
| Restrição dominante | Fator fixo que controla o resultado e esconde a variabilidade do resto |
| Distribuição triangular | Usa só O, M e P; é a que os scripts do curso sorteiam |
| Log-normal | Distribuição assimétrica de cauda longa, sugerida para stories que podem estourar |
| SLO | Service Level Objective: meta de nível de serviço; aqui, meta de confiança de prazo |

---

## 💻 No código do repo

**Projeto:** [modulo-04-estimativas-e-previsoes (scripts de Monte Carlo)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-04-estimativas-e-previsoes)

Dois scripts equivalentes (`monte-carlo-routewise.js` e `monte-carlo-routewise.py`) que simulam 10.000 execuções do MVP com duas trilhas (software e hardware) e imprimem P50, P85, P95 e média. Também estão na Parte 2 do prompt, para colar no console do navegador ou rodar localmente.

**Fluxo**
1. Dados: um dicionário com as quatro histórias e seus O, M e P, mais as constantes `HARDWARE_SEMANA = 9` e `N = 10_000`.
2. `triangular(o, m, p)`: sorteia um valor pela inversa da distribuição triangular a partir de um número uniforme. Ou seja, o script usa uma distribuição **triangular**, não a beta do PERT.
3. Em cada simulação, a trilha de software é `(us01 + us03) ÷ 1,3` e a trilha de hardware é `9 + (us04 + us09) ÷ 1,5`. O total é o máximo das duas.
4. Os totais são ordenados, o percentil é o elemento no índice `pct × N ÷ 100` e a média é a soma dividida por N.
5. `Atividade - Módulo 4.pdf` (Missão #04): levantar O, M e P com o critério do «pessimista técnico», calcular o PERT, rodar o script de Monte Carlo (sem pedir ao LLM para simular), comparar o P85 com o cronograma do módulo 3 e escrever o parágrafo ao stakeholder, sem usar P50 como prazo prometido. `Exemplo - Módulo 4.pdf`: tabela de três pontos com a coluna «Risco P», P50 de 12,5, P85 de 13,1 e P95 de 13,4, gap de 1,1 semana contra as 12 semanas do módulo 3 e recomendação de comprometer 13 semanas.

**Como rodar**
- `node monte-carlo-routewise.js` ou `python3 monte-carlo-routewise.py`, sem instalar nada. No navegador, cole o script no Console (F12).
- Rodei os dois: ambos devolveram P50 12,5, P85 13,1, P95 13,4 e média 12,6, iguais aos do output de referência. Não há semente fixa, então os decimais podem variar de uma execução para outra.
- Para um what-if do fornecedor, altere `HARDWARE_SEMANA` (por exemplo, 13) e rode de novo.

**Armadilhas e achados no código**
- **Verifiquei o efeito da restrição dominante:** em 200 mil simulações com a mesma lógica, a trilha de software nunca foi a mais lenta (0%). A trilha de hardware decide sempre, o que explica o intervalo estreito entre P50 e P95.
- A apostila diz que comprometer 12 semanas equivale a «cerca de P35». No modelo do script, a probabilidade de terminar em até 12 semanas deu cerca de 13% nas minhas 200 mil simulações. O ponto qualitativo vale (12 semanas está bem abaixo do P50), mas o número da apostila não sai do script; provavelmente veio de outra estimativa.
- O curso fala em «distribuição PERT», mas o script sorteia uma triangular; os fatores de paralelismo (1,3 e 1,5) estão embutidos no código e não coincidem com o 1,7 do prompt.
- O JS imprime «10.000» (pt-BR) e o Python imprime «10,000» por causa do formato de milhar; é só formatação.

---

## 🔗 Para ir além
- [Pasta do módulo 4 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-04-estimativas-e-previsoes)
- [Repositório oficial do módulo 07 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos)
- [PERT, Program Evaluation and Review Technique (Wikipedia)](https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique)
- [Planning Fallacy (Wikipedia)](https://en.wikipedia.org/wiki/Planning_fallacy)
- [Relatório 1: DORA, Accelerate State of DevOps 2024](https://dora.dev)

---

⬅️ [06 · Estimativas com três pontos e PERT: sair da data única](./06-estimativas-tres-pontos-e-pert.md)  ·  [Guia de leitura](./README.md)  ·  [08 · AIOps de projeto: métricas de fluxo e o Risk Monitor](./08-aiops-de-projeto-metricas-de-fluxo-e-risk-monitor.md) ➡️
