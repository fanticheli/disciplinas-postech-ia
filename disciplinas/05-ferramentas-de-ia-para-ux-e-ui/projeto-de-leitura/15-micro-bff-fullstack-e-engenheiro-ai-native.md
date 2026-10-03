# 15 · Micro-BFF full-stack e o Engenheiro AI-Native

> **Unidade 5 · Aulas 4 e 5** · Leitura: ~9 min · Bloco: IA dentro da aplicação: Genkit e BragBot

## 🎯 Em uma frase
O **micro-BFF** é o servidor SSR do Angular (Express) expondo `POST /api/brag` que chama o flow: front, API, Genkit e Gemini no **mesmo processo Node**. E o fechamento da disciplina: **AI-Native é integrar IA com arquitetura, especificação, validação e pensamento crítico, não depender cegamente dela**.

---

## 👵 Explicando para a vovó

Um BFF é o garçom que conhece o cliente: o cliente fala com ele numa linguagem simples e ele conversa com a cozinha, o estoque e o caixa, escondendo as chaves do cofre. Aqui, o garçom e a cozinha dividem a mesma sala pequena, só para a aula ser mais fácil de acompanhar.

E a lição final é de quem aprende a usar um bom forno: o forno novo não faz do cozinheiro um sem-cérebro. Receita, higiene, teste de sabor e responsabilidade com o cliente continuam sendo dele.

---

## 🔧 Tecnicamente

### O que é
- **BFF (Backend For Frontend):** camada intermediária que serve as necessidades da interface: expõe APIs adequadas, encapsula regras, adapta payloads, protege credenciais e centraliza integrações. Comum com microsserviços, SPAs, mobile, SSR e APIs externas.
- **Micro-BFF da aula:** o servidor SSR do Angular já roda Express, então se adicionam endpoints REST nele: front Angular, servidor SSR, API Express e Genkit no mesmo processo Node. Em produção enterprise poderia haver Angular separado, NestJS, microsserviço de IA, autenticação dedicada, gateway, filas e workers. Simplifica-se a infraestrutura para focar no conceito.
- **Prompt para o agente:** usar o MCP do Genkit, modificar `server.ts`, criar a rota, integrar com o flow, tratar erros, atualizar o serviço Angular e validar o build. Detalhe de arquitetura: a rota da API precisa ficar antes da rota catch-all do Angular SSR, senão o Angular intercepta as chamadas.
- **A API é simples:** `express.json`, uma rota POST que extrai a definição, chama o flow e devolve JSON. Uma aplicação com LLM continua sendo entrada, processamento, validação e resposta; parte do processamento é por modelo generativo. Como LLMs podem falhar, exceder limites ou lançar exceção, a rota captura e responde HTTP 500, como em qualquer integração externa crítica.
- **Front:** standalone components exigem registrar providers (como `HttpClient`). O serviço deixou de usar `setTimeout` e arrays locais e passou a consumir a API com HttpClient; a interface praticamente não mudou, graças à separação entre estado, serviço e interface. O agente também executou build, ajustes de configuração e validação do SSR.
- **Primeiro fluxo completo:** o usuário escreve uma conquista informal, a aplicação envia à API, a API chama o flow, o Genkit conversa com o Gemini, o Gemini gera a resposta estruturada e o front renderiza.
- **Aprendizado sobre não determinismo:** a instrução «respeitar o idioma do input» falhou parcialmente: entrada em inglês, parte da resposta veio em português. Prompt engineering é um processo iterativo (testar, observar, refinar, ajustar, validar), e a Dev UI ajuda a rever o prompt e o contexto.
- **Fechamento (aula 5):** o engenheiro AI-Native atua como arquiteto, orquestrador, integrador, revisor e estrategista técnico. Ser AI-Native não é depender cegamente de IA nem deixá-la fazer tudo: é integrá-la corretamente ao fluxo de engenharia.
- **A jornada em uma linha por módulo:** módulo 1, IA em todo o ciclo (requisitos, edge cases, UX Writing, documentação, design, arquitetura); módulos 2 e 3, agentes, MCPs, orquestração, monorepo, isolamento e SDD; módulo 4, qualidade (Cypress, Playwright, self-healing, Playwright MCP); módulo 5, a IA como componente arquitetural (Genkit, Gemini, flows, Zod, SSR).
- **O que permanece:** engenharia de contexto, especificação estruturada, validação, observabilidade, automação, arquitetura e pensamento crítico. Ferramentas e modelos mudam; a IA acelera a execução, a responsabilidade técnica continua humana. Prompt engineering não desaparece com frameworks: fica encapsulada na arquitetura. O futuro provável é colaboração contínua entre humanos e sistemas inteligentes.
- **Checklist de revisão final da apostila:** refinar requisitos sem tratar o modelo como verdade; transformar jornadas, mensagens, dados e prompts em artefatos versionáveis; entender como MCP, design systems e especificações reduzem variabilidade; explicar por que monorepo, isolamento, code review e QA continuam importantes; integrar um modelo por contratos, schemas e camadas, sem acoplar à interface; saber onde revisão humana, segurança, observabilidade e pensamento crítico são indispensáveis.

