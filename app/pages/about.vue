<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Про нас</h1>
          <p class="hero-description">
            Команда професіоналів, яка перетворює ідеї в цифровий успіх
          </p>
        </div>
      </div>
    </section>

    <section class="about-content">
      <div class="container">
        <div class="content-wrapper">
          <div class="about-text">
            <h2 class="section-title">Хто ми</h2>
            <p class="text-paragraph">
              WebCore - це команда професіоналів, яка допомагає бізнесам досягати успіху в інтернеті. 
              Ми розуміємо ваші бізнес-цілі та створюємо рішення, які реально працюють.
            </p>
            <p class="text-paragraph">
              Наша мета - не просто зробити красивий сайт. Ми створюємо інструменти, які приносять 
              реальні результати: більше клієнтів, збільшення продажів та розвиток вашого бізнесу.
            </p>
            <h3 class="subtitle">Наші цінності</h3>
            <div class="values-grid">
              <div v-for="value in values" :key="value.title" class="value-card">
                <Icon :name="value.icon" class="value-icon" />
                <h4 class="value-title">{{ value.title }}</h4>
                <p class="value-description">{{ value.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Icon from '../../components/Icon.vue'

// @ts-ignore
useHead({
  title: 'Про нас - WebCore',
  meta: [
    { name: 'description', content: 'Дізнайтеся більше про команду WebCore та наші цінності' }
  ]
})

const values = [
  {
    title: 'Якість',
    description: 'Високі стандарти в кожному проекті',
    icon: 'mdi:star'
  },
  {
    title: 'Результат',
    description: 'Концентрація на реальних результатах для клієнтів',
    icon: 'mdi:target'
  },
  {
    title: 'Підтримка',
    description: 'Довгострокове партнерство з клієнтами',
    icon: 'mdi:shield-check'
  }
]
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 1200px;
}

.about-page {
  min-height: 100vh;
  padding-top: 70px;
}

.about-hero {
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

.about-content {
  padding: 4rem 0;
  background: var(--color-bg-secondary);
}

.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
}

.text-paragraph {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-top: 3rem;
  margin-bottom: 2rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.value-card {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.value-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px var(--color-shadow-color);
  border-color: var(--color-border-accent);
}

.value-icon {
  width: 48px;
  height: 48px;
  color: var(--color-accent-primary);
  margin: 0 auto 1rem;
}

.value-icon :deep(svg) {
  width: 48px;
  height: 48px;
}

.value-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
}

.value-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

@media (max-width: 1343px) {
  .about-hero {
    padding: 3rem 0;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .about-content {
    padding: 3rem 0;
  }

  .values-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .about-hero {
    padding: 2rem 0;
  }

  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .value-card {
    padding: 1.5rem;
  }
}
</style>
