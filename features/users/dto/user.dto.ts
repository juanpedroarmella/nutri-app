import { AuthUser } from '@/features/auth/types/auth.types'
import { UserEntity } from '../entity/user.entity'
import { User, UserRole } from '../types/user.types'

export class UserDto {
  private id: string
  private email: string
  private first_name: string
  private last_name: string
  private role: UserRole
  private phone: number | null
  private id_auth: string

  constructor(userData: UserEntity, authData: AuthUser) {
    this.id = userData.id
    this.email = authData.email || ''
    this.first_name = userData.first_name
    this.last_name = userData.last_name
    this.role = userData.role
    this.phone = userData.phone
    this.id_auth = authData.id
  }

  static getUsers(data: UserEntity[], authData: AuthUser[]): User[] {
    return data.map((user, index) =>
      new UserDto(user, authData[index]).getUser()
    )
  }

  getUser(): User {
    return {
      id: this.id,
      email: this.email,
      firstName: this.first_name,
      lastName: this.last_name,
      role: this.role,
      phone: this.phone,
      idAuth: this.id_auth
    }
  }
}
