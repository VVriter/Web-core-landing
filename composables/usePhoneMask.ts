import { ref, computed } from 'vue'

export function usePhoneMask(initialValue = '') {
  const phone = ref(initialValue)
  const rawPhone = ref('')

  // Reactive validation - phone is valid when it has 12 digits
  const isValid = computed(() => rawPhone.value.length === 12)

  // Format phone number to Ukrainian format: +38 (0XX) XXX XX XX
  const formatPhone = (value: string): string => {
    // Remove all non-digit characters
    let digits = value.replace(/\D/g, '')

    // If starts with 38, keep it; if starts with 0, add 38; otherwise add 380
    if (digits.startsWith('38')) {
      // Already has country code
    } else if (digits.startsWith('0')) {
      digits = '38' + digits
    } else if (digits.length > 0 && !digits.startsWith('3')) {
      digits = '380' + digits
    }

    // Limit to 12 digits (380XXXXXXXXX)
    digits = digits.slice(0, 12)
    rawPhone.value = digits

    // Format the number
    if (digits.length === 0) return ''
    if (digits.length <= 2) return `+${digits}`
    if (digits.length <= 3) return `+${digits.slice(0, 2)} (${digits.slice(2)}`
    if (digits.length <= 5) return `+${digits.slice(0, 2)} (${digits.slice(2, 5)}`
    if (digits.length <= 8) return `+${digits.slice(0, 2)} (${digits.slice(2, 5)}) ${digits.slice(5)}`
    if (digits.length <= 10) return `+${digits.slice(0, 2)} (${digits.slice(2, 5)}) ${digits.slice(5, 8)} ${digits.slice(8)}`
    return `+${digits.slice(0, 2)} (${digits.slice(2, 5)}) ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`
  }

  // Handle input event
  const handlePhoneInput = (event: Event) => {
    const input = event.target as HTMLInputElement
    const cursorPosition = input.selectionStart || 0
    const oldValue = phone.value
    const newValue = input.value

    // Format the new value
    phone.value = formatPhone(newValue)

    // Restore cursor position
    setTimeout(() => {
      const diff = phone.value.length - oldValue.length
      const newCursor = Math.max(0, cursorPosition + diff)
      input.setSelectionRange(newCursor, newCursor)
    }, 0)
  }

  // Handle focus - add prefix if empty
  const handlePhoneFocus = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (!phone.value) {
      phone.value = '+38 (0'
      setTimeout(() => {
        input.setSelectionRange(phone.value.length, phone.value.length)
      }, 0)
    }
  }

  // Handle blur - clear if only prefix
  const handlePhoneBlur = () => {
    if (phone.value === '+38 (0' || phone.value === '+38 (' || phone.value === '+38' || phone.value === '+3' || phone.value === '+') {
      phone.value = ''
      rawPhone.value = ''
    }
  }

  // Handle keydown for better UX
  const handlePhoneKeydown = (event: KeyboardEvent) => {
    const input = event.target as HTMLInputElement

    // Allow: backspace, delete, tab, escape, enter
    if ([8, 46, 9, 27, 13].includes(event.keyCode)) {
      return
    }

    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if ((event.ctrlKey || event.metaKey) && [65, 67, 86, 88].includes(event.keyCode)) {
      return
    }

    // Allow: home, end, left, right
    if ([35, 36, 37, 39].includes(event.keyCode)) {
      return
    }

    // Block non-numeric characters
    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) &&
        (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault()
    }
  }

  // Get clean phone for submission (just digits with +)
  const getCleanPhone = (): string => {
    if (!rawPhone.value || rawPhone.value.length < 10) return ''
    return '+' + rawPhone.value
  }

  // Validate phone number (should have 12 digits for Ukrainian number)
  // Keep function for backwards compatibility
  const isValidPhone = (): boolean => {
    return rawPhone.value.length === 12
  }

  return {
    phone,
    rawPhone,
    isValid,
    handlePhoneInput,
    handlePhoneFocus,
    handlePhoneBlur,
    handlePhoneKeydown,
    getCleanPhone,
    isValidPhone,
    formatPhone
  }
}
