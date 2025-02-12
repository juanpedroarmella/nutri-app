import { Skeleton } from '@/common/components/ui/skeleton'
import EditProfileForm from '@/features/profile/components/edit-profile-form'
import { userService } from '@/features/users/service/user.service'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

async function SuspensedProfilePage() {
  const user = await userService.getCurrentUser()

  if (!user) {
    notFound()
  }

  return <EditProfileForm user={user} />
}

export default async function ProfilePage() {
  return (
    <div className='flex-1 w-full flex flex-col gap-6 p-6 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold'>Mi Perfil</h1>

      <Suspense fallback={<Skeleton className='h-[500px] w-full' />}>
        <SuspensedProfilePage />
      </Suspense>
    </div>
  )
}
