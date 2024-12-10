import { User } from '@supabase/supabase-js'
import { AuthUser } from '../types/auth.types'

export class AuthDTO {
  constructor(private user: User) {}

  static getUsers(data: User[]) {
    return data.map(user => new AuthDTO(user).getUser())
  }

  getUser(): AuthUser {
    return {
      id: this.user.id,
      email: this.user.email || '',
    }
  }
}
