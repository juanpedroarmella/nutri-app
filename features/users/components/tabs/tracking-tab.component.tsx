import TrackingSection from '@/features/tracking/components/tracking-section.component'

export default function TrackingTab({
  userId,
  isAdmin
}: {
  userId: string
  isAdmin: boolean
}) {
  return (
    <div className='space-y-6'>
      <TrackingSection isAdmin={isAdmin} userId={userId} />
    </div>
  )
}
