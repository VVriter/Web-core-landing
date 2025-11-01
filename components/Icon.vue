<template>
  <UIcon 
    :name="name"
    :size="computedSize"
    :class="className"
    :style="{ color }"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
  color?: string
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'currentColor',
  className: ''
})

// Convert our size prop to UIcon size format
const computedSize = computed(() => {
  if (typeof props.size === 'number') {
    return props.size
  }
  
  // Map our sizes to UIcon sizes (in pixels)
  const sizeMap: Record<string, number> = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48
  }
  
  return sizeMap[props.size] || sizeMap.md
})
</script>

<style scoped>
/* UIcon handles sizing through its size prop */
/* Custom styling can be added through className prop */
</style>


