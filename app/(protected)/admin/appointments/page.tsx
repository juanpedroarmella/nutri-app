import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/common/components/ui/card'
import { Calendar, Plus } from 'lucide-react'
import AppointmentSection from '@/features/appointments/components/appointment-section.component'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/common/components/ui/tabs'
import { Button } from '@/common/components/ui/button'
import { Dialog, DialogTrigger } from '@/common/components/ui/dialog'
import CreateAppointmentDialog from '@/features/appointments/components/create-appointment-dialog.component'
import { userService } from '@/features/users/service/user.service'

export default async function AppointmentsPage() {
  const users = await userService.getUsers()

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

            <CreateAppointmentDialog users={users} />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='all' className='w-full'>
            <TabsList className='mb-4'>
              <TabsTrigger value='all'>Todos los turnos</TabsTrigger>
              <TabsTrigger value='today'>Turnos de hoy</TabsTrigger>
            </TabsList>

            <TabsContent value='all'>
              <AppointmentSection isAdmin showUserInfo />
            </TabsContent>

            <TabsContent value='today'>
              <AppointmentSection
                isAdmin
                showUserInfo
                onlyToday
                title='Turnos de Hoy'
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
