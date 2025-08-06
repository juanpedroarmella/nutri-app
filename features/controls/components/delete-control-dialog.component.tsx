'use client'

import { useState, useTransition } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/common/components/ui/dialog'
import { Button } from '@/common/components/ui/button'
import { useToast } from '@/common/hooks/use-toast'
import { deleteControl } from '../actions/control.actions'
import { ControlWithUserEntity } from '../entity/control.entity'
import { Trash2, Loader2 } from 'lucide-react'

interface DeleteControlDialogProps {
  control: ControlWithUserEntity | null
  open: boolean
  onClose: () => void
}

export default function DeleteControlDialog({
  control,
  open,
  onClose
}: DeleteControlDialogProps) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleDelete = () => {
    if (!control) return

    startTransition(async () => {
      const result = await deleteControl(control.id)

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error
        })
        return
      }

      toast({
        title: 'Éxito',
        description: 'Control eliminado correctamente'
      })

      onClose()
    })
  }

  if (!control) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-red-600'>
            <Trash2 className='h-5 w-5' />
            Eliminar Control
          </DialogTitle>
          <DialogDescription className='text-left'>
            ¿Estás seguro de que quieres eliminar este control?
          </DialogDescription>
        </DialogHeader>

        <div className='bg-red-50 p-3 rounded-lg border border-red-200'>
          <p className='text-sm text-red-800'>
            <strong>⚠️ Advertencia:</strong> Esta acción no se puede deshacer.
          </p>
        </div>

        <DialogFooter className='gap-2'>
          <Button variant='outline' onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isPending}
            className='gap-2'
          >
            {isPending ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin' />
                Eliminando...
              </>
            ) : (
              <>
                <Trash2 className='h-4 w-4' />
                Eliminar Control
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
