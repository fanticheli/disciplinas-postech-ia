# 07 · Falhas distribuídas: CAP, timeout, retry, idempotência, Saga e a fila de mensagens

> **Módulo 3 · Aulas 4 e 5** · Leitura: ~13 min · Bloco: Arquiteturas Multi-Agent

## 🎯 Em uma frase
Em sistemas de agentes **falhas fazem parte do comportamento normal**. O **Teorema CAP** obriga a escolher, sob partição, entre esperar (consistência) e seguir (disponibilidade), por componente. Três mecanismos são indispensáveis: **timeout explícito, retry com limite e idempotência**. Quando uma falha tardia invalida só parte do trabalho, a **Saga** executa ações compensatórias em vez de reiniciar tudo, e o **controle otimista de versão** impede escritas silenciosamente sobrescritas.

---

## 👵 Explicando para a vovó

Imagine organizar uma viagem com voo, hotel e carro alugado, cada um reservado por uma agência diferente. Se o carro falha no último passo, você não começa a viagem do zero: cancela o que depende dele, na ordem inversa, cada cancelamento do seu jeito (o hotel devolve parte, o voo cobra multa). Isso é a Saga.

Se a agência do hotel demora a responder, você decide antes quanto tempo espera (timeout), quantas vezes tenta de novo (retry) e se, esgotado o limite, segue sem confirmação ou para tudo (CAP). E se pedir duas vezes a mesma reserva por engano, a agência precisa reconhecer o número do pedido e não cobrar duas vezes (idempotência).

---

## 🔧 Tecnicamente

### O que é
- **Falha não é exceção:** cada agente pode rodar em máquina diferente, com modelo diferente e depender de serviços fora do seu controle. A arquitetura não impede a falha, define antecipadamente o comportamento quando ela ocorrer.
- **Teorema CAP** (Brewer, 2000; formalizado por Gilbert e Lynch, 2002): diante de uma partição de comunicação, o sistema escolhe entre **consistência** (esperar até ter certeza da informação correta) e **disponibilidade** (continuar respondendo mesmo com informação parcial). A partição não é escolha; o comportamento é. Classificar o sistema inteiro como CP ou AP é simplificação: componentes diferentes podem decidir diferente conforme o risco.
- **Exemplo:** o agente de síntese estatística do CSR para de responder. Esperar indefinidamente preserva consistência e pode bloquear o fluxo para sempre; prosseguir registrando explicitamente que parte do relatório não foi concluída preserva disponibilidade com uma lacuna para resolver depois. A decisão não é do modelo, é da arquitetura.
- **Três mecanismos indispensáveis:** **timeout explícito** (toda comunicação com limite de tempo e decisão prevista ao estourar), **retry com limite** (falha pode ser transitória; mas com teto, como no limite de iterações do ReAct) e **idempotência** (repetir não pode gerar efeito duplicado: se um timeout ocorre logo após o agente concluir e o supervisor repete, uma operação não idempotente geraria dois documentos para o mesmo estudo).
- **Saga** (Garcia-Molina e Salem, SIGMOD 1987): cada etapa é uma transação independente; se uma posterior falha, executam-se **ações compensatórias** na ordem inversa, só nas etapas afetadas. Compensação não é rollback automático: cada etapa precisa da sua estratégia de desfazer, que depende do significado da operação (o SagaLLM, 2025, leva a ideia a agentes de LLM). No Trial Forge: protocolo e TCLE concluídos, o CSR descobre ao final uma inconsistência vinda de mudança no protocolo; reiniciar descartaria o que segue válido, a Saga compensa só o necessário.
- **Coordenação versus sincronização:** coordenação (quem faz o quê) é resolvida pelos padrões, em especial o Supervisor; sincronização é outro problema. Hoje cada agente escreve em documentos distintos, mas dois agentes revisando o mesmo protocolo sobrescreveriam um ao outro. **Controle otimista de versão:** o agente informa a versão que leu; ao gravar, o sistema verifica se ainda é a mais recente; se não, rejeita e o autor concilia antes de tentar de novo.

