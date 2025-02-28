import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { authService } from '@/features/auth/services/auth.service'

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await authService.isCurrentUserAdmin()
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'No tienes permisos para subir documentos' }, 
        { status: 403 }
      )
    }

    const { fileName, fileType, isPublic, userId } = await request.json()

    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: 'Nombre y tipo de archivo son requeridos' }, 
        { status: 400 }
      )
    }

    if (!isPublic && !userId) {
      return NextResponse.json(
        { error: 'Debes asignar un usuario al documento' }, 
        { status: 400 }
      )
    }

    // Generar nombre único para el archivo
    const fileExt = fileName.split('.').pop()
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    
    // Generar la ruta en S3
    const s3Key = isPublic
      ? `public/${uniqueFileName}`
      : `users/${userId}/${uniqueFileName}`

    // Crear cliente S3
    const s3Client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
      }
    })

    // Crear comando para subir archivo
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: s3Key,
      ContentType: fileType
    })

    // Generar URL prefirmada
    const presignedUrl = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 3600 })

    return NextResponse.json({
      presignedUrl,
      s3Key,
      fileName: uniqueFileName
    })
  } catch (error) {
    console.error('Error generating presigned URL:', error)
    return NextResponse.json(
      { error: 'Error al generar URL para subir documento' }, 
      { status: 500 }
    )
  }
} 