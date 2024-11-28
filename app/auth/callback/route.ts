import { createClient } from '@/common/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()

    // Intercambiar el código por una sesión
    const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (sessionError || !session?.user?.email) {
      return NextResponse.redirect(`${origin}/sign-in?error=Error de autenticación`)
    }

    // Verificar si el usuario existe en nuestra tabla de usuarios
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', session.user.email)
      .single()

    if (userError || !userData) {
      // Si el usuario no existe, cerrar sesión y redirigir
      await supabase.auth.signOut()
      return NextResponse.redirect(`${origin}/sign-in?error=Usuario no autorizado`)
    }

    return NextResponse.redirect(origin)
  }

  // Si no hay código, redirigir a sign-in
  return NextResponse.redirect(`${origin}/sign-in?error=Error de autenticación`)
}