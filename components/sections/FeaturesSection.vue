<template>
  <section class="features-section">
    <!-- Animated Background -->
    <div class="features-background">
      <div class="animated-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
      <div class="gradient-overlay"></div>
      <div class="grid-pattern"></div>
    </div>

    <div class="container">
      <div class="section-header">
        <div class="header-badge">
          <Icon name="mdi:star" size="md" class="badge-icon" />
          <span>Наші переваги</span>
        </div>
        <h2 class="section-title">
          Чому обирають <span class="gradient-text">WebCore?</span>
        </h2>
        <p class="section-description">
          Ми створюємо сайти, які працюють на ваш бізнес: приносять клієнтів, збільшують продажі та розвивають бренд
        </p>
      </div>
      
      <div class="features-list">
        <div 
          v-for="(feature, index) in features" 
          :key="feature.title"
          class="feature-item"
          :class="{ 'feature-reverse': index % 2 === 1 }"
        >
          <div class="feature-visual">
            <div class="visual-glow" :style="{ animationDelay: `${index * 0.2}s` }"></div>
            <div class="visual-gradient" :style="{ background: getGradient(index) }"></div>
            <img 
              :src="feature.image" 
              :alt="feature.title"
              class="feature-image"
              loading="lazy"
            />
            <div class="visual-pattern"></div>
          </div>
          <div class="feature-content">
            <div class="feature-number">{{ String(index + 1).padStart(2, '0') }}</div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
            <div class="feature-accent"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Particles -->
    <div class="floating-particles">
      <div class="particle" v-for="i in 12" :key="i" :style="getParticleStyle(i)"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Icon from '../Icon.vue'

// Features data
const features = [
  {
    title: 'Результати для бізнесу',
    description: 'Ми створюємо сайти, які реально працюють: збільшують продажі, приносять нових клієнтів та розвивають бізнес в інтернеті.',
    icon: 'mdi:trending-up',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80'
  },
  {
    title: 'Ваш сайт працює скрізь',
    description: 'Кожен клієнт має побачити ваш бізнес ідеальним, незалежно від того, чи він відкриває сайт на телефоні, планшеті або комп\'ютері.',
    icon: 'mdi:devices',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&q=80'
  },
  {
    title: 'Більше клієнтів з інтернету',
    description: 'Ваш сайт завжди на першій сторінці пошуку - це означає більше відвідувачів, більше заявок та більше продажів для вашого бізнесу.',
    icon: 'mdi:account-multiple-plus',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop&q=80'
  },
  {
    title: 'Ми завжди поруч',
    description: 'Після запуску ми продовжуємо працювати з вами: допомагаємо розвивати сайт, додаємо нові функції та завжди готові відповісти на ваші питання.',
    icon: 'mdi:handshake',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop&q=80'
  }
]

// Generate random particle styles
const getParticleStyle = (index: number) => {
  const size = Math.random() * 6 + 3
  const left = Math.random() * 100
  const animationDuration = Math.random() * 12 + 18
  const delay = Math.random() * 3
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDuration: `${animationDuration}s`,
    animationDelay: `${delay}s`
  }
}

// Get gradient for each feature
const getGradient = (index: number) => {
  const gradients = [
    'linear-gradient(135deg, #8B5CF6 0%, #D946EF 50%, #F97316 100%)',
    'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #D946EF 100%)',
    'linear-gradient(135deg, #10B981 0%, #3B82F6 50%, #8B5CF6 100%)',
    'linear-gradient(135deg, #F97316 0%, #EAB308 50%, #10B981 100%)'
  ]
  return gradients[index % gradients.length]
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

/* Features Section */
.features-section {
  padding: 8rem 0;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-secondary);
}

/* Animated Background */
.features-background {
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
  animation: morphShape 25s ease-in-out infinite;
}

.shape-1 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  top: -15%;
  left: -10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, var(--color-accent-secondary), var(--color-accent-tertiary));
  bottom: -10%;
  right: -5%;
  animation-delay: 8s;
}

.shape-3 {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, var(--color-accent-tertiary), var(--color-accent-primary));
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

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(var(--color-border-primary) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border-primary) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.2;
  z-index: 1;
  animation: gridMove 30s linear infinite;
}

/* Header Styles */
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
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary), var(--color-accent-tertiary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
}

.section-description {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Features List */
.features-list {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  position: relative;
  z-index: 2;
}

.feature-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  padding: 3rem 0;
  min-height: 400px;
}

