# 00 · Do plugin e function calling ao MCP: tools, resources, prompts e descoberta

> **Unidade 1 · Aula 1 (com complemento da live de 24/02/2026)** · Leitura: ~10 min · Bloco: Visão geral do MCP

## 🎯 Em uma frase
O **MCP** é um protocolo cliente-servidor que incorpora as **tools** do function calling e acrescenta **resources**, **prompts** e **descoberta de capacidades**. Ele eleva a integração de «lista de funções» para «ecossistema», mas não dispensa engenharia de software.

---

## 👵 Explicando para a vovó

Function calling é entregar ao garçom um cardápio impresso: ele só conhece os pratos que estão ali e, se a cozinha mudar, alguém precisa reimprimir. No MCP o garçom pode perguntar à cozinha «o que vocês fazem hoje? como se pede isso?» e receber a resposta na hora.

E, em vez de pedir «prato 12, 14 e 15», o cliente pede «um jantar para duas pessoas» e a cozinha combina os pratos por trás do balcão. É isso que a apostila chama de abstração orientada ao domínio.

---

## 🔧 Tecnicamente

### O que é
- **Linha do tempo (apostila):** plugins do ChatGPT em março de 2023; Function Calling em junho de 2023 (funções com nome, descrição e estrutura de entrada entregues ao modelo, que escolhe qual chamar e gera os argumentos); depois o MCP. A apostila insiste que não foi uma ruptura, e sim a resposta a um problema antigo: a complexidade de integrações.
- **Limite do function calling:** o entendimento da integração é superficial. O modelo conhece as funções e os parâmetros, mas não explora de forma estruturada o que o sistema oferece; você descreve tudo à mão no código, qualquer mudança exige atualizar as definições e não existe descoberta padronizada.
- **O que o MCP acrescenta:** um protocolo de comunicação entre cliente e servidor que expõe não só tools, mas também **resources** (contexto: o que o serviço faz, objetivos, exemplos de uso) e **prompts** prontos. O cliente conectado descobre as capacidades em vez de você declarar função por função.
- **Abstração:** em vez de uma tool por endpoint (buscar cliente por ID, listar, obter detalhe), uma ação ligada a uma intenção de negócio, como «buscar cliente por nome». O servidor orquestra por trás (listar, filtrar, detalhar, consolidar) e esconde autenticação, autorização e múltiplos endpoints.
- **Transporte sob demanda:** em vez de request-resposta completa, os dados podem ir de forma incremental (o exemplo da apostila é processamento de vídeo em partes, quase em tempo real).
- **MCP não substitui tools:** as tools continuam como capacidades expostas ao modelo, agora dentro de um protocolo mais amplo. Por isso frameworks ainda usam o termo «tools» quando operam com MCP.

### Como funciona
- **Comparação com REST:** um Swagger com dezenas ou centenas de endpoints teria de ser enviado inteiro ao modelo a cada interação, e LLM é cobrado por volume processado. Com ações no lugar de endpoints, o modelo consome só o necessário e pede mais contexto sob demanda, gastando menos tokens.
- **Complemento da live de 24/02/2026 (base teórica no repositório):** o problema «N × M» (cada modelo × cada fonte de dados exigia integração própria); o MCP foi lançado pela Anthropic no fim de 2024, apresentado como o «USB-C das aplicações de IA», e depois doado à Linux Foundation (Agentic AI Foundation) para manter governança neutra.
- **Arquitetura (live):** mensagens JSON-RPC 2.0, com transporte local via stdio ou de rede via HTTP/SSE. **Host** é onde o modelo roda e o usuário interage (Claude Desktop, Cursor, VS Code); **Client** vive dentro do host e gerencia a conexão; **Server** é um processo independente que expõe dados e ferramentas.
- **Ciclo de invocação (live):** descoberta (o cliente lista as tools do servidor, com `tools/list`), planejamento (o LLM decide quais tools usar e com quais parâmetros) e execução (a tool é chamada com `tools/call` e o servidor devolve o resultado). Exemplo da live: «baixe a transcrição do Google Drive e anexe no prospecto do Salesforce»: o LLM identifica as duas tools, planeja a sequência e executa cada chamada via MCP.
- **Por que o function calling já ajudava (apostila):** ele reduziu alucinações, porque o modelo passou a operar com capacidades bem definidas em vez de improvisar. O MCP mantém esse ganho e tira o custo de declarar tudo à mão.
- **Otimização de custo (live, números não verificados):** em vez de deixar o modelo chamar tools «cegamente», o agente gera pequenos scripts (TypeScript ou Python) em sandbox que falam com os servidores MCP por baixo e devolvem só o resultado já filtrado (ex.: uma planilha de 10 mil linhas vira 5). A live cita redução de 98% a 99% em tokens e latência; trate como ordem de grandeza anunciada, não medida.
- **As três primitivas:** Tools executam ações; Resources entregam dados de leitura como contexto; Prompts são templates e fluxos pré-definidos que guiam o uso. A live resume: MCP são os «braços e pernas» da IA, Agent Skills (ver [tópico 05](./05-agent-skills.md)) são o «cérebro».

