# 📝 Disciplina 05 · Prova comentada

> Ferramentas de IA para UX e UI. Cada questão traz o enunciado, a resposta certa, o raciocínio em linguagem simples, uma mini-aula dos conceitos, o erro de cada alternativa errada e onde se aprofundar no guia de leitura.

**Resumo das respostas**

| Questão | Tema | Resposta |
|---------|------|----------|
| 01 | Assistente de IA na IDE (pair programmer) | **A** |
| 02 | System Prompt do Bragbot | **C** |
| 03 | Trace no Firebase GenKit | **D** |
| 04 | Escalar adoção de IA (DevEx, Nx, CI/CD) | **C** |
| 05 | Objetivo da IA generativa em interfaces | **A** |
| 06 | IA no Figma (plugins) | **D** |
| 07 | Feedback de estado em tarefas longas de agentes | **A** |
| 08 | Copilot em monorepo Nx | **A** |
| 09 | O que é o Firebase GenKit | **E** |
| 10 | Saída de LLM em dados financeiros (Zod/ajv) | **B** |

---

## Questão 01 · Assistente de IA na IDE (pair programmer)

**Pergunta:** O ChatGPT ou o Gemini integrado na IDE (como o VS Code) atua principalmente como:

**Alternativas:**
- A) ✅ Assistente de pareamento (Pair Programmer), sugerindo código e explicando lógicas complexas.
- B) Emulador de Android.
- C) Substituto do sistema operacional.
- D) Gerenciador de banco NoSQL.
- E) Compilador C++.

**Resposta: A.** Assistente de pareamento (Pair Programmer), sugerindo código e explicando lógicas complexas.

### Resolução comentada
A pergunta é sobre o papel de uma IA que mora dentro do editor. Pense no que ela enxerga: o arquivo aberto, o projeto, o erro que apareceu. Com esse contexto ela faz o que um colega sentado ao lado faria: sugere o próximo trecho, explica uma função confusa, aponta um bug.

Por isso a resposta é "pair programmer". As outras alternativas descrevem outras categorias de software (emulador, sistema operacional, banco, compilador). Nenhuma delas é papel de um assistente de código. A pegadinha é só reconhecer o óbvio: a IA ajuda no fluxo de trabalho de quem programa, não substitui peças da infraestrutura.

### Entenda os conceitos
- **Pair programming (pareamento):** duas pessoas trabalham juntas no mesmo código, uma escrevendo e a outra revisando e sugerindo. Com IA, o "colega" é o assistente na IDE. O guia usa a expressão ao dizer que existem formas diferentes de usar IA: conversação para refinar, agentes locais para pair programming, vários agentes em worktrees para paralelizar e agentes na nuvem para delegar.
- **Assistente integrado à IDE:** enxerga o código aberto e o workspace, por isso responde com contexto, em vez de um chat solto que só sabe o que você colar. No guia, o exemplo é o Antigravity, uma IDE AI-first (fork do VS Code) em que a IA deixa de ser "um chat externo" e propõe alterações com plano antes de aplicar.
- **Agente local x assíncrono:** no local você interage, ajusta e revisa passo a passo (é o pareamento); no assíncrono (Jules) você entrega uma tarefa bem descrita e revisa o PR depois.
- **Revisão humana:** o assistente propõe, quem aprova é o desenvolvedor. Mais poder do agente exige mais responsabilidade de quem revisa.

### Por que as outras erram
- **B:** emulador de Android é um programa que simula um celular para testar apps. Nada a ver com sugerir código.
- **C:** o sistema operacional gerencia hardware e processos (Windows, Linux). A IA roda dentro de uma IDE, em cima do SO.
- **D:** gerenciador de banco NoSQL é, por exemplo, o MongoDB: guarda documentos. Não sugere nem explica código.
- **E:** compilador C++ transforma código C++ em programa executável. O assistente sugere código, não o compila.

### Aprofundar no guia
- [03 · Ambiente AI-first](./projeto-de-leitura/03-ambiente-ai-native-angular-antigravity-mcp.md), seção "Tecnicamente > O que é" (itens Antigravity e "Plano antes da ação"): mostra uma IDE com agente que propõe o plano e espera aprovação.
- [10 · Google Jules](./projeto-de-leitura/10-google-jules-agente-assincrono-em-nuvem.md), seção "Tecnicamente > O que é" (item "Mensagem final"): compara pair programming local com agentes assíncronos.
- [01 · Fundamentos, tópico 08 · Ferramentas de dev e agentes](../01-fundamentos-de-ia-e-llm/projeto-de-leitura/08-ferramentas-dev-e-agentes.md), seção "Tecnicamente": visão geral das ferramentas de IA para desenvolvedores.

*Código da questão: 168621*

---

## Questão 02 · System Prompt do Bragbot

**Pergunta:** Num "Bragbot" (robô que destaca conquistas profissionais), qual é o componente de IA mais importante para manter a coerência das respostas?

**Alternativas:**
- A) A cor do botão de envio.
- B) Hospedagem em servidor FTP.
- C) ✅ Um Prompt de Sistema (System Prompt) robusto que defina a persona e as restrições do bot.
- D) Fontes serifadas.
- E) Ausência de validação no formulário.

