# 07 · Segurança em IA: o novo cenário e o OWASP Top 10 para LLMs

> **Unidade 4 · Aula 9** · Leitura: ~7 min · Bloco: Segurança em IA

## 🎯 Em uma frase
Software tradicional é **determinístico**; IA é **probabilística** (comportamento emergente, saídas estatísticas). Os riscos antigos continuam, mas surgem novos pontos de ataque: **dados de treino, prompts e autonomia dada aos agentes**. A referência de mercado é o **OWASP Top 10 para aplicações com LLMs (2025)**.

---

## 👵 Explicando para a vovó

Uma máquina de refrigerante tradicional sempre faz a mesma coisa: botão A, lata A. Dá para inspecionar o mecanismo e prever tudo. Um atendente humano treinado é diferente: responde conforme a conversa, pode ser enganado por um papo bem montado e, se der a ele a chave do caixa, o estrago de um engano é maior.

IA com agentes é o atendente com a chave do caixa: a segurança continua precisando de cadeado, mas também de limite do que ele pode fazer e de olhar para quem o treinou.

---

## 🔧 Tecnicamente

### O que é
- **Determinístico versus probabilístico:** em software tradicional as regras estão no código e dá para analisar entradas, fluxos, permissões, validações e saídas. Em ML e IA generativa há padrões aprendidos, probabilidades e comportamento emergente: não existe "a linha de código" responsável. Uma saída pode parecer convincente e estar errada.
- **Os riscos não desaparecem, mudam de lugar:** autenticação, autorização, proteção de dados, rede e validação de entrada continuam. Entram: **dados de treinamento** (de onde vieram, quem acessou, foram alterados?), **prompts** (podem trazer instruções de sistema, conteúdo externo, dados privados e orientar ação) e **autonomia de agentes** (consultar sistemas, chamar APIs, manipular arquivos).
- **A autonomia é concedida por pessoas:** a pergunta não é se o agente pode executar, e sim até onde faz sentido permitir (só consultar? alterar registro? enviar mensagem? comprar? executar código? acessar dado confidencial?).
- **OWASP Top 10 para LLMs, versão 2025 (revisão de março de 2025; existe tradução em português):** injeção de prompt; divulgação de informações sensíveis; cadeia de suprimentos; envenenamento de dados e modelos; manipulação imprópria de saída; autonomia excessiva; vazamento de prompt; vetores e embeddings; desinformação; consumo irrestrito. A numeração LLM01 a LLM10 segue essa ordem e bate com os IDs usados nos slides da Aula 5 do curso.

### Como funciona
- **Injeção de prompt:** entradas manipulam instruções do modelo ou da aplicação; o texto vira vetor de ataque. **Divulgação de informações sensíveis:** dados pessoais, internos e credenciais no contexto; não basta confiar que o modelo saberá o que revelar.
- **Cadeia de suprimentos:** modelos, bibliotecas, APIs, datasets, serviços, plugins e ferramentas; um componente comprometido propaga o risco. **Envenenamento:** manipular dados ou componentes para influenciar o comportamento futuro; reforça a importância de origem e integridade dos dados.
- **Manipulação imprópria de saída:** a saída do LLM não é confiável só porque veio do modelo; se for executada ou inserida em outro sistema, precisa de validação. **Autonomia excessiva:** princípio do privilégio mínimo aplicado a sistemas que decidem e agem.
- **Vazamento de prompt:** instruções internas podem conter regras, contexto e até dados. **Vetores e embeddings:** RAG e busca semântica criam superfícies de risco; recuperação sem proteção pode misturar ou expor conteúdo. **Desinformação:** respostas incorretas com aparência de confiança, ainda mais quando publicadas sem revisão. **Consumo irrestrito:** chamadas excessivas e custos inesperados; segurança também é disponibilidade e sustentabilidade operacional.
- Controles de arquitetura citados para autonomia: restringir ferramentas, definir permissões, exigir confirmação humana em ações críticas, monitorar logs, validar antes de executar, limitar consumo e separar ambientes. Decisão de arquitetura e de governança.
- Leitura recomendada: o documento da OWASP tem cerca de cinquenta páginas; uma leitura dinâmica já prepara para os casos, e dá para aprofundar depois. Observar sempre a versão e se há uma mais recente.

### Onde aplicar
- Usar o Top 10 como checklist de ameaças no desenho de uma aplicação com LLM, RAG ou agentes.
- Definir, para cada ferramenta de um agente, o nível de autonomia permitido e o controle correspondente.
- Incluir limites de consumo e validação de saída no design, não só após o incidente.

### Vantagens e limites
**Vantagens**
- Referência de mercado que organiza riscos recorrentes numa lista curta.
- Mostra continuidade com a segurança tradicional em vez de recomeçar do zero.
- Ajuda a transformar "IA é perigosa" em riscos específicos e controláveis.

**Limites**
- A lista envelhece: versão e ano precisam ser conferidos (já existe material para agentes).
- Não substitui análise de contexto da aplicação.
- Parte do material mais novo sai primeiro em inglês.

### 🚫 Armadilhas
- Tratar prompt apenas como pergunta de chatbot, quando na aplicação ele funciona como lógica de controle.
- Confiar na saída do modelo sem validar antes de executar ou inserir em outro sistema.
- Achar que a segurança tradicional deixou de ser necessária.
- Ignorar dados de treino como superfície de ataque.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Superfície de ataque (IA) | Dados de treino, prompts de entrada e autonomia dada a agentes |
| Comportamento emergente | Capacidades ou respostas não programadas como regra explícita |
| LLM01 Prompt Injection | Entradas que manipulam o comportamento esperado |
| LLM02 Sensitive Info Disclosure | Exposição de dados que não deveriam sair |
| LLM03 Supply Chain | Componentes de terceiros comprometidos |
| LLM05 Improper Output Handling | Saída do modelo usada sem validação |
| LLM06 Excessive Agency | Permissões ou autonomia além do necessário |
| LLM10 Unbounded Consumption | Uso sem limites de recurso; custo e disponibilidade |

---

## 💻 No curso

Aula introdutória, sem código: prepara o cenário e pede leitura prévia do OWASP Top 10. O repositório tem a pasta `modulo5-seguranca-dados` com a demonstração e o manual das próximas aulas ([09](./09-prompt-injection-jailbreaking-guardrails.md) e [10](./10-pentest-red-blue-purple-team.md)). Os dez riscos aparecem aplicados em cinco casos nos slides da Aula 5 do curso: [08 · Cinco casos de segurança](./08-cinco-casos-de-seguranca-owasp.md).

---

## 🔗 Para ir além
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/)
- [OWASP Top 10 para LLM e IA Generativa 2025 (português, indicação 1)](https://genai.owasp.org/resource/owasp-top-10-para-aplicacoes-de-llm-e-ia-generativa-2025/)
- [OWASP Top 10 for Agentic Applications for 2026 (indicação 2)](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [A Practical Guide for Secure MCP Server Development (indicação 6)](https://genai.owasp.org/resource/a-practical-guide-for-secure-mcp-server-development/)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia)

---

⬅️ [06 · Aspectos humanos e desafios éticos: do caso da inadimplência ao NIST](./06-aspectos-humanos-e-desafios-eticos.md)  ·  [08 · Cinco casos de segurança em IA e a correlação com o OWASP](./08-cinco-casos-de-seguranca-owasp.md) ➡️
