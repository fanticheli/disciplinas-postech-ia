# 13 · Publicando o MCP como pacote: Verdaccio (privado) e NPM (público)

> **Unidade 7 · Aula 1** · Leitura: ~10 min · Bloco: Produção: publicação, transports e consumo

## 🎯 Em uma frase
Publicar o MCP como pacote o torna **reutilizável, padronizado e acessível a outros times**. A aula usa o **Verdaccio** (registry privado, em Docker) como ensaio e o **NPM** público como destino, com versionamento semântico, **bin** executável via `npx` e configuração do editor apontando para o pacote.

---

## 👵 Explicando para a vovó

Enquanto o MCP só roda na sua máquina, é uma receita guardada na gaveta de casa. Publicar é imprimir o livro e colocá-lo numa biblioteca: primeiro numa biblioteca interna da empresa (para testar com calma) e, quando estiver bom, na biblioteca pública.

Cada edição do livro precisa de um número de versão único, para ninguém ficar com uma versão misturada.

---

## 🔧 Tecnicamente

### O que é
- **Por que publicar:** reutilização, distribuição, instalação padronizada e acesso a outros times, o modelo das ferramentas que distribuem integrações prontas.
- **Dois cenários:** registry privado com Verdaccio (código que não pode ser exposto, regras de negócio sensíveis, uso restrito à empresa) e NPM público (qualquer pessoa instala).
- **Verdaccio:** serviço local, em Docker, com interface web para criar usuário, publicar e ver versões, simulando um registry completo sob seu controle. É preciso criar usuário na interface e fazer login no terminal.
- **Versionamento semântico:** cada publicação exige versão única, para evitar conflito e garantir rastreabilidade; o ciclo é atualizar versão, publicar e validar no registry.
- **Executável:** definir um comando (bin) apontando para o arquivo de entrada, e tratar o arquivo principal como executável com uma instrução (shebang) que indica o runtime. Isso permite uso com `npx`.
- **TypeScript no pacote:** o TypeScript nativo do Node funciona bem localmente, mas tem limitação quando o código está dentro de `node_modules`; a solução da aula é uma abordagem que executa TypeScript direto, sem build prévio.

### Como funciona
- **Consumo:** em vez de executar um arquivo local, o editor roda `npx` com o nome do pacote publicado, os argumentos e, no caso privado, o registry. O pacote é baixado e executado automaticamente; as tools e prompts aparecem se estiver tudo certo.
- **Boa prática:** testar no registry privado, validar o funcionamento completo e só então publicar no NPM, evitando versões quebradas e correções frequentes em produção. No público basta `npx` e o nome, sem informar registry.
- **Resultado:** o MCP não depende mais do ambiente local, pode ser compartilhado, versionado e reutilizado, e continua respeitando autenticação e rate limiting.

### Onde aplicar
- Distribuir um MCP interno por registry privado a todos os times.
- Publicar MCP aberto no NPM para qualquer cliente instalar com `npx -y pacote`.

### Vantagens e limites
**Vantagens**
- Instalação uniforme (`npx`) em editor, agente e pipeline.
- Versionamento e histórico de publicações.

**Limites**
- Quem publica passa a manter um pacote: versões, compatibilidade e segurança da cadeia de suprimentos.
- Cada nova versão exige republicar e atualizar quem consome.

### 🚫 Armadilhas
- Publicar no NPM público sem validar antes no registry privado.
- Esquecer de incrementar a versão: a publicação é recusada.
- Empacotar sem tornar o arquivo de entrada executável (e sem `bin`): o `npx` não acha o comando.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Verdaccio | Registry npm privado e leve, executado localmente (Docker, porta 4873) |
| bin | Campo do package.json que define o comando executável do pacote |
| Shebang | Primeira linha do arquivo indicando o runtime que o executa |
| npx | Baixa e executa o pacote sem instalá-lo globalmente |
| files | Lista do que vai dentro do pacote publicado (aqui, só `src`) |
| Semver | Versionamento major.minor.patch: cada publicação, versão única |

---

## 💻 No código do repo

**Projeto:** [08-publishing-mcps-private-npm](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/08-publishing-mcps-private-npm)

Mesmo servidor de clientes do [tópico 12](./12-mcp-with-service-token-and-errors.md) (`customers-mcp-z`) preparado como pacote `@erickwendel/customers-mcp`, mais a API (`nodejs-fastify-mongodb-crud-z`, idêntica à do 07) e um `docker-compose.yaml` com o Verdaccio.

