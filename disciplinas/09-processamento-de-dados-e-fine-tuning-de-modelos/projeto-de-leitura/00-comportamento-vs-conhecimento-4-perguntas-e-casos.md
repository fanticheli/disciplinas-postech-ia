# 00 · Fine-tuning ensina comportamento, não fatos: gate de governança, 4 perguntas e os 3 casos

> **Unidade 1 · Aulas 1 e 2** · Leitura: ~11 min · Bloco: Decidir: quando fazer fine-tuning

## 🎯 Em uma frase
Fine-tuning é uma das ferramentas **mais caras e mais lentas de iterar**, então deveria ser uma das últimas opções. Ele ensina **comportamento, formato, tom e estrutura**, não fatos novos (isso é papel do RAG). A decisão se organiza em um **gate de governança** binário seguido de **4 perguntas** que precisam estar todas verdes.

---

## 👵 Explicando para a vovó

Pense numa loja com um atendente novo. O RAG é a prateleira de manuais ao lado do balcão: a cada pergunta, o atendente consulta o manual certo, e se um manual muda, a resposta muda na hora. Fine-tuning é um treinamento de semanas para o atendente falar sempre do jeito da loja (mesmo formato, mesmo tom). Se o problema é «o manual mudou», treinar o atendente de novo é gastar dinheiro à toa.

Antes de pagar o treinamento, um comitê cauteloso faz perguntas simples: a tarefa é sempre a mesma? já tentamos o jeito barato? temos exemplos de verdade? o formato muda toda semana? E antes de tudo: podemos legalmente usar esses dados para treinar? Se uma resposta for «não», o comitê para ali.

---

## 🔧 Tecnicamente

### O que é
- **O mito central:** fine-tuning não serve para ensinar fatos novos. Ele ajuda o modelo a responder de forma consistente a uma classe de solicitações (comportamento, formato, padrão, tom, estrutura). Conhecimento novo é resolvido pelo **RAG**: o texto vem de uma fonte externa a cada chamada e o modelo não muda.
- **Evidências citadas na aula:** no caso do Anyscale (ecossistema do Ray), textos de Shakespeare tiveram «Romeo» trocado por «Bob» e, mesmo depois do fine-tuning, o modelo continuou respondendo «Romeo» quando perguntado sobre o amado de Julieta com a dica de que o nome começava com R. Em um estudo da Microsoft (2024), no Llama 2 o fine-tuning isolado chegou a *piorar* a acurácia em fatos recentes, enquanto o RAG foi de cerca de 35% para quase 60%.
- **O lado certo:** a Indeed validou o comportamento com few-shot prompting e só depois fine-tunou um modelo menor para manter a qualidade com menor custo de inferência: cerca de 60% menos tokens, em escala de milhões de mensagens por mês.
- **As 4 perguntas:** (1) a tarefa é estreita e repetida? (2) prompt engineering, RAG, roteamento e cache já foram esgotados de verdade? (3) existem dados suficientes, diversos e de qualidade? (4) a tarefa é estável o bastante para não virar esteira de retreino? Cada uma tem sinal verde e sinal vermelho.
- **Gate de governança:** uma verificação binária que roda *antes* das 4 perguntas (e antes de AHP e análise econômica): há base legal definida para o tratamento? Se o dado é de categoria sensível, há DPA adequado com o provedor? Não é uma quinta pergunta ponderável, é um bloqueador.
- **Escada de customização:** prompt, **context engineering** (tudo que entra no contexto: histórico, documentos recuperados, saída de ferramentas, exemplos escolhidos dinamicamente; RAG é uma técnica dentro disso), **agent skills** (pacotes de instruções e, às vezes, código carregados sob demanda, sem alterar pesos) e só então fine-tuning.
- **Onde fine-tuning ainda ganha:** volume (reconstruir um contexto grande em milhões de chamadas custa tokens e latência), consistência de formato (sem repetir instruções em todo prompt, embora a validação determinística continue necessária e existam mecanismos como Structured Outputs) e modelo pequeno rodando local, sem contexto enorme nem skills externas.

