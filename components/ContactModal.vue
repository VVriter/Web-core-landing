<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
          <!-- Modal Header -->
          <div class="modal-header">
            <div class="header-content">
              <div class="header-icon-wrapper">
                <Icon 
                  :name="modalType === 'order' ? 'mdi:rocket-launch' : 'mdi:email-fast'" 
                  size="xl" 
                  class="header-icon"
                />
                <div class="icon-glow"></div>
              </div>
              <div class="header-text">
                <h2 class="modal-title">
                  {{ modalType === 'order' ? 'Замовити проект' : 'Зв\'язатися з нами' }}
                </h2>
                <p class="modal-subtitle">
                  {{ modalType === 'order' 
                    ? 'Розкажіть нам про ваш проект, і ми зв\'яжемося з вами найближчим часом' 
                    : 'Надішліть нам повідомлення, і ми відповімо вам протягом 24 годин' }}
                </p>
              </div>
            </div>
            <button class="close-button" @click="closeModal" aria-label="Закрити">
              <Icon name="mdi:close" size="lg" />
            </button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <form @submit.prevent="handleSubmit" class="contact-form">
              <!-- Name Field -->
              <div class="form-group">
                <label for="name" class="form-label">
                  <Icon name="mdi:account" size="md" class="label-icon" />
                  Ім'я <span class="required">*</span>
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  class="form-input"
                  placeholder="Ваше ім'я"
                  required
                  :disabled="isSubmitting"
                />
              </div>

              <!-- Email Field -->
              <div class="form-group">
                <label for="email" class="form-label">
                  <Icon name="mdi:email" size="md" class="label-icon" />
                  Електронна пошта <span class="required">*</span>
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  class="form-input"
                  placeholder="your@email.com"
                  required
                  :disabled="isSubmitting"
                />
              </div>

              <!-- Phone Field -->
              <div class="form-group">
                <label for="phone" class="form-label">
                  <Icon name="mdi:phone" size="md" class="label-icon" />
                  Телефон
                </label>
                <input
                  id="phone"
                  v-model="formData.phone"
                  type="tel"
                  class="form-input"
                  placeholder="+38 (000) 000-00-00"
                  :disabled="isSubmitting"
                />
              </div>

              <!-- Message Field -->
              <div class="form-group">
                <label for="message" class="form-label">
                  <Icon name="mdi:message-text" size="md" class="label-icon" />
                  Повідомлення <span class="required">*</span>
                </label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  class="form-textarea"
                  rows="5"
                  :placeholder="modalType === 'order' 
                    ? 'Опишіть ваш проект, терміни та особливі вимоги...' 
                    : 'Ваше повідомлення...'"
                  required
                  :disabled="isSubmitting"
                ></textarea>
              </div>

              <!-- Success/Error Messages -->
              <Transition name="message">
                <div v-if="message.text" :class="['message', message.type]">
                  <Icon 
                    :name="message.type === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'" 
                    size="md" 
                    class="message-icon"
                  />
                  {{ message.text }}
                </div>
              </Transition>

              <!-- Submit Button -->
              <button 
                type="submit" 
                class="submit-button"
                :disabled="isSubmitting || !isFormValid"
              >
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
                {{ isSubmitting ? 'Відправляємо...' : (modalType === 'order' ? 'Відправити заявку' : 'Надіслати повідомлення') }}
                <span class="button-shine"></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Icon from './Icon.vue'
import { useFormSubmit } from '../composables/useFormSubmit'
import { useModal } from '../composables/useModal'

const { isOpen, modalType, closeModal } = useModal()
const { submitForm } = useFormSubmit()

// Form data
const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const isSubmitting = ref(false)
const message = ref<{ type: 'success' | 'error' | null, text: string }>({ type: null, text: '' })

// Form validation
const isFormValid = computed(() => {
  return formData.value.name.trim() !== '' &&
         formData.value.email.trim() !== '' &&
         formData.value.message.trim() !== ''
})

// Reset form when modal closes
watch(isOpen, (newValue) => {
  if (!newValue) {
    formData.value = {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
    message.value = { type: null, text: '' }
  }
})

// Handle form submission
const handleSubmit = async () => {
  if (!isFormValid.value || isSubmitting.value) return

  isSubmitting.value = true
  message.value = { type: null, text: '' }

  try {
    const subject = modalType.value === 'order' 
      ? 'Нова заявка на проект - WebCore'
      : 'Нове повідомлення з сайту - WebCore'

    const result = await submitForm({
      name: formData.value.name,
      email: formData.value.email,
      phone: formData.value.phone || undefined,
      message: formData.value.message,
      subject
    })

    if (result.success) {
      message.value = { type: 'success', text: result.message || 'Повідомлення успішно відправлено!' }
      
      // Reset form after success
      formData.value = {
        name: '',
        email: '',
        phone: '',
        message: ''
      }

      // Close modal after 2 seconds
      setTimeout(() => {
        closeModal()
      }, 2000)
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

// Close modal with ESC key
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeModal()
  }
}

// Add event listener for ESC key
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleEscape)
}
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  animation: overlayFadeIn 0.3s ease;
}

.modal-container {
  background: var(--color-card-bg);
  border-radius: 24px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);
  border: 1px solid var(--color-border-primary);
  position: relative;
  animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Modal Header */
.modal-header {
  padding: 2rem;
  border-bottom: 1px solid var(--color-border-primary);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  background: linear-gradient(135deg, var(--color-bg-secondary), var(--color-card-bg));
  border-radius: 24px 24px 0 0;
}

.header-content {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  flex: 1;
}

.header-icon-wrapper {
  position: relative;
  flex-shrink: 0;
}

.header-icon {
  color: var(--color-accent-primary);
  position: relative;
  z-index: 2;
  animation: iconFloat 3s ease-in-out infinite;
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, var(--color-accent-primary), transparent 70%);
  opacity: 0.3;
  border-radius: 50%;
  animation: glowPulse 3s ease-in-out infinite;
  z-index: 1;
}

.header-text {
  flex: 1;
}

.modal-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.modal-subtitle {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.6;
}

.close-button {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--color-border-primary);
  background: var(--color-bg-primary);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.close-button:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-accent-primary);
  border-color: var(--color-border-accent);
  transform: rotate(90deg);
}

/* Modal Body */
.modal-body {
  padding: 2rem;
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
  min-height: 120px;
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

/* Submit Button */
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

/* Animations */
@keyframes overlayFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive Design */
@media (max-width: 640px) {
  .modal-container {
    max-height: 95vh;
    border-radius: 20px;
  }

  .modal-header {
    padding: 1.5rem;
    flex-direction: column;
    gap: 1rem;
  }

  .header-content {
    gap: 1rem;
  }

  .modal-title {
    font-size: 1.5rem;
  }

  .modal-subtitle {
    font-size: 0.875rem;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .contact-form {
    gap: 1.25rem;
  }

  .submit-button {
    padding: 0.875rem 1.5rem;
    font-size: 0.95rem;
  }
}
</style>

