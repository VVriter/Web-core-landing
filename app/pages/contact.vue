<template>
  <div class="contact-page">
    <section class="contact-hero">
      <div class="hero-background">
        <div class="floating-particles">
          <div 
            v-for="i in 12" 
            :key="i" 
            class="particle" 
            :style="getParticleStyle(i)"
          ></div>
        </div>
        <div class="gradient-orb gradient-orb-1"></div>
        <div class="gradient-orb gradient-orb-2"></div>
      </div>
      
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <Icon name="mdi:phone-in-talk" class="badge-icon" />
            Зв'яжіться з нами
          </div>
          <h1 class="hero-title">
            Готові розпочати <span class="gradient-text">проект</span>?
          </h1>
          <p class="hero-description">
            Зв'яжіться з нами для обговорення деталей вашого проекту. 
            Ми відповімо протягом 24 годин та надамо безкоштовну консультацію.
          </p>
        </div>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <div class="contact-wrapper">
          <div class="contact-info">
            <h2 class="section-title">Зв'яжіться з нами</h2>
            <p class="section-description">
              Ми завжди раді новим проєктам та можливостям співпраці
            </p>
            
            <div class="contact-items">
              <div class="contact-item">
                <Icon name="mdi:email" class="contact-icon" />
                <div class="contact-item-content">
                  <h3 class="contact-item-title">Email</h3>
                  <a href="mailto:support@web-core.agency" class="contact-item-value">support@web-core.agency</a>
                </div>
              </div>
              
              <div class="contact-item">
                <Icon name="mdi:phone" class="contact-icon" />
                <div class="contact-item-content">
                  <h3 class="contact-item-title">Телефон</h3>
                  <a href="tel:+380777707232" class="contact-item-value">+380 (77) 770 7232</a>
                </div>
              </div>
              
              <div class="contact-item">
                <Icon name="mdi:whatsapp" class="contact-icon" />
                <div class="contact-item-content">
                  <h3 class="contact-item-title">WhatsApp</h3>
                  <a href="https://wa.me/380777707232" target="_blank" rel="noopener" class="contact-item-value messenger-link">+380 (77) 770 7232</a>
                </div>
              </div>
              
              <div class="contact-item">
                <Icon name="mdi:send" class="contact-icon" />
                <div class="contact-item-content">
                  <h3 class="contact-item-title">Telegram</h3>
                  <a href="https://t.me/Web_Core_Agency" target="_blank" rel="noopener" class="contact-item-value messenger-link">@Web_Core_Agency</a>
                </div>
              </div>
              
              <div class="contact-item">
                <Icon name="mdi:map-marker" class="contact-icon" />
                <div class="contact-item-content">
                  <h3 class="contact-item-title">Адреса</h3>
                  <p class="contact-item-value">м. Київ, Україна</p>
                </div>
              </div>
              
              <div class="contact-item">
                <Icon name="mdi:clock" class="contact-icon" />
                <div class="contact-item-content">
                  <h3 class="contact-item-title">Години роботи</h3>
                  <p class="contact-item-value">Пн-Пт: 9:00 - 18:00<br>Сб-Нд: за домовленістю</p>
                </div>
              </div>
            </div>
          </div>

          <div class="contact-form-wrapper">
            <!-- Success State -->
            <Transition name="success-view">
              <div v-if="isSuccess" class="success-view">
                <div class="success-icon-wrapper">
                  <Icon name="mdi:check-circle" size="4xl" class="success-icon" />
                  <div class="success-pulse"></div>
                </div>
                <h3 class="success-title">Дякуємо за заявку!</h3>
                <p class="success-message">
                  Ми отримали ваше повідомлення та зв'яжемося з вами найближчим часом.
                </p>
                <p class="success-hint">Зазвичай ми відповідаємо протягом 2-4 годин у робочий час</p>
                <button type="button" class="success-button" @click="resetForm">
                  <Icon name="mdi:plus" size="md" />
                  Надіслати ще одне повідомлення
                </button>
              </div>
            </Transition>

            <template v-if="!isSuccess">
              <div class="form-header">
                <h3 class="form-title">Напишіть нам</h3>
                <p class="form-description">Заповніть форму і ми зв'яжемося з вами найближчим часом</p>
              </div>

              <form class="contact-form" @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="name" class="form-label">
                  <Icon name="mdi:account" size="md" class="label-icon" />
                  Ім'я <span class="required">*</span>
                </label>
                <input 
                  id="name"
                  v-model="form.name"
                  type="text" 
                  class="form-input"
                  required 
                  placeholder="Ваше ім'я"
                  :disabled="isSubmitting"
                />
              </div>
              
              <div class="form-group">
                <label for="phone" class="form-label">
                  <Icon name="mdi:phone" size="md" class="label-icon" />
                  Телефон <span class="required">*</span>
                </label>
                <input
                  id="phone"
                  :value="phoneMask.phone.value"
                  type="tel"
                  class="form-input"
                  placeholder="+38 (0XX) XXX XX XX"
                  required
                  :disabled="isSubmitting"
                  @input="phoneMask.handlePhoneInput"
                  @focus="phoneMask.handlePhoneFocus"
                  @blur="phoneMask.handlePhoneBlur"
                  @keydown="phoneMask.handlePhoneKeydown"
                />
              </div>

              <div class="form-group">
                <label for="email" class="form-label">
                  <Icon name="mdi:email" size="md" class="label-icon" />
                  Електронна пошта
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  placeholder="your@email.com"
                  :disabled="isSubmitting"
                />
              </div>
              
              <div class="form-group">
                <label for="message" class="form-label">
                  <Icon name="mdi:lightbulb" size="md" class="label-icon" />
                  Розкажіть про ваш проєкт
                </label>
                <span class="form-hint">Опишіть ідею, тип сайту чи застосунку, бажані функції</span>
                <textarea
                  id="message"
                  v-model="form.message"
                  class="form-textarea"
                  rows="6"
                  placeholder="Наприклад: Потрібен інтернет-магазин для продажу одягу з інтеграцією оплати та доставки..."
                  :disabled="isSubmitting"
                ></textarea>
              </div>
              
              <!-- Success/Error Messages -->
              <div v-if="message.text" :class="['message', message.type]">
                <Icon 
                  :name="message.type === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'" 
                  size="md" 
                  class="message-icon"
                />
                {{ message.text }}
              </div>
              
              <button type="submit" class="submit-button" :disabled="isSubmitting || !isFormValid">
                <Icon 
                  v-if="!isSubmitting" 
                  name="mdi:send" 
                  size="md" 
                  class="submit-icon"
                />
                <Icon 
                  v-else 
                  name="mdi:loading" 
                  size="md" 
                  class="submit-icon spinning"
                />
                {{ isSubmitting ? 'Відправляємо...' : 'Надіслати повідомлення' }}
                <span class="button-shine"></span>
              </button>
            </form>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Icon from '../../components/Icon.vue'
