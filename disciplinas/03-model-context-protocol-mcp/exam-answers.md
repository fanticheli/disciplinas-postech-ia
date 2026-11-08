# 📝 Disciplina 03 · Prova comentada

> Model Context Protocol (MCP). Cada questão traz o enunciado, a resposta certa, o raciocínio, uma mini-aula dos conceitos citados, o erro de cada alternativa errada e onde se aprofundar no guia de leitura.

**Resumo das respostas**

| Questão | Tema | Resposta |
|---------|------|----------|
| 01 | Limitação de skills em relação ao MCP | **B** |
| 02 | LangChain e MCP | **E** |
| 03 | Economizar janela de contexto em editor com agentes | **C** |
| 04 | JWT x Service Tokens em servidor MCP | **C** |
| 05 | Por que o MCP ganhou tração | **B** |
| 06 | Custom tool x servidor MCP com adapters | **D** |
| 07 | csvToJSON: custom tool x MCP externo | **A** |
| 08 | Autonomia do modelo com tools x workflow rígido | **A** |
| 09 | MCP bem desenhado x documentação extensa de API | **A** |
| 10 | Quando preferir workflow manual completo | **C** |

---

## Questão 01 · Limitação de skills em relação ao MCP

**Pergunta:** Qual é a principal limitação das skills quando comparadas ao MCP?

**Alternativas:**
- A) Skills dependem de um modelo proprietário, enquanto o MCP seria o compatível com modelos open source.
- B) ✅ Skills especializam o comportamento do agente, mas não padronizam por si só a exposição de ações, contexto e descoberta entre cliente e servidor.
- C) Skills servem apenas para tarefas locais, e o MCP foi criado apenas para orquestrar vários agentes.
- D) Skills deixam de funcionar quando o editor precisa de dados sob demanda.
- E) Skills não conseguem conter instruções estruturadas.

**Resposta: B.** Skills especializam o comportamento do agente, mas não padronizam por si só a exposição de ações, contexto e descoberta entre cliente e servidor.

### Resolução comentada

A pergunta pede o limite de um instrumento em relação ao outro, então comece perguntando: o que cada um faz? Skill é conhecimento e instrução: ensina o agente a fazer uma tarefa do jeito certo. MCP é um protocolo: define como um servidor expõe o que sabe fazer e como um cliente descobre isso.

Por isso a skill, sozinha, não resolve a integração entre cliente e servidor. Ela não tem um formato padrão para publicar ações, entregar contexto e permitir descoberta. O guia resume assim: MCP cuida de execução e integração, skills cuidam de instrução e conhecimento, e os dois se complementam.

As outras alternativas inventam limitações de licença, de escopo ou de formato que não existem. Quando um enunciado pede "a principal limitação", desconfie de respostas com "apenas", "somente" e "deixam de funcionar".

### Entenda os conceitos

- **Skill:** conjunto de instruções focadas numa tarefa, com exemplos e boas práticas, em arquivos markdown. O sistema carrega a skill só quando o pedido combina com a descrição dela (sob demanda). Analogia do guia: manuais finos na estante, cada um com etiqueta; você puxa só o do assunto.
- **MCP (Model Context Protocol):** protocolo cliente-servidor aberto que conecta aplicações de IA a sistemas externos. O servidor expõe tools, resources e prompts, e o cliente descobre o que existe.
- **Tool, resource e prompt (as três primitivas do MCP):** tool executa ação; resource entrega dado de leitura como contexto; prompt é um template pronto que guia o uso. A live resume: MCP são os "braços e pernas" da IA e as skills são o "cérebro".
- **Descoberta de capacidades:** o cliente pergunta ao servidor o que ele oferece em vez de ter tudo declarado à mão. É o que a skill, por si só, não padroniza.
- **Agent x skill:** agent é um papel (dev, QA), skill é uma habilidade (banco de dados, testes). Você escolhe o agent; o sistema identifica as skills relevantes.

### Por que as outras erram

- **A:** skill não depende de modelo proprietário, e MCP não é "o compatível com open source". A diferença não é de licença do modelo.
- **C:** skill não serve só a tarefas locais, e o MCP não nasceu só para orquestrar vários agentes. Ele padroniza a conexão com serviços e dados.
- **D:** skill não para de funcionar quando o editor precisa de dados sob demanda. Ela mesma é carregada sob demanda; só não busca dados em sistemas externos de forma padronizada.
- **E:** skill pode, sim, conter instruções estruturadas (arquivo markdown com metadados, instruções e referências).

### Aprofundar no guia

- [05 · Skills](./projeto-de-leitura/05-agent-skills.md), seção "O que é": a comparação direta entre skills e MCP (ambos economizam contexto, mas um é instrução e o outro é execução).
- [05 · Skills](./projeto-de-leitura/05-agent-skills.md), seção "Como funciona": anatomia do `SKILL.md` e divulgação progressiva em três níveis.
- [00 · Do plugin e function calling ao MCP](./projeto-de-leitura/00-mcp-protocol-overview.md), seção "Como funciona": as três primitivas e a frase "braços e pernas" x "cérebro".

*Código da questão: 161795*

---

## Questão 02 · LangChain e MCP

**Pergunta:** Qual afirmação descreve corretamente a relação entre o LangChain e o MCP?

