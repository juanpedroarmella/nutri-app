import { APP_NAME } from '@/common/constants/app.constants'
import WelcomeEmail from '@/features/email/components/welcome-user.email'
import { Resend } from 'resend'
import { EnvVariables } from '@/common/utils/env.utils'

const resend = new Resend(EnvVariables.resendApiKey)

export async function POST(request: Request) {
  const { userEmail, password, redirectUrl } = await request.json()

  try {
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
