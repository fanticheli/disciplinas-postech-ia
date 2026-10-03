# 09 · Roteamento, cache semântico, prompt cache e response streaming

> **Módulo 4 · Aulas 2 e 3** · Leitura: ~13 min · Bloco: Padrões de Design AI-Específicos

## 🎯 Em uma frase
Dois roteadores resolvem problemas diferentes: o **Intent-Based Routing** decide *para onde* a requisição vai e o **Model Router** decide *qual modelo* processa. Depois, três padrões atacam desperdício e espera: o **Semantic Cache** pula a chamada ao modelo para perguntas equivalentes, o **Prompt Cache** evita reprocessar contexto repetido e o **Response Streaming** não economiza nada, só reduz a **latência percebida**.

---

## 👵 Explicando para a vovó

Na portaria de um prédio comercial, primeiro o porteiro pergunta 'para qual andar?' (intenção) e só depois decide se manda você com o elevador comum ou com a recepcionista sênior (modelo). Se a pergunta for 'que horas fecha?', ele já tem a resposta anotada num papel e nem sobe ninguém (cache semântico, mesmo que você pergunte 'até que horas funciona?').

O prompt cache é o malote já aberto sobre a mesa: perguntas diferentes sobre o mesmo documento não o abrem de novo. E o streaming é o garçom que traz o pão enquanto o prato não fica pronto: o jantar demora o mesmo, mas ninguém fica olhando a mesa vazia.

---

## 🔧 Tecnicamente

### O que é
- **O problema do roteamento:** com vários modelos de capacidades, velocidades e custos diferentes, o impulso é usar sempre o mais poderoso: uma escolha por omissão. O custo cresce com o volume, não com a complexidade da tarefa.
- **Model Router:** decide qual modelo processa a tarefa *antes* da inferência principal, classificando a complexidade: simples vai para modelo menor, mais rápido e barato; raciocínio elaborado vai para o mais sofisticado. Não responde ao usuário, apenas escolhe. É contínuo: cada requisição é reclassificada. Também reduz latência em tarefa simples.
- **Evidências:** RouteLLM (Berkeley, Anyscale e Canva, ICLR 2025): segundo os slides, 95% da performance do GPT-4 usando esse modelo em só 26% das chamadas. O GPT-5 (OpenAI, agosto de 2025) é descrito como um modelo rápido (gpt-5-main), um de raciocínio profundo (gpt-5-thinking) e um roteador retreinado com sinais de uso real; os slides lembram que o lançamento também mostrou o risco: usuários reclamaram de respostas mais rasas e houve ajuste público no roteamento.
- **Como construir:** não exige outro modelo sofisticado: regras determinísticas (tamanho da entrada, tipo da operação, palavras-chave), um modelo pequeno e barato que compara com exemplos conhecidos, ou um roteador treinado. Regras simples costumam capturar boa parte do ganho. O classificador não precisa ser perfeito: o erro perigoso é mandar tarefa complexa a modelo incapaz, então o limiar é conservador e varia por categoria.
- **Intent-Based Routing:** responde 'para onde esta requisição deve seguir?': gerar documento, consulta regulatória, classificação, busca na base, operação administrativa. No Trial Forge acontece logo após a entrada (protocolo, TCLE, CSR ou outro fluxo) e só depois entra o Model Router. Os dois atuam em momentos diferentes; modularidade permite evoluir cada um. Exemplo de mercado nos slides: Zendesk Intelligent Triage.
- **Semantic Cache:** a pergunta vira embedding, é comparada às já respondidas e, se a similaridade passa de um **limiar**, devolve a resposta guardada, sem chamar o modelo. Compara significado, não texto ('Quais são os critérios de inclusão?' e 'Quem pode participar?').
- **Limiar e isolamento:** permissivo demais responde errado com confiança; conservador demais nunca acerta. Não existe valor universal: calibração contínua por domínio e risco. O cache **nunca** deve cruzar tenants (estudos ou clientes): uma resposta de um estudo vazando para outro é falha de confidencialidade, não só de correção.
- **Números citados:** GPTCache (Fu Bang/Zilliz, NLP-OSS 2023): 2 a 10 vezes mais rápido quando acerta; Walmart Global Tech: cerca de 50% de acerto em consultas de cauda longa (a equipe esperava 10 a 20%); benchmark AWS ElastiCache com 63.796 perguntas reais: no limiar 0,75, acerto de 90,3%, precisão de 91,2%, até 86% menos custo e 88% menos latência; com limiar 0,50 a precisão cai para 87,5% e com 0,99 o acerto cai para 23,5%.
- **Prompt Cache:** reutiliza o *contexto já processado* (documento longo, system prompt, definições de ferramentas) em perguntas diferentes: a chamada continua, só não se recomputa a parte repetida. Anthropic (agosto de 2024): até 90% menos custo e 85% menos latência em prompts longos; OpenAI (outubro de 2024): caching automático a partir de 1024 tokens, 50% de desconto nos tokens em cache; paper Prompt Cache (Yale e Google, MLSys 2024): reuso por segmento do prompt, com tempo até o primeiro token 8 a 60 vezes menor.
- **Semantic Cache versus Prompt Cache:** o primeiro pergunta 'essa pergunta já foi respondida?' e pula o modelo; o segundo, 'esse contexto já foi processado?' e o modelo ainda responde. Atuam em camadas diferentes e podem coexistir.
- **Response Streaming:** não reduz tempo total nem tokens; reduz a **percepção** de espera. Os limiares de Nielsen (1993): até 0,1 s parece instantâneo, até 1 s mantém o fluxo, a partir de 10 s a atenção se perde. A documentação da OpenAI chama streaming de a abordagem mais eficaz para latência percebida (citada nos slides).

