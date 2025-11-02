// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: 'uk'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://web-core.agency' },
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'alternate', hreflang: 'uk', href: 'https://web-core.agency' },
        { rel: 'alternate', hreflang: 'x-default', href: 'https://web-core.agency' }
      ],
      meta: [
        // Basic SEO
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'language', content: 'Ukrainian' },
        { name: 'geo.region', content: 'UA' },
        
        // Open Graph / Facebook / Discord / Telegram
        { property: 'og:site_name', content: 'WebCore Agency' },
        { property: 'og:title', content: 'WebCore - Перетворюємо ідеї на цифровий успіх' },
        { property: 'og:description', content: 'Створюємо веб-сайти, які приносять прибуток. Від ідеї до запуску за 14 днів. Професійні послуги веб-розробки, дизайну та технічної підтримки для вашого бізнесу.' },
        { property: 'og:locale', content: 'uk_UA' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://web-core.agency' },
        { property: 'og:image', content: 'https://web-core.agency/images/og-image.jpg' },
        { property: 'og:image:url', content: 'https://web-core.agency/images/og-image.jpg' },
        { property: 'og:image:secure_url', content: 'https://web-core.agency/images/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:alt', content: 'WebCore Agency - Професійні веб-послуги для вашого бізнесу' },
        
        // Additional Open Graph for better Discord/Telegram support
        { property: 'og:updated_time', content: '2025-11-02T00:00:00Z' },
        
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@webcore_agency' },
        { name: 'twitter:creator', content: '@webcore_agency' },
        { name: 'twitter:image', content: 'https://web-core.agency/images/og-image.jpg' },
        { name: 'twitter:image:src', content: 'https://web-core.agency/images/og-image.jpg' },
        { name: 'twitter:image:alt', content: 'WebCore Agency - Професійні веб-послуги для вашого бізнесу' },
        
        // Additional Meta
        { name: 'theme-color', content: '#8B5CF6' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'WebCore' },
        
        // Business Information
        { name: 'author', content: 'WebCore Agency' },
        { name: 'contact', content: 'support@web-core.agency' }
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