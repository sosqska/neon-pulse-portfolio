/* =========================================================
   NEON PULSE — интерактив портфолио (vanilla JS, без зависимостей)
   ========================================================= */

/* ---------- Настройки: поменяйте под себя ---------- */
const CONFIG = {
  email: "hello@example.com",                       // куда придёт заявка из формы
  heroWords: ["продают", "цепляют", "запоминаются", "окупаются"],
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const lerp = (a, b, t) => a + (b - a) * t;

/* ---------- Прелоадер ---------- */
(function preloader() {
  const el = $("#preloader");
  const count = $("#preloaderCount");
  const bar = $("#preloaderBar");
  const duration = reduceMotion ? 200 : 1500;
  const start = performance.now();

  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const value = Math.round(eased * 100);
    count.textContent = value;
    bar.style.width = value + "%";
    if (p < 1) return requestAnimationFrame(tick);

    setTimeout(() => {
      el.classList.add("is-done");
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-ready");
      setTimeout(() => el.remove(), 1100);
    }, 200);
  }
  requestAnimationFrame(tick);
})();

/* ---------- Кастомный курсор ---------- */
(function cursor() {
  if (!finePointer) return;
  const ring = $("#cursor");
  const dot = $("#cursorDot");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;

  document.body.classList.add("has-cursor");

  addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });

  document.addEventListener("mouseleave", () => document.body.classList.remove("has-cursor"));
  document.addEventListener("mouseenter", () => document.body.classList.add("has-cursor"));

  document.addEventListener("mouseover", (e) => {
    const target = e.target.closest("[data-cursor]");
    ring.classList.toggle("is-hover", target?.dataset.cursor === "hover");
    ring.classList.toggle("is-view", target?.dataset.cursor === "view");
  });

  (function loop() {
    rx = lerp(rx, mx, 0.18);
    ry = lerp(ry, my, 0.18);
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();
})();

/* ---------- Шапка, прогресс скролла, линия процесса ---------- */
(function scrollEffects() {
  const header = $("#header");
  const progress = $("#scrollProgress");
  const processList = $("#processList");
  const processLine = $("#processLine");
  let lastY = scrollY;
  let ticking = false;

  function update() {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    header.classList.toggle("is-scrolled", y > 40);
    const menuOpen = $("#nav").classList.contains("is-open");
    header.classList.toggle("is-hidden", !menuOpen && y > lastY && y > 400);
    lastY = y;

    if (processList) {
      const r = processList.getBoundingClientRect();
      const p = (innerHeight * 0.7 - r.top) / r.height;
      processLine.style.transform = `scaleY(${Math.max(0, Math.min(1, p))})`;
    }
    ticking = false;
  }

  addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();

/* ---------- Мобильное меню ---------- */
(function menu() {
  const burger = $("#burger");
  const nav = $("#nav");

  function toggle(open) {
    nav.classList.toggle("is-open", open);
    burger.classList.toggle("is-open", open);
    $("#header").classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    document.body.style.overflow = open ? "hidden" : "";
  }

  burger.addEventListener("click", () => toggle(!nav.classList.contains("is-open")));
  $$(".nav__link").forEach((link) => link.addEventListener("click", () => toggle(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") toggle(false); });
})();

/* ---------- Активный пункт меню ---------- */
(function activeNav() {
  const links = $$(".nav__link[href^='#']");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + entry.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("section[id]").forEach((s) => observer.observe(s));
})();

/* ---------- Эффект «расшифровки» слова в заголовке ---------- */
(function scrambleWord() {
  const el = $("#heroWord");
  if (!el || reduceMotion) return;
  const chars = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЮЯ#%&$@*!?<>";
  let index = 0;

  function scrambleTo(word) {
    const from = el.textContent;
    const length = Math.max(from.length, word.length);
    const queue = [];
    for (let i = 0; i < length; i++) {
      const start = Math.floor(Math.random() * 14);
      queue.push({ from: from[i] || "", to: word[i] || "", start, end: start + 10 + Math.floor(Math.random() * 14) });
    }
    let frame = 0;

    (function step() {
      let out = "";
      let done = 0;
      for (const q of queue) {
        if (frame >= q.end) { out += q.to; done++; }
        else if (frame >= q.start) out += chars[Math.floor(Math.random() * chars.length)];
        else out += q.from;
      }
      el.textContent = out;
      frame++;
      if (done < queue.length) requestAnimationFrame(step);
    })();
  }

  setInterval(() => {
    index = (index + 1) % CONFIG.heroWords.length;
    scrambleTo(CONFIG.heroWords[index]);
  }, 2800);
})();

/* ---------- Интерактивные частицы в Hero ---------- */
(function particles() {
  const canvas = $("#heroCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const mouse = { x: -9999, y: -9999 };
  const colors = ["198,255,61", "123,92,255", "255,255,255"];
  let w, h, points = [], visible = true;

  function resize() {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(130, Math.floor((w * h) / 12000));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.6 + 0.6,
      c: colors[Math.floor(Math.random() * colors.length)],
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (const p of points) {
      // лёгкое отталкивание от курсора
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 140 && dist > 0) {
        const f = (140 - dist) / 140;
        p.x += (dx / dist) * f * 2.2;
        p.y += (dy / dist) * f * 2.2;
      }
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},0.8)`;
      ctx.fill();
    }

    // линии между близкими точками
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i], b = points[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) {
          ctx.strokeStyle = `rgba(198,255,61,${(1 - d / 120) * 0.16})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      // линии к курсору
      const p = points[i];
      const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (dm < 200) {
        ctx.strokeStyle = `rgba(123,92,255,${(1 - dm / 200) * 0.5})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }

  function loop() {
    if (visible) draw();
    requestAnimationFrame(loop);
  }

  resize();
  addEventListener("resize", resize);
  canvas.parentElement.addEventListener("mousemove", (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  canvas.parentElement.addEventListener("mouseleave", () => { mouse.x = mouse.y = -9999; });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);

  if (reduceMotion) draw(); else loop();
})();

/* ---------- Появление элементов при скролле ---------- */
(function reveal() {
  const items = $$(".reveal");
  // небольшая задержка для соседних элементов — эффект «лесенки»
  items.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    el.style.setProperty("--d", siblings.indexOf(el) * 0.08 + "s");
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  items.forEach((el) => observer.observe(el));
})();

/* ---------- Счётчики ---------- */
(function counters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const duration = reduceMotion ? 1 : 1800;
      const start = performance.now();
      (function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(tick);
      })(start);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$(".counter").forEach((el) => observer.observe(el));
})();

/* ---------- 3D-наклон карточек ---------- */
(function tilt() {
  if (!finePointer || reduceMotion) return;
  $$(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transition = "transform 0.15s ease-out, border-color 0.4s";
      card.style.transform = `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s";
      card.style.transform = "";
    });
  });
})();

/* ---------- Подсветка карточек услуг за курсором ---------- */
(function spotlight() {
  $$(".spotlight").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", e.clientX - r.left + "px");
      el.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });
})();

