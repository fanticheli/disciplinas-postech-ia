# 🎯 Disciplina 09 · O que vale estudar

> Análise de prioridade (opinião fundamentada no guia e na prática atual), não conteúdo da apostila. Premissas: leitor é engenheiro de software backend (TypeScript/Node e Python, APIs e serviços em AWS, Postgres, filas e jobs, produto com LLMs em produção, automação de fluxos e uso intenso de agentes de código); o objetivo é virar engenheiro de IA aplicada especialista (construir, avaliar, operar e governar sistemas com LLMs), não pesquisador de modelos.

## Veredito
O maior valor da disciplina não é treinar modelo: é a disciplina de decisão (quando NÃO fazer fine-tuning) e de avaliação (holdout, baseline, A/B, régua suspeita). Esses dois blocos valem para qualquer sistema com LLM, com ou sem fine-tuning. A parte de execução (Vertex AI, MLX, rank, QLoRA, DoRA) é a mais perecível e a menos provável de entrar no seu dia a dia.

Nota: ⭐⭐⭐ (3 de 5). Metade do conteúdo é essencial e transferível (blocos 1 e 5); a outra metade é operação de treino que a maioria dos produtos nunca precisa e que muda a cada trimestre. Mais útil para quem vai decidir se o produto deve ou não customizar um modelo, e para quem vai montar avaliação séria.

## Mapa de prioridade por tópico

| Tópico | Dia a dia | Especialista | Veredito |
|---|---|---|---|
| [00 · Comportamento vs conhecimento, 4 perguntas e 3 casos](./00-comportamento-vs-conhecimento-4-perguntas-e-casos.md) | 🟢 | 🟢 | Implementar |
| [01 · AHP, NPV, Monte Carlo e Real Options](./01-ahp-npv-monte-carlo-real-options.md) | ⚪ | 🟡 | Conhecer |
| [02 · Zoo de técnicas, casos de mercado e risco de provedor](./02-tipos-de-fine-tuning-zoo-e-risco-de-provedor.md) | 🟡 | 🟡 | Conhecer |
| [03 · Do documento ao exemplo validado (OCR, esquema, PII)](./03-do-documento-ao-exemplo-validado.md) | 🟡 | 🟡 | Aprofundar |
| [04 · Dataset como conjunto: MinHash, LSH, temperatura](./04-dataset-como-conjunto-minhash-lsh-temperatura.md) | ⚪ | 🟡 | Aprofundar (dedup e balanceamento; MinHash/LSH por dentro fica no superficial) |
| [05 · Vertex AI: provedor, 5 passos e job real](./05-vertex-ai-provedor-pipeline-e-job-real.md) | ⚪ | ⚪ | Pular |
| [06 · Hiperparâmetros, silêncio de API e automação segura](./06-hiperparametros-e-automacao-segura.md) | 🟡 | 🟡 | Conhecer (validar antes e idempotência vão em Implemente) |
| [07 · Linhagem do modelo, Model Card e Preference Tuning](./07-versionamento-model-card-e-preference-tuning.md) | 🟡 | 🟡 | Implementar (só hash e ficha) |
| [08 · LoRA e PEFT: teoria e custo fixo](./08-lora-peft-teoria-e-custo-fixo.md) | ⚪ | 🟡 | Conhecer |
| [09 · LoRA local com MLX, split sem vazamento e curva](./09-lora-local-mlx-treino-e-curva.md) | ⚪ | 🟡 | Conhecer |
| [10 · Rank, QLoRA e DoRA](./10-rank-qlora-dora.md) | ⚪ | ⚪ | Pular |
| [11 · Full fine-tuning vs LoRA](./11-full-fine-tuning-vs-lora.md) | ⚪ | 🟡 | Conhecer |
| [12 · Teste retido e harness de avaliação](./12-teste-retido-e-harness-de-avaliacao.md) | 🟢 | 🟢 | Implementar |
| [13 · Baseline, A/B, bootstrap, LLM-as-a-Judge](./13-baseline-ab-juiz-e-conjunto-vs-separado.md) | 🟢 | 🟢 | Aprofundar |
| [14 · Robustez, overfitting e artefato de medição](./14-robustez-overfitting-e-artefato-de-medicao.md) | 🟢 | 🟢 | Aprofundar |
| [15 · Veredito de escala e NPV real](./15-veredito-de-escala-e-npv-real.md) | 🟡 | 🟢 | Aprofundar |
| [16 · Assistente: classificar, rotear, validar, recusar](./16-assistente-arquitetura-e-implementacao.md) | 🟢 | 🟡 | Implementar |
| [17 · Decisões de arquitetura, escala e a regressão](./17-decisoes-de-arquitetura-escala-3000-e-fechamento.md) | 🟡 | 🟢 | Aprofundar |

