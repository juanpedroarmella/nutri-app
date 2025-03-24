'use client'

import { Button } from '@/common/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/common/components/ui/dialog'
import { Input } from '@/common/components/ui/input'
import { Label } from '@/common/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/common/components/ui/select'
import { useToast } from '@/common/hooks/use-toast'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { editUser } from '../../actions/edit-user.action'
import { User, UserRole } from '../../types/user.types'

interface EditUserDialogProps {
  user: User
  children?: React.ReactNode
}

export default function EditUserDialog({ user, children }: EditUserDialogProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const phone = formData.get('phone') as string || null
    const role = formData.get('role') as UserRole

    const result = await editUser(user.id, {
      first_name: firstName,
      last_name: lastName,
      phone: phone ? Number(phone) : null,
      role
    })

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error
      })
      setLoading(false)
      return
    }

    toast({
      title: 'Éxito',
      description: 'Usuario editado correctamente'
    })

    setOpen(false)
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>
            Edita los datos del usuario. Haz clic en guardar cuando hayas
            terminado.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                id="firstName"
                name="firstName"
                defaultValue={user.firstName}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                name="lastName"
                defaultValue={user.lastName}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={user.phone?.toString() || ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Rol</Label>
            <Select name="role" defaultValue={user.role}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                <SelectItem value={UserRole.USER}>Usuario</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 