**Alternativas:**
- A) O LangChain só suporta MCP para ler resources, não tools.
- B) O LangChain abandonou o conceito de tools em favor do MCP.
- C) MCP é sinônimo de plugin do editor, e o LangChain apenas o repassa.
- D) O MCP obriga o servidor a copiar o schema de function calling da OpenAI.
- E) ✅ O LangChain usa a nomenclatura "tools" e pode suportar MCP por adaptadores, preservando a abstração do framework.

**Resposta: E.** O LangChain usa a nomenclatura "tools" e pode suportar MCP por adaptadores, preservando a abstração do framework.

### Resolução comentada

O ponto-chave é que o MCP não aposentou o conceito de tool: ele o envolve. O MCP é uma camada de protocolo maior, e as tools continuam sendo as capacidades que o modelo enxerga. Por isso frameworks seguem falando em "tools" mesmo quando conversam com servidores MCP.

Como o framework já tem seu próprio formato de tool, falta uma ponte. Essa ponte é o adapter: ele pega o que o servidor MCP expõe e converte para tools que o LangChain entende. O resto do código do agente não muda.

Se você lembrar da imagem "o MCP envolve as tools, não as elimina", descarta A, B e C sem esforço. A D troca causa por efeito: quem converte formatos é o adapter, não o servidor.

### Entenda os conceitos

- **Tool:** ação executável exposta ao modelo, com nome, descrição e schema de entrada. No MCP continuam existindo como uma das três primitivas.
- **Adapter:** camada que traduz capacidades MCP para o formato de tool do framework. No projeto do curso, o `MultiServerMCPClient` do LangChain conecta a vários servidores MCP e os converte em tools.
- **LangChain / LangChain.js:** framework para montar agentes e fluxos com LLMs. É quem consome as tools, venham elas de custom tool ou de servidor MCP.
- **Function calling:** mecanismo anterior ao MCP em que funções descritas ao modelo (nome, descrição, estrutura de entrada) são oferecidas para ele escolher qual chamar e gerar os argumentos.
- **stdio:** transporte local em que o servidor MCP roda como processo filho do cliente. Todos os servidores do módulo usam stdio.

### Por que as outras erram

- **A:** o suporte não se limita a ler resources. As tools do servidor MCP viram tools do agente.
- **B:** o LangChain não abandonou tools. Ele as mantém e acrescenta o MCP por cima.
- **C:** MCP não é sinônimo de plugin do editor. É um protocolo cliente-servidor.
- **D:** o MCP não obriga o servidor a copiar o schema de function calling da OpenAI. O adapter é que faz a conversão para o framework.

### Aprofundar no guia

- [02 · MongoDB MCP, tool customizada e File System MCP](./projeto-de-leitura/02-mcp-tools-mongodb-csv-filesystem.md), seção "Cola rápida": definição de `MultiServerMCPClient` e de adapter.
- [00 · Do plugin e function calling ao MCP](./projeto-de-leitura/00-mcp-protocol-overview.md), seção "O que é": o item "MCP não substitui tools" explica por que frameworks ainda dizem "tools".
- [Disciplina 02 · MCP, PromptTemplate e guardrails](../02-apis-de-ia-generativa-e-prompt-engineering/projeto-de-leitura/07-mcp-e-guardrails.md), seção "O que é": o mesmo adapter e o `MultiServerMCPClient` vistos de dentro de um grafo LangGraph.

*Código da questão: 161789*

---

## Questão 03 · Economizar janela de contexto em editor com agentes

**Pergunta:** Qual estratégia ajuda a economizar janela de contexto num editor com agentes?

**Alternativas:**
- A) Usar prompts longos e evitar resources, para o modelo ter tudo à mão.
- B) Transformar cada endpoint da API em uma skill separada.
- C) ✅ Um custom agent enxuto, skills para padrões recorrentes e MCP para buscar contexto e ações conforme a necessidade.
- D) Enviar no início o manual, a lista de APIs, os exemplos e a árvore do projeto.
- E) Criar um prompt mestre enorme e evitar tools e MCP.

**Resposta: C.** Um custom agent enxuto, skills para padrões recorrentes e MCP para buscar contexto e ações conforme a necessidade.

### Resolução comentada

A palavra-chave é "economizar". Janela de contexto é um recurso caro e limitado: tudo que você coloca nela custa tokens, tempo e atenção do modelo. A estratégia certa é não carregar nada de antemão e deixar cada coisa entrar só quando for necessária.

A alternativa C distribui o trabalho em três peças, todas sob demanda. O agent enxuto define o papel sem despejar manuais. As skills guardam os procedimentos repetidos e só são carregadas quando o pedido combina com a descrição. O MCP busca dados e executa ações na hora em que forem precisos.

Todas as outras alternativas fazem o contrário: concentram informação no prompt, logo no começo. Isso gasta janela e ainda aumenta o risco de o modelo ignorar partes importantes.

### Entenda os conceitos

- **Janela de contexto:** quantidade de texto (tokens) que o modelo consegue considerar numa interação. Prompts grandes batem no limite, o modelo não prioriza bem tudo e a resposta perde consistência.
- **Custom agent:** um prompt especializado com papel, regras e ferramentas próprios (código, testes, revisão). Prompts menores por agent significam menos tokens, respostas mais rápidas e menos erro. Analogia do guia: em vez de um estagiário que faz tudo, uma equipe com bilhetes curtos do que cada um faz.
- **Arquivo de instrução:** documento persistente com arquitetura, convenções e decisões do projeto. É útil, mas em projetos reais pode chegar a milhares de palavras, e aí consome contexto. A solução do guia são as skills.
- **Divulgação progressiva:** a skill carrega só nome e descrição primeiro (algo como 30 a 100 tokens, segundo a live), o corpo do `SKILL.md` quando o pedido bate, e as referências só se o corpo mandar.
- **Sob demanda:** buscar a informação no momento em que ela é necessária, em vez de carregá-la antes. É o fio condutor de skills, MCP e agents enxutos.

