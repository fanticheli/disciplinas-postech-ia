# 10 · Approval Gate formalizado: interrupção, limiar de confiança e trilha de auditoria

> **Módulo 4 · Aula 4** · Leitura: ~11 min · Bloco: Padrões de Design AI-Específicos

## 🎯 Em uma frase
O Approval Gate deixa de ser desenho e vira **três componentes técnicos**: o mecanismo que **interrompe** a execução preservando o estado, o **limiar de confiança** que decide quando interromper e a **trilha de auditoria imutável** que prova a decisão. A pausa é deliberada, não lentidão acidental. Aprovar tudo reduz a automação a uma fila de aprovações; limiar demais permite automatizar o que não devia.

---

## 👵 Explicando para a vovó

Pense num caixa de banco. Saques pequenos ele libera na hora. Acima de um valor, o sistema trava e chama o gerente, que olha, aprova ou nega. Dois detalhes fazem toda a diferença: o gerente é chamado só quando o valor passa de uma linha (limiar), e tudo fica gravado num livro que não se apaga: quem aprovou, quando, com qual regra. Se errou, escreve-se uma nova linha dizendo 'corrigido', nunca se rasga a antiga.

O caixa não é lento: é a pausa que faz o banco poder ser auditado.

---

## 🔧 Tecnicamente

### O que é
- **Approval Gate:** ponto de controle antes de ação cuja consequência pode ser cara, sensível ou irreversível. Não reduz velocidade por acidente: impede que a decisão avance sozinha quando o risco passa do limite definido pela arquitetura. Diferente dos padrões de otimização, introduz uma interrupção consciente.
- **Interromper com estado:** a interrupção não encerra o processamento: o estado da execução é preservado e o fluxo espera uma decisão externa. Exemplos citados: o `interrupt()` do LangGraph (pausa e guarda o estado completo até receber aprovação) e os agentes do AWS Bedrock com passo de confirmação antes de executar uma ação (CONFIRM ou DENY).
- **Contexto regulatório:** o guidance do FDA de janeiro de 2025 sobre IA em decisões regulatórias de medicamentos propõe um framework de risco em sete passos: sistema que decide sozinho, sem revisão humana, é influência alta e risco alto; com validação humana antes da decisão final, a influência do modelo e o risco atribuído diminuem formalmente. O gate não só reduz erro, muda a classificação regulatória do sistema.
- **Síncrono x assíncrono:** caro mas reversível: gate **assíncrono** (a execução segue marcada para revisão posterior, reversível com mecanismos como a Saga). Irreversível: gate **síncrono**, nada posterior roda sem aprovação explícita. Exemplo: a síntese final do CSR.
- **Confidence Threshold:** a régua que converte um sinal probabilístico em regra operacional: acima do valor, segue; abaixo, interrompe e vai para validação humana. Evita tanto automatizar demais quanto exigir revisão de tudo. Ligação com **Learning to Defer** (Madras, Pitassi e Zemel, NeurIPS 2018): modelos que aprendem a transferir a decisão a um humano em vez de arriscar resposta incerta, reconhecendo que o humano também pode errar; o objetivo passa a ser responder só aquilo de que há confiança suficiente.
- **Três faixas (Stripe Radar):** cada pagamento recebe pontuação de risco de 0 a 99; acima de 65 vai para fila de revisão manual, acima de 75 é alto risco e bloqueado por padrão. O ponto é haver **mais de duas saídas**: aprovar, escalar para humano, bloquear. O limiar nunca é definitivo: muda a versão do modelo ou o perfil de pedidos, recalibre.
- **Audit Trail:** transforma aprovação em fato verificável: registra permanentemente quem decidiu, quando e em que condições. Requisito anterior à IA: 21 CFR Part 11 (FDA) exige trilhas de auditoria seguras, geradas por computador, com timestamp, que registram de forma independente criação, modificação ou exclusão de registros eletrônicos, sem sobrescrever, só acrescentar; o EU AI Act (Artigo 12) exige que sistemas de alto risco permitam registro automático de eventos durante toda a vida do sistema.
- **O que registrar:** qual agente ou pessoa decidiu; data e hora; **versão do prompt**; **versão do modelo**; **limiar de confiança aplicado**; resultado (aprovado, rejeitado ou encaminhado para revisão). Sem esse mínimo, a trilha existe só formalmente.
- **Imutabilidade:** uma decisão corrigida não apaga o registro anterior: cria-se um novo evento de revisão, preservando o histórico, a mesma lógica do versionamento e das ações compensatórias. Não existe reescrita do passado.

