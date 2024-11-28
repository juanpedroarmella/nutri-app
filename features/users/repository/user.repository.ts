import { User } from '@/common/types/user.types'
import { createClient } from '@/common/utils/supabase/server'
import { AuthRepository } from '@/features/auth/repository/auth.repository'

export class UserRepository {
  private static async getAdminClient() {
    return await createClient()
  }

  static async getUsers() {
    const supabase = await createClient()

    return await supabase.from('users').select('*').returns<User[]>()
  }

  static async getUser(userId: string) {
    const supabase = await createClient()

    const { data: userPublicData } = await supabase
      .from('users')
      .select('role')
      .eq('id_auth', userId)
      .single()

    return userPublicData
  }

  static async editUser(userId: string, data: Partial<User>) {
    const supabase = await createClient()

    return await supabase.from('users').update(data).eq('id', userId)
  }

  static async deleteUser(userId: string) {
    const supabase = await createClient()

    return await supabase.from('users').delete().eq('id', userId)
  }

  static async getCurrentUser() {
    const supabase = await createClient()

    const authUser = await AuthRepository.getCurrentUser()

    const res = await supabase
      .from('users')
      .select('*')
      .eq('id_auth', authUser?.id)
      .single()

    return res.data as User
  }

  static async getUserByEmail(email: string) {
    const supabase = await UserRepository.getAdminClient()

    return await supabase.from('users').select('*').eq('email', email).single()
  }
}
