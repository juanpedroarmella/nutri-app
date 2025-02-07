import { sendWelcomeEmail } from '@/features/email/services/email.service'
import { UserRepository } from '@/features/users/repository/user.repository'
import { AuthRepository } from '../repository/auth.repository'
import { AuthDTO } from '../dto/auth.dto'
import { CreateUserRequest } from '../types/auth.types'
import { UserRole } from '@/features/users/types/user.types'

export class AuthService {
  private static instance: AuthService | null = null
  private readonly authRepository: AuthRepository
  private readonly userRepository: UserRepository

  private constructor() {
    this.authRepository = new AuthRepository()
    this.userRepository = new UserRepository()
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async getCurrentUser() {
    const res = await this.authRepository.getCurrentUser()
    if (!res) {
      return null
    }

    const userDto = new AuthDTO(res).getUser()

    return userDto
  }

  async getUsers() {
    const res = await this.authRepository.getUsers()

    if (res.error) {
      return { error: res.error, data: [] }
    }

    const users = AuthDTO.getUsers(res.data.users)

    return { data: users, error: null }
  }

  async getUser(userId: string) {
    const user = await this.authRepository.getUser(userId)

    if (!user.data.user) {
      return null
    }

    const userDto = new AuthDTO(user.data.user).getUser()

    return userDto
  }

  async signOut() {
    return await this.authRepository.signOut()
  }

  async signIn(email: string, password: string) {
    return await this.authRepository.signIn(email, password)
  }

  async createUser(data: CreateUserRequest) {
    const password = this.generateRandomPassword()

    const res = await this.authRepository.createUser({
      ...data,
      password
    })

    if (res.error) {
      console.error('Error creating user:', res.error)
      return { error: res.error }
    }

    const welcomeEmail = await sendWelcomeEmail(data.email, password)

    if (welcomeEmail.error) {
      console.error('Error sending welcome email:', welcomeEmail.error)
    }

    return { ...res, welcomeEmail }
  }

  private generateRandomPassword(): string {
    const length = 7
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    let password = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      password += charset[randomIndex]
    }
    return password
  }

  async isCurrentUserAdmin() {
    const currentUser = await this.getCurrentUser()

    if (!currentUser?.id) {
      return false
    }

    const user = await this.userRepository.getUserByAuthId(currentUser?.id)

    return user?.role === UserRole.ADMIN
  }

  async editMe(data: { password: string }) {
    return await this.authRepository.editMe(data)
  }

  async exchangeCodeForSession(code: string) {
    return await this.authRepository.exchangeCodeForSession(code)
  }

  async deleteUser(userId: string) {
    return await this.authRepository.deleteUser(userId)
  }

}

export const authService = AuthService.getInstance()
