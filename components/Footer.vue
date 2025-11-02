<template>
  <footer class="footer">
    <!-- Main Footer Content -->
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand Section -->
          <div class="footer-brand">
            <div class="brand-logo">
              <WebCoreLogo :animated="true" :size="60" animation-type="static" />
              <h3 class="brand-name">WebCore</h3>
            </div>
            <p class="brand-description">
              Ми створюємо сучасні веб-рішення, що допомагають вашому бізнесу процвітати в цифровому світі. 
              Від ідеї до реалізації - ваш успіх наша місія.
            </p>
            <div class="social-links">
              <a 
                v-for="social in socialLinks" 
                :key="social.name"
                :href="social.url" 
                :title="social.name"
                class="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon :name="social.icon" size="lg" />
              </a>
            </div>
          </div>

          <!-- Services -->
          <div class="footer-section">
            <h4 class="section-title">Послуги</h4>
            <ul class="footer-links">
              <li><NuxtLink to="/services/web-development">Веб-розробка</NuxtLink></li>
              <li><NuxtLink to="/services/mobile-apps">Мобільні додатки</NuxtLink></li>
              <li><NuxtLink to="/services/ui-ux-design">UI/UX Дизайн</NuxtLink></li>
              <li><NuxtLink to="/services/ecommerce">E-commerce</NuxtLink></li>
              <li><NuxtLink to="/services/seo">SEO Оптимізація</NuxtLink></li>
              <li><NuxtLink to="/services/maintenance">Підтримка сайтів</NuxtLink></li>
            </ul>
          </div>

          <!-- Company -->
          <div class="footer-section">
            <h4 class="section-title">Компанія</h4>
            <ul class="footer-links">
              <li><NuxtLink to="/about">Про нас</NuxtLink></li>
              <li><NuxtLink to="/team">Наша команда</NuxtLink></li>
              <li><NuxtLink to="/careers">Кар'єра</NuxtLink></li>
              <li><NuxtLink to="/blog">Блог</NuxtLink></li>
              <li><NuxtLink to="/case-studies">Кейси</NuxtLink></li>
              <li><NuxtLink to="/testimonials">Відгуки</NuxtLink></li>
            </ul>
          </div>

          <!-- Resources -->
          <div class="footer-section">
            <h4 class="section-title">Ресурси</h4>
            <ul class="footer-links">
              <li><NuxtLink to="/documentation">Документація</NuxtLink></li>
              <li><NuxtLink to="/help-center">Центр допомоги</NuxtLink></li>
              <li><NuxtLink to="/privacy">Політика конфіденційності</NuxtLink></li>
              <li><NuxtLink to="/terms">Умови використання</NuxtLink></li>
              <li><NuxtLink to="/cookies">Політика cookies</NuxtLink></li>
              <li><NuxtLink to="/sitemap">Карта сайту</NuxtLink></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="footer-section">
            <h4 class="section-title">Контакти</h4>
            <div class="contact-info">
              <div class="contact-item">
                <Icon name="mdi:map-marker" class="contact-icon" />
                <div>
                  <p>м. Київ</p>
                </div>
              </div>
              <div class="contact-item">
                <Icon name="mdi:phone" class="contact-icon" />
                <div>
                  <p>+380777707232</p>
                </div>
              </div>
              <div class="contact-item">
                <Icon name="mdi:whatsapp" class="contact-icon" />
                <div>
                  <a href="https://wa.me/380777707232" target="_blank" rel="noopener" class="messenger-link">
                    WhatsApp: +380777707232
                  </a>
                </div>
              </div>
              <div class="contact-item">
                <Icon name="simple-icons:viber" class="contact-icon" />
                <div>
                  <a href="viber://chat?number=+380777707232" target="_blank" rel="noopener" class="messenger-link">
                    Viber: +380777707232
                  </a>
                </div>
              </div>
              <div class="contact-item">
                <Icon name="mdi:email" class="contact-icon" />
                <div>
                  <p>support@web-core.agency</p>
                </div>
              </div>
              <div class="contact-item">
                <Icon name="mdi:clock" class="contact-icon" />
                <div>
                  <p>Пн-Пт: 9:00 - 18:00</p>
                  <p>Сб-Нд: за домовленістю</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Newsletter Section -->
        <div class="newsletter-section">
          <div class="newsletter-content">
            <div class="newsletter-text">
              <h3>Підпишіться на наші новини</h3>
              <p>Отримуйте останні новини про веб-технології, корисні поради та ексклюзивні пропозиції</p>
            </div>
            <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
              <div class="form-group">
                <input 
                  type="email" 
                  v-model="email"
                  placeholder="Ваша електронна пошта"
                  class="newsletter-input"
                  required
                />
                <button type="submit" class="newsletter-button" :disabled="isSubscribing">
                  <Icon name="mdi:send" v-if="!isSubscribing" />
                  <Icon name="mdi:loading" v-else class="spinning" />
                  {{ isSubscribing ? 'Підписуємо...' : 'Підписатися' }}
                </button>
              </div>
              <p class="newsletter-disclaimer">
                Підписуючись, ви погоджуєтесь з нашою 
                <NuxtLink to="/privacy">політикою конфіденційності</NuxtLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-content">
          <div class="copyright">
            <p>&copy; {{ currentYear }} WebCore. Всі права захищені.</p>
          </div>
          <div class="footer-bottom-links">
            <NuxtLink to="/privacy">Конфіденційність</NuxtLink>
            <NuxtLink to="/terms">Умови</NuxtLink>
            <NuxtLink to="/cookies">Cookies</NuxtLink>
            <button @click="toggleTheme" class="theme-toggle-footer">
              <Icon :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" />
              {{ isDark ? 'Світла тема' : 'Темна тема' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import WebCoreLogo from './WebCoreLogo.vue'
import Icon from './Icon.vue'
import { useTheme } from '../composables/useTheme'

// Theme system
const { isDark, toggleTheme } = useTheme()

// Current year for copyright
const currentYear = computed(() => new Date().getFullYear())

// Newsletter functionality
const email = ref('')
const isSubscribing = ref(false)

const subscribeNewsletter = async () => {
  if (!email.value) return
  
  isSubscribing.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Success feedback
    alert('Дякуємо за підписку! Перевірте вашу пошту.')
    email.value = ''
  } catch (error) {
    alert('Помилка підписки. Спробуйте пізніше.')
  } finally {
    isSubscribing.value = false
  }
}

// Social media links
const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/1bUuB7xrEv/?mibextid=wwXIfr',
    icon: 'mdi:facebook'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/web_core_studio?igsh=MTF3bTYwNmExcXg2ag%3D%3D&utm_source=qr',
    icon: 'mdi:instagram'
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/380777707232',
    icon: 'mdi:whatsapp'
  },
  {
    name: 'Viber',
    url: 'viber://chat?number=+380777707232',
    icon: 'simple-icons:viber'
  }
]
</script>

