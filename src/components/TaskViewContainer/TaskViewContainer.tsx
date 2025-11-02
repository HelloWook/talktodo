import CardView from '@/components/Card/CardView';
import ListView from '@/components/Card/ListView';
import Typography from '@/components/Typography/Typography';
import { cn } from '@/utils/cn';

import type { TaskViewContainerProps } from './TaskViewContainer.types';

export default function TaskViewContainer({ items, layout, type, EmptyTaskState, onToggleDone, onOpenMemo }: TaskViewContainerProps) {
  const title = type === 'todo' ? '해야할 일' : '완료한 일';
  const isListView = layout === 'list';

  return (
    <div className='flex h-full w-full flex-col gap-2'>
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
            'scrollbar-hide flex-1 overflow-y-auto pb-4',
            isListView ? 'flex flex-col space-y-2' : 'grid auto-rows-[170px] grid-cols-3 gap-2',
          )}
        >
          {items.map((item) =>
            isListView ? (
              <ListView key={item.id} task={item} onToggleDone={onToggleDone} onOpenMemo={onOpenMemo} className='w-full' />
            ) : (
              <CardView key={item.id} task={item} onToggleDone={onToggleDone} onOpenMemo={onOpenMemo} />
            ),
          )}
        </div>
      ) : (
        <EmptyTaskState mode={type} />
      )}
    </div>
  );
}
