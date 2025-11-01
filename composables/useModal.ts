import { ref } from 'vue'

// Global modal state
const isOpen = ref(false)
const modalType = ref<'contact' | 'order' | null>(null)

export const useModal = () => {
  const openModal = (type: 'contact' | 'order' = 'contact') => {
    modalType.value = type
    isOpen.value = true
    // Prevent body scroll when modal is open
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  }
  
  const closeModal = () => {
    isOpen.value = false
    modalType.value = null
    // Restore body scroll
    if (typeof window !== 'undefined') {
      document.body.style.overflow = ''
    }
  }
  
  return {
    isOpen,
    modalType,
    openModal,
    closeModal
  }
}

