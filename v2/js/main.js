/* =========================================================
   KeyBroski v2 — интерактив (vanilla JS)
   ========================================================= */

const CONFIG = { email: "buzukdenis3@gmail.com" };

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const t = (k) => window.i18n.t(k);

/* ---------- разбивка текста на слова (сохраняет вложенные теги) ---------- */
function splitWords(el) {
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const parts = n.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(p));
          else { const s = document.createElement("span"); s.className = "w"; s.textContent = p; frag.appendChild(s); }
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && !n.classList.contains("w")) walk(n);
    });
  };
  walk(el);
  return $$(".w", el);
}

/* ---------- заголовок проявляется из размытия ---------- */
(function blurIn() {
  const el = $(".blur-in");
  if (!el) return;
  const run = (instant) => {
    const words = splitWords(el);
    words.forEach((w, i) => w.style.setProperty("--d", (instant ? 0 : 0.15 + i * 0.09) + "s"));
    el.classList.remove("is-in");
    void el.offsetWidth; // фиксируем стартовое состояние — затем запускаем проявление
    el.classList.add("is-in");
  };
  run(reduceMotion);
  window.i18n.onChange(() => run(true));
})();

/* ---------- меняющееся слово в заголовке ----------
   Компьютер: эффект «расшифровки», как в v1.
   Телефон: слова прокручиваются вверх в плашке, как барабан.
   Размер слова один на весь язык — подобран по самому длинному слову, чтобы ничего не прыгало. */
