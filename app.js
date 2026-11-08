"use strict";

const LS_READ = "eia_read_v1";
const LS_THEME = "eia_theme_v1";
const LS_LAST = "eia_last_v1";
const LEGACY_IDS = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
const SITE_NAME = "Central de Estudos";
const HUE_COUNT = 8;
const TOC_MAX_ENTRIES = 24;

const storage = {
  get(key) {
    try { return localStorage.getItem(key); } catch (error) { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); return true; } catch (error) { return false; }
  }
};

function loadReadSet() {
  let ids = [];
  try {
    const parsed = JSON.parse(storage.get(LS_READ) || "[]");
    if (Array.isArray(parsed)) ids = parsed;
  } catch (error) {
    ids = [];
  }
  return new Set(ids.map(id => (LEGACY_IDS.includes(id) ? "D1-" + id : id)));
}

const read = loadReadSet();
function saveRead() { storage.set(LS_READ, JSON.stringify([...read])); }
saveRead();

const DISCIPLINES = STUDY.slice().sort((a, b) => a.disc.num.localeCompare(b.disc.num));
const BLOCKS = [];
const TOPICS = [];
DISCIPLINES.forEach(d => {
  d.blocos.forEach((b, i) => BLOCKS.push({ ...b, num: i, disc: d.disc.num }));
  d.topics.forEach(t => TOPICS.push({ ...t, disc: d.disc.num }));
});

const PRACTICE_ITEMS = [];
const PRACTICE_INTRO = {};
(window.PRACTICE || []).slice().sort((a, b) => a.disc.localeCompare(b.disc)).forEach(p => {
  PRACTICE_INTRO[p.disc] = p.intro || "";
  p.items.forEach(i => PRACTICE_ITEMS.push({ ...i, disc: p.disc }));
});

const DOC_META = {
  priorities: { label: "O que vale estudar", hash: "vale", icon: "flag", blurb: "O que implementar, o que ler por alto e o que pular nesta disciplina." },
  exam: { label: "Prova comentada", hash: "prova", icon: "file", blurb: "Questões resolvidas passo a passo, com o erro de cada alternativa." },
  roadmap: { label: "Trilha: o que vale estudar", hash: "trilha", icon: "map", blurb: "O que implementar primeiro, o que ler por alto e o que pular, cruzando as 11 disciplinas." }
};

function discOf(num) { return DISCIPLINES.find(d => d.disc.num === num); }
function blockOf(t) { return BLOCKS.find(b => b.id === t.bloco && b.disc === t.disc); }
function topicsOf(num) { return TOPICS.filter(t => t.disc === num); }
function readCount(list) { return list.filter(t => read.has(t.id)).length; }
function practiceOf(num) { return PRACTICE_ITEMS.filter(i => i.disc === num); }
function practiceForTopic(id) { return PRACTICE_ITEMS.filter(i => (i.topics || []).includes(id)); }
function percent(part, total) { return total ? Math.round((part / total) * 100) : 0; }
function discHue(num) { return `--hue-${(parseInt(num, 10) - 1 + HUE_COUNT) % HUE_COUNT}`; }
function hueStyle(num) { return num ? ` style="--d:var(${discHue(num)})"` : ""; }
function shortDisc(num) { return "D" + parseInt(num, 10); }

function docHash(kind, disc) { return kind === "roadmap" ? "trilha" : `${DOC_META[kind].hash}/${disc}`; }
function docSource(kind, disc) { return kind === "roadmap" ? "data/roadmap.js" : `data/e${disc}.js`; }
function docOf(kind, disc) { return (window.DOCS || []).find(d => d.kind === kind && d.disc === disc); }
function allDocRefs() {
  const refs = DISCIPLINES.flatMap(d => ["priorities", "exam"].map(kind => ({ kind, disc: d.disc.num })));
  refs.push({ kind: "roadmap", disc: "" });
  return refs;
}

