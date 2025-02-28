import { NextRequest, NextResponse } from 'next/server'
import { createClientAdmin } from '@/common/utils/supabase/server'
import { authService } from '@/features/auth/services/auth.service'
import { s3Service } from '@/features/documents/services/s3.service'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await authService.isCurrentUserAdmin()
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'No tienes permisos para guardar documentos' }, 
        { status: 403 }
      )
    }

    const { name, s3Key, size, type, isPublic, userId } = await request.json()

    if (!name || !s3Key || !size || !type) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' }, 
        { status: 400 }
      )
    }

    if (!isPublic && !userId) {
      return NextResponse.json(
        { error: 'Debes asignar un usuario al documento' }, 
        { status: 400 }
      )
    }

    // Obtener URL firmada
    const url = await s3Service.getSignedUrl(s3Key)

    // Guardar en la base de datos
    const supabase = await createClientAdmin()
    const { data: document, error: dbError } = await supabase
      .from('documents')
      .insert({
        name,
        url,
        s3_key: s3Key,
        size,
        type,
        is_public: isPublic,
        user_id: isPublic ? null : userId
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Error al guardar el documento en la base de datos' }, 
        { status: 500 }
      )
    }

    // Revalidar rutas
    revalidatePath('/admin/documents')
    if (userId) {
      revalidatePath(`/admin/users/${userId}`)
    }

    return NextResponse.json({ success: true, document })
  } catch (error) {
    console.error('Error saving document metadata:', error)
    return NextResponse.json(
      { error: 'Error al guardar la información del documento' }, 
      { status: 500 }
    )
  }
} 