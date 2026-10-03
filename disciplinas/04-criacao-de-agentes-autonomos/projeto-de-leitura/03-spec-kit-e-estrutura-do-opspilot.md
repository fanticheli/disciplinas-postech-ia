# 03 · Spec Kit e a estrutura inicial do OpsPilot: contrato de estratégia, trace e fábrica de modelo

> **Unidade 2 · Aulas 2 e 3** · Leitura: ~8 min · Bloco: Padrões de raciocínio e o núcleo do OpsPilot

## 🎯 Em uma frase
O OpsPilot nasce com o **GitHub Spec Kit** no lugar do framework artesanal da Unidade 1. A primeira spec fixa o contrato do agente: uma **interface única de estratégia** que devolve **resposta, trace tipado e métricas**, uma **fábrica única de modelo** (OpenRouter) e tools mock sobre um store em memória.

---

## 👵 Explicando para a vovó

Antes de contratar os cozinheiros (as estratégias), a gente padroniza a cozinha: todos recebem o pedido no mesmo formato, devolvem prato, receita seguida e tempo gasto, e compram ingrediente do mesmo fornecedor. Assim dá para trocar o cozinheiro sem reformar o restaurante.

---

## 🔧 Tecnicamente

### O que é
- **Spec Kit no repositório:** o init roda dentro do projeto existente, escolhe-se o agente (GitHub Copilot) e o shell. Ele cria `.specify/` (scripts, templates, memória com a Constitution) e comandos `speckit.*` em `.github/prompts`, além de specify, plan, tasks e implement: analyze, checklist, clarify, constitution, converge, taskstoissues e atualização de contexto do agente.
- **Revisar o que o framework instala:** a aula mostra duas falhas reais. A instruction “siga o Spec Kit” virou uma frase genérica e foi reescrita com as quatro etapas explícitas; a Constitution copiada da Unidade 1 trazia camadas do projeto anterior e foi atualizada (Express, MVC com service). A Constitution duplicada foi removida em favor da nativa do Spec Kit, para não haver duas fontes divergentes.
- **Stack e ambiente:** Zod, LangChain, LangGraph e cliente OpenAI apontando para o OpenRouter, Express e (na época) MySQL, que é escolha do exercício e não do módulo. Variáveis de ambiente carregadas pelo suporte nativo do Node, sem dependência extra. Scripts: `dev`, `arena`, `bench`, `test` e `typecheck`. Permissões por projeto em `.vscode/settings.json`.
- **OpenRouter:** gateway compatível com o formato OpenAI, com modelos pagos e gratuitos (marcados free). A chave é criada por projeto, com expiração (7 dias na demo), e fica no ambiente fora do Git. A aula usa a seleção automática de modelos gratuitos para não depender de um modelo lento. Trocar modelo é trocar configuração.
- **A spec do núcleo de raciocínio:** uma abstração de estratégia (identificador e `run`) que recebe entrada e devolve resposta final, trace e métricas; trace feito de eventos tipados (log, pensamento, ação com ferramenta e argumentos, observação, plano, crítica, resposta); métricas desde o início (chamadas ao LLM e latência); fábrica única de modelo (chave, nome do modelo, base URL, temperatura 0); tools mock com Zod (listar alertas por status, abrir incidente com título, serviço e severidade, resolver por id); seed repetível com cinco serviços e seis alertas (três firing, três resolved); teto de iterações em toda estratégia; arena; testes determinísticos sem rede.
- **Dois agentes, um processo:** o agente de código (Copilot) constrói; o agente de produto (OpsPilot) é o que está sendo especificado. A aula insiste em não confundir o raciocínio de um com as estratégias do outro.

### Como funciona
- O Spec Kit gera spec, checklist, plano, pesquisa, modelo de dados, contratos, quickstart e tarefas. A spec do núcleo saiu sem ambiguidades abertas e o plano foi revisado (inclusive a decisão de persistência).
- Antes do implement, o autor prepara **referências de código** (fábrica de modelo, tools, estratégia) para ancorar o padrão que quer. Elas não são o código final: orientam o agente. Ao escrever a referência, conferir o nome das variáveis no `.env` em vez de confiar no autocomplete.

### Onde aplicar
- Qualquer agente de produto em que várias estratégias precisam coexistir e ser comparadas.
- Projetos com agente de código em que a Constitution precisa refletir o projeto atual, não o anterior.

### Vantagens e limites
**Vantagens**
- Um contrato único (resposta, trace e métricas) deixa arena, bench e API independentes da estratégia.
- Fábrica única de modelo concentra chave, endpoint e parâmetros em um ponto.
- Trace tipado desde o dia 1 vira trilha de auditoria depois.

**Limites**
- O Spec Kit gera muitos arquivos (specs, contratos, checklists), e a revisão custa tempo.
- O framework não decide o design: sem referências de código, o resultado funciona, mas pode divergir do padrão pretendido.

### 🚫 Armadilhas
- Assumir que o arquivo está certo porque foi criado (a instruction genérica da aula).
- Manter duas Constitutions e deixar o agente consultar a errada.
- Variável de ambiente com nome divergente: a aplicação usa o default e você acha que está testando outra coisa.

