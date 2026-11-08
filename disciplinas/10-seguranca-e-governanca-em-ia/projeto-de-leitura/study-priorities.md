# 🎯 Disciplina 10 · O que vale estudar

> Análise de prioridade (opinião fundamentada no guia e na prática atual), não conteúdo da apostila. Premissas: engenheiro de software backend (TypeScript/Node e Python, APIs em nuvem AWS, Postgres, filas e jobs) com LLMs em produção, automação de fluxos e uso intenso de agentes de código; objetivo de se tornar engenheiro de IA aplicada especialista (construir, avaliar, operar e governar), não pesquisador de modelos.

## Veredito
Esta disciplina mistura duas coisas de valor muito diferente para quem implementa. O núcleo que vale ouro são os tópicos 07 a 09 (OWASP Top 10 para LLMs, os cinco casos e prompt injection/guardrails) mais o pedaço de custo do tópico 14; o 10 (red team) é prática de aprofundamento. O resto (regulação, geopolítica, custo ambiental, ética) é contexto para decisões e conversas com o negócio, não algo que você implementa.
Nota: ⭐⭐⭐⭐ (4/5). Os cinco casos do tópico 08 são um excelente roteiro de design review, mas o conteúdo técnico é introdutório e o guia avisa que são cenários didáticos, não incidentes documentados.
Mais útil para quem coloca LLM e agentes em produção e precisa justificar controles (privilégio mínimo, aprovação humana, teto de custo) com vocabulário compartilhado.

## Mapa de prioridade por tópico

| Tópico | Dia a dia | Especialista | Veredito |
|---|---|---|---|
| [00 · Governança de IA](./00-governanca-de-ia.md) | 🟡 | 🟡 | Conhecer (a planilha de inventário vale fazer) |
| [01 · Fontes e leitura crítica](./01-fontes-e-leitura-critica.md) | 🟡 | 🟡 | Conhecer |
| [02 · Trustworthy AI, interpretabilidade e explicabilidade](./02-trustworthy-ai-interpretabilidade-explicabilidade.md) | ⚪ | 🟡 | Conhecer |
| [03 · SHAP, LIME e Integrated Gradients](./03-shap-lime-integrated-gradients.md) | ⚪ | ⚪ | Pular (voltar só se tiver modelo tabular em produção) |
| [04 · Vieses em IA](./04-vieses-em-ia.md) | 🟡 | 🟡 | Conhecer |
| [05 · IA responsável e caso da triagem](./05-ia-responsavel-e-caso-triagem.md) | 🟡 | 🟡 | Conhecer |
| [06 · Aspectos humanos, ética e NIST](./06-aspectos-humanos-e-desafios-eticos.md) | 🟡 | 🟡 | Conhecer (o NIST AI RMF) |
| [07 · OWASP Top 10 para LLMs](./07-owasp-top-10-llm-novo-cenario.md) | 🟢 | 🟢 | Implementar |
| [08 · Cinco casos de segurança](./08-cinco-casos-de-seguranca-owasp.md) | 🟢 | 🟢 | Implementar |
| [09 · Prompt injection, jailbreak e guardrails](./09-prompt-injection-jailbreaking-guardrails.md) | 🟢 | 🟢 | Implementar |
| [10 · Pentest, Red/Blue/Purple Team](./10-pentest-red-blue-purple-team.md) | 🟡 | 🟢 | Aprofundar |
| [11 · Por que regular, Collingridge e lobby](./11-por-que-regular-collingridge-e-lobby.md) | ⚪ | ⚪ | Pular |
| [12 · Tipos de regulação e EU AI Act](./12-tipos-de-regulacao-e-eu-ai-act.md) | ⚪ | 🟡 | Conhecer |
| [13 · Geopolítica, Efeito Bruxelas e Brasil](./13-geopolitica-efeito-bruxelas-e-brasil.md) | ⚪ | 🟡 | Conhecer (leia "O que fazer como engenheiro"; os 3 polos geopolíticos ficam em Pular) |
| [14 · Custos financeiros, CAPEX/OPEX e redução](./14-custos-financeiros-capex-opex-e-reducao.md) | 🟢 | 🟢 | Implementar |
| [15 · Custo ambiental e data centers](./15-custo-ambiental-data-centers-e-energia.md) | ⚪ | ⚪ | Pular |
| [16 · Treino, inferência, refrigeração e PUE](./16-treinamento-inferencia-refrigeracao-pue-agua-ou-energia.md) | ⚪ | ⚪ | Pular (só a ideia de que inferência domina) |
| [17 · Revisão integrada](./17-revisao-integrada.md) | 🟡 | 🟡 | Conhecer |

