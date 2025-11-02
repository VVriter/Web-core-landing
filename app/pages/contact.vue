<template>
  <div class="contact-page">
    <section class="contact-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Контакти</h1>
          <p class="hero-description">
            Готові розпочати проект? Зв'яжіться з нами для обговорення деталей
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
                  <a href="tel:+380441234567" class="contact-item-value">+38 (044) 123-45-67</a>
                </div>
              </div>
              
              <div class="contact-item">
                <Icon name="mdi:map-marker" class="contact-icon" />
                <div class="contact-item-content">
                  <h3 class="contact-item-title">Адреса</h3>
                  <p class="contact-item-value">Київ, Україна</p>
                </div>
              </div>
            </div>
          </div>

          <div class="contact-form-wrapper">
            <form class="contact-form" @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="name">Ім'я</label>
                <input 
                  id="name"
                  v-model="form.name"
                  type="text" 
                  required 
                  placeholder="Ваше ім'я"
                />
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  id="email"
                  v-model="form.email"
                  type="email" 
                  required 
                  placeholder="your@email.com"
                />
              </div>
              
              <div class="form-group">
                <label for="message">Повідомлення</label>
                <textarea 
                  id="message"
                  v-model="form.message"
                  required 
                  rows="6"
                  placeholder="Опишіть ваш проект..."
                ></textarea>
              </div>
              
              <button type="submit" class="submit-button" :disabled="isSubmitting">
                <span v-if="!isSubmitting">Відправити</span>
                <span v-else>Відправка...</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../../components/Icon.vue'

// @ts-ignore
useHead({
  title: 'Контакти - WebCore',
  meta: [
    { name: 'description', content: 'Зв\'яжіться з нами для обговорення вашого проекту' }
  ]
})

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  setTimeout(() => {
    alert('Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.')
    form.value = { name: '', email: '', message: '' }
    isSubmitting.value = false
  }, 1000)
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
  padding-top: 70px;
}

.contact-hero {
  padding: 4rem 0;
  background: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-primary);
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #8B5CF6, #D946EF);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
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

.contact-form-wrapper {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 20px;
  padding: 2.5rem;
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

.form-group label {
  font-weight: 500;
  color: var(--color-text-primary);
}

.form-group input,
.form-group textarea {
  padding: 0.75rem 1rem;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: 12px;
  color: var(--color-text-primary);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-button {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #8B5CF6, #D946EF);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
  background: linear-gradient(135deg, #9333EA, #E879F9);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 1343px) {
  .contact-hero {
    padding: 3rem 0;
  }

  .hero-title {
    font-size: 2.5rem;
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
    padding: 2rem 0;
  }

  .hero-title {
    font-size: 2rem;
  }

  .contact-form-wrapper {
    padding: 1.5rem;
  }

  .contact-item {
    gap: 1rem;
  }
}
</style>
