import type { Task } from '@/types';

import { cn } from '@/utils/cn';

import Card from './Card';

interface ListViewProps {
  task: Task;
  onToggleDone: (taskId: string) => void;
  onOpenMemo: (taskId: string) => void;
  className?: string;
}

export default function ListView({ task, onToggleDone, onOpenMemo, className }: ListViewProps) {
  return (
    <Card.Provider task={task} layout='list' onToggleDone={onToggleDone} onOpenMemo={onOpenMemo}>
      <Card className={cn('block w-full', className)}>
        <div className='flex w-full items-center justify-between gap-2'>
          <div className='flex flex-1 flex-col gap-2'>
            <Card.Title />
            <Card.Description />
            <Card.Data />
          </div>
          <Card.Item className='flex-shrink-0' />
        </div>
      </Card>
    </Card.Provider>
  );
}
