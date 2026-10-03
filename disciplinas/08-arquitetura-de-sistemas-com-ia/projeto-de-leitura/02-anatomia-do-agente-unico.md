# 02 · Anatomia do agente único: memória, planejamento, ferramentas e ação

> **Módulo 2 · Aula 1** · Leitura: ~10 min · Bloco: Arquiteturas Single-Agent

## 🎯 Em uma frase
Um agente single-agent se analisa por **quatro componentes**: memória, planejamento, ferramentas e ação. Eles não são um checklist obrigatório: cada tarefa pede uma quantidade diferente, e o bom agente usa **exatamente o necessário**, sem complexidade extra. Quando o ciclo Pensar-Agir-Observar roda sobre esses quatro, você tem uma máquina de estados em que um componente não determinístico escolhe o próximo estado.

---

## 👵 Explicando para a vovó

Pense num atendente de balcão. A memória é a anotação que ele faz na ficha durante o atendimento (curto prazo) e o arquivo de clientes antigos (longo prazo). O planejamento é decidir os passos antes de agir. As ferramentas são a calculadora, o sistema de consulta, o telefone. A ação é o que ele de fato faz: responder, registrar, ou levantar a mão e chamar o gerente.

Um balcão de farmácia que só carimba receitas não precisa de arquivo de clientes antigos nem de dez ferramentas. O truque é não dar ao atendente mais recursos do que o balcão exige.

---

## 🔧 Tecnicamente

### O que é
- **Definição por componentes, não por marketing:** muita coisa vendida como 'agente' é uma única chamada a um modelo com um prompt bem escrito: sem memória entre execuções, sem plano de passos, sem ferramentas. Pode ser exatamente o que a tarefa pede, mas é outra arquitetura. Os slides chamam o caso de zero componentes ligados de padrão *Reactive*: responde direto, sem estado.
- **Memória de curto prazo:** o contexto da requisição atual (mensagens recentes, documentos recebidos, resultados de etapas). Analogia da aula: a memória RAM, rápida, limitada e que some quando a execução termina.
- **Memória de longo prazo:** persiste entre sessões, como um disco. Não é reenviar todo o histórico ao modelo (custo e limite de contexto): é recuperar só o relevante, normalmente por busca vetorial, o mesmo princípio do RAG. Divide-se em **episódica** (eventos específicos, um histórico) e **semântica** (informações generalizadas, um perfil, como preferências). Os slides citam o padrão Memory-Enhanced (MemGPT/Letta, 2023).
- **Risco de compliance da memória persistente:** retenção de dados pessoais. Se o usuário pedir exclusão, o sistema precisa localizar e remover de verdade, não apenas deixar de usar. Por isso a memória longa é também um componente de segurança e governança.
- **Planejamento:** decompor uma tarefa complexa antes de agir. Inclui raciocínio estruturado, decomposição em subobjetivos, autocrítica e reflexão. Reflexão completa costuma exigir uma chamada extra ao modelo; decompor em subobjetivos é uma decisão de fluxo (quantas etapas, em que ordem, quem decide o fim). Planejar mais melhora a decisão, mas custa latência e recursos.
- **Ferramentas:** funções ou serviços que o agente aciona fora do modelo (calculadora, busca em documentos, banco, calendário, API corporativa, emissão de documentos). Usar ferramenta é delegar a um componente determinístico especializado, e cada ferramenta adicionada cria uma nova decisão para o agente (quando usar, quais parâmetros, como interpretar o retorno).
- **Ação:** o passo executado no mundo depois que o agente interpreta e decide. Responder é ação, consultar ferramenta é ação, atualizar sistema também. Ter capacidade de ação não é agir sempre sozinho: interromper o processo e pedir aprovação humana pode ser a ação mais importante em alto risco.

