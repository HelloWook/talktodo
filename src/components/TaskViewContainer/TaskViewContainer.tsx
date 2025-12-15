import { useDroppable } from '@dnd-kit/core';

import CardView from '@/components/Card/CardView';
import DraggableWrapper from '@/components/Card/DraggableWrapper';
import ListView from '@/components/Card/ListView';
import Typography from '@/components/Typography/Typography';
import { Task } from '@/types';
import { cn } from '@/utils/cn';

import type { TaskViewContainerProps } from './TaskViewContainer.types';
import { useDialog } from '../DialogManager';
import TaskEditDialog from '../TaskEditDialog/TaskEditDialog';

export default function TaskViewContainer({
  items,
  layout,
  type,
  EmptyTaskState,
  onToggleDone,
  onOpenMemo,
  isDragEnabled = true,
}: TaskViewContainerProps) {
  const { openDialog, closeDialog } = useDialog();

  const title = type === 'todo' ? '해야할 일' : '완료한 일';
  const isListView = layout === 'list';

  const { setNodeRef, isOver } = useDroppable({
    id: type,
    disabled: !isDragEnabled,
  });

  const handleOpenEditDialog = (task: Task) => {
    const id = openDialog(<TaskEditDialog task={task} onClose={() => closeDialog(id)} />);
  };

  return (
    <div ref={setNodeRef} className='flex w-full flex-col gap-2 h-[400px] sm:h-full'>
      <div className='mb-3 flex h-[44px] items-center gap-2 rounded-xl bg-purple-100 px-4'>
        <Typography variant='body2-medium-tight' className='text-gray-700'>
          {title}
        </Typography>
        <Typography variant='body1-bold' className='text-purple-600'>
          {items.length}
        </Typography>
      </div>

      {items.length > 0 ? (
        <div
          className={cn(
            'scrollbar-hide min-h-0 overflow-y-auto pb-4 transition-colors',
            isListView ? 'flex flex-col space-y-2' : 'grid grid-auto-rows-auto grid-cols-3 gap-2',
            isOver && 'rounded-lg bg-purple-100/50',
          )}
        >
          {items.map((item) => (
            <DraggableWrapper key={item.id} id={item.id} isDragEnabled={isDragEnabled}>
              {isListView ? (
                <ListView
                  task={item}
                  onToggleDone={onToggleDone}
                  onOpenMemo={onOpenMemo}
                  className='w-full'
                  onOpenEditDialog={handleOpenEditDialog}
                />
              ) : (
                <CardView task={item} onToggleDone={onToggleDone} onOpenMemo={onOpenMemo} onOpenEditDialog={handleOpenEditDialog} />
              )}
            </DraggableWrapper>
          ))}
        </div>
      ) : (
        <div className={cn('flex-1 transition-colors', isOver && 'rounded-lg bg-purple-100/50')}>
          <EmptyTaskState mode={type} />
        </div>
      )}
    </div>
  );
}
