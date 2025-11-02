<template>
  <div class="projects-page">
    <PortfolioSection />
  </div>
</template>

<script setup lang="ts">
import PortfolioSection from '../../components/sections/PortfolioSection.vue'

// @ts-ignore
useHead({
  title: 'Проекти - WebCore',
  meta: [
    { name: 'description', content: 'Портфоліо наших робіт: веб-сайти, додатки та digital-рішення' }
  ]
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 1200px;
}

.projects-page {
  min-height: 100vh;
}

.projects-hero {
  padding: 4rem 0;
  background: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-primary);
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #8B5CF6, #D946EF);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

@media (max-width: 1343px) {
  .projects-hero {
    padding: 3rem 0;
  }

  .hero-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .projects-hero {
    padding: 2rem 0;
  }

  .hero-title {
    font-size: 2rem;
  }
}
</style>