### Por que as outras erram

- **A:** prompts longos gastam mais janela, o contrário do objetivo. E resources existem justamente para trazer contexto sob demanda.
- **B:** transformar cada endpoint em skill gera dezenas de skills e confunde skill (conhecimento) com integração (MCP).
- **D:** mandar manual, lista de APIs, exemplos e árvore do projeto no início enche a janela, e o modelo ainda pode ignorar partes importantes.
- **E:** um prompt mestre enorme volta ao problema do prompt grande, e evitar tools e MCP tira do agente a capacidade de buscar só o que precisa.

### Aprofundar no guia

- [05 · Skills](./projeto-de-leitura/05-agent-skills.md), seção "Como funciona": os três níveis da divulgação progressiva.
- [05 · Skills](./projeto-de-leitura/05-agent-skills.md), seção "🚫 Armadilhas": o alerta contra skill enorme num único arquivo, que recria o prompt gigante.
- [04 · Instruções, llms.txt e agents](./projeto-de-leitura/04-instructions-llms-txt-and-agents.md), seção "Como funciona": a divisão de responsabilidades entre agents e por que prompts menores rendem mais.
- [Disciplina 04 · Contexto como orçamento](../04-criacao-de-agentes-autonomos/projeto-de-leitura/10-contexto-como-orcamento.md), seção "O que é": medir tokens, podar e sumarizar o contexto.

*Código da questão: 161793*

---

## Questão 04 · JWT x Service Tokens em servidor MCP

**Pergunta:** Qual é a diferença entre JWT e Service Tokens num servidor MCP?

**Alternativas:**
- A) Service Tokens substituem a autorização por papéis e escopos.
- B) JWT e Service Tokens são a mesma coisa, só muda o nome.
- C) ✅ O JWT está mais associado a identidade e sessão de usuários ou serviços. Os Service Tokens são úteis para credenciar integrações específicas de forma mais direta e controlável.
- D) Service Tokens servem apenas para rate limiting.
- E) Service Tokens são uma forma de transporte do MCP, e o JWT só serve para APIs REST.

**Resposta: C.** O JWT está mais associado a identidade e sessão de usuários ou serviços. Os Service Tokens são úteis para credenciar integrações específicas de forma mais direta e controlável.

### Resolução comentada

Pense em quem vai usar a credencial. Uma pessoa faz login, recebe um token que expira e o usa por um tempo: é o JWT. Um editor, um agente ou uma integração não faz login manual nem renova token toda hora: precisa de uma credencial persistente que represente aquela integração. É o service token.

Isso explica a frase da alternativa C: o JWT liga-se a identidade e sessão, e o service token credencia integrações de modo direto e controlável. O custo da simplicidade é que, se o service token vazar, ele continua válido até alguém cancelar. Por isso sistemas reais precisam de revogação, rotação e monitoramento.

Para eliminar as demais, lembre que autenticação (quem é você) e autorização (o que pode fazer) são coisas diferentes, e que os dois tipos de token convivem com o mesmo RBAC.

### Entenda os conceitos

- **JWT (JSON Web Token):** token assinado que carrega a identidade (no projeto, username e papel). O usuário informa credenciais, recebe o token e o usa nas chamadas seguintes. Pode expirar, o que protege em caso de vazamento. Analogia do guia: o ingresso de um dia do parque, que expira e se compra de novo.
- **Service token:** credencial opaca de integração, reutilizável e sem expiração automática, guardada pelo servidor (token, usuário associado e papel). Analogia: o passe anual de um fornecedor, que entra todo dia sem fila e, se roubado, vale até alguém cancelar.
- **RBAC (role-based access control):** autorização baseada em papel. No exemplo do curso, `member` só lê e `admin` lê, cria, atualiza e remove. Vale para os dois tipos de token.
- **Super secret:** segredo extra, usado só para autorizar a criação de service tokens, para que usuários comuns não gerem tokens à vontade.
- **Revogação e rotação:** invalidar um token específico antes de qualquer expiração e trocar tokens periodicamente para limitar o dano de um vazamento.
- **Autenticação x autorização:** a primeira prova quem você é (JWT ou service token); a segunda decide o que você pode fazer (RBAC).

### Por que as outras erram

- **A:** service token não substitui autorização por papéis e escopos. O token guarda o papel do usuário associado, e o RBAC continua valendo.
- **B:** não é só o nome. Um expira e representa sessão, o outro não expira e representa integração.
- **D:** service token não é só para rate limiting. Ele autentica a integração (o limite por token é uma possibilidade extra).
- **E:** service token não é forma de transporte do MCP, e JWT não se restringe a APIs REST.

### Aprofundar no guia

