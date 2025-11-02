<template>
  <div class="privacy-page">
    <section class="privacy-hero">
      <div class="container">
        <h1 class="hero-title">Політика конфіденційності</h1>
        <p class="hero-description">
          Як ми збираємо, використовуємо та захищаємо вашу персональну інформацію
        </p>
      </div>
    </section>

    <section class="privacy-content">
      <div class="container">
        <div class="content-wrapper">
          <div class="privacy-section">
            <h2 class="section-title">1. Збір інформації</h2>
            <p class="text-content">
              Ми збираємо інформацію, яку ви надаєте нам напряму, наприклад, коли ви заповнюєте форми зворотного зв'язку.
            </p>
          </div>

          <div class="privacy-section">
            <h2 class="section-title">2. Використання інформації</h2>
            <p class="text-content">
              Зібрана інформація використовується для надання послуг, зв'язку з вами та покращення нашого сервісу.
            </p>
          </div>

          <div class="privacy-section">
            <h2 class="section-title">3. Захист інформації</h2>
            <p class="text-content">
              Ми вживаємо заходів для захисту вашої персональної інформації від несанкціонованого доступу.
            </p>
          </div>

          <div class="privacy-section">
            <h2 class="section-title">4. Контакти</h2>
            <p class="text-content">
              Якщо у вас є питання щодо політики конфіденційності, зв'яжіться з нами за адресою support@web-core.agency
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
  title: 'Політика конфіденційності - WebCore',
  meta: [
    { name: 'description', content: 'Політика конфіденційності WebCore' }
  ]
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 1200px;
}

.privacy-page {
  min-height: 100vh;
  padding-top: 70px;
}

.privacy-hero {
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

.privacy-content {
  padding: 4rem 0;
}

.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.privacy-section {
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

