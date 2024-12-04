'use server'

import { authService } from '@/features/auth/services/auth.service'
import { userService } from '@/features/users/service/user.service'
import { revalidatePath } from 'next/cache'

interface EditProfileData {
  first_name?: string
  last_name?: string
  password?: string
}

export async function editProfile(userId: string, data: EditProfileData) {
  const currentUser = await userService.getCurrentUser()

  if (!currentUser) {
    return { error: 'Usuario no autenticado' }
  }

  if (currentUser.id !== userId) {
    return { error: 'No tienes permisos para editar este perfil' }
  }

  try {
    if (data.password) {
      const { error: passwordError } = await authService.editMe({
        password: data.password
      })

      if (passwordError) {
        return { error: passwordError.message }
      }
    } else {
      const { error: userError } = await userService.editUser(userId, data)

      if (userError) {
        return { error: userError.message }
      }
    }

    revalidatePath('/profile')
    return { success: true }
  } catch (error) {
    console.error('Error updating profile:', error)
    return { error: 'Error al actualizar el perfil' }
  }
}