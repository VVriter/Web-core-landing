<template>
  <section class="faq-section">
    <!-- Animated Background -->
    <div class="faq-background">
      <div class="animated-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
      <div class="gradient-overlay"></div>
      <div class="dots-pattern"></div>
    </div>

    <div class="container">
      <div class="section-header">
        <div class="header-badge">
          <Icon name="mdi:help-circle" size="md" class="badge-icon" />
          <span>Допомога</span>
        </div>
        <h2 class="section-title">
          <span class="gradient-text">FAQ</span> (запитання й відповіді)
        </h2>
        <p class="section-description">
          Відповіді на найпоширеніші питання про наші послуги та процес роботи
        </p>
      </div>
      
      <div class="faq-list">
        <div 
          v-for="(faq, index) in faqItems" 
          :key="faq.question"
          class="faq-item"
          :class="{ 'active': activeFaq === index }"
          @click="toggleFaq(index)"
        >
          <div class="faq-glow"></div>
          <div class="faq-content">
            <div class="faq-question">
              <div class="question-left">
                <div class="question-number">{{ String(index + 1).padStart(2, '0') }}</div>
                <h3>{{ faq.question }}</h3>
              </div>
              <Icon name="mdi:chevron-down" size="md" class="faq-icon" />
            </div>
            <div class="faq-answer">
              <div class="answer-content">
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
          <div class="faq-accent-line"></div>
        </div>
      </div>
    </div>

    <!-- Floating Particles -->
    <div class="floating-particles">
      <div class="particle" v-for="i in 8" :key="i" :style="getParticleStyle(i)"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../Icon.vue'

// FAQ data
const activeFaq = ref(-1)
const faqItems = [
  {
    question: 'Як швидко ми отримаємо готовий сайт?',
    answer: 'Від 1 тижня для простого сайту вашого бізнесу. Складніші проекти з більшою кількістю функцій — до 4–6 тижнів. Завжди узгоджуємо терміни з вами.'
  },
  {
    question: 'Скільки коштує створити сайт?',
    answer: 'Вартість залежить від того, які цілі має ваш бізнес та які функції потрібні для їх досягнення. Після обговорення ваших потреб ми надамо точну пропозицію.'
  },
  {
    question: 'Що входить у послугу створення сайту?',
    answer: 'Повний цикл: розуміння ваших бізнес-цілей, планування, створення дизайну, розробка сайту, запуск та 2 місяці підтримки, щоб все працювало ідеально.'
  },
  {
    question: 'Які гарантії ви надаєте?',
    answer: 'Ми гарантуємо, що ваш сайт працюватиме бездоганно. Якщо щось піде не так протягом 60 днів після запуску — ми виправимо безкоштовно. Додаткові гарантії обговорюємо індивідуально.'
  },
  {
    question: 'Як можна оплатити?',
    answer: 'Приймаємо оплату офіційно на ФОП (фізична особа-підприємець). Зазвичай передоплата 50% на початку роботи, решта — після запуску сайту.'
  },
  {
    question: 'Хто володіє сайтом після завершення?',
    answer: 'Ви! Після повної оплати сайт повністю належить вам: усі файли, доступ до керування та право розвивати проект як завгодно.'
  },
  {
    question: 'Чи допомагаєте після запуску сайту?',
    answer: 'Так, обов\'язково! Базова підтримка включена в ціну на 2 місяці. Також можемо обговорити довгострокову підтримку для постійного розвитку вашого сайту.'
  }
]

const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? -1 : index
}

// Generate random particle styles
const getParticleStyle = (index: number) => {
  const size = Math.random() * 5 + 3
  const left = Math.random() * 100
  const animationDuration = Math.random() * 10 + 15
  const delay = Math.random() * 2
  
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
}

/* FAQ Section */
.faq-section {
  padding: 8rem 0;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-secondary);
}

/* Animated Background */
.faq-background {
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
  opacity: 0.3;
  animation: morphShape 25s ease-in-out infinite;
}

.shape-1 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #8B5CF6, #D946EF);
  top: -15%;
  left: -10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #3B82F6, #8B5CF6);
  bottom: -10%;
  right: -5%;
  animation-delay: 8s;
}

.shape-3 {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, #F97316, #EAB308);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 16s;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, transparent 0%, var(--color-bg-secondary) 75%);
  z-index: 1;
}

.dots-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle, var(--color-border-primary) 1.5px, transparent 1.5px);
  background-size: 30px 30px;
  opacity: 0.15;
  z-index: 1;
}