### Como funciona
- **Distributed Failure Canvas:** para cada etapa do fluxo, registre (1) o comportamento ao deixar de responder (política de CAP, timeout, retry, idempotência) e (2) a ação compensatória caso uma falha tardia invalide o trabalho, e quem aciona a compensação (normalmente o Supervisor). Revela rapidamente quais partes têm plano de recuperação e quais supõem que nada falhará.
- **Tabela de calibração do Trial Forge:** **protocolo**: Sequential, abre a cadeia, timeout de 30 s com até 3 tentativas, compensação por *nova versão* preservando o histórico (política de esperar, pois os demais dependem dele); **TCLE**: Parallel e ponto de Handoff (por exemplo bioética), timeout de 45 s, compensação regenerando só a seção afetada; **CSR**: Parallel, a tarefa mais pesada (timeout de 60 s), costuma detectar as inconsistências que disparam compensações a montante; **supervisor**: só coordena e decide qual compensação disparar. O material de referência registra retry 2 vezes para TCLE e CSR, com política de disponibilidade.
- **Timeouts devem refletir a realidade:** o mesmo timeout para todos gera falsos alarmes nos agentes mais lentos e espera demais nos rápidos. Defina por responsabilidade, com margem de segurança.
- **Contratos de eventos antes do código:** canvas de eventos: nome do evento, dado carregado, quem emite, quem escuta e padrão (Sequential, Parallel, Supervisor, ..., Saga). Elimina formatos incompatíveis para a mesma informação.
- **Comunicação assíncrona orientada a eventos:** o agente conclui, publica um evento e não espera ninguém; os inscritos reagem (menos bloqueio e acoplamento). O protótipo usa um barramento simples em memória, que perde mensagens se o processo cair; em produção, plataformas registram o evento antes de confirmar a entrega. No protótipo cada estudo tem o seu barramento; em ambiente real vários compartilham a infraestrutura e cada mensagem precisa de **identificador de correlação**.
- **Evento rico versus notificação:** o evento rico carrega os dados do agente anterior (menos consultas, mais acoplamento ao formato); o de notificação só avisa e quem escuta busca o dado (mais desacoplado, mais uma chamada). Escolha consciente.
- **Falhas parciais:** se um agente conclui e o outro lança exceção, o supervisor precisa saber qual falhou para não descartar o trabalho bom e repetir só o necessário. Retry só é seguro com idempotência. O timeout é acompanhado de fora pelo supervisor, sem depender de o agente avisar; esgotadas as tentativas, vale a escolha entre consistência e disponibilidade conforme a criticidade.

### Onde aplicar
- Decidir, por agente, o timeout, o máximo de tentativas, a política CAP e se a operação é idempotente, antes de implementar.
- Versionar artefatos mutáveis (protocolo v1, v2) em vez de apagar e guardar a versão usada por cada consumidor.
- Declarar quem dispara a compensação e quais ações desfazem cada etapa, em vez de 'recomeçar do zero'.
- A live de 26/09 aprofunda o retry com um mock que falha três vezes (503) e deixa a Compensation, o equivalente à Saga, como extensão: [Live Temporal](./15-live-temporal-process-manager.md).

### Vantagens e limites
**Vantagens**
- O sistema deixa de depender do 'caminho feliz'.
- Compensação preserva trabalho válido e reduz tempo e custo de recuperação.

**Limites**
- Compensações precisam ser projetadas por etapa; não são automáticas como um rollback de banco.
- Evento rico acopla o formato dos dados ao evento.

### 🚫 Armadilhas
- Tratar falha como exceção rara.
- Esperar indefinidamente por um agente (sem timeout) ou repetir sem limite.
- Retry sem idempotência, que gera documentos duplicados.
- Mesmo timeout para todos os agentes.
- Descartar o resultado bom de um agente porque outro falhou no mesmo lote.
- Confundir timeout/retry/idempotência (CAP, falha técnica) com Saga (problema de conteúdo descoberto depois).

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Teorema CAP | Sob partição, consistência ou disponibilidade, por componente |
| Timeout | Limite de espera explícito, com decisão prevista ao estourar |
| Retry com limite | Novas tentativas até um teto |
| Idempotência | Repetir a operação não produz efeito duplicado |
| Saga | Transações por etapa com ações compensatórias em ordem inversa |
| Controle otimista de versão | Gravação só se a versão lida ainda for a atual |
| Evento rico | Evento que carrega o dado, não só a notificação |
| Identificador de correlação | Chave que distingue eventos de execuções diferentes no mesmo barramento |

---

## 💻 No código do repo

**Projeto:** [modulo-03-multi-agent (protótipo da fila de mensagens, canvases e atividade 3)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-03-multi-agent)

Os quatro agentes do Trial Forge (Protocolo, ICF, CSR e Supervisor) conversando por um `EventEmitter` do Node, **sem chamar nenhum modelo**: os agentes simulam trabalho assíncrono com `setTimeout` e o objetivo é o padrão de comunicação. Demonstra Sequential + Parallel, CAP completo (timeout, retry com limite, idempotência), verificação de consistência por versão e compensação Saga.

