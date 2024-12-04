import { BaseEntity } from './base.types'

export interface User extends BaseEntity {
  first_name: string
  last_name: string
  role: UserRole
  id_auth: string
  phone: number | null
  email: string
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}
