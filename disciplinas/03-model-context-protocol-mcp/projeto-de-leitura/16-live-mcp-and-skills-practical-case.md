# 16 · Live de MCP e Agent Skills: o caso MySQL2, a ingestão de contexto e a escolha entre Skill e MCP

> **Live · 24/02/2026** · Leitura: ~7 min · Bloco: Agents, instructions e skills

## 🎯 Em uma frase
A live inaugural de 24/02/2026 propôs um desafio prático (migrar os testes frágeis do **MySQL2** para TypeScript com duas **skills** e um **agent**), mostrou como transformar repositórios e documentação em texto para LLM e comparou, com casos reais, quando um **CLI + skill** serve melhor que um servidor **MCP**.

---

## 👵 Explicando para a vovó

A teoria da live (o que é um MCP, o que é uma skill) está nos tópicos 00 e 05. Aqui fica a parte de oficina: em vez de só explicar o que é um manual de instruções, o desafio é entregar ao agente os manuais certos para reformar uma casa velha, os testes de um projeto antigo em JavaScript.

Antes de reformar, o agente precisa das plantas em formato legível: o código e a documentação dos outros projetos, convertidos em texto limpo. E fica a pergunta de quem compra ferramenta: você precisa de uma *furadeira* (MCP, que age no mundo) ou de um *manual* (skill, que ensina o processo)?

---

## 🔧 Tecnicamente

### O que é
- **Do que se trata:** a live inaugural de aquecimento da pós, em 24/02/2026, com Aurélio Oliveira e Weslley Araújo. O repositório guarda o README e dois textos de base teórica (MCP e Agent Skills). Não há código, slide de skills nem projeto da demonstração: o slide de MCP aparece como “em breve”. O que foi feito ao vivo, portanto, só é conhecido pelo roteiro do README, e eu não sei como o desafio terminou.
- **O que já está absorvido, sem repetir aqui:** MCP (N×M, host, client e server, primitivas, ciclo de invocação, custo de tokens, gaps semânticos) no [tópico 00](./00-mcp-protocol-overview.md); anatomia da skill, divulgação progressiva, `npx skills add` e o estudo SkillScan no [tópico 05](./05-agent-skills.md); os `llms.txt` do Awesome You e da AbacatePay e a propriedade `user-invokable` no [tópico 04](./04-instructions-llms-txt-and-agents.md).
- **O desafio prático (README):** o problema é refatorar código legado do MySQL2 e corrigir testes frágeis cuja tipagem manual vive separada do código principal (JavaScript); a solução é transcrever todos os testes automatizados para TypeScript. A skill 1 encapsula o conhecimento sobre os tipos e interfaces do projeto; a skill 2, o conhecimento sobre os testes (práticas e exemplos de implementação); o agent usa as skills para analisar o código, decidir quando invocá-las, identificar pontos de refatoração, sugerir mudanças e corrigir os testes frágeis.
- **Desafios adicionais (README):** converter e consumir o código-fonte de projetos externos complexos em formato consumível por LLM; fazer o mesmo com a documentação de sites; gerenciar regras de uso de tokens por divulgação progressiva, para o agente acessar só o necessário em cada contexto; invocar agents e skills local e globalmente; invocar uma skill diretamente, sem passar pelo agent, com `user-invokable` no front matter.
- **Ferramentas que viram contexto:** o README lista como *utilizadas* o Gitingest (repositório em texto; o exemplo foi `gitingest.com/wellwelwel/poku`) e o Jina Reader (página web em texto limpo; o exemplo foi a documentação do `startScript` do Poku via `r.jina.ai`), além do VS Code com a extensão do Claude Code e do skills.sh. O Firecrawl (CLI que converte páginas em texto limpo), Lovable, Jira, Cursor, Windsurf, Codex e Copilot Chat aparecem só como *mencionados*.
- **Casos reais de skills (base teórica):** a `react-best-practices` da Vercel (dez anos de regras de React e Next.js; ao pedir a revisão de performance de um componente no Cursor, ativa mais de 40 regras); a `apollographql/skills` (evita que a IA gere padrões de GraphQL de 2019); e o Firecrawl como *CLI + skills em vez de MCP*: em vez de jogar ~75.000 tokens de HTML na conversa, a skill ensina a raspar a página, salvar em `.md` e usar `grep`, com redução de quase 98% (números da live, que não verifiquei).
- **Contexto histórico (base teórica):** as skills foram formalizadas pela Anthropic como padrão aberto no fim de 2025, e o skills.sh da Vercel é chamado de “o momento npm para agentes de IA”. O MCP foi lançado pela Anthropic no fim de 2024.
- **Skill ou MCP, segundo a live:** o MCP é para conectividade e ferramentas (“acessar o banco de dados”), roda como processo isolado e carrega o catálogo de tools no contexto (50.000 a 150.000 tokens por sessão em ambientes corporativos); a skill é conhecimento procedimental (“como formatar o relatório”), roda no mesmo ambiente do agente, herda as permissões do terminal e custa 30 a 100 tokens até ser ativada. A conclusão da live é que as IAs mais eficientes combinam os dois: MCP como braços e pernas, skills como cérebro.
- **Glossário da live que complementa os tópicos 00 e 05:** *sandbox* (ambiente isolado para executar código sem afetar o sistema), *prompt injection* (instruções maliciosas que manipulam o comportamento da IA), *rate limiting*, *test runner*, *front matter* (bloco YAML entre `---` que configura agents e skills) e *rules* com divulgação progressiva.

