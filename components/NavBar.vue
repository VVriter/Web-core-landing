<template>
  <nav 
    class="navbar"
    :class="{ 'scrolled': isScrolled, 'mobile-open': isMobileMenuOpen }"
  >
    <!-- Animated Background -->
    <div class="navbar-background">
      <div class="navbar-gradient"></div>
      <div class="navbar-pattern"></div>
    </div>

    <div class="navbar-container">
      <!-- Logo Section -->
      <div class="navbar-brand">
        <NuxtLink to="/" class="brand-link" @click="closeMobileMenu">
          <WebCoreLogo :animated="true" :size="40" animation-type="static" class="brand-logo" />
          <span class="brand-text">WebCore</span>
        </NuxtLink>
      </div>

      <!-- Desktop Navigation -->
      <div class="navbar-nav desktop-nav">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.name"
          :to="item.href" 
          class="nav-link"
          :class="{ 'active': $route.path === item.href }"
        >
          <Icon :name="item.icon" size="md" class="nav-icon" />
          {{ item.name }}
        </NuxtLink>
      </div>

      <!-- Theme Toggle & CTA Button -->
      <div class="navbar-actions desktop-nav">
        <button 
          class="theme-toggle"
          @click="toggleTheme"
          :title="isDark ? 'Перемкнути на світлу тему' : 'Перемкнути на темну тему'"
        >
          <Icon :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" size="md" />
        </button>
        
        <button class="cta-button primary" @click="openModal('contact')">
          <Icon name="mdi:rocket-launch" size="md" class="cta-icon" />
          Зв'язатися зараз
        </button>
      </div>

      <!-- Mobile Menu Toggle -->
      <button 
        class="mobile-toggle"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle navigation"
      >
        <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <Transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="mobile-nav">
        <div class="mobile-nav-content">
          <div class="mobile-nav-links">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.name"
              :to="item.href" 
              class="mobile-nav-link"
              :class="{ 'active': $route.path === item.href }"
              @click="closeMobileMenu"
            >
              <Icon :name="item.icon" size="md" class="mobile-nav-icon" />
              {{ item.name }}
            </NuxtLink>
          </div>
          
          <div class="mobile-nav-actions">
            <button 
              class="theme-toggle mobile"
              @click="toggleTheme"
              :title="isDark ? 'Перемкнути на світлу тему' : 'Перемкнути на темну тему'"
            >
              <Icon :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" size="md" />
              {{ isDark ? 'Світла тема' : 'Темна тема' }}
            </button>
            
            <button class="cta-button primary mobile" @click="openModal('contact'); closeMobileMenu()">
              <Icon name="mdi:rocket-launch" size="md" class="cta-icon" />
              Зв'язатися зараз
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import WebCoreLogo from './WebCoreLogo.vue'
import { useTheme } from '../composables/useTheme'
import { useModal } from '../composables/useModal'

// Modal system
const { openModal } = useModal()

// Navigation items
const navItems = [
  { name: 'Головна', href: '/', icon: 'mdi:home' },
  { name: 'Послуги', href: '/services', icon: 'mdi:cogs' },
  { name: 'Проекти', href: '/projects', icon: 'mdi:briefcase' },
  { name: 'Про нас', href: '/about', icon: 'mdi:account-group' },
  // { name: 'Блог', href: '/blog', icon: 'mdi:post' },
  { name: 'Контакти', href: '/contact', icon: 'mdi:email' }
]

// Reactive state
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

// Theme system
const { isDark, toggleTheme } = useTheme()

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  
  // Prevent body scroll when mobile menu is open
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Close mobile menu on route change
  if (typeof window !== 'undefined') {
    try {
      const router = useRouter()
      router.afterEach(() => {
        closeMobileMenu()
      })
    } catch (e) {
      // Router not available in some contexts
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})

