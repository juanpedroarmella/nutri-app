'use server'

import { documentService } from '../services/document.service'
import { revalidatePath } from 'next/cache'
import { authService } from '@/features/auth/services/auth.service'

interface State {
  error?: string
  success: boolean
}

export async function uploadDocument(formData: FormData): Promise<State> {
  try {
    const isAdmin = await authService.isCurrentUserAdmin()

    if (!isAdmin) {
      return { error: 'No tienes permisos para subir documentos', success: false }
    }

    const file = formData.get('file') as File
    const name = formData.get('name') as string
    const isPublic = formData.get('isPublic') === 'on'
    const userId = formData.get('userId') as string | undefined

    if (!file || !name) {
      return { error: 'Todos los campos son requeridos', success: false }
    }

    if (!isPublic && !userId) {
      return { error: 'Debes asignar un usuario al documento', success: false }
    }

    await documentService.uploadDocument({
      file,
      name,
      isPublic,
      userId
    })

    revalidatePath('/admin/documents')
    return { success: true }
  } catch (error) {
    console.error('Upload error:', error)
    return { error: 'Error al subir el documento', success: false }
  }
}
