<template>
  <section id="process-section" class="process-section">
    <!-- Animated Background -->
    <div class="process-background">
      <div class="animated-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
      <div class="gradient-overlay"></div>
      <div class="dots-pattern"></div>
    </div>

    <div class="container">
      <div class="section-header">
        <div class="header-badge">
          <Icon name="mdi:cog" size="md" class="badge-icon" />
          <span>Наш процес</span>
        </div>
        <h2 class="section-title">
          Як ми <span class="gradient-text">створюємо</span> ваш проект
        </h2>
        <p class="section-description">
          Як ми працюємо з вами, щоб створити сайт, який принесе реальний результат вашому бізнесу
        </p>
      </div>
      
      <!-- Desktop Grid with Arrows -->
      <div class="process-grid desktop-timeline">
        <div 
          v-for="(step, index) in processSteps" 
          :key="step.title"
          class="process-step-wrapper"
        >
          <div class="step-card">
            <div class="card-glow"></div>
            <div class="step-number">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
            </div>
            <div class="card-inner">
              <div class="step-icon-wrapper">
                <div class="icon-background"></div>
                <div class="step-icon">
                  <Icon :name="step.icon" size="lg" />
                </div>
              </div>
              <div class="step-content">
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-description">{{ step.description }}</p>
              </div>
            </div>
          </div>
          <!-- Arrow to next step -->
          <div 
            v-if="index < processSteps.length - 1 && index !== 2" 
            class="step-arrow"
          >
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 32 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient :id="`arrowGradient${index}`" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#D946EF;stop-opacity:1" />
                </linearGradient>
              </defs>
              <path 
                d="M16 4 L26 16 L16 28 M26 16 L4 16" 
                :stroke="`url(#arrowGradient${index})`" 
                stroke-width="2.5" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Mobile Carousel -->
      <div class="mobile-carousel">
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="20"
          :pagination="{ clickable: true }"
          :autoplay="{ delay: 5000, disableOnInteraction: false }"
          :observer="true"
          :observe-parents="true"
          class="process-swiper"
        >
          <SwiperSlide 
            v-for="(step, index) in processSteps" 
            :key="step.title"
          >
            <div class="step-card mobile-card">
              <div class="card-glow"></div>
              <div class="step-number">
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
              </div>
              <div class="card-inner">
                <div class="step-icon-wrapper">
                  <div class="icon-background"></div>
                  <div class="step-icon">
                    <Icon :name="step.icon" size="lg" />
                  </div>
                </div>
                <div class="step-content">
                  <h3 class="step-title">{{ step.title }}</h3>
                  <p class="step-description">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>

    <!-- Floating Particles -->
    <div class="floating-particles">
      <div class="particle" v-for="i in 15" :key="i" :style="getParticleStyle(i)"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Icon from '../Icon.vue'

// Swiper modules
const modules = [Pagination, Autoplay]

// Process steps data
const processSteps = [
  {
    title: 'Аналіз і постановка цілей',
    description: 'Разом з вами визначаємо, чого хоче досягти ваш бізнес: більше клієнтів, збільшення продажів чи підвищення впізнаваності бренду. Зрозумівши ваші цілі, ми будуємо план досягнення результатів.',
    icon: 'mdi:target'
  },
  {
    title: 'Планування проєкту',
    description: 'Створюємо детальний план роботи, обговорюємо структуру сайту та функції, які допоможуть досягти ваших бізнес-цілей. Узгоджуємо терміни та очікування.',
    icon: 'mdi:clipboard-text'
  },
  {
    title: 'Дизайн, який конвертує',
    description: 'Створюємо дизайн, який не просто красивий, але й працює на ваш бізнес: залучає клієнтів, підвищує довіру та допомагає досягти ваших цілей.',
    icon: 'mdi:palette'
  },
  {
    title: 'Створення вашого сайту',
    description: 'Перетворюємо дизайн у робочий сайт, який швидко завантажується, легко знаходиться в пошуку та приносить результат вашому бізнесу.',
    icon: 'mdi:web'
  },
  {
    title: 'Запуск та підтримка',
    description: 'Перевіряємо, що все працює ідеально, після чого запускаємо ваш сайт. Далі ми завжди поруч, щоб допомогти розвивати проєкт.',
    icon: 'mdi:rocket-launch'
  },
  {
    title: 'Розвиток та оптимізація',
    description: 'Аналізуємо результати, додаємо нові можливості та вдосконалюємо сайт, щоб він продовжував приносити більше клієнтів та збільшувати дохід.',
    icon: 'mdi:chart-line'
  }
]

