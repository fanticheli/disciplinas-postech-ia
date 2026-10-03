# 17 · Decisões de arquitetura, escala para 3.000 exemplos (e a regressão) e o fechamento da disciplina

> **Unidade 6 · Aula 3** · Leitura: ~12 min · Bloco: Projeto final

## 🎯 Em uma frase
Código funcionando não encerra um projeto profissional. A aula documenta as **oito decisões** no formato **escolha, alternativa rejeitada, por quê, resultado real**, reavalia o modelo escalado para **3.000 exemplos** com o mesmo protocolo (e encontra uma **regressão no Round 2: 100% para 66,7%**) e delimita o que o case prova e o que não prova.

---

## 👵 Explicando para a vovó

Quem herdar este projeto daqui a um ano vai perguntar: por que um classificador de palavras e não um LLM? Por que a nuvem como padrão? Se o motivo morreu na cabeça de quem decidiu, a próxima pessoa reconstrói o raciocínio, talvez diferente. Escrever o porquê é deixar o diário de bordo.

E um bom diário registra também a tentativa que deu errado. Dar mais dado a um aluno nem sempre melhora a nota: às vezes ele erra uma coisa nova. Escrever isso com todas as letras vale mais que esconder.

---

## 🔧 Tecnicamente

### O que é
- **O formato:** escolha (o caminho adotado), alternativa rejeitada (metade do raciocínio), por quê (ligado a custo, escala, manutenção, qualidade, latência, risco, disponibilidade de dados) e resultado real (um número, uma métrica, um comportamento rastreável a um experimento).
- **As oito decisões:** (1) gate ponderado por AHP e não checklist binário (Saúde 0,60 e Atendimento 0,66 parecem próximos no agregado, mas um reprova por dado, temporário, e outro por tarefa aberta, estrutural); (2) MinHash + LSH e não comparação par a par (549 para 20 comparações, recall perfeito); (3) API gerenciada na Vertex AI e não infraestrutura própria (provar o caso de negócio antes); (4) LoRA rank 8 e não Full (empate comportamental com 153,5 vezes menos parâmetros); (5) protocolo de avaliação em três frentes (retido, baseline, estresse); (6) classificador de palavras-chave e não um segundo LLM; (7) Vertex AI por padrão e modelo local opcional; (8) recusar em vez de adivinhar.
- **Honestidade documentada:** o rank 8 era também o default da ferramenta, e foi confirmado por experimento depois; a decisão só é auditável se o documento reflete o processo real. O documento do repositório admite também que o **posto 4 do job da Vertex AI nunca foi pedido** em nenhum job (é o default silencioso do provedor, achado numa auditoria posterior) e que a faixa de 3.000 exemplos é um critério aplicado na revisão, não uma recomendação numérica do módulo 5.4.
- **Decisão transversal de reuso:** importar a função já testada (framework do módulo 1, limpeza do módulo 2, harness do módulo 5) em vez de copiá-la; no módulo 3 o reuso é por chamada de API (o endpoint).
- **O modelo de 3.000 exemplos:** 1.800 de Auto e 1.200 de Saúde, 10 oficinas e 8 clínicas (contra 6 e 5), três personas de redação por fonte (bloco formal, texto corrido, exportação abreviada), campos distratores (apólice, franquia, convênio, guia, CRM) e ruído de OCR em ~9% dos exemplos. Quinze vezes mais dados que o piloto, mesmos hiperparâmetros, mesma Vertex AI.
- **Reavaliado com o mesmo protocolo:** teste retido, Round 1 e Round 2. No retido e no Round 1 o desempenho continuou forte (11/11 e 6/6); no Round 2 houve **regressão: 100% para 66,7%**, e os dois casos que falharam são os únicos com dois registros no mesmo texto (um completo, outro incompleto). O resultado foi confirmado em dezenas de chamadas, então não é o ruído de amostra pequena do alarme falso do 5.3. Mais dados não garantem manter o que funcionava: escalar precisa ser medido, não presumido.
- **O que o case prova:** um piloto curado de 200 exemplos, com protocolo rigoroso, generalizou para dados nunca vistos, superou o genérico por margem clara, resistiu a variações de formato e estrutura e foi integrado a um protótipo; e a abordagem pode ser escalada e reavaliada pelo mesmo protocolo.
- **O que não prova:** que 3.000 bastam em qualquer escala de produção; generalização para outro idioma, moeda, padrão de documento ou volume de tráfego; resistência a entradas maliciosas; que escalar sempre preserva o desempenho. Dizer o que o experimento não prova delimita onde a evidência vale.
- **Custo real do escalado:** o job de 3.000 levou 24 min 53 s (o de 200, 45 min 42 s; provavelmente variação de fila, não relação causal), com 474.448 tokens faturáveis e custo de R$ 41,40 no billing. O total do case (piloto R$ 2,39 mais escalado R$ 41,40) é de R$ 43,78; os jobs de ablação por domínio (R$ 1,53 e R$ 0,86) vêm além disso. Estimar custo pela página de preços engana nos dois sentidos: confundir preço de inferência com o de treino superestima dezenas de vezes; esquecer o fator épocas subestima cerca de mil vezes.
- **Fine-tuning não desaparece:** modelos genéricos melhoram, e empresas continuam com dado proprietário, vocabulário e processos próprios. Mas a decisão precisa ser medida. O material complementar reúne casos reais (atendimento, saúde, jurídico, finanças, ferramentas de desenvolvimento, varejo, mídia).
- **Missão prática final (4 etapas):** aplicar o framework a um caso real (reprovar é entrega válida); construir um piloto pequeno se aprovado (curado, deduplicado, balanceado, com origem conhecida; com dado sintético só com cuidado para o modelo não decorar o padrão do gerador); avaliar em três frentes (o estresse escrito à mão, não variação automática do template); e documentar cada decisão no formato escolha, alternativa, por quê, resultado.
- **O campo continua mudando:** world models, sistemas agênticos, protocolos de integração, mais autonomia e novos riscos; mais autonomia exige auditoria, sandboxing, permissões, monitoramento, rastreabilidade e segurança, tema da disciplina seguinte (Segurança e Governança em IA). Disponibilidade de provedores e validade de modelos também mudam.
- **Dois fios do curso:** a ferramenta certa, não a mais sofisticada (AHP porque separava melhor, MinHash porque escalava, API gerenciada por ser proporcional ao piloto, LoRA pelo resultado com menos parâmetros, palavras-chave porque o problema era simples, recusa porque incerteza não vira dado errado) e mensurar antes de confiar (todo resultado incômodo é investigado). Fecho da apostila: escolher com evidência, medir antes de confiar e registrar o que sustentou cada escolha.

