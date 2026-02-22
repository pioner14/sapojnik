# BOOT.md — Инструкции системы Sapojnik

> Этот файл является точкой входа для AI-сопроцессора (GPU) при работе с проектом Sapojnik.

## 🎯 Назначение проекта

**Sapojnik** — сайт-визитка с блогом для мастера по ремонту обуви в Мюлузе, Франция.

### Основные функции

- **Визитка:** Контакты, карта, описание услуг
- **Галерея:** Фотографии работ (до/после)
- **Блог:** Статьи о ремонте обуви
- **Формы:** Обратная связь, онлайн запись
- **Отзывы:** Отзывы клиентов
- **Мультиязычность:** Французский + Русский

### Целевая аудитория

1. **Франкоговорящие жители Мюлюза** — основной рынок
2. **Русскоязычная диаспора Эльзаса** — дополнительный сегмент
3. **Мобильные пользователи** — приоритет mobile-first

## 🏗️ Архитектура

Проект следует принципам **Jamstack** (Static Site Generation):

```
┌─────────────────────────────────────────────┐
│              Frontend (Astro)                │
│  SSG + Partial Hydration (Islands)          │
├─────────────────────────────────────────────┤
│              Content Layer                   │
│  Markdown/MDX (блог) + JSON (данные)        │
├─────────────────────────────────────────────┤
│              API Layer                       │
│  Netlify Functions (serverless)             │
├─────────────────────────────────────────────┤
│           External Services                  │
│  Google Maps, Email, Analytics              │
└─────────────────────────────────────────────┘
```

### Ключевые технологии

| Слой | Технология | Обоснование |
|------|------------|-------------|
| Фреймворк | Astro 4.x | SSG с отличной производительностью, Partial Hydration |
| Стили | Tailwind CSS 3.x | Utility-first, быстрая разработка |
| i18n | astro-i18n (встроенный) | Нативная поддержка, простота |
| Контент | Markdown + MDX | Удобство для владельца, Git-based CMS |
| Карта | Leaflet | Бесплатно, без API key |
| Формы | Netlify Forms | Бесшовная интеграция |
| Backend | Netlify Functions | Serverless, бесплатно для малого трафика |
| Хостинг | Netlify | Бесплатный tier, CI/CD, HTTPS |

## 📁 Структура проекта

```
Sapojnik/
├── src/
│   ├── components/          # Astro компоненты
│   │   ├── ui/             # Базовые UI компоненты
│   │   ├── layout/         # Компоненты layout
│   │   └── widgets/        # Виджеты (карта, форма, галерея)
│   ├── layouts/            # Шаблоны страниц
│   ├── pages/              # Страницы (роутинг)
│   │   ├── fr/             # Французские страницы
│   │   └── ru/             # Русские страницы
│   ├── i18n/               # Переводы и конфигурация
│   └── styles/             # Глобальные стили
├── content/
│   ├── blog/               # Статьи блога (MDX)
│   │   ├── fr/             # Французские статьи
│   │   └── ru/             # Русские статьи
│   ├── services/           # Описания услуг
│   └── gallery/            # Метаданные галереи
├── public/
│   ├── images/             # Статические изображения
│   │   ├── gallery/        # Фото работ
│   │   └── hero/           # Изображения для главной
│   └── fonts/              # Шрифты
├── netlify/
│   └── functions/          # Serverless функции
│       ├── contact.ts      # Форма обратной связи
│       └── booking.ts      # Онлайн запись
├── docs/
│   ├── BOOT.md             # Этот файл
│   ├── WAL.md              # Журнал решений
│   └── SPECS.md            # Спецификации
├── plans/
│   └── development_roadmap.md  # План развития
├── astro.config.mjs        # Конфигурация Astro
├── tailwind.config.mjs     # Конфигурация Tailwind
├── netlify.toml            # Конфигурация Netlify
└── shell.nix               # NixOS окружение
```

## 🛠️ Технологический стек

### Frontend

| Компонент | Версия | Назначение |
|-----------|--------|------------|
| Astro | 4.x | SSG фреймворк |
| Tailwind CSS | 3.x | Стилизация |
| TypeScript | 5.x | Типизация |
| React | 18.x | Interactive islands (формы) |
| Leaflet | 1.9.x | Интерактивная карта |

### Backend (Serverless)

| Компонент | Назначение |
|-----------|------------|
| Netlify Forms | Обработка форм |
| Netlify Functions | API endpoints |
| Resend / EmailJS | Отправка email |

### Content Management

