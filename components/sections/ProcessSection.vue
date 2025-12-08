<template>
  <section id="process-section" class="process-section">
    <!-- Animated Background -->
    <div class="section-bg">
      <!-- Floating geometric shapes -->
      <div class="geo-shape shape-1"></div>
      <div class="geo-shape shape-2"></div>
      <div class="geo-shape shape-3"></div>

      <!-- Flowing gradient line -->
      <div class="flow-line">
        <div class="flow-gradient"></div>
      </div>

      <!-- Connection lines between cards (desktop) -->
      <svg class="connection-lines" viewBox="0 0 1200 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="var(--color-accent-primary)" stop-opacity="0.3" />
            <stop offset="50%" stop-color="var(--color-accent-secondary)" stop-opacity="0.5" />
            <stop offset="100%" stop-color="var(--color-accent-tertiary)" stop-opacity="0.3" />
          </linearGradient>
        </defs>
        <!-- Curved paths connecting cards -->
        <path class="connection-path" d="M200,150 Q300,100 400,150" />
        <path class="connection-path" d="M400,150 Q500,200 600,150" />
        <path class="connection-path" d="M200,450 Q300,400 400,450" />
        <path class="connection-path" d="M400,450 Q500,500 600,450" />
        <path class="connection-path path-vertical" d="M600,150 Q650,300 600,450" />
      </svg>

      <!-- Accent dots -->
      <div class="accent-dot dot-1"></div>
      <div class="accent-dot dot-2"></div>
    </div>

    <div class="container">
      <div class="section-header">
        <span class="section-label">Наш процес</span>
        <h2 class="section-title">
          Як ми створюємо ваш проєкт
        </h2>
        <p class="section-description">
          Прозорий процес від ідеї до результату
        </p>
      </div>

      <!-- Desktop Grid -->
      <div class="process-grid desktop-grid">
        <div
          v-for="(step, index) in processSteps"
          :key="step.title"
          class="process-step"
          :class="`step-${index + 1}`"
        >
          <!-- Background image -->
          <div class="card-bg-image" :style="{ backgroundImage: `url(${step.image})` }"></div>

          <!-- Card glow effect -->
          <div class="card-glow"></div>

          <!-- Top accent line -->
          <div class="card-accent"></div>

          <!-- Step number with icon -->
          <div class="step-header">
            <div class="step-number">
              <span>{{ index + 1 }}</span>
            </div>
            <div class="step-icon">
              <component :is="getIcon(index)" />
            </div>
          </div>

          <div class="step-content">
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
          </div>

          <!-- Corner decoration -->
          <div class="corner-deco"></div>
        </div>
      </div>

      <!-- Mobile Carousel -->
      <div class="mobile-carousel">
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="16"
          :pagination="{ clickable: true }"
          class="process-swiper"
        >
          <SwiperSlide
            v-for="(step, index) in processSteps"
            :key="step.title"
          >
            <div class="process-step">
              <div class="card-bg-image" :style="{ backgroundImage: `url(${step.image})` }"></div>
              <div class="card-accent"></div>
              <div class="step-header">
                <div class="step-number">
                  <span>{{ index + 1 }}</span>
                </div>
                <div class="step-icon">
                  <component :is="getIcon(index)" />
                </div>
              </div>
              <div class="step-content">
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-description">{{ step.description }}</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const modules = [Pagination]

const processSteps = [
  {
    title: 'Аналіз',
    description: 'Визначаємо цілі вашого бізнесу та розробляємо стратегію досягнення результатів.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&q=80'
  },
  {
    title: 'Планування',
    description: 'Створюємо структуру сайту та узгоджуємо функціонал для досягнення ваших цілей.',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&h=300&fit=crop&q=80'
  },
  {
    title: 'Дизайн',
    description: 'Розробляємо сучасний дизайн, що конвертує відвідувачів у клієнтів.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&q=80'
  },
  {
    title: 'Розробка',
    description: 'Створюємо швидкий та оптимізований сайт з чистим кодом.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&q=80'
  },
  {
    title: 'Запуск',
    description: 'Тестуємо та запускаємо ваш проєкт. Забезпечуємо підтримку після релізу.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&q=80'
  },
  {
    title: 'Розвиток',
    description: 'Аналізуємо результати та вдосконалюємо сайт для збільшення конверсій.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&q=80'
  }
]

