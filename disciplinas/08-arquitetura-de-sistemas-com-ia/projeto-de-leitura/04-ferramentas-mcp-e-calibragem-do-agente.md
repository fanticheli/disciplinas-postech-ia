# 04 · Ferramentas tipadas, MCP e a calibragem do agente completo

> **Módulo 2 · Aulas 4 e 5** · Leitura: ~13 min · Bloco: Arquiteturas Single-Agent

## 🎯 Em uma frase
**O modelo nunca executa a ferramenta:** ele propõe uma chamada estruturada (nome + parâmetros) e o sistema determinístico executa. O contrato (esquema tipado, retorno estruturado, enum onde o conjunto é fechado) torna o tool calling confiável, e o **MCP** evita um formato por integração. No fim, um agente é resultado de **calibragem**: o protótipo do Trial Forge tem memória temporária, loop de 4 voltas, uma ferramenta e nenhuma reflexão, por decisão consciente.

---

## 👵 Explicando para a vovó

Imagine pedir um empréstimo por formulário. Você não mexe no cofre: preenche campos tipados (valor em número, prazo numa lista de opções) e o funcionário faz a operação. Com texto livre, um dia alguém escreveria 'doze mil e quinhentos' onde o sistema espera 12500 e a máquina travaria.

O agente preenche o formulário; a ferramenta é o funcionário que executa. E o dono do banco decide quantas vezes você volta ao guichê (limite de voltas) antes de ser encaminhado a um gerente.

---

## 🔧 Tecnicamente

### O que é
- **Ferramenta em arquitetura de agentes:** qualquer função externa que o agente possa solicitar durante o planejamento. Diferença chave para um chatbot (só gera linguagem): o agente usa recursos externos para obter informação e provocar ação.
- **Quatro etapas de uma chamada:** **definição** (esquema: nome, finalidade, parâmetros com tipos: texto, número, booleano, lista restrita), **decisão** do modelo (escolhe a ferramenta e preenche os parâmetros: aqui mora o não determinismo, limitado pelo contrato), **execução externa** (a aplicação valida os parâmetros e roda o código real, tudo determinístico: testes, controle de acesso, logs) e **retorno estruturado** (campos nomeados, não parágrafo livre).
- **Tipagem e enum:** o erro mais comum é a falta de tipagem rigorosa. Se a jurisdição (só Anvisa ou FDA no escopo) for texto livre, o modelo escreverá variações de caixa e abreviação: para uma pessoa são equivalentes, para o código são entradas diferentes. O esquema ruim não quebra na primeira chamada, quebra quando o volume de uso revela uma combinação que ninguém previu. O esquema é um contrato de interface em que um dos lados é probabilístico, então precisa ser ainda mais explícito.
- **Ferramentas de leitura e de escrita:** leitura consulta sem alterar estado (busca regulatória, banco, cálculo, verificação de assinatura) e o erro costuma ser corrigível. Escrita altera estado externo (criar registro, enviar notificação) e o erro pode ser caro e irreversível: se for de alto impacto e sem desfazer, passa por Approval Gate *antes* da execução (aprovar depois não resolve). O critério é a consequência, não a complexidade técnica.
- **Retorno também estruturado na falha:** 'nada encontrado' deve dizer isso com um próximo passo (outra jurisdição, reformular o tema) e não ser texto ambíguo que o agente interprete como 'a cláusula não existe'.
- **MCP (Model Context Protocol):** padrão aberto (Anthropic, novembro de 2024) para descrever ferramentas, fornecer contexto ao modelo e devolver resultados estruturados. Sem protocolo cada projeto inventa o seu formato (JSON, CSV, sintaxe própria), o agente aprende um padrão por integração e cada nova exige desenvolvimento e manutenção; com um protocolo comum boa parte vira configuração e amplia a compatibilidade com conectores de terceiros. O valor é a interoperabilidade, como nos protocolos de rede.

