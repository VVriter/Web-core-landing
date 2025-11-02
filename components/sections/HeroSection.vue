<template>
  <section class="hero-section">
    <!-- Animated Background -->
    <div class="hero-background">
      <div class="gradient-orbs">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>
      <div class="grid-pattern"></div>
    </div>

    <div class="hero-container">
      <div class="hero-content">
        <!-- Main Content -->
        <div class="hero-main">
          <div class="hero-badge">
            <Icon name="mdi:star" size="md" class="badge-icon" />
            <span>WebCore Agency</span>
          </div>
          
          <h1 class="hero-title">
            Професійні веб-послуги 
            <br>
            для вашого <span class="highlight-text">бізнесу</span>
          </h1>
          
          <h2 class="hero-subtitle">
            <span class="gradient-text">Швидко. Якісно. З концентрацією на результат.</span>
          </h2>
          
          <p class="hero-description">
            Створюємо сайти, які представляють ваш бізнес в інтернеті та приносять <strong>реальні результати</strong>
          </p>

          <!-- Stats -->
          <div class="hero-stats">
            <div class="stat-item" v-for="(stat, index) in stats" :key="index">
              <div class="stat-number">{{ stat.number }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="hero-actions">
            <button class="btn-primary pulse-animation" @click="openModal('order')">
              <Icon name="mdi:rocket-launch" size="lg" />
              Замовити проект
              <span class="btn-shine"></span>
            </button>
            <button class="btn-secondary" @click="openModal('contact')">
              <Icon name="mdi:send" size="lg" />
              Зв'язатися зараз
            </button>
          </div>

          <!-- Trust Indicators -->
          <div class="trust-indicators">
            <div class="trust-item">
                <Icon name="mdi:shield-check" size="md" />
              <span>Гарантія якості</span>
            </div>
            <div class="trust-item">
                <Icon name="mdi:clock-fast" size="md" />
              <span>Швидка розробка</span>
            </div>
            <div class="trust-item">
                <Icon name="mdi:account-group" size="md" />
              <span>Задоволені клієнти</span>
            </div>
          </div>
        </div>

        <!-- Visual Side -->
        <div class="hero-visual">
          <!-- Interactive Demo -->
          <div class="demo-container">
            <div class="demo-browser">
              <div class="browser-header">
                <div class="browser-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <div class="browser-url">web-core.agency</div>
              </div>
              <div class="browser-content">
                <!-- Animated Website Preview -->
                <div class="website-preview">
                  <div class="preview-header">
                    <div class="preview-logo"></div>
                    <div class="preview-nav">
                      <div class="nav-item active"></div>
                      <div class="nav-item"></div>
                      <div class="nav-item"></div>
                    </div>
                  </div>
                  <div class="preview-hero">
                    <div class="preview-title"></div>
                    <div class="preview-subtitle"></div>
                    <div class="preview-button"></div>
                  </div>
                  <div class="preview-features">
                    <div class="feature-card" v-for="i in 3" :key="i"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating Elements -->
            <div class="floating-elements">
              <div class="floating-card card-1">
                <Icon name="mdi:trending-up" size="md" />
                <span>+150% продажів</span>
              </div>
              <div class="floating-card card-2">
                <Icon name="mdi:speedometer" size="md" />
                <span>Швидкий результат</span>
              </div>
              <div class="floating-card card-3">
                <Icon name="mdi:mobile-phone" size="md" />
                <span>Працює скрізь</span>
              </div>
              <div class="floating-card card-4">
                <Icon name="mdi:google" size="md" />
                <span>Більше клієнтів</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator" @click="scrollToFeatures">
      <div class="scroll-text">Дізнатися більше</div>
      <div class="scroll-arrow">
        <Icon name="mdi:chevron-down" size="lg" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Icon from '../Icon.vue'
import { useModal } from '../../composables/useModal'

const { openModal } = useModal()

// Stats data
const stats = [
  { number: '1-6', label: 'Тижнів розробки' },
  { number: '60', label: 'Днів гарантії' },
  { number: '2', label: 'Місяці підтримки' },
  { number: '24/7', label: 'Консультації' }
]

// Methods
const scrollToContact = () => {
  // Scroll to contact section or footer
  const footer = document.querySelector('footer')
  if (footer) {
    footer.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToFeatures = () => {
  const processSection = document.querySelector('#process-section')
  if (processSection) {
    processSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
/* Hero Section */
.hero-section {
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.hero-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Animated Background */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.gradient-orbs {
  position: absolute;
  width: 100%;
  height: 100%;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.6;
  animation: float 8s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, var(--color-accent-secondary), var(--color-accent-tertiary));
  top: 60%;
  right: 20%;
  animation-delay: 2s;
}

.orb-3 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, var(--color-accent-tertiary), var(--color-accent-primary));
  bottom: 20%;
  left: 60%;
  animation-delay: 4s;
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
  background-size: 50px 50px;
  opacity: 0.3;
  animation: gridMove 20s linear infinite;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* Hero Main Content */
.hero-main {
  max-width: 600px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-accent);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-accent-primary);
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
  animation: badgePulse 3s ease-in-out infinite;
}

.badge-icon {
  color: var(--color-accent-tertiary);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

.hero-subtitle {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 1rem;
  color: var(--color-text-secondary);
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary), var(--color-accent-tertiary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}

.highlight-text {
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}

.highlight-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  border-radius: 2px;
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.hero-description strong {
  color: var(--color-accent-primary);
  font-weight: 600;
}

/* Hero Stats */
.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--color-border-primary);
  border-bottom: 1px solid var(--color-border-primary);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-accent-primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-text-tertiary);
  font-weight: 500;
}

