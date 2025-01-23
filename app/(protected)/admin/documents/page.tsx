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
import { FileText } from 'lucide-react'

export default async function DocumentsPage() {
  const users = await userService.getUsers()
  const documents = await documentService.getAllDocuments()

  return (
    <div className='flex-1 w-full flex flex-col gap-6 p-6 max-w-7xl mx-auto'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
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
          </div>
        </CardHeader>
        <CardContent className='grid gap-6'>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Lista de Documentos</h2>
            </div>
            <DocumentList documents={documents} />
          </div>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Subir Nuevo Documento</h2>
            </div>
            <DocumentCreate users={users} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
