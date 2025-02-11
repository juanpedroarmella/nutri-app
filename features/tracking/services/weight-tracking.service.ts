import { authService } from '@/features/auth/services/auth.service'
import { WeightTrackingRepository } from '../repository/weight-tracking.repository'
import { WeightTrackingDto } from '../dto/weight-tracking.dto'

export class WeightTrackingService {
  private static instance: WeightTrackingService | null = null
  private readonly repository: WeightTrackingRepository
  private readonly authService: typeof authService

  private constructor() {
    this.repository = new WeightTrackingRepository()
    this.authService = authService
  }

  public static getInstance(): WeightTrackingService {
    if (!WeightTrackingService.instance) {
      WeightTrackingService.instance = new WeightTrackingService()
    }
    return WeightTrackingService.instance
  }

  async getWeightTrackingByUserId(userId: string) {
    const isAdmin = await this.authService.isCurrentUserAdmin()
    const currentUser = await this.authService.getCurrentUser()

    if (!currentUser) {
      return { error: 'Usuario no autenticado', data: null }
    }

    if (!isAdmin && currentUser.id !== userId) {
      return { error: 'No tienes permisos para ver este seguimiento', data: null }
    }

    const { data, error } = await this.repository.getWeightTrackingByUserId(
      userId,
      isAdmin
    )

    if (error) return { error: error.message, data: null }

    return {
      data: data.map(item => new WeightTrackingDto(item).toWeightTracking()),
      error: null
    }
  }

  async addWeightTracking(userId: string, weight: number, date: Date, notes?: string) {
    const isAdmin = await this.authService.isCurrentUserAdmin()

    if (!isAdmin) {
      return { error: 'No tienes permisos para añadir seguimientos' }
    }

    const { data, error } = await this.repository.addWeightTracking({
      user_id: userId,
      weight,
      date,
      notes
    })

    if (error) return { error: error.message }

    return { data: new WeightTrackingDto(data).toWeightTracking() }
  }

  async deleteWeightTracking(id: string) {
    const isAdmin = await this.authService.isCurrentUserAdmin()

    if (!isAdmin) {
      return { error: 'No tienes permisos para eliminar seguimientos' }
    }

    const { error } = await this.repository.deleteWeightTracking(id)

    if (error) return { error: error.message }

    return { success: true }
  }
}

export const weightTrackingService = WeightTrackingService.getInstance() 