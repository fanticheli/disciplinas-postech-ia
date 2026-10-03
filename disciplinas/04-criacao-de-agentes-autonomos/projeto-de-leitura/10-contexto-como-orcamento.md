# 10 · Contexto como orçamento: medir tokens, podar e sumarizar em rolo

> **Unidade 5 · Aula 1** · Leitura: ~7 min · Bloco: Memória e contexto

## 🎯 Em uma frase
Contexto ativo é tudo que o modelo enxerga numa chamada. Primeiro **medir**: o uso real devolvido pela API e uma estimativa de ~4 caracteres por token. Depois, em vez de apagar mensagens antigas, **sumarizar em rolo** para preservar decisões, fatos e pendências.

---

## 👵 Explicando para a vovó

Imagine a mala de viagem com limite de peso. Primeiro você pesa o que levou, depois decide o que fica. E para as roupas que não cabem você não joga fora tudo: faz uma lista curta do que precisa lembrar (“casaco azul no hotel”) e leva a lista, que a cada viagem incorpora a anterior.

---

## 🔧 Tecnicamente

### O que é
- **Fontes do contexto ativo no OpsPilot:** system prompt fixo, memórias recuperadas, histórico recente, definições de tools e mensagem atual; no ReAct somam-se as observações das tools. Nada disso é gratuito, nem o system prompt e os schemas, que entram em toda chamada.
- **Context rot e “lost in the middle”:** mais tokens não é mais inteligência; informação no meio de um contexto grande recebe menos atenção que a do começo e do fim (Liu et al.). O objetivo é o menor contexto capaz de sustentar uma boa decisão.
- **Duas medições:** real (campo `usage` da resposta do modelo) para observabilidade, e estimada (cerca de 4 caracteres por token) para decidir cortes antes de pagar a chamada. As métricas do `/chat` ganham `promptTokens` e um `contextBreakdown` por fonte; numa execução da aula o prompt chegou a cerca de 6.751 tokens.
- **Pruning não é apagar:** a janela recente já é uma forma de pruning, mas cortar mensagens antigas pode perder uma decisão (o freeze de deploy que termina no dia 15, atualizado depois para o dia 20). A solução é **sumarização do histórico**: um resumo de ~150 tokens, em tópicos telegráficos, que preserva decisões, fatos (nomes, datas), incidentes e pendências, descarta conversa social e **incorpora o resumo anterior**.
- **Quando sumarizar:** não em toda request. Atualiza-se só quando um novo lote de mensagens sai da janela (na aula, oito).
- **Script de conversa longa:** simula um plantão de vários turnos e mostra o consumo por turno; é para rodar uma vez, porque faz muitas chamadas e gasta cota.

### Como funciona
- A spec 010 pede a função de estimativa e a captura do `usage` do LangChain; as métricas do chat passam a incluir `promptTokens` e `contextBreakdown`; o script de conversa longa passa a imprimir o consumo por turno; entram testes.
- A spec 011 cria a estrutura `conversation_summaries`. Antes do implement há uma referência para o prompt do sumarizador. Validação: depois de algumas rodadas, o resumo recuperado preserva “o freeze de deploys permanece ativo até o dia 15” mesmo fora da janela recente.

### Onde aplicar
- Conversas longas de suporte ou plantão em que decisões antigas ainda valem.
- Qualquer agente cujo custo por turno cresce com o histórico.

### Vantagens e limites
**Vantagens**
- Decisões deixam de depender de uma janela deslizante.
- O consumo vira dado: pruning por evidência, não por intuição.
- O resumo incremental mantém o custo do passado aproximadamente constante.

**Limites**
- A estimativa de 4 caracteres por token é grosseira (idioma e símbolos mudam o resultado).
- Sumarização é lossy e usa uma chamada extra de LLM.

### 🚫 Armadilhas
- Cortar o histórico sem sumarizar e perder decisões.
- Rodar o script de conversa longa repetidamente e queimar a cota.
- Sumarizar a cada request em vez de por lote.

