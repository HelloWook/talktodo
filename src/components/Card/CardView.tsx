import type { Task } from '@/types/Task';

import Card from './Card';

interface CardViewProps {
  task: Task;
  onToggleDone: (taskId: string) => void;
  onOpenMemo: (taskId: string) => void;
  className?: string;
}

export default function CardView({ task, onToggleDone, onOpenMemo, className }: CardViewProps) {
  return (
    <Card.Provider task={task} layout='card' onToggleDone={onToggleDone} onOpenMemo={onOpenMemo}>
      <Card className={className}>
        <Card.Title className='line-clamp-1' />
        <Card.Description className='line-clamp-2 flex-1' />
        <Card.Data className='overflow-hidden text-xs' />
        <div className='flex w-full items-center justify-between border-t border-gray-200 pt-1.5'>
          <Card.Item className='w-full justify-between' />
        </div>
      </Card>
    </Card.Provider>
  );
}
