<template>
  <section class="portfolio-section">
    <!-- Animated Background -->
    <div class="portfolio-background">
      <div class="animated-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
      <div class="gradient-overlay"></div>
      <div class="grid-pattern"></div>
    </div>

    <div class="container">
      <div class="section-header">
        <div class="header-badge">
          <Icon name="mdi:folder-multiple-image" size="md" class="badge-icon" />
          <span>Портфоліо</span>
        </div>
        <h2 class="section-title">
          Наші <span class="gradient-text">роботи</span>
        </h2>
        <p class="section-description">
          Реальні проєкти, які ми створили для наших клієнтів, які приносять результат
        </p>
      </div>
      
      <div class="portfolio-grid">
        <div 
          v-for="(project, index) in portfolioProjects" 
          :key="project.title"
          class="portfolio-item"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="project-glow"></div>
          <div class="project-pattern"></div>
          <div class="project-accent-line"></div>
          
          <div class="project-image">
            <img 
              :src="project.image" 
              :alt="project.title"
              loading="lazy"
              class="project-preview"
            />
            <div class="project-overlay">
              <a :href="project.url" target="_blank" class="project-link">
                <Icon name="mdi:open-in-new" size="md" />
                Переглянути сайт
              </a>
            </div>
          </div>
          
          <div class="project-info">
            <div class="project-number">{{ String(index + 1).padStart(2, '0') }}</div>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Particles -->
    <div class="floating-particles">
      <div class="particle" v-for="i in 15" :key="i" :style="getParticleStyle(i)"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Icon from '../Icon.vue'

// Portfolio data
const portfolioProjects = [
  {
    title: 'ARGO - Agency',
    description: 'Сучасний сайт для digital агентства з портфоліо та системою управління проектами',
    image: '/images/argo.png',
    url: 'https://argosolutions.xyz/',
    tags: ['Агентство', 'Портфоліо', 'CMS']
  },
  {
    title: 'ФГ АСТРА — Фермерське господарство',
    description: 'Сайт-візитка для фермерського господарства з каталогом продукції та онлайн-замовленнями',
    image: '/images/astra.png',
    url: 'https://astra-farm.info/',
    tags: ['Сайт-візитка']
  },
  {
    title: 'Lysium Network - Blockchain',
    description: 'Технологічна платформа для Proof-of-Usage блокчейн мережі з інтерактивними елементами',
    image: '/images/lysium.png',
    url: 'https://lysium.com/',
    tags: ['Blockchain', 'Web3', 'Інтерактивний дизайн']
  },
  {
    title: 'Filip Capital - Web3 Venture Fund',
    description: 'Веб-сайт для venture fund, що інвестує в блокчейн інновації та децентралізовані технології майбутнього',
    image: '/images/fillip-capital.png',
    url: 'http://try.s1ngle.xyz/',
    tags: ['Web3', 'Venture Fund', 'Blockchain', 'Інвестиції']
  },
  {
    title: 'РЕПЕТИЦІЙНА ТОЧКА',
    description: 'Сучасний сайт для репетиційної студії з онлайн-бронюванням кімнат та інформацією про професійне обладнання та комфортні умови для музикантів',
    image: '/images/rep-tochka.png',
    url: 'https://reptochka.space/',
    tags: ['Репетиційна студія', 'Бронювання', 'Музика', 'Онлайн-запис']
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
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 1200px;
  position: relative;
  z-index: 2;
}

/* Portfolio Section */
.portfolio-section {
  padding: 8rem 0;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-secondary);
}

/* Animated Background */
.portfolio-background {
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

.shape-4 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-tertiary));
  top: 20%;
  right: 10%;
  animation-delay: 12s;
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

/* Portfolio Grid */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 4rem;
  position: relative;
  z-index: 2;
}

@media (min-width: 1024px) {
  .portfolio-item {
    opacity: 0;
    animation: fadeInUp 0.8s ease forwards;
  }
}

.portfolio-item {
  background: var(--color-card-bg);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--color-border-primary);
  position: relative;
}

.portfolio-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  padding: 2px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary), var(--color-accent-tertiary));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.portfolio-item:hover::before {
  opacity: 1;
}

