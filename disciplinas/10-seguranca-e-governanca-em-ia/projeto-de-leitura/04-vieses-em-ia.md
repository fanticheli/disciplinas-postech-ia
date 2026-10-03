# 04 · Vieses em IA: tipos, origens e mitigação

> **Unidade 3 · Aula 5** · Leitura: ~6 min · Bloco: Vieses, responsabilidade e ética

## 🎯 Em uma frase
**Viés** é um efeito que reduz a representatividade de um resultado e produz **distorção sistemática**. Na estrutura do NIST usada na aula, vem de três fontes: **estatístico/computacional**, **humano** e **sistêmico**; mitigar exige dados, métricas por grupo, diversidade, governança e supervisão humana.

---

## 👵 Explicando para a vovó

Um erro aleatório é a balança errar um pouco hoje e outro pouco amanhã. Viés é a balança sempre marcar dois quilos a mais: erra para o mesmo lado, todo dia.

Se a balança foi calibrada só com pessoas de um tipo, vai errar mais para as outras. E o dono da balança pode nem notar, porque ele só pesa gente do mesmo tipo.

---

## 🔧 Tecnicamente

### O que é
- **Três grupos (iceberg):** na ponta, o **estatístico/computacional** (população versus amostra, sub-representação, erro maior para um grupo, qualidade da distribuição); abaixo da superfície, o **sistêmico** (estruturas sociais e históricas que deixam marca nos dados) e o **humano** (atalhos cognitivos e pressupostos de quem desenvolve).
- **Sub-representação não é só minoria numérica:** grupos grandes com pouco poder ou pouca presença nas fontes também aparecem pouco. **Viés regional e cultural:** grandes iniciativas de IA surgem em países com capacidade econômica e tecnológica, e isso influencia conteúdo coletado e priorizado; uma resposta pode estar gramaticalmente correta e culturalmente inclinada.
- **Vieses humanos citados:** Dunning-Kruger (pouco conhecimento, muita confiança; IA generativa agrava a falsa sensação de especialização), **viés de automação** (confiar demais porque veio de um sistema; automatizar um processo ruim só escala o problema) e **viés de confirmação** (equipes homogêneas reforçam as mesmas premissas).
- **Alucinação:** o termo é usado com ressalva (não é pensar como humano); o ponto prático é que o usuário precisa de conhecimento de domínio para revisar a saída.
- **Fairness não tem métrica universal:** uma métrica boa para crédito pode não servir para saúde; antes de escolher, defina o tipo de dano, os grupos comparados e a diferença aceitável.

### Como funciona
- Mitigação em camadas: analisar diversidade dos dados, medir fairness segundo o contexto, monitorar desde o início (dados, depois modelo, depois aplicação), testar viés e segurança mesmo sob pressão de prazo e manter supervisão humana definida.
- "Viés by design": perguntar já no início se o dataset representa a população, se há grupos ausentes, se as métricas revelam diferenças e se a própria definição do problema pode prejudicar alguém. Quanto mais cedo, mais barato.
- Diversidade nas equipes não é cota: amplia as lentes e aumenta a chance de ver o que um grupo homogêneo não vê; ajuda a desafiar hipóteses mas não elimina o viés.
- Governança organizacional: políticas claras, responsabilidades definidas e liderança que cobre fairness, segurança e revisão; sem incentivo, a equipe prioriza só o que é cobrado no prazo.
- Leituras da aula: artigo sobre viés de gênero e IA e outro sobre viés racial em imagens geradas por IA; ler a metodologia, não só o resumo.

### Onde aplicar
- Revisar um dataset de treino para sub-representação antes de treinar.
- Incluir revisão de fairness no checklist de entrega, com métricas escolhidas para o domínio.
- Montar equipes e processos de validação com perspectivas diferentes.

### Vantagens e limites
**Vantagens**
- A taxonomia em três tipos ajuda a escolher a mitigação certa para cada origem.
- Tratar viés cedo reduz custo de correção.
- Conecta estatística, contexto social e governança numa mesma visão.

**Limites**
- Vieses humanos e sistêmicos são implícitos e difíceis de medir.
- Não há métrica de fairness universal; a escolha depende de julgamento.
- Mitigar nem sempre elimina; muitas vezes é reduzir.

### 🚫 Armadilhas
- Olhar só a performance média (acurácia alta pode esconder erro maior em um grupo).
- Achar que automatizar resolve inconsistência de processo (automatiza o caos).
- Deixar teste de viés para o fim por causa do prazo.
- Acreditar que um algoritmo resolve sozinho problemas sociais complexos.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Viés | Distorção sistemática que reduz a representatividade de um resultado |
| Viés estatístico/computacional | Mensurável: amostra, sub-representação, erro por grupo |
| Viés sistêmico | Herdado de estruturas sociais e históricas presentes nos dados |
| Viés humano | Atalhos cognitivos de quem constrói e usa o sistema |
| Viés de automação | Confiar demais numa decisão só porque veio do sistema |
| Dunning-Kruger | Pouco conhecimento gera superestimação do que se sabe |
| Fairness | Justiça entre grupos; não existe métrica universal |
| Viés by design | Perguntar onde o viés pode aparecer desde o início do projeto |

---

## 💻 No curso

Aula conceitual, baseada na publicação especial do NIST sobre viés. O README do repo sugere a ferramenta **Fairlearn** (https://fairlearn.org/) para esse módulo, mas não há notebook ou exercício com ela no repositório.

O caso prático de viés aparece na aula seguinte: [05 · IA responsável e o caso da triagem hospitalar](./05-ia-responsavel-e-caso-triagem.md).

---

## 🔗 Para ir além
- [NIST SP 1270: identificar e gerenciar viés em IA](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1270.pdf)
- [MIT AI Risk Repository](https://airisk.mit.edu/)
- [Fairlearn (ferramenta sugerida no README do repo)](https://fairlearn.org/)
- [Gender bias perpetuation and mitigation in AI technologies (AI & Society, 2024)](https://doi.org/10.1007/s00146-023-01675-4)
- [Racial bias in AI-generated images (AI & Society, 2025)](https://doi.org/10.1007/s00146-025-02282-1)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia)

---

⬅️ [03 · SHAP, LIME e Integrated Gradients](./03-shap-lime-integrated-gradients.md)  ·  [05 · IA responsável e o caso da triagem hospitalar](./05-ia-responsavel-e-caso-triagem.md) ➡️
