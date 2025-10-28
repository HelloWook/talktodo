export type Priority = '낮음' | '보통' | '중요';

export type RepeatDay = '월' | '화' | '수' | '목' | '금' | '토' | '일';

export interface Task {
  id: string;
  title: string;
  description: string;
  memo: string;
  priority: Priority;
  repeatDays: RepeatDay[];
  createdAt: Date;
  updatedAt: Date;
  isDone: boolean;
}
