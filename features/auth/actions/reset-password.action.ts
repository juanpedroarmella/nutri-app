'use server'

import { authService } from '../services/auth.service'

export const resetPasswordAction = async (formData: FormData) => {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || !confirmPassword) {
    return {
      type: 'error',
      message: 'Los campos de contraseña son requeridos'
    }
  }

  if (password !== confirmPassword) {
    return {
      type: 'error',
      message: 'Las contraseñas no coinciden'
    }
  }

  const { error } = await authService.editMe({
    password: password
  })

  if (error) {
    return {
      type: 'error',
      message:
        'Error al actualizar la contraseña, recuerda que no debe ser igual a la contraseña anterior'
    }
  }

  return {
    type: 'success',
    message: 'Contraseña actualizada correctamente'
  }
}
