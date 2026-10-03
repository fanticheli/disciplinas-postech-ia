# 17 · Revisão integrada: o que fica para a prática profissional

> **Unidade 8 · Aula 20** · Leitura: ~7 min · Bloco: Revisão integrada

## 🎯 Em uma frase
A revisão final conecta os blocos numa postura: **governança começa na concepção e acompanha todo o ciclo de vida**, a produção exige monitoramento, segurança e custo são decisões de arquitetura, regulação e impacto ambiental entram na engenharia, e o raciocínio crítico (pesquisa, fontes, trade-offs) é a competência central.

---

## 👵 Explicando para a vovó

A disciplina inteira é como aprender a dirigir com responsabilidade: não basta saber acelerar. É preciso olhar o painel, conhecer as regras, saber quanto a viagem custa e quem mora na rua por onde se passa.

O fim da aula repete o mesmo recado: o ser humano continua no centro, e a técnica serve a ele.

---

## 🔧 Tecnicamente

### O que é
- **Governança:** começa na concepção (que dados, quem é afetado, qual risco, restrição regulatória, como monitorar, quem responde); acompanha dados, treino, validação, implantação, produção, monitoramento, manutenção e desativação. A produção costuma ser negligenciada: distribuição dos dados, usuários e contexto mudam, e a responsabilidade não termina quando o endpoint responde.
- **Interpretabilidade e explicabilidade** não são a mesma coisa; explicabilidade tende a ser cada vez mais demandada (segurança, regulação, auditoria, confiança, investigação de falhas). SHAP (contribuição, visão mais ampla) e LIME (local, por aproximação). É parte da responsabilidade, não recurso visual.
- **Vieses:** sociais, sistêmicos e estatísticos, vindos de dados, história, sociedade, escolhas de coleta, rotulagem e formulação do problema; medir impacto de forma segmentada (taxa de erro, grupos prejudicados, representatividade, diferença estatística ou decisão de projeto). **Direitos autorais** também fazem parte da IA responsável: produção humana não é recurso gratuito e dados sintéticos não substituem por completo.
- **Segurança de IA:** prompt injection, envenenamento de modelos e dados, e agência excessiva (privilégio mínimo para agentes). Perguntas: em que estamos trabalhando, o que pode dar errado, como reduzir o risco, como sabemos que os controles funcionaram? Materiais (OWASP, agentes) evoluem: a aula não é ponto final.
- **Regulação:** afeta arquitetura, dados, processos, responsabilidade e produtos; Collingridge, AI Act (quatro níveis), cenário brasileiro (LGPD, regras setoriais, debate de marco de IA), lobby e interesses sem "torcida". **Custos financeiros:** API versus infra própria, tokens, redução (caching, quantização, routing, RAG eficiente, modelos menores, fine-tuning, negociação), previsibilidade e produtividade como valor, não token. **Custos ambientais:** a nuvem não está no céu; treino, inferência e refrigeração se somam; dilema água versus energia; comunidades; energia como desafio geopolítico.

### Como funciona
- **Checklist de postura:** (1) perguntar antes de adotar: o que resolve, quanto custa, que risco cria, quem é afetado; (2) pesquisar fonte original, comparar versões e observar interesses; (3) trabalhar com trade-offs e reconhecer incerteza; (4) ser propositivo: apontar problema e propor controle.
- **Conexões entre blocos:** governança, segurança e responsabilidade se encontram na pergunta "quem responde quando falha?"; custo e infraestrutura também são decisões de governança; o papel que permanece humano mesmo com maior automação é decidir, responder e supervisionar.
- Aprendizado não termina na aula: cada tema (governança, explicabilidade, viés, segurança, regulação, FinOps, sustentabilidade) é um campo próprio; a disciplina dá base e aponta fontes.
- Mensagem final: construir soluções úteis, seguras, economicamente sustentáveis, ambientalmente conscientes e tecnicamente justificáveis, sempre pesquisando, questionando e atualizando o conhecimento. Não ser levado pelo hype de agentes, novos modelos e frameworks.

### Onde aplicar
- Usar a lista de perguntas da concepção como template de design review para qualquer feature de IA.
- Transformar cada checkpoint da revisão em item de checklist de entrega (viés por grupo, controle de acesso do RAG, teto de custo).
- Estudar cada bloco aprofundando na fonte primária indicada (NIST, OWASP, AI Act, mapas de energia).

### Vantagens e limites
**Vantagens**
- Costura os blocos numa narrativa única de responsabilidade.
- Oferece perguntas práticas em vez de decoreba de termos.
- Reforça pesquisa e pensamento crítico como competência contínua.

**Limites**
- É síntese: quem quer o detalhe precisa voltar ao tópico correspondente.
- Não traz material novo; depende do estudo prévio.
- Os slides da revisão listam só os oito tópicos abordados.

### 🚫 Armadilhas
- Estudar só a revisão e pular os casos e exemplos que dão sentido aos conceitos.
- Tratar governança como etapa final.
- Decorar nomes de vulnerabilidades em vez de aprender a fazer as perguntas de segurança.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Governança by design | Desde a concepção; acompanha todo o ciclo de vida |
| Ciclo de vida | Dados, treino, validação, implantação, produção, monitoramento, manutenção, desativação |
| Privilégio mínimo para agentes | Não dar ao agente mais poder do que ele precisa |
| Medição segmentada | Taxa de erro e resultados por grupo, não só global |
| Collingridge | Regular cedo sem informação ou tarde com custo alto de mudança |
| Token maxing | Métrica ruim: produtividade medida por tokens gastos |
| Nuvem física | Toda aplicação digital tem base material: prédios, energia, água, cabos, chips |
| Pessoa no centro | Eixo que conecta governança, segurança, regulação, custo e ambiente |

---

## 💻 No curso

Aula de revisão em formato de síntese, para consolidar e preparar o questionário da disciplina. Os slides "Revisão" listam os oito tópicos: Governança de IA, Interpretabilidade e Explicabilidade, Vieses e Responsabilidade, Aspectos Humanos e Éticos, Segurança e Dados, Aspectos Regulatórios, Custos Financeiros e Custos Ambientais.

---

## 🔗 Para ir além
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/)
- [The EU Artificial Intelligence Act](https://artificialintelligenceact.eu/)
- [MIT AI Risk Repository](https://airisk.mit.edu/)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia)

---

⬅️ [16 · Treinamento, inferência, refrigeração, PUE e o dilema água versus energia](./16-treinamento-inferencia-refrigeracao-pue-agua-ou-energia.md)