### Como funciona
- **Ferramentas do Trial Forge:** (a) busca de cláusulas: `tema` em texto livre e `jurisdicao` restrita a Anvisa/FDA; devolve o texto *e a referência exata* (resolução e artigo), porque a rastreabilidade faz parte do contrato; (b) verificação de assinatura eletrônica: leitura, mas o retorno diz o motivo da invalidade (corrompida, documento alterado depois, certificado expirado), um booleano apagaria informação; (c) notificação de evento adverso: escrita, o esquema declara a aprovação e a farmacovigilância confirma antes.
- **Agente é resultado de calibragem:** não é o que tem memória permanente, muitas ferramentas, reflexão em tudo e loop ilimitado; cada extra soma custo, tempo e superfície de auditoria. No Trial Forge (assentimento do TCLE): memória só temporária; ReAct com **limite explícito de quatro iterações** definido pelo orquestrador, não pelo modelo; **sem reflexão**, por decisão consciente (o Approval Gate basta e a reflexão somaria custo e latência); uma ferramenta, a consulta à base regulatória.
- **Fluxo ponta a ponta:** o protocolo chega ao Gateway e vai ao orquestrador. ReAct: raciocínio (há menores?), consulta o protocolo, observação (12 a 17 anos), chamada da ferramenta (tema de assentimento, jurisdição Anvisa), cláusula e referência de volta, redação da seção e revisão no Approval Gate. Sem menores, a ferramenta nem seria chamada: o fluxo depende do que é descoberto na execução.
- **As ausências também são decisão:** sem memória longa (armazenamento e recuperação), sem várias ferramentas (cada uma é superfície de erro), sem reflexão em toda resposta (dobra as chamadas); cada iteração extra soma latência e tokens. Calibrar é aplicar o orçamento do módulo 1.
- **Implementação:** um laço com máximo de iterações sob responsabilidade do orquestrador. Sem ferramenta necessária, responde; com ferramenta, executa a operação determinística, incorpora o resultado ao histórico e roda de novo. Se o máximo estourar sem convergência, **não termina em silêncio**: devolve explicitamente 'encaminhar à revisão humana'. Outros critérios: tempo máximo, orçamento por requisição ou combinação; o importante é serem explícitos e não dependerem só do modelo.
- **Prototype Blueprint Canvas:** para cada componente registra a configuração e, principalmente, a justificativa (por que memória persistente ou não, quantas iterações e quando para, se a reflexão agrega valor, quais ferramentas e contratos).
- **Princípio final:** o componente mais superdimensionado costuma ser a memória de longo prazo. Comece pelo agente mais enxuto e só adicione componente diante de necessidade concreta. A aula fecha apontando o limite do agente único: TCLE, protocolo e CSR no mesmo agente acumulariam domínios demais, o que leva ao próximo bloco.

### Onde aplicar
- Escrever o esquema de uma ferramenta nova com descrição específica, enum onde o conjunto é fechado e retorno declarado (e retorno de falha estruturado).
- Fixar o critério de parada do loop no orquestrador (iterações, tempo, orçamento) e definir o que acontece ao atingir.

### Vantagens e limites
**Vantagens**
- Execução externa preserva testes, validação, controle de acesso e logs de engenharia tradicional.
- Calibragem explícita deixa custo, latência e auditoria sob controle.

**Limites**
- O contrato tipado reduz o espaço do erro, mas não o elimina (o canvas de loop chama o 'parâmetro plausível porém errado' de o sinal mais perigoso).

### 🚫 Armadilhas
- Declarar o parâmetro de conjunto fechado como string livre.
- Devolver parágrafo em linguagem natural em vez de campos nomeados (inclusive para falhas).
- Deixar o limite de iterações a cargo do modelo ou terminar o loop sem sinalizar.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Tool calling | Modelo propõe nome + parâmetros; a aplicação executa |
| Esquema (schema) | Contrato: nome, descrição, parâmetros tipados, retorno |
| enum | Lista fechada de valores, elimina variação de grafia |
| Leitura x escrita | Não altera estado x altera estado (pode exigir gate) |
| MCP | Padrão aberto para descrever ferramentas e devolver resultados |
| Calibragem | Dar a cada componente só a intensidade que a tarefa exige |
| Critério de parada | Limite explícito (voltas, tempo, orçamento) no orquestrador |
| Prototype Blueprint Canvas | Registro de nível e justificativa por componente |
| Tool-Using | Nome do padrão nos slides: modelo propõe, código executa, retorno estruturado |

---

## 💻 No código do repo

**Projeto:** [modulo-02-single-agent (react-agent-prototype, provedores pagos, canvases de ferramenta e blueprint, atividade 2)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-02-single-agent)

O agente único do Trial Forge: loop ReAct de até 4 voltas gerando a seção de assentimento do TCLE, com a ferramenta tipada `buscar_clausula_regulatoria`, no Ollama local (`gemma4:e2b`). Inclui esboços de troca para provedores pagos, canvases de schema e de calibragem e a Missão Prática 2.

