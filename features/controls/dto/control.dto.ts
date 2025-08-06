import { z } from 'zod'

export const CreateControlSchema = z.object({
  user_id: z.string().uuid('ID de usuario debe ser un UUID válido'),
  consultation_date: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    'Fecha de consulta debe ser una fecha válida'
  ),
  notes: z.string().min(1, 'Las notas son obligatorias').max(2000, 'Las notas no pueden exceder 2000 caracteres')
})

export const UpdateControlSchema = z.object({
  id: z.string().uuid('ID debe ser un UUID válido'),
  consultation_date: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    'Fecha de consulta debe ser una fecha válida'
  ).optional(),
  notes: z.string().min(1, 'Las notas son obligatorias').max(2000, 'Las notas no pueden exceder 2000 caracteres').optional()
})

export const ControlFiltersSchema = z.object({
  user_id: z.string().uuid().optional(),
  date_from: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    'Fecha desde debe ser una fecha válida'
  ).optional(),
  date_to: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    'Fecha hasta debe ser una fecha válida'
  ).optional()
})

export type CreateControlDto = z.infer<typeof CreateControlSchema>
export type UpdateControlDto = z.infer<typeof UpdateControlSchema>
export type ControlFiltersDto = z.infer<typeof ControlFiltersSchema>