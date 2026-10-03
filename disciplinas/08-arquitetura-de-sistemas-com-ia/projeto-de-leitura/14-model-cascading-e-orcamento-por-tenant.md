# 14 · Model Cascading e orçamento por tenant: a arquitetura completa e o critério final

> **Módulo 5 · Aula 4 e revisão final** · Leitura: ~13 min · Bloco: Arquitetura Enterprise

## 🎯 Em uma frase
O Model Router decide o modelo *antes* da resposta; o **Model Cascading** deixa o modelo mais barato responder primeiro e só **escala** quando um sinal de confiança indica que a resposta não basta. Soma-se o **orçamento por tenant**, verificado **antes** de qualquer operação cara. A disciplina fecha com um critério de arquitetura: quando usar agente, regra, especialistas, paralelo, aprovação, reuso de resposta, modelo caro, e quando bloquear.

---

## 👵 Explicando para a vovó

É como pedir um orçamento de obra. Você chama o pedreiro (barato); se o serviço está bom, acabou; senão sobe para o mestre de obras e, só se preciso, ao engenheiro. E antes de mandar qualquer um à obra, o caixa confere se o condomínio ainda tem verba: se acabou, o portão não abre, nem para o pedreiro.

Ao longo do curso foi o mesmo prédio crescendo: a recepção, a coordenação, os especialistas, o cofre com o livro de registro e agora o regulamento do condomínio inteiro.

---

## 🔧 Tecnicamente

### O que é
- **Do roteador à tentativa:** mesmo escolhendo bem entre modelo barato e caro, há desperdício quando tarefas simples vão ao caro por terem sido pré-classificadas como complexas. O Model Router adivinha a dificuldade antes; a cascata observa a qualidade depois.
- **Model Cascading:** começa sempre pelo modelo de menor custo; se a resposta atinge os critérios de qualidade, é aceita; senão sobe para o segundo, e assim por diante até o mais sofisticado. O modelo caro nem executa quando o barato basta. A decisão de escalar depende da resposta produzida, não só da expectativa de dificuldade.
- **Sinal de confiança:** medida objetiva usada para estimar a qualidade da resposta; acima do limiar aceita, abaixo continua escalando. Cada nível tem seu limiar, calibrado com dados representativos do domínio, nunca copiado de exemplos genéricos: 'arquiteturas AI-First são calibradas empiricamente'.
- **Evidência:** FrugalGPT (Chen, Zaharia e Zou, TMLR 2024): cascata dos mais baratos aos mais caros com qualidade alta e custo bem menor (os slides citam economia de até 98% mantendo o desempenho do melhor modelo; no paper, um exemplo aceita o modelo mais barato com score acima de 0,96, tenta o intermediário acima de 0,37 e só então escala). Em produto: Azure AI Foundry Model Router (nano a frontier, inclusive Claude e Llama; modos Balanceado, 1-2% de diferença de qualidade, Custo, 5-6%, e Qualidade) e Amazon Bedrock Intelligent Prompt Routing (exatamente dois modelos da mesma família, economia em torno de 30%).
- **Orçamento por tenant:** cada estudo clínico tem o seu; impede que um projeto consuma recursos ilimitados da infraestrutura compartilhada. Antes de qualquer modelo rodar, a plataforma verifica se o tenant ainda tem orçamento; se não, interrompe imediatamente.
- **Bloquear antes de gastar:** verificar depois de iniciar o processamento já consumiria recurso; é a lógica do Semantic Cache (o que pode encerrar a requisição vem o mais cedo possível). No teste da aula a verificação ficava depois da classificação de intenção e foi movida para o início do fluxo: as verificações mais baratas e capazes de interromper tudo vêm antes das caras.
- **Dois sinais de confiança:** um só não bastava no protótipo; considera-se (1) a qualidade da recuperação do contexto e (2) a confiança na própria resposta do modelo, para não aceitar resposta consistente construída sobre contexto mal recuperado.

