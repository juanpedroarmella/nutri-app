export interface AppointmentEntity {
  id: string
  user_id: string
  id_auth: string
  date: string
  time: string
  is_first_consultation: boolean
  created_at: Date
  updated_at: Date
}

export interface AppointmentWithUserEntity extends AppointmentEntity {
  users: {
    first_name: string
    last_name: string
  }
}