const scriptLoads = new Map();
function loadScript(src) {
  if (!scriptLoads.has(src)) {
    scriptLoads.set(src, new Promise((resolve, reject) => {
      const el = document.createElement("script");
      el.src = src;
      el.async = true;
      el.onload = () => resolve();
      el.onerror = () => {
        scriptLoads.delete(src);
        el.remove();
        reject(new Error(`failed to load ${src}`));
      };
      document.head.appendChild(el);
    }));
  }
  return scriptLoads.get(src);
}
function ensureDoc(kind, disc) {
  const existing = docOf(kind, disc);
  if (existing) return Promise.resolve(existing);
  return loadScript(docSource(kind, disc)).then(() => {
    const doc = docOf(kind, disc);
    if (!doc) throw new Error(`document ${kind}/${disc} not found in ${docSource(kind, disc)}`);
    return doc;
  });
}

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function stripTags(s) { return String(s).replace(/<[^>]*>/g, " "); }
function plainText(html) {
  const tpl = document.createElement("template");
  tpl.innerHTML = String(html);
  return tpl.content.textContent.replace(/\s+/g, " ").trim();
}
function normalize(s) { return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
function icon(name, cls = "") {
  return `<svg class="icon${cls ? " " + cls : ""}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
}

const $ = s => document.querySelector(s);
const root = document.documentElement;
const content = $("#content");
const nav = $("#nav");
const sidebar = $("#sidebar");
const scrim = $("#scrim");
const mainCol = $("#mainCol");
const topbar = $("#topbar");
const bottombar = $("#bottombar");
const menuBtn = $("#menuBtn");
const topbarTitle = $("#topbarTitle");
const readingProgress = $("#readingProgress");
const progressSummary = $("#progressSummary");
const palette = $("#palette");
const paletteInput = $("#paletteInput");
const paletteList = $("#paletteList");
const paletteStatus = $("#paletteStatus");
const tocSheet = $("#tocSheet");
const tocSheetBody = $("#tocSheetBody");
const toast = $("#toast");
const themeColor = $("#themeColor");
const desktopQuery = window.matchMedia("(min-width: 1024px)");
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const state = {
  currentDisc: null,
  practiceMode: false,
  view: "home",
  routeToken: 0,
  toc: [],
  activeToc: null,
  pendingTarget: null,
  focusContent: false,
  menuReturn: null
};

function setChrome({ title = "", short = SITE_NAME, view, article = false, disc = null }) {
  state.view = view;
  document.title = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} · Pós Engenharia de IA Aplicada`;
  topbarTitle.textContent = short;
  readingProgress.hidden = !article;
  if (disc) readingProgress.style.setProperty("--d", `var(${discHue(disc)})`);
  else readingProgress.style.removeProperty("--d");
  bottombar.querySelectorAll("[data-nav]").forEach(el => {
    if (el.dataset.nav === view) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
}

function breadcrumb(items) {
  const parts = items.map((item, i) => (i < items.length - 1
    ? `<li><a href="${item.href}">${item.label}</a></li>`
    : `<li aria-current="page">${item.label}</li>`));
  return `<nav class="breadcrumb" aria-label="Você está em"><ol>${parts.join("")}</ol></nav>`;
}

function meter(value, label) {
  return `<span class="meter" role="img" aria-label="${escapeHtml(label)}"><span style="width:${value}%"></span></span>`;
}

function describeRoute(key) {
  if (!key) return null;
  const topic = TOPICS.find(t => t.id === key);
  if (topic) {
    const bl = blockOf(topic);
    return { href: "#" + key, title: plainText(topic.title), sub: `Disciplina ${topic.disc} · Bloco ${bl ? bl.num : ""} · ${topic.read}`, disc: topic.disc };
  }
  const item = PRACTICE_ITEMS.find(i => i.id === key);
  if (item) return { href: "#" + key, title: plainText(item.title), sub: `Na prática · Disciplina ${item.disc}`, disc: item.disc };
  const docMatch = key.match(/^(vale|prova)\/(\d+)$/);
  if (docMatch && discOf(docMatch[2])) {
    const kind = docMatch[1] === "vale" ? "priorities" : "exam";
    return { href: "#" + key, title: DOC_META[kind].label, sub: `Disciplina ${docMatch[2]} · ${discOf(docMatch[2]).disc.titulo}`, disc: docMatch[2] };
  }
  if (key === "trilha") return { href: "#trilha", title: DOC_META.roadmap.label, sub: "Cruzando as 11 disciplinas", disc: null };
  return null;
}

function rememberRoute(key) { storage.set(LS_LAST, key); }

function renderHome() {
  state.currentDisc = null;
  setChrome({ view: "home" });
  const done = readCount(TOPICS);
  const last = describeRoute(storage.get(LS_LAST));
  const stat = (label, value) => `<div><dt>${label}</dt><dd>${value}</dd></div>`;
  const continueCard = last ? `
    <a class="continue-card" href="${last.href}"${hueStyle(last.disc)}>
      <span class="continue-card-body">
        <span class="continue-card-label">Continuar de onde parou</span>
        <span class="continue-card-title">${escapeHtml(last.title)}</span>
        <span class="continue-card-sub">${escapeHtml(last.sub)}</span>
      </span>${icon("arrow-right")}
    </a>` : "";
  content.innerHTML = `<div class="page">
    <section class="hero" aria-labelledby="homeTitle">
      <p class="eyebrow">Pós · Engenharia de IA Aplicada</p>
      <h1 class="hero-title" id="homeTitle">Central de Estudos</h1>
      <p class="lead">Teoria das aulas, código do repositório oficial, práticas, provas comentadas e o que vale estudar, disciplina por disciplina.</p>
      <dl class="stats">
        ${stat("Disciplinas", DISCIPLINES.length)}
        ${stat("Tópicos", TOPICS.length)}
        ${stat("Práticas", PRACTICE_ITEMS.length)}
        ${stat("Provas comentadas", DISCIPLINES.length)}
      </dl>
    </section>
    ${continueCard}
    <section class="doors" aria-label="Por onde começar">
      <a class="door" href="#trilha"><span class="door-icon">${icon("map")}</span><span><span class="door-title">${DOC_META.roadmap.label}</span><span class="door-text">${DOC_META.roadmap.blurb}</span></span></a>
      <a class="door" href="#pratica"><span class="door-icon">${icon("wrench")}</span><span><span class="door-title">Na prática</span><span class="door-text">${PRACTICE_ITEMS.length} técnicas aplicadas: cenário real, passo a passo, código curto e quando não usar.</span></span></a>
      <button type="button" class="door" data-action="scroll-disciplines"><span class="door-icon">${icon("grid")}</span><span><span class="door-title">Disciplinas</span><span class="door-text">Teoria em camadas, analogia da vovó, armadilhas e o código do repositório explicado.</span></span></button>
    </section>
    <section aria-labelledby="disciplinesTitle">
      <div class="section-head"><h2 id="disciplinesTitle" tabindex="-1">Disciplinas</h2><span class="section-meta">${done} de ${TOPICS.length} tópicos lidos</span></div>
      <div class="card-grid card-grid--3">${DISCIPLINES.map(discCard).join("")}</div>
    </section>
  </div>`;
  finishRender({ article: false });
}

function discCard(d) {
  const num = d.disc.num;
  const list = topicsOf(num);
  const n = readCount(list);
  return `<a class="disc-card" href="#d/${num}"${hueStyle(num)}>
    <span class="disc-card-top"><span class="disc-badge" aria-hidden="true">${num}</span>
      <span><span class="disc-card-title"><span class="sr-only">Disciplina ${num}: </span>${d.disc.titulo}</span>
      <span class="disc-card-meta">${d.disc.autor} · ${list.length} tópicos · ${practiceOf(num).length} práticas</span></span></span>
    <span class="disc-card-progress">${meter(percent(n, list.length), `${n} de ${list.length} tópicos lidos`)}<span aria-hidden="true">${n}/${list.length}</span></span>
  </a>`;
}

function topicRow(t) {
  const isRead = read.has(t.id);
  const practices = practiceForTopic(t.id).length;
  return `<li><a class="row-link" href="#${t.id}">
    <span class="row-num" aria-hidden="true">${t.id.split("-")[1]}</span>
    <span class="row-main"><span class="row-title">${t.title}</span><span class="row-desc">${t.short}</span>
      <span class="row-meta"><span>${icon("clock")}${t.read}</span>${t.codigo && t.codigo.length ? `<span>${icon("code")}código</span>` : ""}${practices ? `<span>${icon("wrench")}${practices} ${practices === 1 ? "prática" : "práticas"}</span>` : ""}</span></span>
    <span class="row-status${isRead ? " is-read" : ""}">${icon(isRead ? "check-circle" : "circle")}<span class="sr-only">${isRead ? "Lido" : "Não lido"}</span></span>
  </a></li>`;
}

function renderDisc(num) {
  const d = discOf(num);
  if (!d) return renderHome();
  state.currentDisc = num;
  setChrome({ title: d.disc.titulo, short: `Disciplina ${num}`, view: "disc" });
  const list = topicsOf(num);
  const n = readCount(list);
  const next = list.find(t => !read.has(t.id)) || list[0];
  const practiceCount = practiceOf(num).length;
  const startLabel = n === 0 ? "Começar" : n === list.length ? "Revisar do início" : "Continuar";
  let html = `<div class="page"${hueStyle(num)}>
    ${breadcrumb([{ label: "Início", href: "#" }, { label: `Disciplina ${num}` }])}
    <header class="page-head">
      <p class="eyebrow">Disciplina ${num} · ${d.disc.autor}</p>
      <h1 class="page-title">${d.disc.titulo}</h1>
      ${d.disc.resumo ? `<p class="lead">${d.disc.resumo}</p>` : ""}
      <div class="progress-line">${meter(percent(n, list.length), `${n} de ${list.length} tópicos lidos`)}<span>${n} de ${list.length} lidos · ${percent(n, list.length)}%</span></div>
      <div class="action-row">
        ${next ? `<a class="btn btn--primary" href="#${next.id}">${icon("play")}${startLabel}</a>` : ""}
        <a class="btn" href="#vale/${num}">${icon("flag")}${DOC_META.priorities.label}</a>
        <a class="btn" href="#prova/${num}">${icon("file")}${DOC_META.exam.label}</a>
        ${practiceCount ? `<a class="btn" href="#pratica/${num}">${icon("wrench")}Na prática · ${practiceCount}</a>` : ""}
      </div>
    </header>`;
  BLOCKS.filter(b => b.disc === num).forEach(bl => {
    const items = list.filter(t => t.bloco === bl.id);
    if (!items.length) return;
    html += `<section class="block-section" aria-labelledby="block-${bl.num}">
      <div class="block-head"><h2 id="block-${bl.num}"><span class="block-index">Bloco ${bl.num}</span>${bl.label}</h2>
        <span class="block-count">${readCount(items)}/${items.length}<span class="sr-only"> lidos</span></span></div>
      <ol class="row-list">${items.map(topicRow).join("")}</ol>
    </section>`;
  });
  if (d.materiais && d.materiais.length) {
    html += `<section class="panel" aria-labelledby="materialsTitle"><h2 id="materialsTitle">${icon("folder")}Materiais oficiais</h2><ul class="link-list">
      ${d.materiais.map(([label, url]) => `<li>${url ? `<a href="${url}" target="_blank" rel="noopener">${label}${icon("external")}</a>` : `<span>${label}</span>`}</li>`).join("")}
    </ul></section>`;
  }
  if (d.aviso) {
    html += `<section class="callout callout--warn" aria-labelledby="noticeTitle"><h2 class="callout-title" id="noticeTitle">${d.aviso.titulo}</h2><p>${d.aviso.texto}</p></section>`;
  }
  content.innerHTML = html + "</div>";
  finishRender({ article: false });
}

function practiceRow(i) {
  const topics = (i.topics || []).length;
  return `<li><a class="row-link" href="#${i.id}">
    <span class="row-num" aria-hidden="true">${i.id.split("-")[1]}</span>
    <span class="row-main"><span class="row-title">${i.title}</span><span class="row-desc">${i.cenario}</span>
      <span class="row-meta"><span>#${i.id}</span>${i.code && i.code.src ? `<span>${icon("code")}${escapeHtml(i.code.lang || "código")}</span>` : ""}${topics ? `<span>${icon("book")}${topics} ${topics === 1 ? "tópico" : "tópicos"}</span>` : ""}</span></span>
    ${icon("chevron-right", "row-chevron")}
  </a></li>`;
}

function renderPracticeIndex(num) {
  state.practiceMode = true;
  const d = num ? discOf(num) : null;
  if (num && !d) return renderHome();
  state.currentDisc = num || null;
  if (d) {
    setChrome({ title: `Na prática · ${d.disc.titulo}`, short: `Na prática · ${shortDisc(num)}`, view: "practice" });
    content.innerHTML = `<div class="page"${hueStyle(num)}>
      ${breadcrumb([{ label: "Início", href: "#" }, { label: "Na prática", href: "#pratica" }, { label: `Disciplina ${num}` }])}
      <header class="page-head">
        <p class="eyebrow">Na prática · Disciplina ${num}</p>
        <h1 class="page-title">${d.disc.titulo}</h1>
        ${PRACTICE_INTRO[num] ? `<p class="lead">${PRACTICE_INTRO[num]}</p>` : ""}
        <div class="action-row"><a class="btn" href="#d/${num}">${icon("book")}Ver a teoria da disciplina</a></div>
      </header>
      <div class="section-head"><h2>${practiceOf(num).length} técnicas</h2></div>
      <ol class="row-list">${practiceOf(num).map(practiceRow).join("")}</ol>
    </div>`;
  } else {
    setChrome({ title: "Na prática", short: "Na prática", view: "practice" });
    content.innerHTML = `<div class="page">
      ${breadcrumb([{ label: "Início", href: "#" }, { label: "Na prática" }])}
      <header class="page-head">
        <p class="eyebrow">Na prática</p>
        <h1 class="page-title">Cada técnica, aplicada</h1>
        <p class="lead">Para cada técnica dos módulos: um problema real, como aplicar passo a passo, um trecho de código curto, o resultado esperado e quando não usar.</p>
      </header>
      <div class="card-grid card-grid--3">${DISCIPLINES.filter(x => practiceOf(x.disc.num).length).map(x => `
        <a class="disc-card" href="#pratica/${x.disc.num}"${hueStyle(x.disc.num)}>
          <span class="disc-card-top"><span class="disc-badge" aria-hidden="true">${x.disc.num}</span>
            <span><span class="disc-card-title">${x.disc.titulo}</span><span class="disc-card-meta">${practiceOf(x.disc.num).length} técnicas</span></span></span>
          ${PRACTICE_INTRO[x.disc.num] ? `<span class="disc-card-desc">${PRACTICE_INTRO[x.disc.num]}</span>` : ""}
        </a>`).join("")}</div>
    </div>`;
  }
  finishRender({ article: false });
}

function tocButton() {
  return `<button type="button" class="btn btn--small toc-trigger" data-action="open-toc" hidden>${icon("list")}Nesta página</button>`;
}
function tocAside() {
  return `<aside class="toc-aside" aria-labelledby="tocTitle" hidden><p class="toc-title" id="tocTitle">Nesta página</p><ol class="toc-list" id="tocList"></ol></aside>`;
}
function articleLayout(body, foot) {
  return `<div class="article-layout"><div class="article-main"><div class="prose" id="articleBody">${body}</div><footer class="article-foot">${foot}</footer></div>${tocAside()}</div>`;
}
function topicSection(iconName, title, body) {
  return `<section class="topic-section"><h2>${icon(iconName)}<span>${title}</span></h2>${body}</section>`;
}
function bullets(arr) { return `<ul>${arr.map(x => `<li>${x}</li>`).join("")}</ul>`; }
function steps(arr) { return `<ol class="steps">${arr.map(x => `<li>${x}</li>`).join("")}</ol>`; }

function pager(prev, next, label) {
  if (!prev && !next) return "";
  const link = (item, dir) => `<a class="pager-link pager-link--${dir}" href="${item.href}" rel="${dir}">
    <span class="pager-label">${dir === "prev" ? icon("arrow-left") + item.label : item.label + icon("arrow-right")}</span>
    <span class="pager-title">${item.title}</span></a>`;
  return `<nav class="pager" aria-label="${label}">${prev ? link(prev, "prev") : ""}${next ? link(next, "next") : ""}</nav>`;
}

function renderPracticeItem(id) {
  const i = PRACTICE_ITEMS.find(x => x.id === id);
  if (!i) return renderHome();
  state.practiceMode = true;
  state.currentDisc = i.disc;
  rememberRoute(i.id);
  setChrome({ title: plainText(i.title), short: `Na prática · ${shortDisc(i.disc)}`, view: "practice-item", article: true, disc: i.disc });
  const list = practiceOf(i.disc);
  const idx = list.indexOf(i);
  const prev = list[idx - 1];
  const next = list[idx + 1];
  const topicLinks = (i.topics || []).map(tid => {
    const t = TOPICS.find(x => x.id === tid);
    return t ? `<a href="#${tid}">${t.title}</a>` : "";
  }).filter(Boolean);
  const body = `
    <div class="callout callout--summary"><p class="callout-label">${icon("target")}Cenário</p><div>${i.cenario}</div></div>
    ${topicSection("steps", "Passo a passo", steps(i.passos))}
    ${i.code && i.code.src ? topicSection("code", "Código", `<pre class="code" data-lang="${escapeHtml(i.code.lang || "")}"><code>${escapeHtml(i.code.src)}</code></pre>`) : ""}
    <div class="callout callout--ok"><p class="callout-label">${icon("check-circle")}Resultado</p><div>${i.resultado}</div></div>
    ${topicSection("ban", "Quando não usar", bullets(i.quandoNao))}
    <section class="callout callout--warn" aria-labelledby="trapTitle"><h2 class="callout-title" id="trapTitle">${icon("alert")}Armadilha comum</h2><p>${i.armadilha}</p></section>
    ${topicLinks.length ? topicSection("book", "Teoria relacionada", bullets(topicLinks)) : ""}
    ${i.repo && i.repo.link ? `<p><a href="${i.repo.link}" target="_blank" rel="noopener">${i.repo.label || "Abrir no repositório do curso"} ↗</a></p>` : ""}`;
  const foot = pager(
    prev && { href: "#" + prev.id, label: "Anterior", title: prev.title },
    next && { href: "#" + next.id, label: "Próxima", title: next.title },
    "Navegação entre práticas");
  content.innerHTML = `<article class="page page--article"${hueStyle(i.disc)}>
    ${breadcrumb([{ label: "Início", href: "#" }, { label: "Na prática", href: "#pratica" }, { label: `Disciplina ${i.disc}`, href: `#pratica/${i.disc}` }, { label: `#${i.id}` }])}
    <header class="page-head">
      <p class="eyebrow">Na prática · Disciplina ${i.disc}</p>
      <h1 class="page-title">${i.title}</h1>
      <div class="page-meta"><span class="chip chip--accent">${icon("wrench")}Na prática</span><span class="chip">#${i.id}</span>${i.code && i.code.lang ? `<span class="chip">${icon("code")}${escapeHtml(i.code.lang)}</span>` : ""}${tocButton()}</div>
    </header>
    ${articleLayout(body, foot)}
  </article>`;
  finishRender({ article: true });
}

function readToggleButton(id, variant) {
  const isRead = read.has(id);
  const cls = variant === "small" ? "btn btn--small" : "btn btn--primary";
  return `<button type="button" class="${cls} read-toggle" data-action="toggle-read" data-id="${id}" aria-pressed="${isRead}" aria-label="Marcar como lido">
    <svg class="icon" aria-hidden="true"><use href="#i-${isRead ? "check-circle" : "check"}"/></svg><span class="read-toggle-label">${isRead ? "Lido" : "Marcar como lido"}</span></button>`;
}

function renderCode(list) {
  if (!list || !list.length) return "";
  return topicSection("code", "No código do repo", list.map(c => `
    <details class="disclosure"${list.length === 1 ? " open" : ""}>
      <summary><code>${c.proj}</code>${icon("chevron-down", "disclosure-chevron")}</summary>
      <div class="disclosure-body">
        <p>${c.resumo}</p>
        <h4>Fluxo</h4>${steps(c.fluxo)}
        <h4>Rodar e praticar</h4>${bullets(c.rodar)}
        ${c.templateVsZ ? `<div class="callout callout--tip" role="note">${c.templateVsZ}</div>` : ""}
        ${c.armadilhas && c.armadilhas.length ? `<div class="callout callout--warn"><p class="callout-label">${icon("alert")}Armadilhas no código</p>${bullets(c.armadilhas)}</div>` : ""}
        ${c.link ? `<p><a href="${c.link}" target="_blank" rel="noopener">Abrir no GitHub ↗</a></p>` : ""}
      </div>
    </details>`).join(""));
}

function renderTopic(id) {
  const t = TOPICS.find(x => x.id === id);
  if (!t) return renderHome();
  state.currentDisc = t.disc;
  rememberRoute(t.id);
  setChrome({ title: plainText(t.title), short: `Disciplina ${t.disc}`, view: "topic", article: true, disc: t.disc });
  const bl = blockOf(t);
  const list = topicsOf(t.disc);
  const idx = list.indexOf(t);
  const prev = list[idx - 1];
  const next = list[idx + 1];
  const isRead = read.has(t.id);
  const practices = practiceForTopic(t.id);
  const body = `
    <div class="callout callout--summary"><p class="callout-label">${icon("sparkle")}Em uma frase</p><div class="callout-body">${t.oneliner}</div></div>
    <section class="callout callout--vovo" aria-labelledby="grandmaTitle"><h2 class="callout-title" id="grandmaTitle">${icon("heart")}A analogia da vovó</h2>${t.vovo.map(p => `<p>${p}</p>`).join("")}</section>
    ${topicSection("bulb", "O que é", bullets(t.oque))}
    ${topicSection("steps", "Como funciona", steps(t.como))}
    ${topicSection("target", "Como se aplica", bullets(t.aplica))}
    ${topicSection("scale", "Prós e contras", `<div class="pros-cons">
      <div class="is-pro"><h3>${icon("plus")}Prós</h3>${bullets(t.pros)}</div>
      <div class="is-con"><h3>${icon("minus")}Contras</h3>${bullets(t.contras)}</div></div>`)}
    <section class="callout callout--warn" aria-labelledby="trapsTitle"><h2 class="callout-title" id="trapsTitle">${icon("alert")}Más práticas e armadilhas</h2>${bullets(t.traps)}</section>
    ${t.tip ? `<div class="callout callout--tip" role="note"><p class="callout-label">${icon("info")}Nota</p><div>${t.tip}</div></div>` : ""}
    ${t.curso ? topicSection("wrench", "No curso: mão na massa", `<p>${t.curso}</p>`) : ""}
    ${renderCode(t.codigo)}
    ${practices.length ? topicSection("wrench", "Na prática", bullets(practices.map(p => `<a href="#${p.id}">${p.title}</a>`))) : ""}
    ${topicSection("list", "Cola rápida", `<dl class="cheatsheet">${t.cola.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>`)}
    ${t.links && t.links.length ? `<details class="disclosure"><summary>${icon("link")}Para ir além${icon("chevron-down", "disclosure-chevron")}</summary><div class="disclosure-body"><ul>${t.links.map(([l, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${l}</a></li>`).join("")}</ul></div></details>` : ""}`;
  const foot = `
    <div class="read-panel${isRead ? " is-read" : ""}">
      <div><p class="read-panel-title">${isRead ? "Tópico concluído" : "Terminou a leitura?"}</p><p class="read-panel-text">Seu progresso fica salvo neste navegador.</p></div>
      ${readToggleButton(t.id, "large")}
    </div>
    ${pager(
      prev && { href: "#" + prev.id, label: "Anterior", title: prev.title },
      next && { href: "#" + next.id, label: "Próximo", title: next.title },
      "Navegação entre tópicos")}`;
  content.innerHTML = `<article class="page page--article"${hueStyle(t.disc)}>
    ${breadcrumb([{ label: "Início", href: "#" }, { label: `Disciplina ${t.disc}`, href: `#d/${t.disc}` }, { label: `Bloco ${bl.num}` }])}
    <header class="page-head">
      <div class="page-head-row"><span class="topic-emoji" aria-hidden="true">${t.emoji}</span>
        <div><p class="eyebrow">Disciplina ${t.disc} · Bloco ${bl.num} · ${bl.label}</p><h1 class="page-title">${t.title}</h1></div></div>
      <div class="page-meta"><span class="chip chip--accent">${t.mod}</span><span class="chip">${icon("clock")}${t.read}</span><span class="chip">#${t.id}</span>${readToggleButton(t.id, "small")}${tocButton()}</div>
    </header>
    ${articleLayout(body, foot)}
  </article>`;
  finishRender({ article: true });
}

function docFooter(kind, num) {
  if (kind === "roadmap") {
    return pager({ href: "#", label: "Início", title: "Voltar para a Central" }, { href: "#pratica", label: "Próximo passo", title: "Na prática" }, "Continuar");
  }
  const sibling = kind === "exam" ? "priorities" : "exam";
  return pager(
    { href: `#d/${num}`, label: `Disciplina ${num}`, title: discOf(num).disc.titulo },
    { href: `#${docHash(sibling, num)}`, label: "Veja também", title: DOC_META[sibling].label },
    "Continuar");
}

function renderDoc(kind, num) {
  const d = num ? discOf(num) : null;
  if (kind !== "roadmap" && !d) return renderHome();
  const token = state.routeToken;
  const meta = DOC_META[kind];
  state.currentDisc = num || null;
  rememberRoute(docHash(kind, num));
  setChrome({
    title: num ? `${meta.label} · Disciplina ${num}` : meta.label,
    short: num ? `${meta.label} · ${shortDisc(num)}` : "Trilha",
    view: kind === "roadmap" ? "trilha" : "doc",
    article: true,
    disc: num || null
  });
  const crumbs = num
    ? [{ label: "Início", href: "#" }, { label: `Disciplina ${num}`, href: `#d/${num}` }, { label: meta.label }]
    : [{ label: "Início", href: "#" }, { label: "Trilha" }];
  const doc = docOf(kind, num);
  const loading = `<div class="skeleton" role="status" aria-label="Carregando documento"><i></i><i></i><i></i><i></i><i></i></div>`;
  content.innerHTML = `<article class="page page--article"${hueStyle(num)}>
    ${breadcrumb(crumbs)}
    <header class="page-head">
      <p class="eyebrow">${num ? `Disciplina ${num} · ${d.disc.titulo}` : "Cruzando as 11 disciplinas"}</p>
      <h1 class="page-title">${meta.label}</h1>
      <div class="page-meta">${tocButton()}</div>
    </header>
    ${articleLayout(doc ? doc.html : loading, doc ? docFooter(kind, num) : "")}
  </article>`;
  content.querySelector("#articleBody").classList.add("prose--doc");
  finishRender({ article: true });
  if (doc) return;
  ensureDoc(kind, num).then(loaded => {
    if (token !== state.routeToken) return;
    content.querySelector("#articleBody").innerHTML = loaded.html;
    content.querySelector(".article-foot").innerHTML = docFooter(kind, num);
    finishRender({ article: true });
  }).catch(() => {
    if (token !== state.routeToken) return;
    content.querySelector("#articleBody").innerHTML = `<div class="state-message" role="alert"><h2>Não foi possível carregar este conteúdo</h2>
      <p>Verifique a conexão e tente de novo.</p><button type="button" class="btn" data-action="retry-route">Tentar de novo</button></div>`;
    finishRender({ article: false });
  });
}

function enhanceContent(scope) {
  scope.querySelectorAll("pre.code").forEach(pre => {
    if (pre.parentElement.classList.contains("code-block")) return;
    const code = pre.querySelector("code");
    const langMatch = code && code.className.match(/language-([\w+-]+)/);
    const lang = pre.dataset.lang || (langMatch ? langMatch[1] : "") || "código";
    const wrap = document.createElement("div");
    wrap.className = "code-block";
    wrap.innerHTML = `<div class="code-block-bar"><span class="code-lang">${escapeHtml(lang)}</span>
      <button type="button" class="code-copy" data-action="copy-code" aria-label="Copiar código ${escapeHtml(lang)}">${icon("copy")}<span>Copiar</span></button></div>`;
    pre.replaceWith(wrap);
    wrap.appendChild(pre);
    pre.tabIndex = 0;
    pre.setAttribute("role", "region");
    pre.setAttribute("aria-label", `Código ${lang}`);
  });
  scope.querySelectorAll(".table-wrap").forEach(wrap => {
    wrap.tabIndex = 0;
    wrap.setAttribute("role", "region");
    wrap.setAttribute("aria-label", "Tabela com rolagem");
  });
}

function buildToc(enabled) {
  state.toc = [];
  state.activeToc = null;
  const body = enabled ? document.getElementById("articleBody") : null;
  let headings = [];
  if (body) {
    headings = [...body.querySelectorAll("h2, h3")];
    headings.forEach((h, i) => { if (!h.id) h.id = `sec-${i}`; });
    headings = headings.filter(h => !h.closest(".disclosure, .pros-cons"));
    if (headings.length > TOC_MAX_ENTRIES) headings = headings.filter(h => h.tagName === "H2");
    if (headings.length < 2) headings = [];
  }
  state.toc = headings.map(h => ({ el: h, id: h.id, level: h.tagName === "H3" ? 3 : 2, text: h.textContent.trim() }));
  const href = escapeHtml(location.hash || "#");
  const items = state.toc.map(entry => `<li class="toc-item toc-item--h${entry.level}"><a class="toc-link" href="${href}" data-action="toc-jump" data-target="${entry.id}">${escapeHtml(entry.text)}</a></li>`).join("");
  const asideList = document.getElementById("tocList");
  if (asideList) {
    asideList.innerHTML = items;
    asideList.closest(".toc-aside").hidden = !items;
  }
  tocSheetBody.innerHTML = items ? `<ol class="toc-list">${items}</ol>` : "";
  document.querySelectorAll(".toc-trigger").forEach(btn => { btn.hidden = !items; });
}

function updateTocActive() {
  if (!state.toc.length) return;
  const offset = desktopQuery.matches ? 96 : 120;
  let active = state.toc[0].id;
  for (const entry of state.toc) {
    if (entry.el.getBoundingClientRect().top - offset <= 0) active = entry.id;
    else break;
  }
  if (active === state.activeToc) return;
  state.activeToc = active;
  document.querySelectorAll(".toc-link").forEach(link => {
    const on = link.dataset.target === active;
    link.classList.toggle("is-active", on);
    if (on) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

function updateReadingProgress() {
  if (readingProgress.hidden) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 1;
  readingProgress.firstElementChild.style.transform = `scaleX(${ratio})`;
}

let scrollQueued = false;
function onScroll() {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(() => {
    scrollQueued = false;
    updateReadingProgress();
    updateTocActive();
  });
}

function jumpTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

function finishRender({ article }) {
  enhanceContent(content);
  buildToc(article);
  renderNav();
  renderProgressSummary();
  if (state.pendingTarget && !content.querySelector(".skeleton")) {
    const target = document.getElementById(state.pendingTarget);
    state.pendingTarget = null;
    if (target) target.scrollIntoView({ block: "start" });
  }
  if (state.focusContent) {
    state.focusContent = false;
    content.focus({ preventScroll: true });
  }
  updateReadingProgress();
  updateTocActive();
}

const expandedGroups = new Set();
let navDisc;

function navLink(href, label, lead = "", trail = "") {
  const current = location.hash || "#";
  return `<a class="nav-link" href="${href}"${current === href ? ' aria-current="page"' : ""}>${lead}<span class="nav-link-text">${label}</span>${trail}</a>`;
}

function navGroupBody(d) {
  const num = d.disc.num;
  let html = `<ul class="nav-list"><li>${navLink(`#d/${num}`, "Visão geral", icon("grid"))}</li></ul>`;
  BLOCKS.filter(b => b.disc === num).forEach(bl => {
    const items = TOPICS.filter(t => t.disc === num && t.bloco === bl.id);
    if (!items.length) return;
    html += `<p class="nav-sub-label">Bloco ${bl.num} · ${bl.label}</p><ul class="nav-list">${items.map(t => {
      const isRead = read.has(t.id);
      return `<li>${navLink("#" + t.id, t.title, `<span class="nav-status${isRead ? " is-read" : ""}">${icon(isRead ? "check-circle" : "circle")}</span>`, isRead ? '<span class="sr-only"> (lido)</span>' : "")}</li>`;
    }).join("")}</ul>`;
  });
  const practices = practiceOf(num);
  const showPractices = state.practiceMode && state.currentDisc === num;
  html += `<p class="nav-sub-label">Estudo e prática</p><ul class="nav-list">
    <li>${navLink(`#vale/${num}`, DOC_META.priorities.label, icon("flag"))}</li>
    <li>${navLink(`#prova/${num}`, DOC_META.exam.label, icon("file"))}</li>
    ${practices.length ? `<li>${navLink(`#pratica/${num}`, `Na prática · ${practices.length}`, icon("wrench"))}${showPractices
      ? `<ul class="nav-list nav-list--nested">${practices.map(i => `<li>${navLink("#" + i.id, i.title, `<span class="nav-num">${i.id.split("-")[1]}</span>`)}</li>`).join("")}</ul>` : ""}</li>` : ""}
  </ul>`;
  return html;
}

function navGroup(d) {
  const num = d.disc.num;
  const open = expandedGroups.has(num);
  const list = topicsOf(num);
  const n = readCount(list);
  return `<div class="nav-group${num === state.currentDisc ? " is-current" : ""}"${hueStyle(num)}>
    <button type="button" class="nav-group-toggle" data-action="toggle-group" data-disc="${num}" aria-expanded="${open}" aria-controls="nav-group-${num}">
      <span class="nav-group-num" aria-hidden="true">${num}</span><span class="nav-group-title">${d.disc.titulo}</span>
      <span class="nav-group-count"><span class="sr-only">, </span>${n}/${list.length}<span class="sr-only"> lidos</span></span>${icon("chevron-down", "nav-group-chevron")}
    </button>
    <div class="nav-group-body" id="nav-group-${num}"${open ? "" : " hidden"}>${open ? navGroupBody(d) : ""}</div>
  </div>`;
}

function renderNav() {
  if (state.currentDisc !== navDisc) {
    navDisc = state.currentDisc;
    expandedGroups.clear();
    if (navDisc) expandedGroups.add(navDisc);
  }
  nav.innerHTML = `<ul class="nav-list">
      <li>${navLink("#", "Início", icon("home"))}</li>
      <li>${navLink("#trilha", DOC_META.roadmap.label, icon("map"))}</li>
      <li>${navLink("#pratica", "Na prática", icon("wrench"))}</li>
    </ul>
    <p class="nav-section-label" id="navDiscLabel">Disciplinas</p>
    <ul class="nav-list" aria-labelledby="navDiscLabel">${DISCIPLINES.map(d => `<li>${navGroup(d)}</li>`).join("")}</ul>`;
  revealCurrentNavLink();
}

function revealCurrentNavLink() {
  const current = nav.querySelector('[aria-current="page"]');
  if (!current) return;
  const linkRect = current.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();
  if (linkRect.top < navRect.top || linkRect.bottom > navRect.bottom) {
    nav.scrollTop += linkRect.top - navRect.top - navRect.height / 3;
  }
}

function toggleGroup(btn) {
  const num = btn.dataset.disc;
  const open = btn.getAttribute("aria-expanded") !== "true";
  const body = document.getElementById("nav-group-" + num);
  btn.setAttribute("aria-expanded", String(open));
  if (open) {
    expandedGroups.add(num);
    if (!body.innerHTML.trim()) body.innerHTML = navGroupBody(discOf(num));
    body.hidden = false;
  } else {
    expandedGroups.delete(num);
    body.hidden = true;
  }
}

function renderProgressSummary() {
  const disc = state.currentDisc;
  const list = disc ? topicsOf(disc) : TOPICS;
  const n = readCount(list);
  if (disc) progressSummary.style.setProperty("--d", `var(${discHue(disc)})`);
  else progressSummary.style.removeProperty("--d");
  progressSummary.innerHTML = `<p><span>${disc ? `Disciplina ${disc}` : "Progresso geral"}</span><span>${n} de ${list.length} lidos</span></p>
    <div class="meter" role="progressbar" aria-label="Tópicos lidos" aria-valuemin="0" aria-valuemax="${list.length}" aria-valuenow="${n}"><span style="width:${percent(n, list.length)}%"></span></div>`;
}

function toggleRead(id) {
  const nowRead = !read.has(id);
  if (nowRead) read.add(id);
  else read.delete(id);
  saveRead();
  syncReadUi(id);
  showToast(nowRead ? "Marcado como lido" : "Marcado como não lido");
}

function syncReadUi(id) {
  const isRead = read.has(id);
  document.querySelectorAll(".read-toggle").forEach(btn => {
    if (btn.dataset.id !== id) return;
    btn.setAttribute("aria-pressed", String(isRead));
    btn.querySelector(".read-toggle-label").textContent = isRead ? "Lido" : "Marcar como lido";
    btn.querySelector("use").setAttribute("href", isRead ? "#i-check-circle" : "#i-check");
  });
  const panel = content.querySelector(".read-panel");
  if (panel) {
    panel.classList.toggle("is-read", isRead);
    panel.querySelector(".read-panel-title").textContent = isRead ? "Tópico concluído" : "Terminou a leitura?";
  }
  const scrollTop = nav.scrollTop;
  renderNav();
  nav.scrollTop = scrollTop;
  renderProgressSummary();
}

const toastTimers = { hide: 0 };
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimers.hide);
  toastTimers.hide = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

const copyTimers = new WeakMap();
async function copyCode(btn) {
  const pre = btn.closest(".code-block").querySelector("pre");
  const ok = await copyText(pre.textContent);
  const label = btn.querySelector("span");
  btn.classList.toggle("is-done", ok);
  label.textContent = ok ? "Copiado" : "Falhou";
  showToast(ok ? "Código copiado" : "Não foi possível copiar");
  clearTimeout(copyTimers.get(btn));
  copyTimers.set(btn, setTimeout(() => {
    label.textContent = "Copiar";
    btn.classList.remove("is-done");
  }, 1600));
}

function setInert(value) {
  mainCol.inert = value;
  topbar.inert = value;
  bottombar.inert = value;
}

function openMenu() {
  if (desktopQuery.matches) return;
  state.menuReturn = document.activeElement;
  sidebar.classList.add("is-open");
  scrim.hidden = false;
  menuBtn.setAttribute("aria-expanded", "true");
  setInert(true);
  document.body.classList.add("is-locked");
  revealCurrentNavLink();
  sidebar.querySelector(".sidebar-close").focus({ preventScroll: true });
}

function closeMenu(restoreFocus = true) {
  if (!sidebar.classList.contains("is-open")) return;
  sidebar.classList.remove("is-open");
  scrim.hidden = true;
  menuBtn.setAttribute("aria-expanded", "false");
  setInert(false);
  document.body.classList.remove("is-locked");
  const target = state.menuReturn;
  state.menuReturn = null;
  if (restoreFocus && target && document.contains(target)) target.focus({ preventScroll: true });
}

function currentTheme() {
  return root.getAttribute("data-theme") || (darkQuery.matches ? "dark" : "light");
}
function syncThemeUi() {
  const dark = currentTheme() === "dark";
  document.querySelectorAll('[data-action="toggle-theme"]').forEach(btn => {
    btn.innerHTML = icon(dark ? "sun" : "moon");
    btn.setAttribute("aria-label", dark ? "Usar tema claro" : "Usar tema escuro");
    btn.title = dark ? "Usar tema claro" : "Usar tema escuro";
  });
  themeColor.setAttribute("content", dark ? "#16191f" : "#ffffff");
}
function applyTheme(theme) {
  if (theme) root.setAttribute("data-theme", theme);
  else root.removeAttribute("data-theme");
  syncThemeUi();
}
function toggleTheme() {
  const next = currentTheme() === "dark" ? "light" : "dark";
  storage.set(LS_THEME, next);
  applyTheme(next);
}

const SEARCH_GROUPS = ["Continuar", "Páginas", "Disciplinas", "Tópicos", "Práticas", "Provas e análises"];
const SEARCH_LIMITS = { "Páginas": 3, "Disciplinas": 4, "Tópicos": 8, "Práticas": 6, "Provas e análises": 8 };
const search = { index: null, results: [], active: -1, docsState: "idle", indexedDocs: new Set(), returnFocus: null };

function addEntry(list, entry) {
  list.push({ ...entry, titleKey: normalize(entry.title), key: normalize(`${entry.title} ${entry.sub} ${entry.extra || ""}`) });
}

function docEntryTitle(kind, disc) {
  return kind === "roadmap" ? DOC_META.roadmap.label : `${DOC_META[kind].label} · ${shortDisc(disc)}`;
}

function appendDocHeadings(list) {
  allDocRefs().forEach(({ kind, disc }) => {
    const doc = docOf(kind, disc);
    const key = `${kind}/${disc}`;
    if (!doc || search.indexedDocs.has(key)) return;
    search.indexedDocs.add(key);
    let position = 0;
    doc.html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (match, level, inner) => {
      const id = `sec-${position}`;
      position += 1;
      if (level === "2") {
        addEntry(list, { group: "Provas e análises", icon: "chevron-right", title: plainText(inner), sub: docEntryTitle(kind, disc), hash: docHash(kind, disc), target: id });
      }
      return match;
    });
  });
}

function buildSearchIndex() {
  const list = [];
  addEntry(list, { group: "Páginas", icon: "home", title: "Início", sub: SITE_NAME, hash: "", extra: "home central" });
  addEntry(list, { group: "Páginas", icon: "map", title: DOC_META.roadmap.label, sub: "Cruzando as 11 disciplinas", hash: "trilha", extra: "trilha roadmap" });
  addEntry(list, { group: "Páginas", icon: "wrench", title: "Na prática", sub: `${PRACTICE_ITEMS.length} técnicas aplicadas`, hash: "pratica", extra: "pratica tecnicas" });
  DISCIPLINES.forEach(d => addEntry(list, {
    group: "Disciplinas", icon: "book", title: `${d.disc.num} · ${plainText(d.disc.titulo)}`, sub: d.disc.autor,
    hash: `d/${d.disc.num}`, extra: `disciplina ${d.disc.num} ${shortDisc(d.disc.num)}`
  }));
  TOPICS.forEach(t => {
    const bl = blockOf(t);
    addEntry(list, {
      group: "Tópicos", icon: "book", title: plainText(t.title), sub: `${shortDisc(t.disc)} · Bloco ${bl ? bl.num : ""} · #${t.id}`,
      hash: t.id, id: t.id, extra: `${stripTags(t.short)} ${t.cola.map(c => stripTags(c[0] + " " + c[1])).join(" ")}`
    });
  });
  PRACTICE_ITEMS.forEach(i => addEntry(list, {
    group: "Práticas", icon: "wrench", title: plainText(i.title), sub: `Na prática · ${shortDisc(i.disc)} · #${i.id}`,
    hash: i.id, id: i.id, extra: stripTags(i.cenario)
  }));
  allDocRefs().forEach(({ kind, disc }) => addEntry(list, {
    group: "Provas e análises", icon: DOC_META[kind].icon, title: docEntryTitle(kind, disc),
    sub: disc ? discOf(disc).disc.titulo : "Cruzando as 11 disciplinas", hash: docHash(kind, disc),
    extra: kind === "exam" ? "prova questoes respostas" : "vale estudar prioridades analise"
  }));
  appendDocHeadings(list);
  return list;
}

function loadAllDocsForSearch() {
  if (search.docsState !== "idle") return;
  search.docsState = "loading";
  Promise.allSettled(allDocRefs().map(ref => ensureDoc(ref.kind, ref.disc))).then(results => {
    search.docsState = results.some(r => r.status === "rejected") ? "partial" : "done";
    appendDocHeadings(search.index);
    if (palette.open) renderResults();
  });
}

function suggestions() {
  const groups = [];
  const last = describeRoute(storage.get(LS_LAST));
  if (last) groups.push({ label: "Continuar", items: [{ icon: "play", title: last.title, sub: last.sub, hash: last.href.slice(1) }] });
  groups.push({ label: "Páginas", items: search.index.filter(e => e.group === "Páginas") });
  groups.push({ label: "Disciplinas", items: search.index.filter(e => e.group === "Disciplinas") });
  return groups;
}

function runSearch(query) {
  const q = normalize(query.trim());
  if (!q) return suggestions();
  const tokens = q.split(/\s+/);
  const byGroup = new Map();
  search.index.forEach((entry, order) => {
    if (!tokens.every(token => entry.key.includes(token))) return;
    let score = 0;
    if (entry.id && normalize(entry.id) === q) score += 200;
    if (entry.titleKey === q) score += 120;
    else if (entry.titleKey.startsWith(q)) score += 80;
    else if (entry.titleKey.includes(q)) score += 50;
    else if (tokens.every(token => entry.titleKey.includes(token))) score += 30;
    if (!byGroup.has(entry.group)) byGroup.set(entry.group, []);
    byGroup.get(entry.group).push({ entry, score, order });
  });
  return [...byGroup.entries()].map(([label, hits]) => {
    hits.sort((a, b) => b.score - a.score || a.order - b.order);
    return { label, top: hits[0].score, items: hits.slice(0, SEARCH_LIMITS[label] || 6).map(h => h.entry) };
  }).sort((a, b) => b.top - a.top || SEARCH_GROUPS.indexOf(a.label) - SEARCH_GROUPS.indexOf(b.label));
}

function renderResults() {
  const query = paletteInput.value;
  if (query.trim()) loadAllDocsForSearch();
  const groups = runSearch(query);
  search.results = [];
  let html = groups.map((group, gi) => `<div role="group" aria-labelledby="palette-group-${gi}">
    <p class="palette-group-label" id="palette-group-${gi}">${group.label}</p>
    ${group.items.map(item => {
      const index = search.results.push(item) - 1;
      return `<div class="palette-option" role="option" id="palette-option-${index}" data-index="${index}" aria-selected="false">
        <span class="palette-option-icon">${icon(item.icon)}</span>
        <span class="palette-option-text"><span class="palette-option-title">${escapeHtml(item.title)}</span><span class="palette-option-sub">${escapeHtml(item.sub)}</span></span></div>`;
    }).join("")}</div>`).join("");
  if (!search.results.length) html = `<p class="palette-empty">Nada encontrado para “${escapeHtml(query.trim())}”.</p>`;
  if (query.trim() && search.docsState === "loading") html += `<p class="palette-status">Carregando provas e análises…</p>`;
  if (query.trim() && search.docsState === "partial") html += `<p class="palette-status">Parte das provas e análises não carregou; os resultados podem estar incompletos.</p>`;
  paletteList.innerHTML = html;
  paletteStatus.textContent = query.trim() ? `${search.results.length} resultados` : "";
  setActive(search.results.length ? 0 : -1);
}

function setActive(index) {
  search.active = index;
  paletteList.querySelectorAll(".palette-option").forEach(option => {
    option.setAttribute("aria-selected", String(Number(option.dataset.index) === index));
  });
  if (index < 0) {
    paletteInput.removeAttribute("aria-activedescendant");
    return;
  }
  paletteInput.setAttribute("aria-activedescendant", `palette-option-${index}`);
  const option = document.getElementById(`palette-option-${index}`);
  if (option) option.scrollIntoView({ block: "nearest" });
}

function navigateTo(hash, target) {
  state.pendingTarget = target || null;
  state.focusContent = true;
  let current = location.hash.replace(/^#/, "");
  try { current = decodeURIComponent(current); } catch (error) { current = location.hash.replace(/^#/, ""); }
  if (current === hash) route();
  else location.hash = hash;
}

function choose(index) {
  const item = search.results[index];
  if (!item) return;
  search.returnFocus = null;
  palette.close();
  navigateTo(item.hash, item.target);
}

function openSearch() {
  closeMenu(false);
  if (tocSheet.open) tocSheet.close();
  if (palette.open) return;
  search.returnFocus = document.activeElement;
  if (!search.index) search.index = buildSearchIndex();
  paletteInput.value = "";
  renderResults();
  palette.showModal();
  paletteInput.focus();
}

function closeSearch() { if (palette.open) palette.close(); }

paletteInput.addEventListener("input", renderResults);
paletteInput.addEventListener("keydown", e => {
  const count = search.results.length;
  if (e.key === "ArrowDown" && count) {
    e.preventDefault();
    setActive((search.active + 1) % count);
  } else if (e.key === "ArrowUp" && count) {
    e.preventDefault();
    setActive((search.active - 1 + count) % count);
  } else if (e.key === "Enter") {
    e.preventDefault();
    choose(search.active);
  } else if (e.key === "Escape") {
    e.preventDefault();
    closeSearch();
  }
});
paletteList.addEventListener("click", e => {
  const option = e.target.closest(".palette-option");
  if (option) choose(Number(option.dataset.index));
});
paletteList.addEventListener("pointermove", e => {
  const option = e.target.closest(".palette-option");
  if (option && Number(option.dataset.index) !== search.active) setActive(Number(option.dataset.index));
});
palette.addEventListener("click", e => { if (e.target === palette) closeSearch(); });
palette.addEventListener("close", () => {
  const target = search.returnFocus;
  search.returnFocus = null;
  if (target && document.contains(target) && !target.closest("[inert]")) target.focus({ preventScroll: true });
});

tocSheet.addEventListener("click", e => { if (e.target === tocSheet) tocSheet.close(); });

function openToc() {
  if (!state.toc.length) return;
  closeMenu(false);
  tocSheet.showModal();
  const active = tocSheetBody.querySelector(".toc-link.is-active") || tocSheetBody.querySelector(".toc-link");
  if (active) {
    active.scrollIntoView({ block: "center" });
    active.focus({ preventScroll: true });
  }
}

const ACTIONS = {
  "open-menu": () => openMenu(),
  "close-menu": () => closeMenu(),
  "open-search": () => openSearch(),
  "close-search": () => closeSearch(),
  "toggle-theme": () => toggleTheme(),
  "toggle-group": el => toggleGroup(el),
  "toggle-read": el => toggleRead(el.dataset.id),
  "copy-code": el => copyCode(el),
  "open-toc": () => openToc(),
  "close-toc": () => tocSheet.close(),
  "retry-route": () => route(),
  "toc-jump": (el, e) => {
    e.preventDefault();
    if (tocSheet.open) tocSheet.close();
    jumpTo(el.dataset.target);
  },
  "skip": (el, e) => {
    e.preventDefault();
    content.focus();
  },
  "scroll-disciplines": () => {
    const heading = document.getElementById("disciplinesTitle");
    heading.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
    heading.focus({ preventScroll: true });
  }
};

document.addEventListener("click", e => {
  const actionEl = e.target.closest("[data-action]");
  if (actionEl && ACTIONS[actionEl.dataset.action]) {
    ACTIONS[actionEl.dataset.action](actionEl, e);
    return;
  }
  const link = e.target.closest('a[href^="#"]');
  if (link && sidebar.contains(link) && sidebar.classList.contains("is-open")) {
    state.focusContent = true;
    closeMenu(false);
  }
});

function isEditable(el) {
  return Boolean(el) && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
}

document.addEventListener("keydown", e => {
  if ((e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === "k") {
    e.preventDefault();
    if (palette.open) closeSearch();
    else openSearch();
    return;
  }
  if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey && !isEditable(e.target) && !palette.open && !tocSheet.open) {
    e.preventDefault();
    openSearch();
    return;
  }
  if (e.key === "Escape" && sidebar.classList.contains("is-open")) closeMenu();
});

function route() {
  state.routeToken += 1;
  let h = location.hash.replace(/^#/, "");
  try { h = decodeURIComponent(h); } catch (error) { h = ""; }
  state.practiceMode = false;
  if (!state.pendingTarget) window.scrollTo(0, 0);
  if (!h) return renderHome();
  if (h === "pratica") return renderPracticeIndex(null);
  if (h.startsWith("pratica/")) return renderPracticeIndex(h.slice(8));
  if (/^P\d+-\d+$/.test(h)) return renderPracticeItem(h);
  if (h.startsWith("d/")) return renderDisc(h.slice(2));
  if (h === "trilha") return renderDoc("roadmap", "");
  if (h.startsWith("vale/")) return renderDoc("priorities", h.slice(5));
  if (h.startsWith("prova/")) return renderDoc("exam", h.slice(6));
  if (LEGACY_IDS.includes(h)) {
    location.replace("#D1-" + h);
    return undefined;
  }
  return renderTopic(h);
}

desktopQuery.addEventListener("change", e => { if (e.matches) closeMenu(false); });
darkQuery.addEventListener("change", syncThemeUi);
window.addEventListener("hashchange", route);
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll, { passive: true });

syncThemeUi();
route();