Separação pedida: **implementável** = 07, 08, 09 e 14 (com 00 como inventário e a parte de LGPD do 13); o 10 é prática de aprofundamento. **Contexto de governança, regulação e geopolítica** = 00 a 06, 11, 12, 13, 15, 16: valioso para decisões, não para codar.

## ✅ Implemente no dia a dia

1. **Privilégio mínimo e aprovação humana para agentes e tools**
   - Por quê: o caso do deploy sem aprovação (excessive agency) é o risco mais caro do seu dia a dia com agentes de código e automações. Na prática, o que a comunidade faz: separar "propor" de "executar".
   - Primeiro passo mínimo: liste as tools de um agente e classifique cada uma em leitura, escrita reversível e ação destrutiva ou irreversível. Credencial só de leitura por padrão; ação irreversível exige confirmação humana explícita.
   - Quando não adotar: ferramenta puramente de leitura sobre dado público; aprovação em toda chamada gera fadiga e vira clique automático, então reserve para ação crítica.
   - Tópicos: [08](./08-cinco-casos-de-seguranca-owasp.md) (casos 1 e 3), [07](./07-owasp-top-10-llm-novo-cenario.md).

2. **Saída do modelo como entrada não confiável**
   - Por quê: o caso do agente de suporte com SQL destrutivo mostra a regra: o controle fica fora do modelo e é determinístico (parametrização, allowlist).
   - Primeiro passo mínimo: valide toda saída estruturada com schema (Zod em TypeScript, Pydantic em Python) e use query parametrizada e conta de banco sem permissão de escrita nas tools de consulta.
   - Quando não adotar: texto exibido só para leitura humana, sem execução nem inserção em outro sistema, dispensa mais que escape normal.
   - Tópicos: [08](./08-cinco-casos-de-seguranca-owasp.md), [07](./07-owasp-top-10-llm-novo-cenario.md).

3. **Autorização no RAG e segredos fora do contexto**
   - Por quê: o caso da IA de RH mostra que o erro não foi do LLM, foi a camada de recuperação sem RBAC. O guia também é claro: segredo no prompt já é desenho errado.
   - Primeiro passo mínimo: filtre os documentos recuperados pelo perfil do usuário na query do retriever (antes de o texto chegar ao prompt) e remova qualquer chave ou credencial do prompt, usando secrets manager.
   - Quando não adotar: base de conhecimento 100% pública, onde todo usuário já pode ler tudo.
   - Minha análise (caso 4, supply chain): modelo aberto de repositório não verificado pode vir envenenado. Fixe versão e hash de modelo e pacote, prefira formatos que não executam código na carga (safetensors em vez de pickle, quando aplicável) e registre a proveniência antes de promover a produção.
   - Tópicos: [08](./08-cinco-casos-de-seguranca-owasp.md) (casos 2 e 4), [09](./09-prompt-injection-jailbreaking-guardrails.md).

4. **Teto de custo e rate limit em todo endpoint de LLM**
   - Por quê: Denial of Wallet (LLM10) é barato de explorar e o custo de contexto longo é real. Une segurança e custo.
   - Primeiro passo mínimo: limite de tamanho de entrada, rate limit por usuário, teto diário de gasto com alerta, e estimativa de custo por requisição e por mês com cenário "10x".
   - Quando não adotar: ferramenta interna de poucos usuários conhecidos precisa do teto e do alerta, mas não de rate limit sofisticado.
   - Tópicos: [08](./08-cinco-casos-de-seguranca-owasp.md) (caso 5), [14](./14-custos-financeiros-capex-opex-e-reducao.md).