**Resposta: C.** Prompt de Sistema robusto, com persona e restrições.

### Resolução comentada
A pergunta pede o componente **de IA**. Cor de botão, fonte, hospedagem e formulário são decisões de interface ou de infraestrutura e não mexem no comportamento do modelo. Só uma alternativa mexe: o System Prompt.

O System Prompt é a instrução fixa que diz ao modelo quem ele é (persona), o que deve fazer, quais regras segue e em que formato responde. Se ele é bem escrito, o bot mantém o mesmo tom e o mesmo tipo de resposta a cada chamada. No BragBot do guia, a persona é de uma redatora profissional que transforma conquistas técnicas em documentação executiva, com tom profissional e sem exageros.

### Entenda os conceitos
- **Bragbot / Brag Doc:** o Brag Doc é um diário de conquistas profissionais usado em avaliações, PDI e promoções. O app recebe uma conquista informal e devolve um documento estruturado (título, contexto, ação, impacto, métricas, tecnologias).
- **System Prompt:** instrução fixa que define papel e regras do modelo durante a conversa. O guia o descreve com quatro blocos: papel, objetivo, regras e formato de saída. Analogia: o crachá e o manual de função de um funcionário novo (analogia do revisor, não do guia).
- **Persona e restrições:** a persona dá o tom de voz; as restrições dizem o que não fazer ou o que preservar (por exemplo, respeitar o idioma do input). Isso vira a UX do texto do bot.
- **Contexto herdado:** o guia alerta que, ao trocar de tarefa, é preciso trocar o System Prompt; senão o modelo herda regras da tarefa anterior e responde no formato errado.
- **Não determinismo:** mesmo com bom System Prompt, o modelo pode errar. No BragBot, a regra "respeitar o idioma" falhou em parte (entrada em inglês, parte da resposta em português), então prompt é processo iterativo.

### Por que as outras erram
- **A:** a cor do botão é design visual. Não altera o que o modelo responde.
- **B:** FTP é um protocolo de transferência de arquivos; hospedar nele não dá coerência a respostas de IA.
- **D:** tipografia é estilo. Serifada ou não, o modelo responde igual.
- **E:** tirar a validação do formulário piora a qualidade da entrada (e a segurança), o oposto de manter coerência.

### Aprofundar no guia
- [14 · Flows, Zod e Google AI](./projeto-de-leitura/14-flows-zod-e-google-ai.md), seção "Tecnicamente > O que é" (item "System Prompt do flow"): persona, objetivo, regras e formato do BragBot.
- [00 · Refinamento de requisitos](./projeto-de-leitura/00-refinamento-requisitos-edge-cases-mermaid.md), seção "Cola rápida": definição de System Prompt e dos quatro blocos do prompt estruturado.
- [02 · Feedback em backlog e Prompt as Code](./projeto-de-leitura/02-feedback-em-backlog-e-prompt-as-code.md), seção "Tecnicamente > O que é": System Prompt como arquivo versionado no repositório.
- [01 · Fundamentos, tópico 07 · Prompt engineering](../01-fundamentos-de-ia-e-llm/projeto-de-leitura/07-prompt-engineering.md), seção "Tecnicamente": base de prompt engineering.

*Código da questão: 168624*

---

## Questão 03 · Trace no Firebase GenKit

**Pergunta:** No Firebase GenKit, o termo "Trace" serve para:

**Alternativas:**
- A) Desenhar formas na tela (canvas).
- B) Apagar o histórico do usuário.
- C) Buscar erros de sintaxe em TypeScript.
- D) ✅ Rastrear e visualizar a execução de ponta a ponta de um fluxo de IA, incluindo chamadas de LLM, ferramentas e tempo de processamento.
- E) Compilar o app para iOS.

**Resposta: D.** Rastrear e visualizar a execução de ponta a ponta de um fluxo de IA.

### Resolução comentada
"Trace" vem de "rastro". Em software, tracing é registrar o caminho de uma execução: o que entrou, por quais etapas passou, o que saiu e quanto tempo cada etapa levou. No GenKit isso vale para os flows de IA.

Isso importa porque LLM não é código determinístico: você precisa ver o que o modelo recebeu e o que devolveu para entender uma resposta ruim ou lenta. Por isso a resolução fala em observabilidade: com o trace dá para auditar o prompt, o schema, a saída e o tempo, e otimizar latência e qualidade.

### Entenda os conceitos
- **Firebase GenKit:** biblioteca do Google para Node.js que abstrai LLMs, flows e observabilidade (ver Q09).
- **Flow:** função assíncrona estruturada que encapsula prompt, modelo, schemas Zod, validação, tracing e observabilidade. É a unidade operacional de IA na aplicação.
- **Trace / tracing:** o registro da execução de um flow de ponta a ponta. Analogia: o extrato detalhado de uma ligação, mostrando cada transferência e quanto tempo durou cada uma (analogia de complemento, fora do material).
- **Dev UI:** interface local do GenKit para executar flows isoladamente, ver traces, analisar prompts, verificar output e inspecionar schemas, sem criar API nem subir o front. Na aula, o modelo Gemini estava configurado errado e a Dev UI mostrou o erro, o prompt enviado, o schema gerado, o output e o parsing do JSON.
- **Observabilidade:** capacidade de entender o que acontece dentro do sistema a partir do que ele registra. O guia a lista entre o que permanece essencial na Engenharia AI-Native.
- **Depurar LLM é diferente:** é preciso entender o contexto enviado, a temperatura, o schema e o comportamento do modelo, não só o código.

