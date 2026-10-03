# 13 · Geopolítica da IA, Efeito Bruxelas e o cenário brasileiro

> **Unidade 5 · Aula 14** · Leitura: ~8 min · Bloco: Regulação e geopolítica

## 🎯 Em uma frase
IA é tecnologia estratégica ligada a **soberania**, energia, chips e dados. Três polos: **EUA** (mercado e velocidade), **China** (controle estatal e soberania), **UE** (direitos fundamentais e risco). O **Efeito Bruxelas** explica como a regra europeia vira padrão global por lógica de mercado; no Brasil, o **PL 2338/2023** e as leis já vigentes (LGPD, TSE, ECA Digital) moldam o projeto.

---

## 👵 Explicando para a vovó

Três grandes países montam o tabuleiro de um jogo. Um aposta na velocidade das empresas, outro no controle do governo, o terceiro nas regras para proteger as pessoas. O dono de uma loja global não quer fabricar um produto diferente para cada país; então adota a regra mais exigente em todo lugar. É assim que a regra de um mercado grande vira regra do mundo.

O Brasil não precisa só assistir: pode proteger seus interesses, e quem programa já precisa cumprir leis que existem.

---

## 🔧 Tecnicamente

### O que é
- **Geopolítica:** relação entre território, história e decisões políticas para interpretar fenômenos globais (guerras, migrações, acordos, disputas econômicas, controle de recursos, tecnologia). Tecnologia sempre foi instrumento de poder (ex.: Guerra Fria). Não existe país "do bem" ou "do mal": existem interesses e estratégias.
- **Três visões:** **EUA**, orientados a mercado, capital de risco e velocidade (mas com restrições de acesso por segurança nacional); **China**, soberania, controle estatal, planejamento de longo prazo e formação de mão de obra técnica; **UE**, direitos fundamentais, mitigação de risco, transparência e responsabilidade, pioneira num marco abrangente baseado em risco.
- **Efeito Bruxelas** (Anu Bradford, Columbia Law School): a UE influencia práticas fora dela sem imposição direta, por tamanho de mercado e custo de adaptação. Manter duas arquiteturas (uma transparente para a Europa, outra opaca para o resto) é economicamente proibitivo, então as empresas adotam o padrão mais alto globalmente. Quem chega primeiro define o padrão, e o AI Act virou modelo inclusive para o Brasil.
- **Soberania tecnológica:** de onde vêm os modelos, onde os dados são processados, quais fornecedores controlam a infraestrutura, quem fabrica componentes críticos e quem define regras de acesso. IA depende de recursos físicos (energia, chips, data centers, redes, refrigeração).
- **Brasil:** posição intermediária. A professora defende uma postura ativa e evitar a visão de que o país "não desenvolve nada" (há pesquisa, open source, iniciativas em português).

### Como funciona
- **PL 2338/2023** (Senado), ainda em debate, com quatro eixos: centralidade na pessoa humana, classificação de riscos (inspirada no modelo europeu), direitos das pessoas afetadas (informação, explicação, contestação, proteção) e direitos autorais e treinamento de modelos. Textos mudam durante o processo legislativo: consulte a fonte e as emendas.
- **Leis que já existem (slides):** **LGPD** (Lei 13.709/2018), com direito de revisão humana de decisões exclusivamente automatizadas e transparência no tratamento de dados; **resoluções do TSE** para eleições (identificar conteúdo sintético, limitar robôs); **ECA Digital** (Lei 15.211/2025): proíbe perfilamento algorítmico e direcionamento de anúncios para menores, prazo de 24 horas para remoção automatizada de conteúdo nocivo e responsabiliza plataformas por danos de recomendação. Os detalhes de ECA Digital e TSE vêm dos slides; a apostila só cita os temas.
- **O que fazer como engenheiro:** cumprir o que já existe (privacidade, segurança, normas setoriais), adotar explicabilidade quando o risco justificar (SHAP, LIME, Integrated Gradients), avaliar viés (métricas entre grupos, datasets, sub-representação, diferença de erro), rastrear a origem dos dados (autorização, direitos autorais, dados pessoais, transformações) e aplicar privacidade desde o projeto (dados necessários, onde ficam, quem acessa, por quanto tempo).
- Empresas internacionais: quem mora no Brasil e trabalha para empresa europeia pode ter requisitos europeus no projeto. Observe o que acontece depois que a regra entra em vigor (funcionou, gerou custo, protegeu, criou barreiras?).
- Decisões geopolíticas chegam ao código: um modelo pode deixar de estar disponível, uma API pode sofrer restrição, uma regra pode exigir armazenamento local, um fornecedor pode ser proibido.
- Slides: os slides citam "Linha Dupla" e "Padrão Único" como as duas opções das Big Techs; o "vácuo regulatório" faz a UE virar modelo de cópia (como o PL 2338 no Brasil).

