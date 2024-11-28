import { BaseEntity } from './base.types'

export interface User extends BaseEntity {
  first_name: string
  last_name: string
  role: UserRole
  email: string
  id_auth: string
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}
