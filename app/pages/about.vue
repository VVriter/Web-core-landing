<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="hero-background">
        <div class="floating-particles">
          <div 
            v-for="i in 12" 
            :key="i" 
            class="particle" 
            :style="getParticleStyle(i)"
          ></div>
        </div>
        <div class="gradient-orb gradient-orb-1"></div>
        <div class="gradient-orb gradient-orb-2"></div>
      </div>
      
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <Icon name="mdi:account-group" class="badge-icon" />
            Про WebCore Agency
          </div>
          <h1 class="hero-title">
            Ми створюємо <span class="gradient-text">цифрові рішення</span>, які збільшують ваш прибуток
          </h1>
          <p class="hero-description">
            5 років досвіду в розробці веб-рішень для бізнесу. Більше 200 успішних проєктів. 
            Команда з 12 експертів, які знають, як перетворити ваші ідеї на прибуткові IT-рішення.
          </p>
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-number">12</div>
              <div class="stat-label">Експертів</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">200+</div>
              <div class="stat-label">Проєктів</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">95%</div>
              <div class="stat-label">Задоволених клієнтів</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Підтримка</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission-section">
      <div class="container">
        <div class="mission-content">
          <div class="mission-text">
            <div class="section-badge">
              <Icon name="mdi:target" class="badge-icon" />
              Наша місія
            </div>
            <h2 class="section-title">Допомагаємо бізнесу заробляти більше в інтернеті</h2>
            <p class="section-description">
              Ми не просто розробляємо сайти — ми створюємо цифрові інструменти, які автоматизують 
              ваш бізнес, залучають нових клієнтів та збільшують прибуток. Кожен наш проєкт — це 
              інвестиція у ваш успіх.
            </p>
            <div class="mission-features">
              <div class="feature-item">
                <Icon name="mdi:check-circle" class="feature-icon" />
                <span>Збільшення конверсії сайту на 40-60%</span>
              </div>
              <div class="feature-item">
                <Icon name="mdi:check-circle" class="feature-icon" />
                <span>Автоматизація бізнес-процесів</span>
              </div>
              <div class="feature-item">
                <Icon name="mdi:check-circle" class="feature-icon" />
                <span>Зменшення витрат на обслуговування</span>
              </div>
              <div class="feature-item">
                <Icon name="mdi:check-circle" class="feature-icon" />
                <span>Масштабування бізнесу без додаткових витрат</span>
              </div>
            </div>
          </div>
          <div class="mission-visual">
            <div class="visual-card">
              <Icon name="mdi:trending-up" class="visual-icon" />
              <h4>Ріст прибутку</h4>
              <p>Наші клієнти збільшують прибуток в середньому на 150% після запуску проєкту</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">
            <Icon name="mdi:star-circle" class="badge-icon" />
            Наші принципи
          </div>
          <h2 class="section-title">Чому клієнти обирають WebCore?</h2>
          <p class="section-description">
            Ми працюємо за принципами, які гарантують успіх вашого проєкту
          </p>
        </div>
        
        <div class="values-grid">
          <div v-for="value in values" :key="value.id" class="value-card">
            <div class="value-header">
              <div class="value-icon">
                <Icon :name="value.icon" size="lg" />
              </div>
              <div class="value-number">{{ value.number }}</div>
            </div>
            <h4 class="value-title">{{ value.title }}</h4>
            <p class="value-description">{{ value.description }}</p>
            <div class="value-result">
              <Icon name="mdi:arrow-up" class="result-icon" />
              <span class="result-text">{{ value.result }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">
            <Icon name="mdi:account-group" class="badge-icon" />
            Наша команда
          </div>
          <h2 class="section-title">Експерти, які створюють ваш успіх</h2>
        </div>
        
        <div class="team-grid">
          <div v-for="member in teamMembers" :key="member.id" class="team-card">
            <div class="member-avatar">
              <Icon :name="member.icon" size="xl" />
            </div>
            <div class="member-info">
              <h3 class="member-name">{{ member.name }}</h3>
              <h4 class="member-role">{{ member.role }}</h4>
              <p class="member-description">{{ member.description }}</p>
              <div class="member-skills">
                <span v-for="skill in member.skills" :key="skill" class="skill-tag">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <ProcessSection />

    <!-- CTA Section -->
    <section class="about-cta">
      <div class="cta-background">
        <div class="cta-pattern"></div>
      </div>
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Готові почати працювати з нами?</h2>
          <p class="cta-description">
            Отримайте безкоштовну консультацію та дізнайтеся, як ми можемо збільшити ваш прибуток
          </p>
          <div class="cta-actions">
            <button class="cta-btn primary" @click="openModal('order')">
              <Icon name="mdi:rocket-launch" size="md" />
              Почати проєкт
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
import ProcessSection from '../../components/sections/ProcessSection.vue'
import { useModal } from '../../composables/useModal'

const { openModal } = useModal()

// @ts-ignore
useHead({
  title: 'Про нас - WebCore | Команда експертів з розробки IT-рішень',
  meta: [
    { name: 'description', content: '5 років досвіду, 200+ проєктів, 95% задоволених клієнтів. Команда WebCore створює IT-рішення, які збільшують прибуток вашого бізнесу на 150%.' },
    { name: 'keywords', content: 'команда WebCore, IT розробка, веб агенція Україна, розробка сайтів, автоматизація бізнесу' }
  ]
})

// Company values with business results
const values = [
  {
    id: 'results',
    number: '01',
    title: 'Фокус на результат',
    description: 'Ми не просто розробляємо — ми створюємо інструменти, які збільшують ваш прибуток. Кожен проєкт вимірюється конкретними бізнес-показниками.',
    icon: 'mdi:target',
    result: 'Середній ріст прибутку +150%'
  },
  {
    id: 'quality',
    number: '02',
    title: 'Якість без компромісів',
    description: 'Використовуємо сучасні технології та найкращі практики розробки. Кожен рядок коду проходить ретельну перевірку.',
    icon: 'mdi:star-circle',
    result: '99.9% uptime наших проєктів'
  },
  {
    id: 'speed',
    number: '03',
    title: 'Швидкість виконання',
    description: 'Розуміємо цінність часу для бізнесу. Дотримуємося термінів та часто здаємо проєкти достроково.',
    icon: 'mdi:speedometer',
    result: '90% проєктів здаємо вчасно'
  },
  {
    id: 'support',
    number: '04',
    title: 'Довгострокове партнерство',
    description: 'Не кидаємо клієнтів після запуску. Надаємо технічну підтримку, консультації та допомагаємо розвивати проєкт.',
    icon: 'mdi:handshake',
    result: '85% клієнтів повертаються'
  },
  {
    id: 'transparency',
    number: '05',
    title: 'Прозорість процесів',
    description: 'Ви завжди знаєте на якому етапі знаходиться ваш проєкт. Регулярні звіти та відкрита комунікація.',
    icon: 'mdi:eye',
    result: 'Щотижневі звіти по прогресу'
  },
  {
    id: 'innovation',
    number: '06',
    title: 'Інноваційні рішення',
    description: 'Не копіюємо шаблони — створюємо унікальні рішення під ваші потреби. Використовуємо AI та автоматизацію.',
    icon: 'mdi:lightbulb',
    result: '70% рішень — власні розробки'
  }
]

// Team members
const teamMembers = [
  {
    id: 'roman-novokhatko',
    name: 'Роман Новохатько',
    role: 'Співзасновник & CTO',
    description: 'Співзасновник WebCore Agency. Технічний директор та архітектор складних веб-рішень. Визначає технічну стратегію компанії.',
    icon: 'mdi:crown',
    skills: ['React', 'Next.js', 'TypeScript', 'GraphQL', 'PostgreSQL', 'Leadership']
  },
  {
    id: 'kyrylo-smolov',
    name: 'Кирило Смолов',
    role: 'Співзасновник & CEO',
    description: 'Співзасновник та генеральний директор WebCore Agency. Відповідає за стратегічний розвиток компанії та управління командою.',
    icon: 'mdi:account-star',
    skills: ['Vue.js', 'Laravel', 'MySQL', 'Business Strategy', 'Team Management', 'Client Relations']
  },
  {
    id: 'dmytro-onishchuk',
    name: 'Дмитро Оніщук',
    role: 'SMM спеціаліст',
    description: 'Створення та просування контенту в соціальних мережах. Збільшує впізнаваність бренду та залучає цільову аудиторію.',
    icon: 'mdi:bullhorn',
    skills: ['Instagram', 'Facebook', 'TikTok', 'Content Creation', 'Analytics']
  },
  {
    id: 'lead-dev',
    name: 'Олексій Курін',
    role: 'Lead розробник',
    description: 'Архітектура проєктів, технічні рішення та керування командою розробки. Досвід роботи з великими проєктами.',
    icon: 'mdi:account-tie',
    skills: ['Vue.js', 'Node.js', 'PostgreSQL', 'AWS', 'DevOps']
  },
  {
    id: 'maria-petrenko',
    name: 'Кіріл Сопічев',
    role: 'Backend розробник',
    description: 'Розробка серверної логіки та API. Спеціалізується на продуктивних рішеннях для високонавантажених систем.',
    icon: 'mdi:database',
    skills: ['Python', 'Django', 'FastAPI', 'MongoDB', 'Elasticsearch']
  },
  {
    id: 'anna-shevchenko',
    name: 'Анна Гупало',
    role: 'UI/UX дизайнер',
    description: 'Створення інтерфейсів, які конвертують відвідувачів у клієнтів. Експертиза в UX дослідженнях та тестуванні.',
    icon: 'mdi:palette',
    skills: ['Figma', 'UX Research', 'Prototyping', 'Design Systems', 'A/B Testing']
  },
  {
    id: 'kateryna-bondar',
    name: 'Катерина Бондар',
    role: 'Project Manager',
    description: 'Координація проєктів, комунікація з клієнтами та контроль якості. Гарантує дотримання термінів та бюджету.',
    icon: 'mdi:clipboard-check',
    skills: ['Agile', 'Scrum', 'Jira', 'Communication', 'Quality Control']
  },
  {
    id: 'sergiy-melnyk',
    name: 'Сергій Мельник',
    role: 'DevOps інженер',
    description: 'Налаштування серверів, CI/CD, моніторинг та безпека. Забезпечує стабільну роботу та масштабування проєктів.',
    icon: 'mdi:server',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Monitoring']
  },
  {
    id: 'viktor-kovalchuk',
    name: 'Віктор Ковальчук',
    role: 'Frontend розробник',
    description: 'Створення сучасних та швидких користувацьких інтерфейсів. Спеціалізується на React та Vue.js екосистемах.',
    icon: 'mdi:monitor',
    skills: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Webpack']
  },
  {
    id: 'oksana-lysenko',
    name: 'Оксана Лисенко',
    role: 'QA тестувальник',
    description: 'Забезпечення якості програмного забезпечення через ретельне тестування. Автоматизація тестових процесів.',
    icon: 'mdi:bug',
    skills: ['Manual Testing', 'Automation', 'Selenium', 'Cypress', 'Bug Tracking']
  },
  {
    id: 'andriy-petriv',
    name: 'Андрій Петрів',
    role: 'Business Analyst',
    description: 'Аналіз бізнес-процесів та вимог. Допомагає клієнтам сформулювати технічне завдання та оптимізувати рішення.',
    icon: 'mdi:chart-line',
    skills: ['Business Analysis', 'Requirements', 'Process Optimization', 'Documentation']
  },
  {
    id: 'julia-tkachenko',
    name: 'Юлія Ткаченко',
    role: 'Content Manager',
    description: 'Створення та управління контентом для веб-сайтів. SEO-оптимізація текстів та контент-маркетингові стратегії.',
    icon: 'mdi:file-document-edit',
    skills: ['Content Writing', 'SEO', 'WordPress', 'Content Strategy', 'Copywriting']
  }
]


// Generate consistent particle styles for SSR
const getParticleStyle = (index: number) => {
  const size = (index % 3) + 1
  const left = (index * 15.7) % 100
  const animationDuration = 25 + (index % 8) * 3
  const delay = (index * 0.9) % 6
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDuration: `${animationDuration}s`,
    animationDelay: `${delay}s`
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 1400px;
}

.about-page {
  min-height: 100vh;
  padding-top: 70px;
  background: var(--color-bg-primary);
}

/* Hero Section */
.about-hero {
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
  opacity: 0.08;
  animation: floatUp linear infinite;
}

@keyframes floatUp {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.08;
  }
  90% {
    opacity: 0.08;
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
  opacity: 0.4;
  animation: gradientFloat 25s ease-in-out infinite;
}

.gradient-orb-1 {
  width: 350px;
  height: 350px;
  background: linear-gradient(45deg, var(--color-accent-primary), var(--color-accent-secondary));
  top: 15%;
  left: 15%;
  animation-delay: 0s;
}

.gradient-orb-2 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, var(--color-accent-secondary), var(--color-accent-tertiary));
  top: 50%;
  right: 20%;
  animation-delay: -10s;
}

