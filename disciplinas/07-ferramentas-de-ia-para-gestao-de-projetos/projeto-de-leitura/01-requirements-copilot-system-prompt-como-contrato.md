# 01 · Requirements Copilot: o system prompt como contrato de comportamento

> **Unidade 1 · Aulas 1 e 2** · Leitura: ~8 min · Bloco: Descoberta e escopo (Unidade 1)

## 🎯 Em uma frase
O **Requirements Copilot** é um LLM configurado por um **system prompt que age como contrato**: papel específico em cada User Story, INVEST como validação, Gherkin sem termos subjetivos e um **protocolo de ambiguidade** que o obriga a registrar lacunas em vez de preenchê-las com números plausíveis.

---

## 👵 Explicando para a vovó

Imagine um estagiário que assiste a uma reunião e escreve a ata. Se o cliente disse «precisa ser rápido», um estagiário esperto, para parecer competente, escreve «responder em 200 milissegundos». Ficou bonito e ninguém pediu esse número.

O Requirements Copilot é um estagiário treinado para não fazer isso. Quando falta informação ele anota «aqui falta o número, perguntar ao cliente» e devolve uma lista de perguntas. A ata fica menos elegante e muito mais honesta.

---

## 🔧 Tecnicamente

### O que é
- **O problema de fundo:** reuniões de discovery terminam com consenso aparente e, dias depois, cada participante descreve uma solução diferente. Agile, SAFe e PMBOK não eliminam o gargalo de transformar conversa informal em especificação precisa. Com agentes e LLMs o risco sobe: um requisito mal definido pode fazer o sistema tomar decisões que ninguém autorizou.
- **Requirements Copilot:** LLM mais system prompt estruturado. Não é uma ferramenta nova nem substitui o analista de negócios: executa a parte mecânica da engenharia de requisitos para o especialista concentrar o tempo no julgamento.
- **Três características:** *escala* (processa a transcrição bruta inteira), *rastreabilidade* (cada requisito tem responsável, critérios objetivos e vínculo com épico, feature ou item do Jira) e *curadoria* (alucinações são registradas e viram melhoria do próprio prompt).
- **Copiloto, não assistente:** assistente é reativo; copiloto acelera e estrutura, e o analista continua responsável. A saída é um rascunho sujeito a validação, nunca verdade.
- **User Story com papel específico:** «Como gestor de frota, quero…, para que…». O papel nunca é «usuário» genérico: diretor de operações, motorista e operador de central usam o sistema de formas diferentes, e papel específico viabiliza priorizar e saber quem valida.
- **INVEST no system prompt:** independente, negociável, valiosa, estimável, pequena e testável. Falha vira `[INVEST-FAIL: X]` explícito, e a história não segue para a sprint.
- **Gherkin verificável:** mínimo de dois cenários (happy path e edge case). O «Então» não pode usar «corretamente», «adequadamente» ou «de forma rápida»: precisa de número, estado ou condição que o QA automatize. O que não automatiza leva `[MANUAL-ONLY]`.
- **Protocolo de ambiguidade:** LLMs têm *viés de completude* e preenchem lacunas com padrões do treino. Diante de «tempo real», o modelo marca `[AMBIGUIDADE]` e `[A CONFIRMAR COM STAKEHOLDER]` e abre uma pergunta, em vez de assumir 200 ms.

### Como funciona
- **Mapa de domínios com confiança:** antes das histórias, o modelo lista os domínios de negócio com confiança alta, média ou baixa. Isso mede a qualidade da *conversa* de discovery, não a do modelo. Domínio de confiança baixa é a pauta da próxima entrevista. Se a transcrição for ruidosa, peça só o mapa de cobertura antes de gerar histórias.
- **Pipeline:** linguagem natural, system prompt, mapa de domínios, User Story com Gherkin, card Jira pronto para refinamento (slide do módulo 1.2).
- **Linguagem do stakeholder preservada:** os papéis são registrados como foram ditos («operador de despacho») e só traduzidos para papéis técnicos no refinamento, mantendo a ligação entre a fala do cliente e a documentação.
- **Perguntas em aberto e edge cases:** o que não pode ser definido vira pergunta pendente; situações excepcionais mencionadas («escalar se o operador não responder») viram cenários Gherkin testáveis.
- **Dependências não declaradas:** depois de gerar as histórias, o modelo é instruído a listar integrações, APIs, serviços e decisões de arquitetura que as histórias exigem mas ninguém citou. Isso antecipa perguntas do Sprint Planning enquanto o stakeholder ainda está disponível.
- **Contra um prompt genérico:** o prompt genérico entrega um documento visualmente organizado, mas com papéis genéricos, critérios descritivos, ambiguidades escondidas e decisões técnicas inferidas. A falsa sensação de qualidade é o maior perigo.
- **Prompt como artefato de software:** o slide do módulo trata o system prompt como infrastructure as code, versionado no git com changelog (v1.0, v1.1 após curadoria, v1.2 com papéis por domínio).
- **Hierarquia de escopo:** épico (2 a 8 semanas), feature, User Story (fatia de sprint, no máximo 8 pontos) e task. O Copilot trabalha até a story e não desce a tasks.

