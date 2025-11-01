<template>
  <div class="services-page">
    <section class="services-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Наші послуги</h1>
          <p class="hero-description">
            Всі послуги, які потрібні вашому бізнесу для успіху в інтернеті: від створення сайту до його розвитку
          </p>
        </div>
      </div>
    </section>

    <section class="services-list">
      <div class="container">
        <div class="services-grid">
          <div 
            v-for="service in services" 
            :key="service.title"
            class="service-card"
          >
            <div class="service-icon">
              <Icon :name="service.icon" />
            </div>
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.description }}</p>
            <ul class="service-features">
              <li v-for="feature in service.features" :key="feature">{{ feature }}</li>
            </ul>
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
  title: 'Послуги - WebCore',
  meta: [
    { name: 'description', content: 'Професійні веб-послуги: розробка сайтів, дизайн, технічна підтримка' }
  ]
})

const services = [
  {
    title: 'Створення сайтів, які працюють',
    description: 'Розробляємо сайти, які не просто красиві, але й реально працюють на ваш бізнес: приносять клієнтів, збільшують продажі та розвивають ваш бренд в інтернеті',
    icon: 'mdi:web',
    features: [
      'Сайти для компаній',
      'Інтернет-магазини',
      'Сторінки для продажу',
      'Рішення під ваш бізнес'
    ]
  },
  {
    title: 'Дизайн, який конвертує',
    description: 'Створюємо дизайн, який залучає ваших клієнтів, будує довіру до бренду та допомагає досягти бізнес-цілей',
    icon: 'mdi:palette',
    features: [
      'Розуміння ваших клієнтів',
      'Дизайн для результатів',
      'Робота на всіх пристроях',
      'Унікальний стиль бренду'
    ]
  },
  {
    title: 'Підтримка та розвиток',
    description: 'Допомагаємо розвивати ваш сайт: додаємо нові функції, оновлюємо контент та завжди готові відповісти на ваші питання',
    icon: 'mdi:handshake',
    features: [
      'Гарантія та супровід',
      'Оновлення контенту',
      'Допомога та консультації',
      'Захист та безпека'
    ]
  }
]
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 1200px;
}

.services-page {
  min-height: 100vh;
  padding-top: 70px;
}

/* Hero Section */
.services-hero {
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

/* Services List */
.services-list {
  padding: 4rem 0;
  background: var(--color-bg-secondary);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.service-card {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 20px;
  padding: 2.5rem;
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px var(--color-shadow-color);
  border-color: var(--color-border-accent);
}

.service-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #8B5CF6, #D946EF);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
}

.service-icon :deep(svg) {
  width: 32px;
  height: 32px;
}

.service-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
}

.service-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-features li {
  color: var(--color-text-secondary);
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.service-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-accent-primary);
  font-weight: 600;
}

/* Responsive */
@media (max-width: 1343px) {
  .services-hero {
    padding: 3rem 0;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.125rem;
  }

  .services-list {
    padding: 3rem 0;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .services-hero {
    padding: 2rem 0;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .service-card {
    padding: 1.5rem;
  }
}
</style>
