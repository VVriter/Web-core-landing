/**
 * PostHog Analytics Composable
 * Зручний інтерфейс для роботи з PostHog аналітикою
 */

export const usePostHog = () => {
  const { $posthog } = useNuxtApp()

  // Базова функція для відправки події
  const track = (eventName: string, properties: Record<string, any> = {}) => {
    if ($posthog && typeof window !== 'undefined') {
      $posthog.capture(eventName, {
        ...properties,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        page_path: window.location.pathname,
        user_agent: navigator.userAgent
      })
    }
  }

  // Ідентифікація користувача
  const identify = (userId: string, traits: Record<string, any> = {}) => {
    if ($posthog) {
      $posthog.identify(userId, traits)
    }
  }

  // Встановлення властивостей користувача
  const setUserProperties = (properties: Record<string, any>) => {
    if ($posthog) {
      $posthog.people.set(properties)
    }
  }

  // Трекінг бізнес-подій
  const trackBusinessEvent = {
    // Відкриття модального вікна
    modalOpened: (modalType: string, source?: string) => {
      track('modal_opened', {
        modal_type: modalType,
        source: source || 'unknown'
      })
    },

    // Відправка форми
    formSubmitted: (formType: string, success: boolean, errorMessage?: string) => {
      track('form_submitted', {
        form_type: formType,
        success: success,
        error_message: errorMessage || null
      })
    },

    // Перегляд сторінки
    pageViewed: (pageName: string, additionalData: Record<string, any> = {}) => {
      track('page_viewed', {
        page_name: pageName,
        ...additionalData
      })
    },

    // Клік на CTA кнопку
    ctaClicked: (buttonText: string, location: string) => {
      track('cta_clicked', {
        button_text: buttonText,
        location: location
      })
    },

    // Перегляд проекту в портфоліо
    portfolioViewed: (projectName: string, projectUrl: string) => {
      track('portfolio_project_viewed', {
        project_name: projectName,
        project_url: projectUrl
      })
    },

    // Поділитися в соціальних мережах
    socialShare: (platform: string, contentType: string, contentTitle?: string) => {
      track('content_shared', {
        platform: platform,
        content_type: contentType,
        content_title: contentTitle || 'unknown'
      })
    },

    // Скачування файлів
    fileDownloaded: (fileName: string, fileType: string) => {
      track('file_downloaded', {
        file_name: fileName,
        file_type: fileType
      })
    },

    // Помилки
    errorOccurred: (errorType: string, errorMessage: string, context?: string) => {
      track('error_occurred', {
        error_type: errorType,
        error_message: errorMessage,
        context: context || 'unknown'
      })
    }
  }

  return {
    track,
    identify,
    setUserProperties,
    trackBusinessEvent,
    // Прямий доступ до PostHog (для розширеного використання)
    posthog: $posthog
  }
}
