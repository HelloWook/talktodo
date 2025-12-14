'use client';

import { useMemo } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';

import DateButton from './DateButton';

import { MOVE_DAYS_COUNT, formatDateToPath, getNearbyDates, isSameDate, moveDateByDays } from './dateUtils';
import NavigationButton from './NavigationButton';
interface DateListProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function DateList({ selectedDate, onDateChange }: DateListProps) {
  const isMobile = useMediaQuery('(max-width: 480px)');
  const visibleDates = useMemo(() => getNearbyDates(selectedDate, isMobile ? 3 : 5), [selectedDate, isMobile]);

  const handleDateSelect = (date: Date) => {
    onDateChange(date);
  };

  const handleMoveDays = (days: number) => {
    const newDate = moveDateByDays(selectedDate, days);
    onDateChange(newDate);
  };

  return (
    <div className='inline-flex sm:gap-3'>
      <NavigationButton direction='prev' onClick={() => handleMoveDays(-MOVE_DAYS_COUNT)} />

      {visibleDates.map((dateInfo) => (
        <DateButton
          key={formatDateToPath(dateInfo.date)}
          dateInfo={dateInfo}
          isSelected={isSameDate(dateInfo.date, selectedDate)}
          onClick={() => handleDateSelect(dateInfo.date)}
        />
      ))}

      <NavigationButton direction='next' onClick={() => handleMoveDays(MOVE_DAYS_COUNT)} />
    </div>
  );
}
