import { RepeatDay } from '@/types/Task';

const WEEK_DAYS: RepeatDay[] = ['월', '화', '수', '목', '금', '토', '일'];

/**
 * 반복 요일을 문자열로 변환합니다.
 * @param repeatDays - 반복 요일
 * @returns 반복 요일 문자열
 */
export const getRepeatData = (repeatDays: RepeatDay[]) => {
  const hasAllDays = WEEK_DAYS.every((d) => repeatDays.includes(d));
  const label = hasAllDays ? '매일' : repeatDays.join(' ・ ');
  return label;
};
