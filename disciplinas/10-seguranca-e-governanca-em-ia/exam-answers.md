# 📝 Disciplina 10 · Prova comentada

> Segurança e governança em IA. Cada questão traz o enunciado, a resposta certa, o raciocínio, uma mini-aula dos conceitos citados, o erro de cada alternativa errada e onde se aprofundar no guia de leitura.

**Resumo das respostas**

| Questão | Tema | Resposta |
|---------|------|----------|
| 01 | LIME e explicação local | **C** |
| 02 | Viés por sub-representação no reconhecimento facial | **B** |
| 03 | Resfriamento evaporativo e água | **C** |
| 04 | Governança desde a concepção (Governance by Design) | **E** |
| 05 | RAG para reduzir input tokens e custo | **E** |
| 06 | Dilema de Collingridge | **D** |
| 07 | Excessive Agency, menor privilégio e human-in-the-loop | **C** |
| 08 | Geopolítica dos chips (TSMC, ASML, exportação) | **B** |
| 09 | Mitigação de viés: fairness audits e equipes diversas | **E** |
| 10 | NIST SP 1270 e viés sistêmico | **C** |

---

## Questão 01 · LIME e explicação local

**Pergunta:** A técnica LIME (Local Interpretable Model-agnostic Explanations) foca em qual explicação?

**Alternativas:**
- A) Acurácia de modelos.
- B) Mapeamento direto do gradiente interno de redes profundas.
- C) ✅ Explicação local de previsões individuais em torno de uma instância específica.
- D) Otimização de hiperparâmetros na validação cruzada.
- E) Explicação global da estrutura de pesos de todo o modelo.

**Resposta: C.** Explicação local de previsões individuais em torno de uma instância específica.

### Resolução comentada

O nome já entrega a resposta: o "L" de LIME é de *Local*. Ele responde "por que o modelo tomou ESTA decisão específica para ESTE dado de entrada?", e não "como o modelo funciona em geral?".

Para pensar a questão, separe duas perguntas de explicabilidade: a local (um caso) e a global (o modelo todo). LIME é a ferramenta da primeira. As alternativas que falam de modelo inteiro (E), de gradiente interno (B), de métrica (A) ou de treino (D) descrevem outras coisas.

Um exemplo do guia: explicar a recusa de um crédito para uma pessoa específica é trabalho de LIME. Já entender o padrão geral de um modelo de fraude pede uma visão global, mais próxima do SHAP.

### Entenda os conceitos

- **LIME (Local Interpretable Model-Agnostic Explanations):** explica uma instância específica aproximando o comportamento do modelo perto daquele ponto. É model-agnostic porque só observa entradas modificadas e as saídas, sem abrir o modelo. Analogia do guia: o professor que pega só a prova do João e refaz o raciocínio perto daquele caso.
- **Explicação local x global:** local explica uma decisão individual; global mostra quais variáveis pesam no conjunto do modelo. O guia diz que LIME é local e não descreve o modelo todo.
- **SHAP (SHapley Additive exPlanations):** baseado em teoria dos jogos, decompõe a previsão numa soma de contribuições por variável e permite visão local e global, a um custo computacional maior. Analogia do guia: o professor que mostra, questão por questão, quantos pontos cada resposta somou ou tirou.
- **Model-agnostic:** funciona com qualquer modelo, tratado como caixa-preta, porque trabalha com entradas e saídas.
- **Integrated Gradients:** parte de uma baseline neutra, percorre um caminho até a entrada real e integra a mudança da saída em cada passo (comum em redes neurais). É o que a alternativa B descreve de forma enviesada, e não é o LIME.
- **Escolha do método:** não há resposta universal. Em contexto crítico (medicina, finanças) o guia sugere pensar em SHAP pela visão global; com necessidade pontual e poucos recursos, LIME pode bastar.

### Por que as outras erram

- **A:** acurácia é uma métrica de desempenho do modelo, não uma explicação. LIME explica uma previsão, não mede quão certo o modelo é.
- **B:** mapear o gradiente interno de redes profundas é o território do Integrated Gradients. O LIME não abre o modelo, justamente por ser model-agnostic.
- **D:** otimizar hiperparâmetros na validação cruzada é ajuste de treino, outro assunto.
- **E:** explicar a estrutura global do modelo é o oposto do que o LIME faz. A visão global é mais associada ao SHAP.

### Aprofundar no guia

- [03 · SHAP, LIME e Integrated Gradients](./projeto-de-leitura/03-shap-lime-integrated-gradients.md), seção "O que é": definição de cada técnica; a analogia da prova corrigida está em "Explicando para a vovó".
- [03 · SHAP, LIME e Integrated Gradients](./projeto-de-leitura/03-shap-lime-integrated-gradients.md), seção "Como funciona": como escolher entre SHAP e LIME conforme a criticidade.
- [02 · Trustworthy AI, interpretabilidade e explicabilidade](./projeto-de-leitura/02-trustworthy-ai-interpretabilidade-explicabilidade.md), seção "Como funciona": a regra "quanto maior o impacto da decisão, mais importante poder explicá-la".

*Código da questão: 179770*

---

## Questão 02 · Viés por sub-representação no reconhecimento facial

**Pergunta:** Um sistema de reconhecimento facial acerta muito para homens de pele clara, mas falha com mulheres de pele escura. Qual é a causa raiz mais provável?

**Alternativas:**
- A) A resolução baixa das câmeras.
- B) ✅ A sub-representação (falta de diversidade) de imagens de mulheres de pele escura no conjunto de treino.
- C) Redes neurais não funcionam bem com imagens coloridas.
- D) Incompatibilidade de formato de arquivo entre treino e validação.
- E) Treino longo demais, causando overfitting.

**Resposta: B.** Sub-representação (falta de diversidade) de imagens de mulheres de pele escura no conjunto de treino.

### Resolução comentada

