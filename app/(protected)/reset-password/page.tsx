'use client'
import { SubmitButton } from '@/common/components/submit-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/common/components/ui/card'
import { Input } from '@/common/components/ui/input'
import { Label } from '@/common/components/ui/label'
import { useToast } from '@/common/hooks/use-toast'
import { resetPasswordAction } from '@/features/auth/actions/reset-password.action'
import { signOutAction } from '@/features/auth/actions/sing-out.action'
import { useRouter } from 'next/navigation'
import { AuthRoutes } from '@/common/types/routes.types'

export default function ResetPassword() {
  const { toast } = useToast()
  const router = useRouter()

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const result = await resetPasswordAction(formData)
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

      await signOutAction()

      router.push(AuthRoutes.SIGN_IN)
    }
  }

  return (
    <Card className='w-full max-w-md p-4 gap-2 mx-auto mt-10'>
      <CardHeader>
        <CardTitle>Restablecer contraseña</CardTitle>
        <CardDescription>
          Por favor, introduce tu nueva contraseña a continuación.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleResetPassword}
          className='flex flex-col w-full gap-2 [&>input]:mb-4'
        >
          <Label htmlFor='password'>Nueva contraseña</Label>
          <Input
            type='password'
            name='password'
            placeholder='Nueva contraseña'
            required
          />
          <Label htmlFor='confirmPassword'>Confirmar contraseña</Label>
          <Input
            type='password'
            name='confirmPassword'
            placeholder='Confirmar contraseña'
            required
          />
          <SubmitButton>Restablecer contraseña</SubmitButton>
        </form>
      </CardContent>
    </Card>
  )
}
