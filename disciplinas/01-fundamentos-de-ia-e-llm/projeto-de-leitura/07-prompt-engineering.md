# 07 · Prompt Engineering — e os padrões JSON e TOON

> **Módulo 6 da disciplina (Caps. 1 e 2)** · Leitura: ~11 min · Pré-requisito: doc [05](./05-como-funcionam-llms.md)

## 🎯 Em uma frase
**Prompt Engineering** é a arte de escrever instruções tão claras e estruturadas que a IA para de "adivinhar" o que você quer — reduzindo alucinações e retrabalho. E como LLMs gostam de dados estruturados, os formatos **JSON** e **TOON** deixam esses prompts ainda mais precisos e baratos.

---

## 👵 Explicando para a vovó

Imagine que a senhora contratou um funcionário novo, muito esforçado, mas que **leva tudo ao pé da letra** e nunca pergunta nada — se ficar em dúvida, ele **inventa**. Se a senhora manda "faz um bolo", ele pode fazer de qualquer sabor, tamanho e recheio, porque a senhora não disse. O resultado sai errado e a senhora precisa repetir tudo.

Prompt Engineering é aprender a **dar a instrução completa de uma vez**: "faça um bolo de fubá, para 8 pessoas, sem açúcar, e se faltar algum ingrediente, me avise em vez de improvisar". Quanto mais claro o pedido — com o papel dele, exemplos, regras e o que fazer quando faltar informação — melhor sai o bolo, sem idas e vindas.

E os formatos **JSON e TOON**? São como usar um **formulário com campos separados** ("Sabor: ___ / Porções: ___ / Restrições: ___") em vez de um bilhete corrido. Fica impossível confundir o que é o quê. O TOON é a versão enxuta do formulário, que gasta menos papel (tokens).

---

## 🔧 Tecnicamente

### Por que a IA alucina
A IA **não é determinística**: ela prevê a próxima palavra mais provável com base no contexto recebido. Quando o prompt está mal formulado, o modelo **tenta adivinhar** o que você quer — e aí surgem as **alucinações**: ele inventa dados, mistura contextos ou responde com muita segurança mesmo sem informação suficiente.

> Exemplo: ao perguntar *"Quem é Eric Wendel?"*, a IA pode misturar dados verdadeiros com falsos (ex.: dizer que ele é autor de livros de Java, o que não é verdade).

### A estrutura de prompt em 10 blocos (inspirada em estudo da Anthropic)
Um framework para guiar o modelo com clareza:

| # | Bloco | O que colocar |
|---|-------|---------------|
| 1 | **Contexto da tarefa** | O papel da IA. *"Você é Joe, um coach de carreira especializado em transição para tecnologia."* |
| 2 | **Tom de voz** | Formal? Empático? Didático? |
| 3 | **Fonte da verdade** | Documentos, regras, tabelas de referência — evita a IA se basear em dados genéricos da internet |
| 4 | **Contrato operacional** | Regras de comportamento: *"Se não tiver certeza, diga que não sabe. Se faltar dado, solicite."* |
| 5 | **Exemplos** | Padrões de entrada/saída — ancora o formato esperado |
| 6 | **Histórico do usuário** | O que já foi dito, para manter consistência |
| 7 | **Pedido claro** | A tarefa objetiva (não confunda contexto com demanda) |
| 8 | **Incentivo ao raciocínio** | Pedir para validar/revisar antes de responder, em tarefas complexas |
| 9 | **Formato da resposta** | JSON, texto corrido, tabela? |
| 10 | **Restrições e validação** | Limites de caracteres, idioma, campos obrigatórios, o que fazer quando faltar dado |

### Checklist anti-alucinação
- Sempre inclua o **papel** da IA.
- Forneça **documentos ou dados reais**, mesmo em texto simples.
- Peça para a IA **não inventar** — e dizer quando não tem informação.
- Oriente o modelo a **fazer perguntas** quando o pedido for incompleto.
- Em ambiguidades, oriente a **listar opções e pedir uma escolha**.

> 💡 **Ruim:** *"Crie um plano de carreira pra mim"* (o modelo não sabe sua área, nível nem objetivos → alucina). **Bom:** *"Você é um consultor de carreira. Meu objetivo é migrar para backend em Java. Tenho experiência com banco de dados e sou formado em engenharia. Crie um plano para três anos com foco em empresas de tecnologia."*

---

### Padrões JSON e TOON para prompts (Cap. 2)

