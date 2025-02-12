export enum ProtectedRoutes {
  DASHBOARD = '/dashboard',
  ADMIN = '/admin',
  PROFILE = '/profile',
  RESET_PASSWORD = '/reset-password'
}

export enum AuthRoutes {
  CALLBACK = '/auth/callback',
  FORGOT_PASSWORD = '/forgot-password',
  SIGN_IN = '/sign-in'
}

export enum DashboardRoutes {
  HOME = '/dashboard',
  TRACKING = '/dashboard/tracking',
  DOCUMENTS = '/dashboard/documents',
  APPOINTMENTS = '/dashboard/appointments'
}

export enum AdminRoutes {
  HOME = '/admin',
  USERS = '/admin/users',
  DOCUMENTS = '/admin/documents',
  APPOINTMENTS = '/admin/appointments'
}

export enum ApiRoutes {
  WELCOME_EMAIL = '/api/auth/welcome'
}
