# 01 · IaC Copilot: Arquiteto e Auditor com Checkov e OPA

> **Unidade 2 · Aulas 1 a 3** · Leitura: ~8 min · Bloco: Fundamentos e IaC

## 🎯 Em uma frase
No IaC Copilot, o **Arquiteto** traduz requisitos em Terraform e grava o arquivo; o **Auditor** (DevSecOps) roda o **Checkov** (boas práticas de segurança) e o **OPA** (regras de negócio da empresa). Infra pode estar tecnicamente segura e ainda assim violar uma política corporativa.

---

## 👵 Explicando para a vovó

É como uma obra com dois profissionais: o engenheiro desenha e constrói a planta (Arquiteto) e um fiscal confere. O fiscal tem dois manuais: o código de obras da cidade (Checkov, regras gerais de segurança) e o regulamento interno do condomínio (OPA, regras só da sua empresa, como «só construir neste bairro»).

Se o fiscal acha problema, ele não sai quebrando parede: escreve um relatório explicando o que está errado, e a correção é feita na origem, no jeito como o engenheiro trabalha.

---

## 🔧 Tecnicamente

### O que é
- **IaC com Terraform:** descreve recursos de forma declarativa, usa *providers* (AWS, GCP, Azure, Oracle e até ambientes locais) e mantém **state** dos recursos, o que dá rastreabilidade, rollback controlado e base para detectar mudanças. **Pulumi** descreve infra em linguagens de programação (Python, TypeScript), no estilo «CDK». **Ansible** costuma configurar o que o Terraform provisiona (Terraform é a estrutura, Ansible o acabamento).
- **Tradução semântica:** o usuário descreve a necessidade em linguagem natural e o agente a converte em implementação técnica. Só funciona bem porque o módulo 1 deu contexto organizacional (RAG e padrões).
- **Writer Tool:** uma LLM produz texto, mas virar arquivo real exige uma ferramenta. O Python faz a ponte entre agente, ferramentas e sistema operacional.
- **Checkov:** análise estática de IaC que detecta má configuração antes do provisionamento (criptografia em repouso, bloqueio de acesso público, versionamento). Desloca a segurança para o início do ciclo («shift left»).
- **OPA (Open Policy Agent):** transforma regras de negócio em código. Os exemplos da aula: **soberania de dados** (tudo na região definida) e **controle de custo** (limite de tamanho/família de instância), o que também é FinOps. Ficou popular no Kubernetes, mas serve a qualquer validação de política antes de uma ação.
- **Drift detection:** divergência entre o estado real e o código, tipicamente alguém mexendo no console. A IA pode comparar o real com os arquivos Terraform e sinalizar. Isso reforça o argumento da autora a favor de IaC: histórico, previsibilidade e governança.
- **Self-healing assistido:** o ciclo gera, audita, devolve o relatório e corrige. Ainda não é autocorreção em produção, é a fundação para ela.

### Como funciona
- **Dois agentes com papéis distintos:** o Arquiteto («especialista em AWS e Terraform com foco em governança») gera o código e persiste via Writer Tool; o Auditor («engenheiro DevSecOps») revisa tudo com as duas ferramentas. É a revisão por pares automatizada.
- **Pipeline sequencial:** executa o Arquiteto, registra o resultado, transfere ao Auditor, que roda Checkov e depois OPA. Se tudo passa, sai um relatório de conformidade. O CrewAI imprime versões, ids de tarefa e raciocínio, úteis para troubleshooting dos agentes.
- **Demonstração da Aula 2 e 3:** o Arquiteto recebeu uma região diferente da política. O Checkov aprovou, o **OPA reprovou** (soberania de dados). Esse é o recado central: conformidade técnica ≠ conformidade organizacional, e as duas camadas são necessárias.
- **O auditor não corrige sozinho:** ele produz um relatório com a regra violada e a causa. Na aula, a correção foi feita direto na configuração/prompt do Arquiteto, resolvendo a causa para que as próximas gerações já saiam corretas.
- **Resultado final:** sem vulnerabilidades e sem violação de política, o pipeline emite um relatório de conformidade e o artefato segue para as próximas etapas.

### Onde aplicar
- Gate de PR para Terraform: scanner de segurança mais política de negócio (região, tamanho de instância, ingress aberto).
- Copilot interno em que o dev descreve o recurso em linguagem natural e recebe HCL já aderente aos padrões.
- Auditoria periódica de drift entre o console da nuvem e o repositório de IaC.

### Vantagens e limites
**Vantagens**
- Problemas de segurança e política aparecem antes de qualquer recurso existir.
- Regras de negócio viram código versionável e repetível, em vez de PDF.
- Auditor com relatório explicável acelera a correção e a revisão humana.

**Limites**
- Quem gera e quem audita são LLMs: ambos podem errar, e o relatório precisa de leitura humana.
- O OPA só é tão bom quanto as regras escritas, e o Checkov cobre apenas boas práticas conhecidas.
- Cada agente e ferramenta adicionada aumenta o custo de tokens e a superfície de falha.

