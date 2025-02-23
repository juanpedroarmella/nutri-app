import { Button } from '@/common/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/common/components/ui/card'
import CreateDocumentDialog from '@/features/documents/components/create-document-dialog.component'
import DocumentList from '@/features/documents/components/document-list.component'
import { documentService } from '@/features/documents/services/document.service'
import { User } from '@/features/users/types/user.types'
import { Plus } from 'lucide-react'

interface DocumentsTabProps {
  user: User
  isAdmin: boolean
}

export default async function DocumentsTab({ user, isAdmin }: DocumentsTabProps) {
  const documents = await documentService.getDocumentsByUser(user.idAuth)

  return (
    <Card>
      <CardHeader className='border-b mb-4'>
        <div className='flex items-center justify-between flex-wrap gap-4'>
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
        <DocumentList documents={documents.map(doc => ({ ...doc, user }))} isAdmin={isAdmin} />
      </CardContent>
    </Card>
  )
}