### Como funciona
- **Um roteiro plausível para repetir o desafio** (é a minha leitura do README, não o que foi executado ao vivo): gerar o texto do código do MySQL2 com o Gitingest e o da documentação do Poku com o Jina Reader; escrever uma skill de tipos e uma de testes, cada uma com `SKILL.md` (`name` e `description` como gatilho) e `references/` para o que for extenso; criar um agent que diga quando invocá-las; migrar os testes aos poucos, com a suíte do projeto como rede de segurança.
- **Local e global (hipótese):** o README não detalha. A leitura mais provável é skill do projeto (por exemplo `.claude/skills/`) contra skill instalada para o usuário; no [tópico 05](./05-agent-skills.md) a skill `find-skills` usa `npx skills add ... -g -y` para instalar de forma global.
- **Divulgação progressiva aplicada às regras:** o desafio pede que as regras de uso de tokens sigam a mesma lógica dos três níveis da skill (descoberta, ativação, execução): o agente carrega o mínimo e só abre as referências pesadas quando a tarefa exige.
- **Segurança ao instalar:** ao escolher skills de terceiros para o desafio, valem as recomendações da base teórica já registradas no [tópico 05](./05-agent-skills.md) (privilégio mínimo, trust tiers, não executar scripts não inspecionados).

### Onde aplicar
- Migrar testes ou código legado com skills que carregam o conhecimento do projeto (tipos, convenções, exemplos) em vez de repetir tudo no prompt.
- Dar a um agente a documentação de uma biblioteca externa em texto limpo (Gitingest para repositório, Jina Reader para página, `llms.txt` quando o site oferece).
- Decidir entre MCP e CLI + skill: se a necessidade é acessar um sistema com segurança e isolamento, MCP; se é ensinar um procedimento sobre uma ferramenta que o agente já executa no terminal, skill.

### Vantagens e limites
**Vantagens**
- O desafio é concreto: um problema real, duas skills com responsabilidades distintas e um agent que decide quando usá-las.
- As ferramentas citadas resolvem o passo que costuma travar o agente: obter o código e a documentação de terceiros em formato consumível.
- Os casos da base teórica mostram a economia de contexto de CLI + skill frente a despejar dados na conversa.

**Limites**
- O repositório não traz código, skills nem resultado da demonstração: não dá para conferir o que foi feito, só o roteiro.
- Os números (75.000 tokens, 98%, 50.000 a 150.000, 13%, SkillScan) vêm da live e não foram verificados.
- A comparação de custo entre MCP e CLI + skill depende do caso: o Firecrawl é um exemplo, não uma regra.

### 🚫 Armadilhas
- Tratar o roteiro do README como o que foi executado ao vivo: o material não registra o resultado.
- Converter um repositório inteiro em texto e colar na conversa: o ponto da live é dar ao agente só o necessário, por divulgação progressiva.
- Usar skill de terceiros com scripts sem inspecionar (os riscos da live estão no tópico 05).
- Esperar que uma skill substitua o acesso a sistemas: ela ensina o processo, não abre a conexão.

> 💡 A seção “Abordagem Prática” do README da live é a única parte dela que não está nos tópicos 00, 04 e 05.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Gitingest | Converte um repositório do GitHub em texto para consumo por LLM (`gitingest.com/usuario/repo`) |
| Jina Reader | Converte uma página web em texto limpo prefixando a URL com `r.jina.ai` |
| Firecrawl | CLI que converte páginas web em texto limpo; na base teórica, exemplo de CLI + skill no lugar de MCP |
| react-best-practices | Skill da Vercel com mais de 40 regras de otimização de React e Next.js (base teórica) |
| user-invokable | Propriedade do front matter que permite invocar a skill diretamente, sem passar pelo agent (live) |
| Skill 1 e Skill 2 | No desafio do MySQL2: conhecimento de tipos e interfaces, e conhecimento dos testes e práticas |
| Rules com divulgação progressiva | Regras de uso de tokens carregadas em camadas, conforme a necessidade do contexto |

---

## 💻 No curso

- A live não tem pasta de código: o repositório guarda apenas `lives/2026-02-24/README.md` e dois arquivos em `base-teorica/`. A pasta de skills do módulo (`04-skills`) está no [tópico 05](./05-agent-skills.md).
- Não há como conferir o resultado do desafio do MySQL2: nem as skills, nem o agent, nem os testes migrados foram versionados no repositório do curso.
- O README da live marca o slide de MCP como “em breve”; o tema de MCP fica coberto pela base teórica e pelo [tópico 00](./00-mcp-protocol-overview.md).

---

## 🔗 Para ir além
- [Live de 24/02/2026 no repositório do curso](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-02-24)
- [Base teórica: MCP](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/lives/2026-02-24/base-teorica/mcp-model-context-protocol.md)
- [Base teórica: Agent Skills](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/lives/2026-02-24/base-teorica/agent-skills-conhecimento-procedimental-da-ia.md)
- [Gitingest](https://gitingest.com/)
- [Jina Reader](https://jina.ai/reader/#what_reader)
- [Firecrawl](https://www.firecrawl.dev/)
- [skills.sh](https://skills.sh/)
- [MySQL2 (cobaia da live)](https://github.com/sidorares/node-mysql2)
- [Poku (código e documentação usados nos exemplos)](https://github.com/wellwelwel/poku)

---

⬅️ [05 · Skills: conhecimento modular carregado sob demanda](./05-agent-skills.md)  ·  [06 · Servidor MCP do zero: tools, resources, prompts, testes via MCP Client e Inspector](./06-mcp-server-from-scratch.md) ➡️
