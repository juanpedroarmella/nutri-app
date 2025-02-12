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
  title?: string
  onlyToday?: boolean
}

export default async function AppointmentSection({
  userId,
  showUserInfo = true,
  isAdmin = false,
  title = 'Turnos',
  onlyToday = false
}: AppointmentSectionProps) {
  const { data: appointments, error } = userId
    ? await appointmentService.getAppointmentsByUserId(userId)
    : onlyToday
      ? await appointmentService.getTodayAppointments()
      : await appointmentService.getAllAppointments()

  if (error) {
    return (
      <Card>
        <CardContent className='pt-6'>
          <p className='text-destructive'>{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <AppointmentList
          appointments={appointments || []}
          showUserInfo={showUserInfo}
          isAdmin={isAdmin}
        />
      </CardContent>
    </Card>
  )
}
