# 13 · Baseline, teste A/B, bootstrap, LLM-as-a-Judge e modelo conjunto versus separado

> **Unidade 5 · Aula 2** · Leitura: ~12 min · Bloco: Avaliar modelos fine-tunados

## 🎯 Em uma frase
Sem baseline a avaliação é isolada. A aula compara o fine-tunado com o **Gemini 2.5 Flash sem ajuste** (mesmo conjunto, mesmo prompt, mesmas métricas), testa o efeito de um **hint de formato**, estima a vantagem por **bootstrap**, mostra onde **LLM-as-a-Judge** é necessário e responde se treinar os dois domínios **juntos** foi melhor que separar.

---

## 👵 Explicando para a vovó

Quando o aluno tira 10 numa prova, a pergunta honesta é: e se qualquer aluno sem curso tirasse 9? Por isso você faz a mesma prova, com as mesmas regras, para o aluno do curso e para um aluno comum, e olha a diferença. Se o aluno comum só errou porque ninguém avisou o formato da folha, você avisa e refaz.

E se a prova for uma redação, em vez de uma resposta única, você precisa de um corretor com critérios escritos, e ainda assim confere se ele não favorece quem aparece primeiro.

---

## 🔧 Tecnicamente

### O que é
- **Duas perguntas:** fine-tuning valeu o esforço, ou um modelo genérico faria o mesmo? E treinar Auto e Saúde juntos (como o módulo 3.2 fez) é melhor que dois modelos especializados?
- **Protocolo igual:** mesmo conjunto retido, mesmas métricas, mesmo prompt para os dois. Dar uma dica de JSON só ao genérico contamina a comparação; primeiro compara-se sem ela, depois testa-se o efeito do hint isoladamente. O harness do tópico 12 é reaproveitado sem duplicação.
- **Resultado A/B puro:** o fine-tunado devolve os 11 exemplos com esquema válido e 100% de precisão; o genérico não devolve nenhum dos 11 no esquema exigido (precisão medida 0%). O 0% não é erro de conteúdo: o genérico acertou valores, mas devolveu texto livre em lista, e para uma API que espera JSON isso é falha total. Em integração, formato é requisito funcional.
- **Hint de formato:** com a instrução de responder apenas com objeto JSON válido, o genérico melhora bastante e passa a devolver JSON na maioria das chamadas, mas não fica estável: às vezes falha o esquema, às vezes o JSON é válido com nomes de campo errados (valor_orcamento em vez de valor). JSON válido não é esquema válido.
- **Precisão de conteúdo:** com hint, a precisão do genérico variou entre ~54,5% e ~72,7% (média ~61,8%) em múltiplas execuções, bem abaixo dos 100% do fine-tunado. O ganho não é só formato: aparece também na extração e no uso exato dos campos.
- **A pergunta certa antes de fine-tunar:** depois de corrigir o formato por prompt, a precisão de conteúdo basta para o nível de automação que você quer? Com revisão humana, menos precisão pode servir; saída direto para API ou banco pede rigor.
- **Bootstrap:** reamostragem com reposição das diferenças por exemplo para estimar a estabilidade da vantagem. Com os 11 exemplos, o intervalo de 95% da diferença de precisão entre fine-tunado e genérico com hint ficou entre ~24,2 e ~51,5 pontos percentuais, todo acima de zero.
- **Amostra pequena exige cautela:** 11 exemplos é pouco, mas 100% contra 0% é grande demais para ignorar.
- **Quando exact match deixa de servir:** uma tarefa de parecer em texto livre, sem gabarito único. Entra o LLM-as-a-Judge, com rúbrica: fidelidade aos fatos, capacidade de sinalizar a pendência real e clareza. Os casos são escritos à mão (um valor de consulta muito acima do histórico; um distrator de beneficiário com autorização prévia não localizada).
- **O hábito aprendido aparece fora da tarefa:** mesmo pedindo texto livre, o fine-tunado continua respondendo em estilo JSON; especialização não é domínio universal. Normalizando o formato (reescrevendo o conteúdo em prosa equivalente), um caso muda de vencedor (o conteúdo do fine-tunado passa a ser melhor) e outro continua favorável ao genérico, o que indica diferença real de conteúdo.
- **Vieses do juiz:** viés de posição (inverter a ordem e repetir; o veredito se manteve) e self-preference (usar um juiz de outra família; concordância aumenta a confiança, mas pode haver divergência). LLM-as-a-Judge não é verdade absoluta.
- **Dois casos extras:** um exemplo arquivado de benchmark público (explicar um livro e recomendar bibliografia), em que as duas respostas estão corretas e a diferença é profundidade e utilidade; e um caso de red teaming (extrair instruções internas) em que as duas recusam, mas uma explica o motivo e oferece caminho legítimo: recusa correta não é recusa boa, e falso positivo de segurança também é problema.
- **Conjunto versus separado:** foram treinados dois jobs novos com os mesmos hiperparâmetros (um só com os 120 de Auto e outro só com os 80 de Saúde). Auto: empate, 6/6 nos dois. Saúde: conjunto 5/5; o modelo só de Saúde falhou o esquema nos 5 exemplos, devolvendo lista com marcadores como o genérico. Os 80 exemplos isolados não bastaram para fixar o contrato de saída; com os 200, a repetição reforçou o padrão. Neste experimento o conjunto nunca perdeu.
- **Ressalva metodológica:** os modelos separados veem menos exposições totais aos dados, então a diferença não se atribui só à separação de domínio. Fica a fragilidade de os 11 exemplos serem do mesmo universo do treino, tratada no tópico 14.

