<template>
  <div class="home-page">
    <HeroSection />
    <ProcessSection />
    <FeaturesSection />
    <PortfolioSection />
    <FaqSection />

  </div>
</template>

<script setup lang="ts">
import HeroSection from '../../components/sections/HeroSection.vue'
import ProcessSection from '../../components/sections/ProcessSection.vue'
import FeaturesSection from '../../components/sections/FeaturesSection.vue'
import FaqSection from '../../components/sections/FaqSection.vue'
import PortfolioSection from '../../components/sections/PortfolioSection.vue'

// SEO - useHead is a Nuxt 3 composable available globally
// @ts-ignore
useHead({
  title: 'WebCore - Перетворюємо ідеї на цифровий успіх',
  meta: [
    { name: 'description', content: 'Створюємо веб-сайти, які приносять прибуток. Від ідеї до запуску за 14 днів. Гарантуємо результат або повертаємо гроші.' },
    { property: 'og:title', content: 'WebCore - Перетворюємо ідеї на цифровий успіх' },
    { property: 'og:description', content: 'Створюємо веб-сайти, які приносять прибуток. Гарантуємо результат.' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>

<style scoped>
.home-page {
  overflow-x: hidden;
}
</style>