// Generate random particle styles
const getParticleStyle = (index: number) => {
  const size = Math.random() * 8 + 4
  const left = Math.random() * 100
  const animationDuration = Math.random() * 10 + 15
  const delay = Math.random() * 5
  
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
  max-width: 1200px;
  position: relative;
  z-index: 2;
}

/* Process Section */
.process-section {
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-primary);
}

/* Animated Background */
.process-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.animated-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  filter: blur(80px);
  opacity: 0.4;
  animation: morphShape 20s ease-in-out infinite;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  top: -10%;
  left: -5%;
  animation-delay: 0s;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, var(--color-accent-secondary), var(--color-accent-tertiary));
  top: 50%;
  right: -5%;
  animation-delay: 5s;
}

.shape-3 {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, var(--color-accent-tertiary), var(--color-accent-primary));
  bottom: -10%;
  left: 50%;
  animation-delay: 10s;
}

.shape-4 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-tertiary));
  top: 20%;
  left: 30%;
  animation-delay: 15s;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, transparent 0%, var(--color-bg-primary) 70%);
  z-index: 1;
}

.dots-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle, var(--color-border-primary) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.3;
  z-index: 1;
}

/* Header Styles */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-accent);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-accent-primary);
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.2);
  animation: badgeFloat 3s ease-in-out infinite;
}

.badge-icon {
  color: var(--color-accent-secondary);
  animation: iconRotate 4s linear infinite;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary), var(--color-accent-tertiary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
}

.section-description {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Process Grid */
.process-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  position: relative;
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 0 1rem;
  align-items: stretch;
}

.process-step-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 100%;
}

@media (min-width: 1024px) {
  .process-step-wrapper {
    opacity: 0;
    animation: fadeInUp 0.6s ease forwards;
  }

  .process-step-wrapper:nth-child(1) { animation-delay: 0.1s; }
  .process-step-wrapper:nth-child(2) { animation-delay: 0.2s; }
  .process-step-wrapper:nth-child(3) { animation-delay: 0.3s; }
  .process-step-wrapper:nth-child(4) { animation-delay: 0.4s; }
  .process-step-wrapper:nth-child(5) { animation-delay: 0.5s; }
  .process-step-wrapper:nth-child(6) { animation-delay: 0.6s; }
}

/* Arrow between steps */
.step-arrow {
  position: absolute;
  right: -0.75rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  opacity: 0.7;
  transition: all 0.3s ease;
  pointer-events: none;
}

.process-step-wrapper:hover .step-arrow {
  opacity: 1;
  transform: translateY(-50%) scale(1.1);
}

.step-arrow svg {
  width: 28px;
  height: 28px;
  filter: drop-shadow(0 2px 8px rgba(139, 92, 246, 0.4));
}


.mobile-carousel {
  display: none;
}

/* Step Card */
.step-card {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 20px;
  padding: 1.5rem;
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  min-height: 280px;
  display: flex;
  flex-direction: column;
}

.step-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary), var(--color-accent-tertiary));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.step-card:hover::before {
  transform: scaleX(1);
}

.card-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.step-card:hover .card-glow {
  opacity: 1;
}

.step-card:hover {
  border-color: var(--color-border-accent);
}

.step-number {
  position: absolute;
  top: -12px;
  right: 1rem;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 800;
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
  z-index: 2;
}

.step-number span {
  background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  flex: 1;
}

.step-icon-wrapper {
  position: relative;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
}

.icon-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.1), 
    rgba(217, 70, 239, 0.1),
    rgba(249, 115, 22, 0.1)
  );
  border-radius: 24px;
  animation: iconPulse 3s ease-in-out infinite;
}

