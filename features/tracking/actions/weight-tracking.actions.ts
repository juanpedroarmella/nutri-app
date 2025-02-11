'use server'

import { revalidatePath } from 'next/cache'
import { weightTrackingService } from '../services/weight-tracking.service'

export async function addWeightTracking(
  userId: string,
  weight: number,
  date: Date,
  notes?: string
) {
  const result = await weightTrackingService.addWeightTracking(
    userId,
    weight,
    date,
    notes
  )

  if (result.error) {
    return { error: result.error }
  }

  revalidatePath(`/admin/users/${userId}`)
  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteWeightTracking(id: string, userId: string) {
  const result = await weightTrackingService.deleteWeightTracking(id)

  if (result.error) {
    return { error: result.error }
  }

  revalidatePath(`/admin/users/${userId}`)
  revalidatePath('/dashboard')
  return { success: true }
} 