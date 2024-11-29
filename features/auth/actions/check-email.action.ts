'use server'

import { UserService } from '@/features/users/service/user-service'

export async function checkEmailExists(email: string) {
  try {
    const userService = new UserService()

    const { data: user } = await userService.getUserByEmail(email)

    return { exists: !!user }
  } catch (error) {
    console.error('Error checking email:', error)
    return { error: 'Error al verificar el email' }
  }
}