.project-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: 24px;
  z-index: 0;
  pointer-events: none;
}

.portfolio-item:hover .project-glow {
  opacity: 1;
  animation: glowPulse 3s ease-in-out infinite;
}

.project-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 1px 1px, var(--color-border-accent) 1px, transparent 0);
  background-size: 20px 20px;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
  pointer-events: none;
}

.portfolio-item:hover .project-pattern {
  opacity: 0.1;
}

.project-accent-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary), var(--color-accent-tertiary));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
  z-index: 2;
}

.portfolio-item:hover .project-accent-line {
  transform: scaleX(1);
}

.portfolio-item:hover {
  transform: translateY(-12px);
  box-shadow: 0 24px 80px rgba(139, 92, 246, 0.3);
  border-color: var(--color-border-accent);
}

.project-image {
  position: relative;
  height: 300px;
  background: var(--color-bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 24px 24px 0 0;
  z-index: 2;
}

.project-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(217, 70, 239, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 3;
}

.portfolio-item:hover .project-overlay {
  opacity: 1;
}

.portfolio-item:hover .project-preview {
  transform: scale(1.1);
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  transform: translateY(10px);
  opacity: 0;
}

.portfolio-item:hover .project-link {
  transform: translateY(0);
  opacity: 1;
}

.project-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.project-info {
  padding: 2.5rem;
  position: relative;
  z-index: 2;
}

.project-number {
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary), var(--color-accent-tertiary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin-bottom: 1rem;
  opacity: 0.3;
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  z-index: 0;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  position: relative;
  z-index: 1;
}

.project-description {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
}

.project-tag {
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.portfolio-item:hover .project-tag {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);
}

/* Floating Particles */
.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: var(--color-accent-primary);
  border-radius: 50%;
  opacity: 0.6;
  animation: floatUp linear infinite;
  filter: blur(2px);
}

@keyframes floatUp {
  0% {
    transform: translateY(100vh) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100px) translateX(50px);
    opacity: 0;
  }
}

@keyframes morphShape {
  0%, 100% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    transform: translate(0, 0);
  }
  25% {
    border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
    transform: translate(5%, -5%);
  }
  50% {
    border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
    transform: translate(0, 5%);
  }
  75% {
    border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
    transform: translate(-5%, 0);
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

@keyframes badgeFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
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

/* Accessibility - Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .shape,
  .badge-icon,
  .particle,
  .grid-pattern,
  .header-badge,
  .project-glow {
    animation: none !important;
  }

  .portfolio-item {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .project-preview,
  .project-overlay,
  .project-link {
    transition: none !important;
  }
}

/* Responsive Design */
@media (max-width: 1343px) {
  .portfolio-section {
    padding: 4rem 0;
  }

  .section-header {
    margin-bottom: 3rem;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .section-description {
    font-size: 1.125rem;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .project-info {
    padding: 2rem;
  }

  .project-number {
    font-size: 3rem;
    top: 1rem;
    right: 1.5rem;
  }

  .project-title {
    font-size: 1.375rem;
  }

  .project-description {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .portfolio-section {
    padding: 3rem 0;
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

  .portfolio-grid {
    gap: 1.5rem;
  }

  .project-info {
    padding: 1.5rem;
  }

  .project-number {
    font-size: 2.5rem;
    top: 0.75rem;
    right: 1rem;
  }
}

@media (max-width: 480px) {
  .portfolio-section {
    padding: 2.5rem 0;
  }

  .header-badge {
    font-size: 0.75rem;
    padding: 0.4rem 1rem;
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }

  .section-description {
    font-size: 0.95rem;
  }

  .portfolio-grid {
    gap: 1.25rem;
  }

  .project-image {
    height: 200px;
  }

  .project-info {
    padding: 1.25rem;
  }

  .project-number {
    font-size: 2rem;
    top: 0.5rem;
    right: 0.75rem;
  }

  .project-title {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }

  .project-description {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .project-link {
    font-size: 0.9rem;
    padding: 0.75rem 1.5rem;
  }

  .project-tag {
    font-size: 0.75rem;
    padding: 0.375rem 0.875rem;
  }
}
</style>