// SVG icons for each step
const icons = [
  // Target/Analysis
  () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('circle', { cx: '12', cy: '12', r: '10' }),
    h('circle', { cx: '12', cy: '12', r: '6' }),
    h('circle', { cx: '12', cy: '12', r: '2' })
  ]),
  // Planning/Clipboard
  () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2' }),
    h('rect', { x: '9', y: '3', width: '6', height: '4', rx: '1' }),
    h('path', { d: 'M9 12h6M9 16h6' })
  ]),
  // Design/Palette
  () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('circle', { cx: '12', cy: '12', r: '10' }),
    h('circle', { cx: '12', cy: '8', r: '1.5', fill: 'currentColor' }),
    h('circle', { cx: '8', cy: '12', r: '1.5', fill: 'currentColor' }),
    h('circle', { cx: '16', cy: '12', r: '1.5', fill: 'currentColor' }),
    h('circle', { cx: '12', cy: '16', r: '1.5', fill: 'currentColor' })
  ]),
  // Development/Code
  () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { d: 'M16 18l6-6-6-6M8 6l-6 6 6 6' })
  ]),
  // Launch/Rocket
  () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { d: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z' }),
    h('path', { d: 'M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z' }),
    h('path', { d: 'M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5' })
  ]),
  // Growth/Chart
  () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { d: 'M3 3v18h18' }),
    h('path', { d: 'M18 9l-5 5-4-4-4 4' })
  ])
]

const getIcon = (index: number) => icons[index] || icons[0]
</script>

<style scoped>
.process-section {
  padding: 6rem 0;
  background: var(--color-bg-secondary);
  position: relative;
  overflow: hidden;
}

/* Background */
.section-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

/* Subtle gradient overlay */
.section-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 50% at 50% 0%,
    rgba(139, 92, 246, 0.06) 0%,
    transparent 60%
  );
}

/* Geometric floating shapes */
.geo-shape {
  position: absolute;
  border: 1px solid var(--color-border-primary);
  opacity: 0.4;
}

.shape-1 {
  width: 120px;
  height: 120px;
  top: 10%;
  left: 5%;
  border-radius: 24px;
  transform: rotate(15deg);
  animation: floatShape 20s ease-in-out infinite;
}

.shape-2 {
  width: 80px;
  height: 80px;
  top: 60%;
  right: 8%;
  border-radius: 50%;
  animation: floatShape 25s ease-in-out infinite reverse;
}

.shape-3 {
  width: 60px;
  height: 60px;
  bottom: 15%;
  left: 15%;
  transform: rotate(45deg);
  animation: floatShape 18s ease-in-out infinite;
}

@keyframes floatShape {
  0%, 100% {
    transform: translateY(0) rotate(15deg);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-20px) rotate(25deg);
    opacity: 0.6;
  }
}

/* Connection lines SVG */
.connection-lines {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1200px;
  height: 100%;
  opacity: 0.5;
}

