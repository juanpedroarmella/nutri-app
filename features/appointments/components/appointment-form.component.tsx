'use client'

import { Button } from '@/common/components/ui/button'
import { Input } from '@/common/components/ui/input'
import { useToast } from '@/common/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { createAppointment } from '../actions/appointment.actions'
import { Switch } from '@/common/components/ui/switch'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form
} from '@/common/components/ui/form'
import { User } from '@/features/users/types/user.types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/common/components/ui/select'

const formSchema = z.object({
  date: z.string().min(1, 'La fecha es requerida'),
  time: z.string().min(1, 'La hora es requerida'),
  isFirstConsultation: z.boolean().default(false),
  userId: z.string().min(1, 'El usuario es requerido')
})

interface AppointmentFormProps {
  onSuccess?: () => void
  users: User[]
}

export default function AppointmentForm({
  onSuccess,
  users
}: AppointmentFormProps) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      time: '',
      isFirstConsultation: false,
      userId: users.length === 1 ? users[0].id : ''
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const user = users.find(u => u.id === values.userId)
      if (!user) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Usuario no encontrado'
        })
        return
      }

      const result = await createAppointment({
        ...values,
        idAuth: user.idAuth
      })

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
        description: 'Turno creado correctamente'
      })

      form.reset()
      onSuccess?.()
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='userId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asignar a usuario</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={users.length === 1 ? users[0].idAuth : field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona un usuario' />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map(u => (
                        <SelectItem key={u.id} value={u.id}>
                          {u.firstName} {u.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha</FormLabel>
                <FormControl>
                  <Input
                    type='date'
                    min={new Date().toISOString().split('T')[0]}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='time'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora</FormLabel>
                <FormControl>
                  <Input type='time' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='isFirstConsultation'
          render={({ field }) => (
            <FormItem className='flex items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>Primera consulta</FormLabel>
                <div className='text-sm text-muted-foreground'>
                  Marcar si es la primera consulta del paciente
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isPending} className='w-full'>
          {isPending ? 'Guardando...' : 'Crear Turno'}
        </Button>
      </form>
    </Form>
  )
}
