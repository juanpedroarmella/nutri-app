import { AuthRoutes, DashboardRoutes } from '@/common/types/routes.types'
import { userService } from '@/features/users/service/user.service'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = await userService.getCurrentUser()

  if (!user) {
    return redirect(AuthRoutes.SIGN_IN)
  }

  return redirect(DashboardRoutes.APPOINTMENTS)
}