O padrão do erro é a pista: o sistema não falha de forma aleatória, falha sempre para o mesmo grupo. Erro que cai sempre para o mesmo lado é viés, e viés de desempenho por subgrupo costuma nascer nos dados. Se o dataset quase não tem exemplos de um subgrupo, o modelo não aprende a reconhecê-lo.

Uma causa técnica geral (câmera, formato, overfitting) afetaria todo mundo ou aleatoriamente. Só a falta de exemplos de um grupo explica a falha concentrada nele.

Isso também mostra a armadilha da acurácia média: o sistema pode ter número global alto e ainda errar muito mais para um grupo. Por isso o guia insiste em olhar o erro por grupo.

### Entenda os conceitos

- **Viés:** efeito que reduz a representatividade de um resultado e produz distorção sistemática. Analogia do guia: erro aleatório é a balança errar um pouco hoje e outro pouco amanhã; viés é a balança sempre marcar dois quilos a mais. Se foi calibrada só com um tipo de pessoa, erra mais para as outras.
- **Sub-representação:** grupos com pouca presença nos dados de treino. O guia lembra que não é só minoria numérica: grupos grandes com pouco poder ou pouca presença nas fontes também aparecem pouco.
- **Viés estatístico/computacional:** a ponta do iceberg do NIST (população versus amostra, sub-representação, erro maior para um grupo, qualidade da distribuição). É a categoria em que esta questão se encaixa.
- **Acurácia média x erro por grupo:** acurácia alta pode esconder erro maior em um grupo. Métricas devem ser desagregadas.
- **Overfitting:** o modelo decora o treino e generaliza mal. Gera erro em dados novos de modo geral, não concentrado num grupo (complemento, fora do material).
- **"Viés by design":** perguntar logo no início se o dataset representa a população e se há grupos ausentes. Quanto mais cedo, mais barato corrigir.

### Por que as outras erram

- **A:** câmera de baixa resolução piora a imagem para todos. O enunciado descreve acerto alto para um grupo e erro para outro, o que aponta para os dados.
- **C:** redes neurais lidam bem com imagens coloridas. A afirmação é falsa e, além disso, não explicaria diferença entre grupos.
- **D:** formato de arquivo incompatível quebraria o pipeline inteiro, não um subgrupo específico.
- **E:** overfitting é erro de generalização em geral. O sintoma aqui é um padrão sistemático por grupo, característico de dados pouco representativos.

### Aprofundar no guia

- [04 · Vieses em IA: tipos, origens e mitigação](./projeto-de-leitura/04-vieses-em-ia.md), seção "O que é": sub-representação e os três grupos do iceberg; a analogia da balança está em "Explicando para a vovó".
- [04 · Vieses em IA: tipos, origens e mitigação](./projeto-de-leitura/04-vieses-em-ia.md), seção "Armadilhas": olhar só a performance média.
- [05 · IA responsável e o caso da triagem hospitalar](./projeto-de-leitura/05-ia-responsavel-e-caso-triagem.md), seção "O que é": métricas desagregadas por grupo e auditoria de dados brutos.

*Código da questão: 179772*

---

## Questão 03 · Resfriamento evaporativo e água

**Pergunta:** GPUs em data centers geram calor extremo. Para evitar superaquecimento sem disparar o consumo elétrico, empresas usam resfriamento evaporativo. Qual é o principal impacto socioambiental direto dessa prática?

**Alternativas:**
- A) Acidificação das chuvas locais pelo vapor das torres.
- B) Emissão direta de CFC, que destrói o ozônio mais que o setor automotivo.
- C) ✅ Retirada e evaporação de grandes volumes de água potável local, pressionando os recursos hídricos da região.
- D) Contaminação dos oceanos por metais pesados dos tubos.
- E) Redução da umidade na estratosfera, alterando o clima global.

**Resposta: C.** Retirada e evaporação de grandes volumes de água potável local, pressionando os recursos hídricos da região.

### Resolução comentada

Pergunte como o método funciona: a água evapora e, ao evaporar, absorve calor (o mesmo efeito do suor). Logo, o "combustível" desse resfriamento é água, e ela é consumida, não só circulada: parte vai para a atmosfera.

A vantagem é gastar menos eletricidade. O custo é transferido para a água, e isso pesa mais em regiões áridas ou com escassez hídrica. A resposta é a única que descreve esse mecanismo.

As demais citam problemas ambientais reais em outros contextos (chuva ácida, CFC, metais, estratosfera), mas nenhum é consequência direta da evaporação de água em torres de data center.

### Entenda os conceitos

- **Resfriamento evaporativo:** a água evapora e absorve calor. Mais eficiente eletricamente (PUE baixo), mas consome grandes volumes de água, com parte perdida para a atmosfera; delicado em regiões de escassez.
- **Resfriamento a ar:** ventiladores e ar-condicionado; consumo de água baixo ou próximo de zero, mas custa mais eletricidade (pior em clima quente) e pode pressionar a rede elétrica.
- **Free cooling (ar natural) e circuito fechado:** o primeiro usa o ar externo em climas frios (ex.: Islândia); o segundo faz um líquido refrigerante circular sobre os chips. Ambos reduzem a água, com outros custos (clima, CAPEX, descarte).
- **PUE (Power Usage Effectiveness):** energia total do data center dividida pela energia dos equipamentos de TI. 1,0 é o ideal teórico; quanto menor, melhor. Não mede água nem a origem da energia.
- **Estresse hídrico:** a demanda por água compete com a oferta (empresas, agricultura, moradores). Um data center em região de pouca disponibilidade pode disputar água com necessidades locais.
- **Não existe método perfeito:** cada solução desloca custos entre energia, água, infraestrutura, latência e resíduos. "O barato volta a entrar": a opção mais barata pode transferir custo para comunidades.

### Por que as outras erram

- **A:** o vapor de água das torres não causa chuva ácida. Esse fenômeno vem de poluentes como óxidos de enxofre e nitrogênio (complemento, fora do material).
- **B:** o resfriamento evaporativo usa água, não emite CFC. A comparação com o setor automotivo é inventada.
- **D:** o método não contamina oceanos com metais pesados. O custo extrativo de minérios existe, mas está ligado à fabricação de hardware, não à evaporação.
- **E:** a água evaporada das torres fica na baixa atmosfera local, e não altera a umidade da estratosfera. O impacto é local e hídrico.

