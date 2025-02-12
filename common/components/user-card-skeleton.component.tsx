import { Skeleton } from './ui/skeleton'

export function UserCardSkeleton() {
  return (
    <div className='flex items-center space-x-4'>
      <div className='space-y-2'>
        <Skeleton className='h-2 w-[150px]' />
        <Skeleton className='h-2 w-[100px]' />
      </div>
      <Skeleton className='h-6 w-6 rounded-full' />
    </div>
  )
}
