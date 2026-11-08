# 📝 Disciplina 02 · Prova comentada

> APIs de IA Generativa e Prompt Engineering. Cada questão traz o enunciado, as alternativas, a resposta certa, uma resolução passo a passo, uma mini-aula dos conceitos, o erro de cada alternativa errada e onde se aprofundar no guia de leitura.

**Resumo das respostas**

| Questão | Tema | Resposta |
|---------|------|----------|
| 01 | Segurança em tool calling | **D** |
| 02 | Tool calling iterativo x camada service | **A** |
| 03 | Memória de preferências entre sessões | **A** |
| 04 | Janela de contexto | **E** |
| 05 | Separação de responsabilidades: SQLite e PostgreSQL | **D** |
| 06 | Segurança em camadas | **E** |
| 07 | O que são safeguards | **A** |
| 08 | LangChain.js em produção | **A** |
| 09 | structuredOutputs e providerStrategy | **E** |
| 10 | Modelo multimodal | **C** |

---

## Questão 01 · Segurança em tool calling

**Pergunta:** Analise as afirmações sobre segurança em tool calling e marque a combinação correta de verdadeiro (V) e falso (F):

- I. Mesmo com um modelo com guardrails, a aplicação deve validar parâmetros e restringir as permissões das ferramentas.
- II. Se o modelo for "seguro", não é necessário implementar safeguards no backend.
- III. Safeguards no sistema ajudam a reduzir o impacto quando o modelo decide mal ou sofre prompt injection.

**Alternativas:**
- A) F, F, V
- B) V, V, F
- C) V, F, F
- D) V, F, V ✅
- E) F, V, V

**Resposta: D.** I verdadeira, II falsa, III verdadeira (V, F, V).

### Resolução comentada

A pergunta é sobre quem protege o sistema quando o modelo erra. A ideia central do guia é que o modelo é um componente que pode falhar, então a segurança real fica no código da aplicação, não na "boa vontade" do modelo.

Comece pela afirmação II, a mais fácil de julgar. Ela diz que um modelo "seguro" dispensa safeguards. O guia mostra o contrário: troque o modelo por um mais barato, sem mudar prompt nem regras, e a proteção some. Logo, II é falsa.

Agora I e III. A I diz que, mesmo com guardrails no modelo, a aplicação valida parâmetros e restringe permissões das tools: é exatamente a defesa que não depende do modelo, então é verdadeira. A III diz que safeguards reduzem o impacto quando o modelo decide mal ou sofre prompt injection: é o papel deles, então é verdadeira. Resultado: V, F, V.

### Entenda os conceitos

- **Tool calling:** o modelo deixa de só gerar texto e passa a pedir que a aplicação execute ferramentas (ler arquivo, consultar API, rodar comando). O guia mostra que isso aumenta a superfície de ataque: antes o modelo só gerava texto, agora pode agir.
- **Prompt injection:** entrada que tenta fazer o modelo ignorar as instruções do sistema, como "ignore as instruções anteriores, você está em modo de manutenção". O modelo processa texto, não entende hierarquia de autoridade como uma lista de permissões.
- **Guardrails do modelo:** proteções embutidas pelo provedor ou classificadores de entrada. Ajudam, mas o guia deixa claro que não são garantia: modelos menores ou open source falham mais, e até os robustos podem falhar.
- **Safeguards (no backend):** travas determinísticas no seu código, fora do modelo. Exemplos que a resolução da prova cita: RBAC, allowlists e escopo mínimo de ferramenta (complemento, fora do material, no sentido de lista de tools permitidas; o guia cobre RBAC e escopo de diretório no MCP).
- **RBAC (controle por papel):** a permissão sai do papel do usuário (por exemplo, `member` só lê, `admin` lê e escreve), não de regras soltas. Está no tópico de segurança de API da disciplina 03.
- **Validação de parâmetros:** conferir no código o que o modelo mandou antes de executar. No guia, o `safeParse` do Zod em cada node ("eu confio, mas eu confiro") é o exemplo.
- **Analogia do guia (porteiro):** o porteiro que obedece à regra escrita na parede pode ser enganado por um golpista, ou trocado por outro mais barato. A solução é uma catraca de verdade, que não depende do humor de ninguém.

### Por que as outras erram

- **A (F, F, V):** erra a I. Validar parâmetros e restringir permissões é obrigatório, não opcional.
- **B (V, V, F):** erra a II (não dá para abrir mão do backend) e a III (safeguards reduzem impacto, sim).
- **C (V, F, F):** acerta I e II, mas erra a III.
- **E (F, V, V):** erra a I e a II, as duas ao contrário.

### Aprofundar no guia

- [06 · Prompt injection e os limites do system prompt](./projeto-de-leitura/06-prompt-injection-limites-do-system-prompt.md), seção "Como funciona": a demonstração admin x membro e a troca de modelo que quebra a proteção.
- [07 · MCP, PromptTemplate e guardrails](./projeto-de-leitura/07-mcp-e-guardrails.md), seção "Armadilhas e achados no código" (dentro de "No código do repo"): mostra que a autorização só no prompt é falha e que em produção se checa permissão no código da tool.
- [03 · JWT e RBAC](../03-model-context-protocol-mcp/projeto-de-leitura/09-jwt-and-rbac.md), seção "O que é": RBAC explicado, com `member` e `admin`.
- [10 · Prompt injection, jailbreaking e guardrails](../10-seguranca-e-governanca-em-ia/projeto-de-leitura/09-prompt-injection-jailbreaking-guardrails.md), seção "O que é": guardrails como camadas de contenção, não trava única.

