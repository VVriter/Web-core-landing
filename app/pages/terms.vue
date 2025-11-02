<template>
  <div class="terms-page">
    <section class="terms-hero">
      <div class="container">
        <h1 class="hero-title">Умови використання</h1>
        <p class="hero-description">
          Правила та умови використання послуг WebCore
        </p>
      </div>
    </section>

    <section class="terms-content">
      <div class="container">
        <div class="content-wrapper">
          <div class="terms-section">
            <h2 class="section-title">1. Прийняття умов</h2>
            <p class="text-content">
              Використовуючи послуги WebCore, ви погоджуєтеся з цими умовами використання.
            </p>
          </div>

          <div class="terms-section">
            <h2 class="section-title">2. Послуги</h2>
            <p class="text-content">
              Ми надаємо послуги веб-розробки, дизайну та технічної підтримки згідно з договором про надання послуг.
            </p>
          </div>

          <div class="terms-section">
            <h2 class="section-title">3. Оплата</h2>
            <p class="text-content">
              Приймаємо оплату офіційно на ФОП (фізична особа-підприємець). Умови оплати визначаються індивідуально для кожного проекту та зазначаються в договорі. Зазвичай передоплата 50% на початку роботи, решта — після запуску проекту.
            </p>
          </div>

          <div class="terms-section">
            <h2 class="section-title">4. Контакти</h2>
            <p class="text-content">
              З питань умов використання зв'яжіться з нами за адресою support@web-core.agency
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
  title: 'Умови використання - WebCore',
  meta: [
    { name: 'description', content: 'Умови використання послуг WebCore' }
  ]
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 1200px;
}

.terms-page {
  min-height: 100vh;
  padding-top: 70px;
}

.terms-hero {
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

.terms-content {
  padding: 4rem 0;
}

.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.terms-section {
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