### Onde aplicar
- Checar LGPD e direito de revisão humana em qualquer decisão automatizada sobre pessoas.
- Antever restrições regulatórias e de fornecedor na arquitetura (residência de dados, plano B de provedor).
- Manter rastreabilidade de dados de treino para conformidade e discussões de direitos autorais.

### Vantagens e limites
**Vantagens**
- Dá contexto para entender por que a regra europeia influencia o mundo todo.
- Conecta regulação a práticas técnicas concretas (explicabilidade, viés, linhagem).
- Alerta que não é preciso esperar uma lei específica de IA para agir.

**Limites**
- Cenário muda rápido: PL, resoluções e prazos precisam de checagem em fonte oficial.
- A discussão tem componente político e interesses de todos os lados.
- Parte do conteúdo (ECA Digital, resoluções do TSE) está só nos slides, em resumo.

### 🚫 Armadilhas
- Discutir um projeto de lei com base em resumo antigo ou post em rede social.
- Ver geopolítica como assunto distante do código.
- Tratar o Efeito Bruxelas como imposição direta da UE aos outros países.
- Simplificar: país "vilão" e país "mocinho".

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Efeito Bruxelas | Regras da UE viram padrão global pelo tamanho do mercado e custo de adaptação |
| Soberania tecnológica | Entender e reduzir dependências de modelos, dados, fornecedores e componentes |
| PL 2338/2023 | Projeto de lei brasileiro de IA: pessoa humana, risco, direitos dos afetados, direitos autorais |
| LGPD | Lei 13.709/2018; revisão humana e transparência no tratamento de dados |
| ECA Digital | Lei 15.211/2025; proteção de menores no ambiente digital |
| Linhagem de dados | Rastreabilidade de origem e transformação dos dados |
| Privacidade desde o projeto | Perguntar desde o início que dados, onde, quem acessa e por quanto tempo |

---

## 💻 No curso

Aula conceitual, sem código. Os slides da Aula 6 ("Panorama Global e o Cenário Brasileiro") reúnem o tabuleiro geopolítico, o Efeito Bruxelas e a lista de leis brasileiras vigentes, e fecham com "IA Responsável na Prática de Engenharia": XAI com SHAP e LIME, detecção de viés com fairness metrics e linhagem de dados.

---

## 🔗 Para ir além
- [PL 2338/2023 no Senado](https://www25.senado.leg.br/web/atividade/materias/-/materia/157233)
- [Brussels Effect (Anu Bradford, SSRN)](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2770634)
- [Comissão Europeia: quadro regulatório de IA](https://digital-strategy.ec.europa.eu/pt/policies/regulatory-framework-ai)
- [Artificial intelligence policy worldwide: a comparative analysis (indicação 11)](https://royalsocietypublishing.org/rsos/article/13/2/242234/480264/Artificial-intelligence-policy-worldwide-a)
- [Geopolítica (CNN Brasil, citada nos slides)](https://www.cnnbrasil.com.br/politica/geopolitica/)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia)

---

⬅️ [12 · Tipos de regulação e o EU AI Act: princípios, regras e classificação por risco](./12-tipos-de-regulacao-e-eu-ai-act.md)  ·  [14 · Custos financeiros de IA: CAPEX/OPEX, API versus infraestrutura própria e como reduzir](./14-custos-financeiros-capex-opex-e-reducao.md) ➡️
