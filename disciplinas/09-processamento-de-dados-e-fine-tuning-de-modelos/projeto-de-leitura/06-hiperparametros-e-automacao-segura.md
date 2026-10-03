# 06 · Hiperparâmetros, silêncio de API e automação segura: validar antes, comparar depois

> **Unidade 3 · Aulas 3 e 4** · Leitura: ~12 min · Bloco: Fine-tuning via API (Vertex AI)

## 🎯 Em uma frase
Criar um job não é operá-lo com critério. A aula mostra um incidente real (**epoch_count = 0 aceito sem erro**) e constrói duas proteções, **validar antes da rede** e **comparar pedido versus aplicado**, e depois uma automação com **fail fast, confirmação explícita antes de ação cara, backoff exponencial e injeção de dependência** para testar sem rede.

---

## 👵 Explicando para a vovó

Você pede à padaria 3 bolos e o balconista, sem avisar, anota «um qualquer» porque não entendeu o pedido. A nota fiscal sai correta, o bolo chega errado e você só descobre na festa. A defesa é dupla: conferir o pedido antes de mandar (valores impossíveis nem saem de casa) e conferir a nota depois (o que foi anotado é o que eu pedi?).

E se você pede à padaria para entregar toda semana sozinha, a regra de ouro é: tudo que é barato pode rodar sozinho; o que gasta dinheiro precisa de um «pode confirmar» explícito.

---

## 🔧 Tecnicamente

### O que é
- **Três hiperparâmetros do módulo:** epoch count (quantas vezes o modelo percorre o dataset; 3), learning rate multiplier (multiplica uma taxa base interna calibrada pelo provedor; 5) e adapter size (capacidade da camada adaptativa treinada; 4).
- **Épocas:** poucas passagens dão underfitting; demais, principalmente em dataset pequeno, dão overfitting. Dataset menor tolera mais épocas; maior pede menos. É ponto de partida, não fórmula.
- **Multiplicador e adapter:** perto de 1 preserva o ritmo calibrado; um valor baixo demais deixaria o modelo parecido com o base; alto demais pode desestabilizar. Adapter size baixo basta para aprender um padrão estreito (saída curta de três campos); ranks 8 ou 16 custam mais parâmetros, memória e tempo.
- **O incidente real:** ao tentar criar um job com epoch count 0, esperava-se falha de validação antes de alocar recurso. A Vertex AI aceitou, levou o job a Running e o campo apareceu ausente na configuração aplicada. O job foi cancelado após cerca de 40 segundos (custo pequeno, mas real).
- **Silêncio não é confirmação:** numa automação semanal de retreino, um bug que zerasse o epoch count criaria jobs por semanas.
- **Proteção 1, validar antes da rede:** epoch count inteiro entre 1 e 20 e learning rate multiplier entre 0,1 e 10; valor zero, negativo ou fracionário é rejeitado localmente, de graça.
- **Proteção 2, pedido versus aplicado:** depois de criar o job, comparar o que foi pedido com o que o objeto do job diz ter aplicado. Uma pegadinha: a API devolve inteiros de 64 bits como texto, então a comparação tenta converter os dois lados para número antes de decidir se há divergência (senão, o monitor acusaria erro em jobs corretos).
- **Monitoramento sem curva de loss:** nesta API não há loss durante o job, só estatísticas do dataset: ~27.353 tokens cobráveis, entradas na ordem de uma centena de tokens e saídas ao redor de 27 em média. A API aceita um dataset de validação separado, deixado de fora de propósito para o módulo de avaliação.
- **Automação em 5 passos:** converter, validar, subir ao bucket, criar o job, acompanhar até estado terminal. Sequencial por desenho: se o upload falha, não se cria job; se um exemplo é incompleto, para antes dos hiperparâmetros (fail fast).
- **Confirmação onde o impacto justifica:** a criação do job só executa a chamada com confirmação explícita (`confirmar: true`); sem ela, o erro sai localmente. É a versão mínima do «plan e apply» da infraestrutura como código e do dry run.
- **Idempotência parcial:** repetir o upload para o mesmo caminho substitui o objeto (idempotente); criar job não é: cada chamada bem-sucedida cria um treino novo e uma nova cobrança.
- **Polling com backoff:** primeira consulta imediata; depois 5 s, multiplicando por 1,5 até o teto de 60 s (5; 7,5; 11,25; 16,875...). O teto limita a demora para perceber o fim a ~1 minuto. Um callback registra cada estado, para a automação não parecer travada.
- **Injeção de dependência:** a função de consulta e a de espera são injetáveis; nos testes entram versões falsas (estado terminal já na primeira consulta; sequência Pending, Running, Running, Succeeded com exatamente 3 esperas; callback recebendo todos os estados na ordem).

