'use client'

import { Spinner } from '@/common/components/spinner.component'
import { Button } from '@/common/components/ui/button'
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
import { Lock, UserIcon } from 'lucide-react'
import { FormEvent, useRef, useTransition } from 'react'
import { editProfile } from '../actions/edit-profile.action'
import { User } from '@/features/users/types/user.types'

interface EditProfileFormProps {
  user: User
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(formRef.current!)

    startTransition(async () => {
      try {
        let phone = formData.get('phone')
        if (phone === '') {
          phone = null
        }

        const data = {
          first_name: formData.get('name') as string,
          last_name: formData.get('surname') as string,
          phone
        }

        const result = await editProfile(user.id, data)

        if (result.error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: result.error
          })
        } else {
          toast({
            title: 'Perfil actualizado',
            description: 'Tu información ha sido actualizada exitosamente'
          })
        }
      } catch (err) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Ocurrió un error al actualizar el perfil'
        })
      }
    })
  }

  const handlePasswordChange = (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Las contraseñas no coinciden'
      })
      return
    }

    startTransition(async () => {
      try {
        const result = await editProfile(user.id, { password })

        if (result.error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: result.error
          })
        } else {
          toast({
            title: 'Contraseña actualizada',
            description: 'Tu contraseña ha sido actualizada exitosamente'
          })
          ;(e.target as HTMLFormElement).reset()
        }
      } catch (err) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Ocurrió un error al actualizar la contraseña'
        })
      }
    })
  }

  return (
    <div className='flex flex-col gap-6'>
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
          <CardDescription>Actualiza tu información de perfil</CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Nombre</Label>
              <Input
                id='name'
                name='name'
                defaultValue={user.firstName}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='surname'>Apellido</Label>
              <Input
                id='surname'
                name='surname'
                defaultValue={user.lastName}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' value={user.email} disabled />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone'>Teléfono</Label>
              <Input
                id='phone'
                name='phone'
                type='number'
                defaultValue={user.phone || '-'}
              />
            </div>

            <Button type='submit' disabled={isPending} className='w-full'>
              {isPending ? (
                <>
                  <Spinner className='mr-2'/>
                  Actualizando...
                </>
              ) : (
                <>
                  <UserIcon className='mr-2 h-4 w-4' />
                  Actualizar Información
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cambiar Contraseña</CardTitle>
          <CardDescription>Actualiza tu contraseña de acceso</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='password'>Nueva Contraseña</Label>
              <Input id='password' name='password' type='password' required />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='confirmPassword'>Confirmar Contraseña</Label>
              <Input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                required
              />
            </div>

            <Button type='submit' disabled={isPending} className='w-full'>
              {isPending ? (
                <>
                  <Spinner className='mr-2'/>
                  Actualizando...
                </>
              ) : (
                <>
                  <Lock className='mr-2 h-4 w-4' />
                  Cambiar Contraseña
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