**LLMs gostam de dados estruturados.** Apesar da impressão de "conversar com um humano", o modelo é um algoritmo que prevê tokens a partir da entrada textual — quanto mais estruturada a entrada, melhor a resposta.

#### JSON Prompt
Familiar, previsível e integrável com ferramentas que devs já usam (**Zod, Ajv, Yup**). Estrutura sugerida:

```
meta:        nome, versão, idioma, papel da IA
context:     dados de referência / informações base
task:        a tarefa desejada
constraints: regras e limites
output:      formato esperado de resposta
```

**Vantagens:** reduz ambiguidade (campos separados), previsibilidade de integração (validar saídas, gerar re-prompts), padronização para times/pipelines, e **redução indireta de tokens** (a padronização evita retrabalho, mesmo que o JSON puro gaste mais tokens pela sintaxe).

#### TOON (Token Oriented Object Notation)
Versão **compacta** para economizar tokens: remove aspas, chaves e símbolos, deixando só a estrutura essencial.

| Formato | Tokens (lista de 6 itens) |
|---------|---------------------------|
| JSON | 367 |
| TOON | 339 |

Com listas maiores, o ganho cresce (a apostila cita diferenças de mais de 140 tokens por prompt). **Porém:** um JSON **bem modelado** — especialmente para dados **tabulares** (array de colunas e linhas) — pode ser tão ou mais eficiente que o TOON, mantendo toda a vantagem do ecossistema (validação, parsing, logging). No exemplo da aula, o JSON tabular gastou **26 tokens** contra **35** do TOON equivalente.

**Exemplo ilustrativo de JSON Prompt (não é da apostila):**

```json
{
  "meta": { "role": "consultor de carreira", "lang": "pt-BR" },
  "context": { "profile": "backend, 5 anos de banco de dados" },
  "task": "plano de 3 anos",
  "constraints": ["se faltar dado, pergunte"],
  "output": { "format": "json", "fields": ["fase", "meta", "risco"] }
}
```

**Custos do TOON:** exige aprender um formato novo, não é suportado por ferramentas comuns e pode complicar a integração.

#### Quando usar cada um
| JSON Prompt | TOON |
|-------------|------|
| Integrar com APIs | Prioridade é máxima economia de tokens |
| Validar saída com schemas | Estrutura simples e bem controlada |
| Manter compatibilidade com ferramentas | Pipelines onde parsing customizado é aceitável |

> 🔎 **Onde isso aparece no código do repo:** `exemplo-08/prompt.md` (seções de contexto, tom, dados, tarefa, passo a passo e formato de saída, doc [09](./09-mcp-e-automacao.md)), `exemplo-13/prompts/template.txt` (role, task, tone, language, format e instruções, doc [11](./11-rag-embeddings-busca-semantica.md)) e `exemplo-06/prompts/generate_test.prompt.md`.

> **Recomendação do curso:** **comece com JSON** bem estruturado + esquemas de validação. Isso já resolve a maior parte dos problemas de integração com LLMs. TOON fica para cenários específicos onde economia de tokens é essencial.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| **Alucinação** | IA inventa dado convincente por falta de contexto/clareza |
| **Papel (role)** | Persona atribuída à IA no prompt |
| **Fonte da verdade** | Dados de referência que ancoram a resposta |
| **Contrato operacional** | Regras de comportamento ("não sei" é permitido) |
| **JSON Prompt** | Prompt estruturado em campos (meta/context/task/...) |
| **TOON** | Notação compacta que economiza tokens |
| **Zod / Ajv / Yup** | Bibliotecas de validação de schema |

---

## 💻 No curso
- Estrutura de 10 blocos aplicada na prática para transformar prompts vagos em instruções precisas.
- Comparação real de consumo de tokens entre JSON e TOON usando o playground.
- Uso de esquemas de validação (Zod) para tornar saídas de LLM previsíveis e reprocessáveis.

---

## 🔗 Para ir além
- Guia oficial de Prompt Engineering (OpenAI) — https://platform.openai.com/docs/guides/prompt-engineering
- Effective context engineering (Anthropic) — https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Claude 4 best practices — https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices
- TOON (formato) — https://github.com/toon-format/toon
- TOON vs JSON para LLMs — https://medium.com/data-science-in-your-pocket/toon-bye-bye-json-for-llms-91e4fe521b14
- Tokenizer da OpenAI — https://platform.openai.com/tokenizer
- Prompting e debugging (Lovable) — https://docs.lovable.dev/prompting/prompting-debugging
- Playground do TOON — https://toontools.vercel.app/playground
