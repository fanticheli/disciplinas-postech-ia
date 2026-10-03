# 12 · Danger: regras de conformidade no pipeline (JS, Python e repositório demo)

> **Unidade 8 · Aula 2** · Leitura: ~8 min · Bloco: Governança e automação (Unidades 8 e 9)

## 🎯 Em uma frase
O **Danger** executa regras de governança em cada Pull Request: Jira obrigatório, dois aprovadores em caminhos críticos, aviso de PR grande e de queda de cobertura. A IA gera o **dangerfile**, a curadoria separa regra bloqueante (**fail**) de aviso (**warn**) e tira a configuração de dentro do código.

---

## 👵 Explicando para a vovó

Pense no fiscal do condomínio que confere o formulário de reforma antes de a obra começar: tem o número do protocolo? A obra mexe na estrutura e precisa de duas assinaturas? Se faltar algo, a obra não começa. Se for só uma observação, anota e deixa seguir.

O Danger é esse fiscal automático do Pull Request. Cada regra é uma linha da conferência; *fail* é «não passa» e *warn* é «passa, mas olhe isto».

---

## 🔧 Tecnicamente

### O que é
- **Danger.js:** roda durante a análise do PR e permite escrever regras em JavaScript: card do Jira no título ou na descrição, descrição suficiente, arquivos sensíveis, limite de linhas. Posiciona a verificação onde ela é mais barata.
- **As quatro regras do estudo de caso:** (1) todo PR cita o card do Jira no título ou na descrição; (2) alterações em componentes de integração com GPS exigem pelo menos duas aprovações; (3) queda de cobertura acima de um limite gera aviso; (4) PR acima de um limite de linhas gera aviso. As duas primeiras bloqueiam; as outras só avisam.
- **Honestidade sobre limites:** ao gerar o arquivo, a IA informou que não calcula cobertura: o script só lê relatórios gerados pelo CI. Explicitar o que o código espera receber aumenta a confiabilidade.
- **Curadoria da regra de GPS:** a primeira versão identificava arquivos críticos pela substring «gps» no caminho. Arquivos de teste podem conter a palavra sem ser sensíveis, e renomear a pasta desligaria a regra silenciosamente. A segunda versão separa a lógica da configuração e lê os caminhos de um arquivo externo.
- **Independência de linguagem:** a mesma lógica é apresentada em Python. O importante é transformar políticas em verificações automáticas no pipeline, não a tecnologia.
- **Cobrança da regra de ouro (slides):** comece com warn e migre para fail quando o time internalizou a regra; uma regra que falha em 30% dos PRs é desligada em uma semana.

### Como funciona
- **Seis regras no repositório demo:** Jira (fail), aprovadores em caminhos críticos (fail), arquivos sensíveis como `.env` (fail), tamanho do PR acima de 500 linhas (warn), cobertura com queda acima de 5 pontos (warn) e descrição curta (warn).
- **Dois workflows por segurança com forks:** PR de fork roda com `GITHUB_TOKEN` somente leitura, então postar o comentário no mesmo job falharia com 403. O `ci.yml` (evento `pull_request`) roda os testes e `npx danger ci --text-only`, que avalia e imprime sem postar, e publica o resultado como artefato. O `post-danger-comment.yml` (evento `workflow_run`) baixa o artefato, atualiza ou cria o comentário no PR com um marcador e define o status do commit. O `workflow_run` usa o arquivo da branch padrão e nunca faz checkout do código do PR.
- **Cuidado de implementação:** o texto do artefato deve ser lido dentro do script (`fs.readFileSync`), nunca interpolado em uma expressão do workflow, para não reabrir a vulnerabilidade de «pwn request».
- **Resultado esperado:** o PR mostra o comentário e o status verde ou vermelho; falhas bloqueiam o merge via branch protection, avisos não.

### Onde aplicar
- Copiar `dangerfile.js` e os dois workflows para o seu repositório e ajustar prefixo do Jira, caminhos críticos, número de aprovadores e limites.
- Usar o verificador Python em modo local para demonstrar as regras sem CI, ou em modo CI como alternativa ao Danger.js.
- Revisar o histórico dos checks do Danger a cada mês para a automação não virar teatro.

### Vantagens e limites
**Vantagens**
- Regras aplicadas igualmente a todos os desenvolvedores, sem subjetividade.
- Feedback logo na abertura do PR, quando corrigir custa pouco.
- O modo local em Python permite demo e teste das regras sem token nem CI.

