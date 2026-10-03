# 02 · Mapa das técnicas (o Zoo), casos de mercado e o risco de provedor e de obsolescência

> **Unidade 1 · Aula 3 (parte final)** · Leitura: ~12 min · Bloco: Decidir: quando fazer fine-tuning

## 🎯 Em uma frase
Depois de provar que fine-tuning vale a pena, escolhe-se a **técnica**: Full Fine-Tuning, LoRA, QLoRA, Instruction Tuning, RLHF/DPO, destilação (e, no cheatsheet, GRPO/RFT). Duas ressalvas operacionais fecham a unidade: o **provedor** pode abandonar o serviço e o **modelo de fronteira** pode alcançar o seu modelo customizado.

---

## 👵 Explicando para a vovó

Escolher a técnica é como escolher o jeito de reformar a casa: derrubar tudo e reconstruir (Full), trocar só os móveis e acabamentos (LoRA), fazer isso com materiais compactados para caber num orçamento pequeno (QLoRA), ensinar o morador a seguir qualquer instrução do síndico (instruction tuning), ou ajustar pelo gosto de quem mora (preferência humana).

E existe o risco do «dono do terreno»: a empreiteira que você escolheu pode parar de prestar o serviço, e a casa que você reformou pode ficar atrás das novas construções do bairro. Um bom projeto prevê as duas coisas.

---

## 🔧 Tecnicamente

### O que é
- **Full Fine-Tuning:** ajusta todos os parâmetros; mais caro e exige mais infraestrutura, mas dá mais liberdade quando o domínio está longe do comportamento original. Referência histórica: o Codex (GPT-3 com fine-tune completo em 159 GB de código do GitHub), base do GitHub Copilot.
- **LoRA:** o modelo base fica congelado e só adaptadores menores são treinados, reduzindo memória, custo e tempo. Caso Checkr + Predibase (Llama-3-8B com LoRA): 90% de acurácia nos casos mais difíceis, 5 vezes mais barato e 30 vezes mais rápido que a solução anterior com GPT-4.
- **QLoRA:** adaptadores sobre um modelo base quantizado (tipicamente 4 bits). Caso Guanaco: modelo de 65 bilhões de parâmetros numa única GPU de 48 GB, chegando a 99,3% do desempenho do ChatGPT no benchmark Vicuna.
- **Instruction Tuning:** ensina a seguir instruções em linguagem natural numa variedade de tarefas (FLAN: 137 bilhões de parâmetros ajustados em mais de 60 tarefas, superando o GPT-3 de 175 bilhões em 20 de 25 tarefas inéditas).
- **RLHF e DPO:** trabalham com preferência entre respostas. RLHF usa um modelo de recompensa e depois reinforcement learning; DPO otimiza diretamente sobre pares preferido e rejeitado. Variante RLAIF/Constitutional AI: o próprio modelo critica as respostas contra princípios escritos (custo de rotulagem de US$ 0,06 contra US$ 0,67 por exemplo humano, cerca de 11 vezes menor).
- **Destilação:** um modelo menor aprende a imitar um maior, em geral com exemplos gerados pelo maior (DeepSeek-R1: 800 mil exemplos destilados em modelos de 1,5 a 70 bilhões de parâmetros).
- **GRPO e RFT:** reforço com recompensa verificável; o modelo gera um grupo de respostas e a vantagem de cada uma é relativa ao grupo. Limite: se todo o grupo recebe a mesma recompensa, o desvio-padrão zera e não há sinal de treino (grupo degenerado, nomeado no DAPO).
- **Risco operacional de provedor:** serviço self-service pode mudar de estratégia. Na época da disciplina, o self-service de fine-tuning da OpenAI estava em descontinuação (orgs novas bloqueadas desde 7/mai/2026, perda de acesso por inatividade em 2/jul/2026, fim total em 6/jan/2027) e a API pública do Gemini já não aceitava fine-tuning desde maio de 2025 (último modelo suportado: Gemini 1.5 Flash-001). Isso muda *onde* treinar, não *se* vale a pena; a decisão técnica precisa de estratégia de saída.
- **Risco de obsolescência (caso Harvey):** em 2023 o modelo jurídico customizado foi preferido ao GPT-4 por advogados em 97% dos casos; em 2025 sete modelos de fronteira sem fine-tuning jurídico já o superavam no benchmark da Harvey; em 2026 a Harvey re-treinou e recuperou a liderança. Fine-tuning tem prazo de validade operacional e precisa ser reavaliado contra novas baselines.

