import { TableSkeleton } from '@/common/components/table-skeleton'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/common/components/ui/card'
import { Skeleton } from '@/common/components/ui/skeleton'
import { AuthRoutes } from '@/common/types/routes.types'
import AppointmentSection from '@/features/appointments/components/appointment-section.component'
import { userService } from '@/features/users/service/user.service'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

async function SuspensedAppointmentsPage() {
  const user = await userService.getCurrentUser()

  if (!user) {
    return redirect(AuthRoutes.SIGN_IN)
  }

  return <AppointmentSection userId={user?.idAuth} showUserInfo={false} />
}

export default async function AppointmentsPage() {
  return (
    <div className='flex-1 w-full flex flex-col gap-6 p-6 max-w-7xl mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>Proximos Turnos</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableSkeleton columns={3} rows={3} />}>
            <SuspensedAppointmentsPage />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
