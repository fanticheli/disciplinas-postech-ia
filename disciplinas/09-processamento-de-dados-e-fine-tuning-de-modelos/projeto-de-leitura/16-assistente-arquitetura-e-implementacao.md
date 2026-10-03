# 16 · Do modelo ao protótipo: classificar, rotear, validar e responder, recusando quando há incerteza

> **Unidade 6 · Aulas 1 e 2** · Leitura: ~12 min · Bloco: Projeto final

## 🎯 Em uma frase
Um modelo treinado, publicado, avaliado e aprovado ainda não é um produto. O projeto final constrói a **carroceria** ao redor do motor: um protótipo em JavaScript com **4 passos (classificar, rotear, validar em duas camadas, responder)**, **Vertex AI por padrão e LoRA local opcional**, e uma regra que atravessa tudo: **incerteza não vira resposta forçada**.

---

## 👵 Explicando para a vovó

Um motor perfeito, testado no dinamômetro, ainda não é um carro: faltam carroceria, volante e pedais. O modelo fine-tunado é o motor; o protótipo é o carro que uma pessoa comum consegue dirigir sem saber montar prompt, autenticar e interpretar JSON.

E um bom recepcionista tem três respostas, não duas: «sim, anotei», «isso não é comigo, vou chamar um especialista» e «não entendi, pode confirmar?». Chutar um setor para parecer eficiente é o pior caminho.

---

## 🔧 Tecnicamente

### O que é
- **Não repete os módulos anteriores:** reaproveita tudo que já é confiável (endpoint do módulo 3, harness do módulo 5, funções de avaliação) e constrói só a cola. Reescrever lógica validada só para ter um arquivo novo aumenta o risco; copiar uma regra em dois lugares permite divergência.
- **Casos de mercado (aula 1):** a EXL (BPO para seguradoras) com a NVIDIA e um modelo fine-tunado em dados proprietários de sinistros (extração e apoio a underwriting: +30% de acurácia sobre o genérico e -30% de custo operacional, segundo o caso) e o Nubank (transformer sobre sequências de transações; +1,25% de AUC relativo no teste offline e, segundo a aula, ganho de longo prazo de 32% na métrica de negócio). Lição comum: fine-tuning não é o produto final, é um componente que precisa de arquitetura.
- **O fluxo de 4 passos, nesta ordem:** (1) classificar o domínio a partir do texto bruto (o classificador ainda não tem o JSON de saída); (2) rotear para o modelo (endpoint da Vertex AI por padrão, ou o checkpoint LoRA local por uma flag); (3) extrair e validar o esquema; (4) responder em linguagem natural. Classificar vem antes de rotear; validar antes de responder, senão uma resposta bonita sobre um JSON errado só esconde o erro.
- **Duas decisões antes do código:** qual modelo por padrão (os dois bateram 11/11 e 100% no conjunto retido, então a escolha é de arquitetura: Vertex AI é gerenciado e mais próximo de produção, mas tem custo por chamada e depende de rede; o local não tem custo por chamada e funciona offline, mas exige checkpoint e hardware) e o que fazer sem confiança.
- **Política de incerteza:** um texto de atendimento ao cliente não pode ser forçado para Auto ou Saúde (domínio não aprovado): vai para um especialista humano. Um texto com sinais dos dois domínios ou sem pista clara pede confirmação ao usuário: o atrito é menor que extrair campos do domínio errado. Rejeitar temporariamente um caso válido custa menos que devolver dado corrompido como se fosse confiável.
- **Implementação:** JavaScript orquestra; um segundo arquivo em Python chama o checkpoint local (MLX não tem par em JS). O JS dispara o Python como programa externo, envia JSON por entrada padrão e recebe o texto bruto da resposta pela saída padrão. Os dois caminhos devolvem o mesmo contrato, então a camada seguinte não precisa saber de onde veio a inferência, e os erros do Python são propagados com a causa real.
- **Chamada bloqueante por escolha:** o processo espera o Python carregar o checkpoint; para um protótipo que processa um caso por vez simplifica leitura e depuração. Em produção: comunicação assíncrona ou processo Python vivo para não recarregar o checkpoint a cada requisição. A aula deixa essa limitação explícita.
- **O classificador por palavras-chave:** vocabulário deliberadamente específico (placa, veículo, oficina, funilaria...; beneficiário, procedimento, clínica...), com e sem acento. A palavra «sinistro» foi excluída de propósito: também aparece em atendimento (contestação de sinistro) e viraria um voto falso, encaminhando uma tarefa não aprovada ao modelo. Regra conservadora: mais pontos define o domínio; 0 a 0 é fora do escopo; empate maior que zero é ambíguo.
- **Por que não outro LLM para classificar:** mais custo, latência, dependência e um ponto de falha; com dois domínios de vocabulários distintos, uma regra simples é proporcional ao problema. Simplicidade também é decisão de arquitetura.
- **Validação em duas camadas:** a primeira é a adequação de esquema do harness (chaves exatas); a segunda, nova, confere consistência de valores (campo textual não vazio, `valor` numérico válido), porque um JSON com as chaves certas ainda pode ter `valor` não numérico. Se qualquer camada reprova, o protótipo não corrige em silêncio nem inventa campo: pede para tentar de novo.
- **Resposta humana:** dados estruturados para máquinas, linguagem natural para pessoas: uma frase de confirmação em português com o valor formatado em reais.
- **Demonstrações:** um orçamento de oficina escrito à mão com distratores (peças e mão de obra antes do total) é extraído corretamente; contestação de cobertura (0 a 0) é fora do escopo, sem chamar a API; texto com sinais dos dois domínios pede confirmação. Recusar corretamente pode ser mais barato e mais seguro que aceitar errado.
- **Nuvem versus local:** o mesmo texto, trocando só a flag, dá os mesmos três campos nos dois caminhos; nenhuma lógica central muda. O modo local demora mais porque cada execução recarrega o checkpoint, consequência da implementação simplificada, não do conceito.
- **Fechamento de requisitos:** integrar o modelo customizado num fluxo prático e implementar em JavaScript um protótipo funcional usando o modelo treinado via API real. A implementação central tem pouco mais de 200 linhas de lógica porque os módulos anteriores fizeram o trabalho pesado.

