'use client'
import { useRef, useState, useTransition } from 'react'
import { Card, CardContent, CardHeader } from '@/common/components/ui/card'
import { Button } from '@/common/components/ui/button'
import { Input } from '@/common/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/common/components/ui/select'
import { createUser } from '../actions/createUser.action'

export default function CreateUserForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const roleRef = useRef('user')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(formRef.current!)

    startTransition(async () => {
      try {
        const data = {
          email: formData.get('email') as string,
          name: formData.get('name') as string,
          surname: formData.get('surname') as string,
          role: roleRef.current
        }
        const result = await createUser({
          data: data as any
        })

        if (result.error) {
          setError(result.error)
        } else {
          setSuccess('Usuario creado exitosamente')
          formRef.current?.reset()
          roleRef.current = 'user'
        }
      } catch (err) {
        setError(JSON.stringify(err))
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <h2 className='text-xl'>Crear Usuario</h2>
      </CardHeader>
      <CardContent>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='flex flex-col gap-4'
        >
          {error && <p className='text-red-500'>{error}</p>}
          {success && <p className='text-green-500'>{success}</p>}

          <Input type='text' name='name' placeholder='Nombre' required />

          <Input type='text' name='surname' placeholder='Apellido' required />

          <Input type='email' name='email' placeholder='Email' required />

          <Select
            defaultValue='user'
            onValueChange={value => {
              roleRef.current = value
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='Seleccionar rol' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='user'>Usuario</SelectItem>
              <SelectItem value='admin'>Admin</SelectItem>
            </SelectContent>
          </Select>

          <Button type='submit' disabled={isPending}>
            {isPending ? 'Creando...' : 'Crear Usuario'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
