import { BaseEntity } from '@/common/types/base.types'

export interface ControlEntity extends BaseEntity {
  user_id: string
  id_auth: string
  consultation_date: string
  notes: string
}

export interface ControlWithUserEntity extends ControlEntity {
  users: {
    first_name: string
    last_name: string
    email: string
  }
}