### Por que as outras erram
- **A:** desenhar formas é o que faz um canvas (API de gráficos 2D do navegador). Não tem relação com o GenKit.
- **B:** apagar histórico é limpeza de dados. Tracing é leitura e registro, não exclusão.
- **C:** achar erros de sintaxe é trabalho do compilador do TypeScript e do linter, em tempo de compilação. O trace mostra a execução em tempo de rodar.
- **E:** compilar para iOS é build mobile (Xcode, por exemplo). O GenKit é uma biblioteca Node.js.

### Aprofundar no guia
- [14 · Flows, Zod e Google AI](./projeto-de-leitura/14-flows-zod-e-google-ai.md), seção "Tecnicamente > O que é" (itens "Dev UI" e "Depurar LLM é diferente"): onde o trace aparece na prática.
- [14 · Flows, Zod e Google AI](./projeto-de-leitura/14-flows-zod-e-google-ai.md), seção "Cola rápida": definições de Flow e Dev UI.
- [13 · Genkit, setup seguro e interface mockada](./projeto-de-leitura/13-genkit-setup-seguro-e-interface-mockada.md), seção "Tecnicamente > O que é" (item "Ferramentas"): o Genkit CLI serve a desenvolvimento, debug, observabilidade e inspeção.

*Código da questão: 168628*

---

## Questão 04 · Escalar a adoção de IA (DevEx, Nx, CI/CD)

**Pergunta:** Para escalar a adoção de assistentes de codificação de 5% para 80% das equipes, qual é a prática corporativa fundamental sob a ótica de DevEx e arquitetura?

**Alternativas:**
- A) Medir produtividade apenas por linhas de código geradas.
- B) Obrigar o uso do ChatGPT na web e proibir integrações com a IDE.
- C) ✅ Criar templates padronizados (scaffolding) no Nx e integrar agentes nas pipelines de CI/CD para automação de testes e code review, tornando a IA parte do processo sistêmico.
- D) Remover restrições de segurança e liberar tokens ilimitados.
- E) Desligar o Angular e usar Vanilla JS para facilitar a leitura pela IA.

**Resposta: C.** Templates padronizados no Nx e agentes integrados ao CI/CD.

### Resolução comentada
Adoção em massa não acontece por decreto nem por entusiasmo individual: acontece quando usar IA é o caminho mais fácil e já vem pronto no processo. Isso é DevEx (a experiência de quem desenvolve).

Dois movimentos fazem isso. Primeiro, padronizar a base: templates e geradores (scaffolding) no monorepo Nx fazem todo projeto nascer com a mesma estrutura, o que também ajuda o agente a acertar. Segundo, colocar a IA no ciclo de vida: agentes nas pipelines de CI/CD fazendo testes e code review automaticamente. Assim a IA deixa de ser ferramenta pessoal e vira parte do processo.

### Entenda os conceitos
- **DevEx / DX (Developer Experience):** a experiência de quem desenvolve: convenções, desacoplamento, lint, typecheck. O guia traz essa definição na live Safer, onde o `CLAUDE.md` do repositório fixa regras que o agente deve seguir (rodar lint e typecheck antes de concluir).
- **Monorepo Nx:** vários projetos no mesmo repositório, com targets, cache, grafo de dependências e plugins. O guia diz que o agente enxerga front, back e contratos e por isso acerta mais, e que o Nx tem integração com o Nx Cloud para CI/CD.
- **Scaffolding / templates / geradores:** esqueleto padronizado para criar projetos e componentes. No guia, os geradores do Nx aparecem em `nx.json` (geradores do Angular com Vitest e Playwright); o termo "scaffolding" como política de adoção vem da resolução da prova (complemento, fora do material).
- **CI/CD:** esteira automática que roda build e testes a cada mudança. Colocar agentes nela (review, testes) é a ideia da alternativa certa; o guia mostra o agente assíncrono (Jules) que roda testes e abre PR, com revisão humana antes do merge.
- **MCP do Nx:** servidor que dá ao agente conhecimento de projetos, targets e boas práticas do Nx, reduzindo comando inventado e consumo de tokens.
- **Escala de adoção 5% para 80%:** o número é da pergunta. O guia não discute adoção organizacional (complemento, fora do material); a leitura vem da resolução da prova.

### Por que as outras erram
- **A:** linhas geradas medem volume, não valor. Código demais pode ser dívida. O guia insiste que mais código gerado exige mais validação, não menos.
- **B:** proibir a integração com a IDE tira o contexto do código aberto, justamente o que torna o assistente útil (ver Q01).
- **D:** remover segurança e liberar tokens é risco e custo sem controle. O guia trata chaves como custo e risco: ficam em `.env` ou secrets, e agentes assíncronos não recebem permissões irrestritas.
- **E:** a IA lê Angular sem problema, e o guia mostra o MCP do Angular justamente para o agente seguir o framework atualizado. Trocar de stack não é estratégia de adoção.

