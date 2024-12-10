import { AuthUser } from '@/features/auth/types/auth.types'
import { UserEntity } from '../entity/user.entity'
import { User } from '../types/user.types'

export class UserDto {
  constructor(
    private userData: UserEntity,
    private authData: AuthUser
  ) {}

  static getUsers(data: UserEntity[], authData: AuthUser[]): User[] {
    const users = data.map((user) => {
      const authD = authData.find(auth => auth.id === user.id_auth)
      if (!authD) {
        return null
      }
      return new UserDto(user, authD).getUser()
    })

    return users.filter(user => user !== null) as User[]
  }

  getUser(): User {
    return {
      id: this.userData.id,
      email: this.authData.email,
      firstName: this.userData.first_name,
      lastName: this.userData.last_name,
      role: this.userData.role,
      phone: this.userData.phone,
      idAuth: this.userData.id_auth
    }
  }
}