### Como funciona
- **O cheat sheet como mapa da segunda decisão:** compara requisitos de dado, hardware, orçamento, hiperparâmetros e exemplos de mercado, e propõe perguntas práticas: quão distante o domínio está do modelo genérico, quanto orçamento existe, qual latência a produção exige. A lógica é a mesma do framework: primeiro provar que fine-tuning merece existir, depois escolher Full, LoRA, API gerenciada ou outra abordagem.
- **Faixas de referência do cheatsheet** (modelo de 7B, valores de ago/2026 que o próprio documento manda reconferir): Full ~100 a 120 GB de VRAM (multi-GPU), LoRA ~16 a 24 GB (uma GPU), QLoRA ~10 a 14 GB (GPU de consumidor). Para LoRA, o documento cita rank e alpha proporcionais, com alvo mínimo nas camadas de atenção.
- **Quando DPO, quando RLHF:** DPO é mais simples e estável com um conjunto fixo de pares de preferência; RLHF compensa quando a fidelidade do sinal de recompensa importa mais que a simplicidade e há orçamento para o pipeline completo.
- **Estratégia de saída:** considerar dependência de fornecedor, portabilidade de artefatos e alternativas locais ou em outros provedores. Por isso a disciplina usa dois caminhos reais: nuvem gerenciada (Vertex AI) e treino local (MLX).
- **Reavaliar periodicamente:** o arco da Harvey mostra que um fine-tuning vantajoso hoje pode perder a vantagem sem nenhum aviso; o treinamento anterior não foi erro, gerou valor enquanto tinha vantagem.

### Onde aplicar
- Escolher a técnica pelo problema, pelo hardware, pelo orçamento e pela distância entre o comportamento desejado e o que o modelo base já faz.
- Para pouco volume ou dado sensível, comparar nuvem gerenciada com treino local (assunto da Unidade 4).
- Antes de comprometer orçamento, checar se o provedor ainda oferece fine-tuning self-service e se a versão do modelo base ainda será suportada.
- Agendar uma reavaliação contra modelos de fronteira novos.

### Vantagens e limites
**Vantagens**
- Dá vocabulário e critérios comuns para comparar técnicas muito diferentes.
- Cada técnica vem com um caso real verificável e fonte.
- Mostra cedo os riscos de dependência de provedor e de obsolescência.

**Limites**
- Os números de hardware e custo são faixas de mercado de uma data (ago/2026) e envelhecem rápido.
- Alguns casos de mercado vêm de relatos das próprias empresas ou de fornecedores.
- O cheatsheet cobre mais técnicas do que o resto da disciplina executa de fato (só SFT, LoRA e Full são treinados; DPO é testado uma vez).

### 🚫 Armadilhas
- Escolher a técnica antes de provar que fine-tuning se justifica.
- Assumir que o tutorial antigo de um provedor ainda aponta para um fluxo que existe: verifique a capacidade real na data de uso.
- Confundir a retirada de uma versão de modelo (a família Gemini 2.5 tem aposentadoria anunciada para 16/out/2026, segundo o companion e os comentários de código do repositório; a apostila só diz que existem datas de retirada anunciadas, sem citar o dia) com a retirada do recurso de fine-tuning do provedor; são riscos diferentes.
- Esperar que RLAIF ou DPO substituam a necessidade de dados de preferência de boa qualidade.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Full Fine-Tuning | Atualiza todos os parâmetros; teto de qualidade mais alto, custo mais alto |
| LoRA | Congela o modelo e treina só matrizes de baixo posto |
| QLoRA | LoRA sobre base quantizada em 4 bits |
| Instruction Tuning | Ajuste para seguir instruções em linguagem natural |
| RLHF / DPO | Preferência humana via modelo de recompensa (RLHF) ou direto em pares (DPO) |
| Distillation | Modelo menor imita modelo maior |
| GRPO / RFT | Reforço com recompensa verificável, vantagem relativa ao grupo |
| Grupo degenerado | Todas as recompensas iguais: vantagem zero e nenhum sinal de aprendizado |

---

## 💻 No código do repo

**Projeto:** [modulo-01-decision-framework (cheatsheet, zoo, GRPO) e companions da raiz](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-01-decision-framework)

Material de consulta do módulo 1 (cheatsheet dos tipos, pôster, dossiê interativo, demo de GRPO) mais quatro companions na raiz da disciplina: casos de mercado, disponibilidade de provedores, risco de validade de modelo e histórico do fine-tuning.