### Aprofundar no guia
- [07 · Fundação enterprise: Nx](./projeto-de-leitura/07-fundacao-enterprise-nx-monorepo-shared-types.md), seção "Tecnicamente > O que é" (itens Nx, "Contrato compartilhado" e "MCP do Nx"): por que o monorepo organiza o trabalho com agentes.
- [16 · Live Safer](./projeto-de-leitura/16-live-safer-skills-mcp-e-lagune.md), seção "Cola rápida" (linha DX) e "Tecnicamente" (item "Regras do repositório (CLAUDE.md)"): DX na prática, com regras fixas para o agente.
- [10 · Google Jules](./projeto-de-leitura/10-google-jules-agente-assincrono-em-nuvem.md), seção "Tecnicamente > O que é" (item "Revisão"): agente que roda testes e abre PR com revisão humana.
- [11 · QA no Nx](./projeto-de-leitura/11-qa-no-nx-cypress-e-testes-gerados-por-openspec.md), seção "Tecnicamente > O que é": testes integrados ao workspace Nx.

*Código da questão: 168640*

---

## Questão 05 · Objetivo da IA generativa em interfaces

**Pergunta:** Qual é o principal objetivo do uso de IA Generativa (como o Gemini) em interfaces de usuário?

**Alternativas:**
- A) ✅ Possibilitar interações mais personalizadas, preditivas e contextuais.
- B) Padronizar o layout visual para todos os usuários sem distinção.
- C) Eliminar frameworks como o Angular.
- D) Substituir testes de usabilidade.
- E) Criar bancos de dados relacionais mais rápidos.

**Resposta: A.** Interações mais personalizadas, preditivas e contextuais.

### Resolução comentada
Pergunte "o que a IA traz de novo para a interface?". Uma tela tradicional é igual para todo mundo e só reage a cliques fixos. Com IA generativa a interface pode entender o contexto do usuário e responder de forma dinâmica: sugerir, antecipar, adaptar texto e fluxo.

Todas as outras alternativas descrevem coisas que a IA não faz ou não é o objetivo: padronizar tudo (o oposto de personalizar), eliminar frameworks, substituir testes, acelerar bancos.

### Entenda os conceitos
- **Personalização, previsão e contexto:** a interface usa o que sabe do usuário e da situação para responder melhor. A definição é da resolução da prova; o guia mostra o princípio no BragBot, em que o usuário escreve uma conquista informal e a tela devolve um documento estruturado (complemento, fora do material, para o termo "preditiva").
- **IA dentro da aplicação:** no tópico 13 do guia (Unidade 5, bloco "IA dentro da aplicação"), "a aplicação conversa com a IA, a IA retorna dados, o back-end processa e o front consome". A IA vira componente da arquitetura, não só ferramenta do desenvolvedor.
- **Interface desacoplada do modelo:** o front só conhece um contrato (`/api/brag`), não o provedor. Assim o modelo pode mudar sem reescrever a tela.
- **Estados de interface:** carregamento, vazio e erro continuam obrigatórios. A IA não dispensa os estados clássicos (ver Q07).

### Por que as outras erram
- **B:** padronizar sem distinção é o contrário de personalizar.
- **C:** Angular continua sendo o front. O guia usa Angular com Genkit e o agente é orientado por MCP do Angular para gerar código correto.
- **D:** IA não substitui testar com pessoas. O guia pede revisão humana e validação em todas as etapas.
- **E:** velocidade de banco relacional depende de índices, motor e hardware, não de IA generativa na interface.

### Aprofundar no guia
- [13 · Genkit, setup seguro e interface mockada](./projeto-de-leitura/13-genkit-setup-seguro-e-interface-mockada.md), seção "Tecnicamente > O que é" (item "Mudança de paradigma"): a aplicação passa a conversar com a IA.
- [15 · Micro-BFF full-stack e o Engenheiro AI-Native](./projeto-de-leitura/15-micro-bff-fullstack-e-engenheiro-ai-native.md), seção "Tecnicamente > O que é" (item "Primeiro fluxo completo"): fluxo do usuário até a resposta renderizada.
- [README do guia](./projeto-de-leitura/README.md), seção "Mentalidade da disciplina": o fio condutor de que IA acelera quando recebe contexto, contratos e validação.

*Código da questão: 168602*

---

## Questão 06 · IA no Figma (plugins)

**Pergunta:** Qual é o impacto da IA em ferramentas de design como o Figma?

**Alternativas:**
- A) Impedem a exportação de SVG.
- B) Convertem wireframes em código Java.
- C) Bloqueiam a colaboração multiusuário.
- D) ✅ Plugins de IA automatizam tarefas repetitivas, como renomear camadas, gerar paletas de cores e popular layouts com dados realistas.
- E) Param de funcionar em navegadores.

**Resposta: D.** Plugins de IA automatizam tarefas repetitivas.

### Resolução comentada
O Figma é uma ferramenta de design que roda no navegador, com colaboração em tempo real e exportação de assets. A IA chegou ali como **plugins**: pequenas extensões que fazem o trabalho chato (renomear camadas, sugerir paleta, preencher a tela com dados de exemplo) para o designer focar em decisões.

