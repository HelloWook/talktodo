'use client';

import type { LayoutType } from '@/components/TaskViewContainer/TaskViewContainer.types';
import Typography from '@/components/Typography/Typography';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

import { DateList, DatePickerButton, formatFullDate } from './_components/DateSelector';
import Icon from '../Icon/Icon';
import Toggle from '../Toggle/Toggle';

interface DateSubHeaderProps {
  className?: string;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  layout?: LayoutType;
  onLayoutChange?: (layout: LayoutType) => void;
}

export default function DateSubHeader({ className, selectedDate, onDateChange, layout = 'card', onLayoutChange }: DateSubHeaderProps) {
  const handleToggle = (checked: boolean) => {
    onLayoutChange?.(checked ? 'list' : 'card');
  };

  const isTablet = useMediaQuery('(max-width: 768px)');
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <div className={cn('flex w-full items-center', className)}>
      <div className='mx-auto flex items-center gap-2'>
        <Typography as='p' variant='title3-semibold' className='text-gray-900'>
          {!isTablet && formatFullDate(selectedDate)}
        </Typography>
        <DatePickerButton selectedDate={selectedDate} onDateChange={onDateChange} />

        <DateList selectedDate={selectedDate} onDateChange={onDateChange} />
      </div>
      <div>
        <Toggle
          variant='secondary'
          checked={layout === 'list'}
          onChange={handleToggle}
          icons={{
            left: <Icon name='layout1' className={cn('h-8 w-8', isMobile && 'h-6 w-6')} />,
            right: <Icon name='layout2' className={cn('h-8 w-8', isMobile && 'h-6 w-6')} />,
          }}
          className={cn('h-12 w-20', isMobile && 'h-10 w-18')}
          thumbSize={isMobile ? 32 : 40}
          thumbTranslateX={32}
        />
      </div>
    </div>
  );
}
