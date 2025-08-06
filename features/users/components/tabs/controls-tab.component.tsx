import { Suspense } from 'react'
import { Skeleton } from '@/common/components/ui/skeleton'
import ControlSection from '@/features/controls/components/control-section.component'
import { getControlsByUserId } from '@/features/controls/actions/control.actions'
import { userService } from '../../service/user.service'
import { User } from '../../types/user.types'

interface ControlsTabProps {
  user: User
  isAdmin: boolean
}

export default function ControlsTab({ user, isAdmin }: ControlsTabProps) {
  return (
    <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
      <ControlsTabContent user={user} isAdmin={isAdmin} />
    </Suspense>
  )
}

async function ControlsTabContent({ user, isAdmin }: ControlsTabProps) {
  const controlsResult = await getControlsByUserId(user.id)
  const usersResult = await userService.getUsers()
  
  const controls = controlsResult.data || []
  const users = usersResult || []

  return (
    <ControlSection
      controls={controls}
      users={users}
      showUserInfo={false}
      isAdmin={isAdmin}
      selectedUserId={user.id}
      title={`Controles de ${user.firstName} ${user.lastName}`}
      description="Historial de controles y consultas del paciente"
    />
  )
}