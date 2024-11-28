'use server'

import { UserRepository } from '@/features/users/repository/user.repository'

export async function checkEmailExists(email: string) {
  try {
    const { data: user } = await UserRepository.getUserByEmail(email)
    return { exists: !!user }
  } catch (error) {
    console.error('Error checking email:', error)
    return { error: 'Error al verificar el email' }
  }
}