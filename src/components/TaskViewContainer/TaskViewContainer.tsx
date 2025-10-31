import Card from '@/components/Card/Card';
import Typography from '@/components/Typography/Typography';
import type { Task } from '@/types/Task';
import { cn } from '@/utils/cn';

export type LayoutType = 'square' | 'rectangle';
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

export default function TaskViewContainer({ items, layout, type, EmptyTaskState, onToggleDone, onOpenMemo }: TaskViewContainerProps) {
  const title = type === 'todo' ? '해야할 일' : '완료한 일';

  const layoutStyle = layout === 'square' ? 'grid grid-cols-3 gap-2' : 'flex flex-col content-start items-start gap-3';

  const cardClassName = layout === 'square' ? 'min-w-[184px]' : 'w-full';

  return (
    <div className='flex w-full flex-col gap-2'>
      <div className='mb-3 flex h-[44px] items-center gap-2 rounded-xl bg-purple-100 px-4'>
        <Typography variant='body2-medium-tight' className='text-gray-700'>
          {title}
        </Typography>
        <Typography variant='body1-bold' className='text-purple-600'>
          {items.length}
        </Typography>
      </div>

      {items.length > 0 ? (
        <div className={cn(layoutStyle, layout === 'square' && 'self-stretch')}>
          {items.map((item) => (
            <Card.Provider key={item.id} task={item} onToggleDone={onToggleDone} onOpenMemo={onOpenMemo}>
              <Card className={cardClassName}>
                <Card.Title />
                <Card.Description />
                <Card.Data className='border-b border-gray-300 pb-3' />
                <Card.Item className='mt-1 flex justify-between' />
              </Card>
            </Card.Provider>
          ))}
        </div>
      ) : (
        <EmptyTaskState mode={type} />
      )}
    </div>
  );
}
