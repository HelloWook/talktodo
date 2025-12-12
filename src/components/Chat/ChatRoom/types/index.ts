import { Task } from '@/types';

export interface ChatHeaderProps {
  goal: string;
  onPrevClick?: () => void;
  onNextClick?: () => void;
}

export type ChatMessageRole = 'user' | 'assistant';

export interface ChatMessageProps {
  message: string;
  role: ChatMessageRole;
}

export interface Message {
  message: string;
  role: ChatMessageRole;
  temp?: boolean;
}

export type TaskSchedule = Task;

export interface ChatRoomAction {
  handleSetTaskSchedules?: (schedules: TaskSchedule) => void;
}
