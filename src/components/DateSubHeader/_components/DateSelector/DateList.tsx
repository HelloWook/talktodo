'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import DateButton from './DateButton';
import { MOVE_DAYS_COUNT, formatDateToPath, getNearbyDates, moveDateByDays, parseDateParam } from './dateUtils';
import NavigationButton from './NavigationButton';

export default function DateList() {
  const router = useRouter();
  const params = useParams<{ date: string }>();

  const [selectedDate, setSelectedDate] = useState(() => parseDateParam(params.date));

  const visibleDates = useMemo(() => getNearbyDates(selectedDate), [selectedDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    router.push(`/${formatDateToPath(date)}`);
  };

  const handleMoveDays = (days: number) => {
    const newDate = moveDateByDays(selectedDate, days);
    setSelectedDate(newDate);
  };

  return (
    <div className='inline-flex gap-3'>
      <NavigationButton direction='prev' onClick={() => handleMoveDays(-MOVE_DAYS_COUNT)} />

      {visibleDates.map((dateInfo, index) => (
        <DateButton
          key={formatDateToPath(dateInfo.date)}
          dateInfo={dateInfo}
          isSelected={index === Math.floor(visibleDates.length / 2)}
          onClick={() => handleDateSelect(dateInfo.date)}
        />
      ))}

      <NavigationButton direction='next' onClick={() => handleMoveDays(MOVE_DAYS_COUNT)} />
    </div>
  );
}
