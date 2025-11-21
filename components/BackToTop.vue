<template>
  <Transition name="fade">
    <button
      v-if="showButton"
      @click="scrollToTop"
      class="back-to-top-btn"
      aria-label="Повернутися до верху"
      title="Повернутися до верху"
    >
      <Icon name="mdi:chevron-up" class="icon" />
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Icon from './Icon.vue'

const showButton = ref(false)

const handleScroll = () => {
  showButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Check initial scroll position
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.back-to-top-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 25px rgba(139, 92, 246, 0.4);
  background: linear-gradient(135deg, #9333EA, #E879F9);
}

.back-to-top-btn:active {
  transform: translateY(0) scale(0.95);
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.2s ease;
}

.back-to-top-btn:hover .icon {
  transform: translateY(-1px);
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .back-to-top-btn {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .back-to-top-btn {
    transition: none;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
  
  .back-to-top-btn:hover {
    transform: none;
  }
}
</style>
