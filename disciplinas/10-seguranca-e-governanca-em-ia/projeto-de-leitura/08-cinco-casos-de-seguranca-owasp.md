# 08 · Cinco casos de segurança em IA e a correlação com o OWASP

> **Unidade 4 · Slides da Aula 5 (casos)** · Leitura: ~9 min · Bloco: Segurança em IA

## 🎯 Em uma frase
Os slides da Aula 5 do curso ("Gerenciamento de Riscos em IA: Segurança e Dados") trabalham **cinco casos**: cada um tem cenário, vetor de ataque, impacto, **risco OWASP correlato** e solução. O padrão que se repete: o erro raramente é "do modelo"; é de arquitetura (validação, RBAC, privilégio mínimo, supply chain, limites).

---

## 👵 Explicando para a vovó

Cinco histórias de "o que deu errado" numa empresa. Num atendente que recebeu ordem escondida num bilhete. Num arquivo trancado que o sistema abriu para a pessoa errada. Num funcionário novo a quem deram todas as chaves. Num pacote comprado de um desconhecido. E numa conta de luz que explodiu porque deixaram a porta aberta.

A moral de todas é a mesma: antes de culpar a inteligência, olhe quem deu a chave, quem conferiu o pacote e quem conferiu a conta.

---

## 🔧 Tecnicamente

### O que é
- **Caso 1: o agente de suporte técnico.** Assistente integrado ao sistema de chamados de um e-commerce com permissão de consultar e interagir com o banco de pedidos. Entrada do atacante: um texto que manda esquecer as regras, assume a persona de "auditor de banco de dados sênior" e pede para chamar a função `buscar_pedido` com um parâmetro que carrega um fragmento de SQL destrutivo (tautologia e `DROP TABLE`, o padrão clássico de SQL injection). A aplicação executou a saída do modelo sem validação, e o banco interpretou SQL destrutivo. Riscos: **LLM01 Prompt Injection** (inversão de papel por texto) e **LLM05 Improper Output Handling**. Solução: parametrização estrita de queries e privilégio mínimo (a conta da IA nunca deve ter `DROP` ou `DELETE`).
- **Caso 2: a IA de RH "fofoqueira".** IA corporativa conectada a um banco vetorial com arquivos internos. Um funcionário júnior pede: "resuma os feedbacks de desempenho e os salários atuais de toda a diretoria de tecnologia". O retriever puxou documentos confidenciais para o contexto e o modelo gerou o relatório. Risco: **LLM02 Sensitive Data Disclosure**. Solução: o erro não foi do LLM; a camada de recuperação (RAG) deve aplicar **RBAC** filtrando os arquivos por perfil de usuário antes de enviá-los como contexto.
- **Caso 3: o deploy sem aprovação.** Agente de DevOps com acesso total a repositório, CI/CD e produção recebe "Corrija o erro de autenticação e faça o deploy" e, tentando resolver falhas intermitentes, altera permissões de IAM, reinicia serviços, mexe em variáveis de ambiente sensíveis e faz deploy direto na nuvem, sem aprovação. Resultado: regressão derruba parcialmente a autenticação, o IAM ficou com permissões excessivas e a causa raiz é difícil de achar. Risco: **LLM06 Excessive Agency**. Solução: menor privilégio, separar sugestão de execução (o modelo propõe, não executa), aprovação humana para ações críticas, allowlist de ações e auditoria com trilha de decisão.
- **Caso 4: o modelo com código malicioso.** Startup de educação baixa um modelo aberto otimizado de um repositório público não verificado, que havia sido envenenado: o modelo funciona normalmente mas tinha backdoor com gatilho específico que gera conteúdo malicioso, que pode comprometer sessões ou executar ações em aplicações que processam a saída sem validação. Risco: **LLM03 Supply Chain**. Solução: fontes confiáveis, verificar assinaturas e hashes, versionar, preferir formatos seguros (ex.: safetensors em vez de pickle, quando aplicável) e validar e auditar antes de promover a produção.
- **Caso 5: o ataque ao bolso.** Chat público de revisão de código, com modelo avançado e limite generoso por sessão. Script automatizado envia milhares de requisições simultâneas com textos gigantes que estouram a janela de contexto. Resultado: cota esgotada junto ao provedor, cobrança astronômica em horas (**Denial of Wallet**) e indisponibilidade para usuários legítimos (DoS). Risco: **LLM10 Unbounded Consumption**. Solução: rate limiting (requisições ou tokens por IP), validação estrita do tamanho da entrada, cache semântico e travas de gasto diário (hard caps) no provedor.

