'use server'

import { AuthRoutes } from '@/common/types/routes.types'
import { EnvVariables } from '@/common/utils/env.utils'

export async function sendWelcomeEmail(email: string, password: string) {
  try {
    const baseUrl = EnvVariables.nextPublicAppUrl

    const response = await fetch(`${baseUrl}/api/email/welcome`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userEmail: email,
        password,
        redirectUrl: `${baseUrl}${AuthRoutes.SIGN_IN}`
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return { error }
  }
}
