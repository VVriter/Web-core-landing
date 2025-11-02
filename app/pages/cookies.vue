<template>
  <div class="cookies-page">
    <section class="cookies-hero">
      <div class="container">
        <h1 class="hero-title">Політика cookies</h1>
        <p class="hero-description">
          Інформація про використання cookies на нашому сайті
        </p>
      </div>
    </section>

    <section class="cookies-content">
      <div class="container">
        <div class="content-wrapper">
          <div class="cookies-section">
            <h2 class="section-title">Що таке cookies</h2>
            <p class="text-content">
              Cookies - це невеликі текстові файли, які зберігаються на вашому пристрої для покращення роботи сайту.
            </p>
          </div>

          <div class="cookies-section">
            <h2 class="section-title">Як ми використовуємо cookies</h2>
            <p class="text-content">
              Ми використовуємо cookies для зберігання налаштувань теми, аналітики та покращення користувацького досвіду.
            </p>
          </div>

          <div class="cookies-section">
            <h2 class="section-title">Керування cookies</h2>
            <p class="text-content">
              Ви можете налаштувати прийняття cookies у налаштуваннях вашого браузера.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
useHead({
  title: 'Політика cookies - WebCore',
  meta: [
    { name: 'description', content: 'Політика використання cookies WebCore' }
  ]
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 1200px;
}

.cookies-page {
  min-height: 100vh;
  padding-top: 70px;
}

.cookies-hero {
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

.cookies-content {
  padding: 4rem 0;
}

.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.cookies-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
}

.text-content {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

@media (max-width: 1343px) {
  .hero-title {
    font-size: 2.5rem;
  }
}
</style>