### Como funciona
- Escrever a rota POST antes do catch-all do SSR: ler o corpo, chamar o flow, devolver o JSON e responder 500 em caso de exceção.
- Registrar `provideHttpClient` e trocar o método mockado do serviço por uma chamada HTTP, mantendo a interface do serviço.
- Testar o fluxo ponta a ponta e observar a variação de comportamento do modelo (idioma, formato) na Dev UI.

### Onde aplicar
- Qualquer aplicação com SSR que queira expor um endpoint de IA sem criar outro serviço no começo.
- Pontes para evoluir o micro-BFF em um serviço de IA separado quando a escala pedir.

### Vantagens e limites
**Vantagens**
- A chave do modelo fica no servidor, nunca no navegador.
- Um processo, um deploy, ótimo para aprender e prototipar.
- Contrato claro: o front só conhece `/api/brag`.

**Limites**
- Acopla renderização e IA no mesmo processo: não é um desenho de produção em larga escala.
- Sem camadas de autenticação, limite de uso e observabilidade, o endpoint é um ponto de custo exposto.

### 🚫 Armadilhas
- Colocar a rota depois do catch-all do SSR.
- Deixar o front acoplado ao provedor do modelo.
- Considerar pronto um comportamento do LLM visto uma vez (idioma, formato).
- Tomar o micro-BFF como arquitetura final.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| BFF | Backend For Frontend: camada que serve o que a interface precisa |
| Micro-BFF | BFF mínimo dentro do próprio servidor SSR do Angular |
| Catch-all | Rota que renderiza qualquer caminho; a API deve vir antes dela |
| HttpClient | Cliente HTTP do Angular, registrado por `provideHttpClient` |
| AI-Native | Integrar IA ao fluxo e à arquitetura mantendo engenharia e responsabilidade humana |
| Não determinismo | O mesmo prompt pode produzir saídas diferentes |

---

## 💻 No código do repo

**Projeto:** [modulo-05/brag-bot (server.ts e brag.service.ts)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-05/brag-bot)

A cola entre a interface e o flow: a rota Express no servidor SSR e o serviço Angular que a consome.

**Fluxo**
1. `src/server.ts`: `express.json()`, `express.static` do build do browser (sem index) e, antes do handler do Angular, `app.post('/api/brag', ...)`: lê `definition`, responde 400 `{ error: 'Definition is required' }` se for falso, chama `bragGeneratorFlow({ definition })` e devolve `res.json(result)`; no `catch`, `console.error` e 500 `{ error: 'Failed to generate brag' }`. O último `app.use` entrega ao `AngularNodeAppEngine`, e `reqHandler` é exportado para o CLI.
2. `src/app/services/brag.service.ts`: `generateBrag` liga o loading e faz `http.post('/api/brag', { definition })`; mapeia `businessImpact` para `impact`, junta `metrics` em string com vírgulas, usa `technologiesUsed` como `technologies` e adiciona o novo item no topo da lista (`brags.update`). No erro, só `console.error` e desliga o loading.
3. Fluxo ponta a ponta: `dashboard.component.ts` chama o serviço, o serviço chama `/api/brag`, a rota chama o flow, o flow chama o Gemini, e a lista de cards e a tela de detalhe reagem ao signal.

**Como rodar**
- Com `GOOGLE_API_KEY` no `.env`: `npm start`, abra http://localhost:4200, descreva uma conquista e clique em «Destilar Conquista». Não executei com chave real.
- Sem chave dá para exercitar a rota: `npm run build`, `PORT=4055 node dist/brag-bot/server/server.mjs` e `curl -X POST localhost:4055/api/brag -H 'Content-Type: application/json' -d '{}'`. Verifiquei: `{}` responde 400, e `definition` como objeto responde 500, porque o flow rejeita o tipo.

**Armadilhas e achados no código**
- Validação rasa: a rota só checa se `definition` é «verdadeiro». Um objeto ou número passa e acaba em 500 (verifiquei), em vez de 400. Não há limite de tamanho, autenticação nem limite de uso: qualquer cliente que alcance o servidor gasta a cota da chave (risco que a apostila menciona em termos de custo e segurança).
- A UI não tem estado de erro: se a API falhar, o botão volta ao normal e nada é mostrado ao usuário (só `console.error`), apesar de a aula tratar o erro no servidor.
- O `onSubmit()` do dashboard limpa o campo (`this.prompt = ''`) logo depois de chamar o serviço, antes de a resposta chegar: se a API falhar, o texto digitado se perde e nenhum erro aparece.
- O serviço aceita resposta sem `id` (`crypto.randomUUID()` de reserva): dupla geração de id no servidor e no cliente.
- O comentário JSDoc do `server.ts` é o do scaffold do Angular CLI e descreve exemplos de API que o arquivo agora implementa.

---

## 🔗 Para ir além
- [Repositório oficial: brag-bot (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-05/brag-bot)
- [Firebase Genkit](https://genkit.dev/)

---

⬅️ [14 · Flows, Zod e Google AI: o cérebro do Genkit](./14-flows-zod-e-google-ai.md)
