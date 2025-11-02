<template>
  <div class="help-center-page">
    <section class="help-center-hero">
      <div class="container">
        <h1 class="hero-title">Центр допомоги</h1>
        <p class="hero-description">
          Знайдіть відповіді на найпоширеніші питання та отримайте допомогу
        </p>
      </div>
    </section>

    <section class="help-center-content">
      <div class="container">
        <div class="content-wrapper">
          <p class="text-content">
            Тут ви знайдете відповіді на часті питання, інструкції та допомогу з використання наших послуг.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
useHead({
  title: 'Центр допомоги - WebCore',
  meta: [
    { name: 'description', content: 'Центр допомоги та підтримки WebCore' }
  ]
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 1200px;
}

.help-center-page {
  min-height: 100vh;
  padding-top: 70px;
}

.help-center-hero {
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

.help-center-content {
  padding: 4rem 0;
}

.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
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

