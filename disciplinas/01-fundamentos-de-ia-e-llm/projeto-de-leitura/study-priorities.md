# 🎯 Disciplina 01 · O que vale estudar

> Análise de prioridade (opinião fundamentada no guia e na prática atual), não conteúdo da apostila. Premissas: leitor é engenheiro de software backend (TypeScript/Node e Python; APIs e serviços em nuvem na AWS, Postgres, filas e jobs; produto com LLMs em produção; automação de fluxos como Jira/Slack; uso intenso de agentes de código no desenvolvimento). O objetivo é virar engenheiro de IA aplicada especialista (construir, avaliar, operar e governar sistemas com LLMs em produção), não pesquisador de modelos.

## Veredito
O maior valor está no último terço da disciplina: como LLMs funcionam na prática (tokens, sampling, alucinação), prompt estruturado com saída validada, agentes com spec, MCP e RAG. O começo (redes neurais do zero, recomendação, YOLO, algoritmos genéticos) é cultura geral com pouco retorno para o seu dia a dia.
Nota ⭐⭐⭐ (3 de 5): metade do conteúdo é didática em TensorFlow.js que você dificilmente usará, mas a outra metade é a base certa para o que vem depois. Mais útil para quem vem de backend e ainda não tem o vocabulário de LLM, RAG e agentes bem assentado.

## Mapa de prioridade por tópico

| Tópico | Dia a dia | Especialista | Veredito |
|---|---|---|---|
| [00 · Introdução ao curso](./00-introducao-ao-curso.md) | ⚪ | ⚪ | Pular |
| [01 · ML, DL e IA, redes neurais](./01-ml-dl-ia-redes-neurais.md) | ⚪ | 🟡 | Conhecer |
| [02 · Sistemas de recomendação](./02-sistemas-de-recomendacao.md) | ⚪ | 🟡 | Conhecer |
| [03 · Visão computacional, YOLO](./03-visao-computacional-yolo.md) | ⚪ | ⚪ | Pular |
| [04 · Algoritmos genéticos e reforço](./04-algoritmos-geneticos-e-reforco.md) | ⚪ | ⚪ | Pular |
| [05 · Como funcionam LLMs](./05-como-funcionam-llms.md) | 🟢 | 🟢 | Aprofundar |
| [06 · Web AI e multimodal](./06-web-ai-e-multimodal.md) | ⚪ | 🟡 | Conhecer |
| [07 · Prompt engineering (JSON e TOON)](./07-prompt-engineering.md) | 🟢 | 🟢 | Implementar |
| [08 · Ferramentas dev e agentes](./08-ferramentas-dev-e-agentes.md) | 🟢 | 🟢 | Implementar |
| [09 · MCP e automação](./09-mcp-e-automacao.md) | 🟢 | 🟢 | Implementar |
| [10 · Modelos open vs. fechados](./10-modelos-open-vs-fechados.md) | 🟡 | 🟡 | Conhecer |
| [11 · RAG, embeddings e busca semântica](./11-rag-embeddings-busca-semantica.md) | 🟢 | 🟢 | Aprofundar |

## ✅ Implemente no dia a dia

1. **Saída de LLM validada por schema, com re-prompt limitado**
   - Por que vale: o guia recomenda começar com JSON bem estruturado e schema de validação, e isso resolve a maior parte dos problemas de integração. Na prática, o que a comunidade faz: tratar a saída do modelo como input não confiável.
   - Primeiro passo mínimo: em uma chamada de LLM do seu serviço, definir um schema Zod (TS) ou Pydantic (Python), validar a resposta e, se falhar, repetir no máximo 1 vez com o erro no prompt. Logar a falha em JSON.
   - Quando não adotar: saída de texto livre para humano ler, sem consumo programático.
   - Tópico: [07 · Prompt engineering](./07-prompt-engineering.md)

2. **Prompt em blocos com "fonte da verdade" e permissão para dizer "não sei"**
   - Por que vale: o guia mostra que alucinação vem de contexto ausente ou ambíguo. Separar papel, dados de referência, regras, formato e restrições é barato e testável.
   - Primeiro passo mínimo: reescrever um prompt real do produto em 5 blocos (papel, dados, regras, pedido, formato) e versioná-lo como arquivo no repo, não como string solta no código.
   - Quando não adotar: não monte os 10 blocos por cerimônia. Use só os que mudam o resultado no seu caso. Minha análise: TOON só entra se medir ganho real de tokens (o próprio guia mostra que JSON tabular pode empatar ou ganhar).
   - Tópico: [07 · Prompt engineering](./07-prompt-engineering.md)

