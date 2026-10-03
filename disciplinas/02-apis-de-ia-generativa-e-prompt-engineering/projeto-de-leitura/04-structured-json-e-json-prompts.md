# 04 · Structured JSON e JSON Prompts: da linguagem natural à ação

> **Unidade 3 · Aulas 1 a 4** · Leitura: ~13 min · Bloco: LangGraph e Saída Estruturada

## 🎯 Em uma frase
A IA entra onde é melhor, **transformar linguagem humana em estrutura (JSON)** e **estrutura em mensagem final**, enquanto o meio do caminho continua sendo engenharia tradicional: validação, regra de negócio, tratamento de erro e controle de fluxo. O schema é o **contrato** entre IA e sistema.

---

## 👵 Explicando para a vovó

A recepcionista da clínica recebe um bilhete solto: «quero marcar com a doutora Ana amanhã às 9». Ela preenche um formulário com campos fixos (médico, data, motivo), confere se está tudo preenchido, anota na agenda e escreve uma resposta educada.

A parte esperta é o formulário: a IA só pode devolver os campos dele. E quem decide se o horário está livre é a agenda, não a IA.

---

## 🔧 Tecnicamente

### O que é
- **Intenção estruturada:** o primeiro node chama o modelo e exige um JSON com `intent` (schedule ou cancel), `professionalId`, `professionalName`, `dateTime`, `reason` e dados do paciente.
- **JSON Prompt:** para cada etapa há um system prompt (papel, regras, profissionais disponíveis, campos obrigatórios, exemplos) e um schema de saída; esse padrão reduz alucinação e aumenta previsibilidade.
- **Structured output:** o schema é parte do contrato com o modelo, não só validação local. O formato é imposto e o retorno já chega como objeto, eliminando JSON quebrado, texto misturado e parse frágil.
- **Lógica de negócio determinística:** a IA não executa regra de domínio; só extrai intenção e parâmetros. Agendar, cancelar e checar disponibilidade ficam num service.

### Como funciona
- Pipeline de quatro passos: linguagem natural, JSON estruturado, regra interna determinística e resposta humanizada.
- O prompt recebe a **lista de profissionais** do sistema (para mapear «doutora Ana» a um ID real, sem inventar) e a **data atual** (para resolver «amanhã» ou «quinta-feira»). Exemplos de entrada e saída delimitam o comportamento.
- Provedor: em vez do SDK nativo do OpenRouter, a aula faz um rollback intencional para o SDK compatível com a API da OpenAI, apontando o `baseUrl` para o OpenRouter. Fica mais portátil e dá a sintaxe de structured output com parse automático. Por isso o serviço poderia se chamar LLM Service.
- `generateStructured` é genérico: recebe system prompt, user prompt e schema e devolve um objeto do tipo do schema, usando agent com `responseFormat`.
- Nem todo modelo suporta *Response Format* ou *Structured Outputs*; filtre no painel do OpenRouter. Sem suporte, as saídas são parsing e validação manuais ou uma camada intermediária que force o formato.
- Nodes de ação: valida de novo o estado com **safeParse do Zod** («eu confio, mas eu confiro», cada node como um microserviço independente), converte `dateTime` para `Date`, aplica fallback para `reason` vazio e chama o service. Se falhar, devolve `actionSuccess: false` e `actionError`.
- Teste mental da aula: agendar o mesmo horário duas vezes faz a segunda tentativa falhar com indisponibilidade. A regra determinística do service prevalece e a IA só comunica o resultado.
- Dependências entram pela **factory do grafo** (service de agendamento no scheduler, serviço de LLM no gerador de mensagem), pois o identifyIntent não precisa conhecer serviços internos.
- O gerador de mensagem manda ao modelo só o necessário (`professionalName`, `dateTime`, `patientName`, `actionError`) para controlar token e ruído, e devolve `{ message: string }`; em erro, uma mensagem padrão curta. O prompt manda responder no idioma do usuário.
- Falha na chamada: try/catch devolve intent `unknown` com o erro, para o fluxo cair no fallback em vez de quebrar o pipeline (rate limit, modelo fora do ar).

### Onde aplicar
- Atendimento automatizado, assistentes internos, chatbots corporativos e integração com sistemas legados.
- Qualquer agente transacional: frase livre vira estrutura, estrutura vira regra, resultado vira comunicação.
- Enviar o JSON a serviços internos, MCPs e APIs externas: com JSON na mão, o resto é engenharia normal.

### Vantagens e limites
**Vantagens**
- Saída previsível e validável: o sistema opera por contrato, não por interpretação.
- Domínio fica testável e fora do LLM, o que reduz risco de alucinação em regra de negócio.
- Mesmo padrão (prompt, schema, resposta estruturada) se repete em todos os nodes.

**Limites**
- Depende de modelos que suportem structured output.
- Datas relativas dependem do modelo e do fuso, o que torna testes end-to-end com LLM instáveis.
- Mais prompts e schemas para manter.

