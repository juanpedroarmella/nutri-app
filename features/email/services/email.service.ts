'use server'

import { APP_NAME } from '@/common/constants/app.constants'
import { AuthRoutes } from '@/common/types/routes.types'
import { EnvVariables } from '@/common/utils/env.utils'
import { renderAsync } from '@react-email/render'
import WelcomeEmail from '../components/welcome-user.email'

export async function sendWelcomeEmail(email: string, password: string) {
  try {
    const BREVO_API_URL = EnvVariables.brevoApiUrl!
    const emailHtml = await renderAsync(
      WelcomeEmail({
        userEmail: email,
        password: password,
        redirectUrl: EnvVariables.nextPublicAppUrl + AuthRoutes.SIGN_IN
      })
    )

    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': EnvVariables.brevoApiKey!,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: {
          name: APP_NAME,
          email: EnvVariables.emailSender
        },
        to: [
          {
            email: email
          }
        ],
        subject: `Bienvenido a ${APP_NAME}`,
        htmlContent: emailHtml
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Error sending welcome email:', error)
      return { error }
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return { error }
  }
}
