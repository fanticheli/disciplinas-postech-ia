# 🎯 Disciplina 04 · O que vale estudar

> Análise de prioridade (opinião fundamentada no guia e na prática atual), não conteúdo da apostila. Premissas: leitor é engenheiro backend (TypeScript/Node e Python, APIs e serviços em AWS, Postgres, filas e jobs), com produto que usa LLMs em produção, automação de fluxos (Jira/Slack) e uso intenso de agentes de código; o objetivo é virar engenheiro de IA aplicada especialista (construir, avaliar, operar e governar sistemas com LLMs), não pesquisador de modelos.

## Veredito
O maior valor desta disciplina está em tratar o agente como sistema de engenharia: tools resilientes, contexto como orçamento, trace auditável e limites de autonomia. Esses temas valem direto no seu backend. A parte de ferramentas específicas (Spec Kit, Copilot, War Room, GitHub Pages) tem retorno menor e envelhece rápido.

Nota: ⭐⭐⭐⭐ (4 de 5). O núcleo (tópicos 07, 10, 11, 13) é sólido e transferível, mas o código do curso tem lacunas que o próprio guia lista e o terço final é mais demo do que prática.

Mais útil para quem já constrói serviços com LLM e precisa operá-los com custo, auditoria e segurança sob controle.

## Mapa de prioridade por tópico

| Tópico | Dia a dia | Especialista | Veredito |
|--------|-----------|--------------|----------|
| [00 · O agente de código por dentro](./00-agente-de-codigo-harness-e-context-engineering.md) | 🟢 | 🟡 | Implementar |
| [01 · Spec-Driven Development do zero](./01-spec-driven-development-do-zero.md) | 🟢 | 🟡 | Implementar |
| [02 · Os três padrões de raciocínio](./02-tres-padroes-de-raciocinio.md) | 🟡 | 🟡 | Conhecer |
| [03 · Spec Kit e a estrutura inicial do OpsPilot](./03-spec-kit-e-estrutura-do-opspilot.md) | ⚪ | ⚪ | Pular |
| [04 · ReAct, Plan-and-Execute e Reflection: arena e benchmark](./04-estrategias-arena-e-bench.md) | 🟡 | 🟢 | Aprofundar |
| [05 · Uma API que também é um agente](./05-api-que-tambem-e-um-agente.md) | 🟡 | 🟡 | Conhecer |
| [06 · Persistência real com SQLite](./06-sqlite-opsstore-e-prepared-statements.md) | ⚪ | ⚪ | Pular |
| [07 · Tools externas resilientes](./07-tool-externa-resiliente.md) | 🟢 | 🟢 | Implementar |
| [08 · MCP: o OpsPilot como servidor de ferramentas](./08-mcp-servidor-do-opspilot.md) | 🟡 | 🟡 | Conhecer |
| [09 · Memória do agente](./09-memoria-episodica-e-semantica.md) | 🟡 | 🟢 | Aprofundar |
| [10 · Contexto como orçamento](./10-contexto-como-orcamento.md) | 🟢 | 🟢 | Implementar |
| [11 · Context stitching: ContextBuilder](./11-context-stitching-contextbuilder.md) | 🟢 | 🟡 | Implementar |
| [12 · LangGraph: roteador e fallback](./12-langgraph-roteador-e-fallback.md) | 🟡 | 🟢 | Aprofundar |
| [13 · Observabilidade e limites de autonomia](./13-observabilidade-e-limites-de-autonomia.md) | 🟢 | 🟢 | Implementar |
| [14 · War Room e GitHub Pages](./14-war-room-e-github-pages.md) | ⚪ | ⚪ | Pular |
| [15 · Multi-agent systems](./15-multi-agent-systems.md) | ⚪ | 🟡 | Conhecer |
| [16 · Live de SDD enterprise](./16-live-sdd-enterprise-and-spec-kit-catalog.md) | 🟡 | ⚪ | Conhecer |

## ✅ Implemente no dia a dia

1. **Tools com erro como observação, timeout, retry com teto e validação Zod.**
   - Por que vale: toda tool que chama API externa falha em produção. Devolver o erro como texto ao agente mantém a resposta útil com dado parcial, e o trace explica a decisão. Validar a resposta 200 evita agir sobre JSON inesperado.
   - Primeiro passo mínimo: pegue uma tool que chama serviço externo e embrulhe com timeout curto, no máximo 2 tentativas e `safeParse` de um schema Zod. Em falha, retorne uma string de erro, sem lançar exceção. Acrescente espera entre tentativas (o guia aponta que o código do curso não tem backoff nem jitter, e trata 429 como erro final).
   - Quando não adotar: em tool de escrita crítica, falhe alto e deixe o fluxo decidir. Erro engolido em escrita esconde dano.
   - Tópico: [07](./07-tool-externa-resiliente.md).

