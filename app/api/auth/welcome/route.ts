import nodemailer from 'nodemailer'
import WelcomeEmail from '@/features/email/components/welcome-user.email'
import { renderAsync } from '@react-email/render'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { EnvVariables } from '@/common/utils/env.utils'
import { APP_NAME } from '@/common/constants/app.constants'

export async function POST(request: Request) {
  const headersList = headers()
  const authToken = (await headersList).get('x-api-token')

  if (authToken !== EnvVariables.apiSecretToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { email, password } = await request.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    })

    const emailHtml = await renderAsync(
      WelcomeEmail({
        userEmail: email,
        password: password,
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/sign-in`
      })
    )

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Bienvenido a ${APP_NAME}`,
      html: emailHtml
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
