'use server'

import { AuthRepository } from '@/features/auth/repository/auth.repository'
import { UserRepository } from '../repository/user.repository'
import { revalidatePath } from 'next/cache'

export async function deleteUser(userId: string) {
  const currentUser = await AuthRepository.getCurrentUser()

  if (!currentUser) {
    return { error: 'Usuario no autenticado' }
  }

  // Solo permitir eliminación si es admin
  const isAdmin = await AuthRepository.checkAdmin()

  if (!isAdmin) {
    return { error: 'No tienes permisos para eliminar usuarios' }
  }

  console.log('currentUser', currentUser)
  console.log('userId', userId)

  // Prevenir que un admin se elimine a sí mismo
  if (currentUser.id === userId) {
    return { error: 'No puedes eliminarte a ti mismo' }
  }

  const { error: deleteError } = await UserRepository.deleteUser(userId)

  if (deleteError) {
    console.error('Delete Error:', deleteError)
    return { error: deleteError.message }
  }

  revalidatePath('/admin')

  return { redirect: '/admin' }
}