### Como funciona
- **Testes da etapa 3.3:** 9 testes (configuração real passa, epoch 0 rejeitado, negativos e não inteiros falham, comparação detecta divergência de valor e campo ausente, texto equivale a número) e a reprodução local do bloqueio do zero.
- **Testes da etapa 3.4:** 18 testes em grupos: upload (comando montado, extensão JSONL, destino começando com o esquema do storage), trava de confirmação (bloqueia sem opção, com opções vazias, libera só com verdadeiro), conversão e validação reusadas, backoff (fator e teto) e o loop assíncrono com dependências falsas, mais a orquestração ponta a ponta e seus caminhos de falha.
- **Dataset alternativo:** para quem não tem caso de trabalho, o repositório processa o Dolly-15k de ponta a ponta com a mesma esteira (mapeamento ao esquema canônico, dedup, balanceamento, conversão, job real, inferência com temperatura 0). O primeiro job usou multiplicador 1 e o modelo ficou quase igual ao base; refeito com multiplicador 5, a mesma pergunta passou a ter resposta correta.
- **Configuração é contextual:** três épocas, multiplicador 5 e adapter 4 valem para este dataset e esta tarefa; com dataset maior, menos épocas; com tarefa mais ampla, rank maior; em experimentos comparativos, fixar o resto para variar uma coisa por vez.

### Onde aplicar
- Tratar toda API de treinamento como não confiável para validação: validar localmente e auditar o aplicado.
- Colocar confirmação explícita em qualquer passo de automação que crie recurso cobrável.
- Escrever monitores com backoff, teto, callback e retry de falha transiente, testados sem rede e sem esperar.
- Registrar cada hiperparâmetro como decisão do experimento, não como número copiado de tutorial.

### Vantagens e limites
**Vantagens**
- Uma falha que consumiria infraestrutura vira um erro local imediato e barato.
- A injeção de dependência torna o loop assíncrono rápido e determinístico de testar.
- A confirmação concentra a supervisão humana no ponto de maior impacto.

**Limites**
- A validação local não prevê todas as regras internas do provedor (por isso a segunda camada).
- A comparação cobre só os campos que você passa para comparar.
- O backoff de 5 s a 60 s para jobs de dezenas de minutos significa que a maior parte do tempo é gasta no teto de consulta.

### 🚫 Armadilhas
- Interpretar a ausência de erro da API como prova de configuração correta.
- Comparar 3 com «3» por igualdade estrita.
- Deixar a automação criar outro job a cada execução acidental.
- Escolher época e multiplicador por tutorial, sem relação com o volume e o objetivo.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Epoch count | Número de passagens completas pelo dataset |
| Learning rate multiplier | Fator sobre a taxa base interna do provedor |
| Adapter size | Capacidade (rank) da camada adaptativa treinada |
| Fail fast | Interromper no primeiro passo que falha, antes de criar recursos |
| Backoff exponencial | Intervalo entre consultas que cresce por um fator até um teto |
| Callback | Função chamada a cada atualização, para tornar o acompanhamento observável |
| Injeção de dependência | Passar consulta e espera como argumentos, para testar sem rede |
| Pedido versus aplicado | Comparar a configuração enviada com a que o job informa ter usado |

---

## 💻 No código do repo