(function changingWord() {
  const mobileMQ = window.matchMedia("(max-width: 640px)");
  const el = () => document.getElementById("heroWord");
  let index = 0;
  let run = 0;      // номер анимации «расшифровки» — новая обрывает старую
  let timer = null;

  // один размер для всех слов языка: самое длинное слово должно влезть в строку
  function fitAll() {
    const node = el();
    if (!node) return;
    const line = node.closest(".hl");
    node.style.fontSize = "";
    const probe = document.createElement("span");
    probe.className = "hero-word__probe";
    line.appendChild(probe);
    let max = 0;
    t("hero.words").forEach((w) => { probe.textContent = w; max = Math.max(max, probe.getBoundingClientRect().width); });
    probe.remove();
    const pad = mobileMQ.matches ? 0.5 : 0.12; // плашка на телефоне добавляет внутренние отступы (в em)
    const fs = parseFloat(getComputedStyle(node).fontSize);
    // доступная ширина — по всему заголовку (строка при центровке сжимается до ширины слова)
    const title = node.closest(".hero__title");
    const avail = title.clientWidth - parseFloat(getComputedStyle(line).paddingLeft) - 6 - pad * fs;
    const scale = max > avail ? avail / max : 1;
    if (scale < 1) node.style.fontSize = scale.toFixed(3) + "em";
    // на компьютере слово по центру — фиксируем ширину по самому длинному, чтобы строка не прыгала
    node.style.minWidth = mobileMQ.matches ? "" : Math.ceil(max * scale) + "px";
  }

  /* --- телефон: барабан --- */
  function buildRoller() {
    const node = el();
    if (!node) return;
    const words = t("hero.words");
    node.classList.add("is-roll");
    // в конце — копия первого слова, чтобы круг замыкался без рывка
    node.innerHTML = `<span class="roll"><span class="roll__track">${words.concat(words[0]).map((w) => `<span class="roll__item">${w}</span>`).join("")}</span></span>`;
    const roll = node.querySelector(".roll");
    // ширина плашки — по самому длинному слову, чтобы она не дёргалась
    let max = 0;
    node.querySelectorAll(".roll__item").forEach((s) => { max = Math.max(max, s.getBoundingClientRect().width); });
    roll.style.width = Math.ceil(max) + "px";
  }

  function stepRoller() {
    const node = el();
    const track = node && node.querySelector(".roll__track");
    if (!track) return;
    const count = t("hero.words").length;
    index++;
    track.style.transition = "";
    track.style.transform = `translateY(${-index * 100 / (count + 1)}%)`;
    if (index === count) {
      // дошли до копии первого слова — незаметно возвращаемся в начало
      setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = "translateY(0)";
        index = 0;
        void track.offsetWidth;
        track.style.transition = "";
      }, 650);
    }
  }

  /* --- компьютер: «расшифровка» --- */
  function scrambleTo(word) {
    const node = el();
    if (!node) return;
    const chars = t("hero.chars");
    const from = node.textContent;
    const length = Math.max(from.length, word.length);
    const queue = [];
    for (let i = 0; i < length; i++) {
      const start = Math.floor(Math.random() * 14);
      queue.push({ from: from[i] || "", to: word[i] || "", start, end: start + 10 + Math.floor(Math.random() * 14) });
    }
    let frame = 0;
    const id = ++run;
    (function step() {
      if (id !== run || !node.isConnected) return;
      let out = "", done = 0;
      for (const q of queue) {
        if (frame >= q.end) { out += q.to; done++; }
        else if (frame >= q.start) out += chars[Math.floor(Math.random() * chars.length)].toLowerCase();
        else out += q.from;
      }
      node.textContent = out;
      frame++;
      if (done < queue.length) requestAnimationFrame(step);
    })();
  }

  function stepScramble() {
    const words = t("hero.words");
    index = (index + 1) % words.length;
    scrambleTo(words[index]);
  }

  /* --- запуск / перезапуск (смена языка, поворот экрана) --- */
  function setup() {
    clearInterval(timer);
    run++;
    index = 0;
    const node = el();
    if (!node) return;
    node.classList.remove("is-roll");
    node.textContent = t("hero.words")[0];
    fitAll();
    if (mobileMQ.matches) buildRoller();
    if (reduceMotion) return;
    timer = setInterval(mobileMQ.matches ? stepRoller : stepScramble, mobileMQ.matches ? 2400 : 2800);
  }

  setTimeout(setup, 1200); // первое слово видно, пока заголовок проявляется
  if (document.fonts) document.fonts.ready.then(() => setTimeout(setup, 1300));
  window.i18n.onChange(() => setTimeout(setup, 0));
  mobileMQ.addEventListener("change", setup);
  // на телефоне resize срабатывает и при прокрутке (прячется адресная строка) — реагируем только на смену ширины
  let rt, lastW = innerWidth;
  addEventListener("resize", () => {
    if (innerWidth === lastW) return;
    lastW = innerWidth;
    clearTimeout(rt);
    rt = setTimeout(setup, 200);
  });
})();

/* ---------- заявление: слова загораются при прокрутке ---------- */
(function statement() {
  const el = $("#statementTitle");
  if (!el) return;
  let words = splitWords(el);
  let ticking = false;
  function update() {
    const r = el.getBoundingClientRect();
    const start = innerHeight * 0.85, end = innerHeight * 0.35;
    const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height * 0.5)));
    const lit = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle("is-lit", reduceMotion || i < lit));
    ticking = false;
  }
  addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
  window.i18n.onChange(() => { words = splitWords(el); update(); });
  update();
})();

/* ---------- шапка ---------- */
(function header() {
  const h = $("#header");
  let last = scrollY;
  addEventListener("scroll", () => {
    const y = scrollY;
    h.classList.toggle("is-scrolled", y > 20);
    h.classList.toggle("is-hidden", y > last && y > 500 && !document.body.classList.contains("menu-open"));
    last = y;
  }, { passive: true });
})();

