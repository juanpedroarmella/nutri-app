import { Button } from '@/common/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/common/components/ui/card'
import { useToast } from '@/common/hooks/use-toast'
import { documentService } from '@/features/documents/services/document.service'
import { Document } from '@/features/documents/types/document.types'
import { User } from '@/features/users/types/user.types'
import { FileText, Trash2 } from 'lucide-react'

interface DocumentsTabProps {
  user: User
  documents: Document[]
}

export default function DocumentsTab({ user, documents }: DocumentsTabProps) {
  const { toast } = useToast()

  const handleDelete = async (id: string) => {
    try {
      await documentService.deleteDocument(id)
      toast({
        title: 'Éxito',
        description: 'Documento eliminado correctamente'
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo eliminar el documento'
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Documentos de {user.firstName} {user.lastName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {documents.map(doc => (
            <div
              key={doc.id}
              className='flex items-center justify-between p-4 border rounded-lg'
            >
              <div className='flex items-center gap-3'>
                <FileText className='h-5 w-5 text-primary' />
                <div>
                  <p className='font-medium'>{doc.name}</p>
                  <p className='text-sm text-muted-foreground'>
                    {doc.isPublic ? 'Público' : 'Privado'} •{' '}
                    {(doc.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Button variant='outline' asChild>
                  <a href={doc.url} target='_blank' rel='noopener noreferrer'>
                    Ver
                  </a>
                </Button>
                <Button
                  variant='destructive'
                  size='icon'
                  onClick={() => handleDelete(doc.id)}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </div>
          ))}

          {documents.length === 0 && (
            <p className='text-center text-muted-foreground'>
              No hay documentos disponibles
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