<style scoped>
.footer {
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border-primary);
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Main Footer */
.footer-main {
  padding: 4rem 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

/* Brand Section */
.footer-brand {
  max-width: 350px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.brand-name {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.brand-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 12px;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.social-link:hover {
  background: var(--color-accent-primary);
  border-color: var(--color-accent-primary);
  color: white;
  transform: translateY(-2px);
}

/* Footer Sections */
.footer-section {
  min-width: 0;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.footer-links a:hover {
  color: var(--color-accent-primary);
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.contact-icon {
  color: var(--color-accent-primary);
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.contact-item p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  line-height: 1.4;
}

.messenger-link {
  color: var(--color-text-primary) !important;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.messenger-link:hover {
  color: var(--color-accent-primary) !important;
}

/* Спеціальні стилі для іконок месенджерів */
.contact-item .contact-icon[name*="whatsapp"] {
  color: #25D366;
}

.contact-item .contact-icon[name*="viber"],
.contact-item .contact-icon[name*="simple-icons:viber"] {
  color: #7360F2;
}

/* Стилі для соціальних іконок */
.social-link[title="Viber"] .contact-icon,
.social-link[title="Viber"] svg {
  color: #7360F2 !important;
}

/* Альтернативний Viber стиль якщо іконка не відображається */
.viber-icon-fallback {
  background: #7360F2;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

/* Newsletter Section */
.newsletter-section {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 16px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
}

.newsletter-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.newsletter-text h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
}

.newsletter-text p {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.newsletter-form {
  max-width: 400px;
}

.form-group {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.newsletter-input {
  flex: 1;
  padding: 0.875rem 1rem;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: 8px;
  color: var(--color-text-primary);
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.newsletter-input:focus {
  outline: none;
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.newsletter-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.newsletter-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
}

.newsletter-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.newsletter-disclaimer {
  font-size: 0.875rem;
  color: var(--color-text-tertiary);
  margin: 0;
}

.newsletter-disclaimer a {
  color: var(--color-accent-primary);
  text-decoration: none;
}

.newsletter-disclaimer a:hover {
  text-decoration: underline;
}

/* Footer Bottom */
.footer-bottom {
  background: var(--color-bg-tertiary);
  border-top: 1px solid var(--color-border-primary);
  padding: 1.5rem 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.copyright p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.footer-bottom-links a {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-bottom-links a:hover {
  color: var(--color-accent-primary);
}

.theme-toggle-footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 6px;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-toggle-footer:hover {
  background: var(--color-bg-primary);
  color: var(--color-accent-primary);
  border-color: var(--color-border-accent);
}

/* Animations */
.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
  }
  
  .footer-brand {
    grid-column: 1 / -1;
    max-width: none;
    margin-bottom: 1rem;
  }
  
  .newsletter-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .footer-main {
    padding: 3rem 0 1.5rem;
  }
  
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .newsletter-section {
    padding: 2rem 1.5rem;
  }
  
  .form-group {
    flex-direction: column;
  }
  
  .newsletter-button {
    justify-content: center;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .footer-bottom-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .newsletter-section {
    padding: 1.5rem 1rem;
  }
  
  .contact-info {
    gap: 1rem;
  }
}
</style>
