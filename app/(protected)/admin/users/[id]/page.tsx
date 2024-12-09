import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card'
import { userService } from '@/features/users/service/user.service'
import { notFound } from 'next/navigation'
import { Button } from '@/common/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AdminRoutes } from '@/common/types/routes.types'
import EditUserDialog from '@/features/users/components/dialogs/edit-user-dialog.component'
import DeleteUserDialog from '@/features/users/components/dialogs/delete-user-dialog.component'
import UserDetailsTabs from '@/features/users/components/user-details-tabs.component'

interface PageProps {
  params: Promise<{ id: string }> 
}

export default async function UserDetailsPage({
  params
}: PageProps) {
  const resolvedParams = await params
  const user = await userService.getUser(resolvedParams.id)
  const currentUser = await userService.getCurrentUser()

  if (!user) {
    notFound()
  }

  return (
    <div className='flex-1 w-full flex flex-col gap-6 p-6 max-w-7xl mx-auto'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button variant='outline' size='icon' asChild>
            <Link href={AdminRoutes.HOME}>
              <ArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <h1 className='text-2xl font-bold'>Detalles del Usuario</h1>
        </div>

      </div>

      <UserDetailsTabs user={user} />
    </div>
  )
} 