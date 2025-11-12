import { Task } from '@/types';

export interface ViewProps {
  task: Task;
  onToggleDone: (taskId: string) => void;
  onOpenMemo: (taskId: string) => void;
  className?: string;
  onOpenEditDialog: (task: Task) => void;
}
