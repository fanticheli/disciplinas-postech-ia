# 15 · Veredito de escala: checklist de graduação, gate reaberto, NPV real e o modelo local

> **Unidade 5 · Aula 4** · Leitura: ~11 min · Bloco: Avaliar modelos fine-tunados

## 🎯 Em uma frase
Medir não é decidir. O módulo fecha com um **checklist de graduação de 5 critérios com limiares definidos antes**, o **mesmo gate do módulo 1 reaberto** com evidência nova, o veredito (Auto e Saúde escalam; Atendimento não) e a avaliação do **modelo LoRA local** pelo mesmo conjunto retido, que fecha a promessa do módulo 4.

---

## 👵 Explicando para a vovó

Antes de uma obra ser liberada, o fiscal usa uma lista de verificação escrita antes de ver a obra, com limites claros para cada item. Não adianta ajustar o limite depois de ver o resultado. E ele reabre o projeto original com os mesmos critérios, agora alimentado com dados reais em vez de estimativas.

Passar na lista de uma obra não autoriza construir um prédio de outro tipo: a evidência vale só para o que foi medido.

---

## 🔧 Tecnicamente

### O que é
- **Três evidências acumuladas:** 100% no teste retido (5.1); fine-tunado muito acima do genérico e conjunto empatando ou vencendo separados (5.2); aprovado nos estresses mais severos (5.3). O que muda é organizá-las num critério explícito de decisão, um gate, para evitar o time técnico se empolgar e tratar a escala como consequência automática.
- **Checklist de graduação (5 critérios):** (1) precisão em dado nunca visto (>= 95%); (2) bate o modelo genérico, mesmo no melhor caso observado do genérico; (3) treinar domínios juntos é igual ou melhor que separar; (4) robusto a variação de formato (>= 95%); (5) robusto à variação estrutural mais difícil (>= 90%).
- **Limiar proporcional à dificuldade:** exigir 95% num teste deliberadamente mais difícil reprovaria um piloto bom; exigir só 90% onde a tarefa é fácil afrouxaria o padrão. Inverter os limiares seria permissivo onde deveria ser excelente. O bom checklist tem critérios justificáveis, não os maiores números.
- **Sem métricas novas:** cada critério vem do que já foi medido nos módulos 5.1 a 5.3. Algumas comparações são repetidas para dar confiança; o checklist usa o melhor caso observado do genérico, não a média, para tornar a comparação conservadora e tirar a desculpa de uma execução ruim.
- **Reabrir o gate do módulo 1:** a ferramenta reaproveita a mesma lógica, sem inventar um gate novo agora que se conhece a resposta. Auto: gate aprovado desde o início e 5/5 no checklist, veredito *escalar*. Saúde: o gate só aprovou depois de a pergunta de dados passar de 0,35 para 0,62; com 5/5, também *escalar*.
- **Escalar tem escopo:** não supõe que o modelo funcionará em qualquer tarefa futura; transforma este piloto, dentro do escopo medido, num fluxo real de uso.
- **Atendimento ao Cliente continua fora:** as perguntas verdes continuam verdes, e as estruturais continuam vermelhas (P1 em 0,3 e P4 em 0,35). O motivo não é falta de evidência nova, é falta de evidência relevante: todo o módulo 5 avaliou extração estruturada de campos fixos, uma tarefa fechada; negociar uma exceção de cobertura é uma tarefa aberta. O limite é de escopo, não de rigor. Recomendação: prompt, RAG e roteamento para especialista humano.
- **A lacuna do modelo local:** o módulo 4.4 prometeu avaliar os dois modelos reais com o mesmo rigor; o da Vertex AI já foi medido. O local é avaliado em Python de propósito: a API Python do MLX carrega o modelo (~10 GB) uma vez e roda os 11 exemplos no mesmo processo, em vez de recarregá-lo por exemplo.
- **Mesmo conjunto, mesma régua:** o LoRA rank 8 recebe o conjunto retido do 5.1 e as mesmas funções de esquema e precisão. Resultado: 11/11 de esquema válido e 100% de precisão, igual ao modelo da Vertex AI. No Colab (alternativa sem Apple Silicon) a aula cita 11/11 e ~97% de precisão média.
- **Convergência de dois caminhos:** modelos diferentes (adapter size 4 contra rank 8), dois ambientes e mesmo resultado sugerem que o comportamento não é peculiaridade de um provedor. Não é garantia universal, mas evidência adicional.
- **O checkpoint de 20 iterações:** o treino mais longo mostrou melhora até perto de 90, mas o checkpoint estabelecido foi o de 20. Ponto de parada também é decisão, e precisa de critério explícito.
- **NPV real contra projetado (companion):** reabre o NPV do módulo 1 trocando só o custo de treino de R$ 2.400 estimados para o medido no billing (R$ 1,53 para Auto e R$ 0,86 para Saúde): Auto de R$ 4.780,27 (break-even mês 10) para R$ 7.178,74 (mês 1); Saúde de R$ -993,23 (sem break-even) para R$ 1.405,91 (mês 1). Custo por chamada em produção e crescimento de volume continuam projeção, nunca medidos.

