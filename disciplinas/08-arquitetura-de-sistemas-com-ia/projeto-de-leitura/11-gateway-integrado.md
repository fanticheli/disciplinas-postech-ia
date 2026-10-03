# 11 · O gateway integrado: a ordem dos padrões importa

> **Módulo 4 · Aula 5** · Leitura: ~12 min · Bloco: Padrões de Design AI-Específicos

## 🎯 Em uma frase
Num gateway real todos os padrões participam da **mesma requisição** e a **ordem** é decisão arquitetural: identificar a intenção, tentar o **Semantic Cache antes** de qualquer roteamento, escolher o modelo, recuperar contexto (Multi-Index, Hybrid, Agentic), fazer streaming, comparar a confiança com o **Confidence Threshold**, acionar o **Approval Gate** se preciso e, em qualquer caminho, gravar na **Audit Trail**.

---

## 👵 Explicando para a vovó

É a esteira de uma central de atendimento bem montada. Primeiro alguém lê o assunto da ligação (intenção). Antes de acionar qualquer especialista, olha-se o caderno de respostas prontas: se a dúvida já foi respondida, entrega e encerra. Senão decide-se quem atende (modelo), o atendente consulta o manual certo (RAG), responde enquanto digita à vista do cliente (streaming), e se não estiver seguro ou o assunto for sensível, chama o supervisor (gate). Tudo é anotado no livro de registro, qualquer que tenha sido o caminho.

Trocar a ordem desse processo seria pagar o especialista antes de olhar o caderno.

---

## 🔧 Tecnicamente

### O que é
- **Conhecer padrões não é construir arquitetura:** o verdadeiro desafio aparece quando vários padrões colaboram na mesma requisição, e a ordem em que cada decisão acontece pesa tanto quanto a existência do padrão. Alterar a ordem pode aumentar custo, introduzir processamento desnecessário ou piorar a qualidade.
- **O gateway como ponto central:** toda requisição entra por ele, que concentra as decisões sobre como ela será tratada; não produz a resposta, organiza o fluxo. Todas percorrem a mesma sequência, com alguns caminhos interrompidos mais cedo.
- **Decisão 1, intenção:** antes de escolher modelo ou consultar base, classificar o problema. No protótipo é um classificador determinístico simples: 'nem toda decisão precisa ser delegada à IA'.
- **Decisão 2, Semantic Cache antes de tudo:** se existe pergunta equivalente respondida acima do limiar calibrado, devolve a resposta; nenhuma chamada ao modelo, nenhuma busca documental, o resto do fluxo deixa de existir para aquela requisição. Roteamento só tem utilidade quando uma inferência será realmente executada.
- **Decisão 3, Model Router:** com a intenção conhecida escolhe o modelo: consulta simples para o menor, raciocínio complexo ou documentos regulatórios para o mais sofisticado. Não produz conteúdo.
- **Decisão 4, contexto:** Multi-Index escolhe o índice; Hybrid Search (vetorial + BM25) busca; se a qualidade ficar abaixo do esperado, Agentic RAG amplia a estratégia, até três tentativas no protótipo.
- **A confiança passa a mandar:** a confiança da recuperação (melhor recuperação, maior confiança) não é só estatística: é um dos principais sinais do Approval Gate. Ela nasce durante a execução.
- **Decisão 5, streaming** da resposta, sem alterar o tempo total; **decisão 6, Confidence Threshold:** compara a confiança com o limiar calibrado para a categoria; **decisão 7, Approval Gate:** o CSR sempre passa pelo gate, mesmo com confiança alta, porque a criticidade regulatória exige confirmação humana; o limiar é só um dos critérios, o tipo da tarefa é igualmente importante. **Decisão 8, Audit Trail**: toda decisão relevante é registrada, venha do cache, de um modelo simples, de várias buscas ou da aprovação humana.
- **Resumo da lógica:** a intenção identifica o destino; o cache verifica se o processamento é necessário; o roteador escolhe o recurso; o RAG recupera contexto; a confiança do RAG alimenta o limiar; o limiar determina o gate; a trilha registra tudo. Reduz custo, preserva qualidade, minimiza processamento desnecessário e mantém governança.