As alternativas erradas dizem que a IA quebra algo que o Figma já fazia (SVG, colaboração, navegador) ou inventam uma conversão para Java. Nenhuma é impacto real.

### Entenda os conceitos
- **Plugins do Figma:** extensões que adicionam funções à ferramenta. Renomear camadas, gerar paleta e popular com dados realistas são os exemplos da resolução da prova; o guia não detalha plugins do Figma (complemento, fora do material).
- **Handoff:** entrega do design para o desenvolvimento. Antes dependia de interpretar espaçamentos, fontes e cores à mão; hoje modelos multimodais leem a imagem e geram código. O guia mostra isso com o prompt do Figma (imagem do extrato Pix, specs que simulam o Dev Mode e contexto da arquitetura).
- **Stitch:** ferramenta do Google que gera interfaces a partir de linguagem natural e exporta, inclusive para o Figma. É referência visual; o agente a traduz para o componente real do projeto.
- **Design tokens:** variáveis de cor, espaçamento etc. que o código deve usar no lugar de valores absolutos, mantendo consistência. O prompt de refatoração do guia proíbe cor em hex absoluto.
- **Designer em decisões estratégicas:** a ideia da resolução é que a IA tira o trabalho repetitivo e deixa o designer pensar em experiência e produto.

### Por que as outras erram
- **A:** o SVG continua exportável. Esse formato vetorial é padrão no Figma.
- **B:** wireframe vira código por ferramentas como o Stitch ou por agentes, e no guia o destino é Angular (TypeScript), não Java. Java é linguagem de back-end.
- **C:** colaboração multiusuário é justamente um ponto forte do Figma.
- **E:** o Figma roda em navegadores. A IA não muda isso.

### Aprofundar no guia
- [05 · Stitch e Figma](./projeto-de-leitura/05-stitch-e-figma-da-referencia-visual-ao-componente.md), seção "Tecnicamente > O que é" (itens "Figma e handoff", "Entradas multimodais da aula" e "Prompt do Figma"): como o design vira componente Angular.
- [04 · Design tokens e componentes acessíveis](./projeto-de-leitura/04-design-tokens-e-componentes-acessiveis.md), seção "Tecnicamente > O que é": tokens como base de consistência visual.
- [06 · Corrigindo a interface com IA](./projeto-de-leitura/06-corrigindo-a-interface-com-ia.md), seção "Tecnicamente > O que é": ajustes de contraste e responsividade com revisão humana.

*Código da questão: 168619*

---

## Questão 07 · Feedback de estado em tarefas longas de agentes

**Pergunta:** Qual técnica de design evita que a interface pareça "quebrada" durante tarefas assíncronas longas executadas por agentes autônomos?

**Alternativas:**
- A) ✅ Feedback de estado progressivo (ex.: "Analisando dados...", "Gerando código...") indicando a etapa do agente.
- B) Fechar o navegador automaticamente.
- C) Ocultar a interface e mostrar tela branca.
- D) Desativar o CSS até o agente terminar.
- E) Exibir um popup de erro genérico preventivo.

**Resposta: A.** Feedback de estado progressivo.

### Resolução comentada
Uma tarefa de agente pode levar segundos ou minutos. Se a tela fica parada, o usuário acha que travou. A solução de UX é mostrar o que está acontecendo, etapa por etapa. Isso mantém a confiança.

O teste mental é simples: qual opção deixa o usuário informado? Só a A. As outras escondem, quebram ou assustam o usuário.

### Entenda os conceitos
- **Estados de interface:** o guia lista carregamento (sem feedback o usuário acha que travou), vazio e erro, e diz que a forma de comunicar o erro afeta a confiança no produto.
- **Feedback de estado progressivo:** em vez de um spinner mudo, mensagens que acompanham as etapas. O termo e os exemplos vêm da resolução da prova; o guia cobre só o estado de loading (complemento, fora do material).
- **Tarefa assíncrona de agente:** o agente trabalha sozinho por um tempo. No guia, o Jules sobe uma VM, monta plano, altera arquivos, roda testes e registra evidências, e o Antigravity mostra artifacts com plano e rastreio de alterações, que dão transparência.
- **Signals de loading:** no BragBot, o serviço Angular tem um signal de loading que ativa spinner e muda o texto do botão enquanto a chamada está em curso.
- **Interface nunca deve quebrar sem fallback:** o guia diz que crash e tela branca são de alta severidade e que a interface deve ter fallback, feedback visual, mensagem clara e possibilidade de recuperação.

### Por que as outras erram
- **B:** fechar o navegador descarta o trabalho e a sessão do usuário.
- **C:** tela branca é exatamente o sintoma de falha que o guia classifica como bug crítico.
- **D:** sem CSS a página fica sem layout e parece de fato quebrada.
- **E:** avisar de erro que não ocorreu confunde e destrói a confiança. Erro real tem mensagem clara e próximo passo; erro "preventivo" não existe.

