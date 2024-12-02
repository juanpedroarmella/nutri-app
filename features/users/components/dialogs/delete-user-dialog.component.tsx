'use client'

import { Button } from '@/common/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useToast } from '@/common/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from '@/common/components/ui/dialog'
import { User } from '@/common/types/user.types'
import { deleteUser } from '../../actions/delete-user.action'
import { AdminRoutes } from '@/common/types/routes.types'

export default function DeleteUserDialog({
  userId,
  currentUser,
  disabled
}: {
  userId: string
  currentUser: User | null
  disabled: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleDelete = async () => {
    if (userId === currentUser?.id) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No puedes borrarte a ti mismo'
      })
      setOpen(false)
      return
    }

    startTransition(async () => {
      try {
        const result = await deleteUser(userId)

        if (result.error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: result.error
          })
        } else {
          toast({
            title: 'Usuario eliminado',
            description: 'El usuario ha sido eliminado exitosamente'
          })
          router.push(AdminRoutes.HOME)
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Ocurrió un error al eliminar el usuario'
        })
      } finally {
        setOpen(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='destructive' size='icon' disabled={disabled}>
          <Trash2 className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Usuario</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres eliminar este usuario? Esta acción no
            se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
