import { createClient } from '@/common/utils/supabase/server'
import { UserEntity } from '../entity/user.entity'

export class UserRepository {
  async getUsers() {
    const supabase = await createClient()

    return await supabase.from('users').select('*').returns<UserEntity[]>()
  }

  async editUser(userId: string, data: Partial<UserEntity>) {
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

    return res.data as UserEntity
  }

  async getUser(userId: string) {
    const supabase = await createClient()

    const res = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    return res.data as UserEntity
  }
}
