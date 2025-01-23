export interface Document {
  id: string
  name: string
  url: string
  size: number
  type: string
  isPublic: boolean
  userId?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateDocumentDTO {
  name: string
  file: File  
  isPublic: boolean
  userId?: string // Opcional: si no es público, se asigna a un usuario
} 