3. **Agente de código com spec curta e escopo restrito**
   - Por que vale: você já usa agentes de código. O guia dá o método: contexto, requisitos, não-requisitos, critérios de aceite, contrato e plano de testes. Agente sem escopo é risco real (o guia cita o caso do banco de produção apagado).
   - Primeiro passo mínimo: antes da próxima tarefa, escrever uma spec de 6 linhas com esses campos e pedir o plano ao agente antes de executar. Rodar a suíte de testes como critério de pronto.
   - Quando não adotar: tarefa trivial de uma linha; a spec custa mais que a correção.
   - Tópico: [08 · Ferramentas dev e agentes](./08-ferramentas-dev-e-agentes.md)

4. **MCP com mínimo privilégio, começando por leitura**
   - Por que vale: o MCP deixa o agente consultar documentação atual, navegador e telemetria. O guia mostra que a LLM escolhe a tool pela descrição, então nome claro e JSON Schema bem definido importam.
   - Primeiro passo mínimo: plugar um MCP de documentação de bibliotecas e um MCP de leitura da sua observabilidade; fixar a versão do servidor (confira a versão atual); não colocar token no repo.
   - Quando não adotar: MCP com escrita em produção (banco, deploy) sem confirmação humana. O guia reforça: o fluxo de formulário para antes da ação irreversível.
   - Tópico: [09 · MCP e automação](./09-mcp-e-automacao.md)

5. **Contagem de tokens e parâmetros de sampling como decisão de projeto**
   - Por que vale: custo, latência e limite de contexto são medidos em tokens, e o contexto conta prompt e resposta juntos. Temperature baixa dá saídas mais estáveis para extração e classificação.
   - Primeiro passo mínimo: logar tokens de entrada e saída por chamada (as APIs devolvem `usage`, como mostra o guia no Ollama e no OpenRouter) e fixar temperature explícita por caso de uso.
   - Quando não adotar: não otimize token antes de ter métrica; sem número, é palpite.
   - Tópico: [05 · Como funcionam LLMs](./05-como-funcionam-llms.md)

## 🔬 Aprofunde (rumo a especialista)

