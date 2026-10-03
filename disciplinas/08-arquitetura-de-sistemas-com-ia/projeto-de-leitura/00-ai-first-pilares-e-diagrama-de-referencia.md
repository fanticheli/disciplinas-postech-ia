# 00 · AI-First: o modelo é só um componente, os 5 pilares e o diagrama de referência

> **Introdução · Módulo 1 · Aulas 1 e 2** · Leitura: ~12 min · Bloco: Fundamentos de Arquitetura AI-First

## 🎯 Em uma frase
Numa arquitetura **AI-First** o modelo generativo é um componente **não determinístico** dentro de um sistema determinístico. O que leva (ou não) o projeto à produção é a arquitetura em volta dele: cinco pilares (não determinismo por design, Approval Gate, observabilidade e auditoria, custo e latência como restrições de primeira classe, degradação graciosa) traduzidos em **Gateway, Orquestrador, Modelo + Tools/RAG, Approval Gate** e uma banda transversal de observabilidade.

---

## 👵 Explicando para a vovó

Imagine um hospital que contrata um estagiário brilhante, porém distraído: dá respostas diferentes para o mesmo caso e quase nunca avisa quando erra. Ninguém o põe na porta decidindo tudo sozinho. Há uma recepção que confere quem entra, uma coordenação comum (gente normal, previsível) que decide o fluxo, o estagiário numa sala própria, um médico-chefe que assina o que é arriscado e câmeras gravando todos os corredores.

O estagiário é o modelo de IA; o hospital inteiro é a arquitetura. A disciplina inteira é sobre construir o hospital, não sobre escolher o estagiário.

---

## 🔧 Tecnicamente

### O que é
- **O case:** a **Vitalis Pharma**, farmacêutica multinacional, quer modernizar a produção de documentos de estudos clínicos (protocolos, Termos de Consentimento Livre e Esclarecido, *Clinical Study Reports*), hoje manual, com revisões sequenciais, cerca de duas semanas só de redação por protocolo e inconsistências entre idiomas. A plataforma de agentes de IA generativa se chama **Trial Forge**. O fio da disciplina: o desafio não é escolher o modelo, é colocá-lo em produção com responsabilidade real sobre o resultado.
- **AI-First** (ou AI-Driven): a IA deixa de ser recurso complementar e assume papel central nas decisões. O Trial Forge começa como agente único e termina como plataforma corporativa compartilhada por vários estudos, equipes e países; cada módulo amplia o anterior sem descartá-lo.
- **O que muda em relação ao software tradicional:** (1) o comportamento deixa de ser determinístico: mesma entrada pode gerar respostas diferentes sem que isso seja erro, então teste por igualdade deixa de servir; (2) o modelo pode estar disponível, rápido e ainda assim responder errado, sem exceção técnica; (3) um agente não só devolve texto, ele executa ações (dispara fluxos, atualiza sistemas, registra documentos), e aí o erro deixa de ser texto incorreto e vira ação executada.
- **Por que projetos falham (dados da aula, fontes nas indicações):** RAND (2025): mais de 80% dos projetos corporativos de IA não entregam o valor esperado (estimativa de terceiros, ressalva a própria indicação); S&P Global (2025): 42% das empresas abandonaram a maioria das iniciativas e descartaram em média 46% dos protótipos antes da produção; Gartner: mais de 40% dos projetos de IA agêntica cancelados até o fim de 2027. Conclusão do professor: modelos de alta qualidade viraram commodity, o diferencial é a arquitetura que os integra de forma segura, previsível e governável.
- **Os cinco pilares:** (1) **não determinismo por design**: testar faixas aceitáveis e confiança mínima, não igualdade; (2) **Approval Gates** (Human in the Loop): onde o erro é caro, a decisão do agente é recomendação que exige aprovação antes de qualquer ação definitiva; (3) **observabilidade + trilha de auditoria**: raciocínio, decisão e ação registrados para reconstruir o histórico, obrigatório em ambiente regulado; (4) **custo e latência** como restrições de primeira classe, desde o início; (5) **degradação graciosa**: fallback quando o modelo falha, hesita ou fica indisponível.

