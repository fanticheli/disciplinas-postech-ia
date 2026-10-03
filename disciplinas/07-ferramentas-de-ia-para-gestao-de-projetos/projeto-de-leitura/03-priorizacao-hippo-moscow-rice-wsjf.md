# 03 · Priorização com dados: HiPPO, MoSCoW, RICE e WSJF

> **Unidade 2 · Aula 1** · Leitura: ~7 min · Bloco: Priorizar, planejar e estimar (Unidades 2 a 4)

## 🎯 Em uma frase
Priorizar não é calcular uma fórmula, é **trocar o HiPPO (opinião do mais bem pago) por critérios compartilhados**. O MoSCoW filtra o backlog, o **RICE** responde «onde o esforço rende mais» e o **WSJF** responde «o que não pode esperar», e a IA ajuda a alimentar os dados.

---

## 👵 Explicando para a vovó

Numa família com um orçamento de férias, cada um defende o passeio que prefere e quem fala mais alto ganha. Vira briga de poder, não de razão. Se alguém põe numa tabela quanto custa, quantas pessoas aproveitam e o que acontece se adiar, a conversa muda: agora se discute os números.

O MoSCoW é a primeira peneira («isso nem vai nessa viagem»). O RICE mostra o melhor custo-benefício. O WSJF lembra que o ingresso do show esgota na sexta, então esse passeio não pode esperar.

---

## 🔧 Tecnicamente

### O que é
- **HiPPO:** a opinião de quem tem maior autoridade prevalece mesmo sem dados. Raramente é má-fé, mas é um dos maiores fatores de desperdício. O relatório da ProductPlan (indicações de leitura) aponta que 67% dos times de produto veem prioridades desalinhadas como a principal fonte de desperdício de esforço.
- **RICE = (Reach × Impact × Confidence) ÷ Effort.** *Reach* é quem é de fato impactado no período (140 motoristas, não a base inteira; uma feature só para gestores de logística conta só esse grupo, mesmo num sistema com milhares de usuários). *Impact* usa escala fixa: 3 massivo, 2 significativo, 1 médio, 0,5 baixo, 0,25 mínimo. *Confidence* reflete a evidência por trás de Reach e Impact: pesquisa com usuários, histórico de uso, métricas operacionais e benchmarks a elevam; só percepção ou experiência pessoal a reduzem (abaixo de 50%, coletar mais dados). *Effort* é o custo total da equipe em pessoa-mês, com dependências, testes e homologação, não a estimativa rápida de uma pessoa.
- **WSJF = Cost of Delay ÷ Job Size.** O custo do atraso soma valor de negócio, criticidade temporal (prazo regulatório, evento externo) e redução de risco ou criação de oportunidade (desbloqueia outras entregas). O foco é o que se perde por adiar: uma integração exigida por nova regulamentação vale pouco boa parte do ano e vira prioridade perto do prazo legal, e é isso que o RICE não enxerga.
- **MoSCoW:** quatro categorias. *Must Have* é o indispensável para o produto cumprir o objetivo principal; *Should Have* é importante, mas o produto continua funcional sem ele agora; *Could Have* é melhoria desejável, que entra conforme a capacidade; *Won't Have* sai da disputa do ciclo atual, o que evita gastar RICE ou WSJF com o que não será feito. Não substitui os outros frameworks: filtra o ruído e encurta a sessão de planejamento.
- **Frameworks complementares:** o RICE responde qual funcionalidade rende mais pelo esforço; o WSJF, quanto custa esperar. Usar os dois e discutir as divergências qualifica a reunião.

### Como funciona
- **Onde a IA entra:** estimar Reach ou Impact costuma ser mais difícil que fazer a conta. O modelo, com histórico, documentos e dados do domínio, sugere estimativas mais consistentes que a intuição pura.
- **Exemplos dos slides:** alerta de velocidade com Reach 140, Impact 2, Confidence 90% e Effort de 1 mês dá RICE 252 (140 × 2 × 0,9 ÷ 1); o relatório de cores da frota, com Reach 5, Impact 0,25, Confidence 80% e 0,75 mês, dá cerca de 1,3 (5 × 0,25 × 0,8 ÷ 0,75). No WSJF, alertas somam 20 (8 + 9 + 3) com Job Size 1, e manutenção preditiva soma 18 (6 + 7 + 5) com Job Size 3, o que dá 6.
- **Quando usar cada um:** RICE quando se quer comparar valor puro, há dados concretos de Reach e a prioridade independe de timing. WSJF quando há prazo regulatório, release fixo ou frota velha com risco crescente. Os slides sugerem calcular os dois e usar o consenso como desempate.
- **Sequência recomendada:** (1) MoSCoW para tirar os Won't Have; (2) RICE nos candidatos, com Reach, Impact e Confidence justificados; (3) WSJF nos mesmos itens; (4) comparar os dois rankings e discutir as divergências; (5) o gestor decide, e o backlog volta a ser revisado quando chegam dados novos, como um artefato vivo.
- **Por que o alerta ganha e a manutenção preditiva perde (apostila):** o alerta de velocidade alcança todos os motoristas, afeta segurança, acidentes e seguro, tem dados históricos que o sustentam e esforço controlado, então o RICE é alto; no WSJF soma valor de negócio e criticidade temporal altos com Job Size pequeno. A manutenção preditiva traz benefício real, mas exige integração com sistemas corporativos e sensores, o que aumenta o Job Size e derruba a prioridade.
- **IA como âncora:** antes da sessão, passar as histórias ao modelo e pedir estimativas com justificativa, apresentadas como âncora e não como verdade. A âncora da IA substitui a âncora do HiPPO. Na dúvida do time, descrever o debate ao modelo costuma exigir uma pergunta mais precisa de cada lado.
- **Efeito de transparência:** saber que os números serão vistos faz quem estima verificar antes de digitar (slide de reflexão final).

