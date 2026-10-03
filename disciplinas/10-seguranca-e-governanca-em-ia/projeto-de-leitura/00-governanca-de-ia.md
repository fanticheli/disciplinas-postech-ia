# 00 · Governança de IA: pilares, riscos e por onde começar

> **Unidade 1 · Aula 1** · Leitura: ~7 min · Bloco: Fundamentos e explicabilidade

## 🎯 Em uma frase
**Governança de IA** é o conjunto de regras, processos, políticas e ferramentas que orienta criação, implantação e uso de IA numa organização. Ela é **prática** (não um PDF numa pasta), é estratégica (não se resolve só com código) e precisa existir no design, nos dados, no treinamento e na operação.

---

## 👵 Explicando para a vovó

Pense num prédio com elevador. Ninguém acha que o elevador é perigoso por existir, mas existe inspeção periódica, limite de peso, botão de emergência e alguém responsável pela manutenção. Governança de IA é a inspeção, o limite de peso e o nome do responsável.

E não adianta pendurar o regulamento na parede e esquecer: se ninguém inspeciona de verdade, o regulamento vira enfeite.

---

## 🔧 Tecnicamente

### O que é
- **Definição da aula:** regras, processos, políticas e ferramentas para criar, implementar e usar IA. A primeira pergunta de governança é **para quê?**: qual objetivo, qual processo melhorar, qual problema resolver, e manter a IA alinhada a isso ao longo do tempo.
- **Os quatro pilares da IA ética:** transparência (saber o que o sistema faz, que dados usa, que resultado produz e como será usado), justiça/fairness (evitar discriminação e perguntar quem ganha e quem perde, não só a performance média), segurança e privacidade (dados, acessos, saídas, ataques) e responsabilidade (cada decisão relevante tem dono; alguém pode interromper o sistema e aprovar mudanças).
- **Custo de não ter governança:** risco reputacional (vieses, discriminação), jurídico (regras variam por país; LGPD e afins continuam valendo), operacional (alucinação é característica conhecida: a pergunta é como mitigar) e de dados ("lixo entra, lixo sai" continua valendo na IA generativa).
- **Shadow AI:** uso não oficial de ferramentas de IA por colaboradores (chatbots, extensões, assistentes de código). A empresa pode não saber quais dados saem, onde ficam armazenados e que acesso a ferramenta tem. Por isso ferramentas precisam ser **homologadas**.
- **Governança by design:** começa no design (impacto, quem é afetado, risco de discriminação, recomendação versus ação autônoma, custo), passa pelos dados (curadoria e limpeza), pelo treinamento (métricas e viés, inclusive ao só integrar uma API) e vai até a operação (usuários, impacto, custo, incidentes, comportamento inesperado).

### Como funciona
- **Supervisão humana:** IA como copiloto. Ela acelera e organiza, mas existe uma pessoa responsável pelo resultado. Quanto maior o impacto da decisão, mais explícito precisa ser como a supervisão funciona.
- **Comitê de IA:** multidisciplinar (tecnologia, jurídico, RH, áreas de negócio e, se a IA faz parte do produto, clientes). Governança não é responsabilidade exclusiva de tecnologia.
- **Letramento e treino contínuo:** entregar ferramentas sem preparar as pessoas não é prática segura; elas precisam entender limitações, riscos, que informação pode ou não ser enviada e como reconhecer erros.
- **Por onde começar (quatro passos práticos):** (1) inventário das ferramentas de IA em uso (quais, quantos usuários, oficiais ou não); (2) classificação de uso por risco (baixo, médio, alto, dependente do contexto e dos dados acessados); (3) políticas de uso (o que pode, que dado não vai, quais ferramentas homologadas, quando exige revisão humana); (4) monitoramento com KPIs.
- **KPIs de ética e segurança citados:** número de aplicações de IA, de usuários, de incidentes, políticas implantadas, aplicações classificadas por risco e ferramentas homologadas. Não existe KPI universal: cada organização adapta ao contexto.

### Onde aplicar
- Montar o inventário de IA de um time ou empresa e classificar cada uso por risco antes de liberar novas ferramentas.
- Escrever política de uso de IA (dados proibidos, ferramentas homologadas, quando exigir revisão humana).
- Incluir custo, impacto e plano de monitoramento já na fase de design de uma feature com LLM.

### Vantagens e limites
**Vantagens**
- Reduz exposição de dados e incidentes causados por uso sem orientação.
- Transforma risco em número acompanhável (KPIs), o que orienta decisão.
- Começa pequeno: inventário, classificação, política e treino já reduzem parte relevante do risco humano.

**Limites**
- Exige envolvimento de várias áreas e incentivo da liderança; política que ninguém usa não protege.
- Não existe KPI nem classificação universal: precisa de adaptação ao contexto da organização.
- É contínua: não termina na implantação, o que custa tempo e atenção permanentes.

### 🚫 Armadilhas
- Tratar governança como um documento escrito uma vez e arquivado.
- Achar que governança é problema só de código ou só de TI.
- Deixar a fase de produção sem monitoramento (a aula insiste que governança continua durante toda a vida da solução).
- Descobrir o custo da solução só quando a fatura chega.

> 💡 **Dica:** Para um time pequeno, o primeiro entregável de governança é uma planilha: ferramenta de IA, quem usa, dado envolvido, nível de risco, homologada (sim/não).

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Governança de IA | Regras, processos, políticas e ferramentas que orientam criação, implantação e uso de IA |
| Shadow AI | Uso não oficial de ferramentas de IA por colaboradores, sem homologação |
| Governança by design | Governança desde o design, passando por dados, treino e operação |
| Copiloto | IA que apoia e acelera, com pessoa responsável pelo resultado |
| Comitê de IA | Grupo multidisciplinar que discute impactos da IA |
| Inventário | Primeiro passo: levantar quais ferramentas de IA existem e quem usa |
| Classificação de risco | Baixo, médio ou alto, conforme o que a aplicação faz e os dados que acessa |
| KPIs de ética e segurança | Número de apps, usuários, incidentes, políticas, apps por risco, ferramentas homologadas |

---

## 💻 No curso

A Aula 1 não tem projeto no repositório; é uma aula conceitual. O material de apoio citado é o NIST AI Risk Management Framework, retomado nas Aulas 6 e 7.

A frase que ancora a disciplina inteira, dita na introdução da apostila: tecnologia não é só técnica; é construída por pessoas, aplicada em organizações formadas por pessoas e produz impacto sobre outras pessoas.

---

## 🔗 Para ir além
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia)

---

[01 · Fontes de materiais: framework, repositório de riscos, Scholar e arXiv](./01-fontes-e-leitura-critica.md) ➡️
