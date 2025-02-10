'use client'

import { Card, CardContent } from '@/common/components/ui/card'
import { ClinicalData } from '../types/clinical-history.types'
import { useToast } from '@/common/hooks/use-toast'
import { useEffect } from 'react'

interface ClinicalHistoryViewProps {
  clinicalData: ClinicalData | null
  error: string | null
}

export default function ClinicalHistoryView({
  clinicalData,
  error
}: ClinicalHistoryViewProps) {
  const { toast } = useToast()

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error
      })
    }
  }, [error, toast])

  if (!clinicalData) {
    return (
      <div className='text-center py-10 text-muted-foreground'>
        No hay historia clínica disponible
      </div>
    )
  }

  const sections = [
    {
      title: 'Datos Personales',
      fields: [
        { label: 'Edad', value: clinicalData.age },
        { label: 'Altura', value: `${clinicalData.size} cm` },
        { label: 'Peso', value: `${clinicalData.weight} kg` },
        { label: 'IMC', value: clinicalData.imc },
        {
          label: 'Fecha de Nacimiento',
          value: clinicalData.birthDate
            ? new Date(clinicalData.birthDate).toLocaleDateString()
            : '-'
        },
        { label: 'Ocupación', value: clinicalData.occupation }
      ]
    },
    {
      title: 'Información Médica',
      fields: [
        {
          label: 'Motivo de Consulta',
          value: clinicalData.reasonForConsultation
        },
        {
          label: 'Patologías',
          value: clinicalData.patologies?.join(', ') || '-'
        },

        {
          label: 'Medicamentos',
          value: clinicalData.medications?.join(', ') || '-'
        },

        {
          label: 'Análisis Clínicos',
          value: clinicalData.clinicalAnalyses?.join(', ') || '-'
        }
      ]
    },
    {
      title: 'Hábitos y Preferencias',
      fields: [
        { label: 'Consumo de Agua', value: clinicalData.waterConsumption },
        {
          label: 'Alimentos Preferidos',
          value: clinicalData.foodLike?.join(', ') || '-'
        },
        {
          label: 'Alimentos que no gustan',
          value: clinicalData.foodDislike?.join(', ') || '-'
        },


        {
          label: 'Condimentos',
          value: clinicalData.seasoningsConsumption?.join(', ') || '-'
        },

        {
          label: 'Suplementos',
          value: clinicalData.supplements?.join(', ') || '-'
        }

      ]
    },
    {
      title: 'Tratamiento y Observaciones',
      fields: [
        { label: 'Rutina Alimenticia', value: clinicalData.foodRoutine || '-' },
        {
          label: 'Posible Tratamiento',
          value: clinicalData.possibleTreatment || '-'
        },
        { label: 'Observaciones', value: clinicalData.observations || '-' }
      ]
    }
  ]

  return (
    <div className='flex flex-col gap-6'>
      {sections.map(section => (
        <Card key={section.title}>
          <CardContent className='pt-6'>
            <h3 className='font-semibold text-lg mb-4'>{section.title}</h3>
            <div className='grid gap-4'>
              {section.fields.map(field => (
                <div key={field.label}>
                  <label className='text-sm text-muted-foreground'>
                    {field.label}
                  </label>
                  <p className='font-medium'>{field.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
