---
title: 'Оптимізація швидкості сайту: покроковий гід по прискоренню'
description: 'Детальний розбір методів оптимізації швидкості веб-сайтів. Практичні поради, інструменти та техніки для підвищення продуктивності.'
image: '/images/blog/speed-optimization-hero.jpg'
date: '2024-10-25'
author: 'WebCore Development Team'
category: 'Розробка'
tags: ['Оптимізація', 'Швидкість', 'SEO', 'Performance']
readTime: '10 хв'
---

# Оптимізація швидкості сайту: покроковий гід по прискоренню

![Оптимізація швидкості сайту](/images/blog/speed-optimization-hero.jpg)

Швидкість завантаження сайту критично впливає на користувацький досвід, SEO-рейтинг та конверсію. Google показує, що затримка на 1 секунду може зменшити конверсію на 7%. Розглянемо, як зробити ваш сайт блискавично швидким.

## Чому швидкість так важлива?

### Вплив на бізнес:
- **53% користувачів** залишають сайт, якщо він завантажується більше 3 секунд
- **1 секунда затримки** = 7% зниження конверсії
- **100ms покращення** = 1% зростання доходу (Amazon)

### SEO фактори:
- **Core Web Vitals** — ключові метрики Google
- **Мобільна швидкість** — пріоритет для ранжування
- **Користувацький досвід** — прямо впливає на позиції

![Статистика швидкості сайтів](/images/blog/speed-statistics.jpg)

## Як вимірювати швидкість

### Інструменти для аналізу:

#### 1. Google PageSpeed Insights
- Аналізує Core Web Vitals
- Дає конкретні рекомендації
- Показує мобільну та десктопну версії

#### 2. GTmetrix
```bash
# Основні метрики GTmetrix:
- Fully Loaded Time: час повного завантаження
- Total Page Size: розмір сторінки
- Total Requests: кількість запитів
```

#### 3. WebPageTest
- Детальний водоспад запитів
- Тестування з різних локацій
- Порівняння "до" і "після"

### Ключові метрики:

![Core Web Vitals](/images/blog/core-web-vitals.jpg)

#### Core Web Vitals:
- **LCP (Largest Contentful Paint)** — завантаження основного контенту (<2.5с)
- **FID (First Input Delay)** — час реакції на дію (<100мс)
- **CLS (Cumulative Layout Shift)** — стабільність макету (<0.1)

## Оптимізація зображень

### 1. Вибір правильного формату

```html
<!-- WebP з fallback -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Опис зображення">
</picture>
```

### Порівняння форматів:
- **WebP** — 25-35% менше за JPEG
- **AVIF** — 50% менше за JPEG (новий стандарт)
- **SVG** — для простих ілюстрацій
- **PNG** — тільки для прозорості

### 2. Адаптивні зображення

```html
<!-- Різні розміри для різних екранів -->
<img 
  srcset="small.jpg 480w, 
          medium.jpg 800w, 
          large.jpg 1200w"
  sizes="(max-width: 480px) 480px,
         (max-width: 800px) 800px,
         1200px"
  src="medium.jpg" 
  alt="Адаптивне зображення"
>
```

### 3. Lazy Loading

```html
<!-- Нативний lazy loading -->
<img src="image.jpg" loading="lazy" alt="Зображення">

<!-- Для старих браузерів -->
<script>
if ('loading' in HTMLImageElement.prototype) {
  // Браузер підтримує lazy loading
} else {
  // Завантажити polyfill
}
</script>
```

![Приклад lazy loading](/images/blog/lazy-loading-example.jpg)

## Мінімізація та стиснення коду

### 1. HTML мінімізація

```html
<!-- До мінімізації -->
<div class="container">
  <h1>Заголовок</h1>
  <p>Текст параграфа</p>
</div>

<!-- Після мінімізації -->
<div class="container"><h1>Заголовок</h1><p>Текст параграфа</p></div>
```

### 2. CSS оптимізація

```css
/* Видалення невикористаних стилів */
.unused-class {
  color: red; /* Цей стиль не використовується */
}

/* Об'єднання правил */
.btn-primary, .btn-secondary {
  padding: 10px 20px;
  border-radius: 4px;
}
```

### 3. JavaScript оптимізація

```javascript
// Tree shaking - видалення невикористаного коду
import { debounce } from 'lodash'; // ❌ Завантажує всю бібліотеку
import debounce from 'lodash/debounce'; // ✅ Тільки потрібна функція

// Code splitting
const LazyComponent = lazy(() => import('./LazyComponent'));
```

## Оптимізація шрифтів

### 1. Попереднє завантаження

