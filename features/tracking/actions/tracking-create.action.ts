'use server'

import { trackingService } from '../services/tracking.service'
import { revalidatePath } from 'next/cache'
import { TrackingType } from '../types/tracking.types'

interface State {
  error?: string
  success: boolean
}

export async function createTracking(
  userId: string,
  type: TrackingType,
  value: number,
  date: Date,
  notes?: string
): Promise<State> {
  try {
    const result = await trackingService.addTracking({
      userId,
      type,
      value,
      date,
      notes
    })

    if (result.error) {
      return { error: result.error, success: false }
    }

    revalidatePath(`/admin/users/${userId}`)
    return { success: true }
  } catch (error) {
    console.error('Create tracking error:', error)
    return { error: 'Error al crear el seguimiento', success: false }
  }
} 