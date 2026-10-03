# 12 · Do fluxo à plataforma: stack enterprise, três princípios e o Eval Gate

> **Módulo 5 · Aula 1** · Leitura: ~12 min · Bloco: Arquitetura Enterprise

## 🎯 Em uma frase
A perspectiva muda de *uma requisição* para *a plataforma inteira*: o maior custo deixa de ser a inferência e passa a ser **compartilhar infraestrutura** com eficiência. O stack tem quatro componentes (**API Gateway, orquestração, serviços compartilhados, observabilidade**), três princípios tornam o compartilhamento seguro (**Loose Coupling, Clear Interfaces, Policy-Driven Control**) e um **Eval Gate** decide se uma nova versão de modelo pode ser promovida.

---

## 👵 Explicando para a vovó

Uma empresa de ônibus com uma linha só pode ter garagem, oficina e despachante próprios. Quando passa a operar trinta linhas, cada linha com sua oficina vira um absurdo. Então a empresa tem uma garagem central, uma oficina única, um despacho único e um painel que enxerga todas as linhas.

Para isso funcionar, as linhas não podem se atrapalhar (acoplamento fraco), cada serviço da garagem precisa de um balcão com regras claras (interface), e as regras de quem pode usar o quê ficam num regulamento central, não na cabeça de cada motorista (política). E antes de trocar o modelo do ônibus na linha, faz-se um test-drive contra um percurso conhecido (Eval Gate).

---

## 🔧 Tecnicamente

### O que é
- **Da requisição para a plataforma:** até aqui cada decisão estava na execução de um fluxo. Agora o Trial Forge vira plataforma corporativa da Vitalis, com dezenas de estudos, equipes e países na mesma infraestrutura. Se cada estudo criar a própria implementação de todos os serviços, o crescimento operacional fica inviável.
- **API Gateway:** entrada única para todos os estudos, centralizando autenticação, controle de acesso, limite de taxa, observabilidade e gestão dos modelos. Exemplos na aula: LiteLLM (a apostila grafa 'LightLLM'), AI Gateway da Cloudflare e da Kong, com cache, limite de requisições e failover entre modelos. Nas indicações: o LiteLLM unifica mais de 100 provedores e tem uso interno relatado na Netflix; o GenAI Gateway da Uber atende 60+ casos de uso e cerca de 30 times internos, com 16 milhões de consultas por mês, espelhando o formato de API da OpenAI e com redação automática de PII nas requisições de saída, restaurada nas respostas.
- **Orquestração:** o Kubernetes aqui é a fundação da plataforma de IA: decide quantas instâncias de cada serviço ficam ativas, ampliando ou reduzindo conforme a carga. **Escalar** é administrar instâncias, não recriar serviços. O **KServe** permite atualização gradual de modelo com distribuição controlada de tráfego (campo `canaryTrafficPercent`; uma pequena fração usa a versão nova; o rollback é voltar o percentual a 0). O **Kubeflow** atua antes: pipelines de treino, experimentação e validação; o KServe serve o modelo já treinado. Mesmo ciclo de vida, momentos diferentes.
- **Serviços compartilhados:** embeddings, modelos de linguagem, cache e recuperação existem uma vez na plataforma, reutilizados por todos os estudos. Antipadrão: cada equipe constrói sua versão dos mesmos serviços (trinta versões diferentes do mesmo componente, cada uma com defeitos, configuração e ciclo de manutenção próprios).
- **Observabilidade unificada:** logs, métricas, trilhas e eventos numa visão única da plataforma, sem perder a identificação de cada estudo.
- **Compartilhar não substitui:** o fluxo individual (gateway, orquestrador, modelos, recuperação, Approval Gate) continua; a camada enterprise o **multiplica**, administrando como várias instâncias compartilham infraestrutura sem interferir umas nas outras.
- **Eval Gate:** o canary do KServe responde *como* trocar a versão sem desligar o sistema, não *se* ela deveria ser promovida. Antes de promover, o candidato roda contra um conjunto fixo de perguntas e respostas conhecidas (**golden set**) e mede-se a qualidade contra o modelo atual; só dentro de uma tolerância a promoção é autorizada, pegando a regressão antes do usuário. Na demonstração, remover acidentalmente uma cláusula do contexto, com o mesmo modelo, derrubou o desempenho e o gate bloqueou: protege contra mudança de configuração, não só de modelo.

