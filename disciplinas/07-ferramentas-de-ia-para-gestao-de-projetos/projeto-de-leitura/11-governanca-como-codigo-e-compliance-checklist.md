# 11 · Governança como código e Compliance Checklist dinâmico

> **Unidade 8 · Aulas 1 e 2** · Leitura: ~7 min · Bloco: Governança e automação (Unidades 8 e 9)

## 🎯 Em uma frase
**Governança como código** transforma políticas em regras executadas pelo pipeline, no momento em que a mudança ainda é barata de corrigir. A IA entra em dois pontos: gerando **checklists específicos do contexto** (não genéricos) e preservando a **rastreabilidade** entre requisito, decisão, código e deploy.

---

## 👵 Explicando para a vovó

Imagine um prédio em que a regra «não deixar a porta corta-fogo aberta» depende de alguém lembrar. Uma hora a pessoa esquece. Agora imagine uma porta que fecha sozinha: a regra deixou de depender da memória.

Governança como código é a porta que fecha sozinha. E o checklist dinâmico é o roteiro de inspeção feito sob medida para o prédio de hoje, em vez de um formulário de 40 itens que ninguém lê.

---

## 🔧 Tecnicamente

### O que é
- **O problema da governança manual:** checklists preenchidos antes do deploy, aprovações em planilha, documentos por e-mail e auditoria meses depois. Qualquer processo que dependa só da memória das pessoas falha sob pressão. As indicações de leitura citam o IBM Cost of a Data Breach 2025: custo médio global de US$ 4,44 milhões por incidente, US$ 3,89 milhões com DevSecOps maduro e US$ 5,02 milhões com baixa automação.
- **Governança como código:** a mesma lógica de infraestrutura como código (Terraform), implantação contínua e Kubernetes aplicada às regras de conformidade. A regra é descrita de forma estruturada e executada a cada Pull Request, mudança de status ou deploy; se não for satisfeita, o fluxo trava. Isso troca controle reativo por preventivo e remove a subjetividade entre revisores.
- **Trilha de auditoria:** poder responder «por que esta funcionalidade existe? que requisito a originou? em que reunião foi decidida? que PR a implementou? quem autorizou o deploy?». Um card do Jira ligado ao requisito, um PR que referencia o card, commit com o ID e o deploy associado ao conjunto aprovado formam uma cadeia contínua.
- **Dois pontos de atuação da IA:** geração de checklists adaptados ao domínio, regulação, arquitetura e maturidade (um sistema financeiro e uma ferramenta interna pedem controles diferentes), e rastreabilidade automática.
- **Quanto mais cedo, mais barato:** a verificação deve rodar na abertura ou atualização do PR, não no deploy. Descobrir lá no fim que um requisito obrigatório faltou desperdiça desenvolvimento, revisão e testes.

### Como funciona
- **O evento do estudo de caso:** o primeiro deploy em produção do módulo de alertas de velocidade, com cerca de 140 veículos monitorados em tempo real. O bug S4-10 mantém 43 veículos com rastreador v1 sem suporte aos alertas; 97 recebem. Esse histórico entra no prompt.
- **Contexto do prompt:** tipo de evento, funcionalidade, sistemas (API de GPS, banco de posições, serviço de notificações push, app móvel, painel web), dados sensíveis (localização de motoristas, LGPD), aprovadores (operacional, técnico e jurídico) e histórico de incidentes.
- **Três categorias de saída:** bloqueadores (impedem o deploy), verificações operacionais (não bloqueiam, mas geram risco) e informativos (registros para auditoria).
- **O que só o contexto produz:** um bloqueador que não existiria em checklist genérico. Como 43 veículos ficam sem alerta, o sistema deve mostrar isso no painel e no app, para evitar um *falso negativo operacional*: o gestor achar que o veículo está dentro do limite quando na verdade nem está monitorado.
- **Outros itens:** base legal LGPD documentada (aditivo, legítimo interesse ou termo de ciência), aprovações operacional e técnica registradas, criptografia em trânsito e em repouso, teste de carga com os 97 veículos suportados, plano de comunicação, monitoramento pós-deploy, rollback com script e feature flag, gestão de segredos e registros (RoPA, notas de release, hash do commit, número da cotação do hardware).
- **Curadoria do checklist:** o gerente conhece o que a IA não sabe. A sinalização visual dos 43 veículos exigiria alterar a interface numa release já fechada; ele pode decidir mitigar por comunicação oficial e nota de release, deixando a sinalização para uma entrega posterior. A IA identifica o risco; o custo-benefício da mitigação é humano.
- **Quanto o checklist deve ter:** o prompt limita a 14 itens (5 + 5 + 4), pois acima disso vira ruído; o slide e a atividade pedem edição para no máximo 10, com 3 ou 4 bloqueadores. Os slides listam cinco problemas a evitar: checklist excessivo, regras restritivas demais (comece com *warn*), rastreabilidade sem quem audite, checklist que não evolui e ausência de sinal de sucesso.

### Onde aplicar
- Gerar um checklist por evento relevante (deploy, mudança de escopo, decisão de arquitetura, fechamento de sprint com bugs críticos) com contexto específico.
- Versionar o template-base do checklist no repositório e acrescentar o contexto de cada evento.
- Apresentar governança ao time pelo benefício a ele (evidência de que seguiu o processo, menos trabalho manual, auditoria sem caça a documentos e onboarding mais curto), não como «conformidade».

