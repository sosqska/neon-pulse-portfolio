// Собирает D:/neon-pulse-portfolio/v2/index.html и js/i18n.js из шаблона и словарей
const fs = require("fs");
const path = require("path");
const SRC = __dirname;
const OUT = path.join(__dirname, "..");
const VERSION = process.argv[2] || "1";

const LANGS = ["ru", "uk", "en", "es", "pl"];
const D = Object.fromEntries(LANGS.map((l) => [l, JSON.parse(fs.readFileSync(path.join(SRC, `${l}.json`), "utf8"))]));
const ru = D.ru;

// приводим списки преимуществ к HTML (<li><b>Заголовок.</b> текст</li>) для каждого языка
for (const l of LANGS) for (let i = 1; i <= 5; i++) {
  const k = `adv${i}.list`;
  if (Array.isArray(D[l][k])) D[l][k] = D[l][k].map(([b, d]) => `<li><b>${b}.</b> ${d}</li>`).join("");
}

// проверка ключей
for (const l of LANGS.slice(1)) {
  const miss = Object.keys(ru).filter((k) => !(k in D[l]));
  if (miss.length) throw new Error(`${l}: missing ${miss.join(",")}`);
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const tags = (key) => ru[key].map((s) => `<span>${esc(s)}</span>`).join("");
const pad = (n) => String(n).padStart(2, "0");

/* ---------- блоки ---------- */
let SERVICES = "";
for (let i = 1; i <= 6; i++) SERVICES += `
          <div class="acc__item">
            <button type="button" class="acc__head" aria-expanded="false">
              <span class="mono acc__num">${pad(i)}</span>
              <span class="acc__title" data-i18n="sv${i}.t">${ru[`sv${i}.t`]}</span>
              <span class="acc__meta"><span data-i18n="sv${i}.price">${ru[`sv${i}.price`]}</span><span class="dim" data-i18n="sv${i}.time">${ru[`sv${i}.time`]}</span></span>
              <span class="acc__plus" aria-hidden="true"></span>
            </button>
            <div class="acc__body"><div class="acc__body-inner">
              <p data-i18n="sv${i}.d">${ru[`sv${i}.d`]}</p>
              <div class="acc__row"><div class="tags" data-i18n-tags="sv${i}.tags">${tags(`sv${i}.tags`)}</div>
              <button type="button" class="btn btn--white btn--sm acc__order" data-modal="brief" data-service="${["s1","s4","s2","s3","s5","s6"][i - 1]}"><span data-i18n="services.order">${ru["services.order"]}</span> ↗</button></div>
            </div></div>
          </div>`;

const SLUGS = ["novapay", "urbn", "metricly", "ember"];
const MOCKS = [
  `<div class="mock__body"><div class="mock__lines"><i></i><i></i><i class="short"></i></div><div class="mock__card3d"></div><div class="mock__btn"></div></div>`,
  `<div class="mock__body mock__body--grid"><i></i><i></i><i></i><i></i><i></i><i></i></div>`,
  `<div class="mock__body mock__body--dash"><div class="mock__side"></div><div class="mock__bars"><i style="--h:40%"></i><i style="--h:65%"></i><i style="--h:50%"></i><i style="--h:85%"></i><i style="--h:70%"></i><i style="--h:95%"></i></div></div>`,
  `<div class="mock__body mock__body--food"><div class="mock__plate"></div><div class="mock__lines"><i></i><i class="short"></i></div></div>`,
];
const workCards = (prefix, withModal) => { let s = ""; for (let i = 1; i <= 4; i++) s += `
          <a class="work reveal" href="${prefix}projects/${SLUGS[i - 1]}/index.html"${withModal ? ` data-project="${i}"` : ""}>
            <div class="work__visual work__visual--${i}"><div class="mock"><div class="mock__bar"><i></i><i></i><i></i></div>${MOCKS[i - 1]}</div></div>
            <div class="work__meta mono"><span data-i18n="w${i}.cat">${ru[`w${i}.cat`]}</span><span>2026</span><span class="work__badge" data-i18n="hero.concept">${ru["hero.concept"]}</span></div>
            <h3 class="work__title" data-i18n="w${i}.title">${ru[`w${i}.title`]}</h3>
            <p class="work__desc" data-i18n="w${i}.desc">${ru[`w${i}.desc`]}</p>
            <div class="work__foot">
              <div class="tags" data-i18n-tags="w${i}.tags">${tags(`w${i}.tags`)}</div>
              <span class="work__open"><span data-i18n="works.open">${ru["works.open"]}</span> ↗</span>
            </div>
          </a>`; return s; };
const WORKS = workCards("../", true);
const WORKS_PAGE = workCards("../../", false);

let ADV_ITEMS = "";
for (let i = 1; i <= 5; i++) ADV_ITEMS += `
            <button type="button" class="adv__item${i === 1 ? " is-active" : ""}" data-adv="${i}" role="tab" aria-selected="${i === 1}" aria-controls="advPanel">
              <span class="mono adv__num">${pad(i)}</span><span class="adv__name" data-i18n="adv${i}.t">${ru[`adv${i}.t`]}</span>
            </button>`;

let STEPS = "";
for (let i = 1; i <= 5; i++) STEPS += `
          <li class="step reveal">
            <span class="mono step__num">${pad(i)}</span>
            <h3 class="step__title" data-i18n="p${i}.h">${ru[`p${i}.h`]}</h3>
            <p class="step__text" data-i18n="p${i}.p">${ru[`p${i}.p`]}</p>
          </li>`;

let REVIEWS = "";
for (let i = 1; i <= 3; i++) REVIEWS += `
          <figure class="review reveal">
            <span class="mono review__badge" data-i18n="reviews.badge">${ru["reviews.badge"]}</span>
            <blockquote data-i18n="r${i}.q">${ru[`r${i}.q`]}</blockquote>
            <figcaption><span class="review__avatar" aria-hidden="true">${i === 3 ? "K" : "?"}</span><span><b data-i18n="r${i}.n">${ru[`r${i}.n`]}</b><small data-i18n="r${i}.r">${ru[`r${i}.r`]}</small></span></figcaption>
            <span class="mono review__pager">${pad(i)} / 03</span>
          </figure>`;

let FAQ = "";
for (let i = 1; i <= 7; i++) FAQ += `
          <div class="acc__item">
            <button type="button" class="acc__head" aria-expanded="false">
              <span class="mono acc__num">${pad(i)}</span>
              <span class="acc__title acc__title--q" data-i18n="q${i}">${ru[`q${i}`]}</span>
              <span class="acc__plus" aria-hidden="true"></span>
            </button>
            <div class="acc__body"><div class="acc__body-inner"><p data-i18n="a${i}">${ru[`a${i}`]}</p></div></div>
          </div>`;

let SERVICE_CHIPS = "";
for (let i = 1; i <= 7; i++) SERVICE_CHIPS += `
            <label class="chip"><input type="checkbox" name="service" value="s${i}"><span data-i18n="form.s${i}">${ru[`form.s${i}`]}</span></label>`;
let BUDGET_CHIPS = "";
for (let i = 1; i <= 4; i++) BUDGET_CHIPS += `
            <label class="chip"><input type="radio" name="budget" value="b${i}"${i === 1 ? " checked" : ""}><span data-i18n="form.b${i}">${ru[`form.b${i}`]}</span></label>`;

let FOOTER_SERVICES = "";
for (let i = 1; i <= 6; i++) FOOTER_SERVICES += `
          <a href="#services" data-i18n="sv${i}.t">${ru[`sv${i}.t`]}</a>`;

/* ---------- сборка ---------- */
let html = fs.readFileSync(path.join(SRC, "template.html"), "utf8");
const blocks = { SERVICES, WORKS, WORKS_PAGE, ADV_ITEMS, STEPS, REVIEWS, FAQ, SERVICE_CHIPS, BUDGET_CHIPS, FOOTER_SERVICES, VERSION };
html = html.replace(/\{\{([A-Z_]+)\}\}/g, (m, k) => (k in blocks ? blocks[k] : m));
html = html.replace(/\{\{([a-z0-9.]+)\}\}/gi, (m, k) => {
  if (!(k in ru)) throw new Error("unknown key in template: " + k);
  return k === "meta.desc" || k === "meta.title" || k.startsWith("aria.") ? esc(ru[k]).replace(/&amp;nbsp;/g, " ") : ru[k];
});
const left = html.match(/\{\{[^}]+\}\}/g);
if (left) throw new Error("unfilled: " + left.join(","));