### Como funciona
- **Ordem:** primeiro a intenção, depois o modelo. O roteamento reaproveita o framework de trade-offs do módulo 1: erro caro ou irreversível favorece o modelo mais sofisticado, e o limiar não é uniforme (cada categoria tem o seu).
- **Canvas de roteamento:** Passo 1 (intenção): dá para nomear em uma frase e apontar para um agente ou índice claro? Se não, ou com confiança baixa, registre e escale para revisão humana; reclassifique a cada turno relevante. Passo 2 (modelo): erro caro e irreversível? Modelo mais capaz. Extração, formatação ou confirmação? Modelo barato. Se o classificador custa mais que a tarefa que evita, o roteamento parou de economizar.
- **Canvas de cache e streaming, em sequência:** (1) a pergunta já foi feita antes? Perguntas diferentes convergindo para o mesmo conteúdo são candidatas a Semantic Cache, *salvo* se o erro é caro e irreversível (recompute sempre). (2) O mesmo documento ou system prompt é reenviado? Prompt Cache, com invalidação ligada à versão do contexto. (3) A resposta leva mais de alguns segundos? Streaming, deixando claro que o texto é rascunho se ainda depende de Approval Gate.
- **No Trial Forge:** Semantic Cache para perguntas de rotina de pesquisadores e monitores sobre o mesmo protocolo, **nunca** para a geração do CSR (o risco de reutilizar informação desatualizada supera o benefício); Prompt Cache nos protocolos, usados continuamente por vários agentes (o maior ganho de custo do módulo, segundo o slide); Streaming na geração do CSR, a mais demorada.
- **Invalidação:** protocolos sofrem emendas e as respostas guardadas deixam de refletir a versão atual; sem invalidar, o cache vira fonte permanente de inconsistência, distribuída com a mesma confiança de informação correta. Invalidação é parte da arquitetura, não detalhe.

### Onde aplicar
- Medir similaridades de pares de perguntas reais antes de fixar o limiar do cache, e proibir cache onde o erro é irreversível.
- Incluir o tenant na chave do cache e planejar invalidação por versão de documento.
- Usar streaming em gerações longas; usar Prompt Cache quando o mesmo contexto longo se repete em chamadas diferentes.

### Vantagens e limites
**Vantagens**
- Roteamento reduz custo e latência sem necessariamente perder qualidade percebida.
- Semantic Cache elimina chamada ao modelo, busca documental e roteamento nos acertos.

**Limites**
- Classificador de roteamento ruim derruba a qualidade; precisa de calibração e recalibração contínuas.
- Limiar de similaridade errado produz respostas erradas com confiança ou cache inútil.

### 🚫 Armadilhas
- Rodar o roteamento de modelo antes de verificar o cache (trabalho desnecessário nos acertos).
- Copiar limiar de outro sistema ou idioma em vez de medir.
- Cachear respostas de documentos de alto impacto regulatório.
- Esquecer de invalidar após emenda ou de separar o cache por estudo.
- Mostrar o streaming de um rascunho como se fosse texto aprovado.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Intent-Based Routing | Decide para onde a requisição vai (qual fluxo/agente/índice) |
| Model Router | Decide qual modelo (barato ou caro) executa a tarefa |
| RouteLLM | Roteador aprendido entre modelo caro e barato (ICLR 2025) |
| Semantic Cache | Reaproveita resposta de pergunta semanticamente equivalente |
| Limiar de similaridade | Corte de cosseno acima do qual a pergunta conta como a mesma |
| Prompt Cache | Reaproveita o processamento de contexto longo repetido |
| Response Streaming | Entrega a resposta aos poucos: reduz latência percebida |
| Invalidação | Remover do cache o que a nova versão do documento tornou obsoleto |

---

## 💻 No código do repo

**Projeto:** [modulo-04-padroes-ai-especificos (canvases de roteamento e de cache e as peças de roteamento, cache e streaming do gateway)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-04-padroes-ai-especificos)

