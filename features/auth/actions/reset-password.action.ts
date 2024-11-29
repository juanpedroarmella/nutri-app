'use server'

import { authService } from '../services/auth.service'

export const resetPasswordAction = async (formData: FormData) => {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || !confirmPassword) {
    return {
      type: 'error',
      message: 'Password and confirm password are required'
    }
  }

  if (password !== confirmPassword) {
    return {
      type: 'error',
      message: 'Passwords do not match'
    }
  }

  const { error } = await authService.editMe({
    password: password
  })

  if (error) {
    return {
      type: 'error',
      message: 'Password update failed'
    }
  }

  return {
    type: 'success',
    message: 'Password updated'
  }
}
