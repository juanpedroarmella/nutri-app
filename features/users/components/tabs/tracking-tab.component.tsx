import WeightTrackingSection from '@/features/tracking/components/weight-tracking-section.component'
import { User } from '../../types/user.types'

interface TrackingTabProps {
  user: User
}

export default function TrackingTab({ user }: TrackingTabProps) {
  return (
    <div className='space-y-6'>
      <WeightTrackingSection userId={user.idAuth} isAdmin={true} />
    </div>
  )
} 