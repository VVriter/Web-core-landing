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
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-number">30+</div>
              <div class="stat-label">Видів послуг</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">200+</div>
              <div class="stat-label">Проєктів</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">95%</div>
              <div class="stat-label">Задоволених клієнтів</div>
            </div>
          </div>
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
  { id: 'all', name: 'Всі послуги', icon: 'mdi:view-grid', count: 30 },
  { id: 'web', name: 'Веб-розробка', icon: 'mdi:web', count: 8 },
  { id: 'business', name: 'Бізнес-рішення', icon: 'mdi:briefcase', count: 12 },
  { id: 'marketing', name: 'Маркетинг', icon: 'mdi:trending-up', count: 5 },
  { id: 'support', name: 'Підтримка', icon: 'mdi:headset', count: 5 }
]

// All services data - business and development focused
const allServices = [
  // Web Development Services
  {
    id: 'corporate-website',
    title: 'Корпоративний сайт',
    description: 'Професійний сайт для представлення вашої компанії з адміністративною панеллю. Збільшує довіру клієнтів та покращує імідж бізнесу.',
    icon: 'mdi:domain',
    category: 'web',
    popular: true,
    featured: true,
    features: [
      'Адаптивний дизайн для всіх пристроїв',
      'CMS для самостійного управління контентом',
      'SEO оптимізація для Google',
      'Інтеграція з соціальними мережами',
      'Форми зворотного зв\'язку з клієнтами',
      'Аналітика відвідувачів',
      '3 місяці безкоштовної підтримки'
    ]
  },
  {
    id: 'landing-page',
    title: 'Landing Page (продаюча сторінка)',
    description: 'Сторінка з високою конверсією для залучення клієнтів та збільшення продажів. Ідеально для рекламних кампаній.',
    icon: 'mdi:rocket-launch',
    category: 'web',
    popular: true,
    features: [
      'Продаючий копірайтинг',
      'A/B тестування для оптимізації',
      'Інтеграція з CRM системами',
      'Детальна аналітика конверсій',
      'Швидке завантаження (до 3 сек)',
      'Форми захоплення лідів',
      'Інтеграція з рекламними кабінетами'
    ]
  },
  {
    id: 'ecommerce',
    title: 'Інтернет-магазин',
    description: 'Повнофункціональний онлайн-магазин для продажу товарів. Збільшує обсяг продажів та автоматизує бізнес-процеси.',
    icon: 'mdi:shopping',
    category: 'web',
    featured: true,
    features: [
      'Каталог товарів з фільтрами',
      'Кошик та швидке оформлення',
      'Інтеграція з LiqPay, Приват24',
      'Система знижок та промокодів',
      'Панель управління замовленнями',
      'Інтеграція з 1С та складським обліком',
      'SEO для кожного товару'
    ]
  },
  {
    id: 'web-app',
    title: 'Веб-додаток',
    description: 'Складні веб-додатки для автоматизації бізнес-процесів. Заміщують дорогі desktop рішення.',
    icon: 'mdi:application',
    category: 'web',
    features: [
      'Індивідуальна розробка під потреби',
      'Складна бізнес-логіка',
      'API інтеграції з існуючими системами',
      'Панель адміністратора',
      'Система ролей та доступів',
      'Масштабована архітектура',
      'Мобільна версія'
    ]
  },
  {
    id: 'crm-system',
    title: 'CRM система',
    description: 'Система управління клієнтами для збільшення продажів та покращення сервісу. Автоматизує роботу з клієнтами.',
    icon: 'mdi:account-group',
    category: 'business',
    popular: true,
    features: [
      'База клієнтів та історія взаємодій',
      'Воронка продажів та конверсії',
      'Автоматизація email розсилок',
      'Звіти по продажах та менеджерах',
      'Інтеграція з телефонією',
      'Мобільний додаток для менеджерів',
      'Нагадування про дзвінки та зустрічі'
    ]
  },
  {
    id: 'booking-system',
    title: 'Система онлайн-бронювання',
    description: 'Автоматизація запису клієнтів для салонів, клінік, готелів. Збільшує завантаженість на 40%.',
    icon: 'mdi:calendar-check',
    category: 'business',
    popular: true,
    features: [
      'Календар з доступними слотами',
      'Онлайн оплата послуг',
      'SMS та email нагадування',
      'Управління ресурсами та співробітниками',
      'Звіти по завантаженості',
      'Інтеграція з Google Calendar',
      'Мобільний додаток для клієнтів'
    ]
  },
  {
    id: 'erp-system',
    title: 'ERP система',
    description: 'Комплексна автоматизація всіх бізнес-процесів компанії. Підвищує ефективність роботи на 60%.',
    icon: 'mdi:factory',
    category: 'business',
    featured: true,
    features: [
      'Управління складськими запасами',
      'Фінансовий облік та звітність',
      'Планування виробництва',
      'Управління персоналом',
      'Документообіг',
      'Інтеграція з банківськими системами',
      'Мобільний доступ для керівництва'
    ]
  },
  {
    id: 'learning-platform',
    title: 'Навчальна платформа',
    description: 'Система дистанційного навчання для корпоративного навчання або продажу курсів онлайн.',
    icon: 'mdi:school',
    category: 'business',
    features: [
      'Відео уроки з прогресом перегляду',
      'Тестування знань та сертифікати',
      'Система оцінок та рейтингів',
      'Прогрес студентів та аналітика',
      'Форуми та чати для спілкування',
      'Система оплати курсів',
      'Мобільний додаток для навчання'
    ]
  },
  {
    id: 'inventory-system',
    title: 'Система управління складом',
    description: 'Автоматизація складських операцій та обліку товарів. Зменшує втрати на 25%.',
    icon: 'mdi:warehouse',
    category: 'business',
    features: [
      'Облік товарів та їх переміщення',
      'Штрих-кодування продукції',
      'Автоматичні замовлення постачальникам',
      'Звіти по оборотності товарів',
      'Інтеграція з касовими апаратами',
      'Мобільний додаток для складу',
      'Прогнозування попиту'
    ]
  },
  {
    id: 'hr-system',
    title: 'HR система',
    description: 'Автоматизація HR процесів: від найму до звільнення. Покращує ефективність HR відділу.',
    icon: 'mdi:account-tie',
    category: 'business',
    features: [
      'База співробітників та документів',
      'Система найму та співбесід',
      'Облік робочого часу',
      'Розрахунок зарплати та премій',
      'Система оцінки персоналу',
      'Планування відпусток',
      'Корпоративний портал'
    ]
  },
  {
    id: 'restaurant-pos',
    title: 'POS система для ресторанів',
    description: 'Комплексна автоматизація ресторанного бізнесу. Збільшує швидкість обслуговування на 50%.',
    icon: 'mdi:silverware-fork-knife',
    category: 'business',
    features: [
      'Меню з можливістю швидкого замовлення',
      'Інтеграція з кухнею та баром',
      'Система лояльності клієнтів',
      'Управління столиками та резервами',
      'Звіти по продажах та популярних стравах',
      'Інтеграція з доставкою',
      'Мобільний додаток для офіціантів'
    ]
  },
  {
    id: 'medical-system',
    title: 'Медична інформаційна система',
    description: 'Автоматизація роботи клініки або лікарні. Покращує якість медичного обслуговування.',
    icon: 'mdi:medical-bag',
    category: 'business',
    features: [
      'Електронні медичні карти пацієнтів',
      'Запис на прийом та черги',
      'Облік медикаментів та обладнання',
      'Інтеграція з лабораторіями',
      'Звіти для МОЗ та страхових',
      'Телемедицина консультації',
      'Мобільний додаток для лікарів'
    ]
  },
  {
    id: 'marketplace',
    title: 'Маркетплейс',
    description: 'Платформа для торгівлі між багатьма продавцями. Створіть свій власний "Rozetka".',
    icon: 'mdi:store',
    category: 'web',
    features: [
      'Реєстрація продавців та модерація',
      'Комісійна система та виплати',
      'Рейтинги та відгуки покупців',
      'Єдина система оплати',
      'Логістика та доставка',
      'Панель аналітики для продавців',
      'Мобільний додаток для покупців'
    ]
  },
  {
    id: 'real-estate-crm',
    title: 'CRM для нерухомості',
    description: 'Спеціалізована система для агентств нерухомості. Збільшує кількість угод на 35%.',
    icon: 'mdi:home-city',
    category: 'business',
    features: [
      'База об\'єктів з детальними характеристиками',
      'CRM для роботи з клієнтами',
      'Інтеграція з картами та геолокацією',
      'Система показів та зустрічей',
      'Розрахунок комісій агентів',
      'Інтеграція з банками для іпотеки',
      'Мобільний додаток для агентів'
    ]
  },
  {
    id: 'logistics-system',
    title: 'Система логістики',
    description: 'Автоматизація логістичних процесів та доставки. Оптимізує маршрути та зменшує витрати.',
    icon: 'mdi:truck',
    category: 'business',
    features: [
      'Планування маршрутів доставки',
      'Трекінг вантажів в реальному часі',
      'Управління автопарком',
      'Розрахунок вартості доставки',
      'Інтеграція з Новою Поштою, УкрПоштою',
      'Система сповіщень клієнтів',
      'Мобільний додаток для водіїв'
    ]
  },
  {
    id: 'api-development',
    title: 'Розробка API',
    description: 'Створення RESTful API для інтеграції різних систем. Забезпечує взаємодію між додатками.',
    icon: 'mdi:api',
    category: 'web',
    features: [
      'RESTful та GraphQL API',
      'Документація для розробників',
      'Система аутентифікації та авторизації',
      'Версіонування API',
      'Моніторинг та логування запитів',
      'Rate limiting та безпека',
      'SDK для популярних мов програмування'
    ]
  },
  {
    id: 'mobile-backend',
    title: 'Backend для мобільних додатків',
    description: 'Серверна частина для мобільних додатків з push-сповіщеннями та синхронізацією.',
    icon: 'mdi:cellphone-link',
    category: 'web',
    features: [
      'API для iOS та Android додатків',
      'Push-сповіщення',
      'Синхронізація даних офлайн/онлайн',
      'Система користувачів та профілів',
      'Файловий сервер для медіа',
      'Аналітика використання додатку',
      'Система оновлень додатку'
    ]
  },
  {
    id: 'chatbot-development',
    title: 'Розробка чат-ботів',
    description: 'Автоматизація спілкування з клієнтами через чат-боти. Зменшує навантаження на підтримку.',
    icon: 'mdi:robot',
    category: 'web',
    features: [
      'Боти для Telegram, Viber, Facebook',
      'Інтеграція з CRM системами',
      'Обробка природної мови (NLP)',
      'Автоматичні відповіді на FAQ',
      'Прийом замовлень через бота',
      'Аналітика діалогів з клієнтами',
      'Передача складних питань оператору'
    ]
  },
  {
    id: 'data-analytics',
    title: 'Система аналітики даних',
    description: 'Збір та аналіз бізнес-даних для прийняття рішень. Допомагає знайти точки росту.',
    icon: 'mdi:chart-line',
    category: 'business',
    features: [
      'Збір даних з різних джерел',
      'Інтерактивні дашборди',
      'Прогнозування трендів',
      'Сегментація клієнтів',
      'A/B тестування',
      'Звіти для керівництва',
      'Експорт даних у Excel, PDF'
    ]
  },
  {
    id: 'document-management',
    title: 'Система документообігу',
    description: 'Електронний документообіг для компаній. Прискорює узгодження документів у 3 рази.',
    icon: 'mdi:file-document-multiple',
    category: 'business',
    features: [
      'Створення та редагування документів',
      'Маршрути узгодження',
      'Електронний підпис документів',
      'Версіонування та історія змін',
      'Пошук по вмісту документів',
      'Інтеграція з 1С та іншими системами',
      'Архівування та резервні копії'
    ]
  },
  {
    id: 'seo-optimization',
    title: 'SEO просування сайту',
    description: 'Просування сайту в пошукових системах для залучення цільових клієнтів. Збільшує трафік у 5 разів.',
    icon: 'mdi:trending-up',
    category: 'marketing',
    popular: true,
    features: [
      'Технічний аудит сайту',
      'Оптимізація контенту під ключові слова',
      'Збір семантичного ядра',
      'Побудова якісних посилань',
      'Локальне SEO для бізнесу',
      'Щомісячні звіти з результатами',
      'Аналіз конкурентів'
    ]
  },
  {
    id: 'google-ads',
    title: 'Налаштування Google Ads',
    description: 'Реклама в Google для швидкого залучення клієнтів. Окупається з першого дня.',
    icon: 'mdi:google',
    category: 'marketing',
    popular: true,
    features: [
      'Аналіз конкурентів та ринку',
      'Збір ключових слів',
      'Створення продаючих оголошень',
      'Налаштування точного таргетингу',
      'Оптимізація бюджету',
      'Детальна аналітика ROI',
      'Ремаркетинг для повернення клієнтів'
    ]
  },
  {
    id: 'facebook-ads',
    title: 'Facebook та Instagram реклама',
    description: 'Таргетована реклама в соціальних мережах для збільшення продажів та впізнаваності бренду.',
    icon: 'mdi:facebook',
    category: 'marketing',
    features: [
      'Створення креативів та відео',
      'Налаштування цільових аудиторій',
      'Ретаргетинг відвідувачів сайту',
      'Lookalike аудиторії',
      'A/B тестування креативів',
      'Оптимізація під конверсії',
      'Звіти по ефективності кампаній'
    ]
  },
  {
    id: 'content-marketing',
    title: 'Контент-маркетинг',
    description: 'Створення корисного контенту для залучення клієнтів. Будує довіру до бренду.',
    icon: 'mdi:file-document-edit',
    category: 'marketing',
    features: [
      'Розробка контент-стратегії',
      'Написання SEO статей для блогу',
      'Створення відео контенту',
      'Ведення соціальних мереж',
      'Email розсилки для клієнтів',
      'Аналіз ефективності контенту',
      'Створення лід-магнітів'
    ]
  },
  {
    id: 'email-marketing',
    title: 'Email маркетинг',
    description: 'Автоматизовані email кампанії для утримання клієнтів. ROI до 4000%.',
    icon: 'mdi:email-multiple',
    category: 'marketing',
    features: [
      'Збір підписників через лід-магніти',
      'Сегментація бази клієнтів',
      'Автоматичні воронки продажів',
      'Персоналізовані розсилки',
      'A/B тестування листів',
      'Аналітика відкриттів та кліків',
      'Інтеграція з CRM системами'
    ]
  },
  {
    id: 'conversion-optimization',
    title: 'Оптимізація конверсії сайту',
    description: 'Збільшення відсотка відвідувачів, які стають клієнтами. Підвищує прибуток без додаткового трафіку.',
    icon: 'mdi:chart-line-variant',
    category: 'marketing',
    features: [
      'Аналіз поведінки користувачів',
      'Heatmaps та записи сесій',
      'A/B тестування елементів',
      'UX аудит сайту',
      'Оптимізація форм замовлення',
      'Покращення швидкості сайту',
      'Збільшення продажів на 30-50%'
    ]
  },
  {
    id: 'website-maintenance',
    title: 'Технічна підтримка сайту',
    description: 'Регулярне оновлення, резервне копіювання та моніторинг роботи сайту 24/7.',
    icon: 'mdi:wrench',
    category: 'support',
    popular: true,
    features: [
      'Оновлення CMS та плагінів',
      'Щоденні резервні копії',
      'Моніторинг роботи сайту 24/7',
      'Виправлення помилок та багів',
      'Оновлення контенту на сайті',
      'Захист від хакерських атак',
      'Технічна підтримка в робочі години'
    ]
  },
  {
    id: 'hosting-support',
    title: 'Хостинг та домени',
    description: 'Надійний хостинг з високою швидкістю та 99.9% uptime. Управління доменними іменами.',
    icon: 'mdi:server',
    category: 'support',
    features: [
      'SSD хостинг з високою швидкістю',
      'SSL сертифікати для безпеки',
      'Щоденні автоматичні бекапи',
      'CDN мережа для прискорення',
      'Корпоративна email пошта',
      'Технічна підтримка 24/7',
      'Реєстрація та продовження доменів'
    ]
  },
  {
    id: 'security-audit',
    title: 'Аудит безпеки сайту',
    description: 'Комплексна перевірка сайту на вразливості та загрози. Захист від хакерських атак.',
    icon: 'mdi:shield-check',
    category: 'support',
    features: [
      'Сканування на вразливості',
      'Аналіз коду на безпеку',
      'Перевірка SSL сертифікатів',
      'Тестування на проникнення',
      'Рекомендації по усуненню загроз',
      'Налаштування firewall',
      'План дій при інцидентах'
    ]
  },
  {
    id: 'performance-optimization',
    title: 'Оптимізація швидкості сайту',
    description: 'Прискорення завантаження сайту для кращого користувацького досвіду та SEO.',
    icon: 'mdi:speedometer',
    category: 'support',
    features: [
      'Детальний аудит швидкості',
      'Оптимізація зображень та медіа',
      'Налаштування кешування',
      'Мінімізація CSS та JavaScript',
      'CDN налаштування',
      'Оптимізація Core Web Vitals',
      'Збільшення швидкості у 3-5 разів'
    ]
  },
  {
    id: 'migration-service',
    title: 'Міграція сайту',
    description: 'Безпечне перенесення сайту на новий хостинг або платформу без втрати даних та позицій.',
    icon: 'mdi:swap-horizontal',
    category: 'support',
    features: [
      'Повне перенесення всіх даних',
      'Збереження SEO позицій',
      'Налаштування 301 редиректів',
      'Тестування всього функціоналу',
      'DNS налаштування',
      'Мінімальний час недоступності',
      'Гарантія збереження даних'
    ]
  }
]

// Advantages data
const advantages = [
  {
    id: 'experience',
    title: '5+ років досвіду',
    description: 'Реалізували більше 200 проєктів різної складності',
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

.service-card.featured::before {
  content: 'Рекомендуємо';
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--color-accent-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 3;
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
