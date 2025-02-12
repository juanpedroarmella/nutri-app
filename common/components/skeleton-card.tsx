import { Skeleton } from './ui/skeleton'

export function SkeletonCard() {
  return (
    <div className='flex flex-col gap-3'>
      <Skeleton className='h-[500px] w-full rounded-xl' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[75%]' />
        <Skeleton className='h-4 w-[50%]' />
      </div>
    </div>
  )
}
