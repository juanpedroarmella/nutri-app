import { APP_NAME } from '@/common/constants/app.constants'
import { EnvVariables } from '@/common/utils/env.utils'
import WelcomeEmail from '@/features/email/components/welcome-user.email'
import { Resend } from 'resend'

const resend = new Resend(EnvVariables.resendApiKey)

export async function POST(request: Request) {
  try {
    const { userEmail, password, redirectUrl, secretToken } = await request.json()

    // Validate secret token
    if (!secretToken || secretToken !== EnvVariables.emailSecretToken) {
      return Response.json(
        { error: 'Unauthorized: Invalid secret token' },
        { status: 401 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: 'Lic. Romina Lasca <onboarding@rominalasca.com>',
      to: [userEmail],
      subject: `Bienvenido a ${APP_NAME}`,
      react: WelcomeEmail({ userEmail, password, redirectUrl })
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return Response.json({ error }, { status: 500 })
  }
}
