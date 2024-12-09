import { Card, CardContent } from '@/common/components/ui/card'
import { Badge } from '@/common/components/ui/badge'
import { User } from '../../types/user.types'
import DeleteUserDialog from '../dialogs/delete-user-dialog.component'
import EditUserDialog from '../dialogs/edit-user-dialog.component'
import { userService } from '../../service/user.service'

interface UserInfoTabProps {
  user: User
}

export default async function UserInfoTab({ user }: UserInfoTabProps) {
  const currentUser = await userService.getCurrentUser()
  return (
    <Card>
      <CardContent className='space-y-4 relative'>
        <div className='absolute top-0 right-4 flex gap-3'>
          <EditUserDialog user={user} />
          <DeleteUserDialog
            userId={user.idAuth}
            currentUser={currentUser}
            disabled={currentUser?.idAuth === user.idAuth}
          />
        </div>
        <div>
          <label className='text-sm text-muted-foreground'>
            Nombre completo
          </label>
          <p className='font-medium'>
            {user.firstName} {user.lastName}
          </p>
        </div>
        <div>
          <label className='text-sm text-muted-foreground'>Email</label>
          <p className='font-medium'>{user.email}</p>
        </div>
        <div>
          <label className='text-sm text-muted-foreground'>Teléfono</label>
          <p className='font-medium'>{user.phone || '-'}</p>
        </div>
        <div>
          <label className='text-sm text-muted-foreground'>Rol</label>
          <div>
            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
              {user.role === 'admin' ? 'Admin' : 'Usuario'}
            </Badge>
          </div>
        </div>
        <div>
          <label className='text-sm text-muted-foreground'>ID de Usuario</label>
          <p className='font-medium font-mono text-sm'>{user.id}</p>
        </div>
        <div>
          <label className='text-sm text-muted-foreground'>
            ID de Autenticación
          </label>
          <p className='font-medium font-mono text-sm'>{user.idAuth}</p>
        </div>
      </CardContent>
    </Card>
  )
}
