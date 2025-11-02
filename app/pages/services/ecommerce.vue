<template>
  <div class="service-page">
    <section class="service-hero">
      <div class="container">
        <h1 class="hero-title">E-commerce</h1>
        <p class="hero-description">
          Створюємо інтернет-магазини, які приносять продажі та зростання вашому бізнесу
        </p>
      </div>
    </section>

    <section class="service-content">
      <div class="container">
        <div class="content-wrapper">
          <p class="text-content">
            Розробляємо повнофункціональні інтернет-магазини з інтеграцією платіжних систем, 
            системою управління товарами та зручним процесом оформлення замовлень.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
useHead({
  title: 'E-commerce - WebCore',
  meta: [
    { name: 'description', content: 'Розробка інтернет-магазинів та e-commerce рішень' }
  ]
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 1200px;
}

.service-page {
  min-height: 100vh;
  padding-top: 70px;
}

.service-hero {
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

.service-content {
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

