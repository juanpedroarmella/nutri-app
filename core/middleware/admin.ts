import { createClient } from '@/common/utils/supabase/server'
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function adminMiddleware(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  // Obtener el rol del usuario
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id_auth', user.id)
    .single()

  //handle role admin or common user
  if (!userData || userData.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}
