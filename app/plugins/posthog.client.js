import { defineNuxtPlugin } from '#app'
import posthog from 'posthog-js'

export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = useRuntimeConfig()
  
  // Ініціалізуємо PostHog тільки на клієнті
  if (typeof window !== 'undefined') {
    const posthogClient = posthog.init(runtimeConfig.public.posthogPublicKey, {
      api_host: runtimeConfig.public.posthogHost,
      person_profiles: 'identified_only', // або 'always' для створення профілів анонімних користувачів
      capture_pageview: true, // автоматично відстежувати перегляди сторінок
      capture_pageleave: true, // відстежувати коли користувач покидає сторінку
      loaded: (posthog) => {
        // Увімкнути debug режим в development
        if (process.env.NODE_ENV === 'development') {
          posthog.debug()
          console.log('PostHog initialized in debug mode')
        }
      }
    })

    // Додаємо PostHog до глобального контексту
    nuxtApp.provide('posthog', posthogClient)
    
    // Додаємо до window для легкого доступу в консолі
    if (process.env.NODE_ENV === 'development') {
      window.posthog = posthogClient
    }
  }
})