*Código da questão: 160668*

---

## Questão 02 · Tool calling iterativo x camada service

**Pergunta:** Qual é o trade-off entre usar tool calling iterativo e usar uma camada de service que recebe uma query ou intenção estruturada?

**Alternativas** (texto reconstruído a partir da resolução; só a A tem o texto literal conferido):
- A) O tool calling iterativo pode aumentar as chamadas ao LLM (planejar, chamar a tool, interpretar, talvez chamar outra tool). O service reduz as interações ao centralizar execução e regras, com menos flexibilidade dinâmica. ✅
- B) Uma das arquiteturas elimina alucinação e erro de negócio; o service é sempre superior.
- C) O service não funciona com LLM.
- D) O custo é o mesmo nas duas, pois a consulta final é a mesma.
- E) A tool substitui o raciocínio do modelo, e o iterativo reduz as chamadas.

**Resposta: A.** O tool calling iterativo pode aumentar as chamadas ao LLM. O service reduz as interações ao centralizar execução e regras, com menos flexibilidade dinâmica.

### Resolução comentada

Esta é uma questão de trade-off: ganhar uma coisa custa outra. De um lado, flexibilidade (o modelo decide a cada passo). Do outro, previsibilidade e custo (o código decide a regra).

No tool calling iterativo, o modelo planeja, chama uma tool, lê o resultado, interpreta e talvez chame outra. Cada passo é uma ida ao LLM, então sobe o custo e a latência, mas o agente se adapta ao que encontra. Na camada de service, o modelo só entende o pedido e devolve uma intenção estruturada (quem, quando, o quê); o service executa a regra de negócio de forma fixa. Menos idas ao LLM, mais previsível, porém menos livre.

Para acertar, procure a alternativa que dê um ganho e uma perda para cada lado, sem exagero. Quem diz "sempre superior" ou "elimina" está dando uma resposta sem trade-off, então desconfie.

### Entenda os conceitos

- **Tool calling iterativo:** o modelo roda em laço, escolhendo e chamando tools até concluir. Cada volta consome uma chamada ao LLM (complemento, fora do material: o guia trata de agentes com tools no tópico 07, mas não com o termo "iterativo").
- **Camada de service:** código determinístico que recebe a intenção já estruturada e executa a regra. No guia, agendar, cancelar e checar disponibilidade ficam num service, e a IA só extrai intenção e parâmetros.
- **Intenção estruturada:** o modelo devolve um JSON com campos fixos (`intent`, profissional, data, motivo) em vez de texto livre. É o contrato entre a IA e o sistema.
- **Lógica de negócio determinística:** a mesma entrada dá sempre o mesmo resultado. No guia, agendar o mesmo horário duas vezes faz a segunda falhar, e a IA só comunica o resultado.
- **Alucinação:** o modelo inventa informação com confiança. Mover a regra para o service reduz o risco de alucinação em regra de negócio, mas não o elimina em outras partes.
- **Analogia do guia (recepcionista da clínica):** ela preenche um formulário de campos fixos, confere e anota na agenda. Quem decide se o horário está livre é a agenda, não a IA.

### Por que as outras erram

- **B:** nenhuma arquitetura "elimina" alucinação ou erro de negócio. O service ajuda a controlar, mas "sempre superior" e "elimina" são exageros.
- **C:** o service foi pensado justamente para trabalhar com LLM: o modelo extrai a intenção e o service executa.
- **D:** o custo muda. O número de chamadas ao LLM é diferente, mesmo que a consulta final seja a mesma.
- **E:** inverte tudo. A tool não substitui o raciocínio do modelo, e o iterativo é quem aumenta as chamadas.

### Aprofundar no guia

- [04 · Saída estruturada, JSON e prompts em JSON](./projeto-de-leitura/04-structured-json-e-json-prompts.md), seção "O que é": "Lógica de negócio determinística", em que a IA só extrai intenção e o service executa.
- [04 · Saída estruturada, JSON e prompts em JSON](./projeto-de-leitura/04-structured-json-e-json-prompts.md), seção "Como funciona": o pipeline de quatro passos (linguagem natural, JSON, regra determinística, resposta humanizada).
- [03 · Multi-MCP e intent parsing](../03-model-context-protocol-mcp/projeto-de-leitura/01-multi-mcp-app-and-intent-parsing.md), seções "Em uma frase", "Cola rápida" e "No código do repo": o nó intentParser transforma o pedido em objeto estruturado e só então o agente decide as tools.

*Código da questão: 160678*

---

## Questão 03 · Memória de preferências entre sessões

**Pergunta:** Um usuário diz "Prefiro respostas curtas e em português". No dia seguinte ele volta com outro tema. Qual é o melhor uso de memória?

**Alternativas** (A com texto literal; as demais reconstruídas a partir da resolução):
- A) Reaplicar a preferência persistida e responder curto e em português. ✅
- B) Usar apenas a última frase do usuário.
- C) Pedir que o usuário repita todas as preferências.
- D) Responder em inglês para testar consistência.
- E) Considerar que a preferência expirou por ter sido dita em outro dia.

**Resposta: A.** Reaplicar a preferência persistida e responder curto e em português.

### Resolução comentada

