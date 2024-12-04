'use client'

import { Badge } from '@/common/components/ui/badge'
import { TableCell, TableRow } from '@/common/components/ui/table'
import { AdminRoutes } from '@/common/types/routes.types'
import { User } from '@/common/types/user.types'
import { useRouter } from 'next/navigation'
import DeleteUserDialog from './dialogs/delete-user-dialog.component'
import EditUserDialog from './dialogs/edit-user-dialog.component'

interface UserRowProps {
  user: User
  currentUser: User | null
}

export default function UserRow({ user, currentUser }: UserRowProps) {
  const router = useRouter()

  const handleRowClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking on action buttons or dialogs
    if (
      (e.target as HTMLElement).closest('.actions') ||
      (e.target as HTMLElement).closest('[role="dialog"]')
    ) {
      return
    }
    router.push(`${AdminRoutes.USERS}/${user.id}`)
  }

  return (
    <TableRow className='hover:cursor-pointer' onClick={handleRowClick}>
      <TableCell className='font-medium'>
        <div className='flex items-center gap-2'>
          {user.first_name} {user.last_name}
          {currentUser?.id === user.id && (
            <Badge variant='outline' className='ml-2'>
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
      <TableCell className='text-center'>{user.phone || '-'}</TableCell>
      <TableCell className='text-right'>
        <div className='flex justify-center gap-2 actions'>
          <EditUserDialog user={user} />
          <DeleteUserDialog
            userId={user.id_auth}
            currentUser={currentUser}
            disabled={currentUser?.id_auth === user.id_auth}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}
