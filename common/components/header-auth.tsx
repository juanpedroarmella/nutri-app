import { hasEnvVars } from '@/common/utils/supabase/check-env-vars'
import { signOutAction } from '@/features/auth/actions/sing-out.action'
import { authService } from '@/features/auth/services/auth.service'
import { userService } from '@/features/users/service/user-service'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

export default async function AuthButton() {
  const user = await authService.getCurrentUser()

  if (!hasEnvVars) {
    return (
      <>
        <div className='flex gap-4 items-center'>
          <div>
            <Badge
              variant={'default'}
              className='font-normal pointer-events-none'
            >
              Por favor, actualiza el archivo .env.local con la clave anónima y
              la URL
            </Badge>
          </div>
          <div className='flex gap-2'>
            <Button
              asChild
              size='sm'
              variant={'outline'}
              disabled
              className='opacity-75 cursor-none pointer-events-none'
            >
              <Link href='/sign-in'>Iniciar sesión</Link>
            </Button>
          </div>
        </div>
      </>
    )
  }

  if (user) {
    const userData = await userService.getUser(user.id)

    return (
      <div className='flex items-center gap-4'>
        Hey, {user.email}!
        {userData?.role === 'admin' && (
          <Button asChild variant='outline'>
            <Link href='/admin'>Panel Admin</Link>
          </Button>
        )}
        <form action={signOutAction}>
          <Button type='submit' variant='outline'>
            Cerrar sesión
          </Button>
        </form>
      </div>
    )
  }

  return (
    <div className='flex gap-2'>
      <Button asChild size='sm' variant={'default'}>
        <Link href='/sign-in'>Iniciar sesión</Link>
      </Button>
    </div>
  )
}
