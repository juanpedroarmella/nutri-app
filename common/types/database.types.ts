import { UserEntity } from '@/features/users/entity/user.entity'

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
    }
  }
}
