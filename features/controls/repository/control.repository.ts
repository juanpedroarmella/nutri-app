import { createClient, createClientAdmin } from '@/common/utils/supabase/server'
import { ControlEntity, ControlWithUserEntity } from '../entity/control.entity'
import { ControlFilters } from '../types/control.types'

const DATABASE_NAME = 'controls'

export class ControlRepository {
  async getAllControls() {
    const supabase = await createClientAdmin()

    return await supabase
      .from(DATABASE_NAME)
      .select(
        `
        *,
        users (
          first_name,
          last_name
        )
      `.trim()
      )
      .order('consultation_date', { ascending: false })
      .returns<ControlWithUserEntity[]>()
  }

  async getControlsByUserId(userId: string) {
    const supabase = await createClientAdmin()

    return await supabase
      .from(DATABASE_NAME)
      .select('*')
      .eq('user_id', userId)
      .order('consultation_date', { ascending: false })
      .returns<ControlWithUserEntity[]>()
  }

  async getControlsByFilters(filters: ControlFilters) {
    const supabase = await createClientAdmin()

    let query = supabase.from(DATABASE_NAME).select(
      `
        *,
        users (
          first_name,
          last_name
        )
      `.trim()
    )

    if (filters.user_id) {
      query = query.eq('user_id', filters.user_id)
    }

    if (filters.date_from) {
      query = query.gte('consultation_date', filters.date_from)
    }

    if (filters.date_to) {
      query = query.lte('consultation_date', filters.date_to)
    }

    return await query
      .order('consultation_date', { ascending: false })
      .returns<ControlWithUserEntity[]>()
  }

  async getControl(id: string) {
    const supabase = await createClientAdmin()

    return await supabase
      .from(DATABASE_NAME)
      .select(
        `
        *,
        users (
          first_name,
          last_name,
        )
      `.trim()
      )
      .eq('id', id)
      .single()
  }

  async createControl(data: Partial<ControlEntity>) {
    const supabase = await createClientAdmin()

    return await supabase
      .from(DATABASE_NAME)
      .insert(data)
      .select()
      .single()
  }

  async updateControl(id: string, data: Partial<ControlEntity>) {
    const supabase = await createClientAdmin()

    return await supabase
      .from(DATABASE_NAME)
      .update(data)
      .eq('id', id)
      .select()
      .single()
  }

  async deleteControl(id: string) {
    const supabase = await createClientAdmin()

    return await supabase.from(DATABASE_NAME).delete().eq('id', id)
  }
}