import { useFormSubmit } from '../../composables/useFormSubmit'
import { usePhoneMask } from '../../composables/usePhoneMask'

// @ts-ignore
useHead({
  title: 'Контакти - WebCore',
  meta: [
    { name: 'description', content: 'Зв\'яжіться з нами для обговорення вашого проекту' }
  ]
})

const { submitForm } = useFormSubmit()
const phoneMask = usePhoneMask()

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)
const message = ref<{ type: 'success' | 'error' | null, text: string }>({ type: null, text: '' })

// Form validation
const isFormValid = computed(() => {
  return form.value.name.trim() !== '' &&
         phoneMask.isValid.value
})

// Reset to form view
const resetForm = () => {
  isSuccess.value = false
  message.value = { type: null, text: '' }
}

const handleSubmit = async () => {
  if (!isFormValid.value || isSubmitting.value) return

  isSubmitting.value = true
  message.value = { type: null, text: '' }

  try {
    const result = await submitForm({
      name: form.value.name,
      email: form.value.email || undefined,
      phone: phoneMask.getCleanPhone(),
      message: form.value.message,
      subject: 'Нове повідомлення з сторінки контактів - WebCore'
    })

    if (result.success) {
      // Show success view
      isSuccess.value = true

      // Reset form after success
      form.value = {
        name: '',
        email: '',
        message: ''
      }
      phoneMask.phone.value = ''
    } else {
      message.value = { type: 'error', text: result.message || 'Помилка відправки повідомлення' }
    }
  } catch (error) {
    message.value = {
      type: 'error',
      text: error instanceof Error ? error.message : 'Помилка відправки повідомлення'
    }
  } finally {
    isSubmitting.value = false
  }
}

// Generate random particle styles
const getParticleStyle = (index: number) => {
  const size = Math.random() * 6 + 3
  const left = Math.random() * 100
  const animationDuration = Math.random() * 15 + 20
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
}

.contact-page {
  min-height: 100vh;
}

.contact-hero {
  padding: 8rem 0 6rem;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-primary);
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  border-radius: 50%;
  opacity: 0.6;
  animation: particleFloat linear infinite;
}

@keyframes particleFloat {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: gradientFloat 25s ease-in-out infinite;
}

.gradient-orb-1 {
  width: 350px;
  height: 350px;
  background: linear-gradient(45deg, var(--color-accent-primary), var(--color-accent-secondary));
  top: 15%;
  left: 15%;
  animation-delay: 0s;
}