### Aprofundar no guia

- [16 · Treinamento, inferência, refrigeração, PUE e o dilema água versus energia](./projeto-de-leitura/16-treinamento-inferencia-refrigeracao-pue-agua-ou-energia.md), seção "Como funciona": os quatro métodos de refrigeração lado a lado, com o que cada um custa.
- [16 · Treinamento, inferência, refrigeração, PUE e o dilema água versus energia](./projeto-de-leitura/16-treinamento-inferencia-refrigeracao-pue-agua-ou-energia.md), seção "O que é": PUE e seus limites.
- [15 · Custo ambiental: onde ficam os data centers, cabos, água e matriz energética](./projeto-de-leitura/15-custo-ambiental-data-centers-e-energia.md), seção "O que é": estresse hídrico e a ideia de que a nuvem é infraestrutura física.

*Código da questão: 179786*

---

## Questão 04 · Governança desde a concepção (Governance by Design)

**Pergunta:** Em qual fase do desenvolvimento de aplicações de IA é necessário estabelecer práticas de governança?

**Alternativas:**
- A) Exclusivamente no monitoramento contínuo.
- B) Somente na operação em produção.
- C) Apenas na coleta de dados e treinamento.
- D) Não são necessárias.
- E) ✅ Desde a concepção (design) e ao longo de todo o ciclo de vida da aplicação.

**Resposta: E.** Desde a concepção (design) e ao longo de todo o ciclo de vida da aplicação.

### Resolução comentada

Governança não é uma etapa isolada nem tardia. Três alternativas (A, B, C) escolhem uma fase só; a D nega a necessidade. A pista é o "apenas", "somente" e "exclusivamente": governança que existe em um único momento deixa o resto descoberto.

O princípio é o "Governance by Design": começar no design (quem é afetado, risco de discriminação, recomendação versus ação autônoma, custo), passar pelos dados (curadoria), pelo treinamento (métricas e viés) e seguir na operação (usuários, impacto, custo, incidentes). "Quanto mais cedo, mais barato corrigir" é a ideia do "viés by design" do tópico 04 do guia, aplicada aqui por extensão.

O guia ainda lembra que a governança é prática, não um PDF numa pasta: se ninguém inspeciona de verdade, o regulamento vira enfeite.

### Entenda os conceitos

- **Governança de IA:** regras, processos, políticas e ferramentas para criar, implantar e usar IA. A primeira pergunta é "para quê?". Analogia do guia: o elevador, com inspeção periódica, limite de peso, botão de emergência e responsável pela manutenção.
- **Governance by Design:** governança presente desde o design, passando por dados, treinamento e operação.
- **Quatro pilares da IA ética:** transparência, justiça/fairness, segurança e privacidade, e responsabilidade (cada decisão relevante tem dono).
- **Ciclo de vida:** design, dados, treinamento, operação e monitoramento. Deixar produção sem monitoramento é uma armadilha citada.
- **Shadow AI:** uso não oficial de ferramentas de IA por colaboradores, sem a empresa saber que dados saem. Por isso as ferramentas precisam ser homologadas.
- **Por onde começar:** inventário das ferramentas, classificação de uso por risco, políticas de uso e monitoramento com KPIs.
- **Supervisão humana e comitê:** IA como copiloto, com pessoa responsável; comitê multidisciplinar (tecnologia, jurídico, RH, negócio).

### Por que as outras erram

- **A:** monitoramento é parte da governança, mas deixa de fora design, dados e treino, onde muitos riscos nascem.
- **B:** só na produção significa descobrir o problema depois de pronto, quando corrigir é mais caro.
- **C:** coleta e treino importam (curadoria, viés), mas a operação, o design e o monitoramento também exigem governança.
- **D:** o guia mostra o custo de não ter governança: risco reputacional, jurídico, operacional e de dados.

### Aprofundar no guia

- [00 · Governança de IA: pilares, riscos e por onde começar](./projeto-de-leitura/00-governanca-de-ia.md), seção "O que é": o item "Governança by design" e os quatro pilares.
- [00 · Governança de IA: pilares, riscos e por onde começar](./projeto-de-leitura/00-governanca-de-ia.md), seção "Como funciona": os quatro passos práticos e os KPIs.
- [00 · Governança de IA: pilares, riscos e por onde começar](./projeto-de-leitura/00-governanca-de-ia.md), seção "Armadilhas": tratar governança como documento escrito uma vez.

*Código da questão: 179767*

---

## Questão 05 · RAG para reduzir input tokens e custo

**Pergunta:** A empresa paga por tokens enviados à API. Enviar documentos de 100 páginas a cada pergunta tornou a conta insustentável. Qual técnica reduz os input tokens?

**Alternativas:**
- A) Fazer chamadas a cada 5 segundos para manter o modelo aquecido.
- B) Aumentar o tamanho da resposta (output tokens).
- C) Reenviar todo o histórico a cada mensagem.
- D) Enviar trechos aleatórios do documento, só limitando tokens.
- E) ✅ Usar RAG para buscar e enviar apenas os trechos relevantes no prompt.

**Resposta: E.** Usar RAG para buscar e enviar apenas os trechos relevantes no prompt.

> Resolução original curta: RAG com busca vetorial seleciona e envia só os trechos necessários, reduzindo input tokens e cortando o custo por requisição.

### Resolução comentada

O problema é de custo por volume de entrada: 100 páginas a cada pergunta. A solução é mandar menos texto, mas o texto certo. É exatamente o que o RAG faz: em vez de enviar o documento inteiro, uma busca encontra os trechos relevantes à pergunta e só eles entram no prompt.

