# 05 · Fine-tuning gerenciado na Vertex AI: diligência de provedor, os 5 passos e um job real

> **Unidade 3 · Aulas 1 e 2** · Leitura: ~12 min · Bloco: Fine-tuning via API (Vertex AI)

## 🎯 Em uma frase
Aprovar fine-tuning é a primeira decisão; **como treinar** é a segunda. A Unidade 3 trata o caminho gerenciado: escolher o provedor com **diligência de continuidade** (Vertex AI), seguir os **5 passos** (converter, subir, configurar, treinar, monitorar) e rodar um job real com 200 exemplos, depois de reavaliar Saúde Empresarial pelo mesmo critério.

---

## 👵 Explicando para a vovó

Contratar fine-tuning por API é como mandar uma obra para uma construtora: você entrega as plantas no formato que ela exige, ela faz o serviço no canteiro dela e você acompanha pelo painel. Antes de assinar, a pergunta madura é se a construtora ainda vai existir daqui a seis meses, quando você precisar de uma reforma.

E o contrato bom não obriga você a refazer a papelada inteira se trocar de construtora: você guarda as plantas num formato próprio e só ajusta a última página para cada fornecedor.

---

## 🔧 Tecnicamente

### O que é
- **Segunda decisão:** o módulo 1 decidiu se vale a pena; o módulo 2 preparou dado relevante, validado, higienizado, deduplicado e diverso; agora é «como treinar»: API gerenciada (módulo 3) ou LoRA local (módulo 4). Aprovar fine-tuning não significa que a API gerenciada seja automaticamente a melhor técnica.
- **Risco de depender de um provedor:** durante a preparação da disciplina o self-service de fine-tuning da OpenAI entrou em descontinuação e a API pública do Gemini já havia encerrado o recurso. Tutorial antigo pode estar conceitualmente certo e apontar para um fluxo que já não existe.
- **Diligência de provedor:** a pergunta de Camila não é só se há API funcional, e sim: se for preciso retreinar em seis meses o serviço continuará disponível? o modelo base ainda será suportado? o acesso continuará self-service? contrato e permissões continuarão adequados?
- **Provedor adotado:** Vertex AI no Google Cloud (apresentado sob a marca da plataforma empresarial do Gemini), escolhido pela integração com o resto do stack (armazenamento, identidade, permissões, faturamento, cotas). Azure OpenAI, Together AI, Fireworks e Mistral são citados como opções que continuam relevantes. Não é a antiga API pública do Gemini com fine-tuning por API key.
- **Os 5 passos genéricos:** (1) preparar o dataset no formato exato do provedor, (2) enviá-lo a um armazenamento acessível ao serviço, (3) configurar o job (modelo base e hiperparâmetros), (4) treinamento gerenciado, (5) monitorar até sucesso ou falha. O que muda entre provedores é o contrato concreto, não a arquitetura.
- **Cada treino gera um artefato versionado:** retreinar não deve substituir silenciosamente o anterior; produção precisa saber qual versão atende, com qual dataset e quais configurações.
- **Validação sintética antes do dado real:** 32 exemplos separados dos conjuntos do módulo 2, só para provar a infraestrutura: pending, running e succeeded em pouco menos de meia hora, endpoint publicado ao final. Confirma que a conversão foi aceita, o upload funcionou com as permissões certas, os hiperparâmetros foram aceitos e o status da API bate com o console.
- **Governança reaberta:** uma base legal e um DPA aprovados para um serviço não se transferem automaticamente a outro; trocar de provedor reabre o gate do módulo 1.
- **Esquema canônico paga a conta:** no formato da Vertex AI, instrução e entrada são combinadas no turno do usuário e a saída vira o turno do modelo (o JSON exato). A camada de adaptação é pequena porque limpeza, relevância, deduplicação e balanceamento não dependem do provedor.
- **Gate de confiança de OCR:** a confiança guardada no módulo 2 ganha função: documentos reais (94% a 96%) passam; um documento degradado (62%) vai para revisão humana em vez de entrar no treino. Os 200 exemplos do job não passam pelo gate porque são texto sintético, sem confiança de OCR (ausência é «não aplicável», não «baixa qualidade»).
- **Escala do pipeline:** 305 exemplos brutos (6 oficinas e 5 clínicas), 300 após deduplicação, 200 após balanceamento por temperatura (120 Auto e 80 Saúde). Número efetivo de fontes: Auto ~5,2 para ~5,7 (a aula diz 5,516 no «antes»; o código imprime 5,160) e Saúde ~4,1 para ~4,7.
- **Reavaliação de Saúde, nove meses depois:** o mesmo framework, mesmos pesos e limiar, só a pergunta 3 atualizada: de 0,35 para 0,62 (crescimento de 0,03 por mês), volume de 1.200 para ~1.862. «A régua não foi reduzida para caber na demonstração.»
- **Um bug real no gerador sintético:** listas de nomes, placas e valores de 40 itens ciclavam juntas; o exemplo 41 repetia nome, placa e valor do exemplo 1 e o detector via duplicata. A correção usou pools de tamanhos diferentes (mais de 1.500 combinações antes de repetir) e só restaram os 5 pares plantados. Lição: valide as duplicatas do bruto antes de confiar na métrica.
- **Job real:** o job foi criado antes da gravação (leva dezenas de minutos); ao vivo roda-se uma consulta de status real. Gemini 2.5 Flash, 3 épocas, upload como novo objeto (cada versão do dataset mantém seu caminho). Succeeded em ~45 min 42 s (o piloto de 32 exemplos levou ~28 min 32 s), ~27.353 tokens cobráveis, modelo ajustado e endpoint publicado.

