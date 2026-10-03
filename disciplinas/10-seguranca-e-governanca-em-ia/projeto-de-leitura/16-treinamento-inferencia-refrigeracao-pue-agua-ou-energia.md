# 16 · Treinamento, inferência, refrigeração, PUE e o dilema água versus energia

> **Unidade 7 · Aulas 18 e 19** · Leitura: ~9 min · Bloco: Custos financeiros e ambientais

## 🎯 Em uma frase
O custo físico se divide em **treinamento** (concentrado), **inferência** (contínua e pode superar o treino na vida do modelo) e **refrigeração**. O **PUE** mede energia total / energia de TI (1,0 é o ideal). Resfriar exige **gastar água ou energia**: ar, evaporativo, ar natural e circuito fechado, cada um deslocando custo; também há ruído, resíduos, emprego e comunidades.

---

## 👵 Explicando para a vovó

Treinar o modelo é como construir a fábrica: um esforço enorme, mas que acaba. Responder perguntas é a fábrica funcionando todos os dias, a qualquer hora. A fábrica esquenta, e esfriar custa: ou ar-condicionado (gasta luz) ou água que evapora (gasta água).

Num lugar frio dá para abrir a janela. Num lugar quente, não. E quem mora ao lado ouve o barulho dos ventiladores o ano todo.

---

## 🔧 Tecnicamente

### O que é
- **Treinamento:** evento concentrado (dias, semanas, meses), com GPUs perto da carga máxima; depende de tamanho do modelo, dados, arquitetura e número de GPUs. A pegada de carbono depende da matriz energética do local. Slide: treinar um grande modelo pode emitir centenas de toneladas de CO2, e há custo extrativo de minérios críticos (lítio, cobre, terras raras).
- **Inferência:** uso diário e contínuo, a cada prompt, chamada de API ou requisição de pipeline; milhões ou bilhões de interações, incluindo agentes e integrações automáticas. Ao longo da vida do modelo, a inferência pode superar o treinamento; exige infraestrutura 24x7. Responsabilidade individual (prompts menores) existe, mas não substitui a estrutural (eficiência do data center, matriz, refrigeração, hardware).
- **Refrigeração:** servidores e GPUs geram calor; parte relevante da energia mantém os equipamentos em temperatura segura. Água pode ser usada em sistemas evaporativos; GPUs mais potentes pressionam a refrigeração e impulsionam tecnologias líquidas. Ciclo preocupante: regiões quentes exigem mais refrigeração, que consome mais energia, que se tiver alto carbono agrava o clima.
- **PUE (Power Usage Effectiveness):** energia total do data center dividida pela energia dos equipamentos de TI. PUE 1,0 é o ideal teórico (tudo vai para TI); PUE 1,4 significa 0,4 de energia adicional em refrigeração, iluminação e demais sistemas. Quanto menor, melhor. A apostila e o slide citam o artigo da Nature sobre consumo de água em data centers como fonte.
- **Limites do PUE:** não informa a origem da energia, não mede água, impacto territorial nem resíduos; dois data centers com PUE parecido podem ter pegadas de carbono muito diferentes (um em renováveis, outro em carvão). Use PUE (quanto se desperdiça fora do processamento) junto com a matriz (qual a origem).

### Como funciona
- **Resfriamento a ar:** ventiladores e ar-condicionado; consumo de água operacional baixo ou próximo de zero; custa eletricidade (pior em climas quentes); se a energia é fóssil, a pegada sobe; pode pressionar a rede elétrica regional.
- **Resfriamento evaporativo:** a água evapora e absorve calor (efeito do suor); mais eficiente eletricamente (PUE baixo) mas consome grandes volumes de água, parte perdida para a atmosfera; delicado em regiões áridas e de escassez hídrica.
- **Ar natural / free cooling (países frios, ex.: Islândia):** usa o ar externo, reduz compressores, PUE muito baixo e água próxima de zero; depende de clima e localização; custos de construção, redes de energia e telecomunicações, latência para quem está longe e lixo eletrônico.
- **Circuito fechado:** líquido refrigerante circula sobre os chips ou os componentes ficam em fluido dielétrico; alta eficiência térmica, água muito baixa; CAPEX maior, infraestrutura especializada e impactos de fabricação, manutenção e descarte de fluidos e equipamentos.
- **Não existe método perfeito:** cada solução desloca custos entre energia, água, infraestrutura, latência, investimento e resíduos. "O barato volta a entrar": a alternativa mais barata pode transferir custo para outros lugares (mais água, mais energia, comunidades). Eficiência técnica (PUE baixo) precisa ser lida junto com o impacto local.
- **Outras questões:** poluição sonora (exaustores, compressores, torres 24/7; ruído contínuo e de baixa frequência afeta sono, estresse e, pelos slides, hipertensão; fauna também), e o debate de empregos: a construção gera muitos empregos temporários e a operação exige equipes menores (a aula cita o estudo da FGV sobre empregos e um artigo do WSJ de contraponto; "ler além da manchete": quantos são temporários, quantos permanecem, que tipo de trabalho).
- **Brasil:** atrai interesse por energia, renováveis, recursos hídricos, território e minerais, mas não é homogêneo (áreas secas, ecossistemas sensíveis, comunidades vulneráveis). Perguntar onde, qual método de refrigeração, de onde vem a energia, quanta água, impacto na rede e que mitigação. Estratégia: ser só fornecedor de infraestrutura ou usar as vantagens para conhecimento, pesquisa, patentes e tecnologia própria?

