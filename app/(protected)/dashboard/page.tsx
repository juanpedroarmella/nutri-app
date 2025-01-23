import { AuthRoutes } from '@/common/types/routes.types'
import { userService } from '@/features/users/service/user.service'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card'
import { Badge } from '@/common/components/ui/badge'
import { UserRole } from '@/features/users/types/user.types'

export default async function MyDataPage() {
  const user = await userService.getCurrentUser()

  if (!user) {
    return redirect(AuthRoutes.SIGN_IN)
  }

  return (
    <div className='flex-1 w-full flex flex-col gap-6 p-6 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold'>Mis Datos</h1>

      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
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
              <Badge variant={user.role === UserRole.ADMIN ? 'default' : 'secondary'}>
                {user.role === UserRole.ADMIN ? 'Admin' : 'Usuario'}
              </Badge>
            </div>
          </div>
          <div>
            <label className='text-sm text-muted-foreground'>ID de Usuario</label>
            <p className='font-medium font-mono text-sm'>{user.id}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}