/* =========================================================
   Переводы сайта: RU / EN / ES
   Выбор языка хранится в localStorage под ключом "kb-lang"
   и общий для всех страниц портфолио (включая демо-кейсы).
   ========================================================= */

(function () {
  const marquee = (items) => items.map((s) => `<span>${s}</span><i>✦</i>`).join("");
  const meta = (price, time) => `<span>${price}</span><span>${time}</span>`;
  const tags = (a, b) => `<span>${a}</span><span>${b}</span>`;

  const DICT = {
    ru: {
      "meta.title": "KeyBroski — команда веб-разработчиков | Сайты, которые продают",
      "meta.desc": "Команда из двух веб-разработчиков: лендинги, корпоративные сайты, интернет-магазины и веб-приложения. Дизайн, анимации, скорость и конверсия.",
      "preloader": "загружаем впечатления",
      "nav.works": "Работы", "nav.services": "Услуги", "nav.process": "Процесс", "nav.reviews": "Отзывы",
      "cta.discuss": "Обсудить проект",
      "aria.nav": "Основная навигация", "aria.menuOpen": "Открыть меню", "aria.menuClose": "Закрыть меню",
      "aria.lang": "Выбрать язык", "hero.chars": "АБВГДЕЗИКЛМНОПРСТУЭЯ#%&$@*!?<>",
      "aria.scroll": "Прокрутить вниз", "aria.prev": "Предыдущий отзыв", "aria.next": "Следующий отзыв", "aria.review": "Отзыв",
      "hero.status": "Открыты для заказов — <b>2 свободных слота</b> в этом месяце",
      "hero.l1": "Создаём сайты,", "hero.l2": "которые",
      "hero.words": ["продают", "цепляют", "запоминаются", "окупаются"],
      "hero.sub": "Лендинги, корпоративные сайты и веб-приложения с вау-дизайном, живыми анимациями и скоростью загрузки меньше секунды. Делаем так, чтобы клиент оставил заявку, а не закрыл вкладку.",
      "hero.cta1": "Получить расчёт за 24 часа", "hero.cta2": "Смотреть кейсы",
      "hero.trust1": "<b>50+</b> проектов сдано", "hero.trust2": "<b>5.0</b> ★ рейтинг на биржах", "hero.trust3": "<b>0</b> сорванных дедлайнов",
      "scroll": "скролль",
      "marquee": marquee(["Лендинги", "UI/UX дизайн", "React", "Анимации", "Интернет-магазины", "Next.js", "SEO", "Адаптив"]),
      "stat1": "реализованных проектов", "stat2": "клиентов возвращаются снова", "stat3": "средний рост заявок после редизайна", "stat4": "загрузка страницы", "stat4unit": "с",
      "works.tag": "01 — Избранные работы", "works.title": "Кейсы, которые <span class=\"gradient-text\">говорят цифрами</span>",
      "w1.tags": tags("Лендинг", "Финтех"), "w1.title": "NovaPay — платёжный сервис", "w1.desc": "Промо-лендинг с 3D-анимацией карты и калькулятором комиссий.", "w1.res": "<b>+142%</b> к конверсии в регистрацию",
      "w2.tags": tags("E-commerce", "Одежда"), "w2.title": "URBN — магазин streetwear", "w2.desc": "Интернет-магазин с быстрой корзиной и оплатой в один клик.", "w2.res": "<b>×2.4</b> средний чек за 3 месяца",
      "w3.tags": tags("Веб-приложение", "SaaS"), "w3.title": "Metricly — аналитика продаж", "w3.desc": "Дашборд с графиками в реальном времени и ролями доступа.", "w3.res": "<b>−60%</b> времени на отчёты у клиента",
      "w4.tags": tags("Корпоративный", "Ресторан"), "w4.title": "Ember — гастробар", "w4.desc": "Сайт с онлайн-бронированием столов и меню с анимацией блюд.", "w4.res": "<b>+310</b> бронирований в месяц",
      "services.tag": "02 — Услуги", "services.title": "Что мы можем <span class=\"gradient-text\">сделать для вас</span>",
      "s1.title": "Лендинг под ключ", "s1.text": "Продающая структура, уникальный дизайн, анимации, подключение форм и аналитики.", "s1.meta": meta("от 15 000 ₽", "3–7 дней"),
      "s2.title": "Корпоративный сайт", "s2.text": "Многостраничный сайт с удобной админкой, блогом и SEO-оптимизацией.", "s2.meta": meta("от 35 000 ₽", "2–3 недели"),
      "s3.title": "Интернет-магазин", "s3.text": "Каталог, фильтры, корзина, онлайн-оплата и интеграция с CRM и доставкой.", "s3.meta": meta("от 60 000 ₽", "3–5 недель"),
      "s4.title": "Веб-приложение", "s4.text": "Личные кабинеты, дашборды, SaaS-сервисы на React / Next.js с API.", "s4.meta": meta("по ТЗ", "от 1 месяца"),
      "process.tag": "03 — Как мы работаем", "process.title": "Прозрачно. Быстро. <span class=\"gradient-text\">Без сюрпризов.</span>",
      "p1.h": "Бриф и созвон", "p1.p": "Разбираемся в задаче, целевой аудитории и конкурентах. Фиксируем сроки и бюджет — бесплатно.",
      "p2.h": "Прототип и дизайн", "p2.p": "Собираем структуру и визуальную концепцию. Вы видите сайт до того, как написана первая строка кода.",
      "p3.h": "Разработка", "p3.p": "Верстаем, программируем, добавляем анимации. Показываем промежуточные результаты каждые 2–3 дня.",
      "p4.h": "Запуск и поддержка", "p4.p": "Публикуем сайт, подключаем домен и аналитику. Месяц бесплатной поддержки после сдачи.",
      "reviews.tag": "04 — Отзывы", "reviews.title": "Клиенты <span class=\"gradient-text\">говорят сами</span>",
      "r1.q": "«Ребята из KeyBroski сделали лендинг за 5 дней, хотя мы закладывали месяц. Заявки пошли в первый же вечер после запуска — такого у нас ещё не было.»", "r1.i": "А", "r1.n": "Анна К.", "r1.r": "основатель NovaPay",
      "r2.q": "«Отдельное спасибо за анимации: клиенты пишут, что сайт „живой“ и его хочется листать. Средний чек вырос в два с лишним раза.»", "r2.i": "М", "r2.n": "Максим Р.", "r2.r": "владелец URBN",
      "r3.q": "«Всегда на связи, объясняют всё простым языком и предлагают идеи, до которых мы бы сами не додумались. Работаем уже над третьим проектом.»", "r3.i": "Е", "r3.n": "Елена С.", "r3.r": "маркетолог Metricly",
      "contact.tag": "05 — Связаться", "contact.title": "Давайте сделаем<br>что-то <span class=\"gradient-text\">громкое</span>",
      "contact.text": "Расскажите о проекте — ответим в течение пары часов и пришлём примерную оценку стоимости и сроков. Это бесплатно и ни к чему не обязывает.",
      "contact.market": "Профиль на бирже",
      "form.name": "Как к вам обращаться?", "form.contact": "Telegram, телефон или email", "form.budget": "Бюджет проекта",
      "form.b1": "до 30к ₽", "form.b2": "30–80к ₽", "form.b3": "80–150к ₽", "form.b4": "150к+ ₽",
      "form.message": "Пара слов о проекте", "form.submit": "Отправить заявку",
      "form.note": "Нажимая кнопку, вы соглашаетесь на обработку контактных данных.",
      "form.error": "Заполните имя и контакт для связи", "form.ok": "Спасибо! Ответим в течение пары часов ✦",
      "mail.subject": "Заявка с портфолио", "mail.name": "Имя", "mail.contact": "Контакт", "mail.budget": "Бюджет",
      "footer.made": "Сделано с ♥ и кофе.", "footer.up": "Наверх ↑",
    },

    en: {
      "meta.title": "KeyBroski — web dev duo | Websites that sell",
      "meta.desc": "A two-person web development team: landing pages, business websites, online stores and web apps. Design, animation, speed and conversion.",
      "preloader": "loading the wow",
      "nav.works": "Work", "nav.services": "Services", "nav.process": "Process", "nav.reviews": "Reviews",
      "cta.discuss": "Let's talk",
      "aria.nav": "Main navigation", "aria.menuOpen": "Open menu", "aria.menuClose": "Close menu",
      "aria.lang": "Choose language", "hero.chars": "ABCDEFGHKLMNOPRSTUVWXYZ#%&$@*!?<>",
      "aria.scroll": "Scroll down", "aria.prev": "Previous review", "aria.next": "Next review", "aria.review": "Review",
      "hero.status": "Open for projects — <b>2 slots left</b> this month",
      "hero.l1": "We build sites", "hero.l2": "that",
      "hero.words": ["sell", "hook", "convert", "stand out"],
      "hero.sub": "Landing pages, business websites and web apps with stunning design, smooth animations and sub-second load times. Built so visitors leave a request — not the tab.",
      "hero.cta1": "Get a quote in 24 hours", "hero.cta2": "See case studies",
      "hero.trust1": "<b>50+</b> projects delivered", "hero.trust2": "<b>5.0</b> ★ rating on platforms", "hero.trust3": "<b>0</b> missed deadlines",
      "scroll": "scroll",
      "marquee": marquee(["Landing pages", "UI/UX design", "React", "Animation", "Online stores", "Next.js", "SEO", "Responsive"]),
      "stat1": "projects delivered", "stat2": "clients come back again", "stat3": "average lead growth after redesign", "stat4": "page load time", "stat4unit": "s",
      "works.tag": "01 — Selected work", "works.title": "Case studies that <span class=\"gradient-text\">speak in numbers</span>",
      "w1.tags": tags("Landing page", "Fintech"), "w1.title": "NovaPay — payment service", "w1.desc": "Promo landing page with a 3D card animation and a fee calculator.", "w1.res": "<b>+142%</b> sign-up conversion",
      "w2.tags": tags("E-commerce", "Apparel"), "w2.title": "URBN — streetwear store", "w2.desc": "Online store with a fast cart and one-click checkout.", "w2.res": "<b>×2.4</b> average order value in 3 months",
      "w3.tags": tags("Web app", "SaaS"), "w3.title": "Metricly — sales analytics", "w3.desc": "Dashboard with real-time charts and role-based access.", "w3.res": "<b>−60%</b> time spent on reports",
      "w4.tags": tags("Business site", "Restaurant"), "w4.title": "Ember — gastrobar", "w4.desc": "Website with online table booking and an animated menu.", "w4.res": "<b>+310</b> bookings per month",
      "services.tag": "02 — Services", "services.title": "What we can <span class=\"gradient-text\">do for you</span>",
      "s1.title": "Turnkey landing page", "s1.text": "Conversion-focused structure, unique design, animations, forms and analytics set up.", "s1.meta": meta("from $200", "3–7 days"),
      "s2.title": "Business website", "s2.text": "Multi-page site with an easy admin panel, blog and SEO optimization.", "s2.meta": meta("from $450", "2–3 weeks"),
      "s3.title": "Online store", "s3.text": "Catalog, filters, cart, online payments, CRM and shipping integrations.", "s3.meta": meta("from $750", "3–5 weeks"),
      "s4.title": "Web application", "s4.text": "Client portals, dashboards and SaaS products on React / Next.js with an API.", "s4.meta": meta("custom quote", "from 1 month"),
      "process.tag": "03 — How we work", "process.title": "Transparent. Fast. <span class=\"gradient-text\">No surprises.</span>",
      "p1.h": "Brief & call", "p1.p": "We dig into your goals, audience and competitors. We lock in the timeline and budget — free of charge.",
      "p2.h": "Prototype & design", "p2.p": "We build the structure and visual concept. You see the site before a single line of code is written.",
      "p3.h": "Development", "p3.p": "Layout, code and animations. We share progress every 2–3 days.",
      "p4.h": "Launch & support", "p4.p": "We publish the site, connect the domain and analytics. One month of free support after delivery.",
      "reviews.tag": "04 — Reviews", "reviews.title": "Clients <span class=\"gradient-text\">say it best</span>",
      "r1.q": "“The KeyBroski team built our landing page in 5 days when we had planned for a month. Leads started coming in the very first evening after launch — that had never happened before.”", "r1.i": "A", "r1.n": "Anna K.", "r1.r": "founder of NovaPay",
      "r2.q": "“Special thanks for the animations: customers tell us the site feels ‘alive’ and they want to keep scrolling. Our average order value more than doubled.”", "r2.i": "M", "r2.n": "Max R.", "r2.r": "owner of URBN",
      "r3.q": "“Always available, they explain everything in plain language and suggest ideas we'd never have come up with. We're already on our third project together.”", "r3.i": "E", "r3.n": "Elena S.", "r3.r": "marketer at Metricly",
      "contact.tag": "05 — Contact", "contact.title": "Let's build<br>something <span class=\"gradient-text\">loud</span>",
      "contact.text": "Tell us about your project — we'll reply within a couple of hours with a rough estimate of cost and timeline. Free and no strings attached.",
      "contact.market": "Freelance profile",
      "form.name": "Your name", "form.contact": "Telegram, phone or email", "form.budget": "Project budget",
      "form.b1": "under $400", "form.b2": "$400–1k", "form.b3": "$1k–2k", "form.b4": "$2k+",
      "form.message": "A few words about the project", "form.submit": "Send request",
      "form.note": "By clicking the button, you agree to the processing of your contact details.",
      "form.error": "Please fill in your name and contact", "form.ok": "Thank you! We'll reply within a couple of hours ✦",
      "mail.subject": "Portfolio request", "mail.name": "Name", "mail.contact": "Contact", "mail.budget": "Budget",
      "footer.made": "Made with ♥ and coffee.", "footer.up": "Back to top ↑",
    },

    es: {
      "meta.title": "KeyBroski — dúo de desarrollo web | Webs que venden",
      "meta.desc": "Equipo de dos desarrolladores web: landing pages, webs corporativas, tiendas online y aplicaciones web. Diseño, animaciones, velocidad y conversión.",
      "preloader": "cargando la magia",
      "nav.works": "Proyectos", "nav.services": "Servicios", "nav.process": "Proceso", "nav.reviews": "Opiniones",
      "cta.discuss": "Hablemos",
      "aria.nav": "Navegación principal", "aria.menuOpen": "Abrir menú", "aria.menuClose": "Cerrar menú",
      "aria.lang": "Elegir idioma", "hero.chars": "ABCDEFGHIJLMNÑOPRSTUVZ#%&$@*!?<>",
      "aria.scroll": "Desplazarse hacia abajo", "aria.prev": "Opinión anterior", "aria.next": "Opinión siguiente", "aria.review": "Opinión",
      "hero.status": "Disponibles — <b>quedan 2 plazas</b> este mes",
      "hero.l1": "Creamos webs", "hero.l2": "que",
      "hero.words": ["venden", "atrapan", "enamoran", "convierten"],
      "hero.sub": "Landing pages, webs corporativas y aplicaciones web con un diseño impactante, animaciones fluidas y carga en menos de un segundo. Hechas para que el cliente te escriba, no para que cierre la pestaña.",
      "hero.cta1": "Presupuesto en 24 horas", "hero.cta2": "Ver proyectos",
      "hero.trust1": "<b>50+</b> proyectos entregados", "hero.trust2": "<b>5.0</b> ★ valoración en plataformas", "hero.trust3": "<b>0</b> plazos incumplidos",
      "scroll": "desliza",
      "marquee": marquee(["Landing pages", "Diseño UI/UX", "React", "Animaciones", "Tiendas online", "Next.js", "SEO", "Responsive"]),
      "stat1": "proyectos realizados", "stat2": "de los clientes repiten", "stat3": "crecimiento medio de contactos tras el rediseño", "stat4": "tiempo de carga", "stat4unit": "s",
      "works.tag": "01 — Proyectos destacados", "works.title": "Casos que <span class=\"gradient-text\">hablan con cifras</span>",
      "w1.tags": tags("Landing page", "Fintech"), "w1.title": "NovaPay — servicio de pagos", "w1.desc": "Landing promocional con tarjeta animada en 3D y calculadora de comisiones.", "w1.res": "<b>+142%</b> de conversión en registros",
      "w2.tags": tags("E-commerce", "Moda"), "w2.title": "URBN — tienda streetwear", "w2.desc": "Tienda online con carrito rápido y pago en un clic.", "w2.res": "<b>×2.4</b> ticket medio en 3 meses",
      "w3.tags": tags("Aplicación web", "SaaS"), "w3.title": "Metricly — analítica de ventas", "w3.desc": "Panel con gráficos en tiempo real y roles de acceso.", "w3.res": "<b>−60%</b> de tiempo en informes",
      "w4.tags": tags("Corporativa", "Restaurante"), "w4.title": "Ember — gastrobar", "w4.desc": "Web con reservas de mesa online y carta con platos animados.", "w4.res": "<b>+310</b> reservas al mes",
      "services.tag": "02 — Servicios", "services.title": "Qué podemos <span class=\"gradient-text\">hacer por ti</span>",
      "s1.title": "Landing page llave en mano", "s1.text": "Estructura que vende, diseño único, animaciones, formularios y analítica configurados.", "s1.meta": meta("desde 190 €", "3–7 días"),
      "s2.title": "Web corporativa", "s2.text": "Web de varias páginas con panel de gestión sencillo, blog y optimización SEO.", "s2.meta": meta("desde 420 €", "2–3 semanas"),
      "s3.title": "Tienda online", "s3.text": "Catálogo, filtros, carrito, pago online e integración con CRM y envíos.", "s3.meta": meta("desde 700 €", "3–5 semanas"),
      "s4.title": "Aplicación web", "s4.text": "Áreas de cliente, paneles y productos SaaS con React / Next.js y API.", "s4.meta": meta("a medida", "desde 1 mes"),
      "process.tag": "03 — Cómo trabajamos", "process.title": "Transparente. Rápido. <span class=\"gradient-text\">Sin sorpresas.</span>",
      "p1.h": "Briefing y llamada", "p1.p": "Analizamos el objetivo, el público y la competencia. Fijamos plazos y presupuesto — sin coste.",
      "p2.h": "Prototipo y diseño", "p2.p": "Creamos la estructura y el concepto visual. Ves la web antes de escribir la primera línea de código.",
      "p3.h": "Desarrollo", "p3.p": "Maquetación, programación y animaciones. Te mostramos avances cada 2–3 días.",
      "p4.h": "Lanzamiento y soporte", "p4.p": "Publicamos la web, conectamos el dominio y la analítica. Un mes de soporte gratuito tras la entrega.",
      "reviews.tag": "04 — Opiniones", "reviews.title": "Los clientes <span class=\"gradient-text\">lo cuentan</span>",
      "r1.q": "«El equipo de KeyBroski hizo nuestra landing en 5 días cuando habíamos previsto un mes. Los primeros contactos llegaron la misma noche del lanzamiento — algo que nunca nos había pasado.»", "r1.i": "A", "r1.n": "Ana K.", "r1.r": "fundadora de NovaPay",
      "r2.q": "«Gracias especialmente por las animaciones: los clientes dicen que la web está \"viva\" y dan ganas de seguir bajando. El ticket medio se ha duplicado con creces.»", "r2.i": "M", "r2.n": "Máximo R.", "r2.r": "dueño de URBN",
      "r3.q": "«Siempre disponibles, lo explican todo de forma sencilla y proponen ideas que nunca se nos habrían ocurrido. Ya vamos por nuestro tercer proyecto juntos.»", "r3.i": "E", "r3.n": "Elena S.", "r3.r": "marketing en Metricly",
      "contact.tag": "05 — Contacto", "contact.title": "Hagamos algo<br>que <span class=\"gradient-text\">resuene</span>",
      "contact.text": "Cuéntanos tu proyecto — te respondemos en un par de horas con una estimación de coste y plazos. Gratis y sin compromiso.",
      "contact.market": "Perfil freelance",
      "form.name": "¿Cómo te llamas?", "form.contact": "Telegram, teléfono o email", "form.budget": "Presupuesto",
      "form.b1": "hasta 400 €", "form.b2": "400–1000 €", "form.b3": "1000–2000 €", "form.b4": "2000 €+",
      "form.message": "Cuéntanos un poco del proyecto", "form.submit": "Enviar solicitud",
      "form.note": "Al pulsar el botón, aceptas el tratamiento de tus datos de contacto.",
      "form.error": "Rellena tu nombre y un contacto", "form.ok": "¡Gracias! Te respondemos en un par de horas ✦",
      "mail.subject": "Solicitud desde el portfolio", "mail.name": "Nombre", "mail.contact": "Contacto", "mail.budget": "Presupuesto",
      "footer.made": "Hecho con ♥ y café.", "footer.up": "Arriba ↑",
    },
  };

  const LANGS = Object.keys(DICT);
  const KEY = "kb-lang";
  const listeners = [];

  function detect() {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(fromUrl)) return fromUrl;
    try {
      const saved = localStorage.getItem(KEY);
      if (LANGS.includes(saved)) return saved;
    } catch (e) { /* хранилище недоступно — не страшно */ }
    const nav = (navigator.language || "").slice(0, 2).toLowerCase();
    return LANGS.includes(nav) ? nav : "ru";
  }

  let lang = detect();

  const t = (key) => (DICT[lang][key] ?? DICT.ru[key] ?? key);

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = t(el.dataset.i18n);
      if (el.tagName === "TITLE") document.title = value;
      else el.innerHTML = value;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
    document.querySelectorAll("[data-i18n-content]").forEach((el) => el.setAttribute("content", t(el.dataset.i18nContent)));
    document.querySelectorAll(".lang__btn").forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    const current = document.getElementById("langCurrent");
    if (current) current.textContent = lang.toUpperCase();
  }

  function save() {
    try { localStorage.setItem(KEY, lang); } catch (e) { /* без сохранения */ }
  }

  function commit(next) {
    lang = next;
    save();
    // убираем ?lang= из адреса, чтобы он не перебивал выбор при обновлении страницы
    const url = new URL(location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.delete("lang");
      history.replaceState(null, "", url);
    }
    apply();
    listeners.forEach((fn) => fn(lang));
  }

  /* ---------- Переход между языками: шторка с названием языка ---------- */
  const NAMES = { ru: "Русский", en: "English", es: "Español" };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let curtain = null;
  let busy = false;

  function getCurtain() {
    if (curtain) return curtain;
    curtain = document.createElement("div");
    curtain.className = "lang-curtain";
    curtain.setAttribute("aria-hidden", "true");
    curtain.innerHTML = '<div class="lang-curtain__panel lang-curtain__panel--back"></div>' +
      '<div class="lang-curtain__panel lang-curtain__panel--front">' +
      '<span class="lang-curtain__code"></span><span class="lang-curtain__word"></span></div>';
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
    void el.offsetWidth;                 // сброс, чтобы анимация стартовала заново
    el.classList.add("is-in");

    setTimeout(() => {                   // экран закрыт — меняем тексты
      commit(next);
      el.classList.add("is-out");
    }, 750);
    setTimeout(() => {                   // шторка ушла — возвращаем в исходное положение
      el.className = "lang-curtain";
      busy = false;
    }, 1450);
  }

  /* ---------- Выпадающее окошко выбора языка ---------- */
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
      // ждём конца анимации закрытия, потом прячем
      setTimeout(() => { if (!wrap.classList.contains("is-open")) menu.hidden = true; }, 200);
    }
  }

  if (toggle && menu) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      openMenu(!wrap.classList.contains("is-open"));
    });
    document.addEventListener("click", (e) => {
      if (wrap.classList.contains("is-open") && !wrap.contains(e.target)) openMenu(false);
    });
    document.addEventListener("keydown", (e) => {
      if (!wrap.classList.contains("is-open")) return;
      const items = Array.from(menu.querySelectorAll(".lang__btn"));
      const i = items.indexOf(document.activeElement);
      if (e.key === "Escape") { openMenu(false); toggle.focus(); }
      if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    });
  }

  document.querySelectorAll(".lang__btn").forEach((btn) => btn.addEventListener("click", () => {
    set(btn.dataset.lang);
    if (menu) { openMenu(false); toggle.focus(); }
  }));

  if (new URLSearchParams(location.search).has("lang")) save();
  apply();

  window.i18n = {
    t,
    set,
    get lang() { return lang; },
    onChange: (fn) => listeners.push(fn),
  };
})();