.gradient-orb-2 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, var(--color-accent-secondary), var(--color-accent-tertiary));
  top: 50%;
  right: 20%;
  animation-delay: -10s;
}

@keyframes gradientFloat {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

.hero-content {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.hero-badge {
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
}

.badge-icon {
  color: var(--color-accent-tertiary);
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

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.1;
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary), var(--color-accent-tertiary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-text-tertiary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-content {
  padding: 4rem 0;
  background: var(--color-bg-secondary);
}

.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-item {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.contact-icon {
  width: 48px;
  height: 48px;
  color: var(--color-accent-primary);
  flex-shrink: 0;
}

.contact-icon :deep(svg) {
  width: 48px;
  height: 48px;
}

.contact-item-content {
  flex: 1;
}

.contact-item-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.contact-item-value {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-item-value:hover {
  color: var(--color-accent-primary);
}

.messenger-link {
  color: var(--color-text-primary) !important;
  text-decoration: none;
  transition: color 0.3s ease;
}

.messenger-link:hover {
  color: var(--color-accent-primary) !important;
}

.whatsapp-icon {
  color: #25D366 !important;
}


.contact-form-wrapper {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 24px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.form-header {
  margin-bottom: 2rem;
  text-align: center;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.form-description {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.label-icon {
  color: var(--color-accent-primary);
}

.required {
  color: var(--color-accent-secondary);
}

.form-hint {
  font-size: 0.8rem;
  color: var(--color-text-tertiary);
  margin-top: -0.25rem;
}

.form-input,
.form-textarea {
  padding: 0.875rem 1rem;
  background: var(--color-bg-primary);
  border: 2px solid var(--color-border-primary);
  border-radius: 12px;
  color: var(--color-text-primary);
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.3s ease;
  width: 100%;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
  background: var(--color-card-bg);
}

.form-input:disabled,
.form-textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-textarea {
  resize: vertical;
  min-height: 140px;
}

/* Message */
.message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
}

.message.success {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.message.error {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.message-icon {
  flex-shrink: 0;
}

.submit-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  margin-top: 0.5rem;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.button-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.submit-button:hover:not(:disabled) .button-shine {
  left: 100%;
}

.submit-icon {
  flex-shrink: 0;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Success View */
.success-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 1.5rem;
}

.success-icon-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}

.success-icon {
  color: #10b981;
  position: relative;
  z-index: 2;
  animation: successBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.success-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.3), transparent 70%);
  border-radius: 50%;
  animation: successPulse 2s ease-in-out infinite;
}

.success-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #10b981, #059669);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.success-message {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  margin: 0 0 0.5rem 0;
  line-height: 1.6;
  max-width: 400px;
}

.success-hint {
  font-size: 0.9rem;
  color: var(--color-text-tertiary);
  margin: 0 0 2rem 0;
}

.success-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.success-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

@keyframes successBounce {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes successPulse {
  0%, 100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

.success-view-enter-active,
.success-view-leave-active {
  transition: all 0.4s ease;
}

.success-view-enter-from,
.success-view-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@media (max-width: 1343px) {
  .contact-hero {
    padding: 6rem 0 4rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.125rem;
  }

  .hero-stats {
    gap: 2rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .gradient-orb-1 {
    width: 250px;
    height: 250px;
    filter: blur(60px);
  }

  .gradient-orb-2 {
    width: 180px;
    height: 180px;
    filter: blur(60px);
  }

  .contact-content {
    padding: 3rem 0;
  }

  .contact-wrapper {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 480px) {
  .contact-hero {
    padding: 4rem 0 3rem;
  }

  .hero-badge {
    font-size: 0.8rem;
    padding: 0.4rem 1rem;
    margin-bottom: 1rem;
  }

  .hero-title {
    font-size: 2rem;
    line-height: 1.2;
  }

  .hero-description {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .stat-number {
    font-size: 1.75rem;
  }

  .stat-label {
    font-size: 0.8rem;
  }

  .gradient-orb-1 {
    width: 200px;
    height: 200px;
    filter: blur(40px);
    opacity: 0.2;
  }

  .gradient-orb-2 {
    width: 150px;
    height: 150px;
    filter: blur(40px);
    opacity: 0.2;
  }

  .floating-particles {
    opacity: 0.3;
  }

  .contact-form-wrapper {
    padding: 1.5rem;
    border-radius: 20px;
  }

  .form-header {
    margin-bottom: 1.5rem;
  }

  .form-title {
    font-size: 1.25rem;
  }

  .form-description {
    font-size: 0.875rem;
  }

  .contact-form {
    gap: 1.25rem;
  }

  .submit-button {
    padding: 0.875rem 1.5rem;
    font-size: 0.95rem;
  }

  .contact-item {
    gap: 1rem;
  }
}
</style>