.connection-path {
  fill: none;
  stroke: url(#lineGradient);
  stroke-width: 2;
  stroke-dasharray: 8 4;
  animation: dashMove 20s linear infinite;
}

@keyframes dashMove {
  to {
    stroke-dashoffset: -100;
  }
}

/* Flowing gradient line */
.flow-line {
  position: absolute;
  top: 50%;
  left: 5%;
  right: 5%;
  height: 1px;
  background: var(--color-border-primary);
  opacity: 0.5;
}

.flow-gradient {
  position: absolute;
  top: -2px;
  left: -30%;
  width: 30%;
  height: 5px;
  background: linear-gradient(90deg,
    transparent 0%,
    var(--color-accent-primary) 30%,
    var(--color-accent-secondary) 70%,
    transparent 100%
  );
  border-radius: 3px;
  animation: flowMove 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  opacity: 0.8;
}

/* Accent dots */
.accent-dot {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.05;
}

.dot-1 {
  width: 400px;
  height: 400px;
  top: -150px;
  left: -50px;
  background: var(--color-accent-primary);
}

.dot-2 {
  width: 350px;
  height: 350px;
  bottom: -120px;
  right: -50px;
  background: var(--color-accent-secondary);
}

@keyframes flowMove {
  0% {
    left: -30%;
    opacity: 0;
  }
  5% {
    opacity: 0.8;
  }
  95% {
    opacity: 0.8;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
}

/* Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-label {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-description {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 500px;
  margin: 0 auto;
}

/* Process Grid */
.process-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.process-step {
  position: relative;
  padding: 2rem;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px var(--color-shadow-color);
  overflow: hidden;
}

/* Background image on cards */
.card-bg-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 55%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  mask-image: linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, transparent 100%);
  pointer-events: none;
  border-radius: 0 20px 20px 0;
}

.process-step:hover .card-bg-image {
  opacity: 0.25;
  width: 65%;
  transform: scale(1.08);
}

/* Card glow effect on hover */
.card-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 150%;
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.08) 0%,
    transparent 60%
  );
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.process-step:hover .card-glow {
  opacity: 1;
}

/* Top accent line with gradient */
.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg,
    var(--color-accent-primary),
    var(--color-accent-secondary),
    var(--color-accent-tertiary)
  );
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.process-step:hover .card-accent {
  transform: scaleX(1);
}

/* Corner decoration */
.corner-deco {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(
    135deg,
    transparent 50%,
    rgba(139, 92, 246, 0.03) 50%
  );
  border-radius: 0 0 20px 0;
  transition: all 0.3s ease;
}

.process-step:hover .corner-deco {
  background: linear-gradient(
    135deg,
    transparent 50%,
    rgba(139, 92, 246, 0.08) 50%
  );
}

.process-step:hover {
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow:
    0 12px 32px rgba(139, 92, 246, 0.1),
    0 0 0 1px rgba(139, 92, 246, 0.05);
  transform: translateY(-6px);
}

/* Step header with number and icon */
.step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.step-number {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  color: white;
  font-size: 1.125rem;
  font-weight: 700;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25);
  transition: all 0.3s ease;
}

.process-step:hover .step-number {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(139, 92, 246, 0.35);
}

.step-icon {
  width: 24px;
  height: 24px;
  color: var(--color-accent-primary);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.step-icon svg {
  width: 100%;
  height: 100%;
}

.process-step:hover .step-icon {
  opacity: 1;
  transform: translateX(4px);
}

.step-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
}

.step-description {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* Mobile */
.mobile-carousel {
  display: none;
}

.process-swiper {
  padding-bottom: 2.5rem;
}

:deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background: var(--color-border-primary);
  opacity: 1;
  transition: all 0.2s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: var(--color-accent-primary);
  width: 24px;
  border-radius: 4px;
}

/* Responsive */
@media (max-width: 1024px) {
  .process-section {
    padding: 5rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .process-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .connection-lines {
    display: none;
  }

  .geo-shape {
    opacity: 0.25;
  }
}

@media (max-width: 768px) {
  .process-section {
    padding: 4rem 0;
  }

  .section-header {
    margin-bottom: 3rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .section-description {
    font-size: 1rem;
  }

  .desktop-grid {
    display: none;
  }

  .mobile-carousel {
    display: block;
  }

  .process-step {
    padding: 1.5rem;
    height: 100%;
  }

  .geo-shape {
    display: none;
  }
}

@media (max-width: 480px) {
  .process-section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .flow-line {
    display: none;
  }

  .accent-dot {
    opacity: 0.03;
    filter: blur(50px);
  }

  .dot-1, .dot-2 {
    width: 200px;
    height: 200px;
  }

  .step-number {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .step-icon {
    width: 20px;
    height: 20px;
  }
}
</style>
