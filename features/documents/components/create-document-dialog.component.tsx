'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/ui/dialog"
import { User } from "@/features/users/types/user.types"
import { useState } from "react"
import DocumentCreate from "./document-create.component"

interface Props {
  users: User[]
  children: React.ReactNode
}

export default function CreateDocumentDialog({ users, children }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subir Nuevo Documento</DialogTitle>
        </DialogHeader>
        <DocumentCreate 
          users={users} 
          onSuccess={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  )
} 