### Como funciona
- **21 testes antes da comparação:** a lógica herdada do harness, os cenários (genérico sem hint, fine-tunado, genérico com hint), o bootstrap, o LLM-as-a-Judge e os mecanismos de retry.
- **Remedições:** um comando `medir-graduacao [N]` repete as medições (N = 20) e grava o pior caso para o lado que precisa vencer (mínimo do fine-tunado, máximo do genérico); o veredito do tópico 15 usa esse ledger.
- **Missão prática:** montar um A/B com o mesmo conjunto, prompt e métricas; testar o efeito de um hint de formato separando esquema, conteúdo ou ambos; e, para tarefa subjetiva, escrever uma rúbrica curta de juiz com checagem de viés de posição.

### Onde aplicar
- Provar o valor de um fine-tuning contra o melhor prompt de um modelo genérico, e não contra um prompt fraco.
- Separar ganho de formato (corrigível por prompt ou pós-processamento) de ganho de conteúdo.
- Avaliar saídas abertas (pareceres, recusas) com rúbrica explícita, inversão de posição e juiz de outra família.
- Decidir entre modelo único multidomínio e modelos por domínio com dados, não com intuição.

### Vantagens e limites
**Vantagens**
- Transforma «está bom» em comparação com um baseline sob o mesmo protocolo.
- O bootstrap quantifica a incerteza com poucos exemplos.
- Mostra o limite da especialização (hábito de JSON fora da tarefa).

**Limites**
- O conjunto continua pequeno e do mesmo gerador.
- O LLM-as-a-Judge introduz vieses próprios e custo de chamada.
- A comparação conjunto versus separado não é controle perfeito (menos exposição no separado) e depende de treinar dois jobs extras.

