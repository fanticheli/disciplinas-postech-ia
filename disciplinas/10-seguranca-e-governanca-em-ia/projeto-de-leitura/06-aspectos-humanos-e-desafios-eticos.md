# 06 · Aspectos humanos e desafios éticos: do caso da inadimplência ao NIST

> **Unidade 3 · Aulas 7 e 8** · Leitura: ~8 min · Bloco: Vieses, responsabilidade e ética

## 🎯 Em uma frase
Um modelo preditivo de **sinistralidade e inadimplência** que usa renda e CEP tem ótimo desempenho e discrimina; a resposta da professora é **não aprovar, mas propor alternativas**. A aula amplia para dignidade, autonomia, privacidade, trabalho, bem-estar psicológico e deepfakes, e apresenta o **NIST AI RMF (Govern, Map, Measure, Manage)** e a classificação de risco do AI Act.

---

## 👵 Explicando para a vovó

Imagine o gerente de um banco que descobre que o CEP do cliente prevê bem quem atrasa a conta. Usar o CEP melhora o número, mas na prática quem mora na periferia nunca consegue crédito. O número ficou bonito e a vida de muita gente ficou pior.

O bom profissional não diz só "isso está errado": mostra por que o número engana e propõe outro caminho, como olhar o histórico de pagamento.

---

## 🔧 Tecnicamente

### O que é
- **O caso (Aula 7):** modelo para uma mesa de subscrição (plano de saúde, empréstimo, seguro) que prevê quem tem maior risco de prejuízo ou inadimplência. Renda familiar e CEP são ótimos preditores; na operação, levam à reprovação automática de pessoas de baixa renda e moradores de áreas periféricas. A pergunta passa de "tem boa performance?" para "eu aprovo esse modelo?".
- **Resposta (Aula 8): não.** Acurácia alta significa que o modelo achou um padrão nos dados, não que o padrão representa a realidade. CEP provavelmente é proxy de renda, acesso a serviços ou desigualdade regional. Também pode haver **viés de disponibilidade** (poucas variáveis, sinal forte por falta de melhores) e **overfitting** com base pequena.
- **Postura profissional:** não basta dizer "não dá"; propor outro caminho (novas variáveis como histórico de pagamento, comportamento financeiro, relação renda e compromisso, atrasos recentes; melhorar a massa de dados; rever a definição do problema). Ética também é competência: explicar tecnicamente (overfitting, viés de amostragem, proxy, impacto jurídico) por que a decisão merece revisão.
- **Riscos humanos discutidos:** dignidade e direitos fundamentais; justiça e equidade (dados históricos carregam discriminação; mitigar nem sempre é eliminar); caixa-preta (explicabilidade como auditoria); perda de autonomia por sistemas de recomendação (manipulação comportamental, "nudging"); privacidade e vigilância (localização, biometria, consentimento); trabalho cognitivo automatizado e pressão por produtividade; **aconselhamento psicológico por LLMs** (modelos tendem a acompanhar o usuário, o que agrada não é o que a pessoa precisa); deepfakes que atingem desproporcionalmente mulheres; **medo de ficar para trás**.

### Como funciona
- **NIST AI RMF em quatro funções:** **Govern** (cultura, responsabilidades, gestão; risco de IA não é de uma pessoa só), **Map** (identificar riscos conforme o contexto: saúde não é filtro de spam; agente com acesso a sistemas não é chatbot informativo), **Measure** (indicadores, comparar, avaliar se a mitigação melhorou) e **Manage** (contínuo: tecnologia, uso e incidentes mudam).
- **Classificação do AI Act (introdução):** risco mínimo, limitado, alto e inaceitável. Vigilância em massa e pontuação social como exemplos de inaceitável; saúde e infraestrutura crítica como alto risco (controles e auditoria mais fortes); chatbots e deepfakes com obrigações de transparência (a pessoa precisa saber que fala com IA); filtro de spam como baixo risco, que ainda pode errar.
- Técnica e uso não são a mesma coisa: deepfake pode ter uso legítimo; o dano está no uso. Avaliar contexto, intenção, consentimento e consequência.
- Estudo sobre vieses regionais em respostas de um modelo generativo (milhões de consultas, comparando países, incluindo estados brasileiros): ler a metodologia (como os prompts foram construídos, amostra, limitações), porque um estudo sobre viés também pode ter viés metodológico.
- Pressão por velocidade: "convergiu de primeira" não significa "está certo"; a decisão final pode não ser do cientista de dados, daí a importância de argumentar, mostrar riscos e propor alternativas. Às vezes a atitude mais responsável é atrasar uma entrega.

