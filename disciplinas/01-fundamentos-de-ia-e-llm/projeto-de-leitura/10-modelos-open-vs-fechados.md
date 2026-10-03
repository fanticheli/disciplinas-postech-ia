# 10 · Modelos open-source vs. proprietários — Ollama e OpenRouter

> **Módulo 9 da disciplina (Caps. 1 a 3)** · Leitura: ~12 min · Pré-requisito: doc [05](./05-como-funcionam-llms.md)

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

> 🗣️ **A motivação da aula:** uma simples dúvida sobre como funciona um emulador de videogame levou o professor a esbarrar nos limites dos modelos populares e a explorar modelos abertos.

> 🎯 **Conclusão do curso:** nenhum caminho é universalmente melhor. Abertos brilham para **uso pessoal, testes e prototipagem** (com estrutura e conhecimento para mantê-los). Fechados ganham em **ambientes empresariais** que exigem escalabilidade, conformidade e confiabilidade. O segredo é escolher pelo contexto **técnico, financeiro e legal**.

### Ollama a fundo (Cap. 2)
Aplicação para **MacOS/Windows/Linux** com API HTTP por trás (integra com qualquer app). Comandos simples: `ollama pull` (baixar) e `ollama serve` (executar). Ganhou destaque a partir de jul/2023, sobre o ecossistema Meta/LLaMA. Catálogo amplo: modelos gerais, de código e **multimodais**.

**Limitação importante:** o Ollama **não é indicado para produção** — executa **um prompt por vez**, demanda muitos recursos locais e não oferece alta concorrência. Para escalabilidade e baixa latência, use **vLLM**.

**Três conceitos para entender o comportamento dos modelos:**
- **Parâmetros** — os pesos do modelo (o que ele aprendeu). Mais parâmetros = maior capacidade, mas mais exigência computacional (ex.: modelos 20B, 120B).
- **Tamanho de contexto** — quantos tokens podem ser processados por vez (ex.: 32k, 128k, até 1M).
- **Quantização** — reduzir o tamanho do modelo substituindo a representação numérica dos pesos. Usa menos memória e roda mais rápido, com leve perda de qualidade. Sufixos como `q4f32_1` indicam o esquema (pesos em 4 bits, ativações em 32 bits) — permitem rodar um modelo **20B com apenas 16 GB de RAM**. Atenção: essa grafia é a do MLC (o link da aula aponta para `Llama-3-8B-Instruct-q4f32_1-MLC`), provavelmente não a das tags do Ollama.

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

## 💻 No código do repo

Duas pastas, cada uma com só um `request.sh` (comandos `curl`, sem código de aplicação). Ambas falam o dialeto de chat da OpenAI, então alternar entre local e nuvem é trocar `baseURL`, chave e nome do modelo. Na aula também: Ollama integrado ao editor como provedor via Jan AI e experimentos de fallback e roteamento no OpenRouter.

**`exemplo-10` · Ollama (modelos abertos locais)**
- **Objetivo:** baixar e rodar LLMs de pesos abertos e consumi-los por HTTP, comparando um modelo "sem censura" (`llama2-uncensored:7b`) com um alinhado (`gpt-oss:20b`, pesos abertos da OpenAI).
- **Fluxo (`request.sh`):**
  1. `ollama list`, `ollama pull llama2-uncensored:7b` e `ollama pull gpt-oss:20b`.
  2. `curl` em `http://localhost:11434/v1/chat/completions` (compatível com OpenAI: `{ model, messages: [{ role: "user", content }] }`); a resposta traz `usage` (prompt/completion/total tokens).
  3. `curl` em `/api/generate` (nativa, usa `prompt`) com `gpt-oss:20b` e `"stream": false`; `jq` extrai `response` e `thinking`: o modelo recusa e o `thinking` expõe o raciocínio da recusa.
  4. Com `"stream": true` a resposta vem em NDJSON, uma linha JSON por pedaço.
