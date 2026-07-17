# 08 · Ferramentas de IA para Dev — Cursor, Windsurf e Agentes

> **Módulo 7 da disciplina** · Leitura: ~10 min · Pré-requisito: doc [07](./07-prompt-engineering.md)

## 🎯 Em uma frase
Os editores de código viraram **cockpits de IA** (VS Code, Cursor, Windsurf), e dentro deles surgiram os **agentes de IA** — sistemas que usam uma LLM como *motor de decisão* acoplado a ferramentas e ciclos de execução, para não só *conversar*, mas *fazer* e *validar* tarefas.

---

## 👵 Explicando para a vovó

Antigamente, um editor de código era como uma **máquina de escrever**: só servia pra digitar. Hoje virou um **ambiente com um assistente embutido** que ajuda a escrever, revisar e até executar o trabalho.

E a diferença entre uma IA que só conversa e um **agente**? Pense assim: um **consultor** te dá conselhos ("você deveria trocar a torneira assim"), mas quem faz o serviço é você. Já um **faz-tudo (agente)** pega as ferramentas, troca a torneira, abre a água pra testar, vê que ainda pinga, aperta mais um pouco e só então te chama pra mostrar o serviço pronto. O agente **age, observa o resultado e corrige** antes de te entregar. É por isso que dá aquela sensação de que "acertou de primeira".

E numa obra grande, você não contrata um só faz-tudo — contrata **especialistas**: um que planeja, um que executa, um que fiscaliza, um que testa. Com agentes de IA é igual: cada um tem um papel.

---

## 🔧 Tecnicamente

### Os editores: VS Code, Cursor e Windsurf
O **VS Code** virou o padrão da indústria — o "Chrome dos editores" — pelo ecossistema maduro (extensões, temas, debugger, terminal, Git). Tanto o **Cursor** quanto o **Windsurf** são **forks do VS Code** que adicionam camadas de IA:

| Editor | Origem | Números |
|--------|--------|---------|
| **Cursor** | Empresa Hemisphere (2022), *AI-first* desde o início | US$ 2,3 bi captados; valuation ~US$ 29,3 bi |
| **Windsurf** | Equipe Codium (do plugin Codeium) | US$ 150 mi captados; valuation US$ 1,2 bi; OpenAI chegou a considerar comprar por US$ 3 bi |

Por que investimentos tão grandes? Porque atacam o **custo mais alto da indústria de software: o tempo de desenvolvimento.**

### Agentes nativos no VS Code
O chat com IA inclui modos nativos:
- **ASK** — perguntas rápidas e explicação de código.
- **EDIT** — modificações controladas com base em guias.
- **PLAN** — criação de um plano de implementação **antes** da execução.
- **AGENT** — após o plano aprovado, executa as tarefas com autonomia, iterando conforme o contexto e as ferramentas.

Há também **agentes customizáveis**: personas com tarefas repetitivas, modelos diferentes e **acesso restrito a ferramentas** — funcionam como sub-prompts pré-definidos com escopo limitado.

> ⚠️ **Lição do curso:** um app criado numa plataforma *Prompt-to-App* (tipo Lovable) apresentou falhas graves de segurança e validação, e precisou ser migrado para o VS Code e reescrito com boas práticas. Editores com IA integrada dão **controle, revisão, testes e auditoria** — o que plataformas "mágicas" não garantem.

---

### O que são agentes de IA (Cap. 2)

**A limitação das LLMs isoladas:** elas são excelentes em prever o próximo token, mas **não sabem executar comandos, abrir arquivos, rodar testes ou validar os próprios resultados**. O agente resolve isso: usa a LLM como **motor de decisão**, acoplada a **ferramentas** e a ciclos de **execução e observação**.

**O ciclo de um agente:**
1. Entendimento do objetivo
2. Planejamento da execução
3. Seleção de ferramentas
4. Ação
5. Observação do resultado
6. Correção de erros
7. Entrega final com evidências

> Esse ciclo garante que a tarefa não seja apenas *imaginada*, mas **executada e validada**. Cada passo é conferido antes do próximo — o que evita loops infinitos e desperdício de tokens.

**Escolha inteligente de ferramentas** (o mesmo raciocínio de um dev experiente):
| Necessidade | Ferramenta |
|-------------|-----------|
| Ler código | Leitor de arquivos |
| Validar comportamento | Teste automatizado |
| Garantir estilo | Linter/formatador |
| Buscar API | Swagger/documentação |
| Ver banco de dados | Cliente SQL |

**Papéis especializados:** agentes podem ser divididos em responsabilidades — **Planner** (cria o plano), **Implementer** (escreve/edita código), **Reviewer** (analisa diffs e aponta riscos), **QA** (valida fluxo fim a fim), **Docs Agent** (README/changelog), **Ops Agent** (monitora e sugere mitigações). Isso permite **controle fino de permissões** e reduz riscos.

**Spec Driven Development (para evitar alucinação):** agentes falham quando a tarefa está mal definida — buracos no prompt são preenchidos com "chutes". Uma boa *spec* inclui:
- **Contexto** (stack, ambiente, dependências)
- **Requisitos** (o que deve existir)
- **Não-requisitos** (o que evitar)
- **Critérios de aceite** (como saber que está pronto)
- **Contrato** (formato da API, shape da resposta)
- **Plano de testes** (como validar)

> 🔑 O segredo de agentes que funcionam de verdade continua sendo **engenharia de prompt** (doc [07](./07-prompt-engineering.md)). Agentes não são "LLMs com plugins" — são sistemas completos com controle de execução, planejamento e validação.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| **Fork do VS Code** | Editor derivado do VS Code (Cursor, Windsurf) |
| **ASK / EDIT / PLAN / AGENT** | Modos de interação com IA no VS Code |
| **Agente de IA** | LLM como motor de decisão + ferramentas + ciclo de execução |
| **Ciclo do agente** | Entender → planejar → agir → observar → corrigir → entregar |
| **Papéis** | Planner, Implementer, Reviewer, QA, Docs, Ops |
| **Spec Driven Development** | Definir a tarefa com precisão antes de executar |

---

## 💻 No curso
- Comparação prática entre VS Code, Cursor e Windsurf no dia a dia.
- Uso dos modos ASK/EDIT/PLAN/AGENT e criação de agentes customizados com escopo restrito.
- Caso real do app *Prompt-to-App* reescrito no VS Code com boas práticas de segurança e teste.

---

## 🔗 Para ir além
- Latent Space sobre o Cursor — https://www.latent.space/p/cursor
- Custom agents no VS Code — https://code.visualstudio.com/docs/copilot/customization/custom-agents
- Spec-driven development (Spec Kit, Microsoft) — https://developer.microsoft.com/blog/spec-driven-development-spec-kit
- Git worktrees (paralelizar agentes) — https://www.marcohaber.dev/blog/git-worktrees
