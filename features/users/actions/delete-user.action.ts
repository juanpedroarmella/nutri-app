'use server'

import { AuthRepository } from '@/features/auth/repository/auth.repository'
import { UserRepository } from '../repository/user.repository'
import { revalidatePath } from 'next/cache'
import { AuthService } from '@/features/auth/services/auth.service'
import { UserService } from '../service/user-service'

export async function deleteUser(userId: string) {
  const authService = new AuthService()
  const currentUser = await authService.getCurrentUser()

  if (!currentUser) {
    return { error: 'Usuario no autenticado' }
  }

  // Solo permitir eliminación si es admin
  const isAdmin = await authService.isCurrentUserAdmin()

  if (!isAdmin) {
    return { error: 'No tienes permisos para eliminar usuarios' }
  }

  console.log('currentUser', currentUser)
  console.log('userId', userId)

  // Prevenir que un admin se elimine a sí mismo
  if (currentUser.id === userId) {
    return { error: 'No puedes eliminarte a ti mismo' }
  }

  const userService = new UserService()
  const { error: deleteError } = await userService.deleteUser(userId)

  if (deleteError) {
    console.error('Delete Error:', deleteError)
    return { error: deleteError.message }
  }

  revalidatePath('/admin')

  return { redirect: '/admin' }
}
