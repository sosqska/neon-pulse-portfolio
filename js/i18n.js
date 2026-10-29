/* =========================================================
   Переводы сайта: RU / EN / ES
   Выбор языка хранится в localStorage под ключом "kb-lang"
   и общий для всех страниц портфолио (включая демо-кейсы).
   ========================================================= */

(function () {
  const marquee = (items) => items.map((s) => `<span>${s}</span><i>✦</i>`).join("");
  const meta = (price, time) => `<span>${price}</span>` + (time ? `<span>${time}</span>` : "");
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
      "works.tag": "03 — Избранные работы", "works.title": "Кейсы, которые <span class=\"gradient-text\">говорят цифрами</span>",
      "w1.tags": tags("Лендинг", "Финтех"), "w1.title": "NovaPay — платёжный сервис", "w1.desc": "Промо-лендинг с 3D-анимацией карты и калькулятором комиссий.", "w1.res": "<b>+142%</b> к конверсии в регистрацию",
      "w2.tags": tags("E-commerce", "Одежда"), "w2.title": "URBN — магазин streetwear", "w2.desc": "Интернет-магазин с быстрой корзиной и оплатой в один клик.", "w2.res": "<b>×2.4</b> средний чек за 3 месяца",
      "w3.tags": tags("Веб-приложение", "SaaS"), "w3.title": "Metricly — аналитика продаж", "w3.desc": "Дашборд с графиками в реальном времени и ролями доступа.", "w3.res": "<b>−60%</b> времени на отчёты у клиента",
      "w4.tags": tags("Корпоративный", "Ресторан"), "w4.title": "Ember — гастробар", "w4.desc": "Сайт с онлайн-бронированием столов и меню с анимацией блюд.", "w4.res": "<b>+310</b> бронирований в месяц",
      "services.tag": "01 — Услуги", "services.title": "Предлагаем услуги создания <span class=\"gradient-text\">сайтов различных видов</span>",
      "sv0.t": "видов сайтов", "sv0.d": "Под любую задачу — от визитки до большого портала.",
      "sv1.t": "Сайт-визитка", "sv1.d": "Пара страниц о вас или компании: кто вы, чем занимаетесь и как связаться.", "sv1.meta": meta("от 500 $", "3–7 дней"),
      "sv2.t": "Сайт мероприятия", "sv2.d": "Конференция, фестиваль или концерт: программа, спикеры, регистрация и продажа билетов.", "sv2.meta": meta("от 500 $", "7–10 дней"),
      "sv3.t": "Лендинг", "sv3.d": "Одна продающая страница под продукт или рекламную кампанию.", "sv3.meta": meta("от 500 $", "5–10 дней"),
      "sv4.t": "Промо-сайт", "sv4.d": "Яркий сайт под запуск продукта или акцию — с анимациями и вау-эффектом.", "sv4.meta": meta("от 500 $", "7–14 дней"),
      "sv5.t": "Инфо-портал", "sv5.d": "Сайт с большим объёмом контента: статьи, рубрики, каталоги и поиск.", "sv5.meta": meta("от 500 $", "20–30 дней"),
      "sv6.t": "Имиджевый сайт", "sv6.d": "Создаёт образ бренда: атмосфера, история и эстетика вашей компании.", "sv6.meta": meta("от 500 $", "14–20 дней"),
      "sv7.t": "Не нашли свой вариант?", "sv7.cta": "Обсудим ваш проект",
      "nav.adv": "Преимущества", "adv.tag": "02 — Преимущества", "adv.title": "Почему <span class=\"gradient-text\">выбирают нас</span>",
      "adv1.t": "Ориентир на продажи", "adv1.p": "Красивый сайт, который не приносит заявок, — просто дорогая картинка. Мы проектируем каждую страницу вокруг одной цели: чтобы посетитель стал клиентом.", "adv1.list": "<li><b>Продающая структура.</b> Выстраиваем блоки так, чтобы вести посетителя от первого экрана к заявке.</li><li><b>Понятные призывы к действию.</b> Кнопки и формы стоят там, где у клиента появляется желание купить.</li><li><b>Скорость загрузки.</b> Сайт открывается меньше чем за секунду — никто не уходит, не дождавшись.</li><li><b>Аналитика.</b> Подключаем Яндекс Метрику или Google Analytics с целями, чтобы вы видели, откуда приходят заявки.</li>",
      "adv2.t": "Мультиязычность", "adv2.p": "Хотите работать с клиентами из других стран? Сделаем сайт сразу на нескольких языках — как этот, который вы сейчас читаете.", "adv2.list": "<li><b>Переключатель языков.</b> Удобный выбор языка, который запоминается для каждого посетителя.</li><li><b>Автоопределение.</b> Сайт сам открывается на языке браузера клиента.</li><li><b>Адаптация текстов.</b> Подстраиваем тексты под каждый язык, а не просто прогоняем через переводчик.</li><li><b>SEO для каждого языка.</b> Отдельные заголовки и описания, чтобы сайт находили в поиске в разных странах.</li>",
      "adv3.t": "Обоснованные цены", "adv3.p": "Вы платите за конкретный результат, а не за громкие слова. Стоимость считаем честно и заранее.", "adv3.list": "<li><b>Прозрачная смета.</b> До начала работы расписываем, из чего складывается цена.</li><li><b>Фиксированная стоимость.</b> Цена не меняется в процессе, если не меняется задача.</li><li><b>Без посредников.</b> Вы работаете напрямую с нами — без наценок агентства.</li><li><b>Оплата этапами.</b> Платите частями по мере готовности проекта.</li>",
      "adv4.t": "Любая валюта и география", "adv4.p": "Работаем с клиентами из любой страны и принимаем оплату в удобной для вас валюте.", "adv4.list": "<li><b>Рубли, доллары, евро.</b> Выставляем счёт в той валюте, в которой удобно вам.</li><li><b>Удобные способы оплаты.</b> Перевод на карту, оплата по счёту или через биржи фриланса.</li><li><b>Любой часовой пояс.</b> Подстраиваемся под ваше время для созвонов и обсуждений.</li><li><b>Связь онлайн.</b> Telegram, email или видеозвонок — как вам удобнее.</li>",
      "adv5.t": "Гарантия и техподдержка", "adv5.p": "Мы не пропадаем после сдачи проекта. Сайт должен работать — и мы за это отвечаем.", "adv5.list": "<li><b>Гарантия на работу.</b> Бесплатно исправляем ошибки, если они найдутся после запуска.</li><li><b>Месяц поддержки.</b> Первый месяц после сдачи бесплатно помогаем с правками и вопросами.</li><li><b>Обучение.</b> Показываем, как самостоятельно менять тексты и картинки на сайте.</li><li><b>Дальнейшее развитие.</b> Можем дорабатывать и сопровождать сайт на постоянной основе.</li>",
      "process.tag": "03 — Этапы работы", "process.title": "Прозрачно. Быстро. <span class=\"gradient-text\">Без сюрпризов.</span>",
      "p1.h": "Обсуждение идеи", "p1.p": "Созваниваемся, разбираемся в задаче, аудитории и конкурентах. Фиксируем сроки и бюджет — бесплатно.",
      "p2.h": "Создание прототипа", "p2.p": "Собираем структуру страниц и путь пользователя. Видно, как будет работать сайт, ещё до дизайна.",
      "p3.h": "Дизайн", "p3.p": "Рисуем уникальный визуал под ваш бренд и согласовываем с вами каждый экран.",
      "p4.h": "Вёрстка", "p4.p": "Верстаем, программируем и оживляем сайт анимациями. Показываем промежуточные результаты каждые 2–3 дня.",
      "p5.h": "Тестирование", "p5.p": "Проверяем на телефонах, планшетах и в разных браузерах, ускоряем загрузку — и запускаем.",
      "reviews.tag": "04 — Отзывы", "reviews.title": "Клиенты <span class=\"gradient-text\">говорят сами</span>",
      "r1.q": "«Ребята из KeyBroski сделали лендинг за 5 дней, хотя мы закладывали месяц. Заявки пошли в первый же вечер после запуска — такого у нас ещё не было.»", "r1.i": "А", "r1.n": "Анна К.", "r1.r": "основатель NovaPay",
      "r2.q": "«Отдельное спасибо за анимации: клиенты пишут, что сайт „живой“ и его хочется листать. Средний чек вырос в два с лишним раза.»", "r2.i": "М", "r2.n": "Максим Р.", "r2.r": "владелец URBN",
      "r3.q": "«Всегда на связи, объясняют всё простым языком и предлагают идеи, до которых мы бы сами не додумались. Работаем уже над третьим проектом.»", "r3.i": "Е", "r3.n": "Елена С.", "r3.r": "маркетолог Metricly",
      "contact.tag": "05 — Связаться", "contact.title": "Давайте сделаем<br>что-то <span class=\"gradient-text\">громкое</span>",
      "contact.text": "Расскажите о проекте — ответим в течение пары часов и пришлём примерную оценку стоимости и сроков. Это бесплатно и ни к чему не обязывает.",
      "contact.market": "Профиль на бирже",
      "form.name": "Как к вам обращаться?", "form.contact": "Telegram, телефон или email", "form.budget": "Бюджет проекта",
      "form.b1": "500–1000 $", "form.b2": "1000–2000 $", "form.b3": "2000–5000 $", "form.b4": "5000 $+",
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
      "works.tag": "03 — Selected work", "works.title": "Case studies that <span class=\"gradient-text\">speak in numbers</span>",
      "w1.tags": tags("Landing page", "Fintech"), "w1.title": "NovaPay — payment service", "w1.desc": "Promo landing page with a 3D card animation and a fee calculator.", "w1.res": "<b>+142%</b> sign-up conversion",
      "w2.tags": tags("E-commerce", "Apparel"), "w2.title": "URBN — streetwear store", "w2.desc": "Online store with a fast cart and one-click checkout.", "w2.res": "<b>×2.4</b> average order value in 3 months",
      "w3.tags": tags("Web app", "SaaS"), "w3.title": "Metricly — sales analytics", "w3.desc": "Dashboard with real-time charts and role-based access.", "w3.res": "<b>−60%</b> time spent on reports",
      "w4.tags": tags("Business site", "Restaurant"), "w4.title": "Ember — gastrobar", "w4.desc": "Website with online table booking and an animated menu.", "w4.res": "<b>+310</b> bookings per month",
      "services.tag": "01 — Services", "services.title": "We build <span class=\"gradient-text\">all kinds of websites</span>",
      "sv0.t": "types of websites", "sv0.d": "For any goal — from a business card site to a large portal.",
      "sv1.t": "Business card site", "sv1.d": "A few pages about you or your company: who you are, what you do and how to reach you.", "sv1.meta": meta("from $500", "3–7 days"),
      "sv2.t": "Event website", "sv2.d": "A conference, festival or concert: schedule, speakers, registration and ticket sales.", "sv2.meta": meta("from $500", "7–10 days"),
      "sv3.t": "Landing page", "sv3.d": "A single conversion-focused page for a product or ad campaign.", "sv3.meta": meta("from $500", "5–10 days"),
      "sv4.t": "Promo site", "sv4.d": "A bold site for a product launch or campaign — with animations and wow effect.", "sv4.meta": meta("from $500", "7–14 days"),
      "sv5.t": "Info portal", "sv5.d": "A content-heavy site: articles, sections, catalogs and search.", "sv5.meta": meta("from $500", "20–30 days"),
      "sv6.t": "Brand image site", "sv6.d": "Shapes how your brand is seen: the atmosphere, story and style of your company.", "sv6.meta": meta("from $500", "14–20 days"),
      "sv7.t": "Didn't find your option?", "sv7.cta": "Let's discuss your project",
      "nav.adv": "Why us", "adv.tag": "02 — Why us", "adv.title": "Why clients <span class=\"gradient-text\">choose us</span>",
      "adv1.t": "Built to sell", "adv1.p": "A beautiful site that brings no leads is just an expensive picture. We design every page around one goal: turning visitors into clients.", "adv1.list": "<li><b>Sales-driven structure.</b> We arrange the blocks to lead visitors from the first screen to a request.</li><li><b>Clear calls to action.</b> Buttons and forms sit exactly where the client feels ready to buy.</li><li><b>Fast loading.</b> The site opens in under a second — nobody leaves before it loads.</li><li><b>Analytics.</b> We set up Google Analytics or Yandex Metrica with goals so you see where leads come from.</li>",
      "adv2.t": "Multilingual", "adv2.p": "Want to work with clients abroad? We'll build your site in several languages at once — just like the one you're reading now.", "adv2.list": "<li><b>Language switcher.</b> A convenient language picker that remembers each visitor's choice.</li><li><b>Auto-detection.</b> The site opens in the language of the visitor's browser.</li><li><b>Adapted copy.</b> We adapt texts to each language instead of just running them through a translator.</li><li><b>SEO per language.</b> Separate titles and descriptions so the site is found in search in different countries.</li>",
      "adv3.t": "Fair pricing", "adv3.p": "You pay for a concrete result, not for big words. We calculate the cost honestly and up front.", "adv3.list": "<li><b>Transparent estimate.</b> Before we start, we break down exactly what the price is made of.</li><li><b>Fixed price.</b> The price doesn't change along the way unless the task does.</li><li><b>No middlemen.</b> You work directly with us — no agency markups.</li><li><b>Pay in stages.</b> You pay in parts as the project progresses.</li>",
      "adv4.t": "Any currency, anywhere", "adv4.p": "We work with clients from any country and accept payment in the currency that suits you.", "adv4.list": "<li><b>Rubles, dollars, euros.</b> We invoice in whatever currency is convenient for you.</li><li><b>Flexible payment.</b> Card transfer, invoice or payment through freelance platforms.</li><li><b>Any time zone.</b> We adapt to your schedule for calls and discussions.</li><li><b>Always online.</b> Telegram, email or video call — whatever works best for you.</li>",
      "adv5.t": "Warranty & support", "adv5.p": "We don't disappear after delivery. Your site has to work — and we take responsibility for that.", "adv5.list": "<li><b>Work warranty.</b> We fix any bugs found after launch free of charge.</li><li><b>One month of support.</b> For the first month after delivery we help with edits and questions for free.</li><li><b>Training.</b> We show you how to update texts and images on the site yourself.</li><li><b>Ongoing development.</b> We can keep improving and maintaining your site long-term.</li>",
      "process.tag": "03 — Our process", "process.title": "Transparent. Fast. <span class=\"gradient-text\">No surprises.</span>",
      "p1.h": "Discussing the idea", "p1.p": "We get on a call and dig into your goals, audience and competitors. We lock in the timeline and budget — free of charge.",
      "p2.h": "Prototype", "p2.p": "We map out the page structure and user journey, so you see how the site works before any design.",
      "p3.h": "Design", "p3.p": "We create a unique visual style for your brand and agree on every screen with you.",
      "p4.h": "Development", "p4.p": "We code the layout, build the features and bring the site to life with animation. Progress updates every 2–3 days.",
      "p5.h": "Testing", "p5.p": "We test on phones, tablets and different browsers, speed up loading — and launch.",
      "reviews.tag": "04 — Reviews", "reviews.title": "Clients <span class=\"gradient-text\">say it best</span>",
      "r1.q": "“The KeyBroski team built our landing page in 5 days when we had planned for a month. Leads started coming in the very first evening after launch — that had never happened before.”", "r1.i": "A", "r1.n": "Anna K.", "r1.r": "founder of NovaPay",
      "r2.q": "“Special thanks for the animations: customers tell us the site feels ‘alive’ and they want to keep scrolling. Our average order value more than doubled.”", "r2.i": "M", "r2.n": "Max R.", "r2.r": "owner of URBN",
      "r3.q": "“Always available, they explain everything in plain language and suggest ideas we'd never have come up with. We're already on our third project together.”", "r3.i": "E", "r3.n": "Elena S.", "r3.r": "marketer at Metricly",
      "contact.tag": "05 — Contact", "contact.title": "Let's build<br>something <span class=\"gradient-text\">loud</span>",
      "contact.text": "Tell us about your project — we'll reply within a couple of hours with a rough estimate of cost and timeline. Free and no strings attached.",
      "contact.market": "Freelance profile",
      "form.name": "Your name", "form.contact": "Telegram, phone or email", "form.budget": "Project budget",
      "form.b1": "$500–1k", "form.b2": "$1k–2k", "form.b3": "$2k–5k", "form.b4": "$5k+",
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
      "works.tag": "03 — Proyectos destacados", "works.title": "Casos que <span class=\"gradient-text\">hablan con cifras</span>",
      "w1.tags": tags("Landing page", "Fintech"), "w1.title": "NovaPay — servicio de pagos", "w1.desc": "Landing promocional con tarjeta animada en 3D y calculadora de comisiones.", "w1.res": "<b>+142%</b> de conversión en registros",
      "w2.tags": tags("E-commerce", "Moda"), "w2.title": "URBN — tienda streetwear", "w2.desc": "Tienda online con carrito rápido y pago en un clic.", "w2.res": "<b>×2.4</b> ticket medio en 3 meses",
      "w3.tags": tags("Aplicación web", "SaaS"), "w3.title": "Metricly — analítica de ventas", "w3.desc": "Panel con gráficos en tiempo real y roles de acceso.", "w3.res": "<b>−60%</b> de tiempo en informes",
      "w4.tags": tags("Corporativa", "Restaurante"), "w4.title": "Ember — gastrobar", "w4.desc": "Web con reservas de mesa online y carta con platos animados.", "w4.res": "<b>+310</b> reservas al mes",
      "services.tag": "01 — Servicios", "services.title": "Creamos <span class=\"gradient-text\">webs de todo tipo</span>",
      "sv0.t": "tipos de webs", "sv0.d": "Para cualquier objetivo — desde una web tarjeta hasta un gran portal.",
      "sv1.t": "Web tarjeta", "sv1.d": "Unas pocas páginas sobre ti o tu empresa: quién eres, qué haces y cómo contactarte.", "sv1.meta": meta("desde 500 $", "3–7 días"),
      "sv2.t": "Web de evento", "sv2.d": "Una conferencia, festival o concierto: programa, ponentes, inscripción y venta de entradas.", "sv2.meta": meta("desde 500 $", "7–10 días"),
      "sv3.t": "Landing page", "sv3.d": "Una sola página pensada para vender un producto o una campaña.", "sv3.meta": meta("desde 500 $", "5–10 días"),
      "sv4.t": "Web promocional", "sv4.d": "Una web llamativa para un lanzamiento o una promoción — con animaciones.", "sv4.meta": meta("desde 500 $", "7–14 días"),
      "sv5.t": "Portal informativo", "sv5.d": "Una web con mucho contenido: artículos, secciones, catálogos y buscador.", "sv5.meta": meta("desde 500 $", "20–30 días"),
      "sv6.t": "Web de imagen", "sv6.d": "Construye la imagen de tu marca: la atmósfera, la historia y el estilo de tu empresa.", "sv6.meta": meta("desde 500 $", "14–20 días"),
      "sv7.t": "¿No encuentras tu opción?", "sv7.cta": "Hablemos de tu proyecto",
      "nav.adv": "Ventajas", "adv.tag": "02 — Ventajas", "adv.title": "Por qué <span class=\"gradient-text\">elegirnos</span>",
      "adv1.t": "Enfocados en vender", "adv1.p": "Una web bonita que no trae clientes es solo una imagen cara. Diseñamos cada página con un objetivo: que el visitante se convierta en cliente.", "adv1.list": "<li><b>Estructura que vende.</b> Ordenamos los bloques para llevar al visitante del primer pantallazo a la solicitud.</li><li><b>Llamadas a la acción claras.</b> Botones y formularios justo donde el cliente quiere comprar.</li><li><b>Carga rápida.</b> La web abre en menos de un segundo — nadie se va antes de que cargue.</li><li><b>Analítica.</b> Configuramos Google Analytics o Yandex Metrica con objetivos para que veas de dónde llegan los clientes.</li>",
      "adv2.t": "Multilingüe", "adv2.p": "¿Quieres trabajar con clientes de otros países? Hacemos tu web en varios idiomas a la vez — como esta que estás leyendo.", "adv2.list": "<li><b>Selector de idioma.</b> Un selector cómodo que recuerda la elección de cada visitante.</li><li><b>Detección automática.</b> La web se abre en el idioma del navegador del visitante.</li><li><b>Textos adaptados.</b> Adaptamos los textos a cada idioma en lugar de pasarlos por un traductor.</li><li><b>SEO por idioma.</b> Títulos y descripciones propios para aparecer en búsquedas de distintos países.</li>",
      "adv3.t": "Precios justos", "adv3.p": "Pagas por un resultado concreto, no por palabras bonitas. Calculamos el coste con honestidad y por adelantado.", "adv3.list": "<li><b>Presupuesto transparente.</b> Antes de empezar, detallamos de qué se compone el precio.</li><li><b>Precio fijo.</b> El precio no cambia durante el trabajo si no cambia la tarea.</li><li><b>Sin intermediarios.</b> Trabajas directamente con nosotros — sin comisiones de agencia.</li><li><b>Pago por etapas.</b> Pagas por partes a medida que avanza el proyecto.</li>",
      "adv4.t": "Cualquier moneda y país", "adv4.p": "Trabajamos con clientes de cualquier país y aceptamos el pago en la moneda que te convenga.", "adv4.list": "<li><b>Rublos, dólares, euros.</b> Facturamos en la moneda que te resulte más cómoda.</li><li><b>Pago flexible.</b> Transferencia a tarjeta, factura o pago a través de plataformas freelance.</li><li><b>Cualquier zona horaria.</b> Nos adaptamos a tu horario para llamadas y reuniones.</li><li><b>Siempre en línea.</b> Telegram, email o videollamada — como te venga mejor.</li>",
      "adv5.t": "Garantía y soporte", "adv5.p": "No desaparecemos tras la entrega. Tu web tiene que funcionar — y nos hacemos responsables de ello.", "adv5.list": "<li><b>Garantía del trabajo.</b> Corregimos gratis cualquier error que aparezca después del lanzamiento.</li><li><b>Un mes de soporte.</b> Durante el primer mes tras la entrega te ayudamos gratis con cambios y dudas.</li><li><b>Formación.</b> Te enseñamos a cambiar textos e imágenes de la web por tu cuenta.</li><li><b>Desarrollo continuo.</b> Podemos seguir mejorando y manteniendo tu web a largo plazo.</li>",
      "process.tag": "03 — Etapas de trabajo", "process.title": "Transparente. Rápido. <span class=\"gradient-text\">Sin sorpresas.</span>",
      "p1.h": "Hablamos de la idea", "p1.p": "Hacemos una llamada y analizamos el objetivo, el público y la competencia. Fijamos plazos y presupuesto — sin coste.",
      "p2.h": "Prototipo", "p2.p": "Definimos la estructura de páginas y el recorrido del usuario: ves cómo funcionará la web antes del diseño.",
      "p3.h": "Diseño", "p3.p": "Creamos un estilo visual único para tu marca y validamos contigo cada pantalla.",
      "p4.h": "Maquetación", "p4.p": "Maquetamos, programamos y damos vida a la web con animaciones. Te mostramos avances cada 2–3 días.",
      "p5.h": "Pruebas", "p5.p": "Probamos en móviles, tabletas y distintos navegadores, aceleramos la carga — y lanzamos.",
      "reviews.tag": "04 — Opiniones", "reviews.title": "Los clientes <span class=\"gradient-text\">lo cuentan</span>",
      "r1.q": "«El equipo de KeyBroski hizo nuestra landing en 5 días cuando habíamos previsto un mes. Los primeros contactos llegaron la misma noche del lanzamiento — algo que nunca nos había pasado.»", "r1.i": "A", "r1.n": "Ana K.", "r1.r": "fundadora de NovaPay",
      "r2.q": "«Gracias especialmente por las animaciones: los clientes dicen que la web está \"viva\" y dan ganas de seguir bajando. El ticket medio se ha duplicado con creces.»", "r2.i": "M", "r2.n": "Máximo R.", "r2.r": "dueño de URBN",
      "r3.q": "«Siempre disponibles, lo explican todo de forma sencilla y proponen ideas que nunca se nos habrían ocurrido. Ya vamos por nuestro tercer proyecto juntos.»", "r3.i": "E", "r3.n": "Elena S.", "r3.r": "marketing en Metricly",
      "contact.tag": "05 — Contacto", "contact.title": "Hagamos algo<br>que <span class=\"gradient-text\">resuene</span>",
      "contact.text": "Cuéntanos tu proyecto — te respondemos en un par de horas con una estimación de coste y plazos. Gratis y sin compromiso.",
      "contact.market": "Perfil freelance",
      "form.name": "¿Cómo te llamas?", "form.contact": "Telegram, teléfono o email", "form.budget": "Presupuesto",
      "form.b1": "500–1000 $", "form.b2": "1000–2000 $", "form.b3": "2000–5000 $", "form.b4": "5000 $+",
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