/* Hero Actions */
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
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
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  color: white;
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
}

.btn-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(139, 92, 246, 0.4);
}

.btn-primary.pulse-animation {
  animation: pulse 2s ease-in-out infinite;
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shine 3s ease-in-out infinite;
}

.btn-secondary {
  background: var(--color-card-bg);
  color: var(--color-text-primary);
  border: 2px solid var(--color-border-primary);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-accent-primary);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px var(--color-shadow-color);
}

/* Trust Indicators */
.trust-indicators {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.trust-item svg {
  color: var(--color-accent-primary);
}

/* Hero Visual */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* Demo Container */
.demo-container {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.demo-browser {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px var(--color-shadow-color);
  backdrop-filter: blur(20px);
}

.browser-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border-primary);
}

.browser-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red {
  background: #ff5f57;
}

.dot.yellow {
  background: #ffbd2e;
}

.dot.green {
  background: #28ca42;
}

.browser-url {
  font-size: 0.875rem;
  color: var(--color-text-tertiary);
  background: var(--color-bg-primary);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-border-primary);
}

.browser-content {
  padding: 2rem;
  min-height: 300px;
}

/* Website Preview */
.website-preview {
  animation: websiteLoad 4s ease-in-out infinite;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.preview-logo {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  border-radius: 8px;
  animation: logoSpin 3s ease-in-out infinite;
}

.preview-nav {
  display: flex;
  gap: 1rem;
}

.nav-item {
  width: 60px;
  height: 8px;
  background: var(--color-border-primary);
  border-radius: 4px;
  animation: navLoad 2s ease-in-out infinite;
}

.nav-item.active {
  background: var(--color-accent-primary);
}

.nav-item:nth-child(2) {
  animation-delay: 0.3s;
}

.nav-item:nth-child(3) {
  animation-delay: 0.6s;
}

.preview-hero {
  margin-bottom: 2rem;
}

.preview-title {
  width: 80%;
  height: 20px;
  background: var(--color-text-primary);
  border-radius: 4px;
  margin-bottom: 1rem;
  animation: textLoad 2.5s ease-in-out infinite;
}

.preview-subtitle {
  width: 60%;
  height: 12px;
  background: var(--color-text-secondary);
  border-radius: 4px;
  margin-bottom: 1.5rem;
  animation: textLoad 2.5s ease-in-out infinite 0.2s;
}

.preview-button {
  width: 120px;
  height: 40px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  border-radius: 8px;
  animation: buttonPulse 2s ease-in-out infinite;
}

.preview-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.preview-features .feature-card {
  height: 60px !important;
  min-height: 60px !important;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 8px;
  animation: cardFloat 3s ease-in-out infinite;
  display: block !important;
  flex-direction: initial !important;
  justify-content: initial !important;
  padding: 0 !important;
}

.preview-features .feature-card:nth-child(2) {
  animation-delay: 0.5s;
}

.preview-features .feature-card:nth-child(3) {
  animation-delay: 1s;
}

/* Floating Elements */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-accent);
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-primary);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px var(--color-shadow-color);
  animation: floatCard 4s ease-in-out infinite;
}

