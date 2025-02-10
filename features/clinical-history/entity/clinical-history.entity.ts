import { BaseEntity } from '@/common/types/base.types'

export interface ClinicalDataEntity extends BaseEntity {
  id_user: string
  age: number | null
  size: number | null
  weight: number | null
  imc: number | null
  birth_date: Date | null
  occupation: string | null
  reason_for_consultation: string | null
  patologies: string | null
  clinical_history: string | null
  medications: string | null
  clinical_analyses: string | null
  prev_nutr_treatments: string | null
  daily_routine: number | null
  food_like: string | null
  food_dislike: string | null
  food_routine: string | null
  water_consumption: string | null
  seasonings_consumption: string | null
  possible_treatment: string | null
  observations: string | null
  supplements: string | null
}
