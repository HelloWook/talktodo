import type { Task } from '@/types/Task';

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
}

export type { Task };
