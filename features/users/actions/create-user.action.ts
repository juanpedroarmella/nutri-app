'use server'
import { AuthRepository } from '@/features/auth/repository/auth.repository'
import { revalidatePath } from 'next/cache'

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
  const isAdmin = await AuthRepository.checkAdmin()

  if (!isAdmin) {
    return { error: 'No tienes permisos para realizar esta acción' }
  }

  const { error: authError } = await AuthRepository.createUser(data)

  if (authError) {
    console.error('Auth Error:', authError)
    return { error: authError.message }
  }

  revalidatePath('/admin')

  return { redirect: '/admin' }
}