### Onde aplicar
- Pedir ao provedor PUE, matriz e consumo de água da região ao comparar opções de hospedagem.
- Questionar propostas de data center local: método de refrigeração, origem da energia, água, ruído e empregos permanentes.
- Reduzir inferência desnecessária (cache, routing, contexto enxuto), que atende ao custo financeiro e ao ambiental.

### Vantagens e limites
**Vantagens**
- O modelo de três custos (treino, inferência, refrigeração) simplifica a conversa.
- PUE dá uma métrica comparável de eficiência de infraestrutura.
- O quadro de trade-offs ensina a perguntar quem recebe o benefício e quem paga o custo.

**Limites**
- PUE sozinho esconde matriz, água e impacto territorial.
- Sem método de refrigeração perfeito, a decisão é sempre contextual.
- Parte dos dados (centenas de toneladas de CO2, hipertensão) vem de slides em resumo; confira as fontes.

### 🚫 Armadilhas
- Achar que o maior impacto é só o treinamento.
- Confiar em PUE baixo como prova de sustentabilidade.
- Escolher a alternativa mais barata sem olhar o custo transferido a água, energia e comunidade.
- Aceitar a manchete de milhares de empregos sem separar temporários de permanentes.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Treinamento | Evento concentrado de alto consumo; carbono depende da matriz do local |
| Inferência | Uso contínuo; pode superar o treinamento ao longo da vida do modelo |
| PUE | Energia total do data center / energia dos equipamentos de TI |
| PUE 1,4 | 0,4 de energia adicional para cada 1,0 de TI (refrigeração e demais sistemas) |
| Resfriamento evaporativo | Usa água evaporada; menos energia, mais água |
| Free cooling | Ar externo frio; depende de clima e traz custos de rede e infraestrutura |
| Circuito fechado / dielétrico | Líquido circulando ou imersão; pouca água, CAPEX maior, descarte de fluidos |
| Poluição sonora | Ruído contínuo de ventiladores e compressores; afeta sono e fauna |

---

## 💻 No curso

Duas aulas conceituais, sem código. A figura do PUE 1,4 é didática: a própria apostila avisa que o valor adicional de 0,4 é a diferença implícita entre PUE 1,4 e a referência de energia de TI igual a 1,0. Os slides "Custos Ambientais da IA" têm um slide por método de resfriamento (como funciona, vantagem, custo ambiental).

---

## 🔗 Para ir além
- [Data centre water consumption (Nature)](https://www.nature.com/articles/s41545-021-00101-w)
- [ASHRAE: energy and thermal efficiency (README do repo)](https://www.ashrae.org/technical-resources/ai-data-center-framework/energy-and-thermal-efficiency)
- [IEEE TechNav: Power Usage Effectiveness (README do repo)](https://technav.ieee.org/topic/power-usage-effectiveness/)
- [DW: pushback on data centers (README do repo)](https://www.dw.com/en/pushback-on-data-centers-artificial-intelligence-water-drought-environmental-problems/a-78064418)
- [FGV: data centers com IA geram mais de 12 mil empregos (README do repo)](https://portal.fgv.br/noticias/estudo-da-fgv-aponta-que-data-centers-com-ia-geram-mais-de-12-mil-empregos-e-mobilizam-25-bilhoes)
- [The water use of data center workloads (ScienceDirect, README do repo)](https://www.sciencedirect.com/science/article/abs/pii/S0921344925001892?via%3Dihub)
- [Electricity Maps](https://app.electricitymaps.com/)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia)

---

⬅️ [15 · Custo ambiental: onde ficam os data centers, cabos, água e matriz energética](./15-custo-ambiental-data-centers-e-energia.md)  ·  [17 · Revisão integrada: o que fica para a prática profissional](./17-revisao-integrada.md) ➡️
