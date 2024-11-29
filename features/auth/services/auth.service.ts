import { UserRole } from '@/common/types/user.types'
import { UserRepository } from '@/features/users/repository/user.repository'
import { AuthRepository } from '../repository/auth.repository'

export class AuthService {
  private readonly authRepository = new AuthRepository()
  private readonly userRepository = new UserRepository()

  async getCurrentUser() {
    return await this.authRepository.getCurrentUser()
  }

  async signOut() {
    return await this.authRepository.signOut()
  }

  async signIn(email: string, password: string) {
    return await this.authRepository.signIn(email, password)
  }

  private getDefaultPassword(email: string) {
    const emailLocalPart = email.split('@')[0]
    return `${emailLocalPart}1234`
  }

  async createUser(data: {
    email: string
    name: string
    surname: string
    role: string
  }) {
    const password = this.getDefaultPassword(data.email)

    return await this.authRepository.createUser({ ...data, password })
  }

  async isCurrentUserAdmin() {
    const currentUser = await this.getCurrentUser()

    if (!currentUser?.id) {
      return false
    }
    const user = await this.userRepository.getUser(currentUser?.id)

    return user?.role === UserRole.ADMIN
  }

  async editMe(data: { password: string }) {
    return await this.authRepository.editMe(data)
  }

  async exchangeCodeForSession(code: string) {
    return await this.authRepository.exchangeCodeForSession(code)
  }
}
