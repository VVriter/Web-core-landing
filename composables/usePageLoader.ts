import { ref, readonly, onMounted } from 'vue'

export const usePageLoader = () => {
  // TEMPORARY: Set to false to disable loader, true to enable
  const LOADER_ENABLED = false
  
  const isLoading = ref(false)
  const progress = ref(0)
  const loadingMessage = ref('Ініціалізація...')

  const startLoading = (message = 'Завантаження...') => {
    if (!LOADER_ENABLED) return
    isLoading.value = true
    progress.value = 0
    loadingMessage.value = message
  }

  const updateProgress = (newProgress: number, message?: string) => {
    if (!LOADER_ENABLED) return
    progress.value = Math.min(100, Math.max(0, newProgress))
    if (message) {
      loadingMessage.value = message
    }
  }

  const finishLoading = () => {
    if (!LOADER_ENABLED) return
    progress.value = 100
    loadingMessage.value = 'Готово!'
    
    // Small delay before hiding loader
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }

  // Auto-hide loader after mounted (for initial page load)
  onMounted(() => {
    if (!LOADER_ENABLED) return
    
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