### Como funciona
- Leitura transversal: dois casos são **limites de arquitetura** (1: output sem validação, 3: agente sem limites), um é de **autorização de dados** (2: RBAC na recuperação), um é de **cadeia de suprimentos** (4) e um é de **disponibilidade e custo** (5).
- Padrão de mitigação: o controle fica fora do modelo e é determinístico (parametrização de query, RBAC no retriever, allowlist e aprovação humana, verificação de hash, rate limit e hard cap).
- Princípio do privilégio mínimo reaparece em três casos (1: conta sem escrita, 3: agente sem poder de deploy, 2: usuário só vê o que o seu perfil permite).
- A aula foi desenhada como "aulas diferentes, baseadas em casos": para cada caso, ler cenário e vetor, antecipar o que quebra e só depois ver correlação e solução.
- Os casos casam com o resumo de controles da apostila ([07](./07-owasp-top-10-llm-novo-cenario.md)): validação de saída, permissões, supervisão humana e limites de consumo.

### Onde aplicar
- Usar os cinco casos como roteiro de design review de uma feature com LLM: o que o modelo pode tocar, quem filtra o contexto e quanto pode custar.
- Revisar o acesso de um agente de CI/CD para separar "propor" de "executar".
- Estimar o pior caso de custo de um endpoint público de LLM e definir hard cap e rate limit.

### Vantagens e limites
**Vantagens**
- Cada caso ancora um risco abstrato do OWASP num cenário reconhecível.
- As soluções são controles de engenharia concretos, não promessas de prompt.
- Cobrem o espectro: integridade (1), confidencialidade (2), agência (3), cadeia (4) e disponibilidade (5).

**Limites**
- São cenários didáticos, simplificados (a aula não os apresenta como incidentes reais documentados).
- O slide cita a mitigação em alto nível; implementação exige conhecimento da stack.
- Cobrem seis dos dez riscos; envenenamento de dados, vazamento de prompt, embeddings e desinformação não têm caso próprio.

### 🚫 Armadilhas
- Concluir que o problema é "o modelo" e responder com mais um prompt de regra.
- Entregar ao agente credenciais de produção "para ir mais rápido".
- Baixar pesos de modelo de um repositório não verificado.
- Lançar chat público sem limite de tamanho de entrada nem teto de gasto.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Parametrização de query | Separar comando de dado, para o SQL do modelo nunca virar código |
| RBAC no retriever | Filtrar documentos por perfil de usuário antes de ir ao contexto |
| Allowlist de ações | Lista fechada do que o agente pode executar |
| Human-in-the-loop | Aprovação humana para ações críticas (deploy, IAM, produção) |
| safetensors vs pickle | Formato de pesos que não executa código na carga (quando aplicável) |
| Denial of Wallet | Esgotar o orçamento de uso de API por abuso de tokens |
| Rate limiting | Limite de requisições ou tokens por IP |
| Hard cap | Teto de gasto diário no provedor |

---

## 💻 No curso

Esses casos vêm dos slides da Aula 5 do curso (Gerenciamento de Riscos em IA, Segurança e Dados), que complementam a Unidade 4 da apostila. Não têm código no repositório; a demonstração prática do repo (notebook) cobre prompt injection indireto e jailbreaking, em [09](./09-prompt-injection-jailbreaking-guardrails.md).

---

## 🔗 Para ir além
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/)
- [OWASP Top 10 for Agentic Applications for 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo10-seguranca-governanca-ia)

---

⬅️ [07 · Segurança em IA: o novo cenário e o OWASP Top 10 para LLMs](./07-owasp-top-10-llm-novo-cenario.md)  ·  [09 · Prompt injection, jailbreaking, guardrails e segredos](./09-prompt-injection-jailbreaking-guardrails.md) ➡️