### Como funciona
- **Gateway Blueprint Canvas (quatro áreas):** (1) categorias de intenção, com exemplos de pergunta e modelo adequado, sempre com justificativa; (2) calibração do Semantic Cache com *pares reais* de perguntas medidos contra o modelo de embedding, em vez de limiar arbitrário; (3) critérios do Approval Gate: categorias de tarefa que sempre exigem validação humana independentemente da confiança; (4) checklist mínimo da trilha de auditoria.
- **Protótipo executável:** o fluxo roda localmente com modelos distintos para tarefa simples e complexa e um modelo para embeddings (sem depender de serviços pagos); objetivo não é copiar produção, é observar toda a sequência funcionando integrada.
- **Calibração real medida (slide):** 0,825 (paráfrase), 0,667 (síntese do CSR), 0,633 (tema diferente), limiar final de cache 0,75; RAG com protocolo converge na 1ª tentativa (0,848) e tema fora do banco esgota as 3 (0,633). O canvas esclarece que 0,667 e 0,633 são a confiança do RAG (pergunta contra cláusula), não pares do cache.
- **Missão Prática 4:** mapear os quatro grupos de padrões no seu contexto, calibrar um limiar com dado real (sem copiar os do Trial Forge) e rodar o protótipo registrando os casos: cache miss, cache hit, os dois gates (por síntese obrigatória e por confiança baixa) e, segundo o slide, o acerto de primeira (o PDF da Atividade pede quatro casos, o slide cinco).

### Onde aplicar
- Desenhar o gateway da sua aplicação de IA como uma única sequência de decisões, colocando verificações baratas que podem encerrar o fluxo antes das caras.
- Documentar o blueprint antes do código: intenções, limiar medido, categorias de gate obrigatório e campos da trilha.
- Rodar os casos de borda (cache miss/hit, gate por confiança, gate obrigatório) e conferir a trilha, não só o texto gerado.
- Trocar o modelo (Ollama por Claude, Gemini ou GPT) sem mudar o resto: é a lição do módulo 1, o modelo é a peça que se troca.

### Vantagens e limites
**Vantagens**
- Cada decisão fica explícita, testável e auditável.
- A ordem evita trabalho que o próprio fluxo tornaria inútil.
- O mesmo gateway demonstra custo, qualidade, governança e rastreabilidade juntos.

**Limites**
- Muitas decisões acopladas por ordem: mudar uma etapa pode afetar as demais.
- Calibrações (limiares) são específicas de modelo e idioma e precisam ser refeitas.
- No protótipo, vários padrões ficam simplificados (corpus minúsculo, cache em memória).

### 🚫 Armadilhas
- Escolher o modelo antes de consultar o cache.
- Copiar limiares de outro contexto em vez de medir.
- Deixar o gate depender só do número de confiança em categorias sempre críticas.
- Conferir só o texto gerado e não a trilha das decisões.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Gateway | Ponto único que sequencia as decisões da requisição |
| Ordem dos padrões | Intenção, cache, roteador, RAG, streaming, limiar, gate, trilha |
| Confiança do RAG | Sinal da recuperação que alimenta o limiar do gate |
| Gateway Blueprint Canvas | Intenções, calibração do cache, critérios do gate, campos da trilha |
| Calibração com dado real | Medir pares de perguntas contra o seu embedding antes de fixar o limiar |
| Gate obrigatório | Categoria que sempre escala, independentemente da confiança |

---

## 💻 No código do repo

**Projeto:** [modulo-04-padroes-ai-especificos (gateway integrado, blueprint, atividade 4)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-04-padroes-ai-especificos)

O gateway do Trial Forge: `trialforge-gateway-prototype.js` (e o espelho `trialforge_gateway_prototype.py`) encadeia Intent-Based Routing, Semantic Cache, Model Router, Multi-Index + Hybrid + Agentic RAG, streaming, Confidence Threshold, Approval Gate e Audit Trail, com Ollama local e embeddings reais.