### Como funciona
- **Human-in-the-Loop Formalization Canvas (ordem importa):** Passo 1: qual sinal de confiança está disponível (score do modelo, similaridade de recuperação ou regra determinística de complexidade); onde ficam as três faixas; quando foi a última recalibração. Passo 2: o erro é caro e irreversível? Gate síncrono; caro e reversível, assíncrono; e quem tem autoridade para aprovar essa categoria, definida por tipo de tarefa. Passo 3: checklist da trilha (quem, quando, versões de prompt e modelo, limiar e score, resultado).
- **No Trial Forge:** na geração do CSR o modelo produz a síntese e calcula a confiança; como a publicação tem alto impacto regulatório, o gate síncrono é acionado *obrigatoriamente*. O especialista revisa, registra a decisão e tudo entra na trilha. No agente ICF, extrações de alta confiança seguem, abaixo de um limiar calibrado escalam, a mesma lógica de três faixas aplicada a seções de documento. A trilha atravessa os três agentes.
- **O limiar não decide sozinho:** algumas categorias exigem aprovação independentemente do score (a síntese do CSR). O tipo da tarefa é um critério tão importante quanto o número.
- **Papéis:** o mecanismo de interrupção decide *como* pausar; o limiar decide *quando* pausar; a trilha comprova *o que aconteceu*. Quem aprova é definido pelo negócio por categoria.

### Onde aplicar
- Qualquer fluxo com agente que chega a um efeito irreversível: pause com estado preservado em vez de abortar.
- Definir limiar por categoria de tarefa e recalibrá-lo a cada mudança de modelo ou de perfil de pergunta.
- Em setor regulado, desenhar a trilha já com campos de versão de prompt e de modelo, e com escrita somente de acréscimo.
- Usar mais de duas saídas (seguir, escalar, bloquear) quando o risco justificar.
- A live de 24/09 (Disciplina 02) implementa pausa e retomada com `interrupt` e `Command(resume=...)` do LangGraph, com gatilho de ambiguidade: [Live NetFibra](../../02-apis-de-ia-generativa-e-prompt-engineering/projeto-de-leitura/12-live-netfibra-langgraph-graphrag-hitl.md).

### Vantagens e limites
**Vantagens**
- Reduz a classificação de risco do sistema perante o regulador quando há validação humana antes da decisão final.
- A trilha de auditoria sustenta inspeções e investigações de incidente.
- O limiar permite automatizar o que é seguro e concentrar a revisão humana onde importa.

**Limites**
- O gate síncrono introduz espera por pessoas (minutos ou horas).
- Limiar mal calibrado gera fila excessiva ou automatiza decisões que deviam ser revisadas.
- Trilha imutável exige disciplina de correção por novos eventos e armazenamento permanente.

### 🚫 Armadilhas
- Mandar tudo para aprovação humana: vira fila de aprovações, sem ganho de automação.
- Deixar o limiar fixo depois de trocar o modelo.
- Registrar só 'aprovado' sem versões, limiar e responsável.
- Apagar ou sobrescrever registros ao corrigir uma decisão.
- Achar que a reflexão do agente substitui o gate em tarefa crítica.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Approval Gate | Pausa deliberada antes de ação cara ou irreversível |
| interrupt() / CONFIRM-DENY | Mecanismos de pausa com estado e confirmação (LangGraph, Bedrock) |
| Gate síncrono | Bloqueia até aprovação explícita (irreversível) |
| Gate assíncrono | Segue e revisa depois (caro, mas reversível) |
| Confidence Threshold | Limiar que separa execução automática de revisão humana |
| Learning to Defer | Aprender a passar a decisão a um humano quando incerto |
| Audit Trail | Registro permanente e só-acréscimo de quem decidiu o quê e quando |
| 21 CFR Part 11 / EU AI Act Art. 12 | Normas que exigem trilha e registro automático de eventos |

---

## 💻 No código do repo

**Projeto:** [modulo-04-padroes-ai-especificos (canvas HITL e as peças de gate e auditoria do gateway)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-04-padroes-ai-especificos)

O canvas de formalização do gate e, no gateway, o Confidence Threshold, um Approval Gate em linha de comando e uma trilha de auditoria em JSONL só de acréscimo (`audit-trail.jsonl` é o log de referência).

