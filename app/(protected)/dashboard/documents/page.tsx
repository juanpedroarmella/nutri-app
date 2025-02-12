import { Skeleton } from '@/common/components/ui/skeleton'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/common/components/ui/tabs'
import { AuthRoutes } from '@/common/types/routes.types'
import DocumentList from '@/features/documents/components/document-list.component'
import { documentService } from '@/features/documents/services/document.service'
import { userService } from '@/features/users/service/user.service'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

async function SuspensedDocumentsPage() {
  const user = await userService.getCurrentUser()

  if (!user) {
    return redirect(AuthRoutes.SIGN_IN)
  }

  const myDocuments = await documentService.getDocumentsByUser(user.idAuth)
  const publicDocuments = await documentService.getPublicDocuments()

  return (
    <>
      <TabsContent value='my-documents'>
        <DocumentList documents={myDocuments.map(doc => ({ ...doc, user }))} />
      </TabsContent>
      <TabsContent value='public-documents'>
        <DocumentList
          documents={publicDocuments.map(doc => ({ ...doc, user }))}
        />
      </TabsContent>
    </>
  )
}

export default async function DocumentsPage() {
  return (
    <div className='flex-1 w-full flex flex-col gap-6 p-3 sm:p-6 max-w-7xl mx-auto'>
      <Tabs defaultValue='my-documents'>
        <TabsList className='mb-4'>
          <TabsTrigger value='my-documents'>Mis Documentos</TabsTrigger>
          <TabsTrigger value='public-documents'>
            Documentos Públicos
          </TabsTrigger>
        </TabsList>

        <Suspense fallback={<Skeleton className='h-[200px] w-full' />}>
          <SuspensedDocumentsPage />
        </Suspense>
      </Tabs>
    </div>
  )
}