### Onde aplicar
- Transformar a transcrição de uma reunião de kickoff ou discovery em backlog inicial com perguntas explícitas para a próxima conversa com o cliente.
- Usar o mapa de domínios como roteiro de discovery: onde a confiança é baixa, voltar ao stakeholder.
- Reaproveitar o mesmo prompt em vários projetos trocando só o bloco «contexto de projeto» (domínio, perfis, sistema legado, restrições, compliance, prazo, glossário).
- Modo rápido para validar em reunião: só histórias com INVEST, perguntas em aberto e cards.

### Vantagens e limites
**Vantagens**
- Reduz o esforço de partir do zero e padroniza o formato do backlog.
- Torna lacunas visíveis (perguntas em aberto) em vez de escondê-las em texto bonito.
- Critérios Gherkin automatizáveis aproximam requisito e teste.

**Limites**
- O modelo não conhece contratos, SLAs, hardware, regras internas nem restrições do legado.
- Qualidade da transcrição limita tudo: ruído gera mapa de domínios fraco.
- Modelos pequenos (7B a 13B) tendem a ignorar seções do prompt, segundo a nota de adaptação.

### 🚫 Armadilhas
- Confiar na formatação: uma história pode ter papel, INVEST e Gherkin impecáveis e descrever algo que ninguém pediu.
- Deixar o bloco «contexto de projeto» sem preencher: o prompt tem campos obrigatórios para isso.
- Tratar baixa confiança de domínio como defeito do modelo, quando é um sinal sobre a conversa.

> 💡 **Dica:** Regra de ouro: toda User Story deve ser rastreável a um trecho da transcrição. Sem origem localizável, é candidata a alucinação.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Requirements Copilot | LLM com system prompt estruturado que gera artefatos de requisitos |
| INVEST | Independent, Negotiable, Valuable, Estimable, Small, Testable |
| Gherkin | Formato Dado, Quando, Então para critérios de aceite verificáveis |
| Viés de completude | Tendência do LLM de preencher lacunas com o que parece plausível |
| [A CONFIRMAR COM STAKEHOLDER] | Marca que substitui qualquer número não informado |
| Mapa de domínios | Lista de domínios de negócio com nível de confiança (alta, média, baixa) |
| WBS | Épico, feature, User Story, task |
| Prompt versioning | Versionar o system prompt no git, com changelog, como código |

---

## 💻 No código do repo

**Projeto:** [modulo-01-planejamento-e-escopo (prompt, transcrição e output)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-01-planejamento-e-escopo)

O artefato central é o `requirements-copilot-system-prompt.md` (v1.2), uma instrução de uns 17 KB com dois modos (completo e rápido) e um formato de saída de 9 seções. Ao lado ficam a transcrição de discovery usada como entrada e o output de referência gerado no AI Studio.

