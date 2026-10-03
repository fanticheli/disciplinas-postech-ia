# 00 · Mercado de IA como serviço, wrappers e o Applied AI Engineer

> **Unidade 1 · Aulas 1 e 2** · Leitura: ~9 min · Bloco: Mercado de IA e Gateway de Modelos

## 🎯 Em uma frase
A IA virou **infraestrutura** consumida por API. O valor de um produto não está em chamar o modelo, e sim em problema real, arquitetura, segurança, distribuição e viabilidade econômica; é por isso que existe um perfil novo e bem pago, o **Applied AI Engineer**.

---

## 👵 Explicando para a vovó

Pense na energia elétrica: ninguém monta uma usina em casa, a gente liga o eletrodoméstico na tomada. A IA virou a tomada. Quem ganha dinheiro é quem constrói o eletrodoméstico certo para uma dor específica, e não quem apenas mostra que sabe ligar na tomada.

Um *wrapper* é esse eletrodoméstico: pega a capacidade genérica do modelo e entrega pronta para um público, sem a pessoa precisar saber escrever prompt. E o Applied AI Engineer é o profissional que sabe instalar esse eletrodoméstico com fiação segura, disjuntor e medidor de consumo.

---

## 🔧 Tecnicamente

### O que é
- **IA como infraestrutura:** assim como cloud, banco gerenciado e plataforma de pagamento, modelos de linguagem, multimodais, imagem e áudio estão acessíveis sob demanda. Não é preciso treinar modelo, manter cluster de GPU nem ter time de pesquisa.
- **Wrappers:** aplicações que encapsulam APIs de modelos e entregam uma experiência específica (chat com documentos, planilhas em linguagem natural, textos de marketing, transcrição de reunião com resumo). Alguns levantaram dezenas ou centenas de milhões de dólares.
- **API como commodity:** a ideia vira demo em dias, o custo de validação cai e quem valida rápido capta cedo. Assinatura recorrente e conveniência explicam o interesse do investidor.
- **Applied AI Engineer:** não é o pesquisador de ML nem o cientista de dados clássico; é quem consome modelos prontos, integra com sistemas reais e coloca em produção. O mercado se divide entre quem usa IA para ser mais produtivo e quem constrói sistemas com IA, e o segundo grupo puxa o teto salarial.
- **Founding Engineer e equity:** um dos primeiros engenheiros da empresa, que decide stack, arquitetura e provedores, assume risco técnico e costuma receber participação societária (equity). Vale analisar vesting e cláusulas antes de aceitar.

### Como funciona
- O que sustenta o produto não é o prompt isolado: é **problema real, execução disciplinada, arquitetura, distribuição e entrega contínua de valor**. Prompt é componente interno; produto é o que o cliente enxerga.
- Desafios que muita gente subestima: segurança (prompt injection, vazamento de dados, uso abusivo), isolamento de contexto entre usuários, escalabilidade, observabilidade, tratamento de falha, controle de concorrência e gerenciamento de estado.
- Contas obrigatórias: custo médio por requisição, ticket médio por cliente e volume necessário para o equilíbrio financeiro. Muitas empresas do segmento ainda dependem de rodadas de investimento.
- Dependência de Big Tech: se o produto depende integralmente de um provedor, mudança de preço, política ou disponibilidade vira risco de negócio. O lado bom é que, quando o modelo melhora, o produto melhora junto.
- Distribuição e confiança: vence quem tem alcance, narrativa clara e comunidade. Nos primeiros clientes, transparência e comunicação rápida em falha são diferencial.
- Preparação do Applied AI Engineer: arquitetura limpa, design de APIs, modelagem de dados, testes, observabilidade, segurança e escalabilidade, aplicados a IA (prompt determinístico, reduzir alucinação, medir qualidade, controlar custo, integrar ferramentas com segurança) e projetos paralelos publicados.

### Onde aplicar
- Começar por uma tarefa repetitiva do seu próprio dia: resolver a própria dor dá clareza de valor, mesmo que o software seja simples e replicável.
- Avaliar uma ideia de produto de IA olhando custo por requisição, risco de dependência de provedor e canal de distribuição antes de olhar o prompt.
- Posicionar a carreira: empreender, ser Founding Engineer ou especialista altamente remunerado, o que exige base sólida e projetos reais já prontos quando a oportunidade aparecer.
- Networking presencial (eventos, meetups, conferências): é comum achar quem tem tese de produto e distribuição, mas não tem quem implemente.

### Vantagens e limites
**Vantagens**
- Barreira técnica de entrada baixa: da ideia à demo em uma semana.
- Receita recorrente por assinatura é previsível e atraente para investidores.
- Evolução do modelo pelo provedor melhora o produto sem esforço extra.
- Vagas internacionais de Applied AI Engineer ou LLM Engineer citadas na aula passam de 200 mil dólares por ano, muitas remotas.

**Limites**
- Se é fácil de replicar, a diferenciação vem de distribuição, nicho e execução, não de tecnologia.
- Dependência de um provedor externo concentra risco de preço, política e disponibilidade.
- Muitas empresas do segmento ainda não são lucrativas e dependem de investimento.

### 🚫 Armadilhas
- Achar que conectar uma API é diferencial competitivo. A própria aula diz que não é.
- Ignorar distribuição: produto tecnicamente bom sem alcance perde para o de narrativa e comunidade melhores.
- Subestimar segurança, custo por requisição e limite de contexto ao planejar o produto.
- Aceitar equity sem entender vesting e cláusulas contratuais.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Wrapper | Aplicação que encapsula uma API de modelo e entrega uma experiência específica |
| IA como infraestrutura | Modelos consumidos sob demanda, como cloud ou pagamento |
| API como commodity | Integrar o modelo é fácil e barato; o diferencial está acima disso |
| Applied AI Engineer | Engenheiro que integra modelos prontos a sistemas reais em produção |
| Founding Engineer | Um dos primeiros engenheiros, decide stack e arquitetura, costuma ter equity |
| Equity | Participação societária que compensa risco e impacto |
| Distribuição | Alcance, comunidade e confiança que levam o produto até o cliente |

---

## 💻 No código do repo

Aula conceitual, sem projeto próprio. O código do módulo começa no OpenRouter ([tópico 01](./01-openrouter-gateway-multi-modelo.md)).

---

## 🔗 Para ir além
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo02-integracao-apis-llms)

---

⬅️ [README](./README.md)  ·  [01 · OpenRouter: laboratório de modelos, roteamento e fallback](./01-openrouter-gateway-multi-modelo.md) ➡️