Perceba a diferença entre "menos tokens" e "tokens aleatórios". Cortar o documento sem critério (D) reduz custo, mas também a qualidade, porque o trecho útil pode ficar de fora. O RAG reduz custo e preserva o sinal.

Todas as outras alternativas aumentam ou não mexem nos tokens de entrada, ou atacam a parte errada da conta.

### Entenda os conceitos

- **RAG (Retrieval-Augmented Generation):** recuperar trechos relevantes de uma base e colocá-los no prompt antes de gerar a resposta. Segundo o guia, o RAG eficiente recupera só o necessário: contexto demais confunde, dilui o sinal e aumenta a fatura.
- **Busca vetorial:** uma forma de recuperação por semelhança semântica. O guia lembra que RAG não é só banco vetorial: pode usar SQL, busca tradicional e outras fontes.
- **Input tokens x output tokens:** a cobrança costuma incluir entrada e saída. Um centavo por chamada vira conta enorme com milhões de chamadas, e contexto longo pesa na fatura.
- **Janela de contexto:** uma janela enorme (um milhão de tokens) não significa que deva ser usada inteira. "Engenharia de contexto também é engenharia de custo."
- **Outras estratégias de redução (guia):** prompt caching (reaproveitar partes estáticas), quantização, LLM routing (tarefa simples para modelo menor) e simuladores de pricing antes do deploy.
- **Consumo irrestrito (OWASP LLM10):** chamadas excessivas e custos inesperados; segurança também é disponibilidade e sustentabilidade operacional.

### Por que as outras erram

- **A:** manter o modelo "aquecido" com chamadas periódicas só gera mais requisições pagas, sem reduzir o tamanho do que é enviado.
- **B:** aumentar os output tokens eleva o custo de saída e não toca nos tokens de entrada, que são o problema.
- **C:** reenviar todo o histórico a cada mensagem aumenta o contexto e o custo a cada turno, o oposto do objetivo.
- **D:** trechos aleatórios podem reduzir tokens, mas perdem relevância. A seleção precisa ser guiada pela pergunta, que é o que a busca do RAG faz.

### Aprofundar no guia

- [14 · Custos financeiros de IA: CAPEX/OPEX, API versus infraestrutura própria e como reduzir](./projeto-de-leitura/14-custos-financeiros-capex-opex-e-reducao.md), seção "Como funciona": o item "RAG eficiente" entre as estratégias de redução, ao lado de caching, quantização e routing.
- [14 · Custos financeiros de IA: CAPEX/OPEX, API versus infraestrutura própria e como reduzir](./projeto-de-leitura/14-custos-financeiros-capex-opex-e-reducao.md), seção "O que é": tokens de entrada e saída e a regra de que contexto longo pesa na fatura.
- [08 · Cinco casos de segurança com OWASP](./projeto-de-leitura/08-cinco-casos-de-seguranca-owasp.md), seção "O que é": o Caso 5 (Denial of Wallet) mostra o lado de segurança do mesmo problema de custo.

*Código da questão: 179784*

---

## Questão 06 · Dilema de Collingridge

**Pergunta:** Pelo Dilema de Collingridge, qual é a contradição ao regular IA?

**Alternativas:**
- A) Regular no início é fácil porque os impactos futuros são 100% previsíveis.
- B) O dilema some quando a lei é aprovada.
- C) Investir agora é gastar à toa, depois falta computador no mercado.
- D) ✅ Se regularem agora, podem sufocar a inovação por medo do desconhecido; se esperarem para ver, a IA pode se tornar incontrolável.
- E) Só se regula IA open-source.

**Resposta: D.** Se regularem agora, podem sufocar a inovação por medo do desconhecido; se esperarem para ver, a IA pode se tornar incontrolável.

### Resolução comentada

O dilema é uma pinça com duas pontas. Na ação precoce (agora), a tecnologia ainda é fácil de mudar, mas você sabe pouco sobre seus efeitos; regras rígidas baseadas em risco hipotético podem matar a inovação. Na ação tardia (depois), os impactos estão claros, mas a tecnologia já se enraizou na economia e na infraestrutura, e mudá-la ou proibi-la fica quase impossível.

A palavra-chave do enunciado é "contradição": a resposta precisa conter os dois lados. Só a D traz os dois. A A inventa que o início é previsível (é justamente o contrário), e as demais fogem do tema.

Pelo guia, o Collingridge não resolve o dilema, só o explicita: é uma escolha sob incerteza.

### Entenda os conceitos

- **Dilema de Collingridge:** no início é fácil mudar e difícil prever; depois é fácil entender e difícil mudar.
- **Ação precoce:** regular cedo, com pouca informação; risco de bloquear algo benéfico.
- **Ação tardia:** regular tarde, com dados e impactos visíveis; risco de a tecnologia já estar integrada à sociedade, tornando a mudança cara.
- **Por que regular:** convivência de grupos gera conflito e risco; regular organiza relações, reduz risco e define o que é permitido. É proteção coletiva.
- **Atores e lobby:** Big Techs, governos, produtores de conteúdo, sociedade civil, cientistas, sindicatos, Judiciário e investidores veem custos e benefícios diferentes. Lobby é legítimo quando transparente e vira tráfico de influência quando há reuniões escondidas e troca de favores.
- **Multidisciplinaridade:** direito é indispensável mas insuficiente; sem tecnologia, economia e segurança, pode-se propor regra juridicamente boa e tecnicamente inviável.

### Por que as outras erram

- **A:** os impactos futuros não são previsíveis no início. A dificuldade de prever é justamente metade do dilema.
- **B:** aprovar uma lei não faz o dilema sumir. Ele reaparece na hora de revisar e atualizar a regra.
- **C:** trata o dilema como questão de gasto em computação. Não tem relação com a ideia central.
- **E:** o dilema não se restringe a IA open-source, vale para qualquer tecnologia em que o impacto só aparece depois que ela se espalha.

### Aprofundar no guia