O enunciado separa dois momentos: a preferência foi dita ontem, e hoje o assunto é outro. A pergunta é como a memória deve se comportar. Preferência é um dado estável sobre o usuário, não um detalhe daquela conversa.

Por isso ela é memória de longo prazo: fica guardada fora da conversa e é injetada no prompt nas sessões seguintes. Mesmo com tema novo, o sistema reaplica "curto e em português" sem pedir nada. É isso que dá a sensação de que o sistema conhece o usuário.

O guia ainda amarra a questão a uma ideia de mercado: sem guardar contexto e aprender preferências, o sistema vira só um wrapper. A memória é o que o diferencia de um produto.

### Entenda os conceitos

- **Memória de curto prazo:** o histórico da conversa naquela thread, para manter coerência.
- **Memória de longo prazo:** preferências estáveis (nome, idade, gêneros, bandas, artistas) injetadas no prompt como contexto pequeno e relevante.
- **Wrapper x produto:** wrapper é uma casca fina sobre o modelo; sem memória nem personalização, o sistema é só isso. No guia (tópico 00), o wrapper é comparado a um eletrodoméstico que entrega a capacidade genérica pronta para um público.
- **Extração de preferências:** o chat responde e também devolve, em JSON, se há algo a persistir e quais preferências extraiu. Preferências podem ser atualizadas ("agora me chama de Super Sayajin").
- **Persistência:** guardar fora da conversa (no guia, num SQLite) para valer entre sessões.
- **Analogia do guia (garçom com caderninho):** durante o jantar ele lembra de tudo da mesa; quando a conversa fica longa, anota o essencial ("Dona Maria gosta de MPB"). Na semana seguinte abre o caderninho e pergunta se ela ainda curte Gilberto Gil.

### Por que as outras erram

- **B:** usar só a última frase joga fora a preferência guardada.
- **C:** pedir para repetir tudo cria o atrito que a memória existe para evitar.
- **D:** responder em inglês contraria a preferência; "testar consistência" não é objetivo de memória.
- **E:** a preferência não expira por ter sido dita em outro dia. Persistir é justamente para valer entre sessões.

### Aprofundar no guia

- [05 · Memória: preferências, SQLite, Postgres e resumo incremental](./projeto-de-leitura/05-memoria-preferencias-e-resumo.md), seção "O que é": curto prazo x longo prazo, wrapper x produto e extração de preferências.
- [05 · Memória](./projeto-de-leitura/05-memoria-preferencias-e-resumo.md), seção "Como funciona": o fluxo extrai, salva (`savePreferences`) e recupera (`userContext`), com `mergePreferences` em que o novo vence o velho.
- [00 · Mercado de IA como serviço, wrappers e o Applied AI Engineer](./projeto-de-leitura/00-mercado-ia-servico-e-wrappers.md), seção "Explicando para a vovó": a analogia do wrapper.

*Código da questão: 160661*

---

## Questão 04 · Janela de contexto

**Pergunta:** Qual estratégia evita estourar a janela de contexto sem perder qualidade?

**Alternativas** (E com texto literal; as demais reconstruídas a partir da resolução):
- A) Enviar apenas a última resposta do assistente.
- B) Enviar sempre o histórico completo.
- C) Apagar todo o histórico a cada mensagem.
- D) Remover as mensagens do usuário e manter só as do assistente.
- E) Manter o histórico recente, sumarizar as partes antigas e preservar as preferências importantes separadamente. ✅

**Resposta: E.** Manter o histórico recente, sumarizar as partes antigas e preservar as preferências importantes separadamente.

### Resolução comentada

A janela de contexto é o limite de texto que o modelo consegue olhar de uma vez, e cada token enviado custa dinheiro e tempo. O desafio é cortar o tamanho sem jogar fora o que importa.

A estratégia boa combina três coisas: mensagens recentes (dão fluidez à conversa), resumo do que é antigo (economiza tokens mantendo o essencial) e preferências guardadas à parte (não se perdem quando o resumo comprime). É o resumo incremental da aula: pega o resumo anterior, as mensagens recentes e as novas informações e gera um resumo atualizado. Depois de resumir, o histórico ativo é podado e ficam só as duas mensagens mais recentes.

Elimine as extremas: "tudo sempre" estoura o limite e o custo; "nada" ou "só um pedaço" destrói a continuidade. A resposta certa é a que equilibra as duas pontas.

### Entenda os conceitos

- **Janela de contexto:** o tamanho máximo do que o modelo processa por vez. O guia resume que "contexto ilimitado é insustentável".
- **Token:** unidade menor que uma palavra em que o texto é quebrado; é o que se mede e se cobra (tópico 05 da disciplina 01, "Tokenização").
- **Resumo incremental:** resumo que se atualiza a cada rodada, consolidando duplicatas e preservando o essencial. O guia aciona o resumo por uma regra objetiva: total de mensagens acima de um limite (`maxMessagesToSummary`, no config).
- **Poda do histórico:** depois de resumir, mantêm-se as duas mensagens mais recentes e o resto é removido pelo id (`RemoveMessage`).
- **Preferências separadas:** ficam numa camada própria e enxuta, fora do resumo, para a compressão não as diluir. Ressalva do guia (tópico 05, "Armadilhas do código"): o `storeSummary` faz upsert que sobrescreve a linha do usuário e o `SummarySchema` inclui `keyPreferences`, então o resumo ainda pode apagar um dado guardado.
- **Analogia do guia (garçom com caderninho):** ele pode esquecer a conversa e guardar só o caderninho com o essencial.

