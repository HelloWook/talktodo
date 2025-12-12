import { useEffect, useState } from 'react';

import { getSelectedDate, saveSelectedDate } from '@/utils/selectedDateManger';

export function useSelectedDate(initialDate?: Date) {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate ?? new Date());

  useEffect(() => {
    const savedDate = getSelectedDate();
    if (savedDate) {
      setSelectedDate(savedDate);
    }
  }, []);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    saveSelectedDate(date);
  };

  return {
    selectedDate,
    setSelectedDate: handleDateChange,
  };
}