**Limites**
- Regras por substring de caminho são frágeis a renomeações.
- Cobertura exige que o CI gere os relatórios e o de base; o Danger não calcula.
- Fail em excesso gera resistência e desligamento.

### 🚫 Armadilhas
- Tentar postar comentário no mesmo job de um PR de fork e tomar 403.
- Interpolar conteúdo vindo do PR em expressões `${{ }}` do workflow.
- Começar com todas as regras como fail em vez de warn.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Danger.js | Ferramenta que executa regras de PR escritas em JS e comenta no PR |
| fail / warn / message | Bloqueia, avisa ou apenas informa |
| workflow_run | Gatilho que roda após outro workflow, com o token e o arquivo da branch padrão |
| --text-only | Modo do Danger que avalia e imprime sem postar |
| Pwn request | Ataque por PR de fork que abusa de workflows com permissão de escrita |
| Branch protection | Regra do GitHub que impede merge enquanto os checks falharem |

---

## 💻 No código do repo

**Projeto:** [modulo-08-governanca-e-compliance (Danger JS e Python, mocks e guia)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-08-governanca-e-compliance)

Template Danger.js e verificador Python equivalentes (as mesmas 5 regras), dois mocks de PR para rodar sem GitHub, o guia de demo e o output de dangerfile gerado pela IA.

**Fluxo**
1. `danger-config-template.js`: bloco `CONFIG` (prefixo `ROUTEWISE`, caminhos críticos `src/integrations/gps`, `src/services/notifications`, `src/api/routes`, `migrations/`, `.env` e `docker-compose`, 2 aprovadores, 500 linhas, queda de 5 pontos) e 5 regras: Jira (fail), aprovadores (fail ou message), tamanho (warn), cobertura via `coverage/coverage-summary.json` e `base-coverage.json` (warn ou message) e descrição com menos de 30 caracteres (warn).
2. `danger-config-routewise.py`: as mesmas 5 regras com `argparse`. Em `--local` lê um mock JSON (padrão `pr-mock-routewise.json`, ou `--mock`); fora dele usa a API REST do GitHub com `GITHUB_TOKEN`, `GITHUB_REPOSITORY` e `PR_NUMBER`, posta um comentário e sai com código 1 se houver falha.
3. `pr-mock-routewise.json` (ROUTEWISE-42, 2 aprovações, 359 linhas, cobertura 81,4% contra base 83,1%) e `pr-mock-falhas.json` (sem card, 1 aprovação, 635 linhas, cobertura 72,0%, descrição «corrigido»).
4. `guia-demo-danger.md`: três cenários (local que passa, local que falha, PR real com fork do repositório demo) e a explicação dos dois workflows. `output-exemplo-dangerfile-m82.md`: o dangerfile gerado pela IA com 4 regras (Jira, PR grande, 2 aprovações para qualquer caminho com «gps», queda de cobertura lida de `coverage-diff.json`).
5. Submódulo `routewise-danger-demo` (repositório separado, com licença MIT): `src/integrations/gps/tracker-client.js` (conexão, `parsePacket`, registro dos veículos v1), `guard-filter.js` (descarta pacotes de 10 IDs v1), `src/services/notifications/push-service.js` (limite de 80 km/h, push com fallback para o painel web), `src/api/routes/alerts.js` (rotas `GET /api/alerts`, `POST /api/alerts/ingest`, `GET /api/alerts/health`), 2 arquivos de teste Jest, `dangerfile.js` (6 regras), `.github/workflows/ci.yml` e `post-danger-comment.yml`, `PULL_REQUEST_TEMPLATE.md` e `CHANGELOG.md` (release 0.1.0 de 2026-05-18, com BUG-S4-10 como risco aceito e sign-off de Carlos, Priya e jurídico).

**Como rodar**
- Verificador Python (sem dependências em modo local): `python3 danger-config-routewise.py --local` e `python3 danger-config-routewise.py --local --mock pr-mock-falhas.json`.
- Rodei os dois. O primeiro sai com código 0, «Status final: OK» e 2 mensagens informativas. O segundo sai com código 1, «FALHOU», com 2 falhas (Jira e aprovadores) e 3 avisos (PR grande, cobertura e descrição).
- Submódulo: copie `package.json`, `src` e `tests`, rode `npm install` e `npm test`. Rodei: 2 suites e 12 testes passam.
- Para o PR real, faça fork de `unipds-engenharia-de-ia-aplicada/routewise-danger-demo`, abra um PR sem card (deve falhar) e outro com `ROUTEWISE-NN` no título (deve falhar até haver 2 aprovações em arquivo crítico).

