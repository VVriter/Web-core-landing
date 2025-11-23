<template>
  <div class="services-page">
    <!-- Hero Section -->
    <section class="services-hero">
      <div class="hero-background">
        <div class="floating-particles">
          <div 
            v-for="i in 15" 
            :key="i" 
            class="particle" 
            :style="getParticleStyle(i)"
          ></div>
        </div>
        <div class="gradient-orb gradient-orb-1"></div>
        <div class="gradient-orb gradient-orb-2"></div>
        <div class="gradient-orb gradient-orb-3"></div>
      </div>
      
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <Icon name="mdi:star-circle" class="badge-icon" />
            Професійні IT-послуги
          </div>
          <h1 class="hero-title">
            Повний спектр <span class="gradient-text">цифрових рішень</span> для вашого бізнесу
          </h1>
          <p class="hero-description">
            Від ідеї до запуску — ми створюємо веб-рішення, які приносять реальні результати. 
            Автоматизуємо бізнес-процеси та збільшуємо прибутковість вашої компанії.
          </p>
        </div>
      </div>
    </section>

    <!-- Services Categories Filter -->
    <section class="services-filter">
      <div class="container">
        <div class="filter-tabs">
          <button 
            v-for="category in serviceCategories" 
            :key="category.id"
            class="filter-tab"
            :class="{ 'active': activeCategory === category.id }"
            @click="activeCategory = category.id"
          >
            <Icon :name="category.icon" class="tab-icon" />
            {{ category.name }}
            <span class="tab-count">{{ category.count }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="services-grid-section">
      <div class="container">
        <div class="services-grid">
          <div 
            v-for="service in filteredServices" 
            :key="service.id"
            class="service-card"
            :class="service.featured ? 'featured' : ''"
          >
            <div class="service-header">
              <div class="service-icon">
                <Icon :name="service.icon" size="lg" />
              </div>
              <div class="service-badge" v-if="service.popular">
                <Icon name="mdi:fire" size="sm" />
                Популярно
              </div>
            </div>
            
            <div class="service-content">
              <h3 class="service-title">{{ service.title }}</h3>
              <!--<div class="service-price" v-if="service.from">
                <span class="price-label">від</span>
                <span class="price-value">${{ service.from }}</span>
              </div>-->
              <p class="service-description">{{ service.description }}</p>
              
              <ul class="service-features">
                <li v-for="feature in service.features" :key="feature">
                  <Icon name="mdi:check-circle" size="sm" class="feature-icon" />
                  {{ feature }}
                </li>
              </ul>
              
            </div>
            
            <div class="service-actions">
              <button class="service-btn primary" @click="openServiceModal(service)">
                <Icon name="mdi:rocket-launch" size="sm" />
                Замовити
              </button>
              <button class="service-btn secondary" @click="openConsultationModal(service)">
                <Icon name="mdi:chat" size="sm" />
                Консультація
              </button>
            </div>
            
            <!-- Service Card Effects -->
            <div class="card-glow"></div>
            <div class="card-pattern"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="why-choose-us">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">
            <Icon name="mdi:shield-check" class="badge-icon" />
            Наші переваги
          </div>
          <h2 class="section-title">Чому обирають WebCore?</h2>
        </div>
        
        <div class="advantages-grid">
          <div v-for="advantage in advantages" :key="advantage.id" class="advantage-card">
            <div class="advantage-icon">
              <Icon :name="advantage.icon" size="lg" />
            </div>
            <h4 class="advantage-title">{{ advantage.title }}</h4>
            <p class="advantage-description">{{ advantage.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="services-cta">
      <div class="cta-background">
        <div class="cta-pattern"></div>
      </div>
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Готові розпочати ваш проєкт?</h2>
          <p class="cta-description">
            Отримайте безкоштовну консультацію та персональну пропозицію вже сьогодні
          </p>
          <div class="cta-actions">
            <button class="cta-btn primary" @click="openModal('order')">
              <Icon name="mdi:rocket-launch" size="md" />
              Замовити проєкт
            </button>
            <button class="cta-btn secondary" @click="openModal('contact')">
              <Icon name="mdi:phone" size="md" />
              Безкоштовна консультація
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Icon from '../../components/Icon.vue'
import { useModal } from '../../composables/useModal'

const { openModal } = useModal()

// @ts-ignore
useHead({
  title: 'Послуги - WebCore | Повний спектр IT-рішень для вашого бізнесу',
  meta: [
    { name: 'description', content: 'Більше 50 видів IT-послуг: веб-розробка, дизайн, маркетинг, підтримка, консалтинг. Професійні рішення для максимального росту вашого бізнесу.' },
    { name: 'keywords', content: 'веб-розробка, дизайн сайтів, SEO, маркетинг, підтримка сайтів, консалтинг, e-commerce, мобільні додатки, брендинг' }
  ]
})

// Active category filter
const activeCategory = ref('all')

// Service categories
const serviceCategories = [
  { id: 'all', name: 'Всі послуги', icon: 'mdi:view-grid', count: 18 },
  { id: 'web', name: 'Веб-розробка', icon: 'mdi:web', count: 7 },
  { id: 'business', name: 'Бізнес-рішення', icon: 'mdi:briefcase', count: 7 },
  { id: 'marketing', name: 'Маркетинг', icon: 'mdi:trending-up', count: 2 },
  { id: 'support', name: 'Підтримка', icon: 'mdi:headset', count: 2 }
]

// All services data - business and development focused
const allServices = [
  {
    id: 'business-card-site',
    from: 180,
    title: 'Сайт-візитка',
    description: 'Короткий сайт, що презентує бізнес або спеціаліста: хто ви, що робите та як з вами зв\'язатися.',
    icon: 'mdi:account-box',
    category: 'web',
    popular: true,
    featured: false,
    features: [
      'Презентація компанії або спеціаліста',
      'Опис послуг чи компетенцій',
      'Блок контактів (телефон, e-mail, соцмережі)',
      'Форма зворотного зв\'язку',
      'Адаптивний сучасний дизайн',
      'Швидка розробка та запуск'
    ]
  },
  {
    id: 'landing-page',
    from: 270,
    title: 'Лендінг (Landing Page)',
    description: 'Односторінковий сайт для продажів або реклами окремої послуги чи товару.',
    icon: 'mdi:cursor-default-click',
    category: 'web',
    popular: true,
    featured: false,
    features: [
      'Структура, орієнтована на конверсію',
      'Маркетингові блоки (офер, переваги, CTA)',
      'Форма збору заявок або лідів',
      'Інтеграція з рекламою та аналітикою',
      'Адаптивний дизайн',
      'Швидкий запуск під рекламну кампанію'
    ]
  },
  {
    id: 'official-website',
    from: 365,
    title: 'Офіційний сайт',
    description: 'Стандартний корпоративний сайт із повною інформацією про діяльність компанії.',
    icon: 'mdi:domain',
    category: 'web',
    popular: true,
    featured: false,
    features: [
      'Розділи: Про компанію, Послуги, Кейси, Блог, Контакти',
      'Корпоративний імідж та бренд-дизайн',
      'Професійна структура для компаній будь-якого масштабу',
      'Розширені SEO-налаштування',
      'Форми зворотного зв\'язку та інтеграції CRM',
      'Можливість подальшого масштабування'
    ]
  },
  {
    id: 'ecommerce-store',
    from: 610,
    title: 'Інтернет-магазин (E-commerce)',
    description: 'Повноцінний онлайн-магазин із каталогом товарів, кошиком та системою оплат.',
    icon: 'mdi:shopping-outline',
    category: 'web',
    popular: false,
    featured: false,
    features: [
      'Каталог товарів із фото, описами та характеристиками',
      'Кошик та оформлення замовлення',
      'Онлайн-оплати (банківські картки, Apple Pay/Google Pay)',
      'Особистий кабінет користувача',
      'Фільтри, сортування та пошук по товарах',
      'Інтеграція служб доставки',
      'Система акцій, промокодів і знижок',
      'Підключення аналітики та e-commerce подій'
    ]
  },
  {
    id: 'corporate-website',
    from: 490,
    title: 'Корпоративний сайт',
    description: 'Сайт для середнього або великого бізнесу з повною структурою компанії та інформаційними розділами.',
    icon: 'mdi:office-building',
    category: 'web',
    popular: false,
    featured: false,
    features: [
      'Розділи: Послуги, Команда, Кейси, Блог, Вакансії',
      'Корпоративний бренд та продуманий UX',
      'Можливість масштабування та розвитку проєкту',
      'SEO-оптимізація та технічна швидкодія',
      'Інтеграції з CRM/HR системами',
      'Форми для заявок, відгуків, подачі на вакансії'
    ]
  },
  {
    id: 'portfolio-website',
    from: 170,
    title: 'Портфоліо-сайт',
    description: 'Сайт для дизайнерів, фотографів, майстрів та студій із демонстрацією робіт.',
    icon: 'mdi:palette',
    category: 'web',
    popular: false,
    featured: false,
    features: [
      'Галерея робіт або проєктів',
      'Категорії та фільтри портфоліо',
      'Сторінки з детальним описом робіт',
      'Блок "Про мене/нас"',
      'Контакти та форми співпраці',
      'Адаптивний стильний дизайн'
    ]
  },
  {
    id: 'catalog-website',
    from: 290,
    title: 'Сайт-каталог',
    description: 'Великий каталог товарів або послуг без онлайн-оплат.',
    icon: 'mdi:view-grid-outline',
    category: 'web',
    popular: false,
    featured: false,
    features: [
      'Каталог товарів/послуг із фото та описами',
      'Фільтри, сортування, пошук',
      'Розділи: категорії, підкатегорії, картки товарів',
      'Форми запитів та замовлень без оплати',
      'Адаптивний дизайн',
      'Інтеграція аналітики та CRM (за бажанням)'
    ]
  },
  {
    id: 'technical-support',
    from: 35,
    title: 'Технічна підтримка сайту',
    description: 'Регулярне обслуговування сайту: оновлення, виправлення, моніторинг та безпека.',
    icon: 'mdi:shield',
    category: 'support',
    popular: false,
    featured: false,
    features: [
      'Регулярні оновлення CMS, плагінів і модулів',
      'Виправлення помилок та технічних багів',
      'Моніторинг доступності та швидкодії',
      'Резервні копії та відновлення',
      'Захист від вірусів і спаму',
      'Оптимізація продуктивності'
    ]
  },
  {
    id: 'payment-integration',
    from: 75,
    title: 'Інтеграція онлайн-оплат',
    description: 'Підключення WayForPay, LiqPay, Stripe, PayPal та інших платіжних систем.',
    icon: 'mdi:credit-card-outline',
    category: 'business',
    popular: false,
    featured: false,
    features: [
      'Налаштування WayForPay, LiqPay, Stripe, PayPal',
      'Підключення онлайн-оплат до сайту або кошика',
      'Інтеграція Apple Pay / Google Pay',
      'Тестові та бойові середовища',
      'Налаштування вебхукiв та нотифікацій',
      'Перевірка коректності платежів'
    ]
  },
  {
    id: 'pagespeed-optimization',
    from: 60,
    title: 'Оптимізація швидкості (PageSpeed)',
    description: 'Покращення швидкості завантаження сайту та показників Google Core Web Vitals.',
    icon: 'mdi:speedometer',
    category: 'support',
    popular: false,
    featured: false,
    features: [
      'Аналіз поточної швидкості сайту',
      'Оптимізація зображень та ресурсів',
      'Мінімізація CSS, JS, HTML',
      'Налаштування кешування та CDN',
      'Покращення показників Core Web Vitals',
      'Моніторинг швидкості після оптимізації'
    ]
  },
  {
    id: 'website-redesign',
    from: 245,
    title: 'Редизайн сайту',
    description: 'Оновлення зовнішнього вигляду та структури існуючого сайту для сучасного вигляду та покращення UX.',
    icon: 'mdi:brush',
    category: 'business',
    popular: false,
    featured: false,
    features: [
      'Аналіз поточного сайту та UX',
      'Оновлення дизайну під сучасні тенденції',
      'Перепроектування структури та навігації',
      'Адаптація під мобільні пристрої та різні екрани',
      'Інтеграція нових функцій та модулів',
      'Покращення швидкості та SEO-показників'
    ]
  },
  {
    id: 'ui-ux-design',
    from: 150,
    title: 'UI/UX дизайн сайтів',
    description: 'Створення зручного інтерфейсу, сучасного стилю та логічної структури для сайту.',
    icon: 'mdi:shape-outline',
    category: 'business',
    popular: false,
    featured: false,
    features: [
      'Проектування зручного користувацького інтерфейсу',
      'Логічна структура сайту та навігація',
      'Сучасний та привабливий дизайн',
      'Адаптація під різні пристрої та екрани',
      'Прототипування та тестування UX',
      'Підвищення конверсій та залучення користувачів'
    ]
  },
  {
    id: 'brand-style-website',
    from: 145,
    title: 'Створення бренд-стилю для сайту',
    description: 'Розробка фірмових кольорів, шрифтів та гайдлайнів візуального стилю для сайту.',
    icon: 'mdi:format-paint',
    category: 'business',
    popular: false,
    featured: false,
    features: [
      'Підбір фірмових кольорів та шрифтів',
      'Створення гайдлайнів візуального стилю',
      'Розробка логотипу та елементів бренду',
      'Уніфікація стилю для всіх сторінок сайту',
      'Адаптація бренду під цифрові платформи',
      'Підвищення впізнаваності та впливу бренду'
    ]
  },
  {
    id: 'seo-optimization',
    from: 95,
    title: 'SEO-оптимізація',
    description: 'Просування сайту в Google: технічне SEO, підбір ключових слів та внутрішня оптимізація.',
    icon: 'mdi:google-ads',
    category: 'marketing',
    popular: false,
    featured: false,
    features: [
      'Аналіз сайту та технічний аудит',
      'Підбір ключових слів та семантичне ядро',
      'Оптимізація контенту та метатегів',
      'Внутрішня перелінковка та структура сайту',
      'Підвищення швидкості та Core Web Vitals',
      'Моніторинг позицій та ефективності SEO'
    ]
  },
  {
    id: 'analytics-setup',
    from: 50,
    title: 'Налаштування аналітики (GA4, Tag Manager)',
    description: 'Підключення та налаштування Google Analytics 4, Tag Manager та інших систем аналітики для сайту.',
    icon: 'mdi:chart-line',
    category: 'marketing',
    popular: false,
    featured: false,
    features: [
      'Підключення Google Analytics 4 та Google Tag Manager',
      'Налаштування подій та конверсій',
      'Інтеграція з формами, кнопками та e-commerce подіями',
      'Перевірка коректності збору даних',
      'Налаштування звітів та дашбордів',
      'Рекомендації для покращення аналітики та маркетингу'
    ]
  },
  {
    id: 'chatbots-integration',
    from: 150,
    title: 'Чат-боти (Telegram, Viber, WhatsApp)',
    description: 'Створення та інтеграція чат-ботів для автоматизації заявок, консультацій, бронювань, продажів та підтримки клієнтів.',
    icon: 'mdi:robot',
    category: 'business',
    popular: false,
    featured: false,
    features: [
      'Розробка чат-ботів для Telegram, Viber, WhatsApp',
      'Автоматизація заявок, консультацій та бронювань',
      'Інтеграція з сайтом та CRM-системами',
      'Повідомлення та сповіщення клієнтів 24/7',
      'Підтримка продажів та обробка запитів клієнтів',
      'Можливість розширення функціоналу та сценаріїв взаємодії'
    ]
  },
  {
    id: 'crm-integration',
    from: 290,
    title: 'Підключення та налаштування CRM',
    description: 'Комплексне під\'єднання системи управління клієнтами до сайту для автоматизації продажів та роботи з лідами.',
    icon: 'mdi:account-group',
    category: 'business',
    popular: false,
    featured: false,
    features: [
      'Автоматичне збереження заявок із сайту',
      'Створення та ведення лідів',
      'Налаштування воронок продажів',
      'Інтеграція форм, месенджерів та чат-ботів',
      'Підключення e-mail розсилок та повідомлень',
      'Аналітика продажів та контроль всіх заявок',
      'Автоматизація бізнес-процесів компанії'
    ]
  },
  {
    id: 'online-calculators',
    from: 145,
    title: 'Створення онлайн-калькуляторів',
    description: 'Інтерактивний інструмент для автоматичного розрахунку ціни або параметрів продукту чи послуги.',
    icon: 'mdi:calculator',
    category: 'business',
    popular: false,
    featured: false,
    features: [
      'Розрахунок вартості товарів або послуг',
      'Калькулятори доставки, ремонту, кредитів, тарифів',
      'Конфігуратор товарів з інтерактивними опціями',
      'Інтеграція з сайтом та CRM',
      'Можливість збору даних користувачів та заявок',
      'Адаптивний дизайн для всіх пристроїв'
    ]
  }
]

// Advantages data
const advantages = [
  {
    id: 'experience',
    title: '5+ років досвіду',
    description: 'Багаторічна практика у створенні проектів будь-якої складності',
    icon: 'mdi:trophy'
  },
  {
    id: 'team',
    title: 'Команда експертів',
    description: 'Досвідчені розробники, дизайнери та маркетологи',
    icon: 'mdi:account-group'
  },
  {
    id: 'support',
    title: 'Підтримка 24/7',
    description: 'Завжди готові допомогти та відповісти на питання',
    icon: 'mdi:headset'
  },
  {
    id: 'guarantee',
    title: 'Гарантія якості',
    description: 'Гарантуємо якість роботи та дотримання термінів',
    icon: 'mdi:shield-check'
  },
  {
    id: 'price',
    title: 'Прозорі ціни',
    description: 'Чіткі ціни без прихованих платежів та доплат',
    icon: 'mdi:cash'
  },
  {
    id: 'modern',
    title: 'Сучасні технології',
    description: 'Використовуємо найновіші технології та підходи',
    icon: 'mdi:rocket'
  }
]

// Computed filtered services
const filteredServices = computed(() => {
  if (activeCategory.value === 'all') {
    return allServices
  }
  return allServices.filter(service => service.category === activeCategory.value)
})

// Generate consistent particle styles for SSR
const getParticleStyle = (index: number) => {
  const size = (index % 3) + 1
  const left = (index * 13.7) % 100
  const animationDuration = 20 + (index % 10) * 2
  const delay = (index * 0.8) % 5
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDuration: `${animationDuration}s`,
    animationDelay: `${delay}s`
  }
}

// Modal functions
const openServiceModal = (service: any) => {
  openModal('order')
}

const openConsultationModal = (service: any) => {
  openModal('contact')
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 1400px;
}

.services-page {
  min-height: 100vh;
  background: var(--color-bg-primary);
}

/* Hero Section */
.services-hero {
  position: relative;
  padding: 6rem 0;
  background: var(--color-bg-primary);
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: var(--color-accent-primary);
  border-radius: 50%;
  opacity: 0.1;
  animation: floatUp linear infinite;
}

@keyframes floatUp {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.1;
  }
  90% {
    opacity: 0.1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: gradientFloat 20s ease-in-out infinite;
}

.gradient-orb-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, var(--color-accent-primary), var(--color-accent-secondary));
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.gradient-orb-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, var(--color-accent-secondary), var(--color-accent-tertiary));
  top: 60%;
  right: 15%;
  animation-delay: -7s;
}

