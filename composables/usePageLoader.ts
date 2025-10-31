import { ref, readonly, onMounted } from 'vue'

export const usePageLoader = () => {
  const isLoading = ref(true)
  const progress = ref(0)
  const loadingMessage = ref('Ініціалізація...')

  const startLoading = (message = 'Завантаження...') => {
    isLoading.value = true
    progress.value = 0
    loadingMessage.value = message
  }

  const updateProgress = (newProgress: number, message?: string) => {
    progress.value = Math.min(100, Math.max(0, newProgress))
    if (message) {
      loadingMessage.value = message
    }
  }

  const finishLoading = () => {
    progress.value = 100
    loadingMessage.value = 'Готово!'
    
    // Small delay before hiding loader
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }

  // Auto-hide loader after mounted (for initial page load)
  onMounted(() => {
    // Simulate initial loading
    setTimeout(() => {
      updateProgress(30, 'Завантаження ресурсів...')
    }, 300)
    
    setTimeout(() => {
      updateProgress(70, 'Підготовка інтерфейсу...')
    }, 800)
    
    setTimeout(() => {
      updateProgress(100, 'Майже готово...')
    }, 1200)
    
    setTimeout(() => {
      finishLoading()
    }, 1800)
  })

  return {
    isLoading: readonly(isLoading),
    progress: readonly(progress),
    loadingMessage: readonly(loadingMessage),
    startLoading,
    updateProgress,
    finishLoading
  }
}