### Vantagens e limites
**Vantagens**
- Conformidade deixa de depender de memória e passa a ser verificada de forma consistente.
- Checklists específicos evitam o formulário genérico que ninguém lê.
- A trilha de auditoria reduz o tempo para investigar incidentes e decisões antigas.

**Limites**
- Checklist gerado ainda exige curadoria de quem conhece custo, escopo e arquitetura.
- Automação sem revisão humana periódica vira «conformidade de teatro».
- Regras muito restritivas travam o trabalho e acabam desligadas.

### 🚫 Armadilhas
- Checklist com dezenas de itens: o time marca tudo OK sem ler.
- Criar a trilha automática e ninguém auditá-la (os slides sugerem uma revisão mensal de uns 30 minutos).
- Esperar o deploy para descobrir a não conformidade.

> 💡 **Dica:** Se houver dado pessoal, o prompt exige um bloqueador de consentimento e um informativo de registro de tratamento.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| Governança como código | Regras de conformidade executadas automaticamente no pipeline |
| Trilha de auditoria | Cadeia ligando requisito, decisão, PR, commit e deploy |
| Bloqueador | Item que impede o evento se não estiver OK |
| LGPD | Lei 13.709/2018, citada no input do caso por dados de localização de motoristas |
| Falso negativo operacional | Ausência de alerta lida como segurança, quando o veículo nem é monitorado |
| RoPA | Registro das operações de tratamento de dados (Art. 37 da LGPD, no output) |

---

## 💻 No código do repo

**Projeto:** [modulo-08-governanca-e-compliance (prompt de compliance e output)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-08-governanca-e-compliance)

O `compliance-checklist-prompt.md` é um template com tipo de evento, contexto e restrições, acompanhado de um exemplo (primeira release do módulo de alertas) e de notas de design. O output de referência foi gerado com temperatura 0,3.

**Fluxo**
1. `compliance-checklist-prompt.md`: tipos de evento (deploy da primeira release, deploy incremental, mudança de escopo, decisão de arquitetura, encerramento de sprint com bugs críticos, outro), campos de contexto e o formato de saída: **bloqueadores** (máximo 5, com categoria e critério de «passou»), **verificações operacionais** (máximo 5) e **informativos** (máximo 4). Restrições: nada genérico, critério objetivo e verificável, limite total de 14 itens e, se houver LGPD, um bloqueador de consentimento e um informativo de registro.
2. O arquivo traz também o resumo do output esperado: 13 itens (5 bloqueadores, 4 operacionais e 4 informativos) e as notas de design (por que três categorias, por que 14 itens, por que LGPD é bloqueador).
3. `output-exemplo-compliance-m82.md`: o checklist completo com critérios de «passou», incluindo a tag «Monitoramento Indisponível (Hardware v1)» para os 43 veículos, TLS 1.2+ e criptografia em repouso, push em menos de 3 segundos para os 97 veículos suportados, rollback com feature flag e gestão de segredos via cofre.
4. `Atividade - Módulo 8.pdf` e `Exemplo - Módulo 8.pdf`: checklist de no máximo 10 itens com bloqueadores e verificações e um argumento de adesão para o time. O exemplo parte de um deploy com Carlos, Priya e o jurídico como aprovadores.

**Como rodar**
- Cole o bloco do template no AI Studio, preencha o tipo de evento e o contexto (ou use o exemplo da primeira release de alertas) e rode com temperatura 0,3.
- Edite o resultado para o seu time: a atividade pede no máximo 10 itens e separação clara entre bloqueadores e verificações.

**Armadilhas e achados no código**
- O prompt permite 14 itens e o output tem 13, mas a atividade e os slides pedem no máximo 10.
- O output fixa limiares que não vieram do input: push em menos de 3 segundos, taxa de falha de push acima de 5% e TLS 1.2+. É o mesmo risco de «especificação inventada» do módulo 1, aplicado a checklist (observação minha): esses números são sugestões a validar.
- As notas de design afirmam que dados de localização de trabalhadores são «dados pessoais sensíveis». Conhecimento externo, não verificado nas fontes do curso: pela definição de dado pessoal sensível da LGPD (art. 5º, II), localização não consta da lista; trate a afirmação como ponto a confirmar com o jurídico.
- O aprovador técnico é Marcus no prompt e no output, e Priya no exemplo resolvido em PDF.

---

## 🔗 Para ir além
- [Pasta do módulo 8 no GitHub](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos/modulo-08-governanca-e-compliance)
- [Repositório oficial do módulo 07 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo07-ferramentas-de-ia-para-gestao-de-projetos)
- [Relatório 6: IBM, Cost of a Data Breach 2025](https://ibm.com/reports/data-breach)
- Indicação 11: The DevOps Handbook (Kim et al.), sem URL na fonte

---

⬅️ [10 · Status Reports: os mesmos dados em três audiências](./10-status-reports-tres-audiencias.md)  ·  [Guia de leitura](./README.md)  ·  [12 · Danger: regras de conformidade no pipeline (JS, Python e repositório demo)](./12-danger-regras-de-conformidade-no-pipeline.md) ➡️
