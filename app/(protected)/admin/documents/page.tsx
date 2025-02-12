import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/common/components/ui/card'
import DocumentCreate from '@/features/documents/components/document-create.component'
import DocumentList from '@/features/documents/components/document-list.component'
import { documentService } from '@/features/documents/services/document.service'
import { userService } from '@/features/users/service/user.service'
import { FileText, Plus } from 'lucide-react'
import { Button } from '@/common/components/ui/button'
import { Suspense } from 'react'
import CreateDocumentDialog from '@/features/documents/components/create-document-dialog.component'

export default async function DocumentsPage() {
  const users = await userService.getUsers()
  const documents = await documentService.getAllDocuments()

  return (
    <div className='flex-1 w-full flex flex-col gap-6 p-6 max-w-7xl mx-auto'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between flex-wrap gap-4'>
            <div className='flex items-center space-x-4'>
              <div className='p-2 bg-primary/10 rounded-lg'>
                <FileText className='w-6 h-6 text-primary' />
              </div>
              <div>
                <CardTitle>Documentos</CardTitle>
                <p className='text-sm text-muted-foreground'>
                  Gestiona los documentos del sistema
                </p>
              </div>
            </div>
            <CreateDocumentDialog users={users}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Documento
              </Button>
            </CreateDocumentDialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <DocumentList documents={documents} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