### Como funciona
- **Fluxo do protótipo (slide):** verifica orçamento; busca a cláusula; síntese de CSR vai ao Tier 2 por **regra fixa** (alto risco, não por confiança); senão tenta o Tier 1 e, se a confiança ficar abaixo do limiar da cascata, escala ao Tier 2; registra gasto e auditoria (estudo, tier, se escalou, gasto acumulado). Busca vetorial, streaming, gate e trilha são os mesmos dos módulos anteriores: 'uma boa arquitetura cresce por composição'.
- **Canvas de calibração da cascata:** níveis de modelo (Tier 1, 2 e opcional 3, com custo estimado), limiares de confiança que disparam o escalonamento e critérios de orçamento por tenant. Calibre com pares reais (simples e certa, ambígua e duvidosa, fora do domínio); o limiar separa 'bastou' de 'duvidoso' com folga. Frouxo escala demais e corrói a economia; apertado aceita resposta pior sem economia real.
- **Missão Prática 5 (última):** dois tiers com custo estimado, limiar calibrado com dado real, orçamento por tenant (identificador, verificação antes da chamada, regra fixa para erro caro e irreversível, trilha com tier, escalada, gasto e limite) e três comportamentos documentados: resolvido no Tier 1, escalado ao Tier 2 e bloqueado por orçamento. Reflexão: que sinal indicaria que dois tiers devem virar três.
- **A arquitetura ao final:** o gateway do módulo 1 recebe tudo, agentes especializados organizam o processamento, a recuperação fundamenta, o Approval Gate protege decisões críticas, a observabilidade registra, e agora tudo opera sob uma estratégia explícita de custo: 'a arquitetura aprende a usar seus recursos de forma inteligente'.
- **O critério final (revisão da disciplina):** o objetivo é desenvolver critério, não só conhecer frameworks. Quando usar um agente? Quando manter regra determinística? Quando dividir entre especialistas? Quando executar em paralelo? Quando pausar para aprovação? Quando reutilizar uma resposta? Quando escolher um modelo mais caro? Quando bloquear uma requisição antes de estourar o orçamento?
- **Ponte para a próxima disciplina (slides):** 'regra fixa não é resolvido': e se um modelo pequeno, treinado só na síntese do CSR, nunca precisasse escalar? Isso abre Processamento de Dados e Fine-Tuning de Modelos.

### Onde aplicar
- Montar uma cascata de dois tiers para as tarefas de rotina, com regra fixa para o que é caro e irreversível.
- Medir os limiares com pares reais antes de fixar; revisitar quando trocar de modelo.
- Colocar identificador de tenant e verificação de orçamento no começo do gateway; bloquear antes da primeira chamada.

### Vantagens e limites
**Vantagens**
- O modelo caro só é usado quando necessário, reduzindo custo sem abrir mão da qualidade.
- Orçamento por tenant protege a plataforma compartilhada de um único consumidor.
- Reaproveita os componentes dos módulos anteriores por composição.

**Limites**
- Quando escala, a requisição paga os dois tiers e a latência soma.
- Cada nível a mais aumenta manutenção; limiares precisam de calibração e recalibração.
- A qualidade do sinal de confiança determina a qualidade da cascata (limite da métrica por embedding).

### 🚫 Armadilhas
- Copiar o limiar do Trial Forge (é específico do `nomic-embed-text` em português).
- Verificar o orçamento depois de começar o processamento.
- Deixar a síntese de CSR sujeita à cascata.
- Usar um único sinal de confiança e aceitar resposta fiel a uma cláusula errada.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Model Cascading | Barato primeiro, escala só se a confiança for insuficiente |
| FrugalGPT | Paper que formaliza a cascata de modelos por custo |
| Sinal de confiança | Medida da qualidade da resposta usada para decidir escalar |
| Tier 1 / Tier 2 | Modelo barato (sempre primeiro) / modelo caro (se necessário) |
| Regra fixa | Tarefa que vai direto ao tier caro, sem cascata (ex.: CSR) |
| Orçamento por tenant | Limite de gasto por estudo/cliente, checado antes da chamada |
| Bloquear antes de gastar | Verificação barata que interrompe tudo vem antes das caras |

---

## 💻 No código do repo

**Projeto:** [modulo-05-arquitetura-enterprise (protótipo de model tiering, canvas de cascata, atividade 5)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-05-arquitetura-enterprise)

O protótipo final da disciplina: `trialforge-model-tiering-prototype.js` (e o espelho `.py`) estende o gateway do módulo 4 com cascata de dois tiers reais no Ollama, dois sinais de confiança e orçamento por estudo reservado antes de qualquer chamada ao modelo.

