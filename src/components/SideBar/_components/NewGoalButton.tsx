'use client';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
interface NewGoalButtonProps {
  isFold: boolean;
  onClick: () => void;
}

export default function NewGoalButton({ isFold, onClick }: NewGoalButtonProps) {
  if (isFold) {
    return (
      <Button variant='quaternary' onClick={onClick} className='mt-6 w-full border-1 border-purple-600 px-0'>
        <Icon name='plus' className='h-6 w-6 text-purple-600' />
      </Button>
    );
  }

  return (
    <Button variant='quaternary' onClick={onClick} className='mt-6 w-full border-1 border-purple-600 px-0'>
      <Icon name='plus' className='h-6 w-6 text-purple-600' />
      <span className='font-body2-semibold text-purple-600'>새 목표</span>
    </Button>
  );
}