.floating-card svg {
  color: var(--color-accent-primary);
}

.card-1 {
  top: 10%;
  right: -20%;
  animation-delay: 0s;
}

.card-2 {
  top: 30%;
  left: -25%;
  animation-delay: 1s;
}

.card-3 {
  bottom: 30%;
  right: -15%;
  animation-delay: 2s;
}

.card-4 {
  bottom: 10%;
  left: -30%;
  animation-delay: 3s;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.scroll-indicator:hover {
  transform: translateX(-50%) translateY(-4px);
}

.scroll-text {
  font-size: 0.875rem;
  color: var(--color-text-tertiary);
  font-weight: 500;
}

.scroll-arrow {
  color: var(--color-accent-primary);
  animation: bounce 2s ease-in-out infinite;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

@keyframes badgePulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
  50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(139, 92, 246, 0); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes shine {
  0% { left: -100%; }
  50% { left: 100%; }
  100% { left: 100%; }
}

@keyframes websiteLoad {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

@keyframes logoSpin {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
}

@keyframes navLoad {
  0%, 100% { opacity: 0.3; transform: scaleX(1); }
  50% { opacity: 1; transform: scaleX(1.1); }
}

@keyframes textLoad {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes buttonPulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
  50% { transform: scale(1.05); box-shadow: 0 0 0 8px rgba(139, 92, 246, 0); }
}

@keyframes cardFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes floatCard {
  0%, 100% { 
    transform: translateY(0px) translateX(0px) rotate(0deg);
    opacity: 0.8;
  }
  25% { 
    transform: translateY(-10px) translateX(5px) rotate(1deg);
    opacity: 1;
  }
  75% { 
    transform: translateY(-5px) translateX(-3px) rotate(-1deg);
    opacity: 0.9;
  }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-section {
    min-height: calc(100vh - 60px);
    padding: 1.5rem 0;
  }

  .hero-container {
    padding: 0 1.5rem;
  }

  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem 0;
    margin-bottom: 1.5rem;
  }

  .floating-card {
    display: none;
  }

  .demo-container {
    max-width: 400px;
  }
}

@media (max-width: 1343px) {
  .hero-section {
    min-height: calc(100vh - 60px);
    padding: 2rem 0;
  }

  .hero-container {
    padding: 0 1.5rem;
  }

  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .hero-main {
    order: 1;
    max-width: 100%;
  }

  .hero-visual {
    order: 2;
    display: none;
  }
  
  .hero-title {
    font-size: 2.25rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }

  .hero-description {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .hero-stats {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
    padding: 0;
    margin-bottom: 1.5rem;
    background: transparent;
    border: none;
  }

  .stat-item {
    padding: 0.75rem 0.5rem;
    border-radius: 8px;
    background: var(--color-card-bg);
    border: 1px solid var(--color-border-primary);
    transition: all 0.3s ease;
    text-align: center;
  }

  .stat-item:hover {
    transform: translateY(-2px);
    border-color: var(--color-border-accent);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
  }

  .stat-number {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  .stat-label {
    font-size: 0.75rem;
    line-height: 1.2;
  }
  
  .hero-actions {
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  
  .btn-primary,
  .btn-secondary {
    flex: 1;
    min-width: 140px;
    max-width: calc(50% - 0.375rem);
    justify-content: center;
    padding: 0.875rem 1.25rem;
    font-size: 0.9rem;
  }

  .trust-indicators {
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0;
  }

  .trust-item {
    flex: 1;
    min-width: 100px;
    padding: 0.5rem;
    font-size: 0.8rem;
    background: transparent;
    border: none;
  }

  .demo-container {
    max-width: 100%;
    width: 100%;
  }

  .demo-browser {
    width: 100%;
  }

  .browser-content {
    padding: 1rem;
    min-height: 200px;
  }

  .floating-elements {
    display: none;
  }

  .orb-1, .orb-2, .orb-3 {
    filter: blur(30px);
    opacity: 0.3;
  }

  .scroll-indicator {
    bottom: 1rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: auto;
    padding: 1.5rem 0 2rem;
  }

  .hero-container {
    padding: 0 1rem;
  }

  .hero-content {
    gap: 2rem;
  }

  .hero-badge {
    font-size: 0.75rem;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
  }
  
  .hero-title {
    font-size: 1.875rem;
    line-height: 1.3;
    margin-bottom: 0.75rem;
  }

  .hero-subtitle {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }

  .hero-description {
    font-size: 0.95rem;
    margin-bottom: 1.25rem;
  }

  .hero-stats {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    padding: 0;
  }

  .stat-item {
    padding: 0.625rem 0.375rem;
  }

  .stat-number {
    font-size: 1.25rem;
    margin-bottom: 0.125rem;
  }

  .stat-label {
    font-size: 0.7rem;
    line-height: 1.2;
  }

  .hero-actions {
    gap: 0.625rem;
    margin-bottom: 1.25rem;
  }
  
  .btn-primary,
  .btn-secondary {
    flex: 1;
    min-width: 130px;
    max-width: calc(50% - 0.3125rem);
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }

  .trust-indicators {
    gap: 0.75rem;
    padding: 0;
  }

  .trust-item {
    font-size: 0.75rem;
    padding: 0.375rem;
    min-width: 90px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 1rem 0 1.5rem;
  }

  .hero-container {
    padding: 0 0.75rem;
  }

  .hero-content {
    gap: 1.5rem;
  }

  .hero-badge {
    font-size: 0.7rem;
    padding: 0.4rem 0.875rem;
    margin-bottom: 0.75rem;
  }
  
  .hero-title {
    font-size: 1.625rem;
    line-height: 1.25;
    margin-bottom: 0.5rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }

  .hero-description {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .hero-stats {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.375rem;
    padding: 0;
  }

  .stat-item {
    padding: 0.5rem 0.25rem;
    border-radius: 6px;
  }

  .stat-number {
    font-size: 1.125rem;
    margin-bottom: 0.125rem;
  }

  .stat-label {
    font-size: 0.65rem;
    line-height: 1.1;
  }
  
  .hero-actions {
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .btn-primary,
  .btn-secondary {
    flex: 1;
    min-width: 120px;
    max-width: calc(50% - 0.25rem);
    padding: 0.625rem 0.875rem;
    font-size: 0.8rem;
  }

  .btn-primary .btn-shine,
  .btn-secondary .btn-shine {
    display: none;
  }

  .trust-indicators {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    padding: 0;
  }

  .trust-item {
    flex: 0 0 auto;
    justify-content: center;
    font-size: 0.7rem;
    padding: 0.375rem 0.5rem;
    min-width: 80px;
  }

  .demo-container {
    margin-top: 1rem;
  }

  .demo-browser {
    border-radius: 12px;
  }

  .browser-header {
    padding: 0.5rem 0.75rem;
  }

  .browser-dots {
    gap: 0.375rem;
  }

  .dot {
    width: 8px;
    height: 8px;
  }

  .browser-url {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
  }

  .browser-content {
    padding: 0.75rem;
    min-height: 180px;
  }

  .scroll-indicator {
    bottom: 0.5rem;
    transform: translateX(-50%) scale(0.9);
  }

  .scroll-text {
    font-size: 0.75rem;
  }
}
</style>