**Fluxo**
1. `main()`: roda `rodarTestesPuros()` (7 casos de intenção, 3 de cosseno, BM25 e RRF: 12 testes sem rede), `prepararIndices()` (indexação uma vez), `prepararEntradaDeAprovacao()` e cinco requisições em sequência; fecha com `verificarTrilhaAuditoria()` (14 checagens).
2. As cinco requisições exercitam os caminhos: (1) rotina que gera e popula o cache; (2) paráfrase que bate no cache; (3) síntese de CSR com modelo caro e gate sempre obrigatório, sem cache; (4) tema fora do banco que esgota o Agentic RAG e aciona o gate por confiança baixa; (5) critério de protocolo que roteia para o índice `protocolo` e converge na 1ª iteração.
3. `processarRequisicao(pergunta)` segue exatamente a ordem da aula: `classificarIntencao`, `embedar` a pergunta, Semantic Cache (só fora de `sintese_csr`), Model Router, `buscarClausulaAgentica`, geração com `stream: true`, decisão de `precisaAprovacao`, `pedirAprovacaoHumana`, `registrarAuditoria`; se rejeitado devolve `null` e não alimenta o cache.
4. **Resiliência das chamadas ao modelo:** `comRetry` + `comTimeout` (3 tentativas, 20 s) protegem o embedding e a geração, a mesma receita do módulo 3 reaplicada.
5. `verificarTrilhaAuditoria()` relê o JSONL persistido e confere *decisões* (cache hit ou miss, modelo, índice usado, iterações do agentic, gate acionado), nunca o texto gerado, que varia entre execuções.
6. `gateway-blueprint-canvas.md` (as quatro seções do blueprint e a nota sobre RAG avançado), `package.json` (só `ollama ^0.6.3`), `Atividade 4 - Módulo 4.pdf` e `Exemplo - Módulo 4.pdf` (solução de referência: limiar de cache 0,75, limiar de confiança 0,7).

**Como rodar**
- `ollama pull nomic-embed-text && ollama pull gemma4:e2b && ollama pull gemma4` (o `gemma4` maior tem cerca de 9,6 GB), depois `cd modulo-04-padroes-ai-especificos && npm install && node trialforge-gateway-prototype.js`; Python: `python trialforge_gateway_prototype.py` com `pip install ollama`.
- Para automatizar as duas aprovações: `printf 's\ns\n' | node trialforge-gateway-prototype.js`, cenário que os comentários dizem ter motivado a leitura síncrona de stdin.
- Antes de rodar, copie o `audit-trail.jsonl` de referência: o script grava nele.

**Armadilhas e achados no código**
- O corpus tem 6 cláusulas em 3 índices, hardcoded: o protótipo demonstra o encadeamento e a calibração, não escala nem fragmentação de documentos.
- O comentário diz que `prepararEntradaDeAprovacao` lê o stdin 'antes de qualquer chamada ao modelo', mas em `main()` ela roda *depois* de `prepararIndices()`, que já chama o modelo de embedding 12 vezes; o argumento do comentário continua valendo para a geração, não para a indexação.
- O cache semântico, o contador de requisições e a fila de aprovações são estado de módulo: sem multiusuário, sem tenant e sem persistência.
- O Prompt Cache não é demonstrado (recurso do provedor, não cobrado em inferência local).
- A Atividade 4 pede 'quatro casos' (miss, hit e os dois gates) e o slide e o blueprint falam em cinco, contando o acerto de primeira; o protótipo roda cinco. Números: a Atividade lista 0,643 onde o `Exemplo - Módulo 4.pdf`, o slide, o canvas e o `audit-trail.jsonl` trazem 0,633 (provável erro de digitação); a confiança da síntese do CSR é 0,667 no slide e no Exemplo e 0,668 no canvas (o jsonl tem 0,6679, arredondamento).
- O README do repositório lista pré-requisitos para os módulos 4.5 e 5.4 (`nomic-embed-text` e `gemma4`) e o Python depende do pacote `ollama` sem um `requirements.txt`: instale à mão.

---

## 🔗 Para ir além
- [Repositório oficial do módulo 08 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia)
- [Pasta do módulo 4 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-04-padroes-ai-especificos)
- [Ollama (engine local padrão do módulo)](https://ollama.com/)

---

⬅️ [10 · Approval Gate formalizado: interrupção, limiar de confiança e trilha de auditoria](./10-approval-gate-confidence-threshold-e-audit-trail.md)  ·  [12 · Do fluxo à plataforma: stack enterprise, três princípios e o Eval Gate](./12-stack-enterprise-principios-e-eval-gate.md) ➡️
