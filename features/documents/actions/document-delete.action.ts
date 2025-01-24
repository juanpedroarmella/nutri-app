'use server'

import { createClientAdmin } from '@/common/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteDocument(id: string) {
  try {
    const supabase = await createClientAdmin()
    
    // Primero obtenemos el documento para saber su ruta
    const { data: document, error: fetchError } = await supabase
      .from('documents')
      .select('url')
      .eq('id', id)
      .single()
    
    if (fetchError) throw fetchError
    
    // Eliminamos el archivo del storage
    const { error: storageError } = await supabase.storage
      .from('documents')
      .remove([document.url])
    
    if (storageError) throw storageError
    
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