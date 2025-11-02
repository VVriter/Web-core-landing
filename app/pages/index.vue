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

// PostHog analytics
const { $posthog } = useNuxtApp()

// Трекінг перегляду головної сторінки
onMounted(() => {
  if ($posthog) {
    $posthog.capture('homepage_viewed', {
      page: 'homepage',
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      referrer: document.referrer || 'direct'
    })
  }
})

// SEO - useHead is a Nuxt 3 composable available globally
const siteUrl = 'https://web-core.agency'
const siteTitle = 'WebCore - Перетворюємо ідеї на цифровий успіх'
const siteDescription = 'Створюємо веб-сайти, які приносять прибуток. Від ідеї до запуску за 14 днів. Професійні послуги веб-розробки, дизайну та технічної підтримки для вашого бізнесу.'
const ogImage = `${siteUrl}/images/og-image.jpg`

// @ts-ignore
useHead({
  title: siteTitle,
  meta: [
    // Basic SEO
    { name: 'description', content: siteDescription },
    { name: 'keywords', content: 'веб-розробка, створення сайтів, web development, веб-дизайн, ecommerce, інтернет-магазин, корпоративний сайт, landing page, SEO оптимізація, технічна підтримка, Україна' },
    
    // Open Graph / Facebook / Discord / Telegram
    { property: 'og:title', content: siteTitle },
    { property: 'og:description', content: siteDescription },
    { property: 'og:url', content: siteUrl },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:secure_url', content: ogImage },
    { property: 'og:type', content: 'website' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@webcore_agency' },
    { name: 'twitter:creator', content: '@webcore_agency' },
    { name: 'twitter:title', content: siteTitle },
    { name: 'twitter:description', content: siteDescription },
    { name: 'twitter:url', content: siteUrl },
    { name: 'twitter:image', content: ogImage },
    { name: 'twitter:image:alt', content: 'WebCore Agency - Професійні веб-послуги для вашого бізнесу' },
  ],
  link: [
    { rel: 'canonical', href: siteUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'WebCore Agency',
        url: siteUrl,
        logo: `${siteUrl}/favicon.svg`,
        description: siteDescription,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'UA'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'support@web-core.agency',
          contactType: 'Customer Service',
          availableLanguage: ['Ukrainian']
        },
        sameAs: [
          'https://www.instagram.com/web_core_studio',
          'https://www.facebook.com/webcoreagency'
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          ratingCount: '50'
        }
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'WebCore Agency',
        url: siteUrl,
        description: siteDescription,
        publisher: {
          '@type': 'Organization',
          name: 'WebCore Agency',
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/favicon.svg`
          }
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Web Development',
        provider: {
          '@type': 'Organization',
          name: 'WebCore Agency'
        },
        areaServed: {
          '@type': 'Country',
          name: 'Ukraine'
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Web Development Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Веб-розробка',
                description: 'Створення сучасних веб-сайтів та веб-додатків'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Дизайн',
                description: 'UI/UX дизайн для веб-сайтів та мобільних додатків'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'E-commerce',
                description: 'Створення інтернет-магазинів та платформ для онлайн-продажів'
              }
            }
          ]
        }
      })
    }
  ]
})
</script>

<style scoped>
.home-page {
  overflow-x: hidden;
}
</style>