- [11 · Por que regular IA: interesses, dilema de Collingridge e lobby](./projeto-de-leitura/11-por-que-regular-collingridge-e-lobby.md), seção "O que é": o item "Dilema de Collingridge" e a lista de atores.
- [11 · Por que regular IA: interesses, dilema de Collingridge e lobby](./projeto-de-leitura/11-por-que-regular-collingridge-e-lobby.md), seção "Como funciona": multidisciplinaridade e lobby legítimo versus tráfico de influência.
- [12 · Tipos de regulação e EU AI Act](./projeto-de-leitura/12-tipos-de-regulacao-e-eu-ai-act.md), seção "O que é": leitura complementar sobre regulação por nível de risco (o guia 12 não trata do dilema de Collingridge).

*Código da questão: 179780*

---

## Questão 07 · Excessive Agency, menor privilégio e human-in-the-loop

**Pergunta:** Um assistente virtual de loja online tem acesso a APIs para ler histórico de pedidos, modificar endereço, processar reembolsos e excluir cadastros. Um cliente furioso escreve: "cancele minha conta e me devolva R$ 500,00 imediatamente". O agente, com a meta de "manter a satisfação do cliente a qualquer custo", exclui a conta e reembolsa os R$ 500 sem pedir confirmação. Qual é a falha de design e como evitá-la?

**Alternativas:**
- A) Modelo desatualizado; atualizar para um com mais parâmetros.
- B) Falta de criptografia ponta a ponta; ativar HTTPS.
- C) ✅ Privilégios e funcionalidades excessivos sem controle de acesso adequado no backend; aplicar o princípio do menor privilégio (PoLP) e exigir aprovação humana para ações de alto risco.
- D) Injeção de SQL; parametrizar consultas.
- E) Uso de caixa alta pelo cliente; converter para minúsculas.

**Resposta: C.** Privilégios excessivos sem controle de acesso no backend; menor privilégio (PoLP) e aprovação humana para ações de alto risco.

> Resolução original curta: Agência Excessiva (Excessive Agency): autonomia, permissões ou ferramentas além do estritamente necessário. Permissão direta para excluir contas e emitir reembolsos ilimitados sem trava no backend (regras de negócio, limite de valor, Human-in-the-Loop) deixou o sistema vulnerável à manipulação.

### Resolução comentada

Comece separando o que deu errado: o agente obedeceu ao pedido e à meta, e fez algo irreversível sem ninguém conferir. A causa não é o modelo "burro", é o desenho: ele recebeu poder demais (excluir conta, reembolsar sem limite) e nada no backend o impediu.

A correção também tem de estar no sistema, não no prompt. O princípio do menor privilégio diz que o agente só deve ter as permissões estritamente necessárias para a tarefa. E ações de alto risco (apagar conta, devolver dinheiro) precisam de aprovação humana e de regras determinísticas no backend (limite de valor, validações).

Repare que a "meta a qualquer custo" é o gatilho, mas o problema é que não havia trava. Um modelo maior (A) obedeceria do mesmo jeito.

### Entenda os conceitos

- **Excessive Agency (autonomia excessiva, OWASP LLM06):** o sistema recebe autonomia, permissões ou ferramentas além do necessário. O guia a descreve como o princípio do privilégio mínimo aplicado a sistemas que decidem e agem.
- **Princípio do menor privilégio (PoLP):** dar a cada agente ou usuário só o acesso que a tarefa exige. Reaparece em três casos do guia: conta sem escrita, agente sem poder de deploy e usuário que só vê o que seu perfil permite.
- **Human-in-the-loop:** aprovação humana para ações críticas (deploy, IAM, produção; aqui, exclusão e reembolso).
- **Controle fora do modelo e determinístico:** padrão de mitigação do guia. Allowlist de ações, RBAC, limites e aprovação ficam no código do backend, não na obediência do modelo.
- **Separar sugestão de execução:** o modelo propõe, o sistema e o humano executam.
- **Controles de arquitetura para autonomia (guia):** restringir ferramentas, definir permissões, exigir confirmação humana em ações críticas, monitorar logs, validar antes de executar, limitar consumo e separar ambientes.
- **Determinístico x probabilístico:** software tradicional segue regras fixas; IA é probabilística. Por isso a segurança precisa de trava fora do modelo. Analogia do guia: o atendente treinado que recebeu a chave do caixa; o estrago de um engano é maior.
- **Manipulação do agente:** com permissões amplas, qualquer texto convincente (ou furioso) pode empurrar o agente a agir. É por isso que a resolução fala em "vulnerável à manipulação".

### Por que as outras erram

- **A:** trocar para um modelo maior não remove o excesso de permissões. O erro é de arquitetura, não de capacidade.
- **B:** HTTPS protege o transporte. O incidente não envolveu interceptação, e sim uma ação legítima feita com poder demais.
- **D:** não há SQL injection no cenário. É um caso do guia (Caso 1), mas aqui o agente agiu como mandado, sem consulta maliciosa.
- **E:** a caixa alta não tem papel técnico. O problema não é o formato do texto do cliente.

### Aprofundar no guia

- [08 · Cinco casos de segurança com OWASP](./projeto-de-leitura/08-cinco-casos-de-seguranca-owasp.md), seção "O que é": o Caso 3 (agente de DevOps sem aprovação) é o gêmeo desta questão, e a seção "Cola rápida" traz allowlist e human-in-the-loop.
- [07 · OWASP Top 10 para LLMs: o novo cenário](./projeto-de-leitura/07-owasp-top-10-llm-novo-cenario.md), seção "Como funciona": autonomia excessiva e a lista de controles de arquitetura.
- [17 · Revisão integrada](./projeto-de-leitura/17-revisao-integrada.md), seção "Cola rápida": "Privilégio mínimo para agentes".

*Código da questão: 179778*

---

## Questão 08 · Geopolítica dos chips (TSMC, ASML, exportação)

**Pergunta:** Modelos de IA avançados dependem de GPUs e TPUs, e a produção desses chips tem uma cadeia global concentrada, com ponto de tensão entre EUA e China. Qual é o principal gargalo (chokepoint) geopolítico e infraestrutural?

