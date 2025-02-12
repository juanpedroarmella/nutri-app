'use client'
import { Button } from '@/common/components/ui/button'
import { Document } from '../types/document.types'
import { Download, FileText, Trash2, User as UserIcon } from 'lucide-react'
import { useToast } from '@/common/hooks/use-toast'
import { useTransition } from 'react'
import { deleteDocument } from '../actions/document-delete.action'
import { cn } from '@/core/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/common/components/ui/tooltip'
import { User } from '@/features/users/types/user.types'
import { getDownloadURL } from '../actions/document-download.action'

interface Props {
  document: Document & { user: User }
}

export default function DocumentComponent({ document }: Props) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteDocument(document.id)
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
    })
  }

  const handleDownload = async () => {
    try {
      const url = await getDownloadURL(document.url)
      window.open(url, '_blank', 'noopener,noreferrer')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo descargar el documento'
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = () => {
    const type = document.type.split('/')[0]
    return (
      {
        'application/pdf': 'bg-red-500/10 text-red-500',
        image: 'bg-blue-500/10 text-blue-500',
        text: 'bg-green-500/10 text-green-500'
      }[type] || 'bg-primary/10 text-primary'
    )
  }

  return (
    <div className='flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors flex-wrap gap-4'>
      <div className='flex items-center gap-4'>
        <div className={cn('p-2 rounded-lg', getFileIcon())}>
          <FileText className='w-6 h-6' />
        </div>
        <div>
          <h3 className='font-medium'>{document.name}</h3>
          <div className='flex items-center gap-2 flex-wrap text-sm text-muted-foreground'>
            <span>{formatFileSize(document.size)}</span>
            <span>•</span>
            <span>{document.isPublic ? 'Público' : 'Privado'}</span>
            {!document.isPublic && document.user && (
              <>
                <span>•</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className='flex items-center gap-1 text-primary'>
                        <UserIcon className='w-3 h-3' />
                        <span>
                          {document.user.firstName} {document.user.lastName}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Usuario asignado</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
          </div>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <Button variant='outline' size='icon' onClick={handleDownload}>
          <Download className='w-4 h-4' />
        </Button>
        <Button
          variant='destructive'
          size='icon'
          onClick={handleDelete}
          disabled={isPending}
        >
          <Trash2 className='w-4 h-4' />
        </Button>
      </div>
    </div>
  )
}
