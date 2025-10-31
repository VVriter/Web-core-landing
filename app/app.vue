<template>
  <div>
    <PageLoader 
      :is-loading="isLoading" 
      :progress="progress" 
      :loading-message="loadingMessage" 
    />
    
    <div v-if="!isLoading" class="app-container">
      <NavBar />
      
      <main class="main-content">
        <NuxtRouteAnnouncer />
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
import { usePageLoader } from '../composables/usePageLoader'
import { useTheme } from '../composables/useTheme'
import PageLoader from '../components/PageLoader.vue'
import NavBar from '../components/NavBar.vue'

const { isLoading, progress, loadingMessage } = usePageLoader()

// Initialize theme system
const { currentTheme } = useTheme()
</script>

<style>
/* CSS Custom Properties will be set by useTheme composable */
:root {
  /* Default light theme colors */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-bg-tertiary: #f1f5f9;
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-tertiary: #64748b;
  --color-border-primary: #e2e8f0;
  --color-accent-primary: #8B5CF6;
  --color-accent-secondary: #D946EF;
  --color-accent-tertiary: #F97316;
  --color-shadow-color: rgba(0, 0, 0, 0.1);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Light theme specific backgrounds */
.theme-light body {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
}

/* Dark theme specific backgrounds */
.theme-dark body {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
}

.app-container {
  min-height: 100vh;
  background: var(--color-bg-primary);
  transition: background-color 0.3s ease;
}

.main-content {
  padding-top: 70px; /* Account for fixed navbar */
  min-height: calc(100vh - 70px);
}

@media (max-width: 1343px) {
  .main-content {
    padding-top: 60px; /* Account for smaller mobile navbar */
    min-height: calc(100vh - 60px);
  }
}

/* Global scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #9333EA, #E879F9);
}

/* Selection styling */
::selection {
  background: rgba(139, 92, 246, 0.3);
  color: var(--color-text-primary);
}

::-moz-selection {
  background: rgba(139, 92, 246, 0.3);
  color: var(--color-text-primary);
}

/* Global button styles */
.btn-primary {
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary)) !important;
  color: var(--color-text-inverse) !important;
  border: none;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
}

.btn-secondary {
  background: var(--color-card-bg) !important;
  color: var(--color-text-primary) !important;
  border: 1px solid var(--color-border-primary);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--color-bg-tertiary) !important;
  border-color: var(--color-border-accent);
  transform: translateY(-2px);
}

/* Card styles */
.card {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border-primary);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.card:hover {
  border-color: var(--color-border-accent);
  box-shadow: 0 8px 32px var(--color-shadow-color-hover);
}

/* Text utilities */
.text-primary {
  color: var(--color-text-primary);
}

.text-secondary {
  color: var(--color-text-secondary);
}

.text-tertiary {
  color: var(--color-text-tertiary);
}

.text-muted {
  color: var(--color-text-muted);
}

/* Background utilities */
.bg-primary {
  background: var(--color-bg-primary);
}

.bg-secondary {
  background: var(--color-bg-secondary);
}

.bg-card {
  background: var(--color-card-bg);
}

/* Gradient text utility */
.gradient-text {
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary), var(--color-accent-tertiary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Animation for theme transitions */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}
</style>
