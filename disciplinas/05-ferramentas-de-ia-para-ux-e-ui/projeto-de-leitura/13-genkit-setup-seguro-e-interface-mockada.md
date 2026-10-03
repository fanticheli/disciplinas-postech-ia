# 13 · Genkit, setup seguro e interface mockada do BragBot

> **Unidade 5 · Aulas 1 e 2** · Leitura: ~9 min · Bloco: IA dentro da aplicação: Genkit e BragBot

## 🎯 Em uma frase
No BragBot a LLM passa a ser **parte da arquitetura**: o **Genkit** abstrai o provedor e valida a saída, a **API key vive em .env fora do Git** e a interface é construída primeiro com **dados mockados e Signals**, para só depois ligar o modelo.

---

## 👵 Explicando para a vovó

Até agora a IA era uma ferramenta na oficina: o marceneiro usava a furadeira. Agora a furadeira passa a ser uma peça do móvel que o cliente leva para casa. Isso muda tudo: a peça precisa de chave guardada, manual, garantia e uma interface que continue funcionando se trocarem o fabricante.

E antes de instalar a peça cara, monta-se o móvel com uma peça de madeira no lugar, só para ver se as portas abrem. Trocar a peça de madeira pela furadeira real depois é simples.

---

## 🔧 Tecnicamente

### O que é
- **Mudança de paradigma:** nas unidades anteriores Gemini, Cypress Prompt, agentes e MCPs eram ferramentas usadas por desenvolvedores. Agora a aplicação conversa com a IA, a IA retorna dados, o back-end processa e o front consome. Isso exige pensar em contratos, observabilidade, segurança e desacoplamento.
- **BragBot e Brag Doc:** o Brag Doc é o diário de conquistas profissionais usado em avaliações, PDI e promoções. O app transforma uma conquista informal em documento estruturado. Mas o foco real é aprender a integrar LLMs profissionalmente numa aplicação.
- **Por que um framework de IA:** cada fornecedor tem endpoints, SDKs, autenticação e formatos próprios; consumir direto cria acoplamento e trocar de modelo fica caro. O Genkit, criado pelo Google para Node.js, é agnóstico de modelo, funciona por plugins (Gemini, OpenAI, outros, modelos open source) e abstrai a interação com LLMs como ORMs abstraem banco, frameworks abstraem HTTP e SDKs abstraem APIs.
- **Não é só um wrapper:** ajuda em construção de prompts, validação de saída, tratamento de erros, debug, observabilidade, troca de modelos e padronização. A validação estrutural é central: a resposta da LLM não pode ser tratada como texto solto; contratos e schemas permitem detectar saída inválida e lançar exceção para o sistema tratar.
- **Biblioteca, não framework:** o Genkit pode viver dentro de Angular SSR, Express, NestJS, aplicações Node, microsserviços ou APIs tradicionais.
- **Decisão arquitetural didática:** usar o servidor SSR do Angular (Node) também como back-end simplificado, para não distrair com infraestrutura paralela. A apostila avisa que isso não é a arquitetura ideal para produção enterprise, onde caberiam Angular, NestJS, microsserviço de IA e workers separados.
- **Segurança da chave:** a API key da LLM representa custo e acesso à infraestrutura do modelo; vazamento permite consumir a cota, gerar custos e abusar da API. Nunca no código: cria-se `.env` e adiciona-se ao `.gitignore` (há bots procurando chaves vazadas em repositórios públicos). O Genkit reconhece variáveis padrão como `GOOGLE_API_KEY`.
- **Ferramentas:** Genkit CLI instalado globalmente (desenvolvimento, debug, observabilidade, inspeção), Genkit no projeto e plugin do Google AI. O Angular já sugere arquivos de contexto para agentes de IA na criação do projeto. O Genkit tem MCP próprio, configurado como o do Angular, Nx e Playwright; a validação foi perguntar ao agente quais modelos o servidor MCP lista.
- **Interface mockada primeiro (aula 2):** montar o fluxo visual, validar navegação e look and feel e só depois plugar o back-end ou a IA separa problema de interface de problema de integração. A identidade visual simulou a página da pós da UniPDS: o agente acessa a página, extrai a identidade e aplica no Angular. O prompt fixou Angular 21 com Tailwind CSS, Genkit e MCPs instalados, duas telas (dashboard e detail, com identificador na rota de detalhe) e rota padrão no dashboard.
- **Serviço com Signals:** o componente cuida da tela e o serviço, do estado e da lógica de dados. Dois signals: lista de conquistas e estado de loading (spinner, texto do botão). Um método mockado ativa o loading, espera de forma assíncrona e adiciona uma conquista com título, contexto, impacto, tecnologias e métrica: o formato aproximado do que a LLM devolverá. O dashboard tem um campo de texto para a conquista bruta e o botão «destilar conquista»; os cards usam `@for` e levam ao detalhe.
- **Decisão revisada:** o agente colocou o template dentro do TypeScript; o professor prefere arquivos separados quando a tela cresce. A preferência do time precisa ser revisada depois da geração.

### Como funciona
- Criar o projeto Angular com SSR; instalar Genkit, plugin do Google AI e Genkit CLI; criar `.env` com a chave e ignorá-lo no Git.
- Registrar o MCP do Genkit e validar listando os modelos.
- Pedir a UI ao agente com identidade visual de referência, duas telas, rotas e serviço com Signals, usando um método mockado.
- Validar fluxo, estado, navegação e identidade antes da integração.

