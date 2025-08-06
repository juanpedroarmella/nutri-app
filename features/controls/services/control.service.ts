import { authService } from '@/features/auth/services/auth.service'
import { ControlRepository } from '../repository/control.repository'
import { CreateControlRequest, UpdateControlRequest, ControlFilters } from '../types/control.types'

export class ControlService {
  private static instance: ControlService | null = null
  private readonly repository: ControlRepository
  private readonly authService: typeof authService

  private constructor() {
    this.repository = new ControlRepository()
    this.authService = authService
  }

  public static getInstance(): ControlService {
    if (!ControlService.instance) {
      ControlService.instance = new ControlService()
    }
    return ControlService.instance
  }

  async getAllControls() {
    const isAdmin = await this.authService.isCurrentUserAdmin()

    if (!isAdmin) {
      return { error: 'No tienes permisos para ver todos los controles', data: null }
    }

    const { data, error } = await this.repository.getAllControls()

    if (error) return { error: error.message, data: null }

    return { data, error: null }
  }

  async getControlsByUserId(userId: string) {
    const currentUser = await this.authService.getCurrentUser()
    const isAdmin = await this.authService.isCurrentUserAdmin()

    if (!currentUser) {
      return { error: 'Usuario no autenticado', data: null }
    }

    // Solo permitir acceso si es admin o el propio usuario
    if (!isAdmin && currentUser.id !== userId) {
      return { error: 'No tienes permisos para ver estos controles', data: null }
    }

    const { data, error } = await this.repository.getControlsByUserId(userId)

    if (error) return { error: error.message, data: null }

    return { data, error: null }
  }

  async getControlsByFilters(filters: ControlFilters) {
    const isAdmin = await this.authService.isCurrentUserAdmin()

    if (!isAdmin) {
      return { error: 'No tienes permisos para filtrar controles', data: null }
    }

    const { data, error } = await this.repository.getControlsByFilters(filters)

    if (error) return { error: error.message, data: null }

    return { data, error: null }
  }

  async getControl(id: string) {
    const isAdmin = await this.authService.isCurrentUserAdmin()

    if (!isAdmin) {
      return { error: 'No tienes permisos para ver este control', data: null }
    }

    const { data, error } = await this.repository.getControl(id)

    if (error) return { error: error.message, data: null }

    return { data, error: null }
  }

  async createControl(controlData: CreateControlRequest) {
    const isAdmin = await this.authService.isCurrentUserAdmin()
    const currentUser = await this.authService.getCurrentUser()

    if (!isAdmin || !currentUser) {
      return { error: 'No tienes permisos para crear controles' }
    }

    const { data, error } = await this.repository.createControl({
      user_id: controlData.user_id,
      id_auth: currentUser.id,
      consultation_date: controlData.consultation_date,
      notes: controlData.notes
    })

    if (error) return { error: error.message }

    return { data }
  }

  async updateControl(controlData: UpdateControlRequest) {
    const isAdmin = await this.authService.isCurrentUserAdmin()

    if (!isAdmin) {
      return { error: 'No tienes permisos para actualizar controles' }
    }

    const { id, ...updateData } = controlData
    const { data, error } = await this.repository.updateControl(id, updateData)

    if (error) return { error: error.message }

    return { data }
  }

  async deleteControl(id: string) {
    const isAdmin = await this.authService.isCurrentUserAdmin()

    if (!isAdmin) {
      return { error: 'No tienes permisos para eliminar controles' }
    }

    const { error } = await this.repository.deleteControl(id)

    if (error) return { error: error.message }

    return { success: true }
  }
}

export const controlService = ControlService.getInstance()