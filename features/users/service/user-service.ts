import { AuthRepository } from '@/features/auth/repository/auth.repository'
import { UserRepository } from '../repository/user.repository'
import { User } from '@/common/types/user.types'

export class UserService {
  private readonly userRepository = new UserRepository()
  private readonly authRepository = new AuthRepository()

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

  async deleteUser(userId: string) {
    return await this.userRepository.deleteUser(userId)
  }

  async getUserByAuthId(userId: string) {
    return await this.userRepository.getUserByAuthId(userId)
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email)
  }
}
