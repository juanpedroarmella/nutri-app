'use client'

import { useState } from 'react'
import { Button } from '@/common/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components/ui/dialog'
import { PencilIcon } from 'lucide-react'
import { User } from '@/common/types/user.types'
import EditUserForm from '../forms/edit-user-form.component'

interface EditUserDialogProps {
  user: User
}

export default function EditUserDialog({ user }: EditUserDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <PencilIcon className='w-4 h-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
        </DialogHeader>
        <EditUserForm user={user} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
} 