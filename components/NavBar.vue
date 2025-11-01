<template>
  <nav 
    class="navbar"
    :class="{ 'scrolled': isScrolled, 'mobile-open': isMobileMenuOpen }"
  >
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
          Зв'язатися з нами
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
              Зв'язатися з нами
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
  { name: 'Блог', href: '/blog', icon: 'mdi:post' },
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
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border-primary);
  transition: all 0.3s ease;
}

.navbar.scrolled {
  background: var(--color-navbar-bg-scrolled);
  backdrop-filter: blur(20px);
  border-bottom-color: var(--color-border-accent);
  box-shadow: 0 4px 32px var(--color-shadow-color);
}

.navbar-container {
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 70px;
  gap: 2rem;
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
  transition: all 0.3s ease;
}

.brand-link:hover {
  transform: scale(1.05);
}

.brand-logo {
  filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.3));
}

.brand-text {
  background: linear-gradient(135deg, #8B5CF6, #D946EF, #F97316);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
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
  padding: 0.5rem 1rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--color-text-primary);
  background: var(--color-card-bg);
  transform: translateY(-2px);
}

.nav-link.active {
  color: var(--color-accent-primary);
  background: var(--color-card-bg);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: #8B5CF6;
  border-radius: 50%;
}

.nav-icon {
  width: 18px;
  height: 18px;
  opacity: 0.8;
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
  width: 40px;
  height: 40px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 10px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.theme-toggle:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-accent-primary);
  border-color: var(--color-border-accent);
  transform: translateY(-2px);
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
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, #8B5CF6, #D946EF);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
  white-space: nowrap;
  min-width: fit-content;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
  background: linear-gradient(135deg, #9333EA, #E879F9);
}

.cta-button:active {
  transform: translateY(0);
}

.cta-icon {
  width: 18px;
  height: 18px;
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 8px;
  cursor: pointer;
  padding: 8px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.mobile-toggle:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-border-accent);
  transform: scale(1.05);
}

.mobile-toggle:active {
  transform: scale(0.95);
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
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: var(--color-navbar-bg-scrolled);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border-primary);
  z-index: 1000;
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
  padding: 1rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  border-radius: 12px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.mobile-nav-link:hover {
  color: var(--color-text-primary);
  background: var(--color-card-bg);
}

.mobile-nav-link.active {
  color: var(--color-accent-primary);
  background: var(--color-card-bg);
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

/* Mobile Backdrop */
.mobile-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Light theme backdrop */
.theme-light .mobile-backdrop {
  background: rgba(0, 0, 0, 0.3);
}

/* Dark theme backdrop */
.theme-dark .mobile-backdrop {
  background: rgba(0, 0, 0, 0.5);
}

/* Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 1343px) {
  .desktop-nav {
    display: none;
  }
  
  .mobile-toggle {
    display: flex;
  }
  
  .navbar-container {
    display: flex;
    justify-content: space-between;
    padding: 0 1.5rem;
    height: 60px;
    gap: 1rem;
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
