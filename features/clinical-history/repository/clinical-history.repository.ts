import { ClinicalDataEntity } from './../entity/clinical-history.entity'
import { createClient } from '@/common/utils/supabase/server'

const DATABASE_NAME = 'clinical-history'

export class ClinicalHistoryRepository {
  async getUsers() {
    const supabase = await createClient()

    return await supabase
      .from(DATABASE_NAME)
      .select('*')
      .returns<ClinicalDataEntity[]>()
  }

  async editClinicalHistory(userId: string, data: Partial<ClinicalDataEntity>) {
    const supabase = await createClient()

    return await supabase.from(DATABASE_NAME).update(data).eq('id', userId)
  }

  async getClinicalHistoryByUserId(userId: string) {
    const supabase = await createClient()

    const res = await supabase
      .from(DATABASE_NAME)
      .select('*')
      .eq('id_user', userId)
      .single()

    return res.data as ClinicalDataEntity
  }

  async updateClinicalHistory(data: Partial<ClinicalDataEntity>, id: string) {
    const supabase = await createClient()

    return await supabase.from(DATABASE_NAME).update(data).eq('id', id)
  }

  async createClinicalHistory(data: Partial<ClinicalDataEntity>) {
    const supabase = await createClient()

    return await supabase.from(DATABASE_NAME).insert(data)
  }
}
