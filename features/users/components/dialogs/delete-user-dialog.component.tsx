'use client'

import { Button } from '@/common/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/common/components/ui/dialog'
import { useToast } from '@/common/hooks/use-toast'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { deleteUser } from '../../actions/delete-user.action'
import { User } from '../../types/user.types'

interface DeleteUserDialogProps {
  userId: string
  currentUser: User | null
  disabled?: boolean
  children?: React.ReactNode
}

export default function DeleteUserDialog({
  userId,
  currentUser,
  disabled,
  children
}: DeleteUserDialogProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)

    const result = await deleteUser(userId)

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error
      })
      setLoading(false)
      return
    }

    toast({
      title: 'Éxito',
      description: 'Usuario eliminado correctamente'
    })

    setOpen(false)
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant="ghost"
            size="icon"
            disabled={disabled}
          >
            <Trash2 className="h-4 w-4" color='' />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Usuario</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se
            puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
