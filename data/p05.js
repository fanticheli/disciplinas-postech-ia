PRACTICE.push({
 "disc": "05",
 "intro": "Aqui a IA entra como colega de UX e UI: refina requisito, escreve microcopy, gera componentes com tokens e a11y, escreve specs e testes, e orquestra agentes em paralelo. Cada cartão mostra a técnica aplicada a um problema real, com o código do curso como âncora.",
 "items": [
  {
   "id": "P5-01",
   "title": "Prompt estruturado de refinamento e fluxo Mermaid",
   "topics": [
    "D5-00"
   ],
   "cenario": "Um squad recebe o requisito «agendar PIX» em três linhas. Sem refinamento, as dúvidas (saldo no agendamento ou na execução? feriado? chave removida?) aparecem no meio do sprint, como retrabalho e bug em produção.",
   "passos": [
    "Escreva o System Prompt com quatro blocos fixos: <b>papel</b>, <b>objetivo</b>, <b>regras</b> e <b>formato de saída</b>.",
    "Cole o requisito bruto como entrada e peça edge cases, estados de interface e riscos, em tabelas.",
    "Leve a saída para a reunião de refinamento: o valor está nas perguntas, não nas respostas da IA.",
    "Peça o fluxo em Mermaid usando só as decisões que o time aprovou.",
    "Salve o <code>.md</code> com o diagrama no repo e itere: regra nova vira edição de uma linha, revisada em PR."
   ],
   "code": {
    "lang": "text",
    "src": "# PAPEL\nAnalista de requisitos sênior em produtos bancários.\n\n# OBJETIVO\nExpandir o requisito abaixo em edge cases, estados de interface e riscos.\n\n# REGRAS\n1. Liste perguntas em aberto antes de qualquer sugestão.\n2. Separe regra de negócio de decisão de UX.\n3. Não invente limites numéricos; marque como \"a definir\".\n\n# FORMATO DE SAÍDA\nMarkdown com três tabelas: edge cases, estados de UI, riscos.\nDepois, um bloco mermaid flowchart TD do fluxo principal.\n\n# REQUISITO\nAgendar PIX: contato, valor, data, confirmação, comprovante.\nLimite diário. Sem agendamento para o mesmo dia. Cancelável."
   },
   "resultado": "Dúvidas de regra aparecem antes do código e o fluxo vira artefato versionado e revisável, em vez de um desenho solto no Figma ou no quadro.",
   "quandoNao": [
    "Ajuste trivial de copy ou de cor, onde o requisito já é inequívoco.",
    "Requisito que ainda não passou por conversa com o PO: a IA vai preencher lacunas com suposição.",
    "Quando o time trata o diagrama gerado como verdade sem validar."
   ],
   "armadilha": "Tratar o diagrama como verdade só porque ele renderizou: a validação continua sendo do time.",
   "repo": {
    "label": "modulo-01/prompts e report (refinamento PIX)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01"
   }
  },
  {
   "id": "P5-02",
   "title": "UX Writing como JSON com lint de tom",
   "topics": [
    "D5-01"
   ],
   "cenario": "Um app bancário tem mensagens de erro escritas por cada dev: «Dado inválido», «Erro do usuário», sem próximo passo. Isso culpa o cliente, vira ticket de suporte e deixa o vocabulário inconsistente (Envio, Transferência, Reserva).",
   "passos": [
    "Defina um System Prompt de UX Writer com tom sem culpa, resolutivo e glossário técnico (Transferência, Agendamento, Chave Pix).",
    "Exija saída JSON por código de erro, com <code>title</code> (até 40 caracteres), <code>message</code> (até 140) e <code>action_label</code> no imperativo.",
    "Valide a saída da IA com um lint determinístico antes de commitar o <code>pt-BR.json</code> (o trecho ao lado).",
    "Rode o lint no CI: mensagem nova que culpa o usuário ou estoura o limite quebra o build.",
    "Troque o System Prompt ao mudar de tarefa; não reaproveite o chat do UX Writer para outra coisa."
   ],
   "code": {
    "lang": "ts",
    "src": "interface UxMessage {\n  title: string;\n  message: string;\n  action_label: string;\n}\n\nconst forbiddenPhrases = ['erro do usuário', 'dado inválido', 'você esqueceu'];\n\nexport function lintMessages(messages: Record<string, UxMessage>): string[] {\n  const problems: string[] = [];\n  for (const [key, entry] of Object.entries(messages)) {\n    if (entry.title.length > 40) problems.push(key + ': title above 40 chars');\n    if (entry.message.length > 140) problems.push(key + ': message above 140 chars');\n    if (!entry.action_label.trim()) problems.push(key + ': missing action_label');\n    const text = (entry.title + ' ' + entry.message).toLowerCase();\n    for (const phrase of forbiddenPhrases) {\n      if (text.includes(phrase)) problems.push(key + ': blames the user (' + phrase + ')');\n    }\n  }\n  return problems;\n}"
   },
   "resultado": "Mensagens consistentes e sem culpa, com tom garantido por regra automática e não por revisão manual; o JSON alimenta i18n direto.",
   "quandoNao": [
    "Produto interno de baixo volume, onde mensagem de erro não é ponto de atrito.",
    "Quando já existe design system de conteúdo com ferramenta de lint própria.",
    "Textos legais ou regulatórios: redação e revisão jurídica, não geração."
   ],
   "armadilha": "Mensagem que culpa o usuário («dado inválido») ou erro sem próximo passo: beco sem saída.",
   "repo": {
    "label": "modulo-01/prompts/ux-writing-system.md",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01/prompts"
   }
  },
  {
   "id": "P5-03",
   "title": "Sanitização de feedback: PII fora, contexto técnico dentro",
   "topics": [
    "D5-01"
   ],
   "cenario": "O time de produto exporta 500 feedbacks de loja com CPF, e-mail e telefone no texto, além de mensagens de bot e tickets de teste. Mandar isso cru para uma LLM é risco de LGPD; limpar com regex agressivo apaga o modelo do aparelho e o passo do fluxo que explicam o bug.",
   "passos": [
    "Rode uma passada determinística de regex para PII óbvia (CPF, e-mail, telefone) antes de qualquer chamada ao modelo.",
    "Use um System Prompt de engenheiro de dados com viés LGPD para o que a regex não pega: nomes de terceiros e contexto livre.",
    "Instrua o modelo a descartar ruído (bots, tickets de teste, queixa de atendimento físico) e a manter bug, aparelho e fluxo intactos.",
    "Substitua <code>author</code> por ID anonimizado (<code>user_1</code>) e peça só um array JSON como saída.",
    "Amostre a saída: confira que nenhum PII sobrou e que nenhum detalhe técnico sumiu."
   ],
   "code": {
    "lang": "ts",
    "src": "const patterns: Array<[RegExp, string]> = [\n  [/\\b\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}\\b/g, '[REDACTED]'],\n  [/[\\w.+-]+@[\\w-]+\\.[\\w.]+/g, '[REDACTED]'],\n  [/\\(?\\b\\d{2}\\)?\\s?9?\\d{4}-?\\d{4}\\b/g, '[REDACTED]'],\n];\n\nexport function redactPii(text: string): string {\n  return patterns.reduce((acc, [pattern, mask]) => acc.replace(pattern, mask), text);\n}\n\nexport function anonymizeAuthors<T extends { author: string }>(rows: T[]) {\n  const ids = new Map<string, string>();\n  return rows.map((row) => {\n    if (!ids.has(row.author)) ids.set(row.author, 'user_' + (ids.size + 1));\n    return { ...row, author: ids.get(row.author) as string };\n  });\n}"
   },
   "resultado": "Dataset pronto para análise sem PII e sem perder o contexto que gera backlog útil; a regex baixa o risco e o custo antes da LLM.",
   "quandoNao": [
    "Dataset já anonimizado na origem.",
    "Quando exige-se garantia formal de LGPD: regex mais LLM não substitui ferramenta de DLP e revisão do DPO.",
    "Volume minúsculo, onde revisão manual é mais barata."
   ],
   "armadilha": "Remover PII apagando também o contexto técnico que torna o feedback útil.",
   "repo": {
    "label": "modulo-01/data e prompts/data-sanitizer.md",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01"
   }
  },
  {
   "id": "P5-04",
   "title": "Prompt as Code: do feedback ao backlog em JSON",
   "topics": [
    "D5-02"
   ],
   "cenario": "Os melhores prompts do time vivem no histórico de cada ferramenta de cada dev. Ninguém acha, ninguém revisa e o resultado muda de pessoa para pessoa. Enquanto isso, o feedback dos usuários não vira ticket com severidade e ação.",
   "passos": [
    "Crie uma pasta <code>prompts/</code> com um arquivo por tarefa: <code>insights-distiller.md</code>, <code>readme-generator.md</code>, etc.",
    "Em cada arquivo, fixe papel, regras e formato de saída; para o backlog, exija JSON com categoria, severidade, dor e ação proposta.",
    "Carregue o prompt do arquivo em código (o trecho ao lado) e valide o JSON devolvido antes de usar.",
    "Versione no Git: mudança de prompt passa por PR, como mudança de código.",
    "Para README gerado, exija «apenas o conteúdo do arquivo», sem introdução, e confira nomes de arquivos e fluxo descritos."
   ],
   "code": {
    "lang": "ts",
    "src": "import { readFileSync } from 'node:fs';\nimport { join } from 'node:path';\n\ninterface BacklogTicket {\n  ticket_id: string;\n  category: string;\n  severity: 'ALTA' | 'MEDIA' | 'BAIXA';\n  user_pain: string;\n  proposed_action: string;\n}\n\nexport function loadPrompt(name: string): string {\n  return readFileSync(join(process.cwd(), 'prompts', name + '.md'), 'utf8');\n}\n\nexport function parseBacklog(raw: string): BacklogTicket[] {\n  const data: unknown = JSON.parse(raw);\n  if (!Array.isArray(data)) throw new Error('Backlog must be a JSON array');\n  return data.map((item, index) => {\n    const ticket = item as Partial<BacklogTicket>;\n    const required = [ticket.ticket_id, ticket.category, ticket.severity, ticket.user_pain, ticket.proposed_action]\n    if (required.some((value) => !value)) {\n      throw new Error('Ticket ' + index + ' is missing required fields');\n    }\n    return ticket as BacklogTicket;\n  });\n}"
   },
   "resultado": "Prompts reutilizáveis, auditáveis e com dono; backlog em formato estável que entra direto no Jira ou em planilha.",
   "quandoNao": [
    "Prompt descartável de uso único.",
    "Time de uma pessoa sem reuso: o custo de governança supera o ganho.",
    "Quando o prompt carrega dado sensível: não versione o conteúdo, só o template."
   ],
   "armadilha": "Deixar prompts só no histórico da ferramenta: ninguém encontra, ninguém revisa, não há governança.",
   "repo": {
    "label": "modulo-01/prompts e data/backlog.json",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-01"
   }
  },
  {
   "id": "P5-05",
   "title": "Ambiente AI-first: MCP do Angular e primeira tarefa com escopo",
   "topics": [
    "D5-03"
   ],
   "cenario": "O agente gera componente com API de Angular de três versões atrás e CSS inventado, porque trabalha com documentação desatualizada e sem restrições. O time perde a manhã desfazendo o que ele criou.",
   "passos": [
    "Conecte o MCP do Angular na ferramenta de agente (Antigravity, Cursor, Claude Code ou outra) para ele consultar a documentação oficial (config do Antigravity/Cursor/Claude Code; no <code>.vscode/mcp.json</code> a chave raiz é <code>servers</code>). A flag <code>--read-only</code> restringe o servidor a leitura.",
    "Valide que o agente enxerga o servidor: peça algo que só a doc atual responde.",
    "Dê como primeira tarefa só um <b>esqueleto</b> da aplicação, com stack, rotas e restrições explícitas.",
    "Peça plano antes de aplicar e aprove o plano.",
    "Só depois peça os componentes; cada pedido cita o escopo e proíbe CSS fora dos tokens."
   ],
   "code": {
    "lang": "json",
    "src": "{\n  \"mcpServers\": {\n    \"angular-cli\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@angular/cli\", \"mcp\"]\n    }\n  }\n}"
   },
   "resultado": "Menos código com API obsoleta e menos retrabalho: o agente parte de contexto atualizado e de um esqueleto aprovado.",
   "quandoNao": [
    "Script ou protótipo descartável.",
    "Projeto que já tem a documentação interna indexada no agente.",
    "Ambientes sem permissão para rodar servidores MCP locais."
   ],
   "armadilha": "Pedir código antes de preparar o ambiente e não restringir o escopo.",
   "repo": {
    "label": "modulo-02/pix-app (briefing e prompts)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app"
   }
  },
  {
   "id": "P5-06",
   "title": "Design tokens semânticos consumidos pelo agente",
   "topics": [
    "D5-04"
   ],
   "cenario": "Cada tela gerada pelo agente traz um azul ligeiramente diferente e espaçamentos soltos (13px, 17px). Trocar a identidade visual ou ligar o modo escuro vira caça a valores espalhados por dezenas de arquivos.",
   "passos": [
    "Dê ao agente o briefing de branding e peça só CSS puro com Custom Properties em <code>:root</code>.",
    "Exija nomes por função (<code>--color-primary</code>, <code>--color-action</code>), nunca por cor (<code>--azul</code>).",
    "Defina escala de espaçamento em múltiplos de 4px e as famílias tipográficas.",
    "Sobrescreva só os tokens de tema dentro de <code>prefers-color-scheme: dark</code>.",
    "Em todo prompt de componente, referencie o <code>styles.css</code> e proíba hexadecimal ou px absolutos no CSS do componente."
   ],
   "code": {
    "lang": "text",
    "src": ":root {\n  --color-primary: #0A192F;\n  --color-action: #64FFDA;\n  --color-error: #FF6B6B;\n  --color-background: #F8F9FA;\n  --color-text: #0A192F;\n  --font-heading: 'Montserrat', sans-serif;\n  --font-body: 'Inter', sans-serif;\n  --spacing-small: 8px;\n  --spacing-medium: 16px;\n  --spacing-large: 24px;\n  --spacing-extra-large: 32px;\n}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n    --color-background: #112240;\n    --color-text: #F8F9FA;\n  }\n}"
   },
   "resultado": "Mudança de marca ou de tema vira edição de um arquivo; o visual dos componentes gerados fica consistente entre sessões e agentes.",
   "quandoNao": [
    "Protótipo de uma tela que será descartado.",
    "Projeto que já usa design system com tokens publicados (consuma os existentes).",
    "Valor realmente único e pontual (um ícone específico): não tokenize tudo."
   ],
   "armadilha": "Aceitar cor hexadecimal, estilo inline ou valor duplicado só porque «ficou igual».",
   "repo": {
    "label": "modulo-02/pix-app/src/styles.css",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app/src"
   }
  },
  {
   "id": "P5-07",
   "title": "Componente acessível desde o nascimento (ARIA, foco, ESC)",
   "topics": [
    "D5-04"
   ],
   "cenario": "Um modal de erro gerado sem acessibilidade não anuncia o título para leitor de tela, não leva o foco ao botão e não fecha no ESC. Descobrir isso na auditoria custa mais do que pedir certo na geração.",
   "passos": [
    "No prompt do componente, exija papel sênior em A11y e marcações WAI-ARIA (<code>role</code>, <code>aria-modal</code>, <code>aria-labelledby</code>).",
    "Exija teclado: foco inicial no botão de fechar e fechamento por ESC.",
    "Receba estado por <code>input()</code>/<code>output()</code> (Signals) e estilize só com <code>var(--token)</code>.",
    "Teste na prática: navegue só com teclado e com um leitor de tela; o alerta do language service não basta.",
    "O trecho é uma versão simplificada do <code>error-modal</code> do repo (template inline e sem CSS); o repo usa arquivos separados."
   ],
   "code": {
    "lang": "ts",
    "src": "import {\n  AfterViewInit,\n  Component,\n  ElementRef,\n  HostListener,\n  ViewChild,\n  input,\n  output,\n} from '@angular/core';\n\n@Component({\n  selector: 'app-error-modal',\n  standalone: true,\n  template: `\n    <div class=\"modal-backdrop\" (click)=\"close.emit()\"></div>\n    <div\n      class=\"modal-dialog\"\n      role=\"alertdialog\"\n      aria-modal=\"true\"\n      aria-labelledby=\"error-modal-title\"\n      aria-describedby=\"error-modal-message\"\n    >\n      <h2 id=\"error-modal-title\">{{ title() }}</h2>\n      <button #closeBtn aria-label=\"Fechar\" (click)=\"close.emit()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n      <p id=\"error-modal-message\">{{ message() }}</p>\n    </div>\n  `,\n})\nexport class ErrorModal implements AfterViewInit {\n  title = input.required<string>();\n  message = input.required<string>();\n  close = output<void>();\n\n  @ViewChild('closeBtn') closeBtn?: ElementRef<HTMLButtonElement>;\n\n  @HostListener('document:keydown.escape')\n  onEscape() {\n    this.close.emit();\n  }\n\n  ngAfterViewInit() {\n    this.closeBtn?.nativeElement.focus();\n  }\n}"
   },
   "resultado": "O componente já nasce operável por teclado e leitor de tela, e a correção tardia de a11y deixa de ser um item de backlog.",
   "quandoNao": [
    "Elemento puramente decorativo, sem interação.",
    "Quando um componente de biblioteca (Angular CDK, por exemplo) já resolve foco e ARIA: prefira reutilizar.",
    "Protótipo de validação visual descartável."
   ],
   "armadilha": "Achar que ARIA «não faz diferença» porque a tela não muda.",
   "repo": {
    "label": "modulo-02/pix-app/src/app/components/error-modal",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app/src/app/components/error-modal"
   }
  },
  {
   "id": "P5-08",
   "title": "Da referência (Stitch/Figma) ao standalone component com tokens",
   "topics": [
    "D5-05"
   ],
   "cenario": "O designer entrega uma tela no Stitch ou no Figma. Colar o HTML exportado no projeto traz Tailwind, ícones e uma paleta que não são os do produto; o resultado parece certo na tela e é impossível de manter.",
   "passos": [
    "Exporte a referência (HTML/CSS do Stitch ou especificações do Figma) como <b>insumo</b>, não como código final.",
    "Peça refatoração para standalone component Angular com dados via <code>input()</code> (Signals).",
    "Leia o <code>styles.css</code> no prompt e proíba hexadecimais: troque os estilos do Stitch pelos tokens do projeto.",
    "Mantenha só o layout e a hierarquia da referência; ignore bibliotecas e ícones externos.",
    "Revise o que o agente esqueceu: import de biblioteca, rota, link de menu."
   ],
   "code": {
    "lang": "text",
    "src": "# PAPEL\nEngenheiro Front-end sênior em Angular e Design Systems.\n\n# OBJETIVO\nRefatorar o HTML/CSS exportado do Stitch para um\nStandalone Component chamado PixReceiptComponent.\n\n# DIRETRIZES\n1. Receba valor e nome via input() (Signals).\n2. PROIBIDO cor hexadecimal. Leia @src/styles.css e use\n   var(--color-primary) e demais tokens existentes.\n3. Mantenha o card centralizado no desktop.\n4. Não adicione Tailwind nem biblioteca de ícones.\n\n# SAÍDA\nArquivos .ts, .html e .css do componente."
   },
   "resultado": "A tela chega no padrão do produto na primeira iteração, sem dependências estranhas, e o handoff deixa de ser retrabalho manual.",
   "quandoNao": [
    "Projeto novo sem design system, onde o Stitch pode ser o ponto de partida do visual.",
    "Tela única e descartável.",
    "Quando o time tem design system forte e o Figma já mapeia componentes (use o MCP e os componentes existentes)."
   ],
   "armadilha": "Colar o HTML do Stitch no projeto e seguir adiante com Tailwind, ícones e paleta alheios.",
   "repo": {
    "label": "modulo-02/pix-app/prompts (stitch e figma)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app/prompts"
   }
  },
  {
   "id": "P5-09",
   "title": "Revisão de UI: contraste, responsividade e correção pontual",
   "topics": [
    "D5-06"
   ],
   "cenario": "A tela gerada compila, mas o texto cinza sobre fundo claro reprova no contraste e o card quebra no celular. O time pede «use uma cor mais clara» e o agente inventa um novo valor fora do design system.",
   "passos": [
    "Valide a tela em desktop, tablet e mobile antes de aceitar.",
    "Meça o contraste de verdade (razão WCAG: mínimo 4,5:1 para texto normal) em vez de olhar a olho.",
    "Aponte ao agente o <b>token</b> específico e o elemento: «no card X, troque o texto para <code>var(--color-text)</code>».",
    "Procure no CSS gerado valores fixos e verifique se já existe token equivalente.",
    "Faça a correção de forma pontual e reveja o diff antes de seguir."
   ],
   "code": {
    "lang": "ts",
    "src": "function channel(value: number): number {\n  const normalized = value / 255;\n  return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);\n}\n\nfunction luminance(hex: string): number {\n  const [red, green, blue] = [1, 3, 5].map((start) =>\n    channel(parseInt(hex.slice(start, start + 2), 16)),\n  );\n  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;\n}\n\nexport function contrastRatio(foreground: string, background: string): number {\n  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);\n  return (lighter + 0.05) / (darker + 0.05);\n}\n\nexport function passesAa(foreground: string, background: string): boolean {\n  return contrastRatio(foreground, background) >= 4.5;\n}"
   },
   "resultado": "Contraste e responsividade passam a ser critério verificável, e as correções reaproveitam tokens em vez de gerar cores novas a cada rodada.",
   "quandoNao": [
    "Elementos puramente decorativos, isentos de contraste mínimo.",
    "Quando já há ferramenta automatizada (Lighthouse, axe) no CI cobrindo isso.",
    "Ajuste de pixel fino que o designer valida direto no Figma."
   ],
   "armadilha": "Achar que o agente gerou, portanto terminou.",
   "repo": {
    "label": "modulo-02/pix-app/prompts/correcao_css.md",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-02/pix-app/prompts"
   }
  },
  {
   "id": "P5-10",
   "title": "Skills + MCP + loop de revisão (live Safer, 28/07)",
   "topics": [
    "D5-16"
   ],
   "cenario": "Uma startup pede uma landing page em um dia. O agente gera algo que compila, mas ninguém verificou como renderiza em três resoluções nem se há falha de segurança; «é só frontend» vira argumento para pular a revisão.",
   "passos": [
    "Instale dependências com versão travada (<code>npm ci</code>) e o navegador de teste (<code>npx -y playwright install chromium</code>).",
    "Prepare o agente com especializações e skills (engineering, ui, cdp, writer) e MCPs (Context7, Magnific); leia o que será instalado antes.",
    "Gere a especialização do framework (<code>react</code>) por prompt e as políticas de segurança a partir do PRD.",
    "Escreva o PRD como prompt de construção: referência visual, stack, MCPs, skills e o <b>loop de revisão</b> como etapa obrigatória.",
    "No loop, compare com a referência em desktop, tablet e mobile (<code>/cdp</code>) e verifique segurança (<code>/lagune</code>); repita até lint e typecheck passarem.",
    "Os nomes exatos de comandos do Lagune vêm da live; confirme no README do repo antes de usar."
   ],
   "code": {
    "lang": "text",
    "src": "# PRD (esqueleto)\nReferência: resources/inspiration.webp\nStack: React + TypeScript + Vite + Tailwind\nMCPs: Context7 (docs atualizadas), Magnific (imagens)\nSkills: /engineering, /ui\n\n# LOOP DE REVISÃO (obrigatório)\n1. /cdp: comparar com a referência em desktop, tablet e mobile\n2. /lagune: verificar segurança das correções\n3. Ajustar e repetir até npm run lint e npm run typecheck passarem"
   },
   "resultado": "A página é verificada visualmente e por segurança antes de ser dada como pronta, e as regras do agente ficam versionadas no repo, não na memória de quem fez.",
   "quandoNao": [
    "Página estática de uma tela sem requisito de segurança nem de fidelidade visual.",
    "Ambiente sem permissão para instalar skills e MCPs de terceiros.",
    "Quando não dá para auditar o que cada skill instalada executa."
   ],
   "armadilha": "Rodar <code>npx -y ...@latest</code> e <code>skills add -y</code> sem fixar versão nem ler o que será instalado: código remoto roda no seu projeto.",
   "repo": {
    "label": "lives/2026-07-28 (Safer)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-07-28"
   }
  },
  {
   "id": "P5-11",
   "title": "Monorepo Nx com shared-types como contrato único",
   "topics": [
    "D5-07"
   ],
   "cenario": "Front Angular e API NestJS declaram cada um a sua versão de <code>EventDTO</code>. Um campo muda de nome no back, o front só descobre em produção, e o agente de código não vê as duas pontas ao mesmo tempo.",
   "passos": [
    "Crie o workspace Nx com <code>frontend</code> (Angular), <code>api</code> (NestJS) e uma biblioteca <code>shared-types</code>.",
    "Declare cada DTO uma única vez na lib e exponha pelo alias <code>@cfp-platform/shared-types</code> no <code>tsconfig.base.json</code>.",
    "Importe o mesmo tipo no controller Nest e no serviço Angular; mudança de contrato quebra a compilação dos dois lados.",
    "Diga ao agente em qual projeto Nx ele deve trabalhar, para não mexer no workspace inteiro.",
    "Lembre: monorepo é organização de código, não arquitetura de deploy."
   ],
   "code": {
    "lang": "ts",
    "src": "export interface EventDTO {\n  id: string;\n  nome: string;\n  endereco: string;\n  capacidade: number;\n  data: string;\n}\n\nexport interface SpeakerDTO {\n  id: string;\n  name: string;\n  email: string;\n  talkTitle: string;\n  isGDE: boolean;\n}\n\nexport type CreateEventPayload = Omit<EventDTO, 'id'>;\n\nexport function isEventDto(value: unknown): value is EventDTO {\n  const candidate = value as Partial<EventDTO>;\n  return typeof candidate?.id === 'string'\n    && typeof candidate.nome === 'string'\n    && typeof candidate.capacidade === 'number';\n}"
   },
   "resultado": "Um contrato só entre front e back: desvio vira erro de compilação, e o agente enxerga o sistema inteiro num workspace.",
   "quandoNao": [
    "Times e deploys totalmente independentes (considere contratos publicados via OpenAPI ou pacote versionado).",
    "Projeto pequeno com um só app.",
    "Repos separados por exigência organizacional."
   ],
   "armadilha": "Colocar contratos duplicados «por enquanto» no front.",
   "repo": {
    "label": "modulo-03/cfp-platform/shared-types",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform/shared-types"
   }
  },
  {
   "id": "P5-12",
   "title": "Spec-Driven Development com OpenSpec",
   "topics": [
    "D5-08"
   ],
   "cenario": "Pedir «faça a submissão de palestras» numa frase gera uma feature com validação inventada, sem acessibilidade e sem o que o PO queria evitar. O time só descobre o desvio no code review.",
   "passos": [
    "Rode o propose do OpenSpec: ele gera <code>proposal</code>, <code>design</code>, <code>tasks</code> e specs.",
    "Escreva requisitos com cenários <b>WHEN/THEN</b>, em linguagem verificável (payload, status HTTP, estado de UI).",
    "Liste explicitamente o que <b>não</b> fazer (non-goals) no <code>design.md</code> (seção <code>## Non-Goals</code>, por exemplo: sem libs de teste com IA, sem testar o dashboard); o arquivo de spec guarda só requisitos e cenários.",
    "Leia e ajuste proposal, design e tasks antes de aprovar; não é só um «ok».",
    "Aplique tarefa por tarefa e arquive a spec ao final."
   ],
   "code": {
    "lang": "text",
    "src": "## ADDED Requirements\n\n### Requirement: Speaker Submission Payload Validation\nThe API MUST enforce strict validation for all speaker submissions.\n\n#### Scenario: Valid Submission\n- WHEN a POST is sent to /api/speakers with name, email,\n  talkTitle and isGDE\n- THEN the server MUST respond 201 Created with the SpeakerDTO\n\n#### Scenario: Missing or Invalid Fields\n- WHEN a required field is missing or email is invalid\n- THEN the server MUST respond 400 Bad Request with\n  structured validation errors"
   },
   "resultado": "O pedido vira requisito revisável e rastreável; o agente executa uma lista de tarefas aprovada e o desvio aparece na spec, não no PR.",
   "quandoNao": [
    "Correção de bug de uma linha.",
    "Exploração e spike descartável.",
    "Time sem disciplina de ler a spec: vira burocracia sem controle."
   ],
   "armadilha": "Prompt de uma frase para uma feature inteira, e aprovar proposal, design e tasks sem ler.",
   "repo": {
    "label": "modulo-03/cfp-platform/openspec",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform/openspec"
   }
  },
  {
   "id": "P5-13",
   "title": "Git worktree: agentes em paralelo, integração e archive",
   "topics": [
    "D5-09"
   ],
   "cenario": "A feature tem API e UI independentes. Dois agentes no mesmo diretório sobrescrevem arquivos um do outro, e a entrega sequencial leva o dobro do tempo.",
   "passos": [
    "Com a spec aprovada, divida as tarefas em frentes independentes (API e UI).",
    "Crie um worktree por frente, cada um com branch própria.",
    "Abra cada worktree em um workspace do agente e atribua só as tarefas daquela frente.",
    "Crie uma branch de integração e faça o merge das duas; para o Git, worktree é branch normal.",
    "Suba front e back e valide o fluxo completo: compilar não é feature pronta.",
    "Arquive a spec, remova worktrees e branches temporárias."
   ],
   "code": {
    "lang": "bash",
    "src": "git worktree add ../cfp-api -b feature/speaker-api\ngit worktree add ../cfp-ui -b feature/speaker-ui\n\ngit switch -c feature/integrate-cfp main\ngit merge feature/speaker-api\ngit merge feature/speaker-ui\n\ngit worktree remove ../cfp-api\ngit worktree remove ../cfp-ui\ngit branch -d feature/speaker-api feature/speaker-ui"
   },
   "resultado": "Duas frentes andam ao mesmo tempo sem colisão de arquivos, e o histórico de integração segue o fluxo Git de sempre.",
   "quandoNao": [
    "Tarefas fortemente acopladas, que tocam os mesmos arquivos.",
    "Feature pequena, onde o custo de integração supera o ganho.",
    "Orçamento de tokens apertado: paralelismo multiplica o gasto."
   ],
   "armadilha": "Dois agentes no mesmo diretório.",
   "repo": {
    "label": "modulo-03/cfp-platform (resultado integrado)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform"
   }
  },
  {
   "id": "P5-14",
   "title": "Agente assíncrono (Jules): tarefa objetiva e PR revisado",
   "topics": [
    "D5-10"
   ],
   "cenario": "O backlog tem dezenas de chores bem definidos (atualizar dependência, cobrir função com teste) que ninguém prioriza. Um agente em nuvem pode fazê-los, mas com permissão ampla e tarefa vaga ele mexe no que não deve.",
   "passos": [
    "Dê acesso a um só repositório, nunca à produção nem a ambientes sensíveis.",
    "Coloque credenciais como secrets, nunca no script de setup da VM.",
    "Escreva a tarefa objetiva: arquivo, comportamento esperado, critério de aceite e o que não tocar.",
    "Deixe o agente subir a VM, clonar, criar branch, rodar testes e abrir o PR.",
    "Revise o PR como o de um colega e rode os testes você mesmo; «os testes passaram» dito pelo agente não é prova."
   ],
   "code": {
    "lang": "text",
    "src": "Tarefa: cobrir calculateDiscount() em src/pricing/discount.ts\n\nEscopo: criar src/pricing/discount.spec.ts. Não alterar discount.ts.\nCenários: sem desconto, desconto percentual, desconto acima de 100%\n(deve lançar erro), valor zero.\nCritério de aceite: npm test passa e a cobertura do arquivo >= 90%.\nFora de escopo: refatorar, atualizar dependências, mexer em CI."
   },
   "resultado": "Chores saem do backlog sem ocupar o dev, com rastro claro (branch e PR) e revisão humana obrigatória.",
   "quandoNao": [
    "Tarefa vaga ou enorme, sem critério de aceite.",
    "Código que exige contexto de negócio que só está na cabeça do time.",
    "Repositório com dados sensíveis ou sem política de acesso para agentes."
   ],
   "armadilha": "Aceitar o PR porque o agente disse que os testes passaram."
  },
  {
   "id": "P5-15",
   "title": "E2E Cypress gerado a partir da spec",
   "topics": [
    "D5-11"
   ],
   "cenario": "A tela de cadastro de eventos não tem teste E2E. Pedir «teste a tela de eventos» ao agente gera algo genérico, preso a classes CSS que mudam a cada refatoração visual.",
   "passos": [
    "Escreva uma spec de testes (change no OpenSpec) com cenário de sucesso e cenário de erro, com os campos e as mensagens esperadas.",
    "Registre a estratégia de seletores no design e os não-objetivos (por exemplo, sem libs de IA).",
    "Peça ao agente o arquivo de teste Cypress tradicional no <code>frontend-e2e</code> do Nx.",
    "Rode a suíte, veja passar e quebre de propósito um seletor para entender a fragilidade.",
    "Prefira <code>data-testid</code>/ids dedicados a classes de estilo; o repo usa <code>#nome</code> e <code>.submit-btn</code> (gancho da aula seguinte); o exemplo ao lado assume que o template ganhou os <code>data-testid</code>."
   ],
   "code": {
    "lang": "ts",
    "src": "describe('Event Registration', () => {\n  beforeEach(() => {\n    cy.visit('/event/new');\n  });\n\n  it('registers a new event', () => {\n    cy.get('[data-testid=\"event-name\"]').type('Tech Conference');\n    cy.get('[data-testid=\"event-address\"]').type('Main Street, 456');\n    cy.get('[data-testid=\"event-capacity\"]').type('200');\n    cy.get('[data-testid=\"event-date\"]').type('2026-06-15');\n    cy.get('[data-testid=\"submit\"]').click();\n    cy.get('[data-testid=\"success\"]').should('be.visible');\n  });\n\n  it('shows required field errors on empty submit', () => {\n    cy.get('[data-testid=\"submit\"]').click();\n    cy.get('[data-testid=\"field-error\"]').should('have.length', 4);\n  });\n});"
   },
   "resultado": "A feature ganha regressão automatizada derivada de uma spec revisada, e a fragilidade dos seletores fica visível e tratada.",
   "quandoNao": [
    "Tela que muda a cada dia e ainda sem estabilidade.",
    "Lógica pura que se cobre melhor com teste unitário.",
    "Projeto sem CI para rodar E2E: o teste apodrece."
   ],
   "armadilha": "Aceitar seletores por classe CSS como se fossem estáveis.",
   "repo": {
    "label": "modulo-04/cfp-platform_v1/frontend-e2e/cypress",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-04/cfp-plataform_v1/cfp-platform_v1/frontend-e2e"
   }
  },
  {
   "id": "P5-16",
   "title": "cy.prompt e self-healing: teste por intenção",
   "topics": [
    "D5-12"
   ],
   "cenario": "Seletores quebram a cada refatoração e o time gasta mais tempo consertando testes do que escrevendo funcionalidades. O <code>cy.prompt</code> descreve a ação em linguagem natural e se adapta, ao custo de lock-in e de depender de um serviço.",
   "passos": [
    "Escolha os fluxos de maior volatilidade de UI como candidatos.",
    "Escreva os passos como lista em inglês numa única chamada <code>cy.prompt([...])</code> para reduzir chamadas ao LLM.",
    "Valide o resultado com asserção explícita de intenção («success message is visible»).",
    "Mantenha o teste tradicional para fluxos críticos e estáveis; compare custo e estabilidade.",
    "Defina critérios de aceite fora do teste: self-healing não decide o que é correto."
   ],
   "code": {
    "lang": "ts",
    "src": "describe('Event registration (AI driven)', () => {\n  it('fills the form and validates success', () => {\n    cy.visit('/event/new');\n\n    cy.prompt([\n      'Type \"Tech Auditorium\" in the event name field',\n      'Type \"Main Street, 456\" in the address field',\n      'Type \"500\" in the capacity field',\n      'Type \"2026-12-31\" in the date field',\n      'Click the button that submits or saves the event',\n    ]);\n\n    cy.prompt(['Verify that a success message is visible']);\n  });\n});"
   },
   "resultado": "Menos quebra por mudança de seletor nos fluxos voláteis, em troca de lock-in no Cypress e de resultado menos determinístico.",
   "quandoNao": [
    "Pipeline de CI com custo e latência sensíveis.",
    "Fluxo crítico que exige determinismo total.",
    "Restrição de enviar dados da aplicação a serviço externo."
   ],
   "armadilha": "Achar que self-healing dispensa critério de aceite.",
   "repo": {
    "label": "modulo-04/.../cypress/e2e/event-registration-ai.cy.ts",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-04/cfp-plataform_v1/cfp-platform_v1/frontend-e2e/cypress/e2e"
   }
  },
  {
   "id": "P5-17",
   "title": "Playwright MCP: agente operando o navegador",
   "topics": [
    "D5-12"
   ],
   "cenario": "Para uma verificação exploratória rápida da tela nova, escrever teste formal é exagero. O Playwright MCP deixa o agente abrir o navegador, clicar e reportar, mas sem escopo ele roda indefinidamente e consome tokens.",
   "passos": [
    "Registre o servidor MCP do Playwright na ferramenta de agente, com a versão fixada (o snippet usa a 0.0.83, a vigente na revisão: confira a atual no npm).",
    "Dê um objetivo com escopo (URL, fluxo) e critérios de sucesso explícitos.",
    "Peça relatório do que viu: passos, resultado e evidência.",
    "Use para exploração e smoke; promova o que for valioso para teste versionado.",
    "Estime o custo: cada interação gasta tokens, e o resultado não é reproduzível como um teste."
   ],
   "code": {
    "lang": "json",
    "src": "{\n  \"mcpServers\": {\n    \"playwright\": {\n      \"command\": \"npx\",\n      \"args\": [\"@playwright/mcp@0.0.83\"]\n    }\n  }\n}"
   },
   "resultado": "Verificação exploratória sem escrever código de teste, com custo de tokens como contrapartida; não há solução universal, há trade-offs.",
   "quandoNao": [
    "Regressão em CI: precisa de teste determinístico e barato.",
    "Objetivo sem escopo nem critério de sucesso.",
    "Fluxo com dados sensíveis expostos ao agente."
   ],
   "armadilha": "Dar a um agente autônomo um objetivo sem escopo e sem critérios de sucesso.",
   "repo": {
    "label": "modulo-03/cfp-platform/frontend-e2e (Playwright)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-03/cfp-platform/frontend-e2e"
   }
  },
  {
   "id": "P5-18",
   "title": "Interface primeiro, com dados mockados e Signals",
   "topics": [
    "D5-13"
   ],
   "cenario": "O time liga a LLM antes de a tela e o contrato estarem validados. Cada ajuste visual passa a custar uma chamada paga ao modelo, e o contrato de resposta muda no meio do caminho.",
   "passos": [
    "Defina o shape do dado (o brag: título, contexto, impacto, métricas, tecnologias).",
    "Construa a UI com um serviço em Signals que devolve dados mockados.",
    "Valide estados: carregando, vazio, lista, detalhe e erro.",
    "Só então troque o mock por <code>HttpClient.post</code> para o endpoint real.",
    "Mantenha a API key no <code>.env</code> (fora do Git); o front nunca a conhece."
   ],
   "code": {
    "lang": "ts",
    "src": "import { Injectable, signal } from '@angular/core';\n\nexport interface Brag {\n  id: string;\n  title: string;\n  context: string;\n  impact: string;\n  metrics: string;\n  technologies: string[];\n}\n\nconst mockBrags: Brag[] = [\n  {\n    id: '1',\n    title: 'Reduced checkout latency by 40%',\n    context: 'Checkout p95 above 3s',\n    impact: 'Fewer abandoned carts',\n    metrics: '40% latency reduction',\n    technologies: ['Angular', 'Node.js'],\n  },\n];\n\n@Injectable({ providedIn: 'root' })\nexport class BragService {\n  brags = signal<Brag[]>(mockBrags);\n  loading = signal(false);\n\n  add(brag: Brag) {\n    this.brags.update((current) => [brag, ...current]);\n  }\n}"
   },
   "resultado": "A interface e o contrato são validados sem gastar tokens, e a ligação com o modelo vira uma troca localizada no serviço.",
   "quandoNao": [
    "Feature cuja interface é a própria saída do modelo, difícil de mockar.",
    "Prova de conceito só de backend.",
    "Quando o contrato já está fixado e testado."
   ],
   "armadilha": "Ligar o modelo antes de a interface e o contrato estarem validados, ou subir a API key para o GitHub.",
   "repo": {
    "label": "modulo-05/brag-bot/src/app",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-05/brag-bot/src/app"
   }
  },
  {
   "id": "P5-19",
   "title": "Flow do Genkit com Zod: saída estruturada",
   "topics": [
    "D5-14",
    "D5-13"
   ],
   "cenario": "Uma feature pede para a LLM transformar um rascunho informal em documento estruturado. Tratar a resposta como texto solto quebra a interface quando o modelo muda o formato, e amarrar o código a um fornecedor trava a troca de modelo.",
   "passos": [
    "Declare o schema de saída com Zod e use <code>.describe()</code> em cada campo: ele entra no prompt como instrução.",
    "Defina o flow com <code>ai.defineFlow</code>, com <code>inputSchema</code> e <code>outputSchema</code>.",
    "Chame <code>ai.generate</code> com <code>output: { format: 'json', schema }</code>.",
    "Trate saída vazia como erro explícito.",
    "Teste no Dev UI do Genkit (<code>genkit start</code>) antes de integrar ao app.",
    "A chave do Google AI vem de variável de ambiente (<code>GEMINI_API_KEY</code>, conforme a doc do plugin) e o nome do modelo fica em um só lugar."
   ],
   "code": {
    "lang": "ts",
    "src": "import { genkit, z } from 'genkit';\nimport { googleAI } from '@genkit-ai/google-genai';\n\nexport const ai = genkit({\n  plugins: [googleAI()],\n  model: googleAI.model('gemini-2.5-flash'),\n});\n\nexport const BragSchema = z.object({\n  title: z.string().describe('Main action plus high-level result.'),\n  context: z.string().describe('Original situation or problem.'),\n  businessImpact: z.string().describe('Business impact, such as time saved.'),\n  metrics: z.array(z.string()).describe('Only strictly quantifiable data.'),\n});\n\nexport const bragGeneratorFlow = ai.defineFlow(\n  {\n    name: 'bragGeneratorFlow',\n    inputSchema: z.object({ definition: z.string() }),\n    outputSchema: BragSchema,\n  },\n  async (input) => {\n    const { output } = await ai.generate({\n      prompt: 'Turn this informal draft into a brag document:\\n' + input.definition,\n      output: { format: 'json', schema: BragSchema },\n    });\n    if (!output) {\n      throw new Error('The model returned no valid output');\n    }\n    return output;\n  },\n);"
   },
   "resultado": "Resposta tipada e validada, observável no tracing do Genkit, e troca de provedor ou modelo contida em um ponto.",
   "quandoNao": [
    "Resposta livre em texto, sem consumidor programático.",
    "Chamada única e simples ao modelo, onde o SDK direto basta.",
    "Quando o time já padronizou outro framework de orquestração."
   ],
   "armadilha": "Esquecer que <code>describe</code> entra no prompt e escrevê-los como comentário interno.",
   "repo": {
    "label": "modulo-05/brag-bot/src/flows.ts",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-05/brag-bot/src"
   }
  },
  {
   "id": "P5-20",
   "title": "Micro-BFF: rota da API antes do catch-all do SSR",
   "topics": [
    "D5-15"
   ],
   "cenario": "O front Angular precisa chamar o flow sem expor a chave do modelo. O servidor SSR já é um Express: dá para hospedar <code>POST /api/brag</code> ali, mas a rota registrada depois do catch-all nunca é alcançada.",
   "passos": [
    "No <code>server.ts</code> do Angular SSR, adicione <code>express.json()</code>.",
    "Registre <code>app.post('/api/brag', ...)</code> <b>antes</b> do handler que renderiza o Angular.",
    "Valide o body: sem <code>definition</code>, responda 400.",
    "Chame o flow e devolva JSON; em erro, responda 500 com mensagem genérica e log estruturado.",
    "O front fala só com <code>/api/brag</code>, desconhecendo o provedor do modelo.",
    "Teste mais de uma vez: um comportamento da LLM visto uma vez (idioma, formato) não é garantia."
   ],
   "code": {
    "lang": "ts",
    "src": "import express from 'express';\nimport { bragGeneratorFlow } from './flows';\n\nconst app = express();\napp.use(express.json());\n\napp.post('/api/brag', async (req, res) => {\n  const { definition } = req.body ?? {};\n  if (typeof definition !== 'string' || !definition.trim()) {\n    res.status(400).json({ error: 'Definition is required' });\n    return;\n  }\n  try {\n    const result = await bragGeneratorFlow({ definition });\n    res.json(result);\n  } catch (error) {\n    console.error(JSON.stringify({ message: 'brag generation failed', error: String(error) }));\n    res.status(500).json({ error: 'Failed to generate brag' });\n  }\n});\n\napp.use((_req, res) => {\n  res.status(404).end();\n});"
   },
   "resultado": "Front, API e flow no mesmo processo, com a chave só no servidor; o front fica desacoplado do provedor.",
   "quandoNao": [
    "Carga alta ou times separados: use um serviço de backend próprio.",
    "Produto com várias integrações: o micro-BFF não é arquitetura final.",
    "Quando já existe um API gateway."
   ],
   "armadilha": "Colocar a rota depois do catch-all do SSR.",
   "repo": {
    "label": "modulo-05/brag-bot/src/server.ts",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo05-ferramentas-de-IA-para-UI-UX/modulo-05/brag-bot/src"
   }
  },
  {
   "id": "P5-21",
   "title": "SEO técnico: robots, sitemap, canônica e metas sociais (live 30/09)",
   "topics": [
    "D5-17"
   ],
   "cenario": "Um site novo está no ar, mas o buscador indexa URLs duplicadas, o sitemap não tem data e o link compartilhado no WhatsApp aparece sem imagem. Ninguém sabe se a página de preview também está sendo rastreada.",
   "passos": [
    "Escreva um <code>robots.txt</code> coerente com o produto e aponte o sitemap (liberação total só se tudo é público).",
    "Gere o sitemap com <code>lastmod</code>; o Google usa o <code>lastmod</code> e costuma ignorar <code>priority</code> e <code>changefreq</code>.",
    "Declare uma URL canônica única por página.",
    "Defina título, description e hierarquia H1/H2/H3 por página.",
    "Declare Open Graph e Twitter Card com dimensões e <code>alt</code> da imagem.",
    "Quebre o build em link interno inválido e meça LCP, INP e TBT."
   ],
   "code": {
    "lang": "text",
    "src": "User-agent: *\nAllow: /\nSitemap: https://example.com/sitemap.xml\n\n<link rel=\"canonical\" href=\"https://example.com/docs\">\n<meta name=\"robots\" content=\"index, follow, max-image-preview:large, max-snippet:-1\">\n<meta property=\"og:title\" content=\"Product docs\">\n<meta property=\"og:image\" content=\"https://example.com/og.png\">\n<meta property=\"og:image:width\" content=\"1200\">\n<meta property=\"og:image:height\" content=\"630\">\n<meta property=\"og:image:alt\" content=\"Product overview\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">"
   },
   "resultado": "Rastreamento e indexação previsíveis, e previews sociais corretos, medidos por métricas de performance.",
   "quandoNao": [
    "Áreas privadas, preview e rotas sem valor de busca: não use liberação total, restrinja.",
    "App autenticado sem páginas públicas.",
    "Site que renderiza só no cliente: resolva a renderização antes."
   ],
   "armadilha": "Copiar o robots.txt de liberação total em projeto com áreas privadas, ambientes de preview ou rotas sem valor de busca.",
   "repo": {
    "label": "lives/2026-09-30 (SEO, GEO e AEO)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-09-30"
   }
  },
  {
   "id": "P5-22",
   "title": "Dados estruturados JSON-LD com @id estáveis",
   "topics": [
    "D5-17"
   ],
   "cenario": "O site fala de uma pessoa, uma organização e um produto, mas para buscadores e IAs são só strings soltas. Sem entidades ligadas, não há como citar o conteúdo com confiança.",
   "passos": [
    "Modele as entidades (Organization, WebSite, Person, Product) cada uma com um <code>@id</code> estável.",
    "Ligue os tipos entre si pelo <code>@id</code> (publisher, author), em vez de repetir dados.",
    "Renderize o JSON-LD no servidor ou no build, não só no cliente.",
    "Não espere rich result de FAQ ou HowTo no Google: hoje não aparece na maioria dos sites.",
    "Valide o JSON-LD gerado com um validador de dados estruturados."
   ],
   "code": {
    "lang": "json",
    "src": "{\n  \"@context\": \"https://schema.org\",\n  \"@graph\": [\n    {\n      \"@type\": \"Organization\",\n      \"@id\": \"https://example.com/#organization\",\n      \"name\": \"Example Co\",\n      \"url\": \"https://example.com\"\n    },\n    {\n      \"@type\": \"WebSite\",\n      \"@id\": \"https://example.com/#website\",\n      \"url\": \"https://example.com\",\n      \"publisher\": { \"@id\": \"https://example.com/#organization\" }\n    },\n    {\n      \"@type\": \"Person\",\n      \"@id\": \"https://example.com/#author\",\n      \"name\": \"Jane Doe\",\n      \"worksFor\": { \"@id\": \"https://example.com/#organization\" }\n    }\n  ]\n}"
   },
   "resultado": "Entidades consistentes e ligadas, base para AEO e GEO: IAs e buscadores entendem quem é quem.",
   "quandoNao": [
    "Página sem público de busca (área logada).",
    "Quando o CMS já gera o JSON-LD correto.",
    "Quando o objetivo é só rich result visual de FAQ, que hoje não costuma aparecer."
   ],
   "armadilha": "Renderizar conteúdo e JSON-LD só no cliente: robôs que não executam JavaScript não veem nada.",
   "repo": {
    "label": "lives/2026-09-30 (SEO, GEO e AEO)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-09-30"
   }
  },
  {
   "id": "P5-23",
   "title": "GEO: llms.txt e espelho Markdown gerados no build",
   "topics": [
    "D5-17"
   ],
   "cenario": "Uma doc técnica é lida por IAs que recebem o HTML cheio de navegação e scripts, e citam trechos errados. O produto quer ser citado corretamente por assistentes e buscadores com IA.",
   "passos": [
    "Escreva as páginas de conteúdo em Markdown na fonte.",
    "No build, gere o HTML e também o espelho <code>.md</code> de cada página.",
    "Anuncie o espelho no HTML com <code>&lt;link rel=\"alternate\" type=\"text/markdown\"&gt;</code>.",
    "Gere o <code>llms.txt</code> (índice curto) e o <code>llms-full.txt</code> (conteúdo completo).",
    "Inclua esses arquivos no sitemap e no <code>robots.txt</code>.",
    "Trate llms.txt como convenção em evolução, não como garantia de citação."
   ],
   "code": {
    "lang": "ts",
    "src": "import { mkdirSync, writeFileSync } from 'node:fs';\nimport { join } from 'node:path';\n\ninterface DocPage {\n  slug: string;\n  title: string;\n  summary: string;\n  markdown: string;\n}\n\nexport function buildLlmsFiles(pages: DocPage[], siteUrl: string, outDir: string) {\n  mkdirSync(outDir, { recursive: true });\n  for (const page of pages) {\n    writeFileSync(join(outDir, page.slug + '.md'), page.markdown);\n  }\n  const index = pages\n    .map((page) => '- [' + page.title + '](' + siteUrl + '/' + page.slug + '.md): ' + page.summary)\n    .join('\\n');\n  writeFileSync(join(outDir, 'llms.txt'), '# Product docs\\n\\n' + index + '\\n');\n  writeFileSync(join(outDir, 'llms-full.txt'), pages.map((page) => page.markdown).join('\\n\\n'));\n}"
   },
   "resultado": "A IA recebe conteúdo limpo e navegável em vez de HTML ruidoso, com um índice previsível; o efeito em citações deve ser medido, não presumido.",
   "quandoNao": [
    "Conteúdo privado ou pago que você não quer ser ingerido por IAs.",
    "Site com poucas páginas, onde o ganho é marginal.",
    "Quando a fonte não é Markdown e converter vira gambiarra."
   ],
   "armadilha": "Publicar llms.txt sem o espelho .md das páginas, deixando a IA com HTML ruidoso.",
   "repo": {
    "label": "lives/2026-09-30 (SEO, GEO e AEO)",
    "link": "https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-09-30"
   }
  }
 ]
});
