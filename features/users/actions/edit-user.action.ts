'use server'

import { User } from '@/common/types/user.types'
import { AuthService } from '@/features/auth/services/auth.service'
import { revalidatePath } from 'next/cache'
import { UserService } from '../service/user-service'

export async function editUser(userId: string, data: Partial<User>) {
  const userService = new UserService()
  const currentUser = await userService.getCurrentUser()

  if (!currentUser) {
    return { error: 'Usuario no autenticado' }
  }

  const authService = new AuthService()

  const isAdmin = await authService.isCurrentUserAdmin()

  const canEdit = currentUser.id === userId || isAdmin

  if (!canEdit) {
    return { error: 'No tienes permisos para editar este usuario' }
  }

  const { error: authError } = await userService.editUser(userId, data)

  if (authError) {
    console.error('Auth Error:', authError)
    return { error: authError.message }
  }

  revalidatePath('/admin')

  return { redirect: '/admin' }
}
