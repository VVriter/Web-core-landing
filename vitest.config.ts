import { defineVitestConfig } from '@nuxt/test-utils/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineVitestConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'nuxt'
  },
  resolve: {
    alias: {
      '~': new URL('./app', import.meta.url).pathname,
      '@': new URL('./app', import.meta.url).pathname,
      '~~': new URL('.', import.meta.url).pathname,
      '@@': new URL('.', import.meta.url).pathname
    }
  }
})