> 💡 A live de 27/05 usa o Spec Kit com Claude Code (skills em `.claude/skills`) e percorre constitution, specify, clarify, checklist e plan numa tela estilo Netflix. Veja o [tópico da live](./16-live-sdd-enterprise-and-spec-kit-catalog.md).

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Spec Kit | Framework do GitHub para SDD com comandos speckit.* e memória de Constitution |
| ReasoningStrategy | Contrato comum: identificador e run que devolve resposta, trace e métricas |
| TraceEvent | Evento tipado do raciocínio (thought, action, observation, plan, critique, answer) |
| Fábrica de modelo | Função única que cria o cliente de chat configurado |
| OpenRouter | Gateway de modelos compatível com a API da OpenAI |
| Seed | Dados iniciais repetíveis: 5 serviços e 6 alertas |

---

## 💻 No código do repo

**Projeto:** [02-padroes-de-raciocinio-e-execucao (esqueleto)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/02-padroes-de-raciocinio-e-execucao)

Snapshot do commit da Unidade 2, já com Spec Kit. Aqui interessa o esqueleto: contratos de domínio, fábrica de modelo, tools mock, store em memória com seed e o construtor de trace. As estratégias estão no próximo tópico.

**Fluxo**
1. `package.json`: scripts `dev`, `arena` e `bench` com `node --env-file-if-exists=.env --import tsx` (arena e bench; o `dev` da U2 é `tsx src/index.ts` sem env file), `test` com `node --import tsx --test` e `typecheck` com `tsc --noEmit`.
2. `.github/copilot-instructions.md`: stack (Node 22, TS ESM, LangChain/LangGraph para OpenRouter, Zod, Express, MySQL via Sequelize, `node:test`), fluxo `speckit.specify, plan, tasks, implement` e um bloco entre marcadores `SPECKIT START/END` que aponta para o plano da feature corrente (atualizado pelo Spec Kit).
3. `src/domain/types.ts`: `ReasoningStrategy { name; run(input) }`, `StrategyResult { answer, trace, metrics }`, `TraceEvent` (thought, action com `tool` e `toolArgs`, observation, plan, critique com `round` e `approved`, answer) e `ExecutionMetrics { llmCalls, latencyMs }`.
4. `src/agents/model.ts` (re-exportado por `src/llm/factory.ts`): `createModel()` devolve `ChatOpenAI` com `baseURL` do OpenRouter, `temperature: 0` e modelo de `OPENROUTER_MODEL` (default `openai/gpt-4o-mini`); sem `OPENROUTER_API_KEY` lança erro.
5. `src/agents/tools.ts`: `list_alerts` (status firing, resolved ou all, default firing), `open_incident` (título, serviço, severidade) e `resolve_incident` (id), com Zod; nesta unidade as descrições são curtas.
6. `src/store/in-memory-store.ts`, `seed-data.json` e `seed.ts`: 5 serviços e 6 alertas (3 firing, 3 resolved, dos firing dois são critical); incidentes recebem id `inc-<timestamp>-<4 hex>`; erro de domínio `IncidentNotFoundError`.
7. `src/trace/builder.ts`: `buildTraceFromMessages` converte mensagens do LangChain (`AIMessage` com `tool_calls`, `ToolMessage`) em eventos tipados.

**Como rodar**
- `npm ci`, defina `OPENROUTER_API_KEY` no `.env` e rode `npm run arena -- --strategies react --input "quantos alertas críticos estão disparando?"`.
- `npm test` e `npm run typecheck` (os testes desta unidade não chamam a rede).

**Armadilhas e achados no código**
- Nenhum snapshot das pastas 02 a 05 tem `.env.example`, embora o UNIDADE.md mande copiá-lo. Ele só aparece a partir da pasta 06. O `.gitignore` tem `.env.*`; a negação `!.env.example` só existe de 06 em diante.
- O `package.json` da U2 lista `mysql2` e `sequelize` e a instruction diz “MySQL via Sequelize”, mas nada em `src` usa. A Unidade 3 troca por SQLite.
- Os arquivos `src/strategies/react.ts`, `src/tools/*.ts`, `src/llm/factory.ts` e `src/agents/plan-execute.ts` só re-exportam; as implementações moram em `src/agents/` (react, tools, model) e em `src/strategies/plan-execute.ts`. O layout das specs e o do código divergem.
- O default `openai/gpt-4o-mini` é pago: sem `OPENROUTER_MODEL` o projeto não roda a custo zero, apesar do README do módulo.

---

## 🔗 Para ir além
- [Snapshot da Unidade 2 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/02-padroes-de-raciocinio-e-execucao)
- [OpenRouter](https://openrouter.ai/)
- [GitHub Spec Kit](https://github.com/github/spec-kit)

---

⬅️ [02 · Os três padrões de raciocínio: ReAct, Plan-and-Execute e Reflection](./02-tres-padroes-de-raciocinio.md)  ·  [04 · ReAct, Plan-and-Execute e Reflection no código: arena e benchmark](./04-estrategias-arena-e-bench.md) ➡️