### Onde aplicar
- Qualquer app que vá chamar um LLM: primeiro contrato e UI estáveis, depois o modelo.
- Equipes que querem poder trocar de fornecedor sem reescrever a aplicação.

### Vantagens e limites
**Vantagens**
- Troca de modelo por configuração de plugin e nome do modelo.
- A UI estável isola bugs de interface dos de integração.
- Segredos fora do repositório desde o primeiro commit.

**Limites**
- Mais uma dependência de framework a acompanhar (versões e nomes de modelo mudam).
- Usar o servidor SSR como back-end é simplificação didática, não desenho de produção.

### 🚫 Armadilhas
- Subir a API key para o GitHub.
- Ligar o modelo antes de a interface e o contrato estarem validados.
- Acoplar a aplicação a um fornecedor de LLM sem camada de abstração.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Genkit | Biblioteca do Google para Node.js que abstrai LLMs, flows e observabilidade |
| Plugin | Adaptador de provedor de modelo (Google AI, OpenAI, etc.) |
| Brag Doc | Diário estruturado de conquistas profissionais |
| Angular SSR | Renderização no servidor (Node) pelo próprio Angular |
| GOOGLE_API_KEY | Variável de ambiente que o plugin do Google AI reconhece |
| Genkit CLI | Ferramentas de desenvolvimento, debug e Dev UI |
| Mock | Dado simulado que permite validar a UI antes da integração |

---

## 💻 No código do repo

**Projeto:** [modulo-05/brag-bot](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-05/brag-bot)

Angular 21.1 com SSR, Tailwind 4, Genkit 1.32 e Gemini. Este tópico cobre o setup e as telas; o flow e a rota de API estão nos dois próximos.

**Fluxo**
1. `package.json`: `@angular/ssr`, `genkit` e `@genkit-ai/google-genai` (^1.32), `express` 5, `uuid` 13, `tailwindcss` 4 com `@tailwindcss/postcss` (`.postcssrc.json`) e o script `genkit:ui` (`genkit start -- npx tsx --watch src/flows.ts`).
2. `angular.json`: `outputMode: "server"`, `ssr.entry: "src/server.ts"` e `externalDependencies` com `genkit`, `@genkit-ai/google-genai`, `uuid` e `express`, para o build não empacotá-los.
3. `.gitignore` inclui `.env` e `.genkit`; `.vscode/mcp.json` registra só o MCP do Angular (o do Genkit não está no repo); `.gemini/GEMINI.md` traz as regras que o Angular CLI gera para agentes.
4. Rotas: `app.routes.ts` com `''` (`DashboardComponent`) e `detail/:id` (`DetailComponent`) lazy; `app.routes.server.ts` com `RenderMode.Server` para tudo; `app.config.ts` com `provideHttpClient(withFetch())` e `provideClientHydration(withEventReplay())`.
5. `dashboard.component.ts` e `detail.component.ts`: templates inline com classes do Tailwind (tema escuro com destaque esmeralda), título «Brag-Bot | Pós IA UNIPDS», `@for ... @empty` nos cards, estado vazio, spinner no botão e uma página de «Conquista não encontrada». O detalhe lê o id da rota e usa `computed` sobre o serviço.
6. `services/brag.service.ts`: signals `brags` e `loading` e `getBragById`. Na versão do repo o método de geração já chama a API; o mock desta aula não existe mais.

**Como rodar**
- `npm install`; crie `.env` com `GOOGLE_API_KEY=...` (não há `.env.example`); `npm start` para o dev server com SSR; `npm run build` compila (verifiquei) e `npm run serve:ssr:brag-bot` serve o build.
- `npm run genkit:ui` abre a Dev UI do Genkit (exige o Genkit CLI instalado; o `tsx` vem via `npx`). Não executei com uma chave real.

**Armadilhas e achados no código**
- O `.gemini/GEMINI.md` proíbe `standalone: true`, prefere Reactive Forms, exige `OnPush` e evita `any`. O código gerado faz o contrário: `standalone: true` explícito, `FormsModule` com `ngModel`, nenhum `ChangeDetectionStrategy.OnPush`, `CommonModule` importado sem uso e `post<any>` no serviço.
- Falta um `.env.example` documentando a variável; o README é o padrão do Angular CLI. O `index.html` está com `lang="en"` numa UI em português.
- `npm test`: verifiquei que `app.spec.ts` tem um teste passando e um falhando (espera o texto «Hello, brag-bot» num `h1` que não existe). Não há testes do serviço, do flow nem do endpoint.
- As conquistas só existem no signal do serviço, em memória: recarregar `/detail/:id` mostra «Conquista não encontrada» (pela leitura; verifiquei só que a rota responde 200 no SSR).
- `prompt` do dashboard é uma propriedade simples com `ngModel`, não um signal, ao contrário do resto do estado.

---

## 🔗 Para ir além
- [Repositório oficial: brag-bot (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-05/brag-bot)
- [Firebase Genkit](https://genkit.dev/)

---

⬅️ [12 · cy.prompt, self-healing e Playwright MCP: três estratégias de QA com IA](./12-cy-prompt-self-healing-e-playwright-mcp.md)  ·  [14 · Flows, Zod e Google AI: o cérebro do Genkit](./14-flows-zod-e-google-ai.md) ➡️