.gradient-orb-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(225deg, var(--color-accent-tertiary), var(--color-accent-primary));
  bottom: 20%;
  left: 50%;
  animation-delay: -14s;
}

@keyframes gradientFloat {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(50px, -50px) rotate(120deg);
  }
  66% {
    transform: translate(-30px, 30px) rotate(240deg);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-accent-primary);
  margin-bottom: 2rem;
  animation: badgeFloat 3s ease-in-out infinite;
}

@keyframes badgeFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.badge-icon {
  animation: iconRotate 4s linear infinite;
}

@keyframes iconRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 16px;
  padding: 1.5rem;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-accent-primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

/* Services Filter */
.services-filter {
  padding: 3rem 0;
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border-primary);
}

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tab:hover {
  border-color: var(--color-accent-primary);
  color: var(--color-accent-primary);
  transform: translateY(-2px);
}

.filter-tab.active {
  background: var(--color-accent-primary);
  border-color: var(--color-accent-primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
}

.tab-icon {
  transition: transform 0.3s ease;
}

.filter-tab:hover .tab-icon,
.filter-tab.active .tab-icon {
  transform: scale(1.1);
}

.tab-count {
  background: var(--color-bg-tertiary);
  border-radius: 12px;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
}

.filter-tab.active .tab-count {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* Services Grid */
.services-grid-section {
  padding: 4rem 0;
  background: var(--color-bg-primary);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2rem;
}

.service-card {
  position: relative;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 24px;
  padding: 2rem;
  transition: all 0.4s ease;
  overflow: hidden;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  border-color: var(--color-accent-primary);
}

.service-card.featured {
  border: 2px solid var(--color-accent-primary);
  background: linear-gradient(135deg, var(--color-card-bg) 0%, rgba(139, 92, 246, 0.05) 100%);
}

.service-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.service-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: transform 0.3s ease;
}

.service-card:hover .service-icon {
  transform: scale(1.1) rotate(5deg);
}

.service-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  animation: badgeFloat 2s ease-in-out infinite;
}

