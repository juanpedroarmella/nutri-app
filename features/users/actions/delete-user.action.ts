'use server'

import { AdminRoutes } from '@/common/types/routes.types'
import { authService } from '@/features/auth/services/auth.service'
import { revalidatePath } from 'next/cache'

export async function deleteUser(authId: string) {
  const currentUser = await authService.getCurrentUser()

  if (!currentUser) {
    return { error: 'Usuario no autenticado' }
  }

  // Solo permitir eliminación si es admin
  const isAdmin = await authService.isCurrentUserAdmin()

  if (!isAdmin) {
    return { error: 'No tienes permisos para eliminar usuarios' }
  }

  // Prevenir que un admin se elimine a sí mismo
  if (currentUser.id === authId) {
    return { error: 'No puedes eliminarte a ti mismo' }
  }

  const { error: deleteError } = await authService.deleteUser(authId)

  if (deleteError) {
    console.error('Delete Error:', deleteError)
    return { error: deleteError.message }
  }

  revalidatePath(AdminRoutes.HOME)

  return { redirect: AdminRoutes.HOME }
}