### Por que as outras erram

- **A:** só a última resposta do assistente perde o que o usuário disse e todo o contexto.
- **B:** histórico completo sempre faz o custo de tokens crescer sem limite. Contexto ilimitado é insustentável.
- **C:** apagar tudo a cada mensagem destrói a continuidade da conversa.
- **D:** remover as mensagens do usuário tira justamente o que ele pediu, e a resposta perde o sentido.

### Aprofundar no guia

- [05 · Memória](./projeto-de-leitura/05-memoria-preferencias-e-resumo.md), seção "Como funciona": quando resumir (limite de mensagens), o `summarizeNode` e a poda com `RemoveMessage`.
- [05 · Memória](./projeto-de-leitura/05-memoria-preferencias-e-resumo.md), seção "Armadilhas": reenviar todo o histórico para sempre, número mágico para o limite e como testar o resumo.
- [01 · Como funcionam os LLMs](../01-fundamentos-de-ia-e-llm/projeto-de-leitura/05-como-funcionam-llms.md), seção "1. Tokenização": o que é token e por que o limite de tokens importa para custo.

*Código da questão: 160663*

---

## Questão 05 · Separação de responsabilidades: SQLite e PostgreSQL

**Pergunta:** Qual separação de responsabilidades foi ensinada na aula? (O enunciado original não trazia mais detalhe que isso.)

**Alternativas** (D com texto literal; as demais reconstruídas a partir da resolução, que não vinha com a prova):
- A) O PostgreSQL guarda as preferências; o SQLite guarda o histórico de mensagens.
- B) O SQLite guarda o histórico completo; o PostgreSQL guarda só índices.
- C) Um banco guarda embeddings e o outro guarda a contagem de tokens.
- D) O SQLite guarda as preferências; o PostgreSQL guarda o histórico de mensagens. ✅
- E) Os dois bancos guardam o mesmo conteúdo, duplicado.

**Resposta: D.** O SQLite guarda as preferências; o PostgreSQL guarda o histórico de mensagens.

### Resolução comentada

Esta questão veio sem resolução; a resposta foi deduzida do material, e o próprio guia confirma a divisão. No projeto da aula, o Postgres (rodando via Docker) guarda o histórico completo, as threads, os checkpoints e os metadados do LangGraph. O SQLite guarda as preferências do usuário e o resumo.

A lógica é separar por tipo de dado. O histórico é volumoso, vive por thread e precisa permitir retomar a conversa: serve a um banco de servidor. As preferências são poucas, pequenas e rápidas de recuperar para entrar no prompt: servem a uma camada enxuta.

O guia ainda lembra que poderia ser um banco só. A escolha de dois bancos mostra que a estratégia depende do tipo de dado, do acesso e do custo operacional, e essa é a lição que a prova quer.

### Entenda os conceitos

- **PostgreSQL:** banco relacional de servidor. No guia, guarda histórico completo, threads, checkpoints e metadados do LangGraph.
- **SQLite:** banco relacional embutido, em arquivo. No guia, guarda preferências e o resumo (com query builder).
- **Checkpointer:** persiste o estado do grafo por thread, permitindo retomar a conversa do ponto em que parou, até dias depois.
- **Store:** armazenamento do LangGraph no Postgres, configurado junto ao checkpointer num `MemoryService`.
- **Thread:** uma conversa identificada por um `thread_id`; é a chave que o checkpointer usa.
- **Camada enxuta de preferências:** o `PreferencesService` no SQLite, pequeno e rápido de ler, para injetar contexto no prompt sem gastar token.
- **Analogia do guia:** o histórico completo é a memória do jantar inteiro; o SQLite é o caderninho.

### Por que as outras erram

- **A:** troca os papéis: preferências ficam no SQLite, não no PostgreSQL.
- **B:** o histórico completo está no Postgres, e o Postgres não guarda só índices.
- **C:** embeddings e contagem de tokens não são o que cada banco guarda na aula.
- **E:** os dois não duplicam o mesmo conteúdo. Cada um tem uma função.

### Aprofundar no guia

- [05 · Memória](./projeto-de-leitura/05-memoria-preferencias-e-resumo.md), seção "Como funciona": o primeiro bullet, "Divisão de armazenamento", e o `MemoryService` com store e checkpointer.
- [05 · Memória](./projeto-de-leitura/05-memoria-preferencias-e-resumo.md), seção "Cola rápida": Checkpointer, Store e PreferencesService em uma linha cada.
- [12 · Live NetFibra](./projeto-de-leitura/12-live-netfibra-langgraph-graphrag-hitl.md), seções "O que é" (o `MemorySaver` como checkpointer em memória) e "Como funciona" (o `thread_id` por aba do navegador).

*Código da questão: 160662*

---

## Questão 06 · Segurança em camadas

**Pergunta:** Qual abordagem representa segurança em camadas para um sistema com LLM e tools?

**Alternativas** (E com texto literal; as demais reconstruídas a partir da resolução):
- A) Depender só dos guardrails do modelo e desativar logs.
- B) Pedir ao modelo que decida o que é seguro.
- C) Usar um system prompt forte e bloquear palavras como "ignore".
- D) Permitir tudo e apenas pedir ao modelo uma explicação.
- E) Combinar RBAC, validação de parâmetros, human-in-the-loop para ações sensíveis, alertas de comportamento suspeito e blacklisting/rate limiting para abuso recorrente. ✅

