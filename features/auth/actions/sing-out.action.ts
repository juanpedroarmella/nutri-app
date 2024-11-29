'use server'
import { redirect } from 'next/navigation'
import { AuthService } from '../services/auth.service'
import { AuthRoutes } from '@/common/types/routes.types'

export const signOutAction = async () => {
  const authService = new AuthService()

  await authService.signOut()

  return redirect(AuthRoutes.SIGN_IN)
}