### Aprofundar no guia
- [00 · Refinamento de requisitos](./projeto-de-leitura/00-refinamento-requisitos-edge-cases-mermaid.md), seção "Tecnicamente > O que é" (item "Estados de interface"): carregamento, vazio e erro.
- [02 · Feedback em backlog](./projeto-de-leitura/02-feedback-em-backlog-e-prompt-as-code.md), seção "Tecnicamente > O que é" (item "Classificação"): por que tela branca é bug crítico.
- [13 · Genkit e interface mockada](./projeto-de-leitura/13-genkit-setup-seguro-e-interface-mockada.md), seção "Tecnicamente > O que é" (item "Serviço com Signals"): signal de loading com spinner.
- [10 · Google Jules](./projeto-de-leitura/10-google-jules-agente-assincrono-em-nuvem.md), seção "Tecnicamente > O que é" (item "Execução"): o que um agente assíncrono faz durante a espera.

*Código da questão: 168630*

---

## Questão 08 · Copilot em monorepo Nx

**Pergunta:** Em um monorepo com Nx, qual é a vantagem de adotar uma IA como o GitHub Copilot?

**Alternativas:**
- A) ✅ Acelera a criação de componentes, testes unitários e refatorações no ecossistema do monorepo.
- B) Bloqueia bibliotecas compartilhadas.
- C) Remove a necessidade de arquitetura de pastas.
- D) Substitui o NPM ou o Yarn.
- E) Compila o código sem intervenção humana.

**Resposta: A.** Acelera a criação de componentes, testes e refatorações.

### Resolução comentada
O Copilot sugere blocos de código e testes. Num workspace Nx, que é modular (apps e bibliotecas organizadas), esses blocos se encaixam bem: criar componente, escrever teste unitário e refatorar são tarefas repetitivas e padronizadas, onde a IA ganha tempo.

Raciocine pelo que a IA faz (sugere) e pelo que ela não faz (não gerencia pacotes, não decide a arquitetura sozinha, não compila nem substitui o humano).

### Entenda os conceitos
- **Nx:** ferramenta de monorepo que gerencia aplicações, bibliotecas, dependências, execução, testes e build, com cache e análise de dependências. Mnemônico do guia: monorepo é o prédio, a biblioteca de tipos compartilhados é o quadro de avisos.
- **Monorepo x monólito:** monorepo é organização de código; monólito é estratégia de arquitetura ou deploy. Não são a mesma coisa.
- **Shared-types:** biblioteca de interfaces e DTOs usada por front e back, para o contrato existir em um só lugar.
- **GitHub Copilot:** assistente de código da GitHub integrado à IDE. O guia o cita só de passagem, como exemplo de ferramenta equivalente a Cursor e Windsurf, e diz para não decorar a ferramenta e sim o princípio (complemento, fora do material, para os detalhes do Copilot).
- **Agente com escopo e MCP:** o guia mostra que, em monorepo, o agente deve receber escopo explícito ("não modifique os apps") e o MCP do Nx para conhecer projetos e targets; o plano é revisado antes de autorizar.
- **Revisão e testes:** mais código gerado exige validação. O guia mantém commits pequenos, code review e QA mesmo com agentes.

### Por que as outras erram
- **B:** a IA não bloqueia bibliotecas. O monorepo Nx existe para compartilhar bibliotecas.
- **C:** arquitetura de pastas e de módulos continua necessária. O guia reforça que a IA torna a base de arquitetura mais importante, não menos.
- **D:** NPM e Yarn são gerenciadores de pacotes. Copilot sugere código, não instala nem resolve dependências.
- **E:** compilar sem intervenção humana contradiz a visão do guia: IA propõe e o desenvolvedor revisa.

### Aprofundar no guia
- [07 · Fundação enterprise: Nx](./projeto-de-leitura/07-fundacao-enterprise-nx-monorepo-shared-types.md), seção "Tecnicamente > O que é" (itens "Nx", "Monorepo versus monólito" e "Primeira tarefa controlada"): por que o monorepo ajuda o agente.
- [09 · Worktrees e agentes em paralelo](./projeto-de-leitura/09-worktrees-agentes-paralelos-review-e-archive.md), seção "Tecnicamente": agentes gerando partes do monorepo em paralelo, com revisão e integração.
- [03 · Ambiente AI-first](./projeto-de-leitura/03-ambiente-ai-native-angular-antigravity-mcp.md), seção "🚫 Armadilhas": o aviso de não decorar a ferramenta (cita Copilot).

*Código da questão: 168606*

---

## Questão 09 · O que é o Firebase GenKit

**Pergunta:** Na Engenharia AI-Native, o que é o Firebase GenKit?

**Alternativas:**
- A) Um banco de dados SQL estruturado.
- B) Uma biblioteca exclusiva de animações CSS.
- C) Uma ferramenta de design vetorial.
- D) Um sistema de controle de versão concorrente do Git.
- E) ✅ Um framework para construir, integrar e testar aplicações baseadas em IA com suporte nativo a LLMs.

**Resposta: E.** Framework para construir, integrar e testar aplicações baseadas em IA, com suporte nativo a LLMs.

### Resolução comentada
O GenKit é a peça que liga a aplicação ao modelo. Em vez de falar direto com o SDK de cada fornecedor (Gemini, OpenAI, Anthropic), você usa o GenKit, que organiza prompts, flows, ferramentas, validação de saída e observabilidade. Se quiser trocar de modelo, troca plugin e nome do modelo.

Para responder, é só lembrar que ele é "uma caixa de ferramentas para IA dentro da aplicação". As outras alternativas são categorias que não têm nada de IA.

