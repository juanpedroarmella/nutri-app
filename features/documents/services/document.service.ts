import { createClient, createClientAdmin } from '@/common/utils/supabase/server'
import { CreateDocumentDTO, Document } from '../types/document.types'
import { User } from '@/features/users/types/user.types'

const BUCKET_NAME = 'documents'

export class DocumentService {
  private static instance: DocumentService;

  private constructor() {}

  public static getInstance(): DocumentService {
    if (!DocumentService.instance) {
      DocumentService.instance = new DocumentService();
    }
    return DocumentService.instance;
  }

  async uploadDocument(data: CreateDocumentDTO): Promise<Document> {
    const { file, name, isPublic, userId } = data
    const supabase = await createClientAdmin()

    // Convertir el File a ArrayBuffer para poder subirlo desde el servidor
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = isPublic
      ? `public/${fileName}`
      : `users/${userId}/${fileName}`

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

    return document
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
      url: doc.url,
      size: doc.size,
      type: doc.type,
      isPublic: doc.is_public,
      userId: doc.user_id,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at,
      user: !doc.is_public ? {
        id: userId,
        firstName: user.first_name,
        lastName: user.last_name
      } : undefined
    }))
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
      url: doc.url,
      size: doc.size,
      type: doc.type,
      isPublic: doc.is_public,
      userId: doc.user_id,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at,
      user: doc.user_id && !doc.is_public ? {
        id: doc.user_id,
        firstName: userMap.get(doc.user_id)?.first_name || '',
        lastName: userMap.get(doc.user_id)?.last_name || ''
      } : undefined
    }))
  }

  async deleteDocument(id: string): Promise<void> {
    const supabase = await createClientAdmin()

    const { data: document } = await supabase
      .from('documents')
      .select('url')
      .eq('id', id)
      .single()

    if (document) {
      await supabase.storage.from(BUCKET_NAME).remove([document.url])
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

    return documents.map(doc => ({
      id: doc.id,
      name: doc.name,
      url: doc.url,
      size: doc.size,
      type: doc.type,
      isPublic: doc.is_public,
      userId: doc.user_id,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at
    }))
  }
}

export const documentService = DocumentService.getInstance()