### 🚫 Armadilhas
- Dar ao genérico instruções diferentes das do fine-tunado.
- Interpretar o 0% do genérico como incapacidade de entender o texto.
- Validar só se a resposta é JSON, sem checar os nomes dos campos.
- Usar o mesmo modelo como candidato e juiz sem checar self-preference.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Baseline | Referência contra a qual se mede ganho real |
| Teste A/B | Dois modelos, mesmo conjunto, prompt e métricas |
| Hint de formato | Instrução extra para responder em JSON, testada isoladamente |
| Bootstrap | Reamostragem com reposição para estimar a estabilidade de uma diferença |
| LLM-as-a-Judge | Modelo que julga respostas com rúbrica, quando não há gabarito único |
| Viés de posição | Preferir a primeira ou a segunda resposta pela ordem |
| Self-preference | Tendência de o juiz preferir respostas de sua própria família |

---

## 💻 No código do repo

**Projeto:** [modulo-05-avaliacao-modelos (A/B, juiz e domínios)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos)

Ferramenta de 60 KB (JS e Python) que faz A/B, hint, bootstrap, LLM-as-judge e a comparação por domínio, mais os dois datasets de domínio único usados para treinar os jobs extras e o companion com os casos de juiz na íntegra.

**Fluxo**
1. `chamarRecurso`: `generateContent` genérico para endpoint ajustado ou modelo do publisher, com `comHint` e retry em HTTP 429 (backoff, 4 tentativas); `avaliarRecurso` reaproveita as funções do harness.
2. `bootstrapIntervaloConfianca`: 10.000 reamostragens, nível 95%, RNG injetável.
3. Pareceres: `gerarCasosPareceres` (valor anômalo e distrator de beneficiário), `julgarPareceres`, `julgarComTrocaDePosicao` (inverte a ordem) e juiz alternativo `gemini-2.5-pro`; `gerarCasoArenaHard` e `gerarCasoRedTeaming` para os dois casos extras.
4. Comparação por domínio: precisa de `ENDPOINT_AUTO_ONLY` e `ENDPOINT_SAUDE_ONLY`; sem elas a seção é pulada com aviso. `amplitude-auto-only-120.jsonl` e `amplitude-saude-only-80.jsonl` são os datasets de treino desses jobs.
5. `medirGraduacao` (`node ab-and-domain-tradeoff-tool.js medir-graduacao 20`) grava no ledger; `casos-llm-as-judge-companion.md` traz prompt, respostas e vereditos dos quatro casos (A, B, Arena-Hard e red teaming).

**Como rodar**
- `GCP_PROJECT_ID=... ENDPOINT_MODULO32=... node ab-and-domain-tradeoff-tool.js`: 21 testes (15 locais, 6 que dependem de rede) e mais de 20 chamadas reais; sem `gcloud` os 6 falham.
- O custo de uma bateria é da ordem de R$ 1 a 2, segundo o README raiz.

**Armadilhas e achados no código**
- A faixa do genérico com hint aparece como 54,5% a 72,7% (média 61,8%) na aula, no guia do módulo 6 e nos valores de fallback do código; o `resultado-medido.json` versionado mostra, também com N = 20, mínimo 54,5%, máximo 66,7% e média 61,2%. As duas remedições coexistem no repositório.
- O bootstrap e os casos de juiz usam `gemini-2.5-flash` e `gemini-2.5-pro`, ambos com retirement anunciado para 16/out/2026; as constantes são `MODELO_GENERICO` e `MODELO_JUIZ_ALTERNATIVO`.
- Os textos dos Casos A e B no companion são de uma execução de referência: rodando de novo você terá o mesmo padrão, não as mesmas palavras.
- A seção de domínio (b) só roda se você tiver treinado os dois jobs extras (cerca de R$ 1,53 e R$ 0,86 no billing do autor).

---

## 🔗 Para ir além
- [Repositório oficial, módulo 05 (Avaliação de Modelos)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos)

---

⬅️ [12 · Teste retido de verdade e harness de avaliação: precisão por campo, consistência e esquema](./12-teste-retido-e-harness-de-avaliacao.md)  ·  [14 · Robustez, overfitting e artefato de medição: quando o número ruim é culpa da régua](./14-robustez-overfitting-e-artefato-de-medicao.md) ➡️
