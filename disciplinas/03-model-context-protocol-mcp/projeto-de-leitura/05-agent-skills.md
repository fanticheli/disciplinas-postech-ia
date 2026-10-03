# 05 · Skills: conhecimento modular carregado sob demanda

> **Unidade 3 · Aula 2 (com complemento da live de 24/02/2026)** · Leitura: ~11 min · Bloco: Agents, instructions e skills

## 🎯 Em uma frase
Quanto maior o prompt, maior a chance de a IA se perder. **Skills** dividem o conhecimento em unidades pequenas e reutilizáveis (arquivos markdown com instruções, exemplos e referências) que o sistema escolhe e carrega **sob demanda**. Agents são papéis; skills são habilidades; MCP é execução e integração.

---

## 👵 Explicando para a vovó

Em vez de ler a enciclopédia inteira antes de cada tarefa, você deixa na estante vários manuais finos, cada um com a etiqueta do que ensina. Quando a tarefa é editar vídeo, você puxa só o manual de vídeo.

Quem decide qual manual abrir é o próprio sistema, olhando as etiquetas. O MCP, nessa imagem, são as ferramentas da oficina; as skills são os manuais de como usá-las.

---

## 🔧 Tecnicamente

### O que é
- **Problema dos prompts grandes:** há limite de tokens, o modelo não prioriza bem tudo, partes importantes podem ser ignoradas e a resposta perde consistência.
- **Skill:** conjunto de instruções focadas numa tarefa específica, com exemplos, boas práticas e contexto técnico, organizado em arquivos estruturados (em geral markdown). Pode apontar para outros documentos, criando uma estrutura navegável: a IA acessa o que precisa sob demanda.
- **Exemplos da aula:** escrever queries eficientes, usar uma biblioteca, interagir com uma API específica, executar tarefas no sistema operacional, usar uma ferramenta técnica como edição de vídeo. Com skills atualizadas, o modelo deixa de depender só do conhecimento pré-treinado.
- **Comparação com MCP:** ambos evitam sobrecarga de contexto, trabalham sob demanda e permitem descoberta incremental. MCP lida com execução e integração; skills lidam com instrução e conhecimento.
- **Skills e agents se complementam:** agents representam papéis (dev, QA, produto) e skills representam habilidades (banco de dados, testes, APIs). Diferente dos agents, você não escolhe a skill manualmente: o sistema identifica as relevantes.
- **Ecossistema:** repositórios de skills funcionam como gerenciadores de pacotes: buscar, instalar no projeto e reutilizar. Empresas podem criar skills próprias (padrões de API, regras de negócio, convenções de arquitetura) e compartilhar entre times.

### Como funciona
- **Anatomia (live):** `SKILL.md` é obrigatório (metadados YAML com ao menos `name` e `description`, mais instruções em markdown); `scripts/`, `references/` e `assets/` são opcionais.
- **Divulgação progressiva (live):** nível 1 carrega só nome e descrição (algo como 30 a 100 tokens) e a descrição funciona como gatilho; nível 2 carrega o corpo do `SKILL.md` quando o pedido bate com a descrição; nível 3 só lê `references/` ou roda `scripts/` se o corpo mandar.
- **CLI (live):** `npx skills add <usuario/repositorio>` baixa as skills do GitHub e instala nos diretórios dos agentes detectados na máquina (`.claude/skills/`, `.cursor/skills/`, `.windsurf/skills/`).
- **Integração com LangChain (aula):** skills também podem ser tratadas como fontes de contexto adicionais, documentos acessíveis via ferramentas ou referências que o modelo consulta dinamicamente.
- **Riscos (live):** skills rodam no mesmo ambiente do agente e herdam as permissões do terminal. O estudo SkillScan, citado na live (números não verificados: não localizei o estudo, só o que a live afirma), analisou mais de 42.000 skills comunitárias: 26,1% com vulnerabilidades, 13,3% com exfiltração de dados e 11,8% com escalonamento de privilégios; skills com pasta `scripts/` teriam 2,12× mais chance de ser maliciosas. Recomendação: tratar a instalação com o rigor de software em produção e bloquear scripts de terceiros até inspecionar.

### Onde aplicar
- Skill de banco de dados para o modelo escrever queries melhores sem inventar sintaxe.
- Skill de uma ferramenta de linha de comando (como o ffmpeg) com comandos e padrões prontos.
- Skills internas da empresa: padrões de API, convenções e fluxos operacionais.

### Vantagens e limites
**Vantagens**
- Menos tokens, respostas mais rápidas e mais precisas.
- Conhecimento atualizado, versionável e compartilhável.
- Carga sob demanda permite ter muitas skills instaladas sem custo fixo alto.

**Limites**
- A qualidade depende da descrição (gatilho) estar bem escrita.
- Skills de terceiros são código e texto confiados ao agente: risco de segurança (live).

### 🚫 Armadilhas
- Instalar skill comunitária sem ler o `SKILL.md` e os scripts.
- Escrever skill enorme num único arquivo, recriando o problema do prompt gigante.
- Esperar que skills substituam servidores MCP: uma ensina o processo, o outro dá acesso.

