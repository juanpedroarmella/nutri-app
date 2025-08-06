'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/common/components/ui/dialog'
import ControlForm from './control-form.component'
import { User } from '@/features/users/types/user.types'
import { ControlWithUserEntity } from '../entity/control.entity'

interface EditControlDialogProps {
  users: User[]
  control: ControlWithUserEntity | null
  open: boolean
  onClose: () => void
}

export default function EditControlDialog({
  users,
  control,
  open,
  onClose
}: EditControlDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  // Filter users to only show patients (not admins)
  const patients = users.filter(user => user.role !== 'admin')

  const handleSuccess = () => {
    setIsOpen(false)
    onClose()
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      onClose()
    }
  }

  if (!control) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Control</DialogTitle>
          <DialogDescription>
            Actualiza las notas y observaciones del control del paciente.
          </DialogDescription>
        </DialogHeader>
        <ControlForm
          users={patients}
          control={control}
          onSuccess={handleSuccess}
          mode="edit"
        />
      </DialogContent>
    </Dialog>
  )
}