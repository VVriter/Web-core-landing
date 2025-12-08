export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // Validate required fields
  if (!body.name || !body.phone) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields: name, phone'
    })
  }

  const { name, email, phone, message, subject } = body

  // Format message for Telegram
  const telegramMessage = `
📬 <b>Нова заявка з сайту WebCore</b>

👤 <b>Ім'я:</b> ${escapeHtml(name)}
📱 <b>Телефон:</b> ${escapeHtml(phone)}
${email ? `📧 <b>Email:</b> ${escapeHtml(email)}` : ''}
📝 <b>Тема:</b> ${escapeHtml(subject || 'Нове повідомлення')}
${message ? `
💬 <b>Повідомлення:</b>
${escapeHtml(message)}` : ''}

🕐 <b>Час:</b> ${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })}
`.trim()

  const results = {
    telegram: false,
    email: false
  }

  // Send to Telegram (non-blocking, don't fail if Telegram fails)
  try {
    if (config.telegramBotToken && config.telegramChatId) {
      const telegramResult = await sendToTelegram(
        config.telegramBotToken,
        config.telegramChatId,
        config.telegramThreadId || undefined,
        telegramMessage
      )
      results.telegram = telegramResult.ok === true
      if (!telegramResult.ok) {
        console.error('Telegram API error:', telegramResult)
      }
    }
  } catch (error) {
    console.error('Telegram send error:', error)
  }

  // Send to FormSubmit (email)
  try {
    const emailResult = await sendToFormSubmit({
      name,
      email,
      phone,
      message,
      subject: subject || 'Нове повідомлення з WebCore'
    })
    results.email = emailResult.success === true
  } catch (error) {
    console.error('FormSubmit error:', error)
  }

  // At least one method should succeed
  if (!results.telegram && !results.email) {
    throw createError({
      statusCode: 500,
      message: 'Помилка відправки повідомлення. Спробуйте пізніше.'
    })
  }

  return {
    success: true,
    message: 'Повідомлення успішно відправлено!'
  }
})

// Send message to Telegram
async function sendToTelegram(botToken: string, chatId: string, threadId: string | undefined, text: string) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`

  const payload: Record<string, unknown> = {
    chat_id: chatId,
    text: text,
    parse_mode: 'HTML',
    disable_web_page_preview: true
  }

  // Add thread ID if specified (for forum/topics)
  if (threadId) {
    payload.message_thread_id = parseInt(threadId, 10)
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  return response.json()
}

// Send to FormSubmit (email)
async function sendToFormSubmit(data: {
  name: string
  email?: string
  phone: string
  message?: string
  subject: string
}): Promise<{ success: boolean }> {
  const formData = new FormData()

  formData.append('name', data.name)
  formData.append('phone', data.phone)
  formData.append('_subject', data.subject)

  if (data.message) {
    formData.append('message', data.message)
  }

  if (data.email) {
    formData.append('email', data.email)
  } else {
    // FormSubmit requires email, use placeholder if not provided
    formData.append('email', 'no-email@web-core.agency')
  }

  // FormSubmit settings
  formData.append('_captcha', 'false')
  formData.append('_template', 'box')

  const response = await fetch('https://formsubmit.co/ajax/support@web-core.agency', {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    body: formData
  })

  const result = await response.json()

  return {
    success: response.ok && result.success === 'true'
  }
}

// Escape HTML special characters
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char)
}
