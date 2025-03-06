'use server'

import { AuthRoutes } from '@/common/types/routes.types'
import { EnvVariables } from '@/common/utils/env.utils'
import { cookies } from 'next/headers'

export async function sendWelcomeEmail(email: string, password: string) {
  try {
    const baseUrl = EnvVariables.nextPublicAppUrl
    const cookie = (await cookies()).toString()

    const response = await fetch(`${baseUrl}/api/email/welcome`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie
      },
      body: JSON.stringify({
        userEmail: email,
        password,
        redirectUrl: `${baseUrl}${AuthRoutes.SIGN_IN}`
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`HTTP error! status: ${response.status} ${error.error}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return { error }
  }
}
