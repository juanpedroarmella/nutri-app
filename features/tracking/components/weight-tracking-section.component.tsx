import { TableSkeleton } from '@/common/components/table-skeleton'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/common/components/ui/card'
import { Skeleton } from '@/common/components/ui/skeleton'
import { Suspense } from 'react'
import { weightTrackingService } from '../services/weight-tracking.service'
import WeightTrackingChart from './weight-tracking-chart.component'
import WeightTrackingForm from './weight-tracking-form.component'
import WeightTrackingList from './weight-tracking-list.component'

interface WeightTrackingSectionProps {
  isAdmin?: boolean
  userId: string
}

async function SuspensedWeightTrackingSection({
  isAdmin,
  userId
}: {
  isAdmin: boolean
  userId: string
}) {
  const { data: trackings, error } =
    await weightTrackingService.getWeightTrackingByUserId(userId)

  if (error) {
    return <p className='text-destructive'>{error}</p>
  }

  return (
    <>
      {trackings && trackings.length > 0 && (
        <WeightTrackingChart trackings={trackings} />
      )}
      {isAdmin && <WeightTrackingForm userId={userId} />}
      {isAdmin && (
        <WeightTrackingList
          trackings={trackings || []}
          userId={userId}
          isAdmin={isAdmin}
        />
      )}
    </>
  )
}

export default async function WeightTrackingSection({
  isAdmin = false,
  userId
}: WeightTrackingSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seguimiento de Peso</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-6'>
        <Suspense
          fallback={
            <div className='flex flex-col gap-6 w-full'>
              <Skeleton className='w-full h-[500px]' />
              <TableSkeleton rows={3} columns={3} />
            </div>
          }
        >
          <SuspensedWeightTrackingSection isAdmin={isAdmin} userId={userId} />
        </Suspense>
      </CardContent>
    </Card>
  )
}