### Como funciona
- **Loose Coupling:** reduzir dependências entre partes: um estudo pode trocar versão de modelo ou de índice sem quebrar os outros (os slides falam em 'os outros 29'). Raiz: Stevens, Myers e Constantine, Structured Design (IBM Systems Journal, 1974), acoplamento e coesão.
- **Clear Interfaces:** cada serviço compartilhado expõe um contrato explícito (o que recebe, o que responde, que garantias mantém) e os consumidores dependem só dele. Formalizado por Sam Newman (Building Microservices) e Thomas Erl (SOA: Principles of Service Design, 2008: Service Loose Coupling e Standardized Service Contract).
- **Policy-Driven Control:** autorização, limites de custo e uso saem do código de cada agente e passam a políticas centralizadas, avaliadas em tempo de execução. Referência: Open Policy Agent (OPA), projeto da CNCF graduado em 2021. Mudança de regra organizacional sem tocar cada componente.
- **Os três juntos:** quando um estudo dá problema, o acoplamento fraco impede a propagação, as interfaces impedem dependência de detalhe interno que mude, e a política garante que ninguém ultrapasse limites. Resultado: modularidade, segurança e escalabilidade.
- **Compartilhado versus específico:** gateway, embeddings, modelos, observabilidade e orquestração tendem a ser comuns; documentos, protocolos clínicos, configurações e certas políticas regulatórias de um estudo permanecem específicos. Nem tudo compartilhado, nem tudo isolado. No canvas, o Semantic Cache do Trial Forge é *por estudo*, nunca compartilhado.
- **Portão de entrada para novo consumidor (slides e canvas):** como na Uber, em que um time de segurança aprova cada caso de uso antes de liberar o acesso, na Vitalis Platform cada novo estudo passa por revisão antes de herdar a infraestrutura; no canvas, quem aprova é o especialista regulatório que já opera o gate do estudo, e o que se revisa inclui idioma e protocolo regulatório (outro idioma exigiria recalibrar limiares antes de herdar embedding e banco de cláusulas).

### Onde aplicar
- Mapear sua plataforma de IA pelos quatro componentes e responder, para cada princípio, sim ou não: um 'não' é seu ponto mais frágil, não o próximo recurso a adicionar.
- Centralizar chaves, custo e política de modelos num gateway em vez de cada produto falar direto com cada provedor.
- Montar um golden set e uma tolerância antes de promover qualquer versão de modelo ou mudar prompt/contexto.
- Antes de aceitar um décimo consumidor novo, descrever o que quebraria primeiro sem mudança de arquitetura.

### Vantagens e limites
**Vantagens**
- Reaproveitar serviços corta custo e manutenção e evita dezenas de variantes do mesmo componente.
- Eval Gate detecta regressões de modelo e de configuração antes dos usuários.
- Políticas centrais simplificam governança.

**Limites**
- Compartilhar cria dependência comum: precisa de contratos e portão de entrada.
- O canary avisa depois, com tráfego real; só o Eval Gate avisa antes (e depende da qualidade do golden set).
- A métrica de groundedness por embedding tem limite conhecido (ver código).

### 🚫 Armadilhas
- Reimplementar embeddings, modelos ou cache em cada estudo.
- Confundir canary de tráfego (como trocar) com validação de qualidade (se deve trocar).
- Deixar regras de acesso e custo espalhadas no código dos agentes.
- Compartilhar tudo, inclusive cache e dados de estudo; ou isolar tudo e perder o ganho.
- Confundir KServe (servir) com Kubeflow (treinar).

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| API Gateway | Entrada única, com cache, limite de taxa e failover entre modelos |
| KServe | Serve modelos em Kubernetes; canary por percentual de tráfego |
| Kubeflow | Pipelines de treino, experimentação e validação |
| Serviços compartilhados | Embedding, modelo, cache: uma vez só para todos |
| Golden set | Perguntas com resposta esperada conhecida, usadas para avaliar candidato |
| Eval Gate | Bloqueia a promoção se a qualidade regredir além da tolerância |
| Loose Coupling | Acoplamento fraco entre consumidores |
| Clear Interfaces | Contratos explícitos sem vazar implementação |
| Policy-Driven Control | Política central avaliada em runtime (ex.: OPA) |

---

## 💻 No código do repo

**Projeto:** [modulo-05-arquitetura-enterprise (canvas do stack e Eval Gate)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-05-arquitetura-enterprise)

O canvas do stack enterprise e o protótipo `model-eval-gate-prototype.js`: um Eval Gate real contra o Ollama, com golden set de três perguntas e dois cenários (candidato real e candidato regredido por bug de configuração).