- [10 · Service tokens](./projeto-de-leitura/10-service-tokens.md), seção "O que é": comparação lado a lado de JWT e service token, mais o custo da simplicidade.
- [10 · Service tokens](./projeto-de-leitura/10-service-tokens.md), seção "Como funciona": os dois caminhos no mesmo hook e o resultado unificado (usuário e papel).
- [09 · JWT e RBAC](./projeto-de-leitura/09-jwt-and-rbac.md), seção "O que é": por que o MCP costuma usar outro modelo de credencial além do JWT.
- [09 · JWT e RBAC](./projeto-de-leitura/09-jwt-and-rbac.md), seção "Como funciona": hooks `onRequest` (autentica) e `preHandler` (autoriza por papel).

*Código da questão: 161842*

---

## Questão 05 · Por que o MCP ganhou tração

**Pergunta:** O MCP ganhou tração não por "reinventar IA", mas por atacar um problema recorrente de integração. Qual alternativa descreve melhor esse ponto?

**Alternativas:**
- A) Definindo um formato único de autenticação para todos os servidores.
- B) ✅ Trocando a lógica de endpoints por um modelo orientado a ações e descoberta sob demanda.
- C) Dispensando frameworks de agentes.
- D) Garantindo menor latência que qualquer API REST.
- E) Sendo o primeiro mecanismo a oferecer parâmetros tipados para o modelo.

**Resposta: B.** Trocar a lógica de endpoints por um modelo orientado a ações e descoberta sob demanda.

> Esta questão veio sem resolução comentada. A resposta foi deduzida do material.

### Resolução comentada

O enunciado já dá a pista: o problema é a complexidade das integrações, não a inteligência da IA. Então a resposta tem de descrever uma mudança na forma de integrar. Com function calling, você descreve tudo à mão (um item por endpoint) e qualquer mudança exige atualizar as definições. O MCP muda dois pontos: expõe ações ligadas a uma intenção de negócio (por exemplo, "buscar cliente por nome") e deixa o cliente descobrir o que o servidor oferece.

Como consequência, o modelo recebe só o necessário e pede mais contexto quando precisar, gastando menos tokens. Isso é exatamente o que a B diz.

Nas demais, procure o exagero: "único formato para todos", "dispensando", "garantindo menor latência que qualquer", "o primeiro". São afirmações absolutas que o material contradiz.

### Entenda os conceitos

- **Complexidade de integrações (problema N x M):** cada modelo com cada fonte de dados exigia uma integração própria. O MCP, apresentado como o "USB-C das aplicações de IA", padroniza essa conexão (live).
- **Linha do tempo:** plugins do ChatGPT (março de 2023), function calling (junho de 2023) e depois o MCP, lançado pela Anthropic no fim de 2024 (live). A apostila insiste que não foi ruptura, e sim resposta a um problema antigo.
- **Abstração orientada ao domínio:** em vez de uma tool por endpoint (buscar por ID, listar, detalhar), uma ação de negócio. O servidor orquestra por trás e esconde autenticação, autorização e múltiplos endpoints. Analogia do guia: em vez de pedir "prato 12, 14 e 15", o cliente pede "um jantar para duas pessoas".
- **Descoberta sob demanda:** o cliente lista as capacidades do servidor (`tools/list`) em vez de recebê-las todas descritas à mão. A analogia do garçom que pergunta à cozinha "o que vocês fazem hoje?".
- **Function calling:** funções com nome, descrição e estrutura de entrada entregues ao modelo, que escolhe qual chamar. Reduziu alucinações, mas a integração fica superficial e declarada à mão.

### Por que as outras erram

- **A:** o MCP não define um formato único de autenticação. A autenticação (JWT, service token) fica a cargo do servidor.
- **C:** o MCP não dispensa frameworks. Eles consomem o MCP como tools e seguem orquestrando o agente.
- **D:** não há garantia de menor latência que qualquer API REST. O ganho está em integração e economia de contexto.
- **E:** o primeiro passo foi o function calling (junho de 2023), que já dava parâmetros tipados. O MCP veio depois e acrescentou resources, prompts e descoberta.

### Aprofundar no guia

- [00 · Do plugin e function calling ao MCP](./projeto-de-leitura/00-mcp-protocol-overview.md), seção "O que é": linha do tempo, limite do function calling e a abstração por ação.
- [00 · Do plugin e function calling ao MCP](./projeto-de-leitura/00-mcp-protocol-overview.md), seção "Como funciona": o problema N x M, a arquitetura host/client/server e o ciclo descoberta, planejamento, execução.
- [00 · Do plugin e function calling ao MCP](./projeto-de-leitura/00-mcp-protocol-overview.md), seção "🚫 Armadilhas": tratar o MCP como ruptura total ou espelhar a API endpoint por endpoint.

*Código da questão: 161785*

---

## Questão 06 · Custom tool x servidor MCP com adapters

**Pergunta:** No LangChain.js, quando escolher uma custom tool em vez de um servidor MCP com adapters?

**Alternativas:**
- A) Quando se quer evitar que o modelo extraia o CSV do prompt.
- B) Quando a solução é apenas um protótipo, pois custom tools não servem para produção.
- C) Quando se quer que o modelo escolha quando executar a ferramenta.
- D) ✅ Quando a capacidade é interna ao fluxo, tem escopo restrito e não precisa de exposição padronizada a outros clientes, a custom tool tende a ser a escolha mais direta.
- E) Sempre que o modelo puder chamar a capacidade, ela deve virar um servidor MCP.

**Resposta: D.** Quando a capacidade é interna ao fluxo, tem escopo restrito e não precisa de exposição padronizada a outros clientes, a custom tool tende a ser a escolha mais direta.

