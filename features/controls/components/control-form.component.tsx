'use client'

import { Button } from '@/common/components/ui/button'
import { Input } from '@/common/components/ui/input'
import { Textarea } from '@/common/components/ui/textarea'
import { useToast } from '@/common/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { createControl, updateControl } from '../actions/control.actions'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
  FormMessage
} from '@/common/components/ui/form'
import { User } from '@/features/users/types/user.types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/common/components/ui/select'
import { ControlWithUserEntity } from '../entity/control.entity'

const formSchema = z.object({
  user_id: z.string().min(1, 'El usuario es requerido'),
  consultation_date: z.string().min(1, 'La fecha de consulta es requerida'),
  notes: z.string().min(1, 'Las notas son obligatorias').max(2000, 'Las notas no pueden exceder 2000 caracteres')
})

interface ControlFormProps {
  onSuccess?: () => void
  users: User[]
  control?: ControlWithUserEntity
  mode?: 'create' | 'edit'
}

export default function ControlForm({
  onSuccess,
  users,
  control,
  mode = 'create'
}: ControlFormProps) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: control?.user_id || (users.length === 1 ? users[0].id : ''),
      consultation_date: control?.consultation_date || new Date().toISOString().split('T')[0],
      notes: control?.notes || ''
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const formData = new FormData()
      
      if (mode === 'edit' && control?.id) {
        formData.append('id', control.id)
      }
      
      formData.append('user_id', values.user_id)
      formData.append('consultation_date', values.consultation_date)
      formData.append('notes', values.notes)

      const result = mode === 'edit' 
        ? await updateControl(formData)
        : await createControl(formData)

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
        description: mode === 'edit' 
          ? 'Control actualizado correctamente'
          : 'Control creado correctamente'
      })

      form.reset()
      onSuccess?.()
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paciente</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={mode === 'edit'}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un paciente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.firstName} {user.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consultation_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Consulta</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notas del Control</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe las observaciones, medidas, recomendaciones y cualquier información relevante del control..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Guardando...' : mode === 'edit' ? 'Actualizar Control' : 'Crear Control'}
          </Button>
        </div>
      </form>
    </Form>
  )
}