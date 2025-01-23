import { UserEntity } from '@/features/users/entity/user.entity'
import { Document } from '@/features/documents/types/document.types'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: UserEntity
        Insert: Omit<UserEntity, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserEntity, 'id' | 'created_at' | 'updated_at'>>
      }
      documents: {
        Row: Document
        Insert: Omit<Document, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Document, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}
