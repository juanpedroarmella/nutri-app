import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/common/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/common/components/ui/tabs'
import { userService } from '@/features/users/service/user.service'
import { redirect } from 'next/navigation'
import { AuthRoutes } from '@/common/types/routes.types'
import { clinicalHistoryService } from '@/features/clinical-history/services/clinical-history.service'
import { documentService } from '@/features/documents/services/document.service'
import DocumentList from '@/features/documents/components/document-list.component'
import ClinicalHistoryView from '@/features/clinical-history/components/clinical-history-view.component'
import { useToast } from '@/common/hooks/use-toast'

export default async function DashboardPage() {
  const user = await userService.getCurrentUser()

  if (!user) {
    return redirect(AuthRoutes.SIGN_IN)
  }

  const { history, error } =
    await clinicalHistoryService.getClinicalHistoryByUserId(user.idAuth)
  const myDocuments = await documentService.getDocumentsByUser(user.idAuth)
  const publicDocuments = await documentService.getPublicDocuments()

  return (
    <div className='flex-1 w-full flex flex-col gap-6 p-6 max-w-7xl mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>Mi Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='clinical' className='w-full'>
            <TabsList className='mb-4'>
              <TabsTrigger value='clinical'>Historia Clínica</TabsTrigger>
              <TabsTrigger value='my-documents'>Mis Documentos</TabsTrigger>
              <TabsTrigger value='public-documents'>
                Documentos Públicos
              </TabsTrigger>
            </TabsList>

            <TabsContent value='clinical'>
              <ClinicalHistoryView clinicalData={history} error={error} />
            </TabsContent>

            <TabsContent value='my-documents'>
              <DocumentList
                documents={myDocuments.map(doc => ({ ...doc, user }))}
              />
            </TabsContent>

            <TabsContent value='public-documents'>
              <DocumentList
                documents={publicDocuments.map(doc => ({ ...doc, user }))}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