## ✅ Implemente no dia a dia

1. **Gate "fine-tuning vs prompt vs RAG" antes de qualquer proposta de treino.**
   - Por que vale: o guia é claro (e a literatura citada nele também): fine-tuning ensina comportamento e formato, não fatos; conhecimento que muda é RAG. Na prática, o que a comunidade faz: esgotar prompt com exemplos reais, saída estruturada do provedor, RAG e cache antes de pensar em treino. Minha análise: para um backend com LLM em produção, a resposta certa é "ainda não" na grande maioria das vezes.
   - Primeiro passo mínimo: um documento de uma página, por tarefa candidata, com as 4 perguntas (tarefa estreita e repetida? prompt/RAG esgotados de verdade? dados suficientes e diversos? tarefa estável?) e a evidência de cada uma. Um vermelho encerra a conversa.
   - Quando não adotar: se a tarefa já está resolvida com prompt e o custo por chamada não incomoda, nem abra o documento.
   - Sinais honestos de que fine-tuning pode ganhar (segundo o guia): volume alto que torna o contexto repetido caro, consistência de formato, modelo pequeno rodando local. Mesmo assim, validação determinística continua necessária.
   - Tópico: [00](./00-comportamento-vs-conhecimento-4-perguntas-e-casos.md).

2. **Conjunto de avaliação retido e harness programático, mesmo sem fine-tuning.**
   - Por que vale: é o item mais reaproveitável da disciplina. Qualquer mudança de prompt, modelo ou provedor precisa de régua estável. Papéis separados: treino ajusta, validação escolhe configuração, teste responde depois das escolhas. Se o teste influenciou a escolha, deixou de ser teste.
   - Primeiro passo mínimo: 30 a 50 casos reais do seu produto, congelados em um arquivo versionado, com três checagens em código: conteúdo por campo (com tolerância onde fizer sentido), estabilidade entre chamadas repetidas e conformidade de schema (Zod ou JSON Schema). Rode em CI.
   - Quando não adotar: protótipo descartável. Para texto aberto sem gabarito, não force exact match (veja o item 2 de aprofundar).
   - Tópico: [12](./12-teste-retido-e-harness-de-avaliacao.md).

3. **Testar o avaliador e olhar a resposta bruta antes de culpar o modelo.**
   - Por que vale: o caso do guia é perfeito. Um 88,9% era a régua penalizando maiúscula, não o modelo errando. Isso acontece toda semana em evals de LLM.
   - Primeiro passo mínimo: testes unitários do avaliador com casos plantados (campo faltando, campo extra, não-JSON, caixa diferente) e, em toda queda de métrica, ler 5 respostas brutas antes de concluir qualquer coisa.
   - Quando não adotar: nunca vale pular; o custo é baixo.
   - Tópico: [14](./14-robustez-overfitting-e-artefato-de-medicao.md).

4. **Política de recusa e validação antes de responder em fluxos com LLM.**
   - Por que vale: o protótipo final mostra o padrão certo e independente de fine-tuning: classificar, rotear, validar o JSON, e recusar quando há incerteza em vez de forçar um schema. Encaixa direto em fila/job idempotente.
   - Primeiro passo mínimo: no seu worker, validar a saída com schema, mapear "não sei / fora de escopo / schema inválido" para um estado explícito (revisão humana ou retry limitado), e logar o motivo.
   - Quando não adotar: classificador por palavras-chave como o do guia. O próprio guia registra que ele deixa passar queixas com uma só palavra de domínio; use-o só como ilustração.
   - Tópico: [16](./16-assistente-arquitetura-e-implementacao.md).

5. **Proveniência mínima de qualquer artefato de IA (dataset, prompt, modelo).**
   - Por que vale: hash de conteúdo mais ficha curta responde "o que gerou este resultado?" meses depois. Serve para prompts e conjuntos de avaliação, não só para modelos treinados.
   - Primeiro passo mínimo: SHA-256 do arquivo de eval e do prompt, gravados junto de cada resultado de execução (tabela no Postgres ou JSON versionado).
   - Quando não adotar: não monte registry formal para poucos artefatos. O guia mesmo nota que isso é infraestrutura a mais.
   - Tópico: [07](./07-versionamento-model-card-e-preference-tuning.md).

6. **Validar a configuração antes de submeter, idempotência de job e "ausência de erro não é prova".**
   - Por que vale: o guia mostra um job criado com epoch count 0 que o provedor aceitou sem erro e levou a Running; numa automação semanal, esse bug criaria jobs por semanas. Criar job não é idempotente: cada chamada bem-sucedida gera um treino novo e uma nova cobrança. Encaixa direto no seu padrão de fila e job idempotente.
   - Primeiro passo mínimo: validar localmente a config (faixas de epoch e learning rate) antes de qualquer chamada de rede, comparar o pedido com o que o provedor reporta como aplicado, e exigir uma chave de execução para não criar outro job a cada rodada. Ação cara (treino) com confirmação humana.
   - Quando não adotar: se você nunca dispara treino ou job pago por automação, só o hábito de comparar pedido versus aplicado já basta. O restante do tópico 06 (hiperparâmetros em si) fica em Conhecer.
   - Tópico: [06](./06-hiperparametros-e-automacao-segura.md).

