'use server'
import { AuthRepository } from '@/features/auth/repository/auth.repository'
import { AuthService } from '@/features/auth/services/auth.service'
import { revalidatePath } from 'next/cache'
import { UserService } from '../service/user-service'

export async function createUser({
  data
}: {
  data: {
    email: string
    name: string
    surname: string
    role: string
  }
}) {
  const authService = new AuthService()
  const isAdmin = await authService.isCurrentUserAdmin()

  if (!isAdmin) {
    return { error: 'No tienes permisos para realizar esta acción' }
  }

  const { error: authError } = await authService.createUser(data)

  if (authError) {
    console.error('Auth Error:', authError)
    return { error: authError.message }
  }

  revalidatePath('/admin')

  return { redirect: '/admin' }
}
