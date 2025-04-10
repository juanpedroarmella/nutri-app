import { Spinner } from '@/common/components/spinner.component'
import { Button } from '@/common/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/common/components/ui/card'
import { Skeleton } from '@/common/components/ui/skeleton'
import CreateDocumentDialog from '@/features/documents/components/create-document-dialog.component'
import DocumentList from '@/features/documents/components/document-list.component'
import { documentService } from '@/features/documents/services/document.service'
import { userService } from '@/features/users/service/user.service'
import { FileText, Plus } from 'lucide-react'
import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { AuthRoutes } from '@/common/types/routes.types'
import { UserRole } from '@/features/users/types/user.types'

const CreateDocumentSection = async () => {
  const users = await userService.getUsers()

  return (
    <CreateDocumentDialog users={users}>
      <Button>
        <Plus className='mr-2 h-4 w-4' />
        Nuevo Documento
      </Button>
    </CreateDocumentDialog>
  )
}

const DocumentsSection = async ({ isAdmin }: { isAdmin: boolean }) => {
  const documents = await documentService.getAllDocuments()

  return <DocumentList documents={documents} isAdmin={isAdmin} />
}

export default async function DocumentsPage() {
  const user = await userService.getCurrentUser()

  if (!user) {
    return redirect(AuthRoutes.SIGN_IN)
  }

  return (
    <div className='flex-1 w-full flex flex-col gap-6 p-3 sm:p-6 max-w-7xl mx-auto'>
      <Card>
        <CardHeader className='sm:px-6 px-3'>
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
            <Suspense
              fallback={
                <Button disabled>
                  <Spinner />
                  Nuevo Documento
                </Button>
              }
            >
              <CreateDocumentSection />
            </Suspense>
          </div>
        </CardHeader>
        <CardContent className='sm:px-6 px-3'>
          <Suspense fallback={<Skeleton className='h-[500px] w-full' />}>
            <DocumentsSection isAdmin={user.role === UserRole.ADMIN} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
