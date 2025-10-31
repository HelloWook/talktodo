import { addDays, format, isValid, parse } from 'date-fns';
import { ko } from 'date-fns/locale';

import type { DateInfo } from './DateSelector.types';

export const VISIBLE_DATES_COUNT = 5;
export const MOVE_DAYS_COUNT = 5;

export const formatDateToPath = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const formatFullDate = (date: Date): string => {
  return format(date, 'yyyy년 M월', { locale: ko });
};

export const formatDayDate = (date: Date): string => {
  return format(date, 'M월 d일', { locale: ko });
};

export const formatDayOfWeek = (date: Date): string => {
  return format(date, 'EEEEE', { locale: ko });
};

export const parseDateParam = (dateParam?: string): Date => {
  if (!dateParam) return new Date();

  const parsedDate = parse(dateParam, 'yyyy-MM-dd', new Date());
  return isValid(parsedDate) ? parsedDate : new Date();
};

export const getNearbyDates = (baseDate: Date, count: number = VISIBLE_DATES_COUNT): DateInfo[] => {
  const halfCount = Math.floor(count / 2);

  return Array.from({ length: count }, (_, index) => {
    const offset = index - halfCount;
    const targetDate = addDays(baseDate, offset);

    return {
      date: targetDate,
      year: targetDate.getFullYear(),
      month: targetDate.getMonth() + 1,
      day: targetDate.getDate(),
      dayOfWeek: formatDayOfWeek(targetDate),
    };
  });
};

export const moveDateByDays = (date: Date, days: number): Date => {
  return addDays(date, days);
};
