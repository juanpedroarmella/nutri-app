import { Card, CardContent, CardHeader } from '@/common/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/common/components/ui/table'
import { Suspense } from 'react'
import { userService } from '../service/user.service'
import UserRow from './user-row.component'
import { TableSkeleton } from '@/common/components/table-skeleton'
async function UserTable() {
  const users = await userService.getUsers()
  const currentUser = await userService.getCurrentUser()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead className='text-right'>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map(user => (
          <UserRow key={user.id} user={user} currentUser={currentUser} />
        ))}
      </TableBody>
    </Table>
  )
}

export default function ListUserComponent() {
  return (
    <Card>
      <CardHeader>
        <h2 className='text-xl font-semibold'>Usuarios</h2>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<TableSkeleton columns={5} rows={5} />}>
          <UserTable />
        </Suspense>
      </CardContent>
    </Card>
  )
}