**Fluxo**
1. `react-agent-prototype.js`: `MAX_ITERACOES = 4`; a ferramenta `buscarClausulaRegulatoria` é declarada no formato aninhado `type: 'function'` com `jurisdicao` como `enum: ['ANVISA', 'FDA']` e `tema` string.
2. `executarBuscaClausula` é a execução determinística: valida que `tema` e `jurisdicao` são strings (o comentário conta que o modelo já grafou `jurisdicicao` em testes reais); se o tema contém 'menor', 'adolescente' ou 'pediátric' com jurisdição ANVISA, devolve a cláusula da RDC ANVISA 466/2012, Art. 4º com a fonte; senão, `texto: null` e um `aviso` com próximo passo. Simula por palavra-chave o que seria busca vetorial.
3. `rodarTestesFerramenta()` roda 6 casos de busca mais 1 de parâmetro mal formado, sem chamar o modelo; falhou, o script aborta antes da simulação.
4. `chamarModeloComRetry` + `ehErroTransitorio`: até 3 tentativas com backoff de 500 ms, 1 s, 2 s para falha de rede/timeout; erro 404 (modelo inexistente) é configuração e não repete.
5. `agenteICF(protocolo, { maxIteracoes })`: monta o histórico (system prompt 'nunca peça esclarecimento ao usuário' e o protocolo com jurisdição ANVISA); a cada volta chama o modelo com `tools`; sem `tool_calls` é a resposta final; com chamada, executa a ferramenta, registra na `trilha` e empilha a mensagem do modelo mais uma `role: 'tool'`. Esgotadas as voltas, devolve `escalarParaAprovacaoHumana: true` com o motivo.
6. `simularInteracao()`: cenário 1 (menores de 12 a 17, achado e redigido), cenário 2 (população adulta, ferramenta sem cláusula) e cenário 3 com `maxIteracoes: 1` forçado para demonstrar o escalonamento.
7. `provedores-pagos.js` (e `.py`): `chamarClaude`, `chamarGemini`, `chamarGPT` reescrevem só a chamada ao modelo; cada provedor declara a mesma ferramenta num formato diferente (Claude com `input_schema`, Gemini achatado, GPT aninhado em `function`), a fragmentação que o MCP existe para reduzir.
8. `tool-schema-canvas.md`: schema mal tipado versus bem tipado, retorno de falha, exemplo de escrita `notificar_evento_adverso_regulatorio` com `requer_aprovacao: true` e checklist de cinco itens. `prototype-blueprint-canvas.md`: memória, loop, reflexão e ferramentas com justificativa. `Atividade 2 - Módulo 2.pdf` e `Exemplo - Módulo 2.pdf`: Missão Prática 2 e solução (loop de 4 voltas, uma ferramenta, sem reflexão).

**Como rodar**
- `ollama pull gemma4:e2b`, `cd modulo-02-single-agent`, `npm install`, `node react-agent-prototype.js` (Python: `python react_agent_prototype.py`). Em Mac com Apple Silicon o código comenta que `gemma4:e2b-mlx` é mais rápido.
- Para trocar de provedor, instale a SDK escolhida, defina a chave (`ANTHROPIC_API_KEY`, `GEMINI_API_KEY` ou `OPENAI_API_KEY`) e adapte a chamada dentro de `agenteICF`; o arquivo avisa que não roda sozinho.

**Armadilhas e achados no código**
- `provedores-pagos.js` faz `require` das três SDKs no topo: importar uma função exige as três instaladas, e nenhuma está no `package.json` (só `ollama`). O cabeçalho confirma que rodar o arquivo direto quebra por módulo não instalado.
- As assinaturas não são intercambiáveis: `chamarClaude` e `chamarGPT` recebem o histórico, `chamarGemini` só o protocolo (a API de Interactions guarda o histórico no servidor). Os IDs de modelo estão fixos (`claude-sonnet-5`, `gemini-3.5-flash`, `gpt-5.6`); não verifiquei se existem.
- Os slides divergem do arquivo: o do loop retorna `{ escalarParaGateHumano: true }`, o arquivo usa `escalarParaAprovacaoHumana` com `motivo` e `trilha` (de depuração). O slide 2.5 ainda lista 'reflexão de superfície + conteúdo' entre os quatro componentes e o Passo 2 do `Exemplo - Módulo 2.pdf` diz seção 'depois de reflexão', mas apostila, código e o Passo 1 do exemplo dizem sem reflexão: vale o código.
- No cenário 2 o script registra que o modelo local, sem achar a cláusula, escreve um rascunho genérico em vez de escalar (desvio do system prompt): exemplo vivo de por que o Approval Gate existe e de por que o cenário 3 força `maxIteracoes: 1`.
- `main().catch` só imprime o erro, sem `exitCode`: falha técnica sai com código 0. A Atividade 2 e o cabeçalho citam `demos/provedores-pagos.js`, mas não há pasta `demos` (ver [D8-02](./02-anatomia-do-agente-unico.md)).

---

## 🔗 Para ir além
- [Repositório oficial do módulo 08 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia)
- [Pasta do módulo 2 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-02-single-agent)
- [Anthropic: Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)

---

⬅️ [03 · ReAct e Reflection: raciocinar e agir em loop, depois criticar o que foi produzido](./03-react-e-reflection.md)  ·  [05 · Por que múltiplos agentes: especialização, custo de coordenação e agente não é ferramenta](./05-por-que-multiplos-agentes.md) ➡️