**Fluxo**
1. `requirements-copilot-system-prompt.md`: o bloco para colar em System Instructions define o papel (analista, não transcritor), os modos *completo* (9 seções) e *rápido* (seções 4, 5 e 7), INVEST obrigatório, Gherkin com mínimo happy path mais edge case, WBS e a detecção de cinco anti-padrões: voz passiva sem sujeito, resultado não verificável, escopo implicitamente infinito, requisito duplo e dependência circular.
2. O mesmo arquivo traz o protocolo de ambiguidade por categoria (desempenho, escala, segurança, integração, aprovação), o tratamento de múltiplos stakeholders com `[CONFLITO]` e `[VALIDAR COM EQUIPE]` e as quatro flags de risco: `[ESPECIFICAÇÃO INVENTADA]`, `[DEPENDÊNCIA NÃO MAPEADA]`, `[VIABILIDADE TÉCNICA SILENCIOSA]` e `[GOLD PLATING]`.
3. Formato de saída: 1 mapa de domínios, 2 stakeholders, 3 épicos, 4 User Stories, 5 perguntas em aberto, 6 flags de risco, 7 cards prontos para Jira, 8 dependências não declaradas e 9 diagrama Mermaid. O rodapé obriga o aviso de que o output é rascunho e exige revisão humana.
4. `transcricao-discovery-routewise.md`: reunião de 35 minutos (Whisper, revisão mínima) entre Carlos, Marcus e Priya. Fatos úteis para conferir o output: 140 veículos, sistema de 2016, «tempo real» sem número, dispositivos novos com bateria e acelerômetro e antigos sem, RH com API desconhecida, manutenção preditiva como fase 2 (duas planilhas, dois anos), LGPD sem resposta e deadline no board de julho.
5. `output-demo-m1.2-v1.0.md`: Gemini 3.1 Pro Preview, temperatura 0,3. Traz 5 domínios (Alta, Alta, Média, Alta, Baixa), 3 épicos, 3 User Stories, 5 perguntas em aberto, 4 flags, 2 cards e um fluxograma Mermaid.
6. `exemplo-diagrama-mermaid.md`: diagrama do épico de monitoramento de velocidade; o nó «Canal de notificação ativo?» é a dependência que o modelo sinalizou como `[AMBIGUIDADE]`.
7. `nota-adaptacao-modelos.md`: como usar o prompt no Claude (projeto com Project Instructions), ChatGPT (GPT personalizado, temperatura 0,3 a 0,5), Azure OpenAI e Ollama (Llama 3.1 70B funciona; 7B a 13B ignoram seções), com a frase de reforço para saídas incompletas.
8. `Atividade - Módulo 1.pdf` e `Exemplo - Módulo 1.pdf` (6 páginas): o exemplo traz o output completo do Copilot para a transcrição, dois pontos de falha analisados (um deles mostra que um `[A CONFIRMAR]` sem dono vira lacuna) e a comparação entre a v1 e a v2 do prompt.

**Como rodar**
- No AI Studio, crie um prompt novo, cole o bloco do `requirements-copilot-system-prompt.md` em System Instructions (salve como Gem) e **preencha o bloco «contexto de projeto»**, que vem com colchetes.
- Cole o conteúdo de `transcricao-discovery-routewise.md` na mensagem do usuário, com temperatura 0,3.
- Compare com `output-demo-m1.2-v1.0.md`. Atividade 1: documente o output, ache pelo menos dois erros (especificação inventada, dependência, viabilidade ou gold plating), ajuste o prompt e compare a v2.

**Armadilhas e achados no código**
- O output de referência contradiz o próprio prompt: as histórias US01, US02 e US03 têm `[INVEST-FAIL]`, e o prompt manda que história com falha não gere card (deve aparecer como `[BLOQUEADA]`); mesmo assim a seção 7 entrega cards para duas delas.
- O cabeçalho do output cita prompt v1.1 e transcrição de 14/04/2025; o arquivo do prompt é v1.2 e a transcrição é de 14/04/2026.
- O output marca `[CONFLITO]` entre o desejo de Carlos pelo acelerômetro e o hardware antigo. Isso é leitura do modelo (a transcrição não registra conflito entre pessoas) e vale como exemplo de ponto para curadoria.
- O prompt tem 17 KB: modelos pequenos podem ignorar seções, e a nota de adaptação recomenda 70B ou mais para rodar local.

---

## 🔗 Para ir além
- [Pasta do módulo 1 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-01-planejamento-e-escopo)
- [Repositório oficial do módulo 07 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos)
- [Indicação 3: A Prompt Pattern Catalog (White et al., 2023)](https://arxiv.org/abs/2302.11382)
- [Indicação 6: Systematic Survey of Prompt Engineering (Sahoo et al., 2024)](https://arxiv.org/abs/2402.07927)
- [Indicação 12: The Scrum Guide (Schwaber e Sutherland)](https://scrumguides.org)
- [Relatório 10: MIT NANDA, The GenAI Divide (2025)](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- [Relatório 11: BCG, The Widening AI Value Gap (2025)](https://bcg.com/publications/2025/are-you-generating-value-from-ai-the-widening-gap)
- [Relatório 12: Gartner, AI Projects in I&O Stall (2026)](https://gartner.com/en/newsroom/press-releases/2026-04-07-gartner-says-artificial-intelligence-projects-in-infrastructure-and-operations-stall-ahead-of-meaningful-roi-returns)
- [Google AI Studio](https://aistudio.google.com/)

---

⬅️ [00 · IA como copiloto de gestão de projetos e o caso RouteWise](./00-ia-copiloto-e-caso-routewise.md)  ·  [Guia de leitura](./README.md)  ·  [02 · Curadoria de requisitos: as quatro alucinações e o backlog no Jira](./02-curadoria-de-requisitos-e-backlog-no-jira.md) ➡️
