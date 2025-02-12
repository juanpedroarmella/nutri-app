import WeightTrackingSection from '@/features/tracking/components/weight-tracking-section.component'

export default async function TrackingPage() {
  return (
    <div className='flex-1 w-full flex flex-col gap-6 p-3 sm:p-6 max-w-7xl mx-auto'>
      <WeightTrackingSection />
    </div>
  )
}
