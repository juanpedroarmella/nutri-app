import { createClient, createClientAdmin } from '@/common/utils/supabase/server'
import { WeightTrackingEntity } from '../entities/tracking.entity'

const DATABASE_NAME = 'weight_tracking'

export class WeightTrackingRepository {
  async getWeightTrackingByUserId(userId: string, isAdmin: boolean) {
    const supabase = await (isAdmin ? createClientAdmin() : createClient())

    return await supabase
      .from(DATABASE_NAME)
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: true })
      .returns<WeightTrackingEntity[]>()
  }

  async addWeightTracking(data: Partial<WeightTrackingEntity>) {
    const supabase = await createClientAdmin()

    return await supabase
      .from(DATABASE_NAME)
      .insert(data)
      .select()
      .single()
  }

  async deleteWeightTracking(id: string) {
    const supabase = await createClientAdmin()

    return await supabase
      .from(DATABASE_NAME)
      .delete()
      .eq('id', id)
  }
} 