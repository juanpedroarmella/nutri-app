'use server'
import { createClient } from '@/common/utils/supabase/server'
import { encodedRedirect } from '@/common/utils/utils'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { AuthRoutes } from '@/common/types/routes.types'
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

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}${AuthRoutes.CALLBACK}?redirect_to=${AuthRoutes.RESET_PASSWORD}`
  })

  if (error) {
    console.error(error.message)
    return {
      type: 'error',
      message: error.message
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
