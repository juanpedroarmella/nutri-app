import { AuthRoutes } from '@/common/types/routes.types'
import AppointmentSection from '@/features/appointments/components/appointment-section.component'
import { userService } from '@/features/users/service/user.service'
import { redirect } from 'next/navigation'

export default async function AppointmentsPage() {
  const user = await userService.getCurrentUser()

  if (!user) {
    return redirect(AuthRoutes.SIGN_IN)
  }

  return (
    <div className='flex-1 w-full flex flex-col gap-6 p-6 max-w-7xl mx-auto'>
      <AppointmentSection
        userId={user?.idAuth}
        showUserInfo={false}
        title='Proximos Turnos'
      />
    </div>
  )
}
