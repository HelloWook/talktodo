'use client';

import { Skeleton } from '@/components/ui/skeleton';

const TaskSelectorSkeleton = () => {
  return (
    <div className='m-auto flex w-full max-w-[624px] flex-col items-center justify-center'>
      <Skeleton className='mb-3 h-[120px] w-[110px] -translate-x-6 rounded bg-purple-300' />
      <div className='w-[95%] rounded-4xl bg-purple-100 p-9 shadow'>
        {/* Header Skeleton */}
        <div className='mb-3'>
          <Skeleton className='mb-5 h-8 w-full max-w-[400px] bg-purple-300' />
          <div className='flex items-center gap-1'>
            <Skeleton className='h-6 w-6 rounded bg-purple-300' />
            <Skeleton className='h-6 w-20 bg-purple-300' />
          </div>
        </div>

        {/* Goals List Skeleton */}
        <div className='scrollbar-hide flex h-[350px] flex-col gap-2 overflow-y-scroll'>
          {[1, 2, 3, 4, 5].map((item) => (
            <Skeleton key={item} className='h-[56px] w-full rounded-xl bg-purple-300' />
          ))}
        </div>

        {/* Action Buttons Skeleton */}
        <div className='mt-4 flex w-full gap-2'>
          <Skeleton className='h-[56px] flex-1 rounded-xl bg-purple-300' />
          <Skeleton className='h-[56px] flex-1 rounded-xl bg-purple-300' />
        </div>
      </div>
    </div>
  );
};

export default TaskSelectorSkeleton;
