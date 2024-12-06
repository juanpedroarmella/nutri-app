import { BaseEntity } from '@/common/types/base.types'
import { UserRole } from '../types/user.types'

export interface UserEntity extends BaseEntity {
  first_name: string
  last_name: string
  role: UserRole
  id_auth: string
  phone: number | null
  email: string
}

