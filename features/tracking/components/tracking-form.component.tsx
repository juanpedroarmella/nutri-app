'use client'


import { useState, useTransition } from 'react'
import { createTracking } from '../actions/tracking-create.action'
import { TrackingType } from '../types/tracking.types'
import { useToast } from '@/common/hooks/use-toast'
import { Label } from '@/common/components/ui/label'
import { Input } from '@/common/components/ui/input'
import { Textarea } from '@/common/components/ui/textarea'
import { Button } from '@/common/components/ui/button'

interface TrackingFormProps {
  userId: string
  type: TrackingType
  onSuccess?: () => void
}

export default function TrackingForm({ userId, type, onSuccess }: TrackingFormProps) {
  const [isPending, startTransition] = useTransition()
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const value = Number(formData.get('value'))
    const notes = formData.get('notes') as string

    startTransition(async () => {
      const result = await createTracking(
        userId,
        type,
        value,
        new Date(date),
        notes
      )

      if (result.success) {
        toast({
          title: 'Éxito',
          description: 'Seguimiento guardado correctamente'
        })
        onSuccess?.()
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error
        })
      }
    })
  }

  const getLabel = () => {
    switch (type) {
      case 'hip':
        return 'Cadera (cm)'
      case 'waist':
        return 'Cintura (cm)'
      default:
        return 'Valor'
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='value'>{getLabel()}</Label>
          <Input
            id='value'
            name='value'
            type='number'
            step='0.1'
            required
            placeholder='Ej: 90.5'
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='date'>Fecha</Label>
          <Input
            id='date'
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>
      <div className='space-y-2'>
        <Label htmlFor='notes'>Notas</Label>
        <Textarea
          id='notes'
          name='notes'
          placeholder='Observaciones adicionales...'
        />
      </div>
      <Button type='submit' disabled={isPending}>
        {isPending ? 'Guardando...' : 'Guardar Seguimiento'}
      </Button>
    </form>
  )
} 