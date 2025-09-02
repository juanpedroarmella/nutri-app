import { createClient, createClientAdmin } from '@/common/utils/supabase/server'
import { UserEntity } from '../entity/user.entity'

export class UserRepository {
  async getUsers() {
    const supabase = await createClient()

    return await supabase.from('users').select('id, first_name, last_name, role, id_auth, phone').returns<UserEntity[]>()
  }

  async getUsersPaginated(page: number, limit: number, search?: string) {
    const supabase = await createClient()
    
    let query = supabase
      .from('users')
      .select('id, first_name, last_name, role, id_auth, phone', { count: 'exact' })
    
    // Aplicar filtro de búsqueda si existe
    if (search && search.trim()) {
      const searchTerm = search.trim()
      query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`)
    }
    
    // Aplicar paginación
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    query = query.range(from, to)
    
    return await query.returns<UserEntity[]>()
  }

  async editUser(userId: string, data: Partial<UserEntity>) {
    const supabase = await createClientAdmin()

    console.log(userId)

    console.log(data)

    const res = await supabase.from('users').update(data).eq('id', userId)

    console.log(res)

    return res
  }

  async getUserByAuthId(userId: string) {
    const supabase = await createClient()

    const res = await supabase
      .from('users')
      .select('id, first_name, last_name, role, id_auth, phone')
      .eq('id_auth', userId)
      .single()

    return res.data as UserEntity
  }

  async getUser(userId: string) {
    const supabase = await createClient()

    const res = await supabase
      .from('users')
      .select('id, first_name, last_name, role, id_auth, phone')
      .eq('id', userId)
      .single()

    return res.data as UserEntity
  }
}
