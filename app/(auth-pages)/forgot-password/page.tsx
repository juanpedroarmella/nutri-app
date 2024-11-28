'use client'
import { forgotPasswordAction } from '@/app/actions'
import { SubmitButton } from '@/common/components/submit-button'
import { Input } from '@/common/components/ui/input'
import { Label } from '@/common/components/ui/label'
import Link from 'next/link'
import { SmtpMessage } from '../smtp-message'
import { useToast } from '@/common/hooks/use-toast'

export default function ForgotPassword() {
  const { toast } = useToast()

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const result = await forgotPasswordAction(formData)

    if (result.type === 'error') {
      toast({
        variant: 'destructive',
        title: 'Error al restablecer contraseña',
        description: result.message
      })
    }

    if (result.type === 'success') {
      toast({
        variant: 'default',
        title: 'Restablecer contraseña',
        description: result.message
      })
    }
  }

  return (
    <>
      <form
        onSubmit={handleForgotPassword}
        className='flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto'
      >
        <div>
          <h1 className='text-2xl font-medium'>Restablecer contraseña</h1>
          <p className='text-sm text-secondary-foreground'>
            Ya tienes una cuenta?{' '}
            <Link className='text-primary underline' href='/sign-in'>
              Iniciar sesión
            </Link>
          </p>
        </div>
        <div className='flex flex-col gap-2 [&>input]:mb-3 mt-8'>
          <Label htmlFor='email'>Email</Label>
          <Input name='email' placeholder='tu@email.com' required />
          <SubmitButton>Restablecer contraseña</SubmitButton>
        </div>
      </form>
      <SmtpMessage />
    </>
  )
}
