# 00 · IA como copiloto de gestão de projetos e o caso RouteWise

> **Introdução · Mapa da disciplina · Revisão final** · Leitura: ~7 min · Bloco: Visão geral e o caso RouteWise

## 🎯 Em uma frase
A disciplina usa a IA como **copiloto**: dez prompts reutilizáveis, encadeados sobre um caso único (o **RouteWise**), cobrem do discovery aos OKRs. Cada artefato alimenta o próximo, e em todos a decisão final continua humana.

---

## 👵 Explicando para a vovó

Pense num sous-chef muito rápido numa cozinha de restaurante. Ele pica, mede, organiza a bancada e adianta os molhos, mas quem prova o prato, decide se sai ou volta e responde ao cliente é o chef. A IA desta disciplina é esse sous-chef: faz o trabalho repetitivo e aponta o que viu de estranho. O gerente de projeto continua sendo o chef.

A cozinha tem uma regra de ouro: receita bagunçada não vira prato bom só porque o ajudante é rápido. Se o processo do projeto é confuso, a IA só produz documentos confusos mais depressa.

---

## 🔧 Tecnicamente

### O que é
- **IA como copiloto, não como substituta:** a apostila diz que a IA organiza informação, identifica padrões, automatiza tarefas repetitivas e acelera análises. Decisões de estratégia, prioridade, avaliação de risco e interpretação de contexto seguem sendo humanas.
- **O caso único:** a Conecta Cargas, empresa de logística com cerca de 140 veículos, migra de um sistema legado (de 2016, segundo a transcrição) para o RouteWise, uma plataforma de gestão de frota. Quem conduz é Carlos Mendonça, diretor de operações. Tudo nasce de uma reunião de discovery de uns 35 minutos entre Carlos, o consultor Marcus e Priya, de TI/infra.
- **As 10 ferramentas:** Requirements Copilot ([M1](./01-requirements-copilot-system-prompt-como-contrato.md)), Backlog Scorer ([M2](./04-backlog-scorer-contexto-flags-e-calibracao.md)), Scheduling Prompt ([M3](./05-cronograma-adaptativo-dependencias-capacidade-what-if.md)), Probability Forecast ([M4](./07-monte-carlo-p50-p85-p95.md)), Risk Monitor ([M5](./08-aiops-de-projeto-metricas-de-fluxo-e-risk-monitor.md)), Meeting Digest ([M6](./09-meeting-digest-ata-acoes-e-cards-jira.md)), Status Report ([M7](./10-status-reports-tres-audiencias.md)), Compliance Checklist + Danger ([M8](./11-governanca-como-codigo-e-compliance-checklist.md)), NL to Workflow Bot ([M9](./13-nl-to-workflow-slack-jira.md)) e OKR Aligner ([M10](./14-okrs-alinhamento-de-backlog-e-portfolio.md)).
- **Cadeia, não coleção:** o backlog estruturado alimenta a priorização, que alimenta o cronograma, que sustenta as estimativas probabilísticas, monitoradas pelo cockpit de riscos. As reuniões documentam as decisões que mudam o plano, os relatórios comunicam, a governança garante conformidade, as integrações sincronizam as ferramentas e os OKRs verificam se houve valor.
- **Do output ao outcome:** sucesso deixa de ser só prazo, orçamento e escopo e passa a incluir valor para o negócio, apoio a decisões estratégicas e aprendizado contínuo.

### Como funciona
- Cada módulo do repositório segue o mesmo molde: o prompt (`*-prompt.md`), os dados de entrada, um output de referência (`output-exemplo-*`), o snapshot do board Jira (`jira-estado-board.md`) e a atividade e o exemplo resolvido em PDF.
- Como estudar cada aula, segundo a apostila: ler os objetivos, estudar o conteúdo, abrir a pasta correspondente no GitHub, responder o checkpoint sem consultar o texto e reproduzir o exemplo alterando *uma* decisão pequena e reversível para ver o efeito.
- O motor das demos é o Google Gemini no AI Studio (campo System Instructions, salvando como Gem). A nota de adaptação diz que os prompts funcionam em qualquer modelo com system prompt e uns 8.000 tokens de contexto.
- A temperatura baixa é regra de engenharia, não detalhe: o scorer usa temperatura baixa, o scheduling cerca de 0,3, o forecast cerca de 0,2, o status report cerca de 0,3 e o parser de linguagem natural cerca de 0,3. Em processo auditável, previsibilidade vale mais que criatividade.
- Todo módulo repete o mesmo padrão: contexto rico, restrições de comportamento (nunca invente), saída estruturada e rastreável, flags de incerteza, checklist de curadoria humana e um log para melhorar o prompt ao longo do tempo.
- As indicações de leitura dão o vocabulário: o *Prompt Pattern Catalog* (persona, flipping interaction, chain-of-thought, template pattern) permite analisar os prompts do curso como instâncias de padrões documentados.

