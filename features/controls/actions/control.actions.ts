'use server'

import { revalidatePath } from 'next/cache'
import { AdminRoutes } from '@/common/types/routes.types'
import { controlService } from '../services/control.service'
import { CreateControlSchema, UpdateControlSchema, ControlFiltersSchema } from '../dto/control.dto'

export async function createControl(formData: FormData) {
  const data = {
    user_id: formData.get('user_id') as string,
    consultation_date: formData.get('consultation_date') as string,
    notes: formData.get('notes') as string
  }

  const validation = CreateControlSchema.safeParse(data)

  if (!validation.success) {
    return { 
      error: validation.error.errors.map(e => e.message).join(', ')
    }
  }

  const result = await controlService.createControl(validation.data)

  if (result.error) {
    return { error: result.error }
  }

  revalidatePath(AdminRoutes.HOME)
  revalidatePath(AdminRoutes.USERS)
  revalidatePath('/admin/controls')
  return { success: true, data: result.data }
}

export async function updateControl(formData: FormData) {
  const data = {
    id: formData.get('id') as string,
    consultation_date: formData.get('consultation_date') as string,
    notes: formData.get('notes') as string
  }

  const validation = UpdateControlSchema.safeParse(data)

  if (!validation.success) {
    return { 
      error: validation.error.errors.map(e => e.message).join(', ')
    }
  }

  const result = await controlService.updateControl(validation.data)

  if (result.error) {
    return { error: result.error }
  }

  revalidatePath(AdminRoutes.HOME)
  revalidatePath(AdminRoutes.USERS)
  revalidatePath('/admin/controls')
  return { success: true, data: result.data }
}

export async function deleteControl(id: string) {
  const result = await controlService.deleteControl(id)

  if (result.error) {
    return { error: result.error }
  }

  revalidatePath(AdminRoutes.HOME)
  revalidatePath(AdminRoutes.USERS)
  revalidatePath('/admin/controls')
  return { success: true }
}

export async function getAllControls() {
  const result = await controlService.getAllControls()

  if (result.error) {
    return { error: result.error, data: null }
  }

  return { data: result.data, error: null }
}

export async function getControlsByUserId(userId: string) {
  const result = await controlService.getControlsByUserId(userId)

  if (result.error) {
    return { error: result.error, data: null }
  }

  return { data: result.data, error: null }
}

export async function getControlsByFilters(formData: FormData) {
  const data = {
    user_id: formData.get('user_id') as string || undefined,
    date_from: formData.get('date_from') as string || undefined,
    date_to: formData.get('date_to') as string || undefined
  }

  const validation = ControlFiltersSchema.safeParse(data)

  if (!validation.success) {
    return { 
      error: validation.error.errors.map(e => e.message).join(', '),
      data: null
    }
  }

  const result = await controlService.getControlsByFilters(validation.data)

  if (result.error) {
    return { error: result.error, data: null }
  }

  return { data: result.data, error: null }
}