**Armadilhas e achados no código**
- A saída documentada no guia diverge da execução real: o guia mostra 3 mensagens informativas no mock que passa e 2 avisos no que falha, mas o script emite 2 informativos e 3 avisos (inclui o aviso de descrição curta). O guia fala também em «quatro regras» violadas no mock de falhas; o script reporta 2 falhas e 3 avisos, ou seja, 5 achados em 5 regras.
- Cobertura do repositório demo: o README diz «cobertura > 80%», mas o Jest reportou 40% (`guard-filter.js` e `alerts.js` com 0%). Os mocks falam em 81,4%.
- `guard-filter.js` lista só 10 IDs (os outros 33 estão «omitidos por brevidade») e o log do `init()` calcula `140 - tamanho da lista`: imprime «130 veículos funcionais», não os 97 da narrativa.
- Não há arquivo de entrada da aplicação: o `express` é dependência e as rotas existem, mas nada as monta; o script `lint` aponta para eslint sem configuração (hipótese: falha).
- O README do demo descreve o CI antigo (o Job 2 posta o comentário), embora o CI atual só avalie e outro workflow poste; o `dangerfile.js` tem 6 regras e limite de 50 caracteres na descrição, enquanto o guia e o template falam em 5 regras e 30 caracteres. A regra de cobertura nunca compara com a base: o CI não gera `coverage/base-coverage.json`.
- No histórico do submódulo, o commit `ee22150` corrigiu a action `danger-js@11.3.1` (Docker em node:14) para 13.0.10, mas o cabeçalho do `danger-config-template.js` continua sugerindo `danger/danger-js@11.3.1`. O CI atual usa `npx danger` com `danger ^11.3.1` do `package.json` (não verifiquei se a versão npm tem o mesmo problema).
- Interpolação em `post-danger-comment.yml`: o comentário do arquivo diz que o conteúdo do artefato nunca entra em `${{ }}`. Vale para o corpo do relatório (`danger-output.txt`, lido com `fs.readFileSync`), mas três valores de metadados lidos do artefato (`pr-number.txt`, `pr-sha.txt` e `danger-exit-code.txt`, via `steps.meta.outputs.pr_number`, `sha` e `exit_code`) são interpolados dentro do código dos dois passos `github-script`, entre aspas simples (por exemplo `Number('${{ steps.meta.outputs.pr_number }}')`). Contexto que reduz o risco: esses três arquivos são regravados no passo «Salvar metadados do PR» do `ci.yml`, logo antes do upload do artefato, a partir do contexto do evento, depois de o código do PR ter rodado. Ainda assim o desenho foge da regra que o próprio arquivo enuncia, e um job que roda código do PR é a origem do artefato. Hipótese minha, não testada no GitHub Actions: passar os valores por `env:` e lê-los com `process.env`, ou validá-los (`/^\d+$/` para o número do PR, 40 hex para o SHA) antes de usar, deixa o workflow coerente com o que ele promete.
- Os passos do guia clonam `SEU_USUARIO/routewise`, mas o repositório se chama `routewise-danger-demo`. O docstring do script Python aponta para `github.com/ahirtonlopes/routewise` (o original que o repositório institucional espelha). O output da IA importa `danger` como ESM, lê `coverage-diff.json` (e não `coverage-summary.json`) e cita um `danger.config.json` que não existe na pasta.

---

## 🔗 Para ir além
- [Pasta do módulo 8 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-08-governanca-e-compliance)
- [Repositório oficial do módulo 07 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos)
- [Danger.js](https://danger.systems/js/)
- [Repositório routewise-danger-demo (submódulo)](https://github.com/unipds-engenharia-de-ia-aplicada/routewise-danger-demo)
- [Relatório 6: IBM, Cost of a Data Breach 2025](https://ibm.com/reports/data-breach)

---

⬅️ [11 · Governança como código e Compliance Checklist dinâmico](./11-governanca-como-codigo-e-compliance-checklist.md)  ·  [Guia de leitura](./README.md)  ·  [13 · NL to Workflow: do Slack ao Jira com parser de linguagem natural](./13-nl-to-workflow-slack-jira.md) ➡️