### Entenda os conceitos
- **Genkit:** biblioteca/framework do Google para Node.js, agnóstico de modelo e baseado em plugins. O guia o compara a como ORMs abstraem banco e frameworks abstraem HTTP. A resolução chama de "framework"; o guia diz "biblioteca, não framework" por poder viver dentro de Angular SSR, Express, NestJS etc. Os dois descrevem a mesma peça.
- **Plugin:** adaptador de provedor de modelo (Google AI, OpenAI etc.).
- **Flow:** função assíncrona que encapsula prompt, modelo, schemas Zod, validação e tracing.
- **Zod:** biblioteca de schemas que valida contratos em tempo de execução. Importante porque LLMs podem alucinar, mudar a estrutura ou esquecer campos.
- **Genkit CLI e MCP do Genkit:** a CLI serve a desenvolvimento, debug e inspeção; o MCP do Genkit é configurado como o do Angular, Nx e Playwright.
- **Segurança da chave:** a API key (por exemplo `GOOGLE_API_KEY`) vai em `.env` ignorado no Git, nunca no código.

### Por que as outras erram
- **A:** banco SQL guarda dados em tabelas (PostgreSQL, MySQL). O GenKit orquestra IA.
- **B:** biblioteca de animações CSS é algo como o Animate.css. Nada de IA.
- **C:** ferramenta de design vetorial é o Figma ou o Illustrator. O GenKit é back-end Node.
- **D:** controle de versão é o Git. O GenKit não versiona código.

### Aprofundar no guia
- [13 · Genkit, setup seguro e interface mockada](./projeto-de-leitura/13-genkit-setup-seguro-e-interface-mockada.md), seção "Tecnicamente > O que é" (itens "Por que um framework de IA", "Não é só um wrapper" e "Biblioteca, não framework").
- [14 · Flows, Zod e Google AI](./projeto-de-leitura/14-flows-zod-e-google-ai.md), seção "Como funciona": o passo a passo para definir schemas, flow e testar na Dev UI.
- [15 · Micro-BFF full-stack](./projeto-de-leitura/15-micro-bff-fullstack-e-engenheiro-ai-native.md), seção "Tecnicamente > O que é" (item "Micro-BFF da aula"): como o Genkit se encaixa na API Express.

*Código da questão: 168603*

---

## Questão 10 · Saída de LLM em dados financeiros (Zod/ajv)

**Pergunta:** Em um front-end corporativo com Angular e Nx, qual estratégia é recomendada para lidar com a natureza probabilística dos LLMs ao apresentar dados financeiros sensíveis?

**Alternativas:**
- A) Treinar o modelo no frontend para nunca errar.
- B) ✅ Isolar as respostas da IA das funções transacionais, validando estritamente os artefatos estruturados (ex.: JSON) via schemas (Zod/ajv) antes de mapeá-los para componentes visuais determinísticos.
- C) Substituir o banco de dados principal pela memória de contexto do LLM.
- D) Confiar no texto gerado e exibi-lo via `[innerHTML]` sem validação.
- E) Usar a IA apenas para renderizar CSS.

**Resposta: B.** Isolar a IA das funções transacionais e validar o JSON com schemas antes de mapear para componentes determinísticos.

### Resolução comentada
LLM é probabilístico: o mesmo prompt pode dar respostas diferentes e pode errar. Dado financeiro não aceita "mais ou menos". Então a regra é: a IA nunca manda direto no que o usuário vê nem nas operações.

O desenho correto é em camadas. A IA devolve **dados estruturados** (JSON), um schema valida forma e tipos, e só então a tela determinística (componentes Angular conhecidos) mostra os valores. Se a validação falhar, o sistema trata o erro em vez de exibir lixo. Resposta B.

### Entenda os conceitos
- **Natureza probabilística / não determinismo:** o mesmo prompt pode produzir saídas diferentes. O guia mostra um caso real: a instrução "respeitar o idioma do input" falhou em parte no BragBot.
- **Schema e validação em tempo de execução:** o TypeScript só checa tipos na compilação; dados vindos de LLM não têm garantia. O Zod valida o contrato em runtime. No guia, o schema de saída faz o Genkit validar a resposta e lançar exceção se estiver inválida, devolvendo um objeto tipado ao flow.
- **ajv:** outra biblioteca de validação, de JSON Schema. A resolução a cita junto com o Zod; o guia só trata de Zod (complemento, fora do material).
- **Limite do schema:** o guia avisa que, mesmo validada, a saída continua probabilística: o schema garante forma, não verdade. Por isso o isolamento das funções transacionais também importa.
- **Componentes determinísticos:** componentes da UI que mostram dados já validados e não executam nada vindo do modelo. O guia reforça o desacoplamento entre estado, serviço e interface: a interface do BragBot quase não mudou ao passar do mock para a API real.
- **Micro-BFF e tratamento de erro:** a rota captura falhas do LLM (limites, exceções) e responde HTTP 500, como qualquer integração externa crítica.
- **`[innerHTML]` sem validação:** em Angular insere texto como HTML na página, o que abre risco de injeção de conteúdo (complemento, fora do material).