### Como funciona
- **Dimensionando o agente do Trial Forge (TCLE):** memória mínima, só a execução atual (protocolo em processamento, cláusulas recuperadas, texto produzido; um agente de TCLE nem lembra de protocolos anteriores, para não carregar custo de armazenamento e superfície de risco de dados); planejamento de duas etapas (recuperar cláusulas aplicáveis, gerar o rascunho do protocolo aprovado) sem ciclos de reflexão; uma ferramenta (busca na base de cláusulas regulatórias via RAG); ação restrita a gerar rascunho, nunca publicar. A publicação como versão oficial depende do Approval Gate. 'Enxuto não é incompleto: está dimensionado para o problema.'
- **Teste de realidade (5 perguntas):** (1) se a memória de longo prazo fosse removida a tarefa ainda funcionaria? Se sim, ela provavelmente não deveria existir; (2) se o planejamento fosse reduzido pela metade a qualidade cairia de forma perceptível? Se não, está superdimensionado; (3) cada ferramenta tem necessidade clara e recorrente, ou foi 'por precaução'?; (4) a ação final é reversível? Se não, existe Approval Gate?; (5) o dimensionamento cabe nos limites de latência e custo definidos para o componente?
- **Agentes com necessidades diferentes:** um agente de atendimento de companhia aérea pode precisar de memória persistente do passageiro, planejamento de várias etapas (remarcação, reembolso, compensação), várias ferramentas (voos, bilhetes, pagamentos) e ações que alteram uma viagem real. Isso não o torna melhor que o do Trial Forge, só com exigências diferentes.
- **Quando basta um agente:** poucas etapas, conjunto limitado de ferramentas, sem necessidade de conhecimento especializado de vários domínios independentes, e orçamento de latência/custo que não justifica coordenar vários agentes. Sistemas multiagentes somam comunicação, sincronização, resolução de conflitos e troca de contexto. Muitos domínios, memória extensa e muitas ferramentas são o sinal de que talvez seja hora de evoluir.
- **O ciclo:** o agente usa a memória para entender o contexto, planeja o próximo passo, decide se aciona uma ferramenta ou outra ação, observa o resultado e verifica se concluiu; se não, recomeça. É a repetição que dá impressão de raciocínio contínuo. Arquiteturalmente continua sendo uma máquina de estados com um componente não determinístico escolhendo o próximo estado.
- **Perguntas para avaliar qualquer produto 'agente':** que tipo de memória existe? quantas etapas de planejamento? quais ferramentas? quais ações? há aprovação humana antes de ação irreversível?

### Onde aplicar
- Dimensionar um agente novo preenchendo o canvas de anatomia antes de escrever código.
- Revisar um agente existente com o teste de realidade para achar o que dá para cortar.
- Decidir onde memória persistente realmente compensa: assistente que acompanha o mesmo usuário por semanas sim; processamento independente de documentos não.
- Cobrar clareza de vocabulário do time ('o agente lembra?' não pode significar duas coisas).

### Vantagens e limites
**Vantagens**
- Vocabulário comum de quatro componentes evita arquiteturas diferentes com a mesma palavra.
- Dimensionar por tarefa reduz custo, latência e superfície de auditoria.
- Ferramentas determinísticas somam o melhor do modelo (interpretação) e do código (exatidão).

**Limites**
- Memória longa traz retenção de dados pessoais e obrigação de exclusão efetiva.
- Planejamento extra eleva latência e consumo; reflexão pode dobrar chamadas.
- Cada ferramenta nova amplia a chance de decisão errada do agente.

### 🚫 Armadilhas
- Chamar de agente qualquer prompt bem escrito e depois supor que 'ele lembra' ou 'ele planeja'.
- Adicionar memória persistente 'porque pode ser útil no futuro': gera custo permanente de recuperação, auditoria e proteção de dados.
- Dar ao agente ferramentas 'por via das dúvidas'.
- Confundir ter capacidade de ação com dever de agir sem aprovação.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Memória de curto prazo | Contexto da requisição atual, como RAM |
| Memória de longo prazo | Persiste entre sessões, recuperada seletivamente (busca vetorial) |
| Episódica x semântica | Eventos específicos (histórico) x informação generalizada (perfil) |
| Planejamento | Decomposição em etapas, raciocínio estruturado, autocrítica |
| Ferramenta | Função externa determinística que o agente aciona |
| Ação | Passo executado no mundo, inclusive pedir aprovação humana |
| Teste de realidade | Cinco perguntas para achar excesso ou falta de dimensionamento |
| Reactive | Padrão sem nenhum dos quatro componentes: responde direto |
| Memory-Enhanced | Padrão de agente com memória de longo prazo (MemGPT/Letta, 2023, citado nos slides) |

---

## 💻 No código do repo