O versionamento do resultado do job (hash de dataset, Model Card) vem no [tópico 07](./07-versionamento-model-card-e-preference-tuning.md).

**Projeto:** [modulo-03-fine-tuning-via-api (hiperparâmetros, automação e Dolly)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-03-fine-tuning-via-api)

Duas ferramentas centrais (monitoramento e automação) e o pipeline paralelo do Dolly-15k, todos em JS e Python, com suítes de teste que rodam sem rede.

**Fluxo**
1. `hyperparameter-and-monitoring-tool.js`: `validarHiperparametros` (epoch 1 a 20 inteiro, multiplicador 0,1 a 10), `valoresEquivalentes` (converte para número) e `compararHiperparametros`; `consultarJobCompleto` e `resumirEstatisticaTreino` leem `tuningDataStats`. 9 testes.
2. `finetuning-automation-tool.js`: `exigirConfirmacao`, `criarJobFineTuning` (POST em `tuningJobs`), `calcularProximoIntervalo`, `consultarComRetry` (3 tentativas, 3 s de atraso, retry de leitura transiente), `acompanharAteFinalizar` (5 s, fator 1,5, teto 60 s, estados terminais SUCCEEDED, FAILED e CANCELLED) e `automatizarFineTuning`, que injeta upload, criação e acompanhamento. 18 testes.
3. `dolly-dataset-real-starter.js` (4.467 exemplos compatíveis, dedup por instrução mais entrada) e `dolly-vertex-pipeline.js` (conversão sem `JSON.stringify` porque a saída é texto, refresh de token, retry, inferência com `temperature: 0`); `dataset-real-alternativo-companion.md` e `model-card-dolly-extra-200.md` documentam os dois jobs (13 min 09,9 s, 67.668 tokens).

**Como rodar**
- `TUNING_JOB_NAME=... GCP_PROJECT_ID=... node hyperparameter-and-monitoring-tool.js` e `node finetuning-automation-tool.js` (os testes rodam sem `gcloud`; a parte de nuvem falha com aviso). `node dolly-vertex-pipeline.js` só roda a suíte local; criar job exige `confirmar: true`.
- Para o Dolly, baixe o JSONL (13 MB) do Hugging Face; ele não é versionado no repositório.

**Armadilhas e achados no código**
- Nenhuma ferramenta do repositório envia `adapterSize` na criação do job (só `epochCount` e `learningRateMultiplier`), e a validação também não o cobre. O documento de decisões do módulo 6 admite que o «posto 4» é o default silencioso da Vertex AI. A aula, porém, apresenta o adapter size 4 como escolha deliberada: leia o repositório como correção.
- No `main` da ferramenta de monitoramento, a comparação usa um pedido fixo no código (3 épocas, multiplicador 5) e só compara esses dois campos; o `adapterSize` é só impresso.
- O upload usa `gsutil cp` montado como string de shell (`execSync`); caminho com aspas quebraria o comando, e `gsutil` precisa estar instalado.
- O mecanismo de retry (`consultarComRetry`) existe no código e não é citado na aula.
- Vários scripts lançam erro ao serem importados quando falta `TUNING_JOB_NAME` ou `GCP_PROJECT_ID`; o harness do módulo 5 faz a checagem de forma preguiçosa para evitar isso.
- O teste de inferência do Dolly usa uma pergunta do próprio dataset de treino, então mostra aprendizado do formato, não generalização.

---

## 🔗 Para ir além
- [Repositório oficial, módulo 03 (Fine-Tuning via API)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-03-fine-tuning-via-api)
- [Databricks Dolly 15k (companion de dataset alternativo)](https://huggingface.co/datasets/databricks/databricks-dolly-15k)

---

⬅️ [05 · Fine-tuning gerenciado na Vertex AI: diligência de provedor, os 5 passos e um job real](./05-vertex-ai-provedor-pipeline-e-job-real.md)  ·  [07 · Linhagem do modelo: hash SHA-256, Model Card, registry e Preference Tuning](./07-versionamento-model-card-e-preference-tuning.md) ➡️
