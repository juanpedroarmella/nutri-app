import { createClient, createClientAdmin } from '@/common/utils/supabase/server'
import { CreateDocumentDTO, Document } from '../types/document.types'

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

  async getDocumentsByUser(userId?: string): Promise<Document[]> {
    const supabase = await createClient()
    let query = supabase.from('documents').select('*')

    if (userId) {
      query = query.or(`userId.eq.${userId},isPublic.eq.true`)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  }

  async getAllDocuments(): Promise<Document[]> {
    const supabase = await createClientAdmin()
    const { data, error } = await supabase.from('documents').select('*')

    //if (error) throw error

    return data || []
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
}

export const documentService = DocumentService.getInstance()
