# 14 · Flows, Zod e Google AI: o cérebro do Genkit

> **Unidade 5 · Aula 3** · Leitura: ~8 min · Bloco: IA dentro da aplicação: Genkit e BragBot

## 🎯 Em uma frase
No Genkit toda interação com a LLM acontece num **flow**: uma função assíncrona estruturada que encapsula prompt, modelo, **schemas Zod**, validação, tracing e observabilidade; os `describe` do schema ajudam a montar o prompt, e a Dev UI permite testar e depurar sem subir a aplicação.

---

## 👵 Explicando para a vovó

Imagine um funcionário de cozinha que recebe um pedido falado, bagunçado, de um cliente («aquele prato de ontem, mas sem cebola e mais rápido»). Ele precisa devolver sempre uma comanda no formato exato da cozinha: nome do prato, ingredientes, tempo. Se a comanda sair faltando campo, o garçom devolve.

O flow é essa estação de trabalho; o schema Zod é o formulário de comanda; e as legendas escritas em cada campo do formulário («aqui vai o prato principal») são o que o funcionário lê para entender o que preencher.

---

## 🔧 Tecnicamente

### O que é
- **O Genkit como camada de abstração:** cada fornecedor tem SDK, API, autenticação, formato e convenções próprios, e consumir direto cria acoplamento e custo de troca. Com o Genkit, trocar entre Gemini, OpenAI, Anthropic, modelos locais ou open source é basicamente mudar plugin e modelo. Também oferece flows, validação estrutural, observabilidade, tracing, debug, controle de output e integração tipada.
- **Flow:** praticamente toda interação com LLM acontece por flows. É uma função assíncrona estruturada, mas representa mais: encapsula prompt, modelo, schemas, validação, observabilidade, tracing e configuração de execução. É a unidade operacional de IA na aplicação. O da aula transforma um rascunho informal em um Brag Document com título, contexto, ação tomada, impacto, métricas e tecnologias.
- **Configuração:** uma instância principal do Genkit com plugin do Google AI, modelo Gemini e comportamento padrão. Todo o resto fica agnóstico de modelo: flow, schemas e lógica continuam iguais; muda plugin, nome do modelo e eventuais configurações.
- **Temperatura:** controla criatividade. Mais alta: mais criatividade, diversidade e imprevisibilidade; mais baixa: mais consistência e previsibilidade. A aula usou uma temperatura intermediária para dar alguma criatividade sem perder o tom profissional.
- **Zod:** o TypeScript valida tipos em compilação, mas dados externos (usuários, requests, serviços, LLMs) não têm garantia de respeitar a tipagem. O Zod valida contratos em tempo de execução, essencial porque LLMs não são determinísticas: podem alucinar, mudar a estrutura, esquecer propriedades ou devolver formato inválido.
- **Schema participa do prompt:** o Genkit usa os `describe` do schema para montar o prompt enviado à LLM. Eles funcionam como documentação semântica (por exemplo, o título é a ação principal e o contexto é a situação original). O schema deixa de ser só validação técnica e entra na engenharia de prompt.
- **System Prompt do flow:** persona, objetivo, regras e formato. A persona é de redatora profissional que transforma conquistas técnicas em documentação executiva; tom profissional, linguagem objetiva, sem exageros emocionais e preservando o idioma do input. Com uma instrução simples a aplicação fica multilíngue.
- **Output schema:** o Genkit instrui a LLM a responder no formato esperado; no Gemini o schema pode ir separado como parte estruturada da requisição, em outros modelos pode ser incorporado ao texto do prompt. A aplicação não precisa saber dessas particularidades. A resposta textual vira JSON validado: a LLM responde, o Genkit processa o schema, valida e o flow devolve um objeto tipado.
- **Dev UI:** permite executar flows isoladamente, ver traces, analisar prompts, verificar output, inspecionar schemas e depurar erros, sem criar API nem subir o front. Na aula o modelo Gemini estava configurado errado; usou-se a própria ferramenta para ver o erro, identificar o modelo inválido, consultar os modelos disponíveis, ajustar e reexecutar. Mostra o prompt enviado, o schema gerado, o output retornado, o parsing do JSON e o trace completo.
- **Depurar LLM é diferente:** não se analisa só código determinístico; é preciso entender contexto enviado, temperatura, schema e comportamento do modelo. O ambiente muda rápido (versões, modelos, SDKs e nomes), então observabilidade e debug são competências centrais.

### Como funciona
- Definir o schema de entrada e o de saída com Zod, cada campo com `describe`.
- Criar a instância do Genkit com plugin e modelo; definir o flow com os schemas e a lógica.
- Dentro do flow, chamar `generate` com o prompt e o `output` estruturado; lançar erro se não houver saída válida.
- Testar na Dev UI com entradas reais, inspecionando prompt, schema, output e trace; ajustar modelo, temperatura e instruções.

