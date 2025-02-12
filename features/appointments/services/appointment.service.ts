import { authService } from '@/features/auth/services/auth.service'
import { AppointmentRepository } from '../repository/appointment.repository'
import { AppointmentDto } from '../dto/appointment.dto'

export class AppointmentService {
  private static instance: AppointmentService | null = null
  private readonly repository: AppointmentRepository
  private readonly authService: typeof authService

  private constructor() {
    this.repository = new AppointmentRepository()
    this.authService = authService
  }

  public static getInstance(): AppointmentService {
    if (!AppointmentService.instance) {
      AppointmentService.instance = new AppointmentService()
    }
    return AppointmentService.instance
  }

  async getAllAppointments() {
    const isAdmin = await this.authService.isCurrentUserAdmin()

    if (!isAdmin) {
      return { error: 'No tienes permisos para ver todos los turnos', data: null }
    }

    const { data, error } = await this.repository.getAllAppointments()

    if (error) return { error: error.message, data: null }

    return {
      data: data.map(item => new AppointmentDto(item).toAppointment()),
      error: null
    }
  }

  async getTodayAppointments() {
    const isAdmin = await this.authService.isCurrentUserAdmin()

    if (!isAdmin) {
      return { error: 'No tienes permisos para ver los turnos', data: null }
    }

    const { data, error } = await this.repository.getTodayAppointments()

    if (error) return { error: error.message, data: null }

    return {
      data: data?.map(item => new AppointmentDto(item).toAppointment()),
      error: null
    }
  }

  async getAppointmentsByUserId(userId: string) {
    const currentUser = await this.authService.getCurrentUser()
    const isAdmin = await this.authService.isCurrentUserAdmin()

    if (!currentUser) {
      return { error: 'Usuario no autenticado', data: null }
    }

    // Solo permitir acceso si es admin o el propio usuario
    if (!isAdmin && currentUser.id !== userId) {
      return { error: 'No tienes permisos para ver estos turnos', data: null }
    }

    const { data, error } = await this.repository.getAppointmentsByUserId(userId)

    if (error) return { error: error.message, data: null }

    return {
      data: data.map(item => new AppointmentDto(item).toAppointment()),
      error: null
    }
  }

  async createAppointment(data: {
    userId: string
    idAuth: string
    date: string
    time: string
    isFirstConsultation: boolean
  }) {
    const isAdmin = await this.authService.isCurrentUserAdmin()

    if (!isAdmin) {
      return { error: 'No tienes permisos para crear turnos' }
    }

    const { data: appointment, error } = await this.repository.createAppointment({
      user_id: data.userId,
      id_auth: data.idAuth,
      date: data.date,
      time: data.time,
      is_first_consultation: data.isFirstConsultation
    })

    if (error) return { error: error.message }

    return { data: new AppointmentDto(appointment).toAppointment() }
  }

  async deleteAppointment(id: string) {
    const isAdmin = await this.authService.isCurrentUserAdmin()

    if (!isAdmin) {
      return { error: 'No tienes permisos para eliminar turnos' }
    }

    const { error } = await this.repository.deleteAppointment(id)

    if (error) return { error: error.message }

    return { success: true }
  }
}

export const appointmentService = AppointmentService.getInstance() 