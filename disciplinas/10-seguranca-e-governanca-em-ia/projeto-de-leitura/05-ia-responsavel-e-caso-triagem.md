# 05 · IA responsável e o caso da triagem hospitalar

> **Unidade 3 · Aula 6** · Leitura: ~9 min · Bloco: Vieses, responsabilidade e ética

## 🎯 Em uma frase
**IA responsável** é desenvolver e usar IA considerando perspectivas éticas e legais, com equidade, transparência, não maleficência, accountability, privacidade, robustez e segurança. O **estudo de caso da triagem de UTI** mostra um modelo "tecnicamente correto e socialmente inadequado", que usa CEP e hospital de origem como **proxies**.

---

## 👵 Explicando para a vovó

Um hospital contrata alguém para organizar a fila da UTI e o sistema aprende que quem mora em certos bairros costuma se recuperar menos. Então empurra esses pacientes para o fim da fila, mesmo com o mesmo quadro clínico. Ninguém mandou discriminar; ele só aprendeu com a história.

A pergunta da aula é: quem responde por isso, e vale perder um pouco de eficiência para corrigir uma injustiça antiga?

---

## 🔧 Tecnicamente

### O que é
- **Princípios destacados:** equidade (reduzir discriminação, atenção à sub-representação), transparência e explicabilidade, não maleficência (não causar dano social, econômico, ambiental ou humano), responsabilidade/accountability (quem responde, decide, interrompe, investiga e aprova nova versão), privacidade (LGPD como referência) e robustez e segurança.
- **Três pilares de confiança:** dado de qualidade, algoritmo resiliente e teste de software, conectados entre si. Em IA, teste também verifica se o sistema funciona *sem causar dano*: performance, segurança, viés, comportamento inesperado e impacto, desde o início do ciclo de vida.
- **Práticas:** design centrado no humano (resolver necessidade real; evitar solução procurando problema), feedback de usuários diversos desde cedo, métricas multidimensionais (desagregar por grupo, não só média), auditoria de dados brutos (ausentes, incorretos, redundantes, problemas de coleta), gestão e documentação de limitações, experimentação consciente e validação ética contínua.
- **Plano de resposta:** pensar em rollback, revisão manual, suspensão temporária e correção definitiva antes do incidente. Responsabilidade é estar preparado para falhas, não acreditar que não haverá.
- **O caso:** sistema treinado com 10 anos de histórico clínico de milhões de pacientes para otimizar a fila de UTI e exames de alta complexidade. Auditores descobrem que pacientes de baixa renda e minorias ficam sistematicamente abaixo, com o mesmo quadro clínico. Raça e renda não são variáveis do modelo, mas **CEP e hospital de origem** funcionam como proxies; o modelo calculou menor sobrevivência a longo prazo na região X e priorizou a região Y.

### Como funciona
- O impasse: remover ou penalizar as variáveis geográficas e socioeconômicas reduz a eficiência (menos vidas salvas no ano, segundo o cenário); manter perpetua e aprofunda uma desigualdade histórica.
- Remover a variável sensível não basta: os proxies carregam a informação socioeconômica. O volume de dados também não elimina o viés.
- Justiça é maximizar o total de vidas, dar tratamento equivalente a quadros equivalentes ou compensar desigualdades históricas? As definições podem conflitar; fairness depende do contexto e de valores humanos, e o algoritmo sozinho não decide.
- Responsabilidade não some porque o padrão veio dos dados: alguém escolheu o conjunto, as variáveis, o objetivo de otimização e aprovou a implantação. Responsabilidade em IA não se reduz à acurácia.
- Transparência diante do afetado: como explicar à família de um paciente periférico por que ele perdeu prioridade? A explicação técnica basta? Que consentimento deveria existir? O papel profissional é reconhecer conflitos, explicitar riscos, ouvir áreas e construir uma decisão consciente.

### Onde aplicar
- Auditar um modelo de priorização procurando proxies (CEP, hospital, escola, renda indireta).
- Medir taxa de erro por grupo antes de aprovar um modelo, não só a métrica global.
- Definir antes do deploy quem pode interromper o sistema e qual é o plano de rollback.

### Vantagens e limites
**Vantagens**
- O caso força a discussão de trade-offs reais, sem resposta pronta.
- As práticas (métricas por grupo, auditoria de dados, plano de resposta) são acionáveis.
- Liga responsabilidade, viés, explicabilidade e governança num único cenário.