### Resolução comentada

É uma pergunta de custo e escopo. Um servidor MCP compensa quando você quer padronizar exposição, descoberta e consumo por vários clientes. Se a capacidade é uma função pequena, usada só dentro da sua aplicação, subir um servidor à parte é infraestrutura a mais sem ganho. Nesse caso a custom tool é o caminho direto.

O guia mostra isso com a ferramenta que converte CSV em JSON: é uma tarefa determinística, que vira tool dentro da aplicação, sem precisar de servidor MCP completo.

Cuidado com as alternativas que atribuem ao MCP algo que qualquer tool faz (A e C) ou que dão regra absoluta (B e E).

### Entenda os conceitos

- **Custom tool:** função exposta ao modelo dentro da aplicação, com dois blocos: a função que executa e o objeto de configuração (nome, descrição, schema de entrada, mensagens). O resultado volta como string.
- **Servidor MCP com adapters:** processo separado que expõe capacidades por protocolo; o adapter as converte em tools para o framework. Faz sentido para reuso, descoberta padronizada e integrações prontas (banco, arquivos, SaaS).
- **Tool não é servidor MCP:** o guia é explícito: tool é uma função dentro da aplicação; MCP é a camada mais ampla de protocolo, descoberta, transporte e integração. No projeto, os dois são usados de forma complementar.
- **Tarefa determinística:** a que tem resposta exata (conversão, cálculo, formatação). O guia recomenda tirá-la do modelo e entregá-la a código, por confiabilidade e economia de tokens.
- **Schema da tool:** contrato de entrada. O modelo só consegue chamar a tool se enviar os parâmetros no formato esperado, e a validação é a barreira entre a liberdade do modelo e a segurança da aplicação.

### Por que as outras erram

- **A:** o que evita o modelo extrair o CSV do prompt é ter uma tool, seja custom ou MCP. O MCP não é "melhor" por isso.
- **B:** custom tool não é só protótipo. Pode ir para produção, e produção não exige MCP.
- **C:** qualquer tool deixa o modelo escolher quando executar. Isso não é exclusivo do MCP.
- **E:** "sempre que o modelo puder chamar, vira MCP" é exagero. Ignora o custo e o escopo.

### Aprofundar no guia

- [02 · MongoDB MCP, tool customizada e File System MCP](./projeto-de-leitura/02-mcp-tools-mongodb-csv-filesystem.md), seção "O que é": os itens "Tool customizada (aula 4)" e "Tool não é servidor MCP".
- [02 · MongoDB MCP, tool customizada e File System MCP](./projeto-de-leitura/02-mcp-tools-mongodb-csv-filesystem.md), seção "Vantagens e limites": "Não é preciso um servidor MCP completo para uma função pontual".
- [02 · MongoDB MCP, tool customizada e File System MCP](./projeto-de-leitura/02-mcp-tools-mongodb-csv-filesystem.md), seção "Onde aplicar": quando virar tool e quando entrar como servidor MCP pronto.

*Código da questão: 161800*

---

## Questão 07 · csvToJSON: custom tool x MCP externo

**Pergunta:** A custom tool csvToJSON recebe o CSV extraído do prompt pelo modelo e devolve JSON. Qual afirmação compara essa tool com um MCP externo?

**Alternativas:**
- A) ✅ Para uma transformação local, simples e encapsulada, um servidor MCP separado adicionaria infraestrutura sem ganho proporcional.
- B) MCP só serve para acessar APIs e bancos, não para transformar texto.
- C) Custom tools não definem schema de entrada, enquanto o MCP define.
- D) Adapters só funcionam com servidores remotos e dependem de service tokens.
- E) A tool acessa o "raciocínio interno" do modelo, enquanto o MCP não.

**Resposta: A.** Para uma transformação local, simples e encapsulada, um servidor MCP separado adicionaria infraestrutura sem ganho proporcional.

### Resolução comentada

Esta questão é o exemplo concreto da anterior. Converter CSV em JSON é local, pontual e determinístico: uma função dentro da aplicação resolve. Um MCP externo só se justifica com reuso por vários clientes, descoberta padronizada ou capacidades amplas, e nada disso se aplica aqui.

O contexto importa: o guia explica que deixar o modelo converter CSV em JSON traz inconsistência e gasto de tokens, porque trata uma tarefa determinística como inferência. A tool resolve isso. Transformá-la em servidor MCP seria custo extra.

As demais alternativas afirmam coisas falsas sobre MCP, schema e adapters. Basta lembrar que toda tool tem schema e que o modelo preenche os parâmetros, nunca "entrega seu raciocínio".

### Entenda os conceitos

- **csv_to_json (a tool do curso):** tool customizada com schema Zod; recebe `csvText` e devolve o JSON em string. O modelo extrai o CSV do prompt do usuário e o passa como parâmetro.
- **Schema (Zod):** descreve os campos de entrada da tool. É o contrato que o modelo precisa respeitar para a chamada funcionar.
- **Inferência x código determinístico:** o modelo é probabilístico, bom para entender intenção e ruim para conta e conversão com precisão garantida. Analogia do guia: o modelo até soma uma planilha de cabeça, como um chef fazendo conta no guardanapo, mas é melhor entregar uma calculadora.
- **Descrição da tool:** é o que o modelo lê para decidir usá-la. O guia dá a dica de que uma descrição "converte CSV em JSON" evita que ele tente converter por conta própria.
- **Servidor MCP externo:** processo à parte que expõe capacidades por protocolo. Entra bem para banco (MongoDB MCP) e arquivos (File System MCP), que já existem prontos.

