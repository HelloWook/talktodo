'use client';

import Icon from '@/components/Icon/Icon';
import Typography from '@/components/Typography/Typography';
import useMediaQuery from '@/hooks/useMediaQuery';
import type { Goal } from '@/types';
import { cn } from '@/utils/cn';

interface GoalNavigatorProps {
  className?: string;
  goals: Goal[];
  currentGoalIndex: number;
  onGoalChange: (index: number) => void;
}

const GoalNavigator = ({ className, goals, currentGoalIndex, onGoalChange }: GoalNavigatorProps) => {
  const isTablet = useMediaQuery('(max-width: 768px)');
  const isMobile = useMediaQuery('(max-width: 640px)');

  const currentGoal = goals[currentGoalIndex];
  const hasPrev = currentGoalIndex > 0;
  const hasNext = currentGoalIndex < goals.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      onGoalChange(currentGoalIndex - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onGoalChange(currentGoalIndex + 1);
    }
  };

  if (goals.length === 0) {
    return (
      <div className={cn('flex w-full items-center justify-center py-4', className)}>
        <Typography variant='body2-medium-loose' className='text-gray-500'>
          목표가 없습니다. 새로운 목표를 추가해보세요!
        </Typography>
      </div>
    );
  }

  return (
    <div className={cn('flex w-full items-center justify-between', className)}>
      <button
        onClick={handlePrev}
        disabled={!hasPrev}
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
          hasPrev ? 'cursor-pointer bg-purple-100 hover:bg-purple-200' : 'cursor-not-allowed bg-gray-100 opacity-50',
        )}
        aria-label='이전 목표'
      >
        <Icon name='chevron-left' className='h-6 w-6 fill-white' />
      </button>

      <div className='flex flex-1 flex-col items-center gap-1 px-4'>
        <Typography variant={isMobile ? 'title3-semibold' : 'title2-semibold'} className='max-w-full truncate text-gray-900'>
          {currentGoal?.name || '목표 없음'}
        </Typography>
        <Typography variant='body3-medium-loose' className='text-gray-500'>
          {currentGoalIndex + 1} / {goals.length}
        </Typography>
      </div>

      <button
        onClick={handleNext}
        disabled={!hasNext}
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
          hasNext ? 'cursor-pointer bg-purple-100 hover:bg-purple-200' : 'cursor-not-allowed bg-gray-100 opacity-50',
        )}
        aria-label='다음 목표'
      >
        <Icon name='chevron-right' className='h-6 w-6 fill-white' />
      </button>
    </div>
  );
};

export default GoalNavigator;
