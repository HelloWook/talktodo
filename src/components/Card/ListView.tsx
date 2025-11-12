import { cn } from '@/utils/cn';

import Card from './Card';
import type { ViewProps } from './type';

export default function ListView({ task, onToggleDone, onOpenMemo, className, onOpenEditDialog }: ViewProps) {
  return (
    <Card.Provider task={task} layout='list' onToggleDone={onToggleDone} onOpenMemo={onOpenMemo}>
      <Card className={cn('block w-full', className)} handleClick={() => onOpenEditDialog(task)}>
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
