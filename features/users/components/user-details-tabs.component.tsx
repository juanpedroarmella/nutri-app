import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/common/components/ui/tabs'
import { User } from '../types/user.types'
import UserInfoTab from './tabs/user-info-tab.component'
import ClinicalHistoryTab from './tabs/clinical-history-tab.component'
import DocumentsTab from './tabs/documents-tab.component'
import { Document } from '@/features/documents/types/document.types'
import TrackingTab from './tabs/tracking-tab.component'

interface UserDetailsTabsProps {
  user: User
  documents: Document[]
}

export default function UserDetailsTabs({ user, documents }: UserDetailsTabsProps) {
  return (
    <Tabs defaultValue='user' className='w-full'>
      <TabsList className='mb-2'>
        <TabsTrigger value='user'>Usuario</TabsTrigger>
        <TabsTrigger value='clinical'>Historia Clínica</TabsTrigger>
        <TabsTrigger value='tracking'>Seguimientos</TabsTrigger>
        <TabsTrigger value='documents'>Documentos</TabsTrigger>
      </TabsList>
      <TabsContent value='user'>
        <UserInfoTab user={user} />
      </TabsContent>
      <TabsContent value='clinical'>
        <ClinicalHistoryTab user={user} />
      </TabsContent>
      <TabsContent value='tracking'>
        <TrackingTab user={user} />
      </TabsContent>
      <TabsContent value='documents'>
        <DocumentsTab user={user} documents={documents} />
      </TabsContent>
    </Tabs>
  )
}
