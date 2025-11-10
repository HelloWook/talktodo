import type { Task } from '@/types';

export type LayoutType = 'card' | 'list';
export type TaskType = 'todo' | 'done';

export interface EmptyTaskStateProps {
  mode: TaskType;
}

export interface TaskViewContainerProps {
  items: Task[];
  layout: LayoutType;
  type: TaskType;
  EmptyTaskState: React.ComponentType<EmptyTaskStateProps>;
  onToggleDone: (taskId: string) => void;
  onOpenMemo: (taskId: string) => void;
  isDragEnabled?: boolean;
}

export type { Task };
