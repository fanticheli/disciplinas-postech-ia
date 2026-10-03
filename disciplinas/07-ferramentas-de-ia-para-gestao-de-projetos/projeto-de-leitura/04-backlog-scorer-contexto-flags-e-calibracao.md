# 04 · Backlog Scorer: contexto rico, flags e calibração com dados reais

> **Unidade 2 · Aulas 2 e 3** · Leitura: ~8 min · Bloco: Priorizar, planejar e estimar (Unidades 2 a 4)

## 🎯 Em uma frase
O **Backlog Scorer** calcula RICE e WSJF ancorado no OKR e nas restrições do projeto. O ranking importa menos que os **flags** (dependências, hardware, metas sem dados), e a **calibração** com analytics, pesquisa e dados financeiros, ou por analogia, mostra o quanto cada número é medição e o quanto é hipótese.

---

## 👵 Explicando para a vovó

Um corretor avalia dois imóveis. Se você só diz «preço» e «quantos quartos», ele dá um chute com cara de conta. Se conta que o filho muda de escola em março, que há obra na rua e que o orçamento é apertado, a avaliação muda, e ele ainda avisa «esta parte é palpite, falta a certidão».

O Scorer é esse corretor: com contexto ele dá notas coerentes, e os flags são os avisos de «falta certidão». A calibração é ir buscar a certidão (dado real), ou, sem ela, dizer claramente que a nota é por comparação com um imóvel parecido.

---

## 🔧 Tecnicamente

### O que é
- **Contexto como âncora:** no estudo de caso, o modelo recebe histórias completas com critérios de aceite, o OKR do Carlos (reduzir sinistros por excesso de velocidade de 7 para 5 até setembro de 2026, cerca de 28%) e restrições operacionais, como o lead time de 60 dias dos sensores IoT.
- **Funil de priorização:** o MoSCoW vem antes. O relatório visual pedido informalmente pelo diretor é classificado como Won't Have no ciclo e fica fora da pontuação.
- **Resultado do estudo de caso (frameworks no [tópico anterior](./03-priorizacao-hippo-moscow-rice-wsjf.md)):** alertas de velocidade no topo (alcança todos os motoristas, ataca o OKR principal, só software). O score de comportamento vem depois (depende parcialmente da telemetria dos alertas). Manutenção preditiva, abertura de baú e carga refrigerada dependem de sensores. Carga refrigerada sobe no WSJF por causa do prazo regulatório, apesar do RICE baixo.
- **Flags:** riscos a tratar antes de o item ser considerado pronto. Entre eles, dependência de hardware (comprar já, adiar a alocação), meta de 80% de acurácia sem dados históricos (coletar dados primeiro) e o dashboard sem evidência de contribuição ao OKR (nova sessão de discovery). Cada flag vira um card técnico curto que responde só «o bloqueador foi resolvido?».
- **Três fontes de calibração:** analytics de uso (Google Analytics, Mixpanel, Amplitude), pesquisas com usuários (NPS, entrevistas) e dados financeiros (custo de suporte, receita incremental, multas).
- **Conflito entre fontes é sinal:** uso baixo com importância alta na pesquisa pode ser problema de UX ou visibilidade. O modelo registra a divergência no Confidence e gera flag.
- **Cold start:** sem dados internos, usa-se benchmark de domínio, analogia e tickets do sistema legado, com Confidence menor e honesto.

### Como funciona
- **Configuração:** temperatura baixa (o repositório usa 0,3 na primeira rodada e 0,2 na calibrada) porque a análise precisa ser consistente e auditável entre execuções.
- **Pré-processar os dados:** passar 3 ou 4 métricas por funcionalidade (acessos mensais, usuários únicos, taxa de conclusão), não planilhas inteiras, para não gastar contexto à toa. Em produto maduro, usar janela de cerca de 90 dias.
- **Intenção versus adoção:** se 67% dizem que usariam e funcionalidades parecidas têm adoção de cerca de 30%, esse dado deve acompanhar o prompt para o modelo equilibrar o declarado e o observado.
- **Analogia:** descrever o contexto com precisão (transportadora de cargas gerais, 140 veículos, Sul e Sudeste) e registrar a origem do benchmark. Na demo, o RICE de alertas passou de 420 para 3.091 quando o Reach deixou de ser «140 veículos» e virou 1.288 acessos por mês estimados por analogia, e o Confidence caiu de 100% para 80%, o que o curso trata como sinal de maturidade.
- **Curadoria do ranking:** o Reach vem de dados reais? Há dependências que o modelo não capturou? Itens com Confidence alto têm evidência sólida ou só estavam bem descritos? Todos os flags foram revisados pelo time técnico?
- **RICE e WSJF divergem:** a carga refrigerada ilustra. Para reunião sobre retorno e capacidade, o RICE dá mais argumento; para risco regulatório, o WSJF.

