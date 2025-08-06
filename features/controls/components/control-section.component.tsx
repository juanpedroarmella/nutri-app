'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/common/components/ui/card'
import ControlList from './control-list.component'
import CreateControlDialog from './create-control-dialog.component'
import EditControlDialog from './edit-control-dialog.component'
import { ControlWithUserEntity } from '../entity/control.entity'
import { User } from '@/features/users/types/user.types'

interface ControlSectionProps {
  controls: ControlWithUserEntity[]
  users: User[]
  showUserInfo?: boolean
  isAdmin?: boolean
  selectedUserId?: string
  title?: string
  description?: string
}

export default function ControlSection({
  controls,
  users,
  showUserInfo = true,
  isAdmin = false,
  selectedUserId,
  title = 'Controles',
  description = 'Gestiona los controles y consultas de los pacientes'
}: ControlSectionProps) {
  const [editingControl, setEditingControl] =
    useState<ControlWithUserEntity | null>(null)

  const handleEditControl = (control: ControlWithUserEntity) => {
    setEditingControl(control)
  }

  const handleCloseEdit = () => {
    setEditingControl(null)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>

      <ControlList
        controls={controls}
        showUserInfo={showUserInfo}
        isAdmin={isAdmin}
        onEditControl={handleEditControl}
      />

      <EditControlDialog
        users={users}
        control={editingControl}
        open={!!editingControl}
        onClose={handleCloseEdit}
      />
    </div>
  )
}
