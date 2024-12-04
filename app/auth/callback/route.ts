import { AuthRoutes } from '@/common/types/routes.types'
import { createClient } from '@/common/utils/supabase/server'
import { authService, AuthService } from '@/features/auth/services/auth.service'
import { userService, UserService } from '@/features/users/service/user.service'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    // Intercambiar el código por una sesión
    const {
      data: { session },
      error: sessionError
    } = await authService.exchangeCodeForSession(code)

    if (sessionError || !session?.user?.email) {
      return NextResponse.redirect(
        `${origin}${AuthRoutes.SIGN_IN}?error=Error de autenticación`
      )
    }

    // Verificar si el usuario existe en nuestra tabla de usuarios
    const userData = await userService.getUserByAuthId(session.user.id)

    if (!userData) {
      await authService.signOut()

      return NextResponse.redirect(
        `${origin}${AuthRoutes.SIGN_IN}?error=Usuario no autorizado`
      )
    }

    return NextResponse.redirect(origin)
  }

  // Si no hay código, redirigir a sign-in
  return NextResponse.redirect(
    `${origin}${AuthRoutes.SIGN_IN}?error=Error de autenticación`
  )
}
