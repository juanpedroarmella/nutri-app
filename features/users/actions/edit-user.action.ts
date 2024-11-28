'use server'

import { User, UserRole } from '@/common/types/user.types'
import { AuthRepository } from '@/features/auth/repository/auth.repository'
import { revalidatePath } from 'next/cache'
import { UserRepository } from '../repository/user.repository'

export async function editUser(userId: string, data: Partial<User>) {
  const currentUser = await AuthRepository.getCurrentUser()

  if (!currentUser) {
    return { error: 'Usuario no autenticado' }
  }

  // Permitir edición si es el mismo usuario o si es admin
  const isAdmin = await AuthRepository.checkAdmin()

  const canEdit = currentUser.id === userId || isAdmin

  if (!canEdit) {
    return { error: 'No tienes permisos para editar este usuario' }
  }

  const { error: authError } = await UserRepository.editUser(userId, data)

  if (authError) {
    console.error('Auth Error:', authError)
    return { error: authError.message }
  }

  revalidatePath('/admin')

  return { redirect: '/admin' }
}
