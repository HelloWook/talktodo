'use client';

import { Skeleton } from '../ui/skeleton';

const GoalLayoutSkeleton = () => {
  return (
    <>
      <div className='flex w-full items-center justify-between py-4'>
        <Skeleton className='h-10 w-10 rounded-full bg-purple-300' />
        <div className='flex flex-1 flex-col items-center gap-1 px-4'>
          <Skeleton className='h-7 w-48 bg-purple-300' />
          <Skeleton className='h-4 w-12 bg-purple-300' />
        </div>
        <Skeleton className='h-10 w-10 rounded-full bg-purple-300' />
      </div>

      <div className='flex-1 overflow-hidden rounded-2xl bg-white p-6'>
        <div className='mb-4 flex items-center justify-between'>
          <Skeleton className='h-7 w-24 bg-purple-300' />
          <Skeleton className='h-5 w-16 bg-purple-300' />
        </div>
        <div className='space-y-3'>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className='rounded-xl border border-gray-200 bg-purple-100 p-4'>
              <div className='flex items-start gap-3'>
                <Skeleton className='mt-0.5 h-5 w-5 flex-shrink-0 rounded border-2 border-gray-300 bg-white' />
                <div className='flex-1 space-y-2'>
                  <Skeleton className='h-5 w-3/4 bg-purple-300' />
                  <Skeleton className='h-4 w-1/2 bg-purple-300' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GoalLayoutSkeleton;