// Close mobile menu on escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isMobileMenuOpen.value) {
      closeMobileMenu()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  background: var(--color-navbar-bg);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border-primary);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.navbar-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.navbar-gradient {
  position: absolute;
  top: -50%;
  left: -20%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%);
  border-radius: 50%;
  animation: gradientFloat 8s ease-in-out infinite;
  filter: blur(40px);
}

.navbar-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(var(--color-border-primary) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border-primary) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.1;
  animation: patternMove 20s linear infinite;
}

.navbar.scrolled {
  background: var(--color-navbar-bg-scrolled);
  backdrop-filter: blur(24px);
  border-bottom-color: var(--color-border-accent);
  box-shadow: 0 8px 40px rgba(139, 92, 246, 0.15);
}

.navbar.scrolled .navbar-gradient {
  opacity: 0.2;
}

@keyframes gradientFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(30px, 30px) scale(1.2);
  }
}

@keyframes patternMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(30px, 30px);
  }
}

.navbar-container {
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 70px;
  gap: 2rem;
  position: relative;
  z-index: 1;
  max-width: 1400px;
}

/* Mobile first - override grid with flex */
@media (max-width: 1343px) {
  .navbar-container {
    display: flex !important;
    grid-template-columns: none !important;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    height: 60px;
  }
}

/* Brand Section */
.navbar-brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--color-text-primary);
  font-weight: 700;
  font-size: 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: 0.5rem;
  border-radius: 12px;
}

.brand-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(217, 70, 239, 0.1));
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.brand-link:hover::before {
  opacity: 1;
}

.brand-link:hover {
  transform: scale(1.05) translateY(-2px);
}

.brand-logo {
  filter: drop-shadow(0 0 12px rgba(139, 92, 246, 0.4));
  transition: filter 0.3s ease;
  position: relative;
}

.brand-link:hover .brand-logo {
  filter: drop-shadow(0 0 16px rgba(139, 92, 246, 0.6));
  animation: logoPulse 2s ease-in-out infinite;
}

.brand-text {
  background: linear-gradient(135deg, #8B5CF6, #D946EF, #F97316);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
  position: relative;
}

@keyframes logoPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  align-items: center;
}

.navbar-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  border-radius: 10px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  white-space: nowrap;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 80%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-accent-primary), transparent);
  border-radius: 2px;
  transition: transform 0.4s ease;
}

.nav-link:hover {
  color: var(--color-text-primary);
  background: var(--color-card-bg);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
  border: 1px solid var(--color-border-accent);
}

.nav-link:hover::after {
  transform: translateX(-50%) scaleX(1);
}

.nav-link.active {
  color: var(--color-accent-primary);
}

.nav-link.active::after {
  transform: translateX(-50%) scaleX(1);
  background: linear-gradient(90deg, transparent, var(--color-accent-primary), var(--color-accent-secondary), transparent);
}

.nav-icon {
  width: 18px;
  height: 18px;
  opacity: 0.8;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover .nav-icon {
  opacity: 1;
  transform: scale(1.1) rotate(5deg);
  color: var(--color-accent-primary);
}

.nav-link.active .nav-icon {
  opacity: 1;
  color: var(--color-accent-primary);
}

/* Theme Toggle & Actions */
.navbar-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 44px;
  height: 44px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 12px;
  color: var(--color-text-secondary);
  cursor: pointer;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.theme-toggle::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
}

.theme-toggle:hover::before {
  width: 100%;
  height: 100%;
}

.theme-toggle:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-border-accent);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.25);
}

.theme-toggle:active {
  transform: translateY(0) rotate(0deg) scale(0.95);
}

.theme-toggle.mobile {
  width: 100%;
  height: auto;
  padding: 1rem;
  justify-content: flex-start;
  border-radius: 12px;
  font-weight: 500;
  margin-bottom: 1rem;
}

.cta-button {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #8B5CF6, #D946EF);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.35);
  white-space: nowrap;
  min-width: fit-content;
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
}

.cta-button:hover::after {
  width: 300px;
  height: 300px;
}