### Como funciona
- **Reavaliar sem mudar o protocolo:** se o protocolo muda junto com o modelo, perde-se a comparação; o verificador reexecuta os mesmos três conjuntos contra os dois endpoints.
- **Documentar o dataset de produção:** a montagem dos 3.000 exemplos tem documentação própria; resultado de modelo sem rastreabilidade de dados é incompleto.
- **Guias complementares:** um guia de reavaliação pós-escala (congelar o número do dia do gate com o método de medição, e remedir depois do deploy, citando o estudo de Chen, Zaharia e Zou sobre drift do GPT-4 entre março e junho de 2023) e um guia de geração sintética via LLM (escrever o texto em torno do valor, pedir diversidade, incluir distratores, gerar mais e curar pelo pipeline real, validar uma amostra).
- **Revisão final (perguntas da apostila):** em que situação o framework deve interromper a recomendação; por que um dataset válido exemplo a exemplo pode ser inadequado como conjunto; como pedido versus aplicado reduz risco; por que hash e Model Card importam para a linhagem; como rank e scale alteram a decisão de LoRA; quando o ganho do Full justifica memória e armazenamento.

### Onde aplicar
- Fechar um projeto de IA com um documento de decisões auditável.
- Reavaliar um modelo depois de escalar o dataset com o mesmo protocolo, antes de declarar melhora.
- Gerar dado sintético com rótulo garantido (valor conhecido, texto escrito em torno dele).
- Monitorar um modelo em produção contra o número registrado no dia do gate.

### Vantagens e limites
**Vantagens**
- Faz o raciocínio sobreviver a quem decidiu.
- Registrar resultado incômodo (a regressão) aumenta a credibilidade.
- Custos reais conferidos no billing tornam o NPV honesto.

**Limites**
- O dataset de produção é gerado por um gerador determinístico: a «diversidade» é a de templates e personas projetados pelo autor.
- Seis exemplos por round de estresse são pouco para tirar conclusões sobre o escalado.
- O documento de decisões mistura decisões tomadas antes e racionalizações feitas depois, algumas admitidas (rank 8 e posto 4 por default).

