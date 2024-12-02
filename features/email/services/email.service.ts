'use server'

import { ApiRoutes } from '@/common/types/routes.types'
import { EnvVariables } from '@/common/utils/env.utils'

export async function sendWelcomeEmail(email: string, password: string) {
  try {
    const baseUrl = EnvVariables.nextPublicAppUrl
    const response = await fetch(`${baseUrl}${ApiRoutes.WELCOME_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': EnvVariables.apiSecretToken || ''
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error)
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return { error: 'Failed to send welcome email' }
  }
}
