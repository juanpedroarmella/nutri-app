import { Label } from '@/common/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/common/components/ui/select'

const EXERCISE_OPTIONS = [
  { value: 0, label: 'No hace ejercicio' },
  { value: 1, label: '1 vez por semana' },
  { value: 2, label: '2 veces por semana' },
  { value: 3, label: '3 veces por semana' },
  { value: 4, label: '4 veces por semana' },
  { value: 5, label: '5 veces por semana' },
  { value: 6, label: '6 veces por semana' },
  { value: 7, label: '7 veces por semana' }
] as const

interface ExerciseRoutineInputProps {
  defaultValue?: number
}

export function ExerciseRoutineInput({ defaultValue = 0 }: ExerciseRoutineInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label>Rutina de Ejercicio</Label>
      <Select name="daily_routine" defaultValue={defaultValue.toString()}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar frecuencia de ejercicio" />
        </SelectTrigger>
        <SelectContent>
          {EXERCISE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 