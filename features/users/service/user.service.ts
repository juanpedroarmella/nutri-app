import { AuthService, authService } from '@/features/auth/services/auth.service'
import { UserRepository } from '../repository/user.repository'
import { User } from '@/common/types/user.types'
import { AuthUser } from '@/features/auth/types/auth.types'

export class UserService {
  private static instance: UserService | null = null
  private readonly userRepository: UserRepository
  private readonly authService: AuthService

  private constructor() {
    this.userRepository = new UserRepository()
    this.authService = authService
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  async getUsers() {
    const usersAuth = await this.authService.getUsers()
    const users = await this.userRepository.getUsers()

    if (users.error || usersAuth.error) {
      return { error: 'No se pudieron obtener los usuarios' }
    }

    if (!users.data || !usersAuth.data) {
      return { data: [] }
    }

    const res = users.data.map(user => {
      const userAuth = usersAuth.data?.find(
        userAuth => userAuth.id === user.id_auth
      )
      return { ...user, email: userAuth?.email }
    })

    return { data: res as (User & AuthUser)[] }
  }

  async getCurrentUser() {
    const userAuth = await this.authService.getCurrentUser()

    if (!userAuth?.id) {
      return null
    }

    const user = await this.userRepository.getUserByAuthId(userAuth.id)

    return { ...user, email: userAuth.email } as User & AuthUser
  }

  async getUser(userId: string) {
    const user = await this.userRepository.getUser(userId)
    const userAuth = await this.authService.getUser(user.data.id_auth)
    return {
      ...user.data,
      email: userAuth.data?.user?.email
    } as User & AuthUser
  }

  async editUser(userId: string, data: Partial<User>) {
    return await this.userRepository.editUser(userId, data)
  }

  async getUserByAuthId(userId: string) {
    return await this.userRepository.getUserByAuthId(userId)
  }
}

export const userService = UserService.getInstance()
