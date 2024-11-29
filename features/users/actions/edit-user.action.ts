'use server'

import { User } from '@/common/types/user.types'
import { authService } from '@/features/auth/services/auth.service'
import { revalidatePath } from 'next/cache'
import { userService } from '../service/user-service'
import { AdminRoutes } from '@/common/types/routes.types'

export async function editUser(userId: string, data: Partial<User>) {
  const currentUser = await userService.getCurrentUser()

  if (!currentUser) {
    return { error: 'Usuario no autenticado' }
  }


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

  revalidatePath(AdminRoutes.HOME)

  return { redirect: AdminRoutes.HOME }
}
