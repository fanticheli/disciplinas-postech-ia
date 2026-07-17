# 10 · Modelos open-source vs. proprietários — Ollama e OpenRouter

> **Módulo 9 da disciplina** · Leitura: ~10 min · Pré-requisito: doc [05](./05-como-funcionam-llms.md)

## 🎯 Em uma frase
Modelos **abertos** você baixa e roda na sua máquina (controle e privacidade, mas por sua conta e risco); modelos **fechados** você acessa via API (qualidade de ponta e zero manutenção, mas dependência do fornecedor). O **Ollama** roda os abertos localmente e o **OpenRouter** orquestra todos por trás de uma única API.

---

## 👵 Explicando para a vovó

É a diferença entre **cozinhar em casa** e **comer no restaurante**.

**Cozinhar em casa (modelo aberto):** a senhora tem controle total — escolhe os temperos, sabe exatamente o que vai no prato, ninguém vê sua receita secreta. Mas a senhora precisa comprar o fogão, pagar o gás, lavar a louça e consertar quando quebra. Dá trabalho e custa manutenção.

**Restaurante (modelo fechado):** a senhora só chega, pede e come o melhor prato, sem preocupação nenhuma. Em compensação, paga a conta, come o que está no cardápio e depende do restaurante estar aberto e não mudar o preço.

E o **OpenRouter**? É um **garçom universal** que fala com qualquer cozinha do mundo. Em vez de a senhora ter a conta de dez restaurantes diferentes, com dez cardápios e dez formas de pagar, é só falar com esse garçom — ele leva seu pedido pra cozinha certa e traz uma conta só.

---

## 🔧 Tecnicamente

### O que "aberto" realmente significa
No mundo dos LLMs, "aberto" raramente é o mesmo que open source tradicional. Em geral significa **open weights**: você pode **baixar e executar o modelo localmente**, mas **não necessariamente** tem acesso ao pipeline de treino ou à base de dados usada. Sites como o Ollama permitem baixar **LLaMA 3** (Meta), **Gemma** (Google) ou **GPT-OSS** (OpenAI) com comandos simples. Alguns modelos são marcados como **"sem censura"** (sem filtros de resposta).

### Abertos vs. Fechados
| | ✅ Vantagens | ⚠️ Desvantagens |
|---|-------------|-----------------|
| **Abertos** | Custo reduzido (se já tem GPU local); privacidade/controle de dados sensíveis; customização e fine-tuning; independência de fornecedor | Infraestrutura custosa; manutenção complexa; limitações legais de licença (ex.: LLaMA); falta de filtros ("sem censura" pode gerar respostas perigosas) |
| **Fechados** (OpenAI, Google, Anthropic) | Qualidade superior em benchmarks; facilidade (só uma API key); escalabilidade garantida; SLA, suporte e conformidade legal | Dependência do fornecedor; custo por token; menos controle sobre dados |

> 🎯 **Conclusão do curso:** nenhum caminho é universalmente melhor. Abertos brilham para **uso pessoal, testes e prototipagem** (com estrutura e conhecimento para mantê-los). Fechados ganham em **ambientes empresariais** que exigem escalabilidade, conformidade e confiabilidade. O segredo é escolher pelo contexto **técnico, financeiro e legal**.

### Ollama a fundo (Cap. 2)
Aplicação para **MacOS/Windows/Linux** com API HTTP por trás (integra com qualquer app). Comandos simples: `ollama pull` (baixar) e `ollama serve` (executar). Ganhou destaque a partir de jul/2023, sobre o ecossistema Meta/LLaMA. Catálogo amplo: modelos gerais, de código e **multimodais**.

**Limitação importante:** o Ollama **não é indicado para produção** — executa **um prompt por vez**, demanda muitos recursos locais e não oferece alta concorrência. Para escalabilidade e baixa latência, use **vLLM**.

**Três conceitos para entender o comportamento dos modelos:**
- **Parâmetros** — os pesos do modelo (o que ele aprendeu). Mais parâmetros = maior capacidade, mas mais exigência computacional (ex.: modelos 20B, 120B).
- **Tamanho de contexto** — quantos tokens podem ser processados por vez (ex.: 32k, 128k, até 1M).
- **Quantização** — reduzir o tamanho do modelo substituindo a representação numérica dos pesos. Usa menos memória e roda mais rápido, com leve perda de qualidade. Sufixos como `Q4F32` indicam o esquema (pesos em 4 bits, ativações em 32 bits) — permitem rodar um modelo **20B com apenas 16 GB de RAM**.

A API HTTP é compatível com endpoints da **OpenAI**, o que facilita **portar aplicações existentes** para o Ollama. Integra também com **Jan AI** — app desktop open source (tipo ChatGPT local) com assistentes, histórico, banco vetorial, file system e suporte a MCPs; aceita modelos de OpenRouter, Hugging Face e Ollama.

### OpenRouter — o orquestrador (Cap. 3)
Quando você usa vários modelos (OpenAI, Google, Anthropic...), a integração vira um caos: várias API keys, SDKs, regras, dashboards de billing e risco de **vendor lock-in**. O **OpenRouter** centraliza isso: é uma **API unificada, compatível com o padrão OpenAI**, que permite **trocar de modelo ou provedor por configuração**, sem alterar a lógica da aplicação.

**Funcionalidades:**
- **Fallback automático** — se um modelo falha, tenta outro.
- **Roteamento por custo ou desempenho** — você define prioridades (latência, preço) e ele escolhe.
- **Billing consolidado** — uma cobrança só, mesmo usando vários provedores.
- **Modelos gratuitos** — muitos não exigem cartão de crédito.
- **BYOK (Bring Your Own Key)** — plugar suas próprias chaves da OpenAI/Anthropic mantendo o controle da cota.

> ⚠️ **Segurança:** mantenha as API keys **fora do controle de versão**. Subir a chave para o GitHub é um erro comum; o OpenRouter invalida chaves vazadas automaticamente, mas o ideal é sempre proteger.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| **Open weights** | Baixar/rodar o modelo, mas sem acesso ao treino/dados |
| **Ollama** | Roda modelos abertos localmente (`pull`/`serve`) |
| **Parâmetros** | Pesos do modelo (ex.: 20B = 20 bilhões) |
| **Contexto** | Tokens processados por vez (32k, 128k, 1M) |
| **Quantização** | Reduzir precisão dos pesos p/ caber em menos RAM |
| **vLLM** | Alternativa ao Ollama para produção/alta concorrência |
| **OpenRouter** | API unificada que orquestra múltiplos modelos |
| **BYOK** | Usar sua própria API key no orquestrador |
| **Vendor lock-in** | Dependência excessiva de um fornecedor |

---

## 💻 No curso
- **exemplo-10-ollama:** baixar e rodar modelos localmente, testar via `curl` e a API HTTP compatível com OpenAI; integrar o Ollama como provedor no editor via Jan AI.
- **exemplo-11-openrouter:** usar o **Gemma 27B gratuito**, filtrar modelos por tipo/custo, configurar `OPENROUTER_KEY` e experimentar fallback e roteamento.

---

## 🔗 Para ir além
- Ollama (catálogo de modelos) — https://ollama.com/search
- GPT-OSS (OpenAI) — https://openai.com/index/introducing-gpt-oss/
- vLLM (produção) — https://docs.vllm.ai/en/latest/
- Jan AI — https://www.jan.ai/docs/desktop/llama-cpp-server
- OpenRouter — https://openrouter.ai/
- Lista de open LLMs — https://github.com/eugeneyan/open-llms
