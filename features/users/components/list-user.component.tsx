import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/components/ui/table'
import { Card, CardHeader, CardContent } from '@/common/components/ui/card'

import { UserRepository } from '../repository/user.repository'
import { Badge } from '@/common/components/ui/badge'
import { AuthRepository } from '@/features/auth/repository/auth.repository'
import EditUserDialog from './dialogs/edit-user-dialog.component'
import DeleteUserDialog from './dialogs/delete-user-dialog.component'

export default async function ListUserComponent() {
  const { data: users } = await UserRepository.getUsers()
  const currentUser = await UserRepository.getCurrentUser()

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
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map(user => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {user.first_name} {user.last_name}
                    {currentUser?.id === user.id && (
                      <Badge variant="outline" className="ml-2">
                        Tú
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role === 'admin' ? 'Admin' : 'Usuario'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-center gap-2">
                    <EditUserDialog user={user} />
                    <DeleteUserDialog userId={user.id} currentUser={currentUser} disabled={currentUser?.id === user.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}