### Como funciona
- **14 testes automatizados:** 13 não chamam rede (classificação, formatação, consistência de valores, recusas, roteamento, JSON malformado) com dependências injetadas, e um chama o endpoint de verdade com um caso de automóvel escrito à mão. Testar barato o que pode ser testado barato; só a integração real usa rede.
- **As recusas não chamam a API:** a recusa acontece antes do roteamento, o que reduz custo e latência e evita processar domínio não aprovado.
- **Alternativa sem Apple Silicon:** um notebook Colab treina o mesmo LoRA rank 8 e reproduz o contrato de entrada e saída; há um script standalone para CUDA em Windows ou Linux.
- **Missão prática do bloco:** implementar um classificador simples que retorne domínio conhecido, fora do escopo ou ambíguo; testar que casos recusados não chamam o provedor; definir um contrato único para trocar dois provedores sem alterar a validação e a resposta.

### Onde aplicar
- Pôr um modelo especializado atrás de um fluxo que um usuário comum consegue usar.
- Definir antes do código o que o sistema faz quando não sabe: recusar, encaminhar ou pedir confirmação.
- Isolar o passo de inferência atrás de um contrato único para trocar provedor sem mexer em validação e resposta.
- Usar uma regra simples e verificável quando o problema é simples, e documentar a escolha.

### Vantagens e limites
**Vantagens**
- Pequeno e previsível: poucas peças novas, o resto é reaproveitado.
- Política explícita de incerteza que reduz custo e evita corrupção silenciosa.
- Dois provedores intercambiáveis sem alterar a orquestração.

**Limites**
- O classificador por palavras-chave é frágil (veja o achado abaixo).
- A chamada local bloqueante e o recarregamento do checkpoint não servem para produção.
- O caminho local só existe em Python/MLX (Apple Silicon) ou na alternativa Hugging Face.

### 🚫 Armadilhas
- Forçar um esquema inadequado a um caso fora do escopo: a saída pareceria válida e estaria errada.
- Escolher o domínio de maior pontuação mesmo em empate ou sem pista.
- Formatar uma resposta amigável antes de validar o JSON.
- Tratar o protótipo didático como arquitetura de produção.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Orquestração | Encadear classificar, rotear, validar e responder |
| Roteamento | Escolher o provedor de inferência (Vertex AI por padrão, local por flag) |
| Recusa explícita | Fora do escopo: encaminhar ao humano; ambíguo: pedir confirmação |
| Validação em duas camadas | Esquema (chaves) mais consistência de valores (tipos e vazios) |
| Contrato único | Mesma entrada e saída para os dois provedores |
| Chamada bloqueante | O processo espera o filho terminar; simples, não serve para concorrência |

