import { Card, CardContent, CardHeader } from '@/common/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/common/components/ui/table'

import { userService } from '../service/user.service'
import UserRow from './user-row.component'

export default async function ListUserComponent() {
  const users = await userService.getUsers()

  const currentUser = await userService.getCurrentUser()

  return (
    <Card>
      <CardHeader>
        <h2 className='text-xl font-semibold'>Usuarios</h2>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  )
}
