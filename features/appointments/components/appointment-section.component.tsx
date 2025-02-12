import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/common/components/ui/card'
import { appointmentService } from '../services/appointment.service'
import AppointmentList from './appointment-list.component'

interface AppointmentSectionProps {
  userId?: string
  showUserInfo?: boolean
  isAdmin?: boolean
  onlyToday?: boolean
}

export default async function AppointmentSection({
  userId,
  showUserInfo = true,
  isAdmin = false,
  onlyToday = false
}: AppointmentSectionProps) {
  const { data: appointments, error } = userId
    ? await appointmentService.getAppointmentsByUserId(userId)
    : onlyToday
      ? await appointmentService.getTodayAppointments()
      : await appointmentService.getAllAppointments()

  if (error) {
    return <p className='text-destructive'>{error}</p>
  }

  return (
    <AppointmentList
      appointments={appointments || []}
      showUserInfo={showUserInfo}
      isAdmin={isAdmin}
    />
  )
}
