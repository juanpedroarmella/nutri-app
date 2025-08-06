export interface CreateControlRequest {
  user_id: string
  consultation_date: string
  notes: string
}

export interface UpdateControlRequest {
  id: string
  consultation_date?: string
  notes?: string
}

export interface ControlFilters {
  user_id?: string
  date_from?: string
  date_to?: string
}