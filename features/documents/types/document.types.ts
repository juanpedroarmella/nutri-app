export interface Document {
  id: string
  name: string
  size: number
  type: string
  isPublic: boolean
  userId: string | null
  createdAt: string
  updatedAt: string
  s3_key: string
  user?: {
    id: string
    firstName: string
    lastName: string
  }
}

export interface CreateDocumentDTO {
  name: string
  file: File  
  isPublic: boolean
  userId?: string
} 