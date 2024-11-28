import { Card, CardContent, CardHeader } from '@/common/components/ui/card'
import { User } from '@/common/types/user.types'
import { createClient } from '@/common/utils/supabase/server'
import CreateUserComponent from '@/features/users/components/create-user.component'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: users, error } = await supabase
    .from('users')
    .select(
      `
      id,
      first_name,
      last_name,
      role,
      email
    `
    )
    .returns<User[]>()

  return (
    <div className='flex-1 w-full flex flex-col gap-6 p-4'>
      <h1 className='text-2xl font-bold'>Panel de Administración</h1>

      <Card>
        <CardHeader>
          <h2 className='text-xl'>Usuarios</h2>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-4'>
            {users?.map(user => (
              <div
                key={user.id}
                className='flex items-center justify-between p-4 border rounded'
              >
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Rol: {user.role}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    Email: {user.email}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    Nombre: {user.first_name}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    Apellido: {user.last_name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CreateUserComponent />
    </div>
  )
}