### Onde aplicar
- Rodar o Scorer em duas rodadas: sem calibração e com dados reais, comparando o que mudou e por quê.
- Transformar cada flag em item de investigação com prazo curto (spike, pesquisa, confirmação de SLA ou conversa com infra).
- Documentar a origem de cada número (dado interno ou analogia) para o stakeholder saber o que é medição.

### Vantagens e limites
**Vantagens**
- Ranking defensável e auditável, com justificativa explícita de Impact e Confidence.
- Flags antecipam bloqueios que só apareceriam no meio da sprint.
- A segunda rodada deixa visível o efeito do dado real sobre o ranking.

**Limites**
- O modelo não conhece sua velocidade histórica nem dependências com outros times.
- Contexto rico infla o Confidence: itens bem descritos não são, por isso, bem entendidos.
- Reach inventado ou impreciso distorce o RICE por estar no numerador.

### 🚫 Armadilhas
- Apresentar estimativa por analogia com a mesma certeza de dado interno.
- Descartar flags em vez de trabalhá-los: a atividade chama um flag não resolvido de «blocker disfarçado de feature».
- Anexar tabelas gigantes de analytics ao prompt em vez de métricas pré-processadas.

> 💡 **Dica:** O valor do Scorer não é a ordem: é a lista de flags, que você teria descoberto só durante a sprint.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Backlog Scorer | Prompt que calcula RICE e WSJF ancorado em OKR e restrições |
| Flag | Alerta de item com baixa confiança, dependência ou esforço subestimado |
| Cold start | Produto novo sem histórico de uso para estimar Reach |
| Calibração | Substituir estimativas genéricas por dados reais ou analogias declaradas |
| Janela de 90 dias | Recorte recomendado de dados de uso em produto maduro |
| Won't Have | Fora do ciclo atual; não entra na pontuação |

---

## 💻 No código do repo

**Projeto:** [modulo-02-priorizacao-de-backlog](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-02-priorizacao-de-backlog)

Template de prompt (não é um system prompt fixo), o backlog de 6 histórias do RouteWise como input e dois outputs de referência: a primeira rodada, sem calibração, e a segunda, com calibração por analogia e dados financeiros.

