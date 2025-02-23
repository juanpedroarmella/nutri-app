import { TableSkeleton } from '@/common/components/table-skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card'
import { Skeleton } from '@/common/components/ui/skeleton'
import { Suspense } from 'react'
import { weightTrackingService } from '../services/weight-tracking.service'
import { trackingService } from '../services/tracking.service'
import WeightTrackingChart from './weight-tracking-chart.component'
import WeightTrackingForm from './weight-tracking-form.component'
import WeightTrackingList from './weight-tracking-list.component'
import TrackingChart from './tracking-chart.component'
import TrackingForm from './tracking-form.component'
import TrackingList from './tracking-list.component'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/common/components/ui/tabs'

async function SuspensedTrackingSection({
  isAdmin,
  userId
}: {
  isAdmin: boolean
  userId: string
}) {
  const { data: weightTrackings } = await weightTrackingService.getWeightTrackingByUserId(userId)
  const { data: hipTrackings } = await trackingService.getTrackingByUserId(userId, 'hip')
  const { data: waistTrackings } = await trackingService.getTrackingByUserId(userId, 'waist')

  return (
    <Tabs defaultValue='weight' className='space-y-4'>
      <TabsList>
        <TabsTrigger value='weight'>Peso</TabsTrigger>
        <TabsTrigger value='hip'>Cadera</TabsTrigger>
        <TabsTrigger value='waist'>Cintura</TabsTrigger>
      </TabsList>

      <TabsContent value='weight' className='space-y-4'>
        {weightTrackings && weightTrackings.length > 0 && (
          <WeightTrackingChart trackings={weightTrackings} />
        )}
        {isAdmin && <WeightTrackingForm userId={userId} />}
        <WeightTrackingList
          trackings={weightTrackings || []}
          userId={userId}
          isAdmin={isAdmin}
        />
      </TabsContent>

      <TabsContent value='hip' className='space-y-4'>
        {hipTrackings && hipTrackings.length > 0 && (
          <TrackingChart trackings={hipTrackings} type='hip' />
        )}
        {isAdmin && <TrackingForm userId={userId} type='hip' />}
        <TrackingList
          trackings={hipTrackings || []}
          userId={userId}
          type='hip'
          isAdmin={isAdmin}
        />
      </TabsContent>

      <TabsContent value='waist' className='space-y-4'>
        {waistTrackings && waistTrackings.length > 0 && (
          <TrackingChart trackings={waistTrackings} type='waist' />
        )}
        {isAdmin && <TrackingForm userId={userId} type='waist' />}
        <TrackingList
          trackings={waistTrackings || []}
          userId={userId}
          type='waist'
          isAdmin={isAdmin}
        />
      </TabsContent>
    </Tabs>
  )
}

export default async function TrackingSection({
  isAdmin = false,
  userId
}: {
  isAdmin?: boolean
  userId: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seguimientos</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense
          fallback={
            <div className='flex flex-col gap-6 w-full'>
              <Skeleton className='w-full h-[500px]' />
              <TableSkeleton rows={3} columns={3} />
            </div>
          }
        >
          <SuspensedTrackingSection isAdmin={isAdmin} userId={userId} />
        </Suspense>
      </CardContent>
    </Card>
  )
} 