### Como funciona
- **Fluxo da decisão:** governança primeiro; depois P1 a P4. Um sinal vermelho em pergunta importante interrompe a recomendação ali, sem forçar as demais para justificar uma decisão que já começou errada. O checklist organiza o julgamento, não o substitui.
- **Condições necessárias, não compensáveis:** tarefa estreita sem dados não é bom candidato; muito dado em tarefa aberta não resolve; tarefa repetitiva com contrato que muda toda semana vira esteira de retreino. Por isso as perguntas não compensam umas às outras.
- **Caso 1, Amplitude Auto** (extrair segurado, placa e valor de orçamentos de oficina): quatro verdes. A variação está só na forma de entrada (cada oficina tem seu layout), não na tarefa; prompt e RAG já estão em produção e ainda há inconsistência em escala; milhares de sinistros históricos (cerca de 8 mil por mês no exemplo); contrato de saída estável.
- **Caso 2, Amplitude Saúde Empresarial** (beneficiário, procedimento e valor de recibos médicos, cruzando titular e dependente): P1, P2 e P4 verdes, **P3 vermelha**. Linha mais nova, cerca de 1.200 casos por mês contra ~8 mil de Auto, score de dados 0,35 contra limiar 0,6. Recomendação: *ainda não*; o gargalo é histórico representativo, não ausência total de exemplos.
- **Caso 3, Atendimento ao Cliente** (negociar contestações de sinistro em conversa aberta): P2 e P3 *verdes de propósito* (prompt, RAG e roteamento humano já em produção; mais conversas por mês que Auto e Saúde somadas) e **P1 e P4 vermelhas** (tarefa aberta; política muda com revisão regulatória e produtos novos). Recomendação: *não* para a tarefa como definida. Dado de sobra não basta.
- **«Ainda não» versus «não»:** Saúde pode melhorar com tempo e coleta; Atendimento não melhora esperando, porque o problema é a natureza da tarefa.
- **Por que dados pesam mais no AHP** (adiantado na aula): prompt melhor se escreve amanhã, contrato se redesenha, RAG se revisa; histórico representativo depende de tempo, coleta ou fonte alternativa confiável.
- **Contexto do caso:** a Amplitude Seguros nasceu cooperativa de produtores rurais, virou S.A. e tem cultura de decisão colegiada e aversão a risco; Camila Andrade (head de dados e IA) já não precisa provar que IA generativa importa, a pergunta agora é quando vale ir além de prompt e RAG. A abertura da disciplina retoma o Trial Forge da disciplina anterior: um modelo menor especializado poderia deixar de escalar sempre para um modelo caro?

### Onde aplicar
- Antes de pedir orçamento de treinamento, aplicar as 4 perguntas a uma tarefa do seu contexto, registrando para cada uma o sinal e a evidência.
- Separar casos de «ainda não» (dado insuficiente) de casos de «não» (tarefa aberta ou instável) e documentar a justificativa.
- Candidatos típicos: extração de campos fixos de documentos heterogêneos, classificação com contrato de saída fixo, saída estruturada em alto volume.
- Checar o gate de governança antes de discutir treinamento quando houver dado de saúde ou outro dado sensível.

### Vantagens e limites
**Vantagens**
- Barato de aplicar (um checklist) e evita o erro caro de treinar para o problema errado.
- Falha cedo: um vermelho interrompe a recomendação, e as justificativas ficam registradas para comitê.
- Separa com clareza conhecimento (RAG) de comportamento (fine-tuning).

**Limites**
- Os scores dos casos são julgamentos do professor com números ilustrativos, não medições; o checklist organiza o julgamento mas não o substitui.
- Janelas de contexto maiores, modelos de raciocínio e tokens mais baratos mudam a escada de alternativas; o framework precisa ser revisitado.
- O gate de governança é raso por desenho (base legal e DPA); mascaramento de PII e auditoria completa ficam para depois, e para a disciplina de segurança e governança.

