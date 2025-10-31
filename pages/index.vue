<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              Створюємо 
              <span class="gradient-text">сучасні</span>
              веб-рішення
            </h1>
            <p class="hero-description">
              WebCore - це команда досвідчених розробників, які створюють інноваційні 
              веб-додатки та сайти, що допомагають вашому бізнесу зростати в цифровому світі.
            </p>
            <div class="hero-actions">
              <button class="btn-primary">
                <Icon name="mdi:rocket-launch" />
                Почати проект
              </button>
              <button class="btn-secondary">
                <Icon name="mdi:briefcase" />
                Наші роботи
              </button>
            </div>
          </div>
          
          <div class="hero-visual">
            <div class="floating-elements">
              <WebCoreLogo :animated="true" :size="200" class="hero-logo" />
              <div class="code-snippet">
                <div class="code-header">
                  <span class="code-title">WebCore.vue</span>
                  <div class="code-dots">
                    <span class="dot red"></span>
                    <span class="dot yellow"></span>
                    <span class="dot green"></span>
                  </div>
                </div>
                <div class="code-content">
                  <div class="code-line">
                    <span class="code-keyword">const</span> 
                    <span class="code-variable">success</span> = 
                    <span class="code-function">createAmazingWebsite</span>()
                  </div>
                  <div class="code-line">
                    <span class="code-keyword">if</span> (success) {
                  </div>
                  <div class="code-line indent">
                    <span class="code-function">launchBusiness</span>()
                  </div>
                  <div class="code-line">}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Чому обирають WebCore?</h2>
          <p class="section-description">
            Ми поєднуємо передові технології з креативним підходом
          </p>
        </div>
        
        <div class="features-grid">
          <div 
            v-for="(feature, index) in features" 
            :key="feature.title"
            class="feature-card"
            :class="`feature-${index + 1}`"
          >
            <div class="feature-icon">
              <Icon :name="feature.icon" size="xl" />
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import WebCoreLogo from '../components/WebCoreLogo.vue'
import Icon from '../components/Icon.vue'

// SEO - useHead is a Nuxt 3 composable available globally
// @ts-ignore
useHead({
  title: 'WebCore - Сучасні веб-рішення',
  meta: [
    { name: 'description', content: 'WebCore - команда досвідчених розробників, що створює інноваційні веб-додатки та сайти для вашого бізнесу.' },
    { property: 'og:title', content: 'WebCore - Сучасні веб-рішення' },
    { property: 'og:description', content: 'Створюємо інноваційні веб-додатки та сайти для вашого бізнесу' },
    { property: 'og:type', content: 'website' }
  ]
})

// Features data
const features = [
  {
    title: 'Сучасні технології',
    description: 'Використовуємо найновіші фреймворки та інструменти для створення швидких та надійних додатків.',
    icon: 'mdi:cogs'
  },
  {
    title: 'Адаптивний дизайн',
    description: 'Всі наші проекти ідеально працюють на будь-яких пристроях - від смартфонів до десктопів.',
    icon: 'mdi:responsive'
  },
  {
    title: 'SEO оптимізація',
    description: 'Забезпечуємо високі позиції у пошукових системах та швидке завантаження сторінок.',
    icon: 'mdi:search-web'
  },
  {
    title: 'Підтримка 24/7',
    description: 'Надаємо постійну технічну підтримку та оперативно вирішуємо будь-які питання.',
    icon: 'mdi:headset'
  }
]
</script>

<style scoped>
.home-page {
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Hero Section */
.hero-section {
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(217, 70, 239, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--color-text-primary);
}

.gradient-text {
  background: linear-gradient(135deg, #8B5CF6, #D946EF, #F97316);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: 2.5rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.75rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  white-space: nowrap;
  min-width: fit-content;
}

.btn-primary {
  background: linear-gradient(135deg, #8B5CF6, #D946EF);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

/* Hero Visual */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.floating-elements {
  position: relative;
  animation: float 6s ease-in-out infinite;
}

.hero-logo {
  filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.4));
}

.code-snippet {
  position: absolute;
  top: -50px;
  right: -80px;
  background: var(--color-card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border-primary);
  border-radius: 12px;
  padding: 1rem;
  min-width: 280px;
  animation: floatReverse 8s ease-in-out infinite;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border-primary);
  margin-bottom: 0.75rem;
}

.code-title {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.code-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #10b981; }

.code-content {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

.code-line {
  margin-bottom: 0.25rem;
}

.code-line.indent {
  padding-left: 1rem;
}

.code-keyword {
  color: #8B5CF6;
}

.code-variable {
  color: #D946EF;
}

.code-function {
  color: #F97316;
}

/* Features Section */
.features-section {
  padding: 6rem 0;
  position: relative;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

.section-description {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: var(--color-card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border-primary);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #8B5CF6, #D946EF, #F97316);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  background: var(--color-bg-tertiary);
  border-color: var(--color-border-accent);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(217, 70, 239, 0.1));
  border-radius: 16px;
  color: #8B5CF6;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

.feature-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes floatReverse {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(15px) rotate(-3deg);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .code-snippet {
    position: static;
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 1343px) {
  .hero-section {
    min-height: calc(100vh - 60px);
    padding: 2rem 0;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.125rem;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .btn-primary,
  .btn-secondary {
    padding: 0.875rem 1.25rem;
    font-size: 0.95rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
    padding: 0.875rem 1rem;
    font-size: 0.9rem;
  }
  
  .code-snippet {
    min-width: auto;
    width: 100%;
  }
}
</style>