/* ---------- Магнитные кнопки ---------- */
(function magnetic() {
  if (!finePointer || reduceMotion) return;
  $$(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
})();

/* ---------- Слайдер отзывов ---------- */
(function slider() {
  const track = $("#sliderTrack");
  const dotsWrap = $("#sliderDots");
  const slides = $$(".review", track);
  let current = 0;
  let timer;

  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", `Отзыв ${i + 1}`);
    b.dataset.cursor = "hover";
    b.addEventListener("click", () => { go(i); restart(); });
    dotsWrap.appendChild(b);
  });
  const dots = $$("button", dotsWrap);

  function go(i) {
    current = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, j) => d.classList.toggle("is-active", j === current));
  }

  function restart() {
    clearInterval(timer);
    if (!reduceMotion) timer = setInterval(() => go(current + 1), 6000);
  }

  $("#sliderPrev").addEventListener("click", () => { go(current - 1); restart(); });
  $("#sliderNext").addEventListener("click", () => { go(current + 1); restart(); });

  // свайпы на телефоне
  let startX = null;
  track.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) { go(current + (dx < 0 ? 1 : -1)); restart(); }
    startX = null;
  });

  go(0);
  restart();
})();

/* ---------- Уведомление ---------- */
function toast(text) {
  const el = $("#toast");
  el.textContent = text;
  el.classList.add("is-visible");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove("is-visible"), 4000);
}

/* ---------- Форма заявки ---------- */
(function form() {
  const formEl = $("#contactForm");

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(formEl);
    let valid = true;

    ["name", "contact"].forEach((field) => {
      const input = formEl.elements[field];
      const wrap = input.closest(".form__field");
      const ok = input.value.trim().length > 1;
      wrap.classList.remove("is-error");
      if (!ok) { void wrap.offsetWidth; wrap.classList.add("is-error"); valid = false; }
    });

    if (!valid) { toast("Заполните имя и контакт для связи"); return; }

    const subject = `Заявка с портфолио — ${data.get("name")}`;
    const body =
      `Имя: ${data.get("name")}\n` +
      `Контакт: ${data.get("contact")}\n` +
      `Бюджет: ${data.get("budget")}\n\n` +
      `${data.get("message") || ""}`;

    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast("Спасибо! Отвечу в течение пары часов ✦");
    formEl.reset();
  });
})();

/* ---------- Год в подвале ---------- */
$("#year").textContent = new Date().getFullYear();
