import WeightTrackingSection from '@/features/tracking/components/weight-tracking-section.component'

export default function TrackingTab() {
  return (
    <div className='space-y-6'>
      <WeightTrackingSection isAdmin={true} />
    </div>
  )
}
