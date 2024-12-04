import { UserRole } from '@/common/types/user.types'
import { UserRepository } from '@/features/users/repository/user.repository'
import { AuthRepository } from '../repository/auth.repository'
import { sendWelcomeEmail } from '@/features/email/services/email.service'

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
    return await this.authRepository.getCurrentUser()
  }

  async signOut() {
    return await this.authRepository.signOut()
  }

  async signIn(email: string, password: string) {
    return await this.authRepository.signIn(email, password)
  }

  async createUser(data: {
    email: string
    name: string
    surname: string
    role: string
  }) {
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

    console.log('welcomeEmail', welcomeEmail)

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
    const user = await this.userRepository.getUser(currentUser?.id)

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
