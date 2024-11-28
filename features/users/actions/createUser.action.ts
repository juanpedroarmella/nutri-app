'use server'
import { createClient, createClientAdmin } from '@/common/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createUser({
  data
}: {
  data: {
    email: string
    name: string
    surname: string
    role: string
  }
}) {
  const supabase = await createClient()

  // Verificar el rol del usuario actual
  const {
    data: { user: userPrivateData }
  } = await supabase.auth.getUser()

  if (!userPrivateData?.email) {
    return { error: 'No autorizado' }
  }

  const { data: userPublicData } = await supabase
    .from('users')
    .select('role')
    .eq('id_auth', userPrivateData.id)
    .single()

  if (!userPublicData || userPublicData.role !== 'admin') {
    return { error: 'No tienes permisos para realizar esta acción' }
  }

  // Continuar con la creación del usuario si es admin
  const emailLocalPart = data.email.split('@')[0]
  const password = `${emailLocalPart}1234`

  const supabaseAdmin = await createClientAdmin()

  const { error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: data.email,
    password: password,
    email_confirm: true,
    user_metadata: {
      first_name: data.name,
      last_name: data.surname,
      role: data.role,
    }
  })

  if (authError) {
    console.error('Auth Error:', authError)
    return { error: authError.message }
  }
  
  revalidatePath('/admin')
  
  return { redirect: '/admin' }
}
