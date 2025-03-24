import { userService } from '../service/user.service'
import { TableSkeleton } from '@/common/components/table-skeleton'
import { Suspense } from 'react'
import { UsersTable } from './users-table'

async function UserTable() {
  const users = await userService.getUsers()
  const currentUser = await userService.getCurrentUser()

  return <UsersTable data={users} currentUser={currentUser} />
}

export default function ListUserComponent() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className='text-xl font-semibold'>Usuarios del sistema</h2>

      <Suspense fallback={<TableSkeleton columns={5} rows={5} />}>
        <UserTable />
      </Suspense>
    </div>
  )
}