```html
<!-- Preload критично важливих шрифтів -->
<link rel="preload" href="/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin>

<!-- Font display для швидшого відображення -->
<style>
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-regular.woff2') format('woff2');
  font-display: swap; /* Показує fallback, поки завантажується шрифт */
}
</style>
```

### 2. Змінні шрифти

```css
/* Один файл замість декількох */
@font-face {
  font-family: 'Inter Variable';
  src: url('/fonts/inter-variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
}

.heading {
  font-family: 'Inter Variable';
  font-weight: 700; /* Динамічна зміна ваги */
}
```

## Кешування

### 1. HTTP кешування

```apache
# .htaccess для Apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
</IfModule>
```

```nginx
# nginx конфігурація
location ~* \.(css|js|png|jpg|jpeg|gif|svg|woff2)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

### 2. Service Worker кешування

```javascript
// sw.js
const CACHE_NAME = 'site-cache-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

![Схема кешування](/images/blog/caching-diagram.jpg)

## CDN та хостинг

### Переваги CDN:
- **Географічна близькість** — сервери по всьому світу
- **Зменшення навантаження** на основний сервер
- **DDoS захист** — додатковий рівень безпеки
- **Автоматична оптимізація** — стиснення, WebP конвертація

### Популярні CDN:
- **Cloudflare** — безкоштовний план + преміум функції
- **AWS CloudFront** — інтеграція з Amazon екосистемою
- **Google Cloud CDN** — швидкий та надійний

## Оптимізація бази даних

### 1. Індекси

```sql
-- Створення індексу для частих запитів
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_post_date ON posts(created_at);

-- Композитний індекс
CREATE INDEX idx_user_status ON users(status, created_at);
```

### 2. Оптимізація запитів

```sql
-- ❌ Повільний запит
SELECT * FROM posts WHERE title LIKE '%keyword%';

-- ✅ Швидкий запит з індексом
SELECT id, title, excerpt FROM posts 
WHERE title LIKE 'keyword%' 
LIMIT 10;
```

### 3. Кешування запитів

```php
// PHP приклад з Redis
$redis = new Redis();
$cacheKey = "posts:latest:10";

if ($redis->exists($cacheKey)) {
    $posts = json_decode($redis->get($cacheKey));
} else {
    $posts = DB::query("SELECT * FROM posts ORDER BY id DESC LIMIT 10");
    $redis->setex($cacheKey, 3600, json_encode($posts)); // 1 година кешу
}
```

## Технічні оптимізації

### 1. Gzip стиснення

```apache
# Apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### 2. HTTP/2

```nginx
# nginx HTTP/2
server {
    listen 443 ssl http2;
    server_name example.com;
    
    # HTTP/2 server push
    location = /index.html {
        http2_push /styles/main.css;
        http2_push /scripts/main.js;
    }
}
```

### 3. Preload критичних ресурсів

```html
<!-- Preload CSS -->
<link rel="preload" href="/styles/critical.css" as="style">

<!-- Preload JavaScript -->
<link rel="preload" href="/scripts/main.js" as="script">

<!-- DNS prefetch для зовнішніх ресурсів -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//www.google-analytics.com">
```

## Моніторинг та тестування

### 1. Continuous Performance Monitoring

```javascript
// Web Vitals API
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### 2. Автоматизоване тестування

```yaml
# GitHub Actions для Lighthouse CI
name: Performance
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.8.x
          lhci autorun
```

![Моніторинг продуктивності](/images/blog/performance-monitoring.jpg)

## Чек-лист оптимізації

### Зображення:
- [ ] Використання WebP/AVIF форматів
- [ ] Адаптивні зображення (srcset)
- [ ] Lazy loading
- [ ] Оптимізація розмірів

### Код:
- [ ] Мінімізація HTML/CSS/JS
- [ ] Tree shaking
- [ ] Code splitting
- [ ] Видалення невикористаного коду

### Шрифти:
- [ ] Preload критичних шрифтів
- [ ] font-display: swap
- [ ] Змінні шрифти де можливо

### Кешування:
- [ ] HTTP кешування
- [ ] Service Worker
- [ ] CDN налаштування

### Сервер:
- [ ] Gzip стиснення
- [ ] HTTP/2
- [ ] Оптимізація бази даних

## Результати оптимізації

Після правильної оптимізації очікуйте:
- **50-70% зменшення** часу завантаження
- **30-40% покращення** Core Web Vitals
- **15-25% зростання** конверсії
- **Підвищення SEO** рейтингу

**Потрібна професійна оптимізація?** [Зв'яжіться з нами](/contact) — прискоримо ваш сайт до максимуму!

---

*WebCore Agency спеціалізується на технічній оптимізації сайтів. Наші розробники знають, як зробити ваш сайт найшвидшим у галузі.*
