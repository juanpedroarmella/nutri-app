'use client'

import { Button } from '@/common/components/ui/button'
import { Input } from '@/common/components/ui/input'
import { Label } from '@/common/components/ui/label'
import { Textarea } from '@/common/components/ui/textarea'
import { useToast } from '@/common/hooks/use-toast'
import { useState, useTransition } from 'react'
import { addWeightTracking } from '../actions/weight-tracking.actions'

interface WeightTrackingFormProps {
  userId: string
  onSuccess?: () => void
}

export default function WeightTrackingForm({ userId, onSuccess }: WeightTrackingFormProps) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const weight = Number(formData.get('weight'))
    const notes = formData.get('notes') as string

    startTransition(async () => {
      const result = await addWeightTracking(userId, weight, new Date(date), notes)

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
        description: 'Seguimiento agregado correctamente'
      })

      onSuccess?.()
    })
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='weight'>Peso (kg)</Label>
          <Input
            id='weight'
            name='weight'
            type='number'
            step='0.1'
            required
            placeholder='Ej: 70.5'
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