**Fluxo**
1. `customers-mcp-z/package.json`: `name: @erickwendel/customers-mcp`, `version: 0.0.2`, `bin: { customers-mcp: ./src/index.ts }`, `files: [src]`; scripts `build` (`chmod 755 src/index.ts`), `registry:start`/`registry:stop`, `registry:login:private` (`npm login --registry http://localhost:4873`), `release:private` (`npm version patch && npm publish --registry http://localhost:4873`), `registry:login:public` e `release:public` (`--access public` no registry oficial).
2. `src/index.ts` começa com `#!/usr/bin/env tsx`; `tsx` está nas `dependencies`, para o shebang funcionar a partir de `node_modules`. O resto é o `index.ts` do tópico 12 (exige `SERVICE_TOKEN`).
3. `docker-compose.yaml`: serviço `verdaccio` (imagem `verdaccio/verdaccio:6`, porta 4873).
4. `.vscode/mcp.json`: `command: npx`, `args: ['-y', '@erickwendel/customers-mcp@latest']`, com `env.SERVICE_TOKEN`; há uma linha comentada com `--registry http://localhost:4873` para o caso privado, mas ela ainda aponta para o nome antigo `@erickwendel/ew-customers-mcp@latest`: o nome do pacote foi trocado no `package.json` e a linha não acompanhou.
5. O diretório inclui o agent `developer.agent.md` e os mesmos testes do tópico 12.

**Como rodar**
- `npm run registry:start`, crie o usuário em `http://localhost:4873`, `npm run registry:login:private` e `npm run release:private`.
- Configure o editor com `npx -y --registry http://localhost:4873 @erickwendel/customers-mcp@latest`; para o público, `npm run registry:login:public` e `npm run release:public`.
- **Verificado rodando** (Node 22.16, Verdaccio 6 em Docker): `npm pack --dry-run` inclui 15 arquivos (só `src`, README e package.json; os testes ficam de fora); publicando uma versão nova no Verdaccio, `npx -y --registry http://localhost:4873 @erickwendel/customers-mcp@<versão>` iniciou o servidor, respondeu ao `initialize` e, sem `SERVICE_TOKEN`, saiu com o erro esperado.

**Armadilhas e achados no código**
- **Verificado:** o nome `@erickwendel/customers-mcp` já existe no NPM público (versão 0.0.2); no Verdaccio, publicar a mesma 0.0.2 falha com 409 «this package is already present» (provavelmente porque o Verdaccio repassa a consulta ao registry público). Para reproduzir, troque o escopo e o nome pelos seus.
- **Verificado:** o servidor responde `serverInfo` com nome `@erickwendel/ew-customers-mcp` e versão `0.0.1` (fixos em `mcp/server.ts`), diferentes do pacote publicado (`customers-mcp` 0.0.2): a versão do protocolo não acompanha a do pacote.
- **Verificado:** o `engines` pede `v24.14.0` exato e o npm avisa `EBADENGINE` em outras versões do Node (rodou mesmo assim no 22.16).
- O projeto do [tópico 15](./15-langchain-agent-consuming-mcp.md) consome `@erickwendel/ew-customers-mcp@latest` (outro nome, que também existe no NPM), não `@erickwendel/customers-mcp` deste projeto. A origem da divergência: o `package.json` do 07 ainda se chama `@erickwendel/ew-customers-mcp` (e é esse nome que o `serverInfo` carrega); o 08 renomeou o pacote para `customers-mcp` ao publicar, sem atualizar o `serverInfo` nem o comentário do `mcp.json`.
- `npm version patch` cria também commit e tag git se a pasta fizer parte de um repositório (comportamento padrão do npm): rodar `release:private` dentro do clone do curso suja o histórico.
- `@types/node` e `tsx` estão em `dependencies`, indo no pacote de quem instala.
- O Verdaccio do compose não declara volume: ao remover o contêiner, os pacotes publicados somem (provável pelo compose, não testei).
- O `.vscode/mcp.json` está commitado com um service token.

**Template versus -z**
Esta unidade não tem par template/-z: só existe a pasta resolvida.

---

## 🔗 Para ir além
- [Indicação 3: Security Best Practices (MCP)](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices)
- [Código: 08-publishing-mcps-private-npm](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/08-publishing-mcps-private-npm)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica)

---

⬅️ [12 · O MCP como cliente real da API: service token obrigatório e erros estruturados](./12-mcp-with-service-token-and-errors.md)  ·  [14 · Transports: STDIO, HTTP, streaming e SSE, e ideias para o próximo servidor](./14-transports-and-next-steps.md) ➡️