> 💡 Para a escolha entre simplesmente aumentar a janela e cuidar do contexto, a indicação de leitura “Lost in the Middle” (TACL 2024) é a evidência empírica citada na apostila.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Contexto ativo | Tudo que é enviado ao modelo numa chamada |
| promptTokens | Tokens de prompt informados pela API do modelo |
| contextBreakdown | Estimativa de tokens por fonte (system, history, memories, message, summary) |
| Sumarização em rolo | Cada novo resumo incorpora o anterior |
| Context rot | Qualidade que cai quando o contexto acumula ruído |
| Lost in the middle | O meio do contexto longo recebe menos atenção que o início e o fim |

---

## 💻 No código do repo

**Projeto:** [05-gerenciamento-de-contextos (medição e sumarização)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/05-gerenciamento-de-contextos)

Specs 010 e 011: estimativa e usage real de tokens, breakdown por fonte e sumarização em rolo do histórico, mais o script que demonstra o context rot.

**Fluxo**
1. `src/context/tokens.ts`: `estimateTokens` = `Math.floor(chars / 4)`; `readLlmUsage` lê `usage_metadata` ou `response_metadata.tokenUsage` de forma defensiva (nunca lança); `sumPromptTokensFromMessages` soma o uso das mensagens do turno; `buildContextBreakdown` devolve cinco chaves (system, history, memories, message, summary).
2. `src/chat/history-summarizer.ts`: `HISTORY_LIMIT = 8`, `SUMMARY_BATCH_SIZE = 8`, `SUMMARY_TOKEN_TARGET = 150` e `SUMMARIZER_PROMPT`; `maybeSummarize` calcula `outside = total - 8` e `pending = outside - covered` e, com ≥ 8 pendentes, resume o próximo lote de 8 (em ordem) junto com o resumo anterior, guarda `covered_count` como marca d'água e emite o evento `summarize`; qualquer erro devolve `null` sem barulho.
3. Tabela `conversation_summaries` (`conversation_id`, `summary_text`, `covered_count`, `updated_at`) em `sqlite-conversation-store.ts`.
4. `scripts/conversa-longa.sh`: 30 turnos no mesmo `conversationId`; o turno 3 planta “o freeze de deploys termina dia 15”; imprime `promptTokens`, estimativas, `recalled` e `hist` por turno; usa `jq` e `BASE_URL` (default `localhost:3000`). `src/context/conversa-longa.script.test.ts` testa o script.

**Como rodar**
- `npm run dev` e, em outro terminal, `./scripts/conversa-longa.sh` (requer `jq`; faz até 30 chamadas reais).
- Observe `contextBreakdown` e o evento `summarize` depois que as mensagens passam da janela.
- `npm test` e `npm run typecheck`.

**Armadilhas e achados no código**
- `promptTokens` é a soma do `input_tokens` de todas as chamadas do turno no ReAct (não o tamanho de um prompt). Roteador, crítico e sumarizador, que usam saída estruturada ou ficam fora das mensagens da estratégia, não entram.
- O UNIDADE.md da U5 descreve o breakdown como system, memories, history, tools e message e fala de um evento `context` no trace; o código tem `summary` no breakdown, não mede as definições de tools e só emite o evento `summarize`.
- Um resumo acima de ~150 tokens é cortado por caracteres (`slice(0, 600)`): fica o começo e se perde o fim.
- A sumarização falha em silêncio (`catch` devolve `null`): se o modelo cair, o resumo simplesmente não avança.
- O script cita o serviço “notifications”, que não existe no seed, e depende de `jq`; a aula manda rodá-lo uma única vez.

---

## 🔗 Para ir além
- [Lost in the Middle (arXiv:2307.03172)](https://arxiv.org/abs/2307.03172)
- [Snapshot da Unidade 5 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/05-gerenciamento-de-contextos)
- [UNIDADE.md da Unidade 5](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/05-gerenciamento-de-contextos/UNIDADE.md)

---

⬅️ [09 · Memória do agente: conversa persistente, memória semântica com embeddings e refletor de aprendizado](./09-memoria-episodica-e-semantica.md)  ·  [11 · Context stitching: ContextBuilder com teto, prioridade e regra de corte por seção](./11-context-stitching-contextbuilder.md) ➡️