**Resposta: E.** Combinar RBAC, validação de parâmetros, human-in-the-loop para ações sensíveis, alertas de comportamento suspeito e blacklisting/rate limiting para abuso recorrente.

### Resolução comentada

"Em camadas" quer dizer várias defesas empilhadas, cada uma cobrindo a falha da anterior. A pergunta é qual alternativa realmente empilha defesas independentes.

A E junta cinco: quem pode o quê (RBAC), o que o modelo mandou está válido (validação), um humano aprova o que é crítico (human-in-the-loop), alguém é avisado do que parece estranho (alertas) e quem insiste em abusar é limitado (rate limiting/blacklisting). Se uma camada falha, a próxima segura.

As outras alternativas têm um padrão: todas confiam no modelo ou num texto. Se a defesa depende de o modelo obedecer, ela não é uma camada externa. O guia insiste que quem executa a ação não pode ser o mesmo que decide se pode executar.

### Entenda os conceitos

- **Defesa em camadas:** nenhuma defesa sozinha basta; empilham-se várias. O guia diz que assumir que algum modelo vai falhar leva a uma arquitetura em camadas que resiste à troca de modelo.
- **RBAC:** autorização por papel (tópico 09 da disciplina 03).
- **Validação de parâmetros:** conferir no código o que o modelo enviou.
- **Human-in-the-loop (HITL):** o fluxo pausa e uma pessoa decide. No guia (tópico 12), é o `interrupt` do LangGraph: o grafo para, devolve um payload e só retoma com `Command(resume=...)` e o mesmo `thread_id`.
- **Guardrail como modelo validador:** um segundo modelo, sem tools, classifica a entrada como SAFE ou UNSAFE antes do executor. É barato, rápido e só classifica (tópico 07). O guia lembra que ele também é um LLM e pode errar.
- **Rate limiting:** teto de requisições por cliente numa janela de tempo, com resposta 429 (tópico 11 da disciplina 03).
- **Alertas e blacklisting de abuso (complemento, fora do material):** o guia não os descreve como defesa; vêm da resolução da prova.
- **Analogia do guia (segurança antes do porteiro):** um segurança só lê o que a pessoa diz e responde "suspeito" ou "ok"; o porteiro nem ouve o golpista.

### Por que as outras erram

- **A:** depender só dos guardrails do modelo e desativar logs tira a defesa externa e ainda tira a capacidade de detectar abuso.
- **B:** pedir ao modelo que decida o que é seguro é delegar a segurança a quem pode ser enganado.
- **C:** system prompt é texto, não é firewall, e bloquear palavras como "ignore" é fácil de contornar com reformulação (o guia lista bypass por "modo de manutenção", justificativa educacional e reformulação indireta).
- **D:** permitir tudo e só pedir uma explicação não impede nada; a explicação também sai do modelo.

### Aprofundar no guia

- [06 · Prompt injection e os limites do system prompt](./projeto-de-leitura/06-prompt-injection-limites-do-system-prompt.md), seção "O que é": padrões de bypass e por que o system prompt não é controle de acesso.
- [07 · MCP, PromptTemplate e guardrails](./projeto-de-leitura/07-mcp-e-guardrails.md), seção "Como funciona": o guardrail antes da tool call, o `BlockedNode` e o "antes versus agora".
- [12 · Live NetFibra](./projeto-de-leitura/12-live-netfibra-langgraph-graphrag-hitl.md), seção "O que é": human-in-the-loop com `interrupt`.
- [03 · Rate limiting](../03-model-context-protocol-mcp/projeto-de-leitura/11-rate-limiting.md), seções "O que é" (confiança zero) e "Como funciona" (limite por token com resposta 429).

*Código da questão: 160669*

---

## Questão 07 · O que são safeguards

**Pergunta:** Qual é a afirmação mais correta sobre safeguards?

**Alternativas** (A com texto literal; as demais reconstruídas a partir da resolução):
- A) Devem reduzir a probabilidade e o impacto de problemas, assumindo que tentativas de abuso vão ocorrer. ✅
- B) Só são necessários em sistemas críticos e de grande volume.
- C) Uma base RAG privada dispensa safeguards contra prompt injection.
- D) Eliminam por completo o risco de abuso.
- E) Prompt injection só importa quando o modelo tem acesso a arquivos.

**Resposta: A.** Devem reduzir a probabilidade e o impacto de problemas, assumindo que tentativas de abuso vão ocorrer.

### Resolução comentada

A palavra-chave é "mais correta". Quando uma alternativa promete eliminar o risco, descarte: em segurança de LLM não existe garantia, existe gestão de risco.

Um bom safeguard faz quatro coisas (da resolução da prova): diminui a chance de o ataque funcionar, diminui o estrago se funcionar, facilita perceber que houve tentativa e deixa o sistema mais previsível. O ponto de partida é assumir que alguém vai tentar.

Isso casa com o aviso do guia: um teste isolado que bloqueou só prova que aquele modelo, naquela execução, obedeceu. O comportamento não é determinístico, então a proteção precisa estar na arquitetura.

### Entenda os conceitos

