import { User } from '@/common/types/user.types'
import { createClient } from '@/common/utils/supabase/server'

export class UserRepository {
  private async getAdminClient() {
    return await createClient()
  }

  async getUsers() {
    const supabase = await createClient()

    return await supabase.from('users').select('*').returns<User[]>()
  }

  async editUser(userId: string, data: Partial<User>) {
    const supabase = await createClient()

    return await supabase.from('users').update(data).eq('id', userId)
  }

  async getUserByAuthId(userId: string) {
    const supabase = await createClient()

    const res = await supabase
      .from('users')
      .select('*')
      .eq('id_auth', userId)
      .single()

    return res.data as User
  }

  async getUser(userId: string) {
    const supabase = await createClient()

    return await supabase.from('users').select('*').eq('id', userId).single()
  }
}