**Fluxo**
1. `backlog-scorer-prompt.md`: o template pede RICE (Impact 3, 2, 1, 0,5, 0,25; Confidence 100%, 80%, 50% ou menos), WSJF (Business Value, Time Criticality e Risk Reduction de 1 a 10, Job Size de 1 a 10, Cost of Delay = soma dos três) e uma saída em cinco blocos: tabela RICE, tabela WSJF, ranking combinado (desempate pelo Cost of Delay), justificativas de Impact e Confidence e flags. Traz também a variante para System Instructions e uma seção com o prompt degradado («priorize este backlog») para comparação.
2. `backlog-routewise-input.md`: contexto (Conecta Cargas, 140 veículos, OKR 7 para 5, lead time de 60 dias dos sensores, 6 devs, sprint de 2 semanas, cerca de 35 SP) e as histórias US01, US02, US03, US04 (sensor de abertura de baú), US05 (Dashboard Base, marcado como HiPPO) e US09 (temperatura da carga), todas com critérios de aceite.
3. `output-exemplo-scorer-m22.md`: seis itens; US01 tem RICE 420 e WSJF 8,0 e o Dashboard HiPPO tem RICE 0,5. Há flags de hardware (US02, US04, US09), de viabilidade da meta de 80% de acurácia (US02), de bloqueio parcial (US03) e de baixa confiança (US05). A nota do arquivo explica que na gravação ao vivo o US05 sai antes via MoSCoW, e por isso o ranking ao vivo tem 5 itens.
4. `output-exemplo-scorer-m23.md`: mesma entrada com dados de calibração. US01 passa a RICE 3.091,2 e WSJF 13,0. Termina com um comparativo entre as duas rodadas: Reach de 140 para 1.288 por analogia, Confidence de 50% para 80% por benchmark e requisito regulatório, e o score de comportamento caindo de segundo para quinto por revisão de Impact.
5. `Atividade - Módulo 2.pdf` (Missão #02): definir um OKR específico, rodar o Scorer com 5 ou mais histórias, calibrar o item do topo com um dado real, comparar as duas rodadas e escrever um plano de resolução por flag. `Exemplo - Módulo 2.pdf`: usa só 3 histórias com IDs próprios (US02 é o Score e US03 a Escalação, diferente do resto do repositório); com um dado interno (5 dos 7 sinistros do último ano tiveram excesso de velocidade, custo médio de R$ 28.000), o Confidence do US01 sobe de 70% para 90% e o RICE de 196 para 252.

**Como rodar**
- No AI Studio: cole o contexto do `backlog-routewise-input.md`, depois as histórias, com temperatura 0,3, e salve o output. Para a segunda rodada, acrescente dados de calibração ao contexto e rode de novo.
- Confira as contas dos outputs. Eu refiz todas: as tabelas WSJF e o RICE da segunda rodada conferem (por exemplo, 1.288 × 3 × 0,8 ÷ 1,0 = 3.091,2), assim como a primeira rodada, **com uma exceção** (ver armadilhas).

**Armadilhas e achados no código**
- O input manda usar os dados do «Guia-de-Producao-Módulo-2.3.md», que não existe na pasta. Os dados de calibração (benchmark «McKinsey Fleet 2022», multa de R$ 15.000 por infração ANTT, frota similar de 200 veículos) aparecem só no output, então não consegui verificar a origem deles.
- **Erro de conta no output M22:** o US02 aparece com RICE 23,3, mas 140 × 2 × 0,5 ÷ 3,0 = 46,7 (23,3 equivaleria a Reach 70 ou Effort 6). Com o valor certo o US02 passaria o US04 (35,0) na ordem por RICE. O comparativo do M23 (23,3 para 126,9) herda o número errado.
- O input manda salvar o resultado em `output-exemplo-m22.md`; o arquivo real chama-se `output-exemplo-scorer-m22.md`.
- O US05 é descrito de três formas: «Relatório Visual de Status da Frota» (slides e output M22), «relatório de cores» (apostila) e «Dashboard Base com mapa ao vivo» (input e M6). O M6 esclarece que o US05 *não* é o relatório de cores e que o dashboard ficou fora do MVP porque não atacava o OKR, não por falta de valor.
- Entre as duas rodadas o Job Size de US01 vai de 3 para 2 e o Impact de US03 de 2 para 1. Parte disso vem dos dados de calibração e parte pode ser variação do modelo; o repositório não separa as duas causas.

---

## 🔗 Para ir além
- [Pasta do módulo 2 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-02-priorizacao-de-backlog)
- [Repositório oficial do módulo 07 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos)
- [RICE Prioritization Framework (Intercom)](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/)
- [WSJF, Weighted Shortest Job First (SAFe)](https://framework.scaledagile.com/wsjf)
- [MoSCoW Prioritisation (Agile Business Consortium)](https://www.agilebusiness.org/dsdm-project-framework/moscow-prioritisation.html)
- [Relatório 8: ProductPlan, State of Product Management 2024](https://productplan.com/ebooks/2024-state-of-product-management-annual-report)
- [Google AI Studio](https://aistudio.google.com/)

---

⬅️ [03 · Priorização com dados: HiPPO, MoSCoW, RICE e WSJF](./03-priorizacao-hippo-moscow-rice-wsjf.md)  ·  [Guia de leitura](./README.md)  ·  [05 · Cronograma adaptativo: dependências, capacidade real e what-if](./05-cronograma-adaptativo-dependencias-capacidade-what-if.md) ➡️
