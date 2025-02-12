'use server'
import { createClient } from '@/common/utils/supabase/server'
import { encodedRedirect } from '@/common/utils/utils'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { AuthRoutes, ProtectedRoutes } from '@/common/types/routes.types'

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString()
  const supabase = await createClient()
  const origin = (await headers()).get('origin')
  const callbackUrl = formData.get('callbackUrl')?.toString()

  if (!email) {
    return encodedRedirect(
      'error',
      AuthRoutes.FORGOT_PASSWORD,
      'Email is required'
    )
  }

  const res = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}${AuthRoutes.CALLBACK}?redirect_to=${ProtectedRoutes.RESET_PASSWORD}`
  })

  if (res.error) {
    console.error(res.error.message)
    return {
      type: 'error',
      message: res.error.message
    }
  }

  if (callbackUrl) {
    return redirect(callbackUrl)
  }

  return {
    type: 'success',
    message: 'Check your email for a link to reset your password.'
  }
}
