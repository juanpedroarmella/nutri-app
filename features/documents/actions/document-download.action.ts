'use server'

import { createClientAdmin } from '@/common/utils/supabase/server'
import { s3Service } from '../services/s3.service'
import { authService } from '@/features/auth/services/auth.service'

export async function downloadDocument(id: string) {
  try {
    const supabase = await createClientAdmin()
    const { data: document, error } = await supabase
      .from('documents')
      .select('s3_key, name, type, is_public, user_id')
      .eq('id', id)
      .single()
    
    if (error || !document) {
      throw new Error('No se encontró el documento')
    }

    // Verificar permisos
    const currentUser = await authService.getCurrentUser()
    const isAdmin = await authService.isCurrentUserAdmin()

    if (!document.is_public && !isAdmin && (!currentUser || currentUser.id !== document.user_id)) {
      throw new Error('No tienes permisos para descargar este documento')
    }

    // Obtener la URL firmada para descargar el archivo desde S3
    const signedUrl = await s3Service.getSignedUrl(document.s3_key)

    // Devolver la URL firmada, el nombre del archivo y el tipo de contenido
    return {
      signedUrl,
      fileName: document.name,
      contentType: document.type
    }
  } catch (error) {
    console.error('Download action error:', error)
    return { error: 'No se pudo obtener la URL de descarga' }
  }
} 