.step-icon {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-primary);
  font-size: 2rem;
  transition: all 0.3s ease;
  z-index: 1;
}

.step-card:hover .step-icon {
  transform: scale(1.1) rotate(5deg);
  color: var(--color-accent-secondary);
}

.step-content {
  position: relative;
  z-index: 1;
  flex: 1;
  min-width: 0;
}

.step-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.step-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
  font-size: 0.875rem;
}

/* Floating Particles */
.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  bottom: -10px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  opacity: 0.4;
  animation: floatUp linear infinite;
}

/* Animations */
@keyframes morphShape {
  0%, 100% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    transform: rotate(0deg) scale(1);
  }
  25% {
    border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
    transform: rotate(90deg) scale(1.1);
  }
  50% {
    border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
    transform: rotate(180deg) scale(0.9);
  }
  75% {
    border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
    transform: rotate(270deg) scale(1.05);
  }
}

@keyframes badgeFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes iconRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

@keyframes floatUp {
  0% {
    bottom: -10px;
    opacity: 0.4;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    bottom: 100%;
    opacity: 0;
  }
}

/* Swiper Styles */
.process-swiper {
  padding-bottom: 3rem;
}

.process-swiper :deep(.swiper-wrapper) {
  align-items: stretch;
}

.process-swiper :deep(.swiper-slide) {
  height: auto;
  display: flex;
}

.mobile-card {
  width: 100% !important;
  margin: 0 !important;
  height: 100%;
  min-height: 280px;
  display: flex;
  flex-direction: column;
}

.mobile-card .card-inner {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

/* Swiper pagination customization */
:deep(.swiper-pagination) {
  bottom: 0 !important;
}

:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: var(--color-border-primary);
  opacity: 0.5;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: var(--color-accent-primary);
  opacity: 1;
  width: 24px;
  border-radius: 5px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .process-section {
    padding: 4rem 0;
  }

  .section-header {
    margin-bottom: 3rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .desktop-timeline {
    display: none;
  }

  .mobile-carousel {
    display: block;
  }

  .step-arrow {
    display: none;
  }

  .step-card {
    padding: 1.75rem;
  }

  .shape {
    filter: blur(60px);
    opacity: 0.3;
  }
}

@media (max-width: 1343px) {
  .process-section {
    padding: 4rem 0;
  }

  .section-header {
    margin-bottom: 2.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-description {
    font-size: 1rem;
  }

  .process-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  /* Hide horizontal arrows, show vertical arrows after every 2nd item */
  .step-arrow {
    display: none;
  }

  .process-step-wrapper:nth-child(2n) .step-arrow {
    display: block !important;
    right: 50% !important;
    top: auto !important;
    bottom: -0.75rem !important;
    transform: translateX(50%) rotate(90deg) !important;
  }

  .process-step-wrapper:nth-child(2n):hover .step-arrow {
    transform: translateX(50%) rotate(90deg) scale(1.1) !important;
  }

  .step-card {
    padding: 1.25rem;
    min-height: 180px;
  }

  .step-title {
    font-size: 1rem;
  }

  .step-description {
    font-size: 0.85rem;
  }

  .step-icon-wrapper {
    width: 50px;
    height: 50px;
  }

  .step-icon {
    width: 50px;
    height: 50px;
    font-size: 1.75rem;
  }

  .step-number {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .process-section {
    padding: 2.5rem 0;
  }

  .section-header {
    margin-bottom: 2.5rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .section-description {
    font-size: 0.95rem;
  }

  .step-card {
    padding: 1.25rem;
    border-radius: 16px;
  }

  .process-step {
    margin-bottom: 1.25rem;
  }

  .step-number {
    width: 36px;
    height: 36px;
    font-size: 0.875rem;
    top: -10px;
    right: 1rem;
  }

  .mobile-card {
    min-height: 220px;
  }

  .card-inner {
    gap: 0.75rem;
  }

  .step-icon-wrapper {
    width: 50px;
    height: 50px;
  }

  .step-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }

  .step-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .step-description {
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .shape {
    filter: blur(40px);
    opacity: 0.2;
  }

  .dots-pattern {
    opacity: 0.2;
  }
}

</style>
