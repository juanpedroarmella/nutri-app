'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/common/components/ui/dialog'
import { Button } from '@/common/components/ui/button'
import { Plus } from 'lucide-react'
import ControlForm from './control-form.component'
import { User } from '@/features/users/types/user.types'

interface CreateControlDialogProps {
  users: User[]
  selectedUserId?: string
}

export default function CreateControlDialog({
  users,
  selectedUserId
}: CreateControlDialogProps) {
  const [open, setOpen] = useState(false)

  // Filter users to only show patients (not admins)
  const patients = users.filter(user => user.role !== 'admin')

  // If selectedUserId is provided, filter to only that user
  const filteredUsers = selectedUserId 
    ? patients.filter(user => user.id === selectedUserId)
    : patients

  const handleSuccess = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Control
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Control</DialogTitle>
          <DialogDescription>
            Registra las notas y observaciones del control del paciente.
          </DialogDescription>
        </DialogHeader>
        <ControlForm
          users={filteredUsers}
          onSuccess={handleSuccess}
          mode="create"
        />
      </DialogContent>
    </Dialog>
  )
}