import { userService } from '@/features/users/service/user.service'
import TrackingSection from '@/features/tracking/components/tracking-section.component'
import { notFound } from 'next/navigation'

export default async function TrackingPage() {
  const user = await userService.getCurrentUser()

  if (!user) {
    notFound()
  }

  return (
    <div className='flex-1 w-full flex flex-col gap-6 p-3 sm:p-6 max-w-7xl mx-auto'>
      <TrackingSection userId={user.idAuth} />
    </div>
  )
}
