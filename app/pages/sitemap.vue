<template>
  <div class="sitemap-page">
    <section class="sitemap-hero">
      <div class="container">
        <h1 class="hero-title">Карта сайту</h1>
        <p class="hero-description">
          Структура сайту та посилання на всі сторінки
        </p>
      </div>
    </section>

    <section class="sitemap-content">
      <div class="container">
        <div class="content-wrapper">
          <div class="sitemap-section">
            <h2 class="section-title">Основні сторінки</h2>
            <ul class="sitemap-links">
              <li><NuxtLink to="/">Головна</NuxtLink></li>
              <li><NuxtLink to="/services">Послуги</NuxtLink></li>
              <li><NuxtLink to="/projects">Проекти</NuxtLink></li>
              <li><NuxtLink to="/about">Про нас</NuxtLink></li>
              <li><NuxtLink to="/blog">Блог</NuxtLink></li>
              <li><NuxtLink to="/contact">Контакти</NuxtLink></li>
            </ul>
          </div>

          <div class="sitemap-section">
            <h2 class="section-title">Послуги</h2>
            <ul class="sitemap-links">
              <li><NuxtLink to="/services/web-development">Веб-розробка</NuxtLink></li>
              <li><NuxtLink to="/services/mobile-apps">Мобільні додатки</NuxtLink></li>
              <li><NuxtLink to="/services/ui-ux-design">UI/UX Дизайн</NuxtLink></li>
              <li><NuxtLink to="/services/ecommerce">E-commerce</NuxtLink></li>
              <li><NuxtLink to="/services/seo">SEO Оптимізація</NuxtLink></li>
              <li><NuxtLink to="/services/maintenance">Підтримка сайтів</NuxtLink></li>
            </ul>
          </div>

          <div class="sitemap-section">
            <h2 class="section-title">Компанія</h2>
            <ul class="sitemap-links">
              <li><NuxtLink to="/team">Наша команда</NuxtLink></li>
              <li><NuxtLink to="/careers">Кар'єра</NuxtLink></li>
              <li><NuxtLink to="/case-studies">Кейси</NuxtLink></li>
              <li><NuxtLink to="/testimonials">Відгуки</NuxtLink></li>
            </ul>
          </div>

          <div class="sitemap-section">
            <h2 class="section-title">Ресурси</h2>
            <ul class="sitemap-links">
              <li><NuxtLink to="/documentation">Документація</NuxtLink></li>
              <li><NuxtLink to="/help-center">Центр допомоги</NuxtLink></li>
              <li><NuxtLink to="/privacy">Політика конфіденційності</NuxtLink></li>
              <li><NuxtLink to="/terms">Умови використання</NuxtLink></li>
              <li><NuxtLink to="/cookies">Політика cookies</NuxtLink></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
useHead({
  title: 'Карта сайту - WebCore',
  meta: [
    { name: 'description', content: 'Карта сайту WebCore' }
  ]
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 1200px;
}

.sitemap-page {
  min-height: 100vh;
  padding-top: 70px;
}

.sitemap-hero {
  padding: 4rem 0;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #8B5CF6, #D946EF);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  max-width: 800px;
  margin: 0 auto;
}

.sitemap-content {
  padding: 4rem 0;
}

.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
}

.sitemap-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
}

.sitemap-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sitemap-links li {
  margin-bottom: 0.75rem;
}

.sitemap-links a {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.sitemap-links a:hover {
  color: var(--color-accent-primary);
}

@media (max-width: 1343px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>

