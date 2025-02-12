import AppointmentSection from '@/features/appointments/components/appointment-section.component'
import { User } from '../../types/user.types'

interface AppointmentsTabProps {
  user: User
}

export default function AppointmentsTab({ user }: AppointmentsTabProps) {
  return (
    <AppointmentSection 
      userId={user.idAuth} 
      isAdmin={true} 
      showUserInfo={false}
      title={`Turnos: ${user.firstName} ${user.lastName}`}
    />
  )
} 