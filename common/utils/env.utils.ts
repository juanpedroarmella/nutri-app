export class EnvVariables {
  static supaBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  static supaBaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  static supaBaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  static googleClientId = process.env.GOOGLE_CLIENT_ID
  static googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
  static appUrl = process.env.APP_URL
  static nextPublicAppUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  static apiSecretToken = process.env.API_SECRET_TOKEN
  static resendApiKey = process.env.RESEND_API_KEY
  static emailSecretToken = process.env.EMAIL_SECRET_TOKEN
}
