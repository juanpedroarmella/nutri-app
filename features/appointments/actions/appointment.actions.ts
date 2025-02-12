'use server'

import { revalidatePath } from 'next/cache'
import { AdminRoutes } from '@/common/types/routes.types'
import { appointmentService } from '../services/appointment.service'

interface CreateAppointmentData {
  userId: string
  idAuth: string
  date: string
  time: string
  isFirstConsultation: boolean
}

export async function createAppointment(data: CreateAppointmentData) {
  const result = await appointmentService.createAppointment(data)

  if (result.error) {
    return { error: result.error }
  }

  revalidatePath(AdminRoutes.HOME)
  revalidatePath(AdminRoutes.USERS)
  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteAppointment(id: string) {
  const result = await appointmentService.deleteAppointment(id)

  if (result.error) {
    return { error: result.error }
  }

  revalidatePath(AdminRoutes.HOME)
  revalidatePath(AdminRoutes.USERS)
  revalidatePath('/dashboard')
  return { success: true }
} 