**Limites**
- Os dilemas de justiça não têm solução técnica única.
- Corrigir proxies pode reduzir a eficiência estatística geral.
- Exige participação de áreas além de engenharia (clínica, jurídico, ética).

### 🚫 Armadilhas
- Achar que remover raça ou renda do dataset elimina a discriminação.
- Confiar em boa acurácia média como prova de justiça.
- Delegar a responsabilidade "aos dados" ou "ao algoritmo".
- Fazer validação ética uma única vez, sem repetir quando dados, usuários e modelo mudam.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Proxy | Variável correlacionada que carrega informação sensível sem declará-la (CEP, hospital) |
| Equidade | Reduzir discriminação sistemática entre grupos |
| Não maleficência | Não causar dano; desempenho técnico não basta |
| Accountability | Governança clara e prestação de contas: quem responde, decide e interrompe |
| Design centrado no humano | Construir para resolver necessidade real, com feedback de usuários diversos |
| Métricas multidimensionais | Desempenho e erro por grupo, não só média global |
| Auditoria de dados brutos | Checar ausentes, incorretos, redundantes, problemas de coleta e viés |
| Validação ética contínua | Revisitar princípios durante a operação, não só antes do deploy |

---

## 💻 No código do repo

**Projeto:** [modulo4-aspectos-humanos-eticos](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia/modulo4-aspectos-humanos-eticos)

A pasta tem um único arquivo, o PDF `Estudo_de_Caso_Responsabilidade_IA_Atualizado.pdf` (2 páginas): o caso "O Dilema do Algoritmo de Triagem de Saúde", que é o mesmo cenário narrado na Aula 6 da apostila. Não há código.

**Fluxo**
- **1. O Cenário:** rede de hospitais públicos contrata equipe para otimizar a fila de UTI e exames de alta complexidade; objetivo de salvar mais vidas, priorizando risco imediato e probabilidade estatística de recuperação ("princípio da eficiência médica"); treino com 10 anos de histórico de milhões de pacientes.
- **2. O Conflito (Dados Ocultos):** auditores veem pacientes de baixa renda e minorias em posições mais baixas com o mesmo quadro clínico. Quatro achados: cor da pele e renda não são variáveis; o modelo aprendeu proxies (CEP e hospital de origem); desigualdade histórica de acesso faz pacientes de periferia chegarem em estágio mais avançado; o algoritmo concluiu que a região X tem menor sobrevivência a longo prazo e priorizou a região Y.
- **O Impasse Ético:** penalizar variáveis geográficas e socioeconômicas reduz a eficiência (menos vidas totais salvas no ano); manter perpetua uma desigualdade histórica.
- **3. Questões para Debate:** A) o que é "justiça" para uma IA (eficiência fria versus equidade, pilar da Equidade); B) de quem é a responsabilidade pelo viés (pilar de Accountability; o dev deve "corrigir a sociedade" alterando pesos?); C) limite da transparência e explicabilidade (como explicar à família e como desenhar o Termo de Consentimento e Governança).

**Como rodar**
- Abra o PDF e use as três questões como roteiro de discussão com o time; é material de sala de aula, sem execução.
- O rodapé do PDF avisa que o material foi gerado com auxílio de IA.

**Armadilhas e achados no código**
- O README do módulo cita a pasta como `modulo-04-aspectos-humanos-eticos/`, mas no repositório ela se chama `modulo4-aspectos-humanos-eticos` (sem hífen); a apostila usa o nome real.
- O caso do PDF (triagem de UTI) é diferente do caso narrado na Aula 7 da apostila (modelo de sinistralidade e inadimplência com renda e CEP): os dois compartilham o mesmo problema de proxies.

---

## 🔗 Para ir além
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [Machine Learning for High-Risk Applications (repositório do livro)](https://github.com/ml-for-high-risk-apps-book/Machine-Learning-for-High-Risk-Applications-Book)
- [Estudo de Caso: Responsabilidade em IA (PDF no repo)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia/modulo4-aspectos-humanos-eticos)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia)

---

⬅️ [04 · Vieses em IA: tipos, origens e mitigação](./04-vieses-em-ia.md)  ·  [06 · Aspectos humanos e desafios éticos: do caso da inadimplência ao NIST](./06-aspectos-humanos-e-desafios-eticos.md) ➡️
