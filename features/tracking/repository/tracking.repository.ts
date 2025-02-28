import { createClient, createClientAdmin } from '@/common/utils/supabase/server'
import { TrackingType } from '../types/tracking.types'

const DATABASE_NAME = 'tracking'

export class TrackingRepository {
  async getTrackingByUserId(
    userId: string,
    type: TrackingType,
    isAdmin: boolean
  ) {
    const supabase = isAdmin ? await createClientAdmin() : await createClient()

    return await supabase
      .from(DATABASE_NAME)
      .select('*')
      .eq('user_id', userId)
      .eq('type', type)
      .order('date', { ascending: true })
  }

  async addTracking(data: {
    user_id: string
    type: TrackingType
    value: number
    date: Date
    notes?: string
  }) {
    const supabase = await createClientAdmin()

    const res = await supabase
      .from(DATABASE_NAME)
      .insert(data)
      .select()
      .single()
    return res
  }

  async deleteTracking(id: string) {
    const supabase = await createClientAdmin()

    return await supabase.from(DATABASE_NAME).delete().eq('id', id)
  }
}