5. **Roteamento por dificuldade e cache como alavancas de custo**
   - Por quê: o guia lista prompt caching, routing, RAG enxuto e modelo menor; minha análise: routing e contexto enxuto dão o maior retorno com menos risco.
   - Primeiro passo mínimo: meça tokens de entrada e saída por tipo de tarefa e mande classificação e extração para um modelo menor, com um conjunto de testes para provar que a qualidade se mantém.
   - Quando não adotar: volume baixo, onde a complexidade do roteamento custa mais que a economia; quantização só faz sentido se você hospeda o modelo (confira se isso se aplica ao seu caso).
   - Tópico: [14](./14-custos-financeiros-capex-opex-e-reducao.md).

6. **LGPD em decisão automatizada: revisão humana, minimização e linhagem de dados**
   - Por quê: o tópico 13 lembra que a LGPD (Lei 13.709/2018) já vale e prevê revisão humana de decisão exclusivamente automatizada, além de rastreabilidade da origem dos dados. Não é preciso esperar lei específica de IA para cumprir isso.
   - Primeiro passo mínimo: para cada fluxo que decide sobre pessoas, registre se há revisão humana possível, quais dados pessoais entram no prompt (só os necessários) e de onde vieram os dados de treino ou de contexto.
   - Quando não adotar: fluxo que não toca dado pessoal nem decide sobre pessoas. Residência de dados e plano B de provedor entram só se o contrato ou o risco pedirem.
   - Tópico: [13](./13-geopolitica-efeito-bruxelas-e-brasil.md) (seção "O que fazer como engenheiro").

## 🔬 Aprofunde (rumo a especialista)

1. **Prompt injection indireta e defesa em profundidade**
   - Por que diferencia: o problema central (dado e instrução misturados no contexto) não tem solução perfeita; especialista projeta o raio de dano, não aposta no prompt.
   - Estudar além da aula: OWASP Top 10 for LLM Applications 2025 completo, o material da OWASP sobre agentes (confira a versão atual) e leituras sobre separação entre dado e instrução em sistemas com ferramentas.
   - Praticar: pegue uma feature sua que lê conteúdo externo (e-mail, ticket, documento) e escreva 10 variações de ataque; meça quantas passam e verifique que o dano máximo, mesmo com sucesso, é contido pelas permissões.
   - Tópico: [09](./09-prompt-injection-jailbreaking-guardrails.md).

2. **Avaliação de segurança como teste estocástico e versionado**
   - Por que diferencia: o guia mostra um guardrail que falhou no jailbreak por personagem depois de recusar o ataque simples. Quem mede taxa de sucesso e não "passou uma vez" opera com mais confiança.
   - Estudar: OWASP GenAI Red Teaming Guide (link no guia) e documentação do framework de avaliação que você já usa.
   - Praticar: crie um conjunto versionado de ataques rodado no CI com N repetições por caso e um limite de taxa de falha que bloqueia o merge.
   - Tópicos: [09](./09-prompt-injection-jailbreaking-guardrails.md), [10](./10-pentest-red-blue-purple-team.md).

3. **Red/Purple team aplicado a RAG e agentes**
   - Por que diferencia: pentest pontual versus red team por objetivo, e o ciclo Purple (achado vira detecção ou controle e é retestado) é o que reduz risco de fato.
   - Estudar: OWASP GenAI Red Teaming Guide; o guia reforça que RAG, ferramentas e pessoas entram no escopo, não só o modelo.
   - Praticar: faça um exercício autorizado de uma tarde contra seu ambiente de homologação, registre cada achado com o controle correspondente e reteste.
   - Tópico: [10](./10-pentest-red-blue-purple-team.md).

4. **Observabilidade e auditoria de agentes**
   - Por que diferencia: a lista de controles do guia inclui logs e monitoramento; sem trilha, não há como investigar nem governar. Lacuna da aula, mas necessária na prática.
   - Estudar: documentação do OpenTelemetry (minha análise: padrão de observabilidade que cabe aqui; o guia não o cita) e boas práticas de logs estruturados.
   - Praticar: registre, para cada chamada de tool de um agente, usuário, parâmetros, decisão de aprovação e custo, e consiga reconstruir uma sessão inteira só pelos logs.
   - Tópicos: [07](./07-owasp-top-10-llm-novo-cenario.md), [08](./08-cinco-casos-de-seguranca-owasp.md).

