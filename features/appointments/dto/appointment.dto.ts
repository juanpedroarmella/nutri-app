import {
  AppointmentEntity,
  AppointmentWithUserEntity
} from '../entity/appointment.entity'
import { Appointment } from '../types/appointment.types'

export class AppointmentDto {
  constructor(
    private readonly entity: AppointmentEntity | AppointmentWithUserEntity
  ) {}

  toAppointment(): Appointment {
    const appointment: Appointment = {
      id: this.entity.id,
      userId: this.entity.user_id,
      idAuth: this.entity.id_auth,
      date: this.entity.date,
      time: this.entity.time,
      isFirstConsultation: this.entity.is_first_consultation,
      createdAt: this.entity.created_at,
      updatedAt: this.entity.updated_at
    }

    if ('users' in this.entity) {
      appointment.user = {
        firstName: this.entity.users.first_name,
        lastName: this.entity.users.last_name
      }
    }

    return appointment
  }
}
