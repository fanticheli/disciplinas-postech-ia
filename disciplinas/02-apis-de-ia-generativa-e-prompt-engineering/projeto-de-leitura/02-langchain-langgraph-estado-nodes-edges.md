# 02 · LangChain.js e LangGraph: pipes, estado, nodes e edges

> **Unidade 2 · Aulas 1 a 3** · Leitura: ~11 min · Bloco: LangGraph e Saída Estruturada

## 🎯 Em uma frase
No **LangChain/LangGraph** você declara um **grafo**: o **estado** conecta os **nodes** (funções que leem e atualizam o estado) e as **edges** definem o caminho, inclusive condicional. Isso troca uma função gigante por uma máquina de estados organizada, testável e observável.

---

## 👵 Explicando para a vovó

Pense numa recepcionista com uma prancheta: lê o pedido, decide para qual mesa mandar, e todo mundo passa pelo balcão de saída. O LangGraph é essa prancheta, em que a senhora desenha as mesas (nodes), as setas (edges) e as regras de decisão.

O caderno de anotações que a recepcionista leva de mesa em mesa é o estado: o que uma mesa escreve, a próxima lê.

---

## 🔧 Tecnicamente

### O que é
- **Chain (encadeamento):** compor funções, transformações e chamadas de modelo em sequência, em que cada etapa recebe um input, processa e passa adiante. Pode ser linear ou formar grafos com bifurcações e condições.
- **LangChain.js:** framework open source (também popular em Python). A camada **LangSmith** é a observabilidade em nuvem: mostra quais ferramentas foram chamadas, os passos executados e o prompt enviado. O plano gratuito de tracing já entrega valor.
- **Estado do grafo:** o shape do que existe para os nodes lerem e escreverem. Na aula tem três campos: `messages` (histórico, exigido pelo chat do Studio), `output` (resultado devolvido pela API) e `command` (enum uppercase, lowercase ou unknown, a variável de decisão).
- **Node:** função que recebe o estado e devolve estado atualizado. **Edge:** transição; as condicionais decidem o próximo node a partir do estado. **Compile:** quem materializa o workflow executável.
- **LangGraph Studio:** interface web para executar o grafo, ver o estado antes e depois de cada node e reexecutar a partir de um node específico.

### Como funciona
- Gerador de apps (CLI) cria um boilerplate com grafo, testes e integração. A aula usa como ponto de partida, mas remove dependências desnecessárias (por exemplo framework de teste extra, já que o Node tem test runner nativo) e confere versões: o template pode vir em versão beta antiga enquanto a estável já é 1.x.
- Tracing no LangSmith: crie uma chave com nome do projeto (de preferência com validade limitada), guarde no `.env` e ative `LANGCHAIN_TRACING_V2=true` com um nome de projeto. A aula cita `LANGCHAIN_API_KEY`; o repo usa `LANGSMITH_API_KEY`. Faltando o `true` por extenso, o tracing não aparece.
- O arquivo de configuração do grafo aponta para a função exportada que constrói e exporta o grafo compilado; se o export estiver errado, o Studio não encontra o grafo nem habilita o chat.
- Na versão 1.x o chat do Studio exigiu modelar o estado com Zod e o tipo de mensagens do LangGraph, seguindo uma issue do repositório.
- Organização: um arquivo por node, um para a construção do grafo e uma factory que exporta o grafo para o Studio. O `identifyIntent` pega a última mensagem, normaliza, começa com `command = unknown` e detecta palavras-chave (por enquanto sem IA).
- A API chama `graph.invoke` com o estado inicial (uma `HumanMessage`, command e output vazios) e devolve `response.output`. Um node `chatResponse` materializa o output como AI message para o Studio mostrar a resposta.
- Runtime: com TypeScript direto no Node, o `package.json` precisa de `type: module` e os imports levam a extensão `.ts`.

### Onde aplicar
- Qualquer fluxo multi-step com decisão: classificar a intenção e rotear para tratamentos diferentes.
- Inserir etapa de validação ou sanitização entre dois passos sem reescrever tudo.
- Medir performance de cada etapa individualmente, porque cada node é observável.
- Depurar visualmente no Studio e reexecutar a partir de um node após ajustar o código.

### Vantagens e limites
**Vantagens**
- Fluxo declarado explicitamente facilita teste, manutenção e troca de modelo.
- Tracing mostra nodes, prompts e estado em cada passo; sem observabilidade você fica no escuro.
- O mesmo desenho aguenta trocar o node de intenção por um classificador com LLM depois.

**Limites**
- Mais conceitos e arquivos do que uma chamada direta ao modelo.
- Templates e versões mudam rápido e podem não estar alinhados com o que você estuda.
- O Studio pode duplicar mensagens dependendo de como a AIMessage é injetada no histórico.

### 🚫 Armadilhas
- Confiar cegamente no boilerplate: confira versões e remova o que não precisa.
- Esquecer `type: module` e as extensões `.ts` nos imports e perder tempo com erro de módulo.
- Usar o Studio como único mecanismo de validação: ele é depurador visual, o contrato da API se garante com teste.
- Exportar o grafo errado no arquivo de configuração do Studio.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Chain | Encadeamento de etapas em que cada saída alimenta a próxima |
| StateGraph | Grafo cujo estado é descrito por um schema |
| Node | Função que lê o estado e devolve o estado atualizado |
| Edge condicional | Transição que depende do estado ou da saída anterior |
| compile | Materializa o grafo como workflow executável |
| LangSmith | Observabilidade e tracing em nuvem do ecossistema LangChain |
| LangGraph Studio | UI para executar, inspecionar estado e reexecutar nodes |
| messages, output, command | Os três campos de estado do grafo da aula |

---

## 💻 No código do repo

O código deste tópico e do próximo está no projeto `02-langchain-intro`, descrito no [tópico 03](./03-pipeline-condicional-fallback-testes.md). A live de 24/09 aprofunda estado, nodes e edges num agente de suporte com pausa (`interrupt`) e retomada (`Command(resume=...)`): [Live NetFibra](./12-live-netfibra-langgraph-graphrag-hitl.md).

---

## 🔗 Para ir além
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms)

---

⬅️ [01 · OpenRouter: laboratório de modelos, roteamento e fallback](./01-openrouter-gateway-multi-modelo.md)  ·  [03 · Pipeline condicional, node de fallback e testes automatizados](./03-pipeline-condicional-fallback-testes.md) ➡️