### 🚫 Armadilhas
- Confiar só no Checkov e esquecer as regras do negócio (região, custo, nomenclatura).
- Consertar o arquivo gerado em vez da origem (prompt/regra), repetindo o erro na próxima execução.
- Esperar que a IA «descubra» a região correta sem que a política esteja no contexto do agente.
- Achar que o laço de correção é automático em qualquer framework: precisa estar desenhado no fluxo.

> 💡 **Dica:** Quando o OPA reprovar, corrija a causa na origem (prompt ou política do agente) e rode de novo: o objetivo é que a próxima geração já nasça conforme.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Terraform | IaC declarativa com providers e state |
| Pulumi | IaC com linguagens de programação (estilo CDK) |
| Ansible | Gerenciamento de configuração do que foi provisionado |
| Writer Tool | Ferramenta que persiste o texto gerado em arquivo real |
| Checkov | Análise estática de IaC para segurança e boas práticas |
| OPA | Open Policy Agent: regras de negócio como código |
| Soberania de dados | Regra de manter recursos numa região específica |
| Drift | Estado real divergente do código (alteração manual no console) |
| Self-healing | Detectar, diagnosticar e corrigir, aqui de forma assistida |

---

## 💻 No código do repo

**Projeto:** [labs/modulo2_iac_copilot.py + tools/file_writer.py + tools/security_scan.py + main.tf](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo06-aiops-engenharia-agentica/labs/modulo2_iac_copilot.py)

Pipeline sequencial de dois agentes: o Arquiteto grava um `main.tf` de um bucket S3 chamado `nexus-apollo-data` em `us-east-1` e o Auditor valida com Checkov (binário real) e OPA (regras simuladas em Python).

**Fluxo**
1. `labs/modulo2_iac_copilot.py`: `architect = get_architect(tools=[write_file])` e `auditor = get_auditor(tools=[run_checkov_scan, validate_opa_policies])`. Duas Tasks: gerar o `main.tf` e auditá-lo («Se houver erro, o arquiteto deve corrigir»), em `Crew(..., process=Process.sequential, verbose=True)`.
2. `tools/file_writer.py` (`write_file`) remove as cercas ````hcl` e ````` do conteúdo e grava em `filename` (padrão `main.tf`), no diretório atual.
3. `tools/security_scan.py` (`run_checkov_scan`) roda `checkov -f <arquivo> --quiet --compact` via `subprocess`; se `FAILED` aparece na saída devolve as falhas, se o binário não existe orienta `pip install checkov`.
4. `validate_opa_policies` não usa Rego: faz checagens de string. Rejeita se não houver `us-east-1` (`SOBERANIA_DADOS`), se aparecer `t3.large` (`COST_CONTROL`) ou `0.0.0.0/0` (`NO_PUBLIC_INGRESS`).
5. `main.tf` (raiz do módulo) parece ser o resultado de uma execução (não verifiquei): provider AWS em `us-east-1`, bucket `nexus-apollo-data` com `acl = "private"`, `versioning` habilitado e criptografia `AES256`.

**Como rodar**
- Na raiz do módulo, com `.env` e o venv ativos: `python3 labs/modulo2_iac_copilot.py` (ou opção 2 do menu).
- O Checkov vem de `checkov<3.0.0` no `requirements.txt`.
- Rode da raiz: `main.tf` é lido e gravado relativo ao diretório atual.

**Armadilhas e achados no código**
- O OPA do repositório é uma função Python, não o OPA real: os slides falam em Rego e «proibido instância maior que t3.medium», mas o código só barra a string literal `t3.large`.
- O «feedback loop» descrito na aula não existe estruturalmente no código lido: a Crew sequencial roda cada Task uma vez e o auditor não tem `allow_delegation`. A frase «o arquiteto deve corrigir» está só no texto da Task (não executei para confirmar).
- O `main.tf` commitado usa `acl` e `versioning` inline, estilo de provider AWS mais antigo; não rodei o Checkov para ver o que ele reporta (hipótese: pode apontar itens como log e public access block).
- O `main.tf` é artefato de execução: a próxima rodada o sobrescreve.

---

## 🔗 Para ir além
- [Terraform](https://www.terraform.io/)
- [Open Policy Agent](https://www.openpolicyagent.org/)
- [Slides do módulo 2](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica/slides)
- [Repositório oficial do módulo (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo06-aiops-engenharia-agentica)

---

⬅️ [00 · Da automação à inteligência agêntica: LLMs, agentes CrewAI, RAG e o Nexus Foundation](./00-ai-for-devops-agents-and-nexus-foundation.md)  ·  [02 · Agentes para Kubernetes: manifestos, reconciliação e Canary](./02-kubernetes-ai-ops-canary-gitops.md) ➡️