### Como funciona
- **Fronteira local versus nuvem:** conversão do dataset e gate de OCR rodam localmente, sem credenciais nem custo; só depois entram autenticação, bucket, API e recursos cobráveis. Isso permite testar regra de qualidade sem depender de cota.
- **Estados do job:** Pending é a fila; Running é treinamento em execução (os pesos estão sendo atualizados por lote); Succeeded significa que terminou e o artefato foi publicado; Failed pode trazer formato inválido, cota excedida ou hiperparâmetro fora da faixa. Em produção, esses estados decidem se o sistema espera ou se alguém age.
- **Testes antes do upload:** 13 testes confirmam que cada exemplo convertido tem dois turnos, o turno do usuário carrega instrução e entrada completas, o do modelo traz o JSON esperado, exemplos incompletos são rejeitados antes de qualquer upload e o gate de OCR encaminha cada caso pelo motivo certo.
- **Custo gerenciado não é minuto visível:** a Vertex AI cobra o treinamento por tokens processados. A aula cita uma faixa de cinco a onze centavos de dólar; o repositório a trata como subestimativa e registra o valor real do billing, R$ 2,39 (27.353 tokens × 3 épocas, tópico 07). Número do repositório prevalece sobre o da aula.
- **Escala de tempo:** converter, subir e configurar o job é rápido para centenas de exemplos; o tempo real está no treinamento. Em dataset pequeno, nuvem e local levam minutos; a diferença estrutural (comparada no módulo 4 com números) é quem controla e paga o tempo: fila e infraestrutura compartilhada no gerenciado, a sua máquina no local.
- **Missão prática do bloco:** representar o processo em cinco passos, registrar as verificações locais anteriores ao uso de recursos do provedor e incluir diligência de provedor e reavaliação de governança na arquitetura.

### Onde aplicar
- Escolher provedor de fine-tuning avaliando continuidade, suporte ao modelo base, governança e estratégia de saída, não só a documentação.
- Validar o caminho completo com um dataset sintético pequeno antes de pôr dado real no pipeline.
- Manter um formato canônico e um conversor final por provedor.
- Reavaliar uma decisão antiga («esperar») com o mesmo critério e dado novo, em vez de mudar a régua.

### Vantagens e limites
**Vantagens**
- Sem GPU nem ambiente próprio: sobe-se o dataset e dispara-se o job.
- O esquema canônico torna a troca de provedor um problema de conversor, não de pipeline.
- Os estados do job e os artefatos publicados são observáveis por API.

**Limites**
- Você passa a depender de fila, cota, modelos suportados, limites e preço do provedor.
- O modelo base tem data de retirada anunciada; o nome do modelo da demo pode não existir quando você executar.
- O treino é opaco: não há curva de loss na API usada, só estatísticas do dataset.

### 🚫 Armadilhas
- Confiar em post de blog ou exemplo de curso como se descrevesse a capacidade atual do provedor.
- Reaproveitar o aceite jurídico de um provedor para outro.
- Sobrescrever o dataset de um job anterior: o job que falha precisa continuar apontando para os dados usados.
- Tratar como «real» o dataset de 200 exemplos: são textos sintéticos gerados por um gerador determinístico, só chamados de reais por terem sido treinados de verdade.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Vertex AI | Plataforma gerenciada do Google Cloud usada para o fine-tuning supervisionado |
| Job de tuning | Recurso cobrável que treina e publica modelo ajustado e endpoint |
| Pending / Running / Succeeded | Fila, treinamento em execução, terminou com artefato publicado |
| contents / role / parts | Formato de exemplo da Vertex AI: turnos user e model com partes de texto |
| Gate de confiança de OCR | Confiança baixa vai para revisão humana antes do treino |
| Diligência de provedor | Checar continuidade, suporte, acesso e contrato antes de escolher |

