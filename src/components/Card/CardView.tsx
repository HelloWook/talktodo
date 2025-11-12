import Card from './Card';
import type { ViewProps } from './type';

export default function CardView({ task, onToggleDone, onOpenMemo, className, onOpenEditDialog }: ViewProps) {
  return (
    <Card.Provider task={task} layout='card' onToggleDone={onToggleDone} onOpenMemo={onOpenMemo}>
      <Card className={className} handleClick={() => onOpenEditDialog(task)}>
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
