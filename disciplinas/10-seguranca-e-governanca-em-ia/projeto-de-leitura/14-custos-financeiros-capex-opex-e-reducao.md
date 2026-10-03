# 14 · Custos financeiros de IA: CAPEX/OPEX, API versus infraestrutura própria e como reduzir

> **Unidade 6 · Aulas 15 e 16** · Leitura: ~8 min · Bloco: Custos financeiros e ambientais

## 🎯 Em uma frase
A conta aparece **depois** da adoção. **CAPEX** (ativos de longo prazo) e **OPEX** (despesa recorrente) coexistem; API comercial dá simplicidade (pay-as-you-go, custo unitário maior), infraestrutura própria dá controle (custo fixo, pessoas, MLOps). Para reduzir: **prompt caching, quantização, LLM routing, RAG eficiente, modelos menores, negociação e simulação de pricing**.

---

## 👵 Explicando para a vovó

Ter um táxi por aplicativo é pagar por corrida: fácil de começar, sem comprar carro, mas se a senhora roda o dia inteiro a conta pesa. Comprar o próprio carro exige entrada, motorista, seguro e garagem, mesmo parado. Qual é melhor depende de quanto a senhora roda, de quão previsível é a rota e de quem sabe dirigir.

E para gastar menos: não mande o carrão de luxo para buscar pão, não leve a casa inteira de mudança a cada viagem e negocie desconto se virar cliente frequente.

---

## 🔧 Tecnicamente

### O que é
- **CAPEX:** gasto com ativos de longo prazo (data center, servidores, hardware especializado, rede, energia, refrigeração, segurança física, espaço, equipe). **OPEX:** despesa operacional do dia a dia (folha, serviços, assinaturas, nuvem; API paga por uso é OPEX claro). As duas categorias coexistem.
- **MVP versus escala:** muitos produtos morrem no MVP: a demonstração impressiona, mas aparecem custo, performance, latência, infraestrutura e manutenção; uma ideia boa pode ser financeiramente inviável. Um centavo por chamada vira conta enorme com milhões de chamadas; contexto longo pesa na fatura.
- **API comercial:** sem infraestrutura, pay-as-you-go, bom em validação e tráfego incerto; custo unitário pode ser maior que infraestrutura própria bem otimizada; há custo de dependência (termos, mudança de preço, de limite e de modelo, disponibilidade).
- **Hospedar o próprio modelo (aberto ou ajustado por fine-tuning):** instância dedicada 24h gera custo fixo mesmo sem uso; envolve inferência, rede, armazenamento, monitoramento, autenticação, segurança, backup, atualização, observabilidade e **pessoas (MLOps)**. Faz sentido com privacidade rígida, volume alto e previsível, necessidade de controle, equipe capacitada e modelo especializado.
- **Tokens:** a cobrança costuma incluir entrada e saída; janela de contexto enorme (um milhão de tokens) não significa que deva ser usada inteira; "engenharia de contexto também é engenharia de custo".

### Como funciona
- **Decisão entre API e infra própria** considera privacidade (ler termos de uso: armazenamento, retenção, treino com seus dados, região), volume, orçamento, equipe, latência, escalabilidade, customização, disponibilidade, dependência de fornecedor e manutenção. Não existe arquitetura universal; "quando alguém diz que há uma única melhor forma, desconfie".
- **Modelo menor pode bastar:** fine-tuning de um modelo menor (a aula cita 8B ou 14B parâmetros como exemplo) e destilação reduzem memória e hardware; o maior modelo não é automaticamente a melhor solução.
- **Estratégias de redução (Aula 16):** **prompt caching** (reaproveitar partes estáticas, útil com instrução de sistema estável; pouco útil se o contexto muda a cada chamada); **quantização** (reduzir a precisão dos pesos, por exemplo de FP16, para menor memória e GPU, com testes de qualidade); **LLM routing** (tarefas simples para modelos menores, difíceis para os maiores, escalonando por dificuldade); **RAG eficiente** (recuperar só o necessário; contexto demais confunde, dilui o sinal e aumenta a fatura; RAG não é só banco vetorial: pode usar SQL, busca tradicional, metadados e filtros); **negociação** com provedores (descontos, créditos, compromisso de consumo).
- **Simuladores de pricing** antes do deploy (Google Cloud e AWS): o custo muda drasticamente ao reduzir o tamanho médio de entrada e saída, mesmo mantendo as requisições; considerar input e output, região (preço, latência, residência de dados, conformidade, disponibilidade do modelo), câmbio (muitos serviços em dólar) e simular uso atual, crescimento, pior caso e picos.
- **Cadeia dos chips:** ASML (equipamentos de fabricação), TSMC (fabricação física, Taiwan) e NVIDIA (design e ecossistema). Concentração aumenta risco; o preço por chamada resume uma infraestrutura enorme (chips, data centers, energia, rede, profissionais, pesquisa, fabricação e logística).
- **Governança do orçamento e produtividade:** estourar o orçamento anual em poucos meses é sinal de falta de governança. A aula critica o **token maxing** (medir adoção ou produtividade por tokens consumidos): produtividade é valor gerado (problemas resolvidos, entregas, tempo economizado, qualidade); duas equipes com o mesmo resultado e gasto dez vezes maior não é mais produtiva, é menos eficiente. "Por que pessoas ou IA? Por que não pessoas e IA?"

