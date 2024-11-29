import { createClient, createClientAdmin } from '@/common/utils/supabase/server'

export class AuthRepository {
  private static async getAdminClient() {
    return await createClientAdmin()
  }

  async getCurrentUser() {
    const supabase = await createClient()

    const res = await supabase.auth.getUser()

    return res.data.user
  }

  async getUser(userId: string) {
    const supabase = await createClient()

    return await supabase.auth.admin.getUserById(userId)
  }

  async getSession() {
    const supabase = await createClient()

    return await supabase.auth.getSession()
  }

  async signOut() {
    const supabase = await createClient()

    return await supabase.auth.signOut()
  }

  async signIn(email: string, password: string) {
    const supabase = await createClient()

    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  }

  async createUser(data: {
    email: string
    name: string
    surname: string
    role: string
    password: string
  }) {
    const supabaseAdmin = await AuthRepository.getAdminClient()

    // When creating a user-auth, a trigger fires that creates a user in the users table
    return await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: {
        first_name: data.name,
        last_name: data.surname,
        role: data.role
      }
    })
  }

  async editMe(data: { password: string }) {
    const supabase = await createClient()

    return await supabase.auth.updateUser({
      password: data.password
    })
  }

  async exchangeCodeForSession(code: string) {
    const supabase = await createClient()

    return await supabase.auth.exchangeCodeForSession(code)
  }
}