fs.mkdirSync(path.join(OUT, "js"), { recursive: true });
fs.mkdirSync(path.join(OUT, "css"), { recursive: true });
fs.writeFileSync(path.join(OUT, "index.html"), html);

// страница «Все работы»
let wp = fs.readFileSync(path.join(SRC, "template-works.html"), "utf8");
wp = wp.replace(/\{\{([A-Z_]+)\}\}/g, (m, k) => (k in blocks ? blocks[k] : m));
wp = wp.replace(/\{\{([a-z0-9.]+)\}\}/gi, (m, k) => {
  if (!(k in ru)) throw new Error("unknown key in works template: " + k);
  return k === "wp.text" || k === "wp.title" || k.startsWith("aria.") ? esc(ru[k]) : ru[k];
});
fs.mkdirSync(path.join(OUT, "works"), { recursive: true });
fs.writeFileSync(path.join(OUT, "works/index.html"), wp);

const runtime = fs.readFileSync(path.join(SRC, "i18n.runtime.js"), "utf8").replace("/*DICT*/", JSON.stringify(D));
fs.writeFileSync(path.join(OUT, "js/i18n.js"), runtime);

// проверка: все data-i18n ключи есть во всех языках
const used = new Set([...html.matchAll(/data-i18n(?:-tags|-aria|-content)?="([^"]+)"/g)].map((m) => m[1]));
for (const l of LANGS) {
  const miss = [...used].filter((k) => !(k in D[l]));
  console.log(l, miss.length ? "MISSING " + miss.join(",") : `ok (${used.size} keys)`);
}
console.log("built v" + VERSION, (html.length / 1024).toFixed(1) + " KB html");
