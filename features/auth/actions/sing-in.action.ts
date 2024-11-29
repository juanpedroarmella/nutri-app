'use server'
import { redirect } from 'next/navigation'
import { AuthService } from '../services/auth.service'

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const authService = new AuthService()

  const { error } = await authService.signIn(email, password)

  if (error) {
    return {
      type: 'error',
      message: error.message
    }
  }

  return redirect('/')
}