### Onde aplicar
- Decidir se vale expor uma API como MCP: quando o consumidor é um modelo ou agente e a API tem granularidade técnica demais.
- Argumento de custo: ações de domínio reduzem o contexto gasto descrevendo endpoints.
- Reaproveitar um único servidor MCP (por exemplo, de Jira) em vários agentes: chat, terminal de programação, sistema de suporte (live).

### Vantagens e limites
**Vantagens**
- Descoberta automática de capacidades, sem redeclarar função por função.
- Menos tokens: o modelo pede o que precisa, quando precisa.
- Desacoplamento: quem consome conhece as ações expostas, não os endpoints por trás.
- Padrão neutro, reaproveitável por qualquer cliente compatível (live).

**Limites**
- Servidor MCP mal projetado é lento, inseguro e difícil de manter, como qualquer sistema (apostila).
- Live (número não verificado): carregar o catálogo de ferramentas de dezenas de servidores pode consumir de 50.000 a 150.000 tokens por sessão em ambientes corporativos.
- Live (número não verificado, pesquisa não identificada na fonte): uma pesquisa citada aponta divergência séria entre descrição e código em cerca de 13% dos servidores (ex.: ferramenta descrita como «somente leitura» que apaga dados). Mitigações: privilégio mínimo, gateways e human-in-the-loop para ações irreversíveis.

### 🚫 Armadilhas
- Tratar o MCP como ruptura total ou como sinônimo de tool: ele envolve tools, não as elimina.
- Espelhar a API endpoint por endpoint e perder o valor da abstração.
- Achar que o protocolo substitui arquitetura: a modelagem das ações e a eficiência das integrações continuam críticas.
- Confundir MCP com «API web pública»: ele pode ser só um processo local falando por stdio (ver [tópico 06](./06-mcp-server-from-scratch.md)).

> 💡 **Dica:** Pergunta-teste para cada tool que você expõe: ela representa uma intenção de negócio ou apenas um endpoint? Se for só um endpoint, provavelmente você está espelhando a API.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| MCP | Model Context Protocol: padrão aberto que conecta aplicações de IA a sistemas externos |
| Tool | Ação executável exposta ao modelo, com nome, descrição e schema de entrada |
| Resource | Contexto de leitura exposto pelo servidor (documentação, dados), sem executar ação |
| Prompt (MCP) | Template de instrução pronto, com argumentos, para guiar o uso do servidor |
| Descoberta | Cliente listar capacidades do servidor em vez de tê-las codificadas |
| Function calling | Funções descritas ao modelo, que escolhe qual chamar e gera os argumentos |
| Host, client, server | Onde o modelo roda, quem gerencia a conexão e quem expõe as capacidades |
| JSON-RPC 2.0 | Formato das mensagens trocadas entre cliente e servidor MCP (live) |
| tools/list e tools/call | Os dois métodos do ciclo: listar as tools do servidor e executar uma delas (live) |
| Code-first (live) | O agente gera scripts em sandbox que usam os servidores MCP e devolvem só o resultado enxuto ao modelo |
| N × M | Explosão de integrações sem padrão: cada modelo com cada fonte (live) |

---

## 💻 No curso

- Não há projeto de código nesta aula: ela é conceitual. A parte prática começa no [tópico 01](./01-multi-mcp-app-and-intent-parsing.md).
- O repositório não traz implementação de HTTP, SSE ou streaming: todos os servidores e clientes do módulo usam stdio (ver [tópico 14](./14-transports-and-next-steps.md)).
- Material complementar usado aqui: `lives/2026-02-24/base-teorica/mcp-model-context-protocol.md` do repositório do curso.

---

## 🔗 Para ir além
- [Indicação 1: What is the Model Context Protocol (MCP)? (documentação oficial)](https://modelcontextprotocol.io/docs/getting-started/intro)
- [Indicação 3: Security Best Practices (documentação oficial)](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica)

---

[01 · App com múltiplos MCPs: arquitetura em agentes e parsing estruturado da intenção](./01-multi-mcp-app-and-intent-parsing.md) ➡️