**Fluxo**
1. `fine-tuning-types-cheatsheet.md`: sete seções (Full, LoRA, QLoRA, Instruction Tuning, RLHF/DPO, Distillation, GRPO/RFT), cada uma com o que é, quando usar, requisitos práticos, caso real e fontes; fecha com tabela comparativa e as seções de risco de provedor e obsolescência (Harvey).
2. `fine-tuning-zoo-poster.html`: chave de identificação (gate e P1 a P4 em fluxograma) e seis «espécies»; `mecanismo-estado-arte-companion.html` é o «Bestiário», dossiê de mecanismo com 45+ fontes.
3. `grpo-verifiable-reward-demo.js/.py`: amostra G = 6 respostas reais de um modelo local (Ollama, `gemma4:e2b`, temperatura 1) para extrair campos de um comunicado de sinistro ruidoso, calcula recompensa verificável por campo e a vantagem relativa ao grupo (com EPS contra divisão por zero), sem atualizar pesos. 10 testes sem rede.
4. Na raiz: `disponibilidade-fine-tuning-provedores-companion.md` (Google, OpenAI, Anthropic), `risco-validade-modelo-companion.md` (Gemini 2.5 e Gemma 4), `historico-fine-tuning-companion.md` (de BERT a LoRA/DPO) e `casos-de-mercado-fine-tuning-companion.md` (21 casos em 7 setores).

**Como rodar**
- `node grpo-verifiable-reward-demo.js`: os 10 testes rodam offline; a amostragem real precisa de `ollama serve` e do modelo `gemma4:e2b` (aqui só rodei a parte offline: o script avisa que não conectou ao Ollama).
- Abra os `.html` no navegador; os companions são Markdown.

**Armadilhas e achados no código**
- O README raiz fala em «6 tipos» num ponto e em «7 tipos» em outro; o pôster tem seis espécies e o cheatsheet e o dossiê têm sete (GRPO/RFT entrou depois e «ainda não entrou no pôster»).
- O cheatsheet e o checklist citam `fine-tuning-zoo-poster.png`, que não está no repositório (só o HTML).
- O companion de risco e vários comentários de código registram que a família Gemini 2.5 tem retirement anunciado para **16/out/2026** (a apostila não cita a data, só diz que há datas de retirada anunciadas; não conferi na documentação da Google). Em 03/10/2026 faltavam 13 dias. Os scripts de Vertex AI dependem de `gemini-2.5-flash` (constante a trocar em cada um).
- O Gemma 4 E2B aparece em três formas (MLX, Hugging Face e Ollama), cada uma com seu id; a demo de GRPO usa a de Ollama.

---

## 🔗 Para ir além
- [Repositório oficial, módulo 01 (cheatsheet, pôster e demo GRPO)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-01-decision-framework)
- [LoRA (Hu et al.)](https://arxiv.org/abs/2106.09685)
- [QLoRA (Dettmers et al.)](https://arxiv.org/abs/2305.14314)
- [FLAN: Finetuned Language Models Are Zero-Shot Learners](https://arxiv.org/abs/2109.01652)
- [InstructGPT: instruções com feedback humano](https://arxiv.org/abs/2203.02155)
- [DeepSeek-R1](https://arxiv.org/abs/2501.12948)
- [Codex: Evaluating LLMs Trained on Code](https://arxiv.org/abs/2107.03374)
- [Constitutional AI](https://arxiv.org/abs/2212.08073)
- [RLAIF versus RLHF](https://arxiv.org/abs/2309.00267)
- [DeepSeekMath (GRPO)](https://arxiv.org/abs/2402.03300)
- [DAPO (grupo degenerado)](https://arxiv.org/abs/2503.14476)
- [Cronograma de descontinuação do fine-tuning self-serve da OpenAI](https://developers.openai.com/api/docs/deprecations)
- [Model tuning da Gemini API (descontinuado)](https://ai.google.dev/gemini-api/docs/model-tuning)
- [Harvey: Expanding Harvey's Model Offerings (2025)](https://harvey.ai/blog/expanding-harveys-model-offerings)
- [Applied Compute: case study Harvey (2026)](https://appliedcompute.com/case-studies/harvey)

---

⬅️ [01 · AHP, NPV, Monte Carlo e Real Options: do sinal verde ao número](./01-ahp-npv-monte-carlo-real-options.md)  ·  [03 · Do documento bruto ao exemplo validado: relevância, OCR, parser, esquema canônico e PII](./03-do-documento-ao-exemplo-validado.md) ➡️
