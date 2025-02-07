import { authService } from '@/features/auth/services/auth.service'
import { ClinicalDataEntity } from './../entity/clinical-history.entity'
import { createClient, createClientAdmin } from '@/common/utils/supabase/server'

const DATABASE_NAME = 'clinical-history'

export class ClinicalHistoryRepository {
  async getClinicalHistoryByUserId(userId: string, isAdmin: boolean) {
    const supabase = await (isAdmin ? createClientAdmin() : createClient())


    return await supabase
      .from(DATABASE_NAME)
      .select('*')
      .eq('id_user', userId)
      .returns<ClinicalDataEntity>()
      .single()
  }

  async updateClinicalHistory(data: Partial<ClinicalDataEntity>, id: string) {
    const supabase = await createClientAdmin()

    return await supabase.from(DATABASE_NAME).update(data).eq('id', id)
  }

  async createClinicalHistory(data: Partial<ClinicalDataEntity>) {
    const supabase = await createClientAdmin()

    return await supabase.from(DATABASE_NAME).insert(data)
  }
}
