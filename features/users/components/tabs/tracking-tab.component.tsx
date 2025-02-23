import TrackingSection from '@/features/tracking/components/tracking-section.component'

export default function TrackingTab({ userId }: { userId: string }) {
  return (
    <div className='space-y-6'>
      <TrackingSection isAdmin={true} userId={userId} />
    </div>
  )
}
