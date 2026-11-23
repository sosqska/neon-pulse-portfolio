# KeyBroski — сайт веб-студии

Сайт: **https://keybroski.pl** (GitHub Pages, свой домен, HTTPS).

## Структура

```
/
├── index.html        — главная (собирается из src/, руками не править)
├── works/index.html  — страница «Все работы» (собирается из src/)
├── css/style.css     — стили
├── js/main.js        — интерактив; вверху CONFIG: ники Telegram и Instagram
├── js/i18n.js        — переводы (собирается из src/)
├── src/              — исходники: шаблоны, тексты на 5 языках, сборщик
├── projects/         — демо-сайты (NovaPay, URBN, Metricly, Ember)
├── v1/               — старая первая версия сайта (keybroski.pl/v1/)
├── v2/               — перенаправление со старых ссылок /v2/ на главную
└── CNAME             — домен keybroski.pl
```

## Как поменять тексты

1. Тексты лежат в `src/ru.json`, `src/uk.json`, `src/en.json`, `src/es.json`, `src/pl.json`, разметка — в `src/template.html` и `src/template-works.html`.
2. После правки пересоберите страницы (число — версия, чтобы браузеры не брали старые файлы из кэша):

       cd src
       node build.js 29

3. Залейте на GitHub — через 1–2 минуты изменения будут на keybroski.pl.

## Связь

Заявки уходят в Telegram: форма брифа копирует готовый текст заявки и открывает чат.
Когда появится Instagram — впишите ник в `CONFIG.instagram` в начале `js/main.js`, и все кнопки Instagram заработают.
