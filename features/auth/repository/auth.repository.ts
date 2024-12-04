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
    const supabaseAdmin = await AuthRepository.getAdminClient()

    return await supabaseAdmin.auth.admin.getUserById(userId)
  }

  async getUsers() {
    const supabaseAdmin = await AuthRepository.getAdminClient()

    return await supabaseAdmin.auth.admin.listUsers()
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
    phone: number | null
  }) {
    const supabaseAdmin = await AuthRepository.getAdminClient()

    console.log('data', data)

    // When creating a user-auth, a trigger fires that creates a user in the users table
    return await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: {
        password: data.password,
        first_name: data.name,
        last_name: data.surname,
        role: data.role,
        phone: data.phone
      }
    })
  }

  async deleteUser(userId: string) {
    const supabaseAdmin = await AuthRepository.getAdminClient()

    return await supabaseAdmin.auth.admin.deleteUser(userId)
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