.service-content {
  margin-bottom: 2rem;
}

.service-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.service-price {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.price-label {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.price-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-accent-primary);
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.service-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.service-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text-secondary);
  padding: 0.5rem 0;
  font-size: 0.9rem;
}

.feature-icon {
  color: var(--color-accent-primary);
  flex-shrink: 0;
}


.service-actions {
  display: flex;
  gap: 0.75rem;
}

.service-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.service-btn.primary {
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  color: white;
}

.service-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
}

.service-btn.secondary {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-primary);
}

.service-btn.secondary:hover {
  background: var(--color-accent-primary);
  color: white;
  border-color: var(--color-accent-primary);
  transform: translateY(-2px);
}

/* Card Effects */
.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.service-card:hover .card-glow {
  opacity: 0.1;
}

.card-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  background-image: radial-gradient(circle at 1px 1px, var(--color-accent-primary) 1px, transparent 0);
  background-size: 20px 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.service-card:hover .card-pattern {
  opacity: 0.05;
}

/* Why Choose Us */
.why-choose-us {
  padding: 5rem 0;
  background: var(--color-bg-secondary);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-accent-primary);
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.advantage-card {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.advantage-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--color-accent-primary);
}

.advantage-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  transition: transform 0.3s ease;
}

.advantage-card:hover .advantage-icon {
  transform: scale(1.1);
}