### Onde aplicar
- Filtrar o backlog por MoSCoW antes de qualquer cálculo e registrar os Won't Have para reavaliação.
- Calcular RICE e WSJF para os candidatos e, nas divergências, escolher o framework pela pergunta que a reunião precisa responder.
- Levar o número ao stakeholder que pede um item sem evidência, em vez de discutir opinião.

### Vantagens e limites
**Vantagens**
- Argumento quantitativo e rastreável para defender a ordem do backlog.
- Combinar RICE e WSJF cobre retorno e urgência.
- MoSCoW reduz o tempo de planejamento ao tirar itens sem chance de entrar.

**Limites**
- Impact e Reach têm parte subjetiva, e erro no Reach contamina o RICE inteiro porque ele fica no numerador.
- Rankings podem divergir entre RICE e WSJF, o que exige conversa, não só cálculo.
- A fórmula dá aparência de precisão a estimativas que podem ser hipóteses.

### 🚫 Armadilhas
- Achar que o número resolve a decisão: a apostila reforça que o gestor continua decidindo.
- Usar o Reach como «base total de usuários» em vez de quem é de fato afetado.
- Pontuar com RICE itens que já são claramente Won't Have.
- Comparar o número do RICE com o do WSJF: as escalas são diferentes (o mesmo alerta de velocidade dá 252 no RICE e 20 no WSJF). Compare a posição nos dois rankings, não os valores.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| HiPPO | Highest Paid Person's Opinion: decisão por hierarquia, não por dado |
| RICE | (Reach × Impact × Confidence) ÷ Effort |
| WSJF | Cost of Delay ÷ Job Size (Weighted Shortest Job First) |
| Cost of Delay | Valor de negócio + criticidade temporal + redução de risco ou oportunidade |
| MoSCoW | Must (indispensável), Should (importante, mas dá para seguir sem), Could (desejável), Won't Have (fora do ciclo): filtro prévio do backlog |
| Confidence | Grau de evidência por trás das estimativas de Reach e Impact |

---

## 💻 No curso

Este tópico não tem projeto próprio no repositório; o conteúdo vem da apostila, dos slides e da atividade do módulo.

- Os slides 2.1 trazem os exemplos numéricos (RICE de 252 contra 1,3 e WSJF de 20 contra 6), a tabela «quando usar RICE e quando usar WSJF» e a ideia de usar o modelo como âncora de calibração em vez de como juiz.
- A Missão Prática #02 (slides e PDF) pede um OKR específico (por exemplo, «reduzir o onboarding de 5 para 2 minutos no Q3»), uma primeira rodada com 5 ou mais histórias, calibração do item do topo com um dado real e um plano de resolução por flag. O código dessa etapa está no [tópico seguinte](./04-backlog-scorer-contexto-flags-e-calibracao.md).

---

## 🔗 Para ir além
- [Pasta do módulo 2 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-02-priorizacao-de-backlog)
- [Repositório oficial do módulo 07 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos)
- [RICE Prioritization Framework (Intercom)](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/)
- [WSJF, Weighted Shortest Job First (SAFe)](https://framework.scaledagile.com/wsjf)
- [MoSCoW Prioritisation (Agile Business Consortium)](https://www.agilebusiness.org/dsdm-project-framework/moscow-prioritisation.html)
- [Relatório 8: ProductPlan, State of Product Management 2024](https://productplan.com/ebooks/2024-state-of-product-management-annual-report)
- [Indicação 12: The Scrum Guide (Schwaber e Sutherland)](https://scrumguides.org)

---

⬅️ [02 · Curadoria de requisitos: as quatro alucinações e o backlog no Jira](./02-curadoria-de-requisitos-e-backlog-no-jira.md)  ·  [Guia de leitura](./README.md)  ·  [04 · Backlog Scorer: contexto rico, flags e calibração com dados reais](./04-backlog-scorer-contexto-flags-e-calibracao.md) ➡️
