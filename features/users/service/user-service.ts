import { AuthRepository } from '@/features/auth/repository/auth.repository'
import { UserRepository } from '../repository/user.repository'
import { User } from '@/common/types/user.types'

export class UserService {
  private static instance: UserService | null = null
  private readonly userRepository: UserRepository
  private readonly authRepository: AuthRepository

  private constructor() {
    this.userRepository = new UserRepository()
    this.authRepository = new AuthRepository()
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  async getUsers() {
    return await this.userRepository.getUsers()
  }

  async getCurrentUser() {
    const user = await this.authRepository.getCurrentUser()

    if (!user?.id) {
      return null
    }

    return await this.userRepository.getUserByAuthId(user?.id)
  }

  async getUser(userId: string) {
    return await this.userRepository.getUser(userId)
  }

  async editUser(userId: string, data: Partial<User>) {
    return await this.userRepository.editUser(userId, data)
  }

  async getUserByAuthId(userId: string) {
    return await this.userRepository.getUserByAuthId(userId)
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email)
  }

  async getUserDetails(userId: string) {
    return await this.userRepository.getUserDetails(userId)
  }
}

export const userService = UserService.getInstance()