2. **Trace por requisição, com requestId e logs que nunca contêm conteúdo.**
   - Por que vale: sem trace você não depura nem audita um agente. Minha análise: o formato (eventos tipados por requisição, p50/p95 por rota e modelo) é o que o mercado converge, e OpenTelemetry é o padrão aberto de observabilidade quando você crescer.
   - Primeiro passo mínimo: gere um `requestId` na entrada, anexe a todo log estruturado em JSON e grave os eventos do turno (tool chamada, observação, modelo usado, tokens) numa tabela Postgres. Nunca logue prompt, resposta ou segredo; transforme essa regra em teste, como a aula faz.
   - Quando não adotar: protótipo descartável. Plataforma de tracing dedicada só se o volume justificar.
   - Tópico: [13](./13-observabilidade-e-limites-de-autonomia.md).

3. **Limites de autonomia aplicados por mecanismo, não por instrução.**
   - Por que vale: "instrução não é permissão" é a lição mais reutilizável da disciplina, vale para seu produto e para o agente de código que você usa. Instrução no prompt o modelo pode ignorar; permissão do ambiente, hook e CI não.
   - Primeiro passo mínimo: classifique as tools do seu agente pela matriz de 4 faixas do tópico 13: decide sozinho (baixo risco, reversível); decide e registra de forma auditável; pede aprovação (destrutivas, gasto acima de um teto); nunca faz, nem com aprovação. Para as de escrita, exija aprovação humana (ou idempotência com confirmação). No agente de código, mantenha deny list, hook de pré-commit e CI como camadas separadas. Lembre que o guia mostra deny por padrão de texto não é sandbox.
   - Quando não adotar: aprovação em toda leitura gera fadiga e as pessoas passam a aprovar sem ler.
   - Tópicos: [00](./00-agente-de-codigo-harness-e-context-engineering.md), [13](./13-observabilidade-e-limites-de-autonomia.md).

4. **Contexto como orçamento: medir tokens por seção e ter regra de corte.**
   - Por que vale: custo e qualidade dependem do que entra no prompt. Medir por seção (system, memórias, histórico, resumo, mensagem) mostra onde cortar com evidência.
   - Primeiro passo mínimo: registre por requisição os tokens de cada seção, use o `usage` que o provedor devolve em vez da estimativa de 4 caracteres por token (o guia a chama de grosseira) e defina um teto só para histórico e memórias. Nunca corte system prompt nem a mensagem atual. Sumarize por lote, não a cada request.
   - Quando não adotar: conversas curtas e fluxos de uma chamada só. Orçamento mal calibrado pode cortar o que importa.
   - Tópicos: [10](./10-contexto-como-orcamento.md), [11](./11-context-stitching-contextbuilder.md).

5. **Spec curta antes de mudança grande, com agente de código num harness bem configurado.**
   - Por que vale: você usa agentes de código todos os dias. Instruções curtas e verificadas, tarefas pequenas (um commit cada) e conferir diff e comandos pedidos reduzem retrabalho. O guia lembra que instruction longa consome contexto permanente.
   - Primeiro passo mínimo: mantenha um único arquivo de instruções por repositório, curto, e abra o que o agente gravou para conferir. Para mudanças de mais de um commit, escreva spec com critérios de aceite e o que não fazer, antes do plano.
   - Quando não adotar: mudança de uma linha ou correção óbvia. O próprio guia aponta a cerimônia como desproporcional.
   - Tópicos: [00](./00-agente-de-codigo-harness-e-context-engineering.md), [01](./01-spec-driven-development-do-zero.md).

## 🔬 Aprofunde (rumo a especialista)

1. **Avaliação de agentes por estado e trajetória.**
   - Por que diferencia: quem mede só o texto da resposta não vê o agente que "explica bem e executa errado". Avaliação é o que separa especialista de quem faz demo.
   - Estudar além da aula: *AI Engineering* (Chip Huyen), capítulos de avaliação de sistemas com LLM; artigo ReAct para o conceito de trace de raciocínio.
   - Como praticar: monte 10 casos com checagem determinística do estado final (linhas no Postgres, mensagens enviadas), rode duas estratégias e registre chamadas, latência e acerto. Verificável: um relatório reproduzível que muda quando você piora o prompt de propósito. Cuidado com o crítico fail-open que o guia aponta.
   - Tópico: [04](./04-estrategias-arena-e-bench.md).

2. **Confiabilidade de sistemas com LLM: timeout, cancelamento, retry com jitter, circuit breaker e fallback de modelo.**
   - Por que diferencia: é engenharia de sistemas distribuídos aplicada a um cliente instável, onde você já tem vantagem. O guia mostra uma lacuna real: timeout que não cancela a execução (sem `AbortSignal`, tópico 05). Ele também alerta para não misturar roteamento com disponibilidade.
   - Estudar além da aula: *Release It!* (Michael Nygard), seções sobre timeouts, circuit breaker e bulkheads.
   - Como praticar: injete falhas (timeout, 429, 503) em testes e prove que o serviço cancela o trabalho pendente, respeita o teto de retry e troca de modelo registrando o evento no trace.
   - Tópicos: [05](./05-api-que-tambem-e-um-agente.md), [07](./07-tool-externa-resiliente.md), [12](./12-langgraph-roteador-e-fallback.md).

