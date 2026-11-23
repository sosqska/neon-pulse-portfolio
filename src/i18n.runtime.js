/* =========================================================
   KeyBroski v2 — переводы RU / UK / EN / ES / PL
   Файл собирается автоматически (build.js) из словарей *.json.
   Выбор языка хранится в localStorage под ключом "kb-lang".
   ========================================================= */
(function () {
  const DICT = /*DICT*/;

  const LANGS = Object.keys(DICT);
  const NAMES = { ru: "Русский", uk: "Українська", en: "English", es: "Español", pl: "Polski" };
  const KEY = "kb-lang";
  const listeners = [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function detect() {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(fromUrl)) return fromUrl;
    try {
      const saved = localStorage.getItem(KEY);
      if (LANGS.includes(saved)) return saved;
    } catch (e) { /* хранилище недоступно */ }
    const nav = (navigator.language || "").slice(0, 2).toLowerCase();
    return LANGS.includes(nav) ? nav : "ru";
  }

  let lang = detect();
  const t = (key) => {
    const v = DICT[lang][key];
    return v !== undefined ? v : DICT.ru[key] !== undefined ? DICT.ru[key] : key;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = t(el.dataset.i18n);
      if (el.tagName === "TITLE") document.title = v;
      else el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-tags]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18nTags).map((s) => `<span>${esc(s)}</span>`).join("");
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
    document.querySelectorAll("[data-i18n-content]").forEach((el) => el.setAttribute("content", t(el.dataset.i18nContent)));
    document.querySelectorAll(".lang__btn").forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    const cur = document.getElementById("langCurrent");
    if (cur) cur.textContent = lang.toUpperCase();
  }

  function save() { try { localStorage.setItem(KEY, lang); } catch (e) { /* без сохранения */ } }

  function commit(next) {
    lang = next;
    save();
    const url = new URL(location.href);
    if (url.searchParams.has("lang")) { url.searchParams.delete("lang"); history.replaceState(null, "", url); }
    apply();
    listeners.forEach((fn) => fn(lang));
  }

  /* ---------- шторка при смене языка ---------- */
  let curtain = null;
  let busy = false;
  function getCurtain() {
    if (curtain) return curtain;
    curtain = document.createElement("div");
    curtain.className = "lang-curtain";
    curtain.setAttribute("aria-hidden", "true");
    curtain.innerHTML = '<div class="lang-curtain__panel lang-curtain__panel--back"></div>' +
      '<div class="lang-curtain__panel lang-curtain__panel--front"><span class="lang-curtain__code"></span><span class="lang-curtain__word"></span></div>';
    document.body.appendChild(curtain);
    return curtain;
  }

  function set(next) {
    if (!LANGS.includes(next) || next === lang || busy) return;
    if (reduceMotion) { commit(next); return; }
    busy = true;
    const el = getCurtain();
    el.querySelector(".lang-curtain__word").textContent = NAMES[next];
    el.querySelector(".lang-curtain__code").textContent = next.toUpperCase();
    el.className = "lang-curtain";
    void el.offsetWidth;
    el.classList.add("is-in");
    setTimeout(() => { commit(next); el.classList.add("is-out"); }, 750);
    setTimeout(() => { el.className = "lang-curtain"; busy = false; }, 1450);
  }

  /* ---------- выпадающее окошко ---------- */
  const wrap = document.getElementById("lang");
  const toggle = document.getElementById("langToggle");
  const menu = document.getElementById("langMenu");

  function openMenu(open) {
    if (!menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    wrap.classList.toggle("is-open", open);
    if (open) {
      menu.hidden = false;
      const active = menu.querySelector(".is-active") || menu.querySelector(".lang__btn");
      requestAnimationFrame(() => active.focus());
    } else {
      setTimeout(() => { if (!wrap.classList.contains("is-open")) menu.hidden = true; }, 200);
    }
  }

  if (toggle && menu) {
    toggle.addEventListener("click", (e) => { e.stopPropagation(); openMenu(!wrap.classList.contains("is-open")); });
    document.addEventListener("click", (e) => { if (wrap.classList.contains("is-open") && !wrap.contains(e.target)) openMenu(false); });
    document.addEventListener("keydown", (e) => {
      if (!wrap.classList.contains("is-open")) return;
      const items = Array.from(menu.querySelectorAll(".lang__btn"));
      const i = items.indexOf(document.activeElement);
      if (e.key === "Escape") { openMenu(false); toggle.focus(); }
      if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    });
  }

  document.querySelectorAll(".lang__btn").forEach((b) => b.addEventListener("click", () => {
    set(b.dataset.lang);
    if (menu) { openMenu(false); toggle.focus(); }
  }));

  if (new URLSearchParams(location.search).has("lang")) save();
  apply();

  window.i18n = { t, set, get lang() { return lang; }, onChange: (fn) => listeners.push(fn) };
})();