| Компонент | Назначение |
|-----------|------------|
| Astro Content Collections | Типизированный контент |
| Markdown + MDX | Статьи блога |
| JSON | Данные услуг, контакты |

## 🚀 Быстрый старт

### Требования

- Node.js 20.x LTS
- npm 10.x или pnpm 8.x
- NixOS (опционально, через shell.nix)

### Установка

```bash
# В NixOS
nix-shell

# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для production
npm run build

# Предпросмотр сборки
npm run preview
```

### Переменные окружения

```env
# .env (не коммитить!)
PUBLIC_SITE_URL=https://sapojnik.fr
CONTACT_EMAIL=contact@sapojnik.fr
RESEND_API_KEY=re_xxx  # Для отправки email
GOOGLE_PLACE_ID=xxx    # Для отзывов Google (опционально)
```

## 🌐 Роутинг и i18n

### Структура URL

```
/                    → редирект на /fr/ или /ru/ (по Accept-Language)
/fr/                 → главная (французский)
/fr/services/        → услуги
/fr/gallery/         → галерея
/fr/blog/            → блог
/fr/contact/         → контакты
/fr/booking/         → запись
/ru/                 → главная (русский)
/ru/services/        → услуги
...
```

### Переключение языков

Каждая страница содержит альтернативные ссылки:
```html
<link rel="alternate" hreflang="fr" href="/fr/..." />
<link rel="alternate" hreflang="ru" href="/ru/..." />
```

## 📱 Mobile-First

Приоритет мобильной версии:
1. Базовые стили для мобильных
2. Адаптация для планшетов (`md:`)
3. Адаптация для десктопа (`lg:`)

### Breakpoints (Tailwind)

| Breakpoint | Ширина | Префикс |
|------------|--------|---------|
| sm | 640px | `sm:` |
| md | 768px | `md:` |
| lg | 1024px | `lg:` |
| xl | 1280px | `xl:` |

## 🔒 GDPR Compliance

Проект должен соответствовать европейскому законодательству:

1. **Cookie Consent** — баннер согласия перед загрузкой аналитики
2. **Privacy Policy** — страница политики конфиденциальности
3. **Data Minimization** — минимум собираемых данных
4. **Right to Deletion** — возможность удаления данных

### Рекомендуемые инструменты

- **Cookie banner:** Cookiebot (бесплатный tier) или Orestbida/cookieconsent
- **Analytics:** Plausible (GDPR-friendly) или Fathom

## 📝 Добавление контента владельцем

### Новая статья блога

1. Создать файл `content/blog/fr/yyyy-mm-dd-slug.mdx`
2. Добавить frontmatter:
```yaml
---
title: "Заголовок"
description: "Описание для SEO"
pubDate: 2024-01-15
heroImage: "/images/blog/image.jpg"
tags: ["ремонт", "советы"]
---
```
3. Написать контент в Markdown
4. Создать перевод в `content/blog/ru/`

### Новое фото в галерею

1. Добавить изображение в `public/images/gallery/`
2. Обновить `content/gallery/data.json`:
```json
{
  "id": "work-001",
  "before": "/images/gallery/before-001.jpg",
  "after": "/images/gallery/after-001.jpg",
  "description": {
    "fr": "Réparation de talon",
    "ru": "Ремонт каблука"
  },
  "tags": ["heels", "repair"]
}
```

## 🔧 Git Workflow

```bash
# Создание ветки для фичи
git checkout -b feature/gallery-widget

# Коммит с conventional commits
git commit -m "feat: add before/after gallery slider"

# Push и создание PR
git push origin feature/gallery-widget
```

### Conventional Commits

| Префикс | Назначение |
|---------|------------|
| `feat:` | Новая функциональность |
| `fix:` | Исправление бага |
| `docs:` | Документация |
| `style:` | Стили, форматирование |
| `refactor:` | Рефакторинг |
| `i18n:` | Переводы |

### NixOS: работа с Git

NixOS использует read-only файловую систему для системных конфигов, что может вызывать ошибки SSH:

```
Bad owner or permissions on /home/nick/.ssh/config
fatal: Could not read from remote repository.
```

**Решение** — обход SSH config:

```bash
# Разовый пуш с обходом SSH проблемы
GIT_SSH_COMMAND="ssh -F /dev/null" git push origin main

# Настройка алиаса для удобства
git config --global alias.npush '!GIT_SSH_COMMAND="ssh -F /dev/null" git push'

# Использование алиаса
git npush origin main
```

---

## 📚 Полезные ссылки

- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Leaflet Documentation](https://leafletjs.com/)
- [GDPR Checklist](https://gdpr.eu/checklist/)
