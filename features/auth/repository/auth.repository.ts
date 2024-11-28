import { UserRole } from '@/common/types/user.types'
import { createClient, createClientAdmin } from '@/common/utils/supabase/server'
import { UserRepository } from '@/features/users/repository/user.repository'

export class AuthRepository {
  private static async getAdminClient() {
    return await createClientAdmin()
  }

  static async getCurrentUser() {
    const supabase = await createClient()

    const res = await supabase.auth.getUser()

    return res.data.user
  }

  static async getSession() {
    const supabase = await createClient()

    return await supabase.auth.getSession()
  }

  static async signOut() {
    const supabase = await createClient()

    return await supabase.auth.signOut()
  }

  static async signIn(email: string, password: string) {
    const supabase = await createClient()

    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  }

  static async createUser(data: {
    email: string
    name: string
    surname: string
    role: string
  }) {
    const supabaseAdmin = await AuthRepository.getAdminClient()

    return await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: this.getDefaultPassword(data.email),
      email_confirm: true,
      user_metadata: {
        first_name: data.name,
        last_name: data.surname,
        role: data.role
      }
    })
  }

  static getDefaultPassword(email: string) {
    const emailLocalPart = email.split('@')[0]
    return `${emailLocalPart}1234`
  }

  static async checkAdmin() {
    const currentUserAuth = await this.getCurrentUser()

    if (!currentUserAuth?.id) {
      return false
    }

    const user = await UserRepository.getUser(currentUserAuth?.id)

    return user?.role === UserRole.ADMIN
  }

  static async deleteUser(userId: string) {
    const supabaseAdmin = await AuthRepository.getAdminClient()

    return await supabaseAdmin.auth.admin.deleteUser(userId)
  }
}
