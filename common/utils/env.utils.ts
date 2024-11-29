export class EnvVariables {
  static supaBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  static supaBaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  static supaBaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  static googleClientId = process.env.GOOGLE_CLIENT_ID
  static googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
  static vercelUrl = process.env.VERCEL_URL
}
