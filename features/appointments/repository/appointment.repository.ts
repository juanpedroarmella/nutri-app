import { createClient, createClientAdmin } from '@/common/utils/supabase/server'
import {
  AppointmentEntity,
  AppointmentWithUserEntity
} from '../entity/appointment.entity'

const DATABASE_NAME = 'appointments'

export class AppointmentRepository {
  async getAllAppointments() {
    const supabase = await createClientAdmin()

    return await supabase
      .from(DATABASE_NAME)
      .select(
        `
        *,
        users (
          first_name,
          last_name
        )
      `.trim()
      )
      .order('date', { ascending: true })
      .order('time', { ascending: true })
      .returns<AppointmentWithUserEntity[]>()
  }

  async getTodayAppointments() {
    const supabase = await createClientAdmin()

    // Crear fecha directamente en zona horaria de Argentina
    const argDate = new Date(
      new Date().toLocaleString('en-US', {
        timeZone: 'America/Argentina/Buenos_Aires'
      })
    )

    const formattedDate = argDate.toISOString().split('T')[0]

    const { data, error } = await supabase
      .from(DATABASE_NAME)
      .select(
        `
        *,
        users (
          first_name,
          last_name
        )
      `.trim()
      )
      .eq('date', formattedDate)
      .order('time', { ascending: true })
      .returns<AppointmentWithUserEntity[]>()

    return { data, error }
  }

  async getAppointmentsByUserId(userId: string) {
    const supabase = await createClient()

    return await supabase
      .from(DATABASE_NAME)
      .select('*')
      .eq('id_auth', userId)
      .order('date', { ascending: true })
      .returns<AppointmentEntity[]>()
  }

  async createAppointment(data: Partial<AppointmentEntity>) {
    const supabase = await createClientAdmin()

    return await supabase.from(DATABASE_NAME).insert(data).select().single()
  }

  async deleteAppointment(id: string) {
    const supabase = await createClientAdmin()

    return await supabase.from(DATABASE_NAME).delete().eq('id', id)
  }
}
