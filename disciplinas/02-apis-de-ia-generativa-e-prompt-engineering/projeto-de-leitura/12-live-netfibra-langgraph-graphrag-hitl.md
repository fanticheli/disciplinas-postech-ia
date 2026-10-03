# 12 · Live NetFibra: suporte com LangGraph, GraphRAG em memória e human-in-the-loop

> **Live · 24/09/2026** · Leitura: ~11 min · Bloco: RAG, Multimodal e Observabilidade

## 🎯 Em uma frase
A live monta um agente de suporte da NetFibra: o texto do cliente vira **entidades de um grafo**, a vizinhança de **1 salto** vira fatos no prompt (**GraphRAG** sem Neo4j, com um dicionário Python), o fluxo roda num **LangGraph** e, quando um termo bate em dois nós (o *Nexus*), ele **pausa com `interrupt`** e só retoma quando a pessoa escolhe na tela (**human-in-the-loop**). A UI é Streamlit e o modelo vem pelo OpenRouter. Atenção: o `agent.py` que monta o grafo **não está na pasta**.

---

## 👵 Explicando para a vovó

Pense num atendente de provedor de internet com um mapa na parede: planos ligados às tecnologias que exigem, roteadores ligados ao que suportam, problemas ligados aos equipamentos que costumam causá-los. Quando o cliente fala, o atendente procura no mapa só as caixinhas citadas e as vizinhas, e responde com base nelas, em vez de chutar.

Se o cliente diz «meu roteador é o Nexus» e existem dois Nexus (600 e 1000), o atendente não adivinha: levanta a mão, pergunta «qual dos dois?» e guarda a conversa numa pasta com o número do protocolo. Quando o cliente responde, ele abre a pasta e continua exatamente de onde parou. Essa pasta é o estado salvo pelo LangGraph e o protocolo é o `thread_id`.

---

## 🔧 Tecnicamente

### O que é
- **GraphRAG sem banco de grafo:** a base é um dicionário `NODES` (21 nós: 5 planos, 5 equipamentos, 3 tecnologias, 4 regiões, 4 problemas) e uma lista `EDGES` de tuplas `(origem, destino, rótulo)` (30 relações). O próprio docstring diz que o dicionário «faz o papel do banco de grafo». Cada nó tem `label`, `type`, `aliases` e `attrs`. Compare com o [RAG com Neo4j](./08-rag-neo4j-planner-e-cypher-generator.md): lá o LLM gera Cypher; aqui a recuperação é código determinístico.
- **Gramática do grafo:** plano `requer` tecnologia; equipamento `suporta` tecnologia; equipamento `recomendado_para` plano; região `disponivel_em` tecnologia; problema `causa_possivel_de` equipamento ou tecnologia. Isso vira texto no prompt e desenho na tela.
- **Resolução de entidades:** `find_entities` procura cada alias como substring do texto em minúsculas e devolve `{alias: [ids]}`. Lista com mais de um id significa **ambiguidade**, e é o gancho do human-in-the-loop. O alias `nexus` existe de propósito nos dois modelos para criar essa ambiguidade na demo.
- **Recuperação de 1 salto:** `get_subgraph` pega as arestas que tocam as âncoras. O teste usa o conjunto fixo `anchors`, nunca o conjunto que cresce durante a iteração; senão um nó hub (como a Fibra Óptica) puxaria quase o grafo inteiro em cascata.
- **Ponte grafo para texto:** `facts_from_subgraph` converte nós e arestas em frases curtas para o prompt: `Turbo 300 (plano) — velocidade_contratada_mbps: 300, ...` e `Turbo 300 --[requer]--> Fibra Óptica`.
- **Fluxo do agente (inferido da UI):** a trilha em `app.py` lista cinco nós: `router`, `resolve_entities`, `retrieve_from_graph`, `generate_answer` e `escalate`. O resultado de `invoke` carrega as chaves `trace`, `subgraph` e `final_answer`, e a entrada é `{"user_input": ...}`. A definição real do grafo estaria em `agent.py`, que não existe na pasta; o que digo dele é hipótese.
- **Human-in-the-loop com `interrupt`:** quando um nó chama `interrupt(...)`, o dict devolvido por `invoke` ganha a chave `__interrupt__`; o payload (`question` e `candidates` com `id` e `label`) está em `result["__interrupt__"][0].value`. Para retomar: `invoke(Command(resume=chosen_id), config)` com o mesmo `thread_id`; a execução volta na linha do `interrupt` e o valor de `resume` é o retorno dela. Turno novo é sempre `invoke({"user_input": ...}, config)`.
- **Por que precisa de checkpointer:** o docstring de `app.py` afirma que o `MemorySaver` (dentro de `build_agent()`) tem de continuar vivo entre mensagens para o human-in-the-loop funcionar. Por isso `@st.cache_resource` monta o agente uma vez por processo.
- **Modelo pelo OpenRouter:** `llm.py` usa `ChatOpenAI` com `base_url="https://openrouter.ai/api/v1"`, chave em `OPENROUTER_API_KEY` (erro explícito se faltar), modelo em `OPENROUTER_MODEL` com padrão `meta-llama/llama-3.3-70b-instruct:free` e temperatura 0.2. É o mesmo gateway do [tópico 01](./01-openrouter-gateway-multi-modelo.md), agora consumido via LangChain.