**Fluxo**
1. `hitl-formalization-canvas.md`: os três passos (limiar, gate síncrono ou assíncrono, trilha) com a tabela do Trial Forge e as referências (Stripe Radar, Madras et al., `interrupt()`, CONFIRM/DENY, 21 CFR Part 11, EU AI Act).
2. **Confidence Threshold:** em `processarRequisicao`, `precisaAprovacao = intencao === 'sintese_csr' || confianca < LIMIAR_CONFIANCA` com `LIMIAR_CONFIANCA = 0.7`; a confiança é a similaridade de cosseno da melhor cláusula do RAG.
3. **Pendência gravada antes da decisão:** o código registra uma entrada `aguardando_aprovacao` com o `motivo_gate` *antes* de pedir a aprovação, para que o pedido pendente sobreviva se o processo cair; depois grava a entrada final com `aprovado` e `status_final` (`aprovado` ou `rejeitado`).
4. **Approval Gate:** `pedirAprovacaoHumana(rascunho)` imprime o rascunho e lê 's' ou 'n'. Se há terminal (`isTTY`) usa um `readline.Interface`; se não, `prepararEntradaDeAprovacao` lê todo o stdin de uma vez (`fs.readFileSync(0)`) numa fila, para suportar `printf 's\ns\n' | node ...`. Os comentários contam dois bugs reais que levaram a essa forma.
5. **Audit Trail:** `registrarAuditoria` faz `fs.appendFileSync` de uma linha JSON com timestamp ISO: só acréscimo, citando o 21 CFR Part 11. Campos gravados: `id_requisicao`, `pergunta`, `intencao`, `cache_hit`, `modelo_usado`, `indice_usado`, `iteracoes_agentic`, `esgotou_agentic`, `confianca_rag`, `gate_acionado`, `aprovado`, `status_final`.
6. `audit-trail.jsonl`: sete linhas de referência (duas delas são entradas `aguardando_aprovacao`), cobrindo rotina sem gate (0,803), cache hit (0,825), síntese de CSR com gate obrigatório e rejeitada, pergunta fora do banco com 3 iterações esgotadas, gate por confiança (0,633 abaixo de 0,7) e critério de protocolo na 1ª iteração (0,848).

**Como rodar**
- Execute o gateway ([D8-11](./11-gateway-integrado.md)) respondendo 's' ou 'n' às duas pausas (a síntese do CSR e a pergunta de baixa confiança).
- Compare com o log de referência, mas veja o aviso: a execução escreve no mesmo `audit-trail.jsonl` versionado.

**Armadilhas e achados no código**
- O checklist de trilha do canvas pede **versão do prompt**, **versão do modelo**, **limiar aplicado** e **quem decidiu**. O registro do protótipo grava o nome do modelo (`modelo_usado`), mas não vi versão de prompt, identidade de quem aprovou nem o limiar como campo próprio (ele só aparece dentro do texto de `motivo_gate` na pendência por confiança). A trilha real do protótipo cobre menos que o checklist que o próprio módulo ensina.
- O gate do protótipo é um prompt de terminal dentro do mesmo processo, não um mecanismo durável: nada retoma a execução depois de uma queda, só fica o registro pendente.
- Rodar o gateway **acrescenta linhas no `audit-trail.jsonl` que está no repositório**; o arquivo de referência e o log da sua execução são o mesmo arquivo. A verificação final olha só as últimas 5 entradas concluídas, por isso execuções repetidas continuam passando. Se quiser comparar com a referência, copie o arquivo antes.
- O `audit-trail.jsonl` de referência mostra a síntese do CSR (req-3) e a pergunta de baixa confiança (req-4) **rejeitadas**; o log do `Exemplo - Módulo 4.pdf` mostra a síntese do CSR **aprovada**. São execuções diferentes, não a mesma.
- Um registro de pendência e outro final compartilham o mesmo `id_requisicao` (req-3 e req-4 aparecem duas vezes): ao consumir o arquivo, deduplique por `status_final`.

---

## 🔗 Para ir além
- [Repositório oficial do módulo 08 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia)
- [Pasta do módulo 4 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-04-padroes-ai-especificos)
- [LangGraph: interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)
- [AWS Bedrock Agents: confirmação do usuário](https://docs.aws.amazon.com/bedrock/latest/userguide/agents-userconfirmation.html)
- [Madras et al.: Predict Responsibly, Learning to Defer (arXiv 1711.06664)](https://arxiv.org/abs/1711.06664)
- [Stripe Radar: avaliação de risco](https://docs.stripe.com/radar/risk-evaluation)
- [FDA: guidance sobre IA em decisões regulatórias de medicamentos](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/considerations-use-artificial-intelligence-support-regulatory-decision-making-drug-and-biological)
- [21 CFR Part 11 (eCFR)](https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-11)
- [EU AI Act (Regulamento 2024/1689)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng)

---

⬅️ [09 · Roteamento, cache semântico, prompt cache e response streaming](./09-roteamento-cache-e-streaming.md)  ·  [11 · O gateway integrado: a ordem dos padrões importa](./11-gateway-integrado.md) ➡️
