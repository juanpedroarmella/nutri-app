export interface Appointment {
  id: string
  userId: string
  idAuth: string
  date: string
  time: string
  isFirstConsultation: boolean
  createdAt: Date
  updatedAt: Date
  user?: {
    firstName: string
    lastName: string
  }
}