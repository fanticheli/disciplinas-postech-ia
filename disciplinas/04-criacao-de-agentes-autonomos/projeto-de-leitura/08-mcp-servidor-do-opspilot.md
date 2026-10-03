# 08 · MCP: o OpsPilot como servidor de ferramentas, outra porta para a mesma aplicação

> **Unidade 3 · Aula 4** · Leitura: ~6 min · Bloco: Tools, persistência e MCP

## 🎯 Em uma frase
O **MCP** resolve o problema N agentes x M fontes de ferramentas: escreve-se o servidor uma vez e qualquer cliente compatível o usa. Regra da aula: o MCP **não é um novo backend**, é outra porta para a mesma `OpsStore` e os mesmos schemas Zod; e no **stdio** o stdout é do protocolo.

---

## 👵 Explicando para a vovó

É uma tomada padrão na parede da cozinha: em vez de fazer um adaptador diferente para cada eletrodoméstico, qualquer aparelho compatível liga. E a regra do stdout é “não grite no corredor onde as pessoas combinam o pedido por sussurro”: qualquer ruído atrapalha a conversa.

---

## 🔧 Tecnicamente

### O que é
- **Protocolo aberto:** um servidor MCP pode expor *tools* (funções que o agente chama), *resources* (dados) e *prompts* (templates). A aula foca nas tools.
- **Segunda porta:** a API HTTP é uma porta, o MCP é outra, e ambas precisam chegar à mesma lógica e ao mesmo estado persistido. Duas implementações paralelas virariam dois produtos no mesmo repositório.
- **Regra do stdio:** sem `console.log` livre no servidor; diagnóstico vai para stderr. Um log inocente pode ser lido pelo cliente como mensagem do protocolo.
- **Catálogo da v1:** listar alertas, abrir incidentes e resolver incidentes, com servidor chamado “OpsPilot” e um script do projeto que também carrega o ambiente.
- **Clientes:** o servidor é registrado por configuração em cada cliente (VS Code e Cursor usam pastas diferentes, com conteúdo quase igual). Depois de configurar, é preciso recarregar e, muitas vezes, abrir uma nova sessão, pois a lista de ferramentas é lida no início da conversa.
- **Prova circular:** no Cursor, o agente escolhe a tool MCP e abre um incidente em notifications; no VS Code, o Copilot faz o mesmo; e a API HTTP lista os incidentes criados pelos dois, porque a store é compartilhada. A apostila separa falha de MCP de falha de ambiente (o Copilot numa branch errada parecia “MCP quebrado”).

### Como funciona
- A referência do servidor cria `McpServer` com nome e versão, instancia a `SQLiteOpsStore` e registra a primeira tool (`open_incident`) com descrição clara e campos descritos; as outras duas seguem o padrão. Depois conecta o transporte stdio.
- O primeiro erro de conexão no Cursor vinha do comando de inicialização não achar o runtime para TypeScript; foi corrigido com ajuda do agente. Disponibilizar uma tool não termina na implementação: o processo precisa ser iniciável pelo cliente.

### Onde aplicar
- Reutilizar as mesmas capacidades em Copilot, Cursor ou outro agente sem reescrever integrações.
- Oferecer operações de domínio (abrir, resolver) como ferramentas padronizadas.

### Vantagens e limites
**Vantagens**
- Uma implementação, vários clientes.
- Reuso de store, schemas e regras: sem divergência entre portas.

**Limites**
- Configuração por cliente e sessões que não recarregam ferramentas dificultam o diagnóstico.
- O MCP acrescenta interoperabilidade, mas não substitui validação, limites e revisão.

### 🚫 Armadilhas
- `console.log` no servidor stdio.
- Duplicar a regra de negócio no servidor MCP.
- Concluir que o protocolo está com defeito quando a causa é branch, sessão ou caminho do runtime.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| MCP | Model Context Protocol: protocolo aberto entre agentes e provedores de ferramentas |
| Tools / resources / prompts | As três categorias que um servidor MCP pode expor |
| stdio | Transporte por entrada e saída padrão do processo; stdout é do protocolo |
| registerTool | Registro de uma tool no McpServer com schema de entrada |
| N x M | N agentes e M fontes de ferramentas: o problema que o MCP resolve |

---

## 💻 No código do repo

**Projeto:** [03-function-calling-e-tool-use (src/mcp)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use)

Spec 006: servidor MCP stdio que expõe list_alerts, open_incident e resolve_incident reaproveitando as tools e os schemas do agente.

**Fluxo**
1. `src/mcp/create-server.ts`: `createOpsMcpServer(store)` devolve um `McpServer` de nome `opspilot`; registra as três tools com `registerTool`, reutilizando a `description` e os schemas Zod exportados por `src/agents/tools.ts` e chamando `tool.invoke(args)`. O resultado é texto em `content`.
2. `src/mcp/server.ts`: abre `SqliteOpsStore(OPSPILOT_DB)`, roda o seed, conecta `StdioServerTransport` e só escreve em `console.error` (“opspilot MCP server: pronto (stdio)”).
3. `package.json`: `npm run mcp` é `node --env-file-if-exists=.env --import tsx src/mcp/server.ts`.
4. `.vscode/mcp.json` e `.cursor/mcp.json`: transporte stdio e `npm --prefix ${workspaceFolder} run --silent mcp`; o `--silent` provavelmente existe para o npm não escrever no stdout (hipótese).
5. `src/mcp/server.test.ts`: lista exatamente as três tools, confere a identidade do servidor, a paridade com a tool do LangChain sobre o mesmo store, abrir e resolver incidente, e um teste que varre `src/mcp` e falha se houver `console.log` (a regra do stdio virou teste).

**Como rodar**
- `npm run mcp` (processo stdio; use um cliente MCP para conversar).
- Registre em `.vscode/mcp.json` (VS Code) ou `.cursor/mcp.json` (Cursor), recarregue a janela e abra uma sessão nova.
- `npm test` cobre o catálogo e o contrato.

**Armadilhas e achados no código**
- O catálogo MCP tem só 3 tools; `list_incidents`, `consultar_runbook`, `check_provider_status` e `forget_preference` ficam fora (há teste que afirma isso).
- Erros chegam como texto “Error: ...” num resultado normal: pelo código não há `isError`, então o cliente não distingue falha de sucesso.
- HTTP e MCP são processos distintos que compartilham o arquivo SQLite; o caminho padrão `./data/opspilot.db` é relativo ao diretório de execução.

---

## 🔗 Para ir além
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Snapshot da Unidade 3 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/03-function-calling-e-tool-use)

---

⬅️ [07 · Tools externas resilientes: erro como observação, timeout, retry e Zod](./07-tool-externa-resiliente.md)  ·  [09 · Memória do agente: conversa persistente, memória semântica com embeddings e refletor de aprendizado](./09-memoria-episodica-e-semantica.md) ➡️