### Onde aplicar
- Usar a cadeia como roteiro e começar pelo elo onde mais dói no seu projeto. Nada impede adotar só uma ferramenta, por exemplo o Status Report.
- Fazer, no fim, o inventário das dez ferramentas: para cada uma, uma frase sobre o contexto de uso mais provável e qual delas desperta mais resistência na sua organização (atividade final).
- Usar os prompts como molde para outros domínios: papel, contexto, formato de saída, restrições e checklist de revisão.

### Vantagens e limites
**Vantagens**
- Um caso contínuo gera artefatos que se encaixam, em vez de exemplos soltos.
- Reproduzível: prompt, dado de entrada e output de referência estão na mesma pasta.
- A mesma lógica (contexto, estrutura, flags, curadoria) vale para qualquer ferramenta de IA, não só para o Gemini.

**Limites**
- A qualidade depende do contexto fornecido e da revisão humana.
- Os outputs de referência foram gerados em pré-gravação com um modelo específico (Gemini 3.1 Pro Preview); o seu vai divergir.
- Há inconsistências de números, datas e IDs entre artefatos do repositório (detalhadas na seção de código).

### 🚫 Armadilhas
- Tratar os dez prompts como ferramentas isoladas e perder o encadeamento.
- Aceitar o output pela aparência: texto bem organizado não prova conteúdo correto.
- Esperar que a IA conserte um processo que não existe: ela acelera o que já está bem definido.

> 💡 **Dica:** Na dúvida sobre qual arquivo abrir primeiro, siga a ordem da pasta: prompt, dados, output de referência, atividade.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Copiloto | Apoio especializado que rascunha e organiza; o responsável pelo resultado é o humano |
| Curadoria | Revisão humana sistemática do output da IA antes de ele entrar no processo |
| Rastreabilidade | Poder ligar cada artefato à sua origem (requisito, reunião, decisão, PR) |
| Conecta Cargas | A empresa fictícia do caso (logística, cerca de 140 veículos) |
| RouteWise | O sistema de gestão de frota construído para ela |
| System Prompt | Instrução fixa que define papel, regras e formato de saída do modelo |
| Output vs outcome | O que a equipe entrega versus o efeito disso nos indicadores de negócio |
| AI Studio / Gem | Ambiente do Google onde os prompts rodam; Gem é um prompt salvo para reuso |

---

## 💻 No código do repo

**Projeto:** [modulo07-ferramentas-de-ia-para-gestao-de-projetos (raiz)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos)

Pasta com uma subpasta por módulo (10 no total). Quase tudo é Markdown (prompts, dados de entrada, outputs de referência) e PDF (atividade e exemplo). Código executável existe só nos scripts de Monte Carlo (M4), no verificador Python e no template Danger (M8), no bot Node e no blueprint do Make (M9), além do submódulo `routewise-danger-demo`. Não há pares template/-z nesta disciplina.

