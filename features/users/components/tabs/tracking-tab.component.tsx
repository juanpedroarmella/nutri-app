import WeightTrackingSection from '@/features/tracking/components/weight-tracking-section.component'

export default function TrackingTab({ userId }: { userId: string }) {
  return (
    <div className='space-y-6'>
      <WeightTrackingSection isAdmin={true} userId={userId} />
    </div>
  )
}
