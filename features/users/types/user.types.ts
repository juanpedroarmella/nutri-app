export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface User {
  id: string
  firstName: string
  lastName: string
  role: UserRole
  phone: number | null
  email: string
  idAuth: string
}
