# 04 · Vibe coding: arquivos de instrução, llms.txt e agents especializados

> **Unidade 3 · Aula 1** · Leitura: ~9 min · Bloco: Agents, instructions e skills

## 🎯 Em uma frase
Quando você delega código à IA, a qualidade do resultado depende mais de **como você instrui o modelo** do que da sua digitação. Dois instrumentos entram em cena: **arquivos de instrução** que descrevem o projeto e **agents**, prompts especializados com uma responsabilidade bem definida.

---

## 👵 Explicando para a vovó

É como receber um estagiário novo: se você entrega um manual do jeito da casa (como nomear coisas, onde ficam as pastas, o que é «pronto»), ele trabalha alinhado. Sem o manual, cada pedido sai de um jeito.

E, em vez de um estagiário que faz tudo, você monta uma equipe: um que escreve código, outro que testa, outro que revisa. Cada um com um bilhete curto do que faz e do que não faz.

---

## 🔧 Tecnicamente

### O que é
- **O que muda com vibe coding:** você passa a delegar tarefas à IA, e sem instruções bem definidas e agents especializados ela tende a gerar código inconsistente, fora do padrão ou desalinhado da arquitetura.
- **Arquivos de instrução:** documento que descreve o projeto para a IA (arquitetura, responsabilidade de cada camada, nomenclatura, convenções, decisões técnicas), um guia permanente consultado a cada geração de código.
- **Onde ficam:** normalmente em diretórios como `.github`, em arquivos markdown dedicados ou em arquivos de configuração do editor. Não servem à execução da aplicação, e sim a orientar as ferramentas de IA.
- **Problema do tamanho:** em projetos reais podem chegar a milhares de palavras, o que significa mais tokens, mais tempo e maior risco de perda de foco. A solução vem com as skills ([tópico 05](./05-agent-skills.md)).
- **Geração automatizada:** ninguém escreve tudo à mão; ferramentas analisam o código, fazem perguntas sobre o projeto e geram o conjunto de regras.
- **llms.txt:** parecido com o `robots.txt`, mas para LLMs: em vez de a IA navegar por HTML, o site expõe um arquivo estruturado com descrição do sistema, links relevantes, perguntas frequentes e dados importantes. É diferente do arquivo de instrução, que é interno ao ambiente de desenvolvimento.
- **Agent:** essencialmente um prompt especializado com responsabilidade definida (código, testes, revisão, requisitos, integração). No editor se define nome, descrição, papel, instruções específicas e acesso a ferramentas.

### Como funciona
- **Exemplo do professor (agent de desenvolvimento):** TypeScript e Node.js, boas práticas de arquitetura, responsabilidade única, imutabilidade, testes automatizados, e regras claras de «pronto»: sem erro de compilação, testes passando, mudanças validadas antes de finalizar.
- **Tools e MCPs no agent:** leitura e escrita de arquivos, execução de comandos, acesso a documentação atualizada e integração com MCPs, para que ele não só gere código como execute ações no ambiente.
- **Divisão de responsabilidades:** um agent gera código, outro gera testes, outro valida qualidade, outro revisa. Prompts menores significam menos tokens, respostas mais rápidas, mais previsibilidade e menos erro.
- **Uso real:** consultar tarefas em sistemas de gestão, analisar comentários de code review, aplicar correções e validar antes de entregar. O papel do dev vira o de orquestrador de ferramentas e agentes.
- **Complemento da live de 24/02/2026:** os exemplos usaram `llms.txt` reais (Awesome You e AbacatePay); no front matter YAML dos agents e skills, a propriedade `user-invokable` permite invocar uma skill diretamente, sem passar pelo agent.

### Onde aplicar
- Padronizar o jeito do projeto para qualquer ferramenta de IA do time, em um arquivo versionado.
- Criar agents por papel (implementar, testar, planejar, curar) e restringir as ferramentas de cada um.
- Publicar um `llms.txt` para que agentes consumam a sua documentação sem raspar HTML.

### Vantagens e limites
**Vantagens**
- Consistência de código gerado e menos retrabalho.
- Prompts menores por agent: menos tokens e menos ambiguidade.
- Critérios de «pronto» explícitos aumentam a qualidade da entrega.

**Limites**
- Arquivos de instrução crescem e passam a consumir contexto.
- Agents com acesso amplo a ferramentas ampliam a superfície de risco.

### 🚫 Armadilhas
- Um único prompt gigante que tenta fazer tudo.
- Dar a um agent todas as ferramentas disponíveis em vez do mínimo necessário.
- Confundir arquivo de instrução do projeto (interno) com `llms.txt` (exposto a agentes externos).
- Não definir quando a tarefa está concluída: o agent para cedo ou nunca.

