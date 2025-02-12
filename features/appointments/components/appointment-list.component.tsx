'use client'

import { Button } from '@/common/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/common/components/ui/table'
import { useToast } from '@/common/hooks/use-toast'
import { Trash2 } from 'lucide-react'
import { useTransition } from 'react'
import { deleteAppointment } from '../actions/appointment.actions'
import { Appointment } from '../types/appointment.types'
import { Badge } from '@/common/components/ui/badge'
import { cn } from '@/core/lib/utils'

interface AppointmentListProps {
  appointments: Appointment[]
  showUserInfo?: boolean
  isAdmin?: boolean
}

export default function AppointmentList({
  appointments,
  showUserInfo = true,
  isAdmin = false
}: AppointmentListProps) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const isAppointmentPast = (date: string, time: string) => {
    const appointmentDate = new Date(`${date}T${time}`)
    const now = new Date()
    return appointmentDate < now
  }

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteAppointment(id)

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error
        })
        return
      }

      toast({
        title: 'Éxito',
        description: 'Turno eliminado correctamente'
      })
    })
  }

  console.log(appointments)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>Hora</TableHead>
          {showUserInfo && <TableHead>Paciente</TableHead>}
          <TableHead>Tipo</TableHead>
          {isAdmin && <TableHead className='w-[100px]'>Acciones</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map(appointment => {
          const isPast = isAppointmentPast(appointment.date, appointment.time)
          
          return (
            <TableRow 
              key={appointment.id}
              className={cn(isPast && "text-muted-foreground line-through")}
            >
              <TableCell>
                {appointment.date}
              </TableCell>
              <TableCell>{appointment.time}</TableCell>
              {showUserInfo && appointment.user && (
                <TableCell>
                  {appointment.user.firstName} {appointment.user.lastName}
                </TableCell>
              )}
              <TableCell>
                <Badge 
                  variant={appointment.isFirstConsultation ? 'default' : 'secondary'}
                  className={cn(isPast && "opacity-50")}
                >
                  {appointment.isFirstConsultation ? 'Primera consulta' : 'Consulta de seguimiento'}
                </Badge>
              </TableCell>
              {isAdmin && (
                <TableCell>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => handleDelete(appointment.id)}
                    disabled={isPending}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          )
        })}
        {appointments.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={showUserInfo ? (isAdmin ? 5 : 4) : (isAdmin ? 4 : 3)}
              className='text-center h-24'
            >
              No hay turnos programados
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
} 