import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * yy-MM-dd 형식의 문자열을 Date 객체로 변환
 */
export const parseDateString = (dateString: string): Date => {
  const parts = dateString.split('-');
  if (parts.length !== 3) {
    throw new Error('Invalid date format. Expected yy-MM-dd');
  }

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error('Invalid date values');
  }

  const fullYear = year < 100 ? 2000 + year : year;
  return new Date(fullYear, month - 1, day);
};

/**
 * Date 객체를 yy-MM-dd 형식의 문자열로 변환
 */
export const formatDateToString = (date: Date): string => {
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * yy-MM-dd 형식의 문자열을 "M월 d일 (EEE)" 형식으로 포맷팅
 */
export const formatDateDisplay = (dateString: string): string => {
  try {
    const date = parseDateString(dateString);
    return format(date, 'M월 d일 (EEE)', { locale: ko });
  } catch {
    return dateString;
  }
};