---

## 💻 No código do repo

As oito decisões de arquitetura que justificam estas escolhas, e a escala para 3.000 exemplos, estão no [tópico 17](./17-decisoes-de-arquitetura-escala-3000-e-fechamento.md).

**Projeto:** [modulo-06-projeto-final (assistente e caminho local)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-06-projeto-final)

O protótipo em JavaScript, o script Python do modelo local e as alternativas multiplataforma (notebook Colab e script Hugging Face).

**Fluxo**
1. `amplitude-seguros-assistente.js`: `classificarDominio` conta ocorrências em `PALAVRAS_AUTO` e `PALAVRAS_SAUDE` e devolve `dominio` ou `motivo` (`fora_do_escopo`, `ambiguo`); `chamarModelo` roteia para `chamarModeloReal` (módulo 5) ou para `chamarModeloLocal` (`spawnSync('python3', ...)` com JSON no stdin).
2. `avaliarAdequacaoSchema` (módulo 5) e `avaliarConsistenciaDeValores` (novo); `formatarResposta` monta a confirmação com `formatarMoeda`; `processarMensagem` devolve um de `fora_do_escopo`, `ambiguo`, `schema_invalido` ou `sucesso`.
3. `chamar_modelo_local.py`: lê JSON do stdin, carrega MLX com o adaptador rank 8 (`../modulo-04-lora-e-peft/mlx-adapters`), aplica o chat template e gera até 150 tokens, imprimindo o texto bruto.
4. `colab-local-model-notebook.ipynb` (treina do zero no Colab e reproduz o contrato) e `chamar-modelo-local-hf.py` (mesmo contrato com `transformers` e `peft`, para CUDA); o companion documenta os resultados.

**Como rodar**
- `node amplitude-seguros-assistente.js 'texto do usuário'` (nuvem) ou `--local` (MLX); `--skip-tests` pula a suíte. Precisa de `GCP_PROJECT_ID` e `ENDPOINT_MODULO32` no caminho de nuvem.
- Sem `gcloud`, 13 dos 14 testes passam e o da chamada real falha; como o script aborta quando um teste falha, é preciso `--skip-tests` para ver a recusa funcionar offline.

**Armadilhas e achados no código**
- O filtro de fora do escopo só dispara no placar 0 a 0. Reproduzi a lógica numa cópia isolada: «contestar a negativa de cobertura... o guincho do veículo não foi pago» cai em Auto (uma palavra de Auto e nenhuma de Saúde) e «o hospital negou a cobertura da internação» cai em Saúde; um único termo como `veículo`, `hospital` ou `consulta` faz uma queixa de atendimento seguir para o modelo fine-tunado, que é justamente o domínio reprovado.
- As listas reais têm mais palavras que as citadas na aula (por exemplo `pintura`, `exame`, `paciente`, `consulta`, `hospital`), e a busca é por substring, não por palavra inteira.
- A suíte roda a cada execução (inclusive o teste que chama o endpoint, com custo) salvo `--skip-tests`.
- O notebook do Colab mostrou um erro reproduzível (4 de 4) no caminho Hugging Face: `valor: 187050` em vez de 1870,5 num caso com centavo fracionário novo; o companion o relaciona ao trade-off de precisão da quantização e adverte para não apresentar o Colab como «prova de convergência de três frameworks».
- O docstring de `chamar-modelo-local-hf.py` manda trocar o nome do script na linha 88; no arquivo atual a variável `scriptLocal` está na linha 89. O script HF também ainda não foi testado isoladamente.
- Cada chamada local recarrega o checkpoint porque cada `spawnSync` é um processo novo: o cache de módulo do Python de `chamar_modelo_local.py` não ajuda entre chamadas.

---

## 🔗 Para ir além
- [Repositório oficial, módulo 06 (Projeto Final)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-06-projeto-final)
- [Nubank: Your Spending Needs Attention (indicação, relatório 19)](https://arxiv.org/abs/2507.23267)

---

⬅️ [15 · Veredito de escala: checklist de graduação, gate reaberto, NPV real e o modelo local](./15-veredito-de-escala-e-npv-real.md)  ·  [17 · Decisões de arquitetura, escala para 3.000 exemplos (e a regressão) e o fechamento da disciplina](./17-decisoes-de-arquitetura-escala-3000-e-fechamento.md) ➡️
