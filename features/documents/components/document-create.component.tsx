'use client'
import { Button } from '@/common/components/ui/button'
import { Input } from '@/common/components/ui/input'
import { Label } from '@/common/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/common/components/ui/select'
import { Switch } from '@/common/components/ui/switch'
import { useToast } from '@/common/hooks/use-toast'
import { User } from '@/features/users/types/user.types'
import { Upload } from 'lucide-react'
import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { uploadDocument } from '../actions/document-create.action'

interface Props {
  users: User[]
  onSuccess?: () => void
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={pending}>
      {pending ? (
        'Subiendo...'
      ) : (
        <>
          <Upload className='mr-2 h-4 w-4' />
          Subir Documento
        </>
      )}
    </Button>
  )
}

export default function DocumentCreate({ users, onSuccess }: Props) {
  const { toast } = useToast()
  const [state, formAction] = useActionState(uploadDocument, {
    error: undefined,
    success: false
  })

  useEffect(() => {
    if (state?.success) {
      toast({
        title: 'Éxito',
        description: 'Documento subido correctamente'
      })
      onSuccess?.()
    } else if (state?.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error
      })
    }
  }, [state, toast, onSuccess])

  return (
    <form action={formAction} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='file'>Archivo</Label>
        <Input id='file' name='file' type='file' required />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='name'>Nombre del documento</Label>
        <Input id='name' name='name' required />
      </div>

      <div className='flex items-center gap-2'>
        <Switch id='isPublic' name='isPublic' />
        <Label htmlFor='isPublic'>Documento público</Label>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='userId'>Asignar a usuario</Label>
        <Select name='userId' >
          <SelectTrigger>
            <SelectValue placeholder='Selecciona un usuario' />
          </SelectTrigger>
          <SelectContent>
            {users.map(u => (
              <SelectItem key={u.idAuth} value={u.idAuth}>
                {u.firstName} {u.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <SubmitButton />
    </form>
  )
}
