import Typography from '@/components/Typography/Typography';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

import type { DateButtonProps } from './DateSelector.types';

export default function DateButton({ dateInfo, isSelected, onClick }: DateButtonProps) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  return (
    <button
      onClick={onClick}
      className={cn('flex cursor-pointer flex-col items-center justify-center p-4', isSelected && 'rounded-[1000px] bg-gray-800')}
      aria-label={`${dateInfo.month}월 ${dateInfo.day}일`}
      aria-pressed={isSelected}
    >
      <Typography variant={isMobile ? 'body2-bold' : 'body1-bold'} className={cn(isSelected ? 'text-white' : 'text-gray-500')}>
        {dateInfo.day}
      </Typography>
      <Typography variant='body2-medium-tight' className={isSelected ? 'text-white' : 'text-gray-500'}>
        {dateInfo.dayOfWeek}
      </Typography>
    </button>
  );
}
