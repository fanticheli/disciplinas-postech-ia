# 17 · Live SEO, GEO e AEO: ser encontrado por buscadores, IAs e redes sociais

> **Live · 30/09/2026** · Leitura: ~11 min · Bloco: Lives complementares

## 🎯 Em uma frase
SEO, GEO e AEO são **quatro frentes que se reforçam**: **SEO clássico** (rastreamento, indexação e on-page), **dados estruturados** (base de AEO e GEO), **GEO/LLMO** (conteúdo pronto para IAs) e **performance e compartilhamento social**. Cada prática vem de projetos reais, o Awesome You e o Lagune.ai.

---

## 👵 Explicando para a vovó

Pense numa loja de bairro. SEO clássico é ter a placa na rua certa e o endereço no mapa (o buscador te acha). Dados estruturados são a ficha técnica colada em cada produto, em formato que máquina lê. GEO é deixar na entrada um folheto curto e limpo que a IA possa ler e citar sem errar o seu nome. Performance e redes sociais são a vitrine que abre rápido e aparece bonita quando alguém compartilha o endereço.

A ideia da live é que as quatro coisas se ajudam: a ficha técnica ajuda o mapa e o folheto, e a vitrine rápida ajuda os dois.

---

## 🔧 Tecnicamente

### O que é
- **Origem das práticas:** o estudo parte das métricas e observações de SEO, GEO e AEO do **Awesome You** e da **Lagune.ai**, apresentadas na live (30/09/2026, professores Aurélio Oliveira e Weslley Araújo; curadoria do material por Weslley Araújo). O README avisa: cada abordagem é uma prática real desses projetos, inspiração para adaptar, não recomendação absoluta. Ambos são públicos e open source, e dá para explorá-los com o Gitingest.
- **1. SEO técnico (rastreamento e indexação):** `robots.txt` com liberação total e link para o sitemap (funciona porque todo o conteúdo é público; com áreas privadas ou preview, gerencie o que é rastreado); meta robots `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`; sitemap XML com prioridade por nível (home 1.0, `/docs` 0.9 e assim por diante) e `lastmod` (o Google se guia pelo `lastmod` e costuma ignorar `priority` e `changefreq`); `llms.txt` e `llms-full.txt` dentro do sitemap; URLs canônicas com forma única e sem barra final; build que falha com qualquer link, âncora ou link Markdown quebrado; datas de publicação e modificação vindas do primeiro e do último commit do arquivo, usadas como sinal de frescor.
- **2. SEO on-page:** título por página no formato palavra-chave mais marca; meta description por página (controla o snippet e influencia o CTR); meta keywords com impacto praticamente nulo no Google; idioma e localidade (`lang`, `og:locale`, `inLanguage`); um único H1 e hierarquia H2/H3, com linkagem interna por TOC, sidebar, paginação e rodapé; clusters de conteúdo por intenção (glossário, paper metodológico, comparação com concorrentes) para buscas informacionais e comparativas.
- **3. Dados estruturados (Schema.org em JSON-LD):** blocos com `@id` estáveis que se referenciam, formando um **grafo de entidades** (`#author`, `#organization`, `#website`, `#software`). Tipos: `Person` (E-E-A-T), `Organization` com `disambiguatingDescription` para não ser confundida com um nome parecido, `WebSite` (nome do site na SERP), `SoftwareApplication` (categoria, oferta gratuita, `featureList`), `HowTo` (5 passos), `FAQPage`, `BreadcrumbList`, `TechArticle` e `ScholarlyArticle`, `WebPage`.
- **Ressalvas do próprio material sobre rich results:** o rich result visual de HowTo foi descontinuado pelo Google, mas a marcação segue útil para AEO; o rich result de FAQ hoje é restrito pelo Google a sites de governo e saúde, e o maior ganho está em featured snippets, «As pessoas também perguntam», assistentes de voz e respostas de IA que extraem o par pergunta e resposta.
- **4. GEO/LLMO:** `llms.txt` gerado no build (resumo do produto e lista de docs com link `.md` e descrição); `llms-full.txt` com todo o corpus em um arquivo (ideal para assistentes de código e RAG); **twins Markdown** de cada página na URL com sufixo `.md`, com cabeçalho `Canonical:` e `Last updated:`; `<link rel="alternate" type="text/markdown">` nas docs; boas-vindas nominais a robôs de IA no `robots.txt` (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended e outros); conteúdo desenhado para citação, com definições diretas e frases-resumo autocontidas; descrições escritas para NLP parsing no Awesome You (entidades e relações extraídas do texto).
- **5. AEO:** não é uma prática nova, é a leitura das anteriores pelo papel nos motores de resposta: FAQPage e FAQ renderizado com perguntas reais, HowTo com passos numerados, descrições autocontidas (frontmatter e `featureList`) e snippets sem limite de tamanho, para servir o conteúdo como resposta direta sem exigir clique.
- **6. SMO:** Open Graph completo (`og:type`, `og:site_name`, `og:locale`, `og:url`, título, descrição, `og:image` com `secure_url`, 1280x640 e `alt` por página) e Twitter Card `summary_large_image`, com imagem social padrão para páginas sem imagem própria. Uma página `/share` com QR code leva o público de eventos direto ao repositório.
- **7. Performance e Core Web Vitals:** critical CSS inline na home (melhora FCP e LCP); só WOFF2; imagens WebP com `srcset`, `fetchpriority="high"` e `loading="eager"` na imagem ativa e carregamento adiado nas demais; shader pesado carregado sob demanda e rodando em worker com OffscreenCanvas (ajuda INP e TBT); cache HTTP agressivo (assets imutáveis por 1 ano, imagens 30 dias, HTML 1 hora); site estático pré-renderizado (SSG), para que robôs que não executam JavaScript, a maioria dos robôs de IA, leiam todo o conteúdo e o JSON-LD.

