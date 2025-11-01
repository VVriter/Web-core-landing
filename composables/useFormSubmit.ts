export const useFormSubmit = () => {
  const submitForm = async (data: {
    name: string
    email: string
    phone?: string
    message: string
    subject?: string
  }) => {
    const formData = new FormData()
    
    // Add required fields
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('message', data.message)
    
    // Add optional fields
    if (data.phone) {
      formData.append('phone', data.phone)
    }
    
    if (data.subject) {
      formData.append('_subject', data.subject)
    } else {
      formData.append('_subject', 'Нове повідомлення з WebCore')
    }
    
    // FormSubmit settings
    formData.append('_captcha', 'false')
    formData.append('_template', 'box')
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/support@web-core.agency', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        return { success: true, message: 'Повідомлення успішно відправлено!' }
      } else {
        throw new Error(result.message || 'Помилка відправки')
      }
    } catch (error) {
      console.error('Form submit error:', error)
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Помилка відправки повідомлення. Спробуйте пізніше.' 
      }
    }
  }
  
  return {
    submitForm
  }
}

