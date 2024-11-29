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


  // 2. If user is authenticated and trying to access auth pages, redirect to appropriate route
  if (user && (currentPath === AuthRoutes.SIGN_IN || currentPath === '/')) {
    const isAdmin = await authService.isCurrentUserAdmin()
    return NextResponse.redirect(
      new URL(
        isAdmin ? ProtectedRoutes.ADMIN : ProtectedRoutes.DASHBOARD,
        request.url
      )
    )
  }

  // 3. Check if user is trying to access protected routes
  const isProtectedRoute = Object.values(ProtectedRoutes).some(route =>
    currentPath.startsWith(route)
  )

  // 4. If no user and trying to access protected route, redirect to sign in
  if (isProtectedRoute && (!user || error)) {
    return NextResponse.redirect(new URL(AuthRoutes.SIGN_IN, request.url))
  }

  // 5. If user exists, handle role-based access
  if (user) {
    const isAdmin = await authService.isCurrentUserAdmin()
    const isAdminRoute = currentPath.startsWith(ProtectedRoutes.ADMIN)
    const isDashboardRoute = currentPath.startsWith(ProtectedRoutes.DASHBOARD)

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