### Onde aplicar
- Revisar variáveis de um modelo de crédito ou seguro procurando proxies antes de aprovar para produção.
- Usar Govern, Map, Measure e Manage como estrutura de conversa com a liderança sobre risco de uma aplicação.
- Classificar uma aplicação nos quatro níveis do AI Act para calibrar o nível de controle.

### Vantagens e limites
**Vantagens**
- O caso é abstraível para qualquer decisão que afeta pessoas (crédito, saúde, seguros).
- O NIST RMF dá uma estrutura simples e contínua para gestão de risco.
- Treina o argumento técnico-ético, que é o que o time realmente precisa em reunião.

**Limites**
- Não há resposta única: o trade-off entre sustentabilidade financeira e justiça é real.
- Framework organiza, mas não resolve; precisa de adaptação ao contexto.
- Impactos sociais (trabalho, desemprego) não têm solução individual simples.

### 🚫 Armadilhas
- Aceitar uma variável porque a métrica ficou boa, sem perguntar por que ela prevê.
- Parar no diagnóstico ("não dá") sem propor alternativa.
- Usar LLM como substituto de profissional de saúde mental.
- Tomar decisões por medo de ficar para trás, sem governança suficiente.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Govern / Map / Measure / Manage | As quatro funções do NIST AI RMF |
| Viés de disponibilidade | Usar o que está disponível e tratar como verdade suficiente |
| Overfitting | Ajuste excessivo a padrões da amostra; acurácia não generaliza |
| Nudging | Influência comportamental por recomendação; a aula prefere "manipulação comportamental" |
| Risco inaceitável | Usos proibidos no AI Act, como pontuação social governamental |
| Alto risco | Permitido com controles mais fortes e auditoria (saúde, infraestrutura crítica) |
| Risco limitado | Obrigação de transparência (chatbot avisa que é IA; deepfake rotulado) |
| Risco mínimo | Poucas exigências (filtro de spam) |

---

## 💻 No curso

Aulas de reflexão, sem código. A Aula 7 propõe o caso do comitê de ética e deixa a pergunta aberta ("eu aprovo esse modelo?"); a Aula 8 retoma o caso e responde. O PDF do repo com o estudo de caso é o da triagem hospitalar, em [05 · IA responsável e o caso da triagem hospitalar](./05-ia-responsavel-e-caso-triagem.md).

Os slides da Aula 4 do curso ("Aspectos Humanos e Éticos") estão criptografados no pacote de material e não puderam ser lidos; este tópico se apoia na apostila e nas leituras do README do repo.

---

## 🔗 Para ir além
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [Lei da UE sobre IA, Parlamento Europeu (indicação 8)](https://www.europarl.europa.eu/topics/pt/article/20230601STO93804/lei-da-ue-sobre-ia-primeira-regulamentacao-de-inteligencia-artificial)
- [The silicon gaze: biases and inequality in LLMs through the lens of place (indicação 10)](https://journals.sagepub.com/doi/full/10.1177/29768624251408919)
- [Mais mulheres tornam-se vítimas de deepfakes (ONU News, citado no README do repo)](https://news.un.org/pt/story/2026/03/1852522)
- [Sobre o Medo de Ficar para Trás (Jéssica Costa, Medium)](https://medium.com/jessica-costa/sobre-o-medo-de-ficar-para-tr%C3%A1s-1f233fb658d1)
- [MIT AI Risk Repository](https://airisk.mit.edu/)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia)

---

⬅️ [05 · IA responsável e o caso da triagem hospitalar](./05-ia-responsavel-e-caso-triagem.md)  ·  [07 · Segurança em IA: o novo cenário e o OWASP Top 10 para LLMs](./07-owasp-top-10-llm-novo-cenario.md) ➡️