**Fluxo**
1. `README.md` da pasta: apresenta o professor (Dr. José Ahirton Batista Lopes Filho), a estrutura das dez subpastas, a stack (Gemini no AI Studio, Jira com Automation Rules nativas do plano gratuito, Node.js e Python, Slack, GitHub Actions, Danger.js) e o passo a passo de uso.
2. Convenção de nomes do README: `*-prompt.md` é o system prompt, `*-input.md`, `transcricao-*.md` e `*.csv` são dados de entrada, `output-exemplo-*` é o output de referência, `jira-estado-board.md` é o snapshot do board, `*.js/*.py/*.json` são códigos e mocks, e os PDFs `Atividade` e `Exemplo - Módulo N` são a missão prática e a versão resolvida.
3. As dez pastas: `modulo-01-planejamento-e-escopo` até `modulo-10-portfolio-e-okrs`, na mesma ordem das unidades da apostila.
4. `.gitignore`: ignora `.DS_Store` e `*.docx`.
5. O README raiz do repositório do curso tem a seção «Modulo 07» com os links das dez ferramentas, as leituras recomendadas (RICE, WSJF, MoSCoW, PERT, Planning Fallacy, IBM Cost of a Data Breach) e as plataformas usadas.

**Como rodar**
- Abra o `*-prompt.md` do módulo, copie o bloco de código para o campo System Instructions do AI Studio (ou da plataforma que você usa) e cole os dados de entrada na mensagem do usuário.
- Compare o seu output com o `output-exemplo-*`: as diferenças são o ponto de partida da curadoria ensinada no módulo. Depois faça a missão prática do PDF.
- Não há `npm install` na raiz. Só M4 (Node ou Python puros), M8 (Python e o submódulo com npm) e M9 (Node, sem `package.json`) exigem ambiente.

**Armadilhas e achados no código**
- Datas e versões: a transcrição de discovery é de 14/04/2026, mas o cabeçalho do `output-demo-m1.2-v1.0.md` e o PDF «Exemplo - Módulo 1» citam 14/04/2025 e o prompt v1.1, enquanto o arquivo do prompt é a v1.2.
- IDs e pontos mudam de artefato para artefato: US-01 vale 8 SP no CSV do Jira e 13 SP no input do M3; US-02 vale 5 ou 8 SP no CSV, 13 SP nos boards do M4 e 34 SP no input do M3; US-04 é o Sensor de Abertura de Baú nos módulos 2 a 5 e é Histórico de Telemetria (US-04a/04b) no CSV e no M10.
- OKR: o KR 1.1 aparece como «reduzir acidentes em 20%» (CSV, M10, slides) e como «sinistros de 7 para 5, cerca de 28%» (M2, M3, apostila, board do M10); o board do M10 descreve o KR 2.1 como «reduzir paradas não planejadas», enquanto o prompt do M10 usa «custo médio de manutenção corretiva -15%».
- O cabeçalho do `sprint-review-s2-routewise.md` (cenário alternativo do M6) avisa que alguns números são alternativos ao snapshot canônico e que ele não serve para validar o Jira da gravação principal.
- `modulo-01/cena-logistica-carlos.wav` (cerca de 3,3 MB, PCM de 24 kHz mono, uns 68 s pelo tamanho do arquivo) não é citado por nenhum documento que li. Não ouvi o áudio e não verifiquei o conteúdo; provavelmente é a fala de uma cena para a etapa voz para texto.
- A apostila alterna «Conecta Cargas» (empresa) e «RouteWise» (sistema) como se fossem o mesmo nome; no repositório os dois são distintos.

---

## 🔗 Para ir além
- [Repositório oficial do módulo 07 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos)
- [Indicação 3: A Prompt Pattern Catalog (White et al., 2023)](https://arxiv.org/abs/2302.11382)
- [Indicação 12: The Scrum Guide (Schwaber e Sutherland)](https://scrumguides.org)
- [Relatório 10: MIT NANDA, The GenAI Divide (2025)](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- [Relatório 11: BCG, The Widening AI Value Gap (2025)](https://bcg.com/publications/2025/are-you-generating-value-from-ai-the-widening-gap)
- [Google AI Studio](https://aistudio.google.com/)
- [Jira Cloud](https://www.atlassian.com/software/jira)
- [Make.com](https://www.make.com/)
- [Danger.js](https://danger.systems/js/)
- [Slack API](https://api.slack.com/)
- Indicação 8: Measure What Matters (Doerr), base do módulo 10

---

[Guia de leitura](./README.md)  ·  [01 · Requirements Copilot: o system prompt como contrato de comportamento](./01-requirements-copilot-system-prompt-como-contrato.md) ➡️
