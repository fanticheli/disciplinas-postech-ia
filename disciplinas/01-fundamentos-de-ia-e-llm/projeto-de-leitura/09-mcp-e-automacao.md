# 09 · MCPs e automação para devs

> **Módulo 8 da disciplina** · Leitura: ~11 min · Pré-requisito: doc [08](./08-ferramentas-dev-e-agentes.md)

## 🎯 Em uma frase
**MCP (Model Context Protocol)** é um padrão aberto — o "**USB das ferramentas** para a era das LLMs" — que conecta a IA a APIs, arquivos, bancos e serviços de forma plug-and-play, deixando o agente **agir no mundo real** em vez de só responder.

---

## 👵 Explicando para a vovó

Sabe como qualquer pendrive, mouse ou impressora encaixa na **mesma entrada USB** do computador, sem precisar de adaptação especial? O MCP é isso, mas para a IA: uma **tomada padrão** onde você "pluga" ferramentas — o GitHub, o navegador, o painel de monitoramento, o e-mail — e a IA passa a usá-las na hora.

Sem MCP, a IA é como uma pessoa muito inteligente **presa numa sala só falando**: ela dá ótimos conselhos, mas não consegue apertar nenhum botão. Com MCP, ela sai da sala e ganha **mãos**: abre o navegador, preenche o formulário, olha o relatório de erros, manda o e-mail — de verdade.

E como ela sabe qual ferramenta usar? Cada ferramenta tem uma **plaquinha com o nome e a descrição** ("isto lê arquivos", "isto envia e-mail"). A IA lê as plaquinhas e escolhe a que melhor combina com o pedido — igualzinho a a senhora escolher a chave de fenda certa olhando o formato.

---

## 🔧 Tecnicamente

### O que é MCP
Anunciado pela **Anthropic em novembro de 2024**, é um **protocolo aberto** para integrar assistentes de IA a fontes de dados externas. Você "pluga" servidores MCP prontos em um cliente compatível (como o VS Code) e a IA passa a usar essas integrações **automaticamente, sem código adicional**.

### Os 3 componentes de um servidor MCP
| Componente | O que é | Exemplos |
|------------|---------|----------|
| **Tools** | Ações que a IA pode executar | "listar palestras", "criar arquivo", "executar consulta SQL" |
| **Resources** | Dados usados como contexto | conteúdo de arquivos, logs, schemas de banco |
| **Prompts** | Templates que ajudam a formular comandos | estruturas prontas para usar as tools |

### Como a LLM escolhe a ferramenta
**Não há lógica if-else.** A LLM seleciona a melhor opção pela **similaridade** entre o prompt e a **descrição da tool**. Por isso, tools com **nomes claros** (ex.: `readFile`) e **descrições objetivas** são priorizadas. A IA também tende a preferir:
- **Ações não-destrutivas** (ler, listar) antes de escrever ou deletar.
- Tools com **schemas de parâmetro bem definidos**.

Cada tool define um **JSON Schema** para seus parâmetros. A LLM precisa gerar um JSON válido; se o schema não for atendido, a execução falha e o modelo pode tentar de novo — trazendo **controle e previsibilidade** para uso em produção. Modelos mais avançados encadeiam chamadas: usar uma tool, analisar o resultado e chamar outra com base nele.

Os MCPs são plugados via arquivo de configuração (`mcp.json`) no VS Code. Exemplos reais: **GitHub** (listar/revisar PRs), **Playwright** (testes e navegação), **Grafana** (monitoramento), **e-mail Resend**.

---

### Casos práticos do curso

#### 🧪 Cap. 2 — Gerar testes automatizados (Playwright MCP)
Num repositório vazio, apenas com prompts estruturados, a IA: cria o projeto com Playwright, gera arquivo de teste base, executa, **ajusta falhas automaticamente** e integra com **GitHub Actions** — tudo com **zero linha de código escrita manualmente**. A IA decide inclusive rodar o Chrome em modo visível ou *headless*, ajustando seletores conforme os logs.

> 💬 *"Ferramentas como o Playwright MCP tornam obsoleta a desculpa de que 'não deu tempo de escrever teste'."*

#### 🌐 Cap. 3 — Navegar em sites e preencher formulários
Automatizar o preenchimento repetitivo de formulários (ex.: dados de palestrante em várias plataformas). Com a extensão **Playwright MCP Bridge** no Chrome, a IA interage com as abas abertas (útil para cenários com sessão logada), **mantém o contexto** entre interações e pede dados faltantes. Também roda **localmente** com o modelo **QuenCoder 30B** via plataforma **Tome** (open source + MCP), economizando tokens.

#### 📚 Cap. 4 — Consultar documentações atualizadas (Context7)
Resolve o problema de LLMs com **conhecimento desatualizado** (sugerem código antigo/quebrado). O **Context7** é um servidor MCP que **indexa documentações reais** (Next.js, BetterAuth, Node.js, Prisma) e injeta automaticamente os trechos relevantes no contexto. Tools: `queryDocs` e `resolveLibrary`. Resultado: código sempre alinhado à versão atual, prompts menores, menos alucinação.

#### 🔍 Cap. 5 — Telemetria: IA como detetive digital (Grafana MCP)
Aplicação instrumentada com **OpenTelemetry**, enviando dados para **Prometheus** (métricas), **Grafana Loki** (logs) e **Grafana Tempo** (traces). Com um único prompt — *"Estou recebendo erro 500 neste endpoint, descubra o motivo e gere um relatório"* — a IA:
1. Coleta métricas no Prometheus (todos os requests com erro 500).
2. Explora logs no Loki.
3. Reconstrói a cadeia de chamadas no Tempo (tracing).
4. **Correlaciona os três sinais** e descobre a causa raiz: **vazamento de conexões com o banco** (conexões criadas a cada requisição, sem reutilização).

> O mais impressionante: a IA faz tudo **sem acessar o código-fonte**, apenas com os dados de telemetria. Uma investigação que levaria horas é feita em minutos.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| **MCP** | Protocolo aberto que conecta LLMs a ferramentas/dados |
| **Tool** | Ação executável exposta pelo servidor MCP |
| **Resource** | Dado de contexto (arquivo, log, schema) |
| **JSON Schema** | Contrato dos parâmetros de uma tool |
| **`mcp.json`** | Arquivo que pluga servidores MCP no editor |
| **Playwright MCP** | Automação de navegador/testes via MCP |
| **Context7** | MCP que injeta documentação atualizada |
| **Grafana MCP** | MCP para investigar telemetria (Prometheus/Loki/Tempo) |

---

## 💻 No curso
- Servidor MCP **pessoal** do professor, expondo uma API de palestras/posts (SDK via GraphQL, testes com Node.js Test Runner, publicado no npm).
- Demos: Playwright (exemplo-06/07), Context7 (exemplo-08) e Grafana (exemplo-09).
- Resend MCP para gerar e enviar e-mails direto do editor.

---

## 🔗 Para ir além
- Model Context Protocol (site oficial) — https://modelcontextprotocol.io/
- Anúncio do MCP (Anthropic) — https://www.anthropic.com/news/model-context-protocol
- Playwright MCP — https://github.com/microsoft/playwright-mcp
- Context7 — https://github.com/upstash/context7
- Resend MCP (e-mail) — https://github.com/resend/mcp-send-email