**Alternativas:**
- A) A UE proibiu a importação e a exportação de componentes eletrônicos para IA.
- B) ✅ EUA e aliados (Taiwan, Países Baixos) controlam etapas críticas: design avançado de chips, fabricação de semicondutores de ponta (ex.: TSMC) e máquinas de litografia extrema (ASML), gerando restrições de exportação para contenção tecnológica.
- C) Chips avançados são fabricados exclusivamente na América Latina.
- D) A China detém o monopólio de todos os softwares de compilação de sistemas operacionais para IA.
- E) O único fator é a quantidade de petróleo para as usinas.

**Resposta: B.** EUA e aliados controlam design, fabricação de ponta (TSMC) e litografia (ASML), com restrições de exportação.

> Resolução original curta: a geopolítica da IA é moldada pelo controle da cadeia de suprimentos de semicondutores de ponta, onde China, EUA e Taiwan estão interligados.

### Resolução comentada

A palavra "gargalo" pede o ponto onde poucos atores controlam uma etapa insubstituível. Na cadeia de chips avançados são poucos: o design (ex.: NVIDIA), a fabricação física de ponta (TSMC, em Taiwan) e as máquinas de litografia (ASML, nos Países Baixos). Quem controla essas etapas pode restringir o acesso dos outros, e é isso que as restrições de exportação fazem.

Pense como uma linha de montagem com três fornecedores únicos. Se um deles fecha a porta, a linha para. Por isso a tensão EUA x China passa pelos chips.

As outras alternativas são afirmações absolutas e inverossímeis ("exclusivamente na América Latina", "único fator é petróleo", "monopólio de todos os softwares"). Em questão de geopolítica, absoluto costuma ser falso.

### Entenda os conceitos

- **Cadeia dos chips (guia):** ASML fornece equipamentos de fabricação, TSMC faz a fabricação física (Taiwan) e NVIDIA cuida de design e ecossistema. A concentração aumenta o risco.
- **Chokepoint (gargalo):** ponto da cadeia controlado por poucos, onde uma restrição trava todo o resto (complemento, fora do material, como definição geral).
- **TSMC:** fabricante de semicondutores de ponta, em Taiwan.
- **ASML:** empresa dos Países Baixos que fabrica as máquinas de litografia usadas para produzir chips avançados (a nacionalidade e o termo "litografia extrema" vêm da resolução, não do guia).
- **Restrições de exportação:** limites ao acesso a tecnologia por segurança nacional. O guia cita que os EUA têm visão orientada a mercado, mas com restrições de acesso por segurança nacional.
- **Soberania tecnológica:** de onde vêm os modelos, onde os dados são processados, quem fabrica os componentes críticos e quem define as regras de acesso. IA depende de recursos físicos (energia, chips, data centers).
- **Três visões geopolíticas:** EUA (mercado e velocidade), China (soberania e controle estatal) e UE (direitos fundamentais e risco).
- **Impacto no código:** um modelo pode deixar de estar disponível, uma API pode sofrer restrição ou um fornecedor pode ser proibido.

### Por que as outras erram

- **A:** a UE não proibiu a importação e exportação de componentes eletrônicos. Seu papel no guia é regulatório (AI Act, Efeito Bruxelas), não de bloqueio da cadeia de chips.
- **C:** chips avançados não são fabricados exclusivamente na América Latina. A fabricação de ponta está concentrada em poucos locais, como Taiwan.
- **D:** a China não detém monopólio de compiladores de sistemas operacionais para IA. O gargalo está em hardware e fabricação.
- **E:** petróleo não é o único fator. Energia importa, mas não é o chokepoint da cadeia de chips.

### Aprofundar no guia

- [14 · Custos financeiros de IA: CAPEX/OPEX, API versus infraestrutura própria e como reduzir](./projeto-de-leitura/14-custos-financeiros-capex-opex-e-reducao.md), seção "Como funciona": o item "Cadeia dos chips" (ASML, TSMC, NVIDIA).
- [13 · Geopolítica da IA, Efeito Bruxelas e o cenário brasileiro](./projeto-de-leitura/13-geopolitica-efeito-bruxelas-e-brasil.md), seção "O que é": as três visões (EUA, China, UE) e a soberania tecnológica.
- [13 · Geopolítica da IA, Efeito Bruxelas e o cenário brasileiro](./projeto-de-leitura/13-geopolitica-efeito-bruxelas-e-brasil.md), seção "Como funciona": "decisões geopolíticas chegam ao código".

*Código da questão: 179781*

---

## Questão 09 · Mitigação de viés: fairness audits e equipes diversas

**Pergunta:** Qual é uma boa prática para mitigar vieses no ciclo de desenvolvimento de IA?

**Alternativas:**
- A) Treinar só com dados sintéticos de outras IAs.
- B) Remover todas as variáveis numéricas do dataset.
- C) Coletar dados da internet sem filtragem nem curadoria.
- D) Manter o modelo como caixa-preta fechada para evitar manipulação.
- E) ✅ Realizar auditorias contínuas de equidade (fairness audits) e manter equipes multidisciplinares e diversas.

**Resposta: E.** Auditorias contínuas de equidade (fairness audits) e equipes multidisciplinares e diversas.

### Resolução comentada

Mitigar viés é um trabalho contínuo e em camadas, não um truque técnico único. A resposta certa une processo (auditar equidade ao longo do tempo) e pessoas (equipe diversa que vê o que um grupo homogêneo não vê). Auditorias formais de fairness e diversidade no time são pilares da IA responsável.

Um bom teste: cada alternativa errada faz o oposto de uma boa prática. Sem curadoria (C), sem transparência (D), com dados artificiais (A) ou jogando fora informação (B), o viés ou continua ou piora.

O guia também avisa que a diversidade não elimina o viés, ela amplia a chance de enxergá-lo, e que mitigar muitas vezes é reduzir, não zerar.

### Entenda os conceitos