- **Safeguard:** mecanismo que reduz risco. A lista "validação, bloqueio antes da tool, permissão mínima e escopo restrito" é da resolução da prova (complemento).
- **Gestão de risco x garantia:** reduzir probabilidade e impacto é diferente de eliminar. O guia diz que não existe prompt perfeito: regra no system prompt é política de segurança probabilística.
- **Não determinismo:** o mesmo prompt pode bloquear numa execução, executar em outra, executar parcialmente ou inventar justificativa.
- **Superfície de ataque:** com tools, o modelo pode ler e escrever arquivos, executar comandos, consultar APIs internas, acessar variáveis de ambiente e listar diretórios.
- **Erro arquitetural:** delegar autorização ao modelo. A pergunta certa não é "o modelo é inteligente o bastante?", e sim "a minha arquitetura é robusta o bastante?".
- **OWASP Top 10 for LLM Applications:** lista de riscos de aplicações com LLM, que inclui prompt injection (o guia a cita como referência).

### Por que as outras erram

- **B:** vale para qualquer sistema com tools, não só os críticos e de grande volume.
- **C:** base RAG privada não impede prompt injection nem o abuso das tools.
- **D:** nada elimina o risco por completo. Isso é garantia, e a segurança aqui é redução.
- **E:** prompt injection importa sempre que o modelo pode agir (arquivos, banco, APIs, comandos), não só em acesso a arquivos.

### Aprofundar no guia

- [06 · Prompt injection e os limites do system prompt](./projeto-de-leitura/06-prompt-injection-limites-do-system-prompt.md), seção "Vantagens e limites": "Não existe prompt perfeito" e defesa que custa arquitetura.
- [06 · Prompt injection](./projeto-de-leitura/06-prompt-injection-limites-do-system-prompt.md), seção "Onde aplicar": quais sistemas precisam de safeguards.
- [10 · OWASP Top 10 para LLM](../10-seguranca-e-governanca-em-ia/projeto-de-leitura/07-owasp-top-10-llm-novo-cenario.md): a lista de riscos citada como referência (tópico mencionado nesta disciplina; seção a abrir: a de abertura do arquivo).

*Código da questão: 160666*

---

## Questão 08 · LangChain.js em produção

**Pergunta:** Qual a importância do LangChain.js em produção?

**Alternativas** (A com texto literal; as demais reconstruídas a partir da resolução):
- A) Estrutura fluxos, memória, tools e controle de execução de forma composicional e auditável. ✅
- B) Tem validação interna que dispensa safeguards.
- C) Converte modelos Python para JavaScript.
- D) Serve para criar web APIs com ChatGPT.
- E) Permite trocar de modelo, e essa é a sua razão de existir.

**Resposta: A.** Estrutura fluxos, memória, tools e controle de execução de forma composicional e auditável.

### Resolução comentada

A pergunta é sobre o papel do LangChain: ele é uma camada de orquestração. Pense em "o que ele organiza", não em "o que ele faz de mágico".

No guia, o LangChain/LangGraph encadeia etapas (chains) e modela o fluxo como grafo: estado, nodes e edges. Isso troca uma função gigante por uma máquina de estados organizada, testável e observável. Memória e tools se plugam nesse desenho, e o LangSmith mostra tools chamadas, passos executados e o prompt enviado, o que dá a parte "auditável".

As alternativas erradas atribuem poderes que ele não tem (dispensar segurança, converter linguagem) ou reduzem o papel a um benefício secundário (trocar de modelo, fazer APIs).

### Entenda os conceitos

- **Chain (encadeamento):** compor funções e chamadas de modelo em sequência, em que cada saída alimenta a próxima. Pode ser linear ou ter bifurcações.
- **LangGraph:** declara um grafo: o estado conecta os nodes, e as edges (inclusive condicionais) definem o caminho.
- **Estado:** o "shape" do que os nodes leem e escrevem. Na aula são três campos: `messages`, `output` e `command`.
- **Node e edge:** node é uma função que recebe o estado e devolve o estado atualizado; edge é a transição para o próximo node. `compile` materializa o workflow executável.
- **LangSmith:** observabilidade em nuvem; o plano gratuito de tracing já entrega valor. Sem observabilidade você fica no escuro.
- **LangGraph Studio:** interface web para executar o grafo, ver o estado antes e depois de cada node e reexecutar a partir de um node.
- **Analogia do guia (recepcionista com prancheta):** a prancheta é o LangGraph, em que se desenham as mesas (nodes), as setas (edges) e as regras de decisão; o caderno de anotações é o estado.

### Por que as outras erram

- **B:** validação interna não dispensa safeguards. A segurança continua sendo responsabilidade da sua arquitetura.
- **C:** não é um conversor de modelos Python para JavaScript.
- **D:** não existe para "fazer web APIs com ChatGPT"; isso é só um uso possível. O papel dele é orquestrar.
- **E:** trocar de modelo é um benefício secundário, não a razão de existir.

### Aprofundar no guia

- [02 · LangChain, LangGraph: estado, nodes e edges](./projeto-de-leitura/02-langchain-langgraph-estado-nodes-edges.md), seção "O que é": chain, estado, node, edge, compile, LangSmith e Studio.
- [02 · LangChain, LangGraph](./projeto-de-leitura/02-langchain-langgraph-estado-nodes-edges.md), seção "Vantagens e limites": fluxo explícito, tracing e os limites (mais conceitos e arquivos).
- [03 · Pipeline condicional, fallback e testes](./projeto-de-leitura/03-pipeline-condicional-fallback-testes.md), seção "Onde aplicar": a mesma estrutura usada para roteamento condicional e fallback.

*Código da questão: 160680*

---

## Questão 09 · structuredOutputs e providerStrategy

