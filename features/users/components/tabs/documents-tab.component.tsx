'use client'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/common/components/ui/card'
import { Document } from '@/features/documents/types/document.types'
import { User } from '@/features/users/types/user.types'
import DocumentList from '@/features/documents/components/document-list.component'
import CreateDocumentDialog from '@/features/documents/components/create-document-dialog.component'
import { Plus } from 'lucide-react'
import { Button } from '@/common/components/ui/button'

interface DocumentsTabProps {
  user: User
  documents: Document[]
}

export default function DocumentsTab({ user, documents }: DocumentsTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle>
            Documentos de {user.firstName} {user.lastName}
          </CardTitle>
          <CreateDocumentDialog users={[user]}>
            <Button>
              <Plus className='mr-2 h-4 w-4' />
              Nuevo Documento
            </Button>
          </CreateDocumentDialog>
        </div>
      </CardHeader>
      <CardContent>
        <DocumentList documents={documents.map(doc => ({ ...doc, user }))} />
      </CardContent>
    </Card>
  )
}