### Por que as outras erram

- **B:** MCP pode expor qualquer capacidade, inclusive transformar texto. Não se limita a APIs e bancos.
- **C:** toda custom tool define um schema de entrada. No exemplo é um texto CSV.
- **D:** adapters funcionam com servidores locais também (o transporte do curso é stdio), e não dependem de service tokens.
- **E:** a tool não acessa o "raciocínio interno" do modelo. Ela recebe os parâmetros que o modelo preenche, e o MCP também.

### Aprofundar no guia

- [02 · MongoDB MCP, tool customizada e File System MCP](./projeto-de-leitura/02-mcp-tools-mongodb-csv-filesystem.md), seção "O que é": por que converter CSV na LLM é ruim e como a tool resolve.
- [02 · MongoDB MCP, tool customizada e File System MCP](./projeto-de-leitura/02-mcp-tools-mongodb-csv-filesystem.md), seção "Cola rápida": `csv_to_json`, adapter e stdio.
- [01 · App com múltiplos MCPs e parsing da intenção](./projeto-de-leitura/01-multi-mcp-app-and-intent-parsing.md), seção "O que é": o pipeline completo em que a conversão aparece (CSV para JSON, MongoDB, relatório).

*Código da questão: 161799*

---

## Questão 08 · Autonomia do modelo com tools x workflow rígido

**Pergunta:** Qual é o ganho de autonomia do modelo com tools em comparação com um workflow rígido?

**Alternativas:**
- A) ✅ O modelo recebe as capacidades disponíveis e decide quando usá-las, enquanto no workflow rígido o encadeamento vem fixado em código.
- B) O desenvolvedor deixa de definir regras de negócio, limites e permissões.
- C) O LangChain.js converte qualquer workflow em agente totalmente autônomo.
- D) O modelo executa JavaScript diretamente, sem passar pela aplicação.
- E) Tools eliminam a necessidade de validação de entrada.

**Resposta: A.** O modelo recebe as capacidades disponíveis e decide quando usá-las, enquanto no workflow rígido o encadeamento vem fixado em código.

### Resolução comentada

O que muda é quem manda na sequência. No workflow rígido, o código diz "faça A, depois B, depois C". Com tools, você entrega as ferramentas e as instruções, e o modelo decide qual usar, quando e como encadear. No projeto do curso o código não define a ordem das ações: o pipeline é descrito em alto nível, não programado passo a passo.

Isso não tira a responsabilidade do desenvolvedor. Regras de negócio, limites, permissões e validação continuam existindo. Só uma parte da orquestração passa para o modelo.

Uma boa heurística: alternativas que dizem "deixa de", "converte qualquer" ou "elimina a necessidade" tratam autonomia como mágica. O material mostra o contrário, inclusive com a etapa de validação da intenção antes de qualquer ação.

### Entenda os conceitos

- **Workflow rígido (orquestração imperativa):** o código fixa a ordem das etapas. É previsível, mas exige código para cada caminho.
- **Autonomia do modelo (orquestração autônoma):** o modelo escolhe a ordem e as ferramentas. Permite, por exemplo, pular a conversão de CSV quando o dado já é JSON.
- **Agent node e intentParser:** no projeto, um nó interpreta a pergunta e a transforma num objeto estruturado validado por schema; outro nó (o agent) executa com as tools. Analogia do guia: a recepcionista passa o pedido a limpo numa ficha, e o gerente escolhe sozinho as ferramentas.
- **Aresta condicional:** decide o próximo nó a partir do estado. Se a interpretação falha, o fluxo para.
- **Retentativa:** o modelo pode reconsultar o servidor MCP, ver exemplos de uso, ajustar e tentar de novo.
- **Observabilidade:** o comportamento do modelo é probabilístico, então logs de entradas, saídas, chamadas de tools e tentativas são essenciais para depurar.

### Por que as outras erram

- **B:** o desenvolvedor continua definindo regras de negócio, limites e permissões.
- **C:** o LangChain.js não converte qualquer workflow em agente totalmente autônomo. Isso é escolha de projeto.
- **D:** o modelo não executa JavaScript direto. Ele pede a chamada e a aplicação executa a tool.
- **E:** tools não eliminam a validação de entrada. O schema da tool existe justamente para isso.

### Aprofundar no guia

- [01 · App com múltiplos MCPs e parsing da intenção](./projeto-de-leitura/01-multi-mcp-app-and-intent-parsing.md), seção "O que é": o item "Autonomia do modelo" e o pipeline descrito em alto nível.
- [01 · App com múltiplos MCPs e parsing da intenção](./projeto-de-leitura/01-multi-mcp-app-and-intent-parsing.md), seção "Como funciona": por que o parsing da intenção vem primeiro, retentativa e observabilidade.
- [15 · Agente LangChain.js consumindo o Customers MCP](./projeto-de-leitura/15-langchain-agent-consuming-mcp.md), seção "Como funciona": a demonstração que força o encadeamento entre dois MCPs.

*Código da questão: 161796*

---

## Questão 09 · MCP bem desenhado x documentação extensa de API

**Pergunta:** Por que um MCP bem desenhado tende a ser mais eficiente que expor uma documentação extensa de API no início?