### Onde aplicar
- Qualquer transformação de texto livre em estrutura (resumir, classificar, extrair campos).
- Isolar a lógica de IA de uma aplicação num módulo testável e observável.

### Vantagens e limites
**Vantagens**
- Saída tipada e validada, consumível como qualquer função.
- Troca de provedor por configuração.
- Observabilidade e debug nativos pela Dev UI.

**Limites**
- Mesmo validada, a saída continua probabilística: o schema garante forma, não verdade.
- O prompt e o schema precisam ser mantidos juntos; mudar um sem o outro quebra a qualidade.

### 🚫 Armadilhas
- Tratar a resposta da LLM como texto solto.
- Esquecer que `describe` entra no prompt e escrevê-los como comentário interno.
- Hardcodar nome de modelo sem plano para quando ele mudar.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Flow | Função assíncrona estruturada do Genkit que encapsula prompt, modelo, schemas e tracing |
| Zod | Biblioteca de schemas com validação em tempo de execução para TypeScript |
| describe | Texto semântico num campo do schema que também orienta o modelo |
| Temperatura | Controle de criatividade versus previsibilidade da resposta |
| Dev UI | Interface local para executar flows e ver traces e prompts |
| Output estruturado | Resposta do modelo no formato do schema, validada pelo Genkit |

---

## 💻 No código do repo

**Projeto:** [modulo-05/brag-bot (src/flows.ts)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-05/brag-bot)

O flow inteiro cabe em `src/flows.ts`: instância do Genkit, schemas Zod e o `bragGeneratorFlow` chamando o Gemini.

**Fluxo**
1. `ai = genkit({ plugins: [googleAI()], model: googleAI.model('gemini-2.5-flash') })`.
2. `BragInputSchema`: `definition` (rascunho informal do usuário). `BragSchema`: `title`, `context`, `actionTaken`, `businessImpact`, `metrics` (array) e `technologiesUsed` (array), todos com `.describe(...)`.
3. `bragGeneratorFlow = ai.defineFlow({ name, inputSchema, outputSchema }, async (input) => ...)`: monta um prompt em template string (persona «Senior Career Consultant» para PDI de engenheiros de software; regras: tom profissional sem adjetivos emocionais, inferir a natureza da métrica quando não houver números, seguir o schema, respeitar o idioma do input) e chama `ai.generate` com `temperature: 0.8` e `output: { format: 'json', schema: BragSchema }`.
4. Se não vier `output`, lança `Error`; senão devolve `{ ...output, id: uuidv4() }`.

**Como rodar**
- Com `GOOGLE_API_KEY` no ambiente: `npm run genkit:ui`, abra a Dev UI e execute `bragGeneratorFlow` com `{ "definition": "otimizei a API com redis e ficou 10x mais rápida" }`. Não executei com chave real.
- Sem chave, testei só o comportamento dos schemas com uma sonda local (sem chamar o modelo), descrita abaixo.

**Armadilhas e achados no código**
- O nome do flow no repositório é `bragGeneratorFlow`; a apostila o chama de `bragGenerateFlow`.
- Instruções conflitantes: a regra 2 do prompt manda inferir a natureza da métrica de forma plausível quando não há métrica exata, enquanto o `describe` de `metrics` pede «apenas dados estritamente quantificáveis». Isso convida o modelo a inventar métricas num documento que serve a avaliação de desempenho.
- `temperature: 0.8` é uma escolha alta para um texto executivo; a aula fala em «intermediária». Menor valor tenderia a mais consistência (hipótese, não testei).
- O `id` não faz parte do `outputSchema`. Verifiquei com Genkit 1.32.0 que um flow com `outputSchema` sem `id` devolve o campo extra sem erro: funciona, mas o contrato declarado do flow não descreve o que a API de fato devolve.
- Verifiquei também que o flow rejeita `definition` que não seja string com `INVALID_ARGUMENT` (`Schema validation failed`), o que importa para a rota do próximo tópico.
- `actionTaken` é gerado e pago em tokens, mas o front o descarta (a interface `Brag` não tem esse campo).
- O nome do modelo (`gemini-2.5-flash`) está fixo em código; a própria aula relata um erro de modelo mal configurado.

---

## 🔗 Para ir além
- [Repositório oficial: brag-bot (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-05/brag-bot)
- [Firebase Genkit](https://genkit.dev/)

---

⬅️ [13 · Genkit, setup seguro e interface mockada do BragBot](./13-genkit-setup-seguro-e-interface-mockada.md)  ·  [15 · Micro-BFF full-stack e o Engenheiro AI-Native](./15-micro-bff-fullstack-e-engenheiro-ai-native.md) ➡️
