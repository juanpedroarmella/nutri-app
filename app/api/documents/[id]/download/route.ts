import { NextRequest, NextResponse } from 'next/server'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { createClientAdmin } from '@/common/utils/supabase/server'
import { authService } from '@/features/auth/services/auth.service'
import { s3Service } from '@/features/documents/services/s3.service'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const supabase = await createClientAdmin()
    const { data: document, error } = await supabase
      .from('documents')
      .select('s3_key, name, type, is_public, user_id')
      .eq('id', id)
      .single()

    if (error || !document) {
      return NextResponse.json(
        { error: 'No se encontró el documento' },
        { status: 404 }
      )
    }

    const currentUser = await authService.getCurrentUser()
    const isAdmin = await authService.isCurrentUserAdmin()

    if (
      !document.is_public &&
      !isAdmin &&
      (!currentUser || currentUser.id !== document.user_id)
    ) {
      return NextResponse.json(
        { error: 'No tienes permisos para descargar este documento' },
        { status: 403 }
      )
    }

    const result = await s3Service.client.send(
      new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: document.s3_key
      })
    )

    if (!result.Body) {
      return NextResponse.json(
        { error: 'No se pudo obtener el archivo' },
        { status: 500 }
      )
    }

    const headers = new Headers({
      'Content-Type': document.type,
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(document.name)}`,
      'Cache-Control': 'private, no-store'
    })
    if (result.ContentLength) {
      headers.set('Content-Length', result.ContentLength.toString())
    }

    return new NextResponse(result.Body.transformToWebStream(), { headers })
  } catch (e) {
    console.error('Document download error:', e)
    return NextResponse.json(
      { error: 'No se pudo descargar el documento' },
      { status: 500 }
    )
  }
}
