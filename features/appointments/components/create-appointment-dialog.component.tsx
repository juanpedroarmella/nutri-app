'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/common/components/ui/dialog'
import AppointmentForm from './appointment-form.component'
import { useState } from 'react'
import { Button } from '@/common/components/ui/button'
import { Plus } from 'lucide-react'
import { User } from '@/features/users/types/user.types'

interface CreateAppointmentDialogProps {
  users: User[]
}

export default function CreateAppointmentDialog({ users }: CreateAppointmentDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <Plus className='h-4 w-4' />
          Nuevo Turno
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Crear Nuevo Turno</DialogTitle>
          <DialogDescription>
            Complete los datos para crear un nuevo turno
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <AppointmentForm 
            users={users} 
            onSuccess={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
