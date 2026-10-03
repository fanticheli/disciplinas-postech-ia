# 15 · Custo ambiental: onde ficam os data centers, cabos, água e matriz energética

> **Unidade 7 · Aula 17** · Leitura: ~7 min · Bloco: Custos financeiros e ambientais

## 🎯 Em uma frase
A "nuvem" é **infraestrutura material** (servidores, data centers, cabos, energia, água) e o impacto **não é distribuído por igual**. A aula parte de dados (mapas) antes de concluir: **localização** define estresse hídrico, **matriz energética**, intensidade de carbono, latência e as comunidades que absorvem o custo.

---

## 👵 Explicando para a vovó

Quando a senhora manda uma mensagem pelo celular, parece mágica. Mas existe um prédio cheio de máquinas ligadas, gastando luz e esfriando com ar ou água, e cabos no fundo do mar levando a mensagem. Alguém mora perto desse prédio.

A mesma máquina faz um estrago diferente dependendo de onde está: numa cidade onde falta água, pesa na torneira; onde a luz vem de carvão, pesa no ar.

---

## 🔧 Tecnicamente

### O que é
- **Nuvem não é abstrata:** AWS, Azure, Google Cloud criaram uma abstração ("cloud") que esconde servidores, energia, refrigeração, rede, prédios e localização. IA amplia uma discussão que já existia com a nuvem, pela intensidade (modelos maiores, mais treino, mais inferência).
- **Mapas apresentados:** Data Center Map (distribuição global: concentração em EUA, Europa e partes da Ásia; Brasil concentrado em São Paulo e Rio), AI Data Center Map (EUA, com estresse hídrico), regiões de Google Cloud, AWS e Azure, Submarine Cable Map e Electricity Maps. Nem todo data center é igual (um universitário não é um hyperscale).
- **Estresse hídrico:** demanda por água compete com oferta (empresas, agricultura, moradores). Data center em região de menor disponibilidade pode disputar água com necessidades locais. A localização deixa de ser decisão só técnica.
- **Regiões de nuvem são lugares físicos:** escolher região é escolher latência, preço, disponibilidade de serviços, conformidade *e impacto ambiental*. Cabos submarinos mostram que a internet é física; distância e rota influenciam desempenho.
- **Matriz energética e intensidade de carbono:** não basta perguntar quanto consome, mas de onde vem a energia. Intensidade de carbono mede, de forma simplificada, o carbono associado à geração de certa quantidade de energia (carvão tende a mais; fontes de baixo carbono, menos). Electricity Maps mostra intensidade, participação de renováveis e fonte dominante.

### Como funciona
- Panorama da matriz (da aula): Brasil com participação elevada de renováveis (Nordeste com eólica; hidrelétrica em várias regiões); EUA com grande variação regional (solar, gás, carvão); Canadá com hidrelétrica, gás e nuclear; Europa variada (países nórdicos com renováveis, França com nuclear, Alemanha com mix de solar, renováveis e fósseis); China com muito carvão e investimento forte em renováveis; partes da África e Oriente Médio com carvão, petróleo e gás.
- Nuances: renovável não é "sem impacto" (hidrelétrica altera ecossistemas, solar e eólica ocupam área); nuclear tem baixa emissão na operação mas não é renovável no mesmo sentido e gera resíduos. Evite reduzir tudo a uma métrica.
- Clima importa: refrigeração é parte importante da operação e o clima altera custo operacional e ambiental (aprofunda na Aula 18).
- Impacto não distribuído igualmente: a aplicação roda no mundo todo, mas a infraestrutura está em comunidades específicas, que convivem com água, energia, território e mudanças locais. O usuário está longe do impacto; "a interface esconde toda a cadeia física".
- Perguntas-guia: onde estão os data centers, qual é a situação da água, de onde vem a energia, qual a intensidade de carbono, como a rede está conectada. Não é demonizar a tecnologia, é conhecer o impacto e reconhecer que adoção é decisão.
- O impacto não pode ser calculado só por número de requisições ou tamanho do modelo.

### Onde aplicar
- Escolher região de nuvem considerando também matriz elétrica e disponibilidade de água, não só preço e latência.
- Pesquisar a matriz da região antes de decidir onde rodar treino ou inferência de alto volume.
- Incluir impacto ambiental em avaliações de arquitetura (reduzir inferência desnecessária, otimizar contexto).

### Vantagens e limites
**Vantagens**
- Método baseado em dados e mapas abertos e gratuitos.
- Liga decisões técnicas cotidianas (região, modelo) a impacto físico.
- Evita discussão ambiental abstrata ou slogan.

**Limites**
- Mapas são retratos de um momento; matriz e data centers mudam.
- Dados regionais exigem interpretação; não há métrica única.
- O assunto é complexo: renovável, nuclear e fóssil têm trade-offs distintos.

### 🚫 Armadilhas
- Dizer "data center nos EUA" sem especificar a região (a matriz varia muito).
- Equiparar renovável a impacto zero.
- Julgar impacto só pelo consumo de energia, sem olhar a origem.
- Esquecer que região de nuvem é um local físico com comunidade ao redor.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Estresse hídrico | Demanda por água competindo com a oferta disponível |
| Matriz energética | Composição das fontes de geração de uma região |
| Intensidade de carbono | Carbono associado à geração de certa quantidade de energia |
| Hyperscale | Data center de escala muito maior que instalações pequenas ou universitárias |
| Electricity Maps | Mapa de intensidade de carbono, fontes e renováveis por região |
| Submarine Cable Map | Mapa dos cabos de fibra óptica submarinos |
| Região de nuvem | Localização física que afeta latência, preço, conformidade e impacto ambiental |

---

## 💻 No curso

Aula de análise de dados: a professora abre os mapas citados e conduz a leitura. O README do repo lista as ferramentas (datacentermap, aidatacentermap, submarinecablemap, electricitymaps) em "Sugestões de ferramentas" e as leituras de custos ambientais, mas não há código. Os slides "Custos Ambientais da IA" trazem os mesmos mapas e a lista de leituras (FGV, WSJ, IEEE, ASHRAE, DW).

---

## 🔗 Para ir além
- [Data Center Map](https://www.datacentermap.com/)
- [AI Data Center Map](https://aidatacentermap.org/map)
- [Submarine Cable Map](https://www.submarinecablemap.com/)
- [Electricity Maps](https://app.electricitymaps.com/)
- [Data centre water consumption (Nature, indicação 14)](https://www.nature.com/articles/s41545-021-00101-w)
- [Global Energy Monitor (citado nos slides)](https://globalenergymonitor.org/#explore)
- [WRI: impactos do crescimento de data centers nos EUA (README do repo)](https://www.wri.org/insights/us-data-center-growth-impacts)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia)

---

⬅️ [14 · Custos financeiros de IA: CAPEX/OPEX, API versus infraestrutura própria e como reduzir](./14-custos-financeiros-capex-opex-e-reducao.md)  ·  [16 · Treinamento, inferência, refrigeração, PUE e o dilema água versus energia](./16-treinamento-inferencia-refrigeracao-pue-agua-ou-energia.md) ➡️
