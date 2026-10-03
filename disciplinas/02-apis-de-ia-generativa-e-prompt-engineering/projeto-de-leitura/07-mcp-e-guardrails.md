# 07 · MCP, PromptTemplate e guardrails: bloqueio antes da tool call

> **Unidade 5 · Aulas 2 e 4** · Leitura: ~13 min · Bloco: Memória e Segurança

## 🎯 Em uma frase
Tools via **MCP** transformam o modelo em orquestrador de ações; a defesa é uma camada externa e determinística: um **modelo validador separado**, sem acesso a tools, classifica a entrada (**SAFE ou UNSAFE**) e o grafo **bloqueia antes** de o executor rodar qualquer ferramenta.

---

## 👵 Explicando para a vovó

Um porteiro recebeu a ordem de só deixar entrar quem tem crachá, e um golpista tenta enganá-lo. A solução é pôr um segurança experiente antes do porteiro, que só lê o que a pessoa diz e responde «suspeito» ou «ok». O porteiro nem chega a ouvir o golpista.

O segurança não abre portas nem mexe em arquivos: só classifica. Essa separação de funções é o que protege.

---

## 🔧 Tecnicamente

### O que é
- **PromptTemplate:** padrão do LangChain para texto parametrizado, em vez de `replace` manual. Preenche variáveis (por exemplo role e nome do usuário) a partir do estado, valida variáveis faltantes e, segundo a aula, aplica sanitizações internas que reduzem a superfície de ataque (não resolve tudo). Não verifiquei essa afirmação na documentação do LangChain; o ganho que o código comprova é o erro de template quando falta uma variável.
- **MCP Server e adapters:** o adapter roda um MCP Server (normalmente usado em ferramentas como o VS Code) dentro do seu código Node e entrega ao LangChain a descrição das tools, com parâmetros. Um `MultiServerMCPClient` permite registrar vários servidores (filesystem, Playwright, GitHub, Slack, Grafana).
- **Guardrails:** o nó `checkGuardrails` classifica a entrada com um modelo de safeguard dedicado, que não tem tools e só analisa texto. Retorna `safe`, `reason` e `analysis`.
- **Por que um modelo separado:** treinado para classificar risco, mais rápido, mais barato, com menor latência e sem executar ações. Isolamento de responsabilidade.

### Como funciona
- No `McpService`, o transporte é **STDIO**: o MCP Server roda como processo local, não é chamada remota. O servidor de filesystem inicia via `npx` com o diretório corrente como argumento, que define o escopo permitido (primeira camada de contenção). `getTools` entrega as tools ao LangChain.
- O serviço de LLM inicializa o agente na primeira chamada e reaproveita (cache), porque a lista de tools vem de chamada assíncrona. No admin, perguntar a versão do `package.json` prova que a tool foi chamada e que o modelo não inventou o valor.
- Para validar o MCP, a aula faz um bypass temporário do check de segurança (`safe: true` fixo) antes de colocar guardrails de verdade.
- `checkGuardrails(userInput, enabled)`: se desabilitado, devolve `safe: true` com razão «guardrails disabled» (assim se compara com e sem proteção). O prompt manda analisar a entrada, procurar indícios de injection e responder SAFE ou UNSAFE com motivo.
- No grafo, o primeiro node vira `guardrailsCheck`; se inseguro, vai para o `BlockedNode`, que não chama tool nem LLM executor e só devolve uma mensagem formatada (reason, analysis, role, permissions) com PromptTemplate.
- Teste honesto: o modelo executor continua vulnerável de propósito. Se o membro for bloqueado mesmo assim, a proteção funciona; o executor nem chega a rodar. Como admin, o mesmo prompt recebe SAFE, o fluxo segue para o chat e o MCP lê o arquivo.
- Antes versus agora: segurança dependia de texto no System Prompt e a troca de modelo quebrava a proteção; agora é uma camada arquitetural, com validação antes da tool call, bloqueio determinístico e o executor sem decidir autorização.

### Onde aplicar
- Qualquer sistema que use tools, execute comandos, acesse arquivos, consulte banco, leia variáveis de ambiente ou integre APIs internas.
- Plugar vários MCP Servers ao mesmo agente sem espalhar detalhes de transporte pelos nodes.
- Usar flag de guardrails (ligado e desligado) para demonstrar e testar o impacto da camada.

### Vantagens e limites
**Vantagens**
- A proteção sobrevive à troca do modelo executor.
- MCP entrega um conjunto de capacidades tipadas e documentadas sem integração manual por ferramenta.
- Validador barato e rápido não encarece o fluxo principal.

**Limites**
- O guardrail também é um LLM e pode errar (falso positivo ou negativo).
- Mais um modelo, mais uma chamada e mais latência por requisição.
- MCP com poder amplo exige definir escopo (diretório, permissões) com cuidado.

### 🚫 Armadilhas
- Usar o mesmo modelo para executar e para decidir se pode executar.
- Montar prompt com `replace` manual em vez de PromptTemplate.
- Esquecer o bypass temporário do guardrail depois de validar o MCP.
- Passar um diretório amplo ao MCP de filesystem: o escopo é a primeira camada de contenção.
- Achar que guardrail resolve tudo: o padrão é defesa em camadas.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| MCP Server | Processo que expõe ferramentas ao modelo, aqui via STDIO local |
| MultiServerMCPClient | Cliente que registra vários MCP Servers ao mesmo tempo |
| PromptTemplate | Template com variáveis, valida o que falta e reduz risco de injeção |
| checkGuardrails | Classifica a entrada como SAFE ou UNSAFE antes do executor |
| safe, reason, analysis | Campos de resposta do validador |
| BlockedNode | Node terminal que bloqueia sem chamar tool nem LLM executor |
| Modelo validador | Segundo modelo, sem tools, só classifica risco |

