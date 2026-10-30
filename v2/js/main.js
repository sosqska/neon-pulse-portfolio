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
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-in")));
  };
  run(reduceMotion);
  window.i18n.onChange(() => run(true));
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
  // первая услуга открыта сразу, чтобы было видно, что строки раскрываются
  const first = $("#servicesAcc .acc__item");
  if (first) { first.classList.add("is-open"); $(".acc__head", first).setAttribute("aria-expanded", "true"); }
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