3. **Memória e recuperação semântica com avaliação.**
   - Por que diferencia: memória ruim polui o contexto e cria risco de privacidade. Saber calibrar limiar, deduplicar e esquecer é diferencial.
   - Estudar além da aula: *Hands-On Large Language Models* (Alammar e Grootendorst), capítulos de embeddings e busca semântica; documentação oficial do pgvector para levar a ideia ao Postgres (confira a versão atual).
   - Como praticar: crie um conjunto de pares pergunta e memória esperada com paráfrases, varie o limiar e meça precisão e revocação. O guia diz que 0,92 e 0,3 são heurísticos, então prove os seus.
   - Tópico: [09](./09-memoria-episodica-e-semantica.md).

4. **Segurança e governança de agentes.**
   - Por que diferencia: é o ponto que mais separa demo de produção. O guia traz sinais concretos: `userId` vindo do corpo sem autenticação, aprovação que cobre a requisição inteira e não a ação, e instrução embutida em observação de tool.
   - Estudar além da aula: a apostila indica Anthropic, *Building Effective Agents*; complemente com a documentação oficial do OWASP sobre riscos de aplicações com LLM (confira a versão atual).
   - Como praticar: injete uma instrução maliciosa no retorno de uma tool de teste e verifique que nenhuma tool de escrita roda sem aprovação por ação. Autentique o usuário pelo token, não pelo corpo.
   - Tópicos: [05](./05-api-que-tambem-e-um-agente.md), [13](./13-observabilidade-e-limites-de-autonomia.md), [08](./08-mcp-servidor-do-opspilot.md).

5. **Orquestração com estado durável: grafo, interrupt e checkpoint.**
   - Por que diferencia: aprovação humana que sobrevive a restart exige estado persistido. O guia mostra aprovações num `Map` em memória, que somem no restart.
   - Estudar além da aula: documentação do LangGraph JS sobre interrupt e checkpointers (confira a versão atual; muda rápido).
   - Como praticar: pause um fluxo esperando aprovação, reinicie o processo e retome do ponto onde parou, com o estado em Postgres.
   - Tópico: [12](./12-langgraph-roteador-e-fallback.md).

## 🧂 Pode ficar no superficial

- **Spec Kit e configuração do OpsPilot (03) e a live (16):** ferramenta e fluxo que mudam rápido. Fique com o princípio (spec com critérios de aceite, o argumento dos 36%, que o guia diz ser simplificação de itens independentes). A live tem várias inconsistências entre artefatos, boa para ler com senso crítico, não para decorar.
- **SQLite e prepared statements (06):** o guia usa `node:sqlite`, que é experimental, e você já trabalha com Postgres. O que importa (nunca concatenar SQL, CHECK, Zod na fronteira) você já aplica.
- **War Room e GitHub Pages (14):** front e deploy estático fogem do seu foco. Guarde só a ideia de uma lógica de negócio com várias portas e o risco de expor backend sem autenticação por túnel público.
- **Multiagente (15):** conheça supervisor, papéis e handoffs, mas use por último. O guia mostra mais chamadas, latência e custo (cerca de dez chamadas na demo), e a própria indicação *Building Effective Agents* é contraprova ao entusiasmo: comece pelo mais simples.
- **MCP (08):** vale entender como protocolo para expor tools a vários clientes. Minha análise: o mais comum é consumir servidores existentes; construir um próprio compensa quando há mais de um cliente para a mesma regra de negócio (confira a versão atual da especificação).

## ⚠️ Cuidados e lacunas

- O código do curso é didático, não referência de produção. O guia lista achados: `status: error` nunca é persistido, o handoff perde o campo `to` na auditoria, planner, roteador e crítico engolem erros do modelo, e as aprovações ficam em memória.
- Muita coisa é sensível a versão: Copilot, Cursor, Claude Code, Spec Kit, MCP, LangGraph e `node:sqlite` mudam entre versões. Confira a versão atual antes de copiar configuração.
- A aula "Guardrails, Revisor e Delegação" não desenvolve revisor nem delegação, segundo o guia. Para revisão independente de agente, você terá de estudar por conta.
- Bench com modelo real varia com o modelo do dia e consome cota. Os números da aula (chamadas, 36%, 0,92, 0,3) são ilustrativos. O custo calculado cobre só tokens de prompt com taxa única, então use como ordem de grandeza.
- O guia verificou testes, mas parte das afirmações sobre comportamento é hipótese (por exemplo, `SQLITE_BUSY` sob concorrência e o alcance da allow list). Trate como pontos a testar.

## ✔️ Como saber que aprendeu

- Consigo explicar, sem consultar, a diferença entre instrução e permissão e apontar em qual camada (ambiente, hook, CI) cada guardrail do meu fluxo é aplicado.
- Meu serviço com LLM tem `requestId` em todo log, trace por turno consultável por esse id e um teste que prova que logs não contêm prompt nem resposta.
- Tenho um bench com pelo menos 10 casos que verifica o estado final do sistema, e injeção de falha que prova timeout, teto de retry e fallback de modelo funcionando.

Veja também a [trilha consolidada](../../study-roadmap.md).
