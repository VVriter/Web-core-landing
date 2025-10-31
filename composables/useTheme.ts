import { ref, computed, watch, onMounted } from 'vue'

export type Theme = 'light' | 'dark' | 'auto'

const STORAGE_KEY = 'webcore-theme'

// Global reactive state
const selectedTheme = ref<Theme>('light') // Default to light
const systemPrefersDark = ref(false)

// Computed current theme
const currentTheme = computed(() => {
  if (selectedTheme.value === 'auto') {
    return systemPrefersDark.value ? 'dark' : 'light'
  }
  return selectedTheme.value
})

// Theme colors configuration
const themes = {
  light: {
    // Background colors
    'bg-primary': '#ffffff',
    'bg-secondary': '#f8fafc',
    'bg-tertiary': '#f1f5f9',
    'bg-card': '#ffffff',
    'bg-overlay': 'rgba(255, 255, 255, 0.9)',
    
    // Text colors
    'text-primary': '#0f172a',
    'text-secondary': '#475569',
    'text-tertiary': '#64748b',
    'text-muted': '#94a3b8',
    'text-inverse': '#ffffff',
    
    // Border colors
    'border-primary': '#e2e8f0',
    'border-secondary': '#cbd5e1',
    'border-accent': 'rgba(139, 92, 246, 0.2)',
    
    // Accent colors (same for both themes)
    'accent-primary': '#8B5CF6',
    'accent-secondary': '#D946EF',
    'accent-tertiary': '#F97316',
    
    // Status colors
    'success': '#10b981',
    'warning': '#f59e0b',
    'error': '#ef4444',
    'info': '#3b82f6',
    
    // Component specific
    'navbar-bg': 'rgba(255, 255, 255, 0.8)',
    'navbar-bg-scrolled': 'rgba(255, 255, 255, 0.95)',
    'card-bg': 'rgba(255, 255, 255, 0.8)',
    'input-bg': '#ffffff',
    'shadow-color': 'rgba(0, 0, 0, 0.1)',
    'shadow-color-hover': 'rgba(0, 0, 0, 0.15)',
  },
  dark: {
    // Background colors
    'bg-primary': '#0f172a',
    'bg-secondary': '#1e293b',
    'bg-tertiary': '#334155',
    'bg-card': '#1e293b',
    'bg-overlay': 'rgba(15, 23, 42, 0.9)',
    
    // Text colors
    'text-primary': '#ffffff',
    'text-secondary': '#cbd5e1',
    'text-tertiary': '#94a3b8',
    'text-muted': '#64748b',
    'text-inverse': '#0f172a',
    
    // Border colors
    'border-primary': 'rgba(255, 255, 255, 0.1)',
    'border-secondary': 'rgba(255, 255, 255, 0.2)',
    'border-accent': 'rgba(139, 92, 246, 0.3)',
    
    // Accent colors (same for both themes)
    'accent-primary': '#8B5CF6',
    'accent-secondary': '#D946EF',
    'accent-tertiary': '#F97316',
    
    // Status colors
    'success': '#10b981',
    'warning': '#f59e0b',
    'error': '#ef4444',
    'info': '#3b82f6',
    
    // Component specific
    'navbar-bg': 'rgba(15, 23, 42, 0.8)',
    'navbar-bg-scrolled': 'rgba(15, 23, 42, 0.95)',
    'card-bg': 'rgba(255, 255, 255, 0.05)',
    'input-bg': '#334155',
    'shadow-color': 'rgba(0, 0, 0, 0.3)',
    'shadow-color-hover': 'rgba(0, 0, 0, 0.4)',
  }
}

export const useTheme = () => {
  // Initialize theme from localStorage or system preference
  const initializeTheme = () => {
    if (process.client) {
      // Check localStorage first
      const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme
      if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
        selectedTheme.value = savedTheme
      }
      
      // Check system preference
      systemPrefersDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent) => {
        systemPrefersDark.value = e.matches
      }
      
      mediaQuery.addEventListener('change', handleChange)
      
      // Cleanup function
      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }
  }
  
  // Apply theme to document
  const applyTheme = (theme: 'light' | 'dark') => {
    if (process.client) {
      const root = document.documentElement
      const themeColors = themes[theme]
      
      // Apply CSS custom properties
      Object.entries(themeColors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value)
      })
      
      // Add theme class to body
      document.body.className = document.body.className.replace(/theme-\w+/g, '')
      document.body.classList.add(`theme-${theme}`)
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', themeColors['bg-primary'])
      } else {
        const meta = document.createElement('meta')
        meta.name = 'theme-color'
        meta.content = themeColors['bg-primary']
        document.head.appendChild(meta)
      }
    }
  }
  
  // Set theme
  const setTheme = (theme: Theme) => {
    selectedTheme.value = theme
    if (process.client) {
      localStorage.setItem(STORAGE_KEY, theme)
    }
  }
  
  // Toggle between light and dark (ignores auto)
  const toggleTheme = () => {
    if (selectedTheme.value === 'auto') {
      setTheme(systemPrefersDark.value ? 'light' : 'dark')
    } else {
      setTheme(selectedTheme.value === 'light' ? 'dark' : 'light')
    }
  }
  
  // Get theme colors
  const getThemeColors = (theme?: 'light' | 'dark') => {
    const targetTheme = theme || currentTheme.value
    return themes[targetTheme]
  }
  
  // Watch for theme changes and apply them
  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme)
  }, { immediate: true })
  
  // Initialize on mount
  onMounted(() => {
    const cleanup = initializeTheme()
    
    // Cleanup on unmount
    return cleanup
  })
  
  return {
    // State
    selectedTheme: readonly(selectedTheme),
    currentTheme: readonly(currentTheme),
    systemPrefersDark: readonly(systemPrefersDark),
    
    // Methods
    setTheme,
    toggleTheme,
    getThemeColors,
    
    // Theme options
    themes: ['light', 'dark', 'auto'] as const,
    
    // Computed helpers
    isDark: computed(() => currentTheme.value === 'dark'),
    isLight: computed(() => currentTheme.value === 'light'),
    isAuto: computed(() => selectedTheme.value === 'auto')
  }
}

// Export singleton instance for global usage
let themeInstance: ReturnType<typeof useTheme> | null = null

export const getThemeInstance = () => {
  if (!themeInstance) {
    themeInstance = useTheme()
  }
  return themeInstance
}
