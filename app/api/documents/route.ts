import { NextRequest, NextResponse } from 'next/server'
import { documentService } from '@/features/documents/services/document.service'
import { authService } from '@/features/auth/services/auth.service'
import { revalidatePath } from 'next/cache'

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false 
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await authService.isCurrentUserAdmin()
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'No tienes permisos para subir documentos' }, 
        { status: 403 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const name = formData.get('name') as string
    const isPublic = formData.get('isPublic') === 'on'
    const userId = formData.get('userId') as string | undefined

    if (!file || !name) {
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

    await documentService.uploadDocument({
      file,
      name,
      isPublic,
      userId
    })

    // Revalidar las rutas que muestran documentos
    revalidatePath('/admin/documents')
    if (userId) {
      revalidatePath(`/admin/users/${userId}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Error al subir el documento' }, 
      { status: 500 }
    )
  }
} 