**Pergunta:** Analise as afirmações e marque a combinação correta de V ou F:

- I. Structured outputs tornam a saída mais previsível e processável por código.
- II. Uma estratégia de provider (por exemplo `providerStrategy`) pode aproveitar mecanismos nativos do provedor para impor ou validar o formato, quando disponíveis.
- III. Structured outputs eliminam a necessidade de validação de negócio e de permissões antes de tool calling.

**Alternativas:**
- A) V, V, V
- B) V, F, V
- C) F, F, V
- D) F, V, V
- E) V, V, F ✅

**Resposta: E.** I verdadeira, II verdadeira, III falsa (V, V, F).

### Resolução comentada

Duas afirmações descrevem benefícios reais e uma é um exagero. A técnica é ler cada afirmação e perguntar: ela promete algo que só o código de negócio pode garantir?

A I é verdadeira: saída estruturada é o modelo devolver JSON no formato combinado, o que o código lê com segurança. A II também: o `providerStrategy` usa o JSON Schema nativo do provedor para impor o formato, quando o provedor suporta.

A III cai na armadilha. Formato válido não significa ação permitida: um JSON perfeito pode pedir algo que o usuário não tem direito de fazer. Por isso ainda é preciso validar regra de negócio, política e RBAC antes de executar a tool.

### Entenda os conceitos

- **Structured output:** resposta do modelo imposta a um schema, que já chega como objeto. Elimina JSON quebrado, texto misturado e parse frágil.
- **Schema como contrato:** o schema faz parte do contrato com o modelo, não só da validação local.
- **`providerStrategy`:** no projeto do guia, `createAgent` usa `responseFormat: providerStrategy(schema)`, que usa o JSON Schema nativo do provedor.
- **Zod e `safeParse`:** validação que devolve sucesso, dado e erro sem lançar exceção. O guia a usa em cada node ("eu confio, mas eu confiro").
- **Suporte do modelo:** nem todo modelo suporta Response Format ou Structured Outputs; filtre no painel do OpenRouter. Modelos gratuitos sem suporte falham na chamada estruturada.
- **Validação de negócio:** regra de domínio aplicada pelo service (por exemplo, horário indisponível) e permissão por papel; nada disso vem do formato.
- **Analogia do guia (formulário):** a IA só pode devolver os campos do formulário, mas quem decide se o horário está livre é a agenda.

### Por que as outras erram

- **A (V, V, V):** erra a III.
- **B (V, F, V):** erra a II e a III.
- **C (F, F, V):** erra as três.
- **D (F, V, V):** erra a I e a III.

### Aprofundar no guia

- [04 · Saída estruturada, JSON e prompts em JSON](./projeto-de-leitura/04-structured-json-e-json-prompts.md), seção "O que é": structured output, JSON Prompt e lógica determinística.
- [04 · Saída estruturada](./projeto-de-leitura/04-structured-json-e-json-prompts.md), seção "No código do repo": o item 6 do fluxo, `providerStrategy` em `services/openRouterService.ts`.
- [04 · Saída estruturada](./projeto-de-leitura/04-structured-json-e-json-prompts.md), seção "Como funciona": a revalidação com `safeParse` e a regra determinística prevalecendo.

*Código da questão: 160671*

---

## Questão 10 · Modelo multimodal

**Pergunta:** O que é um modelo multimodal?

**Alternativas** (C com texto literal; as demais reconstruídas a partir da resolução):
- A) Um modelo com janela de contexto maior, que recebe arquivos diferentes no mesmo prompt.
- B) Um sistema que converte tudo para texto antes de processar.
- C) Um modelo que processa e relaciona várias modalidades (texto, imagem, áudio) no mesmo fluxo de inferência, preservando os sinais relevantes de cada tipo. ✅
- D) Um conjunto de vários modelos especializados, sem integração semântica.
- E) Um modelo que gera imagens e texto.

**Resposta: C.** Um modelo que processa e relaciona várias modalidades (texto, imagem, áudio) no mesmo fluxo de inferência, preservando os sinais relevantes de cada tipo.

### Resolução comentada

A palavra decisiva é "relaciona" no "mesmo fluxo": o modelo entende vários formatos juntos, não só aceita ou produz vários formatos. Ao ler as alternativas, pergunte: há integração real entre as modalidades, ou é só soma de partes?

Multimodal é um único pipeline cognitivo para vários formatos. Mandar um PDF ou um áudio direto ao modelo, que interpreta e responde, é usar multimodalidade, sem converter tudo para texto antes.

Quem converte tudo para texto antes (por exemplo, STT + LLM + TTS no áudio) está no pipeline tradicional, o oposto. Quem junta modelos separados não tem entendimento integrado. A e E não estão erradas por definição, são incompletas: o guia define multimodal como modelo que recebe e/ou produz vários formatos, mas a C é a mais completa por exigir relação entre as modalidades no mesmo fluxo.

### Entenda os conceitos

