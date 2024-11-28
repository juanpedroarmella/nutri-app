import ListUserComponent from '@/features/users/components/list-user.component'
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card'
import { Separator } from '@/common/components/ui/separator'
import { UsersIcon } from 'lucide-react'
import CreateUserDialog from '@/features/users/components/dialogs/create-user-dialog.component'

export default async function AdminPage() {
  return (
    <div className='flex-1 w-full flex flex-col gap-6 p-6 max-w-7xl mx-auto'>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <UsersIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>Panel de Administración</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Gestiona los usuarios del sistema
                </p>
              </div>
            </div>
            <CreateUserDialog />
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <ListUserComponent />
        </CardContent>
      </Card>
    </div>
  )
}