---

## 💻 No código do repo

**Projeto:** [modulo-03-fine-tuning-via-api (conversão, escala e job real)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-03-fine-tuning-via-api)

Três ferramentas (JS e Python), o dataset treinado em formato Vertex e o guia opcional de setup do Google Cloud. A conversão e o gate rodam local; só a consulta ao job real chama a nuvem.

**Fluxo**
1. `dataset-upload-and-tracking-tool.js`: `converterParaFormatoGemini` gera `contents` com um turno `user` (instrução, linha em branco, entrada) e um `model` (`JSON.stringify(saida)`); `filtrarPorConfiancaOcr` (limiar padrão 0,85) separa aprovados, sem confiança de OCR e sinalizados para revisão; `consultarStatusJob` faz GET REST em `aiplatform.googleapis.com` com `gcloud auth print-access-token`. 13 testes.
2. `m3-dataset-scaling-tool.js`: gera 305 exemplos brutos (183 Auto e 122 Saúde), reusa `limparEBalancear` do módulo 2 por `require` e entrega 200 (120 e 80); 6 testes, incluindo «nenhum id repete» (o bug do gerador). Exporta `gerarExemplo`, reutilizado pelo harness do módulo 5.
3. `reavaliacao-saude-empresarial.js`: `construirCasoNoveMesesDepois` soma 0,03 por mês ao score p3 durante 9 meses (0,62) e cresce o volume; reaplica o mesmo `avaliarFramework` do módulo 1. 5 testes.
4. `dataset-treinado.jsonl` (200 linhas, só `contents`, sem metadata) é o dataset enviado ao job; `gcp-setup-companion.md` traz os 7 passos para criar projeto, billing, APIs, autenticação e bucket.

**Como rodar**
- `node m3-dataset-scaling-tool.js` e `node reavaliacao-saude-empresarial.js` rodam sem nada (resultado: 305 para 300 para 200; p3 0,62; volume 1.862).
- `TUNING_JOB_NAME=projects/.../tuningJobs/ID node dataset-upload-and-tracking-tool.js` roda os 13 testes e tenta a consulta; sem `gcloud` ela cai no aviso «Não foi possível consultar o job agora». O script lança erro no topo se a variável não existir.

**Armadilhas e achados no código**
- A aula diz que o número efetivo de Auto sobe de ~5,516 para ~5,723; o código imprime 5,160 antes e 5,723 depois (Saúde 4,140 para 4,706 bate). Provável erro de digitação da aula.
- A aula aponta custo de cinco a onze centavos de dólar para o job; o model card e o documento de decisões do repositório corrigem para R$ 2,39 conferidos no billing (tópico 07).
- A nota de p3 = 0,62 é uma projeção linear (0,35 + 0,03 × 9), não uma medição de dado novo; o código «constrói o caso nove meses depois», não coleta nada.
- O dataset de 200 exemplos só tem 28 nomes, 28 placas e 28 valores distintos repetidos em vários templates (contei no arquivo): a «diversidade de fonte» é de template, não de entidade.
- Comentários de código e documentos citam o ID de um job real do autor; as ferramentas exigem `TUNING_JOB_NAME` e não têm valor padrão.
- A chamada do job exige `gcloud` autenticado e projeto com billing; a família Gemini 2.5 tem retirement anunciado para 16/out/2026.

---

## 🔗 Para ir além
- [Repositório oficial, módulo 03 (Fine-Tuning via API)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-03-fine-tuning-via-api)
- [Vertex AI](https://cloud.google.com/vertex-ai)
- [Documentação de tuning (Gemini Enterprise Agent Platform)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning)
- [Notas de versão da Vertex AI (aposentadoria de modelos)](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/release-notes)
- [Cronograma de descontinuação da OpenAI](https://developers.openai.com/api/docs/deprecations)

---

⬅️ [04 · O dataset como conjunto: MinHash, LSH, amostragem por temperatura e entropia](./04-dataset-como-conjunto-minhash-lsh-temperatura.md)  ·  [06 · Hiperparâmetros, silêncio de API e automação segura: validar antes, comparar depois](./06-hiperparametros-e-automacao-segura.md) ➡️
