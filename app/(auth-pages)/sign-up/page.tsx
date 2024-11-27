import { signUpAction } from '@/app/actions'
import { FormMessage, Message } from '@/common/components/form-message'
import { SubmitButton } from '@/common/components/submit-button'
import { Input } from '@/common/components/ui/input'
import { Label } from '@/common/components/ui/label'
import Link from 'next/link'
import { SmtpMessage } from '../smtp-message'
import GoogleAuthButton from '@/features/auth/components/google-auth-button.component'

export default async function Signup(props: {
  searchParams: Promise<Message>
}) {
  const searchParams = await props.searchParams
  if ('message' in searchParams) {
    return (
      <div className='w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4'>
        <FormMessage message={searchParams} />
      </div>
    )
  }

  return (
    <>
      <form className='flex flex-col min-w-64 max-w-64 mx-auto'>
        <h1 className='text-2xl font-medium'>Registrarse</h1>
        <p className='text-sm text text-foreground'>
          Ya tienes una cuenta?{' '}
          <Link className='text-primary font-medium underline' href='/sign-in'>
            Iniciar sesión
          </Link>
        </p>
        <div className='flex flex-col gap-2 [&>input]:mb-3 mt-8'>
          <Label htmlFor='email'>Email</Label>
          <Input name='email' placeholder='you@example.com' required />
          <Label htmlFor='password'>Contraseña</Label>
          <Input
            type='password'
            name='password'
            placeholder='Your password'
            minLength={6}
            required
          />
          <SubmitButton
            formAction={signUpAction}
            pendingText='Registrando...'
            className='mb-1'>
            Registrarse
          </SubmitButton>
          <GoogleAuthButton />
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  )
}
