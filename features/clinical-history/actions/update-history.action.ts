'use server'
import { revalidatePath } from 'next/cache'
import { clinicalHistoryService } from '../services/clinical-history.service'
import { ClinicalData } from '../types/clinical-history.types'
import { AdminRoutes } from '@/common/types/routes.types'
import { authService } from '@/features/auth/services/auth.service'

export const updateHistory = async (
  data: Partial<ClinicalData>,
  userId: string,
  id?: string
) => {
  const isAdmin = await authService.isCurrentUserAdmin()

  if (!isAdmin) {
    return { error: 'No tienes permisos para realizar esta acción' }
  }

  await clinicalHistoryService.updateClinicalHistory(
    data,
    userId,
    id
  )

  revalidatePath(AdminRoutes.USERS)

}
