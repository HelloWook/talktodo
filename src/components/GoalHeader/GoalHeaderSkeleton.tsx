'use client';

import Header from '../Header/Header';
import { Skeleton } from '../ui/skeleton';

const GoalHeaderSkeleton = () => {
  return (
    <Header className='mb-3 bg-purple-100'>
      <div className='flex w-full flex-row lg:flex-row lg:gap-11'>
        <div className='relative flex flex-1 flex-col justify-between gap-3'>
          <div className='flex items-start justify-between'>
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-8 w-16 bg-purple-300' />
              <Skeleton className='bg-purple-3000 h-8 w-48' />
            </div>
            <div className='flex items-center gap-5'>
              {[1, 2, 3].map((item) => (
                <div key={item} className='flex flex-col items-center gap-1'>
                  <Skeleton className='h-8 w-8 bg-purple-300' />
                  <Skeleton className='h-4 w-12 bg-purple-300' />
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-5 w-24 bg-purple-300' />
              <Skeleton className='h-5 w-12 bg-purple-300' />
            </div>
            <Skeleton className='h-4 w-full bg-purple-300' />
          </div>
        </div>
        <div className='relative flex items-end justify-end overflow-hidden'>
          <Skeleton className='h-[166px] w-[180px] bg-purple-300' />
        </div>
      </div>
    </Header>
  );
};

export default GoalHeaderSkeleton;