> 💡 **Dica:** a live de 24/02 aprofunda isso com um caso prático (migrar os testes do MySQL2 para TypeScript com duas skills e um agent) e casos reais de skills: veja o [tópico da live](./16-live-mcp-and-skills-practical-case.md).

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| SKILL.md | Arquivo principal da skill: front matter com name e description, mais instruções |
| references/ | Documentação extensa que a skill manda carregar só se necessário |
| Divulgação progressiva | Carregar nome, depois corpo, depois referências, conforme a necessidade |
| npx skills | CLI para buscar (find), instalar (add), checar (check) e atualizar (update) skills |
| skills-lock.json | Registro de origem e hash de cada skill instalada |
| Trust tiers | Níveis de confiança: skill não auditada só fornece texto, sem executar script (live) |

---

## 💻 No código do repo

**Projeto:** [04-skills](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/04-skills)

Três skills instaladas via `npx skills` em `.agents/skills/` (`ffmpeg`, `find-skills` e `neo4j-cypher-guide`), um `skills-lock.json`, o `refs.txt` da aula e dois vídeos de demonstração. Não há código de aplicação.

**Fluxo**
1. `.agents/skills/ffmpeg/SKILL.md` (13 KB): front matter com `name` e `description` (gatilhos como converter GIF para MP4, redimensionar, extrair áudio); depois «Quick Reference» com comandos `ffmpeg` (GIF para MP4, resize, compressão, áudio, corte, velocidade, concatenar, fades), seção específica para projetos Remotion, problemas comuns, tabela de qualidade (CRF) e otimização por plataforma (YouTube, Twitter/X, LinkedIn, web). `reference.md` traz as tabelas de filtros.
2. `.agents/skills/find-skills/SKILL.md`: ensina o agente a achar skills para quem pergunta «como faço X»: `npx skills find [query]`, `npx skills add <owner/repo@skill>` (com `-g -y` para instalar global sem confirmação), `check` e `update`; mostra como apresentar a opção ao usuário e o que fazer se nada for encontrado.
3. `.agents/skills/neo4j-cypher-guide/SKILL.md`: guia de Cypher moderno (evitar sintaxe removida como `id()`, filtrar nulos ao ordenar, `COUNT{}` e `EXISTS{}`, subqueries, QPP) com um trecho «When to Load Reference Documentation» que diz quando abrir cada arquivo de `references/` (`deprecated-syntax.md`, `subqueries.md`, `qpp.md`). É a divulgação progressiva dentro da própria skill.
4. `skills-lock.json`: para cada skill, `source` (`digitalsamba/claude-code-video-toolkit`, `vercel-labs/skills`, `tomasonjo/blogs`), `sourceType: github` e `computedHash`.
5. `refs.txt`: links de skills.sh, da skill de ffmpeg, do post da Supabase sobre Postgres para agentes e de um post no X. `video.mp4` (10 s, 1920x1080, 60 fps, ~1 MB) e `video_bw.mp4` (mesma duração e resolução, ~4 MB) servem à demonstração do ffmpeg; presumo que o segundo seja o resultado em preto e branco (não verifiquei o conteúdo).

**Como rodar**
- Para reproduzir: `npx skills add digitalsamba/claude-code-video-toolkit` e peça ao agente algo como converter ou comprimir o `video.mp4`; ele deve ativar a skill do ffmpeg pela descrição.
- A skill `neo4j-cypher-guide` faz mais sentido junto de um agente que gere Cypher (como o RAG com Neo4j da disciplina 02).
- Não executei `npx skills` nesta pesquisa; o conteúdo acima vem da leitura dos arquivos.

**Armadilhas e achados no código**
- A skill `ffmpeg` tem 13 KB e foi escrita em torno de projetos Remotion: ela mesma contraria a ideia de skill pequena e pode carregar contexto que você não precisa.
- O repositório versiona dois vídeos (5 MB) dentro da pasta de skills; ao clonar só para estudar, eles pesam muito mais que o texto de toda a pasta.
- O mapa da apostila aponta para `04-skills` como um todo, mas as skills estão em `.agents/skills/` (pasta oculta): fácil de não achar na interface do GitHub ou do editor.
- `computedHash` no lock serve para detectar mudança, não prova que a skill é segura (lembre dos números do SkillScan, ainda que não verificados).

---

## 🔗 Para ir além
- [Catálogo de skills (skills.sh, citado no refs.txt do módulo)](http://skills.sh/)
- [Skill ffmpeg usada no exemplo (skills.sh)](https://skills.sh/digitalsamba/claude-code-video-toolkit/ffmpeg)
- [Boas práticas de Postgres para agentes (Supabase, citado no refs.txt)](https://supabase.com/blog/postgres-best-practices-for-ai-agents)
- [Código: 04-skills](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica/04-skills)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo03-mcp-na-pratica)

---

⬅️ [04 · Vibe coding: arquivos de instrução, llms.txt e agents especializados](./04-instructions-llms-txt-and-agents.md)  ·  [06 · Servidor MCP do zero: tools, resources, prompts, testes via MCP Client e Inspector](./06-mcp-server-from-scratch.md) ➡️