### 🚫 Armadilhas
- Usar fine-tuning para «ensinar» política, preço ou regra que muda: isso é problema de conhecimento, e a resposta é RAG.
- Pular a pergunta 2: treinar não deveria ser um jeito de evitar especificar o comportamento num prompt bem escrito, com exemplos reais.
- Achar que muito dado resolve tarefa aberta (o caso Atendimento ao Cliente mostra que não).
- Deixar a média compensar um vermelho: as perguntas são condições necessárias.
- Tratar os números financeiros e de volume do exemplo (8 mil, 1.200 casos por mês) como dado real: a própria aula os chama de ilustrativos.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Pergunta 0 | O problema é de conhecimento (RAG) ou de comportamento (fine-tuning)? |
| Gate de governança | Base legal definida e, se dado sensível, DPA com o provedor; binário e anterior a tudo |
| Tarefa estreita e repetida | Descrita por uma frase válida para quase todo caso, com contrato de saída reconhecível |
| Context engineering | Tudo que entra no contexto do modelo; RAG é uma técnica dentro dele |
| Agent skills | Pacotes de instruções (e código) carregados sob demanda, sem alterar pesos |
| Esteira de retreino | Contrato que muda toda semana obriga a revisar dataset, reavaliar e treinar de novo |
| Ainda não versus não | Falha por dado pode melhorar com tempo; falha por tarefa aberta ou instável não |

---

## 💻 No código do repo

O framework executável (AHP, NPV, Monte Carlo, Real Options) está no [tópico 01](./01-ahp-npv-monte-carlo-real-options.md). Aqui ficam o checklist e os dados dos três casos.

**Projeto:** [modulo-01-decision-framework (checklist e casos)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-01-decision-framework)

A pasta do módulo 1 traz o checklist em Markdown e o JSON com os três casos da Amplitude. O executável que consome esses dados é descrito no tópico 01.

**Fluxo**
1. `decision-framework-checklist.md`: Pergunta 0 (conhecimento muda porque um fato mudou? então RAG) e a tabela das 4 perguntas com sinal verde e vermelho. Regra prática: as quatro precisam de verde. Registra a escada prompt, context engineering (RAG incluído), Agent Skills, fine-tuning.
2. `amplitude-seguros-casos.json`: `limiarVerde: 0.6`, a matriz AHP e os 3 casos, cada um com `scores` de p1 a p4, `justificativas` por pergunta e bloco `governanca` (`dadoSensivelLGPD`, `baseLegalDefinida`, `dpaAssinado`).
3. Scores: Auto (0,90; 0,85; 0,90; 0,85), Saúde Empresarial (0,85; 0,80; 0,35; 0,80), Atendimento ao Cliente (0,30; 0,75; 0,92; 0,35). Só Auto e Saúde têm bloco `financeiro`, e só Saúde tem `opcaoReal`.
4. Só a Saúde Empresarial tem `dadoSensivelLGPD: true` (LGPD Art. 5º, II); é o único caso em que o DPA é de fato exigido pelo gate.

**Como rodar**
- Nada a instalar: leia os dois arquivos e preencha a tabela «Seu caso» do checklist para uma tarefa sua (é a Missão Prática 1).
- Para ver os números rodando, execute o framework do [tópico 01](./01-ahp-npv-monte-carlo-real-options.md).

**Armadilhas e achados no código**
- O próprio `_comentario` do JSON avisa que volume, custo por chamada, custo de treino e taxa de desconto são ilustrativos, calibrados para dar uma história coerente; não são dado de mercado.
- Os três casos passam no gate de governança: ele nunca bloqueia um caso do curso, só os testes o exercitam com casos construídos.
- O checklist e o cheatsheet apontam para `fine-tuning-zoo-poster.png`, mas a pasta só tem o `.html` do pôster (tópico 02).
- Os vídeos são numerados «Módulo 1.1, 1.2, 1.3» nos comentários do código; na apostila isso corresponde a Unidade 1, Aulas 1, 2 e 3.

---

## 🔗 Para ir além
- [Repositório oficial, módulo 01 (Decision Framework)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-01-decision-framework)
- [Ovadia et al. (Microsoft): Fine-Tuning or Retrieval? (indicação 18)](https://arxiv.org/abs/2312.05934)
- [OpenAI: Indeed constrói um recrutador virtual (indicação, relatório 1)](https://openai.com/index/indeed)

---

⬅️ [README](./README.md)  ·  [01 · AHP, NPV, Monte Carlo e Real Options: do sinal verde ao número](./01-ahp-npv-monte-carlo-real-options.md) ➡️
