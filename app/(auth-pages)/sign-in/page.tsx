import { signInAction } from '@/app/actions'
import { FormMessage, Message } from '@/common/components/form-message'
import { SubmitButton } from '@/common/components/submit-button'
import { Input } from '@/common/components/ui/input'
import { Label } from '@/common/components/ui/label'
import GoogleAuthButton from '@/features/auth/components/google-auth-button.component'
import Link from 'next/link'

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams
  return (
    <form className='flex-1 flex flex-col min-w-64'>
      <h1 className='text-2xl font-medium'>Iniciar sesión</h1>
      <p className='text-sm text-foreground'>
        No tienes una cuenta?{' '}
        <Link className='text-foreground font-medium underline' href='/sign-up'>
          Registrarse
        </Link>
      </p>
      <div className='flex flex-col gap-2 [&>input]:mb-3 mt-8'>
        <Label htmlFor='email'>Email</Label>
        <Input name='email' placeholder='tu@email.com' required />
        <div className='flex justify-between items-center'>
          <Label htmlFor='password'>Contraseña</Label>
          <Link
            className='text-xs text-foreground underline'
            href='/forgot-password'>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <Input
          type='password'
          name='password'
          placeholder='Tu contraseña'
          required
        />
        <SubmitButton
          pendingText='Iniciando sesión...'
          formAction={signInAction}
          className='mb-1'>
          Iniciar sesión
        </SubmitButton>
        <GoogleAuthButton />
        <FormMessage message={searchParams} />
      </div>
    </form>
  )
}
