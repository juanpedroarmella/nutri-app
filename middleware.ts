import { type NextRequest } from 'next/server'
import { AuthRoutes, ProtectedRoutes } from '@/common/types/routes.types'
import { NextResponse } from 'next/server'
import { authService } from './features/auth/services/auth.service'
import { refreshSession } from './features/auth/session/auth.session'

export async function middleware(request: NextRequest) {
  // 1. Refresh session and get user
  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

  const {
    data: { user },
    error
  } = await refreshSession(request, response)
  const currentPath = request.nextUrl.pathname

  // 2. Check if user is trying to access protected routes
  const isProtectedRoute = Object.values(ProtectedRoutes).some(route =>
    currentPath.startsWith(route)
  )

  // 3. If no user and trying to access protected route, redirect to sign in
  if (isProtectedRoute && (!user || error)) {
    return NextResponse.redirect(new URL(AuthRoutes.SIGN_IN, request.url))
  }

  // 4. If user exists, handle role-based access and auth pages
  if (user) {
    // Only check admin status once
    const isAdmin = await authService.isCurrentUserAdmin()
    const isAdminRoute = currentPath.startsWith(ProtectedRoutes.ADMIN)
    const isDashboardRoute = currentPath.startsWith(ProtectedRoutes.DASHBOARD)

    // Handle auth pages redirects
    if (currentPath === AuthRoutes.SIGN_IN || currentPath === '/') {
      return NextResponse.redirect(
        new URL(
          isAdmin ? ProtectedRoutes.ADMIN : ProtectedRoutes.DASHBOARD,
          request.url
        )
      )
    }

    // Admin trying to access dashboard -> redirect to admin
    if (isAdmin && isDashboardRoute) {
      return NextResponse.redirect(new URL(ProtectedRoutes.ADMIN, request.url))
    }

    // Non-admin trying to access admin -> redirect to dashboard
    if (!isAdmin && isAdminRoute) {
      return NextResponse.redirect(
        new URL(ProtectedRoutes.DASHBOARD, request.url)
      )
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
}
