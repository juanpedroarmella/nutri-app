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
import { documentService } from '@/features/documents/services/document.service'
import { User } from '@/features/users/types/user.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Upload } from 'lucide-react'
import { useState } from 'react'

interface Props {
  users: User[]
}

export default function DocumentCreate({ users }: Props) {
  const queryClient = useQueryClient()
  const [isPublic, setIsPublic] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const { toast } = useToast()

  const { mutate: uploadDocument, isPending: isUploading } = useMutation({
    mutationFn: (formData: FormData) => {
      const file = formData.get('file') as File
      const name = formData.get('name') as string

      return documentService.uploadDocument({
        file,
        name,
        isPublic,
        userId: isPublic ? undefined : selectedUserId
      })
    },
    onSuccess: () => {
      toast({
        title: 'Éxito',
        description: 'Documento subido correctamente'
      })
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      setIsPublic(false)
      setSelectedUserId('')
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo subir el documento'
      })
    }
  })

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    uploadDocument(formData)
    e.currentTarget.reset()
  }

  return (
    <form onSubmit={handleUpload} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='file'>Archivo</Label>
        <Input id='file' name='file' type='file' required />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='name'>Nombre del documento</Label>
        <Input id='name' name='name' required />
      </div>

      <div className='flex items-center gap-2'>
        <Switch
          id='isPublic'
          checked={isPublic}
          onCheckedChange={setIsPublic}
        />
        <Label htmlFor='isPublic'>Documento público</Label>
      </div>

      {!isPublic && (
        <div className='space-y-2'>
          <Label htmlFor='userId'>Asignar a usuario</Label>
          <Select value={selectedUserId} onValueChange={setSelectedUserId}>
            <SelectTrigger>
              <SelectValue placeholder='Selecciona un usuario' />
            </SelectTrigger>
            <SelectContent>
              {users.map(u => (
                <SelectItem key={u.id} value={u.id}>
                  {u.firstName} {u.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <Button
        type='submit'
        disabled={isUploading || (!isPublic && !selectedUserId)}
      >
        {isUploading ? (
          'Subiendo...'
        ) : (
          <>
            <Upload className='mr-2 h-4 w-4' />
            Subir Documento
          </>
        )}
      </Button>
    </form>
  )
}
