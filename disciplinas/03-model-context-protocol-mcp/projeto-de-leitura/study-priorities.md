# 🎯 Disciplina 03 · O que vale estudar

> Análise de prioridade (opinião fundamentada no guia e na prática atual), não conteúdo da apostila. Premissas: engenheiro backend (TypeScript/Node e Python) com APIs e serviços em nuvem (AWS), Postgres, filas e jobs, produto com LLMs em produção, automação de fluxos (Jira/Slack) e uso intenso de agentes de código; objetivo de virar engenheiro de IA aplicada especialista (construir, avaliar, operar e governar), não pesquisador de modelos.

## Veredito
O valor central é projetar um servidor MCP como camada de domínio sobre uma API existente, com segurança e erros pensados para o modelo. A parte de LangChain.js e de ferramentas de demonstração envelhece rápido e vale menos. Nota geral: ⭐⭐⭐⭐ (4 de 5), porque o núcleo (tools por intenção, segurança, transports) é duradouro, mas boa parte do código do curso é didática e o próprio guia lista bugs e atalhos nele. Mais útil para quem já tem APIs próprias e quer expô-las a agentes com governança.

## Mapa de prioridade por tópico

| Tópico | Dia a dia | Especialista | Veredito |
|---|---|---|---|
| [00 · Do plugin e function calling ao MCP](./00-mcp-protocol-overview.md) | 🟢 | 🟢 | Aprofundar |
| [01 · App com múltiplos MCPs e parsing de intenção](./01-multi-mcp-app-and-intent-parsing.md) | 🟡 | 🟡 | Conhecer |
| [02 · MongoDB MCP, tool customizada e File System MCP](./02-mcp-tools-mongodb-csv-filesystem.md) | 🟡 | 🟡 | Conhecer |
| [03 · Services como tools: Google Trends](./03-services-as-tools-google-trends.md) | ⚪ | ⚪ | Pular |
| [04 · Arquivos de instrução, llms.txt e agents](./04-instructions-llms-txt-and-agents.md) | 🟢 | 🟡 | Implementar |
| [05 · Agent Skills](./05-agent-skills.md) | 🟢 | 🟡 | Implementar |
| [06 · Servidor MCP do zero](./06-mcp-server-from-scratch.md) | 🟢 | 🟢 | Implementar |
| [07 · API legada como MCP](./07-legacy-api-to-mcp-architecture.md) | 🟢 | 🟢 | Aprofundar |
| [08 · Tools de CRUD, busca composta e prompt](./08-customer-crud-tools-and-prompt.md) | 🟡 | 🟡 | Conhecer (leia Armadilhas) |
| [09 · JWT e RBAC](./09-jwt-and-rbac.md) | 🟡 | 🟡 | Conhecer |
| [10 · Service tokens](./10-service-tokens.md) | 🟢 | 🟡 | Implementar |
| [11 · Rate limiting](./11-rate-limiting.md) | 🟢 | 🟡 | Implementar |
| [12 · MCP como cliente da API e erros estruturados](./12-mcp-with-service-token-and-errors.md) | 🟢 | 🟢 | Aprofundar |
| [13 · Publicando no NPM e Verdaccio](./13-publishing-npm-and-verdaccio.md) | 🟡 | ⚪ | Conhecer |
| [14 · Transports e próximos passos](./14-transports-and-next-steps.md) | 🟡 | 🟢 | Aprofundar |
| [15 · Agente LangChain.js consumindo o MCP](./15-langchain-agent-consuming-mcp.md) | 🟡 | 🟡 | Conhecer |
| [16 · Live: MySQL2, ingestão de contexto, Skill vs MCP](./16-live-mcp-and-skills-practical-case.md) | 🟡 | 🟡 | Conhecer |

## ✅ Implemente no dia a dia

1. **Um servidor MCP fino sobre uma API sua, com tools por intenção de negócio.**
   - Por que vale: é o que o guia chama de não espelhar endpoints. Minha análise: é o ponto de partida mais direto para quem já tem APIs próprias. Na prática, o que a comunidade faz: poucas tools com nome e descrição claros rendem mais que dezenas de wrappers de endpoint.
   - Primeiro passo mínimo: escolha 2 ou 3 operações de leitura da sua API, exponha como tools com schema Zod de entrada e saída, rode no Inspector.
   - Quando não adotar: se só um script ou um agente isolado vai chamar a API, um cliente HTTP direto resolve sem camada extra.
   - Tópicos: [06](./06-mcp-server-from-scratch.md), [07](./07-legacy-api-to-mcp-architecture.md).

