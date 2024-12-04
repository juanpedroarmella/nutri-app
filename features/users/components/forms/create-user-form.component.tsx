'use client'
import { useRef, useTransition } from 'react'
import { Button } from '@/common/components/ui/button'
import { Input } from '@/common/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/common/components/ui/select'
import { createUser } from '../../actions/create-user.action'
import { useToast } from '@/common/hooks/use-toast'
import { Label } from '@/common/components/ui/label'

interface CreateUserFormProps {
  onSuccess: () => void
}

export default function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const roleRef = useRef('user')
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(formRef.current!)

    startTransition(async () => {
      try {
        const data = {
          email: formData.get('email') as string,
          name: formData.get('name') as string,
          surname: formData.get('surname') as string,
          role: roleRef.current,
          phone: formData.get('phone') as unknown as number | null
        }
        const result = await createUser({
          data: data as any
        })

        if (result.error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: result.error
          })
        } else {
          toast({
            title: 'Usuario creado',
            description: 'El usuario ha sido creado exitosamente'
          })
          formRef.current?.reset()
          roleRef.current = 'user'
          onSuccess()
        }
      } catch (err) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Ocurrió un error al crear el usuario'
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
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' type='email' name='email' placeholder='Email' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='phone'>Teléfono</Label>
        <Input id='phone' type='number' name='phone' placeholder='Teléfono' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='role'>Rol</Label>
        <Select
          defaultValue='user'
          onValueChange={value => {
            roleRef.current = value
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
        {isPending ? 'Creando...' : 'Crear Usuario'}
      </Button>
    </form>
  )
}