/* ---------- меню на весь экран ---------- */
(function menu() {
  const m = $("#menu"), btn = $("#menuBtn");
  function open(on) {
    m.classList.toggle("is-open", on);
    m.setAttribute("aria-hidden", String(!on));
    btn.setAttribute("aria-expanded", String(on));
    document.body.classList.toggle("menu-open", on);
    document.body.style.overflow = on ? "hidden" : "";
    if (on) setTimeout(() => $(".menu__close", m).focus(), 300); else btn.focus({ preventScroll: true });
  }
  btn.addEventListener("click", () => open(true));
  $$("[data-menu-close]", m).forEach((el) => el.addEventListener("click", () => open(false)));
  $$("[data-menu-link]", m).forEach((a) => a.addEventListener("click", () => open(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape" && m.classList.contains("is-open")) open(false); });
})();

/* ---------- аккордеоны: услуги и вопросы ---------- */
(function accordions() {
  $$(".acc").forEach((acc) => {
    $$(".acc__item", acc).forEach((item) => {
      const head = $(".acc__head", item);
      head.addEventListener("click", () => {
        const on = !item.classList.contains("is-open");
        $$(".acc__item.is-open", acc).forEach((o) => { o.classList.remove("is-open"); $(".acc__head", o).setAttribute("aria-expanded", "false"); });
        item.classList.toggle("is-open", on);
        head.setAttribute("aria-expanded", String(on));
      });
    });
  });
})();

/* ---------- услуги: строки с большими названиями + превью за курсором ---------- */
(function serviceRows() {
  const wrap = $("#srows");
  if (!wrap) return;
  const rows = $$(".srow", wrap);
  const preview = $("#spreview");
  const card = preview && $(".spreview__card", preview);
  // цвет превью для каждого вида сайта
  const tints = [
    "radial-gradient(circle at 30% 20%, #6f6f76, #1a1a1d)",
    "radial-gradient(circle at 70% 30%, #7b5cff, #1a1238)",
    "radial-gradient(circle at 30% 30%, #ff5c8a, #2a0a17)",
    "radial-gradient(circle at 60% 20%, #ff9a3d, #2b1203)",
    "radial-gradient(circle at 30% 70%, #1fd1a1, #04201b)",
    "radial-gradient(circle at 50% 30%, #9a9aa3, #141416)",
  ];

  function activate(row) {
    rows.forEach((r) => {
      const on = r === row;
      r.classList.toggle("is-active", on);
      $(".srow__head", r).setAttribute("aria-expanded", String(on));
    });
    if (card) card.style.setProperty("--pv", tints[(+row.dataset.srow - 1) % tints.length]);
  }

  rows.forEach((r) => {
    $(".srow__head", r).addEventListener("click", () => activate(r));
    if (finePointer) r.addEventListener("mouseenter", () => activate(r));
  });
  activate(rows[0]);

  // превью плавно догоняет курсор (только мышь)
  if (!preview || !finePointer || reduceMotion) return;
  let x = 0, y = 0, tx = 0, ty = 0, raf = null;
  const loop = () => {
    x += (tx - x) * 0.14;
    y += (ty - y) * 0.14;
    preview.style.transform = `translate(${x}px, ${y}px)`;
    raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(loop) : null;
  };
  wrap.addEventListener("mousemove", (e) => {
    const r = wrap.getBoundingClientRect();
    tx = e.clientX - r.left - 150;   // центр карточки под курсором
    ty = e.clientY - r.top - 110;
    if (!wrap.classList.contains("is-hover")) { x = tx; y = ty; wrap.classList.add("is-hover"); }
    if (!raf) raf = requestAnimationFrame(loop);
  });
  wrap.addEventListener("mouseleave", () => wrap.classList.remove("is-hover"));
})();

/* ---------- появление при прокрутке ---------- */
(function reveal() {
  const els = $$(".reveal");
  els.forEach((el) => {
    const sib = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    el.style.setProperty("--d", Math.min(sib.indexOf(el), 5) * 0.07 + "s");
  });
  if (reduceMotion || !("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("is-in")); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  els.forEach((el) => io.observe(el));
})();

/* ---------- преимущества: список + панель фиксированной высоты ---------- */
(function advantages() {
  const items = $$(".adv__item"), panel = $("#advPanel"), inner = $("#advInner");
  if (!items.length) return;
  let current = 1;

  const fillInto = (root, i) => {
    $(".adv__label", root).textContent = `${t(`adv${i}.t`)} (${i})`;
    $(".adv__text", root).textContent = t(`adv${i}.p`);
    $(".adv__bullets", root).innerHTML = t(`adv${i}.list`);
  };

  function render(i, animate) {
    current = i;
    items.forEach((it) => {
      const on = +it.dataset.adv === i;
      it.classList.toggle("is-active", on);
      it.setAttribute("aria-selected", String(on));
    });
    if (!animate || reduceMotion) { fillInto(inner, i); return; }
    inner.classList.add("is-switching");
    setTimeout(() => { fillInto(inner, i); inner.classList.remove("is-switching"); }, 170);
  }

  // высота — по самому длинному пункту, чтобы ниже ничего не прыгало
  function lockHeight() {
    const probe = inner.cloneNode(true);
    probe.removeAttribute("id");
    $$("[id]", probe).forEach((el) => el.removeAttribute("id"));
    probe.classList.remove("is-switching");
    probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;left:0;top:0;width:${inner.clientWidth}px;min-height:0`;
    panel.appendChild(probe);
    let max = 0;
    items.forEach((it) => { fillInto(probe, +it.dataset.adv); max = Math.max(max, probe.offsetHeight); });
    probe.remove();
    inner.style.minHeight = max + "px";
  }

  items.forEach((it) => {
    const i = +it.dataset.adv;
    it.addEventListener("click", () => {
      if (i !== current) render(i, true);
      if (innerWidth <= 900) panel.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    });
    if (finePointer) it.addEventListener("mouseenter", () => { if (i !== current) render(i, true); });
  });

  let rt;
  addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(lockHeight, 150); });
  render(1, false);
  lockHeight();
  if (document.fonts) { document.fonts.ready.then(lockHeight); document.fonts.addEventListener("loadingdone", lockHeight); }
  window.i18n.onChange(() => { render(current, false); lockHeight(); });
})();

/* ---------- уведомление ---------- */
function toast(text) {
  const el = $("#toast");
  el.textContent = text;
  el.classList.add("is-visible");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove("is-visible"), 4000);
}

/* ---------- бриф (форма внизу и её копия в окне) ---------- */
function bindBriefForm(f, onSent) {
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    ["name", "contact"].forEach((n) => {
      const input = f.elements[n], wrap = input.closest(".field");
      const good = input.value.trim().length > 1;
      wrap.classList.toggle("is-error", !good);
      if (!good) ok = false;
    });
    if (!ok) { toast(t("form.error")); return; }

    const services = $$('input[name="service"]:checked', f).map((c) => t("form." + c.value)).join(", ") || "—";
    const budget = t("form." + (($('input[name="budget"]:checked', f) || {}).value || "b1"));
    const body =
      `${t("mail.name")}: ${f.elements.name.value}\n` +
      `${t("mail.contact")}: ${f.elements.contact.value}\n` +
      `${t("mail.service")}: ${services}\n` +
      `${t("mail.budget")}: ${budget}\n\n${f.elements.message.value || ""}`;
    location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(t("mail.subject"))}&body=${encodeURIComponent(body)}`;
    toast(t("form.ok"));
    f.reset();
    if (onSent) onSent();
  });
}
bindBriefForm($("#briefForm"));

/* =========================================================
   Всплывающие окна
   ========================================================= */
const Modal = (function () {
  let current = null;
  let lastFocus = null;

  function open(id) {
    const m = document.getElementById(id);
    if (!m) return;
    if (current && current !== m) close(true);
    lastFocus = document.activeElement;
    m.hidden = false;
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";
    void m.offsetWidth; // фиксируем стартовое состояние, чтобы сработала анимация
    m.classList.add("is-open");
    current = m;
    setTimeout(() => {
      const first = m.querySelector("input, textarea, a.btn, button:not(.modal__close)");
      if (first) first.focus({ preventScroll: true });
    }, 120);
  }

  function close(instant) {
    if (!current) return;
    const m = current;
    current = null;
    m.classList.remove("is-open");
    const done = () => {
      m.hidden = true;
      if (!current) { document.body.classList.remove("modal-open"); document.body.style.overflow = ""; }
    };
    if (instant || reduceMotion) done(); else setTimeout(done, 380);
    if (lastFocus && !instant) lastFocus.focus({ preventScroll: true });
  }

  document.addEventListener("click", (e) => { if (e.target.closest("[data-close]") && current) close(); });
  addEventListener("keydown", (e) => {
    if (!current) return;
    if (e.key === "Escape") close();
    // фокус не уходит из окна по Tab
    if (e.key === "Tab") {
      const f = [...current.querySelectorAll("a[href], button, input, textarea")].filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  return { open, close };
})();

/* ---------- окно брифа: копия формы снизу ---------- */
const modalForm = (function () {
  const src = $("#briefForm");
  const f = src.cloneNode(true);
  f.id = "modalBriefForm";
  f.classList.remove("reveal", "is-in");
  $$("[id]", f).forEach((el) => { el.id = "m" + el.id; });
  $$("label[for]", f).forEach((l) => l.setAttribute("for", "m" + l.getAttribute("for")));
  $("#modalFormSlot").appendChild(f);
  bindBriefForm(f, () => Modal.close());
  return f;
})();

function openBrief({ service, message } = {}) {
  modalForm.reset();
  $$(".field", modalForm).forEach((w) => w.classList.remove("is-error"));
  if (service) { const c = $(`input[name="service"][value="${service}"]`, modalForm); if (c) c.checked = true; }
  if (message) modalForm.elements.message.value = message;
  Modal.open("modalBrief");
}

document.addEventListener("click", (e) => {
  const trigger = e.target.closest('[data-modal="brief"]');
  if (!trigger) return;
  e.preventDefault();
  closeFab();
  openBrief({ service: trigger.dataset.service });
});

/* ---------- окно проекта ---------- */
(function projects() {
  const slot = $("#projectSlot"), openLink = $("#projectOpen"), like = $("#projectLike");
  let currentName = "";

  function show(i) {
    const card = $(`.work[data-project="${i}"]`);
    if (!card) return;
    slot.innerHTML = "";
    slot.appendChild(card.querySelector(".work__visual").cloneNode(true));
    const info = document.createElement("div");
    info.className = "project__info";
    [".work__meta", ".work__title", ".work__desc", ".tags"].forEach((s) => info.appendChild(card.querySelector(s).cloneNode(true)));
    slot.appendChild(info);
    $(".work__title", info).id = "mpTitle";
    openLink.href = card.getAttribute("href");
    currentName = card.querySelector(".work__title").textContent;
    Modal.open("modalProject");
  }

  document.addEventListener("click", (e) => {
    const card = e.target.closest("[data-project]");
    if (!card || e.metaKey || e.ctrlKey || e.shiftKey) return; // Ctrl/⌘+клик — как обычная ссылка
    e.preventDefault();
    show(card.dataset.project);
  });

  like.addEventListener("click", () => {
    openBrief({ message: t("form.prefill").replace("{name}", currentName) });
  });
})();

/* ---------- плавающая кнопка «Связаться» ---------- */
const fab = $("#fab"), fabBtn = $("#fabBtn"), fabCard = $("#fabCard");
function closeFab() {
  if (!fab.classList.contains("is-open")) return;
  fab.classList.remove("is-open");
  fabBtn.setAttribute("aria-expanded", "false");
  setTimeout(() => { if (!fab.classList.contains("is-open")) fabCard.hidden = true; }, 300);
}
fabBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (fab.classList.contains("is-open")) { closeFab(); return; }
  fabCard.hidden = false;
  void fabCard.offsetWidth;
  fab.classList.add("is-open");
  fabBtn.setAttribute("aria-expanded", "true");
});
document.addEventListener("click", (e) => { if (!fab.contains(e.target)) closeFab(); });
addEventListener("keydown", (e) => { if (e.key === "Escape") closeFab(); });

$("#year").textContent = new Date().getFullYear();
