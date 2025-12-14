import { format } from 'date-fns';

/**
 * 'yy-MM-dd' 형식의 문자열을 Date 객체로 변환
 */
export const parseDateString = (dateString: string): Date => {
  const [yy, mm, dd] = dateString.split('-');
  return new Date(2000 + parseInt(yy, 10), parseInt(mm, 10) - 1, parseInt(dd, 10));
};

/**
 * 날짜 값을 Date 객체로 변환
 * - string ('yy-MM-dd'): 파싱하여 Date로 변환
 * - Date: 그대로 반환
 * - null/undefined: 기본값 반환
 */
export const parseDateValue = (value: string | Date | null | undefined, defaultValue: Date = new Date()): Date => {
  if (!value) {
    return defaultValue;
  }

  if (typeof value === 'string') {
    return parseDateString(value);
  }

  if (value instanceof Date) {
    return value;
  }

  return defaultValue;
};

/**
 * 날짜 값을 'yy-MM-dd' 형식의 문자열로 변환
 */
export const formatDateValue = (value: string | Date | null | undefined): string => {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (value instanceof Date) {
    return format(value, 'yy-MM-dd');
  }

  return '';
};
