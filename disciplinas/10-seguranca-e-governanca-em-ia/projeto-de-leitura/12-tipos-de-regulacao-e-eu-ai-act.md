# 12 · Tipos de regulação e o EU AI Act: princípios, regras e classificação por risco

> **Unidade 5 · Aula 13** · Leitura: ~7 min · Bloco: Regulação e geopolítica

## 🎯 Em uma frase
A regulação pode ser por **princípios** (soft law, flexível, abstrata), por **regras** (hard law, objetiva, com penalidades) ou **híbrida**. O **EU AI Act** (aprovado em 2024) é a primeira legislação abrangente de IA e **regula o caso de uso e o impacto, não a tecnologia**, em quatro níveis: inaceitável, alto, limitado e mínimo.

---

## 👵 Explicando para a vovó

Princípio é a placa "dirija com responsabilidade": bonita, vale para qualquer carro e época, mas cada motorista interpreta. Regra é a placa "máximo 60 km/h, multa de tal valor": clara, mas pode envelhecer se o limite mudar. As boas leis juntam as duas.

E a lei europeia olha para o que o carro está fazendo: ir ao mercado é uma coisa, levar produtos perigosos é outra, mesmo sendo o mesmo carro.

---

## 🔧 Tecnicamente

### O que é
- **Por princípios (soft law):** valores (dignidade humana, responsabilidade, transparência, segurança, governança) em nível de abstração maior. Vantagem: sobrevive melhor a mudanças tecnológicas. Desafio: transformar conceito em decisão concreta (que requisito comprova transparência? qual explicabilidade basta? como transformar valor em teste?).
- **Por regras (hard law):** limites, proibições, obrigações, penalidades, prazos, quem cumpre. Mais fácil de converter em requisito (ex.: "guardar logs por X meses"), menos flexível e pode envelhecer rápido se amarrada a uma técnica ou produto.
- **Híbrido:** princípios dão direção; regras operacionalizam; a classificação de risco calibra a intensidade da obrigação.
- **EU AI Act:** aprovado em 2024, referência global (os slides dizem aplicação prática consolidada entre 2025 e 2026, hipótese do material, não verifiquei). Abordagem baseada em risco; unidade de análise é o **caso de uso**: um mesmo modelo pode gerar legenda de imagem, apoiar triagem de saúde, influenciar crédito ou controlar infraestrutura crítica; o impacto muda completamente.
- **Quatro categorias:** **risco inaceitável** (proibido: social scoring governamental, manipulação comportamental subliminar, algumas formas de categorização biométrica; nem toda biometria é automaticamente proibida), **alto risco** (permitido com auditoria, documentação, gestão de risco e supervisão; ex.: infraestrutura crítica, medicina, RH/recrutamento, biometria), **risco limitado** (transparência: chatbot avisa que é IA; deepfake rotulado) e **risco mínimo** (spam, jogos).

### Como funciona
- Impacto prático para desenvolvedores: princípio exige interpretação e diálogo com jurídico, negócio, segurança e governança (como documentar, testar, provar conformidade e medir impacto). Regra gera controle direto: obrigação vira controle, proibição vira restrição de arquitetura, requisito de auditoria vira processo.
- Proporcionalidade: quanto maior o risco potencial, mais fortes as obrigações; obrigações também variam com o **papel** na cadeia (desenvolvedor de modelo, fornecedor, integrador, usuário corporativo) e com o tamanho da empresa. Modelos e sistemas de propósito geral têm tratamento próprio.
- Recursos oficiais citados: site dedicado ao AI Act (capítulos, anexos, definições, exceções, penalidades, código de conduta), o **High-Level Summary** (porta de entrada para as categorias) e o **Compliance Checker** (formulário orientador). Sempre consultar a versão mais recente: prazos e interpretações mudam.
- Transparência como controle: se o usuário acha que fala com uma pessoa mas fala com IA, ou vê conteúdo sintético sem identificação, há assimetria; rotular reduz essa assimetria.
- Outros países: a aula cita a Austrália como exemplo de país estruturando princípios; documentos de princípios indicam a direção mesmo sem lei abrangente. Regulação é escolha política e estratégica; nenhuma lei surge isolada.
- Conselho de carreira da aula: não construa toda a carreira em torno de uma única técnica; o mesmo raciocínio justifica regular por caso de uso (mais durável).

### Onde aplicar
- Classificar as features de IA de um produto por nível de risco do AI Act antes de priorizar controles.
- Traduzir um princípio (ex.: transparência) em requisitos testáveis: logs, rótulos de conteúdo sintético, documentação.
- Mapear o papel da sua empresa na cadeia (provedor, integrador, usuário) para entender obrigações.

### Vantagens e limites
**Vantagens**
- Regular por caso de uso resiste melhor à evolução técnica.
- Níveis de risco evitam aplicar o mesmo peso a spam e a infraestrutura crítica.
- Combinar princípios e regras dá direção e operacionalidade.

**Limites**
- Princípios exigem interpretação e podem gerar insegurança de conformidade.
- Regras específicas envelhecem rápido.
- A lei é extensa; resumo de aula não substitui a leitura da fonte oficial.

### 🚫 Armadilhas
- Dizer que o sistema "usa IA" sem identificar o caso de uso e o nível de risco.
- Generalizar a proibição de biometria (depende do contexto específico).
- Usar um resumo antigo do AI Act sem checar versão e prazos.
- Assumir que as obrigações são iguais para todas as empresas da cadeia.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Soft law | Regulação por princípios, flexível e abstrata |
| Hard law | Regulação por regras, com proibições, obrigações e penalidades |
| Híbrido | Princípios para direção + regras para operacionalização |
| EU AI Act | Lei europeia abrangente de IA, baseada em risco e em caso de uso |
| Inaceitável / Alto / Limitado / Mínimo | Os quatro níveis de risco do AI Act |
| High-Level Summary | Resumo de alto nível do AI Act, boa porta de entrada |
| Compliance Checker | Formulário que orienta a análise inicial de conformidade |
| Propósito geral | Categoria de modelos e sistemas usados em muitos contextos, com obrigações próprias |

---

## 💻 No curso

Aula conceitual, sem código. Os slides da Aula 6 trazem uma tabela comparativa soft law versus hard law (foco, velocidade de adaptação, clareza para o desenvolvedor) e a lista das quatro categorias de risco, e apontam o site artificialintelligenceact.eu como fonte.

---

## 🔗 Para ir além
- [The EU Artificial Intelligence Act (site, indicação 12)](https://artificialintelligenceact.eu/)
- [Lei da UE sobre IA, Parlamento Europeu (indicação 8)](https://www.europarl.europa.eu/topics/pt/article/20230601STO93804/lei-da-ue-sobre-ia-primeira-regulamentacao-de-inteligencia-artificial)
- [Comissão Europeia: quadro regulatório de IA](https://digital-strategy.ec.europa.eu/pt/policies/regulatory-framework-ai)
- [Artificial intelligence policy worldwide: a comparative analysis (indicação 11)](https://royalsocietypublishing.org/rsos/article/13/2/242234/480264/Artificial-intelligence-policy-worldwide-a)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia)

---

⬅️ [11 · Por que regular IA: interesses, dilema de Collingridge e lobby](./11-por-que-regular-collingridge-e-lobby.md)  ·  [13 · Geopolítica da IA, Efeito Bruxelas e o cenário brasileiro](./13-geopolitica-efeito-bruxelas-e-brasil.md) ➡️
