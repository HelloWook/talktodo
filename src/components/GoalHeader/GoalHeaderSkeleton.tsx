'use client';

import { cn } from '@/utils/cn';

const GoalHeaderSkeleton = () => {
  return (
    <header className='mx-auto mb-3 flex w-full flex-col items-start rounded-[40px] bg-purple-500 p-6'>
      <div className='flex w-full flex-row items-center justify-center gap-11'>
        <div className='relative flex flex-1 flex-col justify-between gap-3'>
          <div className='flex items-start justify-between'>
            <div className='flex flex-col gap-2'>
              <div className='h-8 w-32 animate-pulse rounded bg-purple-400' />
              <div className='h-8 w-48 animate-pulse rounded bg-purple-400' />
            </div>
            <div className='flex items-center gap-5'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='flex flex-col items-center gap-1'>
                  <div className='h-8 w-12 animate-pulse rounded bg-purple-400' />
                  <div className='h-4 w-16 animate-pulse rounded bg-purple-300' />
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='h-4 w-32 animate-pulse rounded bg-purple-300' />
            <div className='h-4 w-full animate-pulse rounded bg-purple-300' />
          </div>
        </div>
        <div className='h-[166px] w-[180px] animate-pulse rounded bg-purple-400' />
      </div>
    </header>
  );
};

export default GoalHeaderSkeleton;