### Como funciona
- **Streamlit refaz o script inteiro a cada interação (rerun).** Só `st.session_state` sobrevive: `thread_id` (um `uuid4` por aba do navegador, que isola conversas simultâneas), `history`, `pending` (a pausa), `last_subgraph` e `last_trace`.
- **Pausa na tela:** se `pending` existe, o `chat_input` nem aparece; a pessoa só vê a pergunta, um `st.radio` com os rótulos dos candidatos e o botão Confirmar. Ao confirmar, a UI mapeia o rótulo de volta para o id e chama `Command(resume=chosen_id)`.
- **Painel da direita:** `streamlit-agraph` desenha o subgrafo consultado (nós âncora maiores e com borda mais grossa; cor por tipo) e a «Trilha de execução» acende os nós do LangGraph que rodaram naquele turno, com um detalhe por nó; os que não rodaram ficam apagados.
- **Roteiro de demo (barra lateral) e o que cada pergunta exercita, conferido nos dados:** (1) «Quais tecnologias o Turbo 940 aceita?» casa só o plano Turbo 940, que `requer` Fibra Óptica; (2) Turbo 300 com Legacy R4: o roteador tem teto de 150 Mbps e Wi-Fi 4, e há a aresta velocidade baixa `causa_possivel_de` Legacy R4; (3) Wi-Fi que não alcança os cômodos: problema ligado ao Legacy R4; (4) «Meu roteador é o Nexus, funciona com o Turbo 940?»: `nexus` casa Nexus 600 e Nexus 1000, dispara o human-in-the-loop, e só o Nexus 1000 é `recomendado_para` o Turbo 940; (5) «quero falar com um atendente»: o nó de escalonamento da trilha (a regra que o aciona não está no repo).
- **Mesmo fluxo no terminal:** `quick_test.py` faz duas perguntas na mesma `thread_id`, imprime `[PAUSADO]` com os candidatos, lê o id com `input()` e retoma com `Command(resume=...)`. É a forma mais rápida de depurar sem esperar o rerun do navegador.
- **Logs:** `app.py` e `llm.py` usam loggers `netfibra.*` e o docstring manda acompanhar o terminal; a configuração do logging estaria em `agent.py` (ausente).

### Onde aplicar
- Suporte e pré-venda com base relacional pequena (catálogo, compatibilidade, cobertura): o grafo responde «o que se liga a quê» sem vetor.
- Prototipar GraphRAG com dicionário em memória antes de subir Neo4j; a interface (`find_entities`, `get_subgraph`, `facts_from_subgraph`) continua valendo quando o armazenamento trocar.
- Desambiguar antes de responder: pausar o fluxo para a pessoa escolher é mais barato que responder sobre o equipamento errado. Para o formalismo de pausa, limiar e auditoria, veja o [Approval Gate da Disciplina 08](../../08-arquitetura-de-sistemas-com-ia/projeto-de-leitura/10-approval-gate-confidence-threshold-e-audit-trail.md); aqui o gatilho é ambiguidade de entidade, não baixa confiança do modelo.
- Mostrar o caminho percorrido (subgrafo e trilha) como explicabilidade para quem opera o atendimento.

### Vantagens e limites
**Vantagens**
- Recuperação determinística e testável: o grafo é um dicionário e as funções são puras.
- Explicável: a tela mostra o subgrafo consultado e os nós executados.
- O human-in-the-loop retoma do ponto exato da pausa, sem reexecutar o turno desde o início.
- Zero infraestrutura de banco para a demo.

**Limites**
- Casamento por substring é frágil. Em cópia do `graph_data.py` conferi três efeitos: «RadioMax» também casa o alias `radio` (Tecnologia Rádio), «turbo 1000» casa o alias `turbo 100` e um «Nexus 600» explícito ainda produz o alias `nexus` com dois ids. Como o `agent.py` trata isso, não dá para saber.
- A base é estática e em memória; o `MemorySaver` também perde tudo ao reiniciar o processo.
- O modelo padrão é um Llama `:free` do OpenRouter; modelos gratuitos tendem a ter limite de taxa (hipótese, não testei).

