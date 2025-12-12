'use client';

import Icon from '@/components/Icon/Icon';

import { ChatHeaderProps } from '../../types';

const ChatHeader = ({ goal, onPrevClick }: ChatHeaderProps) => {
  return (
    <div className='flex w-full items-center gap-3 pt-[40px]'>
      {onPrevClick && (
        <button aria-label='뒤로가기' onClick={onPrevClick} className='cursor-pointer'>
          <Icon name='chevron-left' className='h-8 w-8 fill-none text-white' />
        </button>
      )}

      <div className='flex w-full items-center justify-between gap-2 rounded-[20px] bg-[#F8F4FE]/20 px-5 py-3'>
        <div className='flex items-center gap-1'>
          <Icon name='flag' className='h-8 w-8 text-white' />
          <p className='font-body2-semibold text-white'>{goal}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