## 🔬 Aprofunde (rumo a especialista)

1. **Anatomia de vazamento e validade de holdout.**
   - Por que diferencia: a maioria dos "100%" em LLM é vazamento sutil. O guia admite isso: treino e teste vieram do mesmo gerador, só 28 valores e placas distintos em 200 exemplos, e no teste de 11 todos os valores já estavam no treino. Um especialista pergunta, antes de comemorar: o que no teste já existia no treino (entidade, template, valor, fonte)? o teste influenciou alguma decisão? contaminação do modelo base com o benchmark?
   - Estudar além da aula: split por entidade ou por grupo (não aleatório por linha), data leakage em ML clássico (qualquer material sério sobre validação cruzada e leakage), contaminação de benchmarks públicos em LLMs.
   - Exercício verificável: pegue seu conjunto de eval, calcule a sobreposição de entidades e de templates entre exemplos de desenvolvimento e de teste, e reparta por grupo. Meça quanto o número cai.
   - Tópicos: [09](./09-lora-local-mlx-treino-e-curva.md), [12](./12-teste-retido-e-harness-de-avaliacao.md), [14](./14-robustez-overfitting-e-artefato-de-medicao.md).

2. **Baseline justo, A/B e incerteza estatística com amostra pequena.**
   - Por que diferencia: comparar fine-tunado contra um prompt fraco é fraude involuntária. O guia faz certo: mesmo conjunto, mesmo protocolo, hint de formato testado isolado, e o 0% do genérico era falha de formato, não de compreensão. A pergunta decisiva é: depois de corrigir o formato por prompt, a precisão basta para o nível de automação? Também mostra o bootstrap (intervalo de 95%) para 11 exemplos e o pior caso contra você (mínimo do tunado, máximo do genérico).
   - Estudar além: bootstrap e testes pareados para comparar dois sistemas no mesmo conjunto, tamanho de amostra e poder estatístico, viés de posição e self-preference em LLM-as-a-Judge, e A/B online em produção (tráfego real, métrica de negócio), que a aula não cobre.
   - Exercício: compare dois prompts seus em 100 casos, calcule o intervalo do bootstrap da diferença e decida se ela é distinguível de zero. Para saída aberta, escreva rúbrica curta e rode o juiz com a ordem invertida; reporte a taxa de discordância.
   - Tópico: [13](./13-baseline-ab-juiz-e-conjunto-vs-separado.md).

3. **Robustez e behavioral testing.**
   - Por que diferencia: acerto no conjunto retido não prova generalização. Perturbações que não deveriam mudar a resposta (rótulo coloquial, valor por extenso, nome-isca, duas entidades no mesmo texto) acharam o que o retido não achou. O guia também alerta o contrário: três repetições não provam um erro sistemático; 58 execuções mostraram que o alarme era ruído.
   - Estudar: behavioral testing de NLP (a ideia de testes de invariância e direcionais), adversarial/prompt injection (que o guia reconhece não ter coberto).
   - Exercício: escreva 10 casos à mão, fora de qualquer gerador, que variem forma sem mudar a resposta; rode N vezes e reporte taxa de acerto com contagem de execuções.
   - Tópico: [14](./14-robustez-overfitting-e-artefato-de-medicao.md).

4. **Escalar dado e re-medir: a regressão.**
   - Por que diferencia: ao ir de 200 para 3.000 exemplos, o modelo manteve retido e Round 1, mas caiu de 100% para 66,7% no Round 2 (casos com dois registros no mesmo texto), confirmado em dezenas de chamadas. Mais dado não garante manter o que funcionava. Isso vale para trocar de modelo base ou de prompt também.
   - Estudar: regression testing para LLMs, canary e shadow evaluation, monitoramento de drift em produção (pelo nome, a aula não aprofunda).
   - Exercício: defina um checklist de graduação com limiares escritos antes (como os 5 critérios do guia) e rode-o a cada mudança relevante; registre qualquer queda como incidente.
   - Tópicos: [15](./15-veredito-de-escala-e-npv-real.md), [17](./17-decisoes-de-arquitetura-escala-3000-e-fechamento.md).

