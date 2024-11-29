'use client'
import { SubmitButton } from '@/common/components/submit-button'
import { Input } from '@/common/components/ui/input'
import { Label } from '@/common/components/ui/label'
import { useToast } from '@/common/hooks/use-toast'
import { resetPasswordAction } from '@/features/auth/actions/reset-password.action'

export default function ResetPassword() {
  const { toast } = useToast()

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
    }
  }

  return (
    <form
      onSubmit={handleResetPassword}
      className='flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4'
    >
      <h1 className='text-2xl font-medium'>Restablecer contraseña</h1>
      <p className='text-sm text-foreground/60'>
        Por favor, introduce tu nueva contraseña a continuación.
      </p>
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
        placeholder='Confirm password'
        required
      />
      <SubmitButton>
        Restablecer contraseña
      </SubmitButton>
    </form>
  )
}
