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
import { Trash2, Edit, Eye } from 'lucide-react'
import { useTransition, useState } from 'react'
import { ControlWithUserEntity } from '../entity/control.entity'
import DeleteControlDialog from './delete-control-dialog.component'
import { Badge } from '@/common/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/common/components/ui/dialog'

interface ControlListProps {
  controls: ControlWithUserEntity[]
  showUserInfo?: boolean
  isAdmin?: boolean
  onEditControl?: (control: ControlWithUserEntity) => void
}

export default function ControlList({
  controls,
  showUserInfo = true,
  isAdmin = false,
  onEditControl
}: ControlListProps) {
  const [isPending, startTransition] = useTransition()
  const [selectedControl, setSelectedControl] =
    useState<ControlWithUserEntity | null>(null)
  const [deletingControl, setDeletingControl] =
    useState<ControlWithUserEntity | null>(null)
  const { toast } = useToast()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleDelete = (control: ControlWithUserEntity) => {
    setDeletingControl(control)
  }

  const handleCloseDelete = () => {
    setDeletingControl(null)
  }

  const truncateNotes = (notes: string, maxLength: number = 150) => {
    if (notes.length <= maxLength) return notes

    // Find the last space before maxLength to avoid cutting words
    const truncated = notes.substring(0, maxLength)
    const lastSpace = truncated.lastIndexOf(' ')

    if (lastSpace > 0 && lastSpace > maxLength * 0.8) {
      return truncated.substring(0, lastSpace) + '...'
    }

    return truncated + '...'
  }

  if (controls.length === 0) {
    return (
      <div className='text-center py-8'>
        <p className='text-muted-foreground'>No hay controles registrados</p>
      </div>
    )
  }

  return (
    <>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {showUserInfo && <TableHead className='w-48'>Paciente</TableHead>}
              <TableHead className='w-40'>Fecha de Consulta</TableHead>
              <TableHead className='w-auto min-w-96'>
                Notas del Control
              </TableHead>
              {isAdmin && (
                <TableHead className='text-right w-24'>Acciones</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {controls.map(control => (
              <TableRow key={control.id} className='h-20'>
                {showUserInfo && (
                  <TableCell>
                    <div className='font-medium'>
                      {control.users.first_name} {control.users.last_name}
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      {control.users.email}
                    </div>
                  </TableCell>
                )}
                <TableCell>
                  <p className='text-sm text-muted-foreground'>
                    {formatDate(control.consultation_date)}
                  </p>
                </TableCell>
                <TableCell className='max-w-lg px-4 py-3'>
                  <div className='space-y-2'>
                    <p className='text-sm leading-relaxed text-gray-700'>
                      {truncateNotes(control.notes, 150)}
                    </p>
                    {control.notes.length > 150 && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant='link'
                            size='sm'
                            className='h-auto p-0 text-blue-600 hover:text-blue-800 flex gap-1'
                          >
                            <Eye className='h-3 w-3' />
                            Ver completo
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='max-w-2xl'>
                          <DialogHeader>
                            <DialogTitle className='text-lg'>
                              {showUserInfo
                                ? `Control - ${control.users.first_name} ${control.users.last_name}`
                                : 'Detalles del Control'}
                            </DialogTitle>
                            <DialogDescription className='text-sm'>
                              Fecha: {formatDate(control.consultation_date)}
                            </DialogDescription>
                          </DialogHeader>
                          <div className='flex flex-col gap-2'>
                            <h4 className='font-semibold mb-3 text-sm'>
                              Notas del control:
                            </h4>
                            <div className='bg-gray-50 p-4 rounded-lg border'>
                              <p className='text-sm leading-relaxed whitespace-pre-wrap'>
                                {control.notes}
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </TableCell>
                {isAdmin && (
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => onEditControl?.(control)}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                                             <Button
                         variant='outline'
                         size='sm'
                         onClick={() => handleDelete(control)}
                         disabled={isPending}
                       >
                         <Trash2 className='h-4 w-4' />
                       </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
          <DeleteControlDialog
        control={deletingControl}
        open={!!deletingControl}
        onClose={handleCloseDelete}
      />
      </>
    )
  }