1. **RAG de ponta a ponta com avaliação**
   - Por que diferencia: o guia entrega o pipeline (chunking, embedding, busca, injeção no prompt), mas admite que não há avaliação automática. Especialista mede recuperação e fidelidade, não só "parece certo".
   - Estudar além da aula: o paper original de RAG (link no guia: https://arxiv.org/pdf/2005.11401); documentação oficial do pgvector e de busca híbrida (texto + vetor) no Postgres, pelo nome.
   - Como praticar: montar um conjunto de 20 perguntas com a resposta e o trecho-fonte esperados; medir quantas vezes o trecho certo aparece no top 3. Variar `chunkSize` e `topK` e comparar.
   - Tópico: [11 · RAG, embeddings e busca semântica](./11-rag-embeddings-busca-semantica.md)

2. **Falhas silenciosas do RAG e governança do contexto**
   - Por que diferencia: o guia aponta que o filtro de score pode zerar o contexto sem gerar erro e o LLM responde mesmo assim, e que "use APENAS o contexto" é só instrução, nada valida. Esse tipo de lacuna é o dia a dia de operar LLM.
   - Estudar além da aula: artigo "Effective context engineering" (link no tópico 07 do guia: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents).
   - Como praticar: fazer uma pergunta fora da base e exigir que o sistema responda "não sei" com teste automatizado; preservar metadata para citar a fonte e a página.
   - Tópico: [11 · RAG, embeddings e busca semântica](./11-rag-embeddings-busca-semantica.md)

3. **Como o modelo decide: tokenização, attention e sampling**
   - Por que diferencia: entender por que a resposta varia, por que contexto longo custa mais e por que o modelo "chuta" ajuda a depurar comportamento em vez de tentar prompts às cegas.
   - Estudar além da aula: Hugging Face LLM Course (indicado no README do guia); o tokenizer da OpenAI (https://platform.openai.com/tokenizer).
   - Como praticar: contar tokens de um prompt real em português e em inglês e comparar; rodar a mesma pergunta 10 vezes com temperature 0 e com 1 e medir a variação.
   - Tópico: [05 · Como funcionam LLMs](./05-como-funcionam-llms.md)

4. **Agentes: ciclo, papéis e limites de permissão**
   - Por que diferencia: construir agentes confiáveis é controle de execução, validação e escopo de tools, não "LLM com plugins". O guia lista o ciclo (planejar, agir, observar, corrigir) e papéis como planner e reviewer.
   - Estudar além da aula: documentação oficial do protocolo MCP (https://modelcontextprotocol.io/) e o guia de custom agents do VS Code, listado no tópico 08.
   - Como praticar: criar um servidor MCP pequeno com 2 tools de leitura sobre uma API sua, com JSON Schema estrito, e verificar que uma chamada com parâmetro inválido falha de forma explícita.
   - Tópicos: [08 · Ferramentas de IA para dev e agentes](./08-ferramentas-dev-e-agentes.md) (ciclo e papéis), [09 · MCP e automação](./09-mcp-e-automacao.md) (MCP)

5. **Observabilidade como método de investigação (métrica, log, trace)**
   - Por que diferencia: o caso do Grafana MCP é bom como template de incidente (métrica, log, trace, causa raiz) e mostra o valor de OpenTelemetry, padrão de observabilidade. Para LLMs em produção, rastrear prompt, tokens e latência é a base de operação.
   - Estudar além da aula: documentação oficial do OpenTelemetry, pelo nome.
   - Como praticar: instrumentar uma chamada de LLM do seu backend como span, com atributos de modelo e tokens, e achar uma chamada lenta pelo trace.
   - Tópico: [09 · MCP e automação](./09-mcp-e-automacao.md)

## 🧂 Pode ficar no superficial

- **Redes neurais do zero, recomendação com TensorFlow.js, YOLO e algoritmos genéticos (tópicos 01 a 04):** boa cultura para saber o que é ML, tensor e treino, mas você consome modelos prontos por API. Minha análise: leia a "Em uma frase" e a cola rápida de cada um e siga. A exceção é a ideia de busca por similaridade vetorial em recomendação, que reaparece em RAG. Valor residual (tópico 02, seção "Predição e escalabilidade"): o par todos-com-todos não escala, e a solução é um banco vetorial com top-N, o que conecta direto com RAG.
- **Web AI no navegador (tópico 06):** depende de flags e de APIs do Chrome que, segundo o próprio guia, já mudaram de nome (`window.ai` para `LanguageModel`). Para backend, pouco aplicável (confira a versão atual se um dia precisar). Valor residual (tópico 06, exemplo-04): os sliders de temperature e topK só valem na criação da sessão, o que reforça o tópico 05.
- **Comparação entre editores e valuation de empresas (tópico 08):** números de captação e valuation são da apostila e envelhecem rápido. Fique com os modos ASK/EDIT/PLAN/AGENT e com o método de spec, que são estáveis.
- **TOON (tópico 07):** conhecer a ideia de formato compacto basta. O guia mesmo recomenda JSON primeiro.
- **Introdução ao curso (tópico 00):** é posicionamento e método de estudo; nada técnico a implementar.

## ⚠️ Cuidados e lacunas

- **Stack do curso é JavaScript no navegador e Neo4j:** na prática, o que a comunidade faz em backend é Python ou TS no servidor, com Postgres e extensão vetorial como primeira opção por reduzir infraestrutura. Neo4j funciona como banco vetorial, mas é uma peça a mais para operar. Trate os exemplos como didáticos.
- **Exemplos não são código de produção:** o guia lista falhas nos exemplos de RAG (deleção sem `await`, chave de API ausente dando 401, metadata descartado, `console.log` no lugar de log estruturado, embedding pequeno e focado em inglês para PDF em português). Use-os para entender o fluxo, não como base.
- **Ollama não é para produção, segundo o guia:** executa um prompt por vez; para concorrência o guia aponta vLLM. Modelos abertos servem para privacidade e prototipagem, com custo de infraestrutura e manutenção.
- **OpenRouter e modelos `:free`:** o guia alerta para limite de taxa, modelos que somem, contador de tokens pouco confiável e um intermediário a mais com dados passando por terceiro. Antes de usar em produção, revise política de dados do provedor.
- **Lacunas que a disciplina não cobre:** avaliação sistemática de LLM, custo e cache de prompt, segurança contra prompt injection em tools e RAG, e fine-tuning além da comparação conceitual. Minha análise: esses são os temas que mais pesam em operar e governar, então planeje estudá-los fora da aula (confira a versão atual de cada ferramenta).

## ✔️ Como saber que aprendeu

1. Consigo explicar, sem consultar, por que a mesma pergunta varia entre execuções (sampling, temperature) e por que contexto longo custa mais, e mostro a contagem de tokens de um prompt real.
2. Meu serviço tem pelo menos uma chamada de LLM com saída validada por schema, re-prompt limitado e log estruturado de tokens e falhas, verificável em teste automatizado.
3. Tenho um RAG pequeno com conjunto de perguntas esperado e uma métrica de recuperação medida, e ele responde "não sei" a uma pergunta fora da base, comprovado por teste.

Veja também a [trilha consolidada](../../study-roadmap.md).
