'use client'
import { SubmitButton } from '@/common/components/submit-button'
import { Input } from '@/common/components/ui/input'
import { Label } from '@/common/components/ui/label'
import Link from 'next/link'
import { SmtpMessage } from '../smtp-message'
import { useToast } from '@/common/hooks/use-toast'
import { forgotPasswordAction } from '@/features/auth/actions/forgot-password.action'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/common/components/ui/card'
import { AuthRoutes } from '@/common/types/routes.types'

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
    <div className='flex flex-col items-center justify-center gap-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>Restablecer contraseña</CardTitle>
          <CardDescription>
            Ya tienes una cuenta?{' '}
            <Link className='text-primary hover:underline' href={AuthRoutes.SIGN_IN}>
              Iniciar sesión
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForgotPassword} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='tu@email.com'
                required
              />
            </div>
            <SubmitButton className='w-full'>
              Restablecer contraseña
            </SubmitButton>
          </form>
        </CardContent>
      </Card>
      <SmtpMessage />
    </div>
  )
}
