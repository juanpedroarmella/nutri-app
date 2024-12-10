import { AuthService, authService } from '@/features/auth/services/auth.service'
import { UserRepository } from '../repository/user.repository'
import { UserDto } from '../dto/user.dto'
import { UserEntity } from '../entity/user.entity'
import { User } from '../types/user.types'

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
      throw new Error('No se pudieron obtener los usuarios')
    }

    if (!users.data || !usersAuth.data) {
      return [] as User[]
    }

    const usersDto = UserDto.getUsers(users.data, usersAuth.data)

    return usersDto
  }

  async getCurrentUser() {
    const userAuth = await this.authService.getCurrentUser()

    if (!userAuth?.id) {
      return null
    }

    const user = await this.userRepository.getUserByAuthId(userAuth.id)

    if (!user) {
      return null
    }

    const userDto = new UserDto(user, userAuth).getUser()

    return userDto
  }

  async getUser(userId: string) {
    const user = await this.userRepository.getUser(userId)

    const userAuth = await this.authService.getUser(user.id_auth)

    if (!userAuth) {
      return null
    }

    const userDto = new UserDto(user, userAuth).getUser()

    return userDto
  }

  async editUser(userId: string, data: Partial<UserEntity>) {
    return await this.userRepository.editUser(userId, data)
  }

  async getUserByAuthId(userId: string) {
    return await this.userRepository.getUserByAuthId(userId)
  }
}

export const userService = UserService.getInstance()
