'use server'
import { AuthRoutes } from '@/common/types/routes.types'
import { redirect } from 'next/navigation'
import { authService } from '../services/auth.service'

export const signOutAction = async () => {
  await authService.signOut()

  return redirect(AuthRoutes.SIGN_IN)
}
