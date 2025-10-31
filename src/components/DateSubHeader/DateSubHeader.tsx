'use client';

import { useParams } from 'next/navigation';

import Typography from '@/components/Typography/Typography';
import { cn } from '@/utils/cn';

import { DateList, DatePickerButton, formatFullDate, parseDateParam } from './_components/DateSelector';
import Toggle from '../Toggle/Toggle';

interface DateSubHeaderProps {
  className?: string;
}

export default function DateSubHeader({ className }: DateSubHeaderProps = {}) {
  const params = useParams<{ date: string }>();
  const currentDate = parseDateParam(params.date);

  return (
    <div className={cn('flex w-full items-center justify-evenly', className)}>
      <div className='flex items-center gap-2'>
        <Typography variant='title3-semibold' className='text-gray-900'>
          {formatFullDate(currentDate)}
        </Typography>
        <DatePickerButton />
      </div>
      <DateList />
      <Toggle />
    </div>
  );
}
