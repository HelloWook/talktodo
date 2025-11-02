'use client';

import type { LayoutType } from '@/components/TaskViewContainer/TaskViewContainer.types';
import Typography from '@/components/Typography/Typography';
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

  return (
    <div className={cn('flex w-full items-center', className)}>
      <div className='mx-auto flex items-center gap-2'>
        <Typography variant='title3-semibold' className='text-gray-900'>
          {formatFullDate(selectedDate)}
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
            left: <Icon name='layout1' className='h-8 w-8' />,
            right: <Icon name='layout2' className='h-8 w-8' />,
          }}
          className='h-12 w-20'
          thumbSize={40}
          thumbTranslateX={32}
        />
      </div>
    </div>
  );
}