**Alternativas:**
- A) ✅ Porque o agente recupera só as capacidades e o contexto necessários no momento da tarefa.
- B) Porque o MCP substitui autenticação e autorização.
- C) Porque o modelo memoriza as ações antes de usar o servidor.
- D) Porque o MCP converte endpoints REST em embeddings.
- E) Porque o agente só pode chamar uma tool por execução.

**Resposta: A.** Porque o agente recupera só as capacidades e o contexto necessários no momento da tarefa.

### Resolução comentada

Pense no custo. Um Swagger com dezenas ou centenas de endpoints teria de ser enviado inteiro ao modelo a cada interação, e LLM é cobrado por volume processado. Com ações de negócio e descoberta sob demanda, o agente consome só o necessário e pede mais contexto se faltar. Menos tokens, mesma capacidade.

O ponto não é o MCP "ser mais esperto", e sim carregar contexto apenas quando preciso, a mesma lógica das skills.

Para eliminar as outras, ligue cada uma a um conceito real: autenticação continua no servidor, o modelo descobre as ações durante o uso, embeddings são outro assunto, e o agente chama várias tools por execução.

### Entenda os conceitos

- **Documentação extensa (Swagger/OpenAPI):** descrição completa de todos os endpoints. Enviá-la inteira a cada conversa gasta tokens e dilui a atenção do modelo.
- **Ação de negócio:** uma tool ligada a uma intenção ("buscar cliente por nome"), em vez de uma por endpoint. O servidor consolida listar, filtrar, detalhar por trás.
- **Descoberta progressiva:** o agente consulta capacidades quando precisa. Complemento da live: o catálogo de dezenas de servidores carregado inteiro pode custar de 50.000 a 150.000 tokens por sessão, e há a técnica de o agente gerar pequenos scripts em sandbox que devolvem só o resultado filtrado (números da live, não verificados).
- **Token:** unidade de texto que o modelo processa; o custo e o limite de contexto são medidos nela.
- **Limite do MCP:** o guia (tópico 00, "Limites") diz que um servidor mal projetado é lento, inseguro e difícil de manter, como qualquer sistema.
- **Privilégio mínimo:** mitigação para esse risco, citada na live (tópico 00, logo após os limites), não o limite em si.

### Por que as outras erram

- **B:** o MCP não substitui autenticação e autorização. O servidor continua protegendo as ações (JWT, RBAC, service tokens).
- **C:** o modelo não memoriza as ações antes. Ele as descobre durante o uso.
- **D:** o MCP não converte endpoints REST em embeddings.
- **E:** o agente pode, sim, chamar várias tools na mesma execução (ex.: criar clientes, salvar em arquivo e listar).

### Aprofundar no guia

- [00 · Do plugin e function calling ao MCP](./projeto-de-leitura/00-mcp-protocol-overview.md), seção "Como funciona": o item "Comparação com REST" e a otimização de custo da live.
- [00 · Do plugin e function calling ao MCP](./projeto-de-leitura/00-mcp-protocol-overview.md), seção "Vantagens e limites": menos tokens, desacoplamento e o limite do custo do catálogo.
- [15 · Agente LangChain.js consumindo o Customers MCP](./projeto-de-leitura/15-langchain-agent-consuming-mcp.md), seção "Como funciona": o agente encadeando Customers MCP e File System na mesma execução.

*Código da questão: 161792*

---

## Questão 10 · Quando preferir workflow manual completo

**Pergunta:** Em que situação é melhor preferir um workflow manual completo a depender da autonomia com tools?

**Alternativas:**
- A) Quando o agente precisa refinar a estratégia pelo resultado de cada etapa.
- B) Quando se quer reduzir decisões explícitas em código.
- C) ✅ Quando a sequência é determinística, auditável e estritamente controlada.
- D) Quando a tarefa tem variação frequente, contexto ambíguo e escolha dinâmica entre integrações.
- E) Quando se quer combinar várias tools na mesma execução conforme o pedido.

**Resposta: C.** Quando a sequência é determinística, auditável e estritamente controlada.

### Resolução comentada

É a questão espelho da 08. Autonomia não é sempre melhor. Se os passos são fixos, previsíveis e precisam ser auditados, vale orquestrar de forma explícita no código: você sabe exatamente o que acontece e em que ordem. A autonomia compensa quando o caminho varia.

Um jeito rápido de resolver: cada alternativa errada descreve uma vantagem do agente com tools (refinar pelo resultado, reduzir código de decisão, lidar com ambiguidade, combinar várias tools). Só a C descreve uma necessidade que pede controle total.

O material reforça o cuidado: a autonomia com tools de escrita (como remover clientes) exige permissões e limites bem definidos, porque o modelo é probabilístico.

### Entenda os conceitos

- **Determinístico:** mesma entrada, mesmo caminho, mesmo resultado. O guia diz que o que é determinístico vira tool ou código, não inferência do modelo.
- **Auditável:** dá para reconstruir e justificar o que foi executado e por quê. Num workflow fixo é direto; com um modelo escolhendo, depende de logs (observabilidade).
- **Workflow manual x agente autônomo:** no primeiro o código fixa o encadeamento; no segundo o modelo decide. Escolha pelo grau de variação da tarefa e pelo nível de controle exigido.
- **Limites de autonomia:** privilégio mínimo e human-in-the-loop para ações irreversíveis (mitigações citadas na live). O token com papel mínimo (um `member` para um agente só de leitura) vem do tópico 10, não da live.
- **Memória de conversa:** no projeto final não há memória consolidada, então perguntas que dependem de contexto anterior podem falhar. Autonomia sem histórico tem limite.