**Projeto:** [modulo-02-single-agent (canvas de anatomia e demo dos componentes)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-02-single-agent)

Cinco mini-demonstrações isoladas, uma por peça da anatomia (memória, planejamento, ferramentas, ação e Approval Gate), no contexto do Agente ICF do Trial Forge. Não é o loop ReAct inteiro: é cada peça tangível, uma de cada vez. Só a seção de planejamento chama o modelo.

**Fluxo**
1. `agent-anatomy-canvas.md`: tabela dos quatro componentes com perguntas-guia, referência do Trial Forge e o 'teste de realidade' em cinco perguntas; no fim descreve o demo em código. Anota que chain-of-thought é 'quase de graça' (mesma chamada) e reflexão é 'uma chamada inteira a mais'.
2. `agent-components-demo.js`, memória: `memoriaCurtoPrazo(protocolo)` devolve um array efêmero de mensagens; `memoriaLongoPrazo(usuarioId, preferenciaNova)` acumula contagem de interações e preferências num `Map` em memória, só para tornar tangível o contraste (em produção seria um banco). `testarMemoria()` prova que duas chamadas acumulam estado.
3. Planejamento: `chainOfThought(pergunta)` faz 1 chamada ao Ollama pedindo raciocínio breve; `chainOfThoughtMaisReflexao(pergunta)` faz 2 chamadas (responde e depois critica a própria resposta); a demo imprime quantas chamadas e quantos milissegundos cada uma levou e a razão entre os tempos, o número concreto por trás de 'reflexão custa uma chamada a mais'.
4. Ferramentas e ação: `buscarClausulaAssentimento(faixaEtaria)` é a função determinística mínima (se há idade abaixo de 18 devolve a cláusula da RDC ANVISA 466/2012, Art. 4º; senão devolve aviso); `executarOuGatear(acaoProposta)` executa direto ou devolve `aguardando_aprovacao` conforme `requerAprovacao`, com os exemplos 'gerar rascunho' (executa) e 'notificar evento adverso regulatório' (nunca executa sozinho).
5. `main()` roda os três testes (`testarMemoria`, `testarFerramenta`, `testarGate`), depois as quatro demonstrações. `agent_components_demo.py` é o espelho em Python.

**Como rodar**
- Instale o Ollama, deixe-o em segundo plano e `ollama pull gemma4:e2b` (cerca de 7,2 GB, segundo o README do módulo; baixe antes).
- `cd modulo-02-single-agent && npm install` (instala `ollama`) e `node agent-components-demo.js`; ou `python agent_components_demo.py` com `pip install ollama`.
- Sem Ollama, os testes e as demos de memória, ferramenta e gate funcionam; a seção de planejamento falha ao chamar o modelo e o `catch` final só imprime o erro.

**Armadilhas e achados no código**
- Vários textos do módulo (README do repo, cabeçalho de `react-agent-prototype.js`, a Atividade 2) falam em uma pasta `demos/`, mas os arquivos estão direto em `modulo-02-single-agent/`; não existe pasta `demos` no repositório.
- O `package.json` da pasta se chama `demos`, tem `main: provedores-pagos.js` e só a dependência `ollama` (^0.6.3): as SDKs pagas não estão nele (ver tópico [D8-04](./04-ferramentas-mcp-e-calibragem-do-agente.md)).
- Se o Ollama não estiver rodando, `main().catch` só faz `console.error`, sem `process.exitCode`: o processo sai com código 0 mesmo com falha. Os protótipos dos módulos 3, 4 e 5 já definem `exitCode = 1`.
- A memória de longo prazo do demo é um `Map` em RAM: ilustra o contraste, não demonstra persistência real, recuperação vetorial nem exclusão de dados pessoais.

---

## 🔗 Para ir além
- [Repositório oficial do módulo 08 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia)
- [Pasta do módulo 2 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-02-single-agent)
- [Vídeo: How We Build Effective Agents (Barry Zhang, Anthropic)](https://www.youtube.com/watch?v=D7_ipDqhtwk)

---

⬅️ [01 · Agente ou regra? O framework das três perguntas e o orçamento de trade-offs](./01-framework-de-decisao-e-trade-offs.md)  ·  [03 · ReAct e Reflection: raciocinar e agir em loop, depois criticar o que foi produzido](./03-react-e-reflection.md) ➡️