2. **Testes automatizados do servidor via MCP Client real, incluindo `listTools`.**
   - Por que vale: o guia mostra um bug verificado que só aparece quando o cliente lista as tools (schema esperava `_id`, a API devolve `id`) e um teste que passa por acidente. Teste que não percorre o caminho do cliente real dá falsa confiança.
   - Primeiro passo mínimo: um teste que conecta por stdio, chama `listTools` e uma tool de leitura, e confere o `structuredContent` (não só "não deu erro").
   - Quando não adotar: protótipo descartável de uma tarde.
   - Tópicos: [08](./08-customer-crud-tools-and-prompt.md), [12](./12-mcp-with-service-token-and-errors.md).

3. **Credencial dedicada por consumidor, falha rápida na subida e erro estruturado para o modelo.**
   - Por que vale: o MCP deve exigir credencial na inicialização e devolver erro que o modelo entenda, em vez de exceção bruta. Minha análise: com agentes chamando sua API, token por consumidor é o que permite revogar e auditar.
   - Primeiro passo mínimo: o servidor lê o token de variável de ambiente, aborta se ausente e converte 401, 403 e 429 em respostas com mensagem acionável.
   - Quando não adotar: servidor local de uso pessoal sem acesso a dados sensíveis. Atenção: o guia nota que o token do curso não expira e fica no arquivo de config do editor, então prefira expiração e rotação no seu caso.
   - Tópicos: [10](./10-service-tokens.md), [12](./12-mcp-with-service-token-and-errors.md).

4. **Rate limit por credencial na API que o agente consome.**
   - Por que vale: um agente em loop gera tráfego e custo que nenhum humano geraria. O guia nota o furo: token inválido não é limitado (95 requisições, nenhuma 429).
   - Primeiro passo mínimo: limite por token (e por IP para requisições sem token válido) com 429 e `Retry-After`, no gateway ou plugin que você já usa.
   - Quando não adotar: API interna com um único consumidor confiável e controle de custo em outro ponto.
   - Tópico: [11](./11-rate-limiting.md).

5. **Arquivo de instruções do projeto e skills pequenas para o seu agente de código.**
   - Por que vale: você já usa agentes de código; instrução curta e skills carregadas sob demanda reduzem tokens e ambiguidade, segundo o guia. É prática de baixo custo e retorno imediato.
   - Primeiro passo mínimo: um arquivo de instruções com convenções e comandos de teste, e uma skill para uma tarefa repetitiva sua. Leia o `SKILL.md` e os scripts de qualquer skill de terceiros antes de instalar.
   - Quando não adotar: não crie agents especializados para tudo; comece com o mínimo de ferramentas por agent.
   - Tópicos: [04](./04-instructions-llms-txt-and-agents.md), [05](./05-agent-skills.md).

## 🔬 Aprofunde (rumo a especialista)

1. **Projeto de tools e contratos para consumo por LLM.**
   - Por que diferencia: a qualidade da descrição, do schema e da mensagem de erro decide se o modelo acerta. O guia mostra o caso do update com campos opcionais sobre uma API que exige todos: o modelo manda parcial e falha.
   - Estudar além da aula: documentação oficial do MCP (tools, resources, prompts) e a página de boas práticas citada na leitura complementar do README.
   - Praticar: pegue um MCP seu, faça 10 pedidos em linguagem natural a um agente e registre quantos acertam a tool e os argumentos de primeira; reescreva descrições e meça de novo.
   - Tópicos: [00](./00-mcp-protocol-overview.md), [07](./07-legacy-api-to-mcp-architecture.md), [08](./08-customer-crud-tools-and-prompt.md).

2. **Segurança de MCP: privilégio mínimo, servidores de terceiros e confiança em descrições.**
   - Por que diferencia: o guia traz, como número não verificado da live, que parte dos servidores diverge entre descrição e código, e lembra que servidores de terceiros rodam com os seus privilégios. Governar isso é trabalho de especialista.
   - Estudar: o documento Security Best Practices do MCP (https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices) e a documentação oficial de autorização do protocolo (confira a versão atual).
   - Praticar: audite um MCP de terceiros que você usa: liste as tools, o que cada uma pode escrever ou apagar e que escopo mínimo bastaria; aplique e documente.
   - Tópicos: [02](./02-mcp-tools-mongodb-csv-filesystem.md), [12](./12-mcp-with-service-token-and-errors.md).