Dois canvases em Markdown e, no `trialforge-gateway-prototype.js`, o classificador de intenção, o Model Router por intenção, o Semantic Cache em memória e o streaming do Ollama. O Prompt Cache **não é demonstrado**.

**Fluxo**
1. `routing-decision-canvas.md` (Passo 1 intenção, Passo 2 modelo, tabela com RouteLLM e Zendesk) e `cache-streaming-decision-canvas.md` (Passos 1 a 3, aviso de tenant e invalidação, tabela 'onde se aplica / onde não').
2. `classificarIntencao(pergunta)`: regra determinística por palavra-chave. 'csr', 'relatório final', 'síntese', 'evento adverso' ou 'desfecho' dão `sintese_csr`; 'critério', 'inclusão', 'exclusão', 'idade mínima' ou 'protocolo' dão `consulta_protocolo`; o resto é `consulta_icf`.
3. **Model Router:** em `processarRequisicao`, `intencao === 'sintese_csr' ? MODELO_CARO : MODELO_BARATO` com `gemma4:latest` contra `gemma4:e2b`.
4. **Semantic Cache:** `cacheSemantico` é um array de `{ pergunta, embedding, resposta }`; `consultarCache` devolve a melhor similaridade por cosseno; acima de `LIMIAR_CACHE = 0.75` devolve a resposta guardada sem chamar o modelo. Só roda para intenções diferentes de `sintese_csr` e só alimenta o cache respostas aprovadas.
5. **Streaming:** `ollama.chat({ ..., stream: true })` e um `for await` que imprime `parte.message.content` e acumula o rascunho; os chunks de 'thinking' dos modelos de raciocínio vêm em outro campo e são ignorados.
6. **Calibração real:** o código comenta que paráfrases próximas ficaram em cerca de 0,82 de similaridade e temas totalmente diferentes em 0,64 a 0,65 com `nomic-embed-text` em português, por isso o corte em 0,75 'no meio do intervalo'. A reprodução está no `audit-trail.jsonl`: paráfrase 0,825 (cache hit).

**Como rodar**
- Veja [D8-11](./11-gateway-integrado.md) para executar o gateway inteiro. Para ver o roteamento sem rede, rode só os testes puros (as 7 perguntas de `classificarIntencao` e os 3 casos de cosseno), que precedem a chamada ao Ollama.
- Missão Prática 4 (Atividade 4): calibrar o limiar com *seus* pares de perguntas e *seu* modelo de embedding, sem copiar os números do Trial Forge.

**Armadilhas e achados no código**
- O cache é um array global do processo: sem chave de tenant e sem invalidação por versão do protocolo. O 'cuidado com tenant e invalidação' da aula e do canvas não tem implementação (um único estudo, e o cache morre com o processo).
- O classificador por palavra-chave é frágil: 'evento adverso' empurra a pergunta para `sintese_csr` mesmo se a dúvida for sobre o ICF, e a ordem dos `if` faz o CSR vencer quando a pergunta cita CSR e protocolo.
- O Prompt Cache não aparece: o comentário final do arquivo explica que é recurso do provedor e que a inferência local no Ollama não cobra por token.

---

## 🔗 Para ir além
- [Repositório oficial do módulo 08 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia)
- [Pasta do módulo 4 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-04-padroes-ai-especificos)
- [RouteLLM (arXiv 2406.18665)](https://arxiv.org/abs/2406.18665)
- [OpenAI: GPT-5 system card (roteador em tempo real)](https://openai.com/index/gpt-5-system-card/)
- [GPTCache (NLP-OSS 2023)](https://aclanthology.org/2023.nlposs-1.24/)
- [Walmart: Semantic Caching at Scale (Portkey)](https://portkey.ai/blog/semantic-caching-at-scale-with-walmarts-chief-architect/)
- [AWS ElastiCache: benchmarks de cache semântico](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/semantic-caching-benchmarks.html)
- [Prompt Cache: Modular Attention Reuse (arXiv 2311.04934)](https://arxiv.org/abs/2311.04934)
- [Anthropic: Prompt Caching](https://www.anthropic.com/news/prompt-caching)
- [OpenAI: Prompt Caching in the API](https://openai.com/index/api-prompt-caching/)
- [Nielsen: Response Times, the 3 Important Limits](https://www.nngroup.com/articles/response-times-3-important-limits/)

---

⬅️ [08 · RAG como padrão de arquitetura: Basic RAG, Hybrid Search, Multi-Index e Agentic RAG](./08-rag-basic-hybrid-multi-index-agentic.md)  ·  [10 · Approval Gate formalizado: interrupção, limiar de confiança e trilha de auditoria](./10-approval-gate-confidence-threshold-e-audit-trail.md) ➡️
