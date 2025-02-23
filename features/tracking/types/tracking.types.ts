export type TrackingType = 'hip' | 'waist'

export interface Tracking {
  id: string
  userId: string
  type: TrackingType
  value: number
  date: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CreateTrackingDTO {
  userId: string
  type: TrackingType
  value: number
  date: Date
  notes?: string
} 