3. **Transports e operação de MCP remoto.**
   - Por que diferencia: sair do stdio local para um servidor remoto compartilhado traz autenticação, limite, observabilidade e versionamento. O guia diz que ao expor por rede isso vira requisito.
   - Estudar: seção de transports da especificação oficial do MCP (confira a versão atual; na prática, o que a comunidade faz hoje é usar HTTP com streaming em vez de SSE separado, mas verifique na especificação vigente).
   - Praticar: exponha o servidor do exercício anterior por HTTP com autenticação por token, 429 e logs estruturados por chamada de tool (quem, qual tool, latência).
   - Tópico: [14](./14-transports-and-next-steps.md).

4. **Custo de contexto das tools e escolha entre MCP, CLI + skill e API direta.**
   - Por que diferencia: o guia relata, como número não verificado da live, que catálogos de muitos servidores podem consumir dezenas de milhares de tokens por sessão. Saber quando não usar MCP é critério de especialista.
   - Estudar: o tópico da live e a documentação oficial de skills do seu agente de código.
   - Praticar: meça os tokens do catálogo de tools do seu agente com 1, 3 e 6 servidores ligados e compare com a mesma tarefa via CLI + skill.
   - Tópicos: [16](./16-live-mcp-and-skills-practical-case.md), [05](./05-agent-skills.md).

## 🧂 Pode ficar no superficial
- **Google Trends como tool ([03](./03-services-as-tools-google-trends.md)):** demo de uma API externa específica, com cota e chave. O que sobra de útil (regra de negócio testável em service, fixture para não gastar cota) cabe em uma linha.
- **LangChain.js e LangGraph ([01](./01-multi-mcp-app-and-intent-parsing.md), [02](./02-mcp-tools-mongodb-csv-filesystem.md), [15](./15-langchain-agent-consuming-mcp.md)):** guarde a ideia (separar interpretar de executar, validar a intenção por schema, nunca deixar o modelo fazer conta ou conversão que código faz exato). A API do framework muda com frequência e você pode usar o SDK do seu provedor ou Python. Os projetos de 01, 02, 03 e 15 não foram executados pelo guia (sem chave do OpenRouter); o 09 foi verificado rodando.
- **Publicação em NPM e Verdaccio ([13](./13-publishing-npm-and-verdaccio.md)):** é empacotamento Node comum. Em time, um registry privado e `npx` resolvem; não estude além disso.
- **MongoDB MCP e File System MCP ([02](./02-mcp-tools-mongodb-csv-filesystem.md)):** o aprendizado é o escopo mínimo (só a pasta necessária), não o servidor em si. Para Postgres, avalie antes se uma tool sua com consulta parametrizada não é mais segura.
- **JWT e RBAC clássicos ([09](./09-jwt-and-rbac.md)):** leia só a seção Verificado (o JWT do código não tem `exp`, contrariando a apostila). Aproveite só a ideia de proteger por padrão e liberar exceções.

## ⚠️ Cuidados e lacunas
- **O código do curso é didático e o guia lista falhas verificadas:** JWT sem expiração, rate limit que não cobre token inválido, bug de schema no `get_customer`, teste que passa por acidente, salt fixo na cripto de exemplo. Não copie para produção.
- **O service token do curso não expira nem tem revogação ou rotação.** Em produção, trate isso como lacuna a fechar, e o token no arquivo de config do editor como exposto a quem lê o arquivo.
- **Lacuna: autorização por usuário final.** O MCP do curso usa uma credencial de serviço para tudo. Quando o agente age em nome de usuários diferentes, falta propagar identidade e permissões por usuário; o curso não cobre isso. Minha análise: é o principal ponto de governança a estudar depois.
- **Lacuna: avaliação e observabilidade.** O guia testa o servidor (contrato), mas não mede se o agente escolhe bem as tools nem traz tracing das chamadas. Minha análise: complemente com um conjunto pequeno de casos de avaliação e logs por chamada.
- **A live (16) traz números não verificados e não registra o resultado da demonstração.** Trate 75.000 tokens, 98%, 50.000 a 150.000 e 13% como ordens de grandeza a conferir, não como fatos.

## ✔️ Como saber que aprendeu
- Consigo, sem consultar, desenhar um servidor MCP sobre uma API minha (tools por intenção, schemas de entrada e saída, erros estruturados) e explicar por que não espelhei os endpoints.
- Meu servidor MCP tem testes via MCP Client real que chamam `listTools` e conferem `structuredContent`, e o Inspector mostra exatamente o que espero.
- Meu serviço tem credencial por consumidor com falha rápida na subida, 429 verificável por teste (inclusive para token inválido) e log por chamada de tool.

Veja também a [trilha consolidada](../../study-roadmap.md).
