import { hasEnvVars } from '@/common/utils/supabase/check-env-vars'
import { signOutAction } from '@/features/auth/actions/sing-out.action'
import { authService } from '@/features/auth/services/auth.service'
import { userService } from '@/features/users/service/user.service'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { AuthRoutes, ProtectedRoutes } from '../types/routes.types'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

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
              <Link href={AuthRoutes.SIGN_IN}>Iniciar sesión</Link>
            </Button>
          </div>
        </div>
      </>
    )
  }

  if (user) {
    const userData = await userService.getCurrentUser()

    return (
      <div className='flex items-center gap-3'>
        <p className='text-sm text-muted-foreground'>
          ¡Hola {userData?.firstName}!
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='default' className='relative h-8 w-8 rounded-full'>
              <Avatar>
                <AvatarFallback className=''>
                  {userData?.firstName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <p className='text-xs text-muted-foreground'>{user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={ProtectedRoutes.PROFILE}
                className='flex items-center hover:cursor-pointer'
              >
                <User className='mr-2 h-4 w-4' />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form action={signOutAction} className='w-full'>
                <button className='flex w-full items-center'>
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Cerrar sesión</span>
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div className='flex gap-2'>
      <Button asChild size='sm' variant='default'>
        <Link href={AuthRoutes.SIGN_IN}>Iniciar sesión</Link>
      </Button>
    </div>
  )
}
