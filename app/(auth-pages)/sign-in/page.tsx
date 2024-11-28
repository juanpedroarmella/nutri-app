import { signInAction } from '@/app/actions'
import { FormMessage, Message } from '@/common/components/form-message'
import { SubmitButton } from '@/common/components/submit-button'
import { Input } from '@/common/components/ui/input'
import { Label } from '@/common/components/ui/label'
import { Card, CardContent, CardHeader } from '@/common/components/ui/card'
import GoogleAuthButton from '@/features/auth/components/google-auth-button.component'
import Link from 'next/link'

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams
  return (
    <Card className='w-full max-w-[500px] min-w-[256px] mx-auto'>
      <CardHeader>
        <h1 className='text-2xl font-medium'>Iniciar sesión</h1>
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input name='email' placeholder='tu@email.com' required />
          </div>
          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <Label htmlFor='password'>Contraseña</Label>
              <Link
                className='text-xs text-muted-foreground hover:text-primary'
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
          </div>
          <SubmitButton
            pendingText='Iniciando sesión...'
            formAction={signInAction}
            className='w-full'>
            Iniciar sesión
          </SubmitButton>
          <GoogleAuthButton />
          <FormMessage message={searchParams} />
        </form>
      </CardContent>
    </Card>
  )
}