import { useState } from 'react'
import { useToast } from '@/common/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface DocumentUploadOptions {
  onSuccess?: () => void
}

interface DocumentUploadData {
  file: File
  name: string
  isPublic: boolean
  userId?: string
}

export function useDocumentUpload(options?: DocumentUploadOptions) {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const uploadDocument = async (data: DocumentUploadData) => {
    const { file, name, isPublic, userId } = data

    if (!file) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Debes seleccionar un archivo'
      })
      return false
    }

    if (!isPublic && !userId) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Debes asignar un usuario al documento'
      })
      return false
    }

    setIsLoading(true)
    setUploadProgress(0)

    try {
      const presignedResponse = await fetch('/api/documents/presigned-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          isPublic,
          userId: isPublic ? null : userId
        })
      })

      if (!presignedResponse.ok) {
        const error = await presignedResponse.json()
        throw new Error(error.error || 'Error al obtener URL para subir documento')
      }

      const { presignedUrl, s3Key } = await presignedResponse.json()

      await uploadFileWithProgress(file, presignedUrl, setUploadProgress)

      const metadataResponse = await fetch('/api/documents/save-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name || file.name,
          s3Key,
          size: file.size,
          type: file.type,
          isPublic,
          userId: isPublic ? null : userId
        })
      })

      if (!metadataResponse.ok) {
        const error = await metadataResponse.json()
        throw new Error(error.error || 'Error al guardar la información del documento')
      }

      toast({
        title: 'Éxito',
        description: 'Documento subido correctamente'
      })
      
      router.refresh()
      options?.onSuccess?.()
      return true
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Error al subir el documento'
      })
      return false
    } finally {
      setIsLoading(false)
      setUploadProgress(0)
    }
  }

  return {
    uploadDocument,
    isLoading,
    uploadProgress
  }
}

function uploadFileWithProgress(
  file: File, 
  presignedUrl: string, 
  onProgress: (progress: number) => void
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded * 100) / event.total)
        onProgress(progress)
      }
    })
    
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve()
      } else {
        reject(new Error('Error al subir el archivo a S3'))
      }
    })
    
    xhr.addEventListener('error', () => {
      reject(new Error('Error de red al subir el archivo'))
    })
    
    xhr.open('PUT', presignedUrl)
    xhr.setRequestHeader('Content-Type', file.type)
    xhr.send(file)
  })
} 