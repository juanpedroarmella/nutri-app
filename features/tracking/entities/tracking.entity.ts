export interface WeightTrackingEntity {
  id: string
  user_id: string
  weight: number
  date: Date
  notes?: string | null
  created_at: Date
  updated_at: Date
}