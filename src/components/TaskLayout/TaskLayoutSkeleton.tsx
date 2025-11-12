import { cn } from '@/utils/cn';

import { Skeleton } from '../ui/skeleton';

interface TaskLayoutSkeletonProps {
  className?: string;
}

const TaskLayoutSkeleton = ({ className }: TaskLayoutSkeletonProps) => {
  return (
    <div className={cn('flex h-full w-full flex-col', className)}>
      {/* DateSubHeader Skeleton */}
      <div className='flex w-full items-center py-4'>
        <div className='mx-auto flex items-center gap-2'>
          <Skeleton className='h-6 w-32 bg-purple-300' />
          <Skeleton className='h-8 w-8 rounded-full bg-purple-300' />
          <div className='flex gap-1'>
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton key={item} className='h-8 w-8 rounded-full bg-purple-300' />
            ))}
          </div>
        </div>
        <div>
          <Skeleton className='h-12 w-20 rounded-full bg-purple-300' />
        </div>
      </div>

      <div className='flex flex-1 gap-2 overflow-hidden'>
        <div className='flex h-full w-full flex-col gap-2'>
          <div className='mb-3 flex h-[44px] items-center gap-2 rounded-xl bg-purple-100 px-4'>
            <Skeleton className='h-5 w-20 bg-purple-300' />
            <Skeleton className='h-6 w-6 rounded-full bg-purple-300' />
          </div>
          <div className='scrollbar-hide flex-1 overflow-y-auto pb-4'>
            <div className='grid auto-rows-[170px] grid-cols-3 gap-2'>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Skeleton key={item} className='h-full w-full rounded-lg bg-purple-100' />
              ))}
            </div>
          </div>
        </div>

        <div className='flex h-full w-full flex-col gap-2'>
          <div className='mb-3 flex h-[44px] items-center gap-2 rounded-xl bg-purple-100 px-4'>
            <Skeleton className='h-5 w-20 bg-purple-300' />
            <Skeleton className='h-6 w-6 rounded-full bg-purple-300' />
          </div>
          <div className='scrollbar-hide flex-1 overflow-y-auto pb-4'>
            <div className='grid auto-rows-[170px] grid-cols-3 gap-2'>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Skeleton key={item} className='h-full w-full rounded-lg bg-purple-100' />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskLayoutSkeleton;