.cta-button:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 40px rgba(139, 92, 246, 0.5);
  background: linear-gradient(135deg, #9333EA, #E879F9);
}

.cta-button:active {
  transform: translateY(-1px) scale(1);
}

.cta-icon {
  width: 18px;
  height: 18px;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.cta-button:hover .cta-icon {
  transform: rotate(-15deg) scale(1.1);
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 12px;
  cursor: pointer;
  padding: 8px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: visible;
  z-index: 1002;
  flex-shrink: 0;
  order: 999;
}

.mobile-toggle::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
}

.mobile-toggle:hover::before {
  width: 100%;
  height: 100%;
}

.mobile-toggle:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-border-accent);
  transform: scale(1.05) rotate(90deg);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.25);
}

.mobile-toggle:active {
  transform: scale(0.95) rotate(90deg);
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background: var(--color-text-primary);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform-origin: center;
  position: relative;
}

.hamburger-line:nth-child(1) {
  margin-bottom: 5px;
  transform-origin: center;
}

.hamburger-line:nth-child(2) {
  margin-bottom: 5px;
  transform-origin: center;
}

.hamburger-line:nth-child(3) {
  transform-origin: center;
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(45deg) translate(3.5px, 3.5px);
  margin-bottom: 0;
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
  transform: scale(0) rotate(180deg);
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(-45deg) translate(3.5px, -3.5px);
}

/* Mobile Navigation */
.mobile-nav {
  top: 70px;
  left: 0;
  right: 0;
  background: var(--color-navbar-bg-scrolled);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--color-border-accent);
  box-shadow: 0 8px 40px rgba(139, 92, 246, 0.15);
  z-index: 1000;
  overflow-y: auto;
  max-height: calc(100vh - 70px);
}

.mobile-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
}

.theme-light .mobile-backdrop {
  background: rgba(0, 0, 0, 0.3);
}

.theme-dark .mobile-backdrop {
  background: rgba(0, 0, 0, 0.6);
}

.mobile-nav-content {
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
  border: 1px solid transparent;
}

.mobile-nav-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--color-accent-primary), var(--color-accent-secondary));
  border-radius: 0 4px 4px 0;
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.mobile-nav-link:hover {
  color: var(--color-text-primary);
  background: var(--color-card-bg);
  border-color: var(--color-border-accent);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
}

.mobile-nav-link:hover::before {
  transform: scaleY(1);
}

.mobile-nav-link.active {
  color: var(--color-accent-primary);
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(217, 70, 239, 0.1));
  border-color: var(--color-border-accent);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.2);
}

.mobile-nav-link.active::before {
  transform: scaleY(1);
}

.mobile-nav-icon {
  width: 20px;
  height: 20px;
  opacity: 0.8;
}

.mobile-nav-actions {
  padding-top: 1rem;
  border-top: 1px solid var(--color-border-primary);
}

.cta-button.mobile {
  width: 100%;
  justify-content: center;
  padding: 1rem 1.25rem;
  font-size: 0.95rem;
}


/* Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-30px);
  filter: blur(10px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-30px);
  filter: blur(10px);
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease, backdrop-filter 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

/* Responsive Design */
@media (max-width: 1343px) {
  .desktop-nav {
    display: none !important;
    visibility: hidden !important;
    width: 0 !important;
    height: 0 !important;
    overflow: hidden !important;
  }
  
  .mobile-toggle {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    width: 44px !important;
    height: 44px !important;
    position: relative !important;
  }
  
  .navbar-brand {
    flex-shrink: 0;
    flex-grow: 0;
  }
  
  .brand-link {
    font-size: 1.25rem;
  }
  
  .mobile-nav {
    top: 60px;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0 0.75rem;
  }
  
  .mobile-nav-content {
    padding: 1.5rem 1rem;
  }
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Prevent layout shift */
.navbar-container {
  min-height: 70px;
}

@media (max-width: 768px) {
  .navbar-container {
    min-height: 60px;
  }
}
</style>