**Fluxo**
1. `trialforge-message-queue-prototype.js`: tempos de trabalho 300/450/600 ms (os 30/45/60 s da tabela divididos por 100) e `MARGEM_DE_SEGURANCA = 1.5` sobre eles para os timeouts; `comTimeout` usa um temporizador real contra a promessa do agente, então um agente travado é detectado de fora, não por flag.
2. O Protocolo é um recurso versionado e mutável (`criarEstadoProtocolo`, `revisarProtocolo` com `historico`). `agenteProtocolo` publica `protocolo:pronto` com uma *cópia* de `{ versao, criterios, estudo }` (evento rico); com `comEmendaEtica`, 500 ms depois uma emenda muda `idadeMinima` de 13 para 12.
3. `inscreverReacaoParalela` usa `barramento.once` e dispara ICF e CSR juntos sob `comTimeout`; a estratégia `promise.all` reproduz o bug (a falha do ICF descarta o CSR já pronto) e `promise.allSettled` o preserva.
4. O Supervisor tem dois mecanismos distintos. Mecanismo 1 (CAP): `decidirEstrategiaDeRetry` e `executarICFComRetry` repetem só o ICF até `MAX_TENTATIVAS = 3` e, se esgotar, o fluxo segue sem o ICF (disponibilidade). A idempotência é `registrarDocumento`: a chave `versao:icf` nunca duplica o documento, só incrementa `tentativas`.
5. Mecanismo 2 (Saga): cada agente registra `versaoUsada` e `versaoAoConcluir`; `verificarConsistencia` compara os dois por agente. Com a emenda, o ICF (termina aos 450 ms) está consistente e o CSR (termina aos 600 ms) fica defasado; `compensarDivergencia` regenera só o CSR com a versão 2 e o histórico do protocolo é preservado.
6. `rodarTestes()` executa 10 testes (evento rico, caminho feliz, bug do `Promise.all`, correção com `allSettled`, idempotência, ordem Sequential provada por log, divergência detectada, compensação Saga, timeout real recuperado, retry esgotado) e `main()` narra cinco cenários. O `.py` repete tudo sobre `asyncio` com um barramento mínimo próprio.
7. `distributed-failure-canvas.md` (timeout, retries e CAP por agente; compensação por etapa), `message-queue-canvas.md` (contrato de eventos, trecho de referência com `EventEmitter`, evento rico versus notificação) e `Atividade 3 - Módulo 3.pdf` / `Exemplo - Módulo 3.pdf` (Missão Prática 3: padrões dependência por dependência, falha e compensação por agente, comunicação assíncrona em JS com contrato de eventos).

**Como rodar**
- Não precisa de Ollama nem de `npm install`: `cd modulo-03-multi-agent && node trialforge-message-queue-prototype.js` (ou `python trialforge_message_queue_prototype.py`).
- Verifiquei nesta pesquisa: os 10 testes passam em JavaScript (Node 20) e em Python.
- Brinque com `comEmendaEtica`, `forcarFalhaICF`, `forcarTravamentoICF` e `persistirFalhaNoRetry` em `rodarFluxoTrialForge` para ver cada mecanismo isolado.

**Armadilhas e achados no código**
- O canvas e a aula descrevem eventos do sistema completo (`icf:pronto`, `csr:pronto`, `icf:handoff-bioetica`, `protocolo:revisar`, `supervisor:verificar`), mas o JS só emite e ouve **um** evento, `protocolo:pronto`; o resto é chamada direta de função. O canvas afirma que as demais linhas estão 'implementadas em outros listeners do mesmo módulo', e não encontrei esses listeners no código.
- Hierarchical, Group Chat, Handoff e o Agente Bioética **não estão implementados** no protótipo; o código cobre Sequential, Parallel, Supervisor, CAP e Saga.
- A tabela do canvas fixa **2 retries** para ICF e CSR, mas o protótipo usa `MAX_TENTATIVAS = 3` para o retry do ICF (comentário: 'mesmo limite aplicado de forma consistente'); o slide de calibração e o código divergem.
- O slide mostra um listener com `Promise.all`; o protótipo real usa `Promise.allSettled` por padrão e mantém o `Promise.all` só como o bug documentado.

---

## 🔗 Para ir além
- [Repositório oficial do módulo 08 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia)
- [Pasta do módulo 3 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-03-multi-agent)
- [Brewer: Towards Robust Distributed Systems (PODC 2000)](https://people.eecs.berkeley.edu/~brewer/cs262b-2004/PODC-keynote.pdf)
- [Gilbert e Lynch: Brewer's Conjecture (SIGACT News 2002)](https://www.comp.nus.edu.sg/~gilbert/pubs/BrewersConjecture-SigAct.pdf)
- [Garcia-Molina e Salem: Sagas (SIGMOD 1987)](http://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf)
- [SagaLLM: Context Management, Validation, and Transaction Guarantees (arXiv 2503.11951)](https://arxiv.org/abs/2503.11951)

---

⬅️ [06 · Seis padrões de orquestração: Sequential, Parallel, Supervisor, Hierarchical, Group Chat e Handoff](./06-seis-padroes-de-orquestracao.md)  ·  [08 · RAG como padrão de arquitetura: Basic RAG, Hybrid Search, Multi-Index e Agentic RAG](./08-rag-basic-hybrid-multi-index-agentic.md) ➡️