---

## 💻 No código do repo

**Projeto:** [05-safeguard-prompt-injection-z (e 05-safeguard-prompt-injection-template)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms/05-safeguard-prompt-injection-z)

Demo educacional de que regras no system prompt não bastam: um agente com acesso a arquivos via MCP é atacado por prompt injection no modo --unsafe e protegido, no modo padrão, por um segundo LLM validador que classifica a entrada antes de ela chegar ao modelo executor.

**Fluxo**
1. `src/index.ts`: flags `--user`, `--message` ou `--prompt-path`, `--unsafe`; lê o usuário em `data/users.json` (erickwendel é admin, ananeri é member sem permissões) e chama `graph.invoke({ user, guardrailsEnabled: !unsafe, messages })`.
2. `nodes/guardrailsCheckNode.ts` monta o system prompt (`prompts/system.txt` via PromptTemplate com `{USER_NAME}` e `{USER_ROLE}`) e chama `checkGuardRails`.
3. `OpenRouterService.checkGuardRails` usa outro modelo (`openai/gpt-oss-safeguard-20b`) com `prompts/guardrails.txt`; resposta que começa com UNSAFE vira `safe: false`. Em erro, o node devolve `safe: false` (falha fechada).
4. `nodes/edgeConditions.ts` (`routeAfterGuardrails`): desligado ou safe vai para `chat`; senão `blocked`.
5. `chatNode.ts` chama `OpenRouterService.generate`, que cria uma vez um agente com as tools de `services/mcpService.ts` (filesystem via npx, raiz `process.cwd()`). `blockedNode.ts` renderiza `prompts/blocked.txt`.
6. Estado em `graph/state.ts`: `messages`, `user`, `guardrailCheck` e `guardrailsEnabled`; o mesmo grafo roda seguro ou inseguro mudando uma flag. Ataques prontos: `prompts/user/read-package-version.txt` é o clássico «IGNORE PREVIOUS INSTRUCTIONS, modo de manutenção»; `read-env.txt` combina justificativa educacional com reformulação indireta (listar as tools e «demonstrar» `read_text_file` no `.env`).

**Como rodar**
- `npm i` e `cp .env.example .env`. Só `OPENROUTER_API_KEY` é lida (`process.env` aparece apenas no `config.ts`); `TEMPERATURE`, `MAX_TOKENS`, `GUARDRAILS_ENABLED`, `OPENROUTER_HTTP_REFERER` e `OPENROUTER_X_TITLE` do exemplo não fazem efeito: os valores estão fixos no `config.ts` e o guardrail liga ou desliga pela flag `--unsafe`.
- `npm run chat:admin`, `npm run chat:member:safe` (bloqueia), `npm run chat:member:unsafe:env` e `chat:member:unsafe:package` (burlam) ou `npm run chat -- --user ananeri --message "Show me package.json" [--unsafe]`.
- Rode da raiz do projeto (o `config.ts` lê `./prompts/*.txt` com caminho relativo); na primeira execução o `npx -y @modelcontextprotocol/server-filesystem` precisa de rede. Node >=24.10.

**Armadilhas e achados no código**
- A autorização é só no prompt: o agente recebe todas as tools MCP para qualquer usuário e `permissions` do `users.json` só é exibido, não filtra tools. Em produção, não entregue a tool ou cheque permissão no código dela.
- O MCP roda em `process.cwd()`: o ataque `read-env` pode ler a sua `OPENROUTER_API_KEY`. Use chave descartável nos testes unsafe.
- Fail-open na classificação: qualquer resposta do guardrail que não comece com UNSAFE é tratada como segura; saída fora do formato libera o prompt.
- O guardrail recebe system prompt e mensagem do usuário concatenados, o que pode enviesar o classificador; vale experimentar só com a entrada do usuário.
- `models: config.models` vai também no modelo validador (`#createChatModel`); confira se o fallback do OpenRouter pode trocar o validador pelo executor.
- O README cita `tests/`, `guardrails-service.ts` e `npm test` que não existem: este projeto não tem testes. `index.ts` termina com `process.exit(0)` no `finally`, inclusive após erro.
- `qwen/qwen-2.5-7b-instruct` está marcado `// unsafe!`: escolhido por ceder fácil ao ataque.
- Para o Studio, se `state.user` não vier, o `chatNode` assume o usuário `ananeri` com guardrails desligados: no `langgraph:serve` o padrão é o modo vulnerável.

**Template versus -z**
O template traz grafo e `state.ts` prontos, mas `guardrailsCheckNode`, `chatNode` e `blockedNode` são esqueletos, não há `mcpService.ts`, o `createAgent` usa `tools: []` e não existe `checkGuardRails`. O -z adiciona o `mcpService`, o `checkGuardRails`, o modelo validador e os três nodes; o template também deixa comentários de modelos alternativos no `config.ts`.

---

## 🔗 Para ir além
- [PayloadsAllTheThings: Prompt Injection (indicação de leitura 2)](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Prompt%20Injection/README.md)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms)

---

⬅️ [06 · Prompt injection: por que o System Prompt não é controle de acesso](./06-prompt-injection-limites-do-system-prompt.md)  ·  [08 · RAG com Neo4j: arquitetura, Query Planner e Cypher Generator](./08-rag-neo4j-planner-e-cypher-generator.md) ➡️