- **Fairness (justiça entre grupos):** não existe métrica universal. Antes de escolher, defina o tipo de dano, os grupos comparados e a diferença aceitável.
- **Fairness audit (auditoria de equidade):** avaliação periódica de se o sistema trata os grupos de forma equivalente. No guia aparece como medir fairness segundo o contexto, medir por grupo e auditar dados brutos (o termo exato "fairness audit" vem da resolução da prova).
- **Mitigação em camadas:** analisar diversidade dos dados, medir fairness no contexto, monitorar desde o início (dados, depois modelo, depois aplicação), testar viés mesmo sob pressão de prazo e manter supervisão humana.
- **Diversidade nas equipes:** não é cota; amplia as lentes e ajuda a desafiar hipóteses. Equipes homogêneas reforçam as mesmas premissas (viés de confirmação).
- **Fairlearn:** ferramenta sugerida no README do repo para o módulo de vieses. Não há notebook ou exercício com ela no repositório.
- **Governança organizacional:** políticas claras, responsabilidades definidas e liderança que cobra fairness. Sem incentivo, a equipe prioriza só o que é cobrado no prazo.
- **Auditoria de dados brutos:** checar dados ausentes, incorretos, redundantes e problemas de coleta.

### Por que as outras erram

- **A:** dados só sintéticos empobrecem o material e podem herdar os vieses de outras IAs. O guia observa que treinar em excesso com conteúdo artificial empobrece e que o conteúdo humano segue relevante.
- **B:** remover todas as variáveis numéricas destrói informação útil e não elimina viés (que pode estar em variáveis categóricas ou em proxies).
- **C:** dados da internet sem curadoria carregam os vieses da fonte. "Lixo entra, lixo sai" continua valendo.
- **D:** a caixa-preta fechada impede auditoria. O guia defende explicabilidade como parte da responsabilidade e para detectar viés.

### Aprofundar no guia

- [04 · Vieses em IA: tipos, origens e mitigação](./projeto-de-leitura/04-vieses-em-ia.md), seção "Como funciona": mitigação em camadas, diversidade nas equipes e governança organizacional.
- [05 · IA responsável e o caso da triagem hospitalar](./projeto-de-leitura/05-ia-responsavel-e-caso-triagem.md), seção "O que é": métricas multidimensionais e auditoria de dados brutos.
- [03 · SHAP, LIME e Integrated Gradients](./projeto-de-leitura/03-shap-lime-integrated-gradients.md), seção "Onde aplicar": usar explicabilidade para detectar viés e dependência de variáveis inadequadas.

*Código da questão: 179773*

---

## Questão 10 · NIST SP 1270 e viés sistêmico

**Pergunta:** O NIST SP 1270 categoriza vieses em três dimensões: Humano, Computacional e Sistêmico. Qual cenário descreve Viés Sistêmico?

**Alternativas:**
- A) Um rotulador projeta crenças e heurísticas individuais ao classificar imagens ou textos.
- B) Um cientista de dados escolhe uma métrica (acurácia global) que favorece a classe majoritária e ignora grupos minoritários.
- C) ✅ Um modelo de crédito perpetua a negação de empréstimos a moradores de uma região devido a políticas históricas de discriminação imobiliária (redlining) e disparidades institucionais enraizadas.
- D) Um sensor de câmera infravermelha com falha de calibração física distorce dados por tom de pele.
- E) Uma rede neural com overfitting por escassez de dados erra aleatoriamente em produção.

**Resposta: C.** Modelo de crédito que perpetua a negação a moradores de uma região por redlining e desigualdades institucionais.

> Resolução original curta: o Viés Sistêmico nasce de normas sociotécnicas, práticas históricas, políticas institucionais e desigualdades estruturais; discriminação geográfica histórica é um viés de nível macro/institucional herdado pelos dados, independente da intenção dos desenvolvedores.

### Resolução comentada

Pergunta-chave para classificar (complemento): de onde vem o viés? Se vem de uma pessoa (crença, heurística), é humano. Se vem de dados, métrica ou algoritmo (amostra, escolha técnica), é computacional. Se vem da sociedade e das instituições, e os dados apenas o herdam, é sistêmico.

No cenário C, a negação de crédito por região reflete políticas históricas (redlining) e desigualdades institucionais. Ninguém precisou querer discriminar: a estrutura social deixou a marca nos dados, e o modelo a reproduz. É o exemplo clássico de viés sistêmico, de nível macro.

Cada uma das outras alternativas aponta uma origem diferente (indivíduo, escolha técnica, hardware, treino), nenhuma institucional.

### Entenda os conceitos

- **NIST SP 1270:** publicação do NIST (complemento: o título em inglês, "Towards a Standard for Identifying and Managing Bias in Artificial Intelligence", não consta nos guias) sobre identificação e gerenciamento de viés. Usa a estrutura em três grupos que o guia adota.
- **Viés humano:** atalhos cognitivos e pressupostos de quem desenvolve ou rotula. O guia cita Dunning-Kruger, viés de automação e viés de confirmação.
- **Viés estatístico/computacional:** população versus amostra, sub-representação, erro maior para um grupo, qualidade da distribuição. É a ponta do iceberg, a parte mais mensurável.
- **Viés sistêmico:** estruturas sociais e históricas que deixam marca nos dados. Está abaixo da superfície do iceberg, é implícito e difícil de medir.
- **Redlining:** prática histórica de discriminação geográfica, como negar crédito ou seguro a moradores de certas regiões. O termo e o exemplo vêm da resolução da prova, não do guia.
- **Iceberg do NIST (guia):** o computacional aparece na ponta; o sistêmico e o humano, abaixo da superfície.
- **Dados históricos carregam discriminação:** o guia lembra que mitigar nem sempre é eliminar.

### Por que as outras erram

