'use client';

import SideBar from '@/components/SideBar/SideBar';
import { Skeleton } from '@/components/ui/skeleton';

const MenuSideBarSkeleton = () => {
  return (
    <SideBar>
      <SideBar.Content className='bg-purple-100'>
        <div className='flex items-center justify-between self-stretch border-b border-gray-200 py-5'>
          <Skeleton className='h-8 w-8 rounded-md bg-purple-300' />
          <Skeleton className='h-6 w-6 rounded-md bg-purple-300' />
        </div>

        <div className='flex w-full flex-col justify-center border-b border-gray-200 py-5'>
          <div className='flex cursor-pointer items-center gap-1'>
            <Skeleton className='h-8 w-8 rounded-md bg-purple-300' />
            <Skeleton className='h-5 w-12 rounded-md bg-purple-300' />
          </div>
        </div>

        <div className='flex w-full flex-col justify-center border-b border-gray-200 py-5'>
          <div className='flex cursor-pointer items-center gap-1'>
            <Skeleton className='h-8 w-8 rounded-md bg-purple-300' />
            <Skeleton className='h-5 w-20 rounded-md bg-purple-300' />
          </div>
        </div>

        <div className='flex w-full flex-col justify-center gap-3 border-b border-gray-200 py-5'>
          <div className='flex cursor-pointer items-center gap-1'>
            <Skeleton className='h-8 w-8 rounded-md bg-purple-300' />
            <Skeleton className='h-5 w-12 rounded-md bg-purple-300' />
          </div>
          <div className='flex h-full flex-col gap-2'>
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className='h-6 w-24 rounded-md bg-purple-300' />
            ))}
          </div>
        </div>

        <div className='mt-4'>
          <Skeleton className='h-10 w-full rounded-md bg-purple-300' />
        </div>
      </SideBar.Content>

      <SideBar.Footer className='bg-purple-100'>
        <div className='w-full'>
          <div className='mb-4 w-full border-b border-gray-200' />
          <div className='flex cursor-pointer items-center gap-3'>
            <Skeleton className='h-8 w-8 rounded-full bg-purple-300' />
            <div className='flex flex-1 flex-col items-start gap-1 self-stretch'>
              <Skeleton className='h-4 w-20 rounded-md bg-purple-300' />
              <Skeleton className='h-3 w-32 rounded-md bg-purple-300' />
            </div>
          </div>
        </div>
      </SideBar.Footer>
    </SideBar>
  );
};

export default MenuSideBarSkeleton;
