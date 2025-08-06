import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/common/components/ui/tabs'
import { notFound } from 'next/navigation'
import { userService } from '../service/user.service'
import { UserRole } from '../types/user.types'
import ClinicalHistoryTab from './tabs/clinical-history-tab.component'
import ControlsTab from './tabs/controls-tab.component'
import DocumentsTab from './tabs/documents-tab.component'
import TrackingTab from './tabs/tracking-tab.component'
import UserInfoTab from './tabs/user-info-tab.component'

export default async function UserDetailsTabs({ id }: { id: string }) {
  const user = await userService.getUser(id)

  const currentUser = await userService.getCurrentUser()

  if (!user) {
    notFound()
  }

  return (
    <Tabs defaultValue='user' className='w-full'>
      <TabsList className='mb-2'>
        <TabsTrigger value='user'>Usuario</TabsTrigger>
        <TabsTrigger value='clinical'>Historia Clínica</TabsTrigger>
        <TabsTrigger value='tracking'>Seguimientos</TabsTrigger>
        <TabsTrigger value='controls'>Controles</TabsTrigger>
        <TabsTrigger value='documents'>Documentos</TabsTrigger>
      </TabsList>
      <TabsContent value='user'>
        <UserInfoTab user={user} />
      </TabsContent>
      <TabsContent value='clinical'>
        <ClinicalHistoryTab user={user} />
      </TabsContent>
      <TabsContent value='tracking'>
        <TrackingTab
          userId={user.idAuth}
          isAdmin={currentUser?.role === UserRole.ADMIN}
        />
      </TabsContent>
      <TabsContent value='controls'>
        <ControlsTab
          user={user}
          isAdmin={currentUser?.role === UserRole.ADMIN}
        />
      </TabsContent>
      <TabsContent value='documents'>
        <DocumentsTab
          user={user}
          isAdmin={currentUser?.role === UserRole.ADMIN}
        />
      </TabsContent>
    </Tabs>
  )
}
