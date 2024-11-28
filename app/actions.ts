'use server'

import { encodedRedirect } from '@/common/utils/utils'
import { createClient } from '@/common/utils/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return {
      type: 'error',
      message: error.message
    }
  }

  return redirect('/')
}

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString()
  const supabase = await createClient()
  const origin = (await headers()).get('origin')
  const callbackUrl = formData.get('callbackUrl')?.toString()

  if (!email) {
    return encodedRedirect('error', '/forgot-password', 'Email is required')
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`
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

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient()

  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || !confirmPassword) {
    return {
      type: 'error',
      message: 'Password and confirm password are required'
    }
  }

  if (password !== confirmPassword) {
    return {
      type: 'error',
      message: 'Passwords do not match'
    }
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return {
      type: 'error',
      message: 'Password update failed'
    }
  }

  return {
    type: 'success',
    message: 'Password updated'
  }
}

export const signOutAction = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/sign-in')
}
