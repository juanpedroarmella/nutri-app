'use client'

import { useRef, useTransition } from 'react'
import { User, UserRole } from '@/common/types/user.types'
import { Button } from '@/common/components/ui/button'
import { Input } from '@/common/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/common/components/ui/select'
import { useToast } from '@/common/hooks/use-toast'
import { Label } from '@/common/components/ui/label'
import { editUser } from '../../actions/edit-user.action'

interface EditUserFormProps {
  user: User
  onSuccess: () => void
}

export default function EditUserForm({ user, onSuccess }: EditUserFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const roleRef = useRef(user.role)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
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
          role: roleRef.current,
          phone
        } as Partial<User>

        const result = await editUser(user.id, data)

        if (result.error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: result.error
          })
        } else {
          toast({
            title: 'Usuario actualizado',
            description: 'El usuario ha sido actualizado exitosamente'
          })
          onSuccess()
        }
      } catch (err) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Ocurrió un error al actualizar el usuario'
        })
      }
    })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div className='space-y-2'>
        <Label htmlFor='name'>Nombre</Label>
        <Input
          id='name'
          type='text'
          name='name'
          placeholder='Nombre'
          defaultValue={user.first_name}
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='surname'>Apellido</Label>
        <Input
          id='surname'
          type='text'
          name='surname'
          placeholder='Apellido'
          defaultValue={user.last_name}
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          name='email'
          placeholder='Email'
          value={user.email}
          disabled
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='phone'>Teléfono</Label>
        <Input
          id='phone'
          type='tel'
          name='phone'
          placeholder='Teléfono'
          defaultValue={user.phone || ''}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='role'>Rol</Label>
        <Select
          defaultValue={user.role}
          onValueChange={value => {
            roleRef.current = value as UserRole
          }}
        >
          <SelectTrigger id='role'>
            <SelectValue placeholder='Seleccionar rol' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='user'>Usuario</SelectItem>
            <SelectItem value='admin'>Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type='submit' disabled={isPending}>
        {isPending ? 'Actualizando...' : 'Actualizar Usuario'}
      </Button>
    </form>
  )
}