5. **NIST AI RMF como estrutura de governança operável**
   - Por que diferencia: Govern, Map, Measure, Manage dão um esqueleto simples e contínuo para conversar com risco e jurídico sem virar burocracia.
   - Estudar: texto do NIST AI RMF (link no guia do tópico 06).
   - Praticar: preencha a planilha de inventário do tópico 00 para os usos de IA do seu time (ferramenta, quem usa, dado envolvido, risco, homologada) e mapeie uma delas nas quatro funções.
   - Tópicos: [00](./00-governanca-de-ia.md), [06](./06-aspectos-humanos-e-desafios-eticos.md).

## 🧂 Pode ficar no superficial
- **Regulação (11, 13):** o tópico 11 é repertório. No 13, leia só "O que fazer como engenheiro" (LGPD, ver item 6 de Implemente). Minha análise: leia a fonte primária só quando seu produto cair num caso de uso sensível; resumo antigo engana (o próprio guia avisa para checar versão e prazos).
- **EU AI Act e tipos de regulação (12), Conhecer:** classifica por caso de uso e risco (inaceitável, alto, limitado, mínimo). As obrigações variam com o papel na cadeia (desenvolvedor, integrador, usuário corporativo), transparência funciona como controle (avisar que é IA, rotular conteúdo sintético) e RH/recrutamento é alto risco.
- **Collingridge, lobby e os 3 polos geopolíticos (11 e 13):** bom repertório para entender por que regras mudam, mas essa parte não gera decisão de código; a parte de LGPD do 13 gera (ver Implemente).
- **SHAP, LIME e Integrated Gradients (03):** relevantes para modelos tabulares e de classificação. Para quem consome LLMs por API, quase nunca aplicável; volte se treinar ou avaliar modelo próprio.
- **Custo ambiental, PUE e refrigeração (15, 16):** retenha só que inferência contínua pode superar o treino e que reduzir tokens ajuda custo e impacto. O guia avisa que parte dos dados vem de slides em resumo.
- **Vieses e ética (04, 05, 06):** úteis se seu produto decide sobre pessoas (triagem, crédito); caso contrário, o ponto prático é testar desempenho por subgrupo, não só a média.

## ⚠️ Cuidados e lacunas
- A lista OWASP envelhece: o guia manda conferir versão e ano, e menciona que já existe material para agentes. Trate o Top 10 como checklist de perguntas, não como lista para decorar.
- O guia declara que os cinco casos são cenários didáticos simplificados e que cobrem só seis dos dez riscos (faltam envenenamento, vazamento de prompt, embeddings e desinformação).
- A demo do notebook é ilustrativa: a saída gravada do jailbreak contém conteúdo operacional, então não reutilize nem republique; o guia também nota o SDK sem versão fixada.
- Lacunas da aula (minha análise): sandboxing de execução de código por agentes, gestão de segredos e rotação, controle de permissões de MCP/tools de terceiros, e avaliação de segurança no CI. Preencha com a prática, não com a apostila.
- Guardrail nunca é controle único: o guia é explícito de que mitigação perfeita não existe, só redução de risco por camadas.

## ✔️ Como saber que aprendeu
- Consigo, sem consultar, desenhar para um agente com tools a classificação de ações (leitura, escrita reversível, irreversível), onde entra aprovação humana e qual credencial cada uma usa.
- Meu serviço com LLM tem verificável: validação de saída por schema, filtro de autorização na recuperação do RAG, nenhum segredo no prompt, e rate limit com teto de gasto e alerta.
- Tenho um conjunto versionado de ataques (injeção direta, indireta, jailbreak) rodando com repetições e uma taxa de falha medida, e sei explicar por que "recusou uma vez" não prova segurança.

Veja também a [trilha consolidada](../../study-roadmap.md).
