import { User } from '@supabase/supabase-js'
import { AuthUser } from '../types/auth.types'

export class AuthDTO {
  private id: string
  private email?: string

  constructor(data: User) {
    this.id = data.id
    this.email = data.email
  }

  static getUsers(data: User[]) {
    return data.map(user => new AuthDTO(user).getUser())
  }

  getUser(): AuthUser {
    return {
      id: this.id,
      email: this.email || ''
    }
  }
}
