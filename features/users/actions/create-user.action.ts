'use server'
import { AdminRoutes } from '@/common/types/routes.types'
import { authService } from '@/features/auth/services/auth.service'
import { CreateUserRequest } from '@/features/auth/types/auth.types'
import { revalidatePath } from 'next/cache'

export async function createUser({ data }: { data: CreateUserRequest }) {
  const isAdmin = await authService.isCurrentUserAdmin()

  if (!isAdmin) {
    return { error: 'No tienes permisos para realizar esta acción' }
  }

  const { error: authError } = await authService.createUser(data)

  if (authError) {
    console.error('Auth Error:', authError)
    return { error: authError.message }
  }

  revalidatePath(AdminRoutes.HOME)

  return { redirect: AdminRoutes.HOME }
}