### Como funciona
- **Princípio não é componente.** Princípio é diretriz; componente tem responsabilidades, interfaces e dono. A pergunta de projeto é em qual componente cada pilar será implementado; sem isso a governança fica só em apresentação.
- **Tradução dos pilares:** não determinismo → o **Orquestrador** valida a saída do modelo antes de seguir; Human in the Loop → **Approval Gate**; observabilidade → trilha contínua de eventos com identificador e tempo (parente do tracing distribuído como OpenTelemetry, agora cobrindo decisões de modelo); custo e latência → **roteamento entre modelos** (nem toda requisição precisa do modelo mais caro); degradação graciosa → **fallback** implementado pelo Orquestrador.
- **Gateway:** ponto de entrada. Autenticação, autorização, validação de formato, limite de taxa e primeiro roteamento. Rejeita requisição malformada ou não autenticada antes de gastar qualquer chamada de modelo.
- **Orquestrador:** o 'cérebro determinístico'. Não é modelo de IA, é software tradicional, previsível e testável. Decide quando consultar o modelo, recuperar contexto, acionar ferramentas, pedir dados e validar o resultado. É onde o prompting vira pipeline: construção, enriquecimento, versionamento e gestão do contexto enviado ao modelo.
- **Modelo + Tools/RAG:** o único componente verdadeiramente não determinístico, isolado de propósito para poder trocar modelo, ajustar parâmetros ou mudar a estratégia de recuperação sem tocar no resto. Aqui moram as preocupações de IA responsável: vieses, alucinações, comportamentos inesperados.
- **Approval Gate:** só atua quando o risco passa de um limite definido. Quem define o limite é o negócio (na Vitalis, a responsável pelo processo regulatório), a engenharia implementa. A tela de aprovação é parte da UX: o especialista precisa ver qual decisão o modelo tomou, quais evidências a sustentam e o que exatamente será aprovado. A analogia da aula é o deployment canário: primeiro valida, depois executa.
- **Banda de observabilidade e rótulos dos slides:** não é um quinto passo, é uma banda que atravessa os quatro componentes e permite, meses depois, responder por que um documento foi aprovado. Os slides e o canvas de uma página rotulam cada caixa com uma categoria de padrão de design: Gateway (Optimization), Orquestrador (Prompting), Modelo + Tools/RAG (Responsible AI), Approval Gate (UX) e observabilidade (AI-Ops).
- **Por que o diagrama é linear:** o modelo no centro, ligado a tudo, passa a falsa ideia de que ele controla a aplicação. Grande parte do sistema continua determinística; a disposição linear mostra onde termina o software tradicional e começa o probabilístico.
- **AI Architecture Canvas:** artefato que começa pela tarefa (precisa de julgamento contextual ou resolve com fluxo determinístico?), depois usuário, autenticação, validações no Gateway, construção de contexto, modelos, onde há aprovação, observabilidade e critérios de sucesso.

### Onde aplicar
- Antes de qualquer arquitetura de IA, mapeie os cinco pilares para componentes concretos e diga quem é o dono de cada um.
- Ao avaliar um produto 'agente', pergunte onde está a parte probabilística, onde fica o gate humano e onde está a trilha.
- Em ambiente regulado (saúde, finanças, jurídico), trate trilha de auditoria e aprovação humana como requisito, não como melhoria futura.

### Vantagens e limites
**Vantagens**
- Isolar o não determinismo num componente facilita testar e evoluir o resto como software convencional.
- A trilha de auditoria transforma 'alguém aprovou' em fato verificável.

**Limites**
- Mais peças e mais disciplina do que 'chamar a API de um modelo'.
- O gate humano introduz uma espera que pode ir de minutos a horas.
- O diagrama é simples de propósito: cada caixa se desdobra nos módulos seguintes e o formato linear não cobre sozinho cenários como multiagentes.

### 🚫 Armadilhas
- Colocar o modelo no centro do desenho, ligado a todos os sistemas.
- Testar saída de modelo por igualdade exata.
- Tratar auditoria como 'logs espalhados pela aplicação' em vez de uma trilha contínua com identificadores únicos e tempo.
- Deixar a engenharia sozinha decidir quando há aprovação humana.
- Empurrar custo e latência para uma 'fase de otimização' posterior: sem decisão, quem decide são os valores padrão do desenvolvimento.

> 💡 **Lição dos casos do professor:** visão computacional para detectar trabalhadores sem EPI com câmeras existentes, validação documental de uma seguradora que caiu de 48 horas para 37 segundos (OCR + visão + IA generativa) e detecção de evasão escolar em São Paulo que só produzia evidências e recomendações. Em nenhum o modelo trabalhava sozinho: havia arquitetura para falhas, validação, custo e intervenção humana.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| AI-First / AI-Driven | Arquitetura em que a IA assume papel central nas decisões |
| Não determinismo por design | Aceitar variação de saída e testar faixas/confiança mínima |
| Approval Gate (HITL) | Pausa para aprovação humana quando o risco passa do limite |
| Trilha de auditoria | Registro contínuo e verificável de decisões, chamadas e aprovações |
| Gateway | Entrada: autenticação, validação, limite de taxa, primeiro roteamento |
| Orquestrador | Cérebro determinístico: coordena o fluxo e valida a saída do modelo |
| Degradação graciosa | Fallback previsível quando o modelo falha ou não tem confiança |
| ICF / CSR | Termo de Consentimento Livre e Esclarecido / Clinical Study Report |
| Trial Forge | Plataforma de agentes do case Vitalis Pharma |

