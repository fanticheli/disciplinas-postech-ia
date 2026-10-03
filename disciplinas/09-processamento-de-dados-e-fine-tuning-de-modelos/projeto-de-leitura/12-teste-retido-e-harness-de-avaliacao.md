# 12 · Teste retido de verdade e harness de avaliação: precisão por campo, consistência e esquema

> **Unidade 5 · Aula 1** · Leitura: ~11 min · Bloco: Avaliar modelos fine-tunados

## 🎯 Em uma frase
Validation loss serve para **selecionar**, não para provar generalização, ainda mais com um conjunto de 30 exemplos reutilizado várias vezes. A aula constrói um **conjunto de teste retido** (11 exemplos, índice 5000 ou mais) e um **harness** com três métricas objetivas: precisão por campo, consistência e adequação de esquema.

---

## 👵 Explicando para a vovó

Um aluno que refaz o mesmo simulado dez vezes melhora a nota, mas isso não garante a nota numa prova que ele nunca viu. Treino é o material de estudo, validação é o simulado usado para decidir como estudar, e teste é a prova fechada guardada num cofre.

E um bom corretor não pergunta «a resposta parece boa?»: tem um gabarito campo a campo, confere se o aluno respondeu sempre igual à mesma pergunta e se preencheu a folha no formato certo.

---

## 🔧 Tecnicamente

### O que é
- **Validation loss não é avaliação final:** os 30 exemplos de validação foram reutilizados repetidamente para escolher entre ranks, tipo de ajuste e configuração. Não se treina neles, mas decide-se com base neles; isso ajusta indiretamente as escolhas ao conjunto.
- **O problema herdado:** o job gerenciado do módulo 3.2 treinou com todos os 200 exemplos (120 Auto e 80 Saúde); não há conjunto de teste final para o modelo da nuvem. Avaliar no treino mostra reprodução, não aprendizado.
- **Papéis:** treino ajusta o modelo; validação compara configurações durante o desenvolvimento; teste responde, depois das escolhas, como o modelo se comporta em dados retidos. Se o teste influencia a escolha, deixa de ser teste.
- **Teste retido gerado:** o mesmo gerador determinístico do módulo 3.2 com índices fora da faixa de treino. 11 exemplos cobrem as 6 fontes de Auto e as 5 de Saúde (inclusive as de menor volume). No treino o gerador nunca passou do índice 59 por fonte; o teste usa 5000 ou mais, uma margem de segurança contra uma futura ampliação do treino.
- **O que ainda pode se repetir:** os nomes são inéditos, mas placa, valor e data vêm de pools menores e podem ter aparecido no treino. Para extração isso não invalida o teste: o valor correto está dentro do texto, o modelo precisa ler, não lembrar.
- **Três perguntas, três métricas:** (1) o conteúdo extraído está correto? Precisão por campo, comparando cada campo com o esperado (segurado, placa, valor; beneficiário, procedimento, valor), com tolerância numérica para arredondamento. (2) o modelo responde de forma estável à mesma entrada? Consistência entre chamadas. (3) a saída respeita o esquema? Adequação de esquema: JSON válido, exatamente os campos esperados, sem faltar nem sobrar.
- **Formato é requisito de produção:** uma resposta bonita com campo extra ou estrutura inesperada quebra o código que a consome. Nenhuma métrica conta a história inteira; reduzir a um só número dá visão incompleta.
- **Harness de avaliação:** uma estrutura automatizada que roda sempre os mesmos testes, com os mesmos critérios (nome em referência ao LM Evaluation Harness, da EleutherAI).
- **Por que não LLM como juiz aqui:** LLM-as-a-Judge serve quando a resposta é subjetiva (resumo, tom). Para JSON com campos objetivos, checagem programática é mais barata, rápida, determinística e sem o viés de um segundo modelo.
- **Resultados no endpoint publicado:** 11/11 com esquema válido (100%), precisão média por campo de 100% e, no teste de consistência (mesmo exemplo, três chamadas), três respostas idênticas byte a byte.
- **Como ler 100%:** a tarefa é estreita (poucos campos, formato fixo), onde fine-tuning costuma dar ganhos claros. O resultado vale para esta tarefa, este dataset, este processo e estes exemplos.
- **A ressalva do gerador:** o teste foi criado pelo mesmo gerador determinístico do treino: prova generalização para exemplos novos *do mesmo padrão*. Se o modelo aprendeu a tarefa ou só se adaptou ao formato do gerador fica para o teste de estresse (tópico 14).

### Como funciona
- **11 testes do harness:** o conjunto retido usa índices fora da faixa de treino; o esquema reprova campo faltando, campo extra e resposta que não é JSON; a precisão por campo aceita tolerância numérica. É preciso testar o avaliador antes de confiar nele, para não atribuir ao modelo um bug do código de avaliação.
- **Casos reais de formatação:** o modelo às vezes devolve o JSON dentro de uma cerca de Markdown, que o harness aceita; e diferenças simples de acentuação não contam como erro de extração.
- **Reuso:** o harness é importado, sem duplicação, pelos módulos 5.2 a 5.4 e pelo protótipo do módulo 6.
- **Missão prática do bloco:** separar quais dados seriam treino, validação e teste no seu caso; definir três métricas compatíveis com tarefa estruturada; e esboçar um harness que valide o caminho correto e as falhas do próprio avaliador.

