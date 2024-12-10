import { BaseEntity } from '@/common/types/base.types'

export interface ClinicalDataEntity extends BaseEntity {
  id_user: string
  age: number
  size: number
  weight: number
  imc: number
  birth_date: Date
  occupation: string
  reason_for_consultation: string
  patologies: string
  clinical_history: string
  medications: string
  clinical_analyses: string
  prev_nutr_treatments: string
  daily_routine: number
  food_like: string
  food_dislike: string
  food_routine: string
  water_consumption: string
  seasonings_consumption: string
  possible_treatment: string
  observations: string
  supplements:string
}
