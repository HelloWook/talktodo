export interface DateInfo {
  date: Date;
  year: number;
  month: number;
  day: number;
  dayOfWeek: string;
}

export interface DateButtonProps {
  dateInfo: DateInfo;
  isSelected: boolean;
  onClick: () => void;
}

export interface NavigationButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}
