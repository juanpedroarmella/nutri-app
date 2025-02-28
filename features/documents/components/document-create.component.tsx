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
import { User } from '@/features/users/types/user.types'
import { Upload, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Progress } from '@/common/components/ui/progress'
import { useDocumentUpload } from '../hooks/use-document-upload'

interface Props {
  users: User[]
  onSuccess?: () => void
}

export default function DocumentCreate({ users, onSuccess }: Props) {
  const [isPublic, setIsPublic] = useState(false)
  const [fileName, setFileName] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  
  const { uploadDocument, isLoading, uploadProgress } = useDocumentUpload({
    onSuccess
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!selectedFile) return
    
    const formElement = e.currentTarget as HTMLFormElement
    const userIdElement = formElement.elements.namedItem('userId') as HTMLSelectElement
    const userId = userIdElement?.value
    
    await uploadDocument({
      file: selectedFile,
      name: fileName || selectedFile.name,
      isPublic,
      userId: isPublic ? undefined : userId
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const name = file.name.split('.').slice(0, -1).join('.')
      setFileName(name)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='file'>Archivo</Label>
        <Input
          id='file'
          name='file'
          type='file'
          required
          onChange={handleFileChange}
          disabled={isLoading}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='name'>Nombre del documento</Label>
        <Input
          id='name'
          name='name'
          required
          value={fileName}
          onChange={e => setFileName(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className='flex items-center gap-2'>
        <Switch
          id='isPublic'
          name='isPublic'
          checked={isPublic}
          onCheckedChange={setIsPublic}
          disabled={isLoading}
        />
        <Label htmlFor='isPublic'>Documento público</Label>
      </div>

      {!isPublic && (
        <div className='space-y-2'>
          <Label htmlFor='userId'>Asignar a usuario</Label>
          <Select
            name='userId'
            required
            defaultValue={users.length === 1 ? users[0].idAuth : undefined}
            disabled={isLoading}
          >
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
      )}

      {uploadProgress > 0 && (
        <div className='space-y-2'>
          <Label>Progreso de carga</Label>
          <Progress value={uploadProgress} className='h-2' />
          <p className='text-xs text-center'>{uploadProgress}%</p>
        </div>
      )}

      <Button type='submit' disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Subiendo...
          </>
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