### Por que as outras erram

- **A:** refinar a estratégia pelo resultado de cada etapa é comportamento de agente autônomo.
- **B:** reduzir decisões explícitas em código é o que a autonomia faz, não o workflow manual.
- **D:** tarefa com variação frequente, contexto ambíguo e escolha dinâmica entre integrações é o caso típico do agente com tools.
- **E:** combinar várias tools na mesma execução conforme o pedido também é autonomia.

### Aprofundar no guia

- [01 · App com múltiplos MCPs e parsing da intenção](./projeto-de-leitura/01-multi-mcp-app-and-intent-parsing.md), seção "Vantagens e limites": o comportamento probabilístico do modelo e a necessidade de logs.
- [15 · Agente LangChain.js consumindo o Customers MCP](./projeto-de-leitura/15-langchain-agent-consuming-mcp.md), seção "Vantagens e limites": autonomia com tools de escrita exige permissões e limites.
- [15 · Agente LangChain.js consumindo o Customers MCP](./projeto-de-leitura/15-langchain-agent-consuming-mcp.md), seção "🚫 Armadilhas": não dar token `admin` quando só leitura bastaria.
- [Disciplina 04 · Observabilidade e limites de autonomia](../04-criacao-de-agentes-autonomos/projeto-de-leitura/13-observabilidade-e-limites-de-autonomia.md): o mesmo tema aprofundado na disciplina de agentes.

*Código da questão: 161797*

---

## Pontos de atenção na prova

- **Texto das alternativas:** o arquivo anterior trazia só a alternativa correta e as razões de erro das demais. O texto das alternativas erradas foi reconstruído a partir dessas razões e pode diferir em palavras do enunciado original (o sentido é o mesmo).
- **Questão 05:** veio sem resolução. A resposta B foi deduzida do material, tópico 00 (o MCP não foi ruptura, mas resposta à complexidade das integrações; ações de negócio no lugar de endpoints; descoberta sob demanda). A E cai porque o function calling (junho de 2023) já trazia parâmetros tipados.
- **Questão 10:** o material não trata "workflow manual determinístico e auditável" como critério de escolha. Ele só mostra o contrário (autonomia, tópicos 01 e 15) e diz que o que é determinístico vira tool (README). A resposta C segue a resolução da prova.
- **Questão 03:** o material cobre skills, agents e MCP sob demanda (tópicos 04, 05 e 00), mas não traz a combinação "agent enxuto + skills + MCP" como estratégia de economia de contexto. A resposta C segue a resolução da prova.
- **Questão 06:** o material não traz o critério "custom tool x MCP" por escopo e custo arquitetural. Só diz que tool não é servidor MCP e que os dois se complementam (tópico 02). A resposta D segue a resolução da prova.
- **Questão 07:** o material não discute reuso por vários clientes como critério para um MCP externo. O que existe é que a conversão de CSV é determinística e vira tool (tópico 02). A resposta A segue a resolução da prova.
- **Questão 02:** o material confirma que adapters traduzem MCP para tools do framework (tópico 02) e que frameworks ainda dizem "tools" (tópico 00). O detalhe dos adaptadores do LangChain vem da resolução.
- **Questão 04:** o material confirma a diferença (tópicos 09 e 10), mas não usa o termo "segmentação por cliente". Revogação manual e rotação aparecem como necessidade em sistemas reais (tópico 10, `10-service-tokens.md`).

## Mapa de estudo desta disciplina

| Tema da prova | Tópico do guia que mais cobre |
|---------------|-------------------------------|
| Skills x MCP (Q01) | [05 · Skills](./projeto-de-leitura/05-agent-skills.md) |
| LangChain, tools e adapters (Q02) | [02 · MongoDB MCP, tool customizada e File System MCP](./projeto-de-leitura/02-mcp-tools-mongodb-csv-filesystem.md) |
| Economia de janela de contexto (Q03) | [05 · Skills](./projeto-de-leitura/05-agent-skills.md) e [04 · Instruções, llms.txt e agents](./projeto-de-leitura/04-instructions-llms-txt-and-agents.md) |
| JWT x service tokens (Q04) | [10 · Service tokens](./projeto-de-leitura/10-service-tokens.md) e [09 · JWT e RBAC](./projeto-de-leitura/09-jwt-and-rbac.md) |
| Por que o MCP ganhou tração (Q05) | [00 · Do plugin e function calling ao MCP](./projeto-de-leitura/00-mcp-protocol-overview.md) |
| Custom tool x servidor MCP (Q06, Q07) | [02 · MongoDB MCP, tool customizada e File System MCP](./projeto-de-leitura/02-mcp-tools-mongodb-csv-filesystem.md) |
| Autonomia do modelo x workflow rígido (Q08, Q10) | [01 · App com múltiplos MCPs e parsing da intenção](./projeto-de-leitura/01-multi-mcp-app-and-intent-parsing.md) e [15 · Agente LangChain.js consumindo o Customers MCP](./projeto-de-leitura/15-langchain-agent-consuming-mcp.md) |
| MCP x documentação extensa de API (Q09) | [00 · Do plugin e function calling ao MCP](./projeto-de-leitura/00-mcp-protocol-overview.md) |