- **Rodar:** Ollama instalado e ativo na porta 11434, `curl` e `jq`. O `gpt-oss:20b` é pesado (dezenas de GB e RAM/VRAM compatível): troque por modelo menor se faltar recurso. Rode os comandos um a um. Sem chaves, custo zero.
- **Armadilhas:** o `request.sh` mistura comandos e saídas comentadas (não executa de ponta a ponta sem edição); `curl` sem o serviço ativo dá "connection refused"; `/api/generate` usa `prompt`, `/v1/chat/completions` usa `messages`, não misture; tags de modelo mudam, confira com `ollama list`; o prompt de teste é sobre criar um "aim bot" (cheat) só para ilustrar a diferença de alinhamento, não replicar; modelos sem alinhamento geram conteúdo problemático.
- **Exercícios:** apontar um cliente OpenAI para `http://localhost:11434/v1`; comparar latência e qualidade em 3B, 7B e 20B; testar modelo de visão.

**`exemplo-11` · OpenRouter (gateway único)**
- **Objetivo:** uma chave, uma API no formato OpenAI e centenas de modelos, trocando só o campo `model`. Usa `google/gemma-3-27b-it:free` (`:free` = camada gratuita), `temperature: 0.3`, `max_tokens: 1000`, pergunta "Me conte uma curiosidade sobre LLMs".
- **Fluxo (`request.sh`):** `source .env` carrega `OPENROUTER_API_KEY`; o `curl` em `https://openrouter.ai/api/v1/chat/completions` envia `Authorization: Bearer` e os cabeçalhos opcionais `HTTP-Referer` e `X-Title` (identificam o app em rankings); o JSON de saída comentado mostra `provider` ("Google AI Studio"), `choices[0].message.content` e `usage` com `cost: 0`. O mesmo padrão (baseURL + cabeçalhos) reaparece via `ChatOpenAI` da LangChain no `config.ts` dos exemplos 12/13 (tópico 11).
- **Rodar:** chave em `openrouter.ai/keys`; criar `.env` com `OPENROUTER_API_KEY=sua_chave` (o `.gitignore` da raiz já ignora); `bash request.sh`, com `curl` e `jq`. Modelos gratuitos: `openrouter.ai/models?max_price=0`.
- **Armadilhas e achados:**
  - A apostila cita a variável `OPENROUTER_KEY`; o script e os exemplos 12/13 usam `OPENROUTER_API_KEY`.
  - O script envia `Content-Type: applicaton/json` (typo); a saída de exemplo mostra que funcionou assim, mas é erro latente.
  - Sem `.env` o `Authorization` vai vazio e dá 401.
  - O `usage` de exemplo mostra `completion_tokens: 0` com resposta longa: contadores de modelos gratuitos podem não ser confiáveis.
  - O `-d` é montado concatenando aspas do shell para injetar `$NLP_MODEL`: frágil, prefira `jq -n` ou heredoc.
  - Modelos `:free` têm limite de taxa, mudam ou somem; é um intermediário a mais (latência, dados passando por terceiro, políticas variam por provedor).
- **Exercícios:** comparar custo, latência e qualidade entre modelos; pedir JSON estruturado; usar o SDK OpenAI com `baseURL` do OpenRouter; fallback entre dois modelos em caso de 429.
- **Código:** [exemplo-10](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-10-ollama) · [exemplo-11](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo01-fundamentos-de-ia-e-llms-para-programadores/exemplo-11-openrouter)

---

## 🔗 Para ir além
- Ollama (catálogo de modelos) — https://ollama.com/search
- GPT-OSS (OpenAI) — https://openai.com/index/introducing-gpt-oss/
- vLLM (produção) — https://docs.vllm.ai/en/latest/
- Jan AI — https://www.jan.ai/docs/desktop/llama-cpp-server
- OpenRouter — https://openrouter.ai/
- Lista de open LLMs — https://github.com/eugeneyan/open-llms
- Ollama: modelos sem censura — https://ollama.com/search?q=uncensored
- Ollama: modelos de visão — https://ollama.com/blog/vision-models
- Ollama no VS Code — https://docs.ollama.com/integrations/vscode
- OpenRouter: modelos gratuitos — https://openrouter.ai/models?max_price=0
