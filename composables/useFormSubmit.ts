export const useFormSubmit = () => {
  const submitForm = async (data: {
    name: string
    email?: string
    phone: string
    message?: string
    subject?: string
  }) => {
    try {
      const response = await $fetch('/api/contact', {
        method: 'POST',
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          message: data.message,
          subject: data.subject || 'Нове повідомлення з WebCore'
        }
      })

      return {
        success: true,
        message: (response as { message?: string })?.message || 'Повідомлення успішно відправлено!'
      }
    } catch (error: unknown) {
      console.error('Form submit error:', error)

      // Handle Nuxt/fetch errors
      const errorMessage = error instanceof Error
        ? error.message
        : 'Помилка відправки повідомлення. Спробуйте пізніше.'

      return {
        success: false,
        message: errorMessage
      }
    }
  }

  return {
    submitForm
  }
}