**Fluxo**
1. Constantes: `MODELO_TIER1 = 'gemma4:e2b'`, `MODELO_TIER2 = 'gemma4:latest'`, `LIMIAR_CASCATA_BUSCA = 0.75` e `LIMIAR_CASCATA_RESPOSTA = 0.75`, custos ilustrativos de 0,001 e 0,01 por chamada (o código avisa que não são preços reais) e orçamentos `estudo-A` (0,05) e `estudo-B` (0,005, baixo de propósito).
2. `reservarOrcamento(estudoId, custoReservado)` **checa e debita no mesmo passo síncrono**, reservando o pior caso (Tier 1 + Tier 2 = 0,011, ou só o Tier 2 = 0,01 para o CSR); `liberarSobra` devolve a diferença. O comentário explica o race condition de 'check-then-act' que existiria checando e debitando depois de um `await`.
3. `processarComCascata(pergunta, estudoId)`: classifica a intenção (palavra-chave), reserva o orçamento (se negar, grava `bloqueado_por_orcamento` e retorna `null` sem chamar modelo), embeda a pergunta e busca a melhor cláusula (**confiança de busca**); `sintese_csr` vai direto ao Tier 2; senão gera com o Tier 1, calcula a **confiança de resposta** g(pergunta, resposta) = cosseno entre o rascunho e a cláusula, e escala se *qualquer* dos dois sinais ficar abaixo de 0,75.
4. O comentário no topo explica os dois sinais, descobertos rodando: numa pergunta fora do banco, a busca erra a cláusula (~0,65) mas o Tier 1 responde fielmente à cláusula errada (~0,82); só a confiança de resposta esconderia o erro de busca.
5. Só a síntese de CSR aciona o Approval Gate neste módulo: o código registra, como 'estreitamento de escopo deliberado' em relação ao módulo 4.5 (lá a baixa confiança também acionava o gate), que aqui o foco é custo, não HITL.
6. `verificarTrilhaAuditoria()` confere nas últimas 4 entradas do `audit-trail-tiering.jsonl` que a rotina ficou no Tier 1, a pergunta fora do banco escalou, o CSR foi ao Tier 2 e foi aprovado, e o estudo-B foi bloqueado.
7. `--volume` roda o extra de concorrência: 17 requisições via `Promise.all` em 4 estudos, com o estudo-F (cabe exatamente 2 reservas) recebendo 5 simultâneas; falha se algum estudo gastar além do limite.
8. `model-tiering-cascade-canvas.md` (tiers, calibração de dois sinais, checklist de tenant, os três comportamentos, reflexão sobre virar três tiers e a seção 6 de concorrência), `package.json` (`ollama`), `Atividade 5 - Módulo 5.pdf` e `Exemplo - Módulo 5.pdf`.

**Como rodar**
- `ollama pull nomic-embed-text && ollama pull gemma4:e2b && ollama pull gemma4`, `cd modulo-05-arquitetura-enterprise`, `npm install` e `node trialforge-model-tiering-prototype.js` (uma aprovação na síntese do CSR; dá para automatizar com `printf 's\n' | node ...`).
- `node trialforge-model-tiering-prototype.js --volume` para o teste de orçamento sob concorrência (não pede aprovação humana).
- Faça a Missão Prática 5 com *seus* modelos e limiares; o canvas indica onde consultar preço real (JSON de preços do LiteLLM, OpenRouter, calculadora do provedor) em vez de fixar custo no código.

**Armadilhas e achados no código**
- O `Exemplo - Módulo 5.pdf` está defasado em relação ao código final: descreve o Tier 1 como `gemma4:e2b-mlx` e a escalada decidida só pela confiança da busca, enquanto o protótipo atual usa `gemma4:e2b` e **dois** sinais; o código também ganhou `reservarOrcamento` onde o slide mostra `verificarOrcamento`.
- A ordem exata difere do texto da aula: a verificação de orçamento acontece antes de qualquer chamada de modelo ou de embedding, mas depois de `classificarIntencao` (regra local, sem custo), porque o custo máximo a reservar depende da intenção.
- Na cascata, o rascunho do Tier 1 já foi impresso em streaming antes de decidir escalar; o usuário vê duas respostas seguidas. O protótipo não resolve isso.
- O módulo 4 aciona o gate por confiança baixa; aqui só o CSR aciona: um leitor que espere 'os mesmos componentes' da aula encontrará essa mudança de escopo.
- O `audit-trail-tiering.jsonl` é acrescentado a cada execução (a confiança de resposta da 2ª pergunta varia entre 0,837 e 0,894 nas duas execuções de referência). A entrada `bloqueado_por_orcamento` não traz tier nem limite, menos que o checklist do canvas pede.
- Os custos 0,001 e 0,01 são ilustrativos; os limites de orçamento só fazem sentido em relação a eles.
- Simplificações em relação ao gateway do módulo 4: o banco tem 2 cláusulas e a busca é cosseno puro, sem Multi-Index, Hybrid, Agentic RAG nem Semantic Cache. Além disso, se a geração lançar exceção depois de `reservarOrcamento`, nada libera a reserva (não há `try/finally`); o `catch` final só registra `falha_tecnica`.

---

## 🔗 Para ir além
- [Repositório oficial do módulo 08 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia)
- [Pasta do módulo 5 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-05-arquitetura-enterprise)
- [FrugalGPT (arXiv 2305.05176)](https://arxiv.org/abs/2305.05176)
- [Microsoft: Model Router (Azure AI Foundry)](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-router)
- [AWS: Bedrock Intelligent Prompt Routing](https://aws.amazon.com/bedrock/intelligent-prompt-routing/)
- [AWS: Bedrock pricing (modelo serverless)](https://aws.amazon.com/bedrock/pricing/)

---

⬅️ [13 · Observabilidade de IA em escala e implantação híbrida: Kubernetes, Serverless e Edge](./13-observabilidade-e-implantacao-hibrida.md)  ·  [15 · Live Temporal: Process Manager, paralelismo e retry com workflows duráveis](./15-live-temporal-process-manager.md) ➡️
