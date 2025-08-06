import { Spinner } from '@/common/components/spinner.component'
import { TableSkeleton } from '@/common/components/table-skeleton'
import { Button } from '@/common/components/ui/button'
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
import ControlSection from '@/features/controls/components/control-section.component'
import CreateControlDialog from '@/features/controls/components/create-control-dialog.component'
import { getAllControls } from '@/features/controls/actions/control.actions'
import { userService } from '@/features/users/service/user.service'
import { ClipboardList } from 'lucide-react'
import { Suspense } from 'react'

export default async function ControlsPage() {
  return (
    <div className='flex flex-col'>
      <Card>
        <CardHeader className='border-b mb-4'>
          <div className='flex items-center justify-between flex-wrap gap-4'>
            <div className='flex items-center space-x-4'>
              <div className='p-2 bg-primary/10 rounded-lg'>
                <ClipboardList className='w-6 h-6 text-primary' />
              </div>
              <div>
                <CardTitle>Gestión de Controles</CardTitle>
                <p className='text-sm text-muted-foreground'>
                  Administra los controles y consultas de los pacientes
                </p>
              </div>
            </div>
            <Suspense
              fallback={
                <Button className='gap-2' disabled>
                  <Spinner />
                  Nuevo Control
                </Button>
              }
            >
              <CreateControlSection />
            </Suspense>
          </div>
        </CardHeader>
        <CardContent className='px-3 sm:px-4 md:px-6'>
          <Tabs defaultValue='all' className='w-full'>
            <TabsList className='mb-4'>
              <TabsTrigger value='all'>Todos los controles</TabsTrigger>
              <TabsTrigger value='recent'>Recientes</TabsTrigger>
            </TabsList>

            <TabsContent value='all'>
              <AllControlsSection />
            </TabsContent>

            <TabsContent value='recent'>
              <Suspense fallback={<TableSkeleton columns={5} rows={3} />}>
                <RecentControlsSection />
              </Suspense>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

async function CreateControlSection() {
  const usersResult = await userService.getUsers()
  const users = usersResult || []

  return <CreateControlDialog users={users} />
}

async function AllControlsSection() {
  const usersResult = await userService.getUsers()
  const controlsResult = await getAllControls()

  const users = usersResult || []
  const controls = controlsResult.data || []

  return (
    <ControlSection
      controls={controls}
      users={users}
      showUserInfo={true}
      isAdmin={true}
      title='Todos los Controles'
      description='Lista completa de controles realizados'
    />
  )
}

async function RecentControlsSection() {
  const usersResult = await userService.getUsers()
  const controlsResult = await getAllControls()

  const users = usersResult || []
  const allControls = controlsResult.data || []

  // Filter controls from the last 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const recentControls = allControls.filter(control => {
    const controlDate = new Date(control.consultation_date)
    return controlDate >= thirtyDaysAgo
  })

  return (
    <ControlSection
      controls={recentControls}
      users={users}
      showUserInfo={true}
      isAdmin={true}
      title='Controles Recientes'
      description='Controles realizados en los últimos 30 días'
    />
  )
}
