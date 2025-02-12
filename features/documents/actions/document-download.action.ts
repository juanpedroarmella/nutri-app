'use server'

import { createClientAdmin } from '@/common/utils/supabase/server'
import { s3Service } from '../services/s3.service'
import { GetObjectCommand } from '@aws-sdk/client-s3'
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

    // Obtener el archivo desde S3
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: document.s3_key
    })

    const { Body, ContentLength, ContentType } = await s3Service.client.send(command)

    if (!Body) {
      throw new Error('No se pudo obtener el archivo')
    }

    // Convertir el stream a un array buffer
    const chunks = []
    for await (const chunk of Body as any) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)

    // Devolver los datos necesarios para crear la Response en el cliente
    const res = {
      buffer: buffer.toString('base64'),
      contentType: ContentType || document.type,
      contentLength: ContentLength?.toString() || buffer.length.toString(),
      fileName: document.name
    }

    return res
  } catch (error) {
    console.error('Download error:', error)
    throw new Error('No se pudo descargar el documento')
  }
} 