---

## 💻 No código do repo

**Projeto:** [modulo-01-fundamentos-ai-first (canvases 1.1 e 1.2 e cheat sheet)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-01-fundamentos-ai-first)

Esta parte do módulo não tem código executável: são canvases em Markdown e PDFs para você preencher com um caso seu, mais um comparativo visual dos três provedores de nuvem contra os cinco blocos do diagrama.

**Fluxo**
1. `ai-first-architecture-canvas.md` (Módulo 1.1): checklist 'agente de IA versus script determinístico' e tabela do case Vitalis (rascunho de TCLE = agente; validar campos obrigatórios = script; propor próxima versão de protocolo = agente com Approval Gate; comparar PT x EN para a FDA = agente), com tabela 'Seu caso'. O critério rápido vira o framework de três perguntas no Módulo 1.3.
2. `reference-architecture-canvas.md` (Módulo 1.2): diagrama Mermaid `flowchart LR` com Gateway, Orquestrador, Modelo + Tools/RAG, Approval Gate e um `subgraph` de Observabilidade ligado aos quatro por setas tracejadas; tabela de referência do Trial Forge e três perguntas-guia (qual componente já existe, qual é o mais arriscado de não ter, quem decide o limiar de risco).
3. `AI-Architecture-Decision-Canvas.pdf` (em branco) e `...-Preenchido-TrialForge.pdf`: canvas de uma página com 10 caixas (tarefa e decisão, entrada/gateway, componente não determinístico, orquestração, Approval Gate, custo e latência, degradação graciosa, observabilidade e auditoria, valor para o usuário final, métricas de sucesso), inspirado no Machine Learning Canvas; a versão preenchida usa a seção condicional de assentimento de menores do ICF.
4. `cheat-sheet-arquiteturas-referencia-clouds.pdf` e `.png`: compara AWS (Agentic AI Lens), Google Cloud (multiagente) e Azure (Foundry baseline chat) contra os cinco blocos, com ressalvas (o Google não unifica Modelo + RAG no mesmo diagrama; na Azure nenhum dos dois documentos cobre os cinco blocos sozinho).

**Como rodar**
- Abra os `.md` no GitHub (o Mermaid renderiza lá) ou num editor com preview Mermaid, e preencha as tabelas 'Seu caso' com um processo real seu.
- Faça o canvas de uma página antes do diagrama: comece pela caixa 'tarefa e decisão' e só depois desenhe os componentes, como a aula faz.
- Compare seu preenchimento com o PDF do Trial Forge somente depois de terminar.

**Armadilhas e achados no código**
- O canvas 1.2 aponta para um artefato interativo hospedado em claude.ai; não verifiquei se ainda está acessível, o PDF e o PNG da pasta são a versão estável.
- O cheat sheet diz que as fontes dos provedores foram verificadas em 27/07/2026 e que o AWS Agentic AI Lens é um 'custom lens' com import manual no Well-Architected Tool: trate o PDF como retrato daquela data.
- Esta pasta não tem `package.json` nem dependências: tudo que roda aqui (o framework do próximo tópico) usa só Node ou Python puros.

---

## 🔗 Para ir além
- [Repositório oficial do módulo 08 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia)
- [RAND: Why AI Projects Fail (PTA2680-1)](https://www.rand.org/pubs/presentations/PTA2680-1.html)
- [S&P Global: Voice of the Enterprise, AI & ML 2025](https://www.spglobal.com/market-intelligence/en/news-insights/research/ai-experiences-rapid-adoption-but-with-mixed-outcomes-highlights-from-vote-ai-machine-learning)
- [Gartner: 40% dos projetos de IA agêntica cancelados até 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)
- [AWS Well-Architected Generative AI Lens](https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/)
- [AWS Well-Architected Agentic AI Lens](https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/)
- [Google Cloud: Reference architectures for RAG](https://docs.cloud.google.com/architecture/rag-reference-architectures)
- [Microsoft: Baseline Foundry Chat reference architecture](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/architecture/baseline-microsoft-foundry-chat)
- [Vídeo: Beyond the Hype, Architecting Systems with Agentic AI (InfoQ Live)](https://www.youtube.com/watch?v=wUkYozIu-Yk)

---

[01 · Agente ou regra? O framework das três perguntas e o orçamento de trade-offs](./01-framework-de-decisao-e-trade-offs.md) ➡️