### 🚫 Armadilhas
- Teste que passa só com status 200 dá falsa sensação de segurança; o TDD da aula faz o teste parar de passar para exigir comportamento real (por exemplo intent schedule no body).
- Esquecer de injetar a data atual no prompt: expressões relativas viram ambiguidade.
- Mandar o estado inteiro ao gerador de mensagem, gastando token e abrindo espaço para ruído.
- Nome do campo inconsistente entre node e teste (a aula padroniza em `actionSuccess`).
- Faltar `LANGCHAIN_TRACING_V2=true` (com a palavra completa) e não ver o tracing.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Structured output | Resposta do modelo imposta a um schema, já parseada |
| JSON Prompt | Prompt organizado em campos (papel, regras, exemplos, schema) |
| safeParse (Zod) | Validação que devolve sucesso, dado e erro sem lançar exceção |
| generateStructured | Método genérico: system, user e schema geram objeto tipado |
| actionSuccess e actionError | Estado que carrega o resultado da ação determinística |
| Factory do grafo | Ponto que instancia e injeta as dependências de cada node |
| Prompt chaining | Nome do tema da unidade. No projeto, intenção estruturada, ação determinística e mensagem final formam uma cadeia em que a saída de um passo alimenta o prompt do seguinte |

---

## 💻 No código do repo

**Projeto:** [03-medical-appointment-z (e 03-medical-appointment-template)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms/03-medical-appointment-z)

Assistente de clínica que usa LLM com saída estruturada (Zod) para classificar a intenção do texto livre (schedule, cancel ou unknown), extrair campos, executar a ação num serviço em memória e gerar a resposta ao paciente com outro prompt estruturado. Dois usos de LLM e dois nodes só de código.

**Fluxo**
1. `server.ts`: `POST /chat` (`question`, `minLength: 10`), chama `graph.invoke` e devolve o estado inteiro (por isso os testes leem `body.intent` e `body.actionSuccess`).
2. `nodes/identifyIntentNode.ts` monta o prompt via `prompts/v1/identifyIntent.ts` e chama `llmClient.generateStructured(system, user, IntentSchema)`.
3. `graph.ts` roteia: com `state.error`, sem intent ou unknown vai para `message`; senão o valor do intent é o nome do node.
4. `schedulerNode.ts` e `cancellerNode.ts` validam campos com um segundo schema Zod, chamam `AppointmentService.bookAppointment` ou `cancelAppointment` e devolvem `actionSuccess`, `actionError`, `appointmentData`.
5. `messageGeneratorNode.ts` calcula o cenário (`schedule_success`, etc.) e pede `MessageSchema { message }`, que vira `AIMessage`.
6. Núcleo em `services/openRouterService.ts`: `createAgent` com `responseFormat: providerStrategy(schema)` e `ChatOpenAI` apontando para `https://openrouter.ai/api/v1`; `providerStrategy` usa o JSON Schema nativo do provedor.
7. `prompts/v1/*.ts` retornam `JSON.stringify({ role, task, rules, examples })`; o identifyIntent injeta profissionais e `current_date` com few-shot.
8. `services/appointmentService.ts` é o domínio em memória: 3 profissionais (Dr. Alicio, cardiologia; Dra. Ana, dermatologia; Dra. Carol, neurologia) e 2 consultas já marcadas (Joao com o Dr. Alicio hoje às 11:00 UTC; Luana com a Dra. Ana amanhã às 14:00 UTC). `bookAppointment` lança «Horário indisponível» se o horário estiver ocupado e `cancelAppointment` lança se não achar a consulta.

**Como rodar**
- `npm i` e `cp .env.example .env` (`OPENROUTER_API_KEY`, LangSmith opcional). Node >=24.10.
- `npm run dev` (porta 3000) e `curl -X POST localhost:3000/chat -H 'Content-type: application/json' --data '{"question": "Sou Joao da Silva e quero agendar com Dr. Ana Pereira hoje às 14h"}'`.
- `npm run test:e2e` (chama o LLM de verdade) e `npm run langgraph:serve` (grafo medical_appointments).

**Armadilhas e achados no código**
- Bug sutil em `generateStructured` (-z): o `catch` retorna `success: true` junto de `error`. O `if (!result.success)` em identifyIntentNode nunca dispara; com falha, `result.data` é undefined e o acesso a `intentData.intent` estoura no try/catch externo, que cai em unknown. Funciona por acidente.
- Datas relativas e fuso: o `datetime` vem do LLM e «amanhã às 16h» pode sair em outro dia; por isso o teste de agendamento está `it.skip` no -z.
- O teste de cancelamento agenda e cancela via LLM no mesmo estado de memória e flutua conforme o modelo.
- `appointments` é global do módulo e some a cada restart.
- O README das duas pastas descreve outro projeto («Prompt Chaining Article Generator»); ignore-o.
- Modelos gratuitos sem suporte a `response_format` falham na chamada estruturada.
- O `console.log` de sucesso mostra `result.data?.message`: dados de pacientes vão para o log, atenção à LGPD.
- O `messageGeneratorNode` monta `details` com `error: state.error`, mas scheduler e canceller gravam o motivo em `actionError`. Num «Horário indisponível» o LLM recebe o cenário `schedule_error` sem o motivo (pela leitura do código; não executei).
- O campo do schema é `datetime` (minúsculo); a apostila escreve `dateTime`.

**Template versus -z**
O template já traz grafo, estado, roteamento, `appointmentService` e todos os prompts e schemas; os 4 nodes são esqueletos (só try/catch e log) e `services/openRouterService.ts` não existe. O -z implementa o `generateStructured`, os 4 nodes, injeta `OpenRouterService` e `AppointmentService` na `factory.ts`, ativa os asserts (schedule com it.skip) e troca o modelo de `upstage/solar-pro-3:free` para `arcee-ai/trinity-large-preview:free`.

---

## 🔗 Para ir além
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms)

---

⬅️ [03 · Pipeline condicional, node de fallback e testes automatizados](./03-pipeline-condicional-fallback-testes.md)  ·  [05 · Memória: preferências, SQLite, Postgres e resumo incremental](./05-memoria-preferencias-e-resumo.md) ➡️