### Como funciona
- **Definir antes de checar:** primeiro os limiares, depois a verificação; senão vira racionalização a posteriori.
- **Ledger como fonte única:** cada harness grava sua chave em `resultado-medido.json`; o veredito lê esses ledgers e só cai nos valores históricos se o ledger não existir, avisando.
- **Missão prática:** definir, antes de olhar os resultados, um checklist com critérios e limiares; reaplicar o gate original e documentar o que escala, o que fica em piloto e o que está fora de escopo; comparar duas implementações sob o mesmo conjunto de teste e registrar o que a convergência permite e não permite concluir.

### Onde aplicar
- Promover um piloto para produção só depois de um checklist de graduação escrito antes e com evidência reproduzível.
- Reabrir uma decisão financeira antiga trocando uma premissa por medição, sem inventar dados novos.
- Comparar caminhos de treinamento diferentes (nuvem e local) sob a mesma régua.
- Declarar o escopo de cada veredito.

### Vantagens e limites
**Vantagens**
- Impede que métricas boas virem escala por entusiasmo.
- Os limiares escritos antes dão credibilidade.
- A convergência de dois caminhos independentes fortalece a evidência.

**Limites**
- O veredito herda as limitações dos testes: 11 exemplos no retido, 6 por round de estresse, um único gerador.
- O NPV real só atualiza o custo de treino; o resto continua projeção.
- Cinco critérios medidos em apenas uma tarefa estreita.

### 🚫 Armadilhas
- Ajustar o limiar depois de ver o resultado.
- Comparar contra a média do baseline quando o melhor caso desmentiria a vantagem.
- Usar o resultado do módulo 5 para reverter a reprovação estrutural de Atendimento.
- Chamar de medida a pergunta 3 de Saúde: ela é projetada (0,35 mais 0,03 por mês), não medida.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Checklist de graduação | Critérios e limiares escritos antes, que o piloto precisa cumprir para escalar |
| Limiar | Valor mínimo por critério (95% ou 90%) proporcional à dificuldade |
| Escopo da evidência | A conclusão vale só para a tarefa e o conjunto medidos |
| Melhor caso do baseline | Comparar com o genérico no seu melhor resultado observado |
| Ledger | Arquivo com os números medidos por cada harness |
| Ponto de parada | Número de iterações escolhido por critério medido |

---

## 💻 No código do repo

**Projeto:** [modulo-05-avaliacao-modelos (veredito, NPV real e modelo local)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos)

Três ferramentas: o veredito de escala, o companion financeiro e a avaliação do modelo local (Python e a alternativa em JS), mais o notebook Colab de avaliação.

**Fluxo**
1. `veredito-escala-tool.js`: `METADATA_CRITERIOS` (5 critérios com limiar e valor de fallback), `carregarCriteriosGraduacao` (lê o `resultado-medido.json`), `avaliarGraduacao`, `avaliarVereditoCaso` e `avaliarVeredito`, que importa `avaliarCasoCompleto` do módulo 1 e `construirCasoNoveMesesDepois` do módulo 3. 4 testes.
2. `npv-real-vs-projetado-tool.js` (e companion): reabre `calcularNPV` trocando o custo de treino por R$ 1,53 (Auto) e R$ 0,86 (Saúde). 5 testes.
3. `avaliacao_modelo_local_tool.py` (principal): carrega o MLX uma vez e avalia os 11 exemplos; `avaliacao-modelo-local-tool.js` (alternativa) chama `mlx_lm generate` por subprocesso e paga um carregamento de ~10 GB por exemplo (imprime o tempo para mostrar o custo). `colab-model-evaluation-notebook.ipynb` e companion fazem o mesmo na T4.

**Como rodar**
- `node veredito-escala-tool.js` e `node npv-real-vs-projetado-tool.js` rodam offline com o ledger versionado: graduação 5/5, Auto e Saúde escalar SIM, Atendimento NÃO (P1 e P4 vermelhas).
- A avaliação local exige Apple Silicon e `mlx_lm` (não executada aqui; sem o módulo, o JS reporta 11 falhas de CLI).

**Armadilhas e achados no código**
- O fallback do código para o critério «bate o genérico» é 72,7%; o ledger versionado, que tem prioridade, diz 66,7%. A saída real do veredito imprime 66,7%.
- No companion de Colab, a avaliação é 11/11 e 100,0% de precisão; a aula cita ~97% de precisão média por campo no Colab.
- O NPV real usa os custos dos jobs de domínio único (R$ 1,53 e R$ 0,86), que somam os R$ 2,39 do job conjunto; a divisão por domínio é uma convenção do companion.
- A pergunta 3 de Saúde (0,62) é projetada pelo próprio código a partir de 0,35 mais 0,03 por mês, não uma medição de dado novo.
- Os números do ledger foram medidos em 11 e 12/09/2026, com 6 exemplos por round e repetições de chamadas; valem para aquela data e aquele endpoint.

---

## 🔗 Para ir além
- [Repositório oficial, módulo 05 (Avaliação de Modelos)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo09-processamento-de-dados-e-fine-tuning-de-modelos/modulo-05-avaliacao-modelos)

---

⬅️ [14 · Robustez, overfitting e artefato de medição: quando o número ruim é culpa da régua](./14-robustez-overfitting-e-artefato-de-medicao.md)  ·  [16 · Do modelo ao protótipo: classificar, rotear, validar e responder, recusando quando há incerteza](./16-assistente-arquitetura-e-implementacao.md) ➡️