### Onde aplicar
- Estimar custo por requisição, por usuário e por mês, e simular "crescer dez vezes", antes de ir a produção.
- Adotar routing por dificuldade: classificação e extração em modelo pequeno, raciocínio complexo no modelo grande.
- Revisar RAG para reduzir número e tamanho dos trechos enviados e medir efeito em custo e qualidade.

### Vantagens e limites
**Vantagens**
- Faz o custo entrar no desenho, ao lado das métricas técnicas.
- As estratégias são combináveis (fine-tuning + routing + cache).
- RAG eficiente melhora custo e qualidade ao mesmo tempo.

**Limites**
- Infraestrutura própria exige know-how e pessoas (MLOps); a economia aparente pode sumir em falhas e manutenção.
- Quantização e modelo menor podem afetar qualidade e precisam de teste.
- Prompt caching depende do padrão de repetição; sem repetição, o ganho é pequeno.

### 🚫 Armadilhas
- Comparar só preço por token versus preço de GPU, esquecendo pessoas, segurança e observabilidade.
- Achar que o MVP validado já está pronto para produção.
- Usar o maior modelo para tudo e uma janela de contexto gigante "porque cabe".
- Medir produtividade por tokens consumidos (token maxing).

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| CAPEX / OPEX | Investimento em ativo de longo prazo versus despesa operacional recorrente |
| Pay-as-you-go | Pagar pelo que usa; ótimo no início, exige controle ao crescer |
| MLOps | Operação de modelos: implantação, monitoramento, versões, performance |
| Prompt caching | Reutilizar partes estáticas do contexto entre chamadas |
| Quantização | Reduzir precisão dos pesos (ex.: FP16 para menor) para economizar memória e GPU |
| LLM routing | Encaminhar cada tarefa ao modelo com capacidade proporcional |
| Destilação / fine-tuning | Modelo menor especializado derivado de outro ou ajustado |
| Token maxing | Medir produtividade por tokens gastos; métrica que premia o gasto |

---

## 💻 No curso

Duas aulas conceituais, sem código no repositório; a Aula 16 inclui demonstrações em calculadoras de pricing do Google Cloud e da AWS (links acima). O slide da Aula 7 do curso ("Custos em Inteligência Artificial") está criptografado e não pôde ser lido; o conteúdo aqui vem da apostila e do README do repo (que lista duas leituras de custo financeiro).

---

## 🔗 Para ir além
- [Google Cloud Pricing Calculator](https://cloud.google.com/products/calculator)
- [AWS Pricing Calculator](https://calculator.aws/#/)
- [Indicação 13: CAPEX (B3)](https://borainvestir.b3.com.br/glossario/capex-capital-expenditure/)
- [TSMC, ASML, Nvidia: as ações que surfam a onda dos hiperchips (README do repo)](https://vocesa.abril.com.br/economia/nvidia-e-cia-as-acoes-que-surfam-a-onda-dos-hiperchips/)
- [AI Costs More Than The People It Replaced (Forbes, README do repo)](https://www.forbes.com/sites/jemmagreen/2026/07/02/ai-costs-more-than-the-people-it-replaced/)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia)

---

⬅️ [13 · Geopolítica da IA, Efeito Bruxelas e o cenário brasileiro](./13-geopolitica-efeito-bruxelas-e-brasil.md)  ·  [15 · Custo ambiental: onde ficam os data centers, cabos, água e matriz energética](./15-custo-ambiental-data-centers-e-energia.md) ➡️
