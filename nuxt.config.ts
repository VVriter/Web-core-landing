// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' }
      ],
      script: [
        {
          innerHTML: `
            (function() {
              try {
                const theme = localStorage.getItem('webcore-theme') || 'light';
                const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                
                const themes = {
                  light: {
                    'bg-primary': '#ffffff',
                    'bg-secondary': '#f8fafc',
                    'bg-tertiary': '#f1f5f9',
                    'bg-card': '#ffffff',
                    'text-primary': '#0f172a',
                    'text-secondary': '#475569',
                    'text-tertiary': '#64748b',
                    'border-primary': '#e2e8f0',
                    'accent-primary': '#8B5CF6',
                    'accent-secondary': '#D946EF',
                    'accent-tertiary': '#F97316',
                    'shadow-color': 'rgba(0, 0, 0, 0.1)',
                    'card-bg': '#ffffff',
                    'shadow-color-hover': 'rgba(0, 0, 0, 0.15)',
                    'border-accent': 'rgba(139, 92, 246, 0.2)'
                  },
                  dark: {
                    'bg-primary': '#0f172a',
                    'bg-secondary': '#1e293b',
                    'bg-tertiary': '#334155',
                    'bg-card': '#1e293b',
                    'text-primary': '#ffffff',
                    'text-secondary': '#cbd5e1',
                    'text-tertiary': '#94a3b8',
                    'border-primary': 'rgba(255, 255, 255, 0.1)',
                    'accent-primary': '#8B5CF6',
                    'accent-secondary': '#D946EF',
                    'accent-tertiary': '#F97316',
                    'shadow-color': 'rgba(0, 0, 0, 0.3)',
                    'card-bg': 'rgba(255, 255, 255, 0.05)',
                    'shadow-color-hover': 'rgba(0, 0, 0, 0.4)',
                    'border-accent': 'rgba(139, 92, 246, 0.3)'
                  }
                };
                
                const themeColors = themes[isDark ? 'dark' : 'light'];
                const root = document.documentElement;
                
                Object.entries(themeColors).forEach(([key, value]) => {
                  root.style.setProperty('--color-' + key, value);
                });
                
                document.body.className = 'theme-' + (isDark ? 'dark' : 'light');
              } catch(e) {}
            })();
          `,
          type: 'text/javascript'
        }
      ]
    }
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ]
})