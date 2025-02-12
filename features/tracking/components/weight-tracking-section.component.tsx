import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card'
import { weightTrackingService } from '../services/weight-tracking.service'
import WeightTrackingChart from './weight-tracking-chart.component'
import WeightTrackingForm from './weight-tracking-form.component'
import WeightTrackingList from './weight-tracking-list.component'

interface WeightTrackingSectionProps {
  userId: string
  isAdmin?: boolean
}

export default async function WeightTrackingSection({ 
  userId,
  isAdmin = false 
}: WeightTrackingSectionProps) {
  const { data: trackings, error } = await weightTrackingService.getWeightTrackingByUserId(userId)

  if (error) {
    return (
      <Card>
        <CardContent className='pt-6'>
          <p className='text-destructive'>{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seguimiento de Peso</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-6'>
        {trackings && trackings.length > 0 && (
          <WeightTrackingChart trackings={trackings} />
        )}
        
        {isAdmin && <WeightTrackingForm userId={userId} />}
        
        <WeightTrackingList 
          trackings={trackings || []} 
          userId={userId}
          isAdmin={isAdmin}
        />
      </CardContent>
    </Card>
  )
} 