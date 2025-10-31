<template>
  <Transition name="loader" appear>
    <div v-if="isLoading" class="page-loader">
      <div class="loader-container">
        <WebCoreLogo 
          :animated="true" 
          :size="120"
          class="loader-logo"
        />
        <div class="loading-text">
          <h2 class="brand-name">WebCore</h2>
          <div class="loading-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <p class="loading-message">{{ loadingMessage }}</p>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import WebCoreLogo from '../components/WebCoreLogo.vue'
import { useTheme } from '../composables/useTheme'

interface Props {
  isLoading?: boolean
  progress?: number
  loadingMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: true,
  progress: 0,
  loadingMessage: 'Завантаження...'
})

// Auto-increment progress for demo purposes
const progress = ref(props.progress)
const loadingMessages = [
  'Ініціалізація...',
  'Завантаження ресурсів...',
  'Підготовка інтерфейсу...',
  'Майже готово...'
]

const currentMessageIndex = ref(0)
const loadingMessage = ref(props.loadingMessage)

// Initialize theme system
const { currentTheme } = useTheme()

onMounted(() => {
  // Simulate loading progress
  const progressInterval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += Math.random() * 10
      if (progress.value > 100) progress.value = 100
      
      // Update message based on progress
      const messageIndex = Math.floor((progress.value / 100) * loadingMessages.length)
      if (messageIndex < loadingMessages.length && messageIndex !== currentMessageIndex.value) {
        currentMessageIndex.value = messageIndex
        loadingMessage.value = loadingMessages[messageIndex]
      }
    } else {
      clearInterval(progressInterval)
    }
  }, 200)
  
  // Cleanup
  onUnmounted(() => {
    clearInterval(progressInterval)
  })
})
</script>

<style scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--color-bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(10px);
}

/* Light theme specific background */
.theme-light .page-loader {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
}

/* Dark theme specific background */
.theme-dark .page-loader {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
}

.loader-container {
  text-align: center;
  max-width: 400px;
  padding: 2rem;
}

.loader-logo {
  margin-bottom: 2rem;
  filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.3));
  transition: filter 0.3s ease;
}

/* Light theme logo styling */
.theme-light .loader-logo {
  filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.4));
}

/* Dark theme logo styling */
.theme-dark .loader-logo {
  filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.3));
}

.loading-text {
  margin-bottom: 2rem;
}

.brand-name {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #8B5CF6, #D946EF, #F97316);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.dot {
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  border-radius: 50%;
  animation: dotPulse 1.5s ease-in-out infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

.loading-message {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  min-height: 1.5rem;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: var(--color-border-primary);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 2rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary), var(--color-accent-tertiary));
  border-radius: 2px;
  transition: width 0.3s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite;
}

/* Animations */
@keyframes dotPulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Transition animations */
.loader-enter-active {
  transition: all 0.5s ease;
}

.loader-leave-active {
  transition: all 0.8s ease;
}

.loader-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.loader-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

/* Responsive */
@media (max-width: 640px) {
  .loader-container {
    padding: 1rem;
    max-width: 300px;
  }
  
  .brand-name {
    font-size: 2rem;
  }
  
  .loading-message {
    font-size: 1rem;
  }
}
</style>