.container {
  position: relative;
  z-index: 2;
}

.section-header {
  text-align: center;
  margin-bottom: 5rem;
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
  color: var(--color-accent-tertiary);
  animation: iconSpin 4s linear infinite;
}

.section-title {
  font-size: 3rem;
  font-weight: 900;
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(135deg, #8B5CF6, #D946EF, #F97316);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-description {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.7;
}

.faq-list {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.faq-item {
  position: relative;
  background: var(--color-card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--color-border-primary);
  border-radius: 24px;
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.faq-item:hover {
  transform: translateY(-4px);
  border-color: var(--color-border-accent);
  box-shadow: 0 16px 48px rgba(139, 92, 246, 0.2);
}

.faq-item.active {
  border-color: var(--color-accent-primary);
  box-shadow: 0 20px 60px rgba(139, 92, 246, 0.3);
  background: var(--color-bg-tertiary);
}

.faq-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: 50%;
  pointer-events: none;
}

.faq-item.active .faq-glow {
  opacity: 1;
}

.faq-content {
  position: relative;
  z-index: 2;
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2.5rem;
  transition: all 0.3s ease;
}

.question-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
}

.question-number {
  font-size: 1.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #8B5CF6, #D946EF);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  min-width: 40px;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.faq-item.active .question-number {
  opacity: 1;
}

.faq-question h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.faq-item.active .faq-question h3 {
  color: var(--color-accent-primary);
}

.faq-icon {
  color: var(--color-accent-primary);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-tertiary);
  border-radius: 8px;
}

.faq-item.active .faq-icon {
  transform: rotate(180deg);
  background: linear-gradient(135deg, #8B5CF6, #D946EF);
  color: white;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-item.active .faq-answer {
  max-height: 500px;
}

.answer-content {
  padding: 0 2.5rem 2rem;
}

.faq-answer p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.8;
  font-size: 1.0625rem;
  padding-top: 0.5rem;
}

.faq-accent-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #8B5CF6, #D946EF, #F97316);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-item.active .faq-accent-line {
  transform: scaleX(1);
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
  background: linear-gradient(135deg, #8B5CF6, #D946EF);
  opacity: 0.2;
  animation: floatUp linear infinite;
}

/* Animations */
@keyframes morphShape {
  0%, 100% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
  }
  25% {
    border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
    transform: translate(-50%, -50%) rotate(90deg) scale(1.1);
  }
  50% {
    border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
    transform: translate(-50%, -50%) rotate(180deg) scale(0.9);
  }
  75% {
    border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
    transform: translate(-50%, -50%) rotate(270deg) scale(1.05);
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

@keyframes iconSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes floatUp {
  0% {
    bottom: -10px;
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    bottom: 100%;
    opacity: 0;
  }
}

/* Responsive Design */
@media (max-width: 1343px) {
  .faq-section {
    padding: 6rem 0;
  }

  .section-header {
    margin-bottom: 4rem;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .section-description {
    font-size: 1.125rem;
  }

  .faq-question {
    padding: 1.5rem 2rem;
  }

  .question-left {
    gap: 1rem;
  }

  .question-number {
    font-size: 1.25rem;
    min-width: 35px;
  }

  .faq-question h3 {
    font-size: 1.125rem;
  }

  .answer-content {
    padding: 0 2rem 1.5rem;
  }

  .faq-answer p {
    font-size: 1rem;
  }

  .shape {
    filter: blur(60px);
    opacity: 0.2;
  }
}

@media (max-width: 480px) {
  .faq-section {
    padding: 4rem 0;
  }

  .section-header {
    margin-bottom: 3rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-description {
    font-size: 1rem;
  }

  .header-badge {
    padding: 0.4rem 1rem;
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }

  .faq-list {
    margin-top: 2rem;
  }

  .faq-question {
    padding: 1.25rem 1.5rem;
    flex-wrap: wrap;
  }

  .question-left {
    gap: 0.75rem;
    flex: 1;
    min-width: 0;
  }

  .question-number {
    font-size: 1.125rem;
    min-width: 30px;
  }

  .faq-question h3 {
    font-size: 1rem;
    flex: 1;
    min-width: 0;
  }

  .faq-icon {
    width: 28px;
    height: 28px;
  }

  .answer-content {
    padding: 0 1.5rem 1.25rem;
  }

  .faq-answer p {
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .shape {
    filter: blur(40px);
    opacity: 0.15;
  }
}
</style>
