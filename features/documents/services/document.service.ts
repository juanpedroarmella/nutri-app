import { createClientAdmin } from '@/common/utils/supabase/server'
import { CreateDocumentDTO, Document } from '../types/document.types'
import { s3Service } from './s3.service'

export class DocumentService {
  private static instance: DocumentService

  private constructor() {}

  public static getInstance(): DocumentService {
    if (!DocumentService.instance) {
      DocumentService.instance = new DocumentService()
    }
    return DocumentService.instance
  }

  async uploadDocument(data: CreateDocumentDTO): Promise<Document> {
    const { file, name, isPublic, userId } = data
    const supabase = await createClientAdmin()

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Generate S3 key
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const s3Key = isPublic
      ? `public/${fileName}`
      : `users/${userId}/${fileName}`

    // Upload to S3
    await s3Service.uploadFile(buffer, s3Key, file.type)

    // Get signed URL
    const url = await s3Service.getSignedUrl(s3Key)

    console.log('url', url)

    // Save to database
    const { data: document, error: dbError } = await supabase
      .from('documents')
      .insert({
        name,
        url,
        s3_key: s3Key,
        size: file.size,
        type: file.type,
        is_public: isPublic,
        user_id: isPublic ? null : userId
      })
      .select()
      .single()

    if (dbError) throw dbError

    return document
  }

  async getDocuments(): Promise<Document[]> {
    const supabase = await createClientAdmin()
    const { data: documents, error } = await supabase
      .from('documents')
      .select(`
        id,
        name,
        size,
        type,
        is_public,
        user_id,
        created_at,
        updated_at,
        s3_key
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return documents.map(doc => ({
      id: doc.id,
      name: doc.name,
      size: doc.size,
      type: doc.type,
      isPublic: doc.is_public,
      userId: doc.user_id,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at,
      s3_key: doc.s3_key
    }))
  }

  async getDocumentsByUser(userId: string): Promise<Document[]> {
    const supabase = await createClientAdmin()

    // Obtener documentos del usuario
    const { data: documents, error: docsError } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (docsError) throw docsError

    // Obtener información del usuario
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, first_name, last_name, id_auth')
      .eq('id_auth', userId)
      .single()

    if (userError) throw userError

    // Combinar los datos
    return documents.map(doc => ({
      id: doc.id,
      name: doc.name,
      size: doc.size,
      type: doc.type,
      isPublic: doc.is_public,
      userId: doc.user_id,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at,
      s3_key: doc.s3_key,
      user: !doc.is_public
        ? {
            id: userId,
            firstName: user.first_name,
            lastName: user.last_name
          }
        : undefined
    } as Document))
  }

  async getAllDocuments() {
    const supabase = await createClientAdmin()

    // Primero obtenemos todos los documentos
    const { data: documents, error: docsError } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false })

    if (docsError) throw docsError

    // Obtenemos todos los usuarios necesarios
    const userIds = documents
      .filter(doc => !doc.is_public && doc.user_id)
      .map(doc => doc.user_id)

    if (userIds.length === 0) {
      return documents.map(doc => ({
        ...doc,
        isPublic: doc.is_public,
        userId: doc.user_id
      }))
    }

    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, first_name, last_name, id_auth')
      .in('id_auth', userIds)

    if (usersError) throw usersError

    // Crear un mapa de usuarios para búsqueda rápida
    const userMap = new Map(users.map(user => [user.id_auth, user]))

    // Combinar los datos
    return documents.map(doc => ({
      id: doc.id,
      name: doc.name,
      size: doc.size,
      type: doc.type,
      isPublic: doc.is_public,
      userId: doc.user_id,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at,
      s3_key: doc.s3_key,
      user:
        doc.user_id && !doc.is_public
          ? {
              id: doc.user_id,
              firstName: userMap.get(doc.user_id)?.first_name || '',
              lastName: userMap.get(doc.user_id)?.last_name || ''
            }
          : undefined
    }))
  }

  async deleteDocument(id: string): Promise<void> {
    const supabase = await createClientAdmin()

    const { data: document } = await supabase
      .from('documents')
      .select('s3_key')
      .eq('id', id)
      .single()

    if (document) {
      await s3Service.deleteFile(document.s3_key)
      const { error } = await supabase.from('documents').delete().eq('id', id)
      if (error) throw error
    }
  }

  async getPublicDocuments(): Promise<Document[]> {
    const supabase = await createClientAdmin()

    const { data: documents, error } = await supabase
      .from('documents')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    if (error) throw error

    return documents.map(
      doc =>
        ({
          id: doc.id,
          name: doc.name,
          size: doc.size,
          type: doc.type,
          isPublic: doc.is_public,
          userId: doc.user_id,
          createdAt: doc.created_at,
          updatedAt: doc.updated_at,
          s3_key: doc.s3_key
        }) as Document
    )
  }
}

export const documentService = DocumentService.getInstance()