**Fluxo**
1. `enterprise-stack-canvas.md`: tabela dos quatro componentes (a coluna Trial Forge diz Kubernetes/KServe para orquestração), checklist dos três princípios (se alguma resposta for 'não', é o ponto mais frágil), mapa compartilhado versus específico no padrão Uber, portão de entrada para novo consumidor e a seção 5 sobre o Eval Gate.
2. `model-eval-gate-prototype.js`: `GOLDEN_SET` com três perguntas (assentimento de menores, direito de retirada, critério de idade mínima), cada uma com a cláusula esperada *já fixada* (não é busca RAG, mede se o modelo, com o contexto certo, responde de forma fiel).
3. `avaliarCandidato(modelo, goldenSet)`: gera a resposta, calcula o embedding da resposta e da cláusula esperada e usa a similaridade de cosseno como score (a groundedness g(pergunta, resposta) do FrugalGPT); o score do modelo é a média.
4. `main()`: baseline `gemma4:e2b` contra o candidato `gemma4:e2b-mlx` (cenário 1, caso limite entre dois modelos reais) e depois o mesmo baseline *sem a cláusula no contexto* (`gerarRespostaSemContexto`, cenário 2, simula perda de contexto por bug de RAG/config). Promove se `diferenca >= -TOLERANCIA_REGRESSAO` com tolerância de 0,02, justificada como a ponta rígida da faixa 'Balanceado' do Model Router da Azure (1-2%) para um contexto farmacêutico.
5. `model_eval_gate_prototype.py` espelha o protótipo.

**Como rodar**
- `ollama pull nomic-embed-text && ollama pull gemma4:e2b && ollama pull gemma4:e2b-mlx`, `cd modulo-05-arquitetura-enterprise`, `npm install` e `node model-eval-gate-prototype.js`.
- Para o seu sistema, responda a seção 5 do canvas: golden set, tolerância e o que aconteceria hoje se um candidato regredido fosse promovido sem esse gate.

**Armadilhas e achados no código**
- A variante `gemma4:e2b-mlx` não está nos pré-requisitos do README do repositório (que citam `gemma4:e2b`, `gemma4` e `nomic-embed-text`), e o próprio código associa MLX a Mac com Apple Silicon; fora desse ambiente, não verifiquei se o modelo está disponível.
- O cenário 1 é, nas palavras do código, um caso limite que 'pode mudar entre execuções por variância do próprio modelo': a decisão do gate deve ser lida, não memorizada.
- O script só imprime a decisão: não usa `assert` e só define `exitCode = 1` em erro técnico; uma decisão BLOQUEIA sai com código 0, então não serve como etapa de CI como está (`main` retorna os scores e as booleanas de promoção).
- O canvas registra um limite conhecido da métrica: o score por embedding não distingue 'citou bem com contexto' de 'só ecoou a cláusula', e testes mostram que os dois modelos reproduzem 61% a 100% da cláusula em sequência idêntica; um classificador anti-eco foi descartado porque, nesse domínio, citar quase literal é o comportamento correto.
- A diferença de tolerância é absoluta nas médias de cosseno (0,02), não um percentual relativo, apesar do comentário falar em 'fração'.
- O texto da aula chama o gateway de 'LightLLM'; os slides, o canvas e as indicações de leitura escrevem LiteLLM (o projeto real).

---

## 🔗 Para ir além
- [Repositório oficial do módulo 08 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia)
- [Pasta do módulo 5 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo08-arquitetura-de-sistemas-com-ia/modulo-05-arquitetura-enterprise)
- [LiteLLM (GitHub)](https://github.com/BerriAI/litellm)
- [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/)
- [Kong AI Gateway](https://developer.konghq.com/index/ai-gateway/)
- [Uber: GenAI Gateway](https://www.uber.com/us/en/blog/genai-gateway/)
- [KServe (CNCF)](https://www.cncf.io/projects/kserve/)
- [Open Policy Agent (graduação na CNCF)](https://www.cncf.io/announcements/2021/02/04/cloud-native-computing-foundation-announces-open-policy-agent-graduation/)
- [Stevens, Myers, Constantine: Structured Design (1974)](https://dl.acm.org/doi/10.1147/sj.132.0115)
- [Newman: Building Microservices (2ª ed.)](https://www.oreilly.com/library/view/building-microservices-2nd/9781492034018/)
- [Erl: SOA, Principles of Service Design](https://www.informit.com/store/soa-principles-of-service-design-9780132344821)

---

⬅️ [11 · O gateway integrado: a ordem dos padrões importa](./11-gateway-integrado.md)  ·  [13 · Observabilidade de IA em escala e implantação híbrida: Kubernetes, Serverless e Edge](./13-observabilidade-e-implantacao-hibrida.md) ➡️
