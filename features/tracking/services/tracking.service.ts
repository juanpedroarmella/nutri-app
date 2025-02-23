import { authService } from '@/features/auth/services/auth.service'
import { TrackingRepository } from '../repository/tracking.repository'
import { CreateTrackingDTO, TrackingType } from '../types/tracking.types'

export class TrackingService {
  private static instance: TrackingService
  private repository: TrackingRepository
  private authService: typeof authService

  private constructor() {
    this.repository = new TrackingRepository()
    this.authService = authService
  }

  public static getInstance(): TrackingService {
    if (!TrackingService.instance) {
      TrackingService.instance = new TrackingService()
    }
    return TrackingService.instance
  }

  async getTrackingByUserId(userId: string, type: TrackingType) {
    const isAdmin = await this.authService.isCurrentUserAdmin()
    const currentUser = await this.authService.getCurrentUser()

    if (!currentUser) {
      return { error: 'Usuario no autenticado', data: null }
    }

    if (!isAdmin && currentUser.id !== userId) {
      return { error: 'No tienes permisos para ver este seguimiento', data: null }
    }

    const { data, error } = await this.repository.getTrackingByUserId(userId, type)

    if (error) return { error: error.message, data: null }

    return { data, error: null }
  }

  async addTracking(data: CreateTrackingDTO) {
    const isAdmin = await this.authService.isCurrentUserAdmin()

    if (!isAdmin) {
      return { error: 'No tienes permisos para añadir seguimientos' }
    }

    const { data: tracking, error } = await this.repository.addTracking({
      user_id: data.userId,
      type: data.type,
      value: data.value,
      date: data.date,
      notes: data.notes
    })

    if (error) return { error: error.message }

    return { data: tracking }
  }

  async deleteTracking(id: string) {
    const isAdmin = await this.authService.isCurrentUserAdmin()

    if (!isAdmin) {
      return { error: 'No tienes permisos para eliminar seguimientos' }
    }

    const { error } = await this.repository.deleteTracking(id)

    if (error) return { error: error.message }

    return { success: true }
  }
}

export const trackingService = TrackingService.getInstance() 