@keyframes gradientFloat {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(60px, -40px) rotate(120deg);
  }
  66% {
    transform: translate(-40px, 40px) rotate(240deg);
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
  50% { transform: translateY(-8px); }
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
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 800px;
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

/* Mission Section */
.mission-section {
  padding: 5rem 0;
  background: var(--color-bg-secondary);
}

.mission-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: center;
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
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.section-description {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.mission-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  color: var(--color-text-primary);
}

.feature-icon {
  color: var(--color-accent-primary);
  flex-shrink: 0;
}

.mission-visual {
  display: flex;
  justify-content: center;
}

.visual-card {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  max-width: 300px;
  transition: transform 0.3s ease;
}

.visual-card:hover {
  transform: translateY(-10px);
}

.visual-icon {
  width: 60px;
  height: 60px;
  color: var(--color-accent-primary);
  margin: 0 auto 1.5rem;
}

.visual-card h4 {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
}

.visual-card p {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Values Section */
.values-section {
  padding: 5rem 0;
  background: var(--color-bg-primary);
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.value-card {
  position: relative;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 24px;
  padding: 2.5rem;
  transition: all 0.4s ease;
  overflow: hidden;
}

.value-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  border-color: var(--color-accent-primary);
}

.value-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.value-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: transform 0.3s ease;
}

.value-card:hover .value-icon {
  transform: scale(1.1) rotate(5deg);
}

.value-number {
  font-size: 3rem;
  font-weight: 800;
  color: var(--color-accent-primary);
  opacity: 0.2;
  line-height: 1;
}

.value-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.value-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.value-result {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-bg-tertiary);
  border-radius: 12px;
  padding: 0.75rem 1rem;
}

.result-icon {
  color: #10B981;
  flex-shrink: 0;
}

.result-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

/* Team Section */
.team-section {
  padding: 5rem 0;
  background: var(--color-bg-secondary);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.team-card {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--color-accent-primary);
}

.member-avatar {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  transition: transform 0.3s ease;
}

.team-card:hover .member-avatar {
  transform: scale(1.1);
}

.member-name {
  font-size: 1.375rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
  text-align: center;
}

.member-role {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  text-align: center;
}

.member-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 0.95rem;
}

.member-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.skill-tag {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
  padding: 0.375rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}


/* CTA Section */
.about-cta {
  position: relative;
  padding: 5rem 0;
  background: var(--color-bg-secondary);
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
  
  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .mission-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .values-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}

@media (max-width: 768px) {
  .about-hero {
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
  
  .section-title {
    font-size: 2rem;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .team-grid {
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
  .about-hero {
    padding: 3rem 0;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .cta-title {
    font-size: 2rem;
  }
  
  .value-card {
    padding: 1.5rem;
  }
  
  .team-card {
    padding: 1.5rem;
  }
  
  .member-avatar {
    width: 80px;
    height: 80px;
  }
  
  .member-name {
    font-size: 1.25rem;
  }
}
</style>
