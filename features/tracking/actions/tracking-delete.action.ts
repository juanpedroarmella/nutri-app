'use server'

import { trackingService } from '../services/tracking.service'
import { revalidatePath } from 'next/cache'

export async function deleteTracking(id: string, userId: string) {
  try {
    const result = await trackingService.deleteTracking(id)

    if (result.error) {
      return { error: result.error }
    }

    revalidatePath(`/admin/users/${userId}`)
    return { success: true }
  } catch (error) {
    console.error('Delete tracking error:', error)
    return { error: 'Error al eliminar el seguimiento' }
  }
} 