- **Modalidade:** o tipo de dado: texto, imagem, documento, áudio, vídeo.
- **Multimodalidade:** um pipeline cognitivo único para vários formatos. A lição do guia: multimodal amplia possibilidades, mas não elimina fundamentos (prompt estruturado, schema, validação, tratamento de erro, controle de custo).
- **Documento em base64:** o arquivo vai codificado em base64 junto do prompt. No projeto, o PDF vira um bloco `image_url` com `data:application/pdf;base64,...`.
- **Áudio tradicional (STT + LLM + TTS):** transcrição, modelo e conversão em voz, com muitas etapas e serviços.
- **Áudio multimodal direto:** o áudio vai direto ao modelo; o pipeline fica simples, mas custa mais e tem menos granularidade.
- **Real-time:** sessão contínua por WebSocket ou WebRTC, não request e response; exige infraestrutura sofisticada.
- **Trade-off de custo:** modelos multimodais geralmente não são gratuitos, e arquivos grandes consomem muitos tokens. Em produção, a aula costuma preferir extrair só o texto relevante no servidor.
- **Analogia do guia (assistente que enxerga e ouve):** antes alguém copiava o texto do livro para ele; agora ele enxerga as páginas e ouve a voz. Mas leitor mais completo cobra mais caro.

### Por que as outras erram

- **A:** incompleta. Receber arquivos diferentes no mesmo prompt já é usar multimodalidade (o guia trata enviar PDF assim), mas a alternativa não exige integração entre as modalidades no mesmo fluxo, e janela de contexto maior é outra característica.
- **B:** converter tudo para texto antes é o pipeline tradicional (por exemplo STT + LLM + TTS), o oposto do multimodal.
- **D:** juntar vários modelos especializados sem integração semântica é só uma combinação de ferramentas.
- **E:** incompleta. Produzir imagens e texto é multimodalidade pelo guia (receber e/ou produzir vários formatos), mas a alternativa não exige que o modelo relacione as modalidades no mesmo fluxo, que é o ponto da C.

### Aprofundar no guia

- [10 · Modelos multimodais: documentos, áudio e real-time](./projeto-de-leitura/10-modelos-multimodais.md), seção "O que é": multimodalidade, análise de documentos, áudio tradicional x direto e real-time.
- [10 · Modelos multimodais](./projeto-de-leitura/10-modelos-multimodais.md), seção "Como funciona": o quadro de comparação de trade-offs e as perguntas antes de escolher.
- [01 · Web AI e multimodalidade](../01-fundamentos-de-ia-e-llm/projeto-de-leitura/06-web-ai-e-multimodal.md), seção "Multimodalidade (Cap. 4)": a mesma ideia vista na disciplina 01, com a demo offline no navegador.

*Código da questão: 160672*

---

## Pontos de atenção na prova

- **Texto das alternativas:** só a alternativa certa de cada questão (e as combinações V/F das questões 01 e 09) têm o texto literal. As alternativas erradas das demais questões foram reconstruídas a partir das justificativas da resolução, então podem diferir em redação do enunciado original.
- **Questão 05:** veio sem resolução. A resposta D foi deduzida do material, tópico 05 (Postgres: histórico completo e checkpoints; SQLite: preferências e resumo).
- **Questão 02:** o material não trata o trade-off "tool calling iterativo x service" com esses termos. O mais próximo é o tópico 04 (IA extrai a intenção, service determinístico executa); o resto vem da resolução da prova.
- **Questão 06:** o material cobre RBAC (disciplina 03), validação e defesa em camadas, mas human-in-the-loop só aparece na live (tópico 12), e alertas e blacklisting de abuso não aparecem como defesa. A resposta E segue a resolução da prova.
- **Questão 08:** o material fala de encadeamento, grafo, tools, memória e observabilidade (LangSmith). Retries e tratamento de erros como recurso do LangChain não aparecem no tópico 02.
- **Questão 01:** a ideia de allowlists e escopo mínimo de ferramenta aparece só de forma indireta no material (escopo do diretório no MCP, tópico 07). A resposta D segue a resolução da prova.

## Mapa de estudo desta disciplina

| Tema da prova | Tópico do guia que mais cobre |
|---------------|-------------------------------|
| Segurança em tool calling (Q01) | [06 · Prompt injection](./projeto-de-leitura/06-prompt-injection-limites-do-system-prompt.md) e [07 · MCP e guardrails](./projeto-de-leitura/07-mcp-e-guardrails.md) |
| Tool calling iterativo x service (Q02) | [04 · Saída estruturada e JSON](./projeto-de-leitura/04-structured-json-e-json-prompts.md) |
| Memória de preferências (Q03) | [05 · Memória](./projeto-de-leitura/05-memoria-preferencias-e-resumo.md) |
| Janela de contexto e resumo (Q04) | [05 · Memória](./projeto-de-leitura/05-memoria-preferencias-e-resumo.md) |
| SQLite x PostgreSQL (Q05) | [05 · Memória](./projeto-de-leitura/05-memoria-preferencias-e-resumo.md) |
| Segurança em camadas e HITL (Q06) | [07 · MCP e guardrails](./projeto-de-leitura/07-mcp-e-guardrails.md) e [12 · Live NetFibra](./projeto-de-leitura/12-live-netfibra-langgraph-graphrag-hitl.md) |
| Safeguards (Q07) | [06 · Prompt injection](./projeto-de-leitura/06-prompt-injection-limites-do-system-prompt.md) |
| LangChain.js em produção (Q08) | [02 · LangChain e LangGraph](./projeto-de-leitura/02-langchain-langgraph-estado-nodes-edges.md) |
| structuredOutputs e providerStrategy (Q09) | [04 · Saída estruturada e JSON](./projeto-de-leitura/04-structured-json-e-json-prompts.md) |
| Modelo multimodal (Q10) | [10 · Modelos multimodais](./projeto-de-leitura/10-modelos-multimodais.md) |
