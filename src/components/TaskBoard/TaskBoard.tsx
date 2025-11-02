'use client';

import Image from 'next/image';

import { TaskViewContainer } from '@/components/TaskViewContainer';
import type { LayoutType } from '@/components/TaskViewContainer/TaskViewContainer.types';
import type { Task } from '@/types/Task';
import { cn } from '@/utils/cn';
import { filterTasksByStatus } from '@/utils/filterTasks';

export interface TaskBoardProps {
  tasks: Task[];
  layout?: LayoutType;

  onToggleDone: (taskId: string) => void;
  onOpenMemo: (taskId: string) => void;
  className?: string;
}

const EmptyTaskState = ({ mode }: { mode: 'todo' | 'done' }) => {
  const imageSrc = mode === 'todo' ? '/img/Done.png' : '/img/UnDone.png';
  return <Image src={imageSrc} alt='empty task' width={400} height={400} className='mx-auto' />;
};

export default function TaskBoard({ tasks, layout = 'card', onToggleDone, onOpenMemo, className }: TaskBoardProps) {
  const { doneTasks, undoneTasks } = filterTasksByStatus(tasks);

  return (
    <div className={cn('flex h-full w-full gap-2', className)}>
      <TaskViewContainer
        items={undoneTasks}
        layout={layout}
        type='todo'
        EmptyTaskState={EmptyTaskState}
        onToggleDone={onToggleDone}
        onOpenMemo={onOpenMemo}
      />
      <div className='line mt-16 w-[3px]' />
      <TaskViewContainer
        items={doneTasks}
        layout={layout}
        type='done'
        EmptyTaskState={EmptyTaskState}
        onToggleDone={onToggleDone}
        onOpenMemo={onOpenMemo}
      />
    </div>
  );
}