### Por que as outras erram
- **A:** não se treina modelo no front-end, e nenhum treino elimina erro. O guia diz que o schema garante forma, não verdade.
- **C:** o contexto do LLM é memória temporária e não é banco de dados: não tem persistência, transação nem integridade.
- **D:** exibir saída bruta de IA via `[innerHTML]` sem validar é o oposto do que se recomenda: mistura saída probabilística com conteúdo executável na tela.
- **E:** usar IA só para CSS não resolve o problema que a pergunta traz (exibir dados financeiros com segurança) e não é estratégia.

### Aprofundar no guia
- [14 · Flows, Zod e Google AI](./projeto-de-leitura/14-flows-zod-e-google-ai.md), seção "Tecnicamente > O que é" (itens "Zod", "Output schema") e "Vantagens e limites": validação de saída e o limite "forma, não verdade".
- [15 · Micro-BFF full-stack](./projeto-de-leitura/15-micro-bff-fullstack-e-engenheiro-ai-native.md), seção "Tecnicamente > O que é" (itens "A API é simples" e "Aprendizado sobre não determinismo"): rota que captura falhas e o não determinismo na prática.
- [02 · APIs de IA generativa, tópico 04 · Structured JSON](../02-apis-de-ia-generativa-e-prompt-engineering/projeto-de-leitura/04-structured-json-e-json-prompts.md), seção "Tecnicamente": schema como contrato com o modelo e validação do JSON.

*Código da questão: 168636*

---

## Pontos de atenção na prova

- **Q01:** o guia só menciona "pair programming" de passagem (tópico 10, item "Mensagem final"). A resposta vem da resolução da prova e do raciocínio sobre IDE com agente (tópico 03).
- **Q04:** o material não cobre "adoção de 5% para 80%", DevEx como política corporativa nem scaffolding como estratégia. Cobre Nx, MCP do Nx, Nx Cloud para CI/CD, a definição de DX e agentes com revisão humana. A resposta segue a resolução da prova.
- **Q05:** o guia não usa os termos "personalizadas, preditivas e contextuais". Segue a resolução da prova.
- **Q06:** o guia não menciona plugins de IA do Figma (renomear camadas, paletas, dados realistas). Cobre handoff do Figma por modelo multimodal e o Stitch. A resposta segue a resolução da prova.
- **Q07:** o guia cobre estados de carregamento, vazio e erro, mas não o "feedback de estado progressivo" nomeado. A resposta segue a resolução da prova.
- **Q08:** o guia não discute o GitHub Copilot (só o cita ao lado de Cursor e Windsurf). A vantagem vem da resolução da prova e da parte do guia sobre Nx e agentes.
- **Q09:** a resolução chama o GenKit de "framework"; o guia o define como "biblioteca" (não framework) para Node.js. Descrevem a mesma peça. A grafia da prova é "Firebase GenKit"; o guia usa "Genkit" (do Google).
- **Q10:** o guia só trata de Zod; ajv e a recomendação de evitar `[innerHTML]` vêm da resolução da prova.
- **Enunciados:** nenhuma questão tem alternativas duplicadas. Em Q01 e Q02 o texto original é uma pergunta direta; nas demais a frase de pergunta foi mantida como veio.

## Mapa de estudo desta disciplina

| Tema da prova | Tópico do guia que mais cobre |
|---------------|-------------------------------|
| Assistente na IDE, pair programming (Q01) | [03 · Ambiente AI-first: Angular, Antigravity e MCP](./projeto-de-leitura/03-ambiente-ai-native-angular-antigravity-mcp.md) |
| System Prompt e persona do BragBot (Q02) | [14 · Flows, Zod e Google AI](./projeto-de-leitura/14-flows-zod-e-google-ai.md) |
| Trace e Dev UI do GenKit (Q03) | [14 · Flows, Zod e Google AI](./projeto-de-leitura/14-flows-zod-e-google-ai.md) |
| DevEx, Nx, CI/CD e adoção (Q04) | [07 · Fundação enterprise: Nx, shared-types e MCP](./projeto-de-leitura/07-fundacao-enterprise-nx-monorepo-shared-types.md) |
| IA generativa na interface (Q05) | [13 · Genkit, setup seguro e interface mockada](./projeto-de-leitura/13-genkit-setup-seguro-e-interface-mockada.md) |
| Figma, handoff e plugins (Q06) | [05 · Stitch e Figma](./projeto-de-leitura/05-stitch-e-figma-da-referencia-visual-ao-componente.md) |
| Feedback de estado e estados de interface (Q07) | [00 · Refinamento de requisitos, edge cases e Mermaid](./projeto-de-leitura/00-refinamento-requisitos-edge-cases-mermaid.md) |
| Copilot e monorepo Nx (Q08) | [07 · Fundação enterprise: Nx, shared-types e MCP](./projeto-de-leitura/07-fundacao-enterprise-nx-monorepo-shared-types.md) |
| O que é o GenKit (Q09) | [13 · Genkit, setup seguro e interface mockada](./projeto-de-leitura/13-genkit-setup-seguro-e-interface-mockada.md) |
| Validação de saída do LLM com schemas (Q10) | [14 · Flows, Zod e Google AI](./projeto-de-leitura/14-flows-zod-e-google-ai.md) |