### Onde aplicar
- Construir um conjunto retido antes de qualquer decisão de escala, reservando a faixa de índices ou de fontes.
- Medir precisão por campo, consistência e conformidade de esquema para integrações que consomem JSON.
- Testar o avaliador com casos de falha plantados.
- Aceitar variações irrelevantes de formato (cerca de Markdown, acentos) sem reprovar o modelo à toa.

### Vantagens e limites
**Vantagens**
- Métricas objetivas, baratas, rápidas e determinísticas para tarefa estruturada.
- Três métricas capturam falhas diferentes (conteúdo, estabilidade, formato).
- O harness único é reaproveitado em todo o resto da disciplina.

**Limites**
- Só 11 exemplos: um único erro derrubaria a média de 100% para cerca de 91%.
- Mesma origem do treino: mede generalização dentro do padrão do gerador.
- Consistência é medida com chamadas a temperatura 0, que não garantem determinismo total.

### 🚫 Armadilhas
- Chamar de «teste» o conjunto de validação que guiou as decisões.
- Atribuir 100% a «o modelo é ótimo» em vez de «o modelo é ótimo nesta tarefa estreita, neste padrão».
- Confiar num avaliador que ninguém testou.
- Medir consistência com amostras de duas chamadas e concluir estabilidade.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Conjunto retido | Dados que não participaram de nenhuma decisão de treino ou escolha |
| Precisão por campo | Comparação campo a campo com tolerância numérica |
| Consistência | Mesma entrada, várias chamadas, mesma resposta |
| Adequação de esquema | JSON válido com exatamente os campos esperados |
| Harness | Bateria automatizada e reprodutível de avaliação |
| Índice 5000 | Margem de segurança fora da faixa de treino do gerador (máx. 59) |

---

## 💻 No código do repo

**Projeto:** [modulo-05-avaliacao-modelos (harness e ledger)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos)

O harness de avaliação (JS e Python) que chama o endpoint publicado, mais o ledger `resultado-medido.json` que guarda os números medidos para o veredito.

**Fluxo**
1. `gerarConjuntoTesteRetido`: reaproveita `gerarExemplo` do módulo 3.2 com `OFFSET_RETIDO = 5000`, um exemplo por fonte (6 de Auto e 5 de Saúde).
2. `chamarModeloReal`: POST em `endpoint:generateContent` (`temperature: 0`, token do `gcloud`); `removerCercaMarkdown` e `avaliarAdequacaoSchema` (campos faltando e extras); `normalizarTexto` (sem acento, caixa e espaços) e `avaliarPrecisaoPorCampo` (número com tolerância de 0,01); `avaliarConsistencia` (3 chamadas por padrão).
3. `gravarResultadoMedido`: escreve a chave `baseline` em `resultado-medido.json` com lock exclusivo (`.lock`) e escrita atômica; só roda em execução real, nunca nos testes.
4. `resultado-medido.json` já traz as cinco chaves usadas pelo veredito: `baseline`, `robusto-formato`, `robusto-estrutura`, `bate-generico` e `junto-bate-separado`.

**Como rodar**
- `ENDPOINT_MODULO32=projects/.../endpoints/ID GCP_PROJECT_ID=... node model-evaluation-harness-tool.js`: 11 testes (10 locais e 1 que chama o endpoint) e depois a avaliação real (consome o seu endpoint, gera custo).
- Sem `gcloud`, 10 testes passam e o da chamada real falha.

**Armadilhas e achados no código**
- Rodando o gerador, verifiquei no treino de 200 exemplos: só 28 nomes, 28 placas e 28 valores distintos. No teste retido de 11 exemplos nenhum nome foi visto, mas todos os 11 valores e 6 das 11 placas já apareciam no treino. Para extração isso é tolerável (a resposta está no texto), mas a palavra «inédito» vale só para o nome.
- Os 11 exemplos vêm do mesmo gerador, com os mesmos templates (`FONTES_AUTO` e `FONTES_SAUDE`): a limitação que a aula assume é estrutural.
- O harness grava no `resultado-medido.json` do repositório quando roda de verdade: rode numa cópia para não alterar os números de referência.
- A consistência de 3 chamadas a temperatura 0 é um sinal fraco: a aula 5.3 lembra que temperatura zero não garante determinismo absoluto.

---

## 🔗 Para ir além
- [Repositório oficial, módulo 05 (Avaliação de Modelos)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos)

---

⬅️ [11 · Full Fine-Tuning versus LoRA: o teto existe, o custo também, e o critério de decisão](./11-full-fine-tuning-vs-lora.md)  ·  [13 · Baseline, teste A/B, bootstrap, LLM-as-a-Judge e modelo conjunto versus separado](./13-baseline-ab-juiz-e-conjunto-vs-separado.md) ➡️