.feature-item.feature-reverse {
  direction: rtl;
}

.feature-item.feature-reverse > * {
  direction: ltr;
}

@media (min-width: 1024px) {
  .feature-item {
    opacity: 0;
    animation: fadeInUp 0.8s ease forwards;
  }

  .feature-item:nth-child(1) { animation-delay: 0.1s; }
  .feature-item:nth-child(2) { animation-delay: 0.2s; }
  .feature-item:nth-child(3) { animation-delay: 0.3s; }
  .feature-item:nth-child(4) { animation-delay: 0.4s; }
}

/* Visual Side */
.feature-visual {
  position: relative;
  height: 100%;
  min-height: 350px;
  border-radius: 32px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-item:hover .feature-visual {
  transform: scale(1.05);
  border-color: var(--color-border-accent);
  box-shadow: 0 24px 80px rgba(139, 92, 246, 0.3);
}

.visual-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%);
  transform: translate(-50%, -50%);
  animation: glowPulse 4s ease-in-out infinite;
  border-radius: 50%;
  z-index: 2;
  pointer-events: none;
}

.visual-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.4;
  transition: opacity 0.5s ease;
  mix-blend-mode: overlay;
  z-index: 1;
}

.feature-item:hover .visual-gradient {
  opacity: 0.3;
}

.visual-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  opacity: 0.5;
  z-index: 3;
  pointer-events: none;
}

.feature-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.feature-item:hover .feature-image {
  transform: scale(1.1);
}

/* Content Side */
.feature-content {
  position: relative;
  padding: 2rem;
}

.feature-number {
  font-size: 5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #8B5CF6, #D946EF);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin-bottom: 1.5rem;
  opacity: 0.2;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.feature-title {
  position: relative;
  z-index: 1;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.2;
  transition: all 0.3s ease;
}

.feature-item:hover .feature-title {
  transform: translateX(8px);
  color: var(--color-accent-primary);
}

.feature-description {
  position: relative;
  z-index: 1;
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
  max-width: 500px;
}

.feature-accent {
  position: absolute;
  bottom: 0;
  left: 2rem;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #8B5CF6, #D946EF);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-item:hover .feature-accent {
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
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  opacity: 0.3;
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

@keyframes glowPulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.5;
  }
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(40px, 40px);
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

@keyframes floatUp {
  0% {
    bottom: -10px;
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    bottom: 100%;
    opacity: 0;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .features-section {
    padding: 6rem 0;
  }

  .section-header {
    margin-bottom: 4rem;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .features-list {
    gap: 3rem;
  }

  .feature-item {
    grid-template-columns: 1fr;
    gap: 2rem;
    min-height: auto;
    padding: 2rem 0;
  }

  .feature-item.feature-reverse {
    direction: ltr;
  }

  .feature-visual {
    min-height: 280px;
    order: 1;
  }

  .feature-content {
    order: 2;
    padding: 1rem;
  }


  .feature-number {
    font-size: 4rem;
  }

  .feature-title {
    font-size: 2rem;
  }

  .feature-description {
    font-size: 1.125rem;
  }

  .shape {
    filter: blur(60px);
    opacity: 0.3;
  }
}

@media (max-width: 1343px) {
  .features-section {
    padding: 4rem 0;
  }

  .section-header {
    margin-bottom: 3rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-description {
    font-size: 1.125rem;
  }

  .features-list {
    gap: 2.5rem;
  }

  .feature-item {
    gap: 2rem;
    padding: 2rem 0;
  }

  .feature-visual {
    min-height: 250px;
  }


  .feature-number {
    font-size: 3.5rem;
  }

  .feature-title {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }

  .feature-description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .features-section {
    padding: 3rem 0;
  }

  .section-header {
    margin-bottom: 2.5rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .section-description {
    font-size: 1rem;
  }

  .header-badge {
    padding: 0.4rem 1rem;
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }

  .features-list {
    gap: 2rem;
  }

  .feature-item {
    padding: 1.5rem 0;
  }

  .feature-visual {
    min-height: 200px;
    border-radius: 24px;
  }


  .feature-content {
    padding: 0.5rem;
  }

  .feature-number {
    font-size: 3rem;
  }

  .feature-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .feature-description {
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .visual-glow {
    width: 200px;
    height: 200px;
  }

  .shape {
    filter: blur(40px);
    opacity: 0.2;
  }

  .grid-pattern {
    opacity: 0.15;
  }
}
</style>
