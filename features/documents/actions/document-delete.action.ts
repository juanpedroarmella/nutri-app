'use server'

import { createClientAdmin } from '@/common/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { s3Service } from '../services/s3.service'
import { authService } from '@/features/auth/services/auth.service'

export async function deleteDocument(id: string) {
  try {
    const isAdmin = await authService.isCurrentUserAdmin()

    if (!isAdmin) {
      throw new Error('No tienes permisos para eliminar documentos')
    }

    const supabase = await createClientAdmin()
    
    // Primero obtenemos el documento para saber su clave S3
    const { data: document, error: fetchError } = await supabase
      .from('documents')
      .select('s3_key')
      .eq('id', id)
      .single()
    
    if (fetchError) throw fetchError
    
    // Eliminamos el archivo de S3
    await s3Service.deleteFile(document.s3_key)
    
    // Eliminamos el registro de la base de datos
    const { error: deleteError } = await supabase
      .from('documents')
      .delete()
      .eq('id', id)
    
    if (deleteError) throw deleteError
    
    revalidatePath('/admin/documents')
    return { success: true }
  } catch (error) {
    console.error('Delete error:', error)
    throw error
  }
} 