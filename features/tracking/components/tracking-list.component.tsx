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
import { deleteTracking } from '../actions/tracking-delete.action'
import { Tracking, TrackingType } from '../types/tracking.types'

interface TrackingListProps {
  trackings: Tracking[]
  userId: string
  type: TrackingType
  isAdmin?: boolean
}

export default function TrackingList({
  trackings,
  userId,
  type,
  isAdmin = false
}: TrackingListProps) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteTracking(id, userId)

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
        description: 'Seguimiento eliminado correctamente'
      })
    })
  }

  const getValueLabel = () => {
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>{getValueLabel()}</TableHead>
          {isAdmin && <TableHead>Notas</TableHead>}
          {isAdmin && <TableHead className='w-[100px]'>Acciones</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {trackings.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className='h-24 text-center'>
              No hay datos de seguimiento
            </TableCell>
          </TableRow>
        )}
        {trackings.map(tracking => (
          <TableRow key={tracking.id}>
            <TableCell>
              {new Date(tracking.date).toLocaleDateString()}
            </TableCell>
            <TableCell>{tracking.value}</TableCell>
            {isAdmin && <TableCell>{tracking.notes || '-'}</TableCell>}
            {isAdmin && (
              <TableCell>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => handleDelete(tracking.id)}
                  disabled={isPending}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 