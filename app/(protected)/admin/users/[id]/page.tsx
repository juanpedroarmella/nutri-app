import { Button } from '@/common/components/ui/button'
import { Skeleton } from '@/common/components/ui/skeleton'
import { AdminRoutes } from '@/common/types/routes.types'
import UserDetailsTabs from '@/features/users/components/user-details-tabs.component'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function UserDetailsPage({ params }: PageProps) {
  const resolvedParams = await params

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
      <Suspense fallback={<Skeleton className='h-[500px] w-full' />}>
        <UserDetailsTabs id={resolvedParams.id} />
      </Suspense>
    </div>
  )
}
