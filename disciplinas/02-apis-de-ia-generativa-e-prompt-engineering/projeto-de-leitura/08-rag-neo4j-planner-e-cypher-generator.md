# 08 · RAG com Neo4j: arquitetura, Query Planner e Cypher Generator

> **Unidade 6 · Aulas 1 a 3** · Leitura: ~11 min · Bloco: RAG, Multimodal e Observabilidade

## 🎯 Em uma frase
Em vez de dashboards e queries fixas, o usuário pergunta em linguagem natural e o sistema **planeja**, **gera queries Cypher** com o schema real do Neo4j e executa em múltiplos passos. A decisão é usar **estrutura** (grafo), não vetor, embeddings nem busca semântica.

---

## 👵 Explicando para a vovó

A senhora tem um fichário enorme ligando alunos, cursos e compras com barbantes. Pergunta: «quais cursos as pessoas compram juntos?». Um assistente traduz a pergunta para o idioma do fichário, vai buscar e responde.

Para perguntas grandes, ele primeiro quebra em perguntas pequenas, responde cada uma e junta no final.

---

## 🔧 Tecnicamente

### O que é
- **O problema:** relatórios com queries fixas, endpoints específicos e dashboards pré-definidos exigem criar query, endpoint, visualização e fazer deploy a cada análise nova. Com LLM e geração estruturada o sistema entende a pergunta, faz plano, gera queries dinâmicas, executa, interpreta e responde.
- **Por que sem vetor:** tanto humanos quanto IAs trabalham melhor com dados estruturados; se já se extrai JSON, dá para gerar queries estruturadas, que são validáveis, executáveis, retentáveis, corrigíveis e encadeáveis.
- **Por que Neo4j:** grafos são ideais para perguntas como quais cursos são comprados juntos, quem compra A tende a comprar qual outro, relação entre progresso e compra, alunos com comportamento semelhante. Também força pensar em relacionamentos, que LLMs identificam bem.
- **Dados do template:** Faker gera Students, Courses, Purchases, Progress, métodos de pagamento e status de reembolso, populados por script de seed. O modelo não inventa dados, consulta dados reais.
- **Query Planner:** classifica a pergunta como simples (uma query) ou complexa (decompõe em subquestions), devolvendo nível de complexidade, se precisa decompor, as subquestions e o *reasoning* (para depurar por que quebrou).

### Como funciona
- Arquitetura do grafo, condicional e iterativa: Extract Question (falha aqui provavelmente é externa e encerra), Query Planner, Cypher Generator, Query Validation com `EXPLAIN`, loop multi-step controlado por estado e Analytical Response.
- Planner: o prompt usa exemplos simples («liste todos os cursos») e complexos (comparar faturamento entre cursos com alta e baixa conclusão, com agregação e múltiplos critérios). Se o modelo falhar, o fallback é seguro: assume simples e tenta uma única query.
- Ao decompor, o node marca `isMultistep`, salva as subquestions, zera `currentStep` e as estruturas de resultados intermediários (o planner pode ser chamado mais de uma vez).
- Limite de recursão: um loop sem condição de parada circula entre planner, generator e executor e estoura a proteção padrão do LangGraph (algo como 25 passos); sem ela, seria custo de tokens sem controle. Na aula, o multi-step foi forçado a false temporariamente até implementar o controle de passo.
- Cypher Generator: escolhe a pergunta atual (original se simples; subquestion do `currentStep` se multi-step; nulo se o índice sair do range), busca o schema com `Neo4jService.getSchema` (sem isso o modelo inventa labels e a query não compila) e injeta um **contexto de negócio** (estudante só tem progresso em curso comprado, status define pago ou reembolsado, progresso de 0 a 100).
- O prompt do gerador tem regras de sintaxe moderna e exemplos simples e complexos, escritos com tentativa e erro porque alguns modelos se perdem na sintaxe do Neo4j. A saída é `cypherQuerySchema` (campo `query`). Em multi-step, acumula na lista de subqueries; em pergunta simples, grava em `state.query`. A aula cita como referência o conceito de «skills» (prompts prontos que apontam para documentos de apoio sobre sintaxe, subqueries e padrões depreciados) e diz que reaproveitou parte desse conteúdo; o projeto não usa o mecanismo de skills.
- Infra do template: Docker Compose do Neo4j, seed, testes, services, validação de query e fechamento de conexão no shutdown. Sobe com `infra:up`, `seed` e `start`.
- O padrão (decompor, executar em loop com validação e correção) vale além do banco: geração de código com validação, edição de vídeo em etapas, conteúdo em múltiplas fases, automação com ferramentas.

### Onde aplicar
- BI conversacional e relatórios dinâmicos empresariais sem criar endpoint por pergunta.
- Análise financeira automatizada e orquestração de múltiplas APIs.
- Geração de código com validação automática e execução de comandos com retentativa.

### Vantagens e limites
**Vantagens**
- Perguntas novas sem deploy de query, endpoint ou dashboard.
- Decomposição aumenta a chance de acerto de cada query, importante com modelos gratuitos instáveis.
- Logs do step, da pergunta e do total de passos facilitam depurar loops e queries sem relação com a pergunta.

**Limites**
- Mais prompts, nodes, estados intermediários e caminhos condicionais.
- Modelos gratuitos erram na sintaxe do Cypher, exigindo validação e correção.
- Prompt do gerador precisa de iteração para acertar a taxa de sucesso.

### 🚫 Armadilhas
- Loop multi-step sem mecanismo de parada: estoura o limite de recursão e gasta tokens.
- Não injetar o schema do banco: o modelo inventa labels, relacionamentos e propriedades.
- Não zerar os acumuladores quando o planner roda de novo: carrega lixo de execuções anteriores.
- Acessar índice de subquestion fora do range ou deixar o grafo preso num step inválido.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Neo4j | Banco orientado a grafos, bom para relacionamentos |
| Cypher | Linguagem de consulta do Neo4j |
| Query Planner | Decide se a pergunta é simples ou complexa e a decompõe |
| isMultistep, currentStep, subQuestions | Estado que controla o loop multi-step |
| Schema do Neo4j | Labels, relações e propriedades injetados no prompt |
| Contexto de negócio | Regras do domínio que evitam queries inconsistentes |
| Limite de recursão | Proteção do LangGraph contra loops sem parada |

---

## 💻 No código do repo

O código (nodes, estado, loop e testes) está no projeto `06-rag-neo4j-students`, descrito no [tópico 09](./09-rag-neo4j-executor-correcao-resposta.md).

---

## 🔗 Para ir além
- [Mastering Advanced RAG Techniques (indicação de leitura 1)](https://medium.com/@sahin.samia/mastering-advanced-rag-techniques-a-comprehensive-guide-f0491717998a)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms)

---

⬅️ [07 · MCP, PromptTemplate e guardrails: bloqueio antes da tool call](./07-mcp-e-guardrails.md)  ·  [09 · RAG com Neo4j: executor, autocorreção e resposta analítica](./09-rag-neo4j-executor-correcao-resposta.md) ➡️
