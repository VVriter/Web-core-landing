<template>
  <div class="case-studies-page">
    <section class="case-studies-hero">
      <div class="container">
        <h1 class="hero-title">Кейси</h1>
        <p class="hero-description">
          Реальні історії успіху наших клієнтів та результати, які ми досягли разом
        </p>
      </div>
    </section>

    <section class="case-studies-content">
      <div class="container">
        <div class="content-wrapper">
          <p class="text-content">
            Дізнайтеся, як ми допомогли різним компаніям досягти своїх бізнес-цілей через 
            створення якісних цифрових рішень та стратегічний підхід до розвитку в інтернеті.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
useHead({
  title: 'Кейси - WebCore',
  meta: [
    { name: 'description', content: 'Успішні кейси та проекти WebCore' }
  ]
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 1200px;
}

.case-studies-page {
  min-height: 100vh;
  padding-top: 70px;
}

.case-studies-hero {
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

.case-studies-content {
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