.advantage-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
}

.advantage-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
  font-size: 0.95rem;
}

/* CTA Section */
.services-cta {
  position: relative;
  padding: 5rem 0;
  background: var(--color-bg-primary);
  overflow: hidden;
}

.cta-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.cta-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(45deg, var(--color-accent-primary) 25%, transparent 25%), 
                    linear-gradient(-45deg, var(--color-accent-primary) 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, var(--color-accent-primary) 75%), 
                    linear-gradient(-45deg, transparent 75%, var(--color-accent-primary) 75%);
  background-size: 60px 60px;
  background-position: 0 0, 0 30px, 30px -30px, -30px 0px;
  opacity: 0.03;
}

.cta-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
}

.cta-description {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  min-width: 200px;
  justify-content: center;
}

.cta-btn.primary {
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  color: white;
}

.cta-btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(139, 92, 246, 0.4);
}

.cta-btn.secondary {
  background: var(--color-card-bg);
  color: var(--color-text-primary);
  border: 2px solid var(--color-border-primary);
}

.cta-btn.secondary:hover {
  background: var(--color-accent-primary);
  color: white;
  border-color: var(--color-accent-primary);
  transform: translateY(-3px);
}

/* Responsive Design */
@media (max-width: 1343px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .services-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
  
  .hero-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .services-hero {
    padding: 4rem 0;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.125rem;
  }
  
  .hero-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .service-card {
    padding: 1.5rem;
  }
  
  .filter-tabs {
    gap: 0.5rem;
  }
  
  .filter-tab {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
  
  .advantages-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .services-hero {
    padding: 3rem 0;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .service-card {
    padding: 1.25rem;
  }
  
  .service-actions {
    flex-direction: column;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .cta-title {
    font-size: 2rem;
  }
}
</style>