5. **Qualidade de dado para treino e privacidade.**
   - Por que diferencia: dado real e limpo não é necessariamente par entrada/saída adequado; dataset válido por exemplo pode ser ruim como conjunto (duplicatas, desbalanceamento). Há também PII: o gate do guia é por âncora de rótulo, não é anonimização completa, e o JSONL de extração guardou nomes completos.
   - Estudar: curadoria sobre volume (o paper LIMA, citado no guia), deduplicação (Lee et al., citado), documentação oficial do Presidio para PII, LGPD.
   - Exercício: pegue 200 exemplos seus, meça duplicatas aproximadas (Jaccard sobre shingles) e rode o scrubbing de PII; conte o que escapou numa amostra revisada à mão.
   - Tópicos: [03](./03-do-documento-ao-exemplo-validado.md), [04](./04-dataset-como-conjunto-minhash-lsh-temperatura.md).

## 🧂 Pode ficar no superficial

- **AHP, NPV, Monte Carlo, Real Options (tópico 01):** o guia admite que os números são ilustrativos e as distribuições são palpites. Vale a ideia (gate binário antes de qualquer score; score alto não compensa vermelho). A matemática, não. Minha análise: uma planilha com custo de treino, custo de servir, economia por chamada e prazo de retreino resolve.
- **Vertex AI passo a passo e job real (tópico 05):** o próprio guia diz que o modelo base tem retirada anunciada e que o fluxo pode não existir quando você executar. Aprenda o padrão (conversor de formato, estados do job, não sobrescrever dataset), não os comandos (confira a versão atual do provedor).
- **Rank, QLoRA, DoRA (tópico 10):** tudo medido em 20 iterações, que o próprio guia chama de subtreino; DoRA empatou. Saiba o que cada sigla significa. Não gaste tempo ajustando.
- **Full vs LoRA (tópico 11):** conclusão frágil (duas execuções, Full parcial de 16 camadas). Guarde só o critério: limiar de ganho explícito contra custo de armazenar e servir.
- **MinHash/LSH por dentro (tópico 04):** aprofunde o resultado (deduplicar e balancear, item 5 de aprofundar), não a construção das assinaturas. Minha análise: para poucos milhares de exemplos, Jaccard exato resolve; LSH só compensa em volume grande.
- **Zoo de técnicas (RLHF, GRPO, DPO, etc.):** bom vocabulário, baixo retorno prático para o seu perfil. O guia nota que só SFT, LoRA e Full são de fato treinados, e DPO foi testado uma vez com 40 pares e sem avaliação de qualidade.

## ⚠️ Cuidados e lacunas

- **Os "100%" do curso são fracos como evidência.** Dataset sintético de um gerador determinístico, 11 exemplos de teste, 6 por round de estresse, valores repetidos entre treino e teste. O guia assume isso; não tire conclusões de produção.
- **Números financeiros são ilustrativos.** Custo fixo de R$ 2.400, volumes de 8 mil e 1.200 casos, scores dos casos: tudo calibrado para a história. O job real custou R$ 2,39 (billing registrado), contra 5 a 11 centavos de dólar na aula. Recalcule com seus números.
- **Divergências entre apostila e código** (razão de consistência do AHP, adapter size 4 nunca enviado ao job, faixa do genérico 54,5% a 72,7% vs 54,5% a 66,7%) mostram que até o material do curso precisa de verificação. É um bom hábito a copiar.
- **Lacunas reconhecidas pelo guia:** sem teste adversarial/prompt injection, sem latência e concorrência, sem avaliação do esquecimento catastrófico, sem teste em nova distribuição de negócio. Em produção, isso é parte do trabalho (a disciplina de segurança e governança cobre parte).
- **Dependência de provedor e de versão de modelo.** O guia registra aposentadorias anunciadas e fine-tuning self-serve descontinuado em provedores (datas vêm do repositório e das indicações, não conferidas; confira a versão atual). Minha análise: assuma que o fine-tuning gerenciado de hoje pode não existir em um ano e que cada novo modelo base de fronteira pode superar seu modelo customizado (o próprio guia traz um caso de mercado assim).
- **Lacuna na prática:** a aula cobre pouco A/B online com tráfego real e monitoramento contínuo. Minha análise: é onde um especialista passa a maior parte do tempo.

## ✔️ Como saber que aprendeu

1. Consigo, sem consultar, escrever as 4 perguntas do gate, a Pergunta 0 (conhecimento ou comportamento?), e explicar por que RAG, prompt ou saída estruturada resolvem o caso antes de qualquer treino.
2. Meu serviço tem um conjunto de avaliação congelado e versionado, com métricas de conteúdo, estabilidade e schema rodando em CI, e testes unitários do próprio avaliador.
3. Consigo, para uma comparação entre dois sistemas, reportar baseline sob o mesmo protocolo, intervalo de incerteza (bootstrap) e a sobreposição entre desenvolvimento e teste, e dizer em uma frase o que o número NÃO prova.

Veja também a [trilha consolidada](../../study-roadmap.md).
