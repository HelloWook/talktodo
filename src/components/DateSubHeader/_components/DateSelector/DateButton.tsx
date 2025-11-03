import Typography from '@/components/Typography/Typography';
import { cn } from '@/utils/cn';

import type { DateButtonProps } from './DateSelector.types';

export default function DateButton({ dateInfo, isSelected, onClick }: DateButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-[84px] w-[60px] cursor-pointer flex-col items-center justify-center',
        isSelected && 'rounded-[1000px] bg-gray-800 p-4',
      )}
      aria-label={`${dateInfo.month}월 ${dateInfo.day}일`}
      aria-pressed={isSelected}
    >
      <Typography variant='date-large' className={isSelected ? 'text-white' : 'text-gray-500'}>
        {dateInfo.day}
      </Typography>
      <Typography variant='body2-medium-tight' className={isSelected ? 'text-white' : 'text-gray-500'}>
        {dateInfo.dayOfWeek}
      </Typography>
    </button>
  );
}