> 💡 **Dica:** a live de 24/02 aprofunda o uso de `llms.txt`, Gitingest e Jina Reader para dar contexto ao agente: veja o [tópico da live](./16-live-mcp-and-skills-practical-case.md).

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Vibe coding | Delegar a escrita do código à IA, guiando por instruções |
| Arquivo de instrução | Documento persistente com arquitetura, convenções e decisões do projeto |
| llms.txt | Arquivo estruturado para agentes consumirem informação de um site, como um robots.txt para LLMs |
| Agent | Prompt especializado com papel, regras e ferramentas próprios |
| Front matter | Bloco YAML no topo do markdown com as propriedades do agent |
| Critério de pronto | Condições para dar a tarefa por concluída (compila, testes passam) |

---

## 💻 No código do repo

**Projeto:** [03-dev-instructions-agents/.github/agents](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/03-dev-instructions-agents/.github/agents)

Quatro definições de agents em markdown com front matter YAML: `developer.agent.md` (desenvolvimento TypeScript com disciplina de testes) e três agents de teste com Playwright (`planner`, `generator` e `healer`). Não há código executável: é prompt versionado.

**Fluxo**
1. `developer.agent.md`: front matter com `description` e `tools` (`vscode`, `execute`, `read`, `edit`, `search`, `web`, `agent`, `context7/*`, `todo`). Seções Mission («edições mínimas e seguras provadas por testes»), Success Criteria (sem erros de tipo, testes do arquivo e suíte completa passando, critérios de aceite atendidos), Scope (will do e won't do), Required User Inputs, Core Principles e Workflow (Plan, Edit, Test, Verify, Summary).
2. No «Won't do» do developer: não introduzir padrões inseguros (`eval`, shell injection, segredos em log), não prosseguir com requisito ambíguo, não adicionar dependência sem justificativa, não criar `types.ts` nem `index.ts` de reexport.
3. Core Principles: imutabilidade, responsabilidade única, injeção de dependência, tipos explícitos sem `any`; configuração em arquivos de config; prompts de LLM em `prompts/*.txt` e chamadas por interface injetada (`LLMClient`); testes com `node:test` e `node:assert/strict`, mock só nas fronteiras externas.
4. `playwright-test-planner.agent.md`: declara `model: Claude Sonnet 4` e um MCP server `playwright-test` por stdio (`npx playwright run-test-mcp-server`); explora a interface com ferramentas `browser_*` e salva um plano de testes em markdown via `planner_save_plan`.
5. `playwright-test-generator.agent.md`: usa ferramentas `playwright/*` para executar cada passo do plano em tempo real e então `generator_write_test` grava o teste (um por arquivo, dentro de um `describe` com o nome do item do plano).
6. `playwright-test-healer.agent.md`: roda os testes (`test_run`), depura (`test_debug`), corrige seletores e asserts e repete; se tiver alta confiança de que o teste está certo, marca como `test.fixme()`. Proíbe esperar `networkidle`.

**Como rodar**
- Não há nada para executar: copie a pasta `.github/agents` para um projeto e abra o chat do VS Code em modo agent para selecionar o agent.
- Os três agents Playwright dependem do MCP do Playwright estar disponível no editor.

**Armadilhas e achados no código**
- O mesmo `developer.agent.md` (2647 bytes) é copiado dentro de `07-.../customers-mcp-z/.github/agents` (nas pastas template e -z) e de `08-.../customers-mcp-z/.github/agents`; se você ajustar um, os outros ficam defasados.
- O exemplo do generator contém `async { page } =>`, que não é JavaScript válido (faltam os parênteses de desestruturação); é só exemplo dentro do prompt, mas pode ser copiado como está.
- O `description` do generator carrega placeholders em comentário HTML dentro de uma string de front matter: legível por humanos, ruidoso para quem automatiza.
- Os agents usam nomes de servidor diferentes (`playwright/*` no generator, `playwright-test/*` no planner e no healer); confira como o seu editor resolve cada um.
- O `developer` lista `context7/*` como ferramenta: o agent assume que esse MCP está configurado.

---

## 🔗 Para ir além
- [Código: 03-dev-instructions-agents/.github/agents](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/03-dev-instructions-agents/.github/agents)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica)

---

⬅️ [03 · Services como tools: Google Trends com LangChain.js](./03-services-as-tools-google-trends.md)  ·  [05 · Skills: conhecimento modular carregado sob demanda](./05-agent-skills.md) ➡️
