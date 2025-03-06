import { APP_NAME } from '@/common/constants/app.constants'
import WelcomeEmail from '@/features/email/components/welcome-user.email'
import { Resend } from 'resend'
import { EnvVariables } from '@/common/utils/env.utils'
import { createClient as createClientSupabase } from '@supabase/supabase-js'

const resend = new Resend(EnvVariables.resendApiKey)

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return Response.json({ error: 'No autorizado' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    
    const supabase = createClientSupabase(
      EnvVariables.supaBaseUrl!,
      EnvVariables.supaBaseAnonKey!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      }
    )

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return Response.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { data: userData, error: userDataError } = await supabase
      .from('users')
      .select('role')
      .eq('id_auth', user.id)
      .single()

    if (userDataError || !userData || userData.role !== 'admin') {
      return Response.json({ error: 'No tienes permisos para enviar correos' }, { status: 403 })
    }

    const { userEmail, password, redirectUrl } = await request.json()

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
