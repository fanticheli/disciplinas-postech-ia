# 14 · Transports: STDIO, HTTP, streaming e SSE, e ideias para o próximo servidor

> **Unidade 7 · Aula 2** · Leitura: ~8 min · Bloco: Produção: publicação, transports e consumo

## 🎯 Em uma frase
Todo o módulo usou **STDIO**: o MCP roda como processo local e conversa por entrada e saída padrão. Funciona bem para editor, automação local e pipelines simples, e reduz a complexidade de segurança por não expor serviço de rede. Para servidores centralizados, com vários clientes ou em tempo real, existem **HTTP**, **streaming** e **SSE**.

---

## 👵 Explicando para a vovó

STDIO é como conversar com alguém sentado ao seu lado: sem telefone, sem endereço, rápido. HTTP é ligar para um escritório central que atende muita gente ao mesmo tempo. Streaming e SSE são deixar a linha aberta para a outra pessoa ir avisando assim que algo acontece.

Cada um tem seu lugar: ao lado do colega, tudo é simples; no escritório central, há fila, segurança e escala para cuidar.

---

## 🔧 Tecnicamente

### O que é
- **STDIO:** o MCP é executado localmente, roda como processo no ambiente do cliente, se comunica por entrada e saída padrão e normalmente é distribuído como pacote NPM. Não exige infraestrutura, é simples de instalar e funciona bem com editores e ferramentas locais.
- **Por que é padrão:** resolve a maioria dos casos com baixo custo e reduz a complexidade de segurança, já que não expõe serviços na rede.
- **HTTP:** o MCP é exposto como serviço web, recebe requisições pela rede e responde de forma síncrona ou assíncrona. Interessante quando o serviço precisa ser centralizado, múltiplos clientes acessam o mesmo MCP ou há necessidade de escalabilidade.
- **Streaming via HTTP:** o servidor envia dados continuamente conforme processa (vídeo, áudio, geração incremental, pipelines de dados): deixa de ser só request-resposta.
- **Server-Sent Events (SSE):** o servidor mantém a conexão aberta e envia eventos; o cliente recebe em tempo real (notificações, atualizações de estado, monitoramento). Mais complexo e poderoso.
- **Containers:** MCP rodando em Docker fica isolado, distribuível e padronizado; faz sentido com ambiente padronizado, dependências complexas ou MCP parte de um sistema maior. Para ferramentas simples pode ser excesso.

### Como funciona
- **Escolha:** para facilitar adoção, reduzir a barreira de entrada e atingir devs rápido, NPM com STDIO costuma ser melhor; para escalar, centralizar e controlar infraestrutura, HTTP ou contêineres fazem mais sentido.
- **Decisão rápida (resumo do quadro da aula):** **STDIO** para uso local, editor, automação e pipelines simples (distribuição via NPM). **HTTP** para serviço centralizado, vários clientes e escala. **Streaming e SSE** para tempo real ou processamento contínuo. **Container** quando é preciso padronizar ambiente, há dependências complexas ou o MCP faz parte de um sistema maior.
- **Exemplo prático:** dashboards e sistemas de monitoramento, que consomem dados continuamente e reagem a eventos, combinam com SSE ou HTTP, não com STDIO.
- **MCP como camada de automação:** ler eventos externos, disparar ações, integrar sistemas e orquestrar fluxos (gestão de projetos, comunicação, e-mail, agenda): receber notificação, processar com IA, gerar resumo, atualizar sistema e enviar mensagem.
- **Explorar o ecossistema:** listas e repositórios com exemplos de servidores MCP (sistemas operacionais, produtividade, serviços externos, plataformas de comunicação) mostram o potencial real.
- **Mensagem de fechamento da aula:** o limite passa a ser mais criativo do que técnico; o próximo passo não é aprender a tecnologia, e sim explorar possibilidades no seu contexto.
- **Complemento da live:** as mensagens são JSON-RPC 2.0 sobre transporte local (stdio) ou de rede (HTTP/SSE).

### Onde aplicar
- Distribuir como pacote com STDIO quando o público são devs com editor ou agente local.
- Hospedar por HTTP quando um serviço central precisa atender vários clientes com autenticação e limites (tópicos [09](./09-jwt-and-rbac.md) a [12](./12-mcp-with-service-token-and-errors.md)).
- Ideias da aula: automação de tarefas pessoais, ferramentas de trabalho, dados em tempo real, orquestração de workflows, APIs externas.

### Vantagens e limites
**Vantagens**
- STDIO: simples, sem rede, com superfície de ataque menor.
- HTTP e SSE: centralização, escala e tempo real.

**Limites**
- Ao expor por rede, autenticação, autorização e limite de uso viram requisito, não opção.
- SSE e streaming são mais complexos de implementar e operar.

### 🚫 Armadilhas
- Subir HTTP só por moda, sem necessidade de centralizar ou escalar.
- Expor um MCP por rede com a mesma configuração do uso local (sem autenticação nem limites).
- Usar Docker para ferramenta simples demais.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| STDIO | Transporte por entrada e saída padrão, com o servidor como processo local |
| HTTP | Transporte por rede para serviço centralizado e escalável |
| Streaming | Envio contínuo de dados conforme são processados |
| SSE | Server-Sent Events: conexão aberta com eventos do servidor para o cliente |
| Container | Servidor MCP empacotado em Docker, isolado e padronizado |

---

## 💻 No curso

- Esta aula não tem pasta própria. A apostila associa a Unidade 7 a `08-publishing-mcps-private-npm`, que é a da aula anterior ([tópico 13](./13-publishing-npm-and-verdaccio.md)).
- Verifiquei no código do repositório: todos os servidores MCP do módulo (05, 06, 07, 08) usam `StdioServerTransport`; os clientes de teste usam `StdioClientTransport`; as configurações do `MultiServerMCPClient` declaram `transport: 'stdio'`. Não há exemplo de HTTP, SSE ou streaming no repositório.

---

## 🔗 Para ir além
- [Indicação 3: Security Best Practices (MCP)](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices)
- [Indicação 1: What is MCP?](https://modelcontextprotocol.io/docs/getting-started/intro)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica)

---

⬅️ [13 · Publicando o MCP como pacote: Verdaccio (privado) e NPM (público)](./13-publishing-npm-and-verdaccio.md)  ·  [15 · Agente LangChain.js consumindo o Customers MCP publicado](./15-langchain-agent-consuming-mcp.md) ➡️
