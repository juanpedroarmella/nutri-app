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
import AppointmentSection from '@/features/appointments/components/appointment-section.component'
import CreateAppointmentDialog from '@/features/appointments/components/create-appointment-dialog.component'
import { userService } from '@/features/users/service/user.service'
import { Calendar } from 'lucide-react'
import { Suspense } from 'react'

export default async function AppointmentsPage() {
  return (
    <div className='flex-1 w-full flex flex-col gap-6 p-6 max-w-7xl mx-auto'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between flex-wrap gap-4'>
            <div className='flex items-center space-x-4'>
              <div className='p-2 bg-primary/10 rounded-lg'>
                <Calendar className='w-6 h-6 text-primary' />
              </div>
              <div>
                <CardTitle>Gestión de Turnos</CardTitle>
                <p className='text-sm text-muted-foreground'>
                  Administra los turnos del sistema
                </p>
              </div>
            </div>
            <Suspense
              fallback={
                <Button className='gap-2' disabled>
                  <Spinner />
                  Nuevo Turno
                </Button>
              }
            >
              <CreateAppointmentSection />
            </Suspense>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='all' className='w-full'>
            <TabsList className='mb-4'>
              <TabsTrigger value='all'>Todos los turnos</TabsTrigger>
              <TabsTrigger value='today'>Turnos de hoy</TabsTrigger>
            </TabsList>

            <TabsContent value='all'>
              <Card>
                <CardHeader>
                  <CardTitle>Todos los turnos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<TableSkeleton columns={4} rows={3} />}>
                    <AppointmentSection isAdmin showUserInfo />
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='today'>
              <Card>
                <CardHeader>
                  <CardTitle>Todos los turnos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<TableSkeleton columns={4} rows={3} />}>
                    <AppointmentSection isAdmin showUserInfo onlyToday />
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

async function CreateAppointmentSection() {
  const users = await userService.getUsers()

  return <CreateAppointmentDialog users={users} />
}
