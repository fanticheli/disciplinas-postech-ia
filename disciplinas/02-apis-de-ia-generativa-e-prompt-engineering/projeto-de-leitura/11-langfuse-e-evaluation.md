# 11 · Monitoramento com Langfuse e evaluation tests

> **Unidade 7 · Aula 2** · Leitura: ~9 min · Bloco: RAG, Multimodal e Observabilidade

## 🎯 Em uma frase
Sistemas com LLM precisam de **observabilidade própria** (tokens, custo por usuário, latência, tracing de tool calls) e de **evaluation**: como LLM não é determinístico, em vez de `assert` rígido você mede qualidade com **score e threshold** e leva isso ao CI/CD.

---

## 👵 Explicando para a vovó

Dirigir sem painel é achar que o carro está bem porque ainda anda. O Langfuse é o painel: mostra velocidade (latência), combustível (tokens e custo) e qual viagem gastou mais.

E a prova de motorista não pergunta se a resposta saiu com as mesmas palavras, e sim se ele dirigiu bem. Evaluation é essa nota.

---

## 🔧 Tecnicamente

### O que é
- **Por que monitorar:** saber quando o custo por token mudou, quando um cliente disparou requisições em loop e está queimando crédito, quando a latência subiu, quando uma operação começou a falhar ou a consumir token demais. É requisito, não nice to have.
- **Duas abordagens:** delegar ao provedor (OpenRouter, OpenAI, Anthropic: limites, alertas e consumo por chave), que enxerga o gasto mas não qual rota, usuário, prompt, função ou tool o gerou; ou ter infraestrutura própria de observabilidade com alertas sob medida (por exemplo 50% do orçamento diário, limite de tokens por minuto por usuário, taxa de erro, tempo de resposta).
- **Langfuse:** observabilidade para apps com LLM, open source (adquirido recentemente pela ClickHouse) e usável sem custo, self-hosted. Mostra entrada e saída, latência ponta a ponta, tokens por usuário, rastreamento de cada operação e tracing completo, com function calls e tools.
- **Evaluation:** pontuar qualidade em vez de comparar texto exato: atende critérios mínimos do prompt, está correta em relação ao contexto, não vazou informação, é clara, respeitou o formato, manteve idioma e tom.

### Como funciona
- Contexto: no primeiro módulo o autor mostrou um MCP consultando Grafana e Prometheus para achar problemas de performance. Aqui o passo é instrumentar a própria aplicação de IA.
- Integração: o Langfuse trabalha com **OpenTelemetry**. Quem já tem o OpenTelemetry Collector no Docker (portas típicas 4317 e 4318, como no projeto de monitoramento do primeiro módulo) pode instrumentar a aplicação com o SDK do Langfuse (JavaScript e Python), variáveis de ambiente e a instrumentação do Node SDK, e passar a ver as chamadas ao LLM como parte do tracing, não como caixa preta.
- **Prompt Management:** gerenciar prompts fora do código, versionar, comparar variações e buscar a versão atualizada com cache, sem redeploy a cada ajuste. Prompt vira engenharia contínua: ajusta, mede custo, latência e qualidade, compara versões.
- Escolher o modelo mais barato só faz sentido com dados: correlacione custo, qualidade e tempo de resposta (a escolha via OpenRouter se apoia nisso) e detecte cedo se o barato ficou caro ou lento.
- Testes tradicionais servem para sistema determinístico. Nos projetos anteriores a estrutura (JSON, chaves, enums, campos obrigatórios) deu estabilidade, mas respostas analíticas, humanizadas e recomendações variam naturalmente: aí entra evaluation.
- Score e threshold no CI/CD: se alguém altera um prompt e a qualidade medida cai, detecta-se antes da produção; se melhora, há evidência objetiva do ganho. Conceitos de apoio na indicação de leitura 3: dataset, target function e evaluators, com LangSmith e integração a Vitest ou Jest.

### Onde aplicar
- Controle de custo por usuário, alertas de orçamento e detecção de loops de requisições.
- Comparar versões de prompt e modelos com dados de custo, latência e qualidade.
- Evitar regressão: avaliar prompts no pipeline antes de ir para produção.

### Vantagens e limites
**Vantagens**
- Tira do achismo: você enxerga o que o fluxo realmente fez.
- Funciona com a infraestrutura de OpenTelemetry que você já pode ter, sem serviço externo obrigatório.
- Qualidade passa a ser mensurável e comparável entre versões.

**Limites**
- Mais infraestrutura e instrumentação para operar.
- Definir bons avaliadores, scores e thresholds dá trabalho e depende do domínio.
- A aula apresenta o tema como direção; não é para virar especialista em monitoramento agora.

### 🚫 Armadilhas
- Contar só com o painel do provedor: você vê o gasto, não a rota, o usuário nem o prompt.
- Validar texto de LLM com assert exato e ter testes quebrando o tempo todo.
- Alterar prompt sem medir impacto em custo, latência e qualidade.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Langfuse | Observabilidade open source para aplicações com LLM |
| OpenTelemetry | Padrão de telemetria que o Langfuse usa para coletar traces |
| Tracing | Rastro completo de cada operação, incluindo tool calls |
| Prompt Management | Versionar e buscar prompts fora do código |
| Evaluation | Pontuar a qualidade da resposta em vez de exigir texto idêntico |
| Score e threshold | Nota e limite mínimo aceito, bom gate de CI/CD |
| Dataset, target function, evaluators | Conceitos de avaliação citados na indicação de leitura 3 |

---

## 💻 No código do repo

O repositório do módulo não traz projeto de Langfuse nem de evaluation. O `07-doc-analysis` ([tópico 10](./10-modelos-multimodais.md)) é só o exemplo multimodal.

---

## 🔗 Para ir além
- [LangChain Docs: avaliação de agentes (indicação de leitura 3)](https://docs.langchain.com/oss/javascript/langchain/evals)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms)

---

⬅️ [10 · Modelos multimodais: documentos, áudio e real-time](./10-modelos-multimodais.md)  ·  [12 · Live NetFibra: suporte com LangGraph, GraphRAG em memória e human-in-the-loop](./12-live-netfibra-langgraph-graphrag-hitl.md) ➡️