### Como funciona
- Começar pelo rastreamento: `robots.txt` coerente, sitemap com `lastmod`, canônicas e build que quebra com link inválido.
- Definir título e description por página e uma hierarquia H1/H2/H3 clara, com linkagem interna.
- Modelar as entidades (pessoa, organização, site, produto) em JSON-LD com `@id` estáveis e ligar os tipos entre si.
- Gerar no build o `llms.txt`, o `llms-full.txt` e o espelho Markdown de cada página, anunciando o espelho com `rel="alternate"`.
- Declarar Open Graph e Twitter Card com dimensões e `alt`, e medir LCP, INP e TBT (critical CSS, imagens responsivas, cache, pré-renderização).

### Onde aplicar
- Documentação de produto ou de projeto open source que precisa ser citada corretamente por buscadores e por IAs.
- Site estático pré-renderizado: tudo já está no HTML, o que é a condição para robôs de IA que não executam JavaScript.
- Projeto com nome ambíguo: `Organization` com `disambiguatingDescription` evita a confusão (o caso da Lagune com a «Laguna AI»).
- Ligação com o resto da disciplina: [HTML semântico e acessibilidade](./04-design-tokens-e-componentes-acessiveis.md) ajudam a hierarquia e a leitura por máquina, e a [revisão visual no DevTools](./06-corrigindo-a-interface-com-ia.md) pode ser estendida a LCP e INP. A [live Safer](./16-live-safer-skills-mcp-e-lagune.md) usa o mesmo Lagune.

### Vantagens e limites
**Vantagens**
- Dados estruturados e Markdown limpo diminuem a alucinação da IA e garantem a atribuição correta, com URL oficial e data.
- Muitas práticas são automáticas no build (llms.txt, twins Markdown, datas do Git, canônicas, link quebrado), então não dependem de lembrança humana.
- As frentes se reforçam: o mesmo FAQ ou HowTo serve SEO, AEO e GEO.

**Limites**
- Várias marcações têm efeito limitado hoje: o Google ignora meta keywords, `priority` e `changefreq`, o rich result de HowTo foi descontinuado e o de FAQ é restrito.
- O material descreve práticas de dois projetos específicos (conteúdo todo público, site estático em inglês); não são recomendação absoluta.
- O README não traz medições antes e depois; os ganhos descritos como «na ponta» são os esperados, não resultados medidos (não verifiquei).

### 🚫 Armadilhas
- Copiar o `robots.txt` de liberação total em projeto com áreas privadas, ambientes de preview ou rotas sem valor de busca.
- Marcar FAQ ou HowTo esperando o rich result visual no Google, que hoje não aparece na maioria dos sites.
- Publicar `llms.txt` sem o espelho `.md` das páginas, deixando a IA com HTML ruidoso.
- Renderizar conteúdo e JSON-LD só no cliente: robôs que não executam JavaScript não veem nada.
- Declarar `og:image` sem dimensões e `alt`, o que atrasa ou recorta o preview.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| SEO | Otimização para mecanismos de busca tradicionais, como o Google |
| GEO / LLMO | Otimização para motores generativos (ChatGPT, Perplexity, Claude); no material, LLMO é tratado como equivalente ao GEO |
| AEO | Otimização para motores de resposta, que entregam a informação pronta em vez de uma lista de links |
| SMO | Otimização para o compartilhamento em redes sociais (Open Graph e Twitter Cards) |
| JSON-LD | JSON para dados interligados; o formato em que o Schema.org é embutido na página |
| llms.txt / llms-full.txt | Mapa curado do site para LLMs; versão com todo o corpus em um único arquivo |
| Twin Markdown | Espelho da página em Markdown limpo, na mesma URL com sufixo `.md` |
| E-E-A-T | Experiência, especialidade, autoridade e confiança: critérios do Google de qualidade |
| SERP / CTR | Página de resultados do buscador / taxa de cliques |
| LCP / INP / TBT / FCP | Métricas de carregamento e interação (maior elemento, resposta a interação, bloqueio da thread principal, primeiro conteúdo) |
| SSG | Site estático com todas as páginas geradas no build |

---

## 💻 No curso

O diretório da live tem só o README (extenso, curadoria de Weslley Araújo), sem código nem slides: as práticas vêm do código aberto do Awesome You e da Lagune.ai. Para aplicar, explore esses repositórios (por exemplo, com o Gitingest) e adapte ao seu projeto. O Lagune desta live é o mesmo da live Safer.

---

## 🔗 Para ir além
- [Live SEO, GEO e AEO no repositório do curso (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/lives/2026-09-30)
- [Awesome You](https://awesomeyou.io)
- [Lagune.ai](https://lagune.ai)
- [Gitingest](https://gitingest.com/)

---

⬅️ [15 · Micro-BFF full-stack e o Engenheiro AI-Native](./15-micro-bff-fullstack-e-engenheiro-ai-native.md)
