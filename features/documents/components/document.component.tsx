'use client'
import { Button } from '@/common/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/common/components/ui/tooltip'
import { useToast } from '@/common/hooks/use-toast'
import { cn } from '@/core/lib/utils'
import { User } from '@/features/users/types/user.types'
import { Download, FileText, Loader2, Trash2, User as UserIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import { deleteDocument } from '../actions/document-delete.action'
import { downloadDocument } from '../actions/document-download.action'
import { Document } from '../types/document.types'

interface Props {
  document: Document & { user: User }
  isAdmin: boolean
}

export default function DocumentComponent({ document: doc, isAdmin }: Props) {
  const [isPending, startTransition] = useTransition()
  const [isDeleting, startDeleteTransition] = useTransition()
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null)
  const { toast } = useToast()

  const handleDelete = () => {
    startDeleteTransition(async () => {
      try {
        await deleteDocument(doc.id)
        toast({
          title: 'Éxito',
          description: 'Documento eliminado correctamente'
        })
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error instanceof Error ? error.message : 'No se pudo eliminar el documento'
        })
      }
    })
  }

  const handleDownload = async () => {
    startTransition(async () => {
      setDownloadProgress(0)
      let objectUrl: string | null = null; // Keep track of object URL for cleanup
      try {
        const result = await downloadDocument(doc.id)

        if ('error' in result) {
          throw new Error(result.error);
        }

        const { signedUrl, fileName, contentType } = result;

        const response = await fetch(signedUrl);

        if (!response.ok) {
          throw new Error(`Error en la descarga: ${response.statusText}`);
        }

        const contentLength = response.headers.get('Content-Length');
        const totalSize = contentLength ? parseInt(contentLength, 10) : 0;
        let loadedSize = 0;

        if (!response.body) {
           throw new Error('No se pudo obtener el cuerpo de la respuesta para la descarga.');
        }

        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          chunks.push(value);
          loadedSize += value.length;
          if (totalSize > 0) {
            const progress = Math.round((loadedSize / totalSize) * 100);
            setDownloadProgress(progress);
          }
        }

        setDownloadProgress(100);

        // Crear el Blob
        const blob = new Blob(chunks, { type: contentType });
        
        // Usar el método del enlace para descargar el Blob
        objectUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objectUrl;
        a.download = fileName;
        document.body.appendChild(a); // Append to body to ensure click works in all browsers
        a.click();
        document.body.removeChild(a); // Clean up link

        toast({
          title: 'Éxito',
          description: 'Documento descargado correctamente'
        })

      } catch (error) {
        console.error('Error al descargar el documento:', error)
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error instanceof Error ? error.message : 'No se pudo descargar el documento'
        })
      } finally {
        if (objectUrl) {
           window.URL.revokeObjectURL(objectUrl); // Clean up Object URL
        }
        setTimeout(() => setDownloadProgress(null), 1000);
      }
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = () => {
    const type = doc.type.split('/')[0]
    return (
      {
        'application/pdf': 'bg-red-500/10 text-red-500',
        image: 'bg-blue-500/10 text-blue-500',
        text: 'bg-green-500/10 text-green-500'
      }[type] || 'bg-primary/10 text-primary'
    )
  }

  return (
    <div className='p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4 flex justify-between items-center w-full'>
      <div className='flex items-center w-fit gap-4'>
        <div className={cn('p-2 rounded-lg self-start', getFileIcon())}>
          <FileText className='w-6 h-6' />
        </div>
        <div className='flex flex-col gap-1'>
          <h3 className='font-medium'>{doc.name.split('_').join(' ')}</h3>    
          <div className='flex items-center gap-2 flex-wrap text-sm text-muted-foreground'>
            <span>{formatFileSize(doc.size)}</span>
            <span>•</span>
            <span>{doc.isPublic ? 'Público' : 'Privado'}</span>
            {!doc.isPublic && doc.user && (
              <>
              
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className='flex items-center gap-1 text-primary'>
                        <UserIcon className='w-3 h-3' />
                        <span>
                          {doc.user.firstName} {doc.user.lastName}
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

      <div className='flex items-center gap-2 w-fit flex-col sm:flex-row'>
        {isPending && downloadProgress !== null ? (
          <div className="flex items-center justify-center gap-1 w-9 h-9 border rounded-lg px-2">
            <span className="text-xs font-medium text-muted-foreground">{`${downloadProgress}%`}</span>
            <Loader2 className='w-3 h-3 animate-spin text-muted-foreground' />
          </div>
        ) : (
          <Button
            variant='outline'
            size='icon'
            onClick={handleDownload}
            disabled={isPending || isDeleting}
          >
            <Download className='w-4 h-4' />
          </Button>
        )}
        {isAdmin && (
          <Button
            variant='destructive'
            size='icon'
            onClick={handleDelete}
            disabled={isPending || isDeleting}
          >
            {isDeleting ? <Loader2 className='w-4 h-4 animate-spin' /> : <Trash2 className='w-4 h-4' />}
          </Button>
        )}
      </div>
    </div>
  )
}