### 🚫 Armadilhas
- Assumir que mais dado melhora um piloto que já funcionava.
- Estimar custo de treino pela página de preços sem fator de épocas.
- Esconder alternativas rejeitadas e só registrar a escolha final.
- Apresentar uma conclusão sem delimitar o que ela não prova.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| ADR | Architecture Decision Record: escolha, alternativa rejeitada, por quê e resultado |
| Escopo da evidência | Onde a conclusão vale e onde não foi testada |
| Regressão | O modelo escalado piorou num caso que o piloto acertava |
| Dataset de produção | 3.000 exemplos (1.800 Auto e 1.200 Saúde) gerados pelo pipeline |
| Drift | Comportamento do modelo que muda sem mudar a pergunta |
| Sandboxing | Isolamento do agente, assunto da disciplina de segurança |

---

## 💻 No código do repo

**Projeto:** [modulo-06-projeto-final (escala, verificação e documentos)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-06-projeto-final)

O gerador do dataset de produção, o verificador do modelo escalado, o documento de decisões, os guias complementares e o pôster do estado da fronteira.

**Fluxo**
1. `m6-dataset-scaling-tool.js` (e `.py`): gerador com 53 prenomes, personas `blocoFormal`, `textoCorrido` e `exportacaoAbreviada`, `distratorAuto/Saude` e `aplicarRuidoOcr`; reaproveita `limparEBalancear` do módulo 2: 4.107 brutos, 4.099 depois da deduplicação (8 duplicatas), 3.000 balanceados (1.800 e 1.200). 6 testes.
2. `amplitude-seguros-dataset-producao-3000.jsonl` (1,8 MB, 3.000 linhas no esquema canônico) e `dataset-de-producao-leia-me.md`.
3. `m6-scaled-model-verification-tool.js` (e `.py`): avalia o endpoint antigo (`ENDPOINT_MODULO32`) e o novo (`ENDPOINT_MODULO63`) contra o retido, o Round 1 e o Round 2 reproduzidos literalmente.
4. `decisoes-de-arquitetura.md` (oito decisões, adendo da escala, custo real, o que prova e o que não prova), `guia-reavaliacao-pos-escala.md`, `guia-geracao-sintetica-via-llm.md` e `estado-da-fronteira-poster.html` (Genie 3, crescimento do MCP, o incidente de sandbox de um agente da OpenAI na Hugging Face, a resposta regulatória, e uma seção declarada como extrapolação).

**Como rodar**
- `node m6-dataset-scaling-tool.js` (offline): imprime o pipeline 4.107, 4.099 e 3.000, as contagens por fonte e o número efetivo de fontes (Auto 7,438 para 8,366; Saúde 6,084 para 6,946).
- `ENDPOINT_MODULO32=... ENDPOINT_MODULO63=... node m6-scaled-model-verification-tool.js` exige dois endpoints seus e chamadas pagas.

**Armadilhas e achados no código**
- O `leia-me` diz que rodar `node m6-dataset-scaling-tool.js` «reproduz este dataset do zero», mas nem a versão JS nem a Python gravam arquivo: só imprimem o pipeline e uma amostra (a primeira amostra bate com a primeira linha do JSONL, o que indica determinismo).
- O README raiz e o documento falam em «3.000 exemplos reais»; são gerados por um pipeline determinístico com personas, distratores e ruído, como o próprio leia-me descreve.
- O verificador reproduz os conjuntos do Round 1 e 2 «literalmente» porque o arquivo do 5.3 não os exporta: duas cópias que podem divergir, o contrário da decisão transversal de reuso.
- O documento de decisões fala em R$ 43,78 para os dois jobs principais; a Atividade 3 em PDF cita R$ 60,62 somando fine-tuning e inferência do projeto inteiro: são recortes diferentes.
- Os IDs de job no texto (`tuningJobs/4180970763655839744` e `8278721957516541952`) são do autor; seus endpoints vêm de variáveis de ambiente.
- As Atividades e Exemplos em PDF de cada módulo (Missões Práticas 1 a 6) estão nas pastas dos módulos.

---

## 🔗 Para ir além
- [Repositório oficial, módulo 06 (Projeto Final)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-06-projeto-final)
- [Chen, Zaharia e Zou: How Is ChatGPT's Behavior Changing over Time? (citado no guia)](https://arxiv.org/abs/2307.09009)
- [Hugging Face: Anatomy of a Frontier Lab Agent Intrusion (indicação, relatório 22)](https://huggingface.co/blog)

---

⬅️ [16 · Do modelo ao protótipo: classificar, rotear, validar e responder, recusando quando há incerteza](./16-assistente-arquitetura-e-implementacao.md)  ·  [README](./README.md) ➡️