### 🚫 Armadilhas
- `from agent import build_agent` sem o `agent.py`: `app.py` e `quick_test.py` não sobem.
- Usar `Command(resume=...)` para abrir turno novo, ou `{"user_input": ...}` para retomar uma pausa; são chamadas diferentes.
- Montar o agente a cada rerun do Streamlit: perde o checkpointer e a pausa nunca retoma.
- Compartilhar o `thread_id` entre abas ou usuários: as conversas se misturam.
- Testar a aresta contra o conjunto que cresce durante o loop do `get_subgraph`: a busca vira cascata e traz quase o grafo todo.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| GraphRAG | Recuperar o trecho de um grafo ligado às entidades da pergunta e entregá-lo como fatos ao modelo |
| Resolução de entidades | Mapear termos do texto para nós do grafo (aqui, por alias em substring) |
| Subgrafo de 1 salto | Âncoras mais vizinhos diretos, com as arestas que tocam as âncoras |
| `interrupt` | Pausa o grafo e devolve um payload ao chamador, com o estado preservado pelo checkpointer |
| `Command(resume=...)` | Retoma a execução pausada; o valor vira o retorno do `interrupt` |
| `thread_id` | Chave da conversa no checkpointer; um por aba do navegador |
| `MemorySaver` | Checkpointer em memória citado no docstring do app; não sobrevive a reinício |
| `st.session_state` | Único estado que sobrevive entre reruns do Streamlit |
| `@st.cache_resource` | Cria o recurso uma vez por processo (o agente, no caso) |

---

## 💻 No código do repo

**Projeto:** [lives/2026-09-24 (NetFibra · Suporte com IA)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-09-24)

App Streamlit de suporte com LangGraph, GraphRAG em memória e human-in-the-loop via OpenRouter. A pasta tem `app.py`, `graph_data.py`, `llm.py`, `quick_test.py`, `requirements.txt` e um README que só diz «Lives UNIPDS». Não há `agent.py`, então a parte do LangGraph (nós, estado, checkpointer) só aparece pelas chamadas que o app faz.

**Fluxo**
1. `graph_data.py`: `NODES` e `EDGES` com a gramática do grafo. O docstring diz «21 nós, 30 relações»; conferi (21 e 30).
2. `find_entities` faz o casamento por substring de aliases; `get_subgraph` expande 1 salto com `anchors` fixo; `facts_from_subgraph` gera as frases do prompt.
3. `llm.py`: `get_llm` cria o `ChatOpenAI` apontando para o OpenRouter e falha cedo sem `OPENROUTER_API_KEY`.
4. `app.py`: `get_agent()` com `@st.cache_resource`; `_init_session_state`; `apply_result` separa pausa (`__interrupt__`) de turno concluído; coluna do chat com `st.radio` e Confirmar durante a pausa; coluna do grafo com `agraph` e a trilha `TRACE_ORDER`.
5. `quick_test.py`: duas perguntas na mesma thread, tratamento do `__interrupt__` e retomada com `Command(resume=escolha)`.
6. `agent.py` (ausente): pelo uso, exporta `build_agent()`, devolve um grafo compilado com checkpointer e configura o logging. Nós, ordem das arestas e o ponto exato do `interrupt` são hipótese.

**Como rodar**
- `pip install -r requirements.txt` (streamlit 1.64.0, streamlit-agraph 0.0.45, langgraph 1.2.12, langchain 1.4.2, langchain-openai 1.6.5, langchain-core 1.6.4, python-dotenv 1.2.3, pydantic 2.13.5).
- Criar um `.env` com `OPENROUTER_API_KEY` (e, se quiser, `OPENROUTER_MODEL`); `llm.py` manda copiar um `.env.example` que não existe na pasta.
- `streamlit run app.py` ou `python quick_test.py`. Ambos importam `agent.build_agent`; sem o arquivo falham com `ModuleNotFoundError` (não executei o app; conferi que o arquivo não está na pasta).
- Só a camada de grafo roda sozinha: `graph_data.py` não tem dependências. Executei `find_entities` e `get_subgraph` numa cópia para conferir contagens e ambiguidades.

**Armadilhas e achados no código**
- **Bug:** `app.py` e `quick_test.py` importam `agent` (`build_agent`), mas não existe `agent.py` na pasta (são 6 arquivos: `README.md`, `app.py`, `graph_data.py`, `llm.py`, `quick_test.py`, `requirements.txt`).
- O README é só o título «Lives UNIPDS»; não há instrução de execução. `app.py` cita um `ROTEIRO.md` («Mais 5 exemplos») e `llm.py` cita um `.env.example`; nenhum dos dois existe.
- O docstring do `get_subgraph` diz que a Fibra Óptica «liga a 8 outros nós»; no código atual ela aparece em 10 relações (`get_subgraph(["tec_fibra"])` devolve 11 nós e 10 arestas).
- Na retomada do human-in-the-loop o `invoke(Command(...))` não tem `try/except`, ao contrário do caminho de mensagem nova; um erro do modelo ali estoura na tela do Streamlit.
- Dado possivelmente inconsistente: o Legacy R4 tem teto de 150 Mbps e é `recomendado_para` o plano Casa Conectada 200 (200 Mbps). Pode ser proposital para a demo; não verifiquei.
- Erros de digitação nos docstrings («Paraa», «ISso», «issoé»).

---

## 🔗 Para ir além
- [Pasta da live 24/09 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-09-24)
- [OpenRouter · base_url usada em llm.py](https://openrouter.ai/api/v1)
- [OpenRouter · chaves de API (citado em llm.py)](https://openrouter.ai/keys)

---

⬅️ [11 · Monitoramento com Langfuse e evaluation tests](./11-langfuse-e-evaluation.md)  ·  [README](./README.md)
