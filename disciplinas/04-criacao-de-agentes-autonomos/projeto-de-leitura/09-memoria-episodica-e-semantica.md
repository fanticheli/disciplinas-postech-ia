# 09 · Memória do agente: conversa persistente, memória semântica com embeddings e refletor de aprendizado

> **Unidade 4 · Aulas 1 e 2** · Leitura: ~10 min · Bloco: Memória e contexto

## 🎯 Em uma frase
Um LLM não lembra de nada: **toda memória de agente é engenharia nossa**. O OpsPilot ganha **memória episódica** (mensagens por `conversationId`, janela recente), **memória semântica** (fatos por `userId`, embeddings locais, dedup e recall com limiar) e um **refletor** que destila aprendizados duráveis.

---

## 👵 Explicando para a vovó

A memória episódica é o diário do plantão, na ordem em que as coisas aconteceram. A semântica é o caderninho de preferências: “o João gosta de ver os críticos primeiro”. Para achar a anotação certa quando alguém diz “organize meu plantão”, o caderninho é pesquisado por significado, não pela palavra exata.

O refletor é o assistente que, depois de cada conversa, risca uma frase do que vale guardar e ignora o resto.

---

## 🔧 Tecnicamente

### O que é
- **O problema:** o agente respondia a um pedido de incidente e, na requisição seguinte, não sabia o nome do usuário. Cada request é uma execução nova; produtos como GPT e Gemini parecem contínuos porque há memória construída ao redor do modelo.
- **Camadas:** *working memory* (a conversa em andamento), memória de longa duração (como o arquivo de instructions, declarada por nós), *episódica* (diário do que aconteceu, em ordem) e *semântica* (fatos e preferências destilados). Persistir não basta: o desafio é a relevância, trazer de volta só o que ajuda naquele turno.
- **Episódica:** uma Conversation Store (criar, anexar, recuperar as últimas mensagens) na mesma SQLite; o `/chat` aceita `conversationId` opcional e o devolve; a aula começa com janela de 12 mensagens, e a métrica `historyMessages` mede o peso da memória.
- **Embedding:** representação numérica do texto (384 dimensões no `all-MiniLM-L6-v2`); textos de sentido parecido ficam próximos. A similaridade usa produto escalar sobre vetores normalizados, equivalente ao cosseno. O modelo roda localmente (dezenas de MB): sem custo de API, sem enviar preferência do usuário para fora, e a escala é de dezenas de memórias por usuário. Com milhões de vetores a resposta seria outra.
- **Memory Store por userId:** `remember` (com deduplicação: similaridade acima de 0,92 não grava de novo) e `recall` (no máximo 3, e só acima de um limiar de 0,3, porque sempre existem três “melhores”, mesmo ruins). Contexto é orçamento: memória irrelevante é ruído.
- **Refletor de aprendizado:** depois da resposta, uma chamada com saída estruturada decide se há um fato durável; pedido pontual e segredo não viram memória. Há também o esquecimento: o usuário precisa poder pedir para remover algo.
- **Validação da aula:** o nome informado num `conversationId` volta na pergunta seguinte; a preferência “críticos primeiro” é gravada, gravar de novo devolve `stored: false` (dedup) e “organize meu plantão” recupera a memória e ordena a resposta; a métrica mostra uma memória recuperada e zero mensagens de histórico.
- **Referências:** Generative Agents (Park et al.) define observação, reflexão e planejamento, o desenho que o refletor implementa em escala reduzida; Hands-On LLMs (Alammar e Grootendorst) aprofunda embeddings e busca semântica.

### Como funciona
- Fluxo do turno com memória (U4): criar ou carregar a conversa, ler as últimas mensagens, fazer recall com a mensagem atual, anexar a mensagem do usuário, executar a estratégia com mensagem enriquecida, anexar a resposta, agendar o aprendizado sem bloquear.
- Testes: SQLite em memória e, na spec de memória semântica, embeddings reais (não fake), possíveis porque o modelo é local.
- O que acontece quando a janela e as memórias crescem demais é o tema dos tópicos [10](./10-contexto-como-orcamento.md) e [11](./11-context-stitching-contextbuilder.md).
- Na validação, a aula mostra defeitos comuns de agente de código: a rota de memórias gerada pelo agente estava incompleta e foi corrigida no Cursor; o formato da resposta ainda precisou de ajuste.

### Onde aplicar
- Assistentes que precisam de continuidade (plantão, suporte) sem reenviar histórico inteiro.
- Preferências por usuário recuperadas por significado, não por palavra exata.

### Vantagens e limites
**Vantagens**
- Continuidade entre requests e entre reinícios.
- Dedup e limiar mantêm a memória limpa e o contexto enxuto.
- Embeddings locais: privacidade e custo zero de API.

**Limites**
- Limiar e dedup são números heurísticos (0,92 e 0,3) que dependem do modelo e dos dados.
- Busca linear em memória serve para dezenas de itens por usuário, não para milhões.
- Cada refletor é uma chamada extra de LLM por turno.

### 🚫 Armadilhas
- Guardar tudo e nunca recuperar, ou recuperar demais e inflar o contexto.
- Esquecer o limiar de relevância: “top 3” sempre devolve três, mesmo irrelevantes.
- Gravar pedido pontual ou segredo como memória permanente.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Working / episódica / semântica | Conversa atual, diário ordenado e fatos destilados |
| conversationId / userId | Chave do fio de conversa / chave de isolamento das memórias |
| Embedding | Vetor numérico do texto; sentidos parecidos ficam próximos |
| all-MiniLM-L6-v2 | Modelo local de embeddings de 384 dimensões usado no curso |
| Dedup 0,92 | Similaridade acima disso é considerada a mesma memória |
| Gate 0,3 / top 3 | Recall devolve até 3 memórias e só as acima de 0,3 |
| Refletor | Chamada pós-resposta que destila um fato durável |

