import { userService } from '@/features/users/service/user.service'
import WeightTrackingSection from '@/features/tracking/components/weight-tracking-section.component'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ userId: string }>
}

export default async function TrackingPage({ params }: PageProps) {
  const resolvedParams = await params

  const user = await userService.getUser(resolvedParams.userId)

  if (!user) {
    notFound()
  }

  return (
    <div className='flex-1 w-full flex flex-col gap-6 p-3 sm:p-6 max-w-7xl mx-auto'>
      <WeightTrackingSection userId={user.idAuth} />
    </div>
  )
}
