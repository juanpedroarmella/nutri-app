'use server'

import { createClientAdmin } from '@/common/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { CreateDocumentDTO, Document } from '../types/document.types'

const BUCKET_NAME = 'documents'

export async function uploadDocument(formData: FormData) {
  try {
    const file = formData.get('file') as File
    const name = formData.get('name') as string
    const isPublic = formData.get('isPublic') === 'on'
    const userId = formData.get('userId') as string | undefined

    if (!file || !name) {
      return { error: 'Todos los campos son requeridos' }
    }

    const supabase = await createClientAdmin()

    // Convertir el File a ArrayBuffer para poder subirlo
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = isPublic ? `public/${fileName}` : `users/${userId}/${fileName}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType: file.type
      })

    if (uploadError) throw uploadError

    const { data: document, error: dbError } = await supabase
      .from('documents')
      .insert({
        name,
        url: uploadData.path,
        size: file.size,
        type: file.type,
        isPublic,
        userId: isPublic ? null : userId
      })
      .select()
      .single()

    if (dbError) throw dbError

    revalidatePath('/admin/documents')
    return { success: true }
  } catch (error) {
    console.error('Upload error:', error)
    return { error: 'Error al subir el documento' }
  }
} 