---

## 💻 No código do repo

**Projeto:** [04-memoria-e-reflexao-em-agentes-autonomos](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/04-memoria-e-reflexao-em-agentes-autonomos)

Specs 007 (conversa persistente), 008 (memória semântica) e 009 (refletor). A conversa persistente já aparece na pasta 03 (commitada junto com o MCP). Os trechos abaixo descrevem o snapshot 04 e, quando difere, o final.

**Fluxo**
1. `src/store/sqlite-conversation-store.ts`: tabelas `conversations`, `messages` (`role` com CHECK user ou assistant, chave estrangeira, índice por conversa) e, depois, `conversation_summaries`; métodos `create`, `append`, `lastMessages(limit)` e outros; conversa inexistente lança `ConversationNotFoundError` (404).
2. `src/chat/run-chat.ts` (U4): `HISTORY_LIMIT = 12`; `lastMessages`, `recall`, `append` do usuário, estratégia com a mensagem enriquecida (`Relevant memories:` e `Current message:`), `append` da resposta e `scheduleLearning` sem aguardar. A partir da U5 o limite cai para 8 e o fluxo migra para o grafo de produção; `run-chat.ts` permanece, mas só os testes e `formatHistoryForPrompt` o usam.
3. `src/memory/embeddings.ts`: `pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2")` do `@huggingface/transformers`, pooling média e normalização; confere 384 dimensões; singleton preguiçoso; falha vira `EmbeddingError`.
4. `src/memory/memory-store.ts`: `SqliteMemoryStore` com tabela `memories` (embedding como BLOB Float32); `remember` deduplica com `dot > 0.92` e devolve `stored: false`; `recall` pontua tudo, filtra `>= 0.3`, ordena e pega 3; `forget(userId, id)`.
5. `src/memory/learning-reflector.ts`: `learningReflectionSchema { hasLearning, fact }`, prompt que recusa pedido pontual e segredo, `scheduleLearning` (best-effort, nunca quebra o chat) e, nas correções “war room”, `prepareMemoriesForTurn`: para pedidos de organizar o plantão, aguarda o refletor antes do recall.
6. `src/memory/chat-user-context.ts`: `AsyncLocalStorage` com o `userId` do turno, usado pela tool `forget_preference`; `POST /memories` em `server.ts` (201 se gravou, 200 se duplicado); `src/agents/system-prompt.ts` define o formato Resumo, Achados e Próximos passos e a ordenação por severidade.

**Como rodar**
- `npm run dev`; na primeira execução (e na primeira vez que o `npm test` toca o embedder) o modelo de embeddings é baixado.
- `curl -X POST localhost:3000/chat -d '{"message":"me chame de Thiago e abra um incidente low no catalog","userId":"u1"}'`, guarde o `conversationId` e pergunte “qual é o meu nome?” no mesmo id.
- `curl -X POST localhost:3000/memories -d '{"userId":"u1","fact":"prefere ver alertas críticos primeiro"}'` e depois peça “organize o meu plantão”.

**Armadilhas e achados no código**
- O `npm test` baixa o modelo de embeddings na primeira execução (`embeddings.test.ts` usa o modelo real e levou o timeout para 180 s), embora o README do módulo diga que os testes usam fakes e não chamam a rede.
- A janela era de 12 mensagens na U4 (como na apostila) e é 8 do snapshot 05 em diante.
- `GET /memories` e `DELETE /memories` ficaram fora do escopo (UNIDADE.md). O esquecimento existe como tool `forget_preference`, que apaga o primeiro resultado do recall (qualquer score acima de 0,3): pode apagar uma memória parecida, mas errada (hipótese).
- O refletor roda a cada mensagem (uma chamada extra de LLM que não entra em `llmCalls`) e vê só a mensagem do usuário, não a resposta.
- Há remendos em português para a demo do plantão (correções “war room”, a partir da pasta 06): o prompt do refletor manda gravar um fato de ordenação (`PLANTAO_ORG_MEMORY_FACT`) sempre que o usuário pede para “organizar” o plantão, mesmo sem declarar preferência; regexes (`organiz`, `priorid`, `severidade`, `order`) fazem o turno esperar o refletor antes do recall; e `buildMemoryRecallQuery` acrescenta texto fixo (“preferência organização plantão”, “ordenar Achados por severidade…”) à query do recall. O “críticos primeiro” da War Room vem em parte desses remendos e do system prompt, não só da similaridade semântica.
- O `UNIDADE.md` da U4 cita um evento `learning` no trace; o código não tem esse tipo de evento (`TraceEventType` não o lista) e o refletor grava direto na store.
- O `userId` vem do corpo e não há autenticação: quem sabe o id lê e grava as memórias dele.

---

## 🔗 Para ir além
- [Generative Agents (arXiv:2304.03442)](https://arxiv.org/abs/2304.03442)
- [Snapshot da Unidade 4 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/04-memoria-e-reflexao-em-agentes-autonomos)
- [UNIDADE.md da Unidade 4](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/04-memoria-e-reflexao-em-agentes-autonomos/UNIDADE.md)

---

⬅️ [08 · MCP: o OpsPilot como servidor de ferramentas, outra porta para a mesma aplicação](./08-mcp-servidor-do-opspilot.md)  ·  [10 · Contexto como orçamento: medir tokens, podar e sumarizar em rolo](./10-contexto-como-orcamento.md) ➡️
