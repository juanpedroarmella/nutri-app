'use client'

import { DynamicListInput } from '@/common/components/dynamic-list.component'
import { Button } from '@/common/components/ui/button'
import { Input } from '@/common/components/ui/input'
import { Label } from '@/common/components/ui/label'
import { Textarea } from '@/common/components/ui/textarea'
import { useToast } from '@/common/hooks/use-toast'
import { useEffect, useState } from 'react'
import { useImc } from '../hooks/useImc.hook'
import { ClinicalData } from '../types/clinical-history.types'
import { ExerciseRoutineInput } from './exercise-routine-input.component'
import { updateHistory } from '../actions/update-history.action'

interface ClinicalHistoryFormProps {
  userId: string
  initialData: Partial<ClinicalData> | null
  error: string | null
}

export default function ClinicalHistoryForm({
  userId,
  initialData,
  error
}: ClinicalHistoryFormProps) {
  const { toast } = useToast()
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    if (error) {
      toast({
        variant: 'default',
        title: 'Información',
        description: error
      })
    }
  }, [error, toast])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data: Partial<ClinicalData> = {
        age: Number(formData.get('age')),
        size: Number(formData.get('size')),
        weight: Number(formData.get('weight')),
        birthDate: new Date(formData.get('birthDate') as string),
        occupation: formData.get('occupation') as string,
        reasonForConsultation: formData.get('reasonForConsultation') as string,
        patologies: formData.getAll('patologies') as string[],
        clinicalHistory: formData.getAll('clinicalHistory') as string[],
        medications: formData.getAll('medications') as string[],
        clinicalAnalyses: formData.getAll('clinicalAnalyses') as string[],
        imc: Number(formData.get('imc')),
        prevNutrTreatments: formData.getAll('prevNutrTreatments') as string[],
        dailyRoutine: Number(formData.get('dailyRoutine')),
        foodLike: formData.getAll('foodLike') as string[],
        foodDislike: formData.getAll('foodDislike') as string[],
        waterConsumption: formData.get('waterConsumption') as string,
        seasoningsConsumption: formData.getAll(
          'seasoningsConsumption'
        ) as string[],
        observations: formData.get('observations') as string,
        possibleTreatment: formData.get('possibleTreatment') as string,
        foodRoutine: formData.get('foodRoutine') as string,
        supplements: formData.getAll('supplements') as string[]
      }

      console.log(userId)

      const res = await updateHistory(data, userId, initialData?.id)

      if (res?.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: res.error || 'Ocurrió un error al guardar los datos'
        })
        return
      }

      toast({
        title: 'Historia clínica guardada',
        description: 'Los datos se han guardado exitosamente'
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Ocurrió un error al guardar los datos'
      })
    } finally {
      setIsPending(false)
    }
  }

  const { state, onChangeWeight, onChangeSize } = useImc({
    weight: initialData?.weight,
    size: initialData?.size
  })

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
      <section className='flex flex-col gap-4'>
        <header>
          <h2 className='text-xl font-semibold'>Datos Personales</h2>
        </header>
        <div className='flex gap-3 w-full'>
          <article className='flex flex-col gap-3 w-full'>
            <Label htmlFor='age'>Edad</Label>
            <Input
              id='age'
              name='age'
              placeholder='Ingrese la edad'
              type='number'
              defaultValue={initialData?.age}
              required
            />
          </article>
          <article className='flex flex-col gap-3 w-full'>
            <Label htmlFor='size'>Altura (cm)</Label>
            <Input
              id='size'
              name='size'
              type='number'
              onChange={e => onChangeSize(Number(e.target.value))}
              placeholder='Ingrese la altura'
              defaultValue={initialData?.size}
              required
            />
          </article>
        </div>

        <div className='flex gap-3 w-full'>
          <article className='flex flex-col gap-3 w-full'>
            <Label htmlFor='weight'>Peso (kg)</Label>
            <Input
              id='weight'
              name='weight'
              type='number'
              placeholder='Ingrese el peso'
              onChange={e => onChangeWeight(Number(e.target.value))}
              defaultValue={initialData?.weight}
              required
            />
          </article>
          <article className='flex flex-col gap-3 w-full'>
            <Label htmlFor='birthDate'>Fecha de nacimiento</Label>
            <Input
              id='birthDate'
              name='birthDate'
              type='date'
              defaultValue={initialData?.birthDate?.toString()}
              required
            />
          </article>
        </div>

        <article className='flex flex-col gap-3 w-full'>
          <Label htmlFor='imc'>IMC</Label>
          <Input
            id='imc'
            name='imc'
            type='number'
            key={state.imc}
            defaultValue={state.imc || 0}
            readOnly
            required
          />
        </article>

        <article className='flex flex-col gap-3'>
          <Label htmlFor='reasonForConsultation'>Motivo de consulta</Label>
          <Input
            id='reasonForConsultation'
            name='reasonForConsultation'
            placeholder='Ingrese el motivo de consulta'
            defaultValue={initialData?.reasonForConsultation}
            required
          />
        </article>

        <article className='flex flex-col gap-3'>
          <Label htmlFor='occupation'>Ocupación</Label>
          <Input
            id='occupation'
            name='occupation'
            placeholder='Ingrese la ocupación'
            defaultValue={initialData?.occupation}
            required
          />
        </article>
      </section>

      <section className='flex flex-col gap-4'>
        <header>
          <h2 className='text-xl font-semibold'>Información Médica</h2>
        </header>

        <DynamicListInput
          label='Patologías'
          name='patologies'
          placeholder='Agregar patología'
          defaultValue={initialData?.patologies}
        />

        <DynamicListInput
          label='Medicamentos'
          name='medications'
          placeholder='Agregar medicamento'
          defaultValue={initialData?.medications}
        />

        <DynamicListInput
          label='Analisis clinicos'
          name='clinicalAnalyses'
          placeholder='Agregar analisis'
          defaultValue={initialData?.clinicalAnalyses}
          className='w-full'
        />

        <DynamicListInput
          label='Tratamientos nutricionales previos'
          name='prevNutrTreatments'
          placeholder='Agregar tratamientos nutricionales previos'
          defaultValue={initialData?.prevNutrTreatments}
          className='w-full'
        />
      </section>

      <section className='flex flex-col gap-4'>
        <header>
          <h2 className='text-xl font-semibold'>Hábitos y Preferencias</h2>
        </header>
        <ExerciseRoutineInput defaultValue={initialData?.dailyRoutine} />
        <article className='flex flex-col gap-3'>
          <Label htmlFor='waterConsumption'>Consumo de agua (L)</Label>
          <Input
            id='waterConsumption'
            placeholder='Ingrese el consumo de agua diario'
            name='waterConsumption'
            defaultValue={initialData?.waterConsumption}
          />
        </article>
        <div className='flex w-full gap-3'>
          <DynamicListInput
            label='Alimentos habituales'
            name='foodLike'
            placeholder='Agregar alimento'
            defaultValue={initialData?.foodLike}
            className='w-full'
          />

          <DynamicListInput
            label='Alimentos que no le gustan'
            name='foodDislike'
            placeholder='Agregar alimento'
            defaultValue={initialData?.foodDislike}
            className='w-full'
          />
        </div>
        <DynamicListInput
          label='Consumo de condimentos'
          name='seasoningsConsumption'
          placeholder='Agregar condimentos'
          defaultValue={initialData?.seasoningsConsumption}
        />
        <DynamicListInput
          label='Consumo de suplementos'
          name='supplements'
          placeholder='Agregar suplementos'
          defaultValue={initialData?.supplements}
          className='w-full'
        />
        <article className='flex flex-col gap-3'>
          <Label htmlFor='observations'>Rutina diara</Label>
          <Textarea
            id='foodRoutine'
            placeholder='Ingrese la rutina diaria alimenticia'
            name='foodRoutine'
            defaultValue={initialData?.foodRoutine}
          />
        </article>
        <article className='flex flex-col gap-3'>
          <Label htmlFor='possibleTreatment'>Posible tratamiento</Label>
          <Input
            id='possibleTreatment'
            name='possibleTreatment'
            placeholder='Ingrese el posible tratamiento'
            defaultValue={initialData?.possibleTreatment}
          />
        </article>
        <article className='flex flex-col gap-3'>
          <Label htmlFor='observations'>Observaciones</Label>
          <Textarea
            id='observations'
            placeholder='Ingrese las observaciones'
            name='observations'
            defaultValue={initialData?.observations}
          />
        </article>
      </section>

      <footer>
        <Button type='submit' disabled={isPending} className='w-full'>
          {isPending ? 'Guardando...' : 'Guardar Historia Clínica'}
        </Button>
      </footer>
    </form>
  )
}
