'use client';

import { TaskViewContainer } from '@/components/TaskViewContainer';
import type { EmptyTaskStateProps, LayoutType } from '@/components/TaskViewContainer/TaskViewContainer.types';
import type { Task } from '@/types/Task';
import { filterTasksByStatus } from '@/utils/filterTasks';

export interface TaskBoardProps {
  tasks: Task[];
  layout?: LayoutType;
  EmptyTaskState: React.ComponentType<EmptyTaskStateProps>;
  onToggleDone: (taskId: string) => void;
  onOpenMemo: (taskId: string) => void;
  className?: string;
}

export default function TaskBoard({ tasks, layout = 'square', EmptyTaskState, onToggleDone, onOpenMemo, className }: TaskBoardProps) {
  const { doneTasks, undoneTasks } = filterTasksByStatus(tasks);

  return (
    <div className={className}>
      <div className='mb-3 flex w-full gap-2'>
        <TaskViewContainer
          items={undoneTasks}
          layout={layout}
          type='todo'
          EmptyTaskState={EmptyTaskState}
          onToggleDone={onToggleDone}
          onOpenMemo={onOpenMemo}
        />
        <TaskViewContainer
          items={doneTasks}
          layout={layout}
          type='done'
          EmptyTaskState={EmptyTaskState}
          onToggleDone={onToggleDone}
          onOpenMemo={onOpenMemo}
        />
      </div>
    </div>
  );
}