- **A:** é viés humano. A origem é a crença ou heurística individual de quem rotula.
- **B:** é viés computacional (estatístico). A origem é uma escolha técnica de métrica, como acurácia global, que esconde grupos minoritários.
- **D:** é um problema físico de calibração de sensor. Distorce dados, mas tem causa de hardware, não estrutura social. Seria mais próximo do computacional/técnico (a classificação final desse caso vem da resolução).
- **E:** overfitting por escassez de dados é falha técnica de treino, com erro aleatório, sem padrão institucional.

### Aprofundar no guia

- [04 · Vieses em IA: tipos, origens e mitigação](./projeto-de-leitura/04-vieses-em-ia.md), seção "O que é": os três grupos (iceberg), a sub-representação e os vieses humanos; seção "Cola rápida": o viés sistêmico em uma linha.
- [04 · Vieses em IA: tipos, origens e mitigação](./projeto-de-leitura/04-vieses-em-ia.md), seção "Para ir além": link para o NIST SP 1270.
- [06 · Aspectos humanos e desafios éticos](./projeto-de-leitura/06-aspectos-humanos-e-desafios-eticos.md), seção "O que é": dados históricos carregam discriminação e mitigar nem sempre é eliminar.

*Código da questão: 179774*

---

## Pontos de atenção na prova

- **Texto das alternativas:** as alternativas foram transcritas do enunciado fornecido; algumas foram ligeiramente condensadas na pergunta e na ordem das palavras.
- **Questão 01:** o guia confirma LIME como local e model-agnostic, e SHAP com visão local e global. A afirmação de que o gradiente interno é do Integrated Gradients também está no tópico 03.
- **Questão 02:** o guia confirma sub-representação e erro maior para um grupo, mas não traz o exemplo do reconhecimento facial. A resposta B segue a resolução.
- **Questão 03:** o guia confirma que o resfriamento evaporativo consome grandes volumes de água e é delicado em regiões de escassez. Não trata das alternativas A, B, D e E (chuva ácida, CFC, metais, estratosfera); as correções foram feitas por conhecimento geral, marcado como complemento.
- **Questão 04:** o guia usa "Governança by design" e diz que a governança continua durante toda a vida da solução. Confirmado.
- **Questão 05:** resolução curta. O guia confirma o RAG eficiente como estratégia de redução de custo (tópico 14), mas não usa a expressão "input tokens" na mesma linha; a ligação vem do tópico de tokens de entrada e saída.
- **Questão 06:** confirmado no tópico 11. O guia descreve as duas pontas do dilema com palavras um pouco diferentes (fácil mudar e difícil prever; fácil entender e difícil mudar).
- **Questão 07:** resolução curta. O guia confirma Excessive Agency, menor privilégio e human-in-the-loop, com o Caso 3 (DevOps) como análogo. O cenário exato do e-commerce com reembolso não está no material; a resposta C segue a resolução.
- **Questão 08:** o guia cita ASML, TSMC e NVIDIA e as restrições de acesso por segurança nacional dos EUA. Não detalha "litografia extrema", a nacionalidade holandesa da ASML nem restrições de exportação específicas; esses pontos vêm da resolução da prova. Resolução curta.
- **Questão 09:** o guia cobre diversidade nas equipes, mitigação em camadas e medir fairness, mas não usa o termo "fairness audit" nem "auditoria contínua". A resposta E segue a resolução.
- **Questão 10:** o guia confirma as três categorias (estatístico/computacional, humano, sistêmico) e o sistêmico como herdado de estruturas sociais e históricas. O termo "redlining" não aparece no material; ele vem da resolução. O guia também não lê o PDF do NIST SP 1270, só o cita como indicação.

## Mapa de estudo desta disciplina

| Tema da prova | Tópico do guia que mais cobre |
|---------------|-------------------------------|
| LIME, SHAP e explicação local x global (Q01) | [03 · SHAP, LIME e Integrated Gradients](./projeto-de-leitura/03-shap-lime-integrated-gradients.md) |
| Sub-representação e viés nos dados (Q02) | [04 · Vieses em IA: tipos, origens e mitigação](./projeto-de-leitura/04-vieses-em-ia.md) |
| Resfriamento evaporativo, água e PUE (Q03) | [16 · Treinamento, inferência, refrigeração, PUE e o dilema água versus energia](./projeto-de-leitura/16-treinamento-inferencia-refrigeracao-pue-agua-ou-energia.md) |
| Governance by Design (Q04) | [00 · Governança de IA: pilares, riscos e por onde começar](./projeto-de-leitura/00-governanca-de-ia.md) |
| RAG para reduzir tokens e custo (Q05) | [14 · Custos financeiros de IA: CAPEX/OPEX, API versus infraestrutura própria e como reduzir](./projeto-de-leitura/14-custos-financeiros-capex-opex-e-reducao.md) |
| Dilema de Collingridge (Q06) | [11 · Por que regular IA: interesses, dilema de Collingridge e lobby](./projeto-de-leitura/11-por-que-regular-collingridge-e-lobby.md) |
| Excessive Agency, menor privilégio e human-in-the-loop (Q07) | [08 · Cinco casos de segurança com OWASP](./projeto-de-leitura/08-cinco-casos-de-seguranca-owasp.md) e [07 · OWASP Top 10 para LLMs](./projeto-de-leitura/07-owasp-top-10-llm-novo-cenario.md) |
| Geopolítica dos chips (Q08) | [13 · Geopolítica da IA, Efeito Bruxelas e o cenário brasileiro](./projeto-de-leitura/13-geopolitica-efeito-bruxelas-e-brasil.md) e [14 · Custos financeiros de IA](./projeto-de-leitura/14-custos-financeiros-capex-opex-e-reducao.md) |
| Mitigação de viés (Q09) | [04 · Vieses em IA: tipos, origens e mitigação](./projeto-de-leitura/04-vieses-em-ia.md) e [05 · IA responsável e o caso da triagem hospitalar](./projeto-de-leitura/05-ia-responsavel-e-caso-triagem.md) |
| NIST SP 1270 e viés sistêmico (Q10) | [04 · Vieses em IA: tipos, origens e mitigação](./projeto-de-leitura/04-vieses-em-ia.md) |
