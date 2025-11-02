<template>
  <div class="careers-page">
    <section class="careers-hero">
      <div class="container">
        <h1 class="hero-title">Кар'єра</h1>
        <p class="hero-description">
          Приєднуйтесь до команди WebCore та створюйте цифрові рішення разом з нами
        </p>
      </div>
    </section>

    <section class="careers-content">
      <div class="container">
        <div class="content-wrapper">
          <p class="text-content">
            Ми завжди шукаємо талановитих людей, які розділяють наші цінності та готові створювати 
            якісні цифрові рішення. Якщо ви хочете приєднатися до нашої команди, зв'яжіться з нами.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
useHead({
  title: 'Кар\'єра - WebCore',
  meta: [
    { name: 'description', content: 'Вакансії та кар\'єрні можливості в WebCore' }
  ]
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 1200px;
}

.careers-page {
  min-height: 100vh;
  padding-top: 70px;
}

.careers-hero {
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

.careers-content {
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

